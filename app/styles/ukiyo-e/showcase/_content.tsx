"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ChevronDown, Check, X, AlertTriangle, Info,
  Waves, Mountain, TreePine, Flower2, Sun, Wind
} from "lucide-react";
import {
  ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Indigo", value: "#264653", textColor: "white" },
  { name: "Vermillion", value: "#c1440e", textColor: "white" },
  { name: "Gold Leaf", value: "#c9a227", textColor: "black" },
  { name: "Washi", value: "#f2e8d5", textColor: "black" },
  { name: "Sumi Ink", value: "#2c2c2c", textColor: "white" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(70);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Mountain", "Wave", "Bloom"];
  const accordionItems = [
    { title: "What is Ukiyo-e?", content: "Ukiyo-e, meaning 'pictures of the floating world,' is a genre of Japanese woodblock prints dating from the 17th through 19th centuries. It depicted landscapes, tales, kabuki actors, and beautiful women." },
    { title: "Woodblock Technique", content: "Artists carved designs into cherry wood blocks, applied ink, and pressed washi paper to create prints. Multiple blocks were used for different colors, requiring precise alignment." },
    { title: "Digital Revival", content: "Modern designers draw from Ukiyo-e flat color planes, bold outlines, and asymmetric composition to create stunning digital interfaces that honor this artistic tradition." },
  ];

  return (
    <div className="min-h-screen bg-[#f2e8d5]" style={{ fontFamily: "'Georgia', 'Noto Serif', serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f2e8d5]/90 backdrop-blur-sm border-b border-[#c1440e]/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#264653] hover:text-[#c1440e] transition-colors"><ArrowLeft className="w-4 h-4" /><span className="text-sm">Back</span></Link>
          <span className="text-[#c1440e] text-sm tracking-[0.3em]">UKIYO-E</span>
        </div>
      </nav>

      <ShowcaseHero title="浮世絵" subtitle="Pictures of the Floating World - where nature, beauty and impermanence converge" className="relative pt-28 pb-24 px-6 text-center overflow-hidden" titleClassName="text-8xl md:text-[10rem] text-[#264653] mb-6 leading-none" subtitleClassName="text-base text-[#c1440e] max-w-2xl mx-auto tracking-wider">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f2e8d5] to-transparent" />
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection title="Statistics" subtitle="Numerical harmony" className="py-16 px-6" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Waves, label: "Waves", value: "36", color: "#264653" },
            { icon: Mountain, label: "Views", value: "53", color: "#c1440e" },
            { icon: TreePine, label: "Seasons", value: "4", color: "#2c2c2c" },
            { icon: Flower2, label: "Blooms", value: "100", color: "#c9a227" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white/50 border-t-4 text-center" style={{ borderColor: stat.color }}>
              <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.color }} />
              <p className="text-4xl font-light" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm text-[#264653]/50 mt-1 tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color Palette" subtitle="Pigments of tradition" className="py-16 px-6 bg-[#264653]/5" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection title="Typography" subtitle="Brush and block" className="py-16 px-6" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <div className="max-w-4xl mx-auto p-8 bg-white/50 border-t-4 border-[#c1440e]">
          <p className="text-7xl text-[#264653] mb-3">The Great Wave</p>
          <p className="text-3xl text-[#c1440e] mb-3">off Kanagawa</p>
          <p className="text-xl text-[#c9a227] mb-3">Thirty-Six Views of Mount Fuji</p>
          <p className="text-base text-[#264653]/60 leading-relaxed">Ukiyo-e typography echoes the precision of woodblock carving, where each stroke is deliberate and carries the weight of tradition. The interplay of Japanese calligraphy and Western letterforms creates a uniquely modern homage.</p>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection title="Buttons" subtitle="Decisive actions" className="py-16 px-6 bg-[#264653]/5" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#264653] text-[#f2e8d5] tracking-wider hover:bg-[#c1440e] transition-colors">Indigo</button>
          <button className="px-8 py-3 bg-[#c1440e] text-white tracking-wider hover:bg-[#264653] transition-colors">Vermillion</button>
          <button className="px-8 py-3 border-2 border-[#264653] text-[#264653] tracking-wider hover:bg-[#264653] hover:text-white transition-colors">Outline</button>
          <button className="px-8 py-3 bg-[#c9a227] text-[#2c2c2c] tracking-wider hover:bg-[#b8911e] transition-colors">Gold</button>
          <button className="px-8 py-3 bg-[#2c2c2c] text-[#f2e8d5] tracking-wider hover:bg-[#264653] transition-colors">Sumi</button>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection title="Cards" subtitle="Floating world scenes" className="py-16 px-6" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Kanagawa", desc: "The towering wave rises, Fuji stands unmoved in the distance.", icon: Waves, color: "#264653" },
            { title: "Fuji", desc: "Thirty-six views capture the sacred mountain across seasons.", icon: Mountain, color: "#c1440e" },
            { title: "Sakura", desc: "Cherry blossoms fall, reminding us of beauty in impermanence.", icon: Flower2, color: "#c9a227" },
          ].map((card, i) => (
            <div key={i} className="p-6 bg-white/50 border-t-4 hover:shadow-lg transition-shadow" style={{ borderColor: card.color }}>
              <card.icon className="w-10 h-10 mb-4" style={{ color: card.color }} />
              <h3 className="text-xl font-light mb-2 tracking-wider" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-[#264653]/60 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection title="Tabs" subtitle="Three subjects" className="py-16 px-6 bg-[#264653]/5" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/50 border-t-4 border-[#264653]">
          <div className="flex border-b border-[#264653]/10">
            {tabs.map((tab, i) => (<button key={i} onClick={() => setActiveTab(i)} className={`flex-1 py-4 text-sm tracking-[0.2em] transition-colors ${activeTab === i ? "bg-[#264653] text-white" : "text-[#264653]/50 hover:text-[#264653]"}`}>{tab}</button>))}
          </div>
          <div className="p-6 min-h-[120px]">
            {activeTab === 0 && <div><h4 className="text-lg text-[#264653] mb-2 tracking-wider">Mount Fuji</h4><p className="text-[#264653]/60 text-sm">The sacred mountain appears across seasons and weather, each view revealing a different truth about nature and permanence.</p></div>}
            {activeTab === 1 && <div><h4 className="text-lg text-[#c1440e] mb-2 tracking-wider">The Great Wave</h4><p className="text-[#264653]/60 text-sm">Water moves with unstoppable force, curling and crashing in patterns that echo the rhythms of life itself.</p></div>}
            {activeTab === 2 && <div><h4 className="text-lg text-[#c9a227] mb-2 tracking-wider">Cherry Blossoms</h4><p className="text-[#264653]/60 text-sm">Fleeting beauty captured in woodblock prints, each petal a meditation on the impermanence of all things.</p></div>}
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection title="Accordion" subtitle="Folding screens" className="py-16 px-6" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-white/50 border-l-4 border-[#c1440e]">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left">
                <span className="text-[#264653] tracking-wider">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#c1440e] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-5"><p className="text-[#264653]/60 text-sm leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection title="Alerts" subtitle="Notices of the floating world" className="py-16 px-6 bg-[#264653]/5" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-4 p-4 bg-white/50 border-l-4 border-[#264653]"><Check className="w-5 h-5 text-[#264653]" /><div><p className="text-[#264653] tracking-wider">Harmony</p><p className="text-[#264653]/50 text-sm">All elements are in balance.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-white/50 border-l-4 border-[#c9a227]"><AlertTriangle className="w-5 h-5 text-[#c9a227]" /><div><p className="text-[#c9a227] tracking-wider">Caution</p><p className="text-[#264653]/50 text-sm">The current shifts beneath the surface.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-white/50 border-l-4 border-[#c1440e]"><X className="w-5 h-5 text-[#c1440e]" /><div><p className="text-[#c1440e] tracking-wider">Disruption</p><p className="text-[#264653]/50 text-sm">The balance has been disturbed.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-white/50 border-l-4 border-[#2c2c2c]"><Info className="w-5 h-5 text-[#2c2c2c]" /><div><p className="text-[#2c2c2c] tracking-wider">Wisdom</p><p className="text-[#264653]/50 text-sm">Knowledge from the masters.</p></div></div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection title="Toggle" subtitle="Ink states" className="py-16 px-6" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/50 border-t-4 border-[#264653] p-6 space-y-4">
          {[{ label: "Wave Pattern", desc: "Show flowing water motifs" },{ label: "Gold Leaf", desc: "Apply kinpaku accents" },{ label: "Sumi Lines", desc: "Display ink outlines" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#264653]/10 last:border-b-0">
              <div><p className="text-[#264653] tracking-wider">{item.label}</p><p className="text-sm text-[#264653]/40">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 rounded-sm transition-colors ${toggleStates[i] ? "bg-[#c1440e]" : "bg-[#264653]/20"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-[#f2e8d5] rounded-sm shadow transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection title="Progress" subtitle="Journey across views" className="py-16 px-6 bg-[#264653]/5" titleClassName="text-3xl text-[#264653] mb-2 text-center tracking-wider" subtitleClassName="text-[#c1440e] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/50 border-t-4 border-[#c1440e] p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="text-[#264653] tracking-wider">Views Completed</p><p className="text-sm text-[#c1440e]">{progress}%</p></div>
            <div className="h-2 bg-[#264653]/10"><div className="h-full bg-[#c1440e] transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-2 border border-[#264653] text-[#264653] tracking-wider hover:bg-[#264653] hover:text-white transition-colors">Previous</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-2 bg-[#c1440e] text-white tracking-wider hover:bg-[#264653] transition-colors">Next View</button>
          </div>
        </div>
      </ShowcaseSection>

      <footer className="py-12 px-6 text-center border-t border-[#264653]/10"><p className="text-[#264653]/40 text-sm tracking-[0.2em]">UKIYO-E DIGITAL - Pictures of the Floating World</p></footer>
    </div>
  );
}
