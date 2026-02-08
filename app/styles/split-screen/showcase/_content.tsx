"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Check,
  Star,
  Zap,
  Shield,
  Target,
  Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Split Screen 閰嶈壊
const colors: ColorItem[] = [
  { name: "Dark", hex: "#0f0f0f", bg: "bg-[#0f0f0f]" },
  { name: "Light", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Red", hex: "#ff4757", bg: "bg-[#ff4757]" },
  { name: "Green", hex: "#2ed573", bg: "bg-[#2ed573]" },
  { name: "Blue", hex: "#1e90ff", bg: "bg-[#1e90ff]" },
];

// 璁捐瑙勫垯
const designRules = [
  { title: "Split layout", desc: "Use grid grid-cols-1 lg:grid-cols-2 for the two panels." },
  { title: "Mobile stacking", desc: "Stack panels vertically on small screens." },
  { title: "Contrast panels", desc: "Use contrasting colors to emphasize the split." },
  { title: "Visual balance", desc: "Keep weight balanced across both sides." },
  { title: "Full height", desc: "Use min-h-screen to fill the viewport." },
  { title: "Centered content", desc: "Use flex utilities to center content." },
];

export default function ShowcaseContent() {
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/split-screen"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <Link
            href="/styles"
            className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-full text-sm hover:bg-white/20 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Split Screen */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel - Dark */}
        <div className="relative min-h-[50vh] lg:min-h-screen bg-zinc-900 flex items-center justify-center p-8 lg:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30" />
          <div className="relative z-10 max-w-lg">
            {/* 瑙嗚椋庢牸鏍囨敞 */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/70 text-xs mb-4">
              <Palette className="w-3.5 h-3.5" />
              <span>瑙嗚椋庢牸: Modern Gradient</span>
            </div>
            <span className="inline-block px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm mb-6">
              Split Screen Layout
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Two Sides,<br />One Story
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Create visual tension and narrative flow by dividing the viewport into contrasting sections.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white text-zinc-900 font-semibold rounded-lg hover:bg-zinc-100 transition-colors">
                Get Started
              </button>
              <button className="px-6 py-3 text-white font-semibold flex items-center gap-2 hover:text-white/80 transition-colors">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Light */}
        <div className="min-h-[50vh] lg:min-h-screen bg-white flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-lg">
            <div className="text-8xl font-bold text-zinc-200 mb-6">01</div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Visual Contrast</h2>
            <p className="text-zinc-600 mb-6">
              The split layout creates a powerful visual dichotomy, perfect for comparing options, telling stories, or highlighting key information.
            </p>
            <ul className="space-y-3">
              {["Brand storytelling", "Product comparisons", "Before & after", "Dual CTAs"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700">
                  <Check className="w-5 h-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="High contrast pairs for maximum impact"
        className="py-20 px-6 bg-zinc-50"
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

      {/* Product Comparison Split */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Option A */}
        <div
          className={`relative min-h-[50vh] lg:min-h-screen bg-zinc-900 flex items-center justify-center p-8 lg:p-16 cursor-pointer transition-all ${
            selectedPlan === 0 ? "lg:flex-[1.2]" : "lg:flex-[0.8]"
          }`}
          onClick={() => setSelectedPlan(0)}
        >
          <div className="text-center text-white max-w-md">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Starter Plan</h2>
            <div className="text-5xl font-bold mb-2">$9<span className="text-xl text-white/60">/mo</span></div>
            <p className="text-white/60 mb-6">Perfect for individuals</p>
            <ul className="space-y-3 text-left mb-8">
              {["5 Projects", "Basic Analytics", "Email Support"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <Check className="w-4 h-4 text-green-400" />
                  {item}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-lg font-semibold transition-colors ${
              selectedPlan === 0
                ? "bg-white text-zinc-900"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}>
              {selectedPlan === 0 ? "Selected" : "Choose Starter"}
            </button>
          </div>
        </div>

        {/* Option B */}
        <div
          className={`relative min-h-[50vh] lg:min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-8 lg:p-16 cursor-pointer transition-all ${
            selectedPlan === 1 ? "lg:flex-[1.2]" : "lg:flex-[0.8]"
          }`}
          onClick={() => setSelectedPlan(1)}
        >
          <div className="absolute top-8 right-8 px-3 py-1 bg-white/20 text-white rounded-full text-sm">
            Popular
          </div>
          <div className="text-center text-white max-w-md">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Pro Plan</h2>
            <div className="text-5xl font-bold mb-2">$29<span className="text-xl text-white/60">/mo</span></div>
            <p className="text-white/60 mb-6">For growing teams</p>
            <ul className="space-y-3 text-left mb-8">
              {["Unlimited Projects", "Advanced Analytics", "Priority Support", "Custom Domain"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <Check className="w-4 h-4 text-green-300" />
                  {item}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-lg font-semibold transition-colors ${
              selectedPlan === 1
                ? "bg-white text-blue-600"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}>
              {selectedPlan === 1 ? "Selected" : "Choose Pro"}
            </button>
          </div>
        </div>
      </section>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for Split Screen layouts"
        className="py-20 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-5 bg-zinc-50 rounded-xl">
                <h4 className="font-semibold text-zinc-900 mb-2">{rule.title}</h4>
                <p className="text-sm text-zinc-600">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* 60/40 Split Example */}
      <section className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-[60fr_40fr]">
        {/* Left - Image */}
        <div className="min-h-[40vh] lg:min-h-full bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center p-8">
          <div className="text-white text-center">
            <div className="text-6xl font-bold mb-4">60%</div>
            <p className="text-xl text-white/80">Visual Panel</p>
          </div>
        </div>

        {/* Right - Content */}
        <div className="min-h-[40vh] lg:min-h-full bg-zinc-100 flex items-center p-8 lg:p-12">
          <div>
            <span className="text-sm font-semibold text-rose-500 uppercase tracking-wider">Asymmetric Split</span>
            <h2 className="text-3xl font-bold text-zinc-900 mt-2 mb-4">60/40 Ratio</h2>
            <p className="text-zinc-600 mb-6">
              Unequal splits create visual hierarchy, giving more emphasis to one side. Use 60/40 or 70/30 ratios for emphasis.
            </p>
            <button className="px-6 py-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-800 transition-colors">
              Learn More <ArrowRight className="w-4 h-4 inline ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <ShowcaseSection
        title="Use Cases"
        subtitle="When to use Split Screen layout"
        className="py-20 px-6 bg-zinc-50"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Target, title: "Product Showcases", desc: "Image on one side, details on the other" },
            { icon: Zap, title: "A/B Comparisons", desc: "Side-by-side feature or pricing comparison" },
            { icon: Shield, title: "Brand Stories", desc: "Visual narrative with supporting content" },
            { icon: Star, title: "Landing Pages", desc: "Hero sections with split visual impact" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center shrink-0">
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
            Split Screen Showcase{" "}
            <Link href="/" className="text-zinc-900 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}


