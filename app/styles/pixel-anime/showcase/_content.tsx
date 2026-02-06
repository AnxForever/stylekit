"use client";

import Link from "next/link";
import { ArrowLeft, Swords, Heart, Star, Gamepad2 } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Pixel Blue", hex: "#4a90d9", bg: "bg-[#4a90d9]" },
  { name: "Pixel Red", hex: "#ff6b6b", bg: "bg-[#ff6b6b]" },
  { name: "Pixel Gold", hex: "#ffd93d", bg: "bg-[#ffd93d]" },
  { name: "Pixel Green", hex: "#50c878", bg: "bg-[#50c878]" },
  { name: "Dark Purple", hex: "#2d1b69", bg: "bg-[#2d1b69]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#2d1b69] relative overflow-hidden">
      {/* Pixel grid overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(26,16,64,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(26,16,64,0.15) 1px, transparent 1px)",
        backgroundSize: "4px 4px",
      }} />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#1a1040]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/pixel-anime"
            className="flex items-center gap-2 text-[#ffd93d] hover:text-[#ffd93d]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono font-bold uppercase tracking-wider text-sm">Back to Docs</span>
          </Link>
          <span className="font-mono font-bold text-xl text-[#4a90d9] uppercase tracking-wider">
            PIXEL ANIME
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#1a1040] text-[#ffd93d] font-mono font-bold uppercase tracking-wider text-sm bg-[#2d1b69] shadow-[3px_3px_0px_#1a1040] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="PIXEL ANIME"
        description="8-bit dreams, anime soul - where retro pixels meet anime expression"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-mono font-bold text-[#4a90d9] uppercase tracking-wider mb-2"
        descriptionClassName="text-base text-[#e0e0ff]/50 font-mono max-w-xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-3xl md:text-5xl font-mono font-bold text-[#ffd93d] uppercase tracking-wider">
            GAME START
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#4a90d9] text-white font-mono font-bold uppercase tracking-wider border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
            Play
          </button>
          <button className="px-10 py-4 bg-[#ff6b6b] text-white font-mono font-bold uppercase tracking-wider border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
            Options
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="PALETTE"
        subtitle="8-BIT COLORS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#e0e0ff] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/40 font-mono uppercase tracking-wider mb-10 text-center text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#1a1040] bg-[#2d1b69] shadow-[3px_3px_0px_#1a1040]"
            labelClassName="font-mono font-bold text-sm text-[#e0e0ff] uppercase"
            hexClassName="text-xs text-[#ffd93d] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="COMMANDS"
        subtitle="BATTLE ACTIONS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#e0e0ff] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/40 font-mono uppercase tracking-wider mb-10 text-center text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#2d1b69] border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040]">
            <p className="text-sm font-mono font-bold text-[#ffd93d] uppercase tracking-wider mb-6">ACTIONS</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#4a90d9] text-white font-mono font-bold uppercase tracking-wider text-sm border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
                Attack
              </button>
              <button className="px-6 py-3 bg-[#ff6b6b] text-white font-mono font-bold uppercase tracking-wider text-sm border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
                Magic
              </button>
              <button className="px-6 py-3 bg-transparent text-[#ffd93d] font-mono font-bold uppercase tracking-wider text-sm border-2 border-[#ffd93d] shadow-[3px_3px_0px_#1a1040] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
                Defend
              </button>
              <button className="px-6 py-3 bg-[#50c878] text-white font-mono font-bold uppercase tracking-wider text-sm border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
                Heal
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="PARTY"
        subtitle="CHARACTER PANELS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#e0e0ff] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/40 font-mono uppercase tracking-wider mb-10 text-center text-sm"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#2d1b69] border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:shadow-[6px_6px_0px_#1a1040] hover:-translate-y-1 transition-all duration-150 ease-linear">
            <div className="w-12 h-12 bg-[#4a90d9] border-2 border-[#1a1040] flex items-center justify-center mb-4">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-mono font-bold text-[#ffd93d] uppercase mb-2">
              WARRIOR
            </h3>
            <p className="text-[#e0e0ff]/50 font-mono text-xs mb-3">LV. 42 / HP 999</p>
            <div className="w-full h-2 bg-[#1a1040] border border-[#1a1040]">
              <div className="h-full bg-[#ff6b6b] w-4/5" />
            </div>
          </div>

          <div className="p-6 bg-[#2d1b69] border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:shadow-[6px_6px_0px_#1a1040] hover:-translate-y-1 transition-all duration-150 ease-linear">
            <div className="w-12 h-12 bg-[#ff6b6b] border-2 border-[#1a1040] flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-mono font-bold text-[#ffd93d] uppercase mb-2">
              HEALER
            </h3>
            <p className="text-[#e0e0ff]/50 font-mono text-xs mb-3">LV. 38 / MP 850</p>
            <div className="w-full h-2 bg-[#1a1040] border border-[#1a1040]">
              <div className="h-full bg-[#4a90d9] w-3/4" />
            </div>
          </div>

          <div className="p-6 bg-[#2d1b69] border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:shadow-[6px_6px_0px_#1a1040] hover:-translate-y-1 transition-all duration-150 ease-linear">
            <div className="w-12 h-12 bg-[#ffd93d] border-2 border-[#1a1040] flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-[#1a1040]" />
            </div>
            <h3 className="text-lg font-mono font-bold text-[#ffd93d] uppercase mb-2">
              MAGE
            </h3>
            <p className="text-[#e0e0ff]/50 font-mono text-xs mb-3">LV. 40 / MP 1200</p>
            <div className="w-full h-2 bg-[#1a1040] border border-[#1a1040]">
              <div className="h-full bg-[#50c878] w-full" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="SAVE FILE"
        subtitle="DATA INPUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#e0e0ff] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/40 font-mono uppercase tracking-wider mb-10 text-center text-sm"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#2d1b69] border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040]">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-[#4a90d9] border-2 border-[#1a1040] flex items-center justify-center mb-4">
                <Gamepad2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-mono font-bold text-[#ffd93d] uppercase">NEW GAME</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#4a90d9] uppercase tracking-wider mb-2">PLAYER NAME</label>
                <input
                  type="text"
                  placeholder="ENTER NAME..."
                  className="w-full px-4 py-3 bg-[#1a1040] border-2 border-[#4a90d9] text-[#e0e0ff] placeholder-[#e0e0ff]/40 font-mono text-sm focus:border-[#ffd93d] focus:shadow-[2px_2px_0px_#4a90d9] focus:outline-none transition-all duration-150 ease-linear"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#ff6b6b] uppercase tracking-wider mb-2">CLASS</label>
                <input
                  type="text"
                  placeholder="CHOOSE CLASS..."
                  className="w-full px-4 py-3 bg-[#1a1040] border-2 border-[#ff6b6b] text-[#e0e0ff] placeholder-[#e0e0ff]/40 font-mono text-sm focus:border-[#ffd93d] focus:shadow-[2px_2px_0px_#ff6b6b] focus:outline-none transition-all duration-150 ease-linear"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#4a90d9] text-white font-mono font-bold uppercase tracking-wider border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
                START GAME
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#1a1040]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#e0e0ff]/40 text-xs font-mono uppercase tracking-wider">
            Pixel Anime Showcase · Part of{" "}
            <Link href="/" className="text-[#ffd93d] hover:text-[#ffd93d]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
