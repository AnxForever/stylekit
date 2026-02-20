"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  useInView hook                                                      */
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

/* ------------------------------------------------------------------ */
/*  RevealBlock                                                         */
/* ------------------------------------------------------------------ */

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
/*  Inline SVG decorative components                                   */
/* ------------------------------------------------------------------ */

function StarShape({ size = 40, color = "#ffbe0b", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <polygon
        points="20,2 24,15 38,15 27,23 31,37 20,29 9,37 13,23 2,15 16,15"
        fill={color}
        stroke="#1a0a2e"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function DiamondShape({ size = 36, color = "#3a86ff", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
      <polygon points="18,1 35,18 18,35 1,18" fill={color} stroke="#1a0a2e" strokeWidth="1.5" />
    </svg>
  );
}

function CircleRing({ size = 48, color = "#8338ec", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="4" fill="none" />
      <circle cx="24" cy="24" r="10" fill={color} opacity="0.3" />
    </svg>
  );
}

function CrossPlus({ size = 32, color = "#06d6a0", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="13" y="0" width="6" height="32" fill={color} />
      <rect x="0" y="13" width="32" height="6" fill={color} />
    </svg>
  );
}

function ZigzagLine({ width = 120, color = "#d4145a", className = "" }: { width?: number; color?: string; className?: string }) {
  const points = [];
  for (let i = 0; i <= 10; i++) {
    points.push(`${(i / 10) * width},${i % 2 === 0 ? 0 : 16}`);
  }
  return (
    <svg width={width} height={20} viewBox={`0 0 ${width} 20`} fill="none" className={className} aria-hidden="true">
      <polyline points={points.join(" ")} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TriangleBurst({ size = 40, color = "#ffbe0b", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <polygon points="20,2 38,36 2,36" fill={color} stroke="#1a0a2e" strokeWidth="1.5" />
    </svg>
  );
}

function SpiralDots({ color = "#3a86ff", className = "" }: { color?: string; className?: string }) {
  const dots = [
    [12, 4], [22, 6], [30, 12], [34, 22], [30, 32], [22, 38], [12, 38],
    [4, 32], [2, 22], [6, 14],
  ];
  return (
    <svg width={40} height={44} viewBox="0 0 40 44" fill="none" className={className} aria-hidden="true">
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2 + (i % 3)} fill={color} opacity={0.7 - i * 0.05} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [componentTab, setComponentTab] = useState(0);

  const tabs = ["Gallery", "Studio", "Archive"];
  const componentTabs = ["Buttons", "Cards", "Input"];

  /* hero inView */
  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div className="min-h-screen bg-[#1a0a2e] text-white overflow-x-hidden">

      {/* ============================================================ */}
      {/* FIXED NAV                                                     */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 bg-[#1a0a2e] border-b-4 border-[#d4145a] shadow-[0_4px_0_#ffbe0b]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Left: back + decorative stars */}
          <div className="flex items-center gap-3">
            <Link
              href="/styles/maximalism"
              className="flex items-center gap-2 group"
            >
              <span className="text-[#ffbe0b] font-mono text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-200">
                ← Back
              </span>
            </Link>
            <div className="hidden md:block" style={{ animationName: "spin", animationDuration: "8s", animationTimingFunction: "linear", animationIterationCount: "infinite" }}>
              <StarShape size={18} color="#d4145a" />
            </div>
            <DiamondShape size={14} color="#3a86ff" className="hidden md:block" />
          </div>

          {/* Center: title */}
          <div className="flex items-center gap-3">
            <CrossPlus size={16} color="#8338ec" />
            <span className="font-serif font-black text-lg md:text-2xl tracking-wider">
              <span className="text-[#d4145a]">MAXI</span>
              <span className="text-[#ffbe0b]">MAL</span>
              <span className="text-[#3a86ff]">ISM</span>
            </span>
            <CrossPlus size={16} color="#06d6a0" />
          </div>

          {/* Right: StyleKit link + decorations */}
          <div className="flex items-center gap-3">
            <StarShape size={18} color="#06d6a0" className="hidden md:block" />
            <Link
              href="/"
              className="px-4 py-2 bg-gradient-to-r from-[#d4145a] to-[#8338ec] text-white font-black text-xs uppercase tracking-widest border-[3px] border-[#ffbe0b] shadow-[2px_2px_0px_#ffbe0b] hover:shadow-[4px_4px_0px_#ffbe0b] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200"
            >
              StyleKit →
            </Link>
          </div>
        </div>

        {/* Nav decoration strip */}
        <div className="h-1 w-full bg-gradient-to-r from-[#d4145a] via-[#8338ec] via-[#3a86ff] via-[#06d6a0] to-[#ffbe0b]" />
      </nav>

      {/* ============================================================ */}
      {/* HERO                                                          */}
      {/* ============================================================ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-20 px-4">

        {/* Background: layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4145a]/20 via-[#1a0a2e] to-[#8338ec]/30" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#3a86ff]/10 via-transparent to-[#06d6a0]/10" />

        {/* Floating SVG shapes — absolute chaos */}
        <div className="absolute top-8 left-6 md:left-16 opacity-80">
          <StarShape size={56} color="#ffbe0b" />
        </div>
        <div className="absolute top-12 right-8 md:right-20 opacity-90">
          <CircleRing size={72} color="#d4145a" />
        </div>
        <div className="absolute top-1/4 left-[5%] opacity-70">
          <DiamondShape size={44} color="#3a86ff" />
        </div>
        <div className="absolute top-1/3 right-[4%] opacity-75">
          <TriangleBurst size={52} color="#8338ec" />
        </div>
        <div className="absolute bottom-20 left-[8%] opacity-85">
          <CrossPlus size={40} color="#06d6a0" />
        </div>
        <div className="absolute bottom-16 right-[10%] opacity-80">
          <StarShape size={44} color="#d4145a" />
        </div>
        <div className="absolute top-1/2 left-[2%] opacity-60">
          <SpiralDots color="#ffbe0b" />
        </div>
        <div className="absolute top-[60%] right-[3%] opacity-65">
          <ZigzagLine width={80} color="#06d6a0" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 opacity-40">
          <CircleRing size={96} color="#8338ec" />
        </div>
        <div className="absolute top-[15%] left-[35%] opacity-30">
          <StarShape size={28} color="#3a86ff" />
        </div>
        <div className="absolute bottom-[25%] right-[30%] opacity-50">
          <DiamondShape size={30} color="#ffbe0b" />
        </div>

        {/* Border-decorated background boxes */}
        <div className="absolute top-[10%] left-[20%] w-24 h-24 border-4 border-dashed border-[#d4145a]/30 rotate-12" />
        <div className="absolute bottom-[15%] right-[22%] w-16 h-16 border-4 border-double border-[#3a86ff]/40 -rotate-6" />
        <div className="absolute top-[40%] right-[18%] w-12 h-12 border-[3px] border-dashed border-[#06d6a0]/40 rotate-45" />

        {/* Hero content */}
        <div
          ref={heroRef}
          className="relative z-10 max-w-5xl mx-auto text-center"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Tag line */}
          <div className="inline-flex items-center gap-2 mb-6">
            <ZigzagLine width={60} color="#ffbe0b" />
            <span className="px-4 py-1 bg-[#ffbe0b] text-[#1a0a2e] font-mono font-black text-xs uppercase tracking-[0.4em] border-4 border-double border-[#d4145a]">
              More Is More · 极繁主义
            </span>
            <ZigzagLine width={60} color="#ffbe0b" />
          </div>

          {/* Giant title — mixed fonts */}
          <h1 className="leading-none mb-6 uppercase">
            <span className="block font-serif font-black text-6xl md:text-[8rem] text-white drop-shadow-[4px_4px_0px_#d4145a]">
              MAXI
            </span>
            <span className="block font-sans font-black text-5xl md:text-7xl text-[#ffbe0b] tracking-[0.2em] drop-shadow-[4px_4px_0px_#8338ec]">
              MALISM
            </span>
            <span className="block font-mono font-bold text-xl md:text-3xl text-[#06d6a0] tracking-[0.5em] mt-2">
              极繁主义
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl font-sans text-[#8338ec] mb-4 max-w-2xl mx-auto leading-relaxed">
            Embrace the excess. Reject the blank.{" "}
            <span className="text-[#d4145a] font-black">Every empty space is a missed opportunity.</span>
          </p>
          <p className="text-sm font-mono text-[#3a86ff] tracking-[0.3em] uppercase mb-10">
            Baroque opulence meets digital excess
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group px-10 py-4 bg-gradient-to-r from-[#d4145a] via-[#8338ec] to-[#3a86ff] text-white font-black text-sm uppercase tracking-widest border-4 border-[#ffbe0b] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff] hover:shadow-[2px_2px_0px_#ffbe0b,4px_4px_0px_#3a86ff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
              <span className="group-hover:tracking-[0.25em] transition-all duration-300">Explore Now</span>
            </button>
            <button className="group px-10 py-4 bg-transparent text-[#06d6a0] font-black text-sm uppercase tracking-widest border-[3px] border-dashed border-[#06d6a0] shadow-[4px_4px_0px_#06d6a0] hover:bg-[#06d6a0] hover:text-[#1a0a2e] hover:shadow-[2px_2px_0px_#ffbe0b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
              Learn More
            </button>
            <button className="group px-10 py-4 bg-[#ffbe0b] text-[#1a0a2e] font-black text-sm uppercase tracking-widest border-4 border-double border-[#d4145a] shadow-[4px_4px_0px_#d4145a] hover:shadow-[2px_2px_0px_#d4145a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
              Gallery
            </button>
          </div>

          {/* Stats under hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {[
              { label: "Colors Used", value: "6+", color: "#d4145a" },
              { label: "Font Families", value: "3", color: "#ffbe0b" },
              { label: "Shadow Layers", value: "2–4", color: "#3a86ff" },
              { label: "Empty Space", value: "NONE", color: "#06d6a0" },
            ].map((s, i) => (
              <div
                key={i}
                className="p-4 bg-[#1a0a2e] border-4 border-double"
                style={{ borderColor: s.color, boxShadow: `3px 3px 0px ${s.color}` }}
              >
                <p className="text-2xl font-serif font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] font-mono text-[#8338ec] uppercase tracking-[0.2em] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENT DEMOS (tab-switched: Buttons / Cards / Input)       */}
      {/* ============================================================ */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#8338ec]/15 via-[#1a0a2e] to-[#d4145a]/10 relative overflow-hidden">

        {/* Floating decorations */}
        <div className="absolute top-6 right-8 opacity-50">
          <TriangleBurst size={36} color="#ffbe0b" />
        </div>
        <div className="absolute bottom-8 left-6 opacity-40">
          <CircleRing size={56} color="#3a86ff" />
        </div>
        <div className="absolute top-1/2 right-[5%] opacity-30">
          <SpiralDots color="#d4145a" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealBlock delay={0}>
            <div className="flex items-center gap-4 mb-3">
              <StarShape size={28} color="#d4145a" />
              <h2 className="font-serif font-black text-4xl md:text-5xl text-white uppercase">
                Component <span className="text-[#d4145a]">Demos</span>
              </h2>
              <StarShape size={28} color="#ffbe0b" />
            </div>
            <p className="font-mono text-[#8338ec] text-xs uppercase tracking-[0.4em] mb-10">
              Interactive examples — styled to maximum
            </p>
          </RevealBlock>

          {/* Tab switcher — the required useState interaction */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-0 mb-0 border-4 border-[#8338ec] w-fit shadow-[4px_4px_0px_#ffbe0b]">
              {componentTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setComponentTab(i)}
                  className={`px-6 py-3 font-black text-xs uppercase tracking-widest transition-all duration-200 border-r-4 border-[#8338ec] last:border-r-0 ${
                    componentTab === i
                      ? "bg-gradient-to-r from-[#d4145a] to-[#8338ec] text-white shadow-inner"
                      : "bg-[#1a0a2e] text-[#8338ec] hover:text-[#ffbe0b] hover:bg-[#8338ec]/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab panels */}
          <RevealBlock delay={0.2}>
            <div className="p-8 bg-[#1a0a2e] border-4 border-[#8338ec] border-t-0 shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff] min-h-[280px]">

              {/* BUTTONS PANEL */}
              {componentTab === 0 && (
                <div>
                  <p className="font-mono text-[#06d6a0] text-xs uppercase tracking-[0.3em] mb-6">
                    // buttons — gradient + multi-shadow
                  </p>
                  <div className="flex flex-wrap gap-5 items-center">
                    <button className="group px-8 py-4 bg-gradient-to-r from-[#d4145a] via-[#8338ec] to-[#3a86ff] text-white font-black text-sm uppercase tracking-widest border-4 border-[#ffbe0b] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff] hover:shadow-[2px_2px_0px_#ffbe0b,4px_4px_0px_#3a86ff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                      Primary
                    </button>
                    <button className="px-8 py-4 bg-transparent text-[#06d6a0] font-black text-sm uppercase tracking-widest border-[3px] border-dashed border-[#06d6a0] shadow-[4px_4px_0px_#06d6a0] hover:bg-[#06d6a0] hover:text-[#1a0a2e] hover:shadow-[2px_2px_0px_#ffbe0b] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                      Secondary
                    </button>
                    <button className="px-8 py-4 bg-[#ffbe0b] text-[#1a0a2e] font-black text-sm uppercase tracking-widest border-4 border-double border-[#d4145a] shadow-[4px_4px_0px_#d4145a] hover:shadow-[2px_2px_0px_#d4145a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                      Accent
                    </button>
                    <button className="px-8 py-4 bg-[#3a86ff] text-white font-black text-sm uppercase tracking-widest border-4 border-[#8338ec] shadow-[4px_4px_0px_#8338ec] hover:shadow-[2px_2px_0px_#8338ec] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                      Electric
                    </button>
                    <button className="px-8 py-4 text-[#d4145a] font-black text-sm uppercase tracking-widest underline underline-offset-4 decoration-[#d4145a] decoration-[3px] hover:text-[#ffbe0b] hover:decoration-[#ffbe0b] transition-all duration-200">
                      Ghost Link
                    </button>
                    <button className="px-8 py-4 bg-[#8338ec]/20 text-[#8338ec]/40 font-black text-sm uppercase tracking-widest border-4 border-[#8338ec]/30 cursor-not-allowed">
                      Disabled
                    </button>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button className="group px-6 py-3 bg-gradient-to-br from-[#d4145a] to-[#ffbe0b] text-white font-black text-xs uppercase tracking-widest border-[3px] border-dashed border-white/40 shadow-[3px_3px_0px_#ffbe0b] hover:shadow-[5px_5px_0px_#ffbe0b] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all duration-200 flex items-center gap-2">
                      <StarShape size={14} color="white" />
                      Icon Button
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-[#06d6a0] to-[#3a86ff] text-[#1a0a2e] font-black text-xs uppercase tracking-widest border-4 border-double border-[#1a0a2e] shadow-[3px_3px_0px_#1a0a2e] hover:shadow-[5px_5px_0px_#1a0a2e] transition-all duration-200">
                      Teal Electric
                    </button>
                  </div>
                </div>
              )}

              {/* CARDS PANEL */}
              {componentTab === 1 && (
                <div>
                  <p className="font-mono text-[#06d6a0] text-xs uppercase tracking-[0.3em] mb-6">
                    // cards — pattern on pattern, border + shadow stacking
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: "Layered", desc: "Multiple visual elements stacked without restraint.", color: "#d4145a", shadow: "#ffbe0b", badge: "CORE" },
                      { title: "Saturated", desc: "Hot pink, vivid yellow, electric blue — clashing in harmony.", color: "#3a86ff", shadow: "#8338ec", badge: "COLOR" },
                      { title: "Dynamic", desc: "Transforms add movement. Every element fights for attention.", color: "#06d6a0", shadow: "#d4145a", badge: "MOTION" },
                    ].map((card, i) => (
                      <div key={i} className="group relative">
                        {/* Multi-layer shadow backgrounds */}
                        <div className="absolute -top-2 -left-2 w-full h-full" style={{ backgroundColor: card.shadow }} />
                        <div className="absolute -top-1 -left-1 w-full h-full bg-[#3a86ff]/60" />
                        {/* Main card */}
                        <div
                          className="relative p-6 bg-[#1a0a2e] border-4 group-hover:-translate-x-[3px] group-hover:-translate-y-[3px] transition-transform duration-200"
                          style={{ borderColor: card.color }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="px-2 py-1 font-mono font-black text-[10px] uppercase tracking-widest text-[#1a0a2e]"
                              style={{ backgroundColor: card.shadow }}
                            >
                              {card.badge}
                            </span>
                            <DiamondShape size={20} color={card.color} />
                          </div>
                          <h3
                            className="font-serif font-black text-xl uppercase mb-2"
                            style={{ color: card.shadow }}
                          >
                            {card.title}
                          </h3>
                          <p className="font-sans text-sm text-[#8338ec]/80 leading-relaxed">{card.desc}</p>
                          <div className="mt-4 h-1 w-full" style={{ background: `linear-gradient(to right, ${card.color}, ${card.shadow})` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INPUT PANEL */}
              {componentTab === 2 && (
                <div>
                  <p className="font-mono text-[#06d6a0] text-xs uppercase tracking-[0.3em] mb-6">
                    // inputs — bold borders, gradient focus
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                    <div>
                      <label className="block font-mono font-black text-[#ffbe0b] text-xs uppercase tracking-[0.3em] mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type something bold..."
                        className="w-full px-5 py-4 bg-[#1a0a2e] border-4 border-[#8338ec] text-white placeholder-[#8338ec]/40 font-sans text-base focus:border-[#d4145a] focus:shadow-[0_0_0_3px_rgba(212,20,90,0.3)] focus:outline-none transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-black text-[#ffbe0b] text-xs uppercase tracking-[0.3em] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="your@style.com"
                        className="w-full px-5 py-4 bg-[#1a0a2e] border-4 border-[#3a86ff] text-white placeholder-[#3a86ff]/40 font-sans text-base focus:border-[#ffbe0b] focus:shadow-[0_0_0_3px_rgba(255,190,11,0.3)] focus:outline-none transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-black text-[#06d6a0] text-xs uppercase tracking-[0.3em] mb-2">
                        Style Selection
                      </label>
                      <select className="w-full px-5 py-4 bg-[#1a0a2e] border-4 border-[#06d6a0] text-white font-sans text-base focus:border-[#d4145a] focus:outline-none transition-all duration-200 appearance-none">
                        <option>Maximalism</option>
                        <option>Baroque</option>
                        <option>Memphis</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono font-black text-[#d4145a] text-xs uppercase tracking-[0.3em] mb-2">
                        Message
                      </label>
                      <textarea
                        placeholder="Express everything at once..."
                        rows={3}
                        className="w-full px-5 py-4 bg-[#1a0a2e] border-4 border-[#d4145a] text-white placeholder-[#d4145a]/40 font-sans text-base focus:border-[#8338ec] focus:shadow-[0_0_0_3px_rgba(131,56,236,0.3)] focus:outline-none transition-all duration-200 resize-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button className="w-full py-4 bg-gradient-to-r from-[#d4145a] via-[#8338ec] to-[#3a86ff] text-white font-black text-sm uppercase tracking-widest border-4 border-[#ffbe0b] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#06d6a0] hover:shadow-[2px_2px_0px_#ffbe0b,4px_4px_0px_#06d6a0] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200">
                        Submit Everything
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COLOR PALETTE                                                 */}
      {/* ============================================================ */}
      <section className="py-20 px-4 relative overflow-hidden bg-[#1a0a2e]">

        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-tl from-[#d4145a]/8 via-transparent to-[#3a86ff]/8" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-20">
          <ZigzagLine width={400} color="#ffbe0b" />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-20">
          <ZigzagLine width={400} color="#d4145a" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealBlock delay={0}>
            <div className="flex items-center gap-3 mb-2">
              <DiamondShape size={24} color="#ffbe0b" />
              <h2 className="font-serif font-black text-4xl md:text-5xl text-white uppercase">
                Color <span className="text-[#ffbe0b]">Palette</span>
              </h2>
              <DiamondShape size={24} color="#3a86ff" />
            </div>
            <p className="font-mono text-[#8338ec] text-xs uppercase tracking-[0.4em] mb-10">
              All 6 saturated clashing colors — never restrained
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Hot Pink", hex: "#d4145a", label: "Primary", shadow: "#ffbe0b", textColor: "white" },
              { name: "Deep Purple", hex: "#1a0a2e", label: "Background", shadow: "#d4145a", textColor: "#ffbe0b" },
              { name: "Golden Yellow", hex: "#ffbe0b", label: "Accent", shadow: "#d4145a", textColor: "#1a0a2e" },
              { name: "Electric Blue", hex: "#3a86ff", label: "Accent 2", shadow: "#8338ec", textColor: "white" },
              { name: "Vivid Purple", hex: "#8338ec", label: "Accent 3", shadow: "#3a86ff", textColor: "white" },
              { name: "Teal Green", hex: "#06d6a0", label: "Accent 4", shadow: "#06d6a0", textColor: "#1a0a2e" },
            ].map((c, i) => (
              <RevealBlock key={i} delay={i * 0.07}>
                <div
                  className="group relative overflow-hidden border-4 border-double hover:-translate-y-1 transition-transform duration-200"
                  style={{
                    borderColor: c.shadow,
                    boxShadow: `4px 4px 0px ${c.shadow}, 8px 8px 0px ${i % 2 === 0 ? "#3a86ff" : "#d4145a"}`,
                  }}
                >
                  {/* Color swatch */}
                  <div
                    className="h-28 w-full flex items-center justify-center relative"
                    style={{ backgroundColor: c.hex }}
                  >
                    <span
                      className="font-mono font-black text-xs tracking-widest px-2 py-1 border-2"
                      style={{
                        color: c.textColor,
                        borderColor: c.textColor === "white" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)",
                        backgroundColor: c.textColor === "white" ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {c.hex}
                    </span>
                    {/* Decorative corner star */}
                    <div className="absolute top-1 right-1 opacity-60">
                      <StarShape size={14} color={c.textColor === "white" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)"} />
                    </div>
                  </div>
                  {/* Label */}
                  <div className="p-3 bg-[#1a0a2e]">
                    <p className="font-black text-white text-xs uppercase tracking-wider truncate">{c.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] mt-0.5" style={{ color: c.shadow }}>{c.label}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color combinations showcase */}
          <RevealBlock delay={0.4}>
            <div className="mt-12 p-8 border-4 border-[#d4145a] shadow-[6px_6px_0px_#ffbe0b,12px_12px_0px_#3a86ff] bg-[#1a0a2e]">
              <p className="font-mono text-[#ffbe0b] text-xs uppercase tracking-[0.4em] mb-5">
                — Gradient Combinations
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { from: "#d4145a", via: "#8338ec", to: "#3a86ff", label: "Pink → Purple → Blue" },
                  { from: "#ffbe0b", via: "#06d6a0", to: "#3a86ff", label: "Gold → Teal → Blue" },
                  { from: "#8338ec", via: "#d4145a", to: "#ffbe0b", label: "Purple → Pink → Gold" },
                ].map((g, i) => (
                  <div key={i} className="group">
                    <div
                      className="h-14 w-full border-[3px] border-dashed border-white/20 hover:border-white/50 transition-colors duration-200"
                      style={{ background: `linear-gradient(to right, ${g.from}, ${g.via}, ${g.to})` }}
                    />
                    <p className="font-mono text-[10px] text-[#8338ec] uppercase tracking-[0.15em] mt-2">{g.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TYPOGRAPHY                                                    */}
      {/* ============================================================ */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#3a86ff]/10 via-[#1a0a2e] to-[#8338ec]/15 relative overflow-hidden">

        <div className="absolute top-10 left-[5%] opacity-35">
          <SpiralDots color="#ffbe0b" />
        </div>
        <div className="absolute bottom-10 right-[5%] opacity-35">
          <SpiralDots color="#d4145a" />
        </div>
        <div className="absolute top-1/3 right-8 opacity-25">
          <CircleRing size={80} color="#06d6a0" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealBlock delay={0}>
            <div className="flex items-center gap-3 mb-2">
              <CrossPlus size={24} color="#3a86ff" />
              <h2 className="font-serif font-black text-4xl md:text-5xl text-white uppercase">
                Typo<span className="text-[#3a86ff]">graphy</span>
              </h2>
              <CrossPlus size={24} color="#d4145a" />
            </div>
            <p className="font-mono text-[#8338ec] text-xs uppercase tracking-[0.4em] mb-10">
              Serif + sans-serif + monospace — all at once
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Specimen box */}
            <RevealBlock delay={0.1}>
              <div className="p-8 bg-[#1a0a2e] border-4 border-[#d4145a] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#8338ec]">
                <p className="font-mono text-[#06d6a0] text-[10px] uppercase tracking-[0.3em] mb-6">
                  // type specimen
                </p>

                {/* H1 — Serif Black */}
                <p className="font-serif font-black text-5xl text-[#ffbe0b] uppercase leading-none mb-1">Display</p>
                <p className="font-mono text-[#8338ec] text-[10px] tracking-widest mb-6">font-serif · font-black · text-5xl</p>

                {/* H2 — Sans Bold */}
                <p className="font-sans font-black text-3xl text-[#d4145a] uppercase leading-tight mb-1">Heading Two</p>
                <p className="font-mono text-[#8338ec] text-[10px] tracking-widest mb-6">font-sans · font-black · text-3xl</p>

                {/* H3 — Mixed */}
                <p className="font-serif font-bold text-2xl text-[#3a86ff] mb-1">Heading Three in Serif</p>
                <p className="font-mono text-[#8338ec] text-[10px] tracking-widest mb-6">font-serif · font-bold · text-2xl</p>

                {/* Body */}
                <p className="font-sans text-base text-white leading-relaxed mb-1">
                  Body text in clean sans-serif. The maximalist philosophy does not mean unreadable — it means{" "}
                  <span className="text-[#d4145a] font-black">relentlessly expressive</span>.
                </p>
                <p className="font-mono text-[#8338ec] text-[10px] tracking-widest mb-6">font-sans · text-base</p>

                {/* Mono caption */}
                <p className="font-mono text-[#06d6a0] text-xs tracking-[0.4em] uppercase mb-1">
                  Mono Caption: Every font has its place in the chaos
                </p>
                <p className="font-mono text-[#8338ec] text-[10px] tracking-widest">font-mono · text-xs · tracking-widest</p>
              </div>
            </RevealBlock>

            {/* Scale + weights box */}
            <RevealBlock delay={0.2}>
              <div className="space-y-4">
                <div className="p-6 bg-[#1a0a2e] border-4 border-[#8338ec] shadow-[4px_4px_0px_#3a86ff]">
                  <p className="font-mono text-[#ffbe0b] text-[10px] uppercase tracking-[0.3em] mb-4">
                    // type scale
                  </p>
                  {[
                    { size: "text-7xl", label: "7xl", text: "Aa", font: "font-serif font-black", color: "text-[#d4145a]" },
                    { size: "text-5xl", label: "5xl", text: "Aa", font: "font-sans font-black", color: "text-[#ffbe0b]" },
                    { size: "text-3xl", label: "3xl", text: "Aa Bb", font: "font-serif font-bold", color: "text-[#3a86ff]" },
                    { size: "text-xl", label: "xl", text: "Aa Bb Cc", font: "font-sans font-bold", color: "text-[#8338ec]" },
                    { size: "text-base", label: "base", text: "The quick brown fox.", font: "font-sans", color: "text-white" },
                    { size: "text-xs", label: "xs", text: "MONO CAPTION LABEL", font: "font-mono uppercase tracking-widest", color: "text-[#06d6a0]" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-baseline gap-4 border-b border-[#8338ec]/20 pb-2 mb-2 last:border-0 last:mb-0">
                      <span className="font-mono text-[#8338ec]/50 text-[10px] w-8 shrink-0">{t.label}</span>
                      <span className={`${t.size} ${t.font} ${t.color} leading-tight`}>{t.text}</span>
                    </div>
                  ))}
                </div>

                {/* Mixed font showcase */}
                <div className="p-6 bg-gradient-to-br from-[#d4145a]/10 to-[#8338ec]/10 border-4 border-double border-[#ffbe0b] shadow-[4px_4px_0px_#d4145a]">
                  <p className="font-mono text-[#ffbe0b] text-[10px] uppercase tracking-[0.3em] mb-4">
                    // mixed fonts as intended
                  </p>
                  <p className="font-serif font-black text-3xl text-[#ffbe0b] uppercase">Baroque</p>
                  <p className="font-sans font-bold text-2xl text-[#d4145a]">meets Digital</p>
                  <p className="font-mono text-[#06d6a0] text-sm tracking-[0.3em] uppercase">Excess_v2026</p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DESIGN PRINCIPLES — do / don't                               */}
      {/* ============================================================ */}
      <section className="py-20 px-4 bg-[#1a0a2e] relative overflow-hidden">

        {/* Intense background decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#d4145a] via-[#ffbe0b] via-[#3a86ff] to-[#8338ec]" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#8338ec] via-[#06d6a0] via-[#d4145a] to-[#ffbe0b]" />

        <div className="absolute top-12 right-12 opacity-30">
          <TriangleBurst size={60} color="#ffbe0b" />
        </div>
        <div className="absolute bottom-12 left-12 opacity-30">
          <StarShape size={60} color="#d4145a" />
        </div>
        <div className="absolute top-1/2 left-[2%] opacity-20">
          <DiamondShape size={80} color="#3a86ff" />
        </div>
        <div className="absolute top-1/2 right-[2%] opacity-20">
          <DiamondShape size={80} color="#8338ec" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealBlock delay={0}>
            <div className="flex items-center gap-3 mb-2">
              <ZigzagLine width={60} color="#d4145a" />
              <h2 className="font-serif font-black text-4xl md:text-5xl text-white uppercase">
                Design <span className="text-[#d4145a]">Principles</span>
              </h2>
              <ZigzagLine width={60} color="#ffbe0b" />
            </div>
            <p className="font-mono text-[#8338ec] text-xs uppercase tracking-[0.4em] mb-10">
              The maximalist way — do this, not that
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO list */}
            <RevealBlock delay={0.1}>
              <div className="p-8 bg-[#1a0a2e] border-4 border-[#06d6a0] shadow-[6px_6px_0px_#06d6a0,12px_12px_0px_#3a86ff] relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <StarShape size={28} color="#06d6a0" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#06d6a0] flex items-center justify-center">
                    <span className="font-black text-[#1a0a2e] text-sm">✓</span>
                  </div>
                  <h3 className="font-serif font-black text-2xl text-[#06d6a0] uppercase">Do This</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Saturated color clashes: pink + yellow + blue + purple + teal together",
                    "Mix font families: serif headings, sans body, mono for labels",
                    "Double/dashed borders: border-4 border-double, border-dashed",
                    "Multi-layer shadows: shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff]",
                    "Stack gradient + border + shadow all at once",
                    "Decorative SVG shapes floating around every section",
                    "Bold 5xl+ headings in contrasting colors",
                    "Fill every empty space with pattern or decoration",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 shrink-0 mt-0.5 bg-[#06d6a0]/20 border-2 border-[#06d6a0] flex items-center justify-center">
                        <span className="text-[#06d6a0] text-[10px] font-black">✓</span>
                      </div>
                      <span className="font-sans text-sm text-white/90 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T list */}
            <RevealBlock delay={0.2}>
              <div className="p-8 bg-[#1a0a2e] border-4 border-[#d4145a] shadow-[6px_6px_0px_#d4145a,12px_12px_0px_#8338ec] relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <CrossPlus size={28} color="#d4145a" />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#d4145a] flex items-center justify-center">
                    <span className="font-black text-white text-sm">✕</span>
                  </div>
                  <h3 className="font-serif font-black text-2xl text-[#d4145a] uppercase">Not This</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Monochrome or limited single-hue palettes",
                    "Excessive whitespace or breathing room between elements",
                    "Single font family used throughout the design",
                    "Clean minimal aesthetic with flat neutral colors",
                    "Thin 1px borders without shadow",
                    "Plain background without gradients or patterns",
                    "Small restrained typography that whispers quietly",
                    "Purposely leaving space empty and undecorated",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 shrink-0 mt-0.5 bg-[#d4145a]/20 border-2 border-[#d4145a] flex items-center justify-center">
                        <span className="text-[#d4145a] text-[10px] font-black">✕</span>
                      </div>
                      <span className="font-sans text-sm text-white/70 leading-snug line-through decoration-[#d4145a]/40">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Central manifesto */}
          <RevealBlock delay={0.35}>
            <div className="mt-8 p-8 bg-gradient-to-br from-[#d4145a]/20 via-[#8338ec]/15 to-[#3a86ff]/20 border-4 border-double border-[#ffbe0b] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#d4145a,12px_12px_0px_#3a86ff] text-center relative overflow-hidden">
              <div className="absolute top-3 left-3 opacity-40">
                <ZigzagLine width={80} color="#ffbe0b" />
              </div>
              <div className="absolute top-3 right-3 opacity-40">
                <ZigzagLine width={80} color="#d4145a" />
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-30">
                <ZigzagLine width={200} color="#8338ec" />
              </div>
              <h3 className="font-serif font-black text-3xl md:text-5xl text-[#ffbe0b] uppercase mb-3 drop-shadow-[2px_2px_0px_#d4145a]">
                The Maximalist Manifesto
              </h3>
              <p className="font-sans text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                <span className="text-[#d4145a] font-black">More is more.</span> Every surface demands decoration.{" "}
                <span className="text-[#ffbe0b] font-black">Every color wants company.</span> Every font seeks a partner.{" "}
                <span className="text-[#3a86ff] font-black">Restraint is the enemy.</span> Baroque opulence is the goal.
              </p>
              <p className="font-mono text-[#8338ec] text-xs uppercase tracking-[0.5em] mt-4">
                — Maximalism Design Philosophy · 极繁主义 · Est. ∞
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SHOWCASE GALLERY — decorative patterns                        */}
      {/* ============================================================ */}
      <section className="py-20 px-4 bg-gradient-to-tr from-[#8338ec]/12 via-[#1a0a2e] to-[#d4145a]/12 relative overflow-hidden">

        <div className="absolute inset-0 opacity-5">
          {/* Grid pattern */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffbe0b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealBlock delay={0}>
            <div className="flex items-center gap-3 mb-2">
              <TriangleBurst size={24} color="#8338ec" />
              <h2 className="font-serif font-black text-4xl md:text-5xl text-white uppercase">
                Pattern <span className="text-[#8338ec]">Gallery</span>
              </h2>
              <TriangleBurst size={24} color="#ffbe0b" />
            </div>
            <p className="font-mono text-[#8338ec] text-xs uppercase tracking-[0.4em] mb-10">
              Layered panels — gradient meets border meets shadow
            </p>
          </RevealBlock>

          {/* Tab switcher for gallery */}
          <RevealBlock delay={0.05}>
            <div className="flex gap-0 mb-0 border-4 border-[#d4145a] w-fit shadow-[4px_4px_0px_#d4145a]">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 font-black text-xs uppercase tracking-widest transition-all duration-200 border-r-4 border-[#d4145a] last:border-r-0 ${
                    activeTab === i
                      ? "bg-gradient-to-r from-[#d4145a] to-[#8338ec] text-white"
                      : "bg-[#1a0a2e] text-[#d4145a] hover:text-[#ffbe0b] hover:bg-[#d4145a]/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="p-1 border-4 border-t-0 border-[#d4145a] shadow-[4px_4px_0px_#8338ec]">
              {activeTab === 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-3 bg-[#1a0a2e]">
                  {[
                    { bg: "from-[#d4145a] to-[#8338ec]", label: "Pink × Purple", shadow: "#ffbe0b" },
                    { bg: "from-[#3a86ff] to-[#06d6a0]", label: "Blue × Teal", shadow: "#d4145a" },
                    { bg: "from-[#ffbe0b] to-[#d4145a]", label: "Gold × Pink", shadow: "#3a86ff" },
                    { bg: "from-[#8338ec] to-[#3a86ff]", label: "Purple × Blue", shadow: "#06d6a0" },
                    { bg: "from-[#06d6a0] to-[#ffbe0b]", label: "Teal × Gold", shadow: "#8338ec" },
                    { bg: "from-[#d4145a] via-[#ffbe0b] to-[#06d6a0]", label: "Pink × Gold × Teal", shadow: "#3a86ff" },
                    { bg: "from-[#3a86ff] via-[#8338ec] to-[#d4145a]", label: "Blue × Purple × Pink", shadow: "#ffbe0b" },
                    { bg: "from-[#ffbe0b] via-[#06d6a0] to-[#3a86ff]", label: "Gold × Teal × Blue", shadow: "#d4145a" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group h-24 flex items-end p-3 border-2 border-white/10 hover:border-white/40 transition-all duration-200 cursor-pointer relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.bg}`} />
                      <div className="absolute top-2 right-2">
                        <DiamondShape size={14} color="rgba(255,255,255,0.5)" />
                      </div>
                      <span className="relative font-mono text-white/80 text-[10px] uppercase tracking-[0.15em] bg-black/30 px-2 py-0.5">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 1 && (
                <div className="p-6 bg-[#1a0a2e] min-h-[200px]">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Border showcase */}
                    <div>
                      <p className="font-mono text-[#ffbe0b] text-[10px] uppercase tracking-[0.3em] mb-4">// border styles</p>
                      <div className="space-y-3">
                        {[
                          { style: "border-4 border-[#d4145a]", label: "Solid · 4px", shadow: "shadow-[3px_3px_0px_#ffbe0b]" },
                          { style: "border-4 border-double border-[#8338ec]", label: "Double · 4px", shadow: "shadow-[3px_3px_0px_#3a86ff]" },
                          { style: "border-[3px] border-dashed border-[#3a86ff]", label: "Dashed · 3px", shadow: "shadow-[3px_3px_0px_#06d6a0]" },
                          { style: "border-[3px] border-dotted border-[#06d6a0]", label: "Dotted · 3px", shadow: "shadow-[3px_3px_0px_#d4145a]" },
                        ].map((b, i) => (
                          <div key={i} className={`px-4 py-3 bg-[#1a0a2e] ${b.style} ${b.shadow}`}>
                            <span className="font-mono text-white text-xs">{b.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Shadow showcase */}
                    <div>
                      <p className="font-mono text-[#ffbe0b] text-[10px] uppercase tracking-[0.3em] mb-4">// shadow stacking</p>
                      <div className="space-y-3">
                        {[
                          { shadow: "shadow-[3px_3px_0px_#ffbe0b]", label: "1 layer — gold" },
                          { shadow: "shadow-[3px_3px_0px_#ffbe0b,6px_6px_0px_#d4145a]", label: "2 layers — gold + pink" },
                          { shadow: "shadow-[3px_3px_0px_#ffbe0b,6px_6px_0px_#d4145a,9px_9px_0px_#3a86ff]", label: "3 layers — gold + pink + blue" },
                          { shadow: "shadow-[3px_3px_0px_#ffbe0b,6px_6px_0px_#d4145a,9px_9px_0px_#3a86ff,12px_12px_0px_#8338ec]", label: "4 layers — maximum" },
                        ].map((s, i) => (
                          <div key={i} className={`px-4 py-3 bg-[#1a0a2e] border-4 border-[#8338ec] ${s.shadow}`}>
                            <span className="font-mono text-white text-xs">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div className="p-6 bg-[#1a0a2e] min-h-[200px]">
                  <p className="font-mono text-[#ffbe0b] text-[10px] uppercase tracking-[0.3em] mb-4">// historical maximalism references</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { era: "17th Century", name: "Baroque", desc: "Ornate decoration, dramatic contrasts, gilded excess in architecture and art.", color: "#ffbe0b", border: "#d4145a" },
                      { era: "1981", name: "Memphis Milano", desc: "Colorful, geometric, postmodern. Rejected functionalism in favor of playful decoration.", color: "#d4145a", border: "#3a86ff" },
                      { era: "Today", name: "Digital Maximalism", desc: "Layered gradients, multi-shadow stacking, mixed fonts, decorative SVGs everywhere.", color: "#3a86ff", border: "#8338ec" },
                    ].map((ref, i) => (
                      <div
                        key={i}
                        className="p-5 bg-[#1a0a2e] border-4 border-dashed"
                        style={{ borderColor: ref.border, boxShadow: `4px 4px 0px ${ref.color}` }}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: ref.color }}>{ref.era}</p>
                        <h4 className="font-serif font-black text-xl uppercase mb-2" style={{ color: ref.color }}>{ref.name}</h4>
                        <p className="font-sans text-xs text-white/70 leading-relaxed">{ref.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INTERACTIVE ALERTS + NOTIFICATIONS                           */}
      {/* ============================================================ */}
      <section className="py-20 px-4 bg-[#1a0a2e] relative overflow-hidden">

        <div className="absolute top-6 right-6 opacity-25">
          <StarShape size={48} color="#3a86ff" />
        </div>
        <div className="absolute bottom-6 left-6 opacity-25">
          <CircleRing size={64} color="#ffbe0b" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <RevealBlock delay={0}>
            <div className="flex items-center gap-3 mb-2">
              <SpiralDots color="#ffbe0b" />
              <h2 className="font-serif font-black text-4xl md:text-5xl text-white uppercase">
                Alerts &amp; <span className="text-[#ffbe0b]">Feedback</span>
              </h2>
            </div>
            <p className="font-mono text-[#8338ec] text-xs uppercase tracking-[0.4em] mb-10">
              Bold notifications — impossible to miss
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <div className="space-y-3">
                {[
                  {
                    icon: "✓",
                    type: "Success",
                    msg: "Your maximalist creation has been saved with all layers intact.",
                    bg: "bg-[#06d6a0]/10",
                    border: "border-[#06d6a0]",
                    shadow: "shadow-[3px_3px_0px_#06d6a0]",
                    iconBg: "bg-[#06d6a0]",
                    textColor: "text-[#06d6a0]",
                    iconColor: "text-[#1a0a2e]",
                  },
                  {
                    icon: "⚠",
                    type: "Warning",
                    msg: "Adding more layers may increase load time. Keep going anyway.",
                    bg: "bg-[#ffbe0b]/10",
                    border: "border-[#ffbe0b]",
                    shadow: "shadow-[3px_3px_0px_#ffbe0b]",
                    iconBg: "bg-[#ffbe0b]",
                    textColor: "text-[#ffbe0b]",
                    iconColor: "text-[#1a0a2e]",
                  },
                  {
                    icon: "✕",
                    type: "Error",
                    msg: "Too much whitespace detected. Add more decorative elements immediately.",
                    bg: "bg-[#d4145a]/10",
                    border: "border-[#d4145a]",
                    shadow: "shadow-[3px_3px_0px_#d4145a]",
                    iconBg: "bg-[#d4145a]",
                    textColor: "text-[#d4145a]",
                    iconColor: "text-white",
                  },
                  {
                    icon: "ℹ",
                    type: "Info",
                    msg: "Mix at least two font families for authentic maximalist typography.",
                    bg: "bg-[#3a86ff]/10",
                    border: "border-[#3a86ff]",
                    shadow: "shadow-[3px_3px_0px_#3a86ff]",
                    iconBg: "bg-[#3a86ff]",
                    textColor: "text-[#3a86ff]",
                    iconColor: "text-white",
                  },
                ].map((alert, i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 ${alert.bg} border-4 ${alert.border} ${alert.shadow}`}>
                    <div className={`w-7 h-7 shrink-0 ${alert.iconBg} flex items-center justify-center font-black text-sm ${alert.iconColor}`}>
                      {alert.icon}
                    </div>
                    <div>
                      <p className={`font-black text-sm uppercase tracking-wider ${alert.textColor}`}>{alert.type}</p>
                      <p className={`font-sans text-xs mt-0.5 ${alert.textColor} opacity-80`}>{alert.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Toast + Badge demos */}
            <RevealBlock delay={0.2}>
              <div className="space-y-6">
                {/* Badges */}
                <div className="p-6 bg-[#1a0a2e] border-4 border-[#8338ec] shadow-[4px_4px_0px_#d4145a]">
                  <p className="font-mono text-[#ffbe0b] text-[10px] uppercase tracking-[0.3em] mb-4">// badges</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "NEW", bg: "#d4145a", text: "white", border: "#ffbe0b" },
                      { label: "HOT", bg: "#ffbe0b", text: "#1a0a2e", border: "#d4145a" },
                      { label: "LIVE", bg: "#06d6a0", text: "#1a0a2e", border: "#3a86ff" },
                      { label: "PRO", bg: "#8338ec", text: "white", border: "#3a86ff" },
                      { label: "SALE", bg: "#3a86ff", text: "white", border: "#8338ec" },
                      { label: "BETA", bg: "transparent", text: "#ffbe0b", border: "#ffbe0b" },
                    ].map((badge, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 font-mono font-black text-xs uppercase tracking-widest border-[3px]"
                        style={{ backgroundColor: badge.bg, color: badge.text, borderColor: badge.border }}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notification toast style */}
                <div className="p-6 bg-gradient-to-r from-[#d4145a]/15 to-[#8338ec]/15 border-4 border-double border-[#d4145a] shadow-[4px_4px_0px_#ffbe0b,8px_8px_0px_#3a86ff]">
                  <p className="font-mono text-[#ffbe0b] text-[10px] uppercase tracking-[0.3em] mb-4">// toast notification</p>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-[#d4145a] to-[#8338ec] flex items-center justify-center border-2 border-[#ffbe0b]">
                      <StarShape size={16} color="#ffbe0b" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-wider">Maximalism Applied</p>
                      <p className="font-sans text-xs text-white/70 mt-1 leading-snug">
                        All principles active: 6 colors, 3 fonts, multi-layer shadows. Visual excess achieved.
                      </p>
                      <p className="font-mono text-[#8338ec] text-[10px] mt-2 uppercase tracking-[0.2em]">just now</p>
                    </div>
                    <button className="shrink-0 w-5 h-5 bg-[#8338ec]/20 border-2 border-[#8338ec]/40 flex items-center justify-center hover:bg-[#d4145a] hover:border-[#d4145a] transition-colors duration-200">
                      <span className="text-white text-[10px] font-black">✕</span>
                    </button>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="p-6 bg-[#1a0a2e] border-4 border-[#3a86ff] shadow-[4px_4px_0px_#8338ec]">
                  <p className="font-mono text-[#ffbe0b] text-[10px] uppercase tracking-[0.3em] mb-4">// progress bars</p>
                  <div className="space-y-3">
                    {[
                      { label: "Color Saturation", pct: 95, from: "#d4145a", to: "#8338ec" },
                      { label: "Font Mixing", pct: 100, from: "#ffbe0b", to: "#06d6a0" },
                      { label: "Shadow Depth", pct: 80, from: "#3a86ff", to: "#8338ec" },
                      { label: "Empty Space", pct: 4, from: "#8338ec", to: "#d4145a" },
                    ].map((bar, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{bar.label}</span>
                          <span className="font-mono text-[10px] text-[#ffbe0b]">{bar.pct}%</span>
                        </div>
                        <div className="h-3 bg-[#8338ec]/20 border-2 border-[#8338ec]/30">
                          <div
                            className="h-full transition-all duration-700"
                            style={{
                              width: `${bar.pct}%`,
                              background: `linear-gradient(to right, ${bar.from}, ${bar.to})`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER — pattern explosion                                    */}
      {/* ============================================================ */}
      <footer className="relative overflow-hidden bg-[#1a0a2e] pt-16 pb-10 px-4">
        {/* Thick top gradient border */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#d4145a] via-[#ffbe0b] via-[#3a86ff] via-[#8338ec] to-[#06d6a0]" />

        {/* Background decorations — maximum chaos */}
        <div className="absolute top-8 left-4 md:left-16 opacity-40">
          <StarShape size={64} color="#d4145a" />
        </div>
        <div className="absolute top-6 right-8 md:right-20 opacity-35">
          <CircleRing size={80} color="#ffbe0b" />
        </div>
        <div className="absolute top-1/2 left-[10%] opacity-25">
          <DiamondShape size={56} color="#3a86ff" />
        </div>
        <div className="absolute top-1/3 right-[10%] opacity-30">
          <TriangleBurst size={48} color="#8338ec" />
        </div>
        <div className="absolute bottom-20 left-[20%] opacity-30">
          <ZigzagLine width={120} color="#06d6a0" />
        </div>
        <div className="absolute bottom-16 right-[22%] opacity-25">
          <ZigzagLine width={100} color="#d4145a" />
        </div>
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 opacity-15">
          <CircleRing size={200} color="#8338ec" />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-10">
          <SpiralDots color="#ffbe0b" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Footer main */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CrossPlus size={20} color="#d4145a" />
                <span className="font-serif font-black text-2xl uppercase">
                  <span className="text-[#d4145a]">Maxi</span>
                  <span className="text-[#ffbe0b]">mal</span>
                  <span className="text-[#3a86ff]">ism</span>
                </span>
              </div>
              <p className="font-sans text-sm text-[#8338ec] leading-relaxed mb-4">
                Reject restraint. Embrace excess. Every empty space is a missed opportunity for decoration.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["#d4145a", "#ffbe0b", "#3a86ff", "#8338ec", "#06d6a0"].map((c) => (
                  <div
                    key={c}
                    className="w-5 h-5 border-2 border-white/20 hover:scale-125 transition-transform duration-200 cursor-pointer"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-serif font-black text-[#ffbe0b] text-sm uppercase tracking-widest mb-4 border-b-4 border-dashed border-[#ffbe0b]/30 pb-2">
                StyleKit
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "All Styles", href: "/styles" },
                  { label: "Minimalism", href: "/styles/minimalist-flat" },
                  { label: "Bauhaus", href: "/styles/bauhaus" },
                  { label: "Memphis", href: "/styles/memphis" },
                  { label: "Neo-Brutalist", href: "/styles/neo-brutalist" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-[#8338ec] hover:text-[#ffbe0b] transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <DiamondShape size={8} color="#d4145a" className="group-hover:scale-150 transition-transform duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Philosophy */}
            <div>
              <h4 className="font-serif font-black text-[#d4145a] text-sm uppercase tracking-widest mb-4 border-b-4 border-dashed border-[#d4145a]/30 pb-2">
                The Way
              </h4>
              <div className="space-y-3">
                {[
                  { label: "More Is More", color: "#d4145a" },
                  { label: "Clash Colors", color: "#ffbe0b" },
                  { label: "Mix Fonts", color: "#3a86ff" },
                  { label: "Stack Shadows", color: "#8338ec" },
                  { label: "Fill The Void", color: "#06d6a0" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <StarShape size={10} color={item.color} />
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: item.color }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="border-t-4 border-double border-[#8338ec]/40 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ZigzagLine width={40} color="#d4145a" />
              <p className="font-mono text-xs text-[#8338ec] uppercase tracking-[0.3em]">
                Maximalism Showcase · Part of{" "}
                <Link href="/" className="text-[#ffbe0b] hover:text-white transition-colors duration-200 underline underline-offset-2 decoration-[#ffbe0b]/50">
                  StyleKit
                </Link>
              </p>
              <ZigzagLine width={40} color="#ffbe0b" />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#8338ec] uppercase tracking-widest">极繁主义</span>
              <StarShape size={16} color="#d4145a" />
              <span className="font-mono text-[10px] text-[#3a86ff] uppercase tracking-widest">More Is More</span>
            </div>
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#8338ec] via-[#d4145a] via-[#ffbe0b] to-[#06d6a0]" />
      </footer>
    </div>
  );
}
