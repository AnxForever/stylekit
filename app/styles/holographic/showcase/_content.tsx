"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Diamond,
  Layers,
  Wand2,
  Star,
  Check,
  X,
  Zap,
  Globe,
  Lock,
  Palette,
  Cpu,
  Shield,
  Flame,
  Eye,
  TrendingUp,
  Code2,
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
// RevealBlock — scroll-reveal wrapper with self-contained intersection logic
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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SpectrumButton — Spectrum Shift + Prismatic Glow + Jelly Press
// ---------------------------------------------------------------------------
function SpectrumButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "warm" | "cool" | "ghost" | "golden";
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "px-6 py-3 rounded-xl font-semibold text-sm transition-[background-position,box-shadow,transform] duration-500 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#0a0a1f] cursor-pointer select-none inline-flex items-center justify-center";

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] hover:bg-right text-white shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6),0_0_20px_rgba(255,0,128,0.4)]",
    secondary:
      "bg-gradient-to-r from-[#a855f7] via-[#6366f1] to-[#00d4ff] bg-[length:200%_auto] hover:bg-right text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6),0_0_20px_rgba(168,85,247,0.4)]",
    warm: "bg-gradient-to-r from-[#ff0080] via-[#ff6b00] to-[#ffd700] bg-[length:200%_auto] hover:bg-right text-white shadow-[0_0_20px_rgba(255,0,128,0.4)] hover:shadow-[0_0_40px_rgba(255,107,0,0.6),0_0_20px_rgba(255,0,128,0.4)]",
    cool: "bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#6366f1] bg-[length:200%_auto] hover:bg-right text-[#0a0a1f] shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,255,136,0.5),0_0_20px_rgba(0,212,255,0.4)]",
    golden:
      "bg-gradient-to-r from-[#ffd700] via-[#ff6b00] to-[#ff0080] bg-[length:200%_auto] hover:bg-right text-[#0a0a1f] shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,107,0,0.6),0_0_20px_rgba(255,215,0,0.4)]",
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
// GlassCard — semi-transparent layered glass card
// ---------------------------------------------------------------------------
function GlassCard({
  children,
  className = "",
  glowColor = "rgba(147,51,234,0.3)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/8 hover:border-purple-400/40 ${className}`}
      style={{
        transition: "transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${glowColor}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// HoloBadge — holographic sticker badge
// ---------------------------------------------------------------------------
function HoloBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 backdrop-blur-md ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255,0,128,0.35), rgba(168,85,247,0.35), rgba(0,212,255,0.35))",
        animation: "holo-badge-pulse 3s ease-in-out infinite",
      }}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const ACCENT_COLORS = [
  { name: "Hot Pink", hex: "#ff0080", glow: "rgba(255,0,128,0.6)", role: "from" },
  { name: "Gold", hex: "#ffd700", glow: "rgba(255,215,0,0.6)", role: "via" },
  { name: "Cyan", hex: "#00d4ff", glow: "rgba(0,212,255,0.6)", role: "to" },
  { name: "Green", hex: "#00ff88", glow: "rgba(0,255,136,0.6)", role: "accent" },
  { name: "Indigo", hex: "#6366f1", glow: "rgba(99,102,241,0.6)", role: "alt" },
  { name: "Purple", hex: "#a855f7", glow: "rgba(168,85,247,0.6)", role: "primary" },
];

const SPECTRUM_RECIPES = [
  {
    name: "Full Spectrum",
    classes: "from-[#ff0080] via-[#ffd700] to-[#00d4ff]",
    label: "from-[#ff0080] via-[#ffd700] to-[#00d4ff]",
    description: "Classic holographic foil — the full rainbow sweep",
  },
  {
    name: "Warm Sunset",
    classes: "from-[#ff0080] via-[#ff6b00] to-[#ffd700]",
    label: "from-[#ff0080] via-[#ff6b00] to-[#ffd700]",
    description: "Warm plasma glow — fire spectrum left to right",
  },
  {
    name: "Cool Aurora",
    classes: "from-[#00ff88] via-[#00d4ff] to-[#6366f1]",
    label: "from-[#00ff88] via-[#00d4ff] to-[#6366f1]",
    description: "Northern lights — green through cyan to indigo",
  },
  {
    name: "Cosmic",
    classes: "from-[#a855f7] via-[#6366f1] to-[#00d4ff]",
    label: "from-[#a855f7] via-[#6366f1] to-[#00d4ff]",
    description: "Deep space — purple nebula meets cyan starlight",
  },
  {
    name: "Neon Fusion",
    classes: "from-[#ff0080] via-[#a855f7] to-[#00ff88]",
    label: "from-[#ff0080] via-[#a855f7] to-[#00ff88]",
    description: "Maximum neon energy — pink through violet to green",
  },
];

