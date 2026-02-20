"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                        */
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
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

type Article = {
  id: number;
  category: string;
  categoryColor: "red" | "teal" | "gold" | "dark";
  headline: string;
  teaser: string;
  author: string;
  date: string;
  words: number;
  size: "featured" | "secondary" | "brief";
};

const articles: Article[] = [
  {
    id: 1,
    category: "Politics",
    categoryColor: "red",
    headline: "Global Leaders Convene for Historic Climate Summit in Geneva",
    teaser:
      "World leaders gathered in Geneva this week for what analysts are calling the most consequential climate summit in a decade. With emissions targets failing across major economies, the pressure to produce binding commitments has never been greater. Delegates from 140 nations arrived with draft proposals, but finding common ground remains elusive given diverging economic priorities.",
    author: "Eleanor Whitfield",
    date: "Feb 20, 2026",
    words: 1840,
    size: "featured",
  },
  {
    id: 2,
    category: "Culture",
    categoryColor: "teal",
    headline: "The Return of Print: Why Physical Magazines Are Thriving Again",
    teaser:
      "In an era of infinite digital scroll, a surprising number of readers are turning back to ink on paper. Independent magazine publishers report double-digit circulation growth for the third consecutive year, driven by readers seeking depth, curation, and the tactile pleasure of a well-designed spread.",
    author: "Marcus Chen",
    date: "Feb 19, 2026",
    words: 2100,
    size: "secondary",
  },
  {
    id: 3,
    category: "Technology",
    categoryColor: "gold",
    headline: "AI-Assisted Newsrooms: Promise and Peril",
    teaser:
      "Editorial teams adopting artificial intelligence tools report dramatic gains in output — but at what cost to journalistic instinct?",
    author: "Priya Nair",
    date: "Feb 18, 2026",
    words: 920,
    size: "brief",
  },
  {
    id: 4,
    category: "Sports",
    categoryColor: "red",
    headline: "Marathon Season Opens with Record Participation",
    teaser:
      "This spring's marathon circuit has registered more entrants than any previous season, reflecting a post-pandemic surge in endurance sport.",
    author: "James Okafor",
    date: "Feb 17, 2026",
    words: 640,
    size: "brief",
  },
  {
    id: 5,
    category: "Politics",
    categoryColor: "red",
    headline: "Senate Panel Moves Forward on Infrastructure Bill",
    teaser:
      "A bipartisan infrastructure bill cleared committee review on Thursday, setting the stage for a full Senate vote as early as next month.",
    author: "Sofia Marchand",
    date: "Feb 16, 2026",
    words: 710,
    size: "brief",
  },
];

const categories = ["All", "Politics", "Culture", "Technology", "Sports"];

const colorSwatches = [
  {
    name: "Near Black",
    hex: "#1a1a1a",
    role: "Body text, headlines",
    light: false,
    context: "text",
  },
  {
    name: "Near White",
    hex: "#fafafa",
    role: "Background surface",
    light: true,
    context: "bg",
  },
  {
    name: "Red",
    hex: "#e63946",
    role: "Breaking, accent, badges",
    light: false,
    context: "accent",
  },
  {
    name: "Teal",
    hex: "#2a9d8f",
    role: "Features, culture",
    light: false,
    context: "badge",
  },
  {
    name: "Gold",
    hex: "#e9c46a",
    role: "Special reports",
    light: true,
    context: "badge",
  },
  {
    name: "Dark Teal",
    hex: "#264653",
    role: "Deep accent, footer",
    light: false,
    context: "button",
  },
];

