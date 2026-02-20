"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Check, X, AlertTriangle, Info, Layers } from "lucide-react";

// ---------------------------------------------------------------------------
// Inline hooks — no external showcase imports allowed
// ---------------------------------------------------------------------------

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({
  children,
  delay = 0,
  inView,
}: {
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}) {
  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ShowcaseContent() {
  // Hero entrance animation
  const [heroRevealed, setHeroRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Tab switcher for specs section
  const [activeTab, setActiveTab] = useState<"technique" | "mobile" | "performance">("technique");

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Section refs + inView states
  const { ref: aboutRef, inView: aboutInView } = useInView();
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: specsRef, inView: specsInView } = useInView();
  const { ref: usecasesRef, inView: usecasesInView } = useInView();
  const { ref: rulesRef, inView: rulesInView } = useInView();

  // ---------------------------------------------------------------------------
  // Tab content data
  // ---------------------------------------------------------------------------

  const tabData: Record<
    "technique" | "mobile" | "performance",
    { label: string; heading: string; body: string; code?: string }
  > = {
    technique: {
      label: "CSS Technique",
      heading: "bg-fixed — The Core Trick",
      body:
        "Tailwind's `bg-fixed` maps to `background-attachment: fixed` in CSS. The background image (or gradient) is positioned relative to the viewport, not the element. As the user scrolls, the element's content moves while the background stays put — producing the parallax illusion without any JavaScript.",
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
      body:
        "iOS Safari ignores `background-attachment: fixed` inside scroll containers, which breaks the effect on most mobile devices. The recommended approach is to detect touch devices and switch to `bg-scroll`. For a richer experience, a lightweight JavaScript listener can reposition a pseudo-element using `transform: translateY()` based on `window.scrollY`, replicating the parallax without the CSS property.",
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
      body:
        "Fixed backgrounds trigger a repaint on every scroll frame in some browsers. To keep animation smooth: (1) Limit parallax sections to 4-6 per page. (2) Prefer CSS gradients over raster images — no network request, resolution-independent. (3) Add `will-change: transform` to overlapping content layers. (4) Use `contain: layout` on the section wrapper where possible. (5) Test with Chrome DevTools Rendering > Paint flashing to identify expensive repaints.",
      code: `/* Promote overlay to its own layer */
.parallax-overlay {
  will-change: transform;
  contain: layout;
}`,
    },
  };

  // ---------------------------------------------------------------------------
  // Use-case cards data
  // ---------------------------------------------------------------------------

  const useCases = [
    {
      title: "Brand Story",
      desc: "Walk visitors through a narrative arc — each section reveals a chapter as they scroll, with the background providing emotional context.",
      tag: "Marketing",
    },
    {
      title: "Product Showcase",
      desc: "Layer product imagery (via CSS gradients/masks) against fixed environments to simulate a studio shoot unfolding in motion.",
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

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen">
      {/* ================================================================
          FIXED FLOATING NAV
          ================================================================ */}
      <nav className="fixed top-0 z-50 w-full bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-white font-semibold tracking-wide flex items-center gap-2 hover:text-white/80 transition-colors"
          >
            <Layers className="w-4 h-4" />
            StyleKit
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-white/80 hover:text-white transition-colors text-sm">
              哲学
            </a>
            <a href="#components" className="text-white/80 hover:text-white transition-colors text-sm">
              组件
            </a>
            <a href="#specs" className="text-white/80 hover:text-white transition-colors text-sm">
              规范
            </a>
            <a href="#usecases" className="text-white/80 hover:text-white transition-colors text-sm">
              应用场景
            </a>
          </div>
          <Link
            href="/styles/parallax-sections"
            className="text-white/80 hover:text-white transition-colors text-sm"
          >
            文档 →
          </Link>
        </div>
      </nav>

      {/* ================================================================
          SECTION 1 — HERO
          Gradient: deep navy → deep blue
          ================================================================ */}
      <section
        id="hero"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0c4a6e 100%)",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0f172a]/50" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <RevealBlock inView={heroRevealed} delay={0}>
            <p className="text-xs tracking-[0.35em] uppercase text-[#93c5fd]/80 mb-6">
              Layout Style · Parallax Sections
            </p>
          </RevealBlock>

          {/* Headline */}
          <RevealBlock inView={heroRevealed} delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
              视差滚动
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9]">
                Parallax Sections
              </span>
            </h1>
          </RevealBlock>

          {/* Subhead */}
          <RevealBlock inView={heroRevealed} delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              通过固定背景与滚动内容的层次错位，营造沉浸式深度感。
              每个全屏区块都是一个独立的视觉宇宙。
            </p>
          </RevealBlock>

          {/* CTA row */}
          <RevealBlock inView={heroRevealed} delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-medium hover:bg-white/30 transition-all duration-300">
                探索组件
              </button>
              <button className="px-8 py-3 bg-[#3b82f6] text-white rounded-full font-medium hover:bg-[#2563eb] transition-colors duration-300 shadow-lg shadow-[#3b82f6]/30">
                查看规范
              </button>
            </div>
          </RevealBlock>

          {/* Scroll arrow */}
          <RevealBlock inView={heroRevealed} delay={0.45}>
            <div className="mt-20 flex flex-col items-center gap-2">
              <span className="text-white/40 text-xs tracking-widest uppercase">向下滚动</span>
              <div className="animate-bounce">
                <svg
                  className="w-6 h-6 text-white/50"
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
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — ABOUT / PHILOSOPHY
          Gradient: dark navy → royal blue
          ================================================================ */}
      <section
        id="about"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#1e3a5f]/55" />

        <div ref={aboutRef} className="relative z-10 max-w-5xl mx-auto px-6 py-24 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — label + heading */}
            <div>
              <RevealBlock inView={aboutInView} delay={0}>
                <p className="text-xs tracking-[0.35em] uppercase text-[#93c5fd]/70 mb-4">
                  设计哲学
                </p>
              </RevealBlock>
              <RevealBlock inView={aboutInView} delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  深度即体验
                </h2>
              </RevealBlock>
              <RevealBlock inView={aboutInView} delay={0.2}>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  视差滚动的核心原理：背景固定于视口，内容随页面流动。
                  两层运动速度的差异产生了空间深度感 — 就像透过火车窗户望向远山，
                  近处的树飞速掠过，远处的山却几乎静止。
                </p>
              </RevealBlock>
              <RevealBlock inView={aboutInView} delay={0.3}>
                <p className="text-white/60 leading-relaxed">
                  这种视觉物理原理无需 JavaScript，仅凭一行 CSS：
                  <code className="text-[#93c5fd] mx-1 font-mono text-sm">
                    background-attachment: fixed
                  </code>
                  即可实现。每个区块成为独立的&quot;场景&quot;，叙事在滚动中展开。
                </p>
              </RevealBlock>
            </div>

            {/* Right — info card */}
            <RevealBlock inView={aboutInView} delay={0.2}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                <h3 className="text-[#1e3a5f] font-bold text-xl mb-5">核心设计原则</h3>
                <ul className="space-y-4">
                  {[
                    { dot: "bg-[#3b82f6]", label: "全屏场景", desc: "每个 section 占满整个视口高度" },
                    { dot: "bg-[#0ea5e9]", label: "固定背景", desc: "bg-fixed 产生视差深度效果" },
                    { dot: "bg-[#93c5fd]", label: "半透明遮罩", desc: "确保文字在任何背景上可读" },
                    { dot: "bg-[#1d4ed8]", label: "渐变过渡", desc: "区块之间以渐变色优雅衔接" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.dot}`} />
                      <div>
                        <span className="text-[#1e3a5f] font-semibold text-sm">{item.label}</span>
                        <span className="text-[#1e3a5f]/60 text-sm ml-2">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Color palette strip */}
                <div className="mt-6 pt-5 border-t border-[#1e3a5f]/10">
                  <p className="text-xs text-[#1e3a5f]/50 mb-3 uppercase tracking-widest">配色系统</p>
                  <div className="flex gap-2">
                    {[
                      { hex: "#1e3a5f", name: "Deep Blue" },
                      { hex: "#3b82f6", name: "Blue" },
                      { hex: "#0ea5e9", name: "Sky" },
                      { hex: "#93c5fd", name: "Light" },
                      { hex: "#f8fafc", name: "White" },
                    ].map((c) => (
                      <div key={c.hex} className="flex-1 group relative">
                        <div
                          className="h-8 rounded-lg shadow-sm"
                          style={{ backgroundColor: c.hex }}
                        />
                        <p className="text-[10px] text-center text-[#1e3a5f]/50 mt-1 font-mono">
                          {c.hex}
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
          SECTION 3 — COMPONENTS
          Gradient: deep teal → ocean blue
          ================================================================ */}
      <section
        id="components"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0e7490 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#0c4a6e]/50" />

        <div ref={componentsRef} className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
          <RevealBlock inView={componentsInView} delay={0}>
            <p className="text-xs tracking-[0.35em] uppercase text-[#93c5fd]/70 mb-3 text-center">
              UI 组件
            </p>
          </RevealBlock>
          <RevealBlock inView={componentsInView} delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              Components
            </h2>
          </RevealBlock>

          {/* Buttons */}
          <RevealBlock inView={componentsInView} delay={0.15}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8">
              <p className="text-xs tracking-widest uppercase text-[#0c4a6e]/50 mb-5">按钮 Button</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-2.5 bg-[#1e3a5f] text-white rounded-full text-sm font-medium hover:bg-[#1e3a5f]/80 transition-colors">
                  实心按钮
                </button>
                <button className="px-6 py-2.5 bg-white/20 backdrop-blur-md text-[#1e3a5f] border border-[#1e3a5f]/30 rounded-full text-sm font-medium hover:bg-white/40 transition-all duration-300">
                  玻璃按钮
                </button>
                <button className="px-6 py-2.5 border-2 border-[#3b82f6] text-[#3b82f6] rounded-full text-sm font-medium hover:bg-[#3b82f6]/10 transition-colors">
                  轮廓按钮
                </button>
                <button className="px-6 py-2.5 bg-[#3b82f6] text-white rounded-full text-sm font-medium hover:bg-[#2563eb] transition-colors shadow-lg shadow-[#3b82f6]/30">
                  主色调
                </button>
                <button className="px-6 py-2.5 text-[#1e3a5f] rounded-full text-sm font-medium hover:bg-[#1e3a5f]/10 transition-colors">
                  幽灵按钮
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* Cards row */}
          <RevealBlock inView={componentsInView} delay={0.22}>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: "🌊",
                  title: "沉浸式滚动",
                  desc: "全屏区块配合固定背景，营造如海浪涌动般的深度感知体验。",
                  accent: "#3b82f6",
                },
                {
                  icon: "🏔",
                  title: "层叠视差",
                  desc: "背景、内容、装饰三层以不同速率运动，仿佛身处立体空间之中。",
                  accent: "#0ea5e9",
                },
                {
                  icon: "✨",
                  title: "玻璃形态",
                  desc: "backdrop-blur 与半透明白色叠加，让内容卡片漂浮于渐变宇宙之上。",
                  accent: "#93c5fd",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-7 hover:shadow-2xl transition-shadow"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: card.accent + "22" }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-[#1e3a5f] text-lg mb-2">{card.title}</h3>
                  <p className="text-[#1e3a5f]/60 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Form + Input */}
          <RevealBlock inView={componentsInView} delay={0.3}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <p className="text-xs tracking-widest uppercase text-[#0c4a6e]/50 mb-5">表单 Form</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">姓名</label>
                  <input
                    type="text"
                    placeholder="请输入姓名..."
                    className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 focus:border-[#3b82f6] focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">邮箱</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 focus:border-[#3b82f6] focus:outline-none transition-colors text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#1e3a5f] mb-2">留言</label>
                  <textarea
                    placeholder="请输入留言..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 focus:border-[#3b82f6] focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button className="px-8 py-3 bg-[#1e3a5f] text-white rounded-full text-sm font-medium hover:bg-[#1e3a5f]/80 transition-colors">
                    提交留言
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Alerts */}
          <RevealBlock inView={componentsInView} delay={0.38}>
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-5">
                <p className="text-xs tracking-widest uppercase text-[#0c4a6e]/50 mb-4">
                  通知 Alerts
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#3b82f6]/10 rounded-xl border border-[#3b82f6]/20">
                    <Info className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#1e3a5f]">bg-fixed 是视差效果的核心。</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#1e3a5f]">移动端需使用 JS 降级方案。</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#1e3a5f]">渐变覆盖层保证文字对比度。</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
                    <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#1e3a5f]">避免过多视差层影响性能。</p>
                  </div>
                </div>
              </div>

              {/* Dropdown */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-5">
                <p className="text-xs tracking-widest uppercase text-[#0c4a6e]/50 mb-4">
                  下拉菜单 Dropdown
                </p>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-full px-4 py-3 bg-[#f8fafc] rounded-xl border border-[#1e3a5f]/20 flex items-center justify-between hover:border-[#3b82f6] transition-colors text-sm"
                  >
                    <span className="text-[#1e3a5f]">选择区块类型</span>
                    <svg
                      className={`w-4 h-4 text-[#3b82f6] transition-transform ${
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
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#1e3a5f]/20 shadow-xl z-20 overflow-hidden">
                      {["英雄区块", "关于区块", "组件展示", "规格说明", "应用场景"].map(
                        (item) => (
                          <button
                            key={item}
                            onClick={() => setIsDropdownOpen(false)}
                            className="w-full px-4 py-3 text-left text-sm text-[#1e3a5f] hover:bg-[#3b82f6]/10 transition-colors border-b border-[#1e3a5f]/5 last:border-b-0"
                          >
                            {item}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="mt-6">
                  <p className="text-xs tracking-widest uppercase text-[#0c4a6e]/50 mb-3">
                    标签 Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Parallax", "CSS", "bg-fixed", "Scroll", "Immersive", "Layout"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-[#3b82f6]/10 text-[#1e3a5f] rounded-full border border-[#3b82f6]/20 hover:bg-[#3b82f6]/20 cursor-pointer transition-colors"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — LAYOUT SPECS / CSS TECHNIQUE
          Gradient: dark slate → deep navy
          ================================================================ */}
      <section
        id="specs"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #1e293b 0%, #1e3a5f 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#1e293b]/60" />

        <div ref={specsRef} className="relative z-10 max-w-5xl mx-auto px-6 py-24 w-full">
          <RevealBlock inView={specsInView} delay={0}>
            <p className="text-xs tracking-[0.35em] uppercase text-[#93c5fd]/70 mb-3 text-center">
              技术规范
            </p>
          </RevealBlock>
          <RevealBlock inView={specsInView} delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
              Layout Specs
            </h2>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock inView={specsInView} delay={0.15}>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10 mb-6">
              {/* Tab bar */}
              <div className="flex bg-white/10 backdrop-blur-sm">
                {(["technique", "mobile", "performance"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-4 text-sm font-medium transition-colors capitalize ${
                      activeTab === tab
                        ? "bg-white text-[#1e3a5f]"
                        : "text-white/70 hover:text-white hover:bg-white/10"
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
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  {tabData[activeTab].body}
                </p>
                {tabData[activeTab].code && (
                  <div className="bg-[#0f172a] rounded-xl p-5 font-mono text-xs text-[#93c5fd] leading-relaxed overflow-x-auto">
                    <pre>{tabData[activeTab].code}</pre>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>

          {/* Spec grid */}
          <RevealBlock inView={specsInView} delay={0.25}>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  label: "区块高度",
                  value: "min-h-screen",
                  note: "每个 section 至少占满视口",
                  color: "border-[#3b82f6]",
                },
                {
                  label: "背景锁定",
                  value: "bg-fixed",
                  note: "background-attachment: fixed",
                  color: "border-[#0ea5e9]",
                },
                {
                  label: "导航层级",
                  value: "z-50",
                  note: "fixed + backdrop-blur-lg",
                  color: "border-[#93c5fd]",
                },
                {
                  label: "内容卡片",
                  value: "bg-white/90",
                  note: "+ backdrop-blur-sm rounded-2xl",
                  color: "border-[#3b82f6]",
                },
                {
                  label: "遮罩层",
                  value: "bg-[#1e3a5f]/60",
                  note: "absolute inset-0，保证对比度",
                  color: "border-[#0ea5e9]",
                },
                {
                  label: "内容层级",
                  value: "relative z-10",
                  note: "高于遮罩的 z-index",
                  color: "border-[#93c5fd]",
                },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-5 border-l-4 ${spec.color}`}
                >
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="text-white font-mono text-sm font-bold mb-1">{spec.value}</p>
                  <p className="text-white/50 text-xs">{spec.note}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — USE CASES
          Gradient: dark night → deep blue + teal tinge
          ================================================================ */}
      <section
        id="usecases"
        className="relative min-h-screen bg-fixed bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #164e63 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/50" />

        <div ref={usecasesRef} className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
          <RevealBlock inView={usecasesInView} delay={0}>
            <p className="text-xs tracking-[0.35em] uppercase text-[#93c5fd]/70 mb-3 text-center">
              适用场景
            </p>
          </RevealBlock>
          <RevealBlock inView={usecasesInView} delay={0.08}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
              Use Cases
            </h2>
          </RevealBlock>
          <RevealBlock inView={usecasesInView} delay={0.14}>
            <p className="text-white/60 text-center mb-14 max-w-xl mx-auto">
              视差滚动最适合需要叙事节奏和情感深度的场景 — 让每次滚动都成为一次发现。
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <RevealBlock key={uc.title} inView={usecasesInView} delay={0.18 + i * 0.07}>
                <div className="bg-[#1e3a5f]/80 backdrop-blur-md rounded-2xl p-7 border border-white/10 hover:border-[#3b82f6]/50 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white text-lg">{uc.title}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#3b82f6]/20 text-[#93c5fd] border border-[#3b82f6]/30">
                      {uc.tag}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{uc.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't rules */}
          <RevealBlock inView={usecasesInView} delay={0.6}>
            <div ref={rulesRef} className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-7">
                <h3 className="font-bold text-green-700 text-lg mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  必须遵循
                </h3>
                <ul className="space-y-3">
                  {[
                    "每个 section 使用 min-h-screen",
                    "固定背景：bg-fixed bg-cover bg-center",
                    "半透明遮罩：bg-[#1e3a5f]/50 ~ 60%",
                    "内容卡片：bg-white/90 backdrop-blur-sm",
                    "导航：fixed + backdrop-blur-lg",
                    "文字始终在深色遮罩上方使用 text-white",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#1e3a5f]">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-7">
                <h3 className="font-bold text-red-600 text-lg mb-4 flex items-center gap-2">
                  <X className="w-5 h-5" />
                  禁止事项
                </h3>
                <ul className="space-y-3">
                  {[
                    "不可使用 bg-scroll（破坏视差）",
                    "不可混用不一致的区块高度",
                    "不可在无遮罩的背景上直接放文字",
                    "不可在移动端忽略降级处理",
                    "不可堆叠超过 6 个视差区块",
                    "不可使用低对比度背景与内容组合",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#1e3a5f]">
                      <span className="text-red-500 mt-0.5 flex-shrink-0">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — FOOTER
          Gradient: near-black navy
          ================================================================ */}
      <footer
        className="relative min-h-[60vh] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/70" />
        <div className="relative z-10 text-center px-6 py-20 max-w-2xl mx-auto">
          <Layers className="w-10 h-10 mx-auto mb-6 text-[#3b82f6]" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Parallax Sections
          </h2>
          <p className="text-white/50 mb-8 leading-relaxed">
            一个区块，一个宇宙。每次滚动，都是一次新的深度体验。
            <br />
            由 StyleKit 提供，开箱即用，无需 JavaScript。
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/styles/parallax-sections"
              className="px-7 py-3 bg-[#3b82f6] text-white rounded-full text-sm font-medium hover:bg-[#2563eb] transition-colors shadow-lg shadow-[#3b82f6]/30"
            >
              查看完整文档 →
            </Link>
            <Link
              href="/styles"
              className="px-7 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300"
            >
              浏览所有风格
            </Link>
          </div>

          {/* Footer meta */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
              <span>StyleKit · Parallax Sections Showcase</span>
              <div className="flex gap-6">
                <Link href="/" className="hover:text-white/60 transition-colors">
                  首页
                </Link>
                <Link href="/styles" className="hover:text-white/60 transition-colors">
                  风格库
                </Link>
                <Link href="/styles/parallax-sections" className="hover:text-white/60 transition-colors">
                  文档
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
