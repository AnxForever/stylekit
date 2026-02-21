"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
/* ------------------------------------------------------------------ */

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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function ArrowDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function ZapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ACCENT_COLORS = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#6c5ce7"] as const;

const overlayVariants = [
  {
    name: "Dark Solid",
    tailwind: "bg-black/50",
    style: { background: "rgba(0,0,0,0.5)" } as React.CSSProperties,
    desc: "50% black. Safe default for any image complexity.",
  },
  {
    name: "Gradient Vignette",
    tailwind: "bg-gradient-to-t from-black/80 via-transparent to-black/30",
    style: {
      background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
    } as React.CSSProperties,
    desc: "Darkens edges, keeps mid-frame bright. Great for nature imagery.",
  },
  {
    name: "Color Tint",
    tailwind: "bg-[#6c5ce7]/70 mix-blend-multiply",
    style: { background: "rgba(108,92,231,0.7)" } as React.CSSProperties,
    desc: "Brand color multiply overlay. Bold and memorable.",
  },
  {
    name: "Radial Center",
    tailwind: "bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]",
    style: {
      background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
    } as React.CSSProperties,
    desc: "Spotlight focus on center content. Cinematic feel.",
  },
];

const layerStack = [
  { z: 1, name: "Background image / video", code: "absolute inset-0 object-cover", color: "#ff6b6b" },
  { z: 2, name: "Overlay layer", code: "absolute inset-0 gradient or solid", color: "#4ecdc4" },
  { z: 3, name: "Content (z-10)", code: "relative z-10 flex items-center justify-center", color: "#ffe66d" },
  { z: 4, name: "Navigation (z-50)", code: "absolute top-0 left-0 right-0 z-50", color: "#6c5ce7" },
  { z: 5, name: "Scroll indicator", code: "absolute bottom-8 left-1/2 -translate-x-1/2", color: "#ff6b6b" },
];

const backgroundOptions = [
  {
    name: "Static Image",
    icon: <GlobeIcon className="w-5 h-5" />,
    pros: ["Universal browser support", "Fast initial load", "Easy to optimize with next/image"],
    cons: ["No motion or depth", "Feels static for high-energy brands"],
    snippet: `<img src="/hero.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />`,
    color: "#4ecdc4",
  },
  {
    name: "Video Background",
    icon: <PlayIcon className="w-5 h-5" />,
    pros: ["Maximum visual impact", "Conveys brand personality", "Creates immersion"],
    cons: ["autoPlay + sound is absolutely banned", "Performance hit on mobile", "Needs fallback image"],
    snippet: `<video autoPlay muted loop playsInline poster="/fallback.jpg"\n  className="absolute inset-0 w-full h-full object-cover" />`,
    color: "#ff6b6b",
  },
  {
    name: "CSS Gradient",
    icon: <LayersIcon className="w-5 h-5" />,
    pros: ["Zero network overhead", "Perfectly crisp at all DPIs", "Fully animatable"],
    cons: ["No photographic depth", "Can feel abstract without strong copy"],
    snippet: `<div className="absolute inset-0 bg-gradient-to-br\n  from-slate-900 via-purple-900 to-slate-900" />`,
    color: "#6c5ce7",
  },
];

type ComponentKey = "hero" | "nav" | "button" | "card" | "email";

