"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Star, Sun, Cloud, Music, Camera, Sparkles, Gift } from "lucide-react";

function PastelCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-3xl p-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-pink-100 ${className}`}>
      {children}
    </div>
  );
}

function PastelBadge({ children, color = "pink" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    pink: "bg-pink-100 text-pink-500",
    purple: "bg-purple-100 text-purple-500",
    cyan: "bg-cyan-100 text-cyan-500",
    yellow: "bg-amber-100 text-amber-600",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

export default function KawaiiMinimalShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] text-gray-700">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 px-6 md:px-8 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/styles/kawaii-minimal" className="flex items-center gap-2 text-pink-400 hover:text-pink-500 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-800 font-semibold text-sm hidden sm:inline">Kawaii Minimal</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/styles" className="text-gray-400 hover:text-gray-600 transition-colors text-sm">
              All Styles
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-8 pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-pink-100 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-pink-500 text-xs font-medium">Kawaii Design System</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Cute &amp; <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Minimal</span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            A gentle blend of Japanese kawaii culture and minimalist design.
            Soft pastels, rounded shapes, and delightful micro-interactions.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 font-medium">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white border-2 border-pink-200 text-pink-400 rounded-full hover:bg-pink-50 hover:border-pink-300 hover:scale-105 active:scale-95 transition-all duration-200 font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Sun, color: "from-amber-200 to-yellow-200", title: "Bright & Warm", desc: "Warm white backgrounds with pastel accents create a welcoming atmosphere." },
              { icon: Heart, color: "from-pink-200 to-rose-200", title: "Soft & Round", desc: "Large rounded corners and circular elements bring a gentle, friendly feel." },
              { icon: Star, color: "from-purple-200 to-indigo-200", title: "Playful Motion", desc: "Bouncy hover effects and gentle transitions add delightful interactions." },
            ].map((f) => (
              <PastelCard key={f.title}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-gray-800 font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </PastelCard>
            ))}
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons */}
            <PastelCard>
              <h3 className="text-gray-800 font-semibold mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2.5 bg-pink-300 text-white rounded-full shadow-sm hover:bg-pink-400 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 font-medium text-sm">
                  Primary
                </button>
                <button className="px-5 py-2.5 bg-purple-300 text-white rounded-full shadow-sm hover:bg-purple-400 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 font-medium text-sm">
                  Secondary
                </button>
                <button className="px-5 py-2.5 bg-white border-2 border-pink-200 text-pink-400 rounded-full hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all duration-200 font-medium text-sm">
                  Outline
                </button>
                <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-200 to-blue-200 text-blue-600 rounded-full shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 font-medium text-sm">
                  Pastel
                </button>
              </div>
            </PastelCard>

            {/* Inputs */}
            <PastelCard>
              <h3 className="text-gray-800 font-semibold mb-4">Inputs</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full px-4 py-2.5 bg-white border-2 border-pink-200 rounded-2xl text-gray-700 placeholder:text-pink-300 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200 text-sm"
                  placeholder="Your name..."
                />
                <input
                  type="email"
                  className="w-full px-4 py-2.5 bg-white border-2 border-purple-200 rounded-2xl text-gray-700 placeholder:text-purple-300 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-sm"
                  placeholder="Email address..."
                />
              </div>
            </PastelCard>

            {/* Badges */}
            <PastelCard>
              <h3 className="text-gray-800 font-semibold mb-4">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <PastelBadge color="pink">Kawaii</PastelBadge>
                <PastelBadge color="purple">Minimal</PastelBadge>
                <PastelBadge color="cyan">Fresh</PastelBadge>
                <PastelBadge color="yellow">Warm</PastelBadge>
              </div>
            </PastelCard>

            {/* List */}
            <PastelCard>
              <h3 className="text-gray-800 font-semibold mb-4">Activity</h3>
              <div className="space-y-3">
                {[
                  { icon: Camera, text: "Photo uploaded", time: "2m ago", color: "bg-pink-100 text-pink-400" },
                  { icon: Music, text: "Playlist created", time: "1h ago", color: "bg-purple-100 text-purple-400" },
                  { icon: Gift, text: "Gift received", time: "3h ago", color: "bg-amber-100 text-amber-500" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm font-medium">{item.text}</p>
                      <p className="text-gray-400 text-xs">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PastelCard>
          </div>
        </div>
      </section>

      {/* Stats / Metrics */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "12", label: "Color Variants" },
                { value: "24", label: "Components" },
                { value: "6", label: "Animations" },
                { value: "100%", label: "Cuteness" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{s.value}</p>
                  <p className="text-gray-500 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Warm White", hex: "#FFF7ED", bg: "bg-[#FFF7ED]", text: "text-gray-500" },
              { name: "Soft Pink", hex: "#F9A8D4", bg: "bg-pink-300", text: "text-white" },
              { name: "Soft Purple", hex: "#A78BFA", bg: "bg-purple-400", text: "text-white" },
              { name: "Soft Cyan", hex: "#67E8F9", bg: "bg-cyan-300", text: "text-gray-700" },
              { name: "Soft Yellow", hex: "#FDE68A", bg: "bg-amber-200", text: "text-gray-700" },
              { name: "Light Pink", hex: "#FCE7F3", bg: "bg-pink-100", text: "text-pink-500" },
              { name: "Light Purple", hex: "#EDE9FE", bg: "bg-purple-100", text: "text-purple-500" },
              { name: "Text Dark", hex: "#1F2937", bg: "bg-gray-800", text: "text-white" },
              { name: "Text Medium", hex: "#6B7280", bg: "bg-gray-500", text: "text-white" },
              { name: "White Card", hex: "#FFFFFF", bg: "bg-white", text: "text-gray-500" },
            ].map((c) => (
              <div key={c.name} className={`${c.bg} rounded-2xl p-4 border border-pink-100/50`}>
                <p className={`${c.text} text-xs font-medium`}>{c.name}</p>
                <p className={`${c.text} text-[10px] opacity-70 mt-0.5`}>{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-pink-100 px-6 md:px-8 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">Kawaii Minimal Design System</p>
          <div className="flex gap-4">
            <Link href="/styles/kawaii-minimal" className="text-pink-400 text-sm font-medium hover:text-pink-500 transition-colors">
              Documentation
            </Link>
            <Link href="/styles" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
              All Styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
