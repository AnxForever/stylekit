"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Star, MessageCircle, Target, Flame, Shield } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Ink Black", hex: "#1a1a1a", bg: "bg-[#1a1a1a]" },
  { name: "Paper White", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Action Red", hex: "#ff3333", bg: "bg-[#ff3333]" },
  { name: "Impact Yellow", hex: "#ffcc00", bg: "bg-[#ffcc00]" },
  { name: "Hero Blue", hex: "#3366ff", bg: "bg-[#3366ff]" },
];

export default function ShowcaseContent() {
  const [pow, setPow] = useState(0);

  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      {/* Halftone pattern overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: `radial-gradient(circle, #1a1a1a 1px, transparent 1px)`,
        backgroundSize: '8px 8px'
      }} />

      {/* Navigation */}
      <nav className="px-6 py-4 bg-white border-b-4 border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/comic-style"
            className="flex items-center gap-2 text-[#1a1a1a] hover:text-[#ff3333] font-bold uppercase transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>BACK</span>
          </Link>
          <span className="font-black text-2xl text-[#1a1a1a] uppercase tracking-tight" style={{ fontFamily: 'Impact, sans-serif' }}>COMIC STYLE</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#ff3333] border-3 border-[#1a1a1a] text-white font-bold uppercase text-sm shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            ALL STYLES
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="COMIC STYLE!"
        description="Bold manga-inspired aesthetics with heavy black borders, halftone patterns, speech bubbles, and dynamic action lines."
        className="pt-20 pb-16 px-6 text-center relative"
        titleClassName="text-5xl md:text-7xl font-black uppercase text-[#1a1a1a] mb-6 tracking-tight"
        descriptionClassName="text-lg text-[#333] max-w-2xl mx-auto mb-10 font-medium"
      >
        {/* Action lines behind title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-96 h-96" style={{
            background: 'repeating-conic-gradient(from 0deg, #1a1a1a 0deg 2deg, transparent 2deg 20deg)'
          }} />
        </div>
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <button className="px-8 py-4 bg-[#ff3333] border-4 border-[#1a1a1a] text-white font-black uppercase text-xl shadow-[6px_6px_0_#1a1a1a] hover:shadow-[3px_3px_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
            POW!
          </button>
          <button className="px-8 py-4 bg-[#ffcc00] border-4 border-[#1a1a1a] text-[#1a1a1a] font-black uppercase text-xl shadow-[6px_6px_0_#1a1a1a] hover:shadow-[3px_3px_0_#1a1a1a] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
            WHAM!
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR SYSTEM"
        subtitle="Bold, high-contrast comic palette"
        className="py-16 px-6 bg-white border-y-4 border-[#1a1a1a]"
        titleClassName="text-3xl font-black uppercase text-[#1a1a1a] mb-4 text-center tracking-tight"
        subtitleClassName="text-[#666] mb-10 text-center uppercase text-sm font-bold"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a]"
            labelClassName="font-bold text-sm text-[#1a1a1a] uppercase"
            hexClassName="text-xs text-gray-600 font-mono uppercase"
          />
        </div>
      </ShowcaseSection>

      {/* Speech Bubbles */}
      <ShowcaseSection
        title="SPEECH BUBBLES"
        subtitle="Classic comic dialogue elements"
        className="py-16 px-6"
        titleClassName="text-3xl font-black uppercase text-[#1a1a1a] mb-4 text-center tracking-tight"
        subtitleClassName="text-[#666] mb-10 text-center uppercase text-sm font-bold"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Speech bubble */}
          <div className="relative bg-white border-4 border-[#1a1a1a] rounded-3xl p-6 shadow-[4px_4px_0_#1a1a1a]">
            <p className="text-xl font-bold text-[#1a1a1a]">This is a classic speech bubble! Perfect for dialogue.</p>
            <div className="absolute -bottom-4 left-8 w-8 h-8 bg-white border-l-4 border-b-4 border-[#1a1a1a] transform rotate-45" />
          </div>

          {/* Thought bubble */}
          <div className="relative bg-white border-4 border-[#1a1a1a] rounded-full p-8 shadow-[4px_4px_0_#1a1a1a]">
            <p className="text-lg font-bold text-[#1a1a1a] text-center">Hmm... thinking...</p>
            <div className="absolute -bottom-3 left-12 w-4 h-4 bg-white border-2 border-[#1a1a1a] rounded-full" />
            <div className="absolute -bottom-6 left-8 w-2 h-2 bg-white border-2 border-[#1a1a1a] rounded-full" />
          </div>

          {/* Shout bubble */}
          <div className="bg-[#ffcc00] border-4 border-[#1a1a1a] p-6 shadow-[4px_4px_0_#1a1a1a]" style={{
            clipPath: 'polygon(50% 0%, 61% 15%, 98% 15%, 79% 35%, 91% 60%, 70% 55%, 50% 85%, 30% 55%, 9% 60%, 21% 35%, 2% 15%, 39% 15%)'
          }}>
            <p className="text-2xl font-black text-[#1a1a1a] text-center">BOOM!</p>
          </div>

          {/* Action bubble */}
          <div className="bg-[#ff3333] border-4 border-[#1a1a1a] p-8 shadow-[4px_4px_0_#1a1a1a] transform -rotate-2">
            <p className="text-3xl font-black text-white text-center uppercase tracking-tight">ACTION!</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="High-impact action buttons"
        className="py-16 px-6 bg-white border-y-4 border-[#1a1a1a]"
        titleClassName="text-3xl font-black uppercase text-[#1a1a1a] mb-4 text-center tracking-tight"
        subtitleClassName="text-[#666] mb-10 text-center uppercase text-sm font-bold"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#f5f5dc] border-4 border-[#1a1a1a] shadow-[6px_6px_0_#1a1a1a]">
            <p className="text-sm font-black text-[#1a1a1a] uppercase mb-6">Colors</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="px-6 py-3 bg-[#ff3333] border-4 border-[#1a1a1a] text-white font-black uppercase shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                RED
              </button>
              <button className="px-6 py-3 bg-[#ffcc00] border-4 border-[#1a1a1a] text-[#1a1a1a] font-black uppercase shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                YELLOW
              </button>
              <button className="px-6 py-3 bg-[#3366ff] border-4 border-[#1a1a1a] text-white font-black uppercase shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                BLUE
              </button>
              <button className="px-6 py-3 bg-white border-4 border-[#1a1a1a] text-[#1a1a1a] font-black uppercase shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                WHITE
              </button>
            </div>

            <p className="text-sm font-black text-[#1a1a1a] uppercase mb-6">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-4 py-2 text-sm bg-[#1a1a1a] border-3 border-[#1a1a1a] text-white font-black uppercase shadow-[3px_3px_0_#ff3333] hover:shadow-[1px_1px_0_#ff3333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                SMALL
              </button>
              <button className="px-6 py-3 bg-[#1a1a1a] border-4 border-[#1a1a1a] text-white font-black uppercase shadow-[4px_4px_0_#ff3333] hover:shadow-[2px_2px_0_#ff3333] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                MEDIUM
              </button>
              <button className="px-8 py-4 text-xl bg-[#1a1a1a] border-4 border-[#1a1a1a] text-white font-black uppercase shadow-[6px_6px_0_#ff3333] hover:shadow-[3px_3px_0_#ff3333] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                LARGE
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="Panel-style content blocks"
        className="py-16 px-6"
        titleClassName="text-3xl font-black uppercase text-[#1a1a1a] mb-4 text-center tracking-tight"
        subtitleClassName="text-[#666] mb-10 text-center uppercase text-sm font-bold"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border-4 border-[#1a1a1a] shadow-[6px_6px_0_#1a1a1a] transform -rotate-1">
            <div className="w-14 h-14 bg-[#ff3333] border-3 border-[#1a1a1a] flex items-center justify-center mb-4 shadow-[3px_3px_0_#1a1a1a]">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-black uppercase text-[#1a1a1a] mb-2">POWER UP!</h3>
            <p className="text-[#555] font-medium">Boost your abilities with special items.</p>
          </div>

          <div className="p-6 bg-[#ffcc00] border-4 border-[#1a1a1a] shadow-[6px_6px_0_#1a1a1a] transform rotate-1">
            <div className="w-14 h-14 bg-white border-3 border-[#1a1a1a] flex items-center justify-center mb-4 shadow-[3px_3px_0_#1a1a1a]">
              <Star className="w-7 h-7 text-[#1a1a1a]" />
            </div>
            <h3 className="text-xl font-black uppercase text-[#1a1a1a] mb-2">COLLECT!</h3>
            <p className="text-[#333] font-medium">Gather stars to unlock secrets.</p>
          </div>

          <div className="p-6 bg-white border-4 border-[#1a1a1a] shadow-[6px_6px_0_#1a1a1a] transform -rotate-1">
            <div className="w-14 h-14 bg-[#3366ff] border-3 border-[#1a1a1a] flex items-center justify-center mb-4 shadow-[3px_3px_0_#1a1a1a]">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-black uppercase text-[#1a1a1a] mb-2">DEFEND!</h3>
            <p className="text-[#555] font-medium">Protect yourself from enemies.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Interactive POW Counter */}
      <ShowcaseSection
        title="INTERACTIVE"
        subtitle="Click for impact!"
        className="py-16 px-6 bg-white border-y-4 border-[#1a1a1a]"
        titleClassName="text-3xl font-black uppercase text-[#1a1a1a] mb-4 text-center tracking-tight"
        subtitleClassName="text-[#666] mb-10 text-center uppercase text-sm font-bold"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#ff3333] border-4 border-[#1a1a1a] shadow-[8px_8px_0_#1a1a1a] text-center">
            <p className="text-sm font-black text-white uppercase tracking-wide mb-2">POWER LEVEL</p>
            <div className="text-7xl font-black text-white mb-6" style={{ fontFamily: 'Impact, sans-serif' }}>
              {pow}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPow(Math.max(0, pow - 1))}
                className="w-16 h-16 bg-white border-4 border-[#1a1a1a] text-[#1a1a1a] text-3xl font-black shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
              >
                -
              </button>
              <button
                onClick={() => setPow(pow + 1)}
                className="w-16 h-16 bg-[#ffcc00] border-4 border-[#1a1a1a] text-[#1a1a1a] text-3xl font-black shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="FORMS"
        subtitle="Input elements with comic flair"
        className="py-16 px-6"
        titleClassName="text-3xl font-black uppercase text-[#1a1a1a] mb-4 text-center tracking-tight"
        subtitleClassName="text-[#666] mb-10 text-center uppercase text-sm font-bold"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white border-4 border-[#1a1a1a] shadow-[8px_8px_0_#ffcc00]">
            <h3 className="text-2xl font-black uppercase text-[#1a1a1a] mb-6 text-center">JOIN THE TEAM!</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="HERO NAME..."
                className="w-full px-4 py-3 bg-white border-4 border-[#1a1a1a] text-[#1a1a1a] placeholder-[#999] font-bold uppercase focus:outline-none focus:border-[#ff3333] transition-colors"
              />
              <input
                type="email"
                placeholder="SECRET EMAIL..."
                className="w-full px-4 py-3 bg-white border-4 border-[#1a1a1a] text-[#1a1a1a] placeholder-[#999] font-bold uppercase focus:outline-none focus:border-[#ff3333] transition-colors"
              />
              <button className="w-full py-4 bg-[#ff3333] border-4 border-[#1a1a1a] text-white font-black uppercase text-lg shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                SIGN UP!
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t-4 border-[#1a1a1a] bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#666] text-sm uppercase font-bold">
            COMIC STYLE SHOWCASE · PART OF{" "}
            <Link href="/" className="text-[#ff3333] hover:text-[#1a1a1a] transition-colors">
              STYLEKIT
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
