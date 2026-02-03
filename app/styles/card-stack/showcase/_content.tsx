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
  Palette,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Glassmorphism color palette
const colors: ColorItem[] = [
  { name: "Deep Blue", hex: "#1e1b4b", bg: "bg-indigo-950" },
  { name: "Purple", hex: "#7c3aed", bg: "bg-violet-600" },
  { name: "Cyan", hex: "#06b6d4", bg: "bg-cyan-500" },
  { name: "Pink", hex: "#ec4899", bg: "bg-pink-500" },
  { name: "Glass White", hex: "#ffffff", bg: "bg-white/20", border: true },
];

// Design rules
const designRules = [
  { title: "Glass Effect", desc: "bg-white/10 backdrop-blur-xl for frosted glass" },
  { title: "Subtle Borders", desc: "border border-white/20 for glass edges" },
  { title: "Gradient Backgrounds", desc: "Rich gradients behind glass elements" },
  { title: "Soft Shadows", desc: "shadow-xl with low opacity for depth" },
  { title: "Transform Stack", desc: "scale and translateY for layering" },
  { title: "Smooth Transitions", desc: "transition-all duration-500 for animations" },
];

// Subscription plans for demo
const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for individuals",
    features: ["5 Projects", "Basic Analytics", "Email Support"],
    gradient: "from-violet-500/80 to-purple-600/80",
    icon: Zap,
  },
  {
    name: "Professional",
    price: "$29",
    description: "For growing teams",
    features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Custom Domain"],
    gradient: "from-cyan-500/80 to-blue-600/80",
    icon: Star,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large organizations",
    features: ["Everything in Pro", "Dedicated Manager", "SLA Guarantee", "Custom Integrations", "On-premise Option"],
    gradient: "from-pink-500/80 to-rose-600/80",
    icon: Crown,
  },
];

export default function ShowcaseContent() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % plans.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
      {/* Floating orbs for background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/card-stack"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-white">Card Stack</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm hover:bg-white/20 transition-colors border border-white/20"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* 视觉风格标注 */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium mb-4 border border-white/20">
            <Palette className="w-4 h-4" />
            <span>视觉风格: Glassmorphism</span>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium mb-8 ml-2 border border-white/20">
            <Layers className="w-4 h-4" />
            <span>Card Stack Layout</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Card Stack
          </h1>
          <p className="text-xl text-white/70 max-w-xl mx-auto">
            Create visual depth with layered glass cards that stack and fan out, perfect for showcasing options.
          </p>
        </div>
      </section>

      {/* Interactive Card Stack Demo */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-white/60">Click arrows or cards to browse options</p>
          </div>

          {/* Card Stack */}
          <div className="relative h-[520px] flex items-center justify-center mb-8">
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
                  ? "translateY(30px) scale(0.92)"
                  : "translateY(-30px) scale(0.92)";
                zIndex = 20;
                opacity = 0.5;
              } else if (isBehind2) {
                transform = offset === 2
                  ? "translateY(60px) scale(0.84)"
                  : "translateY(-60px) scale(0.84)";
                zIndex = 10;
                opacity = 0.25;
              }

              return (
                <div
                  key={plan.name}
                  className="absolute w-80 cursor-pointer transition-all duration-500 ease-out"
                  style={{ transform, zIndex, opacity }}
                  onClick={() => !isActive && setCurrentIndex(index)}
                >
                  {/* Glass card */}
                  <div className={`relative p-8 bg-gradient-to-br ${plan.gradient} backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden`}>
                    {/* Glass overlay */}
                    <div className="absolute inset-0 bg-white/10" />

                    {/* Shine effect */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 rounded-full blur-3xl" />

                    {plan.popular && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/30">
                        Popular
                      </div>
                    )}

                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                        <plan.icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-white/70 mb-4">{plan.description}</p>

                      <div className="text-4xl font-bold text-white mb-6">
                        {plan.price}
                        <span className="text-lg font-normal text-white/60">/mo</span>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-white/90">
                            <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="w-full py-3.5 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/20"
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
                      ? "w-8 h-3 bg-white"
                      : "w-3 h-3 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Glass Palette"
        subtitle="Colors that glow through frosted glass"
        className="relative py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-xl overflow-hidden border border-white/20"
            labelClassName="font-semibold text-sm text-white"
            hexClassName="text-xs text-white/50 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Stack Styles Demo */}
      <ShowcaseSection
        title="Stack Variations"
        subtitle="Different arrangements for glass cards"
        className="relative py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Vertical Stack */}
          <div className="text-center">
            <div className="relative h-64 flex items-center justify-center mb-6">
              <div className="absolute w-48 h-32 bg-white/5 backdrop-blur-md rounded-2xl transform translate-y-8 scale-90 border border-white/10" />
              <div className="absolute w-48 h-32 bg-white/10 backdrop-blur-md rounded-2xl transform translate-y-4 scale-95 border border-white/15" />
              <div className="absolute w-48 h-32 bg-gradient-to-br from-violet-500/50 to-purple-600/50 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20" />
            </div>
            <h3 className="font-semibold text-white mb-2">Vertical Stack</h3>
            <p className="text-sm text-white/50">Cards offset vertically</p>
          </div>

          {/* Fan Out Stack */}
          <div className="text-center">
            <div className="relative h-64 flex items-center justify-center mb-6">
              <div className="absolute w-48 h-32 bg-white/5 backdrop-blur-md rounded-2xl transform -rotate-6 translate-x-4 border border-white/10" />
              <div className="absolute w-48 h-32 bg-white/10 backdrop-blur-md rounded-2xl transform -rotate-3 translate-x-2 border border-white/15" />
              <div className="absolute w-48 h-32 bg-gradient-to-br from-cyan-500/50 to-blue-600/50 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20" />
            </div>
            <h3 className="font-semibold text-white mb-2">Fan Out</h3>
            <p className="text-sm text-white/50">Cards rotate slightly</p>
          </div>

          {/* Perspective Stack */}
          <div className="text-center">
            <div className="relative h-64 flex items-center justify-center mb-6">
              <div className="absolute w-48 h-32 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10" style={{ transform: "translateY(32px) scale(0.85) rotateX(5deg)" }} />
              <div className="absolute w-48 h-32 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15" style={{ transform: "translateY(16px) scale(0.9) rotateX(3deg)" }} />
              <div className="absolute w-48 h-32 bg-gradient-to-br from-pink-500/50 to-rose-600/50 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20" />
            </div>
            <h3 className="font-semibold text-white mb-2">3D Perspective</h3>
            <p className="text-sm text-white/50">Cards tilt back in space</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Principles"
        subtitle="Key patterns for glassmorphism card stacks"
        className="relative py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="font-semibold text-white mb-2">{rule.title}</h4>
                <p className="text-sm text-white/50">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Use Cases */}
      <ShowcaseSection
        title="Use Cases"
        subtitle="When to use Card Stack layout"
        className="relative py-16 px-6"
        titleClassName="text-3xl font-bold text-white mb-4 text-center"
        subtitleClassName="text-white/60 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          {[
            { icon: Star, title: "Pricing Plans", desc: "Showcase different tiers with visual hierarchy" },
            { icon: Sparkles, title: "Product Carousel", desc: "Browse products with swipe interactions" },
            { icon: MousePointer, title: "Onboarding Steps", desc: "Guide users through setup process" },
            { icon: Repeat, title: "Card Games", desc: "Tinder-style swipe interactions" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            Card Stack Showcase{" "}
            <Link href="/" className="text-white/70 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
