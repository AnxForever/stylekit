"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Smile, Heart, Star, Coffee, ChevronDown, ChevronUp,
  Check, X, AlertTriangle, Info, Users, TrendingUp, Eye, Pen
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(60);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  const colors: ColorItem[] = [
    { name: "Ink Black", value: "#2c2c2c", description: "Primary" },
    { name: "Paper White", value: "#fffef9", description: "Background" },
    { name: "Marker Blue", value: "#4a90e2", description: "Accent" },
    { name: "Highlighter Yellow", value: "#ffd93d", description: "Highlight" },
    { name: "Pencil Gray", value: "#a8a8a8", description: "Secondary" },
  ];

  const tabs = ["Sketch", "Draw", "Doodle"];

  const accordionItems = [
    { title: "What is Hand-Drawn Doodle?", content: "A playful, organic design style featuring hand-drawn illustrations, sketchy lines, and imperfect shapes that bring warmth and personality to digital interfaces." },
    { title: "Core Elements", content: "Wobbly hand-drawn lines, irregular shapes, handwritten fonts, doodle decorations, and a paper-like texture that creates a friendly, approachable feel." },
    { title: "Best Use Cases", content: "Perfect for educational apps, creative tools, personal blogs, children's products, and any brand wanting to feel human, approachable, and fun." },
  ];

  return (
    <div className="min-h-screen bg-[#fffef9] text-[#2c2c2c]">
      {/* Header */}
      <header className="border-b-4 border-[#2c2c2c] bg-white/80 backdrop-blur-sm sticky top-0 z-50" style={{ borderStyle: 'dashed' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#2c2c2c] hover:text-[#4a90e2] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-lg" style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}>Back to Styles</span>
          </Link>
          <div className="flex gap-2">
            <Star className="w-5 h-5 text-[#ffd93d]" style={{ filter: 'drop-shadow(2px 2px 0px #2c2c2c)' }} />
            <Heart className="w-5 h-5 text-[#ff6b9d]" style={{ filter: 'drop-shadow(2px 2px 0px #2c2c2c)' }} />
            <Smile className="w-5 h-5 text-[#4a90e2]" style={{ filter: 'drop-shadow(2px 2px 0px #2c2c2c)' }} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <ShowcaseHero
        title="Hand-Drawn Doodle"
        subtitle="Sketchy & Playful Style"
        description="Bring warmth and personality to your designs with hand-drawn illustrations, wobbly lines, and playful doodles that make everything feel human and approachable."
        className="relative py-24 px-6 overflow-hidden bg-[#fffef9]"
        titleClassName="text-6xl md:text-8xl font-bold mb-6 text-[#2c2c2c]"
        subtitleClassName="text-xl font-medium text-[#4a90e2] mb-8"
        descriptionClassName="text-lg text-[#5a5a5a] leading-relaxed max-w-2xl mx-auto"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-[#ffd93d] rounded-full" style={{ borderStyle: 'dashed', transform: 'rotate(15deg)' }}></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-[#4a90e2]" style={{ borderStyle: 'dashed', transform: 'rotate(-10deg)' }}></div>
        <svg className="absolute top-1/2 left-10 w-16 h-16 text-[#ff6b9d]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M50 20 L80 80 L20 80 Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </ShowcaseHero>

      {/* Stats */}
      <ShowcaseSection
        title="Fun Numbers"
        subtitle="Playful metrics"
        className="py-16 px-6 bg-white"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "Doodlers", value: "12.5K", color: "#4a90e2" },
            { icon: TrendingUp, label: "Sketches", value: "+89%", color: "#ff6b9d" },
            { icon: Eye, label: "Views", value: "425K", color: "#ffd93d" },
            { icon: Pen, label: "Strokes", value: "∞", color: "#9b59b6" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white border-4 border-[#2c2c2c] hover:translate-y-[-4px] transition-transform"
              style={{ 
                borderRadius: '20px 5px 25px 10px',
                boxShadow: '4px 4px 0px #2c2c2c'
              }}
            >
              <div 
                className="w-14 h-14 border-3 border-[#2c2c2c] flex items-center justify-center mb-4"
                style={{ 
                  backgroundColor: stat.color,
                  borderRadius: '50% 40% 55% 45%',
                  transform: 'rotate(-5deg)'
                }}
              >
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Markers"
        subtitle="Our palette"
        className="py-16 px-6"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <ColorPaletteGrid colors={colors} className="max-w-4xl mx-auto" />
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Hand Lettering"
        subtitle="Sketchy fonts"
        className="py-16 px-6 bg-white"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <div className="p-8 bg-[#fffef9] border-4 border-[#2c2c2c]" style={{ borderRadius: '15px 5px 20px 10px', borderStyle: 'dashed' }}>
            <h1 className="text-7xl font-bold text-[#2c2c2c] mb-2" style={{ fontFamily: '"Comic Sans MS", cursive', transform: 'rotate(-2deg)', display: 'inline-block' }}>Doodle</h1>
            <p className="text-sm text-gray-500 mt-4">Display / Handwritten</p>
          </div>
          <div className="p-8 bg-[#fff9e6] border-4 border-[#ffd93d]" style={{ borderRadius: '10px 20px 5px 15px' }}>
            <h2 className="text-4xl font-bold text-[#2c2c2c] mb-2" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Sketchy Heading</h2>
            <p className="text-sm text-gray-500">Heading / Bold</p>
          </div>
          <div className="p-8 bg-[#e3f2fd] border-4 border-[#4a90e2]" style={{ borderRadius: '20px 10px 15px 25px', borderStyle: 'dotted' }}>
            <p className="text-lg text-[#2c2c2c] mb-2" style={{ fontFamily: '"Comic Sans MS", cursive' }}>This is body text with a friendly hand-drawn feel :)</p>
            <p className="text-sm text-gray-500">Body / Regular</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Playful Buttons"
        subtitle="Click me!"
        className="py-16 px-6"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-[#4a90e2] text-white font-bold border-3 border-[#2c2c2c] hover:translate-y-[-2px] transition-transform" style={{ borderRadius: '15px 5px 10px 20px', boxShadow: '3px 3px 0px #2c2c2c', fontFamily: '"Comic Sans MS", cursive' }}>
            Primary
          </button>
          <button className="px-6 py-3 bg-[#ff6b9d] text-white font-bold border-3 border-[#2c2c2c] hover:translate-y-[-2px] transition-transform" style={{ borderRadius: '5px 15px 20px 10px', boxShadow: '3px 3px 0px #2c2c2c', fontFamily: '"Comic Sans MS", cursive' }}>
            Secondary
          </button>
          <button className="px-6 py-3 bg-white text-[#2c2c2c] font-bold border-4 border-[#2c2c2c] hover:bg-[#ffd93d] transition-colors" style={{ borderRadius: '10px 20px 10px 20px', borderStyle: 'dashed', fontFamily: '"Comic Sans MS", cursive' }}>
            Outlined
          </button>
          <button className="px-6 py-3 bg-[#ffd93d] text-[#2c2c2c] font-bold border-3 border-[#2c2c2c] hover:scale-105 transition-transform" style={{ borderRadius: '20px 5px 15px 10px', boxShadow: '4px 4px 0px #2c2c2c', fontFamily: '"Comic Sans MS", cursive' }}>
            Highlight
          </button>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Sketchy Cards"
        subtitle="Content blocks"
        className="py-16 px-6 bg-white"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Creative", desc: "Express yourself with hand-drawn elements", color: "#4a90e2", rotation: "-2deg" },
            { title: "Friendly", desc: "Warm and approachable design language", color: "#ff6b9d", rotation: "1deg" },
            { title: "Playful", desc: "Fun doodles and sketchy decorations", color: "#ffd93d", rotation: "-1deg" },
          ].map((card, i) => (
            <div
              key={i}
              className="p-6 bg-white border-4 border-[#2c2c2c] hover:translate-y-[-4px] transition-transform"
              style={{ 
                borderRadius: '15px 5px 20px 10px',
                boxShadow: '4px 4px 0px #2c2c2c',
                transform: `rotate(${card.rotation})`
              }}
            >
              <div className="w-12 h-12 mb-4 border-3 border-[#2c2c2c]" style={{ backgroundColor: card.color, borderRadius: '50% 40% 55% 45%' }}></div>
              <h3 className="text-2xl font-bold mb-3 text-[#2c2c2c]" style={{ fontFamily: '"Comic Sans MS", cursive' }}>{card.title}</h3>
              <p className="text-gray-600" style={{ fontFamily: '"Comic Sans MS", cursive' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tab Sketches"
        subtitle="Navigation"
        className="py-16 px-6"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-4 border-[#2c2c2c] overflow-hidden" style={{ borderRadius: '20px 10px 15px 25px', boxShadow: '5px 5px 0px #2c2c2c' }}>
            <div className="flex border-b-4 border-[#2c2c2c]" style={{ borderStyle: 'dashed' }}>
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex-1 px-6 py-4 font-bold transition-all ${
                    activeTab === index
                      ? "bg-[#ffd93d] text-[#2c2c2c]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  style={{ fontFamily: '"Comic Sans MS", cursive' }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-8 min-h-[140px]">
              {activeTab === 0 && (
                <div>
                  <h4 className="text-2xl font-bold text-[#4a90e2] mb-3" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Sketch Mode</h4>
                  <p className="text-gray-700" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Quick rough outlines and basic shapes to capture ideas rapidly.</p>
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <h4 className="text-2xl font-bold text-[#ff6b9d] mb-3" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Draw Mode</h4>
                  <p className="text-gray-700" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Detailed hand-drawn illustrations with personality and character.</p>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <h4 className="text-2xl font-bold text-[#9b59b6] mb-3" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Doodle Mode</h4>
                  <p className="text-gray-700" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Playful decorative elements and fun embellishments everywhere!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Accordion */}
      <ShowcaseSection
        title="Folded Notes"
        subtitle="Expandable info"
        className="py-16 px-6 bg-white"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {accordionItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#fffef9] border-4 border-[#2c2c2c] overflow-hidden"
              style={{ 
                borderRadius: '15px 5px 20px 10px',
                boxShadow: '3px 3px 0px #2c2c2c'
              }}
            >
              <button
                onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-yellow-50 transition-colors"
              >
                <span className="font-bold text-lg text-[#2c2c2c]" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
                  {item.title}
                </span>
                {openAccordion === index ? (
                  <ChevronUp className="w-6 h-6 text-[#4a90e2]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#4a90e2]" />
                )}
              </button>
              {openAccordion === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed" style={{ fontFamily: '"Comic Sans MS", cursive' }}>{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Sticky Notes"
        subtitle="Messages"
        className="py-16 px-6"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { icon: Check, label: "Success!", desc: "Great job! Everything worked perfectly.", color: "#4a90e2", bg: "#e3f2fd" },
            { icon: AlertTriangle, label: "Heads up!", desc: "Just a friendly reminder about something.", color: "#ffa726", bg: "#fff3e0" },
            { icon: X, label: "Oops!", desc: "Something went wrong, but no worries!", color: "#ef5350", bg: "#ffebee" },
            { icon: Info, label: "Fun fact!", desc: "Here's something interesting to know.", color: "#9b59b6", bg: "#f3e5f5" },
          ].map((alert, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 border-4 border-[#2c2c2c]"
              style={{ 
                backgroundColor: alert.bg,
                borderRadius: '10px 20px 15px 5px',
                boxShadow: '3px 3px 0px #2c2c2c',
                transform: `rotate(${i % 2 === 0 ? '-1deg' : '1deg'})`
              }}
            >
              <div className="w-10 h-10 border-2 border-[#2c2c2c] flex items-center justify-center flex-shrink-0" style={{ backgroundColor: alert.color, borderRadius: '50% 40% 55% 45%' }}>
                <alert.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-lg mb-1" style={{ color: alert.color, fontFamily: '"Comic Sans MS", cursive' }}>{alert.label}</p>
                <p className="text-gray-700 text-sm" style={{ fontFamily: '"Comic Sans MS", cursive' }}>{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Toggle */}
      <ShowcaseSection
        title="Flip Switches"
        subtitle="Toggle controls"
        className="py-16 px-6 bg-white"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-[#fffef9] border-4 border-[#2c2c2c] space-y-6" style={{ borderRadius: '20px 10px 15px 25px', boxShadow: '5px 5px 0px #2c2c2c' }}>
            {[
              { label: "Doodle Mode", desc: "Add sketchy decorations", color: "#4a90e2" },
              { label: "Hand-Drawn", desc: "Use wobbly lines", color: "#ff6b9d" },
              { label: "Paper Texture", desc: "Show background grain", color: "#ffd93d" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b-2 border-dashed border-gray-300 last:border-b-0">
                <div>
                  <p className="font-bold text-lg text-[#2c2c2c]" style={{ fontFamily: '"Comic Sans MS", cursive' }}>{item.label}</p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: '"Comic Sans MS", cursive' }}>{item.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const newStates = [...toggleStates];
                    newStates[index] = !newStates[index];
                    setToggleStates(newStates);
                  }}
                  className={`relative w-16 h-8 border-3 border-[#2c2c2c] transition-all`}
                  style={{ 
                    backgroundColor: toggleStates[index] ? item.color : '#e0e0e0',
                    borderRadius: '20px 5px 15px 10px'
                  }}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 bg-white border-2 border-[#2c2c2c] transition-all`}
                    style={{ 
                      borderRadius: '50% 40% 55% 45%',
                      left: toggleStates[index] ? 'calc(100% - 28px)' : '4px'
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Progress */}
      <ShowcaseSection
        title="Progress Bars"
        subtitle="Loading states"
        className="py-16 px-6"
        titleClassName="text-4xl font-bold text-[#2c2c2c] mb-4 text-center"
        subtitleClassName="text-[#4a90e2] mb-12 text-center"
        style={{ fontFamily: '"Comic Sans MS", "Segoe UI", cursive' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="p-8 bg-white border-4 border-[#2c2c2c] space-y-8" style={{ borderRadius: '15px 5px 20px 10px', boxShadow: '5px 5px 0px #2c2c2c' }}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-lg text-[#2c2c2c]" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Drawing Progress</p>
                <p className="text-sm font-bold text-[#4a90e2]" style={{ fontFamily: '"Comic Sans MS", cursive' }}>{progress}%</p>
              </div>
              <div className="h-6 bg-gray-200 border-3 border-[#2c2c2c] overflow-hidden" style={{ borderRadius: '15px 5px 10px 20px' }}>
                <div
                  className="h-full bg-[#4a90e2] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div>
              <p className="font-bold text-lg text-[#2c2c2c] mb-3" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Sketch Phases</p>
              <div className="grid grid-cols-4 gap-2">
                {[100, 100, progress, 0].map((val, i) => (
                  <div key={i}>
                    <div className="h-4 bg-gray-200 border-2 border-[#2c2c2c] overflow-hidden" style={{ borderRadius: '10px 3px 8px 5px' }}>
                      <div
                        className="h-full transition-all"
                        style={{ 
                          width: `${val}%`,
                          backgroundColor: val === 100 ? '#4a90e2' : val > 0 ? '#ffd93d' : 'transparent'
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1 text-center" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Step {i + 1}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t-2 border-dashed border-gray-300">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-6 py-3 bg-white border-3 border-[#2c2c2c] text-[#2c2c2c] font-bold hover:bg-gray-100 transition-colors"
                style={{ borderRadius: '10px 5px 15px 8px', fontFamily: '"Comic Sans MS", cursive' }}
              >
                Less
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-6 py-3 bg-[#4a90e2] text-white font-bold border-3 border-[#2c2c2c] hover:translate-y-[-2px] transition-transform"
                style={{ borderRadius: '5px 15px 10px 20px', boxShadow: '3px 3px 0px #2c2c2c', fontFamily: '"Comic Sans MS", cursive' }}
              >
                More
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="border-t-4 border-[#2c2c2c] py-12 px-6 text-center bg-white" style={{ borderStyle: 'dashed' }}>
        <p className="text-gray-600" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
          Hand-Drawn Doodle Style © 2026 - Made with <Heart className="w-4 h-4 inline text-[#ff6b9d]" /> and sketchy lines
        </p>
      </footer>
    </div>
  );
}
