"use client"

import { useState, useRef, useEffect } from "react"

// ─── Inline Hooks & Utilities ──────────────────────────────────────────────

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

// ─── Zone Types & Data ─────────────────────────────────────────────────────

type ZoneId = "top-left" | "top-right" | "diagonal" | "bottom-left" | "bottom-right" | null

interface ZoneInfo {
  id: ZoneId
  label: string
  position: string
  color: string
  bg: string
  border: string
  description: string
  tip: string
  step: number
}

const zones: ZoneInfo[] = [
  {
    id: "top-left",
    label: "Top Left",
    position: "Logo / Brand",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-400",
    description:
      "The first point of fixation. Users' eyes begin here. Place your logo, brand name, or most critical identifier. This anchors trust immediately.",
    tip: "Logo, brand mark, or navigation home link",
    step: 1,
  },
  {
    id: "top-right",
    label: "Top Right",
    position: "Primary CTA / Nav",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-400",
    description:
      "The second fixation point. Eyes scan horizontally from top-left. Place your primary navigation or the most important action — often a sign-up or contact button.",
    tip: "Navigation links, sign-up button, or contact CTA",
    step: 2,
  },
  {
    id: "diagonal",
    label: "Center Diagonal",
    position: "Core Value Proposition",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-400",
    description:
      "The Z-diagonal is the connective tissue. The eye travels diagonally from top-right to bottom-left. This path hosts your hero content — headline, imagery, and key message.",
    tip: "Hero headline, key visual, value proposition statement",
    step: 3,
  },
  {
    id: "bottom-left",
    label: "Bottom Left",
    position: "Trust / Supporting Info",
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-400",
    description:
      "The fourth fixation point. After the diagonal, eyes land here. Use this for trust signals, social proof, testimonials, or supporting information that reinforces the proposition.",
    tip: "Trust badges, testimonials, feature highlights",
    step: 4,
  },
  {
    id: "bottom-right",
    label: "Bottom Right",
    position: "Final CTA",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-500",
    description:
      "The final fixation point — the conversion moment. After completing the Z-scan, users are primed and informed. Place your final, most compelling call-to-action here.",
    tip: "Final CTA button, form submit, or purchase action",
    step: 5,
  },
]

type LayoutTab = "saas" | "product" | "portfolio"

// ─── Main Component ────────────────────────────────────────────────────────

