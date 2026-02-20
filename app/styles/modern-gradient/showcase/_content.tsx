"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "Vivid Gradients",
    body: "Multi-stop color flows from violet through fuchsia to pink, creating depth and visual energy across every surface.",
    gradient: "from-violet-500 to-fuchsia-500",
    glow: "shadow-violet-500/30",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Glass Morphism",
    body: "Frosted glass panels with backdrop blur and subtle transparency create rich layered depth without visual noise.",
    gradient: "from-fuchsia-500 to-cyan-500",
    glow: "shadow-fuchsia-500/30",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Ambient Glow",
    body: "Soft colored light sources emanate from behind surfaces, giving the interface a luminous, atmospheric presence.",
    gradient: "from-cyan-500 to-violet-500",
    glow: "shadow-cyan-500/30",
  },
];

const gradientPalette = [
  { name: "Violet", hex: "#8B5CF6", tailwind: "bg-violet-500", textColor: "text-violet-300" },
  { name: "Fuchsia", hex: "#D946EF", tailwind: "bg-fuchsia-500", textColor: "text-fuchsia-300" },
  { name: "Pink", hex: "#EC4899", tailwind: "bg-pink-500", textColor: "text-pink-300" },
  { name: "Cyan", hex: "#06B6D4", tailwind: "bg-cyan-500", textColor: "text-cyan-300" },
  { name: "Amber", hex: "#F59E0B", tailwind: "bg-amber-500", textColor: "text-amber-300" },
  { name: "Indigo Deep", hex: "#1E1B4B", tailwind: "bg-indigo-950", textColor: "text-indigo-300" },
];

const gradientCombos = [
  { name: "Aurora", from: "from-violet-500", via: "via-fuchsia-500", to: "to-cyan-500" },
  { name: "Sunset", from: "from-pink-500", via: "via-rose-500", to: "to-amber-500" },
  { name: "Ocean", from: "from-cyan-500", via: "via-blue-500", to: "to-violet-500" },
  { name: "Nebula", from: "from-indigo-500", via: "via-purple-500", to: "to-fuchsia-500" },
];

const doList = [
  "Use bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 for gradients",
  "Apply backdrop-blur-xl bg-white/10 glass morphism on cards",
  "Use gradient + hover shift on buttons (bg-[length:200%_auto])",
  "Set dark base: bg-slate-950 or bg-[#1e1b4b]",
  "Use bg-gradient-to-r bg-clip-text text-transparent for headings",
  "Apply rounded-2xl or rounded-3xl corners throughout",
  "Add blur-3xl opacity-30 glow orbs as background decoration",
];

const dontList = [
  "Never use solid-color backgrounds for main sections",
  "Avoid monotone gray color schemes",
  "Never use sharp corners (rounded-none)",
  "Avoid old-style vertical gradient buttons",
  "Do not overuse gradients causing visual clutter",
  "Never use dark text on dark gradient backgrounds",
];

const typeScaleItems = [
  { label: "Display", size: "text-5xl md:text-7xl", weight: "font-black", sample: "Gradient" },
  { label: "H1", size: "text-4xl md:text-5xl", weight: "font-bold", sample: "Headline Copy" },
  { label: "H2", size: "text-2xl md:text-3xl", weight: "font-semibold", sample: "Section Header" },
  { label: "H3", size: "text-xl md:text-2xl", weight: "font-medium", sample: "Card Title" },
  { label: "Body", size: "text-base", weight: "font-normal", sample: "Readable paragraph text with comfortable line spacing." },
  { label: "Caption", size: "text-sm", weight: "font-normal", sample: "Small label or metadata text." },
];

const statItems = [
  { value: "10K+", label: "Active Users", gradient: "from-violet-500 to-fuchsia-500" },
  { value: "99.9%", label: "Uptime", gradient: "from-fuchsia-500 to-pink-500" },
  { value: "50ms", label: "Avg Response", gradient: "from-cyan-500 to-blue-500" },
  { value: "200+", label: "Components", gradient: "from-pink-500 to-amber-500" },
];

