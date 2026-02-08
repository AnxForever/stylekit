"use client";

import Link from "next/link";
import { ArrowLeft, Zap, Circle, Square } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Red", hex: "#ff6b6b", bg: "bg-[#ff6b6b]" },
  { name: "Yellow", hex: "#feca57", bg: "bg-[#feca57]" },
  { name: "Cyan", hex: "#48dbfb", bg: "bg-[#48dbfb]" },
  { name: "Pink", hex: "#ff9ff3", bg: "bg-[#ff9ff3]" },
  { name: "Green", hex: "#1dd1a1", bg: "bg-[#1dd1a1]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-cyan-300 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="fixed top-20 left-20 w-20 h-20 bg-red-500 rounded-full border-4 border-black pointer-events-none" />
      <div className="fixed bottom-32 right-32 w-16 h-16 bg-blue-500 border-4 border-black rotate-45 pointer-events-none" />
      <div className="fixed top-1/3 right-20 w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-green-400 border-r-[30px] border-r-transparent pointer-events-none" />
      <div className="fixed bottom-40 left-32 w-12 h-12 bg-purple-500 rounded-full border-4 border-black pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-yellow-400 border-b-4 border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/memphis"
            className="flex items-center gap-2 text-black font-bold hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <span className="font-black text-2xl text-black uppercase tracking-wider">
            MEMPHIS
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-pink-400 border-4 border-black text-black font-bold shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="MEMPHIS"
        description="Design should be fun! - 80骞翠唬鎰忓ぇ鍒╄璁¤繍鍔ㄧ殑澶ц儐缇庡"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-black text-black uppercase mb-6"
        descriptionClassName="text-xl text-black/70 max-w-2xl mx-auto mb-10 font-bold"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="relative px-8 py-4 bg-yellow-400 border-4 border-black text-black font-black uppercase shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150">
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-black" />
            Get Started
          </button>
          <button className="px-8 py-4 bg-cyan-400 border-4 border-black text-black font-black uppercase shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="閰嶈壊绯荤粺"
        subtitle="椴滆壋鎾炶壊缁勫悎"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-4 border-black shadow-[6px_6px_0px_#000] bg-white"
            labelClassName="font-black text-sm text-black uppercase"
            hexClassName="text-xs text-gray-600 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="鎸夐挳"
        subtitle="纭竟闃村奖涓庢挒鑹?"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-pink-300 border-4 border-black shadow-[8px_8px_0px_#000]">
            <p className="text-sm font-black text-black uppercase tracking-wide mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="relative px-6 py-3 bg-yellow-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
                Primary
              </button>
              <button className="px-6 py-3 bg-cyan-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-green-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Success
              </button>
              <button className="px-6 py-3 bg-red-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Danger
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="鍗＄墖"
        subtitle="鍑犱綍瑁呴グ涓庣‖杈归鏍?"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="relative p-6 bg-pink-300 border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black" />
            <div className="absolute -bottom-3 -right-3 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-cyan-400 border-r-[20px] border-r-transparent" />
            <div className="w-16 h-16 bg-red-500 border-4 border-black flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-black text-black uppercase mb-2">
              Energy
            </h3>
            <p className="text-black/70 font-medium">Bold and vibrant design</p>
          </div>

          <div className="relative p-6 bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 border-2 border-black rotate-45" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-green-400 rounded-full border-2 border-black" />
            <div className="w-16 h-16 bg-blue-500 rounded-full border-4 border-black flex items-center justify-center mb-4">
              <Circle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-black text-black uppercase mb-2">
              Shapes
            </h3>
            <p className="text-black/70 font-medium">Geometric elements</p>
          </div>

          <div className="relative p-6 bg-cyan-300 border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -left-4 w-0 h-0 border-l-[15px] border-l-transparent border-b-[25px] border-b-red-500 border-r-[15px] border-r-transparent" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-purple-400 border-2 border-black" />
            <div className="w-16 h-16 bg-purple-500 border-4 border-black flex items-center justify-center mb-4">
              <Square className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-black text-black uppercase mb-2">
              Pattern
            </h3>
            <p className="text-black/70 font-medium">Playful decoration</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Interactive Form */}
      <ShowcaseSection
        title="琛ㄥ崟"
        subtitle="杈撳叆缁勪欢"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black" />
            <div className="absolute -bottom-3 -left-3 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-pink-400 border-r-[20px] border-r-transparent" />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-black text-black uppercase mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-yellow-100 border-4 border-black text-black font-bold placeholder-gray-400 focus:shadow-[4px_4px_0px_#48dbfb] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-black uppercase mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-pink-100 border-4 border-black text-black font-bold placeholder-gray-400 focus:shadow-[4px_4px_0px_#ff6b6b] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-green-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 bg-yellow-400 border-t-4 border-black">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-black font-bold text-sm">
            Memphis Showcase 路 Part of{" "}
            <Link href="/" className="underline hover:text-red-600 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

