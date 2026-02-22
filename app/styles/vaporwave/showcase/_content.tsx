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

const COLORS = [
  { name: "Neon Pink", hex: "#ff71ce", label: "ピンク", glow: "rgba(255,113,206,0.6)" },
  { name: "Electric Cyan", hex: "#01cdfe", label: "シアン", glow: "rgba(1,205,254,0.6)" },
  { name: "Acid Purple", hex: "#b967ff", label: "パープル", glow: "rgba(185,103,255,0.6)" },
  { name: "Mint Green", hex: "#05ffa1", label: "ミント", glow: "rgba(5,255,161,0.6)" },
  { name: "Lemon Yellow", hex: "#fffb96", label: "イエロー", glow: "rgba(255,251,150,0.5)" },
  { name: "Hot Coral", hex: "#ff6b9d", label: "コーラル", glow: "rgba(255,107,157,0.6)" },
  { name: "Deep Violet", hex: "#2b0057", label: "バイオレット", glow: "rgba(43,0,87,0.8)" },
  { name: "Twilight Blue", hex: "#1a0533", label: "トワイライト", glow: "rgba(26,5,51,0.9)" },
];

const DO_LIST = [
  "使用粉紫青渐变 from-pink-500 via-purple-500 to-cyan-500",
  "添加霓虹发光效果 shadow neon dual-color pink + cyan",
  "使用故障/扫描线效果作为装饰层",
  "融入日文文字或全角 ＡＥＳＴＨＥＴＩＣ 元素",
  "使用网格线背景营造复古透视感",
  "hover 引入迷幻扭曲：旋转、位移与渐变流动",
  "霓虹光晕强调粉+青双色散射，形成重影效果",
];

const DONT_LIST = [
  "禁止使用单调的灰色或黑白配色",
  "禁止使用过于现代简约的设计风格",
  "禁止省略霓虹发光效果",
  "禁止使用过于正式的衬线字体",
  "禁止仅用单色 glow，必须体现粉青双色发光重影",
  "禁止所有交互都过快，hover 需保留漂浮式慢节奏",
];

const TRACKS = [
  { title: "Macintosh Plus", artist: "Floral Shoppe", duration: "4:23", jp: "フローラル" },
  { title: "Saint Pepsi", artist: "Hit Vibes", duration: "3:47", jp: "ヒットバイブス" },
  { title: "Blank Banshee", artist: "BLANK", duration: "5:12", jp: "ブランク" },
  { title: "猫 シ Corp", artist: "Palm Mall", duration: "6:01", jp: "パームモール" },
];

