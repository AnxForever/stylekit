"use client"
import { useState, useRef, useEffect } from "react"

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

const palette = [
  {
    name: "slate blue",
    hex: "#3d4a5c",
    bg: "bg-[#3d4a5c]",
    description: "clarity",
    border: false,
  },
  {
    name: "warm white",
    hex: "#faf9f7",
    bg: "bg-[#faf9f7]",
    description: "space",
    border: true,
  },
  {
    name: "blush pink",
    hex: "#d4a5a5",
    bg: "bg-[#d4a5a5]",
    description: "softness",
    border: false,
  },
  {
    name: "sage green",
    hex: "#a8c5b8",
    bg: "bg-[#a8c5b8]",
    description: "calm",
    border: false,
  },
  {
    name: "sand",
    hex: "#e8d4b8",
    bg: "bg-[#e8d4b8]",
    description: "warmth",
    border: false,
  },
]

const kBeautyPrinciples = [
  {
    korean: "피부",
    english: "Skin",
    ui: "Surface Texture",
    description:
      "Clean, unblemished backgrounds that let content breathe naturally. Like skin care, the foundation matters most.",
  },
  {
    korean: "여백",
    english: "Whitespace",
    ui: "Breathing Room",
    description:
      "Space is not empty — it is the silence between notes. Generous margins allow meaning to settle and rest.",
  },
  {
    korean: "절제",
    english: "Restraint",
    ui: "Minimal Decoration",
    description:
      "Every ornament removed is a decision made with intention. Less reveals more when paired with confidence.",
  },
  {
    korean: "온도",
    english: "Warmth",
    ui: "Pastel Temperature",
    description:
      "Warm pastels carry emotional temperature. A cool white becomes inviting when softened with sand and blush.",
  },
]

const portfolioItems = [
  {
    title: "morning ritual",
    category: "brand identity",
    bandColor: "bg-[#d4a5a5]/30",
  },
  {
    title: "still life no. 3",
    category: "editorial",
    bandColor: "bg-[#a8c5b8]/30",
  },
  {
    title: "soft archive",
    category: "photography",
    bandColor: "bg-[#e8d4b8]/40",
  },
  {
    title: "linen and light",
    category: "product design",
    bandColor: "bg-[#d4a5a5]/20",
  },
  {
    title: "quiet sunday",
    category: "art direction",
    bandColor: "bg-[#a8c5b8]/20",
  },
  {
    title: "porcelain study",
    category: "illustration",
    bandColor: "bg-[#e8d4b8]/30",
  },
]

const typographyScale = [
  {
    label: "main heading",
    className: "text-4xl font-light text-[#3d4a5c]",
    sample: "gentle presence",
    note: "text-4xl / font-light / tracking-wide",
  },
  {
    label: "sub heading",
    className: "text-2xl font-light text-[#3d4a5c]/80",
    sample: "whispered intention",
    note: "text-2xl / font-light / opacity 80",
  },
  {
    label: "body text",
    className: "text-base font-light text-[#3d4a5c]/60 leading-relaxed",
    sample:
      "Each word carries weight only when surrounded by silence. The art of restraint is knowing when to stop adding.",
    note: "text-base / font-light / leading-relaxed / opacity 60",
  },
  {
    label: "caption",
    className: "text-sm font-light text-[#d4a5a5]",
    sample: "soft detail, held lightly",
    note: "text-sm / font-light / blush color",
  },
  {
    label: "label",
    className: "text-xs tracking-wide text-[#3d4a5c]/40",
    sample: "category · 2026",
    note: "text-xs / tracking-wide / opacity 40",
  },
]

