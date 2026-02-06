"use client";

import Link from "next/link";
import { ArrowLeft, Cpu, Waves, Origami, CircuitBoard, Flower2 } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Indigo", hex: "#1e3a5f", bg: "bg-[#1e3a5f]" },
  { name: "Dark Background", hex: "#080814", bg: "bg-[#080814]" },
  { name: "Vermillion", hex: "#c41e3a", bg: "bg-[#c41e3a]" },
  { name: "Gold Foil", hex: "#c9a227", bg: "bg-[#c9a227]" },
  { name: "Electric Blue", hex: "#38bdf8", bg: "bg-[#38bdf8]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#080814] relative overflow-hidden">
      {/* Seigaiha wave pattern overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: "radial-gradient(circle at 50% 100%, transparent 60%, rgba(56,189,248,0.4) 60%, rgba(56,189,248,0.4) 62%, transparent 62%), radial-gradient(circle at 0% 100%, transparent 60%, rgba(56,189,248,0.4) 60%, rgba(56,189,248,0.4) 62%, transparent 62%)",
        backgroundSize: "60px 30px",
      }} />

      {/* Atmospheric glow */}
      <div className="fixed top-1/3 right-0 w-72 h-72 bg-[#38bdf8]/[0.03] blur-[80px] pointer-events-none" />
      <div className="fixed bottom-1/4 left-0 w-56 h-56 bg-[#c41e3a]/[0.03] blur-[80px] pointer-events-none" />

      {/* Torii Gate Navigation */}
      <nav className="relative z-10 border-t-[3px] border-[#c41e3a] shadow-[0_-3px_10px_rgba(196,30,58,0.3)]">
        <div className="border-b border-[#c41e3a]/30">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
            <Link
              href="/styles/cyber-wafuu"
              className="flex items-center gap-2 text-[#38bdf8] hover:text-[#38bdf8]/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-sans font-semibold text-sm tracking-wider">Back</span>
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
        </div>
        {/* Second torii beam */}
        <div className="max-w-6xl mx-auto h-[1px] bg-[#c41e3a]/20" />
      </nav>

      {/* Hero Section with seigaiha wave */}
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
          <button className="px-10 py-4 bg-[#080814] text-[#c41e3a] font-sans font-semibold tracking-wider border border-[#c41e3a]/40 shadow-[0_0_12px_rgba(196,30,58,0.2)] hover:shadow-[0_0_20px_rgba(196,30,58,0.4)] transition-all duration-300">
            Observe
          </button>
        </div>
      </ShowcaseHero>

      {/* Kintsugi gold crack divider */}
      <div className="relative z-10 max-w-4xl mx-auto h-px my-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent shadow-[0_0_6px_rgba(201,162,39,0.3)]" />
      </div>

      {/* Shoji Screen Grid Layout - 2x2 cards with visible divider lines */}
      <ShowcaseSection
        title="SHOJI SCREEN"
        subtitle="PATTERN COLLECTION"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-bold text-[#e2e8f0] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e2e8f0]/25 font-sans uppercase tracking-widest mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <div className="border border-[#1e3a5f]/30 relative">
            {/* Shoji grid vertical divider */}
            <div className="absolute top-0 left-1/2 w-px h-full bg-[#1e3a5f]/20 hidden md:block" />
            {/* Shoji grid horizontal divider */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-[#1e3a5f]/20 hidden md:block" />
            {/* Kintsugi gold accent on top */}
            <div className="absolute top-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#c9a227]/25 to-transparent" />

            <div className="grid md:grid-cols-2">
              <div className="p-8 hover:bg-[#0c0c1a] transition-colors duration-300 border-b md:border-b-0 md:border-r border-[#1e3a5f]/20">
                <div className="w-14 h-14 bg-[#1e3a5f] border border-[#38bdf8]/20 flex items-center justify-center mb-4">
                  <Waves className="w-7 h-7 text-[#38bdf8]" />
                </div>
                <h3 className="text-xl font-sans font-bold text-[#38bdf8] tracking-wider mb-2">SEIGAIHA</h3>
                <p className="text-[#e2e8f0]/35 font-sans text-sm">Digital blue waves in repeating radial patterns, the ocean encoded in CSS gradients.</p>
              </div>

              <div className="p-8 hover:bg-[#0c0c1a] transition-colors duration-300 border-b md:border-b-0 border-[#1e3a5f]/20">
                <div className="w-14 h-14 bg-[#1e3a5f] border border-[#c41e3a]/20 flex items-center justify-center mb-4">
                  <Origami className="w-7 h-7 text-[#c41e3a]" />
                </div>
                <h3 className="text-xl font-sans font-bold text-[#c41e3a] tracking-wider mb-2">TORII</h3>
                <p className="text-[#e2e8f0]/35 font-sans text-sm">Sacred gate architecture reborn as navigation frames, guiding users through digital realms.</p>
              </div>

              <div className="p-8 hover:bg-[#0c0c1a] transition-colors duration-300 border-b md:border-b-0 md:border-r border-[#1e3a5f]/20">
                <div className="w-14 h-14 bg-[#1e3a5f] border border-[#c9a227]/20 flex items-center justify-center mb-4">
                  <CircuitBoard className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-sans font-bold text-[#c9a227] tracking-wider mb-2">KINTSUGI</h3>
                <p className="text-[#e2e8f0]/35 font-sans text-sm">Gold-traced circuit lines of repair, where broken paths become decorative accents.</p>
              </div>

              <div className="p-8 hover:bg-[#0c0c1a] transition-colors duration-300">
                <div className="w-14 h-14 bg-[#1e3a5f] border border-[#38bdf8]/20 flex items-center justify-center mb-4">
                  <Cpu className="w-7 h-7 text-[#38bdf8]" />
                </div>
                <h3 className="text-xl font-sans font-bold text-[#38bdf8] tracking-wider mb-2">ASANOHA</h3>
                <p className="text-[#e2e8f0]/35 font-sans text-sm">Hemp leaf geometric grid as layout scaffolding, traditional patterns meet digital precision.</p>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Kintsugi gold crack divider */}
      <div className="relative z-10 max-w-4xl mx-auto h-px my-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent shadow-[0_0_6px_rgba(201,162,39,0.3)]" />
      </div>

      {/* Color Palette + Button Arsenal in horizontal split */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-sans text-[#38bdf8]/50 uppercase tracking-widest mb-8 text-center">WAFUU PALETTE</p>
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#1e3a5f]/30 bg-[#080814] shadow-[0_0_8px_rgba(56,189,248,0.05)]"
            labelClassName="font-sans font-semibold text-sm text-[#e2e8f0]"
            hexClassName="text-xs text-[#38bdf8] font-sans"
          />

          {/* Buttons with circuit trace connecting line */}
          <div className="mt-10 relative">
            {/* Circuit trace horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#38bdf8]/10 to-transparent -translate-y-1/2 pointer-events-none" />

            <div className="relative p-8 bg-[#080814] border border-[#1e3a5f]/30 shadow-[0_0_10px_rgba(30,58,95,0.2)]">
              <p className="text-sm font-sans text-[#38bdf8]/50 uppercase tracking-widest mb-6">DIGITAL BUTTONS</p>
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
                <button className="px-6 py-3 bg-[#080814] text-[#c9a227] font-sans font-semibold tracking-wider border border-[#c9a227]/40 shadow-[0_0_8px_rgba(201,162,39,0.15)] hover:shadow-[0_0_15px_rgba(201,162,39,0.3)] transition-all duration-300">
                  Kintsugi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kintsugi gold crack divider */}
      <div className="relative z-10 max-w-4xl mx-auto h-px my-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent shadow-[0_0_6px_rgba(201,162,39,0.3)]" />
      </div>

      {/* Form with asanoha pattern background */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#080814] border border-[#1e3a5f]/30 shadow-[0_0_12px_rgba(30,58,95,0.2)] relative overflow-hidden">
            {/* Asanoha pattern overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
              backgroundImage: "linear-gradient(30deg, rgba(30,58,95,0.6) 12%, transparent 12.5%, transparent 87%, rgba(30,58,95,0.6) 87.5%), linear-gradient(150deg, rgba(30,58,95,0.6) 12%, transparent 12.5%, transparent 87%, rgba(30,58,95,0.6) 87.5%), linear-gradient(30deg, rgba(30,58,95,0.6) 12%, transparent 12.5%, transparent 87%, rgba(30,58,95,0.6) 87.5%), linear-gradient(150deg, rgba(30,58,95,0.6) 12%, transparent 12.5%, transparent 87%, rgba(30,58,95,0.6) 87.5%)",
              backgroundSize: "40px 70px",
              backgroundPosition: "0 0, 0 0, 20px 35px, 20px 35px",
            }} />
            {/* Kintsugi gold line at top */}
            <div className="absolute top-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />

            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto bg-[#1e3a5f] border border-[#38bdf8]/20 flex items-center justify-center mb-4">
                  <Flower2 className="w-8 h-8 text-[#38bdf8]" />
                </div>
                <h3 className="text-xl font-sans font-bold text-[#38bdf8] tracking-wider
                  [text-shadow:0_0_10px_rgba(56,189,248,0.2)]">AUTHENTICATE</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-sans text-[#38bdf8]/50 uppercase tracking-widest mb-2">IDENTITY</label>
                  <input
                    type="text"
                    placeholder="Enter identity..."
                    className="w-full px-4 py-3 bg-[#080814] border border-[#1e3a5f]/30 text-[#e2e8f0] placeholder-[#e2e8f0]/20 font-sans focus:border-[#38bdf8]/60 focus:shadow-[0_0_12px_rgba(56,189,248,0.3)] focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans text-[#c41e3a]/50 uppercase tracking-widest mb-2">SEAL</label>
                  <input
                    type="password"
                    placeholder="Enter seal..."
                    className="w-full px-4 py-3 bg-[#080814] border border-[#c41e3a]/20 text-[#e2e8f0] placeholder-[#e2e8f0]/20 font-sans focus:border-[#c41e3a]/50 focus:shadow-[0_0_12px_rgba(196,30,58,0.3)] focus:outline-none transition-all duration-300"
                  />
                </div>
                <button className="w-full px-6 py-3 bg-[#1e3a5f] text-[#e2e8f0] font-sans font-semibold tracking-wider border border-[#38bdf8]/40 shadow-[0_0_12px_rgba(56,189,248,0.3)] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300">
                  CONNECT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles Strip */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-sans text-[#e2e8f0]/25 uppercase tracking-widest mb-8 text-center">DESIGN ELEMENTS</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#1e3a5f]/15">
            {[
              { icon: Waves, label: "Seigaiha", color: "text-[#38bdf8]" },
              { icon: Origami, label: "Torii Gate", color: "text-[#c41e3a]" },
              { icon: CircuitBoard, label: "Kintsugi", color: "text-[#c9a227]" },
              { icon: Cpu, label: "Circuit", color: "text-[#38bdf8]" },
              { icon: Flower2, label: "Sakura", color: "text-[#c41e3a]" },
            ].map((item) => (
              <div key={item.label} className="p-5 bg-[#080814] text-center hover:bg-[#0c0c1a] transition-colors duration-300">
                <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                <p className="text-xs font-sans text-[#e2e8f0]/40 tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-[3px] border-[#c41e3a] shadow-[0_-3px_10px_rgba(196,30,58,0.2)]">
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
