"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Palette, Zap, Smartphone, Layers, Sparkles, Bell, ChevronDown, Check, X, Volume2, Wifi, Bluetooth, Moon } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Liquid Glass colors
const colors: ColorItem[] = [
  { name: "Red", hex: "#ff6b6b", bg: "bg-[#ff6b6b]" },
  { name: "Orange", hex: "#ffd93d", bg: "bg-[#ffd93d]" },
  { name: "Green", hex: "#6bcb77", bg: "bg-[#6bcb77]" },
  { name: "Cyan", hex: "#4ecdc4", bg: "bg-[#4ecdc4]" },
  { name: "Purple", hex: "#a855f7", bg: "bg-[#a855f7]" },
  { name: "Glass", hex: "rgba(255,255,255,0.1)", bg: "bg-white/10" },
];

// Design rules
const designRules = [
  { title: "Rainbow Border", desc: "Use gradient border via ::before pseudo-element" },
  { title: "High Blur", desc: "backdrop-blur-[40px] for strong glass effect" },
  { title: "High Saturation", desc: "backdrop-saturate-[1.8] for vibrant colors" },
  { title: "Fluid Animation", desc: "duration-500 ease-out for liquid motion" },
  { title: "Large Corners", desc: "rounded-[24px] or larger for organic feel" },
  { title: "Top Highlight", desc: "Gradient from white/20 to transparent" },
];

