"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Zap,
  Shield,
  Users,
  Rocket,
  Star,
  Sparkles,
  Check,
  X,
  ChevronDown,
  Globe,
  Lock,
  Cpu,
  Flame,
  Layers,
  Eye,
  TrendingUp,
  MessageCircle,
  Heart,
  Share2,
  Bell,
  Settings,
  BarChart2,
  Code2,
  Package,
  GitBranch,
} from "lucide-react";

// ---------------------------------------------------------------------------
// useInView hook — fires once when element enters viewport
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// RevealBlock — scroll-reveal wrapper (NO style prop on the component)
// ---------------------------------------------------------------------------
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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data — gradient theme definitions
// ---------------------------------------------------------------------------
const GRADIENT_THEMES = [
  {
    id: "purple-pink",
    name: "Purple Storm",
    from: "from-purple-500",
    to: "to-pink-500",
    border: "border-yellow-400",
    shadow: "rgba(168,85,247,0.5)",
    shadowHover: "rgba(168,85,247,0.8)",
    label: "from-purple-500 to-pink-500",
  },
  {
    id: "cyan-lime",
    name: "Cyan Surge",
    from: "from-cyan-400",
    to: "to-lime-400",
    border: "border-pink-400",
    shadow: "rgba(34,211,238,0.5)",
    shadowHover: "rgba(34,211,238,0.8)",
    label: "from-cyan-400 to-lime-400",
  },
  {
    id: "amber-rose",
    name: "Amber Blaze",
    from: "from-amber-400",
    to: "to-rose-500",
    border: "border-cyan-400",
    shadow: "rgba(251,191,36,0.5)",
    shadowHover: "rgba(251,191,36,0.8)",
    label: "from-amber-400 to-rose-500",
  },
  {
    id: "lime-cyan",
    name: "Lime Wave",
    from: "from-lime-400",
    to: "to-cyan-500",
    border: "border-purple-400",
    shadow: "rgba(163,230,53,0.5)",
    shadowHover: "rgba(163,230,53,0.8)",
    label: "from-lime-400 to-cyan-500",
  },
  {
    id: "rose-amber",
    name: "Rose Fire",
    from: "from-rose-500",
    to: "to-amber-400",
    border: "border-lime-400",
    shadow: "rgba(251,113,133,0.5)",
    shadowHover: "rgba(251,113,133,0.8)",
    label: "from-rose-500 to-amber-400",
  },
] as const;

const PALETTE_COLORS = [
  { name: "Purple", hex: "#a855f7", role: "Primary", tw: "bg-purple-500", glow: "rgba(168,85,247,0.7)" },
  { name: "Deep Dark", hex: "#0f0a1e", role: "Background", tw: "bg-[#0f0a1e]", glow: "rgba(15,10,30,0.7)" },
  { name: "Pink", hex: "#f472b6", role: "Accent", tw: "bg-pink-400", glow: "rgba(244,114,182,0.7)" },
  { name: "Cyan", hex: "#22d3ee", role: "Highlight", tw: "bg-cyan-400", glow: "rgba(34,211,238,0.7)" },
  { name: "Lime", hex: "#a3e635", role: "Energy", tw: "bg-lime-400", glow: "rgba(163,230,53,0.7)" },
  { name: "Amber", hex: "#fbbf24", role: "Warmth", tw: "bg-amber-400", glow: "rgba(251,191,36,0.7)" },
  { name: "Rose", hex: "#fb7185", role: "Impact", tw: "bg-rose-400", glow: "rgba(251,113,133,0.7)" },
];

const GRADIENT_COMBOS = [
  { name: "Purple Storm", classes: "from-purple-500 to-pink-500", desc: "Bold identity gradient" },
  { name: "Ocean Energy", classes: "from-cyan-400 to-lime-400", desc: "Tech-forward pairing" },
  { name: "Sunset Blaze", classes: "from-amber-400 to-rose-500", desc: "Warm impact gradient" },
  { name: "Electric Lime", classes: "from-lime-400 to-cyan-500", desc: "High-contrast energy" },
  { name: "Neon Fusion", classes: "from-purple-500 via-pink-500 to-amber-400", desc: "Full-spectrum blend" },
  { name: "Rose Inferno", classes: "from-rose-500 via-pink-500 to-purple-600", desc: "Deep warm spectrum" },
];

const FEATURE_CARDS = [
  {
    icon: Zap,
    title: "Instant Performance",
    desc: "Sub-millisecond response times with GPU-accelerated gradient rendering across all surfaces.",
    from: "from-purple-500",
    to: "to-pink-500",
    border: "border-yellow-400",
    shadow: "rgba(168,85,247,0.4)",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    desc: "End-to-end encryption baked into every layer. Enterprise-grade security with a neon edge.",
    from: "from-cyan-400",
    to: "to-lime-400",
    border: "border-pink-400",
    shadow: "rgba(34,211,238,0.4)",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Deploy to 200+ regions with zero-config edge distribution and gradient-perfect fidelity.",
    from: "from-amber-400",
    to: "to-rose-500",
    border: "border-cyan-400",
    shadow: "rgba(251,191,36,0.4)",
  },
  {
    icon: Cpu,
    title: "AI-Powered Core",
    desc: "Machine learning inference at the edge, wrapped in gradients that make your models look good.",
    from: "from-lime-400",
    to: "to-cyan-500",
    border: "border-purple-400",
    shadow: "rgba(163,230,53,0.4)",
  },
  {
    icon: Layers,
    title: "Stack Agnostic",
    desc: "Works with any framework. Gradient tokens export to Tailwind, CSS variables, and design tokens.",
    from: "from-rose-500",
    to: "to-amber-400",
    border: "border-lime-400",
    shadow: "rgba(251,113,133,0.4)",
  },
  {
    icon: GitBranch,
    title: "Version Everything",
    desc: "Git-native versioning with gradient diffs. Every color change is tracked and reversible.",
    from: "from-purple-500",
    via: "via-cyan-500",
    to: "to-pink-500",
    border: "border-amber-400",
    shadow: "rgba(168,85,247,0.4)",
  },
];

