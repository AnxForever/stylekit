"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Zap, Star, Swords, Shield,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Palette, Wand2, Sparkles
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Ink Black", hex: "#1a1a2e", bg: "bg-[#1a1a2e]" },
  { name: "Hero Red", hex: "#e63946", bg: "bg-[#e63946]" },
  { name: "Sky Blue", hex: "#4ea8de", bg: "bg-[#4ea8de]" },
  { name: "Leaf Green", hex: "#2ecc71", bg: "bg-[#2ecc71]" },
  { name: "Sun Yellow", hex: "#f1c40f", bg: "bg-[#f1c40f]" },
  { name: "Magic Purple", hex: "#9b59b6", bg: "bg-[#9b59b6]" },
  { name: "Fire Orange", hex: "#e67e22", bg: "bg-[#e67e22]" },
  { name: "Paper White", hex: "#fafaf5", bg: "bg-[#fafaf5]", border: true },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(70);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [hp, setHp] = useState(70);

  const tabs = [
    { label: "Inventory", icon: Palette },
    { label: "Skills", icon: Wand2 },
    { label: "Quests", icon: Sparkles },
  ];

  const accordionItems = [
    { title: "What is Cel Shading?", content: "Cel shading (also called toon shading) is a rendering technique that makes 3D objects appear flat and hand-drawn, like traditional animation cels. It uses bold outlines, flat color fills, and sharp shadow boundaries." },
    { title: "Visual Characteristics", content: "Bold black outlines (2-4px), flat color regions with no gradients, sharp shadow edges instead of smooth transitions, vibrant saturated colors, and exaggerated proportions." },
    { title: "Applications", content: "Video games (Zelda: Wind Waker, Jet Set Radio, Borderlands), animation-inspired interfaces, children's apps, and any design that aims for a playful, hand-drawn aesthetic." },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1a2e]">
      {/* Halftone pattern overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #1a1a2e 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-[#fafaf5] border-b-3 border-[#1a1a2e]" style={{ borderBottomWidth: '3px' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/cel-shading"
            className="flex items-center gap-2 text-[#1a1a2e] hover:text-[#e63946] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
            <span className="text-sm font-bold uppercase">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#f1c40f] fill-[#f1c40f]" />
            <span className="font-black text-xl text-[#1a1a2e] uppercase tracking-wider">
              CEL SHADING
            </span>
            <Zap className="w-5 h-5 text-[#e63946] fill-[#e63946]" />
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#e63946] text-white text-sm font-bold uppercase border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] hover:shadow-[1px_1px_0_#1a1a2e] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            style={{ borderWidth: '3px' }}
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Speed lines */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-[#1a1a2e]"
                style={{ width: `${60 - i * 12}px`, height: '3px' }}
              />
            ))}
          </div>
          <div className="inline-block mb-6 px-4 py-1.5 bg-[#f1c40f] border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] -rotate-2" style={{ borderWidth: '3px' }}>
            <span className="text-xs font-black uppercase tracking-wider text-[#1a1a2e]">Toon Shading Style</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-[#1a1a2e] mb-6 leading-none uppercase"
            style={{ textShadow: '4px 4px 0 #e63946' }}
          >
            Bold Lines,
            <span className="block text-[#4ea8de]" style={{ textShadow: '4px 4px 0 #1a1a2e' }}>
              Flat Colors!
            </span>
          </h1>
          <p className="text-lg font-bold text-[#1a1a2e]/70 max-w-xl mx-auto">
            Sharp outlines. Zero gradients. Maximum impact. Like your favorite cartoon, but as a UI.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="STATS"
        subtitle="Player metrics"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Party", value: "4/6", bg: "bg-[#e63946]" },
            { icon: TrendingUp, label: "Level", value: "42", bg: "bg-[#4ea8de]" },
            { icon: Eye, label: "Explored", value: "87%", bg: "bg-[#2ecc71]" },
            { icon: Heart, label: "HP", value: `${hp}/100`, bg: "bg-[#9b59b6]" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-5 bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e]"
              style={{ borderWidth: '3px' }}
            >
              <div className={`w-10 h-10 ${stat.bg} border-2 border-[#1a1a2e] flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <p className="text-3xl font-black text-[#1a1a2e] mb-1">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a2e]/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR PALETTE"
        subtitle="Flat, saturated, bold"
        className="relative z-10 py-16 px-6 bg-[#f0f0ea]"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] bg-white"
            colorBlockClassName="h-20 md:h-24"
            labelClassName="text-sm font-bold text-[#1a1a2e]"
            hexClassName="text-xs text-[#1a1a2e]/50 font-mono font-bold"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="TYPOGRAPHY"
        subtitle="Big, bold, and loud"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e]" style={{ borderWidth: '3px' }}>
            <p className="text-5xl font-black text-[#1a1a2e] mb-4 uppercase" style={{ textShadow: '2px 2px 0 #4ea8de' }}>HEADING!</p>
            <p className="text-3xl font-bold text-[#e63946] mb-4 uppercase">Subheading</p>
            <p className="text-lg font-bold text-[#1a1a2e]/80 mb-4">
              Body text with strong weight. Cel shading demands confidence in every stroke.
            </p>
            <p className="text-sm font-bold text-[#1a1a2e]/50 uppercase tracking-wider">
              Caption -- Scene 47, Take 3
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="Action commands"
        className="relative z-10 py-16 px-6 bg-[#f0f0ea]"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e]" style={{ borderWidth: '3px' }}>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#e63946] text-white font-black uppercase text-sm border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] hover:shadow-[1px_1px_0_#1a1a2e] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all" style={{ borderWidth: '3px' }}>
                Attack!
              </button>
              <button className="px-6 py-3 bg-[#4ea8de] text-white font-black uppercase text-sm border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] hover:shadow-[1px_1px_0_#1a1a2e] hover:translate-x-0.5 hover:translate-y-0.5 transition-all" style={{ borderWidth: '3px' }}>
                Defend
              </button>
              <button className="px-6 py-3 bg-[#2ecc71] text-white font-black uppercase text-sm border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] hover:shadow-[1px_1px_0_#1a1a2e] hover:translate-x-0.5 hover:translate-y-0.5 transition-all" style={{ borderWidth: '3px' }}>
                Heal
              </button>
              <button className="px-6 py-3 bg-[#f1c40f] text-[#1a1a2e] font-black uppercase text-sm border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] hover:shadow-[1px_1px_0_#1a1a2e] hover:translate-x-0.5 hover:translate-y-0.5 transition-all" style={{ borderWidth: '3px' }}>
                Special
              </button>
              <button className="px-6 py-3 bg-[#ddd] text-[#999] font-black uppercase text-sm border-3 border-[#999] cursor-not-allowed" style={{ borderWidth: '3px' }}>
                Locked
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="Character profiles"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Swords, title: "Warrior", desc: "Brave frontline fighter with heavy armor and unbreakable spirit.", color: "bg-[#e63946]", shadow: "#e63946" },
            { icon: Wand2, title: "Mage", desc: "Master of arcane arts, wielding elemental forces with precision.", color: "bg-[#9b59b6]", shadow: "#9b59b6" },
            { icon: Shield, title: "Tank", desc: "Immovable defender who shields allies from all harm.", color: "bg-[#4ea8de]", shadow: "#4ea8de" },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[6px_6px_0_#1a1a2e] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all" style={{ borderWidth: '3px' }}>
              <div className={`w-12 h-12 ${card.color} border-3 border-[#1a1a2e] flex items-center justify-center mb-4 -rotate-3`} style={{ borderWidth: '3px' }}>
                <card.icon className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-black text-[#1a1a2e] uppercase mb-2">{card.title}</h3>
              <p className="text-sm font-bold text-[#1a1a2e]/60">{card.desc}</p>
              <div className="mt-4 pt-3 border-t-3 border-[#1a1a2e]/20" style={{ borderTopWidth: '3px' }}>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 3 + index ? "text-[#f1c40f] fill-[#f1c40f]" : "text-[#ddd]"}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="TABS"
        subtitle="Menu navigation"
        className="relative z-10 py-16 px-6 bg-[#f0f0ea]"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e]" style={{ borderWidth: '3px' }}>
            <div className="flex border-b-3 border-[#1a1a2e]" style={{ borderBottomWidth: '3px' }}>
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3 font-bold uppercase text-sm transition-colors ${
                    activeTab === index
                      ? "bg-[#e63946] text-white"
                      : "text-[#1a1a2e]/50 hover:text-[#1a1a2e] hover:bg-[#f0f0ea]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" strokeWidth={3} />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-xl font-black text-[#1a1a2e] uppercase mb-2">Inventory</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Iron Sword", "Health Potion x3", "Magic Shield"].map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-[#f1c40f] text-[#1a1a2e] font-bold text-xs uppercase border-2 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-xl font-black text-[#9b59b6] uppercase mb-2">Skill Tree</h4>
                  <p className="font-bold text-[#1a1a2e]/60">3 skill points available. 12 skills unlocked.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-xl font-black text-[#2ecc71] uppercase mb-2">Active Quests</h4>
                  <p className="font-bold text-[#1a1a2e]/60">2 main quests, 5 side quests in progress.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="ACCORDION"
        subtitle="Info panels"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e]" style={{ borderWidth: '3px' }}>
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#f0f0ea] transition-colors"
              >
                <span className="font-black text-[#1a1a2e] uppercase">{item.title}</span>
                <div className={`w-7 h-7 bg-[#f1c40f] border-2 border-[#1a1a2e] flex items-center justify-center transition-transform ${openAccordion === index ? "rotate-180" : ""}`}>
                  <ChevronDown className="w-4 h-4 text-[#1a1a2e]" strokeWidth={3} />
                </div>
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-3 border-[#1a1a2e]/20" style={{ borderTopWidth: '3px' }}>
                  <p className="font-bold text-[#1a1a2e]/60 pt-4">{item.content}</p>
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
        className="relative z-10 py-16 px-6 bg-[#f0f0ea]"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-3 p-4 bg-[#2ecc71] border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e]" style={{ borderWidth: '3px' }}>
            <Check className="w-5 h-5 text-white shrink-0" strokeWidth={3} />
            <div>
              <p className="font-black text-white uppercase text-sm">Quest Complete!</p>
              <p className="font-bold text-white/70 text-xs">+500 XP earned.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#f1c40f] border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e]" style={{ borderWidth: '3px' }}>
            <AlertTriangle className="w-5 h-5 text-[#1a1a2e] shrink-0" strokeWidth={3} />
            <div>
              <p className="font-black text-[#1a1a2e] uppercase text-sm">Watch Out!</p>
              <p className="font-bold text-[#1a1a2e]/70 text-xs">Enemy approaching from the east.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#e63946] border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e]" style={{ borderWidth: '3px' }}>
            <X className="w-5 h-5 text-white shrink-0" strokeWidth={3} />
            <div>
              <p className="font-black text-white uppercase text-sm">Game Over!</p>
              <p className="font-bold text-white/70 text-xs">Your party has been defeated.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#4ea8de] border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e]" style={{ borderWidth: '3px' }}>
            <Info className="w-5 h-5 text-white shrink-0" strokeWidth={3} />
            <div>
              <p className="font-black text-white uppercase text-sm">Pro Tip</p>
              <p className="font-bold text-white/70 text-xs">Use healing items before boss fights.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="TOGGLE"
        subtitle="Settings switches"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] p-6 space-y-4" style={{ borderWidth: '3px' }}>
            {[
              { label: "Sound Effects", desc: "POW! BAM! WHOOSH!", color: "bg-[#e63946]" },
              { label: "Speed Lines", desc: "Dynamic action lines", color: "bg-[#4ea8de]" },
              { label: "Screen Shake", desc: "Impact feedback", color: "bg-[#2ecc71]" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b-3 border-[#1a1a2e]/10 last:border-b-0" style={{ borderBottomWidth: index < 2 ? '3px' : '0' }}>
                <div>
                  <p className="font-black text-[#1a1a2e] uppercase text-sm">{item.label}</p>
                  <p className="font-bold text-[#1a1a2e]/40 text-xs">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-14 h-8 border-3 border-[#1a1a2e] transition-colors ${
                    toggleStates[index] ? item.color : "bg-[#ddd]"
                  }`}
                  style={{ borderWidth: '3px' }}
                >
                  <span
                    className={`absolute top-0 w-6 h-[calc(100%)] bg-white border-r-3 border-[#1a1a2e] transition-all ${
                      toggleStates[index] ? "left-[calc(100%-24px)]" : "left-0"
                    }`}
                    style={{ borderRightWidth: '3px' }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress / HP Bar */}
      <ShowcaseSection
        title="HP BAR"
        subtitle="Health & progress"
        className="relative z-10 py-16 px-6 bg-[#f0f0ea]"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] p-6 space-y-6" style={{ borderWidth: '3px' }}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-black text-[#1a1a2e] uppercase text-sm">HP</p>
                <p className="font-black text-[#e63946] text-sm">{hp}/100</p>
              </div>
              <div className="h-6 bg-[#ddd] border-3 border-[#1a1a2e]" style={{ borderWidth: '3px' }}>
                <div
                  className={`h-full transition-all duration-500 ${
                    hp > 50 ? "bg-[#2ecc71]" : hp > 25 ? "bg-[#f1c40f]" : "bg-[#e63946]"
                  }`}
                  style={{ width: `${hp}%` }}
                />
              </div>
            </div>
            <div>
              <p className="font-black text-[#1a1a2e] uppercase text-sm mb-2">Boss Stages</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 100, color: "bg-[#2ecc71]" },
                  { value: 100, color: "bg-[#4ea8de]" },
                  { value: hp, color: "bg-[#f1c40f]" },
                  { value: 0, color: "bg-[#e63946]" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="h-4 bg-[#ddd] border-2 border-[#1a1a2e]">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <p className="text-xs font-bold text-[#1a1a2e]/40 mt-1 text-center uppercase">Ph.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t-3 border-[#1a1a2e]/20" style={{ borderTopWidth: '3px' }}>
              <button
                onClick={() => setHp(Math.max(0, hp - 15))}
                className="px-5 py-2 bg-[#e63946] text-white font-black uppercase text-sm border-3 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                style={{ borderWidth: '3px' }}
              >
                Damage
              </button>
              <button
                onClick={() => setHp(Math.min(100, hp + 15))}
                className="px-5 py-2 bg-[#2ecc71] text-white font-black uppercase text-sm border-3 border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
                style={{ borderWidth: '3px' }}
              >
                Heal
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="Character creation"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-[#1a1a2e] uppercase mb-2"
        subtitleClassName="text-sm font-bold text-[#1a1a2e]/50 uppercase mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white border-3 border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] p-8" style={{ borderWidth: '3px' }}>
            <h3 className="text-xl font-black text-[#1a1a2e] uppercase mb-6">New Character</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#1a1a2e] mb-2">Hero Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-2.5 bg-[#fafaf5] border-3 border-[#1a1a2e] text-[#1a1a2e] font-bold placeholder-[#1a1a2e]/30 focus:outline-none focus:border-[#e63946] transition-colors"
                  style={{ borderWidth: '3px' }}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#1a1a2e] mb-2">Class</label>
                <select className="w-full px-4 py-2.5 bg-[#fafaf5] border-3 border-[#1a1a2e] text-[#1a1a2e] font-bold focus:outline-none focus:border-[#e63946] transition-colors" style={{ borderWidth: '3px' }}>
                  <option>Warrior</option>
                  <option>Mage</option>
                  <option>Rogue</option>
                  <option>Tank</option>
                </select>
              </div>
              <button className="w-full py-3 bg-[#e63946] text-white font-black uppercase text-sm border-3 border-[#1a1a2e] shadow-[3px_3px_0_#1a1a2e] hover:shadow-[1px_1px_0_#1a1a2e] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all mt-2" style={{ borderWidth: '3px' }}>
                Start Adventure!
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 border-t-3 border-[#1a1a2e]" style={{ borderTopWidth: '3px' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-bold text-[#1a1a2e]/50 text-xs uppercase tracking-wider">
            Cel Shading Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#e63946] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
