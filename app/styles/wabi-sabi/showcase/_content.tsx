"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Droplets, Wind, Leaf,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Feather, Moon, Sun
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Sumi (Ink)", hex: "#3a3a3a", bg: "bg-[#3a3a3a]" },
  { name: "Washi (Paper)", hex: "#f2ede4", bg: "bg-[#f2ede4]", border: true },
  { name: "Cha (Tea)", hex: "#b5a78c", bg: "bg-[#b5a78c]" },
  { name: "Matcha", hex: "#8a9a7b", bg: "bg-[#8a9a7b]" },
  { name: "Hai (Ash)", hex: "#a0998c", bg: "bg-[#a0998c]" },
  { name: "Shiro (White)", hex: "#faf8f4", bg: "bg-[#faf8f4]", border: true },
  { name: "Kuri (Chestnut)", hex: "#8b6f4e", bg: "bg-[#8b6f4e]" },
  { name: "Kumo (Cloud)", hex: "#d9d2c7", bg: "bg-[#d9d2c7]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(60);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Morning", icon: Sun },
    { label: "Evening", icon: Moon },
    { label: "Nature", icon: Feather },
  ];

  const accordionItems = [
    { title: "The Way of Wabi-Sabi", content: "Wabi-sabi is a Japanese aesthetic philosophy centered on the acceptance of transience and imperfection. Wabi refers to rustic simplicity and quietness. Sabi refers to the beauty that comes with age and wear." },
    { title: "Design Principles", content: "Embrace asymmetry, roughness, and irregularity. Use natural materials and muted earth tones. Allow generous emptiness (ma) to create breathing room. Every imperfection tells a story." },
    { title: "The Concept of Ma", content: "Ma is the Japanese concept of negative space - the pause between notes, the emptiness in a room. In design, ma creates rhythm, emphasizes content, and invites contemplation." },
  ];

  return (
    <div className="min-h-screen bg-[#f2ede4] text-[#3a3a3a]">
      {/* Subtle paper texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/wabi-sabi"
            className="flex items-center gap-2 text-[#a0998c] hover:text-[#3a3a3a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-wider">return</span>
          </Link>
          <span className="text-sm tracking-[0.5em] text-[#a0998c] uppercase">
            wabi-sabi
          </span>
          <Link
            href="/styles"
            className="text-sm text-[#a0998c] hover:text-[#3a3a3a] transition-colors tracking-wider"
          >
            all styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Ink brush stroke decoration */}
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#3a3a3a]/30 to-transparent mx-auto mb-12" />
          <p className="text-xs tracking-[0.6em] text-[#a0998c] uppercase mb-8">imperfect &middot; impermanent &middot; incomplete</p>
          <h1 className="text-5xl md:text-7xl font-light text-[#3a3a3a] mb-8 leading-tight" style={{ fontFeatureSettings: '"liga" 1, "kern" 1' }}>
            Beauty in
            <span className="block italic text-[#8a9a7b]">imperfection</span>
          </h1>
          <p className="text-lg font-light text-[#a0998c] max-w-md mx-auto leading-relaxed">
            Finding peace in the incomplete. Seeing grace in the worn. Embracing what is.
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#3a3a3a]/20 to-transparent mx-auto mt-12" />
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Observations</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "souls", value: "847" },
              { icon: TrendingUp, label: "growth", value: "+12%" },
              { icon: Eye, label: "views", value: "42K" },
              { icon: Heart, label: "saved", value: "1,203" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-4 h-4 text-[#b5a78c] mx-auto mb-3" />
                <p className="text-3xl font-light text-[#3a3a3a] mb-1">{stat.value}</p>
                <p className="text-xs tracking-[0.3em] text-[#a0998c] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#d9d2c7] to-transparent" />
      </div>

      {/* Color Palette */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Earth Tones</p>
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden bg-[#faf8f4]"
            labelClassName="text-sm font-light text-[#3a3a3a]"
            hexClassName="text-xs text-[#a0998c]/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Typography</p>
          <div className="space-y-8 text-center">
            <p className="text-5xl font-extralight text-[#3a3a3a] leading-tight">Heading</p>
            <p className="text-2xl font-light italic text-[#8a9a7b]">Subheading</p>
            <p className="text-base font-light text-[#a0998c] leading-[1.8] max-w-lg mx-auto">
              The body text breathes with generous spacing. Each word is given room to exist. Nothing competes for attention.
            </p>
            <p className="text-xs tracking-[0.4em] text-[#b5a78c] uppercase">
              a small annotation
            </p>
          </div>
        </div>
      </ShowcaseSection>

      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#d9d2c7] to-transparent" />
      </div>

      {/* Buttons */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Actions</p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <button className="px-8 py-3 bg-[#3a3a3a] text-[#f2ede4] text-sm tracking-widest hover:bg-[#8a9a7b] transition-colors duration-500">
              continue
            </button>
            <button className="px-8 py-3 border border-[#a0998c] text-[#a0998c] text-sm tracking-widest hover:border-[#3a3a3a] hover:text-[#3a3a3a] transition-colors duration-500">
              explore
            </button>
            <button className="px-8 py-3 text-[#b5a78c] text-sm tracking-widest hover:text-[#3a3a3a] transition-colors duration-500">
              observe
            </button>
            <button className="px-8 py-3 text-[#d9d2c7] text-sm tracking-widest cursor-not-allowed">
              rest
            </button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Reflections</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Droplets, title: "Water", desc: "Always moving, never the same. The stream teaches patience and acceptance of constant change." },
              { icon: Wind, title: "Air", desc: "Invisible yet powerful. The wind reminds us that the most important things cannot be grasped." },
              { icon: Leaf, title: "Earth", desc: "A fallen leaf is not less beautiful than one on the tree. Beauty exists in every stage of life." },
            ].map((card, index) => (
              <div key={index} className="text-center group">
                <card.icon className="w-5 h-5 text-[#b5a78c] mx-auto mb-5 group-hover:text-[#8a9a7b] transition-colors duration-500" />
                <h3 className="text-lg font-light text-[#3a3a3a] mb-3">{card.title}</h3>
                <p className="text-sm font-light text-[#a0998c] leading-[1.8]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#d9d2c7] to-transparent" />
      </div>

      {/* Tabs */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Moments</p>
          <div>
            <div className="flex justify-center gap-8 mb-8">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 text-sm tracking-wider transition-colors duration-500 pb-2 border-b ${
                    activeTab === index
                      ? "text-[#3a3a3a] border-[#3a3a3a]"
                      : "text-[#b5a78c] border-transparent hover:text-[#a0998c]"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="min-h-[120px] text-center">
              {activeTab === 0 && (
                <div>
                  <p className="text-lg font-light italic text-[#8a9a7b] mb-3">First light</p>
                  <p className="text-sm font-light text-[#a0998c] leading-[1.8] max-w-md mx-auto">
                    The morning dew on a weathered stone. Steam rising from a chipped ceramic cup. 
                    The imperfect beauty of a new beginning.
                  </p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <p className="text-lg font-light italic text-[#8b6f4e] mb-3">Fading light</p>
                  <p className="text-sm font-light text-[#a0998c] leading-[1.8] max-w-md mx-auto">
                    Shadows lengthen across a worn wooden floor. The patina of time tells stories 
                    that perfection never could.
                  </p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <p className="text-lg font-light italic text-[#8a9a7b] mb-3">Wild things</p>
                  <p className="text-sm font-light text-[#a0998c] leading-[1.8] max-w-md mx-auto">
                    A moss-covered stone beside a stream. Nature makes no mistakes; 
                    it simply is what it is.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Understanding</p>
          <div className="space-y-0">
            {accordionItems.map((item, index) => (
              <div key={index} className="border-b border-[#d9d2c7] last:border-b-0">
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full py-5 flex items-center justify-between text-left group"
                >
                  <span className="font-light text-[#3a3a3a]">{item.title}</span>
                  <ChevronDown className={`w-4 h-4 text-[#b5a78c] transition-transform duration-500 ${openAccordion === index ? "rotate-180" : ""}`} />
                </button>
                {openAccordion === index && (
                  <div className="pb-6">
                    <p className="text-sm font-light text-[#a0998c] leading-[1.8]">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#d9d2c7] to-transparent" />
      </div>

      {/* Alerts */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Notices</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3 py-3 border-l-2 border-[#8a9a7b] pl-4">
              <Check className="w-4 h-4 text-[#8a9a7b] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-[#3a3a3a]">Complete</p>
                <p className="text-xs text-[#a0998c] mt-0.5 font-light">Your changes have been saved.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-3 border-l-2 border-[#b5a78c] pl-4">
              <AlertTriangle className="w-4 h-4 text-[#b5a78c] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-[#3a3a3a]">Gentle reminder</p>
                <p className="text-xs text-[#a0998c] mt-0.5 font-light">Take a moment before continuing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-3 border-l-2 border-[#a07060] pl-4">
              <X className="w-4 h-4 text-[#a07060] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-[#3a3a3a]">Something faded</p>
                <p className="text-xs text-[#a0998c] mt-0.5 font-light">This could not be completed. Try again?</p>
              </div>
            </div>
            <div className="flex items-start gap-3 py-3 border-l-2 border-[#8b8fa0] pl-4">
              <Info className="w-4 h-4 text-[#8b8fa0] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-[#3a3a3a]">A thought</p>
                <p className="text-xs text-[#a0998c] mt-0.5 font-light">Nothing lasts, nothing is finished, nothing is perfect.</p>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Preferences</p>
          <div className="space-y-6">
            {[
              { label: "Quiet mode", desc: "Reduce visual noise" },
              { label: "Seasonal palette", desc: "Adjust colors to season" },
              { label: "Mindful spacing", desc: "Increase whitespace" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b border-[#d9d2c7] last:border-b-0">
                <div>
                  <p className="text-sm text-[#3a3a3a]">{item.label}</p>
                  <p className="text-xs text-[#b5a78c] mt-0.5 font-light">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-500 ${
                    toggleStates[index] ? "bg-[#8a9a7b]" : "bg-[#d9d2c7]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-[#f2ede4] rounded-full shadow-sm transition-transform duration-500 ${
                      toggleStates[index] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#d9d2c7] to-transparent" />
      </div>

      {/* Progress */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Journey</p>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-[#3a3a3a] font-light">path walked</p>
                <p className="text-xs text-[#a0998c] font-mono">{progress}%</p>
              </div>
              <div className="h-1 bg-[#d9d2c7]/60 rounded-full">
                <div
                  className="h-full bg-[#8a9a7b] rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-[#3a3a3a] font-light mb-3">seasons</p>
              <div className="grid grid-cols-4 gap-3">
                {["spring", "summer", "autumn", "winter"].map((season, index) => {
                  const values = [100, 100, progress, 0];
                  const seasonColors = ["bg-[#8a9a7b]", "bg-[#8b6f4e]", "bg-[#b5a78c]", "bg-[#a0998c]"];
                  return (
                    <div key={index}>
                      <div className="h-1 bg-[#d9d2c7]/40 rounded-full">
                        <div
                          className={`h-full ${seasonColors[index]} rounded-full`}
                          style={{ width: `${values[index]}%` }}
                        />
                      </div>
                      <p className="text-xs text-[#b5a78c] mt-2 text-center tracking-wider">{season}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-6 py-2 text-sm text-[#a0998c] border border-[#d9d2c7] tracking-wider hover:border-[#a0998c] hover:text-[#3a3a3a] transition-colors duration-500"
              >
                step back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-6 py-2 text-sm text-[#f2ede4] bg-[#3a3a3a] tracking-wider hover:bg-[#8a9a7b] transition-colors duration-500"
              >
                step forward
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title=""
        subtitle=""
        className="relative z-10 py-16 px-6"
        titleClassName="hidden"
        subtitleClassName="hidden"
      >
        <div className="max-w-sm mx-auto">
          <p className="text-xs tracking-[0.4em] text-[#a0998c] uppercase mb-8 text-center">Correspondence</p>
          <div className="space-y-6">
            <div>
              <label className="block text-xs tracking-[0.3em] text-[#a0998c] mb-3">name</label>
              <input
                type="text"
                placeholder="your name"
                className="w-full py-3 bg-transparent border-b border-[#d9d2c7] text-[#3a3a3a] placeholder-[#d9d2c7] focus:outline-none focus:border-[#8a9a7b] transition-colors duration-500 font-light text-sm"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.3em] text-[#a0998c] mb-3">thought</label>
              <textarea
                placeholder="share a thought..."
                rows={3}
                className="w-full py-3 bg-transparent border-b border-[#d9d2c7] text-[#3a3a3a] placeholder-[#d9d2c7] focus:outline-none focus:border-[#8a9a7b] transition-colors duration-500 font-light text-sm resize-none"
              />
            </div>
            <button className="w-full py-3 bg-[#3a3a3a] text-[#f2ede4] text-sm tracking-[0.2em] hover:bg-[#8a9a7b] transition-colors duration-500">
              send
            </button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#d9d2c7] to-transparent mx-auto mb-6" />
          <p className="text-xs text-[#b5a78c] tracking-[0.3em]">
            wabi-sabi showcase &middot;{" "}
            <Link href="/" className="hover:text-[#8a9a7b] transition-colors duration-500">
              stylekit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
