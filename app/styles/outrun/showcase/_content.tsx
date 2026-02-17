"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Check, X, AlertTriangle, Info, Zap, Sun, Music, Car, Palmtree, Radio } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sunset Pink", value: "#ff6ec7", textColor: "black" },
  { name: "Horizon Orange", value: "#ff8c42", textColor: "black" },
  { name: "Chrome Blue", value: "#00d4ff", textColor: "black" },
  { name: "Night Purple", value: "#2b1055", textColor: "white" },
  { name: "Grid Magenta", value: "#d63384", textColor: "white" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(75);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Drive", "Coast", "Night"];
  const accordionItems = [
    { title: "What is Outrun?", content: "Outrun is a retro-futuristic aesthetic inspired by 1980s culture. It features neon-soaked sunsets, chrome lettering, palm trees, and endless grid highways stretching to the horizon." },
    { title: "Visual Language", content: "Sunset gradients from warm pink to deep purple, wireframe grids, chrome reflections, tropical silhouettes, and CRT scan-line textures define the Outrun visual vocabulary." },
    { title: "Outrun vs Synthwave", content: "While Synthwave focuses on the musical experience, Outrun emphasizes the visual narrative of endless driving into a retro-futuristic sunset. Both share 80s nostalgia but differ in focus." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white" style={{ fontFamily: "'Arial', 'Helvetica', sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-sm border-b border-[#ff6ec7]/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#00d4ff] hover:text-[#ff6ec7] transition-colors"><ArrowLeft className="w-4 h-4" /><span className="text-sm font-bold tracking-wider uppercase">Back</span></Link>
          <span className="text-[#ff6ec7] text-sm font-bold tracking-[0.3em] uppercase">Outrun</span>
        </div>
      </nav>

      <ShowcaseHero title="OUTRUN" subtitle="Chasing the infinite sunset on a neon-lit highway to tomorrow" className="relative pt-28 pb-24 px-6 text-center overflow-hidden" titleClassName="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ff6ec7] via-[#ff8c42] to-[#d63384] mb-6 tracking-[0.1em] uppercase" subtitleClassName="text-base text-[#00d4ff] max-w-2xl mx-auto tracking-wider">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a1a] via-[#2b1055]/50 to-transparent" />
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection title="Statistics" subtitle="Dashboard readings" className="py-16 px-6" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Car, label: "Speed", value: "88 MPH", glow: "#ff6ec7" },
            { icon: Sun, label: "Sunset", value: "∞", glow: "#ff8c42" },
            { icon: Music, label: "Tracks", value: "256", glow: "#00d4ff" },
            { icon: Zap, label: "Power", value: "1.21GW", glow: "#d63384" },
          ].map((stat, i) => (
            <div key={i} className="p-5 bg-[#111128] border border-[#ff6ec7]/20 text-center relative overflow-hidden" style={{ boxShadow: `inset 0 0 20px ${stat.glow}15` }}>
              <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.glow }} />
              <p className="text-3xl font-black" style={{ color: stat.glow }}>{stat.value}</p>
              <p className="text-xs text-white/30 mt-1 tracking-[0.2em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color Palette" subtitle="Sunset spectrum" className="py-16 px-6 bg-[#111128]" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      <ShowcaseSection title="Typography" subtitle="Chrome letters" className="py-16 px-6" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <div className="max-w-4xl mx-auto p-8 bg-[#111128] border border-[#ff6ec7]/20">
          <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff6ec7] to-[#ff8c42] mb-3 uppercase tracking-wider">Endless Drive</p>
          <p className="text-3xl font-bold text-[#00d4ff] mb-3">Into the Digital Sunset</p>
          <p className="text-xl text-[#d63384] mb-3 italic">Where neon dreams never fade</p>
          <p className="text-base text-white/40 leading-relaxed">Outrun typography is bold, chrome-plated, and larger than life. Gradient fills mimic the setting sun, while geometric sans-serifs echo the digital precision of the 80s future that never was.</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Buttons" subtitle="Control panel" className="py-16 px-6 bg-[#111128]" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-[#ff6ec7] to-[#d63384] text-white font-bold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(255,110,199,0.5)] transition-shadow">Drive</button>
          <button className="px-8 py-3 bg-gradient-to-r from-[#ff8c42] to-[#ff6ec7] text-white font-bold tracking-wider uppercase hover:shadow-[0_0_20px_rgba(255,140,66,0.5)] transition-shadow">Cruise</button>
          <button className="px-8 py-3 border-2 border-[#00d4ff] text-[#00d4ff] font-bold tracking-wider uppercase hover:bg-[#00d4ff] hover:text-[#0a0a1a] transition-colors">Scan</button>
          <button className="px-8 py-3 bg-[#2b1055] text-[#ff6ec7] font-bold tracking-wider uppercase border border-[#ff6ec7]/30 hover:shadow-[0_0_20px_rgba(255,110,199,0.3)] transition-shadow">Night</button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cards" subtitle="Billboard panels" className="py-16 px-6" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Sunset Strip", desc: "The highway stretches ahead, bathed in pink and orange light.", color: "#ff6ec7", border: "#ff6ec7" },
            { title: "Chrome City", desc: "Neon signs reflect off rain-slicked streets in electric blue.", color: "#00d4ff", border: "#00d4ff" },
            { title: "Palm Drive", desc: "Silhouetted palms line the boulevard against a purple sky.", color: "#d63384", border: "#d63384" },
          ].map((card, i) => (
            <div key={i} className="p-6 bg-[#111128] border hover:shadow-lg transition-all" style={{ borderColor: `${card.border}30`, boxShadow: `inset 0 1px 0 ${card.border}40` }}>
              <h3 className="text-xl font-bold mb-3 tracking-wider uppercase" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs" subtitle="Radio stations" className="py-16 px-6 bg-[#111128]" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#0a0a1a] border border-[#ff6ec7]/20">
          <div className="flex border-b border-[#ff6ec7]/20">
            {tabs.map((tab, i) => (<button key={i} onClick={() => setActiveTab(i)} className={`flex-1 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all ${activeTab === i ? "bg-gradient-to-b from-[#ff6ec7]/20 to-transparent text-[#ff6ec7] shadow-[0_-2px_0_#ff6ec7_inset]" : "text-white/30 hover:text-white/50"}`}>{tab}</button>))}
          </div>
          <div className="p-6 min-h-[120px]">
            {activeTab === 0 && <div><h4 className="text-lg font-bold text-[#ff6ec7] mb-2 tracking-wider uppercase">Night Drive</h4><p className="text-white/40 text-sm">Pedal to the metal, neon lights blur past. The synth bass drops and you are one with the machine.</p></div>}
            {activeTab === 1 && <div><h4 className="text-lg font-bold text-[#ff8c42] mb-2 tracking-wider uppercase">Coastal Highway</h4><p className="text-white/40 text-sm">Palm-lined boulevards stretch endlessly. The sun hangs low, painting everything in warm amber and pink.</p></div>}
            {activeTab === 2 && <div><h4 className="text-lg font-bold text-[#00d4ff] mb-2 tracking-wider uppercase">Midnight City</h4><p className="text-white/40 text-sm">The city glows electric. Rain-slicked streets mirror a thousand neon signs in the darkness.</p></div>}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion" subtitle="Cassette deck" className="py-16 px-6" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-[#111128] border border-[#ff6ec7]/20">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#ff6ec7]/5 transition-colors">
                <span className="text-white font-bold tracking-wider">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#ff6ec7] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-5"><p className="text-white/40 text-sm leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alerts" subtitle="Dashboard warnings" className="py-16 px-6 bg-[#111128]" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-4 p-4 bg-[#0a0a1a] border-l-4 border-[#00d4ff]"><Check className="w-5 h-5 text-[#00d4ff]" /><div><p className="font-bold text-[#00d4ff] tracking-wider uppercase text-sm">System Online</p><p className="text-white/30 text-sm">All circuits operational.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#0a0a1a] border-l-4 border-[#ff8c42]"><AlertTriangle className="w-5 h-5 text-[#ff8c42]" /><div><p className="font-bold text-[#ff8c42] tracking-wider uppercase text-sm">Fuel Low</p><p className="text-white/30 text-sm">Find a station before sunset.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#0a0a1a] border-l-4 border-[#ff6ec7]"><X className="w-5 h-5 text-[#ff6ec7]" /><div><p className="font-bold text-[#ff6ec7] tracking-wider uppercase text-sm">Engine Overheat</p><p className="text-white/30 text-sm">Critical system failure detected.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#0a0a1a] border-l-4 border-[#d63384]"><Info className="w-5 h-5 text-[#d63384]" /><div><p className="font-bold text-[#d63384] tracking-wider uppercase text-sm">Destination</p><p className="text-white/30 text-sm">247 miles to the horizon.</p></div></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toggle" subtitle="Switch panel" className="py-16 px-6" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#111128] border border-[#ff6ec7]/20 p-6 space-y-4">
          {[{ label: "Turbo Boost", desc: "Activate overdrive" },{ label: "Neon Lights", desc: "Underglow system" },{ label: "Auto Pilot", desc: "Cruise control" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#ff6ec7]/10 last:border-b-0">
              <div><p className="text-white font-bold tracking-wider">{item.label}</p><p className="text-sm text-white/30">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 rounded-full transition-all ${toggleStates[i] ? "bg-[#ff6ec7] shadow-[0_0_12px_rgba(255,110,199,0.5)]" : "bg-[#333]"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Progress" subtitle="Speedometer" className="py-16 px-6 bg-[#111128]" titleClassName="text-3xl font-black text-[#ff6ec7] mb-2 text-center tracking-wider uppercase" subtitleClassName="text-[#00d4ff]/60 mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#0a0a1a] border border-[#ff6ec7]/20 p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="text-white font-bold tracking-wider">Distance Traveled</p><p className="text-sm text-[#ff6ec7]">{progress}%</p></div>
            <div className="h-3 bg-[#222] rounded-full"><div className="h-full bg-gradient-to-r from-[#ff8c42] via-[#ff6ec7] to-[#d63384] rounded-full transition-all shadow-[0_0_10px_rgba(255,110,199,0.4)]" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-2 border border-[#00d4ff] text-[#00d4ff] font-bold tracking-wider uppercase text-xs hover:bg-[#00d4ff] hover:text-[#0a0a1a] transition-colors">Brake</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-2 bg-gradient-to-r from-[#ff6ec7] to-[#d63384] text-white font-bold tracking-wider uppercase text-xs hover:shadow-[0_0_20px_rgba(255,110,199,0.5)] transition-shadow">Accelerate</button>
          </div>
        </div>
      </ShowcaseSection>

      <footer className="py-12 px-6 text-center border-t border-[#ff6ec7]/10"><p className="text-white/20 text-sm tracking-[0.3em] uppercase">Outrun - Chase the sunset forever</p></footer>
    </div>
  );
}
