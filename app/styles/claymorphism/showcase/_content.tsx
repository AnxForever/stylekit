"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Sparkles, Heart, Star, ChevronDown, ChevronUp, 
  Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, MessageCircle,
  Music, Camera, Gamepad2
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Claymorphism 配色
const colors: ColorItem[] = [
  { name: "Pink", hex: "#f8b4d9", bg: "bg-[#f8b4d9]" },
  { name: "Cream", hex: "#fef3c7", bg: "bg-[#fef3c7]" },
  { name: "Mint", hex: "#a7f3d0", bg: "bg-[#a7f3d0]" },
  { name: "Lavender", hex: "#c4b5fd", bg: "bg-[#c4b5fd]" },
  { name: "Lemon", hex: "#fcd34d", bg: "bg-[#fcd34d]" },
];

export default function ShowcaseContent() {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Music", icon: Music },
    { label: "Photos", icon: Camera },
    { label: "Games", icon: Gamepad2 },
  ];

  const accordionItems = [
    { title: "What is Claymorphism?", content: "Claymorphism is a design trend that mimics the soft, rounded appearance of clay or plasticine. It features oversized border-radius, subtle inner shadows, and pastel color gradients." },
    { title: "Key Elements", content: "Large rounded corners (32px+), inner and outer shadows for 3D depth, soft pastel gradients, and playful, touchable-looking UI components." },
    { title: "Best Use Cases", content: "Perfect for children's apps, creative tools, playful brands, and any interface that wants to feel friendly and approachable." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-pink-100 to-purple-100">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-[32px] shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(255,255,255,0.4)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/claymorphism"
            className="flex items-center gap-2 text-pink-700 hover:text-pink-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-pink-700">Claymorphism</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-gradient-to-b from-pink-300 to-pink-400 rounded-2xl text-white font-medium shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)] hover:translate-y-0.5 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Claymorphism"
        description="柔软的粘土质感，超大圆角配合内外阴影，营造可爱的 3D 立体效果"
        className="pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-bold text-pink-600 mb-6"
        descriptionClassName="text-xl text-pink-500 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white font-bold shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
            开始使用
          </button>
          <button className="px-8 py-4 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full text-amber-800 font-bold shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.1)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
            查看文档
          </button>
        </div>
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection
        title="Statistics"
        subtitle="Playful metrics display"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Users, label: "Friends", value: "1,842", gradient: "from-pink-300 to-pink-400", bg: "from-pink-100 to-pink-200" },
            { icon: TrendingUp, label: "Growth", value: "+86%", gradient: "from-green-300 to-green-400", bg: "from-green-100 to-green-200" },
            { icon: Eye, label: "Views", value: "928K", gradient: "from-purple-300 to-purple-400", bg: "from-purple-100 to-purple-200" },
            { icon: MessageCircle, label: "Messages", value: "4,521", gradient: "from-amber-300 to-amber-400", bg: "from-amber-100 to-amber-200" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-5 bg-gradient-to-br ${stat.bg} rounded-[24px] shadow-[8px_8px_16px_rgba(0,0,0,0.08),inset_4px_4px_8px_rgba(255,255,255,0.5),inset_-2px_-2px_4px_rgba(0,0,0,0.03)]`}
            >
              <div className={`w-12 h-12 bg-gradient-to-b ${stat.gradient} rounded-full flex items-center justify-center mb-3 shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-gray-700 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="配色系统"
        subtitle="柔和的糖果色系"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-[32px] overflow-hidden shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4)]"
            labelClassName="font-bold text-sm text-pink-700"
            hexClassName="text-xs text-pink-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="按钮"
        subtitle="带有按压效果的粘土按钮"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="p-8 bg-gradient-to-br from-white to-pink-50 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]">
            <p className="text-sm font-bold text-pink-500 uppercase tracking-wide mb-6">颜色</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
                粉色
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-green-200 to-green-300 rounded-full text-green-800 font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
                薄荷
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-purple-200 to-purple-300 rounded-full text-purple-800 font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
                淡紫
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full text-yellow-800 font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
                柠檬
              </button>
            </div>

            <p className="text-sm font-bold text-pink-500 uppercase tracking-wide mb-6 mt-10">尺寸</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-4 py-2 text-sm bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white font-bold shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)] hover:translate-y-0.5 active:translate-y-1 transition-all duration-200">
                小
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
                中
              </button>
              <button className="px-8 py-4 text-lg bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white font-bold shadow-[8px_8px_16px_rgba(0,0,0,0.1),inset_4px_4px_8px_rgba(255,255,255,0.4)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
                大
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="卡片"
        subtitle="柔软的 3D 粘土卡片"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]">
            <div className="w-16 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full flex items-center justify-center mb-4 shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)]">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-amber-800 mb-2">创意设计</h3>
            <p className="text-amber-700">适合儿童应用和创意项目</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]">
            <div className="w-16 h-16 bg-gradient-to-b from-green-300 to-green-400 rounded-full flex items-center justify-center mb-4 shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)]">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">友好界面</h3>
            <p className="text-green-700">温暖亲切的用户体验</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]">
            <div className="w-16 h-16 bg-gradient-to-b from-purple-300 to-purple-400 rounded-full flex items-center justify-center mb-4 shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)]">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-800 mb-2">趣味互动</h3>
            <p className="text-purple-700">带来愉悦的交互体验</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="表单元素"
        subtitle="内凹效果的粘土输入框"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-white to-pink-50 rounded-[48px] shadow-[20px_20px_40px_rgba(0,0,0,0.1),inset_8px_8px_16px_rgba(255,255,255,0.8),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]">
            <h3 className="text-2xl font-bold text-pink-600 mb-6 text-center">Sign Up</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-6 py-4 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.9),0_0_0_4px_rgba(248,180,217,0.3)] transition-all"
              />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-6 py-4 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl text-gray-700 placeholder-gray-400 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:outline-none focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.9),0_0_0_4px_rgba(248,180,217,0.3)] transition-all"
              />
              <button className="w-full py-4 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full text-white font-bold text-lg shadow-[8px_8px_16px_rgba(0,0,0,0.15),inset_4px_4px_8px_rgba(255,255,255,0.3)] hover:translate-y-1 active:translate-y-2 transition-all duration-200">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Soft navigation tabs"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-gradient-to-br from-white to-pink-50 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)]">
            {/* Tab Headers */}
            <div className="flex gap-2 p-1.5 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full mb-6 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeTab === index
                      ? "bg-gradient-to-b from-pink-300 to-pink-400 text-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="min-h-[120px] p-5 bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-bold text-pink-600 mb-3">Your Playlist</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Pop Hits", "Chill Beats", "Workout Mix"].map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-gradient-to-b from-pink-100 to-pink-200 rounded-full text-sm text-pink-700 font-medium shadow-[2px_2px_4px_rgba(0,0,0,0.05)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-purple-600 mb-3">Photo Albums</h4>
                  <p className="text-gray-600">256 photos in 8 albums. Last upload: today!</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-green-600 mb-3">Game Library</h4>
                  <p className="text-gray-600">12 games installed. 3 currently playing!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Expandable content blocks"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-pink-50 rounded-[24px] shadow-[8px_8px_16px_rgba(0,0,0,0.08),inset_4px_4px_8px_rgba(255,255,255,0.5),inset_-2px_-2px_4px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-bold text-pink-700">{item.title}</span>
                <div className={`w-8 h-8 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full flex items-center justify-center shadow-[2px_2px_4px_rgba(0,0,0,0.1),inset_1px_1px_2px_rgba(255,255,255,0.4)] transition-transform ${openAccordion === index ? "rotate-180" : ""}`}>
                  <ChevronDown className="w-4 h-4 text-pink-600" />
                </div>
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Friendly notifications"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-[20px] shadow-[6px_6px_12px_rgba(0,0,0,0.08),inset_3px_3px_6px_rgba(255,255,255,0.5)]">
            <div className="w-10 h-10 bg-gradient-to-b from-green-300 to-green-400 rounded-full flex items-center justify-center shadow-[3px_3px_6px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-green-700">Yay! Success!</p>
              <p className="text-green-600/80 text-sm">Everything went perfectly!</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-[20px] shadow-[6px_6px_12px_rgba(0,0,0,0.08),inset_3px_3px_6px_rgba(255,255,255,0.5)]">
            <div className="w-10 h-10 bg-gradient-to-b from-amber-300 to-amber-400 rounded-full flex items-center justify-center shadow-[3px_3px_6px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-amber-700">Heads up!</p>
              <p className="text-amber-600/80 text-sm">Something needs your attention.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-red-100 to-red-200 rounded-[20px] shadow-[6px_6px_12px_rgba(0,0,0,0.08),inset_3px_3px_6px_rgba(255,255,255,0.5)]">
            <div className="w-10 h-10 bg-gradient-to-b from-red-300 to-red-400 rounded-full flex items-center justify-center shadow-[3px_3px_6px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-red-700">Oopsie!</p>
              <p className="text-red-600/80 text-sm">Something went wrong. Try again?</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-[20px] shadow-[6px_6px_12px_rgba(0,0,0,0.08),inset_3px_3px_6px_rgba(255,255,255,0.5)]">
            <div className="w-10 h-10 bg-gradient-to-b from-blue-300 to-blue-400 rounded-full flex items-center justify-center shadow-[3px_3px_6px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)]">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-blue-700">Did you know?</p>
              <p className="text-blue-600/80 text-sm">Here is some helpful information.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Soft switches"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-gradient-to-br from-white to-pink-50 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)] space-y-5">
            {[
              { label: "Notifications", desc: "Receive push notifications" },
              { label: "Dark Mode", desc: "Switch to dark theme" },
              { label: "Auto-save", desc: "Save changes automatically" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-bold text-pink-700">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-16 h-9 rounded-full transition-all duration-300 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] ${
                    toggleStates[index] 
                      ? "bg-gradient-to-b from-pink-300 to-pink-400" 
                      : "bg-gradient-to-b from-gray-200 to-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
                      toggleStates[index] ? "translate-x-7" : "translate-x-0"
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
        subtitle="Playful progress bars"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-gradient-to-br from-white to-purple-50 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)] space-y-6">
            {/* Linear Progress */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-purple-700">Download Progress</p>
                <p className="text-sm text-purple-500 font-mono">{progress}%</p>
              </div>
              <div className="h-4 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]">
                <div
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.1)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Multi-color Progress */}
            <div>
              <p className="font-bold text-purple-700 mb-3">Level Progress</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 100, color: "from-pink-400 to-pink-500" },
                  { value: 100, color: "from-green-400 to-green-500" },
                  { value: 65, color: "from-purple-400 to-purple-500" },
                  { value: 0, color: "from-amber-400 to-amber-500" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="h-3 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">Lvl {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Control */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-5 py-2 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full text-gray-700 font-bold shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)] hover:translate-y-0.5 active:translate-y-1 transition-all"
              >
                - 10%
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-5 py-2 bg-gradient-to-b from-purple-300 to-purple-400 rounded-full text-white font-bold shadow-[4px_4px_8px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.4)] hover:translate-y-0.5 active:translate-y-1 transition-all"
              >
                + 10%
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Interactive Counter */}
      <ShowcaseSection
        title="Interactive Counter"
        subtitle="Playful interactions with press effects"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-pink-600 mb-4 text-center"
        subtitleClassName="text-pink-500 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-[32px] shadow-[12px_12px_24px_rgba(0,0,0,0.1),inset_6px_6px_12px_rgba(255,255,255,0.6),inset_-4px_-4px_8px_rgba(0,0,0,0.05)] text-center">
            <div className="text-6xl font-bold text-purple-700 mb-6">{count}</div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCount(count - 1)}
                className="w-16 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full text-white text-2xl font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)] hover:translate-y-1 active:translate-y-2 transition-all duration-200"
              >
                -
              </button>
              <button
                onClick={() => setCount(0)}
                className="w-16 h-16 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full text-gray-700 text-xl font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)] hover:translate-y-1 active:translate-y-2 transition-all duration-200"
              >
                0
              </button>
              <button
                onClick={() => setCount(count + 1)}
                className="w-16 h-16 bg-gradient-to-b from-green-300 to-green-400 rounded-full text-white text-2xl font-bold shadow-[6px_6px_12px_rgba(0,0,0,0.1),inset_3px_3px_6px_rgba(255,255,255,0.4)] hover:translate-y-1 active:translate-y-2 transition-all duration-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-pink-500 text-sm">
            Claymorphism Showcase · Part of{" "}
            <Link href="/" className="text-pink-600 hover:underline font-medium">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
