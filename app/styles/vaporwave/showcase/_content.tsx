"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Music, Disc, Radio, Tv, Play, Pause, SkipForward, SkipBack,
  Volume2, Heart, Download, Share2, ChevronDown, ChevronUp, Check, X,
  AlertTriangle, Info, Palmtree, Sunset, ShoppingBag, Star, Eye
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Pink", hex: "#ff71ce", bg: "bg-[#ff71ce]" },
  { name: "Cyan", hex: "#01cdfe", bg: "bg-[#01cdfe]" },
  { name: "Purple", hex: "#b967ff", bg: "bg-[#b967ff]" },
  { name: "Mint", hex: "#05ffa1", bg: "bg-[#05ffa1]" },
  { name: "Lavender", hex: "#c4b7eb", bg: "bg-[#c4b7eb]" },
  { name: "Coral", hex: "#ff6b9d", bg: "bg-[#ff6b9d]" },
  { name: "Soft Pink", hex: "#ffc0cb", bg: "bg-[#ffc0cb]" },
  { name: "Deep Purple", hex: "#2d1f3d", bg: "bg-[#2d1f3d]" },
];

export default function ShowcaseContent() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(68);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  
  const tracks = [
    { name: "Macintosh Plus", artist: "Floral Shoppe", duration: "4:23" },
    { name: "Saint Pepsi", artist: "Hit Vibes", duration: "3:47" },
    { name: "Blank Banshee", artist: "0", duration: "5:12" },
  ];

  const tabs = [
    { label: "アルバム", icon: Disc },
    { label: "プレイリスト", icon: Music },
    { label: "アーティスト", icon: Star },
  ];

  const accordionItems = [
    {
      title: "ヴェイパーウェイブとは？",
      content: "Vaporwave is a microgenre of electronic music and visual art that emerged in the early 2010s, characterized by its nostalgic and surrealist engagement with 1980s and 1990s culture."
    },
    {
      title: "美学 (Aesthetics)",
      content: "The aesthetic features pastel colors, Japanese text, Roman busts, dolphins, palm trees, and imagery from early computer interfaces and corporate graphics."
    },
    {
      title: "音楽的特徴",
      content: "Musically, vaporwave samples smooth jazz, elevator music, R&B, and lounge music, often slowed down and manipulated to create a dreamlike atmosphere."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d1f3d] via-[#4a2c4a] to-[#2d1f3d] relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,113,206,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,113,206,0.08)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,103,255,0.15)_0%,transparent_70%)]" />
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 opacity-20 pointer-events-none">
        <Palmtree className="w-32 h-32 text-pink-400" />
      </div>
      <div className="fixed top-40 right-20 opacity-15 pointer-events-none">
        <div className="text-6xl">MOAI</div>
      </div>
      <div className="fixed bottom-40 left-20 opacity-15 pointer-events-none">
        <div className="text-5xl">DOLPHIN</div>
      </div>

      {/* VHS Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-50">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-pink-400/20 backdrop-blur-sm bg-purple-900/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/vaporwave"
            className="flex items-center gap-2 text-pink-300 hover:text-pink-200 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Docs</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-pink-300/60 text-sm">現在地:</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
              ＶＡＰＯＲＷＡＶＥ
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 border border-pink-400/30 text-pink-300 text-sm hover:bg-pink-400/10 hover:border-pink-400/50 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section with Glitch Effect */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Japanese subtitle */}
          <p className="text-pink-300/60 text-sm tracking-[0.5em] mb-4 uppercase">アエステティック・ドリーム</p>
          
          {/* Glitch Title */}
          <div className="relative mb-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 tracking-[0.1em]">
              ＶＡＰＯＲ
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 tracking-[0.1em] -mt-2">
              ＷＡＶＥ
            </h1>
            {/* Glitch shadows */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-cyan-400 tracking-[0.1em] translate-x-1">
                ＶＡＰＯＲ
              </h1>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-pink-200/70 max-w-2xl mx-auto mb-12">
            永遠の夢 - Eternal dreams in pastel paradise
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="group px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] text-white font-bold tracking-wider shadow-[0_0_30px_rgba(255,113,206,0.4),0_0_60px_rgba(1,205,254,0.2)] hover:shadow-[0_0_40px_rgba(255,113,206,0.6),0_0_80px_rgba(1,205,254,0.4)] hover:bg-right transition-all duration-500">
              <span className="flex items-center gap-2">
                <Sunset className="w-5 h-5" />
                Enter the Dream
              </span>
            </button>
            <button className="px-10 py-4 border-2 border-cyan-400/50 text-cyan-300 font-bold tracking-wider shadow-[0_0_15px_rgba(1,205,254,0.2),inset_0_0_20px_rgba(1,205,254,0.1)] hover:bg-cyan-400/10 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(1,205,254,0.4)] transition-all duration-300">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Explore
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ShowcaseSection
        title="統計"
        subtitle="Statistics"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Eye, label: "Views", value: "2.4M", japanese: "閲覧数" },
            { icon: Heart, label: "Likes", value: "89K", japanese: "いいね" },
            { icon: Download, label: "Downloads", value: "34K", japanese: "ダウンロード" },
            { icon: Share2, label: "Shares", value: "12K", japanese: "共有" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-pink-400/20 hover:border-pink-400/40 shadow-[0_0_20px_rgba(255,113,206,0.1)] hover:shadow-[0_0_30px_rgba(255,113,206,0.2)] transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-pink-400/60 group-hover:text-pink-400 mb-3 transition-colors" />
              <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-pink-300/40">{stat.japanese}</p>
              <p className="text-sm text-pink-300/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="配色"
        subtitle="Color Palette"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-pink-400/20 bg-purple-900/30 backdrop-blur-sm shadow-[0_0_15px_rgba(255,113,206,0.1)] hover:shadow-[0_0_25px_rgba(255,113,206,0.2)] transition-all duration-300"
            labelClassName="font-bold text-sm text-pink-200"
            hexClassName="text-xs text-cyan-300/70 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="ボタン"
        subtitle="Buttons"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Variants */}
          <div className="p-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-pink-400/20 shadow-[0_0_30px_rgba(255,113,206,0.1)]">
            <p className="text-sm text-pink-300/50 tracking-[0.2em] uppercase mb-6">バリアント / Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold tracking-wider shadow-[0_0_20px_rgba(255,113,206,0.4)] hover:shadow-[0_0_30px_rgba(255,113,206,0.6)] hover:scale-105 transition-all duration-300">
                Primary
              </button>
              <button className="px-6 py-3 border-2 border-pink-400/50 text-pink-300 font-bold tracking-wider shadow-[inset_0_0_15px_rgba(255,113,206,0.1)] hover:bg-pink-400/10 hover:border-pink-400 transition-all duration-300">
                Outline Pink
              </button>
              <button className="px-6 py-3 border-2 border-cyan-400/50 text-cyan-300 font-bold tracking-wider shadow-[inset_0_0_15px_rgba(1,205,254,0.1)] hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300">
                Outline Cyan
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold tracking-wider shadow-[0_0_20px_rgba(1,205,254,0.3)] hover:shadow-[0_0_30px_rgba(1,205,254,0.5)] transition-all duration-300">
                Gradient
              </button>
              <button className="px-6 py-3 text-pink-300/70 font-bold tracking-wider hover:text-pink-300 transition-all duration-300">
                Ghost
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="p-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-cyan-400/20 shadow-[0_0_30px_rgba(1,205,254,0.1)]">
            <p className="text-sm text-cyan-300/50 tracking-[0.2em] uppercase mb-6">サイズ / Sizes</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold tracking-wider shadow-[0_0_15px_rgba(255,113,206,0.3)] transition-all">
                Small
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold tracking-wider shadow-[0_0_20px_rgba(255,113,206,0.4)] transition-all">
                Medium
              </button>
              <button className="px-8 py-4 text-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold tracking-wider shadow-[0_0_25px_rgba(255,113,206,0.5)] transition-all">
                Large
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="カード"
        subtitle="Cards"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="group p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-pink-400/20 shadow-[0_0_25px_rgba(255,113,206,0.15)] hover:shadow-[0_0_40px_rgba(255,113,206,0.3)] hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,113,206,0.4)] group-hover:shadow-[0_0_30px_rgba(255,113,206,0.6)] transition-all">
              <Music className="w-8 h-8 text-white" />
            </div>
            <p className="text-xs text-pink-300/40 mb-1">音楽</p>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300 mb-2">
              Smooth Jazz
            </h3>
            <p className="text-pink-200/60 text-sm mb-4">Elevator music from a forgotten mall</p>
            <button className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
              詳細を見る →
            </button>
          </div>

          <div className="group p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-cyan-400/20 shadow-[0_0_25px_rgba(1,205,254,0.15)] hover:shadow-[0_0_40px_rgba(1,205,254,0.3)] hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(1,205,254,0.4)] group-hover:shadow-[0_0_30px_rgba(1,205,254,0.6)] transition-all">
              <Disc className="w-8 h-8 text-white" />
            </div>
            <p className="text-xs text-cyan-300/40 mb-1">レコード</p>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300 mb-2">
              Vinyl Dreams
            </h3>
            <p className="text-cyan-200/60 text-sm mb-4">Analog warmth in digital age</p>
            <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              詳細を見る →
            </button>
          </div>

          <div className="group p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-400/20 shadow-[0_0_25px_rgba(185,103,255,0.15)] hover:shadow-[0_0_40px_rgba(185,103,255,0.3)] hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(185,103,255,0.4)] group-hover:shadow-[0_0_30px_rgba(185,103,255,0.6)] transition-all">
              <Tv className="w-8 h-8 text-white" />
            </div>
            <p className="text-xs text-purple-300/40 mb-1">映像</p>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
              VHS Nostalgia
            </h3>
            <p className="text-purple-200/60 text-sm mb-4">Glitchy memories of the past</p>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              詳細を見る →
            </button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="タブ"
        subtitle="Tabs"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-pink-400/20 shadow-[0_0_30px_rgba(255,113,206,0.15)]">
            {/* Tab Headers */}
            <div className="flex border-b border-pink-400/20 mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-wider transition-all duration-300 ${
                    activeTab === index
                      ? 'text-pink-300 border-b-2 border-pink-400 shadow-[0_4px_15px_rgba(255,113,206,0.3)]'
                      : 'text-pink-300/40 hover:text-pink-300/70'
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
                <div className="text-pink-200/70">
                  <h4 className="text-lg font-bold text-pink-300 mb-3">Featured Albums</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {['Floral Shoppe', 'Hit Vibes', '0'].map((album) => (
                      <div key={album} className="p-3 bg-purple-900/30 border border-pink-400/10 text-center">
                        <div className="w-full aspect-square bg-gradient-to-br from-pink-500/20 to-cyan-500/20 mb-2" />
                        <p className="text-xs text-pink-300/60">{album}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div className="text-pink-200/70">
                  <h4 className="text-lg font-bold text-cyan-300 mb-3">Your Playlists</h4>
                  <ul className="space-y-2">
                    {['Late Night Mall', 'Sunset Cruise', 'Digital Dreams'].map((playlist) => (
                      <li key={playlist} className="flex items-center gap-3 p-2 hover:bg-pink-400/5 transition-colors">
                        <Music className="w-4 h-4 text-pink-400/60" />
                        <span>{playlist}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === 2 && (
                <div className="text-pink-200/70">
                  <h4 className="text-lg font-bold text-purple-300 mb-3">Top Artists</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Macintosh Plus', 'Saint Pepsi', 'Blank Banshee', '猫 シ Corp'].map((artist) => (
                      <span key={artist} className="px-3 py-1.5 bg-purple-500/20 border border-purple-400/30 text-purple-200 text-sm">
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
        title="アラート"
        subtitle="Alerts"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-start gap-4 p-4 bg-emerald-500/10 border border-emerald-400/30 shadow-[0_0_15px_rgba(5,255,161,0.1)]">
            <div className="w-10 h-10 bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-300 text-sm mb-1">成功 / Success</h4>
              <p className="text-emerald-200/70 text-sm">Your playlist has been saved to the cloud.</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-4 p-4 bg-amber-500/10 border border-amber-400/30 shadow-[0_0_15px_rgba(255,251,150,0.1)]">
            <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-amber-300 text-sm mb-1">警告 / Warning</h4>
              <p className="text-amber-200/70 text-sm">Your subscription is about to expire.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-400/30 shadow-[0_0_15px_rgba(255,113,157,0.1)]">
            <div className="w-10 h-10 bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <X className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h4 className="font-bold text-red-300 text-sm mb-1">エラー / Error</h4>
              <p className="text-red-200/70 text-sm">Failed to load the requested track.</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start gap-4 p-4 bg-cyan-500/10 border border-cyan-400/30 shadow-[0_0_15px_rgba(1,205,254,0.1)]">
            <div className="w-10 h-10 bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-bold text-cyan-300 text-sm mb-1">情報 / Info</h4>
              <p className="text-cyan-200/70 text-sm">New vaporwave albums have been added this week.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="進捗"
        subtitle="Progress"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-pink-400/20 shadow-[0_0_30px_rgba(255,113,206,0.15)]">
            <div className="space-y-8">
              {/* Pink Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-pink-300/60">アップロード / Upload</span>
                  <span className="text-sm text-pink-300">{progress}%</span>
                </div>
                <div className="h-2 bg-purple-900/50 border border-pink-400/20 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_10px_rgba(255,113,206,0.5)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Cyan Progress */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-cyan-300/60">同期中 / Syncing</span>
                  <span className="text-sm text-cyan-300">82%</span>
                </div>
                <div className="h-2 bg-purple-900/50 border border-cyan-400/20 overflow-hidden">
                  <div className="h-full w-[82%] bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(1,205,254,0.5)]" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-4 py-2 text-sm border border-pink-400/30 text-pink-300 hover:bg-pink-400/10 transition-all"
                >
                  -10%
                </button>
                <button 
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-4 py-2 text-sm border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 transition-all"
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
        title="タグ"
        subtitle="Tags & Badges"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-pink-400/20 shadow-[0_0_30px_rgba(255,113,206,0.15)]">
            {/* Tags */}
            <div className="mb-8">
              <p className="text-sm text-pink-300/50 tracking-[0.2em] uppercase mb-4">Tags</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-pink-500/20 border border-pink-400/40 text-pink-200 text-sm shadow-[0_0_10px_rgba(255,113,206,0.2)]">
                  ヴェイパー
                </span>
                <span className="px-4 py-1.5 bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-sm shadow-[0_0_10px_rgba(1,205,254,0.2)]">
                  美学
                </span>
                <span className="px-4 py-1.5 bg-purple-500/20 border border-purple-400/40 text-purple-200 text-sm shadow-[0_0_10px_rgba(185,103,255,0.2)]">
                  Retro
                </span>
                <span className="px-4 py-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-sm shadow-[0_0_10px_rgba(5,255,161,0.2)]">
                  Chill
                </span>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-sm text-cyan-300/50 tracking-[0.2em] uppercase mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-pink-500 text-white text-sm font-bold shadow-[0_0_12px_rgba(255,113,206,0.5)]">
                  5
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-cyan-400 text-black text-sm font-bold shadow-[0_0_12px_rgba(1,205,254,0.5)]">
                  NEW
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-sm font-bold shadow-[0_0_12px_rgba(255,113,206,0.4)]">
                  限定
                </span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Music Player (Enhanced) */}
      <ShowcaseSection
        title="プレイヤー"
        subtitle="Music Player"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-pink-400/20 shadow-[0_0_40px_rgba(255,113,206,0.2)]">
            {/* Album Art */}
            <div className="relative mb-6">
              <div className={`w-48 h-48 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(255,113,206,0.4)] ${isPlaying ? 'animate-pulse' : ''}`} style={{ animationDuration: '2s' }}>
                <Radio className="w-20 h-20 text-white/80" />
              </div>
              {/* VHS effect overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-48 h-48 mx-auto bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />
              </div>
            </div>

            {/* Track Info */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-pink-300 mb-1">{tracks[activeTrack].name}</h3>
              <p className="text-pink-300/50 text-sm">{tracks[activeTrack].artist}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-1 bg-purple-900/50 border border-pink-400/10 overflow-hidden mb-2">
                <div className="h-full w-[35%] bg-gradient-to-r from-pink-500 to-cyan-500 shadow-[0_0_8px_rgba(255,113,206,0.5)]" />
              </div>
              <div className="flex justify-between text-xs text-pink-300/40">
                <span>1:32</span>
                <span>{tracks[activeTrack].duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button 
                onClick={() => setActiveTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))}
                className="w-10 h-10 flex items-center justify-center text-pink-300/60 hover:text-pink-300 transition-colors"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(255,113,206,0.5)] hover:shadow-[0_0_30px_rgba(255,113,206,0.7)] transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
              </button>
              <button 
                onClick={() => setActiveTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1))}
                className="w-10 h-10 flex items-center justify-center text-pink-300/60 hover:text-pink-300 transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-pink-300/40" />
              <div className="flex-1 h-1 bg-purple-900/50 border border-pink-400/10 overflow-hidden">
                <div className="h-full w-[70%] bg-pink-400/50" />
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="アコーディオン"
        subtitle="Accordion"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {accordionItems.map((item, index) => (
              <div 
                key={index}
                className={`border transition-all duration-300 ${
                  openAccordion === index 
                    ? 'border-pink-400/40 shadow-[0_0_20px_rgba(255,113,206,0.2)]' 
                    : 'border-pink-400/10'
                } bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm`}
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-bold text-pink-200">{item.title}</span>
                  {openAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-pink-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-pink-400/40" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 pb-4 text-pink-200/60 text-sm">
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
        title="フォーム"
        subtitle="Form"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4 text-center"
        subtitleClassName="text-pink-300/50 mb-10 text-center tracking-[0.3em] text-sm uppercase"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-pink-400/20 shadow-[0_0_40px_rgba(255,113,206,0.2)]">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(255,113,206,0.4)] mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-300">
                ニュースレター
              </h3>
              <p className="text-pink-300/50 text-sm">Subscribe to updates</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs text-pink-300/50 tracking-wider mb-2">名前 / Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-4 py-3 bg-purple-900/30 border border-pink-400/20 text-pink-100 placeholder-pink-300/30 focus:border-pink-400/50 focus:shadow-[0_0_15px_rgba(255,113,206,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-cyan-300/50 tracking-wider mb-2">メール / Email</label>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-full px-4 py-3 bg-purple-900/30 border border-cyan-400/20 text-cyan-100 placeholder-cyan-300/30 focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(1,205,254,0.2)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] text-white font-bold tracking-wider shadow-[0_0_20px_rgba(255,113,206,0.4)] hover:shadow-[0_0_30px_rgba(255,113,206,0.6)] hover:bg-right transition-all duration-500">
                登録する / Subscribe
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-pink-400/20 backdrop-blur-sm bg-purple-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 tracking-[0.2em]">
              ＶＡＰＯＲＷＡＶＥ
            </span>
          </div>
          <p className="text-pink-300/50 text-sm mb-4">
            Part of the{" "}
            <Link href="/" className="text-pink-400 hover:text-pink-300 transition-colors">
              StyleKit
            </Link>{" "}
            Design System Collection
          </p>
          <p className="text-pink-400/30 text-xs tracking-[0.3em]">
            永遠の夢 · Eternal Dreams
          </p>
        </div>
      </footer>
    </div>
  );
}
