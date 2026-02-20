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
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const ARTICLES = [
  {
    title: "How Eye-Tracking Research Changed Web Design Forever",
    summary: "Nielsen Norman Group studies revealed that users rarely read web content word by word. Instead they scan in predictable F-shaped patterns.",
    cat: "Research",
    time: "8 min",
    tag: "Featured",
  },
  {
    title: "Building Scannable Content Hierarchies",
    summary: "Practical techniques for structuring content so users can quickly find what they need without reading every word.",
    cat: "Design",
    time: "5 min",
    tag: "Design",
  },
  {
    title: "Left-Aligned Layouts and Cognitive Load",
    summary: "Why left-alignment reduces cognitive friction and improves comprehension for text-heavy web pages.",
    cat: "UX",
    time: "6 min",
    tag: "UX",
  },
  {
    title: "Typography Choices That Support F-Pattern Reading",
    summary: "Choosing typefaces, line heights, and column widths that work with — not against — the natural F-scan.",
    cat: "Typography",
    time: "4 min",
    tag: "Typography",
  },
];

const SEARCH_RESULTS = [
  { rank: 1, title: "F-Pattern Reading: Eye Tracking Evidence", url: "nngroup.com/articles/f-shaped-pattern", desc: "Comprehensive eye-tracking study showing how users read web pages in an F-shaped pattern..." },
  { rank: 2, title: "Improving Scannability with Content Structure", url: "smashingmagazine.com/ux/scannability", desc: "Techniques for arranging content so the most critical information appears along the F reading path..." },
  { rank: 3, title: "Left Gaze Bias in Web Reading", url: "usability.gov/articles/left-gaze", desc: "Research demonstrates that users fixate more on the left side of the screen, making left alignment critical..." },
  { rank: 4, title: "Content Hierarchy for News Websites", url: "medium.com/ux-design/news-hierarchy", desc: "How major news outlets apply F-pattern principles to maximize reader engagement and retention..." },
];

