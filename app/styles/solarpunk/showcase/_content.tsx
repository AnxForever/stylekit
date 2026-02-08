"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Leaf, Sprout, TreePine, ChevronDown, Check, X, AlertTriangle, Info, ArrowLeft, Zap } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState("energy");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const colors = [
    { name: "Forest", hex: "#2d6a4f", textColor: "text-white" },
    { name: "Meadow", hex: "#40916c", textColor: "text-white" },
    { name: "Solar", hex: "#fbbf24", textColor: "text-black" },
    { name: "Sky", hex: "#0ea5e9", textColor: "text-white" },
    { name: "Cream", hex: "#f0fdf4", textColor: "text-[#2d6a4f]" },
  ];

  const tabContent: Record<string, { title: string; content: string }> = {
    energy: { title: "Renewable Energy", content: "Solar panels and wind turbines powering sustainable communities." },
    gardens: { title: "Urban Gardens", content: "Vertical farms and rooftop gardens bringing nature to cities." },
    transport: { title: "Green Transport", content: "Electric vehicles and cycling paths for clean mobility." },
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4]">
      {/* Navigation */}
      <nav className="border-b border-[#2d6a4f]/20 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-2 text-[#2d6a4f] hover:text-[#40916c] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Docs</span>
          </Link>
          <span className="text-xl font-semibold text-[#2d6a4f] flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            Solarpunk
          </span>
          <Link href="/styles" className="text-[#2d6a4f] hover:text-[#40916c] transition-colors">
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4 mb-6">
            <Sun className="w-12 h-12 text-[#fbbf24]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#2d6a4f] mb-4">
            Solarpunk
          </h1>
          <p className="text-xl text-[#40916c] mb-8">
            Optimistic eco-futurism where technology and nature thrive together
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-[#2d6a4f] text-white rounded-full font-medium hover:bg-[#40916c] transition-colors shadow-lg shadow-[#2d6a4f]/20">
              <Sprout className="w-4 h-4 inline mr-2" />
              Explore
            </button>
            <button className="px-8 py-3 bg-white text-[#2d6a4f] rounded-full font-medium border border-[#2d6a4f]/20 hover:border-[#2d6a4f] transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8 text-center">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="rounded-2xl overflow-hidden shadow-lg">
                <div className={`h-24 ${color.textColor} flex items-end p-4`} style={{ backgroundColor: color.hex }}>
                  <span className="font-medium">{color.name}</span>
                </div>
                <div className="bg-white p-3 text-center font-mono text-sm text-[#2d6a4f]">{color.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 px-6 bg-[#f0fdf4]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8 text-center">Buttons</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-[#2d6a4f] text-white rounded-full font-medium hover:bg-[#40916c] transition-colors shadow-lg shadow-[#2d6a4f]/20">
              <Leaf className="w-4 h-4 inline mr-2" />Primary
            </button>
            <button className="px-6 py-3 bg-[#fbbf24] text-[#2d6a4f] rounded-full font-medium hover:bg-[#f59e0b] transition-colors shadow-lg shadow-[#fbbf24]/20">
              <Sun className="w-4 h-4 inline mr-2" />Solar
            </button>
            <button className="px-6 py-3 bg-white text-[#2d6a4f] rounded-full font-medium border border-[#2d6a4f] hover:bg-[#f0fdf4] transition-colors">
              Outline
            </button>
            <button className="px-6 py-3 text-[#2d6a4f] rounded-full font-medium hover:bg-[#dcfce7] transition-colors">
              Ghost
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8 text-center">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sun, title: "Solar Energy", desc: "Harness the power of the sun", color: "#fbbf24" },
              { icon: Leaf, title: "Green Living", desc: "Sustainable lifestyle choices", color: "#22c55e" },
              { icon: Zap, title: "Clean Tech", desc: "Innovation for the planet", color: "#0ea5e9" },
            ].map((card, i) => (
              <div key={i} className="bg-[#f0fdf4] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#2d6a4f]/10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: card.color + "20" }}>
                  <card.icon className="w-6 h-6" style={{ color: card.color }} />
                </div>
                <h3 className="text-xl font-bold text-[#2d6a4f] mb-2">{card.title}</h3>
                <p className="text-[#40916c]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6 bg-[#f0fdf4]">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8 text-center">Join the Movement</h2>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#2d6a4f]/10">
            <div className="space-y-4">
              <div>
                <label className="block text-[#2d6a4f] font-medium mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 bg-[#f0fdf4] rounded-xl border border-[#2d6a4f]/20 focus:border-[#2d6a4f] focus:outline-none transition-colors" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-[#2d6a4f] font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-[#f0fdf4] rounded-xl border border-[#2d6a4f]/20 focus:border-[#2d6a4f] focus:outline-none transition-colors" placeholder="your@email.com" />
              </div>
              <button className="w-full px-6 py-3 bg-[#2d6a4f] text-white rounded-full font-medium hover:bg-[#40916c] transition-colors shadow-lg shadow-[#2d6a4f]/20">
                <Sprout className="w-4 h-4 inline mr-2" />Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8 text-center">Explore Topics</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#2d6a4f]/10">
            <div className="flex bg-[#f0fdf4]">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-4 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-[#2d6a4f] text-white"
                      : "text-[#2d6a4f] hover:bg-[#dcfce7]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-[#2d6a4f] mb-2">{tabContent[activeTab].title}</h3>
              <p className="text-[#40916c]">{tabContent[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 px-6 bg-[#f0fdf4]">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8 text-center">Notifications</h2>
          <div className="flex items-start gap-3 p-4 bg-[#0ea5e9]/10 rounded-xl border border-[#0ea5e9]/30">
            <Info className="w-5 h-5 text-[#0ea5e9] mt-0.5" />
            <p className="text-[#2d6a4f]">New solar panel installation guide available.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fbbf24]/10 rounded-xl border border-[#fbbf24]/30">
            <AlertTriangle className="w-5 h-5 text-[#f59e0b] mt-0.5" />
            <p className="text-[#2d6a4f]">Remember to water your community garden today.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ef4444]/10 rounded-xl border border-[#ef4444]/30">
            <X className="w-5 h-5 text-[#ef4444] mt-0.5" />
            <p className="text-[#2d6a4f]">Carbon footprint exceeded daily limit.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#22c55e]/10 rounded-xl border border-[#22c55e]/30">
            <Check className="w-5 h-5 text-[#22c55e] mt-0.5" />
            <p className="text-[#2d6a4f]">You saved 5kg of CO2 this week!</p>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8 text-center">Select Project</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-[#f0fdf4] rounded-xl border border-[#2d6a4f]/20 text-left flex items-center justify-between hover:border-[#2d6a4f] transition-colors"
            >
              <span className="text-[#2d6a4f]">Choose a project</span>
              <ChevronDown className={`w-5 h-5 text-[#2d6a4f] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#2d6a4f]/20 shadow-lg z-10 overflow-hidden">
                {["Community Solar", "Urban Farm", "Bike Share", "Rainwater Harvest"].map((item) => (
                  <button key={item} className="w-full px-4 py-3 text-left text-[#2d6a4f] hover:bg-[#f0fdf4] transition-colors flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-[#40916c]" />{item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 px-6 bg-[#f0fdf4]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2d6a4f] mb-8 text-center">Design Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#22c55e]/30">
              <h3 className="text-xl font-bold text-[#22c55e] mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> Embrace</h3>
              <ul className="space-y-2 text-[#2d6a4f]">
                <li>Natural green color palette</li>
                <li>Organic rounded shapes</li>
                <li>Solar/plant motifs</li>
                <li>Light airy backgrounds</li>
                <li>Optimistic imagery</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#ef4444]/30">
              <h3 className="text-xl font-bold text-[#ef4444] mb-4 flex items-center gap-2"><X className="w-5 h-5" /> Avoid</h3>
              <ul className="space-y-2 text-[#2d6a4f]">
                <li>Dark dystopian themes</li>
                <li>Industrial harshness</li>
                <li>Gray monochrome</li>
                <li>Sharp aggressive angles</li>
                <li>Pessimistic messaging</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#2d6a4f] text-center">
        <TreePine className="w-8 h-8 mx-auto mb-4 text-[#fbbf24]" />
        <p className="text-white">
          Solarpunk Style by <Link href="/" className="text-[#fbbf24] hover:underline">StyleKit</Link>
        </p>
      </footer>
    </div>
  );
}
