"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Square, Circle, ChevronDown, ChevronUp,
  Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Zap
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(68);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { name: "Black", value: "#000000", description: "Primary" },
    { name: "White", value: "#ffffff", description: "Background" },
    { name: "Accent Red", value: "#ff0000", description: "Highlight" },
    { name: "Electric Blue", value: "#0066ff", description: "Secondary" },
    { name: "Neon Yellow", value: "#ffff00", description: "Accent" },
  ];

  const tabs = ["Form", "Grid", "Type"];

  const accordionItems = [
    { title: "WHAT IS SWISS POSTER?", content: "A bold, experimental design style inspired by Swiss graphic design and music festival posters, featuring massive typography, strict grid systems, and limited color palettes for maximum impact." },
    { title: "CORE PRINCIPLES", content: "Experimental typography, asymmetric grid layouts, high contrast color blocking, geometric shapes as decorative elements, and hierarchy through scale rather than decoration." },
    { title: "BEST APPLICATIONS", content: "Perfect for music festivals, cultural events, art exhibitions, design studios, and any brand wanting to make a bold, memorable statement with experimental visual language." },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-black hover:text-[#ff0000] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black text-xl uppercase tracking-tighter">BACK</span>
          </Link>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-[#ff0000]"></div>
            <div className="w-6 h-6 bg-black"></div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <ShowcaseHero
        title="SWISS POSTER"
        subtitle="EXPERIMENTAL TYPOGRAPHY"
        description="Bold type. Strict grids. Maximum impact through minimal color and massive scale."
        className="relative py-32 px-6 overflow-hidden bg-white"
        titleClassName="text-[12rem] md:text-[18rem] font-black leading-[0.85] mb-8 tracking-tighter"
        subtitleClassName="text-2xl font-black tracking-[0.5em] uppercase mb-6"
        descriptionClassName="text-xl max-w-2xl leading-tight"
      >
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#ff0000] -rotate-12 opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full border-8 border-[#0066ff] opacity-30"></div>
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection
        title="METRICS"
        subtitle="By the numbers"
        className="py-20 px-6 bg-black text-white"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-white/60 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-1">
          {[
            { icon: Users, label: "VISITORS", value: "24.8K", bg: "#ff0000" },
            { icon: TrendingUp, label: "GROWTH", value: "+156%", bg: "#0066ff" },
            { icon: Eye, label: "VIEWS", value: "892K", bg: "#ffff00" },
            { icon: Zap, label: "IMPACT", value: "MAX", bg: "#000000" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-8 flex flex-col items-center justify-center border-4 border-white"
              style={{ backgroundColor: stat.bg }}
            >
              <stat.icon className={`w-12 h-12 mb-4 ${stat.bg === '#ffff00' ? 'text-black' : 'text-white'}`} />
              <p className={`text-5xl font-black mb-2 ${stat.bg === '#ffff00' ? 'text-black' : 'text-white'}`}>{stat.value}</p>
              <p className={`text-xs font-bold uppercase tracking-wider ${stat.bg === '#ffff00' ? 'text-black/60' : 'text-white/60'}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="PALETTE"
        subtitle="Limited colors"
        className="py-20 px-6"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-gray-500 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <ColorPaletteGrid colors={colors} className="max-w-5xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="TYPE"
        subtitle="Massive scale"
        className="py-20 px-6 bg-[#ff0000] text-white"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-white/60 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="border-8 border-white p-12 bg-black">
            <h1 className="text-9xl font-black leading-[0.9] tracking-tighter">BOLD</h1>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="bg-black p-8">
              <h2 className="text-5xl font-black text-white tracking-tighter">GRID</h2>
            </div>
            <div className="bg-[#0066ff] p-8">
              <h2 className="text-5xl font-black text-white tracking-tighter">SYSTEM</h2>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="ACTIONS"
        subtitle="Interactive"
        className="py-20 px-6 bg-white"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-gray-500 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center">
          <button className="px-12 py-6 bg-black text-white font-black text-xl uppercase tracking-tighter hover:bg-[#ff0000] transition-colors">
            PRIMARY
          </button>
          <button className="px-12 py-6 bg-[#ff0000] text-white font-black text-xl uppercase tracking-tighter hover:bg-black transition-colors">
            ALERT
          </button>
          <button className="px-12 py-6 border-4 border-black text-black font-black text-xl uppercase tracking-tighter hover:bg-black hover:text-white transition-colors">
            OUTLINE
          </button>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="BLOCKS"
        subtitle="Content grid"
        className="py-20 px-6 bg-black text-white"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-white/60 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-1">
          {[
            { title: "01", subtitle: "FORM", desc: "Typography at massive scale", bg: "#ff0000" },
            { title: "02", subtitle: "GRID", desc: "Strict alignment systems", bg: "#0066ff" },
            { title: "03", subtitle: "COLOR", desc: "Limited bold palette", bg: "#ffff00" },
          ].map((card, i) => (
            <div key={i} className="p-8 border-4 border-white" style={{ backgroundColor: card.bg }}>
              <p className={`text-8xl font-black mb-4 ${card.bg === '#ffff00' ? 'text-black' : 'text-white'}`}>{card.title}</p>
              <h3 className={`text-3xl font-black mb-3 tracking-tighter ${card.bg === '#ffff00' ? 'text-black' : 'text-white'}`}>{card.subtitle}</h3>
              <p className={card.bg === '#ffff00' ? 'text-black/70' : 'text-white/70'}>{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="TABS"
        subtitle="Navigation"
        className="py-20 px-6"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-gray-500 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-black">
            <div className="flex border-b-4 border-black">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 px-8 py-6 font-black text-xl uppercase tracking-tighter transition-colors ${
                    activeTab === index
                      ? "bg-black text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-12 min-h-[200px] bg-white">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-4xl font-black mb-4 tracking-tighter">FORM FOLLOWS FUNCTION</h4>
                  <p className="text-lg text-gray-700">Every element serves a purpose. No decoration for decoration's sake.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-4xl font-black mb-4 tracking-tighter">GRID STRUCTURE</h4>
                  <p className="text-lg text-gray-700">Mathematical precision creates visual harmony and perfect alignment.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-4xl font-black mb-4 tracking-tighter">TYPOGRAPHIC HIERARCHY</h4>
                  <p className="text-lg text-gray-700">Scale and weight create hierarchy without decorative elements.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="FAQ"
        subtitle="Expandable"
        className="py-20 px-6 bg-[#0066ff] text-white"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-white/60 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <div className="max-w-4xl mx-auto space-y-1">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white text-black border-4 border-black">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
              >
                <span className="font-black text-xl uppercase tracking-tighter">{item.title}</span>
                {openAccordion === index ? (
                  <ChevronUp className="w-8 h-8" />
                ) : (
                  <ChevronDown className="w-8 h-8" />
                )}
              </button>
              {openAccordion === index && (
                <div className="px-8 pb-8">
                  <p className="text-lg leading-relaxed">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="ALERTS"
        subtitle="System messages"
        className="py-20 px-6"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-gray-500 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <div className="max-w-4xl mx-auto space-y-1">
          {[
            { icon: Check, label: "SUCCESS", desc: "Operation completed", bg: "#000000" },
            { icon: AlertTriangle, label: "WARNING", desc: "Review required", bg: "#ffff00", text: "black" },
            { icon: X, label: "ERROR", desc: "Action failed", bg: "#ff0000" },
            { icon: Info, label: "INFO", desc: "New information", bg: "#0066ff" },
          ].map((alert, i) => (
            <div key={i} className="flex items-center gap-6 p-6 border-4 border-black" style={{ backgroundColor: alert.bg }}>
              <alert.icon className={`w-12 h-12 ${alert.text === 'black' ? 'text-black' : 'text-white'}`} />
              <div>
                <p className={`font-black text-2xl uppercase tracking-tighter ${alert.text === 'black' ? 'text-black' : 'text-white'}`}>{alert.label}</p>
                <p className={`text-lg ${alert.text === 'black' ? 'text-black/70' : 'text-white/70'}`}>{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="TOGGLES"
        subtitle="Controls"
        className="py-20 px-6 bg-black text-white"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-white/60 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-white p-12 space-y-8">
            {[
              { label: "GRID SYSTEM", desc: "Enable layout grid", color: "#ff0000" },
              { label: "HIGH CONTRAST", desc: "Maximum readability", color: "#0066ff" },
              { label: "BOLD TYPE", desc: "Heavy weight fonts", color: "#ffff00" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-6 border-b-2 border-white/20 last:border-b-0">
                <div>
                  <p className="font-black text-2xl uppercase tracking-tighter">{item.label}</p>
                  <p className="text-white/60 mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className="relative w-20 h-10 border-4 border-white transition-all"
                  style={{ backgroundColor: toggleStates[index] ? item.color : '#333' }}
                >
                  <span
                    className="absolute top-0 w-8 h-8 bg-white transition-all"
                    style={{ left: toggleStates[index] ? 'calc(100% - 32px)' : '0' }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="PROGRESS"
        subtitle="Loading states"
        className="py-20 px-6"
        titleClassName="text-7xl font-black mb-4 text-center tracking-tighter"
        subtitleClassName="text-gray-500 mb-16 text-center uppercase tracking-[0.3em]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="border-4 border-black p-12 space-y-12">
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="font-black text-3xl uppercase tracking-tighter">LOADING</p>
                <p className="text-2xl font-black">{progress}%</p>
              </div>
              <div className="h-8 bg-gray-200 border-4 border-black">
                <div
                  className="h-full bg-black transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div>
              <p className="font-black text-3xl uppercase tracking-tighter mb-4">STAGES</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((val, i) => (
                  <div key={i}>
                    <div className="h-6 bg-gray-200 border-2 border-black">
                      <div
                        className="h-full transition-all"
                        style={{ 
                          width: `${val}%`,
                          backgroundColor: val === 100 ? '#000000' : val > 0 ? '#ff0000' : 'transparent'
                        }}
                      />
                    </div>
                    <p className="text-sm font-bold mt-2 text-center">{i + 1}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-8 border-t-4 border-black">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-8 py-4 border-4 border-black text-black font-black uppercase hover:bg-black hover:text-white transition-colors"
              >
                LESS
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-8 py-4 bg-black text-white font-black uppercase border-4 border-black hover:bg-[#ff0000] transition-colors"
              >
                MORE
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="border-t-4 border-black py-16 px-6 text-center">
        <p className="text-xl font-black uppercase tracking-tighter">
          SWISS POSTER STYLE © 2026
        </p>
      </footer>
    </div>
  );
}
