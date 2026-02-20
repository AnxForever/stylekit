"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & components – ZERO @/components/showcase imports     */
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sketchworks = [
  { id: "01", title: "Rough Draft", category: "Illustration", desc: "First pass concepts drawn in pencil on cream paper." },
  { id: "02", title: "Margin Notes", category: "Typography", desc: "Hand-lettered annotations in the style of notebook margins." },
  { id: "03", title: "Blueprint Doodle", category: "UI Sketch", desc: "Interface wireframes with wobbly hand-drawn borders." },
];

const galleryItems = [
  { title: "Pencil Portrait", rotate: "-1.5deg", aspect: "aspect-[3/4]" },
  { title: "Cross-Hatch Study", rotate: "0.8deg", aspect: "aspect-square" },
  { title: "Ink Wash", rotate: "-0.5deg", aspect: "aspect-[4/3]" },
  { title: "Charcoal Still Life", rotate: "1.2deg", aspect: "aspect-[3/4]" },
];

const palette = [
  { name: "Pencil Dark", hex: "#2c2c2c" },
  { name: "Paper Cream", hex: "#f5f0e8" },
  { name: "Sketch Red", hex: "#e74c3c" },
  { name: "Sketch Blue", hex: "#3498db" },
  { name: "Sketch Green", hex: "#27ae60" },
  { name: "Sketch Yellow", hex: "#f39c12" },
  { name: "Light Gray", hex: "#999999" },
  { name: "Mid Gray", hex: "#555555" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#2c2c2c]">
      <style>{`
        @keyframes sketch-wiggle {
          0%,100% { transform: rotate(-0.5deg); }
          50% { transform: rotate(0.5deg); }
        }
        .sketch-paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232c2c2c' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
        }
        .sketch-link {
          text-decoration: underline;
          text-decoration-style: wavy;
          text-underline-offset: 4px;
          text-decoration-color: #2c2c2c;
        }
        .sketch-link:hover {
          text-decoration-color: #e74c3c;
          color: #e74c3c;
        }
        @keyframes sketch-draw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* ===== Fixed Nav ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e8]/95 backdrop-blur-[2px] border-b-2 border-dashed border-[#2c2c2c]/20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <Link href="/styles/sketch-style/showcase" className="font-serif italic text-xl text-[#2c2c2c]" style={{ transform: "rotate(-1deg)" }}>
            Sketchbook
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {["Drawings", "Gallery", "Palette", "Rules"].map((item) => (
              <span key={item} className="font-serif italic text-sm text-[#2c2c2c]/70 sketch-link cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </nav>
          <Link
            href="/styles/sketch-style"
            className="px-5 py-2 bg-[#2c2c2c] text-[#f5f0e8] font-serif italic text-sm border-2 border-[#2c2c2c] rounded-sm shadow-[3px_3px_0_rgba(44,44,44,0.15)] hover:shadow-[5px_5px_0_rgba(44,44,44,0.2)] hover:-translate-y-0.5 hover:rotate-1 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none active:rotate-[-1deg] transition-all duration-150"
          >
            Docs
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="pt-28 md:pt-40 pb-20 px-6 md:px-12 max-w-5xl mx-auto relative sketch-paper-texture">
        {/* Decorative hand-drawn circles */}
        <svg
          className="absolute top-24 right-8 md:right-16 w-20 h-20 text-[#2c2c2c]/10 pointer-events-none hidden md:block"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" style={{ transform: "rotate(-5deg)", transformOrigin: "center" }} />
          <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" style={{ transform: "rotate(3deg)", transformOrigin: "center" }} />
        </svg>

        <div
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "rotate(-1deg)" : "rotate(-1deg) translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <span className="inline-block font-serif italic text-xs tracking-[0.2em] uppercase text-[#2c2c2c]/50 mb-4 underline decoration-dashed underline-offset-4">
            Sketch Style
          </span>
          <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6">
            <span
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
                display: "inline-block",
              }}
            >
              Every line
            </span>
            <br />
            <span
              className="text-[#2c2c2c]/60"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0) rotate(0.5deg)" : "translateY(30px) rotate(0.5deg)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
                display: "inline-block",
              }}
            >
              tells a story.
            </span>
          </h1>
        </div>

        <p
          className="font-serif italic text-lg text-[#555] max-w-md leading-relaxed mb-10"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "rotate(0.3deg)" : "rotate(0.3deg) translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        >
          Hand-drawn borders, paper textures, and pencil-gray tones. Imperfect lines that carry warmth and authenticity.
        </p>

        <div
          className="flex gap-4 flex-wrap"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}
        >
          <button className="px-8 py-4 bg-[#2c2c2c] text-[#f5f0e8] border-2 border-[#2c2c2c] rounded-sm font-serif italic text-lg shadow-[4px_4px_0_rgba(44,44,44,0.15)] hover:bg-transparent hover:text-[#2c2c2c] hover:shadow-[6px_6px_0_rgba(44,44,44,0.25)] hover:-translate-y-1 hover:rotate-1 active:translate-y-[4px] active:translate-x-[4px] active:shadow-none active:rotate-[-2deg] transition-all duration-150">
            Open Sketchbook
          </button>
          <button className="px-8 py-4 bg-transparent text-[#2c2c2c] border-2 border-dashed border-[#2c2c2c] rounded-sm font-serif italic text-lg shadow-[3px_3px_0_rgba(44,44,44,0.1)] hover:bg-[#2c2c2c] hover:text-[#f5f0e8] hover:border-solid hover:-translate-y-1 active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all duration-150">
            View Gallery
          </button>
        </div>

        {/* Decorative divider */}
        <div className="mt-20 mb-4">
          <svg className="w-full h-4" viewBox="0 0 800 16" fill="none" preserveAspectRatio="none">
            <path d="M0 8 Q 100 2, 200 8 T 400 8 T 600 8 T 800 8" stroke="#2c2c2c" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />
          </svg>
        </div>
      </section>

      {/* ===== Featured Sketches ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto sketch-paper-texture">
        <RevealBlock className="mb-12">
          <h2 className="font-serif italic text-3xl md:text-5xl" style={{ transform: "rotate(-0.5deg)" }}>
            Selected <span className="text-[#2c2c2c]/50">Sketches.</span>
          </h2>
        </RevealBlock>

        <div className="flex flex-col">
          {sketchworks.map((work, i) => (
            <RevealBlock key={work.id} delay={i * 0.1}>
              <div
                className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-8 md:py-12 border-b-2 border-dashed border-[#2c2c2c]/15 hover:bg-[#2c2c2c]/[0.03] cursor-pointer px-4 -mx-4 transition-all duration-150"
                style={{ transform: `rotate(${i % 2 === 0 ? "-0.3" : "0.3"}deg)` }}
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="font-serif italic text-xs tracking-widest text-[#2c2c2c]/30">{work.id}</span>
                  <div>
                    <h3 className="font-serif italic text-2xl md:text-4xl group-hover:text-[#e74c3c] transition-colors duration-150">{work.title}</h3>
                    <p className="font-serif italic text-sm text-[#555] mt-1 max-w-md">{work.desc}</p>
                  </div>
                </div>
                <span className="font-serif italic text-xs tracking-[0.15em] uppercase mt-4 md:mt-0 text-[#2c2c2c]/40 underline decoration-dashed underline-offset-4">
                  {work.category}
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ===== Gallery Grid ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="font-serif italic text-3xl md:text-5xl" style={{ transform: "rotate(0.3deg)" }}>
            Gallery <span className="text-[#2c2c2c]/50">Wall.</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, i) => (
            <RevealBlock key={item.title} delay={i * 0.12}>
              <div
                className="group p-6 bg-[#f5f0e8] border-2 border-[#2c2c2c] rounded-sm shadow-[5px_5px_0_rgba(44,44,44,0.15)] hover:shadow-[8px_8px_0_rgba(44,44,44,0.2)] hover:-translate-y-1 hover:rotate-0 transition-all duration-200 cursor-pointer relative overflow-hidden"
                style={{ transform: `rotate(${item.rotate})` }}
              >
                {/* Decorative scribble on hover */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-[40%_60%_70%_30%] border border-[#2c2c2c] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-[60%_40%_30%_70%] border border-[#2c2c2c] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 delay-75" />

                <div className={`w-full ${item.aspect} bg-[#e8e2d8] border border-[#2c2c2c]/10 rounded-sm mb-4 flex items-center justify-center`}>
                  {/* Cross-hatch pattern */}
                  <svg className="w-16 h-16 text-[#2c2c2c]/15" viewBox="0 0 60 60" fill="none">
                    <line x1="0" y1="0" x2="60" y2="60" stroke="currentColor" strokeWidth="1" />
                    <line x1="15" y1="0" x2="60" y2="45" stroke="currentColor" strokeWidth="1" />
                    <line x1="30" y1="0" x2="60" y2="30" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="15" x2="45" y2="60" stroke="currentColor" strokeWidth="1" />
                    <line x1="0" y1="30" x2="30" y2="60" stroke="currentColor" strokeWidth="1" />
                    <line x1="60" y1="0" x2="0" y2="60" stroke="currentColor" strokeWidth="1" />
                    <line x1="45" y1="0" x2="0" y2="45" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
                <h3 className="font-serif italic text-xl font-bold text-[#2c2c2c] group-hover:text-[#e74c3c] transition-colors">{item.title}</h3>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ===== Component Demos (tab-switched) ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="font-serif italic text-3xl md:text-5xl" style={{ transform: "rotate(-0.5deg)" }}>
            Components <span className="text-[#2c2c2c]/50">Kit.</span>
          </h2>
        </RevealBlock>

        {/* Tabs */}
        <RevealBlock delay={0.1} className="mb-8">
          <div className="flex gap-3">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 font-serif italic text-sm capitalize border-2 rounded-sm transition-all duration-150 ${
                  activeTab === tab
                    ? "bg-[#2c2c2c] text-[#f5f0e8] border-[#2c2c2c] shadow-[3px_3px_0_rgba(44,44,44,0.15)]"
                    : "bg-transparent text-[#2c2c2c] border-dashed border-[#2c2c2c]/40 hover:border-[#2c2c2c] hover:bg-[#2c2c2c]/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={0.2}>
          <div className="border-2 border-dashed border-[#2c2c2c]/20 rounded-sm p-8 md:p-12 bg-[#f5f0e8] sketch-paper-texture">
            {activeTab === "button" && (
              <div className="flex flex-wrap gap-6 items-center">
                <button className="px-8 py-3 bg-transparent text-[#2c2c2c] font-serif italic font-bold tracking-widest border-2 border-dashed border-[#2c2c2c] rounded-sm shadow-[4px_4px_0_rgba(44,44,44,0.15)] hover:bg-[#2c2c2c] hover:text-[#f5f0e8] hover:shadow-[6px_6px_0_rgba(44,44,44,0.25)] hover:-translate-y-1 hover:rotate-1 active:translate-y-[4px] active:translate-x-[4px] active:rotate-[-2deg] active:shadow-none transition-all duration-150">
                  Sketch It
                </button>
                <button className="px-8 py-3 bg-[#2c2c2c] text-[#f5f0e8] font-serif italic border-2 border-[#2c2c2c] rounded-sm shadow-[4px_4px_0_rgba(44,44,44,0.15)] hover:bg-transparent hover:text-[#2c2c2c] hover:-translate-y-1 active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all duration-150">
                  Draw
                </button>
                <button className="px-6 py-3 bg-transparent text-[#e74c3c] font-serif italic border-2 border-dashed border-[#e74c3c] rounded-sm hover:bg-[#e74c3c] hover:text-[#f5f0e8] hover:border-solid active:scale-[0.95] transition-all duration-150">
                  Erase
                </button>
                <button className="px-6 py-3 text-[#2c2c2c] font-serif italic underline decoration-wavy underline-offset-4 hover:text-[#3498db] hover:decoration-[#3498db] transition-colors duration-150">
                  View More
                </button>
              </div>
            )}
            {activeTab === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Rough Draft", desc: "Drawn with pencil, eraser, and intention. Imperfect lines still tell a clear story.", rot: "-1deg" },
                  { title: "Margin Notes", desc: "Hand-lettered annotations scribbled in the margins. Every sketch needs context.", rot: "0.8deg" },
                  { title: "Cross-Hatch", desc: "Shading technique using intersecting sets of parallel lines for depth and volume.", rot: "-0.5deg" },
                  { title: "Ink Wash", desc: "Diluted ink applied with broad strokes. The water does half the work for you.", rot: "0.6deg" },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="group p-8 bg-[#f5f0e8] border-2 border-[#2c2c2c] rounded-sm relative shadow-[5px_5px_0_rgba(44,44,44,0.15)] hover:rotate-0 hover:shadow-[8px_8px_0_rgba(44,44,44,0.2)] hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden"
                    style={{ transform: `rotate(${c.rot})` }}
                  >
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-[40%_60%_70%_30%] border border-[#2c2c2c] opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                    <h4 className="text-xl font-serif italic font-bold text-[#2c2c2c] mb-3 group-hover:text-[#e74c3c] transition-colors">{c.title}</h4>
                    <p className="text-[#555] font-serif leading-relaxed text-sm">{c.desc}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "input" && (
              <div className="max-w-md space-y-6">
                <div>
                  <label className="block font-serif italic text-sm text-[#2c2c2c]/60 mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="Write something..."
                    className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] placeholder-[#999] font-serif italic focus:outline-none focus:border-solid focus:border-[#e74c3c] transition-all"
                  />
                </div>
                <div>
                  <label className="block font-serif italic text-sm text-[#2c2c2c]/60 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] placeholder-[#999] font-serif italic focus:outline-none focus:border-solid focus:border-[#3498db] transition-all"
                  />
                </div>
                <div>
                  <label className="block font-serif italic text-sm text-[#2c2c2c]/60 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Scribble your thoughts..."
                    className="w-full px-4 py-3 bg-transparent border-2 border-dashed border-[#2c2c2c]/40 rounded-sm text-[#2c2c2c] placeholder-[#999] font-serif italic focus:outline-none focus:border-solid focus:border-[#27ae60] transition-all resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="font-serif italic text-3xl md:text-5xl" style={{ transform: "rotate(0.5deg)" }}>
            Color <span className="text-[#2c2c2c]/50">Swatches.</span>
          </h2>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {palette.map((c, i) => (
              <div
                key={c.name}
                className="group cursor-pointer"
                style={{ transform: `rotate(${i % 2 === 0 ? "-0.5" : "0.5"}deg)` }}
              >
                <div
                  className="w-full aspect-[3/2] rounded-sm border-2 border-[#2c2c2c] mb-3 shadow-[3px_3px_0_rgba(44,44,44,0.1)] group-hover:shadow-[5px_5px_0_rgba(44,44,44,0.15)] group-hover:-translate-y-0.5 transition-all duration-150"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="font-serif italic text-sm text-[#2c2c2c]">{c.name}</div>
                <div className="font-serif text-xs text-[#999] uppercase">{c.hex}</div>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="font-serif italic text-3xl md:text-5xl" style={{ transform: "rotate(-0.3deg)" }}>
            Sketchbook <span className="text-[#2c2c2c]/50">Rules.</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <RevealBlock>
            <div className="border-2 border-dashed border-[#27ae60]/40 rounded-sm p-6" style={{ transform: "rotate(-0.3deg)" }}>
              <h3 className="font-serif italic text-lg font-bold text-[#27ae60] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Do
              </h3>
              <ul className="space-y-4">
                {[
                  "Use paper-tone background bg-[#f5f0e8]",
                  "Borders: border-2 border-dashed for hand-drawn feel",
                  "Font: font-serif italic for handwritten quality",
                  "Slight tilts: rotate-[-0.5deg] to rotate-[0.5deg]",
                  "Shadow: offset solid shadows, not blur",
                  "Hover: pencil-shade fill (bg swap to #2c2c2c)",
                  "Emphasis via wavy/dashed underlines",
                  "Active: reduce shadow + tilt jitter",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 font-serif italic text-sm text-[#555] leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#27ae60] shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="border-2 border-dashed border-[#e74c3c]/40 rounded-sm p-6" style={{ transform: "rotate(0.3deg)" }}>
              <h3 className="font-serif italic text-lg font-bold text-[#e74c3c] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Don&apos;t
              </h3>
              <ul className="space-y-4">
                {[
                  "Perfect straight lines (border-solid only)",
                  "Pure white backgrounds (bg-white)",
                  "Gradient effects (bg-gradient-*)",
                  "Glass blur (backdrop-blur)",
                  "Large rounded corners (rounded-xl, 2xl)",
                  "Highly saturated neon colors",
                  "Long smooth animations (keep it snappy)",
                  "Over-polished hover states (keep rough feel)",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 font-serif italic text-sm text-[#555] leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e74c3c] shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>

        {/* Visual example of sketch elements */}
        <RevealBlock delay={0.3} className="mt-16">
          <div className="border-2 border-[#2c2c2c] rounded-sm p-8 md:p-12 relative" style={{ transform: "rotate(-0.5deg)" }}>
            <h3 className="font-serif italic text-lg font-bold mb-8">Sketch Elements Reference</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full aspect-square border-2 border-dashed border-[#2c2c2c] rounded-sm flex items-center justify-center mb-2 shadow-[3px_3px_0_rgba(44,44,44,0.1)]" style={{ transform: "rotate(-1deg)" }}>
                  <span className="font-serif italic text-xs text-[#999]">Dashed Border</span>
                </div>
                <span className="font-serif italic text-xs text-[#555]">border-dashed</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square border-2 border-[#2c2c2c] rounded-sm flex items-center justify-center mb-2 shadow-[5px_5px_0_rgba(44,44,44,0.15)]" style={{ transform: "rotate(0.8deg)" }}>
                  <span className="font-serif italic text-xs text-[#999]">Offset Shadow</span>
                </div>
                <span className="font-serif italic text-xs text-[#555]">shadow-offset</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square bg-[#2c2c2c] rounded-sm flex items-center justify-center mb-2" style={{ transform: "rotate(-0.5deg)" }}>
                  <span className="font-serif italic text-xs text-[#f5f0e8]">Filled</span>
                </div>
                <span className="font-serif italic text-xs text-[#555]">pencil-shade</span>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square border-2 border-[#2c2c2c] rounded-[40%_60%_70%_30%] flex items-center justify-center mb-2" style={{ transform: "rotate(1deg)" }}>
                  <span className="font-serif italic text-xs text-[#999]">Blob</span>
                </div>
                <span className="font-serif italic text-xs text-[#555]">organic shape</span>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t-2 border-dashed border-[#2c2c2c]/15">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="font-serif italic text-sm text-[#2c2c2c]/40">StyleKit</span>
              <span className="font-serif italic text-xs text-[#2c2c2c]/25">Sketch Style Showcase</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/styles/sketch-style" className="font-serif italic text-sm text-[#2c2c2c]/60 sketch-link transition-colors">
                Documentation
              </Link>
              <Link href="/styles" className="font-serif italic text-sm text-[#2c2c2c]/60 sketch-link transition-colors">
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
