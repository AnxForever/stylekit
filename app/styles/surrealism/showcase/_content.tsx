"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const galleryItems = [
  { id: 1, title: "The Persistence of Memory", category: "Dream", desc: "Time melts across desert landscapes of the mind" },
  { id: 2, title: "Elephants of Desire", category: "Subconscious", desc: "Towering figures on impossibly thin legs stride through twilight" },
  { id: 3, title: "The Burning Giraffe", category: "Metamorphosis", desc: "Flame and form merge in the half-light of awakening" },
  { id: 4, title: "Eye of the Unconscious", category: "Portal", desc: "An iris opens onto landscapes that only sleep reveals" },
  { id: 5, title: "Melting Clocks", category: "Time", desc: "Hours bend and pour like liquid gold across stone" },
  { id: 6, title: "The Dream Chamber", category: "Space", desc: "Architecture folding inward upon itself in perpetual recursion" },
];

const colorPalette = [
  { name: "Midnight", value: "#1a1a3e" },
  { name: "Desert Gold", value: "#d4a574" },
  { name: "Rose Dust", value: "#c38d94" },
  { name: "Dream Violet", value: "#4a3f6b" },
  { name: "Cream", value: "#f0ece4" },
];

const doRules = [
  "Dream-like Distortion: hover applies hover:skew-x-2 hover:-rotate-1",
  "Timeless Easing: duration-700 ease-in-out minimum, prefer duration-1000",
  "Abyssal Glow: hover shadow uses rose/gold diffuse glow, never black",
  "Color Melting: orb decorations expand group-hover:scale-150 duration-[2000ms]",
  "Use font-serif italic for dreamy atmospheric text",
  "Use soft gradients from midnight to rose and gold",
];

const dontRules = [
  "Never use hover:scale-105 -- surrealism uses skew and rotate",
  "Never use black drop shadows -- Abyssal Glow only",
  "Never use duration-200 or shorter -- Timeless Easing requires 700ms+",
  "Never use transition-none on decorative orbs -- Color Melting needs 2000ms",
  "No strict symmetric grids -- organic layouts only",
  "No bright neon colors -- muted dreamscape palette only",
];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function MeltingOrb({ className }: { className: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />
  );
}

