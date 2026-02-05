"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Settings, Volume2, Power, ChevronUp, ChevronDown,
  Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Star,
  Folder, Music, Image
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Leather", hex: "#8b7355", bg: "bg-[#8b7355]" },
  { name: "Wood", hex: "#d4c4a8", bg: "bg-[#d4c4a8]" },
  { name: "Gold", hex: "#c9a227", bg: "bg-[#c9a227]" },
  { name: "Brown", hex: "#5c4033", bg: "bg-[#5c4033]" },
  { name: "Green", hex: "#2e5a3c", bg: "bg-[#2e5a3c]" },
  { name: "Steel", hex: "#71797E", bg: "bg-[#71797E]" },
  { name: "Copper", hex: "#b87333", bg: "bg-[#b87333]" },
  { name: "Chrome", hex: "#dcdcdc", bg: "bg-[#dcdcdc]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [volume, setVolume] = useState(75);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [quantity, setQuantity] = useState(42);

  const tabs = [
    { label: "Documents", icon: Folder },
    { label: "Music", icon: Music },
    { label: "Photos", icon: Image },
  ];

  const accordionItems = [
    { title: "What is Skeuomorphism?", content: "Skeuomorphism is a design approach where digital elements mimic their real-world counterparts with realistic textures, shadows, and materials to create familiar, tactile interfaces." },
    { title: "Key Design Elements", content: "Realistic textures (leather, wood, metal), embossed/debossed effects, gradients simulating light sources, drop shadows for depth, and beveled edges for 3D appearance." },
    { title: "Historical Context", content: "Popular in early iOS and macOS interfaces, skeuomorphism helped users transition to digital by providing familiar visual cues from the physical world." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400">
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiPjwvcmVjdD4KPC9zdmc+')]" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-gradient-to-b from-stone-100 to-stone-200 border-b border-stone-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/skeuomorphism"
            className="flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Docs</span>
          </Link>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-stone-500" />
            <span className="font-bold text-xl text-stone-800" style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>
              SKEUOMORPHISM
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-gradient-to-b from-stone-100 to-stone-200 border border-stone-400 rounded-lg text-stone-700 text-sm font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] hover:from-stone-200 hover:to-stone-300 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 mb-6 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg border border-amber-300 shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <span className="text-sm font-medium text-amber-800">Design Philosophy</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-stone-800 mb-6" style={{textShadow: '0 2px 0 rgba(255,255,255,0.8)'}}>
            Skeuomorphism
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-12">
            Digital meets physical - realistic textures, tactile feedback, and familiar metaphors
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="px-10 py-4 bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold rounded-xl border border-blue-700 shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.2)] hover:from-blue-500 hover:to-blue-700 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] active:translate-y-[1px] transition-all">
              Get Started
            </button>
            <button className="px-10 py-4 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-700 font-bold rounded-xl border border-gray-400 shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.1)] hover:from-gray-200 hover:to-gray-400 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-[1px] transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Statistics"
        subtitle="Dashboard metrics display"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Users, label: "Users", value: "12,847", gradient: "from-blue-400 to-blue-600" },
            { icon: TrendingUp, label: "Growth", value: "+89%", gradient: "from-green-400 to-green-600" },
            { icon: Eye, label: "Views", value: "2.4M", gradient: "from-purple-400 to-purple-600" },
            { icon: Star, label: "Rating", value: "4.9", gradient: "from-amber-400 to-amber-600" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-5 bg-gradient-to-b from-white/90 to-gray-100/90 rounded-xl border border-gray-300 shadow-[0_6px_12px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]"
            >
              <div className={`w-10 h-10 bg-gradient-to-b ${stat.gradient} rounded-lg flex items-center justify-center mb-3 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-3xl font-bold text-stone-800 mb-1" style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>{stat.value}</p>
              <p className="text-sm text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Material Colors"
        subtitle="Natural textures and finishes"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="bg-gradient-to-b from-white to-gray-100 rounded-xl border border-gray-300 shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)] transition-shadow"
            labelClassName="font-bold text-sm text-stone-700"
            hexClassName="text-xs text-stone-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Tactile press feedback"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Variants */}
          <div className="p-8 bg-gradient-to-b from-white/80 to-gray-100/80 rounded-2xl border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-bold text-stone-600 uppercase tracking-wide mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold rounded-lg border border-blue-700 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-green-400 to-green-600 text-white font-bold rounded-lg border border-green-700 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all">
                Success
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-red-400 to-red-600 text-white font-bold rounded-lg border border-red-700 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all">
                Danger
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-700 font-bold rounded-lg border border-gray-400 shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all">
                Default
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="p-8 bg-gradient-to-b from-amber-50/80 to-amber-100/80 rounded-2xl border border-amber-300 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <p className="text-sm font-bold text-amber-800 uppercase tracking-wide mb-6">Sizes</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-4 py-2 text-sm bg-gradient-to-b from-amber-400 to-amber-600 text-white font-bold rounded-md border border-amber-700 shadow-[0_3px_5px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] transition-all">
                Small
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-amber-400 to-amber-600 text-white font-bold rounded-lg border border-amber-700 shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] transition-all">
                Medium
              </button>
              <button className="px-8 py-4 text-lg bg-gradient-to-b from-amber-400 to-amber-600 text-white font-bold rounded-xl border border-amber-700 shadow-[0_5px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] transition-all">
                Large
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Textured surfaces"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="group p-6 bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl border border-amber-300 shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-4 shadow-[0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Leather Card</h3>
            <p className="text-amber-800 mb-3">Rich, warm texture with natural grain pattern.</p>
            <button className="text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors">Learn more</button>
          </div>
          <div className="group p-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl border border-gray-300 shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-b from-gray-400 to-gray-600 rounded-lg flex items-center justify-center mb-4 shadow-[0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Metal Card</h3>
            <p className="text-gray-600 mb-3">Brushed aluminum finish with subtle reflections.</p>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Learn more</button>
          </div>
          <div className="group p-6 bg-gradient-to-b from-stone-100 to-stone-200 rounded-2xl border border-stone-300 shadow-[0_8px_16px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.7)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-b from-stone-400 to-stone-600 rounded-lg flex items-center justify-center mb-4 shadow-[0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
              <Image className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">Paper Card</h3>
            <p className="text-stone-600 mb-3">Soft, matte finish like quality stationery.</p>
            <button className="text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors">Learn more</button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Folder-style navigation"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-gradient-to-b from-white/80 to-gray-100/80 rounded-2xl border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]">
            {/* Tab Headers */}
            <div className="flex gap-1 mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-5 py-3 font-medium text-sm rounded-t-lg transition-all ${
                    activeTab === index
                      ? 'bg-gradient-to-b from-blue-400 to-blue-500 text-white shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]'
                      : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 border border-gray-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] hover:from-gray-150 hover:to-gray-250'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="min-h-[120px] p-5 bg-gradient-to-b from-white to-gray-50 rounded-lg border border-gray-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Documents</h4>
                  <p className="text-gray-600">Browse your saved documents and files organized in folders.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Music Library</h4>
                  <p className="text-gray-600">Access your music collection with album artwork and playlists.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">Photo Gallery</h4>
                  <p className="text-gray-600">View and organize your photos by date, location, or album.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="System notifications"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-b from-green-100 to-green-200 rounded-xl border border-green-300 shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <div className="w-10 h-10 bg-gradient-to-b from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-green-800">Success</p>
              <p className="text-green-700 text-sm">Your settings have been saved successfully.</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl border border-amber-300 shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <div className="w-10 h-10 bg-gradient-to-b from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-amber-800">Warning</p>
              <p className="text-amber-700 text-sm">Please review your changes before continuing.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-b from-red-100 to-red-200 rounded-xl border border-red-300 shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <div className="w-10 h-10 bg-gradient-to-b from-red-400 to-red-600 rounded-lg flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-red-800">Error</p>
              <p className="text-red-700 text-sm">An error occurred. Please try again.</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl border border-blue-300 shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <div className="w-10 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-blue-800">Information</p>
              <p className="text-blue-700 text-sm">Updates are available for your application.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Control Panel / Progress */}
      <ShowcaseSection
        title="Control Panel"
        subtitle="Realistic interface elements"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl border border-gray-400 shadow-[0_10px_30px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.6)]">
            {/* Volume Control */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-6 h-6 text-gray-600" />
                  <span className="font-bold text-gray-700">Volume</span>
                </div>
                <span className="text-sm font-bold text-gray-600">{volume}%</span>
              </div>
              <div className="h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-b from-green-400 to-green-600 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300"
                  style={{ width: `${volume}%` }}
                />
              </div>
              <div className="flex gap-2 mt-3">
                <button 
                  onClick={() => setVolume(Math.max(0, volume - 10))}
                  className="px-3 py-1 text-xs bg-gradient-to-b from-gray-100 to-gray-200 rounded border border-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all"
                >
                  -10
                </button>
                <button 
                  onClick={() => setVolume(Math.min(100, volume + 10))}
                  className="px-3 py-1 text-xs bg-gradient-to-b from-gray-100 to-gray-200 rounded border border-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all"
                >
                  +10
                </button>
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-4 mb-8">
              {[
                { label: "Power", icon: Power, index: 0 },
                { label: "Settings", icon: Settings, index: 1 },
                { label: "Notifications", icon: Volume2, index: 2 },
              ].map((item) => (
                <div key={item.index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-700">{item.label}</span>
                  </div>
                  <button
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[item.index] = !newStates[item.index];
                      setToggleStates(newStates);
                    }}
                    className={`w-14 h-8 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] relative transition-all ${
                      toggleStates[item.index] 
                        ? 'bg-gradient-to-b from-green-400 to-green-600' 
                        : 'bg-gradient-to-b from-gray-400 to-gray-500'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all ${
                      toggleStates[item.index] ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            {/* Number Stepper */}
            <div>
              <span className="font-bold text-gray-700 block mb-4">Quantity</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  className="w-10 h-10 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg border border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all"
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </button>
                <div className="w-20 h-10 bg-gradient-to-b from-white to-gray-100 rounded-lg border border-gray-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center">
                  <span className="font-bold text-gray-800 text-lg">{quantity}</span>
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gradient-to-b from-gray-100 to-gray-300 rounded-lg border border-gray-400 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] flex items-center justify-center active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all"
                >
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tags & Badges */}
      <ShowcaseSection
        title="Tags & Badges"
        subtitle="Label elements"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-b from-white/80 to-gray-100/80 rounded-2xl border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]">
            {/* Tags */}
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4">Tags</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg border border-blue-300 text-blue-700 text-sm font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
                  Design
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-b from-green-100 to-green-200 rounded-lg border border-green-300 text-green-700 text-sm font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
                  Realistic
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg border border-amber-300 text-amber-700 text-sm font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
                  Tactile
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
                  Classic
                </span>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="w-8 h-8 bg-gradient-to-b from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]">
                  5
                </span>
                <span className="px-3 h-7 bg-gradient-to-b from-blue-400 to-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs uppercase shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]">
                  New
                </span>
                <span className="px-3 h-7 bg-gradient-to-b from-amber-400 to-amber-600 rounded-md flex items-center justify-center text-white font-bold text-xs uppercase shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)]">
                  Pro
                </span>
                <span className="w-8 h-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm border border-gray-300 shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
                  99
                </span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Expandable panels"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {accordionItems.map((item, index) => (
              <div 
                key={index}
                className={`rounded-xl overflow-hidden transition-all ${
                  openAccordion === index 
                    ? 'bg-gradient-to-b from-blue-50 to-blue-100 border border-blue-300 shadow-[0_6px_12px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.5)]' 
                    : 'bg-gradient-to-b from-white to-gray-100 border border-gray-300 shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]'
                }`}
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className={`font-bold ${openAccordion === index ? 'text-blue-800' : 'text-gray-800'}`}>{item.title}</span>
                  {openAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 pb-4 text-gray-600">
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
        subtitle="Input elements"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-b from-white/90 to-gray-100/90 rounded-2xl border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center" style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>Contact Form</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-gradient-to-b from-white to-gray-50 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:border-blue-400 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_0_0_3px_rgba(59,130,246,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-gradient-to-b from-white to-gray-50 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:border-blue-400 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_0_0_3px_rgba(59,130,246,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={3}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-gradient-to-b from-white to-gray-50 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] focus:border-blue-400 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_0_0_3px_rgba(59,130,246,0.2)] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full py-4 bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold rounded-lg border border-blue-700 shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Avatars */}
      <ShowcaseSection
        title="Avatars"
        subtitle="User representations"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-stone-800 mb-4 text-center"
        subtitleClassName="text-stone-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-b from-white/80 to-gray-100/80 rounded-2xl border border-gray-300 shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="flex flex-wrap items-end justify-center gap-6">
              {/* Small */}
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-[0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] mb-2">
                  A
                </div>
                <span className="text-xs text-gray-500">Small</span>
              </div>
              {/* Medium */}
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-b from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] mb-2">
                  BF
                </div>
                <span className="text-xs text-gray-500">Medium</span>
              </div>
              {/* Large */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-[0_5px_10px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] mb-2">
                  XO
                </div>
                <span className="text-xs text-gray-500">Large</span>
              </div>
              {/* Ring */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl border-4 border-white shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] mb-2">
                  JD
                </div>
                <span className="text-xs text-gray-500">Ring</span>
              </div>
              {/* Group */}
              <div className="text-center">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-b from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-[0_3px_6px_rgba(0,0,0,0.2)]">A</div>
                  <div className="w-12 h-12 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-[0_3px_6px_rgba(0,0,0,0.2)]">B</div>
                  <div className="w-12 h-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold border-2 border-white shadow-[0_3px_6px_rgba(0,0,0,0.2)]">+3</div>
                </div>
                <span className="text-xs text-gray-500 mt-2 block">Group</span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 bg-gradient-to-b from-stone-300 to-stone-400 border-t border-stone-400">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-stone-500" />
            <span className="text-xl font-bold text-stone-800" style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>
              Skeuomorphism
            </span>
          </div>
          <p className="text-stone-600 text-sm mb-2">
            Part of the{" "}
            <Link href="/" className="text-stone-700 hover:text-stone-900 transition-colors font-medium">
              StyleKit
            </Link>{" "}
            Design System Collection
          </p>
          <p className="text-stone-500 text-xs">
            Digital Meets Physical
          </p>
        </div>
      </footer>
    </div>
  );
}
