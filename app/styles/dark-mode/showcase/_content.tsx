"use client";

import Link from "next/link";
import { ArrowLeft, Monitor, Moon, Zap } from "lucide-react";

export default function ShowcaseContent() {
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
