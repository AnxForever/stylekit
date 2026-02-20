"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Inline useInView hook
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
// Inline RevealBlock — only accepts children, className, delay
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
// Color data — sourced from soft-ui.ts
// ---------------------------------------------------------------------------
const palette = [
  { name: "Primary", hex: "#6366f1", twBg: "bg-[#6366f1]", label: "Indigo 500" },
  { name: "Secondary", hex: "#f1f5f9", twBg: "bg-[#f1f5f9]", label: "Slate 100" },
  { name: "Accent Pink", hex: "#ec4899", twBg: "bg-[#ec4899]", label: "Pink 500" },
  { name: "Accent Green", hex: "#10b981", twBg: "bg-[#10b981]", label: "Emerald 500" },
  { name: "Accent Amber", hex: "#f59e0b", twBg: "bg-[#f59e0b]", label: "Amber 400" },
  { name: "Surface", hex: "#ffffff", twBg: "bg-white border border-slate-100", label: "White" },
];

// ---------------------------------------------------------------------------
// Do / Don't data — from soft-ui.ts
// ---------------------------------------------------------------------------
const doList = [
  "Use rounded-2xl or rounded-3xl as primary border radius",
  "Use shadow-lg or shadow-xl with color tint (shadow-[accent]/20)",
  "Background: soft bg-slate-50 or bg-gray-50",
  "Use low-saturation primary color tones",
  "Buttons: hover:shadow-xl + hover:-translate-y-0.5 lift effect",
  "Cards: gap-6 or gap-8 for generous spacing",
  "Icons: circular background rounded-full bg-[color]/10",
];

const dontList = [
  "Sharp corners — rounded-none is forbidden",
  "Pure black #000000 anywhere in the UI",
  "High-saturation solid colors without softening",
  "Hard borders — border-black or border-2 in dark tones",
  "Hard shadows with no blur radius",
  "Tight, cramped element spacing",
];

// ---------------------------------------------------------------------------
// Typography specimens
// ---------------------------------------------------------------------------
const typeSpecimens = [
  { label: "Display", size: "text-5xl md:text-6xl", weight: "font-bold", text: "Soft & Round" },
  { label: "Heading 1", size: "text-4xl", weight: "font-bold", text: "Friendly Interface" },
  { label: "Heading 2", size: "text-3xl", weight: "font-semibold", text: "Approachable Design" },
  { label: "Heading 3", size: "text-2xl", weight: "font-semibold", text: "Gentle Aesthetic" },
  { label: "Body Large", size: "text-lg", weight: "font-normal", text: "Soft UI brings warmth and clarity to every interaction." },
  { label: "Body", size: "text-base", weight: "font-normal", text: "Low saturation colors and generous rounded corners create visual comfort." },
  { label: "Caption", size: "text-sm", weight: "font-medium", text: "Secondary text uses slate-500 for low contrast harmony." },
];

// ---------------------------------------------------------------------------
// Feature cards data
// ---------------------------------------------------------------------------
const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-500",
    hoverShadow: "hover:shadow-[0_24px_48px_rgba(99,102,241,0.2)]",
    hoverTitle: "group-hover:text-indigo-600",
    title: "Loved by Users",
    desc: "Soft interfaces feel more approachable and create positive emotional responses in every touchpoint.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    hoverShadow: "hover:shadow-[0_24px_48px_rgba(236,72,153,0.2)]",
    hoverTitle: "group-hover:text-pink-600",
    title: "Delightful Motion",
    desc: "Subtle animations and silky transitions bring life to the interface without distraction.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    hoverShadow: "hover:shadow-[0_24px_48px_rgba(16,185,129,0.2)]",
    hoverTitle: "group-hover:text-emerald-600",
    title: "Tactile Depth",
    desc: "Neumorphic shadows and pillow-press active states give interfaces a physical, touchable quality.",
  },
];

// ---------------------------------------------------------------------------
// Testimonial data
// ---------------------------------------------------------------------------
const testimonials = [
  {
    quote: "The softness of this system immediately put our users at ease. Engagement went up 34% after the redesign.",
    author: "Sarah Chen",
    role: "Head of Design",
    initials: "SC",
    color: "bg-indigo-500",
    shadow: "shadow-indigo-500/30",
  },
  {
    quote: "I never thought colored shadows could make such a difference. The depth feels real, not decorative.",
    author: "Alex Kim",
    role: "Product Engineer",
    initials: "AK",
    color: "bg-pink-500",
    shadow: "shadow-pink-500/30",
  },
  {
    quote: "Our consumer app onboarding felt cold. After switching to Soft UI principles, retention improved dramatically.",
    author: "Jordan Lee",
    role: "Growth Lead",
    initials: "JL",
    color: "bg-emerald-500",
    shadow: "shadow-emerald-500/30",
  },
];

