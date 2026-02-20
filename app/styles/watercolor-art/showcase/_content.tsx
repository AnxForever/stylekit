"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const artworks = [
  { id: 1, title: "Morning Bloom", category: "Botanical", desc: "Petals unfold in washes of rose and sage" },
  { id: 2, title: "Cerulean Drift", category: "Landscape", desc: "Sky meets water in soft, bleeding edges" },
  { id: 3, title: "Lavender Fields", category: "Nature", desc: "Purple haze dissolves into warm paper grain" },
  { id: 4, title: "Golden Hour", category: "Abstract", desc: "Ochre pools at the edges of consciousness" },
  { id: 5, title: "Quiet Garden", category: "Botanical", desc: "Sage green leaves traced in diluted pigment" },
  { id: 6, title: "Dusk Palette", category: "Landscape", desc: "Rose and cerulean merge at the horizon line" },
];

const colorPalette = [
  { name: "Rose Wash", value: "#d4a0a0" },
  { name: "Warm Paper", value: "#faf6f0" },
  { name: "Cerulean", value: "#7bb8d4" },
  { name: "Sage Green", value: "#8cc5a8" },
  { name: "Lavender", value: "#c3a0d4" },
  { name: "Ochre Gold", value: "#e8c87a" },
];

const doRules = [
  "Use ultra-soft shadows with rgba opacity 0.08-0.18",
  "Organic rounded corners: rounded-2xl for buttons, rounded-3xl for cards",
  "Serif fonts with generous tracking for elegance",
  "Radial gradients to simulate watercolor wash effects",
  "Warm paper background #faf6f0 throughout",
  "Delicate borders with 15-25% opacity",
];

