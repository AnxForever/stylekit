"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
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
/*  Constructivism color tokens                                         */
/* ------------------------------------------------------------------ */

const RED = "#cc0000";
const BLACK = "#1a1a1a";
const PAPER = "#f2e8d5";
const GOLD = "#d4a843";
const BROWN = "#8b4513";

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"buttons" | "cards" | "inputs" | "hero">("buttons");

  /* aiRule 1 — Block Invasion demo */
  const [invasionTarget, setInvasionTarget] = useState<number | null>(null);

  /* aiRule 2 — Diagonal Aggression demo */
  const [aggressionHovered, setAggressionHovered] = useState(false);

  /* aiRule 3 — Soviet Reversal demo */
  const [reversalActive, setReversalActive] = useState(false);
  const [reversalHeld, setReversalHeld] = useState(false);

  /* aiRule 4 — Line Snap demo */
  const [snapCards, setSnapCards] = useState([false, false, false]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function toggleSnapCard(i: number) {
    setSnapCards((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  const paletteSwatches = [
    { name: "Soviet Red", hex: RED, role: "Primary" },
    { name: "Pure Black", hex: BLACK, role: "Structural" },
    { name: "Aged Paper", hex: PAPER, role: "Background" },
    { name: "Gold Star", hex: GOLD, role: "Accent" },
    { name: "Earth Brown", hex: BROWN, role: "Accent" },
  ];

  const doItems = [
    "bg-[#cc0000] text-[#1a1a1a] — soviet red + black high contrast",
    "-rotate-6 rotate-3 skew-x-3 — diagonal composition",
    "font-black text-6xl uppercase — maximum typographic weight",
    "rounded-none — zero softness, pure geometric hard edge",
    "shadow-[4px_4px_0_#1a1a1a] — woodblock print shadow",
    "border-4 border-[#1a1a1a] — thick structural borders",
    "Extreme weight contrast — giant headline vs small body text",
    "transform rotate — dynamic diagonal construction",
  ];

  const dontItems = [
    "rounded-lg rounded-xl rounded-full — absolutely forbidden",
    "bg-gradient-to-r — no soft gradients whatsoever",
    "shadow-sm shadow-md — no soft diffuse shadows",
    "More than three colors — strict red/black/paper system",
    "font-light font-normal — no weak typographic weight",
    "Large white-space — suppresses urgency and tension",
    "Curves and organic shapes — constructivism is geometric only",
    "ease-in-out transitions — too fluid, use ease-linear",
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: PAPER, fontFamily: "sans-serif", color: BLACK }}
    >
      <style>{`
        @keyframes cstv-march {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes cstv-pulse-red {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes cstv-stamp {
          0% { transform: scale(1.4) rotate(-8deg); opacity: 0; }
          60% { transform: scale(0.95) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .cstv-stripes {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            ${RED} 10px,
            ${RED} 12px
          );
        }
        .cstv-diagonal-divider {
          height: 4px;
          background: ${BLACK};
          transform: rotate(-1.5deg);
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                      */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: BLACK,
          borderBottom: `4px solid ${RED}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Back link */}
          <Link
            href="/styles/constructivism"
            className="flex items-center gap-3 group"
            style={{ textDecoration: "none" }}
          >
            <div
              className="w-8 h-8 flex items-center justify-center group-hover:translate-x-[-2px] transition-transform duration-75 ease-linear"
              style={{ backgroundColor: RED }}
            >
              <span
                className="font-black text-sm"
                style={{ color: PAPER }}
              >
                &#8592;
              </span>
            </div>
            <span
              className="font-black uppercase tracking-[0.25em] text-xs"
              style={{ color: PAPER }}
            >
              BACK TO DOCS
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Components", "Rules Demo", "Philosophy", "Do/Don't"].map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs font-black uppercase tracking-wider cursor-pointer transition-all duration-75 ease-linear"
                style={{ color: PAPER, letterSpacing: "0.15em" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = RED;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = PAPER;
                }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/"
            className="group relative flex items-center gap-2 px-5 py-2 overflow-hidden font-black uppercase text-xs tracking-wider transition-all duration-75 ease-linear hover:translate-x-[3px] hover:translate-y-[3px]"
            style={{
              color: PAPER,
              backgroundColor: RED,
              border: `2px solid ${RED}`,
              boxShadow: `3px 3px 0 ${PAPER}`,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `1px 1px 0 ${PAPER}`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${PAPER}`; }}
          >
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
              style={{ backgroundColor: BLACK }}
            />
            <span className="relative z-10">← StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                           */}
      {/* ================================================================ */}
      <section
        className="relative pt-14 min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: PAPER }}
      >
        {/* Diagonal red slab — far right */}
        <div
          className="absolute top-0 right-0 w-2/5 h-full -skew-x-6"
          style={{ backgroundColor: RED, transformOrigin: "top right" }}
        />
        {/* Black geometric corner */}
        <div
          className="absolute bottom-0 left-0 w-56 h-56 rotate-45 -translate-x-28 translate-y-28"
          style={{ backgroundColor: BLACK }}
        />
        {/* Thin diagonal stripe band */}
        <div className="absolute top-0 left-0 right-0 h-2 cstv-stripes opacity-40" />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div
              className="inline-block px-4 py-1 mb-6 font-black uppercase text-xs tracking-[0.3em]"
              style={{ backgroundColor: BLACK, color: GOLD }}
            >
              Soviet Constructivism — 1920s
            </div>
          </div>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0) rotate(0deg)" : "translateY(60px) rotate(-2deg)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <h1
              className="font-black uppercase leading-none mb-2"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                color: BLACK,
                letterSpacing: "-0.02em",
                transform: "rotate(-2deg)",
              }}
            >
              CONSTRUCT
            </h1>
            <h2
              className="font-black uppercase leading-none mb-8"
              style={{
                fontSize: "clamp(2rem, 6vw, 5rem)",
                color: RED,
                letterSpacing: "0.2em",
              }}
            >
              THE FUTURE
            </h2>
          </div>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <div
              className="w-24 h-1 mb-6"
              style={{ backgroundColor: RED, transform: "rotate(-1deg)" }}
            />
            <p
              className="font-black uppercase text-sm tracking-widest mb-10 max-w-md"
              style={{ color: BLACK, opacity: 0.75, lineHeight: "1.8" }}
            >
              Art must serve the revolution. Design is a weapon of progress and collective transformation.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {/* Primary CTA */}
            <button
              className="group relative px-10 py-4 overflow-hidden font-black uppercase tracking-[0.3em] text-sm transition-all duration-75 ease-linear hover:translate-x-[4px] hover:translate-y-[4px]"
              style={{
                backgroundColor: RED,
                color: PAPER,
                border: `4px solid ${BLACK}`,
                boxShadow: `6px 6px 0 ${BLACK}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${BLACK}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${BLACK}`;
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.backgroundColor = BLACK;
                (e.currentTarget as HTMLElement).style.color = RED;
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${BLACK}`;
                (e.currentTarget as HTMLElement).style.backgroundColor = RED;
                (e.currentTarget as HTMLElement).style.color = PAPER;
              }}
            >
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
                style={{ backgroundColor: BLACK }}
              />
              <span className="relative z-10">BEGIN THE WORK</span>
            </button>

            {/* Secondary CTA */}
            <button
              className="group relative px-10 py-4 overflow-hidden font-black uppercase tracking-[0.3em] text-sm transition-all duration-75 ease-linear hover:translate-x-[4px] hover:translate-y-[4px]"
              style={{
                backgroundColor: "transparent",
                color: BLACK,
                border: `4px solid ${BLACK}`,
                boxShadow: `6px 6px 0 ${RED}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${RED}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${RED}`;
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.backgroundColor = RED;
                (e.currentTarget as HTMLElement).style.color = PAPER;
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${RED}`;
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = BLACK;
              }}
            >
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
                style={{ backgroundColor: RED }}
              />
              <span className="relative z-10">VIEW MANIFESTO</span>
            </button>
          </div>

          {/* Hero stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s",
            }}
          >
            {[
              { value: "1920s", label: "ORIGIN ERA" },
              { value: "3", label: "COLOR LIMIT" },
              { value: "0deg", label: "ALLOWED CURVES" },
              { value: "100ms", label: "MAX TRANSITION" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 transition-all duration-75 ease-linear"
                style={{
                  border: `4px solid ${BLACK}`,
                  backgroundColor: PAPER,
                  boxShadow: `4px 4px 0 ${BLACK}`,
                }}
              >
                <div
                  className="font-black text-2xl uppercase"
                  style={{ color: RED }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-black text-xs uppercase tracking-[0.15em] mt-1"
                  style={{ color: BLACK, opacity: 0.6 }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                  */}
      {/* ================================================================ */}
      <section
        className="py-24 px-5 md:px-10"
        style={{ backgroundColor: BLACK }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1" style={{ backgroundColor: RED }} />
              <span
                className="font-black uppercase tracking-[0.3em] text-xs"
                style={{ color: RED }}
              >
                Color System
              </span>
            </div>
            <h2
              className="font-black uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: PAPER }}
            >
              THREE-COLOR
              <br />
              <span style={{ color: RED }}>DOCTRINE</span>
            </h2>
            <p
              className="mt-6 font-black uppercase text-xs tracking-widest max-w-xl"
              style={{ color: PAPER, opacity: 0.6, lineHeight: "1.9" }}
            >
              Soviet red, pure black, aged paper. Every deviation is counter-revolutionary. Gold and brown enter only as minimal accents of print heritage.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              {paletteSwatches.map((swatch) => (
                <div
                  key={swatch.name}
                  className="group cursor-default transition-all duration-75 ease-linear"
                  style={{
                    border: `4px solid ${swatch.hex === PAPER ? RED : PAPER}`,
                    boxShadow: `4px 4px 0 ${RED}`,
                  }}
                >
                  <div
                    className="h-28 w-full"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div
                    className="p-3"
                    style={{
                      backgroundColor: PAPER,
                      borderTop: `3px solid ${swatch.hex === PAPER ? BLACK : swatch.hex}`,
                    }}
                  >
                    <div
                      className="font-black uppercase text-xs tracking-wider"
                      style={{ color: BLACK }}
                    >
                      {swatch.name}
                    </div>
                    <div
                      className="font-black uppercase text-xs mt-1 opacity-60"
                      style={{ color: BLACK, fontFamily: "monospace" }}
                    >
                      {swatch.hex}
                    </div>
                    <div
                      className="inline-block mt-2 px-2 py-0.5 font-black uppercase text-[9px] tracking-wider"
                      style={{
                        backgroundColor: swatch.hex === PAPER ? BLACK : swatch.hex,
                        color: PAPER,
                      }}
                    >
                      {swatch.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Three-color usage diagram */}
          <RevealBlock delay={0.2}>
            <div
              className="p-8"
              style={{
                border: `4px solid ${RED}`,
                backgroundColor: PAPER,
                boxShadow: `6px 6px 0 ${RED}`,
              }}
            >
              <div
                className="font-black uppercase text-xs tracking-[0.3em] mb-6"
                style={{ color: RED }}
              >
                Strict Usage Protocol
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    color: RED,
                    name: "Soviet Red",
                    usage: ["Primary CTAs", "Section headers", "Diagonal slabs", "Alert borders"],
                    textColor: PAPER,
                  },
                  {
                    color: BLACK,
                    name: "Pure Black",
                    usage: ["All borders border-4", "Hard shadows", "Body text", "Structural frames"],
                    textColor: PAPER,
                  },
                  {
                    color: PAPER,
                    name: "Aged Paper",
                    usage: ["Page background", "Card surface", "Text on dark", "Form fields"],
                    textColor: BLACK,
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-5"
                    style={{
                      backgroundColor: item.color,
                      border: `3px solid ${BLACK}`,
                    }}
                  >
                    <div
                      className="font-black uppercase tracking-wider text-sm mb-4"
                      style={{ color: item.textColor }}
                    >
                      {item.name}
                    </div>
                    <ul className="space-y-2">
                      {item.usage.map((u) => (
                        <li
                          key={u}
                          className="font-black uppercase text-[10px] tracking-wider flex items-center gap-2"
                          style={{ color: item.textColor, opacity: 0.85 }}
                        >
                          <span
                            className="w-3 h-3 inline-block shrink-0"
                            style={{ backgroundColor: item.textColor }}
                          />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section
        className="py-24 px-5 md:px-10"
        style={{ backgroundColor: PAPER }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1" style={{ backgroundColor: BLACK }} />
              <span
                className="font-black uppercase tracking-[0.3em] text-xs"
                style={{ color: BLACK }}
              >
                Components
              </span>
            </div>
            <h2
              className="font-black uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: BLACK }}
            >
              BUILDING
              <br />
              <span style={{ color: RED }}>BLOCKS</span>
            </h2>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.05} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "hero"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="font-black uppercase text-xs tracking-[0.2em] px-5 py-2.5 transition-all duration-75 ease-linear"
                  style={{
                    backgroundColor: activeTab === tab ? RED : "transparent",
                    color: activeTab === tab ? PAPER : BLACK,
                    border: `3px solid ${activeTab === tab ? RED : BLACK}`,
                    boxShadow: activeTab === tab ? `3px 3px 0 ${BLACK}` : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.1}>
            <div
              className="p-8 md:p-12"
              style={{
                border: `4px solid ${BLACK}`,
                backgroundColor: PAPER,
                boxShadow: `6px 6px 0 ${BLACK}`,
              }}
            >

              {/* ---- BUTTONS ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-12">
                  <div>
                    <p
                      className="font-black uppercase tracking-[0.2em] text-xs mb-6"
                      style={{ color: BLACK, opacity: 0.5 }}
                    >
                      Primary — Red Invasion + Diagonal Shift
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      <button
                        className="group relative px-8 py-3 overflow-hidden font-black uppercase tracking-[0.2em] text-sm transition-all duration-75 ease-linear hover:translate-x-[4px] hover:translate-y-[4px]"
                        style={{
                          backgroundColor: RED,
                          color: PAPER,
                          border: `4px solid ${BLACK}`,
                          boxShadow: `6px 6px 0 ${BLACK}`,
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${BLACK}`; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${BLACK}`; }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLElement).style.backgroundColor = BLACK;
                          (e.currentTarget as HTMLElement).style.color = RED;
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${BLACK}`;
                          (e.currentTarget as HTMLElement).style.backgroundColor = RED;
                          (e.currentTarget as HTMLElement).style.color = PAPER;
                        }}
                      >
                        <div
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
                          style={{ backgroundColor: BLACK }}
                        />
                        <span className="relative z-10">ACTION</span>
                      </button>

                      <button
                        className="group relative px-8 py-3 overflow-hidden font-black uppercase tracking-[0.2em] text-sm transition-all duration-75 ease-linear hover:translate-x-[4px] hover:translate-y-[4px] -rotate-1"
                        style={{
                          backgroundColor: BLACK,
                          color: PAPER,
                          border: `4px solid ${BLACK}`,
                          boxShadow: `6px 6px 0 ${RED}`,
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${RED}`; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${RED}`; }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLElement).style.backgroundColor = RED;
                          (e.currentTarget as HTMLElement).style.color = BLACK;
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${RED}`;
                          (e.currentTarget as HTMLElement).style.backgroundColor = BLACK;
                          (e.currentTarget as HTMLElement).style.color = PAPER;
                        }}
                      >
                        <div
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
                          style={{ backgroundColor: RED }}
                        />
                        <span className="relative z-10">MOBILIZE</span>
                      </button>

                      <button
                        className="group relative px-8 py-3 overflow-hidden font-black uppercase tracking-[0.2em] text-sm transition-all duration-75 ease-linear hover:translate-x-[4px] hover:translate-y-[4px]"
                        style={{
                          backgroundColor: "transparent",
                          color: RED,
                          border: `4px solid ${RED}`,
                          boxShadow: `6px 6px 0 ${RED}`,
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${RED}`; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${RED}`; }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLElement).style.backgroundColor = RED;
                          (e.currentTarget as HTMLElement).style.color = PAPER;
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${RED}`;
                          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                          (e.currentTarget as HTMLElement).style.color = RED;
                        }}
                      >
                        <div
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
                          style={{ backgroundColor: RED }}
                        />
                        <span className="relative z-10">RESIST</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p
                      className="font-black uppercase tracking-[0.2em] text-xs mb-6"
                      style={{ color: BLACK, opacity: 0.5 }}
                    >
                      Size variants — all with diagonal shift + hard shadow
                    </p>
                    <div className="flex flex-wrap gap-4 items-end">
                      {[
                        { label: "SM", px: "px-5 py-2", text: "text-xs" },
                        { label: "MD", px: "px-8 py-3", text: "text-sm" },
                        { label: "LG", px: "px-12 py-4", text: "text-base" },
                      ].map(({ label, px, text }) => (
                        <button
                          key={label}
                          className={`group relative ${px} overflow-hidden font-black uppercase tracking-[0.2em] ${text} transition-all duration-75 ease-linear hover:translate-x-[4px] hover:translate-y-[4px]`}
                          style={{
                            backgroundColor: RED,
                            color: PAPER,
                            border: `4px solid ${BLACK}`,
                            boxShadow: `6px 6px 0 ${BLACK}`,
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${BLACK}`; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${BLACK}`; }}
                          onMouseDown={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            (e.currentTarget as HTMLElement).style.backgroundColor = BLACK;
                            (e.currentTarget as HTMLElement).style.color = RED;
                          }}
                          onMouseUp={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${BLACK}`;
                            (e.currentTarget as HTMLElement).style.backgroundColor = RED;
                            (e.currentTarget as HTMLElement).style.color = PAPER;
                          }}
                        >
                          <div
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
                            style={{ backgroundColor: BLACK }}
                          />
                          <span className="relative z-10">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "MANIFESTO",
                      label: "DOCTRINE",
                      body: "Art must serve the revolution. Design is a weapon of progress and collective transformation of society.",
                      bannerBg: RED,
                    },
                    {
                      title: "WORKERS",
                      label: "SOCIAL",
                      body: "The worker is the foundation of the new world. Geometric forms reflect mechanical clarity and collective strength.",
                      bannerBg: BLACK,
                    },
                    {
                      title: "INDUSTRY",
                      label: "PROGRESS",
                      body: "Iron and fire shape the future. Diagonal compositions mirror the energy of machines in perpetual motion.",
                      bannerBg: RED,
                    },
                    {
                      title: "GEOMETRY",
                      label: "FORM",
                      body: "Only pure geometric forms carry the revolutionary spirit. No curves. No organic shapes. Only hard-edged truth.",
                      bannerBg: BLACK,
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group overflow-hidden transition-all duration-75 ease-linear"
                      style={{
                        border: `4px solid ${BLACK}`,
                        boxShadow: `6px 6px 0 ${BLACK}`,
                        backgroundColor: PAPER,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${BLACK}`;
                        (e.currentTarget as HTMLElement).style.transform = "translate(4px, 4px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${BLACK}`;
                        (e.currentTarget as HTMLElement).style.transform = "";
                      }}
                    >
                      {/* Banner */}
                      <div
                        className="px-6 py-3 transition-colors duration-75 ease-linear"
                        style={{ backgroundColor: card.bannerBg }}
                      >
                        <h3
                          className="font-black uppercase tracking-[0.2em] text-lg"
                          style={{ color: PAPER }}
                        >
                          {card.title}
                        </h3>
                      </div>
                      <div className="p-6">
                        {/* Diagonal accent line */}
                        <div
                          className="w-full h-1 mb-4 transition-transform duration-75 ease-linear"
                          style={{
                            backgroundColor: BLACK,
                            transform: "rotate(-2deg)",
                          }}
                        />
                        <div
                          className="inline-block px-2 py-0.5 mb-3 font-black uppercase text-[10px] tracking-[0.2em]"
                          style={{ backgroundColor: RED, color: PAPER }}
                        >
                          {card.label}
                        </div>
                        <p
                          className="font-black uppercase text-xs tracking-wider leading-relaxed"
                          style={{ color: BLACK }}
                        >
                          {card.body}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <span className="w-4 h-4 inline-block" style={{ backgroundColor: RED }} />
                          <span className="w-4 h-4 inline-block" style={{ backgroundColor: BLACK }} />
                          <span className="w-4 h-4 inline-block" style={{ backgroundColor: GOLD }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <label
                        className="block font-black uppercase text-xs tracking-[0.2em] mb-2"
                        style={{ color: BLACK }}
                      >
                        Worker ID
                      </label>
                      <input
                        type="text"
                        placeholder="INPUT TEXT..."
                        className="w-full px-5 py-3 font-black uppercase tracking-wider text-sm focus:outline-none transition-all duration-75 ease-linear"
                        style={{
                          backgroundColor: PAPER,
                          border: `4px solid ${BLACK}`,
                          color: BLACK,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.border = `4px solid ${RED}`;
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${RED}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.border = `4px solid ${BLACK}`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-black uppercase text-xs tracking-[0.2em] mb-2"
                        style={{ color: BLACK }}
                      >
                        Collective
                      </label>
                      <input
                        type="text"
                        placeholder="UNIT NAME..."
                        className="w-full px-5 py-3 font-black uppercase tracking-wider text-sm focus:outline-none transition-all duration-75 ease-linear"
                        style={{
                          backgroundColor: PAPER,
                          border: `4px solid ${BLACK}`,
                          color: BLACK,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.border = `4px solid ${RED}`;
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${RED}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.border = `4px solid ${BLACK}`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block font-black uppercase text-xs tracking-[0.2em] mb-2"
                        style={{ color: BLACK }}
                      >
                        Manifesto
                      </label>
                      <textarea
                        rows={3}
                        placeholder="STATE YOUR PURPOSE..."
                        className="w-full px-5 py-3 font-black uppercase tracking-wider text-sm focus:outline-none transition-all duration-75 ease-linear resize-none"
                        style={{
                          backgroundColor: PAPER,
                          border: `4px solid ${BLACK}`,
                          color: BLACK,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.border = `4px solid ${RED}`;
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${RED}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.border = `4px solid ${BLACK}`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label
                        className="block font-black uppercase text-xs tracking-[0.2em] mb-2"
                        style={{ color: BLACK }}
                      >
                        Role
                      </label>
                      <select
                        className="w-full px-5 py-3 font-black uppercase tracking-wider text-sm focus:outline-none transition-all duration-75 ease-linear"
                        style={{
                          backgroundColor: PAPER,
                          border: `4px solid ${BLACK}`,
                          color: BLACK,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.border = `4px solid ${RED}`;
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${RED}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.border = `4px solid ${BLACK}`;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      >
                        <option>ARTIST</option>
                        <option>DESIGNER</option>
                        <option>ARCHITECT</option>
                        <option>ENGINEER</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 shrink-0 flex items-center justify-center"
                        style={{ border: `3px solid ${RED}`, backgroundColor: RED }}
                      >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="3.5">
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <label
                        className="font-black uppercase text-xs tracking-wider"
                        style={{ color: BLACK }}
                      >
                        Pledge allegiance to the collective
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 shrink-0"
                        style={{ border: `3px solid ${BLACK}` }}
                      />
                      <label
                        className="font-black uppercase text-xs tracking-wider"
                        style={{ color: BLACK, opacity: 0.5 }}
                      >
                        Request individual deviation
                      </label>
                    </div>
                    <button
                      className="group relative w-full py-4 overflow-hidden font-black uppercase tracking-[0.3em] text-sm transition-all duration-75 ease-linear hover:translate-x-[3px] hover:translate-y-[3px]"
                      style={{
                        backgroundColor: RED,
                        color: PAPER,
                        border: `4px solid ${BLACK}`,
                        boxShadow: `5px 5px 0 ${BLACK}`,
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${BLACK}`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${BLACK}`; }}
                    >
                      <div
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
                        style={{ backgroundColor: BLACK }}
                      />
                      <span className="relative z-10">SUBMIT DECLARATION</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ---- HERO COMPONENT ---- */}
              {activeTab === "hero" && (
                <div
                  className="relative min-h-64 flex items-center overflow-hidden"
                  style={{ backgroundColor: PAPER }}
                >
                  <div
                    className="absolute top-0 right-0 w-1/3 h-full -skew-x-12 translate-x-16"
                    style={{ backgroundColor: RED }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-40 h-40 rotate-45 -translate-x-20 translate-y-20"
                    style={{ backgroundColor: BLACK }}
                  />
                  <div className="relative z-10 px-10">
                    <div className="w-20 h-1 mb-4" style={{ backgroundColor: RED }} />
                    <h3
                      className="font-black uppercase leading-none mb-2"
                      style={{ fontSize: "3rem", color: BLACK, transform: "rotate(-1deg)" }}
                    >
                      CONSTRUCT
                    </h3>
                    <h4
                      className="font-black uppercase mb-5"
                      style={{ fontSize: "1.5rem", color: RED, letterSpacing: "0.2em" }}
                    >
                      THE FUTURE
                    </h4>
                    <p
                      className="font-black uppercase text-xs tracking-widest mb-6 max-w-xs"
                      style={{ color: BLACK, opacity: 0.7, lineHeight: "1.8" }}
                    >
                      Art into life. Design as revolution.
                    </p>
                    <button
                      className="group relative px-8 py-3 overflow-hidden font-black uppercase tracking-[0.2em] text-sm transition-all duration-75 ease-linear hover:translate-x-[4px] hover:translate-y-[4px]"
                      style={{
                        backgroundColor: BLACK,
                        color: PAPER,
                        border: `4px solid ${BLACK}`,
                        boxShadow: `6px 6px 0 ${RED}`,
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${RED}`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${RED}`; }}
                    >
                      <div
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
                        style={{ backgroundColor: RED }}
                      />
                      <span className="relative z-10">BEGIN</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. AI RULES INTERACTIVE DEMO                                     */}
      {/* ================================================================ */}
      <section
        className="py-24 px-5 md:px-10"
        style={{ backgroundColor: BLACK }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1" style={{ backgroundColor: RED }} />
              <span
                className="font-black uppercase tracking-[0.3em] text-xs"
                style={{ color: RED }}
              >
                Interaction Rules
              </span>
            </div>
            <h2
              className="font-black uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: PAPER }}
            >
              FOUR LAWS OF
              <br />
              <span style={{ color: RED }}>MECHANICAL MOTION</span>
            </h2>
            <p
              className="mt-6 font-black uppercase text-xs tracking-widest max-w-xl"
              style={{ color: PAPER, opacity: 0.55, lineHeight: "1.9" }}
            >
              Every interaction follows strict mechanical principles. No fluidity. No organic easing. Pure linear machine movement — duration-75 and duration-100 only.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ---- Rule 1: Block Invasion ---- */}
            <RevealBlock delay={0.05}>
              <div
                className="p-8 h-full"
                style={{
                  border: `4px solid ${RED}`,
                  backgroundColor: PAPER,
                  boxShadow: `6px 6px 0 ${RED}`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="px-3 py-1 font-black uppercase text-xs tracking-wider"
                    style={{ backgroundColor: RED, color: PAPER }}
                  >
                    Rule 01
                  </div>
                  <span
                    className="font-black uppercase tracking-wider text-sm"
                    style={{ color: BLACK }}
                  >
                    Block Invasion
                  </span>
                </div>
                <p
                  className="font-black uppercase text-xs tracking-wider leading-relaxed mb-6"
                  style={{ color: BLACK, opacity: 0.6 }}
                >
                  On hover, a color block sweeps from left to right — absolute inset-0, -translate-x-full to translate-x-0, duration-100 ease-linear. Text stays on top via z-10.
                </p>

                <div className="space-y-4">
                  {[
                    { label: "RED INVASION", bg: RED, invader: BLACK, text: PAPER },
                    { label: "BLACK INVASION", bg: BLACK, invader: RED, text: PAPER },
                    { label: "PAPER INVASION", bg: PAPER, invader: RED, text: BLACK },
                  ].map((btn, i) => (
                    <button
                      key={btn.label}
                      className="relative w-full py-3 overflow-hidden font-black uppercase tracking-[0.2em] text-sm transition-all duration-75 ease-linear"
                      style={{
                        backgroundColor: btn.bg,
                        color: btn.text,
                        border: `4px solid ${BLACK}`,
                        boxShadow: invasionTarget === i ? `2px 2px 0 ${BLACK}` : `6px 6px 0 ${BLACK}`,
                        transform: invasionTarget === i ? "translate(4px, 4px)" : "",
                      }}
                      onMouseEnter={() => setInvasionTarget(i)}
                      onMouseLeave={() => setInvasionTarget(null)}
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-100 ease-linear"
                        style={{
                          backgroundColor: btn.invader,
                          transform: invasionTarget === i ? "translateX(0)" : "translateX(-100%)",
                        }}
                      />
                      <span className="relative z-10">{btn.label}</span>
                    </button>
                  ))}
                </div>

                <p
                  className="mt-5 font-black uppercase text-[10px] tracking-widest"
                  style={{ color: RED }}
                >
                  {invasionTarget !== null
                    ? `Block ${["red", "black", "paper"][invasionTarget]} is invading — duration-100 ease-linear`
                    : "Hover any button to trigger the invasion"}
                </p>
              </div>
            </RevealBlock>

            {/* ---- Rule 2: Diagonal Aggression ---- */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 h-full"
                style={{
                  border: `4px solid ${RED}`,
                  backgroundColor: PAPER,
                  boxShadow: `6px 6px 0 ${RED}`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="px-3 py-1 font-black uppercase text-xs tracking-wider"
                    style={{ backgroundColor: RED, color: PAPER }}
                  >
                    Rule 02
                  </div>
                  <span
                    className="font-black uppercase tracking-wider text-sm"
                    style={{ color: BLACK }}
                  >
                    Diagonal Aggression
                  </span>
                </div>
                <p
                  className="font-black uppercase text-xs tracking-wider leading-relaxed mb-6"
                  style={{ color: BLACK, opacity: 0.6 }}
                >
                  On hover, elements shift diagonally — X and Y move simultaneously (translate-x-[4px] translate-y-[4px]). Shadow shrinks from 6px to 2px, simulating a woodblock pressing down.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "POSTER A", label: "1920" },
                    { title: "POSTER B", label: "1925" },
                    { title: "POSTER C", label: "1928" },
                    { title: "POSTER D", label: "1932" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-4 cursor-pointer transition-all duration-75 ease-linear"
                      style={{
                        border: `3px solid ${BLACK}`,
                        backgroundColor: PAPER,
                        boxShadow: `5px 5px 0 ${BLACK}`,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.boxShadow = `2px 2px 0 ${BLACK}`;
                        el.style.transform = "translate(4px, 4px)";
                        el.style.backgroundColor = RED;
                        const title = el.querySelector(".item-title") as HTMLElement;
                        const lab = el.querySelector(".item-label") as HTMLElement;
                        if (title) title.style.color = PAPER;
                        if (lab) { lab.style.backgroundColor = PAPER; lab.style.color = RED; }
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.boxShadow = `5px 5px 0 ${BLACK}`;
                        el.style.transform = "";
                        el.style.backgroundColor = PAPER;
                        const title = el.querySelector(".item-title") as HTMLElement;
                        const lab = el.querySelector(".item-label") as HTMLElement;
                        if (title) title.style.color = BLACK;
                        if (lab) { lab.style.backgroundColor = RED; lab.style.color = PAPER; }
                      }}
                    >
                      <div
                        className="item-title font-black uppercase text-sm tracking-wider mb-2"
                        style={{ color: BLACK }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="item-label inline-block px-2 py-0.5 font-black uppercase text-[10px] tracking-wider"
                        style={{ backgroundColor: RED, color: PAPER }}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-5 cursor-pointer transition-all duration-75 ease-linear px-4 py-2 font-black uppercase text-xs tracking-wider"
                  style={{
                    border: `3px solid ${BLACK}`,
                    backgroundColor: aggressionHovered ? RED : PAPER,
                    color: aggressionHovered ? PAPER : BLACK,
                    boxShadow: aggressionHovered ? `2px 2px 0 ${BLACK}` : `4px 4px 0 ${BLACK}`,
                    transform: aggressionHovered ? "translate(4px, 4px)" : "",
                  }}
                  onMouseEnter={() => setAggressionHovered(true)}
                  onMouseLeave={() => setAggressionHovered(false)}
                >
                  {aggressionHovered ? "PRESSING DOWN — shadow shrinks" : "Hover to see diagonal shift"}
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 3: Soviet Reversal ---- */}
            <RevealBlock delay={0.15}>
              <div
                className="p-8 h-full"
                style={{
                  border: `4px solid ${RED}`,
                  backgroundColor: PAPER,
                  boxShadow: `6px 6px 0 ${RED}`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="px-3 py-1 font-black uppercase text-xs tracking-wider"
                    style={{ backgroundColor: RED, color: PAPER }}
                  >
                    Rule 03
                  </div>
                  <span
                    className="font-black uppercase tracking-wider text-sm"
                    style={{ color: BLACK }}
                  >
                    Soviet Reversal
                  </span>
                </div>
                <p
                  className="font-black uppercase text-xs tracking-wider leading-relaxed mb-6"
                  style={{ color: BLACK, opacity: 0.6 }}
                >
                  On active (click/press), colors flip completely — red becomes black, black becomes red. Shadow collapses to zero. The stamp presses down; everything inverts.
                </p>

                <div className="space-y-5">
                  <button
                    className="w-full py-5 font-black uppercase tracking-[0.3em] text-lg transition-all duration-75 ease-linear"
                    style={{
                      backgroundColor: reversalHeld ? BLACK : RED,
                      color: reversalHeld ? RED : PAPER,
                      border: `4px solid ${BLACK}`,
                      boxShadow: reversalHeld ? "none" : `6px 6px 0 ${BLACK}`,
                      transform: reversalHeld ? "translate(6px, 6px)" : "",
                    }}
                    onMouseDown={() => setReversalHeld(true)}
                    onMouseUp={() => setReversalHeld(false)}
                    onMouseLeave={() => setReversalHeld(false)}
                    onTouchStart={() => setReversalHeld(true)}
                    onTouchEnd={() => setReversalHeld(false)}
                  >
                    {reversalHeld ? "COLORS INVERTED" : "CLICK AND HOLD"}
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p
                        className="font-black uppercase text-[10px] tracking-wider mb-2"
                        style={{ color: BLACK, opacity: 0.5 }}
                      >
                        Rest state
                      </p>
                      <div
                        className="py-3 text-center font-black uppercase text-xs tracking-wider"
                        style={{
                          backgroundColor: RED,
                          color: PAPER,
                          border: `3px solid ${BLACK}`,
                          boxShadow: `4px 4px 0 ${BLACK}`,
                        }}
                      >
                        bg-red / text-paper
                      </div>
                    </div>
                    <div>
                      <p
                        className="font-black uppercase text-[10px] tracking-wider mb-2"
                        style={{ color: RED }}
                      >
                        Active state
                      </p>
                      <div
                        className="py-3 text-center font-black uppercase text-xs tracking-wider"
                        style={{
                          backgroundColor: BLACK,
                          color: RED,
                          border: `3px solid ${BLACK}`,
                          boxShadow: "none",
                          transform: "translate(4px, 4px)",
                        }}
                      >
                        bg-black / text-red
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full py-4 font-black uppercase tracking-[0.2em] text-sm transition-all duration-75 ease-linear"
                    style={{
                      backgroundColor: reversalActive ? RED : BLACK,
                      color: reversalActive ? BLACK : PAPER,
                      border: `4px solid ${BLACK}`,
                      boxShadow: reversalActive ? "none" : `4px 4px 0 ${RED}`,
                      transform: reversalActive ? "translate(4px, 4px)" : "",
                    }}
                    onClick={() => setReversalActive((p) => !p)}
                  >
                    {reversalActive ? "REVERSED — CLICK TO RESTORE" : "TOGGLE SOVIET REVERSAL"}
                  </button>
                </div>

                <p
                  className="mt-5 font-black uppercase text-[10px] tracking-widest"
                  style={{ color: reversalHeld || reversalActive ? RED : BLACK, opacity: reversalHeld || reversalActive ? 1 : 0.5 }}
                >
                  {reversalHeld || reversalActive ? "Inversion active — shadow:none, colors swapped" : "Press and hold the button above"}
                </p>
              </div>
            </RevealBlock>

            {/* ---- Rule 4: Line Snap ---- */}
            <RevealBlock delay={0.2}>
              <div
                className="p-8 h-full"
                style={{
                  border: `4px solid ${RED}`,
                  backgroundColor: PAPER,
                  boxShadow: `6px 6px 0 ${RED}`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="px-3 py-1 font-black uppercase text-xs tracking-wider"
                    style={{ backgroundColor: RED, color: PAPER }}
                  >
                    Rule 04
                  </div>
                  <span
                    className="font-black uppercase tracking-wider text-sm"
                    style={{ color: BLACK }}
                  >
                    Line Snap
                  </span>
                </div>
                <p
                  className="font-black uppercase text-xs tracking-wider leading-relaxed mb-6"
                  style={{ color: BLACK, opacity: 0.6 }}
                >
                  Inside cards, the diagonal accent line sits at -rotate-2. On hover, it snaps to rotate-0 — a mechanical correction, like revolution imposing geometric order.
                </p>

                <div className="space-y-4">
                  {[
                    { title: "MANIFESTO I", body: "Hover to snap the diagonal line to horizontal." },
                    { title: "MANIFESTO II", body: "The tilted line represents organic chaos — hover corrects it." },
                    { title: "MANIFESTO III", body: "Revolution straightens what was crooked. Geometric order." },
                  ].map((item, i) => (
                    <div
                      key={item.title}
                      className="cursor-pointer transition-all duration-75 ease-linear overflow-hidden"
                      style={{
                        border: `3px solid ${BLACK}`,
                        backgroundColor: snapCards[i] ? RED : PAPER,
                        boxShadow: snapCards[i] ? `2px 2px 0 ${BLACK}` : `4px 4px 0 ${BLACK}`,
                        transform: snapCards[i] ? "translate(2px, 2px)" : "",
                      }}
                      onMouseEnter={() => toggleSnapCard(i)}
                      onMouseLeave={() => toggleSnapCard(i)}
                    >
                      <div className="p-4">
                        <div
                          className="font-black uppercase tracking-wider text-sm mb-2 transition-colors duration-75 ease-linear"
                          style={{ color: snapCards[i] ? PAPER : BLACK }}
                        >
                          {item.title}
                        </div>
                        <div
                          className="w-full h-1 mb-3 transition-transform duration-75 ease-linear"
                          style={{
                            backgroundColor: snapCards[i] ? PAPER : BLACK,
                            transform: snapCards[i] ? "rotate(0deg)" : "rotate(-2deg)",
                          }}
                        />
                        <p
                          className="font-black uppercase text-xs tracking-wider leading-relaxed"
                          style={{ color: snapCards[i] ? PAPER : BLACK, opacity: 0.75 }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p
                  className="mt-5 font-black uppercase text-[10px] tracking-widest"
                  style={{ color: RED }}
                >
                  {snapCards.some(Boolean)
                    ? "Line snapped to rotate-0 — geometric order restored"
                    : "Hover each card to snap the diagonal line"}
                </p>
              </div>
            </RevealBlock>
          </div>

          {/* Mechanical timing reference */}
          <RevealBlock delay={0.3} className="mt-8">
            <div
              className="p-8"
              style={{
                border: `4px solid ${PAPER}`,
                backgroundColor: PAPER,
                boxShadow: `6px 6px 0 ${RED}`,
              }}
            >
              <div
                className="font-black uppercase tracking-[0.3em] text-xs mb-6"
                style={{ color: BLACK }}
              >
                Mechanical Easing Doctrine
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className="p-5"
                  style={{ border: `3px solid ${BLACK}`, backgroundColor: RED }}
                >
                  <div className="font-black uppercase text-2xl mb-1" style={{ color: PAPER }}>75ms</div>
                  <div className="font-black uppercase text-xs tracking-wider" style={{ color: PAPER, opacity: 0.8 }}>Standard interactions</div>
                  <div className="mt-3 font-mono text-[10px]" style={{ color: PAPER, opacity: 0.7 }}>duration-75 ease-linear</div>
                </div>
                <div
                  className="p-5"
                  style={{ border: `3px solid ${BLACK}`, backgroundColor: BLACK }}
                >
                  <div className="font-black uppercase text-2xl mb-1" style={{ color: RED }}>100ms</div>
                  <div className="font-black uppercase text-xs tracking-wider" style={{ color: PAPER, opacity: 0.8 }}>Block invasion sweep</div>
                  <div className="mt-3 font-mono text-[10px]" style={{ color: PAPER, opacity: 0.7 }}>duration-100 ease-linear</div>
                </div>
                <div
                  className="p-5"
                  style={{ border: `3px solid ${BLACK}`, backgroundColor: PAPER }}
                >
                  <div className="font-black uppercase text-2xl mb-1 line-through opacity-40" style={{ color: RED }}>300ms+</div>
                  <div className="font-black uppercase text-xs tracking-wider" style={{ color: BLACK, opacity: 0.5 }}>Forbidden — too fluid</div>
                  <div className="mt-3 font-mono text-[10px]" style={{ color: BLACK, opacity: 0.4 }}>ease-in-out BANNED</div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. DO / DON'T RULES                                             */}
      {/* ================================================================ */}
      <section
        className="py-24 px-5 md:px-10"
        style={{ backgroundColor: PAPER }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1" style={{ backgroundColor: BLACK }} />
              <span
                className="font-black uppercase tracking-[0.3em] text-xs"
                style={{ color: BLACK }}
              >
                Design Doctrine
              </span>
            </div>
            <h2
              className="font-black uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: BLACK }}
            >
              LAWS &amp;
              <br />
              <span style={{ color: RED }}>PROHIBITIONS</span>
            </h2>
            <p
              className="mt-6 font-black uppercase text-xs tracking-widest max-w-xl"
              style={{ color: BLACK, opacity: 0.55, lineHeight: "1.9" }}
            >
              Constructivism is disciplined. Every decision is a political act. These rules are non-negotiable mandates from the collective.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO */}
            <RevealBlock delay={0.08}>
              <div
                className="p-8 h-full"
                style={{
                  border: `4px solid ${BLACK}`,
                  backgroundColor: PAPER,
                  boxShadow: `6px 6px 0 ${BLACK}`,
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: BLACK, color: PAPER }}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="3.5">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="font-black uppercase tracking-[0.2em] text-xl"
                    style={{ color: BLACK }}
                  >
                    MANDATES
                  </h3>
                </div>
                <ul className="space-y-4">
                  {doItems.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 w-3 h-3 shrink-0"
                        style={{ backgroundColor: BLACK }}
                      />
                      <span
                        className="font-black uppercase text-xs tracking-wider leading-relaxed"
                        style={{ color: BLACK }}
                      >
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-8 p-5"
                  style={{
                    border: `3px solid ${BLACK}`,
                    backgroundColor: BLACK,
                    transform: "rotate(-1deg)",
                  }}
                >
                  <div
                    className="font-black uppercase text-3xl leading-none"
                    style={{ color: RED }}
                  >
                    CORRECT
                  </div>
                  <div
                    className="font-black uppercase text-xs tracking-[0.3em] mt-2"
                    style={{ color: PAPER, opacity: 0.7 }}
                  >
                    Zero curves. Hard edges. Maximum weight.
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.14}>
              <div
                className="p-8 h-full"
                style={{
                  border: `4px solid ${RED}`,
                  backgroundColor: PAPER,
                  boxShadow: `6px 6px 0 ${RED}`,
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{ backgroundColor: RED, color: PAPER }}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="3.5">
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3
                    className="font-black uppercase tracking-[0.2em] text-xl"
                    style={{ color: RED }}
                  >
                    PROHIBITIONS
                  </h3>
                </div>
                <ul className="space-y-4">
                  {dontItems.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 w-3 h-3 shrink-0"
                        style={{ backgroundColor: RED }}
                      />
                      <span
                        className="font-black uppercase text-xs tracking-wider leading-relaxed line-through"
                        style={{ color: BLACK, opacity: 0.65 }}
                      >
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-8 p-5 relative overflow-hidden"
                  style={{
                    border: `3px solid ${RED}`,
                    backgroundColor: PAPER,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 cstv-stripes"
                    style={{ opacity: 0.4 }}
                  />
                  <div
                    className="font-black uppercase text-xs tracking-[0.2em] line-through"
                    style={{ color: RED }}
                  >
                    rounded-xl shadow-md bg-gradient-to-r font-light ease-in-out
                  </div>
                  <div
                    className="font-black uppercase text-xs tracking-widest mt-2"
                    style={{ color: BLACK, opacity: 0.5 }}
                  >
                    ALL OF THESE ARE PROHIBITED
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* 3 Principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                icon: "▲",
                title: "DIAGONAL COMPOSITION",
                tagline: "Everything tilts toward revolution",
                body: "Diagonal lines create tension and urgency. Skewed blocks, rotated headlines, tilted accent lines — the world is in motion, not at rest.",
                bg: BLACK,
                titleColor: RED,
                taglineColor: PAPER,
                bodyColor: PAPER,
              },
              {
                icon: "■",
                title: "GEOMETRIC PURITY",
                tagline: "Only hard forms speak truth",
                body: "Squares, rectangles, triangles. No curves permitted. Geometry embodies the precision of the machine and the clarity of collective purpose.",
                bg: RED,
                titleColor: PAPER,
                taglineColor: GOLD,
                bodyColor: PAPER,
              },
              {
                icon: "●",
                title: "TYPOGRAPHIC FORCE",
                tagline: "Letters as visual weapons",
                body: "Font-black, uppercase, extreme tracking. Giant headlines contrast with tiny body text. Every glyph is a hammer strike, not a whisper.",
                bg: PAPER,
                titleColor: BLACK,
                taglineColor: RED,
                bodyColor: BLACK,
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.1}>
                <div
                  className="p-8 h-full transition-all duration-75 ease-linear cursor-default"
                  style={{
                    backgroundColor: principle.bg,
                    border: `4px solid ${BLACK}`,
                    boxShadow: `6px 6px 0 ${RED}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${RED}`;
                    (e.currentTarget as HTMLElement).style.transform = "translate(4px, 4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `6px 6px 0 ${RED}`;
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                >
                  <div
                    className="text-4xl font-black mb-4"
                    style={{ color: principle.titleColor }}
                  >
                    {principle.icon}
                  </div>
                  <h3
                    className="font-black uppercase tracking-wider text-lg mb-1"
                    style={{ color: principle.titleColor }}
                  >
                    {principle.title}
                  </h3>
                  <p
                    className="font-black uppercase text-xs tracking-wider mb-4"
                    style={{ color: principle.taglineColor }}
                  >
                    {principle.tagline}
                  </p>
                  <div
                    className="w-full h-1 mb-4 -rotate-1"
                    style={{ backgroundColor: principle.titleColor, opacity: 0.4 }}
                  />
                  <p
                    className="font-black uppercase text-xs tracking-wider leading-relaxed"
                    style={{ color: principle.bodyColor, opacity: 0.8 }}
                  >
                    {principle.body}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. PHILOSOPHY                                                    */}
      {/* ================================================================ */}
      <section
        className="py-24 px-5 md:px-10"
        style={{ backgroundColor: RED }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-1" style={{ backgroundColor: PAPER }} />
              <span
                className="font-black uppercase tracking-[0.3em] text-xs"
                style={{ color: PAPER, opacity: 0.8 }}
              >
                Philosophy
              </span>
            </div>
            <h2
              className="font-black uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: PAPER }}
            >
              ART FOR
              <br />
              <span style={{ color: BLACK }}>THE MASSES</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
            <RevealBlock delay={0.05}>
              <div
                className="p-8 h-full"
                style={{
                  border: `4px solid ${BLACK}`,
                  backgroundColor: BLACK,
                  boxShadow: `8px 8px 0 ${PAPER}`,
                }}
              >
                <div
                  className="font-black text-6xl leading-none mb-6 -rotate-2 inline-block"
                  style={{ color: RED }}
                >
                  &ldquo;
                </div>
                <p
                  className="font-black uppercase text-lg tracking-wider leading-relaxed"
                  style={{ color: PAPER }}
                >
                  Constructivism maintains that design is a weapon of progress and collective transformation.
                </p>
                <div
                  className="mt-6 w-full h-1 -rotate-1"
                  style={{ backgroundColor: RED }}
                />
                <p
                  className="mt-4 font-black uppercase text-xs tracking-[0.3em]"
                  style={{ color: GOLD }}
                >
                  — Rodchenko, 1921
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <div className="space-y-6">
                {[
                  {
                    year: "1910s",
                    text: "Russian avant-garde artists reject pure aestheticism. Art must function. The canvas becomes a poster, the poster becomes a tool.",
                  },
                  {
                    year: "1920s",
                    text: "Peak Constructivism. El Lissitzky, Rodchenko, Popova define the vocabulary: diagonals, geometric blocks, red-black-paper.",
                  },
                  {
                    year: "Today",
                    text: "The style reaches web design. Hard edges, hard shadows, mechanical transitions — a century later, still the most urgent visual language.",
                  },
                ].map((item) => (
                  <div
                    key={item.year}
                    className="flex gap-5"
                    style={{ borderLeft: `4px solid ${PAPER}`, paddingLeft: "1.25rem" }}
                  >
                    <div className="shrink-0">
                      <div
                        className="font-black uppercase text-sm tracking-wider"
                        style={{ color: PAPER }}
                      >
                        {item.year}
                      </div>
                    </div>
                    <div
                      className="font-black uppercase text-xs tracking-wider leading-relaxed"
                      style={{ color: PAPER, opacity: 0.75 }}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>

          {/* Feature highlights — 6 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: "◆",
                title: "Zero Curves",
                desc: "Every border-radius is zero. The square rules. The rectangle serves. Organic forms are counter-revolutionary.",
              },
              {
                icon: "▮",
                title: "Hard Shadows",
                desc: "shadow-[4px_4px_0_#1a1a1a] mimics the woodblock press. No blur. No diffusion. Hard-edged like a stamp.",
              },
              {
                icon: "↗",
                title: "Diagonal Force",
                desc: "Skewed slabs, rotated headlines, tilted lines. Static horizontals denote stagnation — diagonals mean progress.",
              },
              {
                icon: "█",
                title: "Three Colors",
                desc: "Soviet red, pure black, aged paper. Every additional color dilutes the revolutionary message. Discipline is power.",
              },
              {
                icon: "▬",
                title: "Weight Contrast",
                desc: "font-black for headlines. Extreme size contrast between title and body. Typography as architecture, not decoration.",
              },
              {
                icon: "⚙",
                title: "Mechanical Time",
                desc: "duration-75 ease-linear. The machine does not ease-in-out. It starts and stops with the precision of industrial rhythm.",
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.06}>
                <div
                  className="p-6 h-full transition-all duration-75 ease-linear cursor-default"
                  style={{
                    border: `3px solid ${PAPER}`,
                    backgroundColor: "transparent",
                    boxShadow: `4px 4px 0 ${BLACK}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = BLACK;
                    (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${BLACK}`;
                    (e.currentTarget as HTMLElement).style.transform = "translate(2px, 2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${BLACK}`;
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                >
                  <div className="font-black text-3xl mb-3" style={{ color: PAPER }}>{feature.icon}</div>
                  <h4 className="font-black uppercase tracking-wider text-sm mb-2" style={{ color: PAPER }}>{feature.title}</h4>
                  <p className="font-black uppercase text-xs tracking-wider leading-relaxed" style={{ color: PAPER, opacity: 0.65 }}>{feature.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer
        className="relative overflow-hidden"
        style={{ backgroundColor: BLACK, borderTop: `4px solid ${RED}` }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1 cstv-stripes"
          style={{ opacity: 0.3 }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rotate-45 translate-x-32 translate-y-32"
          style={{ backgroundColor: RED, opacity: 0.15 }}
        />

        <div className="max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-12 relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-14">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center font-black text-lg"
                  style={{ backgroundColor: RED, color: PAPER }}
                >
                  C
                </div>
                <span
                  className="font-black uppercase tracking-[0.2em] text-lg"
                  style={{ color: PAPER }}
                >
                  Constructivism
                </span>
              </div>
              <div className="w-full h-1 mb-4 -rotate-1" style={{ backgroundColor: RED }} />
              <p
                className="font-black uppercase text-xs tracking-wider leading-relaxed"
                style={{ color: PAPER, opacity: 0.5 }}
              >
                Soviet avant-garde design for the modern web. Hard edges, maximum contrast, mechanical interactions.
              </p>
              <div className="flex gap-2 mt-5">
                {[RED, BLACK, PAPER, GOLD, BROWN].map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 transition-all duration-75 ease-linear"
                    style={{
                      backgroundColor: color,
                      border: color === BLACK ? `2px solid ${RED}` : `2px solid ${BLACK}`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              <div className="flex flex-col gap-3">
                <span className="font-black uppercase tracking-[0.2em] text-xs mb-2" style={{ color: RED }}>
                  Style
                </span>
                {[
                  { label: "Documentation", href: "/styles/constructivism" },
                  { label: "Showcase", href: "/styles/constructivism/showcase" },
                  { label: "Cover", href: "/styles/constructivism/cover" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-black uppercase text-xs tracking-wider transition-colors duration-75 ease-linear"
                    style={{ color: PAPER, opacity: 0.55 }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = RED;
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = PAPER;
                      (e.currentTarget as HTMLElement).style.opacity = "0.55";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-black uppercase tracking-[0.2em] text-xs mb-2" style={{ color: RED }}>
                  StyleKit
                </span>
                {[
                  { label: "Home", href: "/" },
                  { label: "All Styles", href: "/styles" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-black uppercase text-xs tracking-wider transition-colors duration-75 ease-linear"
                    style={{ color: PAPER, opacity: 0.55 }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = RED;
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = PAPER;
                      (e.currentTarget as HTMLElement).style.opacity = "0.55";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-black uppercase tracking-[0.2em] text-xs mb-2" style={{ color: RED }}>
                  Palette
                </span>
                {paletteSwatches.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-2 font-black uppercase text-xs tracking-wider"
                    style={{ color: PAPER, opacity: 0.5 }}
                  >
                    <span
                      className="w-3 h-3 inline-block shrink-0"
                      style={{
                        backgroundColor: s.hex,
                        border: s.hex === PAPER ? `1px solid ${RED}` : "none",
                      }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full h-px mb-8" style={{ backgroundColor: RED, opacity: 0.4 }} />

          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div
              className="font-black uppercase text-xs tracking-widest"
              style={{ color: PAPER, opacity: 0.4 }}
            >
              Constructivism — StyleKit — Art Serves The Collective
            </div>
            <Link
              href="/"
              className="group relative flex items-center gap-2 px-6 py-3 overflow-hidden font-black uppercase text-xs tracking-[0.2em] transition-all duration-75 ease-linear hover:translate-x-[3px] hover:translate-y-[3px]"
              style={{
                color: PAPER,
                border: `3px solid ${RED}`,
                boxShadow: `4px 4px 0 ${RED}`,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `1px 1px 0 ${RED}`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${RED}`; }}
            >
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-100 ease-linear"
                style={{ backgroundColor: RED }}
              />
              <span className="relative z-10">← Back to StyleKit</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