const COMPONENT_TABS = ["Buttons", "Cards", "Forms", "Badges"] as const;
type ComponentTab = (typeof COMPONENT_TABS)[number];

const FEATURE_CARDS = [
  {
    icon: Globe,
    title: "Universal Spectrum",
    desc: "Deploy holographic interfaces that shift and shimmer across every device and viewport, maintaining prismatic depth at any resolution.",
    gradient: "from-[#ff0080] to-[#ffd700]",
    glow: "rgba(255,0,128,0.3)",
  },
  {
    icon: Lock,
    title: "Secure by Light",
    desc: "End-to-end encryption layered beneath translucent glass cards. Security wears prismatic armor in the holographic stack.",
    gradient: "from-[#00d4ff] to-[#6366f1]",
    glow: "rgba(0,212,255,0.3)",
  },
  {
    icon: Zap,
    title: "Quantum Velocity",
    desc: "GPU-accelerated gradient compositing delivers sub-millisecond render cycles. Your holographic UI feels instant.",
    gradient: "from-[#00ff88] to-[#a855f7]",
    glow: "rgba(0,255,136,0.3)",
  },
  {
    icon: Cpu,
    title: "Prismatic Engine",
    desc: "Background-size animation and lateral color flow are hardware-accelerated. No jank in the spectrum.",
    gradient: "from-[#ffd700] to-[#00d4ff]",
    glow: "rgba(255,215,0,0.3)",
  },
  {
    icon: Shield,
    title: "Glass Morphism",
    desc: "Semi-transparent bg-white/5 cards with backdrop-blur-xl create depth without sacrificing the dark cosmic base.",
    gradient: "from-[#a855f7] to-[#ff0080]",
    glow: "rgba(168,85,247,0.3)",
  },
  {
    icon: Eye,
    title: "Prismatic Contrast",
    desc: "High-saturation accents on a near-black #0a0a1f canvas. Every hue punches at maximum visibility.",
    gradient: "from-[#6366f1] to-[#00ff88]",
    glow: "rgba(99,102,241,0.3)",
  },
];

const PRINCIPLES = [
  {
    icon: Diamond,
    title: "Prismatic Gradients",
    rule: "Use multi-stop gradients spanning at least 3 hues across 120deg+ of the color wheel. bg-gradient-to-r with 3+ color stops minimum.",
    anti: "Never use two-stop gradients — they lack the iridescent depth that defines holographic foil.",
    color: "from-[#ff0080] to-[#ffd700]",
    glow: "rgba(255,0,128,0.3)",
  },
  {
    icon: Layers,
    title: "Glass Morphism",
    rule: "Layer bg-white/5 + backdrop-blur-xl + border-white/10 over the dark cosmic background to simulate translucent holographic film.",
    anti: "Never use opaque light backgrounds — holographic lives in deep space, not in daylight. bg-white is forbidden.",
    color: "from-[#00d4ff] to-[#6366f1]",
    glow: "rgba(0,212,255,0.3)",
  },
  {
    icon: Wand2,
    title: "Spectrum Shift",
    rule: "Use bg-[length:200%_auto] + hover:bg-right for lateral color-flow on every interactive element. Motion must feel like light refracting across foil.",
    anti: "Never animate with opacity fades alone — hover:opacity-80 misses the holographic essence entirely.",
    color: "from-[#00ff88] to-[#a855f7]",
    glow: "rgba(0,255,136,0.3)",
  },
  {
    icon: Star,
    title: "Prismatic Glow",
    rule: "Combine dual-color box-shadows on hover — one for the primary hue, one for the accent. Two-tone shadows sell the holographic illusion.",
    anti: "Never use a single-color glow. A monochrome shadow is flat; holographic foil always refracts into multiple frequencies.",
    color: "from-[#ffd700] to-[#00d4ff]",
    glow: "rgba(255,215,0,0.3)",
  },
  {
    icon: Flame,
    title: "Dark Cosmic Canvas",
    rule: "Always use #0a0a1f (cosmic near-black) as the base background. High saturation colors only reach their peak vividness against near-black.",
    anti: "Never use white, light gray, or any background above 15% lightness. Pastel colors on light backgrounds are not holographic.",
    color: "from-[#a855f7] to-[#ff0080]",
    glow: "rgba(168,85,247,0.3)",
  },
  {
    icon: TrendingUp,
    title: "Holographic Badges",
    rule: "Use holographic sticker badges — semi-transparent gradient backgrounds with border-white/20 and animation — to label special UI states.",
    anti: "Never use solid color badges without gradient treatment. Even status pills should shimmer with at least a 2-hue gradient.",
    color: "from-[#6366f1] to-[#00ff88]",
    glow: "rgba(99,102,241,0.3)",
  },
];