const STAT_ROWS = [
  { label: "Downloads", value: 87, from: "from-purple-500", to: "to-pink-500", glow: "rgba(168,85,247,0.6)" },
  { label: "Active Users", value: 64, from: "from-cyan-400", to: "to-lime-400", glow: "rgba(34,211,238,0.6)" },
  { label: "Components", value: 91, from: "from-amber-400", to: "to-rose-500", glow: "rgba(251,191,36,0.6)" },
  { label: "Stars", value: 73, from: "from-lime-400", to: "to-cyan-500", glow: "rgba(163,230,53,0.6)" },
];

const DO_LIST = [
  "Dark bg `bg-[#0f0a1e]` on all pages",
  "Card gradient fills with `from-*` and `to-*`",
  "Thick borders `border-4` with high-contrast colors",
  "`rounded-2xl` on all gradient cards",
  "Multiple gradient combos: purple-pink, cyan-lime, amber-rose",
  "`hover:scale-[1.02] hover:brightness-110` on gradient cards",
  "Neon text-shadow on headings for depth",
  "Gradient text: `bg-clip-text text-transparent`",
];

const DONT_LIST = [
  "Light backgrounds — everything must be dark",
  "Single flat colors — every surface should gradient",
  "Subtle or muted effects — go bold",
  "Monochrome palettes",
  "Thin borders — use `border-4` minimum",
  "Low-contrast color pairings",
  "Flat buttons without glow shadows",
  "White cards on dark backgrounds",
];

