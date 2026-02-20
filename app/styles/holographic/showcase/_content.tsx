"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Diamond, Layers, Wand2, Star, ArrowLeft, Palette, Check, X, Zap, Globe, Lock } from "lucide-react";

// ---------------------------------------------------------------------------
// Inline useInView hook
// ---------------------------------------------------------------------------
function useInView(options: { threshold?: number; once?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.15, once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

// ---------------------------------------------------------------------------
// Inline RevealBlock component
// ---------------------------------------------------------------------------
function RevealBlock({
  children,
  delay = 0,
  inView,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Spectrum button — Spectrum Shift + Jelly Press + Prismatic Glow
// ---------------------------------------------------------------------------
function SpectrumButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "warm" | "cool" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "px-6 py-3 rounded-xl font-semibold text-sm transition-[background-position,box-shadow,transform] duration-500 ease-out active:scale-95 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#0a0a1f] cursor-pointer select-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] hover:bg-right text-white shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6),0_0_20px_rgba(255,0,128,0.4)]",
    secondary:
      "bg-gradient-to-r from-[#a855f7] via-[#6366f1] to-[#00d4ff] bg-[length:200%_auto] hover:bg-right text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6),0_0_20px_rgba(168,85,247,0.4)]",
    warm: "bg-gradient-to-r from-[#ff0080] via-[#ff6b00] to-[#ffd700] bg-[length:200%_auto] hover:bg-right text-white shadow-[0_0_20px_rgba(255,0,128,0.4)] hover:shadow-[0_0_40px_rgba(255,107,0,0.6),0_0_20px_rgba(255,0,128,0.4)]",
    cool: "bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#6366f1] bg-[length:200%_auto] hover:bg-right text-[#0a0a1f] shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,255,136,0.5),0_0_20px_rgba(0,212,255,0.4)]",
    ghost:
      "bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 hover:border-white/30 shadow-none hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Liquid Glass card
// ---------------------------------------------------------------------------
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/10 hover:border-purple-400/40 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] ${className}`}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Accent color chip data
// ---------------------------------------------------------------------------
const ACCENT_COLORS = [
  { name: "Hot Pink", hex: "#ff0080", glow: "rgba(255,0,128,0.6)", label: "from" },
  { name: "Gold", hex: "#ffd700", glow: "rgba(255,215,0,0.6)", label: "via" },
  { name: "Cyan", hex: "#00d4ff", glow: "rgba(0,212,255,0.6)", label: "to" },
  { name: "Green", hex: "#00ff88", glow: "rgba(0,255,136,0.6)", label: "accent" },
  { name: "Indigo", hex: "#6366f1", glow: "rgba(99,102,241,0.6)", label: "alt" },
  { name: "Purple", hex: "#a855f7", glow: "rgba(168,85,247,0.6)", label: "primary" },
];

const SPECTRUM_RECIPES = [
  {
    name: "Full Spectrum",
    classes: "from-[#ff0080] via-[#ffd700] to-[#00d4ff]",
    label: "from-[#ff0080] via-[#ffd700] to-[#00d4ff]",
  },
  {
    name: "Warm Sunset",
    classes: "from-[#ff0080] via-[#ff6b00] to-[#ffd700]",
    label: "from-[#ff0080] via-[#ff6b00] to-[#ffd700]",
  },
  {
    name: "Cool Aurora",
    classes: "from-[#00ff88] via-[#00d4ff] to-[#6366f1]",
    label: "from-[#00ff88] via-[#00d4ff] to-[#6366f1]",
  },
  {
    name: "Cosmic",
    classes: "from-[#a855f7] via-[#6366f1] to-[#00d4ff]",
    label: "from-[#a855f7] via-[#6366f1] to-[#00d4ff]",
  },
  {
    name: "Neon Fusion",
    classes: "from-[#ff0080] via-[#a855f7] to-[#00ff88]",
    label: "from-[#ff0080] via-[#a855f7] to-[#00ff88]",
  },
];

const COMPONENT_TABS = ["Buttons", "Cards", "Inputs"] as const;
type ComponentTab = (typeof COMPONENT_TABS)[number];

const PRINCIPLES = [
  {
    icon: Diamond,
    title: "Prismatic Gradients",
    rule: "DO: Use multi-stop gradients spanning at least 3 hues across 120deg+ of the color wheel.",
    anti: "NEVER use two-stop gradients — they lack the iridescent depth that defines holographic foil.",
    color: "from-[#ff0080] to-[#ffd700]",
    glow: "rgba(255,0,128,0.3)",
  },
  {
    icon: Layers,
    title: "Glass Morphism",
    rule: "DO: Layer bg-white/5 + backdrop-blur-xl + border-white/10 over the dark cosmic background.",
    anti: "NEVER use opaque light backgrounds — holographic lives in deep space, not in daylight.",
    color: "from-[#00d4ff] to-[#6366f1]",
    glow: "rgba(0,212,255,0.3)",
  },
  {
    icon: Wand2,
    title: "Spectrum Shift",
    rule: "DO: Use bg-[length:200%_auto] + hover:bg-right for lateral color-flow on every interactive element.",
    anti: "NEVER animate with opacity fades alone — motion must feel like light refracting across foil.",
    color: "from-[#00ff88] to-[#a855f7]",
    glow: "rgba(0,255,136,0.3)",
  },
  {
    icon: Star,
    title: "Prismatic Glow",
    rule: "DO: Combine dual-color box-shadows — one for the primary hue, one for the accent — on hover.",
    anti: "NEVER use a single-color glow — two-tone shadows are what sells the holographic illusion.",
    color: "from-[#ffd700] to-[#00d4ff]",
    glow: "rgba(255,215,0,0.3)",
  },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeSpectrumTab, setActiveSpectrumTab] = useState(0);
  const [activeComponentTab, setActiveComponentTab] = useState<ComponentTab>("Buttons");
  const [subscribed, setSubscribed] = useState(false);

  // Hero entrance — fires after 100ms to allow paint
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Section reveal refs
  const { ref: spectrumRef, inView: spectrumInView } = useInView();
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: paletteRef, inView: paletteInView } = useInView();
  const { ref: principlesRef, inView: principlesInView } = useInView();
  const { ref: ctaRef, inView: ctaInView } = useInView();

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white relative overflow-x-hidden">

      {/* ------------------------------------------------------------------ */}
      {/* Ambient static glow — cosmic depth                                 */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(168,85,247,0.15) 0%, transparent 55%), " +
            "radial-gradient(ellipse at 80% 85%, rgba(0,212,255,0.1) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 60% 40%, rgba(255,0,128,0.06) 0%, transparent 40%)",
        }}
      />

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes holo-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes holo-badge-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.7; }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50%       { transform: translateY(-12px) rotate(3deg); }
        }
        @keyframes star-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* NAV                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1f]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-4">
              <Link
                href="/styles/holographic"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden md:inline text-sm font-medium">Back</span>
              </Link>
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500">
                Holographic
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Spectrum", "Components", "Palette", "Principles"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>

            <SpectrumButton variant="primary" className="text-sm px-4 py-2">
              Use Style
            </SpectrumButton>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-20 pb-16">
        {/* Animated holographic background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #ff0080, #ff6b00, #ffd700, #00ff88, #00d4ff, #6366f1, #a855f7, #ff0080)",
            backgroundSize: "400% 400%",
            animation: "holo-shift 12s ease infinite",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Floating holographic badge */}
          <RevealBlock inView={heroRevealed} delay={0}>
            <div className="flex justify-center mb-8">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white border border-white/20 backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,0,128,0.3), rgba(147,51,234,0.3), rgba(0,212,255,0.3))",
                  animation: "holo-badge-pulse 3s ease-in-out infinite",
                }}
              >
                <Sparkles className="w-3 h-3" />
                Holographic Design System
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
          </RevealBlock>

          {/* Main heading */}
          <RevealBlock inView={heroRevealed} delay={120}>
            <h1
              className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.9] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] via-[#00ff88] via-[#00d4ff] to-[#a855f7] bg-[length:200%_auto]"
              style={{ animation: "holo-shift 8s ease infinite" }}
            >
              Holo
              <br />
              graphic
            </h1>
          </RevealBlock>

          {/* Tagline */}
          <RevealBlock inView={heroRevealed} delay={240}>
            <p className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Prismatic rainbow gradients that shift like holographic foil.
              Deep space backgrounds make every color sing at full saturation.
            </p>
          </RevealBlock>

          {/* CTAs */}
          <RevealBlock inView={heroRevealed} delay={360}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <SpectrumButton variant="primary" className="px-8 py-4 text-base">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Explore Spectrum
                </span>
              </SpectrumButton>
              <SpectrumButton variant="ghost" className="px-8 py-4 text-base">
                View Docs
              </SpectrumButton>
            </div>
          </RevealBlock>

          {/* Floating decorative orbs */}
          <RevealBlock inView={heroRevealed} delay={480}>
            <div className="mt-16 flex justify-center items-center gap-6">
              {[
                { color: "#ff0080", delay: "0s" },
                { color: "#ffd700", delay: "0.8s" },
                { color: "#00d4ff", delay: "1.6s" },
                { color: "#00ff88", delay: "2.4s" },
                { color: "#a855f7", delay: "3.2s" },
              ].map(({ color, delay }, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 12 + i * 4,
                    height: 12 + i * 4,
                    backgroundColor: color,
                    boxShadow: `0 0 ${16 + i * 6}px ${color}`,
                    animation: `float-y ${2.5 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: delay,
                  }}
                />
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SPECTRUM DEMO                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section id="spectrum" className="px-6 md:px-12 py-16 md:py-24" ref={spectrumRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={spectrumInView} delay={0}>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              Signature Interaction
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Spectrum Shift
            </h2>
            <p className="text-white/50 mb-10 max-w-lg">
              {"Hover each button to watch the color flow laterally — bg-[length:200%_auto] + hover:bg-right in action."}
            </p>
          </RevealBlock>

          {/* Gradient recipe tab switcher */}
          <RevealBlock inView={spectrumInView} delay={100}>
            <div className="flex flex-wrap gap-2 mb-8">
              {SPECTRUM_RECIPES.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => setActiveSpectrumTab(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSpectrumTab === i
                      ? "bg-white/15 text-white border border-white/30"
                      : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock inView={spectrumInView} delay={200}>
            {/* Live spectrum button demo */}
            <GlassCard className="p-8 md:p-12 flex flex-col items-center gap-6">
              <button
                className={`px-12 py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r ${SPECTRUM_RECIPES[activeSpectrumTab].classes} bg-[length:200%_auto] hover:bg-right transition-[background-position,box-shadow] duration-500 ease-out active:scale-95 shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.6),0_0_25px_rgba(255,0,128,0.4)] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#0a0a1f]`}
              >
                Hover Me — Watch the Shift
              </button>
              <div className="bg-black/30 rounded-xl px-6 py-3 border border-white/10">
                <code className="text-xs text-purple-300 font-mono">
                  bg-gradient-to-r {SPECTRUM_RECIPES[activeSpectrumTab].label}
                  {" "}bg-[length:200%_auto] hover:bg-right
                </code>
              </div>
            </GlassCard>
          </RevealBlock>

          {/* All 5 gradient buttons in a row */}
          <RevealBlock inView={spectrumInView} delay={300}>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {SPECTRUM_RECIPES.map((r) => (
                <button
                  key={r.name}
                  className={`py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r ${r.classes} bg-[length:200%_auto] hover:bg-right transition-[background-position,box-shadow] duration-500 ease-out active:scale-95 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#0a0a1f]`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COMPONENT GALLERY                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section id="components" className="px-6 md:px-12 py-16 md:py-24" ref={componentsRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={componentsInView} delay={0}>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              Component Library
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
              UI Components
            </h2>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock inView={componentsInView} delay={80}>
            <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10 w-fit mb-10">
              {COMPONENT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveComponentTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeComponentTab === tab
                      ? "bg-gradient-to-r from-[#a855f7] to-[#00d4ff] text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Buttons panel */}
          {activeComponentTab === "Buttons" && (
            <RevealBlock inView={componentsInView} delay={160}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Full Spectrum", variant: "primary" as const },
                  { label: "Cosmic Purple", variant: "secondary" as const },
                  { label: "Warm Sunset", variant: "warm" as const },
                  { label: "Cool Aurora", variant: "cool" as const },
                  { label: "Ghost Glass", variant: "ghost" as const },
                ].map(({ label, variant }) => (
                  <GlassCard key={label} className="p-6 flex flex-col gap-4 items-start">
                    <p className="text-xs tracking-widest uppercase text-white/40">{variant}</p>
                    <SpectrumButton variant={variant} className="w-full justify-center text-center">
                      {label}
                    </SpectrumButton>
                  </GlassCard>
                ))}
                <GlassCard className="p-6 flex flex-col gap-4 items-start">
                  <p className="text-xs tracking-widest uppercase text-white/40">icon + label</p>
                  <SpectrumButton variant="primary" className="w-full justify-center text-center">
                    <span className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Deploy Now
                    </span>
                  </SpectrumButton>
                </GlassCard>
              </div>
            </RevealBlock>
          )}

          {/* Cards panel */}
          {activeComponentTab === "Cards" && (
            <RevealBlock inView={componentsInView} delay={160}>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Globe,
                    title: "Universal Reach",
                    desc: "Deploy your holographic interface across every platform with pixel-perfect fidelity.",
                    gradient: "from-[#ff0080] to-[#ffd700]",
                    glow: "group-hover:shadow-[0_0_30px_rgba(255,0,128,0.3)]",
                  },
                  {
                    icon: Lock,
                    title: "Secure by Default",
                    desc: "End-to-end encryption baked into every layer of the prismatic stack.",
                    gradient: "from-[#00d4ff] to-[#6366f1]",
                    glow: "group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]",
                  },
                  {
                    icon: Zap,
                    title: "Quantum Speed",
                    desc: "Sub-millisecond rendering with GPU-accelerated gradient compositing.",
                    gradient: "from-[#00ff88] to-[#a855f7]",
                    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]",
                  },
                ].map(({ icon: Icon, title, desc, gradient, glow }) => (
                  <GlassCard key={title} className={`p-6 ${glow}`}>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3
                      className={`text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${gradient} bg-[length:200%_auto] group-hover:bg-right transition-[background-position] duration-500`}
                    >
                      {title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                  </GlassCard>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* Inputs panel */}
          {activeComponentTab === "Inputs" && (
            <RevealBlock inView={componentsInView} delay={160}>
              <div className="max-w-lg space-y-5">
                <div>
                  <label className="text-xs tracking-widest uppercase text-purple-400 mb-2 block">
                    Default Input
                  </label>
                  <input
                    type="text"
                    placeholder="Holographic input..."
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 focus:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-cyan-400 mb-2 block">
                    Cyan Focus Ring
                  </label>
                  <input
                    type="email"
                    placeholder="spectrum@holo.io"
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-pink-400 mb-2 block">
                    Pink Accent
                  </label>
                  <input
                    type="search"
                    placeholder="Search the spectrum..."
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-pink-400/50 focus:shadow-[0_0_15px_rgba(255,0,128,0.3)] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-white/40 mb-2 block">
                    Message
                  </label>
                  <textarea
                    placeholder="Write your holographic message..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 focus:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PRISMATIC PALETTE                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section id="palette" className="px-6 md:px-12 py-16 md:py-24" ref={paletteRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={paletteInView} delay={0}>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              Color System
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Prismatic Palette
            </h2>
            <p className="text-white/50 mb-10 max-w-lg">
              Six spectrum stops that combine to produce every holographic gradient. Hover each chip to see its glow.
            </p>
          </RevealBlock>

          <RevealBlock inView={paletteInView} delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
              {ACCENT_COLORS.map(({ name, hex, glow, label }) => (
                <div
                  key={hex}
                  className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:border-white/30 transition-all duration-300 cursor-pointer"
                  style={{ "--glow-color": glow } as React.CSSProperties}
                >
                  <div
                    className="h-24 transition-all duration-500 group-hover:scale-105"
                    style={{
                      backgroundColor: hex,
                      boxShadow: `inset 0 -8px 16px rgba(0,0,0,0.3)`,
                    }}
                  />
                  <div
                    className="p-3 transition-all duration-300"
                    style={{
                      boxShadow: `0 0 0 0 ${glow}`,
                    }}
                  >
                    <div
                      className="text-xs font-semibold mb-0.5 text-transparent bg-clip-text"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${hex}, white)`,
                      }}
                    >
                      {name}
                    </div>
                    <div className="text-[10px] text-white/40 font-mono">{hex}</div>
                    <div className="text-[10px] text-white/30 mt-0.5 uppercase tracking-wider">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Live gradient swatch */}
          <RevealBlock inView={paletteInView} delay={200}>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-32 md:h-48 relative">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #ff0080, #ff6b00, #ffd700, #00ff88, #00d4ff, #6366f1, #a855f7)",
                  backgroundSize: "300% 300%",
                  animation: "holo-shift 8s ease infinite",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white font-bold text-xl md:text-3xl drop-shadow-lg tracking-wide">
                  Full Spectrum Gradient
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DESIGN PRINCIPLES                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section id="principles" className="px-6 md:px-12 py-16 md:py-24" ref={principlesRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={principlesInView} delay={0}>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              Design Rules
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Holographic Principles
            </h2>
            <p className="text-white/50 mb-12 max-w-lg">
              Four laws that govern every holographic surface. Follow them and the illusion holds.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {PRINCIPLES.map(({ icon: Icon, title, rule, anti, color, glow }, i) => (
              <RevealBlock key={title} inView={principlesInView} delay={i * 100}>
                <GlassCard className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      style={{ boxShadow: `0 4px 20px ${glow}` }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-base font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${color} bg-[length:200%_auto] group-hover:bg-right transition-[background-position] duration-500`}
                      >
                        {title}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-white/70 leading-relaxed">{rule}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <X className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-white/50 leading-relaxed">{anti}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOIL ANIMATION DEMO                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
            Animated Surface
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
            Holographic Foil
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Slow deep foil */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-56 relative group">
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #ff0080, #ff6b00, #ffd700, #00ff88, #00d4ff, #6366f1, #a855f7, #ff0080)",
                  backgroundSize: "300% 300%",
                  animation: "holo-shift 8s ease infinite",
                }}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div style={{ animation: "star-spin 8s linear infinite" }}>
                  <Star className="w-8 h-8 text-white/80" />
                </div>
                <p className="text-white font-bold text-lg drop-shadow-lg">Slow Drift · 8s</p>
                <p className="text-white/60 text-xs">backgroundSize: 300% · ease</p>
              </div>
            </div>

            {/* Fast energetic foil */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-56 relative group">
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background:
                    "linear-gradient(45deg, #a855f7, #ff0080, #ffd700, #00d4ff, #00ff88, #6366f1, #a855f7)",
                  backgroundSize: "400% 400%",
                  animation: "holo-shift 3s ease infinite",
                }}
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div style={{ animation: "star-spin 2s linear infinite" }}>
                  <Sparkles className="w-8 h-8 text-white/80" />
                </div>
                <p className="text-white font-bold text-lg drop-shadow-lg">Fast Pulse · 3s</p>
                <p className="text-white/60 text-xs">backgroundSize: 400% · ease</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA / NEWSLETTER                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-12 py-16 md:py-24" ref={ctaRef}>
        <div className="max-w-3xl mx-auto text-center">
          <RevealBlock inView={ctaInView} delay={0}>
            <div className="relative rounded-3xl overflow-hidden border border-white/10 p-10 md:p-16">
              {/* Background foil */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  background:
                    "linear-gradient(135deg, #ff0080, #ffd700, #00d4ff, #a855f7, #ff0080)",
                  backgroundSize: "300% 300%",
                  animation: "holo-shift 10s ease infinite",
                }}
              />
              <div className="absolute inset-0 bg-[#0a0a1f]/60 backdrop-blur-sm" />

              <div className="relative z-10">
                <p className="text-xs tracking-widest uppercase text-purple-400 mb-4">
                  Stay in the Spectrum
                </p>
                <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] mb-4" style={{ animation: "holo-shift 8s ease infinite" }}>
                  Go Holographic
                </h2>
                <p className="text-white/50 mb-8 max-w-md mx-auto">
                  {"Join the designers building with prismatic gradients. No beige. No boring."}
                </p>

                {subscribed ? (
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/20 border border-green-400/30 text-green-300 font-medium">
                    <Check className="w-4 h-4" />
                    {"You're in the spectrum"}
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                    <input
                      type="email"
                      placeholder="your@email.io"
                      className="flex-1 px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 focus:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300 text-sm"
                    />
                    <SpectrumButton
                      variant="primary"
                      className="px-6 py-3 whitespace-nowrap"
                      onClick={() => setSubscribed(true)}
                    >
                      Subscribe
                    </SpectrumButton>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                              */}
      {/* ------------------------------------------------------------------ */}
      <footer className="bg-[#0a0a1f] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-purple-400" />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500">
                Holographic Showcase
              </span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              {["Spectrum", "Components", "Palette", "Principles"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-white/80 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>

            <Link
              href="/styles/holographic"
              className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center gap-1"
            >
              Full Documentation
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-white/20">
              StyleKit · Holographic Design System · Deep Space Edition
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
