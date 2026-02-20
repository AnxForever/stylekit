"use client";

import { useRef, useState, useEffect } from "react";
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

// ─────────────────────────────────────────────────────────────
// Inline SVG Decorations
// ─────────────────────────────────────────────────────────────

function VineCorner({
  size = 80,
  flip = false,
  flipY = false,
}: {
  size?: number;
  flip?: boolean;
  flipY?: boolean;
}) {
  const scaleX = flip ? -1 : 1;
  const scaleY = flipY ? -1 : 1;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      style={{ transform: `scale(${scaleX}, ${scaleY})` }}
    >
      <path
        d="M8 72 C8 40, 40 8, 72 8"
        stroke="#c9a74e"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M8 72 C8 52, 28 32, 48 18"
        stroke="#c9a74e"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Leaves */}
      <ellipse cx="18" cy="56" rx="5" ry="9" fill="#2d4a2d" opacity="0.7" transform="rotate(-45 18 56)" />
      <ellipse cx="30" cy="42" rx="4" ry="7" fill="#2d4a2d" opacity="0.6" transform="rotate(-38 30 42)" />
      <ellipse cx="45" cy="28" rx="4" ry="7" fill="#2d4a2d" opacity="0.65" transform="rotate(-30 45 28)" />
      <ellipse cx="60" cy="16" rx="3" ry="6" fill="#2d4a2d" opacity="0.55" transform="rotate(-20 60 16)" />
      {/* Small berries */}
      <circle cx="22" cy="50" r="2.5" fill="#8b1a1a" opacity="0.7" />
      <circle cx="36" cy="36" r="2" fill="#8b1a1a" opacity="0.6" />
      <circle cx="52" cy="23" r="2" fill="#c9a74e" opacity="0.8" />
      {/* Vine tendrils */}
      <path
        d="M18 56 Q12 50, 16 44"
        stroke="#c9a74e"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M45 28 Q52 22, 48 16"
        stroke="#c9a74e"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function OrnamentalDivider({ width = "100%" }: { width?: string }) {
  return (
    <div className="flex items-center gap-3 my-6" style={{ width }}>
      <div className="flex-1 h-px bg-[#c9a74e]/50" />
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden="true">
        <path d="M4 8 L16 2 L28 8 L16 14 Z" fill="#c9a74e" opacity="0.85" />
        <path d="M4 8 L16 2 L28 8 L16 14 Z" fill="none" stroke="#c9a74e" strokeWidth="1" />
        <circle cx="16" cy="8" r="2.5" fill="#f0e6d0" />
      </svg>
      <div className="flex-1 h-px bg-[#c9a74e]/50" />
    </div>
  );
}

function GoldFlourish() {
  return (
    <svg width="120" height="24" viewBox="0 0 120 24" fill="none" aria-hidden="true">
      <path
        d="M10 12 Q30 4, 60 12 Q90 20, 110 12"
        stroke="#c9a74e"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M10 12 Q30 20, 60 12 Q90 4, 110 12"
        stroke="#c9a74e"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="10" cy="12" r="3" fill="#c9a74e" opacity="0.8" />
      <circle cx="60" cy="12" r="4" fill="#c9a74e" opacity="0.9" />
      <circle cx="110" cy="12" r="3" fill="#c9a74e" opacity="0.8" />
      <circle cx="35" cy="8" r="2" fill="#8b1a1a" opacity="0.7" />
      <circle cx="85" cy="16" r="2" fill="#8b1a1a" opacity="0.7" />
    </svg>
  );
}

function InlineVineBorder() {
  return (
    <svg
      width="100%"
      height="40"
      viewBox="0 0 600 40"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
      className="w-full"
    >
      <path
        d="M0 20 Q50 8, 100 20 Q150 32, 200 20 Q250 8, 300 20 Q350 32, 400 20 Q450 8, 500 20 Q550 32, 600 20"
        stroke="#c9a74e"
        strokeWidth="1.5"
        fill="none"
      />
      {[50, 150, 250, 350, 450, 550].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={14} rx="4" ry="7" fill="#2d4a2d" opacity="0.65" transform={`rotate(-10 ${x} 14)`} />
          <circle cx={x + 8} cy={18} r="2" fill="#8b1a1a" opacity="0.6" />
        </g>
      ))}
      {[100, 200, 300, 400, 500].map((x) => (
        <circle key={x} cx={x} cy={20} r="2.5" fill="#c9a74e" opacity="0.7" />
      ))}
    </svg>
  );
}

function DropCapLetter({ letter, size = "text-9xl" }: { letter: string; size?: string }) {
  return (
    <span
      className={`float-left leading-none mr-2 font-serif font-bold text-[#c9a74e] ${size}`}
      style={{
        lineHeight: 0.75,
        textShadow: "2px 2px 0px rgba(139,26,26,0.3)",
        filter: "drop-shadow(0 0 8px rgba(201,167,78,0.4))",
      }}
    >
      {letter}
    </span>
  );
}

function ManuscriptFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative border-2 border-[#c9a74e] p-1 ${className}`}>
      <div className="absolute inset-[6px] border border-[#c9a74e]/40 pointer-events-none" />
      {/* Corner ornaments */}
      <div className="absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-[#c9a74e]" />
      <div className="absolute top-1 right-1 w-5 h-5 border-t-2 border-r-2 border-[#c9a74e]" />
      <div className="absolute bottom-1 left-1 w-5 h-5 border-b-2 border-l-2 border-[#c9a74e]" />
      <div className="absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-[#c9a74e]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [demoTab, setDemoTab] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView();

  const tabs = [
    { label: "Scriptorium", id: 0 },
    { label: "Illumination", id: 1 },
    { label: "Reliquary", id: 2 },
  ];

  const demoTabs = [
    { label: "Buttons", id: 0 },
    { label: "Cards", id: 1 },
    { label: "Inputs", id: 2 },
  ];

  const colors = [
    { name: "Rubrum", latin: "Deep Crimson", hex: "#8b1a1a", bg: "bg-[#8b1a1a]", text: "text-[#f0e6d0]" },
    { name: "Pergamenum", latin: "Parchment", hex: "#f0e6d0", bg: "bg-[#f0e6d0]", text: "text-[#3d2b1f]", border: true },
    { name: "Aurum", latin: "Illuminated Gold", hex: "#c9a74e", bg: "bg-[#c9a74e]", text: "text-[#3d2b1f]" },
    { name: "Viridis", latin: "Monastery Green", hex: "#2d4a2d", bg: "bg-[#2d4a2d]", text: "text-[#f0e6d0]" },
    { name: "Atramentum", latin: "Ink Brown", hex: "#3d2b1f", bg: "bg-[#3d2b1f]", text: "text-[#f0e6d0]" },
  ];

  const principles = [
    {
      type: "do",
      title: "Use parchment backgrounds",
      desc: "Warm off-white tones evoke aged vellum, creating the authentic manuscript reading experience.",
      marginalia: "Nota bene: the eye finds rest upon warm parchment.",
    },
    {
      type: "do",
      title: "Employ decorative drop caps",
      desc: "Oversized illuminated initials serve as visual anchors and signal the beginning of important passages.",
      marginalia: "Each capital letter a work of art unto itself.",
    },
    {
      type: "do",
      title: "Adorn with gold borders",
      desc: "Double-line gold borders frame content as a gilded frame elevates a painting to sacred status.",
      marginalia: "Gold signifies the divine, the eternal, the precious.",
    },
    {
      type: "dont",
      title: "Avoid sans-serif fonts",
      desc: "Gothic and serif typefaces belong to the manuscript tradition. Modernist typefaces destroy the sacred illusion.",
      marginalia: "No scribe ever wrote in Helvetica.",
    },
    {
      type: "dont",
      title: "No dark backgrounds",
      desc: "Manuscripts lived in candlelight, on warm parchment. Dark mode is a modern invention with no place here.",
      marginalia: "Darkness is for the margins, not the page.",
    },
    {
      type: "dont",
      title: "No pill-shaped elements",
      desc: "Rounded corners and pill buttons belong to digital UI. Manuscript elements have weight, presence, and sharp geometry.",
      marginalia: "A scribe's borders are straight and true.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0e6d0] text-[#3d2b1f] font-serif">
      {/* Parchment texture overlays */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #3d2b1f 0%, transparent 45%), radial-gradient(circle at 80% 70%, #8b1a1a 0%, transparent 40%), radial-gradient(circle at 50% 50%, #c9a74e 0%, transparent 60%)`,
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(61,43,31,0.3) 28px, rgba(61,43,31,0.3) 29px)`,
        }}
      />

      {/* ── NAVIGATION ── */}
      <nav
        className="sticky top-0 z-50 px-6 py-4 bg-[#f0e6d0] border-b-2 border-[#c9a74e]"
        style={{ boxShadow: "0 2px 0 0 rgba(201,167,78,0.3)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="24" height="24" fill="#f0e6d0" stroke="#c9a74e" strokeWidth="1.5" />
              <rect x="5" y="5" width="18" height="18" fill="none" stroke="#c9a74e" strokeWidth="0.5" />
              <text x="14" y="19" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#8b1a1a" fontFamily="serif">M</text>
            </svg>
            <span className="text-lg font-bold tracking-widest text-[#8b1a1a] uppercase">
              Scriptorium
            </span>
          </div>

          {/* Center: nav links */}
          <div className="hidden md:flex items-center gap-8">
            {["Codex", "Marginalia", "Treasury", "Colophon"].map((item) => (
              <span
                key={item}
                className="text-xs uppercase tracking-[0.25em] text-[#3d2b1f]/60 hover:text-[#8b1a1a] transition-colors duration-300 cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Right: StyleKit link */}
          <Link
            href="/"
            className="px-5 py-2 text-xs font-serif uppercase tracking-widest text-[#f0e6d0] bg-[#8b1a1a] border-2 border-[#c9a74e] hover:bg-[#8b1a1a]/90 transition-all duration-300"
            style={{ boxShadow: "2px 2px 0 rgba(61,43,31,0.4)" }}
          >
            StyleKit &rarr;
          </Link>
        </div>
        {/* Gold double-rule border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#c9a74e]/20" />
      </nav>

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-36 px-6 overflow-hidden">
        {/* Outer frame */}
        <div className="absolute inset-4 md:inset-8 border border-[#c9a74e]/30 pointer-events-none" />
        <div className="absolute inset-6 md:inset-10 border border-[#c9a74e]/15 pointer-events-none" />

        {/* Corner vine ornaments */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <VineCorner size={80} />
        </div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <VineCorner size={80} flip />
        </div>
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
          <VineCorner size={80} flipY />
        </div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
          <VineCorner size={80} flip flipY />
        </div>

        <div
          ref={heroRef}
          className="max-w-4xl mx-auto text-center relative z-10"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          {/* Anno Domini label */}
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#c9a74e]" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#c9a74e] font-serif">
              Anno Domini MMXXVI
            </span>
            <div className="h-px w-12 bg-[#c9a74e]" />
          </div>

          {/* Main title with drop cap */}
          <div className="mb-2">
            <h1 className="text-5xl md:text-7xl font-bold text-[#8b1a1a] uppercase tracking-[0.08em] leading-tight">
              <span
                className="text-[8rem] md:text-[12rem] leading-none text-[#c9a74e] block"
                style={{
                  textShadow: "3px 3px 0 rgba(139,26,26,0.25), 0 0 40px rgba(201,167,78,0.3)",
                  lineHeight: 0.8,
                  marginBottom: "0.1em",
                }}
              >
                I
              </span>
              lluminatus
            </h1>
          </div>

          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2d4a2d] uppercase tracking-[0.3em] mb-8">
            Codex Manuscriptus
          </h2>

          {/* Vine divider */}
          <div className="max-w-sm mx-auto mb-8">
            <InlineVineBorder />
          </div>

          <p className="text-base md:text-lg text-[#3d2b1f]/70 italic max-w-lg mx-auto leading-relaxed mb-10">
            In the beginning was the Word, and the Word was set down upon warm
            vellum with quill and mineral pigment, adorned with gold and
            devotion, illuminated for all who seek truth.
          </p>

          {/* CTA button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="group px-10 py-4 bg-[#8b1a1a] text-[#f0e6d0] text-sm uppercase tracking-[0.25em] border-2 border-[#c9a74e] font-serif transition-all duration-300 hover:bg-[#8b1a1a]/90"
              style={{ boxShadow: "3px 3px 0 rgba(61,43,31,0.5)" }}
            >
              <span className="group-hover:tracking-[0.35em] transition-all duration-300">
                Begin Reading
              </span>
            </button>
            <button className="px-10 py-4 bg-transparent text-[#8b1a1a] text-sm uppercase tracking-[0.25em] border-2 border-[#c9a74e] font-serif hover:bg-[#c9a74e]/10 transition-all duration-300">
              View Codex
            </button>
          </div>

          {/* Bottom vine ornament */}
          <div className="mt-12 flex justify-center">
            <GoldFlourish />
          </div>
        </div>
      </section>

      {/* ── COMPONENT DEMOS (Tab Switcher) ── */}
      <section className="py-20 px-6 bg-[#e8dcc8]/50">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a74e] mb-3">
                Liber Componentis
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] uppercase tracking-widest mb-4">
                Component Demonstrations
              </h2>
              <OrnamentalDivider />
              <p className="text-sm text-[#3d2b1f]/60 italic max-w-md mx-auto">
                Each element crafted as a monk would craft a capital — with patience, precision, and purpose.
              </p>
            </div>
          </RevealBlock>

          {/* Tab navigation */}
          <RevealBlock delay={0.1}>
            <div className="flex border-2 border-[#c9a74e] mb-0 bg-[#f0e6d0]" style={{ boxShadow: "3px 3px 0 rgba(61,43,31,0.3)" }}>
              {demoTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDemoTab(tab.id)}
                  className={`flex-1 py-3 text-xs uppercase tracking-[0.25em] font-serif border-r last:border-r-0 border-[#c9a74e]/40 transition-all duration-300 ${
                    demoTab === tab.id
                      ? "bg-[#8b1a1a] text-[#f0e6d0]"
                      : "text-[#3d2b1f]/60 hover:text-[#8b1a1a] hover:bg-[#c9a74e]/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content panel */}
          <RevealBlock delay={0.2}>
            <ManuscriptFrame className="bg-[#f0e6d0]">
              <div className="p-8 md:p-12 min-h-[280px]">
                {demoTab === 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a74e] mb-6">
                      Buttons — De Clavibus
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="group px-8 py-3.5 bg-[#8b1a1a] text-[#f0e6d0] text-xs uppercase tracking-[0.25em] font-serif border-2 border-[#c9a74e] transition-all duration-300 hover:bg-[#8b1a1a]/90"
                        style={{ boxShadow: "2px 2px 0 rgba(61,43,31,0.4)" }}
                      >
                        <span className="group-hover:tracking-[0.35em] transition-all duration-300">
                          Primarius
                        </span>
                      </button>
                      <button
                        className="group px-8 py-3.5 bg-[#2d4a2d] text-[#f0e6d0] text-xs uppercase tracking-[0.25em] font-serif border-2 border-[#c9a74e] transition-all duration-300 hover:bg-[#2d4a2d]/90"
                        style={{ boxShadow: "2px 2px 0 rgba(61,43,31,0.4)" }}
                      >
                        <span className="group-hover:tracking-[0.35em] transition-all duration-300">
                          Secundarius
                        </span>
                      </button>
                      <button className="px-8 py-3.5 bg-transparent text-[#8b1a1a] text-xs uppercase tracking-[0.25em] font-serif border-2 border-[#c9a74e] hover:bg-[#c9a74e]/15 transition-all duration-300">
                        Outline
                      </button>
                      <button className="px-6 py-3.5 text-[#8b1a1a] text-xs uppercase tracking-[0.25em] font-serif underline underline-offset-4 decoration-[#c9a74e] decoration-2 hover:text-[#c9a74e] transition-all duration-300">
                        Text Link
                      </button>
                      <button
                        className="px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-serif border-2 border-[#3d2b1f]/20 text-[#3d2b1f]/30 cursor-not-allowed"
                        disabled
                      >
                        Disabled
                      </button>
                    </div>
                    <div className="mt-8 pt-6 border-t border-[#c9a74e]/30">
                      <p className="text-xs text-[#3d2b1f]/50 italic">
                        Every button is a sealed decree — consequential, deliberate, and ornate.
                      </p>
                    </div>
                  </div>
                )}

                {demoTab === 1 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a74e] mb-6">
                      Cards — De Foliis
                    </p>
                    <div className="grid md:grid-cols-3 gap-5">
                      {[
                        {
                          letter: "S",
                          title: "Scriptorium",
                          body: "Where monks dedicated their lives to copying sacred texts by candlelight.",
                        },
                        {
                          letter: "H",
                          title: "Heraldry",
                          body: "Noble crests adorned with gold leaf, each symbol carrying centuries of meaning.",
                        },
                        {
                          letter: "C",
                          title: "Calligraphy",
                          body: "The art of beautiful writing — each quill stroke an act of meditation.",
                        },
                      ].map((card) => (
                        <div
                          key={card.title}
                          className="group p-5 bg-[#f0e6d0] border-2 border-[#c9a74e] hover:border-[#8b1a1a] transition-all duration-300 relative"
                          style={{ boxShadow: "2px 2px 0 rgba(61,43,31,0.3)" }}
                        >
                          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#c9a74e]/60 group-hover:border-[#8b1a1a]/60 transition-colors duration-300" />
                          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#c9a74e]/60 group-hover:border-[#8b1a1a]/60 transition-colors duration-300" />
                          <h3 className="text-xl font-bold text-[#8b1a1a] mb-2 uppercase tracking-wider leading-none">
                            <span className="text-4xl text-[#c9a74e] mr-1 float-left leading-none">
                              {card.letter}
                            </span>
                            {card.title.slice(1)}
                          </h3>
                          <p className="text-xs text-[#3d2b1f]/65 leading-relaxed clear-left">
                            {card.body}
                          </p>
                          <div className="mt-4 pt-3 border-t border-[#c9a74e]/30">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a74e] group-hover:text-[#8b1a1a] transition-colors duration-300">
                              Read Folio &rarr;
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {demoTab === 2 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a74e] mb-6">
                      Inputs — De Inscriptione
                    </p>
                    <div className="max-w-sm space-y-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.35em] text-[#8b1a1a] mb-2">
                          Scribe&apos;s Name
                        </label>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Enter thy name..."
                          className="w-full px-5 py-3.5 bg-[#f0e6d0] border-2 border-[#3d2b1f]/30 text-[#3d2b1f] placeholder-[#3d2b1f]/30 font-serif text-sm focus:border-[#c9a74e] focus:outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.35em] text-[#8b1a1a] mb-2">
                          Missive Address
                        </label>
                        <input
                          type="email"
                          placeholder="thy@scriptorium.com"
                          className="w-full px-5 py-3.5 bg-[#f0e6d0] border-2 border-[#3d2b1f]/30 text-[#3d2b1f] placeholder-[#3d2b1f]/30 font-serif text-sm focus:border-[#c9a74e] focus:outline-none transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.35em] text-[#8b1a1a] mb-2">
                          Inscription
                        </label>
                        <textarea
                          placeholder="Compose thy inscription..."
                          rows={3}
                          className="w-full px-5 py-3.5 bg-[#f0e6d0] border-2 border-[#3d2b1f]/30 text-[#3d2b1f] placeholder-[#3d2b1f]/30 font-serif text-sm focus:border-[#c9a74e] focus:outline-none transition-all duration-300 resize-none"
                        />
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <button
                          onClick={() => setIsChecked(!isChecked)}
                          className={`w-5 h-5 border-2 flex items-center justify-center transition-all duration-300 ${
                            isChecked
                              ? "bg-[#8b1a1a] border-[#c9a74e]"
                              : "bg-transparent border-[#3d2b1f]/40 group-hover:border-[#c9a74e]"
                          }`}
                        >
                          {isChecked && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="#c9a74e" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          )}
                        </button>
                        <span className="text-xs text-[#3d2b1f]/70 font-serif italic">
                          I vow to preserve these words faithfully
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </ManuscriptFrame>
          </RevealBlock>
        </div>
      </section>

      {/* ── COLOR PALETTE ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a74e] mb-3">
                Paletta Pigmentorum
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] uppercase tracking-widest mb-4">
                Color Palette
              </h2>
              <OrnamentalDivider />
              <p className="text-sm text-[#3d2b1f]/60 italic max-w-md mx-auto">
                Mineral pigments ground from lapis lazuli, malachite, vermillion, and gold leaf — each color bearing the weight of sacred tradition.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {colors.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.08}>
                <div
                  className="group relative overflow-hidden border-2 border-[#c9a74e]/60 hover:border-[#c9a74e] transition-all duration-300"
                  style={{ boxShadow: "2px 2px 0 rgba(61,43,31,0.2)" }}
                >
                  {/* Color swatch */}
                  <div
                    className={`${color.bg} h-28 relative flex items-center justify-center ${color.border ? "border-b border-[#c9a74e]/40" : ""}`}
                  >
                    {/* Corner ornaments on swatch */}
                    <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[#c9a74e]/50" />
                    <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-[#c9a74e]/50" />
                    <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-[#c9a74e]/50" />
                    <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[#c9a74e]/50" />
                    {/* Illuminated monogram */}
                    <span className={`text-3xl font-bold ${color.text} font-serif opacity-30 group-hover:opacity-60 transition-opacity duration-300`}>
                      {color.name.charAt(0)}
                    </span>
                  </div>
                  {/* Label */}
                  <div className="p-3 bg-[#f0e6d0]">
                    <p className="text-xs font-bold text-[#8b1a1a] uppercase tracking-wider">
                      {color.name}
                    </p>
                    <p className="text-[10px] text-[#3d2b1f]/60 italic mt-0.5">
                      {color.latin}
                    </p>
                    <p className="text-[10px] text-[#3d2b1f]/40 font-mono mt-1 uppercase">
                      {color.hex}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gold bar decoration */}
          <RevealBlock delay={0.3}>
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-6">
                <GoldFlourish />
                <span className="text-xs uppercase tracking-[0.4em] text-[#c9a74e]">
                  Colores Sacri
                </span>
                <GoldFlourish />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── TYPOGRAPHY ── */}
      <section className="py-20 px-6 bg-[#e8dcc8]/50">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a74e] mb-3">
                Ars Scriptoris
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] uppercase tracking-widest mb-4">
                Typography
              </h2>
              <OrnamentalDivider />
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Type scale */}
            <RevealBlock delay={0.1}>
              <ManuscriptFrame className="bg-[#f0e6d0]">
                <div className="p-8 space-y-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a74e] mb-2">
                      Titulus Magnus
                    </p>
                    <p className="text-5xl font-bold text-[#8b1a1a] uppercase tracking-[0.05em] leading-tight">
                      <DropCapLetter letter="H" size="text-7xl" />
                      eading
                    </p>
                    <div className="clear-both" />
                  </div>

                  <div className="border-t border-[#c9a74e]/30 pt-5">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a74e] mb-2">
                      Rubrica
                    </p>
                    <p className="text-2xl font-bold text-[#8b1a1a] tracking-wider uppercase">
                      Rubric Subheading
                    </p>
                  </div>

                  <div className="border-t border-[#c9a74e]/30 pt-5">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a74e] mb-2">
                      Corpus Textus
                    </p>
                    <p className="text-base text-[#3d2b1f]/80 leading-[1.9] italic">
                      The illuminated manuscripts of the medieval period
                      represent a pinnacle of human artistry, wherein every
                      line of text was also an act of devotion.
                    </p>
                  </div>

                  <div className="border-t border-[#c9a74e]/30 pt-5">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a74e] mb-2">
                      Marginalia
                    </p>
                    <p className="text-xs text-[#3d2b1f]/50 italic leading-relaxed">
                      A marginal note, written small in the manner of monks who annotated as they copied.
                    </p>
                  </div>
                </div>
              </ManuscriptFrame>
            </RevealBlock>

            {/* Right: Drop cap showcase and reading sample */}
            <RevealBlock delay={0.2}>
              <ManuscriptFrame className="bg-[#f0e6d0]">
                <div className="p-8">
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a74e] mb-6">
                    Lectio Exemplar
                  </p>

                  {/* Drop cap paragraph */}
                  <div className="mb-6">
                    <p className="text-sm text-[#3d2b1f]/80 leading-[1.9]">
                      <DropCapLetter letter="B" />
                      ehold the sacred art of illumination, wherein monks of
                      the Carolingian age devoted their lives to the
                      transcription and decoration of holy texts. Each page
                      a world entire, filled with vine-work borders and gold
                      initial letters that blazed like small suns upon the
                      parchment.
                    </p>
                    <div className="clear-both" />
                  </div>

                  <div className="border-t border-[#c9a74e]/30 pt-5">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[#c9a74e] mb-4">
                      Rubrication
                    </p>
                    <p className="text-sm leading-[1.9]">
                      <span className="text-[#8b1a1a] font-bold">Chapter the First:</span>
                      {" "}
                      <span className="text-[#3d2b1f]/75 italic">
                        On the preparation of vellum and the grinding of
                        pigments, that the scribe may begin his sacred labor
                        with materials of the highest quality.
                      </span>
                    </p>
                  </div>

                  {/* Font specimens */}
                  <div className="mt-6 border-t border-[#c9a74e]/30 pt-5 grid grid-cols-2 gap-3">
                    {[
                      { label: "Serif Regular", sample: "Aa Bb Cc" },
                      { label: "Serif Italic", sample: "Aa Bb Cc", italic: true },
                      { label: "Serif Bold", sample: "Aa Bb Cc", bold: true },
                      { label: "Tracking Wide", sample: "A  B  C", wide: true },
                    ].map((spec) => (
                      <div key={spec.label}>
                        <p className="text-[8px] uppercase tracking-[0.3em] text-[#c9a74e] mb-1">
                          {spec.label}
                        </p>
                        <p
                          className={`text-sm text-[#3d2b1f]/70 font-serif ${spec.italic ? "italic" : ""} ${spec.bold ? "font-bold" : ""} ${spec.wide ? "tracking-widest" : ""}`}
                        >
                          {spec.sample}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ManuscriptFrame>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── TABS SECTION ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a74e] mb-3">
                Tabulae Contentorum
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] uppercase tracking-widest mb-4">
                The Illuminated Codex
              </h2>
              <OrnamentalDivider />
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="border-2 border-[#c9a74e]" style={{ boxShadow: "4px 4px 0 rgba(61,43,31,0.3)" }}>
              {/* Tab bar */}
              <div className="flex border-b-2 border-[#c9a74e]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 text-xs uppercase tracking-[0.25em] font-serif border-r last:border-r-0 border-[#c9a74e]/40 transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-[#8b1a1a] text-[#f0e6d0] font-bold"
                        : "bg-[#f0e6d0] text-[#3d2b1f]/55 hover:text-[#8b1a1a] hover:bg-[#c9a74e]/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="bg-[#f0e6d0] p-8 md:p-12 min-h-[260px] relative">
                {/* Decorative vine in corner */}
                <div className="absolute bottom-4 right-4 opacity-20">
                  <VineCorner size={60} flip flipY />
                </div>

                {activeTab === 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#8b1a1a] uppercase tracking-wider mb-4">
                      <DropCapLetter letter="T" size="text-5xl" />
                      he Writing Chamber
                    </h3>
                    <div className="clear-both" />
                    <p className="text-sm text-[#3d2b1f]/70 leading-[1.9] italic max-w-prose mb-4">
                      Within these stone walls, by the light of tallow candles, the scribes labored
                      in profound silence. Each letter formed with care, each page a prayer made
                      visible through ink and vellum. The scriptorium was a place of both scholarship
                      and devotion, where the act of writing was itself a form of worship.
                    </p>
                    <p className="text-sm text-[#3d2b1f]/70 leading-[1.9] max-w-prose">
                      Here worked the <span className="text-[#8b1a1a] font-bold">copyist</span>, the{" "}
                      <span className="text-[#8b1a1a] font-bold">rubricator</span>, and the{" "}
                      <span className="text-[#8b1a1a] font-bold">illuminator</span> — each a master
                      of their sacred craft.
                    </p>
                  </div>
                )}

                {activeTab === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#8b1a1a] uppercase tracking-wider mb-4">
                      <DropCapLetter letter="A" size="text-5xl" />
                      rts of Illumination
                    </h3>
                    <div className="clear-both" />
                    <p className="text-sm text-[#3d2b1f]/70 leading-[1.9] italic max-w-prose mb-4">
                      Gold leaf was applied with a burnisher upon chalk ground, then polished
                      until it gleamed like the sun. Lapis lazuli was ground and mixed with gum arabic
                      to create the celestial blue that even today commands the highest prices at
                      auction. Vermillion from ground cinnabar gave the rubricated letters their
                      sacred crimson hue.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {["Gold Leaf", "Lapis Lazuli", "Vermillion", "Malachite", "Carbon Black"].map((pigment) => (
                        <span key={pigment} className="px-3 py-1 border border-[#c9a74e] text-[10px] uppercase tracking-[0.2em] text-[#8b1a1a]">
                          {pigment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold text-[#8b1a1a] uppercase tracking-wider mb-4">
                      <DropCapLetter letter="T" size="text-5xl" />
                      he Reliquary
                    </h3>
                    <div className="clear-both" />
                    <p className="text-sm text-[#3d2b1f]/70 leading-[1.9] italic max-w-prose mb-4">
                      Gold vessels and jeweled caskets hold the most precious manuscripts.
                      Bound in ivory and silver, locked behind iron grilles, these books were
                      objects of veneration as much as reading. Each artifact a testament to
                      the belief that beauty and meaning are inseparable, that the vessel
                      must honor the wisdom it contains.
                    </p>
                    <div className="p-4 border-l-4 border-[#c9a74e] bg-[#c9a74e]/10 mt-4">
                      <p className="text-xs text-[#3d2b1f]/60 italic leading-relaxed">
                        &ldquo;In the beginning was the Word, and the Word was
                        illuminated with gold, that all who looked upon it
                        might understand its sacred nature.&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── DESIGN PRINCIPLES ── */}
      <section className="py-20 px-6 bg-[#e8dcc8]/50">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a74e] mb-3">
                Regulae Artis
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] uppercase tracking-widest mb-4">
                Design Principles
              </h2>
              <OrnamentalDivider />
              <p className="text-sm text-[#3d2b1f]/60 italic max-w-md mx-auto">
                The rules of the scriptorium, handed down from master to apprentice, preserved across centuries.
              </p>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle, i) => (
              <RevealBlock key={i} delay={i * 0.07}>
                <div
                  className={`group relative p-6 border-2 transition-all duration-300 ${
                    principle.type === "do"
                      ? "bg-[#f0e6d0] border-[#2d4a2d] hover:border-[#c9a74e]"
                      : "bg-[#f0e6d0] border-[#8b1a1a]/40 hover:border-[#8b1a1a]"
                  }`}
                  style={{ boxShadow: "2px 2px 0 rgba(61,43,31,0.2)" }}
                >
                  {/* Corner ornaments */}
                  <div className={`absolute top-2 left-2 w-3 h-3 border-t border-l ${principle.type === "do" ? "border-[#2d4a2d]/60" : "border-[#8b1a1a]/40"}`} />
                  <div className={`absolute top-2 right-2 w-3 h-3 border-t border-r ${principle.type === "do" ? "border-[#2d4a2d]/60" : "border-[#8b1a1a]/40"}`} />

                  {/* Do / Don't badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 mb-4 text-[9px] uppercase tracking-[0.35em] font-bold border ${
                      principle.type === "do"
                        ? "bg-[#2d4a2d]/10 border-[#2d4a2d]/40 text-[#2d4a2d]"
                        : "bg-[#8b1a1a]/10 border-[#8b1a1a]/30 text-[#8b1a1a]"
                    }`}
                  >
                    {principle.type === "do" ? (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#2d4a2d" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 1L7 7M7 1L1 7" stroke="#8b1a1a" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                    {principle.type === "do" ? "Observa" : "Cave"}
                  </div>

                  <h3 className="text-sm font-bold text-[#3d2b1f] uppercase tracking-wider mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-[#3d2b1f]/65 leading-relaxed mb-4">
                    {principle.desc}
                  </p>

                  {/* Marginalia annotation */}
                  <div className="border-t border-[#c9a74e]/30 pt-3">
                    <p className="text-[10px] text-[#3d2b1f]/40 italic leading-relaxed">
                      <span className="text-[#c9a74e]">&#10022;</span>{" "}
                      {principle.marginalia}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANUSCRIPT PAGE SHOWCASE ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a74e] mb-3">
                Pagina Exemplar
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] uppercase tracking-widest mb-4">
                Manuscript Page
              </h2>
              <OrnamentalDivider />
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div
              className="relative bg-[#f0e6d0] border-2 border-[#c9a74e] p-1"
              style={{ boxShadow: "6px 6px 0 rgba(61,43,31,0.3), 10px 10px 0 rgba(61,43,31,0.15)" }}
            >
              {/* Outer double border */}
              <div className="absolute inset-[6px] border border-[#c9a74e]/30 pointer-events-none" />

              {/* Top vine border */}
              <div className="p-2 pb-0">
                <InlineVineBorder />
              </div>

              <div className="p-8 md:p-14">
                {/* Page header with vine corners */}
                <div className="relative mb-8">
                  <div className="absolute top-0 left-0">
                    <VineCorner size={50} />
                  </div>
                  <div className="absolute top-0 right-0">
                    <VineCorner size={50} flip />
                  </div>
                  <div className="text-center pt-8 pb-4">
                    <p className="text-[10px] uppercase tracking-[0.6em] text-[#c9a74e] mb-2">
                      Prologus
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#8b1a1a] uppercase tracking-[0.1em]">
                      On the Sacred Art of Writing
                    </h3>
                    <div className="mt-4 max-w-xs mx-auto">
                      <InlineVineBorder />
                    </div>
                  </div>
                </div>

                {/* Two-column manuscript layout */}
                <div className="md:columns-2 md:gap-10 text-sm text-[#3d2b1f]/75 leading-[1.95] space-y-4">
                  <p>
                    <DropCapLetter letter="I" size="text-8xl" />
                    n those days, the monastery at Lindisfarne kept the
                    light of learning alive through the darkest centuries.
                    The monks rose before dawn to take up their quills,
                    and by the time the sun crested the hills, they had
                    already produced pages of breathtaking beauty.
                  </p>
                  <div className="clear-both" />
                  <p>
                    The ink was made of oak galls, iron sulfate, and gum
                    arabic — a recipe passed down through generations
                    without alteration. The gold leaf was beaten to a
                    thinness that defied comprehension, then laid upon
                    gesso grounds that had been burnished smooth as glass.
                  </p>
                  <p>
                    <span className="text-[#8b1a1a] font-bold">
                      Every capital letter was an entire world:
                    </span>{" "}
                    within its curves and ascenders lived dragons and
                    serpents, vines and flowers, the faces of saints and
                    the geometries of heaven. A single initial might take
                    a skilled monk an entire week to complete.
                  </p>
                  <p className="italic text-[#3d2b1f]/55">
                    These were not decorations superimposed upon meaning
                    — they were meaning itself, made visible, made
                    permanent, made golden.
                  </p>
                </div>

                {/* Decorated closing */}
                <div className="mt-10 text-center">
                  <div className="inline-flex items-center gap-4">
                    <div className="h-px w-16 bg-[#c9a74e]/50" />
                    <GoldFlourish />
                    <div className="h-px w-16 bg-[#c9a74e]/50" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a74e] mt-3">
                    Finis Capitis Primi
                  </p>
                </div>

                {/* Bottom vine corners */}
                <div className="relative mt-6">
                  <div className="absolute bottom-0 left-0">
                    <VineCorner size={50} flipY />
                  </div>
                  <div className="absolute bottom-0 right-0">
                    <VineCorner size={50} flip flipY />
                  </div>
                  <div className="h-8" />
                </div>
              </div>

              {/* Bottom vine border */}
              <div className="p-2 pt-0">
                <InlineVineBorder />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── STYLE ATTRIBUTES ── */}
      <section className="py-20 px-6 bg-[#e8dcc8]/50">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a74e] mb-3">
                Attributa Styli
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] uppercase tracking-widest mb-4">
                Style Attributes
              </h2>
              <OrnamentalDivider />
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                letter: "F",
                title: "Font System",
                items: ["Serif throughout", "No sans-serif faces", "Bold for headings", "Italic for body", "Small caps for labels"],
                color: "#8b1a1a",
              },
              {
                letter: "B",
                title: "Border Language",
                items: ["Double gold lines", "Corner ornaments", "Vine motifs", "Diamond dividers", "Frame within frame"],
                color: "#c9a74e",
              },
              {
                letter: "S",
                title: "Spatial Rhythm",
                items: ["Generous line-height", "Wide letter spacing", "Centered layouts", "Deliberate margins", "Breathing room"],
                color: "#2d4a2d",
              },
            ].map((attr, i) => (
              <RevealBlock key={attr.title} delay={i * 0.1}>
                <div
                  className="group bg-[#f0e6d0] border-2 border-[#c9a74e] p-6 hover:border-[#8b1a1a] transition-all duration-300 relative"
                  style={{ boxShadow: "2px 2px 0 rgba(61,43,31,0.25)" }}
                >
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#c9a74e]/50 group-hover:border-[#8b1a1a]/50 transition-colors duration-300" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#c9a74e]/50 group-hover:border-[#8b1a1a]/50 transition-colors duration-300" />

                  <div
                    className="text-5xl font-bold font-serif mb-4 leading-none"
                    style={{ color: attr.color }}
                  >
                    {attr.letter}
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-[#8b1a1a] font-bold mb-4">
                    {attr.title}
                  </h3>
                  <ul className="space-y-2">
                    {attr.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#3d2b1f]/65 leading-relaxed">
                        <span className="text-[#c9a74e] mt-0.5 shrink-0">&#10022;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER (COLOPHON) ── */}
      <footer className="relative py-16 px-6 border-t-2 border-[#c9a74e]">
        {/* Top vine border */}
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <InlineVineBorder />
          </div>

          {/* Vine corner ornaments */}
          <div className="flex justify-between mb-8">
            <VineCorner size={50} />
            <VineCorner size={50} flip />
          </div>

          {/* Colophon content */}
          <div className="text-center">
            {/* Flourish row */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <GoldFlourish />
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <rect x="4" y="4" width="40" height="40" fill="#f0e6d0" stroke="#c9a74e" strokeWidth="1.5" />
                <rect x="8" y="8" width="32" height="32" fill="none" stroke="#c9a74e" strokeWidth="0.5" />
                <text x="24" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#8b1a1a" fontFamily="serif">M</text>
              </svg>
              <GoldFlourish />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-[#8b1a1a] uppercase tracking-[0.15em] mb-4">
              Medieval Manuscript
            </h3>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a74e] mb-6">
              Codex Manuscriptus Illustratus
            </p>

            {/* Colophon text */}
            <div className="max-w-lg mx-auto">
              <OrnamentalDivider />
              <p className="text-sm text-[#3d2b1f]/60 italic leading-[1.85] mb-3">
                This work was completed in the scriptorium of StyleKit, in
                the Year of Our Lord MMXXVI, by the hand of devoted artisans
                who labored to preserve the sacred tradition of illuminated
                manuscripts for the digital age.
              </p>
              <p className="text-xs text-[#3d2b1f]/40 italic">
                Hoc opus perfectum est. Deo gratias.
              </p>
              <OrnamentalDivider />
            </div>

            {/* Navigation links */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
              <Link
                href="/"
                className="text-[10px] uppercase tracking-[0.35em] text-[#8b1a1a] hover:text-[#c9a74e] transition-colors duration-300"
              >
                StyleKit &rarr;
              </Link>
              <span className="text-[#c9a74e]/40">&#10022;</span>
              <Link
                href="/styles"
                className="text-[10px] uppercase tracking-[0.35em] text-[#3d2b1f]/50 hover:text-[#8b1a1a] transition-colors duration-300"
              >
                All Styles
              </Link>
              <span className="text-[#c9a74e]/40">&#10022;</span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#3d2b1f]/30">
                Anno MMXXVI
              </span>
            </div>
          </div>

          {/* Bottom vine corner ornaments */}
          <div className="flex justify-between mt-8">
            <VineCorner size={50} flipY />
            <VineCorner size={50} flip flipY />
          </div>

          {/* Bottom vine line */}
          <div className="mt-6">
            <InlineVineBorder />
          </div>
        </div>
      </footer>
    </div>
  );
}
