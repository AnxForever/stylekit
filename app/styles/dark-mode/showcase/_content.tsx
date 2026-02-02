"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Moon, Zap, Check, X, AlertTriangle, Info, ChevronDown, User, Settings, Bell, Activity, Database, Shield, Clock } from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState([true, false]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);
  const [radioValue, setRadioValue] = useState(0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link
            href="/styles/dark-mode"
            className="font-semibold text-slate-100 text-sm md:text-base"
          >
            Dark Mode
          </Link>
          <div className="flex gap-2 md:gap-3">
            <Link
              href="/styles/dark-mode"
              className="px-3 md:px-4 py-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors duration-200 text-xs md:text-sm font-medium"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="px-3 md:px-4 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors duration-200 text-xs md:text-sm font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
            <Moon className="w-3 h-3 text-blue-400" />
            <span className="text-xs font-medium text-blue-400">Dark Interface Design</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-6 tracking-tight">
            Dark Mode
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Elegant dark interface with comfortable contrast, subtle borders, and focused highlights.
            Built for professional tools and extended sessions.
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Background", hex: "#0f172a", bg: "bg-slate-900" },
              { name: "Surface", hex: "#1e293b", bg: "bg-slate-800" },
              { name: "Border", hex: "#334155", bg: "bg-slate-700" },
              { name: "Primary", hex: "#3b82f6", bg: "bg-blue-500" },
              { name: "Success", hex: "#22c55e", bg: "bg-green-500" },
            ].map((color) => (
              <div key={color.name} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className={`h-20 md:h-28 ${color.bg}`} />
                <div className="p-3 md:p-4">
                  <p className="text-sm font-medium text-slate-200">{color.name}</p>
                  <p className="text-xs text-slate-500 font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Buttons
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-4">Variants</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium text-sm">
                  Primary
                </button>
                <button className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors duration-200 font-medium text-sm">
                  Secondary
                </button>
                <button className="px-4 py-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors duration-200 font-medium text-sm">
                  Ghost
                </button>
                <button className="px-4 py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors duration-200 font-medium text-sm">
                  Success
                </button>
                <button className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-colors duration-200 font-medium text-sm">
                  Danger
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-4">Sizes</p>
              <div className="flex flex-wrap gap-3 md:gap-4 items-center">
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium text-xs">
                  Small
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium text-sm">
                  Medium
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium text-base">
                  Large
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Monitor, title: "Dashboard", desc: "Real-time analytics with comfortable dark interface for monitoring.", color: "blue" },
              { icon: Zap, title: "Performance", desc: "Optimized rendering for smooth interactions and fast load times.", color: "yellow" },
              { icon: Moon, title: "Eye Comfort", desc: "Reduced brightness with careful contrast ratios for extended use.", color: "green" },
            ].map((item, idx) => {
              const colorMap: Record<string, string> = {
                blue: "bg-blue-600/20 text-blue-400",
                yellow: "bg-amber-600/20 text-amber-400",
                green: "bg-green-600/20 text-green-400",
              };
              return (
                <div
                  key={idx}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[item.color]}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Input */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700 bg-slate-800/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Form Elements
          </h2>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                placeholder="Enter password..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-300">Message</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 resize-none"
                placeholder="Write a message..."
              />
            </div>
            <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200 font-medium text-sm">
              Submit
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Tabs
          </h2>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex border-b border-slate-700 mb-6">
              {["Overview", "Analytics", "Settings"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 -mb-px ${
                    activeTab === i
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-slate-400 text-sm">
              {activeTab === 0 && "Overview content - Monitor your system status and recent activity in real-time."}
              {activeTab === 1 && "Analytics content - Deep dive into performance metrics and usage patterns."}
              {activeTab === 2 && "Settings content - Configure preferences and customize your experience."}
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Badges
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-4">Status Badges</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-2.5 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full">
                  Primary
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-green-600/20 text-green-400 border border-green-500/30 rounded-full">
                  Success
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-full">
                  Warning
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-red-600/20 text-red-400 border border-red-500/30 rounded-full">
                  Error
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded-full">
                  Default
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-4">Solid Badges</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-2.5 py-1 text-xs font-medium bg-blue-600 text-white rounded-md">
                  New
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-green-600 text-white rounded-md">
                  Active
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-purple-600 text-white rounded-md">
                  Pro
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-slate-600 text-slate-200 rounded-md">
                  Archived
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Progress
          </h2>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Storage Used</span>
                <span className="text-slate-400">75%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-blue-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Upload Progress</span>
                <span className="text-slate-400">45%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-[45%] bg-green-500 rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">CPU Usage</span>
                <span className="text-amber-400">90%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-[90%] bg-amber-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Alerts
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-400">Information</p>
                <p className="text-sm text-slate-400 mt-1">A new software update is available for download.</p>
              </div>
              <button className="text-slate-500 hover:text-slate-300"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-600/10 border border-green-500/30 rounded-lg">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-400">Success</p>
                <p className="text-sm text-slate-400 mt-1">Your changes have been saved successfully.</p>
              </div>
              <button className="text-slate-500 hover:text-slate-300"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-start gap-3 p-4 bg-amber-600/10 border border-amber-500/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-400">Warning</p>
                <p className="text-sm text-slate-400 mt-1">Your session will expire in 5 minutes.</p>
              </div>
              <button className="text-slate-500 hover:text-slate-300"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-start gap-3 p-4 bg-red-600/10 border border-red-500/30 rounded-lg">
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-400">Error</p>
                <p className="text-sm text-slate-400 mt-1">Failed to connect to the server. Please try again.</p>
              </div>
              <button className="text-slate-500 hover:text-slate-300"><X className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Toggle & Checkbox */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Controls
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400 mb-4">Toggles</p>
              {["Dark Mode", "Notifications"].map((label, i) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{label}</span>
                  <button
                    onClick={() => {
                      const newStates = [...toggleStates];
                      newStates[i] = !newStates[i];
                      setToggleStates(newStates);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${
                      toggleStates[i] ? "bg-blue-600" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                        toggleStates[i] ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400 mb-4">Checkboxes</p>
              {["Email alerts", "Push notifications", "Weekly digest"].map((label, i) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer">
                  <button
                    onClick={() => {
                      const newStates = [...checkboxStates];
                      newStates[i] = !newStates[i];
                      setCheckboxStates(newStates);
                    }}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                      checkboxStates[i]
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    {checkboxStates[i] && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <span className="text-sm text-slate-300">{label}</span>
                </label>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-400 mb-4">Radio Group</p>
              {["Daily", "Weekly", "Monthly"].map((label, i) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer">
                  <button
                    onClick={() => setRadioValue(i)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      radioValue === i
                        ? "border-blue-600"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                  >
                    {radioValue === i && <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                  </button>
                  <span className="text-sm text-slate-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700 bg-slate-800/50">
        <div className="max-w-xs mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12 text-center">
            Dropdown
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 flex items-center justify-between hover:border-slate-600 transition-colors duration-200"
            >
              <span>Select option</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-xl z-10">
                {[
                  { icon: User, label: "Profile" },
                  { icon: Settings, label: "Settings" },
                  { icon: Bell, label: "Notifications" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full px-4 py-2.5 text-left text-slate-300 hover:bg-slate-700 transition-colors duration-200 flex items-center gap-3 text-sm"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <item.icon className="w-4 h-4 text-slate-500" />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Table
          </h2>
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {[
                  { name: "Alex Johnson", status: "Active", role: "Admin" },
                  { name: "Sarah Chen", status: "Active", role: "Editor" },
                  { name: "Mike Brown", status: "Inactive", role: "Viewer" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-700/50 transition-colors duration-200">
                    <td className="px-4 py-3 text-sm text-slate-200">{row.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        row.status === "Active"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-slate-600/50 text-slate-400"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">{row.role}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Activity, label: "Active Users", value: "12.4K", change: "+12%", positive: true },
              { icon: Database, label: "Storage", value: "2.4TB", change: "+8%", positive: true },
              { icon: Shield, label: "Uptime", value: "99.9%", change: "0%", positive: true },
              { icon: Clock, label: "Avg Response", value: "45ms", change: "-5%", positive: true },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <stat.icon className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-500 uppercase tracking-wide">{stat.label}</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-slate-100 mb-1">{stat.value}</div>
                <div className={`text-xs font-medium ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatars */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Avatars
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-4">Sizes</p>
              <div className="flex items-end gap-4">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-400" />
                </div>
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-4">With Status</p>
              <div className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    AJ
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                    SC
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-medium">
                    MB
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-slate-500 border-2 border-slate-900 rounded-full" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-4">Stacked Group</p>
              <div className="flex -space-x-3">
                {["blue", "green", "purple", "amber", "slate"].map((color, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 bg-${color}-600 rounded-full border-2 border-slate-900 flex items-center justify-center text-white text-xs font-medium`}
                    style={{ backgroundColor: ["#2563eb", "#16a34a", "#9333ea", "#d97706", "#475569"][i] }}
                  >
                    {["AJ", "SC", "MB", "JD", "+3"][i]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Rules */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-100 mb-8 md:mb-12">
            Core Rules
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Must Use</h3>
              <ul className="text-sm space-y-2 text-slate-400">
                <li>- Dark backgrounds: bg-slate-900</li>
                <li>- Surface cards: bg-slate-800</li>
                <li>- Subtle borders: border-slate-700</li>
                <li>- Text: slate-100 primary, slate-400 secondary</li>
                <li>- Accent: blue-500, green-500</li>
                <li>- Hover: bg-slate-700, bg-white/5</li>
                <li>- Rounded corners: rounded-lg, rounded-xl</li>
              </ul>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-400 mb-4">Must Avoid</h3>
              <ul className="text-sm space-y-2 text-slate-400">
                <li>- Pure white text (too harsh)</li>
                <li>- High contrast borders</li>
                <li>- Pure black background (#000)</li>
                <li>- Dark text on dark backgrounds</li>
                <li>- Too many highlight colors</li>
                <li>- Light-colored shadows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-slate-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            StyleKit - Dark Mode Showcase
          </p>
          <Link
            href="/styles/dark-mode"
            className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
