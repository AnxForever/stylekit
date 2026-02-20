"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Inline hooks — no external showcase imports allowed
// ---------------------------------------------------------------------------

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const useCases = [
  {
    title: "Brand Story",
    desc: "Walk visitors through a narrative arc — each section reveals a chapter as they scroll, with the background providing emotional context.",
    tag: "Marketing",
  },
  {
    title: "Product Showcase",
    desc: "Layer product imagery against fixed environments to simulate a studio shoot unfolding in motion.",
    tag: "E-commerce",
  },
  {
    title: "Portfolio",
    desc: "Separate creative projects into full-screen scenes. Recruiters experience deliberate pacing rather than an overwhelming grid.",
    tag: "Creative",
  },
  {
    title: "Landing Page",
    desc: "Anchor sections become natural conversion points — the fixed background keeps branding visible while CTAs scroll into view.",
    tag: "SaaS",
  },
  {
    title: "Immersive Article",
    desc: "Long-form editorial content stays engaging when each section change feels like turning a page in a richly illustrated book.",
    tag: "Publishing",
  },
  {
    title: "Event Microsite",
    desc: "Countdown, schedule, and registration flow across depth layers, giving a sense of arrival at a physical venue.",
    tag: "Events",
  },
];

const featureCards = [
  {
    title: "Decoupled Depth",
    desc: "Background and foreground move at different rates. The eye perceives a three-dimensional space with zero JavaScript.",
    accent: "#3b82f6",
    icon: "D",
  },
  {
    title: "Scene Rhythm",
    desc: "Full-screen sections pace the user's journey. Each scroll reveals a new emotional register — like chapters in a film.",
    accent: "#0ea5e9",
    icon: "R",
  },
  {
    title: "Glass Clarity",
    desc: "Semi-transparent overlays and backdrop-blur keep text legible against any gradient, maintaining WCAG contrast ratios.",
    accent: "#93c5fd",
    icon: "G",
  },
];

const tabData: Record<
  "technique" | "mobile" | "performance",
  { label: string; heading: string; body: string; code: string }
> = {
  technique: {
    label: "CSS Technique",
    heading: "bg-fixed — The Core Trick",
    body: "Tailwind's bg-fixed maps to background-attachment: fixed in CSS. The background gradient is positioned relative to the viewport. As the user scrolls, the element's content moves while the background stays put — producing the parallax illusion without any JavaScript.",
    code: `<section
  className="relative min-h-screen
             bg-fixed bg-cover bg-center
             flex items-center"
  style={{
    backgroundImage:
      "linear-gradient(135deg, #0f172a, #1e3a5f)"
  }}
>
  <div className="absolute inset-0 bg-[#1e3a5f]/60" />
  <div className="relative z-10 max-w-4xl mx-auto px-6">
    {/* content */}
  </div>
</section>`,
  },
  mobile: {
    label: "Mobile Fallback",
    heading: "Mobile: bg-scroll + JS Polyfill",
    body: "iOS Safari ignores background-attachment: fixed inside scroll containers, which breaks the effect on most mobile devices. Detect touch devices and switch to bg-scroll. For a richer experience, a lightweight JS listener can reposition a pseudo-element using transform: translateY() based on window.scrollY.",
    code: `// Detect touch device
const isMobile =
  /Mobi|Android/i.test(navigator.userAgent);

// Apply class conditionally
<section
  className={\`min-h-screen \${
    isMobile ? "bg-scroll" : "bg-fixed"
  } bg-cover bg-center\`}
  style={{ backgroundImage: "linear-gradient(...)" }}
>`,
  },
  performance: {
    label: "Performance",
    heading: "Performance Best Practices",
    body: "Fixed backgrounds trigger a repaint on every scroll frame in some browsers. To keep animation smooth: (1) Limit parallax sections to 4-6 per page. (2) Prefer CSS gradients over raster images. (3) Add will-change: transform to overlapping content layers. (4) Use contain: layout on the section wrapper. (5) Test with Chrome DevTools Rendering > Paint flashing.",
    code: `/* Promote overlay to its own compositing layer */
.parallax-overlay {
  will-change: transform;
  contain: layout;
}

/* Cinematic easing — never rush the scroll */
.parallax-content {
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}`,
  },
};

