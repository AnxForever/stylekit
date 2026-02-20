"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 },
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

const categories = ["All", "Photos", "Illustrations", "Design", "3D", "Motion"];

const cards: { id: number; title: string; category: string; aspect: string; gradient: string; seed: string }[] = [
  { id: 1, title: "Mountain Vista", category: "Photos", aspect: "aspect-[3/4]", gradient: "from-rose-400 to-pink-500", seed: "masonry1" },
  { id: 2, title: "Geometric Play", category: "Design", aspect: "aspect-square", gradient: "from-indigo-400 to-purple-500", seed: "masonry2" },
  { id: 3, title: "Forest Path", category: "Photos", aspect: "aspect-[4/5]", gradient: "from-emerald-400 to-teal-500", seed: "masonry3" },
  { id: 4, title: "Abstract Flow", category: "Illustrations", aspect: "aspect-[3/5]", gradient: "from-amber-400 to-orange-500", seed: "masonry4" },
  { id: 5, title: "Neon Bloom", category: "3D", aspect: "aspect-[4/3]", gradient: "from-cyan-400 to-blue-500", seed: "masonry5" },
  { id: 6, title: "Coastal Light", category: "Photos", aspect: "aspect-[3/4]", gradient: "from-sky-300 to-blue-400", seed: "masonry6" },
  { id: 7, title: "Ink Study", category: "Illustrations", aspect: "aspect-[2/3]", gradient: "from-zinc-500 to-zinc-700", seed: "masonry7" },
  { id: 8, title: "Motion Blur", category: "Motion", aspect: "aspect-square", gradient: "from-violet-400 to-fuchsia-500", seed: "masonry8" },
  { id: 9, title: "Paper Cut", category: "Design", aspect: "aspect-[4/5]", gradient: "from-red-400 to-rose-500", seed: "masonry9" },
  { id: 10, title: "Sunset Dunes", category: "Photos", aspect: "aspect-[3/4]", gradient: "from-yellow-400 to-amber-500", seed: "masonry10" },
  { id: 11, title: "Wireframe", category: "3D", aspect: "aspect-[5/4]", gradient: "from-slate-400 to-slate-600", seed: "masonry11" },
  { id: 12, title: "Flora Study", category: "Illustrations", aspect: "aspect-[3/5]", gradient: "from-lime-400 to-green-500", seed: "masonry12" },
];

