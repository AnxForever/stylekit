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

// ─── data ────────────────────────────────────────────────────────────────────

const doList = [
  "Hero 标题使用粗描边 -webkit-text-stroke: 3px #4ecdc4",
  "Hero 标题使用 3D 偏移阴影 text-shadow: 4px 4px 0 rgba(0,0,0,0.5)",
  "Hero 标题使用渐变填充 bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7]",
  "副标题使用青色发光 text-shadow: 0 0 20px rgba(78,205,196,0.8)",
  "使用超高模糊值 backdrop-blur-[40px] 或 backdrop-blur-3xl",
  "添加饱和度增强 backdrop-saturate-[1.8]",
  "使用彩虹渐变边框模拟光线折射效果",
  "使用超大圆角 rounded-3xl 或 rounded-[24px]",
  "使用流体动画 transition-all duration-500 ease-out",
];

const dontList = [
  "禁止使用普通白色标题（必须使用渐变+粗描边+3D阴影）",
  "禁止省略 3D 偏移阴影（4px 4px 是必须的）",
  "禁止使用细描边（Hero 必须 3px，h1/h2 至少 2px）",
  "禁止省略文字发光效果（缺少霓虹感）",
  "禁止使用低模糊值 backdrop-blur-sm（太弱）",
  "禁止省略饱和度增强（颜色会显得暗淡）",
  "禁止使用直角或小圆角（rounded-none, rounded-sm）",
  "禁止使用快速过渡（duration-100, duration-150）",
];

const blurLevels = [
  { label: "blur-[10px]", style: "backdrop-blur-[10px]", desc: "轻微模糊" },
  { label: "blur-[20px]", style: "backdrop-blur-[20px]", desc: "中等模糊" },
  { label: "blur-[40px]", style: "backdrop-blur-[40px]", desc: "标准玻璃" },
  { label: "blur-[80px]", style: "backdrop-blur-[80px]", desc: "深度玻璃" },
];

const opacityLevels = [
  { label: "bg-white/5", opacity: "5%", tailwind: "bg-white/5" },
  { label: "bg-white/10", opacity: "10%", tailwind: "bg-white/10" },
  { label: "bg-white/15", opacity: "15%", tailwind: "bg-white/15" },
  { label: "bg-white/20", opacity: "20%", tailwind: "bg-white/20" },
];

const palette = [
  { name: "Neon Pink", hex: "#ff2d92", rgb: "rgba(255,45,146,1)" },
  { name: "Neon Purple", hex: "#a855f7", rgb: "rgba(168,85,247,1)" },
  { name: "Neon Cyan", hex: "#4ecdc4", rgb: "rgba(78,205,196,1)" },
  { name: "Neon Yellow", hex: "#ffd93d", rgb: "rgba(255,217,61,1)" },
  { name: "Neon Green", hex: "#6bcb77", rgb: "rgba(107,203,119,1)" },
  { name: "Apple Blue", hex: "#007AFF", rgb: "rgba(0,122,255,1)" },
  { name: "Glass White", hex: "rgba(255,255,255,0.10)", rgb: "rgba(255,255,255,0.1)" },
  { name: "Apple Red", hex: "#FF2D55", rgb: "rgba(255,45,85,1)" },
];

// ─── component ────────────────────────────────────────────────────────────────

