"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Leaf, Sun, Droplets, Mountain, Check, X, AlertTriangle, Info, ChevronDown, User } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);

  return (
    <div className="min-h-screen bg-[#faf6f1] text-stone-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#faf6f1]/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link
            href="/styles/natural-organic"
            className="font-serif text-stone-600 text-sm md:text-base hover:text-[#8b9d77] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Back</span>
          </Link>
          <div className="font-serif text-stone-700 text-sm md:text-base tracking-wide">
            Natural Organic
          </div>
          <Link
            href="/styles"
            className="font-serif text-stone-500 text-sm hover:text-stone-700 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b9d77]/15 rounded-full text-[#8b9d77] text-sm mb-6">
            <Leaf className="w-4 h-4" />
            <span className="font-serif">Organic Design</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-stone-800">
            Natural
            <br />
            <span className="text-[#8b9d77]">Organic</span>
          </h1>
          <p className="text-stone-500 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            Warm earth tones, soft organic shapes, and serif typography.
            Inspired by nature, crafted for calm and focused experiences.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-stone-800 text-[#faf6f1] rounded-full font-serif hover:bg-stone-700 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full font-serif hover:bg-stone-100 transition-colors">
              Read More
            </button>
          </div>
        </div>
        {/* Decorative organic shape */}
        <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#8b9d77]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-amber-100/50 rounded-full blur-3xl" />
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Warm Linen", hex: "#FAF6F1", bg: "bg-[#faf6f1]", ring: "ring-1 ring-stone-200" },
              { name: "Earth Stone", hex: "#44403C", bg: "bg-stone-700", ring: "" },
              { name: "Sage Green", hex: "#8B9D77", bg: "bg-[#8b9d77]", ring: "" },
              { name: "Warm Sand", hex: "#D4C4A8", bg: "bg-[#d4c4a8]", ring: "" },
              { name: "Terracotta", hex: "#C4826D", bg: "bg-[#c4826d]", ring: "" },
            ].map((color) => (
              <div key={color.name} className="rounded-[1.5rem] overflow-hidden bg-white shadow-sm border border-stone-100">
                <div className={`h-20 md:h-28 ${color.bg} ${color.ring}`} />
                <div className="p-3 md:p-4">
                  <p className="font-serif text-xs md:text-sm text-stone-700">{color.name}</p>
                  <p className="text-xs text-stone-400">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Buttons
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm text-stone-400 mb-4">Variants</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-stone-800 text-[#faf6f1] rounded-full font-serif hover:bg-stone-700 transition-colors">
                  Primary
                </button>
                <button className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full font-serif hover:bg-stone-100 transition-colors">
                  Secondary
                </button>
                <button className="px-6 py-3 bg-[#8b9d77] text-white rounded-full font-serif hover:bg-[#7a8c67] transition-colors">
                  Accent
                </button>
                <button className="px-6 py-3 bg-[#c4826d] text-white rounded-full font-serif hover:bg-[#b3725e] transition-colors">
                  Warm
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-stone-400 mb-4">With Icons</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-stone-800 text-[#faf6f1] rounded-full font-serif hover:bg-stone-700 transition-colors flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Explore
                </button>
                <button className="px-6 py-3 border border-stone-300 text-stone-700 rounded-full font-serif hover:bg-stone-100 transition-colors flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Discover
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#faf6f1] rounded-[2rem] p-6 md:p-8 hover:shadow-lg transition-shadow border border-stone-100 group">
              <div className="w-12 h-12 rounded-full bg-[#8b9d77]/15 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-[#8b9d77]" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 mb-2">
                Sustainable Design
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Thoughtful layouts that breathe with natural whitespace and organic flow.
              </p>
            </div>
            <div className="bg-[#faf6f1] rounded-[2rem] p-6 md:p-8 hover:shadow-lg transition-shadow border border-stone-100 group">
              <div className="w-12 h-12 rounded-full bg-[#c4826d]/15 flex items-center justify-center mb-4">
                <Sun className="w-6 h-6 text-[#c4826d]" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 mb-2">
                Warm Palette
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Earth tones and muted colors that create a sense of comfort and trust.
              </p>
            </div>
            <div className="bg-[#faf6f1] rounded-[2rem] p-6 md:p-8 hover:shadow-lg transition-shadow border border-stone-100 group">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Mountain className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-stone-800 mb-2">
                Grounded Typography
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Serif headings paired with clean body text for readable, elegant content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Form Elements
          </h2>
          <div className="space-y-6">
            <div>
              <label className="font-serif text-sm text-stone-600 mb-2 block">Name</label>
              <input
                type="text"
                placeholder="Your name..."
                className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-3 text-stone-700 placeholder:text-stone-300 focus:border-[#8b9d77] focus:outline-none focus:ring-2 focus:ring-[#8b9d77]/20 transition-all"
              />
            </div>
            <div>
              <label className="font-serif text-sm text-stone-600 mb-2 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-3 text-stone-700 placeholder:text-stone-300 focus:border-[#8b9d77] focus:outline-none focus:ring-2 focus:ring-[#8b9d77]/20 transition-all"
              />
            </div>
            <div>
              <label className="font-serif text-sm text-stone-600 mb-2 block">Message</label>
              <textarea
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-3 text-stone-700 placeholder:text-stone-300 focus:border-[#8b9d77] focus:outline-none focus:ring-2 focus:ring-[#8b9d77]/20 transition-all resize-none"
              />
            </div>
            <button className="w-full px-6 py-3 bg-stone-800 text-[#faf6f1] rounded-full font-serif hover:bg-stone-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Tabs
          </h2>
          <div className="bg-[#faf6f1] rounded-[2rem] p-6 md:p-8 border border-stone-100">
            <div className="flex gap-2 mb-6 border-b border-stone-200 pb-4">
              {["Overview", "Details", "Reviews"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 rounded-full font-serif text-sm transition-all ${
                    activeTab === i
                      ? "bg-stone-800 text-[#faf6f1]"
                      : "text-stone-500 hover:bg-stone-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-stone-600 text-sm leading-relaxed">
              {activeTab === 0 && "A gentle overview with warm, inviting content that feels natural and organic."}
              {activeTab === 1 && "Detailed information presented in a calm, structured manner with earth-tone accents."}
              {activeTab === 2 && "Thoughtful reviews from our community, shared with care and authenticity."}
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-1.5 bg-stone-800 text-[#faf6f1] rounded-full font-serif text-sm">
              Default
            </span>
            <span className="px-4 py-1.5 bg-[#8b9d77] text-white rounded-full font-serif text-sm">
              Sage
            </span>
            <span className="px-4 py-1.5 bg-[#c4826d] text-white rounded-full font-serif text-sm">
              Terracotta
            </span>
            <span className="px-4 py-1.5 bg-[#d4c4a8] text-stone-800 rounded-full font-serif text-sm">
              Sand
            </span>
            <span className="px-4 py-1.5 border border-stone-300 text-stone-600 rounded-full font-serif text-sm">
              Outline
            </span>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Progress
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-serif text-stone-600">Growth</span>
                <span className="text-stone-400">72%</span>
              </div>
              <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full w-[72%] bg-[#8b9d77] rounded-full transition-all" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-serif text-stone-600">Warmth</span>
                <span className="text-stone-400">58%</span>
              </div>
              <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full w-[58%] bg-[#c4826d] rounded-full transition-all" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-serif text-stone-600">Balance</span>
                <span className="text-stone-400">85%</span>
              </div>
              <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-stone-700 rounded-full transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Alerts
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-[#8b9d77]/10 border border-[#8b9d77]/20 rounded-[1.5rem]">
              <Check className="w-5 h-5 text-[#8b9d77] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-serif font-bold text-stone-800 mb-1">Success</p>
                <p className="text-sm text-stone-600">Your changes have been saved naturally.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-[1.5rem]">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-serif font-bold text-stone-800 mb-1">Warning</p>
                <p className="text-sm text-stone-600">Please review your input carefully.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#c4826d]/10 border border-[#c4826d]/20 rounded-[1.5rem]">
              <X className="w-5 h-5 text-[#c4826d] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-serif font-bold text-stone-800 mb-1">Error</p>
                <p className="text-sm text-stone-600">Something needs your attention.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-stone-100 border border-stone-200 rounded-[1.5rem]">
              <Info className="w-5 h-5 text-stone-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-serif font-bold text-stone-800 mb-1">Info</p>
                <p className="text-sm text-stone-600">Here is some helpful information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Controls
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm text-stone-400 mb-4">Toggles</p>
              <div className="space-y-3">
                {["Natural mode", "Organic sync"].map((label, i) => (
                  <label key={label} className="flex items-center justify-between p-4 bg-[#faf6f1] rounded-2xl cursor-pointer border border-stone-100">
                    <span className="font-serif text-stone-700">{label}</span>
                    <button
                      role="switch"
                      aria-checked={toggleStates[i]}
                      aria-label={label}
                      onClick={() => {
                        const newStates = [...toggleStates];
                        newStates[i] = !newStates[i];
                        setToggleStates(newStates);
                      }}
                      className={`w-12 h-7 rounded-full transition-colors relative ${
                        toggleStates[i] ? "bg-[#8b9d77]" : "bg-stone-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                          toggleStates[i] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-stone-400 mb-4">Checkboxes</p>
              <div className="space-y-3">
                {["Sustainable design", "Warm palette", "Organic shapes"].map((label, i) => (
                  <label key={label} className="flex items-center gap-3 p-4 bg-[#faf6f1] rounded-2xl cursor-pointer border border-stone-100">
                    <button
                      role="checkbox"
                      aria-checked={checkboxStates[i]}
                      aria-label={label}
                      onClick={() => {
                        const newStates = [...checkboxStates];
                        newStates[i] = !newStates[i];
                        setCheckboxStates(newStates);
                      }}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                        checkboxStates[i]
                          ? "bg-[#8b9d77] text-white"
                          : "border-2 border-stone-300"
                      }`}
                    >
                      {checkboxStates[i] && <Check className="w-4 h-4" />}
                    </button>
                    <span className="font-serif text-stone-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Dropdown
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3 bg-white border border-stone-200 rounded-2xl font-serif text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <span>Select a season</span>
              <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-200 rounded-2xl shadow-lg overflow-hidden z-10">
                {["Spring", "Summer", "Autumn", "Winter"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-5 py-3 text-left font-serif text-stone-700 hover:bg-[#8b9d77]/10 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Table
          </h2>
          <div className="bg-[#faf6f1] rounded-[2rem] overflow-hidden border border-stone-100">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="px-6 py-4 text-left font-serif font-bold text-stone-800">Element</th>
                  <th className="px-6 py-4 text-left font-serif font-bold text-stone-800">Type</th>
                  <th className="px-6 py-4 text-left font-serif font-bold text-stone-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { element: "Leaf", type: "Organic", status: "Active" },
                  { element: "Stone", type: "Natural", status: "Active" },
                  { element: "Earth", type: "Grounded", status: "Pending" },
                ].map((row) => (
                  <tr key={row.element} className="border-b border-stone-100 last:border-0">
                    <td className="px-6 py-4 font-serif text-stone-700">{row.element}</td>
                    <td className="px-6 py-4 text-stone-500">{row.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-serif ${
                        row.status === "Active"
                          ? "bg-[#8b9d77]/15 text-[#8b9d77]"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "98%", label: "Organic", color: "text-[#8b9d77]" },
              { value: "2.4k", label: "Elements", color: "text-stone-800" },
              { value: "156", label: "Patterns", color: "text-[#c4826d]" },
              { value: "12", label: "Seasons", color: "text-amber-700" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-[1.5rem] p-6 text-center border border-stone-100">
                <p className={`font-serif text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </p>
                <p className="text-sm text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12 text-stone-800">
            Avatars
          </h2>
          <div className="flex flex-wrap items-end gap-6">
            <div className="w-16 h-16 rounded-full bg-[#8b9d77]/15 flex items-center justify-center">
              <User className="w-8 h-8 text-[#8b9d77]" />
            </div>
            <div className="w-14 h-14 rounded-full bg-[#c4826d]/15 flex items-center justify-center">
              <User className="w-7 h-7 text-[#c4826d]" />
            </div>
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
              <User className="w-6 h-6 text-stone-500" />
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <User className="w-5 h-5 text-amber-700" />
            </div>
            <div className="flex -space-x-3">
              {["#8b9d77", "#c4826d", "#d4c4a8", "#78716c"].map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full flex items-center justify-center ring-2 ring-[#faf6f1]"
                  style={{ backgroundColor: color }}
                >
                  <User className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-stone-800 text-[#faf6f1]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12">
            Core Design Rules
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-stone-700/50 rounded-[2rem] p-6">
              <h3 className="font-serif text-lg font-bold text-[#8b9d77] mb-4">Embrace</h3>
              <ul className="text-sm text-stone-300 space-y-2">
                <li>+ Warm linen background (#faf6f1)</li>
                <li>+ Organic rounded shapes (rounded-full, rounded-[2rem])</li>
                <li>+ Serif headings, clean body text</li>
                <li>+ Earth tones: stone, sage, terracotta</li>
                <li>+ Generous whitespace</li>
                <li>+ Soft, natural transitions</li>
                <li>+ Subtle shadows and borders</li>
              </ul>
            </div>
            <div className="bg-stone-700/50 rounded-[2rem] p-6">
              <h3 className="font-serif text-lg font-bold text-[#c4826d] mb-4">Avoid</h3>
              <ul className="text-sm text-stone-300 space-y-2">
                <li>- Neon or electric colors</li>
                <li>- Sharp corners (border-radius: 0)</li>
                <li>- Hard black borders</li>
                <li>- Monospace typography</li>
                <li>- Heavy shadows</li>
                <li>- Glitch or tech effects</li>
                <li>- High contrast dark backgrounds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-4 md:px-8 bg-[#faf6f1]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400">
            StyleKit / Natural Organic Showcase
          </p>
          <Link
            href="/styles/natural-organic"
            className="font-serif text-xs text-[#8b9d77] hover:text-stone-700 transition-colors"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