const colorPalette = [
  { name: "Primary", value: "#1a1a2e", textColor: "#ffffff" },
  { name: "Secondary", value: "#f5f5f5", textColor: "#1a1a2e" },
  { name: "Coral Red", value: "#e94560", textColor: "#ffffff" },
  { name: "Mint", value: "#16c79a", textColor: "#ffffff" },
  { name: "Sunshine", value: "#ffd460", textColor: "#1a1a2e" },
  { name: "Periwinkle", value: "#7579e7", textColor: "#ffffff" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function MasonryCard({ card }: { card: typeof cards[0] }) {
  return (
    <div className="group break-inside-avoid mb-6 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
      <div className="relative overflow-hidden bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://picsum.photos/seed/${card.seed}/600/800`}
          alt={card.title}
          className={`w-full ${card.aspect} object-cover group-hover:scale-105 transition-transform duration-700 ease-out`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur text-zinc-900 text-sm font-bold rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out hover:bg-white" type="button">
          Save
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-zinc-900 mb-1 group-hover:text-[#e94560] transition-colors">{card.title}</h3>
        <p className="text-zinc-500 text-sm">{card.category}</p>
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
        active
          ? "bg-[#1a1a2e] text-white"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Component demos                                                    */
/* ------------------------------------------------------------------ */

function ButtonsDemo() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        <button type="button" className="px-5 py-2.5 bg-[#1a1a2e] text-white rounded-lg font-medium text-sm shadow-sm hover:bg-zinc-700 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-zinc-900/30 focus:ring-offset-2 active:scale-[0.98] active:translate-y-0 transition-all duration-200">
          Load More
        </button>
        <button type="button" className="px-5 py-2.5 bg-[#e94560] text-white rounded-lg font-medium text-sm shadow-sm hover:bg-[#d13a53] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(233,69,96,0.3)] active:scale-[0.98] active:translate-y-0 transition-all duration-200">
          Featured
        </button>
        <button type="button" className="px-5 py-2.5 bg-white text-zinc-900 border border-zinc-200 rounded-lg font-medium text-sm shadow-sm hover:bg-zinc-50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.98] active:translate-y-0 transition-all duration-200">
          Secondary
        </button>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <span key={cat} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${cat === "All" ? "bg-[#1a1a2e] text-white" : "bg-zinc-100 text-zinc-700"}`}>
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}

function CardsDemo() {
  return (
    <div className="columns-2 md:columns-3 gap-4">
      {cards.slice(0, 6).map((card) => (
        <MasonryCard key={card.id} card={card} />
      ))}
    </div>
  );
}

function InputsDemo() {
  return (
    <div className="space-y-6 max-w-md">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" placeholder="Search pins..." className="w-full pl-10 pr-4 py-3 bg-zinc-100 border-0 rounded-full text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition-all" />
      </div>
      <input type="text" placeholder="Add a title..." className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]/20 focus:border-[#e94560] transition-all" />
      <textarea placeholder="Tell everyone what your Pin is about..." rows={3} className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]/20 focus:border-[#e94560] transition-all resize-none" />
    </div>
  );
}

function LayoutDemo() {
  return (
    <div className="space-y-6">
      <p className="text-zinc-500 text-sm">Responsive masonry grid with CSS columns. Cards naturally flow to fill available space with varying heights.</p>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {[
          { h: "h-40", color: "bg-gradient-to-br from-[#e94560] to-[#d13a53]", label: "Tall" },
          { h: "h-24", color: "bg-gradient-to-br from-[#16c79a] to-emerald-500", label: "Short" },
          { h: "h-32", color: "bg-gradient-to-br from-[#ffd460] to-amber-500", label: "Medium" },
          { h: "h-48", color: "bg-gradient-to-br from-[#7579e7] to-indigo-500", label: "Extra Tall" },
          { h: "h-28", color: "bg-gradient-to-br from-[#1a1a2e] to-zinc-700", label: "Medium" },
          { h: "h-36", color: "bg-gradient-to-br from-cyan-400 to-blue-500", label: "Tall" },
        ].map((item, i) => (
          <div key={i} className={`break-inside-avoid mb-4 ${item.h} ${item.color} rounded-xl flex items-end p-4`}>
            <span className="text-white text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Export                                                             */
/* ------------------------------------------------------------------ */

const tabs = ["Buttons", "Cards", "Inputs", "Layout"] as const;

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Buttons");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filteredCards = activeFilter === "All" ? cards : cards.filter((c) => c.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a2e]">
      <style>{`
        @keyframes masonry-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      {/* ========= Navigation ========= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            <Link href="/styles/masonry-flow/showcase" className="font-bold text-xl text-[#1a1a2e]">
              Masonry Flow
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/styles/masonry-flow" className="text-sm text-zinc-500 hover:text-[#1a1a2e] transition-colors">
                Docs
              </Link>
              <Link href="/styles" className="text-sm text-zinc-500 hover:text-[#1a1a2e] transition-colors">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ========= Hero ========= */}
      <section className="pt-28 md:pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span
              className="inline-block text-xs font-medium tracking-widest uppercase text-[#e94560] mb-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              Pinterest-Inspired Layout
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              <span
                className="block"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                Masonry
              </span>
              <span
                className="block text-[#e94560]"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                Flow.
              </span>
            </h1>
          </div>
          <p
            className="max-w-xs text-sm text-zinc-500 leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            A waterfall card layout where content height drives visual rhythm. Cards flow naturally into columns, creating organic visual interest.
          </p>
        </div>

        {/* Filter bar */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}
        >
          {categories.map((cat) => (
            <FilterButton key={cat} label={cat} active={activeFilter === cat} onClick={() => setActiveFilter(cat)} />
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {filteredCards.map((card) => (
            <MasonryCard key={card.id} card={card} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button type="button" className="px-8 py-3 bg-[#1a1a2e] text-white rounded-full font-medium hover:bg-zinc-700 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:scale-[0.98] active:translate-y-0 transition-all duration-200">
            Load More
          </button>
        </div>
      </section>

      {/* ========= Component Demos ========= */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Component <span className="text-[#e94560]">Library</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-md">Explore the building blocks of Masonry Flow: buttons, cards, inputs, and layout patterns.</p>
        </RevealBlock>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-zinc-100 rounded-xl p-1 mb-12 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white text-[#1a1a2e] shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <RevealBlock>
          {activeTab === "Buttons" && <ButtonsDemo />}
          {activeTab === "Cards" && <CardsDemo />}
          {activeTab === "Inputs" && <InputsDemo />}
          {activeTab === "Layout" && <LayoutDemo />}
        </RevealBlock>
      </section>

      {/* ========= Color Palette ========= */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Color <span className="text-[#16c79a]">Palette</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-md">
            A vibrant yet balanced palette for content-rich masonry layouts.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colorPalette.map((color) => (
            <RevealBlock key={color.name} delay={0.05}>
              <div
                className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
              >
                <div className="h-28 md:h-32 flex items-end p-4" style={{ backgroundColor: color.value }}>
                  <span className="text-xs font-bold opacity-70" style={{ color: color.textColor }}>{color.value}</span>
                </div>
                <div className="bg-white p-3">
                  <p className="text-sm font-medium text-zinc-900">{color.name}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ========= Design Rules ========= */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Design <span className="text-[#7579e7]">Rules</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RevealBlock>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#16c79a] flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </span>
                Do
              </h3>
              <ul className="space-y-3">
                {[
                  "Use CSS columns: columns-2 md:columns-3 lg:columns-4",
                  "Add break-inside-avoid on every card",
                  "Let card height be content-driven",
                  "Keep consistent column gaps (gap-4 or gap-6)",
                  "Use group + overflow-hidden for Confined Zoom",
                  "Hover: -translate-y-1 with diffuse shadow",
                  "Action buttons: opacity+translate reveal on hover",
                  "Filter buttons: duration-200 for snappy response",
                ].map((rule) => (
                  <li key={rule} className="text-sm text-zinc-600 flex items-start gap-2">
                    <span className="text-[#16c79a] mt-0.5 shrink-0">+</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#e94560] flex items-center justify-center text-white text-xs font-bold">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </span>
                Don&apos;t
              </h3>
              <ul className="space-y-3">
                {[
                  "Force all cards to equal height",
                  "Use inconsistent card widths",
                  "Use inconsistent gap sizes",
                  "Ignore image loading states",
                  "Use too many columns on mobile",
                  "Let images break overflow-hidden boundary",
                  "Use hard borders for hover feedback",
                  "Translate more than -translate-y-1 on hover",
                ].map((rule) => (
                  <li key={rule} className="text-sm text-zinc-600 flex items-start gap-2">
                    <span className="text-[#e94560] mt-0.5 shrink-0">-</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ========= Footer ========= */}
      <footer className="border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-400">
              StyleKit &middot; Masonry Flow Showcase
            </p>
            <Link href="/styles/masonry-flow" className="text-sm text-zinc-500 hover:text-[#1a1a2e] transition-colors">
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