const componentSnippets: Record<ComponentKey, { label: string; code: string }> = {
  hero: {
    label: "Full Hero Section",
    code: `<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0">
    <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/50" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
  </div>

  {/* Navigation */}
  <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between">
    <a href="/" className="text-white text-2xl font-bold">Logo</a>
    <div className="hidden md:flex items-center gap-8">
      <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
      <button className="px-6 py-2 bg-white text-black rounded-full font-medium
        hover:bg-white/90 hover:-translate-y-0.5
        active:scale-[0.98] transition-all duration-200 ease-out">
        Sign Up
      </button>
    </div>
  </nav>

  {/* Content */}
  <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm
      rounded-full text-white/90 text-sm font-medium mb-6">
      Announcing our product
    </span>
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
      Build Something Amazing
    </h1>
    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
      The platform that creates incredible experiences users will love.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="
        px-8 py-4 bg-white text-black font-semibold text-lg rounded-full
        shadow-[0_4px_14px_rgba(0,0,0,0.3)]
        hover:bg-white/95 hover:-translate-y-1
        hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)]
        focus:outline-none focus:ring-2 focus:ring-white/80
        focus:ring-offset-2 focus:ring-offset-black/50
        active:scale-[0.98] active:translate-y-0
        active:shadow-[0_2px_8px_rgba(0,0,0,0.3)]
        transition-all duration-200 ease-out
      ">Get Started Free</button>
      <button className="
        px-8 py-4 bg-transparent text-white font-semibold text-lg
        rounded-full border-2 border-white
        hover:bg-white/15 hover:-translate-y-1
        hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]
        focus:outline-none focus:ring-2 focus:ring-white/60
        focus:ring-offset-2 focus:ring-offset-black/50
        active:scale-[0.98] active:translate-y-0
        transition-all duration-200 ease-out
      ">Watch Demo</button>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2
    flex flex-col items-center gap-2 text-white/70 animate-bounce">
    <span className="text-sm">Scroll to explore</span>
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>`,
  },
  nav: {
    label: "Transparent Navigation",
    code: `<nav className="
  absolute top-0 left-0 right-0 z-50
  px-6 py-4
  flex items-center justify-between
">
  <a href="/" className="text-white text-2xl font-bold">Logo</a>
  <div className="hidden md:flex items-center gap-8">
    <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
    <a href="#" className="text-white/80 hover:text-white transition-colors">Pricing</a>
    <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
    <button className="px-6 py-2 bg-white text-black rounded-full font-medium
      hover:bg-white/90 hover:-translate-y-0.5
      active:scale-[0.98] active:translate-y-0
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-white/80">
      Sign Up
    </button>
  </div>
  <button className="md:hidden text-white">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</nav>`,
  },
  button: {
    label: "Hero CTA Buttons",
    code: `{/* Primary CTA — Gravity Float + Shadow Burst */}
<button className="
  px-8 py-4
  bg-white text-black
  font-semibold text-lg
  rounded-full
  shadow-[0_4px_14px_rgba(0,0,0,0.3)]
  hover:bg-white/95 hover:-translate-y-1
  hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)]
  focus:outline-none focus:ring-2 focus:ring-white/80
  focus:ring-offset-2 focus:ring-offset-black/50
  active:scale-[0.98] active:translate-y-0
  active:shadow-[0_2px_8px_rgba(0,0,0,0.3)]
  transition-all duration-200 ease-out
">
  Get Started
</button>

{/* Ghost CTA */}
<button className="
  px-8 py-4
  bg-transparent text-white
  font-semibold text-lg
  rounded-full
  border-2 border-white
  hover:bg-white/15 hover:-translate-y-1
  hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]
  focus:outline-none focus:ring-2 focus:ring-white/60
  focus:ring-offset-2 focus:ring-offset-black/50
  active:scale-[0.98] active:translate-y-0
  transition-all duration-200 ease-out
">
  Learn More
</button>`,
  },
  card: {
    label: "Glassmorphism Feature Card",
    code: `<div className="
  group
  p-8
  bg-white/10 backdrop-blur-sm
  rounded-2xl
  border border-white/20
  hover:bg-white/15 hover:border-white/30
  hover:-translate-y-2
  hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]
  transition-all duration-300 ease-out
  cursor-pointer
">
  <div className="
    w-12 h-12 bg-white/20 rounded-xl
    flex items-center justify-center mb-4
    group-hover:scale-110
    transition-transform duration-300 ease-out
  ">
    <svg className="w-6 h-6 text-white" fill="none"
      stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>
  <h3 className="text-xl font-semibold text-white mb-2
    group-hover:text-white/95 transition-colors duration-200">
    Feature Title
  </h3>
  <p className="text-white/70
    group-hover:text-white/85 transition-colors duration-200">
    Brief description of this feature.
  </p>
</div>`,
  },
  email: {
    label: "Email Subscribe Form",
    code: `<form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
  <input
    type="email"
    placeholder="Enter your email"
    className="
      flex-1 px-6 py-4
      bg-white/10 backdrop-blur-sm
      border border-white/30
      rounded-full
      text-white placeholder-white/60
      focus:outline-none focus:ring-2 focus:ring-white/50
      transition-colors duration-200
    "
  />
  <button className="
    px-8 py-4
    bg-white text-black
    font-semibold
    rounded-full
    hover:bg-white/90 hover:-translate-y-0.5
    hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)]
    active:scale-[0.98] active:translate-y-0
    transition-all duration-200 ease-out
    whitespace-nowrap
  ">
    Subscribe
  </button>
</form>`,
  },
};

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(0);
  const [activeBgOption, setActiveBgOption] = useState(0);
  const [activeComponentTab, setActiveComponentTab] = useState<ComponentKey>("hero");
  const [copiedKey, setCopiedKey] = useState<ComponentKey | null>(null);

  // Animation & Interaction Rules demo states
  const [gravityHovered, setGravityHovered] = useState(false);
  const [floatingCardHovered, setFloatingCardHovered] = useState(false);
  const [textRevealHovered, setTextRevealHovered] = useState(false);
  const [tactilePressed, setTactilePressed] = useState(false);
  const [ghostTactilePressed, setGhostTactilePressed] = useState(false);

  // Feature cards hover state (for floating glass demo)
  const [hoveredFeatureCard, setHoveredFeatureCard] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function handleCopy(key: ComponentKey) {
    navigator.clipboard.writeText(componentSnippets[key].code).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      <style>{`
        @keyframes hf-kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.07); }
        }
        @keyframes hf-scroll-bounce {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(8px) translateX(-50%); }
        }
        @keyframes hf-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes hf-pulse-dot {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        .hf-kenburns { animation: hf-kenburns 20s ease-out forwards; }
        .hf-scroll-bounce { animation: hf-scroll-bounce 2s ease-in-out infinite; }
        .hf-marquee-track { animation: hf-marquee 28s linear infinite; }
        .hf-pulse-dot { animation: hf-pulse-dot 1.6s ease-in-out infinite; }
      `}</style>

      {/* ================================================================ */}
      {/* SECTION 1 — FIXED NAVIGATION                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
              <LayersIcon className="w-3.5 h-3.5 text-white/80" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              Fullscreen<span className="text-white/30">Hero</span>
            </span>
          </div>

          {/* Center navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {["Hero", "Overlays", "Layers", "Backgrounds", "Animations", "Components", "Philosophy"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full text-xs text-white/40 hover:text-white hover:bg-white/8 cursor-pointer transition-all duration-200"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* StyleKit back link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm font-medium
              hover:bg-white/10 hover:text-white hover:-translate-y-0.5
              hover:shadow-[0_4px_12px_rgba(255,255,255,0.08)]
              active:scale-[0.97] active:translate-y-0
              transition-all duration-200 ease-out"
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* SECTION 2 — FULL VIEWPORT HERO DEMO                             */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Simulated immersive background — layered gradients mimicking photo */}
        <div className="absolute inset-0 hf-kenburns">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-zinc-900 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_20%,rgba(108,92,231,0.28),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_85%_65%,rgba(78,205,196,0.18),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_55%_85%,rgba(255,107,107,0.12),transparent)]" />
        </div>
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px",
          }}
        />
        {/* Gradient overlay — bottom + top darkening */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />

        {/* Transparent navigation inside hero */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 pt-20 pb-4 flex items-center justify-between">
          <span className="text-white text-lg font-bold tracking-tight">Horizon</span>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "About"].map((item) => (
              <a key={item} href="#" className="text-white/65 hover:text-white transition-colors duration-200 text-sm">
                {item}
              </a>
            ))}
            <button
              className="px-5 py-2 bg-white text-black rounded-full text-sm font-semibold
                shadow-[0_4px_14px_rgba(0,0,0,0.3)]
                hover:bg-white/95 hover:-translate-y-1
                hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)]
                focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black/50
                active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                transition-all duration-200 ease-out"
            >
              Sign Up
            </button>
          </div>
          <button className="md:hidden text-white/70">
            <MenuIcon className="w-5 h-5" />
          </button>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/75 text-xs font-medium tracking-[0.1em] uppercase border border-white/15 mb-8">
              <span
                className="w-1.5 h-1.5 rounded-full hf-pulse-dot"
                style={{ backgroundColor: "#4ecdc4", boxShadow: "0 0 6px rgba(78,205,196,0.8)" }}
              />
              Fullscreen Hero Layout — StyleKit
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-[84px] font-bold text-white leading-[1.0] tracking-tight mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Capture Every
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #a8edea 45%, #6c5ce7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              First Second.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-10"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            The fullscreen hero layout creates an immersive first impression with full-viewport
            imagery, precise overlay control, and cinematic visual hierarchy.
          </p>

          {/* CTA buttons — Gravity Focus pattern (aiRule 1) */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            {/* Primary CTA — Gravity Focus */}
            <button
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-base
                shadow-[0_4px_14px_rgba(0,0,0,0.3)]
                hover:bg-white/95 hover:-translate-y-1
                hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)]
                focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black/50
                active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                transition-all duration-200 ease-out"
            >
              Get Started Free
            </button>
            {/* Ghost CTA */}
            <button
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent text-white font-semibold text-base
                border-2 border-white/70
                hover:bg-white/15 hover:-translate-y-1
                hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]
                focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black/50
                active:scale-[0.98] active:translate-y-0
                transition-all duration-200 ease-out"
            >
              <PlayIcon className="w-4 h-4" />
              Watch Demo
            </button>
          </div>

          {/* Social proof row */}
          <div
            className="flex items-center justify-center gap-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.42s",
            }}
          >
            <div className="flex -space-x-2.5">
              {ACCENT_COLORS.map((c) => (
                <div key={c} className="w-8 h-8 rounded-full border-2 border-black/80" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-sm">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-3 h-3 text-[#ffe66d]" />
                ))}
              </div>
              <span>4.9 — 12,000+ teams</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hf-scroll-bounce absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-white/40" aria-hidden="true">
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ArrowDownIcon className="w-5 h-5" />
        </div>
      </section>

      {/* ================================================================ */}
      {/* MARQUEE STRIP                                                    */}
      {/* ================================================================ */}
      <div className="overflow-hidden py-4 border-y border-white/8 bg-white/[0.02]">
        <div className="flex hf-marquee-track w-[200%]">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex-1 flex items-center gap-10 px-10">
              {[
                "Full Viewport", "Gravity Float", "Overlay Depth", "Tactile Press",
                "Group Hover", "Focus Ring", "Scroll Indicator", "Ken Burns",
                "Dark Canvas", "Text Readability", "Mobile First", "Shadow Burst",
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

      {/* ================================================================ */}
      {/* SECTION 3 — OVERLAY VARIANTS                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: "#4ecdc4" }}>
              Overlays
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Overlay <span className="text-white/30">variants</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              Every fullscreen hero image needs an overlay to guarantee text readability. Choose based
              on image complexity and brand tone.
            </p>
          </RevealBlock>

          {/* Switcher */}
          <RevealBlock delay={0.1} className="mb-7">
            <div className="flex flex-wrap gap-2">
              {overlayVariants.map((v, i) => (
                <button
                  key={v.name}
                  onClick={() => setActiveOverlay(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeOverlay === i
                      ? "bg-white text-black border-white"
                      : "bg-white/5 border-white/15 text-white/55 hover:border-white/30 hover:text-white/80"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              {/* Live preview */}
              <div className="relative h-52 md:h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-zinc-800 to-slate-900" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_30%_40%,rgba(108,92,231,0.5),transparent)]" />
                <div className="absolute inset-0 transition-all duration-500" style={overlayVariants[activeOverlay].style} />
                <div className="absolute inset-0 flex items-center justify-center text-center px-8">
                  <div>
                    <p className="text-xs text-white/50 mb-2 tracking-widest uppercase">Active overlay</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Hero Headline Text</h3>
                    <p className="text-white/65 text-sm max-w-sm">Body text remains readable against any overlay variant.</p>
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="bg-white/[0.04] border-t border-white/10 p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-1">
                    <p className="text-xs text-white/35 uppercase tracking-[0.15em] mb-1.5">Tailwind class</p>
                    <code className="text-sm font-mono" style={{ color: "#4ecdc4" }}>
                      {overlayVariants[activeOverlay].tailwind}
                    </code>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-white/35 uppercase tracking-[0.15em] mb-1.5">Best for</p>
                    <p className="text-sm text-white/55">{overlayVariants[activeOverlay].desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 4 — LAYER STACK                                         */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: "#ffe66d" }}>
              Structure
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Layer <span className="text-white/30">stack</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              A fullscreen hero is built from five z-indexed layers. Getting this order wrong is the
              most common mistake — nav disappears or overlay covers content.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="space-y-3 max-w-2xl">
              {[...layerStack].reverse().map((layer, i) => (
                <div
                  key={layer.z}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200 cursor-default"
                  style={{ marginLeft: `${(layerStack.length - 1 - i) * 14}px` }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-black shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: layer.color }}
                  >
                    z{layer.z}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/85">{layer.name}</p>
                    <code className="text-xs font-mono text-white/30">{layer.code}</code>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Critical rule callout */}
          <RevealBlock delay={0.28} className="mt-10 max-w-2xl">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-[#ffe66d]/10 border border-[#ffe66d]/25">
              <ShieldIcon className="w-5 h-5 text-[#ffe66d] shrink-0 mt-0.5" />
              <p className="text-sm text-white/65 leading-relaxed">
                <span className="font-semibold text-[#ffe66d]">Critical:</span> Content must use{" "}
                <code className="mx-1 px-1.5 py-0.5 rounded bg-white/10 text-white/75 text-xs">relative z-10</code>
                not{" "}
                <code className="mx-1 px-1.5 py-0.5 rounded bg-white/10 text-white/75 text-xs">absolute</code>
                — so it participates in normal flow and stacks correctly above the overlay. Navigation uses
                <code className="mx-1 px-1.5 py-0.5 rounded bg-white/10 text-white/75 text-xs">z-50</code>
                to stay on top of everything.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 5 — BACKGROUND OPTIONS                                  */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: "#ff6b6b" }}>
              Background
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Background <span className="text-white/30">options</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              Three valid approaches — each with real-world trade-offs. Pick based on brand,
              bandwidth, and device targets.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-6">
            <div className="flex gap-2 flex-wrap">
              {backgroundOptions.map((bg, i) => (
                <button
                  key={bg.name}
                  onClick={() => setActiveBgOption(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    activeBgOption === i
                      ? "text-black border-transparent"
                      : "bg-white/[0.04] border-white/12 text-white/55 hover:border-white/25 hover:text-white/75"
                  }`}
                  style={activeBgOption === i ? { backgroundColor: bg.color, borderColor: bg.color } : {}}
                >
                  <span className="w-4 h-4 shrink-0">{bg.icon}</span>
                  {bg.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                <p className="text-xs text-white/35 uppercase tracking-[0.15em] mb-4">Advantages</p>
                <ul className="space-y-2.5">
                  {backgroundOptions[activeBgOption].pros.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-white/65">
                      <CheckIcon className="w-4 h-4 text-[#4ecdc4] shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                <p className="text-xs text-white/35 uppercase tracking-[0.15em] mb-4">Trade-offs</p>
                <ul className="space-y-2.5">
                  {backgroundOptions[activeBgOption].cons.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-white/65">
                      <XIcon className="w-4 h-4 text-[#ff6b6b] shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
                <p className="text-xs text-white/35 uppercase tracking-[0.15em] mb-4">Code snippet</p>
                <code
                  className="text-xs font-mono leading-relaxed whitespace-pre-wrap break-all"
                  style={{ color: backgroundOptions[activeBgOption].color }}
                >
                  {backgroundOptions[activeBgOption].snippet}
                </code>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 6 — ANIMATION & INTERACTION RULES (aiRules demos)       */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: "#6c5ce7" }}>
              Interactions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Animation &amp; Interaction <span className="text-white/30">Rules</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              Four named aiRules from the style definition. Every demo below is interactive —
              hover or press to feel the exact behavior on a dark overlay surface.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* ── Rule 1: Gravity Focus (CTA Button) ── */}
            <RevealBlock delay={0.08}>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold text-black"
                    style={{ backgroundColor: "#4ecdc4" }}
                  >
                    Gravity Focus
                  </span>
                  <span className="text-xs text-white/30">CTA Button — aiRule 1</span>
                </div>

                <div className="mt-3 mb-6 font-mono text-xs text-white/30 space-y-0.5 leading-relaxed">
                  <p>Resting: shadow-[0_4px_14px_rgba(0,0,0,0.3)]</p>
                  <p>Hover: hover:-translate-y-1</p>
                  <p>Hover: hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)]</p>
                  <p>Active: active:scale-[0.98] active:translate-y-0</p>
                  <p>Active: active:shadow-[0_2px_8px_rgba(0,0,0,0.3)]</p>
                  <p>Focus: focus:ring-2 focus:ring-white/80</p>
                  <p>Focus: focus:ring-offset-2 focus:ring-offset-black/50</p>
                </div>

                <div className="flex-1 flex items-center justify-center py-6 bg-gradient-to-br from-slate-800 to-zinc-900 rounded-xl border border-white/8">
                  <button
                    className="px-8 py-4 bg-white text-black font-semibold rounded-full
                      shadow-[0_4px_14px_rgba(0,0,0,0.3)]
                      hover:bg-white/95 hover:-translate-y-1
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)]
                      focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black/50
                      active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                      transition-all duration-200 ease-out"
                    onMouseEnter={() => setGravityHovered(true)}
                    onMouseLeave={() => setGravityHovered(false)}
                  >
                    Get Started
                  </button>
                </div>

                <p className="text-xs text-white/30 text-center mt-3 leading-relaxed">
                  {gravityHovered
                    ? "Shadow explodes outward — button lifted off surface. Gravity float confirmed."
                    : "Hover the button to see gravity float + shadow burst."}
                </p>
              </div>
            </RevealBlock>

            {/* ── Rule 2: Floating Glass (Feature Cards) ── */}
            <RevealBlock delay={0.12}>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: "#6c5ce7" }}
                  >
                    Floating Glass
                  </span>
                  <span className="text-xs text-white/30">Feature Cards — aiRule 2</span>
                </div>

                <div className="mt-3 mb-6 font-mono text-xs text-white/30 space-y-0.5 leading-relaxed">
                  <p>Required: group class on card container</p>
                  <p>Hover: hover:-translate-y-2</p>
                  <p>Hover: hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]</p>
                  <p>Icon: group-hover:scale-110</p>
                  <p>Icon: transition-transform duration-300 ease-out</p>
                </div>

                <div
                  className="flex-1 flex items-center justify-center py-6 bg-gradient-to-br from-slate-800 to-zinc-900 rounded-xl border border-white/8"
                  onMouseEnter={() => setFloatingCardHovered(true)}
                  onMouseLeave={() => setFloatingCardHovered(false)}
                >
                  {/* Live glassmorphism card */}
                  <div
                    className="group p-6 backdrop-blur-sm rounded-2xl border w-48 cursor-pointer transition-all duration-300 ease-out"
                    style={{
                      background: floatingCardHovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.10)",
                      borderColor: floatingCardHovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)",
                      transform: floatingCardHovered ? "translateY(-8px)" : "translateY(0)",
                      boxShadow: floatingCardHovered
                        ? "0 16px 40px rgba(0,0,0,0.5)"
                        : "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div
                      className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 ease-out"
                      style={{ transform: floatingCardHovered ? "scale(1.1)" : "scale(1)" }}
                    >
                      <ZapIcon className="w-5 h-5 text-white" />
                    </div>
                    <h4
                      className="text-sm font-semibold mb-1 transition-colors duration-200"
                      style={{ color: floatingCardHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.90)" }}
                    >
                      Feature Title
                    </h4>
                    <p
                      className="text-xs transition-colors duration-200"
                      style={{ color: floatingCardHovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.70)" }}
                    >
                      Brief feature description text.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-white/30 text-center mt-3 leading-relaxed">
                  {floatingCardHovered
                    ? "Card floated 8px up. Icon scaled 110%. Text revealed to 95%/85%. group class drives all."
                    : "Hover the card — group class triggers icon scale + text reveal simultaneously."}
                </p>
              </div>
            </RevealBlock>

            {/* ── Rule 3: Text Reveal on Hover ── */}
            <RevealBlock delay={0.16}>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold text-black"
                    style={{ backgroundColor: "#ffe66d" }}
                  >
                    Text Reveal
                  </span>
                  <span className="text-xs text-white/30">Card Typography — aiRule 3</span>
                </div>

                <div className="mt-3 mb-6 font-mono text-xs text-white/30 space-y-0.5 leading-relaxed">
                  <p>h3 resting: text-white/90</p>
                  <p>h3 hover:  group-hover:text-white/95</p>
                  <p>p resting: text-white/70</p>
                  <p>p hover:   group-hover:text-white/85</p>
                  <p>Both: transition-colors duration-200</p>
                </div>

                <div
                  className="flex-1 flex items-center justify-center py-6 bg-gradient-to-br from-slate-800 to-zinc-900 rounded-xl border border-white/8 cursor-pointer"
                  onMouseEnter={() => setTextRevealHovered(true)}
                  onMouseLeave={() => setTextRevealHovered(false)}
                >
                  <div
                    className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 w-48 transition-all duration-300 ease-out"
                    style={{
                      background: textRevealHovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.10)",
                      transform: textRevealHovered ? "translateY(-8px)" : "translateY(0)",
                      boxShadow: textRevealHovered ? "0 16px_40px rgba(0,0,0,0.5)" : "none",
                    }}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                      <ShieldIcon className="w-5 h-5 text-white" />
                    </div>
                    <h4
                      className="text-sm font-semibold mb-1 transition-colors duration-200"
                      style={{ color: textRevealHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.90)" }}
                    >
                      Secure by Default
                    </h4>
                    <p
                      className="text-xs leading-relaxed transition-colors duration-200"
                      style={{ color: textRevealHovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.70)" }}
                    >
                      End-to-end encryption on every request.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-white/30 text-center mt-3 leading-relaxed">
                  {textRevealHovered
                    ? "h3 is now at 95% opacity. p is at 85%. Subtle but perceptible on dark glass."
                    : "Hover to see h3 + p brighten from 90%/70% to 95%/85%."}
                </p>
              </div>
            </RevealBlock>

            {/* ── Rule 4: Tactile Confirmation ── */}
            <RevealBlock delay={0.2}>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: "#ff6b6b" }}
                  >
                    Tactile Confirmation
                  </span>
                  <span className="text-xs text-white/30">All Buttons — aiRule 4</span>
                </div>

                <div className="mt-3 mb-6 font-mono text-xs text-white/30 space-y-0.5 leading-relaxed">
                  <p>All buttons: active:scale-[0.98]</p>
                  <p>Primary CTA: active:translate-y-0</p>
                  <p>Primary CTA: active:shadow-[0_2px_8px_rgba(0,0,0,0.3)]</p>
                  <p>Ghost CTA: active:translate-y-0</p>
                  <p>Duration: 200ms ease-out everywhere</p>
                  <p>Reason: dark overlay kills haptic cues</p>
                </div>

                <div className="flex-1 flex items-center justify-center py-6 bg-gradient-to-br from-slate-800 to-zinc-900 rounded-xl border border-white/8">
                  <div className="flex flex-col items-center gap-4">
                    <button
                      className="px-7 py-3.5 bg-white text-black font-semibold rounded-full
                        shadow-[0_4px_14px_rgba(0,0,0,0.3)]
                        hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.5)]
                        active:scale-[0.98] active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                        focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black/50
                        transition-all duration-200 ease-out"
                      onMouseDown={() => setTactilePressed(true)}
                      onMouseUp={() => setTactilePressed(false)}
                      onMouseLeave={() => setTactilePressed(false)}
                    >
                      Primary — Press &amp; Hold
                    </button>
                    <button
                      className="px-7 py-3.5 bg-transparent text-white font-semibold rounded-full border-2 border-white/60
                        hover:bg-white/15 hover:-translate-y-1
                        hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]
                        active:scale-[0.98] active:translate-y-0
                        focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-black/50
                        transition-all duration-200 ease-out"
                      onMouseDown={() => setGhostTactilePressed(true)}
                      onMouseUp={() => setGhostTactilePressed(false)}
                      onMouseLeave={() => setGhostTactilePressed(false)}
                    >
                      Ghost — Press &amp; Hold
                    </button>
                  </div>
                </div>

                <p className="text-xs text-white/30 text-center mt-3 leading-relaxed">
                  {(tactilePressed || ghostTactilePressed)
                    ? "Compressed 2% + shadow collapsed. Physical press confirmed. Release to restore."
                    : "Hold either button — active:scale-[0.98] simulates physical depression on dark overlay."}
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 7 — FEATURE CARDS (Floating Glass live demo)            */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: "#4ecdc4" }}>
              Feature Cards
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Glassmorphism <span className="text-white/30">feature grid</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              Feature cards in a fullscreen hero use the Floating Glass pattern — glass surface,
              dramatic lift, icon micro-scale all driven by the parent{" "}
              <code className="px-1 py-0.5 rounded bg-white/10 text-white/70 text-sm">group</code> class.
            </p>
          </RevealBlock>

          {/* Simulated hero backdrop */}
          <RevealBlock delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-zinc-900 to-black" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_20%_30%,rgba(108,92,231,0.3),transparent)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="relative z-10 p-8 md:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: <ZapIcon className="w-6 h-6 text-white" />, title: "Blazing Fast", desc: "Sub-100ms response times globally.", color: "#ff6b6b" },
                    { icon: <ShieldIcon className="w-6 h-6 text-white" />, title: "Secure by Default", desc: "E2E encryption on every request.", color: "#4ecdc4" },
                    { icon: <GlobeIcon className="w-6 h-6 text-white" />, title: "Global CDN", desc: "200+ edge nodes worldwide.", color: "#ffe66d" },
                    { icon: <LayersIcon className="w-6 h-6 text-white" />, title: "Auto-Scaling", desc: "Handles any traffic spike instantly.", color: "#6c5ce7" },
                  ].map((card, i) => (
                    <div
                      key={card.title}
                      className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 cursor-pointer transition-all duration-300 ease-out"
                      style={{
                        transform: hoveredFeatureCard === i ? "translateY(-8px)" : "translateY(0)",
                        boxShadow: hoveredFeatureCard === i ? "0 16px 40px rgba(0,0,0,0.5)" : "none",
                        background: hoveredFeatureCard === i ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.10)",
                        borderColor: hoveredFeatureCard === i ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)",
                      }}
                      onMouseEnter={() => setHoveredFeatureCard(i)}
                      onMouseLeave={() => setHoveredFeatureCard(null)}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 ease-out"
                        style={{
                          backgroundColor: `${card.color}30`,
                          transform: hoveredFeatureCard === i ? "scale(1.1)" : "scale(1)",
                        }}
                      >
                        {card.icon}
                      </div>
                      <h3
                        className="text-base font-semibold mb-1.5 transition-colors duration-200"
                        style={{ color: hoveredFeatureCard === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.90)" }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed transition-colors duration-200"
                        style={{ color: hoveredFeatureCard === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.70)" }}
                      >
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 8 — COMPONENT CODE GALLERY                             */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: "#ff6b6b" }}>
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready-to-use <span className="text-white/30">snippets</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              All five official components from the style definition. Copy the code and
              drop it directly into your hero section.
            </p>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.1} className="mb-6">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(componentSnippets) as ComponentKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveComponentTab(key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 border ${
                    activeComponentTab === key
                      ? "bg-white/15 border-white/30 text-white"
                      : "bg-white/[0.04] border-white/10 text-white/45 hover:border-white/20 hover:text-white/65"
                  }`}
                >
                  {componentSnippets[key].label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Code block */}
          <RevealBlock delay={0.15}>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 bg-white/[0.04] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff6b6b]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#ffe66d]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#4ecdc4]/60" />
                </div>
                <span className="text-xs text-white/25 font-mono">{activeComponentTab}.tsx</span>
                <button
                  onClick={() => handleCopy(activeComponentTab)}
                  className="text-xs text-white/35 hover:text-white/70 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/8"
                >
                  {copiedKey === activeComponentTab ? "Copied!" : "Copy code"}
                </button>
              </div>
              {/* Code */}
              <div className="overflow-auto max-h-96 bg-[#0d0d0d]">
                <pre className="p-6 text-xs font-mono leading-relaxed text-white/55 whitespace-pre-wrap">
                  <code>{componentSnippets[activeComponentTab].code}</code>
                </pre>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 9 — DESIGN PHILOSOPHY (Do / Don't)                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: "#ffe66d" }}>
              Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Do <span className="text-white/30">&amp; Don&apos;t</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              Fullscreen Hero is a high-impact pattern — misuse destroys credibility instantly.
              These rules are drawn directly from the style definition.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Do */}
            <RevealBlock delay={0.1}>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-9 h-9 rounded-full bg-[#4ecdc4]/15 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-[#4ecdc4]" />
                  </div>
                  <h3 className="text-base font-bold text-white">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use h-screen or min-h-screen — never fixed pixel heights",
                    "object-cover on all background images — never object-contain",
                    "Always add gradient or solid overlay — text on raw imagery is forbidden",
                    "Center content with relative z-10 and max-width constraint",
                    "Add scroll indicator — users need visual affordance to scroll",
                    "Mute video autoplay — sound on autoplay is a UX failure",
                    "Provide image fallback poster for video backgrounds",
                    "Primary CTA: hover:-translate-y-1 + shadow burst (Gravity Focus)",
                    "Feature cards: group class + hover:-translate-y-2 (Floating Glass)",
                    "Icon container: group-hover:scale-110 transition-transform",
                    "All buttons: active:scale-[0.98] — tactile confirmation required",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/55 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4ecdc4] shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.16}>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-9 h-9 rounded-full bg-[#ff6b6b]/15 flex items-center justify-center">
                    <XIcon className="w-4 h-4 text-[#ff6b6b]" />
                  </div>
                  <h3 className="text-base font-bold text-white">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "No text directly on busy backgrounds without overlay",
                    "No low-quality or pixel-stretched images",
                    "No ignoring mobile — always test at 375px viewport width",
                    "No content filling the entire viewport with no breathing room",
                    "No autoplaying video with sound — ever, without exception",
                    "No omitting active:scale-[0.98] — dark overlay removes haptic cues",
                    "No cards without group class — icon micro-animation breaks",
                    "No z-index lower than z-10 for the content layer",
                    "No fixed pixel heights for the hero container",
                    "No omitting the scroll indicator — it is a primary UX affordance",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/55 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ff6b6b] shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Three principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <LayersIcon className="w-7 h-7" />,
                title: "First Impression",
                tagline: "You have under 2 seconds",
                desc: "Fullscreen heroes get one job: grab attention before the visitor decides to leave. Every pixel fights for that outcome. No waste. No decoration for its own sake.",
                color: "#4ecdc4",
              },
              {
                icon: <ShieldIcon className="w-7 h-7" />,
                title: "Readable Always",
                tagline: "Contrast is non-negotiable",
                desc: "Any image that fails WCAG AA without an overlay is the wrong image choice. The overlay is not cosmetic — it is load-bearing infrastructure for usability.",
                color: "#ffe66d",
              },
              {
                icon: <ZapIcon className="w-7 h-7" />,
                title: "Cinematic Motion",
                tagline: "Subtle is the operative word",
                desc: "Ken Burns slow zoom, smooth entry animations, gentle scroll indicators. Anything that vibrates or flashes without purpose is strictly forbidden in this layout.",
                color: "#6c5ce7",
              },
            ].map((p, i) => (
              <RevealBlock key={p.title} delay={i * 0.08}>
                <div className="group bg-white/[0.04] border border-white/10 rounded-2xl p-7 h-full hover:-translate-y-1 hover:border-white/20 transition-all duration-300 ease-out cursor-default">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-transform duration-300 ease-out group-hover:scale-110"
                    style={{ backgroundColor: `${p.color}20`, borderColor: `${p.color}40`, color: p.color }}
                  >
                    {p.icon}
                  </div>
                  <h4 className="text-white font-semibold text-base mb-1">{p.title}</h4>
                  <p className="text-xs font-medium mb-3" style={{ color: p.color }}>
                    {p.tagline}
                  </p>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 10 — RESPONSIVE + COMPATIBLE STYLES                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: "#6c5ce7" }}>
              Scale &amp; Pairings
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Responsive rules <span className="text-white/30">&amp; compatible styles</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              Fullscreen Hero is a layout — it pairs with a visual style for complete identity.
              It also must adapt gracefully across viewport sizes.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Responsive breakpoints */}
            <RevealBlock delay={0.1}>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 h-full">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/35 mb-6">Responsive breakpoints</p>
                <div className="space-y-5">
                  {[
                    {
                      bp: "Mobile (< 768px)",
                      color: "#ff6b6b",
                      rules: ["text-5xl headline — down from 7xl+", "Stacked CTA buttons: flex-col", "Hide or pause video — show poster", "Simpler overlay: solid preferred", "Hamburger menu in nav"],
                    },
                    {
                      bp: "Tablet (768px – 1280px)",
                      color: "#4ecdc4",
                      rules: ["text-6xl headline", "Side-by-side CTAs: sm:flex-row", "Video shown if bandwidth allows", "Full navigation visible", "Feature cards 2-column"],
                    },
                    {
                      bp: "Desktop (> 1280px)",
                      color: "#6c5ce7",
                      rules: ["text-7xl to 8xl headline", "All animations fully active", "Ken Burns on background", "Full gradient overlay complexity", "Feature cards 3–4 column"],
                    },
                  ].map((bp, i) => (
                    <div key={bp.bp} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: bp.color }} />
                      <div>
                        <p className="text-xs font-semibold text-white/75 mb-1.5">{bp.bp}</p>
                        <ul className="space-y-1">
                          {bp.rules.map((r) => (
                            <li key={r} className="text-xs text-white/40 leading-relaxed">{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Compatible styles */}
            <RevealBlock delay={0.15}>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 h-full">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/35 mb-6">Compatible visual styles</p>
                <div className="space-y-3">
                  {[
                    { name: "Glassmorphism", slug: "glassmorphism", color: "#4ecdc4", desc: "Frosted glass cards float directly over the hero image" },
                    { name: "Modern Gradient", slug: "modern-gradient", color: "#6c5ce7", desc: "Gradient fills become the background itself — no photo needed" },
                    { name: "Cyberpunk Neon", slug: "cyberpunk-neon", color: "#ff6b6b", desc: "Neon glow typography on the deep dark canvas" },
                    { name: "Minimalist Flat", slug: "minimalist-flat", color: "#ffe66d", desc: "Clean bold type over subtle gradient backgrounds" },
                    { name: "Dark Mode", slug: "dark-mode", color: "#a29bfe", desc: "Natural fit — dark overlays are already dark mode" },
                  ].map((style) => (
                    <Link
                      key={style.slug}
                      href={`/styles/${style.slug}`}
                      className="group flex items-center gap-4 p-3 rounded-xl border border-white/8 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
                    >
                      <div
                        className="w-8 h-8 rounded-lg shrink-0 transition-transform duration-200 group-hover:scale-110"
                        style={{ backgroundColor: `${style.color}25`, border: `1px solid ${style.color}40` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white/75 group-hover:text-white/90 transition-colors duration-200">
                          {style.name}
                        </p>
                        <p className="text-xs text-white/30 leading-relaxed truncate">{style.desc}</p>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors duration-200 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                          */}
      {/* ================================================================ */}
      <footer className="relative border-t border-white/10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                  <LayersIcon className="w-4 h-4 text-white/70" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Fullscreen<span className="text-white/25">Hero</span>
                </span>
              </div>
              <p className="text-sm text-white/30 leading-relaxed">
                Full-viewport imagery, precise overlay control, and cinematic hierarchy.
                The layout built for dominating the fold.
              </p>
              {/* Accent palette dots */}
              <div className="flex gap-2">
                {["#ffffff", ...ACCENT_COLORS].map((c) => (
                  <div
                    key={c}
                    className="w-4 h-4 rounded-full transition-transform duration-200 hover:scale-125 cursor-default"
                    style={{
                      backgroundColor: c,
                      border: c === "#ffffff" ? "1px solid rgba(255,255,255,0.25)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/20">Style</span>
                <Link href="/styles/hero-fullscreen" className="text-white/35 hover:text-white/75 transition-colors duration-200">
                  Documentation
                </Link>
                <Link href="/styles/hero-fullscreen/showcase" className="text-white/35 hover:text-white/75 transition-colors duration-200">
                  Showcase
                </Link>
                <Link href="/styles/hero-fullscreen/cover" className="text-white/35 hover:text-white/75 transition-colors duration-200">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/20">StyleKit</span>
                <Link href="/" className="text-white/35 hover:text-white/75 transition-colors duration-200">
                  Home
                </Link>
                <Link href="/styles" className="text-white/35 hover:text-white/75 transition-colors duration-200">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/20">Accents</span>
                {[
                  { name: "White (primary)", hex: "#ffffff" },
                  { name: "Coral Red", hex: "#ff6b6b" },
                  { name: "Turquoise", hex: "#4ecdc4" },
                  { name: "Canary", hex: "#ffe66d" },
                  { name: "Deep Violet", hex: "#6c5ce7" },
                ].map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-white/25 text-xs">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: s.hex,
                        border: s.hex === "#ffffff" ? "1px solid rgba(255,255,255,0.25)" : "none",
                      }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20 tracking-wide">
              Fullscreen Hero &mdash; part of the StyleKit design system
            </p>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white/45 text-sm font-medium
                hover:bg-white/8 hover:text-white hover:border-white/25
                hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.05)]
                active:scale-[0.97] active:translate-y-0
                transition-all duration-200 ease-out"
            >
              &#8592; Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
