"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Library, Feather, GraduationCap } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Dark Brown", hex: "#3d2b1f", bg: "bg-[#3d2b1f]" },
  { name: "Ink Green", hex: "#2d4a3e", bg: "bg-[#2d4a3e]" },
  { name: "Dark Gold", hex: "#8b7355", bg: "bg-[#8b7355]" },
  { name: "Cream White", hex: "#f5f0e1", bg: "bg-[#f5f0e1]" },
  { name: "Deep Brown", hex: "#5c4033", bg: "bg-[#5c4033]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#f5f0e1] relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#8b7355]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/dark-academia"
            className="flex items-center gap-2 text-[#3d2b1f]/60 hover:text-[#3d2b1f] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif tracking-wide">Back to Docs</span>
          </Link>
          <span className="font-serif text-xl text-[#3d2b1f] tracking-wide">
            Dark Academia
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#8b7355]/30 text-[#3d2b1f]/70 font-serif rounded hover:border-[#8b7355]/60 hover:text-[#3d2b1f] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Dark Academia"
        description="Knowledge is the only flame that illuminates the darkness"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-serif text-[#3d2b1f] mb-6 tracking-wide"
        descriptionClassName="text-lg text-[#3d2b1f]/60 max-w-2xl mx-auto mb-10 font-serif italic"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 bg-[#3d2b1f] border border-[#8b7355]/60 text-[#f5f0e1] font-serif tracking-wide rounded shadow-sm hover:shadow-md transition-all duration-300">
            Read More
          </button>
          <button className="px-10 py-4 bg-transparent border border-[#3d2b1f]/30 text-[#3d2b1f] font-serif tracking-wide rounded hover:border-[#3d2b1f]/60 transition-all duration-300">
            Explore
          </button>
        </div>
      </ShowcaseHero>

      {/* Decorative divider */}
      <div className="relative z-10 max-w-md mx-auto">
        <hr className="border-0 h-px bg-gradient-to-r from-transparent via-[#8b7355] to-transparent" />
      </div>

      {/* Color Palette */}
      <ShowcaseSection
        title="配色系统"
        subtitle="Scholar's Palette"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#3d2b1f] mb-4 text-center tracking-wide"
        subtitleClassName="text-[#8b7355]/60 mb-10 text-center font-serif italic"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#8b7355]/20 bg-[#f5f0e1] rounded shadow-sm"
            labelClassName="font-serif text-sm text-[#3d2b1f]"
            hexClassName="text-xs text-[#8b7355] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="按钮"
        subtitle="Scholarly Controls"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#3d2b1f] mb-4 text-center tracking-wide"
        subtitleClassName="text-[#8b7355]/60 mb-10 text-center font-serif italic"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/50 border border-[#8b7355]/20 rounded shadow-sm">
            <p className="text-sm font-serif text-[#8b7355] tracking-wide mb-6">Styles</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#3d2b1f] border border-[#8b7355]/60 text-[#f5f0e1] font-serif tracking-wide rounded shadow-sm hover:shadow-md transition-all">
                Primary
              </button>
              <button className="px-6 py-3 bg-[#2d4a3e] border border-[#2d4a3e]/60 text-[#f5f0e1] font-serif tracking-wide rounded shadow-sm hover:shadow-md transition-all">
                Secondary
              </button>
              <button className="px-6 py-3 bg-transparent border border-[#3d2b1f]/30 text-[#3d2b1f] font-serif tracking-wide rounded hover:border-[#3d2b1f]/60 transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-transparent text-[#8b7355] font-serif tracking-wide rounded hover:text-[#3d2b1f] transition-all">
                Ghost
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="卡片"
        subtitle="Library Collection"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#3d2b1f] mb-4 text-center tracking-wide"
        subtitleClassName="text-[#8b7355]/60 mb-10 text-center font-serif italic"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/60 border border-[#8b7355]/20 rounded shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-[#3d2b1f] rounded flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-[#f5f0e1]" />
            </div>
            <h3 className="text-xl font-serif text-[#3d2b1f] mb-2 tracking-wide">
              Literature
            </h3>
            <p className="text-[#3d2b1f]/60 font-serif leading-relaxed">Classical texts and forgotten wisdom</p>
          </div>

          <div className="p-6 bg-[#3d2b1f] border border-[#8b7355]/40 rounded shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-[#2d4a3e] rounded flex items-center justify-center mb-4">
              <Library className="w-8 h-8 text-[#f5f0e1]" />
            </div>
            <h3 className="text-xl font-serif text-[#f5f0e1] mb-2 tracking-wide">
              Archive
            </h3>
            <p className="text-[#f5f0e1]/60 font-serif leading-relaxed">Ancient manuscripts and rare editions</p>
          </div>

          <div className="p-6 bg-[#2d4a3e] border border-[#2d4a3e]/40 rounded shadow-sm hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-[#3d2b1f] rounded flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-[#f5f0e1]" />
            </div>
            <h3 className="text-xl font-serif text-[#f5f0e1] mb-2 tracking-wide">
              Academy
            </h3>
            <p className="text-[#f5f0e1]/60 font-serif leading-relaxed">Halls of learning and contemplation</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="表单"
        subtitle="Scholar's Desk"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#3d2b1f] mb-4 text-center tracking-wide"
        subtitleClassName="text-[#8b7355]/60 mb-10 text-center font-serif italic"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/50 border border-[#8b7355]/20 rounded shadow-sm">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-[#3d2b1f] rounded flex items-center justify-center mb-4">
                <Feather className="w-10 h-10 text-[#f5f0e1]" />
              </div>
              <h3 className="text-xl font-serif text-[#3d2b1f] tracking-wide">Correspondence</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-[#3d2b1f]/70 tracking-wide mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name..."
                  className="w-full px-4 py-3 bg-[#f5f0e1]/80 border border-[#8b7355]/30 text-[#3d2b1f] placeholder-[#8b7355]/50 font-serif rounded focus:border-[#8b7355] focus:shadow-[0_0_8px_rgba(139,115,85,0.2)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-[#3d2b1f]/70 tracking-wide mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Topic of inquiry..."
                  className="w-full px-4 py-3 bg-[#f5f0e1]/80 border border-[#8b7355]/30 text-[#3d2b1f] placeholder-[#8b7355]/50 font-serif rounded focus:border-[#8b7355] focus:shadow-[0_0_8px_rgba(139,115,85,0.2)] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#3d2b1f] border border-[#8b7355]/60 text-[#f5f0e1] font-serif tracking-wide rounded shadow-sm hover:shadow-md transition-all">
                Send
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#8b7355]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#3d2b1f]/40 text-sm font-serif">
            Dark Academia Showcase · Part of{" "}
            <Link href="/" className="text-[#3d2b1f]/60 hover:text-[#3d2b1f] transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
