"use client";

import Link from "next/link";
import { ArrowLeft, Cloud, Droplets, Sun, Wind, Leaf, Sparkles } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/30 backdrop-blur-xl rounded-3xl border border-white/40 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

function Bubble({ size, left, delay }: { size: number; left: string; delay: string }) {
  return (
    <div
      className="absolute rounded-full bg-white/20 pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        bottom: "-10%",
        animation: `aero-bubble 8s ${delay} infinite ease-in-out`,
      }}
    />
  );
}

const colors: ColorItem[] = [
  { name: "Sky Light", hex: "#87CEEB", bg: "bg-[#87CEEB]" },
  { name: "Sky Deep", hex: "#5FB3CC", bg: "bg-[#5FB3CC]" },
  { name: "Glass White", hex: "rgba(255,255,255,0.4)", bg: "bg-white/40" },
  { name: "Ice Blue", hex: "#e0f2fe", bg: "bg-sky-100" },
  { name: "Nature Green", hex: "#34d399", bg: "bg-emerald-400" },
  { name: "Aqua", hex: "#7dd3fc", bg: "bg-sky-300" },
];

const designRules = [
  { title: "Sky Gradients", desc: "Use sky-300 to sky-500 gradient backgrounds as the base layer" },
  { title: "Glass Panels", desc: "bg-white/30 to bg-white/50 with backdrop-blur-xl on all cards" },
  { title: "Large Radius", desc: "rounded-2xl to rounded-3xl on all interactive elements" },
  { title: "Glossy Highlights", desc: "Gradient from-white/90 to-white/60 for button shine" },
  { title: "Nature Elements", desc: "Bubbles, droplets, and organic shapes as decoration" },
  { title: "Sans-serif Only", desc: "Clean sans-serif fonts, never use monospace or serif" },
];

const features = [
  {
    icon: Cloud,
    title: "Airy Layouts",
    desc: "Generous spacing and floating elements create a sense of openness",
  },
  {
    icon: Droplets,
    title: "Glass Surfaces",
    desc: "Semi-transparent panels with backdrop blur simulate frosted glass",
  },
  {
    icon: Leaf,
    title: "Nature Inspired",
    desc: "Organic shapes and green accents bring technology closer to nature",
  },
];

