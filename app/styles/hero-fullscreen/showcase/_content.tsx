"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowDown,
  Play,
  Zap,
  Globe,
  Shield,
  ChevronRight,
  Star,
  Check,
  Cpu,
  Wifi,
  Lock,
  Terminal,
  Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Cyberpunk Neon color palette
const colors: ColorItem[] = [
  { name: "Void", hex: "#0a0a0f", bg: "bg-[#0a0a0f]" },
  { name: "Cyan", hex: "#00ffff", bg: "bg-[#00ffff]" },
  { name: "Magenta", hex: "#ff00ff", bg: "bg-[#ff00ff]" },
  { name: "Hot Pink", hex: "#ff0080", bg: "bg-[#ff0080]" },
  { name: "Electric Blue", hex: "#0080ff", bg: "bg-[#0080ff]" },
];

// Design rules
const designRules = [
  { title: "Full Viewport", desc: "min-h-screen or h-screen for immersive impact" },
  { title: "Neon Glow", desc: "shadow-[0_0_20px_#00ffff] for glow effects" },
  { title: "Dark Base", desc: "Near-black backgrounds (#0a0a0f) for contrast" },
  { title: "Gradient Text", desc: "bg-clip-text for neon gradient typography" },
  { title: "Scan Lines", desc: "Subtle overlay patterns for tech aesthetic" },
  { title: "Animated Glow", desc: "Pulsing animations on key elements" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section 1 - Main Cyberpunk Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0a1a] to-[#0a0a0f]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }} />

        {/* Neon glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ffff]/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ff00ff]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#ff0080]/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/styles/hero-fullscreen"
              className="flex items-center gap-2 text-[#00ffff]/70 hover:text-[#00ffff] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Docs</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse shadow-[0_0_10px_#00ffff]" />
              <span className="font-bold text-xl text-white tracking-wider">NEXUS</span>
            </div>
            <Link
              href="/styles"
              className="px-4 py-2 bg-[#00ffff]/10 text-[#00ffff] rounded text-sm hover:bg-[#00ffff]/20 transition-colors border border-[#00ffff]/30"
            >
              All Styles
            </Link>
          </div>
        </nav>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* 视觉风格标注 */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00ffff]/10 rounded text-[#00ffff] text-sm font-medium mb-4 border border-[#00ffff]/30 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
            <Palette className="w-4 h-4" />
            <span>视觉风格: Cyberpunk Neon</span>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00ffff]/10 rounded text-[#00ffff] text-sm font-medium mb-8 ml-2 border border-[#00ffff]/30 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
            <Cpu className="w-4 h-4" />
            <span className="uppercase tracking-widest text-xs">Hero Fullscreen Layout</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-none tracking-tight">
            HERO<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#ff0080] drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
              FULLSCREEN
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light">
            Immersive full-viewport experiences with neon aesthetics that demand attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-[#00ffff] text-[#0a0a0f] font-bold text-lg hover:bg-[#00ffff]/90 transition-colors shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:shadow-[0_0_50px_rgba(0,255,255,0.7)]">
              INITIALIZE
            </button>
            <button className="px-8 py-4 bg-transparent text-[#ff00ff] font-bold text-lg border-2 border-[#ff00ff] hover:bg-[#ff00ff]/10 transition-colors shadow-[0_0_20px_rgba(255,0,255,0.3)] flex items-center justify-center gap-2">
              <Play className="w-5 h-5" /> WATCH DEMO
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#00ffff]/50 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Corner decorations */}
        <div className="absolute top-20 left-6 w-20 h-20 border-l-2 border-t-2 border-[#00ffff]/30" />
        <div className="absolute bottom-20 right-6 w-20 h-20 border-r-2 border-b-2 border-[#ff00ff]/30" />
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="NEON PALETTE"
        subtitle="High-contrast colors that glow against the void"
        className="py-20 px-6 bg-[#0f0a1a] border-y border-[#00ffff]/20"
        titleClassName="text-3xl font-bold text-white mb-4 text-center tracking-wider"
        subtitleClassName="text-white/40 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-white/10"
            labelClassName="font-bold text-sm text-white uppercase tracking-wider"
            hexClassName="text-xs text-white/40 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Hero Section 2 - Feature Grid */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-[#0a0a0f]" />

        {/* Scan lines effect */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)`
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              SYSTEM <span className="text-[#ff00ff]">FEATURES</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Advanced capabilities for the next generation of digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "INSTANT LOAD", desc: "Sub-second rendering with optimized assets", color: "#00ffff" },
              { icon: Globe, title: "GLOBAL REACH", desc: "Edge-deployed for worldwide performance", color: "#ff00ff" },
              { icon: Shield, title: "SECURE", desc: "Military-grade encryption protocols", color: "#ff0080" },
              { icon: Wifi, title: "CONNECTED", desc: "Real-time sync across all devices", color: "#00ffff" },
              { icon: Lock, title: "PRIVATE", desc: "Zero-knowledge architecture", color: "#ff00ff" },
              { icon: Terminal, title: "HACKABLE", desc: "Full API access for developers", color: "#ff0080" },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-6 bg-white/5 border border-white/10 hover:border-[color:var(--accent)]/50 transition-all duration-300"
                style={{ "--accent": item.color } as React.CSSProperties}
              >
                <div
                  className="w-12 h-12 mb-4 flex items-center justify-center border"
                  style={{ borderColor: item.color, boxShadow: `0 0 20px ${item.color}40` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-wider">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Rules */}
      <ShowcaseSection
        title="DESIGN PROTOCOLS"
        subtitle="Key patterns for cyberpunk hero layouts"
        className="py-20 px-6 bg-[#0f0a1a]"
        titleClassName="text-3xl font-bold text-white mb-4 text-center tracking-wider"
        subtitleClassName="text-white/40 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-5 bg-white/5 border border-white/10">
                <h4 className="font-bold text-[#00ffff] mb-2 uppercase tracking-wider text-sm">{rule.title}</h4>
                <p className="text-sm text-white/40">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Hero Section 3 - Pricing/CTA */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a0a1f] to-[#0a0a0f]" />

        {/* Animated border */}
        <div className="absolute inset-4 border border-[#00ffff]/20" />

        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff00ff]/10 rounded-full blur-[200px]" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-2 bg-[#ff00ff]/10 border border-[#ff00ff]/30 text-[#ff00ff] text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(255,0,255,0.3)]">
            Limited Access
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            READY TO<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
              JACK IN?
            </span>
          </h2>
          <p className="text-xl text-white/50 mb-10 max-w-xl mx-auto">
            Create stunning fullscreen hero experiences with cyberpunk aesthetics that captivate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-10 py-5 bg-gradient-to-r from-[#00ffff] to-[#00ffff] text-[#0a0a0f] font-bold text-lg shadow-[0_0_40px_rgba(0,255,255,0.5)] hover:shadow-[0_0_60px_rgba(0,255,255,0.7)] transition-all">
              GET ACCESS NOW
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Star, label: "4.9 RATING" },
              { icon: Cpu, label: "10K+ USERS" },
              { icon: Shield, label: "SECURE" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/30">
                <item.icon className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overlay Types Demo */}
      <ShowcaseSection
        title="OVERLAY MODES"
        subtitle="Different overlay styles for various moods"
        className="py-20 px-6 bg-[#0a0a0f]"
        titleClassName="text-3xl font-bold text-white mb-4 text-center tracking-wider"
        subtitleClassName="text-white/40 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Cyan Glow */}
          <div className="relative h-64 overflow-hidden border border-[#00ffff]/30">
            <div className="absolute inset-0 bg-[#0a0a0f]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00ffff]/30 via-transparent to-transparent" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
              <h3 className="font-bold text-lg mb-2 tracking-wider text-[#00ffff]">CYAN GLOW</h3>
              <p className="text-sm text-white/40 text-center">from-[#00ffff]/30</p>
            </div>
          </div>

          {/* Magenta Glow */}
          <div className="relative h-64 overflow-hidden border border-[#ff00ff]/30">
            <div className="absolute inset-0 bg-[#0a0a0f]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#ff00ff]/30 via-transparent to-transparent" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
              <h3 className="font-bold text-lg mb-2 tracking-wider text-[#ff00ff]">MAGENTA GLOW</h3>
              <p className="text-sm text-white/40 text-center">from-[#ff00ff]/30</p>
            </div>
          </div>

          {/* Dual Glow */}
          <div className="relative h-64 overflow-hidden border border-[#ff0080]/30">
            <div className="absolute inset-0 bg-[#0a0a0f]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/20 via-transparent to-[#ff00ff]/20" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
              <h3 className="font-bold text-lg mb-2 tracking-wider text-[#ff0080]">DUAL GLOW</h3>
              <p className="text-sm text-white/40 text-center">Diagonal gradient</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/30 text-sm tracking-wider">
            Hero Fullscreen Showcase{" "}
            <Link href="/" className="text-[#00ffff] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
