"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Palette, Layers, Wand2 } from "lucide-react";

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link
            href="/styles/modern-gradient"
            className="text-white/70 text-sm md:text-base hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Back</span>
          </Link>
          <div className="text-sm md:text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
            Modern Gradient
          </div>
          <Link
            href="/styles"
            className="text-white/50 text-sm hover:text-white transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Ambient Glow Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px]" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-fuchsia-500/15 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[128px]" />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-white/70">Modern Design System</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              Modern
            </span>
            <br />
            <span className="text-white">Gradient</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            Vibrant gradients, glass morphism, and ambient glows.
            A premium aesthetic for forward-thinking interfaces.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:from-violet-400 hover:to-fuchsia-400 transition-all shadow-lg shadow-violet-500/25">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
              Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Color System
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Violet", hex: "#8B5CF6", bg: "bg-violet-500" },
              { name: "Fuchsia", hex: "#D946EF", bg: "bg-fuchsia-500" },
              { name: "Pink", hex: "#EC4899", bg: "bg-pink-500" },
              { name: "Indigo", hex: "#6366F1", bg: "bg-indigo-500" },
              { name: "Slate Dark", hex: "#020617", bg: "bg-slate-950" },
            ].map((color) => (
              <div key={color.name} className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                <div className={`h-20 md:h-28 ${color.bg}`} />
                <div className="p-3 md:p-4">
                  <p className="text-xs md:text-sm text-white/80">{color.name}</p>
                  <p className="text-xs text-white/40">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">
              Buttons
            </span>
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-sm text-white/40 mb-4">Variants</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:from-violet-400 hover:to-fuchsia-400 transition-all shadow-lg shadow-violet-500/25">
                  Primary
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/15 transition-all">
                  Glass
                </button>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:from-pink-400 hover:to-rose-400 transition-all shadow-lg shadow-pink-500/25">
                  Accent
                </button>
                <button className="px-6 py-3 rounded-xl border border-white/20 text-white/70 font-medium hover:text-white hover:border-white/40 transition-all">
                  Outline
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-white/40 mb-4">With Icons</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:from-violet-400 hover:to-fuchsia-400 transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  Create
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/15 transition-all flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Enhance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Cards
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:from-violet-500/30 group-hover:to-fuchsia-500/30 transition-all">
                <Sparkles className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Glassmorphism</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Frosted glass effects with backdrop blur and subtle transparency layers.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:from-fuchsia-500/30 group-hover:to-pink-500/30 transition-all">
                <Palette className="w-6 h-6 text-fuchsia-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Vivid Gradients</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Rich color transitions from violet through fuchsia to pink for depth and energy.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mb-4 group-hover:from-pink-500/30 group-hover:to-rose-500/30 transition-all">
                <Layers className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Ambient Glows</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Soft light sources and blurred shapes create atmospheric depth and dimension.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-400">
              Input Fields
            </span>
          </h2>
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <label className="text-sm text-white/50 mb-2 block">Username</label>
                <input
                  type="text"
                  placeholder="Enter username..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="text-sm text-white/50 mb-2 block">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="text-sm text-white/50 mb-2 block">Message</label>
                <textarea
                  placeholder="Write something..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all backdrop-blur-sm resize-none"
                />
              </div>
              <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:from-violet-400 hover:to-fuchsia-400 transition-all shadow-lg shadow-violet-500/25">
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Summary */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Core Rules
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-violet-400 mb-4">Use</h3>
              <ul className="text-sm text-white/50 space-y-2">
                <li>+ Dark slate background (slate-950)</li>
                <li>+ Violet to fuchsia gradients</li>
                <li>+ Glass panels (bg-white/10 backdrop-blur-xl)</li>
                <li>+ Ambient glow decorations</li>
                <li>+ Rounded corners (rounded-xl, 2xl)</li>
                <li>+ Gradient text (bg-clip-text)</li>
                <li>+ Subtle border (border-white/10)</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-pink-400 mb-4">Avoid</h3>
              <ul className="text-sm text-white/50 space-y-2">
                <li>- Flat solid backgrounds</li>
                <li>- Sharp corners</li>
                <li>- Hard black borders</li>
                <li>- Plain solid color buttons</li>
                <li>- Monospace typography</li>
                <li>- High-contrast neon glows</li>
                <li>- Warm earth tones</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            StyleKit / Modern Gradient Showcase
          </p>
          <Link
            href="/styles/modern-gradient"
            className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 hover:from-violet-300 hover:to-fuchsia-300 transition-all"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
