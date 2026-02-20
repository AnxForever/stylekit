"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Inline useInView                                                   */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  RevealBlock                                                        */
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

/* ================================================================== */
/*  F-Pattern Layout Showcase                                          */
/* ================================================================== */
export default function FPatternLayoutShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a2e]">
      {/* ============================================================ */}
      {/*  FIXED NAV                                                    */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-[#1a1a2e]">
            F-Pattern
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <a href="#f-demo" className="hover:text-[#1a1a2e] transition-colors">Demo</a>
            <a href="#components" className="hover:text-[#1a1a2e] transition-colors">Components</a>
            <a href="#palette" className="hover:text-[#1a1a2e] transition-colors">Palette</a>
            <a href="#rules" className="hover:text-[#1a1a2e] transition-colors">Rules</a>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div
          className="max-w-6xl mx-auto px-6 py-20 md:py-28"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* F-shape SVG overlay */}
          <svg
            className="absolute top-8 right-8 w-48 h-48 opacity-[0.04]"
            viewBox="0 0 200 200"
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="6"
          >
            <path d="M40 20 L160 20" />
            <path d="M40 20 L40 180" />
            <path d="M40 90 L130 90" />
          </svg>

          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#e63946] mb-4">
            Layout Style
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1a1a2e] mb-4 max-w-3xl">
            F-Pattern Layout
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-prose mb-8 leading-relaxed">
            Based on eye-tracking research by the Nielsen Norman Group. Users scan
            web pages in an F-shaped pattern: two horizontal stripes followed by a
            vertical movement down the left side.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 text-xs font-medium bg-[#1a1a2e] text-white rounded-full">
              Eye-Tracking
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-[#e63946]/10 text-[#e63946] rounded-full">
              Content-First
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-[#457b9d]/10 text-[#457b9d] rounded-full">
              Scannable
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LIVE F-PATTERN DEMO                                          */}
      {/* ============================================================ */}
      <section id="f-demo" className="max-w-6xl mx-auto px-6 py-16">
        <RevealBlock>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            Live F-Pattern Demo
          </h2>
          <p className="text-gray-500 mb-8 max-w-prose">
            The three strokes of the F: a full-width top bar, a shorter secondary
            scan, and a vertical content stream on the left.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Stroke 1 -- full-width header */}
            <div className="relative border-b border-gray-100 p-6 md:p-8">
              <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-[#e63946]/60 uppercase tracking-widest">
                Stroke 1 - Full-width scan
              </div>
              <div className="pt-4 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#e63946]">
                    Featured
                  </span>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mt-1 mb-2">
                    Understanding F-Pattern Reading Behavior
                  </h3>
                  <p className="text-gray-500 text-sm max-w-prose leading-relaxed">
                    Eye-tracking studies show users rarely read web content word by
                    word. Instead they scan in an F-shaped pattern, focusing on the
                    top and left side of the page.
                  </p>
                </div>
                <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-300 text-sm">
                  Hero Image
                </div>
              </div>
            </div>

            {/* Stroke 2 -- shorter secondary bar */}
            <div className="relative border-b border-gray-100 px-6 md:px-8 py-4">
              <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-[#457b9d]/60 uppercase tracking-widest">
                Stroke 2 - Secondary scan
              </div>
              <div className="pt-4 flex flex-wrap gap-2">
                {["All", "Research", "Design", "Development", "UX"].map((tag) => (
                  <button
                    key={tag}
                    className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-150 ${
                      tag === "All"
                        ? "bg-[#1a1a2e] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Stroke 3 -- vertical left content + sidebar */}
            <div className="relative flex flex-col md:flex-row">
              <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-[#2a9d8f]/60 uppercase tracking-widest z-10">
                Stroke 3 - Vertical scan
              </div>

              {/* Main content list */}
              <div className="flex-1 pt-6 divide-y divide-gray-100">
                {[
                  { title: "How Users Read on the Web", cat: "Research", time: "8 min" },
                  { title: "Designing for Scannable Content", cat: "Design", time: "5 min" },
                  { title: "Content Hierarchy Best Practices", cat: "UX", time: "6 min" },
                  { title: "Left-Aligned Layouts and Readability", cat: "Development", time: "4 min" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex gap-4 px-6 md:px-8 py-5 hover:bg-gray-50/70 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 group-hover:contrast-110 group-hover:brightness-95 transition-all duration-200" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-[#1a1a2e] group-hover:text-[#e63946] group-hover:translate-x-1 transition-all duration-200">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.cat} &middot; {item.time} read
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <aside className="w-full md:w-56 flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-100 p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Trending
                </h4>
                {["Eye-tracking", "Typography", "Grid Systems", "Whitespace"].map((t, i) => (
                  <div
                    key={i}
                    className="text-sm text-[#1a1a2e] py-2 border-b border-gray-100 last:border-0 hover:text-[#457b9d] cursor-pointer transition-colors duration-150"
                  >
                    {t}
                  </div>
                ))}

                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-6 mb-3">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {["UX", "Layout", "Reading", "Research"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-500 rounded-full hover:bg-[#e63946]/10 hover:text-[#e63946] cursor-pointer transition-colors duration-150"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </RevealBlock>

        {/* F-shape annotation */}
        <RevealBlock delay={0.3} className="mt-8">
          <div className="bg-[#1a1a2e] rounded-xl p-6 md:p-8 text-white">
            <h3 className="text-lg font-bold mb-4">F-Shape Anatomy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-0.5 bg-[#e63946]" />
                  <span className="font-semibold text-[#e63946]">Stroke 1</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Full-width horizontal scan across the top. Users read headlines,
                  featured content, and navigation links first.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-0.5 bg-[#457b9d]" />
                  <span className="font-semibold text-[#457b9d]">Stroke 2</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  A shorter horizontal scan below the first. Typically covers
                  sub-navigation, categories, or secondary headlines.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-0.5 h-8 bg-[#2a9d8f]" />
                  <span className="font-semibold text-[#2a9d8f]">Vertical</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Users scan down the left side, reading the beginning of each
                  line. Strong left-alignment is essential.
                </p>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/*  COMPONENT DEMOS (tab-switched)                               */}
      {/* ============================================================ */}
      <section id="components" className="max-w-6xl mx-auto px-6 py-16">
        <RevealBlock>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            Component Library
          </h2>
          <p className="text-gray-500 mb-8 max-w-prose">
            Core UI components designed for scannable, content-first layouts.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          {/* Tab bar */}
          <div className="flex gap-1 mb-8 bg-gray-100 rounded-lg p-1 w-fit">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-[#1a1a2e] shadow-sm"
                    : "text-gray-500 hover:text-[#1a1a2e]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12">
            {activeTab === "button" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Primary CTA
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
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Secondary / Ghost
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 border border-gray-200 text-[#1a1a2e] rounded-lg font-medium hover:border-[#e63946] hover:text-[#e63946] active:scale-[0.98] transition-all duration-150">
                      Bookmark
                    </button>
                    <button className="px-6 py-3 text-gray-500 font-medium hover:text-[#1a1a2e] hover:bg-gray-50 rounded-lg active:scale-[0.98] transition-all duration-150">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "card" && (
              <div className="space-y-4">
                {[
                  {
                    title: "Eye-Tracking and Web Design",
                    summary:
                      "How understanding gaze patterns improves content placement and increases engagement rates across different page types.",
                    cat: "Research",
                    time: "8 min",
                  },
                  {
                    title: "Building Scannable Interfaces",
                    summary:
                      "Practical techniques for structuring content so users can quickly find what they need without reading everything.",
                    cat: "Design",
                    time: "5 min",
                  },
                  {
                    title: "Typography for Readability",
                    summary:
                      "Choosing typefaces, line heights, and column widths that support natural reading patterns.",
                    cat: "Development",
                    time: "6 min",
                  },
                ].map((item, i) => (
                  <article
                    key={i}
                    className="group flex gap-6 p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/70 hover:shadow-sm transition-all duration-200 cursor-pointer relative"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 group-hover:contrast-125 group-hover:brightness-95 transition-all duration-200" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-[#1a1a2e] mb-1 line-clamp-1 group-hover:text-[#e63946] group-hover:translate-x-1 group-hover:underline underline-offset-4 decoration-1 transition-all duration-200">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                        {item.summary}
                      </p>
                      <span className="text-xs text-gray-400">
                        {item.cat} &middot; {item.time} read
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activeTab === "input" && (
              <div className="space-y-8 max-w-lg">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Search
                  </h3>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#457b9d]/20 focus:border-[#457b9d] transition-all"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Newsletter Signup
                  </h3>
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
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
                    Comment
                  </h3>
                  <textarea
                    placeholder="Share your thoughts..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a2e] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#457b9d]/20 focus:border-[#457b9d] transition-all resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/*  COLOR PALETTE                                                */}
      {/* ============================================================ */}
      <section id="palette" className="max-w-6xl mx-auto px-6 py-16">
        <RevealBlock>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            Color Palette
          </h2>
          <p className="text-gray-500 mb-8 max-w-prose">
            A restrained palette that prioritizes readability. Accent colors are
            used sparingly to guide the eye along the F-shape.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Primary", value: "#1a1a2e", text: "white" },
              { name: "Secondary", value: "#f8f9fa", text: "#1a1a2e" },
              { name: "Accent Red", value: "#e63946", text: "white" },
              { name: "Accent Blue", value: "#457b9d", text: "white" },
              { name: "Accent Teal", value: "#2a9d8f", text: "white" },
              { name: "Accent Gold", value: "#e9c46a", text: "#1a1a2e" },
            ].map((c) => (
              <div
                key={c.value}
                className="group rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="h-24 flex items-end p-4"
                  style={{ backgroundColor: c.value }}
                >
                  <span
                    className="text-xs font-mono font-bold opacity-80"
                    style={{ color: c.text }}
                  >
                    {c.value}
                  </span>
                </div>
                <div className="bg-white px-4 py-3">
                  <span className="text-sm font-medium text-[#1a1a2e]">
                    {c.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/*  DESIGN RULES                                                 */}
      {/* ============================================================ */}
      <section id="rules" className="max-w-6xl mx-auto px-6 py-16">
        <RevealBlock>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2">
            Design Rules
          </h2>
          <p className="text-gray-500 mb-8 max-w-prose">
            Guidelines derived from eye-tracking research to maximize content
            scannability and reading flow.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DO */}
          <RevealBlock delay={0.1}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#2a9d8f]/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#2a9d8f]">Do</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Place the most important content at the top (first horizontal stroke)",
                  "Use left-aligned navigation and key information (vertical stroke)",
                  "Maintain clear heading hierarchy: h1 > h2 > h3",
                  "Use lists and sections for scannability",
                  "Keep text left-aligned to match reading habits",
                  "Use max-w-prose to limit line width for readability",
                ].map((rule, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="text-[#2a9d8f] font-bold flex-shrink-0">+</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* DON'T */}
          <RevealBlock delay={0.2}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#e63946]/10 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4L12 12M12 4L4 12" stroke="#e63946" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#e63946]">Don&apos;t</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Place important content in the bottom-right corner",
                  "Center-align large blocks of text",
                  "Ignore content priority ordering",
                  "Use long paragraphs without segmentation",
                  "Leave excessive whitespace on the left side",
                ].map((rule, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="text-[#e63946] font-bold flex-shrink-0">&minus;</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>

        {/* Interaction rules */}
        <RevealBlock delay={0.3} className="mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-6">
              Interaction Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Eye-Tracking Guides",
                  desc: "List items shift right on hover (translate-x-1) or reveal underlines to help users lock on during scanning.",
                  color: "#e63946",
                },
                {
                  title: "Fast Feedback",
                  desc: "Use duration-150 to duration-200 for news/content interactions. Avoid long transitions that interrupt reading.",
                  color: "#457b9d",
                },
                {
                  title: "Contrast Pop",
                  desc: "Hovered items use subtle shadow or border contrast to visually separate from the content stream.",
                  color: "#2a9d8f",
                },
                {
                  title: "Image Focus",
                  desc: "Thumbnails increase contrast or brightness on hover as click affordance, but the effect stays restrained.",
                  color: "#e9c46a",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className="w-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a2e] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* F-shape visual anatomy */}
        <RevealBlock delay={0.4} className="mt-6">
          <div className="bg-[#1a1a2e] rounded-xl p-6 md:p-8 text-white">
            <h3 className="text-lg font-bold mb-6">F-Pattern Visual Anatomy</h3>
            <div className="relative w-full max-w-md mx-auto">
              <svg viewBox="0 0 300 240" className="w-full" fill="none">
                {/* Stroke 1 */}
                <rect x="20" y="20" width="260" height="16" rx="3" fill="#e63946" opacity="0.8" />
                <text x="26" y="32" fontSize="9" fill="white" fontWeight="600">
                  Stroke 1: Header + Featured Content
                </text>

                {/* Stroke 2 */}
                <rect x="20" y="56" width="180" height="12" rx="3" fill="#457b9d" opacity="0.8" />
                <text x="26" y="66" fontSize="8" fill="white" fontWeight="600">
                  Stroke 2: Categories / Search
                </text>

                {/* Vertical stem */}
                <rect x="20" y="86" width="12" height="130" rx="3" fill="#2a9d8f" opacity="0.8" />

                {/* Content lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <rect
                      x="44"
                      y={90 + i * 26}
                      width={140 - i * 10}
                      height="6"
                      rx="2"
                      fill="white"
                      opacity="0.15"
                    />
                    <rect
                      x="44"
                      y={100 + i * 26}
                      width={100 - i * 8}
                      height="4"
                      rx="2"
                      fill="white"
                      opacity="0.08"
                    />
                  </g>
                ))}

                {/* Sidebar area */}
                <rect x="210" y="86" width="70" height="130" rx="4" fill="white" opacity="0.06" />
                <text x="220" y="106" fontSize="7" fill="white" opacity="0.3" fontWeight="600">
                  Sidebar
                </text>

                {/* Labels */}
                <text x="22" y="232" fontSize="8" fill="#2a9d8f" fontWeight="600">
                  Vertical scan (left edge)
                </text>
              </svg>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-400">
            F-Pattern Layout &mdash; Content-first design based on eye-tracking research
          </span>
          <div className="flex gap-6 text-sm text-gray-400">
            <span className="hover:text-[#1a1a2e] cursor-pointer transition-colors duration-150">
              Documentation
            </span>
            <span className="hover:text-[#1a1a2e] cursor-pointer transition-colors duration-150">
              Examples
            </span>
            <span className="hover:text-[#1a1a2e] cursor-pointer transition-colors duration-150">
              Research
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
