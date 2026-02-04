"use client";

import Link from "next/link";
import { ArrowLeft, Eye, TrendingUp, Clock, User, ChevronRight, Bookmark, Share2 } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Primary", hex: "#e63946", bg: "bg-[#e63946]" },
  { name: "Dark", hex: "#1a1a2e", bg: "bg-[#1a1a2e]" },
  { name: "Background", hex: "#f8f9fa", bg: "bg-[#f8f9fa]", border: true },
  { name: "Border", hex: "#e5e7eb", bg: "bg-[#e5e7eb]" },
  { name: "Text", hex: "#374151", bg: "bg-[#374151]" },
];

const articles = [
  { title: "Understanding the F-Pattern in Web Design", category: "UX Design", time: "5 min read", featured: true },
  { title: "How Users Read on the Web", category: "Research", time: "3 min read", featured: false },
  { title: "Optimizing Content for Scanners", category: "Content", time: "4 min read", featured: false },
  { title: "Eye-Tracking Studies Revealed", category: "Research", time: "6 min read", featured: false },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Navigation - F-pattern top bar */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/f-pattern-layout"
            className="flex items-center gap-2 text-[#374151] hover:text-[#e63946] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <span className="font-bold text-xl text-[#1a1a2e]">F-Pattern Layout</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#e63946] text-white font-semibold text-sm rounded-lg hover:bg-[#d62839] transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="F-Pattern Layout"
        description="Optimized for how users naturally scan content-heavy pages. The F-pattern follows the eye's natural reading path: left to right, then down."
        className="pt-16 pb-12 px-6 text-center"
        titleClassName="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-6"
        descriptionClassName="text-lg text-[#374151] max-w-2xl mx-auto mb-8"
      >
        <div className="flex items-center justify-center gap-2 text-[#e63946]">
          <Eye className="w-5 h-5" />
          <span className="font-medium">Eye-tracking optimized</span>
        </div>
      </ShowcaseHero>

      {/* F-Pattern Visualization */}
      <ShowcaseSection
        title="The F-Pattern"
        subtitle="How users scan content"
        className="py-12 px-6"
        titleClassName="text-2xl font-bold text-[#1a1a2e] mb-3 text-center"
        subtitleClassName="text-[#6b7280] mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl border border-[#e5e7eb] p-8 overflow-hidden">
            {/* F visualization */}
            <div className="absolute top-8 left-8 right-8 h-1 bg-[#e63946]/20 rounded" />
            <div className="absolute top-20 left-8 w-3/4 h-1 bg-[#e63946]/15 rounded" />
            <div className="absolute top-8 left-8 w-1 bottom-8 bg-[#e63946]/10 rounded" />

            {/* Content blocks following F */}
            <div className="space-y-6">
              {/* Top bar - full width scan */}
              <div className="flex items-center justify-between pb-6 border-b border-[#e5e7eb]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#e63946] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a2e]">Featured Story</h3>
                    <p className="text-sm text-[#6b7280]">Top headline gets full attention</p>
                  </div>
                </div>
                <span className="text-[#e63946] font-semibold">Breaking</span>
              </div>

              {/* Second row - shorter scan */}
              <div className="flex items-center gap-4 pb-6 border-b border-[#e5e7eb]">
                <div className="w-8 h-8 bg-[#f3f4f6] rounded flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#6b7280]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a1a2e]">Secondary content scanned partially</h4>
                  <p className="text-sm text-[#6b7280]">Users scan less of subsequent rows</p>
                </div>
              </div>

              {/* Vertical scan - left side only */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#e63946] rounded-full" />
                  <span className="text-[#374151]">Quick scan items</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#e63946] rounded-full" />
                  <span className="text-[#374151]">Left-aligned for visibility</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#e63946] rounded-full" />
                  <span className="text-[#374151]">Vertical scanning down</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Clean, content-focused palette"
        className="py-12 px-6 bg-white border-y border-[#e5e7eb]"
        titleClassName="text-2xl font-bold text-[#1a1a2e] mb-3 text-center"
        subtitleClassName="text-[#6b7280] mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden border border-[#e5e7eb]"
            labelClassName="font-semibold text-sm text-[#1a1a2e]"
            hexClassName="text-xs text-[#6b7280] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Article List Demo */}
      <ShowcaseSection
        title="Content List Example"
        subtitle="F-pattern optimized article layout"
        className="py-12 px-6"
        titleClassName="text-2xl font-bold text-[#1a1a2e] mb-3 text-center"
        subtitleClassName="text-[#6b7280] mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main content area - 2 columns */}
            <div className="md:col-span-2 space-y-4">
              {/* Featured article - gets most attention */}
              <article className="p-6 bg-white rounded-xl border border-[#e5e7eb] hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-[#e63946]/10 text-[#e63946] text-xs font-semibold rounded">Featured</span>
                  <span className="text-sm text-[#6b7280]">UX Design</span>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-2 hover:text-[#e63946] transition-colors cursor-pointer">
                  Understanding the F-Pattern in Web Design
                </h3>
                <p className="text-[#6b7280] mb-4">Learn how eye-tracking research has shaped modern web layouts and why content placement matters.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-[#6b7280]">
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> Author</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 5 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors">
                      <Bookmark className="w-4 h-4 text-[#6b7280]" />
                    </button>
                    <button className="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors">
                      <Share2 className="w-4 h-4 text-[#6b7280]" />
                    </button>
                  </div>
                </div>
              </article>

              {/* Regular articles - scanned vertically */}
              {articles.slice(1).map((article, i) => (
                <article key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#e5e7eb] hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-[#f3f4f6] rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-[#e63946] font-semibold">{article.category}</span>
                    <h4 className="font-semibold text-[#1a1a2e] truncate hover:text-[#e63946] transition-colors cursor-pointer">{article.title}</h4>
                    <span className="text-sm text-[#6b7280]">{article.time}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#9ca3af] shrink-0" />
                </article>
              ))}
            </div>

            {/* Sidebar - less attention */}
            <aside className="space-y-4">
              <div className="p-4 bg-white rounded-xl border border-[#e5e7eb]">
                <h4 className="font-semibold text-[#1a1a2e] mb-3">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {["UX", "Design", "Research", "Web", "UI"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[#f3f4f6] text-[#374151] text-sm rounded-full hover:bg-[#e5e7eb] cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#1a1a2e] rounded-xl text-white">
                <h4 className="font-semibold mb-2">Newsletter</h4>
                <p className="text-sm text-white/70 mb-3">Get weekly design tips</p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 bg-white/10 rounded-lg text-sm placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40"
                />
                <button className="w-full mt-2 py-2 bg-[#e63946] rounded-lg text-sm font-semibold hover:bg-[#d62839] transition-colors">
                  Subscribe
                </button>
              </div>
            </aside>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="F-Pattern Rules"
        subtitle="Key principles for this layout"
        className="py-12 px-6 bg-white border-y border-[#e5e7eb]"
        titleClassName="text-2xl font-bold text-[#1a1a2e] mb-3 text-center"
        subtitleClassName="text-[#6b7280] mb-8 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          {[
            { title: "Top row = priority", desc: "Place most important content in the first horizontal line" },
            { title: "Left-align key info", desc: "Critical elements should be on the left edge" },
            { title: "Decreasing importance", desc: "Content importance decreases as users scan down" },
            { title: "Visual anchors", desc: "Use icons and images to catch vertical scanning" },
          ].map((rule, i) => (
            <div key={i} className="p-4 bg-[#f8f9fa] rounded-lg border border-[#e5e7eb]">
              <h4 className="font-semibold text-[#1a1a2e] mb-1">{rule.title}</h4>
              <p className="text-sm text-[#6b7280]">{rule.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#6b7280] text-sm">
            F-Pattern Layout Showcase · Part of{" "}
            <Link href="/" className="text-[#e63946] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
