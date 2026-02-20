"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ---------- inline useInView ---------- */
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

/* ---------- inline RevealBlock ---------- */
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

/* ---------- Gothic Ornament Divider ---------- */
function GothicDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a227]/40" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#c9a227]/60 flex-shrink-0">
        <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a227]/40" />
    </div>
  );
}

/* ---------- Gothic Corner Ornament ---------- */
function CornerOrnaments() {
  return (
    <>
      <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#c9a227]/20" />
      <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#c9a227]/20" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#c9a227]/20" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#c9a227]/20" />
    </>
  );
}

/* ---------- data ---------- */
const chapters = [
  { num: "I", title: "The Cathedral", desc: "In the shadow of soaring spires, where pointed arches pierce the heavens and flying buttresses hold the weight of centuries." },
  { num: "II", title: "The Rose Window", desc: "Crimson and gold light bleeds through intricate stonework, casting jeweled patterns across cold marble floors." },
  { num: "III", title: "The Manuscript", desc: "Illuminated letters dance across vellum pages, each stroke a prayer rendered in gold leaf and lapis lazuli." },
  { num: "IV", title: "The Crypt", desc: "Beneath the nave, where flickering torchlight reveals the secrets of those who came before, carved in eternal stone." },
];

const colorPalette = [
  { name: "Deep Purple", hex: "#2d1b4e", desc: "Primary darkness" },
  { name: "Blood Red", hex: "#8b1a1a", desc: "Sacred crimson" },
  { name: "Void Black", hex: "#0a0a0a", desc: "Background" },
  { name: "Sacred Gold", hex: "#c9a227", desc: "Illumination" },
  { name: "Gold Light", hex: "#dfc266", desc: "Hover glow" },
  { name: "Dark Violet", hex: "#4a2d6e", desc: "Accent depth" },
];

