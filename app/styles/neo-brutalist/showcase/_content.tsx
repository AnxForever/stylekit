"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hook: useInView                                              */
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
      { threshold: 0.15, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  Inline component: RevealBlock                                       */
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
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

type AccentKey = "pink" | "lime" | "cyan" | "orange";

const ACCENTS: Record<AccentKey, { hex: string; bg: string; label: string; shadow: string }> = {
  pink:   { hex: "#ff006e", bg: "bg-[#ff006e]", label: "Pink",   shadow: "shadow-[6px_6px_0px_0px_#ff006e]" },
  lime:   { hex: "#ccff00", bg: "bg-[#ccff00]", label: "Lime",   shadow: "shadow-[6px_6px_0px_0px_#ccff00]" },
  cyan:   { hex: "#00d9ff", bg: "bg-[#00d9ff]", label: "Cyan",   shadow: "shadow-[6px_6px_0px_0px_#00d9ff]" },
  orange: { hex: "#ff9500", bg: "bg-[#ff9500]", label: "Orange", shadow: "shadow-[6px_6px_0px_0px_#ff9500]" },
};

const ACCENT_KEYS: AccentKey[] = ["pink", "lime", "cyan", "orange"];

const PALETTE = [
  { name: "BLACK",  hex: "#000000", bg: "bg-black",       text: "text-white", border: "border-white" },
  { name: "WHITE",  hex: "#ffffff", bg: "bg-white",       text: "text-black", border: "border-black" },
  { name: "PINK",   hex: "#ff006e", bg: "bg-[#ff006e]",   text: "text-white", border: "border-black" },
  { name: "LIME",   hex: "#ccff00", bg: "bg-[#ccff00]",   text: "text-black", border: "border-black" },
  { name: "CYAN",   hex: "#00d9ff", bg: "bg-[#00d9ff]",   text: "text-black", border: "border-black" },
  { name: "ORANGE", hex: "#ff9500", bg: "bg-[#ff9500]",   text: "text-white", border: "border-black" },
];

const DO_RULES = [
  { code: "border-black border-2 md:border-4", desc: "Pure black borders — define every edge explicitly." },
  { code: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]", desc: "Hard-edge offset shadow — zero blur, zero softness." },
  { code: "rounded-none", desc: "No border radius anywhere — sharp corners only." },
  { code: "font-black uppercase tracking-tight", desc: "Heavy weight titles that read as graphic elements." },
  { code: "font-mono", desc: "Monospace body — honest, technical, raw." },
  { code: "hover:bg-[#ccff00] duration-150 ease-out", desc: "Brutal Snap — instant hard color cut, not a fade." },
  { code: "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none", desc: "Physical Crushing — active = shadow offset as displacement." },
];

const DONT_RULES = [
  { code: "rounded-lg / rounded-md", desc: "Rounded corners make elements feel soft. Forbidden." },
  { code: "shadow-lg / drop-shadow(blur)", desc: "Blurry shadows imply material, not architecture. Forbidden." },
  { code: "bg-gradient-to-r", desc: "Gradients are decorative. Brutalism is flat. Forbidden." },
  { code: "border-gray-300", desc: "Gray borders are timid. Black borders or nothing. Forbidden." },
  { code: "opacity-50 / transition-opacity", desc: "Fade effects are dishonest. Hard cuts only. Forbidden." },
  { code: "active:translate-x-[2px] (shadow 6px)", desc: "Displacement must equal shadow pixels. Never less." },
  { code: "hover:bg transition-all duration-500", desc: "Gradual hover bg transition. Must be hard cut (duration-150 max)." },
];

const FONT_ROWS = [
  { role: "Display",   class: "font-black text-[clamp(52px,10vw,120px)] leading-none tracking-tighter uppercase", sample: "NEO-BRUTAL" },
  { role: "H1",        class: "font-black text-5xl md:text-7xl leading-none tracking-tight uppercase",            sample: "BOLD FUNCTION" },
  { role: "H2",        class: "font-black text-4xl md:text-5xl leading-tight uppercase",                          sample: "RAW STRUCTURE" },
  { role: "H3",        class: "font-black text-2xl md:text-3xl uppercase",                                        sample: "HARD EDGE" },
  { role: "Body",      class: "font-mono text-base leading-relaxed",                                              sample: "Everything has a reason. Nothing is decoration." },
  { role: "Caption",   class: "font-mono text-sm text-black/50 uppercase tracking-widest",                        sample: "METADATA / LABEL / TIMESTAMP" },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function NeoBrutalistShowcase() {
  /* Global accent switcher */
  const [accent, setAccent] = useState<AccentKey>("lime");

  /* Variant selector: Classic vs Playful */
  type Variant = "classic" | "playful";
  const [variant, setVariant] = useState<Variant>("classic");

  /* Component demo tab */
  type DemoTab = "buttons" | "cards" | "inputs";
  const [demoTab, setDemoTab] = useState<DemoTab>("buttons");

  /* Input values for form demo */
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  /* Dropdown open state */
  const [dropOpen, setDropOpen] = useState(false);
  const [dropValue, setDropValue] = useState("Choose a style");

  /* InView references */
  const { ref: heroRef,    inView: heroInView    } = useInView();
  const { ref: demoRef,    inView: demoInView    } = useInView();
  const { ref: variantRef, inView: variantInView } = useInView();
  const { ref: colorRef,   inView: colorInView   } = useInView();
  const { ref: typeRef,    inView: typeInView    } = useInView();
  const { ref: rulesRef,   inView: rulesInView   } = useInView();
  const { ref: footerRef,  inView: footerInView  } = useInView();

  const currentAccent = ACCENTS[accent];

  /* Form submit */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-black">

      {/* ============================================================== */}
      {/* SECTION 1 — FIXED NAV                                          */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo */}
            <div className="flex items-center gap-3 md:gap-5">
              <span
                className="font-black text-white text-base md:text-lg uppercase tracking-tighter px-3 py-1 border-2 md:border-4 border-white"
                style={{ boxShadow: `4px 4px 0px 0px ${currentAccent.hex}` }}
              >
                NEO-BRUTALIST
              </span>
              <span className="hidden md:block font-mono text-xs text-white/40 uppercase tracking-widest">
                新野兽派
              </span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: "Components", href: "#components" },
                { label: "Variants",   href: "#variants"   },
                { label: "Colors",     href: "#colors"     },
                { label: "Typography", href: "#typography" },
                { label: "Rules",      href: "#rules"      },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-mono text-xs text-white uppercase tracking-widest px-3 py-2 hover:bg-white hover:text-black transition-colors duration-150 ease-out"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Back link */}
            <Link
              href="/styles"
              className="font-black text-xs md:text-sm px-3 md:px-5 py-2 md:py-2.5 border-2 md:border-4 border-white text-white uppercase tracking-wide hover:bg-white hover:text-black active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150 ease-out"
            >
              ← StyleKit
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* SECTION 2 — HERO                                               */}
      {/* ============================================================== */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center pt-14 md:pt-16 bg-[#ccff00] border-b-4 border-black relative overflow-hidden"
      >
        {/* Decorative shapes */}
        <div className="absolute top-20 right-8 md:right-20 w-16 md:w-32 h-16 md:h-32 bg-black border-4 border-black" />
        <div className="absolute bottom-16 right-24 md:right-60 w-10 md:w-20 h-10 md:h-20 bg-black rounded-full" />
        <div
          className="absolute top-1/3 right-8 md:right-24 w-12 md:w-24 h-40 md:h-80 border-4 border-black"
          style={{ backgroundColor: currentAccent.hex }}
        />
        <div className="absolute bottom-8 left-8 w-8 md:w-16 h-8 md:h-16 bg-black border-4 border-black" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full py-16 md:py-24 relative z-10">

          {/* Tag */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s",
            }}
          >
            <span className="inline-block font-mono text-xs uppercase tracking-[0.25em] px-4 py-2 border-2 border-black bg-black text-[#ccff00]">
              Raw / Honest / Direct
            </span>
          </div>

          {/* Massive headline */}
          <h1
            className="mt-4 md:mt-6 font-black text-[clamp(60px,14vw,180px)] leading-none tracking-tighter uppercase text-black"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(48px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            NEO-
            <br />
            BRUTAL
            <br />
            <span
              style={{
                WebkitTextStroke: "4px #000",
                color: "transparent",
              }}
            >
              IST
            </span>
          </h1>

          {/* Subtitle + CTA */}
          <div
            className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s",
            }}
          >
            <p className="font-mono text-base md:text-lg leading-relaxed text-black max-w-md">
              From brutalist architecture. Raw, unadorned functional aesthetics.
              Bold black borders, hard-edge shadows, no rounded corners, high contrast.
              Honest expression — bold and direct.
            </p>

            {/* Accent switcher + CTA */}
            <div className="flex flex-col gap-4">
              {/* Accent color switcher */}
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-2 text-black/60">
                  Accent color
                </p>
                <div className="flex gap-2">
                  {ACCENT_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setAccent(key)}
                      aria-label={`Switch to ${ACCENTS[key].label} accent`}
                      className={`w-10 h-10 md:w-12 md:h-12 border-2 md:border-4 border-black transition-all duration-150 ease-out ${ACCENTS[key].bg} ${
                        accent === key
                          ? "shadow-none translate-x-[2px] translate-y-[2px]"
                          : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-mono text-xs text-black/60 mt-1">
                  Current: {currentAccent.label} {currentAccent.hex}
                </p>
              </div>

              {/* CTA button */}
              <button
                type="button"
                className="font-black text-sm md:text-base uppercase tracking-wide px-6 md:px-8 py-3 md:py-4 bg-black text-white border-2 md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out"
                style={{ boxShadow: `6px 6px 0px 0px ${currentAccent.hex}` }}
              >
                Explore the System
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "0px",    label: "Border Radius" },
              { value: "4px",    label: "Border Width" },
              { value: "6px",    label: "Shadow Offset" },
              { value: "0ms",    label: "Blur Amount" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-black text-white border-2 md:border-4 border-black p-4 md:p-6 text-center"
                style={{ boxShadow: `4px 4px 0px 0px ${currentAccent.hex}` }}
              >
                <p className="font-black text-3xl md:text-5xl leading-none">{stat.value}</p>
                <p className="font-mono text-xs mt-1 uppercase tracking-wider text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3 — COMPONENT DEMOS                                    */}
      {/* ============================================================== */}
      <section
        id="components"
        ref={demoRef}
        className="py-20 md:py-28 border-b-4 border-black"
        style={{
          opacity: demoInView ? 1 : 0,
          transform: demoInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section header */}
          <div className="mb-10 md:mb-14">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.25em] px-3 py-1.5 border-2 border-black bg-white">
              Interactive demos
            </span>
            <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight">
              Components
            </h2>
            <p className="mt-2 font-mono text-sm text-black/50 max-w-md">
              All components follow Physical Crushing (active) and Brutal Snap (hover). Click to feel the press.
            </p>
          </div>

          {/* Tab strip */}
          <div className="flex flex-wrap gap-2 mb-10 border-b-4 border-black pb-4">
            {(["buttons", "cards", "inputs"] as DemoTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setDemoTab(tab)}
                className={`px-5 md:px-7 py-2.5 md:py-3 border-2 md:border-4 border-black font-black text-xs md:text-sm uppercase tracking-wide transition-all duration-150 ease-out ${
                  demoTab === tab
                    ? "bg-black text-white shadow-none translate-x-[3px] translate-y-[3px]"
                    : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab: Buttons */}
          {demoTab === "buttons" && (
            <div className="space-y-12">
              {/* Primary — Physical Crushing */}
              <RevealBlock>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-5">
                    Primary — Physical Crushing (active translate = shadow offset)
                  </p>
                  <div className="flex flex-wrap gap-4 md:gap-6 items-end">
                    <div className="flex flex-col items-start gap-2">
                      <button
                        type="button"
                        className="font-black text-base uppercase tracking-wide px-6 py-3 bg-black text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out"
                        style={{ boxShadow: `6px 6px 0px 0px ${currentAccent.hex}` }}
                      >
                        Primary
                      </button>
                      <span className="font-mono text-xs text-black/40">hover:lift active:crush</span>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <button
                        type="button"
                        className="font-black text-base uppercase tracking-wide px-6 py-3 bg-white text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out"
                      >
                        Outlined
                      </button>
                      <span className="font-mono text-xs text-black/40">Brutal Snap on hover</span>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <button
                        type="button"
                        className={`font-black text-base uppercase tracking-wide px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out text-black ${currentAccent.bg}`}
                      >
                        Accent
                      </button>
                      <span className="font-mono text-xs text-black/40">{currentAccent.hex}</span>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <button
                        type="button"
                        disabled
                        className="font-black text-base uppercase tracking-wide px-6 py-3 bg-white text-black/30 border-4 border-black/30 cursor-not-allowed"
                      >
                        Disabled
                      </button>
                      <span className="font-mono text-xs text-black/40">no hover / no crush</span>
                    </div>
                  </div>
                </div>
              </RevealBlock>

              {/* Accent-filled variants */}
              <RevealBlock delay={0.06}>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-5">
                    Accent-filled — Brutal Snap hover
                  </p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {ACCENT_KEYS.map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setAccent(key)}
                        className={`font-black text-sm uppercase tracking-wide px-5 py-2.5 border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 ease-out ${ACCENTS[key].bg} ${key === "pink" || key === "orange" ? "text-white" : "text-black"}`}
                      >
                        {ACCENTS[key].label}
                      </button>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              {/* Circle button + sizes */}
              <RevealBlock delay={0.12}>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-5">
                    Circle decorative + size scale
                  </p>
                  <div className="flex flex-wrap gap-5 items-end">
                    <button
                      type="button"
                      className="w-16 h-16 border-4 border-black bg-black text-white rounded-full font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 ease-out"
                      style={{ boxShadow: `4px 4px 0px 0px ${currentAccent.hex}` }}
                    >
                      Go
                    </button>
                    {[
                      { label: "SM",  px: "px-4",   py: "py-2",   text: "text-xs" },
                      { label: "MD",  px: "px-6",   py: "py-3",   text: "text-sm" },
                      { label: "LG",  px: "px-8",   py: "py-4",   text: "text-base" },
                      { label: "XL",  px: "px-10",  py: "py-5",   text: "text-lg" },
                    ].map((sz) => (
                      <button
                        key={sz.label}
                        type="button"
                        className={`font-black uppercase tracking-wide ${sz.px} ${sz.py} ${sz.text} bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 ease-out`}
                      >
                        {sz.label}
                      </button>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              {/* Interaction spec */}
              <RevealBlock delay={0.18}>
                <div className="bg-black text-white border-4 border-black p-5 md:p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  style={{ boxShadow: `8px 8px 0px 0px ${currentAccent.hex}` }}
                >
                  <p className="font-black text-sm uppercase tracking-widest mb-4" style={{ color: currentAccent.hex }}>
                    Animation spec — Physical Crushing + Brutal Snap
                  </p>
                  <div className="font-mono text-sm space-y-2">
                    <p><span style={{ color: currentAccent.hex }}>hover:</span>  -translate-x-[3px] -translate-y-[3px]  shadow-[9px_9px_0px_0px_rgba(0,0,0,1)]</p>
                    <p><span className="text-white/60">active:</span> translate-x-[6px]  translate-y-[6px]   shadow-none</p>
                    <p><span className="text-white/60">timing:</span> duration-150 ease-out  (brutal collision feel)</p>
                    <p className="text-white/40 text-xs pt-2">
                      NOTE: active displacement = shadow pixel count (6px). Never less.
                    </p>
                  </div>
                </div>
              </RevealBlock>
            </div>
          )}

          {/* Tab: Cards */}
          {demoTab === "cards" && (
            <div className="space-y-12">
              {/* Brutal Snap on hover */}
              <RevealBlock>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-5">
                    Cards — Brutal Snap yellow bg on hover, colored shadow on hover
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {[
                      { title: "STRUCTURE",   body: "Raw exposed form. No ornamentation. Every element declared its purpose plainly.", tag: "Form" },
                      { title: "FUNCTION",    body: "Nothing exists as decoration. Black borders mark territory. Hard shadows declare weight.", tag: "Logic" },
                      { title: "HONESTY",     body: "No rounded corners, no blur. Brutalism refuses to flatter. It insists on the truth.", tag: "Intent" },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="group bg-white border-2 md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ccff00] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-150 ease-out cursor-pointer p-5 md:p-7"
                      >
                        <span className="inline-block font-mono text-xs uppercase tracking-widest px-2 py-1 border-2 border-black bg-black text-white mb-4 group-hover:bg-white group-hover:text-black transition-colors duration-150">
                          {card.tag}
                        </span>
                        <h3 className="font-black text-2xl md:text-3xl uppercase leading-tight mb-3">
                          {card.title}
                        </h3>
                        <p className="font-mono text-sm text-black/60 group-hover:text-black/80 leading-relaxed">
                          {card.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              {/* Colored shadow cards */}
              <RevealBlock delay={0.08}>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-5">
                    Heavy Focus — hover increases shadow + switches to accent color shadow
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ACCENT_KEYS.map((key) => (
                      <div
                        key={key}
                        className={`group ${ACCENTS[key].bg} border-2 md:border-4 border-black p-4 md:p-6 cursor-pointer transition-all duration-150 ease-out hover:-translate-x-[3px] hover:-translate-y-[3px]`}
                        style={{
                          boxShadow: `4px 4px 0px 0px rgba(0,0,0,1)`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = `8px 8px 0px 0px ${ACCENTS[key].hex}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.boxShadow = `4px 4px 0px 0px rgba(0,0,0,1)`;
                        }}
                      >
                        <p className="font-black text-lg md:text-xl uppercase leading-tight">{ACCENTS[key].label}</p>
                        <p className="font-mono text-xs mt-1 text-black/60">{ACCENTS[key].hex}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              {/* Card with internal structure */}
              <RevealBlock delay={0.14}>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-5">
                    Data card — internal ruled sections
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      {
                        title: "Design Token",
                        items: [
                          { key: "border-width", val: "4px" },
                          { key: "shadow-offset", val: "6px" },
                          { key: "border-radius", val: "0px" },
                          { key: "transition", val: "150ms ease-out" },
                        ],
                        accent: "#ccff00",
                      },
                      {
                        title: "Typography Token",
                        items: [
                          { key: "heading", val: "font-black" },
                          { key: "body", val: "font-mono" },
                          { key: "transform", val: "uppercase" },
                          { key: "tracking", val: "tracking-tight" },
                        ],
                        accent: "#ff006e",
                      },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="border-4 border-black overflow-hidden group hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-150 ease-out"
                        style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                      >
                        <div
                          className="px-5 py-3 border-b-4 border-black"
                          style={{ backgroundColor: card.accent }}
                        >
                          <p className="font-black text-sm uppercase tracking-widest">{card.title}</p>
                        </div>
                        {card.items.map((item, i) => (
                          <div
                            key={item.key}
                            className={`flex items-center justify-between px-5 py-3 ${i < card.items.length - 1 ? "border-b-2 border-black" : ""} group-hover:bg-white`}
                          >
                            <span className="font-mono text-xs text-black/50">{item.key}</span>
                            <span className="font-black text-sm">{item.val}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>
            </div>
          )}

          {/* Tab: Inputs */}
          {demoTab === "inputs" && (
            <div className="space-y-10 max-w-xl">
              <RevealBlock>
                {formSubmitted ? (
                  <div
                    className="border-4 border-black p-6 bg-[#ccff00]"
                    style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
                  >
                    <p className="font-black text-xl uppercase mb-2">Submitted.</p>
                    <p className="font-mono text-sm text-black/60 mb-4">
                      Brutalist forms don&apos;t flatter. They just work.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setFormSubmitted(false); setInputName(""); setInputEmail(""); }}
                      className="font-black text-sm uppercase tracking-wide px-5 py-2.5 bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all duration-150 ease-out"
                    >
                      Reset
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    {/* Name input */}
                    <div>
                      <label className="block font-black text-sm uppercase tracking-widest mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 bg-white border-4 border-black font-mono text-base placeholder:text-black/30 focus:outline-none focus:border-black focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-[3px] focus:-translate-y-[3px] transition-all duration-150 ease-out"
                        style={{ borderColor: "#000" }}
                        onFocus={(e) => { e.currentTarget.style.boxShadow = `6px 6px 0px 0px ${currentAccent.hex}`; }}
                        onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>

                    {/* Email input */}
                    <div>
                      <label className="block font-black text-sm uppercase tracking-widest mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-white border-4 border-black font-mono text-base placeholder:text-black/30 focus:outline-none transition-all duration-150 ease-out focus:-translate-x-[3px] focus:-translate-y-[3px]"
                        onFocus={(e) => { e.currentTarget.style.boxShadow = `6px 6px 0px 0px ${currentAccent.hex}`; }}
                        onBlur={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>

                    {/* Custom dropdown */}
                    <div className="relative">
                      <label className="block font-black text-sm uppercase tracking-widest mb-2">
                        Style preference
                      </label>
                      <button
                        type="button"
                        onClick={() => setDropOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white border-4 border-black font-black text-sm uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 ease-out"
                      >
                        <span>{dropValue}</span>
                        <span className="font-mono text-lg">{dropOpen ? "^" : "v"}</span>
                      </button>
                      {dropOpen && (
                        <div className="absolute top-full left-0 right-0 z-20 border-4 border-black border-t-0 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                          {["Raw Brutalism", "Functional Honesty", "Maximum Contrast", "Hard Shadow Only", "Monochrome Strict"].map((item, i) => {
                            const bgs = ["hover:bg-[#ccff00]", "hover:bg-[#ff006e] hover:text-white", "hover:bg-[#00d9ff]", "hover:bg-[#ff9500] hover:text-white", "hover:bg-black hover:text-white"];
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => { setDropValue(item); setDropOpen(false); }}
                                className={`w-full px-4 py-3 text-left font-black text-sm uppercase tracking-wide border-b-2 border-black last:border-0 transition-colors duration-100 ${bgs[i]}`}
                              >
                                {item}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full font-black text-base uppercase tracking-wide py-4 bg-black text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out"
                      style={{ boxShadow: `6px 6px 0px 0px ${currentAccent.hex}` }}
                    >
                      Submit — No Nonsense
                    </button>
                  </form>
                )}
              </RevealBlock>

              {/* Input spec note */}
              <RevealBlock delay={0.1}>
                <div className="border-2 border-black p-4 bg-white">
                  <p className="font-mono text-xs text-black/50 uppercase tracking-widest mb-2">Input rules</p>
                  <ul className="font-mono text-xs text-black/60 space-y-1">
                    <li>border-4 border-black — always black, never gray</li>
                    <li>focus: shadow offset = accent color (Brutal Snap)</li>
                    <li>focus: slight translate lift (-3px) for physical feedback</li>
                    <li>placeholder: font-mono, 30% opacity</li>
                    <li>no rounded corners, no blur on focus ring</li>
                  </ul>
                </div>
              </RevealBlock>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4 — VARIANT SHOWCASE                                   */}
      {/* ============================================================== */}
      <section
        id="variants"
        ref={variantRef}
        className="py-20 md:py-28 bg-black border-b-4 border-black"
        style={{
          opacity: variantInView ? 1 : 0,
          transform: variantInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.25em] px-3 py-1.5 border-2 border-white text-white">
              Variant selector
            </span>
            <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight text-white">
              Variants
            </h2>
            <p className="mt-2 font-mono text-sm text-white/40 max-w-md">
              Switch between Classic (pure black/white + vivid accents) and Playful (rotated cards, multi-color).
            </p>
          </div>

          {/* Variant selector */}
          <div className="flex gap-3 mb-10">
            {(["classic", "playful"] as Variant[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={`font-black text-sm uppercase tracking-wide px-6 py-3 border-4 transition-all duration-150 ease-out ${
                  variant === v
                    ? "bg-[#ccff00] text-black border-[#ccff00] shadow-none translate-x-[3px] translate-y-[3px]"
                    : "bg-black text-white border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                }`}
              >
                {v === "classic" ? "Classic" : "Playful"}
              </button>
            ))}
          </div>

          {/* Classic variant */}
          {variant === "classic" && (
            <RevealBlock>
              <div className="space-y-6">
                <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                  Classic — pure black/white structure with vivid accent highlights
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { title: "MINIMAL",  body: "Black border. White fill. Hard shadow. Nothing else.", accent: "#ccff00" },
                    { title: "VIVID",    body: "One accent color. One purpose. Maximum signal.", accent: "#ff006e" },
                    { title: "DIRECT",   body: "No gradients. No radius. No apologetics.", accent: "#00d9ff" },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="bg-white text-black border-4 border-white p-6 md:p-8 group hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-150 ease-out cursor-pointer"
                      style={{ boxShadow: `6px 6px 0px 0px ${card.accent}` }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `10px 10px 0px 0px ${card.accent}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `6px 6px 0px 0px ${card.accent}`;
                      }}
                    >
                      <div
                        className="w-10 h-10 border-4 border-black mb-5"
                        style={{ backgroundColor: card.accent }}
                      />
                      <h3 className="font-black text-2xl uppercase mb-3">{card.title}</h3>
                      <p className="font-mono text-sm text-black/60">{card.body}</p>
                    </div>
                  ))}
                </div>

                {/* Rule bar */}
                <div className="border-4 border-white p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="font-black text-white text-sm uppercase tracking-widest mb-1">Classic rule</p>
                    <p className="font-mono text-xs text-white/40">bg-white + bg-black + one vivid accent. Shadow always black. No mixing.</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 bg-black border-4 border-white" />
                    <div className="w-10 h-10 bg-white border-4 border-white" />
                    <div className="w-10 h-10 border-4 border-white" style={{ backgroundColor: currentAccent.hex }} />
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Playful variant */}
          {variant === "playful" && (
            <RevealBlock>
              <div className="space-y-6">
                <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                  Playful — rotated cards, multi-color fills, stacked shadows
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                  {[
                    { title: "PINK",   rot: "-rotate-2",  bg: "bg-[#ff006e]", text: "text-white" },
                    { title: "LIME",   rot: "rotate-2",   bg: "bg-[#ccff00]", text: "text-black" },
                    { title: "CYAN",   rot: "-rotate-1",  bg: "bg-[#00d9ff]", text: "text-black" },
                    { title: "ORANGE", rot: "rotate-1",   bg: "bg-[#ff9500]", text: "text-white" },
                    { title: "BLACK",  rot: "-rotate-2",  bg: "bg-black",     text: "text-white" },
                    { title: "WHITE",  rot: "rotate-1",   bg: "bg-white",     text: "text-black" },
                    { title: "BOLD",   rot: "rotate-2",   bg: "bg-[#ccff00]", text: "text-black" },
                    { title: "RAW",    rot: "-rotate-1",  bg: "bg-[#ff006e]", text: "text-white" },
                  ].map((card, i) => (
                    <div
                      key={card.title + i}
                      className={`${card.bg} ${card.text} ${card.rot} border-4 border-white p-5 md:p-6 cursor-pointer hover:-rotate-0 hover:-translate-y-2 transition-all duration-150 ease-out`}
                      style={{ boxShadow: "5px 5px 0px 0px rgba(255,255,255,1)" }}
                    >
                      <p className="font-black text-xl md:text-2xl uppercase">{card.title}</p>
                      <p className="font-mono text-xs mt-2 opacity-60">Card {String(i + 1).padStart(2, "0")}</p>
                    </div>
                  ))}
                </div>

                <div className="border-4 border-white p-5 md:p-6">
                  <p className="font-black text-white text-sm uppercase tracking-widest mb-1">Playful rule</p>
                  <p className="font-mono text-xs text-white/40">
                    Rotations: ±1deg to ±2deg max. Multiple accent fills allowed. hover:rotate-0 snaps flat. Still no blur, no radius.
                  </p>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5 — COLOR SYSTEM                                       */}
      {/* ============================================================== */}
      <section
        id="colors"
        ref={colorRef}
        className="py-20 md:py-28 border-b-4 border-black"
        style={{
          opacity: colorInView ? 1 : 0,
          transform: colorInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-14">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.25em] px-3 py-1.5 border-2 border-black">
              Color system
            </span>
            <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight">
              Brutalist Palette
            </h2>
            <p className="mt-2 font-mono text-sm text-black/50 max-w-md">
              Two structural colors (black, white) + four vivid accents. Thick black borders. Hard shadows. Uppercase labels.
            </p>
          </div>

          {/* Large color blocks */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mb-10">
            {PALETTE.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.06}>
                <div
                  className={`${c.bg} ${c.border} border-2 md:border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 ease-out cursor-pointer`}
                >
                  {/* Swatch */}
                  <div className="h-24 md:h-36" />
                  {/* Label */}
                  <div className={`border-t-2 md:border-t-4 ${c.border} p-3 md:p-4`}>
                    <p className={`${c.text} font-black text-sm md:text-base uppercase tracking-tight`}>{c.name}</p>
                    <p className={`${c.text} font-mono text-xs mt-0.5 opacity-60`}>{c.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Usage rules */}
          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border-4 border-black p-5 md:p-7 bg-black text-white">
                <p className="font-black text-sm uppercase tracking-widest text-[#ccff00] mb-4">Structural colors</p>
                <div className="space-y-3">
                  {[
                    { swatch: "bg-black border-white", label: "BLACK #000000", desc: "Default background for dark sections, borders always" },
                    { swatch: "bg-white border-black", label: "WHITE #ffffff", desc: "Default page background, card fills, button fills" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className={`w-10 h-10 shrink-0 border-2 ${item.swatch}`} />
                      <div>
                        <p className="font-black text-sm">{item.label}</p>
                        <p className="font-mono text-xs text-white/50">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-4 border-black p-5 md:p-7 bg-white">
                <p className="font-black text-sm uppercase tracking-widest text-black/40 mb-4">Vivid accents</p>
                <div className="space-y-3">
                  {[
                    { bg: "bg-[#ff006e]", label: "PINK #ff006e",   desc: "Primary CTAs, hero accents, danger states" },
                    { bg: "bg-[#ccff00]", label: "LIME #ccff00",   desc: "Hero backgrounds, highlights, success states" },
                    { bg: "bg-[#00d9ff]", label: "CYAN #00d9ff",   desc: "Info states, secondary accents, focus rings" },
                    { bg: "bg-[#ff9500]", label: "ORANGE #ff9500", desc: "Warnings, hot tags, energy states" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className={`w-10 h-10 shrink-0 border-2 border-black ${item.bg}`} />
                      <div>
                        <p className="font-black text-sm">{item.label}</p>
                        <p className="font-mono text-xs text-black/40">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6 — TYPOGRAPHY SHOWCASE                                */}
      {/* ============================================================== */}
      <section
        id="typography"
        ref={typeRef}
        className="py-20 md:py-28 bg-[#ccff00] border-b-4 border-black"
        style={{
          opacity: typeInView ? 1 : 0,
          transform: typeInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-14">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.25em] px-3 py-1.5 border-2 border-black bg-black text-[#ccff00]">
              Type system
            </span>
            <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight">
              Typography
            </h2>
            <p className="mt-2 font-mono text-sm text-black/60 max-w-md">
              Text as graphic element. font-black for headers — reads like architecture. font-mono for body — honest and technical.
            </p>
          </div>

          {/* Type scale rows */}
          <div className="space-y-0 border-4 border-black overflow-hidden">
            {FONT_ROWS.map((row, i) => (
              <RevealBlock key={row.role} delay={i * 0.05}>
                <div className={`flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8 px-4 md:px-7 py-6 md:py-8 ${i < FONT_ROWS.length - 1 ? "border-b-4 border-black" : ""} group hover:bg-black hover:text-white transition-colors duration-150 ease-out`}>
                  {/* Role label */}
                  <div className="md:w-28 shrink-0">
                    <span className="font-mono text-xs uppercase tracking-widest text-black/40 group-hover:text-white/40">
                      {row.role}
                    </span>
                  </div>
                  {/* Sample text */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className={`${row.class} truncate`}>{row.sample}</p>
                  </div>
                  {/* Class label */}
                  <div className="md:w-48 shrink-0">
                    <span className="font-mono text-xs text-black/30 group-hover:text-white/30 break-all leading-relaxed">
                      {row.class.split(" ").slice(0, 3).join(" ")}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Text as graphic element demo */}
          <RevealBlock delay={0.2}>
            <div className="mt-10 border-4 border-black bg-black text-white p-6 md:p-10 overflow-hidden relative">
              <div className="relative z-10">
                <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-5">
                  Text as graphic — uppercase font-black at extreme scale
                </p>
                <div className="font-black text-[clamp(80px,18vw,220px)] leading-none tracking-tighter uppercase select-none"
                  style={{ color: "transparent", WebkitTextStroke: `3px ${currentAccent.hex}` }}
                >
                  RAW
                </div>
                <div className="font-black text-[clamp(80px,18vw,220px)] leading-none tracking-tighter uppercase select-none -mt-6"
                  style={{ color: currentAccent.hex }}
                >
                  FORM
                </div>
              </div>
              <p className="font-mono text-xs text-white/30 mt-4">
                In neo-brutalism, type IS layout. Letters define space as structures do.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7 — DESIGN RULES — DO / DON'T                         */}
      {/* ============================================================== */}
      <section
        id="rules"
        ref={rulesRef}
        className="py-20 md:py-28 border-b-4 border-black"
        style={{
          opacity: rulesInView ? 1 : 0,
          transform: rulesInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-10 md:mb-14">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.25em] px-3 py-1.5 border-2 border-black">
              System rules
            </span>
            <h2 className="mt-4 font-black text-4xl md:text-6xl uppercase tracking-tight">
              Do / Don&apos;t
            </h2>
            <p className="mt-2 font-mono text-sm text-black/50 max-w-md">
              Actual brutalist components vs wrong examples side by side. The rules are the design.
            </p>
          </div>

          {/* Rules grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
            {/* DO column */}
            <RevealBlock delay={0.04}>
              <div className="border-4 border-black overflow-hidden h-full" style={{ boxShadow: "6px 6px 0px 0px #ccff00" }}>
                <div className="bg-[#ccff00] border-b-4 border-black px-6 py-4">
                  <h3 className="font-black text-xl uppercase tracking-wide">DO — Must have</h3>
                </div>
                <ul className="divide-y-4 divide-black">
                  {DO_RULES.map((rule, i) => (
                    <li key={rule.code} className="flex gap-4 px-5 md:px-6 py-4 md:py-5 group hover:bg-[#ccff00] transition-colors duration-100 ease-out cursor-default">
                      <span className="font-black text-xs text-black/30 group-hover:text-black shrink-0 w-6 pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-mono text-xs md:text-sm text-black mb-1 break-all leading-relaxed">{rule.code}</p>
                        <p className="font-mono text-xs text-black/50">{rule.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.08}>
              <div className="border-4 border-black overflow-hidden h-full" style={{ boxShadow: "6px 6px 0px 0px #ff006e" }}>
                <div className="bg-[#ff006e] border-b-4 border-black px-6 py-4">
                  <h3 className="font-black text-xl uppercase tracking-wide text-white">DON&apos;T — Forbidden</h3>
                </div>
                <ul className="divide-y-4 divide-black">
                  {DONT_RULES.map((rule, i) => (
                    <li key={rule.code} className="flex gap-4 px-5 md:px-6 py-4 md:py-5 group hover:bg-[#ff006e] hover:text-white transition-colors duration-100 ease-out cursor-default">
                      <span className="font-black text-xs text-black/30 group-hover:text-white shrink-0 w-6 pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-mono text-xs md:text-sm text-black group-hover:text-white mb-1 break-all leading-relaxed">{rule.code}</p>
                        <p className="font-mono text-xs text-black/50 group-hover:text-white/70">{rule.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Live comparison: right vs wrong */}
          <RevealBlock delay={0.16}>
            <div className="border-4 border-black p-5 md:p-8 bg-white">
              <p className="font-mono text-xs uppercase tracking-widest text-black/40 mb-6">
                Live comparison — correct vs incorrect implementation
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                {/* Correct */}
                <div>
                  <p className="font-black text-sm uppercase text-[#ccff00] bg-black px-3 py-1 inline-block mb-4">
                    Correct
                  </p>
                  <div className="space-y-4">
                    {/* Correct button */}
                    <div>
                      <p className="font-mono text-xs text-black/40 mb-2">Button</p>
                      <button
                        type="button"
                        className="font-black text-sm uppercase tracking-wide px-5 py-2.5 bg-[#ff006e] text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-150 ease-out"
                      >
                        Get Started
                      </button>
                    </div>
                    {/* Correct card */}
                    <div>
                      <p className="font-mono text-xs text-black/40 mb-2">Card</p>
                      <div className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 bg-white group hover:bg-[#ccff00] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 ease-out">
                        <p className="font-black text-base uppercase">Hard Edge Card</p>
                        <p className="font-mono text-xs text-black/50 mt-1">border-4 border-black, shadow-[4px_4px_0px_0px], rounded-none</p>
                      </div>
                    </div>
                    {/* Correct input */}
                    <div>
                      <p className="font-mono text-xs text-black/40 mb-2">Input</p>
                      <input
                        type="text"
                        readOnly
                        defaultValue="Correct input field"
                        className="w-full px-4 py-2.5 border-4 border-black font-mono text-sm bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Wrong */}
                <div>
                  <p className="font-black text-sm uppercase text-white bg-[#ff006e] px-3 py-1 inline-block mb-4">
                    Wrong
                  </p>
                  <div className="space-y-4">
                    {/* Wrong button — rounded, soft shadow, gradient */}
                    <div>
                      <p className="font-mono text-xs text-black/40 mb-2">Button</p>
                      <button
                        type="button"
                        className="font-semibold text-sm px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:opacity-80 transition-opacity duration-300"
                      >
                        Get Started
                      </button>
                      <p className="font-mono text-xs text-[#ff006e] mt-1">rounded-lg, shadow-lg, gradient, opacity hover</p>
                    </div>
                    {/* Wrong card */}
                    <div>
                      <p className="font-mono text-xs text-black/40 mb-2">Card</p>
                      <div className="rounded-xl shadow-xl p-4 bg-white border border-gray-200">
                        <p className="font-semibold text-base text-gray-700">Soft Card</p>
                        <p className="text-xs text-gray-400 mt-1">rounded-xl, shadow-xl, border-gray-200 — all forbidden</p>
                      </div>
                    </div>
                    {/* Wrong input */}
                    <div>
                      <p className="font-mono text-xs text-black/40 mb-2">Input</p>
                      <input
                        type="text"
                        readOnly
                        defaultValue="Wrong input field"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <p className="font-mono text-xs text-[#ff006e] mt-1">rounded-md, border-gray, focus:ring blur — all forbidden</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Animation spec summary */}
          <RevealBlock delay={0.22}>
            <div
              className="mt-8 border-4 border-black bg-black text-white p-5 md:p-7"
              style={{ boxShadow: `6px 6px 0px 0px ${currentAccent.hex}` }}
            >
              <p className="font-black text-sm uppercase tracking-widest mb-5" style={{ color: currentAccent.hex }}>
                Animation taxonomy
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    name: "Physical Crushing",
                    rule: "active: translate = shadow offset, shadow-none",
                    detail: "6px shadow → active:translate-x-[6px] translate-y-[6px]. Never less than shadow value.",
                  },
                  {
                    name: "Brutal Snap",
                    rule: "hover: instant hard bg color switch",
                    detail: "hover:bg-[#ccff00] duration-150 ease-out. No opacity transition. No gradual fade.",
                  },
                  {
                    name: "Heavy Focus",
                    rule: "card hover: shadow grows + color changes",
                    detail: "shadow-[4px] → shadow-[8px] + colored shadow. Background snaps. Hard cut.",
                  },
                ].map((anim) => (
                  <div key={anim.name} className="border-2 border-white/20 p-4">
                    <p className="font-black text-sm mb-2" style={{ color: currentAccent.hex }}>{anim.name}</p>
                    <p className="font-mono text-xs text-white/70 mb-2">{anim.rule}</p>
                    <p className="font-mono text-xs text-white/40 leading-relaxed">{anim.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 8 — FOOTER                                             */}
      {/* ============================================================== */}
      <footer
        ref={footerRef}
        className="bg-black border-t-4 border-black"
        style={{
          opacity: footerInView ? 1 : 0,
          transform: footerInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
        }}
      >
        {/* Accent bar */}
        <div className="flex h-3">
          {ACCENT_KEYS.map((key) => (
            <div key={key} className={`flex-1 ${ACCENTS[key].bg}`} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20">

          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12 md:mb-16">

            {/* Brand block */}
            <div>
              <div
                className="inline-block border-4 border-white px-4 py-2 mb-4"
                style={{ boxShadow: `6px 6px 0px 0px ${currentAccent.hex}` }}
              >
                <span className="font-black text-white text-lg uppercase tracking-tighter">
                  NEO-BRUTALIST
                </span>
              </div>
              <p className="font-mono text-sm text-white/40 max-w-xs leading-relaxed mt-2">
                Raw. Honest. Unadorned. No rounded corners. No gradients.
                No apologies. Just structure.
              </p>
              <p className="font-mono text-xs text-white/20 mt-3 uppercase tracking-widest">
                新野兽派 — 真实 · 直接 · 诚实
              </p>
            </div>

            {/* Color swatches */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-4">Accent palette</p>
              <div className="flex gap-3">
                {ACCENT_KEYS.map((key) => (
                  <div
                    key={key}
                    className={`w-12 h-12 md:w-16 md:h-16 border-4 border-white ${ACCENTS[key].bg} cursor-pointer hover:-translate-y-1 transition-transform duration-150`}
                    onClick={() => setAccent(key)}
                    title={`Switch to ${ACCENTS[key].label}`}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-4">Navigation</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "← All Styles", href: "/styles" },
                  { label: "Neo-Brutalist Docs", href: "/styles/neo-brutalist" },
                  { label: "Components", href: "#components" },
                  { label: "Variants", href: "#variants" },
                  { label: "Typography", href: "#typography" },
                  { label: "Rules", href: "#rules" },
                ].map((link) => (
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="font-mono text-sm text-white/50 hover:text-white hover:bg-white hover:text-black px-2 py-0.5 transition-colors duration-150 ease-out w-fit"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="font-mono text-sm text-white/50 hover:text-white hover:bg-white hover:text-black px-2 py-0.5 transition-colors duration-150 ease-out w-fit"
                    >
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Feature summary chips */}
          <div className="border-t-4 border-white/10 pt-8 mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-white/30 mb-4">Design principles</p>
            <div className="flex flex-wrap gap-2">
              {[
                "rounded-none",
                "border-4 border-black",
                "shadow-[6px_6px_0px]",
                "font-black uppercase",
                "font-mono body",
                "Brutal Snap hover",
                "Physical Crushing active",
                "Heavy Focus card",
                "No gradients",
                "No blur",
                "High contrast",
                "Hard cuts only",
              ].map((chip) => (
                <span
                  key={chip}
                  className="inline-block font-mono text-xs px-3 py-1.5 border-2 border-white/20 text-white/50"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom strip */}
          <div className="border-t-4 border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-mono text-xs text-white/20 uppercase tracking-widest">
              StyleKit — Neo-Brutalist Showcase — 新野兽派
            </p>
            <div className="flex items-center gap-3">
              {ACCENT_KEYS.map((key) => (
                <div
                  key={key}
                  className={`w-4 h-4 border-2 border-white/30 ${ACCENTS[key].bg}`}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
