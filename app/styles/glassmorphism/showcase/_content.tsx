"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Palette, Zap, Smartphone, Check, X, Bell, User, Settings, ChevronDown } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Glassmorphism 配色
const colors: ColorItem[] = [
  { name: "Purple", hex: "#9333ea", bg: "bg-purple-600" },
  { name: "Pink", hex: "#ec4899", bg: "bg-pink-500" },
  { name: "Orange", hex: "#f97316", bg: "bg-orange-500" },
  { name: "Glass", hex: "rgba(255,255,255,0.15)", bg: "bg-white/15" },
  { name: "Border", hex: "rgba(255,255,255,0.2)", bg: "bg-white/20" },
];

// 设计规则
const designRules = [
  { title: "Backdrop Blur", desc: "Use backdrop-blur-xl for frosted glass effect" },
  { title: "Semi-transparent", desc: "bg-white/10 to bg-white/20 opacity" },
  { title: "Subtle Borders", desc: "border-white/20 for layered depth" },
  { title: "Gradient Background", desc: "Vibrant gradients as the base layer" },
  { title: "Rounded Corners", desc: "rounded-2xl or rounded-3xl" },
  { title: "Shadow Depth", desc: "shadow-xl enhances 3D effect" },
];

export default function ShowcaseContent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/glassmorphism"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-white">Glassmorphism</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white text-sm hover:bg-white/30 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Glassmorphism"
        description="Semi-transparent frosted glass effect with backdrop-blur, creating modern layered interfaces with depth and elegance."
        className="pt-32 pb-20 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-bold text-white mb-6"
        descriptionClassName="text-xl text-white/80 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all shadow-lg">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-white/90 transition-all shadow-lg">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Vibrant gradients with semi-transparent overlays"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20"
            labelClassName="font-semibold text-sm text-white"
            hexClassName="text-xs text-white/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Glass buttons with subtle borders and hover effects"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all">
                Glass Primary
              </button>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-all">
                Solid
              </button>
              <button className="px-6 py-3 border border-white/30 rounded-xl text-white font-semibold hover:bg-white/10 transition-all">
                Outline
              </button>
              <button className="px-6 py-3 text-white/80 hover:text-white transition-all">
                Ghost
              </button>
            </div>

            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6 mt-10">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-4 py-2 text-sm bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition-all">
                Small
              </button>
              <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all">
                Medium
              </button>
              <button className="px-8 py-4 text-lg bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white font-semibold hover:bg-white/30 transition-all">
                Large
              </button>
            </div>

            <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-6 mt-10">Pill Buttons</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all">
                Pill Glass
              </button>
              <button className="px-8 py-3 bg-white rounded-full text-purple-600 font-semibold hover:bg-white/90 transition-all">
                Pill Solid
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Layered glass cards with depth and hover effects"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Design System</h3>
            <p className="text-white/70">Complete design specifications and component library for modern interfaces</p>
          </div>

          <div className="p-6 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Performance</h3>
            <p className="text-white/70">Optimized CSS implementation ensuring smooth animations and transitions</p>
          </div>

          <div className="p-6 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Responsive</h3>
            <p className="text-white/70">Perfect adaptation across all devices from mobile to desktop</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Form Elements"
        subtitle="Glass inputs with focus states and validation"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Contact Us</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Message</label>
                <textarea
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all resize-none"
                />
              </div>
              <button className="w-full py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Glass tab navigation with smooth transitions"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
            <div className="flex gap-2 p-1 bg-white/10 rounded-xl mb-6">
              {["Overview", "Features", "Pricing"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(i)}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    selectedTab === i
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4 bg-white/5 rounded-xl text-white/80">
              {selectedTab === 0 && "Overview content - Glass tabs provide a sleek way to organize content."}
              {selectedTab === 1 && "Features content - Smooth transitions and hover states enhance UX."}
              {selectedTab === 2 && "Pricing content - Clean presentation for pricing tiers."}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Dropdown */}
      <ShowcaseSection
        title="Dropdown"
        subtitle="Glass dropdown menus with blur effects"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-xs mx-auto">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white flex items-center justify-between hover:bg-white/15 transition-all"
            >
              <span>Select option</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-xl">
                {["Option 1", "Option 2", "Option 3"].map((opt) => (
                  <button
                    key={opt}
                    className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Glass notifications with status indicators"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
            <Bell className="w-5 h-5 text-white" />
            <span className="text-white flex-1">Default notification message</span>
            <button className="text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-xl">
            <Check className="w-5 h-5 text-green-300" />
            <span className="text-white flex-1">Success! Your changes have been saved.</span>
            <button className="text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 p-4 bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-xl">
            <X className="w-5 h-5 text-red-300" />
            <span className="text-white flex-1">Error! Something went wrong.</span>
            <button className="text-white/60 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Stats */}
      <ShowcaseSection
        title="Statistics"
        subtitle="Glass stat cards with emphasis"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/60">Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white/60">Components</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">99%</div>
                <div className="text-white/60">Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/60">Support</div>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for Glassmorphism design"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
                <h4 className="font-semibold text-white mb-2">{rule.title}</h4>
                <p className="text-sm text-white/70">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            Glassmorphism Showcase · Part of{" "}
            <Link href="/" className="text-white hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
