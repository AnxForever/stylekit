"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ── data ─────────────────────────────────────────────── */
const products = [
  { id: 1, name: "iPhone 15 Pro", tagline: "Titanium. So strong. So light. So Pro.", price: "From $999", image: "https://picsum.photos/seed/iphone/800/800" },
  { id: 2, name: "MacBook Air", tagline: "Supercharged by M3.", price: "From $1,099", image: "https://picsum.photos/seed/macbook/800/800" },
  { id: 3, name: "Apple Watch", tagline: "A magical new way to use Apple Watch.", price: "From $399", image: "https://picsum.photos/seed/watch/800/800" },
  { id: 4, name: "AirPods Pro", tagline: "Adaptive Audio. Now playing.", price: "From $249", image: "https://picsum.photos/seed/airpods/800/800" },
];

const featureItems = [
  { title: "A17 Pro chip", desc: "The most powerful chip ever in a smartphone. A GPU that enables AAA gaming." },
  { title: "Titanium design", desc: "Strong. Light. Made from the same alloy used by the aerospace industry." },
  { title: "48MP camera", desc: "The most advanced camera system ever on iPhone. Period." },
  { title: "Action button", desc: "A new, customizable button gives you quick access to your favorite feature." },
];

const colorTokens = [
  { name: "Black", hex: "#000000", tw: "bg-black", text: "text-white" },
  { name: "White", hex: "#ffffff", tw: "bg-white border border-black/10", text: "text-black" },
  { name: "Apple Gray", hex: "#f5f5f7", tw: "bg-[#f5f5f7]", text: "text-black" },
  { name: "Apple Blue", hex: "#0071e3", tw: "bg-[#0071e3]", text: "text-white" },
  { name: "Apple Green", hex: "#34c759", tw: "bg-[#34c759]", text: "text-white" },
  { name: "Apple Red", hex: "#ff3b30", tw: "bg-[#ff3b30]", text: "text-white" },
  { name: "Text Primary", hex: "#1d1d1f", tw: "bg-[#1d1d1f]", text: "text-white" },
  { name: "Text Secondary", hex: "#86868b", tw: "bg-[#86868b]", text: "text-white" },
];

const doRules = [
  "Use generous whitespace to let content breathe",
  "Use Apple Gray #f5f5f7 as section backgrounds",
  "Use Apple Blue #0071e3 as the primary accent color",
  "Use refined rounded corners (rounded-xl, rounded-2xl)",
  "Use subtle shadows that communicate depth without weight",
  "Use SF Pro-style font stack (-apple-system, BlinkMacSystemFont)",
];

const dontRules = [
  "Use more than 3 colors in any single view",
  "Use gradient backgrounds on surfaces",
  "Use heavy shadows (shadow-xl, shadow-2xl)",
  "Crowd elements together without breathing room",
  "Use decorative or flashy animations",
  "Use non-standard border-radius or sharp corners",
];

/* ── hooks ────────────────────────────────────────────── */
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

