"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertTriangle, Info, ChevronDown, User } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link
            href="/styles/geometric-bold"
            className="font-black text-sm md:text-base uppercase tracking-widest"
          >
            GEO/BOLD
          </Link>
          <div className="flex gap-2 md:gap-3">
            <Link
              href="/styles/geometric-bold"
              className="px-3 md:px-4 py-2 bg-white text-black border-4 border-black font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-colors duration-200"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="px-3 md:px-4 py-2 bg-black text-white border-4 border-black font-bold uppercase tracking-widest text-xs hover:bg-red-500 transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-8 border-b-4 border-black relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-32 h-32 md:w-64 md:h-64 bg-red-500 rotate-12 opacity-90" />
        <div className="absolute bottom-10 left-10 w-20 h-20 md:w-40 md:h-40 bg-blue-600 rounded-full" />
        <div className="absolute top-40 left-1/2 w-16 h-16 md:w-24 md:h-24 border-4 border-black rotate-45" />

        <div className="max-w-5xl mx-auto relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.3em]">01 / Design System</span>
          <h1 className="font-black text-5xl md:text-7xl lg:text-[8rem] uppercase leading-none tracking-tight mt-4 mb-6">
            GEO
            <br />
            <span className="text-red-500">METRIC</span>
            <br />
            BOLD
          </h1>
          <p className="text-base md:text-lg max-w-xl font-medium text-gray-600">
            Bold geometric shapes. Strong visual impact. Black and white with primary color accents. Inspired by Bauhaus and Constructivism.
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Color System
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
            {[
              { name: "Black", hex: "#000000", bg: "bg-black", textColor: "text-white" },
              { name: "White", hex: "#FFFFFF", bg: "bg-white", textColor: "text-black" },
              { name: "Red", hex: "#EF4444", bg: "bg-red-500", textColor: "text-white" },
              { name: "Blue", hex: "#2563EB", bg: "bg-blue-600", textColor: "text-white" },
              { name: "Yellow", hex: "#FACC15", bg: "bg-yellow-400", textColor: "text-black" },
            ].map((color) => (
              <div key={color.name} className={`${color.bg} border-4 border-black p-4 md:p-6`}>
                <div className="h-16 md:h-24" />
                <p className={`font-bold text-sm uppercase tracking-widest ${color.textColor}`}>{color.name}</p>
                <p className={`font-mono text-xs ${color.textColor} opacity-60`}>{color.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-black text-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-10 right-20 w-40 h-40 border-4 border-white/20 rounded-full" />
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-red-500 rotate-45" />

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Buttons
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">
                Square
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors duration-200">
                  Explore
                </button>
                <button className="px-8 py-4 bg-red-500 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200">
                  Action
                </button>
                <button className="px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200">
                  Details
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">
                Outlined
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-transparent text-white border-4 border-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-200">
                  View Work
                </button>
                <button className="px-8 py-4 bg-transparent text-red-500 border-4 border-red-500 font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors duration-200">
                  Contact
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-4">
                Circle
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="w-20 h-20 bg-white text-black rounded-full font-bold uppercase text-xs tracking-widest hover:bg-yellow-400 transition-colors duration-200">
                  Click
                </button>
                <button className="w-20 h-20 bg-red-500 text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors duration-200">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Structure", desc: "Clean geometric forms define the visual hierarchy.", accent: "bg-red-500" },
              { num: "02", title: "Contrast", desc: "Bold black and white create maximum visual impact.", accent: "bg-blue-600" },
              { num: "03", title: "Motion", desc: "Rotation and offset add dynamic energy to static layouts.", accent: "bg-yellow-400" },
            ].map((item) => (
              <div key={item.num} className="relative bg-white border-4 border-black p-6 md:p-8 group">
                {/* Decorative shape */}
                <div className={`absolute -top-4 -right-4 w-8 h-8 ${item.accent} rotate-45 group-hover:rotate-90 transition-transform duration-300`} />

                <span className="text-xs font-bold uppercase tracking-[0.3em]">{item.num}</span>
                <h3 className="text-2xl md:text-3xl font-black uppercase mt-2 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-black" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Input */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-blue-600 text-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 border-4 border-white/20 rotate-12" />

        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Form
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.3em]">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-4 bg-white border-4 border-black text-black font-medium placeholder:text-gray-400 focus:outline-none focus:bg-yellow-300 transition-colors duration-200"
                placeholder="YOUR@EMAIL.COM"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.3em]">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-4 bg-white border-4 border-black text-black font-medium placeholder:text-gray-400 focus:outline-none focus:bg-yellow-300 transition-colors duration-200 resize-none"
                placeholder="YOUR MESSAGE..."
              />
            </div>
            <button className="w-full px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-red-500 transition-colors duration-200">
              Submit
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Tabs
          </h2>
          <div className="border-4 border-black">
            <div className="flex">
              {["Overview", "Details", "Media"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 px-4 py-4 font-bold uppercase tracking-widest text-sm transition-colors duration-200 ${
                    activeTab === i
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-yellow-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8 border-t-4 border-black">
              <p className="text-gray-600 font-medium">
                {activeTab === 0 && "Overview content — Bold geometric navigation provides clear visual feedback and structure."}
                {activeTab === 1 && "Details content — High contrast tab states ensure immediate recognition of active selection."}
                {activeTab === 2 && "Media content — Full-width tab layouts maximize screen real estate and visual impact."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-yellow-400 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 border-4 border-black rotate-12" />
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-red-500 rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Badges
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 mb-4">Square</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-black text-white font-bold uppercase text-xs tracking-widest">New</span>
                <span className="px-4 py-2 bg-red-500 text-white font-bold uppercase text-xs tracking-widest">Hot</span>
                <span className="px-4 py-2 bg-blue-600 text-white font-bold uppercase text-xs tracking-widest">Pro</span>
                <span className="px-4 py-2 bg-white text-black border-4 border-black font-bold uppercase text-xs tracking-widest">Draft</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 mb-4">Circle</p>
              <div className="flex flex-wrap gap-3">
                <span className="w-12 h-12 bg-black text-white rounded-full font-bold uppercase text-xs flex items-center justify-center">01</span>
                <span className="w-12 h-12 bg-red-500 text-white rounded-full font-bold uppercase text-xs flex items-center justify-center">02</span>
                <span className="w-12 h-12 bg-blue-600 text-white rounded-full font-bold uppercase text-xs flex items-center justify-center">03</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Progress
          </h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold uppercase text-xs tracking-widest">Loading</span>
                <span className="font-bold uppercase text-xs tracking-widest">75%</span>
              </div>
              <div className="h-6 bg-white border-4 border-black">
                <div className="h-full w-3/4 bg-black" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold uppercase text-xs tracking-widest">Progress</span>
                <span className="font-bold uppercase text-xs tracking-widest text-red-500">45%</span>
              </div>
              <div className="h-6 bg-white border-4 border-black">
                <div className="h-full w-[45%] bg-red-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold uppercase text-xs tracking-widest">Complete</span>
                <span className="font-bold uppercase text-xs tracking-widest text-blue-600">100%</span>
              </div>
              <div className="h-6 bg-white border-4 border-black">
                <div className="h-full w-full bg-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-black text-white relative overflow-hidden">
        <div className="absolute top-20 right-20 w-24 h-24 border-4 border-white/20 rotate-45" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Alerts
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white text-black border-4 border-black">
              <Info className="w-6 h-6 flex-shrink-0" />
              <p className="flex-1 font-medium">Information alert with bold geometric styling.</p>
              <button className="font-bold uppercase text-xs tracking-widest hover:text-red-500">Dismiss</button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-blue-600 text-white border-4 border-white">
              <Check className="w-6 h-6 flex-shrink-0" />
              <p className="flex-1 font-medium">Success! Your action was completed.</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-yellow-400 text-black border-4 border-black">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <p className="flex-1 font-medium">Warning! Please review before continuing.</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-red-500 text-white border-4 border-white">
              <X className="w-6 h-6 flex-shrink-0" />
              <p className="flex-1 font-medium">Error! Something went wrong.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Controls
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Toggles</p>
              {["Dark Mode", "Notifications"].map((label, i) => (
                <div key={label} className="flex items-center justify-between p-4 border-4 border-black">
                  <span className="font-bold uppercase text-sm tracking-widest">{label}</span>
                  <button
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[i] = !newStates[i];
                      setToggleStates(newStates);
                    }}
                    className={`w-16 h-8 relative transition-colors duration-200 ${
                      toggleStates[i] ? "bg-black" : "bg-white border-4 border-black"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 transition-all duration-200 ${
                        toggleStates[i] ? "left-9 bg-white" : "left-1 bg-black"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Checkboxes</p>
              {["Option A", "Option B", "Option C"].map((label, i) => (
                <label key={label} className="flex items-center gap-4 p-4 border-4 border-black cursor-pointer hover:bg-yellow-400 transition-colors">
                  <button
                    onClick={() => {
                      const newStates = [...checkboxStates];
                      newStates[i] = !newStates[i];
                      setCheckboxStates(newStates);
                    }}
                    className={`w-8 h-8 border-4 border-black flex items-center justify-center transition-colors ${
                      checkboxStates[i] ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {checkboxStates[i] && <Check className="w-4 h-4" />}
                  </button>
                  <span className="font-bold uppercase text-sm tracking-widest">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-red-500 text-white relative overflow-hidden">
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-black rotate-12" />

        <div className="max-w-xs mx-auto relative z-10">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12 text-center">
            Dropdown
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-4 bg-white text-black border-4 border-black font-bold uppercase tracking-widest text-sm flex items-center justify-between hover:bg-yellow-400 transition-colors"
            >
              <span>Select</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-4 border-black border-t-0 z-10">
                {["Option 1", "Option 2", "Option 3", "Option 4"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-4 py-3 text-left text-black font-bold uppercase text-sm hover:bg-black hover:text-white transition-colors"
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
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Table
          </h2>
          <div className="border-4 border-black overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-4 py-4 text-left font-bold uppercase text-xs tracking-widest">Project</th>
                  <th className="px-4 py-4 text-left font-bold uppercase text-xs tracking-widest">Status</th>
                  <th className="px-4 py-4 text-right font-bold uppercase text-xs tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Website Redesign", status: "Active" },
                  { name: "Brand Identity", status: "Complete" },
                  { name: "App Development", status: "Draft" },
                ].map((row, i) => (
                  <tr key={i} className="border-t-4 border-black hover:bg-yellow-400 transition-colors">
                    <td className="px-4 py-4 font-bold uppercase text-sm">{row.name}</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest ${
                        row.status === "Active" ? "bg-blue-600 text-white" :
                        row.status === "Complete" ? "bg-black text-white" : "border-2 border-black"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="font-bold uppercase text-xs tracking-widest hover:text-red-500 transition-colors">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-40 h-40 border-4 border-white/20 rounded-full" />
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-yellow-400" />

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "100+", label: "Projects" },
              { value: "50K", label: "Users" },
              { value: "99%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i} className="bg-white text-black border-4 border-black p-6 text-center">
                <div className="font-black text-3xl md:text-5xl uppercase">{stat.value}</div>
                <div className="font-bold uppercase text-xs tracking-widest mt-2 text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Avatars
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Sizes</p>
              <div className="flex items-end gap-4">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div className="w-20 h-20 bg-black text-white flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Circle</p>
              <div className="flex items-end gap-4">
                <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">A</div>
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">B</div>
                <div className="w-20 h-20 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl">C</div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">Stacked</p>
              <div className="flex -space-x-4">
                {["bg-black", "bg-red-500", "bg-blue-600", "bg-yellow-400"].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-14 h-14 ${bg} ${bg === "bg-yellow-400" ? "text-black" : "text-white"} border-4 border-white flex items-center justify-center font-bold`}
                  >
                    {i + 1}
                  </div>
                ))}
                <div className="w-14 h-14 bg-white text-black border-4 border-black flex items-center justify-center font-bold text-xs">
                  +5
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Rules */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-black bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-8 md:mb-12">
            Core Rules
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="border-4 border-white p-6 md:p-8">
              <h3 className="font-black text-xl uppercase text-red-500 mb-4">
                Must Use
              </h3>
              <ul className="text-sm space-y-2 text-white/80 font-medium">
                <li>- Solid color blocks: black, white, red, blue</li>
                <li>- Geometric shapes: circles, squares</li>
                <li>- Large type: text-6xl, text-8xl</li>
                <li>- Absolute positioning for overlaps</li>
                <li>- Only rounded-none or rounded-full</li>
                <li>- Rotation: rotate-12, rotate-45</li>
                <li>- Max 3-4 colors per design</li>
              </ul>
            </div>
            <div className="border-4 border-white p-6 md:p-8">
              <h3 className="font-black text-xl uppercase text-blue-500 mb-4">
                Must Avoid
              </h3>
              <ul className="text-sm space-y-2 text-white/80 font-medium">
                <li>- Gradients</li>
                <li>- Soft/low contrast colors</li>
                <li>- Medium border-radius (rounded-lg)</li>
                <li>- Shadows of any kind</li>
                <li>- More than 4 colors</li>
                <li>- Symmetrical conventional layouts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t-4 border-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 font-bold uppercase tracking-widest">
            StyleKit / Geometric Bold Showcase
          </p>
          <Link
            href="/styles/geometric-bold"
            className="text-sm font-black uppercase tracking-widest hover:text-red-500 transition-colors"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
