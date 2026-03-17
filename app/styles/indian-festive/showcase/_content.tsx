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

// Small SVG Mandala decoration
function MandalaSVG({ size = 120, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <circle cx="60" cy="60" r="56" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="60" cy="60" r="44" stroke="#ff9f1c" strokeWidth="1" strokeDasharray="3 4" />
      <circle cx="60" cy="60" r="32" stroke="#d4af37" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="20" stroke="#e63946" strokeWidth="1" />
      <circle cx="60" cy="60" r="8" fill="#d4af37" fillOpacity="0.3" />
      <circle cx="60" cy="60" r="4" fill="#d4af37" />
      {/* 8-point petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x1 = 60 + 20 * Math.cos(rad)
        const y1 = 60 + 20 * Math.sin(rad)
        const x2 = 60 + 44 * Math.cos(rad)
        const y2 = 60 + 44 * Math.sin(rad)
        const dotX = 60 + 56 * Math.cos(rad)
        const dotY = 60 + 56 * Math.sin(rad)
        return (
          <g key={angle}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d4af37" strokeWidth="1" strokeOpacity="0.6" />
            <circle cx={dotX} cy={dotY} r="2.5" fill="#ff9f1c" />
          </g>
        )
      })}
      {/* Diagonal accent marks */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const x = 60 + 38 * Math.cos(rad)
        const y = 60 + 38 * Math.sin(rad)
        return <circle key={angle} cx={x} cy={y} r="1.5" fill="#e63946" fillOpacity="0.7" />
      })}
    </svg>
  )
}

// Diya lamp SVG
function DiyaSVG({ color = "#ff9f1c" }: { color?: string }) {
  return (
    <svg width="48" height="52" viewBox="0 0 48 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame */}
      <ellipse cx="24" cy="10" rx="5" ry="8" fill="#ff9f1c" fillOpacity="0.9" />
      <ellipse cx="24" cy="11" rx="3" ry="5" fill="#e63946" fillOpacity="0.8" />
      <ellipse cx="24" cy="12" rx="1.5" ry="2.5" fill="#fff8e7" />
      {/* Wick */}
      <line x1="24" y1="18" x2="24" y2="22" stroke="#7b2d8e" strokeWidth="1.5" />
      {/* Diya body */}
      <ellipse cx="24" cy="36" rx="18" ry="10" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
      <path d="M6 36 Q8 46 24 48 Q40 46 42 36" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
      {/* Oil */}
      <ellipse cx="24" cy="34" rx="10" ry="4" fill="#d4af37" fillOpacity="0.3" />
    </svg>
  )
}