export default function LiquidGlassShowcase() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [toggleStates, setToggleStates] = useState([true, false, true, false]);
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const toggleSwitch = (i: number) => {
    setToggleStates((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] relative overflow-x-hidden">
      {/* ── Animated background blobs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "blobDrift1 18s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute top-[30%] right-[-15%] w-[50vw] h-[50vw] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #4ecdc4 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "blobDrift2 22s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #ff2d92 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "blobDrift3 26s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute top-[55%] left-[50%] w-[35vw] h-[35vw] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #ffd93d 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "blobDrift1 14s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      <style>{`
        @keyframes blobDrift1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(8vw, 6vh) scale(1.12); }
        }
        @keyframes blobDrift2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-6vw, 8vh) scale(1.08); }
        }
        @keyframes blobDrift3 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(5vw, -7vh) scale(1.15); }
        }
        @keyframes liquidMorph {
          0%,100% { border-radius: 24px; }
          25% { border-radius: 28px 20px 26px 22px; }
          50% { border-radius: 22px 26px 20px 28px; }
          75% { border-radius: 26px 22px 28px 20px; }
        }
        @keyframes rainbowPulse {
          0%,100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 20px rgba(168,85,247,0.3); }
          50% { box-shadow: 0 0 40px rgba(168,85,247,0.6); }
        }
        @keyframes shimmer {
          from { transform: translateX(-130%) skewX(-20deg); }
          to   { transform: translateX(130%)  skewX(-20deg); }
        }
        .liquid-morph { animation: liquidMorph 8s ease-in-out infinite; }
        .rainbow-pulse { animation: rainbowPulse 2.5s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
      `}</style>

      {/* ── 1. Fixed navigation bar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(40px) saturate(1.8)",
          WebkitBackdropFilter: "blur(40px) saturate(1.8)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "0 1px 0 0 rgba(255,255,255,0.1), inset 0 -1px 0 0 rgba(168,85,247,0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/liquid-glass"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-semibold text-sm">Back</span>
          </Link>

          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full rainbow-pulse"
              style={{
                background:
                  "linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4ecdc4, #a855f7)",
              }}
            />
            <span
              className="font-bold text-base text-white"
              style={{
                textShadow:
                  "0 0 15px rgba(78,205,196,0.7), 0 0 30px rgba(168,85,247,0.4)",
              }}
            >
              Liquid Glass
            </span>
          </div>

          <Link
            href="/styles"
            className="relative px-4 py-2 text-white text-sm font-medium rounded-[12px] hover:bg-white/15 transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(20px)",
            }}
          >
            <span
              className="absolute inset-0 rounded-[12px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, #ff6b6b, #4ecdc4, #a855f7)",
                padding: "1px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            All Styles
          </Link>
        </div>
      </nav>

      {/* ── 2. Hero section ── */}
      <section className="relative z-10 pt-28 pb-24 px-6 min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto w-full">
          {/* Badge */}
          <div
            className="flex justify-center mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/80"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#4ecdc4", boxShadow: "0 0 8px #4ecdc4" }}
              />
              Apple WWDC 2025 — New Design Language
            </div>
          </div>

          {/* Title */}
          <div
            className="text-center mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text"
              style={{
                WebkitTextStroke: "3px #4ecdc4",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "4px 4px 0 rgba(0,0,0,0.5), 0 0 30px rgba(78,205,196,0.6), 0 0 60px rgba(168,85,247,0.4)",
                filter: "drop-shadow(0 0 15px rgba(78,205,196,0.5))",
              }}
            >
              Liquid Glass
            </h1>
            <h2
              className="mt-4 text-2xl md:text-3xl font-bold text-white"
              style={{
                textShadow:
                  "0 0 25px rgba(78,205,196,0.9), 0 0 50px rgba(78,205,196,0.5), 3px 3px 0 rgba(0,0,0,0.4)",
              }}
            >
              流动光线折射 · 多层深度堆叠 · 液态形变动画
            </h2>
          </div>

          {/* Description glass panel */}
          <div
            className="max-w-2xl mx-auto mb-12"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s",
            }}
          >
            <div
              className="relative p-6 rounded-[24px] text-center"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(40px) saturate(1.8)",
                WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <p className="text-white/80 text-lg leading-relaxed">
                超越传统毛玻璃效果，通过光线折射、彩虹边缘和流体动画创造出真正有机、
                流动的视觉体验。多层玻璃堆叠产生丰富的空间层次感。
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap justify-center gap-4 mb-20"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            <button
              className="group relative px-8 py-4 rounded-full text-white font-bold overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background:
                  "linear-gradient(135deg, #ff2d92, #a855f7)",
                boxShadow: "0 8px 32px rgba(255,45,146,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 40px rgba(255,45,146,0.6), 0 12px 40px rgba(168,85,247,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 8px 32px rgba(255,45,146,0.3)";
              }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"
              />
              <span className="relative flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore the Style
              </span>
            </button>
            <button
              className="group px-8 py-4 rounded-full text-white font-semibold transition-all duration-500 hover:bg-white/15 hover:scale-[1.02] active:scale-[0.97]"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </span>
            </button>
          </div>

          {/* Hero feature cards */}
          <div
            className="grid md:grid-cols-3 gap-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s",
            }}
          >
            {[
              {
                icon: (
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                ),
                gradient: "linear-gradient(135deg, #a855f7, #ff2d92)",
                glow: "rgba(168,85,247,0.4)",
                title: "彩虹折射",
                desc: "棱镜边缘光谱渐变，模拟真实光线折射",
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                gradient: "linear-gradient(135deg, #4ecdc4, #6bcb77)",
                glow: "rgba(78,205,196,0.4)",
                title: "多层深度",
                desc: "3+ 层玻璃堆叠产生丰富的空间层次感",
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                gradient: "linear-gradient(135deg, #ff2d92, #ff6b35)",
                glow: "rgba(255,45,146,0.4)",
                title: "液态形变",
                desc: "border-radius 随交互产生有机液态动画",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="relative group p-6 rounded-[24px] overflow-hidden hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-default"
                style={{ boxShadow: `0 8px 32px ${card.glow}` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${card.glow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${card.glow}`;
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: card.gradient }}
                />
                <div
                  className="absolute inset-[3px] rounded-[21px]"
                  style={{ background: card.gradient, opacity: 0.9 }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out"
                />
                <div className="relative z-10 flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 bg-white/20 rounded-[14px] flex items-center justify-center">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Component demos ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text mb-4"
              style={{
                WebkitTextStroke: "2px #4ecdc4",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78,205,196,0.5)",
                filter: "drop-shadow(0 0 8px rgba(78,205,196,0.3))",
              }}
            >
              Component Library
            </h2>
            <p className="text-white/60 text-lg">
              Glass buttons, cards, and inputs — the core building blocks
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ── Buttons panel ── */}
            <RevealBlock delay={0.05}>
              <div
                className="relative p-8 rounded-[28px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(40px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-6">
                  Buttons
                </p>
                <div className="space-y-4">
                  {/* Primary liquid button */}
                  <button
                    className="group relative w-full px-6 py-3.5 rounded-[20px] text-white font-bold overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-[0.97]"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff2d92, #a855f7)",
                      boxShadow:
                        "0 8px 24px rgba(168,85,247,0.3), inset 0 1px 0 rgba(255,255,255,0.25)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 0 35px rgba(255,45,146,0.6), 0 12px 40px rgba(168,85,247,0.4), inset 0 1px 0 rgba(255,255,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 8px 24px rgba(168,85,247,0.3), inset 0 1px 0 rgba(255,255,255,0.25)";
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"
                    />
                    <span className="relative">Liquid Primary</span>
                  </button>

                  {/* Glass secondary button */}
                  <button
                    className="group relative w-full px-6 py-3.5 rounded-[20px] text-white font-semibold overflow-hidden transition-all duration-500 hover:bg-white/15 hover:scale-[1.01] active:scale-[0.97]"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      backdropFilter: "blur(40px)",
                      border: "1px solid rgba(255,255,255,0.20)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
                    }}
                  >
                    <span className="relative">Glass Secondary</span>
                  </button>

                  {/* Rainbow outline button */}
                  <button
                    className="group relative w-full px-6 py-3.5 rounded-[20px] text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-[1.01] active:scale-[0.97]"
                    style={{ background: "transparent" }}
                  >
                    <span
                      className="absolute inset-0 rounded-[20px]"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4ecdc4, #a855f7)",
                        padding: "1.5px",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                    <span className="relative bg-gradient-to-r from-[#ff6b6b] via-[#4ecdc4] to-[#a855f7] bg-clip-text text-transparent font-bold">
                      Rainbow Outline
                    </span>
                  </button>

                  {/* Small variants row */}
                  <div className="flex gap-3 pt-2">
                    {["Small", "Warning", "Success"].map((label, i) => {
                      const grads = [
                        "linear-gradient(135deg, #ff6b35, #ffd93d)",
                        "linear-gradient(135deg, #ff6b35, #ffd93d)",
                        "linear-gradient(135deg, #4ecdc4, #6bcb77)",
                      ];
                      const glows = [
                        "rgba(168,85,247,0.5)",
                        "rgba(255,107,53,0.5)",
                        "rgba(78,205,196,0.5)",
                      ];
                      const bg =
                        i === 0
                          ? "linear-gradient(135deg, #a855f7, #ff2d92)"
                          : grads[i];
                      return (
                        <button
                          key={label}
                          className="flex-1 px-4 py-2 rounded-full text-white text-sm font-semibold transition-all duration-500 hover:scale-[1.05] active:scale-[0.95]"
                          style={{
                            background: bg,
                            boxShadow: `0 4px 16px ${glows[i]}`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 24px ${glows[i]}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 16px ${glows[i]}`;
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ── Input panel ── */}
            <RevealBlock delay={0.1}>
              <div
                className="relative p-8 rounded-[28px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(40px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-6">
                  Form Inputs
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3.5 rounded-[16px] text-white placeholder-white/40 outline-none transition-all duration-500"
                      style={{
                        background: "rgba(255,255,255,0.10)",
                        backdropFilter: "blur(40px) saturate(1.8)",
                        border: "1px solid rgba(255,255,255,0.20)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.15)";
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(168,85,247,0.5), 0 0 20px rgba(168,85,247,0.2)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.10)";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.20)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 rounded-[16px] text-white placeholder-white/40 outline-none transition-all duration-500"
                      style={{
                        background: "rgba(255,255,255,0.10)",
                        backdropFilter: "blur(40px) saturate(1.8)",
                        border: "1px solid rgba(255,255,255,0.20)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.15)";
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(78,205,196,0.5), 0 0 20px rgba(78,205,196,0.2)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.10)";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.20)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2 font-medium">
                      Message
                    </label>
                    <textarea
                      placeholder="Your message..."
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-[16px] text-white placeholder-white/40 outline-none transition-all duration-500 resize-none"
                      style={{
                        background: "rgba(255,255,255,0.10)",
                        backdropFilter: "blur(40px) saturate(1.8)",
                        border: "1px solid rgba(255,255,255,0.20)",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.15)";
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 2px rgba(255,45,146,0.5), 0 0 20px rgba(255,45,146,0.2)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.10)";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.20)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <button
                    className="group relative w-full px-6 py-3 rounded-[16px] text-white font-semibold overflow-hidden transition-all duration-500 hover:scale-[1.01] active:scale-[0.98]"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-[16px]"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff6b6b, #4ecdc4, #a855f7)",
                        padding: "1px",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                    <span className="relative">Send Message</span>
                  </button>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* ── Glass Card demos ── */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Multi-Layer Card",
                desc: "3+ layer glass stacking creates depth and dimension beyond simple blur",
                grad: "linear-gradient(135deg, #a855f7, #ff2d92)",
                glow: "rgba(168,85,247,0.35)",
              },
              {
                title: "Refraction Card",
                desc: "Rainbow edges simulate prismatic light refraction on glass surfaces",
                grad: "linear-gradient(135deg, #4ecdc4, #6bcb77)",
                glow: "rgba(78,205,196,0.35)",
              },
              {
                title: "Fluid Motion Card",
                desc: "Smooth 500ms+ transitions create organic liquid movement on hover",
                grad: "linear-gradient(135deg, #ff2d92, #ff6b35)",
                glow: "rgba(255,45,146,0.35)",
              },
            ].map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.08}>
                <div
                  className="group relative p-6 rounded-[24px] overflow-hidden cursor-default transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:scale-[1.01]"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(40px) saturate(1.8)",
                    WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), 0 12px 30px rgba(0,0,0,0.25)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.4), 0 28px 64px rgba(0,0,0,0.35), 0 0 40px ${card.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.3), 0 12px 30px rgba(0,0,0,0.25)`;
                  }}
                >
                  {/* rainbow border via ::before emulated with absolute div */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: card.grad,
                      padding: "1px",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />
                  {/* inner glow blob */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-1/2 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle, ${card.glow} 0%, transparent 60%)`,
                      filter: "blur(60px)",
                    }}
                  />
                  {/* shimmer */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  />
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-4"
                      style={{ background: card.grad }}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 3l14 9-14 9V3z"
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-lg font-bold text-white mb-2"
                      style={{
                        textShadow:
                          "0 0 12px rgba(78,205,196,0.4), 2px 2px 0 rgba(0,0,0,0.3)",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Glass effects showcase ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text mb-4"
              style={{
                WebkitTextStroke: "2px #4ecdc4",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78,205,196,0.5)",
              }}
            >
              Glass Effects
            </h2>
            <p className="text-white/60 text-lg">
              Blur levels, opacity layers, and multi-depth stacking
            </p>
          </RevealBlock>

          {/* Blur levels */}
          <RevealBlock className="mb-12">
            <div
              className="relative p-8 rounded-[28px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(40px) saturate(1.8)",
                WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">
                Blur Intensity
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {blurLevels.map((lvl) => (
                  <div
                    key={lvl.label}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className="w-full h-24 rounded-[16px] flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.10)",
                        backdropFilter: `blur(${lvl.style.replace("backdrop-blur-", "").replace("[", "").replace("]", "")}) saturate(1.8)`,
                        border: "1px solid rgba(255,255,255,0.20)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
                      }}
                    >
                      <span className="text-white/80 text-xs font-mono">
                        {lvl.desc}
                      </span>
                    </div>
                    <span className="text-white/50 text-xs font-mono">
                      {lvl.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Opacity levels */}
          <RevealBlock delay={0.08} className="mb-12">
            <div
              className="relative p-8 rounded-[28px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(40px) saturate(1.8)",
                WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">
                Opacity Layers
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {opacityLevels.map((lvl) => (
                  <div
                    key={lvl.label}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className="w-full h-20 rounded-[16px] flex items-center justify-center"
                      style={{
                        background: `rgba(255,255,255,${parseInt(lvl.opacity) / 100})`,
                        backdropFilter: "blur(40px) saturate(1.8)",
                        border: "1px solid rgba(255,255,255,0.20)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
                      }}
                    >
                      <span className="text-white/80 text-xs font-mono">
                        {lvl.opacity}
                      </span>
                    </div>
                    <span className="text-white/50 text-xs font-mono">
                      {lvl.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Glass stack visual */}
          <RevealBlock delay={0.14}>
            <div
              className="relative p-8 rounded-[28px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(40px) saturate(1.8)",
                WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">
                Multi-Layer Stack
              </p>
              <div className="flex justify-center">
                <div className="relative h-56 w-72">
                  {/* Layer 3 – back */}
                  <div
                    className="absolute inset-0 rounded-[24px] translate-y-8 -rotate-3"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(40px) saturate(1.8)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  />
                  {/* Layer 2 – mid */}
                  <div
                    className="absolute inset-0 rounded-[24px] translate-y-4 rotate-1"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(40px) saturate(1.8)",
                      border: "1px solid rgba(255,255,255,0.13)",
                    }}
                  />
                  {/* Layer 1 – front */}
                  <div
                    className="absolute inset-0 rounded-[24px] p-6 flex flex-col justify-end"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(40px) saturate(1.8)",
                      border: "1px solid rgba(255,255,255,0.20)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-[24px]"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff6b6b, #4ecdc4, #a855f7)",
                        padding: "1px",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                    <h3
                      className="text-white font-semibold text-base"
                      style={{
                        textShadow:
                          "0 0 10px rgba(78,205,196,0.5), 2px 2px 0 rgba(0,0,0,0.3)",
                      }}
                    >
                      Front Layer
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      bg-white/12 — richest depth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 5. Design rules (do/don't) ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text mb-4"
              style={{
                WebkitTextStroke: "2px #4ecdc4",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78,205,196,0.5)",
              }}
            >
              Design Rules
            </h2>
            <p className="text-white/60 text-lg">
              The principles that define authentic Liquid Glass
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Do list */}
            <RevealBlock delay={0.05}>
              <div
                className="relative p-8 rounded-[28px]"
                style={{
                  background: "rgba(78,205,196,0.06)",
                  backdropFilter: "blur(40px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                  border: "1px solid rgba(78,205,196,0.25)",
                  boxShadow: "inset 0 1px 0 rgba(78,205,196,0.15)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(78,205,196,0.2)",
                      border: "1px solid rgba(78,205,196,0.4)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="#4ecdc4"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "#4ecdc4", textShadow: "0 0 12px rgba(78,205,196,0.5)" }}
                  >
                    Do
                  </h3>
                </div>
                <ul className="space-y-3">
                  {doList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="#4ecdc4"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-white/80 text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't list */}
            <RevealBlock delay={0.1}>
              <div
                className="relative p-8 rounded-[28px]"
                style={{
                  background: "rgba(255,45,146,0.06)",
                  backdropFilter: "blur(40px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                  border: "1px solid rgba(255,45,146,0.25)",
                  boxShadow: "inset 0 1px 0 rgba(255,45,146,0.15)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(255,45,146,0.2)",
                      border: "1px solid rgba(255,45,146,0.4)",
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="#ff2d92"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "#ff2d92", textShadow: "0 0 12px rgba(255,45,146,0.5)" }}
                  >
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-3">
                  {dontList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="#ff2d92"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-white/80 text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Interactive tab demo */}
          <RevealBlock delay={0.15} className="mt-10">
            <div
              className="relative p-8 rounded-[28px]"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(40px) saturate(1.8)",
                WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">
                Interactive Tabs
              </p>
              <div
                className="flex gap-2 p-1 rounded-[16px] mb-6"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {["Overview", "Features", "Tokens"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(i)}
                    className="flex-1 py-2.5 rounded-[12px] text-sm font-medium transition-all duration-500"
                    style={{
                      background:
                        selectedTab === i
                          ? "rgba(255,255,255,0.15)"
                          : "transparent",
                      color:
                        selectedTab === i
                          ? "white"
                          : "rgba(255,255,255,0.5)",
                      boxShadow:
                        selectedTab === i
                          ? "0 0 15px rgba(168,85,247,0.35)"
                          : "none",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-white/70 text-sm leading-relaxed min-h-[3rem]">
                {selectedTab === 0 && (
                  <p>
                    Liquid Glass combines backdrop blur, rainbow gradient borders, and
                    multi-layer stacking to produce an organic, fluid visual experience
                    inspired by Apple&apos;s WWDC 2025 design language.
                  </p>
                )}
                {selectedTab === 1 && (
                  <p>
                    Key features: prismatic edge refraction, neon text strokes, 3D offset
                    shadows, saturate-1.8 color enhancement, and fluid morph animations with
                    duration-500+ transitions.
                  </p>
                )}
                {selectedTab === 2 && (
                  <p>
                    Core tokens: blur(40px), saturate(1.8), rgba(255,255,255,0.10) base,
                    rgba(255,255,255,0.15) hover, border rgba(255,255,255,0.20), and
                    cubic-bezier(0.25,1,0.5,1) easing.
                  </p>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 6. Color / transparency palette ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text mb-4"
              style={{
                WebkitTextStroke: "2px #4ecdc4",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78,205,196,0.5)",
              }}
            >
              Color Palette
            </h2>
            <p className="text-white/60 text-lg">
              Rainbow spectrum for prismatic edges and neon accents
            </p>
          </RevealBlock>

          {/* Palette swatches */}
          <RevealBlock>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {palette.map((color) => (
                <div
                  key={color.name}
                  className="group relative rounded-[20px] overflow-hidden cursor-default transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <div
                    className="w-full h-24"
                    style={{ background: color.hex }}
                  />
                  <div className="p-3">
                    <p className="text-white text-sm font-semibold truncate">
                      {color.name}
                    </p>
                    <p className="text-white/50 text-xs font-mono mt-0.5 truncate">
                      {color.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Rainbow gradient bar */}
          <RevealBlock delay={0.08}>
            <div
              className="relative p-8 rounded-[28px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(40px) saturate(1.8)",
                WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">
                Rainbow Refraction Gradient
              </p>
              <div
                className="w-full h-10 rounded-full mb-4"
                style={{
                  background:
                    "linear-gradient(to right, #ff6b6b, #ffd93d, #6bcb77, #4ecdc4, #007AFF, #a855f7, #ff2d92)",
                }}
              />
              <p className="text-white/50 text-xs font-mono">
                from-[#ff6b6b] via-[#ffd93d] via-[#6bcb77] via-[#4ecdc4] via-[#007AFF] via-[#a855f7] to-[#ff2d92]
              </p>
            </div>
          </RevealBlock>

          {/* Typography showcase */}
          <RevealBlock delay={0.14} className="mt-8">
            <div
              className="relative p-8 rounded-[28px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(40px) saturate(1.8)",
                WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <p className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-8">
                Neon Typography
              </p>
              {/* H1 style */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <p className="text-xs text-white/40 mb-3 font-mono">H1 — 3px stroke + 3D shadow + gradient fill</p>
                <h1
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text"
                  style={{
                    WebkitTextStroke: "3px #4ecdc4",
                    WebkitTextFillColor: "transparent",
                    textShadow:
                      "4px 4px 0 rgba(0,0,0,0.5), 0 0 25px rgba(78,205,196,0.6), 0 0 50px rgba(168,85,247,0.4)",
                    filter: "drop-shadow(0 0 12px rgba(78,205,196,0.4))",
                  }}
                >
                  Hero Heading
                </h1>
              </div>
              {/* H2 style */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <p className="text-xs text-white/40 mb-3 font-mono">H2 — 2px stroke + glow</p>
                <h2
                  className="text-3xl font-bold bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text"
                  style={{
                    WebkitTextStroke: "2px #4ecdc4",
                    WebkitTextFillColor: "transparent",
                    textShadow:
                      "3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78,205,196,0.5)",
                    filter: "drop-shadow(0 0 8px rgba(78,205,196,0.3))",
                  }}
                >
                  Section Heading
                </h2>
              </div>
              {/* Subtitle style */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <p className="text-xs text-white/40 mb-3 font-mono">Subtitle — cyan glow, no stroke</p>
                <h3
                  className="text-2xl font-bold text-white"
                  style={{
                    textShadow:
                      "0 0 25px rgba(78,205,196,0.9), 0 0 50px rgba(78,205,196,0.5), 3px 3px 0 rgba(0,0,0,0.4)",
                  }}
                >
                  Cyan Glow Subtitle
                </h3>
              </div>
              {/* Body text */}
              <div>
                <p className="text-xs text-white/40 mb-3 font-mono">Body — high contrast white</p>
                <p className="text-white/90 text-lg leading-relaxed">
                  Primary body text maintains high contrast against dark glass backgrounds.
                </p>
                <p className="text-white/70 text-base mt-2 leading-relaxed">
                  Secondary text at 70% opacity for supporting information.
                </p>
                <p className="text-white/50 text-sm mt-2">
                  Tertiary text at 50% for metadata and timestamps.
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Extra: Control Center interactive demo ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a855f7] via-[#ff2d92] to-[#a855f7] bg-clip-text mb-4"
              style={{
                WebkitTextStroke: "2px #4ecdc4",
                WebkitTextFillColor: "transparent",
                textShadow:
                  "3px 3px 0 rgba(0,0,0,0.4), 0 0 15px rgba(78,205,196,0.5)",
              }}
            >
              Control Center
            </h2>
            <p className="text-white/60 text-lg">
              iOS-style glass control tiles — click to toggle
            </p>
          </RevealBlock>

          <RevealBlock>
            <div className="max-w-sm mx-auto">
              <div
                className="relative p-4 rounded-[28px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(40px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(40px) saturate(1.8)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      { label: "Wi-Fi", icon: "wifi" },
                      { label: "Bluetooth", icon: "bluetooth" },
                      { label: "Focus", icon: "moon" },
                      { label: "Sound", icon: "volume" },
                    ] as { label: string; icon: string }[]
                  ).map((item, i) => (
                    <button
                      key={item.label}
                      onClick={() => toggleSwitch(i)}
                      className="aspect-square flex flex-col items-center justify-center gap-2 rounded-[20px] transition-all duration-500"
                      style={{
                        background: toggleStates[i]
                          ? "rgba(0,122,255,0.35)"
                          : "rgba(255,255,255,0.08)",
                        boxShadow: toggleStates[i]
                          ? "0 0 20px rgba(0,122,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                          : "none",
                        border: toggleStates[i]
                          ? "1px solid rgba(0,122,255,0.4)"
                          : "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      {item.icon === "wifi" && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                      )}
                      {item.icon === "bluetooth" && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l8-8v16l-8-8zm0 0l4 4m-4-4l4-4" />
                        </svg>
                      )}
                      {item.icon === "moon" && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      )}
                      {item.icon === "volume" && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072M8 9H4a1 1 0 00-1 1v4a1 1 0 001 1h4l5 5V4L8 9z" />
                        </svg>
                      )}
                      <span className="text-white text-xs font-medium">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Volume slider */}
                <div
                  className="mt-3 p-3 rounded-[16px]"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M8 9H4a1 1 0 00-1 1v4a1 1 0 001 1h4l5 5V4L8 9z" />
                    </svg>
                    <div className="flex-1 h-2 rounded-full relative" style={{ background: "rgba(255,255,255,0.10)" }}>
                      <div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{
                          width: "65%",
                          background: "linear-gradient(to right, #007AFF, #5AC8FA)",
                        }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg"
                        style={{ left: "calc(65% - 8px)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Alerts row */}
          <RevealBlock delay={0.1} className="mt-10 max-w-lg mx-auto space-y-4">
            {[
              {
                color: "#34C759",
                bg: "rgba(52,199,89,0.08)",
                label: "Success",
                msg: "Changes saved successfully.",
              },
              {
                color: "#FF9500",
                bg: "rgba(255,149,0,0.08)",
                label: "Warning",
                msg: "Review settings before continuing.",
              },
              {
                color: "#FF2D55",
                bg: "rgba(255,45,85,0.08)",
                label: "Error",
                msg: "Something went wrong. Please retry.",
              },
            ].map((alert) => (
              <div
                key={alert.label}
                className="relative p-4 rounded-[16px] flex items-start gap-3"
                style={{
                  background: alert.bg,
                  backdropFilter: "blur(40px) saturate(1.8)",
                  border: `1px solid ${alert.color}40`,
                  boxShadow: `inset 0 1px 0 ${alert.color}25`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${alert.color}30` }}
                >
                  {alert.label === "Success" && (
                    <svg className="w-4 h-4" fill="none" stroke={alert.color} strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {alert.label === "Warning" && (
                    <svg className="w-4 h-4" fill="none" stroke={alert.color} strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                  )}
                  {alert.label === "Error" && (
                    <svg className="w-4 h-4" fill="none" stroke={alert.color} strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{alert.label}</p>
                  <p className="text-white/70 text-sm">{alert.msg}</p>
                </div>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ── 7. Footer ── */}
      <footer
        className="relative z-10 px-6 py-12"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(40px) saturate(1.8)",
          WebkitBackdropFilter: "blur(40px) saturate(1.8)",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "0 -1px 0 rgba(255,255,255,0.08), inset 0 1px 0 rgba(168,85,247,0.15)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-[10px] rainbow-pulse"
                style={{
                  background:
                    "linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4ecdc4, #a855f7)",
                }}
              />
              <div>
                <div
                  className="text-xl font-bold text-white"
                  style={{
                    textShadow:
                      "0 0 15px rgba(78,205,196,0.6), 0 0 30px rgba(168,85,247,0.3)",
                  }}
                >
                  Liquid Glass
                </div>
                <div className="text-white/50 text-xs">
                  Apple WWDC 2025 Design Language
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {[
                { label: "Documentation", href: "/styles/liquid-glass" },
                { label: "Components", href: "/styles/liquid-glass" },
                { label: "All Styles", href: "/styles" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Rainbow separator */}
          <div
            className="w-full h-px mb-8"
            style={{
              background:
                "linear-gradient(to right, transparent, #ff6b6b, #ffd93d, #6bcb77, #4ecdc4, #a855f7, transparent)",
              opacity: 0.4,
            }}
          />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs">
            <span>Liquid Glass Design System — StyleKit</span>
            <span className="font-mono">
              backdrop-blur-[40px] backdrop-saturate-[1.8]
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
