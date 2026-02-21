"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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

// SVG Cloud shape for decorative use
function CloudShape({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 80"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M40 70 Q10 70 10 50 Q10 30 30 28 Q28 10 50 10 Q60 2 75 10 Q85 4 100 12 Q115 2 130 12 Q145 4 155 18 Q175 18 180 36 Q195 38 190 55 Q188 70 165 70 Z" />
    </svg>
  );
}

// Leaf SVG for decorative use
function LeafShape({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 60 100"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M30 5 Q55 30 50 65 Q45 85 30 95 Q15 85 10 65 Q5 30 30 5Z" />
      <path d="M30 95 Q30 50 30 20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  );
}

export default function GhibliStyleShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(65);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const palette = [
    { name: "Sage Green", hex: "#7cb9a8", role: "Primary", textColor: "text-white" },
    { name: "Warm Parchment", hex: "#f4e4bc", role: "Secondary", textColor: "text-[#5a4a3a]" },
    { name: "Sunset Orange", hex: "#e8a87c", role: "Accent 1", textColor: "text-white" },
    { name: "Sky Teal", hex: "#85cdca", role: "Accent 2", textColor: "text-white" },
    { name: "Dusty Rose", hex: "#c38d94", role: "Accent 3", textColor: "text-white" },
    { name: "Forest", hex: "#6b9a7d", role: "Dark Green", textColor: "text-white" },
    { name: "Cream Cloud", hex: "#f5f0e6", role: "Surface", textColor: "text-[#5a4a3a]" },
    { name: "Earthy Brown", hex: "#5a4a3a", role: "Text", textColor: "text-white" },
  ];

  const tabs = [
    { label: "Stories", emoji: "\u{1F33F}" },
    { label: "Nature", emoji: "\u{1F343}" },
    { label: "Spirits", emoji: "\u2728" },
  ];

  const accordionItems = [
    {
      title: "What makes Ghibli style special?",
      content:
        "The warmth of hand-drawn animation, attention to everyday moments, and a deep respect for nature and humanity. Every frame feels like a painting, every character feels like a friend.",
    },
    {
      title: "Design philosophy",
      content:
        "Soft, organic shapes with rounded corners. Warm, earthy color palettes inspired by nature. Gentle gradients that mimic watercolor paintings. A sense of wonder in the ordinary.",
    },
    {
      title: "Key visual elements",
      content:
        "Fluffy clouds, lush greenery, cozy interiors, magical creatures, and golden sunlight. The style embraces imperfection and celebrates the beauty of the natural world.",
    },
  ];

  const featureCards = [
    {
      icon: "\u2601",
      title: "Sky",
      desc: "Dreamy clouds drift gently above the meadow.",
      grad: "from-[#85cdca] to-[#7cb9a8]",
      shadow: "rgba(133,205,202,0.3)",
    },
    {
      icon: "\u{1F33F}",
      title: "Nature",
      desc: "Forest spirits dance among the ancient trees.",
      grad: "from-[#7cb9a8] to-[#5a9a8a]",
      shadow: "rgba(124,185,168,0.3)",
    },
    {
      icon: "\u{1F305}",
      title: "Warmth",
      desc: "Golden sunset paints the world in amber hues.",
      grad: "from-[#e8a87c] to-[#d49a6c]",
      shadow: "rgba(232,168,124,0.3)",
    },
    {
      icon: "\u{1F338}",
      title: "Bloom",
      desc: "Petals fall softly like whispers on the wind.",
      grad: "from-[#c38d94] to-[#b07d84]",
      shadow: "rgba(195,141,148,0.3)",
    },
  ];

  const doList = [
    "Use soft, warm color tones that evoke earthy comfort",
    "Add hand-drawn style illustrations or irregular borders",
    "Incorporate natural elements: clouds, trees, flowers",
    "Use round, organic shapes — rounded-full, rounded-3xl",
    "Add subtle texture effects for a watercolor feel",
    "Create dreamy gradient backgrounds (sky to field)",
    "Keep interactions gentle — duration-500 to 700, soft floats",
  ];

  const dontList = [
    "Use sharp, harsh edges or strict right angles",
    "Use high-contrast, eye-straining color combinations",
    "Add cold, tech-driven visual elements",
    "Create overly complex or rapid-fire animations",
    "Use hard cuts or high-frequency jarring transitions",
  ];

  const statsData = [
    { label: "Happy Visitors", value: "2.4M", color: "#7cb9a8" },
    { label: "Stories Told", value: "847", color: "#e8a87c" },
    { label: "Dreams Shared", value: "12K", color: "#85cdca" },
    { label: "Kind Words", value: "36K", color: "#c38d94" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87ceeb] via-[#b4e4f5] to-[#f4e4bc] relative overflow-hidden">
      {/* Global keyframe animations */}
      <style>{`
        @keyframes ghibli-float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-14px) translateX(8px); }
          50% { transform: translateY(-6px) translateX(-4px); }
          75% { transform: translateY(-18px) translateX(6px); }
        }
        @keyframes ghibli-sway {
          0%, 100% { transform: rotate(-4deg) scale(1); }
          50% { transform: rotate(4deg) scale(1.05); }
        }
        @keyframes ghibli-drift {
          0% { transform: translateX(0); }
          50% { transform: translateX(12px); }
          100% { transform: translateX(0); }
        }
        @keyframes ghibli-pulse-soft {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes ghibli-spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .float-cloud { animation: ghibli-float 22s ease-in-out infinite; }
        .float-cloud-2 { animation: ghibli-float 28s ease-in-out infinite 3s; }
        .float-cloud-3 { animation: ghibli-float 18s ease-in-out infinite 1.5s; }
        .float-cloud-4 { animation: ghibli-float 25s ease-in-out infinite 5s; }
        .float-cloud-5 { animation: ghibli-float 30s ease-in-out infinite 2s; }
        .sway-leaf { animation: ghibli-sway 7s ease-in-out infinite; }
        .drift-slow { animation: ghibli-drift 10s ease-in-out infinite; }
        .pulse-soft { animation: ghibli-pulse-soft 3s ease-in-out infinite; }
        .spin-slow { animation: ghibli-spin-slow 20s linear infinite; }
      `}</style>

      {/* Floating Background Clouds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-14 left-[4%] float-cloud">
          <CloudShape className="w-44 h-20 text-white/55" />
        </div>
        <div className="absolute top-28 left-[18%] float-cloud-2">
          <CloudShape className="w-28 h-14 text-white/40" />
        </div>
        <div className="absolute top-10 right-[8%] float-cloud-3">
          <CloudShape className="w-52 h-24 text-white/50" />
        </div>
        <div className="absolute top-40 right-[22%] float-cloud-4">
          <CloudShape className="w-36 h-16 text-white/35" />
        </div>
        <div className="absolute top-20 left-[42%] float-cloud-5">
          <CloudShape className="w-32 h-14 text-white/45" />
        </div>
      </div>

      {/* Floating Leaf Decorations */}
      <div className="fixed bottom-[20%] left-[6%] opacity-20 pointer-events-none z-0 sway-leaf">
        <LeafShape className="w-14 h-20 text-[#6b9a7d]" />
      </div>
      <div
        className="fixed bottom-[30%] right-[10%] opacity-15 pointer-events-none z-0 sway-leaf"
        style={{ animationDelay: "2s" }}
      >
        <LeafShape className="w-10 h-16 text-[#5a9a8a]" />
      </div>

      {/* ─── NAVIGATION ─── */}
      <nav className="relative z-10 px-6 py-4 bg-white/35 backdrop-blur-md border-b border-[#d4c49a]/30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/ghibli-style"
            className="group flex items-center gap-2 text-[#5a4a3a] hover:text-[#7cb9a8] transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Back to Docs</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Decorative cloud icon in nav */}
            <CloudShape className="w-8 h-4 text-[#7cb9a8]/60" />
            <span className="font-semibold text-xl text-[#5a4a3a] tracking-wide">
              Ghibli Style
            </span>
          </div>

          <Link
            href="/styles"
            className="px-5 py-2 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white text-sm rounded-full shadow-[0_4px_12px_rgba(124,185,168,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(124,185,168,0.45)] transition-all duration-500 ease-in-out font-medium"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="relative z-10 pt-24 pb-28 px-6 text-center overflow-hidden">
        {/* Watercolor wash background blob */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[700px] h-[500px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 40% 40%, #f4e4bc 0%, #85cdca 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div
          className="max-w-4xl mx-auto relative"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          {/* Sparkle row */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <span className="text-[#e8a87c] text-2xl pulse-soft">&#10022;</span>
            <CloudShape className="w-12 h-6 text-[#7cb9a8]/70 drift-slow" />
            <span className="text-[#c38d94] text-2xl pulse-soft" style={{ animationDelay: "0.5s" }}>
              &#10022;
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-[#5a4a3a] mb-6 leading-tight tracking-tight">
            A World of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7cb9a8] via-[#85cdca] to-[#7cb9a8]">
              Wonder
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#7a6a5a] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Where every journey begins with a single step into the magical
            unknown — carried by gentle winds and golden light.
          </p>

          {/* Hero stat tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Hand-crafted", "Watercolor", "Dreamy", "Natural"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-sm bg-white/50 backdrop-blur-sm border border-[#d4c49a]/40 text-[#7a6a5a] rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="group px-10 py-4 bg-gradient-to-b from-[#85cdca] to-[#7cb9a8] text-white font-medium rounded-full shadow-[0_8px_20px_rgba(124,185,168,0.3)] hover:shadow-[0_12px_30px_rgba(124,185,168,0.45)] hover:-translate-y-1 hover:scale-[1.01] hover:rotate-[0.8deg] active:scale-[0.98] active:rotate-0 active:translate-y-0 transition-all duration-500 ease-in-out">
              Begin Journey
            </button>
            <button className="px-10 py-4 bg-white/55 backdrop-blur-sm text-[#5a4a3a] font-medium rounded-full border-2 border-[#d4c49a]/45 hover:bg-white/75 hover:border-[#7cb9a8]/40 hover:-translate-y-0.5 transition-all duration-500 ease-in-out">
              Learn More
            </button>
          </div>
        </div>

        {/* Decorative field at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 80"
            className="w-full text-[#a8d4a0]/30"
            fill="currentColor"
          >
            <path d="M0 40 Q180 0 360 40 Q540 80 720 40 Q900 0 1080 40 Q1260 80 1440 40 L1440 80 L0 80Z" />
          </svg>
        </div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">
              Magic in Numbers
            </h2>
            <p className="text-[#7a6a5a] text-lg">Spreading joy everywhere</p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {statsData.map((stat, i) => (
              <RevealBlock key={stat.label} delay={i * 0.1}>
                <div className="group p-6 bg-gradient-to-br from-[#f4e4bc]/80 to-[#e8d5a3]/80 backdrop-blur-sm rounded-3xl border border-[#d4c49a]/40 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out text-center">
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-4 shadow-sm"
                    style={{ backgroundColor: stat.color }}
                  />
                  <p className="text-3xl font-bold text-[#5a4a3a] mb-1">{stat.value}</p>
                  <p className="text-sm text-[#7a6a5a]">{stat.label}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPONENT DEMOS: BUTTONS ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">Buttons</h2>
            <p className="text-[#7a6a5a] text-lg">Soft and inviting touches</p>
          </RevealBlock>

          <div className="space-y-6">
            {/* Variants */}
            <RevealBlock
              className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(90,74,58,0.06)]"
              delay={0.05}
            >
              <p className="text-sm font-semibold text-[#7a6a5a] mb-6 uppercase tracking-widest">
                Variants
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-b from-[#85cdca] to-[#7cb9a8] text-white font-medium rounded-full border-2 border-[#5a9a8a]/25 shadow-[0_8px_20px_rgba(124,185,168,0.3)] hover:shadow-[0_12px_30px_rgba(124,185,168,0.45)] hover:-translate-y-1 hover:scale-[1.01] hover:rotate-[0.8deg] active:scale-[0.98] active:rotate-0 active:translate-y-0 transition-all duration-500 ease-in-out">
                  Primary
                </button>
                <button className="px-8 py-4 bg-gradient-to-b from-[#e8a87c] to-[#d49a6c] text-white font-medium rounded-full shadow-[0_8px_20px_rgba(232,168,124,0.3)] hover:shadow-[0_12px_30px_rgba(232,168,124,0.45)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
                  Warm
                </button>
                <button className="px-8 py-4 bg-gradient-to-b from-[#c38d94] to-[#b07d84] text-white font-medium rounded-full shadow-[0_8px_20px_rgba(195,141,148,0.3)] hover:shadow-[0_12px_30px_rgba(195,141,148,0.45)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
                  Rose
                </button>
                <button className="px-8 py-4 bg-white/60 backdrop-blur-sm text-[#5a4a3a] font-medium rounded-full border-2 border-[#d4c49a]/50 hover:bg-white hover:border-[#7cb9a8]/50 hover:-translate-y-0.5 transition-all duration-500 ease-in-out">
                  Secondary
                </button>
                <button className="px-8 py-4 text-[#7cb9a8] font-medium hover:text-[#5a9a8a] hover:underline transition-all duration-300 ease-in-out">
                  Text Only
                </button>
              </div>
            </RevealBlock>

            {/* Sizes */}
            <RevealBlock
              className="p-8 bg-gradient-to-br from-[#e8f4f8]/80 to-[#d4eef2]/80 rounded-3xl border border-[#85cdca]/30 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
              delay={0.1}
            >
              <p className="text-sm font-semibold text-[#5a8a88] mb-6 uppercase tracking-widest">
                Sizes
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <button className="px-5 py-2.5 text-sm bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_12px_rgba(124,185,168,0.3)] hover:-translate-y-0.5 transition-all duration-500 ease-in-out">
                  Small
                </button>
                <button className="px-7 py-3.5 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_6px_16px_rgba(124,185,168,0.35)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
                  Medium
                </button>
                <button className="px-10 py-5 text-lg bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_8px_20px_rgba(124,185,168,0.4)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
                  Large
                </button>
              </div>
            </RevealBlock>

            {/* Icon Buttons */}
            <RevealBlock
              className="p-8 bg-gradient-to-br from-[#f8f0e8]/80 to-[#f4e4bc]/80 rounded-3xl border border-[#c38d94]/20 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
              delay={0.15}
            >
              <p className="text-sm font-semibold text-[#8a6a6a] mb-6 uppercase tracking-widest">
                With Icons
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_6px_16px_rgba(124,185,168,0.35)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(124,185,168,0.45)] transition-all duration-500 ease-in-out">
                  <CloudShape className="w-5 h-3 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  Discover
                </button>
                <button className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-b from-[#c38d94] to-[#a87d84] text-white font-medium rounded-full shadow-[0_6px_16px_rgba(195,141,148,0.35)] hover:-translate-y-1 transition-all duration-500 ease-in-out">
                  <span>&#9825;</span>
                  Favorite
                </button>
                <button className="flex items-center gap-2 px-7 py-3.5 bg-white/70 backdrop-blur-sm text-[#5a4a3a] font-medium rounded-full border-2 border-[#d4c49a]/50 hover:bg-white hover:-translate-y-0.5 transition-all duration-500 ease-in-out">
                  <LeafShape className="w-3 h-5 text-[#7cb9a8]" />
                  Explore
                </button>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── COMPONENT DEMOS: CARDS ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">Cards</h2>
            <p className="text-[#7a6a5a] text-lg">Natural elements brought to life</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.08}>
                <div
                  className="group p-6 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/45 shadow-[0_8px_30px_rgba(90,74,58,0.06)] hover:shadow-[0_16px_40px_rgba(124,185,168,0.18)] hover:-translate-y-1.5 hover:-rotate-[0.8deg] hover:scale-[1.01] transition-all duration-700 ease-in-out text-center cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 mx-auto bg-gradient-to-br ${card.grad} rounded-full flex items-center justify-center mb-4 shadow-[0_4px_15px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 ease-in-out`}
                    style={{ boxShadow: `0 4px 15px ${card.shadow}` }}
                  >
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#5a4a3a] mb-2 group-hover:text-[#7cb9a8] transition-colors duration-500">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#7a6a5a] leading-relaxed group-hover:text-[#5a4a3a] transition-colors duration-500">
                    {card.desc}
                  </p>
                  <button className="mt-4 text-sm text-[#7cb9a8] hover:text-[#5a9a8a] transition-colors duration-300 font-medium">
                    Learn more
                  </button>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Featured Card */}
          <RevealBlock className="mt-8" delay={0.1}>
            <div className="group p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/45 shadow-[0_8px_30px_rgba(90,74,58,0.06)] hover:shadow-[0_16px_40px_rgba(124,185,168,0.18)] hover:-translate-y-1.5 hover:-rotate-[0.8deg] hover:scale-[1.01] transition-all duration-700 ease-in-out backdrop-blur-sm flex flex-col md:flex-row gap-6 items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#85cdca] to-[#7cb9a8] rounded-full flex items-center justify-center flex-shrink-0 shadow-[inset_0_2px_6px_rgba(255,255,255,0.5),0_6px_18px_rgba(124,185,168,0.3)] group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 ease-in-out">
                <CloudShape className="w-10 h-6 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-[#5a4a3a] mb-2 group-hover:text-[#7cb9a8] transition-colors duration-500">
                  Sky Garden
                </h3>
                <p className="text-[#7a6a5a] leading-relaxed group-hover:text-[#5a4a3a] transition-colors duration-500">
                  Where dreams float among the clouds, carried by the gentle wind of
                  summer. A place where every moment feels like a watercolor painting.
                </p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-b from-[#85cdca] to-[#7cb9a8] text-white rounded-full font-medium shadow-[0_4px_14px_rgba(124,185,168,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(124,185,168,0.4)] transition-all duration-500 ease-in-out flex-shrink-0">
                Visit
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── COMPONENT DEMOS: INPUTS ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">Forms</h2>
            <p className="text-[#7a6a5a] text-lg">Soft and welcoming fields</p>
          </RevealBlock>

          <RevealBlock>
            <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(90,74,58,0.06)]">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(124,185,168,0.4)] mb-4">
                  <span className="text-2xl">&#10022;</span>
                </div>
                <h3 className="text-xl font-semibold text-[#5a4a3a]">Start Your Journey</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#7a6a5a] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    className="w-full px-5 py-4 bg-[#f4e4bc]/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#7cb9a8] focus:bg-[#f4e4bc]/80 focus:shadow-[0_4px_15px_rgba(124,185,168,0.2)] transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#7a6a5a] mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    className="w-full px-5 py-4 bg-[#f4e4bc]/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#85cdca] focus:bg-[#f4e4bc]/80 focus:shadow-[0_4px_15px_rgba(133,205,202,0.2)] transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#7a6a5a] mb-2">
                    Your Story
                  </label>
                  <textarea
                    placeholder="Write your story..."
                    rows={4}
                    className="w-full px-5 py-4 bg-[#f4e4bc]/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] placeholder-[#a89a7a] focus:outline-none focus:border-[#e8a87c] focus:bg-[#f4e4bc]/80 focus:shadow-[0_4px_15px_rgba(232,168,124,0.2)] transition-all duration-300 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#7a6a5a] mb-2">
                      Season
                    </label>
                    <select className="w-full px-5 py-4 bg-[#f4e4bc]/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] focus:outline-none focus:border-[#7cb9a8] transition-all duration-300 appearance-none">
                      <option>Spring</option>
                      <option>Summer</option>
                      <option>Autumn</option>
                      <option>Winter</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7a6a5a] mb-2">
                      Mood
                    </label>
                    <select className="w-full px-5 py-4 bg-[#f4e4bc]/60 border-2 border-[#d4c49a]/40 rounded-2xl text-[#5a4a3a] focus:outline-none focus:border-[#85cdca] transition-all duration-300 appearance-none">
                      <option>Peaceful</option>
                      <option>Adventurous</option>
                      <option>Nostalgic</option>
                      <option>Dreamy</option>
                    </select>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_6px_20px_rgba(124,185,168,0.4)] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(124,185,168,0.5)] active:scale-[0.98] active:translate-y-0 transition-all duration-500 ease-in-out">
                  Begin Adventure
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── TABS SECTION ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">Tabs</h2>
            <p className="text-[#7a6a5a] text-lg">Organized wonder</p>
          </RevealBlock>

          <RevealBlock>
            <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(90,74,58,0.06)]">
              {/* Tab headers */}
              <div className="flex gap-2 p-1 bg-white/40 rounded-full mb-6">
                {tabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium text-sm transition-all duration-500 ease-in-out ${
                      activeTab === i
                        ? "bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white shadow-[0_4px_12px_rgba(124,185,168,0.4)]"
                        : "text-[#7a6a5a] hover:text-[#5a4a3a] hover:bg-white/50"
                    }`}
                  >
                    <span>{tab.emoji}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="min-h-[140px] p-5 bg-white/40 rounded-2xl">
                {activeTab === 0 && (
                  <div className="text-[#5a4a3a]">
                    <h4 className="text-lg font-semibold mb-3">Magical Stories</h4>
                    <p className="text-[#7a6a5a] leading-relaxed">
                      Every adventure begins with a story. From flying castles to forest
                      spirits, discover tales that warm the heart and kindle the imagination.
                    </p>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="text-[#5a4a3a]">
                    <h4 className="text-lg font-semibold mb-3">Living Nature</h4>
                    <ul className="space-y-2 text-[#7a6a5a]">
                      <li className="flex items-center gap-2">
                        <LeafShape className="w-3 h-5 text-[#7cb9a8]" /> Ancient forests
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#c38d94]">&#10047;</span> Blooming meadows
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#85cdca]">&#128038;</span> Singing birds
                      </li>
                    </ul>
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="text-[#5a4a3a]">
                    <h4 className="text-lg font-semibold mb-3">Friendly Spirits</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Totoro", "Kodama", "Soot Sprites", "Forest God", "Calcifer"].map(
                        (spirit) => (
                          <span
                            key={spirit}
                            className="px-3 py-1.5 bg-[#7cb9a8]/20 border border-[#7cb9a8]/30 text-[#5a9a8a] text-sm rounded-full font-medium"
                          >
                            {spirit}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── TOGGLES & PROGRESS ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Toggles */}
          <RevealBlock delay={0}>
            <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(90,74,58,0.06)]">
              <h3 className="text-xl font-semibold text-[#5a4a3a] mb-2">Toggles</h3>
              <p className="text-sm text-[#7a6a5a] mb-6">Magical switches</p>
              <div className="space-y-5">
                {[
                  { label: "Show clouds", index: 0 },
                  { label: "Play wind sounds", index: 1 },
                  { label: "Night mode", index: 2 },
                ].map((item) => (
                  <div key={item.index} className="flex items-center justify-between">
                    <span className="text-[#5a4a3a] font-medium">{item.label}</span>
                    <button
                      onClick={() => {
                        const next = [...toggleStates];
                        next[item.index] = !next[item.index];
                        setToggleStates(next);
                      }}
                      className={`relative w-14 h-8 rounded-full transition-all duration-500 ease-in-out ${
                        toggleStates[item.index]
                          ? "bg-gradient-to-r from-[#7cb9a8] to-[#5a9a8a] shadow-[0_2px_10px_rgba(124,185,168,0.4)]"
                          : "bg-[#d4c49a]/50"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 ease-in-out ${
                          toggleStates[item.index] ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Progress */}
          <RevealBlock delay={0.08}>
            <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(90,74,58,0.06)]">
              <h3 className="text-xl font-semibold text-[#5a4a3a] mb-2">Progress</h3>
              <p className="text-sm text-[#7a6a5a] mb-6">Journey tracking</p>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#5a4a3a]">Adventure Progress</span>
                    <span className="text-sm text-[#7cb9a8] font-semibold">{progress}%</span>
                  </div>
                  <div className="h-3 bg-white/60 rounded-full border border-[#d4c49a]/30 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7cb9a8] to-[#85cdca] rounded-full shadow-[0_2px_8px_rgba(124,185,168,0.4)] transition-all duration-700 ease-in-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#5a4a3a]">Treasures Found</span>
                    <span className="text-sm text-[#e8a87c] font-semibold">78%</span>
                  </div>
                  <div className="h-3 bg-white/60 rounded-full border border-[#d4c49a]/30 overflow-hidden">
                    <div className="h-full w-[78%] bg-gradient-to-r from-[#e8a87c] to-[#f0b890] rounded-full shadow-[0_2px_8px_rgba(232,168,124,0.4)]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#5a4a3a]">Friends Made</span>
                    <span className="text-sm text-[#c38d94] font-semibold">45%</span>
                  </div>
                  <div className="h-3 bg-white/60 rounded-full border border-[#d4c49a]/30 overflow-hidden">
                    <div className="h-full w-[45%] bg-gradient-to-r from-[#c38d94] to-[#d4a0a6] rounded-full shadow-[0_2px_8px_rgba(195,141,148,0.4)]" />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                    className="px-4 py-2 text-sm bg-white/60 border border-[#d4c49a]/40 rounded-full text-[#5a4a3a] hover:bg-white transition-all duration-300"
                  >
                    -10%
                  </button>
                  <button
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                    className="px-4 py-2 text-sm bg-white/60 border border-[#d4c49a]/40 rounded-full text-[#5a4a3a] hover:bg-white transition-all duration-300"
                  >
                    +10%
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── ACCORDION ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">Accordion</h2>
            <p className="text-[#7a6a5a] text-lg">Expandable wisdom</p>
          </RevealBlock>

          <div className="space-y-3">
            {accordionItems.map((item, i) => (
              <RevealBlock key={i} delay={i * 0.07}>
                <div
                  className={`border rounded-2xl overflow-hidden transition-all duration-500 ${
                    openAccordion === i
                      ? "border-[#7cb9a8]/40 shadow-[0_8px_25px_rgba(124,185,168,0.15)]"
                      : "border-[#d4c49a]/30"
                  } bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90`}
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-[#5a4a3a]">{item.title}</span>
                    <span
                      className={`text-[#7cb9a8] transition-transform duration-500 ${
                        openAccordion === i ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      &#10022;
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openAccordion === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-5 text-[#7a6a5a] leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ALERTS / NOTIFICATIONS ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">Alerts</h2>
            <p className="text-[#7a6a5a] text-lg">Gentle notifications</p>
          </RevealBlock>

          <div className="space-y-4">
            <RevealBlock delay={0}>
              <div className="flex items-start gap-4 p-5 bg-[#7cb9a8]/15 border border-[#7cb9a8]/30 rounded-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(124,185,168,0.3)] text-white font-bold text-sm">
                  &#10003;
                </div>
                <div>
                  <h4 className="font-semibold text-[#5a9a8a] mb-1">Success!</h4>
                  <p className="text-[#6b9a7d] text-sm">
                    Your journey has been saved to the magical map.
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.06}>
              <div className="flex items-start gap-4 p-5 bg-[#e8a87c]/15 border border-[#e8a87c]/30 rounded-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-[#e8a87c] to-[#d49a6c] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(232,168,124,0.3)] text-white font-bold text-sm">
                  !
                </div>
                <div>
                  <h4 className="font-semibold text-[#c4886a] mb-1">Gentle Reminder</h4>
                  <p className="text-[#a88a6a] text-sm">
                    The forest path may be misty today. Take care on your adventure!
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.12}>
              <div className="flex items-start gap-4 p-5 bg-[#c38d94]/15 border border-[#c38d94]/30 rounded-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-[#c38d94] to-[#a87d84] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(195,141,148,0.3)] text-white font-bold text-sm">
                  &#10005;
                </div>
                <div>
                  <h4 className="font-semibold text-[#a87d84] mb-1">Oh no!</h4>
                  <p className="text-[#9a7a7a] text-sm">
                    Something went wrong. But do not worry — try again!
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div className="flex items-start gap-4 p-5 bg-[#85cdca]/15 border border-[#85cdca]/30 rounded-2xl">
                <div className="w-10 h-10 bg-gradient-to-br from-[#85cdca] to-[#6bb8b5] rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(133,205,202,0.3)] text-white font-bold text-sm">
                  &#8505;
                </div>
                <div>
                  <h4 className="font-semibold text-[#5a9a98] mb-1">Did you know?</h4>
                  <p className="text-[#6a9a98] text-sm">
                    New adventures await in the enchanted garden every sunrise!
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── COLOR PALETTE ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">
              Color Palette
            </h2>
            <p className="text-[#7a6a5a] text-lg">
              Warm earth, gentle sky, and watercolor washes
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {palette.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.06}>
                <div className="group rounded-2xl overflow-hidden border border-[#d4c49a]/30 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.09)] transition-all duration-500 ease-in-out cursor-pointer">
                  <div
                    className="h-20 md:h-28 flex items-end p-3 group-hover:scale-105 transition-transform duration-500 ease-in-out origin-bottom"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className={`text-xs font-mono font-semibold ${color.textColor} opacity-80`}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <div className="p-3 bg-white/60 backdrop-blur-sm">
                    <p className="font-semibold text-sm text-[#5a4a3a]">{color.name}</p>
                    <p className="text-xs text-[#7a6a5a]">{color.role}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient showcase */}
          <RevealBlock className="mt-8" delay={0.1}>
            <div className="p-6 rounded-3xl border border-[#d4c49a]/40 shadow-[0_8px_30px_rgba(90,74,58,0.06)] overflow-hidden">
              <p className="text-sm font-semibold text-[#7a6a5a] mb-4 uppercase tracking-widest">
                Signature Gradients
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className="h-20 rounded-2xl flex items-center justify-center shadow-inner"
                  style={{ background: "linear-gradient(180deg, #87ceeb 0%, #b4e4f5 50%, #f4e4bc 100%)" }}
                >
                  <span className="text-xs text-[#5a4a3a]/80 font-medium">Sky to Field</span>
                </div>
                <div
                  className="h-20 rounded-2xl flex items-center justify-center shadow-inner"
                  style={{ background: "linear-gradient(135deg, #7cb9a8 0%, #85cdca 50%, #f4e4bc 100%)" }}
                >
                  <span className="text-xs text-white/90 font-medium">Sage to Cream</span>
                </div>
                <div
                  className="h-20 rounded-2xl flex items-center justify-center shadow-inner"
                  style={{ background: "linear-gradient(135deg, #e8a87c 0%, #c38d94 50%, #85cdca 100%)" }}
                >
                  <span className="text-xs text-white/90 font-medium">Sunset Horizon</span>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── DESIGN RULES: DO / DON'T ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">
              Design Rules
            </h2>
            <p className="text-[#7a6a5a] text-lg">
              The Ghibli way of crafting visual harmony
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Do List */}
            <RevealBlock delay={0}>
              <div className="p-8 bg-gradient-to-br from-[#7cb9a8]/12 to-[#85cdca]/8 rounded-3xl border border-[#7cb9a8]/25 shadow-[0_8px_30px_rgba(124,185,168,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center shadow-[0_3px_8px_rgba(124,185,168,0.35)] text-white font-bold text-sm">
                    &#10003;
                  </div>
                  <h3 className="text-xl font-semibold text-[#5a4a3a]">Do This</h3>
                </div>
                <ul className="space-y-4">
                  {doList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 mt-0.5 rounded-full bg-[#7cb9a8]/20 border border-[#7cb9a8]/35 flex items-center justify-center flex-shrink-0 text-[#5a9a8a] text-xs font-bold">
                        &#10003;
                      </span>
                      <span className="text-[#5a4a3a] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't List */}
            <RevealBlock delay={0.1}>
              <div className="p-8 bg-gradient-to-br from-[#c38d94]/10 to-[#e8a87c]/6 rounded-3xl border border-[#c38d94]/20 shadow-[0_8px_30px_rgba(195,141,148,0.07)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#c38d94] to-[#a87d84] rounded-full flex items-center justify-center shadow-[0_3px_8px_rgba(195,141,148,0.35)] text-white font-bold text-sm">
                    &#10005;
                  </div>
                  <h3 className="text-xl font-semibold text-[#5a4a3a]">Avoid This</h3>
                </div>
                <ul className="space-y-4">
                  {dontList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 mt-0.5 rounded-full bg-[#c38d94]/15 border border-[#c38d94]/30 flex items-center justify-center flex-shrink-0 text-[#a87d84] text-xs font-bold">
                        &#10005;
                      </span>
                      <span className="text-[#7a6a5a] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── TYPOGRAPHY ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">
              Typography
            </h2>
            <p className="text-[#7a6a5a] text-lg">Whimsical, dreamy, and legible</p>
          </RevealBlock>

          <RevealBlock>
            <div className="p-10 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/80 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(90,74,58,0.06)]">
              {/* Heading scale */}
              <div className="space-y-8 divide-y divide-[#d4c49a]/30">
                <div className="pb-6">
                  <p className="text-xs font-mono text-[#a89a7a] mb-3 uppercase tracking-widest">
                    Display / Hero
                  </p>
                  <p className="text-6xl font-semibold text-[#5a4a3a] leading-none">
                    A World of Wonder
                  </p>
                </div>

                <div className="py-6">
                  <p className="text-xs font-mono text-[#a89a7a] mb-3 uppercase tracking-widest">
                    Heading 1
                  </p>
                  <p className="text-4xl font-semibold text-[#5a4a3a]">
                    The Forest Calls
                  </p>
                </div>

                <div className="py-6">
                  <p className="text-xs font-mono text-[#a89a7a] mb-3 uppercase tracking-widest">
                    Heading 2
                  </p>
                  <p className="text-2xl font-semibold text-[#5a4a3a]">
                    Sky Garden Stories
                  </p>
                </div>

                <div className="py-6">
                  <p className="text-xs font-mono text-[#a89a7a] mb-3 uppercase tracking-widest">
                    Body / Large
                  </p>
                  <p className="text-xl text-[#7a6a5a] leading-relaxed">
                    Where every journey begins with a single step into the magical unknown,
                    carried by the gentle winds of summer across golden meadows.
                  </p>
                </div>

                <div className="py-6">
                  <p className="text-xs font-mono text-[#a89a7a] mb-3 uppercase tracking-widest">
                    Body / Default
                  </p>
                  <p className="text-base text-[#7a6a5a] leading-relaxed">
                    The design philosophy of Ghibli Style embraces the warmth of hand-drawn
                    animation. Soft, organic shapes, warm earthy palettes, and gentle gradients
                    that mimic watercolor paintings create a sense of wonder in the ordinary.
                  </p>
                </div>

                <div className="py-6">
                  <p className="text-xs font-mono text-[#a89a7a] mb-3 uppercase tracking-widest">
                    Caption / Small
                  </p>
                  <p className="text-sm text-[#a89a7a] leading-relaxed">
                    Inspired by Studio Ghibli — a world where nature is sacred and every
                    moment tells a story of healing and wonder.
                  </p>
                </div>

                <div className="pt-6">
                  <p className="text-xs font-mono text-[#a89a7a] mb-4 uppercase tracking-widest">
                    Text Colors
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="text-[#5a4a3a] font-medium">Primary Text #5a4a3a</span>
                    <span className="text-[#7a6a5a]">Secondary Text #7a6a5a</span>
                    <span className="text-[#a89a7a]">Muted Text #a89a7a</span>
                    <span className="text-[#7cb9a8] font-medium">Accent Text #7cb9a8</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Tags & Badges */}
          <RevealBlock className="mt-8" delay={0.1}>
            <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/80 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(90,74,58,0.06)]">
              <p className="text-sm font-semibold text-[#7a6a5a] mb-6 uppercase tracking-widest">
                Tags and Badges
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { label: "Nature", bg: "bg-[#7cb9a8]/20", border: "border-[#7cb9a8]/30", text: "text-[#5a9a8a]" },
                  { label: "Sky", bg: "bg-[#85cdca]/20", border: "border-[#85cdca]/30", text: "text-[#5a9a98]" },
                  { label: "Warmth", bg: "bg-[#e8a87c]/20", border: "border-[#e8a87c]/30", text: "text-[#c4886a]" },
                  { label: "Magic", bg: "bg-[#c38d94]/20", border: "border-[#c38d94]/30", text: "text-[#a87d84]" },
                  { label: "Healing", bg: "bg-[#6b9a7d]/20", border: "border-[#6b9a7d]/30", text: "text-[#4a7a5d]" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className={`px-4 py-2 ${tag.bg} border ${tag.border} ${tag.text} text-sm rounded-full font-medium`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] text-white text-sm font-bold rounded-full shadow-[0_3px_10px_rgba(124,185,168,0.4)]">
                  3
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-gradient-to-br from-[#e8a87c] to-[#d49a6c] text-white text-sm font-bold rounded-full shadow-[0_3px_10px_rgba(232,168,124,0.4)]">
                  New
                </span>
                <span className="inline-flex items-center justify-center px-3 h-8 bg-gradient-to-br from-[#c38d94] to-[#a87d84] text-white text-sm font-bold rounded-full shadow-[0_3px_10px_rgba(195,141,148,0.4)]">
                  Popular
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-[#7cb9a8] text-[#7cb9a8] text-sm font-bold rounded-full">
                  99
                </span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── PHILOSOPHY SECTION ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">
              Design Philosophy
            </h2>
            <p className="text-[#7a6a5a] text-lg">The soul behind the style</p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "\u2726",
                color: "#7cb9a8",
                title: "Hand-drawn Warmth",
                desc: "Preserve the temperature and imperfection of hand-crafted work. Every stroke carries human intention and care.",
              },
              {
                icon: "\u2601",
                color: "#85cdca",
                title: "Natural Themes",
                desc: "Clouds, forests, and sky are not just decoration — they are the language of wonder and quiet reverence for nature.",
              },
              {
                icon: "\u273F",
                color: "#c38d94",
                title: "Dreamy Atmosphere",
                desc: "Create serene, healing visual experiences. The pace is gentle, the colors soft, the mood always quietly magical.",
              },
            ].map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.09}>
                <div className="group p-7 bg-white/40 backdrop-blur-sm rounded-3xl border border-[#d4c49a]/35 shadow-[0_6px_24px_rgba(90,74,58,0.05)] hover:-translate-y-1.5 hover:shadow-[0_14px_36px_rgba(90,74,58,0.1)] transition-all duration-700 ease-in-out text-center">
                  <div
                    className="w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 ease-in-out"
                    style={{ backgroundColor: card.color + "30", border: `2px solid ${card.color}50` }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#5a4a3a] mb-3 group-hover:text-[#7cb9a8] transition-colors duration-500">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#7a6a5a] leading-relaxed">{card.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AVATARS & MEDIA ─── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#5a4a3a] mb-3">
              Avatars
            </h2>
            <p className="text-[#7a6a5a] text-lg">Friendly faces and gentle presences</p>
          </RevealBlock>

          <RevealBlock>
            <div className="p-8 bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/80 rounded-3xl border border-[#d4c49a]/50 shadow-[0_8px_30px_rgba(90,74,58,0.06)]">
              <div className="flex flex-wrap items-end justify-center gap-8">
                <div className="text-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-[0_4px_10px_rgba(124,185,168,0.4)] mb-2">
                    C
                  </div>
                  <span className="text-xs text-[#7a6a5a]">Small</span>
                </div>

                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#85cdca] to-[#6bb8b5] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-[0_4px_12px_rgba(133,205,202,0.4)] mb-2">
                    SA
                  </div>
                  <span className="text-xs text-[#7a6a5a]">Medium</span>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#e8a87c] to-[#d49a6c] rounded-full flex items-center justify-center text-white font-semibold text-2xl shadow-[0_4px_15px_rgba(232,168,124,0.4)] mb-2">
                    T
                  </div>
                  <span className="text-xs text-[#7a6a5a]">Large</span>
                </div>

                <div className="text-center">
                  <div className="flex -space-x-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#7cb9a8] to-[#5a9a8a] rounded-full flex items-center justify-center text-white font-semibold border-2 border-[#f4e4bc] shadow-[0_4px_10px_rgba(124,185,168,0.3)]">
                      A
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#85cdca] to-[#6bb8b5] rounded-full flex items-center justify-center text-white font-semibold border-2 border-[#f4e4bc] shadow-[0_4px_10px_rgba(133,205,202,0.3)]">
                      B
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#c38d94] to-[#a87d84] rounded-full flex items-center justify-center text-white font-semibold border-2 border-[#f4e4bc] shadow-[0_4px_10px_rgba(195,141,148,0.3)]">
                      +3
                    </div>
                  </div>
                  <span className="text-xs text-[#7a6a5a]">Group</span>
                </div>

                <div className="text-center">
                  <div className="relative w-16 h-16 mb-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#6b9a7d] to-[#5a9a8a] rounded-full flex items-center justify-center text-white font-semibold text-xl shadow-[0_4px_14px_rgba(107,154,125,0.4)] border-2 border-[#f4e4bc]">
                      M
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#7cb9a8] rounded-full border-2 border-[#f4e4bc]" />
                  </div>
                  <span className="text-xs text-[#7a6a5a]">Online</span>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 py-16 px-6 bg-[#f4e4bc]/60 backdrop-blur-sm border-t border-[#d4c49a]/30">
        <div className="max-w-6xl mx-auto">
          {/* Footer top: brand + nav */}
          <RevealBlock className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                <CloudShape className="w-8 h-5 text-[#7cb9a8]" />
                <span className="text-xl font-semibold text-[#5a4a3a]">Ghibli Style</span>
              </div>
              <p className="text-[#7a6a5a] text-sm max-w-xs leading-relaxed">
                A design language inspired by the warmth, wonder, and watercolor worlds
                of Studio Ghibli animation.
              </p>
            </div>

            <div className="flex flex-wrap gap-10 text-sm">
              <div>
                <p className="font-semibold text-[#5a4a3a] mb-3">Explore</p>
                <ul className="space-y-2 text-[#7a6a5a]">
                  <li>
                    <Link href="/styles" className="hover:text-[#7cb9a8] transition-colors duration-300">
                      All Styles
                    </Link>
                  </li>
                  <li>
                    <Link href="/styles/ghibli-style" className="hover:text-[#7cb9a8] transition-colors duration-300">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-[#5a4a3a] mb-3">Design</p>
                <ul className="space-y-2 text-[#7a6a5a]">
                  <li className="hover:text-[#7cb9a8] transition-colors duration-300 cursor-pointer">
                    Colors
                  </li>
                  <li className="hover:text-[#7cb9a8] transition-colors duration-300 cursor-pointer">
                    Typography
                  </li>
                  <li className="hover:text-[#7cb9a8] transition-colors duration-300 cursor-pointer">
                    Components
                  </li>
                </ul>
              </div>
            </div>
          </RevealBlock>

          {/* Decorative cloud row */}
          <div className="flex justify-center gap-4 mb-8 opacity-30 pointer-events-none">
            <CloudShape className="w-16 h-8 text-[#7cb9a8]" />
            <CloudShape className="w-10 h-5 text-[#85cdca]" />
            <CloudShape className="w-20 h-10 text-[#e8a87c]" />
            <CloudShape className="w-12 h-6 text-[#c38d94]" />
            <CloudShape className="w-14 h-7 text-[#7cb9a8]" />
          </div>

          {/* Footer bottom */}
          <RevealBlock>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#d4c49a]/30">
              <p className="text-[#a89a7a] text-sm">
                Part of the{" "}
                <Link
                  href="/"
                  className="text-[#7cb9a8] hover:text-[#5a9a8a] transition-colors font-medium"
                >
                  StyleKit
                </Link>{" "}
                Design System Collection
              </p>
              <p className="text-[#b8a890] text-xs italic">
                Where magic meets everyday wonder
              </p>
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