export default function ZPatternLayoutShowcase() {
  const [activeZone, setActiveZone] = useState<ZoneId>(null)
  const [layoutTab, setLayoutTab] = useState<LayoutTab>("saas")
  const [emailValue, setEmailValue] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [zPathVisible, setZPathVisible] = useState(false)

  const { ref: heroRef, inView: heroInView } = useInView()
  const { ref: demoRef, inView: demoInView } = useInView()
  const { ref: componentRef, inView: componentInView } = useInView()
  const { ref: variationsRef, inView: variationsInView } = useInView()
  const { ref: colorRef, inView: colorInView } = useInView()
  const { ref: rulesRef, inView: rulesInView } = useInView()

  const activeZoneInfo = zones.find((z) => z.id === activeZone) ?? null

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (emailValue.trim()) {
      setEmailSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      {/* ══════════════════════════════════════════════════════
          Section 1: Fixed Navigation — Z-Pattern Top Row
          ══════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Top-Left: Logo / Brand — Z-Pattern Zone 1 */}
            <div className="flex items-center gap-4">
              <a
                href="/styles"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1 group"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform inline-block">&larr;</span>
                <span>StyleKit</span>
              </a>
              <div className="w-px h-5 bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-md">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
                    <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.9" />
                    <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
                    <path d="M6 6 L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
                    <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.9" />
                  </svg>
                </div>
                <span className="font-semibold text-slate-900 tracking-tight text-sm hidden sm:block">
                  Z-Pattern Layout
                </span>
              </div>
            </div>

            {/* Top-Right: Navigation + Primary CTA — Z-Pattern Zone 2 */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden md:flex items-center gap-5 text-sm text-slate-600">
                <a href="#demo" className="hover:text-slate-900 transition-colors">
                  Demo
                </a>
                <a href="#variations" className="hover:text-slate-900 transition-colors">
                  Variations
                </a>
                <a href="#rules" className="hover:text-slate-900 transition-colors">
                  Rules
                </a>
              </div>
              <a
                href="#visualizer"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 hover:shadow-indigo-300"
              >
                Try It Live
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* ══════════════════════════════════════════════════════
          Section 2: Hero — Interactive Z-Pattern Visualizer
          ══════════════════════════════════════════════════════ */}
      <section id="visualizer" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef}>
            {/* Hero header */}
            <div
              className="text-center mb-16"
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-6 tracking-wide uppercase">
                Layout Pattern
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                The Z-Pattern
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600">
                  Eye Tracking Layout
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Based on natural eye-tracking research, the Z-pattern guides users through content in the exact order
                they naturally scan a page — maximizing engagement and conversions.
              </p>
            </div>

            {/* Interactive Z-Pattern Visualizer */}
            <div
              className="max-w-5xl mx-auto"
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(40px)",
                transition:
                  "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              <div className="grid lg:grid-cols-5 gap-6 items-start">
                {/* Zone Grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
                    {/* Visualizer header */}
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-xs text-slate-400 font-mono">z-pattern-visualizer.tsx</span>
                      <button
                        onClick={() => setZPathVisible((v) => !v)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                      >
                        {zPathVisible ? "Hide Path" : "Show Z-Path"}
                      </button>
                    </div>

                    {/* Grid area */}
                    <div className="p-6 relative">
                      {/* Z-path SVG overlay */}
                      {zPathVisible && (
                        <svg
                          className="absolute inset-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)] pointer-events-none z-10"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                              <path d="M0,0 L8,4 L0,8 Z" fill="#6366f1" fillOpacity="0.8" />
                            </marker>
                          </defs>
                          {/* Top horizontal */}
                          <line
                            x1="12"
                            y1="20"
                            x2="85"
                            y2="20"
                            stroke="#6366f1"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                            strokeOpacity="0.7"
                            markerEnd="url(#arrowhead)"
                          />
                          {/* Diagonal */}
                          <line
                            x1="88"
                            y1="22"
                            x2="14"
                            y2="78"
                            stroke="#6366f1"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                            strokeOpacity="0.7"
                            markerEnd="url(#arrowhead)"
                          />
                          {/* Bottom horizontal */}
                          <line
                            x1="12"
                            y1="82"
                            x2="85"
                            y2="82"
                            stroke="#6366f1"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                            strokeOpacity="0.7"
                            markerEnd="url(#arrowhead)"
                          />
                        </svg>
                      )}

                      {/* Top row: zones 1 + 2 */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {/* Zone 1: Top Left */}
                        <button
                          onClick={() => setActiveZone(activeZone === "top-left" ? null : "top-left")}
                          className={`group relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            activeZone === "top-left"
                              ? "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100"
                              : "border-dashed border-slate-300 hover:border-indigo-300 hover:bg-indigo-50/50"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg mb-2 flex items-center justify-center text-sm font-bold transition-colors ${
                              activeZone === "top-left"
                                ? "bg-indigo-500 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                            }`}
                          >
                            1
                          </div>
                          <div
                            className={`text-xs font-semibold mb-0.5 transition-colors ${
                              activeZone === "top-left" ? "text-indigo-700" : "text-slate-600"
                            }`}
                          >
                            Top Left
                          </div>
                          <div className="text-xs text-slate-400">Logo / Brand</div>
                        </button>

                        {/* Zone 2: Top Right */}
                        <button
                          onClick={() => setActiveZone(activeZone === "top-right" ? null : "top-right")}
                          className={`group relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            activeZone === "top-right"
                              ? "border-cyan-500 bg-cyan-50 shadow-lg shadow-cyan-100"
                              : "border-dashed border-slate-300 hover:border-cyan-300 hover:bg-cyan-50/50"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg mb-2 flex items-center justify-center text-sm font-bold transition-colors ${
                              activeZone === "top-right"
                                ? "bg-cyan-500 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-cyan-100 group-hover:text-cyan-600"
                            }`}
                          >
                            2
                          </div>
                          <div
                            className={`text-xs font-semibold mb-0.5 transition-colors ${
                              activeZone === "top-right" ? "text-cyan-700" : "text-slate-600"
                            }`}
                          >
                            Top Right
                          </div>
                          <div className="text-xs text-slate-400">Nav / CTA</div>
                        </button>
                      </div>

                      {/* Zone 3: Diagonal center */}
                      <div className="mb-3">
                        <button
                          onClick={() => setActiveZone(activeZone === "diagonal" ? null : "diagonal")}
                          className={`group w-full p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                            activeZone === "diagonal"
                              ? "border-amber-500 bg-amber-50 shadow-lg shadow-amber-100"
                              : "border-dashed border-slate-300 hover:border-amber-300 hover:bg-amber-50/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                                activeZone === "diagonal"
                                  ? "bg-amber-500 text-white"
                                  : "bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-600"
                              }`}
                            >
                              3
                            </div>
                            <div>
                              <div
                                className={`text-xs font-semibold mb-0.5 transition-colors ${
                                  activeZone === "diagonal" ? "text-amber-700" : "text-slate-600"
                                }`}
                              >
                                Center Diagonal
                              </div>
                              <div className="text-xs text-slate-400">
                                Hero / Value Proposition — eye travels diagonally across this zone
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Bottom row: zones 4 + 5 */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Zone 4: Bottom Left */}
                        <button
                          onClick={() => setActiveZone(activeZone === "bottom-left" ? null : "bottom-left")}
                          className={`group relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            activeZone === "bottom-left"
                              ? "border-pink-500 bg-pink-50 shadow-lg shadow-pink-100"
                              : "border-dashed border-slate-300 hover:border-pink-300 hover:bg-pink-50/50"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg mb-2 flex items-center justify-center text-sm font-bold transition-colors ${
                              activeZone === "bottom-left"
                                ? "bg-pink-500 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-pink-100 group-hover:text-pink-600"
                            }`}
                          >
                            4
                          </div>
                          <div
                            className={`text-xs font-semibold mb-0.5 transition-colors ${
                              activeZone === "bottom-left" ? "text-pink-700" : "text-slate-600"
                            }`}
                          >
                            Bottom Left
                          </div>
                          <div className="text-xs text-slate-400">Trust / Support</div>
                        </button>

                        {/* Zone 5: Bottom Right */}
                        <button
                          onClick={() => setActiveZone(activeZone === "bottom-right" ? null : "bottom-right")}
                          className={`group relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            activeZone === "bottom-right"
                              ? "border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100"
                              : "border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg mb-2 flex items-center justify-center text-sm font-bold transition-colors ${
                              activeZone === "bottom-right"
                                ? "bg-indigo-700 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-700"
                            }`}
                          >
                            5
                          </div>
                          <div
                            className={`text-xs font-semibold mb-0.5 transition-colors ${
                              activeZone === "bottom-right" ? "text-indigo-800" : "text-slate-600"
                            }`}
                          >
                            Bottom Right
                          </div>
                          <div className="text-xs text-slate-400">Final CTA</div>
                        </button>
                      </div>

                      {/* Instruction label */}
                      {activeZone === null && (
                        <div className="mt-4 text-center">
                          <p className="text-xs text-slate-400 font-medium">
                            Click any zone to learn about its role in the Z-pattern
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Zone Detail Panel */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {activeZoneInfo ? (
                    <div
                      className={`rounded-2xl border-2 ${activeZoneInfo.border} ${activeZoneInfo.bg} p-6`}
                      style={{ animation: "fadeSlideIn 0.25s cubic-bezier(0.16,1,0.3,1)" }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div
                          className={`w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-base font-bold border ${activeZoneInfo.border} ${activeZoneInfo.color}`}
                        >
                          {activeZoneInfo.step}
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${activeZoneInfo.color}`}>{activeZoneInfo.label}</div>
                          <div className="text-xs text-slate-500">{activeZoneInfo.position}</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed mb-4">{activeZoneInfo.description}</p>
                      <div className="bg-white/70 rounded-lg px-3 py-2.5 border border-white/50">
                        <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Best For</div>
                        <div className="text-sm text-slate-700">{activeZoneInfo.tip}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-3">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-indigo-500">
                          <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M11 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="11" cy="15" r="0.75" fill="currentColor" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-slate-600 mb-1">Select a Zone</p>
                      <p className="text-xs text-slate-400">
                        Click any zone in the visualizer to see its role, purpose, and placement guidance
                      </p>
                    </div>
                  )}

                  {/* Zone sequence legend */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                      Z-Scan Sequence
                    </div>
                    <div className="space-y-2">
                      {zones.map((z) => (
                        <button
                          key={z.id}
                          onClick={() => setActiveZone(activeZone === z.id ? null : z.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-xs ${
                            activeZone === z.id
                              ? `${z.bg} ${z.border} border`
                              : "hover:bg-slate-50 border border-transparent"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                              activeZone === z.id
                                ? `${z.color} bg-white border ${z.border}`
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {z.step}
                          </span>
                          <span className={`font-medium ${activeZone === z.id ? z.color : "text-slate-600"}`}>
                            {z.label}
                          </span>
                          <span className="text-slate-400 truncate">{z.position}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Section 3: Full Z-Layout Demo — Mini Landing Page
          ══════════════════════════════════════════════════════ */}
      <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-medium mb-4 tracking-wide uppercase">
              Live Demonstration
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Z-Pattern in Action</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              A complete mini landing page demonstrating every zone of the Z-pattern working together in harmony.
            </p>
          </RevealBlock>

          <div ref={demoRef}>
            <div
              className="rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200 overflow-hidden bg-white"
              style={{
                opacity: demoInView ? 1 : 0,
                transform: demoInView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.98)",
                transition:
                  "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              {/* Browser chrome */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-3 py-1 bg-white rounded border border-slate-200 text-xs text-slate-400 font-mono w-48 text-center">
                    acme-saas.com
                  </div>
                </div>
              </div>

              {/* Mini landing page demonstrating the Z-pattern */}
              <div className="bg-white">
                {/* Zone 1 + 2: Top Row Header */}
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                  {/* Zone 1: Top Left — Logo */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                        <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
                        <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
                        <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
                        <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">Acme SaaS</span>
                  </div>
                  {/* Zone 2: Top Right — Nav + CTA */}
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500">
                      <span>Features</span>
                      <span>Pricing</span>
                      <span>Blog</span>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors">
                      Start Free Trial
                    </button>
                  </div>
                </div>

                {/* Zone 3: Diagonal — Hero / Value Proposition */}
                <div className="px-8 py-14 text-center bg-gradient-to-br from-white via-slate-50 to-indigo-50/30">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium mb-5">
                    Trusted by 50,000+ teams
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 max-w-lg mx-auto leading-tight">
                    Ship faster with the platform built for modern teams
                  </h3>
                  <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
                    Automate your workflow, collaborate in real-time, and scale without limits. One platform, infinite
                    possibilities.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
                      Get Started Free
                    </button>
                    <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                      Watch Demo
                    </button>
                  </div>
                </div>

                {/* Zone 4 + 5: Bottom Row */}
                <div className="px-8 py-8 border-t border-slate-100 grid sm:grid-cols-2 gap-6">
                  {/* Zone 4: Bottom Left — Trust Badges */}
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Trusted By</div>
                    <div className="flex flex-wrap gap-3">
                      {["Stripe", "Vercel", "Linear", "Notion"].map((company) => (
                        <div
                          key={company}
                          className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium"
                        >
                          {company}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#f59e0b">
                          <path d="M6 1l1.3 3.9H11L8 7.5l1 3.9L6 9.2 3 11.4l1-3.9L1 3.9h3.7z" />
                        </svg>
                      ))}
                      <span className="text-xs text-slate-500 ml-1">4.9/5 from 2,400+ reviews</span>
                    </div>
                  </div>

                  {/* Zone 5: Bottom Right — Final CTA */}
                  <div className="flex flex-col justify-center">
                    <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
                      <div className="text-sm font-bold mb-1">Start your free trial today</div>
                      <div className="text-xs text-indigo-200 mb-3">No credit card required. Cancel anytime.</div>
                      <button className="w-full py-2.5 rounded-lg bg-white text-indigo-700 text-xs font-bold hover:bg-indigo-50 transition-colors">
                        Create Free Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Z-path annotation labels */}
          <RevealBlock className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3" delay={0.2}>
            {zones.map((zone) => (
              <div key={zone.id} className={`p-3 rounded-xl ${zone.bg} border ${zone.border} text-center`}>
                <div className={`text-xs font-bold ${zone.color} mb-0.5`}>Zone {zone.step}</div>
                <div className="text-xs text-slate-500">{zone.label}</div>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Section 4: Component Demos
          ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium mb-4 tracking-wide uppercase">
              Component System
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">UI Components</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Every component is designed to reinforce the Z-pattern flow — guiding users toward the next step with
              clarity and purpose.
            </p>
          </RevealBlock>

          <div ref={componentRef}>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Button Component */}
              <div
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden group hover:shadow-xl hover:shadow-indigo-50 hover:-translate-y-1 transition-all duration-300"
                style={{
                  opacity: componentInView ? 1 : 0,
                  transform: componentInView ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, box-shadow 0.3s, translate 0.3s",
                }}
              >
                <div className="p-8 bg-gradient-to-br from-indigo-50 to-slate-50 flex items-center justify-center min-h-[160px]">
                  <div className="flex flex-col items-center gap-3">
                    <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-300 hover:bg-indigo-700 hover:shadow-indigo-400 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 active:translate-y-[2px] transition-all duration-200 ease-out">
                      Get Started Free
                    </button>
                    <button className="px-6 py-3 rounded-xl border-2 border-indigo-200 text-indigo-700 text-sm font-semibold hover:bg-indigo-50 hover:border-indigo-300 active:scale-95 transition-all duration-200 ease-out">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Button</div>
                  <div className="font-semibold text-slate-900 mb-2">CTA Button Variants</div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Primary buttons use indigo-600 with shadow-indigo depth. Secondary uses outlined style. Placed at
                    Zone 2 and Zone 5 of the Z-path.
                  </p>
                </div>
              </div>

              {/* Card Component */}
              <div
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden group hover:shadow-xl hover:shadow-cyan-50 hover:-translate-y-1 transition-all duration-300"
                style={{
                  opacity: componentInView ? 1 : 0,
                  transform: componentInView ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, box-shadow 0.3s, translate 0.3s",
                }}
              >
                <div className="p-8 bg-gradient-to-br from-cyan-50 to-slate-50 flex items-center justify-center min-h-[160px]">
                  <div className="w-full max-w-[200px] group/card p-4 rounded-xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
                    <div className="w-9 h-9 rounded-lg bg-cyan-100 group-hover/card:bg-indigo-500 group-hover/card:scale-110 flex items-center justify-center mb-3 transition-all duration-300 ease-out">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-cyan-600 group-hover/card:text-white transition-colors duration-300">
                        <path d="M3 9h12M9 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="font-semibold text-slate-900 text-sm mb-1 group-hover/card:text-indigo-600 transition-colors duration-200">Feature Title</div>
                    <div className="text-xs text-slate-500">
                      Supporting description text that reinforces the feature benefit.
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Card</div>
                  <div className="font-semibold text-slate-900 mb-2">Feature Card</div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Clean icon card with subtle shadow. Used in Zone 4 (bottom-left) to present trust signals and
                    feature highlights.
                  </p>
                </div>
              </div>

              {/* Input / Form Component */}
              <div
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden group hover:shadow-xl hover:shadow-amber-50 hover:-translate-y-1 transition-all duration-300"
                style={{
                  opacity: componentInView ? 1 : 0,
                  transform: componentInView ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, box-shadow 0.3s, translate 0.3s",
                }}
              >
                <div className="p-8 bg-gradient-to-br from-amber-50 to-slate-50 flex items-center justify-center min-h-[160px]">
                  <div className="w-full max-w-[220px]">
                    {emailSubmitted ? (
                      <div className="text-center py-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-green-600">
                            <path
                              d="M4 9l4 4 6-7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="text-sm font-semibold text-slate-800">You&apos;re in!</div>
                        <div className="text-xs text-slate-500">Check your inbox.</div>
                      </div>
                    ) : (
                      <form onSubmit={handleEmailSubmit} className="space-y-2">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={emailValue}
                          onChange={(e) => setEmailValue(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                        />
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors shadow-md shadow-amber-200"
                        >
                          Subscribe Free
                        </button>
                      </form>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Input</div>
                  <div className="font-semibold text-slate-900 mb-2">Email Subscribe Form</div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Inline email capture with amber CTA. Positioned at Zone 5 for final conversion — the last
                    touchpoint in the Z-scan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Section 5: Layout Variations — Tabbed
          ══════════════════════════════════════════════════════ */}
      <section id="variations" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-700 text-xs font-medium mb-4 tracking-wide uppercase">
              Use Cases
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Layout Variations</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Three distinct applications of the Z-pattern, each adapted to its context while maintaining the core
              eye-tracking flow.
            </p>
          </RevealBlock>

          <div ref={variationsRef}>
            {/* Tab switcher */}
            <RevealBlock className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
                {(["saas", "product", "portfolio"] as LayoutTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setLayoutTab(tab)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      layoutTab === tab
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {tab === "saas" ? "SaaS Landing" : tab === "product" ? "Product Page" : "Portfolio"}
                  </button>
                ))}
              </div>
            </RevealBlock>

            {/* SaaS Tab */}
            {layoutTab === "saas" && (
              <div
                className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100 overflow-hidden"
                style={{ animation: "fadeSlideIn 0.3s cubic-bezier(0.16,1,0.3,1)" }}
              >
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-slate-400">SaaS Landing Page — Z-Pattern</span>
                  <div />
                </div>
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between px-8 py-4 border-b border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-indigo-600" />
                      <span className="font-bold text-sm text-slate-900">CloudBase</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 hidden sm:block">Pricing</span>
                      <span className="text-xs text-slate-400 hidden sm:block">Docs</span>
                      <div className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold">
                        Sign Up Free
                      </div>
                    </div>
                  </div>
                  {/* Hero */}
                  <div className="px-8 py-12 text-center">
                    <div className="text-xs text-indigo-600 font-semibold mb-3 uppercase tracking-wide">
                      Launching v2.0
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3 max-w-sm mx-auto">
                      The infrastructure platform for high-growth startups
                    </h4>
                    <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                      Deploy globally in seconds. Scale automatically. Pay only for what you use.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <div className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-200">
                        Start Building
                      </div>
                      <div className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm">
                        Read the Docs
                      </div>
                    </div>
                  </div>
                  {/* Bottom row */}
                  <div className="px-8 py-6 border-t border-slate-50 grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 mb-2">Deployed by teams at</div>
                      <div className="flex gap-2 flex-wrap">
                        {["YC W23", "Sequoia", "a16z"].map((b) => (
                          <span key={b} className="px-2 py-1 rounded bg-slate-100 text-xs text-slate-600">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-indigo-600 text-white text-right">
                      <div className="text-xs font-semibold mb-2">No credit card needed</div>
                      <div className="px-3 py-1.5 rounded bg-white/20 text-xs font-bold inline-block">
                        Get 3 months free
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Tab */}
            {layoutTab === "product" && (
              <div
                className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100 overflow-hidden"
                style={{ animation: "fadeSlideIn 0.3s cubic-bezier(0.16,1,0.3,1)" }}
              >
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-slate-400">Product Page — Z-Pattern</span>
                  <div />
                </div>
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between px-8 py-4 border-b border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-400" />
                      <span className="font-bold text-sm text-slate-900">Lumina Watch</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 hidden sm:block">Specs</span>
                      <span className="text-xs text-slate-400 hidden sm:block">Reviews</span>
                      <div className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold">
                        Buy Now — $299
                      </div>
                    </div>
                  </div>
                  {/* Hero */}
                  <div className="px-8 py-12 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 mb-6 flex items-center justify-center shadow-xl">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-amber-400">
                        <rect x="10" y="6" width="20" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
                        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M20 8v2M20 30v2M8 20h2M30 20h2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Lumina Pro 2</h4>
                    <p className="text-sm text-slate-500 mb-6 max-w-sm">
                      Premium smartwatch with 14-day battery life and health monitoring built for professionals.
                    </p>
                    <div className="flex gap-2">
                      <div className="w-4 h-4 rounded-full bg-slate-900 ring-2 ring-slate-300 ring-offset-2" />
                      <div className="w-4 h-4 rounded-full bg-amber-400" />
                      <div className="w-4 h-4 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                  {/* Bottom row */}
                  <div className="px-8 py-6 border-t border-slate-50 grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 mb-2">4.9 stars — 2,847 reviews</div>
                      <div className="flex gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="#f59e0b">
                            <path d="M6 1l1.3 3.9H11L8 7.5l1 3.9L6 9.2 3 11.4l1-3.9L1 3.9h3.7z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500">
                        &ldquo;Life-changing device. Replaced my phone for most tasks.&rdquo;
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="px-4 py-3 rounded-xl bg-amber-500 text-white text-center text-sm font-bold shadow-lg shadow-amber-200">
                        Add to Cart — $299
                      </div>
                      <div className="px-4 py-2 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                        Free shipping · 30-day returns
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {layoutTab === "portfolio" && (
              <div
                className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-100 overflow-hidden"
                style={{ animation: "fadeSlideIn 0.3s cubic-bezier(0.16,1,0.3,1)" }}
              >
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-slate-400">Portfolio Page — Z-Pattern</span>
                  <div />
                </div>
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between px-8 py-4 border-b border-slate-50">
                    <div>
                      <div className="font-bold text-sm text-slate-900">Sarah Chen</div>
                      <div className="text-xs text-slate-400">Product Designer</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 hidden sm:block">Work</span>
                      <span className="text-xs text-slate-400 hidden sm:block">About</span>
                      <div className="px-3 py-1.5 rounded-lg bg-pink-500 text-white text-xs font-semibold">Hire Me</div>
                    </div>
                  </div>
                  {/* Hero */}
                  <div className="px-8 py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-indigo-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Crafting digital products that delight</h4>
                    <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
                      5 years of experience designing for YC-backed startups and Fortune 500 companies.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Figma", "Prototyping", "Design Systems", "User Research"].map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-medium border border-pink-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Bottom row */}
                  <div className="px-8 py-6 border-t border-slate-50 grid sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 mb-2">Previously at</div>
                      <div className="flex gap-2">
                        {["Figma", "Airbnb", "Stripe"].map((c) => (
                          <span key={c} className="px-2 py-1 rounded bg-slate-100 text-xs text-slate-600">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500 to-indigo-600 text-white text-right">
                      <div className="text-xs mb-2 text-pink-100">Available for freelance</div>
                      <div className="px-3 py-1.5 rounded bg-white/20 text-xs font-bold inline-block">Get in Touch</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab variation note */}
            <RevealBlock className="mt-6 text-center" delay={0.1}>
              <p className="text-xs text-slate-400">
                All three layouts follow the same Z-path structure — Zone 1 logo, Zone 2 CTA, Zone 3 hero, Zone 4
                trust, Zone 5 conversion
              </p>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Section 6: Color System
          ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium mb-4 tracking-wide uppercase">
              Color System
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Palette &amp; Usage
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Each color in the Z-pattern system is mapped to a specific zone and purpose, creating a predictable visual
              hierarchy.
            </p>
          </RevealBlock>

          <div ref={colorRef}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Slate 900 */}
              <div
                className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  opacity: colorInView ? 1 : 0,
                  transform: colorInView ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s, box-shadow 0.3s, translate 0.3s",
                }}
              >
                <div className="h-24 bg-slate-900" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">Slate 900</span>
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">#0f172a</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Primary background and text color. Used for all core typography, headers, and the base structure.
                    Provides maximum contrast and authority.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    <span className="text-xs text-slate-400">Zones: All text, backgrounds</span>
                  </div>
                </div>
              </div>

              {/* White */}
              <div
                className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  opacity: colorInView ? 1 : 0,
                  transform: colorInView ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, box-shadow 0.3s, translate 0.3s",
                }}
              >
                <div className="h-24 bg-white border-b border-slate-100" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">White</span>
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">#ffffff</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Secondary — the canvas. Used for card surfaces, content backgrounds, and as contrast against
                    slate-900. Keeps the layout breathable and clean.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 border border-slate-300" />
                    <span className="text-xs text-slate-400">Zones: Content areas, cards</span>
                  </div>
                </div>
              </div>

              {/* Indigo */}
              <div
                className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  opacity: colorInView ? 1 : 0,
                  transform: colorInView ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s, box-shadow 0.3s, translate 0.3s",
                }}
              >
                <div className="h-24 bg-indigo-600" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">Indigo 600</span>
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">#6366f1</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Primary accent — the most visible interactive color. Used for all interactive elements, primary
                    buttons, and focus indicators. Guides the eye to actions.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <span className="text-xs text-slate-400">Zones: 2 (top-right), 5 (final CTA)</span>
                  </div>
                </div>
              </div>

              {/* Cyan */}
              <div
                className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  opacity: colorInView ? 1 : 0,
                  transform: colorInView ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, box-shadow 0.3s, translate 0.3s",
                }}
              >
                <div className="h-24 bg-cyan-500" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">Cyan 500</span>
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">#06b6d4</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Secondary accent — used for highlights, tags, and secondary interactive elements. Adds freshness
                    without competing with the primary indigo CTA.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span className="text-xs text-slate-400">Zones: 3 (hero highlights)</span>
                  </div>
                </div>
              </div>

              {/* Amber */}
              <div
                className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  opacity: colorInView ? 1 : 0,
                  transform: colorInView ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, box-shadow 0.3s, translate 0.3s",
                }}
              >
                <div className="h-24 bg-amber-500" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">Amber 500</span>
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">#f59e0b</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Warmth accent — used for ratings, emphasis, and secondary CTAs on product pages. Creates visual
                    warmth and urgency without alarm.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-xs text-slate-400">Zones: 4 (trust/ratings)</span>
                  </div>
                </div>
              </div>

              {/* Pink */}
              <div
                className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  opacity: colorInView ? 1 : 0,
                  transform: colorInView ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, box-shadow 0.3s, translate 0.3s",
                }}
              >
                <div className="h-24 bg-pink-500" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">Pink 500</span>
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">#ec4899</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Creative accent — used for creative industry layouts, tags, and personality elements. Adds energy and
                    differentiation for portfolio and brand pages.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    <span className="text-xs text-slate-400">Zones: Creative/brand contexts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Section 7: Do / Don't Rules
          ══════════════════════════════════════════════════════ */}
      <section id="rules" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-medium mb-4 tracking-wide uppercase">
              Design Rules
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Do&apos;s and Don&apos;ts
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              The Z-pattern only works when respected. These rules protect the natural flow and ensure every layout
              decision serves the eye-tracking path.
            </p>
          </RevealBlock>

          <div ref={rulesRef}>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Do List */}
              <div
                className="rounded-2xl border border-green-200 bg-white overflow-hidden"
                style={{
                  opacity: rulesInView ? 1 : 0,
                  transform: rulesInView ? "translateX(0)" : "translateX(-24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                <div className="px-6 py-4 bg-green-50 border-b border-green-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                      <path
                        d="M2.5 6l2.5 2.5 4.5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-green-800 text-sm">Do These</span>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    {
                      rule: "Top-left: Logo or brand identifier",
                      detail: "The first fixation point must establish identity immediately.",
                    },
                    {
                      rule: "Top-right: Primary navigation or CTA",
                      detail:
                        "Capitalize on the natural second fixation — the most viewed right-side position.",
                    },
                    {
                      rule: "Center diagonal: Core value proposition",
                      detail:
                        "The hero content must span the diagonal scan path — headline, sub-copy, and key image.",
                    },
                    {
                      rule: "Bottom-left: Trust signals and support",
                      detail: "Testimonials, logos, or feature lists that validate the proposition.",
                    },
                    {
                      rule: "Bottom-right: Final call-to-action",
                      detail:
                        "The conversion moment. Users who reach here are primed — make the ask clear and compelling.",
                    },
                    {
                      rule: "Each row independent and progressive",
                      detail:
                        "Top row sets context, center delivers value, bottom row closes. Each section must work alone.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 mb-0.5">{item.rule}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Don't List */}
              <div
                className="rounded-2xl border border-red-200 bg-white overflow-hidden"
                style={{
                  opacity: rulesInView ? 1 : 0,
                  transform: rulesInView ? "translateX(0)" : "translateX(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                <div className="px-6 py-4 bg-red-50 border-b border-red-100 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="font-semibold text-red-800 text-sm">Avoid These</span>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    {
                      rule: "No unimportant content on the Z-path",
                      detail:
                        "Every element along the scan path competes for attention. Reserve prime zones for high-value content only.",
                    },
                    {
                      rule: "No interruptions to the visual flow",
                      detail:
                        "Decorative elements, banners, or popups that break the diagonal will disrupt the natural scan.",
                    },
                    {
                      rule: "No excessive content in any zone",
                      detail:
                        "Each zone should have one clear focus. Multiple competing elements dilute attention and break the flow.",
                    },
                    {
                      rule: "No CTAs outside the Z-path zones",
                      detail:
                        "A call-to-action buried in the center of the layout, outside zones 2 or 5, will be systematically overlooked.",
                    },
                    {
                      rule: "No cluttered or complex layouts",
                      detail:
                        "The Z-pattern thrives on visual simplicity. Dense, information-heavy layouts prevent the natural scan from forming.",
                    },
                    {
                      rule: "No mismatched zone content",
                      detail:
                        "Putting the final CTA at top-left or the logo at bottom-right undermines user expectations and reduces trust.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 mb-0.5">{item.rule}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Z-Pattern Diagram Grid — Do vs Don't */}
            <RevealBlock className="grid md:grid-cols-2 gap-6" delay={0.15}>
              {/* Good Z-pattern diagram */}
              <div className="rounded-2xl border border-green-200 bg-white p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Correct Z-Pattern Structure</span>
                </div>
                <div className="relative rounded-xl bg-slate-50 border border-slate-100 overflow-hidden p-4">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-indigo-600" />
                      <div className="h-2 w-16 rounded bg-slate-300" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-8 rounded bg-slate-200" />
                      <div className="h-2 w-8 rounded bg-slate-200" />
                      <div className="h-6 w-16 rounded bg-indigo-600" />
                    </div>
                  </div>
                  {/* Z path indicator */}
                  <svg
                    className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M5,15 L95,15 L5,85 L95,85"
                      stroke="#6366f1"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="4 2"
                      strokeOpacity="0.5"
                    />
                  </svg>
                  {/* Hero */}
                  <div className="py-6 text-center mb-4">
                    <div className="h-3 w-48 rounded bg-slate-300 mx-auto mb-2" />
                    <div className="h-2 w-36 rounded bg-slate-200 mx-auto mb-2" />
                    <div className="h-2 w-40 rounded bg-slate-200 mx-auto mb-4" />
                    <div className="flex gap-2 justify-center">
                      <div className="h-8 w-24 rounded-lg bg-indigo-600" />
                      <div className="h-8 w-20 rounded-lg border border-slate-200" />
                    </div>
                  </div>
                  {/* Bottom row */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <div className="h-5 w-12 rounded bg-slate-200" />
                      <div className="h-5 w-12 rounded bg-slate-200" />
                    </div>
                    <div className="h-8 w-24 rounded-lg bg-indigo-700" />
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Clear zones, unobstructed Z-path, one focus per zone
                </p>
              </div>

              {/* Bad Z-pattern diagram */}
              <div className="rounded-2xl border border-red-200 bg-white p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white">
                      <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">Incorrect — Z-Path Broken</span>
                </div>
                <div className="relative rounded-xl bg-slate-50 border border-slate-100 overflow-hidden p-4">
                  {/* Cluttered header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      <div className="h-5 w-5 rounded bg-slate-300" />
                      <div className="h-2 w-6 rounded bg-slate-200" />
                      <div className="h-2 w-6 rounded bg-slate-200" />
                      <div className="h-2 w-6 rounded bg-slate-200" />
                      <div className="h-2 w-6 rounded bg-slate-200" />
                      <div className="h-2 w-6 rounded bg-slate-200" />
                    </div>
                    <div className="h-5 w-5 rounded bg-slate-300" />
                  </div>
                  {/* Interrupting banner */}
                  <div className="h-7 rounded bg-amber-300 mb-3 flex items-center justify-center">
                    <div className="h-2 w-24 rounded bg-amber-500" />
                  </div>
                  {/* Cluttered hero */}
                  <div className="grid grid-cols-3 gap-1 mb-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-10 rounded bg-slate-200" />
                    ))}
                  </div>
                  {/* CTA in wrong place */}
                  <div className="flex">
                    <div className="h-8 w-20 rounded-lg bg-red-400 mr-auto" />
                    <div className="h-6 w-16 rounded bg-slate-200 ml-2" />
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Interrupting banner breaks Z-path; CTA in wrong zone; content clutter
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Section 8: Context Guide — When to Use
          ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-medium mb-4 tracking-wide uppercase">
              Context Guide
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              When to Use Z-Pattern
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              The Z-pattern is not universal. It shines in specific contexts where users scan rather than read deeply.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Best for */}
            <RevealBlock delay={0.05}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 h-full">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-indigo-600">
                    <path
                      d="M10 2l2.4 5h5.2l-4.2 3 1.6 5.2L10 12.3 5 15.2l1.6-5.2L2.4 7h5.2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-5">Best For</h3>
                <div className="space-y-3">
                  {[
                    ["Landing Pages", "Marketing pages where the goal is a single conversion action"],
                    ["SaaS Home Pages", "Product pages with one primary sign-up or trial CTA"],
                    ["Product Pages", "E-commerce listings where buy is the singular goal"],
                    ["Portfolio Pages", "Personal sites with a hire/contact as the conversion"],
                    ["Campaign Pages", "Focused promotional pages with time-limited offers"],
                    ["Event Registrations", "Conference or webinar signup pages"],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-semibold text-slate-900">{title}</span>
                        <span className="text-sm text-slate-500"> — {desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Not ideal for */}
            <RevealBlock delay={0.1}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 h-full">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center mb-5">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-red-500">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 6v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="10" cy="14" r="0.75" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-5">Not Ideal For</h3>
                <div className="space-y-3">
                  {[
                    ["Long-Form Articles", "Deep reading requires F-pattern — horizontal scans of paragraphs"],
                    [
                      "Complex Dashboards",
                      "Multi-widget interfaces with equal-priority data need different hierarchies",
                    ],
                    ["Documentation Sites", "Users search for specific info — Z-path doesn't match the behavior"],
                    ["News Portals", "Multiple stories of equal importance don't fit single-path design"],
                    ["E-commerce Catalogs", "Grid browsing requires visual scanning in all directions"],
                    [
                      "Data-Dense Reports",
                      "Analytics and reports require attention distributed across the page",
                    ],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-semibold text-slate-900">{title}</span>
                        <span className="text-sm text-slate-500"> — {desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Eye tracking research note */}
          <RevealBlock className="rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8" delay={0.15}>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-amber-700">
                  <path d="M10 4C6 4 3 7 3 10s3 6 7 6 7-3 7-6-3-6-7-6z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-amber-900 mb-2">Research Foundation</div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  The Z-pattern is derived from eye-tracking studies by Nielsen Norman Group and other UX researchers.
                  Studies show that when users encounter simple, structured pages with limited reading content, their
                  eyes follow a predictable Z-shaped scan path. This is distinct from the F-pattern, which emerges on
                  text-heavy pages where users read the first lines fully, then progressively scan less of each
                  subsequent line.
                </p>
                <p className="text-sm text-amber-700 mt-2 leading-relaxed">
                  Applying the Z-pattern places your highest-priority content exactly where eyes naturally land —
                  transforming passive page structure into an active conversion tool.
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Footer
          ══════════════════════════════════════════════════════ */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Footer itself demonstrates the Z-pattern */}
          <div className="mb-10 pb-10 border-b border-slate-700">
            {/* Top row: Brand (left) + Footer CTA (right) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
              {/* Zone 1: Brand */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                    <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
                    <path d="M7 7 L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.5" />
                    <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Z-Pattern Layout</div>
                  <div className="text-xs text-slate-400">StyleKit Design System</div>
                </div>
              </div>
              {/* Zone 2: CTA */}
              <a
                href="/styles"
                className="group px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium transition-all duration-200 flex items-center gap-2"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform inline-block">&larr;</span>
                <span>Browse All Styles</span>
              </a>
            </div>

            {/* Center: Description */}
            <div className="text-center max-w-lg mx-auto mb-8">
              <p className="text-slate-400 text-sm leading-relaxed">
                The Z-Pattern Layout is part of the StyleKit design collection — a curated library of layout patterns,
                visual systems, and UI philosophies for modern product design.
              </p>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              {/* Zone 4: Links */}
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {["Layout Patterns", "Visual Styles", "Components", "Tokens", "Changelog"].map((link) => (
                  <a
                    key={link}
                    href="/styles"
                    className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
              {/* Zone 5: Final note */}
              <div className="text-right">
                <div className="text-xs text-slate-500">Part of StyleKit</div>
                <div className="text-xs text-slate-400 mt-0.5">Eye-tracking based design</div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>Z-Pattern Layout — StyleKit Design System</span>
            <div className="flex items-center gap-1.5">
              <span>Based on Nielsen Norman Group eye-tracking research</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
