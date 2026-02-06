"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Droplets,
  Flower2,
  Palette,
  CloudRain,
  Brush,
  Leaf,
  Wind,
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Rose Wash", hex: "#d4a0a0", bg: "bg-[#d4a0a0]" },
  { name: "Cerulean", hex: "#7bb8d4", bg: "bg-[#7bb8d4]" },
  { name: "Sage Green", hex: "#8cc5a8", bg: "bg-[#8cc5a8]" },
  { name: "Lavender Bloom", hex: "#c3a0d4", bg: "bg-[#c3a0d4]" },
  { name: "Ochre Gold", hex: "#e8c87a", bg: "bg-[#e8c87a]" },
  { name: "Warm Paper", hex: "#faf6f0", bg: "bg-[#faf6f0]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#faf6f0] relative overflow-hidden">
      {/* Paper grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Watercolor wash background washes */}
      <div className="fixed top-[-10%] left-[-5%] w-[600px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(212,160,160,0.10) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="fixed top-[10%] right-[-5%] w-[500px] h-[450px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(123,184,212,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="fixed bottom-[-5%] left-[20%] w-[550px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(140,197,168,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="fixed bottom-[20%] right-[10%] w-[350px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(195,160,212,0.08) 0%, transparent 70%)", filter: "blur(35px)" }} />

      {/* Floating botanical watercolor accents */}
      <div className="fixed top-40 left-8 pointer-events-none opacity-[0.12]">
        <Leaf className="w-16 h-16 text-[#8cc5a8] rotate-[-25deg]" />
      </div>
      <div className="fixed bottom-32 right-12 pointer-events-none opacity-[0.10]">
        <Flower2 className="w-14 h-14 text-[#c3a0d4] rotate-[15deg]" />
      </div>

      {/* Organic flowing navigation */}
      <nav className="relative z-10 px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/watercolor-art"
            className="flex items-center gap-2 text-[#d4a0a0] hover:text-[#c28585] transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-serif text-sm tracking-wider">Return</span>
          </Link>
          <Link
            href="/styles"
            className="px-5 py-2 font-serif text-sm text-[#5a3e3e]/70 tracking-wider border border-[#d4a0a0]/20 rounded-2xl hover:bg-[#d4a0a0]/5 transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero: Full-width watercolor wash with centered text */}
      <section className="relative z-10 pt-16 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Watercolor wash behind title */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 -inset-x-16 -inset-y-8 rounded-[60%_40%_55%_45%/50%_60%_40%_50%]" style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(212,160,160,0.12) 0%, transparent 70%)" }} />
            <h1 className="relative font-serif text-6xl md:text-8xl font-semibold text-[#d4a0a0] tracking-tight leading-none">
              Watercolor
            </h1>
          </div>
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 -inset-x-12 -inset-y-6 rounded-[45%_55%_50%_50%/55%_45%_55%_45%]" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(123,184,212,0.10) 0%, transparent 70%)" }} />
            <span className="relative font-serif text-4xl md:text-6xl font-semibold text-[#7bb8d4]/70">
              Art
            </span>
          </div>
          <p className="text-[#5a3e3e]/40 font-serif text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Pigments flow freely across warm paper, edges bleed and bloom,
            and white space breathes with organic grace
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-10 py-4 font-serif font-medium tracking-wide rounded-2xl text-[#5a3e3e] transition-all duration-500" style={{ background: "radial-gradient(ellipse at 30% 40%, #d4a0a0 0%, #c89090 100%)", boxShadow: "0 4px 24px rgba(212,160,160,0.30), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
              <span className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                Explore Washes
              </span>
            </button>
            <button className="px-10 py-4 font-serif font-medium tracking-wide rounded-2xl text-[#3a5a6a] transition-all duration-500" style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(123,184,212,0.6) 0%, rgba(100,160,195,0.6) 100%)", boxShadow: "0 4px 24px rgba(123,184,212,0.25)" }}>
              <span className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                View Gallery
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Watercolor wash divider */}
      <div className="relative z-10 h-16 mx-12">
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(212,160,160,0.08) 20%, rgba(123,184,212,0.06) 50%, rgba(140,197,168,0.06) 80%, transparent)", filter: "blur(8px)", borderRadius: "50%" }} />
      </div>

      {/* Palette Section - Horizontal organic flow */}
      <ShowcaseSection
        title="Pigment Palette"
        subtitle="Transparent Layers"
        className="relative z-10 py-16 px-6"
        titleClassName="text-2xl font-serif font-semibold text-[#5a3e3e] tracking-wide mb-2 text-center"
        subtitleClassName="text-[#5a3e3e]/30 font-serif text-sm tracking-[0.2em] mb-12 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#d4a0a0]/15 bg-[#faf6f0] rounded-2xl shadow-[0_2px_16px_rgba(212,160,160,0.08)]"
            labelClassName="font-serif font-medium text-sm text-[#5a3e3e]"
            hexClassName="text-xs text-[#d4a0a0]/70 font-serif"
          />
        </div>
      </ShowcaseSection>

      {/* Watercolor Techniques - Staggered organic cards */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold text-[#5a3e3e] tracking-wide mb-2 text-center">
            Techniques
          </h2>
          <p className="text-[#5a3e3e]/30 font-serif text-sm tracking-[0.2em] mb-14 text-center">
            Wet-on-Wet Methods
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Card 1: Wet Wash */}
            <div className="relative group md:mt-8">
              <div className="absolute -inset-3 rounded-[50%_50%_45%_55%/55%_50%_50%_45%] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(ellipse at center, rgba(212,160,160,0.08) 0%, transparent 70%)" }} />
              <div className="relative p-8 bg-[#faf6f0]/80 border border-[#d4a0a0]/15 rounded-3xl shadow-[0_2px_20px_rgba(212,160,160,0.10)] hover:shadow-[0_8px_32px_rgba(212,160,160,0.18)] transition-all duration-500">
                <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-2xl" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(212,160,160,0.25) 0%, rgba(212,160,160,0.10) 100%)" }}>
                  <CloudRain className="w-6 h-6 text-[#d4a0a0]" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-[#5a3e3e] mb-2">Wet-on-Wet</h3>
                <p className="font-serif text-sm text-[#5a3e3e]/45 leading-relaxed">
                  Applying wet pigment onto a wet surface, allowing colors to merge
                  and bloom with unpredictable beauty.
                </p>
              </div>
            </div>

            {/* Card 2: Glazing */}
            <div className="relative group">
              <div className="absolute -inset-3 rounded-[45%_55%_50%_50%/50%_45%_55%_50%] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(ellipse at center, rgba(123,184,212,0.08) 0%, transparent 70%)" }} />
              <div className="relative p-8 bg-[#faf6f0]/80 border border-[#7bb8d4]/15 rounded-3xl shadow-[0_2px_20px_rgba(123,184,212,0.10)] hover:shadow-[0_8px_32px_rgba(123,184,212,0.18)] transition-all duration-500">
                <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-2xl" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(123,184,212,0.25) 0%, rgba(123,184,212,0.10) 100%)" }}>
                  <Droplets className="w-6 h-6 text-[#7bb8d4]" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-[#5a3e3e] mb-2">Glazing</h3>
                <p className="font-serif text-sm text-[#5a3e3e]/45 leading-relaxed">
                  Building transparent layers, each one adding depth and subtle
                  color shifts that create luminous effects.
                </p>
              </div>
            </div>

            {/* Card 3: Bleeding Edge */}
            <div className="relative group">
              <div className="absolute -inset-3 rounded-[55%_45%_50%_50%/45%_55%_45%_55%] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(ellipse at center, rgba(140,197,168,0.08) 0%, transparent 70%)" }} />
              <div className="relative p-8 bg-[#faf6f0]/80 border border-[#8cc5a8]/15 rounded-3xl shadow-[0_2px_20px_rgba(140,197,168,0.10)] hover:shadow-[0_8px_32px_rgba(140,197,168,0.18)] transition-all duration-500">
                <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-2xl" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(140,197,168,0.25) 0%, rgba(140,197,168,0.10) 100%)" }}>
                  <Wind className="w-6 h-6 text-[#8cc5a8]" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-[#5a3e3e] mb-2">Bleeding Edges</h3>
                <p className="font-serif text-sm text-[#5a3e3e]/45 leading-relaxed">
                  Pigment seeps beyond boundaries, creating organic edges where
                  color transitions into paper.
                </p>
              </div>
            </div>

            {/* Card 4: Pigment Pooling */}
            <div className="relative group md:mt-8">
              <div className="absolute -inset-3 rounded-[50%_50%_55%_45%/50%_50%_45%_55%] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(ellipse at center, rgba(195,160,212,0.08) 0%, transparent 70%)" }} />
              <div className="relative p-8 bg-[#faf6f0]/80 border border-[#c3a0d4]/15 rounded-3xl shadow-[0_2px_20px_rgba(195,160,212,0.10)] hover:shadow-[0_8px_32px_rgba(195,160,212,0.18)] transition-all duration-500">
                <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-2xl" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(195,160,212,0.25) 0%, rgba(195,160,212,0.10) 100%)" }}>
                  <Brush className="w-6 h-6 text-[#c3a0d4]" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-[#5a3e3e] mb-2">Pigment Pooling</h3>
                <p className="font-serif text-sm text-[#5a3e3e]/45 leading-relaxed">
                  Color concentrates at the edges of each wash, creating darker
                  rims that define organic shapes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons - Inline in a "watercolor palette tray" */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-semibold text-[#5a3e3e] tracking-wide mb-2 text-center">
            Wash Controls
          </h2>
          <p className="text-[#5a3e3e]/30 font-serif text-sm tracking-[0.2em] mb-12 text-center">
            Pigment-Fill Buttons
          </p>

          <div className="p-10 bg-[#faf6f0]/70 border border-[#d4a0a0]/12 rounded-3xl" style={{ boxShadow: "0 4px 32px rgba(212,160,160,0.08), inset 0 1px 0 rgba(255,255,255,0.5)" }}>
            <div className="flex flex-wrap gap-5 justify-center">
              <button className="px-8 py-3.5 font-serif font-medium tracking-wide text-[#5a3e3e] rounded-2xl transition-all duration-500 hover:scale-[1.02]" style={{ background: "radial-gradient(ellipse at 25% 35%, #d4a0a0 0%, #c89090 100%)", boxShadow: "0 3px 16px rgba(212,160,160,0.30), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
                Rose
              </button>
              <button className="px-8 py-3.5 font-serif font-medium tracking-wide text-[#2a4a5a] rounded-2xl transition-all duration-500 hover:scale-[1.02]" style={{ background: "radial-gradient(ellipse at 25% 35%, rgba(123,184,212,0.7) 0%, rgba(100,160,195,0.7) 100%)", boxShadow: "0 3px 16px rgba(123,184,212,0.25)" }}>
                Cerulean
              </button>
              <button className="px-8 py-3.5 font-serif font-medium tracking-wide text-[#2a4a3a] rounded-2xl transition-all duration-500 hover:scale-[1.02]" style={{ background: "radial-gradient(ellipse at 25% 35%, rgba(140,197,168,0.7) 0%, rgba(110,175,145,0.7) 100%)", boxShadow: "0 3px 16px rgba(140,197,168,0.25)" }}>
                Sage
              </button>
              <button className="px-8 py-3.5 font-serif font-medium tracking-wide text-[#d4a0a0] rounded-2xl transition-all duration-500 hover:scale-[1.02] border border-[#d4a0a0]/25 bg-transparent hover:bg-[#d4a0a0]/5">
                Outline
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form: Artist journal entry */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-lg mx-auto">
          <div className="relative">
            {/* Watercolor wash behind the form */}
            <div className="absolute -inset-6 rounded-[50%_50%_45%_55%/55%_50%_50%_45%]" style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(212,160,160,0.06) 0%, rgba(123,184,212,0.04) 50%, transparent 80%)", filter: "blur(12px)" }} />

            <div className="relative p-10 bg-[#faf6f0]/80 border border-[#d4a0a0]/15 rounded-3xl" style={{ boxShadow: "0 4px 32px rgba(212,160,160,0.10), inset 0 1px 0 rgba(255,255,255,0.4)" }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(212,160,160,0.2) 0%, rgba(212,160,160,0.08) 100%)" }}>
                  <Flower2 className="w-5 h-5 text-[#d4a0a0]" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-[#5a3e3e]">
                  Artist Journal
                </h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-serif text-[#d4a0a0] tracking-[0.15em] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name..."
                    className="w-full px-5 py-3.5 bg-[#faf6f0] border border-[#d4a0a0]/20 rounded-2xl text-[#5a3e3e] placeholder-[#d4a0a0]/35 font-serif focus:outline-none transition-all duration-500"
                    style={{ boxShadow: "inset 0 1px 3px rgba(212,160,160,0.06)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif text-[#7bb8d4] tracking-[0.15em] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email..."
                    className="w-full px-5 py-3.5 bg-[#faf6f0] border border-[#7bb8d4]/20 rounded-2xl text-[#5a3e3e] placeholder-[#7bb8d4]/35 font-serif focus:outline-none transition-all duration-500"
                    style={{ boxShadow: "inset 0 1px 3px rgba(123,184,212,0.06)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-serif text-[#8cc5a8] tracking-[0.15em] mb-2">
                    Inspiration
                  </label>
                  <textarea
                    placeholder="Describe your vision..."
                    rows={3}
                    className="w-full px-5 py-3.5 bg-[#faf6f0] border border-[#8cc5a8]/20 rounded-2xl text-[#5a3e3e] placeholder-[#8cc5a8]/35 font-serif focus:outline-none transition-all duration-500 resize-none"
                    style={{ boxShadow: "inset 0 1px 3px rgba(140,197,168,0.06)" }}
                  />
                </div>
                <button className="w-full py-4 font-serif font-medium tracking-wide text-[#5a3e3e] rounded-2xl transition-all duration-500 hover:scale-[1.01]" style={{ background: "radial-gradient(ellipse at 30% 40%, #d4a0a0 0%, #c89090 100%)", boxShadow: "0 4px 20px rgba(212,160,160,0.25), inset 0 1px 0 rgba(255,255,255,0.15)" }}>
                  Begin Painting
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="h-px mb-8 mx-auto max-w-xs" style={{ background: "linear-gradient(90deg, transparent, rgba(212,160,160,0.20), transparent)" }} />
          <p className="text-[#5a3e3e]/30 text-sm font-serif tracking-wider">
            Watercolor Art -- Part of{" "}
            <Link href="/" className="text-[#d4a0a0]/60 hover:text-[#d4a0a0] transition-colors duration-300">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
