"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Ruler, Grid3x3, Crosshair,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Compass, Layers, PenTool,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Blueprint Blue", hex: "#1e3a5f", bg: "bg-[#1e3a5f]" },
  { name: "White Line", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Light Blue", hex: "#4a90d9", bg: "bg-[#4a90d9]" },
  { name: "Sky Blue", hex: "#a0c4e8", bg: "bg-[#a0c4e8]" },
  { name: "Annotation Orange", hex: "#ff6b35", bg: "bg-[#ff6b35]" },
  { name: "Deep Navy", hex: "#142d4a", bg: "bg-[#142d4a]" },
  { name: "Grid Line", hex: "#2a5080", bg: "bg-[#2a5080]" },
  { name: "Faded White", hex: "#d0e0f0", bg: "bg-[#d0e0f0]", border: true },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Plan", icon: Compass },
    { label: "Layers", icon: Layers },
    { label: "Detail", icon: PenTool },
  ];

  const accordionItems = [
    { title: "What is Blueprint Design?", content: "Blueprint draws from traditional cyanotype printing and engineering technical drawings. White lines on deep blue backgrounds convey precision, reliability, and technical depth. The grid system and annotation markers reinforce the sense of careful planning." },
    { title: "Technical Drawing Language", content: "Monospace typography, corner bracket markers, dimension lines, and coordinate labels form the decorative vocabulary. Every ornament doubles as a functional reference, true to the engineering ethos of form following function." },
    { title: "Precision Without Coldness", content: "While the style is technical, annotation orange highlights and the rich blue palette prevent it from feeling sterile. The result is authoritative and trustworthy -- the visual equivalent of a well-engineered system." },
  ];

  return (
    <div
      className="min-h-screen bg-[#1e3a5f] text-white font-mono"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/blueprint"
            className="flex items-center gap-2 text-[#a0c4e8] hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono uppercase tracking-wider">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Grid3x3 className="w-4 h-4 text-[#a0c4e8]" />
            <span className="font-mono text-lg tracking-widest uppercase text-white">
              Blueprint
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-mono uppercase tracking-widest text-white border border-white/60 hover:bg-white/10 hover:border-white transition-all duration-200"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#ff6b35]" />
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-[#ff6b35]">Section A-1</span>
            <div className="w-8 h-px bg-[#ff6b35]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-mono font-bold text-white mb-8 leading-tight tracking-wider uppercase">
            Precision
            <span className="block text-[#a0c4e8] font-normal">by design</span>
          </h1>
          <p className="text-lg font-mono text-[#a0c4e8]/70 max-w-xl mx-auto leading-relaxed">
            White lines on blue. Grid coordinates. Annotation markers. Engineered for clarity.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Technical metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Engineers", value: "3,142" },
            { icon: TrendingUp, label: "Precision", value: "+99%" },
            { icon: Eye, label: "Reviews", value: "214K" },
            { icon: Heart, label: "Approved", value: "4,096" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#1e3a5f]/60 border border-white/20 hover:bg-white/5 transition-all duration-200 relative"
            >
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40" />

              <stat.icon className="w-5 h-5 text-[#a0c4e8] mb-4" />
              <p className="text-3xl font-mono font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs font-mono uppercase tracking-widest text-[#a0c4e8]/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Cyanotype spectrum"
        className="py-16 px-6 bg-[#142d4a]/60"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border border-white/20 bg-[#1e3a5f]/60"
            labelClassName="text-sm font-mono text-white"
            hexClassName="text-xs text-[#a0c4e8]/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Monospace precision"
        className="py-16 px-6"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#1e3a5f]/60 border border-white/20 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40" />

            <p className="text-6xl font-mono font-bold text-white mb-4 leading-tight tracking-wider uppercase">Heading</p>
            <p className="text-4xl font-mono text-[#a0c4e8] mb-4 tracking-wider uppercase">Subheading</p>
            <p className="text-xl font-mono text-[#a0c4e8]/70 mb-4 leading-relaxed">
              Body text rendered in monospace. Every character occupies equal width for precise alignment.
            </p>
            <p className="text-sm text-white/40 font-mono tracking-widest uppercase">
              Caption :: coordinate ref sys.v2.4
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Control elements"
        className="py-16 px-6 bg-[#142d4a]/60"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#1e3a5f]/60 border border-white/20 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40" />

            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-transparent border border-white/60 text-white font-mono uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white transition-all duration-200">
                Execute
              </button>
              <button className="px-6 py-3 bg-white text-[#1e3a5f] font-mono font-bold uppercase tracking-widest text-sm hover:bg-[#a0c4e8] transition-all duration-200">
                Compile
              </button>
              <button className="px-6 py-3 bg-transparent border border-[#ff6b35]/60 text-[#ff6b35] font-mono uppercase tracking-widest text-sm hover:bg-[#ff6b35]/10 hover:border-[#ff6b35] transition-all duration-200">
                Annotate
              </button>
              <button className="px-6 py-3 bg-transparent border border-[#4a90d9]/60 text-[#4a90d9] font-mono uppercase tracking-widest text-sm hover:bg-[#4a90d9]/10 hover:border-[#4a90d9] transition-all duration-200">
                Measure
              </button>
              <button className="px-6 py-3 bg-transparent border border-white/15 text-white/25 font-mono uppercase tracking-widest text-sm cursor-not-allowed">
                Locked
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Section panels"
        className="py-16 px-6"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Compass, title: "Structural Overview", desc: "Cross-section analysis of the primary load-bearing framework with stress distribution mapping.", label: "Section A-2" },
            { icon: Ruler, title: "Dimensional Spec", desc: "Precise measurements and tolerances for all critical junction points. Compliance verified to standard.", label: "Section B-1" },
            { icon: Crosshair, title: "Reference Grid", desc: "Coordinate system overlay with major and minor grid lines. Origin point established at datum marker.", label: "Section C-3" },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-[#1e3a5f]/60 border border-white/20 p-6 hover:bg-white/5 transition-all duration-200 relative group"
            >
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-[1px] bg-[#ff6b35]" />
                <span className="text-[#ff6b35] font-mono text-xs uppercase tracking-widest">{card.label}</span>
                <div className="flex-1 h-[1px] bg-white/10" />
              </div>
              <card.icon className="w-6 h-6 text-[#a0c4e8] mb-4 group-hover:text-white transition-colors duration-200" />
              <h3 className="text-lg font-mono text-white tracking-wider mb-3">{card.title}</h3>
              <p className="text-sm text-[#a0c4e8]/60 font-mono leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Drawing layers"
        className="py-16 px-6 bg-[#142d4a]/60"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1e3a5f]/60 border border-white/20 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />

            <div className="flex border-b border-white/20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-mono uppercase tracking-wider transition-all duration-200 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-white border-[#ff6b35]"
                      : "text-[#a0c4e8]/40 border-transparent hover:text-white/70"
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
                  <h4 className="text-lg font-mono text-white tracking-wider mb-2 uppercase">Floor Plan</h4>
                  <p className="text-sm text-[#a0c4e8]/60 font-mono leading-relaxed">Top-down orthographic projection showing spatial relationships between structural elements. Scale: 1:100. All dimensions in millimeters.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-mono text-white tracking-wider mb-2 uppercase">Layer Stack</h4>
                  <p className="text-sm text-[#a0c4e8]/60 font-mono leading-relaxed">Exploded axonometric view separating foundation, structural, mechanical, and finish layers. Each layer independently toggleable for analysis.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-mono text-white tracking-wider mb-2 uppercase">Detail View</h4>
                  <p className="text-sm text-[#a0c4e8]/60 font-mono leading-relaxed">Magnified section of the critical junction at coordinates (42, 87). Tolerance: 0.5mm. Material specification and fastener schedule included.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Specification sheets"
        className="py-16 px-6"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#1e3a5f]/60 border border-white/20 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-all duration-200"
              >
                <span className="font-mono text-white tracking-wider">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#a0c4e8]/60 transition-transform duration-200 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-white/10">
                  <p className="text-sm text-[#a0c4e8]/60 font-mono leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="System notifications"
        className="py-16 px-6 bg-[#142d4a]/60"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#4a90d9]/10 border-l-2 border-[#4a90d9]">
            <Check className="w-4 h-4 text-[#4a90d9] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-mono text-[#4a90d9]">Build verified</p>
              <p className="text-xs text-[#4a90d9]/60 mt-0.5 font-mono">All structural calculations pass tolerance checks.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ff6b35]/10 border-l-2 border-[#ff6b35]">
            <AlertTriangle className="w-4 h-4 text-[#ff6b35] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-mono text-[#ff6b35]">Annotation required</p>
              <p className="text-xs text-[#ff6b35]/60 mt-0.5 font-mono">Section D-4 missing dimension labels. Review needed.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border-l-2 border-red-400">
            <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-mono text-red-400">Tolerance exceeded</p>
              <p className="text-xs text-red-400/60 mt-0.5 font-mono">Junction at (12, 45) exceeds 0.5mm tolerance. Redesign required.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#a0c4e8]/10 border-l-2 border-[#a0c4e8]">
            <Info className="w-4 h-4 text-[#a0c4e8] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-mono text-[#a0c4e8]">Reference note</p>
              <p className="text-xs text-[#a0c4e8]/60 mt-0.5 font-mono">Grid coordinates update automatically when datum shifts.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Layer visibility"
        className="py-16 px-6"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1e3a5f]/60 border border-white/20 p-6 space-y-5 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40" />

            {[
              { label: "Grid Overlay", desc: "Display coordinate grid on all drawing panels" },
              { label: "Dimension Lines", desc: "Show measurement annotations between elements" },
              { label: "Auto-align to Grid", desc: "Snap elements to nearest grid intersection" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-mono text-white">{item.label}</p>
                  <p className="text-xs text-[#a0c4e8]/40 mt-0.5 font-mono">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 transition-all duration-200 ${
                    toggleStates[index]
                      ? "bg-[#4a90d9]"
                      : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white transition-transform duration-200 ${
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
        subtitle="Build status"
        className="py-16 px-6 bg-[#142d4a]/60"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1e3a5f]/60 border border-white/20 p-6 space-y-6 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-mono text-white">Construction progress</p>
                <p className="text-xs text-[#ff6b35] font-mono">{progress}%</p>
              </div>
              <div className="h-1.5 bg-white/10">
                <div
                  className="h-full bg-[#4a90d9] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-mono text-white mb-2">Phase completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1.5 bg-white/10">
                      <div
                        className={`h-full transition-all ${value === 100 ? "bg-[#4a90d9]" : value > 0 ? "bg-[#ff6b35]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#a0c4e8]/40 mt-1 text-center font-mono">P{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-mono border border-white/30 text-[#a0c4e8] hover:border-white hover:text-white transition-all duration-200 uppercase tracking-wider"
              >
                Revert
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-mono bg-white text-[#1e3a5f] font-bold hover:bg-[#a0c4e8] transition-all duration-200 uppercase tracking-wider"
              >
                Advance
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Data entry"
        className="py-16 px-6"
        titleClassName="text-2xl font-mono tracking-wider uppercase text-white mb-2"
        subtitleClassName="text-sm text-[#a0c4e8]/60 mb-10 font-mono uppercase tracking-widest"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#1e3a5f]/60 border border-white/20 p-8 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40" />

            <h3 className="text-lg font-mono text-white tracking-wider mb-6 uppercase">Submit Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#a0c4e8] font-mono text-xs uppercase tracking-widest mb-2">Engineer ID</label>
                <input
                  type="text"
                  placeholder="Enter ID..."
                  className="w-full px-4 py-3 bg-transparent border border-white/30 text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#4a90d9] focus:bg-[#1e3a5f]/40 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-[#a0c4e8] font-mono text-xs uppercase tracking-widest mb-2">Designation</label>
                <input
                  type="email"
                  placeholder="contact@eng.dept"
                  className="w-full px-4 py-3 bg-transparent border border-white/30 text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#4a90d9] focus:bg-[#1e3a5f]/40 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-[#a0c4e8] font-mono text-xs uppercase tracking-widest mb-2">Technical Notes</label>
                <textarea
                  placeholder="Enter specifications..."
                  rows={3}
                  className="w-full px-4 py-3 bg-transparent border border-white/30 text-white font-mono placeholder-white/20 focus:outline-none focus:border-[#4a90d9] focus:bg-[#1e3a5f]/40 transition-all duration-200 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-white text-[#1e3a5f] font-mono font-bold uppercase tracking-widest hover:bg-[#a0c4e8] transition-all duration-200 mt-2">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-[#a0c4e8]/40 tracking-widest font-mono uppercase">
            Blueprint Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-white transition-colors duration-200">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
