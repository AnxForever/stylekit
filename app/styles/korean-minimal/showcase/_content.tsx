"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Droplets, Wind, Feather, Circle,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Flower2, Sparkle,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Slate Blue", hex: "#3d4a5c", bg: "bg-[#3d4a5c]" },
  { name: "Warm White", hex: "#faf9f7", bg: "bg-[#faf9f7]", border: true },
  { name: "Blush Pink", hex: "#d4a5a5", bg: "bg-[#d4a5a5]" },
  { name: "Sage Green", hex: "#a8c5b8", bg: "bg-[#a8c5b8]" },
  { name: "Sand", hex: "#e8d4b8", bg: "bg-[#e8d4b8]" },
  { name: "Light Gray", hex: "#e8e6e3", bg: "bg-[#e8e6e3]", border: true },
  { name: "Dusty Rose", hex: "#c4959a", bg: "bg-[#c4959a]" },
  { name: "Mist", hex: "#f0eeec", bg: "bg-[#f0eeec]", border: true },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Skin", icon: Droplets },
    { label: "Space", icon: Wind },
    { label: "Mood", icon: Flower2 },
  ];

  const accordionItems = [
    { title: "What is Korean Minimal?", content: "Korean Minimal design merges the K-beauty philosophy of effortless elegance with contemporary architectural restraint. It prioritizes whitespace as the primary design element, using gentle pastel accents and ultra-thin lines to create interfaces that breathe." },
    { title: "The Power of Whitespace", content: "In Korean Minimal, empty space is not absence but presence. Generous padding, restrained layouts, and carefully considered negative space allow content to emerge naturally, creating a sense of calm sophistication." },
    { title: "Pastel Warmth", content: "Unlike cold Scandinavian minimalism, Korean Minimal infuses warmth through soft pastels -- blush pink, sage green, sandy beige. These colors whisper rather than shout, adding personality while maintaining the gentle atmosphere." },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#3d4a5c]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#3d4a5c]/8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/korean-minimal"
            className="flex items-center gap-2 text-[#3d4a5c]/40 hover:text-[#3d4a5c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-wide">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4a5a5]/40" />
            <span className="font-light text-lg tracking-wide text-[#3d4a5c]">
              Korean Minimal
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm tracking-wide text-[#3d4a5c]/60 border border-[#3d4a5c]/10 rounded-2xl hover:border-[#d4a5a5]/40 hover:text-[#3d4a5c] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-32 px-6 relative">
        <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-[#d4a5a5]/20" />
        <div className="absolute bottom-24 left-16 w-2 h-2 rounded-full bg-[#a8c5b8]/20" />
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-[1px] bg-[#3d4a5c]/15 mx-auto mb-14" />
          <h1 className="text-4xl md:text-6xl font-light text-[#3d4a5c] mb-10 leading-tight tracking-wide">
            The beauty of
            <span className="block text-[#d4a5a5]">restraint</span>
          </h1>
          <p className="text-base text-[#3d4a5c]/35 max-w-md mx-auto leading-relaxed">
            Where simplicity speaks louder than complexity, and every breath of space has intention.
          </p>
          <div className="w-12 h-[1px] bg-[#3d4a5c]/15 mx-auto mt-14" />
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Gentle metrics"
        className="py-20 px-6"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Users, label: "Followers", value: "3,182" },
            { icon: TrendingUp, label: "Growth", value: "+22%" },
            { icon: Eye, label: "Views", value: "156K" },
            { icon: Heart, label: "Saves", value: "4,501" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-8 bg-[#faf9f7] rounded-2xl border border-[#3d4a5c]/8 shadow-sm"
            >
              <stat.icon className="w-4 h-4 text-[#d4a5a5] mb-6" />
              <p className="text-3xl font-light text-[#3d4a5c] mb-1">{stat.value}</p>
              <p className="text-xs text-[#3d4a5c]/30 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Whispered tones"
        className="py-20 px-6 bg-[#f0eeec]/50"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden border border-[#3d4a5c]/8 bg-[#faf9f7] shadow-sm"
            labelClassName="text-sm font-light text-[#3d4a5c]"
            hexClassName="text-xs text-[#3d4a5c]/30 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Light and legible"
        className="py-20 px-6"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-10 bg-[#faf9f7] rounded-2xl border border-[#3d4a5c]/8 shadow-sm">
            <div className="w-8 h-[2px] bg-[#d4a5a5] mb-8" />
            <p className="text-5xl font-light text-[#3d4a5c] mb-6 leading-tight tracking-wide">Heading</p>
            <p className="text-3xl font-light text-[#3d4a5c] mb-6">Subheading</p>
            <p className="text-lg font-light text-[#3d4a5c]/40 mb-6 leading-relaxed">
              Body text that breathes. Generous line-height, gentle weight, quiet confidence.
            </p>
            <p className="text-xs text-[#3d4a5c]/25 tracking-wide">
              Caption text, barely there, yet perfectly placed
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Subtle interactions"
        className="py-20 px-6 bg-[#f0eeec]/50"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-10 bg-[#faf9f7] rounded-2xl border border-[#3d4a5c]/8 shadow-sm">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-3 bg-[#3d4a5c] text-[#faf9f7] font-normal tracking-wide rounded-2xl shadow-sm hover:shadow-md hover:bg-[#3d4a5c]/90 transition-all duration-300">
                Primary
              </button>
              <button className="px-8 py-3 bg-transparent text-[#3d4a5c] font-normal tracking-wide rounded-2xl border border-[#3d4a5c]/15 hover:border-[#d4a5a5]/40 transition-all duration-300">
                Secondary
              </button>
              <button className="px-8 py-3 text-[#d4a5a5] font-normal tracking-wide hover:text-[#3d4a5c] transition-all duration-300">
                Text Link
              </button>
              <button className="px-8 py-3 bg-[#d4a5a5] text-[#faf9f7] font-normal tracking-wide rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                Accent
              </button>
              <button className="px-8 py-3 bg-[#3d4a5c]/5 text-[#3d4a5c]/25 font-normal tracking-wide rounded-2xl cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Breathing containers"
        className="py-20 px-6"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Feather, title: "Lightness", desc: "Every element carries only the weight it needs. Typography stays light, borders stay thin, shadows stay soft." },
            { icon: Circle, title: "Space", desc: "Whitespace is the most important design element. Content breathes, the eye rests, and clarity emerges from restraint." },
            { icon: Sparkle, title: "Detail", desc: "A single thin line, a tiny pastel dot, a subtle border shift. The smallest details speak the loudest in minimal design." },
          ].map((card, index) => (
            <div key={index} className="p-8 bg-[#faf9f7] rounded-2xl border border-[#3d4a5c]/8 shadow-sm hover:shadow-[0_4px_12px_rgba(61,74,92,0.06)] hover:translate-y-[-1px] transition-all duration-300 group">
              <div className="w-6 h-[2px] bg-[#d4a5a5]/40 mb-6 group-hover:bg-[#d4a5a5] transition-colors" />
              <card.icon className="w-5 h-5 text-[#d4a5a5]/60 mb-5 group-hover:text-[#3d4a5c] transition-colors" />
              <h3 className="text-lg font-light text-[#3d4a5c] mb-3 tracking-wide">{card.title}</h3>
              <p className="text-sm text-[#3d4a5c]/35 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Gentle navigation"
        className="py-20 px-6 bg-[#f0eeec]/50"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#faf9f7] rounded-2xl border border-[#3d4a5c]/8 shadow-sm overflow-hidden">
            <div className="flex border-b border-[#3d4a5c]/8">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm tracking-wide transition-all duration-300 border-b -mb-px ${
                    activeTab === index
                      ? "text-[#d4a5a5] border-[#d4a5a5]"
                      : "text-[#3d4a5c]/30 border-transparent hover:text-[#3d4a5c]/60"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-8 min-h-[120px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-lg font-light text-[#3d4a5c] mb-3">The Glow Within</h4>
                  <p className="text-sm text-[#3d4a5c]/35 leading-relaxed">Like the glass-skin philosophy of K-beauty, this design believes in revealing natural radiance through careful layering. Less product, more luminosity. Less decoration, more clarity.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-light text-[#3d4a5c] mb-3">Room to Breathe</h4>
                  <p className="text-sm text-[#3d4a5c]/35 leading-relaxed">Korean interior spaces honor the gap between objects. A single vase on an empty shelf speaks volumes. In digital form, generous padding and restrained layouts create the same contemplative atmosphere.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-light text-[#3d4a5c] mb-3">Quiet Confidence</h4>
                  <p className="text-sm text-[#3d4a5c]/35 leading-relaxed">The mood is never loud. It is a soft morning light through sheer curtains, a warm cup held in both hands, a moment of stillness in a busy world. Designed calm.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Unfolding gently"
        className="py-20 px-6"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#faf9f7] rounded-2xl border border-[#3d4a5c]/8 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#3d4a5c]/3 transition-colors"
              >
                <span className="font-light text-[#3d4a5c] tracking-wide">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#3d4a5c]/25 transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-6 border-t border-[#3d4a5c]/5">
                  <p className="text-sm text-[#3d4a5c]/35 leading-relaxed pt-5">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Soft notices"
        className="py-20 px-6 bg-[#f0eeec]/50"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-5 bg-[#a8c5b8]/8 rounded-2xl border-l-2 border-[#a8c5b8]/60">
            <Check className="w-4 h-4 text-[#a8c5b8] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-[#3d4a5c]/70">Saved successfully</p>
              <p className="text-xs text-[#3d4a5c]/30 mt-0.5">Your changes have been applied gently.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 bg-[#e8d4b8]/15 rounded-2xl border-l-2 border-[#e8d4b8]">
            <AlertTriangle className="w-4 h-4 text-[#e8d4b8] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-[#3d4a5c]/70">Please note</p>
              <p className="text-xs text-[#3d4a5c]/30 mt-0.5">This action may take a quiet moment.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 bg-[#d4a5a5]/8 rounded-2xl border-l-2 border-[#d4a5a5]/60">
            <X className="w-4 h-4 text-[#d4a5a5] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-[#3d4a5c]/70">Something went wrong</p>
              <p className="text-xs text-[#3d4a5c]/30 mt-0.5">Please try again at your own pace.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-5 bg-[#3d4a5c]/4 rounded-2xl border-l-2 border-[#3d4a5c]/15">
            <Info className="w-4 h-4 text-[#3d4a5c]/40 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-[#3d4a5c]/70">A gentle hint</p>
              <p className="text-xs text-[#3d4a5c]/30 mt-0.5">Hover softly for more details.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-20 px-6"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#faf9f7] rounded-2xl border border-[#3d4a5c]/8 p-8 space-y-6 shadow-sm">
            {[
              { label: "Soft Transitions", desc: "Enable gentle, slow animation curves" },
              { label: "Extra Whitespace", desc: "Increase padding for a more open feel" },
              { label: "Pastel Accents", desc: "Highlight interactive elements with blush tones" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-normal text-[#3d4a5c] tracking-wide">{item.label}</p>
                  <p className="text-xs text-[#3d4a5c]/25 mt-1">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                    toggleStates[index] ? "bg-[#d4a5a5]" : "bg-[#3d4a5c]/10"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                      toggleStates[index] ? "translate-x-5" : "translate-x-0"
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
        subtitle="Gentle indicators"
        className="py-20 px-6 bg-[#f0eeec]/50"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#faf9f7] rounded-2xl border border-[#3d4a5c]/8 p-8 space-y-8 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-normal text-[#3d4a5c] tracking-wide">Reading progress</p>
                <p className="text-xs text-[#3d4a5c]/25 font-mono">{progress}%</p>
              </div>
              <div className="h-1 bg-[#3d4a5c]/6 rounded-full">
                <div
                  className="h-full bg-[#d4a5a5] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-normal text-[#3d4a5c] mb-3 tracking-wide">Chapter completion</p>
              <div className="grid grid-cols-4 gap-3">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1 bg-[#3d4a5c]/6 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all ${value === 100 ? "bg-[#a8c5b8]" : value > 0 ? "bg-[#d4a5a5]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#3d4a5c]/20 mt-2 text-center">Ch.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-[#3d4a5c]/6">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-5 py-2 text-sm tracking-wide border border-[#3d4a5c]/10 text-[#3d4a5c]/40 rounded-2xl hover:border-[#d4a5a5]/40 hover:text-[#3d4a5c] transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-5 py-2 text-sm tracking-wide bg-[#3d4a5c] text-[#faf9f7] rounded-2xl shadow-sm hover:shadow-md hover:bg-[#3d4a5c]/90 transition-all duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Delicate inputs"
        className="py-20 px-6"
        titleClassName="text-xl font-light tracking-wide text-[#3d4a5c] mb-2"
        subtitleClassName="text-sm text-[#3d4a5c]/30 mb-12"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#faf9f7] rounded-2xl border border-[#3d4a5c]/8 p-10 shadow-sm">
            <div className="w-8 h-[2px] bg-[#d4a5a5] mb-8" />
            <h3 className="text-lg font-light text-[#3d4a5c] mb-8 tracking-wide">Get in Touch</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs text-[#3d4a5c]/30 mb-2 tracking-wide">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-5 py-3 bg-[#faf9f7] border border-[#3d4a5c]/10 rounded-2xl text-[#3d4a5c] placeholder-[#3d4a5c]/20 font-light tracking-wide focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs text-[#3d4a5c]/30 mb-2 tracking-wide">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-5 py-3 bg-[#faf9f7] border border-[#3d4a5c]/10 rounded-2xl text-[#3d4a5c] placeholder-[#3d4a5c]/20 font-light tracking-wide focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs text-[#3d4a5c]/30 mb-2 tracking-wide">Message</label>
                <textarea
                  placeholder="Your thoughts..."
                  rows={3}
                  className="w-full px-5 py-3 bg-[#faf9f7] border border-[#3d4a5c]/10 rounded-2xl text-[#3d4a5c] placeholder-[#3d4a5c]/20 font-light tracking-wide focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-300 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#3d4a5c] text-[#faf9f7] font-normal tracking-wide rounded-2xl shadow-sm hover:shadow-md hover:bg-[#3d4a5c]/90 transition-all duration-300 mt-2">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#3d4a5c]/6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-8 h-[1px] bg-[#3d4a5c]/10 mx-auto mb-4" />
          <p className="text-xs text-[#3d4a5c]/25 tracking-wide">
            Korean Minimal Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#d4a5a5] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
