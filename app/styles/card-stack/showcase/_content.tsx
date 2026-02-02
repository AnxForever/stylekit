"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Crown,
  Check,
  Layers,
  Sparkles,
  MousePointer,
  Repeat,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Card Stack color palette
const colors: ColorItem[] = [
  { name: "Dark", hex: "#1a1a2e", bg: "bg-[#1a1a2e]" },
  { name: "Light", hex: "#f0f0f5", bg: "bg-[#f0f0f5]", border: true },
  { name: "Purple", hex: "#6c5ce7", bg: "bg-[#6c5ce7]" },
  { name: "Teal", hex: "#00cec9", bg: "bg-[#00cec9]" },
  { name: "Pink", hex: "#fd79a8", bg: "bg-[#fd79a8]" },
];

// Design rules
const designRules = [
  { title: "Transform Stack", desc: "Use scale and translateY for layering" },
  { title: "Z-Index Layers", desc: "z-30, z-20, z-10 for proper stacking" },
  { title: "Progressive Opacity", desc: "100%, 75%, 50% for depth effect" },
  { title: "Limited Cards", desc: "Show only 3-5 cards maximum" },
  { title: "Smooth Transitions", desc: "transition-all duration-300 for animations" },
  { title: "Clear Focus", desc: "Front card should be most prominent" },
];

// Pricing plans for demo
const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for individuals",
    features: ["5 Projects", "Basic Analytics", "Email Support"],
    color: "from-purple-500 to-indigo-600",
    icon: Zap,
  },
  {
    name: "Professional",
    price: "$29",
    description: "For growing teams",
    features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Custom Domain"],
    color: "from-emerald-500 to-teal-600",
    icon: Star,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large organizations",
    features: ["Everything in Pro", "Dedicated Account Manager", "SLA Guarantee", "Custom Integrations", "On-premise Option"],
    color: "from-amber-500 to-orange-600",
    icon: Crown,
  },
];

export default function ShowcaseContent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % plans.length);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/card-stack"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-white">Card Stack</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium mb-8">
            <Layers className="w-4 h-4" />
            <span>3D Depth Effect</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Card Stack
          </h1>
          <p className="text-xl text-slate-400">
            Create visual depth with layered cards that stack and fan out, perfect for showcasing options or content.
          </p>
        </div>
      </section>

      {/* Interactive Card Stack Demo */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-slate-400">Click arrows or cards to browse options</p>
          </div>

          {/* Card Stack */}
          <div className="relative h-[480px] flex items-center justify-center mb-8">
            {plans.map((plan, index) => {
              const offset = (index - currentIndex + plans.length) % plans.length;
              const isActive = offset === 0;
              const isBehind1 = offset === 1 || offset === plans.length - 1;
              const isBehind2 = offset === 2 || offset === plans.length - 2;

              let transform = "";
              let zIndex = 10;
              let opacity = 0.3;

              if (isActive) {
                transform = "translateY(0) scale(1)";
                zIndex = 30;
                opacity = 1;
              } else if (isBehind1) {
                transform = offset === 1
                  ? "translateY(24px) scale(0.95)"
                  : "translateY(-24px) scale(0.95)";
                zIndex = 20;
                opacity = 0.6;
              } else if (isBehind2) {
                transform = offset === 2
                  ? "translateY(48px) scale(0.9)"
                  : "translateY(-48px) scale(0.9)";
                zIndex = 10;
                opacity = 0.3;
              }

              return (
                <div
                  key={plan.name}
                  className="absolute w-80 cursor-pointer transition-all duration-500 ease-out"
                  style={{ transform, zIndex, opacity }}
                  onClick={() => !isActive && setCurrentIndex(index)}
                >
                  <div className={`p-8 bg-gradient-to-br ${plan.color} rounded-2xl shadow-2xl text-white relative overflow-hidden`}>
                    {plan.popular && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                        Popular
                      </div>
                    )}

                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                      <plan.icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-white/70 mb-4">{plan.description}</p>

                    <div className="text-4xl font-bold mb-6">
                      {plan.price}
                      <span className="text-lg font-normal text-white/60">/mo</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/90">
                          <Check className="w-4 h-4 text-white" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                      Get Started
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {plans.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all ${
                    i === currentIndex
                      ? "w-3 h-3 bg-white"
                      : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Rich gradients for visual depth"
        className="py-16 px-6 bg-slate-800"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-slate-400 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden"
            labelClassName="font-semibold text-sm text-white"
            hexClassName="text-xs text-slate-400 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Static Stack Demo */}
      <ShowcaseSection
        title="Stack Styles"
        subtitle="Different stack arrangements"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-slate-400 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Vertical Stack */}
          <div className="text-center">
            <div className="relative h-64 flex items-center justify-center mb-6">
              <div className="absolute w-48 h-32 bg-slate-600 rounded-xl transform translate-y-6 scale-90 opacity-50" />
              <div className="absolute w-48 h-32 bg-slate-500 rounded-xl transform translate-y-3 scale-95 opacity-75" />
              <div className="absolute w-48 h-32 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-xl" />
            </div>
            <h3 className="font-semibold text-white mb-2">Vertical Stack</h3>
            <p className="text-sm text-slate-400">Cards offset vertically</p>
          </div>

          {/* Fan Out Stack */}
          <div className="text-center">
            <div className="relative h-64 flex items-center justify-center mb-6">
              <div className="absolute w-48 h-32 bg-slate-600 rounded-xl transform -rotate-6 translate-x-4 opacity-50" />
              <div className="absolute w-48 h-32 bg-slate-500 rounded-xl transform -rotate-3 translate-x-2 opacity-75" />
              <div className="absolute w-48 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-xl" />
            </div>
            <h3 className="font-semibold text-white mb-2">Fan Out</h3>
            <p className="text-sm text-slate-400">Cards rotate slightly</p>
          </div>

          {/* Perspective Stack */}
          <div className="text-center">
            <div className="relative h-64 flex items-center justify-center mb-6 perspective-1000">
              <div className="absolute w-48 h-32 bg-slate-600 rounded-xl transform translate-y-8 scale-85 opacity-40" style={{ transform: "translateY(32px) scale(0.85) rotateX(5deg)" }} />
              <div className="absolute w-48 h-32 bg-slate-500 rounded-xl transform translate-y-4 scale-90 opacity-60" style={{ transform: "translateY(16px) scale(0.9) rotateX(3deg)" }} />
              <div className="absolute w-48 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-xl" />
            </div>
            <h3 className="font-semibold text-white mb-2">3D Perspective</h3>
            <p className="text-sm text-slate-400">Cards tilt back in space</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for Card Stack layouts"
        className="py-16 px-6 bg-slate-800"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-slate-400 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-5 bg-slate-700/50 rounded-xl">
                <h4 className="font-semibold text-white mb-2">{rule.title}</h4>
                <p className="text-sm text-slate-400">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Use Cases */}
      <ShowcaseSection
        title="Use Cases"
        subtitle="When to use Card Stack layout"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-slate-400 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Star, title: "Pricing Plans", desc: "Showcase different tiers with visual hierarchy" },
            { icon: Sparkles, title: "Product Carousel", desc: "Browse products with swipe interactions" },
            { icon: MousePointer, title: "Onboarding Steps", desc: "Guide users through setup process" },
            { icon: Repeat, title: "Card Games", desc: "Tinder-style swipe interactions" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-slate-800 rounded-xl">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            Card Stack Showcase{" "}
            <Link href="/" className="text-slate-300 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
