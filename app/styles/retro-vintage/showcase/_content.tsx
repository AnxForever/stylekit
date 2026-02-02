"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#f5e6d3]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5e6d3] border-b-2 border-[#8b4513]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link
            href="/styles/retro-vintage"
            className="font-serif text-[#8b4513] uppercase tracking-[0.2em] text-sm md:text-base"
          >
            Retro Vintage
          </Link>
          <div className="flex gap-2 md:gap-4">
            <Link
              href="/styles/retro-vintage"
              className="px-3 md:px-4 py-2 bg-transparent text-[#8b4513] border-2 border-[#8b4513] font-serif uppercase tracking-widest text-xs hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors duration-200"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="px-3 md:px-4 py-2 bg-[#8b4513] text-[#f5e6d3] border-2 border-[#8b4513] font-serif uppercase tracking-widest text-xs hover:bg-[#5c2e0a] transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-8 border-b-2 border-[#8b4513]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/60">
            Est. Since the Golden Age
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#8b4513] mt-4 mb-6">
            Retro Vintage
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#8b4513]/80 max-w-2xl mx-auto leading-relaxed">
            Nostalgic design with timeless elegance. Classic typography, warm color palettes, and handcrafted details.
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Color Palette
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Saddle Brown", hex: "#8b4513", bg: "bg-[#8b4513]", light: true },
              { name: "Parchment", hex: "#f5e6d3", bg: "bg-[#f5e6d3]", light: false },
              { name: "Rust Red", hex: "#c94c4c", bg: "bg-[#c94c4c]", light: true },
              { name: "Forest", hex: "#2e4a3f", bg: "bg-[#2e4a3f]", light: true },
              { name: "Camel", hex: "#d4a373", bg: "bg-[#d4a373]", light: false },
            ].map((color) => (
              <div key={color.name} className="border-2 border-[#8b4513] bg-[#f5e6d3]">
                <div className={`h-20 md:h-28 ${color.bg}`} />
                <div className="p-3 md:p-4 border-t-2 border-[#8b4513]">
                  <p className="font-serif text-sm md:text-base text-[#8b4513]">{color.name}</p>
                  <p className="font-mono text-xs text-[#8b4513]/60 uppercase">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513] bg-[#8b4513]/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Buttons
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-serif uppercase tracking-[0.2em] text-[#8b4513]/60 mb-4">
                Primary
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#8b4513] text-[#f5e6d3] border-2 border-[#5c2e0a] font-serif uppercase tracking-widest text-sm hover:bg-[#5c2e0a] transition-colors duration-200">
                  Discover More
                </button>
                <button className="px-6 py-3 bg-[#c94c4c] text-[#f5e6d3] border-2 border-[#8b2c2c] font-serif uppercase tracking-widest text-sm hover:bg-[#8b2c2c] transition-colors duration-200">
                  Special Offer
                </button>
                <button className="px-6 py-3 bg-[#2e4a3f] text-[#f5e6d3] border-2 border-[#1a2d26] font-serif uppercase tracking-widest text-sm hover:bg-[#1a2d26] transition-colors duration-200">
                  Read Story
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-serif uppercase tracking-[0.2em] text-[#8b4513]/60 mb-4">
                Outlined
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-transparent text-[#8b4513] border-2 border-[#8b4513] font-serif uppercase tracking-widest text-sm hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors duration-200">
                  Learn More
                </button>
                <button className="px-8 py-4 bg-[#f5e6d3] text-[#8b4513] border-4 border-double border-[#8b4513] font-serif uppercase tracking-[0.3em] text-xs hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors duration-300">
                  Est. 1965
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Cards
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { chapter: "Chapter One", title: "The Beginning", desc: "A story that spans generations, told through craftsmanship and tradition." },
              { chapter: "Chapter Two", title: "The Journey", desc: "Every step taken with purpose, every detail considered with care." },
              { chapter: "Chapter Three", title: "The Legacy", desc: "What we create today becomes tomorrow's heritage." },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#f5e6d3] border-2 border-[#8b4513] p-6 md:p-8 relative">
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8b4513]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8b4513]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8b4513]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8b4513]" />

                <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/60">
                  {item.chapter}
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-[#8b4513] mt-2 mb-4">
                  {item.title}
                </h3>
                <p className="text-[#8b4513]/80 leading-relaxed font-serif">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Input */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513] bg-[#8b4513]">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#f5e6d3]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#f5e6d3] uppercase tracking-widest">
              Form Elements
            </h2>
            <div className="flex-1 h-px bg-[#f5e6d3]/30" />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-serif uppercase tracking-[0.2em] text-[#f5e6d3]">
                Your Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[#f5e6d3] border-2 border-[#5c2e0a] text-[#8b4513] font-serif placeholder:text-[#8b4513]/40 focus:outline-none focus:ring-2 focus:ring-[#d4a373] transition-all duration-200"
                placeholder="Enter your name..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-serif uppercase tracking-[0.2em] text-[#f5e6d3]">
                Your Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-[#f5e6d3] border-2 border-[#5c2e0a] text-[#8b4513] font-serif placeholder:text-[#8b4513]/40 focus:outline-none focus:ring-2 focus:ring-[#d4a373] transition-all duration-200 resize-none"
                placeholder="Write your message..."
              />
            </div>
            <button className="w-full px-6 py-3 bg-[#f5e6d3] text-[#8b4513] border-2 border-[#5c2e0a] font-serif uppercase tracking-widest text-sm hover:bg-[#d4a373] transition-colors duration-200">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Core Rules */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513] bg-[#2e4a3f]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#f5e6d3]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#f5e6d3] uppercase tracking-widest">
              Core Rules
            </h2>
            <div className="flex-1 h-px bg-[#f5e6d3]/30" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-xl text-[#d4a373] uppercase tracking-widest mb-4">
                Must Use
              </h3>
              <ul className="font-serif text-sm md:text-base space-y-2 text-[#f5e6d3]/80">
                <li>- Vintage colors: sepia, amber, brown</li>
                <li>- Paper texture backgrounds</li>
                <li>- Serif fonts for elegance</li>
                <li>- Thick borders: border-2, border-4</li>
                <li>- Decorative corners and dividers</li>
                <li>- Uppercase with tracking-widest</li>
                <li>- Image filters: sepia, brightness-90</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#c94c4c] uppercase tracking-widest mb-4">
                Must Avoid
              </h3>
              <ul className="font-serif text-sm md:text-base space-y-2 text-[#f5e6d3]/80">
                <li>- Modern gradients</li>
                <li>- Neon/high saturation colors</li>
                <li>- Minimalist flat design</li>
                <li>- Very rounded corners</li>
                <li>- Glass morphism effects</li>
                <li>- Heavy animations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t-2 border-[#8b4513]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif text-sm text-[#8b4513]/60">
            StyleKit - Retro Vintage Showcase
          </p>
          <Link
            href="/styles/retro-vintage"
            className="font-serif text-sm text-[#8b4513] uppercase tracking-widest hover:text-[#c94c4c] transition-colors"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
