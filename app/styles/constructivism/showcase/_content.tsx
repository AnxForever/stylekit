"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Triangle, Zap, Target,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Flag, Megaphone, BookOpen
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Soviet Red", hex: "#cc0000", bg: "bg-[#cc0000]" },
  { name: "Pure Black", hex: "#1a1a1a", bg: "bg-[#1a1a1a]" },
  { name: "Aged Paper", hex: "#f2e8d5", bg: "bg-[#f2e8d5]", border: true },
  { name: "Gold Star", hex: "#d4a843", bg: "bg-[#d4a843]" },
  { name: "Dark Brown", hex: "#8b4513", bg: "bg-[#8b4513]" },
  { name: "Deep Red", hex: "#990000", bg: "bg-[#990000]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Manifesto", icon: Flag },
    { label: "Agitate", icon: Megaphone },
    { label: "Archive", icon: BookOpen },
  ];

  const accordionItems = [
    { title: "WHAT IS CONSTRUCTIVISM?", content: "Constructivism originated in the Russian avant-garde of the 1910s, peaking in the Soviet Union of the 1920s-30s. It declared that art must serve society, treating visual design as a tool for communication and mass mobilization." },
    { title: "VISUAL LANGUAGE", content: "Powerful diagonal compositions, colliding geometric planes, and high-contrast red-black palettes. These elements forge a visual experience charged with energy and urgency that the viewer cannot ignore." },
    { title: "TYPOGRAPHY AS WEAPON", content: "Text is not merely content -- it is a compositional weapon. Large bold headlines appear at angles, with extreme weight contrasts between massive titles and compact body text creating dramatic tension." },
  ];

  return (
    <div className="min-h-screen bg-[#f2e8d5] text-[#1a1a1a]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b-4 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/constructivism"
            className="flex items-center gap-2 text-[#cc0000] hover:text-[#1a1a1a] transition-all duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-sans font-black uppercase tracking-widest">Back</span>
          </Link>
          <div className="flex items-center gap-2 -rotate-1">
            <Triangle className="w-4 h-4 text-[#cc0000]" />
            <span className="font-sans font-black text-lg tracking-[0.2em] uppercase text-[#1a1a1a]">
              Constructivism
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-sans font-black uppercase tracking-widest text-[#f2e8d5] bg-[#1a1a1a] border-4 border-[#1a1a1a] shadow-[2px_2px_0_#cc0000] hover:shadow-[1px_1px_0_#cc0000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#cc0000] -skew-x-12 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1a1a1a] rotate-45 -translate-x-24 translate-y-24" />
        <div className="max-w-4xl mx-auto text-left relative z-10">
          <div className="w-24 h-2 bg-[#cc0000] mb-6" />
          <div className="flex items-center gap-3 mb-6">
            <span className="w-4 h-4 bg-[#cc0000] inline-block" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#8b4513] font-sans font-black">Revolutionary Design</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-sans font-black text-[#1a1a1a] mb-4 leading-none tracking-tight uppercase -rotate-2">
            Construct
            <span className="block text-[#cc0000] rotate-0">the future</span>
          </h1>
          <p className="text-lg font-sans font-bold text-[#1a1a1a]/70 max-w-lg leading-tight tracking-wider uppercase">
            Art into life. Design as revolution. Every element is a weapon of progress.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="METRICS"
        subtitle="COLLECTIVE DATA"
        className="py-16 px-6 bg-[#1a1a1a]"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#f2e8d5] mb-2 uppercase"
        subtitleClassName="text-sm text-[#d4a843] tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Comrades", value: "5,841" },
            { icon: TrendingUp, label: "Progress", value: "+42%" },
            { icon: Eye, label: "Reach", value: "312K" },
            { icon: Heart, label: "Unity", value: "8,109" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#f2e8d5] border-4 border-[#1a1a1a] shadow-[4px_4px_0_#cc0000]"
            >
              <stat.icon className="w-5 h-5 text-[#cc0000] mb-4" />
              <p className="text-3xl font-sans font-black text-[#1a1a1a] mb-1 tracking-tight">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8b4513] font-sans font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR SYSTEM"
        subtitle="THE THREE-COLOR DISCIPLINE"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#1a1a1a] mb-2 uppercase"
        subtitleClassName="text-sm text-[#8b4513] tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border-4 border-[#1a1a1a] shadow-[2px_2px_0_#1a1a1a]"
            labelClassName="text-sm font-sans font-black text-[#1a1a1a] uppercase tracking-wider"
            hexClassName="text-xs text-[#8b4513] font-mono font-bold"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="TYPOGRAPHY"
        subtitle="WEIGHT AND IMPACT"
        className="py-16 px-6 bg-[#cc0000]"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#f2e8d5] mb-2 uppercase"
        subtitleClassName="text-sm text-[#f2e8d5]/70 tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#f2e8d5] border-4 border-[#1a1a1a] shadow-[6px_6px_0_#1a1a1a]">
            <div className="w-full h-1 bg-[#1a1a1a] mb-6 -rotate-1" />
            <p className="text-6xl font-sans font-black text-[#1a1a1a] mb-4 leading-none tracking-tight uppercase -rotate-2">HEADING</p>
            <p className="text-4xl font-sans font-black text-[#cc0000] mb-4 uppercase tracking-[0.2em]">SUBHEADING</p>
            <p className="text-xl font-sans font-bold text-[#1a1a1a]/70 mb-4 leading-tight tracking-wider uppercase">
              Bold text that demands attention. Every word is a declaration.
            </p>
            <p className="text-sm text-[#8b4513] tracking-[0.3em] uppercase font-sans font-bold">
              Caption text -- printed with purpose
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="TOOLS OF ACTION"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#1a1a1a] mb-2 uppercase"
        subtitleClassName="text-sm text-[#8b4513] tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#f2e8d5] border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-3 bg-[#cc0000] text-[#f2e8d5] text-sm font-sans font-black uppercase tracking-widest border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 -rotate-1">
                PRIMARY
              </button>
              <button className="px-8 py-3 bg-[#1a1a1a] text-[#f2e8d5] text-sm font-sans font-black uppercase tracking-widest border-4 border-[#1a1a1a] shadow-[4px_4px_0_#cc0000] hover:shadow-[2px_2px_0_#cc0000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                SECONDARY
              </button>
              <button className="px-8 py-3 text-[#cc0000] text-sm font-sans font-black uppercase tracking-widest hover:text-[#1a1a1a] transition-all duration-150 underline underline-offset-4 decoration-[#1a1a1a]">
                TEXT LINK
              </button>
              <button className="px-8 py-3 bg-[#d4a843] text-[#1a1a1a] text-sm font-sans font-black uppercase tracking-widest border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
                ACCENT
              </button>
              <button className="px-8 py-3 bg-[#f2e8d5] text-[#8b4513]/50 text-sm font-sans font-black uppercase tracking-widest border-4 border-[#8b4513]/30 cursor-not-allowed">
                DISABLED
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="INFORMATION BLOCKS"
        className="py-16 px-6 bg-[#1a1a1a]"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#f2e8d5] mb-2 uppercase"
        subtitleClassName="text-sm text-[#d4a843] tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Triangle, title: "GEOMETRY", desc: "Colliding planes and sharp angles form the structural backbone of revolutionary visual language." },
            { icon: Zap, title: "ENERGY", desc: "Diagonal lines and skewed elements inject kinetic force into every composition, demanding action." },
            { icon: Target, title: "PURPOSE", desc: "Every element serves the message. Decoration without function is bourgeois indulgence." },
          ].map((card, index) => (
            <div key={index} className="relative bg-[#f2e8d5] border-4 border-[#1a1a1a] shadow-[6px_6px_0_#cc0000] overflow-hidden group hover:shadow-[4px_4px_0_#cc0000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150">
              <div className="bg-[#cc0000] px-6 py-3">
                <card.icon className="w-5 h-5 text-[#f2e8d5]" />
              </div>
              <div className="p-6">
                <div className="w-full h-1 bg-[#1a1a1a] mb-4 -rotate-1" />
                <h3 className="text-lg font-sans font-black text-[#1a1a1a] tracking-[0.2em] mb-3">{card.title}</h3>
                <p className="text-sm text-[#1a1a1a]/70 font-sans font-bold leading-tight tracking-wider uppercase">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="TABS"
        subtitle="SECTION NAVIGATION"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#1a1a1a] mb-2 uppercase"
        subtitleClassName="text-sm text-[#8b4513] tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f2e8d5] border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] overflow-hidden">
            <div className="flex border-b-4 border-[#1a1a1a]">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-sans font-black uppercase tracking-widest transition-all duration-150 border-b-4 -mb-[4px] ${
                    activeTab === index
                      ? "text-[#f2e8d5] bg-[#cc0000] border-[#cc0000]"
                      : "text-[#8b4513] border-transparent hover:text-[#1a1a1a] hover:bg-[#d4a843]/20"
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
                  <h4 className="text-lg font-sans font-black text-[#1a1a1a] tracking-[0.2em] mb-2 uppercase">Declaration</h4>
                  <p className="text-sm text-[#1a1a1a]/70 font-sans font-bold leading-tight tracking-wider uppercase">Art must be torn from the galleries and brought into the streets. Design serves the people -- every poster, every typeface, every diagonal line is a call to build the new world.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-sans font-black text-[#1a1a1a] tracking-[0.2em] mb-2 uppercase">Propaganda</h4>
                  <p className="text-sm text-[#1a1a1a]/70 font-sans font-bold leading-tight tracking-wider uppercase">The poster is mightier than the painting. Bold typography and geometric force compress complex ideas into instant visual impact that crosses language barriers.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-sans font-black text-[#1a1a1a] tracking-[0.2em] mb-2 uppercase">Historical Record</h4>
                  <p className="text-sm text-[#1a1a1a]/70 font-sans font-bold leading-tight tracking-wider uppercase">From Rodchenko to El Lissitzky, the archive preserves the visual ammunition of a movement that transformed how we understand the relationship between art and society.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="ACCORDION"
        subtitle="EXPANDABLE SECTIONS"
        className="py-16 px-6 bg-[#cc0000]"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#f2e8d5] mb-2 uppercase"
        subtitleClassName="text-sm text-[#f2e8d5]/70 tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#f2e8d5] border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#d4a843]/20 transition-all duration-150"
              >
                <span className="font-sans font-black text-[#1a1a1a] tracking-wider text-sm">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#cc0000] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-4 border-[#1a1a1a]">
                  <p className="text-sm text-[#1a1a1a]/70 font-sans font-bold leading-tight tracking-wider pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="ALERTS"
        subtitle="STATUS DISPATCHES"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#1a1a1a] mb-2 uppercase"
        subtitleClassName="text-sm text-[#8b4513] tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#f2e8d5] border-4 border-[#1a1a1a] border-l-[12px] border-l-[#2a6e2e]">
            <Check className="w-4 h-4 text-[#2a6e2e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-black text-[#1a1a1a] uppercase tracking-wider">Mission complete</p>
              <p className="text-xs text-[#8b4513] mt-0.5 font-sans font-bold tracking-wider">Objectives achieved successfully.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#f2e8d5] border-4 border-[#1a1a1a] border-l-[12px] border-l-[#d4a843]">
            <AlertTriangle className="w-4 h-4 text-[#d4a843] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-black text-[#1a1a1a] uppercase tracking-wider">Attention required</p>
              <p className="text-xs text-[#8b4513] mt-0.5 font-sans font-bold tracking-wider">Review before proceeding.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#f2e8d5] border-4 border-[#1a1a1a] border-l-[12px] border-l-[#cc0000]">
            <X className="w-4 h-4 text-[#cc0000] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-black text-[#1a1a1a] uppercase tracking-wider">Critical failure</p>
              <p className="text-xs text-[#8b4513] mt-0.5 font-sans font-bold tracking-wider">Operation has been halted.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#f2e8d5] border-4 border-[#1a1a1a] border-l-[12px] border-l-[#1a1a1a]">
            <Info className="w-4 h-4 text-[#1a1a1a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-sans font-black text-[#1a1a1a] uppercase tracking-wider">Intelligence</p>
              <p className="text-xs text-[#8b4513] mt-0.5 font-sans font-bold tracking-wider">New data available for analysis.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="TOGGLE"
        subtitle="CONTROL SWITCHES"
        className="py-16 px-6 bg-[#1a1a1a]"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#f2e8d5] mb-2 uppercase"
        subtitleClassName="text-sm text-[#d4a843] tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f2e8d5] border-4 border-[#1a1a1a] p-6 space-y-5">
            {[
              { label: "PROPAGANDA MODE", desc: "Maximize visual impact and urgency" },
              { label: "DIAGONAL GRID", desc: "Enable skewed compositional elements" },
              { label: "AUTO-AGITATE", desc: "Activate continuous visual tension" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-sans font-black text-[#1a1a1a] tracking-wider">{item.label}</p>
                  <p className="text-xs text-[#8b4513] mt-0.5 font-sans font-bold tracking-wider">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-14 h-7 transition-all duration-150 border-4 border-[#1a1a1a] ${
                    toggleStates[index] ? "bg-[#cc0000]" : "bg-[#f2e8d5]"
                  }`}
                >
                  <span
                    className={`absolute top-0 left-0 w-5 h-[calc(100%)] bg-[#1a1a1a] transition-transform duration-150 ${
                      toggleStates[index] ? "translate-x-[22px]" : "translate-x-0"
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
        subtitle="PRODUCTION QUOTAS"
        className="py-16 px-6"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#1a1a1a] mb-2 uppercase"
        subtitleClassName="text-sm text-[#8b4513] tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f2e8d5] border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-sans font-black text-[#1a1a1a] tracking-wider uppercase">Five-year plan</p>
                <p className="text-xs text-[#cc0000] font-mono font-bold">{progress}%</p>
              </div>
              <div className="h-3 bg-[#1a1a1a]/10 border-2 border-[#1a1a1a]">
                <div
                  className="h-full bg-[#cc0000] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-sans font-black text-[#1a1a1a] tracking-wider uppercase mb-2">Sector output</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-3 bg-[#1a1a1a]/10 border-2 border-[#1a1a1a]">
                      <div
                        className={`h-full transition-all ${value === 100 ? "bg-[#1a1a1a]" : value > 0 ? "bg-[#d4a843]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#8b4513] mt-1 text-center font-sans font-bold uppercase">S.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-4 border-[#1a1a1a]">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-sans font-black uppercase tracking-widest border-4 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#f2e8d5] transition-all duration-150"
              >
                Retreat
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-sans font-black uppercase tracking-widest bg-[#cc0000] text-[#f2e8d5] border-4 border-[#1a1a1a] shadow-[2px_2px_0_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
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
        className="py-16 px-6 bg-[#1a1a1a]"
        titleClassName="text-2xl font-sans font-black tracking-[0.2em] text-[#f2e8d5] mb-2 uppercase"
        subtitleClassName="text-sm text-[#d4a843] tracking-widest mb-10 font-sans font-bold uppercase"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#f2e8d5] border-4 border-[#1a1a1a] shadow-[6px_6px_0_#cc0000] p-8">
            <div className="w-full h-1 bg-[#cc0000] mb-4 -rotate-1" />
            <h3 className="text-lg font-sans font-black text-[#1a1a1a] tracking-[0.2em] uppercase mb-6">Register</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#8b4513] mb-2 font-sans font-black">Name</label>
                <input
                  type="text"
                  placeholder="FULL NAME..."
                  className="w-full px-5 py-3 bg-[#f2e8d5] border-4 border-[#1a1a1a] text-[#1a1a1a] placeholder-[#8b4513]/50 font-sans font-bold uppercase tracking-wider text-sm focus:border-[#cc0000] focus:shadow-[0_0_0_2px_#cc0000] focus:outline-none transition-all duration-150"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#8b4513] mb-2 font-sans font-black">Email</label>
                <input
                  type="email"
                  placeholder="YOUR@EMAIL.COM"
                  className="w-full px-5 py-3 bg-[#f2e8d5] border-4 border-[#1a1a1a] text-[#1a1a1a] placeholder-[#8b4513]/50 font-sans font-bold uppercase tracking-wider text-sm focus:border-[#cc0000] focus:shadow-[0_0_0_2px_#cc0000] focus:outline-none transition-all duration-150"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#8b4513] mb-2 font-sans font-black">Message</label>
                <textarea
                  placeholder="YOUR MESSAGE..."
                  rows={3}
                  className="w-full px-5 py-3 bg-[#f2e8d5] border-4 border-[#1a1a1a] text-[#1a1a1a] placeholder-[#8b4513]/50 font-sans font-bold uppercase tracking-wider text-sm focus:border-[#cc0000] focus:shadow-[0_0_0_2px_#cc0000] focus:outline-none transition-all duration-150 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#cc0000] text-[#f2e8d5] text-sm font-sans font-black uppercase tracking-[0.3em] border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a] hover:shadow-[2px_2px_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 mt-2 -rotate-1">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-4 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
          <span className="w-4 h-4 bg-[#cc0000] inline-block" />
          <span className="w-4 h-4 bg-[#1a1a1a] inline-block" />
          <span className="w-4 h-4 bg-[#d4a843] inline-block" />
        </div>
        <div className="max-w-6xl mx-auto text-center mt-4">
          <p className="text-xs text-[#8b4513] tracking-[0.3em] font-sans font-bold uppercase">
            Constructivism Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#cc0000] transition-all duration-150">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
