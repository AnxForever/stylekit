"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrollY;
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate.getTime() - now);
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

// ─────────────────────────────────────────────────────────────
// RevealBlock
// ─────────────────────────────────────────────────────────────

function RevealBlock({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const ACCENTS = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#6c5ce7"] as const;
const ACCENT_NAMES = ["Coral Red", "Turquoise", "Canary", "Deep Violet"] as const;

type HeroVariant = "dark" | "light" | "gradient" | "split";

const HERO_VARIANTS: { key: HeroVariant; label: string; description: string }[] = [
  { key: "dark",     label: "Dark Overlay",    description: "Classic dark overlay on a rich image — maximum text contrast" },
  { key: "light",    label: "Light Hero",      description: "White canvas with bold black type — clean and confident" },
  { key: "gradient", label: "Gradient Wash",   description: "Vivid gradient fill — no photo required" },
  { key: "split",    label: "Split Screen",    description: "Left: content, Right: image — modern editorial balance" },
];

type BgTreatment = "solid" | "gradient" | "overlay";

const BG_TREATMENTS: { key: BgTreatment; label: string; description: string; preview: string }[] = [
  {
    key: "solid",
    label: "Solid Dark",
    description: "Pure black or near-black fills the viewport. Clean, confident. Works for brand-led pages.",
    preview: "#0a0a0a",
  },
  {
    key: "gradient",
    label: "Multi-stop Gradient",
    description: "A sweep of color conveys energy without needing photography. Use 2–3 stops maximum.",
    preview: "linear-gradient(135deg, #6c5ce7 0%, #ff6b6b 50%, #ffe66d 100%)",
  },
  {
    key: "overlay",
    label: "Image Overlay",
    description: "A full-bleed image sits under a semi-transparent gradient, protecting type legibility.",
    preview: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.3)), url('https://picsum.photos/seed/hf_bg_ex/800/400') center/cover",
  },
];

type CtaVariant = "primary" | "ghost" | "outline" | "icon" | "pill" | "large";

const CTA_VARIANTS: { key: CtaVariant; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "ghost",   label: "Ghost" },
  { key: "outline", label: "Outline" },
  { key: "icon",    label: "With Icon" },
  { key: "pill",    label: "Pill" },
  { key: "large",   label: "Large Hero" },
];

const doList = [
  { rule: "Use h-screen or min-h-screen", note: "Ensures the section always fills the viewport, regardless of content." },
  { rule: "object-cover on background images", note: "Keeps images at correct aspect ratio while filling the container." },
  { rule: "Gradient or tinted overlay", note: "Protects text legibility on busy photography." },
  { rule: "Absolute-positioned navigation", note: "Nav floats above the hero, becomes solid on scroll." },
  { rule: "Scroll indicator at bottom", note: "Guides users who may not scroll organically." },
  { rule: "hover:-translate-y-1 on primary CTA", note: "Gravity float creates a premium lifted feel on interaction." },
  { rule: "group + group-hover on feature cards", note: "Enables icon micro-scale and text brightness shift together." },
  { rule: "active:scale-[0.98] on all buttons", note: "Tactile press confirmation — critical on dark overlays." },
];

const dontList = [
  { rule: "Text directly on busy images", note: "Guaranteed contrast failure — always add an overlay layer." },
  { rule: "Autoplay video with sound", note: "Browsers block it anyway. Users find it intrusive. Always mute." },
  { rule: "Skip mobile breakpoints", note: "Full-screen heroes often break hard on narrow viewports without md: variants." },
  { rule: "Fill every pixel with content", note: "White space is oxygen. Leave room to breathe at the edges." },
  { rule: "Omit active:scale-[0.98]", note: "Buttons on dark backgrounds feel unresponsive without tactile feedback." },
  { rule: "Card without group class", note: "group-hover:scale-110 on icon requires group on the parent — not the icon." },
  { rule: "Low-quality or stretched images", note: "Full-viewport displays flaws at 100% zoom. Source 1920+ px wide." },
];