const doDontPairs = [
  {
    doTitle: "use rounded-2xl corners",
    doDescription:
      "Soft corners invite touch. They feel approachable and human, matching the warmth of K-beauty aesthetics.",
    dontTitle: "use sharp square corners",
    dontDescription:
      "Hard corners create tension and coldness, which contradicts the warm, welcoming K-minimal sensibility.",
  },
  {
    doTitle: "use lazy 700ms+ transitions",
    doDescription:
      "Slow transitions feel like deep breaths — unhurried, confident, and serene. They signal quality.",
    dontTitle: "use snappy 150ms transitions",
    dontDescription:
      "Fast animations feel anxious and aggressive. They break the contemplative mood that defines the style.",
  },
  {
    doTitle: "use warm pastel tones",
    doDescription:
      "Sand, blush, and sage carry emotional warmth. They feel like natural light, morning windows, and calm.",
    dontTitle: "use cold saturated colors",
    dontDescription:
      "Bright blues or neons break the delicate palette balance and introduce visual tension.",
  },
  {
    doTitle: "use micro hover lifts",
    doDescription:
      "A gentle -translate-y-0.5 lift feels like a soft breath — present but never dramatic.",
    dontTitle: "use dramatic scale or bounce effects",
    dontDescription:
      "Large scale transforms or spring animations conflict with the composed, still quality of Korean minimal.",
  },
]

const motionTiming = [
  { label: "hover state", value: "700ms" },
  { label: "page reveal", value: "900ms" },
  { label: "tab switch", value: "700ms" },
  { label: "card lift", value: "1000ms" },
]

const motionEasing = [
  { label: "reveal", value: "cubic-bezier(0.16,1,0.3,1)" },
  { label: "hover", value: "ease" },
  { label: "color", value: "linear" },
  { label: "shadow", value: "ease" },
]

const motionTransforms = [
  { label: "hover lift", value: "-translateY(2px)" },
  { label: "reveal from", value: "translateY(32px)" },
  { label: "scale", value: "none" },
  { label: "rotation", value: "none" },
]

type TabKey = "buttons" | "cards" | "inputs"

