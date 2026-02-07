"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flower2,
  Leaf,
  Sun,
  Heart,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Info,
  TreePine,
  Sprout,
  Cherry,
} from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf6f0] via-[#f5d75f]/5 to-[#d4a0a0]/10 text-[#8b7355]">
      {/* Navigation */}
      <nav className="border-b border-[#d4a0a0]/30 bg-[#faf6f0]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/styles/cottagecore"
            className="flex items-center gap-2 text-[#5a8f5a] hover:text-[#5a8f5a]/80 transition-colors"
          >
            <Leaf className="w-5 h-5" />
            <span className="font-serif">Back to Docs</span>
          </Link>
          <span className="font-serif text-xl text-[#8b7355] tracking-wide">
            Cottagecore
          </span>
          <Link
            href="/styles"
            className="px-5 py-2 border border-[#d4a0a0]/40 text-[#8b7355] font-serif rounded-full shadow-sm hover:bg-[#d4a0a0]/10 hover:shadow-md transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Flower2 className="w-10 h-10 text-[#d4a0a0]" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-[#8b7355] mb-6 leading-tight">
            Cottagecore
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#8b7355]/70 max-w-xl mx-auto mb-10 leading-relaxed">
            A simpler life among wildflowers and warm hearths -- where every
            detail whispers of meadows, honey, and handmade things.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-[#5a8f5a] text-white font-serif rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Gather Flowers
            </button>
            <button className="px-10 py-4 border-2 border-[#8b7355]/40 text-[#8b7355] font-serif rounded-full hover:bg-[#8b7355]/10 hover:border-[#8b7355]/60 transition-all duration-300">
              Explore Garden
            </button>
          </div>
        </div>
      </section>

      {/* Cross-Stitch Divider */}
      <div className="flex items-center justify-center gap-1.5 py-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${
              i % 3 === 0 ? "bg-[#d4a0a0]/50" : i % 3 === 1 ? "bg-[#5a8f5a]/40" : "bg-[#f5d75f]/50"
            }`}
          />
        ))}
      </div>

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Color Palette</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Warm earth tones from the garden</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Sage Green", hex: "#5a8f5a", bg: "bg-[#5a8f5a]", text: "text-white" },
              { name: "Daisy Yellow", hex: "#f5d75f", bg: "bg-[#f5d75f]", text: "text-[#8b7355]" },
              { name: "Earth Brown", hex: "#8b7355", bg: "bg-[#8b7355]", text: "text-white" },
              { name: "Flower Pink", hex: "#d4a0a0", bg: "bg-[#d4a0a0]", text: "text-white" },
              { name: "Cream", hex: "#faf6f0", bg: "bg-[#faf6f0]", text: "text-[#8b7355]" },
            ].map((color) => (
              <div key={color.name} className="border border-[#d4a0a0]/30 bg-white/60 rounded-2xl shadow-sm overflow-hidden">
                <div className={`h-24 md:h-32 ${color.bg}`} />
                <div className="p-3 md:p-4">
                  <p className="font-serif text-sm text-[#8b7355]">{color.name}</p>
                  <p className="text-xs text-[#8b7355]/60 font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Typography</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Handwritten warmth meets gentle reading</p>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-8 bg-[#faf6f0] border border-[#d4a0a0]/30 rounded-2xl shadow-sm">
              <p className="text-xs font-serif text-[#5a8f5a] uppercase tracking-widest mb-4">Serif Headings</p>
              <h3 className="font-serif text-3xl md:text-4xl text-[#8b7355] mb-4 leading-snug">
                A Quiet Morning in the Garden
              </h3>
              <p className="text-sm text-[#8b7355]/50 font-serif">font-serif -- warm, organic, hand-lettered feel</p>
            </div>
            <div className="p-8 bg-[#faf6f0] border border-[#5a8f5a]/20 rounded-2xl shadow-sm">
              <p className="text-xs font-serif text-[#d4a0a0] uppercase tracking-widest mb-4">Body Text</p>
              <p className="font-serif text-base md:text-lg text-[#8b7355]/80 leading-relaxed mb-4">
                The garden journal rests on a sun-warmed windowsill. Its pages hold
                pressed petals and notes on which seeds to sow when the frost has passed.
              </p>
              <p className="text-sm text-[#8b7355]/50 font-serif">font-serif -- leading-relaxed -- readable warmth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Buttons</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Soft, rounded, and inviting</p>
          <div className="p-8 bg-white/60 border border-[#d4a0a0]/30 rounded-2xl shadow-sm">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#5a8f5a] text-white font-serif rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#faf6f0] text-[#8b7355] border border-[#8b7355]/30 font-serif rounded-full hover:bg-[#f5d75f]/20 transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#d4a0a0]/60 text-[#d4a0a0] font-serif rounded-full hover:bg-[#d4a0a0]/10 transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent text-[#5a8f5a] font-serif rounded-full hover:bg-[#5a8f5a]/10 transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Cards</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Stories from hearth and garden</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#faf6f0] border border-[#d4a0a0]/40 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-[#d4a0a0]/20 rounded-full flex items-center justify-center mb-4">
                <Flower2 className="w-7 h-7 text-[#d4a0a0]" />
              </div>
              <h3 className="text-xl font-serif text-[#8b7355] mb-2">Wildflower Garden</h3>
              <p className="text-[#8b7355]/60 font-serif text-sm leading-relaxed">
                Where daisies and lavender dance in the breeze beside a mossy stone wall.
              </p>
            </div>
            <div className="p-6 bg-[#faf6f0] border border-[#5a8f5a]/30 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-[#f5d75f]/20 rounded-full flex items-center justify-center mb-4">
                <Sun className="w-7 h-7 text-[#8b7355]" />
              </div>
              <h3 className="text-xl font-serif text-[#8b7355] mb-2">Country Kitchen</h3>
              <p className="text-[#8b7355]/60 font-serif text-sm leading-relaxed">
                Warm bread cooling on the sill, honey dripping from a wooden spoon.
              </p>
            </div>
            <div className="p-6 bg-[#faf6f0] border border-[#f5d75f]/40 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-[#5a8f5a]/15 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-[#d4a0a0]" />
              </div>
              <h3 className="text-xl font-serif text-[#8b7355] mb-2">Handmade Crafts</h3>
              <p className="text-[#8b7355]/60 font-serif text-sm leading-relaxed">
                Knitted blankets and embroidered linens tell stories of patient hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Form</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Gentle fields, warm labels</p>
          <div className="p-8 bg-[#faf6f0] border border-[#d4a0a0]/40 rounded-2xl shadow-md">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-[#5a8f5a]/15 rounded-full flex items-center justify-center mb-3">
                <Heart className="w-7 h-7 text-[#d4a0a0]" />
              </div>
              <h3 className="text-xl font-serif text-[#8b7355]">Write a Letter</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-serif text-[#5a8f5a] mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Dear friend..."
                  className="w-full px-4 py-3 bg-white/80 border border-[#8b7355]/25 rounded-xl text-[#8b7355] placeholder-[#8b7355]/40 font-serif focus:border-[#5a8f5a]/60 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-serif text-[#d4a0a0] mb-2">Your Message</label>
                <textarea
                  placeholder="Thinking of you..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white/80 border border-[#d4a0a0]/30 rounded-xl text-[#8b7355] placeholder-[#d4a0a0]/50 font-serif focus:border-[#d4a0a0]/60 focus:outline-none resize-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#5a8f5a] text-white font-serif rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                Send with Love
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Stitch Divider */}
      <div className="flex items-center justify-center gap-2 py-4">
        <span className="w-8 h-px bg-[#d4a0a0]/40" />
        <Flower2 className="w-4 h-4 text-[#d4a0a0]/40" />
        <span className="w-8 h-px bg-[#d4a0a0]/40" />
      </div>

      {/* Tabs */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Tabs</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Explore the cottage corners</p>
          <div className="border border-[#d4a0a0]/30 rounded-2xl overflow-hidden bg-[#faf6f0] shadow-sm">
            <div className="flex border-b border-[#d4a0a0]/30">
              {["Garden", "Kitchen", "Craft"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 py-4 font-serif text-sm md:text-base transition-all ${
                    activeTab === i
                      ? "bg-[#5a8f5a]/10 text-[#5a8f5a] border-b-2 border-[#5a8f5a] -mb-px"
                      : "text-[#8b7355]/50 hover:text-[#8b7355] hover:bg-[#f5d75f]/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 font-serif text-[#8b7355]/80 leading-relaxed">
              {activeTab === 0 && (
                <div className="flex items-start gap-4">
                  <Sprout className="w-6 h-6 text-[#5a8f5a] shrink-0 mt-0.5" />
                  <p>
                    The garden path winds through foxgloves and sweet peas. Morning dew still
                    glistens on the herbs, and the bees have begun their gentle work among the
                    lavender. A wicker basket waits to be filled.
                  </p>
                </div>
              )}
              {activeTab === 1 && (
                <div className="flex items-start gap-4">
                  <Cherry className="w-6 h-6 text-[#d4a0a0] shrink-0 mt-0.5" />
                  <p>
                    The kitchen smells of fresh sourdough and simmering berry jam. Copper pots
                    hang above a worn wooden counter, and a jar of wildflower honey catches the
                    afternoon light through the window.
                  </p>
                </div>
              )}
              {activeTab === 2 && (
                <div className="flex items-start gap-4">
                  <Heart className="w-6 h-6 text-[#d4a0a0] shrink-0 mt-0.5" />
                  <p>
                    Needles and thread rest beside a half-finished embroidery hoop. Skeins of
                    yarn in sage and rose fill a basket, and a linen sampler hangs on the wall --
                    proof that slow work creates lasting beauty.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pressed Flower Badges */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Badges</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Pressed flower tags and seed labels</p>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-serif text-[#5a8f5a] uppercase tracking-widest mb-4">Botanical Badges</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#5a8f5a]/15 text-[#5a8f5a] font-serif text-sm rounded-full">
                  <Leaf className="w-3.5 h-3.5" /> Perennial
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#d4a0a0]/15 text-[#d4a0a0] font-serif text-sm rounded-full">
                  <Flower2 className="w-3.5 h-3.5" /> Wildflower
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#f5d75f]/20 text-[#8b7355] font-serif text-sm rounded-full">
                  <Sun className="w-3.5 h-3.5" /> Full Sun
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-serif text-[#d4a0a0] uppercase tracking-widest mb-4">Seed Packet Tags</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-[#faf6f0] border border-[#8b7355]/30 text-[#8b7355] font-serif text-sm rounded-lg shadow-sm">
                  Lavender
                </span>
                <span className="px-4 py-1.5 bg-[#faf6f0] border border-[#8b7355]/30 text-[#8b7355] font-serif text-sm rounded-lg shadow-sm">
                  Sweet Pea
                </span>
                <span className="px-4 py-1.5 bg-[#faf6f0] border border-[#8b7355]/30 text-[#8b7355] font-serif text-sm rounded-lg shadow-sm">
                  Foxglove
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-serif text-[#8b7355] uppercase tracking-widest mb-4">Berry Labels</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#d4a0a0]/10 border border-[#d4a0a0]/30 text-[#d4a0a0] font-serif text-sm rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#d4a0a0]" /> Strawberry
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#8b7355]/10 border border-[#8b7355]/30 text-[#8b7355] font-serif text-sm rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#8b7355]" /> Blackberry
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5a8f5a]/10 border border-[#5a8f5a]/30 text-[#5a8f5a] font-serif text-sm rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#5a8f5a]" /> Gooseberry
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bars */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Progress</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Mason jar fill levels</p>
          <div className="space-y-6">
            {[
              { label: "Honey Harvest", pct: 85, color: "bg-[#f5d75f]", track: "bg-[#f5d75f]/20" },
              { label: "Rose Petal Jam", pct: 60, color: "bg-[#d4a0a0]", track: "bg-[#d4a0a0]/20" },
              { label: "Herb Drying", pct: 40, color: "bg-[#5a8f5a]", track: "bg-[#5a8f5a]/20" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between font-serif text-sm text-[#8b7355] mb-2">
                  <span>{bar.label}</span>
                  <span>{bar.pct}%</span>
                </div>
                <div className={`h-3 ${bar.track} rounded-full overflow-hidden`}>
                  <div
                    className={`h-full ${bar.color} rounded-full transition-all`}
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Alerts</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Garden notices and reminders</p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-[#5a8f5a]/10 border border-[#5a8f5a]/30 rounded-xl">
              <Info className="w-5 h-5 text-[#5a8f5a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#5a8f5a] mb-1">Wildflower Info</p>
                <p className="font-serif text-sm text-[#5a8f5a]/70">Sow seeds after the last frost for best results.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#f5d75f]/10 border border-[#f5d75f]/40 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-[#8b7355] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#8b7355] mb-1">Honeybee Warning</p>
                <p className="font-serif text-sm text-[#8b7355]/70">The hive is very active today -- approach gently.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#d4a0a0]/10 border border-[#d4a0a0]/40 rounded-xl">
              <X className="w-5 h-5 text-[#d4a0a0] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#d4a0a0] mb-1">Thorn Alert</p>
                <p className="font-serif text-sm text-[#d4a0a0]/70">The rose bushes need pruning. Wear gloves.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#5a8f5a]/15 border border-[#5a8f5a]/40 rounded-xl">
              <Check className="w-5 h-5 text-[#5a8f5a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#5a8f5a] mb-1">Harvest Success</p>
                <p className="font-serif text-sm text-[#5a8f5a]/70">The berry baskets are full. Time for jam-making.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Stitch Divider */}
      <div className="flex items-center justify-center gap-1.5 py-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[#8b7355]/30" />
        ))}
      </div>

      {/* Dropdown */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-xs mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Dropdown</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Flower-press selection</p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-5 py-3 bg-[#faf6f0] border border-[#d4a0a0]/40 rounded-xl font-serif text-sm text-[#8b7355] flex items-center justify-between hover:border-[#5a8f5a]/50 transition-all shadow-sm"
            >
              <span>Choose a Flower</span>
              <ChevronDown className={`w-4 h-4 text-[#8b7355]/60 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#faf6f0] border border-[#d4a0a0]/40 rounded-xl shadow-lg z-10 overflow-hidden">
                {["Lavender", "Chamomile", "Rosemary", "Sunflower", "Sweet William"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-5 py-3 text-left font-serif text-sm text-[#8b7355] hover:bg-[#5a8f5a]/10 transition-colors border-b border-[#d4a0a0]/20 last:border-b-0"
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
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Seed Catalog</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Planting schedule for the season</p>
          <div className="border border-[#d4a0a0]/30 rounded-2xl overflow-hidden bg-[#faf6f0] shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#d4a0a0]/30 bg-[#5a8f5a]/10">
                  <th className="px-4 py-3 text-left font-serif text-xs uppercase tracking-widest text-[#5a8f5a] font-normal">Plant</th>
                  <th className="px-4 py-3 text-left font-serif text-xs uppercase tracking-widest text-[#5a8f5a] font-normal">Season</th>
                  <th className="px-4 py-3 text-left font-serif text-xs uppercase tracking-widest text-[#5a8f5a] font-normal">Sun</th>
                  <th className="px-4 py-3 text-left font-serif text-xs uppercase tracking-widest text-[#5a8f5a] font-normal">Water</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plant: "Lavender", season: "Spring", sun: "Full Sun", water: "Low" },
                  { plant: "Sweet Pea", season: "Early Spring", sun: "Partial", water: "Medium" },
                  { plant: "Chamomile", season: "Spring", sun: "Full Sun", water: "Low" },
                  { plant: "Foxglove", season: "Autumn", sun: "Dappled", water: "Medium" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#d4a0a0]/20 last:border-b-0 hover:bg-[#f5d75f]/10 transition-colors">
                    <td className="px-4 py-3 font-serif text-sm text-[#8b7355] font-medium">{row.plant}</td>
                    <td className="px-4 py-3 font-serif text-sm text-[#8b7355]/70">{row.season}</td>
                    <td className="px-4 py-3 font-serif text-sm text-[#8b7355]/70">{row.sun}</td>
                    <td className="px-4 py-3 font-serif text-sm text-[#8b7355]/70">{row.water}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Blockquote */}
      <section className="py-16 md:py-24 px-6 bg-white/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Garden Journal</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Words from the potting shed</p>
          <blockquote className="border-l-4 border-[#5a8f5a]/50 pl-6 md:pl-8">
            <p className="font-serif text-xl md:text-2xl text-[#8b7355] italic leading-relaxed mb-4">
              &ldquo;To plant a garden is to believe in tomorrow. Every seed is a whispered
              promise that the earth will keep.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <Leaf className="w-4 h-4 text-[#5a8f5a]/50" />
              <span className="w-8 h-px bg-[#8b7355]/30" />
              <footer className="font-serif text-sm text-[#8b7355]/60">
                A Gardener&apos;s Almanac
              </footer>
            </div>
          </blockquote>
        </div>
      </section>

      {/* Cross-Stitch Divider */}
      <div className="flex items-center justify-center gap-3 py-6">
        <span className="w-2 h-2 rounded-full bg-[#5a8f5a]/30" />
        <span className="w-12 h-px bg-[#d4a0a0]/30" />
        <Leaf className="w-4 h-4 text-[#5a8f5a]/30" />
        <span className="w-12 h-px bg-[#d4a0a0]/30" />
        <span className="w-2 h-2 rounded-full bg-[#5a8f5a]/30" />
      </div>

      {/* Rules Summary */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-[#8b7355] mb-3 text-center">Design Rules</h2>
          <p className="font-serif text-[#8b7355]/60 mb-10 text-center">Core principles of the cottage aesthetic</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#5a8f5a]/10 border border-[#5a8f5a]/30 rounded-2xl">
              <h3 className="font-serif text-lg text-[#5a8f5a] mb-4">Required</h3>
              <ul className="space-y-2 font-serif text-sm text-[#8b7355]/80">
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#5a8f5a] shrink-0 mt-0.5" /><span>Warm earth tones -- cream, sage, rose, honey</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#5a8f5a] shrink-0 mt-0.5" /><span>Botanical accents with Lucide icons</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#5a8f5a] shrink-0 mt-0.5" /><span>Rounded shapes -- rounded-xl, rounded-full</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#5a8f5a] shrink-0 mt-0.5" /><span>Soft shadows and gentle transitions</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#5a8f5a] shrink-0 mt-0.5" /><span>Serif typography with handwritten warmth</span></li>
              </ul>
            </div>
            <div className="p-6 bg-[#d4a0a0]/10 border border-[#d4a0a0]/30 rounded-2xl">
              <h3 className="font-serif text-lg text-[#d4a0a0] mb-4">Forbidden</h3>
              <ul className="space-y-2 font-serif text-sm text-[#8b7355]/80">
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#d4a0a0] shrink-0 mt-0.5" /><span>Neon colors or high-saturation palettes</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#d4a0a0] shrink-0 mt-0.5" /><span>Sharp angles or square corners</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#d4a0a0] shrink-0 mt-0.5" /><span>Monospace or cold sans-serif fonts</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#d4a0a0] shrink-0 mt-0.5" /><span>Dark themes or black backgrounds</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#d4a0a0] shrink-0 mt-0.5" /><span>Hard drop-shadows or glowing effects</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d4a0a0]/30 py-8 px-6 bg-[#faf6f0]/60">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-[#5a8f5a]/60" />
            <p className="font-serif text-sm text-[#8b7355]/50">
              Cottagecore Showcase
            </p>
          </div>
          <Link
            href="/styles/cottagecore"
            className="font-serif text-sm text-[#5a8f5a] hover:text-[#5a8f5a]/80 transition-colors"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
