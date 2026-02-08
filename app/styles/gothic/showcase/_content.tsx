"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Cross,
  Shield,
  Flame,
  BookOpen,
  ChevronDown,
  Check,
  X,
  Info,
  Crown,
  Skull,
} from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabContent = [
    {
      title: "The Nave",
      body: "The central hall stretches upward, ribbed vaults converging at dizzying heights. Light filters through rose windows, casting crimson and gold onto cold stone floors. Every pillar bears the weight of centuries.",
    },
    {
      title: "The Crypt",
      body: "Beneath the cathedral lies the crypt -- vaulted chambers of silence where stone effigies rest upon their tombs. The air is thick with the scent of damp earth and ancient incense. Candlelight barely reaches the far walls.",
    },
    {
      title: "The Tower",
      body: "A spiral staircase of worn stone ascends into darkness. At the summit, gargoyles keep their eternal vigil over the city below. The bells hang in stillness, waiting for the appointed hour to shake the heavens.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#2d1b4e]/20 to-[#0a0a0a] text-[#c9a227]/80 relative overflow-hidden">
      {/* Subtle radial gold glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* 鈹€鈹€ 1. Navigation 鈹€鈹€ */}
      <nav className="relative z-10 border-b-2 border-[#c9a227]/20 bg-[#0a0a0a]/95">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/styles/gothic"
            className="flex items-center gap-2 text-[#c9a227]/60 hover:text-[#c9a227] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif text-sm uppercase tracking-[0.2em]">Back</span>
          </Link>
          <span className="font-serif text-xl text-[#c9a227] uppercase tracking-[0.3em]">
            Gothic
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#c9a227]/30 text-[#c9a227]/60 font-serif text-sm uppercase tracking-[0.2em] hover:border-[#c9a227]/60 hover:text-[#c9a227] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* 鈹€鈹€ 2. Hero 鈹€鈹€ */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-6">
          In Tenebris Lux
        </p>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#c9a227] tracking-[0.15em] mb-6">
          GOTHIC
        </h1>
        <p className="font-serif text-lg md:text-xl text-[#c9a227]/40 max-w-2xl mx-auto mb-12 leading-relaxed">
          The solemn beauty of cathedrals, illuminated manuscripts, and medieval stone.
          Where darkness meets devotion, and every shadow conceals a story.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#8b1a1a] border-2 border-[#8b1a1a] text-[#c9a227] font-serif uppercase tracking-[0.25em] shadow-[0_4px_20px_rgba(139,26,26,0.5)] hover:shadow-[0_6px_30px_rgba(139,26,26,0.7)] hover:bg-[#a02020] transition-all duration-300">
            Enter the Cathedral
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-[#c9a227]/40 text-[#c9a227]/70 font-serif uppercase tracking-[0.25em] hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-300">
            Read the Codex
          </button>
        </div>
      </section>

      {/* 鈹€鈹€ Tracery Divider 鈹€鈹€ */}
      <div className="flex items-center justify-center gap-3 py-4">
        <span className="block w-16 h-px bg-[#c9a227]/30" />
        <Cross className="w-4 h-4 text-[#c9a227]/40" />
        <span className="block w-16 h-px bg-[#c9a227]/30" />
      </div>

      {/* 鈹€鈹€ 3. Color Palette 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Tenebrae et Aurum</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Deep Purple", hex: "#2d1b4e", bg: "bg-[#2d1b4e]" },
              { name: "Blood Red", hex: "#8b1a1a", bg: "bg-[#8b1a1a]" },
              { name: "Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
              { name: "Gold", hex: "#c9a227", bg: "bg-[#c9a227]" },
              { name: "Dark Violet", hex: "#4a2d6e", bg: "bg-[#4a2d6e]" },
            ].map((color) => (
              <div key={color.name} className="border-2 border-[#c9a227]/20 bg-[#0a0a0a]/80">
                <div className={`h-24 md:h-32 ${color.bg}`} />
                <div className="p-3 border-t-2 border-[#c9a227]/20">
                  <p className="font-serif text-sm text-[#c9a227]">{color.name}</p>
                  <p className="text-xs text-[#c9a227]/40 font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ Tracery Divider 鈹€鈹€ */}
      <div className="flex items-center justify-center gap-2 py-4">
        <span className="block w-8 h-px bg-[#c9a227]/20" />
        <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/30" />
        <span className="block w-24 h-px bg-[#c9a227]/30" />
        <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/30" />
        <span className="block w-8 h-px bg-[#c9a227]/20" />
      </div>

      {/* 鈹€鈹€ 4. Typography 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Scriptorium</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Typography</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-6 border-2 border-[#c9a227]/20 bg-[#0a0a0a]/80">
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">Display / Heading</p>
              <h3 className="font-serif text-4xl md:text-5xl text-[#c9a227] tracking-wider mb-4 leading-tight">
                Memento Mori
              </h3>
              <p className="font-serif text-sm text-[#c9a227]/50">font-serif -- tracking-wider -- heavy weight -- dramatic scale</p>
            </div>
            <div className="p-6 border-2 border-[#c9a227]/20 bg-[#0a0a0a]/80">
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">Body / Illuminated Initial</p>
              <p className="font-serif text-base text-[#c9a227]/60 leading-relaxed first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#8b1a1a]">
                In the dim corridors of the abbey, monks laboured over vellum pages by candlelight. Each letter was a prayer, each flourish an act of devotion. The scriptorium held the knowledge of ages within its cold stone walls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 5. Buttons 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Cathedral Controls</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Buttons</h2>
          <div className="p-8 bg-[#0a0a0a]/90 border-2 border-[#c9a227]/20">
            <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#8b1a1a] border-2 border-[#8b1a1a] text-[#c9a227] font-serif uppercase tracking-[0.2em] shadow-[0_4px_16px_rgba(139,26,26,0.5)] hover:shadow-[0_6px_24px_rgba(139,26,26,0.7)] transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#1a1a1a] border-2 border-[#c9a227]/30 text-[#c9a227]/70 font-serif uppercase tracking-[0.2em] hover:bg-[#2a2a2a] hover:border-[#c9a227]/50 transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#c9a227]/50 text-[#c9a227] font-serif uppercase tracking-[0.2em] hover:border-[#c9a227] hover:shadow-[0_0_16px_rgba(201,162,39,0.2)] transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-transparent text-[#c9a227]/50 font-serif uppercase tracking-[0.2em] hover:text-[#c9a227] transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 6. Cards 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Sanctum Panels</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0a0a0a]/90 border-2 border-[#c9a227]/30 hover:border-[#c9a227]/60 transition-all group">
              <div className="w-16 h-16 bg-[#2d1b4e] border-2 border-[#c9a227]/40 flex items-center justify-center mb-4">
                <Cross className="w-8 h-8 text-[#c9a227]" />
              </div>
              <h3 className="font-serif text-xl text-[#c9a227] mb-2 tracking-wider">Cathedral</h3>
              <p className="font-serif text-sm text-[#c9a227]/50 leading-relaxed">Soaring arches converge in ribbed vaults, channelling the gaze toward heaven.</p>
            </div>
            <div className="p-6 bg-[#0a0a0a]/90 border-2 border-[#8b1a1a]/30 hover:border-[#8b1a1a]/60 transition-all group">
              <div className="w-16 h-16 bg-[#8b1a1a]/20 border-2 border-[#8b1a1a]/40 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-[#8b1a1a]" />
              </div>
              <h3 className="font-serif text-xl text-[#8b1a1a] mb-2 tracking-wider">Crusade</h3>
              <p className="font-serif text-sm text-[#8b1a1a]/50 leading-relaxed">The shield bears the mark of the order -- sworn to protect the sacred relics.</p>
            </div>
            <div className="p-6 bg-[#0a0a0a]/90 border-2 border-[#4a2d6e]/40 hover:border-[#4a2d6e]/70 transition-all group">
              <div className="w-16 h-16 bg-[#4a2d6e]/30 border-2 border-[#4a2d6e]/50 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-[#c9a227]" />
              </div>
              <h3 className="font-serif text-xl text-[#c9a227] mb-2 tracking-wider">Manuscript</h3>
              <p className="font-serif text-sm text-[#c9a227]/50 leading-relaxed">Illuminated pages preserve the wisdom of ages in gold leaf and iron gall ink.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 7. Form 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-md mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Inscribed Scrolls</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Form</h2>
          <div className="p-8 bg-[#0a0a0a]/90 border-2 border-[#c9a227]/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#2d1b4e] border-2 border-[#c9a227]/40 flex items-center justify-center mb-4">
                <Flame className="w-8 h-8 text-[#c9a227]" />
              </div>
              <h3 className="font-serif text-xl text-[#c9a227] tracking-wider">Sanctum Registry</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/50 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Inscribe thy name..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border-2 border-[#c9a227]/30 text-[#c9a227] placeholder-[#c9a227]/25 font-serif focus:border-[#c9a227] focus:shadow-[0_0_16px_rgba(201,162,39,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/50 mb-2">Sigil</label>
                <input
                  type="text"
                  placeholder="Thy mark upon the stone..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border-2 border-[#8b1a1a]/30 text-[#8b1a1a] placeholder-[#8b1a1a]/25 font-serif focus:border-[#8b1a1a] focus:shadow-[0_0_16px_rgba(139,26,26,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/50 mb-2">Epistle</label>
                <textarea
                  placeholder="Speak thy purpose..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0a0a0a]/80 border-2 border-[#c9a227]/30 text-[#c9a227] placeholder-[#c9a227]/25 font-serif focus:border-[#c9a227] focus:shadow-[0_0_16px_rgba(201,162,39,0.2)] focus:outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#2d1b4e] border-2 border-[#c9a227]/60 text-[#c9a227] font-serif uppercase tracking-[0.25em] hover:shadow-[0_4px_20px_rgba(201,162,39,0.3)] transition-all">
                Submit Petition
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ Tracery Divider 鈹€鈹€ */}
      <div className="flex items-center justify-center gap-3 py-4">
        <span className="block w-16 h-px bg-[#c9a227]/30" />
        <Cross className="w-4 h-4 text-[#c9a227]/40" />
        <span className="block w-16 h-px bg-[#c9a227]/30" />
      </div>

      {/* 鈹€鈹€ 8. Tabs 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Chamber Navigation</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Tabs</h2>
          <div className="border-2 border-[#c9a227]/20 bg-[#0a0a0a]/90">
            <div className="flex border-b-2 border-[#c9a227]/20">
              {["Nave", "Crypt", "Tower"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 py-4 font-serif text-sm uppercase tracking-[0.25em] transition-all ${
                    activeTab === i
                      ? "text-[#c9a227] border-b-4 border-[#8b1a1a] -mb-[2px] bg-[#8b1a1a]/10"
                      : "text-[#c9a227]/40 hover:text-[#c9a227]/70 hover:bg-[#c9a227]/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6">
              <h4 className="font-serif text-lg text-[#c9a227] mb-2 tracking-wider">{tabContent[activeTab].title}</h4>
              <p className="font-serif text-sm text-[#c9a227]/50 leading-relaxed">{tabContent[activeTab].body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 9. Heraldic Badges 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Marks of Rank</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Badges</h2>
          <div className="space-y-8">
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">Shield Crests</p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#2d1b4e] border-2 border-[#c9a227]/50 font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]">
                  <Shield className="w-3.5 h-3.5" /> Knight
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b1a1a] border-2 border-[#8b1a1a] font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]">
                  <Crown className="w-3.5 h-3.5" /> Sovereign
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#4a2d6e] border-2 border-[#4a2d6e] font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]">
                  <BookOpen className="w-3.5 h-3.5" /> Scholar
                </span>
              </div>
            </div>
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">Wax Seals</p>
              <div className="flex flex-wrap gap-4">
                <span className="w-10 h-10 rounded-full bg-[#8b1a1a] border-2 border-[#c9a227]/40 flex items-center justify-center font-serif text-xs text-[#c9a227] shadow-[0_2px_8px_rgba(139,26,26,0.5)]">I</span>
                <span className="w-10 h-10 rounded-full bg-[#2d1b4e] border-2 border-[#c9a227]/40 flex items-center justify-center font-serif text-xs text-[#c9a227] shadow-[0_2px_8px_rgba(45,27,78,0.5)]">II</span>
                <span className="w-10 h-10 rounded-full bg-[#4a2d6e] border-2 border-[#c9a227]/40 flex items-center justify-center font-serif text-xs text-[#c9a227] shadow-[0_2px_8px_rgba(74,45,110,0.5)]">III</span>
              </div>
            </div>
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">Banner Pennants</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 border-l-4 border-[#c9a227] bg-[#c9a227]/10 font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]">Consecrated</span>
                <span className="px-3 py-1 border-l-4 border-[#8b1a1a] bg-[#8b1a1a]/10 font-serif text-xs uppercase tracking-[0.2em] text-[#8b1a1a]">Forbidden</span>
                <span className="px-3 py-1 border-l-4 border-[#4a2d6e] bg-[#4a2d6e]/10 font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]/60">Arcane</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 10. Progress Bars 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Stone Channels</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Progress</h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between font-serif text-xs text-[#c9a227]/50 mb-2">
                <span className="uppercase tracking-[0.2em]">Sanctification</span>
                <span>72%</span>
              </div>
              <div className="h-3 bg-[#0a0a0a] border-2 border-[#c9a227]/30">
                <div className="h-full w-[72%] bg-[#8b1a1a] shadow-[0_0_8px_rgba(139,26,26,0.5)]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-serif text-xs text-[#c9a227]/50 mb-2">
                <span className="uppercase tracking-[0.2em]">Reliquary</span>
                <span>45%</span>
              </div>
              <div className="h-3 bg-[#0a0a0a] border-2 border-[#c9a227]/30">
                <div className="h-full w-[45%] bg-[#c9a227] shadow-[0_0_8px_rgba(201,162,39,0.5)]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-serif text-xs text-[#c9a227]/50 mb-2">
                <span className="uppercase tracking-[0.2em]">Restoration</span>
                <span>88%</span>
              </div>
              <div className="h-3 bg-[#0a0a0a] border-2 border-[#c9a227]/30">
                <div className="h-full w-[88%] bg-[#2d6e3a] shadow-[0_0_8px_rgba(45,110,58,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 11. Alerts 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Proclamations</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Alerts</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border-2 border-[#c9a227]/30 bg-[#c9a227]/5">
              <Info className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm text-[#c9a227] mb-1 tracking-wider">Parchment Notice</p>
                <p className="font-serif text-xs text-[#c9a227]/50">The archives hold records dating to the founding of the order.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-amber-600/40 bg-amber-900/10">
              <Flame className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm text-amber-500 mb-1 tracking-wider">Torch Warning</p>
                <p className="font-serif text-xs text-amber-500/50">The eastern passage grows unstable. Proceed with vigilance.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-[#8b1a1a]/50 bg-[#8b1a1a]/10">
              <Skull className="w-5 h-5 text-[#8b1a1a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm text-[#8b1a1a] mb-1 tracking-wider">Blood Seal Error</p>
                <p className="font-serif text-xs text-[#8b1a1a]/50">The binding has been broken. The ward must be renewed at once.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-emerald-700/40 bg-emerald-900/10">
              <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-serif text-sm text-emerald-500 mb-1 tracking-wider">Ivy Blessing</p>
                <p className="font-serif text-xs text-emerald-500/50">The consecration is complete. The sanctuary stands protected.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 12. Dropdown 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-xs mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Archway Selection</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Dropdown</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border-2 border-[#c9a227]/30 bg-[#0a0a0a]/90 font-serif text-sm text-[#c9a227]/70 hover:border-[#c9a227]/60 transition-all"
            >
              <span className="uppercase tracking-[0.15em]">Choose thy path</span>
              <ChevronDown className={`w-4 h-4 text-[#c9a227]/50 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-0 border-2 border-t-0 border-[#c9a227]/30 bg-[#0a0a0a] z-10">
                {["The Nave", "The Crypt", "The Bell Tower", "The Cloister", "The Ossuary"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-4 py-3 text-left font-serif text-sm text-[#c9a227]/50 hover:text-[#c9a227] hover:bg-[#c9a227]/5 transition-all border-b border-[#c9a227]/10 last:border-b-0"
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

      {/* 鈹€鈹€ Tracery Divider 鈹€鈹€ */}
      <div className="flex items-center justify-center gap-2 py-4">
        <span className="block w-8 h-px bg-[#c9a227]/20" />
        <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/30" />
        <span className="block w-24 h-px bg-[#c9a227]/30" />
        <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/30" />
        <span className="block w-8 h-px bg-[#c9a227]/20" />
      </div>

      {/* 鈹€鈹€ 13. Table 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Codex Registrum</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Table</h2>
          <div className="border-2 border-[#c9a227]/30 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#c9a227]/30 bg-[#2d1b4e]/30">
                  <th className="px-4 py-3 text-left font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227] font-normal">Relic</th>
                  <th className="px-4 py-3 text-left font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227] font-normal">Origin</th>
                  <th className="px-4 py-3 text-left font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227] font-normal">Era</th>
                  <th className="px-4 py-3 text-right font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227] font-normal">Condition</th>
                </tr>
              </thead>
              <tbody className="font-serif text-sm">
                <tr className="border-b border-[#c9a227]/15 hover:bg-[#c9a227]/5 transition-colors">
                  <td className="px-4 py-3 text-[#c9a227]/70">Crown of Thorns</td>
                  <td className="px-4 py-3 text-[#c9a227]/50">Jerusalem</td>
                  <td className="px-4 py-3 text-[#c9a227]/50">I Century</td>
                  <td className="px-4 py-3 text-right text-[#c9a227]">Sacred</td>
                </tr>
                <tr className="border-b border-[#c9a227]/15 hover:bg-[#c9a227]/5 transition-colors">
                  <td className="px-4 py-3 text-[#c9a227]/70">Bleeding Chalice</td>
                  <td className="px-4 py-3 text-[#c9a227]/50">Glastonbury</td>
                  <td className="px-4 py-3 text-[#c9a227]/50">XII Century</td>
                  <td className="px-4 py-3 text-right text-[#8b1a1a]">Cursed</td>
                </tr>
                <tr className="hover:bg-[#c9a227]/5 transition-colors">
                  <td className="px-4 py-3 text-[#c9a227]/70">Obsidian Codex</td>
                  <td className="px-4 py-3 text-[#c9a227]/50">Constantinople</td>
                  <td className="px-4 py-3 text-[#c9a227]/50">IX Century</td>
                  <td className="px-4 py-3 text-right text-[#4a2d6e]">Sealed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 14. Blockquote 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Inscription</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Blockquote</h2>
          <blockquote className="border-l-4 border-[#8b1a1a] pl-6 md:pl-8">
            <p className="font-serif text-xl md:text-2xl italic text-[#c9a227]/70 leading-relaxed mb-4">
              &ldquo;Sic transit gloria mundi -- Thus passes the glory of the world.&rdquo;
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-6 h-px bg-[#c9a227]/30" />
              <Cross className="w-3 h-3 text-[#c9a227]/30" />
              <span className="block w-6 h-px bg-[#c9a227]/30" />
            </div>
            <footer className="font-serif text-sm text-[#c9a227]/40 uppercase tracking-[0.2em]">
              -- Thomas a Kempis, De Imitatione Christi
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 鈹€鈹€ 15. Gothic Tracery Dividers showcase 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Ornamental Patterns</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Dividers</h2>
          <div className="space-y-10">
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">Simple Rule</p>
              <hr className="border-t-2 border-[#c9a227]/20" />
            </div>
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">Cross Ornament</p>
              <div className="flex items-center gap-3">
                <span className="flex-1 h-px bg-[#c9a227]/20" />
                <Cross className="w-4 h-4 text-[#c9a227]/40" />
                <span className="flex-1 h-px bg-[#c9a227]/20" />
              </div>
            </div>
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/40 mb-4">Diamond Tracery</p>
              <div className="flex items-center justify-center gap-2">
                <span className="block w-12 h-px bg-[#c9a227]/20" />
                <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/30" />
                <span className="block w-2 h-2 rotate-45 bg-[#c9a227]/30" />
                <span className="block w-2 h-2 rotate-45 border border-[#c9a227]/30" />
                <span className="block w-12 h-px bg-[#c9a227]/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 16. Rules Summary 鈹€鈹€ */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#c9a227]/40 mb-3 text-center">Edicts of the Order</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#c9a227] mb-10 text-center tracking-[0.15em]">Design Rules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-[#c9a227]/30 p-6 bg-[#0a0a0a]/90">
              <h3 className="font-serif text-xl text-[#c9a227] mb-4 tracking-wider">Required</h3>
              <ul className="space-y-3 font-serif text-sm text-[#c9a227]/60">
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" /><span>Pointed arches and angular forms</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" /><span>Stone texture, thick borders (border-2)</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" /><span>Jewel tones: crimson, gold, deep purple</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" /><span>Serif typography throughout</span></li>
                <li className="flex items-start gap-3"><Check className="w-4 h-4 text-[#c9a227] shrink-0 mt-0.5" /><span>Wide letter-spacing and uppercase labels</span></li>
              </ul>
            </div>
            <div className="border-2 border-[#8b1a1a]/30 p-6 bg-[#0a0a0a]/90">
              <h3 className="font-serif text-xl text-[#8b1a1a] mb-4 tracking-wider">Forbidden</h3>
              <ul className="space-y-3 font-serif text-sm text-[#8b1a1a]/60">
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a1a] shrink-0 mt-0.5" /><span>Bright, saturated or pastel colors</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a1a] shrink-0 mt-0.5" /><span>Rounded corners or pill shapes</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a1a] shrink-0 mt-0.5" /><span>Modern sans-serif or mono fonts</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a1a] shrink-0 mt-0.5" /><span>Thin hairline borders or minimal lines</span></li>
                <li className="flex items-start gap-3"><X className="w-4 h-4 text-[#8b1a1a] shrink-0 mt-0.5" /><span>Flat minimalism or excessive whitespace</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 鈹€鈹€ 17. Footer 鈹€鈹€ */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#c9a227]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif text-sm text-[#c9a227]/40 tracking-wider">
            StyleKit -- Gothic Showcase
          </p>
          <Link
            href="/styles/gothic"
            className="font-serif text-sm text-[#c9a227]/60 hover:text-[#c9a227] transition-colors uppercase tracking-[0.2em]"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}

