"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertTriangle, Info, ChevronDown, User } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);

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

      {/* Tabs */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Tabs
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="bg-[#f5e6d3] border-2 border-[#8b4513] p-6 md:p-8">
            <div className="flex border-b-2 border-[#8b4513] mb-6">
              {["History", "Craft", "Legacy"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 font-serif uppercase tracking-widest text-sm transition-colors -mb-0.5 ${
                    activeTab === i
                      ? "bg-[#8b4513] text-[#f5e6d3] border-2 border-[#8b4513] border-b-[#8b4513]"
                      : "text-[#8b4513]/60 hover:text-[#8b4513] border-2 border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="font-serif text-[#8b4513]/80 leading-relaxed">
              {activeTab === 0 && "A tale woven through generations, where every detail speaks of time-honored traditions and master craftsmanship passed down through the ages."}
              {activeTab === 1 && "The art of creation, where skilled hands transform raw materials into works of lasting beauty, each piece telling its own unique story."}
              {activeTab === 2 && "What we build today becomes tomorrow's heritage. Every creation carries forward the spirit of those who came before."}
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513] bg-[#8b4513]/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Badges
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-[#8b4513] text-[#f5e6d3] border-2 border-[#5c2e0a] font-serif uppercase tracking-widest text-xs">
              Authentic
            </span>
            <span className="px-4 py-2 bg-[#c94c4c] text-[#f5e6d3] border-2 border-[#8b2c2c] font-serif uppercase tracking-widest text-xs">
              Limited
            </span>
            <span className="px-4 py-2 bg-[#2e4a3f] text-[#f5e6d3] border-2 border-[#1a2d26] font-serif uppercase tracking-widest text-xs">
              Heritage
            </span>
            <span className="px-4 py-2 bg-[#d4a373] text-[#5c2e0a] border-2 border-[#8b4513] font-serif uppercase tracking-widest text-xs">
              Classic
            </span>
            <span className="px-4 py-2 bg-transparent text-[#8b4513] border-2 border-[#8b4513] font-serif uppercase tracking-widest text-xs">
              Outlined
            </span>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513]">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Progress
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-serif text-sm uppercase tracking-widest text-[#8b4513]">Restoration</span>
                <span className="font-mono text-xs text-[#8b4513]/60">75%</span>
              </div>
              <div className="h-4 bg-[#f5e6d3] border-2 border-[#8b4513]">
                <div className="h-full w-[75%] bg-[#8b4513]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-serif text-sm uppercase tracking-widest text-[#8b4513]">Authenticity</span>
                <span className="font-mono text-xs text-[#8b4513]/60">92%</span>
              </div>
              <div className="h-4 bg-[#f5e6d3] border-2 border-[#8b4513]">
                <div className="h-full w-[92%] bg-[#c94c4c]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-serif text-sm uppercase tracking-widest text-[#8b4513]">Heritage</span>
                <span className="font-mono text-xs text-[#8b4513]/60">60%</span>
              </div>
              <div className="h-4 bg-[#f5e6d3] border-2 border-[#8b4513]">
                <div className="h-full w-[60%] bg-[#2e4a3f]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513] bg-[#8b4513]/10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Alerts
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-[#2e4a3f]/10 border-2 border-[#2e4a3f]">
              <Check className="w-5 h-5 text-[#2e4a3f] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-serif uppercase tracking-widest text-[#2e4a3f] text-sm mb-1">Success</p>
                <p className="font-serif text-[#2e4a3f]/80 text-sm">Your order has been confirmed and preserved.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#d4a373]/20 border-2 border-[#d4a373]">
              <AlertTriangle className="w-5 h-5 text-[#8b4513] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-serif uppercase tracking-widest text-[#8b4513] text-sm mb-1">Warning</p>
                <p className="font-serif text-[#8b4513]/80 text-sm">This item requires careful handling.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#c94c4c]/10 border-2 border-[#c94c4c]">
              <X className="w-5 h-5 text-[#c94c4c] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-serif uppercase tracking-widest text-[#c94c4c] text-sm mb-1">Error</p>
                <p className="font-serif text-[#c94c4c]/80 text-sm">The requested item is no longer available.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#8b4513]/10 border-2 border-[#8b4513]">
              <Info className="w-5 h-5 text-[#8b4513] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-serif uppercase tracking-widest text-[#8b4513] text-sm mb-1">Notice</p>
                <p className="font-serif text-[#8b4513]/80 text-sm">All items are hand-inspected for authenticity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513]">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Controls
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-serif uppercase tracking-[0.2em] text-[#8b4513]/60 mb-4">
                Switches
              </p>
              <div className="space-y-3">
                {["Patina finish", "Certificate included"].map((label, i) => (
                  <label key={label} className="flex items-center justify-between p-4 bg-[#f5e6d3] border-2 border-[#8b4513] cursor-pointer">
                    <span className="font-serif text-[#8b4513]">{label}</span>
                    <button
                      role="switch"
                      aria-checked={toggleStates[i]}
                      aria-label={label}
                      onClick={() => {
                        const newStates = [...toggleStates];
                        newStates[i] = !newStates[i];
                        setToggleStates(newStates);
                      }}
                      className={`w-14 h-7 border-2 border-[#8b4513] transition-colors relative ${
                        toggleStates[i] ? "bg-[#8b4513]" : "bg-[#f5e6d3]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 transition-all ${
                          toggleStates[i] ? "left-7 bg-[#f5e6d3]" : "left-0.5 bg-[#8b4513]"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-serif uppercase tracking-[0.2em] text-[#8b4513]/60 mb-4">
                Checkboxes
              </p>
              <div className="space-y-3">
                {["Original packaging", "Restoration history", "Provenance documents"].map((label, i) => (
                  <label key={label} className="flex items-center gap-3 p-4 bg-[#f5e6d3] border-2 border-[#8b4513] cursor-pointer">
                    <button
                      role="checkbox"
                      aria-checked={checkboxStates[i]}
                      aria-label={label}
                      onClick={() => {
                        const newStates = [...checkboxStates];
                        newStates[i] = !newStates[i];
                        setCheckboxStates(newStates);
                      }}
                      className={`w-6 h-6 border-2 border-[#8b4513] flex items-center justify-center transition-colors ${
                        checkboxStates[i] ? "bg-[#8b4513]" : "bg-[#f5e6d3]"
                      }`}
                    >
                      {checkboxStates[i] && <Check className="w-4 h-4 text-[#f5e6d3]" />}
                    </button>
                    <span className="font-serif text-[#8b4513]">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513] bg-[#8b4513]/10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Dropdown
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-[#f5e6d3] border-2 border-[#8b4513] font-serif text-[#8b4513] uppercase tracking-widest text-sm hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors"
            >
              <span>Select Era</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-0 bg-[#f5e6d3] border-2 border-t-0 border-[#8b4513] z-10">
                {["Victorian (1837-1901)", "Art Deco (1920-1940)", "Mid-Century (1945-1970)", "Retro (1970-1990)"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-5 py-3 text-left font-serif text-[#8b4513] text-sm hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors border-b border-[#8b4513]/20 last:border-0"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Table
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="border-2 border-[#8b4513] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#8b4513] text-[#f5e6d3]">
                  <th className="px-6 py-4 text-left font-serif uppercase tracking-widest text-xs">Item</th>
                  <th className="px-6 py-4 text-left font-serif uppercase tracking-widest text-xs">Era</th>
                  <th className="px-6 py-4 text-left font-serif uppercase tracking-widest text-xs">Condition</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Pocket Watch", era: "Victorian", condition: "Excellent" },
                  { item: "Typewriter", era: "Art Deco", condition: "Good" },
                  { item: "Radio Cabinet", era: "Mid-Century", condition: "Restored" },
                ].map((row, idx) => (
                  <tr key={row.item} className={`border-t-2 border-[#8b4513] ${idx % 2 === 0 ? "bg-[#f5e6d3]" : "bg-[#8b4513]/5"}`}>
                    <td className="px-6 py-4 font-serif text-[#8b4513]">{row.item}</td>
                    <td className="px-6 py-4 font-serif text-[#8b4513]/70">{row.era}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 font-serif uppercase tracking-widest text-xs border-2 ${
                        row.condition === "Excellent"
                          ? "bg-[#2e4a3f]/10 border-[#2e4a3f] text-[#2e4a3f]"
                          : row.condition === "Good"
                          ? "bg-[#d4a373]/20 border-[#d4a373] text-[#8b4513]"
                          : "bg-[#8b4513]/10 border-[#8b4513] text-[#8b4513]"
                      }`}>
                        {row.condition}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513] bg-[#8b4513]/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Statistics
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "1865", label: "Established" },
              { value: "50K+", label: "Items Restored" },
              { value: "98%", label: "Authenticity" },
              { value: "127", label: "Years of Craft" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#f5e6d3] border-2 border-[#8b4513] p-6 text-center relative">
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#8b4513]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#8b4513]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#8b4513]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#8b4513]" />
                <p className="font-serif text-3xl md:text-4xl text-[#8b4513] mb-2">
                  {stat.value}
                </p>
                <p className="font-serif text-xs uppercase tracking-widest text-[#8b4513]/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-2 border-[#8b4513]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <div className="flex-1 h-px bg-[#8b4513]/30" />
            <h2 className="font-serif text-2xl md:text-3xl text-[#8b4513] uppercase tracking-widest">
              Avatars
            </h2>
            <div className="flex-1 h-px bg-[#8b4513]/30" />
          </div>
          <div className="flex flex-wrap items-end gap-6">
            <div className="w-16 h-16 bg-[#8b4513] border-2 border-[#5c2e0a] flex items-center justify-center">
              <User className="w-8 h-8 text-[#f5e6d3]" />
            </div>
            <div className="w-14 h-14 bg-[#c94c4c] border-2 border-[#8b2c2c] flex items-center justify-center">
              <User className="w-7 h-7 text-[#f5e6d3]" />
            </div>
            <div className="w-12 h-12 bg-[#2e4a3f] border-2 border-[#1a2d26] flex items-center justify-center">
              <User className="w-6 h-6 text-[#f5e6d3]" />
            </div>
            <div className="w-10 h-10 bg-[#d4a373] border-2 border-[#8b4513] flex items-center justify-center">
              <User className="w-5 h-5 text-[#5c2e0a]" />
            </div>
            <div className="flex -space-x-2">
              {["#8b4513", "#c94c4c", "#2e4a3f", "#d4a373"].map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-10 border-2 border-[#f5e6d3] flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <User className="w-5 h-5 text-[#f5e6d3]" />
                </div>
              ))}
            </div>
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
