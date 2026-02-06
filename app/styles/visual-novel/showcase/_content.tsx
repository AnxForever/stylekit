"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, MessageSquare, Heart, Sparkles } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Slate", hex: "#4a5568", bg: "bg-[#4a5568]" },
  { name: "Light BG", hex: "#f7fafc", bg: "bg-[#f7fafc]" },
  { name: "Indigo", hex: "#6366f1", bg: "bg-[#6366f1]" },
  { name: "Pink", hex: "#ec4899", bg: "bg-[#ec4899]" },
  { name: "Emerald", hex: "#10b981", bg: "bg-[#10b981]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0e7ff] to-[#f7fafc] relative overflow-hidden">
      {/* Decorative soft shapes */}
      <div className="fixed top-20 right-20 w-64 h-64 rounded-full bg-[#6366f1]/5 pointer-events-none blur-3xl" />
      <div className="fixed bottom-20 left-10 w-48 h-48 rounded-full bg-[#ec4899]/5 pointer-events-none blur-3xl" />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#4a5568]/10 bg-white/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/visual-novel"
            className="flex items-center gap-2 text-[#6366f1] hover:text-[#6366f1]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-medium">Back to Docs</span>
          </Link>
          <span className="font-serif font-medium text-xl text-[#4a5568]">
            Visual Novel
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#4a5568]/20 text-[#4a5568] font-sans font-medium rounded-lg shadow-sm hover:shadow-md hover:border-[#6366f1]/30 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Visual Novel"
        description="Where every choice shapes the story"
        className="relative z-10 pt-20 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-serif font-medium text-[#4a5568] mb-2"
        descriptionClassName="text-lg text-[#4a5568]/50 font-sans max-w-2xl mx-auto mb-10"
      >
        <div className="relative inline-block mb-6">
          <span className="text-2xl md:text-4xl font-serif text-[#6366f1]/60 italic">
            Chapter 1: The Beginning
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button className="px-10 py-4 bg-[#6366f1] text-white font-sans font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            Start Story
          </button>
          <button className="px-10 py-4 bg-white/80 text-[#4a5568] font-sans font-medium rounded-lg border border-[#4a5568]/20 backdrop-blur-sm hover:bg-[#6366f1]/10 hover:border-[#6366f1]/30 transition-all duration-300">
            Continue
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Story Tones"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-medium text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#4a5568]/10 bg-white/70 rounded-lg backdrop-blur-sm shadow-sm"
            labelClassName="font-sans font-medium text-sm text-[#4a5568]"
            hexClassName="text-xs text-[#6366f1] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Choices"
        subtitle="Interactive Decisions"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-medium text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/70 border border-[#4a5568]/10 rounded-lg backdrop-blur-md shadow-sm">
            <p className="text-sm font-sans text-[#6366f1] mb-6">Button Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#6366f1] text-white font-sans font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                Primary
              </button>
              <button className="px-6 py-3 bg-white/80 text-[#4a5568] font-sans font-medium rounded-lg border border-[#4a5568]/20 backdrop-blur-sm hover:bg-[#6366f1]/10 transition-all duration-300">
                Secondary
              </button>
              <button className="px-6 py-3 bg-[#ec4899] text-white font-sans font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                Affection
              </button>
              <button className="px-6 py-3 bg-[#10b981] text-white font-sans font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                Trust
              </button>
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-xs font-sans text-[#4a5568]/40 mb-3">Choice Buttons</p>
              <button className="w-full px-6 py-3 bg-white/60 text-[#4a5568] font-sans rounded-lg border border-[#6366f1]/30 backdrop-blur-sm hover:bg-[#6366f1]/10 hover:border-[#6366f1]/50 text-left transition-all duration-300">
                Go to the rooftop to watch the sunset
              </button>
              <button className="w-full px-6 py-3 bg-white/60 text-[#4a5568] font-sans rounded-lg border border-[#6366f1]/30 backdrop-blur-sm hover:bg-[#6366f1]/10 hover:border-[#6366f1]/50 text-left transition-all duration-300">
                Stay in the classroom and study
              </button>
              <button className="w-full px-6 py-3 bg-white/60 text-[#4a5568] font-sans rounded-lg border border-[#6366f1]/30 backdrop-blur-sm hover:bg-[#6366f1]/10 hover:border-[#6366f1]/50 text-left transition-all duration-300">
                Visit the old library
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Panels"
        subtitle="Story Elements"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-medium text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/70 border border-[#4a5568]/10 rounded-lg backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#6366f1]/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-[#6366f1]" />
            </div>
            <h3 className="text-xl font-serif font-medium text-[#4a5568] mb-2">
              Narrative
            </h3>
            <p className="text-[#4a5568]/50 font-sans text-sm leading-relaxed">Rich storytelling with branching paths</p>
          </div>

          <div className="p-6 bg-[#1a202c]/80 border border-[#6366f1]/20 rounded-lg backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#ec4899]/10 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-7 h-7 text-[#ec4899]" />
            </div>
            <h3 className="text-xl font-serif font-medium text-white mb-2">
              Dialog
            </h3>
            <p className="text-white/50 font-sans text-sm leading-relaxed">Character conversations that matter</p>
          </div>

          <div className="p-6 bg-white/90 border border-[#ec4899]/20 rounded-lg backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-[#10b981]/10 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-[#10b981]" />
            </div>
            <h3 className="text-xl font-serif font-medium text-[#4a5568] mb-2 italic">
              Romance
            </h3>
            <p className="text-[#4a5568]/50 font-sans text-sm leading-relaxed">Every choice affects relationships</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Dialog Demo */}
      <ShowcaseSection
        title="Dialog Box"
        subtitle="Character Interaction"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-medium text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#1a202c]/80 backdrop-blur-md rounded-lg p-8 border border-[#6366f1]/20">
            <p className="text-sm text-[#6366f1] font-sans mb-1">Sakura</p>
            <p className="text-white/90 font-serif text-lg leading-relaxed">
              &ldquo;The cherry blossoms are beautiful this time of year, aren&apos;t they? I always feel a little nostalgic when spring arrives...&rdquo;
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 px-6 py-3 bg-white/60 backdrop-blur-sm text-[#4a5568] font-sans rounded-lg border border-[#6366f1]/30 hover:bg-[#6366f1]/10 hover:border-[#6366f1]/50 transition-all duration-300">
              &ldquo;They remind me of our first meeting.&rdquo;
            </button>
            <button className="flex-1 px-6 py-3 bg-white/60 backdrop-blur-sm text-[#4a5568] font-sans rounded-lg border border-[#ec4899]/30 hover:bg-[#ec4899]/10 hover:border-[#ec4899]/50 transition-all duration-300">
              &ldquo;Let&apos;s make new memories together.&rdquo;
            </button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form */}
      <ShowcaseSection
        title="Character Creation"
        subtitle="Enter Your Story"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif font-medium text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/70 border border-[#4a5568]/10 rounded-lg backdrop-blur-md shadow-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-[#6366f1]/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[#6366f1]" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[#4a5568]">New Game</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-[#6366f1] mb-2">Character Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-white/70 border border-[#4a5568]/20 rounded-lg text-[#4a5568] placeholder-[#4a5568]/40 font-sans backdrop-blur-sm focus:border-[#6366f1]/50 focus:shadow-[0_0_12px_#6366f120] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-[#ec4899] mb-2">Difficulty</label>
                <input
                  type="text"
                  placeholder="Normal"
                  className="w-full px-4 py-3 bg-white/70 border border-[#4a5568]/20 rounded-lg text-[#4a5568] placeholder-[#4a5568]/40 font-sans backdrop-blur-sm focus:border-[#ec4899]/50 focus:shadow-[0_0_12px_#ec489920] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#6366f1] text-white font-sans font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                Begin Story
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#4a5568]/10 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#4a5568]/40 text-sm font-sans">
            Visual Novel Showcase - Part of{" "}
            <Link href="/" className="text-[#6366f1] hover:text-[#6366f1]/80 transition-colors">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
