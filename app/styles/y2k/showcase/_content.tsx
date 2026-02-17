"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Sparkles, Star, Heart, Zap, Globe, Music, Camera,
  ChevronDown, ChevronUp, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, MessageCircle
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Silver", hex: "#c0c0c0", bg: "bg-[#c0c0c0]" },
  { name: "Hot Pink", hex: "#ff69b4", bg: "bg-[#ff69b4]" },
  { name: "Cyan", hex: "#00ffff", bg: "bg-[#00ffff]" },
  { name: "Magenta", hex: "#ff00ff", bg: "bg-[#ff00ff]" },
  { name: "Sky Blue", hex: "#87ceeb", bg: "bg-[#87ceeb]" },
  { name: "Lavender", hex: "#e6e6fa", bg: "bg-[#e6e6fa]" },
  { name: "Lime", hex: "#32cd32", bg: "bg-[#32cd32]" },
  { name: "Chrome", hex: "#dcdcdc", bg: "bg-[#dcdcdc]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(68);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Music", icon: Music },
    { label: "Photos", icon: Camera },
    { label: "Friends", icon: Users },
  ];

  const accordionItems = [
    { title: "What is Y2K aesthetic?", content: "Y2K aesthetic celebrates the optimistic vision of the future from the late 1990s and early 2000s, featuring chrome, iridescent colors, and futuristic shapes." },
    { title: "Design elements", content: "Key elements include metallic gradients, bubble shapes, rainbow holographics, glossy textures, and space-age typography." },
    { title: "Color palette", content: "The palette features silver chrome, hot pink, electric blue, lime green, and iridescent rainbow effects." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-cyan-100 relative overflow-hidden">
      {/* Animated floating bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-pink-300/40 to-purple-300/20 blur-2xl animate-[float_15s_ease-in-out_infinite]" />
        <div className="absolute top-40 right-[15%] w-56 h-56 rounded-full bg-gradient-to-br from-cyan-300/40 to-blue-300/20 blur-2xl animate-[float_20s_ease-in-out_infinite_2s]" />
        <div className="absolute bottom-32 left-[20%] w-32 h-32 rounded-full bg-gradient-to-br from-purple-300/40 to-pink-300/20 blur-2xl animate-[float_18s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 right-[8%] w-24 h-24 rounded-full bg-gradient-to-br from-lime-300/30 to-cyan-300/20 blur-xl animate-[float_12s_ease-in-out_infinite_3s]" />
        {/* Star decorations */}
        <Star className="absolute top-32 left-[30%] w-6 h-6 text-pink-300/50 animate-pulse" />
        <Star className="absolute top-48 right-[25%] w-4 h-4 text-cyan-300/50 animate-pulse" style={{ animationDelay: '1s' }} />
        <Star className="absolute bottom-40 left-[40%] w-5 h-5 text-purple-300/50 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-md border-b border-white/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/y2k"
            className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Docs</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
              Y2K
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full text-white text-sm font-medium shadow-[0_4px_15px_rgba(255,105,180,0.3)] hover:shadow-[0_6px_20px_rgba(255,105,180,0.4)] hover:scale-105 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative stars */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-6 h-6 text-pink-400 animate-pulse" />
            <Heart className="w-5 h-5 text-purple-400" />
            <Star className="w-6 h-6 text-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6 tracking-tight">
            Y2K
          </h1>
          <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 font-medium tracking-[0.2em] uppercase mb-4">
            Aesthetic
          </p>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
            The future is bright and shiny - millennium dreams in chrome and rainbow
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="group px-10 py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-[length:200%_100%] rounded-full text-white font-bold shadow-[0_4px_25px_rgba(255,105,180,0.4)] hover:shadow-[0_8px_35px_rgba(255,105,180,0.6)] hover:bg-right transition-all duration-500">
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Enter the Future
              </span>
            </button>
            <button className="px-10 py-4 bg-gradient-to-b from-gray-100 via-white to-gray-200 rounded-full text-gray-700 font-bold border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Explore
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Stats"
        subtitle="Futuristic metrics display"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Users, label: "Friends", value: "2,847", color: "from-pink-400 to-purple-400" },
            { icon: TrendingUp, label: "Vibes", value: "+420%", color: "from-purple-400 to-cyan-400" },
            { icon: Eye, label: "Views", value: "1.2M", color: "from-cyan-400 to-lime-400" },
            { icon: MessageCircle, label: "Messages", value: "8,921", color: "from-lime-400 to-pink-400" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group p-5 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(255,105,180,0.15)] transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Rainbow gradients & chrome"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-sm border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(255,105,180,0.15)] transition-all duration-300"
            labelClassName="font-bold text-sm text-gray-700"
            hexClassName="text-xs text-pink-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Chrome shine & rainbow gradients"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Variants */}
          <div className="p-8 bg-gradient-to-br from-white/70 to-pink-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <p className="text-sm font-bold text-pink-500 uppercase tracking-wide mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-7 py-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-[length:200%_100%] rounded-full text-white font-bold shadow-[0_4px_20px_rgba(255,105,180,0.4)] hover:bg-right hover:scale-105 transition-all duration-500">
                Rainbow
              </button>
              <button className="px-7 py-3 bg-gradient-to-b from-gray-100 via-white to-gray-200 rounded-full text-gray-700 font-bold border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:scale-105 transition-all">
                Chrome
              </button>
              <button className="px-7 py-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full text-white font-bold shadow-[0_4px_15px_rgba(255,105,180,0.4)] hover:scale-105 transition-all">
                Pink
              </button>
              <button className="px-7 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full text-white font-bold shadow-[0_4px_15px_rgba(0,255,255,0.4)] hover:scale-105 transition-all">
                Cyan
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="p-8 bg-gradient-to-br from-white/70 to-cyan-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <p className="text-sm font-bold text-cyan-500 uppercase tracking-wide mb-6">Sizes</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-5 py-2 text-sm bg-gradient-to-r from-pink-400 to-purple-400 rounded-full text-white font-bold shadow-[0_3px_12px_rgba(255,105,180,0.3)] hover:scale-105 transition-all">
                Small
              </button>
              <button className="px-7 py-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full text-white font-bold shadow-[0_4px_15px_rgba(255,105,180,0.4)] hover:scale-105 transition-all">
                Medium
              </button>
              <button className="px-9 py-4 text-lg bg-gradient-to-r from-pink-400 to-purple-400 rounded-full text-white font-bold shadow-[0_5px_20px_rgba(255,105,180,0.4)] hover:scale-105 transition-all">
                Large
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Bubble glass effects"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: "Sparkle", desc: "Shiny and bright effects", gradient: "from-pink-400 to-purple-400", bg: "to-pink-100/40" },
            { icon: Star, title: "Star", desc: "Futuristic space vibes", gradient: "from-cyan-400 to-purple-400", bg: "to-cyan-100/40" },
            { icon: Heart, title: "Love", desc: "Sweet millennium dreams", gradient: "from-purple-400 to-pink-400", bg: "to-purple-100/40" },
          ].map((card, index) => (
            <div key={index} className={`group p-6 bg-gradient-to-br from-white/70 ${card.bg} backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(255,105,180,0.2)] hover:-translate-y-1 transition-all duration-300`}>
              <div className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient} mb-2`}>
                {card.title}
              </h3>
              <p className="text-gray-600 mb-4">{card.desc}</p>
              <button className="text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors">
                Learn more
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Navigate your digital world"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-gradient-to-br from-white/70 to-purple-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            {/* Tab Headers */}
            <div className="flex gap-2 p-1.5 bg-white/50 rounded-full mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-white/60'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="min-h-[120px] p-5 bg-white/40 rounded-2xl">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-3">Your Playlist</h4>
                  <div className="flex gap-3">
                    {['Pop Hits', 'Dance Mix', 'Chill Vibes'].map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-sm text-purple-600 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-3">Photo Albums</h4>
                  <p className="text-gray-600">128 photos in 5 albums. Last upload: today!</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-3">Friend List</h4>
                  <p className="text-gray-600">You have 2,847 friends online. 42 new requests!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Cute notifications"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-lime-100/80 to-cyan-100/60 backdrop-blur-sm rounded-2xl border border-lime-200/60 shadow-[0_4px_20px_rgba(50,205,50,0.15)]">
            <div className="w-10 h-10 bg-gradient-to-r from-lime-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-md">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-lime-700">Yay! Success!</p>
              <p className="text-lime-600/80 text-sm">Your profile has been updated successfully!</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-100/80 to-orange-100/60 backdrop-blur-sm rounded-2xl border border-amber-200/60 shadow-[0_4px_20px_rgba(255,193,7,0.15)]">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl flex items-center justify-center shadow-md">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-amber-700">Heads up!</p>
              <p className="text-amber-600/80 text-sm">Your subscription will expire in 3 days.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-100/80 to-red-100/60 backdrop-blur-sm rounded-2xl border border-pink-200/60 shadow-[0_4px_20px_rgba(255,105,180,0.15)]">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-400 rounded-xl flex items-center justify-center shadow-md">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-pink-700">Oops!</p>
              <p className="text-pink-600/80 text-sm">Something went wrong. Please try again.</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-100/80 to-blue-100/60 backdrop-blur-sm rounded-2xl border border-cyan-200/60 shadow-[0_4px_20px_rgba(0,255,255,0.15)]">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center shadow-md">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-cyan-700">FYI!</p>
              <p className="text-cyan-600/80 text-sm">New features are available. Check them out!</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress"
        subtitle="Level up your stats"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-white/70 to-pink-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="space-y-8">
              {/* Rainbow Progress */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Profile Complete</span>
                  <span className="text-sm font-bold text-purple-500">{progress}%</span>
                </div>
                <div className="h-4 bg-white/60 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-full shadow-lg transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Pink Progress */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-bold text-pink-500">Popularity</span>
                  <span className="text-sm font-bold text-pink-500">85%</span>
                </div>
                <div className="h-4 bg-white/60 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full w-[85%] bg-gradient-to-r from-pink-400 to-pink-500 rounded-full shadow-lg" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-5 py-2 text-sm bg-gradient-to-r from-pink-400 to-purple-400 rounded-full text-white font-bold shadow-md hover:scale-105 transition-all"
                >
                  -10%
                </button>
                <button 
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-5 py-2 text-sm bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full text-white font-bold shadow-md hover:scale-105 transition-all"
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
        subtitle="Show off your style"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-white/70 to-cyan-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            {/* Tags */}
            <div className="mb-8">
              <p className="text-sm font-bold text-cyan-500 uppercase tracking-wide mb-4">Tags</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full text-pink-600 text-sm font-medium border border-pink-200/60">
                  Trendy
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-full text-cyan-600 text-sm font-medium border border-cyan-200/60">
                  Cool
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full text-purple-600 text-sm font-medium border border-purple-200/60">
                  Retro
                </span>
                <span className="px-4 py-1.5 bg-gradient-to-r from-lime-100 to-lime-200 rounded-full text-lime-600 text-sm font-medium border border-lime-200/60">
                  Fresh
                </span>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-sm font-bold text-purple-500 uppercase tracking-wide mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  5
                </span>
                <span className="px-4 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase tracking-wide shadow-lg">
                  New
                </span>
                <span className="px-4 h-8 bg-gradient-to-r from-lime-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase tracking-wide shadow-lg">
                  VIP
                </span>
                <span className="w-10 h-10 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm border border-white/60 shadow-[inset_0_2px_3px_rgba(255,255,255,0.8)]">
                  99
                </span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggles"
        subtitle="Switch your vibes"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-white/70 to-purple-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="space-y-5">
              {[
                { label: "Party Mode", index: 0 },
                { label: "Dark Theme", index: 1 },
                { label: "Notifications", index: 2 },
              ].map((item) => (
                <div key={item.index} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <button
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[item.index] = !newStates[item.index];
                      setToggleStates(newStates);
                    }}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      toggleStates[item.index]
                        ? 'bg-gradient-to-r from-pink-400 to-purple-400 shadow-[0_0_15px_rgba(255,105,180,0.4)]'
                        : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                        toggleStates[item.index] ? 'left-7' : 'left-1'
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
        subtitle="Expand your knowledge"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {accordionItems.map((item, index) => (
              <div 
                key={index}
                className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  openAccordion === index 
                    ? 'bg-gradient-to-br from-white/80 to-pink-100/60 shadow-[0_8px_30px_rgba(255,105,180,0.15)]' 
                    : 'bg-gradient-to-br from-white/60 to-white/40'
                } backdrop-blur-md border border-white/60`}
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">{item.title}</span>
                  {openAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-pink-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 pb-5 text-gray-600">
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
        subtitle="Join the millennium club"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-white/70 to-pink-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-5 h-5 text-pink-400" />
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Sign Up</h3>
              <Star className="w-5 h-5 text-cyan-400" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
                <input
                  type="text"
                  placeholder="coolkid2000"
                  className="w-full px-4 py-3 bg-white/60 border border-pink-200/60 rounded-xl text-gray-700 placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@millennium.com"
                  className="w-full px-4 py-3 bg-white/60 border border-cyan-200/60 rounded-xl text-gray-700 placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 focus:outline-none transition-all"
                />
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-xl text-white font-bold shadow-[0_4px_20px_rgba(255,105,180,0.4)] hover:shadow-[0_6px_30px_rgba(255,105,180,0.5)] hover:scale-[1.02] transition-all duration-300">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Avatars */}
      <ShowcaseSection
        title="Avatars"
        subtitle="Express yourself"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-white/70 to-cyan-100/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
            <div className="flex flex-wrap items-end justify-center gap-6">
              {/* Small */}
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mb-2">
                  A
                </div>
                <span className="text-xs text-gray-500">Small</span>
              </div>
              {/* Medium */}
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg mb-2">
                  BF
                </div>
                <span className="text-xs text-gray-500">Medium</span>
              </div>
              {/* Large */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-2">
                  XO
                </div>
                <span className="text-xs text-gray-500">Large</span>
              </div>
              {/* Chrome */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-b from-gray-100 via-white to-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl border border-white/60 shadow-[0_4px_15px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.9)] mb-2">
                  Y2
                </div>
                <span className="text-xs text-gray-500">Chrome</span>
              </div>
              {/* Group */}
              <div className="text-center">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md">A</div>
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md">B</div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md">+5</div>
                </div>
                <span className="text-xs text-gray-500 mt-2 block">Group</span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 bg-gradient-to-b from-transparent to-white/60">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
              Y2K
            </span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-gray-500 text-sm mb-2">
            Part of the{" "}
            <Link href="/" className="text-pink-500 hover:text-pink-600 transition-colors font-medium">
              StyleKit
            </Link>{" "}
            Design System Collection
          </p>
          <p className="text-gray-400 text-xs">
            The Future is Bright and Shiny
          </p>
        </div>
      </footer>
    </div>
  );
}
