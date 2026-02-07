"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Feather,
  GraduationCap,
  Flame,
  ChevronDown,
  Check,
  X,

  Info,
  Library,
  Bookmark,
  PenTool,
  ArrowLeft,
} from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f0e1] relative overflow-hidden">
      {/* Parchment texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      {/* 1. Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#8b7355]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/dark-academia"
            className="flex items-center gap-2 text-[#3d2b1f]/60 hover:text-[#3d2b1f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-serif tracking-wide text-sm">Back to Docs</span>
          </Link>
          <span className="font-serif text-xl text-[#3d2b1f] tracking-[0.15em]">
            Dark Academia
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#8b7355]/30 text-[#3d2b1f]/70 font-serif text-sm hover:border-[#8b7355]/60 hover:text-[#3d2b1f] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6 text-center">
        <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-4">A Design Philosophy</p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#3d2b1f] mb-6 tracking-wide leading-tight">
          Dark <span className="italic">Academia</span>
        </h1>
        <p className="text-lg text-[#3d2b1f]/60 max-w-2xl mx-auto mb-10 font-serif italic leading-relaxed">
          Knowledge is the only flame that illuminates the darkness.
          A celebration of classical scholarship, weathered pages, and the pursuit of timeless wisdom.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#3d2b1f] border border-[#8b7355]/60 text-[#f5f0e1] font-serif tracking-widest text-sm uppercase hover:bg-[#5c4033] transition-all duration-300">
            Begin Reading
          </button>
          <button className="px-10 py-4 bg-transparent border border-[#3d2b1f]/30 text-[#3d2b1f] font-serif tracking-widest text-sm uppercase hover:border-[#3d2b1f]/60 transition-all duration-300">
            Explore the Archive
          </button>
        </div>
      </section>

      {/* Ornament Divider */}
      <div className="relative z-10 flex items-center justify-center gap-3 py-2">
        <hr className="w-24 border-0 h-px bg-[#8b7355]/40" />
        <span className="text-[#8b7355]/60 text-xs tracking-[0.5em]">* * *</span>
        <hr className="w-24 border-0 h-px bg-[#8b7355]/40" />
      </div>

      {/* 3. Color Palette */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Palette</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Scholar&apos;s Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Dark Brown", hex: "#3d2b1f", bg: "bg-[#3d2b1f]", text: "text-[#f5f0e1]" },
              { name: "Ink Green", hex: "#2d4a3e", bg: "bg-[#2d4a3e]", text: "text-[#f5f0e1]" },
              { name: "Dark Gold", hex: "#8b7355", bg: "bg-[#8b7355]", text: "text-[#f5f0e1]" },
              { name: "Cream White", hex: "#f5f0e1", bg: "bg-[#f5f0e1]", text: "text-[#3d2b1f]" },
              { name: "Burgundy", hex: "#722f37", bg: "bg-[#722f37]", text: "text-[#f5f0e1]" },
            ].map((color) => (
              <div key={color.name} className="border border-[#8b7355]/20 bg-white/40 overflow-hidden">
                <div className={`h-24 md:h-28 ${color.bg}`} />
                <div className="p-3 border-t border-[#8b7355]/20">
                  <p className="font-serif text-sm text-[#3d2b1f]">{color.name}</p>
                  <p className="text-xs text-[#8b7355] font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Typography */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Letterforms</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Typography</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4">Serif Headings</p>
              <h3 className="font-serif text-3xl md:text-4xl text-[#3d2b1f] tracking-wide mb-4 leading-tight">
                The Art of <span className="italic">Classical</span> Letters
              </h3>
              <p className="text-sm text-[#8b7355]">font-serif -- tracking-wide -- warm earth tones</p>
            </div>
            <div>
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4">Manuscript Body</p>
              <p className="text-base leading-relaxed text-[#3d2b1f]/70 mb-4 first-letter:font-serif first-letter:text-4xl first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-[#3d2b1f]">
                In the quiet sanctum of the reading room, words take on a weight beyond their letters.
                Each page turned reveals another layer of understanding, another connection to minds long departed
                yet eternally present through their prose.
              </p>
              <p className="text-sm text-[#8b7355]">font-serif body -- first-letter drop cap -- leading-relaxed</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Buttons */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Controls</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Buttons</h2>
          <div className="p-8 bg-white/40 border border-[#8b7355]/20">
            <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#3d2b1f] border border-[#8b7355]/60 text-[#f5f0e1] font-serif tracking-widest text-sm uppercase hover:bg-[#5c4033] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#2d4a3e] border border-[#2d4a3e]/60 text-[#f5f0e1] font-serif tracking-widest text-sm uppercase hover:bg-[#2d4a3e]/80 transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent border border-[#8b7355] text-[#3d2b1f] font-serif tracking-widest text-sm uppercase hover:bg-[#8b7355]/10 transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent text-[#8b7355] font-serif tracking-widest text-sm uppercase hover:text-[#3d2b1f] transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ornament Divider */}
      <div className="relative z-10 flex items-center justify-center py-2">
        <hr className="w-64 border-0 h-px bg-gradient-to-r from-transparent via-[#8b7355]/50 to-transparent" />
      </div>

      {/* 6. Cards */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Collection</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Library Collection</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/50 border border-[#8b7355]/20 hover:border-[#8b7355]/50 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-[#3d2b1f] flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-[#f5f0e1]" />
              </div>
              <h3 className="text-xl font-serif text-[#3d2b1f] mb-2 tracking-wide group-hover:text-[#722f37] transition-colors">
                The Library
              </h3>
              <p className="text-[#3d2b1f]/60 font-serif leading-relaxed text-sm">
                Towering shelves of leather-bound volumes, each spine a doorway to forgotten worlds and eternal truths.
              </p>
            </div>
            <div className="p-6 bg-[#3d2b1f] border border-[#8b7355]/40 hover:border-[#8b7355] hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-[#2d4a3e] flex items-center justify-center mb-4">
                <PenTool className="w-7 h-7 text-[#f5f0e1]" />
              </div>
              <h3 className="text-xl font-serif text-[#f5f0e1] mb-2 tracking-wide">
                The Study
              </h3>
              <p className="text-[#f5f0e1]/60 font-serif leading-relaxed text-sm">
                A desk of aged oak, ink-stained and warm beneath candlelight, where thoughts find their form in writing.
              </p>
            </div>
            <div className="p-6 bg-[#2d4a3e] border border-[#2d4a3e]/40 hover:border-[#8b7355] hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-[#3d2b1f] flex items-center justify-center mb-4">
                <GraduationCap className="w-7 h-7 text-[#f5f0e1]" />
              </div>
              <h3 className="text-xl font-serif text-[#f5f0e1] mb-2 tracking-wide">
                The Archive
              </h3>
              <p className="text-[#f5f0e1]/60 font-serif leading-relaxed text-sm">
                Ancient manuscripts and rare first editions preserved behind glass, guardians of accumulated knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Form */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-md mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Correspondence</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Scholar&apos;s Desk</h2>
          <div className="p-8 bg-white/40 border border-[#8b7355]/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#3d2b1f] flex items-center justify-center mb-3">
                <Feather className="w-8 h-8 text-[#f5f0e1]" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-[#3d2b1f]/70 tracking-[0.2em] uppercase mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-4 py-3 bg-[#f5f0e1]/60 border border-[#8b7355]/30 text-[#3d2b1f] placeholder-[#8b7355]/40 font-serif focus:border-[#8b7355] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#3d2b1f]/70 tracking-[0.2em] uppercase mb-2">Subject of Inquiry</label>
                <input
                  type="text"
                  placeholder="Topic of correspondence..."
                  className="w-full px-4 py-3 bg-[#f5f0e1]/60 border border-[#8b7355]/30 text-[#3d2b1f] placeholder-[#8b7355]/40 font-serif focus:border-[#8b7355] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#3d2b1f]/70 tracking-[0.2em] uppercase mb-2">Message</label>
                <textarea
                  placeholder="Compose your thoughts..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#f5f0e1]/60 border border-[#8b7355]/30 text-[#3d2b1f] placeholder-[#8b7355]/40 font-serif focus:border-[#8b7355] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#3d2b1f] border border-[#8b7355]/60 text-[#f5f0e1] font-serif tracking-widest text-sm uppercase hover:bg-[#5c4033] transition-all">
                Send Correspondence
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Tabs */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Disciplines</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Course of Study</h2>
          <div className="border border-[#8b7355]/20 bg-white/30">
            <div className="flex border-b border-[#8b7355]/20">
              {["Philosophy", "Literature", "History"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 px-6 py-4 font-serif text-sm tracking-widest uppercase transition-all ${
                    activeTab === i
                      ? "bg-[#3d2b1f] text-[#f5f0e1] border-b-2 border-[#8b7355]"
                      : "text-[#8b7355] hover:text-[#3d2b1f] hover:bg-[#8b7355]/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8 font-serif text-[#3d2b1f]/70 leading-relaxed">
              {activeTab === 0 && (
                <div>
                  <h4 className="font-serif text-lg text-[#3d2b1f] mb-3 tracking-wide">On the Examined Life</h4>
                  <p>From Socrates to Kierkegaard, the philosophical tradition compels us to question what we presume to know. The unexamined life, as the ancients warned, is not worth living -- for it is through rigorous inquiry that we approach the truth of our existence.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="font-serif text-lg text-[#3d2b1f] mb-3 tracking-wide">The Canon of Letters</h4>
                  <p>From Homer&apos;s epics to the modernist novels of Woolf and Joyce, literature has served as the mirror of human experience. Each era&apos;s great works capture something ineffable about the spirit of their time, preserving emotion in amber for future generations.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="font-serif text-lg text-[#3d2b1f] mb-3 tracking-wide">Lessons of Antiquity</h4>
                  <p>The rise and fall of empires, the quiet revolutions of thought, the slow accumulation of culture across centuries -- history teaches us that nothing is truly new, only rediscovered. To study the past is to possess the key to understanding the present.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ornament Divider */}
      <div className="relative z-10 flex items-center justify-center gap-4 py-2">
        <hr className="w-16 border-0 h-px bg-[#8b7355]/40" />
        <Bookmark className="w-4 h-4 text-[#8b7355]/40" />
        <hr className="w-16 border-0 h-px bg-[#8b7355]/40" />
      </div>

      {/* 9. Wax Seal Badges */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Insignia</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Wax Seals &amp; Badges</h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4">Wax Seals</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="w-16 h-16 rounded-full bg-[#722f37] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2)]">
                  <Library className="w-7 h-7 text-[#f5f0e1]/80" />
                </div>
                <div className="w-16 h-16 rounded-full bg-[#3d2b1f] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2)]">
                  <GraduationCap className="w-7 h-7 text-[#8b7355]" />
                </div>
                <div className="w-16 h-16 rounded-full bg-[#2d4a3e] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2)]">
                  <Flame className="w-7 h-7 text-[#f5f0e1]/80" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4">Book Labels</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-[#3d2b1f] text-[#f5f0e1] font-serif text-xs tracking-widest uppercase">First Edition</span>
                <span className="px-4 py-1.5 bg-[#722f37] text-[#f5f0e1] font-serif text-xs tracking-widest uppercase">Rare Volume</span>
                <span className="px-4 py-1.5 border border-[#8b7355] text-[#3d2b1f] font-serif text-xs tracking-widest uppercase">Manuscript</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-serif tracking-[0.2em] uppercase text-[#8b7355] mb-4">Quill Badges</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8b7355]/15 border border-[#8b7355]/30 text-[#3d2b1f] font-serif text-xs tracking-wide">
                  <Feather className="w-3 h-3 text-[#8b7355]" />Scholar
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2d4a3e]/15 border border-[#2d4a3e]/30 text-[#3d2b1f] font-serif text-xs tracking-wide">
                  <BookOpen className="w-3 h-3 text-[#2d4a3e]" />Reader
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#722f37]/15 border border-[#722f37]/30 text-[#3d2b1f] font-serif text-xs tracking-wide">
                  <PenTool className="w-3 h-3 text-[#722f37]" />Author
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Progress Bars */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Progress</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Reading Progress</h2>
          <div className="space-y-8">
            {[
              { label: "The Republic -- Plato", percent: 82, color: "bg-[#8b7355]" },
              { label: "Meditations -- Marcus Aurelius", percent: 45, color: "bg-[#3d2b1f]" },
              { label: "Thus Spoke Zarathustra -- Nietzsche", percent: 91, color: "bg-[#722f37]" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between font-serif text-sm text-[#3d2b1f]/70 mb-2">
                  <span className="italic">{bar.label}</span>
                  <span className="text-[#8b7355]">p. {bar.percent}%</span>
                </div>
                <div className="h-2 bg-[#8b7355]/15 border border-[#8b7355]/20 overflow-hidden">
                  <div className={`h-full ${bar.color} transition-all`} style={{ width: `${bar.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Alerts */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Notices</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Scholarly Notices</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-[#f5f0e1] border border-[#8b7355]/30">
              <Info className="w-5 h-5 text-[#8b7355] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#3d2b1f] mb-1">Parchment Note</p>
                <p className="font-serif text-sm text-[#3d2b1f]/60">The library reading room will observe extended hours during examination period.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#8b7355]/10 border border-[#8b7355]/40">
              <Flame className="w-5 h-5 text-[#8b7355] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#3d2b1f] mb-1">Candle Warning</p>
                <p className="font-serif text-sm text-[#3d2b1f]/60">Please ensure all candles are extinguished before departing the reading chamber.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#3d2b1f] border border-[#3d2b1f]">
              <X className="w-5 h-5 text-[#722f37] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#f5f0e1] mb-1">Ink-Blot Error</p>
                <p className="font-serif text-sm text-[#f5f0e1]/60">The requested manuscript has been damaged and is unavailable for consultation.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-[#2d4a3e]/10 border border-[#2d4a3e]/40">
              <Check className="w-5 h-5 text-[#2d4a3e] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm font-medium text-[#3d2b1f] mb-1">Laurel Success</p>
                <p className="font-serif text-sm text-[#3d2b1f]/60">Your thesis has been accepted into the archive. Congratulations, scholar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Dropdown */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-sm mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Navigation</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Chapter Index</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3 border border-[#8b7355]/30 bg-white/40 font-serif text-sm text-[#3d2b1f] hover:border-[#8b7355]/60 transition-all"
            >
              <span className="italic">Select a Chapter...</span>
              <ChevronDown className={`w-4 h-4 text-[#8b7355] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 border border-[#8b7355]/30 bg-[#f5f0e1] z-20 shadow-lg">
                {[
                  "I. The Nature of Knowledge",
                  "II. On Virtue and Reason",
                  "III. The Aesthetic Ideal",
                  "IV. Mortality and Memory",
                  "V. The Examined Life",
                ].map((chapter) => (
                  <button
                    key={chapter}
                    className="w-full px-5 py-3 text-left font-serif text-sm text-[#3d2b1f]/70 hover:text-[#3d2b1f] hover:bg-[#8b7355]/10 transition-all border-b border-[#8b7355]/10 last:border-b-0"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {chapter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 13. Table */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Records</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Academic Marks</h2>
          <div className="border-2 border-[#3d2b1f]/30 border-double overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#3d2b1f] text-[#f5f0e1]">
                  <th className="px-4 py-3 text-left font-serif text-xs tracking-widest uppercase font-normal">Subject</th>
                  <th className="px-4 py-3 text-left font-serif text-xs tracking-widest uppercase font-normal">Tutor</th>
                  <th className="px-4 py-3 text-center font-serif text-xs tracking-widest uppercase font-normal">Term</th>
                  <th className="px-4 py-3 text-right font-serif text-xs tracking-widest uppercase font-normal">Mark</th>
                </tr>
              </thead>
              <tbody className="font-serif text-sm">
                <tr className="border-b border-[#8b7355]/20 hover:bg-[#8b7355]/5 transition-colors">
                  <td className="px-4 py-3 text-[#3d2b1f] italic">Classical Philosophy</td>
                  <td className="px-4 py-3 text-[#3d2b1f]/60">Prof. Hargreaves</td>
                  <td className="px-4 py-3 text-center text-[#3d2b1f]/60">Michaelmas</td>
                  <td className="px-4 py-3 text-right text-[#2d4a3e] font-medium">Distinction</td>
                </tr>
                <tr className="border-b border-[#8b7355]/20 hover:bg-[#8b7355]/5 transition-colors">
                  <td className="px-4 py-3 text-[#3d2b1f] italic">Renaissance Literature</td>
                  <td className="px-4 py-3 text-[#3d2b1f]/60">Dr. Whitmore</td>
                  <td className="px-4 py-3 text-center text-[#3d2b1f]/60">Hilary</td>
                  <td className="px-4 py-3 text-right text-[#8b7355] font-medium">Merit</td>
                </tr>
                <tr className="hover:bg-[#8b7355]/5 transition-colors">
                  <td className="px-4 py-3 text-[#3d2b1f] italic">Ancient History</td>
                  <td className="px-4 py-3 text-[#3d2b1f]/60">Prof. Ashworth</td>
                  <td className="px-4 py-3 text-center text-[#3d2b1f]/60">Trinity</td>
                  <td className="px-4 py-3 text-right text-[#2d4a3e] font-medium">Distinction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 14. Blockquote */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <hr className="w-16 border-0 h-px bg-[#8b7355]/40" />
            <Feather className="w-5 h-5 text-[#8b7355]/50" />
            <hr className="w-16 border-0 h-px bg-[#8b7355]/40" />
          </div>
          <blockquote className="mb-6">
            <p className="font-serif text-2xl md:text-3xl italic text-[#3d2b1f] leading-relaxed tracking-wide">
              &ldquo;Cogito, ergo sum.&rdquo;
            </p>
            <p className="font-serif text-base text-[#3d2b1f]/50 mt-2 italic">
              I think, therefore I am.
            </p>
          </blockquote>
          <footer className="font-serif text-sm text-[#8b7355] tracking-widest uppercase">
            -- Rene Descartes, <span className="italic normal-case tracking-normal">Meditationes de Prima Philosophia</span>, 1641
          </footer>
          <div className="flex items-center justify-center gap-3 mt-8">
            <hr className="w-16 border-0 h-px bg-[#8b7355]/40" />
            <Feather className="w-5 h-5 text-[#8b7355]/50" />
            <hr className="w-16 border-0 h-px bg-[#8b7355]/40" />
          </div>
        </div>
      </section>

      {/* 15. Chapter Dividers */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Ornaments</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Chapter Dividers</h2>
          <div className="space-y-10">
            <div className="flex items-center justify-center gap-3">
              <hr className="flex-1 border-0 h-px bg-[#8b7355]/30" />
              <span className="font-serif text-[#8b7355]/50 text-lg tracking-[0.5em]">***</span>
              <hr className="flex-1 border-0 h-px bg-[#8b7355]/30" />
            </div>
            <div className="flex items-center justify-center">
              <hr className="flex-1 border-0 h-px bg-gradient-to-r from-transparent via-[#8b7355]/50 to-transparent" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#8b7355]/40" />
              <span className="w-1.5 h-1.5 bg-[#8b7355]/60" />
              <span className="w-2 h-2 bg-[#8b7355]" />
              <span className="w-1.5 h-1.5 bg-[#8b7355]/60" />
              <span className="w-1.5 h-1.5 bg-[#8b7355]/40" />
            </div>
            <div className="text-center font-serif text-[#8b7355]/40 text-2xl tracking-[1em]">
              - + -
            </div>
          </div>
        </div>
      </section>

      {/* 16. Rules Summary */}
      <section className="relative z-10 py-16 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-serif tracking-[0.3em] uppercase text-[#8b7355] mb-3 text-center">Design Canon</p>
          <h2 className="text-3xl font-serif text-[#3d2b1f] mb-10 text-center tracking-wide">Core Rules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-[#2d4a3e]/30 bg-[#2d4a3e]/5">
              <h3 className="font-serif text-lg text-[#2d4a3e] mb-4 tracking-wide">Required</h3>
              <ul className="font-serif text-sm text-[#3d2b1f]/70 space-y-3">
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#2d4a3e] shrink-0 mt-0.5" /><span>Serif typography for headings (font-serif)</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#2d4a3e] shrink-0 mt-0.5" /><span>Muted earth tones: browns, greens, ambers</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#2d4a3e] shrink-0 mt-0.5" /><span>Classical ornaments and dividers</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#2d4a3e] shrink-0 mt-0.5" /><span>Warm amber accent highlights</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#2d4a3e] shrink-0 mt-0.5" /><span>Leather and aged parchment texture feel</span></li>
              </ul>
            </div>
            <div className="p-6 border border-[#722f37]/30 bg-[#722f37]/5">
              <h3 className="font-serif text-lg text-[#722f37] mb-4 tracking-wide">Forbidden</h3>
              <ul className="font-serif text-sm text-[#3d2b1f]/70 space-y-3">
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#722f37] shrink-0 mt-0.5" /><span>Neon or saturated fluorescent colors</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#722f37] shrink-0 mt-0.5" /><span>Monospace or sans-serif for headings</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#722f37] shrink-0 mt-0.5" /><span>Rounded corners (border-radius)</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#722f37] shrink-0 mt-0.5" /><span>Bright whites or sterile backgrounds</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#722f37] shrink-0 mt-0.5" /><span>Modern minimalism (clean-tech aesthetic)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 17. Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#3d2b1f]/40 text-sm font-serif">
            Dark Academia Showcase -- Part of{" "}
            <Link href="/" className="text-[#3d2b1f]/60 hover:text-[#3d2b1f] transition-colors">
              StyleKit
            </Link>
          </p>
          <Link
            href="/styles/dark-academia"
            className="text-sm font-serif text-[#8b7355] hover:text-[#3d2b1f] transition-colors tracking-wide"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
