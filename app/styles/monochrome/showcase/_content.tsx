"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Contrast, Square, Grid3X3, Minus,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Camera, Layers, Type,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Pure White", hex: "#ffffff", bg: "bg-[#ffffff]", border: true },
  { name: "Off White", hex: "#fafafa", bg: "bg-[#fafafa]", border: true },
  { name: "Surface", hex: "#f5f5f5", bg: "bg-[#f5f5f5]", border: true },
  { name: "Border", hex: "#e5e5e5", bg: "bg-[#e5e5e5]" },
  { name: "Silver", hex: "#cccccc", bg: "bg-[#cccccc]" },
  { name: "Subtle", hex: "#999999", bg: "bg-[#999999]" },
  { name: "Muted", hex: "#666666", bg: "bg-[#666666]" },
  { name: "Deep Black", hex: "#111111", bg: "bg-[#111111]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Photos", icon: Camera },
    { label: "Layers", icon: Layers },
    { label: "Type", icon: Type },
  ];

  const accordionItems = [
    { title: "What is Monochrome Design?", content: "Monochrome design is the discipline of building complete visual hierarchy using only black, white, and precise gray values. No hue, no saturation -- just the essential relationship between light and dark." },
    { title: "Gray Scale Hierarchy", content: "From #111111 to #fafafa, each gray step serves a precise purpose. Deep black for primary text, medium gray for secondary content, light gray for borders and muted elements. The grayscale IS the information architecture." },
    { title: "Negative Space as Structure", content: "In monochrome, negative space does the heavy lifting that color does elsewhere. Generous margins, careful padding, and deliberate emptiness create the visual rhythm that guides the eye through content." },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/monochrome"
            className="flex items-center gap-2 text-[#999999] hover:text-[#111111] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Contrast className="w-4 h-4 text-[#111111]" />
            <span className="font-bold text-lg tracking-tight text-[#111111]">
              Monochrome
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm text-[#111111] border border-[#e5e5e5] rounded-sm hover:bg-[#111111] hover:text-[#fafafa] transition-colors duration-200"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-px bg-[#e5e5e5]" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#999999] font-medium">Pure Grayscale</span>
            <div className="w-10 h-px bg-[#e5e5e5]" />
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-[#111111] mb-8 leading-none tracking-tight">
            Zero
            <span className="block font-light text-[#999999]">color</span>
          </h1>
          <p className="text-lg font-light text-[#666666] max-w-xl mx-auto leading-relaxed">
            Maximum impact through minimum means. Hierarchy built on weight, scale, and space alone.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Design metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Followers", value: "4,102" },
            { icon: TrendingUp, label: "Growth", value: "+24%" },
            { icon: Eye, label: "Views", value: "231K" },
            { icon: Heart, label: "Saves", value: "5,870" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#f5f5f5] rounded-sm border border-[#e5e5e5]"
            >
              <stat.icon className="w-5 h-5 text-[#111111] mb-4" />
              <p className="text-3xl font-bold text-[#111111] mb-1 tracking-tight">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-[#999999] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Eight precise gray values"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-sm overflow-hidden border border-[#e5e5e5] bg-white"
            labelClassName="text-sm font-bold text-[#111111]"
            hexClassName="text-xs text-[#999999] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Weight as hierarchy"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#f5f5f5] rounded-sm border border-[#e5e5e5]">
            <p className="text-6xl font-bold text-[#111111] mb-4 leading-none tracking-tight">Heading</p>
            <p className="text-4xl font-light text-[#111111] mb-4 tracking-tight">Subheading</p>
            <p className="text-xl font-light text-[#666666] mb-4 leading-relaxed">
              Body text in light weight. Contrast with bold headings creates natural hierarchy.
            </p>
            <p className="text-sm text-[#999999] tracking-wider uppercase font-medium">
              Caption text with precise spacing
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Functional and direct"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#f5f5f5] rounded-sm border border-[#e5e5e5]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#111111] text-[#fafafa] text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-[#333333] transition-colors duration-200">
                Primary
              </button>
              <button className="px-6 py-3 border border-[#111111] text-[#111111] text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-[#111111] hover:text-[#fafafa] transition-colors duration-200">
                Secondary
              </button>
              <button className="px-6 py-3 bg-[#f5f5f5] border border-[#e5e5e5] text-[#666666] text-sm font-medium tracking-wider uppercase rounded-sm hover:border-[#111111] hover:text-[#111111] transition-colors duration-200">
                Tertiary
              </button>
              <button className="px-6 py-3 text-[#111111] text-sm font-medium tracking-wider uppercase underline underline-offset-4 decoration-[#e5e5e5] hover:decoration-[#111111] transition-colors duration-200">
                Text Link
              </button>
              <button className="px-6 py-3 bg-[#f5f5f5] text-[#cccccc] text-sm font-medium tracking-wider uppercase rounded-sm cursor-not-allowed border border-[#e5e5e5]">
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
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            { icon: Square, title: "Structure", desc: "Every element occupies a precise position on the grid. Alignment is not optional -- it is the foundation of visual clarity." },
            { icon: Grid3X3, title: "Grid", desc: "Strict grid systems ensure consistency across all compositions. Columns, gutters, and margins create invisible order." },
            { icon: Minus, title: "Reduction", desc: "Remove everything that does not serve the content. If an element has no clear purpose, it does not belong." },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-[#f5f5f5] rounded-sm border border-[#e5e5e5] hover:border-[#999999] transition-colors duration-200 group">
              <card.icon className="w-6 h-6 text-[#111111] mb-4" />
              <h3 className="text-lg font-bold text-[#111111] mb-3">{card.title}</h3>
              <p className="text-sm font-light text-[#666666] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f5f5f5] rounded-sm border border-[#e5e5e5] overflow-hidden">
            <div className="flex border-b border-[#e5e5e5]">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#111111] border-[#111111]"
                      : "text-[#999999] border-transparent hover:text-[#111111]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 min-h-[120px] bg-white">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-bold text-[#111111] mb-2">Photography</h4>
                  <p className="text-sm font-light text-[#666666] leading-relaxed">Black and white photography strips the subject to its essence. Without color to distract, every texture, contrast, and form demands attention on its own terms.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-[#111111] mb-2">Layered Depth</h4>
                  <p className="text-sm font-light text-[#666666] leading-relaxed">Gray values create layered depth without color. Foreground, midground, and background separate naturally through tonal contrast alone.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-[#111111] mb-2">Typographic Scale</h4>
                  <p className="text-sm font-light text-[#666666] leading-relaxed">When color is absent, typography carries the entire hierarchy. Bold versus light, large versus small, tight versus wide -- these contrasts do all the work.</p>
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
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#f5f5f5] rounded-sm border border-[#e5e5e5] overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white transition-colors duration-200"
              >
                <span className="font-bold text-[#111111]">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#999999] transition-transform duration-200 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#e5e5e5]">
                  <p className="text-sm font-light text-[#666666] leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Status notifications"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#fafafa] rounded-sm border-l-2 border-[#111111]">
            <Check className="w-4 h-4 text-[#111111] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#111111]">Saved successfully</p>
              <p className="text-xs font-light text-[#666666] mt-0.5">Your changes have been applied.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fafafa] rounded-sm border-l-2 border-[#999999]">
            <AlertTriangle className="w-4 h-4 text-[#999999] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#666666]">Please note</p>
              <p className="text-xs font-light text-[#999999] mt-0.5">This action may take a moment to process.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fafafa] rounded-sm border-l-2 border-[#333333]">
            <X className="w-4 h-4 text-[#333333] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#333333]">Error occurred</p>
              <p className="text-xs font-light text-[#666666] mt-0.5">Something went wrong. Please try again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fafafa] rounded-sm border-l-2 border-[#cccccc]">
            <Info className="w-4 h-4 text-[#999999] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#999999]">Helpful tip</p>
              <p className="text-xs font-light text-[#999999] mt-0.5">Hover over elements for more details.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f5f5f5] rounded-sm border border-[#e5e5e5] p-6 space-y-5">
            {[
              { label: "High Contrast Mode", desc: "Maximize black/white separation" },
              { label: "Grid Overlay", desc: "Show alignment grid for precision" },
              { label: "Auto-crop Whitespace", desc: "Trim excess negative space" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium text-[#111111]">{item.label}</p>
                  <p className="text-xs font-light text-[#999999] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                    toggleStates[index] ? "bg-[#111111]" : "bg-[#cccccc]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
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
        subtitle="Minimal indicators"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f5f5f5] rounded-sm border border-[#e5e5e5] p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-[#111111]">Processing</p>
                <p className="text-xs text-[#999999] font-mono">{progress}%</p>
              </div>
              <div className="h-1.5 bg-[#e5e5e5] rounded-sm">
                <div
                  className="h-full bg-[#111111] rounded-sm transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#111111] mb-2">Stage completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1.5 bg-[#e5e5e5] rounded-sm">
                      <div
                        className={`h-full rounded-sm transition-all duration-200 ${value === 100 ? "bg-[#111111]" : value > 0 ? "bg-[#999999]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#999999] mt-1 text-center font-mono">S{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#e5e5e5]">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-medium border border-[#e5e5e5] text-[#666666] rounded-sm hover:border-[#111111] hover:text-[#111111] transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-medium bg-[#111111] text-[#fafafa] rounded-sm hover:bg-[#333333] transition-colors duration-200"
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
        titleClassName="text-2xl font-bold text-[#111111] tracking-tight mb-2"
        subtitleClassName="text-sm font-light text-[#999999] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#f5f5f5] rounded-sm border border-[#e5e5e5] p-8">
            <h3 className="text-lg font-bold text-[#111111] mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#999999] font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-transparent border-b border-[#cccccc] text-[#111111] placeholder-[#cccccc] focus:outline-none focus:border-[#111111] transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#999999] font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 bg-transparent border-b border-[#cccccc] text-[#111111] placeholder-[#cccccc] focus:outline-none focus:border-[#111111] transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#999999] font-medium mb-2">Message</label>
                <textarea
                  placeholder="Your thoughts..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-transparent border-b border-[#cccccc] text-[#111111] placeholder-[#cccccc] focus:outline-none focus:border-[#111111] transition-colors duration-200 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#111111] text-[#fafafa] text-sm font-medium tracking-wider uppercase rounded-sm hover:bg-[#333333] transition-colors duration-200 mt-2">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-[#999999] tracking-wider uppercase font-medium">
            Monochrome Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#111111] transition-colors duration-200">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
