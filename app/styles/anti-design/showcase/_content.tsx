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

/* ---------- Anti-Design Card ---------- */
function AntiCard({
  children,
  className = "",
  accentColor = "#FF0000",
}: {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}) {
  return (
    <div
      className={`bg-white border-4 border-black p-6 shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-none ${className}`}
    >
      <div
        className="h-3 border-b-4 border-black -mx-6 -mt-6 mb-4"
        style={{ backgroundColor: accentColor }}
      />
      {children}
    </div>
  );
}

/* ---------- Ticker / Marquee ---------- */
function AntiMarquee() {
  return (
    <div className="w-full overflow-hidden border-y-4 border-black py-4 bg-[#FFFF00]">
      <div className="flex w-[200%]" style={{ animation: "anti-marquee-scroll 12s linear infinite" }}>
        {[0, 1].map((i) => (
          <div key={i} className="flex-1 flex justify-around items-center font-black text-sm uppercase tracking-wider text-black">
            <span>NO CURVES</span>
            <span className="text-[#FF0000]">{"//"}</span>
            <span>THICK BORDERS</span>
            <span className="text-[#0000FF]">{"//"}</span>
            <span>HARD SHADOWS</span>
            <span className="text-[#FF00FF]">{"//"}</span>
            <span>RAW POWER</span>
            <span className="text-[#00FF00]">{"//"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- data ---------- */
const principles = [
  { title: "NO CURVES", desc: "Every corner is sharp. Every edge is hard. Border-radius is forbidden territory.", color: "#FF0000", icon: "X" },
  { title: "THICK BORDERS", desc: "Minimum 4px black borders on everything. Thicker is louder. Louder is better.", color: "#0000FF", icon: "B" },
  { title: "CLASHING COLORS", desc: "High-saturation primaries only. Red next to blue next to yellow. Visual conflict is the goal.", color: "#FF00FF", icon: "Z" },
  { title: "HARD SHADOWS", desc: "Only offset shadows with zero blur. shadow-[8px_8px_0_#000]. Never soft. Never subtle.", color: "#00FF00", icon: "!" },
  { title: "ROTATED CHAOS", desc: "Tilt elements at odd angles. -3deg to 5deg. Nothing should sit perfectly straight.", color: "#00FFFF", icon: "/" },
  { title: "SIZE COLLISION", desc: "Mix font sizes dramatically. 10rem next to 0.75rem. Visual tension creates raw energy.", color: "#FFFF00", icon: "#" },
];

const colorPalette = [
  { name: "BLACK", hex: "#000000", bg: "#000000", light: false },
  { name: "WHITE", hex: "#FFFFFF", bg: "#FFFFFF", light: true },
  { name: "RED", hex: "#FF0000", bg: "#FF0000", light: false },
  { name: "BLUE", hex: "#0000FF", bg: "#0000FF", light: false },
  { name: "YELLOW", hex: "#FFFF00", bg: "#FFFF00", light: true },
  { name: "MAGENTA", hex: "#FF00FF", bg: "#FF00FF", light: false },
  { name: "CYAN", hex: "#00FFFF", bg: "#00FFFF", light: true },
  { name: "GREEN", hex: "#00FF00", bg: "#00FF00", light: true },
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
    <div className="min-h-screen bg-white text-black">
      <style>{`
        @keyframes anti-marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes anti-shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1deg); }
          75% { transform: rotate(1deg); }
        }
        @keyframes anti-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      {/* ===== Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link
              href="/styles/anti-design"
              className="font-black text-xs uppercase border-4 border-black px-3 py-1.5 shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#FF0000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-none"
            >
              BACK
            </Link>
            <span className="font-black text-lg md:text-xl uppercase tracking-tight">
              ANTI-DESIGN
            </span>
            <nav className="flex items-center gap-3">
              <Link
                href="/styles/anti-design"
                className="hidden md:block font-black text-xs uppercase hover:text-[#FF0000] transition-none"
              >
                DOCS
              </Link>
              <Link
                href="/styles"
                className="font-black text-xs uppercase border-4 border-black px-3 py-1.5 shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#0000FF] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-none"
              >
                STYLES
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="pt-24 md:pt-28 bg-[#FFFF00] border-b-4 border-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <h1
            className="text-7xl md:text-9xl lg:text-[11rem] font-black uppercase text-black leading-[0.85] -rotate-2"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0) rotate(-2deg)" : "translateY(60px) rotate(-2deg)",
              transition: "opacity 0.5s linear, transform 0.5s linear",
            }}
          >
            ANTI-
            <br />
            DESIGN
          </h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <p
              className="text-xl md:text-3xl font-black text-black/80 max-w-lg rotate-1 uppercase"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0) rotate(1deg)" : "translateY(30px) rotate(1deg)",
                transition: "opacity 0.5s linear 0.15s, transform 0.5s linear 0.15s",
              }}
            >
              Break every rule. Reject every convention. Embrace the raw chaos of visual conflict.
            </p>
            <div
              className="flex gap-3 flex-shrink-0"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.3s linear 0.3s",
              }}
            >
              <button className="px-6 py-3 bg-[#FF0000] text-white font-black text-sm uppercase border-4 border-black shadow-[6px_6px_0_#000] hover:bg-[#0000FF] hover:text-[#FFFF00] hover:shadow-[10px_10px_0_#000] hover:-translate-x-1 hover:rotate-2 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-none">
                DESTROY
              </button>
              <button className="px-6 py-3 bg-black text-white font-black text-sm uppercase border-4 border-black shadow-[6px_6px_0_#FF0000] hover:bg-[#FF00FF] hover:shadow-[10px_10px_0_#0000FF] hover:-translate-x-1 hover:-rotate-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-none">
                CREATE
              </button>
            </div>
          </div>
        </div>

        {/* Diagonal cut */}
        <div className="h-4 bg-black -rotate-1 scale-x-110 translate-y-2" />
      </section>

      {/* ===== Marquee ===== */}
      <AntiMarquee />

      {/* ===== Manifesto Section ===== */}
      <section className="bg-[#FF0000] border-b-4 border-black py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto text-white">
          <RevealBlock>
            <h2 className="text-5xl md:text-8xl font-black uppercase mb-8 -rotate-1">
              MANIFESTO
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="space-y-3">
              <p className="text-3xl md:text-6xl font-black uppercase">NO ROUNDED CORNERS</p>
              <p className="text-lg md:text-xl font-bold rotate-1 ml-8">
                Beauty is a trap. Harmony is a cage.
              </p>
              <p className="text-4xl md:text-7xl font-black uppercase -rotate-1">NO SOFT SHADOWS</p>
              <p className="text-sm font-bold ml-16 rotate-2">
                {"We reject the smooth, the polished, the \"user-friendly\""}
              </p>
              <p className="text-2xl md:text-5xl font-black uppercase rotate-1">NO GRADIENTS</p>
              <p className="text-xs font-bold ml-4 -rotate-1">
                Flat color only. High saturation. Maximum visual impact.
              </p>
              <p className="text-5xl md:text-8xl font-black uppercase -rotate-2 mt-4">
                ONLY RAW POWER
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Principles Grid ===== */}
      <section className="bg-white border-b-4 border-black py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-10 md:mb-16">
              PRINCIPLES
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <RevealBlock key={p.title} delay={i * 0.08}>
                <AntiCard accentColor={p.color}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-black text-2xl border-4 border-black w-10 h-10 flex items-center justify-center" style={{ backgroundColor: p.color, color: p.color === "#FFFF00" || p.color === "#00FFFF" || p.color === "#00FF00" ? "#000" : "#FFF" }}>
                      {p.icon}
                    </span>
                    <h3 className="text-lg md:text-xl font-black uppercase">{p.title}</h3>
                  </div>
                  <p className="font-bold text-sm text-black/70">{p.desc}</p>
                </AntiCard>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Component Demos (Tab-Switched) ===== */}
      <section className="bg-[#FFFF00] border-b-4 border-black py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 -rotate-1">
              COMPONENTS
            </h2>
          </RevealBlock>

          {/* Tab Switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-10">
              {componentTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 font-black text-sm uppercase border-4 border-black transition-none ${
                    activeTab === tab
                      ? "bg-black text-[#FFFF00] shadow-none translate-x-[4px] translate-y-[4px]"
                      : "bg-white text-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-[2px] hover:-translate-y-[2px]"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab: Buttons */}
          {activeTab === "Buttons" && (
            <RevealBlock delay={0.15}>
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-black" />
                  BUTTON VARIANTS
                </h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-[#FF0000] text-white font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0_#000] hover:bg-[#0000FF] hover:text-[#FFFF00] hover:border-8 hover:shadow-[12px_12px_0_#000] hover:-translate-x-2 hover:rotate-3 active:shadow-none active:translate-x-[8px] active:translate-y-[8px] active:bg-[#FFFF00] active:text-black transition-none cursor-help">
                    CLICK ME
                  </button>
                  <button className="px-8 py-4 bg-[#0000FF] text-white font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0_#000] hover:bg-[#FF00FF] hover:shadow-[12px_12px_0_#FF0000] hover:-translate-x-2 hover:-rotate-2 active:shadow-none active:translate-x-[8px] active:translate-y-[8px] transition-none cursor-crosshair">
                    FORCE
                  </button>
                  <button className="px-8 py-4 bg-[#FF00FF] text-white font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0_#000] hover:bg-[#00FF00] hover:text-black hover:shadow-[12px_12px_0_#0000FF] hover:-translate-x-2 hover:rotate-1 active:shadow-none active:translate-x-[8px] active:translate-y-[8px] transition-none">
                    PULSE
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-black text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0_#FF0000] hover:shadow-[6px_6px_0_#FF0000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-none">
                    SMALL RED
                  </button>
                  <button className="px-6 py-3 bg-black text-[#00FFFF] font-black text-sm uppercase border-4 border-[#00FFFF] shadow-[4px_4px_0_#00FFFF] hover:bg-[#00FFFF] hover:text-black hover:shadow-[6px_6px_0_#000] transition-none">
                    OUTLINED
                  </button>
                  <button className="px-6 py-3 bg-[#FFFF00] text-black font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0_#000] hover:bg-[#FF0000] hover:text-white hover:shadow-[6px_6px_0_#0000FF] transition-none">
                    FLIP
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Inputs */}
          {activeTab === "Inputs" && (
            <RevealBlock delay={0.15}>
              <div className="space-y-6 max-w-xl">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-black" />
                  INPUT FIELDS
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="font-black text-sm uppercase mb-2 block">TEXT INPUT</label>
                    <input
                      type="text"
                      placeholder="TYPE HERE..."
                      className="w-full px-4 py-3 bg-white border-4 border-black text-black font-black placeholder:text-gray-400 focus:outline-none focus:bg-[#FFFF00] focus:border-8 focus:border-[#FF0000] focus:shadow-[16px_16px_0_#0000FF] focus:-translate-y-2 focus:rotate-1 transition-none"
                    />
                  </div>
                  <div>
                    <label className="font-black text-sm uppercase mb-2 block">EMAIL INPUT</label>
                    <input
                      type="email"
                      placeholder="YOUR@EMAIL..."
                      className="w-full px-4 py-3 bg-white border-4 border-black text-black font-black placeholder:text-gray-400 focus:outline-none focus:border-[#0000FF] focus:shadow-[8px_8px_0_#0000FF] transition-none"
                    />
                  </div>
                  <div>
                    <label className="font-black text-sm uppercase mb-2 block">TEXTAREA</label>
                    <textarea
                      rows={4}
                      placeholder="SCREAM INTO THE VOID..."
                      className="w-full px-4 py-3 bg-white border-4 border-black text-black font-black placeholder:text-gray-400 focus:outline-none focus:border-[#FF00FF] focus:shadow-[8px_8px_0_#FF00FF] resize-none transition-none"
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Cards */}
          {activeTab === "Cards" && (
            <RevealBlock delay={0.15}>
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-black" />
                  CARD VARIANTS
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_#000] hover:bg-[#FFFF00] hover:border-8 hover:shadow-[12px_12px_0_#000] hover:-translate-x-2 hover:-translate-y-2 hover:rotate-1 transition-none">
                    <h4 className="text-2xl font-black uppercase mb-2">CARD TITLE</h4>
                    <p className="text-sm font-bold text-black/70">Raw brutalist content block. No softness. No mercy.</p>
                  </div>
                  <div className="bg-[#FF0000] text-white border-4 border-black p-6 shadow-[8px_8px_0_#000] hover:bg-[#0000FF] hover:shadow-[12px_12px_0_#FFFF00] hover:-translate-x-2 hover:-translate-y-2 hover:-rotate-1 transition-none">
                    <h4 className="text-2xl font-black uppercase mb-2">DANGER CARD</h4>
                    <p className="text-sm font-bold text-white/80">Critical information demands aggressive color.</p>
                  </div>
                  <div className="bg-black text-[#00FF00] border-4 border-[#00FF00] p-6 shadow-[8px_8px_0_#00FF00] hover:bg-[#00FF00] hover:text-black hover:shadow-[12px_12px_0_#000] hover:-translate-x-2 hover:rotate-2 transition-none">
                    <h4 className="text-2xl font-black uppercase mb-2">TERMINAL</h4>
                    <p className="text-sm font-bold opacity-80">System override. Matrix-green on void-black.</p>
                  </div>
                  <div className="bg-[#0000FF] text-[#FFFF00] border-4 border-black p-6 shadow-[8px_8px_0_#FF00FF] hover:bg-[#FF00FF] hover:text-white hover:shadow-[12px_12px_0_#0000FF] hover:-translate-x-2 hover:-translate-y-2 transition-none">
                    <h4 className="text-2xl font-black uppercase mb-2">CLASH CARD</h4>
                    <p className="text-sm font-bold opacity-80">Blue and yellow? Magenta shadow? Yes. All of it.</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ===== Rules Section ===== */}
      <section className="bg-[#0000FF] border-b-4 border-black py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto text-white">
          <RevealBlock>
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-10 rotate-1">
              RULES
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-10">
            <RevealBlock delay={0.1}>
              <h3 className="text-2xl md:text-4xl font-black uppercase mb-6">DO THIS</h3>
              <ul className="space-y-3">
                <li className="text-lg font-black uppercase">Border-4 on everything</li>
                <li className="text-sm font-bold ml-4">Rounded-none. Always. Forever.</li>
                <li className="text-xl font-black uppercase">High-saturation colors only</li>
                <li className="text-sm font-bold ml-4">Hard offset shadows, zero blur</li>
                <li className="text-lg font-black uppercase">Font-black uppercase</li>
                <li className="text-sm font-bold ml-4">Rotate elements at odd angles</li>
                <li className="text-xl font-black uppercase">Mix font sizes dramatically</li>
                <li className="text-sm font-bold ml-4">Break alignment on interaction</li>
              </ul>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <h3 className="text-2xl md:text-4xl font-black uppercase mb-6 text-[#FF0000]">NEVER THIS</h3>
              <ul className="space-y-3">
                <li className="text-lg font-black uppercase line-through">Rounded corners</li>
                <li className="text-sm font-bold line-through ml-4">Soft or blurred shadows</li>
                <li className="text-xl font-black uppercase line-through">Muted pastel colors</li>
                <li className="text-sm font-bold line-through ml-4">Gradients of any kind</li>
                <li className="text-lg font-black uppercase line-through">Backdrop blur</li>
                <li className="text-sm font-bold line-through ml-4">Consistent spacing</li>
                <li className="text-xl font-black uppercase line-through">Smooth animations</li>
                <li className="text-sm font-bold line-through ml-4">{"\"Nice\" and \"harmonious\" design"}</li>
              </ul>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Inline Color Palette ===== */}
      <section className="bg-white border-b-4 border-black py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-10 md:mb-16 -rotate-1">
              PALETTE
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {colorPalette.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.05}>
                <div className="border-4 border-black shadow-[4px_4px_0_#000] hover:shadow-[8px_8px_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-none">
                  <div className="h-24 md:h-32" style={{ backgroundColor: c.bg }} />
                  <div className="p-3 border-t-4 border-black bg-white">
                    <p className="font-black text-sm">{c.name}</p>
                    <p className="font-bold text-xs text-black/60">{c.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Typography Demo ===== */}
      <section className="bg-[#FF00FF] border-b-4 border-black py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto text-white">
          <RevealBlock>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-10">TYPOGRAPHY</h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="space-y-4">
              <p className="text-8xl md:text-[10rem] font-black uppercase leading-none -rotate-2">BIG</p>
              <p className="text-xs font-bold uppercase tracking-[0.3em] ml-16 rotate-2">tiny text next to giant text</p>
              <p className="text-5xl md:text-7xl font-black uppercase rotate-1">MEDIUM</p>
              <p className="text-sm font-bold ml-8 -rotate-1">deliberate size collision creates visual tension</p>
              <p className="text-3xl font-black uppercase -rotate-2 text-[#FFFF00]">MIXED</p>
              <p className="text-[6rem] md:text-[8rem] font-black uppercase leading-none rotate-1 text-black/20">HUGE</p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Interactive Playground ===== */}
      <section className="bg-[#00FFFF] border-b-4 border-black py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-10 text-black">
              PLAYGROUND
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Hover card 1 */}
              <div className="group bg-white border-4 border-black p-6 shadow-[8px_8px_0_#000] hover:bg-[#FF0000] hover:text-white hover:rotate-3 hover:shadow-[16px_16px_0_#0000FF] transition-none cursor-crosshair">
                <p className="text-4xl font-black mb-2">01</p>
                <p className="font-black uppercase text-sm">Hover rotates</p>
                <p className="text-xs font-bold opacity-70 mt-1">rotate-3 on hover</p>
              </div>
              {/* Hover card 2 */}
              <div className="group bg-white border-4 border-black p-6 shadow-[8px_8px_0_#000] hover:bg-[#0000FF] hover:text-[#FFFF00] hover:-rotate-2 hover:scale-110 hover:shadow-[16px_16px_0_#FF00FF] transition-none cursor-help">
                <p className="text-4xl font-black mb-2">02</p>
                <p className="font-black uppercase text-sm">Hover scales</p>
                <p className="text-xs font-bold opacity-70 mt-1">scale-110 on hover</p>
              </div>
              {/* Hover card 3 */}
              <div className="group bg-white border-4 border-black p-6 shadow-[8px_8px_0_#000] hover:bg-[#FFFF00] hover:text-black hover:border-8 hover:shadow-[20px_20px_0_#000] hover:-translate-x-3 hover:-translate-y-3 transition-none cursor-move">
                <p className="text-4xl font-black mb-2">03</p>
                <p className="font-black uppercase text-sm">Hover expands</p>
                <p className="text-xs font-bold opacity-70 mt-1">border-8 + offset</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-black border-t-4 border-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="font-black text-2xl md:text-4xl uppercase text-white mb-2">
                ANTI-DESIGN
              </p>
              <p className="font-black text-sm uppercase text-white/60">
                BREAK EVERYTHING // BUILD NOTHING POLISHED
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/styles/anti-design"
                className="font-black text-sm uppercase text-white border-4 border-white px-5 py-2.5 shadow-[4px_4px_0_#FF0000] hover:shadow-[6px_6px_0_#FF0000] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-none"
              >
                DOCS
              </Link>
              <Link
                href="/styles"
                className="font-black text-sm uppercase text-black bg-[#FFFF00] border-4 border-[#FFFF00] px-5 py-2.5 shadow-[4px_4px_0_#FFFF00] hover:shadow-[6px_6px_0_#00FF00] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-none"
              >
                ALL STYLES
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-4 border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-bold text-xs text-white/40 uppercase tracking-wider">
              StyleKit Anti-Design Showcase
            </p>
            <div className="flex gap-6">
              <span className="font-black text-xs text-[#FF0000]">#FF0000</span>
              <span className="font-black text-xs text-[#0000FF]">#0000FF</span>
              <span className="font-black text-xs text-[#FFFF00]">#FFFF00</span>
              <span className="font-black text-xs text-[#FF00FF]">#FF00FF</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
