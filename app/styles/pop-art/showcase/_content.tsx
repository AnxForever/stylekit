"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Star, Circle, ChevronDown, Check, X, AlertTriangle, Info, ArrowLeft } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState("warhol");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const colors = [
    { name: "Hot Pink", hex: "#ff0066", textColor: "text-white" },
    { name: "Electric Yellow", hex: "#ffff00", textColor: "text-black" },
    { name: "Cyan", hex: "#00ccff", textColor: "text-black" },
    { name: "Orange", hex: "#ff6600", textColor: "text-white" },
    { name: "Purple", hex: "#cc00ff", textColor: "text-white" },
  ];

  const tabContent: Record<string, { title: string; content: string }> = {
    warhol: { title: "Andy Warhol", content: "Repetition and mass production transformed into high art." },
    lichtenstein: { title: "Roy Lichtenstein", content: "Comic book aesthetics with Ben-Day dots and bold outlines." },
    haring: { title: "Keith Haring", content: "Bold lines, vibrant colors, and energetic figures in motion." },
  };

  return (
    <div className="min-h-screen bg-[#ffff00]" style={{ backgroundImage: "radial-gradient(circle, #ff0066 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
      {/* Navigation */}
      <nav className="border-b-4 border-black bg-[#00ccff] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/styles/pop-art" className="flex items-center gap-2 text-black font-bold hover:text-[#ff0066] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="uppercase tracking-wider">Back</span>
          </Link>
          <span className="text-2xl font-black text-black uppercase tracking-widest">POP ART</span>
          <Link href="/styles" className="text-black font-bold hover:text-[#ff0066] transition-colors uppercase tracking-wider">
            Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center border-b-4 border-black bg-[#ff0066]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-4 mb-6">
            <Star className="w-12 h-12 text-[#ffff00]" />
            <Zap className="w-12 h-12 text-[#00ccff]" />
            <Star className="w-12 h-12 text-[#ffff00]" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase mb-4" style={{ textShadow: "4px 4px 0px #000" }}>
            POP ART!
          </h1>
          <p className="text-xl text-white font-bold mb-8 uppercase tracking-wider">
            Bold. Vibrant. Iconic.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-[#ffff00] text-black font-black uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all">
              WOW!
            </button>
            <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all">
              BOOM!
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 px-6 border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-black mb-8 text-center uppercase">Colors!</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="border-4 border-black overflow-hidden shadow-[6px_6px_0px_#000]">
                <div className={`h-28 ${color.textColor} flex items-center justify-center font-black text-lg uppercase`} style={{ backgroundColor: color.hex }}>
                  {color.name}
                </div>
                <div className="bg-white p-2 text-center font-mono text-sm text-black border-t-4 border-black">{color.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 px-6 border-b-4 border-black bg-[#cc00ff]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-8 text-center uppercase" style={{ textShadow: "3px 3px 0px #000" }}>Buttons!</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-[#ff0066] text-white font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Click Me!
            </button>
            <button className="px-6 py-3 bg-[#ffff00] text-black font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Wow!
            </button>
            <button className="px-6 py-3 bg-[#00ccff] text-black font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Cool!
            </button>
            <button className="px-6 py-3 bg-white text-black font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
              Nice!
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-6 border-b-4 border-black bg-[#ffff00]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-black mb-8 text-center uppercase">Cards!</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { bg: "#ff0066", title: "POW!", desc: "Bold impact statement" },
              { bg: "#00ccff", title: "ZAP!", desc: "Electric energy vibes" },
              { bg: "#cc00ff", title: "BAM!", desc: "Dynamic movement" },
            ].map((card, i) => (
              <div key={i} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all">
                <div className="w-16 h-16 rounded-full border-4 border-black mb-4 flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-black mb-2">{card.title}</h3>
                <p className="text-black font-bold uppercase tracking-wider">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6 border-b-4 border-black bg-[#00ccff]">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-black text-black mb-8 text-center uppercase">Contact!</h2>
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
            <div className="space-y-4">
              <div>
                <label className="block font-black text-black mb-2 uppercase">Name</label>
                <input type="text" className="w-full px-4 py-3 bg-[#ffff00] border-4 border-black font-bold focus:bg-[#ff0066] focus:text-white focus:outline-none transition-colors" placeholder="YOUR NAME!" />
              </div>
              <div>
                <label className="block font-black text-black mb-2 uppercase">Message</label>
                <textarea className="w-full px-4 py-3 bg-[#ffff00] border-4 border-black font-bold focus:bg-[#ff0066] focus:text-white focus:outline-none transition-colors h-24 resize-none" placeholder="SAY SOMETHING!" />
              </div>
              <button className="w-full px-6 py-4 bg-[#ff0066] text-white font-black uppercase border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                SEND IT!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 px-6 border-b-4 border-black bg-[#ff6600]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-8 text-center uppercase" style={{ textShadow: "3px 3px 0px #000" }}>Artists!</h2>
          <div className="border-4 border-black overflow-hidden shadow-[8px_8px_0px_#000]">
            <div className="flex border-b-4 border-black">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-4 font-black uppercase tracking-wider transition-colors border-r-4 border-black last:border-r-0 ${
                    activeTab === tab
                      ? "bg-[#ff0066] text-white"
                      : "bg-white text-black hover:bg-[#ffff00]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-black text-black mb-2">{tabContent[activeTab].title}</h3>
              <p className="text-black font-bold">{tabContent[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 px-6 border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-black mb-8 text-center uppercase">Badges!</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="px-4 py-2 bg-[#ff0066] text-white font-black uppercase border-4 border-black">HOT!</span>
            <span className="px-4 py-2 bg-[#ffff00] text-black font-black uppercase border-4 border-black">NEW!</span>
            <span className="px-4 py-2 bg-[#00ccff] text-black font-black uppercase border-4 border-black">COOL!</span>
            <span className="px-4 py-2 bg-[#cc00ff] text-white font-black uppercase border-4 border-black">WOW!</span>
            <span className="px-4 py-2 bg-[#ff6600] text-white font-black uppercase border-4 border-black">SALE!</span>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 px-6 border-b-4 border-black bg-[#ffff00]">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-4xl font-black text-black mb-8 text-center uppercase">Alerts!</h2>
          <div className="flex items-center gap-3 p-4 bg-[#00ccff] border-4 border-black">
            <Info className="w-6 h-6 text-black" />
            <p className="font-black text-black uppercase">Info: Something interesting happened!</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#ff6600] border-4 border-black">
            <AlertTriangle className="w-6 h-6 text-black" />
            <p className="font-black text-black uppercase">Warning: Watch out for this!</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#ff0066] border-4 border-black">
            <X className="w-6 h-6 text-white" />
            <p className="font-black text-white uppercase">Error: Oops! Something went wrong!</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-[#22c55e] border-4 border-black">
            <Check className="w-6 h-6 text-white" />
            <p className="font-black text-white uppercase">Success: You did it!</p>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 px-6 border-b-4 border-black bg-[#cc00ff]">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-black text-white mb-8 text-center uppercase" style={{ textShadow: "3px 3px 0px #000" }}>Select!</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-4 bg-white border-4 border-black font-black text-left flex items-center justify-between shadow-[6px_6px_0px_#000] uppercase"
            >
              <span>Choose Style!</span>
              <ChevronDown className={`w-6 h-6 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-black shadow-[6px_6px_0px_#000] z-10">
                {["Warhol Style", "Lichtenstein Dots", "Haring Lines", "Basquiat Raw"].map((item, i) => (
                  <button key={item} className={`w-full px-4 py-3 text-left font-black uppercase hover:bg-[#ffff00] transition-colors border-b-4 border-black last:border-0 ${i % 2 === 0 ? "bg-[#00ccff]" : "bg-[#ff0066] text-white hover:text-black"}`}>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 px-6 border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-black mb-8 text-center uppercase">Rules!</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#22c55e] border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2"><Check className="w-6 h-6" /> DO!</h3>
              <ul className="space-y-2 font-bold text-white uppercase">
                <li>Bold primary colors</li>
                <li>Thick black outlines</li>
                <li>Ben-Day dot patterns</li>
                <li>Comic book typography</li>
                <li>Hard shadow effects</li>
              </ul>
            </div>
            <div className="bg-[#ef4444] border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2"><X className="w-6 h-6" /> DON&apos;T!</h3>
              <ul className="space-y-2 font-bold text-white uppercase">
                <li>Subtle pastel colors</li>
                <li>Thin delicate lines</li>
                <li>Soft gradients</li>
                <li>Minimalist design</li>
                <li>Muted tones</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-black text-center border-t-4 border-[#ff0066]">
        <div className="flex justify-center gap-2 mb-4">
          <Circle className="w-6 h-6 text-[#ff0066] fill-[#ff0066]" />
          <Circle className="w-6 h-6 text-[#ffff00] fill-[#ffff00]" />
          <Circle className="w-6 h-6 text-[#00ccff] fill-[#00ccff]" />
        </div>
        <p className="font-black text-white uppercase tracking-wider">
          Pop Art Style by <Link href="/" className="text-[#ff0066] hover:underline">StyleKit</Link>
        </p>
      </footer>
    </div>
  );
}
