"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Flower2, Leaf,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Feather, Library, Microscope,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Parchment Cream", hex: "#faf5ef", bg: "bg-[#faf5ef]", border: true },
  { name: "Aged Paper", hex: "#f4ede3", bg: "bg-[#f4ede3]", border: true },
  { name: "Deep Forest", hex: "#2d4a2d", bg: "bg-[#2d4a2d]" },
  { name: "Fern Green", hex: "#3d5c3d", bg: "bg-[#3d5c3d]" },
  { name: "Herbarium Gold", hex: "#8b6914", bg: "bg-[#8b6914]" },
  { name: "Dried Rose", hex: "#6b3a3a", bg: "bg-[#6b3a3a]" },
  { name: "Sepia", hex: "#7a6548", bg: "bg-[#7a6548]" },
  { name: "Ink Black", hex: "#2a2a2a", bg: "bg-[#2a2a2a]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Herbarium", icon: Leaf },
    { label: "Library", icon: Library },
    { label: "Field Notes", icon: Feather },
  ];

  const accordionItems = [
    { title: "What is Victorian Botanical Design?", content: "Victorian Botanical design draws from the 19th-century tradition of scientific illustration. Botanists and artists meticulously documented plant specimens with fine line drawings, creating works that served both as scientific records and artistic masterpieces." },
    { title: "Key Principles", content: "Precision in every stroke. Serif typography, warm parchment backgrounds, fine-line borders inspired by copper engravings, and a palette of deep forest green and antique gold. Every element is arranged with the careful deliberation of a museum curator." },
    { title: "The Natural History Aesthetic", content: "The style evokes the hushed elegance of a Victorian-era natural history museum: specimen labels in italic script, ornamental dividers reminiscent of botanical plates, and a reverence for the natural world that balances science with art." },
  ];

  return (
    <div className="min-h-screen bg-[#faf5ef] text-[#2d4a2d]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#2d4a2d]/15">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/victorian-botanical"
            className="flex items-center gap-2 text-[#8b6914] hover:text-[#2d4a2d] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-serif">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Flower2 className="w-4 h-4 text-[#8b6914]" />
            <span className="font-serif text-lg tracking-wide text-[#2d4a2d]">
              Victorian Botanical
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-serif text-[#2d4a2d] border border-[#2d4a2d]/30 rounded-lg hover:bg-[#2d4a2d] hover:text-[#faf5ef] transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8b6914]/40 to-transparent" />
            <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b6914]">Natural History Collection</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#8b6914]/40 to-transparent" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#2d4a2d] mb-8 leading-tight tracking-wide">
            Botanical
            <span className="block font-serif italic text-[#8b6914]">Illustrations</span>
          </h1>
          <p className="text-lg font-serif italic text-[#2d4a2d]/60 max-w-xl mx-auto leading-relaxed">
            Delicate line drawings, floral ornaments, and the timeless elegance of the natural history museum.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Collection metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Scholars", value: "1,847" },
            { icon: TrendingUp, label: "Growth", value: "+12%" },
            { icon: Eye, label: "Examinations", value: "86K" },
            { icon: Heart, label: "Collections", value: "2,561" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#faf5ef] rounded-lg border border-[#2d4a2d]/20 shadow-[0_2px_8px_rgba(45,74,45,0.08)]"
            >
              <stat.icon className="w-5 h-5 text-[#8b6914] mb-4" />
              <p className="text-3xl font-serif text-[#2d4a2d] mb-1">{stat.value}</p>
              <p className="text-xs font-serif uppercase tracking-widest text-[#8b6914]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Inspired by parchment, pressed flora, and antique bindings"
        className="py-16 px-6 bg-[#f4ede3]"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden border border-[#2d4a2d]/20 bg-[#faf5ef]"
            labelClassName="text-sm font-serif text-[#2d4a2d]"
            hexClassName="text-xs text-[#8b6914] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Refined serif lettering"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#faf5ef] rounded-lg border border-[#2d4a2d]/20 shadow-[0_2px_8px_rgba(45,74,45,0.08)]">
            <p className="text-6xl font-serif text-[#2d4a2d] mb-4 leading-tight tracking-wide">Heading</p>
            <p className="text-4xl font-serif text-[#2d4a2d] mb-4">Subheading</p>
            <p className="text-xl font-serif text-[#2d4a2d]/60 mb-4 leading-relaxed italic">
              Body text that breathes. Generous leading for comfortable, scholarly reading.
            </p>
            <p className="text-sm font-serif text-[#8b6914] tracking-[0.3em] uppercase">
              Specimen label with fine spacing
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Restrained and purposeful"
        className="py-16 px-6 bg-[#f4ede3]"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#faf5ef] rounded-lg border border-[#2d4a2d]/20 shadow-[0_2px_8px_rgba(45,74,45,0.08)]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#2d4a2d] text-[#faf5ef] text-sm font-serif tracking-wide rounded-lg border border-[#8b6914]/60 hover:bg-[#3d5c3d] transition-all duration-300">
                Primary
              </button>
              <button className="px-6 py-3 border border-[#2d4a2d]/30 text-[#2d4a2d] text-sm font-serif tracking-wide rounded-lg hover:border-[#8b6914] hover:text-[#8b6914] transition-all duration-300">
                Secondary
              </button>
              <button className="px-6 py-3 text-[#8b6914] text-sm font-serif tracking-wide hover:text-[#2d4a2d] transition-colors underline underline-offset-4 decoration-[#8b6914]/30">
                Text Link
              </button>
              <button className="px-6 py-3 bg-[#8b6914] text-[#faf5ef] text-sm font-serif tracking-wide rounded-lg hover:bg-[#7a5c12] transition-all duration-300">
                Accent
              </button>
              <button className="px-6 py-3 bg-[#2d4a2d]/10 text-[#2d4a2d]/40 text-sm font-serif tracking-wide rounded-lg cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Specimen containers"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Flower2, title: "Rosa Damascena", subtitle: "Rosaceae Family", desc: "A heritage rose cultivar prized for its intoxicating fragrance, documented extensively in Victorian botanical surveys across the British Empire." },
            { icon: Leaf, title: "Ficus Elastica", subtitle: "Moraceae Family", desc: "The rubber plant, brought from tropical forests to Victorian parlours, became a symbol of exotic botanical discovery and domestic refinement." },
            { icon: Microscope, title: "Drosera Rotundifolia", subtitle: "Droseraceae Family", desc: "The common sundew fascinated Victorian naturalists with its carnivorous nature, inspiring Darwin's detailed studies on insectivorous plants." },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-[#faf5ef] rounded-lg border border-[#2d4a2d]/20 shadow-[0_2px_8px_rgba(45,74,45,0.08)] hover:border-[#8b6914]/40 hover:shadow-[0_4px_12px_rgba(139,105,20,0.12)] transition-all duration-300 group">
              <card.icon className="w-6 h-6 text-[#8b6914] mb-4 group-hover:text-[#2d4a2d] transition-colors" />
              <div className="border-b border-[#2d4a2d]/10 pb-3 mb-3">
                <h3 className="text-lg font-serif text-[#2d4a2d] tracking-wide">{card.title}</h3>
                <p className="text-sm font-serif text-[#8b6914] italic mt-1">{card.subtitle}</p>
              </div>
              <p className="text-sm font-serif text-[#2d4a2d]/70 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-16 px-6 bg-[#f4ede3]"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#faf5ef] rounded-lg border border-[#2d4a2d]/20 overflow-hidden">
            <div className="flex border-b border-[#2d4a2d]/15">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-serif transition-colors border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#8b6914] border-[#8b6914]"
                      : "text-[#2d4a2d]/50 border-transparent hover:text-[#2d4a2d]"
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
                  <h4 className="text-lg font-serif text-[#2d4a2d] mb-2">The Pressed Collection</h4>
                  <p className="text-sm font-serif text-[#2d4a2d]/60 leading-relaxed">Rows upon rows of carefully pressed specimens, each mounted on acid-free paper and labeled in a curator&apos;s precise hand. The herbarium holds over two thousand catalogued species.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-serif text-[#2d4a2d] mb-2">The Reading Room</h4>
                  <p className="text-sm font-serif text-[#2d4a2d]/60 leading-relaxed">Leather-bound volumes line mahogany shelves. Linnaeus, Darwin, and Hooker stand alongside hand-coloured botanical plates from the golden age of scientific illustration.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-serif text-[#2d4a2d] mb-2">Expedition Journals</h4>
                  <p className="text-sm font-serif text-[#2d4a2d]/60 leading-relaxed">Field notes from distant expeditions, written in fading sepia ink. Sketches of newly discovered species mingle with observations on climate, soil, and local cultivation methods.</p>
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
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#faf5ef] rounded-lg border border-[#2d4a2d]/20 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#f4ede3] transition-colors"
              >
                <span className="font-serif text-[#2d4a2d]">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#8b6914] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#2d4a2d]/10">
                  <p className="text-sm font-serif text-[#2d4a2d]/60 leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Notices and annotations"
        className="py-16 px-6 bg-[#f4ede3]"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#3d5c3d]/10 rounded-lg border-l-2 border-[#3d5c3d]">
            <Check className="w-4 h-4 text-[#3d5c3d] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-medium text-[#3d5c3d]">Specimen catalogued</p>
              <p className="text-xs font-serif text-[#3d5c3d]/70 mt-0.5">The entry has been added to the permanent collection.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#8b6914]/10 rounded-lg border-l-2 border-[#8b6914]">
            <AlertTriangle className="w-4 h-4 text-[#8b6914] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-medium text-[#8b6914]">Conservation notice</p>
              <p className="text-xs font-serif text-[#8b6914]/70 mt-0.5">Handle with care. This specimen is fragile and light-sensitive.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#6b3a3a]/10 rounded-lg border-l-2 border-[#6b3a3a]">
            <X className="w-4 h-4 text-[#6b3a3a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-medium text-[#6b3a3a]">Identification error</p>
              <p className="text-xs font-serif text-[#6b3a3a]/70 mt-0.5">The species classification requires revision. Please consult the reference index.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#2d4a2d]/8 rounded-lg border-l-2 border-[#2d4a2d]/60">
            <Info className="w-4 h-4 text-[#2d4a2d]/70 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-medium text-[#2d4a2d]/80">Curator note</p>
              <p className="text-xs font-serif text-[#2d4a2d]/50 mt-0.5">Cross-reference this entry with volume III of the Flora Britannica.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#faf5ef] rounded-lg border border-[#2d4a2d]/20 p-6 space-y-5">
            {[
              { label: "Parchment Texture", desc: "Apply subtle paper texture to backgrounds" },
              { label: "Italic Scientific Names", desc: "Display Latin binomials in italic typeface" },
              { label: "Ornamental Dividers", desc: "Show decorative line separators between sections" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-serif text-[#2d4a2d]">{item.label}</p>
                  <p className="text-xs font-serif text-[#8b6914] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-lg transition-colors duration-300 ${
                    toggleStates[index] ? "bg-[#2d4a2d]" : "bg-[#2d4a2d]/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-[#faf5ef] rounded-md shadow-sm transition-transform duration-300 ${
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
        subtitle="Cataloguing indicators"
        className="py-16 px-6 bg-[#f4ede3]"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#faf5ef] rounded-lg border border-[#2d4a2d]/20 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-serif text-[#2d4a2d]">Cataloguing progress</p>
                <p className="text-xs text-[#8b6914] font-mono">{progress}%</p>
              </div>
              <div className="h-1.5 bg-[#2d4a2d]/10 rounded-lg">
                <div
                  className="h-full bg-[#2d4a2d] rounded-lg transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-serif text-[#2d4a2d] mb-2">Volume completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1.5 bg-[#2d4a2d]/10 rounded-lg">
                      <div
                        className={`h-full rounded-lg transition-all ${value === 100 ? "bg-[#2d4a2d]" : value > 0 ? "bg-[#8b6914]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs font-serif text-[#8b6914] mt-1 text-center">Vol.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#2d4a2d]/10">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-serif border border-[#2d4a2d]/20 text-[#2d4a2d]/60 rounded-lg hover:border-[#8b6914] hover:text-[#8b6914] transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-serif bg-[#2d4a2d] text-[#faf5ef] rounded-lg border border-[#8b6914]/60 hover:bg-[#3d5c3d] transition-all duration-300"
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
        subtitle="Specimen submission"
        className="py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wide text-[#2d4a2d] mb-2"
        subtitleClassName="text-sm font-serif italic text-[#8b6914] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#faf5ef] rounded-lg border border-[#2d4a2d]/20 p-8 shadow-[0_2px_8px_rgba(45,74,45,0.08)]">
            <h3 className="text-lg font-serif text-[#2d4a2d] tracking-wide mb-6">Submit a Specimen</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-[0.3em] text-[#8b6914] mb-2">Species Name</label>
                <input
                  type="text"
                  placeholder="Genus species"
                  className="w-full px-4 py-2.5 bg-transparent border-b border-[#2d4a2d]/20 text-[#2d4a2d] placeholder-[#2d4a2d]/30 font-serif text-sm italic focus:outline-none focus:border-[#8b6914]/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-serif uppercase tracking-[0.3em] text-[#8b6914] mb-2">Collector</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-transparent border-b border-[#2d4a2d]/20 text-[#2d4a2d] placeholder-[#2d4a2d]/30 font-serif text-sm focus:outline-none focus:border-[#8b6914]/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-serif uppercase tracking-[0.3em] text-[#8b6914] mb-2">Field Notes</label>
                <textarea
                  placeholder="Observations on habitat, soil, and condition..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-transparent border-b border-[#2d4a2d]/20 text-[#2d4a2d] placeholder-[#2d4a2d]/30 font-serif text-sm focus:outline-none focus:border-[#8b6914]/60 transition-colors resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#2d4a2d] text-[#faf5ef] text-sm font-serif tracking-wide rounded-lg border border-[#8b6914]/60 hover:bg-[#3d5c3d] transition-all duration-300 mt-2">
                Catalogue Specimen
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#2d4a2d]/15">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-serif text-[#8b6914] tracking-wider">
            Victorian Botanical Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#2d4a2d] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
