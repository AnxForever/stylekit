"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  Eye,
  Camera,
  Palette,
  Sparkles,
  Layers,
  Grid3X3,
  Download,
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Masonry Flow 配色
const colors: ColorItem[] = [
  { name: "Primary", hex: "#1a1a2e", bg: "bg-[#1a1a2e]" },
  { name: "Background", hex: "#f5f5f5", bg: "bg-zinc-100" },
  { name: "Rose", hex: "#e94560", bg: "bg-rose-500" },
  { name: "Emerald", hex: "#16c79a", bg: "bg-emerald-500" },
  { name: "Amber", hex: "#ffd460", bg: "bg-amber-400" },
];

// 设计规则
const designRules = [
  { title: "CSS Columns", desc: "columns-2 md:columns-3 lg:columns-4 实现瀑布流" },
  { title: "防止断裂", desc: "break-inside-avoid 确保卡片不被分割" },
  { title: "自然高度", desc: "卡片高度由内容决定，无需强制等高" },
  { title: "统一间距", desc: "mb-4 保持卡片之间垂直间距一致" },
  { title: "图片适配", desc: "使用 aspect-ratio 保持图片比例" },
  { title: "懒加载", desc: "loading='lazy' 优化大量图片加载" },
];

// 模拟的卡片数据
const cards = [
  { id: 1, height: "h-64", color: "from-rose-400 to-pink-500", title: "Creative Design", likes: 234 },
  { id: 2, height: "h-48", color: "from-blue-400 to-cyan-500", title: "Web Development", likes: 189 },
  { id: 3, height: "h-72", color: "from-purple-400 to-violet-500", title: "Brand Identity", likes: 456 },
  { id: 4, height: "h-56", color: "from-amber-400 to-orange-500", title: "Photography", likes: 321 },
  { id: 5, height: "h-40", color: "from-emerald-400 to-teal-500", title: "Illustration", likes: 178 },
  { id: 6, height: "h-80", color: "from-indigo-400 to-blue-500", title: "UI/UX Design", likes: 567 },
  { id: 7, height: "h-52", color: "from-pink-400 to-rose-500", title: "Motion Design", likes: 234 },
  { id: 8, height: "h-44", color: "from-cyan-400 to-blue-500", title: "3D Rendering", likes: 145 },
  { id: 9, height: "h-68", color: "from-violet-400 to-purple-500", title: "Typography", likes: 389 },
  { id: 10, height: "h-36", color: "from-teal-400 to-emerald-500", title: "Icon Design", likes: 267 },
  { id: 11, height: "h-60", color: "from-orange-400 to-red-500", title: "Packaging", likes: 412 },
  { id: 12, height: "h-48", color: "from-blue-500 to-indigo-600", title: "App Design", likes: 523 },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-zinc-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/masonry-flow"
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-zinc-900">Masonry Flow</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm hover:bg-zinc-800 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Masonry Flow"
        description="Pinterest-inspired waterfall layout where cards flow naturally based on their content height, creating an organic and visually engaging grid."
        className="pt-32 pb-16 px-6 text-center bg-white"
        titleClassName="text-5xl md:text-6xl font-bold text-zinc-900 mb-6"
        descriptionClassName="text-xl text-zinc-600 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-zinc-900 text-white rounded-full font-semibold hover:bg-zinc-800 transition-colors">
            Explore Gallery
          </button>
          <button className="px-8 py-4 bg-zinc-100 text-zinc-900 rounded-full font-semibold hover:bg-zinc-200 transition-colors">
            Upload Work
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Vibrant colors that pop against neutral backgrounds"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-xl overflow-hidden shadow-sm"
            labelClassName="font-semibold text-sm text-zinc-900"
            hexClassName="text-xs text-zinc-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Masonry Demo */}
      <ShowcaseSection
        title="Masonry Gallery"
        subtitle="Cards flow naturally with varying heights"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["All", "Design", "Photography", "Illustration", "3D"].map((tab, i) => (
              <button
                key={tab}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                  i === 0
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="break-inside-avoid mb-4 group"
              >
                <div className={`relative ${card.height} bg-gradient-to-br ${card.color} rounded-xl overflow-hidden`}>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-between p-4 opacity-0 group-hover:opacity-100">
                    <div className="text-white">
                      <h3 className="font-semibold">{card.title}</h3>
                      <p className="text-sm text-white/70">by Designer</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Bookmark className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card footer */}
                <div className="flex items-center justify-between px-1 py-2">
                  <div className="flex items-center gap-3 text-zinc-500 text-sm">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" /> {card.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {card.likes * 3}
                    </span>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-10 text-center">
            <button className="px-8 py-3 bg-white text-zinc-900 rounded-full font-semibold hover:bg-zinc-50 transition-colors shadow-sm border border-zinc-200">
              Load More
            </button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Card Variants */}
      <ShowcaseSection
        title="Card Variants"
        subtitle="Different card styles for various content types"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {/* Image Card */}
            <div className="break-inside-avoid mb-4 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-violet-400 to-purple-500" />
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900">Image Card</h3>
                <p className="text-zinc-600 text-sm">Full-width image with text below</p>
              </div>
            </div>

            {/* Quote Card */}
            <div className="break-inside-avoid mb-4 p-6 bg-zinc-900 rounded-xl text-white">
              <p className="text-lg italic mb-4">&ldquo;Design is not just what it looks like. Design is how it works.&rdquo;</p>
              <p className="text-zinc-400 text-sm">- Steve Jobs</p>
            </div>

            {/* Stats Card */}
            <div className="break-inside-avoid mb-4 p-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl text-white">
              <p className="text-5xl font-bold mb-2">42K</p>
              <p className="text-white/80">Downloads this month</p>
            </div>

            {/* Profile Card */}
            <div className="break-inside-avoid mb-4 p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full mb-4" />
              <h3 className="font-semibold text-zinc-900">Jane Designer</h3>
              <p className="text-zinc-500 text-sm mb-3">UI/UX Designer</p>
              <button className="w-full py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors">
                Follow
              </button>
            </div>

            {/* Text Card */}
            <div className="break-inside-avoid mb-4 p-6 bg-amber-50 rounded-xl">
              <Sparkles className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold text-zinc-900 mb-2">Featured</h3>
              <p className="text-zinc-600 text-sm">Highlighted content with icon and description text.</p>
            </div>

            {/* Link Card */}
            <div className="break-inside-avoid mb-4 p-4 bg-white rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900">Resources</h3>
                <p className="text-zinc-500 text-sm">Download assets</p>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for Masonry layouts"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-5 bg-white rounded-xl shadow-sm">
                <h4 className="font-semibold text-zinc-900 mb-2">{rule.title}</h4>
                <p className="text-sm text-zinc-600">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Key Features */}
      <ShowcaseSection
        title="Layout Features"
        subtitle="What makes Masonry Flow special"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Layers, title: "Natural Flow", desc: "Cards arrange themselves based on content height" },
            { icon: Grid3X3, title: "Responsive Columns", desc: "Adapts from 1 to 4 columns based on screen size" },
            { icon: Camera, title: "Image Focused", desc: "Perfect for photo galleries and visual portfolios" },
            { icon: Palette, title: "Style Agnostic", desc: "Combines with any visual design style" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-zinc-50 rounded-xl">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                <item.icon className="w-6 h-6 text-zinc-700" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 mb-1">{item.title}</h3>
                <p className="text-sm text-zinc-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            Masonry Flow Showcase{" "}
            <Link href="/" className="text-zinc-900 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
