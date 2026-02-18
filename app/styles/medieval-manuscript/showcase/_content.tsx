"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, BookOpen, Scroll, Feather, Shield,
  ChevronDown, Check, X, AlertTriangle, Info,
  Users, TrendingUp, Eye, Heart,
  Crown, Library, PenTool,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Deep Red", hex: "#8b1a1a", bg: "bg-[#8b1a1a]" },
  { name: "Parchment", hex: "#f0e6d0", bg: "bg-[#f0e6d0]", border: true },
  { name: "Gold Leaf", hex: "#c9a74e", bg: "bg-[#c9a74e]" },
  { name: "Monastery Green", hex: "#2d4a2d", bg: "bg-[#2d4a2d]" },
  { name: "Dark Brown", hex: "#3d2b1f", bg: "bg-[#3d2b1f]" },
  { name: "Aged Parchment", hex: "#e5d9c0", bg: "bg-[#e5d9c0]", border: true },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const tabs = [
    { label: "Scriptorium", icon: PenTool },
    { label: "Library", icon: Library },
    { label: "Treasury", icon: Crown },
  ];

  const accordionItems = [
    { title: "What is the Illuminated Manuscript?", content: "Illuminated manuscripts were the pinnacle of Western book art, born in the scriptoria of medieval monasteries. Each page united faith and aesthetics -- gold leaf decorations, intricate vine patterns, deep red and green mineral pigments, and the warm texture unique to vellum." },
    { title: "Key Design Elements", content: "Gold leaf borders and dividers simulate gilding techniques. Drop cap initials enlarged to dramatic sizes in serif fonts echo the visual weight of Gothic blackletter. Parchment backgrounds with subtle radial gradients recreate the tonal variations of animal skin." },
    { title: "Historical Context", content: "From the Book of Kells to the Tres Riches Heures, illuminated manuscripts represented centuries of painstaking craftsmanship. Every margin decorated, every initial a miniature work of art, every page a testament to devotion and skill." },
  ];

  return (
    <div className="min-h-screen bg-[#f0e6d0] text-[#3d2b1f]">
      {/* Parchment texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_30%_40%,#3d2b1f_0%,transparent_50%)]" />
      <div className="fixed inset-0 pointer-events-none opacity-5 bg-[radial-gradient(circle_at_70%_60%,#8b1a1a_0%,transparent_40%)]" />

      {/* Navigation */}
      <nav className="px-6 py-5 border-b-4 border-double border-[#c9a74e]/60 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/medieval-manuscript"
            className="flex items-center gap-2 text-[#8b1a1a] hover:text-[#c9a74e] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-serif uppercase tracking-widest">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Scroll className="w-4 h-4 text-[#c9a74e]" />
            <span className="font-serif font-bold text-lg tracking-wider text-[#8b1a1a]">
              Manuscript
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-serif uppercase tracking-widest text-[#f0e6d0] bg-[#8b1a1a] border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f] hover:bg-[#8b1a1a]/90 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#3d2b1f] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-28 px-6 relative z-10">
        <div className="absolute inset-8 border-4 border-double border-[#c9a74e]/30 pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-6 py-1 border-t-2 border-b-2 border-[#c9a74e]">
            <span className="text-xs font-serif text-[#c9a74e] uppercase tracking-[0.4em]">
              Anno Domini MMXXVI
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#8b1a1a] mb-6 tracking-wider uppercase">
            <span className="text-8xl md:text-[10rem] text-[#c9a74e] leading-none block">I</span>lluminated
          </h1>
          <p className="text-lg text-[#3d2b1f]/60 font-serif italic mb-10 max-w-md mx-auto leading-relaxed">
            In the beginning was the Word, and the Word was illuminated with gold and devotion.
          </p>
          <button className="px-10 py-4 bg-[#8b1a1a] border-4 border-double border-[#c9a74e] text-[#f0e6d0] font-serif uppercase tracking-widest shadow-[2px_2px_0px_#3d2b1f] hover:bg-[#8b1a1a]/90 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#3d2b1f] transition-all duration-300">
            Begin Reading
          </button>
        </div>
      </section>

      {/* Stats */}
      <ShowcaseSection
        title="Overview"
        subtitle="Manuscript metrics"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Scribes", value: "142" },
            { icon: TrendingUp, label: "Growth", value: "+12%" },
            { icon: Eye, label: "Readings", value: "28K" },
            { icon: Heart, label: "Preserved", value: "1,209" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f] relative"
            >
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#c9a74e]/60" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#c9a74e]/60" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#c9a74e]/60" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#c9a74e]/60" />
              <stat.icon className="w-5 h-5 text-[#c9a74e] mb-4" />
              <p className="text-3xl font-serif font-bold text-[#8b1a1a] mb-1">{stat.value}</p>
              <p className="text-xs font-serif uppercase tracking-wider text-[#3d2b1f]/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Mineral pigments and gold leaf"
        className="py-16 px-6 bg-[#e5d9c0]/40 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-5xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden border-4 border-double border-[#c9a74e]/60 bg-[#f0e6d0]"
            labelClassName="text-sm font-serif font-bold text-[#3d2b1f]"
            hexClassName="text-xs text-[#3d2b1f]/60 font-serif italic"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Blackletter and serif"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-8 bg-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[3px_3px_0px_#3d2b1f] relative">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c9a74e]/60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c9a74e]/60" />
            <p className="text-6xl font-serif font-bold text-[#8b1a1a] mb-4 leading-tight uppercase tracking-wider">
              <span className="text-7xl text-[#c9a74e]">H</span>eading
            </p>
            <p className="text-4xl font-serif font-bold text-[#8b1a1a]/80 mb-4">Subheading</p>
            <p className="text-xl font-serif text-[#3d2b1f]/70 mb-4 leading-relaxed">
              Body text rendered in elegant serif, with generous line-height for meditative reading.
            </p>
            <p className="text-sm text-[#3d2b1f]/50 font-serif italic tracking-wider">
              Caption text in the manner of the scribes
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Ornate and purposeful"
        className="py-16 px-6 bg-[#e5d9c0]/40 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f]">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-8 py-4 bg-[#8b1a1a] border-4 border-double border-[#c9a74e] text-[#f0e6d0] font-serif uppercase tracking-widest shadow-[2px_2px_0px_#3d2b1f] hover:bg-[#8b1a1a]/90 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#3d2b1f] transition-all duration-300">
                Primary
              </button>
              <button className="px-8 py-4 bg-[#2d4a2d] border-4 border-double border-[#c9a74e] text-[#f0e6d0] font-serif uppercase tracking-widest shadow-[2px_2px_0px_#3d2b1f] hover:bg-[#2d4a2d]/90 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#3d2b1f] transition-all duration-300">
                Secondary
              </button>
              <button className="px-8 py-4 bg-transparent border-4 border-double border-[#c9a74e] text-[#8b1a1a] font-serif uppercase tracking-widest hover:bg-[#c9a74e]/10 transition-all duration-300">
                Outline
              </button>
              <button className="px-8 py-4 text-[#8b1a1a] font-serif uppercase tracking-widest underline underline-offset-4 decoration-[#c9a74e] decoration-2 hover:text-[#c9a74e] transition-all duration-300">
                Text Link
              </button>
              <button className="px-8 py-4 bg-[#3d2b1f]/20 text-[#3d2b1f]/40 font-serif uppercase tracking-widest border-4 border-double border-[#3d2b1f]/20 cursor-not-allowed">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Illuminated containers"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Scroll, title: "Scriptorium", desc: "Where monks dedicated their lives to copying sacred texts with unwavering precision and devotion.", letter: "S" },
            { icon: Shield, title: "Heraldry", desc: "Coats of arms and noble crests adorned with gold leaf, each symbol carrying centuries of meaning.", letter: "H" },
            { icon: Feather, title: "Calligraphy", desc: "The art of beautiful writing, each stroke of the quill an act of meditation and mastery.", letter: "C" },
          ].map((card, index) => (
            <div key={index} className="p-6 bg-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[3px_3px_0px_#3d2b1f] hover:shadow-[2px_2px_0px_#3d2b1f] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-300 relative">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c9a74e]/60" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c9a74e]/60" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c9a74e]/60" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c9a74e]/60" />
              <card.icon className="w-6 h-6 text-[#c9a74e] mb-4" />
              <h3 className="text-2xl font-serif font-bold text-[#8b1a1a] mb-3 tracking-wider uppercase">
                <span className="text-4xl text-[#c9a74e] mr-1 float-left leading-none">{card.letter}</span>{card.title.slice(1)}
              </h3>
              <p className="text-sm text-[#3d2b1f]/70 font-serif leading-relaxed clear-left">{card.desc}</p>
              <div className="mt-4 pt-3 border-t-2 border-[#c9a74e]/40">
                <span className="text-xs font-serif text-[#8b1a1a]/60 italic tracking-wider">Read more</span>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Content navigation"
        className="py-16 px-6 bg-[#e5d9c0]/40 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f] overflow-hidden">
            <div className="flex border-b-2 border-[#c9a74e]/40">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-3.5 text-sm font-serif uppercase tracking-widest transition-all duration-300 border-b-2 -mb-[2px] ${
                    activeTab === index
                      ? "text-[#8b1a1a] border-[#c9a74e] bg-[#c9a74e]/10"
                      : "text-[#3d2b1f]/40 border-transparent hover:text-[#8b1a1a]"
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
                  <h4 className="text-lg font-serif font-bold text-[#8b1a1a] mb-2 tracking-wider">The Writing Chamber</h4>
                  <p className="text-sm text-[#3d2b1f]/70 font-serif leading-relaxed">Within these stone walls, by candlelight, the scribes labored in silence. Each letter formed with care, each page a prayer made visible through ink and vellum.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#8b1a1a] mb-2 tracking-wider">The Great Library</h4>
                  <p className="text-sm text-[#3d2b1f]/70 font-serif leading-relaxed">Shelves of bound volumes reaching toward vaulted ceilings. The accumulated wisdom of ages, preserved on vellum and guarded by those who understood the weight of knowledge.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-lg font-serif font-bold text-[#8b1a1a] mb-2 tracking-wider">The Reliquary</h4>
                  <p className="text-sm text-[#3d2b1f]/70 font-serif leading-relaxed">Gold vessels and jeweled caskets holding the most precious manuscripts. Each artifact a testament to the belief that beauty and meaning are inseparable.</p>
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
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-2">
          {accordionItems.map((item, index) => (
            <div key={index} className="bg-[#f0e6d0] border-4 border-double border-[#c9a74e]/60 overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#c9a74e]/10 transition-all duration-300"
              >
                <span className="font-serif font-bold text-[#8b1a1a] tracking-wider">{item.title}</span>
                <ChevronDown className={`w-4 h-4 text-[#c9a74e] transition-transform duration-300 ${openAccordion === index ? "rotate-180" : ""}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-5 border-t-2 border-[#c9a74e]/30">
                  <p className="text-sm text-[#3d2b1f]/70 font-serif leading-relaxed pt-4">{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Proclamations"
        className="py-16 px-6 bg-[#e5d9c0]/40 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-3 p-4 bg-[#2d4a2d]/10 border-l-4 border-[#2d4a2d] border-4 border-double border-r-[#c9a74e]/30 border-t-[#c9a74e]/30 border-b-[#c9a74e]/30">
            <Check className="w-4 h-4 text-[#2d4a2d] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-bold text-[#2d4a2d]">Manuscript Preserved</p>
              <p className="text-xs text-[#2d4a2d]/70 mt-0.5 font-serif italic">Thy work has been committed to the archive.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#c9a74e]/10 border-l-4 border-[#c9a74e] border-4 border-double border-r-[#c9a74e]/30 border-t-[#c9a74e]/30 border-b-[#c9a74e]/30">
            <AlertTriangle className="w-4 h-4 text-[#c9a74e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-bold text-[#c9a74e]">Take Heed</p>
              <p className="text-xs text-[#c9a74e]/70 mt-0.5 font-serif italic">The gold leaf supply grows thin this season.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#8b1a1a]/10 border-l-4 border-[#8b1a1a] border-4 border-double border-r-[#c9a74e]/30 border-t-[#c9a74e]/30 border-b-[#c9a74e]/30">
            <X className="w-4 h-4 text-[#8b1a1a] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-bold text-[#8b1a1a]">Ink Spilled</p>
              <p className="text-xs text-[#8b1a1a]/70 mt-0.5 font-serif italic">An error in the script. The page must be rewritten.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-[#3d2b1f]/10 border-l-4 border-[#3d2b1f] border-4 border-double border-r-[#c9a74e]/30 border-t-[#c9a74e]/30 border-b-[#c9a74e]/30">
            <Info className="w-4 h-4 text-[#3d2b1f] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-serif font-bold text-[#3d2b1f]">A Note from the Abbot</p>
              <p className="text-xs text-[#3d2b1f]/70 mt-0.5 font-serif italic">Illumination sessions begin at the hour of Terce.</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Toggle"
        subtitle="Preferences"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f] p-6 space-y-5">
            {[
              { label: "Gold Leaf Illumination", desc: "Apply gold decorations to initial letters" },
              { label: "Vine Border Patterns", desc: "Add decorative vine borders to margins" },
              { label: "Parchment Aging Effect", desc: "Simulate aged vellum texture" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-serif font-bold text-[#3d2b1f]">{item.label}</p>
                  <p className="text-xs text-[#3d2b1f]/50 font-serif italic mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-12 h-6 rounded-sm transition-all duration-300 border-2 ${
                    toggleStates[index]
                      ? "bg-[#8b1a1a] border-[#c9a74e]"
                      : "bg-[#3d2b1f]/20 border-[#3d2b1f]/30"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-[#c9a74e] rounded-sm shadow-sm transition-transform duration-300 ${
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
        subtitle="Scribal progress"
        className="py-16 px-6 bg-[#e5d9c0]/40 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f] p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-serif font-bold text-[#3d2b1f]">Transcription progress</p>
                <p className="text-xs text-[#8b1a1a] font-serif italic">{progress}%</p>
              </div>
              <div className="h-2 bg-[#3d2b1f]/15 rounded-sm border border-[#c9a74e]/30">
                <div
                  className="h-full bg-[#8b1a1a] rounded-sm transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-serif font-bold text-[#3d2b1f] mb-2">Chapter completion</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((value, index) => (
                  <div key={index}>
                    <div className="h-2 bg-[#3d2b1f]/15 rounded-sm border border-[#c9a74e]/30">
                      <div
                        className={`h-full rounded-sm transition-all ${value === 100 ? "bg-[#2d4a2d]" : value > 0 ? "bg-[#c9a74e]" : ""}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#3d2b1f]/50 font-serif italic mt-1 text-center">Ch.{index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t-2 border-[#c9a74e]/30">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-4 py-2 text-sm font-serif uppercase tracking-widest border-4 border-double border-[#c9a74e]/60 text-[#3d2b1f] hover:bg-[#c9a74e]/10 transition-all duration-300"
              >
                Previous
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-4 py-2 text-sm font-serif uppercase tracking-widest bg-[#8b1a1a] text-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f] hover:bg-[#8b1a1a]/90 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#3d2b1f] transition-all duration-300"
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
        subtitle="Inscription"
        className="py-16 px-6 relative z-10"
        titleClassName="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider"
        subtitleClassName="text-sm font-serif text-[#3d2b1f]/60 italic mb-10"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-[#f0e6d0] border-4 border-double border-[#c9a74e] shadow-[3px_3px_0px_#3d2b1f] p-8 relative">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c9a74e]/60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c9a74e]/60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c9a74e]/60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c9a74e]/60" />
            <h3 className="text-lg font-serif font-bold text-[#8b1a1a] mb-6 uppercase tracking-wider">Leave Thy Mark</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-bold text-[#8b1a1a] uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Scribe thy name..."
                  className="w-full px-6 py-4 bg-[#f0e6d0]/80 border-2 border-[#3d2b1f]/30 rounded-sm text-[#3d2b1f] placeholder-[#3d2b1f]/30 font-serif focus:border-[#c9a74e] focus:shadow-[0_0_8px_rgba(201,167,78,0.2)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-serif font-bold text-[#8b1a1a] uppercase tracking-wider mb-2">Missive</label>
                <input
                  type="email"
                  placeholder="thy@letter.com"
                  className="w-full px-6 py-4 bg-[#f0e6d0]/80 border-2 border-[#3d2b1f]/30 rounded-sm text-[#3d2b1f] placeholder-[#3d2b1f]/30 font-serif focus:border-[#c9a74e] focus:shadow-[0_0_8px_rgba(201,167,78,0.2)] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-serif font-bold text-[#8b1a1a] uppercase tracking-wider mb-2">Inscription</label>
                <textarea
                  placeholder="Compose thy message..."
                  rows={3}
                  className="w-full px-6 py-4 bg-[#f0e6d0]/80 border-2 border-[#3d2b1f]/30 rounded-sm text-[#3d2b1f] placeholder-[#3d2b1f]/30 font-serif focus:border-[#c9a74e] focus:shadow-[0_0_8px_rgba(201,167,78,0.2)] focus:outline-none transition-all duration-300 resize-none"
                />
              </div>
              <button className="w-full py-4 bg-[#8b1a1a] text-[#f0e6d0] font-serif uppercase tracking-widest border-4 border-double border-[#c9a74e] shadow-[2px_2px_0px_#3d2b1f] hover:bg-[#8b1a1a]/90 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#3d2b1f] transition-all duration-300 mt-2">
                Dispatch Missive
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t-4 border-double border-[#c9a74e]/40 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-serif text-[#3d2b1f]/60 tracking-wider italic">
            Medieval Manuscript Showcase &middot; Part of{" "}
            <Link href="/" className="hover:text-[#8b1a1a] transition-all duration-300">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
