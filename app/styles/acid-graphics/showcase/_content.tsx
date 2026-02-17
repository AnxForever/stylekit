"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Zap, Heart, Star, Sparkles, ChevronDown, ChevronUp,
  Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Music
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(75);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { name: "Acid Green", value: "#00ff41", description: "Primary neon" },
    { name: "Electric Pink", value: "#ff006e", description: "Accent bright" },
    { name: "Cyber Yellow", value: "#ffea00", description: "Warning neon" },
    { name: "Toxic Purple", value: "#b900ff", description: "Secondary" },
    { name: "Deep Black", value: "#0a0a0a", description: "Background" },
  ];

  const tabs = ["Rave", "Psyche", "Trip"];

  const accordionItems = [
    { title: "What is Acid Graphics?", content: "Acid Graphics is a bold, psychedelic design style inspired by 90s rave culture, featuring neon colors, distorted typography, and trippy visual effects that create an intense, energetic atmosphere." },
    { title: "Core Elements", content: "High saturation fluorescent colors, warped and melted text, liquid flowing shapes, RGB chromatic aberration, and hallucinogenic patterns that push visual boundaries." },
    { title: "Best Use Cases", content: "Perfect for music festivals, electronic music brands, youth culture products, experimental art projects, and any brand wanting to make a bold, unforgettable statement." },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-[#00ff41]/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#00ff41] hover:text-[#ff006e] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black text-lg" style={{ fontFamily: 'Impact, sans-serif' }}>BACK TO STYLES</span>
          </Link>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-[#ff006e] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-[#ffea00] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <ShowcaseHero
        title="ACID GRAPHICS"
        subtitle="PSYCHEDELIC NEON STYLE"
        description="High saturation fluorescent colors meet distorted typography in this trippy, rave-inspired aesthetic that breaks all the rules."
        className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-black via-purple-950 to-black"
        titleClassName="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-[#00ff41] via-[#ff006e] to-[#ffea00] text-transparent bg-clip-text animate-pulse"
        subtitleClassName="text-2xl font-black tracking-[0.3em] text-[#b900ff] mb-8"
        descriptionClassName="text-lg text-gray-300 leading-relaxed"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#00ff41] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-[#ff006e] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#b900ff] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection
        title="ENERGY LEVELS"
        subtitle="Maximum intensity metrics"
        className="py-16 px-6 relative overflow-hidden"
        titleClassName="text-5xl font-black text-[#00ff41] mb-4 text-center"
        subtitleClassName="text-[#ff006e] mb-12 text-center uppercase tracking-widest"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          {[
            { icon: Users, label: "Ravers", value: "999K", color: "#00ff41" },
            { icon: TrendingUp, label: "Vibes", value: "+420%", color: "#ff006e" },
            { icon: Eye, label: "Trips", value: "∞", color: "#ffea00" },
            { icon: Music, label: "BPM", value: "174", color: "#b900ff" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-black/80 border-4 rounded-3xl hover:scale-105 transition-transform"
              style={{ borderColor: stat.color, boxShadow: `0 0 30px ${stat.color}80` }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: stat.color, boxShadow: `0 0 20px ${stat.color}` }}
              >
                <stat.icon className="w-7 h-7 text-black" />
              </div>
              <p className="text-4xl font-black mb-2" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-[#00ff41] to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-2 h-full bg-gradient-to-b from-[#ff006e] to-transparent"></div>
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="TOXIC COLORS"
        subtitle="Neon palette"
        className="py-16 px-6 bg-gradient-to-b from-black to-purple-950"
        titleClassName="text-5xl font-black text-[#ffea00] mb-4 text-center"
        subtitleClassName="text-[#00ff41] mb-12 text-center uppercase tracking-widest"
      >
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="WARPED TEXT"
        subtitle="Distorted type system"
        className="py-16 px-6"
        titleClassName="text-5xl font-black text-[#b900ff] mb-4 text-center"
        subtitleClassName="text-[#ffea00] mb-12 text-center uppercase tracking-widest"
      >
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="p-8 bg-black/60 border-2 border-[#00ff41] rounded-2xl" style={{ boxShadow: '0 0 40px #00ff4140' }}>
            <h1 className="text-8xl font-black text-[#00ff41] mb-2" style={{ fontFamily: 'Impact, sans-serif', transform: 'scaleY(1.2)' }}>ACID</h1>
            <p className="text-sm text-gray-400 uppercase tracking-[0.3em]">Display / Impact</p>
          </div>
          <div className="p-8 bg-black/60 border-2 border-[#ff006e] rounded-2xl" style={{ boxShadow: '0 0 40px #ff006e40' }}>
            <h2 className="text-5xl font-black text-[#ff006e] mb-2" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}>PSYCHEDELIC</h2>
            <p className="text-sm text-gray-400 uppercase tracking-[0.3em]">Heading / Bold</p>
          </div>
          <div className="p-8 bg-black/60 border-2 border-[#ffea00] rounded-2xl" style={{ boxShadow: '0 0 40px #ffea0040' }}>
            <p className="text-xl font-bold text-[#ffea00] mb-2">This is body text with maximum energy and neon glow effects</p>
            <p className="text-sm text-gray-400 uppercase tracking-[0.3em]">Body / Regular</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="ACTION BUTTONS"
        subtitle="Interactive elements"
        className="py-16 px-6 bg-gradient-to-b from-purple-950 to-black"
        titleClassName="text-5xl font-black text-[#00ff41] mb-4 text-center"
        subtitleClassName="text-[#ff006e] mb-12 text-center uppercase tracking-widest"
      >
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-4 bg-[#00ff41] text-black font-black text-lg rounded-full hover:scale-110 transition-transform" style={{ boxShadow: '0 0 30px #00ff41' }}>
            PRIMARY
          </button>
          <button className="px-8 py-4 bg-[#ff006e] text-white font-black text-lg rounded-full hover:scale-110 transition-transform" style={{ boxShadow: '0 0 30px #ff006e' }}>
            SECONDARY
          </button>
          <button className="px-8 py-4 bg-transparent border-4 border-[#ffea00] text-[#ffea00] font-black text-lg rounded-full hover:bg-[#ffea00] hover:text-black transition-all" style={{ boxShadow: '0 0 20px #ffea0080' }}>
            OUTLINED
          </button>
          <button className="px-8 py-4 bg-gradient-to-r from-[#00ff41] via-[#ff006e] to-[#b900ff] text-white font-black text-lg rounded-full hover:scale-110 transition-transform animate-pulse">
            GRADIENT
          </button>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="TRIPPY CARDS"
        subtitle="Content blocks"
        className="py-16 px-6"
        titleClassName="text-5xl font-black text-[#ffea00] mb-4 text-center"
        subtitleClassName="text-[#b900ff] mb-12 text-center uppercase tracking-widest"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "NEON", desc: "Maximum saturation fluorescent colors", color: "#00ff41" },
            { title: "DISTORT", desc: "Warped and melted typography effects", color: "#ff006e" },
            { title: "PSYCHE", desc: "Hallucinogenic patterns and visuals", color: "#ffea00" },
          ].map((card, i) => (
            <div
              key={i}
              className="p-8 bg-black/80 border-4 rounded-3xl hover:scale-105 transition-transform"
              style={{ borderColor: card.color, boxShadow: `0 0 40px ${card.color}60` }}
            >
              <h3 className="text-3xl font-black mb-4" style={{ color: card.color, fontFamily: 'Impact, sans-serif' }}>{card.title}</h3>
              <p className="text-gray-300 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="TAB NAVIGATION"
        subtitle="Content switching"
        className="py-16 px-6 bg-gradient-to-b from-black to-purple-950"
        titleClassName="text-5xl font-black text-[#ff006e] mb-4 text-center"
        subtitleClassName="text-[#00ff41] mb-12 text-center uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/80 border-4 border-[#b900ff] rounded-3xl overflow-hidden" style={{ boxShadow: '0 0 50px #b900ff60' }}>
            <div className="flex border-b-4 border-[#b900ff]">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 px-6 py-4 font-black text-lg transition-all ${
                    activeTab === index
                      ? "bg-[#b900ff] text-white"
                      : "text-[#b900ff] hover:bg-[#b900ff]/20"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8 min-h-[150px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-2xl font-black text-[#00ff41] mb-3">Rave Culture</h4>
                  <p className="text-gray-300">Born from 90s underground rave scenes, acid graphics capture the energy and psychedelic experience of electronic music culture.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-2xl font-black text-[#ff006e] mb-3">Psychedelic Art</h4>
                  <p className="text-gray-300">Inspired by hallucinogenic visual experiences with distorted perspectives and intense color combinations.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-2xl font-black text-[#ffea00] mb-3">Visual Trip</h4>
                  <p className="text-gray-300">Creates an immersive, mind-bending journey through bold typography and neon-soaked compositions.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="INFO DROPS"
        subtitle="Expandable content"
        className="py-16 px-6"
        titleClassName="text-5xl font-black text-[#00ff41] mb-4 text-center"
        subtitleClassName="text-[#ffea00] mb-12 text-center uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {accordionItems.map((item, index) => (
            <div
              key={index}
              className="bg-black/80 border-4 rounded-2xl overflow-hidden"
              style={{ 
                borderColor: index === 0 ? '#00ff41' : index === 1 ? '#ff006e' : '#ffea00',
                boxShadow: `0 0 30px ${index === 0 ? '#00ff41' : index === 1 ? '#ff006e' : '#ffea00'}40`
              }}
            >
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-black text-lg" style={{ color: index === 0 ? '#00ff41' : index === 1 ? '#ff006e' : '#ffea00' }}>
                  {item.title}
                </span>
                {openAccordion === index ? (
                  <ChevronUp className="w-6 h-6" style={{ color: index === 0 ? '#00ff41' : index === 1 ? '#ff006e' : '#ffea00' }} />
                ) : (
                  <ChevronDown className="w-6 h-6" style={{ color: index === 0 ? '#00ff41' : index === 1 ? '#ff006e' : '#ffea00' }} />
                )}
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="NOTIFICATIONS"
        subtitle="System messages"
        className="py-16 px-6 bg-gradient-to-b from-purple-950 to-black"
        titleClassName="text-5xl font-black text-[#b900ff] mb-4 text-center"
        subtitleClassName="text-[#ff006e] mb-12 text-center uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { icon: Check, label: "Success Vibe", desc: "You're on fire!", color: "#00ff41" },
            { icon: AlertTriangle, label: "Warning Trip", desc: "Careful with that energy!", color: "#ffea00" },
            { icon: X, label: "Error State", desc: "Something broke the flow.", color: "#ff006e" },
            { icon: Info, label: "Info Blast", desc: "New wave incoming!", color: "#b900ff" },
          ].map((alert, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 bg-black/80 border-4 rounded-2xl"
              style={{ borderColor: alert.color, boxShadow: `0 0 30px ${alert.color}60` }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: alert.color }}>
                <alert.icon className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="font-black text-lg" style={{ color: alert.color }}>{alert.label}</p>
                <p className="text-gray-300 text-sm">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="POWER SWITCHES"
        subtitle="Toggle controls"
        className="py-16 px-6"
        titleClassName="text-5xl font-black text-[#ffea00] mb-4 text-center"
        subtitleClassName="text-[#00ff41] mb-12 text-center uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-black/80 border-4 border-[#ff006e] rounded-3xl space-y-6" style={{ boxShadow: '0 0 50px #ff006e60' }}>
            {[
              { label: "Neon Mode", desc: "Maximum fluorescence", color: "#00ff41" },
              { label: "Distortion FX", desc: "Warp typography", color: "#ff006e" },
              { label: "Psyche Filter", desc: "Trippy visuals", color: "#ffea00" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b-2 border-gray-800 last:border-b-0">
                <div>
                  <p className="font-black text-lg" style={{ color: item.color }}>{item.label}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-16 h-8 rounded-full transition-all`}
                  style={{ 
                    backgroundColor: toggleStates[index] ? item.color : '#333',
                    boxShadow: toggleStates[index] ? `0 0 20px ${item.color}` : 'none'
                  }}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all ${
                      toggleStates[index] ? "right-1" : "left-1"
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
        title="ENERGY BARS"
        subtitle="Progress indicators"
        className="py-16 px-6 bg-gradient-to-b from-black to-purple-950"
        titleClassName="text-5xl font-black text-[#ff006e] mb-4 text-center"
        subtitleClassName="text-[#b900ff] mb-12 text-center uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-black/80 border-4 border-[#00ff41] rounded-3xl space-y-8" style={{ boxShadow: '0 0 50px #00ff4160' }}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-black text-lg text-[#00ff41]">Vibe Level</p>
                <p className="text-sm font-bold text-[#00ff41]">{progress}%</p>
              </div>
              <div className="h-4 bg-gray-900 rounded-full overflow-hidden border-2 border-[#00ff41]">
                <div
                  className="h-full bg-gradient-to-r from-[#00ff41] via-[#ff006e] to-[#b900ff] transition-all duration-500"
                  style={{ width: `${progress}%`, boxShadow: '0 0 20px #00ff41' }}
                />
              </div>
            </div>

            <div>
              <p className="font-black text-lg text-[#ff006e] mb-3">Stage Progress</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((val, i) => (
                  <div key={i}>
                    <div className="h-3 bg-gray-900 rounded-full overflow-hidden border-2" style={{ borderColor: i === 2 ? '#ff006e' : '#333' }}>
                      <div
                        className="h-full transition-all"
                        style={{ 
                          width: `${val}%`,
                          backgroundColor: val === 100 ? '#00ff41' : val > 0 ? '#ff006e' : 'transparent',
                          boxShadow: val > 0 ? `0 0 10px ${val === 100 ? '#00ff41' : '#ff006e'}` : 'none'
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-center">S{i + 1}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t-2 border-gray-800">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-6 py-3 bg-gray-900 border-2 border-[#ffea00] text-[#ffea00] font-black rounded-full hover:bg-[#ffea00] hover:text-black transition-all"
              >
                DECREASE
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-6 py-3 bg-[#ffea00] text-black font-black rounded-full hover:scale-105 transition-transform"
                style={{ boxShadow: '0 0 20px #ffea00' }}
              >
                INCREASE
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="border-t border-[#00ff41]/30 py-12 px-6 text-center bg-black">
        <p className="text-gray-400">
          Acid Graphics Style © 2026 - <span className="text-[#00ff41]">Maximum Energy</span>
        </p>
      </footer>
    </div>
  );
}
