"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// useInView — fires once when element enters viewport
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

// ---------------------------------------------------------------------------
// RevealBlock — fade + slide up on scroll into view
// ---------------------------------------------------------------------------
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
// Apple logo SVG (simplified)
// ---------------------------------------------------------------------------
function AppleLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 814 1000"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.7-57.8-155.5-127.4C46 382.8-.6 341.4-.6 270.1c0-183.3 191.1-218.8 259.4-218.8 48.5 0 140.9 41.9 206.6 41.9 61.4 0 168.8-44.5 245.2-44.5 30.4 0 132.2 2.6 199.6 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Icon helpers
// ---------------------------------------------------------------------------
function IconChip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  );
}

function IconCamera({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  );
}

function IconBattery({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function IconShield({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconDisplay({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
    </svg>
  );
}

function IconWifi({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  );
}

function IconSearch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function IconBag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main showcase component
// ---------------------------------------------------------------------------
export default function AppleStyleShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const productColors = [
    { name: "Black Titanium", hex: "#1c1c1e" },
    { name: "White Titanium", hex: "#e8e3db" },
    { name: "Natural Titanium", hex: "#9b8e7d" },
    { name: "Desert Titanium", hex: "#c4a882" },
  ];

  const features = [
    {
      icon: <IconChip className="w-8 h-8" />,
      title: "A18 Pro chip",
      desc: "The most powerful chip ever in a smartphone. Built for Apple Intelligence and the next generation of apps.",
    },
    {
      icon: <IconCamera className="w-8 h-8" />,
      title: "48MP Fusion camera",
      desc: "Stunning detail in every shot. The most versatile camera system ever on iPhone. Capture the world as you see it.",
    },
    {
      icon: <IconBattery className="w-8 h-8" />,
      title: "All-day battery",
      desc: "Up to 33 hours of video playback. Power that keeps pace with your life, from morning to night.",
    },
    {
      icon: <IconShield className="w-8 h-8" />,
      title: "Titanium design",
      desc: "Grade 5 titanium. Stronger than steel, lighter in hand. Aerospace-grade precision at every edge.",
    },
    {
      icon: <IconDisplay className="w-8 h-8" />,
      title: "Super Retina XDR",
      desc: "6.3-inch always-on ProMotion display. Up to 2000 nits peak brightness. Every pixel, perfected.",
    },
    {
      icon: <IconWifi className="w-8 h-8" />,
      title: "Wi-Fi 7",
      desc: "The fastest wireless connectivity on iPhone. Download at up to 5.8 Gbps. Latency so low you will feel the difference.",
    },
  ];

  const tabContent = [
    {
      label: "Overview",
      content:
        "iPhone 16 Pro. Built for Apple Intelligence. The most advanced iPhone ever made redefines what a smartphone can be. Every detail considered. Every decision intentional.",
    },
    {
      label: "Tech Specs",
      content:
        "A18 Pro chip with 6-core CPU and 6-core GPU · 6.3-inch Super Retina XDR ProMotion display · Pro camera system with 48MP Fusion · 4K 120fps Dolby Vision video · USB 3 · Wi-Fi 7 · Face ID",
    },
    {
      label: "Compare",
      content:
        "iPhone 16 Pro starts at $999. iPhone 16 Pro Max starts at $1,199. Both feature the same A18 Pro chip, Pro camera system, and the same commitment to extraordinary design.",
    },
  ];

  const principles = [
    {
      do: true,
      rule: "Generous whitespace",
      detail: "Let content breathe. Padding is not waste — it is intent. Every gap communicates hierarchy.",
    },
    {
      do: false,
      rule: "Decorative gradients",
      detail: "Avoid ornamentation for its own sake. Every element must earn its place on screen.",
    },
    {
      do: true,
      rule: "Spring physics easing",
      detail: "cubic-bezier(0.25,0.1,0.25,1) on every transition. Motion that feels alive, never mechanical.",
    },
    {
      do: false,
      rule: "Harsh drop shadows",
      detail: "Shadows should be whispers, not statements. Soft, diffuse, and intentional — never loud.",
    },
    {
      do: true,
      rule: "Haptic touch feedback",
      detail: "active:scale-[0.96] or active:scale-[0.98] on every interactive surface. Physics you can feel.",
    },
    {
      do: false,
      rule: "Competing visual hierarchies",
      detail: "One focal point per section. Guide the eye, never scatter it. Clarity over decoration.",
    },
    {
      do: true,
      rule: "SF Pro system font",
      detail: "-apple-system, BlinkMacSystemFont. The typeface is the product. Precision tracking and weight.",
    },
    {
      do: false,
      rule: "More than three accent colors",
      detail: "Black and white form the foundation. One accent color per context. Restraint is a superpower.",
    },
  ];

  const productLineup = [
    {
      name: "iPhone 16",
      tagline: "A magical new way to interact.",
      price: "From $799",
      accent: "#34c759",
      light: "#e8f5e9",
    },
    {
      name: "iPhone 16 Pro",
      tagline: "Built for Apple Intelligence.",
      price: "From $999",
      accent: "#0071e3",
      light: "#e3f0ff",
      featured: true,
    },
    {
      name: "iPhone 16 Pro Max",
      tagline: "The biggest pro display ever.",
      price: "From $1,199",
      accent: "#ff3b30",
      light: "#ffeee8",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}
    >
      {/* ------------------------------------------------------------------
          1. Nav — translucent frosted glass Apple nav bar
      ------------------------------------------------------------------ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-[980px] mx-auto px-6 flex items-center justify-between h-12">
          <Link href="/styles/apple-style" aria-label="Apple Style home">
            <AppleLogo className="w-4 h-5 text-[#1d1d1f] hover:text-gray-500 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {["Store", "Mac", "iPad", "iPhone", "Watch", "Vision"].map((item) => (
              <span
                key={item}
                className="text-xs text-[#1d1d1f]/80 hover:text-[#1d1d1f] cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              >
                {item}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              className="text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.96]"
              aria-label="Search"
            >
              <IconSearch className="w-4 h-4" />
            </button>
            <button
              className="text-[#1d1d1f]/80 hover:text-[#1d1d1f] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.96]"
              aria-label="Shopping bag"
            >
              <IconBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------
          2. Hero — product announcement style, dark background
      ------------------------------------------------------------------ */}
      <section className="relative bg-black min-h-screen flex flex-col items-center justify-center text-center px-6 pt-12 pb-24 overflow-hidden">
        {/* Subtle blue radial glow — not a decorative gradient, a product highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 65%, rgba(0,113,227,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0ms",
          }}
        >
          <p className="text-sm font-semibold text-[#0071e3] tracking-wide mb-3 uppercase">
            Introducing
          </p>
        </div>

        {/* Main title */}
        <div
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 120ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 120ms",
          }}
        >
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-white mb-3 max-w-[900px]">
            iPhone 16 Pro.
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 220ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 220ms",
          }}
        >
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-[#86868b] mb-10">
            Hello, Apple Intelligence.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap justify-center gap-5"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 340ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 340ms",
          }}
        >
          <button className="bg-[#0071e3] rounded-full px-7 py-3 text-white text-sm font-medium hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)] active:scale-[0.96] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
            Buy
          </button>
          <button className="text-[#0071e3] text-sm font-medium hover:underline active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
            Learn more {">"}
          </button>
        </div>

        {/* Abstract titanium phone visual */}
        <div
          className="mt-20 relative"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 460ms, transform 1s cubic-bezier(0.16,1,0.3,1) 460ms",
          }}
        >
          <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto">
            {/* Phone body */}
            <div
              className="absolute inset-0 rounded-[40px] border border-white/10"
              style={{
                background: "linear-gradient(135deg, #3a3a3c 0%, #1c1c1e 40%, #2c2c2e 70%, #48484a 100%)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            />
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-black/60 rounded-full" />
            {/* Screen */}
            <div
              className="absolute inset-8 rounded-[28px]"
              style={{
                background: "linear-gradient(160deg, #1a1a2e 0%, #0f0f1a 50%, #1a1a2e 100%)",
                boxShadow: "inset 0 2px 4px rgba(0,113,227,0.15)",
              }}
            />
            {/* Apple Intelligence glyph */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0071e3 0%, #34c759 100%)",
                  boxShadow: "0 8px 24px rgba(0,113,227,0.4)",
                }}
              >
                <AppleLogo className="w-10 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          3. Product lineup — 3 cards
      ------------------------------------------------------------------ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock delay={0}>
            <p className="text-sm font-semibold text-[#0071e3] tracking-wide text-center mb-2 uppercase">
              The lineup.
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-4">
              Choose your iPhone.
            </h2>
            <p className="text-lg text-[#86868b] text-center max-w-xl mx-auto mb-16">
              Every model. Every size. Every need. There is an iPhone built exactly for you.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {productLineup.map((product, i) => (
              <RevealBlock key={product.name} delay={i * 0.08}>
                <div
                  className={`group relative bg-[#f5f5f7] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] active:scale-[0.98] ${
                    product.featured
                      ? "shadow-[0_4px_12px_rgba(0,0,0,0.04)] ring-1 ring-[#0071e3]/20"
                      : "shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                  }`}
                >
                  {product.featured && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-[#0071e3] text-white text-xs font-medium px-3 py-1 rounded-full">
                        Most popular
                      </span>
                    </div>
                  )}
                  {/* Card image area */}
                  <div
                    className="h-52 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105 flex items-center justify-center"
                    style={{ background: `linear-gradient(145deg, ${product.light}, ${product.accent}22)` }}
                  >
                    <div
                      className="w-20 h-32 rounded-[18px] border border-white/60 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(160deg, #2c2c2e 0%, #1c1c1e 100%)",
                        boxShadow: `0 16px 40px ${product.accent}33`,
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-lg"
                        style={{ background: product.accent }}
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold tracking-tight mb-1">{product.name}</h3>
                    <p className="text-sm text-[#86868b] mb-4">{product.tagline}</p>
                    <p className="text-base font-semibold mb-5">{product.price}</p>
                    <div className="flex gap-3">
                      <button
                        className="flex-1 rounded-full py-2 text-sm font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 active:scale-[0.96]"
                        style={{ background: product.accent, boxShadow: `0 4px 12px ${product.accent}40` }}
                      >
                        Buy
                      </button>
                      <button className="flex-1 rounded-full py-2 text-sm font-medium border border-gray-200 text-[#1d1d1f] hover:border-gray-400 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.96]">
                        Learn more
                      </button>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Titanium color picker */}
          <RevealBlock delay={0.12} className="mt-16">
            <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">Finish</p>
                  <h3
                    className="text-2xl font-semibold tracking-tight mb-2 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  >
                    {productColors[selectedColor].name}
                  </h3>
                  <p className="text-sm text-[#86868b] mb-6">
                    Grade 5 titanium. Precision-machined to extraordinary tolerances.
                  </p>
                  <div className="flex gap-3">
                    {productColors.map((color, i) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(i)}
                        aria-label={color.name}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.96] ${
                          selectedColor === i
                            ? "border-[#0071e3] scale-110"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                        style={{ background: color.hex }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div
                    className="w-32 h-48 rounded-[24px] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    style={{
                      background: `linear-gradient(145deg, ${productColors[selectedColor].hex}cc, ${productColors[selectedColor].hex})`,
                      boxShadow: `0 24px 48px ${productColors[selectedColor].hex}44`,
                    }}
                  />
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          4. Feature grid — icon + title + description
      ------------------------------------------------------------------ */}
      <section className="py-24 px-6 bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock delay={0}>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-4">
              Pro. In every way.
            </h2>
            <p className="text-lg text-[#86868b] text-center max-w-xl mx-auto mb-16">
              Six breakthrough capabilities. One extraordinary device. Redefining what pro truly means.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.07}>
                <div className="group bg-white rounded-3xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-default h-full">
                  <div className="w-14 h-14 bg-[#f5f5f7] rounded-2xl flex items-center justify-center mb-5 text-[#0071e3] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-[#86868b] text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          5. Component demos — Button, Card, Input in Apple design language
      ------------------------------------------------------------------ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock delay={0}>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-4">
              Components.
            </h2>
            <p className="text-lg text-[#86868b] text-center max-w-xl mx-auto mb-16">
              Every element distilled to its essence. Form follows function, always.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Button demo */}
            <RevealBlock delay={0}>
              <div className="bg-[#f5f5f7] rounded-3xl p-8 flex flex-col h-full">
                <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-6">Button</p>
                <div className="flex-1 flex flex-col items-center justify-center gap-4 py-4">
                  <button className="w-full px-6 py-3 bg-[#0071e3] rounded-full text-white text-sm font-medium shadow-[0_4px_14px_rgba(0,113,227,0.3)] hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)] hover:-translate-y-0.5 hover:bg-[#0077ed] active:scale-[0.96] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                    Buy now
                  </button>
                  <button className="w-full px-6 py-3 bg-white rounded-full text-[#1d1d1f] text-sm font-medium border border-gray-200 hover:border-gray-400 hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                    Learn more
                  </button>
                  <button className="text-[#0071e3] text-sm font-medium hover:underline active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                    Shop all iPhone {">"}
                  </button>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200/60">
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Pill-shaped with spring physics. Blue primary, white secondary, inline text link.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Card demo */}
            <RevealBlock delay={0.08}>
              <div className="bg-[#f5f5f7] rounded-3xl p-8 flex flex-col h-full">
                <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-6">Card</p>
                <div className="flex-1 flex items-center justify-center">
                  <div className="group w-full bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-pointer text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-[#f5f5f7] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                      <AppleLogo className="w-8 h-10 text-[#1d1d1f]" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight mb-1">MacBook Pro</h3>
                    <p className="text-xs text-[#86868b] mb-3 group-hover:text-[#515154] transition-colors duration-500">
                      Supercharged by M4 Pro.
                    </p>
                    <p className="text-sm font-semibold">From $1,999</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200/60">
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    White background, rounded-2xl, micro-lift shadow on hover, group-hover scale icon.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Input demo */}
            <RevealBlock delay={0.16}>
              <div className="bg-[#f5f5f7] rounded-3xl p-8 flex flex-col h-full">
                <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-6">Input</p>
                <div className="flex-1 flex flex-col justify-center gap-4">
                  {/* Search input */}
                  <div
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                      inputFocused
                        ? "bg-white ring-2 ring-[#0071e3] shadow-[0_4px_12px_rgba(0,113,227,0.12)]"
                        : "bg-white/80 ring-1 ring-gray-200/60"
                    }`}
                  >
                    <IconSearch className={`w-4 h-4 flex-shrink-0 transition-colors duration-500 ${inputFocused ? "text-[#0071e3]" : "text-[#86868b]"}`} />
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onFocus={() => setInputFocused(true)}
                      onBlur={() => setInputFocused(false)}
                      placeholder="Search apple.com"
                      className="flex-1 bg-transparent text-sm text-[#1d1d1f] placeholder-[#86868b] focus:outline-none"
                    />
                    {inputValue && (
                      <button
                        onClick={() => setInputValue("")}
                        className="flex-shrink-0 w-4 h-4 rounded-full bg-[#86868b] flex items-center justify-center active:scale-[0.96] transition-all duration-300"
                        aria-label="Clear"
                      >
                        <span className="text-white text-xs leading-none">×</span>
                      </button>
                    )}
                  </div>

                  {/* Text area */}
                  <textarea
                    rows={3}
                    placeholder="Leave a message..."
                    className="w-full px-4 py-3 bg-white/80 ring-1 ring-gray-200/60 rounded-xl text-sm text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:bg-white transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] resize-none"
                  />
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200/60">
                  <p className="text-xs text-[#86868b] leading-relaxed">
                    Apple gray background, ring-2 blue focus state. Subtle, purposeful, accessible.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Tab switcher */}
          <RevealBlock delay={0.1} className="mt-8">
            <div className="bg-[#f5f5f7] rounded-3xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="flex border-b border-gray-200/60">
                {tabContent.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-4 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.98] ${
                      activeTab === i
                        ? "text-[#1d1d1f] border-b-2 border-[#0071e3] bg-white"
                        : "text-[#86868b] hover:text-[#1d1d1f]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-8 md:p-10 min-h-[100px]">
                <p
                  key={activeTab}
                  className="text-[#1d1d1f] text-base leading-relaxed"
                  style={{ animation: "appleTabFadeIn 0.4s cubic-bezier(0.16,1,0.3,1)" }}
                >
                  {tabContent[activeTab].content}
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          6. Nav bar showcase — full demo of Apple nav
      ------------------------------------------------------------------ */}
      <section className="py-24 px-6 bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock delay={0}>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-4">
              Navigation.
            </h2>
            <p className="text-lg text-[#86868b] text-center max-w-xl mx-auto mb-16">
              Translucent. Adaptive. Always in reach. The Apple nav bar is a masterclass in restraint.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.08}>
            <div className="rounded-3xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-gray-100">
              {/* Simulated browser bar */}
              <div className="bg-[#e5e5ea] px-4 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-4 bg-white/70 backdrop-blur rounded-lg px-3 py-1.5 text-xs text-[#86868b] text-center">
                  apple.com
                </div>
              </div>

              {/* The nav itself */}
              <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6">
                <div className="max-w-[980px] mx-auto flex items-center justify-between h-12">
                  <AppleLogo className="w-4 h-5 text-[#1d1d1f]" />
                  <div className="hidden md:flex items-center gap-7">
                    {["Store", "Mac", "iPad", "iPhone", "Watch", "Vision", "Entertainment", "Accessories", "Support"].map((item) => (
                      <span key={item} className="text-xs text-[#1d1d1f]/80 cursor-pointer hover:text-[#1d1d1f] transition-colors duration-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-5">
                    <IconSearch className="w-4 h-4 text-[#1d1d1f]/80" />
                    <IconBag className="w-4 h-4 text-[#1d1d1f]/80" />
                  </div>
                </div>
              </div>

              {/* Page content preview behind nav */}
              <div className="bg-white px-6 py-12 text-center">
                <p className="text-xs text-[#86868b] uppercase tracking-wider mb-2">Introducing</p>
                <h3 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">MacBook Air.</h3>
                <p className="text-lg text-[#86868b] mt-1">Impossibly thin. Impossibly capable.</p>
                <div className="flex justify-center gap-4 mt-6">
                  <button className="bg-[#0071e3] rounded-full px-5 py-2 text-white text-sm font-medium hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                    Buy
                  </button>
                  <button className="text-[#0071e3] text-sm font-medium hover:underline">
                    Learn more {">"}
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.16} className="mt-8">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  label: "bg-white/80",
                  desc: "80% opacity white — reveals page content scrolling behind, maintaining context.",
                },
                {
                  label: "backdrop-blur-xl",
                  desc: "24px Gaussian blur. Content beneath is blurred, not obscured. Depth through translucency.",
                },
                {
                  label: "border-b border-gray-200/50",
                  desc: "Half-opacity 1px separator. Visible enough to define, subtle enough to recede.",
                },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                  <p className="text-sm font-mono font-medium text-[#0071e3] mb-2">{item.label}</p>
                  <p className="text-xs text-[#86868b] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          7. Color palette
      ------------------------------------------------------------------ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock delay={0}>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-4">
              The palette.
            </h2>
            <p className="text-lg text-[#86868b] text-center max-w-xl mx-auto mb-16">
              Five colors. Each chosen with precision. Each carrying meaning. Nothing is arbitrary.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {[
              { name: "Black", hex: "#000000", desc: "Primary text & dark hero backgrounds", light: false },
              { name: "Apple Gray", hex: "#f5f5f7", desc: "Section backgrounds & card fills", light: true, border: true },
              { name: "Apple Blue", hex: "#0071e3", desc: "Accent — CTAs, links, focus rings", light: false },
              { name: "Apple Green", hex: "#34c759", desc: "Success states, positive feedback", light: false },
              { name: "Apple Red", hex: "#ff3b30", desc: "Destructive actions, error states", light: false },
            ].map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.06}>
                <div className="group bg-[#f5f5f7] rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] cursor-default">
                  <div
                    className="h-28 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                    style={{
                      background: color.hex,
                      border: color.border ? "1px solid #e5e5e5" : "none",
                    }}
                  />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-[#1d1d1f] mb-0.5">{color.name}</p>
                    <p className="text-xs text-[#86868b] mb-1.5 leading-snug">{color.desc}</p>
                    <p className="text-xs text-[#86868b] font-mono">{color.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Typography specimen */}
          <RevealBlock delay={0.1}>
            <div className="bg-[#f5f5f7] rounded-3xl p-8 md:p-12">
              <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-8">
                Typography — SF Pro Display
              </p>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 border-b border-gray-200/60 pb-6">
                  <p className="text-xs text-[#86868b] w-28 flex-shrink-0">Large Title</p>
                  <p className="text-5xl font-semibold tracking-tight text-[#1d1d1f]">iPhone 16 Pro.</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 border-b border-gray-200/60 pb-6">
                  <p className="text-xs text-[#86868b] w-28 flex-shrink-0">Title 1</p>
                  <p className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">Hello, Apple Intelligence.</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 border-b border-gray-200/60 pb-6">
                  <p className="text-xs text-[#86868b] w-28 flex-shrink-0">Body</p>
                  <p className="text-base text-[#1d1d1f] leading-relaxed max-w-lg">
                    The most powerful chip ever in a smartphone. Built for Apple Intelligence and the next generation of transformative applications.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                  <p className="text-xs text-[#86868b] w-28 flex-shrink-0">Caption</p>
                  <p className="text-xs text-[#86868b] leading-relaxed max-w-lg">
                    1. All battery claims depend on network configuration and many other factors; actual results will vary.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          8. Design rules — do / don't
      ------------------------------------------------------------------ */}
      <section className="py-24 px-6 bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto">
          <RevealBlock delay={0}>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-4">
              Design principles.
            </h2>
            <p className="text-lg text-[#86868b] text-center max-w-xl mx-auto mb-16">
              Restraint is a discipline. These rules define the Apple aesthetic — what to do and what to ruthlessly eliminate.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-5">
            {principles.map((p, i) => (
              <RevealBlock key={p.rule} delay={i * 0.06}>
                <div
                  className={`rounded-3xl p-8 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 ${
                    p.do
                      ? "bg-[#f0fdf4] border border-[#34c759]/20"
                      : "bg-[#fff1f0] border border-[#ff3b30]/20"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${
                        p.do ? "bg-[#34c759]" : "bg-[#ff3b30]"
                      }`}
                    >
                      {p.do ? "+" : "−"}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#86868b] mb-0.5">
                        {p.do ? "Do" : "Don't"}
                      </p>
                      <h3 className="text-base font-semibold tracking-tight">{p.rule}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-[#86868b] leading-relaxed pl-10">{p.detail}</p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Spacing guide */}
          <RevealBlock delay={0.1} className="mt-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-8">
                Spacing system
              </p>
              <div className="flex flex-wrap gap-4 items-end">
                {[
                  { token: "py-3", px: 12, label: "sm" },
                  { token: "py-4", px: 16, label: "md" },
                  { token: "py-6", px: 24, label: "lg" },
                  { token: "py-8", px: 32, label: "xl" },
                  { token: "py-12", px: 48, label: "2xl" },
                  { token: "py-16", px: 64, label: "3xl" },
                  { token: "py-20", px: 80, label: "4xl" },
                  { token: "py-24", px: 96, label: "5xl" },
                ].map((s) => (
                  <div key={s.token} className="flex flex-col items-center gap-2">
                    <div
                      className="bg-[#0071e3]/10 rounded-lg w-10 flex items-end justify-center"
                      style={{ height: `${s.px * 1.2}px` }}
                    >
                      <div
                        className="w-10 bg-[#0071e3]/30 rounded-lg"
                        style={{ height: `${s.px * 0.6}px` }}
                      />
                    </div>
                    <p className="text-xs font-mono text-[#86868b]">{s.px}px</p>
                    <p className="text-xs text-[#86868b]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          9. Dark CTA — "Think different" moment
      ------------------------------------------------------------------ */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-[980px] mx-auto text-center">
          <RevealBlock delay={0}>
            <AppleLogo className="w-12 h-14 mx-auto text-white mb-10 opacity-80" />
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6">
              Think different.
            </h2>
          </RevealBlock>
          <RevealBlock delay={0.2}>
            <p className="text-xl text-[#86868b] mb-12 max-w-lg mx-auto leading-relaxed">
              The best products are the ones that get out of the way. They fit into life. They amplify it. They disappear into function.
            </p>
          </RevealBlock>
          <RevealBlock delay={0.3}>
            <div className="flex flex-wrap justify-center gap-5">
              <button className="bg-white rounded-full px-8 py-4 text-black text-base font-medium hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.2)] active:scale-[0.96] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                Shop iPhone
              </button>
              <button className="text-[#2997ff] text-base font-medium hover:underline active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                Watch the film {">"}
              </button>
            </div>
          </RevealBlock>

          {/* Animated stat row */}
          <RevealBlock delay={0.4} className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2B+", label: "Active Apple devices" },
              { value: "A18 Pro", label: "Most powerful chip" },
              { value: "48MP", label: "Fusion camera" },
              { value: "33hr", label: "Battery life" },
            ].map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-2">{stat.value}</p>
                <p className="text-sm text-[#86868b]">{stat.label}</p>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          10. Footer
      ------------------------------------------------------------------ */}
      <footer className="bg-[#1d1d1f] text-[#86868b] pt-12 pb-8 px-6">
        <div className="max-w-[980px] mx-auto">
          <p className="text-xs border-b border-white/10 pb-8 mb-8 leading-relaxed">
            1. All battery claims depend on network configuration and many other factors; actual results will vary. See{" "}
            <span className="underline cursor-pointer">apple.com/batteries</span> for more information.
            2. Testing conducted by Apple in October 2024 using production iPhone 16 Pro units and software.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
            {[
              {
                heading: "Shop and Learn",
                links: ["Store", "Mac", "iPad", "iPhone", "Watch", "Vision Pro", "AirPods", "Apple TV"],
              },
              {
                heading: "Services",
                links: ["Apple Music", "Apple TV+", "Apple Arcade", "iCloud+", "Apple One", "Apple Fitness+"],
              },
              {
                heading: "Account",
                links: ["Manage Your Apple ID", "Apple Store Account", "iCloud.com"],
              },
              {
                heading: "Apple Store",
                links: ["Find a Store", "Genius Bar", "Today at Apple", "Group Reservations", "Apple Camp", "Refurbished"],
              },
              {
                heading: "For Business",
                links: ["Apple and Business", "Shop for Business", "For Education", "Apple Financial Services", "Enterprise"],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold text-white/90 mb-3">{col.heading}</p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <span className="text-xs hover:text-white cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <p className="text-xs">
              Copyright {"\u00A9"} 2026 Apple Inc. All rights reserved.{" "}
              <span className="text-[#515154]">
                {" · "}StyleKit Apple Style Showcase
              </span>
            </p>
            <div className="flex gap-4 flex-wrap">
              {["Privacy Policy", "Terms of Use", "Sales and Refunds", "Legal", "Site Map"].map((item) => (
                <span
                  key={item}
                  className="text-xs hover:text-white cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex justify-center">
            <Link
              href="/styles/apple-style"
              className="text-xs text-[#515154] hover:text-[#86868b] transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            >
              {"<"} Back to Apple Style docs
            </Link>
          </div>
        </div>
      </footer>

      {/* Keyframe for tab content fade */}
      <style>{`
        @keyframes appleTabFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
