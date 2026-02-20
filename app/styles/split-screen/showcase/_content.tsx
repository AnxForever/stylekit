"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  { id: "01", left: "Visual Impact", right: "Content Depth", desc: "Combine striking imagery with detailed content side by side." },
  { id: "02", left: "Dark Contrast", right: "Light Clarity", desc: "Use opposing palettes to create dramatic visual tension." },
  { id: "03", left: "Brand Story", right: "Product Details", desc: "Narrative on one side, specs on the other." },
];

const useCases = [
  { title: "Product Comparison", desc: "Present two options side by side with contrasting visuals. Let users compare features at a glance.", icon: "compare" },
  { title: "Brand Showcase", desc: "Visual panel for imagery, content panel for storytelling. Create immersive brand narratives.", icon: "brand" },
  { title: "Portfolio Project", desc: "Sticky image gallery on one side, scrollable project details on the other.", icon: "portfolio" },
  { title: "Before & After", desc: "Show transformation stories with contrasting panels that reveal change.", icon: "transform" },
];

const paletteColors = [
  { name: "Primary", value: "#0f0f0f", text: "text-white" },
  { name: "Secondary", value: "#ffffff", text: "text-[#0f0f0f]" },
  { name: "Accent Red", value: "#ff4757", text: "text-white" },
  { name: "Accent Green", value: "#2ed573", text: "text-[#0f0f0f]" },
  { name: "Accent Blue", value: "#1e90ff", text: "text-white" },
  { name: "Accent Orange", value: "#ffa502", text: "text-[#0f0f0f]" },
];

const doRules = [
  "Use CSS Grid or Flexbox for split layout: grid grid-cols-2",
  "Large screens keep split, small screens stack: lg:grid-cols-2 grid-cols-1",
  "Use contrasting or complementary content between panels",
  "One side for visuals, one side for text content",
  "Maintain visual weight balance between sides",
  "Add transition animations to enhance experience",
];

const dontRules = [
  "Never use identical content on both sides",
  "Never keep split layout on mobile (too narrow)",
  "Never create severe visual imbalance between panels",
  "Never ignore content reading order",
  "Never use overly harsh divider lines",
];

/* ------------------------------------------------------------------ */
/*  Inline hooks & components                                          */
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

function SplitPanel({ side, children, className = "" }: {
  side: "left" | "right";
  children: React.ReactNode;
  className?: string;
}) {
  const base = side === "left"
    ? "bg-[#0f0f0f] text-white"
    : "bg-white text-[#0f0f0f]";
  return (
    <div className={`relative min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center p-8 lg:p-16 transition-all duration-500 ease-out ${base} ${className}`}>
      {children}
    </div>
  );
}

function FeatureRow({ item, index }: { item: typeof features[number]; index: number }) {
  return (
    <RevealBlock delay={index * 0.1}>
      <div className="group grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-12 items-center py-10 border-b border-[#0f0f0f]/10 cursor-pointer">
        {/* Left label */}
        <div className="text-right hidden lg:block">
          <span className="text-xs uppercase tracking-[0.2em] text-[#0f0f0f]/40">{item.id}</span>
          <h3 className="text-2xl lg:text-3xl font-bold mt-1 group-hover:tracking-wider transition-all duration-500">{item.left}</h3>
        </div>

        {/* Divider */}
        <div className="hidden lg:flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-[#0f0f0f]/20 group-hover:bg-[#ff4757] transition-colors duration-500" />
          <div className="w-3 h-3 rounded-full border-2 border-[#0f0f0f]/20 group-hover:border-[#ff4757] group-hover:bg-[#ff4757] transition-all duration-500" />
          <div className="w-px h-8 bg-[#0f0f0f]/20 group-hover:bg-[#ff4757] transition-colors duration-500" />
        </div>

        {/* Right label */}
        <div className="lg:text-left">
          <div className="lg:hidden flex items-center gap-4 mb-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#0f0f0f]/40">{item.id}</span>
            <span className="font-bold">{item.left}</span>
            <span className="text-[#0f0f0f]/30">vs</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold group-hover:tracking-wider transition-all duration-500">{item.right}</h3>
          <p className="text-sm text-[#0f0f0f]/60 mt-2 max-w-sm">{item.desc}</p>
        </div>
      </div>
    </RevealBlock>
  );
}

function UseCaseIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    compare: "M9 5H2v14h7V5zm13 0h-7v14h7V5z",
    brand: "M12 2L2 7v10l10 5 10-5V7L12 2z",
    portfolio: "M4 6h16v12H4V6zm2 2v8h12V8H6z",
    transform: "M4 4h7v7H4V4zm9 9h7v7h-7v-7z",
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#ff4757]">
      <path d={paths[icon] || paths.compare} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"buttons" | "cards" | "inputs" | "panels">("buttons");
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tabs = ["buttons", "cards", "inputs", "panels"] as const;

  return (
    <div className="min-h-screen bg-white text-[#0f0f0f]">
      <style>{`
        @keyframes split-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes split-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .split-divider-pulse { animation: split-pulse 2s ease-in-out infinite; }
      `}</style>

      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/styles/split-screen/showcase" className="text-white text-lg font-bold tracking-[0.15em] uppercase">
              Split Screen
            </Link>
            <nav className="flex items-center gap-6 md:gap-8">
              <Link href="/styles/split-screen" className="text-white/60 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">
                Docs
              </Link>
              <Link href="/styles" className="text-white/60 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero: 50/50 Split ===== */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Dark */}
        <div
          className="relative min-h-[50vh] lg:min-h-screen bg-[#0f0f0f] flex items-center justify-center overflow-hidden transition-all duration-700 ease-out"
          style={{ flex: hoveredSide === "left" ? 1.15 : hoveredSide === "right" ? 0.85 : 1 }}
          onMouseEnter={() => setHoveredSide("left")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,71,87,0.12),transparent_60%)]" />
          <div className="relative z-10 p-8 lg:p-16 text-center">
            <span
              className="block text-xs uppercase tracking-[0.3em] text-white/40 mb-6"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              Left Panel
            </span>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95]"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              Dark<br />
              <span className="text-[#ff4757]">Mode.</span>
            </h1>
            <p
              className="text-white/50 text-sm mt-6 max-w-xs mx-auto"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
              }}
            >
              High-contrast visual treatment for dramatic storytelling and bold impact.
            </p>
            <button
              className="mt-8 px-8 py-4 border-2 border-white text-white font-semibold hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150 ease-out"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.6s, background-color 0.15s, color 0.15s",
              }}
            >
              Select Dark
            </button>
          </div>
        </div>

        {/* Right: Light */}
        <div
          className="relative min-h-[50vh] lg:min-h-screen bg-white flex items-center justify-center overflow-hidden transition-all duration-700 ease-out"
          style={{
            flex: hoveredSide === "right" ? 1.15 : hoveredSide === "left" ? 0.85 : 1,
            opacity: hoveredSide === "left" ? 0.6 : 1,
          }}
          onMouseEnter={() => setHoveredSide("right")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(30,144,255,0.06),transparent_60%)]" />
          <div className="relative z-10 p-8 lg:p-16 text-center">
            <span
              className="block text-xs uppercase tracking-[0.3em] text-[#0f0f0f]/40 mb-6"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            >
              Right Panel
            </span>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#0f0f0f] leading-[0.95]"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              Light<br />
              <span className="text-[#1e90ff]">Mode.</span>
            </h1>
            <p
              className="text-[#0f0f0f]/50 text-sm mt-6 max-w-xs mx-auto"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
            >
              Editorial clarity for long-form reading and daylight ergonomics.
            </p>
            <button
              className="mt-8 px-8 py-4 border-2 border-[#0f0f0f] bg-[#0f0f0f] text-white font-semibold hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150 ease-out"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s, background-color 0.15s, color 0.15s",
              }}
            >
              Select Light
            </button>
          </div>
        </div>
      </section>

      {/* ===== Marquee Divider ===== */}
      <div className="w-full overflow-hidden border-y border-[#0f0f0f]/10 py-4 bg-white">
        <div className="flex w-[200%]" style={{ animation: "split-marquee 20s linear infinite" }}>
          {[0, 1].map((i) => (
            <div key={i} className="flex-1 flex justify-around items-center text-xs tracking-[0.3em] uppercase text-[#0f0f0f]/40 font-medium">
              <span>50/50 Split</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4757]/40" />
              <span>60/40 Ratio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ed573]/40" />
              <span>Sticky Panels</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e90ff]/40" />
              <span>Diagonal Split</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffa502]/40" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== Features: Left/Right Contrast List ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            Contrast <span className="text-[#0f0f0f]/30">Creates</span> Tension.
          </h2>
          <p className="text-sm uppercase tracking-[0.2em] text-[#0f0f0f]/50 max-w-lg">
            Split Screen layout divides the viewport into two contrasting regions, creating visual tension and narrative flow.
          </p>
        </RevealBlock>

        {features.map((f, i) => (
          <FeatureRow key={f.id} item={f} index={i} />
        ))}
      </section>

      {/* ===== Component Demos (Tab-Switched) ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              Component <span className="text-[#0f0f0f]/30">Library.</span>
            </h2>
            <p className="text-sm text-[#0f0f0f]/50 max-w-lg">
              Interactive components designed for contrasting split panels.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <div className="flex gap-2 mb-12 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-150 ${
                  activeTab === tab
                    ? "bg-[#0f0f0f] text-white"
                    : "bg-transparent text-[#0f0f0f]/60 hover:bg-[#0f0f0f]/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "buttons" && (
              <RevealBlock>
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] overflow-hidden">
                  <div className="bg-[#0f0f0f] p-12 flex flex-col items-start justify-center gap-6">
                    <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">Dark Panel Buttons</p>
                    <button className="px-8 py-4 border-2 border-white text-white font-semibold hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150 ease-out">
                      Primary Action
                    </button>
                    <button className="px-8 py-4 border-2 border-white/30 text-white/60 font-semibold hover:border-white hover:text-white transition-colors duration-150 ease-out">
                      Secondary Action
                    </button>
                    <button className="px-6 py-3 bg-[#ff4757] text-white font-semibold hover:bg-[#ff6b7a] transition-colors duration-150 ease-out">
                      Accent CTA
                    </button>
                  </div>
                  <div className="bg-white p-12 flex flex-col items-start justify-center gap-6 border-l border-[#0f0f0f]/10">
                    <p className="text-[#0f0f0f]/40 text-xs uppercase tracking-[0.2em] mb-2">Light Panel Buttons</p>
                    <button className="px-8 py-4 border-2 border-[#0f0f0f] bg-[#0f0f0f] text-white font-semibold hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150 ease-out">
                      Primary Action
                    </button>
                    <button className="px-8 py-4 border-2 border-[#0f0f0f]/30 text-[#0f0f0f]/60 font-semibold hover:border-[#0f0f0f] hover:text-[#0f0f0f] transition-colors duration-150 ease-out">
                      Secondary Action
                    </button>
                    <button className="px-6 py-3 bg-[#1e90ff] text-white font-semibold hover:bg-[#3da0ff] transition-colors duration-150 ease-out">
                      Accent CTA
                    </button>
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "cards" && (
              <RevealBlock>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
                  <div className="group relative bg-[#0f0f0f] text-white p-8 lg:p-12 min-h-[300px] flex flex-col justify-center transition-all duration-500 ease-out hover:flex-[1.1]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_55%)] scale-100 group-hover:scale-105 transition-transform duration-500 ease-out" />
                    <div className="relative z-10">
                      <span className="text-sm uppercase tracking-[0.2em] text-white/50 mb-4 block">Night Edit</span>
                      <h3 className="text-3xl lg:text-4xl font-bold mb-4">Dark Panel</h3>
                      <p className="text-white/60 mb-6 max-w-sm">High-contrast visual treatment for dramatic storytelling.</p>
                      <button className="px-6 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150 ease-out">
                        Select Dark
                      </button>
                    </div>
                  </div>
                  <div className="group relative bg-white text-[#0f0f0f] p-8 lg:p-12 min-h-[300px] flex flex-col justify-center transition-all duration-500 ease-out hover:flex-[1.1]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.05),transparent_55%)] scale-100 group-hover:scale-105 transition-transform duration-500 ease-out" />
                    <div className="relative z-10">
                      <span className="text-sm uppercase tracking-[0.2em] text-[#0f0f0f]/50 mb-4 block">Day Edit</span>
                      <h3 className="text-3xl lg:text-4xl font-bold mb-4">Light Panel</h3>
                      <p className="text-[#0f0f0f]/60 mb-6 max-w-sm">Editorial clarity for reading and daylight ergonomics.</p>
                      <button className="px-6 py-3 border-2 border-[#0f0f0f] bg-[#0f0f0f] text-white font-semibold hover:bg-white hover:text-[#0f0f0f] transition-colors duration-150 ease-out">
                        Select Light
                      </button>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "inputs" && (
              <RevealBlock>
                <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                  <div className="bg-[#0f0f0f] p-12 flex flex-col gap-8">
                    <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Dark Panel Inputs</p>
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-[0.15em] mb-2">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 bg-transparent border-b-2 border-white/20 text-white text-lg placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs uppercase tracking-[0.15em] mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-transparent border-b-2 border-white/20 text-white text-lg placeholder-white/30 focus:outline-none focus:border-[#ff4757] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-12 flex flex-col gap-8 border-l border-[#0f0f0f]/10">
                    <p className="text-[#0f0f0f]/40 text-xs uppercase tracking-[0.2em]">Light Panel Inputs</p>
                    <div>
                      <label className="block text-[#0f0f0f]/50 text-xs uppercase tracking-[0.15em] mb-2">Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 bg-transparent border-b-2 border-[#0f0f0f]/20 text-[#0f0f0f] text-lg placeholder-[#0f0f0f]/30 focus:outline-none focus:border-[#0f0f0f] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#0f0f0f]/50 text-xs uppercase tracking-[0.15em] mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-transparent border-b-2 border-[#0f0f0f]/20 text-[#0f0f0f] text-lg placeholder-[#0f0f0f]/30 focus:outline-none focus:border-[#1e90ff] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "panels" && (
              <RevealBlock>
                <div className="space-y-8">
                  {/* 50/50 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-[#0f0f0f]/10">
                    <SplitPanel side="left">
                      <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">50/50 Split</span>
                      <h3 className="text-3xl font-bold">Equal Halves</h3>
                      <p className="text-white/60 mt-2">Both panels share the viewport equally.</p>
                    </SplitPanel>
                    <SplitPanel side="right">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#0f0f0f]/40 mb-4">Balanced Layout</span>
                      <h3 className="text-3xl font-bold">Perfect Balance</h3>
                      <p className="text-[#0f0f0f]/60 mt-2">Content and visuals given equal weight.</p>
                    </SplitPanel>
                  </div>

                  {/* 60/40 */}
                  <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] overflow-hidden border border-[#0f0f0f]/10">
                    <SplitPanel side="left">
                      <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">60/40 Split</span>
                      <h3 className="text-3xl font-bold">Emphasized</h3>
                      <p className="text-white/60 mt-2">Primary content gets 60% of the viewport.</p>
                    </SplitPanel>
                    <SplitPanel side="right">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#0f0f0f]/40 mb-4">Secondary</span>
                      <h3 className="text-2xl font-bold">Support</h3>
                      <p className="text-[#0f0f0f]/60 mt-2">Supplementary content in 40%.</p>
                    </SplitPanel>
                  </div>
                </div>
              </RevealBlock>
            )}
          </div>
        </div>
      </section>

      {/* ===== Use Cases ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            Use <span className="text-[#0f0f0f]/30">Cases.</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((uc, i) => (
            <RevealBlock key={uc.title} delay={i * 0.1}>
              <div className="group p-8 border border-[#0f0f0f]/10 hover:border-[#0f0f0f]/30 transition-colors duration-300 cursor-pointer">
                <div className="flex items-start gap-4 mb-4">
                  <UseCaseIcon icon={uc.icon} />
                  <h3 className="text-xl font-bold group-hover:tracking-wide transition-all duration-300">{uc.title}</h3>
                </div>
                <p className="text-[#0f0f0f]/60 text-sm leading-relaxed">{uc.desc}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-[#0f0f0f] text-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              Color <span className="text-white/30">Palette.</span>
            </h2>
            <p className="text-sm text-white/50 max-w-lg">
              High-contrast primaries with vibrant accents for maximum visual tension.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {paletteColors.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.05}>
                <div className="group cursor-pointer">
                  <div
                    className={`aspect-square flex items-end p-4 transition-transform duration-300 group-hover:scale-[1.03] ${c.text}`}
                    style={{ backgroundColor: c.value }}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">{c.name}</p>
                      <p className="text-xs opacity-60 font-mono mt-1">{c.value}</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            Design <span className="text-[#0f0f0f]/30">Rules.</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <RevealBlock>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#2ed573] font-semibold mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-[#2ed573]" />
              Do
            </h3>
            <ul className="space-y-4">
              {doRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#0f0f0f]/70">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#2ed573] flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#ff4757] font-semibold mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-[#ff4757]" />
              Don&apos;t
            </h3>
            <ul className="space-y-4">
              {dontRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#0f0f0f]/70">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#ff4757] flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[#0f0f0f]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs tracking-[0.2em] uppercase text-[#0f0f0f]/40">
              StyleKit &middot; Split Screen Showcase
            </p>
            <Link href="/styles/split-screen" className="text-xs tracking-[0.2em] uppercase hover:text-[#0f0f0f] text-[#0f0f0f]/60 transition-colors">
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
