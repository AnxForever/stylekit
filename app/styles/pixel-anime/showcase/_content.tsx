"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Gamepad2, Heart, Zap, ChevronDown, ChevronUp, Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Star } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { name: "Pixel Pink", value: "#ff6b9d", description: "Primary" },
    { name: "Retro Cyan", value: "#4ecdc4", description: "Secondary" },
    { name: "Game Yellow", value: "#ffe66d", description: "Accent" },
    { name: "Mint Green", value: "#a8e6cf", description: "Highlight" },
    { name: "Console Gray", value: "#2d2d2d", description: "Background" },
  ];

  const tabs = ["Game", "Anime", "Retro"];
  const accordionItems = [
    { title: "What is Pixel Anime?", content: "A nostalgic fusion of 8-bit pixel art and anime aesthetics, bringing together retro gaming vibes with kawaii character designs in a vibrant, pixelated art style." },
    { title: "Visual Style", content: "Features pixelated graphics, limited color palettes, grid-based layouts, retro game UI elements, and chibi anime character proportions that evoke classic arcade and console games." },
    { title: "Best For", content: "Indie games, retro gaming communities, pixel art portfolios, anime fan sites, nostalgic apps, and projects celebrating 80s-90s gaming culture with anime influences." },
  ];

  return (
    <div className="min-h-screen bg-[#2d2d2d] text-white" style={{ fontFamily: '"Press Start 2P", "Courier New", monospace', imageRendering: 'pixelated' }}>
      <header className="border-b-4 border-[#ff6b9d] bg-black sticky top-0 z-50" style={{ boxShadow: '0 4px 0 #4ecdc4' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-[#4ecdc4] hover:text-[#ffe66d] transition-colors group text-sm">
            <ArrowLeft className="w-4 h-4" style={{ imageRendering: 'pixelated' }} />
            <span>BACK</span>
          </Link>
          <div className="flex gap-3">
            <Gamepad2 className="w-5 h-5 text-[#ff6b9d] animate-bounce" />
            <Heart className="w-5 h-5 text-[#a8e6cf] animate-pulse" fill="currentColor" />
          </div>
        </div>
      </header>

      <ShowcaseHero
        title="PIXEL ANIME"
        subtitle="8-BIT KAWAII STYLE"
        description="Nostalgic pixel art meets cute anime characters in a retro gaming aesthetic"
        className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#2d2d2d] to-black"
        titleClassName="text-4xl md:text-5xl font-black mb-6 text-[#ff6b9d] tracking-wider"
        subtitleClassName="text-lg text-[#4ecdc4] mb-8 tracking-wider"
        descriptionClassName="text-base text-gray-400 leading-relaxed max-w-2xl mx-auto"
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ff6b9d 2px, #ff6b9d 4px)', imageRendering: 'pixelated' }} />
      </ShowcaseHero>

      <ShowcaseSection title="STATS" subtitle="Game metrics" className="py-16 px-6" titleClassName="text-3xl font-black text-[#ffe66d] mb-3 text-center" subtitleClassName="text-[#4ecdc4] mb-10 text-center text-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "PLAYERS", value: "8.5K", bg: "#ff6b9d" },
            { icon: TrendingUp, label: "SCORE", value: "+92%", bg: "#4ecdc4" },
            { icon: Eye, label: "VIEWS", value: "420K", bg: "#ffe66d" },
            { icon: Star, label: "STARS", value: "999", bg: "#a8e6cf" },
          ].map((stat, i) => (
            <div key={i} className="p-4 bg-black border-4 hover:translate-y-[-4px] transition-all" style={{ borderColor: stat.bg, boxShadow: `4px 4px 0 ${stat.bg}` }}>
              <stat.icon className="w-8 h-8 mb-3" style={{ color: stat.bg }} />
              <p className="text-2xl font-black mb-1" style={{ color: stat.bg }}>{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="COLORS" subtitle="Pixel palette" className="py-16 px-6 bg-black" titleClassName="text-3xl font-black text-[#4ecdc4] mb-3 text-center" subtitleClassName="text-[#ff6b9d] mb-10 text-center text-sm">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      <ShowcaseSection title="TEXT" subtitle="Retro fonts" className="py-16 px-6" titleClassName="text-3xl font-black text-[#a8e6cf] mb-3 text-center" subtitleClassName="text-[#ffe66d] mb-10 text-center text-sm">
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { text: "PIXEL", size: "text-5xl", color: "#ff6b9d" },
            { text: "GAME START!", size: "text-3xl", color: "#4ecdc4" },
            { text: "Press any button", size: "text-lg", color: "#ffe66d" },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-black border-4 border-white" style={{ boxShadow: '8px 8px 0 rgba(255,107,157,0.5)' }}>
              <p className={`${item.size} font-black text-center`} style={{ color: item.color }}>{item.text}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="BUTTONS" subtitle="Press start" className="py-16 px-6 bg-black" titleClassName="text-3xl font-black text-[#ffe66d] mb-3 text-center" subtitleClassName="text-[#ff6b9d] mb-10 text-center text-sm">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          {[
            { label: "START", bg: "#ff6b9d", shadow: "#c91f5a" },
            { label: "SELECT", bg: "#4ecdc4", shadow: "#2a9d8f" },
            { label: "A BUTTON", bg: "#ffe66d", shadow: "#d4a500" },
            { label: "B BUTTON", bg: "#a8e6cf", shadow: "#6fbf8f" },
          ].map((btn, i) => (
            <button key={i} className="px-6 py-3 font-black border-4 border-black hover:translate-y-[-4px] active:translate-y-[2px] transition-all text-sm" style={{ backgroundColor: btn.bg, boxShadow: `0 4px 0 ${btn.shadow}` }}>
              {btn.label}
            </button>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="CARDS" subtitle="Item cards" className="py-16 px-6" titleClassName="text-3xl font-black text-[#ff6b9d] mb-3 text-center" subtitleClassName="text-[#4ecdc4] mb-10 text-center text-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "HP POTION", desc: "Restore 50 HP", color: "#ff6b9d" },
            { title: "MANA STAR", desc: "Restore 30 MP", color: "#4ecdc4" },
            { title: "GOLD COIN", desc: "Worth 100G", color: "#ffe66d" },
          ].map((card, i) => (
            <div key={i} className="p-6 bg-black border-4 hover:scale-105 transition-all" style={{ borderColor: card.color, boxShadow: `6px 6px 0 ${card.color}` }}>
              <h3 className="text-xl font-black mb-3" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="TABS" subtitle="Menu system" className="py-16 px-6 bg-black" titleClassName="text-3xl font-black text-[#4ecdc4] mb-3 text-center" subtitleClassName="text-[#a8e6cf] mb-10 text-center text-sm">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#2d2d2d] border-4 border-white">
            <div className="flex border-b-4 border-white">
              {tabs.map((tab, i) => (
                <button key={i} onClick={() => setActiveTab(i)} className={`flex-1 px-4 py-3 font-black text-sm border-r-4 last:border-r-0 border-white transition-all ${activeTab === i ? 'bg-[#ff6b9d] text-white' : 'bg-black text-gray-400 hover:bg-[#3d3d3d]'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 min-h-[140px]">
              {activeTab === 0 && <div><h4 className="text-xl font-black text-[#ffe66d] mb-3">GAME MODE</h4><p className="text-gray-400 text-sm">Classic arcade gameplay</p></div>}
              {activeTab === 1 && <div><h4 className="text-xl font-black text-[#4ecdc4] mb-3">ANIME STYLE</h4><p className="text-gray-400 text-sm">Kawaii character designs</p></div>}
              {activeTab === 2 && <div><h4 className="text-xl font-black text-[#a8e6cf] mb-3">RETRO VIBE</h4><p className="text-gray-400 text-sm">8-bit nostalgia feels</p></div>}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="ACCORDION" subtitle="Quest log" className="py-16 px-6" titleClassName="text-3xl font-black text-[#a8e6cf] mb-3 text-center" subtitleClassName="text-[#ffe66d] mb-10 text-center text-sm">
        <div className="max-w-3xl mx-auto space-y-0">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-black border-4 border-white border-b-0 last:border-b-4">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#3d3d3d] transition-colors">
                <span className="font-black text-[#ff6b9d] text-sm">{item.title}</span>
                {openAccordion === i ? <ChevronUp className="w-5 h-5 text-[#4ecdc4]" /> : <ChevronDown className="w-5 h-5 text-[#4ecdc4]" />}
              </button>
              {openAccordion === i && <div className="px-6 pb-4 border-t-4 border-white/20"><p className="text-gray-400 text-sm leading-relaxed mt-3">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="ALERTS" subtitle="Messages" className="py-16 px-6 bg-black" titleClassName="text-3xl font-black text-[#ffe66d] mb-3 text-center" subtitleClassName="text-[#ff6b9d] mb-10 text-center text-sm">
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { icon: Check, label: "SUCCESS", desc: "Level up! +50 EXP", color: "#a8e6cf" },
            { icon: AlertTriangle, label: "WARNING", desc: "Low HP! Find potion!", color: "#ffe66d" },
            { icon: X, label: "ERROR", desc: "Game over! Continue?", color: "#ff6b9d" },
            { icon: Info, label: "INFO", desc: "New quest available!", color: "#4ecdc4" },
          ].map((alert, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-black border-4 border-l-8" style={{ borderColor: alert.color }}>
              <alert.icon className="w-6 h-6" style={{ color: alert.color }} />
              <div>
                <p className="font-black text-sm" style={{ color: alert.color }}>{alert.label}</p>
                <p className="text-gray-400 text-xs">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="TOGGLE" subtitle="Options" className="py-16 px-6" titleClassName="text-3xl font-black text-[#ff6b9d] mb-3 text-center" subtitleClassName="text-[#4ecdc4] mb-10 text-center text-sm">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-black border-4 border-white space-y-4">
            {[
              { label: "SOUND FX", desc: "Game sound effects", color: "#ff6b9d" },
              { label: "MUSIC", desc: "Background music", color: "#4ecdc4" },
              { label: "VIBRATE", desc: "Controller rumble", color: "#ffe66d" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b-4 border-white/20 last:border-b-0">
                <div>
                  <p className="font-black text-sm" style={{ color: item.color }}>{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <button onClick={() => { const newStates = [...toggleStates]; newStates[i] = !newStates[i]; setToggleStates(newStates); }} className="relative w-14 h-7 border-4 border-white transition-all" style={{ backgroundColor: toggleStates[i] ? item.color : '#000' }}>
                  <span className="absolute top-[-2px] w-5 h-5 bg-white border-2 border-black transition-all" style={{ left: toggleStates[i] ? 'calc(100% - 22px)' : '0px' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="PROGRESS" subtitle="Loading" className="py-16 px-6 bg-black" titleClassName="text-3xl font-black text-[#4ecdc4] mb-3 text-center" subtitleClassName="text-[#a8e6cf] mb-10 text-center text-sm">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-[#2d2d2d] border-4 border-white space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-black text-[#ff6b9d] text-sm">LOADING...</p>
                <p className="text-sm font-black text-[#ffe66d]">{progress}%</p>
              </div>
              <div className="h-6 bg-black border-4 border-white">
                <div className="h-full bg-[#ff6b9d] transition-all duration-500" style={{ width: `${progress}%`, boxShadow: 'inset 0 0 0 2px #c91f5a' }} />
              </div>
            </div>
            <div>
              <p className="font-black text-[#4ecdc4] text-sm mb-2">LEVELS</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((val, i) => (
                  <div key={i}>
                    <div className="h-4 bg-black border-2 border-white">
                      <div className="h-full transition-all" style={{ width: `${val}%`, backgroundColor: val === 100 ? '#a8e6cf' : val > 0 ? '#ffe66d' : 'transparent' }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">LV{i + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t-4 border-white/20">
              <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-5 py-2 bg-black border-4 border-white text-white font-black text-sm hover:bg-[#3d3d3d] transition-all">-10%</button>
              <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-5 py-2 bg-[#ff6b9d] border-4 border-[#c91f5a] text-white font-black text-sm hover:bg-[#ff5189] transition-all">+10%</button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <footer className="border-t-4 border-white py-10 px-6 text-center bg-black">
        <p className="text-gray-500 text-xs">PIXEL ANIME © 2026 - PRESS START TO CONTINUE</p>
      </footer>
    </div>
  );
}