const FOIL_VARIANTS = [
  {
    name: "Slow Drift",
    duration: "8s",
    angle: "135deg",
    colors: "#ff0080, #ff6b00, #ffd700, #00ff88, #00d4ff, #6366f1, #a855f7, #ff0080",
    size: "300%",
    icon: Star,
    spin: "8s",
    note: "backgroundSize: 300% · 8s ease",
  },
  {
    name: "Fast Pulse",
    duration: "3s",
    angle: "45deg",
    colors: "#a855f7, #ff0080, #ffd700, #00d4ff, #00ff88, #6366f1, #a855f7",
    size: "400%",
    icon: Sparkles,
    spin: "2s",
    note: "backgroundSize: 400% · 3s ease",
  },
  {
    name: "Diagonal Sweep",
    duration: "6s",
    angle: "90deg",
    colors: "#00d4ff, #a855f7, #ff0080, #ffd700, #00ff88, #00d4ff",
    size: "350%",
    icon: Zap,
    spin: "4s",
    note: "backgroundSize: 350% · 6s ease",
  },
  {
    name: "Cosmic Pulse",
    duration: "10s",
    angle: "225deg",
    colors: "#0a0a1f, #a855f7, #ff0080, #ffd700, #00d4ff, #0a0a1f",
    size: "300%",
    icon: Eye,
    spin: "12s",
    note: "backgroundSize: 300% · 10s ease · dark blend",
  },
];

