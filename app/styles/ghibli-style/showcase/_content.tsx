"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Cloud, Leaf, Sun, Wind, Heart, Star, Sparkles,
  Home, TreeDeciduous, Bird, Flower2, ChevronDown, ChevronUp,
  Check, AlertTriangle, Info, X, Users, Eye, MessageCircle, Clock
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sage", hex: "#7cb9a8", bg: "bg-[#7cb9a8]" },
  { name: "Cream", hex: "#f4e4bc", bg: "bg-[#f4e4bc]" },
  { name: "Coral", hex: "#e8a87c", bg: "bg-[#e8a87c]" },
  { name: "Sky", hex: "#85cdca", bg: "bg-[#85cdca]" },
  { name: "Rose", hex: "#c38d94", bg: "bg-[#c38d94]" },
  { name: "Forest", hex: "#6b9a7d", bg: "bg-[#6b9a7d]" },
  { name: "Sunset", hex: "#e6a074", bg: "bg-[#e6a074]" },
  { name: "Cloud", hex: "#f5f0e6", bg: "bg-[#f5f0e6]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Stories", icon: Home },
    { label: "Nature", icon: TreeDeciduous },
    { label: "Spirits", icon: Sparkles },
  ];

  const accordionItems = [
    {
      title: "What makes Ghibli style special?",
      content: "The warmth of hand-drawn animation, attention to everyday moments, and a deep respect for nature and humanity. Every frame feels like a painting, every character feels like a friend."
    },
    {
      title: "Design philosophy",
      content: "Soft, organic shapes with rounded corners. Warm, earthy color palettes inspired by nature. Gentle gradients that mimic watercolor paintings. A sense of wonder in the ordinary."
    },
    {
      title: "Key visual elements",
      content: "Fluffy clouds, lush greenery, cozy interiors, magical creatures, and golden sunlight. The style embraces imperfection and celebrates the beauty of the natural world."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87ceeb] via-[#b4e4f5] to-[#f4e4bc] relative overflow-hidden">
      {/* Animated Floating Clouds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-[5%] w-40 h-20 bg-white/50 rounded-full blur-sm animate-[float_20s_ease-in-out_infinite]" />
        <div className="absolute top-28 left-[15%] w-24 h-12 bg-white/40 rounded-full blur-sm animate-[float_25s_ease-in-out_infinite_2s]" />
        <div className="absolute top-12 right-[10%] w-48 h-24 bg-white/45 rounded-full blur-sm animate-[float_22s_ease-in-out_infinite_1s]" />
        <div className="absolute top-36 right-[25%] w-32 h-16 bg-white/35 rounded-full blur-sm animate-[float_28s_ease-in-out_infinite_3s]" />
        <div className="absolute top-24 left-[40%] w-28 h-14 bg-white/40 rounded-full blur-sm animate-[float_24s_ease-in-out_infinite_4s]" />
      </div>

      {/* Floating Nature Elements */}
      <div className="fixed bottom-[15%] left-[8%] opacity-20 pointer-events-none">
        <Leaf className="w-16 h-16 text-[#6b9a7d] animate-[sway_8s_ease-in-out_infinite]" />
      </div>
      <div className="fixed bottom-[25%] right-[12%] opacity-15 pointer-events-none">
        <Bird className="w-12 h-12 text-[#5a4a3a] animate-[float_6s_ease-in-out_infinite]" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-15px) translateX(10px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
      `}</style>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-white/40 backdrop-blur-sm border-b border-[#d4c49a]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/ghibli-style"
            className="flex items-center gap-2 text-[#5a4a3a] hover:text-[#7cb9a8] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Docs</span>
          </Link>
          <div className="flex items-center gap-2">
            <Flower2 className="w-5 h-5 text-[#c38d94]" />
            <span className="font-semibold text-xl text-[#5a4a3a]">
              Ghibli Style
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white text-sm rounded-full shadow-[0_4px_10px_rgba(124,185,168,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(124,185,168,0.4)] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative element */}
          <div className="flex justify-center gap-2 mb-6">
            <Star className="w-5 h-5 text-[#e8a87c] animate-pulse" />
            <Sparkles className="w-5 h-5 text-[#7cb9a8]" />
            <Star className="w-5 h-5 text-[#c38d94] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-[#5a4a3a] mb-6 leading-tight">
            A World of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7cb9a8] via-[#85cdca] to-[#7cb9a8]">
              Wonder
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#7a6a5a] max-w-2xl mx-auto mb-12 leading-relaxed">
            Where every journey begins with a single step into the magical unknown.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="group px-10 py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_20px_rgba(124,185,168,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,185,168,0.5)] transition-all duration-300">
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Adventure
              </span>
            </button>
            <button className="px-10 py-4 bg-white/60 backdrop-blur-sm text-[#5a4a3a] font-medium rounded-full border-2 border-[#d4c49a]/40 hover:bg-white/80 hover:border-[#7cb9a8]/40 transition-all duration-300">
              <span className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Learn More
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ShowcaseSection
        title="Magic in Numbers"
        subtitle="Spreading joy everywhere"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Users, label: "Happy Visitors", value: "2.4M" },
            { icon: Heart, label: "Stories Told", value: "847" },
            { icon: Eye, label: "Dreams Shared", value: "12K" },
            { icon: MessageCircle, label: "Kind Words", value: "36K" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-to-br from-[#f4e4bc]/80 to-[#e8d5a3]/80 backdrop-blur-sm rounded-3xl border border-[#d4c49a]/40 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(124,185,168,0.3)] group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#5a4a3a] mb-1">{stat.value}</p>
              <p className="text-sm text-[#7a6a5a]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Warm and dreamy"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#d4c49a]/30 shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            labelClassName="font-semibold text-sm text-[#5a4a3a]"
            hexClassName="text-xs text-[#7a6a5a] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Soft and inviting"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Variants */}
          <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <p className="text-sm font-semibold text-[#7a6a5a] mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_14px_rgba(124,185,168,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(124,185,168,0.5)] transition-all duration-300">
                Primary
              </button>
              <button className="px-8 py-4 bg-gradient-to-b from-[#e8a87c] to-[#d49a6c] text-white font-medium rounded-full shadow-[0_4px_14px_rgba(232,168,124,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(232,168,124,0.5)] transition-all duration-300">
                Warm
              </button>
              <button className="px-8 py-4 bg-gradient-to-b from-[#85cdca] to-[#6bb8b5] text-white font-medium rounded-full shadow-[0_4px_14px_rgba(133,205,202,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(133,205,202,0.5)] transition-all duration-300">
                Sky
              </button>
              <button className="px-8 py-4 bg-white/70 backdrop-blur-sm text-[#5a4a3a] font-medium rounded-full border-2 border-[#d4c49a]/50 hover:bg-white hover:border-[#7cb9a8]/50 transition-all duration-300">
                Secondary
              </button>
              <button className="px-8 py-4 text-[#7cb9a8] font-medium hover:text-[#5a9a8a] transition-all duration-300">
                Text Only
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="p-8 bg-gradient-to-br from-[#e8f4f8]/80 to-[#d4eef2]/80 rounded-3xl border border-[#85cdca]/30 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <p className="text-sm font-semibold text-[#5a8a88] mb-6">Sizes</p>
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-5 py-2.5 text-sm bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_3px_10px_rgba(124,185,168,0.3)] hover:-translate-y-0.5 transition-all">
                Small
              </button>
              <button className="px-7 py-3.5 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_14px_rgba(124,185,168,0.4)] hover:-translate-y-1 transition-all">
                Medium
              </button>
              <button className="px-10 py-5 text-lg bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_5px_18px_rgba(124,185,168,0.4)] hover:-translate-y-1 transition-all">
                Large
              </button>
            </div>
          </div>

          {/* With Icons */}
          <div className="p-8 bg-gradient-to-br from-[#f8f0e8]/80 to-[#f4e4bc]/80 rounded-3xl border border-[#c38d94]/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <p className="text-sm font-semibold text-[#8a6a6a] mb-6">With Icons</p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_14px_rgba(124,185,168,0.4)] hover:-translate-y-1 transition-all">
                <Sparkles className="w-5 h-5" />
                Discover
              </button>
              <button className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-b from-[#c38d94] to-[#a87d84] text-white font-medium rounded-full shadow-[0_4px_14px_rgba(195,141,148,0.4)] hover:-translate-y-1 transition-all">
                <Heart className="w-5 h-5" />
                Favorite
              </button>
              <button className="flex items-center gap-2 px-7 py-3.5 bg-white/70 backdrop-blur-sm text-[#5a4a3a] font-medium rounded-full border-2 border-[#d4c49a]/50 hover:bg-white transition-all">
                <Cloud className="w-5 h-5" />
                Explore
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Feature Cards */}
      <ShowcaseSection
        title="Features"
        subtitle="Natural elements"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            { icon: Cloud, title: "Sky", desc: "Dreamy clouds above", gradient: "from-[#85cdca] to-[#7cb9a8]" },
            { icon: Leaf, title: "Nature", desc: "Forest spirits dance", gradient: "from-[#7cb9a8] to-[#5a9a8a]" },
            { icon: Sun, title: "Warmth", desc: "Golden sunset glow", gradient: "from-[#e8a87c] to-[#d49a6c]" },
            { icon: Wind, title: "Wind", desc: "Gentle breeze flows", gradient: "from-[#c38d94] to-[#b07d84]" },
          ].map((feature, index) => (
            <div 
              key={index}
              className="group p-6 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-center hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300"
            >
              <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#5a4a3a] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#7a6a5a] mb-3">{feature.desc}</p>
              <button className="text-sm text-[#7cb9a8] hover:text-[#5a9a8a] transition-colors">
                Learn more
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Organized content"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            {/* Tab Headers */}
            <div className="flex gap-2 p-1 bg-white/40 rounded-full mb-6">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white shadow-[0_4px_12px_rgba(124,185,168,0.4)]'
                      : 'text-[#7a6a5a] hover:text-[#5a4a3a] hover:bg-white/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="min-h-[140px] p-4 bg-white/40 rounded-2xl">
              {activeTab === 0 && (
                <div className="text-[#5a4a3a]">
                  <h4 className="text-lg font-semibold mb-3">Magical Stories</h4>
                  <p className="text-[#7a6a5a]">Every adventure begins with a story. From flying castles to forest spirits, discover tales that warm the heart.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div className="text-[#5a4a3a]">
                  <h4 className="text-lg font-semibold mb-3">Living Nature</h4>
                  <ul className="space-y-2 text-[#7a6a5a]">
                    <li className="flex items-center gap-2"><Leaf className="w-4 h-4 text-[#7cb9a8]" /> Ancient forests</li>
                    <li className="flex items-center gap-2"><Flower2 className="w-4 h-4 text-[#c38d94]" /> Blooming meadows</li>
                    <li className="flex items-center gap-2"><Bird className="w-4 h-4 text-[#85cdca]" /> Singing birds</li>
                  </ul>
                </div>
              )}
              {activeTab === 2 && (
                <div className="text-[#5a4a3a]">
                  <h4 className="text-lg font-semibold mb-3">Friendly Spirits</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Totoro', 'Kodama', 'Soot Sprites', 'Forest God'].map((spirit) => (
                      <span key={spirit} className="px-3 py-1.5 bg-[#7cb9a8]/20 border border-[#7cb9a8]/30 text-[#5a9a8a] text-sm rounded-full">
                        {spirit}
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
        title="Alerts"
        subtitle="Gentle notifications"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-start gap-4 p-5 bg-[#7cb9a8]/15 border border-[#7cb9a8]/30 rounded-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(124,185,168,0.3)]">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-[#5a9a8a] mb-1">Success!</h4>
              <p className="text-[#6b9a7d] text-sm">Your journey has been saved to the magical map.</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-4 p-5 bg-[#e8a87c]/15 border border-[#e8a87c]/30 rounded-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e8a87c] to-[#d49a6c] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(232,168,124,0.3)]">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-[#c4886a] mb-1">Gentle Reminder</h4>
              <p className="text-[#a88a6a] text-sm">The forest path may be misty today. Take care!</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-start gap-4 p-5 bg-[#c38d94]/15 border border-[#c38d94]/30 rounded-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-[#c38d94] to-[#a87d84] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(195,141,148,0.3)]">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-[#a87d84] mb-1">Oh no!</h4>
              <p className="text-[#9a7a7a] text-sm">Something went wrong. But do not worry, try again!</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start gap-4 p-5 bg-[#85cdca]/15 border border-[#85cdca]/30 rounded-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-[#85cdca] to-[#6bb8b5] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(133,205,202,0.3)]">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-[#5a9a98] mb-1">Did you know?</h4>
              <p className="text-[#6a9a98] text-sm">New adventures await in the enchanted garden!</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress"
        subtitle="Journey tracking"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="space-y-8">
              {/* Sage Progress */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium text-[#5a4a3a]">Adventure Progress</span>
                  <span className="text-sm text-[#7cb9a8] font-semibold">{progress}%</span>
                </div>
                <div className="h-3 bg-white/60 rounded-full border border-[#d4c49a]/30 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#7cb9a8] to-[#85cdca] rounded-full shadow-[0_2px_8px_rgba(124,185,168,0.4)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Coral Progress */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium text-[#5a4a3a]">Treasures Found</span>
                  <span className="text-sm text-[#e8a87c] font-semibold">78%</span>
                </div>
                <div className="h-3 bg-white/60 rounded-full border border-[#d4c49a]/30 overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-[#e8a87c] to-[#f0b890] rounded-full shadow-[0_2px_8px_rgba(232,168,124,0.4)]" />
                </div>
              </div>

              {/* Rose Progress */}
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium text-[#5a4a3a]">Friends Made</span>
                  <span className="text-sm text-[#c38d94] font-semibold">45%</span>
                </div>
                <div className="h-3 bg-white/60 rounded-full border border-[#d4c49a]/30 overflow-hidden">
                  <div className="h-full w-[45%] bg-gradient-to-r from-[#c38d94] to-[#d4a0a6] rounded-full shadow-[0_2px_8px_rgba(195,141,148,0.4)]" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  className="px-4 py-2 text-sm bg-white/60 border border-[#d4c49a]/40 rounded-full text-[#5a4a3a] hover:bg-white transition-all"
                >
                  -10%
                </button>
                <button 
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  className="px-4 py-2 text-sm bg-white/60 border border-[#d4c49a]/40 rounded-full text-[#5a4a3a] hover:bg-white transition-all"
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
        subtitle="Colorful labels"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            {/* Tags */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#7a6a5a] mb-4">Tags</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#7cb9a8]/20 border border-[#7cb9a8]/30 text-[#5a9a8a] text-sm rounded-full font-medium">
                  Nature
                </span>
                <span className="px-4 py-2 bg-[#85cdca]/20 border border-[#85cdca]/30 text-[#5a9a98] text-sm rounded-full font-medium">
                  Sky
                </span>
                <span className="px-4 py-2 bg-[#e8a87c]/20 border border-[#e8a87c]/30 text-[#c4886a] text-sm rounded-full font-medium">
                  Warmth
                </span>
                <span className="px-4 py-2 bg-[#c38d94]/20 border border-[#c38d94]/30 text-[#a87d84] text-sm rounded-full font-medium">
                  Magic
                </span>
              </div>
            </div>

            {/* Badges */}
            <div>
              <p className="text-sm font-semibold text-[#7a6a5a] mb-4">Badges</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] text-white text-sm font-bold rounded-full shadow-[0_3px_10px_rgba(124,185,168,0.4)]">
                  3
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-gradient-to-br from-[#e8a87c] to-[#d49a6c] text-white text-sm font-bold rounded-full shadow-[0_3px_10px_rgba(232,168,124,0.4)]">
                  New
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-gradient-to-br from-[#c38d94] to-[#a87d84] text-white text-sm font-bold rounded-full shadow-[0_3px_10px_rgba(195,141,148,0.4)]">
                  Popular
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-[#7cb9a8] text-[#7cb9a8] text-sm font-bold rounded-full">
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
        subtitle="Magical switches"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="space-y-5">
              {[
                { label: "Show clouds", index: 0 },
                { label: "Play music", index: 1 },
                { label: "Night mode", index: 2 },
              ].map((item) => (
                <div key={item.index} className="flex items-center justify-between">
                  <span className="text-[#5a4a3a] font-medium">{item.label}</span>
                  <button
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[item.index] = !newStates[item.index];
                      setToggleStates(newStates);
                    }}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      toggleStates[item.index]
                        ? 'bg-gradient-to-r from-[#7cb9a8] to-[#5a9a8a] shadow-[0_2px_10px_rgba(124,185,168,0.4)]'
                        : 'bg-[#d4c49a]/50'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
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
        subtitle="Expandable wisdom"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {accordionItems.map((item, index) => (
              <div 
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openAccordion === index 
                    ? 'border-[#7cb9a8]/40 shadow-[0_8px_25px_rgba(124,185,168,0.15)]' 
                    : 'border-[#d4c49a]/30'
                } bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90`}
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-[#5a4a3a]">{item.title}</span>
                  {openAccordion === index ? (
                    <ChevronUp className="w-5 h-5 text-[#7cb9a8]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#a89a7a]" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 pb-5 text-[#7a6a5a]">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Input Form */}
      <ShowcaseSection
        title="Forms"
        subtitle="Soft and welcoming"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(124,185,168,0.4)] mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#5a4a3a]">Start Your Journey</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#7a6a5a] mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-5 py-4 bg-white/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#7cb9a8] focus:bg-white/80 focus:shadow-[0_4px_15px_rgba(124,185,168,0.2)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7a6a5a] mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full px-5 py-4 bg-white/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#85cdca] focus:bg-white/80 focus:shadow-[0_4px_15px_rgba(133,205,202,0.2)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7a6a5a] mb-2">Your Story</label>
                <textarea
                  placeholder="Tell your story..."
                  rows={4}
                  className="w-full px-5 py-4 bg-white/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#e8a87c] focus:bg-white/80 focus:shadow-[0_4px_15px_rgba(232,168,124,0.2)] transition-all duration-300 resize-none"
                />
              </div>
              <button className="w-full py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_20px_rgba(124,185,168,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,185,168,0.5)] transition-all duration-300">
                Begin Adventure
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Avatars */}
      <ShowcaseSection
        title="Avatars"
        subtitle="Friendly faces"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-[#5a4a3a] mb-4 text-center"
        subtitleClassName="text-[#7a6a5a] mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <div className="flex flex-wrap items-end justify-center gap-6">
              {/* Small */}
              <div className="text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-[0_4px_10px_rgba(124,185,168,0.4)] mb-2">
                  C
                </div>
                <span className="text-xs text-[#7a6a5a]">Small</span>
              </div>
              {/* Medium */}
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#85cdca] to-[#6bb8b5] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-[0_4px_12px_rgba(133,205,202,0.4)] mb-2">
                  SA
                </div>
                <span className="text-xs text-[#7a6a5a]">Medium</span>
              </div>
              {/* Large */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#e8a87c] to-[#d49a6c] rounded-full flex items-center justify-center text-white font-semibold text-2xl shadow-[0_4px_15px_rgba(232,168,124,0.4)] mb-2">
                  T
                </div>
                <span className="text-xs text-[#7a6a5a]">Large</span>
              </div>
              {/* Group */}
              <div className="text-center">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center text-white font-semibold border-2 border-[#f4e4bc] shadow-[0_4px_10px_rgba(124,185,168,0.3)]">A</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#85cdca] to-[#6bb8b5] rounded-full flex items-center justify-center text-white font-semibold border-2 border-[#f4e4bc] shadow-[0_4px_10px_rgba(133,205,202,0.3)]">B</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c38d94] to-[#a87d84] rounded-full flex items-center justify-center text-white font-semibold border-2 border-[#f4e4bc] shadow-[0_4px_10px_rgba(195,141,148,0.3)]">+3</div>
                </div>
                <span className="text-xs text-[#7a6a5a] mt-2 block">Group</span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 bg-[#f4e4bc]/60 backdrop-blur-sm border-t border-[#d4c49a]/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-[#e8a87c]" />
            <Heart className="w-5 h-5 text-[#c38d94]" />
            <Sparkles className="w-5 h-5 text-[#7cb9a8]" />
          </div>
          <h3 className="text-xl font-semibold text-[#5a4a3a] mb-2">Ghibli Style</h3>
          <p className="text-[#7a6a5a] text-sm mb-4">
            Part of the{" "}
            <Link href="/" className="text-[#7cb9a8] hover:text-[#5a9a8a] transition-colors font-medium">
              StyleKit
            </Link>{" "}
            Design System Collection
          </p>
          <p className="text-[#a89a7a] text-xs">
            Where magic meets everyday wonder
          </p>
        </div>
      </footer>
    </div>
  );
}