const componentTabs = ["Buttons", "Inputs", "Cards"] as const;

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof componentTabs)[number]>("Buttons");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#c9a227]">
      <style>{`
        @keyframes gothic-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes candle-flicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(201,162,39,0.4); }
          25% { opacity: 0.95; text-shadow: 0 0 15px rgba(201,162,39,0.6); }
          75% { opacity: 0.98; text-shadow: 0 0 8px rgba(201,162,39,0.3); }
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .candle-text { animation: candle-flicker 3s ease-in-out infinite; }
        .gold-glow { text-shadow: 0 0 10px rgba(201,162,39,0.4), 0 0 20px rgba(201,162,39,0.2); }
      `}</style>

      {/* ===== Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#c9a227]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/styles/gothic" className="font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]/60 hover:text-[#c9a227] transition-colors duration-500">
              Return
            </Link>
            <span className="font-serif text-sm uppercase tracking-[0.3em] text-[#c9a227] gold-glow">
              GOTHIC
            </span>
            <nav className="flex items-center gap-6">
              <Link href="/styles/gothic" className="hidden md:block font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]/40 hover:text-[#c9a227] transition-colors duration-500">
                Docs
              </Link>
              <Link href="/styles" className="font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]/40 hover:text-[#c9a227] transition-colors duration-500">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_30%,#c9a227_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#2d1b4e]/20 to-[#0a0a0a]" />

        {/* Ornate border frames */}
        <div className="absolute inset-6 md:inset-12 border border-[#c9a227]/10" />
        <div className="absolute inset-8 md:inset-16 border border-[#c9a227]/5" />

        <div className="relative z-10 text-center px-6">
          {/* Top ornament */}
          <div
            className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#8b1a1a] to-transparent mx-auto mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          />

          <h1
            className="text-6xl md:text-8xl lg:text-[9rem] font-serif text-[#c9a227] tracking-wider leading-none"
            style={{
              textShadow: "0 0 40px rgba(201,162,39,0.3), 0 0 80px rgba(201,162,39,0.1)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            GOTHIC
          </h1>

          <p
            className="mt-6 text-xl md:text-2xl text-[#c9a227]/60 font-serif italic tracking-wide"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            In tenebris lux
          </p>

          <p
            className="mt-2 text-sm text-[#c9a227]/40 font-serif tracking-[0.3em] uppercase"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 0.4s",
            }}
          >
            Cathedral Architecture &middot; Dark Romance &middot; Sacred Geometry
          </p>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 0.6s",
            }}
          >
            <button className="mt-12 px-10 py-4 bg-[#0a0a0a] border border-[#c9a227]/40 text-[#c9a227] font-serif uppercase tracking-[0.2em] text-sm shadow-[0_4px_20px_rgba(10,10,10,0.9),inset_0_0_0_1px_rgba(201,162,39,0.1)] hover:bg-[#2d1b4e]/30 hover:border-[#c9a227] hover:text-[#dfc266] hover:shadow-[0_0_30px_rgba(201,162,39,0.2),inset_0_0_10px_rgba(201,162,39,0.1)] active:bg-[#000000] active:shadow-[inset_0_10px_20px_rgba(0,0,0,0.9)] transition-all duration-700 ease-in-out">
              Enter the Sanctum
            </button>
          </div>

          {/* Bottom ornament */}
          <div
            className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#8b1a1a] to-transparent mx-auto mt-12"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1s ease-in-out 0.8s",
            }}
          />
        </div>
      </section>

      {/* ===== Marquee ===== */}
      <div className="w-full overflow-hidden border-y border-[#c9a227]/10 py-4 bg-[#0a0a0a]">
        <div className="flex w-[200%]" style={{ animation: "marquee-scroll 30s linear infinite" }}>
          {[0, 1].map((i) => (
            <div key={i} className="flex-1 flex justify-around items-center font-serif text-xs uppercase tracking-[0.3em] text-[#c9a227]/30">
              <span>Cathedral</span>
              <span className="text-[#8b1a1a]/40">&#10013;</span>
              <span>Rose Window</span>
              <span className="text-[#8b1a1a]/40">&#10013;</span>
              <span>Manuscript</span>
              <span className="text-[#8b1a1a]/40">&#10013;</span>
              <span>Gargoyle</span>
              <span className="text-[#8b1a1a]/40">&#10013;</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Chapters / Feature Cards ===== */}
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-serif text-[#c9a227] tracking-wider mb-4 gold-glow">
                CHAPTERS
              </h2>
              <p className="text-sm text-[#c9a227]/40 font-serif tracking-[0.2em] uppercase">
                A journey through darkness and illumination
              </p>
              <GothicDivider className="mt-8 max-w-xs mx-auto" />
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {chapters.map((ch, i) => (
              <RevealBlock key={ch.num} delay={i * 0.1}>
                <div className="group relative p-10 bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-[#c9a227]/20 shadow-[0_10px_40px_rgba(0,0,0,0.9)] hover:border-[#c9a227]/60 hover:shadow-[0_0_40px_rgba(45,27,78,0.6)] transition-all duration-700 ease-in-out overflow-hidden">
                  <CornerOrnaments />

                  <div className="relative z-10">
                    <span className="text-5xl font-serif text-[#c9a227]/20 group-hover:text-[#c9a227]/40 transition-colors duration-700">{ch.num}</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-[#c9a227]/80 mb-4 tracking-widest uppercase mt-2 group-hover:text-[#dfc266] group-hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.4)] transition-all duration-700">
                      {ch.title}
                    </h3>
                    <div className="w-12 h-px bg-[#8b1a1a]/50 mb-6 group-hover:w-full group-hover:bg-[#8b1a1a] transition-all duration-1000 ease-in-out" />
                    <p className="text-[#c9a227]/50 font-serif leading-relaxed group-hover:text-[#c9a227]/80 transition-colors duration-700">
                      {ch.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Component Demos (Tab-Switched) ===== */}
      <section className="py-24 md:py-40 px-6 border-y border-[#c9a227]/10">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif text-[#c9a227] tracking-wider mb-4 gold-glow">
                COMPONENTS
              </h2>
              <p className="text-sm text-[#c9a227]/40 font-serif tracking-[0.2em] uppercase">
                Sacred elements of the interface
              </p>
              <GothicDivider className="mt-8 max-w-xs mx-auto" />
            </div>
          </RevealBlock>

          {/* Tab Switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {componentTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-serif text-xs uppercase tracking-[0.2em] border transition-all duration-500 ease-in-out ${
                    activeTab === tab
                      ? "bg-[#2d1b4e]/30 border-[#c9a227] text-[#c9a227] shadow-[0_0_20px_rgba(201,162,39,0.2)]"
                      : "bg-transparent border-[#c9a227]/20 text-[#c9a227]/40 hover:border-[#c9a227]/60 hover:text-[#c9a227]/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab: Buttons */}
          {activeTab === "Buttons" && (
            <RevealBlock delay={0.15}>
              <div className="max-w-2xl mx-auto space-y-8">
                <h3 className="text-sm font-serif uppercase tracking-[0.2em] text-[#c9a227]/40 text-center">Button Variants</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-10 py-4 bg-[#0a0a0a] border border-[#c9a227]/40 text-[#c9a227] font-serif uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(10,10,10,0.9),inset_0_0_0_1px_rgba(201,162,39,0.1)] hover:bg-[#2d1b4e]/30 hover:border-[#c9a227] hover:text-[#dfc266] hover:shadow-[0_0_30px_rgba(201,162,39,0.2),inset_0_0_10px_rgba(201,162,39,0.1)] active:bg-[#000000] active:shadow-[inset_0_10px_20px_rgba(0,0,0,0.9)] transition-all duration-700 ease-in-out">
                    Enter Sanctum
                  </button>
                  <button className="px-10 py-4 bg-[#2d1b4e]/20 border border-[#8b1a1a]/40 text-[#8b1a1a] font-serif uppercase tracking-[0.2em] shadow-[0_4px_20px_rgba(10,10,10,0.9)] hover:bg-[#8b1a1a]/20 hover:border-[#8b1a1a] hover:text-[#c9a227] hover:shadow-[0_0_30px_rgba(139,26,26,0.3)] active:shadow-[inset_0_10px_20px_rgba(0,0,0,0.9)] transition-all duration-700 ease-in-out">
                    Blood Oath
                  </button>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-8 py-3 bg-transparent border border-[#c9a227]/20 text-[#c9a227]/60 font-serif text-xs uppercase tracking-[0.2em] hover:border-[#c9a227]/60 hover:text-[#c9a227] transition-all duration-500">
                    Ghost Button
                  </button>
                  <button className="px-8 py-3 bg-[#c9a227] text-[#0a0a0a] font-serif text-xs uppercase tracking-[0.2em] hover:bg-[#dfc266] hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] active:scale-[0.98] transition-all duration-500">
                    Illuminated
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Inputs */}
          {activeTab === "Inputs" && (
            <RevealBlock delay={0.15}>
              <div className="max-w-lg mx-auto space-y-8">
                <h3 className="text-sm font-serif uppercase tracking-[0.2em] text-[#c9a227]/40 text-center">Inscription Fields</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#c9a227]/40 font-serif text-xs uppercase tracking-[0.2em] mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Inscribe here..."
                      className="w-full px-6 py-4 bg-[#0a0a0a]/80 border-2 border-[#c9a227]/30 text-[#c9a227] placeholder-[#c9a227]/30 font-serif focus:border-[#c9a227] focus:shadow-[0_0_16px_rgba(201,162,39,0.3)] focus:outline-none transition-all duration-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[#c9a227]/40 font-serif text-xs uppercase tracking-[0.2em] mb-2">Missive</label>
                    <textarea
                      rows={4}
                      placeholder="Compose your missive..."
                      className="w-full px-6 py-4 bg-[#0a0a0a]/80 border-2 border-[#c9a227]/30 text-[#c9a227] placeholder-[#c9a227]/30 font-serif focus:border-[#c9a227] focus:shadow-[0_0_16px_rgba(201,162,39,0.3)] focus:outline-none resize-none transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Cards */}
          {activeTab === "Cards" && (
            <RevealBlock delay={0.15}>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="group relative p-8 bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-[#c9a227]/20 shadow-[0_10px_40px_rgba(0,0,0,0.9)] hover:border-[#c9a227]/60 hover:shadow-[0_0_40px_rgba(45,27,78,0.6)] transition-all duration-700 ease-in-out overflow-hidden">
                  <CornerOrnaments />
                  <div className="relative z-10">
                    <h4 className="text-xl font-serif text-[#c9a227]/80 tracking-widest uppercase group-hover:text-[#dfc266] transition-colors duration-700">Standard Card</h4>
                    <div className="w-8 h-px bg-[#8b1a1a]/50 my-4 group-hover:w-full group-hover:bg-[#8b1a1a] transition-all duration-1000" />
                    <p className="text-[#c9a227]/50 font-serif text-sm leading-relaxed group-hover:text-[#c9a227]/80 transition-colors duration-700">
                      A vessel of dark elegance, framed in sacred gold with whispered shadow beneath.
                    </p>
                  </div>
                </div>
                <div className="group relative p-8 bg-gradient-to-b from-[#1a0a0a] to-[#0a0a0a] border border-[#8b1a1a]/30 shadow-[0_10px_40px_rgba(0,0,0,0.9)] hover:border-[#8b1a1a]/70 hover:shadow-[0_0_40px_rgba(139,26,26,0.4)] transition-all duration-700 ease-in-out overflow-hidden">
                  <CornerOrnaments />
                  <div className="relative z-10">
                    <h4 className="text-xl font-serif text-[#8b1a1a] tracking-widest uppercase group-hover:text-[#c9a227] transition-colors duration-700">Blood Card</h4>
                    <div className="w-8 h-px bg-[#8b1a1a]/50 my-4 group-hover:w-full group-hover:bg-[#c9a227] transition-all duration-1000" />
                    <p className="text-[#c9a227]/40 font-serif text-sm leading-relaxed group-hover:text-[#c9a227]/70 transition-colors duration-700">
                      Crimson-bordered sanctum, where the blood of ages stains the margins of memory.
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ===== Inline Color Palette ===== */}
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif text-[#c9a227] tracking-wider mb-4 gold-glow">
                PALETTE
              </h2>
              <p className="text-sm text-[#c9a227]/40 font-serif tracking-[0.2em] uppercase">
                Sacred hues of the cathedral
              </p>
              <GothicDivider className="mt-8 max-w-xs mx-auto" />
            </div>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {colorPalette.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.06}>
                <div className="group border border-[#c9a227]/15 hover:border-[#c9a227]/40 hover:shadow-[0_0_20px_rgba(201,162,39,0.1)] transition-all duration-500">
                  <div className="h-24 md:h-32" style={{ backgroundColor: c.hex }} />
                  <div className="p-4 bg-[#0a0a0a] border-t border-[#c9a227]/15">
                    <p className="font-serif text-xs text-[#c9a227]/80 uppercase tracking-wider">{c.name}</p>
                    <p className="font-serif text-xs text-[#c9a227]/40 mt-1">{c.hex}</p>
                    <p className="font-serif text-[10px] text-[#c9a227]/25 mt-1 italic">{c.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-24 md:py-40 px-6 border-y border-[#c9a227]/10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif text-[#c9a227] tracking-wider mb-4 gold-glow">
                SACRED LAWS
              </h2>
              <p className="text-sm text-[#c9a227]/40 font-serif tracking-[0.2em] uppercase">
                The commandments of gothic design
              </p>
              <GothicDivider className="mt-8 max-w-xs mx-auto" />
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <RevealBlock delay={0.1}>
              <div className="space-y-6">
                <h3 className="font-serif text-lg uppercase tracking-[0.2em] text-[#c9a227]">
                  Thou Shalt
                </h3>
                <ul className="space-y-4 font-serif text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-[#c9a227]/60 flex-shrink-0 mt-0.5">&#10013;</span>
                    <span className="text-[#c9a227]/70">Use deep purple, blood red, and black as primary colors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c9a227]/60 flex-shrink-0 mt-0.5">&#10013;</span>
                    <span className="text-[#c9a227]/70">Add gold decorative lines and borders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c9a227]/60 flex-shrink-0 mt-0.5">&#10013;</span>
                    <span className="text-[#c9a227]/70">Use serif fonts for classical gravitas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c9a227]/60 flex-shrink-0 mt-0.5">&#10013;</span>
                    <span className="text-[#c9a227]/70">Cultivate dark, mysterious atmosphere</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c9a227]/60 flex-shrink-0 mt-0.5">&#10013;</span>
                    <span className="text-[#c9a227]/70">Use pointed arch shapes and gothic patterns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#c9a227]/60 flex-shrink-0 mt-0.5">&#10013;</span>
                    <span className="text-[#c9a227]/70">Use slow, candlelight-paced transitions (500-700ms)</span>
                  </li>
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div className="space-y-6">
                <h3 className="font-serif text-lg uppercase tracking-[0.2em] text-[#8b1a1a]">
                  Thou Shalt Not
                </h3>
                <ul className="space-y-4 font-serif text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-[#8b1a1a]/60 flex-shrink-0 mt-0.5">&#10007;</span>
                    <span className="text-[#8b1a1a]/60 line-through">Use bright white backgrounds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8b1a1a]/60 flex-shrink-0 mt-0.5">&#10007;</span>
                    <span className="text-[#8b1a1a]/60 line-through">Use cheerful or cute design elements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8b1a1a]/60 flex-shrink-0 mt-0.5">&#10007;</span>
                    <span className="text-[#8b1a1a]/60 line-through">Use sans-serif fonts for headings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8b1a1a]/60 flex-shrink-0 mt-0.5">&#10007;</span>
                    <span className="text-[#8b1a1a]/60 line-through">Use large rounded corners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8b1a1a]/60 flex-shrink-0 mt-0.5">&#10007;</span>
                    <span className="text-[#8b1a1a]/60 line-through">Use bouncy or playful animations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#8b1a1a]/60 flex-shrink-0 mt-0.5">&#10007;</span>
                    <span className="text-[#8b1a1a]/60 line-through">Use overly minimal, flat design</span>
                  </li>
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Rose Window Section ===== */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ background: "radial-gradient(circle at 50% 50%, #c9a227 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <RevealBlock>
            <h2 className="text-3xl md:text-5xl font-serif text-[#c9a227] tracking-wider mb-8 italic gold-glow">
              The Rose Window
            </h2>
            <p className="text-[#c9a227]/50 font-serif leading-relaxed max-w-2xl mx-auto mb-12">
              Like the great rose windows of Notre-Dame and Chartres, the Gothic style transforms light itself into art. Each element is a precisely cut piece of a greater whole, filtering the divine through carefully arranged geometry and color.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            {/* Rose window representation */}
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full border-2 border-[#c9a227]/20 relative">
              <div className="absolute inset-4 rounded-full border border-[#8b1a1a]/30" />
              <div className="absolute inset-8 rounded-full border border-[#c9a227]/20" />
              <div className="absolute inset-12 rounded-full" style={{ background: "radial-gradient(circle, #2d1b4e 20%, #8b1a1a 50%, #0a0a0a 70%)" }} />
              {/* Cross overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-[#c9a227]/15" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-[#c9a227]/15" />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[#c9a227]/10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <GothicDivider className="mb-10" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-serif text-lg text-[#c9a227] tracking-wider gold-glow">
                GOTHIC
              </p>
              <p className="font-serif text-xs text-[#c9a227]/30 tracking-[0.2em] uppercase mt-1">
                In tenebris lux &middot; In darkness, light
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/styles/gothic"
                className="px-6 py-2.5 font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]/60 border border-[#c9a227]/20 hover:border-[#c9a227]/60 hover:text-[#c9a227] transition-all duration-500"
              >
                View Docs
              </Link>
              <Link
                href="/styles"
                className="px-6 py-2.5 font-serif text-xs uppercase tracking-[0.2em] text-[#c9a227]/60 border border-[#c9a227]/20 hover:border-[#c9a227]/60 hover:text-[#c9a227] transition-all duration-500"
              >
                All Styles
              </Link>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#c9a227]/5 text-center">
            <p className="font-serif text-xs text-[#c9a227]/20 tracking-[0.2em] uppercase">
              StyleKit &middot; Gothic Showcase
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
