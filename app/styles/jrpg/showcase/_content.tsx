"use client";

import { useState } from "react";
import Link from "next/link";
import { Sword, Shield, Sparkles, Heart, Star, ChevronDown, Check, X, AlertTriangle, Info, ArrowLeft, Zap } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState("status");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const colors = [
    { name: "Royal Blue", hex: "#1a1a2e", textColor: "text-white" },
    { name: "Gold", hex: "#fbbf24", textColor: "text-black" },
    { name: "Crystal", hex: "#8b5cf6", textColor: "text-white" },
    { name: "HP Red", hex: "#ef4444", textColor: "text-white" },
    { name: "Parchment", hex: "#eef2ff", textColor: "text-[#1a1a2e]" },
  ];

  const tabContent: Record<string, { title: string; content: string }> = {
    status: { title: "Character Status", content: "HP: 450/500 | MP: 120/150 | EXP: 2,450/3,000" },
    skills: { title: "Skill Tree", content: "Fire Magic Lv.5 | Ice Magic Lv.3 | Heal Lv.7" },
    inventory: { title: "Inventory", content: "Potion x12 | Elixir x3 | Phoenix Down x1" },
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #2d2d4a 0%, #1a1a2e 100%)" }}>
      {/* Navigation */}
      <nav className="border-b-2 border-[#fbbf24]/30 bg-[#1a1a2e]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-bold">Back</span>
          </Link>
          <span className="text-xl font-bold text-[#fbbf24] flex items-center gap-2 tracking-wider">
            <Star className="w-5 h-5" />
            JRPG
          </span>
          <Link href="/styles" className="text-[#fbbf24] hover:text-[#f59e0b] transition-colors font-bold">
            Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center border-b-2 border-[#fbbf24]/20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4 mb-6">
            <Sparkles className="w-12 h-12 text-[#8b5cf6]" />
            <Sword className="w-12 h-12 text-[#fbbf24]" />
            <Sparkles className="w-12 h-12 text-[#8b5cf6]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ textShadow: "0 0 20px rgba(251, 191, 36, 0.5)" }}>
            JRPG Style
          </h1>
          <p className="text-xl text-[#8b5cf6] mb-8 italic">
            Embark on an epic adventure with classic RPG aesthetics
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#1a1a2e] font-bold rounded-lg border-2 border-[#fbbf24] shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all">
              <Sword className="w-4 h-4 inline mr-2" />New Game
            </button>
            <button className="px-8 py-3 bg-transparent text-[#8b5cf6] font-bold rounded-lg border-2 border-[#8b5cf6] hover:bg-[#8b5cf6]/10 transition-colors">
              <Shield className="w-4 h-4 inline mr-2" />Continue
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 px-6 border-b-2 border-[#fbbf24]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#fbbf24] mb-8 text-center">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="rounded-lg overflow-hidden border-2 border-[#fbbf24]/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
                <div className={`h-24 ${color.textColor} flex items-end p-3 font-bold`} style={{ backgroundColor: color.hex }}>
                  {color.name}
                </div>
                <div className="bg-[#1a1a2e] p-2 text-center font-mono text-sm text-[#fbbf24]">{color.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 px-6 border-b-2 border-[#fbbf24]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#fbbf24] mb-8 text-center">Action Buttons</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#1a1a2e] font-bold rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-all">
              <Sword className="w-4 h-4 inline mr-2" />Attack
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all">
              <Sparkles className="w-4 h-4 inline mr-2" />Magic
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white font-bold rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all">
              <Heart className="w-4 h-4 inline mr-2" />Heal
            </button>
            <button className="px-6 py-3 bg-transparent text-[#fbbf24] font-bold rounded-lg border-2 border-[#fbbf24]/50 hover:border-[#fbbf24] hover:bg-[#fbbf24]/10 transition-all">
              <Shield className="w-4 h-4 inline mr-2" />Defend
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-6 border-b-2 border-[#fbbf24]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#fbbf24] mb-8 text-center">Character Classes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sword, title: "Warrior", desc: "Master of physical combat", color: "#ef4444", stats: "ATK: 95 | DEF: 80" },
              { icon: Sparkles, title: "Mage", desc: "Wielder of arcane magic", color: "#8b5cf6", stats: "MAG: 98 | MP: 150" },
              { icon: Heart, title: "Healer", desc: "Guardian of life force", color: "#22c55e", stats: "HLG: 90 | SPD: 70" },
            ].map((card, i) => (
              <div key={i} className="bg-[#1a1a2e] border-2 border-[#fbbf24]/30 rounded-lg p-6 shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:shadow-[0_0_30px_rgba(251,191,36,0.2)] hover:border-[#fbbf24]/60 transition-all">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 border-2" style={{ borderColor: card.color, backgroundColor: card.color + "20" }}>
                  <card.icon className="w-7 h-7" style={{ color: card.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                <p className="text-[#8b5cf6] text-sm mb-3">{card.desc}</p>
                <p className="text-[#fbbf24] font-mono text-xs">{card.stats}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Form */}
      <section className="py-16 px-6 border-b-2 border-[#fbbf24]/20">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-[#fbbf24] mb-8 text-center">Character Creation</h2>
          <div className="bg-[#1a1a2e] border-2 border-[#fbbf24]/30 rounded-lg p-6 shadow-[0_0_20px_rgba(251,191,36,0.1)]">
            <div className="space-y-4">
              <div>
                <label className="block text-[#fbbf24] font-bold mb-2">Hero Name</label>
                <input type="text" className="w-full px-4 py-3 bg-[#2d2d4a] text-white rounded-lg border-2 border-[#fbbf24]/30 focus:border-[#fbbf24] focus:outline-none focus:shadow-[0_0_10px_rgba(251,191,36,0.3)] transition-all" placeholder="Enter name..." />
              </div>
              <div>
                <label className="block text-[#fbbf24] font-bold mb-2">Class</label>
                <select className="w-full px-4 py-3 bg-[#2d2d4a] text-white rounded-lg border-2 border-[#fbbf24]/30 focus:border-[#fbbf24] focus:outline-none transition-all">
                  <option>Warrior</option>
                  <option>Mage</option>
                  <option>Healer</option>
                  <option>Thief</option>
                </select>
              </div>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-[#1a1a2e] font-bold rounded-lg shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-all">
                <Star className="w-4 h-4 inline mr-2" />Create Hero
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Status Tabs */}
      <section className="py-16 px-6 border-b-2 border-[#fbbf24]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#fbbf24] mb-8 text-center">Menu System</h2>
          <div className="border-2 border-[#fbbf24]/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.1)]">
            <div className="flex border-b-2 border-[#fbbf24]/30 bg-[#2d2d4a]">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-4 font-bold capitalize transition-all ${
                    activeTab === tab
                      ? "bg-[#fbbf24] text-[#1a1a2e]"
                      : "text-[#fbbf24] hover:bg-[#fbbf24]/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 bg-[#1a1a2e]">
              <h3 className="text-xl font-bold text-white mb-2">{tabContent[activeTab].title}</h3>
              <p className="text-[#8b5cf6] font-mono">{tabContent[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* HP/MP Bars */}
      <section className="py-16 px-6 border-b-2 border-[#fbbf24]/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-[#fbbf24] mb-8 text-center">Status Bars</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-white font-bold mb-1">
                <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-[#ef4444]" />HP</span>
                <span>450 / 500</span>
              </div>
              <div className="h-6 bg-[#2d2d4a] rounded-full overflow-hidden border-2 border-[#ef4444]/30">
                <div className="h-full bg-gradient-to-r from-[#ef4444] to-[#f87171] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" style={{ width: "90%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-white font-bold mb-1">
                <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#8b5cf6]" />MP</span>
                <span>80 / 150</span>
              </div>
              <div className="h-6 bg-[#2d2d4a] rounded-full overflow-hidden border-2 border-[#8b5cf6]/30">
                <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" style={{ width: "53%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-white font-bold mb-1">
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#fbbf24]" />EXP</span>
                <span>2,450 / 3,000</span>
              </div>
              <div className="h-6 bg-[#2d2d4a] rounded-full overflow-hidden border-2 border-[#fbbf24]/30">
                <div className="h-full bg-gradient-to-r from-[#fbbf24] to-[#fcd34d] rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" style={{ width: "82%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 px-6 border-b-2 border-[#fbbf24]/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-[#fbbf24] mb-8 text-center">System Messages</h2>
          <div className="flex items-start gap-3 p-4 bg-[#8b5cf6]/10 rounded-lg border-2 border-[#8b5cf6]/30">
            <Info className="w-5 h-5 text-[#8b5cf6] mt-0.5" />
            <p className="text-white">Quest Updated: Speak with the village elder.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fbbf24]/10 rounded-lg border-2 border-[#fbbf24]/30">
            <AlertTriangle className="w-5 h-5 text-[#fbbf24] mt-0.5" />
            <p className="text-white">Warning: Low HP! Use a potion!</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ef4444]/10 rounded-lg border-2 border-[#ef4444]/30">
            <X className="w-5 h-5 text-[#ef4444] mt-0.5" />
            <p className="text-white">Game Over! You have fallen in battle.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#22c55e]/10 rounded-lg border-2 border-[#22c55e]/30">
            <Check className="w-5 h-5 text-[#22c55e] mt-0.5" />
            <p className="text-white">Victory! Gained 500 EXP and 200 Gold!</p>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 px-6 border-b-2 border-[#fbbf24]/20">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-[#fbbf24] mb-8 text-center">Item Select</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-[#2d2d4a] rounded-lg border-2 border-[#fbbf24]/30 text-left flex items-center justify-between hover:border-[#fbbf24] transition-colors"
            >
              <span className="text-white font-bold">Select Item</span>
              <ChevronDown className={`w-5 h-5 text-[#fbbf24] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#2d2d4a] rounded-lg border-2 border-[#fbbf24]/30 shadow-[0_0_20px_rgba(251,191,36,0.2)] z-10 overflow-hidden">
                {["Potion x12", "Hi-Potion x5", "Elixir x3", "Phoenix Down x1"].map((item) => (
                  <button key={item} className="w-full px-4 py-3 text-left text-white font-bold hover:bg-[#fbbf24] hover:text-[#1a1a2e] transition-colors border-b border-[#fbbf24]/20 last:border-0">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 px-6 border-b-2 border-[#fbbf24]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#fbbf24] mb-8 text-center">Design Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a2e] border-2 border-[#22c55e]/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#22c55e] mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> Required</h3>
              <ul className="space-y-2 text-white">
                <li>Dark fantasy color palette</li>
                <li>Ornate borders and frames</li>
                <li>Glowing/magical effects</li>
                <li>Status bar UI elements</li>
                <li>Bold action typography</li>
              </ul>
            </div>
            <div className="bg-[#1a1a2e] border-2 border-[#ef4444]/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#ef4444] mb-4 flex items-center gap-2"><X className="w-5 h-5" /> Forbidden</h3>
              <ul className="space-y-2 text-white">
                <li>Minimalist flat design</li>
                <li>Muted/pastel colors</li>
                <li>Modern corporate style</li>
                <li>Simple geometric shapes</li>
                <li>Sans-serif only typography</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#1a1a2e] text-center border-t-2 border-[#fbbf24]/30">
        <Star className="w-8 h-8 mx-auto mb-4 text-[#fbbf24]" />
        <p className="text-white font-bold">
          JRPG Style by <Link href="/" className="text-[#fbbf24] hover:underline">StyleKit</Link>
        </p>
      </footer>
    </div>
  );
}
