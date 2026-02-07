"use client";

import { useState } from "react";
import Link from "next/link";
import { Cross, Flower2, Crown, Heart, ChevronDown, Check, X, ArrowLeft } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a] text-[#e5e5e5] relative overflow-hidden">
      {/* Ornate border frame */}
      <div className="fixed inset-4 border border-[#4a1a4a]/20 pointer-events-none z-0" />
      <div className="fixed inset-8 border border-[#8b1a2a]/10 pointer-events-none z-0" />

      {/* Corner ornaments */}
      <div className="fixed top-6 left-6 w-12 h-12 border-t border-l border-[#4a1a4a]/40 pointer-events-none z-0" />
      <div className="fixed top-6 right-6 w-12 h-12 border-t border-r border-[#4a1a4a]/40 pointer-events-none z-0" />
      <div className="fixed bottom-6 left-6 w-12 h-12 border-b border-l border-[#4a1a4a]/40 pointer-events-none z-0" />
      <div className="fixed bottom-6 right-6 w-12 h-12 border-b border-r border-[#4a1a4a]/40 pointer-events-none z-0" />

      {/* 1. Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#4a1a4a]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/gothic-lolita"
            className="flex items-center gap-2 text-[#e5e5e5]/70 hover:text-[#e5e5e5] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif tracking-wide">Back</span>
          </Link>
          <span className="font-serif text-xl text-[#e5e5e5] tracking-[0.2em] uppercase">
            Gothic Lolita
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#4a1a4a]/50 text-[#e5e5e5]/70 font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.3)] hover:bg-[#4a1a4a]/20 hover:border-[#8b1a2a]/50 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif">Victorian Dark Elegance</p>
          <h1 className="text-5xl md:text-7xl font-serif text-[#e5e5e5] mb-6 tracking-wider">
            Gothic
            <br />
            <span className="italic text-[#8b1a2a]">Lolita</span>
          </h1>
          <p className="text-lg text-[#e5e5e5]/60 max-w-2xl mx-auto mb-10 font-serif leading-relaxed">
            Dark elegance, Victorian grace -- lace borders, ribbon accents, roses and crosses in a world of shadow and beauty.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#8b1a2a] to-transparent mx-auto mb-10" />
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_4px_16px_rgba(74,26,74,0.5)] hover:shadow-[0_8px_24px_rgba(139,26,42,0.5)] hover:border-[#8b1a2a] transition-all duration-300">
              Enter the Garden
            </button>
            <button className="px-10 py-4 bg-transparent border border-[#e5e5e5]/30 text-[#e5e5e5]/70 font-serif tracking-wide hover:border-[#e5e5e5]/60 hover:text-[#e5e5e5] transition-all duration-300">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Lace Divider */}
      <div className="relative z-10 flex items-center justify-center py-4">
        <div className="flex items-center gap-3">
          <div className="w-16 md:w-32 h-px bg-gradient-to-r from-transparent to-[#4a1a4a]/50" />
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8b1a2a]/60" />
            ))}
          </div>
          <Flower2 className="w-4 h-4 text-[#8b1a2a]/50" />
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8b1a2a]/60" />
            ))}
          </div>
          <div className="w-16 md:w-32 h-px bg-gradient-to-l from-transparent to-[#4a1a4a]/50" />
        </div>
      </div>

      {/* 3. Color Palette */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Palette</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Color System</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]", border: "border-[#4a1a4a]/40" },
              { name: "Deep Purple", hex: "#4a1a4a", bg: "bg-[#4a1a4a]", border: "border-[#6b2d5b]/40" },
              { name: "Blood Red", hex: "#8b1a2a", bg: "bg-[#8b1a2a]", border: "border-[#8b1a2a]/40" },
              { name: "Silver White", hex: "#e5e5e5", bg: "bg-[#e5e5e5]", border: "border-[#e5e5e5]/40" },
              { name: "Dark Plum", hex: "#6b2d5b", bg: "bg-[#6b2d5b]", border: "border-[#6b2d5b]/40" },
            ].map((color) => (
              <div key={color.name} className={`border ${color.border} bg-[#0a0a0a]/80 shadow-[0_4px_12px_rgba(74,26,74,0.15)]`}>
                <div className={`h-20 md:h-28 ${color.bg}`} />
                <div className="p-3 md:p-4 border-t border-[#4a1a4a]/20">
                  <p className="font-serif text-sm text-[#e5e5e5]/80">{color.name}</p>
                  <p className="text-xs text-[#8b1a2a] font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Typography */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Typography</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Letterforms</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-[#0a0a0a]/60 border border-[#4a1a4a]/30">
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">Decorative Heading</p>
              <h3 className="font-serif text-3xl md:text-5xl tracking-tight mb-4 italic">
                The Art of <span className="text-[#8b1a2a]">Darkness</span>
              </h3>
              <p className="text-sm text-[#e5e5e5]/40 font-serif">font-serif / italic / tracking-tight</p>
            </div>
            <div className="p-8 bg-[#0a0a0a]/60 border border-[#4a1a4a]/30">
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">Body with Drop Cap</p>
              <p className="text-base leading-relaxed text-[#e5e5e5]/70 first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#8b1a2a]">
                In the quiet parlour of a forgotten estate, lace curtains frame windows where moonlight spills across velvet armchairs. Each detail speaks of a devotion to craft that modern haste has abandoned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Buttons */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Interactions</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Buttons</h2>
          <div className="p-8 bg-[#0a0a0a]/60 border border-[#4a1a4a]/30 space-y-8">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">Variants</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.5)] hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)] transition-all">
                  Primary
                </button>
                <button className="px-6 py-3 bg-[#0a0a0a] border border-[#4a1a4a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(10,10,10,0.5)] hover:border-[#8b1a2a]/50 transition-all">
                  Secondary
                </button>
                <button className="px-6 py-3 bg-transparent border border-[#8b1a2a]/50 text-[#8b1a2a] font-serif tracking-wide hover:bg-[#8b1a2a]/10 transition-all">
                  Outline
                </button>
                <button className="px-6 py-3 bg-transparent text-[#e5e5e5]/50 font-serif tracking-wide hover:text-[#e5e5e5]/80 transition-all">
                  Ghost
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">With Icons</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.5)] hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)] transition-all flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Devotion
                </button>
                <button className="px-6 py-3 bg-transparent border border-[#8b1a2a]/50 text-[#8b1a2a] font-serif tracking-wide hover:bg-[#8b1a2a]/10 transition-all flex items-center gap-2">
                  <Cross className="w-4 h-4" />
                  Sacred
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Cards */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Collection</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0a0a0a]/90 border border-[#4a1a4a]/40 shadow-[0_4px_16px_rgba(74,26,74,0.3)] hover:border-[#8b1a2a]/50 hover:shadow-[0_8px_24px_rgba(139,26,42,0.2)] transition-all group">
              <div className="w-14 h-14 bg-[#4a1a4a]/30 border border-[#4a1a4a]/50 flex items-center justify-center mb-4 group-hover:border-[#8b1a2a]/50 transition-colors">
                <Cross className="w-7 h-7 text-[#8b1a2a]" />
              </div>
              <h3 className="text-xl font-serif text-[#e5e5e5] mb-2 tracking-wide">Cross</h3>
              <p className="text-[#e5e5e5]/50 font-serif text-sm leading-relaxed">Sacred darkness and silent devotion, wrought in iron and silver thread.</p>
              <div className="mt-4 pt-4 border-t border-[#4a1a4a]/20">
                <span className="text-xs font-serif text-[#6b2d5b] tracking-wider">RELIC NO. I</span>
              </div>
            </div>
            <div className="p-6 bg-[#0a0a0a]/90 border border-[#8b1a2a]/30 shadow-[0_4px_16px_rgba(139,26,42,0.2)] hover:border-[#8b1a2a]/60 hover:shadow-[0_8px_24px_rgba(139,26,42,0.3)] transition-all group">
              <div className="w-14 h-14 bg-[#8b1a2a]/20 border border-[#8b1a2a]/40 flex items-center justify-center mb-4 group-hover:border-[#8b1a2a]/60 transition-colors">
                <Flower2 className="w-7 h-7 text-[#8b1a2a]" />
              </div>
              <h3 className="text-xl font-serif text-[#e5e5e5] mb-2 tracking-wide">Rose</h3>
              <p className="text-[#e5e5e5]/50 font-serif text-sm leading-relaxed">Beauty born from thorns, petals pressed between pages of forgotten diaries.</p>
              <div className="mt-4 pt-4 border-t border-[#8b1a2a]/20">
                <span className="text-xs font-serif text-[#6b2d5b] tracking-wider">RELIC NO. II</span>
              </div>
            </div>
            <div className="p-6 bg-[#0a0a0a]/90 border border-[#e5e5e5]/20 shadow-[0_4px_16px_rgba(229,229,229,0.05)] hover:border-[#e5e5e5]/30 hover:shadow-[0_8px_24px_rgba(229,229,229,0.1)] transition-all group">
              <div className="w-14 h-14 bg-[#e5e5e5]/10 border border-[#e5e5e5]/20 flex items-center justify-center mb-4 group-hover:border-[#e5e5e5]/30 transition-colors">
                <Crown className="w-7 h-7 text-[#e5e5e5]/70" />
              </div>
              <h3 className="text-xl font-serif text-[#e5e5e5] mb-2 tracking-wide">Crown</h3>
              <p className="text-[#e5e5e5]/50 font-serif text-sm leading-relaxed">Regal elegance in shadow, where noble blood meets midnight velvet.</p>
              <div className="mt-4 pt-4 border-t border-[#e5e5e5]/10">
                <span className="text-xs font-serif text-[#6b2d5b] tracking-wider">RELIC NO. III</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Form */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-md mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Correspondence</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Form</h2>
          <div className="p-8 bg-[#0a0a0a]/90 border border-[#4a1a4a]/30 shadow-[0_4px_16px_rgba(74,26,74,0.3)]">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-[#4a1a4a]/20 border border-[#4a1a4a]/40 flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-[#8b1a2a]" />
              </div>
              <h3 className="text-xl font-serif text-[#e5e5e5] tracking-wide">Write to Us</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-[#8b1a2a] tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#4a1a4a]/50 text-[#e5e5e5] placeholder-[#4a1a4a]/50 font-serif focus:border-[#8b1a2a] focus:shadow-[0_0_12px_rgba(139,26,42,0.4)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#6b2d5b] tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#4a1a4a]/50 text-[#e5e5e5] placeholder-[#4a1a4a]/50 font-serif focus:border-[#8b1a2a] focus:shadow-[0_0_12px_rgba(139,26,42,0.4)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#6b2d5b] tracking-wider mb-2">Message</label>
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border border-[#4a1a4a]/50 text-[#e5e5e5] placeholder-[#4a1a4a]/50 font-serif focus:border-[#8b1a2a] focus:shadow-[0_0_12px_rgba(139,26,42,0.4)] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#4a1a4a] border border-[#8b1a2a]/60 text-[#e5e5e5] font-serif tracking-wide shadow-[0_2px_8px_rgba(74,26,74,0.5)] hover:shadow-[0_4px_16px_rgba(139,26,42,0.5)] transition-all">
                Send Letter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Tabs */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Motifs</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Tabs</h2>
          <div className="border border-[#4a1a4a]/30 bg-[#0a0a0a]/60">
            <div className="flex border-b border-[#4a1a4a]/30">
              {["Lace", "Ribbon", "Rose"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 px-6 py-4 text-sm font-serif tracking-wider transition-all relative ${
                    activeTab === i
                      ? "text-[#e5e5e5] bg-[#4a1a4a]/20"
                      : "text-[#e5e5e5]/40 hover:text-[#e5e5e5]/70 hover:bg-[#4a1a4a]/10"
                  }`}
                >
                  {tab}
                  {activeTab === i && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-[#8b1a2a] to-transparent" />
                  )}
                </button>
              ))}
            </div>
            <div className="p-6 font-serif text-sm text-[#e5e5e5]/60 leading-relaxed">
              {activeTab === 0 && (
                <div>
                  <p className="text-[#8b1a2a] mb-2 tracking-wide">-- Lace Motif</p>
                  <p>Delicate scalloped edges and intricate openwork patterns define the lace motif. Every border whispers of handcraft, from Chantilly to Valenciennes. Apply scalloped borders, filigree overlays, and translucent layering.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <p className="text-[#6b2d5b] mb-2 tracking-wide">-- Ribbon Motif</p>
                  <p>Satin ribbons cascade in bows and streamers, binding the composition together. Use ribbon-shaped badges, bow-tie dividers, and flowing accent lines to evoke the elegance of wrapped gifts and corset lacing.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <p className="text-[#8b1a2a] mb-2 tracking-wide">-- Rose Motif</p>
                  <p>The rose stands as the ultimate symbol of Gothic Lolita -- beauty entwined with thorns. Employ rose silhouettes as section dividers, petal-shaped containers, and thorn-vine borders throughout your designs.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Ribbon Badges */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Adornments</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Badges</h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">Satin Ribbon</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-[#4a1a4a] text-[#e5e5e5] text-xs font-serif tracking-wider shadow-[0_2px_6px_rgba(74,26,74,0.5)]">Velvet</span>
                <span className="px-4 py-1.5 bg-[#8b1a2a] text-[#e5e5e5] text-xs font-serif tracking-wider shadow-[0_2px_6px_rgba(139,26,42,0.5)]">Crimson</span>
                <span className="px-4 py-1.5 bg-[#6b2d5b] text-[#e5e5e5] text-xs font-serif tracking-wider shadow-[0_2px_6px_rgba(107,45,91,0.5)]">Plum</span>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">Lace Border Tag</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 border border-[#4a1a4a]/60 text-[#e5e5e5]/70 text-xs font-serif tracking-wider border-dashed">Antique</span>
                <span className="px-4 py-1.5 border border-[#8b1a2a]/50 text-[#8b1a2a] text-xs font-serif tracking-wider border-dashed">Gothic</span>
                <span className="px-4 py-1.5 border border-[#e5e5e5]/30 text-[#e5e5e5]/50 text-xs font-serif tracking-wider border-dashed">Silver</span>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">Rosette Badge</p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-1.5 bg-[#8b1a2a]/20 text-[#8b1a2a] border border-[#8b1a2a]/40 text-xs font-serif tracking-wider shadow-[0_0_8px_rgba(139,26,42,0.3)]">Limited</span>
                <span className="px-4 py-1.5 bg-[#4a1a4a]/20 text-[#e5e5e5]/70 border border-[#4a1a4a]/40 text-xs font-serif tracking-wider shadow-[0_0_8px_rgba(74,26,74,0.3)]">Exclusive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Progress Bars */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Devotion</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Progress</h2>
          <div className="space-y-8">
            {[
              { label: "Lace Weaving", pct: "85%", w: "w-[85%]", color: "bg-[#4a1a4a]", track: "bg-[#4a1a4a]/20", border: "border-[#4a1a4a]/30" },
              { label: "Rose Cultivation", pct: "60%", w: "w-[60%]", color: "bg-[#8b1a2a]", track: "bg-[#8b1a2a]/20", border: "border-[#8b1a2a]/30" },
              { label: "Ribbon Stitching", pct: "40%", w: "w-[40%]", color: "bg-[#6b2d5b]", track: "bg-[#6b2d5b]/20", border: "border-[#6b2d5b]/30" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-xs mb-2 font-serif">
                  <span className="text-[#e5e5e5]/60 tracking-wider">{bar.label}</span>
                  <span className="text-[#8b1a2a]">{bar.pct}</span>
                </div>
                <div className={`h-2.5 ${bar.track} border ${bar.border} relative overflow-hidden`}>
                  <div className={`h-full ${bar.w} ${bar.color} shadow-[0_0_8px_rgba(139,26,42,0.3)] transition-all`} />
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="w-px h-full bg-[#0a0a0a]/30" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Alerts */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Notices</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Alerts</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-[#8b1a2a]/30 bg-[#8b1a2a]/5">
              <Flower2 className="w-5 h-5 text-[#8b1a2a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-serif text-[#8b1a2a] mb-1">Rose Notice</p>
                <p className="text-sm text-[#e5e5e5]/50 font-serif">A gentle reminder adorned with the scent of roses.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-amber-700/30 bg-amber-900/5 border-l-2 border-l-amber-700">
              <Cross className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-serif text-amber-600 mb-1">Warning</p>
                <p className="text-sm text-[#e5e5e5]/50 font-serif">Take heed -- something requires your careful attention.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-[#8b1a2a]/50 bg-[#8b1a2a]/10 border-dashed">
              <X className="w-5 h-5 text-[#8b1a2a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-serif text-[#8b1a2a] mb-1">Error</p>
                <p className="text-sm text-[#e5e5e5]/50 font-serif">Something has gone terribly wrong in the parlour.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-emerald-800/30 bg-emerald-900/10 border-l-2 border-l-emerald-700">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-serif text-emerald-600 mb-1">Success</p>
                <p className="text-sm text-[#e5e5e5]/50 font-serif">Your offering has been gracefully received.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Dropdown */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-xs mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Selection</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Dropdown</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border border-[#4a1a4a]/50 bg-[#0a0a0a]/80 font-serif text-sm text-[#e5e5e5]/70 hover:border-[#8b1a2a]/50 transition-all shadow-[0_2px_8px_rgba(74,26,74,0.2)]"
            >
              <span>Choose a Motif</span>
              <ChevronDown className={`w-4 h-4 text-[#8b1a2a] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 border border-[#4a1a4a]/50 bg-[#0a0a0a] z-20 shadow-[0_8px_24px_rgba(74,26,74,0.4)]">
                {["Cross & Iron", "Rose & Thorn", "Lace & Pearl", "Ribbon & Bow", "Crown & Scepter"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-4 py-3 text-left text-sm font-serif text-[#e5e5e5]/60 hover:text-[#e5e5e5] hover:bg-[#4a1a4a]/20 transition-all border-b border-[#4a1a4a]/20 last:border-b-0"
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

      {/* 13. Table */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Inventory</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Collection Table</h2>
          <div className="border border-[#4a1a4a]/30 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#4a1a4a]/15 border-b border-[#4a1a4a]/30">
                  <th className="px-4 py-3 text-left text-xs tracking-[0.2em] uppercase text-[#8b1a2a] font-serif font-normal">Item</th>
                  <th className="px-4 py-3 text-left text-xs tracking-[0.2em] uppercase text-[#8b1a2a] font-serif font-normal">Category</th>
                  <th className="px-4 py-3 text-left text-xs tracking-[0.2em] uppercase text-[#8b1a2a] font-serif font-normal">Era</th>
                  <th className="px-4 py-3 text-right text-xs tracking-[0.2em] uppercase text-[#8b1a2a] font-serif font-normal">Condition</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Chantilly Lace Collar", cat: "Accessory", era: "1890s", cond: "Pristine", condColor: "text-emerald-500" },
                  { item: "Iron Crucifix Brooch", cat: "Jewelry", era: "1870s", cond: "Aged", condColor: "text-[#8b1a2a]" },
                  { item: "Velvet Mourning Dress", cat: "Garment", era: "1860s", cond: "Restored", condColor: "text-[#6b2d5b]" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#4a1a4a]/15 last:border-b-0 hover:bg-[#4a1a4a]/10 transition-colors">
                    <td className="px-4 py-4 text-sm font-serif text-[#e5e5e5]/80">{row.item}</td>
                    <td className="px-4 py-4 text-sm font-serif text-[#e5e5e5]/50">{row.cat}</td>
                    <td className="px-4 py-4 text-sm font-serif text-[#e5e5e5]/50">{row.era}</td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-xs font-serif tracking-wider ${row.condColor}`}>{row.cond}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 14. Blockquote */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Words</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Blockquote</h2>
          <blockquote className="border-l-2 border-[#8b1a2a] pl-6 md:pl-8">
            <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-4 text-[#e5e5e5]/80">
              &ldquo;One must dress as if the world is a funeral for beauty itself -- in lace, in shadow, in devotion to the ornate.&rdquo;
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#8b1a2a]" />
              <Flower2 className="w-3 h-3 text-[#8b1a2a]" />
              <div className="w-8 h-px bg-[#8b1a2a]" />
            </div>
            <footer className="text-sm text-[#6b2d5b] font-serif tracking-wider">
              -- A Victorian Muse
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 15. Lace Dividers */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Ornament</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Lace Dividers</h2>
          <div className="space-y-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">Scalloped Arc</p>
              <div className="flex justify-center">
                <svg viewBox="0 0 400 20" className="w-full max-w-lg h-5 text-[#4a1a4a]/40" fill="none" stroke="currentColor" strokeWidth="1">
                  {[...Array(20)].map((_, i) => (
                    <path key={i} d={`M${i * 20} 15 Q${i * 20 + 10} 2 ${(i + 1) * 20} 15`} />
                  ))}
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">Rosary Chain</p>
              <div className="flex items-center justify-center gap-2">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className={`rounded-full ${i % 5 === 2 ? "w-2.5 h-2.5 bg-[#8b1a2a]/60" : "w-1.5 h-1.5 bg-[#4a1a4a]/50"}`} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b2d5b] mb-4 font-serif">Cross Pattern</p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#4a1a4a]/40" />
                <Cross className="w-4 h-4 text-[#8b1a2a]/50" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#4a1a4a]/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16. Rules Summary */}
      <section className="relative z-10 py-16 px-6 border-t border-[#4a1a4a]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#8b1a2a] mb-4 font-serif text-center">Guidelines</p>
          <h2 className="font-serif text-2xl md:text-4xl tracking-tight mb-8 md:mb-12 text-center">Core Rules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-[#4a1a4a]/30 bg-[#0a0a0a]/60">
              <h3 className="font-serif text-xl mb-6 text-[#e5e5e5]">Required</h3>
              <ul className="space-y-3 text-sm text-[#e5e5e5]/60 font-serif">
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#4a1a4a] shrink-0 mt-0.5" /><span>Lace borders and scalloped edges</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#4a1a4a] shrink-0 mt-0.5" /><span>Serif typography throughout</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#4a1a4a] shrink-0 mt-0.5" /><span>Rose and cross accent motifs</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#4a1a4a] shrink-0 mt-0.5" /><span>Dark palette with purple and red</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#4a1a4a] shrink-0 mt-0.5" /><span>Ornate details and shadow effects</span></li>
              </ul>
            </div>
            <div className="p-6 border border-[#8b1a2a]/30 bg-[#0a0a0a]/60">
              <h3 className="font-serif text-xl mb-6 text-[#8b1a2a]">Forbidden</h3>
              <ul className="space-y-3 text-sm text-[#e5e5e5]/60 font-serif">
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a2a] shrink-0 mt-0.5" /><span>Sans-serif or monospace fonts</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a2a] shrink-0 mt-0.5" /><span>Flat, unadorned color blocks</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a2a] shrink-0 mt-0.5" /><span>Sharp geometric corners</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a2a] shrink-0 mt-0.5" /><span>Bright, saturated primary colors</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a2a] shrink-0 mt-0.5" /><span>Minimal, stripped-down design</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 17. Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#4a1a4a]/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#4a1a4a]/40" />
            <Flower2 className="w-3 h-3 text-[#8b1a2a]/40" />
            <div className="w-8 h-px bg-[#4a1a4a]/40" />
          </div>
          <p className="text-[#e5e5e5]/40 text-sm font-serif">
            Gothic Lolita Showcase · Part of{" "}
            <Link href="/" className="text-[#e5e5e5]/60 hover:text-[#e5e5e5] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
