"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

// ─── Intersection Observer Hook ──────────────────────────────────────────────

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

// ─── Reveal Block ─────────────────────────────────────────────────────────────

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

// ─── Pine Branch SVG Decoration ──────────────────────────────────────────────

function PineBranchDecoration() {
  return (
    <svg
      width="120"
      height="48"
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto opacity-30"
    >
      <line x1="60" y1="48" x2="60" y2="0" stroke="#5a7a6b" strokeWidth="1.2" />
      <line x1="60" y1="36" x2="30" y2="18" stroke="#5a7a6b" strokeWidth="1" />
      <line x1="60" y1="36" x2="90" y2="18" stroke="#5a7a6b" strokeWidth="1" />
      <line x1="60" y1="24" x2="40" y2="10" stroke="#5a7a6b" strokeWidth="0.8" />
      <line x1="60" y1="24" x2="80" y2="10" stroke="#5a7a6b" strokeWidth="0.8" />
      <line x1="60" y1="14" x2="48" y2="4" stroke="#5a7a6b" strokeWidth="0.6" />
      <line x1="60" y1="14" x2="72" y2="4" stroke="#5a7a6b" strokeWidth="0.6" />
    </svg>
  )
}

// ─── Main Showcase ────────────────────────────────────────────────────────────

export default function ScandinavianShowcase() {
  const [componentTab, setComponentTab] = useState<"buttons" | "cards" | "inputs">("buttons")
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)

  // ─── Hero inView ───────────────────────────────────────────────────────────
  const { ref: heroRef, inView: heroInView } = useInView()

  return (
    <div className="min-h-screen bg-[#f5f0eb] text-[#3d3d3d]">

      {/* ─── 1. Navigation ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-[#f5f0eb] border-b border-[#d4cdc5]/40 px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <span className="font-light tracking-wide text-[#3d3d3d] text-lg lowercase">
            scandinavian
          </span>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {["explore", "palette", "materials", "principles"].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="text-sm text-[#a89279] hover:text-[#3d3d3d] transition-colors duration-700 lowercase font-light tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/styles"
            className="text-sm text-[#5a7a6b] font-light tracking-wide hover:text-[#3d3d3d] transition-colors duration-700"
          >
            StyleKit &rarr;
          </Link>
        </div>
      </nav>

      {/* ─── 2. Hero ───────────────────────────────────────────────────────── */}
      <section id="explore" className="py-40 px-8 bg-[#f5f0eb]">
        <div
          ref={heroRef}
          className="max-w-3xl mx-auto text-center"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
          }}
        >
          {/* Overline */}
          <p className="text-[#a89279] text-xs tracking-[0.4em] uppercase font-light mb-10">
            the art of living simply
          </p>

          {/* Main title */}
          <h1 className="font-extralight text-8xl md:text-9xl text-[#3d3d3d] tracking-wide leading-none mb-4">
            hygge
          </h1>
          <h2 className="font-extralight text-4xl md:text-5xl text-[#a89279] tracking-wide leading-none">
            design
          </h2>

          {/* Thin divider */}
          <div className="h-px w-16 bg-[#d4cdc5] mx-auto my-10" />

          {/* Description */}
          <p className="font-light text-[#a89279] text-lg leading-relaxed max-w-xl mx-auto">
            nordic minimalism is not about having less — it is about making room for what matters.
            warmth through restraint. beauty through honesty. calm through intention.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
            <button className="px-10 py-4 bg-[#3d3d3d] text-[#f5f0eb] font-light text-sm tracking-wide hover:bg-[#5a7a6b] transition-all duration-700 ease-in-out">
              explore the system
            </button>
            <button className="px-10 py-4 border border-[#5a7a6b] text-[#5a7a6b] font-light text-sm tracking-wide hover:bg-[#5a7a6b] hover:text-[#f5f0eb] transition-all duration-700 ease-in-out">
              view principles
            </button>
          </div>
        </div>
      </section>

      {/* ─── 3. Components Demo ────────────────────────────────────────────── */}
      <section className="py-28 px-8 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#a89279] text-xs tracking-[0.4em] uppercase font-light mb-3">components</p>
            <h2 className="font-extralight text-4xl text-[#3d3d3d] tracking-wide mb-2">design elements</h2>
            <p className="font-light text-[#a89279] mb-12">
              every component carries the weight of nordic quiet — unhurried, considered, purposeful.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex gap-0 border-b border-[#d4cdc5]/40 mb-10">
              {(["buttons", "cards", "inputs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setComponentTab(tab)}
                  className="px-8 py-3.5 text-sm font-light tracking-wide lowercase transition-all duration-700 ease-in-out border-b-2"
                  style={{
                    color: componentTab === tab ? "#3d3d3d" : "#a89279",
                    borderBottomColor: componentTab === tab ? "#5a7a6b" : "transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content */}
          <div
            style={{
              opacity: 1,
              transition: "opacity 0.7s ease-in-out",
            }}
          >
            {/* Buttons panel */}
            {componentTab === "buttons" && (
              <RevealBlock delay={0}>
                <div className="p-10 bg-[#f5f0eb] border border-[#d4cdc5]/30">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#a89279] font-light mb-8">button variants</p>
                  <div className="flex flex-wrap gap-4 items-center">
                    <button className="px-8 py-3.5 bg-[#3d3d3d] text-[#f5f0eb] font-light text-sm tracking-wide hover:bg-[#5a7a6b] transition-all duration-700 ease-in-out">
                      primary
                    </button>
                    <button className="px-8 py-3.5 border border-[#3d3d3d] text-[#3d3d3d] font-light text-sm tracking-wide hover:bg-[#3d3d3d] hover:text-[#f5f0eb] transition-all duration-700 ease-in-out">
                      secondary
                    </button>
                    <button className="px-8 py-3.5 border border-[#5a7a6b] text-[#5a7a6b] font-light text-sm tracking-wide hover:bg-[#5a7a6b] hover:text-[#f5f0eb] transition-all duration-700 ease-in-out">
                      pine green
                    </button>
                    <button className="px-8 py-3.5 border border-[#7ba0b8] text-[#7ba0b8] font-light text-sm tracking-wide hover:bg-[#7ba0b8] hover:text-[#f5f0eb] transition-all duration-700 ease-in-out">
                      fjord blue
                    </button>
                    <button className="px-8 py-3.5 text-[#5a7a6b] font-light text-sm tracking-wide underline underline-offset-4 decoration-[#d4cdc5] hover:text-[#3d3d3d] hover:decoration-[#3d3d3d] transition-all duration-700 ease-in-out">
                      text link
                    </button>
                    <button className="px-8 py-3.5 bg-[#d4cdc5]/40 text-[#a89279] font-light text-sm tracking-wide cursor-not-allowed">
                      disabled
                    </button>
                  </div>
                  <div className="mt-8 pt-8 border-t border-[#d4cdc5]/30">
                    <p className="text-xs text-[#a89279] font-light italic">
                      all transitions run at 700ms — the speed of morning fog settling over a fjord.
                    </p>
                  </div>
                </div>
              </RevealBlock>
            )}

            {/* Cards panel */}
            {componentTab === "cards" && (
              <RevealBlock delay={0}>
                <div className="grid md:grid-cols-3 gap-5">
                  {[
                    {
                      label: "birch forest",
                      desc: "white bark against grey sky. the silence before snow. a breath held between seasons.",
                      accent: "#5a7a6b",
                    },
                    {
                      label: "morning light",
                      desc: "the slow arrival of nordic dawn. amber warmth through frosted glass. the kettle beginning to sing.",
                      accent: "#c9a88c",
                    },
                    {
                      label: "still water",
                      desc: "a lake reflecting the pine ridge. no wind. the kind of quiet that settles into bone.",
                      accent: "#7ba0b8",
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="group p-8 bg-white/60 border border-[#d4cdc5]/30 hover:border-[#d4cdc5]/80 hover:bg-[#fcfaf8] transition-all duration-700 ease-in-out"
                    >
                      <div
                        className="w-8 h-px mb-6 transition-all duration-700"
                        style={{ backgroundColor: card.accent }}
                      />
                      <h3
                        className="font-light text-[#3d3d3d] text-lg lowercase mb-3 group-hover:text-[#5a7a6b] transition-colors duration-700"
                      >
                        {card.label}
                      </h3>
                      <p className="text-sm font-light text-[#a89279] leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </RevealBlock>
            )}

            {/* Inputs panel */}
            {componentTab === "inputs" && (
              <RevealBlock delay={0}>
                <div className="max-w-md p-10 bg-[#f5f0eb] border border-[#d4cdc5]/30 space-y-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#a89279] font-light mb-2">form elements</p>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.25em] text-[#a89279] font-light mb-3">
                      full name
                    </label>
                    <input
                      type="text"
                      placeholder="your name"
                      className="w-full pb-2.5 bg-transparent border-b border-[#d4cdc5] text-[#3d3d3d] font-light text-sm placeholder-[#d4cdc5] focus:outline-none focus:border-[#5a7a6b] transition-colors duration-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.25em] text-[#a89279] font-light mb-3">
                      email address
                    </label>
                    <input
                      type="email"
                      placeholder="hello@hygge.no"
                      className="w-full pb-2.5 bg-transparent border-b border-[#d4cdc5] text-[#3d3d3d] font-light text-sm placeholder-[#d4cdc5] focus:outline-none focus:border-[#5a7a6b] transition-colors duration-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.25em] text-[#a89279] font-light mb-3">
                      message
                    </label>
                    <textarea
                      placeholder="write slowly. there is no rush."
                      rows={3}
                      className="w-full pb-2.5 bg-transparent border-b border-[#d4cdc5] text-[#3d3d3d] font-light text-sm placeholder-[#d4cdc5] focus:outline-none focus:border-[#5a7a6b] transition-colors duration-700 resize-none"
                    />
                  </div>
                  <button className="w-full py-3.5 bg-[#3d3d3d] text-[#f5f0eb] font-light text-sm tracking-wide hover:bg-[#5a7a6b] transition-all duration-700 ease-in-out">
                    send quietly
                  </button>
                </div>
              </RevealBlock>
            )}
          </div>
        </div>
      </section>

      {/* ─── 4. Color Palette ──────────────────────────────────────────────── */}
      <section id="palette" className="py-28 px-8 bg-[#f5f0eb]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#a89279] text-xs tracking-[0.4em] uppercase font-light mb-3">color palette</p>
            <h2 className="font-extralight text-4xl text-[#3d3d3d] tracking-wide mb-2">nordic hues</h2>
            <p className="font-light text-[#a89279] mb-14 max-w-lg">
              drawn from the land itself — the hues of birch bark, pine shadow, fjord water, and wool.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                name: "charcoal",
                hex: "#3d3d3d",
                bg: "#3d3d3d",
                source: "burnt pine wood",
                light: true,
              },
              {
                name: "birch",
                hex: "#f5f0eb",
                bg: "#f5f0eb",
                source: "birch tree bark",
                light: false,
                border: true,
              },
              {
                name: "pine",
                hex: "#5a7a6b",
                bg: "#5a7a6b",
                source: "pine forest",
                light: true,
              },
              {
                name: "fjord",
                hex: "#7ba0b8",
                bg: "#7ba0b8",
                source: "fjord water",
                light: true,
              },
              {
                name: "wood",
                hex: "#c9a88c",
                bg: "#c9a88c",
                source: "driftwood",
                light: false,
              },
              {
                name: "wool",
                hex: "#d4cdc5",
                bg: "#d4cdc5",
                source: "wool blanket",
                light: false,
              },
            ].map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.07}>
                <div
                  className="flex flex-col"
                  style={{
                    border: color.border ? "1px solid #d4cdc5" : undefined,
                  }}
                >
                  {/* Tall swatch */}
                  <div
                    className="h-40 w-full"
                    style={{ backgroundColor: color.bg }}
                  />
                  {/* Label area */}
                  <div className="pt-4 pb-2">
                    <p
                      className="font-light text-sm lowercase"
                      style={{ color: "#3d3d3d" }}
                    >
                      {color.name}
                    </p>
                    <p className="font-light text-xs text-[#a89279] mt-0.5 font-mono">{color.hex}</p>
                    <p className="font-light text-xs text-[#d4cdc5] mt-1 italic leading-tight">{color.source}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Gradient strip */}
          <RevealBlock delay={0.5} className="mt-16">
            <div
              className="h-2 w-full"
              style={{
                background: "linear-gradient(to right, #3d3d3d, #5a7a6b, #7ba0b8, #c9a88c, #d4cdc5, #f5f0eb)",
              }}
            />
            <p className="text-xs font-light text-[#a89279] mt-3 tracking-wide">
              the nordic gradient — from darkness into morning light
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ─── 5. Materials & Textures ───────────────────────────────────────── */}
      <section id="materials" className="py-28 px-8 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#a89279] text-xs tracking-[0.4em] uppercase font-light mb-3">materials</p>
            <h2 className="font-extralight text-4xl text-[#3d3d3d] tracking-wide mb-2">textures of the north</h2>
            <p className="font-light text-[#a89279] mb-14 max-w-lg">
              scandinavian interiors speak through material — each surface carrying memory of forest, shore, and hearth.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Wood grain panel */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 border border-[#c9a88c]/30 h-64 flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: "rgba(201,168,140,0.12)" }}
              >
                {/* Horizontal grain lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[14, 26, 38, 52, 66, 80, 92, 106, 118, 132, 146, 160, 174, 188, 202, 220, 236, 250].map((y) => (
                    <div
                      key={y}
                      className="absolute left-0 right-0"
                      style={{
                        top: y,
                        height: 1,
                        backgroundColor: `rgba(201,168,140,${0.08 + (y % 40 === 0 ? 0.12 : 0.03)})`,
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <p className="font-light text-xs uppercase tracking-[0.3em] text-[#a89279]">wood grain</p>
                </div>
                <div className="relative z-10">
                  <p className="font-light text-sm text-[#3d3d3d] lowercase">oak, ash, birch</p>
                  <p className="font-light text-xs text-[#a89279] mt-1 italic">the grain of time</p>
                </div>
              </div>
            </RevealBlock>

            {/* Linen panel */}
            <RevealBlock delay={0.2}>
              <div
                className="p-8 border border-[#d4cdc5]/40 h-64 flex flex-col justify-between relative overflow-hidden bg-[#f5f0eb]"
              >
                {/* Fine linen weave suggestion */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="absolute left-0 right-0"
                      style={{ top: i * 13, height: 1, backgroundColor: "#d4cdc5" }}
                    />
                  ))}
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="absolute top-0 bottom-0"
                      style={{ left: i * 16, width: 1, backgroundColor: "#d4cdc5" }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <p className="font-light text-xs uppercase tracking-[0.3em] text-[#a89279]">linen</p>
                </div>
                <div className="relative z-10">
                  <p className="font-light text-sm text-[#3d3d3d] lowercase">cotton, flax, hemp</p>
                  <p className="font-light text-xs text-[#a89279] mt-1 italic">woven breath</p>
                </div>
              </div>
            </RevealBlock>

            {/* Stone panel */}
            <RevealBlock delay={0.3}>
              <div
                className="p-8 border border-[#999999]/20 h-64 flex flex-col justify-between relative overflow-hidden"
                style={{ backgroundColor: "rgba(153,153,153,0.08)" }}
              >
                {/* Stone texture dots */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-[#999999]"
                      style={{
                        width: Math.random() * 3 + 1,
                        height: Math.random() * 3 + 1,
                        left: `${(i * 37) % 100}%`,
                        top: `${(i * 23 + 11) % 100}%`,
                        opacity: 0.3 + (i % 3) * 0.2,
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <p className="font-light text-xs uppercase tracking-[0.3em] text-[#a89279]">stone</p>
                </div>
                <div className="relative z-10">
                  <p className="font-light text-sm text-[#3d3d3d] lowercase">granite, slate, quartzite</p>
                  <p className="font-light text-xs text-[#a89279] mt-1 italic">ancient patience</p>
                </div>
              </div>
            </RevealBlock>

            {/* Wool panel */}
            <RevealBlock delay={0.4}>
              <div
                className="p-8 h-64 flex flex-col justify-between bg-[#3d3d3d] text-[#f5f0eb]"
              >
                <div>
                  <p className="font-light text-xs uppercase tracking-[0.3em] text-[#d4cdc5]/70">wool</p>
                </div>
                <div>
                  <p className="font-light text-sm text-[#f5f0eb] lowercase">merino, lambswool</p>
                  <p className="font-light text-xs text-[#d4cdc5]/70 mt-1 italic">warmth remembered</p>
                </div>
                {/* Knit pattern suggestion */}
                <div className="mt-4 flex gap-1 flex-wrap opacity-20">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm border border-[#d4cdc5]"
                    />
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── 6. Typography ─────────────────────────────────────────────────── */}
      <section className="py-28 px-8 bg-[#f5f0eb]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#a89279] text-xs tracking-[0.4em] uppercase font-light mb-3">typography</p>
            <h2 className="font-extralight text-4xl text-[#3d3d3d] tracking-wide mb-2">the weight of words</h2>
            <p className="font-light text-[#a89279] mb-14 max-w-lg">
              scandinavian type favors lightness. words should rest on the page, not press into it.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Type scale */}
            <RevealBlock delay={0.1}>
              <div className="p-10 bg-white/60 border border-[#d4cdc5]/30 space-y-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#a89279] font-light mb-6">type scale</p>
                <div>
                  <p className="font-extralight text-5xl text-[#3d3d3d] tracking-wide leading-tight">display</p>
                  <p className="text-xs text-[#d4cdc5] font-light mt-1">font-extralight / 48px / tracking-wide</p>
                </div>
                <div className="h-px bg-[#d4cdc5]/30" />
                <div>
                  <p className="font-light text-3xl text-[#3d3d3d] tracking-wide">heading</p>
                  <p className="text-xs text-[#d4cdc5] font-light mt-1">font-light / 30px / tracking-wide</p>
                </div>
                <div className="h-px bg-[#d4cdc5]/30" />
                <div>
                  <p className="font-light text-xl text-[#a89279]">subheading</p>
                  <p className="text-xs text-[#d4cdc5] font-light mt-1">font-light / 20px / color: wood</p>
                </div>
                <div className="h-px bg-[#d4cdc5]/30" />
                <div>
                  <p className="font-normal text-base text-[#3d3d3d] leading-relaxed">
                    body text flows at a measured pace, allowing the reader to settle into meaning.
                  </p>
                  <p className="text-xs text-[#d4cdc5] font-light mt-1">font-normal / 16px / leading-relaxed</p>
                </div>
                <div className="h-px bg-[#d4cdc5]/30" />
                <div>
                  <p className="font-light text-xs uppercase tracking-[0.4em] text-[#a89279]">label or caption</p>
                  <p className="text-xs text-[#d4cdc5] font-light mt-1">font-light / 12px / tracking-[0.4em]</p>
                </div>
              </div>
            </RevealBlock>

            {/* Nordic poem */}
            <RevealBlock delay={0.2}>
              <div className="p-10 bg-white/60 border border-[#d4cdc5]/30 flex flex-col justify-between h-full">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#a89279] font-light mb-8">a nordic verse</p>
                  <div className="space-y-4">
                    <p className="font-extralight text-2xl text-[#3d3d3d] tracking-wide leading-relaxed italic">
                      the fire does not hurry.
                    </p>
                    <p className="font-light text-xl text-[#a89279] tracking-wide leading-relaxed italic">
                      the kettle does not rush.
                    </p>
                    <p className="font-extralight text-2xl text-[#3d3d3d] tracking-wide leading-relaxed italic">
                      the morning asks only
                    </p>
                    <p className="font-light text-xl text-[#5a7a6b] tracking-wide leading-relaxed italic">
                      to be received.
                    </p>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="h-px w-10 bg-[#d4cdc5] mb-4" />
                  <p className="text-xs text-[#d4cdc5] font-light italic">
                    lowercase. unhurried. present.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Font weight showcase */}
          <RevealBlock delay={0.3} className="mt-8">
            <div className="p-10 bg-white/60 border border-[#d4cdc5]/30">
              <p className="text-xs uppercase tracking-[0.3em] text-[#a89279] font-light mb-8">weight contrast</p>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="font-extralight text-2xl text-[#3d3d3d] mb-2">extralight</p>
                  <p className="text-xs text-[#d4cdc5] font-light">200 — stillness</p>
                </div>
                <div>
                  <p className="font-light text-2xl text-[#3d3d3d] mb-2">light</p>
                  <p className="text-xs text-[#d4cdc5] font-light">300 — calm</p>
                </div>
                <div>
                  <p className="font-normal text-2xl text-[#3d3d3d] mb-2">normal</p>
                  <p className="text-xs text-[#d4cdc5] font-light">400 — presence</p>
                </div>
              </div>
              <p className="text-xs text-[#a89279] font-light italic mt-8 text-center">
                bold and heavy weights are reserved for emphasis only — used sparingly, like salt.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── 7. Hygge Principles ───────────────────────────────────────────── */}
      <section id="principles" className="py-28 px-8 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#a89279] text-xs tracking-[0.4em] uppercase font-light mb-3">philosophy</p>
            <h2 className="font-extralight text-4xl text-[#3d3d3d] tracking-wide mb-2">six hygge principles</h2>
            <p className="font-light text-[#a89279] mb-14 max-w-lg">
              hygge is not a style. it is a way of being. these six principles guide every design decision.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "stillness",
                desc: "design breathes. whitespace is not empty — it is the pause between notes that gives music meaning. resist the urge to fill every corner.",
                delay: 0.1,
              },
              {
                title: "warmth",
                desc: "color reaches toward amber and earth. every palette choice should feel like a lit hearth at dusk — welcoming, never demanding attention.",
                delay: 0.15,
              },
              {
                title: "togetherness",
                desc: "spaces are made for gathering. layouts should feel inclusive, never isolating. design for the shared moment, the common table.",
                delay: 0.2,
              },
              {
                title: "simplicity",
                desc: "each element must justify its presence. ornament for its own sake is removed. what remains is truer, stronger, and more beautiful.",
                delay: 0.25,
              },
              {
                title: "presence",
                desc: "transitions are slow because the moment deserves attention. 700ms is a breath. do not rush the user past the experience.",
                delay: 0.3,
              },
              {
                title: "gratitude",
                desc: "to use a well-made thing with care is a form of gratitude. design that honors materials and craft inspires this feeling in return.",
                delay: 0.35,
              },
            ].map((principle) => (
              <RevealBlock key={principle.title} delay={principle.delay}>
                <div className="flex gap-0 bg-[#f5f0eb] border border-[#d4cdc5]/30 hover:border-[#d4cdc5]/70 transition-all duration-700 ease-in-out group">
                  {/* Pine green left accent strip */}
                  <div className="w-1 bg-[#5a7a6b] flex-shrink-0 group-hover:bg-[#3d3d3d] transition-colors duration-700" />
                  <div className="p-8">
                    <h3 className="font-light text-[#3d3d3d] text-lg lowercase mb-3 tracking-wide">
                      {principle.title}
                    </h3>
                    <p className="font-light text-sm text-[#a89279] leading-relaxed">{principle.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. Accordion / Expanded Principles ────────────────────────────── */}
      <section className="py-28 px-8 bg-[#f5f0eb]">
        <div className="max-w-3xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#a89279] text-xs tracking-[0.4em] uppercase font-light mb-3">in depth</p>
            <h2 className="font-extralight text-4xl text-[#3d3d3d] tracking-wide mb-2">questions of living</h2>
            <p className="font-light text-[#a89279] mb-12 max-w-lg">
              expand each question with unhurried intention.
            </p>
          </RevealBlock>

          <div className="space-y-3">
            {[
              {
                question: "what is scandinavian design?",
                answer:
                  "scandinavian design emerged from the nordic countries across the early twentieth century. rooted in the belief that beautiful, functional objects should be available to all — not just the privileged few — it weaves together craft tradition, natural material, and a deep respect for the environment. it is design in service of life, not above it.",
              },
              {
                question: "why does simplicity feel warm here?",
                answer:
                  "because simplicity is not coldness. in the scandinavian tradition, reducing to essentials creates space for meaning. a room with fewer objects is a room where each object matters. a palette of warm neutrals — birch, wood, wool — carries thermal memory. the eye rests, the spirit quiets.",
              },
              {
                question: "how does hygge translate to interface design?",
                answer:
                  "hygge in interfaces means transitions that do not startle. it means whitespace that does not apologize. font weights that rest rather than shout. color that suggests rather than demands. interactive elements that respond with the calm assurance of a good host — present, attentive, never intrusive.",
              },
              {
                question: "why 700ms transitions?",
                answer:
                  "morning fog does not lift in an instant. it moves across the fjord at its own pace, and that pace is part of its beauty. 700ms is just long enough to notice the change — to be present for it. instant transitions signal urgency. hygge signals ease.",
              },
            ].map((item, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="bg-white/60 border border-[#d4cdc5]/30 overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-all duration-700 ease-in-out group"
                  >
                    <span className="font-light text-[#3d3d3d] lowercase group-hover:text-[#5a7a6b] transition-colors duration-700">
                      {item.question}
                    </span>
                    <span
                      className="text-[#a89279] font-light text-lg transition-all duration-700 ease-in-out flex-shrink-0 ml-4"
                      style={{
                        transform: openAccordion === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openAccordion === i && (
                    <div className="px-8 pb-7 border-t border-[#d4cdc5]/30 pt-5">
                      <p className="font-light text-sm text-[#a89279] leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. DO / DON'T ─────────────────────────────────────────────────── */}
      <section className="py-28 px-8 bg-white/40">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#a89279] text-xs tracking-[0.4em] uppercase font-light mb-3">guidance</p>
            <h2 className="font-extralight text-4xl text-[#3d3d3d] tracking-wide mb-2">do / do not</h2>
            <p className="font-light text-[#a89279] mb-14 max-w-lg">
              the line between calm and cold, between warm and heavy, is found in small decisions.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO column */}
            <RevealBlock delay={0.1}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-[#5a7a6b]/30" />
                  <p className="text-xs uppercase tracking-[0.4em] font-light text-[#5a7a6b]">do</p>
                  <div className="h-px flex-1 bg-[#5a7a6b]/30" />
                </div>
                <div className="space-y-4">
                  {[
                    {
                      heading: "embrace generous whitespace",
                      body: "let elements breathe. padding of py-10 or py-16 is the minimum. space is not waste — it is the material of calm.",
                    },
                    {
                      heading: "use the full 700ms",
                      body: "transitions should be felt, not merely noted. the duration is intentional. let morning fog take its time.",
                    },
                    {
                      heading: "keep text lowercase",
                      body: "for brand labels, navigation, and headings — lowercase carries a quiet authority. it does not shout.",
                    },
                    {
                      heading: "prefer font-light and font-extralight",
                      body: "weight communicates urgency. lightness communicates ease. default to 200–300 and reserve heavier weights for hierarchy.",
                    },
                    {
                      heading: "honor the warm neutrals",
                      body: "birch, wool, wood, fjord — the palette is complete. resist adding bright accents from outside the nordic spectrum.",
                    },
                  ].map((item) => (
                    <div
                      key={item.heading}
                      className="p-6 bg-[#f5f0eb] border-t-2 border-[#5a7a6b] hover:border-[#3d3d3d] transition-all duration-700 ease-in-out"
                    >
                      <p className="font-light text-[#3d3d3d] lowercase mb-2">{item.heading}</p>
                      <p className="font-light text-sm text-[#a89279] leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-[#d4cdc5]/50" />
                  <p className="text-xs uppercase tracking-[0.4em] font-light text-[#a89279]">do not</p>
                  <div className="h-px flex-1 bg-[#d4cdc5]/50" />
                </div>
                <div className="space-y-4">
                  {[
                    {
                      heading: "compress whitespace to save space",
                      body: "dense packing creates visual noise. if there is not enough room for breathing space, there is too much content.",
                    },
                    {
                      heading: "use bounce or spring animations",
                      body: "springs are playful. scandinavian is considered. stick to cubic-bezier(0.16,1,0.3,1) — a smooth, unhurried arrival.",
                    },
                    {
                      heading: "introduce high-saturation colors",
                      body: "a bright orange call-to-action is a shout in a quiet room. if emphasis is needed, reach for charcoal — not a neon.",
                    },
                    {
                      heading: "use scale or translate on hover",
                      body: "movement draws the eye away from content. brightness or border changes are enough. the card should not leap toward the user.",
                    },
                    {
                      heading: "add heavy shadows",
                      body: "deep drop shadows suggest drama. scandinavian surfaces sit quietly on each other. use border opacity instead.",
                    },
                  ].map((item) => (
                    <div
                      key={item.heading}
                      className="p-6 bg-[#faf9f7] border-t-2 border-[#d4cdc5] hover:border-[#a89279] transition-all duration-700 ease-in-out"
                    >
                      <p className="font-light text-[#a89279] lowercase mb-2">{item.heading}</p>
                      <p className="font-light text-sm text-[#d4cdc5] leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── Bonus: Design Tokens Reference ───────────────────────────────── */}
      <section className="py-28 px-8 bg-[#f5f0eb]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#a89279] text-xs tracking-[0.4em] uppercase font-light mb-3">design tokens</p>
            <h2 className="font-extralight text-4xl text-[#3d3d3d] tracking-wide mb-2">implementation</h2>
            <p className="font-light text-[#a89279] mb-14 max-w-lg">
              the values beneath the calm. every decision made explicit.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Spacing tokens */}
            <RevealBlock delay={0.1}>
              <div className="p-8 bg-white/60 border border-[#d4cdc5]/30 h-full">
                <p className="text-xs uppercase tracking-[0.3em] text-[#a89279] font-light mb-6">spacing</p>
                <div className="space-y-4">
                  {[
                    { label: "section padding", value: "py-28 → py-40" },
                    { label: "card padding", value: "p-8 → p-10" },
                    { label: "element gap", value: "gap-4 → gap-8" },
                    { label: "text margin", value: "mb-12 → mb-14" },
                    { label: "divider width", value: "w-10 → w-16" },
                  ].map((token) => (
                    <div key={token.label} className="flex justify-between items-baseline">
                      <p className="font-light text-xs text-[#a89279] lowercase">{token.label}</p>
                      <p className="font-light text-xs text-[#3d3d3d] font-mono">{token.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Motion tokens */}
            <RevealBlock delay={0.15}>
              <div className="p-8 bg-white/60 border border-[#d4cdc5]/30 h-full">
                <p className="text-xs uppercase tracking-[0.3em] text-[#a89279] font-light mb-6">motion</p>
                <div className="space-y-4">
                  {[
                    { label: "primary duration", value: "700ms" },
                    { label: "easing", value: "ease-in-out" },
                    { label: "reveal curve", value: "cubic-bezier(0.16,1,0.3,1)" },
                    { label: "reveal distance", value: "translateY(32px)" },
                    { label: "reveal threshold", value: "0.15 (15%)" },
                  ].map((token) => (
                    <div key={token.label} className="flex justify-between items-baseline">
                      <p className="font-light text-xs text-[#a89279] lowercase">{token.label}</p>
                      <p className="font-light text-xs text-[#3d3d3d] font-mono">{token.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Border tokens */}
            <RevealBlock delay={0.2}>
              <div className="p-8 bg-white/60 border border-[#d4cdc5]/30 h-full">
                <p className="text-xs uppercase tracking-[0.3em] text-[#a89279] font-light mb-6">borders</p>
                <div className="space-y-4">
                  {[
                    { label: "resting state", value: "/30 opacity" },
                    { label: "hover state", value: "/80 opacity" },
                    { label: "accent strip", value: "w-1" },
                    { label: "divider line", value: "h-px" },
                    { label: "nav bottom", value: "/40 opacity" },
                  ].map((token) => (
                    <div key={token.label} className="flex justify-between items-baseline">
                      <p className="font-light text-xs text-[#a89279] lowercase">{token.label}</p>
                      <p className="font-light text-xs text-[#3d3d3d] font-mono">{token.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Full color token reference */}
          <RevealBlock delay={0.3} className="mt-6">
            <div className="p-8 bg-white/60 border border-[#d4cdc5]/30">
              <p className="text-xs uppercase tracking-[0.3em] text-[#a89279] font-light mb-6">color tokens</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { role: "background", value: "#f5f0eb", name: "birch" },
                  { role: "foreground", value: "#3d3d3d", name: "charcoal" },
                  { role: "muted", value: "#a89279", name: "muted wood" },
                  { role: "border", value: "#d4cdc5", name: "wool" },
                  { role: "accent primary", value: "#5a7a6b", name: "pine" },
                  { role: "accent secondary", value: "#7ba0b8", name: "fjord" },
                  { role: "warm highlight", value: "#c9a88c", name: "wood" },
                  { role: "surface", value: "white/60", name: "cloud" },
                ].map((token) => (
                  <div key={token.role} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 flex-shrink-0 border border-[#d4cdc5]/40"
                      style={{ backgroundColor: token.value.includes("/") ? undefined : token.value,
                        background: token.value.includes("/") ? "rgba(255,255,255,0.6)" : undefined }}
                    />
                    <div>
                      <p className="font-light text-xs text-[#a89279] lowercase leading-tight">{token.role}</p>
                      <p className="font-light text-xs text-[#d4cdc5] font-mono">{token.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── 10. Footer ────────────────────────────────────────────────────── */}
      <footer className="py-16 px-8 bg-[#f5f0eb] border-t border-[#d4cdc5]/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Pine branch decoration */}
            <PineBranchDecoration />

            {/* Brand */}
            <p className="font-extralight text-2xl text-[#5a7a6b] tracking-wide lowercase mt-8 mb-2">
              scandinavian
            </p>
            <p className="font-light text-xs text-[#a89279] tracking-[0.3em] uppercase mb-10">
              a stylekit showcase
            </p>

            {/* Thin divider */}
            <div className="h-px w-12 bg-[#d4cdc5] mb-10" />

            {/* Footer links */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {[
                { label: "explore", href: "#explore" },
                { label: "palette", href: "#palette" },
                { label: "materials", href: "#materials" },
                { label: "principles", href: "#principles" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-light text-[#a89279] lowercase tracking-wide hover:text-[#3d3d3d] transition-colors duration-700"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* StyleKit link */}
            <Link
              href="/styles"
              className="text-xs font-light text-[#d4cdc5] lowercase tracking-wide hover:text-[#5a7a6b] transition-colors duration-700"
            >
              part of stylekit &rarr;
            </Link>

            {/* Credits */}
            <p className="font-light text-xs text-[#d4cdc5] mt-8 italic">
              designed with nordic patience. transitions at 700ms.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
