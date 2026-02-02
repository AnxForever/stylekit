"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertTriangle, Info } from "lucide-react";

export default function ShowcaseContent() {
  const [inputValue, setInputValue] = useState("");

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
