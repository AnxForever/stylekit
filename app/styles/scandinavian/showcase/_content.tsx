"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Sun, Leaf, Mountain, Snowflake,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Home, Coffee, BookOpen
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Birch White", hex: "#f5f0eb", bg: "bg-[#f5f0eb]", border: true },
  { name: "Wool Gray", hex: "#d4cdc5", bg: "bg-[#d4cdc5]" },
  { name: "Driftwood", hex: "#a89279", bg: "bg-[#a89279]" },
  { name: "Pine Green", hex: "#5a7a6b", bg: "bg-[#5a7a6b]" },
  { name: "Fjord Blue", hex: "#7ba0b8", bg: "bg-[#7ba0b8]" },
  { name: "Clay", hex: "#c9a88c", bg: "bg-[#c9a88c]" },
  { name: "Charcoal", hex: "#3d3d3d", bg: "bg-[#3d3d3d]" },
  { name: "Linen", hex: "#ece6dd", bg: "bg-[#ece6dd]", border: true },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Home", icon: Home },
    { label: "Cafe", icon: Coffee },
    { label: "Journal", icon: BookOpen },
  ];

  const accordionItems = [
    { title: "What is Scandinavian Design?", content: "Scandinavian design originated in the Nordic countries during the 1950s. It emphasizes simplicity, functionality, and a connection to nature, creating spaces that feel warm, inviting, and effortlessly beautiful." },
    { title: "Key Principles", content: "Less is more. Clean lines, organic forms, natural materials like wood and wool, abundant natural light, and a muted color palette inspired by Nordic landscapes." },
    { title: "Hygge Philosophy", content: "Hygge (pronounced 'hoo-ga') is the Danish concept of cozy contentment. In design, it translates to warm textures, soft lighting, and spaces that promote well-being and togetherness." },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0eb] text-[#3d3d3d]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#d4cdc5]/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/scandinavian"
            className="flex items-center gap-2 text-[#a89279] hover:text-[#3d3d3d] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#5a7a6b]" />
            <span className="font-light text-lg tracking-wider text-[#3d3d3d]">
              Scandinavian
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm text-[#5a7a6b] border border-[#5a7a6b]/30 rounded-sm hover:bg-[#5a7a6b] hover:text-white transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#d4cdc5]" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#a89279]">Scandinavian Minimalism</span>
            <div className="w-8 h-px bg-[#d4cdc5]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extralight text-[#3d3d3d] mb-8 leading-tight tracking-tight">
            Less, but
            <span className="block font-light italic text-[#5a7a6b]">better</span>
          </h1>
          <p className="text-lg font-light text-[#a89279] max-w-xl mx-auto leading-relaxed">
            Warmth through simplicity. Comfort in restraint. Beauty in the everyday.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Design metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Followers", value: "2,841" },
            { icon: TrendingUp, label: "Growth", value: "+18%" },
            { icon: Eye, label: "Views", value: "142K" },
            { icon: Heart, label: "Saves", value: "3,209" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/60 rounded-sm border border-[#d4cdc5]/40"
            >
              <stat.icon className="w-5 h-5 text-[#5a7a6b] mb-4" />
              <p className="text-3xl font-light text-[#3d3d3d] mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-[#a89279]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Inspired by Nordic landscapes"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-sm overflow-hidden border border-[#d4cdc5]/40 bg-white/60"
            labelClassName="text-sm font-light text-[#3d3d3d]"
            hexClassName="text-xs text-[#a89279] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Clean and legible"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-white/60 rounded-sm border border-[#d4cdc5]/40">
            <p className="text-6xl font-extralight text-[#3d3d3d] mb-4 leading-tight">Heading</p>
            <p className="text-4xl font-light text-[#3d3d3d] mb-4">Subheading</p>
            <p className="text-xl font-light text-[#a89279] mb-4 leading-relaxed">
              Body text that breathes. Generous line-height for comfortable reading.
            </p>
            <p className="text-sm text-[#a89279]/70 tracking-wider uppercase">
              Caption text with thoughtful spacing
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Subtle and purposeful"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/60 rounded-sm border border-[#d4cdc5]/40">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#3d3d3d] text-[#f5f0eb] text-sm tracking-wider rounded-sm hover:bg-[#5a7a6b] transition-colors">
                Primary
              </button>
              <button className="px-6 py-3 border border-[#3d3d3d] text-[#3d3d3d] text-sm tracking-wider rounded-sm hover:bg-[#3d3d3d] hover:text-white transition-colors">
                Secondary
              </button>
              <button className="px-6 py-3 text-[#5a7a6b] text-sm tracking-wider hover:text-[#3d3d3d] transition-colors underline underline-offset-4 decoration-[#d4cdc5]">
                Text Link
              </button>
              <button className="px-6 py-3 bg-[#5a7a6b] text-white text-sm tracking-wider rounded-sm hover:bg-[#4a6a5b] transition-colors">
                Accent
              </button>
              <button className="px-6 py-3 bg-[#d4cdc5]/40 text-[#a89279] text-sm tracking-wider rounded-sm cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Content containers"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Mountain, title: "Nature", desc: "Drawing inspiration from Nordic forests, fjords, and the quiet beauty of winter landscapes." },
            { icon: Sun, title: "Light", desc: "Celebrating natural light with open spaces, warm tones, and a sense of airiness." },
            { icon: Snowflake, title: "Simplicity", desc: "Every element serves a purpose. Nothing is added without intention or need." },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-white/60 rounded-sm border border-[#d4cdc5]/40 hover:border-[#5a7a6b]/30 transition-colors group">
              <card.icon className="w-6 h-6 text-[#5a7a6b] mb-4 group-hover:text-[#3d3d3d] transition-colors" />
              <h3 className="text-lg font-light text-[#3d3d3d] mb-3">{card.title}</h3>
              <p className="text-sm text-[#a89279] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/60 rounded-sm border border-[#d4cdc5]/40 overflow-hidden">
            <div className="flex border-b border-[#d4cdc5]/40">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm transition-colors border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#5a7a6b] border-[#5a7a6b]"
                      : "text-[#a89279] border-transparent hover:text-[#3d3d3d]"
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
                  <h4 className="text-lg font-light text-[#3d3d3d] mb-2">Living Space</h4>
                  <p className="text-sm text-[#a89279] leading-relaxed">A warm, inviting atmosphere with natural wood accents, soft textiles, and plenty of natural light filtering through linen curtains.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-light text-[#3d3d3d] mb-2">Morning Ritual</h4>
                  <p className="text-sm text-[#a89279] leading-relaxed">Start the day with a quiet moment. Simple ceramic cups, freshly brewed coffee, and the gentle warmth of a new day.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-light text-[#3d3d3d] mb-2">Daily Reflections</h4>
                  <p className="text-sm text-[#a89279] leading-relaxed">Mindful journaling on handmade paper. Thoughts flow freely in a space designed for calm and clarity.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Expandable content"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white/60 rounded-sm border border-[#d4cdc5]/40 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/40 transition-colors"
              >
                <span className="font-light text-[#3d3d3d]">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#a89279] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#d4cdc5]/30">
                  <p className="text-sm text-[#a89279] leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Gentle notifications"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#5a7a6b]/10 rounded-sm border-l-2 border-[#5a7a6b]">
            <Check className="w-4 h-4 text-[#5a7a6b] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#5a7a6b]">Saved successfully</p>
              <p className="text-xs text-[#5a7a6b]/70 mt-0.5">Your changes have been applied.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#c9a88c]/10 rounded-sm border-l-2 border-[#c9a88c]">
            <AlertTriangle className="w-4 h-4 text-[#a89279] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#a89279]">Please note</p>
              <p className="text-xs text-[#a89279]/70 mt-0.5">This action may take a moment.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#c97a7a]/10 rounded-sm border-l-2 border-[#c97a7a]">
            <X className="w-4 h-4 text-[#c97a7a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#c97a7a]">Something went wrong</p>
              <p className="text-xs text-[#c97a7a]/70 mt-0.5">Please try again later.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#7ba0b8]/10 rounded-sm border-l-2 border-[#7ba0b8]">
            <Info className="w-4 h-4 text-[#7ba0b8] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#7ba0b8]">Helpful tip</p>
              <p className="text-xs text-[#7ba0b8]/70 mt-0.5">Hover over items for more details.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/60 rounded-sm border border-[#d4cdc5]/40 p-6 space-y-5">
            {[
              { label: "Natural Light Mode", desc: "Adjust interface to ambient lighting" },
              { label: "Minimal Animations", desc: "Reduce motion for a calmer experience" },
              { label: "Auto-save Drafts", desc: "Preserve your work automatically" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm text-[#3d3d3d]">{item.label}</p>
                  <p className="text-xs text-[#a89279] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    toggleStates[index] ? "bg-[#5a7a6b]" : "bg-[#d4cdc5]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
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
        subtitle="Quiet indicators"
        className="py-16 px-6 bg-white/40"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/60 rounded-sm border border-[#d4cdc5]/40 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[#3d3d3d]">Reading progress</p>
                <p className="text-xs text-[#a89279] font-mono">{progress}%</p>
              </div>
              <div className="h-1.5 bg-[#d4cdc5]/40 rounded-full">
                <div
                  className="h-full bg-[#5a7a6b] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-[#3d3d3d] mb-2">Chapter completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1.5 bg-[#d4cdc5]/40 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all ${value === 100 ? "bg-[#5a7a6b]" : value > 0 ? "bg-[#7ba0b8]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#a89279] mt-1 text-center">Ch.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#d4cdc5]/30">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm border border-[#d4cdc5] text-[#a89279] rounded-sm hover:border-[#3d3d3d] hover:text-[#3d3d3d] transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm bg-[#3d3d3d] text-[#f5f0eb] rounded-sm hover:bg-[#5a7a6b] transition-colors"
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
        subtitle="Clean inputs"
        className="py-16 px-6"
        titleClassName="text-2xl font-light text-[#3d3d3d] mb-2"
        subtitleClassName="text-sm text-[#a89279] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white/60 rounded-sm border border-[#d4cdc5]/40 p-8">
            <h3 className="text-lg font-light text-[#3d3d3d] mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#a89279] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-transparent border-b border-[#d4cdc5] text-[#3d3d3d] placeholder-[#d4cdc5] focus:outline-none focus:border-[#5a7a6b] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#a89279] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 bg-transparent border-b border-[#d4cdc5] text-[#3d3d3d] placeholder-[#d4cdc5] focus:outline-none focus:border-[#5a7a6b] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#a89279] mb-2">Message</label>
                <textarea
                  placeholder="Your thoughts..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-transparent border-b border-[#d4cdc5] text-[#3d3d3d] placeholder-[#d4cdc5] focus:outline-none focus:border-[#5a7a6b] transition-colors resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#3d3d3d] text-[#f5f0eb] text-sm tracking-wider rounded-sm hover:bg-[#5a7a6b] transition-colors mt-2">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#d4cdc5]/40">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-[#a89279] tracking-wider">
            Scandinavian Minimalism Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#5a7a6b] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
