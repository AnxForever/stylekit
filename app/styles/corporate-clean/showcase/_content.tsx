"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, AlertCircle, Info, X } from "lucide-react";

export default function ShowcaseContent() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link
            href="/styles/corporate-clean"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-gray-900">Corporate Clean</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Corporate Clean
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Professional, trustworthy, and modern. Perfect for enterprise applications,
            business dashboards, and corporate websites.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Color System</h2>
          <p className="text-gray-600 mb-10">Professional colors that convey trust and reliability.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Primary", hex: "#2563eb", bg: "bg-blue-600" },
              { name: "Background", hex: "#f8fafc", bg: "bg-slate-50" },
              { name: "Surface", hex: "#ffffff", bg: "bg-white border" },
              { name: "Border", hex: "#e5e7eb", bg: "bg-gray-200" },
              { name: "Text", hex: "#111827", bg: "bg-gray-900" },
            ].map((color) => (
              <div key={color.name} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <div className={`h-20 md:h-24 ${color.bg} ${color.name === "Surface" ? "border-b" : ""}`} />
                <div className="p-3 md:p-4 bg-white">
                  <p className="font-semibold text-sm text-gray-900">{color.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-16 px-4 md:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Buttons</h2>
          <p className="text-gray-600 mb-10">Clean, accessible buttons with subtle shadows and smooth transitions.</p>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Variants</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition-all">
                  Primary
                </button>
                <button className="px-5 py-2.5 bg-white text-gray-700 rounded-lg font-semibold border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all">
                  Secondary
                </button>
                <button className="px-5 py-2.5 bg-transparent text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all">
                  Ghost
                </button>
                <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-semibold shadow-sm hover:bg-green-700 transition-all">
                  Success
                </button>
                <button className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold shadow-sm hover:bg-red-700 transition-all">
                  Danger
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Sizes</p>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md font-semibold shadow-sm hover:bg-blue-700 transition-all">
                  Small
                </button>
                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 transition-all">
                  Medium
                </button>
                <button className="px-7 py-3.5 text-lg bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all">
                  Large
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cards</h2>
          <p className="text-gray-600 mb-10">Versatile containers with subtle shadows and rounded corners.</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Check className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Feature Card</h3>
              <p className="text-gray-600">
                Highlight key features with clean iconography and concise descriptions.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Info className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Info Card</h3>
              <p className="text-gray-600">
                Present information in a structured, easy-to-scan format.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <AlertCircle className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Status Card</h3>
              <p className="text-gray-600">
                Display status updates with appropriate visual indicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Elements */}
      <section className="py-16 px-4 md:px-8 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Form Elements</h2>
          <p className="text-gray-600 mb-10">Accessible inputs with clear focus states and validation feedback.</p>

          <div className="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                placeholder="How can we help you?"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition-all">
              Submit
            </button>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Alerts</h2>
          <p className="text-gray-600 mb-10">Informative alerts with appropriate color coding.</p>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">Information</p>
                <p className="text-sm text-blue-700">This is an informational message for the user.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Success</p>
                <p className="text-sm text-green-700">Your changes have been saved successfully.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">Warning</p>
                <p className="text-sm text-yellow-700">Please review the information before proceeding.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Error</p>
                <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Rules */}
      <section className="py-16 px-4 md:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Design Rules</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-4">DO</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Use rounded-lg or rounded-xl for containers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Apply shadow-sm for subtle depth</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Use blue-600 as primary action color</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Keep borders light: border-gray-200</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Use font-semibold for emphasis</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-400 mb-4">AVOID</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Heavy shadows (shadow-xl, shadow-2xl)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Bright or saturated background colors</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Decorative animations</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Rounded-full for containers</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>Multiple accent colors in one view</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            StyleKit - Corporate Clean Showcase
          </p>
          <Link
            href="/styles/corporate-clean"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View Full Documentation
          </Link>
        </div>
      </footer>
    </div>
  );
}
