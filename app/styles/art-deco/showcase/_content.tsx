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

// Art Deco corner decoration
function DecoCorners({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" }[size];
  return (
    <>
      <div className={`absolute top-0 left-0 ${s} border-t-2 border-l-2 border-yellow-500/70 group-hover:border-yellow-400 transition-colors duration-500`} />
      <div className={`absolute top-0 right-0 ${s} border-t-2 border-r-2 border-yellow-500/70 group-hover:border-yellow-400 transition-colors duration-500`} />
      <div className={`absolute bottom-0 left-0 ${s} border-b-2 border-l-2 border-yellow-500/70 group-hover:border-yellow-400 transition-colors duration-500`} />
      <div className={`absolute bottom-0 right-0 ${s} border-b-2 border-r-2 border-yellow-500/70 group-hover:border-yellow-400 transition-colors duration-500`} />
    </>
  );
}

// Art Deco decorative divider
function DecoDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-yellow-500/60" />
      <span className="text-yellow-500 text-xs">◆</span>
      <div className="h-px w-6 bg-yellow-500/60" />
      <span className="text-yellow-400 text-base">◈</span>
      <div className="h-px w-6 bg-yellow-500/60" />
      <span className="text-yellow-500 text-xs">◆</span>
      <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-yellow-500/60" />
    </div>
  );
}

// Section header
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <RevealBlock className="text-center mb-12">
      <p className="text-xs font-serif text-yellow-600 uppercase tracking-[0.4em] mb-3">◄ {subtitle} ►</p>
      <h2 className="text-3xl md:text-4xl font-serif text-yellow-500 tracking-[0.25em] uppercase mb-4">
        {title}
      </h2>
      <DecoDivider />
    </RevealBlock>
  );
}

// Sunburst SVG decoration
function Sunburst({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={100 + 95 * Math.cos((i * Math.PI * 2) / 24)}
          y2={100 + 95 * Math.sin((i * Math.PI * 2) / 24)}
          stroke="#d4af37"
          strokeWidth={i % 2 === 0 ? "1.5" : "0.5"}
          strokeOpacity="0.4"
        />
      ))}
      <circle cx="100" cy="100" r="8" fill="#d4af37" fillOpacity="0.3" />
      <circle cx="100" cy="100" r="4" fill="#d4af37" fillOpacity="0.6" />
    </svg>
  );
}

