"use client";

import { useRef, useState, useEffect } from "react";
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
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const INK_COLORS = [
  { name: "Fluorescent Pink", hex: "#ff6b9d", label: "FL. PINK" },
  { name: "Risograph Blue", hex: "#2563eb", label: "RISO BLUE" },
  { name: "Burn Orange", hex: "#ff8a00", label: "ORANGE" },
  { name: "Sap Green", hex: "#22c55e", label: "GREEN" },
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
  { rule: "Hard shadows only", note: "offset X/Y colored — no soft blur", pass: true },
  { rule: "ease-linear everywhere", note: "snap like ink hitting paper", pass: true },
  { rule: "border-2 border-[#1a1a1a]", note: "all containers get a press border", pass: true },
  { rule: "font-mono for body", note: "typewriter fidelity", pass: true },
  { rule: "rounded-sm maximum", note: "no rounded-lg or larger", pass: true },
  { rule: "bg-[#fffbf0] paper tone", note: "never clean white", pass: true },
  { rule: "soft box-shadow", note: "forbidden — only hard offsets", pass: false },
  { rule: "ease-in-out transitions", note: "forbidden — kills the snap", pass: false },
  { rule: "rounded-lg or larger", note: "forbidden — too digital, too smooth", pass: false },
];

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`;

export default function ShowcaseContent() {
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
          transition: box-shadow 100ms ease-linear, background-color 100ms ease-linear, color 100ms ease-linear;
        }
        .riso-btn:hover {
          box-shadow: 6px 6px 0 #2563eb, -4px -4px 0 #ff8a00;
        }
        .riso-btn:active {
          background-color: #2563eb !important;
          color: #ff6b9d !important;
        }
      `}</style>

      {/* ── NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fffbf0]/95 border-b-2 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-mono font-bold text-lg tracking-[0.2em] text-[#ff6b9d] uppercase">
            Risograph
          </span>
          <nav className="flex items-center gap-6">
            <Link
              href="/styles/risograph"
              className="font-mono text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/60 hover:text-[#2563eb] transition-colors duration-100 ease-linear"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="font-mono text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/60 hover:text-[#ff6b9d] transition-colors duration-100 ease-linear"
            >
              Styles
            </Link>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        {/* misregistration color block stack */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute top-10 left-[-30px] w-64 h-64 bg-[#ff6b9d] opacity-15"
            style={{ mixBlendMode: "multiply" }}
          />
          <div
            className="absolute top-14 left-[-22px] w-64 h-64 bg-[#2563eb] opacity-10"
            style={{ mixBlendMode: "multiply" }}
          />
          <div
            className="absolute top-16 right-10 w-48 h-48 bg-[#ff8a00] opacity-10 rounded-full"
            style={{ mixBlendMode: "multiply" }}
          />
          <div
            className="absolute top-20 right-6 w-48 h-48 bg-[#22c55e] opacity-10 rounded-full"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* giant title — each letter in an ink color */}
          <h1
            className="font-mono font-black leading-none tracking-tight mb-6 select-none"
            style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
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
                    : "translateY(50px) rotate(-4deg)",
                  transition: `opacity 0.4s ease-linear ${i * 0.04}s, transform 0.4s ease-linear ${i * 0.04}s`,
                }}
              >
                {l.char}
              </span>
            ))}
          </h1>

          {/* subtitle */}
          <p
            className="font-mono text-sm md:text-base tracking-[0.2em] uppercase text-[#1a1a1a]/70 max-w-xl mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.4s ease-linear 0.4s, transform 0.4s ease-linear 0.4s",
            }}
          >
            Screen-printed aesthetics. Intentional misregistration. Flat ink on
            warm newsprint — four colors, one pass at a time.
          </p>

          {/* hero CTA row */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.4s ease-linear 0.55s",
            }}
          >
            <button
              type="button"
              className="riso-btn font-mono font-bold text-sm uppercase tracking-widest px-7 py-3 bg-[#ff6b9d] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a]"
            >
              Print Run
            </button>
            <button
              type="button"
              className="riso-btn font-mono font-bold text-sm uppercase tracking-widest px-7 py-3 bg-[#fffbf0] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a]"
            >
              View Layers
            </button>
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
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
              <span>Screen Print</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
              <span>Overprint</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
              <span>Misregistration</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
              <span>Four Colors</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
              <span>Flat Ink</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
              <span>Newsprint</span>
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* ── COMPONENTS DEMO ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <RevealBlock className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
            02 / Components
          </p>
          <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
            Print{" "}
            <span className="text-[#2563eb]">Components</span>
          </h2>
        </RevealBlock>

        {/* Button variants grid */}
        <RevealBlock className="mb-16" delay={0.05}>
          <div className="border-2 border-[#1a1a1a] rounded-sm p-8 bg-[#fffbf0]">
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#1a1a1a]/40 mb-6">
              Ink Buttons — Misregistration Offset on Hover
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { bg: "#ff6b9d", label: "Fluorescent Pink" },
                { bg: "#2563eb", label: "Riso Blue" },
                { bg: "#ff8a00", label: "Burn Orange" },
                { bg: "#22c55e", label: "Sap Green" },
              ].map(({ bg, label }) => (
                <button
                  key={bg}
                  type="button"
                  className="riso-btn font-mono font-bold text-xs uppercase tracking-widest px-6 py-3 text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-sm shadow-[4px_4px_0_#1a1a1a]"
                  style={{ backgroundColor: bg }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* Cards with registration mark dots */}
        <RevealBlock delay={0.1}>
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
                className="group relative border-2 border-[#1a1a1a] rounded-sm p-6 bg-[#fffbf0] transition-shadow duration-100 ease-linear hover:shadow-[6px_6px_0_#2563eb,-4px_-4px_0_#ff8a00]"
              >
                {/* registration mark dot */}
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#22c55e] translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-150 ease-linear" />

                <p
                  className="font-mono font-black text-4xl mb-4 leading-none"
                  style={{ color: accent }}
                >
                  {num}
                </p>
                <h3 className="font-mono font-bold text-base uppercase tracking-widest mb-2 text-[#1a1a1a]">
                  {title}
                </h3>
                <p className="font-mono text-xs text-[#1a1a1a]/60 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ── INK LAYERS VISUALIZATION ── */}
      <section className="py-24 px-6 border-y-2 border-[#1a1a1a] bg-[#fffbf0]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
              03 / Ink Layers
            </p>
            <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a] mb-6">
              Four <span className="text-[#ff6b9d]">Print Runs</span>
            </h2>
            <p className="font-mono text-xs tracking-[0.15em] text-[#1a1a1a]/50 max-w-lg">
              Each color requires a separate drum pass. Select a layer to inspect
              the print run. Real Risograph printers handle one ink at a time.
            </p>
          </RevealBlock>

          {/* Tab row */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {INK_COLORS.map((ink, i) => (
              <button
                key={ink.hex}
                type="button"
                onClick={() => setActiveInkLayer(i)}
                className="font-mono font-bold text-xs uppercase tracking-widest px-5 py-2 border-2 border-[#1a1a1a] rounded-sm transition-all duration-100 ease-linear"
                style={{
                  backgroundColor: activeInkLayer === i ? ink.hex : "#fffbf0",
                  color: "#1a1a1a",
                  boxShadow:
                    activeInkLayer === i
                      ? "4px 4px 0 #1a1a1a"
                      : "2px 2px 0 #1a1a1a",
                }}
              >
                {ink.label}
              </button>
            ))}
          </div>

          {/* Layer display */}
          <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
            {INK_COLORS.map((ink, i) => (
              <div
                key={ink.hex}
                style={{
                  display: activeInkLayer === i ? "block" : "none",
                }}
              >
                <div
                  className="p-10 flex flex-col md:flex-row items-start md:items-center gap-10"
                  style={{ backgroundColor: "#fffbf0" }}
                >
                  {/* ink blob */}
                  <div
                    className="shrink-0 relative"
                    style={{ width: 120, height: 120 }}
                  >
                    {/* offset ghost layer — misregistration effect */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 100,
                        height: 100,
                        top: 8,
                        left: 8,
                        backgroundColor: ink.hex,
                        opacity: 0.25,
                        mixBlendMode: "multiply",
                      }}
                    />
                    <div
                      className="absolute rounded-full border-2 border-[#1a1a1a]"
                      style={{
                        width: 100,
                        height: 100,
                        top: 0,
                        left: 0,
                        backgroundColor: ink.hex,
                        mixBlendMode: "multiply",
                      }}
                    />
                  </div>

                  <div>
                    <p
                      className="font-mono font-black text-5xl mb-2 leading-none"
                      style={{ color: ink.hex }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-mono font-bold text-xl uppercase tracking-widest text-[#1a1a1a] mb-3">
                      {ink.name}
                    </h3>
                    <p className="font-mono text-xs text-[#1a1a1a]/50 leading-relaxed max-w-sm">
                      Ink hex:{" "}
                      <span
                        className="font-bold"
                        style={{ color: ink.hex }}
                      >
                        {ink.hex}
                      </span>
                      . Each pass through the drum deposits a flat layer of soy
                      ink on warm newsprint. Slight mechanical offset between
                      passes creates the hallmark misregistration effect.
                    </p>
                  </div>

                  {/* stacked multiply demo */}
                  <div className="ml-auto hidden md:flex items-center gap-0 shrink-0">
                    {INK_COLORS.map((c, j) => (
                      <div
                        key={c.hex}
                        className="w-16 h-24 border-2 border-[#1a1a1a]"
                        style={{
                          backgroundColor: c.hex,
                          opacity: j <= i ? 0.85 : 0.12,
                          mixBlendMode: "multiply",
                          marginLeft: j === 0 ? 0 : -8,
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

      {/* ── COLOR PALETTE ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <RevealBlock className="mb-12">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
            04 / Ink Palette
          </p>
          <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
            The <span className="text-[#22c55e]">Drum Colors</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: "FL. Pink", hex: "#ff6b9d", label: "Primary" },
            { name: "Riso Blue", hex: "#2563eb", label: "Secondary" },
            { name: "Orange", hex: "#ff8a00", label: "Accent A" },
            { name: "Green", hex: "#22c55e", label: "Accent B" },
            { name: "Newsprint", hex: "#fffbf0", label: "Paper", dark: true },
          ].map(({ name, hex, label, dark }) => (
            <RevealBlock key={hex} delay={0.05}>
              <div className="group border-2 border-[#1a1a1a] rounded-sm overflow-hidden transition-shadow duration-100 ease-linear hover:shadow-[4px_4px_0_#1a1a1a]">
                {/* swatch */}
                <div
                  className="w-full h-24 relative"
                  style={{ backgroundColor: hex }}
                >
                  {/* misregistration ghost */}
                  <div
                    className="absolute inset-0 translate-x-1 translate-y-1"
                    style={{ backgroundColor: hex, opacity: 0.3 }}
                  />
                  {dark && (
                    <div className="absolute inset-0 border border-[#1a1a1a]/20" />
                  )}
                </div>
                {/* label */}
                <div className="p-3 bg-[#fffbf0]">
                  <p className="font-mono font-bold text-xs uppercase tracking-widest text-[#1a1a1a]">
                    {name}
                  </p>
                  <p className="font-mono text-[10px] text-[#1a1a1a]/40 mt-0.5">
                    {hex}
                  </p>
                  <p className="font-mono text-[10px] text-[#1a1a1a]/30">
                    {label}
                  </p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── DESIGN RULES ── */}
      <section className="py-24 px-6 border-t-2 border-[#1a1a1a] bg-[#fffbf0]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
              05 / Design Rules
            </p>
            <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
              Print <span className="text-[#ff8a00]">Constraints</span>
            </h2>
          </RevealBlock>

          <div className="border-2 border-[#1a1a1a] rounded-sm overflow-hidden">
            {/* table header */}
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
                className="grid grid-cols-12 items-center px-6 py-4 border-t-2 border-[#1a1a1a]/10 transition-colors duration-100 ease-linear hover:bg-[#ff6b9d]/5"
              >
                {/* pass/fail badge */}
                <div className="col-span-1">
                  <span
                    className="inline-block w-5 h-5 border-2 border-[#1a1a1a] rounded-sm font-mono font-black text-[10px] text-center leading-4"
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
        </div>
      </section>

      {/* ── TYPOGRAPHY SPECIMEN ── */}
      <section className="py-24 px-6 border-t-2 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-2">
              06 / Typography
            </p>
            <h2 className="font-mono font-black text-4xl md:text-5xl text-[#1a1a1a]">
              Stencil <span className="text-[#2563eb]">Type</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* specimen block */}
            <RevealBlock delay={0.05}>
              <div className="border-2 border-[#1a1a1a] rounded-sm p-8 bg-[#fffbf0]">
                <p className="font-mono font-black text-6xl leading-none text-[#ff6b9d] mb-4">
                  Aa
                </p>
                <p className="font-mono font-bold text-2xl text-[#2563eb] mb-2 uppercase tracking-widest">
                  Bold Grotesque
                </p>
                <p className="font-mono text-sm text-[#1a1a1a]/60 leading-relaxed">
                  Monospaced typefaces mimic the mechanical uniformity of stencil
                  printing. Every character occupies equal width — like a drum
                  pressing ink with measured precision.
                </p>
              </div>
            </RevealBlock>

            {/* scale specimen */}
            <RevealBlock delay={0.1}>
              <div className="border-2 border-[#1a1a1a] rounded-sm p-8 bg-[#fffbf0] space-y-3">
                {[
                  { size: "text-4xl", weight: "font-black", color: "#ff6b9d", sample: "OVERPRINT" },
                  { size: "text-2xl", weight: "font-bold", color: "#2563eb", sample: "MISREGISTER" },
                  { size: "text-xl", weight: "font-bold", color: "#ff8a00", sample: "FLAT INK" },
                  { size: "text-base", weight: "font-medium", color: "#22c55e", sample: "Newsprint grain" },
                  { size: "text-xs", weight: "font-normal", color: "#1a1a1a", sample: "Soy-based inks on warm paper stock." },
                ].map(({ size, weight, color, sample }) => (
                  <p
                    key={sample}
                    className={`font-mono ${size} ${weight} uppercase tracking-wider leading-tight`}
                    style={{ color }}
                  >
                    {sample}
                  </p>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-[#1a1a1a] bg-[#fffbf0]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono font-black text-lg tracking-[0.2em] text-[#ff6b9d] uppercase mb-1">
              Risograph
            </p>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/40">
              Printed in 4 colors &mdash; one pass at a time
            </p>
          </div>

          <div className="flex items-center gap-3">
            {INK_COLORS.map((ink) => (
              <span
                key={ink.hex}
                className="w-3 h-3 rounded-full border border-[#1a1a1a]"
                style={{ backgroundColor: ink.hex }}
                title={ink.name}
              />
            ))}
          </div>

          <Link
            href="/styles/risograph"
            className="font-mono text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/60 hover:text-[#ff6b9d] transition-colors duration-100 ease-linear"
          >
            View Documentation &rarr;
          </Link>
        </div>
      </footer>
    </div>
  );
}
