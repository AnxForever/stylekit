"use client";

import Link from "next/link";
import { ArrowLeft, Sun, Mountain, Zap, Car } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Magenta", hex: "#ff00ff", bg: "bg-[#ff00ff]" },
  { name: "Cyan", hex: "#00ffff", bg: "bg-[#00ffff]" },
  { name: "Purple", hex: "#7b68ee", bg: "bg-[#7b68ee]" },
  { name: "Hot Pink", hex: "#ff6ec7", bg: "bg-[#ff6ec7]" },
  { name: "Deep Pink", hex: "#ff1493", bg: "bg-[#ff1493]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-orange-900 relative overflow-hidden">
      {/* Sun */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-t from-orange-500 via-pink-500 to-purple-500 rounded-t-full opacity-60 pointer-events-none" />

      {/* Grid floor */}
      <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(transparent_0%,rgba(255,0,255,0.1)_100%)] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,255,0.3)_1px,transparent_1px)] bg-[size:60px_30px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
      </div>

      {/* Mountains silhouette */}
      <div className="fixed bottom-[20%] left-0 right-0 h-32 pointer-events-none">
        <svg viewBox="0 0 1200 200" className="w-full h-full fill-purple-900/80">
          <polygon points="0,200 0,120 150,60 300,120 450,40 600,100 750,20 900,80 1050,50 1200,100 1200,200" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-pink-500/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/synthwave"
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider">Back</span>
          </Link>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 uppercase tracking-wider">
            SYNTHWAVE
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-pink-500/50 text-pink-400 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,255,0.3)] hover:bg-pink-500/20 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="SYNTHWAVE"
        description="Ride into the sunset - 80骞翠唬澶嶅彜鏈潵涓讳箟鐨勯湏铏规ⅵ澧?
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-600 mb-6"
        descriptionClassName="text-xl text-pink-200/80 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(255,0,255,0.5)] hover:shadow-[0_0_50px_rgba(255,0,255,0.8)] hover:scale-105 transition-all duration-300">
            Drive
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] transition-all duration-300">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="閰嶈壊绯荤粺"
        subtitle="闇撹櫣鐏厜"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-pink-500/30 bg-purple-900/50 backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,255,0.2)]"
            labelClassName="font-bold text-sm text-pink-300"
            hexClassName="text-xs text-cyan-400 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="鎸夐挳"
        subtitle="闇撹櫣鍙戝厜鏁堟灉"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/80 to-black/80 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
            <p className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_30px_rgba(255,0,255,0.8)] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-pink-500 text-pink-500 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,255,0.3),inset_0_0_10px_rgba(255,0,255,0.1)] hover:bg-pink-500 hover:text-white transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,255,0.3)] hover:bg-cyan-400 hover:text-black transition-all">
                Cyan
              </button>
              <button className="px-6 py-3 bg-transparent text-pink-400 font-bold uppercase tracking-wider hover:text-pink-300 transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="鍗＄墖"
        subtitle="澶嶅彜鏈潵鎰?
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-purple-900/80 to-black/80 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,0,255,0.5)]">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">
              Sunset
            </h3>
            <p className="text-pink-200/70">Chase the horizon</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-900/80 to-black/80 backdrop-blur-sm border border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,255,255,0.5)]">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-2">
              Mountains
            </h3>
            <p className="text-cyan-200/70">Distant silhouettes</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-900/80 to-black/80 backdrop-blur-sm border border-purple-500/30 shadow-[0_0_30px_rgba(185,103,255,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(185,103,255,0.5)]">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              Drive
            </h3>
            <p className="text-purple-200/70">Endless night road</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="琛ㄥ崟"
        subtitle="闇撹櫣杈规杈撳叆"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/80 to-black/80 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_40px_rgba(255,0,255,0.3)]">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,0,255,0.5)] mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pink-400">Connect</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full px-4 py-3 bg-black/50 border-2 border-pink-500/50 text-pink-100 placeholder-pink-500/50 shadow-[0_0_10px_rgba(255,0,255,0.1)] focus:border-pink-500 focus:shadow-[0_0_20px_rgba(255,0,255,0.3)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter text..."
                  className="w-full px-4 py-3 bg-black/50 border-2 border-cyan-500/50 text-cyan-100 placeholder-cyan-500/50 shadow-[0_0_10px_rgba(0,255,255,0.1)] focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_30px_rgba(255,0,255,0.8)] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-pink-500/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-pink-400/60 text-sm">
            Synthwave Showcase 路 Part of{" "}
            <Link href="/" className="text-pink-400 hover:text-pink-300 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