export default function VaporwaveShowcase() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVariant, setActiveVariant] = useState<"vaporwave" | "synthwave" | "cyberpunk">("vaporwave");
  const [glitchActive, setGlitchActive] = useState(false);
  const [progress, setProgress] = useState(42);

  const { ref: heroRef, inView: heroInView } = useInView();

  const handleGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 600);
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #1a0533 0%, #2b0057 30%, #3d0070 60%, #1a0533 100%)" }}
    >
      {/* Global keyframes + CRT scanline overlay */}
      <style>{`
        @keyframes vaporGlitch {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-4px); }
          40%  { transform: translateX(4px); }
          60%  { transform: translateX(-2px); }
          80%  { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        @keyframes vaporFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes vaporPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes vaporSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes scanlines {
          0%   { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.6; }
        }
        .vapor-glitch { animation: vaporGlitch 0.6s steps(4) both; }
        .vapor-float  { animation: vaporFloat 4s ease-in-out infinite; }
        .neon-flicker { animation: neonFlicker 3s infinite; }
        .hover-glitch:hover { animation: vaporGlitch 0.4s steps(4) both; }
      `}</style>

      {/* Fixed retro perspective grid floor */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,113,206,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(1,205,254,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow center */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 10%, rgba(185,103,255,0.18) 0%, transparent 70%)",
        }}
      />

      {/* CRT scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      {/* ── SECTION 1: Navigation ───────────────────────────────────────────── */}
      <nav
        className="relative z-30 px-6 py-4 border-b backdrop-blur-md"
        style={{
          borderColor: "rgba(255,113,206,0.25)",
          background: "rgba(26,5,51,0.75)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Back link */}
          <Link
            href="/styles/vaporwave"
            className="group flex items-center gap-2 transition-all duration-300"
            style={{ color: "#ff71ce" }}
          >
            <span
              className="text-lg group-hover:-translate-x-1 transition-transform duration-300 inline-block"
              style={{ textShadow: "0 0 8px #ff71ce" }}
            >
              ←
            </span>
            <span className="text-sm tracking-widest uppercase">Back to Docs</span>
          </Link>

          {/* Center brand */}
          <div className="flex flex-col items-center">
            <span
              className="text-xs tracking-[0.4em] uppercase neon-flicker"
              style={{ color: "rgba(255,113,206,0.5)" }}
            >
              現在地
            </span>
            <span
              className="font-black text-lg tracking-[0.3em]"
              style={{
                background: "linear-gradient(90deg, #ff71ce, #b967ff, #01cdfe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
              }}
            >
              ＶＡＰＯＲＷＡＶＥ
            </span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-3">
            {(["vaporwave", "synthwave", "cyberpunk"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveVariant(v)}
                className="px-3 py-1.5 text-xs tracking-widest uppercase transition-all duration-300"
                style={{
                  border: `1px solid ${activeVariant === v ? "#ff71ce" : "rgba(255,113,206,0.2)"}`,
                  color: activeVariant === v ? "#ff71ce" : "rgba(255,113,206,0.5)",
                  boxShadow: activeVariant === v ? "0 0 12px rgba(255,113,206,0.4), inset 0 0 8px rgba(255,113,206,0.1)" : "none",
                  background: activeVariant === v ? "rgba(255,113,206,0.08)" : "transparent",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── SECTION 2: Hero with synthwave sun + retro grid ─────────────────── */}
      <section className="relative z-10 pt-20 pb-16 px-6 overflow-hidden">
        {/* Perspective grid floor */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(255,113,206,0.3) 0px, transparent 1px, transparent 80px),
              repeating-linear-gradient(0deg, rgba(1,205,254,0.3) 0px, transparent 1px, transparent 40px)
            `,
            transform: "perspective(300px) rotateX(45deg)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Synthwave sun */}
        <div className="absolute left-1/2 bottom-24 -translate-x-1/2 pointer-events-none">
          <div
            className="w-64 h-32 mx-auto"
            style={{
              background: "linear-gradient(to bottom, #ff6ec7, #ff4fa3, #b967ff, #6600cc)",
              borderRadius: "128px 128px 0 0",
              boxShadow: "0 0 60px rgba(255,110,199,0.6), 0 0 120px rgba(185,103,255,0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Sun scanlines */}
            {[0.2, 0.35, 0.5, 0.65, 0.75, 0.83, 0.89, 0.94].map((pos, i) => (
              <div
                key={i}
                className="absolute left-0 right-0"
                style={{
                  top: `${pos * 100}%`,
                  height: i < 3 ? "6px" : "4px",
                  background: "rgba(26,5,51,0.7)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Decorative floating Japanese text */}
        <div
          className="absolute top-8 left-8 opacity-20 pointer-events-none vapor-float text-4xl font-black"
          style={{ color: "#ff71ce", animationDelay: "0s" }}
        >
          美
        </div>
        <div
          className="absolute top-16 right-12 opacity-15 pointer-events-none vapor-float text-5xl font-black"
          style={{ color: "#01cdfe", animationDelay: "1.5s" }}
        >
          夢
        </div>
        <div
          className="absolute bottom-32 left-16 opacity-15 pointer-events-none vapor-float text-3xl font-black"
          style={{ color: "#b967ff", animationDelay: "2.5s" }}
        >
          永
        </div>

        {/* Hero content */}
        <div
          ref={heroRef}
          className="max-w-5xl mx-auto text-center relative z-10"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p
            className="text-xs tracking-[0.8em] uppercase mb-6"
            style={{ color: "rgba(255,113,206,0.6)", textShadow: "0 0 10px rgba(255,113,206,0.4)" }}
          >
            ア エ ス テ テ ィ ッ ク ・ ド リ ー ム
          </p>

          {/* Glitch title stack */}
          <div
            className={`relative mb-3 cursor-pointer select-none ${glitchActive ? "vapor-glitch" : ""}`}
            onClick={handleGlitch}
          >
            <h1
              className="text-7xl md:text-9xl font-black tracking-widest leading-none"
              style={{
                background: "linear-gradient(135deg, #ff71ce 0%, #b967ff 50%, #01cdfe 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ＶＡＰＯＲ
            </h1>
            {/* Pink ghost offset */}
            <h1
              className="text-7xl md:text-9xl font-black tracking-widest leading-none absolute inset-0 pointer-events-none"
              style={{
                color: "rgba(255,113,206,0.25)",
                transform: "translate(3px, 3px)",
              }}
            >
              ＶＡＰＯＲ
            </h1>
            {/* Cyan ghost offset */}
            <h1
              className="text-7xl md:text-9xl font-black tracking-widest leading-none absolute inset-0 pointer-events-none"
              style={{
                color: "rgba(1,205,254,0.2)",
                transform: "translate(-3px, -3px)",
              }}
            >
              ＶＡＰＯＲ
            </h1>
          </div>

          <button type="button" className={`relative mb-10 cursor-pointer select-none ${glitchActive ? "vapor-glitch" : ""}`} onClick={handleGlitch}>
            <h1
              className="text-7xl md:text-9xl font-black tracking-widest leading-none"
              style={{
                background: "linear-gradient(135deg, #01cdfe 0%, #b967ff 50%, #ff71ce 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ＷＡＶＥ
            </h1>
          </button>

          <p
            className="text-lg md:text-xl mb-3 tracking-[0.2em]"
            style={{ color: "rgba(255,200,230,0.7)" }}
          >
            永遠の夢 — Eternal dreams in pastel paradise
          </p>
          <p
            className="text-xs tracking-[0.4em] mb-10 uppercase"
            style={{ color: "rgba(1,205,254,0.45)" }}
          >
            click the title to trigger glitch · クリックでグリッチ発動
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button
              className="group px-10 py-4 font-black tracking-widest uppercase transition-all duration-500 hover:-translate-y-1 hover:-rotate-1"
              style={{
                background: "linear-gradient(90deg, #ff71ce, #b967ff, #01cdfe, #ff71ce)",
                backgroundSize: "300% 100%",
                color: "#1a0533",
                boxShadow: "0 0 30px rgba(255,113,206,0.5), 0 0 60px rgba(1,205,254,0.2)",
                letterSpacing: "0.25em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "100% 0";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 50px rgba(255,113,206,0.7), 0 0 100px rgba(1,205,254,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "0% 0";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 30px rgba(255,113,206,0.5), 0 0 60px rgba(1,205,254,0.2)";
              }}
            >
              Enter the Dream
            </button>
            <button
              className="px-10 py-4 font-black tracking-widest uppercase transition-all duration-300 hover:scale-105"
              style={{
                border: "2px solid rgba(1,205,254,0.5)",
                color: "#01cdfe",
                background: "rgba(1,205,254,0.06)",
                boxShadow: "0 0 15px rgba(1,205,254,0.25), inset 0 0 20px rgba(1,205,254,0.08)",
                letterSpacing: "0.25em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 30px rgba(1,205,254,0.5), inset 0 0 30px rgba(1,205,254,0.15)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(1,205,254,0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 15px rgba(1,205,254,0.25), inset 0 0 20px rgba(1,205,254,0.08)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(1,205,254,0.5)";
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Component Demos ──────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs tracking-[0.6em] uppercase mb-2" style={{ color: "rgba(1,205,254,0.5)" }}>
              コンポーネント
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-widest"
              style={{
                background: "linear-gradient(90deg, #ff71ce, #01cdfe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
              }}
            >
              COMPONENTS
            </h2>
          </RevealBlock>

          {/* Buttons Demo */}
          <RevealBlock className="mb-10" delay={0.05}>
            <div
              className="p-8 relative overflow-hidden"
              style={{
                background: "rgba(43,0,87,0.55)",
                border: "1px solid rgba(255,113,206,0.25)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 0 40px rgba(255,113,206,0.1)",
              }}
            >
              {/* mini scanlines on panel */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,113,206,0.03) 3px, rgba(255,113,206,0.03) 4px)",
                }}
              />
              <p className="text-xs tracking-[0.4em] uppercase mb-6 relative" style={{ color: "rgba(255,113,206,0.5)" }}>
                ボタン / Buttons
              </p>
              <div className="flex flex-wrap gap-4 relative">
                {/* Primary */}
                <button
                  className="px-8 py-3 font-black tracking-widest uppercase hover:-translate-y-1 hover:-rotate-1 active:translate-x-1 active:translate-y-1 transition-all duration-300"
                  style={{
                    background: "linear-gradient(90deg, #ff71ce, #b967ff, #01cdfe)",
                    color: "#1a0533",
                    boxShadow: "4px 4px 0 rgba(1,205,254,0.5), 0 0 20px rgba(255,113,206,0.4)",
                    letterSpacing: "0.2em",
                  }}
                >
                  A E S T H E T I C
                </button>

                {/* Outline Pink */}
                <button
                  className="hover-glitch px-8 py-3 font-black tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: "2px solid #ff71ce",
                    color: "#ff71ce",
                    background: "rgba(255,113,206,0.06)",
                    boxShadow: "0 0 12px rgba(255,113,206,0.3), inset 0 0 12px rgba(255,113,206,0.08)",
                    letterSpacing: "0.2em",
                  }}
                >
                  NEON PINK
                </button>

                {/* Outline Cyan */}
                <button
                  className="hover-glitch px-8 py-3 font-black tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    border: "2px solid #01cdfe",
                    color: "#01cdfe",
                    background: "rgba(1,205,254,0.06)",
                    boxShadow: "0 0 12px rgba(1,205,254,0.3), inset 0 0 12px rgba(1,205,254,0.08)",
                    letterSpacing: "0.2em",
                  }}
                >
                  CYBER CYAN
                </button>

                {/* Ghost */}
                <button
                  className="px-8 py-3 font-black tracking-widest uppercase transition-all duration-300 hover:text-pink-300"
                  style={{ color: "rgba(255,113,206,0.4)", letterSpacing: "0.2em" }}
                >
                  GHOST
                </button>
              </div>

              {/* Sizes row */}
              <div className="flex flex-wrap gap-4 items-center mt-6 relative">
                <p className="text-xs tracking-[0.4em] uppercase w-full mb-2" style={{ color: "rgba(1,205,254,0.45)" }}>
                  サイズ / Sizes
                </p>
                {[
                  { label: "XS", px: "px-4 py-2 text-xs" },
                  { label: "SM", px: "px-6 py-2.5 text-sm" },
                  { label: "MD", px: "px-8 py-3 text-base" },
                  { label: "LG", px: "px-10 py-4 text-lg" },
                ].map(({ label, px }) => (
                  <button
                    key={label}
                    className={`${px} font-black tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5`}
                    style={{
                      background: "linear-gradient(90deg, #ff71ce, #b967ff)",
                      color: "#1a0533",
                      boxShadow: "0 0 15px rgba(255,113,206,0.35)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Cards Demo */}
          <RevealBlock delay={0.1}>
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "rgba(255,113,206,0.5)" }}>
              カード / Cards
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "V I R T U A L",
                  tag: "Windows 95.exe",
                  desc: "Welcome to the aesthetic dimension. Where marble statues cry digital tears.",
                  glowColor: "rgba(255,113,206,0.35)",
                  borderColor: "#ff71ce",
                  accent: "#ff71ce",
                  jp: "仮想",
                },
                {
                  title: "D R E A M S",
                  tag: "MacOS 8.6.sys",
                  desc: "Analog warmth in a digital age. Vinyl records spin in cyberspace forever.",
                  glowColor: "rgba(1,205,254,0.35)",
                  borderColor: "#01cdfe",
                  accent: "#01cdfe",
                  jp: "夢想",
                },
                {
                  title: "N O S T A L G I A",
                  tag: "VHS_TAPE.vhs",
                  desc: "Glitchy memories of the forgotten mall. Elevator music never stops playing.",
                  glowColor: "rgba(185,103,255,0.35)",
                  borderColor: "#b967ff",
                  accent: "#b967ff",
                  jp: "郷愁",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group p-6 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:rotate-1"
                  style={{
                    background: "rgba(43,0,87,0.6)",
                    borderTop: `2px solid rgba(${card.borderColor === "#ff71ce" ? "255,113,206" : card.borderColor === "#01cdfe" ? "1,205,254" : "185,103,255"},0.5)`,
                    borderLeft: `2px solid rgba(${card.borderColor === "#ff71ce" ? "255,113,206" : card.borderColor === "#01cdfe" ? "1,205,254" : "185,103,255"},0.5)`,
                    borderBottom: `4px solid rgba(${card.borderColor === "#ff71ce" ? "255,113,206" : card.borderColor === "#01cdfe" ? "1,205,254" : "185,103,255"},0.3)`,
                    borderRight: `4px solid rgba(${card.borderColor === "#ff71ce" ? "255,113,206" : card.borderColor === "#01cdfe" ? "1,205,254" : "185,103,255"},0.3)`,
                    backdropFilter: "blur(16px)",
                    boxShadow: `0 10px 30px ${card.glowColor}`,
                  }}
                >
                  {/* Grid bg on card */}
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,113,206,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(1,205,254,0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: "15px 15px",
                      transform: "perspective(200px) rotateX(40deg)",
                    }}
                  />
                  <div className="relative z-10">
                    <p className="text-xs mb-1" style={{ color: `${card.accent}60` }}>
                      {card.jp}
                    </p>
                    <h3
                      className="text-xl font-black tracking-[0.2em] mb-2 group-hover:tracking-[0.35em] transition-all duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${card.accent}, #b967ff)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {card.title}
                    </h3>
                    <div
                      className="inline-block px-2 py-0.5 font-mono font-bold text-xs mb-4"
                      style={{ background: card.accent, color: "#1a0533" }}
                    >
                      {card.tag}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: `${card.accent}99` }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── SECTION 4: Input & Form ─────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs tracking-[0.6em] uppercase mb-2" style={{ color: "rgba(185,103,255,0.5)" }}>
              フォーム
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-widest"
              style={{
                background: "linear-gradient(90deg, #b967ff, #ff71ce)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              INPUT / FORM
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05}>
            <div
              className="p-8 relative overflow-hidden"
              style={{
                background: "rgba(43,0,87,0.6)",
                border: "1px solid rgba(185,103,255,0.3)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 50px rgba(185,103,255,0.15)",
              }}
            >
              {/* Newsletter icon area */}
              <div className="text-center mb-8">
                <div
                  className="w-16 h-16 mx-auto flex items-center justify-center text-2xl font-black mb-4"
                  style={{
                    background: "linear-gradient(135deg, #ff71ce, #b967ff, #01cdfe)",
                    boxShadow: "0 0 30px rgba(255,113,206,0.5)",
                    color: "#1a0533",
                  }}
                >
                  &#9993;
                </div>
                <h3
                  className="text-xl font-black tracking-widest"
                  style={{
                    background: "linear-gradient(90deg, #ff71ce, #01cdfe)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ニュースレター
                </h3>
                <p className="text-xs tracking-widest mt-1" style={{ color: "rgba(255,113,206,0.5)" }}>
                  Subscribe to updates
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(255,113,206,0.6)" }}>
                    名前 / Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name..."
                    className="w-full px-5 py-3.5 font-medium transition-all duration-300 outline-none"
                    style={{
                      background: "rgba(26,5,51,0.7)",
                      border: "2px solid rgba(255,113,206,0.2)",
                      color: "#ffc0d8",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,113,206,0.7)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(255,113,206,0.3), inset 0 0 10px rgba(255,113,206,0.05)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,113,206,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(1,205,254,0.6)" }}>
                    メール / Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-5 py-3.5 font-medium transition-all duration-300 outline-none"
                    style={{
                      background: "rgba(26,5,51,0.7)",
                      border: "2px solid rgba(1,205,254,0.2)",
                      color: "#b0f0ff",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(1,205,254,0.7)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(1,205,254,0.3), inset 0 0 10px rgba(1,205,254,0.05)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(1,205,254,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(185,103,255,0.6)" }}>
                    メッセージ / Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Your message..."
                    className="w-full px-5 py-3.5 font-medium transition-all duration-300 outline-none resize-none"
                    style={{
                      background: "rgba(26,5,51,0.7)",
                      border: "2px solid rgba(185,103,255,0.2)",
                      color: "#d8b0ff",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(185,103,255,0.7)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(185,103,255,0.3), inset 0 0 10px rgba(185,103,255,0.05)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(185,103,255,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <button
                  className="w-full px-6 py-4 font-black tracking-widest uppercase transition-all duration-500 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(90deg, #ff71ce, #b967ff, #01cdfe, #ff71ce)",
                    backgroundSize: "300% 100%",
                    color: "#1a0533",
                    boxShadow: "0 0 20px rgba(255,113,206,0.4)",
                    letterSpacing: "0.25em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "100% 0";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(255,113,206,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundPosition = "0% 0";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(255,113,206,0.4)";
                  }}
                >
                  登録する / Subscribe
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── SECTION 5: Color Palette ─────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs tracking-[0.6em] uppercase mb-2" style={{ color: "rgba(5,255,161,0.5)" }}>
              カラーパレット
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-widest"
              style={{
                background: "linear-gradient(90deg, #05ffa1, #01cdfe, #b967ff, #ff71ce)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              COLOR PALETTE
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {COLORS.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.07}>
                <div
                  className="group relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
                  style={{
                    border: "1px solid rgba(255,113,206,0.15)",
                    background: "rgba(43,0,87,0.4)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Color swatch */}
                  <div
                    className="h-24 w-full transition-all duration-500 group-hover:h-28"
                    style={{
                      background: color.hex,
                      boxShadow: `0 0 20px ${color.glow}, inset 0 0 30px rgba(0,0,0,0.2)`,
                    }}
                  />
                  {/* Label */}
                  <div className="p-3">
                    <p className="text-xs font-black tracking-widest uppercase" style={{ color: "#e8c8f8" }}>
                      {color.name}
                    </p>
                    <p className="text-xs tracking-widest" style={{ color: "rgba(1,205,254,0.7)" }}>
                      {color.label}
                    </p>
                    <p className="text-xs font-mono mt-1" style={{ color: "rgba(255,113,206,0.6)" }}>
                      {color.hex}
                    </p>
                  </div>
                  {/* Hover shimmer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, transparent 30%, ${color.glow} 100%)`,
                    }}
                  />
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Music Player (interactive) ───────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-lg mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs tracking-[0.6em] uppercase mb-2" style={{ color: "rgba(255,113,206,0.5)" }}>
              プレイヤー
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-widest"
              style={{
                background: "linear-gradient(90deg, #ff71ce, #b967ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MUSIC PLAYER
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div
              className="p-8 relative overflow-hidden"
              style={{
                background: "rgba(43,0,87,0.7)",
                border: "1px solid rgba(255,113,206,0.3)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 60px rgba(255,113,206,0.2), 0 0 100px rgba(185,103,255,0.1)",
              }}
            >
              {/* VHS scanlines on player */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
                }}
              />

              <div className="relative z-10">
                {/* Album art */}
                <div className="relative mb-6">
                  <div
                    className="w-44 h-44 mx-auto flex items-center justify-center text-5xl font-black relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #ff71ce, #b967ff, #01cdfe)",
                      boxShadow: "0 0 50px rgba(255,113,206,0.5), 0 0 80px rgba(185,103,255,0.3)",
                      animation: isPlaying ? "vaporSpin 8s linear infinite" : "none",
                    }}
                  >
                    <span style={{ color: "#1a0533" }}>&#9835;</span>
                    {/* VHS overlay on art */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)",
                      }}
                    />
                  </div>
                </div>

                {/* Track info */}
                <div className="text-center mb-5">
                  <p className="text-xs tracking-[0.3em] mb-1" style={{ color: "rgba(185,103,255,0.6)" }}>
                    {TRACKS[activeTrack].jp}
                  </p>
                  <h3
                    className="text-lg font-black tracking-widest"
                    style={{
                      textShadow: "0 0 10px rgba(255,113,206,0.5), 0 0 20px rgba(1,205,254,0.3)",
                      color: "#ff71ce",
                    }}
                  >
                    {TRACKS[activeTrack].title}
                  </h3>
                  <p className="text-sm tracking-widest" style={{ color: "rgba(1,205,254,0.7)" }}>
                    {TRACKS[activeTrack].artist}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div
                    className="h-1.5 relative overflow-hidden mb-1.5"
                    style={{
                      background: "rgba(26,5,51,0.8)",
                      border: "1px solid rgba(255,113,206,0.15)",
                    }}
                  >
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #ff71ce, #01cdfe)",
                        boxShadow: "0 0 8px rgba(255,113,206,0.6)",
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs" style={{ color: "rgba(255,113,206,0.4)" }}>
                    <span>1:45</span>
                    <span>{TRACKS[activeTrack].duration}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mb-6">
                  <button
                    onClick={() => setActiveTrack((prev) => (prev === 0 ? TRACKS.length - 1 : prev - 1))}
                    className="w-10 h-10 flex items-center justify-center font-black text-lg transition-all duration-300 hover:scale-110"
                    style={{ color: "rgba(255,113,206,0.6)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#ff71ce";
                      (e.currentTarget as HTMLButtonElement).style.textShadow = "0 0 10px rgba(255,113,206,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,113,206,0.6)";
                      (e.currentTarget as HTMLButtonElement).style.textShadow = "none";
                    }}
                  >
                    &#9198;
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 flex items-center justify-center font-black text-2xl transition-all duration-300 hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, #ff71ce, #b967ff)",
                      color: "#1a0533",
                      boxShadow: isPlaying
                        ? "0 0 30px rgba(255,113,206,0.7), 0 0 60px rgba(185,103,255,0.4)"
                        : "0 0 20px rgba(255,113,206,0.5)",
                    }}
                  >
                    {isPlaying ? "\u23F8" : "\u25B6"}
                  </button>
                  <button
                    onClick={() => setActiveTrack((prev) => (prev === TRACKS.length - 1 ? 0 : prev + 1))}
                    className="w-10 h-10 flex items-center justify-center font-black text-lg transition-all duration-300 hover:scale-110"
                    style={{ color: "rgba(1,205,254,0.6)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#01cdfe";
                      (e.currentTarget as HTMLButtonElement).style.textShadow = "0 0 10px rgba(1,205,254,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(1,205,254,0.6)";
                      (e.currentTarget as HTMLButtonElement).style.textShadow = "none";
                    }}
                  >
                    &#9197;
                  </button>
                </div>

                {/* Volume + progress controls */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setProgress((p) => Math.max(0, p - 10))}
                    className="flex-1 py-2 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
                    style={{
                      border: "1px solid rgba(255,113,206,0.3)",
                      color: "#ff71ce",
                      background: "rgba(255,113,206,0.05)",
                    }}
                  >
                    ‒ 10%
                  </button>
                  <button
                    onClick={() => setProgress((p) => Math.min(100, p + 10))}
                    className="flex-1 py-2 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
                    style={{
                      border: "1px solid rgba(1,205,254,0.3)",
                      color: "#01cdfe",
                      background: "rgba(1,205,254,0.05)",
                    }}
                  >
                    + 10%
                  </button>
                </div>

                {/* Track list */}
                <div className="mt-6 space-y-1">
                  {TRACKS.map((track, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTrack(i)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-300"
                      style={{
                        background: activeTrack === i ? "rgba(255,113,206,0.1)" : "transparent",
                        borderLeft: activeTrack === i ? "3px solid #ff71ce" : "3px solid transparent",
                      }}
                    >
                      <span
                        className="text-xs w-4"
                        style={{ color: activeTrack === i ? "#ff71ce" : "rgba(255,113,206,0.3)" }}
                      >
                        {activeTrack === i ? "\u266A" : String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <p
                          className="text-xs font-bold tracking-wider"
                          style={{ color: activeTrack === i ? "#ff71ce" : "rgba(255,200,230,0.7)" }}
                        >
                          {track.title}
                        </p>
                        <p className="text-xs" style={{ color: "rgba(1,205,254,0.5)" }}>
                          {track.artist}
                        </p>
                      </div>
                      <span className="text-xs font-mono" style={{ color: "rgba(185,103,255,0.6)" }}>
                        {track.duration}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── SECTION 7: Design Rules (Do / Don't) ─────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs tracking-[0.6em] uppercase mb-2" style={{ color: "rgba(5,255,161,0.5)" }}>
              デザインルール
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-widest"
              style={{
                background: "linear-gradient(90deg, #05ffa1, #ff71ce)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DESIGN RULES
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Do */}
            <RevealBlock delay={0.05}>
              <div
                className="p-8 relative overflow-hidden"
                style={{
                  background: "rgba(5,255,161,0.04)",
                  border: "1px solid rgba(5,255,161,0.25)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 0 30px rgba(5,255,161,0.08)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-2xl font-black"
                    style={{ textShadow: "0 0 15px rgba(5,255,161,0.8)", color: "#05ffa1" }}
                  >
                    &#10003;
                  </span>
                  <h3
                    className="text-xl font-black tracking-widest"
                    style={{ color: "#05ffa1", textShadow: "0 0 10px rgba(5,255,161,0.5)" }}
                  >
                    DO
                  </h3>
                </div>
                <ul className="space-y-3">
                  {DO_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: "#05ffa1" }}>
                        ►
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(200,255,230,0.8)" }}>
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 relative overflow-hidden"
                style={{
                  background: "rgba(255,113,206,0.04)",
                  border: "1px solid rgba(255,107,107,0.25)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 0 30px rgba(255,107,107,0.08)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-2xl font-black"
                    style={{ textShadow: "0 0 15px rgba(255,107,107,0.8)", color: "#ff6b6b" }}
                  >
                    &#10007;
                  </span>
                  <h3
                    className="text-xl font-black tracking-widest"
                    style={{ color: "#ff6b6b", textShadow: "0 0 10px rgba(255,107,107,0.5)" }}
                  >
                    DON'T
                  </h3>
                </div>
                <ul className="space-y-3">
                  {DONT_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: "#ff6b6b" }}>
                        &#10005;
                      </span>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,200,200,0.8)" }}>
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: Typography ────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs tracking-[0.6em] uppercase mb-2" style={{ color: "rgba(185,103,255,0.5)" }}>
              タイポグラフィ
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-widest"
              style={{
                background: "linear-gradient(90deg, #b967ff, #01cdfe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              TYPOGRAPHY
            </h2>
          </RevealBlock>

          <div className="space-y-8">
            {/* Display heading */}
            <RevealBlock delay={0.04}>
              <div
                className="p-8 relative overflow-hidden"
                style={{
                  background: "rgba(43,0,87,0.5)",
                  border: "1px solid rgba(255,113,206,0.2)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(255,113,206,0.5)" }}>
                  Display — Full-width Aesthetic
                </p>
                <p
                  className="text-5xl md:text-7xl font-black tracking-widest leading-none"
                  style={{
                    textShadow: "0 0 10px #ff71ce, 0 0 20px #ff71ce, 0 0 40px #01cdfe, 2px 2px 0 rgba(185,103,255,0.5)",
                    color: "#ff71ce",
                  }}
                >
                  ＡＥＳＴＨＥＴＩＣ
                </p>
              </div>
            </RevealBlock>

            {/* Heading levels */}
            <RevealBlock delay={0.08}>
              <div
                className="p-8 relative overflow-hidden"
                style={{
                  background: "rgba(43,0,87,0.5)",
                  border: "1px solid rgba(1,205,254,0.2)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "rgba(1,205,254,0.5)" }}>
                  Headings — Neon Glow Scale
                </p>
                <div className="space-y-4">
                  {[
                    { tag: "H1", size: "text-5xl", text: "VAPORWAVE DREAM", glow: "#ff71ce" },
                    { tag: "H2", size: "text-4xl", text: "PASTEL PARADISE", glow: "#b967ff" },
                    { tag: "H3", size: "text-3xl", text: "RETRO FUTURE", glow: "#01cdfe" },
                    { tag: "H4", size: "text-2xl", text: "NEON NIGHTS", glow: "#05ffa1" },
                  ].map(({ tag, size, text, glow }) => (
                    <div key={tag} className="flex items-baseline gap-4">
                      <span className="text-xs font-mono w-8 flex-shrink-0" style={{ color: "rgba(185,103,255,0.5)" }}>
                        {tag}
                      </span>
                      <p
                        className={`${size} font-black tracking-widest leading-none`}
                        style={{
                          color: glow,
                          textShadow: `0 0 8px ${glow}, 0 0 16px ${glow}80`,
                        }}
                      >
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Body text + mono */}
            <RevealBlock delay={0.12}>
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="p-6"
                  style={{
                    background: "rgba(43,0,87,0.5)",
                    border: "1px solid rgba(185,103,255,0.2)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(185,103,255,0.5)" }}>
                    Body Text
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(255,200,230,0.8)" }}>
                    Vaporwave is a microgenre of electronic music and a visual art style that emerged in the early 2010s. It is characterized by its nostalgia and surrealist engagement with 80s and 90s pop culture.
                  </p>
                  <p className="text-sm leading-relaxed mt-3" style={{ color: "rgba(1,205,254,0.6)" }}>
                    アエステティック — The aesthetic features pastel colors, Japanese text, and Roman busts in surreal configurations.
                  </p>
                </div>
                <div
                  className="p-6"
                  style={{
                    background: "rgba(43,0,87,0.5)",
                    border: "1px solid rgba(5,255,161,0.2)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(5,255,161,0.5)" }}>
                    Monospace / Code
                  </p>
                  <div
                    className="p-4 font-mono text-sm"
                    style={{
                      background: "rgba(26,5,51,0.8)",
                      border: "1px solid rgba(5,255,161,0.2)",
                    }}
                  >
                    <p style={{ color: "#05ffa1" }}>{"// Vaporwave config"}</p>
                    <p style={{ color: "rgba(255,113,206,0.8)" }}>{"const VAPOR = {"}</p>
                    <p style={{ color: "rgba(1,205,254,0.8)", paddingLeft: "16px" }}>{'primary: "#ff71ce",'}</p>
                    <p style={{ color: "rgba(1,205,254,0.8)", paddingLeft: "16px" }}>{'cyan: "#01cdfe",'}</p>
                    <p style={{ color: "rgba(1,205,254,0.8)", paddingLeft: "16px" }}>{'purple: "#b967ff",'}</p>
                    <p style={{ color: "rgba(255,113,206,0.8)" }}>{"}"}</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: Variants showcase ─────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs tracking-[0.6em] uppercase mb-2" style={{ color: "rgba(255,251,150,0.5)" }}>
              スタイル変体
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-widest"
              style={{
                background: "linear-gradient(90deg, #fffb96, #ff71ce, #01cdfe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              STYLE VARIANTS
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: "vaporwave",
                name: "蒸汽波",
                nameEn: "Vaporwave",
                desc: "80-90年代消費主義、日文元素、希臘雕塑、故障藝術",
                colors: ["#ff71ce", "#01cdfe", "#b967ff", "#05ffa1"],
                glow: "#ff71ce",
                jp: "ヴェイパーウェイブ",
              },
              {
                id: "synthwave",
                name: "合成波",
                nameEn: "Synthwave",
                desc: "80年代合成器音楽、網格地平線、日落漸變、科幻電影感",
                colors: ["#ff00ff", "#00ffff", "#ff6ec7", "#7b68ee"],
                glow: "#ff00ff",
                jp: "シンスウェーブ",
              },
              {
                id: "cyberpunk",
                name: "賽博朋克",
                nameEn: "Cyberpunk",
                desc: "深色背景、霓虹發光、未来都市、強烈科技感",
                colors: ["#00ffff", "#ff00ff", "#ffff00", "#00ff00"],
                glow: "#00ffff",
                jp: "サイバーパンク",
              },
            ].map((v, i) => (
              <RevealBlock key={v.id} delay={i * 0.08}>
                <div
                  className="group p-6 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
                  style={{
                    background:
                      activeVariant === v.id
                        ? `rgba(${v.id === "vaporwave" ? "255,113,206" : v.id === "synthwave" ? "255,0,255" : "0,255,255"},0.08)`
                        : "rgba(43,0,87,0.5)",
                    border: `1px solid ${activeVariant === v.id ? v.glow : "rgba(255,113,206,0.15)"}`,
                    backdropFilter: "blur(16px)",
                    boxShadow:
                      activeVariant === v.id
                        ? `0 0 30px ${v.glow}40, 0 0 60px ${v.glow}20`
                        : "none",
                  }}
                  onClick={() => setActiveVariant(v.id as typeof activeVariant)}
                >
                  {/* Color swatches */}
                  <div className="flex gap-1.5 mb-4">
                    {v.colors.map((c) => (
                      <div
                        key={c}
                        className="w-6 h-6 flex-shrink-0"
                        style={{ background: c, boxShadow: `0 0 8px ${c}80` }}
                      />
                    ))}
                  </div>
                  <p className="text-xs tracking-[0.3em] mb-1" style={{ color: `${v.glow}80` }}>
                    {v.jp}
                  </p>
                  <h3
                    className="text-xl font-black tracking-widest mb-1"
                    style={{
                      color: v.glow,
                      textShadow: activeVariant === v.id ? `0 0 10px ${v.glow}` : "none",
                    }}
                  >
                    {v.nameEn}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "rgba(255,200,230,0.6)" }}>
                    {v.name}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(200,180,230,0.7)" }}>
                    {v.desc}
                  </p>
                  {activeVariant === v.id && (
                    <div
                      className="absolute top-3 right-3 px-2 py-0.5 text-xs font-black tracking-widest"
                      style={{ background: v.glow, color: "#1a0533" }}
                    >
                      ACTIVE
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: Philosophy quote ─────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div
              className="p-10 md:p-16 relative overflow-hidden text-center"
              style={{
                background: "rgba(43,0,87,0.6)",
                border: "1px solid rgba(255,113,206,0.2)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 0 80px rgba(185,103,255,0.15)",
              }}
            >
              {/* Background grid on philosophy section */}
              <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,113,206,1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(1,205,254,1) 1px, transparent 1px)
                  `,
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="relative z-10">
                <p
                  className="text-4xl md:text-6xl font-black tracking-widest mb-8"
                  style={{ color: "rgba(255,113,206,0.2)" }}
                >
                  &#10077;
                </p>
                <p
                  className="text-lg md:text-xl leading-relaxed mb-8 tracking-wide"
                  style={{ color: "rgba(255,200,230,0.85)" }}
                >
                  Vaporwave（蒸汽波）是一種源於2010年代初的網路亞文化美學，融合了80-90年代的消費主義符號、日本文化元素和早期互聯網美學。
                </p>
                <p className="text-sm tracking-[0.3em]" style={{ color: "rgba(1,205,254,0.6)" }}>
                  怀旧感 · 超現実 · 霓虹色彩 · 故障美学
                </p>
                <div className="flex justify-center gap-6 mt-8">
                  {["蒸汽波", "合成波", "赛博朋克"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 text-xs tracking-widest"
                      style={{
                        border: "1px solid rgba(255,113,206,0.3)",
                        color: "rgba(255,113,206,0.8)",
                        background: "rgba(255,113,206,0.05)",
                      }}
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

      {/* ── SECTION 11: Footer ───────────────────────────────────────────────── */}
      <footer
        className="relative z-10 py-16 px-6"
        style={{
          borderTop: "1px solid rgba(255,113,206,0.2)",
          background: "rgba(26,5,51,0.8)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
            <div>
              <p
                className="text-3xl font-black tracking-[0.3em] mb-1"
                style={{
                  textShadow: "0 0 10px #ff71ce, 0 0 20px #ff71ce, 0 0 40px #01cdfe",
                  color: "#ff71ce",
                }}
              >
                ＶＡＰＯＲＷＡＶＥ
              </p>
              <p className="text-xs tracking-[0.4em]" style={{ color: "rgba(1,205,254,0.5)" }}>
                永遠の夢 · ETERNAL DREAMS
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex gap-2">
                {["#ff71ce", "#b967ff", "#01cdfe", "#05ffa1", "#fffb96"].map((c) => (
                  <div
                    key={c}
                    className="w-5 h-5 transition-all duration-300 hover:scale-125 cursor-pointer"
                    style={{ background: c, boxShadow: `0 0 8px ${c}` }}
                  />
                ))}
              </div>
              <p className="text-xs tracking-widest" style={{ color: "rgba(185,103,255,0.6)" }}>
                AESTHETIC COLOR SYSTEM
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div
            className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,113,206,0.1)" }}
          >
            <p className="text-xs tracking-widest" style={{ color: "rgba(255,113,206,0.4)" }}>
              Part of the{" "}
              <Link
                href="/"
                className="transition-colors duration-300"
                style={{ color: "#ff71ce" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 8px rgba(255,113,206,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
                }}
              >
                StyleKit
              </Link>{" "}
              Design System Collection
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/styles/vaporwave"
                className="text-xs tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{ color: "rgba(1,205,254,0.5)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#01cdfe";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 8px rgba(1,205,254,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(1,205,254,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
                }}
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{ color: "rgba(185,103,255,0.5)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#b967ff";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "0 0 8px rgba(185,103,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(185,103,255,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
                }}
              >
                All Styles
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <p
              className="text-xs tracking-[0.5em] neon-flicker"
              style={{ color: "rgba(255,113,206,0.3)" }}
            >
              ア エ ス テ テ ィ ッ ク · A E S T H E T I C · 美学
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
