"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline useInView – threshold 0.15                                  */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
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
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  Inline RevealBlock                                                 */
/* ------------------------------------------------------------------ */
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const caseFiles = [
  {
    number: "#001",
    title: "The Vanishing Witness",
    excerpt:
      "She walked into my office on a Tuesday. By Thursday, every trace of her had disappeared from the city records.",
    date: "November 1947",
    status: "Cold",
  },
  {
    number: "#002",
    title: "Midnight at the Pier",
    excerpt:
      "The fog rolled in thick enough to hide a body. When it lifted, the cargo was gone and so was the ship's captain.",
    date: "February 1948",
    status: "Active",
  },
  {
    number: "#003",
    title: "The Crimson Letter",
    excerpt:
      "A single page, typed on a 1940 Remington. No fingerprints. No return address. Just an accusation that could topple an empire.",
    date: "August 1949",
    status: "Closed",
  },
  {
    number: "#004",
    title: "Shadows on Fifth Avenue",
    excerpt:
      "The detective found the photographs taped beneath a loose floorboard. Each one was timestamped three days before the crime.",
    date: "December 1949",
    status: "Active",
  },
];

const componentTabs = [
  { key: "buttons", label: "Buttons" },
  { key: "cards", label: "Cards" },
  { key: "inputs", label: "Inputs" },
  { key: "scenes", label: "Scenes" },
];

const colorPalette = [
  { name: "Near Black", hex: "#0a0a0a", text: "text-neutral-400" },
  { name: "Card Dark", hex: "#171717", text: "text-neutral-400" },
  { name: "Card Medium", hex: "#262626", text: "text-neutral-400" },
  { name: "Border", hex: "#404040", text: "text-neutral-300" },
  { name: "Muted Text", hex: "#737373", text: "text-neutral-200" },
  { name: "Body Text", hex: "#d4d4d4", text: "text-neutral-900" },
  { name: "Heading", hex: "#f5f5f5", text: "text-neutral-900" },
  { name: "Crimson", hex: "#c41e3a", text: "text-white" },
  { name: "Bourbon", hex: "#8b7355", text: "text-white" },
  { name: "Gold", hex: "#d4af37", text: "text-neutral-900" },
];

const doRules = [
  "Use deep black bg-[#0a0a0a] as base canvas",
  "Keep grayscale palette: neutral-100 through neutral-950",
  "Apply serif italic for headings (font-serif italic)",
  "Separate layers subtly: neutral-900 vs neutral-800",
  "Reserve crimson #c41e3a for rare emphasis only",
  "Use diagonal gradients for atmospheric light",
  "Keep borders thin or invisible: border-neutral-800",
  "Include light shaft sweep on all interactive buttons",
];

const dontRules = [
  "No colorful or saturated backgrounds",
  "No rounded-2xl or larger corners",
  "No glow or shadow-lg effects",
  "No animation duration below 300ms",
  "No buttons without active:scale-[0.98]",
  "No focus ring without ring-offset-neutral-950",
  "No gradient or colorful buttons",
  "No cartoon, cute, or playful elements",
];

/* ------------------------------------------------------------------ */
/*  Sub-components (all inline)                                        */
/* ------------------------------------------------------------------ */

