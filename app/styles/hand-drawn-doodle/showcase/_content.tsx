"use client";

import Link from "next/link";
import { ArrowLeft, Pencil, Heart, Star, Smile } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Ink Black", hex: "#2c2c2c", bg: "bg-[#2c2c2c]" },
  { name: "Red Marker", hex: "#ff6b6b", bg: "bg-[#ff6b6b]" },
  { name: "Teal Marker", hex: "#4ecdc4", bg: "bg-[#4ecdc4]" },
  { name: "Yellow Marker", hex: "#ffd93d", bg: "bg-[#ffd93d]" },
  { name: "Paper", hex: "#fffef5", bg: "bg-[#fffef5]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#fffef5] relative overflow-hidden">
      {/* Decorative doodle elements */}
      <div className="fixed top-20 right-16 w-20 h-20 border-2 border-dashed border-[#4ecdc4]/20 rotate-12 rounded-sm pointer-events-none" />
      <div className="fixed top-32 right-28 w-16 h-16 border-2 border-dashed border-[#ff6b6b]/20 -rotate-6 rounded-sm pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-18 h-18 border-2 border-dashed border-[#ffd93d]/20 rotate-6 rounded-sm pointer-events-none" />
      <div className="fixed bottom-32 left-24 w-14 h-14 border-2 border-dashed border-[#4ecdc4]/20 -rotate-12 rounded-sm pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-dashed border-[#2c2c2c]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/hand-drawn-doodle"
            className="flex items-center gap-2 text-[#ff6b6b] hover:text-[#ff6b6b]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-bold tracking-wide">Back to Docs</span>
          </Link>
          <span className="font-sans font-black text-xl text-[#2c2c2c] rotate-[-1deg]">
            Doodle
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] font-sans font-semibold rounded-sm shadow-[2px_2px_0px_#4ecdc4] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#4ecdc4] hover:rotate-[-0.5deg] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Doodle"
        description="Hand-crafted interfaces with creative charm -- sketched with love"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-sans font-black text-[#2c2c2c] mb-2 rotate-[-1deg]"
        descriptionClassName="text-lg text-[#2c2c2c]/50 font-sans max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-4xl md:text-6xl font-sans font-black text-[#ff6b6b] rotate-[1deg] inline-block">
            & Sketch
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#2c2c2c] text-[#fffef5] font-sans font-semibold tracking-wide rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[4px_4px_0px_#ff6b6b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#ff6b6b] hover:rotate-[-0.5deg] transition-all duration-200">
            Start Drawing
          </button>
          <button className="px-10 py-4 bg-[#ff6b6b] text-[#fffef5] font-sans font-semibold tracking-wide rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[4px_4px_0px_#4ecdc4] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#4ecdc4] hover:rotate-[0.5deg] transition-all duration-200">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Marker Colors"
        subtitle="our favorite pens"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-black text-[#2c2c2c] mb-4 text-center rotate-[-0.5deg]"
        subtitleClassName="text-[#2c2c2c]/40 font-sans mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-dashed border-[#2c2c2c] bg-[#fffef5] rounded-sm shadow-[3px_3px_0px_#4ecdc4]"
            labelClassName="font-sans font-bold text-sm text-[#2c2c2c]"
            hexClassName="text-xs text-[#ff6b6b] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="tap tap tap"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-black text-[#2c2c2c] mb-4 text-center rotate-[0.5deg]"
        subtitleClassName="text-[#2c2c2c]/40 font-sans mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c] rounded-sm shadow-[4px_4px_0px_#ffd93d]">
            <p className="text-sm font-sans font-bold text-[#4ecdc4] mb-6">styles ~</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#2c2c2c] text-[#fffef5] font-sans font-semibold tracking-wide rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[3px_3px_0px_#ff6b6b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#ff6b6b] hover:rotate-[-0.5deg] transition-all">
                Ink
              </button>
              <button className="px-6 py-3 bg-[#ff6b6b] text-[#fffef5] font-sans font-semibold tracking-wide rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[3px_3px_0px_#4ecdc4] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#4ecdc4] hover:rotate-[0.5deg] transition-all">
                Red Marker
              </button>
              <button className="px-6 py-3 bg-transparent text-[#2c2c2c] font-sans font-semibold tracking-wide rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[2px_2px_0px_#ffd93d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#ffd93d] hover:rotate-[-0.5deg] transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-[#4ecdc4] text-[#fffef5] font-sans font-semibold tracking-wide rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[3px_3px_0px_#ffd93d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#ffd93d] hover:rotate-[0.5deg] transition-all">
                Teal
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="sticky notes"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-black text-[#2c2c2c] mb-4 text-center rotate-[-0.5deg]"
        subtitleClassName="text-[#2c2c2c]/40 font-sans mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c] rounded-sm shadow-[4px_4px_0px_#ff6b6b] hover:shadow-[6px_6px_0px_#ff6b6b] hover:-translate-y-1 hover:rotate-[0.5deg] transition-all duration-200">
            <div className="w-14 h-14 border-2 border-dashed border-[#ff6b6b] flex items-center justify-center mb-4 rotate-[-2deg]">
              <Pencil className="w-7 h-7 text-[#ff6b6b]" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#2c2c2c] mb-2">
              Sketch
            </h3>
            <p className="text-[#2c2c2c]/50 font-sans text-sm">Draw your ideas with quick strokes</p>
          </div>

          <div className="p-6 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c] rounded-sm shadow-[4px_4px_0px_#4ecdc4] hover:shadow-[6px_6px_0px_#4ecdc4] hover:-translate-y-1 hover:rotate-[-0.5deg] transition-all duration-200">
            <div className="w-14 h-14 border-2 border-dashed border-[#4ecdc4] flex items-center justify-center mb-4 rotate-[2deg]">
              <Heart className="w-7 h-7 text-[#4ecdc4]" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#2c2c2c] mb-2">
              Create
            </h3>
            <p className="text-[#2c2c2c]/50 font-sans text-sm">Craft with warmth and personality</p>
          </div>

          <div className="p-6 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c] rounded-sm shadow-[4px_4px_0px_#ffd93d] hover:shadow-[6px_6px_0px_#ffd93d] hover:-translate-y-1 hover:rotate-[0.5deg] transition-all duration-200">
            <div className="w-14 h-14 border-2 border-dashed border-[#ffd93d] flex items-center justify-center mb-4 rotate-[-1deg]">
              <Star className="w-7 h-7 text-[#ffd93d]" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#2c2c2c] mb-2">
              Inspire
            </h3>
            <p className="text-[#2c2c2c]/50 font-sans text-sm">Express ideas with playful charm</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="fill it in"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-sans font-black text-[#2c2c2c] mb-4 text-center rotate-[0.5deg]"
        subtitleClassName="text-[#2c2c2c]/40 font-sans mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c] rounded-sm shadow-[4px_4px_0px_#ff6b6b]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto border-2 border-dashed border-[#4ecdc4] flex items-center justify-center mb-4 rotate-[-2deg]">
                <Smile className="w-8 h-8 text-[#4ecdc4]" />
              </div>
              <h3 className="text-xl font-sans font-bold text-[#2c2c2c]">Sign the Guestbook</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-bold text-[#ff6b6b] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-4 py-3 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c] rounded-sm text-[#2c2c2c] placeholder-[#2c2c2c]/35 font-sans focus:border-[#ff6b6b] focus:shadow-[2px_2px_0px_#ffd93d] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-sans font-bold text-[#4ecdc4] mb-2">Message</label>
                <input
                  type="text"
                  placeholder="Say something nice..."
                  className="w-full px-4 py-3 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c] rounded-sm text-[#2c2c2c] placeholder-[#2c2c2c]/35 font-sans focus:border-[#4ecdc4] focus:shadow-[2px_2px_0px_#ff6b6b] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#2c2c2c] text-[#fffef5] font-sans font-semibold tracking-wide rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[3px_3px_0px_#4ecdc4] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#4ecdc4] hover:rotate-[-0.5deg] transition-all">
                Leave a note
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-dashed border-[#2c2c2c]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#2c2c2c]/40 text-sm font-sans">
            Hand-Drawn Doodle Showcase -- Part of{" "}
            <Link href="/" className="text-[#ff6b6b] hover:text-[#ff6b6b]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
