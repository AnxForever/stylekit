"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Triangle,
  Hexagon,
  Eye,
  Scan,
  Radio,
  Orbit,
  Grid3X3,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Fluorescent Green", hex: "#39ff14", bg: "bg-[#39ff14]" },
  { name: "Acid Yellow", hex: "#e6ff00", bg: "bg-[#e6ff00]" },
  { name: "Electric Purple", hex: "#a020f0", bg: "bg-[#a020f0]" },
  { name: "Cyber Pink", hex: "#ff6ec7", bg: "bg-[#ff6ec7]" },
  { name: "Void Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Op-Art Checkerboard background pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-conic-gradient(#39ff14 0% 25%, transparent 0% 50%)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 3D Wireframe perspective grid */}
      <div className="fixed bottom-0 left-0 right-0 h-[40vh] pointer-events-none overflow-hidden opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#39ff14 1px, transparent 1px), linear-gradient(90deg, #39ff14 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "bottom center",
          }}
        />
      </div>

      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57, 255, 20, 0.02) 2px, rgba(57, 255, 20, 0.02) 4px)`,
        }}
      />

      {/* Navigation - angular, asymmetric */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#39ff14]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/acid-graphics"
            className="flex items-center gap-2 text-[#39ff14] hover:text-[#e6ff00] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono font-bold uppercase tracking-widest text-xs">
              {"//BACK"}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#39ff14] animate-pulse" />
            <span className="font-mono font-black text-sm text-[#39ff14] uppercase tracking-[0.3em]">
              ACID_GFX_v2.0
            </span>
            <div className="w-2 h-2 bg-[#a020f0] animate-pulse" />
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#39ff14]/40 text-[#39ff14] font-mono font-bold uppercase tracking-widest rounded-none text-xs hover:bg-[#39ff14] hover:text-[#0a0a0a] transition-all duration-150"
          >
            [ALL]
          </Link>
        </div>
      </nav>

      {/* Hero - Chaotic overlapping layout */}
      <section className="relative z-10 pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto relative">
          {/* Chrome layered title */}
          <div className="relative mb-4">
            <h1 className="text-[8rem] md:text-[14rem] font-mono font-black text-[#a020f0] uppercase leading-none tracking-tighter absolute top-2 left-2 opacity-30 select-none">
              ACID
            </h1>
            <h1 className="text-[8rem] md:text-[14rem] font-mono font-black text-[#ff6ec7] uppercase leading-none tracking-tighter absolute top-[-2px] left-[-2px] opacity-30 select-none">
              ACID
            </h1>
            <h1 className="text-[8rem] md:text-[14rem] font-mono font-black text-[#e6ff00] uppercase leading-none tracking-tighter absolute top-1 left-[-1px] opacity-25 select-none">
              ACID
            </h1>
            <h1 className="text-[8rem] md:text-[14rem] font-mono font-black text-[#39ff14] uppercase leading-none tracking-tighter relative">
              ACID
            </h1>
          </div>

          {/* Skewed subtitle block */}
          <div className="transform -skew-x-6 bg-[#a020f0]/10 border-l-4 border-[#a020f0] px-8 py-4 mb-8 max-w-xl">
            <p className="transform skew-x-6 font-mono text-[#39ff14]/50 uppercase tracking-[0.5em] text-sm">
              Distort // Warp // Dissolve
            </p>
          </div>

          {/* CTA buttons - overlapping, at angles */}
          <div className="flex flex-wrap gap-4 items-start">
            <button className="px-10 py-4 bg-[#39ff14] text-[#0a0a0a] font-mono font-black uppercase tracking-widest rounded-none border-2 border-[#39ff14] shadow-[6px_6px_0px_#a020f0] hover:shadow-[2px_2px_0px_#a020f0] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-100">
              ACTIVATE
            </button>
            <button className="px-10 py-4 bg-transparent text-[#ff6ec7] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#ff6ec7] shadow-[6px_6px_0px_#e6ff00] hover:shadow-[2px_2px_0px_#e6ff00] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-100 transform -rotate-1">
              DISSOLVE
            </button>
          </div>

          {/* Floating skewed info card overlapping hero */}
          <div className="hidden md:block absolute top-12 right-0 w-64 transform rotate-3 bg-[#0a0a0a] border-2 border-[#e6ff00] p-5 shadow-[8px_8px_0px_#ff6ec7]">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-[#e6ff00]" />
              <span className="font-mono text-xs text-[#e6ff00] uppercase tracking-widest">
                FREQ_LOG
              </span>
            </div>
            <p className="font-mono text-[#39ff14]/40 text-xs leading-relaxed">
              Chrome gradients / Iridescent surfaces / Op-Art patterns / Warped
              typography / Psychedelic distortion
            </p>
          </div>
        </div>
      </section>

      {/* Op-Art Checkerboard Pattern Divider */}
      <div className="relative z-10 h-16 overflow-hidden">
        <div className="flex h-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{
                background:
                  i % 2 === 0
                    ? `repeating-conic-gradient(#39ff14 0% 25%, transparent 0% 50%)`
                    : `repeating-conic-gradient(#a020f0 0% 25%, transparent 0% 50%)`,
                backgroundSize: "8px 8px",
                opacity: 0.15 - i * 0.004,
              }}
            />
          ))}
        </div>
      </div>

      {/* Color Palette - Skewed layout */}
      <ShowcaseSection
        title="FLUORESCENT_PALETTE"
        subtitle="HIGH_SAT_SPECTRUM"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-black text-[#39ff14] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#a020f0]/40 font-mono uppercase tracking-widest mb-10 text-center text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#39ff14]/40 bg-[#0a0a0a] rounded-none shadow-[4px_4px_0px_#a020f0] hover:shadow-[6px_6px_0px_#ff6ec7] transition-all duration-150"
            labelClassName="font-mono font-bold text-sm text-[#39ff14] uppercase"
            hexClassName="text-xs text-[#a020f0] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Cards - Overlapping skewed grid, NOT standard 3-col */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-mono font-black text-[#e6ff00] uppercase tracking-widest mb-4">
            DATA_BLOCKS
          </h2>
          <p className="text-[#39ff14]/30 font-mono uppercase tracking-widest mb-12 text-sm">
            SKEWED_INTERFACE_MODULES
          </p>

          {/* Overlapping card grid with varying angles */}
          <div className="relative grid md:grid-cols-2 gap-0 md:gap-0">
            {/* Card 1 - skewed left */}
            <div className="p-8 bg-[#0a0a0a] border-2 border-[#39ff14] rounded-none shadow-[8px_8px_0px_#a020f0] transform -rotate-1 hover:rotate-0 hover:shadow-[12px_12px_0px_#a020f0] transition-all duration-150 relative z-10 mb-6 md:mb-0 md:-mr-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border-2 border-[#39ff14] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#39ff14]" />
                </div>
                <div className="flex-1 h-px bg-[#39ff14]/20" />
                <span className="font-mono text-[10px] text-[#39ff14]/30 uppercase">
                  MOD_01
                </span>
              </div>
              <h3 className="text-2xl font-mono font-black text-[#e6ff00] uppercase mb-2">
                WARP_FIELD
              </h3>
              <p className="text-[#39ff14]/40 font-mono text-sm">
                Distort reality through liquid chrome forms and iridescent
                surface tension
              </p>
            </div>

            {/* Card 2 - skewed right */}
            <div className="p-8 bg-[#0a0a0a] border-2 border-[#a020f0] rounded-none shadow-[8px_8px_0px_#39ff14] transform rotate-1 hover:rotate-0 hover:shadow-[12px_12px_0px_#39ff14] transition-all duration-150 relative z-20 md:-ml-4 mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border-2 border-[#a020f0] flex items-center justify-center">
                  <Orbit className="w-5 h-5 text-[#a020f0]" />
                </div>
                <div className="flex-1 h-px bg-[#a020f0]/20" />
                <span className="font-mono text-[10px] text-[#a020f0]/30 uppercase">
                  MOD_02
                </span>
              </div>
              <h3 className="text-2xl font-mono font-black text-[#ff6ec7] uppercase mb-2">
                DISSOLVE_MATRIX
              </h3>
              <p className="text-[#a020f0]/40 font-mono text-sm">
                Melt boundaries between dimensions with psychedelic frequency
                modulation
              </p>
            </div>

            {/* Card 3 - large, spans full width, different angle */}
            <div className="md:col-span-2 p-8 bg-[#0a0a0a] border-2 border-[#ff6ec7] rounded-none shadow-[8px_8px_0px_#e6ff00] transform -rotate-[0.5deg] hover:rotate-0 hover:shadow-[12px_12px_0px_#e6ff00] transition-all duration-150 relative z-30 mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border-2 border-[#ff6ec7] flex items-center justify-center">
                  <Scan className="w-5 h-5 text-[#ff6ec7]" />
                </div>
                <div className="flex-1 h-px bg-[#ff6ec7]/20" />
                <span className="font-mono text-[10px] text-[#ff6ec7]/30 uppercase">
                  MOD_03
                </span>
              </div>
              <div className="md:flex md:items-start md:justify-between md:gap-12">
                <div className="flex-1">
                  <h3 className="text-2xl font-mono font-black text-[#39ff14] uppercase mb-2">
                    FLUX_ENGINE
                  </h3>
                  <p className="text-[#ff6ec7]/40 font-mono text-sm max-w-lg">
                    Channel the psychedelic frequency through Op-Art interference
                    patterns and chrome reflections across void space
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#39ff14]" />
                  <div className="w-3 h-3 bg-[#a020f0]" />
                  <div className="w-3 h-3 bg-[#ff6ec7]" />
                  <div className="w-3 h-3 bg-[#e6ff00]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Op-Art pattern divider */}
      <div className="relative z-10 py-4 overflow-hidden">
        <div className="flex justify-center gap-[2px]">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-12"
              style={{
                backgroundColor:
                  i % 4 === 0
                    ? "#39ff14"
                    : i % 4 === 1
                      ? "#a020f0"
                      : i % 4 === 2
                        ? "#ff6ec7"
                        : "#e6ff00",
                opacity: 0.1 + Math.sin(i * 0.3) * 0.05,
              }}
            />
          ))}
        </div>
      </div>

      {/* Buttons Section */}
      <ShowcaseSection
        title="CONTROLS"
        subtitle="NEON_GLOW_BORDERS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-black text-[#39ff14] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#39ff14]/30 font-mono uppercase tracking-widest mb-10 text-center text-sm"
      >
        <div className="max-w-5xl mx-auto">
          <div className="p-8 bg-[#0a0a0a] border-2 border-[#39ff14]/30 rounded-none">
            <div className="flex items-center gap-3 mb-8">
              <Grid3X3 className="w-4 h-4 text-[#a020f0]" />
              <span className="font-mono text-xs text-[#a020f0] uppercase tracking-widest">
                VARIANT_MATRIX
              </span>
              <div className="flex-1 h-px bg-[#a020f0]/10" />
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-[#39ff14] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#39ff14] shadow-[4px_4px_0px_#a020f0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#a020f0] transition-all duration-100">
                PRIMARY
              </button>
              <button className="px-8 py-3 bg-[#a020f0] text-[#39ff14] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#a020f0] shadow-[4px_4px_0px_#e6ff00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#e6ff00] transition-all duration-100">
                SECONDARY
              </button>
              <button className="px-8 py-3 bg-transparent text-[#39ff14] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#39ff14] shadow-[4px_4px_0px_#ff6ec7] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#ff6ec7] hover:bg-[#39ff14]/5 transition-all duration-100">
                OUTLINE
              </button>
              <button className="px-8 py-3 bg-[#ff6ec7] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-none border-2 border-[#ff6ec7] shadow-[4px_4px_0px_#39ff14] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#39ff14] transition-all duration-100">
                CYBER
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* 3D Wireframe Grid Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-mono font-black text-[#a020f0] uppercase tracking-widest mb-4">
            WIREFRAME_GRID
          </h2>
          <p className="text-[#39ff14]/30 font-mono uppercase tracking-widest mb-12 text-sm">
            3D_PERSPECTIVE_SPACE
          </p>
          <div
            className="relative h-48 md:h-64 border-2 border-[#39ff14]/20 rounded-none overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(#39ff14 1px, transparent 1px), linear-gradient(90deg, #39ff14 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              transform: "perspective(800px) rotateX(45deg)",
              transformOrigin: "bottom center",
              opacity: 0.15,
            }}
          />
          <div className="mt-6 flex items-center gap-4">
            <Hexagon className="w-5 h-5 text-[#e6ff00]" />
            <p className="font-mono text-[#e6ff00]/40 text-xs uppercase tracking-widest">
              Infinite perspective grid -- vanishing point convergence
            </p>
          </div>
        </div>
      </section>

      {/* Form - Terminal aesthetic */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#0a0a0a] border-2 border-[#39ff14] rounded-none shadow-[8px_8px_0px_#a020f0]">
            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#39ff14]/20">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-[#ff6ec7]" />
                <div className="w-2 h-2 bg-[#e6ff00]" />
                <div className="w-2 h-2 bg-[#39ff14]" />
              </div>
              <span className="font-mono text-[10px] text-[#39ff14]/30 uppercase tracking-widest">
                ACCESS_TERMINAL
              </span>
              <Eye className="w-4 h-4 text-[#a020f0]/40" />
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <Triangle className="w-5 h-5 text-[#a020f0]" />
                <h3 className="text-xl font-mono font-black text-[#39ff14] uppercase tracking-widest">
                  ACCESS_PORT
                </h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#a020f0] uppercase tracking-widest mb-2">
                    HANDLE
                  </label>
                  <input
                    type="text"
                    placeholder="ENTER_HANDLE..."
                    className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#39ff14]/40 rounded-none text-[#39ff14] placeholder-[#39ff14]/20 font-mono focus:border-[#39ff14] focus:shadow-[0_0_10px_rgba(57,255,20,0.15)] focus:outline-none transition-all duration-150"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[#ff6ec7] uppercase tracking-widest mb-2">
                    SIGNAL
                  </label>
                  <input
                    type="email"
                    placeholder="ENTER_SIGNAL..."
                    className="w-full px-4 py-3 bg-[#0a0a0a] border-2 border-[#a020f0]/40 rounded-none text-[#a020f0] placeholder-[#a020f0]/20 font-mono focus:border-[#a020f0] focus:shadow-[0_0_10px_rgba(160,32,240,0.15)] focus:outline-none transition-all duration-150"
                  />
                </div>
                <button className="w-full px-6 py-3 bg-[#39ff14] text-[#0a0a0a] font-mono font-black uppercase tracking-widest rounded-none border-2 border-[#39ff14] shadow-[4px_4px_0px_#a020f0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#a020f0] transition-all duration-100">
                  TRANSMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#39ff14]/15">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-[#39ff14]/20 text-xs font-mono uppercase tracking-widest">
            ACID_GFX // SHOWCASE
          </p>
          <Link
            href="/"
            className="text-[#a020f0]/40 hover:text-[#a020f0] text-xs font-mono uppercase tracking-widest transition-colors"
          >
            StyleKit
          </Link>
        </div>
      </footer>
    </div>
  );
}
