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

const INK_COLORS = [
  { name: "Fluorescent Pink", hex: "#ff6b9d", label: "FL. PINK", role: "Primary" },
  { name: "Risograph Blue", hex: "#2563eb", label: "RISO BLUE", role: "Secondary" },
  { name: "Burn Orange", hex: "#ff8a00", label: "ORANGE", role: "Accent A" },
  { name: "Sap Green", hex: "#22c55e", label: "GREEN", role: "Accent B" },
];

const TITLE_LETTERS = [
  { char: "R", color: "#ff6b9d" },
  { char: "I", color: "#2563eb" },
  { char: "S", color: "#ff8a00" },
  { char: "O", color: "#22c55e" },
  { char: "G", color: "#ff6b9d" },
  { char: "R", color: "#2563eb" },
  { char: "A", color: "#ff8a00" },
  { char: "P", color: "#22c55e" },
  { char: "H", color: "#ff6b9d" },
];

const DESIGN_RULES = [
  { rule: "Limit 2-3 ink colors", note: "Enforce the real Riso palette constraint", pass: true },
  { rule: "Misregistration offset shadows", note: "dual-direction: bottom-right blue + top-left orange", pass: true },
  { rule: "Bold monospace fonts", note: "font-mono — stencil mechanical fidelity", pass: true },
  { rule: "Flat solid fills only", note: "no gradients — ink is opaque and flat", pass: true },
  { rule: "Halftone / grain texture", note: "radial-gradient dot pattern or SVG noise", pass: true },
  { rule: "Paper-tone background", note: "bg-[#fffbf0] — warm newsprint, never pure white", pass: true },
  { rule: "ease-linear transitions", note: "duration-100 — mechanical press snap speed", pass: true },
  { rule: "Hard border outlines", note: "border-2 border-[#1a1a1a] on all containers", pass: true },
  { rule: "soft box-shadow with blur", note: "forbidden — breaks hard-edge print illusion", pass: false },
  { rule: "ease-in-out transitions", note: "forbidden — organic motion kills the snap", pass: false },
  { rule: "rounded-lg or larger corners", note: "forbidden — too smooth, too digital", pass: false },
  { rule: "single-direction shadow", note: "forbidden — Riso always has two ink plates", pass: false },
  { rule: "complex gradients", note: "forbidden — ink is flat and opaque", pass: false },
];

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`;

export default function RisographShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeInkLayer, setActiveInkLayer] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fffbf0] text-[#1a1a1a]"
      style={{ backgroundImage: GRAIN_SVG }}
    >
      <style>{`
        @keyframes riso-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .riso-marquee-track {
          animation: riso-marquee 18s linear infinite;
        }
        .riso-btn {
          transition: box-shadow 100ms ease-linear, background-color 100ms ease-linear,
            color 100ms ease-linear, transform 100ms ease-linear;
        }
        .riso-btn:hover {
          box-shadow: 6px 6px 0 #2563eb, -4px -4px 0 #ff8a00;
          transform: translate(-1px, -1px);
        }
        .riso-btn:active {
          background-color: #2563eb !important;
          color: #ff6b9d !important;
          box-shadow: none !important;
          transform: translate(3px, 3px) !important;
        }
        .riso-card-hover {
          transition: box-shadow 100ms ease-linear;
        }
        .riso-card-hover:hover {
          box-shadow: 8px 8px 0 #2563eb, -6px -6px 0 #ff8a00;
        }
        .halftone-pink {
          background-image: radial-gradient(circle, #ff6b9d 1px, transparent 1px);
          background-size: 8px 8px;
        }
        .halftone-blue {
          background-image: radial-gradient(circle, #2563eb 1px, transparent 1px);
          background-size: 8px 8px;
        }
        .halftone-orange {
          background-image: radial-gradient(circle, #ff8a00 1px, transparent 1px);
          background-size: 8px 8px;
        }
        .halftone-green {
          background-image: radial-gradient(circle, #22c55e 1px, transparent 1px);
          background-size: 8px 8px;
        }
        .riso-input:focus {
          border-color: #2563eb;
          box-shadow: 2px 2px 0 #ff6b9d;
          outline: none;
        }
        .riso-reg-mark {
          transition: transform 100ms ease-linear;
          transform: translate(8px, -8px);
        }
        .group:hover .riso-reg-mark {
          transform: translate(0px, 0px);
        }
      `}</style>

      {/* ── 01 NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fffbf0]/95 border-b-2 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="font-mono font-black text-lg tracking-[0.2em] text-[#ff6b9d] uppercase"
              style={{ textShadow: "2px 2px 0 #2563eb" }}
            >
              Risograph
            </span>
            <span className="hidden md:inline font-mono text-[10px] tracking-[0.15em] uppercase text-[#1a1a1a]/30 border border-[#1a1a1a]/20 px-2 py-0.5 rounded-sm">
              Screen Print
            </span>
          </div>
          <nav className="flex items-center gap-6">
            {[
              { href: "#components", label: "Components" },
              { href: "#ink-layers", label: "Ink Layers" },
              { href: "#palette", label: "Palette" },
              { href: "#rules", label: "Rules" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/50 hover:text-[#ff6b9d] transition-colors duration-100 ease-linear hidden md:inline"
              >
                {label}
              </a>
            ))}
            <Link
              href="/styles/risograph"
              className="font-mono text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/60 hover:text-[#2563eb] transition-colors duration-100 ease-linear"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="font-mono text-xs tracking-[0.15em] uppercase bg-[#1a1a1a] text-[#fffbf0] px-3 py-1.5 rounded-sm hover:bg-[#ff6b9d] transition-colors duration-100 ease-linear"
            >
              Styles
            </Link>
          </nav>
        </div>
      </header>

      {/* ── 02 HERO ── */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Misregistration layered color blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Pink plate — left side */}
          <div
            className="absolute top-16 left-[-40px] w-80 h-80"
            style={{ backgroundColor: "#ff6b9d", opacity: 0.12, mixBlendMode: "multiply" }}
          />
          {/* Blue plate — slightly offset from pink, simulating misregistration */}
          <div
            className="absolute top-24 left-[-28px] w-80 h-80"
            style={{ backgroundColor: "#2563eb", opacity: 0.08, mixBlendMode: "multiply" }}
          />
          {/* Orange blob — top right */}
          <div
            className="absolute top-10 right-[-20px] w-64 h-64 rounded-full"
            style={{ backgroundColor: "#ff8a00", opacity: 0.10, mixBlendMode: "multiply" }}
          />
          {/* Green blob — offset from orange */}
          <div
            className="absolute top-16 right-[-10px] w-64 h-64 rounded-full"
            style={{ backgroundColor: "#22c55e", opacity: 0.08, mixBlendMode: "multiply" }}
          />
          {/* Bottom halftone strip */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 halftone-pink"
            style={{ opacity: 0.06 }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full">
          {/* Giant misregistered title */}
          <h1
            className="font-mono font-black leading-none tracking-tight mb-2 select-none"
            style={{ fontSize: "clamp(3.5rem, 13vw, 10.5rem)" }}
          >
            {TITLE_LETTERS.map((l, i) => (
              <span
                key={i}
                style={{
                  color: l.color,
                  display: "inline-block",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed
                    ? "translateY(0) rotate(0deg)"
                    : "translateY(60px) rotate(-5deg)",
                  transition: `opacity 0.35s ease-linear ${i * 0.04}s, transform 0.35s ease-linear ${i * 0.04}s`,
                  textShadow:
                    i % 2 === 0
                      ? `3px 3px 0 #2563eb`
                      : `3px 3px 0 #ff6b9d`,
                }}
              >
                {l.char}
              </span>
            ))}
          </h1>

          {/* Misregistered subtitle — blue plate offset */}
          <div
            className="relative mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.4s ease-linear 0.4s, transform 0.4s ease-linear 0.4s",
            }}
          >
            <p
              className="font-mono font-bold text-sm md:text-base tracking-[0.3em] uppercase max-w-2xl"
              style={{ color: "#2563eb", position: "absolute", top: "2px", left: "3px", opacity: 0.35 }}
              aria-hidden="true"
            >
              Screen-printed aesthetics. Intentional misregistration. Four ink drums,
              one pass at a time.
            </p>
            <p className="font-mono font-bold text-sm md:text-base tracking-[0.3em] uppercase text-[#1a1a1a]/70 max-w-2xl relative">
              Screen-printed aesthetics. Intentional misregistration. Four ink drums,
              one pass at a time.
            </p>
          </div>

          {/* Hero CTA buttons */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.4s ease-linear 0.55s",
            }}
          >
            <button
              type="button"
              className="riso-btn font-mono font-black text-sm uppercase tracking-widest px-8 py-3.5 bg-[#ff6b9d] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a]"
            >
              Print Run
            </button>
            <button
              type="button"
              className="riso-btn font-mono font-bold text-sm uppercase tracking-widest px-8 py-3.5 bg-[#fffbf0] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a]"
            >
              View Layers
            </button>
            <button
              type="button"
              className="riso-btn font-mono font-bold text-sm uppercase tracking-widest px-8 py-3.5 bg-[#2563eb] text-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a]"
            >
              Overprint
            </button>
          </div>

          {/* Hero stat row */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.4s ease-linear 0.7s",
            }}
          >
            {[
              { value: "4", label: "Ink Colors" },
              { value: "2-3", label: "Per Section" },
              { value: "100ms", label: "Transition" },
              { value: "0", label: "Blur Allowed" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="border-2 border-[#1a1a1a] rounded-sm p-4 bg-[#fffbf0]"
              >
                <p className="font-mono font-black text-3xl text-[#ff6b9d] leading-none mb-1">
                  {value}
                </p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1a1a1a]/40">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE BAND ── */}
      <div className="border-y-2 border-[#1a1a1a] py-3 overflow-hidden bg-[#ff6b9d]">
        <div className="flex w-[200%] riso-marquee-track">
          {[0, 1].map((k) => (
            <div
              key={k}
              className="flex-1 flex items-center gap-8 px-8 font-mono font-bold text-xs tracking-[0.3em] uppercase text-[#1a1a1a]"
            >
              <span>Risograph</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full flex-shrink-0" />
              <span>Screen Print</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full flex-shrink-0" />
              <span>Overprint</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full flex-shrink-0" />
              <span>Misregistration</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full flex-shrink-0" />
              <span>Four Colors</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full flex-shrink-0" />
              <span>Flat Ink</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full flex-shrink-0" />
              <span>Newsprint</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full flex-shrink-0" />
              <span>Halftone</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ── 03 COMPONENTS DEMO ── */}
      <section id="components" className="py-24 px-6 max-w-6xl mx-auto">
        <RevealBlock className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
            02 / Components
          </p>
          <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
            Print{" "}
            <span
              className="text-[#2563eb]"
              style={{ textShadow: "2px 2px 0 #ff6b9d" }}
            >
              Components
            </span>
          </h2>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/40 mt-3 max-w-lg">
            Each component follows Misregistration Offset, Instant Print, and Overprint Illusion rules.
          </p>
        </RevealBlock>

        {/* Button Showcase */}
        <RevealBlock className="mb-10" delay={0.05}>
          <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
            <div className="bg-[#1a1a1a] px-6 py-3 flex items-center justify-between">
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#fffbf0]">
                Buttons — Misregistration Offset on Hover
              </p>
              <span className="font-mono text-[10px] text-[#ff6b9d] tracking-widest">
                hover: dual-shadow
              </span>
            </div>
            <div className="p-8 bg-[#fffbf0] flex flex-wrap gap-4 items-center">
              {[
                { bg: "#ff6b9d", label: "Overprint", textCol: "#1a1a1a" },
                { bg: "#2563eb", label: "Riso Blue", textCol: "#fffbf0" },
                { bg: "#ff8a00", label: "Burn Orange", textCol: "#1a1a1a" },
                { bg: "#22c55e", label: "Sap Green", textCol: "#1a1a1a" },
                { bg: "#fffbf0", label: "Newsprint", textCol: "#1a1a1a" },
              ].map(({ bg, label, textCol }) => (
                <button
                  key={bg}
                  type="button"
                  className="riso-btn font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a]"
                  style={{ backgroundColor: bg, color: textCol }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="px-6 py-3 border-t-2 border-[#1a1a1a] bg-[#fffbf0]">
              <code className="font-mono text-[10px] text-[#1a1a1a]/50">
                hover:shadow-[6px_6px_0_#2563eb,-4px_-4px_0_#ff8a00] active:bg-[#2563eb] duration-100 ease-linear
              </code>
            </div>
          </div>
        </RevealBlock>

        {/* Cards — Registration Shift */}
        <RevealBlock className="mb-10" delay={0.1}>
          <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
            <div className="bg-[#1a1a1a] px-6 py-3 flex items-center justify-between">
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#fffbf0]">
                Cards — Registration Shift Green Corner
              </p>
              <span className="font-mono text-[10px] text-[#22c55e] tracking-widest">
                hover: corner locks in
              </span>
            </div>
            <div className="p-8 bg-[#fffbf0]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Layer One",
                    body: "The first drum lays fluorescent pink. Solid fills, bold shapes — no blending yet.",
                    accent: "#ff6b9d",
                    num: "01",
                  },
                  {
                    title: "Layer Two",
                    body: "Blue passes second. Text and geometry gain cool contrast against the warm paper.",
                    accent: "#2563eb",
                    num: "02",
                  },
                  {
                    title: "Overprint",
                    body: "Where pink and blue overlap, a third color emerges — the signature of Riso.",
                    accent: "#ff8a00",
                    num: "03",
                  },
                ].map(({ title, body, accent, num }) => (
                  <div
                    key={num}
                    className="group relative border-2 border-[#1a1a1a] rounded-sm p-6 bg-[#fffbf0] riso-card-hover cursor-pointer"
                    style={{ boxShadow: "4px 4px 0 #1a1a1a" }}
                  >
                    {/* Registration mark — shifts into position on hover */}
                    <div
                      className="absolute top-0 right-0 w-8 h-8 border-b-2 border-l-2 border-[#1a1a1a] riso-reg-mark"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                    <p
                      className="font-mono font-black text-4xl mb-4 leading-none"
                      style={{
                        color: accent,
                        textShadow: `2px 2px 0 #1a1a1a`,
                      }}
                    >
                      {num}
                    </p>
                    <h3 className="font-mono font-bold text-sm uppercase tracking-widest mb-2 text-[#1a1a1a]">
                      {title}
                    </h3>
                    <p className="font-mono text-xs text-[#1a1a1a]/60 leading-relaxed border-t-2 border-[#1a1a1a]/10 pt-3 mt-3">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* Input Component */}
        <RevealBlock delay={0.15}>
          <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
            <div className="bg-[#1a1a1a] px-6 py-3 flex items-center justify-between">
              <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#fffbf0]">
                Input — Focus Misregistration Shadow
              </p>
              <span className="font-mono text-[10px] text-[#ff8a00] tracking-widest">
                focus: blue border + pink shadow
              </span>
            </div>
            <div className="p-8 bg-[#fffbf0]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2">
                    Text Input
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="riso-input w-full px-4 py-3 bg-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm text-[#1a1a1a] font-mono text-sm transition-all duration-100 ease-linear"
                    style={{ caretColor: "#ff6b9d" }}
                  />
                  <p className="font-mono text-[10px] text-[#1a1a1a]/30 mt-2 tracking-widest uppercase">
                    focus:border-[#2563eb] focus:shadow-[2px_2px_0_#ff6b9d]
                  </p>
                </div>
                <div>
                  <label className="block font-mono text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50 mb-2">
                    Search Input
                  </label>
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search prints..."
                      className="riso-input w-full px-4 py-3 pr-12 bg-[#fffbf0] border-2 border-[#1a1a1a] rounded-sm text-[#1a1a1a] font-mono text-sm transition-all duration-100 ease-linear"
                      style={{ caretColor: "#ff6b9d" }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#1a1a1a]/30 border border-[#1a1a1a]/20 px-1.5 py-0.5 rounded-sm">
                      /
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-[#1a1a1a]/30 mt-2 tracking-widest uppercase">
                    No border-radius — hard-edge Riso style
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ── 04 HALFTONE PATTERNS ── */}
      <section className="py-24 px-6 border-y-2 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
              03 / Halftone
            </p>
            <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
              Dot{" "}
              <span className="text-[#ff8a00]" style={{ textShadow: "2px 2px 0 #2563eb" }}>
                Patterns
              </span>
            </h2>
            <p className="font-mono text-xs tracking-[0.15em] text-[#1a1a1a]/40 mt-3 max-w-lg">
              Halftone is the foundational visual language of Risograph. Each ink drum
              can produce dot patterns at different densities and angles.
            </p>
          </RevealBlock>

          {/* Halftone grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { cls: "halftone-pink", hex: "#ff6b9d", label: "Pink Dots", size: "8px 8px" },
              { cls: "halftone-blue", hex: "#2563eb", label: "Blue Dots", size: "8px 8px" },
              { cls: "halftone-orange", hex: "#ff8a00", label: "Orange Dots", size: "8px 8px" },
              { cls: "halftone-green", hex: "#22c55e", label: "Green Dots", size: "8px 8px" },
            ].map(({ cls, hex, label }) => (
              <RevealBlock key={cls} delay={0.05}>
                <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden group cursor-pointer hover:shadow-[4px_4px_0_#1a1a1a] transition-shadow duration-100 ease-linear">
                  <div className={`${cls} h-32 w-full`} style={{ opacity: 0.6 }} />
                  <div className="p-3 bg-[#fffbf0] border-t-2 border-[#1a1a1a]">
                    <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                      {label}
                    </p>
                    <p className="font-mono text-[10px] text-[#1a1a1a]/40 mt-0.5">
                      radial-gradient 1px
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Overprint overlap demo */}
          <RevealBlock delay={0.1}>
            <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
              <div className="bg-[#1a1a1a] px-6 py-3">
                <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#fffbf0]">
                  Halftone + Overprint Combination
                </p>
              </div>
              <div className="p-8 bg-[#fffbf0] flex flex-col md:flex-row items-start gap-8">
                {/* stacked halftone layers */}
                <div className="relative shrink-0 w-48 h-48 border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
                  <div
                    className="absolute inset-0 halftone-pink"
                    style={{ opacity: 0.55 }}
                  />
                  <div
                    className="absolute inset-0 halftone-blue"
                    style={{
                      opacity: 0.45,
                      backgroundPosition: "4px 4px",
                      mixBlendMode: "multiply",
                    }}
                  />
                  <div
                    className="absolute inset-0 halftone-orange"
                    style={{
                      opacity: 0.30,
                      backgroundPosition: "2px 6px",
                      mixBlendMode: "multiply",
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-mono font-black text-2xl uppercase tracking-widest text-[#ff6b9d] mb-3">
                    Where Layers Overlap
                  </h3>
                  <p className="font-mono text-xs text-[#1a1a1a]/60 leading-relaxed mb-4">
                    In real Risograph printing, when two ink layers overlap, the result
                    is a new color formed by the transparent soy inks mixing optically.
                    This is called overprinting — the defining characteristic of Riso.
                  </p>
                  <div className="space-y-2">
                    {[
                      { layers: "Pink + Blue", result: "Purple", css: "mix-blend-mode: multiply" },
                      { layers: "Blue + Orange", result: "Brown", css: "opacity: 0.55 each layer" },
                      { layers: "Pink + Green", result: "Teal-Yellow", css: "backgroundPosition offset" },
                    ].map(({ layers, result, css }) => (
                      <div
                        key={layers}
                        className="flex items-center gap-3 font-mono text-xs border-b border-[#1a1a1a]/10 pb-2"
                      >
                        <span className="text-[#1a1a1a]/50 w-32">{layers}</span>
                        <span className="text-[#ff8a00] font-bold">→</span>
                        <span className="text-[#1a1a1a] font-bold w-24">{result}</span>
                        <span className="text-[#1a1a1a]/30 hidden md:inline">{css}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 05 INK LAYERS INTERACTIVE ── */}
      <section id="ink-layers" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
              04 / Ink Layers
            </p>
            <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a] mb-4">
              Four <span className="text-[#ff6b9d]">Print Runs</span>
            </h2>
            <p className="font-mono text-xs tracking-[0.15em] text-[#1a1a1a]/50 max-w-lg">
              Each color requires a separate drum pass. Select a layer to inspect
              the print run — real Riso printers handle one ink at a time.
            </p>
          </RevealBlock>

          {/* Tab row */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {INK_COLORS.map((ink, i) => (
              <button
                key={ink.hex}
                type="button"
                onClick={() => setActiveInkLayer(i)}
                className="font-mono font-bold text-xs uppercase tracking-widest px-5 py-2.5 border-2 border-[#1a1a1a] rounded-sm transition-all duration-100 ease-linear"
                style={{
                  backgroundColor: activeInkLayer === i ? ink.hex : "#fffbf0",
                  color: "#1a1a1a",
                  boxShadow:
                    activeInkLayer === i
                      ? "4px 4px 0 #1a1a1a"
                      : "2px 2px 0 #1a1a1a",
                  transform: activeInkLayer === i ? "none" : "none",
                }}
              >
                {ink.label}
              </button>
            ))}
          </div>

          {/* Layer display panel */}
          <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
            {INK_COLORS.map((ink, i) => (
              <div
                key={ink.hex}
                style={{ display: activeInkLayer === i ? "block" : "none" }}
              >
                <div className="p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-10 bg-[#fffbf0]">
                  {/* Ink blob with misregistration ghost */}
                  <div className="shrink-0 relative" style={{ width: 128, height: 128 }}>
                    {/* ghost — offset misregistration */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 108,
                        height: 108,
                        top: 10,
                        left: 10,
                        backgroundColor: ink.hex,
                        opacity: 0.22,
                        mixBlendMode: "multiply",
                      }}
                    />
                    {/* main ink circle */}
                    <div
                      className="absolute rounded-full border-2 border-[#1a1a1a]"
                      style={{
                        width: 108,
                        height: 108,
                        top: 0,
                        left: 0,
                        backgroundColor: ink.hex,
                      }}
                    />
                    {/* halftone overlay */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 108,
                        height: 108,
                        top: 0,
                        left: 0,
                        backgroundImage: `radial-gradient(circle, #1a1a1a 1px, transparent 1px)`,
                        backgroundSize: "8px 8px",
                        opacity: 0.08,
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-3">
                      <p
                        className="font-mono font-black leading-none"
                        style={{ color: ink.hex, fontSize: "clamp(2.5rem,8vw,4.5rem)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <span className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]/30 border border-[#1a1a1a]/20 px-2 py-0.5 rounded-sm">
                        {ink.role}
                      </span>
                    </div>
                    <h3 className="font-mono font-bold text-xl uppercase tracking-widest text-[#1a1a1a] mb-3">
                      {ink.name}
                    </h3>
                    <p className="font-mono text-xs text-[#1a1a1a]/50 leading-relaxed max-w-sm mb-4">
                      Ink hex:{" "}
                      <span className="font-bold" style={{ color: ink.hex }}>
                        {ink.hex}
                      </span>
                      . Each pass through the drum deposits a flat layer of soy
                      ink on warm newsprint. Slight mechanical offset between
                      passes creates the hallmark misregistration effect.
                    </p>
                    <div className="flex gap-2">
                      <span
                        className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 border border-[#1a1a1a]/20 rounded-sm text-[#1a1a1a]/40"
                      >
                        Flat fill
                      </span>
                      <span
                        className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 border border-[#1a1a1a]/20 rounded-sm text-[#1a1a1a]/40"
                      >
                        Soy ink
                      </span>
                      <span
                        className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 border border-[#1a1a1a]/20 rounded-sm text-[#1a1a1a]/40"
                      >
                        1 drum pass
                      </span>
                    </div>
                  </div>

                  {/* stacked multiply columns */}
                  <div className="ml-auto hidden md:flex items-end gap-0 shrink-0">
                    {INK_COLORS.map((c, j) => (
                      <div
                        key={c.hex}
                        className="border-2 border-[#1a1a1a]"
                        style={{
                          width: 48,
                          height: 80 + j * 16,
                          backgroundColor: c.hex,
                          opacity: j <= i ? 0.85 : 0.12,
                          mixBlendMode: "multiply",
                          marginLeft: j === 0 ? 0 : -4,
                          zIndex: j,
                          position: "relative",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 COLOR PALETTE ── */}
      <section id="palette" className="py-24 px-6 border-t-2 border-[#1a1a1a] bg-[#fffbf0]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
              05 / Ink Palette
            </p>
            <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
              The{" "}
              <span className="text-[#22c55e]" style={{ textShadow: "2px 2px 0 #ff6b9d" }}>
                Drum Colors
              </span>
            </h2>
            <p className="font-mono text-xs tracking-[0.15em] text-[#1a1a1a]/40 mt-3 max-w-xl">
              The Risograph palette is strictly limited to the available drum inks.
              Combine two or three at most per composition. Never use more.
            </p>
          </RevealBlock>

          {/* Large swatch row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {[
              { name: "FL. Pink", hex: "#ff6b9d", label: "Primary", usage: "Headlines, CTAs, emphasis shapes" },
              { name: "Riso Blue", hex: "#2563eb", label: "Secondary", usage: "Body text, secondary shapes" },
              { name: "Orange", hex: "#ff8a00", label: "Accent A", usage: "Accent marks, registration" },
              { name: "Green", hex: "#22c55e", label: "Accent B", usage: "Registration marks, labels" },
              { name: "Newsprint", hex: "#fffbf0", label: "Paper", usage: "Always the base — never pure white", dark: true },
            ].map(({ name, hex, label, usage, dark }) => (
              <RevealBlock key={hex} delay={0.04}>
                <div className="group border-2 border-[#1a1a1a] rounded-sm overflow-hidden hover:shadow-[4px_4px_0_#1a1a1a] transition-shadow duration-100 ease-linear cursor-pointer">
                  {/* swatch with misregistration ghost */}
                  <div className="relative h-28 w-full" style={{ backgroundColor: hex }}>
                    <div
                      className="absolute inset-0 translate-x-1 translate-y-1"
                      style={{ backgroundColor: hex, opacity: 0.3 }}
                    />
                    {/* halftone overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle, #1a1a1a 1px, transparent 1px)`,
                        backgroundSize: "8px 8px",
                        opacity: 0.05,
                      }}
                    />
                    {dark && (
                      <div className="absolute inset-0 border border-[#1a1a1a]/20" />
                    )}
                    <span className="absolute bottom-2 right-2 font-mono text-[10px] font-bold border border-[#1a1a1a]/30 px-1.5 py-0.5 rounded-sm bg-[#fffbf0]/70 text-[#1a1a1a]">
                      {label}
                    </span>
                  </div>
                  {/* info */}
                  <div className="p-3 bg-[#fffbf0]">
                    <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                      {name}
                    </p>
                    <p className="font-mono text-[10px] text-[#1a1a1a]/40 mt-0.5 mb-1.5">
                      {hex}
                    </p>
                    <p className="font-mono text-[9px] text-[#1a1a1a]/30 leading-relaxed">
                      {usage}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Overprint color mixing demo */}
          <RevealBlock delay={0.1}>
            <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
              <div className="bg-[#ff6b9d] px-6 py-3">
                <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                  Overprint Color Mixing — Two Ink Plates
                </p>
              </div>
              <div className="p-8 bg-[#fffbf0]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { a: "#ff6b9d", b: "#2563eb", label: "Pink + Blue" },
                    { a: "#ff6b9d", b: "#ff8a00", label: "Pink + Orange" },
                    { a: "#2563eb", b: "#22c55e", label: "Blue + Green" },
                    { a: "#ff8a00", b: "#22c55e", label: "Orange + Green" },
                  ].map(({ a, b, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                      <div className="relative w-20 h-20">
                        <div
                          className="absolute w-14 h-14 rounded-full border-2 border-[#1a1a1a]"
                          style={{ backgroundColor: a, top: 0, left: 0, mixBlendMode: "multiply" }}
                        />
                        <div
                          className="absolute w-14 h-14 rounded-full border-2 border-[#1a1a1a]"
                          style={{ backgroundColor: b, bottom: 0, right: 0, mixBlendMode: "multiply" }}
                        />
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 text-center">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 07 DESIGN RULES ── */}
      <section id="rules" className="py-24 px-6 border-t-2 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
              06 / Design Rules
            </p>
            <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
              Print{" "}
              <span className="text-[#ff8a00]" style={{ textShadow: "2px 2px 0 #2563eb" }}>
                Constraints
              </span>
            </h2>
            <p className="font-mono text-xs tracking-[0.15em] text-[#1a1a1a]/40 mt-3 max-w-lg">
              Risograph is defined by what it cannot do. The constraints of the machine
              are the aesthetic. Work within them, not around them.
            </p>
          </RevealBlock>

          {/* Do / Don't split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* DO */}
            <RevealBlock delay={0.05}>
              <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden h-full">
                <div className="bg-[#22c55e] px-6 py-3 border-b-2 border-[#1a1a1a] flex items-center gap-2">
                  <span className="font-mono font-black text-xs w-5 h-5 bg-[#1a1a1a] text-[#22c55e] flex items-center justify-center rounded-sm">+</span>
                  <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                    Do — Follow the Press
                  </p>
                </div>
                <div className="divide-y-2 divide-[#1a1a1a]/10">
                  {[
                    "Limit 2-3 ink colors per composition",
                    "Use dual-direction hover shadows (Misregistration Offset)",
                    "Bold monospace fonts only — font-mono",
                    "Flat solid fills — no gradients ever",
                    "Halftone/grain texture overlays",
                    "Paper-tone background bg-[#fffbf0]",
                    "duration-100 ease-linear on all transitions",
                    "border-2 border-[#1a1a1a] on all containers",
                  ].map((rule) => (
                    <div
                      key={rule}
                      className="px-5 py-3 flex items-start gap-3 hover:bg-[#22c55e]/8 transition-colors duration-100 ease-linear"
                    >
                      <span
                        className="shrink-0 w-4 h-4 border-2 border-[#1a1a1a] rounded-sm font-mono font-black text-[9px] flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: "#22c55e", color: "#1a1a1a" }}
                      >
                        +
                      </span>
                      <span className="font-mono text-xs text-[#1a1a1a] leading-relaxed">
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.1}>
              <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden h-full">
                <div className="bg-[#ff6b9d] px-6 py-3 border-b-2 border-[#1a1a1a] flex items-center gap-2">
                  <span className="font-mono font-black text-xs w-5 h-5 bg-[#1a1a1a] text-[#ff6b9d] flex items-center justify-center rounded-sm">-</span>
                  <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                    Don&apos;t — Break the Machine
                  </p>
                </div>
                <div className="divide-y-2 divide-[#1a1a1a]/10">
                  {[
                    "Complex gradients — ink is flat and opaque",
                    "More than 3-4 colors total in any view",
                    "Soft box-shadow with blur — kills the print illusion",
                    "Rounded corners larger than rounded-sm",
                    "ease-in-out transitions — too organic, too smooth",
                    "Single-direction shadow — Riso always has two plates",
                    "Realistic lighting or 3D shading effects",
                    "Pure white #ffffff backgrounds — always use newsprint",
                  ].map((rule) => (
                    <div
                      key={rule}
                      className="px-5 py-3 flex items-start gap-3 hover:bg-[#ff6b9d]/8 transition-colors duration-100 ease-linear"
                    >
                      <span
                        className="shrink-0 w-4 h-4 border-2 border-[#1a1a1a] rounded-sm font-mono font-black text-[9px] flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: "#ff6b9d", color: "#1a1a1a" }}
                      >
                        -
                      </span>
                      <span className="font-mono text-xs text-[#1a1a1a]/70 leading-relaxed line-through decoration-[#ff6b9d] decoration-2">
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Full rules table */}
          <RevealBlock delay={0.15}>
            <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
              <div className="grid grid-cols-12 bg-[#1a1a1a] px-6 py-3">
                <div className="col-span-1" />
                <div className="col-span-5 font-mono font-bold text-xs uppercase tracking-widest text-[#fffbf0]">
                  Rule
                </div>
                <div className="col-span-6 font-mono font-bold text-xs uppercase tracking-widest text-[#fffbf0]">
                  Rationale
                </div>
              </div>
              {DESIGN_RULES.map(({ rule, note, pass }, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 items-center px-6 py-3 border-t border-[#1a1a1a]/10 hover:bg-[#ff6b9d]/5 transition-colors duration-100 ease-linear"
                >
                  <div className="col-span-1">
                    <span
                      className="inline-flex w-5 h-5 border-2 border-[#1a1a1a] rounded-sm font-mono font-black text-[10px] items-center justify-center"
                      style={{
                        backgroundColor: pass ? "#22c55e" : "#ff6b9d",
                        color: "#1a1a1a",
                      }}
                    >
                      {pass ? "+" : "-"}
                    </span>
                  </div>
                  <div className="col-span-5 font-mono font-bold text-xs text-[#1a1a1a] tracking-wide">
                    {rule}
                  </div>
                  <div className="col-span-6 font-mono text-xs text-[#1a1a1a]/50">
                    {note}
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 08 TYPOGRAPHY SPECIMEN ── */}
      <section className="py-24 px-6 border-t-2 border-[#1a1a1a] bg-[#fffbf0]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
              07 / Typography
            </p>
            <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
              Stencil{" "}
              <span className="text-[#2563eb]" style={{ textShadow: "2px 2px 0 #ff8a00" }}>
                Type
              </span>
            </h2>
            <p className="font-mono text-xs tracking-[0.15em] text-[#1a1a1a]/40 mt-3 max-w-lg">
              Monospaced typefaces mimic the mechanical uniformity of stencil printing.
              Bold, poster-scale headings. Zero decorative fonts.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Typeface specimen */}
            <RevealBlock delay={0.05}>
              <div className="border-2 border-[#1a1a1a] rounded-sm p-8 bg-[#fffbf0] h-full">
                <p
                  className="font-mono font-black text-7xl leading-none text-[#ff6b9d] mb-6"
                  style={{ textShadow: "4px 4px 0 #2563eb" }}
                >
                  Aa
                </p>
                <p className="font-mono font-bold text-xl text-[#1a1a1a] uppercase tracking-widest mb-1">
                  Monospace
                </p>
                <p className="font-mono text-xs text-[#2563eb] uppercase tracking-widest mb-4">
                  font-mono — Bold Grotesque
                </p>
                <p className="font-mono text-sm text-[#1a1a1a]/60 leading-relaxed border-t-2 border-[#1a1a1a]/10 pt-4">
                  Every character occupies equal width — like a drum pressing ink
                  with measured mechanical precision. No variable-width humanist
                  typefaces. The typewriter is the machine; the machine is the aesthetic.
                </p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {["Black", "Bold", "Medium", "Regular"].map((weight) => (
                    <span
                      key={weight}
                      className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-[#1a1a1a]/20 rounded-sm text-[#1a1a1a]/40"
                    >
                      {weight}
                    </span>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Scale specimen */}
            <RevealBlock delay={0.1}>
              <div className="border-2 border-[#1a1a1a] rounded-sm p-8 bg-[#fffbf0] space-y-4 h-full">
                {[
                  {
                    size: "clamp(2rem,7vw,3.5rem)",
                    weight: "900",
                    color: "#ff6b9d",
                    sample: "OVERPRINT",
                    shadow: "3px 3px 0 #2563eb",
                  },
                  {
                    size: "clamp(1.5rem,4vw,2rem)",
                    weight: "800",
                    color: "#2563eb",
                    sample: "MISREGISTER",
                    shadow: "2px 2px 0 #ff8a00",
                  },
                  {
                    size: "1.25rem",
                    weight: "700",
                    color: "#ff8a00",
                    sample: "FLAT INK",
                    shadow: "2px 2px 0 #22c55e",
                  },
                  {
                    size: "1rem",
                    weight: "500",
                    color: "#22c55e",
                    sample: "Newsprint grain",
                    shadow: "none",
                  },
                  {
                    size: "0.75rem",
                    weight: "400",
                    color: "#1a1a1a",
                    sample: "Soy-based inks on warm paper stock — one pass at a time.",
                    shadow: "none",
                  },
                ].map(({ size, weight, color, sample, shadow }) => (
                  <p
                    key={sample}
                    className="font-mono uppercase tracking-wider leading-tight"
                    style={{
                      fontSize: size,
                      fontWeight: weight,
                      color,
                      textShadow: shadow !== "none" ? shadow : undefined,
                    }}
                  >
                    {sample}
                  </p>
                ))}
              </div>
            </RevealBlock>
          </div>

          {/* Poster typography demo */}
          <RevealBlock delay={0.15}>
            <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
              <div className="bg-[#2563eb] px-6 py-3 border-b-2 border-[#1a1a1a]">
                <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#fffbf0]">
                  Poster Typography — Misregistration Text Effect
                </p>
              </div>
              <div className="p-8 bg-[#fffbf0] relative overflow-hidden">
                <div
                  className="absolute inset-0 halftone-blue"
                  style={{ opacity: 0.04 }}
                />
                <div className="relative text-center py-8">
                  <p
                    className="font-mono font-black uppercase leading-none"
                    style={{
                      fontSize: "clamp(3rem,12vw,8rem)",
                      color: "#ff6b9d",
                      textShadow: "4px 4px 0 #2563eb, -2px -2px 0 #ff8a00",
                    }}
                  >
                    RISO
                  </p>
                  <p
                    className="font-mono font-black uppercase leading-none -mt-2 ml-4"
                    style={{
                      fontSize: "clamp(2rem,8vw,5.5rem)",
                      color: "#2563eb",
                      textShadow: "3px 3px 0 #ff6b9d",
                    }}
                  >
                    GRAPH
                  </p>
                  <p className="font-mono text-xs tracking-[0.4em] uppercase text-[#1a1a1a]/40 mt-4">
                    Print aesthetics for the digital age
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 09 ANIMATION RULES ── */}
      <section className="py-24 px-6 border-t-2 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
              08 / Animation
            </p>
            <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
              Mechanical{" "}
              <span className="text-[#ff6b9d]">Motion</span>
            </h2>
            <p className="font-mono text-xs tracking-[0.15em] text-[#1a1a1a]/40 mt-3 max-w-lg">
              The printing press is a machine. All motion must feel mechanical —
              instant, snapping, without organic easing.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Misregistration Offset */}
            <RevealBlock delay={0.05}>
              <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden h-full">
                <div className="bg-[#ff6b9d] border-b-2 border-[#1a1a1a] px-5 py-3">
                  <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                    Misregistration Offset
                  </p>
                </div>
                <div className="p-6 bg-[#fffbf0] flex flex-col gap-4 h-full">
                  <p className="font-mono text-xs text-[#1a1a1a]/60 leading-relaxed">
                    Hover must use dual-direction shadows — one bottom-right (blue plate),
                    one top-left (orange plate). Single shadows are forbidden.
                  </p>
                  <button
                    type="button"
                    className="riso-btn font-mono font-bold text-xs uppercase tracking-widest px-5 py-3 bg-[#ff6b9d] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a] self-start"
                  >
                    Hover Me
                  </button>
                  <code className="font-mono text-[9px] text-[#1a1a1a]/40 leading-relaxed block border-t border-[#1a1a1a]/10 pt-3 mt-auto">
                    hover:shadow-[6px_6px_0_#2563eb,<br />
                    -4px_-4px_0_#ff8a00]
                  </code>
                </div>
              </div>
            </RevealBlock>

            {/* Instant Print */}
            <RevealBlock delay={0.1}>
              <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden h-full">
                <div className="bg-[#2563eb] border-b-2 border-[#1a1a1a] px-5 py-3">
                  <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#fffbf0]">
                    Instant Print
                  </p>
                </div>
                <div className="p-6 bg-[#fffbf0] flex flex-col gap-4 h-full">
                  <p className="font-mono text-xs text-[#1a1a1a]/60 leading-relaxed">
                    All transitions use duration-100 ease-linear — mechanical press speed.
                    Never ease-in-out. Never slow organic fades.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#22c55e] border border-[#22c55e] px-2 py-1 rounded-sm">
                      100ms linear
                    </span>
                    <span className="font-mono text-[10px] text-[#ff6b9d]/60 border border-[#ff6b9d]/30 px-2 py-1 rounded-sm line-through">
                      300ms ease-out
                    </span>
                  </div>
                  <code className="font-mono text-[9px] text-[#1a1a1a]/40 leading-relaxed block border-t border-[#1a1a1a]/10 pt-3 mt-auto">
                    transition-all<br />
                    duration-100<br />
                    ease-linear
                  </code>
                </div>
              </div>
            </RevealBlock>

            {/* Overprint Illusion + Registration Shift */}
            <RevealBlock delay={0.15}>
              <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden h-full">
                <div className="bg-[#ff8a00] border-b-2 border-[#1a1a1a] px-5 py-3">
                  <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                    Registration Shift
                  </p>
                </div>
                <div className="p-6 bg-[#fffbf0] flex flex-col gap-4 h-full">
                  <p className="font-mono text-xs text-[#1a1a1a]/60 leading-relaxed">
                    Green corner element is offset at rest. On hover it translates to
                    (0, 0) — the registration mark locks into place as press completes.
                  </p>
                  <div
                    className="group relative border-2 border-[#1a1a1a] rounded-sm p-4 bg-[#fffbf0] hover:shadow-[4px_4px_0_#2563eb,-3px_-3px_0_#ff8a00] transition-shadow duration-100 ease-linear cursor-pointer self-start overflow-hidden"
                  >
                    <div
                      className="absolute top-0 right-0 w-6 h-6 border-b-2 border-l-2 border-[#1a1a1a] riso-reg-mark"
                      style={{ backgroundColor: "#22c55e" }}
                    />
                    <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                      Hover Card
                    </p>
                  </div>
                  <code className="font-mono text-[9px] text-[#1a1a1a]/40 leading-relaxed block border-t border-[#1a1a1a]/10 pt-3 mt-auto">
                    translate-x-2 -translate-y-2<br />
                    group-hover:translate-x-0<br />
                    group-hover:translate-y-0
                  </code>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── 10 FOOTER ── */}
      <footer className="border-t-2 border-[#1a1a1a] bg-[#fffbf0]">
        {/* Pre-footer band */}
        <div className="border-b-2 border-[#1a1a1a] bg-[#2563eb]">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p
                className="font-mono font-black text-3xl md:text-4xl uppercase text-[#fffbf0] leading-none"
                style={{ textShadow: "3px 3px 0 #ff6b9d" }}
              >
                Start Printing
              </p>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#fffbf0]/60 mt-2">
                Apply the Risograph style to your next project
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/styles/risograph"
                className="riso-btn font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 bg-[#ff6b9d] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a]"
              >
                View Docs
              </Link>
              <Link
                href="/styles"
                className="riso-btn font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 bg-[#fffbf0] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a]"
              >
                All Styles
              </Link>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p
              className="font-mono font-black text-xl tracking-[0.2em] text-[#ff6b9d] uppercase mb-1"
              style={{ textShadow: "2px 2px 0 #2563eb" }}
            >
              Risograph
            </p>
            <p className="font-mono text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/40">
              Printed in 4 colors &mdash; one pass at a time
            </p>
          </div>

          {/* Ink dots */}
          <div className="flex items-center gap-2">
            {INK_COLORS.map((ink, i) => (
              <div key={ink.hex} className="relative" style={{ marginLeft: i > 0 ? -4 : 0 }}>
                <span
                  className="block w-4 h-4 rounded-full border-2 border-[#1a1a1a]"
                  style={{ backgroundColor: ink.hex }}
                  title={ink.name}
                />
              </div>
            ))}
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/30 ml-3">
              4 ink drums
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/styles/risograph"
              className="font-mono text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50 hover:text-[#ff6b9d] transition-colors duration-100 ease-linear"
            >
              Documentation &rarr;
            </Link>
            <Link
              href="/styles"
              className="font-mono text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50 hover:text-[#2563eb] transition-colors duration-100 ease-linear"
            >
              All Styles &rarr;
            </Link>
          </div>
        </div>

        {/* Registration line */}
        <div className="border-t-2 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-2">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#fffbf0]/30">
              StyleKit / Risograph Design System
            </span>
            <div className="flex items-center gap-3">
              {["FL. PINK", "RISO BLUE", "ORANGE", "GREEN"].map((label, i) => (
                <span
                  key={label}
                  className="font-mono text-[8px] tracking-widest uppercase"
                  style={{
                    color: ["#ff6b9d", "#2563eb", "#ff8a00", "#22c55e"][i],
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
