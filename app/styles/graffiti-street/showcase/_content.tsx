"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, SprayCan, Flame, Music, Skull,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Mic, Radio, Headphones,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Spray Red", hex: "#ff2d55", bg: "bg-[#ff2d55]" },
  { name: "Asphalt", hex: "#1c1c1e", bg: "bg-[#1c1c1e]" },
  { name: "Cyan Spray", hex: "#00e5ff", bg: "bg-[#00e5ff]" },
  { name: "Neon Yellow", hex: "#ffea00", bg: "bg-[#ffea00]" },
  { name: "Purple", hex: "#b620e0", bg: "bg-[#b620e0]" },
  { name: "Orange", hex: "#ff6d00", bg: "bg-[#ff6d00]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Tags", icon: Mic },
    { label: "Beats", icon: Radio },
    { label: "Crews", icon: Headphones },
  ];

  const accordionItems = [
    { title: "WHAT IS GRAFFITI STREET?", content: "Graffiti Street style originates from the 1960s subway and street culture of New York and Philadelphia. From early simple tags to wildstyle and masterpieces, graffiti has always been a symbol of urban youth self-expression and rebellious spirit." },
    { title: "CORE PRINCIPLES", content: "Spray paint texture through text-shadow and drop-shadow effects. Bold clashing colors -- red, cyan, yellow, purple, orange at maximum saturation. Rotated and skewed text mimicking freehand spray can writing. Brick wall textures as foundational backgrounds." },
    { title: "THE UNWRITTEN RULES", content: "Graffiti never aligns, never whispers, never asks permission. Every element should feel spontaneous -- sprayed directly onto the surface with raw force and unflinching confidence. The city is the canvas." },
  ];

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white">
      {/* Brick wall texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.1) 60px, rgba(255,255,255,0.1) 61px)"
        }}
      />

      {/* Navigation */}
      <nav className="px-6 py-5 border-b-4 border-[#ff2d55] relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/graffiti-street"
            className="flex items-center gap-2 text-[#ffea00] hover:text-[#00e5ff] transition-all duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-black uppercase tracking-widest">Back</span>
          </Link>
          <div className="flex items-center gap-2" style={{ transform: "skewX(-3deg)" }}>
            <Flame className="w-5 h-5 text-[#ff2d55]" />
            <span className="font-black text-xl tracking-wider text-[#00e5ff] uppercase">
              GRAFFITI
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-black uppercase tracking-widest text-[#ffea00] border-4 border-[#ffea00] shadow-[4px_4px_0px_#b620e0] hover:bg-[#ffea00] hover:text-[#1c1c1e] hover:shadow-[2px_2px_0px_#b620e0] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
            style={{ transform: "rotate(1deg)" }}
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative overflow-hidden z-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#ff2d55]/5 blur-xl" />
        <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-[#00e5ff]/5 blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-[#ffea00]/5 blur-lg" />
        {/* Paint drips */}
        <div className="absolute top-0 left-[15%] w-2 h-16 bg-[#ff2d55]/20 rounded-b-full" />
        <div className="absolute top-0 left-[45%] w-1.5 h-10 bg-[#00e5ff]/15 rounded-b-full" />
        <div className="absolute top-0 right-[25%] w-2 h-20 bg-[#ffea00]/15 rounded-b-full" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p
            className="text-sm font-black text-[#ffea00] uppercase tracking-[0.5em] mb-4"
            style={{ transform: "rotate(-2deg)" }}
          >
            No Permission Needed
          </p>
          <h1
            className="text-7xl md:text-9xl font-black text-white uppercase leading-none mb-2"
            style={{ transform: "skewX(-4deg)" }}
          >
            GRAFF<span className="text-[#ff2d55]">ITI</span>
          </h1>
          <h2
            className="text-5xl md:text-7xl font-black text-[#00e5ff] uppercase mb-8"
            style={{ transform: "rotate(1deg) skewX(-2deg)" }}
          >
            STREET
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="px-10 py-4 bg-[#ff2d55] text-white font-black uppercase tracking-wider border-4 border-[#1c1c1e] shadow-[4px_4px_0px_#00e5ff] hover:shadow-[2px_2px_0px_#00e5ff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
              style={{ transform: "rotate(-2deg)" }}
            >
              Explore
            </button>
            <button
              className="px-10 py-4 bg-transparent text-[#ffea00] font-black uppercase tracking-wider border-4 border-[#ffea00] shadow-[4px_4px_0px_#b620e0] hover:bg-[#ffea00] hover:text-[#1c1c1e] hover:shadow-[2px_2px_0px_#b620e0] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
              style={{ transform: "rotate(1deg)" }}
            >
              Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Street metrics"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-black text-[#00e5ff] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Crew", value: "4,841", color: "#ff2d55", shadow: "#00e5ff" },
            { icon: TrendingUp, label: "Growth", value: "+38%", color: "#ffea00", shadow: "#b620e0" },
            { icon: Eye, label: "Views", value: "542K", color: "#00e5ff", shadow: "#ff2d55" },
            { icon: Heart, label: "Props", value: "7,209", color: "#b620e0", shadow: "#ffea00" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#1c1c1e] border-4 shadow-[4px_4px_0px] relative overflow-hidden"
              style={{
                borderColor: stat.color,
                boxShadow: `4px 4px 0px ${stat.shadow}`,
                transform: `rotate(${index % 2 === 0 ? "-0.5" : "0.5"}deg)`,
              }}
            >
              <div className="absolute top-0 right-4 w-1 h-6 rounded-b-full" style={{ backgroundColor: `${stat.color}30` }} />
              <stat.icon className="w-5 h-5 mb-4" style={{ color: stat.color }} />
              <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Spray can collection"
        className="py-16 px-6 bg-[#ff2d55]/5 relative z-10"
        titleClassName="text-2xl font-black text-[#ffea00] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border-4 border-[#ff2d55] bg-[#1c1c1e] shadow-[3px_3px_0px_#00e5ff]"
            labelClassName="text-sm font-black text-white uppercase tracking-wider"
            hexClassName="text-xs text-white/60 font-mono font-bold"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Stencil and spray"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-black text-[#00e5ff] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#1c1c1e] border-4 border-[#ff2d55] shadow-[4px_4px_0px_#ffea00] relative overflow-hidden">
            <div className="absolute top-0 right-8 w-2 h-12 bg-[#ff2d55]/20 rounded-b-full" />
            <p
              className="text-6xl font-black text-[#ff2d55] mb-4 leading-tight uppercase"
              style={{ transform: "skewX(-3deg)" }}
            >
              Heading
            </p>
            <p className="text-4xl font-black text-[#00e5ff] mb-4 uppercase">Subheading</p>
            <p className="text-xl font-bold text-white/80 mb-4 leading-relaxed">
              Body text hits hard. Bold and direct, like a wall piece in broad daylight.
            </p>
            <p
              className="text-xs font-mono font-bold text-[#ffea00] tracking-widest uppercase"
              style={{ transform: "rotate(-1deg)" }}
            >
              Caption -- written in the margins
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Hit the wall"
        className="py-16 px-6 bg-[#00e5ff]/5 relative z-10"
        titleClassName="text-2xl font-black text-[#ffea00] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#1c1c1e] border-4 border-[#00e5ff] shadow-[4px_4px_0px_#ff2d55]">
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="px-8 py-4 bg-[#ff2d55] text-white font-black uppercase tracking-wider text-lg border-4 border-[#1c1c1e] shadow-[4px_4px_0px_#00e5ff] hover:shadow-[2px_2px_0px_#00e5ff] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150"
                style={{ transform: "rotate(-2deg) skewX(-2deg)" }}
              >
                Primary
              </button>
              <button
                className="px-8 py-4 bg-transparent text-[#ffea00] font-black uppercase tracking-wider text-lg border-4 border-[#ffea00] shadow-[4px_4px_0px_#b620e0] hover:bg-[#ffea00] hover:text-[#1c1c1e] hover:shadow-[2px_2px_0px_#b620e0] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                style={{ transform: "rotate(1deg)" }}
              >
                Secondary
              </button>
              <button
                className="px-8 py-4 bg-[#b620e0] text-white font-black uppercase tracking-wider text-lg border-4 border-[#1c1c1e] shadow-[4px_4px_0px_#ffea00] hover:shadow-[2px_2px_0px_#ffea00] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                style={{ transform: "rotate(-1deg)" }}
              >
                Accent
              </button>
              <button className="px-8 py-4 text-[#ff6d00] font-black uppercase tracking-wider text-lg underline underline-offset-4 decoration-[#ff6d00] decoration-4 hover:text-[#00e5ff] hover:decoration-[#00e5ff] transition-all duration-150">
                Text Link
              </button>
              <button className="px-8 py-4 bg-white/5 text-white/20 font-black uppercase tracking-wider text-lg border-4 border-white/10 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Wall pieces"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-black text-[#ff2d55] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: SprayCan, title: "WILD STYLE", desc: "Interlocking letters, arrows, and connections. The most complex form of graffiti writing.", color: "#ff2d55", shadow: "#00e5ff", badge: "Fresh", badgeBg: "#ffea00", rotate: "0.5deg" },
            { icon: Music, title: "HIP HOP", desc: "Graffiti, breaking, MCing, DJing -- four elements of one culture, born on the streets.", color: "#00e5ff", shadow: "#b620e0", badge: "Classic", badgeBg: "#ff6d00", rotate: "-0.5deg" },
            { icon: Skull, title: "THROW UP", desc: "Quick, bubble-letter pieces done in two colors. Speed over style, presence over perfection.", color: "#ffea00", shadow: "#ff2d55", badge: "Quick", badgeBg: "#b620e0", rotate: "1deg" },
          ].map((card, index) => (
            <div
              key={index}
              className="p-8 bg-[#1c1c1e] border-4 relative overflow-hidden"
              style={{
                borderColor: card.color,
                boxShadow: `6px 6px 0px ${card.shadow}`,
                transform: `rotate(${card.rotate})`,
              }}
            >
              {/* Spray paint drip */}
              <div className="absolute top-0 right-8 w-2 h-12 rounded-b-full" style={{ backgroundColor: `${card.color}40` }} />
              <div className="absolute top-0 right-12 w-1.5 h-8 rounded-b-full" style={{ backgroundColor: `${card.shadow}30` }} />

              <span
                className="inline-block px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 text-[#1c1c1e]"
                style={{ backgroundColor: card.badgeBg, transform: "rotate(-1deg)" }}
              >
                {card.badge}
              </span>
              <card.icon className="w-6 h-6 mb-3" style={{ color: card.color }} />
              <h3
                className="text-3xl font-black uppercase mb-3"
                style={{ color: card.color, transform: "skewX(-3deg)" }}
              >
                {card.title}
              </h3>
              <p className="text-white/60 text-sm font-bold">{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content switch"
        className="py-16 px-6 bg-[#b620e0]/5 relative z-10"
        titleClassName="text-2xl font-black text-[#00e5ff] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1c1c1e] border-4 border-[#b620e0] shadow-[4px_4px_0px_#ffea00] overflow-hidden">
            <div className="flex border-b-4 border-[#b620e0]/40">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-black uppercase tracking-widest transition-all duration-150 border-b-4 -mb-[4px] ${
                    activeTab === index
                      ? "text-[#ffea00] border-[#ffea00] bg-[#ffea00]/10"
                      : "text-white/30 border-transparent hover:text-[#ff2d55]"
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
                  <h4 className="text-lg font-black text-[#ff2d55] mb-2 uppercase" style={{ transform: "skewX(-2deg)" }}>Tag Names</h4>
                  <p className="text-sm text-white/60 font-bold leading-relaxed">Every writer needs a tag. Your signature, your identity, your mark on the city. Quick, stylized, repeated everywhere.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-black text-[#00e5ff] mb-2 uppercase" style={{ transform: "skewX(-2deg)" }}>Street Beats</h4>
                  <p className="text-sm text-white/60 font-bold leading-relaxed">The rhythm of the city. Boom boxes on corners, bass lines from passing cars, the soundtrack to every piece thrown up on a wall.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-black text-[#ffea00] mb-2 uppercase" style={{ transform: "skewX(-2deg)" }}>Crew Life</h4>
                  <p className="text-sm text-white/60 font-bold leading-relaxed">Running with your crew. Shared paint, shared walls, shared risk. The collective identity that turns individual writers into legends.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Drop knowledge"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-black text-[#ffea00] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#1c1c1e] border-4 border-[#ff2d55] shadow-[3px_3px_0px_#00e5ff] overflow-hidden"
              style={{ transform: `rotate(${index === 1 ? "0.3" : index === 2 ? "-0.3" : "0"}deg)` }}
            >
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#ff2d55]/10 transition-all duration-150"
              >
                <span className="font-black text-[#00e5ff] uppercase tracking-wider">{item.title}</span>
                <ChevronDown className={`w-5 h-5 text-[#ff2d55] transition-transform duration-150 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-4 border-[#ff2d55]/30">
                  <p className="text-sm text-white/60 font-bold leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Street signals"
        className="py-16 px-6 bg-[#ffea00]/5 relative z-10"
        titleClassName="text-2xl font-black text-[#ff2d55] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#00e5ff]/10 border-4 border-[#00e5ff] shadow-[3px_3px_0px_#00e5ff]">
            <Check className="w-5 h-5 text-[#00e5ff] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#00e5ff] uppercase tracking-wider">Piece Complete</p>
              <p className="text-xs text-[#00e5ff]/60 mt-0.5 font-bold">Your tag has been written on the wall.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ffea00]/10 border-4 border-[#ffea00] shadow-[3px_3px_0px_#ffea00]">
            <AlertTriangle className="w-5 h-5 text-[#ffea00] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#ffea00] uppercase tracking-wider">Watch Out</p>
              <p className="text-xs text-[#ffea00]/60 mt-0.5 font-bold">Rival crew spotted in the area.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#ff2d55]/10 border-4 border-[#ff2d55] shadow-[3px_3px_0px_#ff2d55]">
            <X className="w-5 h-5 text-[#ff2d55] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#ff2d55] uppercase tracking-wider">Buffed</p>
              <p className="text-xs text-[#ff2d55]/60 mt-0.5 font-bold">Your piece got painted over. Time to go again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#b620e0]/10 border-4 border-[#b620e0] shadow-[3px_3px_0px_#b620e0]">
            <Info className="w-5 h-5 text-[#b620e0] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#b620e0] uppercase tracking-wider">Heads Up</p>
              <p className="text-xs text-[#b620e0]/60 mt-0.5 font-bold">New wall opened up on the east side. First come, first served.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Settings"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-black text-[#00e5ff] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1c1c1e] border-4 border-[#ff2d55] shadow-[4px_4px_0px_#ffea00] p-6 space-y-5">
            {[
              { label: "Spray Paint Mode", desc: "Enable text glow and drip effects" },
              { label: "Skew Transforms", desc: "Add rotation and skew to elements" },
              { label: "Brick Wall Texture", desc: "Show background grid pattern" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-wider">{item.label}</p>
                  <p className="text-xs text-white/40 mt-0.5 font-bold">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-14 h-7 transition-all duration-150 border-4 ${
                    toggleStates[index]
                      ? "bg-[#ff2d55] border-[#00e5ff]"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-0 left-0 w-5 h-[calc(100%)] transition-transform duration-150 ${
                      toggleStates[index] ? "translate-x-[calc(100%+4px)] bg-[#00e5ff]" : "translate-x-0 bg-white/40"
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
        subtitle="Completion tracker"
        className="py-16 px-6 bg-[#ff6d00]/5 relative z-10"
        titleClassName="text-2xl font-black text-[#ffea00] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1c1c1e] border-4 border-[#ffea00] shadow-[4px_4px_0px_#b620e0] p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-black text-white uppercase tracking-wider">Wall Coverage</p>
                <p className="text-xs text-[#ff2d55] font-mono font-bold tracking-widest">{progress}%</p>
              </div>
              <div className="h-3 bg-white/10 border-4 border-white/20">
                <div
                  className="h-full bg-[#ff2d55] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-black text-white uppercase tracking-wider mb-2">Section Progress</p>
              <div className="grid grid-cols-4 gap-3">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-3 bg-white/10 border-4 border-white/20">
                      <div
                        className={`h-full transition-all ${value === 100 ? "bg-[#00e5ff]" : value > 0 ? "bg-[#ffea00]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-white/40 font-mono font-bold mt-1 text-center uppercase">S.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-4 border-white/10">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-6 py-2 text-sm font-black uppercase tracking-widest border-4 border-[#ff2d55] text-[#ff2d55] hover:bg-[#ff2d55] hover:text-white transition-all duration-150"
              >
                Back
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-6 py-2 text-sm font-black uppercase tracking-widest bg-[#ff2d55] text-white border-4 border-[#1c1c1e] shadow-[3px_3px_0px_#00e5ff] hover:shadow-[1px_1px_0px_#00e5ff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
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
        subtitle="Leave your mark"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-black text-[#ff2d55] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-bold text-white/60 mb-10 uppercase tracking-widest"
      >
        <div className="max-w-md mx-auto">
          <div
            className="bg-[#1c1c1e] border-4 border-[#ff2d55] shadow-[6px_6px_0px_#ffea00] p-8 relative overflow-hidden"
            style={{ transform: "rotate(0.5deg)" }}
          >
            <div className="absolute top-0 right-6 w-2 h-16 bg-[#ff2d55]/20 rounded-b-full" />
            <h3
              className="text-lg font-black text-[#00e5ff] mb-6 uppercase tracking-widest"
              style={{ transform: "rotate(-1deg)" }}
            >
              Write Your Tag
            </h3>
            <div className="space-y-5">
              <div>
                <label
                  className="block text-xs font-black text-[#ffea00] uppercase tracking-widest mb-2"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  Your Tag
                </label>
                <input
                  type="text"
                  placeholder="WRITE YOUR NAME..."
                  className="w-full px-6 py-4 bg-[#1c1c1e]/80 border-4 border-[#ff2d55]/60 rounded-none text-white placeholder-white/20 font-bold uppercase focus:border-[#00e5ff] focus:shadow-[0_0_12px_rgba(0,229,255,0.3)] focus:outline-none transition-all duration-150"
                />
              </div>
              <div>
                <label
                  className="block text-xs font-black text-[#ffea00] uppercase tracking-widest mb-2"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  Contact
                </label>
                <input
                  type="email"
                  placeholder="YOUR@EMAIL.COM"
                  className="w-full px-6 py-4 bg-[#1c1c1e]/80 border-4 border-[#ff2d55]/60 rounded-none text-white placeholder-white/20 font-bold uppercase focus:border-[#00e5ff] focus:shadow-[0_0_12px_rgba(0,229,255,0.3)] focus:outline-none transition-all duration-150"
                />
              </div>
              <div>
                <label
                  className="block text-xs font-black text-[#ffea00] uppercase tracking-widest mb-2"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  Message
                </label>
                <textarea
                  placeholder="SAY SOMETHING..."
                  rows={3}
                  className="w-full px-6 py-4 bg-[#1c1c1e]/80 border-4 border-[#ff2d55]/60 rounded-none text-white placeholder-white/20 font-bold uppercase focus:border-[#00e5ff] focus:shadow-[0_0_12px_rgba(0,229,255,0.3)] focus:outline-none transition-all duration-150 resize-none"
                />
              </div>
              <button
                className="w-full py-4 bg-[#ff2d55] text-white font-black uppercase tracking-widest border-4 border-[#1c1c1e] shadow-[4px_4px_0px_#00e5ff] hover:shadow-[2px_2px_0px_#00e5ff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 mt-2"
                style={{ transform: "rotate(-1deg)" }}
              >
                Bomb It
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-4 border-[#ff2d55] relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-bold text-white/40 tracking-widest uppercase">
            Graffiti Street Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#00e5ff] transition-all duration-150">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
