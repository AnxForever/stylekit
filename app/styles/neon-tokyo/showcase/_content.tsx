"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Zap, MapPin, Music,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Radio, Headphones, Disc,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Night Sky", hex: "#0a0a1a", bg: "bg-[#0a0a1a]" },
  { name: "Neon Pink", hex: "#ff1493", bg: "bg-[#ff1493]" },
  { name: "Cyan Neon", hex: "#00f0ff", bg: "bg-[#00f0ff]" },
  { name: "Warm Neon", hex: "#ff6b00", bg: "bg-[#ff6b00]" },
  { name: "Purple Neon", hex: "#bc13fe", bg: "bg-[#bc13fe]" },
  { name: "Deep Purple", hex: "#12041e", bg: "bg-[#12041e]" },
  { name: "Wet Asphalt", hex: "#1a1a2e", bg: "bg-[#1a1a2e]" },
  { name: "Sign White", hex: "#f0e6ff", bg: "bg-[#f0e6ff]", border: true },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Radio", icon: Radio },
    { label: "Listen", icon: Headphones },
    { label: "Vinyl", icon: Disc },
  ];

  const accordionItems = [
    { title: "What is Neon Tokyo?", content: "Neon Tokyo captures the electric atmosphere of Kabukicho and Shibuya at midnight. Unlike cyberpunk sci-fi aesthetics, this style embraces the warmth and organic chaos of real urban nightscapes -- rain-slicked streets reflecting layered neon signage." },
    { title: "Multi-Color Neon Philosophy", content: "Authentic Tokyo nightlife is never monochrome. Pink, cyan, orange, and purple neon tubes overlap and bleed into each other, creating chromatic collisions that feel alive, warm, and distinctly metropolitan." },
    { title: "The Wet Street Effect", content: "After rain, Tokyo streets become mirrors. Every surface reflects fractured neon light, doubling the visual density and creating a cinematic depth that defines the lonely romantic aesthetic of the late-night wanderer." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Neon reflection overlay at bottom */}
      <div
        className="fixed inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255,20,147,0.03) 0%, rgba(0,240,255,0.02) 40%, transparent 100%)",
        }}
      />

      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#ff1493]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/neon-tokyo"
            className="flex items-center gap-2 text-gray-400 hover:text-[#ff1493] transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wider">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ff1493]" style={{ filter: "drop-shadow(0 0 6px rgba(255,20,147,0.6))" }} />
            <span className="font-bold text-lg tracking-wider text-white" style={{ textShadow: "0 0 10px rgba(255,20,147,0.4)" }}>
              Neon Tokyo
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm text-[#00f0ff] font-bold uppercase tracking-wider border-2 border-[#00f0ff]/40 rounded-sm hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#ff1493]/60" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#00f0ff]">Kabukicho After Dark</span>
            <div className="w-8 h-px bg-[#ff1493]/60" />
          </div>
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight"
            style={{ textShadow: "0 0 30px rgba(255,20,147,0.4), 0 0 60px rgba(255,20,147,0.2)" }}
          >
            Neon
            <span
              className="block"
              style={{
                background: "linear-gradient(to right, #ff1493, #00f0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(255,20,147,0.3))",
              }}
            >
              never sleeps
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Rain-slicked streets. Layered signage. The electric pulse of a city that breathes in color.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Night metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#ff1493] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Visitors", value: "8,420", color: "#ff1493" },
            { icon: TrendingUp, label: "Growth", value: "+42%", color: "#00f0ff" },
            { icon: Eye, label: "Views", value: "310K", color: "#ff6b00" },
            { icon: Heart, label: "Saves", value: "5,891", color: "#bc13fe" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#0a0a1a]/80 backdrop-blur-md rounded-sm border border-[#ff1493]/20 hover:border-[#ff1493]/40 hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 mb-4" style={{ color: stat.color, filter: `drop-shadow(0 0 4px ${stat.color}80)` }} />
              <p className="text-3xl font-bold text-white mb-1" style={{ textShadow: `0 0 10px ${stat.color}40` }}>{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Neon frequencies"
        className="py-16 px-6 bg-[#12041e]/40"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#00f0ff] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-sm overflow-hidden border border-[#ff1493]/20 bg-[#0a0a1a]/80 backdrop-blur-md"
            labelClassName="text-sm font-bold text-white"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Signal clarity"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#ff6b00] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#0a0a1a]/80 backdrop-blur-md rounded-sm border border-[#ff1493]/20">
            <p className="text-6xl font-bold text-white mb-4 leading-tight" style={{ textShadow: "0 0 20px rgba(255,20,147,0.4)" }}>Heading</p>
            <p className="text-4xl font-bold mb-4" style={{ background: "linear-gradient(to right, #ff1493, #00f0ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Subheading</p>
            <p className="text-xl text-gray-400 mb-4 leading-relaxed">
              Body text illuminated by ambient neon. Crisp readability against the urban dark.
            </p>
            <p className="text-sm text-gray-600 tracking-wider uppercase font-bold">
              Caption text -- data readout from the street
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Neon triggers"
        className="py-16 px-6 bg-[#12041e]/40"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#bc13fe] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#0a0a1a]/80 backdrop-blur-md rounded-sm border border-[#ff1493]/20">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-transparent border-2 border-[#ff1493] text-[#ff1493] font-bold uppercase tracking-wider rounded-sm shadow-[0_0_15px_rgba(255,20,147,0.4),inset_0_0_15px_rgba(255,20,147,0.1)] hover:shadow-[0_0_30px_rgba(255,20,147,0.6),inset_0_0_20px_rgba(255,20,147,0.2)] hover:bg-[#ff1493]/10 transition-all duration-300">
                Enter
              </button>
              <button className="px-6 py-3 bg-[#00f0ff] text-[#0a0a1a] font-bold uppercase tracking-wider rounded-sm shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300">
                Explore
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#ff6b00] text-[#ff6b00] font-bold uppercase tracking-wider rounded-sm shadow-[0_0_15px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] hover:bg-[#ff6b00]/10 transition-all duration-300">
                Discover
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#bc13fe] text-[#bc13fe] font-bold uppercase tracking-wider rounded-sm shadow-[0_0_15px_rgba(188,19,254,0.4)] hover:shadow-[0_0_30px_rgba(188,19,254,0.6)] hover:bg-[#bc13fe]/10 transition-all duration-300">
                Vibe
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-gray-700 text-gray-600 font-bold uppercase tracking-wider rounded-sm cursor-not-allowed">
                Offline
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Street views"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#ff1493] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: "Midnight Alley", desc: "Neon signs flicker above rain-slicked streets, casting liquid color across the pavement in fractured reflections.", label: "Kabukicho", color: "#ff1493" },
            { icon: Music, title: "Vinyl Underground", desc: "Bass frequencies pulse through concrete walls. Inside, the glow of orange and purple neon paints the crowd.", label: "Shibuya", color: "#00f0ff" },
            { icon: Zap, title: "Electric Dawn", desc: "The last trains departed hours ago. Only the neon remains awake, humming its electric lullaby to empty streets.", label: "Shinjuku", color: "#ff6b00" },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-[#0a0a1a]/80 backdrop-blur-md border border-[#ff1493]/20 rounded-sm p-6 hover:border-[#ff1493]/40 hover:shadow-[0_0_25px_rgba(255,20,147,0.15)] transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#ff1493]/5 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: card.color }}>{card.label}</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#ff1493] shadow-[0_0_6px_rgba(255,20,147,0.8)]" />
                    <div className="w-1.5 h-1.5 bg-[#00f0ff] shadow-[0_0_6px_rgba(0,240,255,0.8)]" />
                    <div className="w-1.5 h-1.5 bg-[#ff6b00] shadow-[0_0_6px_rgba(255,107,0,0.8)]" />
                  </div>
                </div>
                <card.icon className="w-6 h-6 mb-4 group-hover:scale-110 transition-transform duration-300" style={{ color: card.color, filter: `drop-shadow(0 0 6px ${card.color}80)` }} />
                <h3 className="text-lg font-bold text-white mb-3" style={{ textShadow: `0 0 10px ${card.color}40` }}>{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Frequency selector"
        className="py-16 px-6 bg-[#12041e]/40"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#00f0ff] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0a0a1a]/80 backdrop-blur-md rounded-sm border border-[#ff1493]/20 overflow-hidden">
            <div className="flex border-b border-[#ff1493]/20">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#ff1493] border-[#ff1493] shadow-[0_2px_15px_rgba(255,20,147,0.3)]"
                      : "text-gray-500 border-transparent hover:text-gray-300"
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
                  <h4 className="text-lg font-bold text-white mb-2" style={{ textShadow: "0 0 10px rgba(255,20,147,0.3)" }}>Late Night FM</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Frequencies drift through the humid air. The DJ whispers over lo-fi beats, a voice from somewhere in the neon maze of backstreet Shinjuku.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-white mb-2" style={{ textShadow: "0 0 10px rgba(0,240,255,0.3)" }}>City Soundscape</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Headphones on, world out. Every puddle reflects a different frequency. The city is a synthesizer, and you are walking through its waveform.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-white mb-2" style={{ textShadow: "0 0 10px rgba(255,107,0,0.3)" }}>Analog Warmth</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">The needle drops. Crackle and hiss give way to warmth that digital cannot replicate. In a basement bar, vinyl spins under orange neon glow.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Unfolding layers"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#ff6b00] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#0a0a1a]/80 backdrop-blur-md rounded-sm border border-[#ff1493]/20 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#ff1493]/5 transition-all duration-300"
              >
                <span className="font-bold text-white">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#ff1493] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#ff1493]/10">
                  <p className="text-sm text-gray-400 leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="System signals"
        className="py-16 px-6 bg-[#12041e]/40"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#bc13fe] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#00f0ff]/5 rounded-sm border-l-2 border-[#00f0ff]">
            <Check className="w-4 h-4 text-[#00f0ff] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#00f0ff]">Connection established</p>
              <p className="text-xs text-[#00f0ff]/50 mt-0.5">Signal locked to Shibuya tower frequency.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ff6b00]/5 rounded-sm border-l-2 border-[#ff6b00]">
            <AlertTriangle className="w-4 h-4 text-[#ff6b00] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#ff6b00]">Signal interference</p>
              <p className="text-xs text-[#ff6b00]/50 mt-0.5">Neon density exceeding sensor threshold in sector 7.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ff1493]/5 rounded-sm border-l-2 border-[#ff1493]">
            <X className="w-4 h-4 text-[#ff1493] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#ff1493]">Link severed</p>
              <p className="text-xs text-[#ff1493]/50 mt-0.5">Last train departed. Walking mode activated.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#bc13fe]/5 rounded-sm border-l-2 border-[#bc13fe]">
            <Info className="w-4 h-4 text-[#bc13fe] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#bc13fe]">Area scan complete</p>
              <p className="text-xs text-[#bc13fe]/50 mt-0.5">3 new locations detected within a 500m radius.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Night settings"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#ff1493] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0a0a1a]/80 backdrop-blur-md rounded-sm border border-[#ff1493]/20 p-6 space-y-5">
            {[
              { label: "Neon Glow Mode", desc: "Enhance colored glow effects on all elements" },
              { label: "Rain Reflections", desc: "Enable wet-street mirror effect on surfaces" },
              { label: "Auto Night Vision", desc: "Adjust contrast for optimal dark viewing" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-sm transition-all duration-300 ${
                    toggleStates[index]
                      ? "bg-[#ff1493] shadow-[0_0_12px_rgba(255,20,147,0.5)]"
                      : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-sm transition-transform duration-300 ${
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
        subtitle="Signal strength"
        className="py-16 px-6 bg-[#12041e]/40"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#00f0ff] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0a0a1a]/80 backdrop-blur-md rounded-sm border border-[#ff1493]/20 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-white">Neon intensity</p>
                <p className="text-xs text-[#ff1493] font-mono">{progress}%</p>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-sm">
                <div
                  className="h-full bg-[#ff1493] rounded-sm transition-all duration-300 shadow-[0_0_10px_rgba(255,20,147,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white mb-2">Channel frequencies</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 100, color: "#ff1493" },
                  { value: 100, color: "#00f0ff" },
                  { value: progress, color: "#ff6b00" },
                  { value: 0, color: "#bc13fe" },
                ].map((ch, index) => (
                  <div key={index}>
                    <div className="h-1.5 bg-gray-800 rounded-sm">
                      <div
                        className="h-full rounded-sm transition-all"
                        style={{
                          width: `${ch.value}%`,
                          backgroundColor: ch.color,
                          boxShadow: ch.value > 0 ? `0 0 8px ${ch.color}80` : "none",
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center font-mono">Ch.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#ff1493]/10">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-bold border-2 border-gray-600 text-gray-400 rounded-sm hover:border-[#ff1493] hover:text-[#ff1493] transition-all duration-300 uppercase tracking-wider"
              >
                Dim
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-bold bg-[#ff1493] text-white rounded-sm shadow-[0_0_15px_rgba(255,20,147,0.4)] hover:shadow-[0_0_25px_rgba(255,20,147,0.6)] transition-all duration-300 uppercase tracking-wider"
              >
                Amplify
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Data input"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-white mb-2"
        subtitleClassName="text-sm text-[#ff6b00] mb-10 font-bold uppercase tracking-wider"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#0a0a1a]/80 backdrop-blur-md rounded-sm border border-[#ff1493]/20 p-8">
            <h3 className="text-lg font-bold text-white mb-6" style={{ textShadow: "0 0 10px rgba(255,20,147,0.3)" }}>Transmit Signal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#00f0ff] text-xs font-bold uppercase tracking-widest mb-2">Handle</label>
                <input
                  type="text"
                  placeholder="Your street name..."
                  className="w-full px-4 py-3 bg-[#0a0a1a]/80 border border-[#ff1493]/30 rounded-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ff1493] focus:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-[#00f0ff] text-xs font-bold uppercase tracking-widest mb-2">Frequency</label>
                <input
                  type="email"
                  placeholder="signal@neon.tokyo"
                  className="w-full px-4 py-3 bg-[#0a0a1a]/80 border border-[#ff1493]/30 rounded-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ff1493] focus:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-[#00f0ff] text-xs font-bold uppercase tracking-widest mb-2">Message</label>
                <textarea
                  placeholder="Broadcast your signal..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0a0a1a]/80 border border-[#ff1493]/30 rounded-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ff1493] focus:shadow-[0_0_15px_rgba(255,20,147,0.3)] transition-all duration-300 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#ff1493] text-white font-bold uppercase tracking-wider rounded-sm shadow-[0_0_20px_rgba(255,20,147,0.5)] hover:shadow-[0_0_35px_rgba(255,20,147,0.7)] transition-all duration-300 mt-2">
                Transmit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#ff1493]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-gray-600 tracking-wider font-bold uppercase">
            Neon Tokyo Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#ff1493] transition-colors duration-300">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