const STATS = [
  { value: "5", label: "Accent colors", sub: "forming the spectrum" },
  { value: "200%", label: "Background size", sub: "for lateral shift" },
  { value: "3+", label: "Gradient stops", sub: "minimum per element" },
  { value: "0", label: "Light backgrounds", sub: "dark canvas only" },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function HolographicShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeSpectrumTab, setActiveSpectrumTab] = useState(0);
  const [activeComponentTab, setActiveComponentTab] = useState<ComponentTab>("Buttons");
  const [subscribed, setSubscribed] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeHoloVariant, setActiveHoloVariant] = useState(0);

  // Hero entrance — fires after 120ms to allow paint
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  function handleCopyColor(hex: string) {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  }

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white relative overflow-x-hidden">

      {/* Global keyframes */}
      <style>{`
        @keyframes holo-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes holo-badge-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.72; }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50%       { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes star-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes prism-border {
          0%   { border-color: rgba(255,0,128,0.5); }
          25%  { border-color: rgba(255,215,0,0.5); }
          50%  { border-color: rgba(0,212,255,0.5); }
          75%  { border-color: rgba(0,255,136,0.5); }
          100% { border-color: rgba(255,0,128,0.5); }
        }
      `}</style>

      {/* Ambient static glow — cosmic depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(168,85,247,0.15) 0%, transparent 55%), " +
            "radial-gradient(ellipse at 80% 85%, rgba(0,212,255,0.10) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 60% 40%, rgba(255,0,128,0.06) 0%, transparent 40%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* NAV — fixed, no RevealBlock                                         */}
      {/* ------------------------------------------------------------------ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1f]/90 backdrop-blur-xl"
        style={{
          borderBottom: "1px solid",
          animation: "prism-border 6s linear infinite",
        }}
      >
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
              <span
                className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] transition-[background-position] duration-500 hover:bg-right"
              >
                Holographic
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {["Spectrum", "Components", "Effects", "Palette", "Principles"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>

            <SpectrumButton variant="primary" className="text-xs px-4 py-2">
              Use Style
            </SpectrumButton>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1 — HERO                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 pb-16">
        {/* Animated holographic foil background */}
        <div
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #ff0080, #ff6b00, #ffd700, #00ff88, #00d4ff, #6366f1, #a855f7, #ff0080)",
            backgroundSize: "400% 400%",
            animation: "holo-shift 14s ease infinite",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Floating holographic badge */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="flex justify-center mb-8">
              <HoloBadge>
                <Sparkles className="w-3 h-3" />
                Holographic Design System · Full Spectrum
                <Sparkles className="w-3 h-3" />
              </HoloBadge>
            </div>
          </div>

          {/* Main heading — animated rainbow */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            <h1
              className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.88] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] via-[#00ff88] via-[#00d4ff] to-[#a855f7] bg-[length:200%_auto]"
              style={{ animation: "holo-shift 8s ease infinite" }}
            >
              Holo
              <br />
              graphic
            </h1>
          </div>

          {/* Tagline */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <p className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Prismatic rainbow gradients that shift like holographic foil.
              Cosmic dark background. Every color at maximum saturation.
            </p>
          </div>

          {/* CTAs */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.38s",
            }}
          >
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <SpectrumButton variant="primary" className="px-8 py-4 text-base gap-2">
                <Sparkles className="w-4 h-4" />
                Explore Spectrum
              </SpectrumButton>
              <SpectrumButton variant="secondary" className="px-8 py-4 text-base gap-2">
                <Code2 className="w-4 h-4" />
                View Source
              </SpectrumButton>
              <SpectrumButton variant="ghost" className="px-8 py-4 text-base">
                Documentation
              </SpectrumButton>
            </div>
          </div>

          {/* Floating decorative orbs */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <div className="mt-16 flex justify-center items-end gap-5">
              {ACCENT_COLORS.map(({ hex, glow }, i) => (
                <div
                  key={hex}
                  className="rounded-full"
                  style={{
                    width: 10 + i * 5,
                    height: 10 + i * 5,
                    backgroundColor: hex,
                    boxShadow: `0 0 ${14 + i * 7}px ${glow}`,
                    animation: `float-y ${2.4 + i * 0.45}s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2 — STATS BAR                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-12 py-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {STATS.map(({ value, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center px-6 py-4">
                <span
                  className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto]"
                  style={{ animation: "holo-shift 10s ease infinite" }}
                >
                  {value}
                </span>
                <span className="mt-1 text-sm font-semibold text-white/70">{label}</span>
                <span className="text-xs text-white/30">{sub}</span>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3 — SPECTRUM SHIFT DEMO                                     */}
      {/* ------------------------------------------------------------------ */}
      <section id="spectrum" className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              Signature Interaction
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Spectrum Shift
            </h2>
            <p className="text-white/50 mb-10 max-w-lg">
              {"Hover each button to watch color flow laterally — bg-[length:200%_auto] + hover:bg-right in action."}
            </p>
          </RevealBlock>

          {/* Recipe tab switcher */}
          <RevealBlock delay={0.08}>
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

          {/* Live demo card */}
          <RevealBlock delay={0.16}>
            <GlassCard className="p-8 md:p-12 flex flex-col items-center gap-6 mb-8">
              <button
                className={`px-12 py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r ${SPECTRUM_RECIPES[activeSpectrumTab].classes} bg-[length:200%_auto] hover:bg-right transition-[background-position,box-shadow] duration-500 ease-out active:scale-95 shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_50px_rgba(0,212,255,0.6),0_0_25px_rgba(255,0,128,0.4)] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#0a0a1f]`}
              >
                Hover Me — Watch the Spectrum Shift
              </button>
              <div className="text-center">
                <p className="text-xs text-white/30 mb-2 uppercase tracking-widest">{SPECTRUM_RECIPES[activeSpectrumTab].description}</p>
                <div className="bg-black/40 rounded-xl px-6 py-3 border border-white/10 inline-block">
                  <code className="text-xs text-purple-300 font-mono">
                    bg-gradient-to-r {SPECTRUM_RECIPES[activeSpectrumTab].label} bg-[length:200%_auto] hover:bg-right
                  </code>
                </div>
              </div>
            </GlassCard>
          </RevealBlock>

          {/* All 5 gradient buttons grid */}
          <RevealBlock delay={0.24}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {SPECTRUM_RECIPES.map((r) => (
                <button
                  key={r.name}
                  className={`py-4 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r ${r.classes} bg-[length:200%_auto] hover:bg-right transition-[background-position,box-shadow,transform] duration-500 ease-out active:scale-95 hover:shadow-[0_0_24px_rgba(147,51,234,0.5),0_0_12px_rgba(0,212,255,0.3)] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#0a0a1f]`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4 — COMPONENT GALLERY                                       */}
      {/* ------------------------------------------------------------------ */}
      <section id="components" className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              Component Library
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
              UI Components
            </h2>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.08}>
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
            <RevealBlock delay={0.14}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(
                  [
                    { label: "Full Spectrum", variant: "primary" as const, desc: "Primary CTA — full rainbow sweep" },
                    { label: "Cosmic Purple", variant: "secondary" as const, desc: "Secondary — purple to cyan" },
                    { label: "Warm Sunset", variant: "warm" as const, desc: "Warm — pink through orange to gold" },
                    { label: "Cool Aurora", variant: "cool" as const, desc: "Cool — green through cyan to indigo" },
                    { label: "Golden Horizon", variant: "golden" as const, desc: "Golden — gold through orange to pink" },
                    { label: "Ghost Glass", variant: "ghost" as const, desc: "Ghost — semi-transparent glass" },
                  ] as const
                ).map(({ label, variant, desc }) => (
                  <GlassCard key={label} className="p-6 flex flex-col gap-4 items-start">
                    <p className="text-[10px] tracking-widest uppercase text-white/30">{variant}</p>
                    <p className="text-xs text-white/50">{desc}</p>
                    <SpectrumButton variant={variant} className="w-full">
                      {label}
                    </SpectrumButton>
                  </GlassCard>
                ))}
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <GlassCard className="p-6 flex flex-col gap-4">
                  <p className="text-[10px] tracking-widest uppercase text-white/30">icon + label</p>
                  <div className="flex gap-3 flex-wrap">
                    <SpectrumButton variant="primary" className="gap-2">
                      <Zap className="w-4 h-4" />
                      Deploy Now
                    </SpectrumButton>
                    <SpectrumButton variant="cool" className="gap-2">
                      <Sparkles className="w-4 h-4" />
                      Prismatic
                    </SpectrumButton>
                  </div>
                </GlassCard>
                <GlassCard className="p-6 flex flex-col gap-4">
                  <p className="text-[10px] tracking-widest uppercase text-white/30">disabled state</p>
                  <div className="flex gap-3 flex-wrap">
                    <button
                      className="px-6 py-3 rounded-xl font-semibold text-sm bg-white/5 text-white/25 border border-white/10 cursor-not-allowed select-none"
                      disabled
                    >
                      Disabled Button
                    </button>
                    <button
                      className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] text-white/40 cursor-not-allowed select-none opacity-30"
                      disabled
                    >
                      Disabled Spectrum
                    </button>
                  </div>
                </GlassCard>
              </div>
            </RevealBlock>
          )}

          {/* Cards panel */}
          {activeComponentTab === "Cards" && (
            <RevealBlock delay={0.14}>
              <div className="grid md:grid-cols-3 gap-6">
                {FEATURE_CARDS.map(({ icon: Icon, title, desc, gradient, glow }) => (
                  <GlassCard key={title} className="p-6" glowColor={glow}>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5`}
                      style={{ boxShadow: `0 4px 20px ${glow}` }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3
                      className={`text-base font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${gradient} bg-[length:200%_auto] group-hover:bg-right transition-[background-position] duration-500`}
                    >
                      {title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                  </GlassCard>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* Forms panel */}
          {activeComponentTab === "Forms" && (
            <RevealBlock delay={0.14}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Input Fields</h3>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-purple-400 mb-2 block">
                      Default · Purple Ring
                    </label>
                    <input
                      type="text"
                      placeholder="Holographic input..."
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 focus:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-cyan-400 mb-2 block">
                      Email · Cyan Ring
                    </label>
                    <input
                      type="email"
                      placeholder="spectrum@holo.io"
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-pink-400 mb-2 block">
                      Search · Pink Ring
                    </label>
                    <input
                      type="search"
                      placeholder="Search the spectrum..."
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-pink-400/50 focus:shadow-[0_0_15px_rgba(255,0,128,0.3)] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-white/40 mb-2 block">
                      Message · Textarea
                    </label>
                    <textarea
                      placeholder="Write your holographic message..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 focus:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
                <div className="space-y-5">
                  <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Select &amp; Toggle</h3>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-purple-400 mb-2 block">
                      Dropdown
                    </label>
                    <select className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white focus:outline-none focus:border-purple-400/50 focus:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all duration-300 appearance-none cursor-pointer">
                      <option value="" className="bg-[#0a0a1f]">Select spectrum...</option>
                      <option value="full" className="bg-[#0a0a1f]">Full Spectrum</option>
                      <option value="warm" className="bg-[#0a0a1f]">Warm Sunset</option>
                      <option value="cool" className="bg-[#0a0a1f]">Cool Aurora</option>
                    </select>
                  </div>
                  <GlassCard className="p-5">
                    <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Checkbox Group</p>
                    {["Prismatic Gradients", "Glass Morphism", "Spectrum Shift", "Prismatic Glow"].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 py-2 cursor-pointer group">
                        <div className="w-5 h-5 rounded border border-white/20 bg-white/5 group-hover:border-purple-400/50 transition-colors duration-300 flex items-center justify-center flex-shrink-0">
                          <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-[#a855f7] to-[#00d4ff] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                        </div>
                        <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors duration-300">{opt}</span>
                      </label>
                    ))}
                  </GlassCard>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Badges panel */}
          {activeComponentTab === "Badges" && (
            <RevealBlock delay={0.14}>
              <div className="space-y-8">
                <div>
                  <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Holographic Sticker Badges</p>
                  <div className="flex flex-wrap gap-3">
                    <HoloBadge>
                      <Sparkles className="w-3 h-3" />
                      Holographic
                    </HoloBadge>
                    <HoloBadge>
                      <Star className="w-3 h-3" />
                      Prismatic
                    </HoloBadge>
                    <HoloBadge>
                      <Zap className="w-3 h-3" />
                      Full Spectrum
                    </HoloBadge>
                    <HoloBadge>
                      <Diamond className="w-3 h-3" />
                      Cosmic Dark
                    </HoloBadge>
                    <HoloBadge>
                      <Flame className="w-3 h-3" />
                      Neon Glow
                    </HoloBadge>
                  </div>
                </div>

                <div>
                  <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Gradient Status Pills</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Active", gradient: "from-[#00ff88] to-[#00d4ff]", dot: "#00ff88" },
                      { label: "Pending", gradient: "from-[#ffd700] to-[#ff6b00]", dot: "#ffd700" },
                      { label: "Error", gradient: "from-[#ff0080] to-[#ff6b00]", dot: "#ff0080" },
                      { label: "Syncing", gradient: "from-[#a855f7] to-[#6366f1]", dot: "#a855f7" },
                      { label: "Prismatic", gradient: "from-[#ff0080] via-[#ffd700] to-[#00d4ff]", dot: "#00d4ff" },
                    ].map(({ label, gradient, dot }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#0a0a1f]"
                        style={{
                          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                        }}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${gradient} text-[#0a0a1f]`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot }} />
                          {label}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs tracking-widest uppercase text-white/40 mb-4">Outline Glow Badges</p>
                  <div className="flex flex-wrap gap-3">
                    {ACCENT_COLORS.map(({ name, hex, glow }) => (
                      <span
                        key={hex}
                        className="px-3 py-1 rounded-full text-xs font-semibold border bg-transparent transition-all duration-300 hover:scale-105"
                        style={{
                          borderColor: hex,
                          color: hex,
                          boxShadow: `0 0 8px ${glow}`,
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5 — HOLOGRAPHIC FOIL EFFECTS SHOWCASE                       */}
      {/* ------------------------------------------------------------------ */}
      <section id="effects" className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              Animated Surfaces
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Holographic Foil
            </h2>
            <p className="text-white/50 mb-10 max-w-lg">
              Four foil variants demonstrating how background-size, animation speed, and gradient angle combine to produce distinct holographic moods.
            </p>
          </RevealBlock>

          {/* Variant selector */}
          <RevealBlock delay={0.08}>
            <div className="flex flex-wrap gap-2 mb-8">
              {FOIL_VARIANTS.map((v, i) => (
                <button
                  key={v.name}
                  onClick={() => setActiveHoloVariant(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeHoloVariant === i
                      ? "bg-white/15 text-white border border-white/30"
                      : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Featured foil demo */}
          <RevealBlock delay={0.16}>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-72 md:h-96 relative group mb-8">
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(${FOIL_VARIANTS[activeHoloVariant].angle}, ${FOIL_VARIANTS[activeHoloVariant].colors})`,
                  backgroundSize: `${FOIL_VARIANTS[activeHoloVariant].size} ${FOIL_VARIANTS[activeHoloVariant].size}`,
                  animation: `holo-shift ${FOIL_VARIANTS[activeHoloVariant].duration} ease infinite`,
                }}
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div style={{ animation: `star-spin ${FOIL_VARIANTS[activeHoloVariant].spin} linear infinite` }}>
                  {(() => {
                    const IconComponent = FOIL_VARIANTS[activeHoloVariant].icon;
                    return <IconComponent className="w-10 h-10 text-white/90" />;
                  })()}
                </div>
                <p className="text-white font-black text-2xl md:text-4xl drop-shadow-lg tracking-wide">
                  {FOIL_VARIANTS[activeHoloVariant].name}
                </p>
                <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <code className="text-xs text-white/70 font-mono">{FOIL_VARIANTS[activeHoloVariant].note}</code>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* All four variants grid */}
          <RevealBlock delay={0.24}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {FOIL_VARIANTS.map((v, i) => {
                const IconComp = v.icon;
                return (
                  <button
                    key={v.name}
                    onClick={() => setActiveHoloVariant(i)}
                    className={`rounded-xl overflow-hidden h-36 relative group cursor-pointer transition-all duration-300 ${
                      activeHoloVariant === i ? "ring-2 ring-white/40 ring-offset-2 ring-offset-[#0a0a1f]" : ""
                    }`}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(${v.angle}, ${v.colors})`,
                        backgroundSize: `${v.size} ${v.size}`,
                        animation: `holo-shift ${v.duration} ease infinite`,
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                      <IconComp className="w-6 h-6 text-white/90" />
                      <span className="text-white font-bold text-xs">{v.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 6 — COLOR SPECTRUM PALETTE                                  */}
      {/* ------------------------------------------------------------------ */}
      <section id="palette" className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              Color System
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Prismatic Palette
            </h2>
            <p className="text-white/50 mb-10 max-w-lg">
              Six spectrum stops that combine to produce every holographic gradient. Click any chip to copy its hex value.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.08}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-12">
              {ACCENT_COLORS.map(({ name, hex, glow, role }) => (
                <button
                  key={hex}
                  onClick={() => handleCopyColor(hex)}
                  className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 hover:border-white/30 transition-all duration-300 cursor-pointer text-left"
                >
                  <div
                    className="h-24 transition-transform duration-500 group-hover:scale-110 origin-bottom"
                    style={{
                      backgroundColor: hex,
                      boxShadow: `inset 0 -8px 16px rgba(0,0,0,0.3)`,
                    }}
                  />
                  <div
                    className="p-3 transition-all duration-300 group-hover:shadow-[0_-8px_20px_var(--glow)]"
                    style={{ "--glow": glow } as React.CSSProperties}
                  >
                    <div
                      className="text-xs font-semibold mb-0.5 text-transparent bg-clip-text"
                      style={{ backgroundImage: `linear-gradient(to right, ${hex}, white)` }}
                    >
                      {copiedColor === hex ? "Copied!" : name}
                    </div>
                    <div className="text-[10px] text-white/40 font-mono">{hex}</div>
                    <div className="text-[10px] text-white/30 mt-0.5 uppercase tracking-wider">{role}</div>
                  </div>
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Full spectrum gradient swatch */}
          <RevealBlock delay={0.16}>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-32 md:h-52 relative">
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
                <p className="text-white font-black text-xl md:text-4xl drop-shadow-lg tracking-wide">
                  Full Spectrum Gradient
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Gradient recipe swatches */}
          <RevealBlock delay={0.24}>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {SPECTRUM_RECIPES.map((r) => (
                <div
                  key={r.name}
                  className={`h-16 rounded-xl bg-gradient-to-r ${r.classes} flex items-center justify-center transition-all duration-500 hover:shadow-[0_0_24px_rgba(147,51,234,0.4)] hover:scale-[1.03]`}
                >
                  <span className="text-white text-xs font-bold drop-shadow">{r.name}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 7 — DESIGN PRINCIPLES                                        */}
      {/* ------------------------------------------------------------------ */}
      <section id="principles" className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <p className="text-xs tracking-widest uppercase text-purple-400 mb-3">
              Design Rules
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Holographic Principles
            </h2>
            <p className="text-white/50 mb-12 max-w-lg">
              Six laws that govern every holographic surface. Follow them and the prism illusion holds — break them and it collapses.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-5">
            {PRINCIPLES.map(({ icon: Icon, title, rule, anti, color, glow }, i) => (
              <RevealBlock key={title} delay={i * 0.08}>
                <GlassCard className="p-6 h-full" glowColor={glow}>
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
                      style={{ boxShadow: `0 4px 20px ${glow}` }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
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
      {/* SECTION 8 — CTA / NEWSLETTER                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <RevealBlock>
            <div className="relative rounded-3xl overflow-hidden border border-white/10 p-10 md:p-16">
              {/* Animated foil BG */}
              <div
                className="absolute inset-0 opacity-[0.14]"
                style={{
                  background:
                    "linear-gradient(135deg, #ff0080, #ffd700, #00d4ff, #a855f7, #ff0080)",
                  backgroundSize: "300% 300%",
                  animation: "holo-shift 10s ease infinite",
                }}
              />
              <div className="absolute inset-0 bg-[#0a0a1f]/65 backdrop-blur-sm" />

              <div className="relative z-10">
                <HoloBadge className="mb-6">
                  <Sparkles className="w-3 h-3" />
                  Stay in the Spectrum
                </HoloBadge>
                <h2
                  className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] mb-4 mt-4"
                  style={{ animation: "holo-shift 8s ease infinite" }}
                >
                  Go Holographic
                </h2>
                <p className="text-white/50 mb-8 max-w-md mx-auto">
                  {"Join the designers building with prismatic gradients. No beige. No flat colors. No boring."}
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
      <footer className="bg-[#0a0a1f] border-t border-white/10 relative overflow-hidden">
        {/* Prismatic accent line at the top */}
        <div
          className="h-0.5 w-full"
          style={{
            background:
              "linear-gradient(to right, #ff0080, #ffd700, #00d4ff, #00ff88, #a855f7, #6366f1, #ff0080)",
            backgroundSize: "200% auto",
            animation: "holo-shift 6s ease infinite",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-purple-400" />
              <span
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500"
              >
                Holographic Showcase
              </span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              {["Spectrum", "Components", "Effects", "Palette", "Principles"].map((item) => (
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
              StyleKit · Holographic Design System · Deep Space Edition · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
