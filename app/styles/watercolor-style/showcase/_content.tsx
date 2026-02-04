"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Droplets, Palette, Brush, Flower2, Sun, Cloud } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Ocean Blue", hex: "#4a6fa5", bg: "bg-[#4a6fa5]" },
  { name: "Canvas", hex: "#faf8f5", bg: "bg-[#faf8f5]", border: true },
  { name: "Coral", hex: "#e8a87c", bg: "bg-[#e8a87c]" },
  { name: "Seafoam", hex: "#85cdca", bg: "bg-[#85cdca]" },
  { name: "Lavender", hex: "#c3aed6", bg: "bg-[#c3aed6]" },
];

export default function ShowcaseContent() {
  const [activeColor, setActiveColor] = useState("#4a6fa5");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-[#f0ebe3]">
      {/* Watercolor texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(74, 111, 165, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(232, 168, 124, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 90%, rgba(133, 205, 202, 0.15) 0%, transparent 50%)
        `
      }} />

      {/* Navigation */}
      <nav className="px-6 py-4 bg-white/60 backdrop-blur-sm border-b border-[#4a6fa5]/10 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/watercolor-style"
            className="flex items-center gap-2 text-[#4a6fa5]/70 hover:text-[#4a6fa5] transition-colors font-light"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <span className="font-light text-2xl text-[#4a6fa5]">Watercolor Style</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-gradient-to-r from-[#4a6fa5]/80 to-[#85cdca]/80 text-white font-light text-sm rounded-full hover:opacity-90 transition-opacity"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Watercolor"
        description="Soft, dreamy aesthetics with painterly gradients, organic bleeds, and the gentle beauty of watercolor art."
        className="pt-20 pb-16 px-6 text-center relative z-10"
        titleClassName="text-5xl md:text-7xl font-light text-[#4a6fa5] mb-6"
        descriptionClassName="text-lg text-[#4a6fa5]/70 max-w-2xl mx-auto mb-10 font-light"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-[#4a6fa5] to-[#85cdca] text-white font-light text-lg rounded-full shadow-lg shadow-[#4a6fa5]/20 hover:shadow-xl hover:shadow-[#4a6fa5]/30 transition-all">
            Explore Art
          </button>
          <button className="px-8 py-4 bg-white/80 text-[#4a6fa5] font-light text-lg rounded-full border border-[#4a6fa5]/20 hover:bg-white hover:border-[#4a6fa5]/40 transition-all">
            View Gallery
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Soft, harmonious watercolor tones"
        className="py-16 px-6 relative z-10"
        titleClassName="text-3xl font-light text-[#4a6fa5] mb-4 text-center"
        subtitleClassName="text-[#4a6fa5]/60 mb-10 text-center font-light"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden shadow-lg"
            labelClassName="font-light text-sm text-[#333]"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Soft, flowing button designs"
        className="py-16 px-6 bg-white/40 backdrop-blur-sm relative z-10"
        titleClassName="text-3xl font-light text-[#4a6fa5] mb-4 text-center"
        subtitleClassName="text-[#4a6fa5]/60 mb-10 text-center font-light"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/60 rounded-3xl shadow-xl shadow-[#4a6fa5]/5">
            <p className="text-sm font-light text-[#4a6fa5]/70 mb-6">Gradient Variants</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="px-6 py-3 bg-gradient-to-r from-[#4a6fa5] to-[#85cdca] text-white font-light rounded-full shadow-md shadow-[#4a6fa5]/20 hover:shadow-lg transition-shadow">
                Ocean
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#e8a87c] to-[#c3aed6] text-white font-light rounded-full shadow-md shadow-[#e8a87c]/20 hover:shadow-lg transition-shadow">
                Sunset
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#85cdca] to-[#c3aed6] text-white font-light rounded-full shadow-md shadow-[#85cdca]/20 hover:shadow-lg transition-shadow">
                Garden
              </button>
              <button className="px-6 py-3 bg-white text-[#4a6fa5] font-light rounded-full border border-[#4a6fa5]/20 hover:border-[#4a6fa5]/40 transition-colors">
                Light
              </button>
            </div>

            <p className="text-sm font-light text-[#4a6fa5]/70 mb-6">With Icons</p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4a6fa5] to-[#85cdca] text-white font-light rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Droplets className="w-4 h-4" /> Paint
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e8a87c] to-[#c3aed6] text-white font-light rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Palette className="w-4 h-4" /> Create
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-[#4a6fa5] font-light rounded-full border border-[#4a6fa5]/20 hover:border-[#4a6fa5]/40 transition-colors">
                <Brush className="w-4 h-4" /> Brush
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Soft, flowing content containers"
        className="py-16 px-6 relative z-10"
        titleClassName="text-3xl font-light text-[#4a6fa5] mb-4 text-center"
        subtitleClassName="text-[#4a6fa5]/60 mb-10 text-center font-light"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-white to-[#4a6fa5]/5 rounded-3xl shadow-xl shadow-[#4a6fa5]/10 hover:shadow-2xl hover:shadow-[#4a6fa5]/15 transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-[#4a6fa5] to-[#85cdca] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#4a6fa5]/20">
              <Flower2 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-light text-[#4a6fa5] mb-2">Botanical</h3>
            <p className="text-[#4a6fa5]/60 font-light text-sm">Nature-inspired designs with organic shapes and gentle colors.</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-white to-[#e8a87c]/5 rounded-3xl shadow-xl shadow-[#e8a87c]/10 hover:shadow-2xl hover:shadow-[#e8a87c]/15 transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-[#e8a87c] to-[#c3aed6] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#e8a87c]/20">
              <Sun className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-light text-[#e8a87c] mb-2">Warmth</h3>
            <p className="text-[#4a6fa5]/60 font-light text-sm">Cozy, inviting aesthetics that feel like a warm embrace.</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-white to-[#85cdca]/5 rounded-3xl shadow-xl shadow-[#85cdca]/10 hover:shadow-2xl hover:shadow-[#85cdca]/15 transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-[#85cdca] to-[#c3aed6] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#85cdca]/20">
              <Cloud className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-light text-[#85cdca] mb-2">Dreamy</h3>
            <p className="text-[#4a6fa5]/60 font-light text-sm">Soft, ethereal designs that transport you to peaceful places.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Color Picker Demo */}
      <ShowcaseSection
        title="Interactive"
        subtitle="Pick your watercolor"
        className="py-16 px-6 bg-white/40 backdrop-blur-sm relative z-10"
        titleClassName="text-3xl font-light text-[#4a6fa5] mb-4 text-center"
        subtitleClassName="text-[#4a6fa5]/60 mb-10 text-center font-light"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/80 rounded-3xl shadow-xl shadow-[#4a6fa5]/10 text-center">
            <div
              className="w-32 h-32 mx-auto rounded-full shadow-2xl mb-6 transition-all duration-500"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${activeColor}40, ${activeColor})`,
                boxShadow: `0 20px 60px ${activeColor}40`
              }}
            />
            <p className="text-sm font-light text-[#4a6fa5]/70 mb-4">Select a color</p>
            <div className="flex justify-center gap-3">
              {colors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setActiveColor(color.hex)}
                  className={`w-10 h-10 rounded-full shadow-md transition-all hover:scale-110 ${activeColor === color.hex ? 'ring-2 ring-offset-2 ring-[#4a6fa5]' : ''}`}
                  style={{ background: color.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Forms"
        subtitle="Soft, inviting input fields"
        className="py-16 px-6 relative z-10"
        titleClassName="text-3xl font-light text-[#4a6fa5] mb-4 text-center"
        subtitleClassName="text-[#4a6fa5]/60 mb-10 text-center font-light"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/80 rounded-3xl shadow-xl shadow-[#4a6fa5]/10">
            <h3 className="text-2xl font-light text-[#4a6fa5] mb-6 text-center">Get in Touch</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-5 py-4 bg-white/80 rounded-2xl border border-[#4a6fa5]/10 font-light text-[#4a6fa5] placeholder-[#4a6fa5]/40 focus:outline-none focus:border-[#4a6fa5]/30 focus:shadow-lg focus:shadow-[#4a6fa5]/5 transition-all"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-5 py-4 bg-white/80 rounded-2xl border border-[#4a6fa5]/10 font-light text-[#4a6fa5] placeholder-[#4a6fa5]/40 focus:outline-none focus:border-[#4a6fa5]/30 focus:shadow-lg focus:shadow-[#4a6fa5]/5 transition-all"
              />
              <textarea
                placeholder="Your message"
                rows={4}
                className="w-full px-5 py-4 bg-white/80 rounded-2xl border border-[#4a6fa5]/10 font-light text-[#4a6fa5] placeholder-[#4a6fa5]/40 focus:outline-none focus:border-[#4a6fa5]/30 focus:shadow-lg focus:shadow-[#4a6fa5]/5 transition-all resize-none"
              />
              <button className="w-full py-4 bg-gradient-to-r from-[#4a6fa5] to-[#85cdca] text-white font-light text-lg rounded-2xl shadow-lg shadow-[#4a6fa5]/20 hover:shadow-xl hover:shadow-[#4a6fa5]/30 transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#4a6fa5]/10 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#4a6fa5]/50 text-sm font-light">
            Watercolor Style Showcase · Part of{" "}
            <Link href="/" className="text-[#4a6fa5] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