const TYPE_SCALE = [
  { size: "text-8xl md:text-9xl", label: "Display / 6xl–7xl", usage: "Main hero headline — single line preferred", sample: "Impact." },
  { size: "text-5xl md:text-7xl", label: "Hero / 4xl–6xl",    usage: "Section headings beneath the fold",          sample: "Command." },
  { size: "text-3xl md:text-5xl", label: "Title / 2xl–4xl",   usage: "Sub-section or feature headings",            sample: "Explore." },
  { size: "text-xl md:text-2xl",  label: "Subhead / xl–2xl",  usage: "Supporting copy under the main headline",    sample: "Launch something extraordinary." },
  { size: "text-base",            label: "Body / base",       usage: "Descriptive paragraph text",                 sample: "Full-viewport layouts create total visual immersion." },
  { size: "text-xs tracking-[0.3em] uppercase", label: "Eyebrow / xs", usage: "Category labels and kickers", sample: "New Arrival" },
];

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function HeroVariantDark() {
  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://picsum.photos/seed/hf_dark/1200/600"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      <nav className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-10">
        <span className="text-white font-bold tracking-[0.2em] uppercase text-sm">
          HERO<span style={{ color: ACCENTS[0] }}>.</span>FS
        </span>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-white/70 text-xs tracking-widest uppercase">Features</span>
          <span className="text-white/70 text-xs tracking-widest uppercase">Pricing</span>
          <span className="text-white/70 text-xs tracking-widest uppercase">About</span>
        </div>
        <button
          type="button"
          className="text-xs tracking-widest uppercase px-4 py-2 border border-white/40 text-white/80 rounded-sm hover:bg-white/10 hover:border-white hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
        >
          Sign Up
        </button>
      </nav>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-12">
        <span className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENTS[1] }}>
          Dark Overlay
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-none mb-4">
          Command Every
          <br />
          <span style={{ color: ACCENTS[0] }}>Viewport.</span>
        </h2>
        <p className="text-white/60 max-w-sm text-sm mb-6">
          Rich imagery beneath a gradient shield — contrast protected.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-6 py-3 text-sm font-bold text-white rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
            style={{ backgroundColor: ACCENTS[0] }}
          >
            Get Started
          </button>
          <button
            type="button"
            className="px-6 py-3 text-sm font-bold text-white border-2 border-white bg-transparent rounded-sm hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 bounce-arrow">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
}