/** Light shaft sweep inner layer for buttons */
function LightShaft({ intensity = "via-white/30" }: { intensity?: string }) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-r from-transparent ${intensity} to-transparent -translate-x-[200%] skew-x-[-20deg] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none`}
    />
  );
}

/** Venetian blinds overlay */
function VenetianBlinds() {
  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,#fff_4px,#fff_6px)] pointer-events-none" />
  );
}

/** Crimson bleed line */
function CrimsonBleed() {
  return (
    <div className="mt-6 h-[2px] bg-[#c41e3a] w-12 group-hover:w-full transition-all duration-700 ease-out" />
  );
}

/** Noir case file card */
function CaseCard({
  number,
  title,
  excerpt,
  date,
  status,
}: {
  number: string;
  title: string;
  excerpt: string;
  date: string;
  status: string;
}) {
  const statusColor =
    status === "Active"
      ? "text-[#c41e3a]"
      : status === "Closed"
        ? "text-[#d4af37]"
        : "text-neutral-500";
  return (
    <div className="group relative bg-neutral-900 border border-neutral-800 p-8 overflow-hidden hover:border-neutral-600 transition-colors duration-700 cursor-crosshair">
      <VenetianBlinds />
      <div className="absolute -top-20 -right-20 w-40 h-80 bg-gradient-to-b from-white/5 to-transparent rotate-45 group-hover:from-white/10 transition-all duration-700 pointer-events-none" />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <p className="text-neutral-500 text-xs uppercase tracking-[0.2em]">
            Case File {number}
          </p>
          <span
            className={`text-xs uppercase tracking-[0.15em] ${statusColor}`}
          >
            {status}
          </span>
        </div>
        <h3 className="text-neutral-100 text-xl font-serif italic mb-3 group-hover:text-white transition-colors duration-500">
          {title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-500">
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-6">
          <span className="text-neutral-600 text-xs font-serif italic">
            {date}
          </span>
        </div>
        <CrimsonBleed />
      </div>
    </div>
  );
}

/** Scene panel for atmospheric demo */
function ScenePanel({
  title,
  subtitle,
  gradient,
}: {
  title: string;
  subtitle: string;
  gradient: string;
}) {
  return (
    <div className="group relative h-64 bg-neutral-950 overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-colors duration-700">
      <div
        className={`absolute inset-0 ${gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-700`}
      />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent,transparent_80px,rgba(0,0,0,0.3)_80px,rgba(0,0,0,0.3)_82px)] pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <p className="text-neutral-500 text-xs uppercase tracking-[0.3em] mb-3">
          {subtitle}
        </p>
        <h3 className="text-neutral-100 text-2xl font-serif italic group-hover:text-white transition-colors duration-500">
          {title}
        </h3>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Main Showcase                                                      */
/* ================================================================== */
export default function FilmNoirShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState("buttons");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-300">
      {/* ============================================================ */}
      {/*  1. NAVIGATION                                               */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/styles"
            className="text-neutral-500 text-xs uppercase tracking-[0.2em] hover:text-neutral-200 transition-colors duration-500"
          >
            &larr; All Styles
          </Link>
          <span className="text-neutral-100 font-serif italic text-lg tracking-widest">
            Film Noir
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#components"
              className="text-neutral-500 text-xs uppercase tracking-[0.15em] hover:text-neutral-200 transition-colors duration-500 hidden md:inline"
            >
              Components
            </a>
            <a
              href="#palette"
              className="text-neutral-500 text-xs uppercase tracking-[0.15em] hover:text-neutral-200 transition-colors duration-500 hidden md:inline"
            >
              Palette
            </a>
            <a
              href="#rules"
              className="text-neutral-500 text-xs uppercase tracking-[0.15em] hover:text-neutral-200 transition-colors duration-500 hidden md:inline"
            >
              Rules
            </a>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/*  2. HERO                                                     */}
      {/* ============================================================ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Spotlight from top-left */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.07)_0%,transparent_70%)] pointer-events-none" />
        {/* Venetian blind strips across full hero */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent,transparent_80px,rgba(0,0,0,0.3)_80px,rgba(0,0,0,0.3)_82px)] pointer-events-none" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0a0a_100%)] pointer-events-none" />
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

        <div
          className="relative z-10 text-center max-w-4xl px-8"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s",
          }}
        >
          <p className="text-neutral-500 text-xs uppercase tracking-[0.4em] mb-8 font-sans">
            A Design Language of Shadows
          </p>
          <h1 className="text-5xl md:text-8xl font-serif italic text-neutral-100 leading-tight mb-6 tracking-tight">
            Every Shadow
            <br />
            <span className="text-[#c41e3a]">Tells a Story</span>
          </h1>
          <div className="w-24 h-px bg-neutral-600 mx-auto mb-8" />
          <p className="text-neutral-400 text-lg font-serif italic max-w-lg mx-auto mb-12 leading-relaxed">
            Inspired by 1940s cinema. Built with extreme contrast, dramatic
            light, and the restrained elegance of monochrome.
          </p>
          <button className="group relative px-10 py-4 bg-neutral-100 text-neutral-950 font-serif italic tracking-widest text-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 overflow-hidden">
            <LightShaft intensity="via-white/60" />
            <span className="relative z-10">Begin Investigation</span>
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. CASE FILES (showcase cards)                               */}
      {/* ============================================================ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-neutral-500 text-xs uppercase tracking-[0.3em] mb-3 text-center">
              The Archive
            </p>
            <h2 className="text-3xl md:text-5xl font-serif italic text-neutral-100 text-center mb-4">
              Case Files
            </h2>
            <div className="w-16 h-[2px] bg-[#c41e3a] mx-auto mb-16" />
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseFiles.map((file, i) => (
              <RevealBlock key={file.number} delay={i * 0.12}>
                <CaseCard {...file} />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. COMPONENT DEMOS (tab-switched)                           */}
      {/* ============================================================ */}
      <section id="components" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-neutral-500 text-xs uppercase tracking-[0.3em] mb-3 text-center">
              Building Blocks
            </p>
            <h2 className="text-3xl md:text-5xl font-serif italic text-neutral-100 text-center mb-4">
              Component Gallery
            </h2>
            <div className="w-16 h-[2px] bg-[#c41e3a] mx-auto mb-12" />
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {componentTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-2 text-xs uppercase tracking-[0.15em] border transition-colors duration-500 ${
                    activeTab === tab.key
                      ? "bg-neutral-100 text-neutral-950 border-neutral-100"
                      : "bg-transparent text-neutral-500 border-neutral-700 hover:text-neutral-200 hover:border-neutral-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Buttons tab */}
          {activeTab === "buttons" && (
            <RevealBlock>
              <div className="space-y-12">
                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-6">
                    Primary - Light Shaft Sweep
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="group relative px-6 py-3 bg-neutral-950 text-neutral-100 border border-neutral-700 font-serif italic tracking-widest hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 overflow-hidden">
                      <LightShaft />
                      <span className="relative z-10">Investigate</span>
                    </button>
                    <button className="group relative px-6 py-3 bg-transparent text-neutral-300 border border-neutral-600 font-serif italic tracking-widest hover:border-neutral-200 hover:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 overflow-hidden">
                      <LightShaft intensity="via-white/15" />
                      <span className="relative z-10">Read More</span>
                    </button>
                    <button className="group relative px-6 py-3 bg-[#c41e3a] text-white font-serif italic tracking-widest hover:bg-[#a01830] focus:outline-none focus:ring-2 focus:ring-[#c41e3a] focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 overflow-hidden">
                      <LightShaft intensity="via-white/20" />
                      <span className="relative z-10">Confess</span>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-6">
                    Inverted Primary
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="group relative px-8 py-4 bg-neutral-100 text-neutral-950 font-serif italic tracking-widest text-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 overflow-hidden">
                      <LightShaft intensity="via-white/60" />
                      <span className="relative z-10">
                        Open the Case
                      </span>
                    </button>
                    <button className="group relative px-8 py-4 bg-[#d4af37] text-neutral-950 font-serif italic tracking-widest text-sm hover:bg-[#c49f2f] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 overflow-hidden">
                      <LightShaft intensity="via-white/40" />
                      <span className="relative z-10">
                        Gold Evidence
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-6">
                    Icon Buttons
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="group relative w-12 h-12 bg-neutral-900 border border-neutral-700 flex items-center justify-center hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 overflow-hidden text-neutral-300">
                      <LightShaft />
                      <span className="relative z-10">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </span>
                    </button>
                    <button className="group relative w-12 h-12 bg-neutral-900 border border-neutral-700 flex items-center justify-center hover:bg-neutral-100 hover:text-neutral-950 hover:border-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 overflow-hidden text-neutral-300">
                      <LightShaft />
                      <span className="relative z-10">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards tab */}
          {activeTab === "cards" && (
            <RevealBlock>
              <div className="space-y-12">
                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-6">
                    Case File Cards
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CaseCard
                      number="#101"
                      title="The Stolen Manuscript"
                      excerpt="An original Hemingway draft vanished from a locked vault. The insurance payout was three times its auction value."
                      date="March 1948"
                      status="Active"
                    />
                    <CaseCard
                      number="#102"
                      title="Harbor Lights"
                      excerpt="The lighthouse keeper saw something that night. He was willing to talk, for a price no one could afford."
                      date="June 1948"
                      status="Cold"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-6">
                    Evidence Card
                  </p>
                  <div className="group relative bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-600 transition-colors duration-700 max-w-md">
                    <VenetianBlinds />
                    <div className="relative p-6">
                      <div className="w-full h-48 bg-neutral-800 mb-6 overflow-hidden">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
                      </div>
                      <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-2">
                        Evidence #A-7
                      </p>
                      <h3 className="text-neutral-100 text-lg font-serif italic mb-2 group-hover:text-white transition-colors duration-500">
                        The Photograph
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-500">
                        Found in the suspect&apos;s jacket. Partially
                        burned at the edges.
                      </p>
                      <CrimsonBleed />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-6">
                    Quote Card
                  </p>
                  <div className="group relative bg-neutral-900 border border-neutral-800 p-10 overflow-hidden hover:border-neutral-600 transition-colors duration-700 max-w-xl">
                    <VenetianBlinds />
                    <div className="absolute -top-10 -left-10 w-32 h-64 bg-gradient-to-b from-white/5 to-transparent rotate-45 group-hover:from-white/10 transition-all duration-700 pointer-events-none" />
                    <div className="relative">
                      <span className="text-[#c41e3a] text-6xl font-serif italic leading-none block mb-4">
                        &ldquo;
                      </span>
                      <p className="text-neutral-200 text-xl font-serif italic leading-relaxed mb-6 group-hover:text-white transition-colors duration-500">
                        In this city, the truth is just another rumor
                        that nobody believes.
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-neutral-600" />
                        <span className="text-neutral-500 text-xs uppercase tracking-[0.2em]">
                          Detective Marlowe
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Inputs tab */}
          {activeTab === "inputs" && (
            <RevealBlock>
              <div className="space-y-12 max-w-lg mx-auto">
                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-6">
                    Subject Interrogation Form
                  </p>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-neutral-400 text-xs uppercase tracking-[0.2em] font-serif">
                        Subject Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-neutral-950 border-b border-neutral-700 text-neutral-100 font-serif placeholder:text-neutral-600 focus:outline-none focus:border-neutral-300 focus:ring-0 transition-colors duration-500"
                        placeholder="Enter name..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-neutral-400 text-xs uppercase tracking-[0.2em] font-serif">
                        Last Known Location
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-neutral-950 border-b border-neutral-700 text-neutral-100 font-serif placeholder:text-neutral-600 focus:outline-none focus:border-neutral-300 focus:ring-0 transition-colors duration-500"
                        placeholder="Address or district..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-neutral-400 text-xs uppercase tracking-[0.2em] font-serif">
                        Case Notes
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 text-neutral-100 font-serif placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 focus:ring-0 transition-colors duration-500 resize-none"
                        placeholder="Additional observations..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-neutral-400 text-xs uppercase tracking-[0.2em] font-serif">
                        Priority
                      </label>
                      <select className="w-full px-4 py-3 bg-neutral-950 border-b border-neutral-700 text-neutral-100 font-serif focus:outline-none focus:border-neutral-300 focus:ring-0 transition-colors duration-500 appearance-none">
                        <option value="">Select priority...</option>
                        <option value="urgent">Urgent - Red File</option>
                        <option value="high">High - Active Case</option>
                        <option value="standard">Standard - Pending Review</option>
                        <option value="cold">Cold - Archived</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button className="group relative px-8 py-3 bg-neutral-100 text-neutral-950 font-serif italic tracking-widest text-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-950 active:scale-[0.98] transition-colors duration-500 overflow-hidden">
                      <LightShaft intensity="via-white/60" />
                      <span className="relative z-10">
                        Submit Report
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Scenes tab */}
          {activeTab === "scenes" && (
            <RevealBlock>
              <div className="space-y-12">
                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-6">
                    Atmospheric Scenes
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ScenePanel
                      title="The Interrogation Room"
                      subtitle="Scene I"
                      gradient="bg-gradient-to-br from-neutral-900 via-neutral-950 to-black"
                    />
                    <ScenePanel
                      title="Rain on the Window"
                      subtitle="Scene II"
                      gradient="bg-gradient-to-tl from-neutral-800 via-neutral-950 to-black"
                    />
                    <ScenePanel
                      title="Midnight Alley"
                      subtitle="Scene III"
                      gradient="bg-gradient-to-tr from-[#c41e3a]/10 via-neutral-950 to-black"
                    />
                    <ScenePanel
                      title="The Final Reveal"
                      subtitle="Scene IV"
                      gradient="bg-gradient-to-b from-[#d4af37]/10 via-neutral-950 to-black"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-6">
                    Spotlight Hero
                  </p>
                  <div className="group relative h-80 bg-[#0a0a0a] overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-colors duration-700">
                    <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent,transparent_80px,rgba(0,0,0,0.3)_80px,rgba(0,0,0,0.3)_82px)] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a0a_100%)] pointer-events-none" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-center">
                      <p className="text-neutral-500 text-xs uppercase tracking-[0.4em] mb-4">
                        Act Three
                      </p>
                      <h3 className="text-4xl font-serif italic text-neutral-100 group-hover:text-white transition-colors duration-500">
                        The Confession
                      </h3>
                      <div className="w-16 h-[2px] bg-[#c41e3a] mt-6 group-hover:w-32 transition-all duration-700 ease-out" />
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. COLOR PALETTE                                            */}
      {/* ============================================================ */}
      <section id="palette" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-neutral-500 text-xs uppercase tracking-[0.3em] mb-3 text-center">
              The Palette
            </p>
            <h2 className="text-3xl md:text-5xl font-serif italic text-neutral-100 text-center mb-4">
              Shades of Noir
            </h2>
            <div className="w-16 h-[2px] bg-[#c41e3a] mx-auto mb-16" />
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {colorPalette.map((color) => (
                <div key={color.hex} className="group">
                  <div
                    className="aspect-square border border-neutral-800 group-hover:border-neutral-600 transition-colors duration-500 flex items-end p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className={`text-xs uppercase tracking-[0.1em] ${color.text} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-xs mt-2 tracking-wide">
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-900 border border-neutral-800 p-6">
                <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-3">
                  Primary Accent
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#c41e3a]" />
                  <span className="text-neutral-200 font-serif italic">
                    Crimson -- #c41e3a
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mt-2">
                  Used sparingly for emphasis. Blood lines, danger accents,
                  active states.
                </p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-6">
                <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-3">
                  Secondary Accent
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#8b7355]" />
                  <span className="text-neutral-200 font-serif italic">
                    Bourbon -- #8b7355
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mt-2">
                  Warm aged tone. Used for vintage texture, old paper,
                  background accents.
                </p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-6">
                <p className="text-neutral-500 text-xs uppercase tracking-[0.2em] mb-3">
                  Tertiary Accent
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#d4af37]" />
                  <span className="text-neutral-200 font-serif italic">
                    Gold -- #d4af37
                  </span>
                </div>
                <p className="text-neutral-500 text-sm mt-2">
                  Luxury highlights. Used for awards, premium badges, rare
                  emphasis.
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. DESIGN RULES                                             */}
      {/* ============================================================ */}
      <section id="rules" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-neutral-500 text-xs uppercase tracking-[0.3em] mb-3 text-center">
              The Code
            </p>
            <h2 className="text-3xl md:text-5xl font-serif italic text-neutral-100 text-center mb-4">
              Rules of Noir
            </h2>
            <div className="w-16 h-[2px] bg-[#c41e3a] mx-auto mb-16" />
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealBlock delay={0.1}>
              <div>
                <h3 className="text-neutral-100 font-serif italic text-xl mb-6">
                  Commandments
                </h3>
                <ul className="space-y-4">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-[2px] bg-neutral-100 flex-shrink-0" />
                      <span className="text-neutral-400 text-sm leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div>
                <h3 className="text-[#c41e3a] font-serif italic text-xl mb-6">
                  Prohibitions
                </h3>
                <ul className="space-y-4">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-[2px] bg-[#c41e3a] flex-shrink-0" />
                      <span className="text-neutral-400 text-sm leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer className="py-16 px-6 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto text-center">
          <RevealBlock>
            <p className="text-neutral-500 text-xs uppercase tracking-[0.3em] mb-4">
              Film Noir Style
            </p>
            <p className="text-neutral-600 text-sm font-serif italic max-w-md mx-auto">
              Inspired by the dramatic shadows and moral ambiguity of 1940s
              cinema. Every element serves the story.
            </p>
            <div className="w-12 h-[2px] bg-[#c41e3a] mx-auto mt-8" />
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
