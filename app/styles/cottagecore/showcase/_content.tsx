"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Check, X, AlertTriangle, Info, Flower, Flower2, Heart, TreePine, Sun, CloudRain } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Honey", value: "#daa520", textColor: "black" },
  { name: "Meadow", value: "#7cb342", textColor: "white" },
  { name: "Daisy", value: "#fff8dc", textColor: "black" },
  { name: "Earth", value: "#8b7355", textColor: "white" },
  { name: "Rose Hip", value: "#e8a0b4", textColor: "black" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(60);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Garden", "Kitchen", "Meadow"];
  const accordionItems = [
    { title: "What is Cottagecore?", content: "Cottagecore is an aesthetic that romanticizes rural life, emphasizing harmony with nature, traditional crafts, foraging, baking, and the simple pleasures of countryside living." },
    { title: "Design Elements", content: "Floral patterns, gingham checks, handwritten fonts, warm earthy tones, natural textures like linen and wood, pressed flowers, and illustrations of mushrooms and wildflowers." },
    { title: "Modern Applications", content: "Cottagecore translates beautifully into digital design through soft color palettes, organic shapes, hand-drawn illustrations, and interfaces that feel warm, welcoming, and unhurried." },
  ];

  return (
    <div className="min-h-screen bg-[#faf6ee]" style={{ fontFamily: "'Georgia', serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf6ee]/90 backdrop-blur-sm border-b border-[#daa520]/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#8b7355] hover:text-[#daa520] transition-colors"><ArrowLeft className="w-4 h-4" /><span className="text-sm italic">Back home</span></Link>
          <span className="text-[#daa520] text-sm italic">Cottagecore</span>
        </div>
      </nav>

      <ShowcaseHero title="Cottagecore" subtitle="A return to simpler times, where wildflowers bloom and bread rises in the warmth of a country kitchen" className="relative pt-28 pb-24 px-6 text-center" titleClassName="text-6xl md:text-8xl italic text-[#8b7355] mb-6" subtitleClassName="text-base text-[#7cb342] max-w-2xl mx-auto italic" />

      <ShowcaseSection title="Statistics" subtitle="From the countryside" className="py-16 px-6" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Flower2, label: "Blooms", value: "847", color: "#e8a0b4" },
            { icon: Sun, label: "Sunny Days", value: "234", color: "#daa520" },
            { icon: TreePine, label: "Trees Planted", value: "56", color: "#7cb342" },
            { icon: Heart, label: "Jams Made", value: "128", color: "#8b7355" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white/70 rounded-2xl border border-dashed border-[#daa520]/30 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.color }} />
              <p className="text-3xl italic" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm text-[#8b7355]/50 italic mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color Palette" subtitle="Nature's palette" className="py-16 px-6 bg-[#7cb342]/5" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      <ShowcaseSection title="Typography" subtitle="Handwritten charm" className="py-16 px-6" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <div className="max-w-4xl mx-auto p-8 bg-white/70 rounded-2xl border border-dashed border-[#daa520]/30">
          <p className="text-5xl italic text-[#8b7355] mb-3">A Simple Life</p>
          <p className="text-3xl italic text-[#7cb342] mb-3">Among the Wildflowers</p>
          <p className="text-xl text-[#daa520] italic mb-3">Baked with love and sunshine</p>
          <p className="text-base text-[#8b7355]/50 leading-relaxed italic">Cottagecore typography is soft, warm, and inviting. Serifs evoke the pages of old recipe books, while cursive lettering recalls handwritten notes left on kitchen windowsills.</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Buttons" subtitle="Gentle actions" className="py-16 px-6 bg-[#7cb342]/5" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#8b7355] text-white rounded-full italic hover:bg-[#7a6345] transition-colors">Harvest</button>
          <button className="px-8 py-3 bg-[#7cb342] text-white rounded-full italic hover:bg-[#6ca332] transition-colors">Plant</button>
          <button className="px-8 py-3 border-2 border-dashed border-[#daa520] text-[#daa520] rounded-full italic hover:bg-[#daa520] hover:text-white transition-colors">Forage</button>
          <button className="px-8 py-3 bg-[#e8a0b4] text-white rounded-full italic hover:bg-[#d890a4] transition-colors">Bake</button>
          <button className="px-8 py-3 bg-[#daa520] text-white rounded-full italic hover:bg-[#ca9510] transition-colors">Preserve</button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Cards" subtitle="Country notes" className="py-16 px-6" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "The Garden", desc: "Lavender and rosemary grow alongside heirloom tomatoes and climbing roses.", icon: Flower, color: "#7cb342" },
            { title: "The Kitchen", desc: "Fresh sourdough cools on the counter while jam simmers on the stove.", icon: Heart, color: "#daa520" },
            { title: "The Meadow", desc: "Wildflowers sway in the breeze as butterflies dance in the afternoon sun.", icon: Flower2, color: "#e8a0b4" },
          ].map((card, i) => (
            <div key={i} className="p-6 bg-white/70 rounded-2xl border border-dashed border-[#daa520]/30 hover:shadow-lg transition-shadow">
              <card.icon className="w-8 h-8 mb-4" style={{ color: card.color }} />
              <h3 className="text-lg italic font-bold mb-2" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-[#8b7355]/50 text-sm italic leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs" subtitle="Seasonal guide" className="py-16 px-6 bg-[#7cb342]/5" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/70 rounded-2xl border border-dashed border-[#daa520]/30 overflow-hidden">
          <div className="flex border-b border-[#daa520]/20">
            {tabs.map((tab, i) => (<button key={i} onClick={() => setActiveTab(i)} className={`flex-1 py-4 text-sm italic transition-colors ${activeTab === i ? "bg-[#7cb342] text-white" : "text-[#8b7355]/40 hover:text-[#8b7355]"}`}>{tab}</button>))}
          </div>
          <div className="p-6 min-h-[120px]">
            {activeTab === 0 && <div><h4 className="text-lg italic text-[#7cb342] font-bold mb-2">In the Garden</h4><p className="text-[#8b7355]/50 text-sm italic">Seeds planted in spring promise summer abundance. Tend your herbs daily and watch the magic unfold.</p></div>}
            {activeTab === 1 && <div><h4 className="text-lg italic text-[#daa520] font-bold mb-2">In the Kitchen</h4><p className="text-[#8b7355]/50 text-sm italic">Fresh bread, homemade butter, and preserves from the garden. Every meal is a celebration of the harvest.</p></div>}
            {activeTab === 2 && <div><h4 className="text-lg italic text-[#e8a0b4] font-bold mb-2">In the Meadow</h4><p className="text-[#8b7355]/50 text-sm italic">Lay among the wildflowers with a good book. Listen to the bees hum and the creek babble in the distance.</p></div>}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion" subtitle="Country wisdom" className="py-16 px-6" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-white/70 rounded-2xl border border-dashed border-[#daa520]/30 overflow-hidden">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left">
                <span className="italic text-[#8b7355]">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#daa520] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-5"><p className="text-[#8b7355]/50 text-sm italic leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alerts" subtitle="Gentle reminders" className="py-16 px-6 bg-[#7cb342]/5" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-4 p-4 bg-[#7cb342]/10 rounded-2xl border border-[#7cb342]/20"><Check className="w-5 h-5 text-[#7cb342]" /><div><p className="italic font-bold text-[#7cb342]">Harvest Ready</p><p className="text-[#8b7355]/40 text-sm italic">The tomatoes are ripe for picking!</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#daa520]/10 rounded-2xl border border-[#daa520]/20"><AlertTriangle className="w-5 h-5 text-[#daa520]" /><div><p className="italic font-bold text-[#daa520]">Weather Alert</p><p className="text-[#8b7355]/40 text-sm italic">Rain expected tomorrow, bring in the laundry.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#e8a0b4]/10 rounded-2xl border border-[#e8a0b4]/20"><X className="w-5 h-5 text-[#e8a0b4]" /><div><p className="italic font-bold text-[#e8a0b4]">Oh Dear</p><p className="text-[#8b7355]/40 text-sm italic">The jam has burnt on the stove.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#8b7355]/10 rounded-2xl border border-[#8b7355]/20"><Info className="w-5 h-5 text-[#8b7355]" /><div><p className="italic font-bold text-[#8b7355]">Season Note</p><p className="text-[#8b7355]/40 text-sm italic">Best time to plant lavender is now.</p></div></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toggle" subtitle="Cottage settings" className="py-16 px-6" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/70 rounded-2xl border border-dashed border-[#daa520]/30 p-6 space-y-4">
          {[{ label: "Morning Birds", desc: "Wake with birdsong" },{ label: "Fresh Bread", desc: "Daily baking reminder" },{ label: "Garden Notes", desc: "Track your plants" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#daa520]/10 last:border-b-0">
              <div><p className="italic text-[#8b7355]">{item.label}</p><p className="text-sm text-[#8b7355]/30 italic">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 rounded-full transition-colors ${toggleStates[i] ? "bg-[#7cb342]" : "bg-[#daa520]/30"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Progress" subtitle="Growing season" className="py-16 px-6 bg-[#7cb342]/5" titleClassName="text-3xl italic text-[#8b7355] mb-2 text-center" subtitleClassName="text-[#7cb342] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/70 rounded-2xl border border-dashed border-[#daa520]/30 p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="italic text-[#8b7355]">Garden Progress</p><p className="text-sm italic text-[#7cb342]">{progress}%</p></div>
            <div className="h-3 bg-[#7cb342]/10 rounded-full"><div className="h-full bg-gradient-to-r from-[#7cb342] to-[#daa520] rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-2 border border-dashed border-[#8b7355] text-[#8b7355] rounded-full italic hover:bg-[#8b7355] hover:text-white transition-colors">Rest</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-2 bg-[#7cb342] text-white rounded-full italic hover:bg-[#6ca332] transition-colors">Tend</button>
          </div>
        </div>
      </ShowcaseSection>

      <footer className="py-12 px-6 text-center border-t border-[#daa520]/10"><p className="text-[#8b7355]/30 text-sm italic">Cottagecore - Where the simple life blooms</p></footer>
    </div>
  );
}
