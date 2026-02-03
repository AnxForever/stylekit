"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Heart, Star, Smile } from "lucide-react";
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

      {/* Interactive Counter */}
      <ShowcaseSection
        title="Interactive Elements"
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