/* ── sub-components ───────────────────────────────────── */
function AppleButton({ children, variant = "filled", className = "" }: {
  children: React.ReactNode;
  variant?: "filled" | "outline" | "text";
  className?: string;
}) {
  const base = "font-medium transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.96]";
  const variants: Record<string, string> = {
    filled: "px-6 py-3 bg-[#0071e3] text-white rounded-full shadow-[0_4px_14px_rgba(0,113,227,0.3)] hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)] hover:-translate-y-0.5 hover:bg-[#0077ed]",
    outline: "px-6 py-3 bg-transparent text-[#0071e3] rounded-full border border-[#0071e3] hover:bg-[#0071e3] hover:text-white",
    text: "text-[#0071e3] hover:underline",
  };
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="group p-8 bg-white rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] text-center cursor-pointer overflow-hidden">
      <div className="w-48 h-48 mx-auto mb-6 bg-[#f5f5f7] rounded-2xl flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
      </div>
      <h3 className="text-2xl font-semibold text-black mb-2 tracking-tight">{product.name}</h3>
      <p className="text-[#86868b] mb-4 group-hover:text-[#6e6e73] transition-colors duration-500">{product.tagline}</p>
      <p className="text-lg font-medium text-black">{product.price}</p>
      <div className="flex justify-center gap-4 mt-6">
        <span className="text-[#0071e3] text-sm hover:underline cursor-pointer">Learn more &gt;</span>
        <span className="text-[#0071e3] text-sm hover:underline cursor-pointer">Buy &gt;</span>
      </div>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────── */
export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "features" | "inputs">("products");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-[#1d1d1f]"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif", WebkitFontSmoothing: "antialiased" }}
    >
      <style>{`
        .apple-link {
          color: #0071e3;
          text-decoration: none;
          cursor: pointer;
        }
        .apple-link:hover {
          text-decoration: underline;
        }
        @keyframes apple-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <Link href="/styles/apple-style/showcase" className="text-black">
              <svg className="w-4 h-4" viewBox="0 0 17 21" fill="currentColor">
                <path d="M15.5 18.5c-.9 1.1-1.9 2.1-3.4 2.1-1.5 0-2-.9-3.6-.9-1.7 0-2.3 1-3.7 1-1.4 0-2.4-1-3.4-2.2C-.3 16-.9 12.2.7 9.7 1.8 8 3.5 6.9 5.3 6.9c1.5 0 2.7 1 3.6 1 .9 0 2.3-1.3 4.1-1.1.7 0 2.7.3 3.9 2.2-3.5 2.2-2.9 6.7.6 8.5zM11.3 4.7C12.1 3.8 12.6 2.5 12.5 1.2c-1.2.1-2.6.8-3.5 1.8-.7.8-1.4 2.1-1.2 3.4 1.3.1 2.7-.7 3.5-1.7z" />
              </svg>
            </Link>
            <nav className="flex items-center gap-8">
              {["Store", "Mac", "iPhone", "iPad"].map((item) => (
                <span key={item} className="text-xs text-black hover:text-[#86868b] transition-colors cursor-pointer hidden md:inline">{item}</span>
              ))}
              <Link href="/styles/apple-style" className="text-xs text-[#86868b] hover:text-black transition-colors">
                Docs
              </Link>
              <Link href="/styles" className="text-xs text-[#86868b] hover:text-black transition-colors">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Hero (Dark Section) ── */}
      <section className="pt-12 min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#1d1d1f]" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-semibold tracking-tight mb-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
            }}
          >
            iPhone 15 Pro
          </h1>
          <h2
            className="text-2xl md:text-3xl text-[#86868b] font-medium mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.1s",
            }}
          >
            Titanium. So strong. So light. So Pro.
          </h2>
          <div
            className="flex justify-center gap-6 mb-16"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.2s",
            }}
          >
            <span className="text-[#2997ff] hover:underline cursor-pointer">Learn more &gt;</span>
            <span className="text-[#2997ff] hover:underline cursor-pointer">Buy &gt;</span>
          </div>
          <div
            className="w-full max-w-4xl mx-auto aspect-video bg-[#1d1d1f] rounded-3xl overflow-hidden"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "scale(1)" : "scale(0.95)",
              transition: "all 1s cubic-bezier(0.25,0.1,0.25,1) 0.3s",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/apple_hero/1920/1080"
              alt="Product Hero"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* ── Feature Highlights ── */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="text-center mb-20">
            <p className="text-[#86868b] font-medium text-sm mb-2">Explore the lineup.</p>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Get to know iPhone.
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featureItems.map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.1}>
                <div className="group bg-white rounded-3xl p-10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer">
                  <h3 className="text-3xl font-semibold tracking-tight mb-3 group-hover:text-[#0071e3] transition-colors duration-500">{feature.title}</h3>
                  <p className="text-[#86868b] leading-relaxed group-hover:text-[#6e6e73] transition-colors duration-500">{feature.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Component Demos (Tab-switched) ── */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Apple Components
            </h2>
            <p className="text-[#86868b] text-lg">Precision-crafted interface elements.</p>
          </RevealBlock>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-[#f5f5f7] rounded-full p-1">
              {(["products", "features", "inputs"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${activeTab === tab ? "bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)]" : "text-[#86868b] hover:text-black"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[500px]">
            {activeTab === "products" && (
              <RevealBlock>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </RevealBlock>
            )}

            {activeTab === "features" && (
              <RevealBlock>
                <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                      <h3 className="text-4xl font-semibold tracking-tight mb-6">
                        Buttons
                      </h3>
                      <p className="text-[#86868b] mb-8 leading-relaxed">
                        Minimal, refined, and purposeful. Every button is designed to feel premium with subtle depth and smooth spring-like feedback.
                      </p>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                          <AppleButton variant="filled">Buy</AppleButton>
                          <AppleButton variant="outline">Learn more</AppleButton>
                        </div>
                        <div>
                          <AppleButton variant="text">Compare models &gt;</AppleButton>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-64 h-64 bg-white rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center" style={{ animation: "apple-float 4s ease-in-out infinite" }}>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-[#f5f5f7] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2" className="w-8 h-8">
                              <rect x="3" y="3" width="18" height="18" rx="4" />
                              <path d="M8 12h8M12 8v8" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium">Interactive</p>
                          <p className="text-xs text-[#86868b]">Spring physics</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "inputs" && (
              <RevealBlock>
                <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-16">
                  <h3 className="text-3xl font-semibold tracking-tight mb-2">Form Elements</h3>
                  <p className="text-[#86868b] mb-8">Clean, minimal input fields with subtle focus states.</p>
                  <div className="max-w-md space-y-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-white rounded-xl text-black placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-white rounded-xl text-black placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    />
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full px-4 py-3 bg-white rounded-xl text-black placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] resize-none"
                    />
                    <div className="flex items-center gap-4">
                      <AppleButton variant="filled">Submit</AppleButton>
                      <AppleButton variant="text">Cancel</AppleButton>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}
          </div>
        </div>
      </section>

      {/* ── Color Palette ── */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Color Palette
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorTokens.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.05}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                  <div className={`h-20 ${c.tw} ${c.text} flex items-end p-3`}>
                    <span className="text-[10px] font-medium opacity-70">{c.name}</span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-mono text-[#86868b]">{c.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Rules ── */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Design Principles
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealBlock>
              <div className="rounded-3xl p-8 bg-[#f5f5f7]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#34c759] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  </div>
                  <h3 className="text-xl font-semibold">Do</h3>
                </div>
                <ul className="space-y-4">
                  {doRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-[#6e6e73]">
                      <span className="w-1.5 h-1.5 bg-[#34c759] rounded-full mt-2 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
            <RevealBlock delay={0.15}>
              <div className="rounded-3xl p-8 bg-[#f5f5f7]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#ff3b30] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                  </div>
                  <h3 className="text-xl font-semibold">Don&apos;t</h3>
                </div>
                <ul className="space-y-4">
                  {dontRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-[#6e6e73]">
                      <span className="w-1.5 h-1.5 bg-[#ff3b30] rounded-full mt-2 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#d2d2d7]">
        <div className="max-w-[980px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-xs text-[#86868b]">
              StyleKit &middot; Apple Style Showcase
            </p>
            <Link href="/styles/apple-style" className="text-xs text-[#0071e3] hover:underline">
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
