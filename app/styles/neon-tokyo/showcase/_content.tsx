"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                        */
/* ------------------------------------------------------------------ */

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
      { threshold: 0.15, ...options },
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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Rain SVG overlay                                                    */
/* ------------------------------------------------------------------ */

function RainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 28 }).map((_, i) => {
        const x = (i / 28) * 100;
        const delay = (i * 0.17) % 1.4;
        const opacity = 0.04 + (i % 5) * 0.015;
        return (
          <line
            key={i}
            x1={`${x}%`}
            y1="0%"
            x2={`${x + 0.3}%`}
            y2="100%"
            stroke="#00f0ff"
            strokeWidth="0.5"
            strokeOpacity={opacity}
            style={{
              animationName: "rainFall",
              animationDuration: `${1.2 + (i % 4) * 0.3}s`,
              animationDelay: `${delay}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Neon glow dot                                                       */
/* ------------------------------------------------------------------ */

function NeonDot({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 6px 2px ${color}99`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const NEON_COLORS = [
  {
    name: "Neon Pink",
    jp: "ピンク",
    hex: "#ff1493",
    rgb: "255, 20, 147",
    desc: "The heartbeat of Kabukicho. Deep magenta-pink neon that bleeds warm halos across wet asphalt.",
  },
  {
    name: "Midnight Blue-Black",
    jp: "深夜",
    hex: "#0a0a1a",
    rgb: "10, 10, 26",
    desc: "The base canvas — not pure black, but a bruised midnight that still holds the memory of color.",
  },
  {
    name: "Cyan Neon",
    jp: "水色",
    hex: "#00f0ff",
    rgb: "0, 240, 255",
    desc: "Cold light from pachinko parlors and vending machines. The cool counterpart to orange warmth.",
  },
  {
    name: "Orange Neon",
    jp: "橙色",
    hex: "#ff6b00",
    rgb: "255, 107, 0",
    desc: "Yakitori stall lanterns, ramen sign warmth. The intimate orange that makes midnight feel alive.",
  },
  {
    name: "Purple Neon",
    jp: "紫色",
    hex: "#bc13fe",
    rgb: "188, 19, 254",
    desc: "The color of karaoke bars and late-night host clubs. Electric violet bleeding into the sky.",
  },
];

const COMPONENT_TABS = [
  { id: "pink", label: "Pink / ピンク", color: "#ff1493", shadow: "rgba(255,20,147,0.5)" },
  { id: "cyan", label: "Cyan / シアン", color: "#00f0ff", shadow: "rgba(0,240,255,0.5)" },
  { id: "orange", label: "Orange / 橙", color: "#ff6b00", shadow: "rgba(255,107,0,0.5)" },
];

const DO_LIST = [
  "Deep midnight background — never white, never grey",
  "Neon text-shadow glow on headings and key labels",
  "Alternating neon borders: pink, cyan, orange, purple",
  "Japanese katakana / kanji as decorative backdrop text",
  "Vertical rain-line SVG overlays on dark panels",
  "Stacked layered sign-like text blocks in the hero",
  "Mixed warm (orange) and cool (cyan, blue) neons side by side",
  "Hover neon intensification with box-shadow bloom",
];

const DONT_LIST = [
  "No white or light-coloured backgrounds",
  "No pastel or soft-tinted colours",
  "No corporate professional look and feel",
  "No minimalist empty layouts or wide whitespace",
  "No single-colour neon — always layer warm + cool",
  "No rounded pill buttons — prefer sharp or slight radius",
  "No stock photo imagery — mood is abstract and urban",
  "No heavy gradients that obscure the dark base",
];

const NIGHT_LOCATIONS = [
  {
    district: "歌舞伎町",
    name: "Kabukicho Alley",
    desc: "Pink neon kanji stack four storeys high. Hostess bars and izakayas crowd every centimetre of vertical space. The air smells like yakitori smoke and rain.",
    color: "#ff1493",
    border: "border-[#ff1493]/30",
    hover: "hover:border-[#ff1493]/70",
    glow: "rgba(255,20,147,0.2)",
  },
  {
    district: "新宿",
    name: "Shinjuku Station West",
    desc: "Cyan light floods from the electronics storefronts. Salary-men walk briskly past six-storey LED displays. The puddles on the concourse mirror everything.",
    color: "#00f0ff",
    border: "border-[#00f0ff]/30",
    hover: "hover:border-[#00f0ff]/70",
    glow: "rgba(0,240,255,0.2)",
  },
  {
    district: "渋谷",
    name: "Shibuya Scramble",
    desc: "A thousand umbrellas bloom at red lights. Orange konbini glow mixes with purple club signs overhead. Every crossing is a painting that resets every two minutes.",
    color: "#ff6b00",
    border: "border-[#ff6b00]/30",
    hover: "hover:border-[#ff6b00]/70",
    glow: "rgba(255,107,0,0.2)",
  },
  {
    district: "中野",
    name: "Nakano Broadway",
    desc: "Quieter than Akihabara but no less electric. Purple neon threads between retro manga shops. The otaku hour begins at midnight when the last shutters half-close.",
    color: "#bc13fe",
    border: "border-[#bc13fe]/30",
    hover: "hover:border-[#bc13fe]/70",
    glow: "rgba(188,19,254,0.2)",
  },
];

const TYPE_SPECIMENS = [
  {
    label: "Display / 見出し",
    size: "text-5xl md:text-7xl",
    weight: "font-black",
    color: "#ff1493",
    shadow: "0 0 30px rgba(255,20,147,0.5), 0 0 60px rgba(255,20,147,0.2)",
    sample: "霓虹",
    sublabel: "NEON PINK — Display heading",
  },
  {
    label: "Heading / タイトル",
    size: "text-3xl md:text-4xl",
    weight: "font-bold",
    color: "#00f0ff",
    shadow: "0 0 20px rgba(0,240,255,0.5)",
    sample: "TOKYO NIGHTS",
    sublabel: "CYAN NEON — Section heading",
  },
  {
    label: "Subheading / 副題",
    size: "text-xl md:text-2xl",
    weight: "font-bold",
    color: "#ff6b00",
    shadow: "0 0 15px rgba(255,107,0,0.5)",
    sample: "After Midnight Rain",
    sublabel: "ORANGE NEON — Subheading",
  },
  {
    label: "Body / 本文",
    size: "text-base",
    weight: "font-normal",
    color: "#c0b8d0",
    shadow: "none",
    sample: "Rain-slicked streets hold the memory of every neon sign that ever burned above them. Tokyo never truly sleeps; it only dims.",
    sublabel: "MUTED LAVENDER-GREY — Body copy",
  },
  {
    label: "Label / ラベル",
    size: "text-xs",
    weight: "font-bold",
    color: "#bc13fe",
    shadow: "0 0 8px rgba(188,19,254,0.6)",
    sample: "KABUKICHO · 23:47 · SECTOR-7",
    sublabel: "PURPLE NEON — Metadata / labels",
  },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(65);

  const { ref: heroRef, inView: heroInView } = useInView();

  function handleToggle(index: number) {
    setToggleStates((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const activeColor = COMPONENT_TABS[activeTab];

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      {/* Rain animation keyframes */}
      <style>{`
        @keyframes rainFall {
          0%   { transform: translateY(-10%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes neonPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.82; }
        }
        @keyframes flickerIn {
          0%   { opacity: 0; }
          20%  { opacity: 0.85; }
          25%  { opacity: 0.2; }
          30%  { opacity: 0.9; }
          35%  { opacity: 0.3; }
          40%  { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes signFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>

      {/* ---------------------------------------------------------------- */}
      {/* 1. NAV                                                            */}
      {/* ---------------------------------------------------------------- */}
      <nav className="sticky top-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-md border-b border-[#ff1493]/20 px-6 py-4 overflow-hidden">
        {/* Japanese backdrop characters */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center gap-12 pointer-events-none select-none overflow-hidden"
        >
          {["東", "京", "夜", "光", "雨", "霓", "虹"].map((char, i) => (
            <span
              key={i}
              className="text-4xl font-black text-[#ff1493]/[0.04] tracking-widest"
            >
              {char}
            </span>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto flex items-center justify-between">
          {/* Left — back to style page */}
          <Link
            href="/styles/neon-tokyo"
            className="flex items-center gap-2 text-[#c0b8d0] hover:text-[#ff1493] transition-colors duration-300 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-bold tracking-widest uppercase hidden sm:inline">Back</span>
          </Link>

          {/* Center — identity */}
          <div className="flex items-center gap-3">
            {/* Neon sign icon */}
            <div className="flex gap-1 items-end">
              <NeonDot color="#ff1493" />
              <NeonDot color="#00f0ff" />
              <NeonDot color="#ff6b00" />
            </div>
            <div className="flex flex-col items-center leading-none">
              <span
                className="text-xs font-bold tracking-[0.4em] text-[#bc13fe] uppercase"
                style={{ textShadow: "0 0 8px rgba(188,19,254,0.6)" }}
              >
                霓虹東京
              </span>
              <span
                className="text-lg font-black tracking-widest text-[#ff1493] uppercase"
                style={{
                  textShadow: "0 0 12px rgba(255,20,147,0.7), 0 0 25px rgba(255,20,147,0.3)",
                  animation: "neonPulse 3s ease-in-out infinite",
                }}
              >
                NEON TOKYO
              </span>
            </div>
          </div>

          {/* Right — StyleKit link */}
          <Link
            href="/"
            className="group px-4 py-2 text-sm font-bold uppercase tracking-widest border border-[#00f0ff]/40 text-[#00f0ff] rounded-sm hover:border-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300"
            style={{ textShadow: "0 0 6px rgba(0,240,255,0.4)" }}
          >
            StyleKit
            <span className="ml-1 group-hover:translate-x-0.5 inline-block transition-transform duration-200">
              →
            </span>
          </Link>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* 2. HERO                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-b from-[#0a0a1a] to-[#12041e]">
        {/* Rain overlay */}
        <RainOverlay />

        {/* Radial neon floor glow */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, rgba(255,20,147,0.18) 0%, rgba(0,240,255,0.08) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Large Japanese characters behind */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="text-[22rem] font-black leading-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,20,147,0.07)",
              letterSpacing: "-0.05em",
            }}
          >
            東京
          </span>
        </div>

        {/* Hero content */}
        <div
          ref={heroRef}
          className="relative z-10 w-full max-w-4xl mx-auto text-center"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* District label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#ff1493]/60" />
            <span
              className="text-xs font-bold tracking-[0.5em] uppercase text-[#00f0ff]"
              style={{ textShadow: "0 0 8px rgba(0,240,255,0.6)" }}
            >
              Kabukicho · After Dark
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#ff1493]/60" />
          </div>

          {/* Stacked billboard-style sign lines */}
          <div
            className="mb-6 inline-block text-left"
            style={{ animation: "signFloat 6s ease-in-out infinite" }}
          >
            {/* Sign line 1 — orange warm neon */}
            <div
              className="block text-[#ff6b00] font-black text-2xl md:text-4xl tracking-[0.3em] uppercase mb-1 px-3 py-1 border border-[#ff6b00]/30 bg-[#ff6b00]/5"
              style={{
                textShadow: "0 0 12px rgba(255,107,0,0.7), 0 0 30px rgba(255,107,0,0.3)",
                boxShadow: "0 0 20px rgba(255,107,0,0.1), inset 0 0 20px rgba(255,107,0,0.05)",
              }}
            >
              ラーメン・カラオケ
            </div>
            {/* Sign line 2 — huge pink main title */}
            <div
              className="block font-black text-5xl md:text-8xl tracking-tight leading-none"
              style={{
                color: "#ff1493",
                textShadow:
                  "0 0 20px rgba(255,20,147,0.9), 0 0 50px rgba(255,20,147,0.5), 0 0 100px rgba(255,20,147,0.2)",
                animation: "flickerIn 0.8s ease-out both",
              }}
            >
              NEON
            </div>
            {/* Sign line 3 — cyan secondary */}
            <div
              className="block font-black text-5xl md:text-8xl tracking-tight leading-none"
              style={{
                color: "#00f0ff",
                textShadow:
                  "0 0 20px rgba(0,240,255,0.9), 0 0 50px rgba(0,240,255,0.5), 0 0 100px rgba(0,240,255,0.2)",
              }}
            >
              TOKYO
            </div>
            {/* Sign line 4 — purple small */}
            <div
              className="block text-[#bc13fe] font-bold text-xl md:text-3xl tracking-[0.4em] uppercase mt-1 px-3 py-1 border border-[#bc13fe]/30 bg-[#bc13fe]/5"
              style={{
                textShadow: "0 0 12px rgba(188,19,254,0.7)",
                boxShadow: "0 0 20px rgba(188,19,254,0.1), inset 0 0 20px rgba(188,19,254,0.05)",
              }}
            >
              夜の都市
            </div>
          </div>

          {/* Subtitle */}
          <p className="mt-8 max-w-xl mx-auto text-base md:text-lg text-[#c0b8d0] leading-relaxed">
            Rain-slicked streets. Layered signage bleeding warm and cool neon.
            The electric intimacy of a city that never truly sleeps.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-4 items-center justify-center mt-10">
            <button
              className="group px-8 py-3.5 bg-transparent border-2 border-[#ff1493] text-[#ff1493] font-black uppercase tracking-widest text-sm rounded-sm transition-all duration-300"
              style={{
                boxShadow: "0 0 15px rgba(255,20,147,0.4), inset 0 0 15px rgba(255,20,147,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 35px rgba(255,20,147,0.7), inset 0 0 25px rgba(255,20,147,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 15px rgba(255,20,147,0.4), inset 0 0 15px rgba(255,20,147,0.1)";
              }}
            >
              Enter the Night
            </button>
            <button
              className="px-8 py-3.5 bg-[#ff1493] text-white font-black uppercase tracking-widest text-sm rounded-sm transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(255,20,147,0.5)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(255,20,147,0.8)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,20,147,0.5)";
              }}
            >
              Explore Style
            </button>
          </div>

          {/* Neon dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {["#ff1493", "#00f0ff", "#ff6b00", "#bc13fe"].map((c, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: c, boxShadow: `0 0 5px 1px ${c}aa` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. COMPONENT DEMOS                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0a0a1a]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="mb-3">
              <span
                className="text-xs font-bold tracking-[0.4em] uppercase text-[#bc13fe]"
                style={{ textShadow: "0 0 8px rgba(188,19,254,0.6)" }}
              >
                コンポーネント
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-white mb-2"
              style={{ textShadow: "0 0 20px rgba(255,20,147,0.3)" }}
            >
              Component Demos
            </h2>
            <p className="text-sm text-[#c0b8d0] mb-10 max-w-lg">
              Three neon themes — pink, cyan, orange — each telling a different story from the same midnight street.
            </p>
          </RevealBlock>

          {/* Tab selector */}
          <RevealBlock delay={0.1}>
            <div className="flex gap-1 mb-8 border-b border-[#ff1493]/15 pb-0">
              {COMPONENT_TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(i)}
                  className="px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 border-b-2 -mb-px"
                  style={{
                    color: activeTab === i ? tab.color : "#6b7280",
                    borderBottomColor: activeTab === i ? tab.color : "transparent",
                    textShadow: activeTab === i ? `0 0 8px ${tab.shadow}` : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Button demo */}
            <RevealBlock delay={0.15} className="h-full">
              <div
                className="h-full p-6 bg-[#0e0e24] rounded-sm border transition-all duration-300 flex flex-col gap-5"
                style={{ borderColor: `${activeColor.color}33` }}
              >
                <div>
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.4em]"
                    style={{
                      color: activeColor.color,
                      textShadow: `0 0 8px ${activeColor.shadow}`,
                    }}
                  >
                    Buttons / ボタン
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {/* Outline */}
                  <button
                    className="w-full py-3 text-sm font-black uppercase tracking-widest rounded-sm border-2 transition-all duration-300"
                    style={{
                      borderColor: activeColor.color,
                      color: activeColor.color,
                      boxShadow: `0 0 14px ${activeColor.shadow}, inset 0 0 14px ${activeColor.color}18`,
                      textShadow: `0 0 8px ${activeColor.shadow}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 0 30px ${activeColor.shadow}, inset 0 0 22px ${activeColor.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 0 14px ${activeColor.shadow}, inset 0 0 14px ${activeColor.color}18`;
                    }}
                  >
                    Enter
                  </button>
                  {/* Filled */}
                  <button
                    className="w-full py-3 text-sm font-black uppercase tracking-widest rounded-sm transition-all duration-300 text-[#0a0a1a]"
                    style={{
                      backgroundColor: activeColor.color,
                      boxShadow: `0 0 20px ${activeColor.shadow}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 0 40px ${activeColor.shadow}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 0 20px ${activeColor.shadow}`;
                    }}
                  >
                    Explore
                  </button>
                  {/* Ghost */}
                  <button
                    className="w-full py-3 text-sm font-bold uppercase tracking-widest rounded-sm border border-gray-700 text-gray-600 cursor-not-allowed"
                  >
                    Offline
                  </button>
                </div>
              </div>
            </RevealBlock>

            {/* Card demo */}
            <RevealBlock delay={0.2} className="h-full">
              <div
                className="group h-full p-6 bg-[#0e0e24] rounded-sm border transition-all duration-300 relative overflow-hidden"
                style={{ borderColor: `${activeColor.color}33` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${activeColor.shadow}`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${activeColor.color}99`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.borderColor = `${activeColor.color}33`;
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                  style={{
                    backgroundColor: activeColor.color,
                    opacity: 0.06,
                    filter: "blur(20px)",
                  }}
                />
                <div
                  className="text-[10px] font-black uppercase tracking-[0.4em] mb-4"
                  style={{
                    color: activeColor.color,
                    textShadow: `0 0 8px ${activeColor.shadow}`,
                  }}
                >
                  Card / カード
                </div>
                <div className="flex gap-1 mb-4">
                  {["#ff1493", "#00f0ff", "#ff6b00"].map((c, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: c, boxShadow: `0 0 5px 1px ${c}aa` }}
                    />
                  ))}
                </div>
                <h3
                  className="text-lg font-black text-white mb-2"
                  style={{
                    textShadow: `0 0 10px ${activeColor.shadow}`,
                  }}
                >
                  Midnight Alley
                </h3>
                <p className="text-xs text-[#c0b8d0] leading-relaxed">
                  Neon signs flicker above rain-slicked streets, casting liquid colour across the pavement in fractured reflections.
                </p>
                <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: `${activeColor.color}20` }}>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">23:47 · 歌舞伎町</span>
                  <span
                    className="text-[10px] font-black uppercase tracking-wider"
                    style={{ color: activeColor.color }}
                  >
                    View →
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* Input demo */}
            <RevealBlock delay={0.25} className="h-full">
              <div
                className="h-full p-6 bg-[#0e0e24] rounded-sm border transition-all duration-300 flex flex-col gap-4"
                style={{ borderColor: `${activeColor.color}33` }}
              >
                <div
                  className="text-[10px] font-black uppercase tracking-[0.4em]"
                  style={{
                    color: activeColor.color,
                    textShadow: `0 0 8px ${activeColor.shadow}`,
                  }}
                >
                  Input / 入力
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label
                      className="block text-[10px] font-black uppercase tracking-[0.3em] mb-1.5"
                      style={{ color: activeColor.color }}
                    >
                      Handle
                    </label>
                    <input
                      type="text"
                      placeholder="Street name..."
                      className="w-full px-3 py-2.5 bg-[#0a0a1a]/80 text-white text-sm placeholder-gray-700 rounded-sm outline-none border transition-all duration-300"
                      style={{ borderColor: `${activeColor.color}40` }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = activeColor.color;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${activeColor.shadow}`;
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${activeColor.color}40`;
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[10px] font-black uppercase tracking-[0.3em] mb-1.5"
                      style={{ color: activeColor.color }}
                    >
                      Frequency
                    </label>
                    <input
                      type="email"
                      placeholder="signal@neon.tokyo"
                      className="w-full px-3 py-2.5 bg-[#0a0a1a]/80 text-white text-sm placeholder-gray-700 rounded-sm outline-none border transition-all duration-300"
                      style={{ borderColor: `${activeColor.color}40` }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = activeColor.color;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${activeColor.shadow}`;
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${activeColor.color}40`;
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <button
                    className="w-full py-2.5 text-xs font-black uppercase tracking-widest rounded-sm transition-all duration-300 text-[#0a0a1a]"
                    style={{
                      backgroundColor: activeColor.color,
                      boxShadow: `0 0 16px ${activeColor.shadow}`,
                    }}
                  >
                    Transmit
                  </button>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Glow intensity slider */}
          <RevealBlock delay={0.3} className="mt-8">
            <div
              className="p-6 bg-[#0e0e24] rounded-sm border border-[#ff1493]/20"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#ff6b00]" style={{ textShadow: "0 0 6px rgba(255,107,0,0.5)" }}>
                  Neon Intensity / ネオン強度
                </span>
                <span
                  className="text-sm font-black font-mono text-[#ff1493]"
                  style={{ textShadow: "0 0 8px rgba(255,20,147,0.6)" }}
                >
                  {glowIntensity}%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-[#1a1a2e] rounded-sm relative">
                  <div
                    className="h-full rounded-sm transition-all duration-200"
                    style={{
                      width: `${glowIntensity}%`,
                      background: "linear-gradient(to right, #ff1493, #bc13fe)",
                      boxShadow: "0 0 10px rgba(255,20,147,0.5)",
                    }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={glowIntensity}
                    onChange={(e) => setGlowIntensity(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGlowIntensity((v) => Math.max(0, v - 10))}
                    className="px-3 py-1.5 text-xs font-bold border border-gray-700 text-gray-400 rounded-sm hover:border-[#ff1493] hover:text-[#ff1493] transition-all duration-200 uppercase tracking-wider"
                  >
                    Dim
                  </button>
                  <button
                    onClick={() => setGlowIntensity((v) => Math.min(100, v + 10))}
                    className="px-3 py-1.5 text-xs font-bold bg-[#ff1493] text-white rounded-sm transition-all duration-200 uppercase tracking-wider"
                    style={{ boxShadow: "0 0 12px rgba(255,20,147,0.4)" }}
                  >
                    Amplify
                  </button>
                </div>
              </div>

              {/* Channel bars */}
              <div className="grid grid-cols-4 gap-3 mt-5">
                {[
                  { label: "Pink", color: "#ff1493", val: glowIntensity },
                  { label: "Cyan", color: "#00f0ff", val: Math.min(100, glowIntensity + 15) },
                  { label: "Orange", color: "#ff6b00", val: Math.max(0, glowIntensity - 20) },
                  { label: "Purple", color: "#bc13fe", val: Math.min(100, glowIntensity + 5) },
                ].map((ch) => (
                  <div key={ch.label}>
                    <div className="h-1.5 bg-[#1a1a2e] rounded-sm overflow-hidden">
                      <div
                        className="h-full rounded-sm transition-all duration-200"
                        style={{
                          width: `${ch.val}%`,
                          backgroundColor: ch.color,
                          boxShadow: ch.val > 0 ? `0 0 6px ${ch.color}99` : "none",
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1 text-center font-mono">{ch.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. COLOR PALETTE                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#12041e] to-[#0a0a1a] relative overflow-hidden">
        {/* Decorative kanji bg */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-48 flex flex-col justify-center items-center gap-4 pointer-events-none select-none"
        >
          {["色", "光", "電", "虹", "夜"].map((ch, i) => (
            <span
              key={i}
              className="text-8xl font-black leading-none"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,20,147,0.05)",
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative">
          <RevealBlock>
            <span
              className="text-xs font-black tracking-[0.4em] uppercase text-[#00f0ff]"
              style={{ textShadow: "0 0 8px rgba(0,240,255,0.5)" }}
            >
              カラーパレット
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-white mt-2 mb-3"
              style={{ textShadow: "0 0 20px rgba(0,240,255,0.2)" }}
            >
              Color Palette
            </h2>
            <p className="text-sm text-[#c0b8d0] mb-12 max-w-md">
              Five neon frequencies, each sourced from a real corner of Tokyo's night geography.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-5 gap-4">
            {NEON_COLORS.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.07} className="h-full">
                <div
                  className="group h-full flex flex-col rounded-sm overflow-hidden border border-white/5 transition-all duration-400 cursor-default"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color.hex}55`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${color.hex}55`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  {/* Colour swatch */}
                  <div
                    className="h-28 w-full relative flex items-end p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at 50% 30%, ${color.hex}ff, ${color.hex}cc)`,
                        boxShadow: `inset 0 0 30px rgba(255,255,255,0.1)`,
                      }}
                    />
                    <span
                      className="relative z-10 text-xl font-black leading-none"
                      style={{
                        color: color.hex === "#0a0a1a" ? "#ff1493" : "#0a0a1a",
                        textShadow:
                          color.hex === "#0a0a1a"
                            ? "0 0 10px rgba(255,20,147,0.8)"
                            : "0 1px 0 rgba(0,0,0,0.3)",
                      }}
                    >
                      {color.jp}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4 bg-[#0e0e24]">
                    <p className="text-xs font-black text-white mb-0.5">{color.name}</p>
                    <p
                      className="text-[10px] font-mono mb-2"
                      style={{ color: color.hex === "#0a0a1a" ? "#ff1493" : color.hex }}
                    >
                      {color.hex}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{color.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Horizontal neon gradient bar */}
          <RevealBlock delay={0.4} className="mt-10">
            <div
              className="h-3 w-full rounded-sm"
              style={{
                background: "linear-gradient(to right, #bc13fe, #ff1493, #ff6b00, #00f0ff, #bc13fe)",
                boxShadow:
                  "0 0 20px rgba(255,20,147,0.4), 0 0 40px rgba(0,240,255,0.2), 0 0 60px rgba(255,107,0,0.15)",
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] font-mono text-gray-600">WARM</span>
              <span className="text-[10px] font-mono text-gray-600 text-center">FULL SPECTRUM NEON</span>
              <span className="text-[10px] font-mono text-gray-600">COOL</span>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. TYPOGRAPHY                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0a0a1a]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <span
              className="text-xs font-black tracking-[0.4em] uppercase text-[#ff6b00]"
              style={{ textShadow: "0 0 8px rgba(255,107,0,0.5)" }}
            >
              タイポグラフィ
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-white mt-2 mb-3"
              style={{ textShadow: "0 0 20px rgba(255,107,0,0.2)" }}
            >
              Typography
            </h2>
            <p className="text-sm text-[#c0b8d0] mb-12 max-w-md">
              Each typeface role carries a neon colour and a glow weight that reflects its hierarchy in the street scene.
            </p>
          </RevealBlock>

          <div className="space-y-4">
            {TYPE_SPECIMENS.map((spec, i) => (
              <RevealBlock key={spec.label} delay={i * 0.08}>
                <div
                  className="p-6 md:p-8 bg-[#0e0e24] rounded-sm border border-white/5 overflow-hidden transition-all duration-300 group"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${spec.color}44`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${spec.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p
                        className={`${spec.size} ${spec.weight} leading-tight break-words`}
                        style={{ color: spec.color, textShadow: spec.shadow }}
                      >
                        {spec.sample}
                      </p>
                    </div>
                    <div className="md:text-right shrink-0 md:pl-6">
                      <p
                        className="text-[10px] font-black uppercase tracking-[0.3em]"
                        style={{ color: spec.color }}
                      >
                        {spec.label}
                      </p>
                      <p className="text-[10px] text-gray-600 mt-0.5 font-mono">{spec.sublabel}</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. NIGHT LOCATIONS — district cards                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0a0a1a] to-[#12041e] relative overflow-hidden">
        <RainOverlay />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock>
            <span
              className="text-xs font-black tracking-[0.4em] uppercase text-[#ff1493]"
              style={{ textShadow: "0 0 8px rgba(255,20,147,0.6)" }}
            >
              夜の地区
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-white mt-2 mb-3"
              style={{ textShadow: "0 0 20px rgba(255,20,147,0.3)" }}
            >
              Night Districts
            </h2>
            <p className="text-sm text-[#c0b8d0] mb-12 max-w-md">
              Four corners of Tokyo that define the aesthetic — each with its own neon signature.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {NIGHT_LOCATIONS.map((loc, i) => (
              <RevealBlock key={loc.district} delay={i * 0.1} className="h-full">
                <div
                  className={`group h-full p-7 bg-[#0e0e24]/80 backdrop-blur-sm rounded-sm border ${loc.border} ${loc.hover} transition-all duration-300 relative overflow-hidden`}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${loc.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  {/* Corner glow */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                    style={{
                      backgroundColor: loc.color,
                      opacity: 0,
                      filter: "blur(30px)",
                    }}
                  />
                  {/* District kanji */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="text-4xl font-black leading-none"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: `1px ${loc.color}55`,
                      }}
                    >
                      {loc.district}
                    </span>
                    <div className="flex gap-1 pt-2">
                      {["#ff1493", "#00f0ff", "#ff6b00"].map((c, ci) => (
                        <span
                          key={ci}
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: c, boxShadow: `0 0 4px ${c}` }}
                        />
                      ))}
                    </div>
                  </div>
                  <h3
                    className="text-lg font-black text-white mb-3"
                    style={{ textShadow: `0 0 10px ${loc.color}66` }}
                  >
                    {loc.name}
                  </h3>
                  <p className="text-sm text-[#c0b8d0] leading-relaxed">{loc.desc}</p>
                  <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: `${loc.color}20` }}>
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                      {i % 2 === 0 ? "23:00 – 05:00" : "00:00 – 06:00"}
                    </span>
                    <span
                      className="text-[10px] font-black uppercase tracking-wider transition-all duration-300 group-hover:tracking-[0.2em]"
                      style={{ color: loc.color, textShadow: `0 0 6px ${loc.color}aa` }}
                    >
                      Enter →
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. DESIGN PRINCIPLES — do / don't                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0a0a1a]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <span
              className="text-xs font-black tracking-[0.4em] uppercase text-[#bc13fe]"
              style={{ textShadow: "0 0 8px rgba(188,19,254,0.6)" }}
            >
              デザイン原則
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-white mt-2 mb-3"
              style={{ textShadow: "0 0 20px rgba(188,19,254,0.2)" }}
            >
              Design Principles
            </h2>
            <p className="text-sm text-[#c0b8d0] mb-12 max-w-md">
              The rules that separate authentic Tokyo neon from generic cyberpunk pastiche.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Do */}
            <RevealBlock delay={0.1}>
              <div className="h-full p-7 bg-[#0e0e24] rounded-sm border border-[#00f0ff]/25">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-black"
                    style={{
                      backgroundColor: "#00f0ff",
                      color: "#0a0a1a",
                      boxShadow: "0 0 15px rgba(0,240,255,0.5)",
                    }}
                  >
                    ✓
                  </div>
                  <span
                    className="text-sm font-black uppercase tracking-widest text-[#00f0ff]"
                    style={{ textShadow: "0 0 8px rgba(0,240,255,0.5)" }}
                  >
                    Do / すべきこと
                  </span>
                </div>
                <ul className="space-y-3">
                  {DO_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span
                        className="mt-0.5 w-4 h-4 rounded-sm shrink-0 flex items-center justify-center text-[10px] font-black text-[#0a0a1a]"
                        style={{
                          backgroundColor: "#00f0ff",
                          boxShadow: "0 0 6px rgba(0,240,255,0.5)",
                        }}
                      >
                        ✓
                      </span>
                      <span className="text-sm text-[#c0b8d0] leading-snug group-hover:text-white transition-colors duration-200">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.15}>
              <div className="h-full p-7 bg-[#0e0e24] rounded-sm border border-[#ff1493]/25">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-black"
                    style={{
                      backgroundColor: "#ff1493",
                      color: "#0a0a1a",
                      boxShadow: "0 0 15px rgba(255,20,147,0.5)",
                    }}
                  >
                    ✕
                  </div>
                  <span
                    className="text-sm font-black uppercase tracking-widest text-[#ff1493]"
                    style={{ textShadow: "0 0 8px rgba(255,20,147,0.5)" }}
                  >
                    Don't / 避けること
                  </span>
                </div>
                <ul className="space-y-3">
                  {DONT_LIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span
                        className="mt-0.5 w-4 h-4 rounded-sm shrink-0 flex items-center justify-center text-[10px] font-black text-[#0a0a1a]"
                        style={{
                          backgroundColor: "#ff1493",
                          boxShadow: "0 0 6px rgba(255,20,147,0.5)",
                        }}
                      >
                        ✕
                      </span>
                      <span className="text-sm text-[#c0b8d0] leading-snug group-hover:text-white transition-colors duration-200">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy note */}
          <RevealBlock delay={0.25} className="mt-8">
            <div
              className="p-7 bg-[#0e0e24] rounded-sm border-l-4"
              style={{ borderLeftColor: "#ff6b00" }}
            >
              <p
                className="text-xs font-black uppercase tracking-[0.3em] text-[#ff6b00] mb-3"
                style={{ textShadow: "0 0 6px rgba(255,107,0,0.5)" }}
              >
                Philosophy / 哲学
              </p>
              <p className="text-sm text-[#c0b8d0] leading-relaxed max-w-2xl">
                Neon Tokyo is not cyberpunk. Cyberpunk imagines a future; Neon Tokyo documents a present that already exists in Kabukicho and Shinjuku every night after 10pm. The warmth of ramen steam, the intimacy of a two-seat bar, the lonely romance of walking home at 3am past a singing pachinko machine — that is the feeling this style chases.
              </p>
              <div className="mt-4 flex gap-3">
                {["Intimate", "Urban", "Warm + Cool", "Lived-in"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-sm border"
                    style={{
                      color: "#ff6b00",
                      borderColor: "rgba(255,107,0,0.4)",
                      textShadow: "0 0 6px rgba(255,107,0,0.4)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 8. TOGGLES + SETTINGS PANEL                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#12041e] to-[#0a0a1a]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <span
              className="text-xs font-black tracking-[0.4em] uppercase text-[#ff1493]"
              style={{ textShadow: "0 0 8px rgba(255,20,147,0.6)" }}
            >
              ナイト設定
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-white mt-2 mb-3"
              style={{ textShadow: "0 0 20px rgba(255,20,147,0.3)" }}
            >
              Night Settings
            </h2>
            <p className="text-sm text-[#c0b8d0] mb-12 max-w-md">
              Interactive toggle controls in neon-pink style, matching the operator panels on real pachinko machines.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Toggle panel */}
            <RevealBlock delay={0.1}>
              <div className="p-7 bg-[#0e0e24] rounded-sm border border-[#ff1493]/20">
                <p
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff1493] mb-6"
                  style={{ textShadow: "0 0 6px rgba(255,20,147,0.5)" }}
                >
                  System Flags / システム
                </p>
                <div className="space-y-5">
                  {[
                    { label: "Neon Glow Mode", desc: "Enhance glow on all coloured elements", color: "#ff1493" },
                    { label: "Rain Reflections", desc: "Enable wet-street mirror effect", color: "#00f0ff" },
                    { label: "Auto Night Vision", desc: "Optimise contrast for dark viewing", color: "#ff6b00" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <div>
                        <p className="text-sm font-bold text-white">{item.label}</p>
                        <p className="text-[11px] text-gray-600 mt-0.5">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => handleToggle(i)}
                        className="relative w-12 h-6 rounded-sm transition-all duration-300 shrink-0 ml-4"
                        style={{
                          backgroundColor: toggleStates[i] ? item.color : "#2a2a3e",
                          boxShadow: toggleStates[i] ? `0 0 12px ${item.color}88` : "none",
                        }}
                        aria-pressed={toggleStates[i]}
                      >
                        <span
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-sm transition-transform duration-300"
                          style={{ transform: toggleStates[i] ? "translateX(24px)" : "translateX(0)" }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Alert list */}
            <RevealBlock delay={0.15}>
              <div className="h-full p-7 bg-[#0e0e24] rounded-sm border border-[#00f0ff]/20">
                <p
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f0ff] mb-6"
                  style={{ textShadow: "0 0 6px rgba(0,240,255,0.5)" }}
                >
                  System Alerts / アラート
                </p>
                <div className="space-y-3">
                  {[
                    { type: "ok", color: "#00f0ff", title: "Signal locked", body: "Connected to Shibuya tower frequency." },
                    { type: "warn", color: "#ff6b00", title: "Signal interference", body: "Neon density exceeding threshold in sector 7." },
                    { type: "err", color: "#ff1493", title: "Link severed", body: "Last train departed. Walking mode activated." },
                    { type: "info", color: "#bc13fe", title: "Area scan complete", body: "3 new locations found within 500m radius." },
                  ].map((alert) => (
                    <div
                      key={alert.type}
                      className="flex items-start gap-3 p-3.5 rounded-sm"
                      style={{
                        backgroundColor: `${alert.color}0d`,
                        borderLeft: `2px solid ${alert.color}`,
                      }}
                    >
                      <span
                        className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: alert.color, boxShadow: `0 0 5px ${alert.color}` }}
                      />
                      <div>
                        <p className="text-xs font-black" style={{ color: alert.color }}>
                          {alert.title}
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: `${alert.color}99` }}>
                          {alert.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 9. CONTACT / TRANSMIT FORM                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0a0a1a] relative overflow-hidden">
        {/* Neon glow backdrop */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,20,147,0.08) 0%, rgba(0,240,255,0.04) 50%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock>
            <span
              className="text-xs font-black tracking-[0.4em] uppercase text-[#ff6b00]"
              style={{ textShadow: "0 0 8px rgba(255,107,0,0.5)" }}
            >
              信号送信
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-white mt-2 mb-3"
              style={{ textShadow: "0 0 20px rgba(255,107,0,0.2)" }}
            >
              Transmit Signal
            </h2>
            <p className="text-sm text-[#c0b8d0] mb-12 max-w-md">
              Send a message through the neon frequency. All fields glow on focus.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Form */}
            <RevealBlock delay={0.1}>
              <form onSubmit={handleSubmit} className="p-7 bg-[#0e0e24] rounded-sm border border-[#ff1493]/20">
                <div className="space-y-5">
                  <div>
                    <label
                      className="block text-[10px] font-black uppercase tracking-[0.35em] mb-2 text-[#00f0ff]"
                      style={{ textShadow: "0 0 6px rgba(0,240,255,0.4)" }}
                    >
                      Handle / ハンドル
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Your street name..."
                      className="w-full px-4 py-3 bg-[#0a0a1a] text-white text-sm placeholder-gray-700 rounded-sm outline-none border border-[#ff1493]/25 transition-all duration-300"
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#ff1493";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(255,20,147,0.3)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,20,147,0.25)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[10px] font-black uppercase tracking-[0.35em] mb-2 text-[#00f0ff]"
                      style={{ textShadow: "0 0 6px rgba(0,240,255,0.4)" }}
                    >
                      Frequency / 周波数
                    </label>
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="signal@neon.tokyo"
                      className="w-full px-4 py-3 bg-[#0a0a1a] text-white text-sm placeholder-gray-700 rounded-sm outline-none border border-[#ff1493]/25 transition-all duration-300"
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#ff1493";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(255,20,147,0.3)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,20,147,0.25)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[10px] font-black uppercase tracking-[0.35em] mb-2 text-[#00f0ff]"
                      style={{ textShadow: "0 0 6px rgba(0,240,255,0.4)" }}
                    >
                      Broadcast / メッセージ
                    </label>
                    <textarea
                      value={messageValue}
                      onChange={(e) => setMessageValue(e.target.value)}
                      placeholder="Broadcast your signal..."
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0a0a1a] text-white text-sm placeholder-gray-700 rounded-sm outline-none border border-[#ff1493]/25 transition-all duration-300 resize-none"
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#ff1493";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(255,20,147,0.3)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,20,147,0.25)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 font-black uppercase tracking-widest text-sm rounded-sm transition-all duration-300"
                    style={{
                      backgroundColor: submitted ? "#00f0ff" : "#ff1493",
                      color: "#0a0a1a",
                      boxShadow: submitted
                        ? "0 0 25px rgba(0,240,255,0.6)"
                        : "0 0 20px rgba(255,20,147,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      if (!submitted) {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(255,20,147,0.8)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!submitted) {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,20,147,0.5)";
                      }
                    }}
                  >
                    {submitted ? "Signal Received ✓" : "Transmit Signal"}
                  </button>
                </div>
              </form>
            </RevealBlock>

            {/* Side info */}
            <RevealBlock delay={0.18}>
              <div className="space-y-6">
                <div
                  className="p-6 bg-[#0e0e24] rounded-sm border-l-2"
                  style={{ borderLeftColor: "#ff1493" }}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.3em] mb-3"
                    style={{ color: "#ff1493", textShadow: "0 0 6px rgba(255,20,147,0.5)" }}
                  >
                    Hot Line / ホットライン
                  </p>
                  <p className="text-2xl font-black text-white mb-1" style={{ textShadow: "0 0 10px rgba(255,20,147,0.3)" }}>
                    +81 3-0000-0000
                  </p>
                  <p className="text-xs text-gray-500">Open: midnight – 6am JST</p>
                </div>
                <div
                  className="p-6 bg-[#0e0e24] rounded-sm border-l-2"
                  style={{ borderLeftColor: "#00f0ff" }}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.3em] mb-3"
                    style={{ color: "#00f0ff", textShadow: "0 0 6px rgba(0,240,255,0.5)" }}
                  >
                    Location / 場所
                  </p>
                  <p className="text-sm font-bold text-white leading-relaxed">
                    歌舞伎町 1-丁目<br />
                    <span className="text-gray-500 font-normal">Kabukicho, Shinjuku-ku, Tokyo</span>
                  </p>
                </div>
                <div
                  className="p-6 bg-[#0e0e24] rounded-sm border-l-2"
                  style={{ borderLeftColor: "#ff6b00" }}
                >
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.3em] mb-3"
                    style={{ color: "#ff6b00", textShadow: "0 0 6px rgba(255,107,0,0.5)" }}
                  >
                    Frequency / 周波数
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {["signal@neon.tokyo", "info@kabu.kcho", "hello@shinjuku.jp"].map((email) => (
                      <span key={email} className="text-xs text-[#c0b8d0] font-mono">
                        {email}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 10. FOOTER                                                        */}
      {/* ---------------------------------------------------------------- */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-[#0a0a1a] to-[#04040f] border-t border-[#ff1493]/10 px-6 pt-16 pb-10">
        {/* Scattered neon glows */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -bottom-20 left-1/4 w-64 h-64 rounded-full"
            style={{ backgroundColor: "#ff1493", opacity: 0.04, filter: "blur(60px)" }}
          />
          <div
            className="absolute -bottom-10 right-1/3 w-48 h-48 rounded-full"
            style={{ backgroundColor: "#00f0ff", opacity: 0.03, filter: "blur(50px)" }}
          />
          <div
            className="absolute top-0 left-1/2 w-32 h-32 rounded-full"
            style={{ backgroundColor: "#bc13fe", opacity: 0.03, filter: "blur(40px)" }}
          />
        </div>

        {/* Layered Japanese sign text backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none gap-0 leading-none overflow-hidden"
        >
          <span
            className="text-[10rem] md:text-[16rem] font-black leading-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,20,147,0.04)",
              letterSpacing: "-0.05em",
            }}
          >
            東京
          </span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Top: brand + nav */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-14">
            {/* Brand block */}
            <div>
              <div className="flex gap-1.5 items-end mb-3">
                <NeonDot color="#ff1493" />
                <NeonDot color="#00f0ff" />
                <NeonDot color="#ff6b00" />
                <NeonDot color="#bc13fe" />
              </div>
              <div
                className="text-4xl md:text-5xl font-black leading-none"
                style={{
                  color: "#ff1493",
                  textShadow:
                    "0 0 20px rgba(255,20,147,0.8), 0 0 50px rgba(255,20,147,0.4), 0 0 90px rgba(255,20,147,0.15)",
                  animation: "neonPulse 4s ease-in-out infinite",
                }}
              >
                NEON
              </div>
              <div
                className="text-4xl md:text-5xl font-black leading-none"
                style={{
                  color: "#00f0ff",
                  textShadow:
                    "0 0 20px rgba(0,240,255,0.8), 0 0 50px rgba(0,240,255,0.4)",
                }}
              >
                TOKYO
              </div>
              <div
                className="text-sm font-black uppercase tracking-[0.5em] mt-2"
                style={{ color: "#bc13fe", textShadow: "0 0 8px rgba(188,19,254,0.5)" }}
              >
                霓虹東京
              </div>
            </div>

            {/* Nav links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-3">
              {[
                { label: "All Styles", href: "/styles", color: "#ff1493" },
                { label: "Dashboard", href: "/styles/dashboard-layout", color: "#00f0ff" },
                { label: "Surrealism", href: "/styles/surrealism", color: "#ff6b00" },
                { label: "Brutalist", href: "/styles/brutalist-web", color: "#bc13fe" },
                { label: "Watercolor", href: "/styles/watercolor-art", color: "#ff1493" },
                { label: "StyleKit Home", href: "/", color: "#00f0ff" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all duration-300 group"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = link.color;
                    (e.currentTarget as HTMLElement).style.textShadow = `0 0 8px ${link.color}99`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "";
                    (e.currentTarget as HTMLElement).style.textShadow = "";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Neon rainbow divider */}
          <div
            className="h-px w-full mb-8"
            style={{
              background: "linear-gradient(to right, transparent, #ff1493, #bc13fe, #00f0ff, #ff6b00, transparent)",
              boxShadow: "0 0 10px rgba(255,20,147,0.3)",
            }}
          />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-600">
            <div className="flex items-center gap-3">
              <span>霓虹東京 Showcase</span>
              <span className="text-gray-700">·</span>
              <span>Part of</span>
              <Link
                href="/"
                className="text-gray-500 hover:text-[#ff1493] transition-colors duration-300 font-bold"
                style={{ textShadow: "none" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = "0 0 6px rgba(255,20,147,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.textShadow = "none";
                }}
              >
                StyleKit
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span>Built in Tokyo. Powered by neon.</span>
              <span className="text-gray-700">·</span>
              <span
                className="font-mono text-[#ff1493]/50"
                style={{ textShadow: "0 0 4px rgba(255,20,147,0.3)" }}
              >
                23:47 JST
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
