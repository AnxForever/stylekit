"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Heart,
  Star,
  Lightbulb,
  BookOpen,
  PenTool,
  Eraser,
  Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Ink Black", hex: "#2c2c2c", bg: "bg-[#2c2c2c]" },
  { name: "Red Marker", hex: "#ff6b6b", bg: "bg-[#ff6b6b]" },
  { name: "Teal Marker", hex: "#4ecdc4", bg: "bg-[#4ecdc4]" },
  { name: "Yellow Marker", hex: "#ffd93d", bg: "bg-[#ffd93d]" },
  { name: "Paper", hex: "#fffef5", bg: "bg-[#fffef5]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#fffef5] relative overflow-hidden">
      {/* Notebook lined paper background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(transparent, transparent 31px, rgba(168, 200, 232, 0.3) 31px, rgba(168, 200, 232, 0.3) 32px)
          `,
        }}
      />

      {/* Red margin line */}
      <div className="fixed top-0 bottom-0 left-[80px] md:left-[120px] w-px bg-[#ff6b6b]/15 pointer-events-none" />

      {/* Spiral binding holes */}
      <div className="fixed top-0 bottom-0 left-4 md:left-10 flex flex-col gap-[60px] pt-8 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full border-2 border-[#2c2c2c]/10"
          />
        ))}
      </div>

      {/* Floating doodle scribbles */}
      <svg
        className="fixed top-20 right-16 w-24 h-24 pointer-events-none opacity-10"
        viewBox="0 0 100 100"
      >
        <path
          d="M20,50 Q30,20 50,50 Q70,80 80,50"
          stroke="#4ecdc4"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="fixed bottom-32 right-24 w-16 h-16 pointer-events-none opacity-10"
        viewBox="0 0 100 100"
      >
        <path
          d="M50,15 L58,40 L85,40 L63,55 L71,80 L50,65 L29,80 L37,55 L15,40 L42,40 Z"
          stroke="#ffd93d"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>

      {/* Navigation - casual, hand-drawn feel */}
      <nav className="relative z-10 px-6 py-4 border-b-2 border-dashed border-[#2c2c2c]/15">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/hand-drawn-doodle"
            className="flex items-center gap-2 text-[#ff6b6b] hover:text-[#ff6b6b]/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-sans font-bold text-sm">Back</span>
          </Link>
          <span className="font-sans font-black text-lg text-[#2c2c2c] rotate-[-1.5deg] inline-block">
            Doodle Book
          </span>
          <Link
            href="/styles"
            className="px-4 py-2 border-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] font-sans font-semibold rounded-sm shadow-[2px_2px_0px_#4ecdc4] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#4ecdc4] hover:rotate-[-0.5deg] transition-all text-sm"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero - Sketchbook page with annotations */}
      <section className="relative z-10 pt-16 pb-12 px-6">
        <div className="max-w-5xl mx-auto relative">
          {/* "Page 1" annotation */}
          <div className="absolute top-0 right-4 font-sans text-[#2c2c2c]/20 text-sm rotate-[2deg]">
            pg. 1
          </div>

          {/* Title with hand-drawn feel */}
          <div className="mb-6 ml-4 md:ml-16">
            <h1 className="text-6xl md:text-8xl font-sans font-black text-[#2c2c2c] rotate-[-1.5deg] inline-block mb-2">
              Doodle
            </h1>
            <div className="ml-12 md:ml-24">
              <span className="text-4xl md:text-6xl font-sans font-black text-[#ff6b6b] rotate-[1deg] inline-block">
                & Sketch
              </span>
            </div>
          </div>

          {/* Wavy underline SVG */}
          <svg
            className="w-64 md:w-96 h-4 ml-4 md:ml-16 mb-6"
            viewBox="0 0 400 16"
          >
            <path
              d="M0,8 Q25,2 50,8 Q75,14 100,8 Q125,2 150,8 Q175,14 200,8 Q225,2 250,8 Q275,14 300,8 Q325,2 350,8 Q375,14 400,8"
              stroke="#ff6b6b"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
            />
          </svg>

          <p className="text-[#2c2c2c]/45 font-sans text-lg ml-4 md:ml-16 max-w-xl mb-10">
            Hand-crafted interfaces with creative charm -- sketched with love
            and a touch of whimsy
          </p>

          {/* CTA buttons with tape decoration */}
          <div className="flex flex-wrap gap-4 ml-4 md:ml-16">
            <div className="relative">
              {/* Tape piece */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#ffd93d]/25 rotate-[-2deg] rounded-sm" />
              <button className="px-10 py-4 bg-[#2c2c2c] text-[#fffef5] font-sans font-bold rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[4px_4px_0px_#ff6b6b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#ff6b6b] hover:rotate-[-0.5deg] transition-all duration-200">
                Start Drawing
              </button>
            </div>
            <button className="px-10 py-4 bg-[#ff6b6b] text-[#fffef5] font-sans font-bold rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[4px_4px_0px_#4ecdc4] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#4ecdc4] hover:rotate-[0.5deg] transition-all duration-200">
              Explore
            </button>
          </div>

          {/* Arrow annotation pointing to button */}
          <svg
            className="hidden md:block w-20 h-12 ml-[280px] mt-2 opacity-15"
            viewBox="0 0 80 48"
          >
            <path
              d="M5,40 C20,35 40,25 65,10"
              stroke="#ff6b6b"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M58,8 L65,10 L60,16"
              stroke="#ff6b6b"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Squiggly line divider */}
      <div className="relative z-10 py-2">
        <svg className="w-full h-6" viewBox="0 0 1200 24" preserveAspectRatio="none">
          <path
            d="M0,12 Q50,4 100,12 Q150,20 200,12 Q250,4 300,12 Q350,20 400,12 Q450,4 500,12 Q550,20 600,12 Q650,4 700,12 Q750,20 800,12 Q850,4 900,12 Q950,20 1000,12 Q1050,4 1100,12 Q1150,20 1200,12"
            stroke="#4ecdc4"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.15"
          />
        </svg>
      </div>

      {/* Color Palette */}
      <ShowcaseSection
        title="Marker Colors"
        subtitle="our favorite pens and pencils"
        className="relative z-10 py-12 px-6"
        titleClassName="text-3xl font-sans font-black text-[#2c2c2c] mb-4 text-center rotate-[-0.5deg]"
        subtitleClassName="text-[#2c2c2c]/35 font-sans mb-10 text-center italic"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border-2 border-dashed border-[#2c2c2c]/60 bg-[#fffef5] rounded-sm shadow-[3px_3px_0px_#4ecdc4] hover:shadow-[5px_5px_0px_#ff6b6b] hover:rotate-[0.5deg] transition-all duration-200"
            labelClassName="font-sans font-bold text-sm text-[#2c2c2c]"
            hexClassName="text-xs text-[#ff6b6b] font-sans"
          />
        </div>
      </ShowcaseSection>

      {/* Cards - Pinboard / corkboard style, NOT standard grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-sans font-black text-[#2c2c2c] mb-2 rotate-[-0.5deg]">
            Sticky Notes
          </h2>
          <p className="text-[#2c2c2c]/35 font-sans mb-12 italic">
            pinned to the board
          </p>

          {/* Pinboard layout - varied rotations and positions */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 - with pushpin */}
            <div className="relative p-6 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c]/60 rounded-sm shadow-[5px_5px_0px_#ff6b6b] rotate-[-2deg] hover:rotate-0 hover:shadow-[7px_7px_0px_#ff6b6b] hover:-translate-y-2 transition-all duration-200">
              {/* Pushpin */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <div className="w-4 h-4 rounded-full bg-[#ff6b6b] border border-[#2c2c2c]/20 shadow-sm" />
              </div>
              <div className="mt-2">
                <Pencil className="w-8 h-8 text-[#ff6b6b] mb-3 rotate-[-5deg]" />
                <h3 className="text-xl font-sans font-bold text-[#2c2c2c] mb-2">
                  Sketch
                </h3>
                <p className="text-[#2c2c2c]/45 font-sans text-sm">
                  Draw your ideas with quick strokes and rough outlines
                </p>
              </div>
            </div>

            {/* Card 2 - with tape */}
            <div className="relative p-6 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c]/60 rounded-sm shadow-[5px_5px_0px_#4ecdc4] rotate-[1.5deg] hover:rotate-0 hover:shadow-[7px_7px_0px_#4ecdc4] hover:-translate-y-2 transition-all duration-200 md:mt-4">
              {/* Tape strip */}
              <div className="absolute -top-2 left-4 right-4 h-5 bg-[#ffd93d]/20 rotate-[0.5deg] rounded-sm" />
              <div className="mt-2">
                <Heart className="w-8 h-8 text-[#4ecdc4] mb-3 rotate-[3deg]" />
                <h3 className="text-xl font-sans font-bold text-[#2c2c2c] mb-2">
                  Create
                </h3>
                <p className="text-[#2c2c2c]/45 font-sans text-sm">
                  Craft with warmth, personality, and a creative spark
                </p>
              </div>
            </div>

            {/* Card 3 - with paperclip */}
            <div className="relative p-6 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c]/60 rounded-sm shadow-[5px_5px_0px_#ffd93d] rotate-[-1deg] hover:rotate-0 hover:shadow-[7px_7px_0px_#ffd93d] hover:-translate-y-2 transition-all duration-200">
              {/* Paperclip SVG */}
              <svg
                className="absolute -top-4 right-4 w-6 h-10 opacity-25"
                viewBox="0 0 24 40"
              >
                <path
                  d="M8,2 L8,32 Q8,38 14,38 Q20,38 20,32 L20,10 Q20,4 14,4 Q10,4 10,10 L10,28"
                  stroke="#2c2c2c"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <Star className="w-8 h-8 text-[#ffd93d] mb-3 rotate-[-3deg]" />
              <h3 className="text-xl font-sans font-bold text-[#2c2c2c] mb-2">
                Inspire
              </h3>
              <p className="text-[#2c2c2c]/45 font-sans text-sm">
                Express ideas with playful charm and joyful energy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons - Sticker sheet aesthetic */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-sans font-black text-[#2c2c2c] mb-2 rotate-[0.5deg]">
            Buttons
          </h2>
          <p className="text-[#2c2c2c]/35 font-sans mb-8 italic">
            peel and stick
          </p>

          <div className="p-8 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c]/40 rounded-sm shadow-[4px_4px_0px_#ffd93d] rotate-[0.3deg]">
            <div className="flex items-center gap-2 mb-6">
              <PenTool className="w-4 h-4 text-[#4ecdc4]" />
              <span className="font-sans text-sm text-[#4ecdc4] font-bold">
                styles ~
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#2c2c2c] text-[#fffef5] font-sans font-semibold rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[3px_3px_0px_#ff6b6b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#ff6b6b] hover:rotate-[-0.5deg] transition-all">
                Ink
              </button>
              <button className="px-6 py-3 bg-[#ff6b6b] text-[#fffef5] font-sans font-semibold rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[3px_3px_0px_#4ecdc4] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#4ecdc4] hover:rotate-[0.5deg] transition-all">
                Red Marker
              </button>
              <button className="px-6 py-3 bg-transparent text-[#2c2c2c] font-sans font-semibold rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[2px_2px_0px_#ffd93d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#ffd93d] hover:rotate-[-0.5deg] transition-all">
                Outline
              </button>
              <button className="px-6 py-3 bg-[#4ecdc4] text-[#fffef5] font-sans font-semibold rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[3px_3px_0px_#ffd93d] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#ffd93d] hover:rotate-[0.5deg] transition-all">
                Teal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit Section - unique to hand-drawn doodle */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-sans font-black text-[#2c2c2c] mb-2 rotate-[-0.5deg]">
            The Toolkit
          </h2>
          <p className="text-[#2c2c2c]/35 font-sans mb-8 italic">
            what is in the pencil case
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Pencil,
                label: "Pencil",
                color: "#2c2c2c",
                shadow: "#ff6b6b",
                rotation: "-1deg",
              },
              {
                icon: PenTool,
                label: "Marker",
                color: "#ff6b6b",
                shadow: "#4ecdc4",
                rotation: "1.5deg",
              },
              {
                icon: Eraser,
                label: "Eraser",
                color: "#4ecdc4",
                shadow: "#ffd93d",
                rotation: "-0.5deg",
              },
              {
                icon: Palette,
                label: "Colors",
                color: "#ffd93d",
                shadow: "#ff6b6b",
                rotation: "1deg",
              },
            ].map((tool) => (
              <div
                key={tool.label}
                className="p-4 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c]/40 rounded-sm text-center hover:-translate-y-1 transition-all duration-200"
                style={{
                  boxShadow: `3px 3px 0px ${tool.shadow}`,
                  transform: `rotate(${tool.rotation})`,
                }}
              >
                <tool.icon
                  className="w-8 h-8 mx-auto mb-2"
                  style={{ color: tool.color }}
                />
                <span className="font-sans font-bold text-sm text-[#2c2c2c]">
                  {tool.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form - Guestbook in a notebook */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="relative p-8 bg-[#fffef5] border-2 border-dashed border-[#2c2c2c]/60 rounded-sm shadow-[5px_5px_0px_#ff6b6b]">
            {/* Tape decoration on top */}
            <div className="absolute -top-3 left-8 w-20 h-5 bg-[#ffd93d]/20 rotate-[-1deg] rounded-sm" />
            <div className="absolute -top-3 right-8 w-16 h-5 bg-[#4ecdc4]/15 rotate-[2deg] rounded-sm" />

            <div className="text-center mb-8 mt-2">
              <BookOpen className="w-10 h-10 text-[#4ecdc4] mx-auto mb-3 rotate-[-2deg]" />
              <h3 className="text-xl font-sans font-bold text-[#2c2c2c]">
                Sign the Guestbook
              </h3>
              <p className="text-[#2c2c2c]/30 font-sans text-sm mt-1">
                leave your mark here
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-sans font-bold text-[#ff6b6b] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Write your name..."
                  className="w-full px-4 py-3 bg-[#fffef5] border-0 border-b-2 border-dashed border-[#2c2c2c]/30 rounded-none text-[#2c2c2c] placeholder-[#2c2c2c]/25 font-sans focus:border-[#ff6b6b] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-sans font-bold text-[#4ecdc4] mb-2">
                  Message
                </label>
                <input
                  type="text"
                  placeholder="Say something nice..."
                  className="w-full px-4 py-3 bg-[#fffef5] border-0 border-b-2 border-dashed border-[#2c2c2c]/30 rounded-none text-[#2c2c2c] placeholder-[#2c2c2c]/25 font-sans focus:border-[#4ecdc4] focus:outline-none transition-all"
                />
              </div>
              <button className="w-full px-6 py-3 bg-[#2c2c2c] text-[#fffef5] font-sans font-bold rounded-sm border-2 border-dashed border-[#2c2c2c] shadow-[3px_3px_0px_#4ecdc4] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#4ecdc4] hover:rotate-[-0.5deg] transition-all">
                Leave a note
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Idea lightbulb section - unique */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Lightbulb className="w-12 h-12 text-[#ffd93d] mx-auto mb-4 rotate-[5deg]" />
          <p className="font-sans text-[#2c2c2c]/40 text-lg italic">
            &quot;Every great design starts as a doodle on a napkin.&quot;
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t-2 border-dashed border-[#2c2c2c]/15">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-[#2c2c2c]/30 text-sm font-sans">
            Hand-Drawn Doodle Showcase
          </p>
          <Link
            href="/"
            className="text-[#ff6b6b]/50 hover:text-[#ff6b6b] text-sm font-sans transition-colors"
          >
            StyleKit
          </Link>
        </div>
      </footer>
    </div>
  );
}

