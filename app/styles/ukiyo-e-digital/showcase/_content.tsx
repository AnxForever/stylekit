"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Waves,
  Sun,
  Flower2,
  Mountain,
  ChevronDown,
  Check,
  X,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const seasons = [
    {
      name: "Spring",
      ja: "春",
      color: "bg-[#e8a0b4]",
      accent: "border-[#e8a0b4]",
      textColor: "text-[#c4748e]",
      content:
        "Cherry blossoms scatter in warm breezes. The world awakens in delicate pink and white, as new beginnings emerge from winter's rest. Hanami gatherings celebrate the transient beauty of sakura.",
    },
    {
      name: "Summer",
      ja: "夏",
      color: "bg-[#2d6a4f]",
      accent: "border-[#2d6a4f]",
      textColor: "text-[#2d6a4f]",
      content:
        "Verdant greens and deep shadows under the blazing sun. Cicadas sing endlessly as the world reaches its fullest expression of life. Fireworks illuminate the night sky above still rivers.",
    },
    {
      name: "Autumn",
      ja: "秋",
      color: "bg-[#d4553a]",
      accent: "border-[#d4553a]",
      textColor: "text-[#d4553a]",
      content:
        "Maple leaves paint the mountains in vermilion and gold. A melancholic beauty as the floating world prepares for stillness. Travelers walk along crimson forest paths.",
    },
    {
      name: "Winter",
      ja: "冬",
      color: "bg-[#1a3055]",
      accent: "border-[#1a3055]",
      textColor: "text-[#1a3055]",
      content:
        "Snow blankets the world in quiet contemplation. Indigo nights and ivory mornings reveal beauty in absence. Cranes stand solitary beside frozen streams.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e1] text-[#1a3055]">
      {/* 1. Navigation */}
      <header className="border-b-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/styles/ukiyo-e-digital/showcase"
              className="font-serif text-lg md:text-xl tracking-[0.3em] font-bold"
            >
              浮世絵
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/styles/ukiyo-e-digital"
                className="text-sm font-bold tracking-wider text-[#1a3055]/60 hover:text-[#d4553a] transition-colors"
              >
                文档
              </Link>
              <Link
                href="/styles"
                className="text-sm font-bold tracking-wider text-[#1a3055]/60 hover:text-[#d4553a] transition-colors"
              >
                返回
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-28 text-center">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Design Style
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            Ukiyo-e Digital
          </h1>
          <p className="text-lg md:text-xl text-[#1a3055]/60 tracking-wider max-w-xl mx-auto mb-10">
            Flat layers, thick outlines, traditional motifs reborn in digital
            form.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-[#d4553a] text-[#f5f0e1] border-2 border-[#1a3055] font-bold tracking-wider hover:bg-[#c9a227] transition-colors">
              Discover
            </button>
            <button className="px-8 py-3 bg-transparent text-[#1a3055] border-2 border-[#1a3055] font-bold tracking-wider hover:bg-[#1a3055] hover:text-[#f5f0e1] transition-colors">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Seigaiha Wave Divider */}
      <div className="py-6 flex justify-center border-b-2 border-[#1a3055]/10">
        <svg width="280" height="20" viewBox="0 0 280 20" fill="none">
          {[0, 40, 80, 120, 160, 200, 240].map((cx) => (
            <path
              key={cx}
              d={`M${cx} 20 Q${cx + 20} 0 ${cx + 40} 20`}
              stroke="#1a3055"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      {/* 3. Color Palette */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Color System
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            浮世之色
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: "Indigo", hex: "#1a3055", bg: "bg-[#1a3055]", text: "text-[#f5f0e1]" },
              { name: "Vermilion", hex: "#d4553a", bg: "bg-[#d4553a]", text: "text-[#f5f0e1]" },
              { name: "Gold Leaf", hex: "#c9a227", bg: "bg-[#c9a227]", text: "text-[#1a3055]" },
              { name: "Rice White", hex: "#f5f0e1", bg: "bg-[#f5f0e1]", text: "text-[#1a3055]" },
              { name: "Deep Blue", hex: "#2a5a8c", bg: "bg-[#2a5a8c]", text: "text-[#f5f0e1]" },
            ].map((color) => (
              <div key={color.name} className="border-2 border-[#1a3055]">
                <div className={`h-24 md:h-32 ${color.bg}`} />
                <div className="p-3 md:p-4 border-t-2 border-[#1a3055] bg-[#f5f0e1]">
                  <p className="text-sm font-bold tracking-wider">{color.name}</p>
                  <p className="text-xs text-[#d4553a] font-mono">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Typography */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Typography
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            書体
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#d4553a] mb-4">
                Brush-stroke Headings
              </p>
              <h3 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
                The Floating World
              </h3>
              <p className="text-sm text-[#1a3055]/50">
                font-serif -- bold -- tracking-tight -- large scale
              </p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/60 mb-4">
                Clean Body Text
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-4 text-[#1a3055]/70">
                Body text remains clean and legible, providing a quiet
                counterpoint to bold display headings. The contrast between
                heavy titles and light prose mirrors the layered technique of
                woodblock printing.
              </p>
              <p className="text-sm text-[#1a3055]/50">
                font-sans -- leading-relaxed -- 400 weight
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Buttons */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Interactive
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            版画之印
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-[#d4553a] text-[#f5f0e1] border-2 border-[#1a3055] font-bold tracking-wider hover:bg-[#1a3055] transition-colors">
              Vermilion
            </button>
            <button className="px-6 py-3 bg-[#1a3055] text-[#f5f0e1] border-2 border-[#1a3055] font-bold tracking-wider hover:bg-[#2a5a8c] transition-colors">
              Indigo
            </button>
            <button className="px-6 py-3 bg-[#c9a227] text-[#1a3055] border-2 border-[#1a3055] font-bold tracking-wider hover:bg-[#d4553a] hover:text-[#f5f0e1] transition-colors">
              Gold Leaf
            </button>
            <button className="px-6 py-3 bg-transparent text-[#1a3055] border-2 border-[#1a3055] font-bold tracking-wider hover:bg-[#1a3055] hover:text-[#f5f0e1] transition-colors">
              Outline
            </button>
          </div>
        </div>
      </section>

      {/* 6. Cards */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Content
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            浮世百景
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Waves,
                title: "The Great Wave",
                desc: "Beneath the surface of the floating world, tides shape the shore in endless rhythm.",
                borderColor: "border-[#2a5a8c]",
                iconBg: "bg-[#2a5a8c]",
              },
              {
                icon: Mountain,
                title: "Mount Fuji",
                desc: "Thirty-six views of the sacred peak, each revealing a different face of the mountain.",
                borderColor: "border-[#1a3055]",
                iconBg: "bg-[#1a3055]",
              },
              {
                icon: Flower2,
                title: "Cherry Blossom",
                desc: "Petals fall like snow in spring, a reminder that all beauty is fleeting.",
                borderColor: "border-[#d4553a]",
                iconBg: "bg-[#d4553a]",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`p-6 bg-[#f5f0e1] border-2 ${card.borderColor} hover:bg-[#1a3055] hover:text-[#f5f0e1] transition-colors group`}
              >
                <div
                  className={`w-14 h-14 ${card.iconBg} flex items-center justify-center mb-4 border-2 border-[#1a3055] group-hover:border-[#f5f0e1]`}
                >
                  <card.icon className="w-7 h-7 text-[#f5f0e1]" />
                </div>
                <h3 className="text-xl font-bold tracking-wider mb-2">
                  {card.title}
                </h3>
                <p className="text-[#1a3055]/60 group-hover:text-[#f5f0e1]/70 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Form */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-md mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4 text-center">
            Form
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12 text-center">
            書道之美
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-[0.3em] uppercase text-[#d4553a] mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                className="w-full px-4 py-3 bg-[#f5f0e1] border-2 border-[#1a3055] text-sm text-[#1a3055] placeholder-[#1a3055]/40 focus:border-[#d4553a] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/60 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-[#f5f0e1] border-2 border-[#1a3055] text-sm text-[#1a3055] placeholder-[#1a3055]/40 focus:border-[#c9a227] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/60 mb-2">
                Message
              </label>
              <textarea
                placeholder="Write your message..."
                rows={3}
                className="w-full px-4 py-3 bg-[#f5f0e1] border-2 border-[#1a3055] text-sm text-[#1a3055] placeholder-[#1a3055]/40 focus:border-[#d4553a] focus:outline-none transition-colors resize-none"
              />
            </div>
            <button className="w-full px-6 py-3 bg-[#d4553a] text-[#f5f0e1] border-2 border-[#1a3055] font-bold tracking-wider hover:bg-[#1a3055] transition-colors">
              Submit
            </button>
          </div>
        </div>
      </section>

      {/* 8. Seasonal Tabs (4) */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Seasons
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            四季
          </h2>
          <div className="border-2 border-[#1a3055]">
            <div className="flex border-b-2 border-[#1a3055]">
              {seasons.map((season, i) => (
                <button
                  key={season.name}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 py-4 text-sm font-bold tracking-wider transition-colors ${
                    activeTab === i
                      ? `${season.color} text-[#f5f0e1]`
                      : "bg-[#f5f0e1] text-[#1a3055]/60 hover:text-[#1a3055]"
                  }`}
                >
                  <span className="hidden md:inline">{season.name}</span>
                  <span className="md:hidden">{season.ja}</span>
                </button>
              ))}
            </div>
            <div className="p-6 md:p-8 bg-[#f5f0e1]">
              <p className={`font-serif text-xl font-bold mb-1 ${seasons[activeTab].textColor}`}>
                {seasons[activeTab].name} / {seasons[activeTab].ja}
              </p>
              <p className="text-sm text-[#1a3055]/60 leading-relaxed">
                {seasons[activeTab].content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seigaiha Wave Divider */}
      <div className="py-6 flex justify-center">
        <svg width="280" height="20" viewBox="0 0 280 20" fill="none">
          {[0, 40, 80, 120, 160, 200, 240].map((cx) => (
            <path
              key={cx}
              d={`M${cx} 20 Q${cx + 20} 0 ${cx + 40} 20`}
              stroke="#d4553a"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      {/* 9. Hanko Badges */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Badges
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            判子
          </h2>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Seal Stamps
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="w-12 h-12 rounded-full bg-[#d4553a] text-[#f5f0e1] flex items-center justify-center font-serif text-xs font-bold border-2 border-[#1a3055]">
                  承認
                </span>
                <span className="w-12 h-12 rounded-full bg-[#1a3055] text-[#f5f0e1] flex items-center justify-center font-serif text-xs font-bold border-2 border-[#c9a227]">
                  印鑑
                </span>
                <span className="w-12 h-12 rounded-full bg-[#c9a227] text-[#1a3055] flex items-center justify-center font-serif text-xs font-bold border-2 border-[#1a3055]">
                  金印
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Rectangular Chops
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1 bg-[#d4553a] text-[#f5f0e1] text-xs font-bold tracking-widest border-2 border-[#1a3055]">
                  APPROVED
                </span>
                <span className="px-4 py-1 bg-[#1a3055] text-[#f5f0e1] text-xs font-bold tracking-widest border-2 border-[#c9a227]">
                  OFFICIAL
                </span>
                <span className="px-4 py-1 bg-[#c9a227] text-[#1a3055] text-xs font-bold tracking-widest border-2 border-[#1a3055]">
                  PREMIUM
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Wave-border Tags
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 text-xs font-bold tracking-widest border-2 border-[#2a5a8c] text-[#2a5a8c] border-dashed">
                  Wave
                </span>
                <span className="px-3 py-1 text-xs font-bold tracking-widest border-2 border-[#d4553a] text-[#d4553a] border-dashed">
                  Vermilion
                </span>
                <span className="px-3 py-1 text-xs font-bold tracking-widest border-2 border-[#c9a227] text-[#c9a227] border-dashed">
                  Gold
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Progress Bars */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Progress
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            進行
          </h2>
          <div className="space-y-8">
            {[
              { label: "Woodblock Carving", pct: "75%", fill: "bg-[#1a3055]" },
              { label: "Ink Preparation", pct: "50%", fill: "bg-[#d4553a]" },
              { label: "Gold Leaf Application", pct: "90%", fill: "bg-[#c9a227]" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="tracking-wider">{bar.label}</span>
                  <span className="text-[#d4553a]">{bar.pct}</span>
                </div>
                <div className="h-4 bg-[#f5f0e1] border-2 border-[#1a3055]">
                  <div className={`h-full ${bar.fill}`} style={{ width: bar.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Alerts */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Notifications
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            通知
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border-2 border-[#2a5a8c] bg-[#2a5a8c]/5">
              <Info className="w-5 h-5 text-[#2a5a8c] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#2a5a8c] mb-1">Wave Notice</p>
                <p className="text-sm text-[#1a3055]/60">The tide patterns have been updated for this season.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-[#c9a227] bg-[#c9a227]/5">
              <Sun className="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#c9a227] mb-1">Sun Warning</p>
                <p className="text-sm text-[#1a3055]/60">Strong sunlight may cause ink pigments to fade over time.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-[#d4553a] bg-[#d4553a]/5">
              <AlertTriangle className="w-5 h-5 text-[#d4553a] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#d4553a] mb-1">Thunder Error</p>
                <p className="text-sm text-[#1a3055]/60">The printing block encountered an alignment issue.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border-2 border-[#e8a0b4] bg-[#e8a0b4]/5">
              <Check className="w-5 h-5 text-[#c4748e] shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-[#c4748e] mb-1">Blossom Success</p>
                <p className="text-sm text-[#1a3055]/60">Your woodblock print has been successfully registered.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Dropdown */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-xs mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4 text-center">
            Select
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12 text-center">
            選択
          </h2>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 border-2 border-[#1a3055] bg-[#f5f0e1] text-sm font-bold flex items-center justify-between hover:border-[#d4553a] transition-colors"
            >
              <span>Select Print Series</span>
              <ChevronDown
                className={`w-4 h-4 text-[#d4553a] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-0 bg-[#f5f0e1] border-2 border-t-0 border-[#1a3055] z-10">
                {[
                  "Thirty-six Views of Fuji",
                  "One Hundred Famous Views",
                  "Fifty-three Stations",
                  "Eight Views of Omi",
                ].map((item) => (
                  <button
                    key={item}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-[#1a3055] hover:text-[#f5f0e1] transition-colors border-b-2 border-[#1a3055]/10 last:border-b-0"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 13. Table */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Catalog
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            版画目録
          </h2>
          <div className="border-2 border-[#1a3055] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a3055] text-[#f5f0e1]">
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-widest">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-widest">Artist</th>
                  <th className="px-4 py-3 text-left text-xs font-bold tracking-widest">Period</th>
                  <th className="px-4 py-3 text-right text-xs font-bold tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { title: "The Great Wave", artist: "Hokusai", period: "1831", status: "Exhibited" },
                  { title: "Red Fuji", artist: "Hokusai", period: "1832", status: "Archived" },
                  { title: "Plum Garden", artist: "Hiroshige", period: "1857", status: "On Loan" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b-2 border-[#1a3055]/20 last:border-b-0 hover:bg-[#c9a227]/10 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm font-bold">{row.title}</td>
                    <td className="px-4 py-4 text-sm text-[#1a3055]/60">{row.artist}</td>
                    <td className="px-4 py-4 text-sm text-[#1a3055]/60">{row.period}</td>
                    <td className="px-4 py-4 text-right">
                      <span
                        className={`text-xs font-bold tracking-widest ${
                          row.status === "Exhibited"
                            ? "text-[#2d6a4f]"
                            : row.status === "On Loan"
                              ? "text-[#d4553a]"
                              : "text-[#1a3055]/50"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 14. Blockquote (Haiku) */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Quote
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            俳句
          </h2>
          <blockquote className="border-l-4 border-[#d4553a] pl-6 md:pl-8">
            <p className="font-serif text-xl md:text-2xl leading-relaxed mb-1 text-[#1a3055]">
              An old silent pond
            </p>
            <p className="font-serif text-xl md:text-2xl leading-relaxed mb-1 text-[#1a3055]">
              A frog jumps into the pond
            </p>
            <p className="font-serif text-xl md:text-2xl leading-relaxed mb-6 text-[#1a3055]">
              Splash! Silence again.
            </p>
            {/* Brush accent divider */}
            <div className="w-16 h-1 bg-[#1a3055] mb-4" />
            <footer className="text-sm text-[#1a3055]/50">
              <span className="font-bold tracking-wider">-- Matsuo Basho</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 15. Wave Dividers Section */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Dividers
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            青海波
          </h2>
          <div className="space-y-10">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Indigo Waves
              </p>
              <svg width="100%" height="24" viewBox="0 0 400 24" preserveAspectRatio="none" fill="none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M${i * 40} 24 Q${i * 40 + 20} 0 ${i * 40 + 40} 24`}
                    stroke="#1a3055"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Vermilion Arcs
              </p>
              <svg width="100%" height="24" viewBox="0 0 400 24" preserveAspectRatio="none" fill="none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M${i * 40} 24 Q${i * 40 + 20} 0 ${i * 40 + 40} 24`}
                    stroke="#d4553a"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a3055]/50 mb-4">
                Brush Stroke
              </p>
              <div className="h-1 bg-[#1a3055]" />
            </div>
          </div>
        </div>
      </section>

      {/* 16. Rules Summary */}
      <section className="border-b-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-[#d4553a] mb-4">
            Guidelines
          </p>
          <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12">
            核心規則
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border-2 border-[#1a3055]">
              <h3 className="font-serif text-xl font-bold text-[#1a3055] mb-6">
                Required
              </h3>
              <ul className="space-y-3 text-sm text-[#1a3055]/70">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Thick outlines (border-2 or border-3)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Flat color fills, no transparency tricks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Traditional palette: indigo, vermilion, gold, ivory</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Woodblock print feel with layered composition</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#2d6a4f] shrink-0 mt-0.5" />
                  <span>Seigaiha wave motifs and natural imagery</span>
                </li>
              </ul>
            </div>
            <div className="p-6 border-2 border-[#d4553a]">
              <h3 className="font-serif text-xl font-bold text-[#d4553a] mb-6">
                Forbidden
              </h3>
              <ul className="space-y-3 text-sm text-[#1a3055]/70">
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Gradients or color transitions</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Drop shadows or box-shadow effects</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Thin lines or hairline borders</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Photorealistic imagery or textures</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 text-[#d4553a] shrink-0 mt-0.5" />
                  <span>Rounded corners on UI components</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 17. Footer */}
      <footer className="border-t-2 border-[#1a3055]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#1a3055]/50">
              StyleKit -- Ukiyo-e Digital Showcase
            </p>
            <Link
              href="/styles/ukiyo-e-digital"
              className="text-sm font-bold tracking-wider hover:text-[#d4553a] transition-colors"
            >
              View Full Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
