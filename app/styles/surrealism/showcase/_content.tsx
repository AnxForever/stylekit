"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const dreamTabs = ["Dream I", "Dream II", "Dream III"] as const;
type DreamTab = typeof dreamTabs[number];

const dreamCards: Record<DreamTab, { title: string; subtitle: string; desc: string; orb1: string; orb2: string; orb3: string }[]> = {
  "Dream I": [
    {
      title: "The Persistence of Memory",
      subtitle: "Time",
      desc: "Hours bend and pour like liquid gold across stone archways that remember nothing.",
      orb1: "bg-[#d4a574]/25",
      orb2: "bg-[#c38d94]/20",
      orb3: "bg-[#4a3f6b]/15",
    },
    {
      title: "Elephants of Desire",
      subtitle: "Weight",
      desc: "Towering figures on impossibly thin legs stride through a dusk that never arrives.",
      orb1: "bg-[#d4a574]/30",
      orb2: "bg-[#c38d94]/25",
      orb3: "bg-[#4a3f6b]/20",
    },
    {
      title: "The Burning Giraffe",
      subtitle: "Metamorphosis",
      desc: "Flame and form merge at the half-light of awakening, neither solid nor air.",
      orb1: "bg-[#d4a574]/20",
      orb2: "bg-[#c38d94]/30",
      orb3: "bg-[#4a3f6b]/15",
    },
  ],
  "Dream II": [
    {
      title: "Eye of the Unconscious",
      subtitle: "Portal",
      desc: "An iris opens onto landscapes that only sleep reveals to those who wait.",
      orb1: "bg-[#4a3f6b]/30",
      orb2: "bg-[#d4a574]/20",
      orb3: "bg-[#c38d94]/15",
    },
    {
      title: "The Dream Chamber",
      subtitle: "Space",
      desc: "Architecture folding inward upon itself in perpetual recursion, stairways to rooms unseen.",
      orb1: "bg-[#4a3f6b]/25",
      orb2: "bg-[#d4a574]/25",
      orb3: "bg-[#c38d94]/20",
    },
    {
      title: "Swans Reflecting Elephants",
      subtitle: "Reflection",
      desc: "The mirror shows what the eye refuses — a world inverted in the still lake of the mind.",
      orb1: "bg-[#4a3f6b]/20",
      orb2: "bg-[#d4a574]/30",
      orb3: "bg-[#c38d94]/25",
    },
  ],
  "Dream III": [
    {
      title: "Melting Clocks",
      subtitle: "Entropy",
      desc: "Time is not lost. It merely changes shape, pooling in corners where no one thinks to look.",
      orb1: "bg-[#c38d94]/30",
      orb2: "bg-[#4a3f6b]/25",
      orb3: "bg-[#d4a574]/20",
    },
    {
      title: "Soft Construction",
      subtitle: "Form",
      desc: "Bones become rivers. Skin becomes canvas. The body forgets the rules it was given at birth.",
      orb1: "bg-[#c38d94]/25",
      orb2: "bg-[#4a3f6b]/20",
      orb3: "bg-[#d4a574]/30",
    },
    {
      title: "Invisible Harp",
      subtitle: "Sound",
      desc: "Music plays in a room with no walls, the notes dissolving before they reach the ear.",
      orb1: "bg-[#c38d94]/20",
      orb2: "bg-[#4a3f6b]/30",
      orb3: "bg-[#d4a574]/25",
    },
  ],
};

const colorPalette = [
  { name: "Midnight", hex: "#1a1a3e", glowColor: "rgba(26,26,62,0.4)", textColor: "#f0ece4" },
  { name: "Cream", hex: "#f0ece4", glowColor: "rgba(240,236,228,0.4)", textColor: "#1a1a3e" },
  { name: "Desert Gold", hex: "#d4a574", glowColor: "rgba(212,165,116,0.5)", textColor: "#1a1a3e" },
  { name: "Rose Dust", hex: "#c38d94", glowColor: "rgba(195,141,148,0.5)", textColor: "#1a1a3e" },
  { name: "Deep Purple", hex: "#4a3f6b", glowColor: "rgba(74,63,107,0.5)", textColor: "#f0ece4" },
];

