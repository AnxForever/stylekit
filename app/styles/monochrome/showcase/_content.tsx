"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, inView } = useInView()
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
  )
}

const GRAYSCALE = [
  { hex: "#111111", label: "Deep", role: "Primary text, headings" },
  { hex: "#333333", label: "Dark", role: "Secondary headings" },
  { hex: "#666666", label: "Mid", role: "Body text, labels" },
  { hex: "#999999", label: "Muted", role: "Placeholders, captions" },
  { hex: "#cccccc", label: "Light Border", role: "Dividers, borders" },
  { hex: "#e5e5e5", label: "Surface", role: "Card borders, hairlines" },
  { hex: "#f5f5f5", label: "Near-white", role: "Card backgrounds" },
  { hex: "#fafafa", label: "Off-white", role: "Page backgrounds" },
  { hex: "#ffffff", label: "Pure White", role: "Active surfaces" },
]

const WEIGHTS = [
  { weight: "font-light", label: "Light — 300", sample: "The discipline of subtraction is harder than addition. Restraint demands more imagination than abundance." },
  { weight: "font-normal", label: "Normal — 400", sample: "Every element earns its place or is removed. There is no decoration for decoration's sake in monochrome design." },
  { weight: "font-medium", label: "Medium — 500", sample: "Font weight is the primary tool. Where color would speak loudly, weight whispers with equal authority." },
  { weight: "font-semibold", label: "Semibold — 600", sample: "Hierarchy emerges through contrast between light and heavy strokes — no hue required to establish dominance." },
  { weight: "font-bold", label: "Bold — 700", sample: "The bold anchor draws the eye. Everything else recedes into supporting silence around the bold statement." },
  { weight: "font-extrabold", label: "Extrabold — 800", sample: "Maximum weight for maximum gravity. Used sparingly, it commands absolute attention without spectacle." },
]

const COMPOSITIONS = [
  {
    title: "Editorial Grid",
    desc: "Large dark rectangle dominates. Text blocks float in negative space. A single hairline divides zones.",
  },
  {
    title: "Portfolio Spread",
    desc: "Three columns of varying height. Asymmetric tension. White breathing room between dark content blocks.",
  },
  {
    title: "Minimal Card",
    desc: "Full bleed image simulation. Title anchored bottom-left. Weight contrast carries all narrative.",
  },
]

const DO_ITEMS = [
  "Use font-weight contrast as your primary hierarchy tool",
  "Allow generous negative space to breathe between elements",
  "Keep borders to a single 1px hairline at #e5e5e5",
  "Slow down transitions to 500–700ms for deliberate elegance",
  "Let the grid enforce alignment — no arbitrary placement",
  "Use #111111 text on #ffffff for maximum readability",
  "Reserve bold weight for at most one element per section",
  "Communicate state changes through opacity, not color",
]

const DONT_ITEMS = [
  "Never introduce any hue — no blue links, no red errors",
  "Never use drop shadows or box-shadows with spread",
  "Never scale or translate elements on hover",
  "Never use more than 3 gray values in a single component",
  "Never add gradient backgrounds — flat surfaces only",
  "Never use rounded-full pill shapes (rectangular only)",
  "Never animate at speeds below 300ms or above 900ms",
  "Never rely on color alone to convey information state",
]

const LINE_CARDS = [
  {
    category: "Interface",
    title: "Line under label",
    desc: "A thin line grows from left to right beneath the label text on hover, marking the active selection.",
    linePos: "bottom",
  },
  {
    category: "Navigation",
    title: "Line beside icon",
    desc: "A vertical hairline appears to the left of the icon, growing from zero to full height on group hover.",
    linePos: "left",
  },
  {
    category: "Editorial",
    title: "Line above fold",
    desc: "Horizontal rule expands across the full card width before text, marking the editorial section break.",
    linePos: "top",
  },
  {
    category: "Data",
    title: "Line as progress",
    desc: "The line grows proportionally to represent progress or completion — no bar fill color needed.",
    linePos: "bottom",
  },
]

