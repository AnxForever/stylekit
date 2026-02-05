"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Home, Settings, User, Bell, Search, Menu,
  ChevronDown, ChevronUp, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, MessageCircle, Folder, Mail, Calendar
} from "lucide-react";
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
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(72);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const navItems = [
    { icon: Home, label: "Home" },
    { icon: Search, label: "Search" },
    { icon: Bell, label: "Notifications" },
    { icon: Settings, label: "Settings" },
  ];

  const tabs = [
    { label: "Files", icon: Folder },
    { label: "Mail", icon: Mail },
    { label: "Calendar", icon: Calendar },
  ];

  const accordionItems = [
    { title: "What is Fluent Design?", content: "Fluent Design System is Microsoft's design language that emphasizes light, depth, motion, material, and scale to create intuitive and harmonious experiences across platforms." },
    { title: "Acrylic Material", content: "Acrylic is a translucent material that creates a sense of depth through blur and tint effects, allowing background content to show through." },
    { title: "Reveal Highlight", content: "Reveal is a lighting effect that highlights interactive elements when users move their cursor near them, creating a sense of connection." },
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

      {/* Stats */}
      <ShowcaseSection
        title="Statistics"
        subtitle="Data at a glance"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Active Users", value: "12,847" },
            { icon: TrendingUp, label: "Growth", value: "+24%" },
            { icon: Eye, label: "Page Views", value: "3.2M" },
            { icon: MessageCircle, label: "Messages", value: "8,421" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-5 bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.12)] transition-all duration-300"
            >
              <div className="w-10 h-10 bg-[#0078d4] rounded-lg flex items-center justify-center mb-3">
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
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

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Pivot control"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all duration-100 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#0078d4] border-[#0078d4]"
                      : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="p-6 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Recent Files</h4>
                  <p className="text-gray-600 text-sm">You have 24 files in your OneDrive. 3 files were modified today.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Inbox</h4>
                  <p className="text-gray-600 text-sm">You have 12 unread messages. 5 marked as important.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Upcoming Events</h4>
                  <p className="text-gray-600 text-sm">You have 3 meetings scheduled for today.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Expandable sections"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] overflow-hidden">
            {accordionItems.map((item, index) => (
              <div key={index} className={index !== accordionItems.length - 1 ? "border-b border-gray-200" : ""}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-100"
                >
                  <span className="font-medium text-gray-900">{item.title}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openAccordion === index ? "rotate-180" : ""}`} />
                </button>
                {openAccordion === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Message bar"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {/* Success */}
          <div className="flex items-center gap-3 p-4 bg-[#dff6dd] rounded-sm border-l-4 border-[#107c10]">
            <Check className="w-5 h-5 text-[#107c10]" />
            <div>
              <p className="font-medium text-[#107c10]">Success</p>
              <p className="text-sm text-[#107c10]/80">Your changes have been saved successfully.</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-3 p-4 bg-[#fff4ce] rounded-sm border-l-4 border-[#ffb900]">
            <AlertTriangle className="w-5 h-5 text-[#8a6d00]" />
            <div>
              <p className="font-medium text-[#8a6d00]">Warning</p>
              <p className="text-sm text-[#8a6d00]/80">Your session will expire in 5 minutes.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-center gap-3 p-4 bg-[#fde7e9] rounded-sm border-l-4 border-[#e81123]">
            <X className="w-5 h-5 text-[#a80000]" />
            <div>
              <p className="font-medium text-[#a80000]">Error</p>
              <p className="text-sm text-[#a80000]/80">Failed to save. Please try again.</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-3 p-4 bg-[#cce4f6] rounded-sm border-l-4 border-[#0078d4]">
            <Info className="w-5 h-5 text-[#004578]" />
            <div>
              <p className="font-medium text-[#004578]">Information</p>
              <p className="text-sm text-[#004578]/80">A new version is available.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Switch control"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            {[
              { label: "Dark mode", desc: "Use dark theme throughout the system" },
              { label: "Notifications", desc: "Receive push notifications" },
              { label: "Auto-update", desc: "Keep apps updated automatically" },
            ].map((item, index) => (
              <div key={index} className={`flex items-center justify-between py-3 ${index !== 2 ? "border-b border-gray-200" : ""}`}>
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-11 h-5 rounded-full transition-colors duration-100 ${
                    toggleStates[index] ? "bg-[#0078d4]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-100 ${
                      toggleStates[index] ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress"
        subtitle="Progress indicator"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-semibold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-6 bg-white/70 backdrop-blur-xl rounded-lg border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] space-y-6">
            {/* Determinate Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">Downloading updates...</p>
                <p className="text-sm text-gray-500">{progress}%</p>
              </div>
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-[#0078d4] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Segmented Progress */}
            <div>
              <p className="font-medium text-gray-900 mb-2">Installation Steps</p>
              <div className="grid grid-cols-4 gap-1">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${value === 100 ? "bg-[#107c10]" : value > 0 ? "bg-[#0078d4]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Step {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 bg-white text-gray-900 font-medium rounded-sm border border-gray-300 hover:bg-gray-100 transition-colors duration-100"
              >
                Decrease
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 bg-[#0078d4] text-white font-medium rounded-sm hover:bg-[#106ebe] transition-colors duration-100"
              >
                Increase
              </button>
            </div>
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
