"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline Hooks                                                        */
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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const glassCards = [
  {
    type: "Profile",
    name: "Aria Chen",
    role: "Product Designer",
    stat1: "248",
    stat1Label: "Projects",
    stat2: "4.9",
    stat2Label: "Rating",
    accent: "#667eea",
    tag: "Available",
  },
  {
    type: "Stats",
    name: "Weekly Overview",
    role: "Dashboard Metrics",
    stat1: "12.4k",
    stat1Label: "Active Users",
    stat2: "98.2%",
    stat2Label: "Uptime",
    accent: "#f093fb",
    tag: "Live",
  },
  {
    type: "Notification",
    name: "Design Review",
    role: "Tomorrow at 10:00 AM",
    stat1: "3",
    stat1Label: "Attendees",
    stat2: "45m",
    stat2Label: "Duration",
    accent: "#f5576c",
    tag: "Upcoming",
  },
];

const colorOrbs = [
  { name: "Indigo", hex: "#667eea", gradient: "from-[#667eea] to-[#764ba2]" },
  { name: "Purple", hex: "#764ba2", gradient: "from-[#764ba2] to-[#667eea]" },
  { name: "Pink", hex: "#f093fb", gradient: "from-[#f093fb] to-[#f5576c]" },
  { name: "Rose", hex: "#f5576c", gradient: "from-[#f5576c] to-[#f093fb]" },
  { name: "Violet", hex: "#a78bfa", gradient: "from-[#a78bfa] to-[#667eea]" },
  { name: "Fuchsia", hex: "#e879f9", gradient: "from-[#e879f9] to-[#764ba2]" },
];

const layerData = [
  {
    id: 0,
    label: "Background Gradient",
    description:
      "The colorful gradient that glass will blur and distort. Without this layer, there is nothing to show through the glass. The richer the gradient, the more alive the glass looks.",
    code: "bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]",
  },
  {
    id: 1,
    label: "Blur Layer",
    description:
      "backdrop-blur-xl freezes a blurred snapshot of the gradient behind the panel. This is the frosted effect. Without backdrop-blur, you just have a semi-transparent tint, not true glass.",
    code: "backdrop-blur-xl backdrop-saturate-150",
  },
  {
    id: 2,
    label: "Glass Panel",
    description:
      "Semi-transparent white fill (bg-white/20) with a thin white border at 30% opacity creates the glass surface. The border acts as the bright edge of the glass pane.",
    code: "bg-white/20 border border-white/30 rounded-2xl",
  },
  {
    id: 3,
    label: "Content",
    description:
      "White or near-white text sits on top of the glass. High contrast against both the blurred background and the glass tint. Use text-white for primary, text-white/70 for secondary.",
    code: "text-white text-white/80 text-white/60",
  },
];

const doRules = [
  "Always place colorful gradients behind glass elements",
  "Use bg-white/20 with backdrop-blur-xl for the core glass effect",
  "Add border-white/30 to create the glass edge highlight",
  "Keep text white or near-white on frosted surfaces",
  "Layer multiple glass panels at different opacities for depth",
  "Use rounded-2xl or rounded-3xl for modern glass shapes",
];

const dontRules = [
  "Never use glass on a flat solid-color background — it needs gradient",
  "Never use dark or muted text inside glass panels",
  "Never stack too many blur layers — performance degrades fast",
  "Never omit the border — borderless glass looks flat and lifeless",
  "Never use opacity-100 fills — the whole point is transparency",
  "Never skip the gradient orbs — they make the glass glow with color",
];

