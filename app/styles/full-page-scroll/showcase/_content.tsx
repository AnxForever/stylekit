"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowDown,
  Play,
  Rocket,
  Sparkles,
  Zap,
  Shield,
  Users,
  Check,
  ChevronRight,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Full Page Scroll color palette
const colors: ColorItem[] = [
  { name: "Black", hex: "#000000", bg: "bg-black" },
  { name: "White", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Indigo", hex: "#6366f1", bg: "bg-indigo-500" },
  { name: "Pink", hex: "#ec4899", bg: "bg-pink-500" },
  { name: "Teal", hex: "#14b8a6", bg: "bg-teal-500" },
];

// Design rules
const designRules = [
  { title: "Full Height", desc: "min-h-screen or h-screen for viewport fill" },
  { title: "Scroll Snap", desc: "scroll-snap-type: y mandatory for smooth snapping" },
  { title: "Center Content", desc: "flex items-center justify-center" },
  { title: "Scroll Indicator", desc: "Add animated arrow at first section bottom" },
  { title: "Navigation Dots", desc: "Fixed side dots for section navigation" },
  { title: "Smooth Scroll", desc: "scroll-behavior: smooth for transitions" },
];

export default function ShowcaseContent() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* Section 1 - Hero */}
      <section className="relative min-h-screen snap-start flex items-center justify-center bg-black text-white overflow-hidden">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/styles/full-page-scroll"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Docs</span>
            </Link>
            <span className="font-bold text-xl">Full Page Scroll</span>
            <Link
              href="/styles"
              className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-full text-sm hover:bg-white/20 transition-colors"
            >
              All Styles
            </Link>
          </div>
        </nav>

        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-transparent to-pink-900/30" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block text-sm uppercase tracking-widest text-white/60 mb-6">
            Immersive Experience
          </span>
          <h1 className="text-6xl lg:text-8xl font-bold mb-6">
            Full Page Scroll
          </h1>
          <p className="text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto">
            Each section fills the entire viewport, creating a cinematic storytelling experience.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-sm uppercase tracking-wider">Scroll</span>
          <ArrowDown className="w-6 h-6" />
        </div>

        {/* Navigation Dots */}
        <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          <a href="#section-1" className="w-3 h-3 rounded-full bg-white transition-opacity" aria-label="Section 1" />
          <a href="#section-2" className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-opacity" aria-label="Section 2" />
          <a href="#section-3" className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-opacity" aria-label="Section 3" />
          <a href="#section-4" className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-opacity" aria-label="Section 4" />
          <a href="#section-5" className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/60 transition-opacity" aria-label="Section 5" />
        </nav>
      </section>

      {/* Section 2 - Feature 1 */}
      <section id="section-2" className="min-h-screen snap-start flex items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-8">
          <span className="text-sm uppercase tracking-widest text-white/60 mb-4 block">01</span>
          <h2 className="text-5xl lg:text-7xl font-bold mb-6">
            Capture Attention
          </h2>
          <p className="text-xl lg:text-2xl text-white/80 mb-10 max-w-xl mx-auto">
            Each full-screen section creates a focused moment, perfect for storytelling and brand narratives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Sparkles, label: "Immersive" },
              { icon: Zap, label: "Engaging" },
              { icon: Shield, label: "Memorable" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-3 bg-white/10 rounded-full backdrop-blur">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Feature 2 */}
      <section id="section-3" className="min-h-screen snap-start flex items-center justify-center bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm uppercase tracking-widest text-white/60 mb-4 block">02</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Control the Narrative
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Scroll snap ensures viewers see each section completely, controlling the pace of information delivery.
            </p>
            <ul className="space-y-4">
              {["One concept per section", "No content gets skipped", "Natural reading rhythm"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <Check className="w-5 h-5 text-white" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square bg-white/20 rounded-3xl backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl font-bold mb-2">100%</div>
                <div className="text-xl text-white/80">Viewport Fill</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Color Palette & Rules (non-snap for scrollable content) */}
      <section id="section-4" className="snap-start bg-white">
        <ShowcaseSection
          title="Color System"
          subtitle="Bold, high-contrast colors for maximum impact"
          className="py-20 px-6"
          titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
          subtitleClassName="text-zinc-600 mb-10 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <ColorPaletteGrid
              colors={colors}
              cardClassName="rounded-lg overflow-hidden shadow-sm"
              labelClassName="font-semibold text-sm text-zinc-900"
              hexClassName="text-xs text-zinc-500 font-mono"
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Design Rules"
          subtitle="Key principles for Full Page Scroll layouts"
          className="py-20 px-6 bg-zinc-50"
          titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
          subtitleClassName="text-zinc-600 mb-10 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {designRules.map((rule, i) => (
                <div key={i} className="p-5 bg-white rounded-xl shadow-sm">
                  <h4 className="font-semibold text-zinc-900 mb-2">{rule.title}</h4>
                  <p className="text-sm text-zinc-600">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ShowcaseSection>
      </section>

      {/* Section 5 - CTA */}
      <section id="section-5" className="min-h-screen snap-start flex items-center justify-center bg-zinc-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-transparent to-pink-900/30" />

        <div className="relative z-10 text-center px-8 max-w-2xl mx-auto">
          <Rocket className="w-16 h-16 mx-auto mb-8 text-indigo-400" />
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Ready to Impress?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Create stunning full-page scroll experiences that captivate your audience from start to finish.
          </p>
          <button className="px-10 py-5 bg-white text-zinc-900 font-semibold text-lg rounded-full hover:bg-zinc-100 transition-colors shadow-lg">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="snap-start py-8 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            Full Page Scroll Showcase{" "}
            <Link href="/" className="text-zinc-900 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
