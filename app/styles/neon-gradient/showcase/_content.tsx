"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Info,
  Star,
  Sparkles,
  Zap,
  Shield,
  Users,
  Rocket,
  ArrowRight,
  Github,
  Twitter,
  Mail,
} from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
        }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0a1e]/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/styles/neon-gradient/showcase" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">Neon Gradient</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <span className="text-pink-400 font-medium cursor-pointer">Features</span>
              <span className="text-white/70 hover:text-white transition-colors cursor-pointer">Pricing</span>
              <span className="text-white/70 hover:text-white transition-colors cursor-pointer">About</span>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/styles/neon-gradient"
                className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
              >
                Docs
              </Link>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-medium rounded-lg border border-white/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
                Start
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 pt-32 pb-20 md:pt-40 md:pb-32">
        {/* Decorative elements */}
        <div className="absolute top-32 left-10 text-yellow-400 animate-pulse">
          <Star className="w-6 h-6 fill-current" />
        </div>
        <div className="absolute top-48 right-20 text-pink-400">
          <Rocket className="w-8 h-8" />
        </div>
        <div className="absolute bottom-20 left-1/4 text-cyan-400 animate-bounce">
          <Sparkles className="w-5 h-5" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border-2 border-dashed border-yellow-400 rounded-full text-yellow-400 text-sm font-medium">
            <Star className="w-4 h-4 fill-current" />
            <span>Design Style Showcase</span>
            <Star className="w-4 h-4 fill-current" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-purple-400">Neon</span>{" "}
            <span className="text-cyan-400">Gradient</span>
            <br />
            <span className="text-pink-400">Style</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-lg mb-8">
            Bold gradients, thick borders, and glowing effects on a dark canvas. Perfect for SaaS, developer tools, and gaming platforms.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-4 bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 text-black font-bold rounded-xl border-2 border-pink-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105 transition-all flex items-center gap-2">
              Get Started <Sparkles className="w-5 h-5" />
            </button>
            <button className="px-6 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:border-white/50 hover:bg-white/5 transition-all flex items-center gap-2">
              <ArrowRight className="w-5 h-5" /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Color System</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Purple", hex: "#a855f7", gradient: "from-purple-500 to-purple-600" },
              { name: "Pink", hex: "#ec4899", gradient: "from-pink-500 to-pink-600" },
              { name: "Cyan", hex: "#22d3ee", gradient: "from-cyan-400 to-cyan-500" },
              { name: "Yellow", hex: "#fbbf24", gradient: "from-yellow-400 to-yellow-500" },
              { name: "Green", hex: "#a3e635", gradient: "from-lime-400 to-lime-500" },
            ].map((color) => (
              <div
                key={color.name}
                className="rounded-2xl border-4 border-white/10 overflow-hidden hover:border-white/30 transition-colors"
              >
                <div className={`h-24 md:h-32 bg-gradient-to-br ${color.gradient}`} />
                <div className="p-3 md:p-4 bg-white/5">
                  <p className="font-medium text-white">{color.name}</p>
                  <p className="text-sm text-white/50">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-3xl border-4 border-purple-500/30 p-6 md:p-10 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
            <p className="text-xs tracking-widest uppercase text-cyan-400 mb-4">Typography</p>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Type System</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-xs tracking-widest uppercase text-pink-400 mb-4">Headings</p>
                <h3 className="text-3xl md:text-5xl font-black mb-4">
                  <span className="text-purple-400">Bold</span> &{" "}
                  <span className="text-cyan-400">Colorful</span>
                </h3>
                <p className="text-sm text-white/50">font-black with gradient text colors</p>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-pink-400 mb-4">Body Text</p>
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-4">
                  Body text uses white/70 opacity for comfortable reading on dark backgrounds. High contrast ensures accessibility.
                </p>
                <p className="text-sm text-white/50">text-white/70 leading-relaxed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Interactive Elements</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Buttons</h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-cyan-400 mb-4">Gradient</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold rounded-xl border-2 border-white/20 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.7)] hover:scale-105 transition-all">
                  Primary Action
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl border-2 border-yellow-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:scale-105 transition-all">
                  Secondary
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-cyan-400 mb-4">Outline</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-transparent text-cyan-400 font-bold rounded-xl border-2 border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
                  Outline Cyan
                </button>
                <button className="px-6 py-3 bg-transparent text-pink-400 font-bold rounded-xl border-2 border-pink-400 hover:bg-pink-400/10 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all">
                  Outline Pink
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-cyan-400 mb-4">Icon Buttons</p>
              <div className="flex flex-wrap gap-4">
                <button className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl border-2 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)] hover:scale-110 transition-all flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
                <button className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-green-400 rounded-xl border-2 border-pink-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-110 transition-all flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Cards */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Content Display</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Gradient Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Fast", desc: "Blazing speed", from: "from-purple-500", via: "via-pink-500", to: "to-rose-500", border: "border-yellow-400" },
              { icon: Shield, title: "Secure", desc: "Enterprise-grade", from: "from-cyan-400", via: "via-teal-500", to: "to-green-500", border: "border-pink-400" },
              { icon: Users, title: "Team", desc: "Seamless collab", from: "from-pink-500", via: "via-rose-500", to: "to-red-500", border: "border-cyan-400" },
              { icon: Rocket, title: "Scale", desc: "Grow infinitely", from: "from-yellow-400", via: "via-orange-500", to: "to-red-500", border: "border-purple-400" },
            ].map((card, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${card.from} ${card.via} ${card.to} rounded-2xl border-4 ${card.border} p-6 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:-translate-y-2 transition-all`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-white/80 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4 text-center">Form Design</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Form Elements</h2>
          <div className="bg-white/5 rounded-3xl border-2 border-purple-500/30 p-6 md:p-8 space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email..."
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`w-full px-5 py-4 bg-white/5 border-2 rounded-xl text-white placeholder:text-white/40 focus:outline-none transition-all ${
                  emailFocused
                    ? "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    : "border-purple-500/50"
                }`}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg text-white font-medium text-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all">
                Subscribe
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Username</label>
              <input
                type="text"
                placeholder="@username"
                className="w-full px-5 py-4 bg-white/5 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
              <textarea
                placeholder="Write your message..."
                rows={4}
                className="w-full px-5 py-4 bg-white/5 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all resize-none"
              />
            </div>
            <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold rounded-xl border-2 border-cyan-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-[1.02] transition-all">
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Floating Cards Demo */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Visual Effects</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Floating Cards</h2>
          <div className="relative h-80 md:h-96">
            <div className="absolute top-0 left-0 md:left-10 w-48 md:w-56 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl border-4 border-yellow-400 p-5 shadow-[0_0_30px_rgba(168,85,247,0.5)] transform -rotate-6 hover:rotate-0 transition-transform">
              <Zap className="w-10 h-10 text-white mb-3" />
              <p className="text-white font-bold text-lg">Speed</p>
            </div>
            <div className="absolute top-8 md:top-4 right-0 md:right-10 w-48 md:w-56 bg-gradient-to-br from-green-400 to-cyan-400 rounded-2xl border-4 border-pink-400 p-5 shadow-[0_0_30px_rgba(34,211,238,0.5)] transform rotate-6 hover:rotate-0 transition-transform">
              <Shield className="w-10 h-10 text-white mb-3" />
              <p className="text-white font-bold text-lg">Security</p>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 md:w-64 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl border-4 border-cyan-400 p-5 shadow-[0_0_30px_rgba(236,72,153,0.5)] transform rotate-3 hover:rotate-0 transition-transform">
              <Users className="w-10 h-10 text-white mb-3" />
              <p className="text-white font-bold text-lg">Collaboration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Navigation</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Tabs</h2>
          <div className="bg-white/5 rounded-3xl border-2 border-purple-500/30 overflow-hidden">
            <div className="flex border-b border-purple-500/30">
              {["Overview", "Features", "Pricing"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-4 font-medium transition-all ${
                    activeTab === i
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-cyan-400 border-b-2 border-cyan-400"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-6 text-white/70">
              {activeTab === 0 && "Overview - A high-level summary of the Neon Gradient design system and its key characteristics."}
              {activeTab === 1 && "Features - Detailed breakdown of gradient cards, glow effects, thick borders, and dark backgrounds."}
              {activeTab === 2 && "Pricing - Choose the perfect plan for your needs with our flexible pricing options."}
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Labels</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Badges</h2>
          <div className="space-y-6">
            <div>
              <p className="text-xs tracking-widest uppercase text-cyan-400 mb-4">Solid</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">New</span>
                <span className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-white text-sm font-bold rounded-full">Active</span>
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold rounded-full">Featured</span>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-cyan-400 mb-4">Outline</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 border-2 border-dashed border-yellow-400 text-yellow-400 text-sm font-medium rounded-full">Beta</span>
                <span className="px-4 py-2 border-2 border-dashed border-pink-400 text-pink-400 text-sm font-medium rounded-full">Pro</span>
                <span className="px-4 py-2 border-2 border-dashed border-cyan-400 text-cyan-400 text-sm font-medium rounded-full">Enterprise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dropdown */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-xs mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4 text-center">Select Elements</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Dropdown</h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-5 py-4 bg-white/5 border-2 border-purple-500/50 rounded-xl text-left flex items-center justify-between hover:border-purple-400 transition-colors"
            >
              <span className="text-white/70">Select theme</span>
              <ChevronDown className={`w-5 h-5 text-purple-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1030] border-2 border-purple-500/50 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] z-10 overflow-hidden">
                {["Purple Storm", "Cyan Wave", "Pink Sunset", "Gold Rush"].map((item) => (
                  <button
                    key={item}
                    className="w-full px-5 py-3 text-left text-white/70 hover:bg-purple-500/20 hover:text-white transition-colors"
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
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Progress</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Progress Bars</h2>
          <div className="bg-white/5 rounded-3xl border-2 border-purple-500/30 p-6 md:p-8 space-y-6">
            {[
              { label: "Downloads", value: 85, from: "from-purple-500", to: "to-pink-500", glow: "rgba(168, 85, 247, 0.5)" },
              { label: "Users", value: 62, from: "from-cyan-400", to: "to-green-400", glow: "rgba(34, 211, 238, 0.5)" },
              { label: "Revenue", value: 45, from: "from-yellow-400", to: "to-orange-500", glow: "rgba(250, 204, 21, 0.5)" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{item.label}</span>
                  <span className="text-sm text-white/50">{item.value}%</span>
                </div>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${item.from} ${item.to} rounded-full transition-all`}
                    style={{
                      width: `${item.value}%`,
                      boxShadow: `0 0 20px ${item.glow}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Notifications</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Alerts</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-cyan-400/10 rounded-xl border-l-4 border-cyan-400">
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-white mb-1">Information</p>
                <p className="text-sm text-white/60">This is a general information alert.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-green-400/10 rounded-xl border-l-4 border-green-400">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-white mb-1">Success</p>
                <p className="text-sm text-white/60">Operation completed successfully!</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-yellow-400/10 rounded-xl border-l-4 border-yellow-400">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-white mb-1">Warning</p>
                <p className="text-sm text-white/60">Please review before proceeding.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-pink-500/10 rounded-xl border-l-4 border-pink-500">
              <X className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-white mb-1">Error</p>
                <p className="text-sm text-white/60">Something went wrong. Please try again.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">Design Guidelines</p>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12">Core Rules</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-2xl border-2 border-cyan-400/30 p-6">
              <h3 className="font-bold text-xl mb-6 text-cyan-400">Do</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Dark background bg-[#0f0a1e]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Gradient cards from-purple-500 to-pink-500</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Thick borders border-4 with contrast colors</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Glow effects shadow-[0_0_30px_...]</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Use Lucide icons (Star, Rocket, Sparkles)</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl border-2 border-pink-500/30 p-6">
              <h3 className="font-bold text-xl mb-6 text-pink-500">Don&apos;t</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span>No light backgrounds</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span>No low-saturation colors</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span>No thin borders (border or border-2)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span>No grayscale cards</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span>No emoji characters (use icons)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0515] border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">Neon Gradient Showcase</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/60 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-pink-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-yellow-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <Link
              href="/styles/neon-gradient"
              className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Full Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
