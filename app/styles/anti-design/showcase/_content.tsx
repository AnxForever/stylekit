"use client";

import Link from "next/link";
import {
  ArrowLeft,
  X,
  AlertTriangle,
  Slash,
  Zap,
  Bold,
} from "lucide-react";

function AntiCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border-4 border-black p-6 shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-100 ${className}`}
    >
      {children}
    </div>
  );
}

export default function AntiDesignShowcaseContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b-4 border-black px-6 py-4 flex items-center justify-between">
        <Link
          href="/styles/anti-design"
          className="flex items-center gap-2 font-black text-sm uppercase border-4 border-black px-4 py-2 shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={3} />
          BACK
        </Link>
        <span className="font-black text-xl md:text-2xl uppercase tracking-tight">
          ANTI-DESIGN
        </span>
        <Link
          href="/styles"
          className="font-black text-sm uppercase border-4 border-black px-4 py-2 shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100"
        >
          ALL STYLES
        </Link>
      </nav>

      {/* Hero Section - Yellow background, giant rotated title */}
      <section className="bg-[#FFFF00] border-b-4 border-black py-16 md:py-24 px-6 md:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase text-black leading-none -rotate-2">
            ANTI-DESIGN
          </h1>
          <div className="mt-6 flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
            <p className="text-lg md:text-2xl font-black text-black/80 max-w-md rotate-1">
              BREAK EVERY RULE. REJECT EVERY CONVENTION. EMBRACE THE CHAOS.
            </p>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-[#FF0000] text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100">
                DESTROY
              </button>
              <button className="px-6 py-3 bg-black text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0_#FF0000] hover:shadow-[6px_6px_0_#FF0000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100">
                CREATE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section - Red bg, misaligned text */}
      <section className="bg-[#FF0000] border-b-4 border-black py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto text-white">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 -rotate-1">
            MANIFESTO
          </h2>
          <div className="space-y-2">
            <p className="text-3xl md:text-5xl font-black uppercase">
              NO ROUNDED CORNERS
            </p>
            <p className="text-lg md:text-xl font-bold rotate-1 ml-8">
              Beauty is a trap. Harmony is a cage.
            </p>
            <p className="text-4xl md:text-6xl font-black uppercase -rotate-1">
              NO SOFT SHADOWS
            </p>
            <p className="text-sm font-bold ml-16 rotate-2">
              {"We reject the smooth, the polished, the \"user-friendly\""}
            </p>
            <p className="text-2xl md:text-4xl font-black uppercase">
              ONLY RAW POWER
            </p>
          </div>
        </div>
      </section>

      {/* Cards Grid - Different accent color strips */}
      <section className="bg-white border-b-4 border-black py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12">
            PRINCIPLES
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <AntiCard>
              <div className="h-3 bg-[#FF0000] border-b-4 border-black -mx-6 -mt-6 mb-4" />
              <div className="flex items-center gap-3 mb-3">
                <X className="w-6 h-6" strokeWidth={3} />
                <h3 className="text-xl md:text-2xl font-black uppercase">
                  NO CURVES
                </h3>
              </div>
              <p className="font-bold text-sm text-black/70">
                Every corner is sharp. Every edge is hard. Border-radius is forbidden.
              </p>
            </AntiCard>

            <AntiCard>
              <div className="h-3 bg-[#0000FF] border-b-4 border-black -mx-6 -mt-6 mb-4" />
              <div className="flex items-center gap-3 mb-3">
                <Bold className="w-6 h-6" strokeWidth={3} />
                <h3 className="text-xl md:text-2xl font-black uppercase">
                  THICK BORDERS
                </h3>
              </div>
              <p className="font-bold text-sm text-black/70">
                Minimum 4px black borders on everything. Thicker is louder. Louder is better.
              </p>
            </AntiCard>

            <AntiCard>
              <div className="h-3 bg-[#FF00FF] border-b-4 border-black -mx-6 -mt-6 mb-4" />
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6" strokeWidth={3} />
                <h3 className="text-xl md:text-2xl font-black uppercase">
                  CLASHING COLORS
                </h3>
              </div>
              <p className="font-bold text-sm text-black/70">
                High-saturation primaries only. Red next to blue next to yellow. Visual conflict is the goal.
              </p>
            </AntiCard>

            <AntiCard>
              <div className="h-3 bg-[#00FF00] border-b-4 border-black -mx-6 -mt-6 mb-4" />
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6" strokeWidth={3} />
                <h3 className="text-xl md:text-2xl font-black uppercase">
                  HARD SHADOWS
                </h3>
              </div>
              <p className="font-bold text-sm text-black/70">
                Only offset shadows with zero blur. Shadow-[8px_8px_0_#000]. Never soft. Never subtle.
              </p>
            </AntiCard>
          </div>
        </div>
      </section>

      {/* Component Showcase - Buttons & Inputs */}
      <section className="bg-[#FFFF00] border-b-4 border-black py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12 -rotate-1">
            COMPONENTS
          </h2>

          {/* Buttons */}
          <div className="mb-10">
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <Slash className="w-5 h-5" strokeWidth={3} />
              BUTTONS
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#FF0000] text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100">
                RED ACTION
              </button>
              <button className="px-6 py-3 bg-[#FFFF00] text-black font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100">
                YELLOW ALERT
              </button>
              <button className="px-6 py-3 bg-[#0000FF] text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100">
                BLUE FORCE
              </button>
              <button className="px-6 py-3 bg-[#FF00FF] text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100">
                MAGENTA PULSE
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div>
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <Slash className="w-5 h-5" strokeWidth={3} />
              INPUTS
            </h3>
            <div className="max-w-md space-y-4">
              <input
                type="text"
                placeholder="TYPE HERE..."
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#0000FF] focus:shadow-[4px_4px_0_#0000FF] transition-all duration-100"
              />
              <input
                type="text"
                placeholder="ANOTHER INPUT..."
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#FF0000] focus:shadow-[4px_4px_0_#FF0000] transition-all duration-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section - Blue bg */}
      <section className="bg-[#0000FF] border-b-4 border-black py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto text-white">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 rotate-1">
            RULES
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">
                DO THIS
              </h3>
              <ul className="space-y-3">
                <li className="text-lg font-black uppercase">
                  Border-4 on everything
                </li>
                <li className="text-sm font-bold">
                  Rounded-none. Always. Forever.
                </li>
                <li className="text-xl font-black uppercase">
                  High-saturation colors only
                </li>
                <li className="text-sm font-bold">
                  Hard offset shadows, zero blur
                </li>
                <li className="text-lg font-black uppercase">
                  Font-black uppercase
                </li>
                <li className="text-sm font-bold">
                  Rotate elements at odd angles
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 text-[#FF0000]">
                NEVER THIS
              </h3>
              <ul className="space-y-3">
                <li className="text-lg font-black uppercase line-through">
                  Rounded corners
                </li>
                <li className="text-sm font-bold line-through">
                  Soft or blurred shadows
                </li>
                <li className="text-xl font-black uppercase line-through">
                  Muted pastel colors
                </li>
                <li className="text-sm font-bold line-through">
                  Gradients
                </li>
                <li className="text-lg font-black uppercase line-through">
                  Backdrop blur
                </li>
                <li className="text-sm font-bold line-through">
                  {"\"Nice\" and \"harmonious\" design"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="bg-white border-b-4 border-black py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 md:mb-12">
            PALETTE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "BLACK", hex: "#000000", bg: "bg-black", text: "text-white" },
              { name: "WHITE", hex: "#FFFFFF", bg: "bg-white", text: "text-black" },
              { name: "RED", hex: "#FF0000", bg: "bg-[#FF0000]", text: "text-white" },
              { name: "BLUE", hex: "#0000FF", bg: "bg-[#0000FF]", text: "text-white" },
              { name: "YELLOW", hex: "#FFFF00", bg: "bg-[#FFFF00]", text: "text-black" },
              { name: "MAGENTA", hex: "#FF00FF", bg: "bg-[#FF00FF]", text: "text-white" },
              { name: "CYAN", hex: "#00FFFF", bg: "bg-[#00FFFF]", text: "text-black" },
              { name: "GREEN", hex: "#00FF00", bg: "bg-[#00FF00]", text: "text-black" },
            ].map((color) => (
              <div key={color.name} className="border-4 border-black shadow-[4px_4px_0_#000]">
                <div className={`h-20 md:h-28 ${color.bg}`} />
                <div className="p-3 border-t-4 border-black bg-white">
                  <p className="font-black text-sm">{color.name}</p>
                  <p className="font-bold text-xs text-black/60">{color.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-white px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-black text-sm uppercase text-white">
            ANTI-DESIGN STUDIO // BREAK EVERYTHING
          </p>
          <Link
            href="/styles/anti-design"
            className="font-black text-sm uppercase text-white border-4 border-white px-4 py-2 shadow-[4px_4px_0_#FF0000] hover:shadow-[6px_6px_0_#FF0000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-100"
          >
            VIEW DOCS
          </Link>
        </div>
      </footer>
    </div>
  );
}
