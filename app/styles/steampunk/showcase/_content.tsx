"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Settings, Cog, Gauge, Compass,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Flame,
  Map, Wrench, Clock
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Brass", hex: "#b5882c", bg: "bg-[#b5882c]" },
  { name: "Copper", hex: "#c87533", bg: "bg-[#c87533]" },
  { name: "Iron", hex: "#4a4a4a", bg: "bg-[#4a4a4a]" },
  { name: "Mahogany", hex: "#4e1e0e", bg: "bg-[#4e1e0e]" },
  { name: "Parchment", hex: "#f0e2c4", bg: "bg-[#f0e2c4]" },
  { name: "Steam White", hex: "#e8ddd0", bg: "bg-[#e8ddd0]" },
  { name: "Rivet Silver", hex: "#8a8a8a", bg: "bg-[#8a8a8a]" },
  { name: "Boiler Red", hex: "#8b2500", bg: "bg-[#8b2500]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(72);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [pressure, setPressure] = useState(72);

  const tabs = [
    { label: "Navigation", icon: Map },
    { label: "Workshop", icon: Wrench },
    { label: "Archives", icon: Clock },
  ];

  const accordionItems = [
    { title: "What is Steampunk Design?", content: "Steampunk is a retrofuturistic aesthetic inspired by 19th-century industrial steam-powered machinery. It combines Victorian-era design sensibilities with imaginative technology, creating a world where brass, copper, and gears drive innovation." },
    { title: "Visual Elements", content: "Key elements include brass and copper metals, clockwork gears, riveted panels, leather textures, ornate Victorian typography, gauges, pipes, and the warm glow of gas lamps." },
    { title: "Design Philosophy", content: "Steampunk celebrates craftsmanship over mass production. Every rivet is intentional, every gear functional. It imagines a world where analog mechanics achieved what digital technology does today." },
  ];

  return (
    <div className="min-h-screen bg-[#2a1f14] text-[#f0e2c4]">
      {/* Texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%23b5882c' fill-opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-gradient-to-b from-[#1a1208] to-transparent border-b-2 border-[#b5882c]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/steampunk"
            className="flex items-center gap-2 text-[#b5882c] hover:text-[#f0e2c4] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-serif">Return</span>
          </Link>
          <div className="flex items-center gap-2">
            <Cog className="w-5 h-5 text-[#b5882c] animate-[spin_8s_linear_infinite]" />
            <span className="font-serif text-lg text-[#b5882c] tracking-wider">
              STEAMPUNK
            </span>
            <Cog className="w-4 h-4 text-[#c87533] animate-[spin_6s_linear_infinite_reverse]" />
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-serif text-[#b5882c] border-2 border-[#b5882c] hover:bg-[#b5882c] hover:text-[#2a1f14] transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative border */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#b5882c]" />
            <Settings className="w-6 h-6 text-[#b5882c] animate-[spin_10s_linear_infinite]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#b5882c]" />
          </div>
          <p className="text-xs font-serif uppercase tracking-[0.5em] text-[#b5882c] mb-6">Anno Domini MMXXVI</p>
          <h1 className="text-5xl md:text-7xl font-serif text-[#f0e2c4] mb-6 leading-tight">
            The Age of
            <span className="block text-[#b5882c] italic">Brass & Steam</span>
          </h1>
          <p className="text-lg font-serif text-[#c87533] max-w-xl mx-auto leading-relaxed">
            Where Victorian elegance meets industrial ingenuity. A world powered by gears, steam, and imagination.
          </p>
          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <div className="w-3 h-3 rounded-full bg-[#b5882c] shadow-[0_0_8px_rgba(181,136,44,0.5)]" />
            <div className="w-16 h-px bg-[#b5882c]/50" />
            <Gauge className="w-8 h-8 text-[#b5882c]" />
            <div className="w-16 h-px bg-[#b5882c]/50" />
            <div className="w-3 h-3 rounded-full bg-[#b5882c] shadow-[0_0_8px_rgba(181,136,44,0.5)]" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Instruments"
        subtitle="Operational readings"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Crew", value: "847" },
            { icon: TrendingUp, label: "Output", value: "+62%" },
            { icon: Eye, label: "Sightings", value: "12.4K" },
            { icon: Flame, label: "Fuel", value: "98.7%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-5 bg-[#1a1208] border-2 border-[#b5882c]/40 shadow-[inset_0_1px_0_rgba(181,136,44,0.2)]"
            >
              {/* Corner rivets */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
              <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
              <stat.icon className="w-5 h-5 text-[#b5882c] mb-3" />
              <p className="text-2xl font-serif text-[#f0e2c4] mb-1">{stat.value}</p>
              <p className="text-xs font-serif uppercase tracking-widest text-[#b5882c]/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Material Palette"
        subtitle="Metals, woods & leathers"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border-2 border-[#b5882c]/30 bg-[#1a1208]"
            labelClassName="text-sm font-serif text-[#f0e2c4]"
            hexClassName="text-xs text-[#b5882c]/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Victorian lettering"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#1a1208] border-2 border-[#b5882c]/30">
            <p className="text-5xl font-serif text-[#f0e2c4] mb-4">Heading</p>
            <p className="text-3xl font-serif italic text-[#b5882c] mb-4">Subheading</p>
            <p className="text-lg font-serif text-[#c87533] mb-4 leading-relaxed">
              Body text with elegant serif typefaces. Every word carries the weight of Victorian craftsmanship.
            </p>
            <p className="text-sm font-serif uppercase tracking-[0.3em] text-[#b5882c]/60">
              Caption &mdash; Patent No. 4,827
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Controls"
        subtitle="Mechanical interface elements"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#1a1208] border-2 border-[#b5882c]/30">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-gradient-to-b from-[#c87533] to-[#8b5220] text-[#f0e2c4] font-serif text-sm uppercase tracking-wider border border-[#b5882c] shadow-[0_2px_0_#4e1e0e,inset_0_1px_0_rgba(255,255,255,0.15)] hover:from-[#b5882c] hover:to-[#7a4a1c] active:shadow-none active:translate-y-0.5 transition-all">
                Activate
              </button>
              <button className="px-6 py-3 bg-[#1a1208] text-[#b5882c] font-serif text-sm uppercase tracking-wider border-2 border-[#b5882c] hover:bg-[#b5882c] hover:text-[#1a1208] transition-colors">
                Secondary
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-[#8b2500] to-[#5a1800] text-[#f0e2c4] font-serif text-sm uppercase tracking-wider border border-[#8b2500] shadow-[0_2px_0_#3a0f00,inset_0_1px_0_rgba(255,255,255,0.1)]">
                Emergency
              </button>
              <button className="px-6 py-3 text-[#b5882c]/40 font-serif text-sm uppercase tracking-wider border-2 border-[#b5882c]/20 cursor-not-allowed">
                Locked
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Panels"
        subtitle="Information displays"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Cog, title: "Clockwork", desc: "Precision engineering through interconnected gears, springs, and escapements." },
            { icon: Compass, title: "Navigation", desc: "Charting courses through uncharted skies with brass instruments and star maps." },
            { icon: Gauge, title: "Pressure", desc: "Monitoring steam pressure levels to maintain optimal engine performance." },
          ].map((card, index) => (
            <div key={index} className="relative p-6 bg-[#1a1208] border-2 border-[#b5882c]/40 group hover:border-[#b5882c] transition-colors">
              {/* Corner rivets */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
              <card.icon className="w-7 h-7 text-[#b5882c] mb-4" />
              <h3 className="text-lg font-serif text-[#f0e2c4] mb-3">{card.title}</h3>
              <p className="text-sm font-serif text-[#c87533]/80 leading-relaxed">{card.desc}</p>
              <div className="mt-4 pt-3 border-t border-[#b5882c]/20">
                <span className="text-xs font-serif uppercase tracking-widest text-[#b5882c]/50">Patent Pending</span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Log Books"
        subtitle="Categorized records"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1208] border-2 border-[#b5882c]/40">
            <div className="flex border-b-2 border-[#b5882c]/30">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 font-serif text-sm uppercase tracking-wider transition-colors border-b-2 -mb-0.5 ${
                    activeTab === index
                      ? "text-[#b5882c] border-[#b5882c] bg-[#b5882c]/10"
                      : "text-[#c87533]/50 border-transparent hover:text-[#b5882c]"
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
                  <h4 className="text-lg font-serif text-[#f0e2c4] mb-2">Course Plotted</h4>
                  <p className="text-sm font-serif text-[#c87533]/80 leading-relaxed">Heading NNW at 12 knots. Estimated arrival at Port Clocksworth: 3 days, 7 hours. Wind favorable.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-serif text-[#f0e2c4] mb-2">Workshop Log</h4>
                  <p className="text-sm font-serif text-[#c87533]/80 leading-relaxed">Main boiler pressure holding steady at 42 PSI. Differential gear assembly completed. New copper piping installed in starboard engine.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-serif text-[#f0e2c4] mb-2">Historical Records</h4>
                  <p className="text-sm font-serif text-[#c87533]/80 leading-relaxed">Expedition log entry #847. The clockwork automaton prototype exceeds expectations. Further refinements scheduled.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Technical Manual"
        subtitle="Expandable documentation"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-1">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#1a1208] border-2 border-[#b5882c]/30 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#b5882c]/5 transition-colors"
              >
                <span className="font-serif text-[#f0e2c4]">{item.title}</span>
                <div className={`w-6 h-6 rounded-full border border-[#b5882c]/50 flex items-center justify-center transition-transform ${openAccordion === index ? "rotate-180" : ""}`}>
                  <ChevronDown className="w-3.5 h-3.5 text-[#b5882c]" />
                </div>
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#b5882c]/20">
                  <p className="text-sm font-serif text-[#c87533]/80 leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="System Alerts"
        subtitle="Status dispatches"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#1a1208] border-l-4 border-[#5a7a4b] border-r border-t border-b border-[#b5882c]/20">
            <Check className="w-4 h-4 text-[#5a7a4b] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#5a7a4b]">Systems Operational</p>
              <p className="text-xs font-serif text-[#5a7a4b]/70 mt-0.5">All boilers running at optimal pressure.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#1a1208] border-l-4 border-[#b5882c] border-r border-t border-b border-[#b5882c]/20">
            <AlertTriangle className="w-4 h-4 text-[#b5882c] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#b5882c]">Caution Required</p>
              <p className="text-xs font-serif text-[#b5882c]/70 mt-0.5">Steam pressure approaching upper threshold.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#1a1208] border-l-4 border-[#8b2500] border-r border-t border-b border-[#b5882c]/20">
            <X className="w-4 h-4 text-[#8b2500] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#d44a1a]">Critical Failure</p>
              <p className="text-xs font-serif text-[#d44a1a]/70 mt-0.5">Engage emergency valve immediately.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#1a1208] border-l-4 border-[#4a6a8a] border-r border-t border-b border-[#b5882c]/20">
            <Info className="w-4 h-4 text-[#4a6a8a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif text-[#6a9aba]">Dispatch Notice</p>
              <p className="text-xs font-serif text-[#6a9aba]/70 mt-0.5">Maintenance scheduled for next port call.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Switch Board"
        subtitle="Mechanical toggles"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#1a1208] border-2 border-[#b5882c]/40 p-6 space-y-5">
            {/* Corner rivets */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            {[
              { label: "Boiler Ignition", desc: "Main steam generator" },
              { label: "Navigation Lights", desc: "Port and starboard lamps" },
              { label: "Auto-Pilot", desc: "Clockwork navigation system" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-[#b5882c]/20 last:border-b-0">
                <div>
                  <p className="text-sm font-serif text-[#f0e2c4]">{item.label}</p>
                  <p className="text-xs font-serif text-[#c87533]/60 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-14 h-7 border-2 transition-colors ${
                    toggleStates[index]
                      ? "bg-gradient-to-b from-[#c87533] to-[#8b5220] border-[#b5882c]"
                      : "bg-[#2a1f14] border-[#4a4a4a]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-gradient-to-b from-[#d4d4d4] to-[#8a8a8a] shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-all ${
                      toggleStates[index] ? "left-[calc(100%-22px)]" : "left-0.5"
                    }`}
                  />
                  {toggleStates[index] && (
                    <span className="absolute top-1 right-[26px] w-1.5 h-1.5 rounded-full bg-[#ff6b35] shadow-[0_0_4px_rgba(255,107,53,0.5)]" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress / Pressure Gauge */}
      <ShowcaseSection
        title="Pressure Gauges"
        subtitle="Steam level indicators"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-[#1a1208] border-2 border-[#b5882c]/40 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-serif text-[#f0e2c4]">Main Boiler Pressure</p>
                <p className="text-sm font-serif text-[#b5882c] font-mono">{pressure} PSI</p>
              </div>
              <div className="h-4 bg-[#2a1f14] border-2 border-[#b5882c]/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                <div
                  className={`h-full transition-all duration-500 ${
                    pressure > 85 ? "bg-gradient-to-r from-[#c87533] to-[#8b2500]" : "bg-gradient-to-r from-[#5a7a4b] to-[#c87533]"
                  }`}
                  style={{ width: `${pressure}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-serif text-[#f0e2c4] mb-2">Engine Cylinders</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, pressure, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-3 bg-[#2a1f14] border border-[#b5882c]/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
                      <div
                        className={`h-full ${value === 100 ? "bg-[#5a7a4b]" : value > 0 ? "bg-[#c87533]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs font-serif text-[#b5882c]/50 mt-1 text-center">Cyl.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-[#b5882c]/20">
              <button
                onClick={() => setPressure(Math.max(0, pressure - 10))}
                className="px-5 py-2 bg-[#2a1f14] text-[#b5882c] font-serif text-sm uppercase tracking-wider border-2 border-[#b5882c]/40 hover:border-[#b5882c] transition-colors"
              >
                Release
              </button>
              <button
                onClick={() => setPressure(Math.min(100, pressure + 10))}
                className="px-5 py-2 bg-gradient-to-b from-[#c87533] to-[#8b5220] text-[#f0e2c4] font-serif text-sm uppercase tracking-wider border border-[#b5882c] shadow-[0_2px_0_#4e1e0e,inset_0_1px_0_rgba(255,255,255,0.1)] active:shadow-none active:translate-y-0.5 transition-all"
              >
                Stoke
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Transmission Form"
        subtitle="Telegraph dispatch"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif text-[#b5882c] mb-2"
        subtitleClassName="text-sm font-serif text-[#c87533]/70 mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="relative bg-[#1a1208] border-2 border-[#b5882c]/40 p-8">
            <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#8a8a8a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            <h3 className="text-lg font-serif text-[#f0e2c4] mb-6">Send Dispatch</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-[#b5882c] mb-2">Recipient</label>
                <input
                  type="text"
                  placeholder="Name or callsign"
                  className="w-full px-4 py-2.5 bg-[#2a1f14] border-2 border-[#b5882c]/30 text-[#f0e2c4] font-serif placeholder-[#b5882c]/30 focus:outline-none focus:border-[#b5882c] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-[#b5882c] mb-2">Message</label>
                <textarea
                  placeholder="Compose your telegram..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#2a1f14] border-2 border-[#b5882c]/30 text-[#f0e2c4] font-serif placeholder-[#b5882c]/30 focus:outline-none focus:border-[#b5882c] transition-colors resize-none"
                />
              </div>
              <button className="w-full py-3 bg-gradient-to-b from-[#c87533] to-[#8b5220] text-[#f0e2c4] font-serif text-sm uppercase tracking-wider border border-[#b5882c] shadow-[0_2px_0_#4e1e0e,inset_0_1px_0_rgba(255,255,255,0.15)] hover:from-[#b5882c] hover:to-[#7a4a1c] active:shadow-none active:translate-y-0.5 transition-all">
                Transmit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 border-t-2 border-[#b5882c]/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Cog className="w-4 h-4 text-[#b5882c]/50 animate-[spin_8s_linear_infinite]" />
            <Settings className="w-3 h-3 text-[#b5882c]/40 animate-[spin_6s_linear_infinite_reverse]" />
          </div>
          <p className="text-xs font-serif text-[#b5882c]/50 tracking-wider">
            Steampunk Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#b5882c] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
