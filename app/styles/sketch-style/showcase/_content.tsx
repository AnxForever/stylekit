"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, Eraser, BookOpen, Lightbulb, Coffee, Heart } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Pencil Gray", hex: "#2c2c2c", bg: "bg-[#2c2c2c]" },
  { name: "Paper Cream", hex: "#f5f0e8", bg: "bg-[#f5f0e8]" },
  { name: "Sketch Red", hex: "#e74c3c", bg: "bg-[#e74c3c]" },
  { name: "Note Blue", hex: "#3498db", bg: "bg-[#3498db]" },
  { name: "Warm Brown", hex: "#8b7355", bg: "bg-[#8b7355]" },
];

export default function ShowcaseContent() {
  const [notes, setNotes] = useState("");

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Navigation */}
      <nav className="px-6 py-4 bg-[#f5f0e8] border-b-2 border-dashed border-[#2c2c2c]/30 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/sketch-style"
            className="flex items-center gap-2 text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors italic"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>back</span>
          </Link>
          <span className="font-serif text-2xl text-[#2c2c2c] italic">Sketch Style</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-transparent border-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] font-serif italic text-sm hover:bg-[#2c2c2c]/5 transition-colors transform -rotate-1"
          >
            all styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Sketch Style"
        description="Hand-drawn aesthetic with pencil textures, organic lines, paper backgrounds, and a warm, personal feel."
        className="pt-20 pb-16 px-6 text-center relative z-10"
        titleClassName="text-5xl md:text-7xl font-serif italic text-[#2c2c2c] mb-6"
        descriptionClassName="text-lg text-[#2c2c2c]/70 max-w-2xl mx-auto mb-10 font-serif italic"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-[#2c2c2c] border-2 border-dashed border-[#2c2c2c] text-[#f5f0e8] font-serif italic text-lg hover:bg-[#2c2c2c]/90 transition-colors transform -rotate-1">
            Start Drawing
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] font-serif italic text-lg hover:bg-[#2c2c2c]/5 transition-colors transform rotate-1">
            View Gallery
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Muted, warm tones inspired by sketchbooks"
        className="py-16 px-6 bg-white/50 border-y-2 border-dashed border-[#2c2c2c]/20 relative z-10"
        titleClassName="text-3xl font-serif italic text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#2c2c2c]/60 mb-10 text-center font-serif italic"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-none overflow-hidden border-2 border-dashed border-[#2c2c2c]/30 transform -rotate-1 hover:rotate-0 transition-transform"
            labelClassName="font-serif italic text-sm text-[#2c2c2c]"
            hexClassName="text-xs text-[#2c2c2c]/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Sketchy, hand-drawn button styles"
        className="py-16 px-6 relative z-10"
        titleClassName="text-3xl font-serif italic text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#2c2c2c]/60 mb-10 text-center font-serif italic"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/70 border-2 border-dashed border-[#2c2c2c]/30 transform -rotate-[0.5deg]">
            <p className="text-sm font-serif italic text-[#2c2c2c]/70 mb-6">variants:</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="px-6 py-3 bg-[#2c2c2c] border-2 border-dashed border-[#2c2c2c] text-[#f5f0e8] font-serif italic hover:bg-[#2c2c2c]/90 transition-colors transform -rotate-1 hover:rotate-0">
                primary
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] font-serif italic hover:bg-[#2c2c2c]/5 transition-colors transform rotate-1 hover:rotate-0">
                secondary
              </button>
              <button className="px-6 py-3 bg-[#e74c3c]/10 border-2 border-dashed border-[#e74c3c] text-[#e74c3c] font-serif italic hover:bg-[#e74c3c]/20 transition-colors transform -rotate-1 hover:rotate-0">
                accent
              </button>
              <button className="px-6 py-3 text-[#2c2c2c]/60 font-serif italic underline decoration-dashed underline-offset-4 hover:text-[#2c2c2c] transition-colors">
                link style
              </button>
            </div>

            <p className="text-sm font-serif italic text-[#2c2c2c]/70 mb-6">with icons:</p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#2c2c2c] border-2 border-dashed border-[#2c2c2c] text-[#f5f0e8] font-serif italic transform -rotate-1 hover:rotate-0 transition-transform">
                <Pencil className="w-4 h-4" /> draw
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] font-serif italic transform rotate-1 hover:rotate-0 transition-transform">
                <Eraser className="w-4 h-4" /> erase
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Notebook-style content blocks"
        className="py-16 px-6 bg-white/50 border-y-2 border-dashed border-[#2c2c2c]/20 relative z-10"
        titleClassName="text-3xl font-serif italic text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#2c2c2c]/60 mb-10 text-center font-serif italic"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#f5f0e8] border-2 border-dashed border-[#2c2c2c]/30 transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="w-12 h-12 bg-[#e74c3c]/10 border-2 border-dashed border-[#e74c3c]/50 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-[#e74c3c]" />
            </div>
            <h3 className="text-xl font-serif italic text-[#2c2c2c] mb-2">Chapter One</h3>
            <p className="text-[#2c2c2c]/60 font-serif italic text-sm">Begin your creative journey here...</p>
          </div>

          <div className="p-6 bg-[#f5f0e8] border-2 border-dashed border-[#2c2c2c]/30 transform rotate-1 hover:rotate-0 transition-transform">
            <div className="w-12 h-12 bg-[#3498db]/10 border-2 border-dashed border-[#3498db]/50 rounded-full flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-[#3498db]" />
            </div>
            <h3 className="text-xl font-serif italic text-[#2c2c2c] mb-2">Ideas</h3>
            <p className="text-[#2c2c2c]/60 font-serif italic text-sm">Capture your inspiration...</p>
          </div>

          <div className="p-6 bg-[#f5f0e8] border-2 border-dashed border-[#2c2c2c]/30 transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="w-12 h-12 bg-[#8b7355]/10 border-2 border-dashed border-[#8b7355]/50 rounded-full flex items-center justify-center mb-4">
              <Coffee className="w-6 h-6 text-[#8b7355]" />
            </div>
            <h3 className="text-xl font-serif italic text-[#2c2c2c] mb-2">Notes</h3>
            <p className="text-[#2c2c2c]/60 font-serif italic text-sm">Quick thoughts and reminders...</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Notepad Demo */}
      <ShowcaseSection
        title="Notepad"
        subtitle="Interactive sketch pad"
        className="py-16 px-6 relative z-10"
        titleClassName="text-3xl font-serif italic text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#2c2c2c]/60 mb-10 text-center font-serif italic"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#f5f0e8] border-2 border-dashed border-[#2c2c2c]/30 p-1 transform -rotate-1">
            {/* Spiral binding effect */}
            <div className="flex justify-center gap-4 mb-2">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full border-2 border-[#2c2c2c]/30" />
              ))}
            </div>
            <div className="p-6 bg-white/80" style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e0d8cc 28px)',
              backgroundSize: '100% 28px'
            }}>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your thoughts here..."
                className="w-full h-48 bg-transparent font-serif italic text-[#2c2c2c] placeholder-[#2c2c2c]/40 resize-none focus:outline-none leading-7"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm font-serif italic text-[#2c2c2c]/50">{notes.length} characters</span>
              <button className="px-4 py-2 bg-[#2c2c2c] text-[#f5f0e8] font-serif italic text-sm border-2 border-dashed border-[#2c2c2c] hover:bg-[#2c2c2c]/90 transition-colors">
                save note
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Forms"
        subtitle="Hand-drawn input fields"
        className="py-16 px-6 bg-white/50 border-y-2 border-dashed border-[#2c2c2c]/20 relative z-10"
        titleClassName="text-3xl font-serif italic text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#2c2c2c]/60 mb-10 text-center font-serif italic"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#f5f0e8] border-2 border-dashed border-[#2c2c2c]/30 transform rotate-[0.5deg]">
            <h3 className="text-2xl font-serif italic text-[#2c2c2c] mb-6 text-center">Guest Book</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-serif italic text-[#2c2c2c]/70 mb-1">name:</label>
                <input
                  type="text"
                  placeholder="your name..."
                  className="w-full px-4 py-3 bg-white/80 border-2 border-dashed border-[#2c2c2c]/30 font-serif italic text-[#2c2c2c] placeholder-[#2c2c2c]/40 focus:outline-none focus:border-[#2c2c2c]/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-serif italic text-[#2c2c2c]/70 mb-1">message:</label>
                <textarea
                  placeholder="leave a message..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/80 border-2 border-dashed border-[#2c2c2c]/30 font-serif italic text-[#2c2c2c] placeholder-[#2c2c2c]/40 focus:outline-none focus:border-[#2c2c2c]/60 transition-colors resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#2c2c2c] border-2 border-dashed border-[#2c2c2c] text-[#f5f0e8] font-serif italic hover:bg-[#2c2c2c]/90 transition-colors flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" /> sign the book
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t-2 border-dashed border-[#2c2c2c]/20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#2c2c2c]/50 text-sm font-serif italic">
            Sketch Style Showcase · Part of{" "}
            <Link href="/" className="text-[#2c2c2c] hover:underline decoration-dashed underline-offset-4">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