const doRules = [
  { title: "Dream-like Distortion", body: "hover:skew-x-2 hover:-rotate-1 — the dreamscape never holds still." },
  { title: "Timeless Easing", body: "duration-700 minimum, prefer duration-1000. The dream breathes slowly." },
  { title: "Abyssal Glow", body: "hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] — light rises from within, never falls from above." },
  { title: "Color Melting", body: "Orbs expand group-hover:scale-150 over 2000ms — color bleeds at the edges of consciousness." },
  { title: "Expanding Underline", body: "group-hover:w-full transition-all duration-1000 — the line follows like a slow tide." },
  { title: "Serif Italic Everything", body: "font-serif italic for all expressive text. Rationality has no place here." },
];

const dontRules = [
  { title: "No Scale-105 Alone", body: "hover:scale-105 is the language of the rational. Use skew and rotate instead." },
  { title: "No Black Shadows", body: "drop-shadow with black kills the dream. Abyssal Glow only — rose and gold diffuse." },
  { title: "No Fast Transitions", body: "duration-200 is a jolt. The dream world moves at duration-700 or slower, always." },
  { title: "No Static Orbs", body: "Decorative orbs without group-hover:scale-150 duration-[2000ms] are dead weight." },
  { title: "No Perfect Symmetry", body: "Equal grids betray the dream. Asymmetry is not an error — it is the design." },
  { title: "No Neon or Harsh Hues", body: "Bright neon does not exist in the subconscious. Muted, muted, always muted." },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
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
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Orb({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

function SurrealButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  if (variant === "secondary") {
    return (
      <button className="px-8 py-3.5 bg-transparent text-[#d4a574] font-serif italic tracking-wide border border-[#d4a574]/40 rounded-full hover:bg-[#d4a574]/10 hover:shadow-[0_0_30px_rgba(212,165,116,0.2)] hover:skew-x-1 hover:-rotate-[0.5deg] transition-all duration-700 ease-in-out">
        {children}
      </button>
    );
  }
  if (variant === "ghost") {
    return (
      <button className="px-8 py-3.5 bg-transparent text-[#c38d94] font-serif italic tracking-wide border border-[#c38d94]/30 rounded-[30%_70%_60%_40%/40%_40%_60%_60%] hover:bg-[#c38d94]/10 hover:shadow-[0_0_30px_rgba(195,141,148,0.2)] hover:skew-x-2 hover:-rotate-1 transition-all duration-1000 ease-in-out">
        {children}
      </button>
    );
  }
  return (
    <button className="px-10 py-4 bg-gradient-to-br from-[#1a1a3e] to-[#4a3f6b] text-[#f0ece4] font-serif italic tracking-wide border border-[#d4a574]/40 rounded-[40%_60%_70%_30%/30%_30%_70%_70%] shadow-[0_4px_24px_rgba(195,141,148,0.15)] hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] hover:-translate-y-1 hover:skew-x-2 hover:-rotate-1 active:translate-y-0 active:skew-x-0 active:rotate-0 transition-all duration-1000 ease-in-out">
      {children}
    </button>
  );
}

function SurrealInput() {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-serif italic text-[#d4a574]/70 tracking-widest">
        Whisper your dreams...
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="What did you dream last night?"
          className="w-full px-6 py-4 bg-[#f0ece4] border border-[#d4a574]/30 rounded-2xl text-[#1a1a3e] placeholder-[#c38d94]/40 font-serif italic focus:border-[#c38d94]/60 focus:shadow-[0_0_20px_rgba(195,141,148,0.25)] focus:outline-none transition-all duration-700"
        />
        <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-[#d4a574]/5 via-transparent to-[#c38d94]/5" />
      </div>
      <p className="text-[10px] font-serif italic text-[#c38d94]/40 pl-1">
        No dream is too strange to be written down.
      </p>
    </div>
  );
}

function DreamGalleryCard({
  item,
  index,
}: {
  item: { title: string; subtitle: string; desc: string; orb1: string; orb2: string; orb3: string };
  index: number;
}) {
  const offsets = ["mt-0", "mt-6 md:mt-10", "mt-0 md:-mt-4"];
  const widths = ["md:w-[34%]", "md:w-[33%]", "md:w-[33%]"];

  return (
    <RevealBlock delay={index * 0.1} className={`flex-shrink-0 w-full ${widths[index]} ${offsets[index]}`}>
      <div className="group relative overflow-hidden rounded-2xl border border-[#d4a574]/20 bg-[#f0ece4] p-8 cursor-pointer hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] hover:skew-x-2 hover:-rotate-1 transition-all duration-700 ease-in-out min-h-[220px]">
        {/* Melting orb top-right */}
        <div className={`absolute -top-10 -right-10 w-36 h-36 rounded-full ${item.orb1} blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out`} />
        {/* Melting orb bottom-left */}
        <div className={`absolute -bottom-8 -left-8 w-28 h-28 rounded-full ${item.orb2} blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out`} />
        {/* Melting orb center */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full ${item.orb3} blur-xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out`} />

        <div className="relative z-10">
          <span className="text-[10px] font-serif italic text-[#c38d94]/60 tracking-[0.25em] uppercase">
            {item.subtitle}
          </span>
          <h3 className="text-xl font-serif italic text-[#1a1a3e] mt-1.5 mb-2 group-hover:tracking-widest transition-all duration-1000 ease-in-out leading-tight">
            {item.title}
          </h3>
          <div className="relative h-px mb-4">
            <div className="absolute inset-0 bg-[#d4a574]/20" />
            <div className="absolute inset-y-0 left-0 w-8 bg-[#d4a574] group-hover:w-full transition-all duration-1000 ease-in-out" />
          </div>
          <p className="text-[#1a1a3e]/55 font-serif text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </RevealBlock>
  );
}

function WatercolorSwatch({
  color,
  index,
}: {
  color: typeof colorPalette[0];
  index: number;
}) {
  return (
    <RevealBlock delay={index * 0.07} className="flex flex-col items-center gap-4">
      <div className="relative group cursor-default">
        {/* Outer glow blob */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-110 transition-all duration-1000 ease-in-out"
          style={{ backgroundColor: color.hex }}
        />
        {/* Main circle */}
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden group-hover:skew-x-1 group-hover:-rotate-1 transition-all duration-700 ease-in-out"
          style={{ backgroundColor: color.hex, boxShadow: `0 8px 32px ${color.glowColor}` }}
        >
          {/* Inner diffuse orb */}
          <div
            className="w-10 h-10 rounded-full blur-md opacity-30 group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out"
            style={{ backgroundColor: color.textColor }}
          />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-serif italic text-[#1a1a3e]/70 tracking-wide">{color.name}</p>
        <p className="text-[10px] font-mono text-[#d4a574]/60 mt-0.5">{color.hex}</p>
      </div>
    </RevealBlock>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeDreamTab, setActiveDreamTab] = useState<DreamTab>("Dream I");
  const [activeComponentTab, setActiveComponentTab] = useState<"button" | "input" | "card">("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a3e] text-[#f0ece4]">
      <style>{`
        @keyframes surreal-drift {
          0%, 100% { transform: translateY(0px) rotate(0deg) skewX(0deg); }
          33% { transform: translateY(-14px) rotate(1.5deg) skewX(0.5deg); }
          66% { transform: translateY(-6px) rotate(-1deg) skewX(-0.5deg); }
        }
        @keyframes surreal-pulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.08); }
        }
        @keyframes surreal-melt {
          0%, 100% { border-radius: 40% 60% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 50% 70% / 40% 70% 30% 60%; }
          75% { border-radius: 70% 30% 60% 40% / 30% 60% 40% 70%; }
        }
        .surreal-drift { animation: surreal-drift 9s ease-in-out infinite; }
        .surreal-pulse { animation: surreal-pulse 6s ease-in-out infinite; }
        .surreal-melt { animation: surreal-melt 12s ease-in-out infinite; }
      `}</style>

      {/* ===================================================================
          Navigation
      =================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f0ece4]/95 backdrop-blur-md border-b border-[#d4a574]/20">
        <div className="relative overflow-hidden">
          {/* Nav orb decorations */}
          <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#d4a574]/20 blur-2xl pointer-events-none" aria-hidden="true" />
          <div className="absolute right-32 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#c38d94]/15 blur-2xl pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between h-16 md:h-18">
              <Link
                href="/styles/surrealism/showcase"
                className="font-serif italic text-xl text-[#1a1a3e] tracking-wider hover:text-[#d4a574] transition-colors duration-700"
              >
                Surrealism
              </Link>

              <nav className="flex items-center gap-1">
                <Link
                  href="/styles/surrealism"
                  className="group relative px-4 py-2 font-serif italic text-xs text-[#1a1a3e]/50 tracking-widest hover:text-[#1a1a3e] transition-colors duration-700"
                >
                  <span>Docs</span>
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-[#d4a574] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left" />
                </Link>
                <Link
                  href="/styles"
                  className="group relative px-4 py-2 font-serif italic text-xs text-[#1a1a3e]/50 tracking-widest hover:text-[#1a1a3e] transition-colors duration-700"
                >
                  <span>All Styles</span>
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-[#d4a574] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left" />
                </Link>
                <Link
                  href="/styles"
                  className="ml-3 px-5 py-2 font-serif italic text-xs text-[#1a1a3e] border border-[#d4a574]/40 rounded-full hover:bg-[#d4a574]/15 hover:shadow-[0_0_20px_rgba(212,165,116,0.2)] hover:skew-x-1 hover:-rotate-[0.5deg] transition-all duration-700 ease-in-out"
                >
                  Back
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================
          Hero — midnight bg, blurred orbs, giant serif italic title
      =================================================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background orb field */}
        <Orb className="top-[12%] right-[8%] w-80 h-80 bg-[#d4a574]/12 surreal-pulse" />
        <Orb className="top-[55%] right-[20%] w-48 h-48 bg-[#d4a574]/10" />
        <Orb className="bottom-[20%] left-[6%] w-64 h-64 bg-[#c38d94]/12 surreal-pulse" style={{ animationDelay: "2s" }} />
        <Orb className="top-[30%] left-[12%] w-40 h-40 bg-[#4a3f6b]/20 surreal-pulse" style={{ animationDelay: "4s" }} />
        <Orb className="top-[70%] left-[45%] w-32 h-32 bg-[#c38d94]/8" />
        <Orb className="bottom-[35%] right-[5%] w-52 h-52 bg-[#4a3f6b]/15" />

        {/* Floating decorative blob */}
        <div
          className="surreal-drift absolute left-[8%] top-[40%] w-16 h-16 bg-[#d4a574]/8 surreal-melt blur-sm pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="surreal-drift absolute right-[12%] top-[25%] w-10 h-10 bg-[#c38d94]/10 surreal-melt blur-sm pointer-events-none"
          style={{ animationDelay: "3s" }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <p
            className="text-[11px] font-serif italic text-[#d4a574]/60 tracking-[0.5em] mb-8 uppercase"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            StyleKit — Design System
          </p>

          {/* Giant title */}
          <h1
            className="font-serif italic leading-[0.88] tracking-tight mb-8 select-none"
            style={{
              fontSize: "clamp(4.5rem, 14vw, 11rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0) skewX(0deg)" : "translateY(48px) skewX(-3deg)",
              transition: "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            <span className="text-[#f0ece4]">Sur</span>
            <span className="text-[#d4a574]">real</span>
            <span className="text-[#c38d94]">ism</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-2xl font-serif italic text-[#d4a574]/80 mb-4 tracking-wide"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            Beyond the threshold of consciousness
          </p>

          <p
            className="text-base font-serif italic text-[#f0ece4]/40 max-w-lg mx-auto mb-14 leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            Where dreams dissolve the boundaries of reason and the subconscious
            paints with impossible colors that no daylight can replicate.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            <SurrealButton>Enter the Dream</SurrealButton>
            <SurrealButton variant="secondary">Observe from Here</SurrealButton>
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-20 flex flex-col items-center gap-2"
            style={{
              opacity: heroRevealed ? 0.4 : 0,
              transition: "opacity 1s ease 1.2s",
            }}
          >
            <span className="text-[10px] font-serif italic text-[#d4a574]/60 tracking-[0.4em]">Descend</span>
            <div className="w-px h-10 bg-gradient-to-b from-[#d4a574]/40 to-transparent" />
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1a1a3e] to-transparent pointer-events-none" aria-hidden="true" />
      </section>

      {/* ===================================================================
          Dream Gallery — tab switcher + asymmetric card layout
      =================================================================== */}
      <section className="py-28 md:py-36 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <RevealBlock className="mb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="text-[10px] font-serif italic text-[#c38d94]/60 tracking-[0.4em] uppercase block mb-3">
                  The Gallery
                </span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-[#f0ece4] leading-tight">
                  Dream<span className="text-[#d4a574]">scapes</span>
                </h2>
              </div>
              <p className="text-sm font-serif italic text-[#f0ece4]/35 max-w-xs md:text-right leading-relaxed">
                Visions pulled from the boundary between sleep and waking, rendered in muted dreamscape hues.
              </p>
            </div>
          </RevealBlock>

          {/* Dream tab switcher */}
          <RevealBlock delay={0.08} className="mb-12">
            <div className="flex gap-2 flex-wrap">
              {dreamTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDreamTab(tab)}
                  className={`px-6 py-2.5 font-serif italic text-sm tracking-wider rounded-full border transition-all duration-700 ease-in-out ${
                    activeDreamTab === tab
                      ? "bg-[#d4a574]/20 border-[#d4a574]/50 text-[#d4a574] shadow-[0_0_20px_rgba(212,165,116,0.15)]"
                      : "bg-transparent border-[#f0ece4]/10 text-[#f0ece4]/35 hover:text-[#f0ece4]/60 hover:border-[#f0ece4]/20"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Asymmetric card row */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-4 md:items-start">
            {dreamCards[activeDreamTab].map((item, i) => (
              <DreamGalleryCard key={`${activeDreamTab}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          Component Showcase — cream bg section
      =================================================================== */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-[#f0ece4] relative overflow-hidden">
        {/* Background orbs on cream */}
        <Orb className="top-12 right-16 w-56 h-56 bg-[#d4a574]/15" />
        <Orb className="bottom-16 left-12 w-48 h-48 bg-[#c38d94]/12" />
        <Orb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4a3f6b]/6" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealBlock>
            <div className="mb-14 text-center">
              <span className="text-[10px] font-serif italic text-[#d4a574]/60 tracking-[0.4em] uppercase block mb-3">
                Elements
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a3e]">
                Components of the Dream
              </h2>
            </div>
          </RevealBlock>

          {/* Component tab switcher */}
          <RevealBlock delay={0.08} className="mb-10">
            <div className="flex justify-center gap-2">
              {(["button", "input", "card"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveComponentTab(tab)}
                  className={`px-7 py-2.5 font-serif italic text-sm tracking-wider rounded-full border transition-all duration-700 ease-in-out ${
                    activeComponentTab === tab
                      ? "bg-[#1a1a3e] border-[#1a1a3e] text-[#f0ece4] shadow-[0_0_24px_rgba(26,26,62,0.2)]"
                      : "bg-transparent border-[#1a1a3e]/20 text-[#1a1a3e]/50 hover:text-[#1a1a3e]/80 hover:border-[#1a1a3e]/35"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Component panel */}
          <RevealBlock delay={0.14}>
            <div className="relative rounded-3xl bg-white/60 border border-[#d4a574]/20 p-10 md:p-14 overflow-hidden backdrop-blur-sm">
              <Orb className="top-0 right-0 w-32 h-32 bg-[#d4a574]/10" />
              <Orb className="bottom-0 left-0 w-28 h-28 bg-[#c38d94]/10" />

              <div className="relative z-10 flex flex-col items-center gap-8">
                {activeComponentTab === "button" && (
                  <>
                    <div className="flex flex-col sm:flex-row gap-5 items-center flex-wrap justify-center">
                      <SurrealButton>Enter the Dream</SurrealButton>
                      <SurrealButton variant="secondary">Observe</SurrealButton>
                      <SurrealButton variant="ghost">Dissolve</SurrealButton>
                    </div>
                    <div className="text-center space-y-1.5">
                      <p className="text-xs font-serif italic text-[#1a1a3e]/40 tracking-wider">
                        Primary — organic blob border-radius, Dream-like Distortion skew+rotate, Abyssal Glow
                      </p>
                      <p className="text-xs font-serif italic text-[#1a1a3e]/30 tracking-wider">
                        All transitions at duration-700 to duration-1000 ease-in-out minimum
                      </p>
                    </div>
                  </>
                )}

                {activeComponentTab === "input" && (
                  <>
                    <div className="w-full max-w-md">
                      <SurrealInput />
                    </div>
                    <div className="text-center space-y-1.5">
                      <p className="text-xs font-serif italic text-[#1a1a3e]/40 tracking-wider">
                        Serif italic placeholder, rose-dust border on focus
                      </p>
                      <p className="text-xs font-serif italic text-[#1a1a3e]/30 tracking-wider">
                        Abyssal Glow focus ring — no black shadow ever
                      </p>
                    </div>
                  </>
                )}

                {activeComponentTab === "card" && (
                  <>
                    <div className="w-full max-w-md">
                      <div className="group relative overflow-hidden rounded-2xl border border-[#d4a574]/20 bg-white/80 p-8 cursor-pointer hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] hover:skew-x-2 hover:-rotate-1 transition-all duration-700 ease-in-out">
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#d4a574]/20 blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out" />
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#c38d94]/20 blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out" />
                        <div className="relative z-10">
                          <span className="text-[10px] font-serif italic text-[#c38d94]/60 tracking-[0.3em] uppercase">Time</span>
                          <h3 className="text-xl font-serif italic text-[#1a1a3e] mt-1.5 mb-2 group-hover:tracking-widest transition-all duration-1000 ease-in-out">
                            The Persistence of Memory
                          </h3>
                          <div className="relative h-px mb-4">
                            <div className="absolute inset-0 bg-[#d4a574]/15" />
                            <div className="absolute inset-y-0 left-0 w-8 bg-[#d4a574] group-hover:w-full transition-all duration-1000 ease-in-out" />
                          </div>
                          <p className="text-[#1a1a3e]/50 font-serif text-sm leading-relaxed">
                            Hours bend and pour like liquid gold across stone archways that remember nothing.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center space-y-1.5">
                      <p className="text-xs font-serif italic text-[#1a1a3e]/40 tracking-wider">
                        Color Melting orbs expand over 2000ms on hover
                      </p>
                      <p className="text-xs font-serif italic text-[#1a1a3e]/30 tracking-wider">
                        Title tracking expands (duration-1000) — underline extends from w-8 to w-full
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===================================================================
          Color System — watercolor blob swatches, midnight bg
      =================================================================== */}
      <section className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden">
        <Orb className="top-20 left-1/4 w-72 h-72 bg-[#4a3f6b]/12 surreal-pulse" />
        <Orb className="bottom-20 right-1/4 w-56 h-56 bg-[#d4a574]/8" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-20">
              <span className="text-[10px] font-serif italic text-[#d4a574]/55 tracking-[0.4em] uppercase block mb-3">
                Palette
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#f0ece4]">
                Colors of the <span className="text-[#d4a574]">Subconscious</span>
              </h2>
              <p className="text-sm font-serif italic text-[#f0ece4]/30 mt-4 max-w-sm mx-auto leading-relaxed">
                Each hue is a memory half-remembered — muted, dreamlike, never harsh.
              </p>
            </div>
          </RevealBlock>

          {/* Watercolor blob swatches — slightly irregular spacing */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 md:gap-x-12">
            {colorPalette.map((color, i) => (
              <WatercolorSwatch key={color.hex} color={color} index={i} />
            ))}
          </div>

          {/* Gradient bar */}
          <RevealBlock delay={0.3} className="mt-20">
            <div className="relative h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, #1a1a3e, #4a3f6b, #c38d94, #d4a574, #f0ece4)" }}>
              <div className="absolute inset-0 blur-sm opacity-60" style={{ background: "linear-gradient(to right, #1a1a3e, #4a3f6b, #c38d94, #d4a574, #f0ece4)" }} />
            </div>
            <p className="text-center text-[10px] font-serif italic text-[#f0ece4]/25 tracking-widest mt-4">
              Midnight to Cream — the full spectrum of the dream
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ===================================================================
          Design Philosophy — dream journal entries, cream bg
      =================================================================== */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-[#f0ece4] relative overflow-hidden">
        <Orb className="top-16 right-16 w-52 h-52 bg-[#d4a574]/12" />
        <Orb className="bottom-20 left-20 w-44 h-44 bg-[#c38d94]/10" />
        <Orb className="top-1/3 left-1/3 w-36 h-36 bg-[#4a3f6b]/6" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <div className="mb-16">
              <span className="text-[10px] font-serif italic text-[#c38d94]/55 tracking-[0.4em] uppercase block mb-3">
                Manifesto
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a3e] leading-tight">
                Laws of the <span className="text-[#d4a574]">Dream</span>
              </h2>
              <p className="text-sm font-serif italic text-[#1a1a3e]/45 mt-4 max-w-sm leading-relaxed">
                A dream journal for designers. Written in the half-light between intention and intuition.
              </p>
            </div>
          </RevealBlock>

          {/* Asymmetric two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-6 md:gap-8">
            {/* Do column — dream journal style */}
            <RevealBlock delay={0.06}>
              <div className="relative p-8 md:p-10 rounded-3xl bg-white/70 border border-[#d4a574]/20 overflow-hidden backdrop-blur-sm">
                <Orb className="-top-6 -right-6 w-24 h-24 bg-[#d4a574]/15" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#d4a574]" />
                    <h3 className="font-serif italic text-[#1a1a3e] text-base tracking-widest">Embrace</h3>
                  </div>
                  <ul className="space-y-5">
                    {doRules.map((rule, i) => (
                      <li key={i} className="group border-l-2 border-[#d4a574]/20 hover:border-[#d4a574] pl-4 transition-all duration-700 ease-in-out">
                        <p className="text-sm font-serif italic text-[#1a1a3e]/80 font-medium leading-snug group-hover:text-[#1a1a3e] transition-colors duration-700">
                          {rule.title}
                        </p>
                        <p className="text-xs font-serif italic text-[#1a1a3e]/45 leading-relaxed mt-1 group-hover:text-[#1a1a3e]/60 transition-colors duration-700">
                          {rule.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* Don't column — offset vertically for asymmetry */}
            <RevealBlock delay={0.12} className="md:mt-8">
              <div className="relative p-8 md:p-10 rounded-3xl bg-white/70 border border-[#c38d94]/20 overflow-hidden backdrop-blur-sm">
                <Orb className="-bottom-6 -left-6 w-24 h-24 bg-[#c38d94]/12" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c38d94]" />
                    <h3 className="font-serif italic text-[#1a1a3e] text-base tracking-widest">Resist</h3>
                  </div>
                  <ul className="space-y-5">
                    {dontRules.map((rule, i) => (
                      <li key={i} className="group border-l-2 border-[#c38d94]/20 hover:border-[#c38d94] pl-4 transition-all duration-700 ease-in-out">
                        <p className="text-sm font-serif italic text-[#1a1a3e]/80 font-medium leading-snug group-hover:text-[#1a1a3e] transition-colors duration-700">
                          {rule.title}
                        </p>
                        <p className="text-xs font-serif italic text-[#1a1a3e]/45 leading-relaxed mt-1 group-hover:text-[#1a1a3e]/60 transition-colors duration-700">
                          {rule.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===================================================================
          Interaction Reference — midnight bg, gold accents
      =================================================================== */}
      <section className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden">
        <Orb className="top-16 left-[20%] w-64 h-64 bg-[#c38d94]/10 surreal-pulse" style={{ animationDelay: "1s" }} />
        <Orb className="bottom-16 right-[15%] w-48 h-48 bg-[#d4a574]/10" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <span className="text-[10px] font-serif italic text-[#c38d94]/55 tracking-[0.4em] uppercase block mb-3">
                Interactions
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#f0ece4]">
                Physics of the <span className="text-[#d4a574]">Dreamworld</span>
              </h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4">
            {[
              {
                name: "Dream-like Distortion",
                token: "hover:skew-x-2 hover:-rotate-1",
                desc: "Nothing in the dream world stands perfectly upright. Elements tilt and drift on hover.",
                delay: 0.04,
                orbColor: "bg-[#d4a574]/15",
              },
              {
                name: "Timeless Easing",
                token: "duration-1000 ease-in-out",
                desc: "Time moves differently here. Minimum 700ms, prefer 1000ms. Never 200ms.",
                delay: 0.1,
                orbColor: "bg-[#c38d94]/15",
              },
              {
                name: "Color Melting",
                token: "group-hover:scale-150 duration-[2000ms]",
                desc: "Orb decorations expand slowly over 2 full seconds, bleeding color at the edges.",
                delay: 0.16,
                orbColor: "bg-[#4a3f6b]/20",
              },
              {
                name: "Abyssal Glow",
                token: "shadow-[0_0_50px_rgba(195,141,148,0.3)]",
                desc: "Light rises from within the element — rose and gold diffuse, never a black drop.",
                delay: 0.22,
                orbColor: "bg-[#d4a574]/15",
              },
              {
                name: "Expanding Underline",
                token: "group-hover:w-full duration-1000",
                desc: "The golden line follows like a slow tide, extending from its origin across the full width.",
                delay: 0.28,
                orbColor: "bg-[#c38d94]/15",
              },
              {
                name: "Letter-space Bloom",
                token: "group-hover:tracking-widest duration-1000",
                desc: "Characters breathe apart on hover, as if the word itself is waking up from sleep.",
                delay: 0.34,
                orbColor: "bg-[#4a3f6b]/20",
              },
            ].map((item) => (
              <RevealBlock key={item.name} delay={item.delay}>
                <div className="group relative p-6 rounded-2xl border border-[#d4a574]/12 bg-[#f0ece4]/4 overflow-hidden hover:border-[#d4a574]/30 hover:bg-[#f0ece4]/6 hover:shadow-[0_0_30px_rgba(212,165,116,0.12)] transition-all duration-700 ease-in-out cursor-default h-full">
                  <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${item.orbColor} blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out`} />
                  <div className="relative z-10">
                    <h4 className="text-base font-serif italic text-[#d4a574] mb-1.5 group-hover:tracking-wide transition-all duration-700 ease-in-out">
                      {item.name}
                    </h4>
                    <code className="text-[10px] font-mono text-[#c38d94]/60 block mb-3 leading-relaxed break-all">
                      {item.token}
                    </code>
                    <p className="text-xs font-serif italic text-[#f0ece4]/40 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          Footer — midnight dark, cream text, poetic serif italic motto
      =================================================================== */}
      <footer className="py-16 px-6 md:px-12 border-t border-[#d4a574]/10 relative overflow-hidden">
        <Orb className="-left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#d4a574]/8" />
        <Orb className="-right-10 top-1/2 -translate-y-1/2 w-28 h-28 bg-[#c38d94]/8" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Poetic motto */}
          <div className="text-center mb-12">
            <p className="text-2xl md:text-3xl font-serif italic text-[#f0ece4]/30 leading-relaxed max-w-xl mx-auto">
              Where logic dissolves, <span className="text-[#d4a574]/50">beauty begins.</span>
            </p>
          </div>

          {/* Footer nav row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#d4a574]/8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-6 bg-[#d4a574]/40 rounded-full" />
              <p className="font-serif italic text-sm text-[#f0ece4]/25 tracking-widest">
                Surrealism — StyleKit
              </p>
            </div>

            <nav className="flex items-center gap-6">
              <Link
                href="/styles/surrealism"
                className="group relative font-serif italic text-xs text-[#f0ece4]/25 tracking-widest hover:text-[#d4a574]/70 transition-colors duration-700"
              >
                Docs
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#d4a574]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left" />
              </Link>
              <Link
                href="/styles"
                className="group relative font-serif italic text-xs text-[#f0ece4]/25 tracking-widest hover:text-[#d4a574]/70 transition-colors duration-700"
              >
                All Styles
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#d4a574]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left" />
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
