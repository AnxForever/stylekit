"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  Leaf,
  Sun,
  Flower2,
  TreeDeciduous,
  Mountain,
  Coffee,
  Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Natural Organic color palette - earth tones
const colors: ColorItem[] = [
  { name: "Bark", hex: "#5c4033", bg: "bg-[#5c4033]" },
  { name: "Cream", hex: "#faf6f1", bg: "bg-[#faf6f1]", border: true },
  { name: "Sage", hex: "#8b9d77", bg: "bg-[#8b9d77]" },
  { name: "Terracotta", hex: "#d4a373", bg: "bg-[#d4a373]" },
  { name: "Moss", hex: "#606c38", bg: "bg-[#606c38]" },
];

// Design rules
const designRules = [
  { title: "CSS Columns", desc: "columns-2 md:columns-3 lg:columns-4 for waterfall flow" },
  { title: "Break Inside", desc: "break-inside-avoid keeps cards intact" },
  { title: "Natural Heights", desc: "Let content determine card height organically" },
  { title: "Soft Corners", desc: "rounded-2xl and rounded-3xl for organic feel" },
  { title: "Earth Tones", desc: "Warm browns, greens, and creams" },
  { title: "Texture Layers", desc: "Subtle patterns add natural depth" },
];

// Nature-themed card data
const cards = [
  { id: 1, height: "h-72", type: "image", title: "Morning Garden", category: "Plants", likes: 234 },
  { id: 2, height: "h-48", type: "quote", quote: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
  { id: 3, height: "h-80", type: "image", title: "Ceramic Workshop", category: "Crafts", likes: 456 },
  { id: 4, height: "h-56", type: "image", title: "Sourdough Bread", category: "Recipes", likes: 321 },
  { id: 5, height: "h-40", type: "stat", value: "2.4K", label: "Plant lovers" },
  { id: 6, height: "h-64", type: "image", title: "Herb Garden", category: "Plants", likes: 567 },
  { id: 7, height: "h-52", type: "image", title: "Woven Baskets", category: "Crafts", likes: 234 },
  { id: 8, height: "h-44", type: "tip", title: "Growing Tip", content: "Water your succulents only when the soil is completely dry." },
  { id: 9, height: "h-68", type: "image", title: "Forest Bathing", category: "Wellness", likes: 389 },
  { id: 10, height: "h-36", type: "image", title: "Pressed Flowers", category: "Crafts", likes: 267 },
  { id: 11, height: "h-60", type: "image", title: "Farm to Table", category: "Recipes", likes: 412 },
  { id: 12, height: "h-48", type: "image", title: "Botanical Art", category: "Art", likes: 523 },
];

// Category colors
const categoryColors: Record<string, string> = {
  Plants: "bg-[#606c38]",
  Crafts: "bg-[#d4a373]",
  Recipes: "bg-[#5c4033]",
  Wellness: "bg-[#8b9d77]",
  Art: "bg-[#bc6c25]",
};

// Image gradients for demo
const imageGradients: Record<string, string> = {
  Plants: "from-[#606c38] to-[#8b9d77]",
  Crafts: "from-[#d4a373] to-[#bc6c25]",
  Recipes: "from-[#5c4033] to-[#8b7355]",
  Wellness: "from-[#8b9d77] to-[#a3b18a]",
  Art: "from-[#bc6c25] to-[#d4a373]",
};

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#faf6f1]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#faf6f1]/90 backdrop-blur-sm border-b border-[#d4a373]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/masonry-flow"
            className="flex items-center gap-2 text-[#5c4033]/70 hover:text-[#5c4033] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#606c38]" />
            <span className="font-semibold text-xl text-[#5c4033]">Botanica</span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#5c4033] text-[#faf6f1] rounded-full text-sm hover:bg-[#5c4033]/90 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* 瑙嗚椋庢牸鏍囨敞 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b9d77]/20 text-[#606c38] rounded-full text-sm font-medium mb-4">
            <Palette className="w-4 h-4" />
            <span>瑙嗚椋庢牸: Natural Organic</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b9d77]/20 text-[#606c38] rounded-full text-sm font-medium mb-8 ml-2">
            <Flower2 className="w-4 h-4" />
            <span>Masonry Flow Layout</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#5c4033] mb-6 leading-tight">
            Masonry Flow
          </h1>
          <p className="text-xl text-[#5c4033]/70 max-w-2xl mx-auto mb-10">
            A Pinterest-inspired waterfall layout where cards flow naturally, perfect for lifestyle content, recipes, and creative inspiration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-[#5c4033] text-[#faf6f1] rounded-full font-medium hover:bg-[#5c4033]/90 transition-colors">
              Explore Gallery
            </button>
            <button className="px-8 py-4 bg-[#faf6f1] text-[#5c4033] rounded-full font-medium border-2 border-[#d4a373] hover:bg-[#d4a373]/10 transition-colors">
              Share Your Work
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Earth Tone Palette"
        subtitle="Warm, natural colors inspired by forests and gardens"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-[#5c4033] mb-4 text-center"
        subtitleClassName="text-[#5c4033]/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden shadow-sm"
            labelClassName="font-semibold text-sm text-[#5c4033]"
            hexClassName="text-xs text-[#5c4033]/50 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Masonry Demo */}
      <ShowcaseSection
        title="Curated Collection"
        subtitle="Discover inspiration from nature and handmade crafts"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-[#5c4033] mb-4 text-center"
        subtitleClassName="text-[#5c4033]/60 mb-10 text-center"
      >
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {["All", "Plants", "Crafts", "Recipes", "Wellness"].map((tab, i) => (
              <button
                key={tab}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-colors ${
                  i === 0
                    ? "bg-[#5c4033] text-[#faf6f1]"
                    : "bg-white text-[#5c4033]/70 hover:bg-[#d4a373]/20 border border-[#d4a373]/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
            {cards.map((card) => (
              <div key={card.id} className="break-inside-avoid mb-5">
                {card.type === "image" && (
                  <div className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow">
                    <div className={`relative ${card.height} bg-gradient-to-br ${imageGradients[card.category || "Plants"]}`}>
                      {/* Decorative pattern overlay */}
                      <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                      }} />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#5c4033]/0 group-hover:bg-[#5c4033]/30 transition-colors flex items-end p-5 opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button className="p-2.5 bg-[#faf6f1] rounded-full hover:bg-white transition-colors">
                            <Heart className="w-4 h-4 text-[#5c4033]" />
                          </button>
                          <button className="p-2.5 bg-[#faf6f1] rounded-full hover:bg-white transition-colors">
                            <Bookmark className="w-4 h-4 text-[#5c4033]" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2.5 py-1 ${categoryColors[card.category || "Plants"]} text-[#faf6f1] text-xs font-medium rounded-full`}>
                          {card.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[#5c4033] mb-2">{card.title}</h3>
                      <div className="flex items-center justify-between text-sm text-[#5c4033]/50">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" /> {card.likes}
                        </span>
                        <button className="hover:text-[#5c4033] transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {card.type === "quote" && (
                  <div className="p-6 bg-[#606c38] rounded-3xl text-[#faf6f1]">
                    <Leaf className="w-8 h-8 mb-4 opacity-60" />
                    <p className="text-lg italic mb-4 leading-relaxed">&ldquo;{card.quote}&rdquo;</p>
                    <p className="text-[#faf6f1]/70 text-sm">- {card.author}</p>
                  </div>
                )}

                {card.type === "stat" && (
                  <div className="p-6 bg-gradient-to-br from-[#d4a373] to-[#bc6c25] rounded-3xl text-[#faf6f1]">
                    <TreeDeciduous className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-4xl font-bold mb-1">{card.value}</p>
                    <p className="text-[#faf6f1]/80">{card.label}</p>
                  </div>
                )}

                {card.type === "tip" && (
                  <div className="p-5 bg-[#8b9d77]/20 rounded-3xl border border-[#8b9d77]/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Sun className="w-5 h-5 text-[#606c38]" />
                      <span className="font-semibold text-[#5c4033]">{card.title}</span>
                    </div>
                    <p className="text-[#5c4033]/70 text-sm leading-relaxed">{card.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-white text-[#5c4033] rounded-full font-medium hover:bg-[#d4a373]/10 transition-colors border-2 border-[#d4a373]/30">
              Load More Inspiration
            </button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Principles"
        subtitle="Key patterns for natural, organic layouts"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-[#5c4033] mb-4 text-center"
        subtitleClassName="text-[#5c4033]/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {designRules.map((rule, i) => (
              <div key={i} className="p-6 bg-[#faf6f1] rounded-2xl border border-[#d4a373]/20">
                <h4 className="font-semibold text-[#5c4033] mb-2">{rule.title}</h4>
                <p className="text-sm text-[#5c4033]/60">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Use Cases */}
      <ShowcaseSection
        title="Perfect For"
        subtitle="Where masonry layouts shine"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-[#5c4033] mb-4 text-center"
        subtitleClassName="text-[#5c4033]/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
          {[
            { icon: Flower2, title: "Lifestyle Blogs", desc: "Recipes, DIY projects, and home inspiration" },
            { icon: Mountain, title: "Photo Galleries", desc: "Showcase images with varying aspect ratios" },
            { icon: Coffee, title: "Product Catalogs", desc: "Display items in an engaging, browsable format" },
            { icon: Leaf, title: "Creative Portfolios", desc: "Art, design, and photography collections" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border border-[#d4a373]/20">
              <div className="w-12 h-12 bg-[#8b9d77]/20 rounded-xl flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-[#606c38]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#5c4033] mb-1">{item.title}</h3>
                <p className="text-sm text-[#5c4033]/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#d4a373]/20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#5c4033]/50 text-sm">
            Masonry Flow Showcase{" "}
            <Link href="/" className="text-[#5c4033] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

