"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Heart, Star, ChevronDown,
  Check, X, AlertTriangle, Info, Crown, Gem, Flower2, Sparkles
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(62);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { color: "#1a1a2e", name: "Midnight Velvet", textColor: "white" },
    { color: "#4a0e3c", name: "Dark Rose", textColor: "white" },
    { color: "#8b0000", name: "Blood Red", textColor: "white" },
    { color: "#c0c0c0", name: "Silver Lace", textColor: "black" },
    { color: "#f5e6cc", name: "Antique Cream", textColor: "black" },
    { color: "#d4af37", name: "Gilt Gold", textColor: "black" },
  ];

  const tabs = ["Dresses", "Accessories", "Patterns"];

  const accordionItems = [
    { title: "What is Gothic Lolita?", content: "Gothic Lolita (GothLoli) is a fashion subculture originating in Japan that combines the darkness and mystery of Gothic fashion with the elegance and modesty of Victorian-era clothing and Rococo aesthetics." },
    { title: "Key Elements", content: "Characteristic elements include bell-shaped skirts with petticoats, lace trimmings, ribbon bows, crosses, cameos, parasols, and platform shoes. Colors center on black, deep purple, wine red, and white." },
    { title: "Cultural Influence", content: "Popularized by manga like CLAMP's works, the visual kei music scene, and brands like Moi-meme-Moitie founded by Mana. It represents a rebellion against conventional Japanese fashion norms." },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e18] text-[#f5e6cc] font-serif">
      {/* Back */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/styles/gothic-lolita" className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] border border-[#4a0e3c] text-[#c0c0c0] text-xs uppercase tracking-widest hover:bg-[#4a0e3c] hover:text-white transition-all rounded-sm">
          <ArrowLeft className="w-4 h-4" /> Return
        </Link>
      </div>

      {/* Hero */}
      <ShowcaseHero
        title="Gothic Lolita"
        subtitle="Elegance in Darkness"
        className="relative min-h-screen flex items-center justify-center bg-[#0e0e18] overflow-hidden"
        titleClassName="text-6xl md:text-8xl font-bold text-[#c0c0c0] italic tracking-wide"
        subtitleClassName="text-sm uppercase tracking-[0.5em] text-[#8b0000] mt-4"
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, #4a0e3c 1px, transparent 1px), radial-gradient(circle at 75% 75%, #4a0e3c 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection title="Collection" subtitle="Curated pieces" className="py-16 px-6 bg-[#0e0e18]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Crown, label: "Headpieces", value: "24" },
            { icon: Gem, label: "Jewels", value: "156" },
            { icon: Flower2, label: "Lace Types", value: "38" },
            { icon: Sparkles, label: "Patterns", value: "92" },
          ].map((s, i) => (
            <div key={i} className="p-5 bg-[#1a1a2e] border border-[#4a0e3c]/40 rounded-sm text-center">
              <s.icon className="w-6 h-6 text-[#8b0000] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#c0c0c0] italic">{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-[#8b6f6f] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Colors */}
      <ShowcaseSection title="Palette" subtitle="Colors of midnight" className="py-16 px-6 bg-[#12121f]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection title="Typography" subtitle="Elegant letterforms" className="py-16 px-6 bg-[#0e0e18]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 bg-[#1a1a2e] border border-[#4a0e3c]/30 rounded-sm">
            <p className="text-xs text-[#8b6f6f] uppercase tracking-widest mb-2">Display / Serif Italic</p>
            <p className="text-5xl font-bold italic text-[#c0c0c0]">Nocturne Rose</p>
          </div>
          <div className="p-6 bg-[#1a1a2e] border border-[#4a0e3c]/30 rounded-sm">
            <p className="text-xs text-[#8b6f6f] uppercase tracking-widest mb-2">Body / Serif</p>
            <p className="text-base text-[#d4c5a9] leading-relaxed">In the moonlit parlor, lace curtains whispered secrets of a bygone era, where elegance was both armor and art.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection title="Buttons" subtitle="Interactive elements" className="py-16 px-6 bg-[#12121f]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#8b0000] text-[#f5e6cc] font-serif italic tracking-wider hover:bg-[#a00000] transition-colors rounded-sm">Enter Parlor</button>
          <button className="px-8 py-3 bg-[#1a1a2e] border border-[#c0c0c0]/30 text-[#c0c0c0] font-serif italic tracking-wider hover:border-[#8b0000] hover:text-[#8b0000] transition-colors rounded-sm">View Collection</button>
          <button className="px-8 py-3 bg-[#4a0e3c] text-[#f5e6cc] font-serif italic tracking-wider hover:bg-[#5a1e4c] transition-colors rounded-sm">Commission</button>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection title="Garments" subtitle="Featured pieces" className="py-16 px-6 bg-[#0e0e18]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Midnight Requiem", desc: "Black velvet JSK with silver cross embroidery and layered tulle underskirt.", accent: "border-t-[#8b0000]" },
            { title: "Rose Thorns", desc: "Wine-red OP dress with antique lace collar and cameo brooch closure.", accent: "border-t-[#4a0e3c]" },
            { title: "Phantom Waltz", desc: "Black and white striped bustle skirt with detachable bow train.", accent: "border-t-[#d4af37]" },
          ].map((c, i) => (
            <div key={i} className={`p-6 bg-[#1a1a2e] border border-[#4a0e3c]/30 border-t-2 ${c.accent} rounded-sm`}>
              <h3 className="text-xl font-bold text-[#c0c0c0] italic mb-3">{c.title}</h3>
              <p className="text-sm text-[#8b6f6f] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection title="Catalog" subtitle="Browse by category" className="py-16 px-6 bg-[#12121f]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#1a1a2e] border border-[#4a0e3c]/30 rounded-sm overflow-hidden">
          <div className="flex border-b border-[#4a0e3c]/30">
            {tabs.map((t, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className={`flex-1 px-6 py-3 font-serif italic text-sm transition-colors ${activeTab === i ? "bg-[#4a0e3c] text-[#f5e6cc]" : "text-[#8b6f6f] hover:text-[#c0c0c0]"}`}>{t}</button>
            ))}
          </div>
          <div className="p-6 min-h-[100px]">
            {activeTab === 0 && <p className="text-[#d4c5a9] italic">12 JSK, 8 OP, 5 skirt sets available. New arrivals from Moi-meme-Moitie and Atelier Boz.</p>}
            {activeTab === 1 && <p className="text-[#d4c5a9] italic">Headdresses, crosses, cameos, parasols, and platform shoes. All handcrafted with antique findings.</p>}
            {activeTab === 2 && <p className="text-[#d4c5a9] italic">Iron gate, cathedral window, rose vine, and bat wing lace patterns available for custom orders.</p>}
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection title="About" subtitle="Knowledge base" className="py-16 px-6 bg-[#0e0e18]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <div className="max-w-3xl mx-auto">
          {accordionItems.map((item, i) => (
            <div key={i} className="border border-[#4a0e3c]/30 border-b-0 last:border-b bg-[#1a1a2e]">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left">
                <span className="font-bold text-[#c0c0c0] italic">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#8b0000] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-4"><p className="text-sm text-[#8b6f6f] leading-relaxed italic">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection title="Notices" subtitle="Important messages" className="py-16 px-6 bg-[#12121f]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-3 p-4 bg-[#1a1a2e] border-l-4 border-[#d4af37] border border-[#4a0e3c]/20 rounded-sm"><Check className="w-5 h-5 text-[#d4af37]" /><div><p className="font-bold text-[#c0c0c0] italic text-sm">Order Confirmed</p><p className="text-xs text-[#8b6f6f] italic">Your bespoke piece is being crafted.</p></div></div>
          <div className="flex items-center gap-3 p-4 bg-[#1a1a2e] border-l-4 border-[#c4a000] border border-[#4a0e3c]/20 rounded-sm"><AlertTriangle className="w-5 h-5 text-[#c4a000]" /><div><p className="font-bold text-[#c0c0c0] italic text-sm">Limited Edition</p><p className="text-xs text-[#8b6f6f] italic">Only 3 pieces remaining in this design.</p></div></div>
          <div className="flex items-center gap-3 p-4 bg-[#1a1a2e] border-l-4 border-[#8b0000] border border-[#4a0e3c]/20 rounded-sm"><X className="w-5 h-5 text-[#8b0000]" /><div><p className="font-bold text-[#c0c0c0] italic text-sm">Sold Out</p><p className="text-xs text-[#8b6f6f] italic">This item is no longer available.</p></div></div>
          <div className="flex items-center gap-3 p-4 bg-[#1a1a2e] border-l-4 border-[#4a0e3c] border border-[#4a0e3c]/20 rounded-sm"><Info className="w-5 h-5 text-[#c0c0c0]" /><div><p className="font-bold text-[#c0c0c0] italic text-sm">Tea Party Event</p><p className="text-xs text-[#8b6f6f] italic">Monthly gathering this Saturday at 3 PM.</p></div></div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection title="Preferences" subtitle="Customization" className="py-16 px-6 bg-[#0e0e18]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#1a1a2e] border border-[#4a0e3c]/30 p-6 rounded-sm space-y-4">
          {[{ label: "Lace Overlay", desc: "Add lace texture to backgrounds" }, { label: "Dark Theme", desc: "Maximum darkness mode" }, { label: "Rose Accents", desc: "Add rose decorations" }].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#4a0e3c]/20 last:border-b-0">
              <div><p className="font-bold text-[#c0c0c0] italic">{item.label}</p><p className="text-xs text-[#8b6f6f]">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-12 h-6 rounded-full transition-colors ${toggleStates[i] ? "bg-[#8b0000]" : "bg-[#2d2d3f]"}`}>
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[#f5e6cc] rounded-full transition-transform ${toggleStates[i] ? "translate-x-6" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection title="Crafting" subtitle="Creation progress" className="py-16 px-6 bg-[#12121f]" titleClassName="text-3xl font-bold text-[#c0c0c0] italic mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#8b0000] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#1a1a2e] border border-[#4a0e3c]/30 p-6 rounded-sm space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="font-bold text-[#c0c0c0] italic">Commission Progress</p><p className="text-sm text-[#8b0000] italic">{progress}%</p></div>
            <div className="h-2 bg-[#0e0e18] rounded-full"><div className="h-full bg-gradient-to-r from-[#4a0e3c] to-[#8b0000] rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-[#4a0e3c]/20">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-4 py-2 border border-[#4a0e3c]/40 text-[#8b6f6f] italic text-sm hover:border-[#8b0000] hover:text-[#8b0000] transition-colors rounded-sm">Decrease</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-4 py-2 bg-[#8b0000] text-[#f5e6cc] italic text-sm hover:bg-[#a00000] transition-colors rounded-sm">Increase</button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0e0e18] border-t border-[#4a0e3c]/30 text-center">
        <p className="text-xs text-[#8b6f6f] italic tracking-wider">Gothic Lolita Aesthetic ~ Elegance in Darkness ~ Est. MMXXVI</p>
      </footer>
    </div>
  );
}
