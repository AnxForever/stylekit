"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Gamepad2, Trophy, Star, Heart } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Pixel Art 配色 (PICO-8 palette)
const colors: ColorItem[] = [
  { name: "Dark", hex: "#1a1c2c", bg: "bg-[#1a1c2c]" },
  { name: "Red", hex: "#ff004d", bg: "bg-[#ff004d]" },
  { name: "Green", hex: "#00e436", bg: "bg-[#00e436]" },
  { name: "Blue", hex: "#29adff", bg: "bg-[#29adff]" },
  { name: "Yellow", hex: "#ffec27", bg: "bg-[#ffec27]" },
];

export default function ShowcaseContent() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#1a1c2c]">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-[#1a1c2c] border-b-4 border-[#ff004d]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/pixel-art"
            className="flex items-center gap-2 text-[#29adff] hover:text-white font-bold uppercase text-sm transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>BACK</span>
          </Link>
          <span className="font-bold text-xl text-white uppercase tracking-wider">PIXEL ART</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#ff004d] border-4 border-white rounded-none text-white font-bold uppercase text-sm shadow-[4px_4px_0_#00e436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#00e436] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100"
          >
            ALL STYLES
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="PIXEL ART"
        description="Retro 8-bit game aesthetics with sharp corners, pixel borders, hard-edge shadows, and vibrant PICO-8 colors."
        className="pt-20 pb-16 px-6 text-center"
        titleClassName="text-4xl md:text-6xl font-bold uppercase tracking-wider text-[#ffec27] mb-6 animate-pulse"
        descriptionClassName="text-lg text-[#29adff] max-w-2xl mx-auto mb-10 uppercase"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-[#ff004d] border-4 border-white rounded-none text-white font-bold uppercase text-xl shadow-[6px_6px_0_#00e436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#00e436] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all duration-100">
            START GAME
          </button>
          <button className="px-8 py-4 bg-[#29adff] border-4 border-white rounded-none text-white font-bold uppercase text-xl shadow-[6px_6px_0_#ffec27] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#ffec27] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all duration-100">
            OPTIONS
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR SYSTEM"
        subtitle="PICO-8 INSPIRED PALETTE"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-none overflow-hidden border-4 border-white shadow-[4px_4px_0_#1a1c2c]"
            labelClassName="font-bold text-sm text-white uppercase"
            hexClassName="text-xs text-gray-300 font-mono uppercase"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="PRESS TO INTERACT"
        className="py-16 px-6 bg-[#0f0f1e]"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="p-8 bg-[#1a1c2c] border-4 border-white rounded-none shadow-[8px_8px_0_#ff004d]">
            <p className="text-sm font-bold text-[#29adff] uppercase tracking-wide mb-6">COLORS</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#ff004d] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
                RED
              </button>
              <button className="px-6 py-3 bg-[#00e436] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
                GREEN
              </button>
              <button className="px-6 py-3 bg-[#29adff] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
                BLUE
              </button>
              <button className="px-6 py-3 bg-[#ffec27] border-4 border-[#1a1c2c] rounded-none text-[#1a1c2c] font-bold uppercase shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
                YELLOW
              </button>
            </div>

            <p className="text-sm font-bold text-[#29adff] uppercase tracking-wide mb-6 mt-10">SIZES</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-4 py-2 text-sm bg-[#ff004d] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase shadow-[3px_3px_0_#1a1c2c] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
                SMALL
              </button>
              <button className="px-6 py-3 bg-[#ff004d] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
                MEDIUM
              </button>
              <button className="px-8 py-4 text-lg bg-[#ff004d] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase shadow-[6px_6px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#1a1c2c] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all duration-100">
                LARGE
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="GAME ELEMENTS"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border-4 border-[#1a1c2c] rounded-none shadow-[4px_4px_0_#1a1c2c]">
            <div className="w-16 h-16 bg-[#ff004d] border-4 border-[#1a1c2c] rounded-none flex items-center justify-center mb-4">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold uppercase text-[#1a1c2c] mb-2">PLAYER 1</h3>
            <p className="text-[#5f574f] uppercase text-sm">READY TO START</p>
          </div>

          <div className="p-6 bg-white border-4 border-[#1a1c2c] rounded-none shadow-[4px_4px_0_#1a1c2c]">
            <div className="w-16 h-16 bg-[#00e436] border-4 border-[#1a1c2c] rounded-none flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold uppercase text-[#1a1c2c] mb-2">HIGH SCORE</h3>
            <p className="text-[#5f574f] uppercase text-sm">9999 POINTS</p>
          </div>

          <div className="p-6 bg-white border-4 border-[#1a1c2c] rounded-none shadow-[4px_4px_0_#1a1c2c]">
            <div className="w-16 h-16 bg-[#29adff] border-4 border-[#1a1c2c] rounded-none flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold uppercase text-[#1a1c2c] mb-2">LEVEL 1</h3>
            <p className="text-[#5f574f] uppercase text-sm">EASY MODE</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="INPUT"
        subtitle="ENTER YOUR NAME"
        className="py-16 px-6 bg-[#0f0f1e]"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white border-4 border-[#1a1c2c] rounded-none shadow-[8px_8px_0_#ff004d]">
            <h3 className="text-2xl font-bold uppercase text-[#1a1c2c] mb-6 text-center">NEW GAME</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="PLAYER NAME..."
                className="w-full px-4 py-3 bg-white border-4 border-[#1a1c2c] rounded-none text-[#1a1c2c] placeholder-[#8b8680] font-mono uppercase focus:outline-none focus:shadow-[inset_0_0_0_2px_#29adff] transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <button className="py-3 bg-[#ff004d] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
                  EASY
                </button>
                <button className="py-3 bg-[#ffec27] border-4 border-[#1a1c2c] rounded-none text-[#1a1c2c] font-bold uppercase shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
                  HARD
                </button>
              </div>
              <button className="w-full py-4 bg-[#00e436] border-4 border-[#1a1c2c] rounded-none text-white font-bold uppercase text-lg shadow-[6px_6px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#1a1c2c] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all duration-100">
                START
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Interactive Score Counter */}
      <ShowcaseSection
        title="SCORE"
        subtitle="INTERACTIVE DEMO"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#ff004d] border-4 border-white rounded-none shadow-[8px_8px_0_#ffec27] text-center">
            <p className="text-sm font-bold text-white uppercase tracking-wide mb-2">CURRENT SCORE</p>
            <div className="text-6xl font-bold text-white mb-6 font-mono">{score.toString().padStart(4, '0')}</div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setScore(Math.max(0, score - 10))}
                className="w-16 h-16 bg-white border-4 border-[#1a1c2c] rounded-none text-[#1a1c2c] text-3xl font-bold shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100"
              >
                -
              </button>
              <button
                onClick={() => setScore(0)}
                className="w-16 h-16 bg-[#29adff] border-4 border-[#1a1c2c] rounded-none text-white text-xl font-bold shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100"
              >
                0
              </button>
              <button
                onClick={() => setScore(score + 10)}
                className="w-16 h-16 bg-white border-4 border-[#1a1c2c] rounded-none text-[#1a1c2c] text-3xl font-bold shadow-[4px_4px_0_#1a1c2c] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1c2c] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Game Menu */}
      <ShowcaseSection
        title="MENU"
        subtitle="GAME OPTIONS"
        className="py-16 px-6 bg-[#0f0f1e]"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#1a1c2c] border-4 border-white rounded-none shadow-[8px_8px_0_#00e436]">
            <div className="space-y-3">
              <button className="w-full py-4 bg-[#ff004d] border-4 border-white rounded-none text-white font-bold uppercase text-lg shadow-[4px_4px_0_white] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_white] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100">
                &gt; START GAME
              </button>
              <button className="w-full py-4 bg-[#1a1c2c] border-4 border-[#29adff] rounded-none text-[#29adff] font-bold uppercase text-lg hover:bg-[#29adff] hover:text-white transition-colors">
                OPTIONS
              </button>
              <button className="w-full py-4 bg-[#1a1c2c] border-4 border-[#29adff] rounded-none text-[#29adff] font-bold uppercase text-lg hover:bg-[#29adff] hover:text-white transition-colors">
                HIGH SCORES
              </button>
              <button className="w-full py-4 bg-[#1a1c2c] border-4 border-[#29adff] rounded-none text-[#29adff] font-bold uppercase text-lg hover:bg-[#29adff] hover:text-white transition-colors">
                CREDITS
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Stats Display */}
      <ShowcaseSection
        title="STATS"
        subtitle="PLAYER INFO"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border-4 border-[#1a1c2c] rounded-none shadow-[8px_8px_0_#1a1c2c]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#ff004d] mb-2 font-mono">99</div>
                <div className="text-[#1a1c2c] uppercase text-sm font-bold">LIVES</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#00e436] mb-2 font-mono">50</div>
                <div className="text-[#1a1c2c] uppercase text-sm font-bold">COINS</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#29adff] mb-2 font-mono">12</div>
                <div className="text-[#1a1c2c] uppercase text-sm font-bold">LEVEL</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#ffec27] mb-2 font-mono">3</div>
                <div className="text-[#1a1c2c] uppercase text-sm font-bold">STARS</div>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t-4 border-[#ff004d]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#29adff] text-sm uppercase font-bold">
            PIXEL ART SHOWCASE · PART OF{" "}
            <Link href="/" className="text-[#ffec27] hover:text-white transition-colors">
              STYLEKIT
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