const typographyLevels = [
  {
    label: "Display",
    cls: "text-6xl font-black leading-none tracking-tight",
    sample: "The Press Endures",
    note: "text-6xl / font-black / Hero headlines",
  },
  {
    label: "Headline",
    cls: "text-3xl font-black leading-tight tracking-tight",
    sample: "Editorial Integrity in the Digital Age",
    note: "text-3xl / font-black / Section titles",
  },
  {
    label: "Subhead",
    cls: "text-xl font-bold leading-snug",
    sample: "Circulation Numbers Challenge Pessimists",
    note: "text-xl / font-bold / Article subheads",
  },
  {
    label: "Body",
    cls: "text-base font-normal leading-relaxed",
    sample:
      "The newsroom floor hummed with the quiet industry of deadline-driven journalism, each reporter a node in a network of verified fact.",
    note: "text-base / font-normal / Article body",
  },
  {
    label: "Caption",
    cls: "text-xs font-medium uppercase tracking-widest",
    sample: "PHOTOGRAPH BY ANNA KOWALSKI — REUTERS",
    note: "text-xs / uppercase / tracking-widest",
  },
];

const doRules = [
  "Use CSS grid with mixed col/row spans to create genuine magazine hierarchy",
  "Assign red to breaking news only — preserve semantic weight",
  "Keep headlines font-black with leading-tight for typographic authority",
  "Separate sections with thin border-t border-[#1a1a1a]/20 rule lines",
  "Category badges uppercase tracking-widest px-2 py-0.5 text-xs font-bold",
  "Author bylines in a consistent format: Name / Date / Word count",
];

const dontRules = [
  "Do not center body text — left-aligned prose respects reading flow",
  "Do not use more than 4 accent colors — red/teal/gold/dark teal only",
  "Do not apply shadows to article cards — borders carry structural meaning",
  "Do not use rounded-full on category badges — pill shapes dilute authority",
  "Do not scale or float images freely — constrain to grid columns strictly",
  "Do not omit word counts and dates — readers use them to prioritize reading",
];

/* ------------------------------------------------------------------ */
/*  Badge component                                                     */
/* ------------------------------------------------------------------ */

