"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Music, Disc, Radio, Tv } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Pink", hex: "#ff71ce", bg: "bg-[#ff71ce]" },
  { name: "Cyan", hex: "#01cdfe", bg: "bg-[#01cdfe]" },
  { name: "Purple", hex: "#b967ff", bg: "bg-[#b967ff]" },
  { name: "Green", hex: "#05ffa1", bg: "bg-[#05ffa1]" },
  { name: "Yellow", hex: "#fffb96", bg: "bg-[#fffb96]" },
];

export default function ShowcaseContent() {
  const [activeTrack, setActiveTrack] = useState(0);
  const tracks = ["Macintosh Plus", "Saint Pepsi", "Blank Banshee"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,113,206,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,113,206,0.1)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-pink-500/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/vaporwave"
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
            VAPORWAVE
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-pink-500/50 text-pink-400 hover:bg-pink-500/20 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="VAPORWAVE"
        description="銈偍銈广儐銉嗐偅銉冦偗銉汇儔銉兗銉?- 80骞翠唬澶嶅彜鏈潵涓讳箟缇庡"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6"
        descriptionClassName="text-xl text-pink-300/80 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,113,206,0.5),0_0_40px_rgba(1,205,254,0.3)] hover:shadow-[0_0_30px_rgba(255,113,206,0.7),0_0_60px_rgba(1,205,254,0.5)] hover:scale-105 transition-all duration-300">
            Enter the Dream
          </button>
          <button className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(1,205,254,0.3)] hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(1,205,254,0.5)] transition-all duration-300">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="閰嶈壊绯荤粺"
        subtitle="闇撹櫣鑹插僵"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-pink-500/30 shadow-[0_0_15px_rgba(255,113,206,0.2)]"
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
          <div className="p-8 bg-purple-900/50 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,113,206,0.2)]">
            <p className="text-sm font-bold text-pink-400 uppercase tracking-wide mb-6">鏍峰紡</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,113,206,0.5)] hover:shadow-[0_0_25px_rgba(255,113,206,0.7)] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 border-2 border-pink-500 text-pink-500 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,113,206,0.3),inset_0_0_10px_rgba(255,113,206,0.1)] hover:bg-pink-500 hover:text-white transition-all">
                Outline
              </button>
              <button className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(1,205,254,0.3)] hover:bg-cyan-400 hover:text-black transition-all">
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
          <div className="p-6 bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,113,206,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,113,206,0.5)]">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">
              Music
            </h3>
            <p className="text-pink-200/70">Smooth jazz and electronic beats</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm border border-cyan-500/30 shadow-[0_0_30px_rgba(1,205,254,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(1,205,254,0.5)]">
              <Disc className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-2">
              Vinyl
            </h3>
            <p className="text-cyan-200/70">Classic analog warmth</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-sm border border-purple-500/30 shadow-[0_0_30px_rgba(185,103,255,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(185,103,255,0.5)]">
              <Tv className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              Retro TV
            </h3>
            <p className="text-purple-200/70">VHS aesthetic vibes</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Music Player */}
      <ShowcaseSection
        title="Interactive"
        subtitle="Music Player"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/80 to-black/80 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_40px_rgba(255,113,206,0.3)]">
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,113,206,0.5)] mb-4">
                <Radio className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-pink-400">{tracks[activeTrack]}</h3>
              <p className="text-pink-300/60 text-sm">Now Playing</p>
            </div>
            <div className="flex justify-center gap-2">
              {tracks.map((track, i) => (
                <button
                  key={track}
                  onClick={() => setActiveTrack(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeTrack === i
                      ? "bg-pink-500 shadow-[0_0_10px_rgba(255,113,206,0.8)]"
                      : "bg-pink-500/30 hover:bg-pink-500/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-pink-500/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-pink-400/60 text-sm">
            Vaporwave Showcase 路 Part of{" "}
            <Link href="/" className="text-pink-400 hover:text-pink-300 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

