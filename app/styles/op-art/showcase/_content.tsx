"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Circle, Hexagon, Grid3X3,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Scan, Aperture, BookOpen
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Pure Black", hex: "#000000", bg: "bg-[#000000]" },
  { name: "Pure White", hex: "#ffffff", bg: "bg-[#ffffff]", border: true },
  { name: "Vibrant Red", hex: "#ff3300", bg: "bg-[#ff3300]" },
  { name: "Electric Blue", hex: "#0066ff", bg: "bg-[#0066ff]" },
  { name: "Signal Yellow", hex: "#ffcc00", bg: "bg-[#ffcc00]" },
  { name: "Mid Gray", hex: "#808080", bg: "bg-[#808080]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Perceive", icon: Scan },
    { label: "Optical", icon: Aperture },
    { label: "Study", icon: BookOpen },
  ];

  const accordionItems = [
    { title: "WHAT IS OP ART?", content: "Op Art (Optical Art) emerged in the 1960s, led by Bridget Riley and Victor Vasarely. It uses precise geometric patterns to create illusions of movement, vibration, and depth on two-dimensional surfaces, challenging the viewer's perceptual system." },
    { title: "VISUAL TENSION", content: "When black and white alternate at specific frequencies and angles, the human eye perceives motion where none exists. Concentric circles, checkerboards, moire patterns, and gradient lines -- simple elements that, through mathematical precision, make static images come alive." },
    { title: "VIBRATING COLOR PAIRS", content: "Beyond black and white, Op Art employs vibrating color pairs -- red against blue, yellow against violet. When placed adjacent, these complementary colors oscillate on the retina, generating an unsettling energy that keeps the eye in constant motion." },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b-2 border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/op-art"
            className="flex items-center gap-2 text-black/50 hover:text-black transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-sans font-medium uppercase tracking-[0.3em]">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-[#ff3300] inline-block" />
              <span className="w-2 h-2 bg-[#0066ff] inline-block" />
              <span className="w-2 h-2 bg-[#ffcc00] inline-block" />
            </div>
            <span className="font-sans font-bold text-lg tracking-[0.3em] uppercase text-black">
              Op Art
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-sans font-medium uppercase tracking-[0.3em] text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-200"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative overflow-hidden">
        {/* Concentric circles background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-black rounded-full"
              style={{
                width: `${(i + 1) * 100}px`,
                height: `${(i + 1) * 100}px`,
              }}
            />
          ))}
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-black" />
            <span className="text-xs uppercase tracking-[0.4em] text-black/50 font-sans font-medium">Optical Illusion Design</span>
            <div className="w-8 h-[2px] bg-black" />
          </div>
          <h1 className="text-5xl md:text-8xl font-sans font-bold text-black mb-8 leading-tight tracking-tight uppercase">
            See beyond
            <span className="block text-black/20">the surface</span>
          </h1>
          <div className="flex justify-center gap-2 mb-8">
            <span className="w-4 h-4 bg-[#ff3300] inline-block" />
            <span className="w-4 h-4 bg-[#0066ff] inline-block" />
            <span className="w-4 h-4 bg-[#ffcc00] inline-block" />
          </div>
          <p className="text-lg font-sans font-medium text-black/40 max-w-xl mx-auto leading-relaxed tracking-[0.2em] uppercase">
            Where perception becomes the medium
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="METRICS"
        subtitle="DATA POINTS"
        className="py-16 px-6 bg-black"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-white mb-2 uppercase"
        subtitleClassName="text-sm text-white/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Observers", value: "4,271" },
            { icon: TrendingUp, label: "Growth", value: "+31%" },
            { icon: Eye, label: "Views", value: "267K" },
            { icon: Heart, label: "Saves", value: "5,832" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white border-2 border-black"
            >
              <stat.icon className="w-5 h-5 text-[#ff3300] mb-4" />
              <p className="text-3xl font-sans font-bold text-black mb-1 tracking-tight">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 font-sans font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR SYSTEM"
        subtitle="BLACK WHITE AND VIBRATING PAIRS"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-black mb-2 uppercase"
        subtitleClassName="text-sm text-black/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border-2 border-black bg-white"
            labelClassName="text-sm font-sans font-semibold text-black uppercase tracking-wider"
            hexClassName="text-xs text-black/40 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="TYPOGRAPHY"
        subtitle="GEOMETRIC AND PRECISE"
        className="py-16 px-6 bg-black"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-white mb-2 uppercase"
        subtitleClassName="text-sm text-white/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-white border-2 border-black">
            <div className="flex gap-1 mb-6">
              <div className="w-8 h-[2px] bg-[#ff3300]" />
              <div className="w-8 h-[2px] bg-[#0066ff]" />
              <div className="w-8 h-[2px] bg-[#ffcc00]" />
            </div>
            <p className="text-6xl font-sans font-bold text-black mb-4 leading-tight tracking-tight uppercase">Heading</p>
            <p className="text-4xl font-sans font-semibold text-black/60 mb-4 uppercase tracking-[0.2em]">Subheading</p>
            <p className="text-xl font-sans font-medium text-black/40 mb-4 leading-relaxed tracking-wider uppercase">
              Body text -- clean, minimal, a stable island amid optical patterns.
            </p>
            <p className="text-sm text-black/30 tracking-[0.3em] uppercase font-sans font-medium">
              Caption text with geometric spacing
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="BINARY INTERACTIONS"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-black mb-2 uppercase"
        subtitleClassName="text-sm text-black/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border-2 border-black">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-10 py-3 bg-black text-white text-sm font-sans font-medium uppercase tracking-[0.3em] border-2 border-black hover:bg-white hover:text-black transition-colors duration-200">
                Primary
              </button>
              <button className="px-10 py-3 bg-white text-black text-sm font-sans font-medium uppercase tracking-[0.3em] border-2 border-black hover:bg-black hover:text-white transition-colors duration-200">
                Secondary
              </button>
              <button className="px-10 py-3 text-black text-sm font-sans font-medium uppercase tracking-[0.3em] hover:text-[#ff3300] transition-colors duration-200 underline underline-offset-4 decoration-black">
                Text Link
              </button>
              <button className="px-10 py-3 bg-[#ff3300] text-white text-sm font-sans font-medium uppercase tracking-[0.3em] border-2 border-[#ff3300] hover:bg-white hover:text-[#ff3300] transition-colors duration-200">
                Accent
              </button>
              <button className="px-10 py-3 bg-white text-black/20 text-sm font-sans font-medium uppercase tracking-[0.3em] border-2 border-black/20 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="CONTENT FRAMES"
        className="py-16 px-6 bg-black"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-white mb-2 uppercase"
        subtitleClassName="text-sm text-white/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Circle, title: "Concentric", desc: "Nested circles radiating from a single point create the illusion of infinite depth and pulsating energy." },
            { icon: Grid3X3, title: "Checkerboard", desc: "Alternating squares at calculated angles generate vibration patterns that confound spatial perception." },
            { icon: Hexagon, title: "Tessellation", desc: "Repeating geometric forms tile the plane without gaps, producing hypnotic visual rhythms." },
          ].map((card, index) => (
            <div key={index} className="relative p-8 bg-white border-2 border-black overflow-hidden group hover:bg-black hover:text-white transition-colors duration-200">
              {/* Decorative corner pattern */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute border-2 border-current rounded-full"
                    style={{ inset: `${i * 8}px` }}
                  />
                ))}
              </div>
              <div className="w-8 h-[2px] bg-[#ff3300] mb-4" />
              <card.icon className="w-6 h-6 mb-4 text-current" />
              <h3 className="text-lg font-sans font-semibold tracking-[0.2em] uppercase mb-3">{card.title}</h3>
              <p className="text-sm opacity-50 font-sans leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="TABS"
        subtitle="CONTENT NAVIGATION"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-black mb-2 uppercase"
        subtitleClassName="text-sm text-black/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-2 border-black overflow-hidden">
            <div className="flex border-b-2 border-black">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-sans font-medium uppercase tracking-[0.3em] transition-colors duration-200 border-b-2 -mb-[2px] ${
                    activeTab === index
                      ? "text-white bg-black border-black"
                      : "text-black/30 border-transparent hover:text-black"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-sans font-semibold text-black tracking-[0.2em] uppercase mb-2">Sensory Threshold</h4>
                  <p className="text-sm text-black/50 font-sans leading-relaxed tracking-wider">Op Art pushes the eye to its limits. Patterns that seem to move, expand, and contract exist only in the space between canvas and retina -- the art is created by your perception itself.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-sans font-semibold text-black tracking-[0.2em] uppercase mb-2">Moire Interference</h4>
                  <p className="text-sm text-black/50 font-sans leading-relaxed tracking-wider">When two regular patterns overlap at slight angles, moire interference emerges -- a ghost pattern that exists in neither layer alone. Mathematics made visible, geometry made sensory.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-sans font-semibold text-black tracking-[0.2em] uppercase mb-2">Research Notes</h4>
                  <p className="text-sm text-black/50 font-sans leading-relaxed tracking-wider">Riley and Vasarely documented their systematic explorations of visual perception. Each work a controlled experiment in how geometry interacts with human neurology.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="ACCORDION"
        subtitle="EXPANDABLE CONTENT"
        className="py-16 px-6 bg-black"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-white mb-2 uppercase"
        subtitleClassName="text-sm text-white/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white border-2 border-black overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-black/5 transition-colors duration-200"
              >
                <span className="font-sans font-semibold text-black tracking-[0.2em] text-sm uppercase">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-black/30 transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-2 border-black">
                  <p className="text-sm text-black/50 font-sans leading-relaxed tracking-wider pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="ALERTS"
        subtitle="SYSTEM SIGNALS"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-black mb-2 uppercase"
        subtitleClassName="text-sm text-black/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-white border-2 border-black border-l-[8px] border-l-black">
            <Check className="w-4 h-4 text-black mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-black uppercase tracking-[0.2em]">Pattern verified</p>
              <p className="text-xs text-black/40 mt-0.5 font-sans tracking-wider">Optical alignment confirmed.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white border-2 border-black border-l-[8px] border-l-[#ffcc00]">
            <AlertTriangle className="w-4 h-4 text-[#ffcc00] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-black uppercase tracking-[0.2em]">Visual strain</p>
              <p className="text-xs text-black/40 mt-0.5 font-sans tracking-wider">Pattern density approaching threshold.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white border-2 border-black border-l-[8px] border-l-[#ff3300]">
            <X className="w-4 h-4 text-[#ff3300] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-black uppercase tracking-[0.2em]">Perception error</p>
              <p className="text-xs text-black/40 mt-0.5 font-sans tracking-wider">Geometric calibration failed.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-white border-2 border-black border-l-[8px] border-l-[#0066ff]">
            <Info className="w-4 h-4 text-[#0066ff] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-semibold text-black uppercase tracking-[0.2em]">Observation</p>
              <p className="text-xs text-black/40 mt-0.5 font-sans tracking-wider">Moire interference detected in overlay.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="TOGGLE"
        subtitle="BINARY STATES"
        className="py-16 px-6 bg-black"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-white mb-2 uppercase"
        subtitleClassName="text-sm text-white/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-2 border-black p-6 space-y-5">
            {[
              { label: "HIGH CONTRAST MODE", desc: "Maximize black-white differential" },
              { label: "PATTERN OVERLAY", desc: "Display geometric background textures" },
              { label: "VIBRATION PAIRS", desc: "Enable complementary color accents" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-sans font-semibold text-black tracking-[0.2em] uppercase">{item.label}</p>
                  <p className="text-xs text-black/30 mt-0.5 font-sans tracking-wider">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 border-2 border-black transition-colors duration-200 ${
                    toggleStates[index] ? "bg-black" : "bg-white"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 transition-all duration-200 ${
                      toggleStates[index] ? "translate-x-6 bg-white" : "translate-x-0 bg-black"
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
        subtitle="LINEAR MEASUREMENT"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-black mb-2 uppercase"
        subtitleClassName="text-sm text-black/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-2 border-black p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-sans font-semibold text-black tracking-[0.2em] uppercase">Perception index</p>
                <p className="text-xs text-black/40 font-mono">{progress}%</p>
              </div>
              <div className="h-2 bg-black/10 border-2 border-black">
                <div
                  className="h-full bg-black transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-sans font-semibold text-black tracking-[0.2em] uppercase mb-2">Quadrant analysis</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-2 bg-black/10 border-2 border-black">
                      <div
                        className={`h-full transition-all ${value === 100 ? "bg-black" : value > 0 ? "bg-[#ff3300]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-black/30 mt-1 text-center font-sans font-medium uppercase">Q.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-2 border-black">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-sans font-medium uppercase tracking-[0.3em] border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-sans font-medium uppercase tracking-[0.3em] bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors duration-200"
              >
                Advance
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="DATA INPUT"
        className="py-16 px-6 bg-black"
        titleClassName="text-2xl font-sans font-bold tracking-[0.3em] text-white mb-2 uppercase"
        subtitleClassName="text-sm text-white/40 tracking-[0.3em] mb-10 font-sans font-medium uppercase"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white border-2 border-black p-8">
            <div className="flex gap-1 mb-4">
              <div className="w-8 h-[2px] bg-[#ff3300]" />
              <div className="w-8 h-[2px] bg-[#0066ff]" />
              <div className="w-8 h-[2px] bg-[#ffcc00]" />
            </div>
            <h3 className="text-lg font-sans font-semibold text-black tracking-[0.2em] uppercase mb-6">Contact</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-black/30 mb-2 font-sans font-medium">Name</label>
                <input
                  type="text"
                  placeholder="TYPE HERE..."
                  className="w-full px-5 py-3 bg-white border-2 border-black text-black placeholder-black/20 font-sans font-medium tracking-wider text-sm uppercase focus:border-[#ff3300] focus:shadow-[4px_4px_0_#000000] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-black/30 mb-2 font-sans font-medium">Email</label>
                <input
                  type="email"
                  placeholder="YOUR@EMAIL.COM"
                  className="w-full px-5 py-3 bg-white border-2 border-black text-black placeholder-black/20 font-sans font-medium tracking-wider text-sm uppercase focus:border-[#ff3300] focus:shadow-[4px_4px_0_#000000] focus:outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-black/30 mb-2 font-sans font-medium">Message</label>
                <textarea
                  placeholder="YOUR MESSAGE..."
                  rows={3}
                  className="w-full px-5 py-3 bg-white border-2 border-black text-black placeholder-black/20 font-sans font-medium tracking-wider text-sm uppercase focus:border-[#ff3300] focus:shadow-[4px_4px_0_#000000] focus:outline-none transition-all duration-200 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-black text-white text-sm font-sans font-medium uppercase tracking-[0.3em] border-2 border-black hover:bg-white hover:text-black transition-colors duration-200 mt-2">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-2 border-black">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center gap-2 mb-4">
            <span className="w-3 h-3 bg-[#ff3300] inline-block" />
            <span className="w-3 h-3 bg-[#0066ff] inline-block" />
            <span className="w-3 h-3 bg-[#ffcc00] inline-block" />
          </div>
          <p className="text-xs text-black/30 tracking-[0.3em] font-sans font-medium uppercase">
            Op Art Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-black transition-colors duration-200">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
