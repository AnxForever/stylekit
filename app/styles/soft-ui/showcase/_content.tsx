"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertCircle, Info, Sparkles, Heart, Star, ChevronDown, User } from "lucide-react";

export default function ShowcaseContent() {
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link
            href="/styles/soft-ui"
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Soft UI
          </span>
          <Link
            href="/styles"
            className="px-5 py-2 bg-indigo-500 text-white rounded-2xl font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
          >
            Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Introducing Soft UI
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 tracking-tight">
            Gentle. Elegant.
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Delightful.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            A soft, approachable design system with generous rounded corners,
            colored shadows, and smooth hover animations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-indigo-500 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all">
              Get Started
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Color System</h2>
          <p className="text-slate-600 mb-10">Soft, harmonious colors with matching shadows.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "Primary", hex: "#6366f1", bg: "bg-indigo-500", shadow: "shadow-indigo-500/30" },
              { name: "Secondary", hex: "#a855f7", bg: "bg-purple-500", shadow: "shadow-purple-500/30" },
              { name: "Accent", hex: "#ec4899", bg: "bg-pink-500", shadow: "shadow-pink-500/30" },
              { name: "Success", hex: "#22c55e", bg: "bg-green-500", shadow: "shadow-green-500/30" },
              { name: "Background", hex: "#f8fafc", bg: "bg-slate-50", shadow: "shadow-slate-200/50" },
            ].map((color) => (
              <div
                key={color.name}
                className={`rounded-3xl overflow-hidden bg-white shadow-lg ${color.shadow} hover:-translate-y-1 transition-all`}
              >
                <div className={`h-24 md:h-28 ${color.bg}`} />
                <div className="p-4">
                  <p className="font-semibold text-slate-800">{color.name}</p>
                  <p className="text-sm text-slate-500 font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Buttons</h2>
          <p className="text-slate-600 mb-10">Soft buttons with colored shadows and lift effects.</p>

          <div className="space-y-10">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">Variants</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-indigo-500 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all">
                  Primary
                </button>
                <button className="px-6 py-3 bg-purple-500 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all">
                  Secondary
                </button>
                <button className="px-6 py-3 bg-pink-500 text-white rounded-2xl font-semibold shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all">
                  Accent
                </button>
                <button className="px-6 py-3 bg-white text-slate-700 rounded-2xl font-semibold shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Ghost
                </button>
                <button className="px-6 py-3 bg-green-500 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all">
                  Success
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">Sizes</p>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Small
                </button>
                <button className="px-6 py-3 bg-indigo-500 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Medium
                </button>
                <button className="px-10 py-4 text-lg bg-indigo-500 text-white rounded-3xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Large
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Cards</h2>
          <p className="text-slate-600 mb-10">Elevated containers with generous padding and soft shadows.</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-indigo-500/10 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Loved by Users</h3>
              <p className="text-slate-600">
                Soft interfaces feel more approachable and create positive emotional responses.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Delightful Details</h3>
              <p className="text-slate-600">
                Subtle animations and transitions bring the interface to life.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg shadow-pink-500/10 hover:shadow-xl hover:shadow-pink-500/20 hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-7 h-7 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Premium Feel</h3>
              <p className="text-slate-600">
                Colored shadows and smooth curves create a premium experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Form Elements</h2>
          <p className="text-slate-600 mb-10">Rounded inputs with soft focus states.</p>

          <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-slate-800 placeholder-slate-400 border-2 border-transparent focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-slate-800 placeholder-slate-400 border-2 border-transparent focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Tell us what you think..."
                  rows={4}
                  className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl text-slate-800 placeholder-slate-400 border-2 border-transparent focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 outline-none transition-all resize-none"
                />
              </div>

              <button className="w-full px-6 py-4 bg-indigo-500 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Alerts</h2>
          <p className="text-slate-600 mb-10">Soft status messages with matching colored shadows.</p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-2xl shadow-lg shadow-blue-500/10">
              <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">Information</p>
                <p className="text-sm text-blue-700">Here is some helpful information for you.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-green-50 rounded-2xl shadow-lg shadow-green-500/10">
              <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Success</p>
                <p className="text-sm text-green-700">Your action was completed successfully.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-amber-50 rounded-2xl shadow-lg shadow-amber-500/10">
              <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">Warning</p>
                <p className="text-sm text-amber-700">Please review before continuing.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-red-50 rounded-2xl shadow-lg shadow-red-500/10">
              <X className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Tabs</h2>
          <p className="text-slate-600 mb-10">Pill-shaped tabs with soft transitions.</p>
          <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50">
            <div className="inline-flex bg-slate-100 rounded-2xl p-1.5 mb-6">
              {["Overview", "Features", "Pricing"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    activeTab === i
                      ? "bg-white text-slate-800 shadow-lg shadow-slate-200/50"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-slate-600">
              {activeTab === 0 && "A gentle introduction to our soft, approachable design system that delights users."}
              {activeTab === 1 && "Explore the beautiful features including colored shadows, rounded corners, and smooth animations."}
              {activeTab === 2 && "Simple and transparent pricing with no hidden fees or surprises."}
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Badges</h2>
          <p className="text-slate-600 mb-10">Soft badges with colored shadows.</p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-500/30">
              Primary
            </span>
            <span className="px-4 py-2 bg-purple-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-purple-500/30">
              Secondary
            </span>
            <span className="px-4 py-2 bg-pink-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-pink-500/30">
              Accent
            </span>
            <span className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-green-500/30">
              Success
            </span>
            <span className="px-4 py-2 bg-white text-slate-700 rounded-xl font-semibold text-sm shadow-lg shadow-slate-200/50">
              Ghost
            </span>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Progress</h2>
          <p className="text-slate-600 mb-10">Rounded progress bars with soft fills.</p>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">Design</span>
                <span className="text-slate-500">78%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/30" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">Development</span>
                <span className="text-slate-500">62%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-purple-500 rounded-full shadow-lg shadow-purple-500/30" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">Testing</span>
                <span className="text-slate-500">45%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-pink-500 rounded-full shadow-lg shadow-pink-500/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Controls</h2>
          <p className="text-slate-600 mb-10">Soft toggles and checkboxes with smooth transitions.</p>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Toggles</p>
              <div className="space-y-3">
                {["Notifications", "Dark mode"].map((label, i) => (
                  <label key={label} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-lg shadow-slate-200/50 cursor-pointer">
                    <span className="font-semibold text-slate-700">{label}</span>
                    <button
                      onClick={() => {
                        const newStates = [...toggleStates];
                        newStates[i] = !newStates[i];
                        setToggleStates(newStates);
                      }}
                      className={`w-14 h-8 rounded-full transition-all relative ${
                        toggleStates[i]
                          ? "bg-indigo-500 shadow-lg shadow-indigo-500/30"
                          : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                          toggleStates[i] ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Checkboxes</p>
              <div className="space-y-3">
                {["Email updates", "Push notifications", "Weekly digest"].map((label, i) => (
                  <label key={label} className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg shadow-slate-200/50 cursor-pointer">
                    <button
                      onClick={() => {
                        const newStates = [...checkboxStates];
                        newStates[i] = !newStates[i];
                        setCheckboxStates(newStates);
                      }}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                        checkboxStates[i]
                          ? "bg-indigo-500 shadow-lg shadow-indigo-500/30"
                          : "bg-slate-100"
                      }`}
                    >
                      {checkboxStates[i] && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <span className="font-semibold text-slate-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Dropdown</h2>
          <p className="text-slate-600 mb-10">Floating dropdowns with soft shadows.</p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-white rounded-2xl font-semibold text-slate-700 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <span>Select option</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden z-10">
                {["Design", "Development", "Marketing", "Analytics"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-5 py-3.5 text-left font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-500 transition-colors"
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
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Table</h2>
          <p className="text-slate-600 mb-10">Clean tables with soft cell styling.</p>
          <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-slate-800">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-800">Role</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Sarah Chen", role: "Designer", status: "Active" },
                  { name: "Alex Kim", role: "Developer", status: "Active" },
                  { name: "Jordan Lee", role: "Manager", status: "Away" },
                ].map((row) => (
                  <tr key={row.name} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-slate-700">{row.name}</td>
                    <td className="px-6 py-4 text-slate-500">{row.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-xl text-sm font-semibold ${
                        row.status === "Active"
                          ? "bg-green-100 text-green-600 shadow-sm shadow-green-500/20"
                          : "bg-amber-100 text-amber-600 shadow-sm shadow-amber-500/20"
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
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Stats</h2>
          <p className="text-slate-600 mb-10">Elevated stat cards with colored accents.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "24K", label: "Users", color: "indigo" },
              { value: "98%", label: "Satisfaction", color: "green" },
              { value: "1.2M", label: "Downloads", color: "purple" },
              { value: "4.9", label: "Rating", color: "pink" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`bg-white rounded-3xl p-6 text-center shadow-lg shadow-${stat.color}-500/10 hover:shadow-xl hover:shadow-${stat.color}-500/20 hover:-translate-y-1 transition-all`}
              >
                <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-400 bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Avatars</h2>
          <p className="text-slate-600 mb-10">Soft avatar styles with shadows.</p>
          <div className="flex flex-wrap items-end gap-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <User className="w-8 h-8 text-indigo-500" />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <User className="w-7 h-7 text-purple-500" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shadow-lg shadow-pink-500/20">
              <User className="w-6 h-6 text-pink-500" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shadow-lg shadow-green-500/20">
              <User className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex -space-x-3">
              {[
                { bg: "bg-indigo-500", shadow: "shadow-indigo-500/30" },
                { bg: "bg-purple-500", shadow: "shadow-purple-500/30" },
                { bg: "bg-pink-500", shadow: "shadow-pink-500/30" },
                { bg: "bg-green-500", shadow: "shadow-green-500/30" },
              ].map((style, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center ring-2 ring-white shadow-lg ${style.shadow}`}
                >
                  <User className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Rules */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Design Rules</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">DO</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Use rounded-2xl or rounded-3xl</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Apply shadow-lg shadow-[color]/30</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Add hover:-translate-y-* for lift effect</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Use soft backgrounds (slate-50, *-100)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                  <span>Generous padding (p-6, p-8)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">AVOID</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                  <span>Sharp corners (rounded-none, rounded-sm)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                  <span>Plain gray shadows</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                  <span>Hard borders (border-black)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                  <span>Pure white (#fff) backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                  <span>Abrupt transitions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            StyleKit - Soft UI Showcase
          </p>
          <Link
            href="/styles/soft-ui"
            className="text-sm font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
