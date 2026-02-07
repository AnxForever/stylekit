"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Music,
  Sun,
  Sunset,
  Radio,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Info,
  Play,
  ArrowLeft,
  Car,
  Gauge,
  Volume2,
} from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#2d0a4e] to-[#ff006e]/20 relative overflow-hidden text-white">
      {/* Retro Sun */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-t from-[#ff6b35] via-[#ff006e] to-[#a020f0] rounded-t-full opacity-60 pointer-events-none" />

      {/* Perspective Grid Floor */}
      <div className="fixed bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(transparent_0%,rgba(255,0,110,0.1)_100%)] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,110,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,110,0.3)_1px,transparent_1px)] bg-[size:60px_30px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
      </div>

      {/* Palm Tree Silhouettes */}
      <div className="fixed bottom-[22%] left-[5%] pointer-events-none opacity-40">
        <svg viewBox="0 0 120 200" className="w-20 h-40 fill-[#0a0a0a]">
          <path d="M55,200 L55,100 Q30,80 10,60 Q40,75 55,85 Q40,50 25,30 Q50,55 60,80 Q65,40 80,20 Q70,55 60,80 Q75,70 100,60 Q70,80 60,95 L60,200 Z" />
        </svg>
      </div>
      <div className="fixed bottom-[22%] right-[8%] pointer-events-none opacity-30">
        <svg viewBox="0 0 120 200" className="w-16 h-32 fill-[#0a0a0a]">
          <path d="M55,200 L55,100 Q30,80 10,60 Q40,75 55,85 Q40,50 25,30 Q50,55 60,80 Q65,40 80,20 Q70,55 60,80 Q75,70 100,60 Q70,80 60,95 L60,200 Z" />
        </svg>
      </div>

      {/* 1. Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#ff006e]/30 bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/outrun"
            className="flex items-center gap-2 text-[#ff006e]/80 hover:text-[#ff006e] transition-colors font-mono"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider text-sm">Back</span>
          </Link>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] via-[#ff6b35] to-[#00d4ff] uppercase tracking-[0.3em]">
            OUTRUN
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#ff006e]/50 text-[#ff006e] font-bold uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(255,0,110,0.3)] hover:bg-[#ff006e]/20 hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] rounded-lg transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#00d4ff]/80 mb-6">
            // STYLE :: RETROWAVE
          </p>
          <h1 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ff006e] via-[#ff6b35] to-[#a020f0] drop-shadow-[0_0_40px_rgba(255,0,110,0.6)]">
              OUTRUN
            </span>
          </h1>
          <p className="text-xl text-[#00d4ff]/80 max-w-2xl mx-auto mb-4 font-mono">
            Chase the sunset -- 80s retrowave with neon glow and chrome speed
          </p>
          {/* Sunset Gradient Divider */}
          <div className="w-64 h-1 mx-auto mb-10 bg-gradient-to-r from-[#a020f0] via-[#ff006e] to-[#ff6b35] rounded-full shadow-[0_0_20px_rgba(255,0,110,0.5)]" />
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_30px_rgba(255,0,110,0.5)] hover:shadow-[0_0_50px_rgba(255,0,110,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Ride
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_10px_rgba(0,212,255,0.3)] hover:bg-[#00d4ff] hover:text-[#0a0a0a] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all duration-300 flex items-center gap-2">
              <Radio className="w-5 h-5" />
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Grid Divider */}
      <div className="relative z-10 h-8 bg-[linear-gradient(90deg,transparent_49%,rgba(255,0,110,0.4)_49%,rgba(255,0,110,0.4)_51%,transparent_51%),linear-gradient(transparent_49%,rgba(0,212,255,0.2)_49%,rgba(0,212,255,0.2)_51%,transparent_51%)] bg-[size:40px_8px]" />

      {/* 3. Color Palette */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Color System
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Neon Horizon Palette</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Magenta", hex: "#ff006e", bg: "bg-[#ff006e]", glow: "shadow-[0_0_25px_rgba(255,0,110,0.6)]" },
              { name: "Purple", hex: "#a020f0", bg: "bg-[#a020f0]", glow: "shadow-[0_0_25px_rgba(160,32,240,0.6)]" },
              { name: "Cyan Sky", hex: "#00d4ff", bg: "bg-[#00d4ff]", glow: "shadow-[0_0_25px_rgba(0,212,255,0.6)]" },
              { name: "Void Black", hex: "#0a0a0a", bg: "bg-[#0a0a0a]", glow: "border-[#ff006e]/50" },
              { name: "Sunset Orange", hex: "#ff6b35", bg: "bg-[#ff6b35]", glow: "shadow-[0_0_25px_rgba(255,107,53,0.6)]" },
            ].map((color) => (
              <div
                key={color.name}
                className="border border-[#ff006e]/30 bg-[#0a0a0a]/60 backdrop-blur-sm rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 group"
              >
                <div className={`h-24 md:h-28 ${color.bg} group-hover:${color.glow} transition-shadow`} />
                <div className="p-3 border-t border-[#ff006e]/20">
                  <p className="font-bold text-sm text-[#ff006e]">{color.name}</p>
                  <p className="text-xs text-[#00d4ff] font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Typography */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Typography
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Chrome vs Neon</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#ff006e]/30">
              <p className="font-mono text-xs text-[#ff006e] uppercase tracking-widest mb-4">Display Heading</p>
              <h3 className="text-4xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] via-[#ff6b35] to-[#a020f0] mb-3">
                CHROME RUSH
              </h3>
              <p className="text-sm text-[#00d4ff]/60 font-mono">Bold, gradient text with metallic feel</p>
            </div>
            <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#00d4ff]/30">
              <p className="font-mono text-xs text-[#00d4ff] uppercase tracking-widest mb-4">Body Text</p>
              <p className="text-base leading-relaxed text-[#00d4ff]/80 mb-3">
                The neon lights flicker against the endless highway. Synthwave pulses through the night as the horizon glows with electric color.
              </p>
              <p className="text-sm text-[#a020f0]/60 font-mono">Clean sans-serif, high readability on dark</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Buttons */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Buttons
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Neon Controls</p>
          <div className="p-8 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#ff006e]/30">
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,0,110,0.5)] hover:shadow-[0_0_35px_rgba(255,0,110,0.8)] transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Primary
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#ff006e] text-[#ff006e] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_10px_rgba(255,0,110,0.3),inset_0_0_10px_rgba(255,0,110,0.1)] hover:bg-[#ff006e] hover:text-white transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#ff006e] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,107,53,0.5)] hover:shadow-[0_0_35px_rgba(255,107,53,0.8)] transition-all flex items-center gap-2">
                <Sun className="w-4 h-4" />
                Accent
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#a020f0] text-[#a020f0] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_10px_rgba(160,32,240,0.3)] hover:bg-[#a020f0] hover:text-white transition-all">
                Danger
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Cards */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Cards
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Retro Panels</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#ff006e]/30 hover:shadow-[0_0_40px_rgba(255,0,110,0.3)] transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ff006e] to-[#a020f0] rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,0,110,0.5)] group-hover:shadow-[0_0_30px_rgba(255,0,110,0.7)] transition-all">
                <Sunset className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#ff6b35] mb-2 uppercase">
                VHS Sunset
              </h3>
              <p className="text-[#ff006e]/60 text-sm">Tape hiss and tracking lines across the fading horizon. The sun dips below the grid.</p>
            </div>
            <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#00d4ff]/30 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00d4ff] to-[#a020f0] rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,212,255,0.5)] group-hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all">
                <Car className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#a020f0] mb-2 uppercase">
                Midnight Drive
              </h3>
              <p className="text-[#00d4ff]/60 text-sm">Chrome fenders reflect neon signs. The highway stretches into infinite darkness.</p>
            </div>
            <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#a020f0]/30 hover:shadow-[0_0_40px_rgba(160,32,240,0.3)] transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#a020f0] to-[#ff006e] rounded-lg flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(160,32,240,0.5)] group-hover:shadow-[0_0_30px_rgba(160,32,240,0.7)] transition-all">
                <Music className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a020f0] to-[#ff006e] mb-2 uppercase">
                Synthwave FM
              </h3>
              <p className="text-[#a020f0]/60 text-sm">Analog synthesizers pulse through the night. Bass drops echo across the electric cityscape.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Form */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Form
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Neon Inputs</p>
          <div className="p-8 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#ff006e]/30 shadow-[0_0_40px_rgba(255,0,110,0.2)]">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#ff006e] uppercase tracking-wider mb-2">Handle</label>
                <input
                  type="text"
                  placeholder="Enter your handle..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/60 rounded-lg border border-[#ff006e]/50 text-[#ff006e] placeholder-[#ff006e]/30 shadow-[0_0_10px_rgba(255,0,110,0.1)] focus:border-[#ff006e] focus:shadow-[0_0_20px_rgba(255,0,110,0.4)] focus:outline-none transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#00d4ff] uppercase tracking-wider mb-2">Frequency</label>
                <input
                  type="text"
                  placeholder="Enter frequency..."
                  className="w-full px-4 py-3 bg-[#0a0a0a]/60 rounded-lg border border-[#00d4ff]/50 text-[#00d4ff] placeholder-[#00d4ff]/30 shadow-[0_0_10px_rgba(0,212,255,0.1)] focus:border-[#00d4ff] focus:shadow-[0_0_20px_rgba(0,212,255,0.4)] focus:outline-none transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#a020f0] uppercase tracking-wider mb-2">Message</label>
                <textarea
                  placeholder="Broadcast message..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0a0a0a]/60 rounded-lg border border-[#a020f0]/50 text-[#a020f0] placeholder-[#a020f0]/30 shadow-[0_0_10px_rgba(160,32,240,0.1)] focus:border-[#a020f0] focus:shadow-[0_0_20px_rgba(160,32,240,0.4)] focus:outline-none transition-all font-mono resize-none"
                />
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#ff006e] to-[#a020f0] text-white font-bold uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(255,0,110,0.5)] hover:shadow-[0_0_35px_rgba(255,0,110,0.8)] transition-all">
                Transmit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Divider */}
      <div className="relative z-10 h-8 bg-[linear-gradient(90deg,transparent_49%,rgba(0,212,255,0.3)_49%,rgba(0,212,255,0.3)_51%,transparent_51%),linear-gradient(transparent_49%,rgba(255,0,110,0.2)_49%,rgba(255,0,110,0.2)_51%,transparent_51%)] bg-[size:40px_8px]" />

      {/* 8. Tabs */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Tabs
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Gear Selector</p>
          <div className="border border-[#ff006e]/30 rounded-lg overflow-hidden bg-[#0a0a0a]/60 backdrop-blur-sm">
            <div className="flex border-b border-[#ff006e]/30">
              {["DRIVE", "CRUISE", "TURBO"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 font-bold text-sm tracking-[0.2em] py-4 transition-all uppercase ${
                    activeTab === i
                      ? "bg-gradient-to-r from-[#ff006e] via-[#ff6b35] to-[#a020f0] text-white shadow-[0_4px_20px_rgba(255,0,110,0.4)]"
                      : "text-[#ff006e]/50 hover:text-[#ff006e] hover:bg-[#ff006e]/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 font-mono text-sm">
              {activeTab === 0 && (
                <div>
                  <p className="text-[#ff006e] font-bold mb-2 flex items-center gap-2">
                    <Car className="w-4 h-4" /> DRIVE MODE ENGAGED
                  </p>
                  <p className="text-[#00d4ff]/70">Steady acceleration through the neon-lit boulevard. The engine hums at 3,200 RPM as palm trees blur past the windows.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <p className="text-[#ff6b35] font-bold mb-2 flex items-center gap-2">
                    <Gauge className="w-4 h-4" /> CRUISE CONTROL ACTIVE
                  </p>
                  <p className="text-[#00d4ff]/70">Locked at 88 mph on the open freeway. The sunset paints the sky in electric gradients as the radio plays endless synthwave.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <p className="text-[#a020f0] font-bold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> TURBO BOOST ACTIVATED
                  </p>
                  <p className="text-[#00d4ff]/70">Maximum velocity. The speedometer needle bends past the limit. Neon streaks dissolve into light trails across the infinite grid.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Neon Badges */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Badges
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Neon Labels</p>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-xs text-[#ff006e]/60 mb-3 tracking-widest uppercase">Neon Tube</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#ff006e]/20 text-[#ff006e] border border-[#ff006e]/50 rounded-full shadow-[0_0_12px_rgba(255,0,110,0.4)]">Live</span>
                <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/50 rounded-full shadow-[0_0_12px_rgba(0,212,255,0.4)]">Online</span>
                <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#a020f0]/20 text-[#a020f0] border border-[#a020f0]/50 rounded-full shadow-[0_0_12px_rgba(160,32,240,0.4)]">New</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-[#ff006e]/60 mb-3 tracking-widest uppercase">Chrome Pill</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ff006e] to-[#ff6b35] text-white rounded-full">Retro</span>
                <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#a020f0] to-[#00d4ff] text-white rounded-full">Synth</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-[#ff006e]/60 mb-3 tracking-widest uppercase">VHS Label</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider bg-[#0a0a0a] text-[#ff006e] border border-[#ff006e]/70">REC</span>
                <span className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider bg-[#0a0a0a] text-[#ff6b35] border border-[#ff6b35]/70">PLAY</span>
                <span className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider bg-[#0a0a0a] text-[#00d4ff] border border-[#00d4ff]/70">REW</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Progress Bars */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Progress
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Sunset Meters</p>
          <div className="space-y-8">
            {[
              { label: "TAPE_SIDE_A", value: 85 },
              { label: "SIGNAL_STRENGTH", value: 62 },
              { label: "FUEL_LEVEL", value: 38 },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between font-mono text-xs text-[#ff006e]/60 mb-2">
                  <span>{bar.label}</span>
                  <span>{bar.value}%</span>
                </div>
                <div className="h-3 bg-[#0a0a0a] border border-[#ff006e]/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff006e] via-[#ff6b35] to-[#ff006e] rounded-full shadow-[0_0_15px_rgba(255,0,110,0.5)]"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Alerts */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Alerts
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">System Notifications</p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border border-[#00d4ff]/50 bg-[#00d4ff]/10 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
              <Info className="w-5 h-5 text-[#00d4ff] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#00d4ff] mb-1">SYSTEM INFO</p>
                <p className="text-xs text-[#00d4ff]/70 font-mono">All frequencies tuned. Signal clarity at maximum.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border border-[#ff6b35]/50 bg-[#ff6b35]/10 shadow-[0_0_15px_rgba(255,107,53,0.2)]">
              <AlertTriangle className="w-5 h-5 text-[#ff6b35] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#ff6b35] mb-1">WARNING</p>
                <p className="text-xs text-[#ff6b35]/70 font-mono">Fuel reserves depleting. Nearest station: 12 miles.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border border-[#ff006e]/50 bg-[#ff006e]/10 shadow-[0_0_15px_rgba(255,0,110,0.2)]">
              <X className="w-5 h-5 text-[#ff006e] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#ff006e] mb-1">ERROR</p>
                <p className="text-xs text-[#ff006e]/70 font-mono">Tape deck malfunction. Rewind and retry.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg border border-green-400/50 bg-green-400/10 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
              <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-green-400 mb-1">SUCCESS</p>
                <p className="text-xs text-green-400/70 font-mono">Connection established. Retrowave broadcast active.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Toggle Controls */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Toggles
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Neon Switches</p>
          <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#ff006e]/30 space-y-5">
            {["NEON_LIGHTS", "RADIO_FM", "TURBO_BOOST"].map((label, i) => (
              <div key={label} className="flex items-center justify-between">
                <span className="font-mono text-sm text-[#00d4ff]/80">{label}</span>
                <button
                  role="switch"
                  aria-checked={toggleStates[i]}
                  aria-label={label}
                  onClick={() => {
                    const next = [...toggleStates];
                    next[i] = !next[i];
                    setToggleStates(next);
                  }}
                  className={`w-14 h-7 rounded-full border-2 transition-all duration-300 relative ${
                    toggleStates[i]
                      ? "bg-[#ff006e]/30 border-[#ff006e] shadow-[0_0_15px_rgba(255,0,110,0.5)]"
                      : "bg-[#0a0a0a] border-[#ff006e]/30"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-all duration-300 absolute top-0.5 ${
                      toggleStates[i]
                        ? "translate-x-7 bg-[#ff006e] shadow-[0_0_10px_rgba(255,0,110,0.8)]"
                        : "translate-x-0.5 bg-[#ff006e]/40"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Dropdown */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-sm mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Dropdown
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">CRT Selector</p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/80 border border-[#ff006e]/50 rounded-lg text-[#ff006e] font-mono text-sm hover:border-[#ff006e] hover:shadow-[0_0_15px_rgba(255,0,110,0.3)] transition-all"
            >
              <span>SELECT_STATION</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#0a0a0a] border border-[#ff006e]/50 rounded-lg overflow-hidden z-20 shadow-[0_0_30px_rgba(255,0,110,0.3)]">
                {[
                  { label: "SUNSET_FM 98.7", icon: <Sunset className="w-4 h-4" /> },
                  { label: "NEON_WAVE 101.3", icon: <Radio className="w-4 h-4" /> },
                  { label: "CHROME_HITS 105.9", icon: <Music className="w-4 h-4" /> },
                  { label: "TURBO_BASS 88.1", icon: <Volume2 className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full px-4 py-3 text-left font-mono text-sm text-[#ff006e]/70 hover:text-[#ff006e] hover:bg-[#ff006e]/10 transition-all flex items-center gap-3 border-b border-[#ff006e]/10 last:border-b-0"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid Divider */}
      <div className="relative z-10 h-8 bg-[linear-gradient(90deg,transparent_49%,rgba(160,32,240,0.3)_49%,rgba(160,32,240,0.3)_51%,transparent_51%),linear-gradient(transparent_49%,rgba(255,107,53,0.2)_49%,rgba(255,107,53,0.2)_51%,transparent_51%)] bg-[size:40px_8px]" />

      {/* 14. Table - Arcade Leaderboard */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Leaderboard
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">High Score Table</p>
          <div className="border border-[#ff006e]/30 rounded-lg overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#ff006e]/20 to-[#a020f0]/20 border-b border-[#ff006e]/30">
                  <th className="px-6 py-3 text-left font-mono text-xs text-[#ff006e] tracking-widest uppercase">Rank</th>
                  <th className="px-6 py-3 text-left font-mono text-xs text-[#ff006e] tracking-widest uppercase">Player</th>
                  <th className="px-6 py-3 text-right font-mono text-xs text-[#ff006e] tracking-widest uppercase">Score</th>
                  <th className="px-6 py-3 text-right font-mono text-xs text-[#ff006e] tracking-widest uppercase">Level</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {[
                  { rank: "01", player: "NEON_RIDER", score: "9,999,800", level: "MAX" },
                  { rank: "02", player: "CHROME_ACE", score: "8,450,200", level: "98" },
                  { rank: "03", player: "SUNSET_KID", score: "7,120,500", level: "87" },
                  { rank: "04", player: "TURBO_WOLF", score: "5,880,100", level: "72" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#ff006e]/10 last:border-b-0 hover:bg-[#ff006e]/5 transition-colors">
                    <td className="px-6 py-3 text-[#ff6b35] font-bold">{row.rank}</td>
                    <td className="px-6 py-3 text-[#00d4ff]">{row.player}</td>
                    <td className="px-6 py-3 text-right text-[#ff006e]">{row.score}</td>
                    <td className="px-6 py-3 text-right text-[#a020f0]">{row.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 15. Blockquote */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Quote
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Synthwave Transmission</p>
          <blockquote className="border-l-4 border-gradient border-[#ff006e] pl-6 md:pl-8 py-2">
            <p className="text-xl md:text-2xl italic leading-relaxed text-[#00d4ff]/80 mb-4">
              &ldquo;We drove through the neon rain, chasing a sunset that never ended. The radio played forever, and the road stretched beyond the horizon of time.&rdquo;
            </p>
            <footer className="font-mono text-sm text-[#ff006e]/60 tracking-wider uppercase">
              -- Transmission from the Outrun, 1987
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 16. Rules Summary */}
      <section className="relative z-10 py-16 px-6 border-t border-[#ff006e]/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-2 text-center uppercase tracking-wider">
            Core Rules
          </h2>
          <p className="text-[#a020f0]/60 mb-10 text-center font-mono text-sm">Design Protocol</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#00d4ff]/30">
              <h3 className="text-lg font-bold text-[#00d4ff] mb-4 uppercase flex items-center gap-2">
                <Check className="w-5 h-5" /> Required
              </h3>
              <ul className="space-y-2 text-sm text-[#00d4ff]/70 font-mono">
                <li className="flex items-start gap-2"><span className="text-[#00d4ff]">+</span> Neon glow effects on UI elements</li>
                <li className="flex items-start gap-2"><span className="text-[#00d4ff]">+</span> Sunset gradients (pink to orange)</li>
                <li className="flex items-start gap-2"><span className="text-[#00d4ff]">+</span> Perspective grid lines</li>
                <li className="flex items-start gap-2"><span className="text-[#00d4ff]">+</span> Dark void background (#0a0a0a)</li>
                <li className="flex items-start gap-2"><span className="text-[#00d4ff]">+</span> Bold, uppercase typography</li>
                <li className="flex items-start gap-2"><span className="text-[#00d4ff]">+</span> Chrome/metallic accent details</li>
              </ul>
            </div>
            <div className="p-6 bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg border border-[#ff006e]/30">
              <h3 className="text-lg font-bold text-[#ff006e] mb-4 uppercase flex items-center gap-2">
                <X className="w-5 h-5" /> Forbidden
              </h3>
              <ul className="space-y-2 text-sm text-[#ff006e]/70 font-mono">
                <li className="flex items-start gap-2"><span className="text-[#ff006e]">-</span> Flat matte surfaces</li>
                <li className="flex items-start gap-2"><span className="text-[#ff006e]">-</span> Earthy or pastel tones</li>
                <li className="flex items-start gap-2"><span className="text-[#ff006e]">-</span> Serif body fonts</li>
                <li className="flex items-start gap-2"><span className="text-[#ff006e]">-</span> Light backgrounds</li>
                <li className="flex items-start gap-2"><span className="text-[#ff006e]">-</span> Subtle, understated effects</li>
                <li className="flex items-start gap-2"><span className="text-[#ff006e]">-</span> Natural organic shapes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 17. Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#ff006e]/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-[#ff006e]/40 tracking-widest">
            STYLEKIT // OUTRUN // v1.0
          </p>
          <Link
            href="/styles/outrun"
            className="font-mono text-xs text-[#ff006e] hover:text-[#ff006e]/80 transition-colors tracking-widest"
          >
            VIEW FULL DOCUMENTATION
          </Link>
        </div>
      </footer>
    </div>
  );
}
