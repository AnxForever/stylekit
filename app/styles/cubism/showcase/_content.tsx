"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Triangle, Square, Hexagon,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Palette, Layers, Box,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Canvas", hex: "#e8dcc8", bg: "bg-[#e8dcc8]", border: true },
  { name: "Raw Canvas", hex: "#ddd0b8", bg: "bg-[#ddd0b8]", border: true },
  { name: "Burnt Sienna", hex: "#5c4033", bg: "bg-[#5c4033]" },
  { name: "Khaki", hex: "#8b7355", bg: "bg-[#8b7355]" },
  { name: "Steel Blue", hex: "#3d5c6e", bg: "bg-[#3d5c6e]" },
  { name: "Terracotta", hex: "#9b3d25", bg: "bg-[#9b3d25]" },
  { name: "Olive", hex: "#6b6b3d", bg: "bg-[#6b6b3d]" },
  { name: "Charcoal", hex: "#3a3a3a", bg: "bg-[#3a3a3a]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Gallery", icon: Palette },
    { label: "Layers", icon: Layers },
    { label: "Objects", icon: Box },
  ];

  const accordionItems = [
    { title: "What is Cubism?", content: "Cubism is a revolutionary art movement pioneered by Pablo Picasso and Georges Braque around 1907. It shattered the Renaissance tradition of single-point perspective, reassembling visual reality through geometric fragments and overlapping viewpoints." },
    { title: "Analytical vs. Synthetic", content: "Analytical Cubism (1909-1912) deconstructs form into monochromatic geometric planes. Synthetic Cubism (1912-1914) reintroduces color and texture through collage, layering flat shapes to build new compositions." },
    { title: "Design Application", content: "In digital design, Cubism translates to angular layouts, hard-edge shadows, bold uppercase typography, skewed geometric decorations, and a restrained earth-tone palette that emphasizes structure over ornamentation." },
  ];

  return (
    <div className="min-h-screen bg-[#e8dcc8] text-[#5c4033]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b-2 border-[#5c4033]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/cubism"
            className="flex items-center gap-2 text-[#8b7355] hover:text-[#5c4033] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Triangle className="w-4 h-4 text-[#9b3d25]" />
            <span className="font-bold uppercase text-lg tracking-widest text-[#5c4033]">
              Cubism
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-[#5c4033] border-2 border-[#5c4033] rounded-sm hover:bg-[#5c4033] hover:text-[#e8dcc8] shadow-[3px_3px_0px_#8b7355] hover:shadow-[1px_1px_0px_#8b7355] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 bg-[#3d5c6e]/10 rotate-12 -skew-x-6" />
        <div className="absolute bottom-16 left-16 w-36 h-36 bg-[#9b3d25]/10 -rotate-6 skew-y-3" />
        <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-[#8b7355]/10 rotate-45" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-16 h-1 bg-[#9b3d25] mb-8 -skew-x-12" />
          <h1 className="text-5xl md:text-8xl font-bold text-[#5c4033] uppercase tracking-tight leading-none mb-6">
            Multiple
            <span className="block text-[#3d5c6e]">Perspectives</span>
          </h1>
          <p className="text-lg font-bold uppercase tracking-widest text-[#5c4033]/50 max-w-lg leading-relaxed">
            Fragmented form. Geometric truth. The deconstruction of visual reality.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="OVERVIEW"
        subtitle="COMPOSITION METRICS"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Artists", value: "4,207" },
            { icon: TrendingUp, label: "Growth", value: "+24%" },
            { icon: Eye, label: "Views", value: "318K" },
            { icon: Heart, label: "Saves", value: "5,814" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-6 bg-[#e8dcc8] rounded-sm border-2 border-[#5c4033] shadow-[4px_4px_0px_#5c4033]"
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#3d5c6e]/15 -skew-x-12" />
              <stat.icon className="w-5 h-5 text-[#9b3d25] mb-4" />
              <p className="text-3xl font-bold text-[#5c4033] mb-1">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR PALETTE"
        subtitle="EARTH TONES AND STUDIO PIGMENTS"
        className="py-16 px-6 bg-[#ddd0b8]"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-sm overflow-hidden border-2 border-[#5c4033] bg-[#e8dcc8] shadow-[3px_3px_0px_#5c4033]"
            labelClassName="text-sm font-bold uppercase tracking-wider text-[#5c4033]"
            hexClassName="text-xs text-[#8b7355] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="TYPOGRAPHY"
        subtitle="BOLD AND GEOMETRIC"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="relative p-8 bg-[#e8dcc8] rounded-sm border-2 border-[#5c4033] shadow-[6px_6px_0px_#5c4033]">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#9b3d25]/10 rotate-12" />
            <div className="relative z-10">
              <p className="text-6xl font-bold uppercase text-[#5c4033] mb-4 leading-none tracking-tight">HEADING</p>
              <p className="text-4xl font-bold uppercase text-[#3d5c6e] mb-4 tracking-wider">SUBHEADING</p>
              <p className="text-xl text-[#5c4033]/60 mb-4 leading-relaxed">
                Body text with measured weight. Legibility within the geometric framework.
              </p>
              <p className="text-sm font-bold text-[#9b3d25] tracking-[0.3em] uppercase">
                Label -- fragmented, deconstructed
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="ANGULAR AND DECISIVE"
        className="py-16 px-6 bg-[#ddd0b8]"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#e8dcc8] rounded-sm border-2 border-[#5c4033] shadow-[6px_6px_0px_#5c4033]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-3 bg-[#5c4033] text-[#e8dcc8] text-sm font-bold uppercase tracking-widest rounded-sm border-2 border-[#8b7355] shadow-[4px_4px_0px_#8b7355] hover:shadow-[2px_2px_0px_#8b7355] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                Primary
              </button>
              <button className="px-8 py-3 bg-[#e8dcc8] text-[#5c4033] text-sm font-bold uppercase tracking-widest rounded-sm border-2 border-[#5c4033] shadow-[4px_4px_0px_#5c4033] hover:shadow-[2px_2px_0px_#5c4033] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                Secondary
              </button>
              <button className="px-8 py-3 text-[#9b3d25] text-sm font-bold uppercase tracking-widest hover:text-[#5c4033] transition-colors underline underline-offset-4 decoration-[#9b3d25]/40 decoration-2">
                Text Link
              </button>
              <button className="px-8 py-3 bg-[#9b3d25] text-[#e8dcc8] text-sm font-bold uppercase tracking-widest rounded-sm border-2 border-[#5c4033] shadow-[4px_4px_0px_#5c4033] hover:shadow-[2px_2px_0px_#5c4033] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                Accent
              </button>
              <button className="px-8 py-3 bg-[#e8dcc8] text-[#8b7355]/50 text-sm font-bold uppercase tracking-widest rounded-sm border-2 border-[#8b7355]/30 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="GEOMETRIC CONTAINERS"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Triangle, title: "Analytical Phase", color: "bg-[#3d5c6e]/20", desc: "Deconstructing form into monochromatic geometric planes, revealing the underlying structure beneath surface appearances." },
            { icon: Square, title: "Synthetic Phase", color: "bg-[#9b3d25]/15", desc: "Reassembling fragments through collage and layered colour, building new visual realities from deconstructed elements." },
            { icon: Hexagon, title: "Crystal Cubism", color: "bg-[#8b7355]/15", desc: "Flat, overlapping planes of pure colour arranged with architectural precision, pushing abstraction to its geometric limits." },
          ].map((card, index) => (
            <div key={index} className="relative p-6 bg-[#e8dcc8] rounded-sm border-2 border-[#5c4033] shadow-[6px_6px_0px_#5c4033] hover:shadow-[3px_3px_0px_#5c4033] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150 group">
              <div className={`absolute top-0 right-0 w-16 h-16 ${card.color} -skew-x-12`} />
              <div className="relative z-10">
                <card.icon className="w-6 h-6 text-[#9b3d25] mb-4 group-hover:text-[#5c4033] transition-colors" />
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#5c4033] mb-2">{card.title}</h3>
                <div className="w-12 h-0.5 bg-[#9b3d25] mb-3" />
                <p className="text-sm text-[#5c4033]/70 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="TABS"
        subtitle="CONTENT NAVIGATION"
        className="py-16 px-6 bg-[#ddd0b8]"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#e8dcc8] rounded-sm border-2 border-[#5c4033] overflow-hidden shadow-[6px_6px_0px_#5c4033]">
            <div className="flex border-b-2 border-[#5c4033]/30">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-widest transition-all border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#9b3d25] border-[#9b3d25] bg-[#9b3d25]/5"
                      : "text-[#8b7355] border-transparent hover:text-[#5c4033]"
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
                  <h4 className="text-lg font-bold uppercase tracking-wider text-[#5c4033] mb-2">Exhibition Hall</h4>
                  <p className="text-sm text-[#5c4033]/60 leading-relaxed">Angular canvases line stark white walls. Each painting presents a subject from five angles simultaneously, challenging the viewer to assemble meaning from fragmented planes.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold uppercase tracking-wider text-[#5c4033] mb-2">Compositional Planes</h4>
                  <p className="text-sm text-[#5c4033]/60 leading-relaxed">Layer upon layer of geometric abstraction. Overlapping rectangles, trapezoids, and parallelograms create depth without perspective, structure without illusion.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold uppercase tracking-wider text-[#5c4033] mb-2">Still Life Studies</h4>
                  <p className="text-sm text-[#5c4033]/60 leading-relaxed">A guitar, a newspaper, a wine glass -- ordinary objects rendered extraordinary through simultaneous viewpoints and the rejection of conventional representation.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="ACCORDION"
        subtitle="EXPANDABLE CONTENT"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#e8dcc8] rounded-sm border-2 border-[#5c4033] overflow-hidden shadow-[3px_3px_0px_#5c4033]">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#ddd0b8] transition-colors"
              >
                <span className="font-bold uppercase tracking-wider text-[#5c4033]">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#9b3d25] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-2 border-[#5c4033]/20">
                  <p className="text-sm text-[#5c4033]/60 leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="ALERTS"
        subtitle="STATUS INDICATORS"
        className="py-16 px-6 bg-[#ddd0b8]"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#3d5c6e]/10 rounded-sm border-l-4 border-[#3d5c6e]">
            <Check className="w-4 h-4 text-[#3d5c6e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#3d5c6e]">Composition complete</p>
              <p className="text-xs text-[#3d5c6e]/70 mt-0.5">All geometric planes have been arranged successfully.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#8b7355]/10 rounded-sm border-l-4 border-[#8b7355]">
            <AlertTriangle className="w-4 h-4 text-[#8b7355] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#8b7355]">Perspective shift</p>
              <p className="text-xs text-[#8b7355]/70 mt-0.5">This viewpoint requires additional fragment analysis.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#9b3d25]/10 rounded-sm border-l-4 border-[#9b3d25]">
            <X className="w-4 h-4 text-[#9b3d25] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#9b3d25]">Structural failure</p>
              <p className="text-xs text-[#9b3d25]/70 mt-0.5">The geometric foundation is unstable. Reconfigure planes.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#5c4033]/8 rounded-sm border-l-4 border-[#5c4033]/50">
            <Info className="w-4 h-4 text-[#5c4033]/70 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#5c4033]/70">Studio note</p>
              <p className="text-xs text-[#5c4033]/50 mt-0.5">Reference Braque, 1911 -- analytical phase, second period.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="TOGGLE"
        subtitle="PREFERENCES"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#e8dcc8] rounded-sm border-2 border-[#5c4033] p-6 space-y-5 shadow-[4px_4px_0px_#5c4033]">
            {[
              { label: "Multi-Perspective View", desc: "Display subjects from simultaneous angles" },
              { label: "Hard-Edge Shadows", desc: "Use sharp geometric shadow projections" },
              { label: "Fragmented Grid", desc: "Break layout into asymmetric planes" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#5c4033]">{item.label}</p>
                  <p className="text-xs text-[#8b7355] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-sm transition-colors duration-150 ${
                    toggleStates[index] ? "bg-[#5c4033]" : "bg-[#8b7355]/30"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-[#e8dcc8] rounded-sm shadow-sm transition-transform duration-150 ${
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
        title="PROGRESS"
        subtitle="CONSTRUCTION INDICATORS"
        className="py-16 px-6 bg-[#ddd0b8]"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#e8dcc8] rounded-sm border-2 border-[#5c4033] p-6 space-y-6 shadow-[6px_6px_0px_#5c4033]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold uppercase tracking-wider text-[#5c4033]">Deconstruction progress</p>
                <p className="text-xs text-[#8b7355] font-mono">{progress}%</p>
              </div>
              <div className="h-2 bg-[#8b7355]/20 rounded-sm">
                <div
                  className="h-full bg-[#5c4033] rounded-sm transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#5c4033] mb-2">Phase completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-2 bg-[#8b7355]/20 rounded-sm">
                      <div
                        className={`h-full rounded-sm transition-all ${value === 100 ? "bg-[#5c4033]" : value > 0 ? "bg-[#9b3d25]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs font-bold text-[#8b7355] mt-1 text-center uppercase">P.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-2 border-[#5c4033]/20">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-bold uppercase tracking-widest border-2 border-[#5c4033] text-[#5c4033] rounded-sm hover:bg-[#5c4033] hover:text-[#e8dcc8] transition-all duration-150"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-bold uppercase tracking-widest bg-[#5c4033] text-[#e8dcc8] rounded-sm border-2 border-[#8b7355] shadow-[3px_3px_0px_#8b7355] hover:shadow-[1px_1px_0px_#8b7355] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="DATA COLLECTION"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold uppercase tracking-widest text-[#5c4033] mb-2"
        subtitleClassName="text-sm font-bold uppercase tracking-widest text-[#8b7355] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="relative bg-[#e8dcc8] rounded-sm border-2 border-[#5c4033] p-8 shadow-[6px_6px_0px_#5c4033]">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#3d5c6e]/10 -skew-x-12" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold uppercase tracking-widest text-[#5c4033] mb-6">Submit Work</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-2">Artist Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[#e8dcc8] border-2 border-[#5c4033]/40 rounded-sm text-[#5c4033] placeholder-[#8b7355]/60 font-bold text-sm uppercase tracking-wider focus:border-[#9b3d25] focus:shadow-[3px_3px_0px_#9b3d25] focus:outline-none transition-all duration-150"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[#e8dcc8] border-2 border-[#5c4033]/40 rounded-sm text-[#5c4033] placeholder-[#8b7355]/60 font-bold text-sm tracking-wider focus:border-[#9b3d25] focus:shadow-[3px_3px_0px_#9b3d25] focus:outline-none transition-all duration-150"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-2">Description</label>
                  <textarea
                    placeholder="Describe the composition..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#e8dcc8] border-2 border-[#5c4033]/40 rounded-sm text-[#5c4033] placeholder-[#8b7355]/60 text-sm focus:border-[#9b3d25] focus:shadow-[3px_3px_0px_#9b3d25] focus:outline-none transition-all duration-150 resize-none"
                  />
                </div>
                <button className="w-full py-3 bg-[#5c4033] text-[#e8dcc8] text-sm font-bold uppercase tracking-widest rounded-sm border-2 border-[#8b7355] shadow-[4px_4px_0px_#8b7355] hover:shadow-[2px_2px_0px_#8b7355] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 mt-2">
                  Submit Fragment
                </button>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-2 border-[#5c4033]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355]">
            Cubism Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#9b3d25] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
