"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Star, Zap, Shield } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Primary", hex: "#6200ee", bg: "bg-[#6200ee]" },
  { name: "Secondary", hex: "#03dac6", bg: "bg-[#03dac6]" },
  { name: "Error", hex: "#b00020", bg: "bg-[#b00020]" },
  { name: "Surface", hex: "#ffffff", bg: "bg-white" },
  { name: "Background", hex: "#fafafa", bg: "bg-[#fafafa]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Overview", "Features", "Pricing"];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* App Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#6200ee] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)] flex items-center px-6 z-50">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/styles/material-design"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-white font-medium text-xl">Material Design</span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Material Design"
        description="Build beautiful, usable products faster with Material Design - Google's open-source design system."
        className="pt-32 pb-16 px-6 text-center bg-gradient-to-br from-[#6200ee] via-[#7c4dff] to-[#b388ff]"
        titleClassName="text-5xl md:text-6xl font-bold text-white mb-6"
        descriptionClassName="text-xl text-white/80 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-white text-[#6200ee] font-medium rounded-full shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14)] hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.2),0_8px_10px_1px_rgba(0,0,0,0.14)] transition-all uppercase tracking-wider text-sm">
            Get Started
          </button>
          <button className="px-6 py-3 border-2 border-white/50 text-white font-medium rounded-full hover:bg-white/10 transition-all uppercase tracking-wider text-sm">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Tabs */}
      <div className="bg-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_6px_-1px_rgba(0,0,0,0.1)] sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-4 font-medium text-sm uppercase tracking-wider transition-colors relative ${
                  activeTab === i ? "text-[#6200ee]" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
                {activeTab === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6200ee]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Bold and intentional"
        className="py-16 px-6"
        titleClassName="text-3xl font-medium text-gray-900 mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]"
            labelClassName="font-medium text-sm text-gray-900"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Elevation and ripple"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-medium text-gray-900 mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#fafafa] rounded-xl">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-6">Button Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#6200ee] text-white font-medium uppercase tracking-wider text-sm rounded-full shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14)] hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.2),0_8px_10px_1px_rgba(0,0,0,0.14)] hover:bg-[#7c4dff] transition-all">
                Contained
              </button>
              <button className="px-6 py-3 border-2 border-[#6200ee] text-[#6200ee] font-medium uppercase tracking-wider text-sm rounded-full hover:bg-[#6200ee]/10 transition-all">
                Outlined
              </button>
              <button className="px-6 py-3 text-[#6200ee] font-medium uppercase tracking-wider text-sm rounded-full hover:bg-[#6200ee]/10 transition-all">
                Text
              </button>
              <button className="px-6 py-3 bg-[#03dac6] text-black font-medium uppercase tracking-wider text-sm rounded-full shadow-md hover:shadow-lg transition-all">
                Secondary
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Elevation system"
        className="py-16 px-6"
        titleClassName="text-3xl font-medium text-gray-900 mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] transition-shadow duration-300 overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-[#6200ee] to-[#b388ff] flex items-center justify-center">
              <Zap className="w-16 h-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Fast</h3>
              <p className="text-gray-600 mb-4">Lightning-fast performance with optimized rendering.</p>
              <button className="text-[#6200ee] font-medium uppercase tracking-wider text-sm hover:bg-[#6200ee]/10 px-4 py-2 -ml-4 rounded transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] transition-shadow duration-300 overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-[#03dac6] to-[#018786] flex items-center justify-center">
              <Star className="w-16 h-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Beautiful</h3>
              <p className="text-gray-600 mb-4">Stunning designs that users love and remember.</p>
              <button className="text-[#6200ee] font-medium uppercase tracking-wider text-sm hover:bg-[#6200ee]/10 px-4 py-2 -ml-4 rounded transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] transition-shadow duration-300 overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-[#7c4dff] to-[#651fff] flex items-center justify-center">
              <Shield className="w-16 h-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Reliable</h3>
              <p className="text-gray-600 mb-4">Consistent behavior across all platforms.</p>
              <button className="text-[#6200ee] font-medium uppercase tracking-wider text-sm hover:bg-[#6200ee]/10 px-4 py-2 -ml-4 rounded transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Form Elements"
        subtitle="Floating labels"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-medium text-gray-900 mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-[#fafafa] rounded-xl">
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 bg-gray-100 border-0 border-b-2 border-gray-300 rounded-t-lg text-gray-900 focus:outline-none focus:border-[#6200ee] focus:bg-gray-50 transition-all"
                />
                <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 bg-gray-100 border-0 border-b-2 border-gray-300 rounded-t-lg text-gray-900 focus:outline-none focus:border-[#6200ee] focus:bg-gray-50 transition-all"
                />
                <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                  Password
                </label>
              </div>
              <button className="w-full py-3 bg-[#6200ee] text-white font-medium uppercase tracking-wider text-sm rounded-full shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14)] hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.2),0_8px_10px_1px_rgba(0,0,0,0.14)] hover:bg-[#7c4dff] transition-all">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* List */}
      <ShowcaseSection
        title="Lists"
        subtitle="With icons and actions"
        className="py-16 px-6"
        titleClassName="text-3xl font-medium text-gray-900 mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] overflow-hidden">
            {["Inbox", "Starred", "Send email", "Drafts"].map((item) => (
              <div
                key={item}
                className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer border-b border-gray-100 last:border-0"
              >
                <div className="w-10 h-10 bg-[#6200ee]/10 rounded-full flex items-center justify-center mr-4">
                  <Check className="w-5 h-5 text-[#6200ee]" />
                </div>
                <span className="text-gray-900">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* FAB */}
      <button className="fixed right-6 bottom-6 w-14 h-14 bg-[#03dac6] rounded-full shadow-[0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12),0_3px_5px_-1px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_10px_1px_rgba(0,0,0,0.14),0_3px_14px_2px_rgba(0,0,0,0.12),0_5px_5px_-3px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all hover:scale-105 z-50">
        <span className="text-black text-2xl">+</span>
      </button>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            Material Design Showcase{" "}
            <Link href="/" className="text-[#6200ee] hover:underline transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
