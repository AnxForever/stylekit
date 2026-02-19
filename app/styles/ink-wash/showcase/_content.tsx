"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Droplets, Wind, Mountain, Feather,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Pen, BookOpen, Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Xuan Paper", hex: "#f8f5f0", bg: "bg-[#f8f5f0]", border: true },
  { name: "Aged Silk", hex: "#f3efe8", bg: "bg-[#f3efe8]", border: true },
  { name: "Sand Stone", hex: "#c4b9a8", bg: "bg-[#c4b9a8]" },
  { name: "Tea Brown", hex: "#a89279", bg: "bg-[#a89279]" },
  { name: "Moss Green", hex: "#6b7b6e", bg: "bg-[#6b7b6e]" },
  { name: "Ink Black", hex: "#2c2c2c", bg: "bg-[#2c2c2c]" },
  { name: "Dilute Ink", hex: "#7a7a7a", bg: "bg-[#7a7a7a]" },
  { name: "Mist Gray", hex: "#d5cfc6", bg: "bg-[#d5cfc6]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Brushwork", icon: Pen },
    { label: "Reading", icon: BookOpen },
    { label: "Gallery", icon: Palette },
  ];

  const accordionItems = [
    { title: "What is Ink Wash Design?", content: "Ink Wash design draws from the Chinese ink painting tradition spanning over a thousand years. It uses the interplay of ink density -- from deep black to translucent gray -- alongside generous whitespace to create compositions that breathe with spiritual vitality." },
    { title: "The Five Shades of Ink", content: "In traditional ink painting, a single ink stick yields five tonal values: scorched, dense, heavy, light, and clear. This principle translates to digital design as a grayscale hierarchy enriched by warm undertones of xuan paper and natural accents." },
    { title: "Emptiness as Expression", content: "The concept of 'counting white as black' means that empty space is not void but an active participant in the composition. Every pause, every margin, every gap between elements carries meaning and invites contemplation." },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#2c2c2c]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#2c2c2c]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/ink-wash"
            className="flex items-center gap-2 text-[#a89279] hover:text-[#2c2c2c] transition-all duration-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-serif">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-[#6b7b6e]" />
            <span className="font-serif font-light text-lg tracking-wider text-[#2c2c2c]">
              Ink Wash
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-serif text-[#6b7b6e] border-b border-[#6b7b6e]/30 hover:border-[#6b7b6e]/80 transition-all duration-700"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-32 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-12 h-px bg-[#2c2c2c]/20" />
            <span className="text-xs font-serif uppercase tracking-[0.5em] text-[#a89279]">
              Ink and Emptiness
            </span>
            <div className="w-12 h-px bg-[#2c2c2c]/20" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-[#2c2c2c] mb-10 leading-tight tracking-tight">
            Where ink
            <span className="block font-light italic text-[#6b7b6e]">dissolves into mist</span>
          </h1>
          <p className="text-lg font-serif font-light text-[#a89279] max-w-xl mx-auto leading-relaxed">
            Emptiness speaks louder than form. Spirit resonates beyond brushstrokes.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Composition metrics"
        className="py-16 px-8"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Followers", value: "1,204" },
            { icon: TrendingUp, label: "Growth", value: "+12%" },
            { icon: Eye, label: "Views", value: "86K" },
            { icon: Heart, label: "Saves", value: "1,847" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#f3efe8] border-l-2 border-[#2c2c2c]/15 transition-colors duration-700"
            >
              <stat.icon className="w-5 h-5 text-[#6b7b6e] mb-4" />
              <p className="text-3xl font-serif font-light text-[#2c2c2c] mb-1">{stat.value}</p>
              <p className="text-xs font-serif uppercase tracking-widest text-[#a89279]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="The five shades of ink on xuan paper"
        className="py-16 px-8 bg-[#f3efe8]"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-none overflow-hidden border-l-2 border-[#2c2c2c]/15 bg-[#f8f5f0]"
            labelClassName="text-sm font-serif font-light text-[#2c2c2c]"
            hexClassName="text-xs text-[#a89279] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Calligraphic rhythm"
        className="py-16 px-8"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-10 bg-[#f3efe8] border-l-2 border-[#2c2c2c]/15">
            <p className="text-6xl font-serif font-extralight text-[#2c2c2c] mb-6 leading-tight">Heading</p>
            <p className="text-4xl font-serif font-light text-[#2c2c2c] mb-6">Subheading</p>
            <p className="text-xl font-serif font-light text-[#a89279] mb-6 leading-relaxed">
              Body text that floats like ink on water. Generous line-height for meditative reading.
            </p>
            <p className="text-sm font-serif text-[#c4b9a8] tracking-wider uppercase">
              Caption text with quiet presence
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Ink-stroke interactions"
        className="py-16 px-8 bg-[#f3efe8]"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-10 bg-[#f8f5f0] border-l-2 border-[#2c2c2c]/15">
            <div className="flex flex-wrap gap-6 items-center">
              <button className="px-6 py-2.5 bg-[#2c2c2c] text-[#f8f5f0] font-serif text-sm tracking-wider hover:bg-[#6b7b6e] transition-all duration-700">
                Primary
              </button>
              <button className="px-6 py-2.5 bg-transparent text-[#2c2c2c] font-serif text-sm tracking-wider border-b border-[#2c2c2c]/30 hover:border-[#2c2c2c]/80 transition-all duration-700">
                Secondary
              </button>
              <button className="px-6 py-2.5 bg-transparent text-[#6b7b6e] font-serif text-sm tracking-wider border-b border-[#6b7b6e]/30 hover:border-[#6b7b6e]/80 transition-all duration-700">
                Accent
              </button>
              <button className="px-6 py-2.5 bg-transparent text-[#a89279] font-serif text-sm tracking-wider border-b border-[#c4b9a8] hover:text-[#2c2c2c] transition-all duration-700">
                Text Link
              </button>
              <button className="px-6 py-2.5 bg-transparent text-[#c4b9a8] font-serif text-sm tracking-wider border-b border-[#c4b9a8]/30 cursor-not-allowed">
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
        className="py-16 px-8"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Mountain, title: "Landscape", desc: "Distant peaks dissolve into mist, each layer lighter than the last. The composition lives in what is left unsaid." },
            { icon: Wind, title: "Breath", desc: "Whitespace flows through the design like wind through bamboo -- giving rhythm and life to every element." },
            { icon: Feather, title: "Brushwork", desc: "Each stroke is deliberate yet spontaneous. The line between control and chance creates authentic beauty." },
          ].map((card, index) => (
            <div key={index} className="p-8 bg-[#f3efe8] border-l-2 border-[#2c2c2c]/15 hover:border-[#6b7b6e]/40 transition-colors duration-700 group">
              <card.icon className="w-6 h-6 text-[#6b7b6e] mb-4 group-hover:text-[#2c2c2c] transition-colors duration-700" />
              <h3 className="text-lg font-serif font-light text-[#2c2c2c] mb-3">{card.title}</h3>
              <p className="text-sm font-serif text-[#a89279] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-16 px-8 bg-[#f3efe8]"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f8f5f0] border-l-2 border-[#2c2c2c]/15 overflow-hidden">
            <div className="flex border-b border-[#2c2c2c]/10">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-serif transition-all duration-700 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#6b7b6e] border-[#6b7b6e]"
                      : "text-[#a89279] border-transparent hover:text-[#2c2c2c]"
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
                  <h4 className="text-lg font-serif font-light text-[#2c2c2c] mb-2">The Art of Strokes</h4>
                  <p className="text-sm font-serif text-[#a89279] leading-relaxed">Every brushstroke carries the weight of intention. In ink wash, the speed, pressure, and angle of the brush determine the character of each mark -- from bold confident lines to delicate trailing whispers.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-serif font-light text-[#2c2c2c] mb-2">Contemplative Study</h4>
                  <p className="text-sm font-serif text-[#a89279] leading-relaxed">Reading in an ink wash space is an exercise in calm. The generous margins and muted palette let the mind focus entirely on the words, undistracted by visual noise.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-serif font-light text-[#2c2c2c] mb-2">Curated Works</h4>
                  <p className="text-sm font-serif text-[#a89279] leading-relaxed">A gallery of ink wash compositions, each piece selected for its mastery of emptiness and form. The spaces between works are as considered as the works themselves.</p>
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
        className="py-16 px-8"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#f3efe8] border-l-2 border-[#2c2c2c]/15 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-8 py-4 flex items-center justify-between text-left hover:bg-[#f8f5f0] transition-colors duration-700"
              >
                <span className="font-serif font-light text-[#2c2c2c]">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#a89279] transition-transform duration-700 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-8 pb-6 border-t border-[#2c2c2c]/10">
                  <p className="text-sm font-serif text-[#a89279] leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Quiet notices"
        className="py-16 px-8 bg-[#f3efe8]"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-5 bg-[#6b7b6e]/8 border-l-2 border-[#6b7b6e]">
            <Check className="w-4 h-4 text-[#6b7b6e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-light text-[#6b7b6e]">Composition saved</p>
              <p className="text-xs font-serif text-[#6b7b6e]/60 mt-0.5">Your work has been preserved.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 bg-[#a89279]/8 border-l-2 border-[#a89279]">
            <AlertTriangle className="w-4 h-4 text-[#a89279] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-light text-[#a89279]">Ink running low</p>
              <p className="text-xs font-serif text-[#a89279]/60 mt-0.5">Consider preparing fresh ink for the next session.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 bg-[#8b6f4e]/8 border-l-2 border-[#8b6f4e]">
            <X className="w-4 h-4 text-[#8b6f4e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-light text-[#8b6f4e]">Stroke failed</p>
              <p className="text-xs font-serif text-[#8b6f4e]/60 mt-0.5">The paper could not absorb the ink. Please try again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 bg-[#2c2c2c]/5 border-l-2 border-[#2c2c2c]/30">
            <Info className="w-4 h-4 text-[#2c2c2c]/60 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-light text-[#2c2c2c]/70">Practice note</p>
              <p className="text-xs font-serif text-[#2c2c2c]/40 mt-0.5">Let the brush rest before attempting fine detail work.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-8"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f3efe8] border-l-2 border-[#2c2c2c]/15 p-8 space-y-5">
            {[
              { label: "Meditative Mode", desc: "Extended pauses between transitions" },
              { label: "Ink Density Control", desc: "Adjust visual weight of elements" },
              { label: "Auto-save Scrolls", desc: "Preserve compositions automatically" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-serif text-[#2c2c2c]">{item.label}</p>
                  <p className="text-xs font-serif text-[#a89279] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-700 ${
                    toggleStates[index] ? "bg-[#6b7b6e]" : "bg-[#c4b9a8]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-[#f8f5f0] rounded-full shadow-sm transition-transform duration-700 ${
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
        subtitle="Quiet indicators"
        className="py-16 px-8 bg-[#f3efe8]"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f8f5f0] border-l-2 border-[#2c2c2c]/15 p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-serif text-[#2c2c2c]">Scroll progress</p>
                <p className="text-xs text-[#a89279] font-mono">{progress}%</p>
              </div>
              <div className="h-1 bg-[#c4b9a8]/30 rounded-full">
                <div
                  className="h-full bg-[#6b7b6e] rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-serif text-[#2c2c2c] mb-2">Chapter completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1 bg-[#c4b9a8]/30 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${value === 100 ? "bg-[#6b7b6e]" : value > 0 ? "bg-[#a89279]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs font-serif text-[#a89279] mt-1 text-center">Ch.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#2c2c2c]/10">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-serif border-b border-[#c4b9a8] text-[#a89279] hover:border-[#2c2c2c] hover:text-[#2c2c2c] transition-all duration-700"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-serif bg-[#2c2c2c] text-[#f8f5f0] hover:bg-[#6b7b6e] transition-all duration-700"
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
        subtitle="Ink-line inputs"
        className="py-16 px-8"
        titleClassName="text-2xl font-serif font-light text-[#2c2c2c] mb-2"
        subtitleClassName="text-sm font-serif text-[#a89279] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#f3efe8] border-l-2 border-[#2c2c2c]/15 p-10">
            <h3 className="text-lg font-serif font-light text-[#2c2c2c] mb-8">Send a Message</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-[#a89279] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-0 py-2 bg-transparent border-b border-[#c4b9a8]/50 text-[#2c2c2c] font-serif placeholder-[#c4b9a8] focus:outline-none focus:border-[#6b7b6e] transition-colors duration-700"
                />
              </div>
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-[#a89279] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-0 py-2 bg-transparent border-b border-[#c4b9a8]/50 text-[#2c2c2c] font-serif placeholder-[#c4b9a8] focus:outline-none focus:border-[#6b7b6e] transition-colors duration-700"
                />
              </div>
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-[#a89279] mb-2">Message</label>
                <textarea
                  placeholder="Your thoughts..."
                  rows={3}
                  className="w-full px-0 py-2 bg-transparent border-b border-[#c4b9a8]/50 text-[#2c2c2c] font-serif placeholder-[#c4b9a8] focus:outline-none focus:border-[#6b7b6e] transition-colors duration-700 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#2c2c2c] text-[#f8f5f0] font-serif text-sm tracking-wider hover:bg-[#6b7b6e] transition-all duration-700 mt-2">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-8 border-t border-[#2c2c2c]/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-serif text-[#a89279] tracking-wider">
            Ink Wash Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#6b7b6e] transition-colors duration-700">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
