"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowDown,
  Play,
  Sparkles,
  Zap,
  Globe,
  Shield,
  ChevronRight,
  Star,
  Check,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Hero Fullscreen 配色
const colors: ColorItem[] = [
  { name: "White", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Black", hex: "#000000", bg: "bg-black" },
  { name: "Coral", hex: "#ff6b6b", bg: "bg-[#ff6b6b]" },
  { name: "Teal", hex: "#4ecdc4", bg: "bg-[#4ecdc4]" },
  { name: "Purple", hex: "#6c5ce7", bg: "bg-[#6c5ce7]" },
];

// 设计规则
const designRules = [
  { title: "全屏高度", desc: "min-h-screen 或 h-screen 确保占满视口" },
  { title: "背景覆盖", desc: "object-cover 保持图片比例填充" },
  { title: "遮罩层", desc: "渐变或半透明遮罩保证文字可读" },
  { title: "内容居中", desc: "flex items-center justify-center 居中内容" },
  { title: "滚动提示", desc: "底部添加滚动指示器引导用户" },
  { title: "视频静音", desc: "视频背景必须 muted autoplay loop" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen">
      {/* Hero Section 1 - Gradient Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-700" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/styles/hero-fullscreen"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Docs</span>
            </Link>
            <span className="font-bold text-xl text-white">Hero Fullscreen</span>
            <Link
              href="/styles"
              className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-full text-sm hover:bg-white/20 transition-colors"
            >
              All Styles
            </Link>
          </div>
        </nav>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Fullscreen Hero Layout</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Make a Bold<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300">
              First Impression
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
            Capture attention instantly with full-viewport hero sections that create immersive brand experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 font-semibold text-lg rounded-full hover:bg-white/90 transition-colors shadow-lg">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold text-lg rounded-full border border-white/30 hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
              <Play className="w-5 h-5" /> Watch Demo
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 animate-bounce">
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="High contrast for text readability on dramatic backgrounds"
        className="py-20 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden shadow-sm"
            labelClassName="font-semibold text-sm text-zinc-900"
            hexClassName="text-xs text-zinc-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Hero Section 2 - Dark with Overlay */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Dark & Dramatic
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-xl mx-auto">
            Dark backgrounds with gradient overlays create mystery and focus attention on your message.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Zap, title: "High Impact", desc: "Instant visual grab" },
              { icon: Globe, title: "Brand Focus", desc: "Reinforce identity" },
              { icon: Shield, title: "Memorable", desc: "Lasting impression" },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
                <item.icon className="w-10 h-10 text-purple-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for Fullscreen Hero layouts"
        className="py-20 px-6 bg-zinc-50"
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

      {/* Hero Section 3 - Light with CTA */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100">
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>New Release</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 leading-tight">
              Light Heroes Work Too
            </h2>
            <p className="text-xl text-zinc-600 mb-8">
              Not all heroes need dark backgrounds. Light, warm gradients create inviting, friendly experiences.
            </p>
            <ul className="space-y-3 mb-8">
              {["Approachable brand feel", "Great for lifestyle products", "Warm and inviting"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700">
                  <Check className="w-5 h-5 text-amber-600" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="px-8 py-4 bg-zinc-900 text-white font-semibold rounded-full hover:bg-zinc-800 transition-colors">
              Explore Now <ChevronRight className="w-5 h-5 inline ml-1" />
            </button>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900">4.9</div>
                <div className="flex gap-0.5 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overlay Types */}
      <ShowcaseSection
        title="Overlay Variations"
        subtitle="Different overlay styles for different moods"
        className="py-20 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Solid Overlay */}
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
              <h3 className="font-bold text-lg mb-2">Solid Overlay</h3>
              <p className="text-sm text-white/70 text-center">bg-black/50</p>
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
              <h3 className="font-bold text-lg mb-2">Gradient Overlay</h3>
              <p className="text-sm text-white/70 text-center">from-black/80 to-transparent</p>
            </div>
          </div>

          {/* Color Tint Overlay */}
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-zinc-800" />
            <div className="absolute inset-0 bg-purple-600/60 mix-blend-multiply" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
              <h3 className="font-bold text-lg mb-2">Color Tint</h3>
              <p className="text-sm text-white/70 text-center">mix-blend-multiply</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* CTA Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50" />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Start building stunning fullscreen heroes that captivate your audience.
          </p>
          <button className="px-10 py-5 bg-white text-zinc-900 font-semibold text-lg rounded-full hover:bg-zinc-100 transition-colors shadow-lg">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            Hero Fullscreen Showcase{" "}
            <Link href="/" className="text-zinc-900 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
