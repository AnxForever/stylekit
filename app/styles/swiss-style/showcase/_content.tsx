"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, ChevronDown, ChevronUp, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Star, Grid3X3
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Black", hex: "#000000", bg: "bg-black" },
  { name: "White", hex: "#ffffff", bg: "bg-white" },
  { name: "Red", hex: "#ff0000", bg: "bg-red-600" },
  { name: "Blue", hex: "#0057b8", bg: "bg-[#0057b8]" },
  { name: "Yellow", hex: "#ffcc00", bg: "bg-[#ffcc00]" },
  { name: "Gray 80", hex: "#333333", bg: "bg-[#333333]" },
  { name: "Gray 40", hex: "#999999", bg: "bg-[#999999]" },
  { name: "Gray 10", hex: "#e6e6e6", bg: "bg-[#e6e6e6]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(72);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Overview", "Details", "Specifications"];

  const accordionItems = [
    { title: "What is Swiss Design?", content: "Swiss Design, also known as International Typographic Style, emerged in Switzerland in the 1950s. It emphasizes cleanliness, readability, and objectivity through the use of grids, sans-serif typography, and asymmetric layouts." },
    { title: "Key Principles", content: "Mathematical grids, objective photography, sans-serif typography (especially Helvetica), asymmetric layouts, and a preference for content over decoration define Swiss Design." },
    { title: "Historical Context", content: "Developed at the Basel School of Design and Zurich School of Arts, Swiss Design became the foundation for modern graphic design and corporate identity systems." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-8 py-4 border-b border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/swiss-style"
            className="flex items-center gap-2 text-black hover:text-red-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-[0.15em]">Back to Docs</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-600" />
            <span className="font-bold text-xl uppercase tracking-[0.3em]">
              Swiss
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-black text-white text-xs uppercase tracking-[0.15em] hover:bg-red-600 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
            International Typographic Style
          </p>
          <h1 className="text-7xl md:text-9xl font-bold text-black leading-none mb-8">
            Swiss<br />Design
          </h1>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8">
              <p className="text-xl text-gray-700 max-w-lg mb-12">
                The grid is the foundation. Typography is the voice. Clarity is the goal.
              </p>
              <div className="flex gap-4">
                <button className="px-10 py-4 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-600 transition-colors">
                  Explore
                </button>
                <button className="px-10 py-4 border-2 border-black text-black text-sm font-medium uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2">
                <div className="w-16 h-16 bg-black" />
                <div className="w-16 h-16 bg-red-600" />
                <div className="w-16 h-16 bg-red-600" />
                <div className="w-16 h-16 bg-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Statistics"
        subtitle="Data visualization"
        className="py-20 px-8 bg-gray-50"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, label: "Users", value: "12,847" },
            { icon: TrendingUp, label: "Growth", value: "+89%" },
            { icon: Eye, label: "Views", value: "2.4M" },
            { icon: Star, label: "Rating", value: "4.9" },
          ].map((stat, index) => (
            <div key={index} className="border-l-4 border-black pl-6">
              <stat.icon className="w-6 h-6 text-gray-400 mb-4" />
              <p className="text-4xl font-bold text-black mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Colors"
        subtitle="Primary palette"
        className="py-20 px-8"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-l-4 border-black bg-white"
            labelClassName="font-bold text-sm text-black uppercase tracking-wider"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Helvetica system"
        className="py-20 px-8"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <div className="space-y-8">
              <div className="border-l-4 border-black pl-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Heading 1</p>
                <h1 className="text-6xl font-bold text-black leading-none">Helvetica</h1>
              </div>
              <div className="border-l-4 border-black pl-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Heading 2</p>
                <h2 className="text-4xl font-bold text-black">Rational Design</h2>
              </div>
              <div className="border-l-4 border-black pl-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Body</p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Swiss design emerged in the 1950s from Switzerland, emphasizing cleanliness, readability, and objectivity.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="bg-black text-white p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Label</p>
              <p className="text-xs uppercase tracking-[0.2em] mb-2">Category</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Subcategory</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Action elements"
        className="py-20 px-8 bg-gray-50"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border-l-4 border-black">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-600 transition-colors">
                Primary
              </button>
              <button className="px-6 py-3 border-2 border-black text-black text-sm font-medium uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">
                Secondary
              </button>
              <button className="px-6 py-3 bg-red-600 text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-700 transition-colors">
                Accent
              </button>
              <button className="px-6 py-3 text-black text-sm font-medium uppercase tracking-[0.2em] hover:text-red-600 transition-colors">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Grid System */}
      <ShowcaseSection
        title="Grid"
        subtitle="12-column system"
        className="py-20 px-8"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-4 mb-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-500">{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 h-32 bg-black flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-wider">4 cols</span>
            </div>
            <div className="col-span-6 h-32 bg-red-600 flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-wider">6 cols</span>
            </div>
            <div className="col-span-2 h-32 bg-gray-800 flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-wider">2</span>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Content blocks"
        className="py-20 px-8 bg-gray-50"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white border-l-4 border-black p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">01</p>
            <h3 className="text-2xl font-bold text-black mb-4">Clarity</h3>
            <p className="text-gray-700 leading-relaxed">Design serves content. Every element has purpose.</p>
          </div>
          <div className="bg-white border-l-4 border-red-600 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">02</p>
            <h3 className="text-2xl font-bold text-black mb-4">Grid</h3>
            <p className="text-gray-700 leading-relaxed">Mathematical precision creates visual harmony.</p>
          </div>
          <div className="bg-white border-l-4 border-black p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">03</p>
            <h3 className="text-2xl font-bold text-black mb-4">Typography</h3>
            <p className="text-gray-700 leading-relaxed">Sans-serif fonts communicate with objectivity.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-20 px-8"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-black bg-white">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors ${
                    activeTab === index
                      ? "bg-black text-white"
                      : "text-gray-500 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-xl font-bold text-black mb-4">Overview</h4>
                  <p className="text-gray-700 leading-relaxed">Swiss Design originated in Switzerland during the 1950s. It emphasizes cleanliness, readability, and objectivity through mathematical grids and sans-serif typography.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-xl font-bold text-black mb-4">Details</h4>
                  <p className="text-gray-700 leading-relaxed">Key characteristics include asymmetric layouts, objective photography, and a preference for content hierarchy over decoration.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-xl font-bold text-black mb-4">Specifications</h4>
                  <p className="text-gray-700 leading-relaxed">Standard grid: 12 columns. Preferred typeface: Helvetica. Color palette: Black, white, red, and limited accent colors.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Collapsible content"
        className="py-20 px-8 bg-gray-50"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto space-y-0">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white border-l-4 border-black border-b border-gray-200 last:border-b-0">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-black">{item.title}</span>
                {openAccordion === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openAccordion === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-700 leading-relaxed">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="System notifications"
        className="py-20 px-8"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-start gap-4 p-6 bg-white border-l-4 border-black">
            <Check className="w-5 h-5 text-black mt-0.5" />
            <div>
              <p className="font-bold text-black uppercase text-sm tracking-wider">Success</p>
              <p className="text-gray-700 mt-1">Operation completed successfully.</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-4 p-6 bg-white border-l-4 border-[#ffcc00]">
            <AlertTriangle className="w-5 h-5 text-[#ffcc00] mt-0.5" />
            <div>
              <p className="font-bold text-black uppercase text-sm tracking-wider">Warning</p>
              <p className="text-gray-700 mt-1">Please review before proceeding.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-start gap-4 p-6 bg-white border-l-4 border-red-600">
            <X className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-bold text-black uppercase text-sm tracking-wider">Error</p>
              <p className="text-gray-700 mt-1">An error has occurred. Please try again.</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start gap-4 p-6 bg-white border-l-4 border-[#0057b8]">
            <Info className="w-5 h-5 text-[#0057b8] mt-0.5" />
            <div>
              <p className="font-bold text-black uppercase text-sm tracking-wider">Information</p>
              <p className="text-gray-700 mt-1">Additional details are available.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Binary switches"
        className="py-20 px-8 bg-gray-50"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-4 border-black p-8 space-y-6">
            {[
              { label: "Grid System", desc: "Enable 12-column grid" },
              { label: "Typography Scale", desc: "Use modular type scale" },
              { label: "Color Mode", desc: "Strict color palette" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                <div>
                  <p className="font-bold text-black">{item.label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-14 h-7 rounded-none transition-colors ${
                    toggleStates[index] ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white transition-transform ${
                      toggleStates[index] ? "translate-x-7" : "translate-x-0"
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
        subtitle="Status indicators"
        className="py-20 px-8"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-4 border-black p-8 space-y-8">
            {/* Linear Progress */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-black">Project Progress</p>
                <p className="text-sm text-gray-500 font-mono">{progress}%</p>
              </div>
              <div className="h-2 bg-gray-200">
                <div
                  className="h-full bg-black transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Segmented Progress */}
            <div>
              <p className="font-bold text-black mb-3">Phase Completion</p>
              <div className="grid grid-cols-4 gap-1">
                {[100, 100, 72, 0].map((value, index) => (
                  <div key={index} className="space-y-1">
                    <div className="h-2 bg-gray-200">
                      <div
                        className={`h-full ${value > 0 ? (value === 100 ? "bg-black" : "bg-red-600") : "bg-gray-200"}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Phase {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Control */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 border-2 border-black text-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Decrease
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider hover:bg-red-600 transition-colors"
              >
                Increase
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Swiss International Showcase
          </p>
          <Link href="/" className="text-xs uppercase tracking-[0.2em] text-black hover:text-red-600 transition-colors">
            StyleKit
          </Link>
        </div>
      </footer>
    </div>
  );
}
