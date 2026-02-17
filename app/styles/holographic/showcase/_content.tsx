"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Diamond,
  Palette,
  Layers,
  Wand2,
  Star,
} from "lucide-react";

function HoloCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl hover:border-purple-400/30 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-500 ${className}`}
    >
      {children}
    </div>
  );
}

function HoloBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white text-xs font-medium">
      {children}
    </span>
  );
}

const SPECTRUM_COLORS = [
  { name: "Deep Navy", hex: "#0a0a1f" },
  { name: "Hot Pink", hex: "#ff0080" },
  { name: "Orange", hex: "#ff6b00" },
  { name: "Gold", hex: "#ffd700" },
  { name: "Emerald", hex: "#00ff88" },
  { name: "Cyan", hex: "#00d4ff" },
  { name: "Indigo", hex: "#6366f1" },
  { name: "Purple", hex: "#a855f7" },
];

const FEATURES = [
  {
    icon: Diamond,
    title: "Prismatic Gradients",
    desc: "Multi-stop rainbow gradients that shift across the full spectrum",
  },
  {
    icon: Layers,
    title: "Glass Layers",
    desc: "Semi-transparent panels with backdrop blur over cosmic backgrounds",
  },
  {
    icon: Wand2,
    title: "Dynamic Shimmer",
    desc: "Animated gradient shifts that mimic holographic foil reflections",
  },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(168,85,247,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0,212,255,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1f]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-4">
              <Link
                href="/styles/holographic"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline">Back</span>
              </Link>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff]">
                Holographic
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <span className="text-purple-400 font-medium cursor-pointer">
                Features
              </span>
              <span className="text-white/60 hover:text-white transition-colors cursor-pointer">
                Components
              </span>
              <span className="text-white/60 hover:text-white transition-colors cursor-pointer">
                Palette
              </span>
            </nav>
            <button className="px-4 py-2 bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.4)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] transition-all">
              Use Style
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <HoloBadge>Holographic Design System</HoloBadge>
          <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] via-[#00ff88] via-[#00d4ff] to-[#a855f7] leading-tight">
            Holographic
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
            Prismatic rainbow gradients that shift and shimmer like holographic
            foil. An otherworldly iridescent experience on deep cosmic
            backgrounds.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button className="px-8 py-4 bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#00d4ff] text-white font-medium rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.5)] hover:shadow-[0_0_50px_rgba(147,51,234,0.7)] hover:scale-105 transition-all duration-500 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Explore Style
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-xl hover:bg-white/15 transition-all duration-300">
              View Docs
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">
            Core Principles
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <HoloCard key={feature.title} className="p-6 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff0080]/20 to-[#00d4ff]/20 flex items-center justify-center mb-4 group-hover:from-[#ff0080]/30 group-hover:to-[#00d4ff]/30 transition-all">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </HoloCard>
            ))}
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">
            Interactive Elements
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">
            Components
          </h2>

          {/* Buttons */}
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-cyan-400 mb-4">
              Buttons
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-500 bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#00d4ff] text-white shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_40px_rgba(147,51,234,0.7)] hover:scale-105">
                Rainbow Primary
              </button>
              <button className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20">
                Glass Secondary
              </button>
              <button className="px-6 py-3 rounded-xl font-medium text-sm transition-all duration-500 bg-gradient-to-r from-[#ffd700] via-[#00ff88] to-[#00d4ff] text-[#0a0a1f] shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] hover:scale-105">
                Spectrum Accent
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="mb-12 max-w-md">
            <p className="text-xs tracking-widest uppercase text-cyan-400 mb-4">
              Inputs
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Holographic input..."
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 focus:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
              />
              <input
                type="email"
                placeholder="Email address..."
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all"
              />
            </div>
          </div>

          {/* Badges */}
          <div>
            <p className="text-xs tracking-widest uppercase text-cyan-400 mb-4">
              Holographic Badges
            </p>
            <div className="flex flex-wrap gap-3">
              <HoloBadge>Prismatic</HoloBadge>
              <span className="inline-flex items-center rounded-full px-3 py-1 bg-gradient-to-r from-[#ffd700] via-[#00ff88] to-[#00d4ff] text-[#0a0a1f] text-xs font-medium">
                Spectrum
              </span>
              <span className="inline-flex items-center rounded-full px-3 py-1 bg-gradient-to-r from-[#ff0080] via-[#ff6b00] to-[#ffd700] text-white text-xs font-medium">
                Warm Holo
              </span>
              <span className="inline-flex items-center rounded-full px-3 py-1 border border-white/20 text-white/70 text-xs font-medium backdrop-blur-md">
                Glass Tag
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Holographic Foil Demo */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">
            Signature Effect
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">
            Holographic Foil
          </h2>
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <div
              className="h-64 md:h-80"
              style={{
                background:
                  "linear-gradient(135deg, #ff0080, #ff6b00, #ffd700, #00ff88, #00d4ff, #6366f1, #a855f7, #ff0080)",
                backgroundSize: "300% 300%",
                animation: "holo-gradient-shift 6s ease infinite",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Star className="w-12 h-12 text-white/80 mx-auto mb-4" />
                <p className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                  Animated Rainbow Foil
                </p>
                <p className="text-white/70 mt-2 text-sm">
                  background-size: 300% with gradient-shift animation
                </p>
              </div>
            </div>
          </div>
          <style jsx>{`
            @keyframes holo-gradient-shift {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">
            Color System
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-10">
            Spectrum Palette
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {SPECTRUM_COLORS.map((color) => (
              <div
                key={color.hex}
                className="rounded-xl border border-white/10 overflow-hidden hover:border-white/30 transition-colors"
              >
                <div
                  className="h-20"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-3 bg-white/5">
                  <p className="font-medium text-white text-xs">
                    {color.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a1f] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <span className="text-white font-bold">
                Holographic Showcase
              </span>
            </div>
            <Link
              href="/styles/holographic"
              className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Full Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