function CategoryBadge({
  category,
  color,
}: {
  category: string;
  color: "red" | "teal" | "gold" | "dark";
}) {
  const colorMap: Record<string, string> = {
    red: "bg-[#e63946] text-white",
    teal: "bg-[#2a9d8f] text-white",
    gold: "bg-[#e9c46a] text-[#1a1a1a]",
    dark: "bg-[#264653] text-white",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-widest ${colorMap[color]}`}
    >
      {category}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Article card                                                        */
/* ------------------------------------------------------------------ */

function ArticleCard({
  article,
  expanded,
  onExpand,
}: {
  article: Article;
  expanded: boolean;
  onExpand: () => void;
}) {
  return (
    <div
      className="group bg-white border border-[#1a1a1a]/10 hover:border-l-2 hover:border-l-[#e63946] cursor-pointer transition-all duration-200 p-4 h-full flex flex-col"
      onClick={onExpand}
    >
      <div className="mb-2">
        <CategoryBadge category={article.category} color={article.categoryColor} />
      </div>
      <h3
        className={`font-black leading-tight text-[#1a1a1a] mb-2 ${
          article.size === "featured"
            ? "text-2xl"
            : article.size === "secondary"
              ? "text-xl"
              : "text-base"
        }`}
      >
        {article.headline}
      </h3>
      <p
        className={`text-sm text-[#1a1a1a]/70 leading-relaxed mb-3 ${expanded ? "" : "line-clamp-3"}`}
      >
        {article.teaser}
      </p>
      <div className="mt-auto flex items-center justify-between text-xs text-[#1a1a1a]/40 border-t border-[#1a1a1a]/10 pt-2">
        <span className="font-medium">{article.author}</span>
        <span>{article.date}</span>
        <span>{article.words.toLocaleString()} words</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Grid layout demo panel                                              */
/* ------------------------------------------------------------------ */

type GridLayout = "3col" | "2col" | "1col";

function GridDemo({
  layout,
  articles: arts,
}: {
  layout: GridLayout;
  articles: Article[];
}) {
  const cols =
    layout === "3col"
      ? "grid-cols-3"
      : layout === "2col"
        ? "grid-cols-2"
        : "grid-cols-1";
  return (
    <div className={`grid ${cols} gap-4`}>
      {arts.map((a) => (
        <div
          key={a.id}
          className="bg-white border border-[#1a1a1a]/10 p-4"
        >
          <CategoryBadge category={a.category} color={a.categoryColor} />
          <p className="text-sm font-black leading-tight text-[#1a1a1a] mt-2">
            {a.headline}
          </p>
          <p className="text-xs text-[#1a1a1a]/50 mt-1">{a.author}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [gridLayout, setGridLayout] = useState<GridLayout>("3col");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  const { ref: heroRef } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filteredArticles = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;

  const featuredArticle = articles[0];
  const secondaryArticle = articles[1];
  const briefArticles = articles.slice(2);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a]">
      {/* ================================================================ */}
      {/* 1. Fixed Nav                                                      */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Masthead */}
            <span className="text-lg font-black tracking-tight uppercase text-[#1a1a1a]">
              StyleKit <span className="text-[#e63946]">Magazine</span>
            </span>

            {/* Section nav */}
            <nav className="hidden md:flex items-center gap-6">
              {["Politics", "Culture", "Technology", "Sports", "Grid"].map((section) => (
                <a
                  key={section}
                  href={`#${section.toLowerCase()}`}
                  className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/60 hover:text-[#e63946] transition-colors duration-150"
                >
                  {section}
                </a>
              ))}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <svg
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#1a1a1a]/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-7 pr-3 py-1 bg-white border border-[#1a1a1a]/20 text-xs focus:outline-none focus:border-[#e63946] w-32 transition-colors duration-150"
                />
              </div>
              <time className="text-xs text-[#1a1a1a]/40 hidden md:block font-medium uppercase tracking-widest">
                Feb 20, 2026
              </time>
              <Link
                href="/styles"
                className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/50 hover:text-[#e63946] transition-colors duration-150"
              >
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. Hero Magazine Spread                                           */}
      {/* ================================================================ */}
      <section className="pt-20 pb-0 border-b border-[#1a1a1a]" ref={heroRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Issue banner */}
          <div
            className="py-2 border-b border-[#1a1a1a]/20 flex items-center gap-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.5s ease 0.05s",
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">
              Volume XLII
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40">
              Issue 08
            </span>
            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-[#e63946]">
              Breaking Now
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left: large image placeholder */}
            <div className="md:col-span-7 border-r border-[#1a1a1a]/20">
              <div
                className="h-72 md:h-[480px] flex items-end relative"
                style={{
                  background:
                    "linear-gradient(135deg, #264653 0%, #2a9d8f 40%, #e9c46a 100%)",
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/70 px-6 py-3">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-white/70">
                    Photograph by Anna Kowalski — Reuters / Geneva, Feb 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Right: headline block */}
            <div className="md:col-span-5 flex flex-col justify-between p-6 md:p-8">
              <div>
                <div
                  className="mb-4"
                  style={{
                    opacity: heroRevealed ? 1 : 0,
                    transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                    transition:
                      "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
                  }}
                >
                  <CategoryBadge
                    category={featuredArticle.category}
                    color={featuredArticle.categoryColor}
                  />
                </div>

                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight text-[#1a1a1a] mb-4"
                  style={{
                    opacity: heroRevealed ? 1 : 0,
                    transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                    transition:
                      "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s",
                  }}
                >
                  {featuredArticle.headline}
                </h1>

                <p
                  className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-6"
                  style={{
                    opacity: heroRevealed ? 1 : 0,
                    transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                    transition:
                      "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.38s",
                  }}
                >
                  {featuredArticle.teaser}
                </p>
              </div>

              {/* Byline */}
              <div
                className="flex items-center justify-between border-t border-[#1a1a1a]/20 pt-4"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.7s ease 0.5s",
                }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">
                    {featuredArticle.author}
                  </p>
                  <p className="text-xs text-[#1a1a1a]/40 mt-0.5">
                    {featuredArticle.date} &mdash;{" "}
                    {featuredArticle.words.toLocaleString()} words
                  </p>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold uppercase tracking-widest text-[#e63946] border border-[#e63946] px-3 py-1 hover:bg-[#e63946] hover:text-white transition-colors duration-150"
                >
                  Read
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. Editorial Grid                                                 */}
      {/* ================================================================ */}
      <section id="politics" className="py-12 md:py-16 border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock className="mb-8">
            <div className="flex items-center gap-4 border-b border-[#1a1a1a] pb-3">
              <h2 className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a]">
                Today&apos;s Edition
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                Featured Coverage
              </span>
            </div>
          </RevealBlock>

          {/* Magazine CSS grid — authentic mixed-size layout */}
          <RevealBlock delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1a1a1a]/20">
              {/* Featured story: col-span-2 row-span-2 */}
              <div className="md:col-span-2 md:row-span-2 border-r border-[#1a1a1a]/20 border-b border-[#1a1a1a]/20 md:border-b-0 p-6 flex flex-col group hover:border-l-2 hover:border-l-[#e63946] transition-all duration-200 cursor-pointer">
                {/* Image placeholder */}
                <div
                  className="h-48 md:h-72 mb-4 flex items-end p-3"
                  style={{
                    background:
                      "linear-gradient(160deg, #264653 0%, #2a9d8f 100%)",
                  }}
                >
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                    Geneva Climate Summit
                  </span>
                </div>
                <div className="mb-2">
                  <CategoryBadge
                    category={featuredArticle.category}
                    color={featuredArticle.categoryColor}
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-black leading-tight text-[#1a1a1a] mb-3">
                  {featuredArticle.headline}
                </h3>
                <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-4 line-clamp-3">
                  {featuredArticle.teaser}
                </p>
                <div className="mt-auto flex items-center gap-3 text-xs text-[#1a1a1a]/40 border-t border-[#1a1a1a]/10 pt-3">
                  <span className="font-bold text-[#1a1a1a]">{featuredArticle.author}</span>
                  <span>{featuredArticle.date}</span>
                  <span className="ml-auto">{featuredArticle.words.toLocaleString()} words</span>
                </div>
              </div>

              {/* Secondary story: col-span-1 row-span-2 */}
              <div className="md:row-span-2 border-b border-[#1a1a1a]/20 p-5 flex flex-col group hover:border-l-2 hover:border-l-[#2a9d8f] transition-all duration-200 cursor-pointer">
                <div
                  className="h-32 mb-3 flex items-end p-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #2a9d8f 0%, #264653 100%)",
                  }}
                >
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                    Media & Culture
                  </span>
                </div>
                <div className="mb-2">
                  <CategoryBadge
                    category={secondaryArticle.category}
                    color={secondaryArticle.categoryColor}
                  />
                </div>
                <h3 className="text-lg font-black leading-tight text-[#1a1a1a] mb-2">
                  {secondaryArticle.headline}
                </h3>
                <p className="text-xs text-[#1a1a1a]/60 leading-relaxed mb-3 line-clamp-4 flex-1">
                  {secondaryArticle.teaser}
                </p>
                <div className="flex items-center justify-between text-xs text-[#1a1a1a]/40 border-t border-[#1a1a1a]/10 pt-2 mt-auto">
                  <span className="font-bold text-[#1a1a1a] text-[11px]">{secondaryArticle.author}</span>
                  <span>{secondaryArticle.words.toLocaleString()} words</span>
                </div>
              </div>

              {/* 3 briefs row */}
              {briefArticles.map((article, i) => (
                <div
                  key={article.id}
                  className={`p-4 border-t border-[#1a1a1a]/20 ${
                    i < briefArticles.length - 1 ? "border-r border-[#1a1a1a]/20" : ""
                  } group hover:border-l-2 hover:border-l-[#e63946] transition-all duration-200 cursor-pointer`}
                >
                  <div className="mb-1.5">
                    <CategoryBadge category={article.category} color={article.categoryColor} />
                  </div>
                  <h4 className="text-sm font-black leading-tight text-[#1a1a1a] mb-1.5">
                    {article.headline}
                  </h4>
                  <p className="text-xs text-[#1a1a1a]/50 leading-relaxed line-clamp-2 mb-2">
                    {article.teaser}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-[#1a1a1a]/30">
                    <span className="font-bold text-[#1a1a1a]/50">{article.author}</span>
                    <span>{article.words} words</span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. Typography System                                              */}
      {/* ================================================================ */}
      <section
        id="typography"
        className="py-12 md:py-16 bg-white border-b border-[#1a1a1a]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock className="mb-10">
            <div className="border-b border-[#1a1a1a] pb-3 flex items-center gap-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Typography System
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                Type Scale
              </span>
            </div>
          </RevealBlock>

          {/* Type scale rows */}
          <div className="space-y-0">
            {typographyLevels.map((level, i) => (
              <RevealBlock key={level.label} delay={i * 0.06}>
                <div className="group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6 py-6 border-b border-[#1a1a1a]/10 hover:bg-[#fafafa] transition-colors duration-150 px-2">
                  <div className="md:w-20 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#e63946]">
                      {level.label}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className={`${level.cls} text-[#1a1a1a] truncate`}>{level.sample}</p>
                  </div>
                  <div className="md:w-64 shrink-0">
                    <p className="text-[11px] text-[#1a1a1a]/40">{level.note}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Pull quote + dropcap examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <RevealBlock delay={0.1}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-4">
                  Pull Quote
                </p>
                <blockquote className="border-l-4 border-[#e63946] pl-6">
                  <p className="text-2xl italic font-bold leading-snug text-[#1a1a1a] mb-3">
                    &ldquo;The press is the guardian of the public mind — its
                    dissolution is the dissolution of civic life itself.&rdquo;
                  </p>
                  <cite className="text-xs font-bold uppercase tracking-widest text-[#e63946] not-italic">
                    Eleanor Whitfield, Senior Correspondent
                  </cite>
                </blockquote>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-4">
                  Dropcap Body Text
                </p>
                <div className="text-sm leading-relaxed text-[#1a1a1a]/80">
                  <span className="float-left text-6xl font-black leading-none mr-2 mt-1 text-[#e63946]">
                    T
                  </span>
                  he Geneva summit opened under overcast skies with delegates from
                  140 nations filing into the Palais des Nations. The weight of
                  expectation was palpable — three years of failed agreements had
                  pushed this gathering to the edge of a defining moment for global
                  climate policy. Negotiations began in earnest before the official
                  ceremony concluded.
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. Component Showcase                                             */}
      {/* ================================================================ */}
      <section
        id="culture"
        className="py-12 md:py-16 border-b border-[#1a1a1a]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock className="mb-10">
            <div className="border-b border-[#1a1a1a] pb-3 flex items-center gap-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Component Showcase
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                UI Elements
              </span>
            </div>
          </RevealBlock>

          {/* Category badges */}
          <RevealBlock className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-4">
              Category Badge Variants
            </p>
            <div className="flex flex-wrap gap-3">
              <CategoryBadge category="Politics" color="red" />
              <CategoryBadge category="Culture" color="teal" />
              <CategoryBadge category="Technology" color="gold" />
              <CategoryBadge category="Sports" color="red" />
              <CategoryBadge category="Special Report" color="dark" />
              <CategoryBadge category="Breaking" color="red" />
              <CategoryBadge category="Opinion" color="teal" />
              <CategoryBadge category="Investigation" color="dark" />
            </div>
          </RevealBlock>

          {/* Article card hover effects */}
          <RevealBlock className="mb-10" delay={0.05}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-4">
              Article Card — Hover to reveal red left border
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {articles.slice(0, 3).map((a) => (
                <ArticleCard
                  key={a.id}
                  article={a}
                  expanded={expandedArticle === a.id}
                  onExpand={() =>
                    setExpandedArticle(expandedArticle === a.id ? null : a.id)
                  }
                />
              ))}
            </div>
            <p className="text-xs text-[#1a1a1a]/40 mt-3">
              Click a card to expand / collapse the teaser text.
            </p>
          </RevealBlock>

          {/* Search + Byline + Pagination */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Search */}
            <RevealBlock delay={0.08}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-3">
                Search Input
              </p>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a]/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#1a1a1a] text-sm text-[#1a1a1a] focus:outline-none focus:border-[#e63946] transition-colors duration-150 placeholder:text-[#1a1a1a]/30"
                />
              </div>
            </RevealBlock>

            {/* Byline */}
            <RevealBlock delay={0.1}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-3">
                Byline Component
              </p>
              <div className="bg-white border border-[#1a1a1a]/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#264653] flex items-center justify-center text-white text-xs font-black">
                    EW
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#1a1a1a]">
                      Eleanor Whitfield
                    </p>
                    <p className="text-[10px] text-[#1a1a1a]/40 uppercase tracking-widest mt-0.5">
                      Senior Correspondent &mdash; Feb 20, 2026
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Pagination */}
            <RevealBlock delay={0.12}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-3">
                Pagination
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a]/20 text-xs text-[#1a1a1a]/40 hover:border-[#e63946] hover:text-[#e63946] transition-colors duration-150"
                >
                  &laquo;
                </button>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold border transition-colors duration-150 ${
                      n === 2
                        ? "bg-[#e63946] border-[#e63946] text-white"
                        : "border-[#1a1a1a]/20 text-[#1a1a1a]/60 hover:border-[#e63946] hover:text-[#e63946]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center border border-[#1a1a1a]/20 text-xs text-[#1a1a1a]/40 hover:border-[#e63946] hover:text-[#e63946] transition-colors duration-150"
                >
                  &raquo;
                </button>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. Color System                                                   */}
      {/* ================================================================ */}
      <section
        id="technology"
        className="py-12 md:py-16 bg-white border-b border-[#1a1a1a]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock className="mb-10">
            <div className="border-b border-[#1a1a1a] pb-3 flex items-center gap-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Color System
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                Editorial Palette
              </span>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.name} delay={i * 0.05}>
                <div className="bg-white border border-[#1a1a1a]/10">
                  {/* Swatch block */}
                  <div
                    className="h-20 flex items-end p-2"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <span
                      className="text-[9px] font-mono font-bold"
                      style={{ color: swatch.light ? "#1a1a1a" : "#fafafa", opacity: 0.8 }}
                    >
                      {swatch.hex}
                    </span>
                  </div>
                  {/* Context strip */}
                  <div className="p-3 border-t border-[#1a1a1a]/10">
                    <p className="text-xs font-black text-[#1a1a1a] mb-0.5">{swatch.name}</p>
                    <p className="text-[10px] text-[#1a1a1a]/50 leading-tight">{swatch.role}</p>
                    {/* Usage preview */}
                    <div className="mt-2">
                      {swatch.context === "text" && (
                        <p style={{ color: swatch.hex }} className="text-[11px] font-black">
                          Aa Body
                        </p>
                      )}
                      {swatch.context === "bg" && (
                        <div
                          className="h-4 border border-[#1a1a1a]/20 flex items-center px-1"
                          style={{ backgroundColor: swatch.hex }}
                        >
                          <span className="text-[9px] font-bold text-[#1a1a1a]/50">Surface</span>
                        </div>
                      )}
                      {swatch.context === "accent" && (
                        <span
                          className="inline-block px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest"
                          style={{ backgroundColor: swatch.hex, color: "#fafafa" }}
                        >
                          Breaking
                        </span>
                      )}
                      {swatch.context === "badge" && (
                        <span
                          className="inline-block px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest"
                          style={{
                            backgroundColor: swatch.hex,
                            color: swatch.light ? "#1a1a1a" : "#fafafa",
                          }}
                        >
                          Badge
                        </span>
                      )}
                      {swatch.context === "button" && (
                        <button
                          type="button"
                          className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white"
                          style={{ backgroundColor: swatch.hex }}
                        >
                          Button
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. Grid Pattern Demo with Category Filter                         */}
      {/* ================================================================ */}
      <section
        id="sports"
        className="py-12 md:py-16 border-b border-[#1a1a1a]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock className="mb-8">
            <div className="border-b border-[#1a1a1a] pb-3 flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Grid Pattern Demo
              </h2>
              <div className="flex items-center gap-2 sm:ml-auto">
                {/* Grid switcher */}
                {(["3col", "2col", "1col"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setGridLayout(mode)}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border transition-colors duration-150 ${
                      gridLayout === mode
                        ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                        : "bg-transparent text-[#1a1a1a] border-[#1a1a1a]/30 hover:border-[#1a1a1a]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Category filter */}
          <RevealBlock delay={0.04} className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat === "All" ? null : cat)}
                  className={`px-3 py-1 text-xs font-black uppercase tracking-widest border transition-colors duration-150 ${
                    (cat === "All" && activeCategory === null) ||
                    cat === activeCategory
                      ? "bg-[#e63946] border-[#e63946] text-white"
                      : "bg-white border-[#1a1a1a]/20 text-[#1a1a1a]/60 hover:border-[#e63946] hover:text-[#e63946]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.06}>
            {filteredArticles.length > 0 ? (
              <GridDemo layout={gridLayout} articles={filteredArticles} />
            ) : (
              <div className="py-16 text-center border border-[#1a1a1a]/10">
                <p className="text-sm text-[#1a1a1a]/40 font-bold uppercase tracking-widest">
                  No articles in this category
                </p>
              </div>
            )}
          </RevealBlock>

          {/* Layout spec table */}
          <RevealBlock delay={0.1} className="mt-8">
            <div className="overflow-hidden border border-[#1a1a1a]/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a1a1a]">
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-white">
                      Layout
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-white hidden sm:table-cell">
                      Columns
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-white">
                      Use Case
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-white hidden md:table-cell">
                      Gap
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      layout: "3-Col",
                      cols: "grid-cols-3",
                      use: "Standard edition — politics, tech, sports",
                      gap: "gap-4",
                    },
                    {
                      layout: "2-Col",
                      cols: "grid-cols-2",
                      use: "Long-form features — culture, investigation",
                      gap: "gap-4",
                    },
                    {
                      layout: "1-Col",
                      cols: "grid-cols-1",
                      use: "Deep dive — single story emphasis",
                      gap: "gap-6",
                    },
                  ].map((row, idx) => (
                    <tr
                      key={row.layout}
                      className={`border-t border-[#1a1a1a]/10 ${
                        idx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"
                      }`}
                    >
                      <td className="px-4 py-3 font-black text-xs uppercase tracking-widest text-[#e63946]">
                        {row.layout}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[#1a1a1a]/60 hidden sm:table-cell">
                        {row.cols}
                      </td>
                      <td className="px-4 py-3 text-xs text-[#1a1a1a]/70">{row.use}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#1a1a1a]/60 hidden md:table-cell">
                        {row.gap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. Do / Don't Rules                                               */}
      {/* ================================================================ */}
      <section
        id="grid"
        className="py-12 md:py-16 bg-[#fafafa] border-b border-[#1a1a1a]"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <RevealBlock className="mb-10">
            <div className="border-b border-[#1a1a1a] pb-3 flex items-center gap-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Editorial Rules
              </h2>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/40">
                Design Principles
              </span>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO column */}
            <RevealBlock delay={0.05}>
              <div className="border border-[#2a9d8f] bg-white">
                <div className="bg-[#2a9d8f] px-5 py-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-black uppercase tracking-widest text-white">
                    Do — Magazine Grid Principles
                  </span>
                </div>
                <ul className="divide-y divide-[#1a1a1a]/10">
                  {doRules.map((rule, i) => (
                    <li key={i} className="px-5 py-4 flex items-start gap-3">
                      <span className="text-[10px] font-black text-[#2a9d8f] mt-0.5 shrink-0 uppercase tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[#1a1a1a]/80 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.1}>
              <div className="border border-[#e63946] bg-white">
                <div className="bg-[#e63946] px-5 py-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-xs font-black uppercase tracking-widest text-white">
                    Don&apos;t — Common Mistakes
                  </span>
                </div>
                <ul className="divide-y divide-[#1a1a1a]/10">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="px-5 py-4 flex items-start gap-3">
                      <span className="text-[10px] font-black text-[#e63946] mt-0.5 shrink-0 uppercase tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[#1a1a1a]/80 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Decision card */}
          <RevealBlock delay={0.15} className="mt-8">
            <div className="bg-white border border-[#1a1a1a] p-6 md:p-8">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-[#e63946] flex items-center justify-center">
                    <span className="text-white font-black text-xl">!</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#e63946] mb-2">
                    Editorial Mandate
                  </p>
                  <h3 className="text-lg font-black leading-tight text-[#1a1a1a] mb-3">
                    Hierarchy Must Be Felt Before It Is Read
                  </h3>
                  <p className="text-sm text-[#1a1a1a]/70 leading-relaxed max-w-2xl">
                    A magazine grid earns its authority through scale contrast, not decoration. The featured article must be undeniably dominant — its image larger, its headline bolder, its position unmistakable. Readers should know the day&apos;s most important story within one second of opening the page.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. Footer                                                         */}
      {/* ================================================================ */}
      <footer className="bg-[#264653] text-white">
        {/* Section links grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-white/20 pb-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-4">
                Sections
              </p>
              <ul className="space-y-2">
                {["Politics", "Culture", "Technology", "Sports", "Investigation"].map((s) => (
                  <li key={s}>
                    <a
                      href={`#${s.toLowerCase()}`}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-150 font-medium"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-4">
                Design
              </p>
              <ul className="space-y-2">
                {["Typography", "Grid System", "Color Palette", "Components", "Do/Don't"].map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="text-sm text-white/70 hover:text-white transition-colors duration-150 font-medium"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-4">
                StyleKit
              </p>
              <ul className="space-y-2">
                {[
                  { label: "All Styles", href: "/styles" },
                  { label: "Swiss Style", href: "/styles/swiss-style" },
                  { label: "Dashboard", href: "/styles/dashboard-layout" },
                  { label: "Film Noir", href: "/styles/film-noir" },
                  { label: "Art Nouveau", href: "/styles/art-nouveau" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-150 font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-4">
                Issue Info
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-white/70">
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-0.5">
                    Volume
                  </span>
                  XLII — 2026
                </li>
                <li className="text-sm text-white/70">
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-0.5">
                    Issue
                  </span>
                  08, February
                </li>
                <li className="text-sm text-white/70">
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-0.5">
                    Frequency
                  </span>
                  Daily Edition
                </li>
                <li className="text-sm text-white/70">
                  <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-0.5">
                    Coverage
                  </span>
                  Global
                </li>
              </ul>
            </div>
          </div>

          {/* Masthead + copyright */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-2xl font-black uppercase tracking-tight text-white mb-1">
                StyleKit <span className="text-[#e63946]">Magazine</span>
              </p>
              <p className="text-xs text-white/40 uppercase tracking-widest">
                杂志网格布局 — Magazine Grid Layout System
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <p className="text-xs text-white/40 uppercase tracking-widest">
                &copy; 2026 StyleKit. All rights reserved.
              </p>
              <p className="text-xs text-white/30">
                Editorial print grid system — CSS Grid &middot; Tailwind CSS &middot; Next.js
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
