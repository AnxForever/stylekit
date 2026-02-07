"use client";

import { useState } from "react";
import Link from "next/link";
import { Grid3X3, Layers, Move, ChevronDown, Check, X, AlertTriangle, Info, ArrowLeft } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState("overlap");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const colors = [
    { name: "Black", hex: "#0f0f0f", textColor: "text-white" },
    { name: "White", hex: "#ffffff", textColor: "text-black" },
    { name: "Hot Pink", hex: "#ff3366", textColor: "text-white" },
    { name: "Cyan", hex: "#00d4ff", textColor: "text-black" },
    { name: "Yellow", hex: "#ffcc00", textColor: "text-black" },
  ];

  const tabContent: Record<string, { title: string; content: string }> = {
    overlap: { title: "Overlapping Elements", content: "Create depth by letting elements break grid boundaries and overlap." },
    tension: { title: "Visual Tension", content: "Use unequal spacing and off-center placement to create dynamic energy." },
    contrast: { title: "Scale Contrast", content: "Combine dramatically different sizes to establish visual hierarchy." },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b-2 border-[#0f0f0f] bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-2 text-[#0f0f0f] hover:text-[#ff3366] transition-colors uppercase tracking-widest text-sm font-bold">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-2xl font-bold text-[#0f0f0f] tracking-tighter">ASYMM.</span>
          <Link href="/styles" className="text-[#0f0f0f] hover:text-[#ff3366] transition-colors uppercase tracking-widest text-sm font-bold">
            Styles
          </Link>
        </div>
      </nav>

      {/* Hero - Asymmetric */}
      <section className="min-h-[80vh] grid grid-cols-12 border-b-2 border-[#0f0f0f]">
        <div className="col-span-8 bg-[#0f0f0f] p-8 md:p-16 flex flex-col justify-end">
          <h1 className="text-5xl md:text-8xl font-bold text-white leading-none mb-6">
            BREAK<br/>THE<br/>GRID
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-md">
            Asymmetric layouts create visual tension and dynamic compositions
          </p>
        </div>
        <div className="col-span-4 flex flex-col">
          <div className="flex-1 bg-[#ff3366] p-8 flex items-center">
            <Grid3X3 className="w-16 h-16 text-white" />
          </div>
          <div className="flex-1 bg-[#ffcc00] p-8 flex items-center -translate-x-8 z-10 border-2 border-[#0f0f0f]">
            <span className="text-[#0f0f0f] font-bold uppercase tracking-widest">Offset</span>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 px-6 border-b-2 border-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0f0f0f] mb-8 uppercase tracking-tight">Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors.map((color, i) => (
              <div key={color.name} className={`border-2 border-[#0f0f0f] overflow-hidden ${i % 2 === 1 ? "-rotate-1" : "rotate-1"} hover:rotate-0 transition-transform`}>
                <div className={`h-28 ${color.textColor} flex items-end p-4 font-bold uppercase tracking-widest text-sm`} style={{ backgroundColor: color.hex }}>
                  {color.name}
                </div>
                <div className="bg-white p-3 text-center font-mono text-sm text-[#0f0f0f] border-t-2 border-[#0f0f0f]">{color.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 px-6 border-b-2 border-[#0f0f0f] bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 uppercase tracking-tight">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white text-[#0f0f0f] font-bold uppercase tracking-widest border-2 border-[#0f0f0f] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#ff3366] transition-all">
              Primary
            </button>
            <button className="px-8 py-4 bg-[#ff3366] text-white font-bold uppercase tracking-widest border-2 border-[#0f0f0f] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#ffcc00] transition-all">
              Accent
            </button>
            <button className="px-8 py-4 bg-transparent text-white font-bold uppercase tracking-widest border-2 border-white hover:bg-white hover:text-[#0f0f0f] transition-all">
              Outline
            </button>
            <button className="px-8 py-4 text-[#00d4ff] font-bold uppercase tracking-widest hover:text-white transition-colors underline underline-offset-8">
              Ghost
            </button>
          </div>
        </div>
      </section>

      {/* Cards - Asymmetric Grid */}
      <section className="py-16 px-6 border-b-2 border-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0f0f0f] mb-8 uppercase tracking-tight">Cards</h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5 bg-white border-2 border-[#0f0f0f] p-8 -rotate-1 hover:rotate-0 transition-transform z-10 shadow-[8px_8px_0px_#0f0f0f]">
              <Layers className="w-10 h-10 text-[#ff3366] mb-4" />
              <h3 className="text-2xl font-bold text-[#0f0f0f] mb-2">Overlap</h3>
              <p className="text-gray-600">Elements that break boundaries create depth</p>
            </div>
            <div className="col-span-7 row-span-2 bg-[#ff3366] border-2 border-[#0f0f0f] p-8 flex flex-col justify-end shadow-[8px_8px_0px_#0f0f0f]">
              <h3 className="text-4xl font-bold text-white mb-2">Tension</h3>
              <p className="text-white/80">Asymmetry creates dynamic visual energy</p>
            </div>
            <div className="col-span-5 bg-[#ffcc00] border-2 border-[#0f0f0f] p-8 translate-x-4 rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0px_#0f0f0f]">
              <Move className="w-10 h-10 text-[#0f0f0f] mb-4" />
              <h3 className="text-2xl font-bold text-[#0f0f0f] mb-2">Offset</h3>
              <p className="text-[#0f0f0f]/70">Unexpected placement draws attention</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6 border-b-2 border-[#0f0f0f] bg-[#0f0f0f]">
        <div className="max-w-lg mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 uppercase tracking-tight">Contact</h2>
          <div className="bg-white border-2 border-[#0f0f0f] p-8 -rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0px_#ff3366]">
            <div className="space-y-6">
              <div className="relative">
                <label className="absolute -top-3 left-4 bg-white px-2 text-xs uppercase tracking-widest text-[#0f0f0f] font-bold">Email</label>
                <input type="email" className="w-full px-4 py-4 bg-transparent border-2 border-[#0f0f0f] focus:border-[#ff3366] focus:outline-none transition-colors font-mono" placeholder="your@email.com" />
              </div>
              <div className="relative">
                <label className="absolute -top-3 left-4 bg-white px-2 text-xs uppercase tracking-widest text-[#0f0f0f] font-bold">Message</label>
                <textarea className="w-full px-4 py-4 bg-transparent border-2 border-[#0f0f0f] focus:border-[#ff3366] focus:outline-none transition-colors font-mono h-24 resize-none" placeholder="Your message..." />
              </div>
              <button className="w-full px-6 py-4 bg-[#0f0f0f] text-white font-bold uppercase tracking-widest border-2 border-[#0f0f0f] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#ff3366] transition-all">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 px-6 border-b-2 border-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0f0f0f] mb-8 uppercase tracking-tight">Principles</h2>
          <div className="border-2 border-[#0f0f0f] shadow-[8px_8px_0px_#0f0f0f]">
            <div className="flex border-b-2 border-[#0f0f0f]">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-4 font-bold uppercase tracking-widest text-sm transition-colors border-r-2 border-[#0f0f0f] last:border-r-0 ${
                    activeTab === tab
                      ? "bg-[#ff3366] text-white"
                      : "bg-white text-[#0f0f0f] hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8 bg-white">
              <h3 className="text-2xl font-bold text-[#0f0f0f] mb-2">{tabContent[activeTab].title}</h3>
              <p className="text-gray-600">{tabContent[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 px-6 border-b-2 border-[#0f0f0f] bg-[#ffcc00]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0f0f0f] mb-8 uppercase tracking-tight">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-[#0f0f0f] text-white font-bold uppercase tracking-widest text-sm">Featured</span>
            <span className="px-4 py-2 bg-white text-[#0f0f0f] font-bold uppercase tracking-widest text-sm border-2 border-[#0f0f0f]">New</span>
            <span className="px-4 py-2 bg-[#ff3366] text-white font-bold uppercase tracking-widest text-sm border-2 border-[#0f0f0f]">Hot</span>
            <span className="px-4 py-2 bg-[#00d4ff] text-[#0f0f0f] font-bold uppercase tracking-widest text-sm border-2 border-[#0f0f0f]">Cool</span>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 px-6 border-b-2 border-[#0f0f0f]">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-[#0f0f0f] mb-8 uppercase tracking-tight">Alerts</h2>
          <div className="flex items-start gap-3 p-4 bg-[#00d4ff]/10 border-2 border-[#00d4ff]">
            <Info className="w-5 h-5 text-[#00d4ff] mt-0.5" />
            <p className="text-[#0f0f0f] font-bold">Information: Breaking the grid creates visual interest.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ffcc00]/10 border-2 border-[#ffcc00]">
            <AlertTriangle className="w-5 h-5 text-[#f59e0b] mt-0.5" />
            <p className="text-[#0f0f0f] font-bold">Warning: Maintain readability despite asymmetry.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ff3366]/10 border-2 border-[#ff3366]">
            <X className="w-5 h-5 text-[#ff3366] mt-0.5" />
            <p className="text-[#0f0f0f] font-bold">Error: Avoid chaotic layouts without purpose.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#22c55e]/10 border-2 border-[#22c55e]">
            <Check className="w-5 h-5 text-[#22c55e] mt-0.5" />
            <p className="text-[#0f0f0f] font-bold">Success: Tension creates engaging compositions.</p>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 px-6 border-b-2 border-[#0f0f0f] bg-[#0f0f0f]">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 uppercase tracking-tight">Select</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-4 bg-white border-2 border-[#0f0f0f] font-bold text-left flex items-center justify-between uppercase tracking-widest shadow-[4px_4px_0px_#ff3366]"
            >
              <span>Choose Layout</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#0f0f0f] shadow-[4px_4px_0px_#0f0f0f] z-10">
                {["5/7 Split", "4/8 Split", "3/9 Split", "Overlapping"].map((item) => (
                  <button key={item} className="w-full px-4 py-3 text-left font-bold uppercase tracking-widest text-sm hover:bg-[#ff3366] hover:text-white transition-colors border-b-2 border-[#0f0f0f] last:border-0">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 px-6 border-b-2 border-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0f0f0f] mb-8 uppercase tracking-tight">Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-[#22c55e] p-6 -rotate-1 hover:rotate-0 transition-transform">
              <h3 className="text-xl font-bold text-[#22c55e] mb-4 flex items-center gap-2 uppercase tracking-widest"><Check className="w-5 h-5" /> Do</h3>
              <ul className="space-y-2 text-[#0f0f0f] font-bold">
                <li>Unequal column widths</li>
                <li>Element overlap with z-index</li>
                <li>Offset shadows (4px+)</li>
                <li>Sharp edges, no rounded corners</li>
                <li>Bold uppercase typography</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-[#ff3366] p-6 rotate-1 hover:rotate-0 transition-transform">
              <h3 className="text-xl font-bold text-[#ff3366] mb-4 flex items-center gap-2 uppercase tracking-widest"><X className="w-5 h-5" /> Don&apos;t</h3>
              <ul className="space-y-2 text-[#0f0f0f] font-bold">
                <li>Symmetrical equal grids</li>
                <li>Rounded corners</li>
                <li>Soft drop shadows</li>
                <li>Centered everything</li>
                <li>Uniform spacing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#0f0f0f] text-center">
        <Grid3X3 className="w-8 h-8 mx-auto mb-4 text-[#ff3366]" />
        <p className="text-white font-bold uppercase tracking-widest">
          Asymmetric Grid by <Link href="/" className="text-[#ff3366] hover:underline">StyleKit</Link>
        </p>
      </footer>
    </div>
  );
}
