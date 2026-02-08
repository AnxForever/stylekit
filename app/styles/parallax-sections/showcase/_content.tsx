"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers, ArrowDown, ChevronDown, Check, X, AlertTriangle, Info, ArrowLeft, Mountain, Waves } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState("fixed");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const colors = [
    { name: "Deep Blue", hex: "#1e3a5f", textColor: "text-white" },
    { name: "Sky", hex: "#3b82f6", textColor: "text-white" },
    { name: "Light Blue", hex: "#93c5fd", textColor: "text-[#1e3a5f]" },
    { name: "Cyan", hex: "#0ea5e9", textColor: "text-white" },
    { name: "White", hex: "#f8fafc", textColor: "text-[#1e3a5f]" },
  ];

  const tabContent: Record<string, { title: string; content: string }> = {
    fixed: { title: "Fixed Backgrounds", content: "Background stays stationary while content scrolls, creating depth." },
    sticky: { title: "Sticky Sections", content: "Elements that stick during scroll for layered reveal effects." },
    fade: { title: "Fade Transitions", content: "Gradient overlays that blend sections together seamlessly." },
  };

  return (
    <div className="min-h-screen">
      {/* Floating Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Docs</span>
          </Link>
          <span className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Parallax
          </span>
          <Link href="/styles" className="text-white/80 hover:text-white transition-colors">
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen bg-fixed bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 50%, #0ea5e9 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/80 via-transparent to-[#1e3a5f]" />
        <div className="relative z-10 text-center px-6">
          <Mountain className="w-16 h-16 mx-auto mb-6 text-white/80" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Parallax Sections
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Immersive scroll experiences with depth and layers
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-white/20 backdrop-blur-md text-white rounded-full font-medium border border-white/30 hover:bg-white/30 transition-all">
              Explore
            </button>
            <button className="px-8 py-3 bg-white text-[#1e3a5f] rounded-full font-medium hover:bg-white/90 transition-colors">
              Learn More
            </button>
          </div>
          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-8 h-8 text-white/60 mx-auto" />
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-32 bg-gradient-to-b from-[#1e3a5f] to-[#3b82f6]" />

      {/* Color Palette Section */}
      <section className="py-20 px-6 bg-[#3b82f6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
                <div className={`h-24 ${color.textColor} flex items-end p-4 font-medium`} style={{ backgroundColor: color.hex }}>
                  {color.name}
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-3 text-center font-mono text-sm text-[#1e3a5f]">{color.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-32 bg-gradient-to-b from-[#3b82f6] to-[#93c5fd]" />

      {/* Buttons Section */}
      <section className="py-20 px-6 bg-[#93c5fd]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8 text-center">Buttons</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-white/20 backdrop-blur-md text-[#1e3a5f] rounded-full font-medium border border-[#1e3a5f]/30 hover:bg-white/40 transition-all shadow-lg">
              Glass
            </button>
            <button className="px-8 py-3 bg-[#1e3a5f] text-white rounded-full font-medium hover:bg-[#1e3a5f]/80 transition-colors shadow-lg">
              Solid
            </button>
            <button className="px-8 py-3 bg-transparent text-[#1e3a5f] rounded-full font-medium border-2 border-[#1e3a5f] hover:bg-[#1e3a5f]/10 transition-colors">
              Outline
            </button>
            <button className="px-8 py-3 text-[#1e3a5f] rounded-full font-medium hover:bg-white/30 transition-colors">
              Ghost
            </button>
          </div>
        </div>
      </section>

      {/* Parallax Section with Fixed BG */}
      <section className="relative min-h-[70vh] bg-fixed bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "linear-gradient(180deg, #0ea5e9 0%, #1e3a5f 100%)" }}>
        <div className="absolute inset-0 bg-[#1e3a5f]/50" />
        <div className="relative z-10 text-center px-6">
          <Waves className="w-12 h-12 mx-auto mb-6 text-white/80" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Depth in Motion</h2>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Fixed backgrounds create a sense of depth as content flows over them
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8 text-center">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Layered", desc: "Create depth with multiple layers" },
              { icon: Mountain, title: "Immersive", desc: "Full-screen scroll experiences" },
              { icon: Waves, title: "Flowing", desc: "Smooth transitions between sections" },
            ].map((card, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-[#1e3a5f]/10">
                <div className="w-14 h-14 rounded-full bg-[#3b82f6]/10 flex items-center justify-center mb-4">
                  <card.icon className="w-7 h-7 text-[#3b82f6]" />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{card.title}</h3>
                <p className="text-[#1e3a5f]/70">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#f8fafc] to-[#93c5fd]">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8 text-center">Contact</h2>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="space-y-4">
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 focus:border-[#3b82f6] focus:outline-none transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-[#1e3a5f] font-medium mb-2">Message</label>
                <textarea className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 focus:border-[#3b82f6] focus:outline-none transition-colors h-24 resize-none" placeholder="Your message..." />
              </div>
              <button className="w-full px-6 py-3 bg-[#1e3a5f] text-white rounded-full font-medium hover:bg-[#1e3a5f]/80 transition-colors shadow-lg">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 px-6 bg-[#1e3a5f]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Parallax Techniques</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm border border-white/10">
            <div className="flex bg-white/10">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-4 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-white text-[#1e3a5f]"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8 bg-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-2">{tabContent[activeTab].title}</h3>
              <p className="text-white/80">{tabContent[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#1e3a5f] to-[#3b82f6]">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Notifications</h2>
          <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <Info className="w-5 h-5 text-[#93c5fd] mt-0.5" />
            <p className="text-white">Background fixed mode creates the parallax effect.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#fbbf24]/10 backdrop-blur-sm rounded-xl border border-[#fbbf24]/30">
            <AlertTriangle className="w-5 h-5 text-[#fbbf24] mt-0.5" />
            <p className="text-white">Mobile devices may fallback to scroll backgrounds.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ef4444]/10 backdrop-blur-sm rounded-xl border border-[#ef4444]/30">
            <X className="w-5 h-5 text-[#ef4444] mt-0.5" />
            <p className="text-white">Avoid too many parallax layers for performance.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#22c55e]/10 backdrop-blur-sm rounded-xl border border-[#22c55e]/30">
            <Check className="w-5 h-5 text-[#22c55e] mt-0.5" />
            <p className="text-white">Smooth scroll behavior enhances the experience.</p>
          </div>
        </div>
      </section>

      {/* Dropdown Section */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8 text-center">Select Section</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-[#1e3a5f]/20 text-left flex items-center justify-between hover:border-[#3b82f6] transition-colors shadow-lg"
            >
              <span className="text-[#1e3a5f]">Choose a section</span>
              <ChevronDown className={`w-5 h-5 text-[#3b82f6] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#1e3a5f]/20 shadow-xl z-10 overflow-hidden">
                {["Hero Section", "Feature Cards", "Testimonials", "Contact Form"].map((item) => (
                  <button key={item} className="w-full px-4 py-3 text-left text-[#1e3a5f] hover:bg-[#93c5fd]/20 transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#f8fafc] to-[#93c5fd]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-8 text-center">Design Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#22c55e]/30 shadow-xl">
              <h3 className="text-xl font-bold text-[#22c55e] mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> Embrace</h3>
              <ul className="space-y-2 text-[#1e3a5f]">
                <li>Full-screen sections (min-h-screen)</li>
                <li>Fixed background attachment</li>
                <li>Gradient transition dividers</li>
                <li>Glassmorphism elements</li>
                <li>Smooth scroll behavior</li>
              </ul>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#ef4444]/30 shadow-xl">
              <h3 className="text-xl font-bold text-[#ef4444] mb-4 flex items-center gap-2"><X className="w-5 h-5" /> Avoid</h3>
              <ul className="space-y-2 text-[#1e3a5f]">
                <li>Scrolling backgrounds on mobile</li>
                <li>Too many parallax layers</li>
                <li>Inconsistent section heights</li>
                <li>Low contrast backgrounds</li>
                <li>Heavy animations per section</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#1e3a5f] text-center">
        <Layers className="w-8 h-8 mx-auto mb-4 text-[#93c5fd]" />
        <p className="text-white">
          Parallax Sections by <Link href="/" className="text-[#93c5fd] hover:underline">StyleKit</Link>
        </p>
      </footer>
    </div>
  );
}