export default function ArtDecoShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(72);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const tabs = ["Architecture", "Jewelry", "Fashion"];

  const tabContent = [
    {
      heading: "Architectural Marvels",
      body: "From the Chrysler Building to the Empire State, Art Deco architecture defines the golden age of American design with bold geometric forms and ornate stepped crowns.",
    },
    {
      heading: "Precious Adornments",
      body: "Art Deco jewelry features bold geometric shapes, vibrant gemstones, and the lavish use of platinum. Each piece is a wearable sculpture from the Jazz Age.",
    },
    {
      heading: "Haute Couture",
      body: "The 1920s brought revolutionary changes to fashion — dropped waistlines, geometric beading, bias-cut silhouettes, and luxurious fabrics that moved like liquid gold.",
    },
  ];

  const accordionItems = [
    {
      title: "What defines Art Deco?",
      content:
        "Art Deco is characterized by rich colors, bold geometric forms, and lavish ornamentation. It represents luxury, glamour, exuberance, and faith in social and technological progress.",
    },
    {
      title: "Historical origins",
      content:
        "Emerging in France before World War I, Art Deco flourished internationally in the 1920s and 1930s, influencing architecture, visual arts, fashion, and industrial design.",
    },
    {
      title: "Key design elements",
      content:
        "Symmetrical geometric patterns, stepped forms, chevron motifs, sunburst rays, and the use of expensive materials like jade, ivory, and lacquer define the style.",
    },
  ];

  const paletteColors = [
    { name: "Gold", hex: "#d4af37", light: false },
    { name: "Deep Black", hex: "#0d0d0d", light: false },
    { name: "Dark Navy", hex: "#1a1a2e", light: false },
    { name: "Navy", hex: "#2d2d44", light: false },
    { name: "Bronze", hex: "#c9a227", light: false },
    { name: "Deep Teal", hex: "#1a4a4a", light: false },
    { name: "Ivory", hex: "#f5f0e8", light: true },
    { name: "Cream", hex: "#f5f5dc", light: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d0d] via-[#1a1a2e] to-[#0d0d0d] text-gray-300 relative overflow-hidden">
      {/* Global style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&display=swap');
        .font-art-deco { font-family: 'Playfair Display', Georgia, serif; }
        .gold-shimmer {
          background: linear-gradient(135deg, #c9a84c 0%, #f5e066 40%, #c9a84c 60%, #d4af37 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gold-shimmer-hover {
          background: linear-gradient(135deg, #c9a84c 0%, #f5e066 40%, #c9a84c 60%, #d4af37 100%);
          background-size: 200% auto;
          transition: background-position 0.8s ease;
        }
        .gold-shimmer-hover:hover {
          background-position: right center;
        }
        .deco-bg-pattern {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 28px,
            rgba(212,175,55,0.04) 28px,
            rgba(212,175,55,0.04) 29px
          );
        }
        .chevron-border {
          border-image: repeating-linear-gradient(
            90deg,
            #d4af37 0px,
            #d4af37 4px,
            transparent 4px,
            transparent 8px
          ) 1;
        }
      `}</style>

      {/* Fixed background radial sunburst */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <Sunburst className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-20" />
        <div className="deco-bg-pattern absolute inset-0 opacity-100" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — NAVIGATION
      ═══════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-yellow-600/30 backdrop-blur-md bg-[#0d0d0d]/80">
        {/* Top geometric band */}
        <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Back link */}
          <Link
            href="/styles/art-deco"
            className="group flex items-center gap-2 text-yellow-500/80 hover:text-yellow-400 transition-colors duration-300"
          >
            <span className="text-xs group-hover:-translate-x-1 transition-transform duration-300 inline-block">◄</span>
            <span className="font-serif text-xs uppercase tracking-[0.25em]">Back to Docs</span>
          </Link>

          {/* Center logo */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-yellow-600/40">
              <span className="text-xs">▲</span>
              <span className="text-xs">▲</span>
              <span className="text-xs">▲</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-600/60 text-sm">◆</span>
              <span className="font-serif text-lg text-yellow-500 tracking-[0.4em] uppercase">Art Deco</span>
              <span className="text-yellow-600/60 text-sm">◆</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-yellow-600/40">
              <span className="text-xs">▼</span>
              <span className="text-xs">▼</span>
              <span className="text-xs">▼</span>
            </div>
          </div>

          {/* All styles link */}
          <Link
            href="/styles"
            className="px-5 py-2 border border-yellow-500/60 text-yellow-500 text-xs font-serif uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-[#0d0d0d] transition-all duration-500"
          >
            All Styles
          </Link>
        </div>
        {/* Bottom geometric band */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent" />
      </nav>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-36 pb-28 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Stepped geometric frame */}
          <div
            className="relative inline-block mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease 0.1s",
            }}
          >
            {/* Outer border */}
            <div className="border border-yellow-600/30 p-3">
              {/* Inner border */}
              <div className="border border-yellow-500/50 p-3">
                {/* Innermost border */}
                <div className="border border-yellow-600/20 px-12 py-2">
                  <p className="text-xs font-serif text-yellow-600/80 uppercase tracking-[0.5em]">
                    ◈ The Golden Age ◈
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main title */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.9s ease 0.25s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <h1 className="text-7xl md:text-9xl font-serif font-bold uppercase tracking-[0.15em] mb-2 leading-none">
              <span className="gold-shimmer">ART</span>
            </h1>
            <h1 className="text-7xl md:text-9xl font-serif font-bold uppercase tracking-[0.15em] mb-6 leading-none">
              <span className="gold-shimmer">DECO</span>
            </h1>
          </div>

          {/* Sunburst ornament */}
          <div
            className="flex items-center justify-center gap-6 mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
          >
            <div className="flex-1 max-w-40 h-px bg-gradient-to-r from-transparent to-yellow-500/70" />
            <div className="flex items-center gap-2 text-yellow-500/60">
              <span className="text-sm">◄</span>
              <span className="text-yellow-500 text-xl">◆</span>
              <span className="text-sm">►</span>
            </div>
            <div className="flex-1 max-w-40 h-px bg-gradient-to-l from-transparent to-yellow-500/70" />
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.9s ease 0.65s",
            }}
          >
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-serif tracking-wider leading-relaxed">
              1920年代的奢华与几何之美 — Gatsby-era glamour reborn in pixels.
              Symmetry, gold, and bold geometry define an era of exquisite excess.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button className="group relative px-14 py-5 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700 bg-[length:200%_auto] text-[#0d0d0d] font-serif font-bold uppercase tracking-[0.3em] border border-yellow-400 shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:bg-right hover:-translate-y-0.5 transition-all duration-700">
                <span className="flex items-center gap-3">
                  <span className="group-hover:rotate-45 transition-transform duration-500 inline-block">◆</span>
                  Discover
                  <span className="group-hover:-rotate-45 transition-transform duration-500 inline-block">◆</span>
                </span>
              </button>
              <button className="px-14 py-5 bg-transparent border-2 border-yellow-500/70 text-yellow-500 font-serif uppercase tracking-[0.3em] hover:bg-yellow-500/10 hover:border-yellow-400 hover:-translate-y-0.5 transition-all duration-500">
                ▷ Explore
              </button>
            </div>
          </div>

          {/* Bottom decorative row */}
          <div
            className="mt-16 flex items-center justify-center gap-3"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease 0.9s",
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-px bg-yellow-500/40"
                style={{ width: i === 3 ? "48px" : i === 1 || i === 5 ? "24px" : "12px" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — COMPONENT DEMOS: BUTTONS
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Buttons" subtitle="Golden Radiance" />

          <RevealBlock delay={0.1}>
            <div className="relative p-10 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 mb-6">
              <DecoCorners size="lg" />
              <p className="text-center text-xs font-serif text-yellow-600/70 uppercase tracking-[0.35em] mb-8">
                ◈──────◈ Variants ◈──────◈
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                {/* Primary */}
                <button className="group px-10 py-4 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700 bg-[length:200%_auto] text-[#0d0d0d] font-serif font-bold uppercase tracking-[0.25em] border border-yellow-400/70 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] hover:bg-right hover:-translate-y-0.5 transition-all duration-700">
                  Primary
                </button>
                {/* Outline */}
                <button className="px-10 py-4 bg-transparent border-2 border-yellow-500/70 text-yellow-500 font-serif uppercase tracking-[0.25em] hover:bg-yellow-500 hover:text-[#0d0d0d] hover:-translate-y-0.5 transition-all duration-500">
                  Outline
                </button>
                {/* Secondary */}
                <button className="px-10 py-4 bg-[#1a1a2e] border border-yellow-600/30 text-yellow-400 font-serif uppercase tracking-[0.25em] hover:border-yellow-500 hover:text-yellow-300 transition-all duration-500">
                  Secondary
                </button>
                {/* Ghost */}
                <button className="px-10 py-4 bg-transparent text-yellow-500/60 font-serif uppercase tracking-[0.25em] hover:text-yellow-400 hover:underline underline-offset-4 transition-all duration-300">
                  Ghost
                </button>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="relative p-10 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30">
              <DecoCorners size="md" />
              <p className="text-center text-xs font-serif text-yellow-600/70 uppercase tracking-[0.35em] mb-8">
                ◈──────◈ Sizes ◈──────◈
              </p>
              <div className="flex flex-wrap justify-center gap-5 items-center">
                <button className="px-6 py-2.5 text-sm bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700 text-[#0d0d0d] font-serif font-bold uppercase tracking-[0.2em] shadow-[0_0_12px_rgba(212,175,55,0.25)] hover:shadow-[0_0_22px_rgba(212,175,55,0.5)] transition-all duration-500">
                  Small
                </button>
                <button className="px-10 py-4 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700 text-[#0d0d0d] font-serif font-bold uppercase tracking-[0.25em] shadow-[0_0_18px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-500">
                  Medium
                </button>
                <button className="px-14 py-5 text-lg bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700 text-[#0d0d0d] font-serif font-bold uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-500">
                  Large
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — COMPONENT DEMOS: CARDS
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Cards" subtitle="Stepped Geometric Frames" />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                symbol: "◆",
                title: "LUXURY",
                subtitle: "Gold Standard",
                desc: "Timeless elegance in every detail. The gold standard of design, refined to its purest geometric form.",
                delay: 0.1,
              },
              {
                symbol: "◈",
                title: "PRESTIGE",
                subtitle: "Royal Craft",
                desc: "Royal sophistication redefined for the modern era, drawing from the grandeur of 1920s haute couture.",
                delay: 0.2,
              },
              {
                symbol: "◇",
                title: "REFINED",
                subtitle: "Pure Form",
                desc: "Exquisite craftsmanship distilled into pure geometric language, where every line serves beauty.",
                delay: 0.3,
              },
            ].map((card) => (
              <RevealBlock key={card.title} delay={card.delay}>
                <div className="group relative p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 hover:border-yellow-500/70 hover:shadow-[0_0_35px_rgba(212,175,55,0.12)] transition-all duration-700 cursor-pointer">
                  {/* Expanding corner decorations on hover */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-600/50 group-hover:border-yellow-400 group-hover:w-10 group-hover:h-10 transition-all duration-500" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-600/50 group-hover:border-yellow-400 group-hover:w-10 group-hover:h-10 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-600/50 group-hover:border-yellow-400 group-hover:w-10 group-hover:h-10 transition-all duration-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-600/50 group-hover:border-yellow-400 group-hover:w-10 group-hover:h-10 transition-all duration-500" />

                  <div className="flex flex-col items-center text-center relative z-10">
                    {/* Diamond icon */}
                    <div className="w-16 h-16 flex items-center justify-center mb-5 bg-gradient-to-br from-yellow-700/20 to-yellow-500/10 border border-yellow-600/30 group-hover:border-yellow-500/60 transition-all duration-500">
                      <span className="text-3xl text-yellow-500/80 group-hover:text-yellow-400 group-hover:scale-110 transition-all duration-500 inline-block">
                        {card.symbol}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif text-yellow-500 tracking-[0.3em] uppercase mb-1 group-hover:text-yellow-300 transition-colors duration-500">
                      {card.title}
                    </h3>
                    <p className="text-xs text-yellow-600/60 uppercase tracking-[0.25em] mb-4 font-serif">
                      {card.subtitle}
                    </p>

                    {/* Inner rule */}
                    <div className="w-10 h-px bg-yellow-500/40 group-hover:w-20 transition-all duration-700 mb-4" />

                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                      {card.desc}
                    </p>

                    <button className="mt-5 text-xs font-serif text-yellow-600/60 uppercase tracking-[0.3em] hover:text-yellow-400 transition-colors duration-300">
                      Learn More ►
                    </button>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — COMPONENT DEMOS: INPUTS & FORM
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Form" subtitle="Elegant Inputs" />

          <RevealBlock delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="relative p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30">
                <DecoCorners size="md" />
                <p className="text-center text-xs font-serif text-yellow-600/70 uppercase tracking-[0.35em] mb-6">
                  ◈──── Input Fields ────◈
                </p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-serif text-yellow-500/80 uppercase tracking-[0.25em] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      className="w-full px-5 py-3 bg-[#0d0d0d] border border-yellow-600/40 text-yellow-100 placeholder-yellow-700/50 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_18px_rgba(212,175,55,0.18)] focus:outline-none transition-all duration-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif text-yellow-500/80 uppercase tracking-[0.25em] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email..."
                      className="w-full px-5 py-3 bg-[#0d0d0d] border border-yellow-600/40 text-yellow-100 placeholder-yellow-700/50 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_18px_rgba(212,175,55,0.18)] focus:outline-none transition-all duration-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-serif text-yellow-500/80 uppercase tracking-[0.25em] mb-2">
                      Select
                    </label>
                    <select className="w-full px-5 py-3 bg-[#0d0d0d] border border-yellow-600/40 text-yellow-300/70 font-serif tracking-wider focus:border-yellow-500 focus:outline-none transition-all duration-500 appearance-none cursor-pointer">
                      <option value="">Choose a category...</option>
                      <option value="arch">Architecture</option>
                      <option value="art">Fine Art</option>
                      <option value="fashion">Fashion</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="relative p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30">
                <DecoCorners size="md" />
                <h3 className="text-xl font-serif text-yellow-500 text-center tracking-[0.35em] uppercase mb-1">
                  Contact
                </h3>
                <DecoDivider className="mb-6" />
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name..."
                    className="w-full px-5 py-3 bg-[#0d0d0d] border border-yellow-600/40 text-yellow-100 placeholder-yellow-700/50 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_18px_rgba(212,175,55,0.18)] focus:outline-none transition-all duration-500"
                  />
                  <input
                    type="email"
                    placeholder="Your email..."
                    className="w-full px-5 py-3 bg-[#0d0d0d] border border-yellow-600/40 text-yellow-100 placeholder-yellow-700/50 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_18px_rgba(212,175,55,0.18)] focus:outline-none transition-all duration-500"
                  />
                  <textarea
                    rows={3}
                    placeholder="Your message..."
                    className="w-full px-5 py-3 bg-[#0d0d0d] border border-yellow-600/40 text-yellow-100 placeholder-yellow-700/50 font-serif tracking-wider focus:border-yellow-500 focus:shadow-[0_0_18px_rgba(212,175,55,0.18)] focus:outline-none transition-all duration-500 resize-none"
                  />
                  <button className="w-full py-4 bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700 bg-[length:200%_auto] text-[#0d0d0d] font-serif font-bold uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:bg-right transition-all duration-700">
                    Submit ◆
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — COLOR PALETTE
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Color Palette" subtitle="Luxurious Hues" />

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {paletteColors.map((color, i) => (
                <div
                  key={color.name}
                  className="group cursor-pointer"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div
                    className="h-24 md:h-32 w-full relative overflow-hidden border border-yellow-600/20 group-hover:border-yellow-500/60 transition-all duration-500 group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                    style={{ backgroundColor: color.hex }}
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    {/* Hex label on hover */}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span
                        className="text-xs font-mono px-2 py-0.5 font-bold"
                        style={{ color: color.light ? "#0d0d0d" : "#d4af37" }}
                      >
                        {color.hex}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-serif text-yellow-500/70 uppercase tracking-[0.2em]">
                      {color.name}
                    </p>
                    <p className="text-xs text-gray-600 font-mono mt-0.5">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gold gradient showcase */}
          <RevealBlock delay={0.2}>
            <div className="relative p-8 border border-yellow-600/30 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e]">
              <DecoCorners size="md" />
              <p className="text-center text-xs font-serif text-yellow-600/70 uppercase tracking-[0.35em] mb-6">
                ◈──── Gold Leaf Shimmer ────◈
              </p>
              <div
                className="h-16 w-full"
                style={{
                  background: "linear-gradient(135deg, #c9a84c 0%, #f5e066 25%, #d4af37 50%, #f5e066 75%, #c9a84c 100%)",
                }}
              />
              <div className="mt-4 flex justify-between text-xs font-mono text-yellow-600/50">
                <span>#c9a84c</span>
                <span>#f5e066</span>
                <span>#d4af37</span>
                <span>#f5e066</span>
                <span>#c9a84c</span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — DESIGN RULES (DO / DON'T)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Design Rules" subtitle="The Art Deco Doctrine" />

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO list */}
            <RevealBlock delay={0.1}>
              <div className="relative p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 h-full">
                <DecoCorners size="md" />
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-yellow-500 text-lg">◆</span>
                  <h3 className="font-serif text-yellow-500 uppercase tracking-[0.3em] text-sm">
                    The Decalogues
                  </h3>
                  <span className="text-yellow-500 text-lg">◆</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "使用金色和深色的高对比配色",
                    "添加几何对称图案和放射状线条",
                    "使用优雅的衬线字体",
                    "添加金色边框和装饰线",
                    "保持对称和平衡的布局",
                    "使用细腻的线条装饰",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-0.5 flex-shrink-0">▸</span>
                      <span className="text-gray-400 text-sm font-serif tracking-wide leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T list */}
            <RevealBlock delay={0.2}>
              <div className="relative p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 h-full">
                <DecoCorners size="md" />
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-red-500/60 text-lg">◇</span>
                  <h3 className="font-serif text-red-400/80 uppercase tracking-[0.3em] text-sm">
                    Forbidden Paths
                  </h3>
                  <span className="text-red-500/60 text-lg">◇</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "禁止使用过于鲜艳的配色",
                    "禁止使用不对称的混乱布局",
                    "禁止使用过于现代的无衬线字体",
                    "禁止省略装饰性元素",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-400/70 mt-0.5 flex-shrink-0">✕</span>
                      <span className="text-gray-500 text-sm font-serif tracking-wide leading-relaxed line-through decoration-red-400/40">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8 — TYPOGRAPHY
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Typography" subtitle="Tall Serif Letterforms" />

          <RevealBlock delay={0.1}>
            <div className="relative p-10 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 mb-6">
              <DecoCorners size="lg" />
              <div className="text-center space-y-6">
                <div>
                  <p className="text-xs font-serif text-yellow-600/50 uppercase tracking-[0.4em] mb-2">Display / 96px</p>
                  <h2 className="text-7xl md:text-9xl font-serif font-bold text-yellow-500/80 tracking-[0.1em] leading-none">
                    Aa
                  </h2>
                </div>
                <DecoDivider />
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-serif text-yellow-600/50 uppercase tracking-[0.3em] mb-2">Heading / 48px</p>
                    <p className="text-5xl font-serif text-yellow-500/70 tracking-[0.15em]">Gold</p>
                  </div>
                  <div>
                    <p className="text-xs font-serif text-yellow-600/50 uppercase tracking-[0.3em] mb-2">Subheading / 24px</p>
                    <p className="text-2xl font-serif text-yellow-400/60 tracking-[0.2em] uppercase">Luxury</p>
                  </div>
                  <div>
                    <p className="text-xs font-serif text-yellow-600/50 uppercase tracking-[0.3em] mb-2">Body / 16px</p>
                    <p className="text-base font-serif text-gray-400 tracking-wider leading-relaxed">
                      The golden ratio of elegance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Alphabet showcase */}
          <RevealBlock delay={0.2}>
            <div className="relative p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 mb-6">
              <DecoCorners size="sm" />
              <p className="text-center text-xs font-serif text-yellow-600/50 uppercase tracking-[0.35em] mb-5">
                ◈──── All Caps Alphabet ────◈
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                  <span
                    key={letter}
                    className="text-xl font-serif text-yellow-500/50 tracking-widest hover:text-yellow-300 transition-colors duration-300 cursor-default"
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Tracking scale */}
          <RevealBlock delay={0.3}>
            <div className="relative p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30">
              <DecoCorners size="sm" />
              <p className="text-center text-xs font-serif text-yellow-600/50 uppercase tracking-[0.35em] mb-6">
                ◈──── Letter Spacing Scale ────◈
              </p>
              <div className="space-y-4">
                {[
                  { label: "Normal", cls: "tracking-normal", val: "0em" },
                  { label: "Wide", cls: "tracking-wide", val: "0.025em" },
                  { label: "Wider", cls: "tracking-wider", val: "0.05em" },
                  { label: "Widest", cls: "tracking-widest", val: "0.1em" },
                  { label: "Ultra", cls: "tracking-[0.3em]", val: "0.3em" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="text-xs font-mono text-yellow-600/50 w-16 flex-shrink-0">{item.val}</span>
                    <div className="h-px w-6 bg-yellow-600/30 flex-shrink-0" />
                    <span className={`font-serif text-yellow-400/70 uppercase text-sm ${item.cls}`}>
                      Art Deco — The Golden Era
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 9 — INTERACTIVE TABS
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Tabs" subtitle="Organized Elegance" />

          <RevealBlock delay={0.1}>
            <div className="relative p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30">
              <DecoCorners size="lg" />
              {/* Tab headers */}
              <div className="flex border-b border-yellow-600/20 mb-6">
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`px-6 py-3 font-serif uppercase tracking-[0.2em] text-sm transition-all duration-300 ${
                      activeTab === i
                        ? "text-yellow-500 border-b-2 border-yellow-500 -mb-px"
                        : "text-gray-500 hover:text-yellow-400"
                    }`}
                  >
                    {i === activeTab ? "◆ " : ""}{tab}
                  </button>
                ))}
              </div>
              {/* Tab content */}
              <div className="min-h-[100px]">
                {tabs.map((_, i) => (
                  <div
                    key={i}
                    className="transition-all duration-500"
                    style={{
                      display: activeTab === i ? "block" : "none",
                    }}
                  >
                    <h4 className="font-serif text-yellow-500 tracking-wider mb-3">
                      {tabContent[i].heading}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed font-serif">
                      {tabContent[i].body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 10 — PROGRESS & ACCORDION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Interactions" subtitle="Dynamic Elegance" />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Progress */}
            <RevealBlock delay={0.1}>
              <div className="relative p-8 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 h-full">
                <DecoCorners size="md" />
                <p className="text-center text-xs font-serif text-yellow-600/70 uppercase tracking-[0.35em] mb-6">
                  ◈──── Progress ────◈
                </p>
                <div className="space-y-7">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-serif text-yellow-500/80 uppercase tracking-wider">Project Status</span>
                      <span className="text-xs text-yellow-400 font-mono">{progress}%</span>
                    </div>
                    <div className="h-2 bg-[#0d0d0d] border border-yellow-600/30 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-400 shadow-[0_0_12px_rgba(212,175,55,0.5)] transition-all duration-700"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-serif text-emerald-400/80 uppercase tracking-wider">Completion</span>
                      <span className="text-xs text-emerald-400 font-mono">85%</span>
                    </div>
                    <div className="h-2 bg-[#0d0d0d] border border-emerald-600/30 overflow-hidden">
                      <div className="h-full w-[85%] bg-gradient-to-r from-emerald-700 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setProgress((p) => Math.max(0, p - 10))}
                      className="px-5 py-2 text-sm border border-yellow-600/40 text-yellow-500 font-serif uppercase tracking-wider hover:bg-yellow-500/10 transition-all duration-300"
                    >
                      ◄ -10%
                    </button>
                    <button
                      onClick={() => setProgress((p) => Math.min(100, p + 10))}
                      className="px-5 py-2 text-sm border border-yellow-600/40 text-yellow-500 font-serif uppercase tracking-wider hover:bg-yellow-500/10 transition-all duration-300"
                    >
                      +10% ►
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Accordion */}
            <RevealBlock delay={0.2}>
              <div className="space-y-3">
                {accordionItems.map((item, i) => (
                  <div
                    key={i}
                    className={`relative border transition-all duration-500 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] ${
                      openAccordion === i
                        ? "border-yellow-500/60 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                        : "border-yellow-600/20"
                    }`}
                  >
                    <button
                      onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="font-serif text-yellow-400/90 tracking-wider text-sm">
                        {openAccordion === i ? "◆ " : "◇ "}{item.title}
                      </span>
                      <span className="text-yellow-600/60 text-xs transition-transform duration-300" style={{
                        transform: openAccordion === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}>
                        ▼
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: openAccordion === i ? "200px" : "0",
                        opacity: openAccordion === i ? 1 : 0,
                      }}
                    >
                      <div className="px-5 pb-5 text-gray-500 text-sm font-serif leading-relaxed">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 11 — PHILOSOPHY / MANIFESTO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Philosophy" subtitle="The Art Deco Manifesto" />

          <RevealBlock delay={0.1}>
            <div className="relative p-12 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 text-center">
              {/* Multi-layer stepped border */}
              <div className="absolute inset-3 border border-yellow-600/20 pointer-events-none" />
              <div className="absolute inset-5 border border-yellow-600/10 pointer-events-none" />
              <DecoCorners size="lg" />

              <div className="mb-8">
                <Sunburst className="w-28 h-28 mx-auto opacity-40" />
              </div>

              <blockquote className="text-xl md:text-2xl font-serif text-yellow-400/70 leading-relaxed tracking-wider italic mb-8">
                &ldquo;Art Deco is not merely a style — it is a declaration that beauty and function
                are not opposites, but allies in the grand theater of human expression.&rdquo;
              </blockquote>

              <DecoDivider className="mb-6" />

              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
                  {
                    heading: "几何对称",
                    sub: "Geometric Symmetry",
                    body: "放射状线条与重复几何图案构成视觉秩序的骨架。",
                  },
                  {
                    heading: "奢华感",
                    sub: "Luxurious Presence",
                    body: "金色、黑色、深蓝形成的高端配色，传递精致与繁荣。",
                  },
                  {
                    heading: "精致工艺",
                    sub: "Refined Craft",
                    body: "细腻的线条和装饰细节彰显对工艺的极致追求。",
                  },
                  {
                    heading: "现代与传统",
                    sub: "Modernity Meets Tradition",
                    body: "机械时代美学与古典优雅的完美结合，超越时代的语言。",
                  },
                ].map((p) => (
                  <div key={p.heading} className="flex gap-4">
                    <span className="text-yellow-500/50 mt-1 flex-shrink-0">◆</span>
                    <div>
                      <h4 className="font-serif text-yellow-500/80 tracking-wider text-sm uppercase mb-0.5">
                        {p.heading}
                      </h4>
                      <p className="text-xs text-yellow-600/50 uppercase tracking-[0.25em] mb-2 font-serif">
                        {p.sub}
                      </p>
                      <p className="text-gray-500 text-sm font-serif leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 12 — GEOMETRIC PATTERNS SHOWCASE
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Geometric Patterns" subtitle="Decorative DNA" />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Chevron pattern */}
            <RevealBlock delay={0.1}>
              <div className="relative p-6 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 text-center">
                <DecoCorners size="sm" />
                <div
                  className="h-24 w-full mb-4 opacity-60"
                  style={{
                    background: "repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 2px, transparent 2px, transparent 20px)",
                  }}
                />
                <p className="text-xs font-serif text-yellow-600/70 uppercase tracking-[0.25em]">Vertical Striping</p>
              </div>
            </RevealBlock>

            {/* Diamond grid */}
            <RevealBlock delay={0.15}>
              <div className="relative p-6 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 text-center">
                <DecoCorners size="sm" />
                <div
                  className="h-24 w-full mb-4 opacity-50"
                  style={{
                    background: `
                      repeating-linear-gradient(45deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 20px),
                      repeating-linear-gradient(-45deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 20px)
                    `,
                  }}
                />
                <p className="text-xs font-serif text-yellow-600/70 uppercase tracking-[0.25em]">Diamond Grid</p>
              </div>
            </RevealBlock>

            {/* Sunburst */}
            <RevealBlock delay={0.2}>
              <div className="relative p-6 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 text-center">
                <DecoCorners size="sm" />
                <div className="h-24 w-full mb-4 flex items-center justify-center">
                  <Sunburst className="w-20 h-20 opacity-60" />
                </div>
                <p className="text-xs font-serif text-yellow-600/70 uppercase tracking-[0.25em]">Sunburst Rays</p>
              </div>
            </RevealBlock>

            {/* Chevron steps */}
            <RevealBlock delay={0.25}>
              <div className="relative p-6 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 text-center">
                <DecoCorners size="sm" />
                <div className="h-24 w-full mb-4 flex flex-col items-center justify-center gap-1.5">
                  {["▲▲▲▲▲▲▲", "▲▲▲▲▲", "▲▲▲", "▲"].map((row, i) => (
                    <div key={i} className="text-yellow-500/30 text-sm tracking-widest">{row}</div>
                  ))}
                </div>
                <p className="text-xs font-serif text-yellow-600/70 uppercase tracking-[0.25em]">Stepped Chevrons</p>
              </div>
            </RevealBlock>

            {/* Fan shape */}
            <RevealBlock delay={0.3}>
              <div className="relative p-6 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 text-center">
                <DecoCorners size="sm" />
                <div
                  className="h-24 w-full mb-4 opacity-40"
                  style={{
                    background: "conic-gradient(from 180deg at 50% 100%, #d4af37 0deg, transparent 30deg, #d4af37 30deg, transparent 60deg, #d4af37 60deg, transparent 90deg, #d4af37 90deg, transparent 120deg, #d4af37 120deg, transparent 150deg, #d4af37 150deg, transparent 180deg)",
                  }}
                />
                <p className="text-xs font-serif text-yellow-600/70 uppercase tracking-[0.25em]">Fan Motif</p>
              </div>
            </RevealBlock>

            {/* Horizontal rule decoration */}
            <RevealBlock delay={0.35}>
              <div className="relative p-6 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a2e] border border-yellow-600/30 text-center">
                <DecoCorners size="sm" />
                <div className="h-24 w-full mb-4 flex flex-col items-center justify-center gap-3">
                  <div className="flex items-center gap-1 text-yellow-500/50 text-xs tracking-widest">
                    <span>◈</span>
                    <div className="flex-1 w-20 h-px bg-yellow-500/30" />
                    <span>◆</span>
                    <div className="flex-1 w-20 h-px bg-yellow-500/30" />
                    <span>◈</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500/30 text-xs tracking-widest">
                    <span>◇</span>
                    <div className="flex-1 w-16 h-px bg-yellow-500/20" />
                    <span>◇</span>
                    <div className="flex-1 w-16 h-px bg-yellow-500/20" />
                    <span>◇</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500/20 text-xs tracking-widest">
                    <div className="w-28 h-px bg-yellow-500/15" />
                  </div>
                </div>
                <p className="text-xs font-serif text-yellow-600/70 uppercase tracking-[0.25em]">Rule Decorations</p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 13 — FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-yellow-600/20 backdrop-blur-sm bg-[#0d0d0d]/70">
        {/* Top decorative band */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          {/* Stepped geometric footer ornament */}
          <div className="flex flex-col items-center gap-1 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-24 h-px bg-yellow-600/30" />
              <span className="text-yellow-500/50 text-xs">▲▲▲</span>
              <div className="w-24 h-px bg-yellow-600/30" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-px bg-yellow-600/20" />
              <span className="text-yellow-500/40 text-xs">▲▲</span>
              <div className="w-16 h-px bg-yellow-600/20" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-yellow-600/15" />
              <span className="text-yellow-500/30 text-xs">▲</span>
              <div className="w-8 h-px bg-yellow-600/15" />
            </div>
          </div>

          {/* Logo mark */}
          <div className="relative inline-block mb-6">
            <div className="border border-yellow-600/30 p-2">
              <div className="border border-yellow-500/40 p-2">
                <div className="px-10 py-3">
                  <div className="flex items-center gap-4">
                    <span className="text-yellow-600/50 text-sm">◆</span>
                    <span className="font-serif text-2xl text-yellow-500 tracking-[0.4em] uppercase">
                      Art Deco
                    </span>
                    <span className="text-yellow-600/50 text-sm">◆</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DecoDivider className="mb-6" />

          <p className="text-gray-600 text-sm font-serif tracking-wider mb-3">
            Part of the{" "}
            <Link href="/" className="text-yellow-500/70 hover:text-yellow-400 transition-colors duration-300">
              StyleKit
            </Link>{" "}
            Design System Collection
          </p>

          <p className="text-gray-700 text-xs font-serif tracking-[0.3em] uppercase">
            ◈ The Golden Age of Design · 1920–1940 · Revived ◈
          </p>

          {/* Bottom chevron pyramid */}
          <div className="flex flex-col items-center gap-1 mt-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-yellow-600/15" />
              <span className="text-yellow-500/20 text-xs">▼</span>
              <div className="w-8 h-px bg-yellow-600/15" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-px bg-yellow-600/10" />
              <span className="text-yellow-500/15 text-xs">▼▼</span>
              <div className="w-16 h-px bg-yellow-600/10" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-px bg-yellow-600/05" />
              <span className="text-yellow-500/10 text-xs">▼▼▼</span>
              <div className="w-24 h-px bg-yellow-600/05" />
            </div>
          </div>
        </div>

        {/* Bottom geometric band */}
        <div className="h-1 bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />
      </footer>
    </div>
  );
}
