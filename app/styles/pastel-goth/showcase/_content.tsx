"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Moon, Star, CloudMoon,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Sparkles, Ghost,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Dark Purple", hex: "#2d1b3d", bg: "bg-[#2d1b3d]" },
  { name: "Near Black", hex: "#1a1225", bg: "bg-[#1a1225]" },
  { name: "Lavender", hex: "#d4a5e3", bg: "bg-[#d4a5e3]" },
  { name: "Pastel Teal", hex: "#7ec8c8", bg: "bg-[#7ec8c8]" },
  { name: "Pastel Pink", hex: "#f5a5b8", bg: "bg-[#f5a5b8]" },
  { name: "Periwinkle", hex: "#b8a5f5", bg: "bg-[#b8a5f5]" },
  { name: "Midnight Plum", hex: "#231530", bg: "bg-[#231530]" },
  { name: "Soft Orchid", hex: "#c490d1", bg: "bg-[#c490d1]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Shadows", icon: Moon },
    { label: "Spirits", icon: Ghost },
    { label: "Stars", icon: Sparkles },
  ];

  const accordionItems = [
    { title: "What is Pastel Goth?", content: "Pastel Goth emerged from Tumblr subculture in the early 2010s, fusing traditional gothic darkness with sweet candy-colored pastels. It challenges the binary of cute versus dark, creating a third aesthetic space that is simultaneously eerie and charming." },
    { title: "The Dark-Sweet Paradox", content: "Deep purple-black backgrounds cradle soft lavender, teal, and pink highlights. Gothic symbols like crosses, skulls, and moons are rendered in pastel hues, stripping away their menace while preserving their mystery. The contradiction is the point." },
    { title: "Glow in the Darkness", content: "Pastel colors on dark backgrounds produce a soft luminous effect, as if the interface itself radiates an otherworldly light. This ambient glow creates a dreamlike atmosphere that is uniquely pastel goth -- neither fully light nor fully dark." },
  ];

  return (
    <div className="min-h-screen bg-[#1a1225] text-[#d4a5e3]">
      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[#d4a5e3]/3 blur-3xl" />
        <div className="absolute bottom-40 right-[15%] w-48 h-48 rounded-full bg-[#7ec8c8]/3 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5a5b8]/2 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="px-6 py-5 border-b border-[#d4a5e3]/15 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/pastel-goth"
            className="flex items-center gap-2 text-[#b8a5f5]/50 hover:text-[#d4a5e3] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#d4a5e3]/50" />
              <div className="w-2 h-2 rounded-full bg-[#7ec8c8]/50" />
              <div className="w-2 h-2 rounded-full bg-[#f5a5b8]/50" />
            </div>
            <span className="font-bold text-lg tracking-wide text-[#d4a5e3]">
              Pastel Goth
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-bold tracking-wide text-[#7ec8c8] border border-[#7ec8c8]/20 rounded-xl hover:border-[#7ec8c8]/50 hover:shadow-[0_0_12px_rgba(126,200,200,0.2)] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative z-10">
        <div className="absolute top-16 right-16">
          <div className="w-[2px] h-8 bg-[#b8a5f5]/20 mx-auto" />
          <div className="w-8 h-[2px] bg-[#b8a5f5]/20 -mt-4 -ml-[15px]" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex gap-3 justify-center mb-8">
            <div className="w-2 h-2 rounded-full bg-[#d4a5e3]/40" />
            <div className="w-2 h-2 rounded-full bg-[#7ec8c8]/40" />
            <div className="w-2 h-2 rounded-full bg-[#f5a5b8]/40" />
            <div className="w-2 h-2 rounded-full bg-[#b8a5f5]/40" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4a5e3] via-[#f5a5b8] to-[#b8a5f5] mb-8 leading-tight tracking-wide">
            Darkness dressed
            <span className="block">in candy</span>
          </h1>
          <p className="text-lg text-[#7ec8c8]/50 max-w-xl mx-auto leading-relaxed">
            Where shadows bloom in pastel light and the night wears soft colors.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Nocturnal metrics"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Followers", value: "4,666" },
            { icon: TrendingUp, label: "Growth", value: "+31%" },
            { icon: Eye, label: "Views", value: "213K" },
            { icon: Heart, label: "Saves", value: "5,404" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#1a1225] rounded-xl border border-[#b8a5f5]/15 shadow-[0_0_16px_rgba(184,165,245,0.1)]"
            >
              <stat.icon className="w-5 h-5 text-[#f5a5b8] mb-4" />
              <p className="text-3xl font-bold text-[#d4a5e3] mb-1">{stat.value}</p>
              <p className="text-xs text-[#b8a5f5]/40 tracking-wide font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Dark depths and candy highlights"
        className="py-16 px-6 bg-[#2d1b3d]/30 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-xl overflow-hidden border border-[#d4a5e3]/15 bg-[#1a1225] shadow-[0_0_8px_rgba(212,165,227,0.1)]"
            labelClassName="text-sm font-bold text-[#d4a5e3]"
            hexClassName="text-xs text-[#b8a5f5]/40 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Bold and ethereal"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#1a1225] rounded-xl border border-[#b8a5f5]/15 shadow-[0_0_20px_rgba(184,165,245,0.1)]">
            <div className="flex gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#d4a5e3]" />
              <div className="w-2 h-2 rounded-full bg-[#7ec8c8]" />
              <div className="w-2 h-2 rounded-full bg-[#f5a5b8]" />
            </div>
            <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4a5e3] to-[#f5a5b8] mb-4 leading-tight">Heading</p>
            <p className="text-4xl font-bold text-[#d4a5e3] mb-4">Subheading</p>
            <p className="text-xl text-[#b8a5f5]/50 mb-4 leading-relaxed">
              Body text glowing softly in the void. Ethereal, readable, tinged with dreamlight.
            </p>
            <p className="text-sm text-[#7ec8c8]/40 tracking-wide font-bold">
              Caption text whispering from the shadows
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Glowing interactions"
        className="py-16 px-6 bg-[#2d1b3d]/30 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#1a1225] rounded-xl border border-[#d4a5e3]/15 shadow-[0_0_20px_rgba(212,165,227,0.1)]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#2d1b3d] text-[#d4a5e3] font-bold tracking-wide rounded-xl border border-[#d4a5e3]/30 shadow-[0_0_16px_rgba(212,165,227,0.25)] hover:shadow-[0_0_24px_rgba(212,165,227,0.4)] hover:border-[#d4a5e3]/60 transition-all duration-300">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#1a1225] text-[#7ec8c8] font-bold tracking-wide rounded-xl border border-[#7ec8c8]/20 hover:border-[#7ec8c8]/50 hover:shadow-[0_0_16px_rgba(126,200,200,0.2)] transition-all duration-300">
                Secondary
              </button>
              <button className="px-6 py-3 text-[#f5a5b8] font-bold tracking-wide hover:text-[#f5a5b8]/80 hover:shadow-[0_0_12px_rgba(245,165,184,0.2)] transition-all duration-300">
                Text Link
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#2d1b3d] to-[#1a1225] text-[#b8a5f5] font-bold tracking-wide rounded-xl border border-[#b8a5f5]/20 shadow-[0_0_16px_rgba(184,165,245,0.2)] hover:shadow-[0_0_24px_rgba(184,165,245,0.35)] transition-all duration-300">
                Accent
              </button>
              <button className="px-6 py-3 bg-[#2d1b3d]/40 text-[#d4a5e3]/25 font-bold tracking-wide rounded-xl border border-[#d4a5e3]/10 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Void containers"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Moon, title: "Midnight", desc: "The witching hour when boundaries blur between real and unreal. Dark purple depths cradle soft lights that defy the darkness.", color: "#d4a5e3" },
            { icon: CloudMoon, title: "Twilight", desc: "Neither day nor night, the liminal space where candy pastels meet deep shadows. Teal glows softly against the void.", color: "#7ec8c8" },
            { icon: Star, title: "Starlight", desc: "Distant points of pastel pink pierce the purple sky. Each sparkle a reminder that sweetness exists in every shade of dark.", color: "#f5a5b8" },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-[#1a1225] rounded-xl border border-[#b8a5f5]/15 shadow-[0_0_16px_rgba(184,165,245,0.1)] hover:shadow-[0_0_24px_rgba(184,165,245,0.2)] transition-all duration-300 group">
              <div className="flex gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#d4a5e3]/40" />
                <div className="w-2 h-2 rounded-full bg-[#7ec8c8]/40" />
                <div className="w-2 h-2 rounded-full bg-[#f5a5b8]/40" />
              </div>
              <card.icon className={`w-6 h-6 mb-4 transition-colors`} style={{ color: card.color }} />
              <h3 className="text-lg font-bold text-[#d4a5e3] mb-3 tracking-wide">{card.title}</h3>
              <p className="text-sm text-[#b8a5f5]/40 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Dark navigation"
        className="py-16 px-6 bg-[#2d1b3d]/30 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1225] rounded-xl border border-[#d4a5e3]/15 shadow-[0_0_20px_rgba(212,165,227,0.1)] overflow-hidden">
            <div className="flex border-b border-[#d4a5e3]/10">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 border-b -mb-px ${
                    activeTab === index
                      ? "text-[#f5a5b8] border-[#f5a5b8] shadow-[0_2px_8px_rgba(245,165,184,0.15)]"
                      : "text-[#b8a5f5]/30 border-transparent hover:text-[#d4a5e3]"
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
                  <h4 className="text-lg font-bold text-[#d4a5e3] mb-2">Shadow Play</h4>
                  <p className="text-sm text-[#b8a5f5]/40 leading-relaxed">In the deepest purple darkness, forms shift and dance. Lavender highlights trace the edges of unseen shapes, creating a visual language that is both haunting and inviting.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-[#d4a5e3] mb-2">Ethereal Presence</h4>
                  <p className="text-sm text-[#b8a5f5]/40 leading-relaxed">A teal mist drifts through the interface, soft and otherworldly. Elements float in dark space, connected by gentle glowing threads of pastel light that pulse with quiet energy.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-[#d4a5e3] mb-2">Constellation Map</h4>
                  <p className="text-sm text-[#b8a5f5]/40 leading-relaxed">Pink and periwinkle points of light scattered across the void, each one a node of interaction. Connect the dots and patterns emerge -- sweet geometries drawn in the language of the night sky.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Unfolding mysteries"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#1a1225] rounded-xl border border-[#b8a5f5]/15 overflow-hidden shadow-[0_0_8px_rgba(184,165,245,0.08)]">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#2d1b3d]/50 transition-colors"
              >
                <span className="font-bold text-[#d4a5e3] tracking-wide">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#b8a5f5]/40 transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t border-[#d4a5e3]/10">
                  <p className="text-sm text-[#b8a5f5]/40 leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Whispered warnings"
        className="py-16 px-6 bg-[#2d1b3d]/30 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#7ec8c8]/8 rounded-xl border-l-2 border-[#7ec8c8]/50">
            <Check className="w-4 h-4 text-[#7ec8c8] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#7ec8c8]">Ritual complete</p>
              <p className="text-xs text-[#7ec8c8]/50 mt-0.5">Your dark work has been saved to the void.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#f5a5b8]/8 rounded-xl border-l-2 border-[#f5a5b8]/50">
            <AlertTriangle className="w-4 h-4 text-[#f5a5b8] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#f5a5b8]">Beware</p>
              <p className="text-xs text-[#f5a5b8]/50 mt-0.5">The shadows grow restless. Proceed with intention.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#d4a5e3]/8 rounded-xl border-l-2 border-[#d4a5e3]/50">
            <X className="w-4 h-4 text-[#d4a5e3] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#d4a5e3]">Spell broken</p>
              <p className="text-xs text-[#d4a5e3]/50 mt-0.5">The enchantment failed. Gather your energy and try again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#b8a5f5]/8 rounded-xl border-l-2 border-[#b8a5f5]/50">
            <Info className="w-4 h-4 text-[#b8a5f5] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#b8a5f5]">Secret lore</p>
              <p className="text-xs text-[#b8a5f5]/50 mt-0.5">Every pastel glow holds a deeper meaning in the dark.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1225] rounded-xl border border-[#b8a5f5]/15 p-6 space-y-5 shadow-[0_0_20px_rgba(184,165,245,0.1)]">
            {[
              { label: "Ambient Glow Orbs", desc: "Show soft pastel light orbs in the background" },
              { label: "Gothic Symbols", desc: "Display crosses and moon decorations" },
              { label: "Pastel Gradients", desc: "Enable candy-colored gradient effects on text" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-bold text-[#d4a5e3]">{item.label}</p>
                  <p className="text-xs text-[#b8a5f5]/30 mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                    toggleStates[index] ? "bg-[#d4a5e3] shadow-[0_0_12px_rgba(212,165,227,0.4)]" : "bg-[#2d1b3d]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-[#1a1225] rounded-full shadow-sm transition-transform duration-300 ${
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
        subtitle="Descent tracker"
        className="py-16 px-6 bg-[#2d1b3d]/30 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a1225] rounded-xl border border-[#d4a5e3]/15 p-6 space-y-6 shadow-[0_0_20px_rgba(212,165,227,0.1)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-[#d4a5e3]">Descent progress</p>
                <p className="text-xs text-[#b8a5f5]/40 font-mono">{progress}%</p>
              </div>
              <div className="h-1.5 bg-[#2d1b3d] rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-[#d4a5e3] via-[#f5a5b8] to-[#b8a5f5] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(212,165,227,0.4)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-[#d4a5e3] mb-2">Void layers</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-1.5 bg-[#2d1b3d] rounded-full">
                      <div
                        className={`h-full rounded-full transition-all ${value === 100 ? "bg-[#7ec8c8]" : value > 0 ? "bg-[#f5a5b8]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#b8a5f5]/30 mt-1 text-center">Layer {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-[#d4a5e3]/10">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-bold tracking-wide border border-[#d4a5e3]/20 text-[#d4a5e3]/60 rounded-xl hover:border-[#d4a5e3]/40 hover:text-[#d4a5e3] transition-all duration-300"
              >
                Ascend
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-bold tracking-wide bg-[#2d1b3d] text-[#d4a5e3] rounded-xl border border-[#d4a5e3]/30 shadow-[0_0_12px_rgba(212,165,227,0.2)] hover:shadow-[0_0_20px_rgba(212,165,227,0.35)] transition-all duration-300"
              >
                Descend
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Dark inputs"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-bold tracking-wide text-[#d4a5e3] mb-2"
        subtitleClassName="text-sm text-[#b8a5f5]/40 mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#1a1225] rounded-xl border border-[#b8a5f5]/15 p-8 shadow-[0_0_24px_rgba(184,165,245,0.1)]">
            <div className="flex gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#d4a5e3]" />
              <div className="w-2 h-2 rounded-full bg-[#7ec8c8]" />
              <div className="w-2 h-2 rounded-full bg-[#f5a5b8]" />
            </div>
            <h3 className="text-lg font-bold text-[#d4a5e3] mb-6 tracking-wide">Send a Message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wide text-[#b8a5f5]/40 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-[#1a1225] border border-[#d4a5e3]/20 rounded-xl text-[#d4a5e3] placeholder-[#b8a5f5]/25 font-medium focus:outline-none focus:border-[#f5a5b8]/50 focus:shadow-[0_0_16px_rgba(245,165,184,0.2)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wide text-[#b8a5f5]/40 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-[#1a1225] border border-[#d4a5e3]/20 rounded-xl text-[#d4a5e3] placeholder-[#b8a5f5]/25 font-medium focus:outline-none focus:border-[#f5a5b8]/50 focus:shadow-[0_0_16px_rgba(245,165,184,0.2)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wide text-[#b8a5f5]/40 mb-2">Message</label>
                <textarea
                  placeholder="Whisper into the void..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#1a1225] border border-[#d4a5e3]/20 rounded-xl text-[#d4a5e3] placeholder-[#b8a5f5]/25 font-medium focus:outline-none focus:border-[#f5a5b8]/50 focus:shadow-[0_0_16px_rgba(245,165,184,0.2)] transition-all duration-300 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-[#2d1b3d] to-[#1a1225] text-[#d4a5e3] font-bold tracking-wide rounded-xl border border-[#d4a5e3]/30 shadow-[0_0_20px_rgba(212,165,227,0.25)] hover:shadow-[0_0_32px_rgba(212,165,227,0.4)] hover:border-[#d4a5e3]/60 transition-all duration-300 mt-2">
                Send into the Void
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-[#d4a5e3]/10 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex gap-1.5 justify-center mb-4">
            <div className="w-2 h-2 rounded-full bg-[#d4a5e3]/30" />
            <div className="w-2 h-2 rounded-full bg-[#7ec8c8]/30" />
            <div className="w-2 h-2 rounded-full bg-[#f5a5b8]/30" />
            <div className="w-2 h-2 rounded-full bg-[#b8a5f5]/30" />
          </div>
          <p className="text-xs text-[#b8a5f5]/30 tracking-wide font-bold">
            Pastel Goth Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#d4a5e3] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
