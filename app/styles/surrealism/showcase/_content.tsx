"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ChevronDown, Check, X, AlertTriangle, Info,
  Eye, Moon, Cloud, Sparkles, Clock, Zap
} from "lucide-react";
import {
  ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Midnight Blue", value: "#1a1a4e", textColor: "white" },
  { name: "Desert Gold", value: "#d4a843", textColor: "black" },
  { name: "Rose Blush", value: "#e8a0b4", textColor: "black" },
  { name: "Horizon White", value: "#f0ece2", textColor: "black" },
  { name: "Dream Teal", value: "#2a9d8f", textColor: "white" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(55);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Dreams", "Illusions", "Reality"];
  const accordionItems = [
    { title: "What is Surrealism?", content: "Surrealism is an artistic movement that sought to channel the unconscious mind as a means of unlocking the power of imagination. It juxtaposes unexpected elements to create dreamlike scenes." },
    { title: "Techniques", content: "Automatism, frottage, decalcomania, and juxtaposition of unrelated objects. Artists embraced chance, dreams, and the irrational as creative sources." },
    { title: "Legacy", content: "Surrealism continues to influence contemporary art, film, advertising, and digital design, encouraging us to look beyond the surface of reality." },
  ];

  return (
    <div className="min-h-screen bg-[#f0ece2]" style={{ fontFamily: "'Garamond', 'Georgia', serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f0ece2]/90 backdrop-blur-sm border-b border-[#1a1a4e]/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#1a1a4e] hover:text-[#d4a843] transition-colors"><ArrowLeft className="w-4 h-4" /><span className="text-sm">Awaken</span></Link>
          <span className="text-[#1a1a4e]/60 text-sm tracking-widest uppercase">Surrealism</span>
        </div>
      </nav>

      <ShowcaseHero title="Surrealism" subtitle="Beyond the visible, into the landscapes of the subconscious mind" className="relative pt-24 pb-20 px-6 text-center overflow-hidden" titleClassName="text-7xl md:text-9xl text-[#1a1a4e] mb-6 tracking-tight" subtitleClassName="text-lg text-[#e8a0b4] max-w-2xl mx-auto italic">
        <div className="absolute top-20 right-10 w-24 h-24 border-2 border-[#d4a843]/30 rounded-full animate-pulse" />
        <div className="absolute bottom-10 left-20 w-16 h-16 bg-[#e8a0b4]/20 rotate-45" />
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection title="Statistics" subtitle="Numbers from the dream" className="py-16 px-6" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Eye, label: "Visions", value: "3,421", bg: "bg-[#1a1a4e]" },
            { icon: Moon, label: "Dreams", value: "∞", bg: "bg-[#d4a843]" },
            { icon: Cloud, label: "Thoughts", value: "7.8K", bg: "bg-[#2a9d8f]" },
            { icon: Clock, label: "Moments", value: "24:00", bg: "bg-[#e8a0b4]" },
          ].map((stat, i) => (
            <div key={i} className="relative p-6 bg-white border border-[#1a1a4e]/10 hover:shadow-xl transition-all group" style={{ clipPath: i % 2 === 0 ? "polygon(0 5%, 100% 0, 100% 95%, 0 100%)" : "polygon(0 0, 100% 5%, 100% 100%, 0 95%)" }}>
              <div className={`w-10 h-10 ${stat.bg} rounded-full flex items-center justify-center mb-3`}><stat.icon className="w-5 h-5 text-white" /></div>
              <p className="text-3xl font-light text-[#1a1a4e]">{stat.value}</p>
              <p className="text-sm text-[#1a1a4e]/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color Palette" subtitle="Hues of the unconscious" className="py-16 px-6 bg-[#1a1a4e]/5" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection title="Typography" subtitle="Words that dissolve" className="py-16 px-6" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <div className="max-w-4xl mx-auto p-8 bg-white border border-[#1a1a4e]/10">
          <p className="text-6xl text-[#1a1a4e] mb-3" style={{ fontFamily: "'Georgia', serif" }}>The Persistence</p>
          <p className="text-3xl text-[#d4a843] italic mb-3">of Memory and Form</p>
          <p className="text-xl text-[#2a9d8f] mb-3">Melting clocks drip onto dreamscapes</p>
          <p className="text-base text-[#1a1a4e]/60">In the surrealist tradition, typography becomes a doorway into the unconscious. Letters warp, meanings shift, and the familiar becomes strange.</p>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection title="Buttons" subtitle="Portals to elsewhere" className="py-16 px-6 bg-[#1a1a4e]/5" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#1a1a4e] text-white hover:bg-[#d4a843] transition-colors">Enter Dream</button>
          <button className="px-8 py-3 bg-[#d4a843] text-[#1a1a4e] hover:bg-[#e8a0b4] transition-colors">Float</button>
          <button className="px-8 py-3 border-2 border-[#1a1a4e] text-[#1a1a4e] hover:bg-[#1a1a4e] hover:text-white transition-colors">Observe</button>
          <button className="px-8 py-3 bg-[#2a9d8f] text-white hover:bg-[#238b7e] transition-colors">Dissolve</button>
          <button className="px-8 py-3 bg-[#e8a0b4] text-[#1a1a4e] hover:bg-[#d48ea2] transition-colors">Imagine</button>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection title="Cards" subtitle="Windows into the surreal" className="py-16 px-6" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "The Dream", desc: "A landscape where elephants walk on stilts and clocks melt in the afternoon sun.", color: "#1a1a4e", accent: "#d4a843" },
            { title: "The Mirror", desc: "Reflection reveals not what is, but what could be in parallel dimensions.", color: "#2a9d8f", accent: "#e8a0b4" },
            { title: "The Void", desc: "Emptiness filled with infinite possibility, where thought becomes form.", color: "#d4a843", accent: "#1a1a4e" },
          ].map((card, i) => (
            <div key={i} className="relative p-6 bg-white border border-[#1a1a4e]/10 overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10" style={{ background: card.accent, clipPath: "circle(50% at 100% 0)" }} />
              <h3 className="text-xl font-light mb-3" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-[#1a1a4e]/60 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection title="Tabs" subtitle="Shifting perspectives" className="py-16 px-6 bg-[#1a1a4e]/5" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white border border-[#1a1a4e]/10">
          <div className="flex border-b border-[#1a1a4e]/10">
            {tabs.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className={`flex-1 py-4 text-sm tracking-wider uppercase transition-colors ${activeTab === i ? "bg-[#1a1a4e] text-white" : "text-[#1a1a4e]/50 hover:text-[#1a1a4e]"}`}>{tab}</button>
            ))}
          </div>
          <div className="p-6 min-h-[120px]">
            {activeTab === 0 && <div><h4 className="text-lg text-[#1a1a4e] mb-2">Dream States</h4><p className="text-[#1a1a4e]/60 text-sm italic">In the dream, time flows differently. Objects transform, gravity shifts, and the impossible becomes mundane.</p></div>}
            {activeTab === 1 && <div><h4 className="text-lg text-[#d4a843] mb-2">Optical Illusions</h4><p className="text-[#1a1a4e]/60 text-sm italic">What the eye sees is merely the surface. Look deeper, and reality unfolds into unexpected dimensions.</p></div>}
            {activeTab === 2 && <div><h4 className="text-lg text-[#2a9d8f] mb-2">Waking World</h4><p className="text-[#1a1a4e]/60 text-sm italic">Even in the mundane lies the extraordinary. Surrealism teaches us to see the marvelous in the everyday.</p></div>}
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection title="Accordion" subtitle="Layers of meaning" className="py-16 px-6" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-white border border-[#1a1a4e]/10 overflow-hidden">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#1a1a4e]/5 transition-colors">
                <span className="text-[#1a1a4e]">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#d4a843] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-5"><p className="text-[#1a1a4e]/60 text-sm italic leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection title="Alerts" subtitle="Messages from beyond" className="py-16 px-6 bg-[#1a1a4e]/5" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-4 p-4 bg-[#2a9d8f]/10 border-l-4 border-[#2a9d8f]"><Check className="w-5 h-5 text-[#2a9d8f]" /><div><p className="font-medium text-[#2a9d8f]">Lucid</p><p className="text-[#1a1a4e]/60 text-sm">You are awake within the dream.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#d4a843]/10 border-l-4 border-[#d4a843]"><AlertTriangle className="w-5 h-5 text-[#d4a843]" /><div><p className="font-medium text-[#d4a843]">Shifting</p><p className="text-[#1a1a4e]/60 text-sm">Reality is bending at the edges.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#e8a0b4]/10 border-l-4 border-[#e8a0b4]"><X className="w-5 h-5 text-[#e8a0b4]" /><div><p className="font-medium text-[#e8a0b4]">Dissolved</p><p className="text-[#1a1a4e]/60 text-sm">The boundary has vanished entirely.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#1a1a4e]/10 border-l-4 border-[#1a1a4e]"><Info className="w-5 h-5 text-[#1a1a4e]" /><div><p className="font-medium text-[#1a1a4e]">Whisper</p><p className="text-[#1a1a4e]/60 text-sm">The unconscious speaks in symbols.</p></div></div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection title="Toggle" subtitle="Between states" className="py-16 px-6" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white border border-[#1a1a4e]/10 p-6 space-y-4">
          {[{ label: "Dream Mode", desc: "Shift into subconscious view" },{ label: "Time Warp", desc: "Distort temporal perception" },{ label: "Gravity Off", desc: "Float freely in space" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#1a1a4e]/10 last:border-b-0">
              <div><p className="text-[#1a1a4e]">{item.label}</p><p className="text-sm text-[#1a1a4e]/40">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 rounded-full transition-colors ${toggleStates[i] ? "bg-[#1a1a4e]" : "bg-[#1a1a4e]/20"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection title="Progress" subtitle="Descent into dream" className="py-16 px-6 bg-[#1a1a4e]/5" titleClassName="text-3xl text-[#1a1a4e] mb-2 text-center" subtitleClassName="text-[#e8a0b4] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white border border-[#1a1a4e]/10 p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="text-[#1a1a4e]">Dream Depth</p><p className="text-sm text-[#d4a843]">{progress}%</p></div>
            <div className="h-2 bg-[#1a1a4e]/10 rounded-full"><div className="h-full bg-gradient-to-r from-[#1a1a4e] via-[#2a9d8f] to-[#d4a843] rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-2 border border-[#1a1a4e] text-[#1a1a4e] hover:bg-[#1a1a4e] hover:text-white transition-colors">Surface</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-2 bg-[#1a1a4e] text-white hover:bg-[#d4a843] hover:text-[#1a1a4e] transition-colors">Deeper</button>
          </div>
        </div>
      </ShowcaseSection>

      <footer className="py-12 px-6 text-center border-t border-[#1a1a4e]/10">
        <p className="text-[#1a1a4e]/40 text-sm italic">Surrealism - The eye of the unconscious sees the invisible</p>
      </footer>
    </div>
  );
}
