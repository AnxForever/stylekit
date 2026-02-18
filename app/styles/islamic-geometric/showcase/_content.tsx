"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Star, Gem, Hexagon,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Compass, Sparkles, BookOpen
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Lapis Blue", hex: "#1a3a5c", bg: "bg-[#1a3a5c]" },
  { name: "Ivory", hex: "#f5ecd7", bg: "bg-[#f5ecd7]", border: true },
  { name: "Gold", hex: "#c9a74e", bg: "bg-[#c9a74e]" },
  { name: "Emerald", hex: "#2d7d46", bg: "bg-[#2d7d46]" },
  { name: "Burgundy", hex: "#8b2332", bg: "bg-[#8b2332]" },
  { name: "Deep Navy", hex: "#0f2440", bg: "bg-[#0f2440]" },
  { name: "Warm Sand", hex: "#e8dcc8", bg: "bg-[#e8dcc8]", border: true },
  { name: "Antique Gold", hex: "#a68a3e", bg: "bg-[#a68a3e]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Geometry", icon: Compass },
    { label: "Ornament", icon: Sparkles },
    { label: "Archive", icon: BookOpen },
  ];

  const accordionItems = [
    { title: "What is Islamic Geometric Art?", content: "Islamic geometric art is one of humanity's most precise decorative systems, spanning over a millennium. Based on strict mathematical principles -- polygon tessellations, star patterns, and arabesque scrollwork -- it constructs an infinitely extending visual universe." },
    { title: "Unity in Multiplicity", content: "The core philosophy holds that simple geometric elements, through rotation, symmetry, and repetition, generate dazzling complexity. This journey from simplicity to intricacy is viewed as a meditation on the beauty of creation." },
    { title: "The Color Tradition", content: "Following classical Persian-Arabic traditions: deep lapis lazuli blue as foundation, gold gilding as accent, and ivory for breathing space. Emerald green and deep burgundy appear as secondary tones, adding depth and richness to the palette." },
  ];

  return (
    <div className="min-h-screen bg-[#1a3a5c] text-[#f5ecd7]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#c9a74e]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/islamic-geometric"
            className="flex items-center gap-2 text-[#c9a74e]/60 hover:text-[#c9a74e] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-sans tracking-wide">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#c9a74e]" />
            <span className="font-sans font-semibold text-lg tracking-wider text-[#f5ecd7]">
              Islamic Geometric
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-sans font-semibold tracking-wider text-[#c9a74e] border-2 border-[#c9a74e]/30 rounded-lg hover:bg-[#c9a74e] hover:text-[#1a3a5c] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Decorative frame borders */}
        <div className="absolute inset-8 md:inset-16 border border-[#c9a74e]/15 rounded-xl" />
        <div className="absolute inset-10 md:inset-20 border border-[#c9a74e]/10 rounded-xl" />
        {/* Subtle tessellation background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 60deg, rgba(201,167,78,0.3) 60deg 62deg, transparent 62deg)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Star ornament */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 text-[#c9a74e]">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,0 15,8 24,8 17,13 19,22 12,17 5,22 7,13 0,8 9,8" />
              </svg>
            </div>
          </div>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c9a74e] to-transparent mx-auto mb-8" />
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#c9a74e]/30" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#c9a74e]/60 font-sans">Tessellation Design</span>
            <div className="w-8 h-px bg-[#c9a74e]/30" />
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-semibold text-[#f5ecd7] mb-8 leading-tight tracking-wide">
            Infinite
            <span className="block text-[#c9a74e]">Pattern</span>
          </h1>
          <p className="text-lg font-sans text-[#c9a74e]/60 max-w-xl mx-auto leading-relaxed tracking-wider">
            Unity in multiplicity. Infinity in pattern. Geometry as meditation.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c9a74e] to-transparent mx-auto mt-8" />
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Design metrics"
        className="py-16 px-6 bg-[#f5ecd7]"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#1a3a5c] mb-2"
        subtitleClassName="text-sm text-[#c9a74e] tracking-wider mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Followers", value: "3,918" },
            { icon: TrendingUp, label: "Growth", value: "+27%" },
            { icon: Eye, label: "Views", value: "215K" },
            { icon: Heart, label: "Saves", value: "6,043" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-6 bg-[#f5ecd7] rounded-xl border-2 border-[#c9a74e]/30 shadow-[0_4px_12px_rgba(201,167,78,0.1)]"
            >
              {/* Corner ornaments */}
              <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#c9a74e]/30" />
              <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#c9a74e]/30" />
              <stat.icon className="w-5 h-5 text-[#c9a74e] mb-4" />
              <p className="text-3xl font-sans font-semibold text-[#1a3a5c] mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-[#c9a74e]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Classical Persian-Arabic tradition"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#f5ecd7] mb-2"
        subtitleClassName="text-sm text-[#c9a74e]/60 tracking-wider mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-xl overflow-hidden border-2 border-[#c9a74e]/20 bg-[#1a3a5c] shadow-[0_4px_12px_rgba(201,167,78,0.1)]"
            labelClassName="text-sm font-sans font-semibold text-[#f5ecd7] tracking-wide"
            hexClassName="text-xs text-[#c9a74e]/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Elegant and measured"
        className="py-16 px-6 bg-[#f5ecd7]"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#1a3a5c] mb-2"
        subtitleClassName="text-sm text-[#c9a74e] tracking-wider mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="relative p-8 bg-[#f5ecd7] rounded-xl border-2 border-[#c9a74e]/30 shadow-[0_4px_16px_rgba(26,58,92,0.08)]">
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c9a74e]/40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c9a74e]/40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c9a74e]/40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c9a74e]/40" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#c9a74e] to-transparent mx-auto mb-6" />
            <p className="text-6xl font-sans font-semibold text-[#1a3a5c] mb-4 leading-tight tracking-wide text-center">Heading</p>
            <p className="text-4xl font-sans text-[#1a3a5c]/70 mb-4 tracking-wide text-center">Subheading</p>
            <p className="text-xl font-sans text-[#1a3a5c]/50 mb-4 leading-relaxed text-center">
              Body text with graceful proportions. Measured spacing for contemplative reading.
            </p>
            <p className="text-sm text-[#c9a74e] tracking-wider text-center">
              Caption text with refined elegance
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Refined interactions"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#f5ecd7] mb-2"
        subtitleClassName="text-sm text-[#c9a74e]/60 tracking-wider mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-[#1a3a5c] rounded-xl border-2 border-[#c9a74e]/20">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="relative px-10 py-3 bg-[#c9a74e] text-[#1a3a5c] text-sm font-sans font-semibold tracking-wider rounded-lg border-2 border-[#c9a74e] shadow-[0_4px_12px_rgba(201,167,78,0.2)] hover:shadow-[0_6px_20px_rgba(201,167,78,0.3)] transition-all duration-300">
                Primary
              </button>
              <button className="relative px-10 py-3 bg-transparent text-[#c9a74e] text-sm font-sans font-semibold tracking-wider rounded-lg border-2 border-[#c9a74e] hover:bg-[#c9a74e]/10 transition-all duration-300">
                <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#c9a74e]/40" />
                <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#c9a74e]/40" />
                Secondary
              </button>
              <button className="px-10 py-3 text-[#c9a74e]/60 text-sm font-sans font-semibold tracking-wider hover:text-[#c9a74e] transition-all duration-300 underline underline-offset-4 decoration-[#c9a74e]/30">
                Text Link
              </button>
              <button className="px-10 py-3 bg-[#2d7d46] text-[#f5ecd7] text-sm font-sans font-semibold tracking-wider rounded-lg border-2 border-[#2d7d46] hover:bg-[#2d7d46]/80 transition-all duration-300">
                Accent
              </button>
              <button className="px-10 py-3 bg-[#1a3a5c] text-[#c9a74e]/30 text-sm font-sans font-semibold tracking-wider rounded-lg border-2 border-[#c9a74e]/15 cursor-not-allowed">
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
        className="py-16 px-6 bg-[#f5ecd7]"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#1a3a5c] mb-2"
        subtitleClassName="text-sm text-[#c9a74e] tracking-wider mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Hexagon, title: "Tessellation", desc: "Polygonal forms tile the infinite plane without gaps, each piece interlocking with mathematical perfection." },
            { icon: Star, title: "Star Pattern", desc: "Radiating from central points, star motifs embody the cosmic order that underlies all visible creation." },
            { icon: Gem, title: "Arabesque", desc: "Flowing vegetal scrollwork weaves between geometric frames, softening precision with organic grace." },
          ].map((card, index) => (
            <div key={index} className="relative p-8 bg-[#f5ecd7] rounded-xl border-2 border-[#c9a74e]/30 shadow-[0_4px_16px_rgba(26,58,92,0.08)] hover:shadow-[0_8px_24px_rgba(201,167,78,0.15)] transition-all duration-300 group text-center">
              {/* Corner ornaments */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c9a74e]/30 group-hover:border-[#c9a74e]/60 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c9a74e]/30 group-hover:border-[#c9a74e]/60 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c9a74e]/30 group-hover:border-[#c9a74e]/60 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c9a74e]/30 group-hover:border-[#c9a74e]/60 transition-colors duration-300" />
              <card.icon className="w-6 h-6 text-[#c9a74e] mb-4 mx-auto group-hover:text-[#1a3a5c] transition-colors duration-300" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#c9a74e] to-transparent mx-auto mb-4" />
              <h3 className="text-lg font-sans font-semibold text-[#1a3a5c] tracking-wide mb-3">{card.title}</h3>
              <p className="text-sm text-[#1a3a5c]/50 font-sans leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#f5ecd7] mb-2"
        subtitleClassName="text-sm text-[#c9a74e]/60 tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a3a5c] rounded-xl border-2 border-[#c9a74e]/20 overflow-hidden shadow-[0_4px_16px_rgba(201,167,78,0.1)]">
            <div className="flex border-b border-[#c9a74e]/20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-sans font-semibold tracking-wider transition-all duration-300 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#c9a74e] border-[#c9a74e]"
                      : "text-[#f5ecd7]/30 border-transparent hover:text-[#f5ecd7]/60"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 min-h-[120px]">
              {activeTab === 0 && (
                <div className="text-center">
                  <h4 className="text-lg font-sans font-semibold text-[#f5ecd7] tracking-wide mb-2">Sacred Geometry</h4>
                  <p className="text-sm text-[#f5ecd7]/50 font-sans leading-relaxed">The circle, square, and triangle form the foundation of all Islamic geometric patterns. From these three primary shapes, through subdivision and rotation, infinite complexity emerges.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div className="text-center">
                  <h4 className="text-lg font-sans font-semibold text-[#f5ecd7] tracking-wide mb-2">Gilded Embellishment</h4>
                  <p className="text-sm text-[#f5ecd7]/50 font-sans leading-relaxed">Gold leaf and lapis lazuli transform mathematical precision into luminous beauty. Each ornamental element serves both structural and spiritual purpose, bridging the abstract and the divine.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div className="text-center">
                  <h4 className="text-lg font-sans font-semibold text-[#f5ecd7] tracking-wide mb-2">Historical Manuscripts</h4>
                  <p className="text-sm text-[#f5ecd7]/50 font-sans leading-relaxed">From the Alhambra to the Topkapi scrolls, centuries of geometric exploration are preserved in architectural decoration and illuminated manuscripts across the Islamic world.</p>
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
        className="py-16 px-6 bg-[#f5ecd7]"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#1a3a5c] mb-2"
        subtitleClassName="text-sm text-[#c9a74e] tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="relative bg-[#f5ecd7] rounded-xl border-2 border-[#c9a74e]/30 overflow-hidden shadow-[0_2px_8px_rgba(26,58,92,0.05)]">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#c9a74e]/5 transition-all duration-300"
              >
                <span className="font-sans font-semibold text-[#1a3a5c] tracking-wide">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#c9a74e] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#c9a74e]/20">
                  <p className="text-sm text-[#1a3a5c]/60 font-sans leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Graceful notifications"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#f5ecd7] mb-2"
        subtitleClassName="text-sm text-[#c9a74e]/60 tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#2d7d46]/10 rounded-lg border-l-2 border-[#2d7d46]">
            <Check className="w-4 h-4 text-[#2d7d46] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-[#2d7d46]">Pattern saved</p>
              <p className="text-xs text-[#2d7d46]/60 mt-0.5 font-sans">Your tessellation has been preserved.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#c9a74e]/10 rounded-lg border-l-2 border-[#c9a74e]">
            <AlertTriangle className="w-4 h-4 text-[#c9a74e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-[#c9a74e]">Symmetry note</p>
              <p className="text-xs text-[#c9a74e]/60 mt-0.5 font-sans">Rotational alignment may need adjustment.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#8b2332]/10 rounded-lg border-l-2 border-[#8b2332]">
            <X className="w-4 h-4 text-[#8b2332] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-[#8b2332]">Tessellation error</p>
              <p className="text-xs text-[#8b2332]/60 mt-0.5 font-sans">Gap detected in polygon tiling.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#1a3a5c]/10 rounded-lg border-l-2 border-[#1a3a5c]/40">
            <Info className="w-4 h-4 text-[#f5ecd7]/60 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-[#f5ecd7]/80">Guidance</p>
              <p className="text-xs text-[#f5ecd7]/40 mt-0.5 font-sans">Select a star count to preview the pattern.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6 bg-[#f5ecd7]"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#1a3a5c] mb-2"
        subtitleClassName="text-sm text-[#c9a74e] tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#f5ecd7] rounded-xl border-2 border-[#c9a74e]/30 p-6 space-y-5 shadow-[0_4px_12px_rgba(26,58,92,0.05)]">
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c9a74e]/30" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c9a74e]/30" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c9a74e]/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c9a74e]/30" />
            {[
              { label: "Gold Accents", desc: "Enable gilded ornamental highlights" },
              { label: "Tessellation Grid", desc: "Display underlying geometric structure" },
              { label: "Auto-symmetry", desc: "Enforce rotational balance automatically" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-sans font-semibold text-[#1a3a5c] tracking-wide">{item.label}</p>
                  <p className="text-xs text-[#c9a74e] mt-0.5 font-sans">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-lg transition-all duration-300 ${
                    toggleStates[index] ? "bg-[#c9a74e]" : "bg-[#1a3a5c]/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-md shadow-sm transition-transform duration-300 ${
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
        subtitle="Pattern completion"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#f5ecd7] mb-2"
        subtitleClassName="text-sm text-[#c9a74e]/60 tracking-wider mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a3a5c] rounded-xl border-2 border-[#c9a74e]/20 p-6 space-y-6 shadow-[0_4px_16px_rgba(201,167,78,0.1)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-sans font-semibold text-[#f5ecd7] tracking-wide">Tessellation progress</p>
                <p className="text-xs text-[#c9a74e] font-mono">{progress}%</p>
              </div>
              <div className="h-1.5 bg-[#c9a74e]/10 rounded-lg">
                <div
                  className="h-full bg-[#c9a74e] rounded-lg transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-sans font-semibold text-[#f5ecd7] tracking-wide mb-2">Layer completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1.5 bg-[#c9a74e]/10 rounded-lg">
                      <div
                        className={`h-full rounded-lg transition-all ${value === 100 ? "bg-[#c9a74e]" : value > 0 ? "bg-[#2d7d46]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#c9a74e]/50 mt-1 text-center font-sans">L.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#c9a74e]/20">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-sans font-semibold tracking-wider border-2 border-[#c9a74e]/30 text-[#c9a74e]/60 rounded-lg hover:border-[#c9a74e] hover:text-[#c9a74e] transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-sans font-semibold tracking-wider bg-[#c9a74e] text-[#1a3a5c] rounded-lg hover:bg-[#c9a74e]/80 transition-all duration-300"
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
        subtitle="Elegant inputs"
        className="py-16 px-6 bg-[#f5ecd7]"
        titleClassName="text-2xl font-sans font-semibold tracking-wide text-[#1a3a5c] mb-2"
        subtitleClassName="text-sm text-[#c9a74e] tracking-wider mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="relative bg-[#f5ecd7] rounded-xl border-2 border-[#c9a74e]/30 p-8 shadow-[0_4px_16px_rgba(26,58,92,0.08)]">
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#c9a74e]/40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#c9a74e]/40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#c9a74e]/40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#c9a74e]/40" />
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 text-[#c9a74e]">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12,0 15,8 24,8 17,13 19,22 12,17 5,22 7,13 0,8 9,8" />
                </svg>
              </div>
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#c9a74e] to-transparent mx-auto mb-4" />
            <h3 className="text-lg font-sans font-semibold text-[#1a3a5c] text-center tracking-wide mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#c9a74e] mb-2 font-sans">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-6 py-3 bg-[#f5ecd7] border-2 border-[#1a3a5c]/20 rounded-lg text-[#1a3a5c] placeholder-[#1a3a5c]/25 font-sans tracking-wide focus:border-[#c9a74e] focus:shadow-[0_0_0_3px_rgba(201,167,78,0.15)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#c9a74e] mb-2 font-sans">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-6 py-3 bg-[#f5ecd7] border-2 border-[#1a3a5c]/20 rounded-lg text-[#1a3a5c] placeholder-[#1a3a5c]/25 font-sans tracking-wide focus:border-[#c9a74e] focus:shadow-[0_0_0_3px_rgba(201,167,78,0.15)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#c9a74e] mb-2 font-sans">Message</label>
                <textarea
                  placeholder="Your thoughts..."
                  rows={3}
                  className="w-full px-6 py-3 bg-[#f5ecd7] border-2 border-[#1a3a5c]/20 rounded-lg text-[#1a3a5c] placeholder-[#1a3a5c]/25 font-sans tracking-wide focus:border-[#c9a74e] focus:shadow-[0_0_0_3px_rgba(201,167,78,0.15)] focus:outline-none transition-all duration-300 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#c9a74e] text-[#1a3a5c] text-sm font-sans font-semibold tracking-wider rounded-lg border-2 border-[#c9a74e] shadow-[0_4px_12px_rgba(201,167,78,0.2)] hover:shadow-[0_6px_20px_rgba(201,167,78,0.3)] transition-all duration-300 mt-2">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#c9a74e]/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="w-6 h-6 text-[#c9a74e]/40">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,0 15,8 24,8 17,13 19,22 12,17 5,22 7,13 0,8 9,8" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-[#c9a74e]/40 tracking-wider font-sans">
            Islamic Geometric Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#c9a74e] transition-all duration-300">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
