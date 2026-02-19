"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Hexagon, Layers, Grid3X3, Triangle,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Scissors, Hammer,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Kente Orange", hex: "#c4501f", bg: "bg-[#c4501f]" },
  { name: "Dark Wood", hex: "#2c1810", bg: "bg-[#2c1810]" },
  { name: "Gold", hex: "#f0c75e", bg: "bg-[#f0c75e]" },
  { name: "Forest Green", hex: "#1a5632", bg: "bg-[#1a5632]" },
  { name: "Sand", hex: "#e8d5b5", bg: "bg-[#e8d5b5]", border: true },
  { name: "Terracotta", hex: "#a0522d", bg: "bg-[#a0522d]" },
  { name: "Deep Sienna", hex: "#8b4513", bg: "bg-[#8b4513]" },
  { name: "Warm Clay", hex: "#d4956a", bg: "bg-[#d4956a]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Weave", icon: Grid3X3 },
    { label: "Craft", icon: Scissors },
    { label: "Build", icon: Hammer },
  ];

  const accordionItems = [
    { title: "What is African Textile Design?", content: "African Textile design draws from the rich weaving traditions of Kente cloth from Ghana and Adire indigo dyeing of the Yoruba people. Bold geometric patterns carry cultural meaning, while earth tones ground the visual language in the African landscape." },
    { title: "The Kente Tradition", content: "Kente cloth, known as nwentoma or 'woven cloth' among the Akan, is one of Africa's most recognized textiles. Each pattern combination carries specific proverbs, historical events, or philosophical concepts. The interplay of bold colors represents social values and collective identity." },
    { title: "Geometry as Storytelling", content: "In African textile arts, geometric patterns are not merely decorative. Zigzags represent life's journey, diamonds represent the dual nature of existence, and interlocking shapes symbolize community bonds. Every woven thread is a word in a visual language passed through generations." },
  ];

  return (
    <div className="min-h-screen bg-[#2c1810] text-[#e8d5b5]">
      {/* Kente stripe top decoration */}
      <div className="w-full h-2 flex">
        <div className="flex-1 bg-[#c4501f]" />
        <div className="flex-1 bg-[#f0c75e]" />
        <div className="flex-1 bg-[#1a5632]" />
        <div className="flex-1 bg-[#c4501f]" />
        <div className="flex-1 bg-[#f0c75e]" />
        <div className="flex-1 bg-[#1a5632]" />
      </div>

      {/* Navigation */}
      <nav className="px-6 py-5 border-b-2 border-[#f0c75e]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/african-textile"
            className="flex items-center gap-2 text-[#f0c75e] hover:text-[#e8d5b5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-[#c4501f]" />
              <div className="w-3 h-3 bg-[#f0c75e]" />
              <div className="w-3 h-3 bg-[#1a5632]" />
            </div>
            <span className="font-bold text-lg uppercase tracking-widest text-[#e8d5b5]">
              African Textile
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-[#c4501f] border-2 border-[#f0c75e] rounded-lg shadow-[2px_2px_0px_#f0c75e] hover:shadow-[4px_4px_0px_#f0c75e] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-12 h-full flex flex-col gap-0">
          <div className="flex-1 bg-[#f0c75e]/5 border-r-2 border-[#f0c75e]/20" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="flex gap-2 justify-center mb-8">
            <div className="w-8 h-2 bg-[#c4501f] rounded-sm" />
            <div className="w-8 h-2 bg-[#f0c75e] rounded-sm" />
            <div className="w-8 h-2 bg-[#1a5632] rounded-sm" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#e8d5b5] mb-8 leading-tight uppercase tracking-widest">
            Woven
            <span className="block text-[#f0c75e]">Traditions</span>
          </h1>
          <p className="text-lg text-[#f0c75e]/70 max-w-xl mx-auto leading-relaxed tracking-wide">
            Patterns woven from the heart of the continent, carrying stories across generations.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Heritage metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Artisans", value: "1,247" },
            { icon: TrendingUp, label: "Growth", value: "+26%" },
            { icon: Eye, label: "Views", value: "198K" },
            { icon: Heart, label: "Saves", value: "4,832" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#e8d5b5] rounded-lg border-2 border-[#2c1810] shadow-[4px_4px_0px_#2c1810]"
            >
              <stat.icon className="w-5 h-5 text-[#c4501f] mb-4" />
              <p className="text-3xl font-bold text-[#2c1810] mb-1">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-[#c4501f]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Earth tones and heritage hues"
        className="py-16 px-6 bg-[#e8d5b5]/5"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden border-2 border-[#2c1810] bg-[#e8d5b5] shadow-[2px_2px_0px_#2c1810]"
            labelClassName="text-sm font-bold text-[#2c1810] uppercase tracking-wider"
            hexClassName="text-xs text-[#c4501f] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Bold and grounded"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#e8d5b5] rounded-lg border-2 border-[#2c1810] shadow-[4px_4px_0px_#2c1810]">
            <div className="flex gap-1 mb-6">
              <div className="w-4 h-4 bg-[#c4501f]" />
              <div className="w-4 h-4 bg-[#f0c75e]" />
              <div className="w-4 h-4 bg-[#1a5632]" />
            </div>
            <p className="text-6xl font-bold text-[#2c1810] mb-4 leading-tight uppercase tracking-widest">Heading</p>
            <p className="text-4xl font-bold text-[#2c1810] mb-4 uppercase tracking-wider">Subheading</p>
            <p className="text-xl text-[#2c1810]/70 mb-4 leading-relaxed tracking-wide">
              Body text rooted in the earth. Strong, purposeful, carrying the weight of tradition.
            </p>
            <p className="text-sm text-[#c4501f] tracking-widest uppercase font-bold">
              Caption text with artisan precision
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Bold and handcrafted"
        className="py-16 px-6 bg-[#e8d5b5]/5"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#e8d5b5] rounded-lg border-2 border-[#2c1810] shadow-[4px_4px_0px_#2c1810]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#c4501f] text-[#e8d5b5] font-bold uppercase tracking-widest rounded-lg border-2 border-[#f0c75e] shadow-[4px_4px_0px_#2c1810] hover:shadow-[6px_6px_0px_#2c1810] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#e8d5b5] text-[#2c1810] font-bold uppercase tracking-widest rounded-lg border-2 border-[#2c1810] shadow-[4px_4px_0px_#2c1810] hover:shadow-[6px_6px_0px_#2c1810] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                Secondary
              </button>
              <button className="px-6 py-3 bg-[#1a5632] text-[#e8d5b5] font-bold uppercase tracking-widest rounded-lg border-2 border-[#f0c75e] shadow-[4px_4px_0px_#2c1810] hover:shadow-[6px_6px_0px_#2c1810] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                Accent
              </button>
              <button className="px-6 py-3 bg-[#f0c75e] text-[#2c1810] font-bold uppercase tracking-widest rounded-lg border-2 border-[#2c1810] shadow-[4px_4px_0px_#2c1810] hover:shadow-[6px_6px_0px_#2c1810] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                Gold
              </button>
              <button className="px-6 py-3 bg-[#2c1810]/30 text-[#e8d5b5]/40 font-bold uppercase tracking-widest rounded-lg border-2 border-[#e8d5b5]/20 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Woven containers"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Layers, title: "Kente", desc: "The royal cloth of the Ashanti, each pattern a proverb woven in color. Gold for royalty, green for fertility, red for passion and sacrifice." },
            { icon: Hexagon, title: "Adire", desc: "Yoruba indigo-dyed cloth tells stories through resist techniques. Cassava paste creates patterns passed down through women for generations." },
            { icon: Triangle, title: "Geometry", desc: "Angular patterns encode wisdom. Zigzags trace life's journey, diamonds mark duality, and interlocking shapes bind the community together." },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-[#e8d5b5] rounded-lg border-2 border-[#2c1810] shadow-[4px_4px_0px_#2c1810] hover:shadow-[6px_6px_0px_#2c1810] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 group">
              <div className="flex gap-1 mb-4">
                <div className="w-4 h-4 bg-[#c4501f]" />
                <div className="w-4 h-4 bg-[#f0c75e]" />
                <div className="w-4 h-4 bg-[#1a5632]" />
              </div>
              <card.icon className="w-6 h-6 text-[#c4501f] mb-4 group-hover:text-[#1a5632] transition-colors" />
              <h3 className="text-lg font-bold text-[#2c1810] mb-3 uppercase tracking-wider">{card.title}</h3>
              <p className="text-sm text-[#2c1810]/60 leading-relaxed tracking-wide">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Craft navigation"
        className="py-16 px-6 bg-[#e8d5b5]/5"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#e8d5b5] rounded-lg border-2 border-[#2c1810] shadow-[4px_4px_0px_#2c1810] overflow-hidden">
            <div className="flex border-b-2 border-[#2c1810]/30">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-200 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#c4501f] border-[#c4501f] bg-[#c4501f]/10"
                      : "text-[#2c1810]/50 border-transparent hover:text-[#2c1810]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-bold text-[#2c1810] mb-2 uppercase tracking-wider">The Loom</h4>
                  <p className="text-sm text-[#2c1810]/60 leading-relaxed tracking-wide">Rhythmic clacking of the loom fills the workshop as threads of gold, green, and orange intertwine. Each pass of the shuttle adds another line to a story centuries in the making.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-[#2c1810] mb-2 uppercase tracking-wider">Hand and Heart</h4>
                  <p className="text-sm text-[#2c1810]/60 leading-relaxed tracking-wide">Skilled hands apply cassava resist paste in precise patterns before the fabric plunges into indigo depths. Each piece emerges unique, bearing the signature of its maker.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-[#2c1810] mb-2 uppercase tracking-wider">Structure and Soul</h4>
                  <p className="text-sm text-[#2c1810]/60 leading-relaxed tracking-wide">From compound walls to digital interfaces, the same geometric principles guide the eye and ground the spirit. Strong lines, purposeful spacing, honest materials.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Layered knowledge"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#e8d5b5] rounded-lg border-2 border-[#2c1810] overflow-hidden shadow-[2px_2px_0px_#2c1810]">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#c4501f]/10 transition-colors"
              >
                <span className="font-bold text-[#2c1810] uppercase tracking-wider">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#c4501f] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-2 border-[#2c1810]/20">
                  <p className="text-sm text-[#2c1810]/60 leading-relaxed tracking-wide pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Earth-tone notices"
        className="py-16 px-6 bg-[#e8d5b5]/5"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#1a5632]/20 rounded-lg border-l-4 border-[#1a5632]">
            <Check className="w-4 h-4 text-[#1a5632] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#1a5632]">Pattern saved</p>
              <p className="text-xs text-[#1a5632]/70 mt-0.5">Your weave design has been preserved.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#f0c75e]/20 rounded-lg border-l-4 border-[#f0c75e]">
            <AlertTriangle className="w-4 h-4 text-[#f0c75e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#f0c75e]">Attention needed</p>
              <p className="text-xs text-[#f0c75e]/70 mt-0.5">Thread tension may need adjustment before continuing.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#c4501f]/20 rounded-lg border-l-4 border-[#c4501f]">
            <X className="w-4 h-4 text-[#c4501f] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#c4501f]">Thread broke</p>
              <p className="text-xs text-[#c4501f]/70 mt-0.5">The weave encountered an issue. Please re-thread and try again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#e8d5b5]/30 rounded-lg border-l-4 border-[#e8d5b5]">
            <Info className="w-4 h-4 text-[#e8d5b5] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#e8d5b5]">Tradition note</p>
              <p className="text-xs text-[#e8d5b5]/70 mt-0.5">Each Kente pattern carries a unique cultural meaning.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#e8d5b5] rounded-lg border-2 border-[#2c1810] p-6 space-y-5 shadow-[4px_4px_0px_#2c1810]">
            {[
              { label: "Woven Texture Overlay", desc: "Display subtle textile grain across surfaces" },
              { label: "Geometric Decorations", desc: "Show Kente-inspired pattern blocks" },
              { label: "Earth Tone Palette", desc: "Lock colors to traditional earth pigments" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-bold text-[#2c1810] uppercase tracking-wider">{item.label}</p>
                  <p className="text-xs text-[#2c1810]/50 mt-0.5 tracking-wide">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-lg transition-all duration-200 ${
                    toggleStates[index] ? "bg-[#c4501f]" : "bg-[#2c1810]/30"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-[#e8d5b5] rounded-md shadow-sm transition-transform duration-200 ${
                      toggleStates[index] ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress"
        subtitle="Weaving advancement"
        className="py-16 px-6 bg-[#e8d5b5]/5"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#e8d5b5] rounded-lg border-2 border-[#2c1810] p-6 space-y-6 shadow-[4px_4px_0px_#2c1810]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-[#2c1810] uppercase tracking-wider">Weave progress</p>
                <p className="text-xs text-[#c4501f] font-mono">{progress}%</p>
              </div>
              <div className="h-2 bg-[#2c1810]/20 rounded-lg">
                <div
                  className="h-full bg-[#c4501f] rounded-lg transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-[#2c1810] mb-2 uppercase tracking-wider">Pattern sections</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-2 bg-[#2c1810]/20 rounded-lg">
                      <div
                        className={`h-full rounded-lg transition-all ${value === 100 ? "bg-[#1a5632]" : value > 0 ? "bg-[#f0c75e]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#c4501f] mt-1 text-center font-bold uppercase tracking-wider">Row {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-2 border-[#2c1810]/20">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-bold uppercase tracking-widest border-2 border-[#2c1810] text-[#2c1810] rounded-lg shadow-[2px_2px_0px_#2c1810] hover:shadow-[4px_4px_0px_#2c1810] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                Unweave
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-bold uppercase tracking-widest bg-[#c4501f] text-[#e8d5b5] rounded-lg border-2 border-[#f0c75e] shadow-[2px_2px_0px_#2c1810] hover:shadow-[4px_4px_0px_#2c1810] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                Weave On
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Artisan inputs"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2"
        subtitleClassName="text-sm text-[#f0c75e]/70 tracking-wide mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#e8d5b5] rounded-lg border-2 border-[#2c1810] p-8 shadow-[4px_4px_0px_#2c1810]">
            <div className="flex gap-1 mb-6">
              <div className="w-4 h-4 bg-[#c4501f]" />
              <div className="w-4 h-4 bg-[#f0c75e]" />
              <div className="w-4 h-4 bg-[#1a5632]" />
              <div className="w-4 h-4 bg-[#c4501f]" />
              <div className="w-4 h-4 bg-[#f0c75e]" />
            </div>
            <h3 className="text-lg font-bold text-[#2c1810] mb-6 uppercase tracking-wider">Commission a Piece</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-[#e8d5b5] border-2 border-[#2c1810]/40 rounded-lg text-[#2c1810] placeholder-[#2c1810]/40 font-medium tracking-wide focus:outline-none focus:border-[#c4501f] focus:shadow-[0_0_0_3px_rgba(196,80,31,0.2)] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[#e8d5b5] border-2 border-[#2c1810]/40 rounded-lg text-[#2c1810] placeholder-[#2c1810]/40 font-medium tracking-wide focus:outline-none focus:border-[#c4501f] focus:shadow-[0_0_0_3px_rgba(196,80,31,0.2)] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">Details</label>
                <textarea
                  placeholder="Describe your vision..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#e8d5b5] border-2 border-[#2c1810]/40 rounded-lg text-[#2c1810] placeholder-[#2c1810]/40 font-medium tracking-wide focus:outline-none focus:border-[#c4501f] focus:shadow-[0_0_0_3px_rgba(196,80,31,0.2)] transition-all duration-200 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#c4501f] text-[#e8d5b5] font-bold uppercase tracking-widest rounded-lg border-2 border-[#f0c75e] shadow-[4px_4px_0px_#2c1810] hover:shadow-[6px_6px_0px_#2c1810] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 mt-2">
                Submit Order
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-2 border-[#f0c75e]/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex gap-1 justify-center mb-4">
            <div className="w-4 h-4 bg-[#c4501f]" />
            <div className="w-4 h-4 bg-[#f0c75e]" />
            <div className="w-4 h-4 bg-[#1a5632]" />
            <div className="w-4 h-4 bg-[#c4501f]" />
            <div className="w-4 h-4 bg-[#f0c75e]" />
          </div>
          <p className="text-xs text-[#f0c75e]/60 tracking-widest uppercase font-bold">
            African Textile Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#e8d5b5] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>

      {/* Kente stripe bottom decoration */}
      <div className="w-full h-2 flex">
        <div className="flex-1 bg-[#c4501f]" />
        <div className="flex-1 bg-[#f0c75e]" />
        <div className="flex-1 bg-[#1a5632]" />
        <div className="flex-1 bg-[#c4501f]" />
        <div className="flex-1 bg-[#f0c75e]" />
        <div className="flex-1 bg-[#1a5632]" />
      </div>
    </div>
  );
}
