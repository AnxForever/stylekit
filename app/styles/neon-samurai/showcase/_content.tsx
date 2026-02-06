"use client";

import Link from "next/link";
import { ArrowLeft, Swords, Zap, Shield, Eye, Flame } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Neon Red", hex: "#dc2626", bg: "bg-[#dc2626]" },
  { name: "Dark Navy", hex: "#080818", bg: "bg-[#080818]" },
  { name: "Electric Purple", hex: "#a020f0", bg: "bg-[#a020f0]" },
  { name: "Neon Blue", hex: "#38bdf8", bg: "bg-[#38bdf8]" },
  { name: "Gold", hex: "#fbbf24", bg: "bg-[#fbbf24]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#080818] relative overflow-hidden">
      {/* Scan line overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,38,38,0.3) 2px, rgba(220,38,38,0.3) 4px)",
      }} />

      {/* Smoke wisps */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-[#dc2626]/4 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-72 h-72 bg-[#a020f0]/4 blur-[80px] pointer-events-none" />

      {/* Torii Gate Navigation */}
      <nav className="relative z-10 border-t-[3px] border-[#dc2626] shadow-[0_-4px_15px_rgba(220,38,38,0.3)]">
        <div className="border-b-2 border-[#dc2626]/40">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 border-l-2 border-r-2 border-[#dc2626]/60">
            <Link
              href="/styles/neon-samurai"
              className="flex items-center gap-2 text-[#dc2626] hover:text-[#dc2626]/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-sans font-bold uppercase tracking-widest text-sm">Back</span>
            </Link>
            <span className="font-sans font-bold text-xl text-[#dc2626] uppercase tracking-widest
              [text-shadow:0_0_20px_rgba(56,189,248,0.4)]">
              NEON SAMURAI
            </span>
            <Link
              href="/styles"
              className="relative px-4 py-2 border border-[#dc2626]/40 text-white font-sans font-bold uppercase tracking-widest text-sm shadow-[0_0_10px_rgba(220,38,38,0.2)] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300
                before:content-[''] before:absolute before:top-0 before:right-0 before:w-2 before:h-2 before:border-t before:border-r before:border-[#a020f0]
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-2 after:h-2 after:border-b after:border-l after:border-[#a020f0]"
            >
              All Styles
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero with diagonal katana slash */}
      <ShowcaseHero
        title="NEON"
        description="The way of the warrior, illuminated by electric fire"
        className="relative z-10 pt-24 pb-20 px-6 text-center"
        titleClassName="text-7xl md:text-9xl font-sans font-bold text-[#dc2626] uppercase tracking-widest mb-0 [text-shadow:0_0_40px_rgba(220,38,38,0.5)]"
        descriptionClassName="text-lg text-white/40 font-sans max-w-2xl mx-auto mb-10"
      >
        <h2 className="text-5xl md:text-7xl font-sans font-bold text-[#a020f0] uppercase tracking-widest mb-6
          [text-shadow:0_0_30px_rgba(56,189,248,0.5)]">
          SAMURAI
        </h2>
        {/* Diagonal katana slash decoration */}
        <div className="relative max-w-3xl mx-auto h-px my-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#dc2626] to-transparent" style={{ transform: "rotate(-3deg)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#dc2626] to-transparent shadow-[0_0_12px_rgba(56,189,248,0.6)]" style={{ transform: "rotate(-3deg)" }} />
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="relative px-10 py-4 bg-[#dc2626] text-white font-sans font-bold uppercase tracking-widest border border-[#dc2626] shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] transition-all duration-300
            before:content-[''] before:absolute before:top-0 before:right-0 before:w-3 before:h-3 before:border-t before:border-r before:border-[#a020f0]
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-3 after:h-3 after:border-b after:border-l after:border-[#a020f0]">
            Strike
          </button>
          <button className="relative px-10 py-4 bg-[#080818] text-[#a020f0] font-sans font-bold uppercase tracking-widest border border-[#a020f0]/50 shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-300
            before:content-[''] before:absolute before:top-0 before:right-0 before:w-3 before:h-3 before:border-t before:border-r before:border-[#dc2626]
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-3 after:h-3 after:border-b after:border-l after:border-[#dc2626]">
            Defend
          </button>
        </div>
      </ShowcaseHero>

      {/* Split-screen: Palette + Buttons side by side */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-0">
          {/* Left: Color Palette */}
          <div className="p-8 border border-[#dc2626]/20 border-r-0 md:border-r">
            <p className="text-sm font-sans font-bold text-[#dc2626] uppercase tracking-widest mb-6">NEON PALETTE</p>
            <ColorPaletteGrid
              colors={colors}
              cardClassName="border border-[#dc2626]/20 bg-[#080818] shadow-[0_0_10px_rgba(220,38,38,0.1)]"
              labelClassName="font-sans font-bold text-sm text-white uppercase"
              hexClassName="text-xs text-[#dc2626] font-sans"
            />
          </div>
          {/* Right: Button Arsenal */}
          <div className="p-8 border border-[#dc2626]/20">
            <p className="text-sm font-sans font-bold text-[#a020f0] uppercase tracking-widest mb-6
              [text-shadow:0_0_10px_rgba(56,189,248,0.4)]">BUTTON ARSENAL</p>
            <div className="flex flex-col gap-4">
              <button className="relative w-full px-6 py-3 bg-[#dc2626] text-white font-sans font-bold uppercase tracking-widest border border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-300
                before:content-[''] before:absolute before:top-0 before:right-0 before:w-3 before:h-3 before:border-t before:border-r before:border-[#a020f0]
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-3 after:h-3 after:border-b after:border-l after:border-[#a020f0]">
                Neon Red
              </button>
              <button className="w-full px-6 py-3 bg-[#a020f0] text-white font-sans font-bold uppercase tracking-widest border border-[#a020f0]/60 shadow-[0_0_15px_rgba(160,32,240,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-300">
                Purple Strike
              </button>
              <button className="w-full px-6 py-3 bg-transparent text-[#dc2626] font-sans font-bold uppercase tracking-widest border border-[#dc2626]/50 shadow-[0_0_10px_rgba(220,38,38,0.2)] hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300">
                Outline Blade
              </button>
              <button className="w-full px-6 py-3 bg-[#080818] text-[#a020f0] font-sans font-bold uppercase tracking-widest border border-[#a020f0]/40 shadow-[0_0_10px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300">
                Dual Glow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Katana slash divider */}
      <div className="relative z-10 max-w-6xl mx-auto h-px my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#dc2626] to-transparent shadow-[0_0_12px_rgba(56,189,248,0.6)]" style={{ transform: "rotate(-2deg)" }} />
      </div>

      {/* Armor-plate Cards */}
      <ShowcaseSection
        title="ARMOR PLATES"
        subtitle="BUSHIDO CARDS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-white uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-white/30 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#080818] border border-[#dc2626]/30 shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:-translate-y-1 transition-all duration-300
            [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]">
            <div className="w-14 h-14 bg-[#dc2626] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              <Swords className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#dc2626] uppercase tracking-wider mb-2">
              KATANA
            </h3>
            <p className="text-white/40 font-sans text-sm">Sharp precision forged in code and steel</p>
          </div>

          <div className="p-6 bg-[#080818] border border-[#a020f0]/30 shadow-[0_0_15px_rgba(160,32,240,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:-translate-y-1 transition-all duration-300
            [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]">
            <div className="w-14 h-14 bg-[#a020f0] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#a020f0] uppercase tracking-wider mb-2
              [text-shadow:0_0_10px_rgba(56,189,248,0.4)]">
              ENERGY
            </h3>
            <p className="text-white/40 font-sans text-sm">Electric power flows through the circuit</p>
          </div>

          <div className="p-6 bg-[#080818] border border-[#38bdf8]/30 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:-translate-y-1 transition-all duration-300
            [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]">
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

      {/* Katana slash divider */}
      <div className="relative z-10 max-w-6xl mx-auto h-px my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a020f0] to-transparent shadow-[0_0_12px_rgba(56,189,248,0.6)]" style={{ transform: "rotate(2deg)" }} />
      </div>

      {/* Command Terminal (Form) - unique: brush-stroke underline inputs */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-lg mx-auto">
          <div className="p-8 bg-[#080818] border-t-[3px] border-[#dc2626] shadow-[0_-4px_15px_rgba(220,38,38,0.3)]
            border-l-2 border-r-2 border-b border-[#dc2626]/40">
            {/* Torii gate second beam */}
            <div className="h-[2px] bg-[#dc2626]/50 -mt-6 mb-6" />
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-[#dc2626] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(220,38,38,0.4)]
                [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-sans font-bold text-[#dc2626] uppercase tracking-widest
                [text-shadow:0_0_15px_rgba(56,189,248,0.3)]">COMMAND TERMINAL</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-sans font-bold text-[#dc2626] uppercase tracking-widest mb-3">CALLSIGN</label>
                <input
                  type="text"
                  placeholder="ENTER CALLSIGN..."
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-[#dc2626]/30 text-white placeholder-white/20 font-sans focus:border-[#dc2626] focus:shadow-[0_2px_15px_rgba(56,189,248,0.4)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-sans font-bold text-[#a020f0] uppercase tracking-widest mb-3
                  [text-shadow:0_0_8px_rgba(56,189,248,0.3)]">PASSCODE</label>
                <input
                  type="password"
                  placeholder="ENTER PASSCODE..."
                  className="w-full px-4 py-3 bg-transparent border-b-2 border-[#a020f0]/30 text-white placeholder-white/20 font-sans focus:border-[#a020f0] focus:shadow-[0_2px_15px_rgba(56,189,248,0.4)] focus:outline-none transition-all duration-300"
                />
              </div>
              <button className="relative w-full px-6 py-3 bg-[#dc2626] text-white font-sans font-bold uppercase tracking-widest border border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-300
                before:content-[''] before:absolute before:top-0 before:right-0 before:w-3 before:h-3 before:border-t before:border-r before:border-[#a020f0]
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-3 after:h-3 after:border-b after:border-l after:border-[#a020f0]">
                ENTER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ink Splatter + Feature Grid - unique bottom section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-sans font-bold text-white/30 uppercase tracking-widest mb-8 text-center">DESIGN PRINCIPLES</p>
          <div className="grid md:grid-cols-4 gap-px bg-[#dc2626]/20">
            {[
              { icon: Swords, label: "Katana Slash", desc: "Diagonal tapered strokes" },
              { icon: Shield, label: "Armor Plate", desc: "Angular clip-path cards" },
              { icon: Flame, label: "Dual Glow", desc: "Stroke differs from glow" },
              { icon: Zap, label: "Brush Stroke", desc: "Neon calligraphy lines" },
            ].map((item) => (
              <div key={item.label} className="p-6 bg-[#080818] text-center hover:bg-[#0c0c20] transition-colors duration-300">
                <item.icon className="w-8 h-8 text-[#dc2626] mx-auto mb-3" />
                <p className="text-sm font-sans font-bold text-white uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-xs text-white/30 font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-[3px] border-[#dc2626] shadow-[0_-4px_15px_rgba(220,38,38,0.2)]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/30 text-sm font-sans uppercase tracking-widest">
            Neon Samurai Showcase{" "}
            <Link href="/" className="text-[#dc2626] hover:text-[#dc2626]/80 transition-colors
              [text-shadow:0_0_10px_rgba(56,189,248,0.3)]">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
