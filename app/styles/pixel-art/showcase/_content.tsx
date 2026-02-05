"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Gamepad2, Trophy, Star, Heart, Zap, Shield, Sword,
  ChevronDown, ChevronUp, Check, X, AlertTriangle, Info
} from "lucide-react";
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
  { name: "Pink", hex: "#ff77a8", bg: "bg-[#ff77a8]" },
  { name: "Orange", hex: "#ffa300", bg: "bg-[#ffa300]" },
  { name: "Purple", hex: "#7e2553", bg: "bg-[#7e2553]" },
];

export default function ShowcaseContent() {
  const [score, setScore] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [health, setHealth] = useState(75);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "INVENTORY", icon: Shield },
    { label: "SKILLS", icon: Zap },
    { label: "QUESTS", icon: Sword },
  ];

  const accordionItems = [
    { title: "HOW TO PLAY?", content: "USE ARROW KEYS TO MOVE. PRESS SPACE TO JUMP. COLLECT COINS AND AVOID ENEMIES!" },
    { title: "CONTROLS", content: "WASD OR ARROW KEYS FOR MOVEMENT. SPACE FOR ACTION. ESC FOR PAUSE MENU." },
    { title: "GAME TIPS", content: "COLLECT POWER-UPS FOR EXTRA ABILITIES. SAVE YOUR PROGRESS AT CHECKPOINTS." },
  ];

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

      {/* Tabs */}
      <ShowcaseSection
        title="TABS"
        subtitle="GAME PANELS"
        className="py-16 px-6 bg-[#0f0f1e]"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-[#1a1c2c] border-4 border-white rounded-none shadow-[8px_8px_0_#ff004d]">
            {/* Tab Headers */}
            <div className="flex border-b-4 border-[#29adff] mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-3 font-bold uppercase text-sm transition-all ${
                    activeTab === index
                      ? 'bg-[#29adff] text-white -mb-1 border-4 border-[#29adff] border-b-0'
                      : 'text-[#29adff] hover:bg-[#29adff]/20'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="min-h-[120px] p-4 bg-[#0f0f1e] border-4 border-[#29adff]">
              {activeTab === 0 && (
                <div className="text-white">
                  <p className="text-[#ffec27] font-bold mb-3">INVENTORY</p>
                  <div className="flex gap-2">
                    {['SWORD', 'SHIELD', 'POTION', 'KEY'].map((item) => (
                      <span key={item} className="px-3 py-1 bg-[#ff004d] border-2 border-white text-xs font-bold">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div className="text-white">
                  <p className="text-[#ffec27] font-bold mb-3">SKILLS</p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#ffec27]" /> FIREBALL LVL 3</li>
                    <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#29adff]" /> DEFENSE LVL 5</li>
                    <li className="flex items-center gap-2"><Heart className="w-4 h-4 text-[#ff004d]" /> HEAL LVL 2</li>
                  </ul>
                </div>
              )}
              {activeTab === 2 && (
                <div className="text-white">
                  <p className="text-[#ffec27] font-bold mb-3">ACTIVE QUESTS</p>
                  <ul className="space-y-1 text-sm">
                    <li className="text-[#00e436]">[!] DEFEAT THE DRAGON</li>
                    <li className="text-[#29adff]">[?] FIND THE TREASURE</li>
                    <li className="text-gray-500 line-through">[X] RESCUE THE PRINCESS</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="ALERTS"
        subtitle="GAME MESSAGES"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-center gap-4 p-4 bg-[#00e436] border-4 border-[#1a1c2c] shadow-[4px_4px_0_#1a1c2c]">
            <div className="w-10 h-10 bg-white border-4 border-[#1a1c2c] flex items-center justify-center">
              <Check className="w-5 h-5 text-[#00e436]" />
            </div>
            <div>
              <p className="font-bold text-[#1a1c2c] uppercase">LEVEL UP!</p>
              <p className="text-[#1a1c2c]/80 text-sm uppercase">YOU REACHED LEVEL 12!</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-4 p-4 bg-[#ffec27] border-4 border-[#1a1c2c] shadow-[4px_4px_0_#1a1c2c]">
            <div className="w-10 h-10 bg-white border-4 border-[#1a1c2c] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#ffa300]" />
            </div>
            <div>
              <p className="font-bold text-[#1a1c2c] uppercase">LOW HEALTH!</p>
              <p className="text-[#1a1c2c]/80 text-sm uppercase">FIND A HEALTH POTION!</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-center gap-4 p-4 bg-[#ff004d] border-4 border-[#1a1c2c] shadow-[4px_4px_0_#1a1c2c]">
            <div className="w-10 h-10 bg-white border-4 border-[#1a1c2c] flex items-center justify-center">
              <X className="w-5 h-5 text-[#ff004d]" />
            </div>
            <div>
              <p className="font-bold text-white uppercase">GAME OVER!</p>
              <p className="text-white/80 text-sm uppercase">TRY AGAIN?</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-4 p-4 bg-[#29adff] border-4 border-[#1a1c2c] shadow-[4px_4px_0_#1a1c2c]">
            <div className="w-10 h-10 bg-white border-4 border-[#1a1c2c] flex items-center justify-center">
              <Info className="w-5 h-5 text-[#29adff]" />
            </div>
            <div>
              <p className="font-bold text-white uppercase">NEW QUEST!</p>
              <p className="text-white/80 text-sm uppercase">CHECK YOUR MAP!</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress / Health Bar */}
      <ShowcaseSection
        title="PROGRESS"
        subtitle="HEALTH & XP BARS"
        className="py-16 px-6 bg-[#0f0f1e]"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-[#1a1c2c] border-4 border-white rounded-none shadow-[8px_8px_0_#ff004d]">
            <div className="space-y-8">
              {/* Health Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-[#ff004d] uppercase flex items-center gap-2">
                    <Heart className="w-4 h-4" /> HEALTH
                  </span>
                  <span className="text-sm text-white font-mono">{health}/100</span>
                </div>
                <div className="h-6 bg-[#1a1c2c] border-4 border-white overflow-hidden">
                  <div 
                    className="h-full bg-[#ff004d] transition-all duration-300"
                    style={{ width: `${health}%` }}
                  />
                </div>
              </div>

              {/* XP Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-[#29adff] uppercase flex items-center gap-2">
                    <Star className="w-4 h-4" /> EXPERIENCE
                  </span>
                  <span className="text-sm text-white font-mono">2450/5000</span>
                </div>
                <div className="h-6 bg-[#1a1c2c] border-4 border-white overflow-hidden">
                  <div className="h-full w-[49%] bg-[#29adff]" />
                </div>
              </div>

              {/* Mana Bar */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-[#7e2553] uppercase flex items-center gap-2">
                    <Zap className="w-4 h-4" /> MANA
                  </span>
                  <span className="text-sm text-white font-mono">80/100</span>
                </div>
                <div className="h-6 bg-[#1a1c2c] border-4 border-white overflow-hidden">
                  <div className="h-full w-[80%] bg-[#7e2553]" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setHealth(Math.max(0, health - 10))}
                  className="px-4 py-2 text-sm bg-[#ff004d] border-4 border-white text-white font-bold uppercase shadow-[3px_3px_0_white] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_white] transition-all"
                >
                  DAMAGE
                </button>
                <button 
                  onClick={() => setHealth(Math.min(100, health + 10))}
                  className="px-4 py-2 text-sm bg-[#00e436] border-4 border-white text-white font-bold uppercase shadow-[3px_3px_0_white] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_white] transition-all"
                >
                  HEAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tags & Badges */}
      <ShowcaseSection
        title="BADGES"
        subtitle="ACHIEVEMENTS"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border-4 border-[#1a1c2c] rounded-none shadow-[8px_8px_0_#1a1c2c]">
            {/* Tags */}
            <div className="mb-8">
              <p className="text-sm font-bold text-[#1a1c2c] uppercase mb-4">ITEM TAGS</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#ff004d] border-4 border-[#1a1c2c] text-white text-sm font-bold uppercase shadow-[2px_2px_0_#1a1c2c]">
                  RARE
                </span>
                <span className="px-4 py-2 bg-[#ffec27] border-4 border-[#1a1c2c] text-[#1a1c2c] text-sm font-bold uppercase shadow-[2px_2px_0_#1a1c2c]">
                  LEGENDARY
                </span>
                <span className="px-4 py-2 bg-[#29adff] border-4 border-[#1a1c2c] text-white text-sm font-bold uppercase shadow-[2px_2px_0_#1a1c2c]">
                  MAGIC
                </span>
                <span className="px-4 py-2 bg-[#00e436] border-4 border-[#1a1c2c] text-white text-sm font-bold uppercase shadow-[2px_2px_0_#1a1c2c]">
                  COMMON
                </span>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-sm font-bold text-[#1a1c2c] uppercase mb-4">ACHIEVEMENT BADGES</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="w-10 h-10 bg-[#ff004d] border-4 border-[#1a1c2c] flex items-center justify-center text-white font-bold shadow-[2px_2px_0_#1a1c2c]">
                  1
                </span>
                <span className="px-3 h-10 bg-[#ffec27] border-4 border-[#1a1c2c] flex items-center justify-center text-[#1a1c2c] font-bold uppercase text-sm shadow-[2px_2px_0_#1a1c2c]">
                  NEW!
                </span>
                <span className="px-3 h-10 bg-[#00e436] border-4 border-[#1a1c2c] flex items-center justify-center text-white font-bold uppercase text-sm shadow-[2px_2px_0_#1a1c2c]">
                  PRO
                </span>
                <span className="w-10 h-10 bg-white border-4 border-[#29adff] flex items-center justify-center text-[#29adff] font-bold">
                  99
                </span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle / Options */}
      <ShowcaseSection
        title="OPTIONS"
        subtitle="GAME SETTINGS"
        className="py-16 px-6 bg-[#0f0f1e]"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#1a1c2c] border-4 border-white rounded-none shadow-[8px_8px_0_#00e436]">
            <div className="space-y-4">
              {[
                { label: "SOUND FX", index: 0 },
                { label: "MUSIC", index: 1 },
                { label: "VIBRATION", index: 2 },
              ].map((item) => (
                <div key={item.index} className="flex items-center justify-between">
                  <span className="text-white font-bold uppercase">{item.label}</span>
                  <button
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[item.index] = !newStates[item.index];
                      setToggleStates(newStates);
                    }}
                    className={`relative w-16 h-8 border-4 border-white transition-all ${
                      toggleStates[item.index] ? 'bg-[#00e436]' : 'bg-[#ff004d]'
                    }`}
                  >
                    <span
                      className={`absolute top-0 w-6 h-6 bg-white transition-all ${
                        toggleStates[item.index] ? 'left-8' : 'left-0'
                      }`}
                    />
                    <span className={`absolute top-1 text-xs font-bold ${
                      toggleStates[item.index] ? 'left-1 text-white' : 'right-1 text-white'
                    }`}>
                      {toggleStates[item.index] ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion / Help */}
      <ShowcaseSection
        title="HELP"
        subtitle="FAQ"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {accordionItems.map((item, index) => (
              <div 
                key={index}
                className={`border-4 transition-all ${
                  openAccordion === index 
                    ? 'border-[#ffec27] shadow-[4px_4px_0_#ffec27]' 
                    : 'border-white shadow-[4px_4px_0_#1a1c2c]'
                } bg-[#1a1c2c]`}
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-bold text-[#ffec27] uppercase">{item.title}</span>
                  {openAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-[#ffec27]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 pb-4 text-[#29adff] text-sm uppercase">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Avatars */}
      <ShowcaseSection
        title="AVATARS"
        subtitle="PLAYER SELECT"
        className="py-16 px-6 bg-[#0f0f1e]"
        titleClassName="text-3xl font-bold uppercase tracking-wider text-[#ffec27] mb-4 text-center"
        subtitleClassName="text-[#29adff] mb-10 text-center uppercase text-sm"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#1a1c2c] border-4 border-white rounded-none shadow-[8px_8px_0_#ff004d]">
            <div className="flex flex-wrap items-end justify-center gap-6">
              {/* Small */}
              <div className="text-center">
                <div className="w-10 h-10 bg-[#ff004d] border-4 border-white flex items-center justify-center text-white font-bold text-sm mb-2">
                  P1
                </div>
                <span className="text-xs text-[#29adff] uppercase font-bold">SMALL</span>
              </div>
              {/* Medium */}
              <div className="text-center">
                <div className="w-14 h-14 bg-[#00e436] border-4 border-white flex items-center justify-center text-white font-bold text-lg mb-2">
                  P2
                </div>
                <span className="text-xs text-[#29adff] uppercase font-bold">MEDIUM</span>
              </div>
              {/* Large */}
              <div className="text-center">
                <div className="w-20 h-20 bg-[#29adff] border-4 border-white flex items-center justify-center text-white font-bold text-2xl mb-2">
                  P3
                </div>
                <span className="text-xs text-[#29adff] uppercase font-bold">LARGE</span>
              </div>
              {/* Group */}
              <div className="text-center">
                <div className="flex -space-x-2">
                  <div className="w-12 h-12 bg-[#ff004d] border-4 border-white flex items-center justify-center text-white font-bold">A</div>
                  <div className="w-12 h-12 bg-[#00e436] border-4 border-white flex items-center justify-center text-white font-bold">B</div>
                  <div className="w-12 h-12 bg-[#ffec27] border-4 border-white flex items-center justify-center text-[#1a1c2c] font-bold">+2</div>
                </div>
                <span className="text-xs text-[#29adff] uppercase font-bold mt-2 block">PARTY</span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-4 border-[#ff004d] bg-[#1a1c2c]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gamepad2 className="w-6 h-6 text-[#ff004d]" />
            <span className="text-xl font-bold text-[#ffec27] uppercase tracking-wider">PIXEL ART</span>
            <Gamepad2 className="w-6 h-6 text-[#ff004d]" />
          </div>
          <p className="text-[#29adff] text-sm uppercase font-bold mb-2">
            PART OF{" "}
            <Link href="/" className="text-[#ffec27] hover:text-white transition-colors">
              STYLEKIT
            </Link>
          </p>
          <p className="text-[#29adff]/60 text-xs uppercase font-bold">
            8-BIT RETRO GAMING AESTHETICS
          </p>
        </div>
      </footer>
    </div>
  );
}
