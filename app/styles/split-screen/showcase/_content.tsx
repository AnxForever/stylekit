"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Check,
  X,
  Zap,
  Target,
  Flame,
  Skull,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Neo-Brutalist color palette
const colors: ColorItem[] = [
  { name: "Black", hex: "#000000", bg: "bg-black" },
  { name: "White", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Hot Pink", hex: "#ff006e", bg: "bg-[#ff006e]" },
  { name: "Acid Green", hex: "#ccff00", bg: "bg-[#ccff00]" },
  { name: "Electric Blue", hex: "#00d4ff", bg: "bg-[#00d4ff]" },
];

// Design rules
const designRules = [
  { title: "HARD EDGES", desc: "No rounded corners. Ever. rounded-none only." },
  { title: "THICK BORDERS", desc: "border-4 border-black for brutal definition" },
  { title: "HARD SHADOWS", desc: "shadow-[8px_8px_0_0_#000] offset shadows" },
  { title: "HIGH CONTRAST", desc: "Black + white + one accent color" },
  { title: "BOLD TYPE", desc: "Uppercase, heavy weights, tight tracking" },
  { title: "RAW AESTHETIC", desc: "Embrace imperfection and rawness" },
];

export default function ShowcaseContent() {
  const [selectedPlan, setSelectedPlan] = useState(1);

  return (
    <div className="min-h-screen bg-[#ccff00]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black border-b-4 border-[#ccff00]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/split-screen"
            className="flex items-center gap-2 text-white hover:text-[#ccff00] transition-colors font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <span className="font-black text-2xl text-[#ccff00] uppercase tracking-tighter">SPLIT//SCREEN</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#ff006e] text-white font-bold uppercase text-sm border-2 border-white hover:bg-white hover:text-black transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Split Screen */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16">
        {/* Left Panel - Black */}
        <div className="relative min-h-[50vh] lg:min-h-screen bg-black flex items-center justify-center p-8 lg:p-16 border-r-0 lg:border-r-4 border-[#ccff00]">
          <div className="max-w-lg">
            <div className="inline-block px-4 py-2 bg-[#ff006e] text-white font-bold uppercase text-sm mb-8 border-4 border-white shadow-[4px_4px_0_0_#fff]">
              Neo-Brutalist Layout
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-none uppercase tracking-tighter">
              TWO SIDES.<br />
              <span className="text-[#ccff00]">ONE STORY.</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 font-medium">
              Create visual tension and narrative flow by dividing the viewport into contrasting sections. No compromises.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#ccff00] text-black font-black uppercase border-4 border-white shadow-[8px_8px_0_0_#fff] hover:shadow-[4px_4px_0_0_#fff] hover:translate-x-1 hover:translate-y-1 transition-all">
                Get Started
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-bold uppercase border-4 border-white hover:bg-white hover:text-black transition-colors flex items-center gap-2">
                <Play className="w-5 h-5" /> Watch
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Acid Green */}
        <div className="min-h-[50vh] lg:min-h-screen bg-[#ccff00] flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-lg">
            <div className="text-[150px] font-black text-black/10 leading-none mb-4">01</div>
            <h2 className="text-4xl font-black text-black mb-4 uppercase tracking-tight">Visual Contrast</h2>
            <p className="text-black/70 mb-6 text-lg font-medium">
              The split layout creates a powerful visual dichotomy. Perfect for comparing options, telling stories, or highlighting key information.
            </p>
            <ul className="space-y-3">
              {["Brand storytelling", "Product comparisons", "Before & after", "Dual CTAs"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-black font-bold uppercase">
                  <div className="w-6 h-6 bg-black flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#ccff00]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR SYSTEM"
        subtitle="High contrast pairs for maximum impact"
        className="py-20 px-6 bg-white border-y-4 border-black"
        titleClassName="text-4xl font-black text-black mb-4 text-center uppercase tracking-tight"
        subtitleClassName="text-black/60 mb-10 text-center font-medium uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-4 border-black shadow-[4px_4px_0_0_#000]"
            labelClassName="font-black text-sm text-black uppercase"
            hexClassName="text-xs text-black/50 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Product Comparison Split */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Option A - Reject */}
        <div
          className={`relative min-h-[50vh] lg:min-h-screen bg-black flex items-center justify-center p-8 lg:p-16 cursor-pointer transition-all border-r-0 lg:border-r-4 border-[#ff006e] ${
            selectedPlan === 0 ? "lg:flex-[1.2]" : "lg:flex-[0.8]"
          }`}
          onClick={() => setSelectedPlan(0)}
        >
          <div className="text-center text-white max-w-md">
            <div className="w-20 h-20 bg-[#ff006e] border-4 border-white flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_0_#fff]">
              <X className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black mb-4 uppercase">Basic</h2>
            <div className="text-6xl font-black mb-2">$0<span className="text-xl text-white/60">/mo</span></div>
            <p className="text-white/60 mb-6 uppercase tracking-wider">For the weak</p>
            <ul className="space-y-3 text-left mb-8">
              {["Limited features", "No support", "Ads everywhere"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/60">
                  <X className="w-4 h-4 text-[#ff006e]" />
                  <span className="line-through">{item}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 font-black uppercase border-4 transition-all ${
              selectedPlan === 0
                ? "bg-[#ff006e] text-white border-white shadow-[4px_4px_0_0_#fff]"
                : "bg-transparent text-white/50 border-white/30 hover:border-white"
            }`}>
              {selectedPlan === 0 ? "Selected" : "Choose Basic"}
            </button>
          </div>
        </div>

        {/* Option B - Accept */}
        <div
          className={`relative min-h-[50vh] lg:min-h-screen bg-[#ccff00] flex items-center justify-center p-8 lg:p-16 cursor-pointer transition-all ${
            selectedPlan === 1 ? "lg:flex-[1.2]" : "lg:flex-[0.8]"
          }`}
          onClick={() => setSelectedPlan(1)}
        >
          <div className="absolute top-8 right-8 px-4 py-2 bg-black text-[#ccff00] font-black uppercase text-sm border-4 border-black shadow-[4px_4px_0_0_#000]">
            Best Choice
          </div>
          <div className="text-center text-black max-w-md">
            <div className="w-20 h-20 bg-black border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_0_#ff006e]">
              <Flame className="w-10 h-10 text-[#ff006e]" />
            </div>
            <h2 className="text-4xl font-black mb-4 uppercase">Pro</h2>
            <div className="text-6xl font-black mb-2">$29<span className="text-xl text-black/60">/mo</span></div>
            <p className="text-black/60 mb-6 uppercase tracking-wider">For the bold</p>
            <ul className="space-y-3 text-left mb-8">
              {["Unlimited everything", "24/7 support", "No ads ever", "Priority access"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-black font-bold">
                  <div className="w-5 h-5 bg-black flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#ccff00]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 font-black uppercase border-4 transition-all ${
              selectedPlan === 1
                ? "bg-black text-[#ccff00] border-black shadow-[4px_4px_0_0_#ff006e]"
                : "bg-transparent text-black/50 border-black/30 hover:border-black"
            }`}>
              {selectedPlan === 1 ? "Selected" : "Choose Pro"}
            </button>
          </div>
        </div>
      </section>

      {/* Design Rules */}
      <ShowcaseSection
        title="DESIGN RULES"
        subtitle="Key principles for Split Screen layouts"
        className="py-20 px-6 bg-black"
        titleClassName="text-4xl font-black text-white mb-4 text-center uppercase tracking-tight"
        subtitleClassName="text-white/60 mb-10 text-center font-medium uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-5 bg-[#ccff00] border-4 border-white shadow-[4px_4px_0_0_#fff]">
                <h4 className="font-black text-black mb-2 uppercase">{rule.title}</h4>
                <p className="text-sm text-black/70 font-medium">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* 60/40 Split Example */}
      <section className="min-h-[80vh] grid grid-cols-1 lg:grid-cols-[60fr_40fr]">
        {/* Left - Visual */}
        <div className="min-h-[40vh] lg:min-h-full bg-[#ff006e] flex items-center justify-center p-8 border-r-0 lg:border-r-4 border-black">
          <div className="text-white text-center">
            <div className="text-[120px] font-black leading-none">60%</div>
            <p className="text-2xl font-bold uppercase tracking-wider">Visual Panel</p>
          </div>
        </div>

        {/* Right - Content */}
        <div className="min-h-[40vh] lg:min-h-full bg-white flex items-center p-8 lg:p-12 border-t-4 lg:border-t-0 border-black">
          <div>
            <span className="inline-block px-3 py-1 bg-[#ff006e] text-white font-bold uppercase text-sm mb-4 border-2 border-black">
              Asymmetric
            </span>
            <h2 className="text-4xl font-black text-black mt-2 mb-4 uppercase">60/40 Ratio</h2>
            <p className="text-black/70 mb-6 font-medium">
              Unequal splits create visual hierarchy, giving more emphasis to one side. Use 60/40 or 70/30 ratios for emphasis.
            </p>
            <button className="px-6 py-3 bg-black text-white font-black uppercase border-4 border-black shadow-[4px_4px_0_0_#ff006e] hover:shadow-[2px_2px_0_0_#ff006e] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Learn More <ArrowRight className="w-4 h-4 inline ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <ShowcaseSection
        title="USE CASES"
        subtitle="When to use Split Screen layout"
        className="py-20 px-6 bg-[#ccff00] border-y-4 border-black"
        titleClassName="text-4xl font-black text-black mb-4 text-center uppercase tracking-tight"
        subtitleClassName="text-black/60 mb-10 text-center font-medium uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          {[
            { icon: Target, title: "Product Showcases", desc: "Image on one side, details on the other" },
            { icon: Zap, title: "A/B Comparisons", desc: "Side-by-side feature or pricing comparison" },
            { icon: Skull, title: "Brand Stories", desc: "Visual narrative with supporting content" },
            { icon: Flame, title: "Landing Pages", desc: "Hero sections with split visual impact" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white border-4 border-black shadow-[4px_4px_0_0_#000]">
              <div className="w-14 h-14 bg-black flex items-center justify-center shrink-0">
                <item.icon className="w-7 h-7 text-[#ccff00]" />
              </div>
              <div>
                <h3 className="font-black text-black mb-1 uppercase">{item.title}</h3>
                <p className="text-sm text-black/60 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t-4 border-black bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/50 text-sm font-bold uppercase tracking-wider">
            Split Screen Showcase{" "}
            <Link href="/" className="text-[#ccff00] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
