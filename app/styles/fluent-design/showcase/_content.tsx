"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Settings, User, Bell, Search, Menu } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Blue", hex: "#0078d4", bg: "bg-[#0078d4]" },
  { name: "Dark Blue", hex: "#106ebe", bg: "bg-[#106ebe]" },
  { name: "Yellow", hex: "#ffb900", bg: "bg-[#ffb900]" },
  { name: "Red", hex: "#e81123", bg: "bg-[#e81123]" },
  { name: "Green", hex: "#00cc6a", bg: "bg-[#00cc6a]" },
];

export default function ShowcaseContent() {
  const [activeNav, setActiveNav] = useState(0);
  const navItems = [
    { icon: Home, label: "Home" },
    { icon: Search, label: "Search" },
    { icon: Bell, label: "Notifications" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0078d4] via-[#106ebe] to-[#005a9e] relative overflow-hidden">
      {/* Acrylic overlay shapes */}
      <div className="fixed top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/fluent-design"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Docs</span>
          </Link>
          <span className="font-semibold text-xl text-white">
            Fluent Design
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-sm hover:bg-white/20 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Fluent Design"
        description="Create intuitive, harmonious experiences across platforms with light, depth, motion, material, and scale."
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-semibold text-white mb-6"
        descriptionClassName="text-xl text-white/80 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 bg-white text-[#0078d4] font-semibold rounded-sm hover:bg-white/90 transition-colors">
            Get Started
          </button>
          <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-sm border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-colors">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Microsoft brand colors"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]"
            labelClassName="font-semibold text-sm text-gray-900"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Clear and responsive"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            <p className="text-sm font-semibold text-gray-600 mb-6">Button Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 bg-[#0078d4] text-white font-medium rounded-sm border border-[#0078d4] hover:bg-[#106ebe] active:bg-[#005a9e] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 transition-colors duration-100">
                Primary
              </button>
              <button className="px-6 py-2.5 bg-white text-gray-900 font-medium rounded-sm border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-100">
                Secondary
              </button>
              <button className="px-6 py-2.5 bg-transparent text-[#0078d4] font-medium rounded-sm border border-[#0078d4] hover:bg-[#0078d4]/10 transition-colors duration-100">
                Outline
              </button>
              <button className="px-6 py-2.5 text-[#0078d4] font-medium hover:bg-gray-100 rounded-sm transition-colors duration-100">
                Text
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Acrylic Cards */}
      <ShowcaseSection
        title="Acrylic Material"
        subtitle="Translucent layers"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#0078d4] rounded-lg flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Light</h3>
            <p className="text-gray-600 text-sm">Illuminate focus and guide interaction through lighting effects.</p>
          </div>

          <div className="p-6 bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#0078d4] rounded-lg flex items-center justify-center mb-4">
              <Menu className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Depth</h3>
            <p className="text-gray-600 text-sm">Create visual hierarchy with layers and shadows.</p>
          </div>

          <div className="p-6 bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300">
            <div className="w-12 h-12 bg-[#0078d4] rounded-lg flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Motion</h3>
            <p className="text-gray-600 text-sm">Bring interfaces to life with purposeful animation.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Navigation Bar */}
      <ShowcaseSection
        title="Navigation"
        subtitle="Reveal effects"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] overflow-hidden">
            {navItems.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(i)}
                className={`w-full flex items-center gap-4 px-4 py-3 transition-all duration-100 ${
                  activeNav === i
                    ? "bg-[#0078d4]/10 border-l-2 border-[#0078d4]"
                    : "hover:bg-gray-100 border-l-2 border-transparent"
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeNav === i ? "text-[#0078d4]" : "text-gray-600"}`} />
                <span className={`font-medium ${activeNav === i ? "text-[#0078d4]" : "text-gray-700"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Form Elements"
        subtitle="Clean and accessible"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sign In</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0078d4] focus:border-2 hover:border-gray-400 transition-colors duration-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0078d4] focus:border-2 hover:border-gray-400 transition-colors duration-100"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded-sm border-gray-300 text-[#0078d4] focus:ring-[#0078d4]"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
              </div>
              <button className="w-full py-2.5 bg-[#0078d4] text-white font-medium rounded-sm hover:bg-[#106ebe] active:bg-[#005a9e] transition-colors duration-100">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 bg-white/10 backdrop-blur-xl border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            Fluent Design Showcase{" "}
            <Link href="/" className="text-white hover:text-white/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
