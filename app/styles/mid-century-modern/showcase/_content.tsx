"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Star, Armchair, Atom,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Home, Palette, BookOpen
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Cream White", hex: "#f5f0e1", bg: "bg-[#f5f0e1]", border: true },
  { name: "Burnt Orange", hex: "#e8572a", bg: "bg-[#e8572a]" },
  { name: "Teal", hex: "#2a6e5e", bg: "bg-[#2a6e5e]" },
  { name: "Mustard Gold", hex: "#c4a35a", bg: "bg-[#c4a35a]" },
  { name: "Charcoal", hex: "#3d3d3d", bg: "bg-[#3d3d3d]" },
  { name: "Warm White", hex: "#faf6ed", bg: "bg-[#faf6ed]", border: true },
  { name: "Deep Orange", hex: "#c44420", bg: "bg-[#c44420]" },
  { name: "Olive", hex: "#5a6b42", bg: "bg-[#5a6b42]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Living", icon: Home },
    { label: "Design", icon: Palette },
    { label: "Archive", icon: BookOpen },
  ];

  const accordionItems = [
    { title: "What is Mid-Century Modern?", content: "Mid-Century Modern emerged in the 1940s-60s at the intersection of post-war optimism and the Space Age. It pursues the perfect unity of form and function, believing that good design should serve everyday life." },
    { title: "Core Aesthetic Principles", content: "Organic modernism: the fusion of geometric forms and natural curves. Ovals, kidney shapes, starbursts, and atomic models recur throughout, reflecting faith in both scientific progress and natural harmony." },
    { title: "The Color Language", content: "Saturated but restrained warm tones -- burnt orange, mustard yellow, olive green, peacock blue -- paired with cream white and deep charcoal neutrals. Warm yet measured, drawn from nature and modern materials." },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e1] text-[#3d3d3d]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b-2 border-[#3d3d3d]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/mid-century-modern"
            className="flex items-center gap-2 text-[#c4a35a] hover:text-[#3d3d3d] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-sans tracking-wide">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-[#e8572a]" />
            <span className="font-sans font-bold text-lg tracking-wider uppercase text-[#3d3d3d]">
              Mid-Century
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-sans font-semibold tracking-wider uppercase text-[#2a6e5e] border-2 border-[#2a6e5e]/30 rounded-lg hover:bg-[#2a6e5e] hover:text-[#f5f0e1] transition-all duration-200"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#2a6e5e]/10" />
        <div className="absolute bottom-16 right-16 w-48 h-24 bg-[#c4a35a]/15 rounded-[40%_60%_60%_40%/60%_40%_60%_40%]" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#e8572a]/10 rotate-45 rounded-lg" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-1 bg-[#e8572a] rounded-full" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#c4a35a] font-sans font-semibold">Atomic Age Design</span>
            <div className="w-12 h-1 bg-[#e8572a] rounded-full" />
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold text-[#3d3d3d] mb-8 leading-tight tracking-wide uppercase">
            Form meets
            <span className="block text-[#e8572a]">function</span>
          </h1>
          <p className="text-lg font-sans text-[#3d3d3d]/60 max-w-xl mx-auto leading-relaxed tracking-wider">
            Where atomic age optimism meets organic modernism. Timeless design for the everyday.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Design metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Followers", value: "3,142" },
            { icon: TrendingUp, label: "Growth", value: "+24%" },
            { icon: Eye, label: "Views", value: "198K" },
            { icon: Heart, label: "Saves", value: "4,507" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl border-2 border-[#3d3d3d]/10 shadow-[4px_4px_0_#3d3d3d10]"
            >
              <stat.icon className="w-5 h-5 text-[#e8572a] mb-4" />
              <p className="text-3xl font-sans font-bold text-[#3d3d3d] mb-1 tracking-wide">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-[#c4a35a] font-sans font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Inspired by atomic age interiors"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-xl overflow-hidden border-2 border-[#3d3d3d]/10 bg-white shadow-[2px_2px_0_#3d3d3d08]"
            labelClassName="text-sm font-sans font-semibold text-[#3d3d3d] tracking-wide"
            hexClassName="text-xs text-[#c4a35a] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Clean and geometric"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-white rounded-xl border-2 border-[#3d3d3d]/10 shadow-[4px_4px_0_#3d3d3d08]">
            <div className="w-12 h-1 bg-[#e8572a] rounded-full mb-6" />
            <p className="text-6xl font-sans font-bold text-[#3d3d3d] mb-4 leading-tight tracking-wide uppercase">Heading</p>
            <p className="text-4xl font-sans font-semibold text-[#3d3d3d] mb-4 tracking-wide">Subheading</p>
            <p className="text-xl font-sans text-[#3d3d3d]/60 mb-4 leading-relaxed tracking-wider">
              Body text with generous spacing. Clean sans-serif forms for comfortable reading.
            </p>
            <p className="text-sm text-[#c4a35a] tracking-[0.3em] uppercase font-sans font-semibold">
              Caption text with retro spacing
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Bold and purposeful"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white rounded-xl border-2 border-[#3d3d3d]/10">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-3 bg-[#e8572a] text-[#f5f0e1] text-sm font-sans font-semibold uppercase tracking-wider rounded-lg border-2 border-[#c44420] shadow-[0_4px_0_#c44420] hover:shadow-[0_2px_0_#c44420] hover:translate-y-[2px] transition-all duration-200">
                Primary
              </button>
              <button className="px-8 py-3 border-2 border-[#3d3d3d] text-[#3d3d3d] text-sm font-sans font-semibold uppercase tracking-wider rounded-lg hover:bg-[#3d3d3d] hover:text-[#f5f0e1] transition-all duration-200">
                Secondary
              </button>
              <button className="px-8 py-3 text-[#2a6e5e] text-sm font-sans font-semibold uppercase tracking-wider hover:text-[#3d3d3d] transition-all duration-200 underline underline-offset-4 decoration-[#c4a35a]">
                Text Link
              </button>
              <button className="px-8 py-3 bg-[#2a6e5e] text-[#f5f0e1] text-sm font-sans font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1a5e4e] transition-all duration-200">
                Accent
              </button>
              <button className="px-8 py-3 bg-[#3d3d3d]/10 text-[#3d3d3d]/40 text-sm font-sans font-semibold uppercase tracking-wider rounded-lg cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Content containers"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Atom, title: "Atomic", desc: "Drawing inspiration from the optimism of the Space Age and the beauty of molecular structures." },
            { icon: Armchair, title: "Organic", desc: "Kidney shapes, gentle curves, and natural forms bring warmth to modern geometric precision." },
            { icon: Star, title: "Starburst", desc: "The iconic starburst motif captures the era's enthusiasm for progress and the cosmos." },
          ].map((card, index) => (
            <div key={index} className="relative p-8 bg-[#f5f0e1] rounded-xl border-2 border-[#3d3d3d] shadow-[4px_4px_0_#3d3d3d] hover:shadow-[6px_6px_0_#3d3d3d] hover:-translate-y-1 transition-all duration-200 group">
              <div className="w-12 h-1 bg-[#e8572a] rounded-full mb-4" />
              <card.icon className="w-6 h-6 text-[#2a6e5e] mb-4 group-hover:text-[#e8572a] transition-colors" />
              <h3 className="text-lg font-sans font-bold text-[#3d3d3d] tracking-wide mb-3">{card.title}</h3>
              <p className="text-sm text-[#3d3d3d]/60 font-sans leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border-2 border-[#3d3d3d]/10 overflow-hidden">
            <div className="flex border-b-2 border-[#3d3d3d]/10">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-sans font-semibold uppercase tracking-wider transition-all duration-200 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#e8572a] border-[#e8572a]"
                      : "text-[#3d3d3d]/40 border-transparent hover:text-[#3d3d3d]"
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
                  <h4 className="text-lg font-sans font-bold text-[#3d3d3d] tracking-wide mb-2">Living Room</h4>
                  <p className="text-sm text-[#3d3d3d]/60 font-sans leading-relaxed">An Eames lounge chair by the window, a Noguchi coffee table at center. Walnut wood, warm textiles, and the clean geometry of mid-century furnishings define the space.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-sans font-bold text-[#3d3d3d] tracking-wide mb-2">Design Studio</h4>
                  <p className="text-sm text-[#3d3d3d]/60 font-sans leading-relaxed">Where form studies meet material exploration. Prototypes in bent plywood, molded fiberglass, and wire frame structures line the shelves of creative possibility.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-sans font-bold text-[#3d3d3d] tracking-wide mb-2">Pattern Archive</h4>
                  <p className="text-sm text-[#3d3d3d]/60 font-sans leading-relaxed">A curated collection of starburst motifs, boomerang patterns, and atomic-age textile prints. Each piece tells the story of an era that believed in progress.</p>
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
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border-2 border-[#3d3d3d]/10 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#f5f0e1]/50 transition-all duration-200"
              >
                <span className="font-sans font-semibold text-[#3d3d3d] tracking-wide">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#c4a35a] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-2 border-[#3d3d3d]/10">
                  <p className="text-sm text-[#3d3d3d]/60 font-sans leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Notification styles"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#2a6e5e]/10 rounded-lg border-l-4 border-[#2a6e5e]">
            <Check className="w-4 h-4 text-[#2a6e5e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-[#2a6e5e]">Design saved</p>
              <p className="text-xs text-[#2a6e5e]/70 mt-0.5 font-sans">Your layout changes have been applied.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#c4a35a]/10 rounded-lg border-l-4 border-[#c4a35a]">
            <AlertTriangle className="w-4 h-4 text-[#c4a35a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-[#c4a35a]">Note</p>
              <p className="text-xs text-[#c4a35a]/70 mt-0.5 font-sans">Rendering may take a moment.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#e8572a]/10 rounded-lg border-l-4 border-[#e8572a]">
            <X className="w-4 h-4 text-[#e8572a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-[#e8572a]">Error</p>
              <p className="text-xs text-[#e8572a]/70 mt-0.5 font-sans">Could not load the component. Please try again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#3d3d3d]/5 rounded-lg border-l-4 border-[#3d3d3d]/40">
            <Info className="w-4 h-4 text-[#3d3d3d]/60 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-[#3d3d3d]/80">Tip</p>
              <p className="text-xs text-[#3d3d3d]/50 mt-0.5 font-sans">Hover over elements to preview interactions.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border-2 border-[#3d3d3d]/10 p-6 space-y-5">
            {[
              { label: "Warm Palette Mode", desc: "Use saturated mid-century warm tones" },
              { label: "Starburst Accents", desc: "Show decorative starburst elements" },
              { label: "Auto-save Layouts", desc: "Preserve your arrangement automatically" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-sans font-semibold text-[#3d3d3d] tracking-wide">{item.label}</p>
                  <p className="text-xs text-[#c4a35a] mt-0.5 font-sans">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-lg transition-all duration-200 ${
                    toggleStates[index] ? "bg-[#e8572a]" : "bg-[#3d3d3d]/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-md shadow-sm transition-transform duration-200 ${
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
        subtitle="Activity indicators"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border-2 border-[#3d3d3d]/10 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-sans font-semibold text-[#3d3d3d] tracking-wide">Design progress</p>
                <p className="text-xs text-[#c4a35a] font-mono">{progress}%</p>
              </div>
              <div className="h-2 bg-[#3d3d3d]/10 rounded-lg">
                <div
                  className="h-full bg-[#e8572a] rounded-lg transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-sans font-semibold text-[#3d3d3d] tracking-wide mb-2">Phase completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-2 bg-[#3d3d3d]/10 rounded-lg">
                      <div
                        className={`h-full rounded-lg transition-all ${value === 100 ? "bg-[#2a6e5e]" : value > 0 ? "bg-[#c4a35a]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#c4a35a] mt-1 text-center font-sans">Ph.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-2 border-[#3d3d3d]/10">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-sans font-semibold uppercase tracking-wider border-2 border-[#3d3d3d]/20 text-[#3d3d3d]/60 rounded-lg hover:border-[#3d3d3d] hover:text-[#3d3d3d] transition-all duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-sans font-semibold uppercase tracking-wider bg-[#e8572a] text-[#f5f0e1] rounded-lg hover:bg-[#c44420] transition-all duration-200"
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
        subtitle="Clean inputs"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-wide text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#c4a35a] tracking-wider mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl border-2 border-[#3d3d3d]/10 p-8 shadow-[4px_4px_0_#3d3d3d08]">
            <div className="w-12 h-1 bg-[#e8572a] rounded-full mb-4" />
            <h3 className="text-lg font-sans font-bold text-[#3d3d3d] tracking-wide mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#c4a35a] mb-2 font-sans font-semibold">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-5 py-3 bg-white border-2 border-[#3d3d3d]/20 rounded-lg text-[#3d3d3d] placeholder-[#3d3d3d]/30 font-sans tracking-wide focus:border-[#e8572a] focus:shadow-[0_0_0_3px_rgba(232,87,42,0.15)] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#c4a35a] mb-2 font-sans font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-5 py-3 bg-white border-2 border-[#3d3d3d]/20 rounded-lg text-[#3d3d3d] placeholder-[#3d3d3d]/30 font-sans tracking-wide focus:border-[#e8572a] focus:shadow-[0_0_0_3px_rgba(232,87,42,0.15)] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#c4a35a] mb-2 font-sans font-semibold">Message</label>
                <textarea
                  placeholder="Your thoughts..."
                  rows={3}
                  className="w-full px-5 py-3 bg-white border-2 border-[#3d3d3d]/20 rounded-lg text-[#3d3d3d] placeholder-[#3d3d3d]/30 font-sans tracking-wide focus:border-[#e8572a] focus:shadow-[0_0_0_3px_rgba(232,87,42,0.15)] focus:outline-none transition-all duration-200 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#e8572a] text-[#f5f0e1] text-sm font-sans font-semibold uppercase tracking-wider rounded-lg border-2 border-[#c44420] shadow-[0_4px_0_#c44420] hover:shadow-[0_2px_0_#c44420] hover:translate-y-[2px] transition-all duration-200 mt-2">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-2 border-[#3d3d3d]/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-[#c4a35a] tracking-wider font-sans">
            Mid-Century Modern Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#e8572a] transition-all duration-200">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
