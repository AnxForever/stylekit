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

const features = [
  {
    icon: (
      <svg className="w-7 h-7 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast",
    desc: "Optimised for speed with edge-first delivery and zero render-blocking resources.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#06b6d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm10 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Adaptive Grid",
    desc: "Responsive layouts that reflow intelligently across every viewport breakpoint.",
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure by Default",
    desc: "Built-in CSRF protection, content policies, and zero-trust architecture.",
  },
];

const testimonials = [
  { name: "Sarah K.", role: "Product Lead, Acme", quote: "Our landing page conversion jumped 34% after switching to Z-Pattern." },
  { name: "James T.", role: "Design Director, Bolt", quote: "Finally a layout framework that respects how people actually read." },
  { name: "Mika R.", role: "Founder, Neon Labs", quote: "The visual flow is intuitive and our bounce rate dropped significantly." },
];

const stats = [
  { label: "Active teams", value: "12,000+" },
  { label: "Conversion uplift", value: "34%" },
  { label: "Load time", value: "<0.8s" },
  { label: "Satisfaction", value: "4.9/5" },
];

const palette = [
  { name: "Primary Dark", hex: "#0f172a" },
  { name: "Indigo", hex: "#6366f1" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Background", hex: "#ffffff" },
  { name: "Surface", hex: "#f8fafc" },
  { name: "Muted Text", hex: "#94a3b8" },
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
    <div className="min-h-screen bg-white text-[#0f172a]">
      <style>{`
        @keyframes z-float {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes z-dash {
          to { stroke-dashoffset: 0; }
        }
        .z-glow { box-shadow: 0 0 80px rgba(99,102,241,0.15); }
        .z-link { position:relative; }
        .z-link::after {
          content:'';position:absolute;width:100%;transform:scaleX(0);height:2px;
          bottom:-2px;left:0;background:#6366f1;transform-origin:bottom right;
          transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .z-link:hover::after { transform:scaleX(1);transform-origin:bottom left; }
      `}</style>

      {/* ===== Fixed Nav ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <Link href="/styles/z-pattern-layout/showcase" className="text-lg font-bold tracking-tight text-[#0f172a]">
            Z<span className="text-[#6366f1]">Pattern</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Components", "Palette", "Rules"].map((item) => (
              <span key={item} className="text-sm text-gray-500 hover:text-[#0f172a] z-link pb-0.5 cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </nav>
          <Link
            href="/styles/z-pattern-layout"
            className="px-5 py-2 bg-[#6366f1] text-white text-sm font-medium rounded-xl shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
          >
            Docs
          </Link>
        </div>
      </header>

      {/* ===== HERO — Z Line 1: Brand (left) + CTA (right) ===== */}
      <section className="pt-28 md:pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
        {/* Decorative Z path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] hidden md:block"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M100 100 L1100 100 L100 700 L1100 700"
            stroke="#6366f1"
            strokeWidth="3"
            strokeDasharray="2400"
            strokeDashoffset="2400"
            style={{ animation: heroRevealed ? "z-dash 2.5s cubic-bezier(0.16,1,0.3,1) 0.5s forwards" : "none" }}
          />
        </svg>

        {/* Z-Line 1: top-left to top-right */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20 md:mb-32">
          <div>
            <span
              className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#6366f1] mb-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              Z-Pattern Layout
            </span>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              Guide the
              <br />
              <span className="bg-gradient-to-r from-[#6366f1] to-[#06b6d4] bg-clip-text text-transparent">
                eye, convert
              </span>
              <br />
              the visitor.
            </h1>
          </div>

          {/* Top-right CTA */}
          <div
            className="md:text-right shrink-0"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            <p className="text-gray-500 text-sm max-w-xs mb-6 leading-relaxed">
              Arrange content along the natural Z-shaped scanning path. Brand top-left, CTA top-right, value in the diagonal, final conversion bottom-right.
            </p>
            <button className="px-8 py-4 bg-[#6366f1] text-white rounded-xl font-semibold text-lg shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300">
              Start Free Trial
            </button>
          </div>
        </div>

        {/* Z Diagonal: core value proposition */}
        <div
          className="relative bg-gradient-to-br from-[#f8fafc] to-white rounded-3xl p-10 md:p-16 text-center z-glow mb-20 md:mb-32"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "scale(1)" : "scale(0.96)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
          }}
        >
          <div
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#6366f1]/10 hidden md:block"
            style={{ animation: "z-float 6s ease-in-out infinite" }}
          />
          <div
            className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#06b6d4]/10 hidden md:block"
            style={{ animation: "z-float 5s ease-in-out infinite 1s" }}
          />

          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Build landing pages that<br />
            <span className="text-[#6366f1]">convert at 2x the rate</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            Leverage eye-tracking science to place your most important content exactly where users look. The Z-Pattern ensures brand recognition, value communication, and conversion -- all in one scroll.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-[#0f172a] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300">
              Get Started Free
            </button>
            <button className="px-8 py-4 border border-gray-200 rounded-xl font-semibold text-[#0f172a] hover:border-gray-300 hover:bg-gray-50 active:scale-[0.97] transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Z-Line 2: bottom-left (trust) → bottom-right (CTA) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 flex-wrap">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">{s.value}</div>
                <div className="text-xs text-gray-400 tracking-wide uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <button className="px-6 py-3 bg-[#6366f1] text-white rounded-xl font-medium shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300">
            Start Building Now
          </button>
        </div>
      </section>

      {/* ===== Features (3 cards, Z-aware) ===== */}
      <section className="py-24 md:py-32 bg-[#f8fafc] px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6366f1] mb-3 block">Why Z-Pattern</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Designed for <span className="text-[#6366f1]">how people read</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <RevealBlock key={f.title} delay={i * 0.15}>
                <div className="group p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#6366f1] transition-colors">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Component Demos (tab-switched) ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6366f1] mb-3 block">Components</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Interactive <span className="text-[#6366f1]">building blocks</span>
            </h2>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-10">
            <div className="flex gap-2">
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/25"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab panels */}
          <RevealBlock delay={0.2}>
            <div className="bg-[#f8fafc] rounded-3xl p-8 md:p-12 border border-gray-100">
              {activeTab === "button" && (
                <div className="flex flex-wrap gap-6 items-center">
                  <button className="px-8 py-4 bg-[#6366f1] text-white rounded-xl font-semibold text-lg shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300">
                    Get Started
                  </button>
                  <button className="px-8 py-4 border border-gray-200 rounded-xl font-semibold text-[#0f172a] hover:border-gray-300 hover:bg-white active:scale-[0.97] transition-all duration-300">
                    Learn More
                  </button>
                  <button className="px-6 py-3 bg-[#0f172a] text-white rounded-xl font-medium hover:bg-[#1e293b] active:scale-[0.97] transition-all duration-300">
                    Subscribe
                  </button>
                  <button className="px-6 py-3 bg-[#06b6d4] text-white rounded-xl font-medium shadow-lg shadow-[#06b6d4]/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300">
                    Upgrade
                  </button>
                  <button className="px-6 py-3 text-[#6366f1] font-medium hover:bg-[#6366f1]/5 rounded-xl active:scale-[0.97] transition-all duration-300">
                    Cancel
                  </button>
                </div>
              )}
              {activeTab === "card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Analytics Dashboard", desc: "Real-time conversion metrics and heatmap overlays across your Z-layout funnels.", color: "#6366f1" },
                    { title: "A/B Testing", desc: "Compare CTA placements across Z-path anchor points with statistical significance.", color: "#06b6d4" },
                    { title: "SEO Optimiser", desc: "Content hierarchy aligned with search engine expectations and Z-flow readability.", color: "#f59e0b" },
                    { title: "Team Workspace", desc: "Collaborate on layout composition with live cursors and component locking.", color: "#ec4899" },
                  ].map((c) => (
                    <div key={c.title} className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${c.color}10` }}>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }} />
                      </div>
                      <h4 className="font-semibold text-[#0f172a] mb-2 group-hover:text-[#6366f1] transition-colors">{c.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "input" && (
                <div className="max-w-md space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="flex gap-3">
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all"
                      />
                      <button className="px-6 py-3 bg-[#6366f1] text-white rounded-xl font-medium shadow-lg shadow-[#6366f1]/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300">
                        Subscribe
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Search documentation..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us how the Z-layout worked for you..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[#0f172a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] transition-all resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Testimonials (Z diagonal demo) ===== */}
      <section className="py-24 md:py-32 bg-[#0f172a] text-white px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6366f1] mb-3 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Trusted by <span className="text-[#06b6d4]">teams worldwide</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <RevealBlock key={t.name} delay={i * 0.15}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.role}</div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6366f1] mb-3 block">Palette</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Color <span className="text-[#6366f1]">system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {palette.map((c) => (
                <div key={c.name} className="group cursor-pointer">
                  <div
                    className="w-full aspect-[3/2] rounded-2xl mb-3 border border-gray-100 group-hover:scale-[1.03] group-hover:shadow-lg transition-all duration-300"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="font-medium text-sm text-[#0f172a]">{c.name}</div>
                  <div className="text-xs text-gray-400 uppercase">{c.hex}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-24 md:py-32 bg-[#f8fafc] px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6366f1] mb-3 block">Guidelines</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Design <span className="text-[#6366f1]">rules</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealBlock>
              <h3 className="text-lg font-bold text-[#10b981] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Do
              </h3>
              <ul className="space-y-4">
                {[
                  "Place logo / branding in the top-left corner",
                  "Put primary CTA in the top-right corner",
                  "Center the core value proposition in the diagonal",
                  "Place social proof / trust markers bottom-left",
                  "Final conversion CTA goes bottom-right",
                  "Keep each horizontal bar self-contained",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <h3 className="text-lg font-bold text-[#ef4444] mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Don&apos;t
              </h3>
              <ul className="space-y-4">
                {[
                  "Place unimportant content on the Z-path",
                  "Break the natural Z visual flow",
                  "Overload the page with competing elements",
                  "Put CTAs outside the Z-path anchor points",
                  "Make the page too cluttered or busy",
                  "Ignore responsive collapse for mobile",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </RevealBlock>
          </div>

          {/* Z path diagram */}
          <RevealBlock delay={0.3} className="mt-16">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
              <h3 className="text-lg font-bold mb-8">Z-Path Anatomy</h3>
              <div className="grid grid-cols-2 gap-y-16 gap-x-8 relative">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] font-bold text-sm">1</div>
                  <div>
                    <div className="font-semibold text-sm">Logo / Brand</div>
                    <div className="text-xs text-gray-400">Top-left anchor</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <div>
                    <div className="font-semibold text-sm text-right">Primary CTA</div>
                    <div className="text-xs text-gray-400 text-right">Top-right anchor</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center text-[#06b6d4] font-bold text-sm">2</div>
                </div>
                <div className="col-span-2 text-center">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b] font-bold text-sm">3</div>
                    <div>
                      <div className="font-semibold text-sm">Core Value Proposition</div>
                      <div className="text-xs text-gray-400">Diagonal center</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] font-bold text-sm">4</div>
                  <div>
                    <div className="font-semibold text-sm">Social Proof</div>
                    <div className="text-xs text-gray-400">Bottom-left anchor</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <div>
                    <div className="font-semibold text-sm text-right">Final CTA</div>
                    <div className="text-xs text-gray-400 text-right">Bottom-right anchor</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#ec4899]/10 flex items-center justify-center text-[#ec4899] font-bold text-sm">5</div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-400">StyleKit</span>
              <span className="text-xs text-gray-300">Z-Pattern Layout Showcase</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/styles/z-pattern-layout" className="text-sm text-gray-500 hover:text-[#0f172a] z-link pb-0.5 transition-colors">
                Documentation
              </Link>
              <Link href="/styles" className="text-sm text-gray-500 hover:text-[#0f172a] z-link pb-0.5 transition-colors">
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
