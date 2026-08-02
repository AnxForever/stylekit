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
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Color palette data                                                 */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Ink Black",     hex: "#1a1a1a", label: "Primary"  },
  { name: "Paper White",   hex: "#fafafa", label: "Secondary" },
  { name: "Editorial Red", hex: "#e63946", label: "Accent 1"  },
  { name: "Teal Press",    hex: "#2a9d8f", label: "Accent 2"  },
  { name: "Amber Ink",     hex: "#e9c46a", label: "Accent 3"  },
  { name: "Midnight",      hex: "#264653", label: "Accent 4"  },
];

/* ------------------------------------------------------------------ */
/*  Article / category data                                            */
/* ------------------------------------------------------------------ */

type Category = "Technology" | "Business" | "Culture" | "Opinion" | "Science";

const categoryColors: Record<Category, { text: string; bg: string }> = {
  Technology: { text: "#2a9d8f", bg: "#f0faf9" },
  Business:   { text: "#e63946", bg: "#fef2f2" },
  Culture:    { text: "#e9c46a", bg: "#fffbeb" },
  Opinion:    { text: "#264653", bg: "#f0f4f6" },
  Science:    { text: "#2a9d8f", bg: "#f0faf9" },
};

interface Article {
  id: number;
  category: Category;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  imageBg: string;
}

const articles: Article[] = [
  {
    id: 1,
    category: "Technology",
    title: "The Architecture of Modern AI Systems: A Deep Dive into Transformer Networks",
    excerpt: "Large language models have fundamentally changed how we approach software architecture. This investigation examines the infrastructure powering today's most capable systems and what it means for future development.",
    author: "Elena Marchetti",
    date: "Feb 21, 2026",
    readTime: "12 min read",
    imageBg: "linear-gradient(135deg, #264653 0%, #2a9d8f 60%, #1a1a1a 100%)",
  },
  {
    id: 2,
    category: "Business",
    title: "The New Economics of Remote Work",
    excerpt: "How distributed teams are reshaping corporate real estate and productivity benchmarks.",
    author: "Marco Delgado",
    date: "Feb 20, 2026",
    readTime: "6 min read",
    imageBg: "linear-gradient(135deg, #e63946 0%, #264653 100%)",
  },
  {
    id: 3,
    category: "Culture",
    title: "Tokyo's Underground Design Scene",
    excerpt: "Inside the ateliers and studios redefining Japanese graphic identity for a global audience.",
    author: "Yuki Tanaka",
    date: "Feb 19, 2026",
    readTime: "8 min read",
    imageBg: "linear-gradient(135deg, #e9c46a 0%, #e63946 100%)",
  },
  {
    id: 4,
    category: "Opinion",
    title: "Why Print Still Matters in a Screen-Saturated World",
    excerpt: "An argument for the enduring relevance of paper, ink, and careful typography.",
    author: "Sarah Collins",
    date: "Feb 18, 2026",
    readTime: "4 min read",
    imageBg: "linear-gradient(135deg, #1a1a1a 0%, #264653 100%)",
  },
  {
    id: 5,
    category: "Science",
    title: "Climate Models Achieve Record Accuracy",
    excerpt: "New computational approaches close the gap between prediction and measured reality.",
    author: "Prof. Hiroshi Ono",
    date: "Feb 17, 2026",
    readTime: "7 min read",
    imageBg: "linear-gradient(135deg, #2a9d8f 0%, #264653 100%)",
  },
];

