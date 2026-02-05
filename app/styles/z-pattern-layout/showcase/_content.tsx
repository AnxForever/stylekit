"use client";

import Link from "next/link";
import { ArrowLeft, Zap, ChevronRight, Check, Star, Users, ArrowRight } from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Primary", hex: "#6366f1", bg: "bg-[#6366f1]" },
  { name: "Dark", hex: "#0f172a", bg: "bg-[#0f172a]" },
  { name: "Background", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Light", hex: "#f1f5f9", bg: "bg-[#f1f5f9]" },
  { name: "Text", hex: "#334155", bg: "bg-[#334155]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/z-pattern-layout"
            className="flex items-center gap-2 text-gray-600 hover:text-[#6366f1] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <span className="font-bold text-xl text-[#0f172a]">Z-Pattern Layout</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#6366f1] text-white font-semibold text-sm rounded-lg hover:bg-[#5558e3] transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Z-Pattern Demo Section */}
      <section className="relative">
        {/* Z Path visualization overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 10,15 L 90,15 L 10,85 L 90,85" stroke="#6366f1" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Point 1: Top Left - Logo/Brand */}
        <div className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Left: Brand/Hook */}
              <div className="md:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6366f1]/10 rounded-full text-[#6366f1] text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  Z-Pattern Landing
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
                  Guide Users Through Your Story
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  The Z-pattern follows the natural eye movement for landing pages, creating a clear path from introduction to action.
                </p>
                {/* Point 2: Top Right - CTA */}
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-[#6366f1] text-white font-semibold rounded-lg shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/30 transition-all">
                    Get Started Free <ChevronRight className="w-5 h-5 inline ml-1" />
                  </button>
                  <button className="px-8 py-4 bg-white text-[#0f172a] font-semibold rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* Right: Visual */}
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-[#6366f1] to-[#a855f7] rounded-3xl shadow-2xl" />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#f1f5f9] rounded-2xl border border-gray-100" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal content - Middle of Z */}
        <div className="px-6 py-16 bg-[#f8fafc]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0f172a] mb-4">Why Choose Z-Pattern?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Content flows naturally from top-left to bottom-right, matching Western reading patterns.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Star, title: "Natural Flow", desc: "Follows eye movement patterns from research" },
                { icon: Users, title: "Higher Engagement", desc: "Users process information more effectively" },
                { icon: Zap, title: "Better Conversions", desc: "Clear path leads to action" },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#6366f1]/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-[#6366f1]" />
                  </div>
                  <h3 className="font-semibold text-[#0f172a] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Point 3 & 4: Bottom of Z */}
        <div className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* Left: Trust/Social Proof */}
              <div className="md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0f172a]">10,000+ users</p>
                    <p className="text-sm text-gray-500">Already using this layout</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["Eye-tracking optimized", "Conversion focused", "Mobile responsive"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Final CTA */}
              <div className="md:w-1/2">
                <div className="p-8 bg-[#0f172a] rounded-2xl text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Convert?</h3>
                  <p className="text-gray-400 mb-6">Start using the Z-pattern today and watch your conversions grow.</p>
                  <button className="w-full py-4 bg-[#6366f1] rounded-lg font-semibold hover:bg-[#5558e3] transition-colors flex items-center justify-center gap-2">
                    Start Free Trial <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-sm text-gray-500 mt-4">No credit card required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Clean, conversion-focused palette"
        className="py-12 px-6 bg-[#f8fafc] border-y border-gray-100"
        titleClassName="text-2xl font-bold text-[#0f172a] mb-3 text-center"
        subtitleClassName="text-gray-600 mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden shadow-sm"
            labelClassName="font-semibold text-sm text-[#0f172a]"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Z-Pattern Rules */}
      <ShowcaseSection
        title="Z-Pattern Principles"
        subtitle="Key points on the visual path"
        className="py-12 px-6"
        titleClassName="text-2xl font-bold text-[#0f172a] mb-3 text-center"
        subtitleClassName="text-gray-600 mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "1", pos: "Top Left", content: "Logo & Brand" },
              { num: "2", pos: "Top Right", content: "Navigation / CTA" },
              { num: "3", pos: "Bottom Left", content: "Trust / Social Proof" },
              { num: "4", pos: "Bottom Right", content: "Final CTA" },
            ].map((item) => (
              <div key={item.num} className="p-4 bg-white rounded-xl border border-gray-100 text-center">
                <div className="w-8 h-8 bg-[#6366f1] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {item.num}
                </div>
                <p className="font-semibold text-[#0f172a] text-sm">{item.pos}</p>
                <p className="text-gray-500 text-xs mt-1">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Z-Pattern Layout Showcase · Part of{" "}
            <Link href="/" className="text-[#6366f1] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
