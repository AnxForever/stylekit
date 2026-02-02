"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Terminal, Shield, Cpu, AlertTriangle, Check, X, ChevronDown, ChevronRight, User, Database, Activity } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);
  const [radioValue, setRadioValue] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Scanlines Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-cyan-400/30 bg-[#0a0a0f]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link
            href="/styles/cyberpunk-neon"
            className="font-mono text-cyan-400 text-sm md:text-base tracking-widest hover:text-cyan-300 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">BACK</span>
          </Link>
          <div className="font-mono text-cyan-400 text-xs md:text-sm tracking-[0.3em] uppercase">
            Cyberpunk Neon
          </div>
          <Link
            href="/styles"
            className="font-mono text-cyan-400/60 text-sm hover:text-cyan-400 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-4 md:px-8 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block px-3 py-1 border border-cyan-400/50 text-cyan-400 font-mono text-xs tracking-widest mb-6">
            STYLE://CYBERPUNK
          </div>
          <h1 className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">CYBER</span>
            <br />
            <span className="text-fuchsia-500 drop-shadow-[0_0_20px_rgba(255,0,255,0.5)]">PUNK</span>
            <span className="text-white">.NEON</span>
          </h1>
          <p className="font-mono text-gray-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            High-tech futuristic aesthetic. Neon glows, dark backgrounds,
            scan lines, and terminal-style typography.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="font-mono px-6 py-3 bg-cyan-400 text-black font-bold tracking-wider hover:bg-cyan-300 transition-colors shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]">
              INITIALIZE
            </button>
            <button className="font-mono px-6 py-3 border border-cyan-400 text-cyan-400 tracking-wider hover:bg-cyan-400/10 transition-colors">
              VIEW DOCS
            </button>
          </div>
        </div>
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // COLOR_SYSTEM
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Neon Cyan", hex: "#00FFFF", bg: "bg-cyan-400", glow: "shadow-[0_0_20px_rgba(0,255,255,0.5)]" },
              { name: "Hot Pink", hex: "#FF00FF", bg: "bg-fuchsia-500", glow: "shadow-[0_0_20px_rgba(255,0,255,0.5)]" },
              { name: "Electric Blue", hex: "#0066FF", bg: "bg-blue-500", glow: "shadow-[0_0_20px_rgba(0,102,255,0.5)]" },
              { name: "Warning", hex: "#FF3366", bg: "bg-rose-500", glow: "shadow-[0_0_20px_rgba(255,51,102,0.5)]" },
              { name: "Void Black", hex: "#0A0A0F", bg: "bg-[#0a0a0f]", glow: "border border-cyan-400/30" },
            ].map((color) => (
              <div key={color.name} className="border border-cyan-400/30 bg-[#0a0a0f]">
                <div className={`h-20 md:h-28 ${color.bg} ${color.glow}`} />
                <div className="p-3 md:p-4 border-t border-cyan-400/30">
                  <p className="font-mono text-xs md:text-sm text-cyan-400">{color.name}</p>
                  <p className="font-mono text-xs text-gray-500">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-fuchsia-500">
            // BUTTONS
          </h2>
          <div className="space-y-8">
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">VARIANTS</p>
              <div className="flex flex-wrap gap-4">
                <button className="font-mono px-6 py-3 bg-cyan-400 text-black font-bold tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                  PRIMARY
                </button>
                <button className="font-mono px-6 py-3 border border-cyan-400 text-cyan-400 tracking-wider hover:bg-cyan-400/10 transition-all">
                  SECONDARY
                </button>
                <button className="font-mono px-6 py-3 bg-fuchsia-500 text-white font-bold tracking-wider hover:bg-fuchsia-400 transition-all shadow-[0_0_20px_rgba(255,0,255,0.5)]">
                  ACCENT
                </button>
                <button className="font-mono px-6 py-3 border border-rose-500 text-rose-500 tracking-wider hover:bg-rose-500/10 transition-all">
                  DANGER
                </button>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">WITH ICONS</p>
              <div className="flex flex-wrap gap-4">
                <button className="font-mono px-6 py-3 bg-cyan-400 text-black font-bold tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,255,255,0.5)] flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  POWER
                </button>
                <button className="font-mono px-6 py-3 border border-cyan-400 text-cyan-400 tracking-wider hover:bg-cyan-400/10 transition-all flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  TERMINAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // DATA_CARDS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-cyan-400/30 bg-[#0a0a0f] p-6 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all group">
              <div className="w-12 h-12 border border-cyan-400 flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-mono text-lg font-bold text-white mb-2">SECURITY.SYS</h3>
              <p className="font-mono text-sm text-gray-500 leading-relaxed">
                Advanced encryption protocols with quantum-resistant algorithms.
              </p>
              <div className="mt-4 pt-4 border-t border-cyan-400/20">
                <span className="font-mono text-xs text-cyan-400 tracking-widest">STATUS: ACTIVE</span>
              </div>
            </div>
            <div className="border border-fuchsia-500/30 bg-[#0a0a0f] p-6 hover:border-fuchsia-500 hover:shadow-[0_0_30px_rgba(255,0,255,0.2)] transition-all group">
              <div className="w-12 h-12 border border-fuchsia-500 flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] transition-all">
                <Cpu className="w-6 h-6 text-fuchsia-500" />
              </div>
              <h3 className="font-mono text-lg font-bold text-white mb-2">NEURAL.NET</h3>
              <p className="font-mono text-sm text-gray-500 leading-relaxed">
                Deep learning networks for pattern recognition and prediction.
              </p>
              <div className="mt-4 pt-4 border-t border-fuchsia-500/20">
                <span className="font-mono text-xs text-fuchsia-500 tracking-widest">STATUS: SYNCING</span>
              </div>
            </div>
            <div className="border border-blue-500/30 bg-[#0a0a0f] p-6 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(0,102,255,0.2)] transition-all group">
              <div className="w-12 h-12 border border-blue-500 flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(0,102,255,0.5)] transition-all">
                <Terminal className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-mono text-lg font-bold text-white mb-2">COMMAND.IO</h3>
              <p className="font-mono text-sm text-gray-500 leading-relaxed">
                Terminal interface for direct system manipulation and control.
              </p>
              <div className="mt-4 pt-4 border-t border-blue-500/20">
                <span className="font-mono text-xs text-blue-500 tracking-widest">STATUS: READY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-fuchsia-500">
            // INPUT_FIELDS
          </h2>
          <div className="space-y-6">
            <div>
              <label className="font-mono text-xs text-gray-500 mb-2 block tracking-widest">USERNAME</label>
              <input
                type="text"
                placeholder="Enter username..."
                className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 font-mono text-cyan-400 placeholder:text-gray-600 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-500 mb-2 block tracking-widest">PASSWORD</label>
              <input
                type="password"
                placeholder="Enter password..."
                className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 font-mono text-cyan-400 placeholder:text-gray-600 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-500 mb-2 block tracking-widest">MESSAGE</label>
              <textarea
                placeholder="Enter message..."
                rows={4}
                className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 font-mono text-cyan-400 placeholder:text-gray-600 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all resize-none"
              />
            </div>
            <button className="w-full font-mono px-6 py-3 bg-cyan-400 text-black font-bold tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,255,255,0.5)]">
              TRANSMIT
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // TAB_SYSTEM
          </h2>
          <div className="border border-cyan-400/30">
            <div className="flex border-b border-cyan-400/30">
              {["OVERVIEW", "METRICS", "SETTINGS"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 font-mono text-xs md:text-sm tracking-widest py-4 transition-all ${
                    activeTab === i
                      ? "bg-cyan-400 text-black"
                      : "text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-400/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 font-mono text-sm text-gray-400">
              {activeTab === 0 && (
                <div>
                  <p className="text-cyan-400 mb-2">&gt; SYSTEM STATUS: ONLINE</p>
                  <p>All systems operational. Neural networks synchronized.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <p className="text-fuchsia-500 mb-2">&gt; PERFORMANCE METRICS</p>
                  <p>CPU: 87% | RAM: 12.4GB | NETWORK: 1.2Gbps</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <p className="text-blue-500 mb-2">&gt; CONFIGURATION</p>
                  <p>Modify system parameters and access controls.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Badges & Tags */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-fuchsia-500">
            // BADGES
          </h2>
          <div className="space-y-6">
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">STATUS BADGES</p>
              <div className="flex flex-wrap gap-3">
                <span className="font-mono text-xs px-3 py-1 bg-cyan-400 text-black tracking-widest">ACTIVE</span>
                <span className="font-mono text-xs px-3 py-1 bg-fuchsia-500 text-white tracking-widest">SYNCING</span>
                <span className="font-mono text-xs px-3 py-1 bg-green-500 text-black tracking-widest">ONLINE</span>
                <span className="font-mono text-xs px-3 py-1 bg-rose-500 text-white tracking-widest">ERROR</span>
                <span className="font-mono text-xs px-3 py-1 bg-amber-500 text-black tracking-widest">WARNING</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">OUTLINE BADGES</p>
              <div className="flex flex-wrap gap-3">
                <span className="font-mono text-xs px-3 py-1 border border-cyan-400 text-cyan-400 tracking-widest">v2.0.1</span>
                <span className="font-mono text-xs px-3 py-1 border border-fuchsia-500 text-fuchsia-500 tracking-widest">BETA</span>
                <span className="font-mono text-xs px-3 py-1 border border-blue-500 text-blue-500 tracking-widest">PRO</span>
                <span className="font-mono text-xs px-3 py-1 border border-green-500 text-green-500 tracking-widest">NEW</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">GLOW BADGES</p>
              <div className="flex flex-wrap gap-3">
                <span className="font-mono text-xs px-3 py-1 bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,255,255,0.3)] tracking-widest">QUANTUM</span>
                <span className="font-mono text-xs px-3 py-1 bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50 shadow-[0_0_10px_rgba(255,0,255,0.3)] tracking-widest">NEURAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bars */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // PROGRESS
          </h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between font-mono text-xs text-gray-500 mb-2">
                <span>DOWNLOAD.SYS</span>
                <span>78%</span>
              </div>
              <div className="h-2 bg-cyan-400/20 border border-cyan-400/30">
                <div className="h-full w-[78%] bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono text-xs text-gray-500 mb-2">
                <span>NEURAL.SYNC</span>
                <span>45%</span>
              </div>
              <div className="h-2 bg-fuchsia-500/20 border border-fuchsia-500/30">
                <div className="h-full w-[45%] bg-fuchsia-500 shadow-[0_0_10px_rgba(255,0,255,0.5)]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono text-xs text-gray-500 mb-2">
                <span>MEMORY.ALLOC</span>
                <span>92%</span>
              </div>
              <div className="h-2 bg-rose-500/20 border border-rose-500/30">
                <div className="h-full w-[92%] bg-rose-500 shadow-[0_0_10px_rgba(255,51,102,0.5)]" />
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">LOADING ANIMATION</p>
              <div className="h-1 bg-cyan-400/20 overflow-hidden">
                <div className="h-full w-1/3 bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)] animate-[shimmer_1.5s_infinite]"
                  style={{ animation: "shimmer 1.5s ease-in-out infinite" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-fuchsia-500">
            // ALERTS
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-cyan-400/50 bg-cyan-400/10">
              <Terminal className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-mono text-sm text-cyan-400 font-bold mb-1">SYSTEM MESSAGE</p>
                <p className="font-mono text-xs text-gray-400">All systems operating within normal parameters.</p>
              </div>
              <button className="text-cyan-400/60 hover:text-cyan-400"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-start gap-4 p-4 border border-green-500/50 bg-green-500/10">
              <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-mono text-sm text-green-500 font-bold mb-1">SUCCESS</p>
                <p className="font-mono text-xs text-gray-400">Neural network synchronization complete.</p>
              </div>
              <button className="text-green-500/60 hover:text-green-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-start gap-4 p-4 border border-amber-500/50 bg-amber-500/10">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-mono text-sm text-amber-500 font-bold mb-1">WARNING</p>
                <p className="font-mono text-xs text-gray-400">Memory usage exceeding recommended threshold.</p>
              </div>
              <button className="text-amber-500/60 hover:text-amber-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-start gap-4 p-4 border border-rose-500/50 bg-rose-500/10">
              <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-mono text-sm text-rose-500 font-bold mb-1">ERROR</p>
                <p className="font-mono text-xs text-gray-400">Connection to remote server failed. Retry in 30s.</p>
              </div>
              <button className="text-rose-500/60 hover:text-rose-500"><X className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Toggle, Checkbox, Radio */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // CONTROLS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Toggles */}
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">TOGGLES</p>
              <div className="space-y-4">
                {["DARK_MODE", "NOTIFICATIONS", "AUTO_SYNC"].map((label, i) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-400">{label}</span>
                    <button
                      onClick={() => {
                        const newStates = [...toggleStates];
                        newStates[i] = !newStates[i];
                        setToggleStates(newStates);
                      }}
                      className={`w-12 h-6 border transition-all ${
                        toggleStates[i]
                          ? "bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                          : "bg-transparent border-gray-600"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-black transition-transform ${toggleStates[i] ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Checkboxes */}
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">CHECKBOXES</p>
              <div className="space-y-4">
                {["ENCRYPT_DATA", "BACKUP_AUTO", "LOG_EVENTS"].map((label, i) => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => {
                        const newStates = [...checkboxStates];
                        newStates[i] = !newStates[i];
                        setCheckboxStates(newStates);
                      }}
                      className={`w-5 h-5 border flex items-center justify-center transition-all ${
                        checkboxStates[i]
                          ? "bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                          : "border-gray-600 group-hover:border-cyan-400/50"
                      }`}
                    >
                      {checkboxStates[i] && <Check className="w-3 h-3 text-black" />}
                    </div>
                    <span className="font-mono text-xs text-gray-400">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Radio */}
            <div>
              <p className="font-mono text-xs text-gray-500 mb-4 tracking-widest">RADIO</p>
              <div className="space-y-4">
                {["STANDARD", "ENHANCED", "QUANTUM"].map((label, i) => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer group">
                    <div
                      onClick={() => setRadioValue(i)}
                      className={`w-5 h-5 border flex items-center justify-center transition-all ${
                        radioValue === i
                          ? "border-fuchsia-500 shadow-[0_0_10px_rgba(255,0,255,0.5)]"
                          : "border-gray-600 group-hover:border-fuchsia-500/50"
                      }`}
                    >
                      {radioValue === i && <div className="w-2.5 h-2.5 bg-fuchsia-500" />}
                    </div>
                    <span className="font-mono text-xs text-gray-400">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
        <div className="max-w-md mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-fuchsia-500">
            // DROPDOWN
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border border-cyan-400/30 bg-transparent font-mono text-sm text-cyan-400 hover:border-cyan-400 transition-all"
            >
              <span>SELECT_PROTOCOL</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 border border-cyan-400/30 bg-[#0a0a0f] z-10">
                {["PROTOCOL_ALPHA", "PROTOCOL_BETA", "PROTOCOL_GAMMA"].map((opt) => (
                  <button
                    key={opt}
                    className="w-full px-4 py-3 text-left font-mono text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
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

      {/* Table */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // DATA_TABLE
          </h2>
          <div className="border border-cyan-400/30 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-cyan-400/10 border-b border-cyan-400/30">
                  <th className="px-4 py-3 text-left font-mono text-xs text-cyan-400 tracking-widest">NODE_ID</th>
                  <th className="px-4 py-3 text-left font-mono text-xs text-cyan-400 tracking-widest">STATUS</th>
                  <th className="px-4 py-3 text-left font-mono text-xs text-cyan-400 tracking-widest">LATENCY</th>
                  <th className="px-4 py-3 text-left font-mono text-xs text-cyan-400 tracking-widest">UPTIME</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                <tr className="border-b border-cyan-400/20 hover:bg-cyan-400/5 transition-colors">
                  <td className="px-4 py-3 text-gray-400">NODE_001</td>
                  <td className="px-4 py-3"><span className="text-green-500">ONLINE</span></td>
                  <td className="px-4 py-3 text-gray-400">12ms</td>
                  <td className="px-4 py-3 text-gray-400">99.9%</td>
                </tr>
                <tr className="border-b border-cyan-400/20 hover:bg-cyan-400/5 transition-colors">
                  <td className="px-4 py-3 text-gray-400">NODE_002</td>
                  <td className="px-4 py-3"><span className="text-fuchsia-500">SYNCING</span></td>
                  <td className="px-4 py-3 text-gray-400">28ms</td>
                  <td className="px-4 py-3 text-gray-400">98.7%</td>
                </tr>
                <tr className="border-b border-cyan-400/20 hover:bg-cyan-400/5 transition-colors">
                  <td className="px-4 py-3 text-gray-400">NODE_003</td>
                  <td className="px-4 py-3"><span className="text-rose-500">OFFLINE</span></td>
                  <td className="px-4 py-3 text-gray-400">--</td>
                  <td className="px-4 py-3 text-gray-400">87.2%</td>
                </tr>
                <tr className="hover:bg-cyan-400/5 transition-colors">
                  <td className="px-4 py-3 text-gray-400">NODE_004</td>
                  <td className="px-4 py-3"><span className="text-green-500">ONLINE</span></td>
                  <td className="px-4 py-3 text-gray-400">8ms</td>
                  <td className="px-4 py-3 text-gray-400">99.99%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-fuchsia-500">
            // STATISTICS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-cyan-400/30 p-6 text-center hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all">
              <User className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
              <div className="font-mono text-3xl font-bold text-cyan-400 mb-1">12.4K</div>
              <div className="font-mono text-xs text-gray-500 tracking-widest">USERS</div>
            </div>
            <div className="border border-fuchsia-500/30 p-6 text-center hover:border-fuchsia-500 hover:shadow-[0_0_20px_rgba(255,0,255,0.2)] transition-all">
              <Database className="w-6 h-6 text-fuchsia-500 mx-auto mb-3" />
              <div className="font-mono text-3xl font-bold text-fuchsia-500 mb-1">847TB</div>
              <div className="font-mono text-xs text-gray-500 tracking-widest">DATA</div>
            </div>
            <div className="border border-blue-500/30 p-6 text-center hover:border-blue-500 hover:shadow-[0_0_20px_rgba(0,102,255,0.2)] transition-all">
              <Activity className="w-6 h-6 text-blue-500 mx-auto mb-3" />
              <div className="font-mono text-3xl font-bold text-blue-500 mb-1">99.9%</div>
              <div className="font-mono text-xs text-gray-500 tracking-widest">UPTIME</div>
            </div>
            <div className="border border-green-500/30 p-6 text-center hover:border-green-500 hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] transition-all">
              <Zap className="w-6 h-6 text-green-500 mx-auto mb-3" />
              <div className="font-mono text-3xl font-bold text-green-500 mb-1">4.2ms</div>
              <div className="font-mono text-xs text-gray-500 tracking-widest">LATENCY</div>
            </div>
          </div>
        </div>
      </section>

      {/* Avatar */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // AVATARS
          </h2>
          <div className="flex flex-wrap items-end gap-6">
            <div className="w-16 h-16 border border-cyan-400 flex items-center justify-center bg-cyan-400/20 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              <span className="font-mono text-xl font-bold text-cyan-400">NK</span>
            </div>
            <div className="w-12 h-12 border border-fuchsia-500 flex items-center justify-center bg-fuchsia-500/20 shadow-[0_0_15px_rgba(255,0,255,0.3)]">
              <span className="font-mono text-sm font-bold text-fuchsia-500">CP</span>
            </div>
            <div className="w-10 h-10 border border-blue-500 flex items-center justify-center bg-blue-500/20 shadow-[0_0_15px_rgba(0,102,255,0.3)]">
              <span className="font-mono text-xs font-bold text-blue-500">AI</span>
            </div>
            <div className="flex -space-x-3">
              <div className="w-10 h-10 border-2 border-[#0a0a0f] bg-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <span className="font-mono text-xs font-bold text-black">01</span>
              </div>
              <div className="w-10 h-10 border-2 border-[#0a0a0f] bg-fuchsia-500 flex items-center justify-center shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                <span className="font-mono text-xs font-bold text-white">02</span>
              </div>
              <div className="w-10 h-10 border-2 border-[#0a0a0f] bg-blue-500 flex items-center justify-center shadow-[0_0_10px_rgba(0,102,255,0.5)]">
                <span className="font-mono text-xs font-bold text-white">03</span>
              </div>
              <div className="w-10 h-10 border-2 border-[#0a0a0f] bg-gray-800 flex items-center justify-center">
                <span className="font-mono text-xs text-gray-400">+5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-cyan-400/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-cyan-400">
            // CORE_RULES
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-cyan-400/30 p-6">
              <h3 className="font-mono text-lg font-bold text-cyan-400 mb-4">REQUIRED</h3>
              <ul className="font-mono text-sm text-gray-400 space-y-2">
                <li>+ Dark background (#0a0a0f)</li>
                <li>+ Neon glow effects (shadow)</li>
                <li>+ Monospace typography</li>
                <li>+ Cyan/Fuchsia accent colors</li>
                <li>+ Scanline overlay effect</li>
                <li>+ Sharp corners (no radius)</li>
                <li>+ Terminal-style UI elements</li>
              </ul>
            </div>
            <div className="border border-rose-500/30 p-6">
              <h3 className="font-mono text-lg font-bold text-rose-500 mb-4">FORBIDDEN</h3>
              <ul className="font-mono text-sm text-gray-400 space-y-2">
                <li>- Light backgrounds</li>
                <li>- Rounded corners</li>
                <li>- Soft shadows</li>
                <li>- Serif or sans-serif fonts</li>
                <li>- Warm color palettes</li>
                <li>- Natural/organic shapes</li>
                <li>- Subtle hover effects</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-400/20 py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-gray-600 tracking-widest">
            STYLEKIT // CYBERPUNK_NEON // v1.0.0
          </p>
          <Link
            href="/styles/cyberpunk-neon"
            className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors tracking-widest"
          >
            VIEW FULL DOCUMENTATION
          </Link>
        </div>
      </footer>
    </div>
  );
}