const navCategories = ["All", "Technology", "Business", "Culture", "Opinion", "Science"] as const;
type NavCategory = (typeof navCategories)[number];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeNav, setActiveNav] = useState<NavCategory>("All");
  const [activeComponentTab, setActiveComponentTab] = useState<"card" | "button" | "nav" | "input">("card");
  const [hoveredSwatchIdx, setHoveredSwatchIdx] = useState<number | null>(null);

  // aiRule 1: Color Awakening
  const [colorAwakeningActive, setColorAwakeningActive] = useState(false);
  const [colorAwakeningHoveredId, setColorAwakeningHoveredId] = useState<number | null>(null);

  // aiRule 2: Editorial Stretch (hover tracked per-row via category key)
  const [stretchHoveredCat, setStretchHoveredCat] = useState<Category | null>(null);

  // aiRule 3: Crisp Typographic Shift
  const [typoDemoHovered, setTypoDemoHovered] = useState(false);
  const [typoGlowHovered, setTypoGlowHovered] = useState(false);

  // aiRule 4: Readability First
  const [readabilityAnimOn, setReadabilityAnimOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filteredArticles =
    activeNav === "All" ? articles : articles.filter((a) => a.category === activeNav);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes mg-breaking {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mg-breaking-ticker {
          animation: mg-breaking 24s linear infinite;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/95 backdrop-blur-sm border-b-2 border-[#1a1a1a]">
        {/* Breaking news ticker */}
        <div className="bg-[#e63946] text-white text-xs font-semibold py-1 overflow-hidden">
          <div className="flex whitespace-nowrap">
            <div className="mg-breaking-ticker flex gap-12 pr-12">
              <span className="uppercase tracking-wider">Breaking:</span>
              <span>Magazine Grid Layout System — Editorial CSS Grid for Modern Publishing</span>
              <span className="text-white/60">|</span>
              <span>4-Column Desktop Grid with 2x2 Featured Span</span>
              <span className="text-white/60">|</span>
              <span>Color Awakening, Editorial Stretch, Crisp Typographic Shift</span>
              <span className="text-white/60">|</span>
              <span>Content First, Grid Second: The Magazine Philosophy</span>
              <span className="text-white/60">|</span>
            </div>
            <div className="mg-breaking-ticker flex gap-12 pr-12" aria-hidden="true">
              <span className="uppercase tracking-wider">Breaking:</span>
              <span>Magazine Grid Layout System — Editorial CSS Grid for Modern Publishing</span>
              <span className="text-white/60">|</span>
              <span>4-Column Desktop Grid with 2x2 Featured Span</span>
              <span className="text-white/60">|</span>
              <span>Color Awakening, Editorial Stretch, Crisp Typographic Shift</span>
              <span className="text-white/60">|</span>
              <span>Content First, Grid Second: The Magazine Philosophy</span>
              <span className="text-white/60">|</span>
            </div>
          </div>
        </div>

        {/* Main masthead */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <GridIcon className="w-5 h-5 text-[#e63946]" />
            <span className="text-lg font-black tracking-tight uppercase">
              Magazine<span className="text-[#e63946]">Grid</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Palette", href: "#palette" },
              { label: "Grid Demo", href: "#grid-demo" },
              { label: "Components", href: "#components" },
              { label: "aiRules", href: "#ai-rules" },
              { label: "Philosophy", href: "#philosophy" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#1a1a1a] hover:bg-zinc-100 transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href="/styles/magazine-grid"
            data-back-navigation="true"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a1a] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#e63946] transition-colors duration-200"
          >
            <span>←</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="pt-28 pb-20 px-5 md:px-10 border-b-2 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">

          {/* Masthead headline */}
          <div className="text-center mb-12">
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0s",
              }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-[#e63946]">
                <span className="w-2 h-2 rounded-full bg-[#e63946] inline-block" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e63946]">
                  Style Showcase
                </span>
              </div>
            </div>

            <h1
              className="text-6xl md:text-8xl lg:text-[108px] font-black leading-[0.9] tracking-tight mb-6 uppercase"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(28px)",
                transition:
                  "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              Magazine
              <br />
              <span className="text-[#e63946]">Grid</span>
            </h1>

            <div
              className="max-w-2xl mx-auto"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s",
              }}
            >
              <p className="text-zinc-500 text-lg leading-relaxed border-l-4 border-[#e63946] pl-4 text-left">
                Inspired by print magazine typography and grid theory. Multiple column layouts, varied
                card sizes, editorial hierarchy — all in a responsive CSS grid system built for
                content-first publishing.
              </p>
            </div>
          </div>

          {/* Hero stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#1a1a1a] mb-12"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            {[
              { value: "4",    label: "Column Grid",    sub: "desktop layout" },
              { value: "4",    label: "aiRules",        sub: "interaction patterns" },
              { value: "2×2",  label: "Featured Span",  sub: "hero card area" },
              { value: "100%", label: "Responsive",     sub: "mobile to desktop" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`p-6 text-center group cursor-default hover:bg-[#1a1a1a] transition-colors duration-200 ${
                  i < 3 ? "border-r border-[#1a1a1a]" : ""
                }`}
              >
                <div className="text-3xl font-black mb-1 group-hover:text-[#e63946] transition-colors duration-200">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors duration-200">
                  {stat.label}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5 group-hover:text-zinc-300 transition-colors duration-200">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Category nav */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            <nav className="flex items-center gap-0 border-b-2 border-[#1a1a1a] overflow-x-auto">
              {navCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveNav(cat)}
                  className={`py-3 px-5 text-sm font-semibold uppercase tracking-wider whitespace-nowrap border-r border-[#1a1a1a] last:border-r-0 transition-colors duration-150 ${
                    activeNav === cat
                      ? "bg-[#1a1a1a] text-white"
                      : "text-zinc-500 hover:text-[#1a1a1a] hover:bg-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          {/* Magazine grid */}
          <div className="mt-8">
            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center text-zinc-400 font-semibold uppercase tracking-wider">
                No articles in this category
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Featured 2×2 */}
                {filteredArticles[0] && (
                  <article className="lg:col-span-2 lg:row-span-2 group cursor-pointer">
                    <div className="relative h-full min-h-[320px] lg:min-h-[480px] overflow-hidden">
                      <div
                        className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
                        style={{ background: filteredArticles[0].imageBg }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-black uppercase tracking-wider bg-[#e63946] text-white">
                          Featured
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-3 group/label">
                          <span className="text-xs font-black uppercase tracking-wider text-[#e9c46a]">
                            {filteredArticles[0].category}
                          </span>
                          <span
                            className="block h-px bg-[#e9c46a] transition-all duration-300 ease-out group-hover/label:w-12"
                            style={{ width: "16px" }}
                          />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight group-hover:text-[#e63946] transition-colors duration-200 ease-out">
                          {filteredArticles[0].title}
                        </h2>
                        <p className="text-white/70 text-sm mb-4 line-clamp-2">
                          {filteredArticles[0].excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-white/50">
                          <span>{filteredArticles[0].author}</span>
                          <span>·</span>
                          <ClockIcon className="w-3 h-3" />
                          <span>{filteredArticles[0].readTime}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                )}

                {/* Regular cards */}
                {filteredArticles.slice(1).map((article) => {
                  const cat = categoryColors[article.category];
                  return (
                    <article key={article.id} className="group cursor-pointer">
                      <div className="relative overflow-hidden mb-3">
                        <div
                          className="w-full h-44 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                          style={{ background: article.imageBg }}
                        />
                        <span
                          className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                          style={{ backgroundColor: cat.text, color: "#fff" }}
                        >
                          {article.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs font-black uppercase tracking-wider"
                          style={{ color: cat.text }}
                        >
                          {article.category}
                        </span>
                        <span
                          className="block h-px transition-all duration-300 ease-out group-hover:w-12"
                          style={{ width: "16px", backgroundColor: cat.text }}
                        />
                      </div>
                      <h3 className="text-base font-black leading-snug mb-2 group-hover:text-[#e63946] transition-colors duration-200 ease-out line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-zinc-500 text-sm line-clamp-2 mb-2">{article.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span>{article.author}</span>
                        <span>·</span>
                        <ClockIcon className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 border-b-2 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e63946] block mb-3">
              Color System
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
              Editorial
              <br />
              <span className="text-[#e63946]">Palette</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-12">
            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed border-l-4 border-zinc-300 pl-4">
              Two neutrals anchor the grid — ink black and paper white. Four accent colors
              correspond to content categories, each carrying distinct editorial weight.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-[#1a1a1a]">
              {palette.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="group cursor-default"
                  onMouseEnter={() => setHoveredSwatchIdx(i)}
                  onMouseLeave={() => setHoveredSwatchIdx(null)}
                  style={{ borderRight: i < 5 ? "1px solid #1a1a1a" : "none" }}
                >
                  <div
                    className="h-36 transition-transform duration-300 origin-bottom"
                    style={{
                      backgroundColor: swatch.hex,
                      transform: hoveredSwatchIdx === i ? "scaleY(1.1)" : "scaleY(1)",
                      border: swatch.hex === "#fafafa" ? "1px solid #e5e7eb" : "none",
                    }}
                  />
                  <div className="p-3 border-t border-[#1a1a1a]">
                    <div className="text-xs font-bold mb-0.5">{swatch.name}</div>
                    <div className="text-[10px] font-mono text-zinc-400">{swatch.hex}</div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mt-1">
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Category color assignment */}
          <RevealBlock delay={0.18} className="mt-8">
            <div className="border border-[#1a1a1a] p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-5">
                Category color assignment
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {(
                  Object.entries(categoryColors) as [Category, { text: string; bg: string }][]
                ).map(([cat, col]) => (
                  <div key={cat} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: col.text }} />
                    <div>
                      <div className="text-xs font-bold" style={{ color: col.text }}>
                        {cat}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400">{col.text}</div>
                    </div>
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
      <section id="components" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 border-b-2 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2a9d8f] block mb-3">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
              Editorial
              <br />
              <span className="text-[#2a9d8f]">Building Blocks</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-10">
            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed border-l-4 border-zinc-300 pl-4">
              Each component inherits editorial principles — strict typographic hierarchy, category
              color coding, and purposeful whitespace.
            </p>
          </RevealBlock>

          {/* Tab selector */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex items-center gap-0 border border-[#1a1a1a] w-fit">
              {(["card", "button", "nav", "input"] as const).map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveComponentTab(tab)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 ${
                    i < 3 ? "border-r border-[#1a1a1a]" : ""
                  } ${
                    activeComponentTab === tab
                      ? "bg-[#1a1a1a] text-white"
                      : "text-zinc-500 hover:bg-zinc-100 hover:text-[#1a1a1a]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.14}>
            <div className="border border-[#1a1a1a] p-8 md:p-12 bg-white">

              {/* CARD TAB */}
              {activeComponentTab === "card" && (
                <div className="space-y-8">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                    Article card — standard grid cell with all three interaction rules
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.slice(1, 4).map((article) => {
                      const cat = categoryColors[article.category];
                      return (
                        <article key={article.id} className="group cursor-pointer">
                          <div className="relative overflow-hidden mb-3">
                            <div
                              className="w-full h-40 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                              style={{ background: article.imageBg }}
                            />
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="text-xs font-bold uppercase tracking-wider"
                              style={{ color: cat.text }}
                            >
                              {article.category}
                            </span>
                            <span
                              className="block h-px transition-all duration-300 ease-out group-hover:w-12"
                              style={{ width: "16px", backgroundColor: cat.text }}
                            />
                          </div>
                          <h3 className="text-base font-black leading-snug mb-2 group-hover:text-[#e63946] transition-colors duration-200 ease-out line-clamp-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <span>{article.author}</span>
                            <span>·</span>
                            <span>{article.readTime}</span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  <div className="border-t border-zinc-100 pt-4">
                    <p className="text-xs text-zinc-400 font-mono">
                      group + grayscale-[20%] + group-hover:grayscale-0 + group-hover:scale-105 + group-hover:text-[#e63946]
                    </p>
                  </div>
                </div>
              )}

              {/* BUTTON TAB */}
              {activeComponentTab === "button" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-6">
                      Category label button — with Editorial Stretch decoration line
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                      {(
                        Object.entries(categoryColors) as [Category, { text: string; bg: string }][]
                      ).map(([cat, col]) => (
                        <div key={cat} className="group flex items-center gap-2 cursor-pointer">
                          <span
                            className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded"
                            style={{ color: col.text, backgroundColor: col.bg }}
                          >
                            {cat}
                          </span>
                          <span
                            className="block h-px transition-all duration-300 ease-out group-hover:w-12"
                            style={{ width: "16px", backgroundColor: col.text }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-6">
                      Action buttons — editorial style
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1a1a1a] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#e63946] transition-colors duration-200">
                        Read More
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                      <button className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm font-bold uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200">
                        Subscribe
                      </button>
                      <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#e63946] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#c1121f] transition-colors duration-200">
                        Featured
                      </button>
                      <button className="text-sm font-bold uppercase tracking-wider text-zinc-500 hover:text-[#e63946] transition-colors duration-200 border-b border-transparent hover:border-[#e63946]">
                        View All →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* NAV TAB */}
              {activeComponentTab === "nav" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-5">
                      Category navigation — border-bottom indicator
                    </p>
                    <nav className="flex items-center gap-0 border-b-2 border-zinc-200 overflow-x-auto">
                      {navCategories.map((cat) => (
                        <button
                          key={cat}
                          className={`py-3 px-5 text-sm font-bold uppercase tracking-wider whitespace-nowrap border-b-2 -mb-0.5 transition-colors duration-150 ${
                            cat === "All"
                              ? "text-[#e63946] border-[#e63946]"
                              : "text-zinc-500 border-transparent hover:text-[#1a1a1a] hover:border-zinc-300"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-5">
                      Masthead header pattern
                    </p>
                    <div className="border-2 border-[#1a1a1a]">
                      <div className="bg-[#e63946] text-white text-xs font-semibold py-1 px-4 uppercase tracking-wider">
                        Breaking News
                      </div>
                      <div className="px-4 h-12 flex items-center justify-between border-b border-zinc-200">
                        <span className="font-black text-lg uppercase tracking-tight">
                          The <span className="text-[#e63946]">Daily</span>
                        </span>
                        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                          <span className="hidden md:block hover:text-[#e63946] cursor-pointer transition-colors">World</span>
                          <span className="hidden md:block hover:text-[#e63946] cursor-pointer transition-colors">Tech</span>
                          <span className="hidden md:block hover:text-[#e63946] cursor-pointer transition-colors">Culture</span>
                          <span className="px-3 py-1 bg-[#1a1a1a] text-white hover:bg-[#e63946] cursor-pointer transition-colors">Subscribe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* INPUT TAB */}
              {activeComponentTab === "input" && (
                <div className="space-y-8">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-6">
                    Search and form inputs — editorial style
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                          Search Articles
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full px-4 py-3 pr-12 bg-zinc-50 border-0 border-b-2 border-[#1a1a1a] text-[#1a1a1a] text-sm placeholder-zinc-400 focus:outline-none focus:border-[#e63946] transition-colors duration-200"
                          />
                          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                          Newsletter Signup
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-zinc-50 border-0 border-b-2 border-[#1a1a1a] text-[#1a1a1a] text-sm placeholder-zinc-400 focus:outline-none focus:border-[#e63946] transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                          Filter by Category
                        </label>
                        <select className="w-full px-4 py-3 bg-zinc-50 border-0 border-b-2 border-[#1a1a1a] text-[#1a1a1a] text-sm focus:outline-none focus:border-[#e63946] transition-colors duration-200">
                          <option>All Categories</option>
                          <option>Technology</option>
                          <option>Business</option>
                          <option>Culture</option>
                          <option>Opinion</option>
                        </select>
                      </div>
                      <div className="pt-2">
                        <button className="w-full py-3 bg-[#1a1a1a] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#e63946] transition-colors duration-200">
                          Subscribe to Newsletter
                        </button>
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
      {/* 5. AIRULES INTERACTIVE DEMOS                                     */}
      {/* ================================================================ */}
      <section id="ai-rules" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 bg-[#1a1a1a] border-b-2 border-[#e63946]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e63946] block mb-3">
              aiRules — Interaction Patterns
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight text-white">
              4 Named
              <br />
              <span className="text-[#e63946]">Interaction Rules</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-zinc-400 text-lg max-w-xl leading-relaxed border-l-4 border-[#e63946] pl-4">
              These are the codified behavior rules for Magazine Grid. Interact with each demo to
              see the rule in action — and understand exactly what the AI should generate.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ---- aiRule 1: Color Awakening ---- */}
            <RevealBlock delay={0.08}>
              <div className="bg-zinc-900 border border-zinc-700 p-8 h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-[#e63946] text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                      Rule 01
                    </span>
                    <h3 className="text-xl font-black text-white uppercase">Color Awakening</h3>
                  </div>
                  <button
                    onClick={() => setColorAwakeningActive((v) => !v)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                      colorAwakeningActive
                        ? "bg-[#e63946] text-white"
                        : "border border-zinc-600 text-zinc-400 hover:border-zinc-400 hover:text-white"
                    }`}
                  >
                    {colorAwakeningActive ? "Grayscale ON" : "Grayscale OFF"}
                  </button>
                </div>
                <p className="text-zinc-400 text-sm mb-2 leading-relaxed">
                  Images default to{" "}
                  <code className="text-[#e9c46a] font-mono text-xs">grayscale-[20%]</code>. On
                  hover: full color restores instantly and image scales to 1.05.
                </p>
                <p className="text-zinc-500 text-xs font-mono mb-6">
                  group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {articles.slice(1, 5).map((article) => {
                    const cat = categoryColors[article.category];
                    const isHovered = colorAwakeningHoveredId === article.id;
                    return (
                      <div
                        key={article.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setColorAwakeningHoveredId(article.id)}
                        onMouseLeave={() => setColorAwakeningHoveredId(null)}
                      >
                        <div
                          className="h-24 w-full transition-all duration-500 ease-out"
                          style={{
                            background: article.imageBg,
                            filter: colorAwakeningActive
                              ? isHovered
                                ? "grayscale(0)"
                                : "grayscale(0.2)"
                              : "grayscale(0)",
                            transform: isHovered ? "scale(1.05)" : "scale(1)",
                          }}
                        />
                        <div
                          className="text-[10px] font-bold uppercase tracking-wider mt-1"
                          style={{ color: cat.text }}
                        >
                          {article.category}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-zinc-500 text-xs">
                  {colorAwakeningActive
                    ? "Grayscale ON — hover a card to awaken its color"
                    : "Toggle button to enable grayscale mode, then hover"}
                </p>
              </div>
            </RevealBlock>

            {/* ---- aiRule 2: Editorial Stretch ---- */}
            <RevealBlock delay={0.12}>
              <div className="bg-zinc-900 border border-zinc-700 p-8 h-full">
                <div className="mb-4">
                  <span className="inline-block px-2 py-0.5 bg-[#2a9d8f] text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                    Rule 02
                  </span>
                  <h3 className="text-xl font-black text-white uppercase">Editorial Stretch</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-2 leading-relaxed">
                  A horizontal decoration line next to the category label extends from{" "}
                  <code className="text-[#e9c46a] font-mono text-xs">w-4</code> to{" "}
                  <code className="text-[#e9c46a] font-mono text-xs">w-12</code> on hover,
                  extending the typographic skeleton.
                </p>
                <p className="text-zinc-500 text-xs font-mono mb-6">
                  w-4 h-px group-hover:w-12 transition-all duration-300 ease-out
                </p>

                <div className="space-y-3">
                  {(
                    Object.entries(categoryColors) as [Category, { text: string; bg: string }][]
                  ).map(([cat, col]) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between py-2 cursor-pointer"
                      onMouseEnter={() => setStretchHoveredCat(cat)}
                      onMouseLeave={() => setStretchHoveredCat(null)}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold uppercase tracking-wider px-2 py-0.5"
                          style={{ color: col.text, backgroundColor: col.bg }}
                        >
                          {cat}
                        </span>
                        <span
                          className="block h-px transition-all duration-300 ease-out"
                          style={{
                            width: stretchHoveredCat === cat ? "48px" : "16px",
                            backgroundColor: col.text,
                          }}
                        />
                      </div>
                      <span className="text-zinc-600 text-xs">hover to stretch →</span>
                    </div>
                  ))}
                </div>
                <p className="text-zinc-500 text-xs mt-4">
                  Hover each row to see the decoration line extend from 16px to 48px
                </p>
              </div>
            </RevealBlock>

            {/* ---- aiRule 3: Crisp Typographic Shift ---- */}
            <RevealBlock delay={0.16}>
              <div className="bg-zinc-900 border border-zinc-700 p-8 h-full">
                <div className="mb-4">
                  <span className="inline-block px-2 py-0.5 bg-[#e9c46a] text-[#1a1a1a] text-[10px] font-bold uppercase tracking-wider mb-2">
                    Rule 03
                  </span>
                  <h3 className="text-xl font-black text-white uppercase">Crisp Typographic Shift</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-2 leading-relaxed">
                  Titles switch directly to{" "}
                  <code className="text-[#e9c46a] font-mono text-xs">#e63946</code> on hover — no
                  glow, no shadow, no fade. Direct color swap with{" "}
                  <code className="text-[#e9c46a] font-mono text-xs">duration-200 ease-out</code>.
                </p>
                <p className="text-zinc-500 text-xs font-mono mb-6">
                  group-hover:text-[#e63946] transition-colors duration-200 ease-out
                </p>

                <div className="space-y-4">
                  {/* Correct demo */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#2a9d8f] mb-2">
                      Correct — crisp direct color switch
                    </p>
                    <article
                      className="group cursor-pointer bg-zinc-800 p-4"
                      onMouseEnter={() => setTypoDemoHovered(true)}
                      onMouseLeave={() => setTypoDemoHovered(false)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#e63946]">
                          Technology
                        </span>
                        <span
                          className="block h-px transition-all duration-300 ease-out"
                          style={{
                            width: typoDemoHovered ? "48px" : "16px",
                            backgroundColor: "#e63946",
                          }}
                        />
                      </div>
                      <h3
                        className="text-base font-black leading-snug transition-colors duration-200 ease-out"
                        style={{ color: typoDemoHovered ? "#e63946" : "#ffffff" }}
                      >
                        The Architecture of Modern AI Systems: A Deep Dive
                      </h3>
                      <p className="text-zinc-500 text-xs mt-2">
                        {typoDemoHovered
                          ? "Color shifted — crisp, direct, editorial"
                          : "Hover to trigger the shift"}
                      </p>
                    </article>
                  </div>

                  {/* Wrong demo */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#e63946] mb-2">
                      Wrong — glow effect (banned by aiRules)
                    </p>
                    <article
                      className="group cursor-pointer bg-zinc-800 p-4"
                      onMouseEnter={() => setTypoGlowHovered(true)}
                      onMouseLeave={() => setTypoGlowHovered(false)}
                    >
                      <h3
                        className="text-base font-black leading-snug transition-all duration-300"
                        style={{
                          color: "#ffffff",
                          textShadow: typoGlowHovered
                            ? "0 0 20px #e63946, 0 0 40px #e63946aa"
                            : "none",
                        }}
                      >
                        The Architecture of Modern AI Systems: A Deep Dive
                      </h3>
                      <p className="text-zinc-500 text-xs mt-2">
                        {typoGlowHovered ? "Glow effect — messy, not editorial" : "Hover to see what NOT to do"}
                      </p>
                    </article>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- aiRule 4: Readability First ---- */}
            <RevealBlock delay={0.2}>
              <div className="bg-zinc-900 border border-zinc-700 p-8 h-full">
                <div className="mb-4">
                  <span className="inline-block px-2 py-0.5 bg-[#264653] text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                    Rule 04
                  </span>
                  <h3 className="text-xl font-black text-white uppercase">Readability First</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-2 leading-relaxed">
                  Body text paragraphs must NEVER have position-shifting animations. No translateY,
                  no slideIn. Only titles and images animate. Paragraphs stay stable for scan
                  efficiency.
                </p>
                <p className="text-zinc-500 text-xs font-mono mb-6">
                  {"/* paragraphs: NO transform, NO translate — text must be stable */"}
                </p>

                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setReadabilityAnimOn((v) => !v)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                      readabilityAnimOn
                        ? "bg-[#e63946] text-white"
                        : "bg-[#264653] text-white hover:bg-[#2a9d8f]"
                    }`}
                  >
                    {readabilityAnimOn ? "Animation ON (wrong)" : "Animation OFF (correct)"}
                  </button>
                  <span className="text-zinc-500 text-xs">toggle to compare</span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-black text-base leading-snug hover:text-[#e63946] transition-colors duration-200 ease-out cursor-pointer">
                    How Grid Theory Shapes Modern Publishing
                  </h4>
                  {[
                    "The Basel Grid System of 1961 codified what printers had known intuitively for centuries: visual hierarchy requires systematic constraint.",
                    "When content is organized into a predictable grid, readers can scan efficiently. The eye knows where to look next.",
                    "Magazine Grid applies these same print principles to the web — multiple columns, featured spans, consistent gutters — while remaining responsive.",
                  ].map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-zinc-400 text-sm leading-relaxed"
                      style={{
                        transform: readabilityAnimOn
                          ? `translateY(${(i + 1) * 5}px)`
                          : "translateY(0)",
                        opacity: readabilityAnimOn ? 0.5 : 1,
                        transition: "transform 0.4s ease, opacity 0.4s ease",
                        transitionDelay: readabilityAnimOn ? `${i * 0.08}s` : "0s",
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <p className="text-zinc-500 text-xs mt-4">
                  {readabilityAnimOn
                    ? "Paragraphs shifting = readers lose their place. Bad UX."
                    : "Paragraphs stable = correct. Only title animates on hover."}
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. FULL MAGAZINE GRID LAYOUT DEMO                               */}
      {/* ================================================================ */}
      <section id="grid-demo" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 border-b-2 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#264653] block mb-3">
              Grid Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
              Full Magazine
              <br />
              <span className="text-[#264653]">Grid Layout</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-12">
            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed border-l-4 border-zinc-300 pl-4">
              4-column desktop grid with a 2x2 featured article. All three interaction rules
              active: Color Awakening, Editorial Stretch, and Crisp Typographic Shift.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Featured 2×2 */}
              <article className="lg:col-span-2 lg:row-span-2 group cursor-pointer">
                <div className="relative h-full min-h-[300px] lg:min-h-[520px] overflow-hidden bg-[#1a1a1a]">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: articles[0].imageBg }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-[#e63946] text-white text-xs font-black uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3 group/label">
                      <span className="text-xs font-black uppercase tracking-wider text-[#e9c46a]">
                        {articles[0].category}
                      </span>
                      <span
                        className="block h-px bg-[#e9c46a] transition-all duration-300 ease-out group-hover/label:w-12"
                        style={{ width: "16px" }}
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight group-hover:text-[#e63946] transition-colors duration-200 ease-out">
                      {articles[0].title}
                    </h2>
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {articles[0].excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span>{articles[0].author}</span>
                      <span>·</span>
                      <span>{articles[0].date}</span>
                      <span>·</span>
                      <ClockIcon className="w-3 h-3" />
                      <span>{articles[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Regular articles */}
              {articles.slice(1).map((article) => {
                const cat = categoryColors[article.category];
                return (
                  <article key={article.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden mb-3">
                      <div
                        className="w-full h-48 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                        style={{ background: article.imageBg }}
                      />
                      <span
                        className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                        style={{ backgroundColor: cat.text, color: "#fff" }}
                      >
                        {article.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-black uppercase tracking-wider"
                        style={{ color: cat.text }}
                      >
                        {article.category}
                      </span>
                      <span
                        className="block h-px transition-all duration-300 ease-out group-hover:w-12"
                        style={{ width: "16px", backgroundColor: cat.text }}
                      />
                    </div>
                    <h3 className="text-base font-black leading-snug mb-2 group-hover:text-[#e63946] transition-colors duration-200 ease-out line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span>{article.author}</span>
                      <span>·</span>
                      <ClockIcon className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </RevealBlock>

          {/* Grid structure diagram */}
          <RevealBlock delay={0.18} className="mt-10">
            <div className="border border-[#1a1a1a] p-6 bg-zinc-50">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4">
                CSS Grid structure — desktop (lg:grid-cols-4)
              </p>
              <div className="grid grid-cols-4 grid-rows-2 gap-2 h-24 mb-5">
                <div className="col-span-2 row-span-2 bg-[#1a1a1a] flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                  Featured 2×2
                </div>
                <div className="bg-[#e63946]/20 border border-[#e63946]/40 flex items-center justify-center text-[10px] font-bold text-[#e63946] uppercase">
                  1×1
                </div>
                <div className="bg-[#2a9d8f]/20 border border-[#2a9d8f]/40 flex items-center justify-center text-[10px] font-bold text-[#2a9d8f] uppercase">
                  1×1
                </div>
                <div className="bg-[#e9c46a]/20 border border-[#e9c46a]/40 flex items-center justify-center text-[10px] font-bold text-[#e9c46a] uppercase">
                  1×1
                </div>
                <div className="bg-[#264653]/20 border border-[#264653]/40 flex items-center justify-center text-[10px] font-bold text-[#264653] uppercase">
                  1×1
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-xs text-zinc-500 font-mono">
                <div>
                  <span className="font-bold text-[#1a1a1a] not-italic">Desktop</span>
                  <br />
                  lg:grid-cols-4
                  <br />
                  featured: col-span-2 row-span-2
                </div>
                <div>
                  <span className="font-bold text-[#1a1a1a] not-italic">Tablet</span>
                  <br />
                  md:grid-cols-2
                  <br />
                  featured: col-span-2
                </div>
                <div>
                  <span className="font-bold text-[#1a1a1a] not-italic">Mobile</span>
                  <br />
                  grid-cols-1
                  <br />
                  all items: full width
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T DESIGN RULES                                       */}
      {/* ================================================================ */}
      <section id="philosophy" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10 border-b-2 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e9c46a] block mb-3">
              Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
              Design
              <br />
              <span className="text-[#e9c46a]">Rules</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-14">
            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed border-l-4 border-zinc-300 pl-4">
              Magazine Grid borrows from a century of print editorial theory. These rules encode
              that wisdom for the web, ensuring every implementation feels authoritative and legible.
            </p>
          </RevealBlock>

          {/* Philosophy principle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Visual Hierarchy",
                tagline: "Large images command attention",
                desc: "The featured article occupies a 2x2 grid area — four times the space of a regular card. Hierarchy is not suggested; it is enforced by the grid itself.",
                color: "#e63946",
              },
              {
                title: "Scan Friendly",
                tagline: "Readers skim before they read",
                desc: "Category labels, bold headlines, and reading time form a quick-scan layer. The grid must allow eyes to move freely without cognitive friction.",
                color: "#2a9d8f",
              },
              {
                title: "Space Rhythm",
                tagline: "Alternating sizes create cadence",
                desc: "Same-size cards kill engagement. Large-small alternation mirrors print editorial rhythm: a splash, then relief, then another splash.",
                color: "#e9c46a",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.08}>
                <div className="group border border-[#1a1a1a] p-8 h-full hover:bg-[#1a1a1a] transition-colors duration-200 cursor-default">
                  <div
                    className="w-3 h-10 mb-6"
                    style={{ backgroundColor: principle.color }}
                  />
                  <h3 className="text-lg font-black uppercase mb-1 group-hover:text-white transition-colors duration-200">
                    {principle.title}
                  </h3>
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-4 transition-colors duration-200"
                    style={{ color: principle.color }}
                  >
                    {principle.tagline}
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-200">
                    {principle.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#1a1a1a]">
            {/* Do */}
            <RevealBlock delay={0.1} className="p-8 border-b md:border-b-0 md:border-r border-[#1a1a1a]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#2a9d8f] flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-black uppercase text-[#2a9d8f]">Do</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Use CSS Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
                  "Featured content: col-span-2 row-span-2 (2x2 area)",
                  "Keep consistent gaps: gap-6 throughout the grid",
                  "Add category labels on all article cards",
                  "Apply group + group-hover: for all card interactions",
                  "Images: grayscale-[20%] default, hover restores full color",
                  "Decoration line: w-4 h-px group-hover:w-12 next to category",
                  "Title hover: text-[#e63946] transition-colors duration-200 ease-out",
                  "Add clear timestamps and reading time to every card",
                  "Mobile: collapse to single column, stack vertically",
                  "Consider ad slot placement in the grid layout",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-zinc-600 leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 bg-[#2a9d8f] shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.15} className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#e63946] flex items-center justify-center">
                  <XIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg font-black uppercase text-[#e63946]">Don't</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Never make all content blocks the same size",
                  "Never ignore mobile responsive layout adaptation",
                  "Never crowd content without adequate whitespace",
                  "Never use inconsistent category tag styling",
                  "Never ignore image aspect ratios — maintain crop consistency",
                  "Never animate body paragraphs with translateY or slide-in",
                  "Never add glow or shadow to headline hover states",
                  "Never omit the featured span — it defines grid hierarchy",
                  "Never use same-weight headlines throughout",
                  "Never omit category labels — classification is essential",
                  "Never use neon colors — stay within editorial palette",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-zinc-600 leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 bg-[#e63946] shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. RESPONSIVE GRID SHOWCASE                                      */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-zinc-100 border-b-2 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e63946] block mb-3">
              Responsive System
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
              Three
              <br />
              <span className="text-[#e63946]">Breakpoints</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.06} className="mb-12">
            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed border-l-4 border-zinc-300 pl-4">
              The grid collapses gracefully from 4-column desktop to 2-column tablet to
              single-column mobile. The featured article adjusts its span at each breakpoint.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mobile */}
            <RevealBlock delay={0.08}>
              <div className="border border-[#1a1a1a] bg-white p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Mobile
                  </span>
                  <span className="text-xs font-mono text-zinc-400">grid-cols-1</span>
                </div>
                <div className="space-y-3">
                  {articles.slice(0, 3).map((a) => (
                    <div key={a.id} className="flex gap-3 group cursor-pointer">
                      <div
                        className="w-16 h-12 shrink-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                        style={{ background: a.imageBg }}
                      />
                      <div>
                        <div
                          className="text-[10px] font-black uppercase tracking-wider"
                          style={{ color: categoryColors[a.category].text }}
                        >
                          {a.category}
                        </div>
                        <div className="text-xs font-black line-clamp-2 leading-snug group-hover:text-[#e63946] transition-colors duration-200 ease-out">
                          {a.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <p className="text-[10px] text-zinc-400 font-mono">
                    All items: w-full
                    <br />
                    Featured: no extra span
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Tablet */}
            <RevealBlock delay={0.12}>
              <div className="border border-[#1a1a1a] bg-white p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Tablet
                  </span>
                  <span className="text-xs font-mono text-zinc-400">md:grid-cols-2</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2 group cursor-pointer">
                    <div
                      className="w-full h-20 grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-300"
                      style={{ background: articles[0].imageBg }}
                    />
                    <div
                      className="text-[10px] font-black uppercase mt-1"
                      style={{ color: categoryColors[articles[0].category].text }}
                    >
                      {articles[0].category} — Featured
                    </div>
                    <div className="text-xs font-black line-clamp-1 group-hover:text-[#e63946] transition-colors duration-200 ease-out">
                      {articles[0].title}
                    </div>
                  </div>
                  {articles.slice(1, 3).map((a) => (
                    <div key={a.id} className="group cursor-pointer">
                      <div
                        className="w-full h-14 grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                        style={{ background: a.imageBg }}
                      />
                      <div
                        className="text-[9px] font-black uppercase mt-0.5"
                        style={{ color: categoryColors[a.category].text }}
                      >
                        {a.category}
                      </div>
                      <div className="text-[10px] font-black line-clamp-2 leading-snug group-hover:text-[#e63946] transition-colors duration-200 ease-out">
                        {a.title}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Featured: col-span-2
                    <br />
                    Regular: 1×1 cells
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Desktop */}
            <RevealBlock delay={0.16}>
              <div className="border border-[#1a1a1a] bg-white p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Desktop
                  </span>
                  <span className="text-xs font-mono text-zinc-400">lg:grid-cols-4</span>
                </div>
                <div className="grid grid-cols-4 grid-rows-2 gap-1.5">
                  <div className="col-span-2 row-span-2 group cursor-pointer">
                    <div
                      className="w-full h-full min-h-[80px] group-hover:scale-[1.02] transition-transform duration-300"
                      style={{ background: articles[0].imageBg }}
                    />
                  </div>
                  {articles.slice(1, 5).map((a) => (
                    <div key={a.id} className="group cursor-pointer">
                      <div
                        className="w-full h-9 grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
                        style={{ background: a.imageBg }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Featured: col-span-2 row-span-2
                    <br />
                    4 cols × 2 rows = 8 cells total
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer className="bg-[#1a1a1a] border-t-2 border-[#e63946]">
        {/* Footer masthead */}
        <div className="border-b border-zinc-800 py-8 px-5 md:px-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <GridIcon className="w-5 h-5 text-[#e63946]" />
                <span className="text-2xl font-black uppercase tracking-tight text-white">
                  Magazine<span className="text-[#e63946]">Grid</span>
                </span>
              </div>
              <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                Inspired by print magazine typography and editorial grid theory. A layout system
                for content-first publishing.
              </p>
            </div>
            <div className="flex gap-2">
              {palette.map((s) => (
                <div
                  key={s.name}
                  className="w-6 h-6 cursor-default hover:scale-125 transition-transform duration-200"
                  style={{
                    backgroundColor: s.hex,
                    border: s.hex === "#fafafa" ? "1px solid #374151" : "none",
                  }}
                  title={s.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 block mb-4">
                Style
              </span>
              <div className="space-y-2">
                <Link href="/styles/magazine-grid" className="block text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                  Documentation
                </Link>
                <Link href="/styles/magazine-grid/showcase" className="block text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                  Showcase
                </Link>
                <Link href="/styles/magazine-grid/cover" className="block text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                  Cover Preview
                </Link>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 block mb-4">
                StyleKit
              </span>
              <div className="space-y-2">
                <Link href="/" className="block text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <Link href="/styles" className="block text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                  All Styles
                </Link>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 block mb-4">
                aiRules
              </span>
              <div className="space-y-2">
                {[
                  "Color Awakening",
                  "Editorial Stretch",
                  "Crisp Typographic Shift",
                  "Readability First",
                ].map((rule) => (
                  <div key={rule} className="flex items-start gap-2 text-sm text-zinc-500">
                    <span className="w-1.5 h-1.5 bg-[#e63946] shrink-0 mt-1.5" />
                    {rule}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 block mb-4">
                Palette
              </span>
              <div className="space-y-2">
                {palette.map((s) => (
                  <div key={s.name} className="flex items-center gap-2 text-sm text-zinc-400">
                    <div
                      className="w-3 h-3 shrink-0"
                      style={{
                        backgroundColor: s.hex,
                        border: s.hex === "#fafafa" ? "1px solid #374151" : "none",
                      }}
                    />
                    <span className="font-mono text-xs text-zinc-500">{s.hex}</span>
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>Built for</span>
              <span className="font-bold text-white">StyleKit</span>
              <span>·</span>
              <span>Magazine Grid Layout System</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#e63946] text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[#1a1a1a] transition-colors duration-200"
            >
              <span>←</span>
              <span>Back to StyleKit</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