export default function IndianFestiveShowcase() {
  const [activeComponentTab, setActiveComponentTab] = useState<"Buttons" | "Cards" | "Inputs">("Buttons")
  const { ref: heroRef, inView: heroInView } = useInView()

  const festivals = [
    {
      name: "Diwali",
      nameHindi: "दीवाली",
      tagline: "Festival of Lights",
      description:
        "Rows of earthen diyas cast a warm golden glow across courtyards. Rangoli patterns bloom on every threshold as families gather to celebrate the triumph of light over darkness.",
      color: "#ff9f1c",
      accent: "#d4af37",
    },
    {
      name: "Holi",
      nameHindi: "होली",
      tagline: "Festival of Colors",
      description:
        "Clouds of vibrant powder fill the air as joyful shouts echo through the streets. Every surface becomes a canvas and every person a walking artwork of shared celebration.",
      color: "#e63946",
      accent: "#ff9f1c",
    },
    {
      name: "Navratri",
      nameHindi: "नवरात्रि",
      tagline: "Nine Nights",
      description:
        "Nine nights of devotional dance, each dedicated to a different form of the goddess. Garba circles spiral under starlit skies as communities unite in rhythmic reverence.",
      color: "#7b2d8e",
      accent: "#d4af37",
    },
    {
      name: "Pongal",
      nameHindi: "पोंगल",
      tagline: "Harvest Festival",
      description:
        "Freshly harvested rice bubbles in terracotta pots as the sun is thanked for another year of abundance. Kolam patterns adorn every doorstep with geometric grace.",
      color: "#2a9d8f",
      accent: "#ff9f1c",
    },
    {
      name: "Durga Puja",
      nameHindi: "दुर्गा पूजा",
      tagline: "Goddess Celebration",
      description:
        "Elaborate pandals house magnificent clay goddesses adorned with gold. Dhak drums fill the autumn air as entire cities transform into open-air temples of devotion.",
      color: "#e63946",
      accent: "#7b2d8e",
    },
    {
      name: "Onam",
      nameHindi: "ओणम",
      tagline: "Floral Harvest",
      description:
        "Intricate pookalam flower carpets spread across courtyards in layered concentric rings. Snake boat races animate the backwaters as communities feast on sadhya.",
      color: "#2a9d8f",
      accent: "#d4af37",
    },
  ]

  const paletteColors = [
    {
      name: "Vermillion",
      sanskritName: "सिन्दूर",
      hex: "#e63946",
      occasion: "Diwali — Auspiciousness",
      bg: "bg-[#e63946]",
    },
    {
      name: "Saffron",
      sanskritName: "केसरी",
      hex: "#ff9f1c",
      occasion: "Holi — Sacred Fire",
      bg: "bg-[#ff9f1c]",
    },
    {
      name: "Gold",
      sanskritName: "स्वर्ण",
      hex: "#d4af37",
      occasion: "All Festivals — Prosperity",
      bg: "bg-[#d4af37]",
    },
    {
      name: "Royal Purple",
      sanskritName: "बैंगनी",
      hex: "#7b2d8e",
      occasion: "Navratri — Royalty",
      bg: "bg-[#7b2d8e]",
    },
    {
      name: "Teal",
      sanskritName: "हरिनील",
      hex: "#2a9d8f",
      occasion: "Onam — Renewal",
      bg: "bg-[#2a9d8f]",
    },
    {
      name: "Warm Ivory",
      sanskritName: "हाथीदांत",
      hex: "#fff8e7",
      occasion: "Pongal — Peace",
      bg: "bg-[#fff8e7]",
      border: true,
    },
  ]

  const mandalaPatterns = [
    {
      title: "Ashtadala",
      subtitle: "Eight Petals",
      significance:
        "The eight-petal lotus mandala represents the eight directions of the cosmos and the eightfold path. Found in temple ceilings across India, it radiates outward from a central bindu point.",
      patternType: "lotus",
    },
    {
      title: "Rangoli Grid",
      subtitle: "Diamond Lattice",
      significance:
        "The diamond grid pattern, drawn freehand with rice flour on festival mornings, creates a protective threshold between the home and the outer world. Each intersection is auspicious.",
      patternType: "grid",
    },
    {
      title: "Chakravyuha",
      subtitle: "Concentric Rings",
      significance:
        "Concentric circles emanating from a central point represent the expanding universe and the ripples of divine energy. Used in kolam, mandana, and rangoli traditions across India.",
      patternType: "rings",
    },
  ]

  const doRules = [
    {
      rule: "Use jewel tones boldly",
      detail: "Vermillion, saffron, and royal purple should sing loudly — Indian festive design is not shy.",
    },
    {
      rule: "Add gold to every element",
      detail: "Borders, glows, dividers, and accents should all incorporate gold as the sacred connective thread.",
    },
    {
      rule: "Layer multiple colors",
      detail:
        "Festive design uses 4-6 colors simultaneously. Monochromatic palettes feel incomplete and culturally inaccurate.",
    },
    {
      rule: "Include geometric ornamentation",
      detail: "Mandala-inspired borders, concentric circles, and petal shapes are intrinsic to the visual language.",
    },
  ]

  const dontRules = [
    {
      rule: "Never use cold blue-grays",
      detail:
        "Steel and slate tones are antithetical to festive warmth. They drain the life from the jewel-tone palette.",
    },
    {
      rule: "Never use sharp corners alone",
      detail: "Hard rectangular corners conflict with the organic, flowing nature of Indian decorative arts.",
    },
    {
      rule: "Never strip the gold glow",
      detail: "Removing box-shadow glow effects makes buttons feel flat and breaks the Grand Illumination signature.",
    },
    {
      rule: "Never flatten the hierarchy",
      detail:
        "Every level — heading, body, caption — should have a distinct festive quality. Uniform gray text is wrong.",
    },
  ]

  const galleryItems = [
    {
      size: "large",
      title: "Grand Illumination",
      subtitle: "Button System",
      description:
        "Every interactive element glows with golden light, creating a tactile warmth that guides the eye and rewards the touch.",
      bg: "bg-gradient-to-br from-[#e63946] via-[#7b2d8e] to-[#ff9f1c]",
      textColor: "text-white",
      border: "border-2 border-[#d4af37]",
    },
    {
      size: "medium",
      title: "Ceremonial Unfurling",
      subtitle: "Card Reveal",
      description: "Gold ribbons extend across the card base on hover, mimicking the unfurling of ceremonial cloth.",
      bg: "bg-[#fff8e7]",
      textColor: "text-[#7b2d8e]",
      border: "border-2 border-[#d4af37]/50",
    },
    {
      size: "medium",
      title: "Mandala Grid",
      subtitle: "Layout System",
      description:
        "Sections are framed with concentric gold borders, echoing the sacred geometry of temple floor patterns.",
      bg: "bg-[#fff8e7]",
      textColor: "text-[#7b2d8e]",
      border: "border-2 border-[#ff9f1c]/40",
    },
    {
      size: "accent",
      title: "Saffron",
      subtitle: "#ff9f1c",
      description: "Sacred fire",
      bg: "bg-[#ff9f1c]",
      textColor: "text-white",
      border: "border-2 border-[#d4af37]",
    },
    {
      size: "accent",
      title: "Teal",
      subtitle: "#2a9d8f",
      description: "Renewal",
      bg: "bg-[#2a9d8f]",
      textColor: "text-white",
      border: "border-2 border-[#d4af37]",
    },
    {
      size: "accent",
      title: "Royal Purple",
      subtitle: "#7b2d8e",
      description: "Royalty",
      bg: "bg-[#7b2d8e]",
      textColor: "text-white",
      border: "border-2 border-[#d4af37]",
    },
  ]

  return (
    <div className="min-h-screen bg-[#fff8e7] text-[#7b2d8e]">

      {/* ─── 1. NAVIGATION ─── */}
      <nav className="sticky top-0 z-50 bg-[#fff8e7] border-b-2 border-[#d4af37]/30 px-6 py-4 shadow-[0_2px_16px_rgba(212,175,55,0.12)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Back + Brand */}
          <div className="flex items-center gap-4">
          <Link
            href="/styles/indian-festive"
            className="group flex items-center gap-1.5 text-sm font-bold text-[#7b2d8e]/50 hover:text-[#e63946] transition-colors duration-300"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
            <span>Back to Docs</span>
          </Link>
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#e63946] to-[#ff9f1c]" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#e63946] to-[#ff9f1c] bg-clip-text text-transparent">
              Indian Festive
            </span>
          </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {["Components", "Palette", "Mandala", "Festivals"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-bold text-[#7b2d8e]/70 hover:text-[#7b2d8e] transition-colors tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/styles"
            className="px-4 py-2 text-sm font-bold text-[#d4af37] border-2 border-[#d4af37]/50 rounded-xl hover:border-[#d4af37] hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all duration-300"
          >
            StyleKit →
          </Link>
        </div>
      </nav>

      {/* ─── 2. HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fff8e7] via-[#ff9f1c]/10 to-[#e63946]/10 px-6 py-28">
        {/* Background mandala decorations */}
        <div className="absolute top-12 right-12 opacity-20 pointer-events-none">
          <MandalaSVG size={200} />
        </div>
        <div className="absolute bottom-20 left-8 opacity-15 pointer-events-none">
          <MandalaSVG size={160} />
        </div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-10 pointer-events-none">
          <MandalaSVG size={100} />
        </div>

        {/* Floating gold dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { top: "15%", left: "8%", size: 6, color: "#d4af37" },
            { top: "25%", right: "12%", size: 4, color: "#ff9f1c" },
            { top: "60%", left: "6%", size: 8, color: "#e63946" },
            { top: "75%", right: "8%", size: 5, color: "#d4af37" },
            { top: "40%", right: "5%", size: 3, color: "#7b2d8e" },
            { top: "85%", left: "15%", size: 4, color: "#2a9d8f" },
          ].map((dot, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: dot.top,
                left: (dot as { left?: string }).left,
                right: (dot as { right?: string }).right,
                width: dot.size,
                height: dot.size,
                backgroundColor: dot.color,
                opacity: 0.5,
              }}
            />
          ))}
        </div>

        <div
          ref={heroRef}
          className="max-w-4xl mx-auto text-center relative z-10"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Large mandala above title */}
          <div className="flex justify-center mb-8 opacity-60">
            <MandalaSVG size={140} />
          </div>

          {/* Gold ceremonial ribbon divider */}
          <div className="h-1 w-24 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-8" />

          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
            Festival of
            <br />
            Light & Color
          </h1>

          <p className="text-[#7b2d8e]/80 text-xl font-medium mb-4 leading-relaxed max-w-2xl mx-auto">
            Where colors dance and light prevails
          </p>
          <p className="text-[#d4af37] text-base font-medium mb-12 leading-relaxed max-w-xl mx-auto">
            Diwali · Holi · Navratri — jewel tones, mandala geometry, golden halos, and ceremonial grace woven into
            every pixel.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#e63946] to-[#ff9f1c] text-white font-bold text-base rounded-xl border-2 border-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.5)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] hover:-translate-y-1 hover:scale-[1.03] active:scale-95 active:translate-y-0 transition-all duration-300">
              Explore Components
            </button>
            <button className="px-8 py-4 bg-transparent text-[#7b2d8e] font-bold text-base rounded-xl border-2 border-[#7b2d8e]/30 hover:border-[#7b2d8e] hover:shadow-[0_0_16px_rgba(123,45,142,0.2)] hover:-translate-y-1 transition-all duration-300">
              View Mandala System
            </button>
          </div>
        </div>
      </section>

      {/* ─── 3. COMPONENTS DEMO ─── */}
      <section id="components" className="py-24 px-6 bg-gradient-to-b from-[#fff8e7] to-[#fef3d0]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="h-1 w-16 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#7b2d8e] mb-3 tracking-tight">Component System</h2>
            <p className="text-[#d4af37] font-medium">Grand Illumination · Ceremonial Unfurling · Joyful Flourish</p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1} className="flex justify-center mb-10">
            <div className="inline-flex bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/30 p-1 shadow-[0_2px_12px_rgba(212,175,55,0.15)]">
              {(["Buttons", "Cards", "Inputs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveComponentTab(tab)}
                  className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 tracking-wide ${
                    activeComponentTab === tab
                      ? "bg-gradient-to-r from-[#e63946] to-[#ff9f1c] text-white shadow-[0_0_16px_rgba(212,175,55,0.4)]"
                      : "text-[#7b2d8e]/60 hover:text-[#7b2d8e]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Buttons tab */}
          {activeComponentTab === "Buttons" && (
            <RevealBlock delay={0.15}>
              <div className="bg-[#fff8e7] rounded-2xl border-2 border-[#d4af37]/40 p-10 shadow-[0_4px_24px_rgba(212,175,55,0.15)]">
                <h3 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-8">
                  Grand Illumination — Button Variants
                </h3>
                <div className="flex flex-wrap gap-5 items-center mb-10">
                  {/* Primary — vermillion with gold border + always-on glow */}
                  <button className="px-6 py-3 bg-gradient-to-r from-[#e63946] to-[#ff9f1c] text-white font-bold rounded-xl border-2 border-[#d4af37] shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:-translate-y-1 hover:scale-[1.03] active:scale-95 active:translate-y-0 transition-all duration-300">
                    Primary
                  </button>

                  {/* Saffron secondary */}
                  <button className="px-6 py-3 bg-[#ff9f1c] text-white font-bold rounded-xl border-2 border-[#d4af37]/70 shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:-translate-y-1 hover:scale-[1.03] active:scale-95 active:translate-y-0 transition-all duration-300">
                    Saffron
                  </button>

                  {/* Teal accent */}
                  <button className="px-6 py-3 bg-[#2a9d8f] text-white font-bold rounded-xl border-2 border-[#d4af37]/50 shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:-translate-y-1 hover:scale-[1.03] active:scale-95 active:translate-y-0 transition-all duration-300">
                    Teal Accent
                  </button>

                  {/* Purple outline */}
                  <button className="px-6 py-3 bg-transparent text-[#7b2d8e] font-bold rounded-xl border-2 border-[#7b2d8e] shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:bg-[#7b2d8e] hover:text-white hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:-translate-y-1 hover:scale-[1.03] active:scale-95 active:translate-y-0 transition-all duration-300">
                    Purple Outline
                  </button>

                  {/* Gold outline */}
                  <button className="px-6 py-3 bg-transparent text-[#d4af37] font-bold rounded-xl border-2 border-[#d4af37] shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:bg-[#d4af37] hover:text-white hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:-translate-y-1 hover:scale-[1.03] active:scale-95 active:translate-y-0 transition-all duration-300">
                    Gold Outline
                  </button>

                  {/* Disabled */}
                  <button
                    disabled
                    className="px-6 py-3 bg-[#d4af37]/15 text-[#d4af37]/40 font-bold rounded-xl border-2 border-[#d4af37]/20 cursor-not-allowed"
                  >
                    Disabled
                  </button>
                </div>

                {/* Icon buttons */}
                <div className="flex flex-wrap gap-4 items-center pt-6 border-t-2 border-[#d4af37]/20">
                  <span className="text-xs font-bold text-[#d4af37] tracking-widest uppercase">Small variants</span>
                  <button className="px-4 py-2 text-sm bg-[#e63946] text-white font-bold rounded-xl border-2 border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.4)] hover:shadow-[0_0_24px_rgba(212,175,55,0.8)] hover:-translate-y-0.5 transition-all duration-300">
                    Shubh
                  </button>
                  <button className="px-4 py-2 text-sm bg-[#ff9f1c] text-white font-bold rounded-xl border-2 border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.4)] hover:shadow-[0_0_24px_rgba(212,175,55,0.8)] hover:-translate-y-0.5 transition-all duration-300">
                    Mangal
                  </button>
                  <button className="px-4 py-2 text-sm bg-[#7b2d8e] text-white font-bold rounded-xl border-2 border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.4)] hover:shadow-[0_0_24px_rgba(212,175,55,0.8)] hover:-translate-y-0.5 transition-all duration-300">
                    Anand
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards tab */}
          {activeComponentTab === "Cards" && (
            <RevealBlock delay={0.15}>
              <div className="bg-[#fff8e7] rounded-2xl border-2 border-[#d4af37]/40 p-10 shadow-[0_4px_24px_rgba(212,175,55,0.15)]">
                <h3 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-8">
                  Ceremonial Unfurling — Card Variants
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Diwali Lights",
                      desc: "Rows of golden diyas illuminate the festival night, each flame a prayer ascending to the divine.",
                      accent: "#e63946",
                    },
                    {
                      title: "Holi Colors",
                      desc: "Clouds of vibrant powder transform the world into a living canvas of shared celebration and joy.",
                      accent: "#ff9f1c",
                    },
                    {
                      title: "Golden Heritage",
                      desc: "Centuries of artistic tradition woven into mandala, rangoli, and temple architecture.",
                      accent: "#7b2d8e",
                    },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="group relative bg-[#fff8e7] rounded-xl border-2 border-[#d4af37]/50 overflow-hidden shadow-[0_4px_16px_rgba(212,175,55,0.15)] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      {/* Ceremonial Unfurling ribbon strip */}
                      <div
                        className="h-1 w-12 group-hover:w-full duration-500 rounded-full transition-all"
                        style={{
                          background: `linear-gradient(to right, ${card.accent}, #ff9f1c, #d4af37)`,
                        }}
                      />
                      <div className="p-6">
                        <div className="w-8 h-8 rounded-full border-2 border-[#d4af37]/40 flex items-center justify-center mb-4">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: card.accent }}
                          />
                        </div>
                        <h4
                          className="text-lg font-bold mb-3 tracking-wide transition-colors duration-300 group-hover:text-[#e63946]"
                          style={{ color: "#7b2d8e" }}
                        >
                          {card.title}
                        </h4>
                        <p className="text-sm text-[#7b2d8e]/60 leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Inputs tab */}
          {activeComponentTab === "Inputs" && (
            <RevealBlock delay={0.15}>
              <div className="bg-[#fff8e7] rounded-2xl border-2 border-[#d4af37]/40 p-10 shadow-[0_4px_24px_rgba(212,175,55,0.15)]">
                <h3 className="text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-8">
                  Golden Touch Focus — Input System
                </h3>
                <div className="max-w-md space-y-5">
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-2">
                      Name — नाम
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-[#fff8e7] border-2 border-[#d4af37]/30 rounded-xl text-[#7b2d8e] placeholder-[#d4af37]/40 font-medium focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_16px_rgba(212,175,55,0.4)] focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#fff8e7] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-2">
                      Email — ईमेल
                    </label>
                    <input
                      type="email"
                      placeholder="your@festive.dev"
                      className="w-full px-4 py-3 bg-[#fff8e7] border-2 border-[#d4af37]/30 rounded-xl text-[#7b2d8e] placeholder-[#d4af37]/40 font-medium focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_16px_rgba(212,175,55,0.4)] focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#fff8e7] transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-2">
                      Festival — उत्सव
                    </label>
                    <select className="w-full px-4 py-3 bg-[#fff8e7] border-2 border-[#d4af37]/30 rounded-xl text-[#7b2d8e] font-medium focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_16px_rgba(212,175,55,0.4)] focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#fff8e7] transition-all duration-300">
                      <option>Diwali</option>
                      <option>Holi</option>
                      <option>Navratri</option>
                      <option>Pongal</option>
                      <option>Durga Puja</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-2">
                      Blessing — आशीर्वाद
                    </label>
                    <textarea
                      placeholder="Share your festive message..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[#fff8e7] border-2 border-[#d4af37]/30 rounded-xl text-[#7b2d8e] placeholder-[#d4af37]/40 font-medium focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_16px_rgba(212,175,55,0.4)] focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#fff8e7] transition-all duration-300 resize-none"
                    />
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-[#e63946] to-[#ff9f1c] text-white font-bold rounded-xl border-2 border-[#d4af37] shadow-[0_0_16px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] hover:-translate-y-1 hover:scale-[1.03] active:scale-95 active:translate-y-0 transition-all duration-300">
                    Send Blessing — शुभकामना भेजें
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ─── 4. COLOR PALETTE ─── */}
      <section id="palette" className="py-24 px-6 bg-[#fff8e7]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="h-1 w-16 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#7b2d8e] mb-3 tracking-tight">Sacred Color Palette</h2>
            <p className="text-[#d4af37] font-medium">Six jewel tones drawn from millennia of Indian festive tradition</p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {paletteColors.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.08}>
                <div className="group bg-[#fff8e7] rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-[0_4px_16px_rgba(212,175,55,0.15)] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300">
                  {/* Color swatch */}
                  <div
                    className={`h-24 ${color.bg} ${color.border ? "border-b-2 border-[#d4af37]/30" : ""} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <MandalaSVG size={80} />
                    </div>
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-[#7b2d8e] text-base tracking-wide">{color.name}</p>
                        <p className="text-[#d4af37] text-sm font-medium">{color.sanskritName}</p>
                      </div>
                      <code className="text-xs font-mono text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded-lg">
                        {color.hex}
                      </code>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#d4af37]/20">
                      <p className="text-xs text-[#7b2d8e]/60 font-medium">{color.occasion}</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. MANDALA DESIGN SYSTEM ─── */}
      <section id="mandala" className="py-24 px-6 bg-gradient-to-b from-[#fef3d0] to-[#fff8e7]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="h-1 w-16 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#7b2d8e] mb-3 tracking-tight">Mandala Design System</h2>
            <p className="text-[#d4af37] font-medium">
              Sacred geometry drawn from 5,000 years of Indian decorative tradition
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-8">
            {mandalaPatterns.map((pattern, i) => (
              <RevealBlock key={pattern.title} delay={i * 0.1}>
                <div className="group bg-[#fff8e7] rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-[0_4px_16px_rgba(212,175,55,0.15)] hover:shadow-[0_0_32px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-500">
                  {/* Ceremonial ribbon */}
                  <div className="h-1 w-12 group-hover:w-full duration-500 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] transition-all" />

                  {/* Pattern display */}
                  <div className="h-48 flex items-center justify-center bg-gradient-to-br from-[#fff8e7] to-[#fef3d0] relative overflow-hidden">
                    {pattern.patternType === "lotus" && (
                      <div className="relative">
                        <MandalaSVG size={160} />
                      </div>
                    )}
                    {pattern.patternType === "grid" && (
                      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                        {/* Diamond grid */}
                        {[0, 40, 80, 120, 160].map((x) =>
                          [0, 40, 80, 120, 160].map((y) => (
                            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#d4af37" fillOpacity="0.6" />
                          ))
                        )}
                        {/* Diagonal lines */}
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                          <line
                            key={`d1-${i}`}
                            x1={i * 40 - 80}
                            y1={0}
                            x2={i * 40 + 80}
                            y2={160}
                            stroke="#ff9f1c"
                            strokeWidth="0.8"
                            strokeOpacity="0.4"
                          />
                        ))}
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                          <line
                            key={`d2-${i}`}
                            x1={i * 40 - 80}
                            y1={160}
                            x2={i * 40 + 80}
                            y2={0}
                            stroke="#e63946"
                            strokeWidth="0.8"
                            strokeOpacity="0.3"
                          />
                        ))}
                        <rect
                          x="60"
                          y="60"
                          width="40"
                          height="40"
                          transform="rotate(45 80 80)"
                          fill="none"
                          stroke="#d4af37"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                    {pattern.patternType === "rings" && (
                      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                        {[72, 60, 48, 36, 24, 12, 4].map((r, idx) => (
                          <circle
                            key={r}
                            cx="80"
                            cy="80"
                            r={r}
                            stroke={idx % 2 === 0 ? "#d4af37" : "#ff9f1c"}
                            strokeWidth={idx === 0 ? "1.5" : "1"}
                            strokeDasharray={idx % 3 === 0 ? "4 3" : undefined}
                            fill={idx === 6 ? "#d4af37" : "none"}
                            fillOpacity={idx === 6 ? "0.4" : undefined}
                          />
                        ))}
                        {[0, 60, 120, 180, 240, 300].map((angle) => {
                          const rad = (angle * Math.PI) / 180
                          return (
                            <line
                              key={angle}
                              x1={80 + 12 * Math.cos(rad)}
                              y1={80 + 12 * Math.sin(rad)}
                              x2={80 + 72 * Math.cos(rad)}
                              y2={80 + 72 * Math.sin(rad)}
                              stroke="#e63946"
                              strokeWidth="0.8"
                              strokeOpacity="0.5"
                            />
                          )
                        })}
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#7b2d8e] mb-1 tracking-wide group-hover:text-[#e63946] transition-colors duration-300">
                      {pattern.title}
                    </h3>
                    <p className="text-sm font-medium text-[#d4af37] mb-4">{pattern.subtitle}</p>
                    <p className="text-sm text-[#7b2d8e]/60 leading-relaxed">{pattern.significance}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. FESTIVAL OF LIGHTS (DIYA CARDS) ─── */}
      <section className="py-24 px-6 bg-[#fff8e7]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="h-1 w-16 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#7b2d8e] mb-3 tracking-tight">Festival of Lights</h2>
            <p className="text-[#d4af37] font-medium">
              Six celebrations — each a universe of color, devotion, and community
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {festivals.map((festival, i) => (
              <RevealBlock key={festival.name} delay={i * 0.07}>
                <div
                  className="group relative bg-[#fff8e7] rounded-2xl border-2 overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-400"
                  style={{
                    borderColor: `${festival.accent}50`,
                    boxShadow: `0 4px 20px ${festival.color}20`,
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${festival.color}50`
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${festival.color}20`
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1.5 w-full"
                    style={{ background: `linear-gradient(to right, ${festival.color}, ${festival.accent})` }}
                  />

                  <div className="p-6">
                    {/* Diya lamp */}
                    <div className="mb-5 flex justify-start">
                      <DiyaSVG color={festival.color} />
                    </div>

                    {/* Festival name with gradient */}
                    <h3
                      className="text-2xl font-bold mb-0.5 bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${festival.color}, ${festival.accent})`,
                      }}
                    >
                      {festival.name}
                    </h3>
                    <p className="text-xs font-medium text-[#d4af37] mb-1">{festival.nameHindi}</p>
                    <p className="text-sm font-bold text-[#7b2d8e]/50 mb-4 tracking-wide">{festival.tagline}</p>
                    <p className="text-sm text-[#7b2d8e]/60 leading-relaxed mb-6">{festival.description}</p>
                  </div>

                  {/* Ceremonial Unfurling ribbon at bottom */}
                  <div className="px-6 pb-5">
                    <div
                      className="h-1 w-8 group-hover:w-full duration-500 rounded-full transition-all"
                      style={{
                        background: `linear-gradient(to right, ${festival.color}, ${festival.accent}, #d4af37)`,
                      }}
                    />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. DO/DON'T RULES ─── */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#fef3d0] to-[#fff8e7]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="h-1 w-16 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#7b2d8e] mb-3 tracking-tight">Design Principles</h2>
            <p className="text-[#d4af37] font-medium">Guidelines for authentic Indian festive visual design</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO column */}
            <RevealBlock delay={0.05}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-6 bg-gradient-to-r from-[#2a9d8f] to-[#d4af37] rounded-full" />
                  <h3 className="text-xl font-bold text-[#2a9d8f] tracking-wide">Do — करें</h3>
                </div>
                {doRules.map((rule, i) => (
                  <div
                    key={i}
                    className="bg-[#fff8e7] rounded-xl border-t-4 border-l-4 border-r border-b border-[#2a9d8f] border-r-[#d4af37]/30 border-b-[#d4af37]/30 p-5 shadow-[0_2px_12px_rgba(42,157,143,0.12)] hover:shadow-[0_4px_20px_rgba(42,157,143,0.25)] transition-all duration-300"
                    style={{ borderTopColor: "#d4af37", borderLeftColor: "#ff9f1c" }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#2a9d8f] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(42,157,143,0.4)]">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#7b2d8e] mb-1.5 tracking-wide">{rule.rule}</p>
                        <p className="text-sm text-[#7b2d8e]/60 leading-relaxed">{rule.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.1}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-6 bg-gradient-to-r from-[#e63946] to-[#ff9f1c] rounded-full" />
                  <h3 className="text-xl font-bold text-[#e63946] tracking-wide">Don&apos;t — न करें</h3>
                </div>
                {dontRules.map((rule, i) => (
                  <div
                    key={i}
                    className="bg-[#fff8e7]/80 rounded-xl border border-[#7b2d8e]/15 p-5 shadow-sm hover:shadow-[0_2px_12px_rgba(230,57,70,0.1)] transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#e63946]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#e63946]/30">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 1L7 7M7 1L1 7" stroke="#e63946" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#7b2d8e]/70 mb-1.5 tracking-wide">{rule.rule}</p>
                        <p className="text-sm text-[#7b2d8e]/40 leading-relaxed">{rule.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ─── 8. CELEBRATION GALLERY ─── */}
      <section className="py-24 px-6 bg-[#fff8e7]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="h-1 w-16 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#7b2d8e] mb-3 tracking-tight">Celebration Gallery</h2>
            <p className="text-[#d4af37] font-medium">
              Ceremonial Unfurling + Grand Illumination in full expression
            </p>
          </RevealBlock>

          {/* Masonry-like grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-auto">
            {/* Large feature card — spans 2 cols, 2 rows */}
            <RevealBlock delay={0.05} className="col-span-2 row-span-2">
              <div className="group h-full min-h-[320px] relative rounded-2xl border-2 border-[#d4af37] overflow-hidden shadow-[0_4px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-400 bg-gradient-to-br from-[#e63946] via-[#7b2d8e] to-[#ff9f1c] cursor-pointer">
                {/* Ceremonial ribbon */}
                <div className="absolute bottom-0 left-0 h-1.5 w-16 group-hover:w-full duration-500 bg-gradient-to-r from-[#d4af37] via-[#ff9f1c] to-[#e63946] transition-all" />

                {/* Background mandala */}
                <div className="absolute top-4 right-4 opacity-20">
                  <MandalaSVG size={160} />
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="h-1 w-12 bg-[#d4af37] rounded-full mb-5 shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Grand Illumination</h3>
                  <p className="text-sm font-bold text-[#d4af37] mb-3 tracking-wide">The Core Interaction Signature</p>
                  <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                    Every button, card, and interactive element radiates golden light — a digital homage to the thousand
                    diyas of Diwali night.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Medium card 1 */}
            <RevealBlock delay={0.1} className="col-span-1">
              <div className="group bg-[#fff8e7] rounded-2xl border-2 border-[#d4af37]/50 overflow-hidden shadow-[0_4px_16px_rgba(212,175,55,0.15)] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="h-1 w-12 group-hover:w-full duration-500 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] transition-all" />
                <div className="p-5">
                  <div className="w-10 h-10 rounded-full bg-[#ff9f1c]/15 border-2 border-[#ff9f1c]/40 flex items-center justify-center mb-4">
                    <div className="w-4 h-4 rounded-full bg-[#ff9f1c]" />
                  </div>
                  <h4 className="font-bold text-[#7b2d8e] mb-2 tracking-wide group-hover:text-[#e63946] transition-colors">
                    Ceremonial Unfurling
                  </h4>
                  <p className="text-xs text-[#7b2d8e]/55 leading-relaxed">
                    Gold ribbon extends across card base, mimicking unfurled ceremonial cloth.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Medium card 2 */}
            <RevealBlock delay={0.12} className="col-span-1">
              <div className="group bg-[#fff8e7] rounded-2xl border-2 border-[#ff9f1c]/40 overflow-hidden shadow-[0_4px_16px_rgba(255,159,28,0.15)] hover:shadow-[0_0_24px_rgba(255,159,28,0.4)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="h-1 w-12 group-hover:w-full duration-500 bg-gradient-to-r from-[#ff9f1c] to-[#d4af37] transition-all" />
                <div className="p-5">
                  <div className="w-10 h-10 rounded-full bg-[#7b2d8e]/15 border-2 border-[#7b2d8e]/30 flex items-center justify-center mb-4">
                    <div className="w-4 h-4 rounded-full bg-[#7b2d8e]" />
                  </div>
                  <h4 className="font-bold text-[#7b2d8e] mb-2 tracking-wide group-hover:text-[#ff9f1c] transition-colors">
                    Joyful Flourish
                  </h4>
                  <p className="text-xs text-[#7b2d8e]/55 leading-relaxed">
                    Hover lifts and scales elements — the physical joy of festive motion.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Small accent cards */}
            {[
              { name: "Saffron", hex: "#ff9f1c", borderHex: "#d4af37", label: "केसरी" },
              { name: "Teal", hex: "#2a9d8f", borderHex: "#d4af37", label: "हरिनील" },
              { name: "Royal Purple", hex: "#7b2d8e", borderHex: "#d4af37", label: "बैंगनी" },
              { name: "Vermillion", hex: "#e63946", borderHex: "#ff9f1c", label: "सिन्दूर" },
            ].map((accent, i) => (
              <RevealBlock key={accent.name} delay={0.15 + i * 0.05} className="col-span-1">
                <div
                  className="group rounded-2xl border-2 overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300"
                  style={{
                    backgroundColor: accent.hex,
                    borderColor: accent.borderHex,
                    boxShadow: `0 4px 16px ${accent.hex}30`,
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${accent.hex}70`
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${accent.hex}30`
                  }}
                >
                  <div className="h-1 w-8 group-hover:w-full duration-500 bg-white/30 transition-all" />
                  <div className="p-4">
                    <p className="font-bold text-white text-sm tracking-wide mb-0.5">{accent.name}</p>
                    <p className="text-white/70 text-xs">{accent.label}</p>
                    <p className="text-white/60 text-xs font-mono mt-1">{accent.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TYPOGRAPHY SECTION ─── */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#fff8e7] to-[#fef3d0]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <div className="h-1 w-16 bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] rounded-full mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[#7b2d8e] mb-3 tracking-tight">Typography Scale</h2>
            <p className="text-[#d4af37] font-medium">Bold, celebratory — every level carries festive warmth</p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="bg-[#fff8e7] rounded-2xl border-2 border-[#d4af37]/40 p-10 shadow-[0_4px_24px_rgba(212,175,55,0.15)] space-y-8">
              <div>
                <p className="text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-3">Display — उत्सव</p>
                <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#e63946] via-[#ff9f1c] to-[#d4af37] bg-clip-text text-transparent leading-tight">
                  Shubh Diwali
                </p>
              </div>
              <div className="h-px bg-[#d4af37]/20" />
              <div>
                <p className="text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-3">Heading — शीर्षक</p>
                <p className="text-4xl font-bold text-[#7b2d8e] leading-tight">Festival of Light and Color</p>
              </div>
              <div className="h-px bg-[#d4af37]/20" />
              <div>
                <p className="text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-3">Subheading — उपशीर्षक</p>
                <p className="text-2xl font-bold text-[#e63946]">Where colors dance and light prevails</p>
              </div>
              <div className="h-px bg-[#d4af37]/20" />
              <div>
                <p className="text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-3">Body — मुख्य पाठ</p>
                <p className="text-base text-[#7b2d8e]/70 leading-relaxed max-w-2xl">
                  Indian festive design draws from the rich visual traditions of Diwali, Holi, and a dozen other
                  celebrations across the subcontinent. It embraces bold jewel tones, gold ornamentation, and
                  mandala-inspired patterns to create interfaces that radiate warmth and exuberant joy.
                </p>
              </div>
              <div className="h-px bg-[#d4af37]/20" />
              <div>
                <p className="text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-3">Caption — शीर्षिका</p>
                <p className="text-sm text-[#d4af37] font-bold tracking-wide">
                  Gold adorns every threshold — स्वर्ण हर द्वार पर
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#fff8e7] pt-16 pb-10 px-6">
        {/* Full gold gradient divider line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#e63946] via-[#ff9f1c] via-[#d4af37] via-[#7b2d8e] to-[#2a9d8f] rounded-full mb-12" />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              {/* Mandala decoration */}
              <div className="mb-5 opacity-40">
                <MandalaSVG size={64} />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#e63946] to-[#ff9f1c] bg-clip-text text-transparent mb-3">
                Indian Festive
              </h3>
              <p className="text-sm text-[#7b2d8e]/60 leading-relaxed max-w-xs">
                A design system celebrating 5,000 years of Indian festive art, color, and sacred geometry in every
                pixel.
              </p>
            </div>

            {/* Links col 1 */}
            <div>
              <h4 className="text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-5">Components</h4>
              <ul className="space-y-3">
                {["Buttons", "Cards", "Inputs", "Typography", "Mandala System"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-[#2a9d8f] hover:text-[#e63946] font-medium transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links col 2 */}
            <div>
              <h4 className="text-xs font-bold tracking-widest text-[#d4af37] uppercase mb-5">Festivals</h4>
              <ul className="space-y-3">
                {["Diwali — दीवाली", "Holi — होली", "Navratri — नवरात्रि", "Pongal — पोंगल", "Onam — ओणम"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-[#ff9f1c] hover:text-[#e63946] font-medium transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-[#d4af37]/20 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Mandala circles decoration */}
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#ff9f1c] shadow-[0_0_8px_rgba(255,159,28,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
              <div className="w-3 h-3 rounded-full bg-[#7b2d8e] shadow-[0_0_8px_rgba(123,45,142,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-[#2a9d8f] shadow-[0_0_8px_rgba(42,157,143,0.5)]" />
            </div>

            <p className="text-xs text-[#d4af37] font-bold tracking-wide text-center">
              &copy; 2026 आनंद StyleKit &mdash; Indian Festive Design System
            </p>

            <div className="flex items-center gap-5">
              <Link
                href="/"
                className="text-xs font-bold text-[#2a9d8f] hover:text-[#e63946] transition-colors tracking-wide"
              >
                StyleKit Home
              </Link>
              <Link
                href="/styles"
                className="text-xs font-bold text-[#ff9f1c] hover:text-[#e63946] transition-colors tracking-wide"
              >
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
