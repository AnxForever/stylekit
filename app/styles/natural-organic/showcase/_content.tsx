"use client";

import Link from "next/link";
import { ArrowLeft, Leaf, Sun, Droplets, Mountain } from "lucide-react";

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#faf6f1] text-stone-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#faf6f1]/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link
            href="/styles/natural-organic"
            className="font-serif text-stone-600 text-sm md:text-base hover:text-[#8b9d77] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Back</span>
          </Link>
          <div className="font-serif text-stone-700 text-sm md:text-base tracking-wide">
            Natural Organic
          </div>
          <Link
            href="/styles"
            className="font-serif text-stone-500 text-sm hover:text-stone-700 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b9d77]/15 rounded-full text-[#8b9d77] text-sm mb-6">
            <Leaf className="w-4 h-4" />
            <span className="font-serif">Organic Design</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-stone-800">
            Natural
            <br />
            <span className="text-[#8b9d77]">Organic</span>
          </h1>
          <p className="text-stone-500 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            Warm earth tones, soft organic shapes, and serif typography.
            Inspired by nature, crafted for calm and focused experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-stone-800 text-[#faf6f1] rounded-full font-serif hover:bg-stone-700 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full font-serif hover:bg-stone-100 transition-colors">
              Read More
            </button>
          </div>
        </div>
        {/* Decorative organic shape */}
        <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#8b9d77]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-amber-100/50 rounded-full blur-3xl" />
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Warm Linen", hex: "#FAF6F1", bg: "bg-[#faf6f1]", ring: "ring-1 ring-stone-200" },
              { name: "Earth Stone", hex: "#44403C", bg: "bg-stone-700", ring: "" },
              { name: "Sage Green", hex: "#8B9D77", bg: "bg-[#8b9d77]", ring: "" },
              { name: "Warm Sand", hex: "#D4C4A8", bg: "bg-[#d4c4a8]", ring: "" },
              { name: "Terracotta", hex: "#C4826D", bg: "bg-[#c4826d]", ring: "" },
            ].map((color) => (
              <div key={color.name} className="rounded-[1.5rem] overflow-hidden bg-white shadow-sm border border-stone-100">
                <div className={`h-20 md:h-28 ${color.bg} ${color.ring}`} />
                <div className="p-3 md:p-4">
                  <p className="font-serif text-xs md:text-sm text-stone-700">{color.name}</p>
                  <p className="text-xs text-stone-400">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Buttons
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm text-stone-400 mb-4">Variants</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-stone-800 text-[#faf6f1] rounded-full font-serif hover:bg-stone-700 transition-colors">
                  Primary
                </button>
                <button className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full font-serif hover:bg-stone-100 transition-colors">
                  Secondary
                </button>
                <button className="px-6 py-3 bg-[#8b9d77] text-white rounded-full font-serif hover:bg-[#7a8c67] transition-colors">
                  Accent
                </button>
                <button className="px-6 py-3 bg-[#c4826d] text-white rounded-full font-serif hover:bg-[#b3725e] transition-colors">
                  Warm
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-stone-400 mb-4">With Icons</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-stone-800 text-[#faf6f1] rounded-full font-serif hover:bg-stone-700 transition-colors flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Explore
                </button>
                <button className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full font-serif hover:bg-stone-100 transition-colors flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Discover
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#faf6f1] rounded-[2rem] p-6 md:p-8 hover:shadow-lg transition-shadow border border-stone-100 group">
              <div className="w-12 h-12 rounded-full bg-[#8b9d77]/15 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-[#8b9d77]" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 mb-2">
                Sustainable Design
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Thoughtful layouts that breathe with natural whitespace and organic flow.
              </p>
            </div>
            <div className="bg-[#faf6f1] rounded-[2rem] p-6 md:p-8 hover:shadow-lg transition-shadow border border-stone-100 group">
              <div className="w-12 h-12 rounded-full bg-[#c4826d]/15 flex items-center justify-center mb-4">
                <Sun className="w-6 h-6 text-[#c4826d]" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 mb-2">
                Warm Palette
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Earth tones and muted colors that create a sense of comfort and trust.
              </p>
            </div>
            <div className="bg-[#faf6f1] rounded-[2rem] p-6 md:p-8 hover:shadow-lg transition-shadow border border-stone-100 group">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Mountain className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 mb-2">
                Grounded Typography
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Serif headings paired with clean body text for readable, elegant content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Form Elements
          </h2>
          <div className="space-y-6">
            <div>
              <label className="font-serif text-sm text-stone-600 mb-2 block">Name</label>
              <input
                type="text"
                placeholder="Your name..."
                className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-3 text-stone-700 placeholder:text-stone-300 focus:border-[#8b9d77] focus:outline-none focus:ring-2 focus:ring-[#8b9d77]/20 transition-all"
              />
            </div>
            <div>
              <label className="font-serif text-sm text-stone-600 mb-2 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-3 text-stone-700 placeholder:text-stone-300 focus:border-[#8b9d77] focus:outline-none focus:ring-2 focus:ring-[#8b9d77]/20 transition-all"
              />
            </div>
            <div>
              <label className="font-serif text-sm text-stone-600 mb-2 block">Message</label>
              <textarea
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-3 text-stone-700 placeholder:text-stone-300 focus:border-[#8b9d77] focus:outline-none focus:ring-2 focus:ring-[#8b9d77]/20 transition-all resize-none"
              />
            </div>
            <button className="w-full px-6 py-3 bg-stone-800 text-[#faf6f1] rounded-full font-serif hover:bg-stone-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-stone-800 text-[#faf6f1]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12">
            Core Design Rules
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-stone-700/50 rounded-[2rem] p-6">
              <h3 className="font-serif text-lg font-bold text-[#8b9d77] mb-4">Embrace</h3>
              <ul className="text-sm text-stone-300 space-y-2">
                <li>+ Warm linen background (#faf6f1)</li>
                <li>+ Organic rounded shapes (rounded-full, rounded-[2rem])</li>
                <li>+ Serif headings, clean body text</li>
                <li>+ Earth tones: stone, sage, terracotta</li>
                <li>+ Generous whitespace</li>
                <li>+ Soft, natural transitions</li>
                <li>+ Subtle shadows and borders</li>
              </ul>
            </div>
            <div className="bg-stone-700/50 rounded-[2rem] p-6">
              <h3 className="font-serif text-lg font-bold text-[#c4826d] mb-4">Avoid</h3>
              <ul className="text-sm text-stone-300 space-y-2">
                <li>- Neon or electric colors</li>
                <li>- Sharp corners (border-radius: 0)</li>
                <li>- Hard black borders</li>
                <li>- Monospace typography</li>
                <li>- Heavy shadows</li>
                <li>- Glitch or tech effects</li>
                <li>- High contrast dark backgrounds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400">
            StyleKit / Natural Organic Showcase
          </p>
          <Link
            href="/styles/natural-organic"
            className="font-serif text-xs text-[#8b9d77] hover:text-stone-700 transition-colors"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
