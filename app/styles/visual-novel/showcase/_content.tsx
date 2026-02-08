"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Heart, ChevronRight, Users, Bookmark } from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Dark Panel", hex: "#1a202c", bg: "bg-[#1a202c]" },
  { name: "Indigo", hex: "#6366f1", bg: "bg-[#6366f1]" },
  { name: "Pink", hex: "#ec4899", bg: "bg-[#ec4899]" },
  { name: "Emerald", hex: "#10b981", bg: "bg-[#10b981]" },
  { name: "Light BG", hex: "#f7fafc", bg: "bg-[#f7fafc]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0e7ff] to-[#f7fafc] relative overflow-hidden">
      {/* Atmospheric soft shapes */}
      <div className="fixed top-20 right-20 w-72 h-72 rounded-full bg-[#6366f1]/[0.04] pointer-events-none blur-3xl" />
      <div className="fixed bottom-32 left-10 w-56 h-56 rounded-full bg-[#ec4899]/[0.04] pointer-events-none blur-3xl" />
      <div className="fixed top-1/2 left-1/3 w-40 h-40 rounded-full bg-[#10b981]/[0.03] pointer-events-none blur-3xl" />

      {/* Navigation - minimal, transparent */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#4a5568]/[0.08] bg-white/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/visual-novel"
            className="flex items-center gap-2 text-[#6366f1] hover:text-[#6366f1]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-medium text-sm">Back</span>
          </Link>
          <span className="font-serif text-lg text-[#4a5568]">
            Visual Novel
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#4a5568]/15 text-[#4a5568] font-sans text-sm font-medium rounded-lg hover:border-[#6366f1]/30 hover:text-[#6366f1] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero - ADV-format scene with dialogue panel overlay */}
      <section className="relative z-10 min-h-[85vh] flex flex-col">
        {/* Scene background area */}
        <div
          className="flex-1 relative flex items-center justify-center px-6 pt-12"
          style={{
            background: "linear-gradient(180deg, #4a6fa5 0%, #7b9cc7 40%, #c4a882 70%, #e8c19a 100%)",
          }}
        >
          {/* Character silhouette positions */}
          <div className="absolute bottom-0 left-[15%] w-40 h-72 bg-[#2d3748]/10 rounded-t-full" />
          <div className="absolute bottom-0 right-[18%] w-36 h-64 bg-[#2d3748]/[0.06] rounded-t-full" />

          {/* Title floating in sky */}
          <div className="text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-serif text-white/90 mb-3 drop-shadow-sm">
              Visual Novel
            </h1>
            <p className="text-white/50 font-sans text-sm tracking-[0.3em] uppercase">
              Interactive Storytelling
            </p>
          </div>
        </div>

        {/* ADV-format dialogue panel at bottom */}
        <div className="relative bg-[#1a202c]/90 backdrop-blur-md border-t border-[#6366f1]/20 px-6 py-6">
          {/* Ornate corner decorations */}
          <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#6366f1]/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#6366f1]/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#6366f1]/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#6366f1]/40" />

          <div className="max-w-4xl mx-auto">
            {/* Character nameplate */}
            <div className="inline-block px-4 py-1 bg-[#6366f1] rounded-sm mb-3">
              <span className="text-white text-sm font-sans font-semibold">Narrator</span>
            </div>
            <p className="text-white/85 font-serif text-lg leading-relaxed mb-4">
              &ldquo;The story begins on a quiet spring morning. Cherry blossoms drift past the classroom window as the bell rings for a new semester...&rdquo;
            </p>
            {/* Text advance indicator */}
            <div className="flex justify-end">
              <ChevronRight className="w-5 h-5 text-[#6366f1]/60 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Choice buttons section - VN-style centered choices */}
      <ShowcaseSection
        title="Choices"
        subtitle="Branch Your Fate"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans text-sm mb-10 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-3">
          {[
            { text: "Go to the rooftop to watch the sunset", color: "#6366f1" },
            { text: "Stay in the classroom and study together", color: "#6366f1" },
            { text: "Visit the old library behind the school", color: "#ec4899" },
          ].map((choice, i) => (
            <button
              key={i}
              className="w-full px-6 py-4 bg-white/50 backdrop-blur-sm text-[#4a5568] font-sans rounded-lg border text-left hover:bg-[#6366f1]/10 transition-all duration-300 flex items-center justify-between group"
              style={{ borderColor: `${choice.color}25` }}
            >
              <span>{choice.text}</span>
              <ChevronRight className="w-4 h-4 text-[#6366f1]/30 group-hover:text-[#6366f1]/60 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </ShowcaseSection>

      {/* Dialog panels showcase - dark and light variants with nameplates */}
      <ShowcaseSection
        title="Dialog Panels"
        subtitle="Character Interactions"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans text-sm mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Dark dialog panel with nameplate */}
          <div className="relative">
            <div className="absolute -top-3 left-6 inline-block px-4 py-1 bg-[#6366f1] rounded-sm z-10">
              <span className="text-white text-xs font-sans font-semibold">Sakura</span>
            </div>
            <div className="bg-[#1a202c]/85 backdrop-blur-md rounded-lg p-6 pt-8 border border-[#6366f1]/20 relative">
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-[#6366f1]/30" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-[#6366f1]/30" />
              <p className="text-white/85 font-serif text-base leading-relaxed">
                &ldquo;The cherry blossoms are beautiful this time of year, aren&apos;t they? I always feel a little nostalgic when spring arrives...&rdquo;
              </p>
            </div>
          </div>

          {/* Light dialog panel with nameplate */}
          <div className="relative">
            <div className="absolute -top-3 left-6 inline-block px-4 py-1 bg-[#10b981] rounded-sm z-10">
              <span className="text-white text-xs font-sans font-semibold">Kaito</span>
            </div>
            <div className="bg-white/70 backdrop-blur-md rounded-lg p-6 pt-8 border border-[#10b981]/20 relative">
              <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-[#10b981]/30" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-[#10b981]/30" />
              <p className="text-[#4a5568] font-serif text-base leading-relaxed">
                &ldquo;Yeah... it feels like yesterday when we first met under that old tree. Time moves so fast.&rdquo;
              </p>
            </div>
          </div>

          {/* Narrator panel (italic, no nameplate) */}
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-[#4a5568]/10">
            <p className="text-[#4a5568]/70 font-serif text-base leading-relaxed italic">
              A warm breeze carries the scent of cherry blossoms through the air. Somewhere in the distance, the school bell chimes softly.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Color palette */}
      <ShowcaseSection
        title="Story Palette"
        subtitle="Emotional Tones"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans text-sm mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#4a5568]/10 bg-white/60 rounded-lg backdrop-blur-sm"
            labelClassName="font-sans font-medium text-sm text-[#4a5568]"
            hexClassName="text-xs text-[#6366f1] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Cards as character/chapter panels with nameplate badges */}
      <ShowcaseSection
        title="Scene Cards"
        subtitle="Story Elements"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans text-sm mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Card with nameplate badge */}
          <div className="relative bg-white/70 backdrop-blur-md rounded-lg border border-[#6366f1]/15 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="h-28 bg-gradient-to-br from-[#6366f1]/20 to-[#6366f1]/5 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-[#6366f1]/40" />
            </div>
            {/* Nameplate badge */}
            <div className="absolute top-[6.5rem] left-4 inline-block px-3 py-0.5 bg-[#6366f1] rounded-sm">
              <span className="text-white text-xs font-sans font-semibold">Chapter 1</span>
            </div>
            <div className="p-5 pt-6">
              <h3 className="text-lg font-serif text-[#4a5568] mb-2">
                The Beginning
              </h3>
              <p className="text-[#4a5568]/50 font-sans text-sm leading-relaxed">A new semester starts with unexpected encounters and fated meetings.</p>
            </div>
          </div>

          <div className="relative bg-[#1a202c]/85 backdrop-blur-md rounded-lg border border-[#ec4899]/15 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="h-28 bg-gradient-to-br from-[#ec4899]/15 to-[#ec4899]/5 flex items-center justify-center">
              <Heart className="w-10 h-10 text-[#ec4899]/40" />
            </div>
            <div className="absolute top-[6.5rem] left-4 inline-block px-3 py-0.5 bg-[#ec4899] rounded-sm">
              <span className="text-white text-xs font-sans font-semibold">Chapter 2</span>
            </div>
            <div className="p-5 pt-6">
              <h3 className="text-lg font-serif text-white mb-2">
                Growing Closer
              </h3>
              <p className="text-white/50 font-sans text-sm leading-relaxed">As seasons change, bonds deepen through shared moments and quiet conversations.</p>
            </div>
          </div>

          <div className="relative bg-white/80 backdrop-blur-md rounded-lg border border-[#10b981]/15 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="h-28 bg-gradient-to-br from-[#10b981]/15 to-[#10b981]/5 flex items-center justify-center">
              <Users className="w-10 h-10 text-[#10b981]/40" />
            </div>
            <div className="absolute top-[6.5rem] left-4 inline-block px-3 py-0.5 bg-[#10b981] rounded-sm">
              <span className="text-white text-xs font-sans font-semibold">Chapter 3</span>
            </div>
            <div className="p-5 pt-6">
              <h3 className="text-lg font-serif text-[#4a5568] mb-2">
                Crossroads
              </h3>
              <p className="text-[#4a5568]/50 font-sans text-sm leading-relaxed">Every choice leads to a different future. Which path will you take?</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons and inputs - within a "New Game" save screen layout */}
      <ShowcaseSection
        title="Save Screen"
        subtitle="Enter Your Story"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-serif text-[#4a5568] mb-4 text-center"
        subtitleClassName="text-[#4a5568]/40 font-sans text-sm mb-10 text-center"
      >
        <div className="max-w-lg mx-auto">
          <div className="bg-[#1a202c]/85 backdrop-blur-md rounded-lg p-8 border border-[#6366f1]/20 relative">
            {/* Ornate corners */}
            <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-[#6366f1]/30" />
            <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-[#6366f1]/30" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-[#6366f1]/30" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-[#6366f1]/30" />

            <div className="text-center mb-6">
              <Bookmark className="w-8 h-8 text-[#6366f1] mx-auto mb-3" />
              <h3 className="text-xl font-serif text-white">New Game</h3>
              <p className="text-white/30 font-sans text-xs mt-1">Create your story</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-[#6366f1] mb-2">Character Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-white/[0.06] border border-[#6366f1]/20 rounded-lg text-white placeholder-white/25 font-sans backdrop-blur-sm focus:border-[#6366f1]/50 focus:shadow-[0_0_12px_#6366f120] focus:outline-none transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-[#ec4899] mb-2">Difficulty</label>
                <input
                  type="text"
                  placeholder="Normal"
                  className="w-full px-4 py-3 bg-white/[0.06] border border-[#ec4899]/20 rounded-lg text-white placeholder-white/25 font-sans backdrop-blur-sm focus:border-[#ec4899]/50 focus:shadow-[0_0_12px_#ec489920] focus:outline-none transition-all duration-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="px-6 py-3 bg-[#6366f1] text-white font-sans font-medium rounded-lg hover:bg-[#6366f1]/90 hover:shadow-[0_0_15px_#6366f130] transition-all duration-300">
                  Begin Story
                </button>
                <button className="px-6 py-3 bg-white/[0.06] text-white/70 font-sans font-medium rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                  Load Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#4a5568]/[0.08] bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-[#4a5568]/35 text-sm font-sans">
            Visual Novel Showcase
          </p>
          <Link href="/" className="text-[#6366f1]/50 hover:text-[#6366f1]/80 transition-colors font-sans text-sm">
            StyleKit
          </Link>
        </div>
      </footer>
    </div>
  );
}

