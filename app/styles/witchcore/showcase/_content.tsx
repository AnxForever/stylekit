"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Moon, Star,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Flame, BookOpen, Shield,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Mystic Purple", hex: "#4a1942", bg: "bg-[#4a1942]" },
  { name: "Midnight", hex: "#0d0b14", bg: "bg-[#0d0b14]" },
  { name: "Gold Rune", hex: "#c9a74e", bg: "bg-[#c9a74e]" },
  { name: "Amethyst", hex: "#7b68ae", bg: "bg-[#7b68ae]" },
  { name: "Herb Green", hex: "#3d8b6e", bg: "bg-[#3d8b6e]" },
  { name: "Deep Violet", hex: "#2a1030", bg: "bg-[#2a1030]" },
  { name: "Stardust", hex: "#d4b86a", bg: "bg-[#d4b86a]" },
  { name: "Shadow Ink", hex: "#16121f", bg: "bg-[#16121f]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Tarot", icon: Moon },
    { label: "Grimoire", icon: BookOpen },
    { label: "Wards", icon: Shield },
  ];

  const accordionItems = [
    { title: "What is Witchcore Design?", content: "Witchcore draws from occult aesthetics, tarot iconography, and alchemical manuscripts. Deep purple tones and shimmering gold runes create an atmosphere of ritual and mystical power on every interface element." },
    { title: "Core Visual Language", content: "Midnight backgrounds adorned with stardust particles, gold serif typography that glows like ancient runes, and amethyst accents that bridge the natural and supernatural worlds." },
    { title: "The Ritual of Interaction", content: "Every interaction carries ceremony. Buttons activate like runes, cards turn like tarot spreads, and inputs inscribe prophecies. The design language merges medieval alchemy with modern dark interfaces." },
  ];

  return (
    <div className="min-h-screen bg-[#0d0b14] text-[#c9a74e]/80 font-serif">
      {/* Stardust background overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 20%, rgba(201,167,78,0.3), transparent), radial-gradient(1px 1px at 30% 60%, rgba(123,104,174,0.2), transparent), radial-gradient(1px 1px at 70% 40%, rgba(201,167,78,0.2), transparent), radial-gradient(1px 1px at 90% 80%, rgba(61,139,110,0.2), transparent)",
        }}
      />

      {/* Navigation */}
      <nav className="relative px-6 py-5 border-b border-[#c9a74e]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/witchcore"
            className="flex items-center gap-2 text-[#7b68ae] hover:text-[#c9a74e] transition-colors duration-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-wider">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-[#c9a74e]" style={{ filter: "drop-shadow(0 0 4px rgba(201,167,78,0.5))" }} />
            <span className="font-serif text-lg tracking-widest text-[#c9a74e]" style={{ textShadow: "0 0 10px rgba(201,167,78,0.3)" }}>
              Witchcore
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm text-[#c9a74e] border border-[#c9a74e]/30 hover:border-[#c9a74e]/60 hover:shadow-[0_0_15px_rgba(201,167,78,0.2)] transition-all duration-500 tracking-wider uppercase font-serif"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#c9a74e]/40" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#7b68ae]">Occult Mysticism</span>
            <div className="w-8 h-px bg-[#c9a74e]/40" />
          </div>
          <h1
            className="text-5xl md:text-7xl font-serif text-[#c9a74e] mb-8 leading-tight tracking-wider"
            style={{ textShadow: "0 0 20px rgba(201,167,78,0.4)" }}
          >
            The veil
            <span className="block italic text-[#7b68ae]" style={{ textShadow: "0 0 15px rgba(123,104,174,0.4)" }}>grows thin</span>
          </h1>
          <p className="text-lg font-serif text-[#7b68ae]/70 max-w-xl mx-auto leading-relaxed">
            Ancient runes whisper in gold. Stardust settles on midnight surfaces. Every element is a ritual.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Arcane metrics"
        className="relative py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
        style={{ textShadow: "0 0 8px rgba(201,167,78,0.2)" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Devotees", value: "1,666" },
            { icon: TrendingUp, label: "Ascension", value: "+33%" },
            { icon: Eye, label: "Visions", value: "93K" },
            { icon: Heart, label: "Offerings", value: "2,048" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#0d0b14]/90 border border-[#c9a74e]/20 hover:border-[#c9a74e]/40 hover:shadow-[0_0_20px_rgba(201,167,78,0.1)] transition-all duration-500"
            >
              <stat.icon className="w-5 h-5 text-[#c9a74e] mb-4" style={{ filter: "drop-shadow(0 0 4px rgba(201,167,78,0.4))" }} />
              <p className="text-3xl font-serif text-[#c9a74e] mb-1" style={{ textShadow: "0 0 8px rgba(201,167,78,0.3)" }}>{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b68ae]/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Hues drawn from the astral plane"
        className="relative py-16 px-6 bg-[#4a1942]/10"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border border-[#c9a74e]/20 bg-[#0d0b14]/80"
            labelClassName="text-sm font-serif text-[#c9a74e]"
            hexClassName="text-xs text-[#7b68ae]/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Inscriptions of power"
        className="relative py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#0d0b14]/90 border border-[#c9a74e]/20">
            <p className="text-6xl font-serif text-[#c9a74e] mb-4 leading-tight tracking-wider" style={{ textShadow: "0 0 12px rgba(201,167,78,0.3)" }}>Heading</p>
            <p className="text-4xl font-serif text-[#c9a74e]/80 mb-4 tracking-wider">Subheading</p>
            <p className="text-xl font-serif text-[#7b68ae]/70 mb-4 leading-relaxed">
              Body text woven from twilight threads. Each word resonates with arcane intent.
            </p>
            <p className="text-sm text-[#c9a74e]/40 tracking-[0.2em] uppercase font-serif">
              Caption text etched in fading rune light
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Rune activations"
        className="relative py-16 px-6 bg-[#4a1942]/10"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0d0b14]/90 border border-[#c9a74e]/20">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-3 bg-[#4a1942] border border-[#c9a74e]/50 text-[#c9a74e] font-serif uppercase tracking-widest shadow-[0_0_15px_rgba(201,167,78,0.2)] hover:shadow-[0_0_25px_rgba(201,167,78,0.4)] hover:border-[#c9a74e] transition-all duration-500">
                Invoke
              </button>
              <button className="px-8 py-3 bg-[#c9a74e] text-[#0d0b14] font-serif font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(201,167,78,0.4)] hover:shadow-[0_0_30px_rgba(201,167,78,0.6)] transition-all duration-500">
                Activate
              </button>
              <button className="px-8 py-3 bg-transparent border border-[#7b68ae]/50 text-[#7b68ae] font-serif uppercase tracking-widest shadow-[0_0_15px_rgba(123,104,174,0.2)] hover:shadow-[0_0_25px_rgba(123,104,174,0.4)] hover:border-[#7b68ae] transition-all duration-500">
                Divine
              </button>
              <button className="px-8 py-3 bg-transparent border border-[#3d8b6e]/50 text-[#3d8b6e] font-serif uppercase tracking-widest shadow-[0_0_15px_rgba(61,139,110,0.2)] hover:shadow-[0_0_25px_rgba(61,139,110,0.4)] hover:border-[#3d8b6e] transition-all duration-500">
                Enchant
              </button>
              <button className="px-8 py-3 bg-[#0d0b14] border border-[#c9a74e]/15 text-[#c9a74e]/30 font-serif uppercase tracking-widest cursor-not-allowed">
                Sealed
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Tarot arcana"
        className="relative py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Moon, title: "The Moon", desc: "Illusion, intuition, and the subconscious mind. Truths hidden beneath silver light that only the worthy may perceive." },
            { icon: Star, title: "The Star", desc: "Hope renewed under cosmic radiance. A guiding light through the darkest passages of the arcane journey." },
            { icon: Flame, title: "The Tower", desc: "Sudden revelation, necessary destruction. Old structures crumble to make way for deeper understanding." },
          ].map((card, index) => (
            <div
              key={index}
              className="p-6 bg-[#0d0b14]/90 border border-[#c9a74e]/20 hover:border-[#c9a74e]/40 hover:shadow-[0_0_25px_rgba(201,167,78,0.15)] transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,167,78,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(123,104,174,0.05)_0%,transparent_50%)] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 bg-[#c9a74e] shadow-[0_0_8px_rgba(201,167,78,0.6)]" />
                  <span className="text-[#c9a74e]/60 font-serif text-xs uppercase tracking-[0.2em]">Arcana {index + 1}</span>
                </div>
                <card.icon className="w-6 h-6 text-[#c9a74e] mb-4 group-hover:text-[#d4b86a] transition-colors duration-500" style={{ filter: "drop-shadow(0 0 6px rgba(201,167,78,0.4))" }} />
                <h3 className="text-lg font-serif text-[#c9a74e] tracking-wider mb-3" style={{ textShadow: "0 0 10px rgba(201,167,78,0.3)" }}>{card.title}</h3>
                <p className="text-sm text-[#7b68ae]/60 font-serif leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Grimoire chapters"
        className="relative py-16 px-6 bg-[#4a1942]/10"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0d0b14]/90 border border-[#c9a74e]/20 overflow-hidden">
            <div className="flex border-b border-[#c9a74e]/20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-serif uppercase tracking-wider transition-all duration-500 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#c9a74e] border-[#c9a74e] shadow-[0_2px_10px_rgba(201,167,78,0.3)]"
                      : "text-[#7b68ae]/50 border-transparent hover:text-[#c9a74e]/70"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-serif text-[#c9a74e] tracking-wider mb-2" style={{ textShadow: "0 0 8px rgba(201,167,78,0.2)" }}>Lunar Divination</h4>
                  <p className="text-sm text-[#7b68ae]/60 font-serif leading-relaxed">The cards reveal what the conscious mind cannot see. Under the waning crescent, spreads unfold their cryptic wisdom across the velvet table.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-serif text-[#c9a74e] tracking-wider mb-2" style={{ textShadow: "0 0 8px rgba(201,167,78,0.2)" }}>Spellcraft Compendium</h4>
                  <p className="text-sm text-[#7b68ae]/60 font-serif leading-relaxed">Pages yellowed by centuries hold the formulas of transformation. Each recipe demands precision, reverence, and the right alignment of celestial bodies.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-serif text-[#c9a74e] tracking-wider mb-2" style={{ textShadow: "0 0 8px rgba(201,167,78,0.2)" }}>Protective Sigils</h4>
                  <p className="text-sm text-[#7b68ae]/60 font-serif leading-relaxed">Drawn in consecrated ink, these wards hold the threshold between realms. Their geometry is both shield and mirror, reflecting malice back upon its source.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Unfolding secrets"
        className="relative py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#0d0b14]/90 border border-[#c9a74e]/20 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#4a1942]/20 transition-all duration-500"
              >
                <span className="font-serif text-[#c9a74e] tracking-wider">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#7b68ae]/60 transition-transform duration-500 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#c9a74e]/10">
                  <p className="text-sm text-[#7b68ae]/60 font-serif leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Omens and portents"
        className="relative py-16 px-6 bg-[#4a1942]/10"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#3d8b6e]/10 border-l-2 border-[#3d8b6e]">
            <Check className="w-4 h-4 text-[#3d8b6e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#3d8b6e]">Ritual complete</p>
              <p className="text-xs text-[#3d8b6e]/60 mt-0.5 font-serif">The incantation has been sealed successfully.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#c9a74e]/10 border-l-2 border-[#c9a74e]">
            <AlertTriangle className="w-4 h-4 text-[#c9a74e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#c9a74e]">Mercury retrograde</p>
              <p className="text-xs text-[#c9a74e]/60 mt-0.5 font-serif">Divination results may be unreliable during this transit.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#8b1a1a]/20 border-l-2 border-[#8b3a3a]">
            <X className="w-4 h-4 text-[#c97a7a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#c97a7a]">Ward broken</p>
              <p className="text-xs text-[#c97a7a]/60 mt-0.5 font-serif">The protective sigil has been compromised. Recast immediately.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#7b68ae]/10 border-l-2 border-[#7b68ae]">
            <Info className="w-4 h-4 text-[#7b68ae] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#7b68ae]">Astral insight</p>
              <p className="text-xs text-[#7b68ae]/60 mt-0.5 font-serif">The third eye reveals hidden connections between elements.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Arcane settings"
        className="relative py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0d0b14]/90 border border-[#c9a74e]/20 p-6 space-y-5">
            {[
              { label: "Stardust Particles", desc: "Enable ambient particle effects on dark surfaces" },
              { label: "Rune Glow Pulse", desc: "Animate gold rune text with breathing luminance" },
              { label: "Auto-scry Mode", desc: "Automatically reveal hidden meanings on hover" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-serif text-[#c9a74e]">{item.label}</p>
                  <p className="text-xs text-[#7b68ae]/50 mt-0.5 font-serif">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 transition-all duration-500 ${
                    toggleStates[index]
                      ? "bg-[#c9a74e] shadow-[0_0_12px_rgba(201,167,78,0.4)]"
                      : "bg-[#4a1942]/60"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-[#0d0b14] transition-transform duration-500 ${
                      toggleStates[index] ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress"
        subtitle="Ritual completion"
        className="relative py-16 px-6 bg-[#4a1942]/10"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0d0b14]/90 border border-[#c9a74e]/20 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-serif text-[#c9a74e]">Incantation progress</p>
                <p className="text-xs text-[#7b68ae]/60 font-mono">{progress}%</p>
              </div>
              <div className="h-1.5 bg-[#4a1942]/40">
                <div
                  className="h-full bg-[#c9a74e] transition-all duration-500 shadow-[0_0_8px_rgba(201,167,78,0.4)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-serif text-[#c9a74e] mb-2">Moon phases</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1.5 bg-[#4a1942]/40">
                      <div
                        className={`h-full transition-all ${value === 100 ? "bg-[#c9a74e] shadow-[0_0_6px_rgba(201,167,78,0.3)]" : value > 0 ? "bg-[#7b68ae] shadow-[0_0_6px_rgba(123,104,174,0.3)]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#7b68ae]/50 mt-1 text-center font-serif">Phase {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#c9a74e]/10">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-serif border border-[#c9a74e]/30 text-[#7b68ae] hover:border-[#c9a74e]/60 hover:text-[#c9a74e] transition-all duration-500 tracking-wider"
              >
                Reverse
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-serif bg-[#4a1942] text-[#c9a74e] border border-[#c9a74e]/30 hover:shadow-[0_0_15px_rgba(201,167,78,0.2)] transition-all duration-500 tracking-wider"
              >
                Advance
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Inscription altar"
        className="relative py-16 px-6"
        titleClassName="text-2xl font-serif tracking-wider text-[#c9a74e] mb-2"
        subtitleClassName="text-sm text-[#7b68ae]/60 mb-10 tracking-wider"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#0d0b14]/90 border border-[#c9a74e]/20 p-8">
            <h3 className="text-lg font-serif text-[#c9a74e] tracking-wider mb-6" style={{ textShadow: "0 0 8px rgba(201,167,78,0.2)" }}>Speak Your Truth</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#c9a74e]/70 font-serif text-xs uppercase tracking-[0.2em] mb-2">True Name</label>
                <input
                  type="text"
                  placeholder="Reveal yourself..."
                  className="w-full px-6 py-3 bg-[#0d0b14]/80 border border-[#c9a74e]/20 text-[#c9a74e] font-serif placeholder-[#c9a74e]/20 focus:outline-none focus:border-[#c9a74e]/60 focus:shadow-[0_0_15px_rgba(201,167,78,0.15)] transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-[#c9a74e]/70 font-serif text-xs uppercase tracking-[0.2em] mb-2">Astral Address</label>
                <input
                  type="email"
                  placeholder="your@realm.arcane"
                  className="w-full px-6 py-3 bg-[#0d0b14]/80 border border-[#c9a74e]/20 text-[#c9a74e] font-serif placeholder-[#c9a74e]/20 focus:outline-none focus:border-[#c9a74e]/60 focus:shadow-[0_0_15px_rgba(201,167,78,0.15)] transition-all duration-500"
                />
              </div>
              <div>
                <label className="block text-[#c9a74e]/70 font-serif text-xs uppercase tracking-[0.2em] mb-2">Inscription</label>
                <textarea
                  placeholder="Write your prophecy..."
                  rows={3}
                  className="w-full px-6 py-3 bg-[#0d0b14]/80 border border-[#c9a74e]/20 text-[#c9a74e] font-serif placeholder-[#c9a74e]/20 focus:outline-none focus:border-[#c9a74e]/60 focus:shadow-[0_0_15px_rgba(201,167,78,0.15)] transition-all duration-500 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#4a1942] text-[#c9a74e] font-serif uppercase tracking-widest border border-[#c9a74e]/50 shadow-[0_0_15px_rgba(201,167,78,0.2)] hover:shadow-[0_0_25px_rgba(201,167,78,0.4)] transition-all duration-500 mt-2">
                Seal Inscription
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative py-10 px-6 border-t border-[#c9a74e]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-[#7b68ae]/50 tracking-wider font-serif">
            Witchcore Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#c9a74e] transition-colors duration-500">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
