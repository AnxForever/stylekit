"use client";

import { useState } from "react";
import Link from "next/link";
import { Cog, Settings, Gauge, Compass, ChevronDown, Check, X, AlertTriangle, Info, ArrowLeft } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState("engines");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const colors = [
    { name: "Brass", hex: "#b87333", textColor: "text-white" },
    { name: "Copper", hex: "#8b4513", textColor: "text-white" },
    { name: "Sepia", hex: "#2d1810", textColor: "text-white" },
    { name: "Parchment", hex: "#f4e4bc", textColor: "text-[#2d1810]" },
    { name: "Iron", hex: "#4a4a4a", textColor: "text-white" },
  ];

  const tabContent: Record<string, { title: string; content: string }> = {
    engines: { title: "Steam Engines", content: "The heart of all mechanical contraptions, powered by pressurized water vapor." },
    gears: { title: "Clockwork Gears", content: "Precision-crafted bronze gears that drive the machinery of our age." },
    airships: { title: "Airships", content: "Majestic vessels that traverse the skies, held aloft by hydrogen and propellers." },
  };

  return (
    <div className="min-h-screen bg-[#f4e4bc]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b87333' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
      {/* Navigation */}
      <nav className="border-b-2 border-[#2d1810] bg-[#2d1810]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-2 text-[#b87333] hover:text-[#cd853f] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-serif">Back to Docs</span>
          </Link>
          <span className="font-serif text-xl text-[#f4e4bc] tracking-wide">STEAMPUNK</span>
          <Link href="/styles" className="text-[#b87333] hover:text-[#cd853f] transition-colors font-serif">
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center border-b-2 border-[#2d1810]/20">
        <div className="max-w-4xl mx-auto">
          <Cog className="w-16 h-16 mx-auto mb-6 text-[#b87333]" />
          <h1 className="font-serif text-5xl md:text-6xl text-[#2d1810] mb-4">
            Steampunk
          </h1>
          <p className="text-xl text-[#5c4033] mb-8 font-serif italic">
            Victorian elegance meets industrial revolution machinery
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-[#b87333] text-white font-serif rounded border-2 border-[#8b4513] shadow-[4px_4px_0px_#2d1810] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#2d1810] transition-all">
              Explore
            </button>
            <button className="px-8 py-3 bg-transparent text-[#2d1810] font-serif rounded border-2 border-[#2d1810] hover:bg-[#2d1810] hover:text-[#f4e4bc] transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 px-6 border-b-2 border-[#2d1810]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-[#2d1810] mb-8 text-center">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="border-2 border-[#2d1810] rounded overflow-hidden shadow-[4px_4px_0px_#2d1810]">
                <div className={`h-24 ${color.textColor} flex items-end p-3`} style={{ backgroundColor: color.hex }}>
                  <span className="font-serif text-sm">{color.name}</span>
                </div>
                <div className="bg-[#f4e4bc] p-2 text-center font-mono text-xs text-[#2d1810]">{color.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 px-6 border-b-2 border-[#2d1810]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-[#2d1810] mb-8 text-center">Buttons</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-[#b87333] text-white font-serif rounded border-2 border-[#8b4513] shadow-[4px_4px_0px_#2d1810] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#2d1810] transition-all">
              <Cog className="w-4 h-4 inline mr-2" />Primary
            </button>
            <button className="px-6 py-3 bg-[#2d1810] text-[#f4e4bc] font-serif rounded border-2 border-[#8b4513] shadow-[4px_4px_0px_#b87333] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#b87333] transition-all">
              Secondary
            </button>
            <button className="px-6 py-3 bg-transparent text-[#2d1810] font-serif rounded border-2 border-[#2d1810] hover:bg-[#2d1810] hover:text-[#f4e4bc] transition-colors">
              Outline
            </button>
            <button className="px-6 py-3 text-[#b87333] font-serif hover:text-[#8b4513] transition-colors underline underline-offset-4">
              Ghost
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-6 border-b-2 border-[#2d1810]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-[#2d1810] mb-8 text-center">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Cog, title: "Clockwork", desc: "Precision gears and mechanisms" },
              { icon: Gauge, title: "Pressure", desc: "Steam-powered gauges and dials" },
              { icon: Compass, title: "Navigation", desc: "Brass instruments for exploration" },
            ].map((card, i) => (
              <div key={i} className="bg-[#f4e4bc] border-2 border-[#2d1810] rounded p-6 shadow-[6px_6px_0px_#2d1810] hover:shadow-[8px_8px_0px_#b87333] transition-shadow">
                <card.icon className="w-10 h-10 text-[#b87333] mb-4" />
                <h3 className="font-serif text-xl text-[#2d1810] mb-2">{card.title}</h3>
                <p className="text-[#5c4033] font-serif">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6 border-b-2 border-[#2d1810]/20">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-3xl text-[#2d1810] mb-8 text-center">Telegraph Form</h2>
          <div className="bg-[#f4e4bc] border-2 border-[#2d1810] rounded p-6 shadow-[6px_6px_0px_#2d1810]">
            <div className="space-y-4">
              <div>
                <label className="block font-serif text-[#2d1810] mb-2">Sender Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border-2 border-[#2d1810] rounded font-serif focus:border-[#b87333] focus:outline-none" placeholder="Your name..." />
              </div>
              <div>
                <label className="block font-serif text-[#2d1810] mb-2">Message</label>
                <textarea className="w-full px-4 py-3 bg-white border-2 border-[#2d1810] rounded font-serif focus:border-[#b87333] focus:outline-none h-24 resize-none" placeholder="Your message..." />
              </div>
              <button className="w-full px-6 py-3 bg-[#b87333] text-white font-serif rounded border-2 border-[#8b4513] shadow-[4px_4px_0px_#2d1810] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#2d1810] transition-all">
                Send Telegraph
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 px-6 border-b-2 border-[#2d1810]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-[#2d1810] mb-8 text-center">Machinery Catalog</h2>
          <div className="border-2 border-[#2d1810] rounded overflow-hidden shadow-[6px_6px_0px_#2d1810]">
            <div className="flex border-b-2 border-[#2d1810] bg-[#2d1810]">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 font-serif capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-[#b87333] text-white"
                      : "text-[#f4e4bc] hover:bg-[#b87333]/20"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 bg-[#f4e4bc]">
              <h3 className="font-serif text-xl text-[#2d1810] mb-2">{tabContent[activeTab].title}</h3>
              <p className="text-[#5c4033] font-serif">{tabContent[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 px-6 border-b-2 border-[#2d1810]/20">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl text-[#2d1810] mb-8 text-center">System Alerts</h2>
          <div className="flex items-start gap-3 p-4 bg-[#b87333]/10 border-2 border-[#b87333] rounded">
            <Info className="w-5 h-5 text-[#b87333] mt-0.5" />
            <div><p className="font-serif text-[#2d1810]">Steam pressure nominal. All systems operational.</p></div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fbbf24]/10 border-2 border-[#fbbf24] rounded">
            <AlertTriangle className="w-5 h-5 text-[#b87333] mt-0.5" />
            <div><p className="font-serif text-[#2d1810]">Warning: Coal reserves running low.</p></div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ef4444]/10 border-2 border-[#ef4444] rounded">
            <X className="w-5 h-5 text-[#ef4444] mt-0.5" />
            <div><p className="font-serif text-[#2d1810]">Critical: Boiler pressure exceeds safe limits!</p></div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#22c55e]/10 border-2 border-[#22c55e] rounded">
            <Check className="w-5 h-5 text-[#22c55e] mt-0.5" />
            <div><p className="font-serif text-[#2d1810]">Success: Transmission complete via telegraph.</p></div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 px-6 border-b-2 border-[#2d1810]/20">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-3xl text-[#2d1810] mb-8 text-center">Mechanism Selector</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-[#f4e4bc] border-2 border-[#2d1810] rounded font-serif text-left flex items-center justify-between shadow-[4px_4px_0px_#2d1810]"
            >
              <span className="text-[#2d1810]">Select Mechanism</span>
              <ChevronDown className={`w-5 h-5 text-[#b87333] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#f4e4bc] border-2 border-[#2d1810] rounded shadow-[4px_4px_0px_#2d1810] z-10">
                {["Clockwork Assembly", "Steam Regulator", "Pressure Valve", "Gear Train"].map((item) => (
                  <button key={item} className="w-full px-4 py-3 text-left font-serif text-[#2d1810] hover:bg-[#b87333] hover:text-white transition-colors border-b border-[#2d1810]/20 last:border-0">
                    <Settings className="w-4 h-4 inline mr-2" />{item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="py-16 px-6 border-b-2 border-[#2d1810]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-[#2d1810] mb-8 text-center">Design Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#f4e4bc] border-2 border-[#22c55e] rounded p-6">
              <h3 className="font-serif text-xl text-[#22c55e] mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> Required</h3>
              <ul className="space-y-2 font-serif text-[#2d1810]">
                <li>Serif typography throughout</li>
                <li>Brass and copper color palette</li>
                <li>Hard shadow effects (4-6px offset)</li>
                <li>Gear and mechanical motifs</li>
                <li>Parchment textures</li>
              </ul>
            </div>
            <div className="bg-[#f4e4bc] border-2 border-[#ef4444] rounded p-6">
              <h3 className="font-serif text-xl text-[#ef4444] mb-4 flex items-center gap-2"><X className="w-5 h-5" /> Forbidden</h3>
              <ul className="space-y-2 font-serif text-[#2d1810]">
                <li>Neon or bright colors</li>
                <li>Sans-serif fonts</li>
                <li>Soft gradients or blur effects</li>
                <li>Minimalist flat design</li>
                <li>Modern UI patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#2d1810] text-center">
        <Cog className="w-8 h-8 mx-auto mb-4 text-[#b87333]" />
        <p className="font-serif text-[#f4e4bc]">
          Steampunk Style by <Link href="/" className="text-[#b87333] hover:underline">StyleKit</Link>
        </p>
      </footer>
    </div>
  );
}