const stats = [
  { value: "Vista", label: "Era" },
  { value: "100%", label: "Translucent" },
  { value: "32px", label: "Border Radius" },
  { value: "Aero", label: "Codename" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500">
      <style>{`
        @keyframes aero-bubble {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          30% { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(1); opacity: 0; }
        }
        @keyframes aero-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/30 backdrop-blur-xl border-b border-white/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/frutiger-aero"
            className="flex items-center gap-2 text-sky-800 hover:text-sky-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-sky-700" />
            <span className="font-bold text-xl text-sky-900">Frutiger Aero</span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 bg-white/50 backdrop-blur-md border border-white/50 rounded-full text-sky-700 text-sm font-medium hover:bg-white/60 transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Frutiger Aero"
        description="Windows Vista/7 era glass aesthetic -- sky-blue gradients, frosted glass panels, water droplets, and the feeling of floating in clean air."
        className="relative pt-32 pb-20 px-6 text-center overflow-hidden"
        titleClassName="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-6"
        descriptionClassName="text-xl text-white/80 max-w-2xl mx-auto mb-10"
      >
        {/* Decorative bubbles */}
        <Bubble size={20} left="10%" delay="0s" />
        <Bubble size={14} left="25%" delay="2s" />
        <Bubble size={28} left="45%" delay="1s" />
        <Bubble size={16} left="65%" delay="3s" />
        <Bubble size={22} left="80%" delay="1.5s" />
        <Bubble size={12} left="90%" delay="4s" />

        <GlassCard className="max-w-xl mx-auto p-8 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wind className="w-6 h-6 text-sky-600" />
            <Droplets className="w-6 h-6 text-sky-500" />
            <Sparkles className="w-6 h-6 text-sky-400" />
          </div>
          <p className="text-sky-800 text-sm leading-relaxed">
            A design language that blends organic nature elements with translucent digital
            interfaces, creating a fresh and optimistic visual experience.
          </p>
        </GlassCard>

        <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-10">
          <button className="px-8 py-4 bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-md border border-white/50 rounded-full text-sky-700 font-semibold shadow-lg hover:shadow-xl hover:from-white/95 transition-all">
            Get Started
          </button>
          <button className="px-8 py-4 bg-sky-500/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-sky-500/30 transition-all">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Feature Cards */}
      <ShowcaseSection
        title="Core Elements"
        subtitle="The building blocks of Frutiger Aero design"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white drop-shadow-lg mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <GlassCard
              key={feature.title}
              className="p-6 hover:bg-white/40 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <feature.icon className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-sky-900 mb-2">{feature.title}</h3>
              <p className="text-sky-700/70 text-sm">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </ShowcaseSection>

      {/* Buttons Showcase */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Glossy glass buttons with Vista-style reflections"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white drop-shadow-lg mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8">
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-6">
              Variants
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <button className="px-6 py-3 bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-md border border-white/50 rounded-full text-sky-700 font-semibold shadow-lg hover:shadow-xl transition-all">
                Glass Primary
              </button>
              <button className="px-6 py-3 bg-sky-500/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-sky-500/30 transition-all">
                Translucent Blue
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                Accent Gradient
              </button>
              <button className="px-6 py-3 border border-white/40 rounded-full text-white font-semibold hover:bg-white/10 transition-all">
                Outline
              </button>
            </div>
            <p className="text-sm font-semibold text-sky-600 uppercase tracking-wide mb-6">
              Sizes
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-4 py-2 text-sm bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-md border border-white/50 rounded-full text-sky-700 font-semibold shadow-md transition-all">
                Small
              </button>
              <button className="px-6 py-3 bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-md border border-white/50 rounded-full text-sky-700 font-semibold shadow-lg transition-all">
                Medium
              </button>
              <button className="px-8 py-4 text-lg bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-md border border-white/50 rounded-full text-sky-700 font-semibold shadow-lg transition-all">
                Large
              </button>
            </div>
          </GlassCard>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Form Elements"
        subtitle="Glass inputs with soft focus states"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white drop-shadow-lg mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <GlassCard className="p-8">
            <h3 className="text-2xl font-bold text-sky-900 mb-6 text-center">Contact</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-sky-700 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl text-sky-900 placeholder:text-sky-400/50 focus:outline-none focus:border-white/70 focus:bg-white/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-sky-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl text-sky-900 placeholder:text-sky-400/50 focus:outline-none focus:border-white/70 focus:bg-white/40 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-sky-200/40 backdrop-blur-md border border-white/30 rounded-full text-sky-800 text-xs font-medium">
                  Design
                </span>
                <span className="px-3 py-1 bg-emerald-200/40 backdrop-blur-md border border-white/30 rounded-full text-emerald-800 text-xs font-medium">
                  Nature
                </span>
                <span className="px-3 py-1 bg-white/40 backdrop-blur-md border border-white/30 rounded-full text-sky-700 text-xs font-medium">
                  Glass
                </span>
              </div>
              <button className="w-full py-3 bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-md border border-white/50 rounded-full text-sky-700 font-semibold shadow-lg hover:shadow-xl transition-all">
                Send Message
              </button>
            </div>
          </GlassCard>
        </div>
      </ShowcaseSection>

      {/* Statistics */}
      <ShowcaseSection
        title="Statistics"
        subtitle="Glass stat cards with emphasis"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white drop-shadow-lg mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <GlassCard key={stat.label} className="p-6 text-center">
                <div className="text-3xl font-bold text-sky-900 mb-1">{stat.value}</div>
                <div className="text-sky-600/70 text-sm">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Sky blues, translucent whites, and nature greens"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white drop-shadow-lg mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden bg-white/30 backdrop-blur-md border border-white/40"
            labelClassName="font-semibold text-sm text-sky-900"
            hexClassName="text-xs text-sky-600/60 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for the Frutiger Aero aesthetic"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white drop-shadow-lg mb-4 text-center"
        subtitleClassName="text-white/70 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-5 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl">
                <h4 className="font-semibold text-sky-900 mb-2">{rule.title}</h4>
                <p className="text-sm text-sky-700/70">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white/20 backdrop-blur-md border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sky-700/60 text-sm">
            Frutiger Aero Showcase &middot; Part of{" "}
            <Link href="/" className="text-sky-800 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