const dontRules = [
  "Never use sharp edges (rounded-none, rounded-sm)",
  "Never use hard offset shadows (shadow-[Npx_Npx_0px])",
  "Never use thick borders (border-2 or higher)",
  "Never use neon or highly saturated colors",
  "Never use monospace fonts (font-mono)",
  "Never use uppercase text (uppercase)",
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

function WatercolorCard({ item, index }: { item: typeof artworks[0]; index: number }) {
  return (
    <RevealBlock delay={index * 0.07}>
      <div className="group p-8 bg-[#faf6f0]/80 border border-[#d4a0a0]/15 rounded-3xl shadow-[0_2px_20px_rgba(212,160,160,0.10)] hover:shadow-[0_8px_32px_rgba(212,160,160,0.18)] transition-all duration-500 cursor-pointer">
        <span className="text-xs font-serif text-[#d4a0a0]/60 tracking-wide">{item.category}</span>
        <h3 className="text-2xl font-serif font-semibold text-[#5a3e3e] mb-3 mt-1 group-hover:text-[#d4a0a0] transition-colors duration-500">
          {item.title}
        </h3>
        <p className="text-[#5a3e3e]/45 font-serif leading-relaxed">
          {item.desc}
        </p>
      </div>
    </RevealBlock>
  );
}

function WatercolorButton({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "secondary" }) {
  if (variant === "secondary") {
    return (
      <button className="px-8 py-3.5 bg-transparent text-[#d4a0a0] font-serif font-medium tracking-wide rounded-2xl border border-[#d4a0a0]/25 hover:bg-[#d4a0a0]/10 hover:shadow-[0_4px_20px_rgba(212,160,160,0.15)] transition-all duration-500">
        {children}
      </button>
    );
  }
  return (
    <button className="px-8 py-3.5 bg-[#d4a0a0] text-[#5a3e3e] font-serif font-medium tracking-wide rounded-2xl shadow-[0_4px_20px_rgba(212,160,160,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(212,160,160,0.30)] transition-all duration-500">
      {children}
    </button>
  );
}

function WatercolorInput() {
  return (
    <div>
      <label className="block text-sm font-serif text-[#d4a0a0]/60 mb-2 tracking-wide">
        Your name
      </label>
      <input
        type="text"
        placeholder="Type softly..."
        className="w-full px-5 py-3.5 bg-[#faf6f0] border border-[#d4a0a0]/20 rounded-2xl text-[#5a3e3e] placeholder-[#d4a0a0]/35 font-serif focus:border-[#d4a0a0]/35 focus:shadow-[0_0_0_3px_rgba(212,160,160,0.10)] focus:outline-none transition-all duration-500"
      />
    </div>
  );
}

function WashBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(ellipse, #d4a0a0, transparent 70%)" }} />
      <div className="absolute -bottom-[20%] -right-[20%] w-[50%] h-[50%] rounded-full opacity-[0.05]" style={{ background: "radial-gradient(ellipse, #7bb8d4, transparent 70%)" }} />
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
    <div className="min-h-screen bg-[#faf6f0] text-[#5a3e3e] font-serif">
      <style>{`
        .wc-grain::after {
          content: "";
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence baseFrequency='0.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Paper grain overlay */}
      <div className="wc-grain" />

      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf6f0]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20 border-b border-[#d4a0a0]/15">
            <Link href="/styles/watercolor-art/showcase" className="font-serif text-lg text-[#d4a0a0] tracking-wide">
              Watercolor Art
            </Link>
            <nav className="flex items-center gap-6 md:gap-8">
              <Link href="/styles/watercolor-art" className="font-serif text-xs text-[#5a3e3e]/40 tracking-wide hover:text-[#d4a0a0] transition-colors duration-500">
                Docs
              </Link>
              <Link href="/styles" className="font-serif text-xs text-[#5a3e3e]/40 tracking-wide hover:text-[#d4a0a0] transition-colors duration-500">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative pt-32 md:pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <WashBackground />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p
            className="text-sm font-serif text-[#d4a0a0]/60 tracking-[0.15em] mb-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Pigments flow freely across warm paper
          </p>
          <h1
            className="text-6xl md:text-8xl font-serif font-semibold tracking-tight leading-none mb-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span className="text-[#d4a0a0]">Watercolor</span>
          </h1>
          <h2
            className="text-4xl md:text-6xl font-serif font-semibold text-[#7bb8d4]/70 mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Art
          </h2>
          <p
            className="text-lg text-[#5a3e3e]/40 font-serif mb-12 max-w-xl mx-auto leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            Organic edges, gentle pigment pooling, and the warmth of handmade paper create a visual experience as natural as breathing.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <WatercolorButton>Explore</WatercolorButton>
            <WatercolorButton variant="secondary">Learn more</WatercolorButton>
          </div>
        </div>

        {/* Decorative botanical accents */}
        <div className="absolute top-32 right-12 w-12 h-12 bg-[#8cc5a8] opacity-[0.12] rounded-[0_100%_0_100%] blur-[4px] pointer-events-none hidden md:block" />
        <div className="absolute bottom-24 left-16 w-8 h-8 bg-[#c3a0d4] opacity-[0.10] rounded-[100%_0_100%_0] blur-[3px] pointer-events-none hidden md:block" />
      </section>

      {/* ===== Gallery ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <WashBackground className="opacity-50" />

        <RevealBlock className="relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-serif text-[#d4a0a0]/50 tracking-[0.15em] block mb-3">Collection</span>
            <h2 className="text-4xl md:text-6xl font-serif font-semibold text-[#5a3e3e] mb-4">Gallery</h2>
            <p className="text-[#5a3e3e]/35 font-serif max-w-md mx-auto leading-relaxed">
              Each piece flows with the organic unpredictability of wet pigment on paper
            </p>
          </div>
        </RevealBlock>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((item, i) => (
            <WatercolorCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ===== Component Demos ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <WashBackground />

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <span className="text-xs font-serif text-[#d4a0a0]/50 tracking-[0.15em] block mb-3">Components</span>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#5a3e3e] mb-4">Elements</h2>
            </div>
          </RevealBlock>

          {/* Tab Switcher */}
          <RevealBlock delay={0.1} className="mb-12">
            <div className="flex justify-center gap-2">
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 font-serif text-sm tracking-wide rounded-2xl border transition-all duration-500 ${
                    activeTab === tab
                      ? "bg-[#d4a0a0]/15 border-[#d4a0a0]/25 text-[#d4a0a0]"
                      : "bg-transparent border-[#d4a0a0]/10 text-[#5a3e3e]/35 hover:text-[#5a3e3e]/60 hover:border-[#d4a0a0]/20"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab Content */}
          <RevealBlock delay={0.15}>
            <div className="relative p-8 md:p-12 rounded-3xl bg-[#faf6f0]/60 border border-[#d4a0a0]/10 shadow-[0_2px_20px_rgba(212,160,160,0.08)] overflow-hidden">
              {/* Subtle wash decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(ellipse, #c3a0d4, transparent 70%)" }} />
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(ellipse, #8cc5a8, transparent 70%)" }} />

              <div className="relative z-10 flex flex-col items-center gap-6">
                {activeTab === "button" && (
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <WatercolorButton>Paint</WatercolorButton>
                      <WatercolorButton variant="secondary">Observe</WatercolorButton>
                    </div>
                    <p className="text-xs font-serif text-[#5a3e3e]/30 mt-4 text-center">
                      Soft pigment pooling via radial gradient. Ultra-gentle hover:scale-[1.02]. Duration-500.
                    </p>
                  </div>
                )}

                {activeTab === "card" && (
                  <div className="w-full max-w-md">
                    <WatercolorCard
                      item={{ id: 0, title: "Morning Bloom", category: "Botanical", desc: "Petals unfold in washes of rose and sage" }}
                      index={0}
                    />
                    <p className="text-xs font-serif text-[#5a3e3e]/30 mt-6 text-center">
                      Rounded-3xl organic corners. Shadow transitions from 0.10 to 0.18 opacity. Serif typography.
                    </p>
                  </div>
                )}

                {activeTab === "input" && (
                  <div className="w-full max-w-md">
                    <WatercolorInput />
                    <p className="text-xs font-serif text-[#5a3e3e]/30 mt-6 text-center">
                      Delicate border at 20% opacity. Focus ring at 10% opacity. Rounded-2xl soft edges.
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
              <span className="text-xs font-serif text-[#d4a0a0]/50 tracking-[0.15em] block mb-3">Palette</span>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#5a3e3e]">Colors of water and light</h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.value} delay={i * 0.06}>
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-full aspect-square rounded-3xl border border-[#d4a0a0]/10 shadow-[0_2px_12px_rgba(212,160,160,0.08)] hover:shadow-[0_4px_20px_rgba(212,160,160,0.15)] transition-all duration-500"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-sm font-serif text-[#5a3e3e]/50">{color.name}</span>
                  <span className="text-xs font-serif text-[#d4a0a0]/40">{color.value}</span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12">
        <WashBackground />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <span className="text-xs font-serif text-[#d4a0a0]/50 tracking-[0.15em] block mb-3">Guidelines</span>
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#5a3e3e]">Design philosophy</h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do */}
            <RevealBlock delay={0.05}>
              <div className="p-8 rounded-3xl bg-[#faf6f0]/60 border border-[#8cc5a8]/15 shadow-[0_2px_16px_rgba(140,197,168,0.08)]">
                <h3 className="text-lg font-serif font-semibold text-[#8cc5a8] mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Embrace
                </h3>
                <ul className="space-y-3">
                  {doRules.map((rule) => (
                    <li key={rule} className="text-sm font-serif text-[#5a3e3e]/50 leading-relaxed pl-4 border-l border-[#8cc5a8]/20">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.1}>
              <div className="p-8 rounded-3xl bg-[#faf6f0]/60 border border-[#d4a0a0]/15 shadow-[0_2px_16px_rgba(212,160,160,0.08)]">
                <h3 className="text-lg font-serif font-semibold text-[#d4a0a0] mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Avoid
                </h3>
                <ul className="space-y-3">
                  {dontRules.map((rule) => (
                    <li key={rule} className="text-sm font-serif text-[#5a3e3e]/50 leading-relaxed pl-4 border-l border-[#d4a0a0]/20">
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
      <footer className="py-16 px-6 md:px-12 border-t border-[#d4a0a0]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-sm text-[#5a3e3e]/30 tracking-wide">
            Watercolor Art Showcase
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/styles/watercolor-art" className="font-serif text-xs text-[#5a3e3e]/30 hover:text-[#d4a0a0] transition-colors duration-500">
              Docs
            </Link>
            <Link href="/styles" className="font-serif text-xs text-[#5a3e3e]/30 hover:text-[#d4a0a0] transition-colors duration-500">
              All Styles
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
