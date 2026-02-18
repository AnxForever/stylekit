"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Sparkles, Layers, Palette, Zap,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Crown, Star, Flame,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Hot Pink", hex: "#d4145a", bg: "bg-[#d4145a]" },
  { name: "Deep Navy", hex: "#1a0a2e", bg: "bg-[#1a0a2e]" },
  { name: "Vivid Yellow", hex: "#ffbe0b", bg: "bg-[#ffbe0b]" },
  { name: "Electric Blue", hex: "#3a86ff", bg: "bg-[#3a86ff]" },
  { name: "Vivid Purple", hex: "#8338ec", bg: "bg-[#8338ec]" },
  { name: "Emerald", hex: "#06d6a0", bg: "bg-[#06d6a0]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Gallery", icon: Crown },
    { label: "Studio", icon: Star },
    { label: "Archive", icon: Flame },
  ];

  const accordionItems = [
    { title: "What is Maximalism?", content: "Maximalism is the direct rebellion against minimalism. It believes that more is more, rejecting the restraint of whitespace and embracing layering, decoration, and visual richness. From Baroque palaces to Bohemian interiors, maximalism is the natural product of human expressive desire." },
    { title: "Core Principles", content: "Layered richness with multiple visual elements stacked together. Saturated clashing colors that reject muted palettes. Mixed typography combining serif, sans-serif, and monospace. Decorative borders using double lines, dashed styles, and wave patterns." },
    { title: "When to Use It", content: "Maximalism suits fashion brands, art exhibitions, music festival sites, and creative portfolios that demand strong visual expression. It is not suited for efficiency-focused tools or minimal utility products." },
  ];

  return (
    <div className="min-h-screen bg-[#1a0a2e] text-white">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b-4 border-[#d4145a]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/maximalism"
            className="flex items-center gap-2 text-[#ffbe0b] hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-black uppercase tracking-widest">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffbe0b]" />
            <span className="font-serif font-black text-xl tracking-wider text-[#d4145a]">
              MAXIMALISM
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-black uppercase tracking-widest text-[#06d6a0] border-4 border-[#06d6a0] hover:bg-[#06d6a0] hover:text-[#1a0a2e] transition-all duration-200"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-[#ffbe0b]/10 blur-sm" />
        <div className="absolute bottom-20 left-16 w-48 h-48 rounded-full bg-[#3a86ff]/10 blur-sm" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 border-4 border-[#8338ec]/20 rotate-45" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1 mb-6 bg-[#ffbe0b] text-[#1a0a2e] font-mono font-bold text-xs uppercase tracking-[0.3em]">
            More Is More
          </div>
          <h1 className="text-6xl md:text-9xl font-serif font-black text-white mb-4 uppercase leading-none">
            MAXI<span className="text-[#d4145a]">MAL</span>ISM
          </h1>
          <p className="text-xl md:text-2xl text-[#8338ec] font-sans mb-10">
            Embrace the excess. Reject the blank.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-10 py-4 bg-gradient-to-r from-[#d4145a] to-[#8338ec] text-white font-black uppercase tracking-widest border-4 border-[#ffbe0b] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff] hover:shadow-[2px_2px_0px_#ffbe0b,4px_4px_0px_#3a86ff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
              Explore
            </button>
            <button className="px-10 py-4 bg-transparent text-[#06d6a0] font-bold uppercase tracking-widest border-4 border-[#06d6a0] shadow-[4px_4px_0px_#06d6a0] hover:bg-[#06d6a0] hover:text-[#1a0a2e] hover:shadow-[2px_2px_0px_#ffbe0b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Design metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Followers", value: "12,841", color: "#d4145a" },
            { icon: TrendingUp, label: "Growth", value: "+42%", color: "#ffbe0b" },
            { icon: Eye, label: "Views", value: "842K", color: "#3a86ff" },
            { icon: Heart, label: "Saves", value: "9,209", color: "#06d6a0" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#1a0a2e] border-4 border-[#d4145a] shadow-[4px_4px_0px_#ffbe0b]"
            >
              <stat.icon className="w-5 h-5 mb-4" style={{ color: stat.color }} />
              <p className="text-3xl font-serif font-black text-white mb-1">{stat.value}</p>
              <p className="text-xs font-mono uppercase tracking-widest text-[#8338ec]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Saturated clash colors"
        className="py-16 px-6 bg-[#d4145a]/10"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border-4 border-[#8338ec] bg-[#1a0a2e] shadow-[3px_3px_0px_#ffbe0b]"
            labelClassName="text-sm font-black text-white uppercase tracking-wider"
            hexClassName="text-xs text-[#8338ec] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Mixed and bold"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#1a0a2e] border-4 border-[#d4145a] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff]">
            <p className="text-6xl font-serif font-black text-[#ffbe0b] mb-4 leading-tight uppercase">Heading</p>
            <p className="text-4xl font-sans font-bold text-[#d4145a] mb-4">Subheading</p>
            <p className="text-xl font-sans text-[#8338ec] mb-4 leading-relaxed">
              Body text in sans-serif. Bold expression, layered with intention.
            </p>
            <p className="text-xs font-mono text-[#06d6a0] tracking-[0.3em] uppercase">
              Monospace caption -- every font has its place
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Loud and proud"
        className="py-16 px-6 bg-[#8338ec]/10"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#1a0a2e] border-4 border-[#8338ec] shadow-[4px_4px_0px_#d4145a]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-[#d4145a] to-[#8338ec] text-white font-black uppercase tracking-widest border-4 border-[#ffbe0b] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff] hover:shadow-[2px_2px_0px_#ffbe0b,4px_4px_0px_#3a86ff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                Primary
              </button>
              <button className="px-8 py-4 bg-transparent text-[#06d6a0] font-black uppercase tracking-widest border-4 border-[#06d6a0] shadow-[4px_4px_0px_#06d6a0] hover:bg-[#06d6a0] hover:text-[#1a0a2e] transition-all duration-200">
                Secondary
              </button>
              <button className="px-8 py-4 bg-[#ffbe0b] text-[#1a0a2e] font-black uppercase tracking-widest border-4 border-[#3a86ff] shadow-[4px_4px_0px_#3a86ff] hover:shadow-[2px_2px_0px_#3a86ff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                Accent
              </button>
              <button className="px-8 py-4 text-[#d4145a] font-black uppercase tracking-widest underline underline-offset-4 decoration-[#d4145a] decoration-4 hover:text-[#ffbe0b] hover:decoration-[#ffbe0b] transition-all duration-200">
                Text Link
              </button>
              <button className="px-8 py-4 bg-[#8338ec]/30 text-[#8338ec]/50 font-black uppercase tracking-widest border-4 border-[#8338ec]/30 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Layered containers"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Layers, title: "Layered", desc: "Multiple visual elements stacked together. Background patterns, decorative borders, shadows, and gradients combine.", color: "#d4145a", shadow: "#ffbe0b", badge: "Core" },
            { icon: Palette, title: "Saturated", desc: "Hot pink, vivid yellow, electric blue, purple, emerald -- bold combinations that reject muted palettes.", color: "#3a86ff", shadow: "#8338ec", badge: "Color" },
            { icon: Zap, title: "Dynamic", desc: "Rotation, skew, and scale transforms add movement. Every element fights for attention yet finds harmony.", color: "#06d6a0", shadow: "#d4145a", badge: "Motion" },
          ].map((card, index) => (
            <div key={index} className="relative">
              <div className="absolute -top-2 -left-2 w-full h-full rounded-sm" style={{ backgroundColor: card.shadow }} />
              <div className="absolute -top-1 -left-1 w-full h-full bg-[#3a86ff] rounded-sm" />
              <div className="relative p-8 bg-[#1a0a2e] border-4 rounded-sm shadow-[6px_6px_0px_#8338ec]" style={{ borderColor: card.color }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider" style={{ backgroundColor: card.shadow, color: "#1a0a2e" }}>
                    {card.badge}
                  </span>
                </div>
                <card.icon className="w-6 h-6 mb-3" style={{ color: card.color }} />
                <h3 className="text-2xl font-serif font-black uppercase mb-3" style={{ color: card.shadow }}>{card.title}</h3>
                <p className="text-sm text-[#8338ec]/80 font-sans leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-16 px-6 bg-[#3a86ff]/10"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a0a2e] border-4 border-[#8338ec] shadow-[4px_4px_0px_#ffbe0b] overflow-hidden">
            <div className="flex border-b-4 border-[#8338ec]/50">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-black uppercase tracking-widest transition-all duration-200 border-b-4 -mb-[4px] ${
                    activeTab === index
                      ? "text-[#ffbe0b] border-[#ffbe0b] bg-[#ffbe0b]/10"
                      : "text-[#8338ec]/60 border-transparent hover:text-[#d4145a]"
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
                  <h4 className="text-lg font-serif font-black text-[#d4145a] mb-2 uppercase">Visual Gallery</h4>
                  <p className="text-sm text-[#8338ec] font-sans leading-relaxed">A feast of color and pattern. Every surface decorated, every corner filled with visual energy that demands attention.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-serif font-black text-[#ffbe0b] mb-2 uppercase">Creative Studio</h4>
                  <p className="text-sm text-[#8338ec] font-sans leading-relaxed">Where excess becomes art. Mix fonts, layer shadows, clash colors -- the studio is where maximalist visions come to life.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-serif font-black text-[#06d6a0] mb-2 uppercase">Design Archive</h4>
                  <p className="text-sm text-[#8338ec] font-sans leading-relaxed">From Baroque palaces to Memphis Milano, the archive holds centuries of maximalist expression and decorative ambition.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Expandable content"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#1a0a2e] border-4 border-[#d4145a] shadow-[3px_3px_0px_#ffbe0b] overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#d4145a]/10 transition-all duration-200"
              >
                <span className="font-serif font-black text-[#ffbe0b] uppercase tracking-wider">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#d4145a] transition-transform duration-200 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-4 border-dashed border-[#8338ec]/50">
                  <p className="text-sm text-[#8338ec] font-sans leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Bold notifications"
        className="py-16 px-6 bg-[#06d6a0]/10"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#06d6a0]/10 border-l-4 border-[#06d6a0] border-4 border-r-[#06d6a0]/30 border-t-[#06d6a0]/30 border-b-[#06d6a0]/30">
            <Check className="w-5 h-5 text-[#06d6a0] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#06d6a0] uppercase tracking-wider">Success</p>
              <p className="text-xs text-[#06d6a0]/70 mt-0.5 font-sans">Your maximalist creation has been saved.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ffbe0b]/10 border-l-4 border-[#ffbe0b] border-4 border-r-[#ffbe0b]/30 border-t-[#ffbe0b]/30 border-b-[#ffbe0b]/30">
            <AlertTriangle className="w-5 h-5 text-[#ffbe0b] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#ffbe0b] uppercase tracking-wider">Warning</p>
              <p className="text-xs text-[#ffbe0b]/70 mt-0.5 font-sans">Adding more layers may increase load time.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#d4145a]/10 border-l-4 border-[#d4145a] border-4 border-r-[#d4145a]/30 border-t-[#d4145a]/30 border-b-[#d4145a]/30">
            <X className="w-5 h-5 text-[#d4145a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#d4145a] uppercase tracking-wider">Error</p>
              <p className="text-xs text-[#d4145a]/70 mt-0.5 font-sans">Too much whitespace detected. Add more layers.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#3a86ff]/10 border-l-4 border-[#3a86ff] border-4 border-r-[#3a86ff]/30 border-t-[#3a86ff]/30 border-b-[#3a86ff]/30">
            <Info className="w-5 h-5 text-[#3a86ff] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#3a86ff] uppercase tracking-wider">Info</p>
              <p className="text-xs text-[#3a86ff]/70 mt-0.5 font-sans">Mix at least two font families for authentic maximalism.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a0a2e] border-4 border-[#8338ec] shadow-[4px_4px_0px_#d4145a] p-6 space-y-5">
            {[
              { label: "Extra Decorations", desc: "Add more visual layers to every element" },
              { label: "Font Mixing Mode", desc: "Enable serif, sans, and mono mixing" },
              { label: "Shadow Stacking", desc: "Apply multi-layer offset shadows" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-wider">{item.label}</p>
                  <p className="text-xs text-[#8338ec] mt-0.5 font-sans">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-14 h-7 transition-all duration-200 border-4 ${
                    toggleStates[index]
                      ? "bg-[#d4145a] border-[#ffbe0b]"
                      : "bg-[#8338ec]/30 border-[#8338ec]/50"
                  }`}
                >
                  <span
                    className={`absolute top-0 left-0 w-5 h-[calc(100%)] bg-[#ffbe0b] transition-transform duration-200 ${
                      toggleStates[index] ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
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
        subtitle="Visual indicators"
        className="py-16 px-6 bg-[#d4145a]/10"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a0a2e] border-4 border-[#3a86ff] shadow-[4px_4px_0px_#8338ec] p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-black text-white uppercase tracking-wider">Creative Progress</p>
                <p className="text-xs text-[#ffbe0b] font-mono tracking-widest">{progress}%</p>
              </div>
              <div className="h-3 bg-[#8338ec]/30 border-4 border-[#8338ec]/40">
                <div
                  className="h-full bg-gradient-to-r from-[#d4145a] via-[#8338ec] to-[#3a86ff] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-black text-white uppercase tracking-wider mb-2">Phase Completion</p>
              <div className="grid grid-cols-4 gap-3">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-3 bg-[#8338ec]/30 border-4 border-[#8338ec]/40">
                      <div
                        className={`h-full transition-all ${value === 100 ? "bg-[#06d6a0]" : value > 0 ? "bg-[#ffbe0b]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#8338ec] font-mono mt-1 text-center uppercase">P.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-4 border-dashed border-[#8338ec]/30">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-6 py-2 text-sm font-black uppercase tracking-widest border-4 border-[#d4145a] text-[#d4145a] hover:bg-[#d4145a] hover:text-white transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-6 py-2 text-sm font-black uppercase tracking-widest bg-gradient-to-r from-[#d4145a] to-[#8338ec] text-white border-4 border-[#ffbe0b] shadow-[3px_3px_0px_#ffbe0b] hover:shadow-[1px_1px_0px_#ffbe0b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Bold inputs"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif font-black text-[#ffbe0b] mb-2 uppercase tracking-widest"
        subtitleClassName="text-sm font-mono text-[#8338ec] mb-10 uppercase tracking-[0.3em]"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#1a0a2e] border-4 border-[#d4145a] shadow-[6px_6px_0px_#ffbe0b,12px_12px_0px_#3a86ff] p-8">
            <h3 className="text-lg font-serif font-black text-[#ffbe0b] mb-6 uppercase tracking-widest">Express Yourself</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-bold text-[#06d6a0] uppercase tracking-[0.3em] mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Type something bold..."
                  className="w-full px-6 py-4 bg-[#1a0a2e] border-4 border-[#8338ec] rounded-sm text-white placeholder-[#8338ec]/40 font-sans text-lg focus:border-[#d4145a] focus:shadow-[0_0_0_4px_rgba(212,20,90,0.3)] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#06d6a0] uppercase tracking-[0.3em] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 bg-[#1a0a2e] border-4 border-[#8338ec] rounded-sm text-white placeholder-[#8338ec]/40 font-sans text-lg focus:border-[#d4145a] focus:shadow-[0_0_0_4px_rgba(212,20,90,0.3)] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-[#06d6a0] uppercase tracking-[0.3em] mb-2">Message</label>
                <textarea
                  placeholder="Express yourself freely..."
                  rows={3}
                  className="w-full px-6 py-4 bg-[#1a0a2e] border-4 border-[#8338ec] rounded-sm text-white placeholder-[#8338ec]/40 font-sans text-lg focus:border-[#d4145a] focus:shadow-[0_0_0_4px_rgba(212,20,90,0.3)] focus:outline-none transition-all duration-200 resize-none"
                />
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-[#d4145a] to-[#8338ec] text-white font-black uppercase tracking-widest border-4 border-[#ffbe0b] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff] hover:shadow-[2px_2px_0px_#ffbe0b,4px_4px_0px_#3a86ff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 mt-2">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-4 border-[#d4145a]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-mono text-[#8338ec] tracking-widest uppercase">
            Maximalism Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#ffbe0b] transition-all duration-200">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
