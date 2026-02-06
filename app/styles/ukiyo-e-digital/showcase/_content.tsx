"use client";

import Link from "next/link";
import { ArrowLeft, Waves, Mountain, Sun, Stamp } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Indigo", hex: "#1a3055", bg: "bg-[#1a3055]" },
  { name: "Vermilion", hex: "#d4553a", bg: "bg-[#d4553a]" },
  { name: "Gold Leaf", hex: "#c9a227", bg: "bg-[#c9a227]" },
  { name: "Rice White", hex: "#f5f0e1", bg: "bg-[#f5f0e1]" },
  { name: "Deep Blue", hex: "#2a5a8c", bg: "bg-[#2a5a8c]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#f5f0e1] relative overflow-hidden">
      {/* Wave decoration at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1/4 pointer-events-none">
        <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,100 Q150,20 300,100 T600,100 T900,100 T1200,100 L1200,200 L0,200 Z" fill="#1a3055" opacity="0.08" />
          <path d="M0,130 Q150,60 300,130 T600,130 T900,130 T1200,130 L1200,200 L0,200 Z" fill="#1a3055" opacity="0.05" />
        </svg>
      </div>

      {/* Sun circle decoration */}
      <div className="fixed top-16 right-16 w-32 h-32 rounded-full border-2 border-[#d4553a]/20 pointer-events-none" />
      <div className="fixed top-20 right-20 w-24 h-24 rounded-full bg-[#d4553a]/8 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#1a3055]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/ukiyo-e-digital"
            className="flex items-center gap-2 text-[#1a3055] hover:text-[#d4553a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold tracking-wider">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-[#1a3055] tracking-widest">
            UKIYO-E
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#1a3055] text-[#1a3055] font-bold tracking-wider rounded-sm shadow-[3px_3px_0px_#1a3055] hover:shadow-[4px_4px_0px_#1a3055] hover:-translate-y-0.5 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="UKIYO-E"
        description="Floating world in digital form - 浮世之美 数字再现"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-bold text-[#1a3055] tracking-widest mb-6"
        descriptionClassName="text-xl text-[#1a3055]/70 tracking-wider max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#d4553a] text-[#f5f0e1] border-2 border-[#1a3055] rounded-sm font-bold tracking-wider shadow-[4px_4px_0px_#1a3055] hover:shadow-[6px_6px_0px_#1a3055] hover:-translate-y-0.5 transition-all duration-300">
            Discover
          </button>
          <button className="px-10 py-4 bg-transparent text-[#1a3055] border-2 border-[#1a3055] rounded-sm font-bold tracking-wider shadow-[4px_4px_0px_#1a3055] hover:shadow-[6px_6px_0px_#1a3055] hover:-translate-y-0.5 transition-all duration-300">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="配色系统"
        subtitle="浮世之色"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#1a3055] tracking-wider mb-4 text-center"
        subtitleClassName="text-[#1a3055]/60 tracking-wider mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#1a3055]/20 bg-[#f5f0e1] rounded-sm shadow-[3px_3px_0px_rgba(26,48,85,0.15)]"
            labelClassName="font-bold text-sm text-[#1a3055] tracking-wider"
            hexClassName="text-xs text-[#d4553a] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="按钮"
        subtitle="版画之印"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#1a3055] tracking-wider mb-4 text-center"
        subtitleClassName="text-[#1a3055]/60 tracking-wider mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#f5f0e1] border-2 border-[#1a3055] rounded-sm shadow-[4px_4px_0px_#1a3055]">
            <p className="text-sm font-bold text-[#d4553a] tracking-widest mb-6">STYLES</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#d4553a] text-[#f5f0e1] border-2 border-[#1a3055] rounded-sm font-bold tracking-wider shadow-[3px_3px_0px_#1a3055] hover:shadow-[4px_4px_0px_#1a3055] hover:-translate-y-0.5 transition-all">
                Vermilion
              </button>
              <button className="px-6 py-3 bg-[#1a3055] text-[#f5f0e1] border-2 border-[#c9a227] rounded-sm font-bold tracking-wider shadow-[3px_3px_0px_#c9a227] hover:shadow-[4px_4px_0px_#c9a227] hover:-translate-y-0.5 transition-all">
                Indigo
              </button>
              <button className="px-6 py-3 bg-transparent text-[#1a3055] border-2 border-[#1a3055] rounded-sm font-bold tracking-wider shadow-[3px_3px_0px_#1a3055] hover:shadow-[4px_4px_0px_#1a3055] hover:-translate-y-0.5 transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent text-[#1a3055]/70 font-bold tracking-wider hover:text-[#d4553a] transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="卡片"
        subtitle="浮世百景"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#1a3055] tracking-wider mb-4 text-center"
        subtitleClassName="text-[#1a3055]/60 tracking-wider mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#f5f0e1] border-2 border-[#1a3055] rounded-sm shadow-[4px_4px_0px_#1a3055] hover:shadow-[6px_6px_0px_#1a3055] hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-[#1a3055] rounded-sm flex items-center justify-center mb-4 shadow-[2px_2px_0px_#d4553a]">
              <Waves className="w-8 h-8 text-[#f5f0e1]" />
            </div>
            <h3 className="text-xl font-bold text-[#1a3055] tracking-wider mb-2">
              The Great Wave
            </h3>
            <p className="text-[#1a3055]/60">Beneath the surface of the floating world</p>
          </div>

          <div className="p-6 bg-[#f5f0e1] border-2 border-[#d4553a] rounded-sm shadow-[4px_4px_0px_#d4553a] hover:shadow-[6px_6px_0px_#d4553a] hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-[#d4553a] rounded-sm flex items-center justify-center mb-4 shadow-[2px_2px_0px_#1a3055]">
              <Mountain className="w-8 h-8 text-[#f5f0e1]" />
            </div>
            <h3 className="text-xl font-bold text-[#1a3055] tracking-wider mb-2">
              Mount Fuji
            </h3>
            <p className="text-[#1a3055]/60">Thirty-six views of the sacred peak</p>
          </div>

          <div className="p-6 bg-[#f5f0e1] border-2 border-[#c9a227] rounded-sm shadow-[4px_4px_0px_#c9a227] hover:shadow-[6px_6px_0px_#c9a227] hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-[#c9a227] rounded-sm flex items-center justify-center mb-4 shadow-[2px_2px_0px_#1a3055]">
              <Sun className="w-8 h-8 text-[#f5f0e1]" />
            </div>
            <h3 className="text-xl font-bold text-[#1a3055] tracking-wider mb-2">
              Rising Sun
            </h3>
            <p className="text-[#1a3055]/60">Dawn breaks over the eastern shore</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="表单"
        subtitle="书道之美"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#1a3055] tracking-wider mb-4 text-center"
        subtitleClassName="text-[#1a3055]/60 tracking-wider mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#f5f0e1] border-2 border-[#1a3055] rounded-sm shadow-[6px_6px_0px_#1a3055]">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-[#d4553a] rounded-sm flex items-center justify-center shadow-[3px_3px_0px_#1a3055] mb-4">
                <Stamp className="w-10 h-10 text-[#f5f0e1]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3055] tracking-wider">Join the Gallery</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#d4553a] tracking-widest mb-2">NAME</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-[#f5f0e1] border-2 border-[#1a3055]/60 rounded-sm text-[#1a3055] placeholder-[#1a3055]/40 focus:border-[#d4553a] focus:shadow-[2px_2px_0px_#d4553a] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1a3055] tracking-widest mb-2">EMAIL</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-[#f5f0e1] border-2 border-[#1a3055]/60 rounded-sm text-[#1a3055] placeholder-[#1a3055]/40 focus:border-[#c9a227] focus:shadow-[2px_2px_0px_#c9a227] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#d4553a] text-[#f5f0e1] border-2 border-[#1a3055] rounded-sm font-bold tracking-wider shadow-[3px_3px_0px_#1a3055] hover:shadow-[4px_4px_0px_#1a3055] hover:-translate-y-0.5 transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#1a3055]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#1a3055]/50 text-sm">
            Ukiyo-e Digital Showcase · Part of{" "}
            <Link href="/" className="text-[#1a3055] hover:text-[#d4553a] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
