"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Info,
  Bell,
  Settings,
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Share2,
  BarChart3,
  Home,
  FileText,
  MessageSquare,
  Layers,
  ArrowLeft,
} from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#d4a088] text-gray-800">
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-4">
              <Link
                href="/styles/warm-dashboard"
                className="flex items-center gap-2 text-[#4a9d9a] hover:text-[#3d8482] transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline">Back</span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#4a9d9a] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="font-semibold text-gray-800">Warm Dashboard</span>
              </div>
            </div>
            <nav className="flex items-center gap-4 md:gap-8">
              <Link
                href="/styles/warm-dashboard"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                All Styles
              </Link>
              <button className="w-10 h-10 bg-[#faf8f5] rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-4">Design Style</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Warm
            <br />
            <span className="text-[#faf8f5]">Dashboard</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-lg">
            A warm, professional dashboard design featuring terracotta backgrounds, cream white cards, and soft shadows for a comfortable data visualization experience.
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Color System</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Terracotta", hex: "#d4a088", bg: "bg-[#d4a088]", text: "text-white" },
              { name: "Cream", hex: "#faf8f5", bg: "bg-[#faf8f5] border border-gray-200", text: "text-gray-800" },
              { name: "Teal", hex: "#4a9d9a", bg: "bg-[#4a9d9a]", text: "text-white" },
              { name: "Gold", hex: "#e8b86d", bg: "bg-[#e8b86d]", text: "text-gray-800" },
              { name: "Coral", hex: "#c17767", bg: "bg-[#c17767]", text: "text-white" },
            ].map((color) => (
              <div key={color.name} className="bg-white rounded-2xl shadow-lg shadow-black/5 overflow-hidden">
                <div className={`h-24 md:h-32 ${color.bg}`} />
                <div className="p-3 md:p-4">
                  <p className="font-medium text-gray-800">{color.name}</p>
                  <p className="text-sm text-gray-500">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#faf8f5] rounded-3xl shadow-xl shadow-black/8 p-6 md:p-10">
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Typography</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">Type System</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Headings</p>
                <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Bold & Clear</h3>
                <p className="text-sm text-gray-500">font-bold text-gray-800</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Body Text</p>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                  Body text uses gray-600 for optimal readability on cream backgrounds. Line height is relaxed for comfortable reading.
                </p>
                <p className="text-sm text-gray-500">text-gray-600 leading-relaxed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Interactive Elements</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">Buttons</h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Primary</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-[#4a9d9a] text-white rounded-xl shadow-lg shadow-[#4a9d9a]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all font-medium">
                  View Report
                </button>
                <button className="px-6 py-3 bg-[#c17767] text-white rounded-xl shadow-lg shadow-[#c17767]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all font-medium">
                  Upgrade Plan
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Secondary</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-gray-700 rounded-xl shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-0.5 transition-all font-medium">
                  Export Data
                </button>
                <button className="px-6 py-3 bg-[#e8b86d] text-gray-800 rounded-xl shadow-lg shadow-[#e8b86d]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all font-medium">
                  Highlight
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Outline</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-transparent border border-gray-300 text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all font-medium">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-transparent border border-[#4a9d9a] text-[#4a9d9a] rounded-xl hover:bg-[#4a9d9a] hover:text-white transition-all font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-4">Data Display</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Stat Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Views", value: "27.6m", change: "+12%", positive: true, icon: Eye },
              { label: "Followers", value: "219.3k", change: "+8%", positive: true, icon: Users },
              { label: "Reposts", value: "1.5k", change: "-3%", positive: false, icon: Share2 },
              { label: "Engagement", value: "4.2%", change: "+15%", positive: true, icon: BarChart3 },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[#faf8f5] rounded-2xl p-6 shadow-xl shadow-black/8 hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.positive ? 'bg-[#4a9d9a]/10' : 'bg-[#c17767]/10'}`}>
                    <stat.icon className={`w-4 h-4 ${stat.positive ? 'text-[#4a9d9a]' : 'text-[#c17767]'}`} />
                  </div>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <div className="flex items-center gap-1">
                  {stat.positive ? (
                    <TrendingUp className="w-4 h-4 text-[#4a9d9a]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-[#c17767]" />
                  )}
                  <span className={`text-sm ${stat.positive ? 'text-[#4a9d9a]' : 'text-[#c17767]'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-400">from last month</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Form Design</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">Form Elements</h2>
          <div className="bg-white rounded-3xl shadow-xl shadow-black/5 p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-12 pr-4 py-3 bg-[#faf8f5] border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-[#faf8f5] border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Message</label>
              <textarea
                placeholder="Write your message..."
                rows={4}
                className="w-full px-4 py-3 bg-[#faf8f5] border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a9d9a]/30 focus:border-[#4a9d9a] transition-all resize-none"
              />
            </div>
            <button className="w-full px-6 py-3 bg-[#4a9d9a] text-white rounded-xl shadow-lg shadow-[#4a9d9a]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all font-medium">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Sidebar Demo */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-4">Navigation</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Sidebar Navigation</h2>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/10 p-6 max-w-xs">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-[#4a9d9a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-semibold text-gray-800">Crowz</span>
            </div>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-[#d4a088] mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">RG</span>
              </div>
              <p className="font-semibold text-gray-800">Robert Grant</p>
              <p className="text-sm text-gray-500">Marketing Director</p>
            </div>
            <nav className="space-y-2">
              {[
                { id: "dashboard", label: "Dashboard", icon: Home },
                { id: "insights", label: "Insights", icon: BarChart3 },
                { id: "reports", label: "Reports", icon: FileText },
                { id: "comments", label: "Comments", icon: MessageSquare },
                { id: "channels", label: "Channels", icon: Layers },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSidebarItem(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeSidebarItem === item.id
                      ? "bg-[#faf8f5] text-gray-800"
                      : "text-gray-500 hover:bg-[#faf8f5] hover:text-gray-800"
                  }`}
                >
                  {activeSidebarItem === item.id && (
                    <span className="w-2 h-2 rounded-full bg-[#c17767]" />
                  )}
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Navigation Elements</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">Tabs</h2>
          <div className="bg-white rounded-3xl shadow-xl shadow-black/5 overflow-hidden">
            <div className="flex border-b border-gray-200">
              {["Overview", "Analytics", "Reports"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === i
                      ? "bg-white text-[#4a9d9a] border-b-2 border-[#4a9d9a] -mb-px"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 text-gray-600">
              {activeTab === 0 && "Overview content - A high-level summary of your dashboard metrics and key performance indicators."}
              {activeTab === 1 && "Analytics content - Detailed breakdown of user behavior, traffic sources, and conversion funnels."}
              {activeTab === 2 && "Reports content - Generate custom reports with date ranges, filters, and export options."}
            </div>
          </div>
        </div>
      </section>

      {/* Channel Cards */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-4">Channel Stats</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Channels</h2>
          <div className="bg-gradient-to-r from-[#e8f4f4] to-[#f0f7f7] rounded-3xl p-6 md:p-8 shadow-lg shadow-black/5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Channel Statistics</h3>
                <p className="text-sm text-gray-500">Your channels performance for 1 week period.</p>
              </div>
              <button className="px-4 py-2 bg-[#4a9d9a] text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all">
                Full Stats
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Dribbble", abbr: "Dr", color: "#ea4c89", change: "+2%", positive: true },
                { name: "Behance", abbr: "Be", color: "#0057ff", change: "-7%", positive: false },
                { name: "Instagram", abbr: "Ig", color: "#e4405f", change: "+5%", positive: true },
              ].map((channel) => (
                <div key={channel.name} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: channel.color }}
                  >
                    <span className="text-white text-xs font-bold">{channel.abbr}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{channel.name}</p>
                    <p className={`font-semibold ${channel.positive ? 'text-[#4a9d9a]' : 'text-[#c17767]'}`}>
                      {channel.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-[#faf8f5]">
        <div className="max-w-xs mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4 text-center">Select Elements</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12 text-center">Dropdown</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-[#4a9d9a] transition-colors"
            >
              <span className="text-gray-700">Select timeframe</span>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden">
                {["Last 7 days", "Last 30 days", "Last 90 days", "All time"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:bg-[#faf8f5] transition-colors"
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

      {/* Progress Bars */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-4">Progress Indicators</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Progress Bars</h2>
          <div className="bg-[#faf8f5] rounded-3xl shadow-xl shadow-black/8 p-6 md:p-8 space-y-6">
            {[
              { label: "Project Alpha", value: 75, color: "#4a9d9a" },
              { label: "Marketing Campaign", value: 45, color: "#e8b86d" },
              { label: "User Research", value: 90, color: "#c17767" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="text-sm text-gray-500">{item.value}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Notifications</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">Alerts</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border-l-4 border-[#4a9d9a]">
              <Info className="w-5 h-5 text-[#4a9d9a] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">Information</p>
                <p className="text-sm text-gray-600">This is a general information alert for your dashboard.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border-l-4 border-[#4a9d9a]">
              <Check className="w-5 h-5 text-[#4a9d9a] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">Success</p>
                <p className="text-sm text-gray-600">Your changes have been saved successfully.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border-l-4 border-[#e8b86d]">
              <AlertTriangle className="w-5 h-5 text-[#e8b86d] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">Warning</p>
                <p className="text-sm text-gray-600">Please review your input before continuing.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border-l-4 border-[#c17767]">
              <X className="w-5 h-5 text-[#c17767] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">Error</p>
                <p className="text-sm text-gray-600">Something went wrong. Please try again later.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-white/70 mb-4">Data Display</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Table</h2>
          <div className="bg-[#faf8f5] rounded-3xl shadow-xl shadow-black/8 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Summer Sale 2024", status: "Active", date: "2024.06", roi: "+24%" },
                  { name: "Product Launch", status: "Completed", date: "2024.05", roi: "+18%" },
                  { name: "Brand Awareness", status: "Draft", date: "2024.07", roi: "TBD" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-b-0 hover:bg-white transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{row.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === "Active" ? "bg-[#4a9d9a]/10 text-[#4a9d9a]" :
                        row.status === "Completed" ? "bg-[#e8b86d]/10 text-[#b89334]" :
                        "bg-gray-100 text-gray-500"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{row.date}</td>
                    <td className={`px-6 py-4 text-right font-medium ${
                      row.roi.startsWith("+") ? "text-[#4a9d9a]" : "text-gray-500"
                    }`}>
                      {row.roi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Design Guidelines</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12">Core Rules</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5">
              <h3 className="font-bold text-xl mb-6 text-[#4a9d9a]">Do</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#4a9d9a] flex-shrink-0 mt-0.5" />
                  <span>Use warm terracotta background bg-[#d4a088]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#4a9d9a] flex-shrink-0 mt-0.5" />
                  <span>Cards with cream bg-[#faf8f5] and soft shadows</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#4a9d9a] flex-shrink-0 mt-0.5" />
                  <span>Large rounded corners rounded-2xl/3xl</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#4a9d9a] flex-shrink-0 mt-0.5" />
                  <span>Teal #4a9d9a for positive data</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#4a9d9a] flex-shrink-0 mt-0.5" />
                  <span>Coral #c17767 for negative/warning</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/5">
              <h3 className="font-bold text-xl mb-6 text-[#c17767]">Don&apos;t</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#c17767] flex-shrink-0 mt-0.5" />
                  <span>No cold backgrounds (blue, purple, gray)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#c17767] flex-shrink-0 mt-0.5" />
                  <span>No pure black text text-black</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#c17767] flex-shrink-0 mt-0.5" />
                  <span>No sharp corners rounded-none/sm</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#c17767] flex-shrink-0 mt-0.5" />
                  <span>No hard edge shadows</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-[#c17767] flex-shrink-0 mt-0.5" />
                  <span>No neon/high-saturation colors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">StyleKit Warm Dashboard Showcase</p>
            <Link
              href="/styles/warm-dashboard"
              className="text-sm font-medium text-[#4a9d9a] hover:text-[#3d8482] transition-colors"
            >
              View Full Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
