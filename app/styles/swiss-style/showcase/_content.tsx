"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Black", hex: "#000000", bg: "bg-black" },
  { name: "White", hex: "#ffffff", bg: "bg-white" },
  { name: "Red", hex: "#ff0000", bg: "bg-red-600" },
  { name: "Blue", hex: "#0057b8", bg: "bg-[#0057b8]" },
  { name: "Yellow", hex: "#ffcc00", bg: "bg-[#ffcc00]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-8 py-4 border-b border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/swiss-style"
            className="flex items-center gap-2 text-black hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm uppercase tracking-[0.15em]">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl uppercase tracking-[0.2em]">
            Swiss
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-black text-white text-xs uppercase tracking-[0.15em] hover:bg-red-600 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Swiss Design"
        description="The grid is the foundation. Typography is the voice. Clarity is the goal."
        className="pt-24 pb-20 px-8"
        titleClassName="text-7xl md:text-9xl font-bold text-black leading-none mb-8"
        descriptionClassName="text-xl text-gray-700 max-w-md mb-12"
      >
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4">
              International Style
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-600 transition-colors">
                Explore
              </button>
              <button className="px-8 py-4 border-2 border-black text-black text-sm font-medium uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="col-span-4 flex items-center justify-center">
            <div className="w-24 h-24 bg-red-600" />
          </div>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Colors"
        subtitle="Primary palette"
        className="py-20 px-8 bg-gray-50"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-l-4 border-black"
            labelClassName="font-bold text-sm text-black uppercase tracking-wider"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="Helvetica system"
        className="py-20 px-8"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <div className="space-y-8">
              <div className="border-l-4 border-black pl-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Heading 1</p>
                <h1 className="text-6xl font-bold text-black leading-none">Helvetica</h1>
              </div>
              <div className="border-l-4 border-black pl-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Heading 2</p>
                <h2 className="text-4xl font-bold text-black">Rational Design</h2>
              </div>
              <div className="border-l-4 border-black pl-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Body</p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Swiss design emerged in the 1950s from Switzerland, emphasizing cleanliness, readability, and objectivity.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="bg-black text-white p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Label</p>
              <p className="text-xs uppercase tracking-[0.2em] mb-2">Category</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Subcategory</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Action elements"
        className="py-20 px-8 bg-gray-50"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border-l-4 border-black">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-600 transition-colors">
                Primary
              </button>
              <button className="px-6 py-3 border-2 border-black text-black text-sm font-medium uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">
                Secondary
              </button>
              <button className="px-6 py-3 bg-red-600 text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-red-700 transition-colors">
                Accent
              </button>
              <button className="px-6 py-3 text-black text-sm font-medium uppercase tracking-[0.2em] hover:text-red-600 transition-colors">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Grid System */}
      <ShowcaseSection
        title="Grid"
        subtitle="12-column system"
        className="py-20 px-8"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-4 mb-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-500">{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 h-32 bg-black flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-wider">4 cols</span>
            </div>
            <div className="col-span-6 h-32 bg-red-600 flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-wider">6 cols</span>
            </div>
            <div className="col-span-2 h-32 bg-gray-800 flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-wider">2</span>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Content blocks"
        className="py-20 px-8 bg-gray-50"
        titleClassName="text-4xl font-bold text-black mb-2"
        subtitleClassName="text-xs uppercase tracking-[0.3em] text-gray-500 mb-12"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white border-l-4 border-black p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">01</p>
            <h3 className="text-2xl font-bold text-black mb-4">Clarity</h3>
            <p className="text-gray-700 leading-relaxed">Design serves content. Every element has purpose.</p>
          </div>
          <div className="bg-white border-l-4 border-red-600 p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">02</p>
            <h3 className="text-2xl font-bold text-black mb-4">Grid</h3>
            <p className="text-gray-700 leading-relaxed">Mathematical precision creates visual harmony.</p>
          </div>
          <div className="bg-white border-l-4 border-black p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">03</p>
            <h3 className="text-2xl font-bold text-black mb-4">Typography</h3>
            <p className="text-gray-700 leading-relaxed">Sans-serif fonts communicate with objectivity.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Swiss International Showcase
          </p>
          <Link href="/" className="text-xs uppercase tracking-[0.2em] text-black hover:text-red-600 transition-colors">
            StyleKit
          </Link>
        </div>
      </footer>
    </div>
  );
}
