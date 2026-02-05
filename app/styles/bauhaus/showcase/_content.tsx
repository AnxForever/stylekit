"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Circle, Square, Triangle, ChevronDown, ChevronUp,
  Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Zap
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Red", hex: "#ff0000", bg: "bg-red-600" },
  { name: "Yellow", hex: "#ffcc00", bg: "bg-yellow-400" },
  { name: "Blue", hex: "#0000ff", bg: "bg-blue-600" },
  { name: "Black", hex: "#000000", bg: "bg-black" },
  { name: "White", hex: "#ffffff", bg: "bg-white", border: true },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(68);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = ["Form", "Function", "Material"];

  const accordionItems = [
    { title: "What is Bauhaus?", content: "Bauhaus was a German art school founded in 1919 that combined crafts and fine arts, famous for the approach to design that it developed. The school became famous for its approach to design, which attempted to unify individual artistic vision with the principles of mass production." },
    { title: "Core Principles", content: "Form follows function - design should be determined by utility. Primary colors (red, yellow, blue), basic geometric shapes (circle, square, triangle), and clean sans-serif typography define the Bauhaus aesthetic." },
    { title: "Design Legacy", content: "Bauhaus principles continue to influence modern design, from architecture to product design to digital interfaces. The emphasis on simplicity, functionality, and geometric forms remains highly relevant." },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Geometric shapes */}
      <div className="fixed top-20 right-20 w-48 h-48 bg-yellow-400 rounded-full pointer-events-none" />
      <div className="fixed bottom-20 right-40 w-32 h-32 bg-blue-600 pointer-events-none" />
      <div className="fixed top-40 right-60 w-0 h-0 border-l-[60px] border-l-transparent border-b-[100px] border-b-red-600 border-r-[60px] border-r-transparent pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-4 border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/bauhaus"
            className="flex items-center gap-2 text-black hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider">Back to Docs</span>
          </Link>
          <span className="font-black text-xl text-black uppercase tracking-wider">
            BAUHAUS
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-black text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="BAU HAUS"
        description="Form follows function - 德国包豪斯学派的功能主义设计理念"
        className="relative z-10 pt-20 pb-16 px-6"
        titleClassName="text-7xl md:text-9xl font-black text-black uppercase leading-none mb-8 text-left max-w-2xl mx-auto"
        descriptionClassName="text-xl text-gray-700 max-w-md mb-10 text-left mx-auto"
      >
        <div className="max-w-2xl mx-auto flex flex-wrap gap-4">
          <button className="px-10 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
            Explore
          </button>
          <button className="px-10 py-4 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-black transition-colors">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR SYSTEM"
        subtitle="Primary colors only"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-4 border-black bg-white"
            labelClassName="font-bold text-sm text-black uppercase tracking-wider"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Stats */}
      <ShowcaseSection
        title="STATISTICS"
        subtitle="Data visualization"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Users", value: "8,421", bg: "bg-red-600", shape: "rounded-full" },
            { icon: TrendingUp, label: "Growth", value: "+72%", bg: "bg-yellow-400", textColor: "text-black", shape: "" },
            { icon: Eye, label: "Views", value: "1.8M", bg: "bg-blue-600", shape: "rounded-full" },
            { icon: Zap, label: "Actions", value: "24K", bg: "bg-black", shape: "" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative p-6 bg-white border-4 border-black"
            >
              <div className={`absolute -top-3 -right-3 w-6 h-6 ${index % 2 === 0 ? "bg-yellow-400" : "bg-red-600"} ${index % 2 === 0 ? "" : "rounded-full"}`} />
              <div className={`w-12 h-12 ${stat.bg} ${stat.shape} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor || "text-white"}`} />
              </div>
              <p className="text-3xl font-black text-black mb-1">{stat.value}</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="Functional design"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border-4 border-black">
            <p className="text-sm font-bold text-black uppercase tracking-wider mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-black transition-colors">
                Primary
              </button>
              <button className="px-8 py-4 bg-yellow-400 text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                Secondary
              </button>
              <button className="px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-wider hover:bg-black transition-colors">
                Accent
              </button>
              <button className="px-8 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
                Dark
              </button>
              <button className="px-8 py-4 bg-white border-4 border-black text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                Outline
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="Geometric purity"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="relative p-8 bg-white border-4 border-black">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-600" />

            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <Circle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-2">
              Circle
            </h3>
            <p className="text-gray-700">
              Unity and wholeness
            </p>
          </div>

          <div className="relative p-8 bg-white border-4 border-black">
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-600" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full" />

            <div className="w-16 h-16 bg-blue-600 flex items-center justify-center mb-4">
              <Square className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-2">
              Square
            </h3>
            <p className="text-gray-700">
              Stability and order
            </p>
          </div>

          <div className="relative p-8 bg-white border-4 border-black">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-600 rounded-full" />
            <div className="absolute -bottom-4 -right-4 w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-red-600 border-r-[20px] border-r-transparent" />

            <div className="w-16 h-16 bg-yellow-400 flex items-center justify-center mb-4">
              <Triangle className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-2">
              Triangle
            </h3>
            <p className="text-gray-700">
              Dynamic energy
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="TABS"
        subtitle="Content navigation"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="border-4 border-black bg-white">
            {/* Tab Headers */}
            <div className="flex border-b-4 border-black">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 px-6 py-4 font-bold uppercase tracking-wider text-sm transition-colors ${
                    activeTab === index
                      ? index === 0 ? "bg-red-600 text-white" : index === 1 ? "bg-yellow-400 text-black" : "bg-blue-600 text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="p-6 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-xl font-black text-black uppercase tracking-wider mb-3">Form</h4>
                  <p className="text-gray-700">The visual appearance and shape of objects. In Bauhaus, form is derived directly from function and materials.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-xl font-black text-black uppercase tracking-wider mb-3">Function</h4>
                  <p className="text-gray-700">The purpose and utility of design. Form follows function - the shape should be determined by its intended use.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-xl font-black text-black uppercase tracking-wider mb-3">Material</h4>
                  <p className="text-gray-700">Honest use of materials - each material should be used according to its inherent properties and qualities.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="ACCORDION"
        subtitle="Collapsible content"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto space-y-0">
          {accordionItems.map((item, index) => (
            <div key={index} className="border-4 border-black border-b-0 last:border-b-4 bg-white">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-black uppercase tracking-wider">{item.title}</span>
                <div className={`w-8 h-8 ${index === 0 ? "bg-red-600 rounded-full" : index === 1 ? "bg-yellow-400" : "bg-blue-600 rounded-full"} flex items-center justify-center`}>
                  {openAccordion === index ? (
                    <ChevronUp className={`w-5 h-5 ${index === 1 ? "text-black" : "text-white"}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${index === 1 ? "text-black" : "text-white"}`} />
                  )}
                </div>
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="ALERTS"
        subtitle="System messages"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Success */}
          <div className="flex items-center gap-4 p-4 bg-white border-4 border-black border-l-[12px] border-l-blue-600">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-black uppercase tracking-wider">Success</p>
              <p className="text-gray-700 text-sm">Operation completed successfully.</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-4 p-4 bg-white border-4 border-black border-l-[12px] border-l-yellow-400">
            <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-bold text-black uppercase tracking-wider">Warning</p>
              <p className="text-gray-700 text-sm">Please review before proceeding.</p>
            </div>
          </div>

          {/* Error */}
          <div className="flex items-center gap-4 p-4 bg-white border-4 border-black border-l-[12px] border-l-red-600">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <X className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-black uppercase tracking-wider">Error</p>
              <p className="text-gray-700 text-sm">An error has occurred.</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-4 p-4 bg-white border-4 border-black border-l-[12px] border-l-black">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-black uppercase tracking-wider">Information</p>
              <p className="text-gray-700 text-sm">Additional details available.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="TOGGLE"
        subtitle="Binary switches"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="border-4 border-black bg-white p-6 space-y-4">
            {[
              { label: "Grid System", desc: "Enable layout grid", color: "bg-red-600" },
              { label: "Primary Colors", desc: "Strict color palette", color: "bg-yellow-400" },
              { label: "Sans-Serif", desc: "Geometric typography", color: "bg-blue-600" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b-2 border-black last:border-b-0">
                <div>
                  <p className="font-bold text-black uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-16 h-8 border-4 border-black transition-colors ${
                    toggleStates[index] ? item.color : "bg-white"
                  }`}
                >
                  <span
                    className={`absolute top-0 w-6 h-6 bg-black transition-all ${
                      toggleStates[index] ? "left-[calc(100%-24px)]" : "left-0"
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
        title="PROGRESS"
        subtitle="Status indicators"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-3xl mx-auto">
          <div className="border-4 border-black bg-white p-6 space-y-6">
            {/* Linear Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-black uppercase tracking-wider">Project Progress</p>
                <p className="text-sm font-bold text-black">{progress}%</p>
              </div>
              <div className="h-6 bg-gray-200 border-2 border-black">
                <div
                  className="h-full bg-red-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Multi-segment Progress */}
            <div>
              <p className="font-bold text-black uppercase tracking-wider mb-2">Phase Completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 100, color: "bg-red-600" },
                  { value: 100, color: "bg-yellow-400" },
                  { value: progress, color: "bg-blue-600" },
                  { value: 0, color: "bg-black" },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="h-4 bg-gray-200 border-2 border-black">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase mt-1 text-center">{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 pt-4 border-t-2 border-black">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-6 py-3 bg-white border-4 border-black text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Decrease
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
              >
                Increase
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="Essential inputs"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-white border-4 border-black">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full" />
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-blue-600" />

            <h3 className="text-xl font-black text-black uppercase tracking-wider mb-6">Contact</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-medium placeholder-gray-400 focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Type here"
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-medium placeholder-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={3}
                  placeholder="Type here"
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-medium placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                />
              </div>
              <button className="w-full px-6 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Grid Demo */}
      <ShowcaseSection
        title="GRID"
        subtitle="12-column system"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 h-16 bg-black flex items-center justify-center text-white font-bold uppercase tracking-wider">12</div>
            <div className="col-span-6 h-16 bg-red-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">6</div>
            <div className="col-span-6 h-16 bg-blue-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">6</div>
            <div className="col-span-4 h-16 bg-yellow-400 flex items-center justify-center text-black font-bold uppercase tracking-wider">4</div>
            <div className="col-span-4 h-16 bg-black flex items-center justify-center text-white font-bold uppercase tracking-wider">4</div>
            <div className="col-span-4 h-16 bg-red-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">4</div>
            <div className="col-span-3 h-16 bg-blue-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">3</div>
            <div className="col-span-3 h-16 bg-yellow-400 flex items-center justify-center text-black font-bold uppercase tracking-wider">3</div>
            <div className="col-span-3 h-16 bg-red-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">3</div>
            <div className="col-span-3 h-16 bg-black flex items-center justify-center text-white font-bold uppercase tracking-wider">3</div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-4 border-black">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-sm font-bold uppercase tracking-wider">
            Bauhaus Showcase · Part of{" "}
            <Link href="/" className="text-black hover:text-red-600 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