const specItems = [
  {
    label: "Section Height",
    value: "min-h-screen",
    note: "Every section fills the full viewport height",
    color: "border-[#3b82f6]",
  },
  {
    label: "Background Lock",
    value: "bg-fixed",
    note: "background-attachment: fixed — the parallax engine",
    color: "border-[#0ea5e9]",
  },
  {
    label: "Nav Z-Index",
    value: "z-50",
    note: "fixed + backdrop-blur-lg stays above all layers",
    color: "border-[#93c5fd]",
  },
  {
    label: "Content Card",
    value: "bg-white/90",
    note: "+ backdrop-blur-sm rounded-2xl shadow-xl",
    color: "border-[#3b82f6]",
  },
  {
    label: "Overlay Opacity",
    value: "bg-[#1e3a5f]/55",
    note: "absolute inset-0 — guarantees text contrast",
    color: "border-[#0ea5e9]",
  },
  {
    label: "Content Layer",
    value: "relative z-10",
    note: "Higher z-index than the overlay mask",
    color: "border-[#93c5fd]",
  },
];

const colorPalette = [
  { hex: "#1e3a5f", name: "Primary" },
  { hex: "#3b82f6", name: "Blue" },
  { hex: "#0ea5e9", name: "Sky" },
  { hex: "#93c5fd", name: "Light" },
  { hex: "#f8fafc", name: "White" },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ParallaxSectionsShowcase() {
  // Hero entrance
  const [heroRevealed, setHeroRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Interactive state
  const [activeTab, setActiveTab] = useState<"technique" | "mobile" | "performance">("technique");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState("英雄区块");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Section inView refs
  const { ref: philosophyRef, inView: philosophyInView } = useInView();
  const { ref: featuresRef, inView: featuresInView } = useInView();
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: specsRef, inView: specsInView } = useInView();
  const { ref: usecasesRef, inView: usecasesInView } = useInView();
  const { ref: rulesRef, inView: rulesInView } = useInView();
  const { ref: transitionsRef, inView: transitionsInView } = useInView();

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSent(true);
    }
  }

  return (
    <div className="min-h-screen">
      {/* ================================================================
          FIXED FLOATING NAV
          ================================================================ */}
      <nav className="fixed top-0 z-50 w-full bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-white font-semibold tracking-wide flex items-center gap-2 hover:text-white/80 transition-colors duration-500"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            StyleKit
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "#philosophy", label: "哲学" },
              { href: "#features", label: "特性" },
              { href: "#components", label: "组件" },
              { href: "#specs", label: "规范" },
              { href: "#transitions", label: "过渡" },
              { href: "#usecases", label: "场景" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link
            href="/styles/parallax-sections"
            className="text-white/70 hover:text-white transition-colors duration-300 text-sm"
          >
            文档 →
          </Link>
        </div>
      </nav>

      {/* ================================================================
          SECTION 1 — HERO
          Deep navy to deep blue — cinematic opening
          ================================================================ */}
      <section
        id="hero"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0c4a6e 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/50" />

        {/* Subtle geometric grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(147,197,253,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-[#93c5fd]/70 mb-6">
              Layout Style · Parallax Sections
            </p>
          </div>

          {/* Main headline */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4">
              视差滚动
            </h1>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s",
            }}
          >
            <h2 className="text-3xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9] mb-8">
              Parallax Sections
            </h2>
          </div>

          {/* Subhead */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s",
            }}
          >
            <p className="text-lg md:text-xl text-white/65 mb-10 max-w-2xl mx-auto leading-relaxed">
              通过固定背景与滚动内容的层次错位，营造沉浸式深度感。
              每个全屏区块都是一个独立的视觉宇宙。
            </p>
          </div>

          {/* CTA row */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.34s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.34s",
            }}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#components"
                className="px-10 py-4 bg-white/10 backdrop-blur-md text-white uppercase tracking-widest rounded-full font-medium border border-white/20 hover:bg-white/30 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500 text-sm"
              >
                探索组件
              </a>
              <a
                href="#specs"
                className="px-10 py-4 bg-[#3b82f6] text-white rounded-full font-medium uppercase tracking-widest hover:bg-[#2563eb] transition-colors duration-500 shadow-lg shadow-[#3b82f6]/30 text-sm"
              >
                查看规范
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s",
            }}
          >
            <div className="mt-16 flex justify-center gap-12 border-t border-white/10 pt-10">
              {[
                { value: "0 JS", label: "纯 CSS 视差" },
                { value: "7+", label: "可配置区块" },
                { value: "bg-fixed", label: "核心 CSS 属性" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s",
            }}
          >
            <div className="mt-14 flex flex-col items-center gap-2">
              <span className="text-white/30 text-xs tracking-[0.3em] uppercase">向下滚动</span>
              <div className="animate-bounce mt-1">
                <svg
                  className="w-5 h-5 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — PHILOSOPHY
          Deep navy to royal blue — introduce the concept
          ================================================================ */}
      <section
        id="philosophy"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 70%, #2563eb 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#1e3a5f]/55" />

        <div ref={philosophyRef} className="relative z-10 max-w-5xl mx-auto px-6 py-28 w-full">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Left column */}
            <div>
              <RevealBlock delay={0}>
                <p className="text-xs tracking-[0.4em] uppercase text-[#93c5fd]/70 mb-4">
                  设计哲学
                </p>
              </RevealBlock>

              <RevealBlock delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  深度即体验
                </h2>
              </RevealBlock>

              <RevealBlock delay={0.18}>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  视差滚动的核心原理：背景固定于视口，内容随页面流动。
                  两层运动速度的差异产生了空间深度感 —— 就像透过火车窗户望向远山，
                  近处的树飞速掠过，远处的山却几乎静止。
                </p>
              </RevealBlock>

              <RevealBlock delay={0.26}>
                <p className="text-white/55 leading-relaxed mb-8">
                  这种视觉物理原理无需 JavaScript，仅凭一行 CSS：
                  <code className="text-[#93c5fd] mx-1 font-mono text-sm bg-white/10 px-2 py-0.5 rounded">
                    background-attachment: fixed
                  </code>
                  即可实现。每个区块成为独立的「场景」，叙事在滚动中展开。
                </p>
              </RevealBlock>

              <RevealBlock delay={0.34}>
                <div className="flex gap-3 flex-wrap">
                  {["深度层次", "沉浸体验", "节奏控制", "视觉焦点"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 text-xs text-[#93c5fd] border border-[#93c5fd]/30 rounded-full bg-[#93c5fd]/10 hover:bg-[#93c5fd]/20 transition-colors duration-500 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </RevealBlock>
            </div>

            {/* Right column — info card */}
            <RevealBlock delay={0.2}>
              <div className="bg-white/92 backdrop-blur-sm rounded-2xl shadow-2xl p-8 group hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] transition-shadow duration-700">
                <h3 className="text-[#1e3a5f] font-bold text-xl mb-6">核心设计原则</h3>

                <ul className="space-y-4 mb-7">
                  {[
                    { dot: "bg-[#3b82f6]", label: "全屏场景", desc: "每个 section 占满整个视口高度" },
                    { dot: "bg-[#0ea5e9]", label: "固定背景", desc: "bg-fixed 产生视差深度效果" },
                    { dot: "bg-[#93c5fd]", label: "半透明遮罩", desc: "确保文字在任何背景上可读" },
                    { dot: "bg-[#1d4ed8]", label: "渐变过渡", desc: "区块之间以渐变色优雅衔接" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.dot}`}
                      />
                      <div>
                        <span className="text-[#1e3a5f] font-semibold text-sm">{item.label}</span>
                        <span className="text-[#1e3a5f]/55 text-sm ml-2">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Color palette strip */}
                <div className="border-t border-[#1e3a5f]/10 pt-6">
                  <p className="text-[10px] text-[#1e3a5f]/40 mb-3 uppercase tracking-[0.3em]">
                    配色系统
                  </p>
                  <div className="flex gap-2">
                    {colorPalette.map((c) => (
                      <div key={c.hex} className="flex-1">
                        <div
                          className="h-8 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300 cursor-default"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                        <p className="text-[9px] text-center text-[#1e3a5f]/40 mt-1.5 font-mono">
                          {c.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — CORE FEATURES
          Teal to ocean blue — three pillars showcase
          ================================================================ */}
      <section
        id="features"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0e7490 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#0c4a6e]/50" />

        <div ref={featuresRef} className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
          <RevealBlock>
            <p className="text-xs tracking-[0.4em] uppercase text-[#93c5fd]/70 mb-3 text-center">
              核心特性
            </p>
          </RevealBlock>
          <RevealBlock delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Three Pillars
            </h2>
          </RevealBlock>
          <RevealBlock delay={0.14}>
            <p className="text-white/55 text-center mb-14 max-w-lg mx-auto">
              Parallax Sections 构建在三个相互依存的设计原则上，共同构成沉浸式滚动体验。
            </p>
          </RevealBlock>

          {/* Feature tab selector */}
          <RevealBlock delay={0.2}>
            <div className="flex justify-center gap-3 mb-10">
              {featureCards.map((card, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                    activeFeature === i
                      ? "bg-white text-[#1e3a5f] shadow-lg"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {card.title}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Active feature detail panel */}
          <RevealBlock delay={0.26}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-10 mb-10 group hover:bg-white/15 hover:border-white/20 transition-all duration-700">
              <div className="flex items-start gap-8 flex-col md:flex-row">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 transition-all duration-500"
                  style={{ backgroundColor: featureCards[activeFeature].accent + "44" }}
                >
                  {featureCards[activeFeature].icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {featureCards[activeFeature].title}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed mb-4">
                    {featureCards[activeFeature].desc}
                  </p>
                  <div
                    className="h-1 rounded-full w-24 transition-all duration-700"
                    style={{ backgroundColor: featureCards[activeFeature].accent }}
                  />
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {featureCards.map((card, i) => (
              <RevealBlock key={i} delay={0.3 + i * 0.08}>
                <div
                  className={`rounded-2xl p-7 border cursor-pointer transition-all duration-700 ${
                    activeFeature === i
                      ? "bg-white/20 border-white/30 shadow-xl"
                      : "bg-white/8 border-white/10 hover:bg-white/15 hover:border-white/20"
                  }`}
                  onClick={() => setActiveFeature(i)}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white mb-4"
                    style={{ backgroundColor: card.accent + "33" }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{card.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — COMPONENTS
          Dark slate to deep navy — full component demo
          ================================================================ */}
      <section
        id="components"
        className="relative min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(160deg, #1e293b 0%, #1e3a5f 60%, #0c4a6e 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#1e293b]/55" />

        <div ref={componentsRef} className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
          <RevealBlock>
            <p className="text-xs tracking-[0.4em] uppercase text-[#93c5fd]/70 mb-3 text-center">
              UI 组件
            </p>
          </RevealBlock>
          <RevealBlock delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-14 text-center">
              Components
            </h2>
          </RevealBlock>

          {/* ---- Buttons ---- */}
          <RevealBlock delay={0.14}>
            <div className="bg-white/92 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#0c4a6e]/50 mb-6">
                按钮 Button
              </p>
              <div className="flex flex-wrap gap-4">
                {/* Parallax glass button from config */}
                <button className="px-10 py-4 bg-[#1e3a5f]/10 backdrop-blur-md text-[#1e3a5f] uppercase tracking-widest rounded-full font-medium border border-[#1e3a5f]/20 hover:bg-[#1e3a5f]/20 hover:border-[#1e3a5f]/40 transition-all duration-500 text-sm">
                  Explore Story
                </button>
                <button className="px-6 py-3 bg-[#1e3a5f] text-white rounded-full text-sm font-medium hover:bg-[#1e3a5f]/80 transition-colors duration-500">
                  实心按钮
                </button>
                <button className="px-6 py-3 border-2 border-[#3b82f6] text-[#3b82f6] rounded-full text-sm font-medium hover:bg-[#3b82f6]/10 transition-colors duration-500">
                  轮廓按钮
                </button>
                <button className="px-6 py-3 bg-[#3b82f6] text-white rounded-full text-sm font-medium hover:bg-[#2563eb] transition-colors duration-500 shadow-lg shadow-[#3b82f6]/30">
                  主色调
                </button>
                <button className="px-6 py-3 text-[#1e3a5f] rounded-full text-sm font-medium hover:bg-[#1e3a5f]/8 transition-colors duration-500">
                  幽灵按钮
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* ---- Parallax content card (from config) ---- */}
          <RevealBlock delay={0.2}>
            <div className="mb-6">
              <div className="group relative p-10 md:p-14 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-black/60 hover:border-white/30 hover:backdrop-blur-xl transition-all duration-700 max-w-2xl overflow-hidden">
                {/* Glass glare layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
                <h3 className="text-4xl font-light text-white mb-6 tracking-wide group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-500">
                  The Parallax View
                </h3>
                <p className="text-white/70 leading-relaxed text-lg font-light group-hover:text-white/90 transition-colors duration-500">
                  Scroll to reveal layered storytelling. Foreground stays calm while background depth keeps moving.
                </p>
                <p className="text-[#93c5fd]/60 text-sm mt-4 font-mono">
                  bg-black/40 backdrop-blur-md · Glass Glare on hover
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* ---- Cards row ---- */}
          <RevealBlock delay={0.26}>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  title: "沉浸式滚动",
                  desc: "全屏区块配合固定背景，营造如海浪涌动般的深度感知体验。",
                  accent: "#3b82f6",
                  letter: "A",
                },
                {
                  title: "层叠视差",
                  desc: "背景、内容、装饰三层以不同速率运动，仿佛身处立体空间之中。",
                  accent: "#0ea5e9",
                  letter: "B",
                },
                {
                  title: "玻璃形态",
                  desc: "backdrop-blur 与半透明白色叠加，让内容卡片漂浮于渐变宇宙之上。",
                  accent: "#93c5fd",
                  letter: "C",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white/92 backdrop-blur-sm rounded-2xl shadow-xl p-7 group hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-700"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white mb-4 group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundColor: card.accent }}
                  >
                    {card.letter}
                  </div>
                  <h3 className="font-bold text-[#1e3a5f] text-lg mb-2">{card.title}</h3>
                  <p className="text-[#1e3a5f]/60 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* ---- Form + Input ---- */}
          <RevealBlock delay={0.32}>
            <div className="bg-white/92 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#0c4a6e]/50 mb-6">
                表单 Form · 玻璃输入
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">姓名</label>
                  <input
                    type="text"
                    placeholder="请输入姓名..."
                    className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 focus:border-[#3b82f6] focus:outline-none transition-colors duration-300 text-sm text-[#1e3a5f]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">邮箱</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 focus:border-[#3b82f6] focus:outline-none transition-colors duration-300 text-sm text-[#1e3a5f]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">留言</label>
                  <textarea
                    placeholder="请输入留言..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 focus:border-[#3b82f6] focus:outline-none transition-colors duration-300 text-sm resize-none text-[#1e3a5f]"
                  />
                </div>
                <div className="md:col-span-2">
                  <button className="px-8 py-3 bg-[#1e3a5f] text-white rounded-full text-sm font-medium hover:bg-[#1e3a5f]/80 transition-colors duration-500">
                    提交留言
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* ---- Alerts + Dropdown ---- */}
          <RevealBlock delay={0.38}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Alerts */}
              <div className="bg-white/92 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#0c4a6e]/50 mb-4">
                  通知 Alerts
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#3b82f6]/10 rounded-xl border border-[#3b82f6]/20">
                    <span className="w-4 h-4 rounded-full bg-[#3b82f6] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#1e3a5f]">
                      bg-fixed 是视差效果的核心，确保背景固定于视口。
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="w-4 h-4 rounded-full bg-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#1e3a5f]">移动端 iOS Safari 需使用 JS 降级方案。</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                    <span className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#1e3a5f]">渐变覆盖层保证文字对比度 WCAG AA 标准。</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
                    <span className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#1e3a5f]">避免超过 6 个视差层级影响性能。</p>
                  </div>
                </div>
              </div>

              {/* Dropdown + Tags */}
              <div className="bg-white/92 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#0c4a6e]/50 mb-4">
                  下拉菜单 Dropdown
                </p>
                <div className="relative mb-6">
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 flex items-center justify-between hover:border-[#3b82f6] transition-colors duration-300 text-sm"
                  >
                    <span className="text-[#1e3a5f]">{selectedScene}</span>
                    <svg
                      className={`w-4 h-4 text-[#3b82f6] transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#1e3a5f]/15 shadow-xl z-20 overflow-hidden">
                      {["英雄区块", "关于区块", "组件展示", "规格说明", "应用场景"].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setSelectedScene(item);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-[#1e3a5f] hover:bg-[#3b82f6]/10 transition-colors duration-200 border-b border-[#1e3a5f]/5 last:border-b-0"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-[10px] tracking-[0.3em] uppercase text-[#0c4a6e]/50 mb-3">
                  标签 Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Parallax", "CSS", "bg-fixed", "Scroll", "Immersive", "Layout"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-[#3b82f6]/10 text-[#1e3a5f] rounded-full border border-[#3b82f6]/20 hover:bg-[#3b82f6]/20 cursor-pointer transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — LAYOUT SPECS + CSS TECHNIQUE
          Very dark slate — technical deep dive
          ================================================================ */}
      <section
        id="specs"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e3a5f 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/60" />

        <div ref={specsRef} className="relative z-10 max-w-5xl mx-auto px-6 py-28 w-full">
          <RevealBlock>
            <p className="text-xs tracking-[0.4em] uppercase text-[#93c5fd]/70 mb-3 text-center">
              技术规范
            </p>
          </RevealBlock>
          <RevealBlock delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Layout Specs
            </h2>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.15}>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-8">
              {/* Tab bar */}
              <div className="flex bg-white/8 backdrop-blur-sm">
                {(["technique", "mobile", "performance"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-4 text-sm font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-white text-[#1e3a5f]"
                        : "text-white/60 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    {tabData[tab].label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="bg-[#1e3a5f]/80 backdrop-blur-md p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {tabData[activeTab].heading}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed mb-6">
                  {tabData[activeTab].body}
                </p>
                <div className="bg-[#0a0f1e] rounded-xl p-5 font-mono text-xs text-[#93c5fd] leading-relaxed overflow-x-auto border border-[#3b82f6]/20">
                  <pre>{tabData[activeTab].code}</pre>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Spec items grid */}
          <RevealBlock delay={0.25}>
            <div className="grid md:grid-cols-3 gap-4">
              {specItems.map((spec) => (
                <div
                  key={spec.label}
                  className={`bg-white/8 backdrop-blur-sm rounded-xl p-5 border-l-4 ${spec.color} hover:bg-white/12 transition-colors duration-500`}
                >
                  <p className="text-white/45 text-[10px] uppercase tracking-[0.25em] mb-1.5">
                    {spec.label}
                  </p>
                  <p className="text-white font-mono text-sm font-bold mb-1.5">{spec.value}</p>
                  <p className="text-white/45 text-xs">{spec.note}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Animation spec card */}
          <RevealBlock delay={0.35}>
            <div className="mt-6 bg-white/8 backdrop-blur-sm rounded-2xl border border-white/10 p-7">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#93c5fd]/60 mb-5">
                动画节奏规范
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    label: "Cinematic Slowness",
                    value: "duration-500 ~ 700",
                    desc: "保持电影叙事节奏，避免急促感",
                    color: "#3b82f6",
                  },
                  {
                    label: "Glass Glare",
                    value: "opacity 0 → 1 on hover",
                    desc: "渐变扫光层模拟镜头反光效果",
                    color: "#0ea5e9",
                  },
                  {
                    label: "Decoupled Depth",
                    value: "blur + opacity only",
                    desc: "前景避免大幅 Y 轴移动",
                    color: "#93c5fd",
                  },
                ].map((rule) => (
                  <div key={rule.label}>
                    <div
                      className="w-2 h-2 rounded-full mb-2"
                      style={{ backgroundColor: rule.color }}
                    />
                    <p className="text-white text-sm font-semibold mb-1">{rule.label}</p>
                    <p className="text-[#93c5fd] font-mono text-xs mb-1.5">{rule.value}</p>
                    <p className="text-white/45 text-xs">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — SECTION TRANSITIONS
          Mid blue to dark — transition showcase
          ================================================================ */}
      <section
        id="transitions"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "linear-gradient(160deg, #1d4ed8 0%, #1e3a5f 50%, #0f172a 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#1d4ed8]/40" />

        <div ref={transitionsRef} className="relative z-10 max-w-5xl mx-auto px-6 py-28 w-full">
          <RevealBlock>
            <p className="text-xs tracking-[0.4em] uppercase text-[#93c5fd]/70 mb-3 text-center">
              视觉过渡
            </p>
          </RevealBlock>
          <RevealBlock delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Section Transitions
            </h2>
          </RevealBlock>
          <RevealBlock delay={0.14}>
            <p className="text-white/60 text-center mb-14 max-w-xl mx-auto leading-relaxed">
              区块之间的视觉切换是整个视差体验的关键节点。颜色故事的演变控制了情绪弧度。
            </p>
          </RevealBlock>

          {/* Gradient progression visual */}
          <RevealBlock delay={0.2}>
            <div className="bg-white/92 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#0c4a6e]/50 mb-6">
                本 Showcase 的渐变旅程
              </p>
              <div className="space-y-3">
                {[
                  { from: "#0f172a", to: "#0c4a6e", label: "Section 1 — Hero", desc: "深夜蓝 · 宇宙开幕" },
                  { from: "#1e3a5f", to: "#2563eb", label: "Section 2 — Philosophy", desc: "皇室蓝 · 概念导入" },
                  { from: "#0c4a6e", to: "#0e7490", label: "Section 3 — Features", desc: "海洋蓝 · 深度展开" },
                  { from: "#1e293b", to: "#0c4a6e", label: "Section 4 — Components", desc: "暗板岩 · 技术聚焦" },
                  { from: "#0f172a", to: "#1e3a5f", label: "Section 5 — Specs", desc: "极夜蓝 · 规范锚定" },
                  { from: "#1d4ed8", to: "#0f172a", label: "Section 6 — Transitions", desc: "电蓝渐暗 · 过渡本身" },
                  { from: "#0f172a", to: "#1e3a5f", label: "Section 7 — Use Cases", desc: "深空蓝 · 场景收敛" },
                  { from: "#0f172a", to: "#1e293b", label: "Footer", desc: "接近黑 · 落幕" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className="h-7 flex-1 rounded-lg"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${row.from}, ${row.to})`,
                      }}
                    />
                    <div className="w-48 flex-shrink-0">
                      <p className="text-[#1e3a5f] text-xs font-semibold">{row.label}</p>
                      <p className="text-[#1e3a5f]/50 text-xs">{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Transition technique explainer */}
          <RevealBlock delay={0.3}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-7 group hover:border-white/20 transition-all duration-700">
                <h3 className="text-white font-bold text-lg mb-3">Hard Cut 直接切换</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  相邻 section 使用反差较大的渐变，比如深蓝切换到蓝绿，制造强烈的「翻页感」。
                  每次切换都是一个情绪重置点。
                </p>
                <div className="h-10 rounded-xl overflow-hidden">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #0f172a 0%, #0f172a 49%, #0ea5e9 51%, #0ea5e9 100%)",
                    }}
                  />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-7 group hover:border-white/20 transition-all duration-700">
                <h3 className="text-white font-bold text-lg mb-3">Soft Fade 渐变连接</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  相邻 section 的结尾渐变色与下一个 section 的起始色保持 30% 的色相相近度，
                  形成流动的视觉丝线。
                </p>
                <div className="h-10 rounded-xl overflow-hidden">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #1e3a5f, #0369a1, #0c4a6e)",
                    }}
                  />
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — USE CASES + DO / DON'T RULES
          Dark night to deep blue-teal
          ================================================================ */}
      <section
        id="usecases"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #164e63 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/52" />

        <div ref={usecasesRef} className="relative z-10 max-w-6xl mx-auto px-6 py-28 w-full">
          {/* Use Cases header */}
          <RevealBlock>
            <p className="text-xs tracking-[0.4em] uppercase text-[#93c5fd]/70 mb-3 text-center">
              适用场景
            </p>
          </RevealBlock>
          <RevealBlock delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Use Cases
            </h2>
          </RevealBlock>
          <RevealBlock delay={0.14}>
            <p className="text-white/55 text-center mb-14 max-w-xl mx-auto leading-relaxed">
              视差滚动最适合需要叙事节奏和情感深度的场景 —— 让每次滚动都成为一次发现。
            </p>
          </RevealBlock>

          {/* Use case grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {useCases.map((uc, i) => (
              <RevealBlock key={uc.title} delay={0.18 + i * 0.07}>
                <div className="group bg-[#1e3a5f]/75 backdrop-blur-md rounded-2xl p-7 border border-white/8 hover:border-[#3b82f6]/50 hover:bg-[#1e3a5f]/90 transition-all duration-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white text-base">{uc.title}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#3b82f6]/20 text-[#93c5fd] border border-[#3b82f6]/25 flex-shrink-0">
                      {uc.tag}
                    </span>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-700">
                    {uc.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't */}
          <div ref={rulesRef}>
            <RevealBlock delay={0}>
              <p className="text-xs tracking-[0.4em] uppercase text-[#93c5fd]/70 mb-8 text-center">
                设计规则
              </p>
            </RevealBlock>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Do list */}
              <RevealBlock delay={0.1}>
                <div className="bg-white/92 backdrop-blur-sm rounded-2xl shadow-2xl p-7 h-full">
                  <h3 className="font-bold text-green-700 text-lg mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-sm font-bold">
                      +
                    </span>
                    必须遵循
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "使用 bg-fixed 创造固定背景视差效果",
                      "每个区块使用 min-h-screen 全屏高度",
                      "内容区使用半透明背景 bg-white/90 增强可读性",
                      "背景图片使用 bg-cover bg-center 保证比例",
                      "统一使用较长缓动 duration-500/700 营造电影式节奏",
                      "卡片可加入 Glass Glare 扫光层增强镜头反光感",
                      "交互优先通过透明度和 blur 变化表达景深",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#1e3a5f]">
                        <span className="text-green-500 mt-0.5 flex-shrink-0 font-bold">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>

              {/* Don't list */}
              <RevealBlock delay={0.18}>
                <div className="bg-white/92 backdrop-blur-sm rounded-2xl shadow-2xl p-7 h-full">
                  <h3 className="font-bold text-red-600 text-lg mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm font-bold">
                      -
                    </span>
                    禁止事项
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "禁止背景图片和内容对比度不足",
                      "禁止区块高度不一致破坏节奏",
                      "禁止过多视差层级造成性能问题",
                      "禁止忽略移动端的视差降级处理",
                      "禁止内容过于密集破坏焦点",
                      "禁止卡片 hover 大幅上下跳动",
                      "禁止短促急促动画，破坏沉浸叙事",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#1e3a5f]">
                        <span className="text-red-500 mt-0.5 flex-shrink-0 font-bold">×</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            </div>
          </div>

          {/* Newsletter CTA (interactive) */}
          <RevealBlock delay={0.35}>
            <div className="mt-12 bg-[#1e3a5f]/80 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center">
              <h3 className="text-white font-bold text-xl mb-2">订阅 StyleKit 更新</h3>
              <p className="text-white/55 text-sm mb-6">
                每周推送新增风格、技术笔记和设计案例。
              </p>
              {newsletterSent ? (
                <div className="flex items-center justify-center gap-3 text-[#93c5fd]">
                  <span className="w-6 h-6 rounded-full bg-[#3b82f6]/30 flex items-center justify-center text-sm">
                    +
                  </span>
                  <span>已订阅，感谢！</span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 w-full px-6 py-3 bg-white/20 backdrop-blur-md text-white placeholder-white/50 rounded-full border border-white/30 focus:border-white/60 focus:outline-none transition-colors duration-300 text-sm"
                    placeholder="Enter your email"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#3b82f6] text-white rounded-full text-sm font-medium hover:bg-[#2563eb] transition-colors duration-500 shadow-lg shadow-[#3b82f6]/30 whitespace-nowrap"
                  >
                    订阅
                  </button>
                </form>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          FOOTER
          Near-black navy — cinematic close
          ================================================================ */}
      <footer
        className="relative min-h-[65vh] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/72" />

        <div className="relative z-10 text-center px-6 py-24 max-w-2xl mx-auto w-full">
          <RevealBlock>
            <div className="w-14 h-14 mx-auto mb-7 rounded-2xl bg-[#3b82f6]/20 border border-[#3b82f6]/30 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-[#3b82f6]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.08}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Parallax Sections
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.14}>
            <p className="text-[#93c5fd]/60 text-sm uppercase tracking-[0.3em] mb-6">
              视差滚动 · Layout Style
            </p>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <p className="text-white/45 mb-10 leading-relaxed">
              一个区块，一个宇宙。每次滚动，都是一次新的深度体验。
              <br />
              由 StyleKit 提供，开箱即用，无需 JavaScript。
            </p>
          </RevealBlock>

          <RevealBlock delay={0.28}>
            <div className="flex flex-wrap gap-4 justify-center mb-14">
              <Link
                href="/styles/parallax-sections"
                className="px-7 py-3 bg-[#3b82f6] text-white rounded-full text-sm font-medium hover:bg-[#2563eb] transition-colors duration-500 shadow-lg shadow-[#3b82f6]/30"
              >
                查看完整文档 →
              </Link>
              <Link
                href="/styles"
                className="px-7 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-500"
              >
                浏览所有风格
              </Link>
            </div>
          </RevealBlock>

          {/* Footer meta */}
          <RevealBlock delay={0.36}>
            <div className="border-t border-white/8 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
                <span>StyleKit · Parallax Sections Showcase</span>
                <div className="flex gap-6">
                  {[
                    { href: "/", label: "首页" },
                    { href: "/styles", label: "风格库" },
                    { href: "/styles/parallax-sections", label: "文档" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="hover:text-white/55 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