function DreamCard({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  return (
    <RevealBlock delay={index * 0.08}>
      <div className="group relative p-8 bg-gradient-to-br from-[#f0ece4] to-[#f0ece4]/80 border border-[#d4a574]/30 rounded-2xl overflow-hidden hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] hover:-translate-y-1 hover:skew-x-1 transition-all duration-700 ease-in-out cursor-pointer">
        {/* Melting orb -- gold */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#d4a574]/20 blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out" />
        {/* Melting orb -- rose */}
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#c38d94]/20 blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out" />
        <div className="relative z-10">
          <span className="text-xs font-serif italic text-[#c38d94]/70 tracking-wider">{item.category}</span>
          <h3 className="text-2xl font-serif italic text-[#1a1a3e] mb-1 mt-1 group-hover:tracking-widest transition-all duration-1000 ease-in-out">
            {item.title}
          </h3>
          <div className="h-px bg-[#d4a574] w-8 group-hover:w-full transition-all duration-1000 ease-in-out mb-4 mt-2" />
          <p className="text-[#1a1a3e]/60 font-serif text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </RevealBlock>
  );
}

function SurrealButton({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "secondary" }) {
  if (variant === "secondary") {
    return (
      <button className="px-8 py-3.5 bg-transparent text-[#d4a574] font-serif italic tracking-wide border border-[#d4a574]/50 rounded-full hover:bg-[#d4a574]/10 hover:shadow-[0_0_30px_rgba(212,165,116,0.15)] hover:skew-x-1 hover:-rotate-[0.5deg] transition-all duration-700 ease-in-out">
        {children}
      </button>
    );
  }
  return (
    <button className="px-10 py-4 bg-gradient-to-br from-[#1a1a3e] to-[#c38d94] text-[#f0ece4] font-serif italic tracking-wide border border-[#d4a574]/50 rounded-[40%_60%_70%_30%/30%_30%_70%_70%] shadow-[0_4px_20px_rgba(195,141,148,0.2)] hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] hover:-translate-y-1 hover:skew-x-2 hover:-rotate-1 active:translate-y-1 active:skew-x-0 active:rotate-0 transition-all duration-1000 ease-in-out">
      {children}
    </button>
  );
}

function SurrealInput() {
  return (
    <div>
      <label className="block text-sm font-serif italic text-[#c38d94]/70 mb-2 tracking-wide">
        Whisper your dreams
      </label>
      <input
        type="text"
        placeholder="Enter the dream..."
        className="w-full px-6 py-4 bg-[#f0ece4] border border-[#d4a574]/40 rounded-lg text-[#1a1a3e] placeholder-[#c38d94]/50 font-serif italic focus:border-[#c38d94] focus:shadow-[0_0_16px_rgba(195,141,148,0.3)] focus:outline-none transition-all duration-500"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a3e] via-[#1a1a3e] to-[#f0ece4] text-[#f0ece4]">
      <style>{`
        @keyframes surreal-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes surreal-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
      `}</style>

      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a3e]/80 backdrop-blur-md border-b border-[#d4a574]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/styles/surrealism/showcase" className="font-serif italic text-lg text-[#d4a574] tracking-widest">
              Surrealism
            </Link>
            <nav className="flex items-center gap-6 md:gap-8">
              <Link href="/styles/surrealism" className="font-serif italic text-xs tracking-wider text-[#f0ece4]/50 hover:text-[#d4a574] transition-colors duration-700">
                Docs
              </Link>
              <Link href="/styles" className="font-serif italic text-xs tracking-wider text-[#f0ece4]/50 hover:text-[#d4a574] transition-colors duration-700">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background orbs */}
        <MeltingOrb className="top-20 right-[15%] w-72 h-72 bg-[#d4a574]/15" />
        <MeltingOrb className="bottom-32 left-[10%] w-56 h-56 bg-[#c38d94]/15" />
        <MeltingOrb className="top-[40%] left-[50%] w-40 h-40 bg-[#4a3f6b]/15" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p
            className="text-sm font-serif italic text-[#d4a574]/70 tracking-[0.3em] mb-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Beyond the threshold of consciousness
          </p>
          <h1
            className="text-6xl md:text-8xl lg:text-[9rem] font-serif italic leading-[0.9] tracking-tight mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0) skewX(0deg)" : "translateY(40px) skewX(-2deg)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            <span className="text-[#f0ece4]">Sur</span>
            <span className="text-[#d4a574]">real</span>
            <span className="text-[#c38d94]">ism</span>
          </h1>
          <p
            className="text-lg md:text-xl font-serif italic text-[#f0ece4]/50 max-w-lg mx-auto mb-12 leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            Where dreams dissolve the boundaries of reason, and the subconscious paints with impossible colors.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            <SurrealButton>Enter the Dream</SurrealButton>
            <SurrealButton variant="secondary">Observe</SurrealButton>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a3e] to-transparent pointer-events-none" />
      </section>

      {/* ===== Dream Gallery ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock>
          <div className="text-center mb-16">
            <span className="text-xs font-serif italic text-[#c38d94]/60 tracking-[0.3em] block mb-3">The Gallery</span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#f0ece4] mb-4">Dreamscapes</h2>
            <p className="text-[#f0ece4]/40 font-serif italic max-w-md mx-auto">
              Visions pulled from the boundary between sleep and waking
            </p>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <DreamCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ===== Component Demos ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#f0ece4]/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <span className="text-xs font-serif italic text-[#d4a574]/60 tracking-[0.3em] block mb-3">Components</span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#f0ece4] mb-4">Elements of Dream</h2>
            </div>
          </RevealBlock>

          {/* Tab Switcher */}
          <RevealBlock delay={0.1} className="mb-12">
            <div className="flex justify-center gap-2">
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 font-serif italic text-sm tracking-wider rounded-full border transition-all duration-700 ease-in-out ${
                    activeTab === tab
                      ? "bg-[#d4a574]/20 border-[#d4a574]/40 text-[#d4a574]"
                      : "bg-transparent border-[#f0ece4]/10 text-[#f0ece4]/40 hover:text-[#f0ece4]/70 hover:border-[#f0ece4]/20"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab Content */}
          <RevealBlock delay={0.15}>
            <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#1a1a3e]/50 to-[#4a3f6b]/20 border border-[#d4a574]/15 overflow-hidden">
              {/* Decorative orbs */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#c38d94]/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#d4a574]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center gap-6">
                {activeTab === "button" && (
                  <div className="flex flex-col items-center gap-6">
                    <SurrealButton>Enter the Dream</SurrealButton>
                    <SurrealButton variant="secondary">Observe</SurrealButton>
                    <p className="text-xs font-serif italic text-[#f0ece4]/30 mt-4">
                      Dream-like Distortion: skew-x-2 + -rotate-1 on hover, Abyssal Glow shadow, Timeless Easing duration-1000
                    </p>
                  </div>
                )}

                {activeTab === "card" && (
                  <div className="w-full max-w-md">
                    <DreamCard
                      item={{ id: 0, title: "The Persistence of Memory", category: "Dream", desc: "Time melts in the desert of consciousness" }}
                      index={0}
                    />
                    <p className="text-xs font-serif italic text-[#f0ece4]/30 mt-6 text-center">
                      Color Melting orbs expand over 2000ms, title tracking expands, underline extends
                    </p>
                  </div>
                )}

                {activeTab === "input" && (
                  <div className="w-full max-w-md">
                    <SurrealInput />
                    <p className="text-xs font-serif italic text-[#f0ece4]/30 mt-6 text-center">
                      Abyssal Glow focus ring, serif italic placeholder, rose-dust border on focus
                    </p>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <span className="text-xs font-serif italic text-[#c38d94]/60 tracking-[0.3em] block mb-3">Palette</span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#f0ece4]">Colors of the Subconscious</h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.value} delay={i * 0.06}>
                <div className="group flex flex-col items-center gap-3">
                  <div
                    className="w-full aspect-square rounded-2xl border border-[#d4a574]/20 hover:shadow-[0_0_40px_rgba(195,141,148,0.2)] hover:skew-x-1 hover:-rotate-1 transition-all duration-700 ease-in-out overflow-hidden"
                    style={{ backgroundColor: color.value }}
                  >
                    {/* Inner melting orb */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/10 blur-lg group-hover:scale-[2] transition-transform duration-[2000ms] ease-in-out" />
                    </div>
                  </div>
                  <span className="text-xs font-serif italic text-[#f0ece4]/50">{color.name}</span>
                  <span className="text-[10px] font-mono text-[#d4a574]/40">{color.value}</span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-gradient-to-b from-transparent via-[#4a3f6b]/10 to-transparent">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <span className="text-xs font-serif italic text-[#d4a574]/60 tracking-[0.3em] block mb-3">Manifesto</span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#f0ece4]">Laws of the Dream</h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Do */}
            <RevealBlock delay={0.05}>
              <div className="relative p-8 rounded-2xl bg-[#f0ece4]/5 border border-[#d4a574]/15 overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#d4a574]/10 blur-2xl pointer-events-none" />
                <h3 className="text-lg font-serif italic text-[#d4a574] mb-6 relative z-10">
                  <svg className="inline-block w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Embrace
                </h3>
                <ul className="space-y-3 relative z-10">
                  {doRules.map((rule) => (
                    <li key={rule} className="text-sm font-serif text-[#f0ece4]/50 leading-relaxed pl-4 border-l border-[#d4a574]/20">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.1}>
              <div className="relative p-8 rounded-2xl bg-[#f0ece4]/5 border border-[#c38d94]/15 overflow-hidden">
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#c38d94]/10 blur-2xl pointer-events-none" />
                <h3 className="text-lg font-serif italic text-[#c38d94] mb-6 relative z-10">
                  <svg className="inline-block w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Avoid
                </h3>
                <ul className="space-y-3 relative z-10">
                  {dontRules.map((rule) => (
                    <li key={rule} className="text-sm font-serif text-[#f0ece4]/50 leading-relaxed pl-4 border-l border-[#c38d94]/20">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-16 px-6 md:px-12 border-t border-[#d4a574]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif italic text-sm text-[#f0ece4]/30 tracking-wider">
            Surrealism Showcase
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/styles/surrealism" className="font-serif italic text-xs text-[#f0ece4]/30 hover:text-[#d4a574] transition-colors duration-700">
              Docs
            </Link>
            <Link href="/styles" className="font-serif italic text-xs text-[#f0ece4]/30 hover:text-[#d4a574] transition-colors duration-700">
              All Styles
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
