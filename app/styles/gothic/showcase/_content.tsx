"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Check, X, AlertTriangle, Info, Shield, Skull, Cross, Crown, Flame, Sword } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Obsidian", value: "#1a1a1a", textColor: "white" },
  { name: "Blood Red", value: "#8b0000", textColor: "white" },
  { name: "Royal Purple", value: "#4a0e4e", textColor: "white" },
  { name: "Antique Gold", value: "#b8860b", textColor: "black" },
  { name: "Stone Gray", value: "#4a4a4a", textColor: "white" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(66);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Cathedral", "Crypt", "Tower"];
  const accordionItems = [
    { title: "Gothic Architecture", content: "Pointed arches, ribbed vaults, and flying buttresses define Gothic architecture. These innovations allowed for taller structures with vast stained glass windows that flooded interiors with colored light." },
    { title: "Illuminated Manuscripts", content: "Medieval scribes created elaborate decorated texts with gold leaf, intricate borders, and detailed miniature paintings that preserved knowledge through the Dark Ages." },
    { title: "Gothic Revival", content: "The 19th century saw a revival of Gothic aesthetics in architecture, literature, and art, emphasizing mystery, grandeur, and the sublime power of darkness." },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#d4c5a9]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#8b0000]/30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#d4c5a9]/60 hover:text-[#b8860b] transition-colors"><ArrowLeft className="w-4 h-4" /><span className="text-sm tracking-widest uppercase">Return</span></Link>
          <span className="text-[#8b0000] text-sm tracking-[0.4em] uppercase">Gothic</span>
        </div>
      </nav>

      <ShowcaseHero title="GOTHIC" subtitle="In the shadow of the cathedral, darkness reveals the sublime" className="relative pt-28 pb-24 px-6 text-center" titleClassName="text-7xl md:text-9xl text-[#8b0000] mb-6 tracking-[0.2em] uppercase" subtitleClassName="text-base text-[#d4c5a9]/60 max-w-2xl mx-auto italic tracking-wider">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-[#8b0000] to-transparent" />
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection title="Statistics" subtitle="Sacred numbers" className="py-16 px-6" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, label: "Centuries", value: "XIII", color: "#8b0000" },
            { icon: Crown, label: "Kingdoms", value: "VII", color: "#b8860b" },
            { icon: Flame, label: "Candles", value: "MCCX", color: "#4a0e4e" },
            { icon: Sword, label: "Knights", value: "XLII", color: "#4a4a4a" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-[#222] border border-[#8b0000]/20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8860b]/50 to-transparent" />
              <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.color }} />
              <p className="text-3xl tracking-widest" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-[#d4c5a9]/40 mt-2 tracking-[0.3em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color Palette" subtitle="Hues of the dark ages" className="py-16 px-6 bg-[#111]" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      <ShowcaseSection title="Typography" subtitle="Ancient letterforms" className="py-16 px-6" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <div className="max-w-4xl mx-auto p-8 bg-[#222] border border-[#8b0000]/20">
          <p className="text-6xl text-[#8b0000] mb-3 tracking-wider uppercase">Memento Mori</p>
          <p className="text-3xl text-[#b8860b] italic mb-3">Remember you must die</p>
          <p className="text-xl text-[#4a0e4e] mb-3 tracking-wider">Through darkness, we find the light</p>
          <p className="text-base text-[#d4c5a9]/50 leading-relaxed">Gothic typography draws from medieval manuscripts and stone carvings, where each letter was a work of sacred art meant to endure the ages.</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Buttons" subtitle="Actions of power" className="py-16 px-6 bg-[#111]" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#8b0000] text-[#d4c5a9] tracking-[0.2em] uppercase text-sm hover:bg-[#a00000] transition-colors">Blood</button>
          <button className="px-8 py-3 bg-[#b8860b] text-[#1a1a1a] tracking-[0.2em] uppercase text-sm hover:bg-[#d4a017] transition-colors">Gold</button>
          <button className="px-8 py-3 border border-[#8b0000] text-[#8b0000] tracking-[0.2em] uppercase text-sm hover:bg-[#8b0000] hover:text-[#d4c5a9] transition-colors">Outline</button>
          <button className="px-8 py-3 bg-[#4a0e4e] text-[#d4c5a9] tracking-[0.2em] uppercase text-sm hover:bg-[#5a1e5e] transition-colors">Shadow</button>
          <button className="px-8 py-3 bg-[#333] text-[#d4c5a9]/40 tracking-[0.2em] uppercase text-sm cursor-not-allowed">Sealed</button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cards" subtitle="Triptych panels" className="py-16 px-6" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "The Nave", desc: "Where pilgrims gather beneath vaulted heavens of stone and shadow.", color: "#8b0000" },
            { title: "The Rose", desc: "Stained glass radiates divine light through geometric perfection.", color: "#4a0e4e" },
            { title: "The Cloister", desc: "Silent corridors where contemplation echoes against ancient walls.", color: "#b8860b" },
          ].map((card, i) => (
            <div key={i} className="p-6 bg-[#222] border border-[#8b0000]/20 hover:border-[#b8860b]/40 transition-colors relative">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: card.color }} />
              <h3 className="text-xl mb-3 tracking-[0.2em] uppercase" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-[#d4c5a9]/50 text-sm leading-relaxed italic">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs" subtitle="Sacred chambers" className="py-16 px-6 bg-[#111]" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <div className="max-w-3xl mx-auto bg-[#222] border border-[#8b0000]/20">
          <div className="flex border-b border-[#8b0000]/20">
            {tabs.map((tab, i) => (<button key={i} onClick={() => setActiveTab(i)} className={`flex-1 py-4 text-xs tracking-[0.3em] uppercase transition-colors ${activeTab === i ? "bg-[#8b0000] text-[#d4c5a9]" : "text-[#d4c5a9]/30 hover:text-[#d4c5a9]/60"}`}>{tab}</button>))}
          </div>
          <div className="p-6 min-h-[120px]">
            {activeTab === 0 && <div><h4 className="text-lg text-[#b8860b] mb-2 tracking-wider uppercase">The Great Cathedral</h4><p className="text-[#d4c5a9]/50 text-sm italic">Soaring vaults reach toward heaven, where light and stone join in sacred geometry.</p></div>}
            {activeTab === 1 && <div><h4 className="text-lg text-[#8b0000] mb-2 tracking-wider uppercase">The Hidden Crypt</h4><p className="text-[#d4c5a9]/50 text-sm italic">Below the surface, ancient secrets rest in shadow, guarded by silence and stone.</p></div>}
            {activeTab === 2 && <div><h4 className="text-lg text-[#4a0e4e] mb-2 tracking-wider uppercase">The Watchtower</h4><p className="text-[#d4c5a9]/50 text-sm italic">From the highest point, gargoyles gaze across the city, eternal sentinels of the dark.</p></div>}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion" subtitle="Scrolls of knowledge" className="py-16 px-6" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-[#222] border border-[#8b0000]/20">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#2a2a2a] transition-colors">
                <span className="text-[#d4c5a9] tracking-wider">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#8b0000] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-5"><p className="text-[#d4c5a9]/50 text-sm italic leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alerts" subtitle="Proclamations" className="py-16 px-6 bg-[#111]" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-4 p-4 bg-[#222] border-l-4 border-[#b8860b]"><Check className="w-5 h-5 text-[#b8860b]" /><div><p className="text-[#b8860b] tracking-wider uppercase text-sm">Blessed</p><p className="text-[#d4c5a9]/40 text-sm italic">The ritual has been completed.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#222] border-l-4 border-[#b8860b]/50"><AlertTriangle className="w-5 h-5 text-[#b8860b]/60" /><div><p className="text-[#b8860b]/80 tracking-wider uppercase text-sm">Warning</p><p className="text-[#d4c5a9]/40 text-sm italic">Dark forces stir in the shadows.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#222] border-l-4 border-[#8b0000]"><X className="w-5 h-5 text-[#8b0000]" /><div><p className="text-[#8b0000] tracking-wider uppercase text-sm">Cursed</p><p className="text-[#d4c5a9]/40 text-sm italic">Something has gone terribly wrong.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#222] border-l-4 border-[#4a0e4e]"><Info className="w-5 h-5 text-[#4a0e4e]" /><div><p className="text-[#4a0e4e] tracking-wider uppercase text-sm">Prophecy</p><p className="text-[#d4c5a9]/40 text-sm italic">Ancient texts reveal a hidden truth.</p></div></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toggle" subtitle="Dark switches" className="py-16 px-6" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <div className="max-w-3xl mx-auto bg-[#222] border border-[#8b0000]/20 p-6 space-y-4">
          {[{ label: "Candlelight", desc: "Illuminate the darkness" },{ label: "Gargoyles", desc: "Awaken the guardians" },{ label: "Incantation", desc: "Speak the ancient words" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#8b0000]/10 last:border-b-0">
              <div><p className="text-[#d4c5a9] tracking-wider">{item.label}</p><p className="text-sm text-[#d4c5a9]/30">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 transition-colors ${toggleStates[i] ? "bg-[#8b0000]" : "bg-[#333]"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-[#d4c5a9] shadow transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Progress" subtitle="The descent" className="py-16 px-6 bg-[#111]" titleClassName="text-3xl text-[#b8860b] mb-2 text-center tracking-[0.2em] uppercase" subtitleClassName="text-[#d4c5a9]/40 mb-10 text-center italic">
        <div className="max-w-3xl mx-auto bg-[#222] border border-[#8b0000]/20 p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="text-[#d4c5a9] tracking-wider">Ritual Progress</p><p className="text-sm text-[#8b0000]">{progress}%</p></div>
            <div className="h-2 bg-[#333]"><div className="h-full bg-gradient-to-r from-[#4a0e4e] to-[#8b0000] transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-2 border border-[#8b0000] text-[#8b0000] tracking-[0.2em] uppercase text-xs hover:bg-[#8b0000] hover:text-[#d4c5a9] transition-colors">Retreat</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-2 bg-[#8b0000] text-[#d4c5a9] tracking-[0.2em] uppercase text-xs hover:bg-[#a00000] transition-colors">Descend</button>
          </div>
        </div>
      </ShowcaseSection>

      <footer className="py-12 px-6 text-center border-t border-[#8b0000]/20"><p className="text-[#d4c5a9]/30 text-sm tracking-[0.3em] uppercase italic">Gothic - In tenebris lux</p></footer>
    </div>
  );
}
