"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Diamond, Crown, Gem, ChevronDown, ChevronUp,
  Check, X, AlertTriangle, Info, Building2, Sparkles, Award,
  Users, TrendingUp, Eye, Heart
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Gold", hex: "#d4af37", bg: "bg-[#d4af37]" },
  { name: "Dark Navy", hex: "#1a1a2e", bg: "bg-[#1a1a2e]" },
  { name: "Navy", hex: "#2d2d44", bg: "bg-[#2d2d44]" },
  { name: "Cream", hex: "#f5f5dc", bg: "bg-[#f5f5dc]" },
  { name: "Bronze", hex: "#c9a227", bg: "bg-[#c9a227]" },
  { name: "Emerald", hex: "#2e8b57", bg: "bg-[#2e8b57]" },
  { name: "Burgundy", hex: "#722f37", bg: "bg-[#722f37]" },
  { name: "Ivory", hex: "#fffff0", bg: "bg-[#fffff0]" },
];

// Art Deco corner decoration component
function DecoCorners({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };
  return (
    <>
      <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-t-2 border-l-2 border-yellow-500`} />
      <div className={`absolute top-0 right-0 ${sizeClasses[size]} border-t-2 border-r-2 border-yellow-500`} />
      <div className={`absolute bottom-0 left-0 ${sizeClasses[size]} border-b-2 border-l-2 border-yellow-500`} />
      <div className={`absolute bottom-0 right-0 ${sizeClasses[size]} border-b-2 border-r-2 border-yellow-500`} />
    </>
  );
}

// Art Deco divider
function DecoDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-500" />
      <Diamond className="w-3 h-3 text-yellow-500" />
      <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-500" />
    </div>
  );
}

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(72);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Architecture", icon: Building2 },
    { label: "Jewelry", icon: Gem },
    { label: "Fashion", icon: Crown },
  ];

  const accordionItems = [
    {
      title: "What defines Art Deco?",
      content: "Art Deco is characterized by rich colors, bold geometric forms, and lavish ornamentation. It represents luxury, glamour, exuberance, and faith in social and technological progress."
    },
    {
      title: "Historical origins",
      content: "Emerging in France before World War I, Art Deco flourished internationally in the 1920s and 1930s, influencing architecture, visual arts, fashion, and industrial design."
    },
    {
      title: "Key design elements",
      content: "Symmetrical geometric patterns, stepped forms, chevron patterns, sunburst motifs, and the use of expensive materials like jade, ivory, and lacquer define the style."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Radial decoration */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent origin-left"
              style={{ transform: `rotate(${i * 30}deg)` }}
            />
          ))}
        </div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,#d4af37_20px,#d4af37_21px)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-yellow-600/30 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/art-deco"
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-serif tracking-wider text-sm">Back to Docs</span>
          </Link>
          <div className="flex items-center gap-3">
            <Diamond className="w-4 h-4 text-yellow-500" />
            <span className="font-serif text-xl text-yellow-500 tracking-[0.3em]">
              ART DECO
            </span>
            <Diamond className="w-4 h-4 text-yellow-500" />
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 border border-yellow-500 text-yellow-500 text-sm font-serif tracking-wider hover:bg-yellow-500 hover:text-slate-900 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative top element */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-yellow-500" />
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-yellow-500" />
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-yellow-500 mb-6 tracking-[0.2em]">
            ART DECO
          </h1>

          <DecoDivider className="mb-8" />

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 tracking-wider font-serif">
            The Golden Age of Design - 1920年代奢华与现代的完美融合
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="group px-12 py-5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.3em] border-2 border-yellow-400 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300">
              <span className="flex items-center gap-3">
                <Diamond className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                Discover
              </span>
            </button>
            <button className="px-12 py-5 bg-transparent border-2 border-yellow-500 text-yellow-500 font-serif uppercase tracking-[0.3em] hover:bg-yellow-500/10 transition-all duration-300">
              <span className="flex items-center gap-3">
                <Eye className="w-5 h-5" />
                Explore
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ShowcaseSection
        title="Statistics"
        subtitle="Numbers that define excellence"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Users, label: "Members", value: "12.8K" },
            { icon: TrendingUp, label: "Growth", value: "+89%" },
            { icon: Eye, label: "Views", value: "2.4M" },
            { icon: Award, label: "Awards", value: "147" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/30 hover:border-yellow-500/60 transition-all duration-300"
            >
              <DecoCorners size="sm" />
              <stat.icon className="w-8 h-8 text-yellow-500/60 group-hover:text-yellow-500 mb-3 transition-colors" />
              <p className="text-3xl md:text-4xl font-serif text-yellow-500 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Luxurious gold and deep navy"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-yellow-600/30 bg-slate-800/50 backdrop-blur-sm hover:border-yellow-500/50 transition-all duration-300"
            labelClassName="font-serif text-sm text-yellow-400 tracking-wider"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Golden radiance with elegant borders"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Variants */}
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <DecoCorners size="lg" />
            <p className="text-sm font-serif text-yellow-500 uppercase tracking-[0.3em] mb-6 text-center">Variants</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:scale-105 transition-all">
                Primary
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-yellow-500 text-yellow-500 font-serif uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black transition-all">
                Outline
              </button>
              <button className="px-8 py-3 bg-slate-800 border border-yellow-600/30 text-yellow-400 font-serif uppercase tracking-[0.2em] hover:border-yellow-500 transition-all">
                Secondary
              </button>
              <button className="px-8 py-3 bg-transparent text-yellow-500/70 font-serif uppercase tracking-[0.2em] hover:text-yellow-400 transition-all">
                Ghost
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <DecoCorners size="md" />
            <p className="text-sm font-serif text-yellow-500 uppercase tracking-[0.3em] mb-6 text-center">Sizes</p>
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <button className="px-5 py-2 text-sm bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.15em] shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all">
                Small
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
                Medium
              </button>
              <button className="px-10 py-4 text-lg bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
                Large
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Geometric borders and symmetry"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Diamond, title: "LUXURY", desc: "Timeless elegance in every detail" },
            { icon: Crown, title: "PRESTIGE", desc: "Royal sophistication redefined" },
            { icon: Gem, title: "REFINED", desc: "Exquisite craftsmanship always" },
          ].map((card, index) => (
            <div key={index} className="group relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50 hover:border-yellow-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300">
              <DecoCorners size="md" />
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <card.icon className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-serif text-yellow-500 text-center mb-2 tracking-[0.2em]">
                {card.title}
              </h3>
              <DecoDivider className="mb-3" />
              <p className="text-gray-400 text-center text-sm mb-4">{card.desc}</p>
              <button className="block mx-auto text-sm text-yellow-500/70 uppercase tracking-wider hover:text-yellow-400 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Organized elegance"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <DecoCorners size="lg" />
            {/* Tab Headers */}
            <div className="flex border-b border-yellow-600/30 mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3 font-serif uppercase tracking-wider text-sm transition-all duration-300 ${
                    activeTab === index
                      ? 'text-yellow-500 border-b-2 border-yellow-500 -mb-[1px]'
                      : 'text-gray-500 hover:text-yellow-400'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="min-h-[120px]">
              {activeTab === 0 && (
                <div className="text-gray-400">
                  <h4 className="text-lg font-serif text-yellow-500 mb-3 tracking-wider">Architectural Marvels</h4>
                  <p>From the Chrysler Building to the Empire State, Art Deco architecture defines the golden age of American design with bold geometric forms.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div className="text-gray-400">
                  <h4 className="text-lg font-serif text-yellow-500 mb-3 tracking-wider">Precious Adornments</h4>
                  <p>Art Deco jewelry features bold geometric shapes, vibrant gemstones, and the lavish use of platinum and white gold.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div className="text-gray-400">
                  <h4 className="text-lg font-serif text-yellow-500 mb-3 tracking-wider">Haute Couture</h4>
                  <p>The 1920s brought revolutionary changes to fashion with dropped waistlines, geometric patterns, and luxurious fabrics.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Distinguished notifications"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-start gap-4 p-5 bg-emerald-500/10 border border-emerald-500/30">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-serif text-emerald-400 tracking-wider mb-1">SUCCESS</h4>
              <p className="text-emerald-300/70 text-sm">Your reservation has been confirmed at the Grand Ballroom.</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-4 p-5 bg-amber-500/10 border border-amber-500/30">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-serif text-amber-400 tracking-wider mb-1">ATTENTION</h4>
              <p className="text-amber-300/70 text-sm">The gala event dress code requires formal evening attire.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-start gap-4 p-5 bg-red-500/10 border border-red-500/30">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-serif text-red-400 tracking-wider mb-1">ERROR</h4>
              <p className="text-red-300/70 text-sm">We regret to inform you that the requested suite is unavailable.</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start gap-4 p-5 bg-yellow-500/10 border border-yellow-500/30">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h4 className="font-serif text-yellow-400 tracking-wider mb-1">NOTICE</h4>
              <p className="text-yellow-300/70 text-sm">The exhibition gallery will be open until midnight this weekend.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress"
        subtitle="Tracking excellence"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <DecoCorners size="lg" />
            <div className="space-y-8">
              {/* Gold Progress */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-serif text-yellow-500 uppercase tracking-wider">Project Status</span>
                  <span className="text-sm text-yellow-400">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-800 border border-yellow-600/30 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Emerald Progress */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-serif text-emerald-400 uppercase tracking-wider">Completion</span>
                  <span className="text-sm text-emerald-400">85%</span>
                </div>
                <div className="h-2 bg-slate-800 border border-emerald-600/30 overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-4 py-2 text-sm border border-yellow-600/50 text-yellow-500 font-serif uppercase tracking-wider hover:bg-yellow-500/10 transition-all"
                >
                  -10%
                </button>
                <button 
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-4 py-2 text-sm border border-yellow-600/50 text-yellow-500 font-serif uppercase tracking-wider hover:bg-yellow-500/10 transition-all"
                >
                  +10%
                </button>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tags & Badges */}
      <ShowcaseSection
        title="Tags & Badges"
        subtitle="Distinguished labels"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <DecoCorners size="lg" />
            {/* Tags */}
            <div className="mb-8">
              <p className="text-sm font-serif text-yellow-500 uppercase tracking-[0.2em] mb-4 text-center">Tags</p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-1.5 border border-yellow-500/50 text-yellow-400 text-sm font-serif uppercase tracking-wider">
                  Luxury
                </span>
                <span className="px-4 py-1.5 border border-emerald-500/50 text-emerald-400 text-sm font-serif uppercase tracking-wider">
                  Exclusive
                </span>
                <span className="px-4 py-1.5 border border-amber-500/50 text-amber-400 text-sm font-serif uppercase tracking-wider">
                  Premium
                </span>
                <span className="px-4 py-1.5 border border-gray-500/50 text-gray-400 text-sm font-serif uppercase tracking-wider">
                  Vintage
                </span>
              </div>
            </div>

            <DecoDivider className="mb-8" />

            {/* Badges */}
            <div>
              <p className="text-sm font-serif text-yellow-500 uppercase tracking-[0.2em] mb-4 text-center">Badges</p>
              <div className="flex flex-wrap justify-center gap-4 items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-700 text-black text-sm font-bold">
                  5
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black text-sm font-bold uppercase tracking-wider">
                  New
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm font-bold uppercase tracking-wider">
                  VIP
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-yellow-500 text-yellow-500 text-sm font-bold">
                  99
                </span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle Switch */}
      <ShowcaseSection
        title="Toggles"
        subtitle="Elegant switches"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <DecoCorners size="md" />
            <div className="space-y-5">
              {[
                { label: "Gold Membership", index: 0 },
                { label: "VIP Access", index: 1 },
                { label: "Notifications", index: 2 },
              ].map((item) => (
                <div key={item.index} className="flex items-center justify-between">
                  <span className="text-gray-300 font-serif tracking-wider">{item.label}</span>
                  <button
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[item.index] = !newStates[item.index];
                      setToggleStates(newStates);
                    }}
                    className={`relative w-14 h-7 border transition-all duration-300 ${
                      toggleStates[item.index]
                        ? 'bg-gradient-to-r from-yellow-600/30 to-yellow-500/30 border-yellow-500 shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                        : 'bg-slate-800 border-yellow-600/30'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-6 h-6 transition-all duration-300 ${
                        toggleStates[item.index]
                          ? 'left-7 bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-[0_0_8px_rgba(212,175,55,0.5)]'
                          : 'left-0.5 bg-slate-600'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Expandable content"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {accordionItems.map((item, index) => (
              <div 
                key={index}
                className={`relative border transition-all duration-300 ${
                  openAccordion === index 
                    ? 'border-yellow-500 shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                    : 'border-yellow-600/30'
                } bg-gradient-to-b from-slate-900 to-slate-800`}
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-serif text-yellow-400 tracking-wider">{item.title}</span>
                  {openAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-yellow-600" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 pb-5 text-gray-400 text-sm">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Elegant input components"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <DecoCorners size="lg" />

            <h3 className="text-xl font-serif text-yellow-500 text-center mb-4 tracking-[0.3em]">CONTACT</h3>
            <DecoDivider className="mb-6" />

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-serif text-yellow-500 uppercase tracking-[0.2em] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-slate-900 border border-yellow-600/50 text-yellow-100 placeholder-yellow-600/40 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-yellow-500 uppercase tracking-[0.2em] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-slate-900 border border-yellow-600/50 text-yellow-100 placeholder-yellow-600/40 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-yellow-500 uppercase tracking-[0.2em] mb-2">Message</label>
                <textarea
                  rows={3}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-slate-900 border border-yellow-600/50 text-yellow-100 placeholder-yellow-600/40 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_15px_rgba(212,175,55,0.2)] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-black font-semibold uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Avatars */}
      <ShowcaseSection
        title="Avatars"
        subtitle="Distinguished profiles"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-yellow-500 mb-4 text-center tracking-[0.2em]"
        subtitleClassName="text-gray-400 mb-10 text-center tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-gradient-to-b from-slate-900 to-slate-800 border border-yellow-600/50">
            <DecoCorners size="lg" />
            <div className="flex flex-wrap items-end justify-center gap-8">
              {/* Small */}
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-black font-serif font-bold text-sm mb-2">
                  J
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Small</span>
              </div>
              {/* Medium */}
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-black font-serif font-bold text-lg mb-2">
                  GG
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Medium</span>
              </div>
              {/* Large */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-black font-serif font-bold text-2xl mb-2">
                  FS
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Large</span>
              </div>
              {/* Outlined */}
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-yellow-500 bg-slate-900 flex items-center justify-center text-yellow-500 font-serif font-bold text-xl mb-2">
                  AD
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Outlined</span>
              </div>
              {/* Group */}
              <div className="text-center">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-black font-serif font-bold border-2 border-slate-900">A</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-serif font-bold border-2 border-slate-900">B</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-black font-serif font-bold border-2 border-slate-900">+3</div>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-wider mt-2 block">Group</span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-yellow-600/30 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <DecoDivider className="mb-6" />
          <div className="flex items-center justify-center gap-3 mb-4">
            <Diamond className="w-4 h-4 text-yellow-500" />
            <span className="text-xl font-serif text-yellow-500 tracking-[0.3em]">ART DECO</span>
            <Diamond className="w-4 h-4 text-yellow-500" />
          </div>
          <p className="text-gray-500 text-sm font-serif tracking-wider mb-4">
            Part of the{" "}
            <Link href="/" className="text-yellow-500 hover:text-yellow-400 transition-colors">
              StyleKit
            </Link>{" "}
            Design System Collection
          </p>
          <p className="text-gray-600 text-xs font-serif tracking-[0.2em] uppercase">
            The Golden Age of Design
          </p>
        </div>
      </footer>
    </div>
  );
}
