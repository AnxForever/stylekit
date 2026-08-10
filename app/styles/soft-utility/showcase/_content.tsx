"use client";

import Link from "next/link";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Primary", hex: "#2d5b63", bg: "bg-[#2d5b63]" },
  { name: "Secondary", hex: "#f4f8f6", bg: "bg-[#f4f8f6]" },
  { name: "Accent", hex: "#a9d8cc", bg: "bg-[#a9d8cc]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f4f8f6", color: "#0f172a" }}>
      {/* Navigation */}
      <nav className="px-6 py-4 border-b" style={{ borderColor: "#2d5b6320" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/styles/soft-utility" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Back
          </Link>
          <span className="font-semibold">Soft Utility</span>
          <Link href="/styles" className="text-sm font-medium hover:opacity-70 transition-opacity">
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Soft Utility</h1>
        <p className="text-lg opacity-70 max-w-xl mx-auto">
          面向高频使用的手机工具 App，使用浅色背景、清晰状态色和柔和层级，在效率与亲和力之间取得平衡。
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
            style={{ backgroundColor: "#2d5b63", color: "#f8fafc" }}
          >
            Primary
          </button>
          <button
            className="px-6 py-3 rounded-lg font-medium border transition-all"
            style={{ borderColor: "#2d5b63", color: "#0f172a" }}
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
          <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: "#f4f8f6", border: "1px solid #2d5b6320" }}>
            <h3 className="text-lg font-semibold mb-2">Sample Card</h3>
            <p className="text-sm opacity-60">A basic card component in the Soft Utility style.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: "#f4f8f6", border: "1px solid #2d5b6320" }}>
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
            style={{ backgroundColor: "#f4f8f6", border: "1px solid #2d5b6340", color: "#0f172a" }}
          />
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-10 px-6 border-t" style={{ borderColor: "#2d5b6320" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs opacity-40">
            Soft Utility Showcase &middot; Part of{" "}
            <Link href="/" className="hover:opacity-70 transition-opacity">StyleKit</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
