"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowDown,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Star,
  Check,
  Globe,
  Layers,
  Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Modern Gradient color palette
const colors: ColorItem[] = [
  { name: "Deep Purple", hex: "#7c3aed", bg: "bg-violet-600" },
  { name: "Cyan", hex: "#06b6d4", bg: "bg-cyan-500" },
  { name: "Fuchsia", hex: "#d946ef", bg: "bg-fuchsia-500" },
  { name: "Orange", hex: "#f97316", bg: "bg-orange-500" },
  { name: "White", hex: "#ffffff", bg: "bg-white", border: true },
];

// Design rules
const designRules = [
  { title: "Full Height", desc: "min-h-screen or h-screen for viewport fill" },
  { title: "Scroll Snap", desc: "scroll-snap-type: y mandatory for smooth snapping" },
  { title: "Gradient Layers", desc: "Stack multiple gradients for depth" },
  { title: "Glass Cards", desc: "bg-white/10 backdrop-blur-xl for glass effect" },
  { title: "Scroll Indicator", desc: "Animated arrow guides users down" },
  { title: "Smooth Transitions", desc: "scroll-behavior: smooth for flow" },
];

export default function ShowcaseContent() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* Section 1 - Hero with animated gradient */}
      <section className="relative min-h-screen snap-start flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-transparent to-purple-500/30" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-400/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-orange-400/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/styles/full-page-scroll"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Docs</span>
            </Link>
            <span className="font-bold text-xl text-white">Full Page Scroll</span>
            <Link
              href="/styles"
              className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm hover:bg-white/20 transition-colors border border-white/20"
            >
              All Styles
            </Link>
          </div>
        </nav>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* 视觉风格标注 */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-4 border border-white/20">
            <Palette className="w-4 h-4" />
            <span>视觉风格: Modern Gradient</span>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-8 ml-2 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span>Full Page Scroll Layout</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Immersive<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300">
              Storytelling
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto mb-10">
            Each section fills the entire viewport, creating a cinematic experience with vibrant gradients.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-violet-600 font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg shadow-white/20">
              Start Journey
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 animate-bounce">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-6 h-6" />
        </div>

        {/* Navigation Dots */}
        <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <a
              key={i}
              href={`#section-${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                i === 0 ? "bg-white scale-125" : "bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Section ${i + 1}`}
            />
          ))}
        </nav>
      </section>

      {/* Section 2 - Purple to Cyan gradient */}
      <section id="section-2" className="min-h-screen snap-start flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-purple-600 to-cyan-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-8">
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm font-medium mb-6 border border-white/20">
            01 / Capture
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            Capture Attention
          </h2>
          <p className="text-xl lg:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
            Each full-screen section creates a focused moment, perfect for storytelling and brand narratives.
          </p>

          {/* Glass cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Immersive", desc: "Full viewport engagement" },
              { icon: Zap, title: "Dynamic", desc: "Smooth scroll transitions" },
              { icon: Shield, title: "Memorable", desc: "Lasting visual impact" },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Fuchsia to Orange gradient */}
      <section id="section-3" className="min-h-screen snap-start flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600 via-pink-500 to-orange-400" />
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/30 via-transparent to-yellow-500/20" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm font-medium mb-6 border border-white/20">
              02 / Control
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Control the Narrative
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Scroll snap ensures viewers see each section completely, controlling the pace of information delivery.
            </p>
            <ul className="space-y-4">
              {["One concept per section", "No content gets skipped", "Natural reading rhythm"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <div className="text-7xl font-bold text-white mb-2">100%</div>
                <div className="text-xl text-white/80">Viewport Fill</div>
              </div>
            </div>
            {/* Floating accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Color Palette & Rules */}
      <section id="section-4" className="snap-start bg-white">
        <ShowcaseSection
          title="Gradient Palette"
          subtitle="Vibrant colors that flow and blend beautifully"
          className="py-20 px-6"
          titleClassName="text-3xl font-bold text-gray-900 mb-4 text-center"
          subtitleClassName="text-gray-600 mb-10 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <ColorPaletteGrid
              colors={colors}
              cardClassName="rounded-xl overflow-hidden shadow-lg"
              labelClassName="font-semibold text-sm text-gray-900"
              hexClassName="text-xs text-gray-500 font-mono"
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Design Principles"
          subtitle="Key patterns for immersive scroll experiences"
          className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100"
          titleClassName="text-3xl font-bold text-gray-900 mb-4 text-center"
          subtitleClassName="text-gray-600 mb-10 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {designRules.map((rule, i) => (
                <div key={i} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">{rule.title}</h4>
                  <p className="text-sm text-gray-600">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ShowcaseSection>
      </section>

      {/* Section 5 - CTA with cyan to purple gradient */}
      <section id="section-5" className="min-h-screen snap-start flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-violet-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {/* Floating orbs */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-[100px]" />

        <div className="relative z-10 text-center px-8 max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Impress?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
            Create stunning full-page scroll experiences with vibrant gradients that captivate your audience.
          </p>
          <button className="px-10 py-5 bg-white text-violet-600 font-semibold text-lg rounded-full hover:bg-white/90 transition-colors shadow-xl shadow-black/20">
            Get Started Today
          </button>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {[
              { icon: Star, label: "4.9 Rating" },
              { icon: Layers, label: "10K+ Users" },
              { icon: Shield, label: "Enterprise Ready" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="snap-start py-8 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Full Page Scroll Showcase{" "}
            <Link href="/" className="text-gray-900 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