export default function KoreanMinimalShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("buttons")
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")

  const { ref: heroRef, inView: heroInView } = useInView()

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf9f7" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 border-b border-[#3d4a5c]/8"
        style={{ backgroundColor: "#faf9f7" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-light tracking-wide text-[#3d4a5c] text-sm">
            korean minimal
          </span>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#components"
              className="text-sm text-[#3d4a5c]/60 hover:text-[#3d4a5c] transition-colors duration-700 font-light"
            >
              components
            </a>
            <a
              href="#palette"
              className="text-sm text-[#3d4a5c]/60 hover:text-[#3d4a5c] transition-colors duration-700 font-light"
            >
              palette
            </a>
            <a
              href="#principles"
              className="text-sm text-[#3d4a5c]/60 hover:text-[#3d4a5c] transition-colors duration-700 font-light"
            >
              principles
            </a>
            <a
              href="#gallery"
              className="text-sm text-[#3d4a5c]/60 hover:text-[#3d4a5c] transition-colors duration-700 font-light"
            >
              gallery
            </a>
            <a
              href="#"
              className="text-sm text-[#d4a5a5] hover:text-[#d4a5a5]/70 transition-colors duration-700 font-light"
            >
              StyleKit →
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-40 overflow-hidden">
        {/* Pastel accent spots */}
        <div
          className="absolute top-16 left-16 w-32 h-32 rounded-full opacity-20 blur-2xl"
          style={{ backgroundColor: "#d4a5a5" }}
        />
        <div
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: "#a8c5b8" }}
        />
        <div
          className="absolute top-32 right-40 w-20 h-20 rounded-full opacity-15 blur-xl"
          style={{ backgroundColor: "#e8d4b8" }}
        />
        <div
          className="absolute bottom-32 left-32 w-24 h-24 rounded-full opacity-10 blur-2xl"
          style={{ backgroundColor: "#d4a5a5" }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div
            ref={heroRef}
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(32px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            {/* Blush dot */}
            <div className="w-2 h-2 rounded-full bg-[#d4a5a5]/40 mx-auto mb-12" />

            {/* Thin divider */}
            <div className="h-px w-10 bg-[#3d4a5c]/15 mx-auto mb-10" />

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-light text-[#3d4a5c] tracking-wide leading-tight mb-8">
              beauty in
              <br />
              <span className="text-[#3d4a5c]/50">restraint</span>
            </h1>

            {/* Description */}
            <p className="text-[#3d4a5c]/45 font-light text-lg leading-relaxed max-w-xl mx-auto mb-14">
              K-beauty minimalism translated into interface design. Pastel
              warmth, whispered contrasts, and the quiet confidence of
              intentional space.
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button className="px-8 py-3 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-sm hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(168,197,184,0.18)] transition-all duration-700">
                explore components
              </button>
              <button className="px-8 py-3 border border-[#3d4a5c]/15 text-[#3d4a5c] rounded-2xl font-light text-sm hover:border-[#d4a5a5]/50 transition-all duration-700">
                view palette
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Components Demo */}
      <section id="components" className="py-28 max-w-6xl mx-auto px-6">
        <RevealBlock className="mb-16 text-center">
          <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-4">
            component system
          </p>
          <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
            gentle elements
          </h2>
          <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-md mx-auto">
            Every component carries the same softness. Rounded corners, lazy
            transitions, and whispered color contrasts.
          </p>
        </RevealBlock>

        {/* Tab switcher */}
        <RevealBlock delay={0.1} className="mb-12">
          <div className="flex items-center justify-center gap-1 p-1 rounded-2xl border border-[#3d4a5c]/8 w-fit mx-auto">
            {(["buttons", "cards", "inputs"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2 rounded-xl text-sm font-light transition-all duration-700"
                style={{
                  backgroundColor:
                    activeTab === tab ? "#3d4a5c" : "transparent",
                  color:
                    activeTab === tab
                      ? "#faf9f7"
                      : "rgba(61, 74, 92, 0.50)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Tab content */}
        <RevealBlock delay={0.15}>
          {/* Buttons Panel */}
          {activeTab === "buttons" && (
            <div
              className="rounded-2xl border border-[#3d4a5c]/8 p-10"
              style={{ backgroundColor: "#faf9f7" }}
            >
              <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-8 text-center">
                button variants
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <button className="px-7 py-3 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-sm hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(61,74,92,0.18)] transition-all duration-700">
                  primary
                </button>
                <button className="px-7 py-3 border border-[#3d4a5c]/15 text-[#3d4a5c] rounded-2xl font-light text-sm hover:border-[#d4a5a5]/50 hover:-translate-y-0.5 transition-all duration-700">
                  outline
                </button>
                <button className="px-7 py-3 bg-[#d4a5a5]/15 text-[#3d4a5c] rounded-2xl font-light text-sm hover:bg-[#d4a5a5]/25 hover:-translate-y-0.5 transition-all duration-700">
                  blush
                </button>
                <button className="px-7 py-3 bg-[#a8c5b8]/20 text-[#3d4a5c] rounded-2xl font-light text-sm hover:bg-[#a8c5b8]/30 hover:-translate-y-0.5 transition-all duration-700">
                  sage
                </button>
                <button className="px-7 py-3 text-[#3d4a5c]/50 rounded-2xl font-light text-sm hover:text-[#3d4a5c] hover:bg-[#e8d4b8]/20 transition-all duration-700">
                  ghost
                </button>
              </div>

              <div className="h-px w-full bg-[#3d4a5c]/6 my-8" />

              <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-6 text-center">
                sizes
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <button className="px-5 py-2 bg-[#3d4a5c] text-[#faf9f7] rounded-xl font-light text-xs hover:-translate-y-0.5 transition-all duration-700">
                  small
                </button>
                <button className="px-7 py-3 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-sm hover:-translate-y-0.5 transition-all duration-700">
                  medium
                </button>
                <button className="px-9 py-4 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-base hover:-translate-y-0.5 transition-all duration-700">
                  large
                </button>
              </div>

              <div className="h-px w-full bg-[#3d4a5c]/6 my-8" />

              <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-6 text-center">
                states
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="px-7 py-3 bg-[#3d4a5c] text-[#faf9f7] rounded-2xl font-light text-sm opacity-40 cursor-not-allowed">
                  disabled
                </button>
                <button className="px-7 py-3 bg-[#d4a5a5] text-[#faf9f7] rounded-2xl font-light text-sm">
                  active
                </button>
                <button className="px-7 py-3 border border-[#d4a5a5]/50 text-[#3d4a5c] rounded-2xl font-light text-sm -translate-y-0.5 shadow-[0_8px_20px_rgba(212,165,165,0.15)]">
                  hovered
                </button>
              </div>
            </div>
          )}

          {/* Cards Panel */}
          {activeTab === "cards" && (
            <div
              className="rounded-2xl border border-[#3d4a5c]/8 p-10"
              style={{ backgroundColor: "#faf9f7" }}
            >
              <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-8 text-center">
                card variants
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic card */}
                <div className="rounded-2xl border border-[#3d4a5c]/8 shadow-[0_8px_24px_rgba(232,212,184,0.14)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(232,212,184,0.20)] transition-all duration-700 group">
                  <div className="h-1 bg-[#d4a5a5]/40" />
                  <div className="p-6">
                    <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-3">
                      minimal
                    </p>
                    <h3 className="text-lg font-light text-[#3d4a5c] mb-2 group-hover:text-[#3d4a5c]/80 transition-colors duration-700">
                      still morning
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                      A card that holds content gently, without unnecessary
                      emphasis.
                    </p>
                  </div>
                </div>

                {/* Sage accent card */}
                <div className="rounded-2xl border border-[#3d4a5c]/8 shadow-[0_8px_24px_rgba(168,197,184,0.12)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(168,197,184,0.18)] transition-all duration-700 group">
                  <div className="h-1 bg-[#a8c5b8]/50" />
                  <div className="p-6">
                    <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-3">
                      sage accent
                    </p>
                    <h3 className="text-lg font-light text-[#3d4a5c] mb-2 group-hover:text-[#3d4a5c]/80 transition-colors duration-700">
                      quiet garden
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                      Sage warmth on the accent line brings natural calm to the
                      structure.
                    </p>
                  </div>
                </div>

                {/* Sand tint card */}
                <div
                  className="rounded-2xl border border-[#3d4a5c]/8 shadow-[0_8px_24px_rgba(232,212,184,0.14)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(232,212,184,0.22)] transition-all duration-700 group"
                  style={{ backgroundColor: "#fdf9f4" }}
                >
                  <div className="h-1 bg-[#e8d4b8]/60" />
                  <div className="p-6">
                    <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-3">
                      sand tint
                    </p>
                    <h3 className="text-lg font-light text-[#3d4a5c] mb-2 group-hover:text-[#3d4a5c]/80 transition-colors duration-700">
                      warm linen
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                      A faint sand background adds texture without interrupting
                      the calm.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inputs Panel */}
          {activeTab === "inputs" && (
            <div
              className="rounded-2xl border border-[#3d4a5c]/8 p-10"
              style={{ backgroundColor: "#faf9f7" }}
            >
              <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-8 text-center">
                input variants
              </p>
              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="text-xs tracking-wide text-[#3d4a5c]/40 block mb-2">
                    text field
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="a gentle thought..."
                    className="w-full px-4 py-3 rounded-2xl border border-[#3d4a5c]/10 bg-white font-light text-sm text-[#3d4a5c] placeholder:text-[#3d4a5c]/30 focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-700"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-wide text-[#3d4a5c]/40 block mb-2">
                    search
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3d4a5c]/30 text-sm">
                      ○
                    </span>
                    <input
                      type="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="search softly..."
                      className="w-full pl-9 pr-4 py-3 rounded-2xl border border-[#3d4a5c]/10 bg-white font-light text-sm text-[#3d4a5c] placeholder:text-[#3d4a5c]/30 focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-wide text-[#3d4a5c]/40 block mb-2">
                    message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="write something honest..."
                    className="w-full px-4 py-3 rounded-2xl border border-[#3d4a5c]/10 bg-white font-light text-sm text-[#3d4a5c] placeholder:text-[#3d4a5c]/30 focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-700 resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs tracking-wide text-[#3d4a5c]/40 block mb-2">
                    select
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl border border-[#3d4a5c]/10 bg-white font-light text-sm text-[#3d4a5c]/60 focus:outline-none focus:border-[#d4a5a5]/50 focus:shadow-[0_0_0_3px_rgba(212,165,165,0.1)] transition-all duration-700 appearance-none">
                    <option>choose a feeling...</option>
                    <option>warmth</option>
                    <option>calm</option>
                    <option>stillness</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </RevealBlock>
      </section>

      {/* Pastel Palette */}
      <section
        id="palette"
        className="py-28"
        style={{ backgroundColor: "#f7f4f0" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-16 text-center">
            <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-4">
              color system
            </p>
            <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
              pastel warmth
            </h2>
            <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-sm mx-auto">
              Five tones that speak in whispers. No cold edges, only the warmth
              of natural light.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {palette.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`w-full aspect-square rounded-2xl ${color.bg} ${color.border ? "border border-[#3d4a5c]/10" : ""} hover:-translate-y-0.5 transition-all duration-700`}
                  />
                  <div className="text-center">
                    <p className="text-sm font-light text-[#3d4a5c] mb-1">
                      {color.name}
                    </p>
                    <p className="text-xs text-[#3d4a5c]/40 font-light mb-1">
                      {color.hex}
                    </p>
                    <p className="text-xs text-[#d4a5a5] font-light">
                      {color.description}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient preview */}
          <RevealBlock delay={0.4} className="mt-16">
            <div className="rounded-2xl overflow-hidden h-16 shadow-[0_8px_24px_rgba(232,212,184,0.14)]">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(to right, #3d4a5c, #d4a5a5, #a8c5b8, #e8d4b8, #faf9f7)",
                }}
              />
            </div>
            <p className="text-center text-xs text-[#3d4a5c]/30 font-light mt-3">
              the full gradient — from depth to light
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* K-Beauty Principles */}
      <section id="principles" className="py-28 max-w-6xl mx-auto px-6">
        <RevealBlock className="mb-16 text-center">
          <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-4">
            design philosophy
          </p>
          <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
            k-beauty principles
          </h2>
          <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-md mx-auto">
            Ancient Korean aesthetics translated into the language of interface
            design. Each principle a lesson in intentionality.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kBeautyPrinciples.map((principle, i) => (
            <RevealBlock key={principle.korean} delay={i * 0.1}>
              <div className="rounded-2xl border border-[#3d4a5c]/8 p-8 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(232,212,184,0.16)] transition-all duration-700 group">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-[#d4a5a5]/10 flex items-center justify-center group-hover:bg-[#d4a5a5]/15 transition-all duration-700">
                      <span className="text-xl font-light text-[#3d4a5c]">
                        {principle.korean}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs tracking-wide text-[#d4a5a5] mb-1">
                      {principle.english} · {principle.ui}
                    </p>
                    <h3 className="text-lg font-light text-[#3d4a5c] mb-3">
                      {principle.ui}
                    </h3>
                    <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* Typography System */}
      <section className="py-28" style={{ backgroundColor: "#f7f4f0" }}>
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-16 text-center">
            <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-4">
              type system
            </p>
            <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
              typography
            </h2>
            <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-sm mx-auto">
              Font-light throughout. Every size a different tone, never a shout,
              always a whisper.
            </p>
          </RevealBlock>

          <div
            className="rounded-2xl border border-[#3d4a5c]/8 overflow-hidden shadow-[0_8px_24px_rgba(232,212,184,0.10)]"
            style={{ backgroundColor: "#faf9f7" }}
          >
            {typographyScale.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.07}>
                <div
                  className={`px-10 py-8 flex flex-col md:flex-row md:items-center gap-4 ${i < typographyScale.length - 1 ? "border-b border-[#3d4a5c]/6" : ""}`}
                >
                  <div className="md:w-32 shrink-0">
                    <span className="text-xs tracking-wide text-[#3d4a5c]/35">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className={item.className}>{item.sample}</div>
                  </div>
                  <div className="md:w-64 shrink-0">
                    <span className="text-xs text-[#3d4a5c]/30 font-light">
                      {item.note}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.4} className="mt-10">
            <div className="rounded-2xl border border-[#a8c5b8]/20 p-6 text-center" style={{ backgroundColor: "rgba(168,197,184,0.05)" }}>
              <p className="text-sm font-light text-[#3d4a5c]/60 leading-relaxed">
                <span className="text-[#3d4a5c]/40 text-xs tracking-wide block mb-2">
                  guiding principle
                </span>
                All text uses{" "}
                <span className="text-[#3d4a5c]/80">font-light</span> as the
                default weight. When emphasis is needed, reduce opacity — never
                increase weight. Let silence speak.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Do / Don't Comparison */}
      <section className="py-28 max-w-6xl mx-auto px-6">
        <RevealBlock className="mb-16 text-center">
          <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-4">
            design guidance
          </p>
          <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
            do and do not
          </h2>
          <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-sm mx-auto">
            Knowing what to leave out is as important as knowing what to
            include.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 gap-8">
          {doDontPairs.map((pair, i) => (
            <RevealBlock key={i} delay={i * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Do */}
                <div
                  className="rounded-2xl border border-[#a8c5b8]/20 p-7"
                  style={{ backgroundColor: "rgba(168,197,184,0.05)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-5 rounded-full bg-[#a8c5b8]/40 flex items-center justify-center">
                      <span className="text-[#3d4a5c]/60 text-xs">+</span>
                    </div>
                    <span className="text-xs tracking-wide text-[#a8c5b8]">
                      do
                    </span>
                  </div>
                  <h3 className="text-base font-light text-[#3d4a5c] mb-3">
                    {pair.doTitle}
                  </h3>
                  <p className="text-sm font-light text-[#3d4a5c]/50 leading-relaxed">
                    {pair.doDescription}
                  </p>
                </div>

                {/* Don't */}
                <div className="rounded-2xl border border-[#3d4a5c]/8 p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-5 rounded-full bg-[#3d4a5c]/8 flex items-center justify-center">
                      <span className="text-[#3d4a5c]/40 text-xs">−</span>
                    </div>
                    <span className="text-xs tracking-wide text-[#3d4a5c]/35">
                      do not
                    </span>
                  </div>
                  <h3 className="text-base font-light text-[#3d4a5c]/50 mb-3 line-through decoration-[#d4a5a5]/40">
                    {pair.dontTitle}
                  </h3>
                  <p className="text-sm font-light text-[#3d4a5c]/35 leading-relaxed">
                    {pair.dontDescription}
                  </p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section
        id="gallery"
        className="py-28"
        style={{ backgroundColor: "#f7f4f0" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-16 text-center">
            <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-4">
              portfolio
            </p>
            <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
              collected works
            </h2>
            <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-sm mx-auto">
              A gallery of softness. Each piece an exercise in restraint and
              warmth.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <RevealBlock key={item.title} delay={i * 0.08}>
                <div
                  className="rounded-2xl border border-[#3d4a5c]/8 overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(212,165,165,0.16)] transition-all duration-1000 group"
                  style={{ backgroundColor: "#faf9f7" }}
                >
                  <div className={`h-32 ${item.bandColor} transition-all duration-1000`} />
                  <div className="p-6">
                    <p className="text-xs text-[#d4a5a5] font-light mb-2 tracking-wide">
                      {item.category}
                    </p>
                    <h3 className="text-base font-light text-[#3d4a5c] group-hover:text-[#3d4a5c]/70 transition-colors duration-700">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.5} className="mt-14 text-center">
            <button className="px-8 py-3 border border-[#3d4a5c]/12 text-[#3d4a5c]/60 rounded-2xl font-light text-sm hover:border-[#d4a5a5]/40 hover:text-[#3d4a5c] hover:-translate-y-0.5 transition-all duration-700">
              view all works
            </button>
          </RevealBlock>
        </div>
      </section>

      {/* Motion Specs */}
      <section className="py-28 max-w-6xl mx-auto px-6">
        <RevealBlock className="mb-16 text-center">
          <p className="text-xs tracking-wide text-[#3d4a5c]/40 mb-4">
            motion system
          </p>
          <h2 className="text-3xl font-light text-[#3d4a5c] tracking-wide mb-4">
            lazy breathing
          </h2>
          <p className="text-[#3d4a5c]/45 font-light leading-relaxed max-w-md mx-auto">
            Transitions that exhale. The interface moves like a slow breath —
            never rushed, never startled.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RevealBlock delay={0.0}>
            <div className="rounded-2xl border border-[#3d4a5c]/8 p-8">
              <p className="text-xs tracking-wide text-[#d4a5a5] mb-4">
                timing
              </p>
              <div className="space-y-4">
                {motionTiming.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-light text-[#3d4a5c]/50">
                      {spec.label}
                    </span>
                    <span className="text-sm font-light text-[#3d4a5c]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="rounded-2xl border border-[#3d4a5c]/8 p-8">
              <p className="text-xs tracking-wide text-[#d4a5a5] mb-4">
                easing
              </p>
              <div className="space-y-4">
                {motionEasing.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1">
                    <span className="text-xs text-[#3d4a5c]/40">
                      {spec.label}
                    </span>
                    <span className="text-xs font-light text-[#3d4a5c]/70 truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="rounded-2xl border border-[#3d4a5c]/8 p-8">
              <p className="text-xs tracking-wide text-[#d4a5a5] mb-4">
                transforms
              </p>
              <div className="space-y-4">
                {motionTransforms.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-light text-[#3d4a5c]/50">
                      {spec.label}
                    </span>
                    <span className="text-sm font-light text-[#3d4a5c]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>

        <RevealBlock delay={0.3} className="mt-10">
          <div
            className="rounded-2xl border border-[#3d4a5c]/8 p-10"
            style={{ backgroundColor: "#faf9f7" }}
          >
            <p className="text-xs tracking-wide text-[#3d4a5c]/35 text-center mb-8">
              hover to experience the timing
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 rounded-2xl border border-[#3d4a5c]/10 text-sm font-light text-[#3d4a5c]/60 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(232,212,184,0.20)] hover:border-[#d4a5a5]/30 transition-all duration-700 cursor-default">
                700ms ease
              </div>
              <div className="px-6 py-3 rounded-2xl border border-[#3d4a5c]/10 text-sm font-light text-[#3d4a5c]/60 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(168,197,184,0.18)] hover:border-[#a8c5b8]/30 transition-all duration-1000 cursor-default">
                1000ms ease
              </div>
              <div className="px-6 py-3 rounded-2xl bg-[#3d4a5c] text-[#faf9f7] text-sm font-light hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(61,74,92,0.20)] transition-all duration-700 cursor-default">
                primary lift
              </div>
              <div className="px-6 py-3 rounded-2xl bg-[#d4a5a5]/15 text-[#3d4a5c] text-sm font-light hover:-translate-y-0.5 hover:bg-[#d4a5a5]/25 transition-all duration-700 cursor-default">
                blush hover
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* Footer */}
      <footer
        className="border-t border-[#3d4a5c]/8 py-16"
        style={{ backgroundColor: "#faf9f7" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#a8c5b8]/40" />
              <div className="w-1 h-1 rounded-full bg-[#d4a5a5]/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#a8c5b8]/40" />
            </div>

            <p className="font-light tracking-wide text-[#3d4a5c]/60 text-sm">
              korean minimal
            </p>

            <div className="flex items-center gap-8">
              <a
                href="#"
                className="text-xs font-light text-[#d4a5a5] hover:text-[#d4a5a5]/70 transition-colors duration-700"
              >
                StyleKit
              </a>
              <a
                href="#"
                className="text-xs font-light text-[#3d4a5c]/40 hover:text-[#3d4a5c]/70 transition-colors duration-700"
              >
                components
              </a>
              <a
                href="#"
                className="text-xs font-light text-[#3d4a5c]/40 hover:text-[#3d4a5c]/70 transition-colors duration-700"
              >
                palette
              </a>
              <a
                href="#"
                className="text-xs font-light text-[#3d4a5c]/40 hover:text-[#3d4a5c]/70 transition-colors duration-700"
              >
                principles
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#a8c5b8]/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4a5a5]/30" />
              <div className="w-1 h-1 rounded-full bg-[#a8c5b8]/30" />
            </div>

            <p className="text-xs font-light text-[#3d4a5c]/25">
              beauty in restraint · 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
