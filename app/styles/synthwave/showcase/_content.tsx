"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Sun, Mountain, Zap, Car, Music, Radio, Disc, 
  ChevronDown, ChevronUp, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Clock, Star
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Magenta", hex: "#ff00ff", bg: "bg-[#ff00ff]" },
  { name: "Cyan", hex: "#00ffff", bg: "bg-[#00ffff]" },
  { name: "Purple", hex: "#7b68ee", bg: "bg-[#7b68ee]" },
  { name: "Hot Pink", hex: "#ff6ec7", bg: "bg-[#ff6ec7]" },
  { name: "Deep Pink", hex: "#ff1493", bg: "bg-[#ff1493]" },
  { name: "Electric Blue", hex: "#0080ff", bg: "bg-[#0080ff]" },
  { name: "Sunset Orange", hex: "#ff6b35", bg: "bg-[#ff6b35]" },
  { name: "Deep Purple", hex: "#1a0a2e", bg: "bg-[#1a0a2e]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const tabs = [
    { label: "Overview", icon: Sun },
    { label: "Tracks", icon: Music },
    { label: "Artists", icon: Users },
  ];

  const accordionItems = [
    {
      title: "What is Synthwave?",
      content: "Synthwave is a genre of electronic music that emerged in the mid-2000s, heavily influenced by 1980s film soundtracks, video games, and synth-pop music."
    },
    {
      title: "Design Philosophy",
      content: "The visual aesthetic embraces neon colors, chrome text effects, grid-based perspectives, sunset gradients, and retrofuturistic imagery."
    },
    {
      title: "Key Elements",
      content: "Essential elements include: neon pink/cyan/purple palette, perspective grid floors, setting sun motifs, mountain silhouettes, and glowing effects."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e] relative overflow-hidden">
      {/* Animated Sun */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500 via-pink-500 to-transparent rounded-t-full opacity-80 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-4 bg-gradient-to-t from-yellow-400 via-orange-500 to-transparent rounded-t-full opacity-60" />
        {/* Sun lines */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute left-0 right-0 h-[3px] bg-[#1a0a2e]"
            style={{ bottom: `${20 + i * 25}px` }}
          />
        ))}
      </div>

      {/* Animated Grid floor */}
      <div className="fixed bottom-0 left-0 right-0 h-[45%] pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.4)_1px,transparent_1px),linear-gradient(rgba(255,0,255,0.4)_1px,transparent_1px)] bg-[size:80px_40px] [transform:perspective(400px)_rotateX(65deg)] origin-bottom"
          style={{
            animation: 'gridMove 20s linear infinite',
          }}
        />
        <style jsx>{`
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 0 -400px; }
          }
        `}</style>
      </div>

      {/* Mountains silhouette */}
      <div className="fixed bottom-[18%] left-0 right-0 h-40 pointer-events-none">
        <svg viewBox="0 0 1400 200" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2d1b4e" />
              <stop offset="100%" stopColor="#1a0a2e" />
            </linearGradient>
          </defs>
          <polygon points="0,200 0,140 100,80 200,120 350,40 500,90 650,20 800,70 950,30 1100,80 1250,50 1400,100 1400,200" fill="url(#mountainGradient)" />
        </svg>
      </div>

      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-pink-500/30 backdrop-blur-sm bg-black/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/synthwave"
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-sm">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 uppercase tracking-[0.2em] animate-pulse" style={{ animationDuration: '3s' }}>
            SYNTHWAVE
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-pink-500/50 text-pink-400 font-bold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:bg-pink-500/20 hover:shadow-[0_0_25px_rgba(255,0,255,0.5)] hover:border-pink-400 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="SYNTHWAVE"
        description="Ride into the sunset - 80年代复古未来主义的霓虹梦境"
        className="relative z-10 pt-24 pb-20 px-6 text-center"
        titleClassName="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-300 via-pink-500 to-purple-700 mb-6 tracking-wider [text-shadow:0_0_80px_rgba(255,0,255,0.5)]"
        descriptionClassName="text-xl md:text-2xl text-pink-200/80 max-w-2xl mx-auto mb-12 tracking-wide"
      >
        <div className="flex flex-wrap justify-center gap-6">
          <button className="group px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-[length:200%_100%] text-white font-bold uppercase tracking-[0.15em] shadow-[0_0_40px_rgba(255,0,255,0.6)] hover:shadow-[0_0_60px_rgba(255,0,255,0.9)] hover:bg-right transition-all duration-500">
            <span className="flex items-center gap-3">
              <Car className="w-5 h-5" />
              Drive
            </span>
          </button>
          <button className="group px-12 py-5 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-[0.15em] shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] hover:bg-cyan-400/10 hover:shadow-[0_0_30px_rgba(0,255,255,0.6)] transition-all duration-300">
            <span className="flex items-center gap-3">
              <Radio className="w-5 h-5" />
              Explore
            </span>
          </button>
        </div>
      </ShowcaseHero>

      {/* Stats Section */}
      <ShowcaseSection
        title="数据统计"
        subtitle="Neon Stats"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Users, label: "Users", value: "12.8K", color: "pink" },
            { icon: TrendingUp, label: "Growth", value: "+89%", color: "cyan" },
            { icon: Clock, label: "Playtime", value: "2.4M hrs", color: "purple" },
            { icon: Star, label: "Rating", value: "4.9", color: "orange" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-6 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                stat.color === 'pink' ? 'border-pink-500/40 shadow-[0_0_30px_rgba(255,0,255,0.2)] hover:shadow-[0_0_40px_rgba(255,0,255,0.4)]' :
                stat.color === 'cyan' ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]' :
                stat.color === 'purple' ? 'border-purple-500/40 shadow-[0_0_30px_rgba(147,51,234,0.2)] hover:shadow-[0_0_40px_rgba(147,51,234,0.4)]' :
                'border-orange-500/40 shadow-[0_0_30px_rgba(255,107,53,0.2)] hover:shadow-[0_0_40px_rgba(255,107,53,0.4)]'
              }`}
            >
              <stat.icon className={`w-8 h-8 mb-3 ${
                stat.color === 'pink' ? 'text-pink-400' :
                stat.color === 'cyan' ? 'text-cyan-400' :
                stat.color === 'purple' ? 'text-purple-400' :
                'text-orange-400'
              }`} />
              <p className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-sm text-pink-300/60 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="配色系统"
        subtitle="Neon Palette"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-pink-500/30 bg-purple-900/50 backdrop-blur-sm shadow-[0_0_20px_rgba(255,0,255,0.2)] hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] transition-all duration-300"
            labelClassName="font-bold text-sm text-pink-300"
            hexClassName="text-xs text-cyan-400 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="按钮"
        subtitle="Neon Buttons"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Styles */}
          <div className="p-8 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
            <p className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_35px_rgba(255,0,255,0.8)] hover:scale-105 transition-all duration-300">
                Primary
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-pink-500 text-pink-400 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,255,0.3),inset_0_0_15px_rgba(255,0,255,0.1)] hover:bg-pink-500 hover:text-white hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] transition-all duration-300">
                Outline Pink
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all duration-300">
                Outline Cyan
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_35px_rgba(0,255,255,0.7)] hover:scale-105 transition-all duration-300">
                Gradient
              </button>
              <button className="px-6 py-3 bg-transparent text-pink-400 font-bold uppercase tracking-wider hover:text-pink-300 hover:tracking-[0.2em] transition-all duration-300">
                Ghost
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="p-8 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
            <p className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-6">Sizes</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.7)] transition-all">
                Small
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_30px_rgba(255,0,255,0.8)] transition-all">
                Medium
              </button>
              <button className="px-8 py-4 text-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(255,0,255,0.5)] hover:shadow-[0_0_40px_rgba(255,0,255,0.8)] transition-all">
                Large
              </button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="p-8 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
            <p className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-6">With Icons</p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.5)] hover:shadow-[0_0_30px_rgba(255,0,255,0.8)] transition-all">
                <Music className="w-5 h-5" />
                Play
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:bg-cyan-400/10 transition-all">
                <Disc className="w-5 h-5" />
                Records
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="卡片"
        subtitle="Retro Future Cards"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="group p-6 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.3)] hover:shadow-[0_0_50px_rgba(255,0,255,0.5)] hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(255,0,255,0.5)] group-hover:shadow-[0_0_35px_rgba(255,0,255,0.7)] transition-all">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">
              Sunset
            </h3>
            <p className="text-pink-200/70 mb-4">Chase the endless horizon as the sun dips below the grid.</p>
            <button className="text-sm text-pink-400 uppercase tracking-wider hover:text-pink-300 transition-colors">
              Learn More →
            </button>
          </div>

          <div className="group p-6 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.3)] hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(0,255,255,0.5)] group-hover:shadow-[0_0_35px_rgba(0,255,255,0.7)] transition-all">
              <Mountain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-2">
              Mountains
            </h3>
            <p className="text-cyan-200/70 mb-4">Distant silhouettes frame the neon-lit landscape.</p>
            <button className="text-sm text-cyan-400 uppercase tracking-wider hover:text-cyan-300 transition-colors">
              Learn More →
            </button>
          </div>

          <div className="group p-6 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-purple-500/30 shadow-[0_0_30px_rgba(185,103,255,0.3)] hover:shadow-[0_0_50px_rgba(185,103,255,0.5)] hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(185,103,255,0.5)] group-hover:shadow-[0_0_35px_rgba(185,103,255,0.7)] transition-all">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              Night Drive
            </h3>
            <p className="text-purple-200/70 mb-4">Cruise the endless night road to the rhythm of synthwave.</p>
            <button className="text-sm text-purple-400 uppercase tracking-wider hover:text-purple-300 transition-colors">
              Learn More →
            </button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="标签页"
        subtitle="Neon Tabs"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
            {/* Tab Headers */}
            <div className="flex border-b border-pink-500/30 mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                    activeTab === index
                      ? 'text-pink-400 border-b-2 border-pink-500 shadow-[0_4px_15px_rgba(255,0,255,0.4)]'
                      : 'text-pink-300/50 hover:text-pink-300'
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
                <div className="text-pink-200/80">
                  <h4 className="text-lg font-bold text-pink-400 mb-2">Welcome to Synthwave</h4>
                  <p>Experience the nostalgic future through neon-lit interfaces and retro aesthetics.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div className="text-pink-200/80">
                  <h4 className="text-lg font-bold text-cyan-400 mb-2">Featured Tracks</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2"><Music className="w-4 h-4 text-pink-400" /> Midnight Drive</li>
                    <li className="flex items-center gap-2"><Music className="w-4 h-4 text-cyan-400" /> Neon Dreams</li>
                    <li className="flex items-center gap-2"><Music className="w-4 h-4 text-purple-400" /> Electric Sunset</li>
                  </ul>
                </div>
              )}
              {activeTab === 2 && (
                <div className="text-pink-200/80">
                  <h4 className="text-lg font-bold text-purple-400 mb-2">Top Artists</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Kavinsky', 'Perturbator', 'Carpenter Brut', 'FM-84'].map((artist) => (
                      <span key={artist} className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-sm">
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="提示"
        subtitle="Neon Alerts"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-start gap-4 p-4 bg-emerald-500/10 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <div className="w-10 h-10 bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-sm mb-1">Success</h4>
              <p className="text-emerald-200/80 text-sm">Your track has been uploaded to the mainframe successfully.</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-4 p-4 bg-amber-500/10 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-amber-400 uppercase tracking-wider text-sm mb-1">Warning</h4>
              <p className="text-amber-200/80 text-sm">System resources running low. Consider clearing the cache.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <div className="w-10 h-10 bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <X className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h4 className="font-bold text-red-400 uppercase tracking-wider text-sm mb-1">Error</h4>
              <p className="text-red-200/80 text-sm">Connection to the neon grid has been interrupted.</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start gap-4 p-4 bg-cyan-500/10 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
            <div className="w-10 h-10 bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-sm mb-1">Info</h4>
              <p className="text-cyan-200/80 text-sm">New synthwave tracks have been added to the library.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="进度条"
        subtitle="Neon Progress"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
            <div className="space-y-8">
              {/* Pink Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-pink-400 uppercase tracking-wider">Upload Progress</span>
                  <span className="text-sm text-pink-300">{progress}%</span>
                </div>
                <div className="h-3 bg-black/50 border border-pink-500/30 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_15px_rgba(255,0,255,0.6)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Cyan Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">System Status</span>
                  <span className="text-sm text-cyan-300">78%</span>
                </div>
                <div className="h-3 bg-black/50 border border-cyan-500/30 overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(0,255,255,0.6)]" />
                </div>
              </div>

              {/* Purple Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-purple-400 uppercase tracking-wider">Download</span>
                  <span className="text-sm text-purple-300">42%</span>
                </div>
                <div className="h-3 bg-black/50 border border-purple-500/30 overflow-hidden">
                  <div className="h-full w-[42%] bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_15px_rgba(147,51,234,0.6)]" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-4 py-2 text-sm border border-pink-500/50 text-pink-400 hover:bg-pink-500/20 transition-all"
                >
                  -10%
                </button>
                <button 
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-4 py-2 text-sm border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                >
                  +10%
                </button>
                <button 
                  onClick={() => setProgress(0)}
                  className="px-4 py-2 text-sm border border-purple-500/50 text-purple-400 hover:bg-purple-500/20 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Badges & Tags */}
      <ShowcaseSection
        title="标签与徽章"
        subtitle="Neon Tags"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
            {/* Tags */}
            <div className="mb-8">
              <p className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-4">Tags</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-pink-500/20 border border-pink-500/50 text-pink-300 text-sm font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,255,0.3)]">
                  Synthwave
                </span>
                <span className="px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-sm font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                  Retrowave
                </span>
                <span className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/50 text-purple-300 text-sm font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                  Outrun
                </span>
                <span className="px-4 py-1.5 bg-orange-500/20 border border-orange-500/50 text-orange-300 text-sm font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,107,53,0.3)]">
                  80s
                </span>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-pink-500 text-white text-sm font-bold shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                  3
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-cyan-500 text-black text-sm font-bold shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  NEW
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-bold shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                  HOT
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-cyan-400 text-cyan-400 text-sm font-bold shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                  99
                </span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle / Switch */}
      <ShowcaseSection
        title="开关"
        subtitle="Neon Toggles"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
            <div className="space-y-6">
              {[
                { label: "Neon Mode", index: 0, color: "pink" },
                { label: "Grid Lines", index: 1, color: "cyan" },
                { label: "Scanlines", index: 2, color: "purple" },
              ].map((item) => (
                <div key={item.index} className="flex items-center justify-between">
                  <span className="text-pink-200 font-medium">{item.label}</span>
                  <button
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[item.index] = !newStates[item.index];
                      setToggleStates(newStates);
                    }}
                    className={`relative w-14 h-8 border-2 transition-all duration-300 ${
                      toggleStates[item.index]
                        ? item.color === 'pink' 
                          ? 'bg-pink-500/30 border-pink-500 shadow-[0_0_15px_rgba(255,0,255,0.5)]'
                          : item.color === 'cyan'
                          ? 'bg-cyan-500/30 border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.5)]'
                          : 'bg-purple-500/30 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]'
                        : 'bg-black/50 border-pink-500/30'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-5 h-5 transition-all duration-300 ${
                        toggleStates[item.index]
                          ? item.color === 'pink'
                            ? 'left-7 bg-pink-500 shadow-[0_0_10px_rgba(255,0,255,0.8)]'
                            : item.color === 'cyan'
                            ? 'left-7 bg-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.8)]'
                            : 'left-7 bg-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.8)]'
                          : 'left-1 bg-pink-500/50'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="表单"
        subtitle="Neon Forms"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_40px_rgba(255,0,255,0.3)]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(255,0,255,0.6)] mb-4 animate-pulse" style={{ animationDuration: '3s' }}>
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Connect to Grid</h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-pink-400 uppercase tracking-wider mb-2">Username</label>
                <input
                  type="text"
                  placeholder="Enter your handle..."
                  className="w-full px-4 py-3 bg-black/50 border-2 border-pink-500/50 text-pink-100 placeholder-pink-500/40 shadow-[inset_0_0_10px_rgba(255,0,255,0.1)] focus:border-pink-500 focus:shadow-[0_0_20px_rgba(255,0,255,0.3),inset_0_0_15px_rgba(255,0,255,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-3 bg-black/50 border-2 border-cyan-500/50 text-cyan-100 placeholder-cyan-500/40 shadow-[inset_0_0_10px_rgba(0,255,255,0.1)] focus:border-cyan-500 focus:shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_15px_rgba(0,255,255,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={3}
                  placeholder="Enter your message..."
                  className="w-full px-4 py-3 bg-black/50 border-2 border-purple-500/50 text-purple-100 placeholder-purple-500/40 shadow-[inset_0_0_10px_rgba(147,51,234,0.1)] focus:border-purple-500 focus:shadow-[0_0_20px_rgba(147,51,234,0.3),inset_0_0_15px_rgba(147,51,234,0.2)] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] text-white font-bold uppercase tracking-[0.15em] shadow-[0_0_25px_rgba(255,0,255,0.5)] hover:shadow-[0_0_40px_rgba(255,0,255,0.8)] hover:bg-right transition-all duration-500">
                Transmit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Table */}
      <ShowcaseSection
        title="表格"
        subtitle="Data Grid"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <div className="p-6 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-pink-500/30">
                  <th className="text-left py-3 px-4 text-pink-400 font-bold uppercase tracking-wider text-sm">Track</th>
                  <th className="text-left py-3 px-4 text-pink-400 font-bold uppercase tracking-wider text-sm">Artist</th>
                  <th className="text-left py-3 px-4 text-pink-400 font-bold uppercase tracking-wider text-sm">Duration</th>
                  <th className="text-left py-3 px-4 text-pink-400 font-bold uppercase tracking-wider text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { track: "Nightcall", artist: "Kavinsky", duration: "4:17", status: "playing" },
                  { track: "Tech Noir", artist: "Gunship", duration: "5:43", status: "queued" },
                  { track: "Turbo Killer", artist: "Carpenter Brut", duration: "4:56", status: "queued" },
                  { track: "Running in the Night", artist: "FM-84", duration: "3:48", status: "completed" },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-pink-500/20 hover:bg-pink-500/10 transition-colors">
                    <td className="py-3 px-4 text-pink-200">{row.track}</td>
                    <td className="py-3 px-4 text-cyan-300">{row.artist}</td>
                    <td className="py-3 px-4 text-purple-300 font-mono">{row.duration}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider ${
                        row.status === 'playing' 
                          ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50 shadow-[0_0_10px_rgba(255,0,255,0.3)]'
                          : row.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="手风琴"
        subtitle="Collapsible Content"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {accordionItems.map((item, index) => (
              <div 
                key={index}
                className={`border transition-all duration-300 ${
                  openAccordion === index 
                    ? 'border-pink-500/50 shadow-[0_0_20px_rgba(255,0,255,0.3)]' 
                    : 'border-pink-500/20'
                } bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm`}
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-bold text-pink-300">{item.title}</span>
                  {openAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-pink-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-pink-400/50" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 pb-4 text-pink-200/70">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Avatar */}
      <ShowcaseSection
        title="头像"
        subtitle="User Profiles"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/60 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/60 to-black/60 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
            <div className="flex flex-wrap items-end justify-center gap-6">
              {/* Small */}
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(255,0,255,0.5)] mb-2">
                  K
                </div>
                <span className="text-xs text-pink-300/60">Small</span>
              </div>
              {/* Medium */}
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(0,255,255,0.5)] mb-2">
                  PB
                </div>
                <span className="text-xs text-cyan-300/60">Medium</span>
              </div>
              {/* Large */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_25px_rgba(147,51,234,0.5)] mb-2">
                  CB
                </div>
                <span className="text-xs text-purple-300/60">Large</span>
              </div>
              {/* With border */}
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-pink-500 bg-black/50 flex items-center justify-center text-pink-400 font-bold text-xl shadow-[0_0_20px_rgba(255,0,255,0.4)] mb-2">
                  FM
                </div>
                <span className="text-xs text-pink-300/60">Outlined</span>
              </div>
              {/* Group */}
              <div className="text-center">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold border-2 border-[#1a0a2e] shadow-[0_0_10px_rgba(255,0,255,0.4)]">A</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold border-2 border-[#1a0a2e] shadow-[0_0_10px_rgba(0,255,255,0.4)]">B</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold border-2 border-[#1a0a2e] shadow-[0_0_10px_rgba(147,51,234,0.4)]">+5</div>
                </div>
                <span className="text-xs text-pink-300/60 mt-2 block">Group</span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-pink-500/30 backdrop-blur-sm bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 uppercase tracking-[0.3em]">
              SYNTHWAVE
            </span>
          </div>
          <p className="text-pink-300/60 text-sm mb-4">
            Part of the{" "}
            <Link href="/" className="text-pink-400 hover:text-pink-300 transition-colors font-bold">
              StyleKit
            </Link>{" "}
            Design System Collection
          </p>
          <p className="text-pink-400/40 text-xs uppercase tracking-wider">
            Ride into the sunset
          </p>
        </div>
      </footer>
    </div>
  );
}
