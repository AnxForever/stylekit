"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Flame, Sparkles, Sun,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  PartyPopper, Palette, Crown,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Vermillion", hex: "#e63946", bg: "bg-[#e63946]" },
  { name: "Warm White", hex: "#fff8e7", bg: "bg-[#fff8e7]", border: true },
  { name: "Saffron", hex: "#ff9f1c", bg: "bg-[#ff9f1c]" },
  { name: "Royal Purple", hex: "#7b2d8e", bg: "bg-[#7b2d8e]" },
  { name: "Teal", hex: "#2a9d8f", bg: "bg-[#2a9d8f]" },
  { name: "Gold", hex: "#d4af37", bg: "bg-[#d4af37]" },
  { name: "Deep Magenta", hex: "#a8235a", bg: "bg-[#a8235a]" },
  { name: "Ivory Glow", hex: "#fef3d0", bg: "bg-[#fef3d0]", border: true },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Diwali", icon: Flame },
    { label: "Holi", icon: Palette },
    { label: "Festive", icon: PartyPopper },
  ];

  const accordionItems = [
    { title: "What is Indian Festive Design?", content: "Indian Festive design draws from the rich visual traditions of Diwali, Holi, and other celebrations across the Indian subcontinent. It embraces bold jewel tones, gold ornamentation, and mandala-inspired patterns to create interfaces that radiate warmth and joy." },
    { title: "The Language of Color", content: "Every color carries meaning: vermillion for auspiciousness, saffron for sacred fire, gold for prosperity, purple for royalty, and teal for renewal. Together, they create a visual celebration that honors millennia of artistic tradition." },
    { title: "Gold as Sacred Element", content: "Gold is the soul of Indian decorative arts. From temple architecture to textile embroidery, golden borders, accents, and glow effects signify the divine and the prosperous. In digital design, gold gradients and glowing borders carry this legacy forward." },
  ];

  return (
    <div className="min-h-screen bg-[#fff8e7] text-[#7b2d8e]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b-2 border-[#d4af37]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/indian-festive"
            className="flex items-center gap-2 text-[#d4af37] hover:text-[#e63946] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="font-bold text-lg tracking-wide text-[#7b2d8e]">
              Indian Festive
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-bold tracking-wide text-[#e63946] border-2 border-[#d4af37]/50 rounded-xl hover:bg-[#e63946] hover:text-white hover:border-[#e63946] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 bg-gradient-to-br from-[#fff8e7] via-[#ff9f1c]/10 to-[#e63946]/10 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-4 border-[#d4af37]/20 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-[#d4af37]/30 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-24 h-1 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] mb-8 leading-tight tracking-wide">
            Festival of
            <span className="block text-[#7b2d8e]">Light and Color</span>
          </h1>
          <p className="text-lg font-medium text-[#7b2d8e]/70 max-w-xl mx-auto leading-relaxed">
            Where every color tells a story and every glow carries a blessing.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Celebration metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Followers", value: "5,412" },
            { icon: TrendingUp, label: "Growth", value: "+34%" },
            { icon: Eye, label: "Views", value: "287K" },
            { icon: Heart, label: "Saves", value: "6,108" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 shadow-[0_4px_16px_rgba(212,175,55,0.15)]"
            >
              <stat.icon className="w-5 h-5 text-[#e63946] mb-4" />
              <p className="text-3xl font-bold text-[#7b2d8e] mb-1">{stat.value}</p>
              <p className="text-xs font-bold tracking-wide text-[#d4af37]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Jewel tones and sacred hues"
        className="py-16 px-6 bg-gradient-to-r from-[#fff8e7] to-[#fef3d0]"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-xl overflow-hidden border-2 border-[#d4af37]/30 bg-[#fff8e7] shadow-[0_2px_8px_rgba(212,175,55,0.15)]"
            labelClassName="text-sm font-bold text-[#7b2d8e]"
            hexClassName="text-xs text-[#d4af37] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Bold and celebratory"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 shadow-[0_4px_16px_rgba(212,175,55,0.15)]">
            <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e63946] to-[#d4af37] mb-4 leading-tight">Heading</p>
            <p className="text-4xl font-bold text-[#7b2d8e] mb-4">Subheading</p>
            <p className="text-xl text-[#7b2d8e]/70 mb-4 leading-relaxed">
              Body text that celebrates. Rich warmth in every word, with purposeful weight.
            </p>
            <p className="text-sm text-[#d4af37] tracking-wide font-bold">
              Caption text adorned with golden warmth
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Gold-trimmed interactions"
        className="py-16 px-6 bg-gradient-to-r from-[#fff8e7] to-[#fef3d0]"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 shadow-[0_4px_16px_rgba(212,175,55,0.15)]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#e63946] text-white font-bold tracking-wide rounded-xl border-2 border-[#d4af37] shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:shadow-[0_0_28px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#fff8e7] text-[#7b2d8e] font-bold tracking-wide rounded-xl border-2 border-[#d4af37]/50 hover:border-[#d4af37] hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] transition-all duration-300">
                Secondary
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#e63946] to-[#ff9f1c] text-white font-bold tracking-wide rounded-xl border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_32px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300">
                Gradient
              </button>
              <button className="px-6 py-3 bg-[#7b2d8e] text-white font-bold tracking-wide rounded-xl border-2 border-[#d4af37]/40 hover:bg-[#6b1d7e] transition-all duration-300">
                Accent
              </button>
              <button className="px-6 py-3 bg-[#d4af37]/20 text-[#d4af37]/60 font-bold tracking-wide rounded-xl border-2 border-[#d4af37]/20 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Golden containers of content"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Flame, title: "Diwali", desc: "The festival of lights illuminating the darkness, celebrating the triumph of good over evil with a thousand glowing diyas." },
            { icon: Sun, title: "Holi", desc: "A riot of color painting the world in joy, where barriers dissolve and hearts unite under showers of vibrant pigments." },
            { icon: Crown, title: "Heritage", desc: "Centuries of artistic tradition woven into every pattern, every border, every golden thread of this visual celebration." },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 shadow-[0_4px_16px_rgba(212,175,55,0.15)] hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition-all duration-300 group">
              <div className="w-12 h-1 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mb-4" />
              <card.icon className="w-6 h-6 text-[#e63946] mb-4 group-hover:text-[#d4af37] transition-colors" />
              <h3 className="text-lg font-bold text-[#7b2d8e] mb-3 tracking-wide">{card.title}</h3>
              <p className="text-sm text-[#7b2d8e]/60 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Festive navigation"
        className="py-16 px-6 bg-gradient-to-r from-[#fff8e7] to-[#fef3d0]"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 shadow-[0_4px_16px_rgba(212,175,55,0.15)] overflow-hidden">
            <div className="flex border-b-2 border-[#d4af37]/20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#e63946] border-[#e63946] bg-[#e63946]/5"
                      : "text-[#d4af37] border-transparent hover:text-[#7b2d8e]"
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
                  <h4 className="text-lg font-bold text-[#7b2d8e] mb-2">Festival of Lights</h4>
                  <p className="text-sm text-[#7b2d8e]/60 leading-relaxed">Rows of earthen diyas cast a warm golden glow across courtyards. Rangoli patterns bloom on every threshold, and the night sky erupts with cascading sparks of celebration.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-[#7b2d8e] mb-2">Festival of Colors</h4>
                  <p className="text-sm text-[#7b2d8e]/60 leading-relaxed">Clouds of colored powder fill the air as joyful shouts echo through the streets. Every surface becomes a canvas, every person a walking artwork of shared celebration.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-[#7b2d8e] mb-2">Living Tradition</h4>
                  <p className="text-sm text-[#7b2d8e]/60 leading-relaxed">Generations of artisans keep the flame alive, weaving gold threads into silk, painting intricate mandalas by hand, preserving beauty that transcends time.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Expanding wisdom"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 overflow-hidden shadow-[0_2px_8px_rgba(212,175,55,0.1)]">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#d4af37]/5 transition-colors"
              >
                <span className="font-bold text-[#7b2d8e] tracking-wide">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#d4af37] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-2 border-[#d4af37]/20">
                  <p className="text-sm text-[#7b2d8e]/60 leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Festive notifications"
        className="py-16 px-6 bg-gradient-to-r from-[#fff8e7] to-[#fef3d0]"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#2a9d8f]/10 rounded-xl border-l-4 border-[#2a9d8f]">
            <Check className="w-4 h-4 text-[#2a9d8f] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#2a9d8f]">Celebration confirmed</p>
              <p className="text-xs text-[#2a9d8f]/70 mt-0.5">Your festive gathering is all set.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ff9f1c]/10 rounded-xl border-l-4 border-[#ff9f1c]">
            <AlertTriangle className="w-4 h-4 text-[#ff9f1c] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#ff9f1c]">Preparation note</p>
              <p className="text-xs text-[#ff9f1c]/70 mt-0.5">Ensure all decorations are in place before the ceremony.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#e63946]/10 rounded-xl border-l-4 border-[#e63946]">
            <X className="w-4 h-4 text-[#e63946] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#e63946]">Something went wrong</p>
              <p className="text-xs text-[#e63946]/70 mt-0.5">The offering could not be completed. Please try again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#7b2d8e]/10 rounded-xl border-l-4 border-[#7b2d8e]">
            <Info className="w-4 h-4 text-[#7b2d8e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#7b2d8e]">Did you know?</p>
              <p className="text-xs text-[#7b2d8e]/70 mt-0.5">Each color in Indian tradition carries deep symbolic meaning.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 p-6 space-y-5 shadow-[0_4px_16px_rgba(212,175,55,0.15)]">
            {[
              { label: "Gold Glow Effects", desc: "Enable golden light accents throughout the interface" },
              { label: "Mandala Decorations", desc: "Show ornamental mandala patterns in backgrounds" },
              { label: "Festive Animations", desc: "Animate transitions with celebratory motion" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-bold text-[#7b2d8e]">{item.label}</p>
                  <p className="text-xs text-[#7b2d8e]/50 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    toggleStates[index] ? "bg-[#e63946] shadow-[0_0_12px_rgba(230,57,70,0.4)]" : "bg-[#d4af37]/30"
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
        subtitle="Illumination journey"
        className="py-16 px-6 bg-gradient-to-r from-[#fff8e7] to-[#fef3d0]"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 p-6 space-y-6 shadow-[0_4px_16px_rgba(212,175,55,0.15)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-[#7b2d8e]">Festive preparations</p>
                <p className="text-xs text-[#d4af37] font-mono">{progress}%</p>
              </div>
              <div className="h-2 bg-[#d4af37]/20 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-[#7b2d8e] mb-2">Ceremony stages</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-2 bg-[#d4af37]/20 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all ${value === 100 ? "bg-[#2a9d8f]" : value > 0 ? "bg-[#ff9f1c]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#d4af37] mt-1 text-center font-bold">Stage {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-2 border-[#d4af37]/20">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-bold tracking-wide border-2 border-[#d4af37]/40 text-[#d4af37] rounded-xl hover:border-[#e63946] hover:text-[#e63946] transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-bold tracking-wide bg-[#e63946] text-white rounded-xl border-2 border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all duration-300"
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
        subtitle="Golden inputs"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold tracking-wide text-[#7b2d8e] mb-2"
        subtitleClassName="text-sm text-[#d4af37] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 p-8 shadow-[0_4px_16px_rgba(212,175,55,0.15)]">
            <div className="w-16 h-1 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mb-6" />
            <h3 className="text-lg font-bold text-[#7b2d8e] mb-6 tracking-wide">Send a Blessing</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wide text-[#d4af37] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-[#fff8e7] border-2 border-[#d4af37]/30 rounded-xl text-[#7b2d8e] placeholder-[#d4af37]/40 font-medium focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_16px_rgba(212,175,55,0.4)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wide text-[#d4af37] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[#fff8e7] border-2 border-[#d4af37]/30 rounded-xl text-[#7b2d8e] placeholder-[#d4af37]/40 font-medium focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_16px_rgba(212,175,55,0.4)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wide text-[#d4af37] mb-2">Message</label>
                <textarea
                  placeholder="Your blessing..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#fff8e7] border-2 border-[#d4af37]/30 rounded-xl text-[#7b2d8e] placeholder-[#d4af37]/40 font-medium focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_16px_rgba(212,175,55,0.4)] transition-all duration-300 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-[#e63946] to-[#ff9f1c] text-white font-bold tracking-wide rounded-xl border-2 border-[#d4af37] shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:shadow-[0_0_28px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 mt-2">
                Send Blessing
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-2 border-[#d4af37]/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-16 h-1 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-4" />
          <p className="text-xs text-[#d4af37] tracking-wide font-bold">
            Indian Festive Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#e63946] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