const featureCards = [
  {
    title: "Frosted Effect",
    description:
      "backdrop-blur-xl creates the signature frosted glass look by blurring the gradient layers behind the panel surface. The result is a translucent shimmer.",
    accent: "#667eea",
    iconPath:
      "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.56.975A2.25 2.25 0 0116.3 16.5H7.7a2.25 2.25 0 01-1.94-1.425L4.2 15M19.8 15h.95a2.25 2.25 0 012.25 2.25v.75a2.25 2.25 0 01-2.25 2.25H3.25A2.25 2.25 0 011 18v-.75A2.25 2.25 0 013.25 15h.95",
  },
  {
    title: "Gradient Backdrop",
    description:
      "Rich multi-stop gradients using indigo, purple, and pink create the vibrant backdrop that makes glass glow with color and visual energy.",
    accent: "#764ba2",
    iconPath:
      "M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z",
  },
  {
    title: "Layered Depth",
    description:
      "Multiple glass panels stacked at varying opacities create a sense of physical depth — foreground, midground, background — that makes the UI feel three-dimensional.",
    accent: "#f093fb",
    iconPath:
      "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3",
  },
  {
    title: "Smooth Blur",
    description:
      "blur-3xl on background orbs combined with backdrop-blur-xl on panels ensures a seamless, soft frosted transition with no harsh edges between glass and backdrop.",
    accent: "#f5576c",
    iconPath:
      "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeLayer, setActiveLayer] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [glassIntensity, setGlassIntensity] = useState<1 | 2 | 3>(2);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const intensityConfig = {
    1: {
      bg: "bg-white/10",
      border: "border-white/20",
      blur: "backdrop-blur-md",
      label: "Light",
      desc: "bg-white/10 backdrop-blur-md border-white/20",
    },
    2: {
      bg: "bg-white/20",
      border: "border-white/30",
      blur: "backdrop-blur-xl",
      label: "Medium",
      desc: "bg-white/20 backdrop-blur-xl border-white/30",
    },
    3: {
      bg: "bg-white/30",
      border: "border-white/40",
      blur: "backdrop-blur-2xl",
      label: "Heavy",
      desc: "bg-white/30 backdrop-blur-2xl border-white/40",
    },
  } as const;

  const currentIntensity = intensityConfig[glassIntensity];

  return (
    <div className="min-h-screen bg-[#0f0820] text-white overflow-x-hidden">

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2]" />
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border-b border-white/20" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Back link */}
            <Link
              href="/styles"
              className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              StyleKit
            </Link>

            {/* Logo */}
            <span className="text-base font-semibold text-white tracking-wide">
              Glassmorphism
            </span>

            {/* Nav pills */}
            <nav className="flex items-center gap-2">
              <Link
                href="/styles/glassmorphism"
                className="px-4 py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="px-4 py-1.5 text-xs font-medium text-white/80 hover:text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-screen gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]" />

        {/* Floating blurred orbs — glass needs a rich backdrop */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "8%",
            left: "4%",
            width: "360px",
            height: "360px",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.15), transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            bottom: "6%",
            right: "4%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(240,147,251,0.45), transparent 65%)",
            filter: "blur(52px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "42%",
            right: "8%",
            width: "220px",
            height: "220px",
            background: "radial-gradient(ellipse, rgba(102,126,234,0.5), transparent 68%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "18%",
            right: "24%",
            width: "180px",
            height: "180px",
            background: "radial-gradient(ellipse, rgba(245,87,108,0.35), transparent 70%)",
            filter: "blur(36px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            bottom: "22%",
            left: "14%",
            width: "240px",
            height: "240px",
            background: "radial-gradient(ellipse, rgba(118,75,162,0.5), transparent 65%)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "60%",
            left: "40%",
            width: "140px",
            height: "140px",
            background: "radial-gradient(ellipse, rgba(232,121,249,0.4), transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          {/* Overline */}
          <p
            className="text-sm font-medium text-white/60 tracking-[0.2em] uppercase mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            iOS / macOS Inspired Design
          </p>

          {/* Title */}
          <h1
            className="font-bold leading-none tracking-tight mb-4 text-white"
            style={{
              fontSize: "clamp(3.2rem, 10vw, 8rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
              textShadow: "0 2px 40px rgba(102,126,234,0.5)",
            }}
          >
            GLASSMORPHISM
          </h1>

          {/* Subtitle */}
          <p
            className="text-base md:text-lg text-white/60 mb-10 leading-relaxed max-w-xl mx-auto"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            Semi-transparent panels with backdrop-blur and colorful gradients. Depth through glass, not shadow.
          </p>

          {/* Hero glass card */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed
                ? "translateY(0) scale(1)"
                : "translateY(32px) scale(0.97)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.38s",
            }}
          >
            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
              <div className="text-left">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-1">
                  Design Language
                </p>
                <p className="text-white font-semibold text-xl">Frosted Glass UI</p>
                <p className="text-white/60 text-sm mt-1">Depth through transparency</p>
              </div>
              <div className="flex gap-5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">20%</p>
                  <p className="text-xs text-white/50 mt-0.5">White fill</p>
                </div>
                <div className="w-px bg-white/20" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">XL</p>
                  <p className="text-xs text-white/50 mt-0.5">Blur level</p>
                </div>
                <div className="w-px bg-white/20" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">30%</p>
                  <p className="text-xs text-white/50 mt-0.5">Border</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.52s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.52s",
            }}
          >
            <button className="px-8 py-3 bg-white/25 backdrop-blur-sm border border-white/40 rounded-xl text-white text-sm font-semibold hover:bg-white/35 hover:border-white/60 hover:shadow-lg transition-all duration-300">
              Explore Components
            </button>
            <button className="px-8 py-3 bg-transparent border border-white/25 rounded-xl text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-300">
              Read Docs
            </button>
          </div>
        </div>
      </section>

      {/* ===== 3. Glass Cards Demo ===== */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
        {/* Dark gradient — glass orbs give color */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#2d1b5e] to-[#1a0533]" />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "15%",
            left: "8%",
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(ellipse, rgba(102,126,234,0.35), transparent 65%)",
            filter: "blur(64px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            bottom: "8%",
            right: "8%",
            width: "380px",
            height: "380px",
            background:
              "radial-gradient(ellipse, rgba(240,147,251,0.3), transparent 65%)",
            filter: "blur(64px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "50%",
            right: "28%",
            width: "260px",
            height: "260px",
            background:
              "radial-gradient(ellipse, rgba(245,87,108,0.22), transparent 65%)",
            filter: "blur(52px)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-medium text-white/40 uppercase tracking-[0.2em] mb-3">
              Glass Cards
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Frosted Panels
            </h2>
            <p className="text-white/50 max-w-md mx-auto leading-relaxed">
              Each card is a glass panel sitting above the gradient backdrop. Click to expand. Hover to feel the lift.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {glassCards.map((card, i) => (
              <div key={card.type}>
                <RevealBlock delay={i * 0.1}>
                  <div
                    className={`relative bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:shadow-xl hover:-translate-y-1 ${
                      activeCard === i
                        ? "bg-white/30 border-white/50 shadow-xl -translate-y-1"
                        : ""
                    }`}
                    onClick={() => setActiveCard(activeCard === i ? null : i)}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${card.accent}30`,
                          borderColor: `${card.accent}50`,
                          color: "white",
                        }}
                      >
                        {card.tag}
                      </span>
                      <span className="text-xs text-white/40 uppercase tracking-wider">
                        {card.type}
                      </span>
                    </div>

                    {/* Identity row */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${card.accent}, #764ba2)`,
                        }}
                      >
                        {card.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {card.name}
                        </p>
                        <p className="text-white/50 text-xs">{card.role}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/15 mb-5" />

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                        <p className="text-xl font-bold text-white">{card.stat1}</p>
                        <p className="text-xs text-white/50 mt-0.5">{card.stat1Label}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                        <p className="text-xl font-bold text-white">{card.stat2}</p>
                        <p className="text-xs text-white/50 mt-0.5">{card.stat2Label}</p>
                      </div>
                    </div>

                    {/* Expanded detail on click */}
                    {activeCard === i && (
                      <div className="mt-4 pt-4 border-t border-white/15">
                        <p className="text-xs text-white/60 leading-relaxed">
                          Glass recipe: <span className="font-mono text-white/80">bg-white/20 backdrop-blur-xl border-white/30</span>. Hover → <span className="font-mono text-white/80">bg-white/30 border-white/50</span>.
                        </p>
                      </div>
                    )}
                  </div>
                </RevealBlock>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Component Showcase ===== */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
        {/* Gradient backdrop — essential for glass components */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "0%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "640px",
            height: "320px",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.12), transparent 70%)",
            filter: "blur(64px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            bottom: "5%",
            left: "5%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(245,87,108,0.25), transparent 65%)",
            filter: "blur(56px)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-medium text-white/60 uppercase tracking-[0.2em] mb-3">
              Components
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Glass UI Kit
            </h2>
            <p className="text-white/60 max-w-md mx-auto leading-relaxed">
              Buttons, inputs, and badges — all living on the gradient backdrop, all frosted glass.
            </p>
          </RevealBlock>

          {/* Glass Intensity Switcher */}
          <RevealBlock delay={0.08} className="flex justify-center gap-2 mb-10">
            {([1, 2, 3] as const).map((level) => (
              <button
                key={level}
                onClick={() => setGlassIntensity(level)}
                className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                  glassIntensity === level
                    ? "bg-white/30 border-white/50 text-white"
                    : "bg-white/10 border-white/20 text-white/60 hover:bg-white/20 hover:text-white"
                }`}
              >
                {intensityConfig[level].label}
              </button>
            ))}
          </RevealBlock>

          {/* Live Demo Panel — changes with intensity */}
          <RevealBlock delay={0.14}>
            <div
              className={`${currentIntensity.bg} ${currentIntensity.blur} ${currentIntensity.border} border rounded-2xl shadow-lg p-8 md:p-12 transition-all duration-500`}
            >
              {/* Buttons */}
              <div className="mb-10">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-5">
                  Buttons
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-2.5 bg-white/25 backdrop-blur-sm border border-white/40 rounded-xl text-white text-sm font-semibold hover:bg-white/35 hover:border-white/60 hover:shadow-lg transition-all duration-300">
                    Primary Glass
                  </button>
                  <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white/80 text-sm font-medium hover:bg-white/20 hover:text-white hover:border-white/35 transition-all duration-300">
                    Secondary
                  </button>
                  <button className="px-6 py-2.5 bg-transparent border border-white/25 rounded-xl text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-300">
                    Ghost
                  </button>
                  <button
                    className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
                    style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
                  >
                    Solid Accent
                  </button>
                </div>
              </div>

              {/* Input */}
              <div className="mb-10">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-5">
                  Input Field
                </p>
                <div className="max-w-sm">
                  <label className="block text-sm text-white/70 mb-2 font-medium">
                    Search components
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Type to search..."
                      className="w-full pl-10 pr-4 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/40 text-sm focus:bg-white/25 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Badge chips */}
              <div>
                <p className="text-xs text-white/50 uppercase tracking-widest mb-5">
                  Badge Chips
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Glassmorphism", color: "#667eea" },
                    { label: "iOS Design", color: "#764ba2" },
                    { label: "Frosted Glass", color: "#f093fb" },
                    { label: "Backdrop Blur", color: "#f5576c" },
                    { label: "Semi-transparent", color: "#a78bfa" },
                    { label: "Layered UI", color: "#e879f9" },
                  ].map((badge) => (
                    <span
                      key={badge.label}
                      className="px-3 py-1 text-xs font-medium rounded-full border text-white"
                      style={{
                        backgroundColor: `${badge.color}25`,
                        borderColor: `${badge.color}45`,
                      }}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Intensity annotation */}
          <RevealBlock delay={0.22} className="text-center mt-6">
            <p className="text-white/40 text-xs font-mono">
              {currentIntensity.desc}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Color System ===== */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
        {/* Dark background so color orbs pop */}
        <div className="absolute inset-0 bg-[#0f0820]" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(102,126,234,0.07) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="text-xs font-medium text-white/40 uppercase tracking-[0.2em] mb-3">
              Palette
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Color System
            </h2>
            <p className="text-white/50 max-w-md mx-auto leading-relaxed">
              Six gradient colors that power every glass surface. The richer the backdrop, the more alive the glass looks when the blur filter samples it.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {colorOrbs.map((orb, i) => (
              <div key={orb.name}>
                <RevealBlock delay={i * 0.07}>
                  <div className="flex flex-col items-center gap-4 group cursor-default">
                    {/* Orb with glass overlay */}
                    <div className="relative">
                      <div
                        className={`w-28 h-28 rounded-full bg-gradient-to-br ${orb.gradient} transition-all duration-500 group-hover:scale-110`}
                        style={{
                          boxShadow: `0 8px 32px ${orb.hex}60, 0 0 60px ${orb.hex}20`,
                        }}
                      />
                      {/* Glass highlight overlay on orb */}
                      <div className="absolute inset-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/25" />
                    </div>

                    {/* Glass label chip */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-center transition-all duration-300 group-hover:bg-white/15">
                      <p className="text-white text-sm font-semibold">{orb.name}</p>
                      <p className="text-white/50 text-xs font-mono">{orb.hex}</p>
                    </div>
                  </div>
                </RevealBlock>
              </div>
            ))}
          </div>

          {/* Color-through-glass demo strip */}
          <RevealBlock delay={0.3} className="mt-16">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Gradient strip */}
              <div className="h-16 w-full bg-gradient-to-r from-[#667eea] via-[#764ba2] via-[#f093fb] to-[#f5576c]" />
              {/* Glass strip sitting on top */}
              <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                <p className="text-white text-sm font-semibold tracking-wide">
                  bg-white/20 backdrop-blur-xl — gradient showing through glass
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 6. Layer Depth Demo ===== */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
        {/* Gradient backdrop — critical for this section */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f5576c]" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "25%",
            left: "3%",
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.1), transparent 70%)",
            filter: "blur(52px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "10%",
            right: "5%",
            width: "280px",
            height: "280px",
            background:
              "radial-gradient(ellipse, rgba(245,87,108,0.3), transparent 65%)",
            filter: "blur(48px)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-medium text-white/60 uppercase tracking-[0.2em] mb-3">
              Architecture
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Layer Depth
            </h2>
            <p className="text-white/70 max-w-md mx-auto leading-relaxed">
              Glassmorphism is built from four stacked layers. Click each tab to understand what each layer contributes to the final effect.
            </p>
          </RevealBlock>

          {/* Layer Tabs */}
          <RevealBlock delay={0.08} className="flex flex-wrap justify-center gap-2 mb-10">
            {layerData.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                  activeLayer === layer.id
                    ? "bg-white/30 border-white/50 text-white"
                    : "bg-white/10 border-white/20 text-white/60 hover:bg-white/20 hover:text-white"
                }`}
              >
                {layer.id + 1}. {layer.label}
              </button>
            ))}
          </RevealBlock>

          {/* Layer Visual + Description */}
          <RevealBlock delay={0.14}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Visual preview */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/20">
                {/* Base gradient always present */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f5576c]" />

                {/* Layer 0 label */}
                {activeLayer === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg drop-shadow-lg">
                        Gradient Background
                      </p>
                      <p className="text-white/70 text-sm mt-1">The colorful foundation</p>
                    </div>
                  </div>
                )}

                {/* Layer 1+ adds blur */}
                {activeLayer >= 1 && (
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
                )}
                {activeLayer === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">+ Blur Layer</p>
                      <p className="text-white/70 text-sm mt-1">backdrop-blur-xl applied</p>
                    </div>
                  </div>
                )}

                {/* Layer 2+ adds glass panel */}
                {activeLayer >= 2 && (
                  <div className="absolute inset-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl" />
                )}
                {activeLayer === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">+ Glass Panel</p>
                      <p className="text-white/70 text-sm mt-1">bg-white/20 border-white/30</p>
                    </div>
                  </div>
                )}

                {/* Layer 3 adds content */}
                {activeLayer >= 3 && (
                  <div className="absolute inset-8 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl flex flex-col items-center justify-center gap-2 p-5">
                    <p className="text-white font-bold text-base">Content Layer</p>
                    <p className="text-white/70 text-xs text-center">
                      White text reads clearly on frosted glass
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="px-3 py-1 text-xs bg-white/20 border border-white/25 rounded-full text-white">
                        Badge
                      </span>
                      <span className="px-3 py-1 text-xs bg-white/20 border border-white/25 rounded-full text-white">
                        Tag
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description panel */}
              <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {activeLayer + 1}
                  </div>
                  <h3 className="text-white font-semibold text-lg">
                    {layerData[activeLayer].label}
                  </h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  {layerData[activeLayer].description}
                </p>
                <div className="bg-black/20 rounded-xl p-3 border border-white/10">
                  <code className="text-xs text-white/70 font-mono leading-relaxed break-all">
                    {layerData[activeLayer].code}
                  </code>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 7. Do / Don't Rules ===== */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#2d1b5e] to-[#1a0533]" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "8%",
            right: "8%",
            width: "380px",
            height: "380px",
            background:
              "radial-gradient(ellipse, rgba(240,147,251,0.15), transparent 65%)",
            filter: "blur(64px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "8%",
            left: "8%",
            width: "320px",
            height: "320px",
            background:
              "radial-gradient(ellipse, rgba(102,126,234,0.18), transparent 65%)",
            filter: "blur(58px)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-medium text-white/40 uppercase tracking-[0.2em] mb-3">
              Guidelines
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Do / Don&apos;t
            </h2>
            <p className="text-white/50 max-w-md mx-auto leading-relaxed">
              Glass done right is stunning. Glass done wrong is a blurry mess with no depth or legibility.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DO */}
            <RevealBlock delay={0.06}>
              <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-green-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-green-300 font-semibold text-lg">Do</h3>
                </div>
                <ul className="space-y-3">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 mt-2 flex-shrink-0" />
                      <span className="text-sm text-white/70 leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Correct example */}
                <div className="mt-6 p-4 bg-white/20 border border-white/30 rounded-xl backdrop-blur-xl">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                    Correct Usage
                  </p>
                  <p className="text-white text-sm font-medium">Glass on gradient</p>
                  <p className="text-white/60 text-xs mt-0.5 font-mono">
                    bg-white/20 backdrop-blur-xl border-white/30
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.12}>
              <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-red-400/20 border border-red-400/40 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-red-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="text-red-300 font-semibold text-lg">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                      <span className="text-sm text-white/70 leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Counter-example */}
                <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-xl">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Incorrect Usage
                  </p>
                  <p className="text-gray-200 text-sm font-medium">Opaque on flat solid</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    No gradient backdrop — blur has nothing to sample
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== 8. Feature Cards ===== */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]" />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            top: "0%",
            right: "0%",
            width: "520px",
            height: "520px",
            background:
              "radial-gradient(ellipse, rgba(245,87,108,0.3), transparent 65%)",
            filter: "blur(72px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            bottom: "0%",
            left: "0%",
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(ellipse, rgba(102,126,234,0.3), transparent 65%)",
            filter: "blur(72px)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-medium text-white/60 uppercase tracking-[0.2em] mb-3">
              Features
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Core Principles
            </h2>
            <p className="text-white/70 max-w-md mx-auto leading-relaxed">
              Four technical pillars that make glassmorphism work as a coherent visual language across any interface.
            </p>
          </RevealBlock>

          <div className="grid sm:grid-cols-2 gap-6">
            {featureCards.map((card, i) => (
              <div key={card.title}>
                <RevealBlock delay={i * 0.09}>
                  <div className="group bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-7 hover:bg-white/30 hover:border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/25"
                      style={{ backgroundColor: `${card.accent}30` }}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={card.iconPath}
                        />
                      </svg>
                    </div>

                    <h3 className="text-white font-semibold text-lg mb-2">
                      {card.title}
                    </h3>
                    <p className="text-white/65 text-sm leading-relaxed">
                      {card.description}
                    </p>

                    {/* Accent underline */}
                    <div
                      className="mt-5 h-0.5 rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(to right, ${card.accent}, transparent)`,
                      }}
                    />
                  </div>
                </RevealBlock>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. Typography & Notification Stack ===== */}
      <section className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0533] via-[#2d1b5e] to-[#1a0533]" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "18%",
            left: "18%",
            width: "460px",
            height: "460px",
            background:
              "radial-gradient(ellipse, rgba(167,139,250,0.14), transparent 65%)",
            filter: "blur(72px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "8%",
            right: "12%",
            width: "360px",
            height: "360px",
            background:
              "radial-gradient(ellipse, rgba(240,147,251,0.11), transparent 65%)",
            filter: "blur(68px)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-medium text-white/40 uppercase tracking-[0.2em] mb-3">
              Typography
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Text on Glass
            </h2>
            <p className="text-white/50 max-w-md mx-auto leading-relaxed">
              Legibility on frosted surfaces requires careful opacity levels. White text at varying opacities creates a clear visual hierarchy.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Type scale on glass */}
            <RevealBlock delay={0.06}>
              <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                <p className="text-xs text-white/40 uppercase tracking-widest mb-6">
                  Type Scale
                </p>
                <div className="space-y-5">
                  {[
                    {
                      size: "text-3xl",
                      weight: "font-bold",
                      opacity: "text-white",
                      label: "Display — text-white",
                    },
                    {
                      size: "text-xl",
                      weight: "font-semibold",
                      opacity: "text-white/90",
                      label: "Heading — text-white/90",
                    },
                    {
                      size: "text-base",
                      weight: "font-medium",
                      opacity: "text-white/80",
                      label: "Subheading — text-white/80",
                    },
                    {
                      size: "text-sm",
                      weight: "font-normal",
                      opacity: "text-white/70",
                      label: "Body — text-white/70",
                    },
                    {
                      size: "text-xs",
                      weight: "font-normal",
                      opacity: "text-white/50",
                      label: "Caption — text-white/50",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4 pb-4 border-b border-white/8 last:border-0 last:pb-0"
                    >
                      <span
                        className={`${item.size} ${item.weight} ${item.opacity} leading-none`}
                      >
                        Aa
                      </span>
                      <span className="text-xs text-white/35 text-right">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Notification stack — layered glass depth */}
            <RevealBlock delay={0.12}>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-6">
                  Notification Stack — Layered Glass
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: "New message from Aria",
                      time: "now",
                      bg: "bg-white/25",
                      blur: "backdrop-blur-2xl",
                      color: "#667eea",
                    },
                    {
                      title: "Your build succeeded",
                      time: "2m ago",
                      bg: "bg-white/18",
                      blur: "backdrop-blur-xl",
                      color: "#f093fb",
                    },
                    {
                      title: "Weekly report ready",
                      time: "1h ago",
                      bg: "bg-white/12",
                      blur: "backdrop-blur-lg",
                      color: "#a78bfa",
                    },
                    {
                      title: "System update available",
                      time: "3h ago",
                      bg: "bg-white/8",
                      blur: "backdrop-blur-md",
                      color: "#e879f9",
                    },
                  ].map((notif, i) => (
                    <div
                      key={i}
                      className={`${notif.bg} ${notif.blur} border border-white/20 rounded-2xl px-5 py-4 flex items-center justify-between transition-all duration-300 hover:bg-white/30 cursor-default`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            background: notif.color,
                            boxShadow: `0 0 8px ${notif.color}80`,
                          }}
                        />
                        <p className="text-white text-sm font-medium">
                          {notif.title}
                        </p>
                      </div>
                      <span className="text-white/40 text-xs flex-shrink-0">
                        {notif.time}
                      </span>
                    </div>
                  ))}
                  <p className="text-xs text-white/30 mt-4 text-center">
                    Decreasing bg opacity creates foreground-to-background depth
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative overflow-hidden">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2]" />
        {/* Glass strip */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-t border-white/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <p className="text-white font-semibold text-base tracking-wide mb-1">
                Glassmorphism
              </p>
              <p className="text-white/50 text-xs">
                Part of StyleKit — a living collection of design systems
              </p>
            </div>

            {/* Color dots */}
            <div className="flex items-center gap-2">
              {colorOrbs.map((orb) => (
                <div
                  key={orb.name}
                  className={`w-5 h-5 rounded-full bg-gradient-to-br ${orb.gradient}`}
                  style={{ boxShadow: `0 2px 8px ${orb.hex}50` }}
                />
              ))}
            </div>

            {/* Nav */}
            <nav className="flex items-center gap-6">
              <Link
                href="/styles/glassmorphism"
                className="text-xs text-white/50 hover:text-white transition-colors duration-300"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs text-white/50 hover:text-white transition-colors duration-300"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="text-xs text-white/50 hover:text-white transition-colors duration-300"
              >
                Home
              </Link>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 text-center">
            <p className="text-white/40 text-xs">&copy; 2025 StyleKit</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
