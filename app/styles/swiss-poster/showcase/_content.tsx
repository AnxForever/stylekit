"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const posterWorks = [
  { id: 1, year: "2024", title: "HELVETICA", subtitle: "Grid-aligned typographic content", cols: "col-span-12 md:col-span-8" },
  { id: 2, year: "1957", title: "AKZIDENZ", subtitle: "Rational form and function", cols: "col-span-12 md:col-span-4" },
  { id: 3, year: "1961", title: "UNIVERS", subtitle: "Mathematical precision in every stroke", cols: "col-span-12 md:col-span-4" },
  { id: 4, year: "1972", title: "MULLER", subtitle: "The grid is the message", cols: "col-span-12 md:col-span-8" },
  { id: 5, year: "2019", title: "BROCKMANN", subtitle: "Structure defines communication", cols: "col-span-12 md:col-span-6" },
  { id: 6, year: "1968", title: "RUDER", subtitle: "Typography as architecture", cols: "col-span-12 md:col-span-6" },
];

const colorBlocks = [
  { name: "BLACK", value: "#000000" },
  { name: "WHITE", value: "#ffffff" },
  { name: "RED", value: "#ff0000" },
  { name: "BLUE", value: "#0057b8" },
  { name: "YELLOW", value: "#ffcc00" },
];

const doRules = [
  "Absolute Objectivity: zero translate, scale, or shadow on any element",
  "Snap Transitions: all interactions use transition-none -- hard cuts like ink stamps",
  "Color Block Invasion: hover replaces bg with solid black, text inverts to white",
  "Typographic Highlighting: year/label switches to red on hover, transition-none",
  "12-column grid with asymmetric splits (3/9, 8/4, never 6/6)",
  "gap-0 with border-2 border-[#000000] as dividers",
];

