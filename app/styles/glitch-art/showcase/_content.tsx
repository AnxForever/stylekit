"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Radio, Cpu, ChevronDown, ChevronUp, Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Activity } from "lucide-react";
import { ShowcaseHero, ShowcaseSection, ColorPaletteGrid, type ColorItem } from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(78);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { name: "Cyan Glitch", value: "#00ffff", description: "Primary" },
    { name: "Magenta Error", value: "#ff00ff", description: "Secondary" },
    { name: "Yellow Corrupt", value: "#ffff00", description: "Accent" },
    { name: "Green Data", value: "#00ff00", description: "Highlight" },
    { name: "Deep Black", value: "#000000", description: "Background" },
  ];

  const tabs = ["RGB", "Noise", "Scan"];

  const accordionItems = [
    { title: "What is Glitch Art?", content: "A digital art aesthetic that embraces the beauty of technological failures and errors. It features intentional distortions, RGB color separation, pixel displacement, and digital corruption effects that create striking visual experiences." },
    { title: "Key Effects", content: "RGB color channel splitting, scan line artifacts, pixel sorting, data moshing, chromatic aberration, digital noise, signal interference, and fragmented visuals that mimic digital corruption and glitches." },
    { title: "When to Use", content: "Perfect for tech brands, electronic music, experimental art, cyberpunk aesthetics, digital media platforms, and any project wanting to convey a raw, digital, or futuristic edge with intentional imperfection." },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with glitch effect */}
      <header className="border-b border-cyan-500/30 bg-black/95 backdrop-blur-sm sticky top-0 z-50 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-cyan-400 hover:text-magenta-500 transition-colors group relative"
            style={{ textShadow: '2px 0 #ff00ff, -2px 0 #00ffff' }}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-lg font-bold">BACK</span>
          </Link>
          <div className="flex gap-3">
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            <Radio className="w-5 h-5 text-magenta-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </header>

      {/* Hero with glitch animation */}
      <ShowcaseHero
        title="GLITCH ART"
        subtitle="DIGITAL CORRUPTION AESTHETIC"
        description="Embrace the beauty of technological failure with RGB splits, pixel distortions, and signal interference effects."
        className="relative py-32 px-6 overflow-hidden bg-black"
        titleClassName="text-7xl md:text-8xl font-black mb-6 text-cyan-400 tracking-wider"
        subtitleClassName="text-xl text-magenta-500 mb-8 font-mono tracking-widest"
        descriptionClassName="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto font-mono"
        style={{
          textShadow: '3px 0 #ff00ff, -3px 0 #00ffff'
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-px bg-cyan-500 animate-pulse" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-magenta-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="absolute top-1/2 left-0 w-full h-px bg-yellow-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-green-500 animate-pulse" style={{ animationDelay: '0.9s' }} />
        </div>
        <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/20 blur-[100px]"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-magenta-500/20 blur-[100px]"></div>
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection 
        title="SYS//METRICS" 
        subtitle="Data corrupted successfully"
        className="py-20 px-6 relative"
        titleClassName="text-5xl font-black text-cyan-400 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-magenta-500 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "USERS", value: "9.4K", color: "cyan" },
            { icon: TrendingUp, label: "ERRORS", value: "+89%", color: "magenta" },
            { icon: Eye, label: "VIEWS", value: "666K", color: "yellow" },
            { icon: Activity, label: "SIGNAL", value: "78%", color: "green" },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="p-6 bg-gradient-to-br from-gray-900 to-black border-2 hover:scale-105 transition-all relative overflow-hidden group"
              style={{ 
                borderColor: stat.color === 'cyan' ? '#00ffff' : stat.color === 'magenta' ? '#ff00ff' : stat.color === 'yellow' ? '#ffff00' : '#00ff00',
                boxShadow: `0 0 20px ${stat.color === 'cyan' ? 'rgba(0,255,255,0.3)' : stat.color === 'magenta' ? 'rgba(255,0,255,0.3)' : stat.color === 'yellow' ? 'rgba(255,255,0,0.3)' : 'rgba(0,255,0,0.3)'}`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <stat.icon 
                className="w-8 h-8 mb-4" 
                style={{ color: stat.color === 'cyan' ? '#00ffff' : stat.color === 'magenta' ? '#ff00ff' : stat.color === 'yellow' ? '#ffff00' : '#00ff00' }}
              />
              <p className="text-4xl font-black mb-2 font-mono" style={{ 
                color: stat.color === 'cyan' ? '#00ffff' : stat.color === 'magenta' ? '#ff00ff' : stat.color === 'yellow' ? '#ffff00' : '#00ff00',
                textShadow: `2px 2px 4px ${stat.color === 'cyan' ? '#ff00ff' : '#00ffff'}`
              }}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 font-mono tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection 
        title="COLOR//CHANNELS" 
        subtitle="RGB separation active"
        className="py-20 px-6 bg-gradient-to-b from-black to-gray-900"
        titleClassName="text-5xl font-black text-magenta-500 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-cyan-400 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection 
        title="FONT//SYSTEM" 
        subtitle="Monospace protocol"
        className="py-20 px-6"
        titleClassName="text-5xl font-black text-yellow-400 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-green-500 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            { text: "GLITCH", size: "text-8xl", color: "#00ffff", shadow: "#ff00ff" },
            { text: "CORRUPTED HEADING", size: "text-5xl", color: "#ff00ff", shadow: "#00ffff" },
            { text: "SYSTEM.ERROR: Text rendering failed", size: "text-xl", color: "#ffff00", shadow: "#00ff00" },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-gray-900 border border-cyan-500/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <p 
                className={`${item.size} font-black font-mono text-center tracking-wider`}
                style={{ 
                  color: item.color,
                  textShadow: `3px 3px 0 ${item.shadow}, -2px -2px 0 ${item.shadow}`
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection 
        title="BTN//INTERFACE" 
        subtitle="Click to corrupt"
        className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black"
        titleClassName="text-5xl font-black text-green-500 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-yellow-400 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          {[
            { label: "PRIMARY", color: "#00ffff", shadow: "#ff00ff" },
            { label: "SECONDARY", color: "#ff00ff", shadow: "#00ffff" },
            { label: "WARNING", color: "#ffff00", shadow: "#ff0000" },
            { label: "SUCCESS", color: "#00ff00", shadow: "#0000ff" },
          ].map((btn, i) => (
            <button 
              key={i}
              className="px-8 py-4 font-black font-mono text-black relative overflow-hidden group border-2 transition-all hover:scale-105"
              style={{ 
                backgroundColor: btn.color,
                borderColor: btn.shadow,
                boxShadow: `4px 4px 0 ${btn.shadow}, 0 0 20px ${btn.color}80`
              }}
            >
              <span className="relative z-10">{btn.label}</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: btn.shadow }}
              />
            </button>
          ))}
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection 
        title="DATA//BLOCKS" 
        subtitle="Memory fragments"
        className="py-20 px-6"
        titleClassName="text-5xl font-black text-cyan-400 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-magenta-500 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "DISTORTION", desc: "Pixel displacement active", color: "cyan", shadow: "magenta" },
            { title: "CORRUPTION", desc: "Data integrity compromised", color: "magenta", shadow: "yellow" },
            { title: "INTERFERENCE", desc: "Signal loss detected", color: "yellow", shadow: "cyan" },
          ].map((card, i) => (
            <div 
              key={i} 
              className="p-8 bg-gray-900 border-2 relative overflow-hidden group hover:scale-105 transition-all"
              style={{ 
                borderColor: card.color === 'cyan' ? '#00ffff' : card.color === 'magenta' ? '#ff00ff' : '#ffff00',
                boxShadow: `0 0 30px ${card.color === 'cyan' ? 'rgba(0,255,255,0.3)' : card.color === 'magenta' ? 'rgba(255,0,255,0.3)' : 'rgba(255,255,0,0.3)'}`
              }}
            >
              <h3 
                className="text-3xl font-black mb-4 font-mono"
                style={{ 
                  color: card.color === 'cyan' ? '#00ffff' : card.color === 'magenta' ? '#ff00ff' : '#ffff00',
                  textShadow: `2px 2px 0 ${card.shadow === 'magenta' ? '#ff00ff' : card.shadow === 'yellow' ? '#ffff00' : '#00ffff'}`
                }}
              >
                {card.title}
              </p>
              <p className="text-gray-400 font-mono text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection 
        title="TAB//CONTROL" 
        subtitle="Channel selector"
        className="py-20 px-6 bg-gradient-to-b from-black to-gray-900"
        titleClassName="text-5xl font-black text-magenta-500 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-green-500 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-black border-2 border-cyan-500">
            <div className="flex border-b-2 border-cyan-500">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 px-6 py-4 font-black font-mono transition-all border-r-2 last:border-r-0 ${
                    activeTab === i 
                      ? 'bg-cyan-500 text-black' 
                      : 'bg-black text-cyan-400 hover:bg-cyan-500/20'
                  }`}
                  style={{ borderColor: '#00ffff' }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8 min-h-[180px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-3xl font-black text-cyan-400 mb-4 font-mono">RGB_SPLIT</h4>
                  <p className="text-gray-400 font-mono">Red, green, blue color channel separation creates chromatic aberration effects</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-3xl font-black text-magenta-500 mb-4 font-mono">NOISE_GEN</h4>
                  <p className="text-gray-400 font-mono">Digital noise and grain patterns simulate signal interference</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-3xl font-black text-yellow-400 mb-4 font-mono">SCAN_LINES</h4>
                  <p className="text-gray-400 font-mono">Horizontal scan line artifacts from CRT displays</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection 
        title="INFO//EXPAND" 
        subtitle="Data structure"
        className="py-20 px-6"
        titleClassName="text-5xl font-black text-yellow-400 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-cyan-400 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <div className="max-w-3xl mx-auto space-y-0">
          {accordionItems.map((item, i) => (
            <div key={i} className="bg-black border-2 border-cyan-500/50 border-b-0 last:border-b-2">
              <button
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-cyan-500/10 transition-colors"
              >
                <span className="font-black text-cyan-400 font-mono">{item.title}</span>
                {openAccordion === i ? (
                  <ChevronUp className="w-6 h-6 text-magenta-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-magenta-500" />
                )}
              </button>
              {openAccordion === i && (
                <div className="px-6 pb-6 border-t-2 border-cyan-500/30">
                  <p className="text-gray-400 leading-relaxed font-mono text-sm mt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection 
        title="ALERT//SYSTEM" 
        subtitle="Status messages"
        className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black"
        titleClassName="text-5xl font-black text-green-500 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-yellow-400 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { icon: Check, label: "SUCCESS", desc: "Operation completed", color: "#00ff00", bg: "rgba(0,255,0,0.1)" },
            { icon: AlertTriangle, label: "WARNING", desc: "System instability detected", color: "#ffff00", bg: "rgba(255,255,0,0.1)" },
            { icon: X, label: "ERROR", desc: "Critical failure occurred", color: "#ff0000", bg: "rgba(255,0,0,0.1)" },
            { icon: Info, label: "INFO", desc: "Data transmission active", color: "#00ffff", bg: "rgba(0,255,255,0.1)" },
          ].map((alert, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-5 border-2 border-l-8"
              style={{ 
                backgroundColor: alert.bg,
                borderColor: alert.color,
                boxShadow: `0 0 20px ${alert.color}40`
              }}
            >
              <alert.icon className="w-6 h-6" style={{ color: alert.color }} />
              <div>
                <p className="font-black font-mono text-sm tracking-wider" style={{ color: alert.color }}>
                  {alert.label}
                </p>
                <p className="text-gray-400 text-sm font-mono">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection 
        title="TOGGLE//SWITCH" 
        subtitle="Binary controls"
        className="py-20 px-6"
        titleClassName="text-5xl font-black text-magenta-500 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-cyan-400 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-gray-900 border-2 border-cyan-500 space-y-6">
            {[
              { label: "RGB_SPLIT", desc: "Color channel separation", color: "#00ffff" },
              { label: "SCAN_LINES", desc: "CRT effect overlay", color: "#ff00ff" },
              { label: "DISTORTION", desc: "Pixel displacement", color: "#ffff00" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b-2 border-cyan-500/30 last:border-b-0">
                <div>
                  <p className="font-black font-mono" style={{ color: item.color }}>{item.label}</p>
                  <p className="text-sm text-gray-500 font-mono">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[i] = !newStates[i];
                    setToggleStates(newStates);
                  }}
                  className="relative w-16 h-8 border-2 transition-all"
                  style={{ 
                    backgroundColor: toggleStates[i] ? item.color : '#000',
                    borderColor: item.color,
                    boxShadow: toggleStates[i] ? `0 0 10px ${item.color}` : 'none'
                  }}
                >
                  <span
                    className="absolute top-0.5 w-6 h-6 bg-black border-2 transition-all"
                    style={{ 
                      left: toggleStates[i] ? 'calc(100% - 28px)' : '2px',
                      borderColor: item.color
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection 
        title="LOAD//BAR" 
        subtitle="Processing status"
        className="py-20 px-6 bg-gradient-to-b from-black to-gray-900"
        titleClassName="text-5xl font-black text-cyan-400 mb-3 text-center font-mono tracking-wider"
        subtitleClassName="text-magenta-500 mb-12 text-center font-mono text-sm tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-black border-2 border-cyan-500 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-black font-mono text-cyan-400">CORRUPTION.EXE</p>
                <p className="text-sm font-mono text-magenta-500">{progress}%</p>
              </div>
              <div className="h-4 bg-gray-900 border-2 border-cyan-500">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500 transition-all duration-500"
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: '0 0 10px rgba(0,255,255,0.8)'
                  }}
                />
              </div>
            </div>

            <div>
              <p className="font-black font-mono text-yellow-400 mb-3">SEGMENTS</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((val, i) => (
                  <div key={i}>
                    <div className="h-3 bg-gray-900 border border-cyan-500">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${val}%`,
                          backgroundColor: val === 100 ? '#00ff00' : val > 0 ? '#ffff00' : 'transparent',
                          boxShadow: val > 0 ? `0 0 5px ${val === 100 ? '#00ff00' : '#ffff00'}` : 'none'
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 font-mono mt-1 text-center">[{i + 1}]</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t-2 border-cyan-500/30">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-6 py-3 bg-black border-2 border-cyan-500 text-cyan-400 font-black font-mono hover:bg-cyan-500 hover:text-black transition-all"
              >
                [-10%]
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-6 py-3 bg-cyan-500 text-black font-black font-mono hover:bg-magenta-500 transition-all"
                style={{ boxShadow: '0 0 20px rgba(0,255,255,0.5)' }}
              >
                [+10%]
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="border-t-2 border-cyan-500 py-12 px-6 text-center bg-black">
        <p className="text-gray-500 font-mono text-sm">
          GLITCH.ART © 2026 - SYSTEM.CORRUPTED.SUCCESSFULLY
        </p>
      </footer>
    </div>
  );
}
