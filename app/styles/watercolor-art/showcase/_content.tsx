"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Droplet, Heart, Flower2, ChevronDown, ChevronUp, Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Palette } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { name: "Soft Pink", value: "#ffd1dc", description: "Primary" },
    { name: "Sky Blue", value: "#87ceeb", description: "Secondary" },
    { name: "Mint Green", value: "#98d8c8", description: "Accent" },
    { name: "Lavender", value: "#e6e6fa", description: "Highlight" },
    { name: "Cream", value: "#f7f4ea", description: "Background" },
  ];

  const tabs = ["Wash", "Blend", "Flow"];
  const accordionItems = [
    { title: "What is Watercolor Art?", content: "A soft, artistic design style inspired by watercolor paintings, featuring gentle color washes, transparent overlays, and organic brush strokes that create a dreamy, elegant aesthetic." },
    { title: "Core Techniques", content: "Soft color gradients, transparency and layering, paper texture, flowing organic shapes, and delicate brush stroke details that mimic real watercolor techniques." },
    { title: "Perfect For", content: "Ideal for feminine brands, wedding websites, art portfolios, lifestyle blogs, and any project wanting to convey elegance, creativity, and gentle sophistication." },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ea] text-gray-800">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-800 hover:text-[#87ceeb] transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-serif text-lg">Back to Styles</span>
          </Link>
          <div className="flex gap-2">
            <Droplet className="w-5 h-5 text-[#87ceeb] opacity-60" />
            <Flower2 className="w-5 h-5 text-[#ffd1dc] opacity-60" />
          </div>
        </div>
      </header>

      <ShowcaseHero
        title="Watercolor Art"
        subtitle="Soft & Dreamy Aesthetic"
        description="Gentle color washes and transparent overlays create an elegant, artistic atmosphere inspired by traditional watercolor paintings."
        className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-[#ffd1dc]/20 via-[#87ceeb]/20 to-[#98d8c8]/20"
        titleClassName="text-6xl md:text-7xl font-serif mb-6 text-gray-800"
        subtitleClassName="text-xl text-[#87ceeb] mb-8 font-light"
        descriptionClassName="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
      >
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-[#ffd1dc]/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-br from-[#87ceeb]/30 to-transparent rounded-full blur-3xl"></div>
      </ShowcaseHero>

      <ShowcaseSection title="Gallery Stats" subtitle="Creative metrics" className="py-16 px-6 bg-white/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Artists", value: "8.2K", color: "#ffd1dc" },
            { icon: TrendingUp, label: "Growth", value: "+63%", color: "#87ceeb" },
            { icon: Eye, label: "Views", value: "324K", color: "#98d8c8" },
            { icon: Palette, label: "Palettes", value: "156", color: "#e6e6fa" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow" style={{ boxShadow: `0 10px 30px ${stat.color}30` }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${stat.color}40` }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p className="text-3xl font-serif mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Color Palette" subtitle="Soft washes" className="py-16 px-6">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      <ShowcaseSection title="Typography" subtitle="Elegant fonts" className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          {[
            { text: "Watercolor", size: "text-7xl", color: "#ffd1dc", desc: "Display / Serif" },
            { text: "Artistic Heading", size: "text-4xl", color: "#87ceeb", desc: "Heading / Medium" },
            { text: "Flowing body text with gentle elegance", size: "text-lg", color: "#666", desc: "Body / Regular" },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl shadow-sm">
              <p className={`${item.size} font-serif mb-2`} style={{ color: item.color }}>{item.text}</p>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Buttons" subtitle="Soft interactions" className="py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          {["Primary", "Secondary", "Outlined", "Soft"].map((label, i) => (
            <button key={i} className={`px-8 py-3 rounded-full font-medium transition-all ${i === 0 ? 'bg-[#ffd1dc] text-white shadow-lg hover:shadow-xl' : i === 1 ? 'bg-[#87ceeb] text-white shadow-lg hover:shadow-xl' : i === 2 ? 'border-2 border-[#98d8c8] text-[#98d8c8] hover:bg-[#98d8c8] hover:text-white' : 'bg-[#e6e6fa] text-gray-700 hover:bg-[#d8cfe8]'}`}>
              {label}
            </button>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Content Cards" subtitle="Artistic blocks" className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Gentle", desc: "Soft color transitions", gradient: "from-[#ffd1dc]/20 to-[#ffd1dc]/5" },
            { title: "Flowing", desc: "Organic shapes and forms", gradient: "from-[#87ceeb]/20 to-[#87ceeb]/5" },
            { title: "Dreamy", desc: "Transparent overlays", gradient: "from-[#98d8c8]/20 to-[#98d8c8]/5" },
          ].map((card, i) => (
            <div key={i} className={`p-8 bg-gradient-to-br ${card.gradient} rounded-3xl border border-white/50 hover:scale-105 transition-transform`}>
              <h3 className="text-2xl font-serif mb-3 text-gray-800">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tabs" subtitle="Soft navigation" className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex p-2 bg-gray-50">
              {tabs.map((tab, i) => (
                <button key={i} onClick={() => setActiveTab(i)} className={`flex-1 px-6 py-3 rounded-2xl font-medium transition-all ${activeTab === i ? 'bg-[#87ceeb] text-white shadow-md' : 'text-gray-600 hover:bg-white'}`}>{tab}</button>
              ))}
            </div>
            <div className="p-8 min-h-[150px]">
              {activeTab === 0 && <div><h4 className="text-2xl font-serif text-[#ffd1dc] mb-3">Watercolor Wash</h4><p className="text-gray-600">Light, transparent layers of color</p></div>}
              {activeTab === 1 && <div><h4 className="text-2xl font-serif text-[#87ceeb] mb-3">Color Blending</h4><p className="text-gray-600">Smooth transitions between hues</p></div>}
              {activeTab === 2 && <div><h4 className="text-2xl font-serif text-[#98d8c8] mb-3">Flowing Forms</h4><p className="text-gray-600">Organic, natural shapes</p></div>}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Accordion" subtitle="Expandable content" className="py-16 px-6 bg-white/50">
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                <span className="font-serif text-lg text-gray-800">{item.title}</span>
                {openAccordion === i ? <ChevronUp className="w-5 h-5 text-[#87ceeb]" /> : <ChevronDown className="w-5 h-5 text-[#87ceeb]" />}
              </button>
              {openAccordion === i && <div className="px-6 pb-6"><p className="text-gray-600 leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Alerts" subtitle="Gentle notifications" className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { icon: Check, label: "Success", desc: "Everything went beautifully", color: "#98d8c8", bg: "#98d8c820" },
            { icon: AlertTriangle, label: "Notice", desc: "Something needs attention", color: "#ffd1dc", bg: "#ffd1dc20" },
            { icon: X, label: "Error", desc: "Something didn't work", color: "#ef9a9a", bg: "#ef9a9a20" },
            { icon: Info, label: "Info", desc: "Here's something to know", color: "#87ceeb", bg: "#87ceeb20" },
          ].map((alert, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl" style={{ backgroundColor: alert.bg }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: alert.color }}>
                <alert.icon className="w-5 h-5 text-white" />
              </div>
              <div><p className="font-semibold" style={{ color: alert.color }}>{alert.label}</p><p className="text-gray-600 text-sm">{alert.desc}</p></div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Toggle" subtitle="Soft switches" className="py-16 px-6 bg-white/50">
        <div className="max-w-3xl mx-auto"><div className="p-8 bg-white rounded-3xl shadow-lg space-y-6">
          {[
            { label: "Watercolor Effects", desc: "Enable soft washes", color: "#ffd1dc" },
            { label: "Transparency", desc: "Layer overlays", color: "#87ceeb" },
            { label: "Brush Strokes", desc: "Show textures", color: "#98d8c8" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div><p className="font-semibold text-gray-800">{item.label}</p><p className="text-sm text-gray-500">{item.desc}</p></div>
              <button onClick={() => { const newStates = [...toggleStates]; newStates[i] = !newStates[i]; setToggleStates(newStates); }} className="relative w-14 h-7 rounded-full transition-all" style={{ backgroundColor: toggleStates[i] ? item.color : '#e0e0e0' }}>
                <span className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all" style={{ left: toggleStates[i] ? 'calc(100% - 26px)' : '2px' }} />
              </button>
            </div>
          ))}
        </div></div>
      </ShowcaseSection>

      <ShowcaseSection title="Progress" subtitle="Loading states" className="py-16 px-6">
        <div className="max-w-3xl mx-auto"><div className="p-8 bg-white rounded-3xl shadow-lg space-y-8">
          <div><div className="flex items-center justify-between mb-3"><p className="font-semibold text-gray-800">Painting Progress</p><p className="text-sm text-[#87ceeb]">{progress}%</p></div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#ffd1dc] to-[#87ceeb] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
          </div>
          <div><p className="font-semibold text-gray-800 mb-3">Layers</p>
            <div className="grid grid-cols-4 gap-2">{[100, 100, progress, 0].map((val, i) => (
              <div key={i}><div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full transition-all" style={{ width: `${val}%`, backgroundColor: val === 100 ? '#98d8c8' : val > 0 ? '#ffd1dc' : 'transparent' }} /></div>
                <p className="text-xs text-gray-500 mt-1 text-center">L{i + 1}</p></div>
            ))}</div>
          </div>
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-6 py-2 border-2 border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors">Decrease</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-6 py-2 bg-[#87ceeb] text-white rounded-full hover:bg-[#76beda] transition-colors">Increase</button>
          </div>
        </div></div>
      </ShowcaseSection>

      <footer className="border-t border-gray-200 py-12 px-6 text-center bg-white/80">
        <p className="text-gray-500 font-serif">Watercolor Art Style © 2026 - Painted with care</p>
      </footer>
    </div>
  );
}
