"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Rocket,
  Zap,
  CheckCircle,
  Users,
  Palette,
  Sparkles,
  Smartphone,
  Shield,
  Globe,
  BarChart3,
  Plug,
  MessageCircle,
  Target,
  Settings,
  TrendingUp,
  Bell,
  X,
  ChevronRight,
  Star,
  Heart,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Bento Grid 閰嶈壊
const colors: ColorItem[] = [
  { name: "Primary", hex: "#3b82f6", bg: "bg-blue-500" },
  { name: "Secondary", hex: "#8b5cf6", bg: "bg-purple-500" },
  { name: "Background", hex: "#fafafa", bg: "bg-zinc-50" },
  { name: "Surface", hex: "#ffffff", bg: "bg-white", border: true },
  { name: "Text", hex: "#18181b", bg: "bg-zinc-900" },
];

// 璁捐瑙勫垯
const designRules = [
  { title: "涓嶈鍒欑綉鏍?, desc: "col-span 鍜?row-span 鍒涢€犲ぇ灏忎笉涓€鐨勫崱鐗? },
  { title: "澶у渾瑙?, desc: "rounded-2xl 鎴?rounded-3xl 钀ラ€犲弸濂芥劅" },
  { title: "鏌斿拰鑹插僵", desc: "浣跨敤 bg-*-50 鎴?bg-*-100 鐨勬祬鑹茶儗鏅? },
  { title: "娓愬彉寮鸿皟", desc: "閲嶈鍗＄墖浣跨敤娓愬彉鑳屾櫙绐佸嚭灞傛" },
  { title: "寰闃村奖", desc: "shadow-sm 閰嶅悎 hover:shadow-md 杩囨浮" },
  { title: "缁熶竴闂磋窛", desc: "gap-4 淇濇寔缃戞牸椤逛箣闂寸殑涓€鑷存€? },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/bento-grid"
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <span className="font-bold text-xl text-zinc-900">Bento Grid</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-sm hover:bg-zinc-800 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <ShowcaseHero
        title="Bento Grid"
        description="Inspired by Japanese bento boxes, this layout creates visual hierarchy through irregular grid arrangements with varying card sizes."
        className="pt-32 pb-16 px-6 text-center"
        titleClassName="text-5xl md:text-6xl font-bold text-zinc-900 mb-6"
        descriptionClassName="text-xl text-zinc-600 max-w-2xl mx-auto mb-10"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-lg">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-semibold border border-zinc-200 hover:border-zinc-400 transition-colors shadow-sm">
            Learn More
          </button>
        </div>
      </ShowcaseHero>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Soft, approachable colors with vibrant accents"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm"
            labelClassName="font-semibold text-sm text-zinc-900"
            hexClassName="text-xs text-zinc-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Main Bento Grid Demo */}
      <ShowcaseSection
        title="Bento Layout"
        subtitle="Irregular grid with varying card sizes for visual interest"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Large Card - 2x2 */}
            <div className="md:col-span-2 md:row-span-2 p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl text-white">
              <div className="h-full flex flex-col justify-between min-h-[280px]">
                <div>
                  <Rocket className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Main Feature</h3>
                  <p className="text-white/80">
                    The largest card commands attention, perfect for showcasing your primary value proposition.
                  </p>
                </div>
                <button className="mt-6 px-6 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors w-fit">
                  Learn More <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </div>

            {/* Wide Card */}
            <div className="md:col-span-2 p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1">Quick Deploy</h3>
                  <p className="text-zinc-600 text-sm">
                    One-click deployment to any modern hosting platform including Vercel and Netlify.
                  </p>
                </div>
              </div>
            </div>

            {/* Small Card 1 */}
            <div className="p-6 bg-green-100 rounded-2xl">
              <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-zinc-900">99.9%</h3>
              <p className="text-zinc-600 text-sm">Uptime SLA</p>
            </div>

            {/* Small Card 2 */}
            <div className="p-6 bg-pink-100 rounded-2xl">
              <Users className="w-8 h-8 text-pink-600 mb-3" />
              <h3 className="font-semibold text-zinc-900">10K+</h3>
              <p className="text-zinc-600 text-sm">Active Users</p>
            </div>

            {/* Tall Card */}
            <div className="md:row-span-2 p-6 bg-zinc-900 rounded-2xl text-white">
              <Palette className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-3">Design System</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Complete design specs and component library for consistent UX.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" /> 50+ Components
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" /> Dark Mode
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" /> Responsive
                </li>
              </ul>
            </div>

            {/* Wide Card 2 */}
            <div className="md:col-span-2 p-6 bg-amber-100 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-1">New Features Coming</h3>
                  <p className="text-zinc-600 text-sm">More exciting features in development</p>
                </div>
                <Sparkles className="w-10 h-10 text-amber-600" />
              </div>
            </div>

            {/* Small Card 3 */}
            <div className="p-6 bg-cyan-100 rounded-2xl text-center">
              <Smartphone className="w-8 h-8 text-cyan-600 mx-auto" />
              <p className="text-zinc-600 text-sm mt-2">Mobile First</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Buttons */}
      <ShowcaseSection
        title="Buttons"
        subtitle="Rounded buttons with gradient and solid variants"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-6">Variants</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md">
                Gradient
              </button>
              <button className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-colors">
                Primary
              </button>
              <button className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-semibold border border-zinc-200 hover:border-zinc-400 transition-colors">
                Secondary
              </button>
              <button className="px-6 py-3 text-zinc-600 hover:text-zinc-900 transition-colors">
                Ghost
              </button>
            </div>

            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-6">Colored</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">Blue</button>
              <button className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">Green</button>
              <button className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">Red</button>
              <button className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors">Amber</button>
            </div>

            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-6">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-4 py-2 text-sm bg-zinc-900 text-white rounded-lg font-semibold">Small</button>
              <button className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-semibold">Medium</button>
              <button className="px-8 py-4 text-lg bg-zinc-900 text-white rounded-2xl font-semibold">Large</button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Card Variants"
        subtitle="Different card styles for various content types"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Feature Card */}
          <div className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Feature Card</h3>
            <p className="text-zinc-600 text-sm">Standard feature card with icon, title, and description.</p>
          </div>

          {/* Stats Card */}
          <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white">
            <p className="text-white/70 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold mb-2">$84,254</p>
            <div className="flex items-center gap-1 text-green-300 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </div>

          {/* Action Card */}
          <div className="p-6 bg-zinc-900 rounded-2xl text-white">
            <h3 className="text-lg font-semibold mb-2">Dark Card</h3>
            <p className="text-zinc-400 text-sm mb-4">Perfect for highlighting important content.</p>
            <button className="px-4 py-2 bg-white text-zinc-900 rounded-lg font-semibold text-sm hover:bg-zinc-100 transition-colors">
              Take Action
            </button>
          </div>

          {/* Image Card */}
          <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white">
            <div className="h-40 bg-gradient-to-br from-cyan-400 to-blue-500"></div>
            <div className="p-5">
              <h3 className="font-semibold text-zinc-900 mb-1">Image Card</h3>
              <p className="text-zinc-600 text-sm">Card with image header.</p>
            </div>
          </div>

          {/* Interactive Card */}
          <div className="p-6 bg-white rounded-2xl border border-zinc-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
            <h3 className="font-semibold text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors">
              Interactive Card
            </h3>
            <p className="text-zinc-600 text-sm mb-4">Hover me to see the effect!</p>
            <div className="flex gap-2">
              <button className="p-2 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors">
                <Heart className="w-4 h-4 text-zinc-600" />
              </button>
              <button className="p-2 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors">
                <Share2 className="w-4 h-4 text-zinc-600" />
              </button>
              <button className="p-2 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors">
                <MoreHorizontal className="w-4 h-4 text-zinc-600" />
              </button>
            </div>
          </div>

          {/* Colored Background Card */}
          <div className="p-6 bg-amber-100 rounded-2xl">
            <Star className="w-8 h-8 text-amber-600 mb-3" />
            <h3 className="font-semibold text-zinc-900 mb-1">Colored Card</h3>
            <p className="text-zinc-600 text-sm">Soft colored backgrounds for categorization.</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Tabs */}
      <ShowcaseSection
        title="Tabs"
        subtitle="Clean tab navigation with rounded indicators"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-200">
            <div className="flex gap-2 p-1 bg-zinc-200 rounded-xl mb-6">
              {["Overview", "Analytics", "Settings"].map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                    activeTab === i
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4 bg-white rounded-xl border border-zinc-200 text-zinc-600">
              {activeTab === 0 && "Overview content - Quick summary of your dashboard metrics and key insights."}
              {activeTab === 1 && "Analytics content - Detailed charts and performance data visualization."}
              {activeTab === 2 && "Settings content - Configure your preferences and account options."}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Alerts */}
      <ShowcaseSection
        title="Alerts"
        subtitle="Notification cards with status indicators"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-xl mx-auto space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-zinc-200 shadow-sm">
            <Bell className="w-5 h-5 text-zinc-500" />
            <span className="text-zinc-700 flex-1">Default notification message</span>
            <button className="text-zinc-400 hover:text-zinc-600"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 flex-1">Success! Your changes have been saved.</span>
            <button className="text-green-400 hover:text-green-600"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
            <X className="w-5 h-5 text-red-600" />
            <span className="text-red-800 flex-1">Error! Something went wrong.</span>
            <button className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <Bell className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800 flex-1">Warning! Please review before continuing.</span>
            <button className="text-amber-400 hover:text-amber-600"><X className="w-4 h-4" /></button>
          </div>
        </div>
      </ShowcaseSection>

      {/* Features Grid */}
      <ShowcaseSection
        title="Feature Grid"
        subtitle="Compact feature showcase with colored icons"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: "Secure", color: "bg-red-50", iconColor: "text-red-500" },
              { icon: Globe, title: "Global CDN", color: "bg-blue-50", iconColor: "text-blue-500" },
              { icon: BarChart3, title: "Analytics", color: "bg-green-50", iconColor: "text-green-500" },
              { icon: Plug, title: "API Ready", color: "bg-purple-50", iconColor: "text-purple-500" },
              { icon: MessageCircle, title: "Real-time", color: "bg-yellow-50", iconColor: "text-yellow-600" },
              { icon: Target, title: "Precise", color: "bg-pink-50", iconColor: "text-pink-500" },
              { icon: Settings, title: "Customizable", color: "bg-indigo-50", iconColor: "text-indigo-500" },
              { icon: TrendingUp, title: "Growing", color: "bg-orange-50", iconColor: "text-orange-500" },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 ${item.color} rounded-2xl text-center hover:scale-105 transition-transform cursor-pointer`}
              >
                <item.icon className={`w-8 h-8 ${item.iconColor} mx-auto mb-2`} />
                <h3 className="font-medium text-zinc-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for Bento Grid layouts"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-zinc-900 mb-4 text-center"
        subtitleClassName="text-zinc-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                <h4 className="font-semibold text-zinc-900 mb-2">{rule.title}</h4>
                <p className="text-sm text-zinc-600">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            Bento Grid Showcase 路 Part of{" "}
            <Link href="/" className="text-zinc-900 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