export default function MonochromeShowcase() {
  const [activeTab, setActiveTab] = useState<"buttons" | "cards" | "forms">("buttons")
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({ 0: true, 2: true })

  const { ref: heroRef, inView: heroInView } = useInView()
  const { ref: paletteRef, inView: paletteInView } = useInView()

  const toggleCheck = (i: number) => {
    setCheckedItems((prev) => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#111111]">

      {/* ── 1. NAV ─────────────────────────────────────────────────────────── */}
      <nav className="bg-[#ffffff] border-b border-[#e5e5e5] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-[#111111]">
            MONOCHROME
          </span>
          <div className="hidden md:flex items-center gap-10">
            {["System", "Components", "Typography", "Composition"].map((item) => (
              <span
                key={item}
                className="text-xs tracking-[0.15em] uppercase text-[#666666] hover:text-[#111111] transition-colors duration-700 cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
          <Link
            href="/styles/monochrome"
            className="group flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[#666666] hover:text-[#111111] transition-colors duration-700"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">&larr;</span>
            Back to Docs
          </Link>
        </div>
      </nav>

      {/* ── 2. HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#fafafa] py-40 border-b border-[#e5e5e5]">
        <div className="max-w-4xl mx-auto px-8 text-center" ref={heroRef}>
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <p className="text-xs font-light tracking-[0.4em] uppercase text-[#999999] mb-10">
              Visual System No. 01
            </p>
          </div>

          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <h1 className="text-7xl md:text-9xl font-bold text-[#111111] tracking-tight leading-none mb-4">
              THE ART OF
            </h1>
            <h1 className="text-7xl md:text-9xl font-light text-[#333333] tracking-tight leading-none">
              ABSENCE
            </h1>
          </div>

          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <div className="h-px w-24 bg-[#111111] mx-auto my-10" />
          </div>

          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <p className="text-lg font-light text-[#666666] max-w-xl mx-auto leading-relaxed mb-12">
              Monochrome is the discipline of building complete visual hierarchy
              using only the relationship between light and dark. Zero hue.
              Infinite depth.
            </p>
            <div className="flex items-center justify-center gap-6">
              <button className="bg-[#111111] text-[#fafafa] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#333333] transition-colors duration-700 cursor-pointer">
                Explore the System
              </button>
              <button className="border border-[#cccccc] text-[#666666] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:border-[#111111] hover:text-[#111111] transition-colors duration-700 cursor-pointer">
                View Principles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. COMPONENTS DEMO ─────────────────────────────────────────────── */}
      <section className="py-32 bg-[#ffffff] border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-8">
          <RevealBlock className="mb-16">
            <p className="text-xs font-light tracking-[0.4em] uppercase text-[#999999] mb-4">
              02 — Components
            </p>
            <h2 className="text-4xl font-bold text-[#111111] tracking-tight">
              Interaction Primitives
            </h2>
            <p className="text-base font-light text-[#666666] mt-4 max-w-lg">
              Every interactive element reduced to its essential form. Weight and
              space do the work that color is not allowed to do.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1} className="mb-12">
            <div className="flex border-b border-[#e5e5e5]">
              {(["buttons", "cards", "forms"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative text-xs tracking-[0.2em] uppercase px-8 py-4 transition-colors duration-700 cursor-pointer"
                  style={{
                    color: activeTab === tab ? "#111111" : "#999999",
                    fontWeight: activeTab === tab ? 600 : 300,
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  <span
                    className="absolute bottom-0 left-0 h-px bg-[#111111]"
                    style={{
                      width: activeTab === tab ? "100%" : "0%",
                      transition: "width 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content */}
          <div
            style={{
              opacity: 1,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* BUTTONS */}
            {activeTab === "buttons" && (
              <RevealBlock className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-[#999999] mb-8 font-light">
                    Primary Actions
                  </p>
                  <div className="flex flex-col gap-4">
                    <button className="bg-[#111111] text-[#fafafa] text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#2a2a2a] transition-colors duration-700 text-left cursor-pointer">
                      Primary Button
                    </button>
                    <button className="bg-[#333333] text-[#fafafa] text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#444444] transition-colors duration-700 text-left cursor-pointer">
                      Secondary Button
                    </button>
                    <button className="border border-[#111111] text-[#111111] text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#f5f5f5] transition-colors duration-700 text-left cursor-pointer">
                      Outline Button
                    </button>
                    <button className="border border-[#e5e5e5] text-[#666666] text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-[#999999] hover:text-[#333333] transition-colors duration-700 text-left cursor-pointer">
                      Ghost Button
                    </button>
                    <button className="text-[#111111] text-xs tracking-[0.2em] uppercase px-0 py-4 hover:text-[#666666] transition-colors duration-700 text-left cursor-pointer underline underline-offset-4 decoration-[#cccccc] hover:decoration-[#111111]">
                      Text Link Button
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-[#999999] mb-8 font-light">
                    States &amp; Variants
                  </p>
                  <div className="flex flex-col gap-4">
                    <button className="bg-[#111111] text-[#fafafa] text-xs tracking-[0.2em] uppercase px-8 py-4 cursor-not-allowed opacity-30">
                      Disabled State
                    </button>
                    <button className="border border-[#e5e5e5] text-[#999999] text-xs tracking-[0.2em] uppercase px-8 py-4 flex items-center gap-3 cursor-pointer hover:border-[#999999] transition-colors duration-700">
                      <span className="w-4 h-4 border border-[#999999] inline-block" />
                      With Icon
                    </button>
                    <button className="bg-[#111111] text-[#fafafa] text-xs tracking-[0.2em] uppercase px-8 py-4 w-full hover:bg-[#2a2a2a] transition-colors duration-700 cursor-pointer">
                      Full Width
                    </button>
                    <div className="flex gap-3">
                      <button className="bg-[#111111] text-[#fafafa] text-xs tracking-[0.2em] uppercase px-5 py-3 hover:bg-[#2a2a2a] transition-colors duration-700 cursor-pointer">
                        Small
                      </button>
                      <button className="bg-[#111111] text-[#fafafa] text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#2a2a2a] transition-colors duration-700 cursor-pointer">
                        Medium
                      </button>
                      <button className="bg-[#111111] text-[#fafafa] text-sm tracking-[0.2em] uppercase px-10 py-5 hover:bg-[#2a2a2a] transition-colors duration-700 cursor-pointer">
                        Large
                      </button>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}

            {/* CARDS */}
            {activeTab === "cards" && (
              <RevealBlock className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: "Article",
                    title: "The Grammar of Silence",
                    body: "Emptiness is not the absence of content. It is the presence of deliberate restraint.",
                    meta: "Essay — 8 min read",
                  },
                  {
                    label: "Project",
                    title: "System Reduction",
                    body: "Each iteration strips away one more unnecessary element until only the essential remains.",
                    meta: "Case Study — 2024",
                  },
                  {
                    label: "Reference",
                    title: "Weight as Signal",
                    body: "Bold text on a light field creates the same urgency as red on white — without the color.",
                    meta: "Principle — Typography",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="group border border-[#e5e5e5] bg-[#f5f5f5] p-8 hover:bg-[#eeeeee] transition-colors duration-700 cursor-pointer"
                  >
                    <p className="text-xs tracking-[0.25em] uppercase text-[#999999] font-light mb-6">
                      {card.label}
                    </p>
                    <h3 className="text-lg font-semibold text-[#111111] mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-sm font-light text-[#666666] leading-relaxed mb-8">
                      {card.body}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-light text-[#999999] tracking-wide">
                        {card.meta}
                      </span>
                      <span
                        className="h-px bg-[#111111] block"
                        style={{
                          width: 0,
                          transition: "width 0.7s cubic-bezier(0.16,1,0.3,1)",
                        }}
                      />
                    </div>
                    <div className="mt-4 overflow-hidden">
                      <span
                        className="h-px bg-[#111111] block group-hover:w-12 transition-all duration-700"
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </RevealBlock>
            )}

            {/* FORMS */}
            {activeTab === "forms" && (
              <RevealBlock className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="flex flex-col gap-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-[#999999] font-light">
                    Text Inputs
                  </p>
                  {[
                    { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                    { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                    { id: "subject", label: "Subject", type: "text", placeholder: "What is this regarding" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label className="block text-xs tracking-widest uppercase text-[#666666] font-medium mb-3">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        onFocus={() => setFocusedInput(field.id)}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full bg-transparent text-sm font-light text-[#111111] pb-3 outline-none placeholder-[#cccccc]"
                        style={{
                          borderBottom: `1px solid ${focusedInput === field.id ? "#111111" : "#e5e5e5"}`,
                          transition: "border-color 0.7s ease",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-[#999999] font-light">
                    Selection Controls
                  </p>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#666666] font-medium mb-4">
                      Preferences
                    </label>
                    <div className="flex flex-col gap-4">
                      {["Receive updates", "Enable notifications", "Subscribe to digest", "Share anonymized data"].map(
                        (item, i) => (
                          <button
                            key={i}
                            onClick={() => toggleCheck(i)}
                            className="flex items-center gap-4 cursor-pointer text-left"
                          >
                            <span
                              className="w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors duration-700"
                              style={{
                                borderColor: checkedItems[i] ? "#111111" : "#cccccc",
                                backgroundColor: checkedItems[i] ? "#111111" : "transparent",
                              }}
                            >
                              {checkedItems[i] && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="square" />
                                </svg>
                              )}
                            </span>
                            <span
                              className="text-sm font-light transition-colors duration-700"
                              style={{ color: checkedItems[i] ? "#111111" : "#999999" }}
                            >
                              {item}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs tracking-widest uppercase text-[#666666] font-medium mb-4">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Your message here..."
                      onFocus={() => setFocusedInput("message")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full bg-transparent text-sm font-light text-[#111111] outline-none placeholder-[#cccccc] resize-none p-3"
                      style={{
                        border: `1px solid ${focusedInput === "message" ? "#111111" : "#e5e5e5"}`,
                        transition: "border-color 0.7s ease",
                      }}
                    />
                  </div>
                </div>
              </RevealBlock>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. GRAYSCALE SYSTEM ─────────────────────────────────────────────── */}
      <section className="py-32 bg-[#f5f5f5] border-b border-[#e5e5e5]" ref={paletteRef}>
        <div className="max-w-6xl mx-auto px-8">
          <RevealBlock className="mb-16">
            <p className="text-xs font-light tracking-[0.4em] uppercase text-[#999999] mb-4">
              03 — Color System
            </p>
            <h2 className="text-4xl font-bold text-[#111111] tracking-tight">
              The Grayscale Palette
            </h2>
            <p className="text-base font-light text-[#666666] mt-4 max-w-lg">
              Nine values. Zero hue. Every shade serves a precise structural role.
              The entire system lives in the distance between #111111 and #ffffff.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-3 md:grid-cols-9 gap-0">
            {GRAYSCALE.map((swatch, i) => (
              <div
                key={swatch.hex}
                style={{
                  opacity: paletteInView ? 1 : 0,
                  transform: paletteInView ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
                }}
              >
                <div
                  className="h-40"
                  style={{
                    backgroundColor: swatch.hex,
                    border: swatch.hex === "#ffffff" || swatch.hex === "#fafafa" || swatch.hex === "#f5f5f5"
                      ? "1px solid #e5e5e5"
                      : "none",
                  }}
                />
                <div className="pt-4 pb-2">
                  <p className="text-xs font-medium text-[#111111] tracking-wider">
                    {swatch.hex}
                  </p>
                  <p className="text-xs font-light text-[#666666] mt-1">
                    {swatch.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { pair: ["#111111", "#ffffff"], label: "Deep on White", ratio: "18.1:1", grade: "AAA" },
              { pair: ["#333333", "#ffffff"], label: "Dark on White", ratio: "10.4:1", grade: "AAA" },
              { pair: ["#666666", "#ffffff"], label: "Mid on White", ratio: "5.7:1", grade: "AA" },
            ].map((contrast) => (
              <RevealBlock key={contrast.label} className="border border-[#e5e5e5] bg-[#ffffff] p-8">
                <div className="flex gap-3 mb-6">
                  {contrast.pair.map((c) => (
                    <div
                      key={c}
                      className="w-10 h-10"
                      style={{
                        backgroundColor: c,
                        border: c === "#ffffff" ? "1px solid #e5e5e5" : "none",
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#999999] font-light mb-2">
                  {contrast.label}
                </p>
                <p className="text-2xl font-bold text-[#111111]">{contrast.ratio}</p>
                <p className="text-xs font-light text-[#666666] mt-2">
                  WCAG {contrast.grade} Compliant
                </p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TYPOGRAPHY HIERARCHY ─────────────────────────────────────────── */}
      <section className="py-32 bg-[#ffffff] border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-8">
          <RevealBlock className="mb-16">
            <p className="text-xs font-light tracking-[0.4em] uppercase text-[#999999] mb-4">
              04 — Typography
            </p>
            <h2 className="text-4xl font-bold text-[#111111] tracking-tight">
              Weight as Hierarchy
            </h2>
            <p className="text-base font-light text-[#666666] mt-4 max-w-lg">
              Font weight is the sole differentiator. Six weight steps create the
              entire information hierarchy — all at the same gray value, same size.
            </p>
          </RevealBlock>

          <div className="flex flex-col divide-y divide-[#e5e5e5]">
            {WEIGHTS.map((w, i) => (
              <RevealBlock key={w.weight} delay={i * 0.05} className="py-10 grid grid-cols-12 gap-8 items-start">
                <div className="col-span-3">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#999999] font-light mb-2">
                    {w.label}
                  </p>
                  <div className="h-px w-8 bg-[#e5e5e5] mt-3" />
                </div>
                <div className="col-span-9">
                  <p
                    className={`text-base text-[#333333] leading-relaxed ${w.weight}`}
                  >
                    {w.sample}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.3} className="mt-20 border border-[#e5e5e5] p-12 bg-[#f5f5f5]">
            <p className="text-xs tracking-[0.3em] uppercase text-[#999999] font-light mb-8">
              Weight Cascade — All One Color
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-5xl font-extrabold text-[#111111] tracking-tight leading-none">Extrabold Commands</p>
              <p className="text-3xl font-bold text-[#111111] tracking-tight leading-none">Bold Establishes</p>
              <p className="text-2xl font-semibold text-[#333333] tracking-tight">Semibold Supports</p>
              <p className="text-xl font-medium text-[#444444]">Medium Participates</p>
              <p className="text-lg font-normal text-[#666666]">Normal Narrates</p>
              <p className="text-base font-light text-[#999999]">Light Recedes Into The Background</p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 6. COMPOSITION DEMO ─────────────────────────────────────────────── */}
      <section className="py-32 bg-[#111111] border-b border-[#333333]">
        <div className="max-w-6xl mx-auto px-8">
          <RevealBlock className="mb-16">
            <p className="text-xs font-light tracking-[0.4em] uppercase text-[#666666] mb-4">
              05 — Composition
            </p>
            <h2 className="text-4xl font-bold text-[#fafafa] tracking-tight">
              Grid-Based Geometry
            </h2>
            <p className="text-base font-light text-[#666666] mt-4 max-w-lg">
              Three compositional archetypes. Dark backgrounds reveal the purity of
              grayscale geometry when color is removed from the equation entirely.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Editorial Grid */}
            <RevealBlock delay={0} className="border border-[#333333]">
              <div className="bg-[#222222] h-52 relative p-6">
                <div className="absolute top-6 left-6 right-6 bottom-6 border border-[#444444]" />
                <div className="absolute bottom-8 left-8">
                  <div className="h-px w-16 bg-[#666666] mb-3" />
                  <div className="h-2 w-24 bg-[#555555]" />
                </div>
                <div className="absolute top-8 right-8 w-10 h-10 border border-[#555555]" />
              </div>
              <div className="p-6 border-t border-[#333333]">
                <p className="text-xs tracking-[0.2em] uppercase text-[#666666] font-light mb-2">
                  {COMPOSITIONS[0].title}
                </p>
                <p className="text-sm font-light text-[#999999] leading-relaxed">
                  {COMPOSITIONS[0].desc}
                </p>
              </div>
            </RevealBlock>

            {/* Portfolio Spread */}
            <RevealBlock delay={0.1} className="border border-[#333333]">
              <div className="bg-[#1a1a1a] h-52 relative grid grid-cols-3 gap-1 p-6">
                <div className="bg-[#333333] col-span-2" />
                <div className="flex flex-col gap-1">
                  <div className="bg-[#2a2a2a] flex-1" />
                  <div className="bg-[#444444] flex-1" />
                  <div className="bg-[#2a2a2a] flex-1" />
                </div>
                <div className="col-span-3 mt-1 bg-[#222222] h-6 flex items-center px-2">
                  <div className="h-px w-8 bg-[#555555]" />
                </div>
              </div>
              <div className="p-6 border-t border-[#333333]">
                <p className="text-xs tracking-[0.2em] uppercase text-[#666666] font-light mb-2">
                  {COMPOSITIONS[1].title}
                </p>
                <p className="text-sm font-light text-[#999999] leading-relaxed">
                  {COMPOSITIONS[1].desc}
                </p>
              </div>
            </RevealBlock>

            {/* Minimal Card */}
            <RevealBlock delay={0.2} className="border border-[#333333]">
              <div className="bg-[#2a2a2a] h-52 relative p-6">
                <div className="absolute inset-0 bg-[#1a1a1a] m-4 flex flex-col justify-end p-6">
                  <div className="h-px w-12 bg-[#555555] mb-3" />
                  <div className="h-3 w-28 bg-[#fafafa] mb-2 opacity-80" />
                  <div className="h-2 w-20 bg-[#666666]" />
                </div>
              </div>
              <div className="p-6 border-t border-[#333333]">
                <p className="text-xs tracking-[0.2em] uppercase text-[#666666] font-light mb-2">
                  {COMPOSITIONS[2].title}
                </p>
                <p className="text-sm font-light text-[#999999] leading-relaxed">
                  {COMPOSITIONS[2].desc}
                </p>
              </div>
            </RevealBlock>
          </div>

          {/* Wide composition */}
          <RevealBlock delay={0.3} className="mt-6 border border-[#333333]">
            <div className="bg-[#1a1a1a] h-64 grid grid-cols-12 gap-0 relative">
              <div className="col-span-7 bg-[#222222] relative">
                <div className="absolute inset-4 border border-[#333333]" />
                <div className="absolute bottom-8 left-8">
                  <div className="h-px w-20 bg-[#555555] mb-4" />
                  <div className="h-4 w-40 bg-[#444444] mb-2" />
                  <div className="h-3 w-28 bg-[#333333]" />
                </div>
              </div>
              <div className="col-span-5 flex flex-col">
                <div className="flex-1 border-b border-[#333333] p-6 flex flex-col justify-end">
                  <div className="h-2 w-24 bg-[#444444] mb-2" />
                  <div className="h-px w-16 bg-[#333333]" />
                </div>
                <div className="flex-1 border-b border-[#333333] p-6 flex items-center">
                  <div className="w-8 h-8 border border-[#444444] mr-4" />
                  <div>
                    <div className="h-2 w-16 bg-[#555555] mb-2" />
                    <div className="h-2 w-12 bg-[#333333]" />
                  </div>
                </div>
                <div className="flex-1 p-6 flex items-end">
                  <div className="h-px w-full bg-[#333333]" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#333333]">
              <p className="text-xs tracking-[0.2em] uppercase text-[#666666] font-light">
                Wide Editorial — 12-column grid, two-zone layout
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 7. DO / DON'T ───────────────────────────────────────────────────── */}
      <section className="py-32 bg-[#fafafa] border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-8">
          <RevealBlock className="mb-16">
            <p className="text-xs font-light tracking-[0.4em] uppercase text-[#999999] mb-4">
              06 — Principles
            </p>
            <h2 className="text-4xl font-bold text-[#111111] tracking-tight">
              Rules of the System
            </h2>
            <p className="text-base font-light text-[#666666] mt-4 max-w-lg">
              Monochrome has strict disciplines. These boundaries are what give the
              system its coherence and authority.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* DO */}
            <RevealBlock delay={0}>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#111111]" />
                <p className="text-xs tracking-[0.3em] uppercase text-[#111111] font-semibold">
                  Do
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {DO_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="border border-[#e5e5e5] bg-[#ffffff] px-6 py-5 flex items-start gap-4 hover:border-[#cccccc] transition-colors duration-700"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                      <path d="M2 8L6 12L14 4" stroke="#111111" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                    <p className="text-sm font-light text-[#333333] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.1}>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#e5e5e5]" />
                <p className="text-xs tracking-[0.3em] uppercase text-[#999999] font-light">
                  Don&apos;t
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {DONT_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="border border-[#e5e5e5] bg-[#f5f5f5] px-6 py-5 flex items-start gap-4"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5 opacity-40">
                      <path d="M3 3L13 13M13 3L3 13" stroke="#111111" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                    <p className="text-sm font-light text-[#999999] line-through leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── 8. LINE GROWTH INTERACTIONS ────────────────────────────────────── */}
      <section className="py-32 bg-[#ffffff] border-b border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-8">
          <RevealBlock className="mb-16">
            <p className="text-xs font-light tracking-[0.4em] uppercase text-[#999999] mb-4">
              07 — Interaction
            </p>
            <h2 className="text-4xl font-bold text-[#111111] tracking-tight">
              The Line Growth Signature
            </h2>
            <p className="text-base font-light text-[#666666] mt-4 max-w-lg">
              Hover over each card to observe the signature monochrome interaction: a
              1px line growing at 700ms — no color change, no transform, no shadow.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LINE_CARDS.map((card, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                {card.linePos === "top" ? (
                  <div className="group border border-[#e5e5e5] p-10 hover:border-[#cccccc] transition-colors duration-700 cursor-pointer">
                    <div className="overflow-hidden mb-8 h-px">
                      <div
                        className="h-px bg-[#111111] group-hover:w-full transition-all duration-700"
                        style={{ width: 0 }}
                      />
                    </div>
                    <p className="text-xs tracking-[0.25em] uppercase text-[#999999] font-light mb-3">
                      {card.category}
                    </p>
                    <h3 className="text-xl font-semibold text-[#111111] mb-4">{card.title}</h3>
                    <p className="text-sm font-light text-[#666666] leading-relaxed">{card.desc}</p>
                  </div>
                ) : card.linePos === "left" ? (
                  <div className="group border border-[#e5e5e5] p-10 hover:border-[#cccccc] transition-colors duration-700 cursor-pointer flex gap-8">
                    <div className="flex-shrink-0 overflow-hidden" style={{ width: 1 }}>
                      <div
                        className="w-px bg-[#111111] group-hover:h-full transition-all duration-700"
                        style={{ height: 0 }}
                      />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.25em] uppercase text-[#999999] font-light mb-3">
                        {card.category}
                      </p>
                      <h3 className="text-xl font-semibold text-[#111111] mb-4">{card.title}</h3>
                      <p className="text-sm font-light text-[#666666] leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ) : (
                  <div className="group border border-[#e5e5e5] p-10 hover:border-[#cccccc] transition-colors duration-700 cursor-pointer">
                    <p className="text-xs tracking-[0.25em] uppercase text-[#999999] font-light mb-3">
                      {card.category}
                    </p>
                    <h3 className="text-xl font-semibold text-[#111111] mb-4">{card.title}</h3>
                    <p className="text-sm font-light text-[#666666] leading-relaxed mb-8">{card.desc}</p>
                    <div className="overflow-hidden h-px">
                      <div
                        className="h-px bg-[#111111] group-hover:w-full transition-all duration-700"
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                )}
              </RevealBlock>
            ))}
          </div>

          {/* Wide line demo */}
          <RevealBlock delay={0.3} className="mt-12">
            <div className="group border border-[#e5e5e5] p-12 hover:border-[#cccccc] transition-colors duration-700 cursor-pointer grid grid-cols-12 gap-8 items-center">
              <div className="col-span-8">
                <p className="text-xs tracking-[0.25em] uppercase text-[#999999] font-light mb-4">
                  Full-Width Reveal
                </p>
                <h3 className="text-2xl font-semibold text-[#111111] mb-3">
                  Every boundary is a horizon
                </h3>
                <p className="text-base font-light text-[#666666] leading-relaxed">
                  The line that spans the full width of a card on hover signals
                  completion — arrival at the end of an idea. The 700ms timing
                  makes the reveal feel considered, not reactive.
                </p>
              </div>
              <div className="col-span-4 flex flex-col items-end gap-4">
                <div className="overflow-hidden h-px w-full">
                  <div
                    className="h-px bg-[#111111] group-hover:w-full transition-all duration-700"
                    style={{ width: 0 }}
                  />
                </div>
                <p className="text-xs font-light text-[#cccccc] tracking-widest uppercase">
                  Hover to reveal
                </p>
                <div className="overflow-hidden h-px w-full">
                  <div
                    className="h-px bg-[#e5e5e5] group-hover:w-full transition-all duration-700"
                    style={{ width: 0, transitionDelay: "0.1s" }}
                  />
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Stacked line variation */}
          <RevealBlock delay={0.4} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Articles Published", value: "284", sub: "This year" },
              { label: "Design Systems", value: "47", sub: "Documented" },
              { label: "Components Built", value: "1,200+", sub: "In production" },
            ].map((stat, i) => (
              <div
                key={i}
                className="group border border-[#e5e5e5] p-8 hover:border-[#cccccc] transition-colors duration-700 cursor-pointer"
              >
                <p className="text-xs tracking-[0.25em] uppercase text-[#999999] font-light mb-6">
                  {stat.label}
                </p>
                <p className="text-5xl font-bold text-[#111111] mb-2">{stat.value}</p>
                <p className="text-xs font-light text-[#999999]">{stat.sub}</p>
                <div className="mt-6 overflow-hidden h-px">
                  <div
                    className="h-px bg-[#111111] group-hover:w-full transition-all duration-700"
                    style={{ width: 0 }}
                  />
                </div>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ── 9. MANIFESTO STRIP ──────────────────────────────────────────────── */}
      <section className="py-32 bg-[#111111] border-b border-[#333333]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <RevealBlock>
            <p className="text-xs font-light tracking-[0.4em] uppercase text-[#555555] mb-12">
              08 — Philosophy
            </p>
            <blockquote className="text-3xl md:text-4xl font-light text-[#cccccc] leading-relaxed mb-12">
              &ldquo;Perfection is achieved, not when there is nothing more to add, but when
              there is nothing left to take away.&rdquo;
            </blockquote>
            <div className="h-px w-16 bg-[#444444] mx-auto mb-8" />
            <p className="text-xs font-light tracking-[0.3em] uppercase text-[#555555]">
              Antoine de Saint-Exup&eacute;ry &mdash; Adapted for Design Systems
            </p>
          </RevealBlock>

          <RevealBlock delay={0.2} className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                heading: "Restraint",
                body: "The power of monochrome comes from what you refuse to include. Every omission is an active choice.",
              },
              {
                heading: "Hierarchy",
                body: "Weight, size, and space create information architecture without any assistance from hue or saturation.",
              },
              {
                heading: "Durability",
                body: "A system with zero color never goes out of style. It has no trend to follow and no trend to abandon.",
              },
            ].map((item) => (
              <div key={item.heading} className="text-left">
                <div className="h-px w-8 bg-[#444444] mb-6" />
                <h3 className="text-lg font-semibold text-[#cccccc] mb-4">{item.heading}</h3>
                <p className="text-sm font-light text-[#666666] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="py-24 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="h-px w-full bg-[#e5e5e5] mb-16" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-xs font-medium tracking-[0.4em] uppercase text-[#111111] mb-2">
                MONOCHROME
              </p>
              <p className="text-xs font-light tracking-[0.2em] uppercase text-[#cccccc]">
                A StyleKit Visual System
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="h-px w-12 bg-[#e5e5e5]" />
              <p className="text-xs font-light tracking-[0.25em] uppercase text-[#cccccc]">
                Zero Hue &mdash; All Depth
              </p>
              <div className="h-px w-12 bg-[#e5e5e5]" />
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs font-light tracking-[0.2em] uppercase text-[#cccccc] mb-2">
                &copy; 2024 StyleKit
              </p>
              <p className="text-xs font-light tracking-[0.2em] uppercase text-[#cccccc]">
                All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
