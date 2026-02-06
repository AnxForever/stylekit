"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Shield, Cpu, Zap, Target, ChevronDown,
  Check, X, AlertTriangle, Info, Activity, Gauge, Crosshair, Radio
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(78);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { color: "#1a2332", name: "Titanium Dark", textColor: "white" },
    { color: "#2d4a1e", name: "Military Green", textColor: "white" },
    { color: "#c4a000", name: "Warning Yellow", textColor: "black" },
    { color: "#cc3300", name: "Alert Red", textColor: "white" },
    { color: "#4a90d9", name: "HUD Blue", textColor: "white" },
    { color: "#8a8a8a", name: "Armor Gray", textColor: "white" },
  ];

  const tabs = ["Systems", "Weapons", "Diagnostics"];

  const accordionItems = [
    { title: "FRAME STRUCTURE", content: "Bipedal humanoid frame with titanium alloy skeleton. Height: 18.5m. Weight: 42.7 tons. Maximum operational altitude: 12,000m." },
    { title: "POWER SYSTEM", content: "Ultracompact fusion reactor with 180-day operational capacity. Output: 3,200 MW. Emergency backup: solar collection panels on shoulder armor." },
    { title: "WEAPON LOADOUT", content: "Primary: 120mm railgun. Secondary: dual beam sabers. Support: 24-cell micro-missile launcher. Defense: laminated reactive armor with energy shield generator." },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono">
      {/* Back */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/styles/mecha" className="flex items-center gap-2 px-4 py-2 bg-[#1a2332] border border-[#c4a000]/50 text-[#c4a000] text-xs uppercase tracking-widest hover:bg-[#c4a000] hover:text-black transition-all">
          <ArrowLeft className="w-4 h-4" /> RETURN
        </Link>
      </div>

      {/* Hero */}
      <ShowcaseHero
        title="MECHA"
        subtitle="TACTICAL INTERFACE SYSTEM"
        className="relative min-h-screen flex items-center justify-center bg-[#0d1117] overflow-hidden"
        titleClassName="text-7xl md:text-9xl font-black text-[#c4a000] uppercase tracking-[0.3em] drop-shadow-[0_0_20px_rgba(196,160,0,0.3)]"
        subtitleClassName="text-sm uppercase tracking-[0.5em] text-[#4a90d9] mt-6"
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, #c4a000 40px, #c4a000 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #c4a000 40px, #c4a000 41px)" }} />
        <div className="absolute top-8 right-8 text-xs text-[#4a90d9]/60 uppercase tracking-widest">
          <p>Unit: RX-78 MK-II</p>
          <p>Status: OPERATIONAL</p>
        </div>
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection title="COMBAT STATS" subtitle="Operational parameters" className="py-16 px-6 bg-[#0d1117]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, label: "ARMOR", value: "98.2%", color: "border-[#2d4a1e]" },
            { icon: Gauge, label: "POWER", value: "3.2GW", color: "border-[#c4a000]" },
            { icon: Crosshair, label: "ACCURACY", value: "99.7%", color: "border-[#cc3300]" },
            { icon: Radio, label: "SIGNAL", value: "CLEAR", color: "border-[#4a90d9]" },
          ].map((s, i) => (
            <div key={i} className={`p-5 bg-[#1a2332] border-l-4 ${s.color} border border-[#2d333b]`}>
              <s.icon className="w-6 h-6 text-[#c4a000] mb-3" />
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-xs uppercase tracking-widest text-[#8b949e] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Colors */}
      <ShowcaseSection title="COLOR SYSTEM" subtitle="Tactical palette" className="py-16 px-6 bg-[#161b22]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection title="TYPOGRAPHY" subtitle="System fonts" className="py-16 px-6 bg-[#0d1117]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 bg-[#1a2332] border border-[#2d333b] border-l-4 border-l-[#c4a000]">
            <p className="text-xs text-[#8b949e] uppercase tracking-widest mb-2">Heading / Monospace Bold</p>
            <p className="text-4xl font-black text-white uppercase tracking-wider">GUNDAM FRAME</p>
          </div>
          <div className="p-6 bg-[#1a2332] border border-[#2d333b] border-l-4 border-l-[#4a90d9]">
            <p className="text-xs text-[#8b949e] uppercase tracking-widest mb-2">Body / Monospace Regular</p>
            <p className="text-base text-[#c9d1d9] leading-relaxed">All systems nominal. Reactor output stable at 3,200 MW. Awaiting deployment orders from command.</p>
          </div>
          <div className="p-6 bg-[#1a2332] border border-[#2d333b] border-l-4 border-l-[#cc3300]">
            <p className="text-xs text-[#8b949e] uppercase tracking-widest mb-2">Data / Monospace Numbers</p>
            <p className="text-2xl text-[#c4a000] tracking-wider">09:42:17.038 | LAT 35.6762 | LNG 139.6503</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection title="CONTROLS" subtitle="Action elements" className="py-16 px-6 bg-[#161b22]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-[#c4a000] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#e0b800] transition-colors">DEPLOY</button>
          <button className="px-8 py-3 bg-[#cc3300] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#ff4400] transition-colors">EMERGENCY</button>
          <button className="px-8 py-3 bg-transparent border-2 border-[#4a90d9] text-[#4a90d9] font-bold uppercase tracking-widest text-xs hover:bg-[#4a90d9] hover:text-black transition-colors">SCAN</button>
          <button className="px-8 py-3 bg-[#1a2332] border border-[#2d333b] text-[#8b949e] font-bold uppercase tracking-widest text-xs hover:border-[#c4a000] hover:text-[#c4a000] transition-colors">STANDBY</button>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection title="DATA PANELS" subtitle="Information modules" className="py-16 px-6 bg-[#0d1117]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: "DEFENSE SYS", desc: "Laminated reactive armor with 780mm RHA equivalent protection.", border: "border-t-[#2d4a1e]" },
            { icon: Cpu, title: "AI CORE", desc: "Neural-link combat AI with 0.003ms response time.", border: "border-t-[#4a90d9]" },
            { icon: Zap, title: "PROPULSION", desc: "Thermonuclear jet/rocket hybrid. Max speed: Mach 2.4.", border: "border-t-[#c4a000]" },
          ].map((c, i) => (
            <div key={i} className={`p-6 bg-[#1a2332] border border-[#2d333b] border-t-4 ${c.border}`}>
              <c.icon className="w-8 h-8 text-[#c4a000] mb-3" />
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">{c.title}</h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection title="SYSTEM TABS" subtitle="Navigation panels" className="py-16 px-6 bg-[#161b22]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a2332] border border-[#2d333b]">
            <div className="flex border-b border-[#2d333b]">
              {tabs.map((t, i) => (
                <button key={i} onClick={() => setActiveTab(i)} className={`flex-1 px-6 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${activeTab === i ? "bg-[#c4a000] text-black" : "text-[#8b949e] hover:text-[#c4a000]"}`}>{t}</button>
              ))}
            </div>
            <div className="p-6 min-h-[100px]">
              {activeTab === 0 && <p className="text-[#c9d1d9]">All primary systems operational. Hydraulics: 100%. Sensors: ACTIVE. Comms: LINKED.</p>}
              {activeTab === 1 && <p className="text-[#c9d1d9]">Railgun: LOADED (24 rounds). Beam Sabers: CHARGED. Missiles: 18/24 remaining.</p>}
              {activeTab === 2 && <p className="text-[#c9d1d9]">Frame integrity: 98.2%. Reactor temp: 1,247C. Coolant flow: NOMINAL.</p>}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection title="TECH SPECS" subtitle="Expandable data" className="py-16 px-6 bg-[#0d1117]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <div className="max-w-3xl mx-auto">
          {accordionItems.map((item, i) => (
            <div key={i} className="border border-[#2d333b] border-b-0 last:border-b bg-[#1a2332]">
              <button onClick={() => setOpenAccordion(openAccordion === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#1a2332]/80">
                <span className="font-bold text-[#c4a000] uppercase tracking-wider text-sm">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#4a90d9] transition-transform ${openAccordion === i ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === i && <div className="px-6 pb-4"><p className="text-sm text-[#8b949e] leading-relaxed">{item.content}</p></div>}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection title="ALERTS" subtitle="System messages" className="py-16 px-6 bg-[#161b22]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center gap-3 p-4 bg-[#1a2332] border-l-4 border-[#2d4a1e] border border-[#2d333b]">
            <Check className="w-5 h-5 text-[#2d4a1e]" /><div><p className="font-bold text-white uppercase text-xs tracking-widest">SYSTEM NOMINAL</p><p className="text-xs text-[#8b949e]">All systems operating within parameters.</p></div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#1a2332] border-l-4 border-[#c4a000] border border-[#2d333b]">
            <AlertTriangle className="w-5 h-5 text-[#c4a000]" /><div><p className="font-bold text-white uppercase text-xs tracking-widest">CAUTION</p><p className="text-xs text-[#8b949e]">Reactor temperature approaching threshold.</p></div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#1a2332] border-l-4 border-[#cc3300] border border-[#2d333b]">
            <X className="w-5 h-5 text-[#cc3300]" /><div><p className="font-bold text-white uppercase text-xs tracking-widest">CRITICAL FAILURE</p><p className="text-xs text-[#8b949e]">Left arm actuator malfunction detected.</p></div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#1a2332] border-l-4 border-[#4a90d9] border border-[#2d333b]">
            <Info className="w-5 h-5 text-[#4a90d9]" /><div><p className="font-bold text-white uppercase text-xs tracking-widest">INTEL UPDATE</p><p className="text-xs text-[#8b949e]">New mission data received from HQ.</p></div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection title="SWITCHES" subtitle="System toggles" className="py-16 px-6 bg-[#0d1117]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#1a2332] border border-[#2d333b] p-6 space-y-4">
          {[
            { label: "ENERGY SHIELD", desc: "Electromagnetic barrier system" },
            { label: "STEALTH MODE", desc: "Active camouflage and IR suppression" },
            { label: "COMBAT AI", desc: "Neural-link targeting assistance" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-[#2d333b] last:border-b-0">
              <div><p className="font-bold text-white uppercase tracking-wider text-sm">{item.label}</p><p className="text-xs text-[#8b949e]">{item.desc}</p></div>
              <button onClick={() => { const n = [...toggleStates]; n[i] = !n[i]; setToggleStates(n); }} className={`relative w-14 h-7 transition-colors ${toggleStates[i] ? "bg-[#c4a000]" : "bg-[#2d333b]"}`}>
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-black transition-transform ${toggleStates[i] ? "translate-x-7" : ""}`} />
              </button>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection title="STATUS" subtitle="System gauges" className="py-16 px-6 bg-[#161b22]" titleClassName="text-3xl font-black text-[#c4a000] uppercase tracking-wider mb-2 text-center" subtitleClassName="text-xs uppercase tracking-[0.4em] text-[#4a90d9] mb-10 text-center">
        <div className="max-w-3xl mx-auto bg-[#1a2332] border border-[#2d333b] p-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2"><p className="font-bold text-white uppercase text-xs tracking-widest">REACTOR OUTPUT</p><p className="text-xs text-[#c4a000]">{progress}%</p></div>
            <div className="h-3 bg-[#0d1117] border border-[#2d333b]"><div className="h-full bg-[#c4a000] transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
          <div>
            <p className="font-bold text-white uppercase text-xs tracking-widest mb-2">SUBSYSTEMS</p>
            <div className="grid grid-cols-4 gap-2">
              {[{ v: 100, c: "bg-[#2d4a1e]", l: "ARM" }, { v: 100, c: "bg-[#4a90d9]", l: "SENS" }, { v: progress, c: "bg-[#c4a000]", l: "WEAP" }, { v: 23, c: "bg-[#cc3300]", l: "COOL" }].map((s, i) => (
                <div key={i}><div className="h-2 bg-[#0d1117] border border-[#2d333b]"><div className={`h-full ${s.c}`} style={{ width: `${s.v}%` }} /></div><p className="text-[10px] text-[#8b949e] uppercase tracking-wider mt-1 text-center">{s.l}</p></div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-[#2d333b]">
            <button onClick={() => setProgress(Math.max(0, progress - 10))} className="px-4 py-2 border border-[#2d333b] text-[#8b949e] text-xs uppercase tracking-widest hover:border-[#c4a000] hover:text-[#c4a000] transition-colors">DECREASE</button>
            <button onClick={() => setProgress(Math.min(100, progress + 10))} className="px-4 py-2 bg-[#c4a000] text-black text-xs uppercase tracking-widest font-bold hover:bg-[#e0b800] transition-colors">INCREASE</button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0d1117] border-t border-[#2d333b] text-center">
        <p className="text-xs text-[#8b949e] uppercase tracking-[0.3em]">MECHA TACTICAL INTERFACE // ALL SYSTEMS NOMINAL</p>
      </footer>
    </div>
  );
}
