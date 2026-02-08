"use client";

import Link from "next/link";
import { ArrowLeft, CreditCard, Zap, Shield, Code } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Stripe 閰嶈壊
const colors: ColorItem[] = [
  { name: "Stripe Purple", hex: "#635bff", bg: "bg-[#635bff]" },
  { name: "Dark Blue", hex: "#0a2540", bg: "bg-[#0a2540]" },
  { name: "Cyan", hex: "#00d4ff", bg: "bg-[#00d4ff]" },
  { name: "Light Purple", hex: "#7a73ff", bg: "bg-[#7a73ff]" },
  { name: "Background", hex: "#f6f9fc", bg: "bg-[#f6f9fc]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/stripe-style"
            className="flex items-center gap-2 text-[#0a2540] hover:text-[#635bff] transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <span className="font-bold text-xl text-[#635bff]">stripe</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#635bff] text-white rounded-lg font-medium hover:bg-[#5851ea] transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section with Grid Background */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99,91,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99,91,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <ShowcaseHero
          title="Stripe Style"
          description="Professional fintech design with Stripe purple, gradient grid backgrounds, refined card shadows, and smooth animations."
          className="relative pt-20 pb-16 px-6 text-center"
          titleClassName="text-5xl md:text-7xl font-bold text-[#0a2540] mb-6"
          descriptionClassName="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-[#635bff] text-white rounded-full font-semibold shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)] hover:shadow-[0_4px_8px_rgba(99,91,255,0.3),0_8px_16px_rgba(99,91,255,0.2)] hover:-translate-y-0.5 transition-all duration-200">
              Start now
            </button>
            <button className="px-8 py-4 bg-white text-[#0a2540] rounded-full font-semibold shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200">
              Contact sales
            </button>
          </div>
        </ShowcaseHero>
      </div>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Professional palette with Stripe purple"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-[#0a2540] mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-xl overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]"
            labelClassName="font-semibold text-sm text-gray-700"
            hexClassName="text-xs text-gray-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Refined buttons with lift effects"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-[#0a2540] mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="p-8 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">Variants</p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)] hover:shadow-[0_4px_8px_rgba(99,91,255,0.3),0_8px_16px_rgba(99,91,255,0.2)] hover:-translate-y-0.5 transition-all duration-200">
                Primary
              </button>
              <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200">
                Secondary
              </button>
              <button className="px-6 py-3 text-[#635bff] font-medium hover:bg-[#f6f9fc] rounded-lg transition-colors">
                Ghost
              </button>
            </div>

            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6 mt-10">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-4 py-2 text-sm bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)] hover:-translate-y-0.5 transition-all duration-200">
                Small
              </button>
              <button className="px-6 py-3 bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)] hover:-translate-y-0.5 transition-all duration-200">
                Medium
              </button>
              <button className="px-8 py-4 text-lg bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)] hover:-translate-y-0.5 transition-all duration-200">
                Large
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        subtitle="Elegant cards with refined shadows"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-[#0a2540] mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-[#635bff] to-[#00d4ff] rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Payments</h3>
            <p className="text-gray-600">Accept payments online with a complete platform</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-[#635bff] to-[#7a73ff] rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Instant Payouts</h3>
            <p className="text-gray-600">Get paid faster with instant transfers</p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#635bff] rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Security</h3>
            <p className="text-gray-600">Enterprise-grade security and compliance</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Form Elements */}
      <ShowcaseSection
        title="Form Elements"
        subtitle="Clean inputs with focus states"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-[#0a2540] mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            <h3 className="text-2xl font-semibold text-[#0a2540] mb-6">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Card number</label>
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <button className="w-full py-3 bg-[#635bff] text-white rounded-lg font-semibold shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)] hover:-translate-y-0.5 transition-all duration-200">
                Pay now
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Code Block */}
      <ShowcaseSection
        title="Developer Experience"
        subtitle="Clean code examples with syntax highlighting"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-[#0a2540] mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0a2540] rounded-xl p-6 shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-sm font-mono text-gray-400">stripe-integration.js</span>
            </div>
            <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
              <code>{`const stripe = require('stripe')('sk_test_...');

const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method_types: ['card'],
});`}</code>
            </pre>
          </div>
        </div>
      </ShowcaseSection>

      {/* Pricing Cards */}
      <ShowcaseSection
        title="Pricing"
        subtitle="Clear pricing tiers"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-[#0a2540] mb-4 text-center"
        subtitleClassName="text-gray-600 mb-10 text-center"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-white rounded-xl border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Starter</h3>
            <div className="text-4xl font-bold text-[#0a2540] mb-4">$0</div>
            <p className="text-gray-600 mb-6">For small businesses</p>
            <button className="w-full py-2 border border-gray-300 rounded-lg text-[#0a2540] font-medium hover:bg-gray-50 transition-colors">
              Get started
            </button>
          </div>

          <div className="p-8 bg-[#635bff] rounded-xl shadow-[0_4px_8px_rgba(99,91,255,0.3),0_8px_16px_rgba(99,91,255,0.2)] transform scale-105">
            <h3 className="text-xl font-semibold text-white mb-2">Professional</h3>
            <div className="text-4xl font-bold text-white mb-4">$99</div>
            <p className="text-white/80 mb-6">For growing companies</p>
            <button className="w-full py-2 bg-white text-[#635bff] rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Get started
            </button>
          </div>

          <div className="p-8 bg-white rounded-xl border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold text-[#0a2540] mb-2">Enterprise</h3>
            <div className="text-4xl font-bold text-[#0a2540] mb-4">Custom</div>
            <p className="text-gray-600 mb-6">For large organizations</p>
            <button className="w-full py-2 border border-gray-300 rounded-lg text-[#0a2540] font-medium hover:bg-gray-50 transition-colors">
              Contact sales
            </button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            Stripe Style Showcase 路 Part of{" "}
            <Link href="/" className="text-[#635bff] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

