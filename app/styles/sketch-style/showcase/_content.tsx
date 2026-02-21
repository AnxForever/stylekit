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
/*  Inline SVG doodle components                                       */
/* ------------------------------------------------------------------ */

function AsteriskDoodle({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}

function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12 Q10 10 18 12 Q26 14 34 11" />
      <path d="M30 6 L38 11 L30 17" />
    </svg>
  );
}

function WaveDoodle({ className = "", width = 80 }: { className?: string; width?: number }) {
  const h = width;
  return (
    <svg
      className={className}
      width={width}
      height="12"
      viewBox={`0 0 ${h} 12`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path
        d={`M0 6 Q${h * 0.125} 2 ${h * 0.25} 6 Q${h * 0.375} 10 ${h * 0.5} 6 Q${h * 0.625} 2 ${h * 0.75} 6 Q${h * 0.875} 10 ${h} 6`}
      />
    </svg>
  );
}

function ScribbleCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="60"
      height="40"
      viewBox="0 0 60 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M30 4 C42 2 56 10 57 20 C58 30 48 38 30 37 C12 36 2 28 3 18 C4 8 18 6 30 4 Z" />
    </svg>
  );
}

function CrossHatchDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.35"
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="12" y2="0" />
      <line x1="0" y1="24" x2="24" y2="0" />
      <line x1="0" y1="36" x2="36" y2="0" />
      <line x1="0" y1="48" x2="48" y2="0" />
      <line x1="12" y1="48" x2="48" y2="12" />
      <line x1="24" y1="48" x2="48" y2="24" />
      <line x1="36" y1="48" x2="48" y2="36" />
    </svg>
  );
}

function PencilDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="80"
      viewBox="0 0 32 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="10" y="4" width="12" height="56" rx="1" />
      <path d="M10 60 L16 76 L22 60 Z" />
      <line x1="10" y1="12" x2="22" y2="12" />
      <line x1="10" y1="16" x2="22" y2="16" />
      <rect x="10" y="4" width="12" height="8" rx="1" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function StarDoodle({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 1 L12 7 L18 7 L13.5 11 L15.5 17 L10 13.5 L4.5 17 L6.5 11 L2 7 L8 7 Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ComponentTab = "buttons" | "cards" | "links" | "forms";
type CanvasTab = "sketchbook" | "anatomy" | "palette";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [canvasTab, setCanvasTab] = useState<CanvasTab>("sketchbook");
  const [pencilShadeHovered, setPencilShadeHovered] = useState(false);
  const [strokeJitterHovered, setStrokeJitterHovered] = useState(false);
  const [scribbleHovered, setScribbleHovered] = useState(false);
  const [paperPressActive, setPaperPressActive] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([true, false, true, false, false, false, false]);
  const [drawingLines, setDrawingLines] = useState<number[]>([30, 55, 42, 70, 20, 60, 35]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function toggleCheck(i: number) {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  function randomizeDoodle() {
    setDrawingLines([...Array(7)].map(() => Math.floor(Math.random() * 65) + 15));
  }

  const paperTextureBg = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232c2c2c' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")",
  };

  return (
    <div
      className="min-h-screen text-[#2c2c2c] overflow-x-hidden"
      style={{ backgroundColor: "#f5f0e8", ...paperTextureBg }}
    >
      <style>{`
        @keyframes sketch-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-6px) rotate(0.5deg); }
        }
        @keyframes sketch-wobble {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        .sketch-float-anim {
          animation: sketch-float 5s ease-in-out infinite;
        }
        .sketch-wobble-anim {
          animation: sketch-wobble 3s ease-in-out infinite;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED STICKY NAV                                              */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b-2 border-dashed border-[#2c2c2c]"
        style={{ backgroundColor: "#f5f0e8", ...paperTextureBg }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif italic text-[#2c2c2c] hover:text-[#e74c3c] transition-colors duration-150"
          >
            <span className="text-lg">&#8592;</span>
            <span className="text-sm font-bold tracking-wide">StyleKit</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <AsteriskDoodle className="text-[#2c2c2c] opacity-40" size={14} />
            <span className="font-serif italic text-sm text-[#2c2c2c] opacity-60 tracking-wider">
              Sketch Style / &#37626;&#31455;&#25163;&#32472;&#39118;
            </span>
            <AsteriskDoodle className="text-[#2c2c2c] opacity-40" size={14} />
          </div>

          <Link
            href="/styles"
            className="
              px-4 py-1.5
              font-serif italic text-sm text-[#2c2c2c]
              border-2 border-dashed border-[#2c2c2c]
              rounded-sm
              shadow-[3px_3px_0_rgba(44,44,44,0.15)]
              hover:bg-[#2c2c2c] hover:text-[#f5f0e8]
              hover:-translate-y-0.5
              active:translate-y-[2px] active:shadow-none
              transition-all duration-150
              rotate-[-0.3deg]
            "
          >
            Explore Styles
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden">
        {/* Background doodle decorations */}
        <div className="absolute top-20 right-10 text-[#2c2c2c] pointer-events-none hidden md:block opacity-20 sketch-float-anim">
          <PencilDoodle className="w-8 h-20" />
        </div>
        <div className="absolute top-32 left-8 text-[#2c2c2c] pointer-events-none hidden md:block opacity-15">
          <AsteriskDoodle size={32} className="sketch-wobble-anim" />
        </div>
        <div className="absolute bottom-20 right-1/4 text-[#2c2c2c] pointer-events-none hidden md:block opacity-20 sketch-float-anim">
          <StarDoodle size={28} />
        </div>
        <div className="absolute bottom-16 left-16 text-[#2c2c2c] pointer-events-none hidden md:block opacity-15">
          <CrossHatchDoodle />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <WaveDoodle className="text-[#2c2c2c] opacity-50" width={48} />
              <span className="font-serif italic text-sm text-[#2c2c2c] opacity-60 tracking-[0.2em] uppercase">
                &#37626;&#31455;&#25163;&#32472;&#39118; &mdash; Sketch Style
              </span>
              <WaveDoodle className="text-[#2c2c2c] opacity-50" width={48} />
            </div>
          </div>

          {/* Main heading */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <h1
              className="text-5xl md:text-7xl font-serif italic font-bold text-[#2c2c2c] leading-tight mb-2"
              style={{ transform: "rotate(-1.2deg)" }}
            >
              Every line
            </h1>
            <h1
              className="text-5xl md:text-7xl font-serif italic font-bold text-[#2c2c2c] leading-tight mb-8"
              style={{ transform: "rotate(0.4deg)" }}
            >
              tells a{" "}
              <span className="relative inline-block">
                story
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  height="8"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="#e74c3c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M0 4 Q25 1 50 4 Q75 7 100 4" />
                </svg>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="text-lg font-serif text-[#555] mb-4 max-w-xl mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "rotate(0.3deg) translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Pencil-drawn borders, paper textures, hand-written feel.
            Imperfect lines that carry warmth and intention.
          </p>

          {/* Wave under subtitle */}
          <div
            className="flex justify-center mb-10"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <WaveDoodle className="text-[#2c2c2c] opacity-30" width={120} />
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <button
              className="
                px-8 py-3
                bg-[#2c2c2c] text-[#f5f0e8]
                font-serif italic font-bold text-lg
                border-2 border-[#2c2c2c]
                rounded-sm
                shadow-[5px_5px_0_rgba(44,44,44,0.2)]
                hover:bg-transparent hover:text-[#2c2c2c]
                hover:-translate-y-0.5
                active:translate-y-[4px] active:translate-x-[4px] active:shadow-none active:rotate-[-1deg]
                transition-all duration-150
                rotate-[-0.5deg]
              "
            >
              Open Sketchbook
            </button>
            <button
              className="
                px-8 py-3
                bg-transparent text-[#2c2c2c]
                font-serif italic text-lg
                border-2 border-dashed border-[#2c2c2c]
                rounded-sm
                shadow-[4px_4px_0_rgba(44,44,44,0.12)]
                hover:bg-[#2c2c2c] hover:text-[#f5f0e8]
                hover:rotate-1
                active:translate-y-[3px] active:shadow-none
                transition-all duration-150
                rotate-[0.3deg]
              "
            >
              View the Rules
            </button>
          </div>

          {/* Hand-drawn info box */}
          <div
            className="max-w-2xl mx-auto border-2 border-[#2c2c2c] rounded-sm p-6 relative"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "rotate(-0.5deg) translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
              boxShadow: "6px 6px 0 rgba(44,44,44,0.1)",
              backgroundColor: "#faf9f5",
            }}
          >
            <AsteriskDoodle className="absolute -top-3 -left-3 text-[#2c2c2c] bg-[#f5f0e8] p-0.5" size={16} />
            <AsteriskDoodle className="absolute -top-3 -right-3 text-[#2c2c2c] bg-[#f5f0e8] p-0.5" size={16} />
            <AsteriskDoodle className="absolute -bottom-3 -left-3 text-[#2c2c2c] bg-[#f5f0e8] p-0.5" size={16} />
            <AsteriskDoodle className="absolute -bottom-3 -right-3 text-[#2c2c2c] bg-[#f5f0e8] p-0.5" size={16} />

            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { value: "4", label: "Interaction Patterns", color: "#e74c3c" },
                { value: "7+", label: "Component Types", color: "#3498db" },
                { value: "1", label: "Design Language", color: "#27ae60" },
              ].map((stat) => (
                <div key={stat.label} className="py-2">
                  <div className="text-3xl font-serif italic font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-serif text-[#666] mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. LIVE CANVAS DEMO — Sketchbook with tabs                       */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <WaveDoodle className="text-[#2c2c2c] opacity-40" width={40} />
              <span className="font-serif italic text-xs text-[#2c2c2c] opacity-50 tracking-[0.2em] uppercase">
                Live Demo
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-serif italic font-bold text-[#2c2c2c] leading-tight"
              style={{ transform: "rotate(-0.5deg)" }}
            >
              The Sketchbook
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p className="font-serif text-[#555] text-lg max-w-lg leading-relaxed" style={{ transform: "rotate(0.2deg)" }}>
              An interactive sketchbook showing the style in context.
              Click on items, shuffle doodles, explore the anatomy.
            </p>
          </RevealBlock>

          {/* Canvas tabs */}
          <RevealBlock delay={0.1} className="mb-0">
            <div className="flex gap-1 border-b-2 border-dashed border-[#2c2c2c]">
              {(["sketchbook", "anatomy", "palette"] as CanvasTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCanvasTab(tab)}
                  className={`
                    px-5 py-2 font-serif italic text-sm capitalize
                    border-2 border-b-0 rounded-t-sm
                    transition-all duration-150
                    ${canvasTab === tab
                      ? "bg-[#2c2c2c] text-[#f5f0e8] border-[#2c2c2c] -translate-y-0.5"
                      : "bg-transparent text-[#2c2c2c] border-dashed border-[#2c2c2c] hover:bg-[#2c2c2c]/10"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div
              className="border-2 border-t-0 border-[#2c2c2c] rounded-b-sm p-8 md:p-12 relative"
              style={{
                backgroundColor: "#faf9f5",
                ...paperTextureBg,
                boxShadow: "8px 8px 0 rgba(44,44,44,0.08)",
              }}
            >
              {/* Corner fold */}
              <div
                className="absolute top-0 right-0 w-10 h-10 pointer-events-none"
                style={{
                  background: "linear-gradient(225deg, #f5f0e8 50%, transparent 50%)",
                  borderBottom: "1px solid rgba(44,44,44,0.15)",
                  borderLeft: "1px solid rgba(44,44,44,0.15)",
                }}
              />

              {/* SKETCHBOOK TAB */}
              {canvasTab === "sketchbook" && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3
                      className="text-2xl font-serif italic font-bold text-[#2c2c2c]"
                      style={{ transform: "rotate(-0.8deg)" }}
                    >
                      Daily Sketchnotes
                    </h3>
                    <button
                      onClick={randomizeDoodle}
                      className="
                        px-4 py-1.5 text-sm font-serif italic
                        border border-dashed border-[#2c2c2c]
                        rounded-sm text-[#2c2c2c]
                        hover:bg-[#2c2c2c] hover:text-[#f5f0e8]
                        transition-all duration-150
                        shadow-[2px_2px_0_rgba(44,44,44,0.1)]
                      "
                    >
                      Shuffle Doodles
                    </button>
                  </div>

                  <div className="space-y-5">
                    {[
                      { label: "Idea: Paper texture system", color: "#e74c3c" },
                      { label: "Note: Dashed borders everywhere", color: "#3498db" },
                      { label: "Todo: Cross-hatch shadow effect", color: "#27ae60" },
                      { label: "Ref: Ink sketch with rough edges", color: "#f39c12" },
                      { label: "Design: Pencil-fill hover states", color: "#2c2c2c" },
                      { label: "Question: How rough is too rough?", color: "#e74c3c" },
                      { label: "Done: Wavy underline on links", color: "#27ae60" },
                    ].map((item, i) => (
                      <div key={item.label} className="flex items-center gap-4">
                        <div
                          className="h-4 rounded-sm flex-shrink-0 transition-all duration-500"
                          style={{
                            width: `${drawingLines[i]}%`,
                            backgroundColor: item.color,
                            opacity: 0.7,
                            maxWidth: "80px",
                          }}
                        />
                        <div className="flex-1 border-b border-dashed border-[#2c2c2c]/20 relative pb-4">
                          <span
                            className="absolute -top-3 left-0 font-serif italic text-sm text-[#444]"
                            style={{ transform: `rotate(${(i % 3 - 1) * 0.4}deg)` }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleCheck(i)}
                          className="
                            w-5 h-5 border-2 border-[#2c2c2c] rounded-sm flex-shrink-0
                            flex items-center justify-center
                            hover:bg-[#2c2c2c]/10
                            transition-all duration-150
                            rotate-[-1deg]
                          "
                        >
                          {checkedItems[i] && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                              <path d="M1.5 5 L4 7.5 L8.5 2" />
                            </svg>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#2c2c2c] opacity-30">
                      <AsteriskDoodle size={16} />
                      <WaveDoodle width={60} />
                      <AsteriskDoodle size={16} />
                    </div>
                    <span className="font-serif italic text-xs text-[#999]">pg. 01 / sketchbook</span>
                  </div>
                </div>
              )}

              {/* ANATOMY TAB */}
              {canvasTab === "anatomy" && (
                <div>
                  <h3
                    className="text-2xl font-serif italic font-bold text-[#2c2c2c] mb-8"
                    style={{ transform: "rotate(-0.5deg)" }}
                  >
                    Style Anatomy
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Paper texture demo */}
                    <div className="space-y-4">
                      <h4 className="font-serif italic font-bold text-[#2c2c2c] text-lg flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#e74c3c] inline-block" />
                        Paper Texture
                      </h4>
                      <div
                        className="h-32 border-2 border-dashed border-[#2c2c2c] rounded-sm relative overflow-hidden"
                        style={{ backgroundColor: "#f5f0e8", ...paperTextureBg }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif italic text-sm text-[#999]">bg-[#f5f0e8] + SVG noise</span>
                        </div>
                        <div className="absolute top-2 left-2 opacity-10">
                          <CrossHatchDoodle />
                        </div>
                        <div className="absolute bottom-2 right-2 opacity-10">
                          <CrossHatchDoodle />
                        </div>
                      </div>
                      <p className="font-serif text-xs text-[#666] italic leading-relaxed">
                        Warm cream background (#f5f0e8) with repeating SVG diagonal pattern at 3% opacity.
                      </p>
                    </div>

                    {/* Pencil border demo */}
                    <div className="space-y-4">
                      <h4 className="font-serif italic font-bold text-[#2c2c2c] text-lg flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#3498db] inline-block" />
                        Sketch Borders
                      </h4>
                      <div className="space-y-3">
                        <div className="h-10 border-2 border-dashed border-[#2c2c2c] rounded-sm flex items-center px-3">
                          <span className="font-serif italic text-xs text-[#666]">border-2 border-dashed</span>
                        </div>
                        <div
                          className="h-10 border-2 border-[#2c2c2c] rounded-sm flex items-center px-3"
                          style={{ transform: "rotate(-0.5deg)" }}
                        >
                          <span className="font-serif italic text-xs text-[#666]">border-solid + rotate-[-0.5deg]</span>
                        </div>
                        <div
                          className="h-10 border-2 border-dotted border-[#2c2c2c] rounded-sm flex items-center px-3"
                          style={{ transform: "rotate(0.3deg)" }}
                        >
                          <span className="font-serif italic text-xs text-[#666]">border-dotted + rotate-[0.3deg]</span>
                        </div>
                      </div>
                    </div>

                    {/* Pencil shading */}
                    <div className="space-y-4">
                      <h4 className="font-serif italic font-bold text-[#2c2c2c] text-lg flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#27ae60] inline-block" />
                        Cross-hatch Shadow
                      </h4>
                      <div className="flex gap-4">
                        {[
                          { shadow: "2px 2px 0", label: "light", opacity: 0.12 },
                          { shadow: "4px 4px 0", label: "medium", opacity: 0.18 },
                          { shadow: "6px 6px 0", label: "heavy", opacity: 0.25 },
                        ].map((s) => (
                          <div
                            key={s.label}
                            className="flex-1 h-16 border-2 border-[#2c2c2c] rounded-sm flex items-center justify-center"
                            style={{ boxShadow: `${s.shadow} rgba(44,44,44,${s.opacity})` }}
                          >
                            <span className="font-serif italic text-[10px] text-[#666]">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Typography */}
                    <div className="space-y-4">
                      <h4 className="font-serif italic font-bold text-[#2c2c2c] text-lg flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#f39c12] inline-block" />
                        Sketch Typography
                      </h4>
                      <div className="space-y-2">
                        <p className="font-serif italic text-2xl text-[#2c2c2c] rotate-[-0.5deg]">Heading &mdash; serif italic</p>
                        <p className="font-serif text-base text-[#444]">Body &mdash; serif regular, warm gray</p>
                        <p className="font-serif italic text-sm text-[#2c2c2c] underline decoration-dashed underline-offset-4">
                          Link &mdash; dashed underline emphasis
                        </p>
                        <p
                          className="font-serif italic text-sm text-[#2c2c2c]"
                          style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#e74c3c", textUnderlineOffset: "5px" }}
                        >
                          Accent link &mdash; wavy red underline
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PALETTE TAB */}
              {canvasTab === "palette" && (
                <div>
                  <h3
                    className="text-2xl font-serif italic font-bold text-[#2c2c2c] mb-8"
                    style={{ transform: "rotate(-0.5deg)" }}
                  >
                    Color Palette
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <p className="font-serif italic text-xs text-[#666] mb-3 tracking-[0.15em] uppercase">
                        Primary &mdash; Pencil Gray
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {[
                          { hex: "#1a1a1a", label: "Darkest" },
                          { hex: "#2c2c2c", label: "Primary" },
                          { hex: "#444444", label: "Dark" },
                          { hex: "#666666", label: "Mid" },
                          { hex: "#999999", label: "Light" },
                        ].map((c, i) => (
                          <div key={c.hex} className="text-center" style={{ transform: `rotate(${i % 2 === 0 ? 1 : -1}deg)` }}>
                            <div
                              className="w-14 h-14 border-2 border-[#2c2c2c] rounded-sm mb-1"
                              style={{ backgroundColor: c.hex, boxShadow: "3px 3px 0 rgba(44,44,44,0.15)" }}
                            />
                            <div className="font-serif italic text-[10px] text-[#666]">{c.label}</div>
                            <div className="font-mono text-[9px] text-[#999]">{c.hex}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-serif italic text-xs text-[#666] mb-3 tracking-[0.15em] uppercase">
                        Background &mdash; Paper Tones
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {[
                          { hex: "#f5f0e8", label: "Paper" },
                          { hex: "#faf9f5", label: "Card" },
                          { hex: "#ffffff", label: "Pure (avoid)" },
                          { hex: "#ede8e0", label: "Deep paper" },
                        ].map((c) => (
                          <div key={c.hex} className="text-center">
                            <div
                              className="w-14 h-14 border-2 border-dashed border-[#2c2c2c] rounded-sm mb-1"
                              style={{ backgroundColor: c.hex, boxShadow: "3px 3px 0 rgba(44,44,44,0.1)" }}
                            />
                            <div className="font-serif italic text-[10px] text-[#666]">{c.label}</div>
                            <div className="font-mono text-[9px] text-[#999]">{c.hex}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-serif italic text-xs text-[#666] mb-3 tracking-[0.15em] uppercase">
                        Accent Colors &mdash; Low saturation
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {[
                          { hex: "#e74c3c", label: "Pencil Red" },
                          { hex: "#3498db", label: "Ink Blue" },
                          { hex: "#27ae60", label: "Leaf Green" },
                          { hex: "#f39c12", label: "Amber" },
                        ].map((c, i) => (
                          <div key={c.hex} className="text-center" style={{ transform: `rotate(${i % 2 === 0 ? 0.8 : -0.8}deg)` }}>
                            <div
                              className="w-14 h-14 border-2 border-[#2c2c2c] rounded-sm mb-1"
                              style={{ backgroundColor: c.hex, boxShadow: "3px 3px 0 rgba(44,44,44,0.15)" }}
                            />
                            <div className="font-serif italic text-[10px] text-[#2c2c2c]">{c.label}</div>
                            <div className="font-mono text-[9px] text-[#666]">{c.hex}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. STYLE ANATOMY — paper, shading, borders, type                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <AsteriskDoodle className="text-[#2c2c2c] opacity-40" size={14} />
              <span className="font-serif italic text-xs text-[#2c2c2c] opacity-50 tracking-[0.2em] uppercase">
                Style DNA
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-serif italic font-bold text-[#2c2c2c] leading-tight"
              style={{ transform: "rotate(-0.4deg)" }}
            >
              What makes it Sketch?
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="font-serif text-[#555] text-lg max-w-lg leading-relaxed" style={{ transform: "rotate(0.2deg)" }}>
              Four foundational qualities that define the pencil-sketch aesthetic.
              Each element reinforces the hand-crafted feel.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Paper Background",
                desc: "Never white. Always the warm cream #f5f0e8 with SVG diagonal noise at 3% opacity to simulate sketchbook paper grain.",
                color: "#e74c3c",
                border: "border-2 border-dashed border-[#2c2c2c]",
                rotate: "-1deg",
              },
              {
                num: "02",
                title: "Pencil Borders",
                desc: "border-dashed is the default. Solid borders get a slight rotation (+-0.5deg) to appear hand-drawn. No perfect lines.",
                color: "#3498db",
                border: "border-2 border-dotted border-[#2c2c2c]",
                rotate: "0.8deg",
              },
              {
                num: "03",
                title: "Serif Italic Type",
                desc: "Georgia, serif, italic. The slight slant of italic text mimics handwriting. Bold for headings, regular for body.",
                color: "#27ae60",
                border: "border border-[#2c2c2c]/30",
                rotate: "-0.5deg",
              },
              {
                num: "04",
                title: "Sketch Shadows",
                desc: "Hard-offset box shadows (4px 4px 0) with no blur, at 15-25% opacity. Simulates pencil shading rather than CSS drop shadow.",
                color: "#f39c12",
                border: "border-2 border-[#2c2c2c]",
                rotate: "0.6deg",
              },
            ].map((item, i) => (
              <RevealBlock key={item.num} delay={i * 0.08}>
                <div
                  className="p-8 relative"
                  style={{
                    border: "2px solid #2c2c2c",
                    borderRadius: "2px",
                    transform: `rotate(${item.rotate})`,
                    backgroundColor: "#faf9f5",
                    boxShadow: "5px 5px 0 rgba(44,44,44,0.12)",
                    ...paperTextureBg,
                  }}
                >
                  <span
                    className="absolute -top-4 -right-2 font-serif italic font-bold text-4xl"
                    style={{ color: item.color, opacity: 0.3 }}
                  >
                    {item.num}
                  </span>

                  <h3
                    className="text-xl font-serif italic font-bold mb-3"
                    style={{ color: item.color }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-serif text-sm text-[#555] leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  <div
                    className={`h-12 rounded-sm flex items-center px-4 ${item.border}`}
                    style={{
                      backgroundColor: "#f5f0e8",
                      boxShadow: item.num === "04" ? "4px 4px 0 rgba(44,44,44,0.15)" : "none",
                    }}
                  >
                    <span className="font-serif italic text-xs text-[#666]">
                      {item.num === "03" ? "This is serif italic text" : `Demo \u2014 ${item.title.toLowerCase()}`}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-15">
                    <CrossHatchDoodle />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. COMPONENT GALLERY — Buttons, Cards, Links, Forms              */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <WaveDoodle className="text-[#2c2c2c] opacity-40" width={40} />
              <span className="font-serif italic text-xs text-[#2c2c2c] opacity-50 tracking-[0.2em] uppercase">
                Components
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-serif italic font-bold text-[#2c2c2c] leading-tight"
              style={{ transform: "rotate(-0.5deg)" }}
            >
              Sketch Building Blocks
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="font-serif text-[#555] text-lg max-w-lg leading-relaxed">
              Every component carries the hand-drawn character. Interact with each tab.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "links", "forms"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-5 py-2 font-serif italic text-sm capitalize
                    border-2 rounded-sm
                    transition-all duration-150
                    ${activeTab === tab
                      ? "bg-[#2c2c2c] text-[#f5f0e8] border-[#2c2c2c] shadow-[3px_3px_0_rgba(44,44,44,0.2)]"
                      : "bg-transparent text-[#2c2c2c] border-dashed border-[#2c2c2c] hover:bg-[#2c2c2c]/10"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div
              className="border-2 border-[#2c2c2c] rounded-sm p-8 md:p-12"
              style={{
                backgroundColor: "#faf9f5",
                boxShadow: "8px 8px 0 rgba(44,44,44,0.08)",
                ...paperTextureBg,
              }}
            >
              {/* BUTTONS */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="font-serif italic text-xs text-[#666] mb-5 tracking-[0.15em] uppercase">
                      Primary &mdash; Pencil Fill (hover to shade)
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="
                          px-8 py-3
                          bg-transparent text-[#2c2c2c]
                          font-serif italic font-bold tracking-widest
                          border-2 border-dashed border-[#2c2c2c]
                          rounded-sm
                          shadow-[4px_4px_0_rgba(44,44,44,0.15)]
                          hover:bg-[#2c2c2c] hover:text-[#f5f0e8]
                          hover:shadow-[6px_6px_0_rgba(44,44,44,0.25)]
                          hover:-translate-y-1 hover:rotate-1
                          active:translate-y-[4px] active:translate-x-[4px]
                          active:rotate-[-2deg] active:shadow-none
                          transition-all duration-200
                        "
                      >
                        Sketch It
                      </button>
                      <button
                        className="
                          px-8 py-3
                          bg-[#2c2c2c] text-[#f5f0e8]
                          font-serif italic font-bold
                          border-2 border-[#2c2c2c]
                          rounded-sm
                          shadow-[4px_4px_0_rgba(44,44,44,0.2)]
                          hover:bg-transparent hover:text-[#2c2c2c]
                          hover:-translate-y-0.5
                          active:translate-y-[4px] active:shadow-none
                          transition-all duration-150
                          rotate-[0.3deg]
                        "
                      >
                        Filled
                      </button>
                      <button
                        className="
                          px-8 py-3
                          bg-transparent text-[#e74c3c]
                          font-serif italic
                          border-2 border-dashed border-[#e74c3c]
                          rounded-sm
                          shadow-[3px_3px_0_rgba(231,76,60,0.2)]
                          hover:bg-[#e74c3c] hover:text-[#f5f0e8]
                          hover:rotate-1
                          active:translate-y-[3px] active:shadow-none
                          transition-all duration-200
                          rotate-[-0.5deg]
                        "
                      >
                        Accent
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="font-serif italic text-xs text-[#666] mb-5 tracking-[0.15em] uppercase">
                      Icon buttons &mdash; sketch feel
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "Draw", color: "#2c2c2c" },
                        { label: "Erase", color: "#3498db" },
                        { label: "Shade", color: "#27ae60" },
                        { label: "Outline", color: "#f39c12" },
                      ].map((btn, i) => (
                        <button
                          key={btn.label}
                          className="
                            flex items-center gap-2
                            px-5 py-2.5
                            font-serif italic text-sm
                            border-2 border-dashed rounded-sm
                            shadow-[3px_3px_0_rgba(44,44,44,0.1)]
                            hover:-translate-y-0.5
                            hover:shadow-[4px_4px_0_rgba(44,44,44,0.15)]
                            active:translate-y-[2px] active:shadow-none
                            transition-all duration-150
                          "
                          style={{
                            color: btn.color,
                            borderColor: btn.color,
                            transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 0.5}deg)`,
                          }}
                        >
                          <AsteriskDoodle size={12} />
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-serif italic text-xs text-[#666] mb-5 tracking-[0.15em] uppercase">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-end">
                      {[
                        { size: "sm", cls: "px-4 py-1.5 text-xs" },
                        { size: "md", cls: "px-6 py-2.5 text-sm" },
                        { size: "lg", cls: "px-9 py-3.5 text-base" },
                      ].map(({ size, cls }) => (
                        <button
                          key={size}
                          className={`
                            ${cls}
                            font-serif italic
                            text-[#2c2c2c]
                            border-2 border-dashed border-[#2c2c2c]
                            rounded-sm
                            shadow-[3px_3px_0_rgba(44,44,44,0.12)]
                            hover:bg-[#2c2c2c] hover:text-[#f5f0e8]
                            transition-all duration-150
                          `}
                        >
                          {size.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CARDS */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Rough Draft",
                      desc: "Drawn with pencil, eraser, and intention. Imperfect lines still tell a clear story.",
                      tag: "idea",
                      rotate: "-1deg",
                      shadow: "5px 5px 0 rgba(44,44,44,0.12)",
                      borderClass: "border-2 border-[#2c2c2c]",
                    },
                    {
                      title: "Field Notes",
                      desc: "Observations captured quickly. The hurried sketch preserves energy that revision destroys.",
                      tag: "note",
                      rotate: "0.8deg",
                      shadow: "5px 5px 0 rgba(44,44,44,0.12)",
                      borderClass: "border-2 border-dashed border-[#2c2c2c]",
                    },
                    {
                      title: "Study Sheet",
                      desc: "Cross-hatch shading builds depth without color. Tone through repetition and angle.",
                      tag: "study",
                      rotate: "-0.5deg",
                      shadow: "4px 4px 0 rgba(44,44,44,0.1)",
                      borderClass: "border-2 border-dotted border-[#2c2c2c]",
                    },
                    {
                      title: "Sketchbook Page",
                      desc: "The paper texture and hand-drawn borders make digital feel handmade, warm, human.",
                      tag: "page",
                      rotate: "1deg",
                      shadow: "6px 6px 0 rgba(44,44,44,0.15)",
                      borderClass: "border-2 border-[#2c2c2c]",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className={`
                        group p-7 rounded-sm relative
                        ${card.borderClass}
                        hover:rotate-0 hover:-translate-y-1
                        transition-all duration-200 cursor-default
                      `}
                      style={{
                        backgroundColor: "#faf9f5",
                        transform: `rotate(${card.rotate})`,
                        boxShadow: card.shadow,
                        ...paperTextureBg,
                      }}
                    >
                      <span
                        className="absolute top-3 right-3 font-serif italic text-xs text-[#999] border border-dashed border-[#999] rounded-sm px-2 py-0.5"
                        style={{ transform: "rotate(1deg)" }}
                      >
                        #{card.tag}
                      </span>

                      <div className="absolute bottom-2 right-2 opacity-10 pointer-events-none">
                        <CrossHatchDoodle />
                      </div>

                      <h4
                        className="text-xl font-serif italic font-bold text-[#2c2c2c] mb-3"
                        style={{ transform: "rotate(-0.5deg)" }}
                      >
                        {card.title}
                      </h4>
                      <p className="font-serif text-sm text-[#555] leading-relaxed">{card.desc}</p>

                      <div className="mt-4 opacity-20">
                        <WaveDoodle className="text-[#2c2c2c]" width={80} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* LINKS */}
              {activeTab === "links" && (
                <div className="space-y-10">
                  <div>
                    <p className="font-serif italic text-xs text-[#666] mb-6 tracking-[0.15em] uppercase">
                      Sketch links &mdash; various underline treatments
                    </p>
                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <ArrowDoodle className="text-[#2c2c2c] opacity-40 flex-shrink-0" />
                        <a
                          href="#"
                          className="font-serif italic text-lg text-[#2c2c2c] underline decoration-dashed underline-offset-4 hover:text-[#e74c3c] hover:decoration-wavy transition-colors duration-150"
                          onClick={(e) => e.preventDefault()}
                        >
                          Dashed underline link (default)
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <ArrowDoodle className="text-[#3498db] opacity-40 flex-shrink-0" />
                        <a
                          href="#"
                          className="font-serif italic text-lg text-[#3498db] transition-all duration-150"
                          style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#3498db", textUnderlineOffset: "5px" }}
                          onClick={(e) => e.preventDefault()}
                        >
                          Wavy underline &mdash; scribble emphasis
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <ArrowDoodle className="text-[#27ae60] opacity-40 flex-shrink-0" />
                        <a
                          href="#"
                          className="font-serif italic text-lg text-[#2c2c2c] relative inline-block hover:text-[#27ae60] transition-colors duration-150 group"
                          onClick={(e) => e.preventDefault()}
                        >
                          Hover for scribble reveal
                          <span
                            className="absolute bottom-0 left-0 h-0.5 bg-[#27ae60] transition-all duration-300 group-hover:w-full"
                            style={{ width: "0%" }}
                          />
                        </a>
                      </div>
                      <div className="flex items-center gap-4">
                        <ArrowDoodle className="text-[#f39c12] opacity-40 flex-shrink-0" />
                        <a
                          href="#"
                          className="font-serif italic text-lg text-[#2c2c2c] bg-[#f39c12]/20 px-2 py-0.5 border-b-2 border-dashed border-[#f39c12] hover:bg-[#f39c12]/40 transition-colors duration-150"
                          onClick={(e) => e.preventDefault()}
                        >
                          Highlight marker style
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-serif italic text-xs text-[#666] mb-5 tracking-[0.15em] uppercase">
                      Navigation links
                    </p>
                    <nav className="border-b-2 border-dashed border-[#2c2c2c] pb-3 flex gap-6 flex-wrap">
                      {["Drawings", "Studies", "Gallery", "Process", "About"].map((item, i) => (
                        <a
                          key={item}
                          href="#"
                          className="font-serif italic text-sm text-[#2c2c2c] hover:text-[#e74c3c] underline decoration-dashed underline-offset-4 transition-colors duration-150"
                          style={{ transform: `rotate(${(i % 3 - 1) * 0.4}deg)` }}
                          onClick={(e) => e.preventDefault()}
                        >
                          {item}
                        </a>
                      ))}
                    </nav>
                  </div>

                  <div>
                    <p className="font-serif italic text-xs text-[#666] mb-4 tracking-[0.15em] uppercase">
                      Breadcrumb path
                    </p>
                    <div className="flex items-center gap-2 font-serif italic text-sm">
                      <a href="#" className="text-[#2c2c2c] hover:text-[#e74c3c] underline decoration-dashed underline-offset-2 transition-colors" onClick={(e) => e.preventDefault()}>
                        Sketchbook
                      </a>
                      <span className="text-[#999]">/</span>
                      <a href="#" className="text-[#2c2c2c] hover:text-[#e74c3c] underline decoration-dashed underline-offset-2 transition-colors" onClick={(e) => e.preventDefault()}>
                        Pencil Studies
                      </a>
                      <span className="text-[#999]">/</span>
                      <span className="text-[#999]">Anatomy</span>
                    </div>
                  </div>
                </div>
              )}

              {/* FORMS */}
              {activeTab === "forms" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-serif italic font-bold text-[#2c2c2c] text-lg">Sketch Inputs</h4>

                    <div>
                      <label className="block font-serif italic text-sm text-[#444] mb-2">
                        Your name
                      </label>
                      <input
                        type="text"
                        placeholder="Write something..."
                        className="
                          w-full px-4 py-3
                          bg-transparent
                          border-0 border-b-2 border-dashed border-[#2c2c2c]
                          text-[#2c2c2c] placeholder-[#bbb]
                          font-serif italic text-base
                          focus:outline-none focus:border-solid focus:border-[#e74c3c]
                          transition-all duration-150
                        "
                      />
                    </div>

                    <div>
                      <label className="block font-serif italic text-sm text-[#444] mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        placeholder="sketch@notebook.com"
                        className="
                          w-full px-4 py-3
                          bg-transparent
                          border-0 border-b-2 border-dashed border-[#2c2c2c]
                          text-[#2c2c2c] placeholder-[#bbb]
                          font-serif italic text-base
                          focus:outline-none focus:border-solid focus:border-[#3498db]
                          transition-all duration-150
                        "
                      />
                    </div>

                    <div>
                      <label className="block font-serif italic text-sm text-[#444] mb-2">
                        Notes
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Jot down your thoughts..."
                        className="
                          w-full px-4 py-3
                          bg-transparent
                          border-2 border-dashed border-[#2c2c2c]
                          text-[#2c2c2c] placeholder-[#bbb]
                          font-serif italic text-base
                          rounded-sm
                          focus:outline-none focus:border-solid focus:border-[#2c2c2c]
                          transition-all duration-150
                          resize-none
                        "
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-serif italic font-bold text-[#2c2c2c] text-lg">Controls</h4>

                    <div>
                      <label className="block font-serif italic text-sm text-[#444] mb-2">
                        Media type
                      </label>
                      <select
                        className="
                          w-full px-4 py-3
                          bg-[#f5f0e8]
                          border-2 border-dashed border-[#2c2c2c]
                          text-[#2c2c2c]
                          font-serif italic
                          rounded-sm
                          focus:outline-none focus:border-solid
                          transition-all duration-150
                        "
                      >
                        <option>Pencil sketch</option>
                        <option>Ink drawing</option>
                        <option>Charcoal study</option>
                        <option>Watercolor</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <p className="font-serif italic text-sm text-[#444]">Paper weight</p>
                      {["80gsm \u2014 lightweight", "120gsm \u2014 standard", "200gsm \u2014 heavy"].map((opt) => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            className="
                              w-5 h-5 border-2 border-dashed border-[#2c2c2c] rounded-sm flex-shrink-0
                              group-hover:bg-[#2c2c2c]/10
                              transition-all duration-150
                              rotate-[-1deg]
                            "
                          />
                          <span className="font-serif italic text-sm text-[#555]">{opt}</span>
                        </label>
                      ))}
                    </div>

                    <button
                      className="
                        w-full py-3
                        bg-[#2c2c2c] text-[#f5f0e8]
                        font-serif italic font-bold
                        border-2 border-[#2c2c2c]
                        rounded-sm
                        shadow-[4px_4px_0_rgba(44,44,44,0.2)]
                        hover:bg-transparent hover:text-[#2c2c2c]
                        hover:-translate-y-0.5
                        active:translate-y-[4px] active:shadow-none
                        transition-all duration-150
                        rotate-[-0.3deg]
                      "
                    >
                      Submit Sketch
                    </button>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. ANIMATION & INTERACTION RULES                                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <AsteriskDoodle className="text-[#2c2c2c] opacity-40" size={14} />
              <span className="font-serif italic text-xs text-[#2c2c2c] opacity-50 tracking-[0.2em] uppercase">
                Interactions
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-serif italic font-bold text-[#2c2c2c] leading-tight"
              style={{ transform: "rotate(-0.5deg)" }}
            >
              Animation &amp; Interaction Rules
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="font-serif text-[#555] text-lg max-w-lg leading-relaxed">
              Four named patterns that define how sketch-style elements respond to interaction.
              Hover and click each demo to feel the pencil-drawn physicality.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* ---- Card 1: Pencil Shading ---- */}
            <RevealBlock delay={0.08}>
              <div
                className="p-8 relative h-full"
                style={{
                  border: "2px solid #2c2c2c",
                  borderRadius: "2px",
                  backgroundColor: "#faf9f5",
                  boxShadow: "5px 5px 0 rgba(44,44,44,0.1)",
                  transform: "rotate(-0.8deg)",
                  ...paperTextureBg,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 font-serif italic text-xs text-[#2c2c2c] border border-dashed border-[#2c2c2c] rounded-sm"
                    style={{ transform: "rotate(0.5deg)" }}
                  >
                    Pencil Shading
                  </span>
                </div>

                <p className="font-mono text-[10px] text-[#999] mb-6 leading-relaxed">
                  hover:bg-[#2c2c2c] hover:text-[#f5f0e8]<br />
                  transition-all duration-200
                </p>

                <div className="flex items-center justify-center py-6">
                  <button
                    className="
                      px-8 py-3
                      bg-transparent text-[#2c2c2c]
                      font-serif italic font-bold tracking-widest
                      border-2 border-dashed border-[#2c2c2c]
                      rounded-sm
                      shadow-[4px_4px_0_rgba(44,44,44,0.15)]
                      hover:bg-[#2c2c2c] hover:text-[#f5f0e8]
                      hover:shadow-[6px_6px_0_rgba(44,44,44,0.25)]
                      transition-all duration-200
                    "
                    onMouseEnter={() => setPencilShadeHovered(true)}
                    onMouseLeave={() => setPencilShadeHovered(false)}
                  >
                    Hover to shade
                  </button>
                </div>

                <p className="font-serif italic text-xs text-[#999] text-center">
                  {pencilShadeHovered
                    ? "Pencil fill applied \u2014 like shading with graphite"
                    : "Hover to simulate pencil shading into the border"}
                </p>

                <p className="font-serif text-xs text-[#666] mt-4 leading-relaxed">
                  Transparent background fills to pencil gray on hover,
                  reversing text color. Fast 200ms &mdash; pencil moves quickly.
                </p>

                <div className="absolute top-3 right-3 opacity-15">
                  <CrossHatchDoodle />
                </div>
              </div>
            </RevealBlock>

            {/* ---- Card 2: Stroke Jitter ---- */}
            <RevealBlock delay={0.12}>
              <div
                className="p-8 relative h-full"
                style={{
                  border: "2px dashed #2c2c2c",
                  borderRadius: "2px",
                  backgroundColor: "#faf9f5",
                  boxShadow: "5px 5px 0 rgba(44,44,44,0.1)",
                  transform: "rotate(0.6deg)",
                  ...paperTextureBg,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 font-serif italic text-xs text-[#3498db] border border-dashed border-[#3498db] rounded-sm"
                    style={{ transform: "rotate(-0.5deg)" }}
                  >
                    Stroke Jitter
                  </span>
                </div>

                <p className="font-mono text-[10px] text-[#999] mb-6 leading-relaxed">
                  hover:-translate-x-0.5 hover:-translate-y-0.5<br />
                  hover:rotate-[0.5deg] transition-all duration-200
                </p>

                <div className="flex items-center justify-center py-4">
                  <div
                    className="
                      p-5 border-2 border-[#2c2c2c] rounded-sm cursor-pointer
                      hover:-translate-x-0.5 hover:-translate-y-0.5 hover:rotate-[0.5deg]
                      transition-all duration-200
                    "
                    style={{
                      backgroundColor: "#f5f0e8",
                      boxShadow: "4px 4px 0 rgba(44,44,44,0.12)",
                    }}
                    onMouseEnter={() => setStrokeJitterHovered(true)}
                    onMouseLeave={() => setStrokeJitterHovered(false)}
                  >
                    <p className="font-serif italic text-sm text-[#2c2c2c] text-center">
                      Hover this card
                    </p>
                    <div className="mt-2 flex justify-center">
                      <WaveDoodle className="text-[#2c2c2c] opacity-30" width={60} />
                    </div>
                  </div>
                </div>

                <p className="font-serif italic text-xs text-[#999] text-center">
                  {strokeJitterHovered
                    ? "Hand-drawn instability \u2014 no sketch is perfectly still"
                    : "Hover the card for jitter shift"}
                </p>

                <p className="font-serif text-xs text-[#666] mt-4 leading-relaxed">
                  Slight translate + rotate on hover simulates the natural
                  instability of hand-drawn elements. Subtle but essential.
                </p>
              </div>
            </RevealBlock>

            {/* ---- Card 3: Scribble Reveal ---- */}
            <RevealBlock delay={0.16}>
              <div
                className="p-8 relative h-full"
                style={{
                  border: "2px solid #2c2c2c",
                  borderRadius: "2px",
                  backgroundColor: "#faf9f5",
                  boxShadow: "5px 5px 0 rgba(44,44,44,0.1)",
                  transform: "rotate(-0.4deg)",
                  ...paperTextureBg,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 font-serif italic text-xs text-[#27ae60] border border-dashed border-[#27ae60] rounded-sm"
                    style={{ transform: "rotate(0.8deg)" }}
                  >
                    Scribble Reveal
                  </span>
                </div>

                <p className="font-mono text-[10px] text-[#999] mb-6 leading-relaxed">
                  underline decoration-dashed underline-offset-4<br />
                  hover: decoration-wavy (scribble emphasis)
                </p>

                <div className="py-4 space-y-4">
                  <p className="font-serif text-base text-[#2c2c2c]">
                    Regular paragraph with{" "}
                    <a
                      href="#"
                      className="underline decoration-dashed underline-offset-4 hover:decoration-wavy hover:text-[#e74c3c] transition-all duration-150"
                      onMouseEnter={() => setScribbleHovered(true)}
                      onMouseLeave={() => setScribbleHovered(false)}
                      onClick={(e) => e.preventDefault()}
                    >
                      a dashed link inside it
                    </a>{" "}
                    that goes wavy on hover.
                  </p>

                  <h4
                    className="text-xl font-serif italic font-bold text-[#2c2c2c] cursor-pointer underline decoration-dashed underline-offset-[6px] hover:decoration-wavy hover:text-[#27ae60] transition-all duration-150"
                    onMouseEnter={() => setScribbleHovered(true)}
                    onMouseLeave={() => setScribbleHovered(false)}
                  >
                    Heading with scribble
                  </h4>
                </div>

                <p className="font-serif italic text-xs text-[#999] text-center mt-2">
                  {scribbleHovered
                    ? "Wavy underline \u2014 hand-drawn scribble emphasis activated"
                    : "Hover links or heading for wavy reveal"}
                </p>

                <p className="font-serif text-xs text-[#666] mt-4 leading-relaxed">
                  Dashed underline is the resting state. Wavy on hover
                  intensifies the emphasis &mdash; like scribbling under key words.
                </p>
              </div>
            </RevealBlock>

            {/* ---- Card 4: Paper Press ---- */}
            <RevealBlock delay={0.2}>
              <div
                className="p-8 relative h-full"
                style={{
                  border: "2px dashed #2c2c2c",
                  borderRadius: "2px",
                  backgroundColor: "#faf9f5",
                  boxShadow: "5px 5px 0 rgba(44,44,44,0.1)",
                  transform: "rotate(0.7deg)",
                  ...paperTextureBg,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3 py-1 font-serif italic text-xs text-[#f39c12] border border-dashed border-[#f39c12] rounded-sm"
                    style={{ transform: "rotate(-0.5deg)" }}
                  >
                    Paper Press
                  </span>
                </div>

                <p className="font-mono text-[10px] text-[#999] mb-6 leading-relaxed">
                  active:translate-y-[4px] active:translate-x-[4px]<br />
                  active:shadow-none active:rotate-[-2deg] duration-150
                </p>

                <div className="flex items-center justify-center py-6">
                  <button
                    className="
                      px-8 py-4
                      bg-transparent text-[#2c2c2c]
                      font-serif italic font-bold text-lg
                      border-2 border-[#2c2c2c]
                      rounded-sm
                      shadow-[6px_6px_0_rgba(44,44,44,0.2)]
                      hover:shadow-[8px_8px_0_rgba(44,44,44,0.25)]
                      hover:-translate-y-1
                      active:translate-y-[4px] active:translate-x-[4px]
                      active:shadow-none active:rotate-[-2deg]
                      transition-all duration-150
                    "
                    onMouseDown={() => setPaperPressActive(true)}
                    onMouseUp={() => setPaperPressActive(false)}
                    onMouseLeave={() => setPaperPressActive(false)}
                  >
                    Press me hard
                  </button>
                </div>

                <p className="font-serif italic text-xs text-[#999] text-center">
                  {paperPressActive
                    ? "Pressed into paper \u2014 shadow gone, rotated, depth collapsed"
                    : "Click and hold to feel the paper press"}
                </p>

                <p className="font-serif text-xs text-[#666] mt-4 leading-relaxed">
                  Active state: translate matches the shadow offset, shadow
                  disappears, element tilts. Simulates pressing pencil tip to paper.
                </p>

                <div className="absolute bottom-3 right-3 opacity-20 text-[#2c2c2c]">
                  <AsteriskDoodle size={20} />
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DESIGN RULES — Do / Don't                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <WaveDoodle className="text-[#2c2c2c] opacity-40" width={40} />
              <span className="font-serif italic text-xs text-[#2c2c2c] opacity-50 tracking-[0.2em] uppercase">
                Constraints
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-serif italic font-bold text-[#2c2c2c] leading-tight"
              style={{ transform: "rotate(-0.5deg)" }}
            >
              Sketch Design Rules
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="font-serif text-[#555] text-lg max-w-lg leading-relaxed">
              These are the lines you must not cross &mdash; and the ones you must always draw.
              Hand-drawn design demands discipline in its imperfection.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 relative"
                style={{
                  border: "2px solid #27ae60",
                  borderRadius: "2px",
                  backgroundColor: "#faf9f5",
                  boxShadow: "5px 5px 0 rgba(39,174,96,0.15)",
                  transform: "rotate(-0.5deg)",
                  ...paperTextureBg,
                }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-9 h-9 border-2 border-[#27ae60] rounded-sm flex items-center justify-center"
                    style={{ transform: "rotate(-1deg)" }}
                  >
                    <svg className="w-4 h-4 text-[#27ae60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-serif italic font-bold text-[#27ae60]"
                    style={{ transform: "rotate(0.5deg)" }}
                  >
                    Always Draw
                  </h3>
                  <div className="ml-auto opacity-20 text-[#27ae60]">
                    <StarDoodle size={20} />
                  </div>
                </div>

                <ul className="space-y-3">
                  {[
                    "bg-[#f5f0e8] \u2014 paper color background, never white",
                    "border-dashed or rotated borders for hand-drawn feel",
                    "font-serif italic \u2014 the slant mimics handwriting",
                    "Slight element rotations \u00b10.5deg to \u00b11.5deg",
                    "#2c2c2c pencil gray as the primary tone",
                    "Hard-offset shadows: 4px 4px 0 rgba(44,44,44,0.15)",
                    "hover: pencil fill \u2014 transparent to filled, fast 150-200ms",
                    "active: translate to shadow offset + rotate, shadow-none",
                    "Dashed or wavy underlines for links and emphasis",
                    "Inline SVG doodles for decorative accents",
                  ].map((rule, i) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 font-serif text-sm text-[#444] leading-relaxed"
                      style={{ transform: `rotate(${(i % 3 - 1) * 0.2}deg)` }}
                    >
                      <span className="mt-1.5 w-2 h-2 border border-dashed border-[#27ae60] rounded-sm flex-shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 opacity-20">
                  <WaveDoodle className="text-[#27ae60]" width={100} />
                </div>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.15}>
              <div
                className="p-8 relative"
                style={{
                  border: "2px solid #e74c3c",
                  borderRadius: "2px",
                  backgroundColor: "#faf9f5",
                  boxShadow: "5px 5px 0 rgba(231,76,60,0.12)",
                  transform: "rotate(0.6deg)",
                  ...paperTextureBg,
                }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-9 h-9 border-2 border-[#e74c3c] rounded-sm flex items-center justify-center"
                    style={{ transform: "rotate(1deg)" }}
                  >
                    <svg className="w-4 h-4 text-[#e74c3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-serif italic font-bold text-[#e74c3c]"
                    style={{ transform: "rotate(-0.5deg)" }}
                  >
                    Never Sketch
                  </h3>
                  <div className="ml-auto opacity-20 text-[#e74c3c]">
                    <AsteriskDoodle size={20} />
                  </div>
                </div>

                <ul className="space-y-3">
                  {[
                    "bg-white \u2014 pure white breaks the paper illusion",
                    "bg-gradient-* \u2014 gradients contradict pencil flatness",
                    "rounded-xl or rounded-2xl \u2014 too smooth, too digital",
                    "backdrop-blur or glass effects \u2014 sketch is opaque",
                    "Long, smooth animations \u2014 hand-drawn is direct, fast",
                    "Perfectly centered, perfectly aligned elements",
                    "Neon or highly saturated colors",
                    "border-solid without any rotation compensation",
                    "Drop shadows with large blur radii",
                    "System sans-serif fonts without italic treatment",
                  ].map((rule, i) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 font-serif text-sm text-[#444] leading-relaxed"
                      style={{ transform: `rotate(${(i % 3 - 1) * 0.2}deg)` }}
                    >
                      <span className="mt-1.5 w-2 h-2 border border-dashed border-[#e74c3c] rounded-sm flex-shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 opacity-15">
                  <WaveDoodle className="text-[#e74c3c]" width={100} />
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy callout */}
          <RevealBlock delay={0.22} className="mt-6">
            <div
              className="p-8 text-center relative"
              style={{
                border: "2px dashed #2c2c2c",
                borderRadius: "2px",
                backgroundColor: "#faf9f5",
                boxShadow: "4px 4px 0 rgba(44,44,44,0.08)",
                transform: "rotate(-0.3deg)",
                ...paperTextureBg,
              }}
            >
              <ScribbleCircle className="absolute -top-5 left-1/2 -translate-x-1/2 text-[#2c2c2c] opacity-10 w-20 h-14" />
              <p
                className="font-serif italic text-xl text-[#2c2c2c] max-w-2xl mx-auto leading-relaxed"
                style={{ transform: "rotate(0.3deg)" }}
              >
                &ldquo;Perfection is the enemy of the hand-drawn line. The wobble, the dent,
                the slight misalignment &mdash; these are features, not bugs.&rdquo;
              </p>
              <div className="flex justify-center mt-4 gap-2 opacity-30">
                <AsteriskDoodle size={14} />
                <WaveDoodle width={60} />
                <AsteriskDoodle size={14} />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer
        className="relative border-t-2 border-dashed border-[#2c2c2c] overflow-hidden"
        style={{ backgroundColor: "#f5f0e8", ...paperTextureBg }}
      >
        {/* Scattered doodle decorations */}
        <div className="absolute top-6 left-8 text-[#2c2c2c] opacity-10 pointer-events-none">
          <AsteriskDoodle size={32} />
        </div>
        <div className="absolute top-10 right-12 text-[#2c2c2c] opacity-10 pointer-events-none">
          <StarDoodle size={28} />
        </div>
        <div className="absolute bottom-12 left-1/4 text-[#2c2c2c] opacity-10 pointer-events-none">
          <CrossHatchDoodle />
        </div>
        <div className="absolute top-1/2 right-8 text-[#2c2c2c] opacity-8 pointer-events-none">
          <PencilDoodle className="w-6 h-16" />
        </div>
        <div className="absolute bottom-8 right-1/3 text-[#2c2c2c] opacity-10 pointer-events-none">
          <WaveDoodle width={80} />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-5 max-w-xs">
              <div className="flex items-center gap-3" style={{ transform: "rotate(-0.5deg)" }}>
                <div
                  className="w-10 h-10 border-2 border-dashed border-[#2c2c2c] rounded-sm flex items-center justify-center"
                  style={{ transform: "rotate(1deg)" }}
                >
                  <AsteriskDoodle className="text-[#2c2c2c]" size={16} />
                </div>
                <span className="text-xl font-serif italic font-bold text-[#2c2c2c] tracking-wide">
                  Sketch Style
                </span>
              </div>
              <p className="font-serif italic text-sm text-[#666] leading-relaxed">
                Pencil-drawn borders, paper textures, hand-written type.
                Imperfect lines that carry warmth and human intention.
              </p>
              <div className="flex gap-2">
                {[
                  { hex: "#2c2c2c" },
                  { hex: "#e74c3c" },
                  { hex: "#3498db" },
                  { hex: "#27ae60" },
                  { hex: "#f39c12" },
                ].map((s) => (
                  <div
                    key={s.hex}
                    className="w-6 h-6 border border-[#2c2c2c]/30 rounded-sm hover:-translate-y-0.5 transition-transform duration-150 cursor-default"
                    style={{ backgroundColor: s.hex, boxShadow: "2px 2px 0 rgba(44,44,44,0.1)" }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="font-serif italic text-xs tracking-[0.15em] uppercase text-[#999]">Style</span>
                <Link href="/styles/sketch-style" className="font-serif italic text-[#555] hover:text-[#e74c3c] underline decoration-dashed underline-offset-3 transition-colors duration-150">
                  Documentation
                </Link>
                <Link href="/styles/sketch-style/showcase" className="font-serif italic text-[#555] hover:text-[#e74c3c] underline decoration-dashed underline-offset-3 transition-colors duration-150">
                  Showcase
                </Link>
                <Link href="/styles/sketch-style/cover" className="font-serif italic text-[#555] hover:text-[#e74c3c] underline decoration-dashed underline-offset-3 transition-colors duration-150">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-serif italic text-xs tracking-[0.15em] uppercase text-[#999]">StyleKit</span>
                <Link href="/" className="font-serif italic text-[#555] hover:text-[#e74c3c] underline decoration-dashed underline-offset-3 transition-colors duration-150">
                  Home
                </Link>
                <Link href="/styles" className="font-serif italic text-[#555] hover:text-[#e74c3c] underline decoration-dashed underline-offset-3 transition-colors duration-150">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-serif italic text-xs tracking-[0.15em] uppercase text-[#999]">Palette</span>
                {[
                  { hex: "#2c2c2c", name: "Pencil Gray" },
                  { hex: "#f5f0e8", name: "Paper Cream" },
                  { hex: "#e74c3c", name: "Sketch Red" },
                  { hex: "#3498db", name: "Ink Blue" },
                  { hex: "#27ae60", name: "Leaf Green" },
                ].map((s) => (
                  <span key={s.hex} className="flex items-center gap-2 font-serif italic text-[#555] text-xs">
                    <span
                      className="w-3 h-3 rounded-sm inline-block border border-[#2c2c2c]/20 flex-shrink-0"
                      style={{ backgroundColor: s.hex }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-b-2 border-dashed border-[#2c2c2c] opacity-20 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-serif italic text-sm text-[#999]">
              <span>Sketched for</span>
              <AsteriskDoodle className="text-[#2c2c2c] opacity-40" size={14} />
              <span>StyleKit</span>
              <WaveDoodle className="text-[#2c2c2c] opacity-30" width={40} />
            </div>

            <Link
              href="/"
              className="
                flex items-center gap-2
                px-5 py-2.5
                font-serif italic text-sm text-[#2c2c2c]
                border-2 border-dashed border-[#2c2c2c]
                rounded-sm
                shadow-[3px_3px_0_rgba(44,44,44,0.12)]
                hover:bg-[#2c2c2c] hover:text-[#f5f0e8]
                hover:-translate-y-0.5
                active:translate-y-[3px] active:shadow-none
                transition-all duration-150
                rotate-[-0.3deg]
              "
            >
              <span>&#8592;</span>
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
