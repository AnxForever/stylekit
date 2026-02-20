"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const projects = [
  { id: 1, category: "Typography", title: "Helvetica Neue", desc: "Clean, objective, rational design principles." },
  { id: 2, category: "Grid System", title: "12-Column Layout", desc: "Mathematical precision in every alignment." },
  { id: 3, category: "Color Theory", title: "Objective Palette", desc: "Black, white, and red as functional accents." },
  { id: 4, category: "Information", title: "Hierarchy First", desc: "Structure is the highest design value." },
  { id: 5, category: "Whitespace", title: "Negative Space", desc: "Generous margins increase readability." },
  { id: 6, category: "Rationalism", title: "Form Follows Function", desc: "Every element serves a clear purpose." },
];

const colorPalette = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Swiss Red", value: "#ff0000" },
  { name: "Swiss Blue", value: "#0057b8" },
  { name: "Swiss Yellow", value: "#ffcc00" },
];

const doRules = [
  "Rational Restraint: only color and border-color change on hover -- zero translate, scale, or shadow",
  "Guide Line Extension: left border changes from gray to red hover:border-[#ff0000], bg shifts to hover:bg-[#f0f0f0]",
  "Hierarchy Focus: category label turns red group-hover:text-[#ff0000] on hover",
  "Clean Cut Transitions: use duration-150 ease-out -- precise and efficient",
  "12-column grid system with generous whitespace",
  "Left-aligned text with uppercase tracking labels",
];