// ---------------------------------------------------------------------------
// Main Showcase
// ---------------------------------------------------------------------------
export default function SoftUIShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeComponentTab, setActiveComponentTab] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [checkboxStates, setCheckboxStates] = useState([true, false, true]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const componentTabLabels = ["Buttons", "Cards", "Inputs"];

  return (
    <div className="min-h-screen bg-[#e8ecf0] text-gray-800">

      {/* ------------------------------------------------------------------ */}
      {/* 1. Fixed Navigation Bar                                             */}
      {/* ------------------------------------------------------------------ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e8ecf0]/80 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Back to StyleKit */}
          <Link
            href="/styles"
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 transition-colors duration-200 group"
          >
            <span
              className="w-8 h-8 rounded-xl flex items-center justify-center
                shadow-[3px_3px_6px_rgba(0,0,0,0.07),-3px_-3px_6px_rgba(255,255,255,0.8)]
                group-hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]
                transition-all duration-200"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="text-sm font-semibold hidden md:block">StyleKit</span>
          </Link>

          {/* Logo */}
          <span className="font-bold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Soft UI
          </span>

          {/* Back to style page */}
          <Link
            href="/styles/soft-ui"
            className="px-5 py-2 rounded-2xl text-sm font-semibold text-indigo-600 bg-indigo-50
              shadow-[3px_3px_8px_rgba(99,102,241,0.12),-3px_-3px_8px_rgba(255,255,255,0.9)]
              hover:shadow-[0_8px_20px_rgba(99,102,241,0.25)] hover:-translate-y-0.5
              transition-all duration-300"
          >
            View Docs
          </Link>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Hero Section                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-32 pb-28 px-4 md:px-8 overflow-hidden">
        {/* Ambient background blobs */}
        <div
          aria-hidden
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none"
          style={{
            transform: heroRevealed ? "scale(1)" : "scale(0.6)",
            opacity: heroRevealed ? 1 : 0,
            transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1), opacity 1.4s ease",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl pointer-events-none"
          style={{
            transform: heroRevealed ? "scale(1)" : "scale(0.6)",
            opacity: heroRevealed ? 1 : 0,
            transition: "transform 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s, opacity 1.6s ease 0.2s",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Pill badge */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-sm font-semibold text-indigo-600
              bg-indigo-50 shadow-[4px_4px_10px_rgba(99,102,241,0.12),-4px_-4px_10px_rgba(255,255,255,0.9)]"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Soft UI Design System
          </div>

          {/* Main heading */}
          <h1
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gray-800 mb-6"
          >
            Gentle.{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Elegant.
            </span>
            <br />
            Delightful.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A warm, approachable design system rooted in neumorphic depth, generous rounded
            corners, and colored shadows that feel alive to the touch.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s",
            }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              className="px-8 py-4 bg-indigo-500 text-white rounded-2xl font-semibold
                shadow-[0_10px_24px_rgba(99,102,241,0.35)]
                hover:shadow-[0_18px_36px_rgba(99,102,241,0.45)] hover:-translate-y-1
                active:translate-y-[2px] active:scale-[0.97] active:shadow-[inset_0_4px_10px_rgba(67,56,202,0.28)]
                transition-all duration-300 ease-in-out"
            >
              Get Started
            </button>
            <button
              className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold
                shadow-[6px_6px_12px_rgba(0,0,0,0.08),-6px_-6px_12px_rgba(255,255,255,0.8)]
                hover:shadow-[0_16px_32px_rgba(148,163,184,0.3)] hover:-translate-y-1
                active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08),inset_-3px_-3px_8px_rgba(255,255,255,0.7)]
                transition-all duration-300 ease-in-out"
            >
              Learn More
            </button>
          </div>

          {/* Hero visual anchor — floating stat cards */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
            className="mt-20 grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: "24K", label: "Happy Users", color: "text-indigo-500", shadow: "shadow-[0_12px_30px_rgba(99,102,241,0.15)]" },
              { value: "98%", label: "Satisfaction", color: "text-emerald-500", shadow: "shadow-[0_12px_30px_rgba(16,185,129,0.15)]" },
              { value: "4.9", label: "App Rating", color: "text-pink-500", shadow: "shadow-[0_12px_30px_rgba(236,72,153,0.15)]" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-white rounded-3xl py-6 px-4 text-center ${stat.shadow} hover:-translate-y-1 transition-all duration-300`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <p className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Component Demos — tabbed (Buttons / Cards / Inputs)              */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Components</h2>
            <p className="text-slate-500 mb-10">Interactive building blocks built on Soft UI principles.</p>
          </RevealBlock>

          {/* Tab switcher — useState interaction #1 */}
          <RevealBlock delay={0.08}>
            <div
              className="inline-flex rounded-2xl p-1.5 mb-10
                shadow-[inset_3px_3px_8px_rgba(0,0,0,0.07),inset_-3px_-3px_8px_rgba(255,255,255,0.8)]"
              style={{ background: "#dde1e7" }}
            >
              {componentTabLabels.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setActiveComponentTab(i)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeComponentTab === i
                      ? "bg-white text-indigo-600 shadow-[4px_4px_10px_rgba(0,0,0,0.08),-4px_-4px_10px_rgba(255,255,255,0.9)]"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab panel: Buttons */}
          {activeComponentTab === 0 && (
            <RevealBlock>
              <div
                className="bg-white rounded-3xl p-8 md:p-10
                  shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]"
              >
                <div className="space-y-10">
                  {/* Variants */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Variants</p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        className="px-6 py-3 bg-indigo-500 text-white rounded-2xl font-semibold
                          shadow-[0_10px_24px_rgba(99,102,241,0.3)]
                          hover:shadow-[0_18px_32px_rgba(99,102,241,0.4)] hover:-translate-y-0.5
                          active:translate-y-[2px] active:shadow-[inset_0_4px_10px_rgba(67,56,202,0.28)]
                          transition-all duration-300 ease-in-out"
                      >
                        Primary
                      </button>
                      <button
                        className="px-6 py-3 text-indigo-500 bg-indigo-50 rounded-2xl font-semibold
                          shadow-[3px_3px_8px_rgba(99,102,241,0.1),-3px_-3px_8px_rgba(255,255,255,0.9)]
                          hover:bg-indigo-100 hover:shadow-[0_8px_20px_rgba(99,102,241,0.18)]
                          active:shadow-[inset_0_3px_8px_rgba(99,102,241,0.15)]
                          transition-all duration-300 ease-in-out"
                      >
                        Ghost
                      </button>
                      <button
                        className="px-6 py-3 bg-white text-gray-700 rounded-2xl font-semibold
                          shadow-[6px_6px_12px_rgba(0,0,0,0.07),-6px_-6px_12px_rgba(255,255,255,0.8)]
                          hover:shadow-[0_14px_28px_rgba(148,163,184,0.25)] hover:-translate-y-0.5
                          active:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.07),inset_-3px_-3px_7px_rgba(255,255,255,0.7)]
                          transition-all duration-300 ease-in-out"
                      >
                        Neumorphic
                      </button>
                      <button
                        className="px-6 py-3 bg-pink-500 text-white rounded-2xl font-semibold
                          shadow-[0_10px_24px_rgba(236,72,153,0.3)]
                          hover:shadow-[0_18px_32px_rgba(236,72,153,0.4)] hover:-translate-y-0.5
                          active:shadow-[inset_0_4px_10px_rgba(190,24,93,0.25)]
                          transition-all duration-300 ease-in-out"
                      >
                        Accent
                      </button>
                      <button
                        className="px-6 py-3 bg-emerald-500 text-white rounded-2xl font-semibold
                          shadow-[0_10px_24px_rgba(16,185,129,0.3)]
                          hover:shadow-[0_18px_32px_rgba(16,185,129,0.4)] hover:-translate-y-0.5
                          active:shadow-[inset_0_4px_10px_rgba(4,120,87,0.25)]
                          transition-all duration-300 ease-in-out"
                      >
                        Success
                      </button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Sizes</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="px-4 py-2 text-xs bg-indigo-500 text-white rounded-xl font-semibold
                          shadow-[0_6px_14px_rgba(99,102,241,0.25)]
                          hover:shadow-[0_10px_20px_rgba(99,102,241,0.35)] hover:-translate-y-0.5
                          transition-all duration-300"
                      >
                        Small
                      </button>
                      <button
                        className="px-6 py-3 bg-indigo-500 text-white rounded-2xl font-semibold
                          shadow-[0_10px_24px_rgba(99,102,241,0.3)]
                          hover:shadow-[0_18px_32px_rgba(99,102,241,0.4)] hover:-translate-y-0.5
                          transition-all duration-300"
                      >
                        Medium
                      </button>
                      <button
                        className="px-10 py-4 text-lg bg-indigo-500 text-white rounded-3xl font-semibold
                          shadow-[0_14px_32px_rgba(99,102,241,0.35)]
                          hover:shadow-[0_22px_40px_rgba(99,102,241,0.45)] hover:-translate-y-1
                          transition-all duration-300"
                      >
                        Large
                      </button>
                    </div>
                  </div>

                  {/* States */}
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">States</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        className="px-6 py-3 bg-indigo-500 text-white rounded-2xl font-semibold
                          shadow-[0_10px_24px_rgba(99,102,241,0.3)] opacity-50 cursor-not-allowed"
                        disabled
                      >
                        Disabled
                      </button>
                      <button
                        className="px-6 py-3 bg-indigo-500 text-white rounded-2xl font-semibold
                          shadow-[inset_0_4px_10px_rgba(67,56,202,0.28)] translate-y-[2px] scale-[0.97]"
                      >
                        Pressed
                      </button>
                      <button
                        className="px-6 py-3 bg-indigo-500 text-white rounded-2xl font-semibold
                          shadow-[0_18px_32px_rgba(99,102,241,0.45)] -translate-y-0.5
                          flex items-center gap-2"
                      >
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Loading
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab panel: Cards */}
          {activeComponentTab === 1 && (
            <RevealBlock>
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((f, i) => (
                  <div
                    key={f.title}
                    className={`group bg-white rounded-3xl p-8
                      shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]
                      ${f.hoverShadow} hover:-translate-y-2
                      transition-all duration-500 ease-in-out cursor-pointer`}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`w-14 h-14 ${f.iconBg} ${f.iconColor} rounded-2xl flex items-center justify-center mb-6
                        group-hover:scale-110 group-hover:rounded-3xl
                        transition-all duration-300 ease-in-out`}
                    >
                      {f.icon}
                    </div>
                    <h3
                      className={`text-xl font-bold text-gray-800 mb-3 ${f.hoverTitle}
                        transition-colors duration-300`}
                    >
                      {f.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
                    <div
                      className={`mt-6 flex items-center gap-1 text-sm font-semibold transition-all duration-300 ${
                        hoveredCard === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      } ${f.iconColor}`}
                    >
                      Learn more
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* Tab panel: Inputs */}
          {activeComponentTab === 2 && (
            <RevealBlock>
              <div
                className="max-w-xl bg-white rounded-3xl p-8 md:p-10
                  shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full px-5 py-3.5 bg-[#e8ecf0] border-0 rounded-2xl text-gray-800
                        placeholder:text-slate-400
                        shadow-[inset_3px_3px_7px_rgba(0,0,0,0.07),inset_-3px_-3px_7px_rgba(255,255,255,0.8)]
                        focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/20
                        focus:shadow-[0_10px_26px_rgba(99,102,241,0.14)]
                        transition-all duration-300 ease-in-out"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-5 py-3.5 bg-[#e8ecf0] border-0 rounded-2xl text-gray-800
                        placeholder:text-slate-400
                        shadow-[inset_3px_3px_7px_rgba(0,0,0,0.07),inset_-3px_-3px_7px_rgba(255,255,255,0.8)]
                        focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/20
                        focus:shadow-[0_10px_26px_rgba(99,102,241,0.14)]
                        transition-all duration-300 ease-in-out"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Message</label>
                    <textarea
                      placeholder="Tell us what you think..."
                      rows={4}
                      className="w-full px-5 py-3.5 bg-[#e8ecf0] border-0 rounded-2xl text-gray-800
                        placeholder:text-slate-400 resize-none
                        shadow-[inset_3px_3px_7px_rgba(0,0,0,0.07),inset_-3px_-3px_7px_rgba(255,255,255,0.8)]
                        focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/20
                        focus:shadow-[0_10px_26px_rgba(99,102,241,0.14)]
                        transition-all duration-300 ease-in-out"
                    />
                  </div>
                  <button
                    className="w-full px-6 py-4 bg-indigo-500 text-white rounded-2xl font-semibold
                      shadow-[0_10px_24px_rgba(99,102,241,0.3)]
                      hover:shadow-[0_18px_36px_rgba(99,102,241,0.4)] hover:-translate-y-0.5
                      active:shadow-[inset_0_4px_10px_rgba(67,56,202,0.28)] active:translate-y-[2px]
                      transition-all duration-300 ease-in-out"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Color Palette Section                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#e8ecf0] to-[#dde1e7]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Color System</h2>
            <p className="text-slate-500 mb-12">Soft, harmonious tones with matching neumorphic shadows.</p>
          </RevealBlock>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {palette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.06}>
                <div
                  className="rounded-3xl overflow-hidden
                    bg-white
                    shadow-[6px_6px_14px_rgba(0,0,0,0.08),-6px_-6px_14px_rgba(255,255,255,0.8)]
                    hover:shadow-[0_18px_36px_rgba(0,0,0,0.1)] hover:-translate-y-1
                    transition-all duration-400"
                >
                  <div className={`h-20 md:h-24 ${color.twBg}`} />
                  <div className="p-4">
                    <p className="font-bold text-gray-800 text-sm">{color.name}</p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{color.hex}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{color.label}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color usage legend */}
          <RevealBlock delay={0.3} className="mt-12">
            <div
              className="bg-white rounded-3xl p-8
                shadow-[6px_6px_14px_rgba(0,0,0,0.07),-6px_-6px_14px_rgba(255,255,255,0.85)]"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Usage Guidelines</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-[#6366f1]" />
                    <span className="text-sm font-semibold text-gray-700">Primary (#6366f1)</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    CTAs, interactive elements, active states, focus rings. Always pair with colored shadow.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-[#f1f5f9] border border-slate-200" />
                    <span className="text-sm font-semibold text-gray-700">Secondary (#f1f5f9)</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Input backgrounds, ghost buttons, tag backgrounds. Base of the neumorphic surface.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-[#ec4899]" />
                    <span className="text-sm font-semibold text-gray-700">Accents</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Pink #ec4899, Green #10b981, Amber #f59e0b. Semantic highlights and category markers.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. Design Rules — Do / Don't                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Design Rules</h2>
            <p className="text-slate-500 mb-12">The do and don&apos;t of building with Soft UI.</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DO */}
            <RevealBlock delay={0.05}>
              <div
                className="bg-white rounded-3xl p-8
                  shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]
                  h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center
                      shadow-[3px_3px_8px_rgba(16,185,129,0.15),-3px_-3px_8px_rgba(255,255,255,0.9)]"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-500">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold text-gray-800">Do</h3>
                </div>
                <ul className="space-y-4">
                  {doList.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0
                          shadow-[2px_2px_4px_rgba(16,185,129,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)]"
                      >
                        <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-emerald-500">
                          <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" fill="none" />
                        </svg>
                      </span>
                      <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.1}>
              <div
                className="bg-white rounded-3xl p-8
                  shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]
                  h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center
                      shadow-[3px_3px_8px_rgba(239,68,68,0.12),-3px_-3px_8px_rgba(255,255,255,0.9)]"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-500">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold text-gray-800">Don&apos;t</h3>
                </div>
                <ul className="space-y-4">
                  {dontList.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0
                          shadow-[2px_2px_4px_rgba(239,68,68,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)]"
                      >
                        <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-red-500">
                          <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" fill="none" />
                        </svg>
                      </span>
                      <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. Typography Section                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#dde1e7] to-[#e8ecf0]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Typography</h2>
            <p className="text-slate-500 mb-12">
              Soft UI pairs rounded, friendly typefaces with soft gray text hierarchy.
            </p>
          </RevealBlock>

          <div
            className="bg-white rounded-3xl p-8 md:p-12 space-y-8
              shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]"
          >
            {typeSpecimens.map((spec, i) => (
              <RevealBlock key={spec.label} delay={i * 0.04}>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 pb-8 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="md:w-36 flex-shrink-0">
                    <span
                      className="inline-block px-3 py-1 rounded-xl text-xs font-bold text-indigo-500 bg-indigo-50
                        shadow-[2px_2px_5px_rgba(99,102,241,0.1),-2px_-2px_5px_rgba(255,255,255,0.9)]"
                    >
                      {spec.label}
                    </span>
                  </div>
                  <p className={`${spec.size} ${spec.weight} text-gray-800 leading-tight`}>
                    {spec.text}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Font metadata */}
          <RevealBlock delay={0.3} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: "Font Family", value: "Inter / System UI", note: "Rounded, friendly proportions" },
              { label: "Base Size", value: "16px / 1rem", note: "Comfortable reading size" },
              { label: "Line Height", value: "1.6 — relaxed", note: "Generous breathing room" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-6
                  shadow-[5px_5px_12px_rgba(0,0,0,0.06),-5px_-5px_12px_rgba(255,255,255,0.85)]"
              >
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{item.label}</p>
                <p className="text-lg font-bold text-gray-800 mb-1">{item.value}</p>
                <p className="text-xs text-slate-400">{item.note}</p>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. Interactive Controls — useState interaction #2                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Controls</h2>
            <p className="text-slate-500 mb-12">Soft toggles, checkboxes, tabs and dropdowns with pillow-press states.</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Toggles */}
            <RevealBlock delay={0.05}>
              <div
                className="bg-white rounded-3xl p-8
                  shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]"
              >
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Toggles</p>
                <div className="space-y-4">
                  {["Notifications", "Dark Mode", "Auto-save"].map((label, i) => (
                    <label
                      key={label}
                      className="flex items-center justify-between p-4 rounded-2xl cursor-pointer
                        shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]
                        hover:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.07),inset_-3px_-3px_7px_rgba(255,255,255,0.9)]
                        transition-all duration-200"
                      style={{ background: "#eef1f5" }}
                    >
                      <span className="text-sm font-semibold text-gray-700">{label}</span>
                      <button
                        role="switch"
                        aria-checked={toggleStates[i]}
                        aria-label={label}
                        onClick={() => {
                          const next = [...toggleStates];
                          next[i] = !next[i];
                          setToggleStates(next);
                        }}
                        className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                          toggleStates[i]
                            ? "bg-indigo-500 shadow-[0_4px_12px_rgba(99,102,241,0.4)]"
                            : "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]"
                        }`}
                        style={{ background: toggleStates[i] ? "#6366f1" : "#d4d8e0" }}
                      >
                        <span
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                            toggleStates[i] ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Checkboxes */}
            <RevealBlock delay={0.1}>
              <div
                className="bg-white rounded-3xl p-8
                  shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]"
              >
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Checkboxes</p>
                <div className="space-y-4">
                  {["Email updates", "Push notifications", "Weekly digest"].map((label, i) => (
                    <label
                      key={label}
                      className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer
                        shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]
                        hover:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.07),inset_-3px_-3px_7px_rgba(255,255,255,0.9)]
                        transition-all duration-200"
                      style={{ background: "#eef1f5" }}
                    >
                      <button
                        role="checkbox"
                        aria-checked={checkboxStates[i]}
                        aria-label={label}
                        onClick={() => {
                          const next = [...checkboxStates];
                          next[i] = !next[i];
                          setCheckboxStates(next);
                        }}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          checkboxStates[i]
                            ? "bg-indigo-500 shadow-[0_4px_10px_rgba(99,102,241,0.35)]"
                            : "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]"
                        }`}
                        style={{ background: checkboxStates[i] ? "#6366f1" : "#d4d8e0" }}
                      >
                        {checkboxStates[i] && (
                          <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth={2} className="w-3.5 h-3.5">
                            <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <span className="text-sm font-semibold text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Pill tabs */}
          <RevealBlock delay={0.15} className="mt-6">
            <div
              className="bg-white rounded-3xl p-8
                shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Pill Tabs</p>
              <div
                className="inline-flex rounded-2xl p-1.5 mb-6
                  shadow-[inset_3px_3px_8px_rgba(0,0,0,0.08),inset_-3px_-3px_8px_rgba(255,255,255,0.8)]"
                style={{ background: "#dde1e7" }}
              >
                {["Overview", "Features", "Pricing", "FAQ"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      activeTab === i
                        ? "bg-white text-indigo-600 shadow-[4px_4px_10px_rgba(0,0,0,0.07),-4px_-4px_10px_rgba(255,255,255,0.9)]"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                {activeTab === 0 && "A gentle introduction to our soft, approachable design system — built for warmth and clarity."}
                {activeTab === 1 && "Explore neumorphic shadows, colored drop shadows, rounded corners, and smooth hover animations."}
                {activeTab === 2 && "Simple, transparent pricing with no hidden fees. Your design system should feel as friendly as it looks."}
                {activeTab === 3 && "Yes — Soft UI works beautifully alongside Tailwind CSS, Next.js, and any modern component library."}
              </p>
            </div>
          </RevealBlock>

          {/* Dropdown */}
          <RevealBlock delay={0.2} className="mt-6">
            <div
              className="bg-white rounded-3xl p-8
                shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Dropdown</p>
              <div className="relative max-w-xs">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-semibold text-gray-700 text-sm
                    shadow-[5px_5px_12px_rgba(0,0,0,0.07),-5px_-5px_12px_rgba(255,255,255,0.85)]
                    hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5
                    active:shadow-[inset_3px_3px_7px_rgba(0,0,0,0.08),inset_-3px_-3px_7px_rgba(255,255,255,0.8)]
                    transition-all duration-300 bg-white"
                >
                  <span>Select a category</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl z-10 overflow-hidden
                      shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                  >
                    {["Design", "Development", "Marketing", "Analytics"].map((item) => (
                      <button
                        key={item}
                        className="w-full px-5 py-3.5 text-left text-sm font-semibold text-gray-700
                          hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. Alerts / Status Messages                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#e8ecf0] to-[#dde1e7]">
        <div className="max-w-3xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Alerts</h2>
            <p className="text-slate-500 mb-12">Soft status messages with neumorphic treatment.</p>
          </RevealBlock>

          <div className="space-y-4">
            {[
              {
                type: "Info",
                bg: "bg-blue-50",
                text: "text-blue-800",
                body: "text-blue-600",
                shadow: "shadow-[6px_6px_14px_rgba(59,130,246,0.1),-6px_-6px_14px_rgba(255,255,255,0.8)]",
                icon: (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                ),
                message: "Here is some helpful information to guide your next action.",
              },
              {
                type: "Success",
                bg: "bg-emerald-50",
                text: "text-emerald-800",
                body: "text-emerald-600",
                shadow: "shadow-[6px_6px_14px_rgba(16,185,129,0.1),-6px_-6px_14px_rgba(255,255,255,0.8)]",
                icon: (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-500">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                message: "Your changes have been saved successfully.",
              },
              {
                type: "Warning",
                bg: "bg-amber-50",
                text: "text-amber-800",
                body: "text-amber-600",
                shadow: "shadow-[6px_6px_14px_rgba(245,158,11,0.1),-6px_-6px_14px_rgba(255,255,255,0.8)]",
                icon: (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ),
                message: "Please review your settings before continuing.",
              },
              {
                type: "Error",
                bg: "bg-red-50",
                text: "text-red-800",
                body: "text-red-600",
                shadow: "shadow-[6px_6px_14px_rgba(239,68,68,0.1),-6px_-6px_14px_rgba(255,255,255,0.8)]",
                icon: (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-500">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ),
                message: "Something went wrong. Please try again.",
              },
            ].map((alert, i) => (
              <RevealBlock key={alert.type} delay={i * 0.08}>
                <div className={`flex items-start gap-4 p-5 ${alert.bg} rounded-2xl ${alert.shadow}`}>
                  <span className="flex-shrink-0 mt-0.5">{alert.icon}</span>
                  <div>
                    <p className={`font-bold text-sm ${alert.text} mb-0.5`}>{alert.type}</p>
                    <p className={`text-sm ${alert.body}`}>{alert.message}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. Progress Bars                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Progress</h2>
            <p className="text-slate-500 mb-12">Rounded progress bars with soft-tinted fills and inset track.</p>
          </RevealBlock>

          <div
            className="bg-white rounded-3xl p-8 space-y-8
              shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]"
          >
            {[
              { label: "Design", pct: 78, color: "bg-[#6366f1]", shadow: "shadow-[0_4px_12px_rgba(99,102,241,0.4)]" },
              { label: "Development", pct: 62, color: "bg-[#ec4899]", shadow: "shadow-[0_4px_12px_rgba(236,72,153,0.4)]" },
              { label: "Testing", pct: 45, color: "bg-[#10b981]", shadow: "shadow-[0_4px_12px_rgba(16,185,129,0.4)]" },
              { label: "Deployment", pct: 28, color: "bg-[#f59e0b]", shadow: "shadow-[0_4px_12px_rgba(245,158,11,0.4)]" },
            ].map((bar, i) => (
              <RevealBlock key={bar.label} delay={i * 0.06}>
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-3">
                    <span className="text-gray-700">{bar.label}</span>
                    <span className="text-slate-400">{bar.pct}%</span>
                  </div>
                  <div
                    className="h-3 rounded-full overflow-hidden
                      shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]"
                    style={{ background: "#dde1e7" }}
                  >
                    <div
                      className={`h-full rounded-full ${bar.color} ${bar.shadow}`}
                      style={{ width: `${bar.pct}%` }}
                    />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 10. Testimonials                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#dde1e7] to-[#e8ecf0]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Testimonials</h2>
            <p className="text-slate-500 mb-12">Real teams building warmer products with Soft UI.</p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <RevealBlock key={t.author} delay={i * 0.1}>
                <div
                  className="group bg-white rounded-3xl p-8 h-full
                    shadow-[8px_8px_20px_rgba(0,0,0,0.07),-8px_-8px_20px_rgba(255,255,255,0.9)]
                    hover:shadow-[0_24px_48px_rgba(99,102,241,0.15)] hover:-translate-y-2
                    transition-all duration-500 ease-in-out"
                >
                  {/* Quote mark */}
                  <div className="text-4xl text-indigo-200 font-serif leading-none mb-4">&ldquo;</div>
                  <p className="text-slate-600 leading-relaxed text-sm mb-8">{t.quote}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div
                      className={`w-10 h-10 rounded-2xl ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0
                        shadow-lg ${t.shadow} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{t.author}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 11. Philosophy / Summary                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div
              className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-10 md:p-14 text-center
                shadow-[0_20px_60px_rgba(99,102,241,0.35)]"
            >
              <div
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 text-sm font-semibold text-white/80
                  bg-white/10 backdrop-blur-sm"
              >
                Design Philosophy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Make every pixel feel
                <br />
                warm and welcoming.
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Soft UI design is rooted in the belief that interfaces should feel friendly, not clinical.
                Through neumorphic depth, pastel palettes, and pillow-press interactions, we create
                digital experiences that users genuinely enjoy touching.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/styles/soft-ui"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-semibold
                    shadow-[0_8px_24px_rgba(0,0,0,0.15)]
                    hover:shadow-[0_16px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5
                    transition-all duration-300"
                >
                  View Full Docs
                </Link>
                <Link
                  href="/styles"
                  className="px-8 py-4 bg-white/10 text-white rounded-2xl font-semibold backdrop-blur-sm
                    hover:bg-white/20 hover:-translate-y-0.5
                    transition-all duration-300"
                >
                  Explore Styles
                </Link>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 12. Footer                                                          */}
      {/* ------------------------------------------------------------------ */}
      <footer className="py-10 px-4 md:px-8 border-t border-white/40"
        style={{ background: "#dde1e7" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center
                shadow-[4px_4px_10px_rgba(99,102,241,0.3)]"
            >
              <svg viewBox="0 0 20 20" fill="white" className="w-5 h-5">
                <path d="M10 2L2 7v6l8 5 8-5V7l-8-5z" />
              </svg>
            </span>
            <div>
              <p className="font-bold text-gray-800 text-sm">StyleKit</p>
              <p className="text-xs text-slate-400">Soft UI Showcase</p>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href="/styles"
              className="text-sm font-semibold text-slate-500 hover:text-indigo-500 transition-colors duration-200"
            >
              All Styles
            </Link>
            <Link
              href="/styles/soft-ui"
              className="text-sm font-semibold text-slate-500 hover:text-indigo-500 transition-colors duration-200"
            >
              Soft UI Docs
            </Link>
            <Link
              href="/"
              className="text-sm font-semibold text-slate-500 hover:text-indigo-500 transition-colors duration-200"
            >
              Home
            </Link>
          </nav>

          <p className="text-xs text-slate-400">
            StyleKit — Soft UI design system showcase
          </p>
        </div>
      </footer>
    </div>
  );
}
