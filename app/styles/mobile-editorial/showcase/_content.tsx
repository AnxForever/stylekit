"use client";

import Link from "next/link";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Primary", hex: "#24211f", bg: "bg-[#24211f]" },
  { name: "Secondary", hex: "#fffdf8", bg: "bg-[#fffdf8]" },
  { name: "Accent", hex: "#e97b61", bg: "bg-[#e97b61]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fffdf8", color: "#0f172a" }}>
      {/* Navigation */}
      <nav className="px-6 py-4 border-b" style={{ borderColor: "#24211f20" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/styles/mobile-editorial" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Back
          </Link>
          <span className="font-semibold">Mobile Editorial</span>
          <Link href="/styles" className="text-sm font-medium hover:opacity-70 transition-opacity">
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Mobile Editorial</h1>
        <p className="text-lg opacity-70 max-w-xl mx-auto">
          把杂志排版的节奏压缩进手机屏幕，用衬线标题、暖纸张背景和模块化内容卡片打造有内容感的 App。
        </p>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold mb-8"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid colors={colors} />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold mb-8"
      >
        <div className="max-w-4xl mx-auto flex flex-wrap gap-4">
          <button
            className="px-6 py-3 rounded-lg font-medium transition-all"
            style={{ backgroundColor: "#24211f", color: "#f8fafc" }}
          >
            Primary
          </button>
          <button
            className="px-6 py-3 rounded-lg font-medium border transition-all"
            style={{ borderColor: "#24211f", color: "#0f172a" }}
          >
            Outline
          </button>
        </div>
      </ShowcaseSection>

      {/* Card */}
      <ShowcaseSection
        title="Cards"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold mb-8"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: "#fffdf8", border: "1px solid #24211f20" }}>
            <h3 className="text-lg font-semibold mb-2">Sample Card</h3>
            <p className="text-sm opacity-60">A basic card component in the Mobile Editorial style.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: "#fffdf8", border: "1px solid #24211f20" }}>
            <h3 className="text-lg font-semibold mb-2">Another Card</h3>
            <p className="text-sm opacity-60">Demonstrating consistent styling across components.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Input */}
      <ShowcaseSection
        title="Inputs"
        className="py-16 px-6"
        titleClassName="text-2xl font-bold mb-8"
      >
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Type something..."
            className="w-full px-4 py-3 rounded-lg font-normal focus:outline-none transition-all"
            style={{ backgroundColor: "#fffdf8", border: "1px solid #24211f40", color: "#0f172a" }}
          />
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: "#24211f20" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs opacity-40">
            Mobile Editorial Showcase &middot; Part of{" "}
            <Link href="/" className="hover:opacity-70 transition-opacity">StyleKit</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