export default function ModernGradientShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCombo, setActiveCombo] = useState(0);

  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">

      {/* ─── Fixed Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <Link
            href="/styles"
            className="flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors duration-200"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">StyleKit</span>
          </Link>
          <div className="text-sm font-semibold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Modern Gradient
          </div>
          <Link
            href="/styles/modern-gradient"
            className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200"
          >
            Docs
          </Link>
        </div>
      </nav>

      {/* ─── Global Mesh Background Orbs ─── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-2/3 right-1/4 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[100px]" />
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 pt-32 md:pt-44 pb-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Mesh gradient behind hero text */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, #7c3aed 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, #d946ef 0%, transparent 60%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          {/* Tag pill */}
          <div
            ref={heroRef}
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-violet-500/30 backdrop-blur-sm text-xs font-medium text-violet-300 mb-8">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Visual Design System — Expressive Category
            </div>
          </div>

          <RevealBlock delay={0.15}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-6">
              <span
                className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: "text" }}
              >
                Modern
              </span>
              <span className="block text-white mt-1">Gradient</span>
            </h1>
          </RevealBlock>

          <RevealBlock delay={0.25}>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
              Vibrant multi-stop gradients, glass morphism surfaces, and ambient glow effects.
              A premium aesthetic for startups, digital products, and event pages that demand visual energy.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.35}>
            <div className="flex flex-wrap gap-4">
              {/* Primary gradient button */}
              <button
                className="px-8 py-4 rounded-2xl font-bold tracking-wide text-white
                           bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500
                           bg-[length:200%_auto] hover:bg-right
                           shadow-[0_8px_20px_rgba(167,139,250,0.3)]
                           hover:shadow-[0_15px_30px_rgba(217,70,239,0.4)]
                           hover:-translate-y-1 hover:scale-[1.02]
                           active:scale-95
                           transition-all duration-500 ease-out"
              >
                Get Started
              </button>
              {/* Outline gradient button */}
              <button
                className="px-8 py-4 rounded-2xl font-bold relative group
                           hover:-translate-y-1 hover:scale-[1.02]
                           transition-all duration-500 ease-out"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl" />
                <span className="absolute inset-[2px] bg-slate-950 rounded-[14px] group-hover:bg-slate-900 transition-colors duration-500" />
                <span className="relative bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  View Docs
                </span>
              </button>
              {/* Glass button */}
              <button
                className="px-8 py-4 rounded-2xl font-bold
                           backdrop-blur-xl bg-white/10 border border-white/20 text-white
                           hover:bg-white/20 hover:border-violet-400/50
                           hover:shadow-[0_12px_30px_rgba(139,92,246,0.28)]
                           hover:-translate-y-1
                           transition-all duration-500 ease-out"
              >
                Explore
              </button>
            </div>
          </RevealBlock>

          {/* Floating feature pills */}
          <RevealBlock delay={0.5} className="mt-16 flex flex-wrap gap-3">
            {["Glassmorphism", "Multi-Stop Gradients", "Glow Effects", "Dark Base", "Animated Borders"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-medium
                           bg-white/5 border border-white/10 text-white/50
                           hover:bg-white/10 hover:text-white/80
                           transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <section className="relative z-10 py-16 px-4 md:px-8 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statItems.map((stat, i) => (
            <RevealBlock key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div
                  className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ─── Component Demos ─── */}
      <section className="relative z-10 py-20 md:py-28 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3">Components</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Button Variants
                </span>
              </h2>
            </div>
          </RevealBlock>

          {/* Buttons demo */}
          <RevealBlock delay={0.1} className="mb-16">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10">
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-6">All Variants</p>
              <div className="flex flex-wrap gap-4 mb-8">
                {/* Primary */}
                <button
                  className="px-7 py-3.5 rounded-2xl font-bold text-white
                             bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500
                             bg-[length:200%_auto] hover:bg-right
                             shadow-[0_8px_20px_rgba(139,92,246,0.35)]
                             hover:shadow-[0_15px_30px_rgba(217,70,239,0.5)]
                             hover:-translate-y-1 active:scale-95
                             transition-all duration-500 ease-out"
                >
                  Primary
                </button>
                {/* Outline gradient */}
                <button className="px-7 py-3.5 rounded-2xl font-bold relative group hover:-translate-y-1 transition-all duration-500">
                  <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl" />
                  <span className="absolute inset-[2px] bg-slate-950 rounded-[14px] group-hover:bg-slate-900 transition-colors duration-500" />
                  <span className="relative bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Outline
                  </span>
                </button>
                {/* Glass */}
                <button
                  className="px-7 py-3.5 rounded-2xl font-bold
                             backdrop-blur-xl bg-white/10 border border-white/20 text-white
                             hover:bg-white/20 hover:border-violet-400/50
                             hover:shadow-[0_12px_30px_rgba(139,92,246,0.28)]
                             hover:-translate-y-1
                             transition-all duration-500"
                >
                  Glass
                </button>
                {/* Cyan accent */}
                <button
                  className="px-7 py-3.5 rounded-2xl font-bold text-white
                             bg-gradient-to-r from-cyan-500 to-blue-500
                             shadow-[0_8px_20px_rgba(6,182,212,0.3)]
                             hover:shadow-[0_15px_30px_rgba(6,182,212,0.5)]
                             hover:-translate-y-1 active:scale-95
                             transition-all duration-500"
                >
                  Cyan
                </button>
                {/* Pink accent */}
                <button
                  className="px-7 py-3.5 rounded-2xl font-bold text-white
                             bg-gradient-to-r from-pink-500 to-rose-500
                             shadow-[0_8px_20px_rgba(236,72,153,0.3)]
                             hover:shadow-[0_15px_30px_rgba(236,72,153,0.5)]
                             hover:-translate-y-1 active:scale-95
                             transition-all duration-500"
                >
                  Pink
                </button>
              </div>
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-6">Sizes</p>
              <div className="flex flex-wrap items-center gap-4">
                <button className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_4px_12px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 transition-all duration-300">
                  Small
                </button>
                <button className="px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_6px_16px_rgba(139,92,246,0.3)] hover:-translate-y-1 transition-all duration-500">
                  Medium
                </button>
                <button className="px-9 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_auto] hover:bg-right shadow-[0_8px_20px_rgba(139,92,246,0.35)] hover:shadow-[0_15px_30px_rgba(217,70,239,0.5)] hover:-translate-y-1 transition-all duration-500">
                  Large
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* Card demos */}
          <RevealBlock>
            <div className="mb-8 md:mb-12">
              <p className="text-xs font-semibold tracking-widest text-fuchsia-400 uppercase mb-3">Components</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Glass Cards
                </span>
              </h2>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feat, i) => (
              <RevealBlock key={feat.title} delay={i * 0.12}>
                <div
                  className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8
                             hover:bg-white/15 hover:border-violet-400/50
                             hover:shadow-[0_20px_50px_rgba(167,139,250,0.18)]
                             hover:-translate-y-2 hover:scale-[1.02]
                             transition-all duration-500 ease-out cursor-pointer h-full"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feat.gradient} rounded-2xl
                               flex items-center justify-center mb-6
                               group-hover:scale-110 group-hover:rotate-12
                               shadow-lg ${feat.glow}
                               transition-transform duration-500 ease-out`}
                  >
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feat.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm group-hover:text-white/80 transition-colors duration-500">
                    {feat.body}
                  </p>
                  {/* Luminous border accent on hover */}
                  <div className="mt-6 pt-4 border-t border-white/10 group-hover:border-violet-500/30 transition-colors duration-500">
                    <span className="text-xs text-white/30 group-hover:text-violet-400 transition-colors duration-500 font-medium">
                      Learn more →
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Input states */}
          <RevealBlock>
            <div className="mb-8 md:mb-12">
              <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">Components</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Input States
                </span>
              </h2>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-16">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 max-w-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Default</label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    className="w-full px-5 py-3.5 rounded-2xl
                               backdrop-blur-xl bg-white/10 border border-white/20
                               text-white placeholder:text-white/30
                               focus:outline-none focus:border-violet-500/50
                               focus:ring-2 focus:ring-violet-500/20
                               transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-5 py-3.5 rounded-2xl
                               backdrop-blur-xl bg-white/10 border border-white/20
                               text-white placeholder:text-white/30
                               focus:outline-none focus:border-fuchsia-500/50
                               focus:ring-2 focus:ring-fuchsia-500/20
                               transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Error State</label>
                  <input
                    type="text"
                    defaultValue="invalid value"
                    className="w-full px-5 py-3.5 rounded-2xl
                               backdrop-blur-xl bg-rose-500/10 border border-rose-500/40
                               text-white ring-2 ring-rose-500/20
                               focus:outline-none
                               transition-all duration-300"
                  />
                  <p className="mt-1.5 text-xs text-rose-400">This field contains an error.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Message</label>
                  <textarea
                    placeholder="Write something creative..."
                    rows={3}
                    className="w-full px-5 py-3.5 rounded-2xl resize-none
                               backdrop-blur-xl bg-white/10 border border-white/20
                               text-white placeholder:text-white/30
                               focus:outline-none focus:border-violet-500/50
                               focus:ring-2 focus:ring-violet-500/20
                               transition-all duration-300"
                  />
                </div>
                <button
                  className="w-full py-4 rounded-2xl font-bold text-white
                             bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500
                             bg-[length:200%_auto] hover:bg-right
                             shadow-[0_8px_20px_rgba(139,92,246,0.35)]
                             hover:shadow-[0_15px_30px_rgba(217,70,239,0.5)]
                             hover:-translate-y-0.5
                             transition-all duration-500"
                >
                  Send Message
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── Color & Gradient Palette ─── */}
      <section className="relative z-10 py-20 md:py-28 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">Design Tokens</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-amber-400 via-pink-400 to-violet-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Color System
                </span>
              </h2>
            </div>
          </RevealBlock>

          {/* Solid swatches */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-12">
            {gradientPalette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.08}>
                <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 group">
                  <div className={`h-16 md:h-24 ${color.tailwind} group-hover:brightness-110 transition-all duration-300`} />
                  <div className="p-3">
                    <p className={`text-xs font-semibold ${color.textColor}`}>{color.name}</p>
                    <p className="text-xs text-white/30 font-mono mt-0.5">{color.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient combos with interactive tab */}
          <RevealBlock delay={0.1}>
            <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
              <div className="flex border-b border-white/10 overflow-x-auto">
                {gradientCombos.map((combo, i) => (
                  <button
                    key={combo.name}
                    onClick={() => setActiveCombo(i)}
                    className={`flex-1 min-w-[100px] px-4 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap
                      ${
                        activeCombo === i
                          ? "text-white border-b-2 border-violet-500 bg-violet-500/10"
                          : "text-white/40 hover:text-white/70 hover:bg-white/5"
                      }`}
                  >
                    {combo.name}
                  </button>
                ))}
              </div>
              <div className="p-8">
                {gradientCombos.map((combo, i) =>
                  activeCombo === i ? (
                    <div key={combo.name}>
                      <div
                        className={`h-32 md:h-48 rounded-2xl bg-gradient-to-r ${combo.from} ${combo.via} ${combo.to} mb-6`}
                        style={{
                          boxShadow: "0 20px 60px rgba(139,92,246,0.3)",
                        }}
                      />
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/60">
                          {combo.from}
                        </span>
                        <span className="text-white/20 text-xs">→</span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/60">
                          {combo.via}
                        </span>
                        <span className="text-white/20 text-xs">→</span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/60">
                          {combo.to}
                        </span>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </RevealBlock>

          {/* Gradient text showcase */}
          <RevealBlock delay={0.15} className="mt-12">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 md:p-10 overflow-hidden relative">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
              </div>
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-6">Gradient Text Effects</p>
              <div className="space-y-4">
                <div
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Aurora Spectrum
                </div>
                <div
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Ocean Depths
                </div>
                <div
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Sunset Haze
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── Design Rules: Do / Don't ─── */}
      <section className="relative z-10 py-20 md:py-28 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold tracking-widest text-fuchsia-400 uppercase mb-3">Guidelines</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Design Rules
                </span>
              </h2>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Do list */}
            <RevealBlock delay={0.05}>
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-bl-full" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-violet-300">Use These</h3>
                </div>
                <ul className="space-y-3">
                  {doList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                        <svg viewBox="0 0 12 12" fill="currentColor" className="w-2.5 h-2.5 text-violet-400">
                          <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't list */}
            <RevealBlock delay={0.1}>
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-bl-full" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-rose-300">Avoid These</h3>
                </div>
                <ul className="space-y-3">
                  {dontList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                      <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                        <svg viewBox="0 0 12 12" fill="currentColor" className="w-2.5 h-2.5 text-rose-400">
                          <path d="M11.13 1.13l-.26-.26a.5.5 0 00-.7 0L6 5.03 1.83.87a.5.5 0 00-.7 0l-.26.26a.5.5 0 000 .7L4.97 6 .87 10.17a.5.5 0 000 .7l.26.26a.5.5 0 00.7 0L6 6.97l4.17 4.16a.5.5 0 00.7 0l.26-.26a.5.5 0 000-.7L7.03 6l4.1-4.17a.5.5 0 000-.7z" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── Typography Section ─── */}
      <section className="relative z-10 py-20 md:py-28 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold tracking-widest text-pink-400 uppercase mb-3">Typography</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Type Scale
                </span>
              </h2>
            </div>
          </RevealBlock>

          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden mb-12">
            {typeScaleItems.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.07}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-8 py-6 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors duration-200 group">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{item.label}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span
                      className={`${item.size} ${item.weight} text-white/90 group-hover:text-white transition-colors duration-300 leading-tight break-words`}
                    >
                      {item.sample}
                    </span>
                  </div>
                  <div className="hidden md:block text-xs font-mono text-white/20 flex-shrink-0">
                    {item.size.split(" ")[0]}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Font weight showcase */}
          <RevealBlock delay={0.1}>
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10">
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-8">Weight Spectrum</p>
              <div className="space-y-3">
                {[
                  { w: "font-light", label: "Light 300", sample: "Modern Gradient Design" },
                  { w: "font-normal", label: "Regular 400", sample: "Modern Gradient Design" },
                  { w: "font-medium", label: "Medium 500", sample: "Modern Gradient Design" },
                  { w: "font-semibold", label: "Semibold 600", sample: "Modern Gradient Design" },
                  { w: "font-bold", label: "Bold 700", sample: "Modern Gradient Design" },
                  { w: "font-extrabold", label: "ExtraBold 800", sample: "Modern Gradient Design" },
                  { w: "font-black", label: "Black 900", sample: "Modern Gradient Design" },
                ].map((row) => (
                  <div key={row.w} className="flex items-center gap-6 group">
                    <span className="w-28 text-xs font-mono text-white/25 flex-shrink-0">{row.label}</span>
                    <span className={`text-xl text-white/80 ${row.w} group-hover:text-white transition-colors duration-200`}>
                      {row.sample}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── Advanced Interactions Showcase ─── */}
      <section className="relative z-10 py-20 md:py-28 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">Interactions</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Motion Patterns
                </span>
              </h2>
            </div>
          </RevealBlock>

          {/* Tabbed interaction panel */}
          <RevealBlock delay={0.1} className="mb-10">
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
              <div className="flex border-b border-white/10">
                {["Overview", "Features", "Pricing"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 px-4 py-4 text-sm font-semibold transition-all duration-300
                      ${
                        activeTab === i
                          ? "text-white border-b-2 border-violet-500 bg-gradient-to-b from-violet-500/20 to-transparent"
                          : "text-white/40 hover:text-white/70 hover:bg-white/5"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-8 min-h-[140px]">
                {activeTab === 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Design Overview</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Modern Gradient fuses vivid multi-stop gradients with glass morphism surfaces. Every component
                      breathes with ambient glow, creating an interface that feels alive and premium.
                    </p>
                  </div>
                )}
                {activeTab === 1 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Core Features</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Gradient flow animations, neon dispersion shadows, zero-gravity float on hover, and luminous
                      border illumination — all crafted for duration-500 ease-out transitions.
                    </p>
                  </div>
                )}
                {activeTab === 2 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Pricing Tier</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Available in the StyleKit Expressive collection. Full component library with Tailwind classes,
                      AI prompt library, and usage guidelines included.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>

          {/* Animated gradient border card */}
          <RevealBlock delay={0.15} className="mb-10">
            <div className="rounded-3xl p-[2px] relative group overflow-hidden">
              {/* Animated gradient border */}
              <div
                className="absolute inset-0 rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, #8b5cf6, #d946ef, #06b6d4, #ec4899, #8b5cf6)",
                  backgroundSize: "300% 300%",
                  animation: "gradient-border 4s ease infinite",
                }}
              />
              <div className="relative rounded-[22px] bg-slate-950 p-8 md:p-10">
                <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-4">Animated Gradient Border</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Luminous Edge Effect
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xl">
                  A continuously cycling gradient border creates a mesmerizing frame that signals interactivity
                  and premium quality — achieved with a 2px gradient wrapper and a dark inner fill.
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Mesh gradient hero card */}
          <RevealBlock delay={0.2}>
            <div className="rounded-3xl overflow-hidden relative min-h-[280px] md:min-h-[360px] flex items-end">
              {/* Mesh gradient background */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 0% 0%, #7c3aed 0%, transparent 50%)," +
                    "radial-gradient(ellipse at 100% 0%, #d946ef 0%, transparent 50%)," +
                    "radial-gradient(ellipse at 100% 100%, #06b6d4 0%, transparent 50%)," +
                    "radial-gradient(ellipse at 0% 100%, #ec4899 0%, transparent 50%)," +
                    "#1e1b4b",
                }}
              />
              {/* Noise/grain overlay for texture */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
                }}
              />
              {/* Content */}
              <div className="relative z-10 p-8 md:p-12 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-medium text-white/70 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                  Mesh Gradient Background
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                  Aurora Atmosphere
                </h3>
                <p className="text-white/60 text-sm md:text-base max-w-lg leading-relaxed">
                  Four radial gradients composited over a deep indigo base create a rich mesh
                  that shifts naturally as the eye moves across the surface.
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── Philosophy Section ─── */}
      <section className="relative z-10 py-20 md:py-28 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3">Philosophy</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Core Principles
                </span>
              </h2>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Visual Vitality",
                body: "Gradient color flows bring kinetic energy and momentum to static surfaces. Every page breathes with movement.",
                gradient: "from-violet-500 to-fuchsia-500",
                icon: "◆",
              },
              {
                title: "Layered Depth",
                body: "Transparency, blur, and gradient overlapping create a sense of space and dimension without relying on shadows alone.",
                gradient: "from-fuchsia-500 to-cyan-500",
                icon: "◈",
              },
              {
                title: "Modern Tech Aura",
                body: "The palette and treatment signal innovation, aspiration, and a forward-looking brand voice.",
                gradient: "from-cyan-500 to-blue-500",
                icon: "◉",
              },
              {
                title: "Emotional Resonance",
                body: "Color science shows that violet and fuchsia combinations inspire creativity and excitement — a deliberate choice for high-conversion surfaces.",
                gradient: "from-blue-500 to-violet-500",
                icon: "◎",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.1}>
                <div className="group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/10 hover:border-violet-500/30 hover:shadow-[0_20px_50px_rgba(139,92,246,0.12)] hover:-translate-y-1 transition-all duration-500 h-full">
                  <div
                    className={`text-2xl font-black bg-gradient-to-r ${principle.gradient} bg-clip-text text-transparent mb-4`}
                    style={{ WebkitBackgroundClip: "text" }}
                  >
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-100 transition-colors duration-300">
                    {principle.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {principle.body}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Progress & Badges ─── */}
      <section className="relative z-10 py-20 md:py-28 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-semibold tracking-widest text-fuchsia-400 uppercase mb-3">UI Elements</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Indicators
                </span>
              </h2>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Progress bars */}
            <RevealBlock delay={0.05}>
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
                <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-6">Progress Bars</p>
                <div className="space-y-6">
                  {[
                    { label: "Design", value: 87, gradient: "from-violet-500 to-fuchsia-500" },
                    { label: "Development", value: 72, gradient: "from-fuchsia-500 to-pink-500" },
                    { label: "Performance", value: 95, gradient: "from-cyan-500 to-blue-500" },
                    { label: "Accessibility", value: 60, gradient: "from-pink-500 to-amber-500" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white/70">{bar.label}</span>
                        <span className="text-xs font-mono text-white/40">{bar.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${bar.gradient}`}
                          style={{
                            width: `${bar.value}%`,
                            boxShadow: "0 0 10px rgba(139,92,246,0.4)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Badges */}
            <RevealBlock delay={0.1}>
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
                <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-6">Badges</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-white/30 mb-3">Gradient</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">New</span>
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white">Hot</span>
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">Beta</span>
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white">Pro</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-3">Glass</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-white/70">Default</span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300">Violet</span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300">Fuchsia</span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">Cyan</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 mb-3">Status</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Pending
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        Error
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Alert variants */}
          <RevealBlock delay={0.15}>
            <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10">
              <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-6">Alert States</p>
              <div className="space-y-3">
                {[
                  { bg: "bg-violet-500/10", border: "border-violet-500/20", icon: "✦", iconColor: "text-violet-400", title: "Information", body: "Modern Gradient is optimized for dark interfaces and vibrant color palettes.", titleColor: "text-violet-300" },
                  { bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: "✓", iconColor: "text-emerald-400", title: "Success", body: "Your gradient configuration has been applied successfully.", titleColor: "text-emerald-300" },
                  { bg: "bg-amber-500/10", border: "border-amber-500/20", icon: "!", iconColor: "text-amber-400", title: "Warning", body: "Ensure sufficient contrast between gradient text and background.", titleColor: "text-amber-300" },
                  { bg: "bg-rose-500/10", border: "border-rose-500/20", icon: "✕", iconColor: "text-rose-400", title: "Error", body: "Failed to render gradient. Check that color values are valid hex codes.", titleColor: "text-rose-300" },
                ].map((alert) => (
                  <div key={alert.title} className={`flex items-start gap-4 px-5 py-4 rounded-2xl ${alert.bg} border ${alert.border} backdrop-blur-sm`}>
                    <span className={`flex-shrink-0 font-bold text-sm mt-0.5 ${alert.iconColor}`}>{alert.icon}</span>
                    <div>
                      <p className={`text-sm font-semibold ${alert.titleColor}`}>{alert.title}</p>
                      <p className="text-sm text-white/50 mt-0.5">{alert.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── Pricing Cards ─── */}
      <section className="relative z-10 py-20 md:py-28 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="mb-12 md:mb-16 text-center">
              <p className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-3">Showcase</p>
              <h2 className="text-3xl md:text-5xl font-bold">
                <span
                  className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                  style={{ WebkitBackgroundClip: "text" }}
                >
                  Pricing Cards
                </span>
              </h2>
              <p className="text-white/40 mt-4 text-sm">A real-world application of the design system</p>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <RevealBlock delay={0.05}>
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/10 hover:border-violet-500/30 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                <div className="mb-6">
                  <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">Starter</span>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-black text-white">$0</span>
                    <span className="text-white/40 text-sm pb-1">/mo</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {["5 Projects", "Basic Components", "Community Support", "1 User"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-white/40 text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-2xl font-bold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  Get Started
                </button>
              </div>
            </RevealBlock>

            {/* Pro — featured */}
            <RevealBlock delay={0.1}>
              <div className="rounded-3xl p-[2px] relative">
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #d946ef, #06b6d4)",
                    backgroundSize: "200% 200%",
                  }}
                />
                <div className="relative rounded-[22px] bg-slate-900 p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">Pro</span>
                      <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">Popular</span>
                    </div>
                    <div className="mt-4 flex items-end gap-1">
                      <span
                        className="text-4xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                        style={{ WebkitBackgroundClip: "text" }}
                      >
                        $29
                      </span>
                      <span className="text-white/40 text-sm pb-1">/mo</span>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {["Unlimited Projects", "All Components", "Priority Support", "5 Users", "Custom Themes", "API Access"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <span className="w-4 h-4 rounded-full bg-violet-500/30 border border-violet-500/50 flex items-center justify-center text-violet-400 text-xs">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-2xl font-bold text-white
                               bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500
                               bg-[length:200%_auto] hover:bg-right
                               shadow-[0_8px_20px_rgba(139,92,246,0.4)]
                               hover:shadow-[0_15px_30px_rgba(217,70,239,0.5)]
                               transition-all duration-500"
                  >
                    Start Pro Trial
                  </button>
                </div>
              </div>
            </RevealBlock>

            {/* Enterprise */}
            <RevealBlock delay={0.15}>
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover:bg-white/10 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                <div className="mb-6">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Enterprise</span>
                  <div className="mt-4 flex items-end gap-1">
                    <span
                      className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                      style={{ WebkitBackgroundClip: "text" }}
                    >
                      Custom
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {["Everything in Pro", "Unlimited Users", "SLA Guarantee", "Dedicated Support", "White-label", "SSO & SAML"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_15px_30px_rgba(6,182,212,0.4)] transition-all duration-500">
                  Contact Sales
                </button>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
            <div>
              <div
                className="text-2xl font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-2"
                style={{ WebkitBackgroundClip: "text" }}
              >
                Modern Gradient
              </div>
              <p className="text-sm text-white/40 max-w-xs leading-relaxed">
                Vibrant gradients and glass morphism for expressive, high-energy digital experiences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/styles"
                className="px-6 py-3 rounded-2xl text-sm font-semibold
                           bg-white/10 border border-white/20 text-white/70
                           hover:bg-white/20 hover:text-white
                           transition-all duration-300"
              >
                All Styles
              </Link>
              <Link
                href="/styles/modern-gradient"
                className="px-6 py-3 rounded-2xl text-sm font-bold text-white
                           bg-gradient-to-r from-violet-500 to-fuchsia-500
                           shadow-[0_4px_16px_rgba(139,92,246,0.3)]
                           hover:shadow-[0_8px_24px_rgba(217,70,239,0.4)]
                           hover:-translate-y-0.5
                           transition-all duration-300"
              >
                View Documentation
              </Link>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/25">
              StyleKit / Modern Gradient Showcase
            </p>
            <div className="flex items-center gap-6">
              <Link href="/styles" className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200">
                StyleKit
              </Link>
              <Link href="/styles/modern-gradient" className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200">
                Docs
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Gradient border animation keyframes */}
      <style>{`
        @keyframes gradient-border {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}