export default function FPatternLayoutShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeTab, setActiveTab] = useState<"news" | "search" | "blog">("news");
  const [activeComponent, setActiveComponent] = useState<"button" | "card" | "input">("button");
  const [highlightZone, setHighlightZone] = useState<"stroke1" | "stroke2" | "vertical" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a2e]">

      {/* ================================================================ */}
      {/* SECTION 1: FIXED NAVIGATION                                       */}
      {/* ================================================================ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* F lettermark */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#1a1a2e" />
              <path d="M8 7h12M8 7v14M8 14h8" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-[#1a1a2e]">F-Pattern Layout</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <a href="#eye-tracking" className="hover:text-[#1a1a2e] transition-colors duration-150">Eye-Tracking</a>
            <a href="#live-demo" className="hover:text-[#1a1a2e] transition-colors duration-150">Live Demo</a>
            <a href="#heatmap" className="hover:text-[#1a1a2e] transition-colors duration-150">Heat Map</a>
            <a href="#components" className="hover:text-[#1a1a2e] transition-colors duration-150">Components</a>
            <a href="#rules" className="hover:text-[#1a1a2e] transition-colors duration-150">Rules</a>
          </div>
        </div>
      </nav>

      {/* ================================================================ */}
      {/* SECTION 2: HERO — F-Pattern reading behavior + eye-tracking viz  */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100" id="eye-tracking">
        <div
          className="max-w-6xl mx-auto px-6 py-20 md:py-28"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#e63946] mb-4">
                UX Research — Eye-Tracking
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a2e] mb-5 leading-tight">
                Users Read in an<br />
                <span className="text-[#e63946]">F-Shape</span>, Not Top-to-Bottom
              </h1>
              <p className="text-base md:text-lg text-gray-500 max-w-prose mb-6 leading-relaxed">
                Nielsen Norman Group&apos;s landmark eye-tracking studies of 232 users found that web reading follows a predictable F-shaped pattern. Two horizontal sweeps followed by a vertical scan down the left side. Place your most critical content accordingly.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Eye-Tracking", "Content-First", "Left-Aligned", "Scannable", "Research-Based"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-[#1a1a2e]/5 text-[#1a1a2e] rounded-full border border-[#1a1a2e]/10">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                {[
                  { label: "Users studied", value: "232+" },
                  { label: "Reading fixations analyzed", value: "45K+" },
                  { label: "F-pattern consistency", value: "~78%" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl font-bold text-[#e63946]">{stat.value}</div>
                    <div className="text-xs text-gray-400 leading-snug mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive eye-tracking visualization */}
            <div className="relative">
              <div className="bg-[#1a1a2e] rounded-2xl p-1 shadow-2xl">
                <div className="bg-[#0d0d1a] rounded-xl overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e63946]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e9c46a]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2a9d8f]/70" />
                    <div className="flex-1 mx-4 bg-white/5 rounded text-[10px] text-white/30 px-3 py-1 font-mono">
                      example-article.com/story
                    </div>
                  </div>

                  {/* Mock web page with F-pattern heat overlay */}
                  <div className="relative p-4">
                    {/* Stroke 1 — hottest zone */}
                    <div className="relative mb-3">
                      <div
                        className="absolute inset-0 rounded transition-opacity duration-300"
                        style={{ background: "linear-gradient(90deg, rgba(230,57,70,0.6) 0%, rgba(230,57,70,0.3) 60%, rgba(230,57,70,0.05) 100%)" }}
                      />
                      <div className="relative px-3 py-2">
                        <div className="h-3 bg-white/70 rounded mb-1.5 w-full" />
                        <div className="h-2 bg-white/40 rounded w-4/5" />
                      </div>
                    </div>

                    {/* Stroke 2 — warm zone */}
                    <div className="relative mb-3">
                      <div
                        className="absolute inset-0 rounded transition-opacity duration-300"
                        style={{ background: "linear-gradient(90deg, rgba(233,196,106,0.5) 0%, rgba(233,196,106,0.25) 50%, transparent 80%)" }}
                      />
                      <div className="relative px-3 py-2">
                        <div className="h-2 bg-white/40 rounded mb-1.5 w-3/4" />
                        <div className="h-2 bg-white/25 rounded w-1/2" />
                      </div>
                    </div>

                    {/* Body rows — cool left gaze */}
                    {[100, 85, 70, 55, 40].map((width, i) => (
                      <div key={i} className="relative mb-2">
                        <div
                          className="absolute left-0 top-0 bottom-0 rounded"
                          style={{
                            width: "28%",
                            background: `rgba(69,123,157,${0.35 - i * 0.05})`,
                          }}
                        />
                        <div className="relative flex gap-2 px-3 py-1.5">
                          <div
                            className="h-1.5 bg-white/30 rounded flex-shrink-0"
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Eye path annotation */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 320 200"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      {/* Stroke 1 arrow */}
                      <path d="M20 28 L280 28" stroke="#e63946" strokeWidth="2" strokeDasharray="4 2" opacity="0.7" />
                      <polygon points="278,24 288,28 278,32" fill="#e63946" opacity="0.7" />
                      {/* Stroke 2 arrow */}
                      <path d="M20 68 L200 68" stroke="#e9c46a" strokeWidth="2" strokeDasharray="4 2" opacity="0.7" />
                      <polygon points="198,64 208,68 198,72" fill="#e9c46a" opacity="0.7" />
                      {/* Vertical arrow */}
                      <path d="M28 88 L28 180" stroke="#457b9d" strokeWidth="2" strokeDasharray="4 2" opacity="0.7" />
                      <polygon points="24,178 28,190 32,178" fill="#457b9d" opacity="0.7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs">
                {[
                  { color: "#e63946", label: "Primary Horizontal Scan" },
                  { color: "#e9c46a", label: "Secondary Horizontal Scan" },
                  { color: "#457b9d", label: "Vertical Left Scan" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 rounded" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 3: LIVE F-PATTERN LAYOUT DEMO with overlay toggle        */}
      {/* ================================================================ */}
      <section id="live-demo" className="max-w-6xl mx-auto px-6 py-16">
        <RevealBlock>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
                Live F-Pattern Layout Demo
              </h2>
              <p className="text-gray-500 max-w-prose">
                A real news-style page built following F-pattern principles. Toggle the overlay to see exactly which zones receive the most attention and how content is prioritized.
              </p>
            </div>
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                showOverlay
                  ? "bg-[#e63946] text-white shadow-md"
                  : "bg-white border border-gray-200 text-[#1a1a2e] hover:border-[#e63946] hover:text-[#e63946]"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="7" cy="7" r="2" fill="currentColor" />
              </svg>
              {showOverlay ? "Hide F-Pattern Overlay" : "Show F-Pattern Overlay"}
            </button>
          </div>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          {/* Real-world news page demo */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">

            {/* ---- STROKE 1: Full-width top bar ---- */}
            <div className="relative border-b border-gray-100">
              {showOverlay && (
                <div className="absolute inset-0 z-10 pointer-events-none" style={{
                  background: "linear-gradient(90deg, rgba(230,57,70,0.18) 0%, rgba(230,57,70,0.10) 70%, rgba(230,57,70,0.02) 100%)",
                  borderBottom: "2px solid rgba(230,57,70,0.4)",
                }}>
                  <div className="absolute top-2 right-3 text-[10px] font-mono font-bold text-[#e63946] uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded">
                    Stroke 1 — Primary Horizontal Scan (Hottest)
                  </div>
                </div>
              )}
              {/* Header bar */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-[#1a1a2e]">
                <span className="text-white font-bold text-lg tracking-tight">The Daily Digest</span>
                <nav className="hidden md:flex gap-5 text-sm text-white/60">
                  {["News", "Tech", "Science", "Culture", "Opinion"].map((item) => (
                    <span key={item} className="hover:text-white cursor-pointer transition-colors duration-150">{item}</span>
                  ))}
                </nav>
                <div className="flex items-center gap-2">
                  <div className="w-28 h-7 bg-white/10 rounded flex items-center px-3">
                    <span className="text-white/30 text-xs">Search...</span>
                  </div>
                </div>
              </div>

              {/* Featured / Hero story — the first F stroke */}
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#e63946]">Breaking News</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mt-2 mb-3 leading-tight">
                    Eye-Tracking Research Confirms: Users Read Web Pages in F-Shaped Patterns
                  </h2>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-prose">
                    A landmark Nielsen Norman Group study analyzing over 45,000 eye-movement fixations reveals that web users consistently scan content in an F-shaped pattern — with heavy attention on top-left content and rapidly diminishing focus toward the right and bottom.
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <button className="px-5 py-2.5 bg-[#e63946] text-white rounded-lg text-sm font-medium hover:bg-[#c1121f] active:scale-[0.98] transition-all duration-150">
                      Read Full Story
                    </button>
                    <span className="text-xs text-gray-400">Research &middot; 12 min read &middot; 2 hours ago</span>
                  </div>
                </div>
                <div className="w-full md:w-64 h-44 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-2 opacity-30">
                      <rect width="48" height="48" rx="8" fill="#1a1a2e" />
                      <path d="M12 14h24M12 14v20M12 24h16" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs text-gray-400">Hero Image</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- STROKE 2: Shorter secondary bar ---- */}
            <div className="relative border-b border-gray-100">
              {showOverlay && (
                <div className="absolute inset-0 z-10 pointer-events-none" style={{
                  background: "linear-gradient(90deg, rgba(233,196,106,0.20) 0%, rgba(233,196,106,0.10) 55%, transparent 80%)",
                  borderBottom: "2px solid rgba(233,196,106,0.35)",
                }}>
                  <div className="absolute top-2 right-3 text-[10px] font-mono font-bold text-[#d4a017] uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded">
                    Stroke 2 — Secondary Horizontal Scan (Warm)
                  </div>
                </div>
              )}
              <div className="px-6 md:px-8 py-3 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-400 font-medium mr-1">Filter:</span>
                {["All", "Research", "Design", "Development", "UX", "Typography"].map((cat, i) => (
                  <button
                    key={cat}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-150 ${
                      i === 0
                        ? "bg-[#1a1a2e] text-white"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-[#1a1a2e]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <div className="ml-auto hidden md:flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-44 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#457b9d]/20 focus:border-[#457b9d] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ---- STROKE 3: Vertical scan (main content + sidebar) ---- */}
            <div className="relative flex flex-col md:flex-row">
              {showOverlay && (
                <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{
                  width: "48px",
                  background: "linear-gradient(180deg, rgba(69,123,157,0.30) 0%, rgba(69,123,157,0.18) 60%, rgba(69,123,157,0.08) 100%)",
                  borderRight: "2px solid rgba(69,123,157,0.35)",
                }}>
                  <div
                    className="absolute text-[9px] font-mono font-bold text-[#457b9d] uppercase tracking-widest bg-white/80 px-1.5 py-0.5 rounded whitespace-nowrap"
                    style={{ top: "50%", left: "52px", transform: "translateY(-50%) rotate(0deg)" }}
                  >
                    Stroke 3 — Vertical Left Scan (Cool)
                  </div>
                </div>
              )}

              {/* Article list */}
              <main className="flex-1 divide-y divide-gray-100">
                {ARTICLES.map((article, i) => (
                  <div
                    key={i}
                    className="group flex gap-4 px-6 md:px-8 py-5 hover:bg-gray-50/70 transition-all duration-200 cursor-pointer"
                  >
                    {/* Left: article number — the first thing the vertical scan hits */}
                    <div className="flex-shrink-0 w-6 pt-0.5">
                      <span className="text-xs font-bold text-gray-300 group-hover:text-[#e63946] transition-colors duration-150">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 group-hover:brightness-95 transition-all duration-200" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#e63946]">{article.tag}</span>
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-[#1a1a2e] mb-1 leading-snug group-hover:text-[#e63946] group-hover:translate-x-1 group-hover:underline underline-offset-4 decoration-1 transition-all duration-200 line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-1.5 hidden md:block">
                        {article.summary}
                      </p>
                      <span className="text-[11px] text-gray-400">{article.cat} &middot; {article.time} read</span>
                    </div>
                    {/* Right content fades — F-pattern effect */}
                    <div className="hidden md:flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="px-2 py-0.5 text-[10px] font-medium text-gray-400 border border-gray-200 rounded">
                        Bookmark
                      </div>
                    </div>
                  </div>
                ))}
              </main>

              {/* Sidebar — lower attention zone */}
              <aside className="w-full md:w-60 flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-100 p-5 bg-gray-50/30">
                <div className="mb-6">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Trending Topics
                  </h4>
                  {["Eye-tracking research", "UX typography", "Grid systems", "Content hierarchy", "Whitespace usage"].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0 hover:text-[#457b9d] cursor-pointer transition-colors duration-150 group"
                    >
                      <span className="text-xs font-bold text-gray-300 group-hover:text-[#457b9d] transition-colors">{i + 1}</span>
                      <span className="text-xs text-[#1a1a2e]">{t}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Subscribe
                  </h4>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    Get the latest UX research in your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e63946]/20 focus:border-[#e63946] transition-all mb-2"
                  />
                  <button className="w-full px-4 py-2 bg-[#1a1a2e] text-white text-xs font-medium rounded-lg hover:bg-[#2d2d4a] transition-colors duration-150">
                    Subscribe
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </RevealBlock>

        {/* F-shape anatomy breakdown */}
        <RevealBlock delay={0.25} className="mt-8">
          <div className="bg-[#1a1a2e] rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-lg font-bold mb-6">The Three Strokes of the F</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  stroke: "Stroke 1",
                  label: "Primary Horizontal Scan",
                  color: "#e63946",
                  width: "w-full",
                  desc: "Users perform a full-width horizontal scan at the top. This is where headlines, logos, and featured content must live. Highest attention density — up to 3x more fixations than the rest of the page.",
                },
                {
                  stroke: "Stroke 2",
                  label: "Secondary Horizontal Scan",
                  color: "#e9c46a",
                  width: "w-3/4",
                  desc: "A shorter sweep below the first. Attention drops off to the right. Use this zone for categories, filters, sub-headlines, or supporting navigation that complements the top content.",
                },
                {
                  stroke: "Vertical Scan",
                  label: "Left Column Descent",
                  color: "#457b9d",
                  width: "w-2",
                  isVertical: true,
                  desc: "Users scan down the left margin, reading only the first few words of each line. Bold words, bullet points, and numbers at the left edge capture attention during this phase.",
                },
              ].map((item) => (
                <div key={item.stroke}>
                  <div className="flex items-center gap-2 mb-3">
                    {item.isVertical ? (
                      <div className="h-8 w-0.5 rounded-full" style={{ backgroundColor: item.color }} />
                    ) : (
                      <div className={`h-0.5 ${item.width} rounded-full max-w-[120px]`} style={{ backgroundColor: item.color }} />
                    )}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider" style={{ color: item.color }}>{item.stroke}</div>
                      <div className="text-xs text-white/60">{item.label}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* SECTION 4: COMPONENT DEMOS — F-pattern applied to UI             */}
      {/* ================================================================ */}
      <section id="components" className="max-w-6xl mx-auto px-6 py-16">
        <RevealBlock>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            Component Library
          </h2>
          <p className="text-gray-500 mb-8 max-w-prose">
            Core UI components tuned for scannable, content-first F-pattern layouts. Each component respects left-alignment and reading hierarchy.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          {/* Tab switcher */}
          <div className="flex gap-1 mb-8 bg-gray-100 rounded-xl p-1 w-fit">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveComponent(tab)}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeComponent === tab
                    ? "bg-white text-[#1a1a2e] shadow-sm"
                    : "text-gray-500 hover:text-[#1a1a2e]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12">
            {activeComponent === "button" && (
              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-5">
                    Primary CTA — Left-aligned, action-forward
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-[#e63946] text-white rounded-lg font-medium hover:bg-[#c1121f] active:scale-[0.98] transition-all duration-150 ease-out">
                      Read More
                    </button>
                    <button className="px-6 py-3 bg-[#457b9d] text-white rounded-lg font-medium hover:bg-[#3a6a88] active:scale-[0.98] transition-all duration-150 ease-out">
                      Subscribe
                    </button>
                    <button className="px-6 py-3 bg-[#1a1a2e] text-white rounded-lg font-medium hover:bg-[#2d2d4a] active:scale-[0.98] transition-all duration-150 ease-out">
                      View All
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-5">
                    Secondary / Ghost — Subtle actions
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 border border-gray-200 text-[#1a1a2e] rounded-lg font-medium hover:border-[#e63946] hover:text-[#e63946] active:scale-[0.98] transition-all duration-150">
                      Bookmark
                    </button>
                    <button className="px-6 py-3 text-gray-500 font-medium hover:text-[#1a1a2e] hover:bg-gray-50 rounded-lg active:scale-[0.98] transition-all duration-150">
                      Share Article
                    </button>
                    <button className="px-6 py-3 border border-dashed border-gray-200 text-gray-400 rounded-lg font-medium hover:border-[#2a9d8f] hover:text-[#2a9d8f] active:scale-[0.98] transition-all duration-150">
                      Load More
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-[#1a1a2e]/3 rounded-lg border border-[#1a1a2e]/8">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <span className="font-semibold text-[#1a1a2e]">F-Pattern rule:</span> Place primary CTAs on the left — they fall along the vertical scan path. Secondary actions can live to the right of the primary but should remain visually subordinate.
                  </p>
                </div>
              </div>
            )}

            {activeComponent === "card" && (
              <div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  <span className="font-semibold text-[#1a1a2e]">F-Pattern card:</span> Thumbnail left, headline bold and left-aligned, summary fades right. Hover shifts headline right to simulate eye tracking lock-on.
                </p>
                <div className="space-y-0 divide-y divide-gray-100">
                  {[
                    {
                      title: "Eye-Tracking and Web Design",
                      summary: "How understanding gaze patterns improves content placement and increases engagement across page types.",
                      cat: "Research",
                      time: "8 min",
                    },
                    {
                      title: "Building Scannable Interfaces",
                      summary: "Practical techniques for structuring content so users can quickly find what they need without reading everything.",
                      cat: "Design",
                      time: "5 min",
                    },
                    {
                      title: "Typography for Readability",
                      summary: "Choosing typefaces, line heights, and column widths that support natural F-scan reading patterns.",
                      cat: "Development",
                      time: "6 min",
                    },
                  ].map((item, i) => (
                    <article
                      key={i}
                      className="group flex gap-6 py-5 last:pb-0 first:pt-0 hover:bg-gray-50/50 -mx-4 px-4 transition-all duration-200 cursor-pointer rounded-lg"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 group-hover:brightness-95 transition-all duration-200" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-[#1a1a2e] mb-1 group-hover:text-[#e63946] group-hover:translate-x-1 group-hover:underline underline-offset-4 decoration-1 transition-all duration-200 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2 leading-relaxed">
                          {item.summary}
                        </p>
                        <span className="text-xs text-gray-400">{item.cat} &middot; {item.time} read</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeComponent === "input" && (
              <div className="space-y-8 max-w-lg">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Search Input</h3>
                  <div className="relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#457b9d]/20 focus:border-[#457b9d] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Newsletter Signup</h3>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e63946]/20 focus:border-[#e63946] transition-all"
                    />
                    <button className="px-5 py-3 bg-[#e63946] text-white rounded-lg font-medium hover:bg-[#c1121f] active:scale-[0.98] transition-all duration-150 flex-shrink-0">
                      Join
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Comment Box</h3>
                  <textarea
                    placeholder="Share your thoughts on this research..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#457b9d]/20 focus:border-[#457b9d] transition-all resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button className="px-5 py-2 bg-[#1a1a2e] text-white text-sm font-medium rounded-lg hover:bg-[#2d2d4a] transition-colors duration-150">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* SECTION 5: HEAT MAP / ATTENTION ZONE VISUALIZATION               */}
      {/* ================================================================ */}
      <section id="heatmap" className="max-w-6xl mx-auto px-6 py-16">
        <RevealBlock>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            Attention Heat Map
          </h2>
          <p className="text-gray-500 mb-8 max-w-prose">
            This visualization maps user attention intensity across a typical content page. Hot zones (red/orange) demand top-priority content; cool zones (blue) receive minimal fixations.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Heat map visualization */}
          <RevealBlock delay={0.1}>
            <div className="bg-[#0d0d1a] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
              <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#e63946]" />
                <span className="text-xs font-mono text-white/50">attention-heatmap.viz</span>
              </div>
              <div className="p-5">
                <svg viewBox="0 0 400 500" className="w-full" fill="none">
                  {/* Zone annotations */}
                  {/* Zone 1: TOP FULL WIDTH — hottest */}
                  <defs>
                    <radialGradient id="hot1" cx="30%" cy="50%" r="70%">
                      <stop offset="0%" stopColor="#e63946" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#ff6b35" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#e9c46a" stopOpacity="0.1" />
                    </radialGradient>
                    <radialGradient id="warm1" cx="25%" cy="50%" r="65%">
                      <stop offset="0%" stopColor="#e9c46a" stopOpacity="0.8" />
                      <stop offset="55%" stopColor="#e9c46a" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#457b9d" stopOpacity="0.05" />
                    </radialGradient>
                    <linearGradient id="cool1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#457b9d" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#1a3a5c" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Background grid */}
                  <rect x="0" y="0" width="400" height="500" fill="#0d0d1a" />
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="white" strokeOpacity="0.03" />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="white" strokeOpacity="0.03" />
                  ))}

                  {/* Content skeleton */}
                  {/* Header */}
                  <rect x="20" y="15" width="360" height="35" rx="4" fill="white" fillOpacity="0.06" />
                  {/* Featured story */}
                  <rect x="20" y="65" width="360" height="80" rx="4" fill="white" fillOpacity="0.05" />
                  {/* Secondary bar */}
                  <rect x="20" y="160" width="240" height="28" rx="4" fill="white" fillOpacity="0.05" />
                  {/* Articles */}
                  {[0, 1, 2, 3].map((i) => (
                    <rect key={i} x="20" y={205 + i * 62} width="260" height="50" rx="4" fill="white" fillOpacity="0.04" />
                  ))}
                  {/* Sidebar */}
                  <rect x="300" y="205" width="80" height="280" rx="4" fill="white" fillOpacity="0.03" />

                  {/* Heat overlays */}
                  {/* Stroke 1 */}
                  <rect x="20" y="15" width="360" height="125" rx="4" fill="url(#hot1)" />
                  {/* Stroke 2 */}
                  <rect x="20" y="155" width="260" height="40" rx="4" fill="url(#warm1)" />
                  {/* Vertical left scan */}
                  <rect x="20" y="200" width="36" height="290" rx="4" fill="url(#cool1)" />

                  {/* Labels */}
                  <text x="26" y="38" fontSize="9" fill="white" fillOpacity="0.9" fontWeight="700" fontFamily="monospace">HEADER / NAV</text>
                  <text x="26" y="108" fontSize="9" fill="white" fillOpacity="0.8" fontWeight="600" fontFamily="monospace">FEATURED STORY</text>
                  <text x="26" y="179" fontSize="8" fill="white" fillOpacity="0.7" fontFamily="monospace">CATEGORIES</text>
                  <text x="58" y="230" fontSize="8" fill="white" fillOpacity="0.45" fontFamily="monospace">Article 1</text>
                  <text x="58" y="292" fontSize="8" fill="white" fillOpacity="0.35" fontFamily="monospace">Article 2</text>
                  <text x="58" y="354" fontSize="8" fill="white" fillOpacity="0.25" fontFamily="monospace">Article 3</text>
                  <text x="58" y="416" fontSize="8" fill="white" fillOpacity="0.15" fontFamily="monospace">Article 4</text>
                  <text x="305" y="228" fontSize="7" fill="white" fillOpacity="0.3" fontFamily="monospace">Sidebar</text>

                  {/* Attention gradient legend bar */}
                  <defs>
                    <linearGradient id="legend" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#457b9d" />
                      <stop offset="40%" stopColor="#e9c46a" />
                      <stop offset="75%" stopColor="#ff6b35" />
                      <stop offset="100%" stopColor="#e63946" />
                    </linearGradient>
                  </defs>
                  <rect x="20" y="470" width="200" height="8" rx="4" fill="url(#legend)" />
                  <text x="20" y="490" fontSize="8" fill="white" fillOpacity="0.4" fontFamily="monospace">Low</text>
                  <text x="108" y="490" fontSize="8" fill="white" fillOpacity="0.4" fontFamily="monospace">Medium</text>
                  <text x="196" y="490" fontSize="8" fill="white" fillOpacity="0.4" fontFamily="monospace" textAnchor="end">High</text>
                </svg>
              </div>
            </div>
          </RevealBlock>

          {/* Zone breakdown + interactive zone selector */}
          <RevealBlock delay={0.2}>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Click a zone to understand its role in F-pattern reading and what content belongs there.
              </p>
              {[
                {
                  key: "stroke1" as const,
                  label: "Zone A — Primary Horizontal Scan",
                  color: "#e63946",
                  bg: "bg-[#e63946]/8",
                  border: "border-[#e63946]/20",
                  intensity: "HOTTEST",
                  description: "Top of page — highest fixation density. Place logo, primary navigation, and featured/hero content here. Users read this zone most carefully and completely.",
                  content: ["Logo & brand name", "Primary navigation", "Featured headline", "Hero image", "Primary CTA"],
                },
                {
                  key: "stroke2" as const,
                  label: "Zone B — Secondary Horizontal Scan",
                  color: "#e9c46a",
                  bg: "bg-[#e9c46a]/8",
                  border: "border-[#e9c46a]/20",
                  intensity: "WARM",
                  description: "Second sweep is shorter — attention drops off to the right. Category filters, search bars, and sub-headlines work well here. Never place critical CTAs only on the far right.",
                  content: ["Category filters", "Search bar", "Sub-navigation", "Secondary headline", "Sort controls"],
                },
                {
                  key: "vertical" as const,
                  label: "Zone C — Vertical Left Scan",
                  color: "#457b9d",
                  bg: "bg-[#457b9d]/8",
                  border: "border-[#457b9d]/20",
                  intensity: "COOL",
                  description: "Users scan down the left edge, reading only the start of each line. Bold words, numbers, bullets, and thumbnails at the left margin catch attention here. Right-side content receives minimal fixations.",
                  content: ["Article numbers", "Thumbnails", "First words of headlines", "Bullet points", "Left-edge labels"],
                },
              ].map((zone) => (
                <button
                  key={zone.key}
                  onClick={() => setHighlightZone(highlightZone === zone.key ? null : zone.key)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                    highlightZone === zone.key
                      ? `${zone.bg} ${zone.border} shadow-sm`
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
                      <span className="text-sm font-semibold text-[#1a1a2e]">{zone.label}</span>
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{ color: zone.color, backgroundColor: zone.color + "15" }}
                    >
                      {zone.intensity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{zone.description}</p>
                  {highlightZone === zone.key && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Content for this zone:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {zone.content.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-0.5 text-xs font-medium rounded-full"
                            style={{ color: zone.color, backgroundColor: zone.color + "12" }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION 5b: REAL-WORLD EXAMPLES — News, Search, Blog             */}
      {/* ================================================================ */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-200">
        <RevealBlock>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            Real-World Examples
          </h2>
          <p className="text-gray-500 mb-8 max-w-prose">
            F-pattern manifests differently across content types. See how news articles, search results, and blog posts each apply the same reading-path principle.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <div className="flex gap-1 mb-8 bg-gray-100 rounded-xl p-1 w-fit">
            {(["news", "search", "blog"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-[#1a1a2e] shadow-sm"
                    : "text-gray-500 hover:text-[#1a1a2e]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* News Article */}
            {activeTab === "news" && (
              <div className="p-6 md:p-8">
                <div className="max-w-3xl">
                  {/* F stroke 1: headline */}
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#e63946] mb-2 block">World &middot; Technology</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-3 leading-tight">
                      New Study Confirms F-Pattern Reading Persists Across All Age Groups
                    </h2>
                    <p className="text-base text-gray-500 leading-relaxed max-w-prose">
                      Researchers at the Nielsen Norman Group extended their landmark 2006 eye-tracking study, finding that the F-pattern holds across mobile, tablet, and desktop devices equally.
                    </p>
                  </div>

                  {/* F stroke 2: byline + metadata */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200" />
                      <div>
                        <div className="text-xs font-semibold text-[#1a1a2e]">Dr. Sarah Chen</div>
                        <div className="text-[10px] text-gray-400">UX Research Lead</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">Published Feb 18, 2026</span>
                    <span className="text-xs text-gray-400">12 min read</span>
                    <span className="text-xs text-gray-400">1,247 views</span>
                  </div>

                  {/* Body — vertical scan, content fades right */}
                  <div className="space-y-4 text-sm text-gray-600 leading-relaxed max-w-prose">
                    <p>
                      <strong className="text-[#1a1a2e]">The core finding</strong> has remained consistent across all iterations of the research: users do not read web content linearly. Instead, they perform rapid horizontal sweeps at the top of the page before shifting to a vertical scan pattern along the left margin.
                    </p>
                    <p>
                      <strong className="text-[#1a1a2e]">Content placement matters enormously.</strong> Articles that placed key facts in the first sentence of each paragraph saw 2.3x higher comprehension rates compared to those that buried the lead.
                    </p>
                    <ul className="space-y-2 pl-0">
                      {[
                        "Top 100px of page: receives 80% of total fixation time",
                        "Left 200px column: captures 69% of vertical-scan attention",
                        "Right 30% of viewport: receives less than 12% of fixations",
                        "Below the fold: only 30% of users scroll this far",
                      ].map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="text-[#e63946] font-bold flex-shrink-0 mt-0.5">&#8212;</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {activeTab === "search" && (
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 flex items-center gap-3 px-4 py-3 border border-[#457b9d] rounded-lg bg-gray-50">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400 flex-shrink-0">
                        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-sm text-[#1a1a2e]">f-pattern reading web design</span>
                    </div>
                    <button className="px-5 py-3 bg-[#457b9d] text-white rounded-lg text-sm font-medium">
                      Search
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">About 4,820,000 results (0.48 seconds)</p>
                </div>

                <div className="space-y-6">
                  {SEARCH_RESULTS.map((result) => (
                    <div key={result.rank} className="group cursor-pointer">
                      <div className="text-xs text-[#2a9d8f] mb-0.5">{result.url}</div>
                      <h3 className="text-base font-semibold text-[#457b9d] group-hover:underline mb-1 leading-snug">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-prose">
                        {result.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="font-semibold text-[#1a1a2e]">F-pattern in search:</span> Users scan result titles first (stroke 1 = first result), then briefly scan the next 2-3 titles (stroke 2), then go back to result #1 and click. Position 1 receives 5x more clicks than position 5.
                  </p>
                </div>
              </div>
            )}

            {/* Blog Post */}
            {activeTab === "blog" && (
              <div className="flex flex-col md:flex-row">
                {/* Main content */}
                <div className="flex-1 p-6 md:p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2a9d8f] mb-3 block">Design Principles</span>
                  <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3 leading-tight">
                    Why I Rebuilt My Blog With F-Pattern in Mind
                  </h2>
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100 text-xs text-gray-400">
                    <span>Feb 15, 2026</span>
                    <span>&middot;</span>
                    <span>7 min read</span>
                    <span>&middot;</span>
                    <span className="text-[#2a9d8f]">UX / Design</span>
                  </div>
                  <div className="space-y-4 text-sm text-gray-600 leading-relaxed max-w-prose">
                    <p>
                      <strong className="text-[#1a1a2e]">After rebuilding my blog three times,</strong> I finally understood why my reader engagement was low: I was designing for myself, not for how people actually read on the web.
                    </p>
                    <h3 className="text-base font-bold text-[#1a1a2e] pt-2">What I Changed</h3>
                    <ul className="space-y-2">
                      {[
                        "Moved key takeaways to the top of every post",
                        "Used bold text for the first few words of key sentences",
                        "Added a TL;DR summary block above the fold",
                        "Changed body copy alignment from centered to left-aligned",
                        "Increased line height from 1.5 to 1.75 for easier scanning",
                      ].map((change) => (
                        <li key={change} className="flex gap-2.5">
                          <span className="text-[#2a9d8f] font-bold flex-shrink-0">+</span>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                    <p>
                      The result: average time on page increased 40%, and the scroll depth metric improved from 32% to 61% within the first month.
                    </p>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="w-full md:w-56 border-t md:border-t-0 md:border-l border-gray-100 p-5 bg-gray-50/30 flex-shrink-0">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Related Posts</h4>
                  {["Typography for the Web", "Cognitive Load in UI", "Reading Patterns Study", "Left vs. Center Align"].map((post, i) => (
                    <div key={i} className="py-2 border-b border-gray-100 last:border-0">
                      <span className="text-xs text-[#457b9d] hover:underline cursor-pointer">{post}</span>
                    </div>
                  ))}
                  <div className="mt-6 p-3 bg-[#1a1a2e] rounded-lg">
                    <p className="text-[10px] text-white/60 leading-relaxed mb-2">Get weekly UX insights</p>
                    <button className="w-full text-[10px] font-bold text-[#1a1a2e] bg-white rounded px-3 py-1.5 hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* SECTION 6: DESIGN RULES — DO / DON'T                            */}
      {/* ================================================================ */}
      <section id="rules" className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-200">
        <RevealBlock>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            F-Pattern Design Rules
          </h2>
          <p className="text-gray-500 mb-8 max-w-prose">
            Guidelines derived from eye-tracking research. Following these rules ensures your content aligns with how users naturally scan pages.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <RevealBlock delay={0.1}>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-[#2a9d8f]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2a9d8f]">Do</h3>
                  <p className="text-xs text-gray-400">F-pattern best practices</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  { rule: "Place the most important content at the top (first horizontal stroke)", detail: "Hero, headline, featured CTA" },
                  { rule: "Left-align navigation and key information (vertical stroke)", detail: "Nav, thumbnails, article numbers" },
                  { rule: "Maintain clear heading hierarchy: h1 > h2 > h3", detail: "Helps vertical scan land on anchors" },
                  { rule: "Use lists and sections for scannability", detail: "Bullets expose left-edge keywords" },
                  { rule: "Keep text left-aligned to match reading habits", detail: "text-left, never text-center for body" },
                  { rule: "Use max-w-prose to limit line width for readability", detail: "65–75 characters per line is optimal" },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 group">
                    <span className="text-[#2a9d8f] font-bold flex-shrink-0 text-sm mt-0.5">+</span>
                    <div>
                      <div className="text-sm text-[#1a1a2e] font-medium leading-snug">{item.rule}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.detail}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-[#e63946]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4L12 12M12 4L4 12" stroke="#e63946" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#e63946]">Don&apos;t</h3>
                  <p className="text-xs text-gray-400">Common F-pattern violations</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  { rule: "Place important content in the bottom-right corner", detail: "It falls outside all three F strokes" },
                  { rule: "Center-align large blocks of text", detail: "Breaks vertical left-edge scan anchor" },
                  { rule: "Ignore content priority ordering", detail: "Users abandon pages when top content disappoints" },
                  { rule: "Use long paragraphs without segmentation", detail: "Dense blocks stop the F scan dead" },
                  { rule: "Leave excessive whitespace on the left side", detail: "Destroys the vertical scan anchor point" },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 group">
                    <span className="text-[#e63946] font-bold flex-shrink-0 text-sm mt-0.5">&minus;</span>
                    <div>
                      <div className="text-sm text-[#1a1a2e] font-medium leading-snug">{item.rule}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.detail}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>

        {/* Interaction guidelines */}
        <RevealBlock delay={0.3}>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-6">Interaction Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Eye-Tracking Guides",
                  desc: "List items shift right on hover (translate-x-1) or reveal underlines to help users lock on during scanning phases.",
                  color: "#e63946",
                },
                {
                  title: "Fast Feedback",
                  desc: "Use duration-150 to duration-200 for news and content interactions. Avoid long transitions that interrupt the reading rhythm.",
                  color: "#457b9d",
                },
                {
                  title: "Contrast Pop",
                  desc: "Hovered items use subtle shadow or border contrast to visually separate from the information stream momentarily.",
                  color: "#2a9d8f",
                },
                {
                  title: "Image Focus",
                  desc: "Thumbnails increase contrast or brightness on hover as a click affordance, but the effect must stay restrained and not distract.",
                  color: "#e9c46a",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 rounded-full flex-shrink-0 self-stretch" style={{ backgroundColor: item.color }} />
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a2e] mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* SVG F-pattern anatomy */}
        <RevealBlock delay={0.4} className="mt-6">
          <div className="bg-[#1a1a2e] rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-lg font-bold mb-6">F-Pattern Visual Anatomy</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-full max-w-xs mx-auto md:mx-0">
                <svg viewBox="0 0 300 260" className="w-full" fill="none">
                  {/* Stroke 1 — full width */}
                  <rect x="20" y="20" width="260" height="16" rx="3" fill="#e63946" fillOpacity="0.85" />
                  <text x="26" y="32" fontSize="9" fill="white" fontWeight="700" fontFamily="monospace">STROKE 1 — HEADER / FEATURED</text>

                  {/* Stroke 2 — shorter */}
                  <rect x="20" y="58" width="180" height="12" rx="3" fill="#e9c46a" fillOpacity="0.80" />
                  <text x="26" y="68" fontSize="8" fill="white" fontWeight="600" fontFamily="monospace">STROKE 2 — CATEGORIES</text>

                  {/* Vertical stem */}
                  <rect x="20" y="88" width="12" height="145" rx="3" fill="#457b9d" fillOpacity="0.80" />

                  {/* Content rows — fading right */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <g key={i}>
                      <rect x="44" y={92 + i * 29} width={170 - i * 18} height="7" rx="2" fill="white" fillOpacity={0.18 - i * 0.02} />
                      <rect x="44" y={103 + i * 29} width={120 - i * 14} height="5" rx="2" fill="white" fillOpacity={0.09 - i * 0.01} />
                    </g>
                  ))}

                  {/* Sidebar */}
                  <rect x="225" y="88" width="55" height="145" rx="4" fill="white" fillOpacity="0.05" />
                  <text x="228" y="108" fontSize="7" fill="white" fillOpacity="0.25" fontFamily="monospace" fontWeight="600">SIDEBAR</text>

                  {/* Arrow annotations */}
                  <text x="22" y="248" fontSize="8" fill="#457b9d" fontWeight="600" fontFamily="monospace">VERTICAL SCAN</text>
                  <path d="M20 235 L20 240 L280 240" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
                </svg>
              </div>
              <div className="flex-1 space-y-4">
                {[
                  { label: "Stroke 1", color: "#e63946", desc: "Full-width sweep across the top. Captures headline, navigation, featured story. Highest fixation density — design your best content here." },
                  { label: "Stroke 2", color: "#e9c46a", desc: "Shorter sweep, 50–70% of page width. Captures categories, filters, search, and secondary headlines. Attention fades sharply to the right." },
                  { label: "Vertical", color: "#457b9d", desc: "Downward scan along the left edge. Captures article numbers, thumbnails, and the first few words of each headline. Right side of content is largely unseen." },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: item.color }} />
                    <div>
                      <span className="text-xs font-bold" style={{ color: item.color }}>{item.label}: </span>
                      <span className="text-xs text-gray-400 leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================ */}
      {/* SECTION 7: FOOTER                                                */}
      {/* ================================================================ */}
      <footer className="border-t border-gray-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="6" fill="#1a1a2e" />
                  <path d="M8 7h12M8 7v14M8 14h8" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <span className="text-base font-bold text-[#1a1a2e]">F-Pattern Layout</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                Content-first design based on Nielsen Norman Group eye-tracking research. Every placement decision follows the F reading path.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-0.5 bg-[#e63946] rounded-full" />
                <span>Primary: #1a1a2e</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-0.5 bg-[#e63946] rounded-full" />
                <span>Accent: #e63946 · #457b9d · #2a9d8f · #e9c46a</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-0.5 bg-gray-300 rounded-full" />
                <span>Background: #f8f9fa</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              F-Pattern Layout &mdash; StyleKit Design System
            </span>
            <div className="flex gap-6 text-xs text-gray-400">
              <span className="hover:text-[#1a1a2e] cursor-pointer transition-colors duration-150">Documentation</span>
              <span className="hover:text-[#1a1a2e] cursor-pointer transition-colors duration-150">NN/g Research</span>
              <span className="hover:text-[#1a1a2e] cursor-pointer transition-colors duration-150">Examples</span>
              <Link href="/styles" className="hover:text-[#1a1a2e] transition-colors duration-150">All Styles</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