const dontRules = [
  "Never use translate, scale, or shadow changes on hover (Rational Restraint)",
  "Never use duration-300 or longer -- Swiss Style max is duration-150 ease-out",
  "Never use decorative elements or embellishments",
  "Never use serif fonts for body text",
  "Never use gradients or blur effects",
  "Never omit arrow icon from buttons -- directionality is typographic",
];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
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
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SwissCard({ item, index }: { item: typeof projects[0]; index: number }) {
  return (
    <RevealBlock delay={index * 0.06}>
      <div className="group p-8 bg-white border-l-[4px] border-[#cccccc] hover:border-[#ff0000] hover:bg-[#f0f0f0] transition-all duration-150 ease-out cursor-pointer">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 group-hover:text-[#ff0000] transition-colors duration-150 ease-out mb-2">
          {item.category}
        </p>
        <h3 className="text-2xl font-bold text-black mb-4">
          {item.title}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </RevealBlock>
  );
}

function SwissButton({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "secondary" }) {
  if (variant === "secondary") {
    return (
      <button className="group flex items-center gap-3 px-6 py-3 bg-white text-black text-sm font-medium uppercase tracking-[0.2em] border border-black hover:bg-[#f0f0f0] transition-colors duration-150 ease-out">
        {children}
        <svg className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-2" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </button>
    );
  }
  return (
    <button className="group flex items-center gap-3 px-6 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-[#ff0000] transition-colors duration-150 ease-out">
      {children}
      <svg className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-2" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </button>
  );
}

function SwissInput() {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.2em] text-gray-500 mb-2">
        Email
      </label>
      <input
        type="text"
        placeholder="your@email.com"
        className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-black text-black focus:outline-none focus:border-red-600 transition-colors duration-150 ease-out"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20 border-b border-black/10">
            <Link href="/styles/swiss-style/showcase" className="text-sm font-medium uppercase tracking-[0.3em]">
              Swiss International
            </Link>
            <nav className="flex items-center gap-6 md:gap-8">
              <Link href="/styles/swiss-style" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-[#ff0000] transition-colors duration-150 ease-out">
                Docs
              </Link>
              <Link href="/styles" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-[#ff0000] transition-colors duration-150 ease-out">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="pt-32 md:pt-48 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <p
              className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              International Style
            </p>
            <h1
              className="text-7xl md:text-9xl font-bold text-black leading-none mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              Swiss
              <br />
              <span className="text-gray-400">Design</span>
            </h1>
            <p
              className="text-xl text-gray-700 max-w-md leading-relaxed mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            >
              The grid is the foundation. Typography is the voice. Clarity is the goal.
            </p>
            <div
              className="flex gap-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              <SwissButton>Explore</SwissButton>
              <SwissButton variant="secondary">Learn More</SwissButton>
            </div>
          </div>
          <div className="col-span-4 hidden md:flex items-center justify-center">
            <div
              className="w-32 h-32 bg-red-600"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s",
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== Projects Grid ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock>
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-2">Selected Work</p>
              <h2 className="text-5xl md:text-7xl font-bold text-black">Projects</h2>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 hidden md:block">
              {projects.length} items
            </p>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((item, i) => (
            <SwissCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ===== Component Demos ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#f7f7f7]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div className="mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-2">Components</p>
              <h2 className="text-5xl md:text-6xl font-bold text-black">Elements</h2>
            </div>
          </RevealBlock>

          {/* Tab Switcher */}
          <RevealBlock delay={0.1} className="mb-12">
            <div className="flex gap-0 border-b-2 border-black">
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-150 ease-out ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-transparent text-gray-400 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab Content */}
          <RevealBlock delay={0.15}>
            <div className="p-8 md:p-12 bg-white border-l-[4px] border-[#cccccc]">
              {activeTab === "button" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <SwissButton>Action</SwissButton>
                    <SwissButton variant="secondary">Secondary</SwissButton>
                  </div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mt-4">
                    Guide Line text turns red. Arrow icon translates x-2. Rational Restraint: zero scale/shadow.
                  </p>
                </div>
              )}

              {activeTab === "card" && (
                <div className="max-w-md">
                  <SwissCard
                    item={{ id: 0, category: "Typography", title: "Helvetica Neue", desc: "Clean, objective, rational design principles." }}
                    index={0}
                  />
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mt-6">
                    Guide Line Extension: left border gray to red. Hierarchy Focus: category label turns red.
                  </p>
                </div>
              )}

              {activeTab === "input" && (
                <div className="max-w-md">
                  <SwissInput />
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mt-6">
                    Minimal bottom border. Focus activates red accent. Uppercase label with wide tracking.
                  </p>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="mb-16">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-2">Palette</p>
              <h2 className="text-5xl md:text-6xl font-bold text-black">Colors</h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.value} delay={i * 0.06}>
                <div className="flex flex-col gap-3">
                  <div
                    className="w-full aspect-square border-l-[4px] border-[#cccccc] hover:border-[#ff0000] transition-colors duration-150 ease-out"
                    style={{ backgroundColor: color.value }}
                  />
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">{color.name}</p>
                  <p className="text-xs text-gray-400">{color.value}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#f7f7f7]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="mb-16">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400 mb-2">Guidelines</p>
              <h2 className="text-5xl md:text-6xl font-bold text-black">Design Rules</h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Do */}
            <RevealBlock delay={0.05}>
              <div className="p-8 bg-white border-l-[4px] border-black">
                <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-black mb-6 flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Do
                </h3>
                <ul className="space-y-4">
                  {doRules.map((rule) => (
                    <li key={rule} className="text-sm text-gray-600 leading-relaxed pl-4 border-l border-gray-200">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.1}>
              <div className="p-8 bg-white border-l-[4px] border-[#ff0000]">
                <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-[#ff0000] mb-6 flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Don&apos;t
                </h3>
                <ul className="space-y-4">
                  {dontRules.map((rule) => (
                    <li key={rule} className="text-sm text-gray-600 leading-relaxed pl-4 border-l border-red-200">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-16 px-6 md:px-12 border-t border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gray-400">
            Swiss International Style Showcase
          </p>
          <nav className="flex items-center gap-6">
            <Link href="/styles/swiss-style" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-[#ff0000] transition-colors duration-150 ease-out">
              Docs
            </Link>
            <Link href="/styles" className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 hover:text-[#ff0000] transition-colors duration-150 ease-out">
              All Styles
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
