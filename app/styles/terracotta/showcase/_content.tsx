"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Sun, Flower2, Mountain, Leaf,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  UtensilsCrossed, Map, Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Cream", hex: "#faf5ef", bg: "bg-[#faf5ef]", border: true },
  { name: "Warm White", hex: "#fff8f0", bg: "bg-[#fff8f0]", border: true },
  { name: "Sand", hex: "#d4a373", bg: "bg-[#d4a373]" },
  { name: "Terracotta", hex: "#b5654a", bg: "bg-[#b5654a]" },
  { name: "Deep Clay", hex: "#a05a42", bg: "bg-[#a05a42]" },
  { name: "Earth Brown", hex: "#7a6350", bg: "bg-[#7a6350]" },
  { name: "Olive Green", hex: "#8b9d77", bg: "bg-[#8b9d77]" },
  { name: "Pale Sage", hex: "#b5c4a8", bg: "bg-[#b5c4a8]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Kitchen", icon: UtensilsCrossed },
    { label: "Travel", icon: Map },
    { label: "Crafts", icon: Palette },
  ];

  const accordionItems = [
    { title: "What is Terracotta Design?", content: "Terracotta design draws from the Mediterranean tradition of sun-baked clay, ancient pottery, and warm earth tones. It translates the tactile warmth of handcrafted ceramics into digital interfaces that feel inviting and grounded." },
    { title: "Earth Tone Principles", content: "The palette centers on terracotta (#b5654a) as the primary accent, surrounded by cream backgrounds, sandy mid-tones, and deep earth browns. Olive green provides natural vitality, like herbs growing in a clay pot." },
    { title: "Handcrafted Feel", content: "Rounded corners evoke the organic shapes of hand-thrown pottery. Warm shadows with terracotta tints create depth that feels natural rather than digital. Every element should feel like it was shaped by human hands." },
  ];

  return (
    <div className="min-h-screen bg-[#faf5ef] text-[#7a6350]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#d4a373]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/terracotta"
            className="flex items-center gap-2 text-[#d4a373] hover:text-[#b5654a] transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#b5654a]" />
            <span className="font-semibold text-lg tracking-wide text-[#7a6350]">
              Terracotta
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm text-[#b5654a] border border-[#b5654a]/30 rounded-lg hover:bg-[#b5654a] hover:text-[#faf5ef] transition-colors duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#d4a373]/40" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#d4a373]">Mediterranean Warmth</span>
            <div className="w-8 h-px bg-[#d4a373]/40" />
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold text-[#7a6350] mb-8 leading-tight">
            Shaped by
            <span className="block font-medium italic text-[#b5654a]">sun and earth</span>
          </h1>
          <p className="text-lg text-[#7a6350]/75 max-w-xl mx-auto leading-relaxed">
            Warm clay tones, handcrafted textures, and the golden light of Mediterranean afternoons.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Design metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Followers", value: "3,481" },
            { icon: TrendingUp, label: "Growth", value: "+21%" },
            { icon: Eye, label: "Views", value: "178K" },
            { icon: Heart, label: "Saves", value: "4,023" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl border border-[#d4a373]/20 shadow-md shadow-[#b5654a]/8"
            >
              <stat.icon className="w-5 h-5 text-[#b5654a] mb-4" />
              <p className="text-3xl font-semibold text-[#7a6350] mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-[#d4a373]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Inspired by sun-baked clay and olive groves"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-xl overflow-hidden border border-[#d4a373]/20 bg-white shadow-sm shadow-[#b5654a]/5"
            labelClassName="text-sm font-semibold text-[#7a6350]"
            hexClassName="text-xs text-[#d4a373] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Warm and inviting"
        className="py-16 px-6"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-white rounded-xl border border-[#d4a373]/20 shadow-md shadow-[#b5654a]/8">
            <p className="text-6xl font-semibold text-[#7a6350] mb-4 leading-tight">Heading</p>
            <p className="text-4xl font-medium text-[#7a6350] mb-4">Subheading</p>
            <p className="text-xl text-[#7a6350]/75 mb-4 leading-relaxed">
              Body text with comfortable warmth. Generous line-height for relaxed reading.
            </p>
            <p className="text-sm text-[#d4a373] tracking-wider uppercase">
              Caption text with earthy presence
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Warm and rounded"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white rounded-xl border border-[#d4a373]/20 shadow-md shadow-[#b5654a]/8">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#b5654a] text-[#faf5ef] text-sm font-medium tracking-wide rounded-lg shadow-md shadow-[#b5654a]/15 hover:bg-[#a05a42] transition-colors duration-300">
                Primary
              </button>
              <button className="px-6 py-3 border border-[#b5654a]/40 text-[#b5654a] text-sm font-medium tracking-wide rounded-lg hover:bg-[#b5654a] hover:text-[#faf5ef] transition-colors duration-300">
                Secondary
              </button>
              <button className="px-6 py-3 bg-[#8b9d77] text-white text-sm font-medium tracking-wide rounded-lg shadow-md shadow-[#8b9d77]/15 hover:bg-[#7a8c68] transition-colors duration-300">
                Accent
              </button>
              <button className="px-6 py-3 text-[#b5654a] text-sm font-medium tracking-wide underline underline-offset-4 decoration-[#d4a373]/40 hover:decoration-[#b5654a] transition-colors duration-300">
                Text Link
              </button>
              <button className="px-6 py-3 bg-[#d4a373]/20 text-[#d4a373] text-sm font-medium tracking-wide rounded-lg cursor-not-allowed">
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
        className="py-16 px-6"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Flower2, title: "Craftsmanship", desc: "Every piece tells the story of hands shaping clay, of ancient kilns breathing life into earth. Design that honors the maker." },
            { icon: Mountain, title: "Landscape", desc: "Terracotta hills rolling toward the sea, dotted with olive trees and wildflowers. Colors drawn directly from the land itself." },
            { icon: Leaf, title: "Growth", desc: "Olive green accents bring living energy to warm earth tones. Like herbs sprouting from a clay pot on a sunlit windowsill." },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-white rounded-xl border border-[#d4a373]/20 shadow-md shadow-[#b5654a]/8 hover:shadow-lg hover:shadow-[#b5654a]/12 transition-all duration-300 group">
              <card.icon className="w-6 h-6 text-[#b5654a] mb-4 group-hover:text-[#a05a42] transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-[#7a6350] mb-3">{card.title}</h3>
              <p className="text-sm text-[#7a6350]/75 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-[#d4a373]/20 shadow-md shadow-[#b5654a]/8 overflow-hidden">
            <div className="flex border-b border-[#d4a373]/20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors duration-300 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#b5654a] border-[#b5654a]"
                      : "text-[#d4a373] border-transparent hover:text-[#7a6350]"
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
                  <h4 className="text-lg font-semibold text-[#7a6350] mb-2">Mediterranean Kitchen</h4>
                  <p className="text-sm text-[#7a6350]/75 leading-relaxed">Sun-ripened tomatoes, fresh herbs from the garden, olive oil pressed from local groves. The kitchen is the heart of the home, where terracotta tiles warm bare feet and copper pots catch the light.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-semibold text-[#7a6350] mb-2">Coastal Villages</h4>
                  <p className="text-sm text-[#7a6350]/75 leading-relaxed">Winding stone streets, whitewashed walls with terracotta roofs, bougainvillea spilling over ancient balconies. Every corner reveals centuries of beauty shaped by the sea and sun.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-semibold text-[#7a6350] mb-2">Ceramic Arts</h4>
                  <p className="text-sm text-[#7a6350]/75 leading-relaxed">The potter&apos;s wheel spins, and raw earth becomes art. Each piece is unique, carrying the fingerprints of its maker and the warmth of the kiln that gave it form.</p>
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
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-[#d4a373]/20 shadow-sm shadow-[#b5654a]/5 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#faf5ef] transition-colors duration-300"
              >
                <span className="font-semibold text-[#7a6350]">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#d4a373] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#d4a373]/15">
                  <p className="text-sm text-[#7a6350]/75 leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Warm notifications"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#8b9d77]/10 rounded-lg border-l-4 border-[#8b9d77]">
            <Check className="w-4 h-4 text-[#8b9d77] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#8b9d77]">Saved successfully</p>
              <p className="text-xs text-[#8b9d77]/70 mt-0.5">Your creation has been preserved.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#d4a373]/10 rounded-lg border-l-4 border-[#d4a373]">
            <AlertTriangle className="w-4 h-4 text-[#d4a373] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#d4a373]">Please note</p>
              <p className="text-xs text-[#d4a373]/70 mt-0.5">The kiln needs more time to cool.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#b5654a]/10 rounded-lg border-l-4 border-[#b5654a]">
            <X className="w-4 h-4 text-[#b5654a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#b5654a]">Firing failed</p>
              <p className="text-xs text-[#b5654a]/70 mt-0.5">The piece did not survive the kiln. Please try again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#7a6350]/8 rounded-lg border-l-4 border-[#7a6350]/40">
            <Info className="w-4 h-4 text-[#7a6350]/60 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-[#7a6350]/70">Crafting tip</p>
              <p className="text-xs text-[#7a6350]/50 mt-0.5">Let the clay rest before shaping fine details.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-[#d4a373]/20 p-6 shadow-md shadow-[#b5654a]/8 space-y-5">
            {[
              { label: "Warm Tones Mode", desc: "Enhance earthy warmth across the interface" },
              { label: "Tactile Feedback", desc: "Subtle haptic response on interactions" },
              { label: "Auto-save Creations", desc: "Preserve your work automatically" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium text-[#7a6350]">{item.label}</p>
                  <p className="text-xs text-[#d4a373] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    toggleStates[index] ? "bg-[#b5654a]" : "bg-[#d4a373]/40"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
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
        subtitle="Warm indicators"
        className="py-16 px-6 bg-white/60"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-[#d4a373]/20 p-6 shadow-md shadow-[#b5654a]/8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-[#7a6350]">Firing progress</p>
                <p className="text-xs text-[#d4a373] font-mono">{progress}%</p>
              </div>
              <div className="h-2 bg-[#d4a373]/20 rounded-full">
                <div
                  className="h-full bg-[#b5654a] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#7a6350] mb-2">Stage completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-2 bg-[#d4a373]/20 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${value === 100 ? "bg-[#8b9d77]" : value > 0 ? "bg-[#d4a373]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#d4a373] mt-1 text-center">S{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#d4a373]/15">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-medium border border-[#d4a373]/40 text-[#7a6350] rounded-lg hover:border-[#b5654a] hover:text-[#b5654a] transition-colors duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-medium bg-[#b5654a] text-[#faf5ef] rounded-lg hover:bg-[#a05a42] transition-colors duration-300"
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
        subtitle="Warm inputs"
        className="py-16 px-6"
        titleClassName="text-2xl font-semibold text-[#7a6350] mb-2"
        subtitleClassName="text-sm text-[#d4a373] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl border border-[#d4a373]/20 p-8 shadow-md shadow-[#b5654a]/8">
            <h3 className="text-lg font-semibold text-[#7a6350] mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4a373] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white border border-[#d4a373]/40 rounded-lg text-[#7a6350] placeholder-[#d4a373]/50 focus:outline-none focus:border-[#b5654a] focus:ring-2 focus:ring-[#b5654a]/20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4a373] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white border border-[#d4a373]/40 rounded-lg text-[#7a6350] placeholder-[#d4a373]/50 focus:outline-none focus:border-[#b5654a] focus:ring-2 focus:ring-[#b5654a]/20 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4a373] mb-2">Message</label>
                <textarea
                  placeholder="Your thoughts..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border border-[#d4a373]/40 rounded-lg text-[#7a6350] placeholder-[#d4a373]/50 focus:outline-none focus:border-[#b5654a] focus:ring-2 focus:ring-[#b5654a]/20 transition-all duration-300 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#b5654a] text-[#faf5ef] text-sm font-medium tracking-wide rounded-lg shadow-md shadow-[#b5654a]/15 hover:bg-[#a05a42] transition-colors duration-300 mt-2">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#d4a373]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-[#d4a373] tracking-wider">
            Terracotta Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#b5654a] transition-colors duration-300">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
