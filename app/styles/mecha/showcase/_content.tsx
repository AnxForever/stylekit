"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  Crosshair,
  ChevronDown,
  Check,
  X,
  Info,
  ArrowLeft,
  Zap,
  Lock,
} from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  return (
    <div className="min-h-screen bg-[#1a2744] text-[#c8d6c3] relative overflow-hidden font-mono">
      {/* Tech grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(74,92,58,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(74,92,58,0.12)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Warning stripe top */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-[repeating-linear-gradient(90deg,#fbbf24,#fbbf24_20px,#1a2744_20px,#1a2744_40px)] z-20 pointer-events-none" />

      {/* 1. Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-[#4a5c3a] bg-[#1a2744]/95">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/mecha"
            className="flex items-center gap-2 text-[#4a5c3a] hover:text-[#fbbf24] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">BACK TO DOCS</span>
          </Link>
          <span className="font-bold text-xl text-[#fbbf24] uppercase tracking-[0.3em]">
            MECHA
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-[#4a5c3a] text-[#fbbf24] font-bold uppercase tracking-widest text-sm rounded-none shadow-[2px_2px_0px_rgba(251,191,36,0.3)] hover:border-[#fbbf24] hover:shadow-[4px_4px_0px_rgba(251,191,36,0.4)] transition-all"
          >
            ALL STYLES
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs text-[#4a5c3a] uppercase tracking-[0.3em] mb-6">
            {"// SYSTEM INITIALIZED -- ALL UNITS STANDBY"}
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-[#fbbf24] uppercase tracking-widest mb-4">
            MECHA
          </h1>
          <p className="text-lg text-[#4a5c3a] uppercase tracking-wider max-w-2xl mx-auto mb-10">
            ARMOR CLASS // OPERATIONAL STATUS: ACTIVE
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-[#fbbf24] text-[#1a2744] font-bold uppercase tracking-widest rounded-none border-2 border-[#1a2744] shadow-[4px_4px_0px_#1a2744] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a2744] transition-all duration-200 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              DEPLOY
            </button>
            <button className="px-10 py-4 bg-[#ef4444] text-white font-bold uppercase tracking-widest rounded-none border-2 border-[#ef4444] shadow-[4px_4px_0px_#fbbf24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#fbbf24] transition-all duration-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              ALERT
            </button>
          </div>
        </div>
      </section>

      {/* 3. Color Palette */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">DESIGNATION CODES</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            COLOR SYSTEM
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Navy", hex: "#1a2744", bg: "bg-[#1a2744]", border: true },
              { name: "Mil. Green", hex: "#4a5c3a", bg: "bg-[#4a5c3a]" },
              { name: "Warning Yellow", hex: "#fbbf24", bg: "bg-[#fbbf24]" },
              { name: "Danger Red", hex: "#ef4444", bg: "bg-[#ef4444]" },
              { name: "Steel Gray", hex: "#6b7d8e", bg: "bg-[#6b7d8e]" },
            ].map((color) => (
              <div key={color.name} className="border-2 border-[#4a5c3a] bg-[#1a2744] rounded-none shadow-[3px_3px_0px_rgba(251,191,36,0.2)]">
                <div className={`h-20 md:h-28 ${color.bg} ${color.border ? "border-b-2 border-[#4a5c3a]" : ""}`} />
                <div className="p-3 md:p-4 border-t-2 border-[#4a5c3a]">
                  <p className="text-xs md:text-sm text-[#fbbf24] font-bold uppercase">{color.name}</p>
                  <p className="text-xs text-[#4a5c3a]">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Typography */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">FONT MATRIX</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            TYPOGRAPHY
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-[#4a5c3a] p-6 rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
              <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">HEADING HIERARCHY</p>
              <h3 className="text-3xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-wider mb-3">H1 COMMAND</h3>
              <h4 className="text-2xl font-bold text-[#fbbf24] uppercase tracking-wider mb-3">H2 SUBSYSTEM</h4>
              <h5 className="text-xl font-bold text-[#fbbf24]/80 uppercase tracking-wider mb-3">H3 MODULE</h5>
              <h6 className="text-lg font-bold text-[#4a5c3a] uppercase tracking-wider">H4 PARAMETER</h6>
            </div>
            <div className="border-2 border-[#4a5c3a] p-6 rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
              <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">STENCIL WEIGHT</p>
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-bold text-[#fbbf24] uppercase tracking-[0.2em]">UPPERCASE BOLD</p>
                  <p className="text-xs text-[#4a5c3a]">font-mono / bold / uppercase / tracking-wide</p>
                </div>
                <div>
                  <p className="text-lg text-[#c8d6c3]">Mixed Case Regular</p>
                  <p className="text-xs text-[#4a5c3a]">font-mono / normal / mixed-case / body text</p>
                </div>
                <div>
                  <p className="text-sm text-[#4a5c3a] uppercase tracking-widest">LABEL SMALL CAPS</p>
                  <p className="text-xs text-[#4a5c3a]/60">font-mono / tracking-widest / labels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Buttons */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">INTERFACE ELEMENTS</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            CONTROLS
          </h2>
          <div className="border-2 border-[#4a5c3a] p-8 rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-[#fbbf24]" />
              <p className="text-xs font-bold text-[#4a5c3a] uppercase tracking-widest">BUTTON MATRIX</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#fbbf24] text-[#1a2744] font-bold uppercase tracking-widest rounded-none border-2 border-[#1a2744] shadow-[4px_4px_0px_#1a2744] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a2744] transition-all">
                PRIMARY
              </button>
              <button className="px-6 py-3 bg-[#4a5c3a] text-[#fbbf24] font-bold uppercase tracking-widest rounded-none border-2 border-[#fbbf24]/50 shadow-[4px_4px_0px_rgba(74,92,58,0.5)] hover:border-[#fbbf24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(74,92,58,0.5)] transition-all">
                SECONDARY
              </button>
              <button className="px-6 py-3 bg-[#ef4444] text-white font-bold uppercase tracking-widest rounded-none border-2 border-[#ef4444] shadow-[4px_4px_0px_#fbbf24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#fbbf24] transition-all">
                DANGER
              </button>
              <button className="px-6 py-3 bg-transparent text-[#4a5c3a] font-bold uppercase tracking-widest rounded-none border-2 border-[#4a5c3a] hover:text-[#fbbf24] hover:border-[#fbbf24] hover:shadow-[4px_4px_0px_rgba(251,191,36,0.3)] transition-all">
                GHOST
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Cards - HUD Panels */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">ARMOR MODULES</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            HUD PANELS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#1a2744] border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.3)] hover:shadow-[6px_6px_0px_rgba(251,191,36,0.4)] hover:border-[#fbbf24] hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-[#fbbf24]" />
                <span className="text-xs text-[#4a5c3a] uppercase tracking-widest">UNIT-01</span>
              </div>
              <div className="w-14 h-14 bg-[#4a5c3a]/30 border-2 border-[#4a5c3a] flex items-center justify-center mb-4 rounded-none">
                <Shield className="w-7 h-7 text-[#fbbf24]" />
              </div>
              <h3 className="text-xl font-bold text-[#fbbf24] uppercase mb-2">ARMOR</h3>
              <p className="text-[#4a5c3a] text-sm">Composite plating integrity at nominal levels. No breaches detected.</p>
              <div className="mt-4 pt-3 border-t-2 border-[#4a5c3a]/50">
                <span className="text-xs text-[#4a5c3a] uppercase tracking-widest">INTEGRITY: 98.7%</span>
              </div>
            </div>

            <div className="p-6 bg-[#1a2744] border-2 border-[#fbbf24]/50 rounded-none shadow-[4px_4px_0px_rgba(239,68,68,0.3)] hover:shadow-[6px_6px_0px_rgba(239,68,68,0.4)] hover:border-[#ef4444] hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-[#ef4444]" />
                <span className="text-xs text-[#ef4444] uppercase tracking-widest">WARNING</span>
              </div>
              <div className="w-14 h-14 bg-[#ef4444]/10 border-2 border-[#ef4444]/50 flex items-center justify-center mb-4 rounded-none">
                <AlertTriangle className="w-7 h-7 text-[#ef4444]" />
              </div>
              <h3 className="text-xl font-bold text-[#ef4444] uppercase mb-2">ALERT</h3>
              <p className="text-[#4a5c3a] text-sm">Perimeter sensors triggered. Unknown contact approaching sector 7.</p>
              <div className="mt-4 pt-3 border-t-2 border-[#ef4444]/30">
                <span className="text-xs text-[#ef4444] uppercase tracking-widest">THREAT: ELEVATED</span>
              </div>
            </div>

            <div className="p-6 bg-[#1a2744] border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(74,92,58,0.4)] hover:shadow-[6px_6px_0px_rgba(251,191,36,0.4)] hover:border-[#fbbf24] hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-[#4a5c3a]" />
                <span className="text-xs text-[#4a5c3a] uppercase tracking-widest">UNIT-03</span>
              </div>
              <div className="w-14 h-14 bg-[#4a5c3a]/30 border-2 border-[#4a5c3a] flex items-center justify-center mb-4 rounded-none">
                <Crosshair className="w-7 h-7 text-[#4a5c3a]" />
              </div>
              <h3 className="text-xl font-bold text-[#fbbf24] uppercase mb-2">TARGETING</h3>
              <p className="text-[#4a5c3a] text-sm">Fire control system locked. Tracking three hostile contacts on radar.</p>
              <div className="mt-4 pt-3 border-t-2 border-[#4a5c3a]/50">
                <span className="text-xs text-[#4a5c3a] uppercase tracking-widest">LOCK: ENGAGED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Form - Terminal Input */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-md mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4 text-center">COMMAND INPUT</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12 text-center">
            TERMINAL
          </h2>
          <div className="p-8 bg-[#1a2744] border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.3)]">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#4a5c3a]/20 border-2 border-[#4a5c3a] flex items-center justify-center mb-4 rounded-none">
                <Lock className="w-8 h-8 text-[#fbbf24]" />
              </div>
              <h3 className="text-xl font-bold text-[#fbbf24] uppercase tracking-widest">ACCESS</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4a5c3a] uppercase tracking-widest mb-2">OPERATOR ID</label>
                <input
                  type="text"
                  placeholder="ENTER ID..."
                  className="w-full px-4 py-3 bg-[#1a2744]/80 border-2 border-[#4a5c3a] rounded-none text-[#fbbf24] placeholder-[#4a5c3a]/60 focus:border-[#fbbf24] focus:shadow-[0_0_8px_rgba(251,191,36,0.4)] focus:outline-none transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#ef4444] uppercase tracking-widest mb-2">AUTH CODE</label>
                <input
                  type="password"
                  placeholder="ENTER CODE..."
                  className="w-full px-4 py-3 bg-[#1a2744]/80 border-2 border-[#ef4444]/50 rounded-none text-[#ef4444] placeholder-[#ef4444]/40 focus:border-[#ef4444] focus:shadow-[0_0_8px_rgba(239,68,68,0.4)] focus:outline-none transition-all font-mono"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#fbbf24] text-[#1a2744] font-bold uppercase tracking-widest rounded-none border-2 border-[#1a2744] shadow-[4px_4px_0px_#1a2744] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a2744] transition-all">
                AUTHENTICATE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Tabs - Systems / Weapons / Comms */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">SUBSYSTEM PANELS</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            TAB SYSTEM
          </h2>
          <div className="border-2 border-[#4a5c3a] rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
            <div className="flex border-b-2 border-[#4a5c3a]">
              {["SYSTEMS", "WEAPONS", "COMMS"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 text-xs md:text-sm tracking-widest py-4 font-bold uppercase transition-all ${
                    activeTab === i
                      ? "bg-[#fbbf24] text-[#1a2744]"
                      : "text-[#4a5c3a] hover:text-[#fbbf24] hover:bg-[#4a5c3a]/20"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 text-sm min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <p className="text-[#fbbf24] font-bold mb-3">&gt; CORE SYSTEMS DIAGNOSTIC</p>
                  <div className="space-y-2 text-[#4a5c3a]">
                    <p>Reactor Output .......... 94.2% nominal</p>
                    <p>Hydraulic Pressure ...... 3200 PSI</p>
                    <p>Neural Link ............. SYNCHRONIZED</p>
                    <p>Life Support ............ ACTIVE</p>
                  </div>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <p className="text-[#ef4444] font-bold mb-3">&gt; WEAPONS LOADOUT</p>
                  <div className="space-y-2 text-[#4a5c3a]">
                    <p>Beam Rifle .............. 78 ROUNDS</p>
                    <p>Missile Pods ............ 12/12 LOADED</p>
                    <p>Heat Saber .............. CHARGED</p>
                    <p>Shield Generator ........ STANDBY</p>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <p className="text-[#4a5c3a] font-bold mb-3">&gt; COMMUNICATIONS ARRAY</p>
                  <div className="space-y-2 text-[#4a5c3a]">
                    <p>Encrypted Channel ....... FREQ 441.7 MHz</p>
                    <p>Squad Link .............. 4 UNITS ONLINE</p>
                    <p>HQ Uplink ............... LATENCY 12ms</p>
                    <p>EW Countermeasures ...... ACTIVE</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Deployment Badges */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">INSIGNIA TYPES</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            DEPLOYMENT BADGES
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">RANK BADGES</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-[#fbbf24] text-[#1a2744] text-xs font-bold uppercase tracking-widest rounded-none">COMMANDER</span>
                <span className="px-4 py-1.5 bg-[#4a5c3a] text-[#fbbf24] text-xs font-bold uppercase tracking-widest rounded-none">LIEUTENANT</span>
                <span className="px-4 py-1.5 bg-[#ef4444] text-white text-xs font-bold uppercase tracking-widest rounded-none">SPECIALIST</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">STATUS PATCHES</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 border-2 border-[#fbbf24] text-[#fbbf24] text-xs font-bold uppercase tracking-widest rounded-none">ACTIVE DUTY</span>
                <span className="px-4 py-1.5 border-2 border-[#4a5c3a] text-[#4a5c3a] text-xs font-bold uppercase tracking-widest rounded-none">RESERVE</span>
                <span className="px-4 py-1.5 border-2 border-[#ef4444] text-[#ef4444] text-xs font-bold uppercase tracking-widest rounded-none">SORTIE</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">CLASSIFICATION TAGS</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-[#fbbf24]/10 text-[#fbbf24] border-2 border-[#fbbf24]/50 text-xs font-bold uppercase tracking-widest rounded-none shadow-[0_0_8px_rgba(251,191,36,0.3)]">TOP SECRET</span>
                <span className="px-4 py-1.5 bg-[#ef4444]/10 text-[#ef4444] border-2 border-[#ef4444]/50 text-xs font-bold uppercase tracking-widest rounded-none shadow-[0_0_8px_rgba(239,68,68,0.3)]">CLASSIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Progress Bars */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">UNIT READOUTS</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            SYSTEM STATUS
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#4a5c3a] uppercase tracking-widest">HP</span>
                <span className="text-[#4a5c3a] font-bold">87%</span>
              </div>
              <div className="h-4 bg-[#4a5c3a]/20 border-2 border-[#4a5c3a] rounded-none">
                <div className="h-full w-[87%] bg-[#4a5c3a]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#fbbf24] uppercase tracking-widest">SHIELD</span>
                <span className="text-[#fbbf24] font-bold">62%</span>
              </div>
              <div className="h-4 bg-[#fbbf24]/10 border-2 border-[#fbbf24]/50 rounded-none">
                <div className="h-full w-[62%] bg-[#fbbf24]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#ef4444] uppercase tracking-widest">ENERGY</span>
                <span className="text-[#ef4444] font-bold">34%</span>
              </div>
              <div className="h-4 bg-[#ef4444]/10 border-2 border-[#ef4444]/50 rounded-none">
                <div className="h-full w-[34%] bg-[#ef4444]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Alerts */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">SYSTEM NOTIFICATIONS</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            ALERTS
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border-2 border-[#4a5c3a] bg-[#4a5c3a]/10 rounded-none">
              <Check className="w-5 h-5 text-[#4a5c3a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#4a5c3a] font-bold uppercase">SYSTEM OK</p>
                <p className="text-xs text-[#4a5c3a]/80 mt-1">All systems nominal. No maintenance required.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-[#fbbf24] bg-[#fbbf24]/10 rounded-none">
              <AlertTriangle className="w-5 h-5 text-[#fbbf24] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#fbbf24] font-bold uppercase">CAUTION</p>
                <p className="text-xs text-[#fbbf24]/80 mt-1">Reactor temperature approaching upper threshold. Monitor closely.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-[#ef4444] bg-[#ef4444]/10 rounded-none">
              <X className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#ef4444] font-bold uppercase">CRITICAL</p>
                <p className="text-xs text-[#ef4444]/80 mt-1">Hull breach in sector 4. Immediate repair required.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-[#6b7d8e] bg-[#6b7d8e]/10 rounded-none">
              <Info className="w-5 h-5 text-[#6b7d8e] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-[#6b7d8e] font-bold uppercase">INFORMATION</p>
                <p className="text-xs text-[#6b7d8e]/80 mt-1">Firmware update v3.7.2 available. Schedule maintenance window.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Toggle Controls */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">COCKPIT SWITCHES</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            TOGGLE CONTROLS
          </h2>
          <div className="border-2 border-[#4a5c3a] p-8 rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
            <div className="space-y-6">
              {["POWER", "COMMS", "RADAR"].map((label, i) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 ${toggleStates[i] ? "bg-[#fbbf24]" : "bg-[#ef4444]"}`} />
                    <span className="text-sm font-bold text-[#fbbf24] uppercase tracking-widest">{label}</span>
                    <span className="text-xs text-[#4a5c3a] uppercase">{toggleStates[i] ? "ONLINE" : "OFFLINE"}</span>
                  </div>
                  <button
                    role="switch"
                    aria-checked={toggleStates[i]}
                    aria-label={label}
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[i] = !newStates[i];
                      setToggleStates(newStates);
                    }}
                    className={`w-16 h-8 border-2 rounded-none transition-all relative ${
                      toggleStates[i]
                        ? "bg-[#fbbf24] border-[#fbbf24] shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                        : "bg-[#1a2744] border-[#4a5c3a]"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 transition-all ${
                        toggleStates[i]
                          ? "bg-[#1a2744] left-[calc(100%-24px)]"
                          : "bg-[#4a5c3a] left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. Dropdown - Mission Selector */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-md mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4 text-center">MISSION SELECT</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12 text-center">
            DROPDOWN
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border-2 border-[#4a5c3a] bg-[#1a2744] text-sm text-[#fbbf24] font-bold uppercase tracking-widest hover:border-[#fbbf24] transition-all rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]"
            >
              <span>SELECT MISSION</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 border-2 border-[#4a5c3a] bg-[#1a2744] z-10 shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
                {["OPERATION IRONCLAD", "OPERATION FIRESTORM", "OPERATION NIGHTFALL", "OPERATION SENTINEL"].map((opt) => (
                  <button
                    key={opt}
                    className="w-full px-4 py-3 text-left text-sm text-[#4a5c3a] font-bold uppercase tracking-wider hover:text-[#fbbf24] hover:bg-[#4a5c3a]/20 transition-all border-b border-[#4a5c3a]/30 last:border-b-0"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 14. Diagnostics Table */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">MAINTENANCE LOG</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            DIAGNOSTICS TABLE
          </h2>
          <div className="border-2 border-[#4a5c3a] overflow-hidden rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
            <table className="w-full">
              <thead>
                <tr className="bg-[#4a5c3a]/20 border-b-2 border-[#4a5c3a]">
                  <th className="px-4 py-3 text-left text-xs text-[#fbbf24] tracking-widest uppercase font-bold">UNIT</th>
                  <th className="px-4 py-3 text-left text-xs text-[#fbbf24] tracking-widest uppercase font-bold">STATUS</th>
                  <th className="px-4 py-3 text-left text-xs text-[#fbbf24] tracking-widest uppercase font-bold">POWER</th>
                  <th className="px-4 py-3 text-left text-xs text-[#fbbf24] tracking-widest uppercase font-bold">UPTIME</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { unit: "ALPHA-01", status: "ONLINE", statusColor: "text-[#4a5c3a]", dotColor: "bg-[#4a5c3a]", power: "94.2%", uptime: "847h" },
                  { unit: "BRAVO-02", status: "STANDBY", statusColor: "text-[#fbbf24]", dotColor: "bg-[#fbbf24]", power: "78.1%", uptime: "623h" },
                  { unit: "CHARLIE-03", status: "OFFLINE", statusColor: "text-[#ef4444]", dotColor: "bg-[#ef4444]", power: "--", uptime: "0h" },
                  { unit: "DELTA-04", status: "ONLINE", statusColor: "text-[#4a5c3a]", dotColor: "bg-[#4a5c3a]", power: "99.8%", uptime: "1204h" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[#4a5c3a]/30 last:border-b-0 hover:bg-[#4a5c3a]/10 transition-colors">
                    <td className="px-4 py-3 text-[#fbbf24] font-bold">{row.unit}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 ${row.dotColor}`} />
                        <span className={`${row.statusColor} font-bold uppercase`}>{row.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#4a5c3a]">{row.power}</td>
                    <td className="px-4 py-3 text-[#4a5c3a]">{row.uptime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 15. Blockquote - Mission Briefing */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">MISSION BRIEFING</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            BRIEFING QUOTE
          </h2>
          <div className="border-2 border-[#4a5c3a] p-6 rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
            <p className="text-xs text-[#ef4444] font-bold uppercase tracking-widest mb-4">
              {"// CLASSIFIED - LEVEL 3"}
            </p>
            <blockquote className="border-l-4 border-[#fbbf24] pl-6">
              <p className="text-base md:text-lg text-[#c8d6c3] leading-relaxed mb-4">
                &ldquo;All units proceed to grid reference TANGO-447. Expect heavy resistance.
                Maintain radio silence until phase-line BRAVO. The mission is the machine.
                The machine is the mission.&rdquo;
              </p>
              <footer className="text-sm text-[#4a5c3a]">
                <span className="uppercase tracking-widest">-- CDR. TANAKA // 3RD MECHA DIVISION</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 16. Rules Summary */}
      <section className="relative z-10 py-16 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-[#4a5c3a] uppercase tracking-widest mb-4">DESIGN PROTOCOL</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#fbbf24] uppercase tracking-widest mb-8 md:mb-12">
            CORE RULES
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-[#4a5c3a] p-6 rounded-none shadow-[4px_4px_0px_rgba(251,191,36,0.2)]">
              <h3 className="text-lg font-bold text-[#fbbf24] uppercase mb-4 tracking-widest">REQUIRED</h3>
              <ul className="space-y-2 text-sm text-[#4a5c3a]">
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" /><span>Monospace typography throughout</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" /><span>Uppercase labels, tracking-widest</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" /><span>Warning stripes and hazard patterns</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" /><span>Hard shadows (shadow-[4px_4px_0px])</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" /><span>Angular forms, rounded-none</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" /><span>Thick borders (border-2)</span></li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" /><span>Military color palette</span></li>
              </ul>
            </div>
            <div className="border-2 border-[#ef4444]/50 p-6 rounded-none shadow-[4px_4px_0px_rgba(239,68,68,0.2)]">
              <h3 className="text-lg font-bold text-[#ef4444] uppercase mb-4 tracking-widest">FORBIDDEN</h3>
              <ul className="space-y-2 text-sm text-[#4a5c3a]">
                <li className="flex gap-2"><X className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" /><span>Rounded corners (border-radius)</span></li>
                <li className="flex gap-2"><X className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" /><span>Pastel or light color palettes</span></li>
                <li className="flex gap-2"><X className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" /><span>Cursive or decorative fonts</span></li>
                <li className="flex gap-2"><X className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" /><span>Soft drop shadows</span></li>
                <li className="flex gap-2"><X className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" /><span>Gradients or glass effects</span></li>
                <li className="flex gap-2"><X className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" /><span>Organic or flowing shapes</span></li>
                <li className="flex gap-2"><X className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" /><span>Serif body text</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 17. Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-[#4a5c3a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#4a5c3a]/60 uppercase tracking-widest">
            STYLEKIT // MECHA // v1.0.0
          </p>
          <Link
            href="/styles/mecha"
            className="text-xs text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors uppercase tracking-widest"
          >
            VIEW FULL DOCUMENTATION
          </Link>
        </div>
      </footer>
    </div>
  );
}
