"use client";

import Link from "next/link";
import { ArrowLeft, Sunset, Car, Palmtree, Radio } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Magenta", hex: "#ff006e", bg: "bg-[#ff006e]" },
  { name: "Purple", hex: "#a020f0", bg: "bg-[#a020f0]" },
  { name: "Cyan Sky", hex: "#00d4ff", bg: "bg-[#00d4ff]" },
  { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
  { name: "Sunset Orange", hex: "#ff6b35", bg: "bg-[#ff6b35]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#2d0a4e] to-[#ff006e]/20 relative overflow-hidden">
      {/* Sun */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-t from-[#ff6b35] via-[#ff006e] to-[#a020f0] rounded-t-full opacity-60 pointer-events-none" />

      {/* Grid floor */}
      <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(transparent_0%,rgba(255,0,110,0.1)_100%)] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,110,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,110,0.3)_1px,transparent_1px)] bg-[size:60px_30px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
      </div>

      {/* Palm trees silhouette */}
      <div className="fixed bottom-[22%] left-[5%] pointer-events-none opacity-40">
        <svg viewBox="0 0 120 200" className="w-20 h-40 fill-[#0a0a0a]">
          <path d="M55,200 L55,100 Q30,80 10,60 Q40,75 55,85 Q40,50 25,30 Q50,55 60,80 Q65,40 80,20 Q70,55 60,80 Q75,70 100,60 Q70,80 60,95 L60,200 Z" />
        </svg>
      </div>
      <div className="fixed bottom-[22%] right-[8%] pointer-events-none opacity-30">
        <svg viewBox="0 0 120 200" className="w-16 h-32 fill-[#0a0a0a]">
          <path d="M55,200 L55,100 Q30,80 10,60 Q40,75 55,85 Q40,50 25,30 Q50,55 60,80 Q65,40 80,20 Q70,55 60,80 Q75,70 100,60 Q70,80 60,95 L60,200 Z" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#ff006e]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/outrun"
            className="flex items-center gap-2 text-[#ff006e]/80 hover:text-[#ff006e] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] uppercase tracking-wider">
            OUTRUN
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#ff006e]/50 text-[#ff006e] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,110,0.3)] hover:bg-[#ff006e]/20 hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] rounded-lg transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="OUTRUN"
        description="Chase the sunset -- 80s retrowave with neon and speed"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ff006e] to-[#a020f0] mb-6"
        descriptionClassName="text-xl text-[#00d4ff]/80 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_30px_rgba(255,0,110,0.5)] hover:shadow-[0_0_50px_rgba(255,0,110,0.8)] hover:scale-105 transition-all duration-300">
            Ride
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:bg-[#00d4ff] hover:text-black hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all duration-300">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="配色系统"
        subtitle="Neon Horizon"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-4 text-center"
        subtitleClassName="text-[#a020f0]/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#ff006e]/30 bg-[#0a0a0a]/60 backdrop-blur-sm rounded-lg shadow-[0_0_15px_rgba(255,0,110,0.2)]"
            labelClassName="font-bold text-sm text-[#ff006e]"
            hexClassName="text-xs text-[#00d4ff] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="按钮"
        subtitle="Neon Controls"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-4 text-center"
        subtitleClassName="text-[#a020f0]/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#ff006e]/30 shadow-[0_0_30px_rgba(255,0,110,0.2)]">
            <p className="text-sm font-bold text-[#ff006e] uppercase tracking-wider mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,0,110,0.5)] hover:shadow-[0_0_30px_rgba(255,0,110,0.8)] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#ff006e] text-[#ff006e] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_10px_rgba(255,0,110,0.3),inset_0_0_10px_rgba(255,0,110,0.1)] hover:bg-[#ff006e] hover:text-white transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:bg-[#00d4ff] hover:text-black transition-all">
                Cyan
              </button>
              <button className="px-6 py-3 bg-transparent text-[#a020f0] font-bold uppercase tracking-wider rounded-lg hover:text-[#a020f0]/80 transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="卡片"
        subtitle="Retro Panels"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-4 text-center"
        subtitleClassName="text-[#a020f0]/60 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#ff006e]/30 shadow-[0_0_30px_rgba(255,0,110,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-r from-[#ff006e] to-[#a020f0] rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,0,110,0.5)]">
              <Sunset className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2">
              Sunset
            </h3>
            <p className="text-[#ff006e]/70">Chasing the horizon</p>
          </div>

          <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#00d4ff]/30 shadow-[0_0_30px_rgba(0,212,255,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-r from-[#00d4ff] to-[#a020f0] rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,212,255,0.5)]">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#ff006e] mb-2">
              Midnight Drive
            </h3>
            <p className="text-[#00d4ff]/70">Endless neon highway</p>
          </div>

          <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#a020f0]/30 shadow-[0_0_30px_rgba(160,32,240,0.3)]">
            <div className="w-16 h-16 bg-gradient-to-r from-[#a020f0] to-[#ff006e] rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(160,32,240,0.5)]">
              <Radio className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a020f0] to-[#ff006e] mb-2">
              Retrowave
            </h3>
            <p className="text-[#a020f0]/70">Echoes from the past</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="表单"
        subtitle="Neon Inputs"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-4 text-center"
        subtitleClassName="text-[#a020f0]/60 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#ff006e]/30 shadow-[0_0_40px_rgba(255,0,110,0.3)]">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#ff006e] via-[#a020f0] to-[#00d4ff] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,0,110,0.5)] mb-4">
                <Palmtree className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#ff006e]">Connect</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#ff006e] uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/60 rounded-lg border border-[#ff006e]/50 text-[#ff006e] placeholder-[#ff006e]/40 shadow-[0_0_10px_rgba(255,0,110,0.1)] focus:border-[#ff006e] focus:shadow-[0_0_20px_rgba(255,0,110,0.3)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#00d4ff] uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/60 rounded-lg border border-[#00d4ff]/50 text-[#00d4ff] placeholder-[#00d4ff]/40 shadow-[0_0_10px_rgba(0,212,255,0.1)] focus:border-[#00d4ff] focus:shadow-[0_0_20px_rgba(0,212,255,0.3)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,0,110,0.5)] hover:shadow-[0_0_30px_rgba(255,0,110,0.8)] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#ff006e]/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#ff006e]/60 text-sm">
            Outrun Showcase · Part of{" "}
            <Link href="/" className="text-[#ff006e] hover:text-[#ff006e]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
