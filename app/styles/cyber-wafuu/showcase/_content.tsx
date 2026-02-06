"use client";

import Link from "next/link";
import { ArrowLeft, Cpu, Waves, Origami, CircuitBoard } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Indigo", hex: "#1e3a5f", bg: "bg-[#1e3a5f]" },
  { name: "Dark Background", hex: "#0a0a14", bg: "bg-[#0a0a14]" },
  { name: "Vermillion", hex: "#c41e3a", bg: "bg-[#c41e3a]" },
  { name: "Gold Foil", hex: "#c9a227", bg: "bg-[#c9a227]" },
  { name: "Electric Blue", hex: "#38bdf8", bg: "bg-[#38bdf8]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a14] relative overflow-hidden">
      {/* Decorative digital seigaiha pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 50% 0%, transparent 70%, rgba(56,189,248,0.3) 70%, rgba(56,189,248,0.3) 72%, transparent 72%), radial-gradient(circle at 0% 50%, transparent 70%, rgba(56,189,248,0.3) 70%, rgba(56,189,248,0.3) 72%, transparent 72%)",
        backgroundSize: "40px 40px",
      }} />

      {/* Glow accents */}
      <div className="fixed top-1/3 right-0 w-72 h-72 bg-[#38bdf8]/3 blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-20 w-56 h-56 bg-[#c41e3a]/3 blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#1e3a5f]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/cyber-wafuu"
            className="flex items-center gap-2 text-[#38bdf8] hover:text-[#38bdf8]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-semibold text-sm tracking-wider">Back to Docs</span>
          </Link>
          <span className="font-sans font-bold text-xl text-[#38bdf8] tracking-wider
            [text-shadow:0_0_15px_rgba(56,189,248,0.3)]">
            CYBER WAFUU
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#1e3a5f]/40 text-[#e2e8f0] font-sans font-semibold text-sm tracking-wider shadow-[0_0_8px_rgba(56,189,248,0.1)] hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:border-[#38bdf8]/40 transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="CYBER WAFUU"
        description="Where tradition folds into the digital frontier"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-sans font-bold text-[#38bdf8] uppercase tracking-widest mb-2 [text-shadow:0_0_30px_rgba(56,189,248,0.4)]"
        descriptionClassName="text-lg text-[#e2e8f0]/35 font-sans max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-3xl md:text-5xl font-sans font-bold text-[#c41e3a] uppercase tracking-wider
            [text-shadow:0_0_20px_rgba(196,30,58,0.4)]">
            DIGITAL TRADITION
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#1e3a5f] text-[#e2e8f0] font-sans font-semibold tracking-wider border border-[#38bdf8]/40 shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300">
            Unfold
          </button>
          <button className="px-10 py-4 bg-[#0a0a14] text-[#c41e3a] font-sans font-semibold tracking-wider border border-[#c41e3a]/40 shadow-[0_0_12px_rgba(196,30,58,0.2)] hover:shadow-[0_0_20px_rgba(196,30,58,0.4)] transition-all duration-300">
            Observe
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="WAFUU PALETTE"
        subtitle="TRADITION AND TECHNOLOGY"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-[#e2e8f0] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/25 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#1e3a5f]/30 bg-[#0a0a14] shadow-[0_0_8px_rgba(56,189,248,0.05)]"
            labelClassName="font-sans font-semibold text-sm text-[#e2e8f0]"
            hexClassName="text-xs text-[#38bdf8] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="DIGITAL ORIGAMI"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-[#e2e8f0] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/25 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0a0a14] border border-[#1e3a5f]/30 shadow-[0_0_10px_rgba(30,58,95,0.2)]">
            <p className="text-sm font-sans text-[#38bdf8]/50 uppercase tracking-widest mb-6">STYLES</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#1e3a5f] text-[#e2e8f0] font-sans font-semibold tracking-wider border border-[#1e3a5f]/60 shadow-[0_0_12px_rgba(30,58,95,0.4)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300">
                Indigo
              </button>
              <button className="px-6 py-3 bg-[#c41e3a] text-white font-sans font-semibold tracking-wider border border-[#c41e3a]/60 shadow-[0_0_12px_rgba(196,30,58,0.4)] hover:shadow-[0_0_20px_rgba(196,30,58,0.6)] transition-all duration-300">
                Vermillion
              </button>
              <button className="px-6 py-3 bg-transparent text-[#38bdf8] font-sans font-semibold tracking-wider border border-[#38bdf8]/40 shadow-[0_0_8px_rgba(56,189,248,0.15)] hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300">
                Electric
              </button>
              <button className="px-6 py-3 bg-[#0a0a14] text-[#c9a227] font-sans font-semibold tracking-wider border border-[#c9a227]/30 shadow-[0_0_8px_rgba(201,162,39,0.15)] hover:shadow-[0_0_15px_rgba(201,162,39,0.3)] transition-all duration-300">
                Gold Foil
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="CIRCUIT PATTERNS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-[#e2e8f0] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/25 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0a0a14] border border-[#38bdf8]/20 shadow-[0_0_12px_rgba(56,189,248,0.1)] hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#1e3a5f] border border-[#38bdf8]/20 flex items-center justify-center mb-4">
              <Waves className="w-7 h-7 text-[#38bdf8]" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#38bdf8] tracking-wider mb-2">
              SEIGAIHA
            </h3>
            <p className="text-[#e2e8f0]/35 font-sans text-sm">Digital waves in circuit rhythm</p>
          </div>

          <div className="p-6 bg-[#0a0a14] border border-[#c41e3a]/20 shadow-[0_0_12px_rgba(196,30,58,0.1)] hover:shadow-[0_0_20px_rgba(196,30,58,0.3)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#1e3a5f] border border-[#c41e3a]/20 flex items-center justify-center mb-4">
              <Origami className="w-7 h-7 text-[#c41e3a]" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#c41e3a] tracking-wider mb-2">
              ORIGAMI
            </h3>
            <p className="text-[#e2e8f0]/35 font-sans text-sm">Folded precision meets digital logic</p>
          </div>

          <div className="p-6 bg-[#0a0a14] border border-[#c9a227]/20 shadow-[0_0_12px_rgba(201,162,39,0.1)] hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#1e3a5f] border border-[#c9a227]/20 flex items-center justify-center mb-4">
              <CircuitBoard className="w-7 h-7 text-[#c9a227]" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#c9a227] tracking-wider mb-2">
              KINTSUKUROI
            </h3>
            <p className="text-[#e2e8f0]/35 font-sans text-sm">Gold-traced circuits of repair</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="WAFUU INPUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-[#e2e8f0] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/25 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0a0a14] border border-[#1e3a5f]/30 shadow-[0_0_12px_rgba(30,58,95,0.2)]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#1e3a5f] border border-[#38bdf8]/20 flex items-center justify-center mb-4">
                <Cpu className="w-8 h-8 text-[#38bdf8]" />
              </div>
              <h3 className="text-xl font-sans font-bold text-[#38bdf8] tracking-wider">CONNECT</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-[#38bdf8]/50 uppercase tracking-widest mb-2">IDENTITY</label>
                <input
                  type="text"
                  placeholder="Enter identity..."
                  className="w-full px-4 py-3 bg-[#0a0a14] border border-[#1e3a5f]/30 text-[#e2e8f0] placeholder-[#e2e8f0]/20 font-sans focus:border-[#38bdf8]/60 focus:shadow-[0_0_12px_rgba(56,189,248,0.3)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-[#c41e3a]/50 uppercase tracking-widest mb-2">SEAL</label>
                <input
                  type="password"
                  placeholder="Enter seal..."
                  className="w-full px-4 py-3 bg-[#0a0a14] border border-[#c41e3a]/20 text-[#e2e8f0] placeholder-[#e2e8f0]/20 font-sans focus:border-[#c41e3a]/50 focus:shadow-[0_0_12px_rgba(196,30,58,0.3)] focus:outline-none transition-all duration-300"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#1e3a5f] text-[#e2e8f0] font-sans font-semibold tracking-wider border border-[#38bdf8]/40 shadow-[0_0_12px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300">
                AUTHENTICATE
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#1e3a5f]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#e2e8f0]/25 text-sm font-sans tracking-wider">
            Cyber Wafuu Showcase{" "}
            <Link href="/" className="text-[#38bdf8] hover:text-[#38bdf8]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
