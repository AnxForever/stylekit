"use client";

import Link from "next/link";
import { ArrowLeft, Smartphone, Laptop, Watch, Headphones } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Apple 配色
const colors: ColorItem[] = [
  { name: "Black", hex: "#000000", bg: "bg-black" },
  { name: "Apple Gray", hex: "#f5f5f7", bg: "bg-[#f5f5f7]" },
  { name: "Apple Blue", hex: "#0071e3", bg: "bg-[#0071e3]" },
  { name: "Apple Green", hex: "#34c759", bg: "bg-[#34c759]" },
  { name: "Apple Red", hex: "#ff3b30", bg: "bg-[#ff3b30]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-3 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/apple-style"
            className="flex items-center gap-2 text-black hover:text-gray-500 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Docs</span>
          </Link>
          <span className="font-semibold text-lg text-black">Apple Style</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#0071e3] text-white rounded-full text-sm font-medium hover:bg-[#0077ed] transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Apple Style"
        description="Minimal elegance with generous whitespace, refined rounded corners, subtle shadows, and SF Pro-style typography."
        className="pt-32 pb-24 px-6 text-center"
        titleClassName="text-5xl md:text-7xl font-semibold tracking-tight text-black mb-6"
        descriptionClassName="text-xl text-gray-500 max-w-2xl mx-auto mb-12"
      >
        <div className="flex flex-wrap justify-center gap-6">
          <button className="px-6 py-3 bg-[#0071e3] rounded-full text-white font-medium hover:bg-[#0077ed] transition-colors">
            Buy
          </button>
          <a href="#" className="text-[#0071e3] hover:underline font-medium">
            Learn more &gt;
          </a>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Minimal palette with refined accents"
        className="py-24 px-6 bg-[#f5f5f7]"
        titleClassName="text-3xl font-semibold tracking-tight text-black mb-4 text-center"
        subtitleClassName="text-gray-500 mb-12 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            labelClassName="font-medium text-sm text-gray-700"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Product Cards */}
      <ShowcaseSection
        title="Products"
        subtitle="Premium product showcase"
        className="py-24 px-6"
        titleClassName="text-3xl font-semibold tracking-tight text-black mb-4 text-center"
        subtitleClassName="text-gray-500 mb-12 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-full aspect-square bg-[#f5f5f7] rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <Smartphone className="w-24 h-24 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">iPhone 15 Pro</h3>
            <p className="text-gray-500 mb-3">Titanium. So strong. So light.</p>
            <p className="text-lg font-medium text-black">From $999</p>
          </div>

          <div className="text-center">
            <div className="w-full aspect-square bg-[#f5f5f7] rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <Laptop className="w-24 h-24 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">MacBook Pro</h3>
            <p className="text-gray-500 mb-3">Supercharged by M3 Pro</p>
            <p className="text-lg font-medium text-black">From $1,999</p>
          </div>

          <div className="text-center">
            <div className="w-full aspect-square bg-[#f5f5f7] rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <Watch className="w-24 h-24 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">Apple Watch</h3>
            <p className="text-gray-500 mb-3">A healthy leap ahead</p>
            <p className="text-lg font-medium text-black">From $399</p>
          </div>

          <div className="text-center">
            <div className="w-full aspect-square bg-[#f5f5f7] rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <Headphones className="w-24 h-24 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">AirPods Pro</h3>
            <p className="text-gray-500 mb-3">Adaptive Audio. Now playing</p>
            <p className="text-lg font-medium text-black">$249</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Feature Section */}
      <ShowcaseSection
        title="Innovation"
        subtitle="Designed to make a difference"
        className="py-24 px-6 bg-[#f5f5f7]"
        titleClassName="text-3xl font-semibold tracking-tight text-black mb-4 text-center"
        subtitleClassName="text-gray-500 mb-12 text-center"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-12 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-semibold tracking-tight text-black mb-4">
                  Performance that goes the distance
                </h3>
                <p className="text-lg text-gray-500 mb-6">
                  The most powerful chip ever in a smartphone. A17 Pro delivers exceptional performance and efficiency.
                </p>
                <a href="#" className="text-[#0071e3] hover:underline font-medium">
                  Learn more about A17 Pro &gt;
                </a>
              </div>
              <div className="aspect-video bg-[#f5f5f7] rounded-xl flex items-center justify-center">
                <span className="text-gray-400 text-lg">Product Image</span>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Clean, minimal button styles"
        className="py-24 px-6"
        titleClassName="text-3xl font-semibold tracking-tight text-black mb-4 text-center"
        subtitleClassName="text-gray-500 mb-12 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-12 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-8">Primary</p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-6 py-3 bg-[#0071e3] rounded-full text-white font-medium hover:bg-[#0077ed] transition-colors">
                Buy now
              </button>
              <button className="px-6 py-3 bg-black rounded-full text-white font-medium hover:opacity-80 transition-opacity">
                Shop now
              </button>
            </div>

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-8">Secondary</p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-6 py-3 border border-[#0071e3] rounded-full text-[#0071e3] font-medium hover:bg-[#0071e3] hover:text-white transition-all">
                Learn more
              </button>
              <button className="px-6 py-3 border border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-all">
                Explore
              </button>
            </div>

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-8">Links</p>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="text-[#0071e3] hover:underline font-medium">
                Learn more &gt;
              </a>
              <a href="#" className="text-[#0071e3] hover:underline font-medium">
                Buy &gt;
              </a>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Form Elements"
        subtitle="Clean inputs with subtle styling"
        className="py-24 px-6 bg-[#f5f5f7]"
        titleClassName="text-3xl font-semibold tracking-tight text-black mb-4 text-center"
        subtitleClassName="text-gray-500 mb-12 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-2xl font-semibold text-black mb-8">Sign in</h3>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
              />
              <button className="w-full py-3 bg-[#0071e3] rounded-full text-white font-medium hover:bg-[#0077ed] transition-colors">
                Continue
              </button>
              <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <a href="#" className="text-[#0071e3] hover:underline">
                  Create yours now
                </a>
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Typography */}
      <ShowcaseSection
        title="Typography"
        subtitle="SF Pro-inspired font hierarchy"
        className="py-24 px-6"
        titleClassName="text-3xl font-semibold tracking-tight text-black mb-4 text-center"
        subtitleClassName="text-gray-500 mb-12 text-center"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-black mb-2">
              Display Large
            </h1>
            <p className="text-sm text-gray-500 font-mono">text-5xl md:text-7xl font-semibold tracking-tight</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black mb-2">
              Headline
            </h2>
            <p className="text-sm text-gray-500 font-mono">text-4xl md:text-5xl font-semibold tracking-tight</p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-black mb-2">
              Title
            </h3>
            <p className="text-sm text-gray-500 font-mono">text-2xl md:text-3xl font-semibold tracking-tight</p>
          </div>
          <div>
            <p className="text-base md:text-lg text-gray-600 mb-2">
              Body text with comfortable reading size and line height for optimal readability.
            </p>
            <p className="text-sm text-gray-500 font-mono">text-base md:text-lg text-gray-600</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Dark Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6">
            Think different
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Innovation that moves the world forward. Design that inspires.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-8 py-4 bg-white rounded-full text-black font-medium hover:bg-gray-100 transition-colors">
              Explore products
            </button>
            <a href="#" className="px-8 py-4 text-[#2997ff] hover:underline font-medium flex items-center">
              Watch the film &gt;
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#f5f5f7]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Apple Style Showcase · Part of{" "}
            <Link href="/" className="text-[#0071e3] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
