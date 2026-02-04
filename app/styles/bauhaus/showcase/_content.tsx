"use client";

import Link from "next/link";
import { ArrowLeft, Circle, Square, Triangle } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Red", hex: "#ff0000", bg: "bg-red-600" },
  { name: "Yellow", hex: "#ffcc00", bg: "bg-yellow-400" },
  { name: "Blue", hex: "#0000ff", bg: "bg-blue-600" },
  { name: "Black", hex: "#000000", bg: "bg-black" },
  { name: "White", hex: "#ffffff", bg: "bg-white", border: true },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Geometric shapes */}
      <div className="fixed top-20 right-20 w-48 h-48 bg-yellow-400 rounded-full pointer-events-none" />
      <div className="fixed bottom-20 right-40 w-32 h-32 bg-blue-600 pointer-events-none" />
      <div className="fixed top-40 right-60 w-0 h-0 border-l-[60px] border-l-transparent border-b-[100px] border-b-red-600 border-r-[60px] border-r-transparent pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b-4 border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/bauhaus"
            className="flex items-center gap-2 text-black hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider">Back to Docs</span>
          </Link>
          <span className="font-black text-xl text-black uppercase tracking-wider">
            BAUHAUS
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-black text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="BAU HAUS"
        description="Form follows function - 德国包豪斯学派的功能主义设计理念"
        className="relative z-10 pt-20 pb-16 px-6"
        titleClassName="text-7xl md:text-9xl font-black text-black uppercase leading-none mb-8 text-left max-w-2xl mx-auto"
        descriptionClassName="text-xl text-gray-700 max-w-md mb-10 text-left mx-auto"
      >
        <div className="max-w-2xl mx-auto flex flex-wrap gap-4">
          <button className="px-10 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
            Explore
          </button>
          <button className="px-10 py-4 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-black transition-colors">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="COLOR SYSTEM"
        subtitle="Primary colors only"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-4 border-black bg-white"
            labelClassName="font-bold text-sm text-black uppercase tracking-wider"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="BUTTONS"
        subtitle="Functional design"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border-4 border-black">
            <p className="text-sm font-bold text-black uppercase tracking-wider mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-black transition-colors">
                Primary
              </button>
              <button className="px-8 py-4 bg-yellow-400 text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                Secondary
              </button>
              <button className="px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-wider hover:bg-black transition-colors">
                Accent
              </button>
              <button className="px-8 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
                Dark
              </button>
              <button className="px-8 py-4 bg-white border-4 border-black text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                Outline
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="CARDS"
        subtitle="Geometric purity"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="relative p-8 bg-white border-4 border-black">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-600" />

            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
              <Circle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-2">
              Circle
            </h3>
            <p className="text-gray-700">
              Unity and wholeness
            </p>
          </div>

          <div className="relative p-8 bg-white border-4 border-black">
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-red-600" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full" />

            <div className="w-16 h-16 bg-blue-600 flex items-center justify-center mb-4">
              <Square className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-2">
              Square
            </h3>
            <p className="text-gray-700">
              Stability and order
            </p>
          </div>

          <div className="relative p-8 bg-white border-4 border-black">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-600 rounded-full" />
            <div className="absolute -bottom-4 -right-4 w-0 h-0 border-l-[20px] border-l-transparent border-b-[35px] border-b-red-600 border-r-[20px] border-r-transparent" />

            <div className="w-16 h-16 bg-yellow-400 flex items-center justify-center mb-4">
              <Triangle className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-black uppercase tracking-wider mb-2">
              Triangle
            </h3>
            <p className="text-gray-700">
              Dynamic energy
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="FORM"
        subtitle="Essential inputs"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-white border-4 border-black">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full" />
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-blue-600" />

            <h3 className="text-xl font-black text-black uppercase tracking-wider mb-6">Contact</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-medium placeholder-gray-400 focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Type here"
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-medium placeholder-gray-400 focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={3}
                  placeholder="Type here"
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-medium placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                />
              </div>
              <button className="w-full px-6 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-red-600 transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Grid Demo */}
      <ShowcaseSection
        title="GRID"
        subtitle="12-column system"
        className="relative z-10 py-16 px-6 bg-gray-50"
        titleClassName="text-3xl font-black text-black uppercase mb-4 text-center tracking-wider"
        subtitleClassName="text-gray-600 mb-10 text-center uppercase tracking-wider"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 h-16 bg-black flex items-center justify-center text-white font-bold uppercase tracking-wider">12</div>
            <div className="col-span-6 h-16 bg-red-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">6</div>
            <div className="col-span-6 h-16 bg-blue-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">6</div>
            <div className="col-span-4 h-16 bg-yellow-400 flex items-center justify-center text-black font-bold uppercase tracking-wider">4</div>
            <div className="col-span-4 h-16 bg-black flex items-center justify-center text-white font-bold uppercase tracking-wider">4</div>
            <div className="col-span-4 h-16 bg-red-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">4</div>
            <div className="col-span-3 h-16 bg-blue-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">3</div>
            <div className="col-span-3 h-16 bg-yellow-400 flex items-center justify-center text-black font-bold uppercase tracking-wider">3</div>
            <div className="col-span-3 h-16 bg-red-600 flex items-center justify-center text-white font-bold uppercase tracking-wider">3</div>
            <div className="col-span-3 h-16 bg-black flex items-center justify-center text-white font-bold uppercase tracking-wider">3</div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-4 border-black">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-sm font-bold uppercase tracking-wider">
            Bauhaus Showcase · Part of{" "}
            <Link href="/" className="text-black hover:text-red-600 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
