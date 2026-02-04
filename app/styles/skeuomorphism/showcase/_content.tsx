"use client";

import Link from "next/link";
import { ArrowLeft, Settings, Volume2, Power, ChevronUp, ChevronDown } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Leather", hex: "#8b7355", bg: "bg-[#8b7355]" },
  { name: "Wood", hex: "#d4c4a8", bg: "bg-[#d4c4a8]" },
  { name: "Gold", hex: "#c9a227", bg: "bg-[#c9a227]" },
  { name: "Brown", hex: "#5c4033", bg: "bg-[#5c4033]" },
  { name: "Green", hex: "#2e5a3c", bg: "bg-[#2e5a3c]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-gradient-to-b from-stone-100 to-stone-200 border-b border-stone-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/skeuomorphism"
            className="flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-stone-800" style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>
            SKEUOMORPHISM
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-gradient-to-b from-stone-100 to-stone-200 border border-stone-400 rounded-lg text-stone-700 shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] hover:from-stone-200 hover:to-stone-300 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Skeuomorphism"
        description="Digital meets physical - realistic textures, tactile feedback, and familiar metaphors"
        className="pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-bold text-stone-800 mb-6 [text-shadow:0_2px_0_rgba(255,255,255,0.8)]"
        descriptionClassName="text-xl text-stone-600 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold rounded-xl border border-blue-700 shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.2)] hover:from-blue-500 hover:to-blue-700 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px] transition-all">
            Get Started
          </button>
          <button className="px-8 py-4 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-700 font-bold rounded-xl border border-gray-400 shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.1)] hover:from-gray-200 hover:to-gray-400 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-[1px] transition-all">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Material Colors"
        subtitle="Natural textures and finishes"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="bg-gradient-to-b from-white to-gray-100 rounded-xl border border-gray-300 shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]"
            labelClassName="font-bold text-sm text-stone-700"
            hexClassName="text-xs text-stone-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Tactile press feedback"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-b from-white/80 to-gray-100/80 rounded-2xl border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-bold text-stone-600 uppercase tracking-wide mb-6">Button Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-b from-green-400 to-green-600 text-white font-bold rounded-lg border border-green-700 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all">
                Success
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-red-400 to-red-600 text-white font-bold rounded-lg border border-red-700 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all">
                Danger
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-700 font-bold rounded-lg border border-gray-400 shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all">
                Default
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-amber-300 to-amber-500 text-amber-900 font-bold rounded-lg border border-amber-600 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all">
                Warning
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Control Panel */}
      <ShowcaseSection
        title="Control Panel"
        subtitle="Realistic interface elements"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl border border-gray-400 shadow-[0_10px_30px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.6)]">
            {/* Volume Control */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Volume2 className="w-6 h-6 text-gray-600" />
                <span className="font-bold text-gray-700">Volume</span>
              </div>
              <div className="h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" />
                <div className="absolute left-[73%] top-1/2 -translate-y-1/2 w-5 h-8 bg-gradient-to-b from-white to-gray-200 rounded border border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Power className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Power</span>
                </div>
                <div className="w-14 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] relative">
                  <div className="absolute right-1 top-1 w-6 h-6 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Settings</span>
                </div>
                <div className="w-14 h-8 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] relative">
                  <div className="absolute left-1 top-1 w-6 h-6 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                </div>
              </div>
            </div>

            {/* Number Stepper */}
            <div className="mt-8">
              <span className="font-bold text-gray-700 block mb-4">Quantity</span>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg border border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all">
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </button>
                <div className="w-20 h-10 bg-gradient-to-b from-white to-gray-100 rounded-lg border border-gray-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center">
                  <span className="font-bold text-gray-800 text-lg">42</span>
                </div>
                <button className="w-10 h-10 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg border border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all">
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Textured surfaces"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl border border-amber-300 shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <h3 className="text-xl font-bold text-amber-900 mb-2">Leather Card</h3>
            <p className="text-amber-800">Rich, warm texture with natural grain pattern.</p>
          </div>
          <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl border border-gray-300 shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Metal Card</h3>
            <p className="text-gray-600">Brushed aluminum finish with subtle reflections.</p>
          </div>
          <div className="p-6 bg-gradient-to-b from-stone-100 to-stone-200 rounded-2xl border border-stone-300 shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.7)]">
            <h3 className="text-xl font-bold text-stone-800 mb-2">Paper Card</h3>
            <p className="text-stone-600">Soft, matte finish like quality stationery.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gradient-to-b from-stone-300 to-stone-400 border-t border-stone-400">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-stone-600 text-sm">
            Skeuomorphism Showcase{" "}
            <Link href="/" className="text-stone-700 hover:text-stone-900 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
