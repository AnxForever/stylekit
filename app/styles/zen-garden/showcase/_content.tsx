"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Leaf, Wind, Mountain, Droplets,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Circle, Waves, TreePine,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sand White", hex: "#f5f3ee", bg: "bg-[#f5f3ee]", border: true },
  { name: "Parchment", hex: "#ebe7df", bg: "bg-[#ebe7df]", border: true },
  { name: "Warm Stone", hex: "#c4bba8", bg: "bg-[#c4bba8]" },
  { name: "Earth", hex: "#7a7062", bg: "bg-[#7a7062]" },
  { name: "Moss Green", hex: "#8a9a7b", bg: "bg-[#8a9a7b]" },
  { name: "Pine", hex: "#4a5548", bg: "bg-[#4a5548]" },
  { name: "Ink", hex: "#3a3a3a", bg: "bg-[#3a3a3a]" },
  { name: "Bamboo", hex: "#a8b89a", bg: "bg-[#a8b89a]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(60);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Stone", icon: Mountain },
    { label: "Water", icon: Waves },
    { label: "Moss", icon: TreePine },
  ];

  const accordionItems = [
    { title: "What is Karesansui?", content: "Karesansui (dry landscape garden) is the highest expression of Zen Buddhism in garden design. White sand represents water, carefully placed stones represent mountains and islands, and moss represents the passage of time." },
    { title: "Design Philosophy", content: "Less is infinitely more. Every element is placed with profound intention. The emptiness between elements is as meaningful as the elements themselves. Restraint, asymmetry, and natural imperfection guide every decision." },
    { title: "Ma (Negative Space)", content: "Ma is the Japanese concept of the meaningful void. In Zen garden design, the empty space between rocks and the raked sand patterns carry as much weight as the physical elements. It is in stillness that we find depth." },
  ];

  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#3a3a3a]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#c4bba8]/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/zen-garden"
            className="flex items-center gap-2 text-[#7a7062] hover:text-[#4a5548] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Circle className="w-3 h-3 text-[#8a9a7b]" />
            <span className="font-light text-lg tracking-[0.2em] text-[#4a5548]">
              Zen Garden
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm text-[#4a5548] border border-[#4a5548]/30 rounded-none hover:bg-[#4a5548] hover:text-[#f5f3ee] transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-12 h-px bg-[#c4bba8]" />
            <span className="text-xs uppercase tracking-[0.5em] text-[#7a7062]">Karesansui</span>
            <div className="w-12 h-px bg-[#c4bba8]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extralight text-[#4a5548] mb-10 leading-tight tracking-tight font-serif">
            Stillness
            <span className="block font-light italic text-[#8a9a7b]">within motion</span>
          </h1>
          <p className="text-lg font-light text-[#7a7062] max-w-xl mx-auto leading-relaxed font-serif">
            White sand, weathered stone, and the patience of moss. A digital meditation on the art of emptiness.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Garden metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Visitors", value: "1,842" },
            { icon: TrendingUp, label: "Growth", value: "+12%" },
            { icon: Eye, label: "Views", value: "89K" },
            { icon: Heart, label: "Saves", value: "2,107" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/50 border border-[#c4bba8]/30"
            >
              <stat.icon className="w-5 h-5 text-[#8a9a7b] mb-4" />
              <p className="text-3xl font-extralight text-[#4a5548] mb-1 font-serif">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-[#7a7062]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Inspired by sand, stone, and moss"
        className="py-16 px-6 bg-[#ebe7df]/40"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-none overflow-hidden border border-[#c4bba8]/30 bg-white/50"
            labelClassName="text-sm font-light text-[#4a5548]"
            hexClassName="text-xs text-[#7a7062] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Breath between characters"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-10 bg-white/50 border border-[#c4bba8]/30">
            <p className="text-6xl font-extralight text-[#4a5548] mb-6 leading-tight font-serif tracking-wide">Heading</p>
            <p className="text-3xl font-light text-[#4a5548] mb-6 font-serif">Subheading</p>
            <p className="text-lg font-light text-[#7a7062] mb-6 leading-[2] font-serif">
              Body text that breathes. Like sand raked into patterns, each line carries meaning in its spacing.
            </p>
            <p className="text-xs text-[#7a7062]/70 tracking-[0.4em] uppercase">
              Caption with meditative spacing
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Deliberate and minimal"
        className="py-16 px-6 bg-[#ebe7df]/40"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-10 bg-white/50 border border-[#c4bba8]/30">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-7 py-3 bg-[#4a5548] text-[#f5f3ee] text-sm tracking-[0.2em] hover:bg-[#8a9a7b] transition-colors duration-500">
                Primary
              </button>
              <button className="px-7 py-3 border border-[#4a5548] text-[#4a5548] text-sm tracking-[0.2em] hover:bg-[#4a5548] hover:text-[#f5f3ee] transition-colors duration-500">
                Secondary
              </button>
              <button className="px-7 py-3 text-[#8a9a7b] text-sm tracking-[0.2em] hover:text-[#4a5548] transition-colors duration-500 underline underline-offset-8 decoration-[#c4bba8]/50">
                Text Link
              </button>
              <button className="px-7 py-3 bg-[#8a9a7b] text-white text-sm tracking-[0.2em] hover:bg-[#4a5548] transition-colors duration-500">
                Moss
              </button>
              <button className="px-7 py-3 bg-[#c4bba8]/30 text-[#7a7062]/60 text-sm tracking-[0.2em] cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Vessels of meaning"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Mountain, title: "Stone", desc: "Carefully placed rocks represent permanence, mountains, and the bones of the earth. Their asymmetric arrangement embodies natural imperfection." },
            { icon: Wind, title: "Sand", desc: "Raked white gravel symbolizes flowing water and the ocean. The patterns change with each meditation, never fixed, always becoming." },
            { icon: Leaf, title: "Moss", desc: "Green moss grows slowly on stones, marking the gentle passage of time. It is life at its most patient and persistent." },
          ].map((card, index) => (
            <div key={index} className="p-8 bg-white/50 border border-[#c4bba8]/30 hover:border-[#8a9a7b]/40 transition-colors duration-500 group">
              <card.icon className="w-5 h-5 text-[#8a9a7b] mb-5 group-hover:text-[#4a5548] transition-colors duration-500" />
              <h3 className="text-lg font-light text-[#4a5548] mb-3 font-serif tracking-wide">{card.title}</h3>
              <p className="text-sm text-[#7a7062] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Garden elements"
        className="py-16 px-6 bg-[#ebe7df]/40"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/50 border border-[#c4bba8]/30 overflow-hidden">
            <div className="flex border-b border-[#c4bba8]/30">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm transition-colors duration-300 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#4a5548] border-[#8a9a7b]"
                      : "text-[#7a7062] border-transparent hover:text-[#4a5548]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-8 min-h-[140px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-light text-[#4a5548] mb-3 font-serif">Ishi (Stone)</h4>
                  <p className="text-sm text-[#7a7062] leading-relaxed">The backbone of every Zen garden. Stones are selected for their natural form and placed to suggest mountains, islands, or the eternal. An odd number is preferred. Asymmetry is truth.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-light text-[#4a5548] mb-3 font-serif">Mizu (Water)</h4>
                  <p className="text-sm text-[#7a7062] leading-relaxed">In a dry garden, water is suggested but never present. Raked gravel becomes a river, a lake, or the vast ocean. The mind completes what the eye begins.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-light text-[#4a5548] mb-3 font-serif">Koke (Moss)</h4>
                  <p className="text-sm text-[#7a7062] leading-relaxed">Moss grows in the spaces between stones, softening edges and marking the slow rhythm of seasons. It is the garden acknowledging the passage of time.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Layers of understanding"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white/50 border border-[#c4bba8]/30 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-[#ebe7df]/30 transition-colors duration-300"
              >
                <span className="font-light text-[#4a5548] font-serif">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#7a7062] transition-transform duration-500 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-8 pb-6 border-t border-[#c4bba8]/20">
                  <p className="text-sm text-[#7a7062] leading-relaxed pt-5">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Gentle guidance"
        className="py-16 px-6 bg-[#ebe7df]/40"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-5 bg-[#8a9a7b]/10 border-l-2 border-[#8a9a7b]">
            <Check className="w-4 h-4 text-[#8a9a7b] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#8a9a7b]">Balance achieved</p>
              <p className="text-xs text-[#8a9a7b]/70 mt-0.5">The arrangement has found its harmony.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 bg-[#c4bba8]/15 border-l-2 border-[#c4bba8]">
            <AlertTriangle className="w-4 h-4 text-[#7a7062] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#7a7062]">Patience required</p>
              <p className="text-xs text-[#7a7062]/70 mt-0.5">Allow the pattern to settle naturally.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 bg-[#a07060]/10 border-l-2 border-[#a07060]">
            <X className="w-4 h-4 text-[#a07060] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#a07060]">Disruption sensed</p>
              <p className="text-xs text-[#a07060]/70 mt-0.5">Restore stillness before proceeding.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 bg-[#7a8fa0]/10 border-l-2 border-[#7a8fa0]">
            <Info className="w-4 h-4 text-[#7a8fa0] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#7a8fa0]">Observation</p>
              <p className="text-xs text-[#7a8fa0]/70 mt-0.5">Each viewing reveals a new perspective.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Mindful preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/50 border border-[#c4bba8]/30 p-8 space-y-6">
            {[
              { label: "Sand Patterns", desc: "Display raked gravel texture overlay" },
              { label: "Reduced Motion", desc: "Slow all transitions to meditative pace" },
              { label: "Seasonal Mode", desc: "Adapt colors to current season" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm text-[#4a5548]">{item.label}</p>
                  <p className="text-xs text-[#7a7062] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const next = [...toggleStates];
                    next[index] = !next[index];
                    setToggleStates(next);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-500 ${
                    toggleStates[index] ? "bg-[#8a9a7b]" : "bg-[#c4bba8]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-500 ${
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
        subtitle="The path unfolds"
        className="py-16 px-6 bg-[#ebe7df]/40"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/50 border border-[#c4bba8]/30 p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[#4a5548] font-serif">Meditation progress</p>
                <p className="text-xs text-[#7a7062] font-mono">{progress}%</p>
              </div>
              <div className="h-1 bg-[#c4bba8]/30 rounded-full">
                <div
                  className="h-full bg-[#8a9a7b] rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-[#4a5548] mb-3 font-serif">Garden sections</p>
              <div className="grid grid-cols-4 gap-3">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1 bg-[#c4bba8]/30 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${value === 100 ? "bg-[#8a9a7b]" : value > 0 ? "bg-[#4a5548]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#7a7062] mt-1.5 text-center tracking-wider">S.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-[#c4bba8]/20">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-5 py-2 text-sm border border-[#c4bba8] text-[#7a7062] hover:border-[#4a5548] hover:text-[#4a5548] transition-colors duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-5 py-2 text-sm bg-[#4a5548] text-[#f5f3ee] hover:bg-[#8a9a7b] transition-colors duration-300"
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
        subtitle="Thoughtful inputs"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#4a5548] mb-2 font-serif"
        subtitleClassName="text-sm text-[#7a7062] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white/50 border border-[#c4bba8]/30 p-10">
            <h3 className="text-lg font-light text-[#4a5548] mb-8 font-serif">Visitor Book</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#7a7062] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-transparent border-b border-[#c4bba8] text-[#4a5548] placeholder-[#c4bba8] focus:outline-none focus:border-[#8a9a7b] transition-colors duration-500 font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#7a7062] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-transparent border-b border-[#c4bba8] text-[#4a5548] placeholder-[#c4bba8] focus:outline-none focus:border-[#8a9a7b] transition-colors duration-500 font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#7a7062] mb-2">Reflection</label>
                <textarea
                  placeholder="What did you see in the garden..."
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border-b border-[#c4bba8] text-[#4a5548] placeholder-[#c4bba8] focus:outline-none focus:border-[#8a9a7b] transition-colors duration-500 resize-none font-serif"
                />
              </div>
              <button className="w-full py-3 bg-[#4a5548] text-[#f5f3ee] text-sm tracking-[0.2em] hover:bg-[#8a9a7b] transition-colors duration-500 mt-3">
                Leave a Stone
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#c4bba8]/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-[#7a7062] tracking-[0.3em]">
            Zen Garden Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#8a9a7b] transition-colors duration-300">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
