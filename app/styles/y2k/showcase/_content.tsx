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

export default function Y2KShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [progress, setProgress] = useState(68);
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  // Blinking cursor effect
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const tabs = ["Music", "Photos", "Friends"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-cyan-100 relative overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Global styles                                                        */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        @keyframes float-bubble {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-24px) scale(1.04); }
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes rainbow-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes chrome-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes blink-star {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .bubble-1 { animation: float-bubble 14s ease-in-out infinite; }
        .bubble-2 { animation: float-bubble 18s ease-in-out infinite 2s; }
        .bubble-3 { animation: float-bubble 11s ease-in-out infinite 1s; }
        .bubble-4 { animation: float-bubble 16s ease-in-out infinite 3s; }
        .marquee-track { animation: marquee-scroll 22s linear infinite; }
        .rainbow-bg {
          background: linear-gradient(270deg, #ff69b4, #00ffff, #ff00ff, #87ceeb, #ff69b4);
          background-size: 300% 300%;
          animation: rainbow-shift 5s ease infinite;
        }
        .chrome-text {
          background: linear-gradient(90deg, #a0a0a0, #ffffff, #c0c0c0, #ffffff, #a0a0a0);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: chrome-shimmer 4s linear infinite;
        }
        .holographic-border {
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
        }
        .holographic-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: linear-gradient(135deg, #ff69b4, #00ffff, #ff00ff, #87ceeb, #ff69b4);
          background-size: 300% 300%;
          animation: rainbow-shift 4s ease infinite;
          z-index: -1;
        }
        .spin-star { animation: spin-slow 8s linear infinite; }
        .blink-star { animation: blink-star 1.5s ease-in-out infinite; }
        .group:hover .group-hover-scale { transform: scale(1.08) rotate(3deg); }
        .group-hover-scale { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* Floating background bubbles                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="bubble-1 absolute top-[8%] left-[6%] w-52 h-52 rounded-full bg-gradient-to-br from-pink-300/35 to-purple-200/20 blur-3xl" />
        <div className="bubble-2 absolute top-[30%] right-[8%] w-72 h-72 rounded-full bg-gradient-to-br from-cyan-300/35 to-blue-200/20 blur-3xl" />
        <div className="bubble-3 absolute bottom-[20%] left-[18%] w-40 h-40 rounded-full bg-gradient-to-br from-purple-300/35 to-pink-200/20 blur-2xl" />
        <div className="bubble-4 absolute top-[60%] right-[20%] w-32 h-32 rounded-full bg-gradient-to-br from-lime-300/25 to-cyan-200/15 blur-2xl" />

        {/* Star decorations */}
        <span className="blink-star absolute top-[14%] left-[28%] text-pink-300/60 text-2xl select-none">✦</span>
        <span className="blink-star absolute top-[22%] right-[22%] text-cyan-300/60 text-xl select-none" style={{ animationDelay: "0.8s" }}>★</span>
        <span className="blink-star absolute bottom-[35%] left-[42%] text-purple-300/50 text-3xl select-none" style={{ animationDelay: "1.4s" }}>✸</span>
        <span className="blink-star absolute top-[50%] left-[10%] text-pink-200/40 text-lg select-none" style={{ animationDelay: "0.4s" }}>✦</span>
        <span className="blink-star absolute bottom-[12%] right-[30%] text-cyan-200/50 text-2xl select-none" style={{ animationDelay: "2s" }}>★</span>
      </div>

      {/* ================================================================== */}
      {/* 1. NAVIGATION BAR — chrome gradient, pixel font                     */}
      {/* ================================================================== */}
      <nav
        className="sticky top-0 z-50 px-6 py-3 backdrop-blur-md border-b border-white/40"
        style={{
          background: "linear-gradient(135deg, rgba(232,232,232,0.85), rgba(255,255,255,0.90), rgba(192,192,192,0.80), rgba(160,160,160,0.70))",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Back link */}
          <Link
            href="/styles/y2k"
            className="group flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors"
          >
            <span
              className="group-hover:-translate-x-1 transition-transform inline-block text-lg"
              aria-hidden="true"
            >
              &larr;
            </span>
            <span
              className="text-xs font-bold tracking-widest uppercase hidden sm:inline"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Back to Docs
            </span>
          </Link>

          {/* Center logo */}
          <div className="flex items-center gap-2">
            <span className="text-pink-400 text-lg blink-star">✦</span>
            <span
              className="font-black text-2xl chrome-text tracking-widest"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Y2K
            </span>
            <span className="text-cyan-400 text-lg blink-star" style={{ animationDelay: "0.5s" }}>✦</span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-2">
            <Link
              href="/styles"
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white shadow-md hover:scale-105 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #ff69b4, #c084fc, #00ffff)",
                fontFamily: "'Courier New', monospace",
                boxShadow: "0 4px 14px rgba(255,105,180,0.35)",
              }}
            >
              All Styles
            </Link>
          </div>
        </div>

        {/* Holographic underline strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 rainbow-bg"
          style={{ opacity: 0.7 }}
        />
      </nav>

      {/* ================================================================== */}
      {/* MARQUEE BAND                                                         */}
      {/* ================================================================== */}
      <div
        className="relative z-10 overflow-hidden py-2"
        style={{
          background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff, #ff00ff)",
        }}
      >
        <div className="marquee-track flex gap-0 whitespace-nowrap">
          {/* Duplicated content for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6 px-6 text-white text-xs font-bold tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              <span>✦ Y2K AESTHETIC</span>
              <span>★ MILLENNIUM VIBES</span>
              <span>✸ CHROME &amp; PINK</span>
              <span>✦ FUTURE IS NOW</span>
              <span>★ YEAR 2000</span>
              <span>✸ BUBBLE UI</span>
              <span>✦ HOLOGRAPHIC</span>
              <span>★ IRIDESCENT</span>
              <span>✸ METALLIC</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. HERO — chrome text, millennium countdown aesthetic                */}
      {/* ================================================================== */}
      <section className="relative z-10 pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <RevealBlock delay={0.05}>
            {/* Decorative badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 border border-white/60 backdrop-blur-sm shadow-lg"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(192,192,192,0.4))",
              }}
            >
              <span className="text-pink-500 blink-star">✦</span>
              <span
                className="text-xs font-bold tracking-[0.3em] uppercase text-gray-600"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Est. Year 2000
              </span>
              <span className="text-cyan-500 blink-star" style={{ animationDelay: "0.6s" }}>✦</span>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.12}>
            {/* Main headline */}
            <h1
              className="text-8xl md:text-[10rem] lg:text-[12rem] font-black leading-none tracking-tighter mb-4 select-none"
              style={{
                background: "linear-gradient(135deg, #e8e8e8 0%, #ffffff 20%, #c0c0c0 40%, #f0f0f0 60%, #a0a0a0 80%, #ffffff 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "chrome-shimmer 4s linear infinite",
                filter: "drop-shadow(0 2px 8px rgba(192,192,192,0.5))",
              }}
            >
              Y2K
            </h1>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <p
              className="text-sm font-bold tracking-[0.5em] uppercase mb-4"
              style={{
                background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Courier New', monospace",
              }}
            >
              Aesthetic
            </p>
          </RevealBlock>

          <RevealBlock delay={0.28}>
            {/* Blinking cursor tagline */}
            <p
              className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-4"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              The future is bright and shiny
              <span
                className="inline-block w-0.5 h-5 bg-pink-400 ml-1 align-middle"
                style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}
              />
            </p>
          </RevealBlock>

          <RevealBlock delay={0.35}>
            <p className="text-base text-gray-400 max-w-xl mx-auto mb-12">
              2000年代初的未来主义美学 — 金属质感、透明塑料、气泡元素、银色和彩虹渐变，充满对数字时代的乐观想象。
            </p>
          </RevealBlock>

          <RevealBlock delay={0.42}>
            <div className="flex flex-wrap justify-center gap-5">
              {/* Rainbow CTA */}
              <button
                className="group px-10 py-4 rounded-full text-white font-black tracking-widest uppercase text-sm transition-all duration-500 hover:scale-105 hover:shadow-[0_8px_35px_rgba(255,105,180,0.6)]"
                style={{
                  background: "linear-gradient(135deg, #ff69b4, #c084fc, #00ffff)",
                  boxShadow: "0 4px 25px rgba(255,105,180,0.4)",
                  fontFamily: "'Courier New', monospace",
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="group-hover:rotate-12 transition-transform inline-block">&#9889;</span>
                  Enter the Future
                </span>
              </button>

              {/* Chrome CTA */}
              <button
                className="px-10 py-4 rounded-full text-gray-700 font-black tracking-widest uppercase text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #e8e8e8, #ffffff, #c0c0c0, #a0a0a0)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.10), inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.05)",
                  fontFamily: "'Courier New', monospace",
                }}
              >
                <span className="flex items-center gap-2">
                  <span>&#127760;</span>
                  Explore
                </span>
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. COMPONENT DEMOS — Button, Card, Input                            */}
      {/* ================================================================== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-[0.4em] uppercase text-pink-400 mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Component Library
            </p>
            <h2
              className="text-4xl font-black"
              style={{
                background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              UI Components
            </h2>
            <p className="text-gray-500 mt-2">Chrome, silver, hot pink — bubble-era UI kit</p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Button demo */}
            <RevealBlock delay={0.05}>
              <div
                className="p-8 rounded-3xl border border-white/60 backdrop-blur-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,182,193,0.2))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <p
                  className="text-xs font-bold tracking-widest uppercase text-pink-500 mb-6"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  Buttons
                </p>
                <div className="flex flex-col gap-4">
                  <button
                    className="px-7 py-3 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #ff69b4, #c084fc, #00ffff)",
                      boxShadow: "0 4px 20px rgba(255,105,180,0.4)",
                    }}
                  >
                    Rainbow
                  </button>
                  <button
                    className="px-7 py-3 rounded-full text-gray-700 font-bold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #e8e8e8, #ffffff, #c0c0c0)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.9)",
                    }}
                  >
                    Chrome
                  </button>
                  <button
                    className="px-7 py-3 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #ff69b4, #ff1493)",
                      boxShadow: "0 4px 15px rgba(255,105,180,0.4)",
                    }}
                  >
                    Hot Pink
                  </button>
                  <button
                    className="px-7 py-3 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #00ffff, #00bfff)",
                      boxShadow: "0 4px 15px rgba(0,255,255,0.4)",
                    }}
                  >
                    Cyan
                  </button>
                </div>
              </div>
            </RevealBlock>

            {/* Card demo */}
            <RevealBlock delay={0.12}>
              <div
                className="p-8 rounded-3xl border border-white/60 backdrop-blur-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(192,192,192,0.25))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <p
                  className="text-xs font-bold tracking-widest uppercase text-purple-500 mb-6"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  Card
                </p>
                {/* Y2K card */}
                <div
                  className="group p-6 rounded-3xl border border-white/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,105,180,0.2)]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,182,193,0.3))",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Traffic light dots */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-3 h-3 rounded-full group-hover-scale"
                      style={{ background: "linear-gradient(135deg, #00ffff, #c084fc)" }}
                    />
                    <div
                      className="w-3 h-3 rounded-full group-hover-scale"
                      style={{ background: "linear-gradient(135deg, #ff69b4, #c084fc)", animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-3 h-3 rounded-full group-hover-scale"
                      style={{ background: "linear-gradient(135deg, #c084fc, #00ffff)", animationDelay: "0.2s" }}
                    />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Future is Now
                  </h3>
                  <p className="text-gray-500 text-sm">Welcome to the new millennium — chrome dreams and holographic skies.</p>
                </div>
              </div>
            </RevealBlock>

            {/* Input demo */}
            <RevealBlock delay={0.2}>
              <div
                className="p-8 rounded-3xl border border-white/60 backdrop-blur-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(0,255,255,0.1))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <p
                  className="text-xs font-bold tracking-widest uppercase text-cyan-500 mb-6"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  Input
                </p>
                <div className="flex flex-col gap-5">
                  {/* Default input */}
                  <div>
                    <label
                      className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="coolkid2000"
                      className="w-full px-5 py-3 rounded-full text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                      style={{
                        background: "linear-gradient(135deg, #ffffff, #f5f5f5)",
                        border: "1px solid rgba(255,105,180,0.3)",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.04)",
                        fontFamily: "'Courier New', monospace",
                      }}
                    />
                  </div>
                  {/* Email input */}
                  <div>
                    <label
                      className="block text-xs font-medium text-gray-500 mb-1.5 tracking-wide"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@millennium.com"
                      className="w-full px-5 py-3 rounded-full text-gray-700 placeholder-gray-400 text-sm focus:outline-none transition-all"
                      style={{
                        background: "linear-gradient(135deg, #ffffff, #f5f5f5)",
                        border: "1px solid rgba(0,255,255,0.4)",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.04)",
                        fontFamily: "'Courier New', monospace",
                      }}
                    />
                  </div>
                  {/* Chrome submit */}
                  <button
                    className="w-full py-3 rounded-full text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #ff69b4, #c084fc, #00ffff)",
                      boxShadow: "0 4px 20px rgba(255,105,180,0.35)",
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    Join Now ✦
                  </button>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. COLOR PALETTE — silver, hot pink, cyan, magenta                  */}
      {/* ================================================================== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-[0.4em] uppercase text-cyan-500 mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Color System
            </p>
            <h2
              className="text-4xl font-black"
              style={{
                background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Color Palette
            </h2>
            <p className="text-gray-500 mt-2">Chrome & iridescent rainbow spectrum</p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { name: "Silver", hex: "#c0c0c0", tag: "Primary", swatch: "linear-gradient(135deg, #e8e8e8, #ffffff, #c0c0c0, #a0a0a0)" },
              { name: "Hot Pink", hex: "#ff69b4", tag: "Secondary", swatch: "linear-gradient(135deg, #ff69b4, #ff1493)" },
              { name: "Cyan", hex: "#00ffff", tag: "Accent 1", swatch: "linear-gradient(135deg, #00ffff, #00bfff)" },
              { name: "Magenta", hex: "#ff00ff", tag: "Accent 2", swatch: "linear-gradient(135deg, #ff00ff, #c084fc)" },
              { name: "Sky Blue", hex: "#87ceeb", tag: "Accent 3", swatch: "linear-gradient(135deg, #87ceeb, #4fc3f7)" },
              { name: "Chrome", hex: "#dcdcdc", tag: "Surface", swatch: "linear-gradient(135deg, #e8e8e8, #ffffff, #dcdcdc)" },
              { name: "Lavender", hex: "#e6e6fa", tag: "Soft", swatch: "linear-gradient(135deg, #e6e6fa, #c084fc50)" },
              { name: "Iridescent", hex: "Rainbow", tag: "Special", swatch: "linear-gradient(135deg, #ff69b4, #00ffff, #ff00ff, #87ceeb)" },
            ].map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.05}>
                <div
                  className="group rounded-2xl overflow-hidden border border-white/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,105,180,0.2)]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Swatch */}
                  <div
                    className="h-24 w-full transition-transform duration-300 group-hover:scale-105"
                    style={{ background: c.swatch }}
                  />
                  {/* Label */}
                  <div className="p-4">
                    <p className="font-bold text-sm text-gray-700">{c.name}</p>
                    <p
                      className="text-xs text-pink-500 font-mono mt-0.5"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      {c.hex}
                    </p>
                    <span
                      className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full text-gray-500"
                      style={{
                        background: "rgba(192,192,192,0.2)",
                        border: "1px solid rgba(192,192,192,0.3)",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      {c.tag}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. DESIGN RULES — do / don't                                        */}
      {/* ================================================================== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-[0.4em] uppercase text-purple-500 mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Design Rules
            </p>
            <h2
              className="text-4xl font-black"
              style={{
                background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Do &amp; Don&apos;t
            </h2>
            <p className="text-gray-500 mt-2">The rules of the millennium era</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Do */}
            <RevealBlock delay={0.05}>
              <div
                className="p-8 rounded-3xl border border-white/60 backdrop-blur-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(0,255,255,0.08))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #00ffff, #c084fc)" }}
                  >
                    &#10003;
                  </div>
                  <h3
                    className="text-lg font-black tracking-widest uppercase text-gray-700"
                    style={{ fontFamily: "'Courier New', monospace" }}
                  >
                    Do
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Use silver/metal gradients: from-gray-300 via-white to-gray-300",
                    "Add bubble/sphere decorative elements",
                    "Use translucent effects: bg-white/30 backdrop-blur",
                    "Apply rainbow gradient text effects",
                    "Use rounded-full for that futuristic shape language",
                    "Add star and sparkle decorations ✦ ★ ✸",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                        style={{ background: "linear-gradient(135deg, #00ffff, #87ceeb)", boxShadow: "0 2px 8px rgba(0,255,255,0.3)" }}
                      >
                        &#10003;
                      </span>
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.12}>
              <div
                className="p-8 rounded-3xl border border-white/60 backdrop-blur-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,105,180,0.08))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #ff69b4, #ff1493)" }}
                  >
                    &#10005;
                  </div>
                  <h3
                    className="text-lg font-black tracking-widest uppercase text-gray-700"
                    style={{ fontFamily: "'Courier New', monospace" }}
                  >
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Use dark, muted color palettes — vibes must be bright",
                    "Use completely flat design without gloss or reflection",
                    "Omit the gloss and specular highlight effects",
                    "Use rough or grungy textures",
                    "Use sharp right-angle corners — everything must be rounded",
                    "Use monochrome — Y2K demands color abundance",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                        style={{ background: "linear-gradient(135deg, #ff69b4, #ff1493)", boxShadow: "0 2px 8px rgba(255,105,180,0.3)" }}
                      >
                        &#10005;
                      </span>
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. TYPOGRAPHY — pixel/techno fonts                                   */}
      {/* ================================================================== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-[0.4em] uppercase text-pink-400 mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Type System
            </p>
            <h2
              className="text-4xl font-black"
              style={{
                background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Typography
            </h2>
            <p className="text-gray-500 mt-2">Pixel-era &amp; techno fonts — the sound of the year 2000</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pixel/mono font samples */}
            <RevealBlock delay={0.05}>
              <div
                className="p-8 rounded-3xl border border-white/60 backdrop-blur-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(192,192,192,0.2))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <p
                  className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  Pixel / Mono
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Courier New', monospace" }}>Display / Hero</p>
                    <p
                      className="text-5xl font-black chrome-text leading-none"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      Y2K
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Courier New', monospace" }}>Heading / H1</p>
                    <p
                      className="text-3xl font-bold"
                      style={{
                        fontFamily: "'Courier New', monospace",
                        background: "linear-gradient(90deg, #ff69b4, #c084fc)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Future is Now
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Courier New', monospace" }}>Subheading / H2</p>
                    <p
                      className="text-xl font-semibold text-gray-600"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      Millennium Dreams
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Courier New', monospace" }}>Body Text</p>
                    <p
                      className="text-sm text-gray-500 leading-relaxed"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      Welcome to the year 2000. The web is a place of chrome<br />
                      and pink, pixels and dreams. The future is loading...
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Courier New', monospace" }}>Label / Caption</p>
                    <p
                      className="text-xs font-bold tracking-[0.4em] uppercase text-pink-400"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      Loading System... 100%
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Rainbow text effects */}
            <RevealBlock delay={0.12}>
              <div
                className="p-8 rounded-3xl border border-white/60 backdrop-blur-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,0,255,0.06))",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                }}
              >
                <p
                  className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-6"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  Rainbow Effects
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "'Courier New', monospace" }}>Holographic Text</p>
                    <p
                      className="text-4xl font-black"
                      style={{
                        background: "linear-gradient(270deg, #ff69b4, #00ffff, #ff00ff, #87ceeb, #ff69b4)",
                        backgroundSize: "300% 300%",
                        animation: "rainbow-shift 3s ease infinite",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      IRIDESCENT
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "'Courier New', monospace" }}>Chrome Text</p>
                    <p
                      className="text-3xl font-black chrome-text"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      METALLIC
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "'Courier New', monospace" }}>Pink Gradient</p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        background: "linear-gradient(90deg, #ff69b4, #ff1493, #c084fc)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      HOT PINK
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: "'Courier New', monospace" }}>Cyan Glow</p>
                    <p
                      className="text-xl font-bold"
                      style={{
                        color: "#00ffff",
                        textShadow: "0 0 12px rgba(0,255,255,0.5)",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      ELECTRIC BLUE
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TABS — interactive                                                   */}
      {/* ================================================================== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-[0.4em] uppercase text-purple-500 mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Interactive
            </p>
            <h2
              className="text-4xl font-black"
              style={{
                background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              My Profile
            </h2>
            <p className="text-gray-500 mt-2">Navigate your digital world</p>
          </RevealBlock>

          <RevealBlock delay={0.08}>
            <div
              className="p-8 rounded-3xl border border-white/60 backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(192,192,192,0.2))",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              {/* Tab bar */}
              <div
                className="flex gap-2 p-1.5 rounded-full mb-6"
                style={{ background: "rgba(255,255,255,0.5)" }}
              >
                {tabs.map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(idx)}
                    className="flex-1 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300"
                    style={{
                      fontFamily: "'Courier New', monospace",
                      background:
                        activeTab === idx
                          ? "linear-gradient(135deg, #ff69b4, #c084fc)"
                          : "transparent",
                      color: activeTab === idx ? "#ffffff" : "#6b7280",
                      boxShadow:
                        activeTab === idx
                          ? "0 4px 14px rgba(255,105,180,0.35)"
                          : "none",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div
                className="min-h-[120px] p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.4)" }}
              >
                {activeTab === 0 && (
                  <div>
                    <h4
                      className="text-lg font-bold mb-3"
                      style={{
                        background: "linear-gradient(90deg, #ff69b4, #c084fc)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      &#9834; Your Playlist
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Pop Hits 2000", "Dance Mix", "Chill Vibes", "Y2K Anthems", "Millennium Bangers"].map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 rounded-full text-xs font-medium text-purple-600"
                          style={{
                            background: "linear-gradient(135deg, rgba(255,105,180,0.15), rgba(192,132,252,0.15))",
                            border: "1px solid rgba(192,132,252,0.3)",
                            fontFamily: "'Courier New', monospace",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 1 && (
                  <div>
                    <h4
                      className="text-lg font-bold mb-3"
                      style={{
                        background: "linear-gradient(90deg, #00ffff, #c084fc)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      &#128247; Photo Albums
                    </h4>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: "'Courier New', monospace" }}>
                      128 photos across 5 albums. Last upload: today! Memory card 85% full.
                    </p>
                  </div>
                )}
                {activeTab === 2 && (
                  <div>
                    <h4
                      className="text-lg font-bold mb-3"
                      style={{
                        background: "linear-gradient(90deg, #c084fc, #ff69b4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      &#128101; Friend List
                    </h4>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: "'Courier New', monospace" }}>
                      2,847 friends online. 42 new requests! You are very popular ✦
                    </p>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PROGRESS + TOGGLES                                                   */}
      {/* ================================================================== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Progress */}
          <RevealBlock delay={0.05}>
            <div
              className="p-8 rounded-3xl border border-white/60 backdrop-blur-sm h-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,105,180,0.1))",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase text-pink-500 mb-6"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Progress Bars
              </p>
              <div className="space-y-7">
                <div>
                  <div className="flex justify-between mb-2">
                    <span
                      className="text-sm font-bold"
                      style={{
                        background: "linear-gradient(90deg, #ff69b4, #c084fc)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      Profile Complete
                    </span>
                    <span className="text-sm font-bold text-purple-500" style={{ fontFamily: "'Courier New', monospace" }}>
                      {progress}%
                    </span>
                  </div>
                  <div
                    className="h-5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.6)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                        boxShadow: "0 2px 8px rgba(255,105,180,0.4)",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-pink-500" style={{ fontFamily: "'Courier New', monospace" }}>Popularity</span>
                    <span className="text-sm font-bold text-pink-500" style={{ fontFamily: "'Courier New', monospace" }}>85%</span>
                  </div>
                  <div
                    className="h-5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.6)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}
                  >
                    <div
                      className="h-full w-[85%] rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #ff69b4, #ff1493)",
                        boxShadow: "0 2px 8px rgba(255,105,180,0.4)",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-cyan-500" style={{ fontFamily: "'Courier New', monospace" }}>Chrome Level</span>
                    <span className="text-sm font-bold text-cyan-500" style={{ fontFamily: "'Courier New', monospace" }}>62%</span>
                  </div>
                  <div
                    className="h-5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.6)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}
                  >
                    <div
                      className="h-full w-[62%] rounded-full"
                      style={{
                        background: "linear-gradient(90deg, #c0c0c0, #ffffff, #a0a0a0)",
                        boxShadow: "0 2px 8px rgba(192,192,192,0.5)",
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                    className="px-5 py-2 text-sm text-white font-bold rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #ff69b4, #c084fc)",
                      boxShadow: "0 3px 12px rgba(255,105,180,0.3)",
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    -10%
                  </button>
                  <button
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                    className="px-5 py-2 text-sm text-white font-bold rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #00ffff, #c084fc)",
                      boxShadow: "0 3px 12px rgba(0,255,255,0.3)",
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    +10%
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Toggles */}
          <RevealBlock delay={0.12}>
            <div
              className="p-8 rounded-3xl border border-white/60 backdrop-blur-sm h-full"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(192,132,252,0.1))",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase text-purple-500 mb-6"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Toggles
              </p>
              <div className="space-y-6">
                {[
                  { label: "Party Mode", emoji: "&#127881;" },
                  { label: "Dark Theme", emoji: "&#127774;" },
                  { label: "Notifications", emoji: "&#128276;" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span
                      className="text-gray-700 font-medium text-sm flex items-center gap-2"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      <span dangerouslySetInnerHTML={{ __html: item.emoji }} />
                      {item.label}
                    </span>
                    <button
                      onClick={() => {
                        const next = [...toggleStates];
                        next[idx] = !next[idx];
                        setToggleStates(next);
                      }}
                      className="relative w-14 h-8 rounded-full transition-all duration-300"
                      style={{
                        background: toggleStates[idx]
                          ? "linear-gradient(135deg, #ff69b4, #c084fc)"
                          : "#e5e7eb",
                        boxShadow: toggleStates[idx]
                          ? "0 0 14px rgba(255,105,180,0.4)"
                          : "none",
                      }}
                    >
                      <span
                        className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300"
                        style={{
                          left: toggleStates[idx] ? "calc(100% - 28px)" : "4px",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Badge / pill section */}
              <div className="mt-8 pt-6 border-t border-white/40">
                <p
                  className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  Badges
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #ff69b4, #c084fc)",
                      boxShadow: "0 4px 12px rgba(255,105,180,0.4)",
                    }}
                  >
                    5
                  </span>
                  <span
                    className="px-4 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase tracking-wide"
                    style={{
                      background: "linear-gradient(135deg, #00ffff, #c084fc)",
                      boxShadow: "0 3px 10px rgba(0,255,255,0.4)",
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    New
                  </span>
                  <span
                    className="px-4 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase tracking-wide"
                    style={{
                      background: "linear-gradient(135deg, #ff69b4, #ff1493)",
                      boxShadow: "0 3px 10px rgba(255,105,180,0.4)",
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    VIP
                  </span>
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #e8e8e8, #ffffff, #c0c0c0)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      boxShadow: "inset 0 2px 3px rgba(255,255,255,0.9)",
                    }}
                  >
                    99
                  </span>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================== */}
      {/* STAT CARDS                                                           */}
      {/* ================================================================== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-[0.4em] uppercase text-cyan-400 mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Metrics
            </p>
            <h2
              className="text-4xl font-black"
              style={{
                background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stats &amp; Metrics
            </h2>
            <p className="text-gray-500 mt-2">Futuristic data display — millennium dashboard</p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: "Friends", value: "2,847", icon: "&#128101;", gradient: "from-pink-400 to-purple-400", glow: "rgba(255,105,180,0.3)" },
              { label: "Vibes", value: "+420%", icon: "&#128200;", gradient: "from-purple-400 to-cyan-400", glow: "rgba(192,132,252,0.3)" },
              { label: "Views", value: "1.2M", icon: "&#128065;", gradient: "from-cyan-400 to-lime-400", glow: "rgba(0,255,255,0.3)" },
              { label: "Messages", value: "8,921", icon: "&#128172;", gradient: "from-lime-400 to-pink-400", glow: "rgba(50,205,50,0.2)" },
            ].map((stat, i) => (
              <RevealBlock key={stat.label} delay={i * 0.07}>
                <div
                  className="group p-6 rounded-3xl border border-white/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.35))",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${stat.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)";
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      backgroundImage: `linear-gradient(135deg, ${stat.gradient.replace("from-", "").replace("-400 to-", " to ").replace("-400", "")})`,
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: stat.icon }} />
                  </div>
                  <p
                    className="text-3xl font-black mb-1"
                    style={{
                      background: `linear-gradient(90deg, #ff69b4, #c084fc)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "'Courier New', monospace" }}
                  >
                    {stat.label}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PHILOSOPHY / ABOUT SECTION                                           */}
      {/* ================================================================== */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-[0.4em] uppercase text-pink-500 mb-2"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              Philosophy
            </p>
            <h2
              className="text-4xl font-black"
              style={{
                background: "linear-gradient(90deg, #ff69b4, #c084fc, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              About Y2K
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "&#9889;",
                title: "Futuristic Optimism",
                desc: "The dawn of the digital age — an era of boundless optimism for the millennium. Technology was magic, the internet was infinite.",
                grad: "from-pink-400 to-purple-400",
              },
              {
                icon: "&#10024;",
                title: "Metallic Surfaces",
                desc: "Silver, chrome, and iridescent finishes dominated — every surface reflected a glittering, optimistic future in polished alloy.",
                grad: "from-purple-400 to-cyan-400",
              },
              {
                icon: "&#127752;",
                title: "Rainbow Holographics",
                desc: "Holographic foil, rainbow refractions, and iridescent gradients were the signatures of a generation obsessed with light and color.",
                grad: "from-cyan-400 to-pink-400",
              },
            ].map((item, i) => (
              <RevealBlock key={item.title} delay={i * 0.1}>
                <div
                  className="group p-8 rounded-3xl border border-white/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,105,180,0.15)]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.35))",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, ${item.grad.includes("pink") ? "#ff69b4" : item.grad.includes("cyan") ? "#00ffff" : "#c084fc"}, ${item.grad.includes("purple") ? "#c084fc" : item.grad.includes("pink") ? "#ff69b4" : "#00ffff"})`,
                      boxShadow: "0 6px 20px rgba(255,105,180,0.3)",
                    }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{
                      background: "linear-gradient(90deg, #ff69b4, #c084fc)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* "UNDER CONSTRUCTION" NOSTALGIA BAND                                  */}
      {/* ================================================================== */}
      <section className="relative z-10 py-6 px-6">
        <RevealBlock>
          <div
            className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-white/40"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(192,192,192,0.3))",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {/* Yellow-black stripe header */}
            <div
              className="h-3"
              style={{
                background: "repeating-linear-gradient(45deg, #ff69b4 0px, #ff69b4 10px, #fff 10px, #fff 20px)",
              }}
            />
            <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span
                  className="text-3xl blink-star"
                  style={{ animationDuration: "0.8s" }}
                >
                  &#128679;
                </span>
                <div>
                  <p
                    className="font-black text-gray-700 tracking-widest uppercase text-sm"
                    style={{ fontFamily: "'Courier New', monospace" }}
                  >
                    Under Construction
                  </p>
                  <p
                    className="text-xs text-gray-500 mt-0.5"
                    style={{ fontFamily: "'Courier New', monospace" }}
                  >
                    This page is best viewed in 800x600 resolution ✦ IE 6.0
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-bold text-pink-500 tracking-widest"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  ★ NETSCAPE COMPATIBLE ★
                </span>
              </div>
            </div>
            {/* Bottom stripe */}
            <div
              className="h-3"
              style={{
                background: "repeating-linear-gradient(-45deg, #00ffff 0px, #00ffff 10px, #fff 10px, #fff 20px)",
              }}
            />
          </div>
        </RevealBlock>
      </section>

      {/* ================================================================== */}
      {/* 7. FOOTER                                                            */}
      {/* ================================================================== */}
      <footer
        className="relative z-10 pt-16 pb-10 px-6"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.7))",
        }}
      >
        {/* Holographic divider */}
        <div
          className="max-w-6xl mx-auto h-px mb-12 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #ff69b4, #c084fc, #00ffff, transparent)",
          }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-pink-400 blink-star">✦</span>
                <span
                  className="font-black text-2xl chrome-text"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  Y2K
                </span>
                <span className="text-cyan-400 blink-star" style={{ animationDelay: "0.5s" }}>✦</span>
              </div>
              <p
                className="text-sm text-gray-500 leading-relaxed"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Celebrating the optimistic vision of the year 2000 — chrome, iridescent, bubbly, and bright.
              </p>
            </div>

            {/* Keywords */}
            <div>
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Keywords
              </p>
              <div className="flex flex-wrap gap-2">
                {["Y2K", "千禧", "未来主义", "金属", "透明", "气泡", "2000年代"].map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-full text-xs text-gray-600"
                    style={{
                      background: "rgba(192,192,192,0.25)",
                      border: "1px solid rgba(192,192,192,0.4)",
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <p
                className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                StyleKit
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/styles"
                  className="text-sm text-gray-500 hover:text-pink-500 transition-colors"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  &#8594; All Styles
                </Link>
                <Link
                  href="/styles/y2k"
                  className="text-sm text-gray-500 hover:text-cyan-500 transition-colors"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  &#8594; Y2K Docs
                </Link>
                <Link
                  href="/"
                  className="text-sm text-gray-500 hover:text-purple-500 transition-colors"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  &#8594; StyleKit Home
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-pink-300/60 blink-star">✦</span>
              <span className="text-gray-400 text-xs" style={{ fontFamily: "'Courier New', monospace" }}>
                Part of the{" "}
                <Link href="/" className="text-pink-500 hover:text-pink-600 transition-colors font-medium">
                  StyleKit
                </Link>{" "}
                Design System Collection
              </span>
              <span className="text-cyan-300/60 blink-star" style={{ animationDelay: "0.7s" }}>✦</span>
            </div>
            <p
              className="text-gray-300 text-xs"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              The Future is Bright and Shiny &#x2022; Est. Year 2000
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
