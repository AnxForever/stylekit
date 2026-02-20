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
// SVG Decorations
// ─────────────────────────────────────────────────────────────

function PointedArchSVG({ width = 120, height = 160, opacity = 0.3 }: {
  width?: number; height?: number; opacity?: number;
}) {
  const mid = width / 2;
  const peakY = 0;
  const shoulderY = height * 0.38;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <path
        d={`M 0 ${height} L 0 ${shoulderY} Q 0 ${peakY} ${mid} ${peakY} Q ${width} ${peakY} ${width} ${shoulderY} L ${width} ${height}`}
        stroke="#c9a227"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d={`M ${mid * 0.4} ${height} L ${mid * 0.4} ${shoulderY + 20} Q ${mid * 0.4} ${peakY + 40} ${mid} ${peakY + 40} Q ${mid * 1.6} ${peakY + 40} ${mid * 1.6} ${shoulderY + 20} L ${mid * 1.6} ${height}`}
        stroke="#c9a227"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function RoseWindowSVG({ size = 160 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r1 = size * 0.47;
  const r2 = size * 0.31;
  const r3 = size * 0.14;
  const spokes = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <circle cx={cx} cy={cy} r={r1} stroke="#c9a227" strokeWidth="1" opacity="0.35" />
      <circle cx={cx} cy={cy} r={r2} stroke="#c9a227" strokeWidth="1" opacity="0.25" />
      <circle cx={cx} cy={cy} r={r3} stroke="#c9a227" strokeWidth="1" opacity="0.4" />
      <circle cx={cx} cy={cy} r={r3 * 0.45} fill="#c9a227" opacity="0.2" />
      {spokes.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x2 = cx + Math.cos(rad) * r1;
        const y2 = cy + Math.sin(rad) * r1;
        return (
          <line
            key={deg}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="#c9a227"
            strokeWidth="0.7"
            opacity="0.2"
          />
        );
      })}
      {/* Petal tracery at mid ring */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const px = cx + Math.cos(rad) * ((r2 + r1) / 2);
        const py = cy + Math.sin(rad) * ((r2 + r1) / 2);
        return (
          <circle
            key={`petal-${deg}`}
            cx={px}
            cy={py}
            r={size * 0.055}
            stroke="#c9a227"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
        );
      })}
    </svg>
  );
}

