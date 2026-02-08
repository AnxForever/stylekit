"use client";

import Link from "next/link";
import { ArrowLeft, Zap, Monitor, Cpu, Terminal, Radio, Binary, Wifi } from "lucide-react";
import {
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
      {/* Global scan line overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)",
        }}
      />

      {/* VHS tracking error lines */}
      <div className="fixed top-[15%] left-0 right-0 h-[2px] bg-[#ffffff]/[0.04] pointer-events-none z-40" />
      <div className="fixed top-[15%] left-0 right-0 h-[1px] mt-[2px] bg-[#00ffff]/[0.08] pointer-events-none z-40" />
      <div className="fixed top-[65%] left-0 right-0 h-[3px] bg-[#ffffff]/[0.03] pointer-events-none z-40" />
      <div className="fixed top-[65%] left-0 right-0 h-[1px] mt-[3px] bg-[#ff00ff]/[0.06] pointer-events-none z-40" />

      {/* Floating data corruption blocks */}
      <div className="fixed top-24 right-8 w-36 h-2 bg-[#ff00ff]/15 pointer-events-none" />
      <div className="fixed top-[26px] right-14 w-28 h-2 bg-[#00ffff]/15 pointer-events-none" style={{ top: "calc(6rem + 4px)" }} />
      <div className="fixed bottom-40 left-6 w-44 h-1 bg-[#ffff00]/10 pointer-events-none" />
      <div className="fixed bottom-36 left-10 w-32 h-1 bg-[#ff00ff]/10 pointer-events-none" />
      <div className="fixed top-[45%] left-4 w-20 h-8 bg-[#00ffff]/[0.04] pointer-events-none" />
      <div className="fixed top-[45%] left-6 w-20 h-8 bg-[#ff00ff]/[0.03] pointer-events-none" />

      {/* Navigation - terminal status bar style */}
      <nav className="relative z-10 px-6 py-3 border-b border-[#00ffff]/20 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/glitch-art"
            className="flex items-center gap-2 text-[#00ffff] hover:text-[#00ffff]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono font-bold uppercase tracking-widest text-sm">../styles</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#00ffff] rounded-none animate-pulse" />
            <span className="font-mono font-bold text-sm text-[#00ffff]/60 uppercase tracking-[0.3em]">
              SIGNAL_ACTIVE
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#00ffff]/30 text-[#00ffff] font-mono font-bold uppercase tracking-widest text-sm rounded-none shadow-[2px_0_#ff00ff,-2px_0_#ffff00] hover:shadow-[4px_0_#ff00ff,-4px_0_#ffff00] transition-all"
          >
            [ALL_STYLES]
          </Link>
        </div>
      </nav>

      {/* Hero - Full-screen RGB split terminal */}
      <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-6">
        {/* RGB channel split title */}
        <div className="relative mb-6">
          <span className="block text-6xl md:text-9xl font-mono font-black text-[#ffff00] uppercase absolute top-[-3px] left-[-5px] opacity-30 select-none" aria-hidden="true">
            GLITCH
          </span>
          <span className="block text-6xl md:text-9xl font-mono font-black text-[#ff00ff] uppercase absolute top-[3px] left-[5px] opacity-50 select-none" aria-hidden="true">
            GLITCH
          </span>
          <h1 className="block text-6xl md:text-9xl font-mono font-black text-[#00ffff] uppercase relative">
            GLITCH
          </h1>
        </div>

        {/* Horizontal displacement bar across subtitle */}
        <div className="relative mb-4">
          <div className="absolute -left-20 top-1/2 w-[calc(100%+40px)] h-[3px] bg-[#ff00ff]/20 -translate-y-1/2 pointer-events-none" />
          <div className="relative">
            <span className="text-4xl md:text-6xl font-mono font-black text-[#ff00ff] uppercase absolute top-[2px] left-[4px] opacity-50 select-none" aria-hidden="true">
              ART
            </span>
            <span className="text-4xl md:text-6xl font-mono font-black text-[#ffff00] uppercase absolute top-[-2px] left-[-4px] opacity-30 select-none" aria-hidden="true">
              ART
            </span>
            <span className="text-4xl md:text-6xl font-mono font-black text-[#00ffff] uppercase relative">
              ART
            </span>
          </div>
        </div>

        <p className="text-sm text-[#ffffff]/20 font-mono uppercase tracking-[0.5em] mb-12">
          ERROR_404: Reality not found
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#00ffff] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-none shadow-[3px_0_#ff00ff,-3px_0_#ffff00] hover:shadow-[6px_0_#ff00ff,-6px_0_#ffff00] transition-all duration-100">
            EXECUTE_
          </button>
          <button className="px-10 py-4 bg-[#0a0a0a] text-[#00ffff] border border-[#00ffff]/50 font-mono font-bold uppercase tracking-widest rounded-none shadow-[3px_0_#ff00ff,-3px_0_#ffff00] hover:shadow-[6px_0_#ff00ff,-6px_0_#ffff00] transition-all duration-100">
            CORRUPT_
          </button>
        </div>
      </section>

      {/* Data corruption console - unique layout with side-by-side terminal panels */}
      <ShowcaseSection
        title="DATA_STREAM"
        subtitle="INTERCEPTED_SIGNALS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#00ffff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#ffffff]/15 font-mono uppercase tracking-[0.4em] mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-1">
          {/* Left panel - signal monitor */}
          <div className="bg-[#0a0a0a] border border-[#00ffff]/20 rounded-none p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#00ffff]/10">
              <Radio className="w-4 h-4 text-[#00ffff]" />
              <span className="font-mono text-xs text-[#00ffff]/60 uppercase tracking-widest">SIGNAL_MONITOR</span>
              <div className="ml-auto w-2 h-2 bg-[#00ffff] animate-pulse" />
            </div>
            {/* Simulated signal bars */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#ff00ff]/60 w-8">R:</span>
                <div className="flex-1 h-3 bg-[#111] overflow-hidden">
                  <div className="h-full bg-[#ff00ff]/60 w-[72%]" />
                </div>
                <span className="font-mono text-xs text-[#ff00ff]/40">0x72</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#00ffff]/60 w-8">G:</span>
                <div className="flex-1 h-3 bg-[#111] overflow-hidden">
                  <div className="h-full bg-[#00ffff]/60 w-[91%]" />
                </div>
                <span className="font-mono text-xs text-[#00ffff]/40">0x91</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#ffff00]/60 w-8">B:</span>
                <div className="flex-1 h-3 bg-[#111] overflow-hidden">
                  <div className="h-full bg-[#ffff00]/60 w-[45%]" />
                </div>
                <span className="font-mono text-xs text-[#ffff00]/40">0x45</span>
              </div>
            </div>
            <div className="text-xs font-mono text-[#ffffff]/10 leading-relaxed">
              <p>&#62; channel_split --offset 4px</p>
              <p>&#62; scan_overlay --freq 2px</p>
              <p className="text-[#ff00ff]/30">&#62; ERR: buffer overflow at 0xFFAE</p>
              <p className="text-[#00ffff]/20">&#62; reconnecting...</p>
            </div>
          </div>

          {/* Right panel - data blocks */}
          <div className="bg-[#0a0a0a] border border-[#ff00ff]/20 rounded-none p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#ff00ff]/10">
              <Binary className="w-4 h-4 text-[#ff00ff]" />
              <span className="font-mono text-xs text-[#ff00ff]/60 uppercase tracking-widest">DATA_BLOCKS</span>
              <span className="ml-auto font-mono text-xs text-[#ffff00]/30">3 corrupted</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { color: "#00ffff", label: "0x00FF", status: "OK" },
                { color: "#ff00ff", label: "0xFF00", status: "CORRUPT" },
                { color: "#ffff00", label: "0xFFFF", status: "OK" },
                { color: "#ff00ff", label: "0xAE03", status: "LOST" },
                { color: "#00ffff", label: "0x7B21", status: "OK" },
                { color: "#ffff00", label: "0xD4CC", status: "CORRUPT" },
              ].map((block) => (
                <div
                  key={block.label}
                  className="p-3 border rounded-none text-center"
                  style={{ borderColor: `${block.color}30` }}
                >
                  <p className="font-mono text-xs" style={{ color: block.color }}>{block.label}</p>
                  <p className="font-mono text-[10px] mt-1" style={{ color: block.status === "OK" ? "#00ffff50" : "#ff00ff50" }}>
                    [{block.status}]
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* RGB Channels palette - inline with hex readout */}
      <ShowcaseSection
        title="RGB_CHANNELS"
        subtitle="PRIMARY_SIGNALS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#00ffff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#ffffff]/15 font-mono uppercase tracking-[0.4em] mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#00ffff]/20 bg-[#0a0a0a] rounded-none"
            labelClassName="font-mono font-bold text-sm text-[#ffffff]/70 uppercase"
            hexClassName="text-xs text-[#00ffff] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Component Matrix - displacement band-separated sections */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Full-width displacement band separator */}
          <div className="relative mb-16 h-8">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-[#00ffff]/15" />
            <div className="absolute inset-x-0 top-[4px] h-[2px] bg-[#ff00ff]/10 translate-x-2" />
            <div className="absolute inset-x-0 top-[7px] h-[1px] bg-[#ffff00]/08" style={{ transform: "translateX(-3px)" }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-6">
              <span className="font-mono text-sm text-[#00ffff]/40 uppercase tracking-[0.5em]">COMPONENTS</span>
            </div>
          </div>

          {/* Buttons row */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-[#00ffff]" />
              <span className="font-mono font-bold text-sm text-[#00ffff] uppercase tracking-widest">BUTTONS // RGB_DISPLACEMENT</span>
            </div>
            <div className="p-6 bg-[#0a0a0a] border border-[#00ffff]/15 rounded-none relative">
              {/* Scan line texture on card */}
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.02) 3px, rgba(0,255,255,0.02) 4px)",
              }} />
              <div className="relative flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#00ffff] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-none shadow-[3px_0_#ff00ff,-3px_0_#ffff00] hover:shadow-[6px_0_#ff00ff,-6px_0_#ffff00] transition-all duration-100">
                  Cyan
                </button>
                <button className="px-6 py-3 bg-[#0a0a0a] text-[#00ffff] border border-[#00ffff] font-mono font-bold uppercase tracking-widest rounded-none shadow-[3px_0_#ff00ff,-3px_0_#ffff00] hover:shadow-[6px_0_#ff00ff,-6px_0_#ffff00] transition-all duration-100">
                  Outline
                </button>
                <button className="px-6 py-3 bg-[#ff00ff] text-white font-mono font-bold uppercase tracking-widest rounded-none shadow-[3px_0_#00ffff,-3px_0_#ffff00] hover:shadow-[6px_0_#00ffff,-6px_0_#ffff00] transition-all duration-100">
                  Magenta
                </button>
                <button className="px-6 py-3 bg-transparent text-[#ffff00] border border-[#ffff00]/50 font-mono font-bold uppercase tracking-widest rounded-none shadow-[2px_0_#ff00ff,-2px_0_#00ffff] hover:shadow-[4px_0_#ff00ff,-4px_0_#00ffff] transition-all duration-100">
                  Yellow
                </button>
                <button className="px-6 py-3 bg-[#0a0a0a] text-[#00ffff]/40 border border-[#00ffff]/15 font-mono font-bold uppercase tracking-widest rounded-none cursor-not-allowed opacity-40">
                  Disabled
                </button>
              </div>
            </div>
          </div>

          {/* Cards - corrupted data panels with displacement borders */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Monitor className="w-5 h-5 text-[#ff00ff]" />
              <span className="font-mono font-bold text-sm text-[#ff00ff] uppercase tracking-widest">CARDS // CORRUPTED_PANELS</span>
            </div>
            <div className="grid md:grid-cols-3 gap-1">
              <div className="p-6 bg-[#0a0a0a] border-l-2 border-[#00ffff]/40 relative group hover:bg-[#00ffff]/[0.02] transition-colors duration-100">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00ffff]/20" />
                <div className="absolute top-[2px] left-[3px] w-full h-[1px] bg-[#ff00ff]/10" />
                <Zap className="w-8 h-8 text-[#00ffff] mb-4" />
                <h3 className="text-lg font-mono font-bold text-[#00ffff] uppercase mb-2">SIGNAL</h3>
                <p className="text-[#ffffff]/25 font-mono text-sm">Data stream intercepted and decoded from corrupted channel</p>
                <div className="mt-4 pt-3 border-t border-[#00ffff]/10">
                  <span className="font-mono text-xs text-[#00ffff]/30">SECTOR_0x7A // ACTIVE</span>
                </div>
              </div>

              <div className="p-6 bg-[#0a0a0a] border-l-2 border-[#ff00ff]/40 relative group hover:bg-[#ff00ff]/[0.02] transition-colors duration-100">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#ff00ff]/20" />
                <div className="absolute top-[2px] left-[-2px] w-full h-[1px] bg-[#ffff00]/10" />
                <Cpu className="w-8 h-8 text-[#ff00ff] mb-4" />
                <h3 className="text-lg font-mono font-bold text-[#ff00ff] uppercase mb-2">PROCESS</h3>
                <p className="text-[#ffffff]/25 font-mono text-sm">CRT phosphor burn-in detected. Buffer overflow in memory</p>
                <div className="mt-4 pt-3 border-t border-[#ff00ff]/10">
                  <span className="font-mono text-xs text-[#ff00ff]/30">SECTOR_0xBE // CORRUPTED</span>
                </div>
              </div>

              <div className="p-6 bg-[#0a0a0a] border-l-2 border-[#ffff00]/40 relative group hover:bg-[#ffff00]/[0.02] transition-colors duration-100">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#ffff00]/20" />
                <div className="absolute top-[2px] left-[5px] w-full h-[1px] bg-[#00ffff]/10" />
                <Wifi className="w-8 h-8 text-[#ffff00] mb-4" />
                <h3 className="text-lg font-mono font-bold text-[#ffff00] uppercase mb-2">TRANSMIT</h3>
                <p className="text-[#ffffff]/25 font-mono text-sm">Broadcast signal degraded. Packet loss at network boundary</p>
                <div className="mt-4 pt-3 border-t border-[#ffff00]/10">
                  <span className="font-mono text-xs text-[#ffff00]/30">SECTOR_0xD4 // DEGRADED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Input terminal */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-5 h-5 text-[#ffff00]" />
              <span className="font-mono font-bold text-sm text-[#ffff00] uppercase tracking-widest">INPUT // DATA_ENTRY_TERMINAL</span>
            </div>
            <div className="max-w-lg">
              <div className="p-6 bg-[#0a0a0a] border border-[#00ffff]/15 rounded-none relative">
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.02) 3px, rgba(0,255,255,0.02) 4px)",
                }} />
                <div className="relative space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#ff00ff] uppercase tracking-widest mb-2">USER_ID</label>
                    <input
                      type="text"
                      placeholder="ENTER_ID..."
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#00ffff]/30 rounded-none text-[#00ffff] placeholder-[#00ffff]/20 font-mono focus:border-[#00ffff] focus:shadow-[0_0_10px_#00ffff30,3px_0_#ff00ff20,-3px_0_#ffff0020] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#ffff00] uppercase tracking-widest mb-2">PASSKEY</label>
                    <input
                      type="password"
                      placeholder="ENTER_KEY..."
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#00ffff]/30 rounded-none text-[#00ffff] placeholder-[#00ffff]/20 font-mono focus:border-[#ff00ff] focus:shadow-[0_0_10px_#ff00ff30,3px_0_#00ffff20,-3px_0_#ffff0020] focus:outline-none transition-all"
                    />
                  </div>
                  <button className="w-full px-6 py-3 bg-[#00ffff] text-[#0a0a0a] font-mono font-bold uppercase tracking-widest rounded-none shadow-[3px_0_#ff00ff,-3px_0_#ffff00] hover:shadow-[6px_0_#ff00ff,-6px_0_#ffff00] transition-all duration-100">
                    AUTHENTICATE_
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - data stream */}
      <footer className="relative z-10 py-6 px-6 border-t border-[#00ffff]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-[#ffffff]/15 text-xs font-mono uppercase tracking-widest">
            GLITCH_ART // SHOWCASE v1.0
          </p>
          <Link href="/" className="text-[#00ffff]/30 hover:text-[#00ffff]/60 transition-colors font-mono text-xs uppercase tracking-widest">
            StyleKit
          </Link>
        </div>
      </footer>
    </div>
  );
}
