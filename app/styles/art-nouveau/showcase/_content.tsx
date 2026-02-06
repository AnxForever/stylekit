"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ChevronDown, Check, X, AlertTriangle, Info,
  Flower2, Leaf, Heart, Star, Feather, Sparkles
} from "lucide-react";
import {
  ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Forest Green", value: "#2d5016", textColor: "white" },
  { name: "Gold", value: "#c9a84c", textColor: "white" },
  { name: "Ivory", value: "#f5f0e1", textColor: "black" },
  { name: "Wisteria", value: "#8b6bae", textColor: "white" },
  { name: "Copper", value: "#b87333", textColor: "white" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(62);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Flora", "Fauna", "Ornament"];
  const accordionItems = [
    { title: "Origins of Art Nouveau", content: "Art Nouveau emerged in the 1890s as a reaction against academic art. It drew inspiration from natural forms and structures, particularly the curved lines of plants and flowers." },
    { title: "Key Characteristics", content: "Organic, flowing curves inspired by natural forms. Asymmetric but balanced designs. Elaborate ornamentation with floral and vegetal motifs. Integration of art into everyday life." },
    { title: "Notable Artists", content: "Alphonse Mucha, Gustav Klimt, Antoni Gaudi, Hector Guimard, and Louis Comfort Tiffany are among the movement's most celebrated practitioners." },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e1]" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e1]/90 backdrop-blur-sm border-b border-[#c9a84c]/30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#2d5016] hover:text-[#c9a84c] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm italic">Return</span>
          </Link>
          <span className="text-[#c9a84c] italic text-sm tracking-wider">Art Nouveau</span>
        </div>
      </nav>

      {/* Hero */}
      <ShowcaseHero
        title="Art Nouveau"
        subtitle="The art of organic beauty, where nature inspires every curve and ornament"
        className="relative pt-24 pb-20 px-6 text-center overflow-hidden"
        titleClassName="text-6xl md:text-8xl italic text-[#2d5016] mb-6"
        subtitleClassName="text-lg text-[#8b6bae] italic max-w-2xl mx-auto"
      >
        {/* Decorative SVG curves */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,200 C150,100 300,300 450,200 C600,100 750,300 900,200 C1050,100 1200,300 1200,200" fill="none" stroke="#2d5016" strokeWidth="2"/>
            <path d="M0,250 C150,150 300,350 450,250 C600,150 750,350 900,250 C1050,150 1200,350 1200,250" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>
          </svg>
        </div>
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection title="Statistics" subtitle="Nature-inspired metrics" className="py-16 px-6" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Flower2, label: "Designs", value: "1,842", color: "#2d5016" },
            { icon: Leaf, label: "Elements", value: "926", color: "#8b6bae" },
            { icon: Heart, label: "Favorites", value: "4.2K", color: "#b87333" },
            { icon: Star, label: "Rating", value: "4.9", color: "#c9a84c" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white/60 rounded-[40px_10px_40px_10px] border border-[#c9a84c]/30 text-center hover:shadow-lg transition-shadow">
              <stat.icon className="w-8 h-8 mx-auto mb-3" style={{ color: stat.color }} />
              <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm text-[#2d5016]/60 italic mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection title="Color Palette" subtitle="Colors of the garden" className="py-16 px-6 bg-[#2d5016]/5" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection title="Typography" subtitle="Elegant lettering" className="py-16 px-6" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-white/60 rounded-[30px_8px_30px_8px] border border-[#c9a84c]/30">
            <p className="text-6xl italic text-[#2d5016] mb-2">The Beauty of Nature</p>
            <p className="text-3xl italic text-[#8b6bae] mb-2">Flowing organic curves</p>
            <p className="text-xl text-[#b87333] italic mb-2">Ornamental elegance in every detail</p>
            <p className="text-base text-[#2d5016]/70">Art Nouveau typography draws from the natural world, embracing asymmetric beauty and organic flow in letterforms that seem to grow like vines across the page.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection title="Buttons" subtitle="Organic interactions" className="py-16 px-6 bg-[#2d5016]/5" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#2d5016] text-[#f5f0e1] rounded-[20px_5px_20px_5px] italic hover:bg-[#3a6b1e] transition-colors">Primary</button>
          <button className="px-8 py-3 bg-[#c9a84c] text-white rounded-[20px_5px_20px_5px] italic hover:bg-[#b89740] transition-colors">Secondary</button>
          <button className="px-8 py-3 border-2 border-[#2d5016] text-[#2d5016] rounded-[20px_5px_20px_5px] italic hover:bg-[#2d5016] hover:text-white transition-colors">Outline</button>
          <button className="px-8 py-3 bg-[#8b6bae] text-white rounded-[20px_5px_20px_5px] italic hover:bg-[#7a5c9e] transition-colors">Accent</button>
          <button className="px-8 py-3 bg-[#b87333] text-white rounded-[20px_5px_20px_5px] italic hover:bg-[#a66329] transition-colors">Copper</button>
          <button className="px-8 py-3 bg-gray-300 text-gray-500 rounded-[20px_5px_20px_5px] italic cursor-not-allowed">Disabled</button>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection title="Cards" subtitle="Decorative panels" className="py-16 px-6" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Floral Motifs", desc: "Inspired by lilies, irises, and orchids that bloom across surfaces.", icon: Flower2, color: "#2d5016" },
            { title: "Organic Lines", desc: "Whiplash curves that mirror the growth patterns of natural vines.", icon: Leaf, color: "#8b6bae" },
            { title: "Golden Details", desc: "Gilded accents and warm metallic touches of pure craftsmanship.", icon: Feather, color: "#c9a84c" },
          ].map((card, i) => (
            <div key={i} className="p-6 bg-white/60 rounded-[30px_8px_30px_8px] border border-[#c9a84c]/30 hover:shadow-lg transition-shadow group">
              <card.icon className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" style={{ color: card.color }} />
              <h3 className="text-xl italic font-bold mb-2" style={{ color: card.color }}>{card.title}</h3>
              <p className="text-[#2d5016]/70 text-sm italic">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection title="Tabs" subtitle="Content categories" className="py-16 px-6 bg-[#2d5016]/5" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/60 rounded-[30px_8px_30px_8px] border border-[#c9a84c]/30 overflow-hidden">
          <div className="flex border-b border-[#c9a84c]/30">
            {tabs.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className={`flex-1 py-4 italic text-sm transition-colors ${activeTab === i ? "bg-[#2d5016] text-[#f5f0e1]" : "text-[#2d5016]/60 hover:text-[#2d5016] hover:bg-[#c9a84c]/10"}`}>{tab}</button>
            ))}
          </div>
          <div className="p-6 min-h-[120px]">
            {activeTab === 0 && <div><h4 className="text-lg italic text-[#2d5016] font-bold mb-2">Floral Patterns</h4><p className="text-[#2d5016]/70 italic text-sm">Lilies, irises, orchids, and wild roses form the foundation of Art Nouveau decorative vocabulary.</p></div>}
            {activeTab === 1 && <div><h4 className="text-lg italic text-[#8b6bae] font-bold mb-2">Animal Forms</h4><p className="text-[#2d5016]/70 italic text-sm">Peacocks, dragonflies, and butterflies are frequently depicted in sinuous, stylized forms.</p></div>}
            {activeTab === 2 && <div><h4 className="text-lg italic text-[#c9a84c] font-bold mb-2">Decorative Arts</h4><p className="text-[#2d5016]/70 italic text-sm">Stained glass, jewelry, furniture, and architecture all embraced the organic Art Nouveau style.</p></div>}
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection title="Accordion" subtitle="Unfolding knowledge" className="py-16 px-6" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-white/60 rounded-[20px_6px_20px_6px] border border-[#c9a84c]/30 overflow-hidden">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left">
                <span className="italic font-bold text-[#2d5016]">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#c9a84c] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-5"><p className="text-[#2d5016]/70 italic text-sm leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection title="Alerts" subtitle="Gentle notices" className="py-16 px-6 bg-[#2d5016]/5" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-4 p-4 bg-[#2d5016]/10 rounded-[20px_6px_20px_6px] border border-[#2d5016]/20"><Check className="w-5 h-5 text-[#2d5016]" /><div><p className="font-bold italic text-[#2d5016]">Flourishing</p><p className="text-[#2d5016]/70 italic text-sm">The garden grows beautifully.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#c9a84c]/10 rounded-[20px_6px_20px_6px] border border-[#c9a84c]/30"><AlertTriangle className="w-5 h-5 text-[#c9a84c]" /><div><p className="font-bold italic text-[#c9a84c]">Attention</p><p className="text-[#2d5016]/70 italic text-sm">The vine requires careful tending.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#b87333]/10 rounded-[20px_6px_20px_6px] border border-[#b87333]/30"><X className="w-5 h-5 text-[#b87333]" /><div><p className="font-bold italic text-[#b87333]">Withered</p><p className="text-[#2d5016]/70 italic text-sm">Something has gone astray.</p></div></div>
          <div className="flex items-center gap-4 p-4 bg-[#8b6bae]/10 rounded-[20px_6px_20px_6px] border border-[#8b6bae]/30"><Info className="w-5 h-5 text-[#8b6bae]" /><div><p className="font-bold italic text-[#8b6bae]">Note</p><p className="text-[#2d5016]/70 italic text-sm">A gentle reminder for your consideration.</p></div></div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection title="Toggle" subtitle="Organic switches" className="py-16 px-6" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/60 rounded-[30px_8px_30px_8px] border border-[#c9a84c]/30 p-6 space-y-4">
          {[{ label: "Floral Borders", desc: "Show decorative vine borders" },{ label: "Gold Accents", desc: "Enable gilded highlights" },{ label: "Organic Curves", desc: "Use flowing line shapes" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#c9a84c]/20 last:border-b-0">
              <div><p className="font-bold italic text-[#2d5016]">{item.label}</p><p className="text-sm text-[#2d5016]/50 italic">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 rounded-full transition-colors ${toggleStates[i] ? "bg-[#2d5016]" : "bg-[#c9a84c]/30"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-[#f5f0e1] rounded-full shadow transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection title="Progress" subtitle="Growing steadily" className="py-16 px-6 bg-[#2d5016]/5" titleClassName="text-3xl italic text-[#2d5016] mb-2 text-center" subtitleClassName="text-[#8b6bae] italic mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/60 rounded-[30px_8px_30px_8px] border border-[#c9a84c]/30 p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="italic font-bold text-[#2d5016]">Bloom Progress</p><p className="text-sm italic text-[#c9a84c]">{progress}%</p></div>
            <div className="h-3 bg-[#c9a84c]/20 rounded-full"><div className="h-full bg-gradient-to-r from-[#2d5016] to-[#c9a84c] rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-2 border-2 border-[#2d5016] text-[#2d5016] rounded-[15px_4px_15px_4px] italic hover:bg-[#2d5016] hover:text-white transition-colors">Prune</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-2 bg-[#2d5016] text-white rounded-[15px_4px_15px_4px] italic hover:bg-[#3a6b1e] transition-colors">Grow</button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-[#c9a84c]/30">
        <p className="text-[#2d5016]/50 italic text-sm">Art Nouveau - Where nature meets design</p>
      </footer>
    </div>
  );
}
