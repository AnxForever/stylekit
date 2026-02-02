"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertTriangle, Info, ChevronDown, User, ChevronLeft, ChevronRight } from "lucide-react";

export default function ShowcaseContent() {
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link
            href="/styles/minimalist-flat"
            className="flex items-center gap-2 hover:text-[#ff3366] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <span className="font-bold text-xl tracking-tight">MINIMALIST</span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-black font-medium hover:bg-black hover:text-white transition-colors"
          >
            Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-8 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
            MINIMALIST
            <br />
            <span className="text-[#ff3366]">FLAT</span>
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-10 text-gray-600">
            Pure essence of design. No shadows, no gradients, no distractions.
            Just black, white, and a bold accent.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-black text-white border-2 border-black font-medium hover:bg-white hover:text-black transition-colors">
              Explore
            </button>
            <button className="px-8 py-3 bg-white text-black border-2 border-black font-medium hover:bg-black hover:text-white transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 px-4 md:px-8 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Colors</h2>
          <p className="text-gray-600 mb-10">A strictly limited palette for maximum impact.</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-0">
            {[
              { name: "Black", hex: "#000000", bg: "bg-black", text: "text-white" },
              { name: "White", hex: "#FFFFFF", bg: "bg-white", text: "text-black" },
              { name: "Accent", hex: "#FF3366", bg: "bg-[#ff3366]", text: "text-white" },
              { name: "Gray", hex: "#666666", bg: "bg-gray-500", text: "text-white" },
              { name: "Light", hex: "#F5F5F5", bg: "bg-gray-100", text: "text-black" },
            ].map((color, i) => (
              <div
                key={color.name}
                className={`h-32 md:h-40 ${color.bg} ${color.text} p-4 flex flex-col justify-end ${
                  i < 4 ? "border-r-2 border-black" : ""
                } border-b-2 border-black`}
              >
                <p className="font-bold text-sm">{color.name}</p>
                <p className="text-xs opacity-70 font-mono">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 px-4 md:px-8 bg-black text-white border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Buttons</h2>
          <p className="text-gray-400 mb-10">Binary states. Hover inverts everything.</p>

          <div className="space-y-10">
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">Variants</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-black border-2 border-white font-medium hover:bg-black hover:text-white transition-colors">
                  Primary
                </button>
                <button className="px-6 py-3 bg-black text-white border-2 border-white font-medium hover:bg-white hover:text-black transition-colors">
                  Secondary
                </button>
                <button className="px-6 py-3 bg-[#ff3366] text-white border-2 border-[#ff3366] font-medium hover:bg-black hover:border-white transition-colors">
                  Accent
                </button>
                <button className="px-6 py-3 bg-transparent text-white border-2 border-white font-medium hover:bg-white hover:text-black transition-colors">
                  Outline
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">Sizes</p>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-4 py-2 text-sm bg-white text-black border-2 border-white font-medium hover:bg-black hover:text-white transition-colors">
                  Small
                </button>
                <button className="px-6 py-3 bg-white text-black border-2 border-white font-medium hover:bg-black hover:text-white transition-colors">
                  Medium
                </button>
                <button className="px-10 py-4 text-lg bg-white text-black border-2 border-white font-medium hover:bg-black hover:text-white transition-colors">
                  Large
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-4 md:px-8 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Cards</h2>
          <p className="text-gray-600 mb-10">Clean containers with strong borders. No shadows.</p>

          <div className="grid md:grid-cols-3 gap-0">
            <div className="border-2 border-black p-6 hover:bg-black hover:text-white transition-colors group">
              <div className="w-10 h-10 border-2 border-current mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Simple</h3>
              <p className="text-gray-600 group-hover:text-gray-300">
                No decoration. Content speaks for itself.
              </p>
            </div>

            <div className="border-2 border-l-0 border-black p-6 hover:bg-[#ff3366] hover:text-white hover:border-[#ff3366] transition-colors group">
              <div className="w-10 h-10 border-2 border-current mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Bold</h3>
              <p className="text-gray-600 group-hover:text-white/80">
                Accent color for emphasis when needed.
              </p>
            </div>

            <div className="border-2 border-l-0 border-black p-6 bg-black text-white hover:bg-white hover:text-black transition-colors group">
              <div className="w-10 h-10 border-2 border-current mb-4 flex items-center justify-center">
                <span className="text-xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Inverted</h3>
              <p className="text-gray-400 group-hover:text-gray-600">
                Dark variant for contrast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="py-16 px-4 md:px-8 bg-gray-100 border-b-2 border-black">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Forms</h2>
          <p className="text-gray-600 mb-10">Inputs stripped to essentials.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                placeholder="Write your message..."
                rows={4}
                className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-400 focus:outline-none focus:border-[#ff3366] transition-colors resize-none"
              />
            </div>

            <button className="w-full px-6 py-4 bg-black text-white border-2 border-black font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 px-4 md:px-8 border-b-2 border-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Alerts</h2>
          <p className="text-gray-600 mb-10">Status messages with minimal styling.</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border-2 border-black">
              <Info className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">Information: Standard notification message.</p>
            </div>

            <div className="flex items-center gap-4 p-4 border-2 border-black bg-black text-white">
              <Check className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">Success: Action completed successfully.</p>
            </div>

            <div className="flex items-center gap-4 p-4 border-2 border-[#ff3366] text-[#ff3366]">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">Warning: Review before proceeding.</p>
            </div>

            <div className="flex items-center gap-4 p-4 border-2 border-black bg-[#ff3366] text-white">
              <X className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">Error: Something went wrong.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 px-4 md:px-8 bg-gray-100 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Tabs</h2>
          <p className="text-gray-600 mb-10">Navigation with binary active states.</p>
          <div className="border-2 border-black">
            <div className="flex">
              {["Overview", "Details", "Settings"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 px-4 py-3 font-bold uppercase tracking-wider text-sm transition-colors ${
                    activeTab === i
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 border-t-2 border-black bg-white">
              <p className="text-gray-600">
                {activeTab === 0 && "Overview content - Clean navigation with instant visual feedback."}
                {activeTab === 1 && "Details content - Binary states make active selection immediately clear."}
                {activeTab === 2 && "Settings content - No ambiguity in current location."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 px-4 md:px-8 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Badges</h2>
          <p className="text-gray-600 mb-10">Labels with no soft edges.</p>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Status</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider">New</span>
                <span className="px-3 py-1 bg-[#ff3366] text-white text-xs font-bold uppercase tracking-wider">Hot</span>
                <span className="px-3 py-1 border-2 border-black text-xs font-bold uppercase tracking-wider">Draft</span>
                <span className="px-3 py-1 bg-gray-500 text-white text-xs font-bold uppercase tracking-wider">Archived</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Counts</p>
              <div className="flex flex-wrap gap-3">
                <span className="w-8 h-8 bg-black text-white text-xs font-bold flex items-center justify-center">5</span>
                <span className="w-8 h-8 bg-[#ff3366] text-white text-xs font-bold flex items-center justify-center">12</span>
                <span className="w-8 h-8 border-2 border-black text-xs font-bold flex items-center justify-center">99+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="py-16 px-4 md:px-8 bg-black text-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Progress</h2>
          <p className="text-gray-400 mb-10">Simple fill indicators.</p>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider">Progress</span>
                <span className="text-sm font-bold">75%</span>
              </div>
              <div className="h-4 bg-white">
                <div className="h-full w-3/4 bg-[#ff3366]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider">Loading</span>
                <span className="text-sm font-bold">45%</span>
              </div>
              <div className="h-4 bg-white border-2 border-white">
                <div className="h-full w-[45%] bg-black" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold uppercase tracking-wider">Complete</span>
                <span className="text-sm font-bold">100%</span>
              </div>
              <div className="h-4 bg-white">
                <div className="h-full w-full bg-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-16 px-4 md:px-8 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Controls</h2>
          <p className="text-gray-600 mb-10">Binary inputs with clear states.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Toggles</p>
              {["Notifications", "Dark Mode"].map((label, i) => (
                <div key={label} className="flex items-center justify-between p-4 border-2 border-black">
                  <span className="font-bold">{label}</span>
                  <button
                    role="switch"
                    aria-checked={toggleStates[i]}
                    aria-label={label}
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[i] = !newStates[i];
                      setToggleStates(newStates);
                    }}
                    className={`w-14 h-8 relative transition-colors ${
                      toggleStates[i] ? "bg-black" : "bg-white border-2 border-black"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 transition-all ${
                        toggleStates[i] ? "left-7 bg-white" : "left-1 bg-black"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Checkboxes</p>
              {["Option A", "Option B", "Option C"].map((label, i) => (
                <label key={label} className="flex items-center gap-4 p-4 border-2 border-black cursor-pointer hover:bg-gray-100 transition-colors">
                  <button
                    role="checkbox"
                    aria-checked={checkboxStates[i]}
                    aria-label={label}
                    onClick={() => {
                      const newStates = [...checkboxStates];
                      newStates[i] = !newStates[i];
                      setCheckboxStates(newStates);
                    }}
                    className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${
                      checkboxStates[i] ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {checkboxStates[i] && <Check className="w-4 h-4" />}
                  </button>
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 px-4 md:px-8 bg-[#ff3366] text-white border-b-2 border-black">
        <div className="max-w-xs mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center">Dropdown</h2>
          <p className="text-white/80 mb-10 text-center">Select with inverted states.</p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-white text-black border-2 border-black font-bold flex items-center justify-between hover:bg-black hover:text-white transition-colors"
            >
              <span>Select option</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-2 border-t-0 border-black z-10">
                {["Option 1", "Option 2", "Option 3", "Option 4"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-4 py-3 text-left text-black font-medium hover:bg-black hover:text-white transition-colors"
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
      <section className="py-16 px-4 md:px-8 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Table</h2>
          <p className="text-gray-600 mb-10">Data with strong grid lines.</p>
          <div className="border-2 border-black overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-black text-white">
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-sm">Name</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-sm">Status</th>
                  <th className="px-4 py-3 text-right font-bold uppercase tracking-wider text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Project Alpha", status: "Active" },
                  { name: "Project Beta", status: "Complete" },
                  { name: "Project Gamma", status: "Draft" },
                ].map((row, i) => (
                  <tr key={i} className="border-t-2 border-black hover:bg-gray-100 transition-colors">
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-bold uppercase ${
                        row.status === "Active" ? "bg-black text-white" :
                        row.status === "Complete" ? "bg-[#ff3366] text-white" : "border-2 border-black"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="font-bold text-sm hover:text-[#ff3366] transition-colors">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 md:px-8 bg-black text-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Stats</h2>
          <p className="text-gray-400 mb-10">Numbers with impact.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { value: "100+", label: "Projects" },
              { value: "50K", label: "Users" },
              { value: "99%", label: "Uptime" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i} className={`p-6 text-center border-2 border-white ${i > 0 ? "border-l-0" : ""}`}>
                <div className="text-4xl md:text-5xl font-bold tracking-tighter">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-wider text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="py-16 px-4 md:px-8 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Avatars</h2>
          <p className="text-gray-600 mb-10">Square identities.</p>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Sizes</p>
              <div className="flex items-end gap-4">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Initials</p>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#ff3366] text-white flex items-center justify-center font-bold">AB</div>
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold">CD</div>
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center font-bold">EF</div>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Stacked</p>
              <div className="flex -space-x-3">
                {["bg-black", "bg-[#ff3366]", "bg-gray-500", "bg-black"].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 ${bg} text-white border-2 border-white flex items-center justify-center font-bold text-sm`}
                  >
                    {["A", "B", "C", "D"][i]}
                  </div>
                ))}
                <div className="w-12 h-12 bg-white text-black border-2 border-black flex items-center justify-center font-bold text-xs">
                  +3
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="py-16 px-4 md:px-8 bg-gray-100 border-b-2 border-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Pagination</h2>
          <p className="text-gray-600 mb-10">Navigation with clear states.</p>
          <div className="flex items-center justify-center gap-0">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-12 h-12 border-2 border-l-0 border-black font-bold transition-colors ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
              className="w-12 h-12 border-2 border-l-0 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Design Rules */}
      <section className="py-16 px-4 md:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Design Rules</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-white p-6">
              <h3 className="text-xl font-bold text-[#ff3366] mb-4">DO</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ff3366] flex-shrink-0 mt-0.5" />
                  <span>Use border-2 border-black for all containers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ff3366] flex-shrink-0 mt-0.5" />
                  <span>Invert colors on hover (black to white)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ff3366] flex-shrink-0 mt-0.5" />
                  <span>Use #ff3366 sparingly as accent</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ff3366] flex-shrink-0 mt-0.5" />
                  <span>Keep typography bold and tight</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ff3366] flex-shrink-0 mt-0.5" />
                  <span>Use uppercase for labels</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-white p-6">
              <h3 className="text-xl font-bold text-gray-400 mb-4">AVOID</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>Any shadows (shadow-*)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>Gradients (bg-gradient-*)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>Rounded corners (rounded-*)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>Multiple accent colors</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>Opacity or transparency effects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t-2 border-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            StyleKit / Minimalist Flat
          </p>
          <Link
            href="/styles/minimalist-flat"
            className="text-sm font-bold hover:text-[#ff3366] transition-colors"
          >
            View Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