function FleurDeLis({ size = 40, color = "#c9a227", opacity = 0.4 }: {
  size?: number; color?: string; opacity?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" style={{ opacity }}>
      {/* Central petal */}
      <path d="M 20 4 C 16 4 14 8 14 12 C 14 16 16 19 20 20 C 24 19 26 16 26 12 C 26 8 24 4 20 4 Z" fill={color} />
      {/* Left petal */}
      <path d="M 8 14 C 4 12 4 16 6 18 C 8 20 12 20 16 19 C 18 16 16 12 12 12 C 10 12 8 13 8 14 Z" fill={color} />
      {/* Right petal */}
      <path d="M 32 14 C 36 12 36 16 34 18 C 32 20 28 20 24 19 C 22 16 24 12 28 12 C 30 12 32 13 32 14 Z" fill={color} />
      {/* Stem */}
      <path d="M 17 20 L 14 36 L 20 32 L 26 36 L 23 20 Z" fill={color} />
      {/* Cross bar */}
      <rect x="13" y="24" width="14" height="2" fill={color} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// GoldCorner ornament
// ─────────────────────────────────────────────────────────────

function GoldCorner({ position = "tl" }: { position?: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-8 h-8 border-[#c9a227]/10 group-hover:border-[#c9a227]/80 transition-all duration-700";
  const posMap = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return <div className={`${base} ${posMap[position]}`} aria-hidden="true" />;
}

// ─────────────────────────────────────────────────────────────
// Section Header with ornamental divider
// ─────────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center mb-12">
      <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-3">
        {eyebrow}
      </p>
      <h2
        className="font-serif text-3xl md:text-5xl tracking-wider uppercase text-[#c9a227] mb-5"
        style={{ textShadow: "0 0 30px rgba(201,162,39,0.2)" }}
      >
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c9a227]/40" />
        <span className="text-[#c9a227]/30 font-serif text-xs tracking-wider">✦</span>
        <div className="h-px w-16 bg-[#c9a227]/30" />
        <span className="text-[#c9a227]/50 font-serif text-sm">✧</span>
        <div className="h-px w-16 bg-[#c9a227]/30" />
        <span className="text-[#c9a227]/30 font-serif text-xs tracking-wider">✦</span>
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c9a227]/40" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Export
// ─────────────────────────────────────────────────────────────

export default function GothicShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeVariant, setActiveVariant] = useState<"Cathedral" | "Manuscript">("Cathedral");
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const cathedralCards = [
    {
      id: "nave",
      title: "The Nave",
      latin: "Navis Cathedralis",
      desc: "The central passage where pilgrims gather beneath soaring vaulted ceilings of stone and shadow, drawn toward the altar by divine geometry and the smell of incense.",
      accent: "#8b1a1a",
    },
    {
      id: "rose",
      title: "Rose Window",
      latin: "Fenestra Rosae",
      desc: "Stained glass petals radiate outward from a sacred center, flooding the interior with colored divine light at each turning of the sun.",
      accent: "#c9a227",
    },
    {
      id: "cloister",
      title: "The Cloister",
      latin: "Claustrum Sanctum",
      desc: "Silent arcaded corridors where contemplation deepens and footsteps echo against ancient stone worn smooth by centuries of devotion.",
      accent: "#4a2d6e",
    },
  ];

  const manuscriptCards = [
    {
      id: "illumination",
      title: "Illumination",
      latin: "Illuminatio Divina",
      desc: "Gold leaf catches candlelight as the scribe's brush traces intricate borders around sacred text, preserving wisdom for eternity on vellum.",
      accent: "#c9a227",
    },
    {
      id: "bestiary",
      title: "Bestiary",
      latin: "Liber Bestiarum",
      desc: "Fantastical creatures fill the margins — dragons, griffins, and chimeras — watching over the sacred words with eternal vigilance.",
      accent: "#8b1a1a",
    },
    {
      id: "psalter",
      title: "Psalter",
      latin: "Psalterium Regium",
      desc: "Royal psalms transcribed by candlelight, each letter a devotion, each page a testament to the enduring power of the written word across centuries.",
      accent: "#4a2d6e",
    },
  ];

  const displayCards = activeVariant === "Cathedral" ? cathedralCards : manuscriptCards;

  return (
    <div className="min-h-screen text-[#f5f0e8]" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #0f0a18 40%, #0a0a0a 100%)" }}>

      {/* ── Fixed Navigation ── */}
      <header
        className="sticky top-0 z-50 border-b border-[#c9a227]/20"
        style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/styles/gothic/showcase"
              className="font-serif text-lg md:text-xl tracking-widest uppercase text-[#c9a227] hover:text-[#c9a227]/70 transition-colors duration-300"
            >
              GOTHIC
            </Link>
            <nav className="flex items-center gap-6 md:gap-8">
              <Link
                href="/styles/gothic"
                className="text-sm tracking-wider text-[#c9a227]/50 hover:text-[#c9a227] transition-colors duration-300 font-serif"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-sm tracking-wider text-[#c9a227]/50 hover:text-[#c9a227] transition-colors duration-300 font-serif"
              >
                StyleKit →
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden min-h-[92vh] flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #2d1b4e 50%, #0a0a0a 100%)" }}
      >
        {/* Radial gold glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 45%, rgba(201,162,39,0.08) 0%, transparent 65%)" }}
        />

        {/* Pointed arch frame at top */}
        <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none">
          <PointedArchSVG width={280} height={140} opacity={0.18} />
        </div>

        {/* Left rose window */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
          <RoseWindowSVG size={120} />
        </div>

        {/* Right rose window */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
          <RoseWindowSVG size={120} />
        </div>

        {/* Vertical gold lines */}
        <div className="absolute top-0 left-1/2 -translate-x-px w-px h-24 bg-gradient-to-b from-transparent via-[#c9a227]/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-px w-px h-24 bg-gradient-to-t from-transparent via-[#c9a227]/50 to-transparent" />

        {/* Corner fleurs */}
        <div className="absolute top-8 left-8 opacity-20 hidden md:block">
          <FleurDeLis size={32} />
        </div>
        <div className="absolute top-8 right-8 opacity-20 hidden md:block">
          <FleurDeLis size={32} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-12">

          {/* Eyebrow */}
          <div style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            <p className="text-xs tracking-[0.5em] uppercase text-[#c9a227]/50 font-serif mb-6">
              哥特式风格 · Stilus Gothicus
            </p>
          </div>

          {/* Main title */}
          <div style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.25s",
          }}>
            <h1
              className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-wider uppercase mb-4"
              style={{
                color: "#c9a227",
                textShadow: "0 0 60px rgba(201,162,39,0.4), 0 0 120px rgba(201,162,39,0.15)",
              }}
            >
              GOTHIC
            </h1>
          </div>

          {/* Ornamental divider */}
          <div style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.38s",
          }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#c9a227]/50" />
              <FleurDeLis size={24} opacity={0.6} />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#c9a227]/50" />
            </div>
          </div>

          {/* Latin subtitle */}
          <div style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}>
            <p className="font-serif italic text-lg md:text-xl text-[#c9a227]/60 tracking-wider max-w-2xl mx-auto mb-2">
              In tenebris et umbra, pulchritudo latet.
            </p>
            <p className="text-sm text-[#c9a227]/35 font-serif tracking-widest mb-10">
              In darkness and shadow, beauty lies hidden.
            </p>
          </div>

          {/* CTA buttons */}
          <div style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.65s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.65s",
          }}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-8 py-3 border border-[#c9a227]/60 text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#c9a227]/10 hover:shadow-[0_6px_24px_rgba(201,162,39,0.35)] transition-all duration-700">
                Enter the Cathedral
              </button>
              <button className="px-8 py-3 bg-[#8b1a1a] text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#8b1a1a]/80 hover:shadow-[0_6px_24px_rgba(139,26,26,0.5)] transition-all duration-700">
                Descend to the Crypt
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 1.2s",
            }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/25 font-serif">Scroll to Explore</span>
            <div className="w-px h-10 bg-gradient-to-b from-[#c9a227]/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Cathedral Architecture Section ── */}
      <section className="py-20 md:py-28 px-6 border-t border-[#c9a227]/10" style={{ background: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock delay={0}>
            <SectionHeader eyebrow="Architectura Sacra" title="Cathedral Architecture" />
          </RevealBlock>

          {/* Architecture feature panels */}
          <RevealBlock delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Pointed arch diagram */}
              <div className="group relative bg-[#111111] border border-[#c9a227]/20 hover:border-[#c9a227]/50 hover:shadow-[0_0_40px_rgba(201,162,39,0.12)] p-8 overflow-hidden transition-all duration-700">
                <GoldCorner position="tl" />
                <GoldCorner position="tr" />
                <GoldCorner position="bl" />
                <GoldCorner position="br" />
                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-4">
                  Arcus Acutus
                </p>
                <h3 className="font-serif text-2xl tracking-wider uppercase text-[#c9a227] mb-4">
                  The Pointed Arch
                </h3>
                <p className="font-serif italic text-sm text-[#c9a227]/55 leading-relaxed mb-6">
                  The pointed arch redirects structural weight outward, allowing walls to soar beyond Romanesque limits.
                  This architectural revelation became the defining form of the Gothic aesthetic — upward, always upward.
                </p>
                <div className="flex justify-center mt-4">
                  <PointedArchSVG width={180} height={220} opacity={0.5} />
                </div>
              </div>

              {/* Rose window diagram */}
              <div className="group relative bg-[#111111] border border-[#c9a227]/20 hover:border-[#c9a227]/50 hover:shadow-[0_0_40px_rgba(201,162,39,0.12)] p-8 overflow-hidden transition-all duration-700">
                <GoldCorner position="tl" />
                <GoldCorner position="tr" />
                <GoldCorner position="bl" />
                <GoldCorner position="br" />
                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-4">
                  Fenestra Orbiculata
                </p>
                <h3 className="font-serif text-2xl tracking-wider uppercase text-[#c9a227] mb-4">
                  The Rose Window
                </h3>
                <p className="font-serif italic text-sm text-[#c9a227]/55 leading-relaxed mb-6">
                  Stained glass transformed stone walls into vessels of divine light. Each colored panel narrates scripture
                  to an illiterate populace through the universal language of luminous color.
                </p>
                <div className="flex justify-center mt-4">
                  <RoseWindowSVG size={180} />
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Three pillars of gothic */}
          <RevealBlock delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  num: "I",
                  title: "Verticality",
                  latin: "Verticalitas",
                  desc: "Everything reaches upward — spires, arches, nave columns. The vertical line is a symbolic gesture toward the divine, away from the earthly.",
                  accent: "#c9a227",
                },
                {
                  num: "II",
                  title: "Light & Shadow",
                  latin: "Lux et Umbra",
                  desc: "The greatest achievement of Gothic architecture is sacred light within stone. Gold against darkness mirrors grace against sin.",
                  accent: "#8b1a1a",
                },
                {
                  num: "III",
                  title: "Ornamentation",
                  latin: "Ornamentum",
                  desc: "Gargoyles serve as waterspouts and spiritual guardians. Every decorative element has structural or symbolic purpose.",
                  accent: "#4a2d6e",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="group relative bg-[#111111] border border-[#c9a227]/20 hover:border-[#c9a227]/50 hover:shadow-[0_0_40px_rgba(201,162,39,0.2)] p-7 overflow-hidden transition-all duration-700 cursor-pointer"
                  onMouseEnter={() => setHoveredCard(item.num)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Candlelight effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${item.accent}22, transparent 65%)` }}
                  />
                  <GoldCorner position="tl" />
                  <GoldCorner position="br" />
                  {/* Roman numeral watermark */}
                  <div
                    className="absolute top-3 right-5 font-serif text-7xl opacity-5 select-none"
                    style={{ color: item.accent }}
                  >
                    {item.num}
                  </div>
                  <p className="font-serif text-xs italic mb-2" style={{ color: `${item.accent}70` }}>
                    {item.latin}
                  </p>
                  <h3
                    className="font-serif text-xl tracking-wider uppercase mb-3"
                    style={{ color: item.accent }}
                  >
                    {item.title}
                  </h3>
                  <div
                    className="h-px mb-4 transition-all duration-700"
                    style={{
                      background: `${item.accent}50`,
                      width: hoveredCard === item.num ? "100%" : "2rem",
                    }}
                  />
                  <p className="font-serif italic text-sm text-[#c9a227]/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Component Gallery Section ── */}
      <section className="py-20 md:py-28 px-6 border-t border-[#c9a227]/10" style={{ background: "#0d0a14" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock delay={0}>
            <SectionHeader eyebrow="Elementa Designi" title="Sacred Forms" />
          </RevealBlock>

          {/* Cathedral / Manuscript toggle */}
          <RevealBlock delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="border border-[#c9a227]/30 flex">
                {(["Cathedral", "Manuscript"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveVariant(v)}
                    className={`px-8 py-3 font-serif text-sm tracking-widest uppercase transition-all duration-300 ${
                      activeVariant === v
                        ? "bg-[#c9a227]/15 text-[#c9a227] shadow-[inset_0_0_20px_rgba(201,162,39,0.1)]"
                        : "text-[#c9a227]/40 hover:text-[#c9a227]/70 hover:bg-[#c9a227]/5"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Cards */}
          <RevealBlock delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {displayCards.map((card, i) => (
                <div
                  key={card.id}
                  className="group relative bg-[#111111] border border-[#c9a227]/20 hover:border-[#c9a227]/60 hover:shadow-[0_0_40px_rgba(201,162,39,0.2)] overflow-hidden cursor-pointer transition-all duration-700"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {/* Candlelight hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${card.accent}25, transparent 65%)` }}
                  />
                  {/* Top colored bar */}
                  <div
                    className="h-px w-full"
                    style={{ background: `linear-gradient(to right, transparent, ${card.accent}90, transparent)` }}
                  />
                  <GoldCorner position="tr" />
                  <GoldCorner position="bl" />
                  <div className="p-7">
                    <p className="font-serif text-xs italic tracking-wider mb-2" style={{ color: `${card.accent}70` }}>
                      {card.latin}
                    </p>
                    <h3
                      className="font-serif text-xl tracking-wider uppercase mb-3 transition-colors duration-300"
                      style={{ color: card.accent }}
                    >
                      {card.title}
                    </h3>
                    {/* Expanding underline */}
                    <div
                      className="h-px w-8 group-hover:w-full mb-4 transition-all duration-700"
                      style={{ background: `${card.accent}60` }}
                    />
                    <p className="font-serif italic text-sm text-[#c9a227]/50 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Button variants */}
          <RevealBlock delay={0.3}>
            <div className="group relative bg-[#111111] border border-[#c9a227]/20 p-8 mb-8 hover:shadow-[0_0_40px_rgba(201,162,39,0.1)] transition-all duration-700">
              <GoldCorner position="tl" />
              <GoldCorner position="br" />
              <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
                Tactus — Button Variants
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-7 py-3 border border-[#c9a227]/60 text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#c9a227]/10 hover:shadow-[0_6px_24px_rgba(201,162,39,0.35)] transition-all duration-700">
                  Gold Outline
                </button>
                <button className="px-7 py-3 bg-[#8b1a1a] text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#8b1a1a]/80 hover:shadow-[0_6px_24px_rgba(139,26,26,0.5)] transition-all duration-700">
                  Blood Red
                </button>
                <button className="px-7 py-3 bg-[#2d1b4e] text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#4a2d6e] hover:shadow-[0_6px_24px_rgba(45,27,78,0.5)] transition-all duration-700">
                  Deep Purple
                </button>
                <button className="px-7 py-3 bg-[#c9a227] text-[#0a0a0a] font-serif text-sm tracking-widest uppercase hover:bg-[#c9a227]/90 hover:shadow-[0_6px_24px_rgba(201,162,39,0.5)] transition-all duration-700">
                  Sacred Gold
                </button>
                <button
                  disabled
                  className="px-7 py-3 font-serif text-sm tracking-widest uppercase cursor-not-allowed border border-[#c9a227]/20 text-[#c9a227]/25"
                >
                  Forbidden
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* Input form */}
          <RevealBlock delay={0.4}>
            <div className="group relative bg-[#111111] border border-[#c9a227]/20 p-8 hover:shadow-[0_0_40px_rgba(201,162,39,0.1)] transition-all duration-700">
              <GoldCorner position="tl" />
              <GoldCorner position="tr" />
              <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
                Petitio — Sacred Form
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase text-[#c9a227]/50 font-serif mb-2">
                    Name of the Penitent
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 bg-transparent border border-[#c9a227]/25 text-[#f5f0e8]/80 font-serif text-sm tracking-wider placeholder:text-[#c9a227]/20 focus:outline-none focus:border-[#c9a227]/60 focus:shadow-[0_0_12px_rgba(201,162,39,0.15)] transition-all duration-700"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase text-[#c9a227]/50 font-serif mb-2">
                    Sacred Epistle
                  </label>
                  <input
                    type="email"
                    placeholder="your@epistula.com"
                    className="w-full px-4 py-3 bg-transparent border border-[#c9a227]/25 text-[#f5f0e8]/80 font-serif text-sm tracking-wider placeholder:text-[#c9a227]/20 focus:outline-none focus:border-[#c9a227]/60 focus:shadow-[0_0_12px_rgba(201,162,39,0.15)] transition-all duration-700"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs tracking-[0.3em] uppercase text-[#c9a227]/50 font-serif mb-2">
                    Your Confession
                  </label>
                  <textarea
                    placeholder="Speak your words into the void..."
                    rows={3}
                    className="w-full px-4 py-3 bg-transparent border border-[#c9a227]/25 text-[#f5f0e8]/80 font-serif text-sm tracking-wider placeholder:text-[#c9a227]/20 focus:outline-none focus:border-[#c9a227]/60 focus:shadow-[0_0_12px_rgba(201,162,39,0.15)] transition-all duration-700 resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button className="px-8 py-3 bg-[#8b1a1a] text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#8b1a1a]/80 hover:shadow-[0_6px_24px_rgba(139,26,26,0.5)] transition-all duration-700">
                    Submit Petition
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Design Philosophy Section ── */}
      <section className="py-20 md:py-28 px-6 border-t border-[#c9a227]/10" style={{ background: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock delay={0}>
            <SectionHeader eyebrow="Philosophia Designi" title="Gothic Philosophy" />
          </RevealBlock>

          {/* Tab navigation */}
          <RevealBlock delay={0.1}>
            <div className="border border-[#c9a227]/20 mb-0">
              <div className="flex border-b border-[#c9a227]/20">
                {["Structure", "Light", "Ornament"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-4 font-serif text-xs tracking-[0.3em] uppercase transition-all duration-300 ${
                      activeTab === i
                        ? "bg-[#c9a227]/10 text-[#c9a227] border-b-2 border-[#c9a227]/60 -mb-px"
                        : "text-[#c9a227]/35 hover:text-[#c9a227]/60 hover:bg-[#c9a227]/3"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-8 md:p-12 bg-[#0d0d0d] min-h-[220px]">
                {activeTab === 0 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-serif text-xl text-[#c9a227] tracking-wider uppercase mb-4">
                        Pointed Arch Principle
                      </h3>
                      <p className="font-serif italic text-[#c9a227]/60 leading-relaxed text-sm mb-4">
                        The pointed arch redirects weight outward and downward, allowing walls to soar higher than was ever
                        possible in the Romanesque tradition. This structural revelation became the defining form of Gothic aesthetic.
                      </p>
                      <p className="font-serif italic text-[#c9a227]/40 text-sm leading-relaxed">
                        In design: use vertical emphasis, sharp angles, and upward-reaching compositions. Never settle for
                        horizontal sprawl when vertical aspiration is achievable.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <PointedArchSVG width={150} height={200} opacity={0.55} />
                    </div>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-serif text-xl text-[#c9a227] tracking-wider uppercase mb-4">
                        The Rose Window
                      </h3>
                      <p className="font-serif italic text-[#c9a227]/60 leading-relaxed text-sm mb-4">
                        Stained glass transformed stone walls into vessels of divine light. Each colored panel was chosen
                        not for decoration, but to narrate scripture through the universal language of luminous color.
                      </p>
                      <p className="font-serif italic text-[#c9a227]/40 text-sm leading-relaxed">
                        In design: use gold accents as focal points of light against deep darkness. Allow radial gradients
                        to suggest the rose window. The dark makes the light sacred.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <RoseWindowSVG size={160} />
                    </div>
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-serif text-xl text-[#c9a227] tracking-wider uppercase mb-4">
                        Sacred Ornamentation
                      </h3>
                      <p className="font-serif italic text-[#c9a227]/60 leading-relaxed text-sm mb-4">
                        Gothic ornament is never gratuitous. Every decorative element has structural or symbolic purpose
                        rooted in doctrine. Beauty and function are inseparable in the Gothic tradition.
                      </p>
                      <ul className="space-y-3">
                        {[
                          "Gold border lines as structural dividers",
                          "Serif letterforms as sacred script",
                          "Dark ground as the void — light as revelation",
                          "Latin mottos as gravitas anchors",
                        ].map((rule) => (
                          <li key={rule} className="flex items-start gap-3">
                            <span className="text-[#c9a227]/50 font-serif mt-0.5 flex-shrink-0">†</span>
                            <span className="font-serif text-sm text-[#c9a227]/55 italic">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6">
                      <FleurDeLis size={64} opacity={0.6} />
                      <p className="font-serif text-xs italic text-[#c9a227]/30 tracking-wider text-center">
                        Fleur-de-lis — Royal ornament of faith
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>

          {/* Accordion */}
          <RevealBlock delay={0.2}>
            <div className="mt-8 space-y-2">
              {[
                {
                  title: "Memento Mori — Remember You Must Die",
                  content: "Gothic aesthetics are rooted in the medieval preoccupation with mortality and the transience of earthly existence. Death was not morbid but instructive — a reminder that only the eternal matters. This solemn awareness gives Gothic design its gravity and weight.",
                },
                {
                  title: "Lux in Tenebris — Light in Darkness",
                  content: "The greatest achievement of Gothic architecture is the creation of sacred light within a structure of stone. The contrast between deep shadow and gold luminance mirrors the theological contrast between sin and grace, ignorance and revelation, mortality and transcendence.",
                },
                {
                  title: "Sub Specie Aeternitatis — Under the Aspect of Eternity",
                  content: "Gothic craftsmen built for eternity, not for fashion. Every stone was laid with the knowledge that the cathedral would outlast its builders by centuries. This permanence mindset demands that design choices be deliberate, studied, and worthy of endurance.",
                },
                {
                  title: "Opus Dei — The Work of God",
                  content: "The anonymous craftsmen of Gothic cathedrals signed their work not with their names, but with the quality of their craft. To work with excellence was itself an act of worship. Every interface, every pixel, every transition — these are offerings to the craft.",
                },
              ].map((item, i) => (
                <div key={i} className="border border-[#c9a227]/20 bg-[#0d0d0d]">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#c9a227]/5 transition-colors duration-300"
                  >
                    <span className="font-serif text-sm tracking-wider text-[#c9a227]/75">{item.title}</span>
                    <span
                      className="text-[#c9a227]/50 font-serif text-xs flex-shrink-0 ml-4 transition-transform duration-300"
                      style={{ transform: openAccordion === i ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}
                    >
                      ▾
                    </span>
                  </button>
                  {openAccordion === i && (
                    <div className="px-6 pb-5 border-t border-[#c9a227]/10">
                      <p className="font-serif italic text-sm text-[#c9a227]/50 leading-relaxed mt-4">
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Color & Typography Section ── */}
      <section className="py-20 md:py-28 px-6 border-t border-[#c9a227]/10" style={{ background: "#0d0a14" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock delay={0}>
            <SectionHeader eyebrow="Chromata et Litterae" title="Color & Typography" />
          </RevealBlock>

          {/* Color swatches */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-14">
              {[
                { name: "Deep Purple", hex: "#2d1b4e", role: "Primary", note: "Cathedral shadow", bgStyle: { background: "#2d1b4e" } },
                { name: "Blood Red", hex: "#8b1a1a", role: "Secondary", note: "Sacred wound", bgStyle: { background: "#8b1a1a" } },
                { name: "Sacred Gold", hex: "#c9a227", role: "Accent", note: "Divine light", bgStyle: { background: "#c9a227" } },
                { name: "Near Black", hex: "#0a0a0a", role: "Ground", note: "The void", bgStyle: { background: "#0a0a0a", border: "1px solid rgba(201,162,39,0.2)" } },
                { name: "Medium Purple", hex: "#4a2d6e", role: "Support", note: "Dusk cloister", bgStyle: { background: "#4a2d6e" } },
              ].map((color) => (
                <div
                  key={color.name}
                  className="group border border-[#c9a227]/20 hover:border-[#c9a227]/50 hover:shadow-[0_0_20px_rgba(201,162,39,0.12)] transition-all duration-700"
                >
                  <div className="h-24 md:h-32" style={color.bgStyle} />
                  <div className="p-4 border-t border-[#c9a227]/20 bg-[#111111]">
                    <p className="font-serif text-xs tracking-widest uppercase text-[#c9a227]/50 mb-1">{color.role}</p>
                    <p className="font-serif text-sm text-[#f5f0e8]/70 tracking-wider">{color.name}</p>
                    <p className="text-xs text-[#c9a227]/35 font-mono mt-1">{color.hex}</p>
                    <p className="font-serif text-xs italic text-[#c9a227]/25 mt-1">{color.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Typography specimens */}
          <RevealBlock delay={0.2}>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="group relative bg-[#111111] border border-[#c9a227]/20 p-8 hover:shadow-[0_0_40px_rgba(201,162,39,0.1)] transition-all duration-700">
                <GoldCorner position="tl" />
                <GoldCorner position="br" />
                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
                  Hierarchy Display
                </p>
                <div className="space-y-5">
                  <div>
                    <p
                      className="font-serif text-4xl md:text-5xl tracking-wider text-[#c9a227]"
                      style={{ textShadow: "0 0 20px rgba(201,162,39,0.3)" }}
                    >
                      GOTHIC
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">H1 · serif · tracking-wider · gold glow</p>
                  </div>
                  <div className="h-px bg-[#c9a227]/10" />
                  <div>
                    <p className="font-serif text-2xl tracking-wider text-[#8b1a1a]">
                      Sanctum Altare
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">H2 · serif · blood red · tracking-wider</p>
                  </div>
                  <div className="h-px bg-[#c9a227]/10" />
                  <div>
                    <p className="font-serif text-lg tracking-wider text-[#c9a227]/70 uppercase">
                      Via Crucis
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">H3 · serif · gold/70 · uppercase</p>
                  </div>
                  <div className="h-px bg-[#c9a227]/10" />
                  <div>
                    <p className="font-serif text-sm italic text-[#c9a227]/55 leading-relaxed">
                      Sub specie aeternitatis, omnia mutantur.
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">Body · serif · italic · gold/55</p>
                  </div>
                  <div className="h-px bg-[#c9a227]/10" />
                  <div>
                    <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/35 font-serif">
                      Captions &amp; Labels
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">Caption · tracking-[0.4em] · gold/35</p>
                  </div>
                </div>
              </div>

              <div className="group relative bg-[#111111] border border-[#c9a227]/20 p-8 hover:shadow-[0_0_40px_rgba(201,162,39,0.1)] transition-all duration-700">
                <GoldCorner position="tr" />
                <GoldCorner position="bl" />
                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
                  Illuminated Quote
                </p>
                <blockquote className="border-l-2 border-[#c9a227]/50 pl-6 mb-8">
                  <p className="font-serif text-lg italic text-[#c9a227]/65 leading-relaxed mb-3">
                    &ldquo;In the shadow of the cathedral, the soul learns to see without eyes — perceiving the divine in the play of light across ancient stone.&rdquo;
                  </p>
                  <footer className="font-serif text-xs tracking-widest uppercase text-[#c9a227]/35">
                    — Vita Cathedralis
                  </footer>
                </blockquote>
                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-4">Drop Cap</p>
                <p className="font-serif text-sm italic text-[#c9a227]/50 leading-relaxed">
                  <span
                    className="float-left mr-2 font-serif leading-none text-[#c9a227]"
                    style={{ fontSize: "3.5rem", lineHeight: 1, textShadow: "0 0 20px rgba(201,162,39,0.4)" }}
                  >
                    D
                  </span>
                  arkness is not the absence of light. It is the canvas upon which light inscribes its most sacred revelations.
                  Without the void of the cathedral walls, the rose window would be merely colored glass — meaningless and mute.
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Alert states */}
          <RevealBlock delay={0.3}>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
              Proclamationes — Alert States
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-[#111111] border border-[#c9a227]/20 border-l-2 border-l-[#c9a227]">
                <span className="text-[#c9a227] font-serif flex-shrink-0 mt-0.5 text-lg">✓</span>
                <div>
                  <p className="font-serif text-sm tracking-wider text-[#c9a227] uppercase">Blessed — Ritual Complete</p>
                  <p className="font-serif text-xs italic text-[#c9a227]/40 mt-1">The sacred operation has been fulfilled.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#111111] border border-[#c9a227]/20 border-l-2 border-l-[#c9a227]/40">
                <span className="text-[#c9a227]/60 font-serif flex-shrink-0 mt-0.5 text-lg">⚠</span>
                <div>
                  <p className="font-serif text-sm tracking-wider text-[#c9a227]/70 uppercase">Omen — Heed the Warning</p>
                  <p className="font-serif text-xs italic text-[#c9a227]/30 mt-1">Dark forces stir at the edges of perception.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#111111] border border-[#c9a227]/20 border-l-2 border-l-[#8b1a1a]">
                <span className="text-[#8b1a1a] font-serif flex-shrink-0 mt-0.5 text-lg">✕</span>
                <div>
                  <p className="font-serif text-sm tracking-wider text-[#8b1a1a] uppercase">Cursed — Ritual Failed</p>
                  <p className="font-serif text-xs italic text-[#c9a227]/30 mt-1">Something ancient and malevolent has intervened.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#111111] border border-[#c9a227]/20 border-l-2 border-l-[#4a2d6e]">
                <span className="text-[#4a2d6e] font-serif flex-shrink-0 mt-0.5 text-lg">ℹ</span>
                <div>
                  <p className="font-serif text-sm tracking-wider text-[#4a2d6e] uppercase">Prophecy — Ancient Knowledge</p>
                  <p className="font-serif text-xs italic text-[#c9a227]/30 mt-1">The scrolls speak of things yet to come.</p>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Dropdown & tags */}
          <RevealBlock delay={0.4}>
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {/* Dropdown */}
              <div>
                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-4">
                  Sacred Archive — Dropdown
                </p>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-full px-5 py-3 bg-[#111111] border border-[#c9a227]/30 font-serif text-sm tracking-wider text-[#c9a227]/70 flex items-center justify-between hover:border-[#c9a227]/60 transition-all duration-300"
                  >
                    <span>Select Chapter</span>
                    <span
                      className="text-[#c9a227]/50 font-serif text-xs transition-transform duration-300"
                      style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}
                    >
                      ▾
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-px bg-[#0d0d0d] border border-[#c9a227]/30 z-20">
                      {[
                        "Genesis — In principio",
                        "Exodus — The Long March",
                        "Psalms — Songs of Darkness",
                        "Revelation — The Final Arch",
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() => setIsDropdownOpen(false)}
                          className="w-full px-5 py-3 text-left font-serif text-sm text-[#c9a227]/60 hover:text-[#c9a227] hover:bg-[#c9a227]/5 border-b border-[#c9a227]/10 last:border-b-0 transition-all duration-200 tracking-wider"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-4">
                  Sigilla — Orders & Badges
                </p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {["Templar", "Hospitaller", "Teutonic", "Santiago", "Calatrava"].map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1 font-serif text-xs tracking-widest uppercase border border-[#c9a227]/30 text-[#c9a227]/60 hover:border-[#c9a227]/60 hover:text-[#c9a227] hover:bg-[#c9a227]/5 cursor-pointer transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-1 font-serif text-xs tracking-widest uppercase bg-[#c9a227] text-[#0a0a0a]">Blessed</span>
                    <span className="px-4 py-1 font-serif text-xs tracking-widest uppercase bg-[#8b1a1a] text-[#c9a227]">Cursed</span>
                    <span className="px-4 py-1 font-serif text-xs tracking-widest uppercase bg-[#2d1b4e] text-[#c9a227]">Sealed</span>
                    <span className="px-4 py-1 font-serif text-xs tracking-widest uppercase border border-[#c9a227]/20 text-[#c9a227]/30 cursor-not-allowed">Forbidden</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Illuminated Manuscripts Section ── */}
      <section className="py-20 md:py-28 px-6 border-t border-[#c9a227]/10" style={{ background: "#0a0a0a" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock delay={0}>
            <SectionHeader eyebrow="Vitae Sanctorum" title="Illuminated Manuscripts" />
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  numeral: "I",
                  title: "The Hours",
                  subtitle: "Horae Canonicae",
                  desc: "From Matins before dawn to Compline at dusk, the canonical hours organize sacred time. Each hour is a brushstroke in the illuminated manuscript of the day.",
                  accent: "#c9a227",
                },
                {
                  numeral: "II",
                  title: "The Bestiary",
                  subtitle: "Liber Bestiarum",
                  desc: "Fantastic creatures populate the margins of medieval manuscripts. Each beast a symbol encrypted in vellum — dragons for sin, unicorns for purity.",
                  accent: "#8b1a1a",
                },
                {
                  numeral: "III",
                  title: "The Psalter",
                  subtitle: "Psalterium Aureum",
                  desc: "The Golden Psalter of St. Gallen: each page a devotional labor lasting months. Gold leaf laid over gesso catches candlelight and sanctifies the written word.",
                  accent: "#4a2d6e",
                },
              ].map((item) => (
                <div
                  key={item.numeral}
                  className="group relative bg-[#111111] border border-[#c9a227]/20 p-8 overflow-hidden cursor-pointer hover:border-[#c9a227]/50 hover:shadow-[0_0_40px_rgba(201,162,39,0.2)] transition-all duration-700"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${item.accent}20, transparent 60%)` }}
                  />
                  <GoldCorner position="tl" />
                  <GoldCorner position="br" />
                  <div
                    className="absolute top-3 right-5 font-serif text-6xl opacity-5 select-none"
                    style={{ color: item.accent }}
                  >
                    {item.numeral}
                  </div>
                  <p className="font-serif text-xs italic mb-2" style={{ color: `${item.accent}65` }}>
                    {item.subtitle}
                  </p>
                  <h3
                    className="font-serif text-xl tracking-wider uppercase mb-3 transition-colors duration-300"
                    style={{ color: item.accent }}
                  >
                    {item.title}
                  </h3>
                  <div
                    className="h-px w-8 group-hover:w-full mb-4 transition-all duration-700"
                    style={{ background: `${item.accent}55` }}
                  />
                  <p className="font-serif italic text-sm text-[#c9a227]/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Quote block */}
          <RevealBlock delay={0.2}>
            <div className="group relative bg-[#111111] border border-[#c9a227]/20 p-10 md:p-14 hover:shadow-[0_0_40px_rgba(201,162,39,0.12)] transition-all duration-700">
              <GoldCorner position="tl" />
              <GoldCorner position="tr" />
              <GoldCorner position="bl" />
              <GoldCorner position="br" />
              <div className="flex justify-center mb-8">
                <FleurDeLis size={48} opacity={0.35} />
              </div>
              <blockquote className="text-center max-w-2xl mx-auto">
                <p className="font-serif text-xl md:text-2xl italic text-[#c9a227]/65 leading-relaxed mb-6">
                  &ldquo;Architecture is frozen music, and Gothic architecture is the grandest symphony ever composed in stone — a hymn to the infinite, written in arches and shadows.&rdquo;
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-[#c9a227]/30" />
                  <footer className="font-serif text-xs tracking-[0.4em] uppercase text-[#c9a227]/35">
                    Schopenhauer · Adapted
                  </footer>
                  <div className="h-px w-12 bg-[#c9a227]/30" />
                </div>
              </blockquote>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Design Rules Section ── */}
      <section className="py-20 md:py-28 px-6 border-t border-[#c9a227]/10" style={{ background: "#0d0a14" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock delay={0}>
            <SectionHeader eyebrow="Regulae Monasticae" title="Sacred Rules" />
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Do */}
              <div className="group relative bg-[#111111] border border-[#c9a227]/20 p-8 hover:border-[#c9a227]/40 hover:shadow-[0_0_40px_rgba(201,162,39,0.1)] transition-all duration-700">
                <GoldCorner position="tl" />
                <GoldCorner position="br" />
                <h3 className="font-serif text-xl tracking-wider uppercase text-[#c9a227] mb-6 flex items-center gap-3">
                  <span className="text-[#c9a227] font-serif text-lg">†</span>
                  Mandatum — Must Follow
                </h3>
                <ul className="space-y-4">
                  {[
                    "Deep purple, blood red, near-black as the foundation palette",
                    "Gold (#c9a227) accents for all luminous focal points",
                    "Serif fonts for all titles, headings, and body text",
                    "tracking-wider or tracking-widest on all important text",
                    "Dark backgrounds throughout — no white or light sections",
                    "Gold borders at 20–60% opacity for structural definition",
                    "Pointed arch shapes and upward-reaching compositions",
                    "Latin mottos and italicized phrases for gravitas",
                    "Slow transitions (duration-700) for candlelight feel",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="text-[#c9a227] font-serif mt-0.5 flex-shrink-0">†</span>
                      <span className="font-serif text-sm italic text-[#c9a227]/60">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don't */}
              <div className="group relative bg-[#111111] border border-[#8b1a1a]/30 p-8 hover:border-[#8b1a1a]/50 hover:shadow-[0_0_40px_rgba(139,26,26,0.12)] transition-all duration-700">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#8b1a1a]/10 group-hover:border-[#8b1a1a]/60 transition-all duration-700" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#8b1a1a]/10 group-hover:border-[#8b1a1a]/60 transition-all duration-700" />
                <h3 className="font-serif text-xl tracking-wider uppercase text-[#8b1a1a] mb-6 flex items-center gap-3">
                  <span className="text-[#8b1a1a] font-serif text-lg">×</span>
                  Prohibitum — Never Do
                </h3>
                <ul className="space-y-4">
                  {[
                    "Bright or cheerful colors — pastels, neons, vivid primaries",
                    "Cute, rounded, or playful design elements",
                    "Modern sans-serif as main title fonts",
                    "Overly minimalist design stripped of ornament",
                    "White or very light section backgrounds",
                    "Casual or informal tone in copy or labels",
                    "Flat, shadowless modern UI patterns",
                    "Horizontal sprawl instead of vertical aspiration",
                    "Quick bouncy or spring-like animations",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="text-[#8b1a1a] font-serif mt-0.5 flex-shrink-0">×</span>
                      <span className="font-serif text-sm italic text-[#c9a227]/50">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealBlock>

          {/* Interaction principles */}
          <RevealBlock delay={0.2}>
            <div className="mt-10 group relative bg-[#111111] border border-[#c9a227]/20 p-8 hover:shadow-[0_0_40px_rgba(201,162,39,0.1)] transition-all duration-700">
              <GoldCorner position="tl" />
              <GoldCorner position="tr" />
              <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
                Motus Animarum — Interaction Principles
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Candlelight Enhancement",
                    code: "duration-700",
                    desc: "All hover transitions take 700ms — the unhurried flicker of a candle, never the snap of electricity.",
                  },
                  {
                    name: "Gold Border Glow",
                    code: "hover:shadow-[0_0_40px_rgba(201,162,39,0.2)]",
                    desc: "On hover, borders intensify and a soft gold halo appears, as if touched by sacred light from within.",
                  },
                  {
                    name: "Shadow Intensification",
                    code: "group-hover:border-[#c9a227]/80",
                    desc: "Corner ornaments sharpen from faint traces to vivid gold on interaction, revealing hidden structure.",
                  },
                ].map((principle) => (
                  <div key={principle.name} className="border-l border-[#c9a227]/20 pl-5">
                    <h4 className="font-serif text-sm tracking-wider text-[#c9a227]/80 mb-2 uppercase">
                      {principle.name}
                    </h4>
                    <code className="text-xs text-[#c9a227]/35 font-mono block mb-3">
                      {principle.code}
                    </code>
                    <p className="font-serif italic text-xs text-[#c9a227]/45 leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-[#c9a227]/30" style={{ background: "#0a0a0a" }}>
        {/* Cathedral-inspired gold top ornament */}
        <div className="flex items-center justify-center py-4 border-b border-[#c9a227]/10">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#c9a227]/30" />
          <div className="mx-4 flex items-center gap-3">
            <FleurDeLis size={20} opacity={0.4} />
            <span className="font-serif text-xs text-[#c9a227]/25 tracking-[0.6em] uppercase">
              Gothic · StyleKit
            </span>
            <FleurDeLis size={20} opacity={0.4} />
          </div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#c9a227]/30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-serif text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 italic mb-1">
                In tenebris lux — In darkness, light
              </p>
              <p className="font-serif text-xs text-[#c9a227]/20 tracking-wider">
                哥特式风格 · Medieval Cathedral Aesthetics
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <RoseWindowSVG size={56} />
              <p className="font-serif text-xs text-[#c9a227]/20 tracking-widest uppercase">GOTHIC</p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <Link
                href="/styles/gothic"
                className="font-serif text-xs tracking-widest uppercase text-[#c9a227]/40 hover:text-[#c9a227]/70 transition-colors duration-300"
              >
                Documentation →
              </Link>
              <Link
                href="/styles"
                className="font-serif text-xs tracking-widest uppercase text-[#c9a227]/30 hover:text-[#c9a227]/60 transition-colors duration-300"
              >
                StyleKit →
              </Link>
            </div>
          </div>

          {/* Bottom divider */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a227]/15" />
            <span className="font-serif text-xs text-[#c9a227]/20 tracking-widest">✦</span>
            <span className="font-serif text-xs text-[#c9a227]/10 italic">
              Aedificatum in aeternum
            </span>
            <span className="font-serif text-xs text-[#c9a227]/20 tracking-widest">✦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a227]/15" />
          </div>
        </div>
      </footer>
    </div>
  );
}
