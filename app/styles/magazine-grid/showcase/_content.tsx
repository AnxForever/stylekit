"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Clock,
  User,
  TrendingUp,
  Play,
  Bookmark,
  Share2,
  Newspaper,
  Grid3X3,
  Layers,
  Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Magazine Grid color palette
const colors: ColorItem[] = [
  { name: "Dark", hex: "#1a1a1a", bg: "bg-zinc-900" },
  { name: "Light", hex: "#fafafa", bg: "bg-zinc-50", border: true },
  { name: "Red", hex: "#e63946", bg: "bg-red-600" },
  { name: "Teal", hex: "#2a9d8f", bg: "bg-teal-600" },
  { name: "Gold", hex: "#e9c46a", bg: "bg-amber-400" },
];

// Design rules
const designRules = [
  { title: "CSS Grid Layout", desc: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" },
  { title: "Featured Spans", desc: "col-span-2 row-span-2 for hero content" },
  { title: "Category Labels", desc: "Colored tags for content classification" },
  { title: "Image Ratios", desc: "Consistent aspect ratios for thumbnails" },
  { title: "Line Clamping", desc: "Truncate excerpts with line-clamp" },
  { title: "Hover Effects", desc: "Image scale on hover for interactivity" },
];

// Categories
const categories = ["All", "Technology", "Business", "Culture", "Opinion", "Sports"];

// Articles data
const articles = [
  {
    id: 1,
    title: "The Future of AI in Creative Industries",
    excerpt: "How artificial intelligence is reshaping the way we create and consume content across media, art, and entertainment.",
    category: "Technology",
    categoryColor: "bg-blue-600",
    author: "Sarah Chen",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Startup Funding Hits Record High",
    excerpt: "Venture capital investments reach unprecedented levels in Q3.",
    category: "Business",
    categoryColor: "bg-emerald-600",
    author: "Mike Johnson",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "The Rise of Digital Art Collections",
    excerpt: "Museums embrace virtual galleries and NFT exhibitions.",
    category: "Culture",
    categoryColor: "bg-amber-600",
    author: "Emma Wilson",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Remote Work Revolution Continues",
    excerpt: "Companies adopt hybrid models as the new standard.",
    category: "Business",
    categoryColor: "bg-emerald-600",
    author: "Tom Baker",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Climate Tech Innovations",
    excerpt: "New technologies tackling environmental challenges.",
    category: "Technology",
    categoryColor: "bg-blue-600",
    author: "Lisa Park",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "The Psychology of Social Media",
    excerpt: "Understanding our digital behaviors and habits.",
    category: "Opinion",
    categoryColor: "bg-purple-600",
    author: "Dr. James Lee",
    readTime: "10 min read",
  },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/styles/magazine-grid"
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold hidden sm:inline">Back to Docs</span>
            </Link>
            <span className="text-2xl font-bold text-zinc-900 tracking-tight">THE DAILY</span>
            <Link
              href="/styles"
              className="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm hover:bg-zinc-800 transition-colors"
            >
              All Styles
            </Link>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-zinc-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-6 overflow-x-auto py-3">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`
                    text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-colors
                    ${i === 0
                      ? "text-red-600 border-b-2 border-red-600 pb-2 -mb-[13px]"
                      : "text-zinc-500 hover:text-zinc-900"
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
      <section className="py-8 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            <span>Magazine Style Layout</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Magazine Grid
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl">
            Professional editorial layout with mixed-size content blocks, perfect for news sites and content hubs.
          </p>
        </div>
      </section>

      {/* Magazine Grid Demo */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-600 hover:bg-zinc-50 transition-colors">
              <TrendingUp className="w-5 h-5" />
              <span className="hidden sm:inline">Trending</span>
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Featured Article - Large */}
            <article className="md:col-span-2 lg:row-span-2 group">
              <a href="#" className="block h-full">
                <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-rose-500 to-orange-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase bg-red-600 rounded mb-4">
                      Featured
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:underline">
                      {articles[0].title}
                    </h2>
                    <p className="text-white/80 mb-4 line-clamp-2">
                      {articles[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {articles[0].author}
                      </span>
                      <span className="flex items-center gap-1">
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
                  <div className="relative rounded-xl overflow-hidden mb-4">
                    <div className={`aspect-video ${
                      article.id % 3 === 0 ? "bg-gradient-to-br from-blue-500 to-cyan-500" :
                      article.id % 3 === 1 ? "bg-gradient-to-br from-emerald-500 to-teal-500" :
                      "bg-gradient-to-br from-amber-500 to-orange-500"
                    }`} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <span className={`inline-block px-2 py-0.5 text-xs font-semibold uppercase text-white ${article.categoryColor} rounded mb-2`}>
                    {article.category}
                  </span>
                  <h3 className="font-bold text-zinc-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-zinc-900 text-white rounded-full font-semibold hover:bg-zinc-800 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Editorial colors with category accents"
        className="py-16 px-6 bg-white"
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

      {/* Grid Variations */}
      <ShowcaseSection
        title="Grid Variations"
        subtitle="Different layouts for various content needs"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 3-Column Grid */}
          <div>
            <h3 className="font-semibold text-zinc-900 mb-4">3-Column Equal Grid</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-xl flex items-center justify-center text-zinc-500 font-medium">
                  Article {i}
                </div>
              ))}
            </div>
          </div>

          {/* 4-Column with Featured */}
          <div>
            <h3 className="font-semibold text-zinc-900 mb-4">4-Column with Featured</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2 row-span-2 aspect-square bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center text-white font-medium">
                Featured
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video bg-gradient-to-br from-zinc-200 to-zinc-300 rounded-xl flex items-center justify-center text-zinc-500 font-medium text-sm">
                  Small {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for Magazine Grid layouts"
        className="py-16 px-6 bg-white"
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

      {/* Use Cases */}
      <ShowcaseSection
        title="Use Cases"
        subtitle="When to use Magazine Grid layout"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Newspaper, title: "News Websites", desc: "Editorial content with visual hierarchy" },
            { icon: Grid3X3, title: "Blog Listings", desc: "Mixed article sizes for engagement" },
            { icon: Layers, title: "Content Hubs", desc: "Aggregate multiple content types" },
            { icon: Palette, title: "Portfolio Grids", desc: "Showcase work with varied emphasis" },
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
            Magazine Grid Showcase{" "}
            <Link href="/" className="text-zinc-900 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
