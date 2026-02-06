"use client";

import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle, Crosshair, Gauge } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Navy", hex: "#1a2744", bg: "bg-[#1a2744]" },
  { name: "Military Green", hex: "#4a5c3a", bg: "bg-[#4a5c3a]" },
  { name: "Warning Yellow", hex: "#fbbf24", bg: "bg-[#fbbf24]" },
  { name: "Danger Red", hex: "#ef4444", bg: "bg-[#ef4444]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#1a2744] relative overflow-hidden">
      {/* Tech grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(74,92,58,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(74,92,58,0.12)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Warning stripe top */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-[repeating-linear-gradient(90deg,#fbbf24,#fbbf24_20px,#1a2744_20px,#1a2744_40px)] z-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/mecha"
            className="flex items-center gap-2 text-[#4a5c3a] hover:text-[#fbbf24] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono font-bold uppercase tracking-widest text-sm">BACK TO DOCS</span>
          </Link>
          <span className="font-mono font-bold text-xl text-[#fbbf24] uppercase tracking-widest">
            MECHA
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#4a5c3a] text-[#fbbf24] font-mono font-bold uppercase tracking-widest text-sm rounded-none shadow-[2px_2px_0px_rgba(251,191,36,0.3)] hover:border-[#fbbf24] hover:shadow-[4px_4px_0px_rgba(251,191,36,0.4)] transition-all"
          >
            ALL STYLES
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="MECHA"
        description="ARMOR CLASS // OPERATIONAL STATUS: ACTIVE"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-mono font-bold text-[#fbbf24] uppercase tracking-widest mb-4"
        descriptionClassName="text-lg text-[#4a5c3a] font-mono uppercase tracking-wider max-w-2xl mx-auto mb-10"
      >
        <div className="text-xs font-mono text-[#4a5c3a] uppercase tracking-[0.3em] mb-8">
          // SYSTEM INITIALIZED -- ALL UNITS STANDBY
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#fbbf24] text-[#1a2744] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#1a2744] shadow-[4px_4px_0px_#1a2744] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a2744] transition-all duration-200">
            DEPLOY
          </button>
          <button className="px-10 py-4 bg-[#ef4444] text-white font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#ef4444] shadow-[4px_4px_0px_#fbbf24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#fbbf24] transition-all duration-200">
            ALERT
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR SYSTEM"
        subtitle="DESIGNATION CODES"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#fbbf24] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#4a5c3a] font-mono uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#4a5c3a] bg-[#1a2744] rounded-none shadow-[3px_3px_0px_rgba(251,191,36,0.2)]"
            labelClassName="font-mono font-bold text-sm text-[#fbbf24] uppercase"
            hexClassName="text-xs text-[#4a5c3a] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="CONTROLS"
        subtitle="INTERFACE ELEMENTS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#fbbf24] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#4a5c3a] font-mono uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#1a2744] border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-[#fbbf24]" />
              <p className="text-xs font-mono font-bold text-[#4a5c3a] uppercase tracking-widest">BUTTON MATRIX</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#fbbf24] text-[#1a2744] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#1a2744] shadow-[4px_4px_0px_#1a2744] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a2744] transition-all">
                PRIMARY
              </button>
              <button className="px-6 py-3 bg-[#4a5c3a] text-[#fbbf24] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#fbbf24]/50 hover:border-[#fbbf24] transition-all">
                SECONDARY
              </button>
              <button className="px-6 py-3 bg-transparent text-[#ef4444] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#ef4444] shadow-[3px_3px_0px_#ef4444] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#ef4444] transition-all">
                DANGER
              </button>
              <button className="px-6 py-3 bg-transparent text-[#4a5c3a] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#4a5c3a] hover:text-[#fbbf24] hover:border-[#fbbf24] transition-all">
                GHOST
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="PANELS"
        subtitle="ARMOR MODULES"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#fbbf24] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#4a5c3a] font-mono uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#1a2744] border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.3)] hover:shadow-[6px_6px_0px_rgba(251,191,36,0.4)] hover:border-[#fbbf24] hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-[#fbbf24]" />
              <span className="text-xs font-mono text-[#4a5c3a] uppercase tracking-widest">UNIT-01</span>
            </div>
            <div className="w-14 h-14 bg-[#4a5c3a]/30 border border-[#4a5c3a] flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-[#fbbf24]" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#fbbf24] uppercase mb-2">
              ARMOR
            </h3>
            <p className="text-[#4a5c3a]/80 font-mono text-sm">Integrity: 98.7%</p>
          </div>

          <div className="p-6 bg-[#1a2744] border-2 border-[#fbbf24]/50 rounded-none shadow-[4px_4px_0px_rgba(239,68,68,0.3)] hover:shadow-[6px_6px_0px_rgba(239,68,68,0.4)] hover:border-[#ef4444] hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-[#ef4444]" />
              <span className="text-xs font-mono text-[#ef4444] uppercase tracking-widest">WARNING</span>
            </div>
            <div className="w-14 h-14 bg-[#ef4444]/10 border border-[#ef4444]/50 flex items-center justify-center mb-4">
              <AlertTriangle className="w-7 h-7 text-[#ef4444]" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#ef4444] uppercase mb-2">
              ALERT
            </h3>
            <p className="text-[#4a5c3a]/80 font-mono text-sm">Threat Level: ELEVATED</p>
          </div>

          <div className="p-6 bg-[#1a2744] border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(74,92,58,0.4)] hover:shadow-[6px_6px_0px_rgba(251,191,36,0.4)] hover:border-[#fbbf24] hover:-translate-y-1 transition-all duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-[#4a5c3a]" />
              <span className="text-xs font-mono text-[#4a5c3a] uppercase tracking-widest">UNIT-03</span>
            </div>
            <div className="w-14 h-14 bg-[#4a5c3a]/30 border border-[#4a5c3a] flex items-center justify-center mb-4">
              <Crosshair className="w-7 h-7 text-[#4a5c3a]" />
            </div>
            <h3 className="text-xl font-mono font-bold text-[#fbbf24] uppercase mb-2">
              TARGETING
            </h3>
            <p className="text-[#4a5c3a]/80 font-mono text-sm">Lock: ENGAGED</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="TERMINAL"
        subtitle="COMMAND INPUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#fbbf24] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#4a5c3a] font-mono uppercase tracking-wider mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#1a2744] border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.3)]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#4a5c3a]/20 border-2 border-[#4a5c3a] flex items-center justify-center mb-4">
                <Gauge className="w-8 h-8 text-[#fbbf24]" />
              </div>
              <h3 className="text-xl font-mono font-bold text-[#fbbf24] uppercase tracking-widest">ACCESS</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#4a5c3a] uppercase tracking-widest mb-2">OPERATOR ID</label>
                <input
                  type="text"
                  placeholder="ENTER ID..."
                  className="w-full px-4 py-3 bg-[#1a2744]/80 border-2 border-[#4a5c3a] rounded-none text-[#fbbf24] placeholder-[#4a5c3a]/60 font-mono focus:border-[#fbbf24] focus:shadow-[0_0_8px_rgba(251,191,36,0.4)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#ef4444] uppercase tracking-widest mb-2">AUTH CODE</label>
                <input
                  type="password"
                  placeholder="ENTER CODE..."
                  className="w-full px-4 py-3 bg-[#1a2744]/80 border-2 border-[#ef4444]/50 rounded-none text-[#ef4444] placeholder-[#ef4444]/40 font-mono focus:border-[#ef4444] focus:shadow-[0_0_8px_rgba(239,68,68,0.4)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#fbbf24] text-[#1a2744] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#1a2744] shadow-[4px_4px_0px_#1a2744] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a2744] transition-all">
                AUTHENTICATE
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#4a5c3a]/60 text-xs font-mono uppercase tracking-widest">
            MECHA Showcase // Part of{" "}
            <Link href="/" className="text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
