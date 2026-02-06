"use client";

import Link from "next/link";
import { ArrowLeft, Feather, Droplets, Wind } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sky Blue", hex: "#64b5f6", bg: "bg-[#64b5f6]" },
  { name: "Mint Green", hex: "#98d8c8", bg: "bg-[#98d8c8]" },
  { name: "Gentle Pink", hex: "#ffb7c5", bg: "bg-[#ffb7c5]" },
  { name: "Powder Blue", hex: "#b8d4e3", bg: "bg-[#b8d4e3]" },
  { name: "Rice White", hex: "#fafaf8", bg: "bg-[#fafaf8]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#fafaf8] relative overflow-hidden">
      {/* Subtle linen texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='6' height='6' fill='%23fafaf8'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23e8e8e4' opacity='0.12'/%3E%3Crect x='3' y='3' width='1' height='1' fill='%23e8e8e4' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Navigation: minimal hairline border */}
      <nav className="relative z-10 px-8 md:px-12 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/japanese-fresh"
            className="flex items-center gap-2 text-[#64b5f6] hover:text-[#64b5f6]/70 transition-all duration-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-light tracking-wide text-sm">Back to Docs</span>
          </Link>
          <span className="font-extralight text-lg text-[#4a5568] tracking-wide">
            Japanese Fresh
          </span>
          <Link
            href="/styles"
            className="px-5 py-1.5 border border-[#d4d4cf]/40 text-[#7a8a9e] font-light tracking-wide text-sm rounded-lg hover:border-[#64b5f6]/40 hover:text-[#64b5f6] transition-all duration-500"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hairline divider */}
      <div className="max-w-4xl mx-auto px-8 md:px-12">
        <div className="h-px bg-[#d4d4cf]/30" />
      </div>

      {/* Hero: Ma-based extreme whitespace, botanical accent */}
      <ShowcaseHero
        title="Japanese Fresh"
        description="the beauty of empty space"
        className="relative z-10 pt-32 pb-32 md:pt-40 md:pb-40 px-8 text-center"
        titleClassName="text-4xl md:text-6xl font-extralight text-[#4a5568] tracking-wide mb-8"
        descriptionClassName="text-base text-[#b0b8c4] font-light max-w-md mx-auto mb-20 leading-loose"
      >
        {/* Botanical SVG accent -- single branch */}
        <div className="absolute left-8 md:left-16 bottom-20 w-24 h-48 pointer-events-none">
          <svg
            viewBox="0 0 100 200"
            fill="none"
            stroke="#b0b8c4"
            strokeWidth="0.7"
            className="w-full h-full opacity-[0.12]"
          >
            <path d="M50 200 C50 160, 55 120, 58 80 C60 60, 55 40, 58 20" />
            <path d="M58 80 C70 75, 80 65, 85 58 C78 68, 68 76, 58 80" />
            <path d="M56 50 C44 42, 36 32, 30 24 C38 34, 46 44, 56 50" />
            <path d="M57 110 C68 105, 76 98, 82 90 C75 100, 67 107, 57 110" />
          </svg>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="px-12 py-3 bg-transparent text-[#7a8a9e] font-light tracking-wide rounded-lg border border-[#d4d4cf]/40 hover:border-[#64b5f6]/40 hover:text-[#64b5f6] transition-all duration-500">
            Explore
          </button>
          <button className="px-12 py-3 bg-[#64b5f6]/90 text-white font-light tracking-wide rounded-lg border border-[#64b5f6]/30 hover:bg-[#64b5f6] transition-all duration-500">
            Begin
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette -- with extreme breathing room */}
      <section className="relative z-10 py-24 md:py-32 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl font-extralight text-[#4a5568] tracking-wide mb-3">
              Color Palette
            </h2>
            <p className="text-[#b0b8c4] font-light tracking-wide text-sm">
              Gentle tones, warm and quiet
            </p>
          </div>
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#d4d4cf]/30 bg-white rounded-xl"
            labelClassName="font-light text-sm text-[#4a5568]"
            hexClassName="text-xs text-[#b0b8c4] font-mono"
          />
        </div>
      </section>

      {/* Hairline divider */}
      <div className="max-w-xs mx-auto px-8">
        <div className="h-px bg-[#d4d4cf]/25" />
      </div>

      {/* Buttons: whisper-quiet interactions */}
      <section className="relative z-10 py-24 md:py-32 px-8 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xl md:text-2xl font-extralight text-[#4a5568] tracking-wide mb-3">
              Buttons
            </h2>
            <p className="text-[#b0b8c4] font-light text-sm">
              Barely there, felt more than seen
            </p>
          </div>

          <div className="p-10 md:p-12 bg-white rounded-xl border border-[#d4d4cf]/30">
            <p className="text-xs font-light text-[#b0b8c4] tracking-wide mb-8">
              Interaction styles
            </p>
            <div className="flex flex-wrap gap-5">
              <button className="px-10 py-3 bg-[#64b5f6]/90 text-white font-light tracking-wide rounded-lg border border-[#64b5f6]/30 hover:bg-[#64b5f6] transition-all duration-500">
                Sky Blue
              </button>
              <button className="px-10 py-3 bg-transparent text-[#98d8c8] font-light tracking-wide rounded-lg border border-[#98d8c8]/30 hover:border-[#98d8c8]/60 transition-all duration-500">
                Mint
              </button>
              <button className="px-10 py-3 bg-transparent text-[#7a8a9e] font-light tracking-wide rounded-lg border border-[#d4d4cf]/40 hover:border-[#64b5f6]/40 hover:text-[#64b5f6] transition-all duration-500">
                Outline
              </button>
              <button className="px-10 py-3 bg-transparent text-[#b0b8c4] font-light tracking-wide rounded-lg border border-[#d4d4cf]/20 hover:border-[#d4d4cf]/40 transition-all duration-500">
                Whisper
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hairline divider */}
      <div className="max-w-xs mx-auto px-8">
        <div className="h-px bg-[#d4d4cf]/25" />
      </div>

      {/* Cards: asymmetric wabi-sabi layout with botanical accents */}
      <section className="relative z-10 py-24 md:py-32 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-xl md:text-2xl font-extralight text-[#4a5568] tracking-wide mb-3">
              Cards
            </h2>
            <p className="text-[#b0b8c4] font-light text-sm">
              Floating in whitespace, weightless
            </p>
          </div>

          {/* Botanical accent for this section */}
          <div className="absolute right-8 md:right-20 pointer-events-none" style={{ marginTop: "-2rem" }}>
            <svg
              viewBox="0 0 80 120"
              fill="none"
              stroke="#98d8c8"
              strokeWidth="0.6"
              className="w-16 h-24 opacity-[0.15]"
            >
              <path d="M40 120 C40 90, 42 60, 44 30 C45 20, 43 10, 44 0" />
              <path d="M44 50 C54 46, 62 38, 66 32 C60 40, 52 47, 44 50" />
              <path d="M43 75 C33 70, 26 62, 22 54 C28 63, 35 71, 43 75" />
            </svg>
          </div>

          {/* Asymmetric grid: wabi-sabi layout */}
          <div className="grid md:grid-cols-5 gap-6 md:gap-8">
            <div className="md:col-span-3 p-8 md:p-10 bg-white rounded-xl border border-[#d4d4cf]/30 hover:border-[#d4d4cf]/50 hover:-translate-y-px transition-all duration-500">
              <div className="w-9 h-9 bg-[#64b5f6]/8 rounded-lg flex items-center justify-center mb-6">
                <Feather className="w-4 h-4 text-[#64b5f6]" />
              </div>
              <h3 className="text-lg font-extralight text-[#4a5568] mb-3 tracking-wide">
                Lightness
              </h3>
              <p className="text-[#b0b8c4] text-sm font-light leading-relaxed">
                Design that breathes. Every element exists with intention, surrounded by generous
                space that gives it meaning.
              </p>
            </div>

            <div className="md:col-span-2 p-8 md:p-10 bg-white rounded-xl border border-[#98d8c8]/25 hover:border-[#98d8c8]/40 hover:-translate-y-px transition-all duration-500">
              <div className="w-9 h-9 bg-[#98d8c8]/8 rounded-lg flex items-center justify-center mb-6">
                <Droplets className="w-4 h-4 text-[#98d8c8]" />
              </div>
              <h3 className="text-lg font-extralight text-[#4a5568] mb-3 tracking-wide">
                Freshness
              </h3>
              <p className="text-[#b0b8c4] text-sm font-light leading-relaxed">
                Like morning dew on paper screens.
              </p>
            </div>

            <div className="md:col-span-2 p-8 md:p-10 bg-white rounded-xl border border-[#ffb7c5]/25 hover:border-[#ffb7c5]/40 hover:-translate-y-px transition-all duration-500">
              <div className="w-9 h-9 bg-[#ffb7c5]/8 rounded-lg flex items-center justify-center mb-6">
                <Wind className="w-4 h-4 text-[#ffb7c5]" />
              </div>
              <h3 className="text-lg font-extralight text-[#4a5568] mb-3 tracking-wide">
                Softness
              </h3>
              <p className="text-[#b0b8c4] text-sm font-light leading-relaxed">
                Gentle to the eyes and the soul.
              </p>
            </div>

            <div className="md:col-span-3 p-8 md:p-10 bg-white rounded-xl border border-[#64b5f6]/20 hover:border-[#64b5f6]/35 hover:-translate-y-px transition-all duration-500">
              <h3 className="text-lg font-extralight text-[#4a5568] mb-3 tracking-wide">
                Ma (space between)
              </h3>
              <p className="text-[#b0b8c4] text-sm font-light leading-relaxed">
                The Japanese concept of Ma teaches us that emptiness is not absence
                -- it is the most powerful design element. What you leave out matters
                more than what you include.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hairline divider */}
      <div className="max-w-xs mx-auto px-8">
        <div className="h-px bg-[#d4d4cf]/25" />
      </div>

      {/* Form: bottom-line inputs with floating labels */}
      <section className="relative z-10 py-24 md:py-32 px-8 md:px-12">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-2xl font-extralight text-[#4a5568] tracking-wide mb-3">
              Form
            </h2>
            <p className="text-[#b0b8c4] font-light text-sm">
              Bottom-line inputs, floating labels
            </p>
          </div>

          <div className="space-y-10">
            <div className="relative pt-5">
              <input
                type="text"
                placeholder=" "
                className="w-full pb-2 pt-0 bg-transparent border-0 border-b border-[#d4d4cf] text-[#4a5568] font-light focus:border-[#64b5f6] focus:outline-none transition-all duration-500 peer"
              />
              <label className="absolute top-0 left-0 text-xs font-light text-[#b0b8c4] tracking-wide peer-focus:text-[#64b5f6] transition-all duration-500">
                Your name
              </label>
            </div>

            <div className="relative pt-5">
              <input
                type="email"
                placeholder=" "
                className="w-full pb-2 pt-0 bg-transparent border-0 border-b border-[#d4d4cf] text-[#4a5568] font-light focus:border-[#98d8c8] focus:outline-none transition-all duration-500 peer"
              />
              <label className="absolute top-0 left-0 text-xs font-light text-[#b0b8c4] tracking-wide peer-focus:text-[#98d8c8] transition-all duration-500">
                Your email
              </label>
            </div>

            <div className="relative pt-5">
              <textarea
                placeholder=" "
                rows={3}
                className="w-full pb-2 pt-0 bg-transparent border-0 border-b border-[#d4d4cf] text-[#4a5568] font-light focus:border-[#ffb7c5] focus:outline-none transition-all duration-500 peer resize-none"
              />
              <label className="absolute top-0 left-0 text-xs font-light text-[#b0b8c4] tracking-wide peer-focus:text-[#ffb7c5] transition-all duration-500">
                A thought
              </label>
            </div>

            <button className="w-full px-10 py-3 bg-[#64b5f6]/90 text-white font-light tracking-wide rounded-lg border border-[#64b5f6]/30 hover:bg-[#64b5f6] transition-all duration-500">
              Send quietly
            </button>
          </div>
        </div>
      </section>

      {/* Generous breathing room before footer */}
      <div className="py-16" />

      {/* Footer: minimal, barely there */}
      <footer className="relative z-10 py-8 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-[#d4d4cf]/20 mb-8" />
          <div className="text-center">
            <p className="text-[#b0b8c4] text-sm font-light tracking-wide">
              Japanese Fresh Showcase /{" "}
              <Link
                href="/"
                className="text-[#64b5f6] hover:text-[#64b5f6]/70 transition-all duration-500"
              >
                StyleKit
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
