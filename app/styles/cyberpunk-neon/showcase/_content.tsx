"use client";

import Link from "next/link";
import { ArrowLeft, Zap, Terminal, Shield, Cpu } from "lucide-react";

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Scanlines Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-cyan-400/30 bg-[#0a0a0f]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link
            href="/styles/cyberpunk-neon"
            className="font-mono text-cyan-400 text-sm md:text-base tracking-widest hover:text-cyan-300 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">BACK</span>
          </Link>
          <div className="font-mono text-cyan-400 text-xs md:text-sm tracking-[0.3em] uppercase">
            Cyberpunk Neon
          </div>
          <Link
            href="/styles"
            className="font-mono text-cyan-400/60 text-sm hover:text-cyan-400 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-4 md:px-8 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 border border-cyan-400/50 text-cyan-400 font-mono text-xs tracking-widest mb-6">
            STYLE://CYBERPUNK
          </div>
          <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">CYBER</span>
            <br />
            <span className="text-fuchsia-500 drop-shadow-[0_0_20px_rgba(255,0,255,0.5)]">PUNK</span>
            <span className="text-white">.NEON</span>
          </h1>
          <p className="font-mono text-gray-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            High-tech futuristic aesthetic. Neon glows, dark backgrounds,
            scan lines, and terminal-style typography.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="font-mono px-6 py-3 bg-cyan-400 text-black font-bold tracking-wider hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]">
              INITIALIZE
            </button>
            <button className="font-mono px-6 py-3 border border-cyan-400 text-cyan-400 tracking-wider hover:bg-cyan-400/10 transition-colors">
              VIEW DOCS
            </button>
          </div>
        </div>
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // COLOR_SYSTEM
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Neon Cyan", hex: "#00FFFF", bg: "bg-cyan-400", glow: "shadow-[0_0_20px_rgba(0,255,255,0.5)]" },
              { name: "Hot Pink", hex: "#FF00FF", bg: "bg-fuchsia-500", glow: "shadow-[0_0_20px_rgba(255,0,255,0.5)]" },
              { name: "Electric Blue", hex: "#0066FF", bg: "bg-blue-500", glow: "shadow-[0_0_20px_rgba(0,102,255,0.5)]" },
              { name: "Warning", hex: "#FF3366", bg: "bg-rose-500", glow: "shadow-[0_0_20px_rgba(255,51,102,0.5)]" },
              { name: "Void Black", hex: "#0A0A0F", bg: "bg-[#0a0a0f]", glow: "border border-cyan-400/30" },
            ].map((color) => (
              <div key={color.name} className="border border-cyan-400/30 bg-[#0a0a0f]">
                <div className={`h-20 md:h-28 ${color.bg} ${color.glow}`} />
                <div className="p-3 md:p-4 border-t border-cyan-400/30">
                  <p className="font-mono text-xs md:text-sm text-cyan-400">{color.name}</p>
                  <p className="font-mono text-xs text-gray-500">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-fuchsia-500">
            // BUTTONS
          </h2>
          <div className="space-y-8">
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">VARIANTS</p>
              <div className="flex flex-wrap gap-4">
                <button className="font-mono px-6 py-3 bg-cyan-400 text-black font-bold tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                  PRIMARY
                </button>
                <button className="font-mono px-6 py-3 border border-cyan-400 text-cyan-400 tracking-wider hover:bg-cyan-400/10 transition-all">
                  SECONDARY
                </button>
                <button className="font-mono px-6 py-3 bg-fuchsia-500 text-white font-bold tracking-wider hover:bg-fuchsia-400 transition-all shadow-[0_0_20px_rgba(255,0,255,0.5)]">
                  ACCENT
                </button>
                <button className="font-mono px-6 py-3 border border-rose-500 text-rose-500 tracking-wider hover:bg-rose-500/10 transition-all">
                  DANGER
                </button>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">WITH ICONS</p>
              <div className="flex flex-wrap gap-4">
                <button className="font-mono px-6 py-3 bg-cyan-400 text-black font-bold tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,255,255,0.5)] flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  POWER
                </button>
                <button className="font-mono px-6 py-3 border border-cyan-400 text-cyan-400 tracking-wider hover:bg-cyan-400/10 transition-all flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  TERMINAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // DATA_CARDS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-cyan-400/30 bg-[#0a0a0f] p-6 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all group">
              <div className="w-12 h-12 border border-cyan-400 flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-mono text-lg font-bold text-white mb-2">SECURITY.SYS</h3>
              <p className="font-mono text-sm text-gray-500 leading-relaxed">
                Advanced encryption protocols with quantum-resistant algorithms.
              </p>
              <div className="mt-4 pt-4 border-t border-cyan-400/20">
                <span className="font-mono text-xs text-cyan-400 tracking-widest">STATUS: ACTIVE</span>
              </div>
            </div>
            <div className="border border-fuchsia-500/30 bg-[#0a0a0f] p-6 hover:border-fuchsia-500 hover:shadow-[0_0_30px_rgba(255,0,255,0.2)] transition-all group">
              <div className="w-12 h-12 border border-fuchsia-500 flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] transition-all">
                <Cpu className="w-6 h-6 text-fuchsia-500" />
              </div>
              <h3 className="font-mono text-lg font-bold text-white mb-2">NEURAL.NET</h3>
              <p className="font-mono text-sm text-gray-500 leading-relaxed">
                Deep learning networks for pattern recognition and prediction.
              </p>
              <div className="mt-4 pt-4 border-t border-fuchsia-500/20">
                <span className="font-mono text-xs text-fuchsia-500 tracking-widest">STATUS: SYNCING</span>
              </div>
            </div>
            <div className="border border-blue-500/30 bg-[#0a0a0f] p-6 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] transition-all group">
              <div className="w-12 h-12 border border-blue-500 flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(0,102,255,0.5)] transition-all">
                <Terminal className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-mono text-lg font-bold text-white mb-2">COMMAND.IO</h3>
              <p className="font-mono text-sm text-gray-500 leading-relaxed">
                Terminal interface for direct system manipulation and control.
              </p>
              <div className="mt-4 pt-4 border-t border-blue-500/20">
                <span className="font-mono text-xs text-blue-500 tracking-widest">STATUS: READY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-fuchsia-500">
            // INPUT_FIELDS
          </h2>
          <div className="space-y-6">
            <div>
              <label className="font-mono text-xs text-gray-500 mb-2 block tracking-widest">USERNAME</label>
              <input
                type="text"
                placeholder="Enter username..."
                className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 font-mono text-cyan-400 placeholder:text-gray-600 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-500 mb-2 block tracking-widest">PASSWORD</label>
              <input
                type="password"
                placeholder="Enter password..."
                className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 font-mono text-cyan-400 placeholder:text-gray-600 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-500 mb-2 block tracking-widest">MESSAGE</label>
              <textarea
                placeholder="Enter message..."
                rows={4}
                className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 font-mono text-cyan-400 placeholder:text-gray-600 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all resize-none"
              />
            </div>
            <button className="w-full font-mono px-6 py-3 bg-cyan-400 text-black font-bold tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,255,255,0.5)]">
              TRANSMIT
            </button>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // CORE_RULES
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-cyan-400/30 p-6">
              <h3 className="font-mono text-lg font-bold text-cyan-400 mb-4">REQUIRED</h3>
              <ul className="font-mono text-sm text-gray-400 space-y-2">
                <li>+ Dark background (#0a0a0f)</li>
                <li>+ Neon glow effects (shadow)</li>
                <li>+ Monospace typography</li>
                <li>+ Cyan/Fuchsia accent colors</li>
                <li>+ Scanline overlay effect</li>
                <li>+ Sharp corners (no radius)</li>
                <li>+ Terminal-style UI elements</li>
              </ul>
            </div>
            <div className="border border-rose-500/30 p-6">
              <h3 className="font-mono text-lg font-bold text-rose-500 mb-4">FORBIDDEN</h3>
              <ul className="font-mono text-sm text-gray-400 space-y-2">
                <li>- Light backgrounds</li>
                <li>- Rounded corners</li>
                <li>- Soft shadows</li>
                <li>- Serif or sans-serif fonts</li>
                <li>- Warm color palettes</li>
                <li>- Natural/organic shapes</li>
                <li>- Subtle hover effects</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-400/20 py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-gray-600 tracking-widest">
            STYLEKIT // CYBERPUNK_NEON // v1.0.0
          </p>
          <Link
            href="/styles/cyberpunk-neon"
            className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors tracking-widest"
          >
            VIEW FULL DOCUMENTATION
          </Link>
        </div>
      </footer>
    </div>
  );
}
