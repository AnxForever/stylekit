"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Zap, Circle, Square, Triangle, Star, Heart,
  ChevronDown, ChevronUp, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Sparkles
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Red", hex: "#ff6b6b", bg: "bg-[#ff6b6b]" },
  { name: "Yellow", hex: "#feca57", bg: "bg-[#feca57]" },
  { name: "Cyan", hex: "#48dbfb", bg: "bg-[#48dbfb]" },
  { name: "Pink", hex: "#ff9ff3", bg: "bg-[#ff9ff3]" },
  { name: "Green", hex: "#1dd1a1", bg: "bg-[#1dd1a1]" },
  { name: "Purple", hex: "#a55eea", bg: "bg-[#a55eea]" },
  { name: "Orange", hex: "#ff9f43", bg: "bg-[#ff9f43]" },
  { name: "Black", hex: "#2d3436", bg: "bg-[#2d3436]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "SHAPES", icon: Circle },
    { label: "COLORS", icon: Sparkles },
    { label: "PATTERNS", icon: Square },
  ];

  const accordionItems = [
    { title: "WHAT IS MEMPHIS?", content: "Memphis Design is a postmodern design movement that emerged in Milan in 1981. It rejected the minimalism of modernism in favor of bold colors, geometric shapes, and unconventional materials." },
    { title: "KEY ELEMENTS", content: "Bright clashing colors, squiggles and zigzags, geometric shapes (circles, triangles, squares), terrazzo patterns, and asymmetrical compositions define the style." },
    { title: "INFLUENCE TODAY", content: "Memphis design has made a comeback in modern graphic design, interior decor, and digital interfaces, inspiring playful and bold visual experiences." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-cyan-300 relative overflow-hidden">
      {/* Decorative Memphis shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Circles */}
        <div className="absolute top-20 left-[10%] w-24 h-24 bg-red-500 rounded-full border-4 border-black" />
        <div className="absolute top-40 right-[15%] w-16 h-16 bg-purple-500 rounded-full border-4 border-black" />
        <div className="absolute bottom-40 left-[25%] w-12 h-12 bg-green-400 rounded-full border-4 border-black" />
        
        {/* Squares */}
        <div className="absolute top-1/3 left-[5%] w-16 h-16 bg-blue-500 border-4 border-black rotate-12" />
        <div className="absolute bottom-32 right-[20%] w-20 h-20 bg-orange-400 border-4 border-black -rotate-6" />
        
        {/* Triangles */}
        <div className="absolute top-48 right-[8%] w-0 h-0 border-l-[35px] border-l-transparent border-b-[60px] border-b-green-400 border-r-[35px] border-r-transparent" />
        <div className="absolute bottom-60 left-[8%] w-0 h-0 border-l-[25px] border-l-transparent border-b-[45px] border-b-pink-500 border-r-[25px] border-r-transparent rotate-45" />
        
        {/* Squiggly lines (simulated with dots) */}
        <div className="absolute top-1/2 right-[5%] flex flex-col gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`w-3 h-3 bg-black rounded-full ${i % 2 === 0 ? 'ml-2' : ''}`} />
          ))}
        </div>
        <div className="absolute bottom-1/3 left-[3%] flex flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-2 h-2 bg-red-500 rounded-full ${i % 2 === 0 ? 'ml-3' : ''}`} />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-yellow-400 border-b-4 border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/memphis"
            className="flex items-center gap-2 text-black font-bold hover:text-red-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Docs</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-black" />
            <span className="font-black text-2xl text-black uppercase tracking-wider">
              MEMPHIS
            </span>
            <div className="w-4 h-4 bg-cyan-400 border-2 border-black rotate-45" />
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-pink-400 border-4 border-black text-black text-sm font-bold shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative shapes around title */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-black" />
            <div className="w-5 h-5 bg-yellow-400 border-2 border-black rotate-45" />
            <div className="w-6 h-6 bg-cyan-400 rounded-full border-2 border-black" />
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-black uppercase mb-4 tracking-tight">
            MEMPHIS
          </h1>
          <p className="text-lg font-black text-black/60 uppercase tracking-[0.3em] mb-4">
            Design Movement
          </p>
          <p className="text-xl text-black/70 max-w-2xl mx-auto mb-12 font-bold">
            Design should be fun! Bold colors, geometric shapes, and playful patterns
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="relative px-10 py-5 bg-yellow-400 border-4 border-black text-black font-black uppercase shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150">
              <span className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </span>
              Get Started
            </button>
            <button className="px-10 py-5 bg-cyan-400 border-4 border-black text-black font-black uppercase shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="STATS"
        subtitle="Bold numbers display"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Users, label: "USERS", value: "12K", bg: "bg-pink-300" },
            { icon: TrendingUp, label: "GROWTH", value: "+85%", bg: "bg-yellow-300" },
            { icon: Eye, label: "VIEWS", value: "2.4M", bg: "bg-cyan-300" },
            { icon: Star, label: "RATING", value: "4.9", bg: "bg-green-300" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`relative p-5 ${stat.bg} border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all`}
            >
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full border-2 border-black" />
              <stat.icon className="w-8 h-8 text-black mb-2" />
              <p className="text-3xl md:text-4xl font-black text-black">{stat.value}</p>
              <p className="text-sm font-bold text-black/60 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLORS"
        subtitle="Vibrant clashing combos"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-4 border-black shadow-[6px_6px_0px_#000] bg-white hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            labelClassName="font-black text-sm text-black uppercase"
            hexClassName="text-xs text-gray-600 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="Hard shadows & bold colors"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Variants */}
          <div className="relative p-8 bg-pink-300 border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black" />
            <p className="text-sm font-black text-black uppercase tracking-wide mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="relative px-6 py-3 bg-yellow-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                <span className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
                Primary
              </button>
              <button className="px-6 py-3 bg-cyan-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-green-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Success
              </button>
              <button className="px-6 py-3 bg-red-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Danger
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="relative p-8 bg-cyan-300 border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 border-2 border-black rotate-45" />
            <p className="text-sm font-black text-black uppercase tracking-wide mb-6">Sizes</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-4 py-2 text-sm bg-purple-400 border-4 border-black text-black font-black uppercase shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                Small
              </button>
              <button className="px-6 py-3 bg-purple-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Medium
              </button>
              <button className="px-8 py-4 text-lg bg-purple-400 border-4 border-black text-black font-black uppercase shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                Large
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="Geometric decorations"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "ENERGY", desc: "Bold and vibrant design", bg: "bg-pink-300" },
            { icon: Circle, title: "SHAPES", desc: "Geometric elements", bg: "bg-yellow-300" },
            { icon: Square, title: "PATTERN", desc: "Playful decoration", bg: "bg-cyan-300" },
          ].map((card, index) => (
            <div key={index} className={`relative group p-6 ${card.bg} border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all`}>
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black group-hover:rotate-45 transition-transform" />
              <div className="absolute -bottom-3 -right-3 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-red-500 border-r-[20px] border-r-transparent" />
              <div className="w-16 h-16 bg-purple-500 border-4 border-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-black uppercase mb-2">
                {card.title}
              </h3>
              <p className="text-black/70 font-medium mb-3">{card.desc}</p>
              <button className="text-sm font-bold text-black uppercase hover:text-red-600 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="TABS"
        subtitle="Navigate with style"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative p-6 bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-400 rounded-full border-2 border-black" />
            {/* Tab Headers */}
            <div className="flex gap-2 mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-2 font-black uppercase text-sm border-4 border-black transition-all ${
                    activeTab === index
                      ? 'bg-yellow-400 shadow-[4px_4px_0px_#000]'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="min-h-[120px] p-5 bg-pink-100 border-4 border-black">
              {activeTab === 0 && (
                <div>
                  <p className="font-black text-black uppercase mb-3">GEOMETRIC SHAPES</p>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-black" />
                    <div className="w-10 h-10 bg-blue-500 border-2 border-black" />
                    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-green-400 border-r-[20px] border-r-transparent" />
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <p className="font-black text-black uppercase mb-3">COLOR PALETTE</p>
                  <p className="text-black/70 font-medium">Bright, clashing colors that reject subtle harmonies in favor of bold visual impact.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <p className="font-black text-black uppercase mb-3">PATTERNS</p>
                  <p className="text-black/70 font-medium">Squiggles, dots, zigzags, and terrazzo patterns create visual excitement.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="ALERTS"
        subtitle="Bold notifications"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-center gap-4 p-4 bg-green-300 border-4 border-black shadow-[4px_4px_0px_#000]">
            <div className="w-10 h-10 bg-green-500 border-4 border-black flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-black uppercase">SUCCESS!</p>
              <p className="text-black/70 font-medium">Your action was completed successfully.</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-4 p-4 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_#000]">
            <div className="w-10 h-10 bg-orange-500 border-4 border-black flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-black uppercase">WARNING!</p>
              <p className="text-black/70 font-medium">Please check your input before continuing.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-center gap-4 p-4 bg-red-300 border-4 border-black shadow-[4px_4px_0px_#000]">
            <div className="w-10 h-10 bg-red-500 border-4 border-black flex items-center justify-center">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-black uppercase">ERROR!</p>
              <p className="text-black/70 font-medium">Something went wrong. Try again.</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-4 p-4 bg-cyan-300 border-4 border-black shadow-[4px_4px_0px_#000]">
            <div className="w-10 h-10 bg-blue-500 border-4 border-black flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-black uppercase">INFO!</p>
              <p className="text-black/70 font-medium">Here's some useful information for you.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="PROGRESS"
        subtitle="Track your journey"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -right-4 w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-pink-500 border-r-[20px] border-r-transparent" />
            <div className="space-y-8">
              {/* Yellow Progress */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-black text-black uppercase">Progress</span>
                  <span className="text-sm font-black text-black">{progress}%</span>
                </div>
                <div className="h-6 bg-gray-200 border-4 border-black overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Multicolor Progress */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-black text-black uppercase">Skills</span>
                  <span className="text-sm font-black text-black">80%</span>
                </div>
                <div className="h-6 bg-gray-200 border-4 border-black overflow-hidden flex">
                  <div className="h-full w-[30%] bg-pink-400" />
                  <div className="h-full w-[25%] bg-cyan-400" />
                  <div className="h-full w-[25%] bg-green-400" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-4 py-2 text-sm bg-red-400 border-4 border-black text-black font-black uppercase shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  -10%
                </button>
                <button 
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-4 py-2 text-sm bg-green-400 border-4 border-black text-black font-black uppercase shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
        title="TAGS & BADGES"
        subtitle="Label everything"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-pink-300 border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400 border-2 border-black rotate-45" />
            {/* Tags */}
            <div className="mb-8">
              <p className="text-sm font-black text-black uppercase mb-4">Tags</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-yellow-400 border-4 border-black text-black text-sm font-black uppercase shadow-[3px_3px_0px_#000]">
                  Design
                </span>
                <span className="px-4 py-2 bg-cyan-400 border-4 border-black text-black text-sm font-black uppercase shadow-[3px_3px_0px_#000]">
                  Art
                </span>
                <span className="px-4 py-2 bg-green-400 border-4 border-black text-black text-sm font-black uppercase shadow-[3px_3px_0px_#000]">
                  Fun
                </span>
                <span className="px-4 py-2 bg-purple-400 border-4 border-black text-black text-sm font-black uppercase shadow-[3px_3px_0px_#000]">
                  Bold
                </span>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-sm font-black text-black uppercase mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="w-10 h-10 bg-red-500 rounded-full border-4 border-black flex items-center justify-center text-white font-black text-sm">
                  5
                </span>
                <span className="px-3 h-8 bg-yellow-400 border-4 border-black flex items-center justify-center text-black font-black text-xs uppercase">
                  NEW
                </span>
                <span className="px-3 h-8 bg-green-400 border-4 border-black flex items-center justify-center text-black font-black text-xs uppercase">
                  PRO
                </span>
                <span className="w-10 h-10 bg-white border-4 border-black flex items-center justify-center text-black font-black text-sm">
                  99
                </span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="TOGGLES"
        subtitle="Switch it up"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-yellow-300 border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full border-2 border-black" />
            <div className="space-y-5">
              {[
                { label: "BOLD MODE", index: 0 },
                { label: "FUN MODE", index: 1 },
                { label: "COLOR MODE", index: 2 },
              ].map((item) => (
                <div key={item.index} className="flex items-center justify-between">
                  <span className="text-black font-black uppercase">{item.label}</span>
                  <button
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[item.index] = !newStates[item.index];
                      setToggleStates(newStates);
                    }}
                    className={`relative w-16 h-8 border-4 border-black transition-all ${
                      toggleStates[item.index] ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  >
                    <span
                      className={`absolute top-0 w-6 h-6 bg-white border-r-4 border-black transition-all ${
                        toggleStates[item.index] ? 'left-8' : 'left-0'
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
        title="ACCORDION"
        subtitle="Expand your knowledge"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {accordionItems.map((item, index) => (
              <div 
                key={index}
                className={`border-4 border-black transition-all ${
                  openAccordion === index 
                    ? 'bg-pink-300 shadow-[6px_6px_0px_#000]' 
                    : 'bg-white shadow-[4px_4px_0px_#000]'
                }`}
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-black text-black uppercase">{item.title}</span>
                  {openAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-black" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-black" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 pb-4 text-black/70 font-medium">
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
        title="FORM"
        subtitle="Input components"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black" />
            <div className="absolute -bottom-3 -left-3 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-pink-400 border-r-[20px] border-r-transparent" />

            <h3 className="text-xl font-black text-black uppercase mb-6 text-center">JOIN US!</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-black text-black uppercase mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-yellow-100 border-4 border-black text-black font-bold placeholder-gray-400 focus:shadow-[4px_4px_0px_#48dbfb] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-black uppercase mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-pink-100 border-4 border-black text-black font-bold placeholder-gray-400 focus:shadow-[4px_4px_0px_#ff6b6b] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-black text-black uppercase mb-2">Message</label>
                <textarea
                  rows={3}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-cyan-100 border-4 border-black text-black font-bold placeholder-gray-400 focus:shadow-[4px_4px_0px_#1dd1a1] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-4 bg-green-400 border-4 border-black text-black font-black uppercase shadow-[6px_6px_0px_#000] hover:shadow-[3px_3px_0px_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Avatars */}
      <ShowcaseSection
        title="AVATARS"
        subtitle="Express yourself"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center"
        subtitleClassName="text-black/60 mb-10 text-center font-bold"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 bg-cyan-300 border-4 border-black shadow-[8px_8px_0px_#000]">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full border-2 border-black" />
            <div className="flex flex-wrap items-end justify-center gap-6">
              {/* Small */}
              <div className="text-center">
                <div className="w-10 h-10 bg-pink-400 border-4 border-black flex items-center justify-center text-black font-black text-sm mb-2">
                  A
                </div>
                <span className="text-xs font-bold text-black uppercase">Small</span>
              </div>
              {/* Medium */}
              <div className="text-center">
                <div className="w-14 h-14 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center text-black font-black text-lg mb-2">
                  BF
                </div>
                <span className="text-xs font-bold text-black uppercase">Medium</span>
              </div>
              {/* Large */}
              <div className="text-center">
                <div className="w-20 h-20 bg-green-400 border-4 border-black flex items-center justify-center text-black font-black text-2xl mb-2">
                  XO
                </div>
                <span className="text-xs font-bold text-black uppercase">Large</span>
              </div>
              {/* Group */}
              <div className="text-center">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 bg-red-400 rounded-full border-4 border-black flex items-center justify-center text-black font-black">A</div>
                  <div className="w-12 h-12 bg-blue-400 rounded-full border-4 border-black flex items-center justify-center text-black font-black">B</div>
                  <div className="w-12 h-12 bg-purple-400 rounded-full border-4 border-black flex items-center justify-center text-black font-black">+3</div>
                </div>
                <span className="text-xs font-bold text-black uppercase mt-2 block">Group</span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 bg-yellow-400 border-t-4 border-black">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-black" />
            <span className="text-xl font-black text-black uppercase tracking-wider">MEMPHIS</span>
            <div className="w-5 h-5 bg-cyan-400 border-2 border-black rotate-45" />
          </div>
          <p className="text-black font-bold text-sm mb-2">
            Part of the{" "}
            <Link href="/" className="underline hover:text-red-600 transition-colors">
              StyleKit
            </Link>{" "}
            Design System Collection
          </p>
          <p className="text-black/60 font-bold text-xs uppercase">
            Design Should Be Fun!
          </p>
        </div>
      </footer>
    </div>
  );
}
