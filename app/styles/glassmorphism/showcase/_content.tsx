"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                       */
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

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function BlurIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" opacity="0.2" />
      <circle cx="12" cy="12" r="6" opacity="0.4" />
      <circle cx="12" cy="12" r="3" opacity="0.8" />
    </svg>
  );
}

function GlintIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0l1.2 7.8L21 12l-7.8 1.2L12 21l-1.2-7.8L3 12l7.8-1.2z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Film grain overlay — 2-3% noise removes the plastic feel           */
/* ------------------------------------------------------------------ */

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function GrainOverlay({ opacity = 0.025 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 mix-blend-overlay"
      style={{ backgroundImage: GRAIN_URL, opacity }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Ink Night", hex: "#0B1322", display: "#0B1322", label: "Scene base" },
  { name: "Steel Blue", hex: "#33517A", display: "#33517A", label: "Deep light well" },
  { name: "Moonlight", hex: "#7C9CC4", display: "#7C9CC4", label: "Cool glow" },
  { name: "Champagne", hex: "#E4B863", display: "#E4B863", label: "The one accent" },
  { name: "Glass Surface", hex: "rgba(255,255,255,0.08)", display: "white/8", label: "Colorless panel" },
  { name: "Glass Raised", hex: "rgba(255,255,255,0.12)", display: "white/12", label: "Elevated panel" },
];

const nightScenes = [
  {
    name: "Moonlit Harbor",
    base: "#0B1322",
    wells: [
      "radial-gradient(640px circle at 85% 10%, rgba(124,156,196,0.25), transparent 60%)",
      "radial-gradient(560px circle at 10% 90%, rgba(51,81,122,0.3), transparent 60%)",
      "radial-gradient(460px circle at 50% 45%, rgba(124,156,196,0.18), transparent 60%)",
    ],
  },
  {
    name: "Ember Study",
    base: "#120D0A",
    wells: [
      "radial-gradient(640px circle at 80% 15%, rgba(201,143,78,0.22), transparent 60%)",
      "radial-gradient(560px circle at 12% 88%, rgba(92,58,30,0.35), transparent 60%)",
      "radial-gradient(460px circle at 50% 45%, rgba(201,143,78,0.16), transparent 60%)",
    ],
  },
  {
    name: "Deep Forest",
    base: "#081210",
    wells: [
      "radial-gradient(640px circle at 85% 12%, rgba(127,182,158,0.2), transparent 60%)",
      "radial-gradient(560px circle at 10% 88%, rgba(31,77,58,0.35), transparent 60%)",
      "radial-gradient(460px circle at 50% 45%, rgba(127,182,158,0.15), transparent 60%)",
    ],
  },
];

const layerData = [
  {
    id: 0,
    label: "Night Scene Foundation",
    description:
      "A near-black ink base with two or three soft light wells. Glass has no color of its own — these lights are what it will borrow, bend and soften.",
    code: "bg-[#0B1322] + radial-gradient light wells",
  },
  {
    id: 1,
    label: "High Blur + Saturate",
    description:
      "backdrop-blur-[60px] with backdrop-saturate-[180%]. The saturation boost is what makes dark-scene light sources glow through the frost instead of dying in it.",
    code: "backdrop-blur-[60px] backdrop-saturate-[180%]",
  },
  {
    id: 2,
    label: "Colorless Surface + Edge Light",
    description:
      "White at 8% opacity — never a tint. Light has direction: a lit top edge (inset white highlight) and a shaded bottom edge (inset dark line) separate real glass from a translucent rectangle.",
    code: "bg-white/8 + inset 0 1px 0 white/22 + inset 0 -1px 0 ink/35",
  },
  {
    id: 3,
    label: "Grain + Content",
    description:
      "A 2-3% film-grain overlay removes the plastic feel, and content sits on top. Champagne gold appears only here — on primary actions and key numbers, never as a surface.",
    code: "feTurbulence grain 2.5% + text-[#F3DCA8] accents",
  },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "nav";

/* ------------------------------------------------------------------ */
/*  Night scene wrapper                                                */
/* ------------------------------------------------------------------ */

function NightScene({
  scene,
  className = "",
  children,
  animateWells = false,
}: {
  scene: (typeof nightScenes)[number];
  className?: string;
  children: React.ReactNode;
  animateWells?: boolean;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{
        backgroundColor: scene.base,
        transition: "background-color 0.8s ease-out",
      }}
    >
      {nightScenes.map((s) => (
        <div
          key={s.name}
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage: s.wells.join(","),
            opacity: s.name === scene.name ? 1 : 0,
            transition: "opacity 0.8s ease-out",
          }}
        />
      ))}
      {animateWells && (
        <>
          <div
            className="absolute top-8 right-12 w-40 h-40 rounded-full lg-pulse pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-6 left-8 w-32 h-32 rounded-full lg-pulse pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)", animationDelay: "2s" }}
          />
        </>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Glass panel component — colorless, directional edge light          */
/* ------------------------------------------------------------------ */

function GlassPanel({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`group relative
        bg-white/8 backdrop-blur-[60px] backdrop-saturate-[180%]
        border border-white/15
        rounded-3xl
        shadow-[0_16px_40px_rgba(3,7,18,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.35)]
        overflow-hidden
        ${hover ? "hover:border-white/30 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(3,7,18,0.65),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-1" : ""}
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${className}`}
    >
      <span className="absolute inset-0 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_50%)] pointer-events-none" />
      {hover && (
        <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons — champagne is the ONLY place color appears                */
/* ------------------------------------------------------------------ */

function ChampagneButton({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const classes = `group relative inline-flex items-center gap-2 rounded-2xl
        bg-[#E4B863]/15 backdrop-blur-[40px] backdrop-saturate-[180%]
        border border-[#E4B863]/40
        text-[#F3DCA8] font-medium
        shadow-[0_4px_16px_rgba(3,7,18,0.45),inset_0_1px_0_rgba(243,220,168,0.3),inset_0_-1px_0_rgba(2,6,16,0.3)]
        hover:bg-[#E4B863]/22 hover:border-[#E4B863]/55 hover:shadow-[0_10px_32px_rgba(3,7,18,0.55),0_0_24px_rgba(228,184,99,0.2),inset_0_1px_0_rgba(243,220,168,0.4)]
        hover:-translate-y-0.5 active:scale-[0.97]
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${className}`;
  const inner = (
    <>
      <span className="absolute inset-0 [background-image:linear-gradient(to_bottom,rgba(243,220,168,0.12),transparent_55%)] pointer-events-none" />
      <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#F3DCA8]/20 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return <button className={classes}>{inner}</button>;
}

function GhostGlassButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`group relative inline-flex items-center gap-2 rounded-2xl
        bg-white/6 backdrop-blur-[40px] backdrop-saturate-[180%]
        border border-white/15
        text-white/85 font-medium
        shadow-[0_2px_8px_rgba(3,7,18,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]
        hover:bg-white/12 hover:border-white/30 hover:text-white hover:-translate-y-0.5 active:scale-[0.97]
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${className}`}
    >
      <span className="absolute inset-0 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent_55%)] pointer-events-none" />
      <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/12 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Editorial section head — numbered, left-aligned, serif             */
/* ------------------------------------------------------------------ */

function SectionHead({
  no,
  kicker,
  title,
  sub,
}: {
  no: string;
  kicker: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <RevealBlock className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4 border-b border-white/10 pb-5 mb-6">
        <span className="font-mono text-sm text-[#E4B863] tabular-nums">{no}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">{kicker}</span>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-12">
        <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.05] max-w-xl">{title}</h2>
        {sub && <p className="mt-4 md:mt-0 text-white/50 text-base leading-relaxed max-w-sm md:text-right">{sub}</p>}
      </div>
    </RevealBlock>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [glassOpacity, setGlassOpacity] = useState(8);
  const [glassBlur, setGlassBlur] = useState(60);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const currentScene = nightScenes[activeScene];
  const spring = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      className="relative min-h-screen font-sans overflow-x-hidden"
      style={{
        backgroundColor: "#0B1322",
        backgroundImage: [
          "radial-gradient(900px circle at 82% -5%, rgba(124,156,196,0.22), transparent 55%)",
          "radial-gradient(700px circle at 8% 30%, rgba(51,81,122,0.28), transparent 60%)",
          "radial-gradient(600px circle at 70% 85%, rgba(228,184,99,0.08), transparent 55%)",
        ].join(","),
      }}
    >
      <GrainOverlay />
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes lg-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(1.5deg); }
          66% { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes lg-well-drift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.9; }
          33% { transform: translate(25px, -35px) scale(1.06); opacity: 1; }
          66% { transform: translate(-20px, 15px) scale(0.96); opacity: 0.8; }
        }
        @keyframes lg-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.75; }
        }
        @keyframes lg-shimmer {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
        .lg-float { animation: lg-float 7s ease-in-out infinite; }
        .lg-well-1 { animation: lg-well-drift 11s ease-in-out infinite; }
        .lg-well-2 { animation: lg-well-drift 14s ease-in-out infinite 3s; }
        .lg-pulse { animation: lg-pulse 4s ease-in-out infinite; }
        .lg-shimmer { animation: lg-shimmer 0.9s ease-out forwards; }
        .lg-spring { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .lg-float, .lg-well-1, .lg-well-2, .lg-pulse { animation: none; }
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. FIXED NAV                                                 */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-[60px] backdrop-saturate-[180%] border-b border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(3,7,18,0.35)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link
              href="/styles/glassmorphism"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/6 backdrop-blur-[40px] border border-white/15 text-white/60 text-sm hover:text-white hover:bg-white/12 hover:border-white/25 lg-spring"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
              <span>Back to Docs</span>
            </Link>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/8 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(2,6,16,0.3)]">
              <MoonIcon className="w-4 h-4 text-[#E4B863]" />
              <span className="text-sm font-semibold text-white tracking-tight">
                Nocturne<span className="text-white/50">Glass</span>
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Scenes", href: "#scenes" },
              { label: "Palette", href: "#palette" },
              { label: "Components", href: "#components" },
              { label: "Anatomy", href: "#anatomy" },
              { label: "Playground", href: "#playground" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 rounded-xl text-sm text-white/55 hover:text-white hover:bg-white/8 lg-spring"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            href="/"
            className="group relative flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/8 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 text-white text-sm font-medium overflow-hidden hover:bg-white/14 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(3,7,18,0.45),inset_0_1px_0_rgba(255,255,255,0.25)] lg-spring"
          >
            <span className="absolute inset-0 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.1),transparent_55%)] pointer-events-none" />
            <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
            <span className="relative z-10">StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative pt-28 md:pt-36 pb-28 px-5 md:px-10 overflow-hidden">
        {/* Drifting light wells */}
        <div
          className="absolute top-10 right-[-80px] w-[520px] h-[520px] rounded-full pointer-events-none lg-well-1"
          style={{ background: "radial-gradient(circle, rgba(124,156,196,0.2) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[240px] left-[-120px] w-[460px] h-[460px] rounded-full pointer-events-none lg-well-2"
          style={{ background: "radial-gradient(circle, rgba(51,81,122,0.3) 0%, transparent 70%)" }}
        />

        <div className="max-w-6xl mx-auto relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: editorial type */}
          <div className="lg:col-span-7">
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.55s ${spring} 0s, transform 0.55s ${spring} 0s`,
              }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40 mb-8">
                Style N°42 <span className="text-white/20 mx-2">/</span> Nocturne Glassmorphism
              </p>
            </div>

            <h1
              className="font-serif text-5xl md:text-7xl lg:text-[84px] text-white leading-[1.02] tracking-tight mb-8"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.7s ${spring} 0.1s, transform 0.7s ${spring} 0.1s`,
              }}
            >
              The glass
              <br />
              has <em className="italic text-[#F3DCA8]">no color.</em>
            </h1>

            <p
              className="text-white/60 text-lg leading-relaxed max-w-md mb-10"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s ${spring} 0.2s, transform 0.7s ${spring} 0.2s`,
              }}
            >
              It borrows, bends and softens the light behind it. Deep night scenes,
              directional edge light, film grain — and one champagne accent.
            </p>

            {/* Spec strip instead of stat cards */}
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-white/40 mb-12 border-l-2 border-[#E4B863]/60 pl-4"
              style={{
                opacity: heroVisible ? 1 : 0,
                transition: `opacity 0.7s ${spring} 0.3s`,
              }}
            >
              <span className="text-white/70">bg-white/8</span>
              <span className="text-white/20">·</span>
              <span className="text-white/70">blur 60px</span>
              <span className="text-white/20">·</span>
              <span className="text-white/70">saturate 180%</span>
              <span className="text-white/20">·</span>
              <span className="text-[#F3DCA8]">#E4B863</span>
            </div>

            <div
              className="flex flex-wrap items-center gap-6"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.7s ${spring} 0.35s, transform 0.7s ${spring} 0.35s`,
              }}
            >
              <ChampagneButton href="#scenes" className="px-7 py-3.5">
                Explore the Night
              </ChampagneButton>
              <a href="#anatomy" className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white border-b border-white/20 hover:border-white/50 pb-0.5 lg-spring">
                Read the anatomy
                <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right: a real glass composition, not decoration */}
          <div
            className="lg:col-span-5 relative"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(32px)",
              transition: `opacity 0.9s ${spring} 0.25s, transform 0.9s ${spring} 0.25s`,
            }}
          >
            {/* Light well the demo refracts */}
            <div
              className="absolute top-6 right-8 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(124,156,196,0.22) 0%, transparent 65%)" }}
            />
            <div
              className="absolute -top-16 -right-10 w-72 h-72 rounded-full pointer-events-none lg-pulse"
              style={{ background: "radial-gradient(circle, rgba(124,156,196,0.45) 0%, transparent 65%)" }}
            />
            <div
              className="absolute -bottom-10 -left-6 w-56 h-56 rounded-full pointer-events-none lg-pulse"
              style={{ background: "radial-gradient(circle, rgba(228,184,99,0.22) 0%, transparent 65%)", animationDelay: "2s" }}
            />

            {/* Now-playing glass card */}
            <GlassPanel className="p-6 relative z-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mb-4">Now Playing</p>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl shrink-0 border border-white/15" style={{ background: "radial-gradient(circle at 30% 30%, #33517A, #0B1322)" }} />
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">Clair de Lune</p>
                  <p className="text-white/45 text-sm truncate">Debussy — Suite bergamasque</p>
                </div>
              </div>
              <div className="h-1 rounded-full bg-white/10 mb-2 overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-[#E4B863]/80" />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-white/50 tabular-nums">
                <span>3:12</span>
                <span>4:48</span>
              </div>
            </GlassPanel>

            {/* Overlapping smaller panel — depth, not symmetry */}
            <GlassPanel className="p-5 relative z-20 -mt-6 ml-10 md:ml-16 max-w-[260px]">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-white/60 text-xs">Tonight, 23:41</p>
                <MoonIcon className="w-3.5 h-3.5 text-[#E4B863]" />
              </div>
              <p className="text-white text-sm leading-snug">Light has direction. Top edge lit, bottom edge shaded.</p>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. NIGHT SCENE SWITCHER                                      */}
      {/* ============================================================ */}
      <section id="scenes" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="01"
            kicker="Foundation"
            title={<>Night scenes</>}
            sub="Glass needs something to refract. Not a loud gradient — a deep ink base with a few soft light wells. The scene owns the color; the glass stays neutral."
          />

          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-3">
              {nightScenes.map((scene, i) => (
                <button
                  key={scene.name}
                  onClick={() => setActiveScene(i)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium lg-spring border ${
                    activeScene === i
                      ? "bg-white/12 border-white/30 text-white shadow-[0_4px_16px_rgba(3,7,18,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
                      : "bg-white/5 border-white/12 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {scene.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <NightScene
              scene={currentScene}
              animateWells
              className="rounded-3xl p-10 md:p-16 min-h-[320px] flex items-center justify-center border border-white/8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
                {["Primary Panel", "Content Area", "Side Panel"].map((label, i) => (
                  <GlassPanel key={label} className="p-6">
                    <div className="text-white font-semibold text-sm mb-2">{label}</div>
                    <div className="text-white/45 text-xs">Glass layer {i + 1}</div>
                  </GlassPanel>
                ))}
              </div>
            </NightScene>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COLOR PALETTE                                             */}
      {/* ============================================================ */}
      <section id="palette" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="02"
            kicker="Palette"
            title={<>Nocturne color system</>}
            sub="Ink night, two moonlight blues, one champagne accent, and two colorless glass surfaces. The transparency is the material; the scene is the palette."
          />

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="group relative cursor-default"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="h-24 rounded-2xl mb-3 border border-white/12 overflow-hidden relative"
                    style={{
                      backgroundColor: swatch.hex,
                      transform: hoveredSwatch === i ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                      boxShadow: hoveredSwatch === i
                        ? "0 16px 40px rgba(3,7,18,0.55), inset 0 1px 0 rgba(255,255,255,0.25)"
                        : "0 4px 12px rgba(3,7,18,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
                      transition: `transform 0.5s ${spring}, box-shadow 0.5s ease`,
                    }}
                  >
                    {swatch.name.includes("Glass") && (
                      <div
                        className="absolute inset-0 opacity-15"
                        style={{
                          backgroundImage: "repeating-conic-gradient(#4a5a75 0% 25%, #93a5c0 0% 50%)",
                          backgroundSize: "16px 16px",
                        }}
                      />
                    )}
                    {hoveredSwatch === i && (
                      <div
                        className="absolute inset-0 lg-shimmer"
                        style={{
                          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                        }}
                      />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-white">{swatch.name}</div>
                  <div className={`text-xs font-mono mt-0.5 ${swatch.name === "Champagne" ? "text-[#F3DCA8]" : "text-white/50"}`}>{swatch.display}</div>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/55 bg-white/6 border border-white/10">
                    {swatch.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. COMPONENT GALLERY                                         */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="03"
            kicker="Components"
            title={<>Glass building blocks</>}
            sub="Every component is a colorless panel with a lit top edge, a shaded bottom edge, and a specular sweep on interaction. Champagne marks the primary action."
          />

          {/* Tab pills */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "nav"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize lg-spring border ${
                    activeTab === tab
                      ? "bg-white/12 border-white/30 text-white shadow-[0_4px_16px_rgba(3,7,18,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
                      : "bg-white/5 border-white/12 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <GlassPanel hover={false} className="p-8 md:p-12">

              {/* BUTTONS TAB */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/35 mb-5">
                      Champagne primary, colorless secondary
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <ChampagneButton className="px-6 py-3">
                        <GlintIcon className="w-4 h-4" />
                        Primary
                      </ChampagneButton>
                      <GhostGlassButton className="px-6 py-3">
                        <LayersIcon className="w-4 h-4" />
                        Secondary
                      </GhostGlassButton>
                      <button className="group relative px-6 py-3 rounded-2xl bg-transparent border border-white/12 text-white/60 font-medium hover:text-white hover:border-white/25 hover:bg-white/5 lg-spring">
                        Tertiary
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/35 mb-5">Size variants</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { size: "sm", cls: "px-4 py-2 text-xs rounded-xl" },
                        { size: "md", cls: "px-6 py-3 text-sm rounded-2xl" },
                        { size: "lg", cls: "px-9 py-4 text-base rounded-2xl" },
                      ].map(({ size, cls }) => (
                        <button
                          key={size}
                          className={`group relative bg-white/8 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 text-white font-medium shadow-[0_4px_16px_rgba(3,7,18,0.45),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.3)] hover:bg-white/14 hover:border-white/30 hover:-translate-y-0.5 lg-spring overflow-hidden ${cls}`}
                        >
                          <span className="absolute inset-0 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.1),transparent_55%)] pointer-events-none" />
                          <span className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                          <span className="relative z-10">{size.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CARDS TAB */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { title: "Weather Widget", desc: "Glass panels over a moonlit sky. The clouds behind provide every color the panel shows.", icon: <BlurIcon className="w-6 h-6" /> },
                    { title: "Music Player", desc: "Album art becomes the light well; controls float in colorless frost above it.", icon: <MoonIcon className="w-6 h-6" /> },
                    { title: "Auth Card", desc: "A login form suspended in the dark, edges lit from above, champagne on the submit.", icon: <LayersIcon className="w-6 h-6" /> },
                    { title: "Dashboard", desc: "Stats under glass with key numbers in champagne — the only color that belongs to the UI.", icon: <GlintIcon className="w-6 h-6" /> },
                  ].map((card, i) => (
                    <GlassPanel key={card.title} className="p-7 cursor-default">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-white/8 backdrop-blur-[30px] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(2,6,16,0.3)] ${i === 3 ? "text-[#E4B863]" : "text-[#7C9CC4]"}`}>{card.icon}</div>
                      <h4 className="text-white text-lg font-semibold mb-2">{card.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                    </GlassPanel>
                  ))}
                </div>
              )}

              {/* INPUTS TAB */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/65 mb-2">Username</label>
                      <input type="text" placeholder="Enter username..." className="w-full px-5 py-3.5 bg-white/6 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 rounded-2xl text-white placeholder-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(2,6,16,0.3)] focus:outline-none focus:border-white/35 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(228,184,99,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] lg-spring" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/65 mb-2">Password</label>
                      <input type="password" placeholder="Enter password..." className="w-full px-5 py-3.5 bg-white/6 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 rounded-2xl text-white placeholder-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(2,6,16,0.3)] focus:outline-none focus:border-white/35 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(228,184,99,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] lg-spring" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/65 mb-2">Message</label>
                      <textarea rows={3} placeholder="Write something..." className="w-full px-5 py-3.5 bg-white/6 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 rounded-2xl text-white placeholder-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(2,6,16,0.3)] focus:outline-none focus:border-white/35 focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(228,184,99,0.15),inset_0_1px_0_rgba(255,255,255,0.25)] lg-spring resize-none" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/65 mb-2">Select scene</label>
                      <select className="w-full px-5 py-3.5 bg-white/6 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/15 rounded-2xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(2,6,16,0.3)] focus:outline-none focus:border-white/35 lg-spring">
                        <option className="text-gray-900">Moonlit Harbor</option>
                        <option className="text-gray-900">Ember Study</option>
                        <option className="text-gray-900">Deep Forest</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-lg bg-[#E4B863]/20 border border-[#E4B863]/45 flex items-center justify-center cursor-pointer shadow-[inset_0_1px_0_rgba(243,220,168,0.25)]">
                        <CheckIcon className="w-3 h-3 text-[#F3DCA8]" />
                      </div>
                      <span className="text-sm text-white/65">Remember me</span>
                    </div>
                    <ChampagneButton className="w-full justify-center px-6 py-3.5">
                      Sign In
                    </ChampagneButton>
                  </div>
                </div>
              )}

              {/* NAV TAB */}
              {activeTab === "nav" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/35 mb-5">
                      Fixed navigation bar
                    </p>
                    <NightScene scene={nightScenes[0]} className="rounded-2xl border border-white/8">
                      <div className="bg-white/5 backdrop-blur-[60px] backdrop-saturate-[180%] border-b border-white/10 px-6 py-3 flex items-center justify-between shadow-[0_1px_0_rgba(255,255,255,0.06)]">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/8 border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                          <MoonIcon className="w-3.5 h-3.5 text-[#E4B863]" />
                          <span className="text-xs font-semibold text-white">Brand</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {["Home", "About", "Contact"].map((item) => (
                            <span key={item} className="px-3 py-1.5 rounded-xl text-xs text-white/55 hover:text-white hover:bg-white/8 cursor-pointer lg-spring">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-12 text-center">
                        <p className="text-white/35 text-sm">Page content below the nav</p>
                      </div>
                    </NightScene>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-white/35 mb-5">
                      Sidebar navigation
                    </p>
                    <NightScene scene={nightScenes[1]} className="rounded-2xl flex border border-white/8" >
                      <div className="w-56 bg-white/5 backdrop-blur-[60px] backdrop-saturate-[180%] border-r border-white/10 p-4 flex flex-col gap-1 shadow-[1px_0_0_rgba(255,255,255,0.04)]" style={{ minHeight: 240 }}>
                        {["Dashboard", "Analytics", "Settings", "Profile"].map((item, i) => (
                          <div
                            key={item}
                            className={`px-4 py-2.5 rounded-xl text-sm cursor-pointer lg-spring ${
                              i === 0
                                ? "bg-white/10 text-white border border-white/18 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                                : "text-white/50 hover:text-white hover:bg-white/6"
                            }`}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 p-8 flex items-center justify-center">
                        <p className="text-white/35 text-sm">Main content area</p>
                      </div>
                    </NightScene>
                  </div>
                </div>
              )}
            </GlassPanel>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. LAYER ANATOMY                                             */}
      {/* ============================================================ */}
      <section id="anatomy" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="04"
            kicker="Anatomy"
            title={<>Four layers deep</>}
            sub="Nocturne glass is built from four layers. Each one is essential — remove any layer and it collapses back into a translucent rectangle."
          />

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Layer selector */}
              <div className="space-y-3">
                {layerData.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl border lg-spring ${
                      activeLayer === layer.id
                        ? "bg-white/10 border-white/28 shadow-[0_4px_20px_rgba(3,7,18,0.4),inset_0_1px_0_rgba(255,255,255,0.22)]"
                        : "bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/18"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        activeLayer === layer.id ? "bg-[#E4B863]/25 text-[#F3DCA8]" : "bg-white/8 text-white/45"
                      }`}>
                        {layer.id + 1}
                      </span>
                      <span className={`text-sm font-semibold ${activeLayer === layer.id ? "text-white" : "text-white/60"}`}>
                        {layer.label}
                      </span>
                    </div>
                    {activeLayer === layer.id && (
                      <div className="mt-2 ml-9">
                        <p className="text-white/50 text-xs leading-relaxed mb-2">{layer.description}</p>
                        <code className="text-[10px] font-mono text-white/55 bg-white/6 px-2 py-1 rounded-lg">{layer.code}</code>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Visual preview */}
              <NightScene scene={nightScenes[0]} className="rounded-3xl min-h-[320px] flex items-center justify-center border border-white/8">
                {/* Layer 0: night scene - always visible */}
                {/* Layer 1: blur overlay */}
                {activeLayer >= 1 && (
                  <div className="absolute inset-8 rounded-2xl backdrop-blur-[60px] backdrop-saturate-[180%]" />
                )}
                {/* Layer 2: colorless surface with directional edge light */}
                {activeLayer >= 2 && (
                  <div className="absolute inset-8 rounded-2xl bg-white/8 border border-white/15 shadow-[0_16px_40px_rgba(3,7,18,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.35)] overflow-hidden">
                    <span className="absolute inset-0 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_50%)]" />
                  </div>
                )}
                {/* Layer 3: grain + content */}
                {activeLayer >= 3 && (
                  <div className="absolute inset-8 rounded-2xl flex items-center justify-center p-8 overflow-hidden">
                    <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ backgroundImage: GRAIN_URL, opacity: 0.03 }} />
                    <div className="text-center relative">
                      <h3 className="text-white text-xl font-bold mb-2">Content <span className="text-[#F3DCA8]">Layer</span></h3>
                      <p className="text-white/60 text-sm">Champagne only lives here</p>
                    </div>
                  </div>
                )}
                {/* Layer indicator */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-[40px] text-white/75 text-xs font-mono border border-white/10">
                  Layer {activeLayer + 1}/4: {layerData[activeLayer].label}
                </div>
              </NightScene>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. INTERACTIVE PLAYGROUND                                     */}
      {/* ============================================================ */}
      <section id="playground" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="05"
            kicker="Playground"
            title={<>Tune the glass</>}
            sub="Adjust opacity and blur over a real night scene. The sweet spot is 5-12% opacity with 40-60px blur — beyond 15% the glass turns into a tinted block."
          />

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white/65">Glass Opacity</label>
                    <span className={`text-xs font-mono px-2 py-1 rounded-lg bg-white/6 ${glassOpacity > 15 ? "text-[#F3DCA8]" : "text-white/45"}`}>
                      {glassOpacity}%{glassOpacity > 15 ? " — too solid" : ""}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={30}
                    value={glassOpacity}
                    onChange={(e) => setGlassOpacity(Number(e.target.value))}
                    className="w-full accent-[#E4B863]"
                  />
                  <div className="flex justify-between text-[10px] text-white/45 mt-1">
                    <span>3% (whisper)</span>
                    <span>30% (tinted block)</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-white/65">Blur Radius</label>
                    <span className="text-xs font-mono text-white/45 bg-white/6 px-2 py-1 rounded-lg">{glassBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={glassBlur}
                    onChange={(e) => setGlassBlur(Number(e.target.value))}
                    className="w-full accent-[#E4B863]"
                  />
                  <div className="flex justify-between text-[10px] text-white/45 mt-1">
                    <span>10px (light)</span>
                    <span>100px (heavy)</span>
                  </div>
                </div>
                <div className="bg-white/4 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs font-mono text-white/45 leading-relaxed">
                    bg-white/{glassOpacity}<br />
                    backdrop-blur-[{glassBlur}px]<br />
                    backdrop-saturate-[180%]<br />
                    border border-white/15<br />
                    shadow-[0_16px_40px_rgba(3,7,18,0.5),<br />
                    &nbsp;&nbsp;inset_0_1px_0_rgba(255,255,255,0.22),<br />
                    &nbsp;&nbsp;inset_0_-1px_0_rgba(2,6,16,0.35)]
                  </p>
                </div>
              </div>

              {/* Live preview */}
              <NightScene scene={currentScene} animateWells className="rounded-3xl min-h-[360px] flex items-center justify-center p-8 border border-white/8">
                <div
                  className="relative w-full max-w-sm p-8 rounded-3xl border border-white/15 overflow-hidden"
                  style={{
                    backgroundColor: `rgba(255,255,255,${glassOpacity / 100})`,
                    backdropFilter: `blur(${glassBlur}px) saturate(180%)`,
                    WebkitBackdropFilter: `blur(${glassBlur}px) saturate(180%)`,
                    boxShadow: "0 16px 40px rgba(3,7,18,0.5), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(2,6,16,0.35)",
                    transition: `all 0.5s ${spring}`,
                  }}
                >
                  <span className="absolute inset-0 [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.12),transparent_50%)] pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-white text-lg font-bold mb-2">Live Preview</h3>
                    <p className="text-white/60 text-sm mb-4">Watch the light wells glow through the frost.</p>
                    <ChampagneButton className="px-5 py-2.5 text-sm rounded-xl">
                      Glass Button
                    </ChampagneButton>
                  </div>
                </div>
              </NightScene>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. DO / DON'T                                                */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead no="06" kicker="Guidelines" title={<>Do / Don&apos;t</>} />

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DO */}
              <GlassPanel hover={false} className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Deep ink night base with 2-3 soft light wells",
                    "Colorless glass: bg-white/5 to bg-white/12 only",
                    "backdrop-blur-[40px]+ with backdrop-saturate-[180%]",
                    "Directional edge light: lit top inset + shaded bottom inset",
                    "2-3% film grain overlay to remove the plastic feel",
                    "One accent — champagne #E4B863 on primary actions only",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/65 leading-relaxed">
                      <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassPanel>

              {/* DON'T */}
              <GlassPanel hover={false} className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <XIcon className="w-4 h-4 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Purple-pink AI gradients (#667eea → #764ba2 → #f093fb)",
                    "Glass on flat solid backgrounds with nothing to refract",
                    "Glass opacity above 15% — it becomes a tinted block",
                    "Tinting the glass itself — color belongs to the scene",
                    "Low blur (backdrop-blur-sm) or missing saturate boost",
                    "Single-layer flat shadows without edge light",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/65 leading-relaxed">
                      <XIcon className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. PHILOSOPHY                                                */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="07"
            kicker="Philosophy"
            title={<>Optics, not a color scheme</>}
          />

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: "Colorless Glass",
                  desc: "Real glass has no color of its own. Panels use only low-opacity white; every hue the eye reads comes from the scene behind.",
                  icon: <BlurIcon className="w-5 h-5" />,
                },
                {
                  title: "Deep Night Scenes",
                  desc: "A near-black ink base with soft light wells gives the glass something worth refracting — no loud gradients needed.",
                  icon: <MoonIcon className="w-5 h-5" />,
                },
                {
                  title: "Light Has Direction",
                  desc: "A lit top edge and a shaded bottom edge are what separate real glass from a translucent rectangle.",
                  icon: <GlintIcon className="w-5 h-5" />,
                },
                {
                  title: "One Accent",
                  desc: "Champagne gold appears only on primary actions, key numbers and highlights — never as a surface color.",
                  icon: <GlintIcon className="w-5 h-5" />,
                },
                {
                  title: "Film Grain",
                  desc: "A 2-3% noise overlay breaks up the digital smoothness and removes the plastic feel from large frosted areas.",
                  icon: <LayersIcon className="w-5 h-5" />,
                },
                {
                  title: "Fluid Motion",
                  desc: "Spring easing (cubic-bezier 0.16,1,0.3,1) simulates the physical inertia of glass. Nothing snaps, everything flows.",
                  icon: <ArrowRightIcon className="w-5 h-5" />,
                },
              ].map((principle, i) => (
                <GlassPanel key={principle.title} className="p-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-white/8 border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(2,6,16,0.3)] ${i === 3 ? "text-[#E4B863]" : "text-white/75"}`}>
                    {principle.icon}
                  </div>
                  <h4 className="text-white font-semibold mb-2">{principle.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{principle.desc}</p>
                </GlassPanel>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer className="py-16 px-5 md:px-10 border-t border-white/8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/45 text-sm mb-4">
            Nocturne Glass — colorless glass over deep night scenes
          </p>
          <Link
            href="/styles"
            className="inline-flex items-center gap-2 text-white/55 hover:text-white text-sm lg-spring"
          >
            <ArrowRightIcon className="w-4 h-4 rotate-180" />
            Back to all styles
          </Link>
        </div>
      </footer>
    </div>
  );
}
