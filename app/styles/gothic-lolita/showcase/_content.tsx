"use client";

import Link from "next/link";
import { ArrowLeft, Cross, Flower2, Crown, Heart } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
  { name: "Deep Purple", hex: "#4a1a4a", bg: "bg-[#4a1a4a]" },
  { name: "Blood Red", hex: "#8b1a2a", bg: "bg-[#8b1a2a]" },
  { name: "Silver White", hex: "#e5e5e5", bg: "bg-[#e5e5e5]" },
  { name: "Dark Plum", hex: "#6b2d5b", bg: "bg-[#6b2d5b]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a] relative overflow-hidden">
      {/* Ornate border frame */}
      <div className="fixed inset-4 border border-[#4a1a4a]/20 pointer-events-none z-0" />
      <div className="fixed inset-8 border border-[#8b1a2a]/10 pointer-events-none z-0" />

      {/* Corner ornaments */}
      <div className="fixed top-6 left-6 w-12 h-12 border-t border-l border-[#4a1a4a]/40 pointer-events-none z-0" />
      <div className="fixed top-6 right-6 w-12 h-12 border-t border-r border-[#4a1a4a]/40 pointer-events-none z-0" />
      <div className="fixed bottom-6 left-6 w-12 h-12 border-b border-l border-[#4a1a4a]/40 pointer-events-none z-0" />
      <div className="fixed bottom-6 right-6 w-12 h-12 border-b border-r border-[#4a1a4a]/40 pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#4a1a4a]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/gothic-lolita"
            className="flex items-center gap-2 text-[#e5e5e5]/70 hover:text-[#e5e5e5] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif tracking-wide">Back to Docs</span>
          </Link>
          <span className="font-serif text-xl text-[#e5e5e5] tracking-wider">
            GOTHIC LOLITA
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#4a1a4a]/50 text-[#e5e5e5]/70 font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.3)] hover:bg-[#4a1a4a]/20 hover:border-[#8b1a2a]/50 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Gothic Lolita"
        description="Dark elegance, Victorian grace - 暗黑优雅的维多利亚蕾丝之梦"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-serif text-[#e5e5e5] mb-6 tracking-wider"
        descriptionClassName="text-lg text-[#e5e5e5]/60 max-w-2xl mx-auto mb-10 font-serif"
      >
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#8b1a2a] to-transparent mx-auto mb-10" />
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_4px_16px_rgba(74,26,74,0.5)] hover:shadow-[0_8px_24px_rgba(139,26,42,0.5)] hover:border-[#8b1a2a] transition-all duration-300">
            Enter
          </button>
          <button className="px-10 py-4 bg-transparent border border-[#e5e5e5]/30 text-[#e5e5e5]/70 font-serif tracking-wide hover:border-[#e5e5e5]/60 hover:text-[#e5e5e5] transition-all duration-300">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="配色系统"
        subtitle="暗黑浪漫色彩"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#e5e5e5] mb-4 text-center tracking-wide"
        subtitleClassName="text-[#e5e5e5]/40 mb-10 text-center font-serif"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#4a1a4a]/30 bg-[#0a0a0a]/80 shadow-[0_4px_12px_rgba(74,26,74,0.2)]"
            labelClassName="font-serif text-sm text-[#e5e5e5]/80"
            hexClassName="text-xs text-[#8b1a2a] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="按钮"
        subtitle="精致优雅交互"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#e5e5e5] mb-4 text-center tracking-wide"
        subtitleClassName="text-[#e5e5e5]/40 mb-10 text-center font-serif"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0a0a0a]/80 border border-[#4a1a4a]/30 shadow-[0_4px_16px_rgba(74,26,74,0.2)]">
            <p className="text-sm font-serif text-[#8b1a2a] tracking-wider mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.5)] hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#0a0a0a] border border-[#4a1a4a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(10,10,10,0.5)] hover:border-[#8b1a2a]/50 transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent border border-[#8b1a2a]/50 text-[#8b1a2a] font-serif tracking-wide hover:bg-[#8b1a2a]/10 transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent text-[#e5e5e5]/50 font-serif tracking-wide hover:text-[#e5e5e5]/80 transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="卡片"
        subtitle="维多利亚暗色容器"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#e5e5e5] mb-4 text-center tracking-wide"
        subtitleClassName="text-[#e5e5e5]/40 mb-10 text-center font-serif"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0a0a0a]/90 border border-[#4a1a4a]/40 shadow-[0_4px_16px_rgba(74,26,74,0.3)]">
            <div className="w-14 h-14 bg-[#4a1a4a]/30 border border-[#4a1a4a]/50 flex items-center justify-center mb-4">
              <Cross className="w-7 h-7 text-[#8b1a2a]" />
            </div>
            <h3 className="text-xl font-serif text-[#e5e5e5] mb-2 tracking-wide">
              Cross
            </h3>
            <p className="text-[#e5e5e5]/50 font-serif text-sm">Sacred darkness and devotion</p>
          </div>

          <div className="p-6 bg-[#0a0a0a]/90 border border-[#8b1a2a]/30 shadow-[0_4px_16px_rgba(139,26,42,0.2)]">
            <div className="w-14 h-14 bg-[#8b1a2a]/20 border border-[#8b1a2a]/40 flex items-center justify-center mb-4">
              <Flower2 className="w-7 h-7 text-[#8b1a2a]" />
            </div>
            <h3 className="text-xl font-serif text-[#e5e5e5] mb-2 tracking-wide">
              Rose
            </h3>
            <p className="text-[#e5e5e5]/50 font-serif text-sm">Beauty born from thorns</p>
          </div>

          <div className="p-6 bg-[#0a0a0a]/90 border border-[#e5e5e5]/20 shadow-[0_4px_16px_rgba(229,229,229,0.1)]">
            <div className="w-14 h-14 bg-[#e5e5e5]/10 border border-[#e5e5e5]/20 flex items-center justify-center mb-4">
              <Crown className="w-7 h-7 text-[#e5e5e5]/70" />
            </div>
            <h3 className="text-xl font-serif text-[#e5e5e5] mb-2 tracking-wide">
              Crown
            </h3>
            <p className="text-[#e5e5e5]/50 font-serif text-sm">Regal elegance in shadow</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="表单"
        subtitle="暗色优雅输入"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#e5e5e5] mb-4 text-center tracking-wide"
        subtitleClassName="text-[#e5e5e5]/40 mb-10 text-center font-serif"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0a0a0a]/90 border border-[#4a1a4a]/30 shadow-[0_4px_16px_rgba(74,26,74,0.3)]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#4a1a4a]/20 border border-[#4a1a4a]/40 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-[#8b1a2a]" />
              </div>
              <h3 className="text-xl font-serif text-[#e5e5e5] tracking-wide">Connect</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-[#8b1a2a] tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#4a1a4a]/50 text-[#e5e5e5] placeholder-[#4a1a4a]/50 font-serif focus:border-[#8b1a2a] focus:shadow-[0_0_12px_rgba(139,26,42,0.4)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#4a1a4a] tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#4a1a4a]/50 text-[#e5e5e5] placeholder-[#4a1a4a]/50 font-serif focus:border-[#8b1a2a] focus:shadow-[0_0_12px_rgba(139,26,42,0.4)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.5)] hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#4a1a4a]/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#e5e5e5]/40 text-sm font-serif">
            Gothic Lolita Showcase · Part of{" "}
            <Link href="/" className="text-[#e5e5e5]/60 hover:text-[#e5e5e5] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
