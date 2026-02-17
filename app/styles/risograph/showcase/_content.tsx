"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Check, X, AlertTriangle, Info, Printer, Layers, Circle, Square, Triangle, Hexagon } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Fluorescent Pink", value: "#ff517c", textColor: "white" },
  { name: "Blue", value: "#0078bf", textColor: "white" },
  { name: "Yellow", value: "#ffe14f", textColor: "black" },
  { name: "Teal", value: "#00827f", textColor: "white" },
  { name: "Cream Paper", value: "#f5f0e1", textColor: "black" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Layer A", "Layer B", "Overprint"];
  const accordionItems = [
    { title: "What is Risograph?", content: "Risograph is a stencil-based printing method from Japan using soy-based inks. Each color requires a separate pass through the machine, creating unique overprint effects and slight misregistrations." },
    { title: "Print Characteristics", content: "Grainy textures, halftone dot patterns, vibrant fluorescent inks, slight color misalignment, and beautiful overprint areas where two colors overlap to create a third." },
    { title: "Digital Translation", content: "In digital design, Risograph aesthetics are recreated through noise textures, limited color palettes, halftone overlays, and the charming imperfection of analog-inspired graphics." },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e1]" style={{ fontFamily: "'Courier New', 'Courier', monospace" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e1]/90 backdrop-blur-sm border-b-2 border-[#ff517c]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#0078bf] hover:text-[#ff517c] transition-colors"><ArrowLeft className="w-4 h-4" /><span className="text-sm font-bold uppercase tracking-wider">Back</span></Link>
          <span className="text-[#ff517c] text-sm font-bold tracking-[0.3em] uppercase">Risograph</span>
        </div>
      </nav>

      <ShowcaseHero title="RISO" subtitle="Two colors. One machine. Infinite possibilities through beautiful overprint" className="relative pt-28 pb-24 px-6 text-center" titleClassName="text-8xl md:text-[12rem] font-bold text-[#ff517c] mb-6 tracking-tighter leading-none" subtitleClassName="text-base text-[#0078bf] max-w-2xl mx-auto font-bold tracking-wider uppercase">
        <div className="absolute top-24 right-[15%] w-32 h-32 bg-[#0078bf] rounded-full opacity-40 mix-blend-multiply" />
        <div className="absolute top-28 right-[12%] w-32 h-32 bg-[#ff517c] rounded-full opacity-40 mix-blend-multiply" />
      </ShowcaseHero>

      <ShowcaseSection title="Statistics" subtitle="Print run data" className="py-16 px-6" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Printer, label: "Prints", value: "2,400", color: "#ff517c", bg: "bg-[#ff517c]/10" },
            { icon: Layers, label: "Layers", value: "2", color: "#0078bf", bg: "bg-[#0078bf]/10" },
            { icon: Circle, label: "DPI", value: "600", color: "#00827f", bg: "bg-[#00827f]/10" },
            { icon: Hexagon, label: "Colors", value: "5", color: "#ffe14f", bg: "bg-[#ffe14f]/20" },
          ].map((stat, i) => (
            <div key={i} className={`p-5 ${stat.bg} border-2 text-center`} style={{ borderColor: stat.color }}>
              <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.color }} />
              <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs text-[#333]/40 mt-1 font-bold tracking-[0.2em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color Palette" subtitle="Ink drums" className="py-16 px-6 bg-[#0078bf]/5" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      <ShowcaseSection title="Typography" subtitle="Stencil type" className="py-16 px-6" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <div className="max-w-4xl mx-auto p-8 bg-white/50 border-2 border-[#ff517c]">
          <p className="text-6xl font-bold text-[#ff517c] mb-3 tracking-tighter uppercase">Overprint</p>
          <p className="text-3xl font-bold text-[#0078bf] mb-3 uppercase tracking-wider">Two Color Magic</p>
          <p className="text-xl text-[#00827f] font-bold mb-3 uppercase">Beautiful misregistration</p>
          <p className="text-base text-[#333]/50 leading-relaxed">Risograph typography embraces monospaced and sans-serif fonts that reproduce well through stencil printing. Bold weights ensure readability through the grainy texture of soy-based inks.</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Buttons" subtitle="Print actions" className="py-16 px-6 bg-[#0078bf]/5" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#ff517c] text-white font-bold tracking-wider uppercase hover:opacity-80 transition-opacity">Print</button>
          <button className="px-8 py-3 bg-[#0078bf] text-white font-bold tracking-wider uppercase hover:opacity-80 transition-opacity">Layer</button>
          <button className="px-8 py-3 border-2 border-[#ff517c] text-[#ff517c] font-bold tracking-wider uppercase hover:bg-[#ff517c] hover:text-white transition-colors">Outline</button>
          <button className="px-8 py-3 bg-[#00827f] text-white font-bold tracking-wider uppercase hover:opacity-80 transition-opacity">Teal</button>
          <button className="px-8 py-3 bg-[#ffe14f] text-[#333] font-bold tracking-wider uppercase hover:opacity-80 transition-opacity">Yellow</button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cards" subtitle="Print samples" className="py-16 px-6" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Layer One", desc: "The first pass lays down the foundation color, crisp and bright from the drum.", color: "#ff517c" },
            { title: "Layer Two", desc: "The second pass adds depth. Where colors overlap, new hues are born.", color: "#0078bf" },
            { title: "Overprint", desc: "The magic of misregistration creates a third color where layers meet.", color: "#00827f" },
          ].map((card, i) => (
            <div key={i} className="p-6 bg-white/50 border-2 hover:shadow-lg transition-shadow" style={{ borderColor: card.color }}>
              <div className="w-12 h-12 rounded-full mb-4 opacity-60" style={{ background: card.color }} />
              <h3 className="text-lg font-bold mb-2 uppercase tracking-wider" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-[#333]/50 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs" subtitle="Color separations" className="py-16 px-6 bg-[#0078bf]/5" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <div className="max-w-3xl mx-auto bg-white/50 border-2 border-[#0078bf]">
          <div className="flex border-b-2 border-[#0078bf]">
            {tabs.map((tab, i) => (<button key={i} onClick={() => setActiveTab(i)} className={`flex-1 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-colors ${activeTab === i ? "bg-[#0078bf] text-white" : "text-[#333]/30 hover:text-[#333]/60"}`}>{tab}</button>))}
          </div>
          <div className="p-6 min-h-[120px]">
            {activeTab === 0 && <div><h4 className="text-lg font-bold text-[#ff517c] mb-2 uppercase tracking-wider">Pink Layer</h4><p className="text-[#333]/50 text-sm">The first drum prints fluorescent pink. Solid fills and bold shapes define the composition.</p></div>}
            {activeTab === 1 && <div><h4 className="text-lg font-bold text-[#0078bf] mb-2 uppercase tracking-wider">Blue Layer</h4><p className="text-[#333]/50 text-sm">The second drum adds blue elements. Text, lines, and secondary shapes emerge in cool contrast.</p></div>}
            {activeTab === 2 && <div><h4 className="text-lg font-bold text-[#00827f] mb-2 uppercase tracking-wider">Overprint Zone</h4><p className="text-[#333]/50 text-sm">Where pink and blue overlap, a rich dark purple appears - the signature magic of Risograph printing.</p></div>}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion" subtitle="Print manual" className="py-16 px-6" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-white/50 border-2 border-[#ff517c]">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#ff517c]/5 transition-colors">
                <span className="text-[#333] font-bold tracking-wider">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#ff517c] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-5"><p className="text-[#333]/50 text-sm leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alerts" subtitle="Printer messages" className="py-16 px-6 bg-[#0078bf]/5" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-4 p-4 bg-[#00827f]/10 border-2 border-[#00827f]"><Check className="w-5 h-5 text-[#00827f]" /><div><p className="font-bold text-[#00827f] uppercase tracking-wider text-sm">Print Complete</p><p className="text-[#333]/40 text-sm">All copies printed successfully.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#ffe14f]/10 border-2 border-[#ffe14f]"><AlertTriangle className="w-5 h-5 text-[#b8a020]" /><div><p className="font-bold text-[#b8a020] uppercase tracking-wider text-sm">Low Ink</p><p className="text-[#333]/40 text-sm">Pink drum running low, replace soon.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#ff517c]/10 border-2 border-[#ff517c]"><X className="w-5 h-5 text-[#ff517c]" /><div><p className="font-bold text-[#ff517c] uppercase tracking-wider text-sm">Paper Jam</p><p className="text-[#333]/40 text-sm">Clear the feed tray and try again.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#0078bf]/10 border-2 border-[#0078bf]"><Info className="w-5 h-5 text-[#0078bf]" /><div><p className="font-bold text-[#0078bf] uppercase tracking-wider text-sm">Tip</p><p className="text-[#333]/40 text-sm">Let prints dry 24 hours before stacking.</p></div></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toggle" subtitle="Machine settings" className="py-16 px-6" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <div className="max-w-3xl mx-auto bg-white/50 border-2 border-[#0078bf] p-6 space-y-4">
          {[{ label: "Halftone", desc: "Apply dot pattern" },{ label: "Misregister", desc: "Offset layer alignment" },{ label: "Grain", desc: "Add ink texture" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b-2 border-dashed border-[#0078bf]/20 last:border-b-0">
              <div><p className="font-bold text-[#333] tracking-wider">{item.label}</p><p className="text-sm text-[#333]/30">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 transition-colors ${toggleStates[i] ? "bg-[#ff517c]" : "bg-[#333]/20"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-[#f5f0e1] shadow transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Progress" subtitle="Print queue" className="py-16 px-6 bg-[#0078bf]/5" titleClassName="text-3xl font-bold text-[#0078bf] mb-2 text-center uppercase tracking-wider" subtitleClassName="text-[#ff517c] font-bold mb-10 text-center uppercase tracking-wider text-sm">
        <div className="max-w-3xl mx-auto bg-white/50 border-2 border-[#ff517c] p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="font-bold text-[#333] tracking-wider">Copies Printed</p><p className="text-sm font-bold text-[#ff517c]">{progress}%</p></div>
            <div className="h-3 bg-[#333]/10"><div className="h-full bg-[#ff517c] transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-2 border-2 border-[#0078bf] text-[#0078bf] font-bold tracking-wider uppercase text-xs hover:bg-[#0078bf] hover:text-white transition-colors">Pause</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-2 bg-[#ff517c] text-white font-bold tracking-wider uppercase text-xs hover:opacity-80 transition-opacity">Print</button>
          </div>
        </div>
      </ShowcaseSection>

      <footer className="py-12 px-6 text-center border-t-2 border-[#ff517c]"><p className="text-[#333]/30 text-sm font-bold tracking-[0.3em] uppercase">Risograph - Beauty in imperfect overprint</p></footer>
    </div>
  );
}