function HeroVariantLight() {
  return (
    <div className="relative w-full h-72 md:h-96 bg-white overflow-hidden rounded-sm">
      {/* Minimal grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <nav className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-10">
        <span className="text-black font-bold tracking-[0.2em] uppercase text-sm">
          HERO<span style={{ color: ACCENTS[0] }}>.</span>FS
        </span>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-black/50 text-xs tracking-widest uppercase">Features</span>
          <span className="text-black/50 text-xs tracking-widest uppercase">Pricing</span>
          <span className="text-black/50 text-xs tracking-widest uppercase">About</span>
        </div>
        <button
          type="button"
          className="text-xs tracking-widest uppercase px-4 py-2 bg-black text-white rounded-sm hover:bg-black/80 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-black/30 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
        >
          Sign Up
        </button>
      </nav>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-12">
        <span className="text-xs tracking-[0.3em] uppercase mb-4 text-black/40">
          Light Hero
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-black leading-none mb-4">
          Clean Canvas.
          <br />
          Bold <span style={{ color: ACCENTS[3] }}>Statement.</span>
        </h2>
        <p className="text-black/50 max-w-sm text-sm mb-6">
          White space as weapon — maximum authority on a light ground.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-6 py-3 text-sm font-bold text-white bg-black rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-black/40 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
          >
            Get Started
          </button>
          <button
            type="button"
            className="px-6 py-3 text-sm font-bold text-black border-2 border-black bg-transparent rounded-sm hover:bg-black/5 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.15)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-black/30 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

function HeroVariantGradient() {
  return (
    <div
      className="relative w-full h-72 md:h-96 overflow-hidden rounded-sm"
      style={{ background: "linear-gradient(135deg, #6c5ce7 0%, #ff6b6b 55%, #ffe66d 100%)" }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <nav className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-10">
        <span className="text-white font-bold tracking-[0.2em] uppercase text-sm">
          HERO<span className="text-white/60">.</span>FS
        </span>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-white/80 text-xs tracking-widest uppercase">Features</span>
          <span className="text-white/80 text-xs tracking-widest uppercase">Pricing</span>
          <span className="text-white/80 text-xs tracking-widest uppercase">About</span>
        </div>
        <button
          type="button"
          className="text-xs tracking-widest uppercase px-4 py-2 bg-white text-black rounded-sm hover:bg-white/90 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
        >
          Sign Up
        </button>
      </nav>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-12">
        <span className="text-xs tracking-[0.3em] uppercase text-white/70 mb-4">
          Gradient Wash
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-none mb-4 drop-shadow-lg">
          Vivid Without
          <br />
          Photography.
        </h2>
        <p className="text-white/80 max-w-sm text-sm mb-6">
          Multi-stop gradient replaces the image — energy built from color alone.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-6 py-3 text-sm font-bold bg-white text-black rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            Get Started
          </button>
          <button
            type="button"
            className="px-6 py-3 text-sm font-bold text-white border-2 border-white bg-transparent rounded-sm hover:bg-white/15 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

function HeroVariantSplit() {
  return (
    <div className="relative w-full h-72 md:h-96 bg-[#0a0a0a] overflow-hidden rounded-sm flex">
      {/* Left: content */}
      <div className="relative z-10 flex flex-col justify-center px-8 w-full md:w-1/2">
        <span className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: ACCENTS[2] }}>
          Split Screen
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
          Divide the
          <br />
          <span style={{ color: ACCENTS[2] }}>Fold.</span>
        </h2>
        <p className="text-white/50 text-sm mb-6 max-w-xs">
          Content left, image right — editorial balance for modern landing pages.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-5 py-2.5 text-xs font-bold text-black rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
            style={{ backgroundColor: ACCENTS[2] }}
          >
            Get Started
          </button>
          <button
            type="button"
            className="px-5 py-2.5 text-xs font-bold text-white border border-white/30 bg-transparent rounded-sm hover:border-white hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            Learn More
          </button>
        </div>
      </div>
      {/* Right: image */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/hf_split/600/500"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #0a0a0a 0%, transparent 30%)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function HeroFullscreenShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeVariant, setActiveVariant] = useState<HeroVariant>("dark");
  const [activeBg, setActiveBg] = useState<BgTreatment>("solid");
  const [activeCtaVariant, setActiveCtaVariant] = useState<CtaVariant>("primary");
  const scrollY = useScrollY();
  const navScrolled = scrollY > 50;

  // Countdown: 30 days from a fixed future date for demo
  const targetDate = new Date("2026-04-01T00:00:00Z");
  const countdown = useCountdown(targetDate);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white">
      <style>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .bounce-arrow { animation: bounce-arrow 1.8s ease-in-out infinite; }

        @keyframes hf-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hf-marquee-track { animation: hf-marquee 30s linear infinite; }

        @keyframes hf-pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .pulse-ring { animation: hf-pulse-ring 2s ease-out infinite; }

        @keyframes hf-scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .scroll-line { animation: hf-scroll-line 2s ease-in-out infinite; }
      `}</style>

      {/* ─── 1. FIXED NAV — transparent → solid on scroll ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          backgroundColor: navScrolled ? "rgba(0,0,0,0.85)" : "transparent",
          backdropFilter: navScrolled ? "blur(16px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/styles/hero-fullscreen/showcase"
            className="text-white font-bold tracking-[0.2em] uppercase text-sm focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none rounded"
          >
            HERO<span style={{ color: ACCENTS[0] }}>.</span>FS
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {(["Variants", "Typography", "CTAs", "Backgrounds", "Rules"] as const).map((label) => (
              <span
                key={label}
                className="text-white/50 hover:text-white text-xs tracking-[0.15em] uppercase cursor-pointer transition-colors duration-200"
              >
                {label}
              </span>
            ))}
          </nav>

          <Link
            href="/styles"
            className="text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-sm border border-white/20 text-white/60 hover:text-white hover:border-white hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            All Styles
          </Link>
        </div>

        {/* Scroll progress bar */}
        {navScrolled && (
          <div className="absolute bottom-0 left-0 h-px bg-white/10 w-full">
            <div
              className="h-full transition-all duration-100"
              style={{
                width: `${Math.min(100, (scrollY / 3000) * 100)}%`,
                backgroundColor: ACCENTS[1],
              }}
            />
          </div>
        )}
      </header>

      {/* ─── MAIN HERO — full viewport ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/hf_main_hero/1920/1080"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{
              transform: heroRevealed ? "scale(1.03)" : "scale(1.14)",
              transition: "transform 2.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-3 mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            <span className="block w-10 h-px" style={{ backgroundColor: ACCENTS[1] }} />
            <span className="text-xs tracking-[0.35em] uppercase font-medium" style={{ color: ACCENTS[1] }}>
              Hero Fullscreen Showcase
            </span>
            <span className="block w-10 h-px" style={{ backgroundColor: ACCENTS[1] }} />
          </div>

          {/* Headline */}
          <h1 className="leading-none tracking-tight mb-8">
            <span
              className="block text-6xl md:text-8xl lg:text-9xl font-bold text-white"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              Command
            </span>
            <span
              className="block text-6xl md:text-8xl lg:text-9xl font-bold"
              style={{
                color: ACCENTS[0],
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.38s",
              }}
            >
              Every Viewport.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-xl md:text-2xl text-white/65 max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.52s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.52s",
            }}
          >
            Full-viewport sections that dominate the fold. Oversized typography, deep overlays, total attention capture.
          </p>

          {/* CTA cluster */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.66s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.66s",
            }}
          >
            <button
              type="button"
              className="px-10 py-4 font-bold text-base tracking-wide text-white rounded-sm shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
              style={{ backgroundColor: ACCENTS[0] }}
            >
              Get Started
            </button>
            <button
              type="button"
              className="px-10 py-4 font-bold text-base tracking-wide text-white rounded-sm border-2 border-white bg-transparent hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 0.9s ease 1.1s",
          }}
        >
          <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
          {/* Mouse icon */}
          <div className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5">
            <div className="w-px h-2 rounded-full bg-white/50 scroll-line" />
          </div>
        </div>
      </section>

      {/* ─── 2. HERO VARIANTS — tab switcher ─── */}
      <section className="min-h-screen flex flex-col justify-center py-24 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto w-full">
          <RevealBlock className="mb-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: ACCENTS[3] }}>
              Section 01
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-5">
              Hero Variants
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-lg leading-relaxed">
              Four distinct visual strategies. Each commands the viewport differently.
            </p>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.1} className="flex flex-wrap justify-center gap-2 mb-10">
            {HERO_VARIANTS.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => setActiveVariant(v.key)}
                className="px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-semibold rounded-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{
                  backgroundColor: activeVariant === v.key ? ACCENTS[3] : "transparent",
                  color: activeVariant === v.key ? "#fff" : "rgba(255,255,255,0.4)",
                  border: `1px solid ${activeVariant === v.key ? ACCENTS[3] : "rgba(255,255,255,0.12)"}`,
                }}
              >
                {v.label}
              </button>
            ))}
          </RevealBlock>

          {/* Description */}
          <RevealBlock delay={0.12} className="text-center mb-8">
            <p className="text-white/50 text-sm">
              {HERO_VARIANTS.find((v) => v.key === activeVariant)?.description}
            </p>
          </RevealBlock>

          {/* Variant preview */}
          <RevealBlock delay={0.15}>
            {activeVariant === "dark"     && <HeroVariantDark />}
            {activeVariant === "light"    && <HeroVariantLight />}
            {activeVariant === "gradient" && <HeroVariantGradient />}
            {activeVariant === "split"    && <HeroVariantSplit />}
          </RevealBlock>
        </div>
      </section>

      {/* ─── 3. TYPOGRAPHY HIERARCHY ─── */}
      <section className="min-h-screen flex flex-col justify-center py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto w-full">
          <RevealBlock className="mb-16">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: ACCENTS[0] }}>
              Section 02
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-5">
              Type Scale
            </h2>
            <p className="text-white/45 max-w-2xl text-lg leading-relaxed">
              Full-screen heroes live or die by their type hierarchy. Each tier has one job — do not mix them up.
            </p>
          </RevealBlock>

          <div className="space-y-2">
            {TYPE_SCALE.map((tier, i) => (
              <RevealBlock key={tier.label} delay={i * 0.07}>
                <div className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 border-b border-white/5 py-8 hover:-translate-y-1 hover:bg-white/[0.02] px-4 -mx-4 transition-all duration-300 ease-out">
                  <div className="md:w-48 shrink-0">
                    <p className="text-white/30 text-xs tracking-[0.2em] uppercase">{tier.label}</p>
                    <p className="text-white/20 text-[10px] mt-1 font-mono">{tier.usage}</p>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span
                      className={`${tier.size} font-bold text-white leading-none block group-hover:text-white/90 transition-colors duration-200`}
                      style={{ color: i === 0 ? ACCENTS[0] : undefined }}
                    >
                      {tier.sample}
                    </span>
                  </div>
                  <div className="md:w-32 shrink-0 flex items-center justify-end">
                    <span className="text-white/15 font-mono text-[10px] group-hover:text-white/30 transition-colors duration-200">
                      0{i + 1}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Combined headline demo */}
          <RevealBlock delay={0.5} className="mt-20 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-8">Complete hierarchy in action</p>
            <div
              className="relative rounded-sm overflow-hidden py-20 px-8"
              style={{ background: "linear-gradient(135deg, #0f0f1a, #0a0a0a)" }}
            >
              <span className="block text-xs tracking-[0.35em] uppercase mb-4" style={{ color: ACCENTS[1] }}>
                New Arrival
              </span>
              <h3 className="text-5xl md:text-8xl font-bold text-white leading-none mb-4">
                Impact.
              </h3>
              <p className="text-xl md:text-2xl text-white/60 mb-6 max-w-xl mx-auto leading-relaxed">
                Launch something extraordinary.
              </p>
              <p className="text-base text-white/40 max-w-lg mx-auto leading-relaxed mb-10">
                Full-viewport layouts create total visual immersion. Every pixel is intentional.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="px-8 py-3 font-bold text-sm text-white rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                  style={{ backgroundColor: ACCENTS[0] }}
                >
                  Get Started
                </button>
                <button
                  type="button"
                  className="px-8 py-3 font-bold text-sm text-white border border-white/30 bg-transparent rounded-sm hover:border-white hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                >
                  Learn More
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── 4. CTA BUTTON VARIANTS ─── */}
      <section
        className="min-h-screen flex flex-col justify-center py-24 px-6"
        style={{ background: "linear-gradient(160deg, #0f0f1a 0%, #0a0a0a 60%, #0a0a10 100%)" }}
      >
        <div className="max-w-5xl mx-auto w-full">
          <RevealBlock className="mb-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: ACCENTS[2] }}>
              Section 03
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-5">
              CTA Variants
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-lg leading-relaxed">
              Every button in a fullscreen hero must feel substantial. The gravity float and shadow burst are non-negotiable.
            </p>
          </RevealBlock>

          {/* Tab bar for CTA */}
          <RevealBlock delay={0.1} className="flex flex-wrap justify-center gap-2 mb-14">
            {CTA_VARIANTS.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => setActiveCtaVariant(v.key)}
                className="px-4 py-2 text-xs tracking-[0.15em] uppercase font-semibold rounded-sm transition-all duration-200 ease-out active:scale-[0.98] focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{
                  backgroundColor: activeCtaVariant === v.key ? ACCENTS[2] : "transparent",
                  color: activeCtaVariant === v.key ? "#000" : "rgba(255,255,255,0.35)",
                  border: `1px solid ${activeCtaVariant === v.key ? ACCENTS[2] : "rgba(255,255,255,0.10)"}`,
                }}
              >
                {v.label}
              </button>
            ))}
          </RevealBlock>

          {/* Preview area */}
          <RevealBlock delay={0.15}>
            <div
              className="rounded-sm border border-white/8 py-20 px-8 flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {activeCtaVariant === "primary" && (
                <button
                  type="button"
                  className="px-10 py-4 font-bold text-base tracking-wide text-white rounded-sm shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                  style={{ backgroundColor: ACCENTS[0] }}
                >
                  Get Started Free
                </button>
              )}
              {activeCtaVariant === "ghost" && (
                <button
                  type="button"
                  className="px-10 py-4 font-bold text-base tracking-wide text-white/60 rounded-sm bg-transparent hover:text-white hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                >
                  Ghost Button
                </button>
              )}
              {activeCtaVariant === "outline" && (
                <button
                  type="button"
                  className="px-10 py-4 font-bold text-base tracking-wide text-white rounded-sm border-2 border-white bg-transparent hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                >
                  Outline CTA
                </button>
              )}
              {activeCtaVariant === "icon" && (
                <button
                  type="button"
                  className="group px-10 py-4 font-bold text-base tracking-wide text-black rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none inline-flex items-center gap-3"
                  style={{ backgroundColor: ACCENTS[1] }}
                >
                  Explore Now
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="group-hover:scale-110 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              )}
              {activeCtaVariant === "pill" && (
                <button
                  type="button"
                  className="px-10 py-4 font-bold text-base tracking-wide text-white rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                  style={{ backgroundColor: ACCENTS[3] }}
                >
                  Pill Shape CTA
                </button>
              )}
              {activeCtaVariant === "large" && (
                <button
                  type="button"
                  className="px-16 py-6 font-bold text-xl tracking-widest text-white uppercase rounded-sm shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                  style={{ backgroundColor: ACCENTS[0] }}
                >
                  Launch Now
                </button>
              )}
            </div>
          </RevealBlock>

          {/* All variants grid */}
          <RevealBlock delay={0.2} className="mt-16">
            <p className="text-xs tracking-[0.3em] uppercase text-white/25 text-center mb-8">
              All variants side by side
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                className="px-8 py-3 font-bold text-sm text-white rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{ backgroundColor: ACCENTS[0] }}
              >
                Primary
              </button>
              <button
                type="button"
                className="px-8 py-3 font-bold text-sm text-white border-2 border-white rounded-sm bg-transparent hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
              >
                Outline
              </button>
              <button
                type="button"
                className="px-8 py-3 font-bold text-sm text-white/50 rounded-sm bg-transparent hover:text-white hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
              >
                Ghost
              </button>
              <button
                type="button"
                className="group px-8 py-3 font-bold text-sm text-black rounded-sm inline-flex items-center gap-2 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{ backgroundColor: ACCENTS[1] }}
              >
                With Icon
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                className="px-8 py-3 font-bold text-sm text-white rounded-full hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{ backgroundColor: ACCENTS[3] }}
              >
                Pill CTA
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── 5. BACKGROUND TREATMENTS ─── */}
      <section className="min-h-screen flex flex-col justify-center py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto w-full">
          <RevealBlock className="mb-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: ACCENTS[1] }}>
              Section 04
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-5">
              Background Treatments
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-lg leading-relaxed">
              Three foundational approaches to filling the viewport. Choose based on brand, content, and context.
            </p>
          </RevealBlock>

          {/* Treatment tabs */}
          <RevealBlock delay={0.1} className="flex justify-center gap-2 mb-10">
            {BG_TREATMENTS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveBg(t.key)}
                className="px-5 py-2 text-xs tracking-[0.18em] uppercase font-semibold rounded-sm transition-all duration-200 ease-out active:scale-[0.98] active:translate-y-0 focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{
                  backgroundColor: activeBg === t.key ? ACCENTS[1] : "transparent",
                  color: activeBg === t.key ? "#000" : "rgba(255,255,255,0.4)",
                  border: `1px solid ${activeBg === t.key ? ACCENTS[1] : "rgba(255,255,255,0.12)"}`,
                }}
              >
                {t.label}
              </button>
            ))}
          </RevealBlock>

          <RevealBlock delay={0.15}>
            {BG_TREATMENTS.filter((t) => t.key === activeBg).map((treatment) => (
              <div key={treatment.key}>
                <div
                  className="w-full h-64 md:h-80 rounded-sm mb-6 overflow-hidden relative flex items-center justify-center"
                  style={{ background: treatment.preview }}
                >
                  {treatment.key === "overlay" && (
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.3))" }}
                    />
                  )}
                  <div className="relative z-10 text-center px-6">
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-3">{treatment.label}</h3>
                    <p className="text-white/70 text-sm max-w-sm mx-auto">{treatment.description}</p>
                  </div>
                </div>
                <div className="bg-white/3 rounded-sm p-6 border border-white/8">
                  <p className="text-white/60 text-sm leading-relaxed">
                    <span className="text-white/90 font-semibold">When to use: </span>
                    {treatment.description}
                  </p>
                </div>
              </div>
            ))}
          </RevealBlock>

          {/* All three previews at once */}
          <RevealBlock delay={0.25} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {BG_TREATMENTS.map((t, i) => (
              <div key={t.key} className="group">
                <div
                  className="relative h-48 rounded-sm overflow-hidden mb-3 hover:-translate-y-2 transition-transform duration-300 ease-out cursor-pointer"
                  style={{ background: t.preview }}
                  onClick={() => setActiveBg(t.key)}
                >
                  {t.key === "overlay" && (
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.3))" }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-end p-4">
                    <div>
                      <p
                        className="text-xs tracking-[0.25em] uppercase font-semibold mb-1"
                        style={{ color: ACCENTS[i] }}
                      >
                        0{i + 1}
                      </p>
                      <h4 className="text-white font-bold text-lg leading-tight">{t.label}</h4>
                    </div>
                  </div>
                </div>
                <p className="text-white/35 text-xs leading-relaxed">{t.description}</p>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ─── EVENT HERO with Countdown Timer ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://picsum.photos/seed/hf_event/1920/1080"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <RevealBlock>
            <span className="text-xs tracking-[0.4em] uppercase font-semibold" style={{ color: ACCENTS[0] }}>
              Live Demo — Event Hero with Countdown
            </span>
          </RevealBlock>

          <RevealBlock delay={0.1} className="mt-6 mb-4">
            <h2 className="text-5xl md:text-8xl font-bold text-white leading-none">
              Launch Day.
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.2} className="mb-10">
            <p className="text-white/60 text-xl max-w-xl mx-auto">
              April 1, 2026 &mdash; The next chapter begins.
            </p>
          </RevealBlock>

          {/* Countdown */}
          <RevealBlock delay={0.3} className="mb-12">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {[
                { value: countdown.days,    label: "Days" },
                { value: countdown.hours,   label: "Hours" },
                { value: countdown.minutes, label: "Min" },
                { value: countdown.seconds, label: "Sec" },
              ].map(({ value, label }, i) => (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className="relative w-16 h-16 md:w-24 md:h-24 rounded-sm flex items-center justify-center mb-2"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    {/* Pulse ring on seconds */}
                    {label === "Sec" && (
                      <span
                        className="pulse-ring absolute inset-0 rounded-sm border"
                        style={{ borderColor: ACCENTS[i % 4] }}
                      />
                    )}
                    <span className="text-2xl md:text-4xl font-bold tabular-nums" style={{ color: ACCENTS[i % 4] }}>
                      {String(value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">{label}</span>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.4}>
            <button
              type="button"
              className="px-12 py-5 font-bold text-lg text-white rounded-sm shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
              style={{ backgroundColor: ACCENTS[0] }}
            >
              Register Now
            </button>
          </RevealBlock>

          {/* Speaker strip */}
          <RevealBlock delay={0.5} className="mt-16">
            <p className="text-white/25 text-xs tracking-[0.3em] uppercase mb-6">Speakers</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="group flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/40 group-hover:scale-110 transition-all duration-300 ease-out"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/speaker${n}/100/100`}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white/30 text-[9px] tracking-widest uppercase group-hover:text-white/60 transition-colors duration-200">
                    Speaker {n}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 bounce-arrow">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── ACCENT PALETTE ─── */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: ACCENTS[3] }}>
              Design System
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-5">
              Accent Palette
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-lg">
              Four bold accents built for contrast on dark surfaces.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="flex flex-col gap-px rounded-sm overflow-hidden">
              {ACCENTS.map((color, i) => (
                <div
                  key={color}
                  className="group flex items-center justify-between px-8 py-8 cursor-default hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out"
                  style={{ backgroundColor: color }}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xl md:text-2xl font-bold text-black/80">{ACCENT_NAMES[i]}</span>
                  </div>
                  <span className="font-mono text-xs text-black/50 uppercase tracking-widest">{color}</span>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACCENTS.map((color, i) => (
              <div key={color} className="group flex flex-col gap-3">
                <div
                  className="h-20 rounded-sm hover:-translate-y-2 transition-transform duration-300 ease-out"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-white font-semibold text-sm">{ACCENT_NAMES[i]}</p>
                  <p className="text-white/35 font-mono text-xs">{color}</p>
                </div>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div className="overflow-hidden py-5 border-y border-white/8 bg-[#0d0d0d]">
        <div className="flex hf-marquee-track w-[200%]">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex-1 flex items-center justify-around gap-10 px-10">
              {[
                "Full Viewport",
                "Scroll Snap",
                "Gravity Hover",
                "Overlay Depth",
                "Premium Motion",
                "Dark Canvas",
                "Active Press",
                "Group Hover",
                "Focus Ring",
              ].map((label) => (
                <span
                  key={`${idx}-${label}`}
                  className="text-[10px] tracking-[0.4em] uppercase text-white/20 whitespace-nowrap"
                >
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── 6. DESIGN RULES — Do / Don't ─── */}
      <section className="min-h-screen flex flex-col justify-center py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto w-full">
          <RevealBlock className="mb-16 text-center">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: ACCENTS[0] }}>
              Section 05
            </p>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-5">
              Design Rules
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-lg leading-relaxed">
              Fullscreen heroes demand discipline. These rules separate a commanding first impression from a broken one.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Do list */}
            <RevealBlock delay={0.1}>
              <div className="bg-white/[0.025] border border-white/8 rounded-sm p-8 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${ACCENTS[1]}20` }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENTS[1]} strokeWidth="2.5" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: ACCENTS[1] }}>
                    Do
                  </h3>
                </div>
                <div className="space-y-6">
                  {doList.map((item, i) => (
                    <div key={item.rule} className="group flex gap-4">
                      <span
                        className="text-[10px] tracking-widest font-mono mt-0.5 shrink-0"
                        style={{ color: ACCENTS[1], opacity: 0.5 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-white font-semibold text-sm mb-1 group-hover:text-white/90 transition-colors duration-200">
                          {item.rule}
                        </p>
                        <p className="text-white/35 text-xs leading-relaxed">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Don't list */}
            <RevealBlock delay={0.2}>
              <div className="bg-white/[0.025] border border-white/8 rounded-sm p-8 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${ACCENTS[0]}20` }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENTS[0]} strokeWidth="2.5" aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: ACCENTS[0] }}>
                    Don&apos;t
                  </h3>
                </div>
                <div className="space-y-6">
                  {dontList.map((item, i) => (
                    <div key={item.rule} className="group flex gap-4">
                      <span
                        className="text-[10px] tracking-widest font-mono mt-0.5 shrink-0"
                        style={{ color: ACCENTS[0], opacity: 0.5 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-white font-semibold text-sm mb-1 group-hover:text-white/90 transition-colors duration-200">
                          {item.rule}
                        </p>
                        <p className="text-white/35 text-xs leading-relaxed">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Interaction physics grid */}
          <RevealBlock delay={0.3} className="mt-16">
            <p className="text-xs tracking-[0.3em] uppercase text-white/25 text-center mb-10">
              Interaction physics — non-negotiable rules
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-sm overflow-hidden">
              {[
                {
                  rule: "Gravity Float",
                  code: "hover:-translate-y-1\nhover:shadow-[0_8px_28px_rgba(0,0,0,0.5)]\ntransition-all duration-200 ease-out",
                  note: "Primary CTA lifts upward with a shadow burst.",
                  accent: ACCENTS[0],
                },
                {
                  rule: "Card Float",
                  code: "hover:-translate-y-2\ntransition-transform duration-300 ease-out",
                  note: "Feature cards rise 8px — more dramatic than button float.",
                  accent: ACCENTS[1],
                },
                {
                  rule: "Icon Micro-Scale",
                  code: "group-hover:scale-110\ntransition-transform duration-200",
                  note: "Icon pulses when parent hovered — requires group on container.",
                  accent: ACCENTS[2],
                },
                {
                  rule: "Tactile Press",
                  code: "active:scale-[0.98]\nactive:translate-y-0\nactive:shadow-[0_2px_8px_...]",
                  note: "All buttons compress on click. Mandatory on dark overlays.",
                  accent: ACCENTS[3],
                },
                {
                  rule: "Focus Ring",
                  code: "focus:ring-2 focus:ring-white/80\nfocus:ring-offset-2\nfocus:ring-offset-black",
                  note: "White ring visible on all dark backgrounds — accessibility.",
                  accent: ACCENTS[0],
                },
                {
                  rule: "Scroll Snap",
                  code: "scroll-snap-type: y mandatory\nscroll-snap-align: start",
                  note: "Locks scroll to section boundaries for cinematic pacing.",
                  accent: ACCENTS[1],
                },
              ].map((item, i) => (
                <div
                  key={item.rule}
                  className="group bg-[#0a0a0a] p-7 hover:-translate-y-1 transition-transform duration-300 ease-out cursor-default"
                >
                  <div
                    className="text-xs tracking-[0.25em] uppercase font-bold mb-4"
                    style={{ color: item.accent }}
                  >
                    {item.rule}
                  </div>
                  <pre className="text-xs font-mono text-white/30 mb-4 whitespace-pre-wrap leading-relaxed">
                    {item.code}
                  </pre>
                  <p className="text-white/50 text-xs leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── SUBSCRIBE HERO ─── */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0f0f1a 0%, #0a0a0a 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #6c5ce7 0%, transparent 60%)" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <RevealBlock>
            <span className="text-xs tracking-[0.4em] uppercase font-semibold mb-4 block" style={{ color: ACCENTS[3] }}>
              Stay Ahead
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Get Early Access.
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
              Be the first to know when new styles drop. No spam — just signal.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <form
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-4 bg-white/8 border border-white/20 rounded-sm text-white placeholder:text-white/30 text-sm transition-colors duration-200 hover:border-white/35 focus:border-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black"
              />
              <button
                type="submit"
                className="px-7 py-4 font-bold text-sm text-white whitespace-nowrap rounded-sm hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-200 ease-out focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                style={{ backgroundColor: ACCENTS[3] }}
              >
                Subscribe
              </button>
            </form>
          </RevealBlock>
        </div>
      </section>

      {/* ─── 7. FOOTER ─── */}
      <footer className="bg-[#0a0a0a] border-t border-white/8 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12 pb-12 border-b border-white/8">
              {/* Brand */}
              <div>
                <p className="text-white font-bold tracking-[0.25em] uppercase text-lg mb-2">
                  HERO<span style={{ color: ACCENTS[0] }}>.</span>FS
                </p>
                <p className="text-white/25 text-xs tracking-widest">
                  StyleKit &mdash; Hero Fullscreen Layout Showcase
                </p>
              </div>

              {/* Accent dots */}
              <div className="flex items-center gap-3">
                {ACCENTS.map((color) => (
                  <div
                    key={color}
                    className="w-3 h-3 rounded-full hover:-translate-y-2 transition-transform duration-300 ease-out"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-6">
                <Link
                  href="/styles/hero-fullscreen"
                  className="text-white/35 hover:text-white text-xs tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none rounded"
                >
                  Docs
                </Link>
                <Link
                  href="/styles"
                  className="text-white/35 hover:text-white text-xs tracking-[0.2em] uppercase transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)] focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black focus:outline-none rounded"
                >
                  All Styles &rarr;
                </Link>
              </div>
            </div>

            {/* Sections index */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Nav Behavior",        note: "Transparent to solid on scroll, progress bar" },
                { label: "Hero Variants",        note: "Dark, Light, Gradient, Split — tab switcher" },
                { label: "Type Hierarchy",       note: "6 tiers from Display to Eyebrow" },
                { label: "CTA Variants",         note: "Primary, Outline, Ghost, Icon, Pill, Large" },
                { label: "BG Treatments",        note: "Solid, Gradient, Image Overlay" },
                { label: "Event Hero",           note: "Countdown timer + speaker strip" },
                { label: "Design Rules",         note: "Do / Don't + Interaction Physics" },
                { label: "Subscribe Hero",       note: "Inline email capture on dark canvas" },
              ].map((sec) => (
                <div key={sec.label} className="flex flex-col gap-1">
                  <p className="text-white/60 text-xs font-semibold tracking-wide">{sec.label}</p>
                  <p className="text-white/20 text-[10px] leading-relaxed">{sec.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/15 text-[10px] tracking-[0.25em] uppercase">
                StyleKit &copy; 2026 &mdash; Fullscreen Hero Layout
              </p>
              <div className="flex items-center gap-2">
                {ACCENTS.map((color, i) => (
                  <span
                    key={color}
                    className="text-[10px] font-mono tracking-widest"
                    style={{ color, opacity: 0.5 }}
                  >
                    {ACCENT_NAMES[i]}
                  </span>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
