"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Scissors, Palette, PenTool,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Shapes, BookOpen, Sparkles,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Paper White", hex: "#fdf6ee", bg: "bg-[#fdf6ee]", border: true },
  { name: "Craft Red", hex: "#e85d75", bg: "bg-[#e85d75]" },
  { name: "Paper Teal", hex: "#5cb8a5", bg: "bg-[#5cb8a5]" },
  { name: "Paper Yellow", hex: "#f5c040", bg: "bg-[#f5c040]" },
  { name: "Paper Blue", hex: "#6b7fb5", bg: "bg-[#6b7fb5]" },
  { name: "Card White", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Kraft Brown", hex: "#e0d8cc", bg: "bg-[#e0d8cc]" },
  { name: "Ink Dark", hex: "#2d2d2d", bg: "bg-[#2d2d2d]" },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Cut", icon: Scissors },
    { label: "Color", icon: Palette },
    { label: "Draw", icon: PenTool },
  ];

  const accordionItems = [
    { title: "What is Paper Craft Design?", content: "Paper Craft draws inspiration from the art of paper cutting, origami, and handmade collage. Through layered paper effects, offset shadows, and slightly imperfect edges, it creates a warm, tactile visual experience that feels genuinely handmade." },
    { title: "The Joy of Imperfection", content: "Deliberate slight rotations, soft rounded corners, and paper-like offset shadows give every element the character of something made by hand. The goal is warmth and personality, not pixel-perfect precision." },
    { title: "Color as Material", content: "Each color represents a different sheet of craft paper. Bright but never garish, these hues layer and overlap like a physical collage -- craft red, teal, sunny yellow, and soft blue working together in playful harmony." },
  ];

  return (
    <div className="min-h-screen bg-[#fdf6ee] text-[#2d2d2d]">
      {/* Navigation */}
      <nav className="px-6 py-5 border-b-2 border-[#e0d8cc]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/paper-craft"
            className="flex items-center gap-2 text-[#666666] hover:text-[#e85d75] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#e85d75]" />
            <span className="font-bold text-lg text-[#2d2d2d]">
              Paper Craft
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-bold text-[#2d2d2d] bg-white border-2 border-[#2d2d2d] rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all duration-200"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-[#f5c040] rounded-full" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#666666] bg-[#f5c040] px-3 py-1 rounded-lg rotate-[-1deg] inline-block shadow-[2px_2px_0px_rgba(0,0,0,0.06)]">Handmade with care</span>
            <div className="w-8 h-0.5 bg-[#f5c040] rounded-full" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#2d2d2d] mb-8 leading-tight">
            Cut, fold,
            <span className="block text-[#e85d75] rotate-[-1deg] inline-block">create</span>
          </h1>
          <p className="text-lg text-[#666666] max-w-xl mx-auto leading-relaxed">
            Layers of color. The satisfying snap of scissors. Every element crafted by hand, imperfect and beautiful.
          </p>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Craft metrics"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Crafters", value: "4,210", color: "#e85d75", rotation: "rotate-[-0.5deg]" },
            { icon: TrendingUp, label: "Growth", value: "+27%", color: "#5cb8a5", rotation: "rotate-[0.5deg]" },
            { icon: Eye, label: "Views", value: "189K", color: "#f5c040", rotation: "rotate-[-0.3deg]" },
            { icon: Heart, label: "Saves", value: "3,678", color: "#6b7fb5", rotation: "rotate-[0.3deg]" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-6 bg-white rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-200 ${stat.rotation}`}
            >
              <stat.icon className="w-5 h-5 mb-4" style={{ color: stat.color }} />
              <p className="text-3xl font-bold text-[#2d2d2d] mb-1">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-wider text-[#b0a898]">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="The craft paper collection"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden border-2 border-[#e0d8cc] bg-white shadow-[3px_3px_0px_rgba(0,0,0,0.06)]"
            labelClassName="text-sm font-bold text-[#2d2d2d]"
            hexClassName="text-xs text-[#b0a898] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Handwritten warmth"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-white rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,0.08)] border-2 border-[#e0d8cc]">
            <p className="text-6xl font-bold text-[#2d2d2d] mb-4 leading-tight">Heading</p>
            <p className="text-4xl font-bold text-[#e85d75] mb-4">Subheading</p>
            <p className="text-xl text-[#666666] mb-4 leading-relaxed">
              Body text on warm paper. Friendly, readable, and inviting like a note from a friend.
            </p>
            <p className="text-sm text-[#b0a898] tracking-wider uppercase font-bold">
              Caption text with craft-like warmth
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Paper cutouts"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#fdf6ee] rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,0.08)] border-2 border-[#e0d8cc]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-6 py-3 bg-[#e85d75] text-white font-bold rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.08)] transition-all duration-200 rotate-[-0.5deg]">
                Create
              </button>
              <button className="px-6 py-3 bg-[#5cb8a5] text-white font-bold rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.08)] transition-all duration-200 rotate-[0.5deg]">
                Explore
              </button>
              <button className="px-6 py-3 bg-white border-2 border-[#2d2d2d] text-[#2d2d2d] font-bold rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.06)] transition-all duration-200">
                Learn More
              </button>
              <button className="px-6 py-3 bg-[#f5c040] text-[#2d2d2d] font-bold rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.08)] transition-all duration-200 rotate-[-0.3deg]">
                Highlight
              </button>
              <button className="px-6 py-3 bg-[#e0d8cc] text-[#b0a898] font-bold rounded-xl shadow-[2px_2px_0px_rgba(0,0,0,0.04)] cursor-not-allowed">
                Archived
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Layered paper containers"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Shapes, title: "Paper Origami", desc: "Fold, cut, and create beautiful paper sculptures with layered depth and satisfying geometry.", color: "#e85d75", bgLayer1: "#f5c040", bgLayer2: "#5cb8a5" },
            { icon: Sparkles, title: "Collage Art", desc: "Overlap, layer, and compose. Every piece finds its place in the larger picture, rough edges and all.", color: "#5cb8a5", bgLayer1: "#e85d75", bgLayer2: "#6b7fb5" },
            { icon: BookOpen, title: "Pop-up Books", desc: "Flat surfaces spring to life with dimension. Pull the tab and watch the story unfold in three dimensions.", color: "#6b7fb5", bgLayer1: "#f5c040", bgLayer2: "#e85d75" },
          ].map((card, index) => (
            <div key={index} className="relative group">
              {/* Back paper layer */}
              <div className="absolute inset-0 rounded-2xl rotate-[2deg] shadow-[4px_4px_0px_rgba(0,0,0,0.06)]" style={{ backgroundColor: card.bgLayer1 }} />
              {/* Middle paper layer */}
              <div className="absolute inset-0 rounded-2xl rotate-[1deg] shadow-[3px_3px_0px_rgba(0,0,0,0.06)]" style={{ backgroundColor: card.bgLayer2 }} />
              {/* Front card */}
              <div className="relative bg-white rounded-2xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.08)] group-hover:-translate-y-1 group-hover:shadow-[5px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-200">
                <div className="inline-block px-3 py-1 text-white text-xs font-bold rounded-lg mb-3 rotate-[-1deg]" style={{ backgroundColor: card.color }}>
                  Craft
                </div>
                <card.icon className="w-6 h-6 mb-4" style={{ color: card.color }} />
                <h3 className="text-lg font-bold text-[#2d2d2d] mb-3">{card.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Craft stations"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#fdf6ee] rounded-2xl border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="flex border-b-2 border-[#e0d8cc]">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold transition-all duration-200 border-b-2 -mb-px ${
                    activeTab === index
                      ? "text-[#e85d75] border-[#e85d75] bg-white"
                      : "text-[#b0a898] border-transparent hover:text-[#2d2d2d]"
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
                  <h4 className="text-lg font-bold text-[#2d2d2d] mb-2">Cutting Station</h4>
                  <p className="text-sm text-[#666666] leading-relaxed">Precision meets playfulness. Sharp scissors glide through colored cardstock, revealing shapes that stack and layer into something greater than their parts.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-bold text-[#2d2d2d] mb-2">Painting Corner</h4>
                  <p className="text-sm text-[#666666] leading-relaxed">Bright pigments meet textured paper. Each stroke adds character, each color tells a story. The palette is cheerful, warm, and endlessly combinable.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-bold text-[#2d2d2d] mb-2">Sketch Pad</h4>
                  <p className="text-sm text-[#666666] leading-relaxed">Pencil on paper, ideas take form. Quick doodles become blueprints for three-dimensional paper constructions. Every sketch holds potential.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Accordion"
        subtitle="Unfolding layers"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl border-2 border-[#e0d8cc] shadow-[3px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#fdf6ee] transition-all duration-200"
              >
                <span className="font-bold text-[#2d2d2d]">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#b0a898] transition-transform duration-200 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-2 border-[#e0d8cc]">
                  <p className="text-sm text-[#666666] leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Friendly notices"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#5cb8a5]/10 rounded-xl border-l-4 border-[#5cb8a5] shadow-[2px_2px_0px_rgba(0,0,0,0.04)]">
            <Check className="w-4 h-4 text-[#5cb8a5] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#5cb8a5]">Project saved</p>
              <p className="text-xs text-[#5cb8a5]/70 mt-0.5">Your craft project has been stored safely.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#f5c040]/10 rounded-xl border-l-4 border-[#f5c040] shadow-[2px_2px_0px_rgba(0,0,0,0.04)]">
            <AlertTriangle className="w-4 h-4 text-[#c9a030] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#c9a030]">Low on supplies</p>
              <p className="text-xs text-[#c9a030]/70 mt-0.5">Red cardstock is running low. Time to restock.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#e85d75]/10 rounded-xl border-l-4 border-[#e85d75] shadow-[2px_2px_0px_rgba(0,0,0,0.04)]">
            <X className="w-4 h-4 text-[#e85d75] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#e85d75]">Paper jam</p>
              <p className="text-xs text-[#e85d75]/70 mt-0.5">The template could not be printed. Please try again.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#6b7fb5]/10 rounded-xl border-l-4 border-[#6b7fb5] shadow-[2px_2px_0px_rgba(0,0,0,0.04)]">
            <Info className="w-4 h-4 text-[#6b7fb5] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-[#6b7fb5]">Craft tip</p>
              <p className="text-xs text-[#6b7fb5]/70 mt-0.5">Score along fold lines first for cleaner, crisper creases.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Craft preferences"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.08)] p-6 space-y-5">
            {[
              { label: "Paper Texture Overlay", desc: "Show subtle paper grain on all surfaces" },
              { label: "Playful Rotations", desc: "Enable slight tilts on interactive elements" },
              { label: "Auto-save Projects", desc: "Preserve work-in-progress automatically" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-bold text-[#2d2d2d]">{item.label}</p>
                  <p className="text-xs text-[#b0a898] mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-xl transition-all duration-200 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06)] ${
                    toggleStates[index] ? "bg-[#5cb8a5]" : "bg-[#e0d8cc]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-lg shadow-[1px_1px_0px_rgba(0,0,0,0.08)] transition-transform duration-200 ${
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
        subtitle="Project completion"
        className="py-16 px-6 bg-white"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#fdf6ee] rounded-2xl border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.08)] p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-[#2d2d2d]">Craft progress</p>
                <p className="text-xs text-[#b0a898] font-mono">{progress}%</p>
              </div>
              <div className="h-3 bg-[#e0d8cc] rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)]">
                <div
                  className="h-full bg-[#e85d75] rounded-xl transition-all duration-200 shadow-[2px_0px_0px_rgba(0,0,0,0.06)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-[#2d2d2d] mb-2">Step completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: 100, color: "#e85d75" },
                  { value: 100, color: "#5cb8a5" },
                  { value: progress, color: "#f5c040" },
                  { value: 0, color: "#6b7fb5" },
                ].map((step, index) => (
                  <div key={index}>
                    <div className="h-3 bg-[#e0d8cc] rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)]">
                      <div
                        className="h-full rounded-xl transition-all"
                        style={{
                          width: `${step.value}%`,
                          backgroundColor: step.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#b0a898] mt-1 text-center font-bold">Step {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-2 border-[#e0d8cc]">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-bold border-2 border-[#e0d8cc] text-[#666666] rounded-xl shadow-[2px_2px_0px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                Undo
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-bold bg-[#e85d75] text-white rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.12)] transition-all duration-200"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Form"
        subtitle="Write on paper"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold text-[#2d2d2d] mb-2"
        subtitleClassName="text-sm text-[#666666] mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border-2 border-[#e0d8cc] shadow-[4px_4px_0px_rgba(0,0,0,0.08)] p-8">
            <h3 className="text-lg font-bold text-[#2d2d2d] mb-6">Share Your Craft</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#2d2d2d] mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Write here..."
                  className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#b0a898] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#e85d75] focus:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),0_0_0_3px_rgba(232,93,117,0.15)] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2d2d2d] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@craft.studio"
                  className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#b0a898] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#e85d75] focus:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),0_0_0_3px_rgba(232,93,117,0.15)] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2d2d2d] mb-2">Description</label>
                <textarea
                  placeholder="Describe your project..."
                  rows={3}
                  className="w-full px-4 py-3 bg-white border-2 border-[#e0d8cc] rounded-xl text-[#2d2d2d] placeholder-[#b0a898] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04)] focus:outline-none focus:border-[#e85d75] focus:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.04),0_0_0_3px_rgba(232,93,117,0.15)] transition-all duration-200 resize-none"
                />
              </div>
              <button className="w-full py-3 bg-[#e85d75] text-white font-bold rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.12)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,0.08)] transition-all duration-200 mt-2">
                Submit Project
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-2 border-[#e0d8cc]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-[#b0a898] tracking-wider font-bold">
            Paper Craft Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#e85d75] transition-colors duration-200">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