export default function ShowcaseContent() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [toggleStates, setToggleStates] = useState([true, false, true, false]);

  const toggleSwitch = (index: number) => {
    const newStates = [...toggleStates];
    newStates[index] = !newStates[index];
    setToggleStates(newStates);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]">
      {/* Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] border-b border-white/10 [box-shadow:0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(168,85,247,0.2)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/liquid-glass"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <span className="font-bold text-xl text-white">Liquid Glass</span>
          <Link
            href="/styles"
            className="relative px-4 py-2 bg-white/10 backdrop-blur-md rounded-[12px] text-white text-sm hover:bg-white/15 transition-all duration-300 before:absolute before:inset-0 before:rounded-[12px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#ff6b6b]/10 rounded-full blur-[100px]" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#4ecdc4]/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto text-center relative">
          <ShowcaseHero
            title="Liquid Glass"
            description="Apple WWDC 2025 design language featuring rainbow edge refraction, fluid morphing animations, and multi-layer glass stacking for organic, flowing visual experiences."
            className="text-center"
            titleClassName="text-5xl md:text-7xl font-bold text-white mb-6"
            descriptionClassName="text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            <div className="flex flex-wrap justify-center gap-4">
              <button className="relative px-8 py-4 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-full text-white font-semibold hover:bg-white/15 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-500 before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7] after:absolute after:inset-[1px] after:rounded-full after:-z-10 after:bg-gradient-to-b after:from-white/20 after:to-transparent">
                Get Started
              </button>
              <button className="px-8 py-4 border border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </ShowcaseHero>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Rainbow Spectrum"
        subtitle="Prismatic edge colors for light refraction effect"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="relative rounded-[16px] overflow-hidden bg-white/5 backdrop-blur-md before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/20 before:to-transparent"
            labelClassName="font-semibold text-sm text-white"
            hexClassName="text-xs text-white/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Clean text on glass surfaces with proper contrast"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff6b6b]/50 before:via-[#4ecdc4]/50 before:to-[#a855f7]/50">
            <h1 className="text-4xl font-bold text-white mb-4">Heading 1</h1>
            <h2 className="text-3xl font-semibold text-white mb-4">Heading 2</h2>
            <h3 className="text-2xl font-medium text-white mb-4">Heading 3</h3>
            <p className="text-white/80 mb-4">Body text with comfortable contrast for readability on glass surfaces. The subtle transparency allows background elements to show through while maintaining legibility.</p>
            <p className="text-white/50 text-sm">Caption text - muted for secondary information</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Glass buttons with rainbow border gradients and glow effects"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[28px] before:absolute before:inset-0 before:rounded-[28px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff6b6b]/30 before:via-transparent before:to-[#a855f7]/30">
            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="relative px-6 py-3 bg-white/10 backdrop-blur-md rounded-[16px] text-white font-semibold hover:bg-white/15 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-500 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]">
                Primary
              </button>
              <button className="px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-[16px] text-white font-semibold hover:bg-white/10 transition-all duration-500">
                Secondary
              </button>
              <button className="relative px-6 py-3 bg-[#007AFF]/20 backdrop-blur-md rounded-[16px] text-white font-semibold hover:bg-[#007AFF]/30 hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all duration-500 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#007AFF] before:to-[#5AC8FA]">
                Accent
              </button>
              <button className="px-6 py-3 text-white/80 hover:text-white transition-all duration-300">
                Ghost
              </button>
            </div>

            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6 mt-10">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="relative px-4 py-2 text-sm bg-white/10 backdrop-blur-md rounded-[12px] text-white font-medium hover:bg-white/15 transition-all duration-500 before:absolute before:inset-0 before:rounded-[12px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]">
                Small
              </button>
              <button className="relative px-6 py-3 bg-white/10 backdrop-blur-md rounded-[16px] text-white font-semibold hover:bg-white/15 transition-all duration-500 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]">
                Medium
              </button>
              <button className="relative px-8 py-4 text-lg bg-white/10 backdrop-blur-md rounded-[20px] text-white font-semibold hover:bg-white/15 transition-all duration-500 before:absolute before:inset-0 before:rounded-[20px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]">
                Large
              </button>
            </div>

            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6 mt-10">Pill Buttons</p>
            <div className="flex flex-wrap gap-4">
              <button className="relative px-8 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold hover:bg-white/15 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-500 before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]">
                Pill Primary
              </button>
              <button className="px-8 py-3 border border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-500">
                Pill Outline
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Multi-layer glass cards with rainbow edge refraction"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="relative p-6 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] shadow-xl hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all duration-500 before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7] after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10 after:bg-gradient-to-b after:from-white/15 after:to-transparent [box-shadow:inset_0_1px_0_rgba(255,255,255,0.4)]">
            <div className="w-12 h-12 bg-white/15 rounded-[12px] flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Multi-Layer</h3>
            <p className="text-white/70">Stacked glass panels create depth and dimension in the interface</p>
          </div>

          <div className="relative p-6 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] shadow-xl hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(78,205,196,0.2)] transition-all duration-500 before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#4ecdc4] before:via-[#6bcb77] before:to-[#ffd93d] after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10 after:bg-gradient-to-b after:from-white/15 after:to-transparent [box-shadow:inset_0_1px_0_rgba(255,255,255,0.4)]">
            <div className="w-12 h-12 bg-white/15 rounded-[12px] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Refraction</h3>
            <p className="text-white/70">Rainbow prismatic edges simulate light bending through glass</p>
          </div>

          <div className="relative p-6 bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] shadow-xl hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,107,107,0.2)] transition-all duration-500 before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#a855f7] before:via-[#ff6b6b] before:to-[#ffd93d] after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10 after:bg-gradient-to-b after:from-white/15 after:to-transparent [box-shadow:inset_0_1px_0_rgba(255,255,255,0.4)]">
            <div className="w-12 h-12 bg-white/15 rounded-[12px] flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Fluid Motion</h3>
            <p className="text-white/70">Smooth 500ms transitions create liquid-like movement</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Form Elements"
        subtitle="Glass inputs with rainbow focus rings"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[32px] shadow-2xl before:absolute before:inset-0 before:rounded-[32px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7] after:absolute after:inset-[1px] after:rounded-[31px] after:-z-10 after:bg-gradient-to-b after:from-white/20 after:to-transparent">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Contact Form</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[16px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-transparent focus:shadow-[0_0_0_2px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.2)] transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[16px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-transparent focus:shadow-[0_0_0_2px_rgba(78,205,196,0.5),0_0_20px_rgba(78,205,196,0.2)] transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Message</label>
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-[16px] text-white placeholder-white/50 focus:outline-none focus:bg-white/15 focus:border-transparent focus:shadow-[0_0_0_2px_rgba(255,107,107,0.5),0_0_20px_rgba(255,107,107,0.2)] transition-all duration-500 resize-none"
                />
              </div>
              <button className="relative w-full px-6 py-3 bg-white/10 backdrop-blur-md rounded-[16px] text-white font-semibold hover:bg-white/15 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-500 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Glass tab navigation with glow indicators"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
            <div className="flex gap-2 p-1 bg-white/5 rounded-[16px] mb-6">
              {["Overview", "Features", "Pricing"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(i)}
                  className={`flex-1 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-500 ${
                    selectedTab === i
                      ? "bg-white/15 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-white/80">
              {selectedTab === 0 && <p>Overview content with glass morphism styling and smooth transitions.</p>}
              {selectedTab === 1 && <p>Features list showcasing rainbow edge effects and fluid animations.</p>}
              {selectedTab === 2 && <p>Pricing tiers displayed in multi-layer glass cards.</p>}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Refraction Badges */}
      <ShowcaseSection
        title="Badges"
        subtitle="Capsule badges with rainbow pulse animation"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
            <div className="flex flex-wrap gap-3">
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]">
                <Sparkles className="w-3.5 h-3.5" /> New
              </span>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#34C759] before:to-[#30D158]">
                <Check className="w-3.5 h-3.5" /> Success
              </span>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#FF9500] before:to-[#FFCC00]">
                <Bell className="w-3.5 h-3.5" /> Warning
              </span>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#FF2D55] before:to-[#FF3B30]">
                <X className="w-3.5 h-3.5" /> Error
              </span>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white text-sm animate-pulse before:absolute before:inset-0 before:rounded-full before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#007AFF] before:to-[#5AC8FA]">
                <Zap className="w-3.5 h-3.5" /> Live
              </span>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Glass Stack Demo */}
      <ShowcaseSection
        title="Glass Stack"
        subtitle="Multi-layer stacking with depth offset"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto relative h-80">
          {/* Stack layer 3 (back) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[280px] h-[180px] bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] rotate-[-3deg] translate-y-4" />
          {/* Stack layer 2 (middle) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[280px] h-[180px] bg-white/8 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] rotate-[1deg] translate-y-2" />
          {/* Stack layer 1 (front) */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[280px] h-[180px] relative bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px] shadow-xl before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7] after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10 after:bg-gradient-to-b after:from-white/15 after:to-transparent p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Stacked Layers</h3>
            <p className="text-white/70 text-sm">Multiple glass panels create rich depth perception</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Control Center Demo */}
      <ShowcaseSection
        title="Control Center"
        subtitle="iOS-style glass control tiles"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-sm mx-auto">
          <div className="relative p-4 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[28px] before:absolute before:inset-0 before:rounded-[28px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Wifi, label: "Wi-Fi", active: toggleStates[0] },
                { icon: Bluetooth, label: "Bluetooth", active: toggleStates[1] },
                { icon: Moon, label: "Focus", active: toggleStates[2] },
                { icon: Volume2, label: "Sound", active: toggleStates[3] },
              ].map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => toggleSwitch(i)}
                  className={`aspect-square flex flex-col items-center justify-center gap-2 rounded-[20px] transition-all duration-500 ${
                    item.active
                      ? "bg-[#007AFF]/40 shadow-[0_0_20px_rgba(0,122,255,0.4)]"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                  <span className="text-white text-xs">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Volume slider */}
            <div className="mt-4 p-3 bg-white/5 rounded-[16px]">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-white/60" />
                <div className="flex-1 h-2 bg-white/10 rounded-full relative">
                  <div className="absolute left-0 top-0 h-full w-2/3 bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] rounded-full" />
                  <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-black/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress Bars */}
      <ShowcaseSection
        title="Progress"
        subtitle="Glass progress bars with gradient fills"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="relative p-6 bg-white/5 backdrop-blur-[40px] rounded-[20px]">
            <p className="text-sm text-white/60 mb-2">Rainbow Progress</p>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#a855f7] rounded-full" />
            </div>
          </div>
          <div className="relative p-6 bg-white/5 backdrop-blur-[40px] rounded-[20px]">
            <p className="text-sm text-white/60 mb-2">Apple Blue</p>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-[#007AFF] to-[#5AC8FA] rounded-full" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Glass notification cards with status indicators"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="relative p-4 bg-white/10 backdrop-blur-[40px] rounded-[16px] flex items-start gap-3 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#34C759] before:to-[#30D158]">
            <div className="w-8 h-8 bg-[#34C759]/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-[#34C759]" />
            </div>
            <div>
              <p className="font-semibold text-white">Success</p>
              <p className="text-white/70 text-sm">Your changes have been saved successfully.</p>
            </div>
          </div>

          <div className="relative p-4 bg-white/10 backdrop-blur-[40px] rounded-[16px] flex items-start gap-3 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#FF9500] before:to-[#FFCC00]">
            <div className="w-8 h-8 bg-[#FF9500]/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 text-[#FF9500]" />
            </div>
            <div>
              <p className="font-semibold text-white">Warning</p>
              <p className="text-white/70 text-sm">Please review your settings before continuing.</p>
            </div>
          </div>

          <div className="relative p-4 bg-white/10 backdrop-blur-[40px] rounded-[16px] flex items-start gap-3 before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-r before:from-[#FF2D55] before:to-[#FF3B30]">
            <div className="w-8 h-8 bg-[#FF2D55]/30 rounded-full flex items-center justify-center flex-shrink-0">
              <X className="w-4 h-4 text-[#FF2D55]" />
            </div>
            <div>
              <p className="font-semibold text-white">Error</p>
              <p className="text-white/70 text-sm">Something went wrong. Please try again.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for implementing Liquid Glass"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {designRules.map((rule, i) => (
            <div key={i} className="relative p-5 bg-white/5 backdrop-blur-[40px] rounded-[16px] before:absolute before:inset-0 before:rounded-[16px] before:p-[1px] before:-z-10 before:bg-gradient-to-br before:from-white/10 before:to-transparent">
              <h4 className="font-semibold text-white mb-1">{rule.title}</h4>
              <p className="text-white/60 text-sm">{rule.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="px-6 py-8 bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8] border-t border-white/10 [box-shadow:0_-1px_0_0_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(168,85,247,0.2)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/60 text-sm">Liquid Glass Design System</span>
          <div className="flex gap-6">
            <Link href="/styles/liquid-glass" className="text-white/70 hover:text-white transition-colors duration-300">
              Documentation
            </Link>
            <Link href="/styles" className="text-white/70 hover:text-white transition-colors duration-300">
              All Styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