const COMPONENT_TABS = ["Buttons", "Cards", "Inputs"] as const;
type ComponentTab = (typeof COMPONENT_TABS)[number];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function ShowcaseContent() {
  // Hero
  const { ref: heroRef, inView: heroInView } = useInView();

  // Section refs
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: paletteRef, inView: paletteInView } = useInView();
  const { ref: combosRef, inView: combosInView } = useInView();
  const { ref: featuresRef, inView: featuresInView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: principlesRef, inView: principlesInView } = useInView();
  const { ref: ctaRef, inView: ctaInView } = useInView();

  // Component demo state
  const [activeComponentTab, setActiveComponentTab] = useState<ComponentTab>("Buttons");
  const [activeTheme, setActiveTheme] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const theme = GRADIENT_THEMES[activeTheme];

  return (
    <div className="min-h-screen bg-[#0f0a1e] text-white relative overflow-x-hidden">

      {/* Injected keyframe animations */}
      <style>{`
        @keyframes neon-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes neon-pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes neon-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes neon-blob-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
      `}</style>

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #a855f7, transparent)",
            animation: "neon-blob-drift 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #22d3ee, transparent)",
            animation: "neon-blob-drift 22s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #f472b6, transparent)",
            animation: "neon-blob-drift 15s ease-in-out infinite 4s",
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. NAVIGATION                                                        */}
      {/* ------------------------------------------------------------------ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#0f0a1e]/85 backdrop-blur-xl"
        style={{
          borderBottom: "1px solid",
          borderImage: "linear-gradient(to right, #a855f7, #f472b6, #22d3ee) 1",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo + back */}
            <div className="flex items-center gap-4">
              <Link
                href="/styles/neon-gradient"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden md:inline text-sm font-medium">Back</span>
              </Link>
              <span
                className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                style={{ textShadow: "0 0 20px rgba(168,85,247,0.5)" }}
              >
                Neon Gradient
              </span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "Components", anchor: "#components" },
                { label: "Palette", anchor: "#palette" },
                { label: "Gradients", anchor: "#combos" },
                { label: "Principles", anchor: "#principles" },
              ].map(({ label, anchor }) => (
                <a
                  key={label}
                  href={anchor}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <Link
              href="/"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-xl border-2 border-yellow-400 hover:brightness-110 hover:scale-105 transition-all duration-300"
              style={{ boxShadow: "0 0 15px rgba(168,85,247,0.4)" }}
            >
              StyleKit →
            </Link>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* 2. HERO                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-20 pb-16">

        {/* Floating gradient card blobs — decorative */}
        <div
          className="absolute top-32 left-8 md:left-24 w-36 h-36 rounded-2xl border-4 border-yellow-400 rotate-12 opacity-60"
          style={{
            background: "linear-gradient(135deg, #a855f7, #f472b6)",
            boxShadow: "0 0 40px rgba(168,85,247,0.4)",
            animation: "neon-float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-48 right-8 md:right-24 w-28 h-28 rounded-2xl border-4 border-pink-400 -rotate-6 opacity-50"
          style={{
            background: "linear-gradient(135deg, #22d3ee, #a3e635)",
            boxShadow: "0 0 30px rgba(34,211,238,0.4)",
            animation: "neon-float 8s ease-in-out infinite 2s",
          }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-24 h-24 rounded-2xl border-4 border-cyan-400 rotate-3 opacity-40"
          style={{
            background: "linear-gradient(135deg, #fbbf24, #fb7185)",
            boxShadow: "0 0 25px rgba(251,191,36,0.4)",
            animation: "neon-float 7s ease-in-out infinite 1s",
          }}
        />

        {/* Hero content */}
        <div className="relative max-w-5xl mx-auto text-center z-10" ref={heroRef}>
          {/* Badge */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="flex justify-center mb-8">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-purple-500/50 bg-purple-500/10 text-xs font-semibold text-purple-300"
                style={{ animation: "neon-pulse-glow 3s ease-in-out infinite" }}
              >
                <Star className="w-3 h-3 fill-current" />
                霓虹渐变 Design System
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>
          </div>

          {/* Main heading */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <h1
              className="text-5xl md:text-7xl lg:text-9xl font-black leading-tight mb-6"
              style={{ textShadow: "0 0 40px rgba(168,85,247,0.5), 0 0 80px rgba(244,114,182,0.3)" }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                Neon
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-400 to-amber-400">
                Gradient
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Dark backgrounds. Vivid gradient fills. Thick colored borders. Every surface is a gradient opportunity.
              Bold, modern, future-forward energy.
            </p>
          </div>

          {/* CTA buttons */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button
                className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold rounded-2xl border-4 border-yellow-400 hover:scale-[1.05] hover:brightness-110 transition-all duration-300 flex items-center gap-2"
                style={{ boxShadow: "0 0 30px rgba(168,85,247,0.5)" }}
              >
                <Sparkles className="w-5 h-5" />
                Get Started Free
              </button>
              <button
                className="px-8 py-4 bg-transparent text-white font-bold rounded-2xl border-4 border-cyan-400 hover:bg-cyan-400/10 hover:scale-[1.05] transition-all duration-300 flex items-center gap-2"
                style={{ boxShadow: "0 0 20px rgba(34,211,238,0.3)" }}
              >
                View Components
              </button>
            </div>
          </div>

          {/* Stat chips */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { value: "50K+", label: "Downloads", color: "text-purple-400" },
                { value: "200+", label: "Components", color: "text-cyan-400" },
                { value: "7", label: "Neon Colors", color: "text-pink-400" },
                { value: "100%", label: "Dark Mode", color: "text-amber-400" },
              ].map(({ value, label, color }) => (
                <div key={label} className="text-center">
                  <div className={`text-2xl md:text-3xl font-black ${color}`}>{value}</div>
                  <div className="text-xs text-white/40 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. COMPONENT DEMOS                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section id="components" className="px-6 md:px-12 py-16 md:py-24" ref={componentsRef}>
        <div className="max-w-7xl mx-auto">

          <RevealBlock delay={0}>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">Interactive Library</p>
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ textShadow: "0 0 20px rgba(168,85,247,0.3)" }}
            >
              Components
            </h2>
            <p className="text-white/50 mb-10 max-w-lg">
              Switch themes to see gradient variants applied across every component type.
            </p>
          </RevealBlock>

          {/* Theme switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-10">
              {GRADIENT_THEMES.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(i)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    activeTheme === i
                      ? `bg-gradient-to-r ${t.from} ${t.to} text-white border-2 ${t.border}`
                      : "bg-white/5 text-white/50 border-2 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                  style={
                    activeTheme === i
                      ? { boxShadow: `0 0 20px ${t.shadow}` }
                      : undefined
                  }
                >
                  {t.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Component tabs */}
          <RevealBlock delay={0.15}>
            <div className="flex gap-1 p-1 bg-white/5 border-2 border-white/10 rounded-xl w-fit mb-10">
              {COMPONENT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveComponentTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                    activeComponentTab === tab
                      ? `bg-gradient-to-r ${theme.from} ${theme.to} text-white`
                      : "text-white/50 hover:text-white"
                  }`}
                  style={
                    activeComponentTab === tab
                      ? { boxShadow: `0 0 15px ${theme.shadow}` }
                      : undefined
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* BUTTONS panel */}
          {activeComponentTab === "Buttons" && (
            <RevealBlock delay={0.2}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Gradient fill */}
                <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                  <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Gradient Fill</p>
                  <button
                    className={`w-full px-6 py-3 bg-gradient-to-r ${theme.from} ${theme.to} text-white font-bold rounded-xl border-4 ${theme.border} hover:scale-[1.02] hover:brightness-110 transition-all duration-300`}
                    style={{ boxShadow: `0 0 20px ${theme.shadow}` }}
                  >
                    Primary Action
                  </button>
                </div>

                {/* Gradient outline */}
                <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                  <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Outline</p>
                  <button
                    className={`w-full px-6 py-3 bg-transparent font-bold rounded-xl border-4 ${theme.border} hover:bg-white/5 hover:scale-[1.02] transition-all duration-300`}
                    style={{
                      color: "white",
                      boxShadow: `0 0 15px ${theme.shadow}`,
                    }}
                  >
                    Outline Button
                  </button>
                </div>

                {/* Ghost */}
                <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                  <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Ghost</p>
                  <button className="w-full px-6 py-3 bg-white/5 text-white/80 font-bold rounded-xl border-2 border-white/20 hover:bg-white/10 hover:text-white hover:scale-[1.02] transition-all duration-300">
                    Ghost Button
                  </button>
                </div>

                {/* Icon + label */}
                <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                  <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Icon + Label</p>
                  <button
                    className={`w-full px-6 py-3 bg-gradient-to-r ${theme.from} ${theme.to} text-white font-bold rounded-xl border-4 ${theme.border} hover:scale-[1.02] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2`}
                    style={{ boxShadow: `0 0 20px ${theme.shadow}` }}
                  >
                    <Zap className="w-4 h-4" />
                    Deploy Now
                  </button>
                </div>

                {/* Destructive */}
                <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                  <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Destructive</p>
                  <button
                    className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-xl border-4 border-amber-400 hover:scale-[1.02] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ boxShadow: "0 0 20px rgba(251,113,133,0.5)" }}
                  >
                    <X className="w-4 h-4" />
                    Delete
                  </button>
                </div>

                {/* Success */}
                <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                  <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Success</p>
                  <button
                    className="w-full px-6 py-3 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-bold rounded-xl border-4 border-purple-400 hover:scale-[1.02] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ boxShadow: "0 0 20px rgba(163,230,53,0.5)" }}
                  >
                    <Check className="w-4 h-4" />
                    Confirm
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* CARDS panel */}
          {activeComponentTab === "Cards" && (
            <RevealBlock delay={0.2}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURE_CARDS.map(({ icon: Icon, title, desc, from, to, border, shadow, via }) => (
                  <div
                    key={title}
                    className={`bg-gradient-to-br ${from} ${via ?? ""} ${to} rounded-2xl border-4 ${border} p-6 hover:scale-[1.02] hover:brightness-110 transition-all duration-300 cursor-pointer`}
                    style={{ boxShadow: `0 0 30px ${shadow}` }}
                  >
                    <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-black text-white mb-2">{title}</h3>
                    <p className="text-white/75 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* INPUTS panel */}
          {activeComponentTab === "Inputs" && (
            <RevealBlock delay={0.2}>
              <div className="max-w-xl space-y-5">
                {[
                  { id: "text", label: "Username", type: "text", placeholder: "@neon_creator", focusColor: "#a855f7", focusGlow: "rgba(168,85,247,0.4)" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "you@neon.dev", focusColor: "#22d3ee", focusGlow: "rgba(34,211,238,0.4)" },
                  { id: "search", label: "Search", type: "search", placeholder: "Search components...", focusColor: "#f472b6", focusGlow: "rgba(244,114,182,0.4)" },
                  { id: "password", label: "Password", type: "password", placeholder: "••••••••", focusColor: "#fbbf24", focusGlow: "rgba(251,191,36,0.4)" },
                ].map(({ id, label, type, placeholder, focusColor, focusGlow }) => (
                  <div key={id}>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: focusColor }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      onFocus={() => setInputFocused(id)}
                      onBlur={() => setInputFocused(null)}
                      className="w-full px-5 py-3 bg-white/5 border-2 rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-all duration-300"
                      style={{
                        borderColor: inputFocused === id ? focusColor : "rgba(255,255,255,0.15)",
                        boxShadow: inputFocused === id ? `0 0 20px ${focusGlow}` : "none",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs tracking-widest uppercase text-purple-400 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Describe your neon vision..."
                    rows={4}
                    onFocus={() => setInputFocused("textarea")}
                    onBlur={() => setInputFocused(null)}
                    className="w-full px-5 py-3 bg-white/5 border-2 rounded-xl text-white placeholder:text-white/30 focus:outline-none transition-all duration-300 resize-none"
                    style={{
                      borderColor: inputFocused === "textarea" ? "#a855f7" : "rgba(255,255,255,0.15)",
                      boxShadow: inputFocused === "textarea" ? "0 0 20px rgba(168,85,247,0.4)" : "none",
                    }}
                  />
                </div>

                <button
                  className={`w-full px-6 py-4 bg-gradient-to-r ${theme.from} ${theme.to} text-white font-black rounded-xl border-4 ${theme.border} hover:scale-[1.02] hover:brightness-110 transition-all duration-300`}
                  style={{ boxShadow: `0 0 25px ${theme.shadow}` }}
                >
                  Send Message
                </button>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. COLOR PALETTE                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section id="palette" className="px-6 md:px-12 py-16 md:py-24" ref={paletteRef}>
        <div className="max-w-7xl mx-auto">

          <RevealBlock delay={0}>
            <p className="text-xs tracking-widest uppercase text-cyan-400 mb-3">Color System</p>
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ textShadow: "0 0 20px rgba(34,211,238,0.3)" }}
            >
              Neon Palette
            </h2>
            <p className="text-white/50 mb-12 max-w-lg">
              Seven vivid colors engineered to glow on dark backgrounds. Every pairing produces a distinct gradient personality.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
              {PALETTE_COLORS.map(({ name, hex, role, tw, glow }) => (
                <div
                  key={hex}
                  className="group rounded-2xl border-4 border-white/10 overflow-hidden hover:border-white/30 hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ "--hover-glow": glow } as React.CSSProperties}
                >
                  <div
                    className={`h-20 md:h-28 ${tw} transition-all duration-500`}
                    style={{ boxShadow: `inset 0 -8px 20px rgba(0,0,0,0.4)` }}
                  />
                  <div className="p-3 bg-white/5">
                    <p className="text-xs font-black text-white">{name}</p>
                    <p className="text-[10px] font-mono text-white/40 mt-0.5">{hex}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/30 mt-1">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient pair swatches */}
          <RevealBlock delay={0.2}>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Primary Pair", gradient: "linear-gradient(135deg, #a855f7, #f472b6)", text: "#a855f7 → #f472b6" },
                { label: "Energy Pair", gradient: "linear-gradient(135deg, #22d3ee, #a3e635)", text: "#22d3ee → #a3e635" },
                { label: "Warm Pair", gradient: "linear-gradient(135deg, #fbbf24, #fb7185)", text: "#fbbf24 → #fb7185" },
                { label: "Full Spectrum", gradient: "linear-gradient(135deg, #a855f7, #22d3ee, #fbbf24)", text: "#a855f7 → #22d3ee → #fbbf24" },
              ].map(({ label, gradient, text }) => (
                <div key={label} className="rounded-2xl overflow-hidden border-4 border-white/10">
                  <div className="h-20" style={{ background: gradient }} />
                  <div className="p-3 bg-white/5">
                    <p className="text-xs font-bold text-white">{label}</p>
                    <p className="text-[10px] font-mono text-white/40 mt-1">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. GRADIENT COMBOS                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section id="combos" className="px-6 md:px-12 py-16 md:py-24" ref={combosRef}>
        <div className="max-w-7xl mx-auto">

          <RevealBlock delay={0}>
            <p className="text-xs tracking-widest uppercase text-pink-400 mb-3">Gradient Recipes</p>
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ textShadow: "0 0 20px rgba(244,114,182,0.3)" }}
            >
              Gradient Combos
            </h2>
            <p className="text-white/50 mb-12 max-w-lg">
              Six proven gradient combinations. Each one is a distinct visual energy. Mix freely across surfaces.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {GRADIENT_COMBOS.map(({ name, classes, desc }, i) => (
                <div
                  key={name}
                  className={`relative rounded-2xl border-4 overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all duration-300`}
                  style={{
                    borderColor: [
                      "#fbbf24", "#f472b6", "#22d3ee", "#a855f7", "#a3e635", "#fb7185",
                    ][i % 6],
                  }}
                >
                  <div className={`h-32 bg-gradient-to-r ${classes} group-hover:brightness-110 transition-all duration-300`} />
                  <div className="p-4 bg-white/5">
                    <p className="font-black text-white mb-1">{name}</p>
                    <p className="text-xs text-white/50 mb-2">{desc}</p>
                    <code className="text-[10px] font-mono text-white/30">{classes}</code>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Full-width showcase */}
          <RevealBlock delay={0.2} className="mt-8">
            <div className="relative rounded-2xl overflow-hidden border-4 border-purple-500 h-48">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #f472b6 25%, #22d3ee 50%, #a3e635 75%, #fbbf24 100%)",
                  backgroundSize: "200% 200%",
                  animation: "neon-blob-drift 12s ease-in-out infinite",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p
                  className="text-2xl md:text-4xl font-black text-white"
                  style={{ textShadow: "0 0 30px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.8)" }}
                >
                  Full Neon Spectrum
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FEATURE CARDS (extra section)                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-12 py-16 md:py-24" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">

          <RevealBlock delay={0}>
            <p className="text-xs tracking-widest uppercase text-amber-400 mb-3">Platform Features</p>
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ textShadow: "0 0 20px rgba(251,191,36,0.3)" }}
            >
              Built for Bold
            </h2>
            <p className="text-white/50 mb-12 max-w-lg">
              Six core capabilities, each rendered in its own gradient. Because flat is not an option.
            </p>
          </RevealBlock>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {FEATURE_CARDS.map(({ icon: Icon, title, desc, from, to, border, shadow, via }, i) => (
              <RevealBlock key={title} delay={0.05 * i}>
                <div
                  className={`h-full bg-gradient-to-br ${from} ${via ?? ""} ${to} rounded-2xl border-4 ${border} p-6 hover:scale-[1.02] hover:brightness-110 transition-all duration-300 cursor-pointer`}
                  style={{ boxShadow: `0 0 30px ${shadow}` }}
                >
                  <div className="w-12 h-12 bg-black/25 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{title}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* STATS / PROGRESS BARS                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-12 py-16 md:py-24" ref={statsRef}>
        <div className="max-w-7xl mx-auto">

          <RevealBlock delay={0}>
            <p className="text-xs tracking-widest uppercase text-lime-400 mb-3">Platform Stats</p>
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-12"
              style={{ textShadow: "0 0 20px rgba(163,230,53,0.3)" }}
            >
              By the Numbers
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Progress bars */}
            <RevealBlock delay={0.1}>
              <div className="bg-white/5 border-4 border-purple-500/30 rounded-2xl p-6 md:p-8 space-y-6">
                <p className="text-xs tracking-widest uppercase text-purple-400 mb-6">Growth Metrics</p>
                {STAT_ROWS.map(({ label, value, from, to, glow }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">{label}</span>
                      <span className="text-xs text-white/50">{value}%</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${from} ${to} rounded-full transition-all duration-1000`}
                        style={{
                          width: statsInView ? `${value}%` : "0%",
                          boxShadow: `0 0 15px ${glow}`,
                          transitionDelay: "0.3s",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Metric cards */}
            <RevealBlock delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, value: "248%", label: "YoY Growth", from: "from-purple-500", to: "to-pink-500", border: "border-yellow-400", shadow: "rgba(168,85,247,0.4)" },
                  { icon: Users, value: "12.4K", label: "Active Devs", from: "from-cyan-400", to: "to-lime-400", border: "border-pink-400", shadow: "rgba(34,211,238,0.4)" },
                  { icon: Package, value: "340+", label: "Components", from: "from-amber-400", to: "to-rose-500", border: "border-cyan-400", shadow: "rgba(251,191,36,0.4)" },
                  { icon: Star, value: "9.8K", label: "GitHub Stars", from: "from-lime-400", to: "to-cyan-500", border: "border-purple-400", shadow: "rgba(163,230,53,0.4)" },
                ].map(({ icon: Icon, value, label, from, to, border, shadow }) => (
                  <div
                    key={label}
                    className={`bg-gradient-to-br ${from} ${to} rounded-2xl border-4 ${border} p-5 hover:scale-[1.02] hover:brightness-110 transition-all duration-300`}
                    style={{ boxShadow: `0 0 25px ${shadow}` }}
                  >
                    <Icon className="w-6 h-6 text-white/80 mb-3" />
                    <p className="text-2xl font-black text-white">{value}</p>
                    <p className="text-xs text-white/70 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>

          {/* Social proof cards */}
          <RevealBlock delay={0.3} className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  user: "alex_designs",
                  handle: "@alex_designs",
                  text: "Neon Gradient is the only design system that actually makes my SaaS look alive. The gradient cards are insane.",
                  likes: 847,
                  from: "from-purple-500/20",
                  to: "to-pink-500/20",
                  border: "border-purple-500/40",
                },
                {
                  user: "byte_kai",
                  handle: "@byte_kai",
                  text: "Finally a dark-first system with real color. Not just white on dark grey — actual NEON.",
                  likes: 1204,
                  from: "from-cyan-400/20",
                  to: "to-lime-400/20",
                  border: "border-cyan-400/40",
                },
                {
                  user: "neon_studio",
                  handle: "@neon_studio",
                  text: "Shipped our gaming platform in 3 days using Neon Gradient. The gradient combos are perfect for us.",
                  likes: 563,
                  from: "from-amber-400/20",
                  to: "to-rose-500/20",
                  border: "border-amber-400/40",
                },
              ].map(({ user, handle, text, likes, from, to, border }) => (
                <div
                  key={user}
                  className={`bg-gradient-to-br ${from} ${to} border-2 ${border} rounded-2xl p-5`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-black text-white">
                      {user[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{user}</p>
                      <p className="text-xs text-white/40">{handle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed mb-4">{text}</p>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                      <Heart className="w-3 h-3" /> {likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <MessageCircle className="w-3 h-3" /> Reply
                    </button>
                    <button className="flex items-center gap-1 hover:text-lime-400 transition-colors">
                      <Share2 className="w-3 h-3" /> Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DROPDOWN + BADGES demo section                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">

          <RevealBlock delay={0}>
            <p className="text-xs tracking-widest uppercase text-rose-400 mb-3">UI Elements</p>
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-12"
              style={{ textShadow: "0 0 20px rgba(251,113,133,0.3)" }}
            >
              UI Atoms
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Dropdown */}
            <RevealBlock delay={0.05}>
              <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Dropdown</p>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen((p) => !p)}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-purple-500/50 rounded-xl text-left flex items-center justify-between hover:border-purple-400 transition-colors duration-300"
                  >
                    <span className="text-white/70 text-sm">Select gradient theme</span>
                    <ChevronDown
                      className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div
                      className="absolute top-full left-0 right-0 mt-2 bg-[#1a1035] border-2 border-purple-500/50 rounded-xl overflow-hidden z-20"
                      style={{ boxShadow: "0 0 30px rgba(168,85,247,0.3)" }}
                    >
                      {GRADIENT_THEMES.map((t, i) => (
                        <button
                          key={t.id}
                          className="w-full px-4 py-3 text-left text-sm text-white/70 hover:bg-purple-500/20 hover:text-white flex items-center gap-3 transition-colors duration-200"
                          onClick={() => { setActiveTheme(i); setIsDropdownOpen(false); }}
                        >
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${t.from} ${t.to} flex-shrink-0`} />
                          {t.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </RevealBlock>

            {/* Badges */}
            <RevealBlock delay={0.1}>
              <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Badges</p>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-black rounded-full">New</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-400 to-lime-400 text-black text-xs font-black rounded-full">Active</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-rose-500 text-white text-xs font-black rounded-full">Hot</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 border-2 border-dashed border-yellow-400 text-yellow-400 text-xs font-bold rounded-full">Beta</span>
                    <span className="px-3 py-1 border-2 border-dashed border-pink-400 text-pink-400 text-xs font-bold rounded-full">Pro</span>
                    <span className="px-3 py-1 border-2 border-dashed border-cyan-400 text-cyan-400 text-xs font-bold rounded-full">Enterprise</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 border border-lime-400/40 text-lime-400 text-xs font-medium rounded-full">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-400/40 text-rose-400 text-xs font-medium rounded-full">
                      <Flame className="w-3 h-3" /> Trending
                    </span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Notifications */}
            <RevealBlock delay={0.15}>
              <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Alerts</p>
                <div className="space-y-3">
                  {[
                    { icon: Bell, color: "cyan-400", borderColor: "#22d3ee", bg: "rgba(34,211,238,0.1)", label: "Update available", sub: "Version 3.0 is ready." },
                    { icon: Check, color: "lime-400", borderColor: "#a3e635", bg: "rgba(163,230,53,0.1)", label: "Deploy successful", sub: "All checks passed." },
                    { icon: Zap, color: "amber-400", borderColor: "#fbbf24", bg: "rgba(251,191,36,0.1)", label: "Rate limit warning", sub: "80% of quota used." },
                    { icon: X, color: "rose-400", borderColor: "#fb7185", bg: "rgba(251,113,133,0.1)", label: "Build failed", sub: "Check error logs." },
                  ].map(({ icon: Icon, color, borderColor, bg, label, sub }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ background: bg, borderLeft: `4px solid ${borderColor}` }}
                    >
                      <Icon className={`w-4 h-4 text-${color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className="text-xs font-bold text-white">{label}</p>
                        <p className="text-[10px] text-white/50">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Toggle switches */}
            <RevealBlock delay={0.2}>
              <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Settings Toggles</p>
                <div className="space-y-4">
                  {[
                    { label: "Neon glow effects", defaultOn: true, color: "purple" },
                    { label: "Gradient animations", defaultOn: true, color: "cyan" },
                    { label: "Thick borders", defaultOn: false, color: "pink" },
                    { label: "Dark mode only", defaultOn: true, color: "amber" },
                  ].map(({ label, defaultOn, color }) => (
                    <SettingsToggle key={label} label={label} defaultOn={defaultOn} color={color} />
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Code snippet */}
            <RevealBlock delay={0.25} className="md:col-span-2">
              <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs tracking-widest uppercase text-white/40">Code Sample</p>
                  <div className="flex gap-2">
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-white/30">neon-card.tsx</span>
                  </div>
                </div>
                <pre className="text-xs font-mono text-white/70 overflow-x-auto leading-relaxed">
                  <span className="text-pink-400">{"<div"}</span>
                  {"\n  "}
                  <span className="text-yellow-400">{"className"}</span>
                  <span className="text-white/50">{"="}</span>
                  <span className="text-lime-400">{'"bg-gradient-to-br from-purple-500 to-pink-500'}</span>
                  {"\n           "}
                  <span className="text-lime-400">{' rounded-2xl border-4 border-yellow-400'}</span>
                  {"\n           "}
                  <span className="text-lime-400">{' hover:scale-[1.02] hover:brightness-110"'}</span>
                  {"\n  "}
                  <span className="text-yellow-400">{"style"}</span>
                  <span className="text-white/50">{"={{ "}</span>
                  <span className="text-cyan-400">{"boxShadow"}</span>
                  <span className="text-white/50">{": "}</span>
                  <span className="text-lime-400">{'"0 0 30px rgba(168,85,247,0.5)"'}</span>
                  <span className="text-white/50">{" }}"}</span>
                  {"\n"}
                  <span className="text-pink-400">{">"}</span>
                  {"\n  "}<span className="text-white/50">{"..."}</span>
                  {"\n"}
                  <span className="text-pink-400">{"</div>"}</span>
                </pre>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. DESIGN PRINCIPLES                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section id="principles" className="px-6 md:px-12 py-16 md:py-24" ref={principlesRef}>
        <div className="max-w-7xl mx-auto">

          <RevealBlock delay={0}>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">Design Rules</p>
            <h2
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ textShadow: "0 0 20px rgba(168,85,247,0.3)" }}
            >
              Principles
            </h2>
            <p className="text-white/50 mb-12 max-w-lg">
              The rules that keep Neon Gradient vivid, bold, and future-forward. Follow them and every surface glows.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* DO panel */}
            <RevealBlock delay={0.1}>
              <div
                className="bg-gradient-to-br from-cyan-400/10 to-lime-400/10 border-4 border-cyan-400/40 rounded-2xl p-6 md:p-8 h-full"
                style={{ boxShadow: "0 0 30px rgba(34,211,238,0.15)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-lime-400 rounded-xl flex items-center justify-center"
                    style={{ boxShadow: "0 0 15px rgba(34,211,238,0.5)" }}
                  >
                    <Check className="w-5 h-5 text-black" />
                  </div>
                  <h3
                    className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400"
                    style={{ textShadow: "none" }}
                  >
                    Do This
                  </h3>
                </div>
                <ul className="space-y-3">
                  {DO_LIST.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/70 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T panel */}
            <RevealBlock delay={0.15}>
              <div
                className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-4 border-rose-500/40 rounded-2xl p-6 md:p-8 h-full"
                style={{ boxShadow: "0 0 30px rgba(251,113,133,0.15)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center"
                    style={{ boxShadow: "0 0 15px rgba(251,113,133,0.5)" }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400"
                    style={{ textShadow: "none" }}
                  >
                    Avoid This
                  </h3>
                </div>
                <ul className="space-y-3">
                  {DONT_LIST.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/60 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Principles grid */}
          <RevealBlock delay={0.2}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Layers,
                  title: "Gradient Everything",
                  desc: "Every card surface, button, and accent should use a gradient fill. Flat color is forbidden.",
                  from: "from-purple-500",
                  to: "to-pink-500",
                  border: "border-yellow-400",
                  shadow: "rgba(168,85,247,0.4)",
                },
                {
                  icon: Eye,
                  title: "Dark Canvas First",
                  desc: "bg-[#0f0a1e] or bg-slate-900 as the base. Neon only glows on darkness.",
                  from: "from-cyan-400",
                  to: "to-lime-400",
                  border: "border-pink-400",
                  shadow: "rgba(34,211,238,0.4)",
                },
                {
                  icon: Zap,
                  title: "Thick Borders",
                  desc: "border-4 minimum with high-contrast colors. Thin borders disappear on dark backgrounds.",
                  from: "from-amber-400",
                  to: "to-rose-500",
                  border: "border-cyan-400",
                  shadow: "rgba(251,191,36,0.4)",
                },
                {
                  icon: Sparkles,
                  title: "Glow Shadows",
                  desc: "box-shadow with rgba glow on every interactive surface. Make lights pop.",
                  from: "from-lime-400",
                  to: "to-cyan-500",
                  border: "border-purple-400",
                  shadow: "rgba(163,230,53,0.4)",
                },
              ].map(({ icon: Icon, title, desc, from, to, border, shadow }) => (
                <div
                  key={title}
                  className={`bg-gradient-to-br ${from} ${to} rounded-2xl border-4 ${border} p-5 hover:scale-[1.02] hover:brightness-110 transition-all duration-300`}
                  style={{ boxShadow: `0 0 25px ${shadow}` }}
                >
                  <Icon className="w-7 h-7 text-white/90 mb-3" />
                  <h4 className="font-black text-white mb-2">{title}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA / NEWSLETTER                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-12 py-16 md:py-24" ref={ctaRef}>
        <div className="max-w-3xl mx-auto text-center">
          <RevealBlock delay={0}>
            <div
              className="relative rounded-3xl overflow-hidden border-4 border-purple-500 p-10 md:p-16"
              style={{ boxShadow: "0 0 60px rgba(168,85,247,0.3), 0 0 120px rgba(168,85,247,0.1)" }}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #f472b6, #22d3ee, #a855f7)",
                  backgroundSize: "300% 300%",
                  animation: "neon-blob-drift 15s ease-in-out infinite",
                }}
              />
              <div className="absolute inset-0 bg-[#0f0a1e]/70" />

              <div className="relative z-10">
                <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">
                  Join the movement
                </p>
                <h2
                  className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4"
                  style={{ textShadow: "none" }}
                >
                  Go Neon Today
                </h2>
                <p className="text-white/50 mb-8 max-w-md mx-auto leading-relaxed">
                  Ship with bold gradients, glowing surfaces, and the confidence that flat design will never be your problem.
                </p>

                {subscribed ? (
                  <div
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-400/20 border-2 border-lime-400/50 text-lime-300 font-bold"
                    style={{ boxShadow: "0 0 20px rgba(163,230,53,0.3)" }}
                  >
                    <Check className="w-4 h-4" />
                    Subscribed. Stay neon.
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                    <input
                      type="email"
                      placeholder="you@neon.dev"
                      className="flex-1 px-4 py-3 bg-white/5 border-2 border-purple-500/50 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 text-sm"
                    />
                    <button
                      onClick={() => setSubscribed(true)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-xl border-2 border-yellow-400 hover:brightness-110 hover:scale-105 transition-all duration-300 whitespace-nowrap"
                      style={{ boxShadow: "0 0 20px rgba(168,85,247,0.5)" }}
                    >
                      Subscribe
                    </button>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. FOOTER                                                            */}
      {/* ------------------------------------------------------------------ */}
      <footer className="bg-[#080412] relative overflow-hidden">
        {/* Gradient divider line */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(to right, #a855f7, #f472b6, #22d3ee, #a3e635, #fbbf24)" }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">

          {/* Large gradient brand text */}
          <div className="text-center mb-12">
            <h3
              className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 via-cyan-400 to-lime-400"
              style={{ textShadow: "none" }}
            >
              Neon Gradient
            </h3>
            <p className="text-white/30 text-sm mt-3">Dark backgrounds. Vivid gradients. Future-forward energy.</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm text-white/40">
            {["Components", "Palette", "Gradients", "Principles", "Docs"].map((label) => (
              <a key={label} href="#" className="hover:text-white transition-colors duration-300">
                {label}
              </a>
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
                style={{ boxShadow: "0 0 15px rgba(168,85,247,0.5)" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white/60">StyleKit · Neon Gradient</span>
            </div>

            <div className="flex items-center gap-6">
              {[
                { icon: Settings, color: "hover:text-purple-400" },
                { icon: Bell, color: "hover:text-cyan-400" },
                { icon: BarChart2, color: "hover:text-pink-400" },
                { icon: Code2, color: "hover:text-lime-400" },
              ].map(({ icon: Icon, color }, i) => (
                <button key={i} className={`text-white/30 ${color} transition-colors duration-300`}>
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            <Link
              href="/styles/neon-gradient"
              className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:brightness-125 transition-all duration-300"
            >
              View Documentation →
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[10px] text-white/15 tracking-widest uppercase">
              StyleKit · Neon Gradient Design System · Dark Edition
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SettingsToggle — small interactive toggle component
// ---------------------------------------------------------------------------
function SettingsToggle({
  label,
  defaultOn,
  color,
}: {
  label: string;
  defaultOn: boolean;
  color: string;
}) {
  const [on, setOn] = useState(defaultOn);

  const colorMap: Record<string, { track: string; glow: string }> = {
    purple: { track: "bg-gradient-to-r from-purple-500 to-pink-500", glow: "rgba(168,85,247,0.5)" },
    cyan: { track: "bg-gradient-to-r from-cyan-400 to-lime-400", glow: "rgba(34,211,238,0.5)" },
    pink: { track: "bg-gradient-to-r from-pink-500 to-rose-500", glow: "rgba(244,114,182,0.5)" },
    amber: { track: "bg-gradient-to-r from-amber-400 to-rose-500", glow: "rgba(251,191,36,0.5)" },
  };

  const { track, glow } = colorMap[color] ?? colorMap["purple"];

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-white/70">{label}</span>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn((p) => !p)}
        className={`relative w-11 h-6 rounded-full border-2 transition-all duration-300 focus:outline-none ${
          on ? `${track} border-transparent` : "bg-white/10 border-white/20"
        }`}
        style={on ? { boxShadow: `0 0 10px ${glow}` } : undefined}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
