"use client";

import Link from "next/link";
import { ArrowLeft, Swords, Heart, Star, Gamepad2, ChevronRight } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Pixel Blue", hex: "#4a90d9", bg: "bg-[#4a90d9]" },
  { name: "Pixel Red", hex: "#ff6b6b", bg: "bg-[#ff6b6b]" },
  { name: "Pixel Gold", hex: "#ffd93d", bg: "bg-[#ffd93d]" },
  { name: "Pixel Green", hex: "#50c878", bg: "bg-[#50c878]" },
  { name: "Dark Purple", hex: "#2d1b69", bg: "bg-[#2d1b69]" },
  { name: "Deep Dark", hex: "#1a1040", bg: "bg-[#1a1040]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#2d1b69] relative overflow-hidden">
      {/* Pixel grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,16,64,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(26,16,64,0.15) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
          imageRendering: "pixelated",
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#1a1040]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/pixel-anime"
            className="flex items-center gap-2 text-[#ffd93d] hover:text-[#ffd93d]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-mono font-bold uppercase tracking-wider text-sm">
              Back
            </span>
          </Link>
          <span className="font-mono font-bold text-xl text-[#4a90d9] uppercase tracking-wider">
            PIXEL ANIME
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#1a1040] text-[#ffd93d] font-mono font-bold uppercase tracking-wider text-sm bg-[#2d1b69] shadow-[3px_3px_0px_#1a1040] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero: RPG title screen */}
      <ShowcaseHero
        title="PIXEL ANIME"
        description="JRPG // 8-BIT // NES PALETTE"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-mono font-bold text-[#4a90d9] uppercase tracking-wider mb-2"
        descriptionClassName="text-base text-[#e0e0ff]/50 font-mono max-w-xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-3xl md:text-5xl font-mono font-bold text-[#ffd93d] uppercase tracking-wider">
            GAME START
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#4a90d9] text-white font-mono font-bold uppercase tracking-wider border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
            New Game
          </button>
          <button className="px-10 py-4 bg-[#ff6b6b] text-white font-mono font-bold uppercase tracking-wider border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
            Continue
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="NES PALETTE"
        subtitle="8-BIT COLORS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#e0e0ff] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/40 font-mono uppercase tracking-wider mb-10 text-center text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-[#1a1040] bg-[#2d1b69] shadow-[3px_3px_0px_#1a1040]"
            labelClassName="font-mono font-bold text-sm text-[#e0e0ff] uppercase"
            hexClassName="text-xs text-[#ffd93d] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* RPG Party: character panel with status bars */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-mono font-bold text-[#e0e0ff] uppercase tracking-wider mb-4">
              Party Status
            </h2>
            <p className="text-[#e0e0ff]/40 font-mono uppercase tracking-wider text-sm">
              Character Panels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Swords,
                name: "WARRIOR",
                level: 42,
                hp: { current: 892, max: 999 },
                mp: { current: 120, max: 200 },
                exp: 78,
                iconBg: "bg-[#4a90d9]",
                borderColor: "border-[#4a90d9]",
              },
              {
                icon: Heart,
                name: "HEALER",
                level: 38,
                hp: { current: 540, max: 680 },
                mp: { current: 780, max: 850 },
                exp: 45,
                iconBg: "bg-[#ff6b6b]",
                borderColor: "border-[#ff6b6b]",
              },
              {
                icon: Star,
                name: "MAGE",
                level: 40,
                hp: { current: 380, max: 450 },
                mp: { current: 1200, max: 1200 },
                exp: 92,
                iconBg: "bg-[#ffd93d]",
                borderColor: "border-[#ffd93d]",
              },
            ].map((char) => (
              <div
                key={char.name}
                className={`relative p-6 bg-[#1a1040] border-2 ${char.borderColor} shadow-[4px_4px_0px_#1a1040] hover:shadow-[6px_6px_0px_#1a1040] hover:-translate-y-1 transition-all duration-150 ease-linear`}
              >
                {/* Corner block decorations */}
                <div
                  className={`absolute -top-[4px] -left-[4px] w-[8px] h-[8px] ${char.iconBg}`}
                />
                <div
                  className={`absolute -top-[4px] -right-[4px] w-[8px] h-[8px] ${char.iconBg}`}
                />
                <div
                  className={`absolute -bottom-[4px] -left-[4px] w-[8px] h-[8px] ${char.iconBg}`}
                />
                <div
                  className={`absolute -bottom-[4px] -right-[4px] w-[8px] h-[8px] ${char.iconBg}`}
                />

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 ${char.iconBg} border-2 border-[#1a1040] flex items-center justify-center`}
                  >
                    <char.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-mono font-bold text-[#ffd93d] uppercase">
                      {char.name}
                    </h3>
                    <p className="text-[#e0e0ff]/50 font-mono text-xs">
                      LV. {char.level}
                    </p>
                  </div>
                </div>

                {/* HP Bar */}
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#ff6b6b] uppercase">
                      HP
                    </span>
                    <span className="text-[10px] font-mono text-[#e0e0ff]/60">
                      {char.hp.current}/{char.hp.max}
                    </span>
                  </div>
                  <div className="h-2 bg-[#2d1b69] border-2 border-[#1a1040]">
                    <div
                      className="h-full bg-[#ff6b6b]"
                      style={{
                        width: `${(char.hp.current / char.hp.max) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* MP Bar */}
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#4a90d9] uppercase">
                      MP
                    </span>
                    <span className="text-[10px] font-mono text-[#e0e0ff]/60">
                      {char.mp.current}/{char.mp.max}
                    </span>
                  </div>
                  <div className="h-2 bg-[#2d1b69] border-2 border-[#1a1040]">
                    <div
                      className="h-full bg-[#4a90d9]"
                      style={{
                        width: `${(char.mp.current / char.mp.max) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* EXP Bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#50c878] uppercase">
                      EXP
                    </span>
                    <span className="text-[10px] font-mono text-[#e0e0ff]/60">
                      {char.exp}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#2d1b69] border-2 border-[#1a1040]">
                    <div
                      className="h-full bg-[#50c878]"
                      style={{ width: `${char.exp}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Battle Commands: RPG menu button showcase */}
      <ShowcaseSection
        title="BATTLE MENU"
        subtitle="COMMANDS"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#e0e0ff] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/40 font-mono uppercase tracking-wider mb-10 text-center text-sm"
      >
        <div className="max-w-lg mx-auto">
          <div className="relative p-6 bg-[#1a1040] border-2 border-[#4a90d9] shadow-[4px_4px_0px_#1a1040]">
            {/* Corner blocks */}
            <div className="absolute -top-[4px] -left-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
            <div className="absolute -top-[4px] -right-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
            <div className="absolute -bottom-[4px] -left-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
            <div className="absolute -bottom-[4px] -right-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />

            <p className="text-sm font-mono font-bold text-[#ffd93d] uppercase tracking-wider mb-4">
              Select Action
            </p>

            <div className="space-y-3">
              {[
                { label: "ATTACK", bg: "bg-[#4a90d9]" },
                { label: "MAGIC", bg: "bg-[#ff6b6b]" },
                { label: "DEFEND", bg: "bg-transparent border-2 border-[#ffd93d] text-[#ffd93d]" },
                { label: "HEAL", bg: "bg-[#50c878]" },
                { label: "ITEM", bg: "bg-[#2d1b69] border-2 border-[#4a90d9]" },
              ].map((action, idx) => (
                <button
                  key={action.label}
                  className={`w-full flex items-center gap-3 px-4 py-3 ${action.bg} ${action.bg.includes("text-") ? "" : "text-white"} font-mono font-bold uppercase tracking-wider text-sm ${action.bg.includes("border") ? "" : "border-2 border-[#1a1040]"} shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear`}
                >
                  <ChevronRight
                    className={`w-4 h-4 ${idx === 0 ? "animate-pulse" : "opacity-0"}`}
                  />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Save File: form in RPG dialogue box */}
      <ShowcaseSection
        title="SAVE FILE"
        subtitle="DATA INPUT"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-mono font-bold text-[#e0e0ff] uppercase tracking-wider mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/40 font-mono uppercase tracking-wider mb-10 text-center text-sm"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-[#1a1040] border-2 border-[#4a90d9] shadow-[4px_4px_0px_#1a1040]">
            {/* Corner blocks */}
            <div className="absolute -top-[4px] -left-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
            <div className="absolute -top-[4px] -right-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
            <div className="absolute -bottom-[4px] -left-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />
            <div className="absolute -bottom-[4px] -right-[4px] w-[8px] h-[8px] bg-[#4a90d9]" />

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-[#4a90d9] border-2 border-[#1a1040] flex items-center justify-center mb-4">
                <Gamepad2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-mono font-bold text-[#ffd93d] uppercase">
                New Game
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#4a90d9] uppercase tracking-wider mb-2">
                  Player Name
                </label>
                <input
                  type="text"
                  placeholder="ENTER NAME..."
                  className="w-full px-4 py-3 bg-[#2d1b69] border-2 border-[#4a90d9] text-[#e0e0ff] placeholder-[#e0e0ff]/40 font-mono text-sm focus:border-[#ffd93d] focus:shadow-[2px_2px_0px_#4a90d9] focus:outline-none transition-all duration-150 ease-linear caret-[#ffd93d]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#ff6b6b] uppercase tracking-wider mb-2">
                  Class
                </label>
                <input
                  type="text"
                  placeholder="CHOOSE CLASS..."
                  className="w-full px-4 py-3 bg-[#2d1b69] border-2 border-[#ff6b6b] text-[#e0e0ff] placeholder-[#e0e0ff]/40 font-mono text-sm focus:border-[#ffd93d] focus:shadow-[2px_2px_0px_#ff6b6b] focus:outline-none transition-all duration-150 ease-linear caret-[#ffd93d]"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#4a90d9] text-white font-mono font-bold uppercase tracking-wider border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
                Start Game
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#1a1040]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#e0e0ff]/40 text-xs font-mono uppercase tracking-wider">
            Pixel Anime Showcase / Part of{" "}
            <Link
              href="/"
              className="text-[#ffd93d] hover:text-[#ffd93d]/80 transition-colors"
            >
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

