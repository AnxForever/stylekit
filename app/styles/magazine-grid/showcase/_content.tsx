"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Clock,
  User,
  TrendingUp,
  Bookmark,
  Share2,
  Newspaper,
  Grid3X3,
  Layers,
  Palette,
  ChevronRight,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Editorial color palette
const colors: ColorItem[] = [
  { name: "Ink", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
  { name: "Paper", hex: "#fafafa", bg: "bg-[#fafafa]", border: true },
  { name: "Accent Red", hex: "#e63946", bg: "bg-[#e63946]" },
  { name: "Warm Gray", hex: "#6b7280", bg: "bg-gray-500" },
  { name: "Cream", hex: "#f5f5dc", bg: "bg-[#f5f5dc]", border: true },
];

// Design rules
const designRules = [
  { title: "CSS Grid Layout", desc: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" },
  { title: "Featured Spans", desc: "col-span-2 row-span-2 for hero content" },
  { title: "Serif Headlines", desc: "font-serif for editorial elegance" },
  { title: "Category Labels", desc: "Uppercase tracking for classification" },
  { title: "Line Clamping", desc: "Truncate excerpts with line-clamp" },
  { title: "Hover Effects", desc: "Subtle underlines and color shifts" },
];

// Categories
const categories = ["All", "Essays", "Culture", "Politics", "Science", "Opinion"];

// Articles data
const articles = [
  {
    id: 1,
    title: "The Quiet Revolution in How We Think About Time",
    excerpt: "A meditation on the changing nature of temporal experience in the digital age, and what it means for our collective consciousness.",
    category: "Essays",
    author: "Margaret Atwood",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: 2,
    title: "The Architecture of Silence",
    excerpt: "How modern spaces are designed to cultivate contemplation.",
    category: "Culture",
    author: "James Baldwin",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Letters from the Edge of Reason",
    excerpt: "Dispatches from the frontiers of scientific discovery.",
    category: "Science",
    author: "Carl Sagan",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "The Democracy of Everyday Things",
    excerpt: "Finding meaning in the mundane objects that shape our lives.",
    category: "Essays",
    author: "Susan Sontag",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "On the Nature of Progress",
    excerpt: "Questioning our assumptions about forward movement.",
    category: "Opinion",
    author: "Hannah Arendt",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "The Weight of Words",
    excerpt: "Language as both prison and liberation in modern discourse.",
    category: "Politics",
    author: "George Orwell",
    readTime: "11 min read",
  },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#fafafa] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/styles/magazine-grid"
              className="flex items-center gap-2 text-gray-500 hover:text-[#0a0a0a] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Back to Docs</span>
            </Link>
            <div className="text-center">
              <span className="font-serif text-2xl font-bold text-[#0a0a0a] italic tracking-tight">The Review</span>
              <div className="text-xs text-gray-400 uppercase tracking-widest">Est. 1923</div>
            </div>
            <Link
              href="/styles"
              className="px-4 py-2 bg-[#0a0a0a] text-white text-sm hover:bg-gray-800 transition-colors"
            >
              All Styles
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-8 overflow-x-auto py-3">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`
                    text-xs font-medium uppercase tracking-widest whitespace-nowrap transition-colors
                    ${i === 0
                      ? "text-[#e63946] border-b-2 border-[#e63946] pb-2 -mb-[13px]"
                      : "text-gray-400 hover:text-[#0a0a0a]"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-6 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-500 text-sm mb-8">
            <Newspaper className="w-4 h-4" />
            <span className="uppercase tracking-widest text-xs">Editorial Style</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#0a0a0a] mb-6 italic">
            Magazine Grid
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto font-serif leading-relaxed">
            Professional editorial layout with mixed-size content blocks, perfect for longform journalism.
          </p>
          <div className="mt-8 w-px h-12 bg-[#e63946] mx-auto" />
        </div>
      </section>

      {/* Magazine Grid Demo */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 text-[#0a0a0a] placeholder-gray-400 focus:outline-none focus:border-[#0a0a0a] transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-500 hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Trending</span>
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Featured Article - Large */}
            <article className="md:col-span-2 lg:row-span-2 group">
              <a href="#" className="block h-full">
                <div className="relative h-full min-h-[450px] bg-[#0a0a0a] overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e63946]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-[#e63946] text-xs font-medium uppercase tracking-wider">
                        Featured
                      </span>
                      <span className="text-white/60 text-xs uppercase tracking-wider">
                        {articles[0].category}
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 italic leading-tight group-hover:underline decoration-2 underline-offset-4">
                      {articles[0].title}
                    </h2>
                    <p className="text-white/70 mb-6 leading-relaxed line-clamp-3 font-serif">
                      {articles[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {articles[0].author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {articles[0].readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </article>

            {/* Regular Articles */}
            {articles.slice(1).map((article) => (
              <article key={article.id} className="group">
                <a href="#" className="block">
                  <div className="relative aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                    <div className={`absolute inset-0 ${
                      article.id % 3 === 0 ? "bg-gradient-to-br from-gray-700 to-gray-900" :
                      article.id % 3 === 1 ? "bg-gradient-to-br from-gray-600 to-gray-800" :
                      "bg-gradient-to-br from-gray-500 to-gray-700"
                    }`} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#e63946] text-xs font-medium uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-400 text-xs">{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0a0a0a] mb-2 italic leading-snug group-hover:underline decoration-1 underline-offset-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="font-medium">{article.author}</span>
                    <div className="flex items-center gap-3">
                      <button className="hover:text-[#0a0a0a] transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="hover:text-[#0a0a0a] transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-[#0a0a0a] text-white font-medium hover:bg-gray-800 transition-colors">
              Load More Articles
              <ChevronRight className="w-4 h-4 inline ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Classic editorial colors with a bold accent"
        className="py-16 px-6 bg-white border-y border-gray-200"
        titleClassName="font-serif text-3xl font-bold text-[#0a0a0a] mb-4 text-center italic"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden"
            labelClassName="font-serif font-semibold text-sm text-[#0a0a0a]"
            hexClassName="text-xs text-gray-400 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Grid Variations */}
      <ShowcaseSection
        title="Grid Variations"
        subtitle="Different layouts for various editorial needs"
        className="py-16 px-6"
        titleClassName="font-serif text-3xl font-bold text-[#0a0a0a] mb-4 text-center italic"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          {/* 3-Column Grid */}
          <div>
            <h3 className="font-serif font-bold text-[#0a0a0a] mb-4 italic">3-Column Equal Grid</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-400 font-serif italic">
                  Article {i}
                </div>
              ))}
            </div>
          </div>

          {/* 4-Column with Featured */}
          <div>
            <h3 className="font-serif font-bold text-[#0a0a0a] mb-4 italic">4-Column with Featured</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 row-span-2 aspect-square bg-[#0a0a0a] flex items-center justify-center text-white font-serif italic">
                Featured
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[4/3] bg-gray-200 flex items-center justify-center text-gray-400 font-serif italic text-sm">
                  Small {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Principles"
        subtitle="Key patterns for editorial grid layouts"
        className="py-16 px-6 bg-white border-t border-gray-200"
        titleClassName="font-serif text-3xl font-bold text-[#0a0a0a] mb-4 text-center italic"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designRules.map((rule, i) => (
              <div key={i} className="p-6 bg-[#fafafa] border border-gray-200">
                <h4 className="font-serif font-bold text-[#0a0a0a] mb-2 italic">{rule.title}</h4>
                <p className="text-sm text-gray-500">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Use Cases */}
      <ShowcaseSection
        title="Applications"
        subtitle="When to use Magazine Grid layout"
        className="py-16 px-6 border-t border-gray-200"
        titleClassName="font-serif text-3xl font-bold text-[#0a0a0a] mb-4 text-center italic"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Newspaper, title: "News Publications", desc: "Editorial content with visual hierarchy" },
            { icon: Grid3X3, title: "Blog Listings", desc: "Mixed article sizes for engagement" },
            { icon: Layers, title: "Content Hubs", desc: "Aggregate multiple content types" },
            { icon: Palette, title: "Portfolio Grids", desc: "Showcase work with varied emphasis" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 bg-white border border-gray-200">
              <div className="w-12 h-12 bg-[#0a0a0a] flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#0a0a0a] mb-1 italic">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-px h-8 bg-[#e63946] mx-auto mb-6" />
          <p className="text-gray-400 text-sm">
            Magazine Grid Showcase{" "}
            <Link href="/" className="text-[#0a0a0a] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