const dontRules = [
  "Never use translate, scale, or rotate animations",
  "Never use any transition duration (must be transition-none)",
  "Never use shadows of any kind",
  "Never use rounded corners larger than rounded-sm",
  "Never use gradients or blur effects",
  "Never hover only text color without background flip (Color Block Invasion)",
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

function PosterCard({ item }: { item: typeof posterWorks[0] }) {
  return (
    <div className={`group ${item.cols} p-8 bg-[#ffffff] border-2 border-[#000000] rounded-none hover:bg-[#000000] transition-none cursor-pointer`}>
      <span className="text-xs font-sans font-black text-[#000000]/40 group-hover:text-[#ff0000] uppercase tracking-[0.3em] transition-none">
        {item.year}
      </span>
      <h3 className="text-3xl md:text-4xl font-sans font-black text-[#000000] group-hover:text-[#ffffff] uppercase tracking-tight mb-3 mt-2 transition-none">
        {item.title}
      </h3>
      <div className="h-[2px] bg-[#000000] group-hover:bg-[#ff0000] transition-none mb-4" />
      <p className="text-[#000000]/60 group-hover:text-[#ffffff]/70 font-sans text-sm transition-none">
        {item.subtitle}
      </p>
    </div>
  );
}

function PosterButton({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "secondary" }) {
  if (variant === "secondary") {
    return (
      <button className="px-8 py-3 bg-transparent text-[#000000] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] border-l-0 hover:bg-[#000000] hover:text-[#ffffff] active:bg-[#ffffff] active:text-[#000000] transition-none">
        {children}
      </button>
    );
  }
  return (
    <button className="px-8 py-3 bg-[#000000] text-[#ffffff] font-sans font-black uppercase tracking-widest rounded-none border-2 border-[#000000] hover:bg-[#ff0000] hover:border-[#ff0000] active:bg-[#ffffff] active:text-[#000000] active:border-[#000000] transition-none">
      {children}
    </button>
  );
}

function PosterInput() {
  return (
    <div>
      <label className="block text-xs font-sans font-black text-[#000000]/50 uppercase tracking-[0.3em] mb-2">
        Field Label
      </label>
      <input
        type="text"
        placeholder="TYPE HERE"
        className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-[#000000] rounded-none text-[#000000] placeholder-[#000000]/20 font-sans font-bold text-lg focus:border-[#ff0000] focus:outline-none transition-none"
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
    <div className="min-h-screen bg-[#ffffff] text-[#000000]">
      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-4 md:col-span-3 px-4 md:px-8 py-4 border-r-2 border-[#000000]">
            <Link href="/styles/swiss-poster/showcase" className="font-sans font-black text-sm uppercase tracking-[0.3em]">
              SWISS POSTER
            </Link>
          </div>
          <div className="col-span-8 md:col-span-9 px-4 md:px-8 py-4 flex items-center justify-end gap-0">
            <Link href="/styles/swiss-poster" className="px-4 py-1 font-sans font-black text-[10px] uppercase tracking-[0.3em] text-[#000000]/50 hover:bg-[#000000] hover:text-[#ffffff] transition-none">
              DOCS
            </Link>
            <Link href="/styles" className="px-4 py-1 font-sans font-black text-[10px] uppercase tracking-[0.3em] text-[#000000]/50 hover:bg-[#000000] hover:text-[#ffffff] transition-none border-l-2 border-[#000000]">
              STYLES
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="pt-20 border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 px-6 md:px-12 pt-8 pb-12 md:border-r-2 border-[#000000]">
            <h1
              className="text-[80px] md:text-[120px] lg:text-[160px] font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              SWISS
            </h1>
            <h2
              className="text-[50px] md:text-[80px] lg:text-[100px] font-sans font-black text-[#000000] uppercase leading-[0.85] tracking-tighter -mt-2"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              POSTER
            </h2>
            <p
              className="text-xs font-sans text-[#000000]/50 leading-relaxed uppercase tracking-wider mt-8 max-w-md"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            >
              Bold typography. Mathematical grid system. Asymmetric composition. Zero decoration.
            </p>
            <div
              className="flex gap-0 mt-10"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              <PosterButton>EXPLORE</PosterButton>
              <PosterButton variant="secondary">LEARN</PosterButton>
            </div>
          </div>
          <div className="hidden md:flex col-span-4 bg-[#ff0000] items-center justify-center min-h-[400px] relative">
            <span className="font-sans font-black text-[#ffffff] text-sm uppercase tracking-[0.5em]" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>
              INTERNATIONAL STYLE
            </span>
          </div>
        </div>
      </section>

      {/* ===== Grid Gallery ===== */}
      <section className="border-b-2 border-[#000000]">
        <div className="grid grid-cols-12 border-b-2 border-[#000000]">
          <div className="col-span-12 px-6 md:px-12 py-6">
            <RevealBlock>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.3em] block mb-1">Gallery</span>
                  <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter">WORKS</h2>
                </div>
                <span className="text-[10px] font-sans font-black text-[#000000]/30 uppercase tracking-[0.3em]">
                  {posterWorks.length} ITEMS
                </span>
              </div>
            </RevealBlock>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {posterWorks.map((item, i) => (
            <RevealBlock key={item.id} delay={i * 0.05} className={item.cols}>
              <PosterCard item={item} />
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ===== Component Demos ===== */}
      <section className="border-b-2 border-[#000000]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 px-6 md:px-12 py-6 border-b-2 border-[#000000]">
            <RevealBlock>
              <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.3em] block mb-1">Components</span>
              <h2 className="text-4xl md:text-5xl font-sans font-black uppercase tracking-tighter">ELEMENTS</h2>
            </RevealBlock>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-12 border-b-2 border-[#000000]">
          {(["button", "card", "input"] as const).map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`col-span-4 py-3 font-sans font-black text-xs uppercase tracking-[0.3em] transition-none ${
                i > 0 ? "border-l-2 border-[#000000]" : ""
              } ${
                activeTab === tab
                  ? "bg-[#000000] text-[#ffffff]"
                  : "bg-[#ffffff] text-[#000000]/40 hover:bg-[#000000] hover:text-[#ffffff]"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <RevealBlock>
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-8 md:col-start-3 px-6 md:px-12 py-12 flex flex-col items-center gap-6">
              {activeTab === "button" && (
                <div className="flex flex-col items-center gap-8">
                  <div className="flex gap-0">
                    <PosterButton>ENTER</PosterButton>
                    <PosterButton variant="secondary">LEARN</PosterButton>
                  </div>
                  <p className="text-[10px] font-sans text-[#000000]/30 uppercase tracking-[0.3em] text-center">
                    Color Block Invasion: hover flips bg to red. Snap transition-none. Active inverts to white.
                  </p>
                </div>
              )}

              {activeTab === "card" && (
                <div className="w-full max-w-md">
                  <PosterCard item={posterWorks[0]} />
                  <p className="text-[10px] font-sans text-[#000000]/30 uppercase tracking-[0.3em] text-center mt-6">
                    Color Block Invasion: entire bg flips to black. Year label turns red. transition-none.
                  </p>
                </div>
              )}

              {activeTab === "input" && (
                <div className="w-full max-w-md">
                  <PosterInput />
                  <p className="text-[10px] font-sans text-[#000000]/30 uppercase tracking-[0.3em] text-center mt-6">
                    Bottom border only. Focus activates red accent. No rounded corners.
                  </p>
                </div>
              )}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="border-b-2 border-[#000000]">
        <div className="grid grid-cols-12 border-b-2 border-[#000000]">
          <div className="col-span-12 px-6 md:px-12 py-6">
            <RevealBlock>
              <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.3em] block mb-1">Palette</span>
              <h2 className="text-4xl md:text-5xl font-sans font-black uppercase tracking-tighter">COLORS</h2>
            </RevealBlock>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-0">
          {colorBlocks.map((color, i) => (
            <RevealBlock key={color.value} delay={i * 0.05}>
              <div
                className={`group aspect-square flex flex-col items-center justify-center cursor-pointer transition-none ${
                  i < colorBlocks.length - 1 ? "border-r-2 border-[#000000]" : ""
                } ${color.value === "#ffffff" ? "hover:bg-[#000000]" : `hover:bg-[${color.value}]`}`}
                style={{ backgroundColor: color.value }}
              >
                <span className={`font-sans font-black text-xs uppercase tracking-[0.3em] transition-none ${
                  color.value === "#000000" || color.value === "#0057b8"
                    ? "text-[#ffffff]"
                    : color.value === "#ffffff"
                      ? "text-[#000000] group-hover:text-[#ffffff]"
                      : "text-[#000000]"
                }`}>
                  {color.name}
                </span>
                <span className={`font-sans text-[10px] tracking-wider mt-1 transition-none ${
                  color.value === "#000000" || color.value === "#0057b8"
                    ? "text-[#ffffff]/60"
                    : color.value === "#ffffff"
                      ? "text-[#000000]/40 group-hover:text-[#ffffff]/60"
                      : "text-[#000000]/60"
                }`}>
                  {color.value}
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="border-b-2 border-[#000000]">
        <div className="grid grid-cols-12 border-b-2 border-[#000000]">
          <div className="col-span-12 px-6 md:px-12 py-6">
            <RevealBlock>
              <span className="text-[10px] font-sans font-black text-[#000000]/40 uppercase tracking-[0.3em] block mb-1">Rules</span>
              <h2 className="text-4xl md:text-5xl font-sans font-black uppercase tracking-tighter">MANIFESTO</h2>
            </RevealBlock>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* Do */}
          <RevealBlock delay={0.05} className="col-span-12 md:col-span-6 md:border-r-2 border-[#000000]">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-[#000000]" />
                <h3 className="font-sans font-black text-sm uppercase tracking-[0.3em]">DO</h3>
              </div>
              <ul className="space-y-0">
                {doRules.map((rule, i) => (
                  <li key={rule} className="group py-3 border-b border-[#000000]/10 hover:bg-[#000000] hover:border-[#000000] transition-none cursor-default">
                    <div className="flex items-start gap-3 px-2">
                      <span className="text-[10px] font-sans font-black text-[#000000]/30 group-hover:text-[#ff0000] transition-none mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-sans text-[#000000]/70 group-hover:text-[#ffffff] transition-none">
                        {rule}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* Don't */}
          <RevealBlock delay={0.1} className="col-span-12 md:col-span-6 border-t-2 md:border-t-0 border-[#000000]">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-[#ff0000]" />
                <h3 className="font-sans font-black text-sm uppercase tracking-[0.3em] text-[#ff0000]">DON&apos;T</h3>
              </div>
              <ul className="space-y-0">
                {dontRules.map((rule, i) => (
                  <li key={rule} className="group py-3 border-b border-[#000000]/10 hover:bg-[#000000] hover:border-[#000000] transition-none cursor-default">
                    <div className="flex items-start gap-3 px-2">
                      <span className="text-[10px] font-sans font-black text-[#ff0000]/50 group-hover:text-[#ff0000] transition-none mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-sans text-[#000000]/70 group-hover:text-[#ffffff] transition-none">
                        {rule}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-b-2 border-[#000000]">
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12 md:col-span-4 px-6 md:px-8 py-6 md:border-r-2 border-[#000000]">
            <span className="font-sans font-black text-sm uppercase tracking-[0.3em]">SWISS POSTER</span>
          </div>
          <div className="col-span-12 md:col-span-8 px-6 md:px-8 py-6 flex items-center justify-end gap-0">
            <Link href="/styles/swiss-poster" className="px-4 py-1 font-sans font-black text-[10px] uppercase tracking-[0.3em] text-[#000000]/50 hover:bg-[#000000] hover:text-[#ffffff] transition-none">
              DOCS
            </Link>
            <Link href="/styles" className="px-4 py-1 font-sans font-black text-[10px] uppercase tracking-[0.3em] text-[#000000]/50 hover:bg-[#000000] hover:text-[#ffffff] transition-none border-l-2 border-[#000000]">
              ALL STYLES
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
