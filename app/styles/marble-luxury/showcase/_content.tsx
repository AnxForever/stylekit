"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Diamond, Gem, Crown, Star,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Building2, Sparkles, Wine,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Onyx", hex: "#1a1a1a", bg: "bg-[#1a1a1a]" },
  { name: "Marble White", hex: "#f8f6f3", bg: "bg-[#f8f6f3]", border: true },
  { name: "Antique Gold", hex: "#c9a96e", bg: "bg-[#c9a96e]" },
  { name: "Warm Taupe", hex: "#8a7968", bg: "bg-[#8a7968]" },
  { name: "Light Marble", hex: "#e8e0d6", bg: "bg-[#e8e0d6]", border: true },
  { name: "Champagne", hex: "#d4c5a9", bg: "bg-[#d4c5a9]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Residence", icon: Building2 },
    { label: "Collection", icon: Sparkles },
    { label: "Experience", icon: Wine },
  ];

  const accordionItems = [
    { title: "What is Marble Luxury?", content: "Marble Luxury draws from the material aesthetics of high-end architecture and interior design. Since ancient Rome, marble has symbolized power, wealth, and timeless beauty. Its natural veining creates a unique visual rhythm of grey lines against warm white." },
    { title: "Design Philosophy", content: "Restrained opulence -- not gilded excess, but quality communicated through refined material suggestion and precisely placed gold accents. The less gold you use, the more precious it appears. The more space you leave, the more composed the result." },
    { title: "When to Apply", content: "Luxury hotel websites, high-end brand showcases, boutique real estate, fine jewelry, and premium beauty brands -- any context that needs to convey quality, exclusivity, and timeless sophistication through visual restraint." },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-[#1a1a1a]">
      {/* Marble texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(ellipse at 20% 50%, #8a7968 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #c9a96e 0%, transparent 40%), radial-gradient(ellipse at 50% 80%, #8a7968 0%, transparent 45%)"
        }}
      />

      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#c9a96e]/20 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/marble-luxury"
            className="flex items-center gap-2 text-[#8a7968] hover:text-[#1a1a1a] transition-all duration-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-serif tracking-[0.2em] uppercase">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Diamond className="w-4 h-4 text-[#c9a96e]" />
            <span className="font-serif text-lg tracking-wide text-[#1a1a1a]">
              Marble & Gold
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-serif tracking-[0.2em] uppercase text-[#f8f6f3] bg-[#1a1a1a] border border-[#c9a96e]/40 hover:bg-[#c9a96e] hover:text-[#1a1a1a] hover:border-[#c9a96e] transition-all duration-500 ease-in-out"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-32 px-6 relative z-10">
        <div className="absolute inset-12 md:inset-20 border border-[#c9a96e]/15 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mb-4" />
            <span className="text-xs font-serif text-[#c9a96e] tracking-[0.4em] uppercase">
              Established 2024
            </span>
            <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mt-4" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#1a1a1a] mb-6 tracking-wide leading-tight">
            Marble & Gold
          </h1>
          <p className="text-lg text-[#8a7968] font-serif mb-12 max-w-lg mx-auto leading-relaxed">
            Where timeless craftsmanship meets modern luxury. Every detail considered, every surface refined.
          </p>
          <button className="px-12 py-4 bg-[#1a1a1a] text-[#f8f6f3] font-serif tracking-[0.2em] uppercase border border-[#c9a96e]/40 hover:bg-[#c9a96e] hover:text-[#1a1a1a] hover:border-[#c9a96e] transition-all duration-500 ease-in-out">
            Explore Collection
          </button>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Curated metrics"
        className="py-20 px-6 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Clientele", value: "2,841" },
            { icon: TrendingUp, label: "Growth", value: "+18%" },
            { icon: Eye, label: "Views", value: "142K" },
            { icon: Heart, label: "Saved", value: "3,209" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-10 bg-[#f8f6f3] border border-[#c9a96e]/20 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              <stat.icon className="w-5 h-5 text-[#c9a96e] mb-4" />
              <p className="text-3xl font-serif text-[#1a1a1a] mb-1">{stat.value}</p>
              <p className="text-xs font-serif uppercase tracking-[0.3em] text-[#8a7968]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Natural stone and metal tones"
        className="py-20 px-6 bg-[#e8e0d6]/30 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border border-[#c9a96e]/20 bg-[#f8f6f3] shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
            labelClassName="text-sm font-serif text-[#1a1a1a]"
            hexClassName="text-xs text-[#8a7968] font-serif"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Elegant and refined"
        className="py-20 px-6 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-12 bg-[#f8f6f3] border border-[#c9a96e]/20 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <p className="text-6xl font-serif text-[#1a1a1a] mb-6 leading-tight tracking-wide">Heading</p>
            <p className="text-4xl font-serif text-[#1a1a1a]/80 mb-6">Subheading</p>
            <p className="text-xl font-serif text-[#8a7968] mb-6 leading-relaxed">
              Body text with generous spacing. Every letter breathes, every word carries weight.
            </p>
            <p className="text-xs font-serif text-[#c9a96e] tracking-[0.3em] uppercase">
              Caption text with deliberate spacing
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Refined interactions"
        className="py-20 px-6 bg-[#e8e0d6]/30 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-12 bg-[#f8f6f3] border border-[#c9a96e]/20 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap gap-6 items-center">
              <button className="px-10 py-4 bg-[#1a1a1a] text-[#f8f6f3] font-serif tracking-[0.2em] uppercase border border-[#c9a96e]/40 hover:bg-[#c9a96e] hover:text-[#1a1a1a] hover:border-[#c9a96e] transition-all duration-500 ease-in-out">
                Primary
              </button>
              <button className="px-10 py-4 bg-transparent text-[#1a1a1a] font-serif tracking-[0.2em] uppercase border border-[#1a1a1a]/20 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-500 ease-in-out">
                Secondary
              </button>
              <button className="px-10 py-4 bg-[#c9a96e] text-[#1a1a1a] font-serif tracking-[0.2em] uppercase border border-[#c9a96e] hover:bg-[#1a1a1a] hover:text-[#f8f6f3] hover:border-[#c9a96e]/40 transition-all duration-500 ease-in-out">
                Accent
              </button>
              <button className="text-[#c9a96e] font-serif tracking-[0.2em] uppercase relative group">
                Text Link
                <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#c9a96e] transition-all duration-500 group-hover:w-full group-hover:left-0" />
              </button>
              <button className="px-10 py-4 bg-[#e8e0d6]/50 text-[#8a7968]/40 font-serif tracking-[0.2em] uppercase border border-[#e8e0d6] cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Content vessels"
        className="py-20 px-6 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Gem, title: "Carrara White", desc: "Timeless elegance carved from Italian marble, where every vein tells a story of geological artistry.", label: "Stone" },
            { icon: Crown, title: "Calacatta Gold", desc: "Warm undertones with dramatic golden veining. The most prized marble for those who settle for nothing less.", label: "Premium" },
            { icon: Star, title: "Statuario", desc: "Bold grey veining against a luminous white canvas. The marble of Michelangelo, refined for modern sensibility.", label: "Heritage" },
          ].map((card, index) => (
            <div
              key={index}
              className="p-10 bg-[#f8f6f3] border border-[#c9a96e]/20 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.06)] transition-all duration-500 group"
            >
              <span className="text-xs font-serif text-[#c9a96e] tracking-[0.3em] uppercase mb-6 block">{card.label}</span>
              <card.icon className="w-5 h-5 text-[#c9a96e] mb-4 group-hover:text-[#1a1a1a] transition-all duration-500" />
              <h3 className="text-xl font-serif text-[#1a1a1a] mb-4 tracking-wide">{card.title}</h3>
              <p className="text-sm text-[#8a7968] font-serif leading-relaxed mb-6">{card.desc}</p>
              <div className="pt-6 border-t border-[#c9a96e]/20">
                <span className="text-xs font-serif text-[#8a7968] tracking-[0.2em] uppercase group-hover:text-[#c9a96e] transition-all duration-500">
                  View Details
                </span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Curated navigation"
        className="py-20 px-6 bg-[#e8e0d6]/30 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f8f6f3] border border-[#c9a96e]/20 shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="flex border-b border-[#c9a96e]/20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-8 py-4 text-sm font-serif tracking-[0.2em] uppercase transition-all duration-500 border-b -mb-px ${
                    activeTab === index
                      ? "text-[#c9a96e] border-[#c9a96e]"
                      : "text-[#8a7968]/50 border-transparent hover:text-[#1a1a1a]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-8 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-serif text-[#1a1a1a] mb-2 tracking-wide">Private Residence</h4>
                  <p className="text-sm text-[#8a7968] font-serif leading-relaxed">Marble floors that echo softly underfoot. Floor-to-ceiling windows framing curated views. A space where silence itself feels luxurious.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-serif text-[#1a1a1a] mb-2 tracking-wide">The Collection</h4>
                  <p className="text-sm text-[#8a7968] font-serif leading-relaxed">Each piece selected for its provenance and presence. Surfaces that tell stories of geological patience spanning millions of years.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-serif text-[#1a1a1a] mb-2 tracking-wide">Bespoke Experience</h4>
                  <p className="text-sm text-[#8a7968] font-serif leading-relaxed">Tailored to the individual. Every consultation begins with listening, every design unfolds with intention and unhurried refinement.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Detailed information"
        className="py-20 px-6 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#f8f6f3] border border-[#c9a96e]/20 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-[#e8e0d6]/30 transition-all duration-500"
              >
                <span className="font-serif text-[#1a1a1a] tracking-wide">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#c9a96e] transition-transform duration-500 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-8 pb-6 border-t border-[#c9a96e]/15">
                  <p className="text-sm text-[#8a7968] font-serif leading-relaxed pt-5">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Discreet notifications"
        className="py-20 px-6 bg-[#e8e0d6]/30 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-4 p-5 bg-[#f8f6f3] border-l border-[#2d4a2d] border border-l-2 border-[#c9a96e]/10">
            <Check className="w-4 h-4 text-[#2d4a2d] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#2d4a2d]">Reservation confirmed</p>
              <p className="text-xs text-[#2d4a2d]/60 mt-1 font-serif">Your appointment has been secured.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 bg-[#f8f6f3] border-l border-[#c9a96e] border border-l-2 border-[#c9a96e]/10">
            <AlertTriangle className="w-4 h-4 text-[#c9a96e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#c9a96e]">Please note</p>
              <p className="text-xs text-[#c9a96e]/60 mt-1 font-serif">Limited availability for this collection.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 bg-[#f8f6f3] border-l border-[#8b4a4a] border border-l-2 border-[#c9a96e]/10">
            <X className="w-4 h-4 text-[#8b4a4a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#8b4a4a]">Unable to process</p>
              <p className="text-xs text-[#8b4a4a]/60 mt-1 font-serif">Please contact your personal concierge.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 bg-[#f8f6f3] border-l border-[#8a7968] border border-l-2 border-[#c9a96e]/10">
            <Info className="w-4 h-4 text-[#8a7968] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#8a7968]">For your information</p>
              <p className="text-xs text-[#8a7968]/60 mt-1 font-serif">Private viewings available by appointment.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-20 px-6 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f8f6f3] border border-[#c9a96e]/20 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-8 space-y-6">
            {[
              { label: "Marble Texture Overlay", desc: "Display subtle stone veining on backgrounds" },
              { label: "Gold Accent Mode", desc: "Highlight borders and separators with gold" },
              { label: "Ambient Transitions", desc: "Enable slow, refined hover animations" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-serif text-[#1a1a1a]">{item.label}</p>
                  <p className="text-xs text-[#8a7968] font-serif mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-none transition-all duration-500 ${
                    toggleStates[index] ? "bg-[#1a1a1a]" : "bg-[#e8e0d6]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-[#c9a96e] rounded-none shadow-sm transition-transform duration-500 ${
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
        subtitle="Measured advancement"
        className="py-20 px-6 bg-[#e8e0d6]/30 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f8f6f3] border border-[#c9a96e]/20 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-serif text-[#1a1a1a]">Project completion</p>
                <p className="text-xs text-[#c9a96e] font-serif">{progress}%</p>
              </div>
              <div className="h-1 bg-[#e8e0d6]">
                <div
                  className="h-full bg-[#c9a96e] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-serif text-[#1a1a1a] mb-3">Phase milestones</p>
              <div className="grid grid-cols-4 gap-4">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1 bg-[#e8e0d6]">
                      <div
                        className={`h-full transition-all duration-500 ${value === 100 ? "bg-[#1a1a1a]" : value > 0 ? "bg-[#c9a96e]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#8a7968] font-serif mt-2 text-center">Phase {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-[#c9a96e]/15">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-6 py-2.5 text-sm font-serif tracking-[0.2em] uppercase border border-[#1a1a1a]/20 text-[#1a1a1a] hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-500"
              >
                Previous
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-6 py-2.5 text-sm font-serif tracking-[0.2em] uppercase bg-[#1a1a1a] text-[#f8f6f3] border border-[#c9a96e]/40 hover:bg-[#c9a96e] hover:text-[#1a1a1a] hover:border-[#c9a96e] transition-all duration-500 ease-in-out"
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
        subtitle="Personal inquiry"
        className="py-20 px-6 relative z-10"
        titleClassName="text-2xl font-serif text-[#1a1a1a] mb-2 tracking-wide"
        subtitleClassName="text-sm font-serif text-[#8a7968] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#f8f6f3] border border-[#c9a96e]/20 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-10">
            <h3 className="text-lg font-serif text-[#1a1a1a] mb-8 tracking-wide">Private Consultation</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-serif text-[#c9a96e] tracking-[0.3em] uppercase mb-3">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#1a1a1a]/20 text-[#1a1a1a] placeholder-[#8a7968]/40 font-serif tracking-wide focus:border-[#c9a96e] focus:outline-none transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#c9a96e] tracking-[0.3em] uppercase mb-3">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#1a1a1a]/20 text-[#1a1a1a] placeholder-[#8a7968]/40 font-serif tracking-wide focus:border-[#c9a96e] focus:outline-none transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#c9a96e] tracking-[0.3em] uppercase mb-3">Message</label>
                <textarea
                  placeholder="How may we assist you..."
                  rows={3}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#1a1a1a]/20 text-[#1a1a1a] placeholder-[#8a7968]/40 font-serif tracking-wide focus:border-[#c9a96e] focus:outline-none transition-all duration-500 resize-none"
                />
              </div>
              <button className="w-full py-4 bg-[#1a1a1a] text-[#f8f6f3] font-serif tracking-[0.2em] uppercase border border-[#c9a96e]/40 hover:bg-[#c9a96e] hover:text-[#1a1a1a] hover:border-[#c9a96e] transition-all duration-500 ease-in-out mt-4">
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#c9a96e]/20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-serif text-[#8a7968] tracking-[0.2em]">
            Marble Luxury Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#c9a96e] transition-all duration-500">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
