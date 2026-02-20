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

function OrnamentalDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-[#8b6914]/40 to-transparent my-6" />
  )
}

function GoldLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px mx-auto ${className}`}
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, #8b6914 20%, #8b6914 80%, transparent 100%)",
        opacity: 0.4,
      }}
    />
  )
}

function RosaDamascena() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <ellipse cx="60" cy="38" rx="10" ry="18" stroke="#2d4a2d" strokeWidth="0.8" fill="none" transform="rotate(0 60 60)" />
      <ellipse cx="60" cy="38" rx="10" ry="18" stroke="#2d4a2d" strokeWidth="0.8" fill="none" transform="rotate(45 60 60)" />
      <ellipse cx="60" cy="38" rx="10" ry="18" stroke="#2d4a2d" strokeWidth="0.8" fill="none" transform="rotate(90 60 60)" />
      <ellipse cx="60" cy="38" rx="10" ry="18" stroke="#2d4a2d" strokeWidth="0.8" fill="none" transform="rotate(135 60 60)" />
      <ellipse cx="60" cy="38" rx="10" ry="18" stroke="#2d4a2d" strokeWidth="0.8" fill="none" transform="rotate(180 60 60)" />
      <ellipse cx="60" cy="38" rx="10" ry="18" stroke="#2d4a2d" strokeWidth="0.8" fill="none" transform="rotate(225 60 60)" />
      <ellipse cx="60" cy="38" rx="10" ry="18" stroke="#2d4a2d" strokeWidth="0.8" fill="none" transform="rotate(270 60 60)" />
      <ellipse cx="60" cy="38" rx="10" ry="18" stroke="#2d4a2d" strokeWidth="0.8" fill="none" transform="rotate(315 60 60)" />
      <ellipse cx="60" cy="44" rx="7" ry="12" stroke="#8b6914" strokeWidth="0.7" fill="none" transform="rotate(22.5 60 60)" />
      <ellipse cx="60" cy="44" rx="7" ry="12" stroke="#8b6914" strokeWidth="0.7" fill="none" transform="rotate(67.5 60 60)" />
      <ellipse cx="60" cy="44" rx="7" ry="12" stroke="#8b6914" strokeWidth="0.7" fill="none" transform="rotate(112.5 60 60)" />
      <ellipse cx="60" cy="44" rx="7" ry="12" stroke="#8b6914" strokeWidth="0.7" fill="none" transform="rotate(157.5 60 60)" />
      <ellipse cx="60" cy="44" rx="7" ry="12" stroke="#8b6914" strokeWidth="0.7" fill="none" transform="rotate(202.5 60 60)" />
      <ellipse cx="60" cy="44" rx="7" ry="12" stroke="#8b6914" strokeWidth="0.7" fill="none" transform="rotate(247.5 60 60)" />
      <ellipse cx="60" cy="44" rx="7" ry="12" stroke="#8b6914" strokeWidth="0.7" fill="none" transform="rotate(292.5 60 60)" />
      <ellipse cx="60" cy="44" rx="7" ry="12" stroke="#8b6914" strokeWidth="0.7" fill="none" transform="rotate(337.5 60 60)" />
      <circle cx="60" cy="60" r="6" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <circle cx="60" cy="60" r="3" stroke="#8b6914" strokeWidth="0.7" fill="none" />
      <line x1="60" y1="90" x2="60" y2="108" stroke="#2d4a2d" strokeWidth="1" />
      <path d="M60 100 Q50 95 46 88" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <path d="M60 96 Q70 91 74 84" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
    </svg>
  )
}

function FicusLyrata() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <path
        d="M60 20 C40 20 28 35 28 52 C28 68 36 78 60 82 C84 78 92 68 92 52 C92 35 80 20 60 20 Z"
        stroke="#2d4a2d"
        strokeWidth="0.9"
        fill="none"
      />
      <path
        d="M40 75 Q48 82 55 78 Q60 82 65 78 Q72 82 80 75"
        stroke="#2d4a2d"
        strokeWidth="0.8"
        fill="none"
      />
      <line x1="60" y1="20" x2="60" y2="82" stroke="#2d4a2d" strokeWidth="1" />
      <path d="M60 32 Q50 36 44 38" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 32 Q70 36 76 38" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 42 Q48 46 40 48" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 42 Q72 46 80 48" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 52 Q48 55 38 56" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 52 Q72 55 82 56" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 62 Q50 64 42 64" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 62 Q70 64 78 64" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <line x1="60" y1="82" x2="60" y2="108" stroke="#2d4a2d" strokeWidth="1.2" />
    </svg>
  )
}

function Pteridium() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <path d="M60 108 Q58 70 55 20" stroke="#2d4a2d" strokeWidth="1" fill="none" />
      <path d="M57 30 Q44 28 36 24" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M57 28 Q44 26 36 22" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <path d="M57 38 Q42 36 32 30" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M57 36 Q42 34 32 28" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <path d="M57 48 Q40 46 28 38" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M57 46 Q40 44 28 36" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <path d="M57 58 Q40 56 28 48" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M57 56 Q40 54 28 46" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <path d="M58 68 Q44 66 34 58" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M58 70 Q46 68 38 62" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M59 80 Q50 78 44 72" stroke="#2d4a2d" strokeWidth="0.6" fill="none" />
      <path d="M57 30 Q70 28 78 24" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M57 28 Q70 26 78 22" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <path d="M57 38 Q72 36 82 30" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M57 36 Q72 34 82 28" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <path d="M57 48 Q74 46 86 38" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M57 46 Q74 44 86 36" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <path d="M57 58 Q74 56 86 48" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M57 56 Q74 54 86 46" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <path d="M58 68 Q72 66 82 58" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <path d="M58 70 Q70 68 78 62" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M59 80 Q68 78 74 72" stroke="#2d4a2d" strokeWidth="0.6" fill="none" />
    </svg>
  )
}

function QuercusRobur() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <path
        d="M60 18 C56 18 50 22 48 28 C44 28 40 32 40 36 C36 36 32 40 34 46 C30 46 28 52 32 56 C30 60 32 66 36 68 C36 72 40 76 44 76 C46 80 50 82 54 82 L60 84 L66 82 C70 82 74 80 76 76 C80 76 84 72 84 68 C88 66 90 60 88 56 C92 52 90 46 86 46 C88 40 84 36 80 36 C80 32 76 28 72 28 C70 22 64 18 60 18 Z"
        stroke="#2d4a2d"
        strokeWidth="0.9"
        fill="none"
      />
      <line x1="60" y1="18" x2="60" y2="84" stroke="#2d4a2d" strokeWidth="0.9" />
      <path d="M60 30 Q54 34 50 34" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 30 Q66 34 70 34" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 40 Q52 44 46 44" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 40 Q68 44 74 44" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 52 Q52 56 46 56" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 52 Q68 56 74 56" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 62 Q54 66 50 66" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 62 Q66 66 70 66" stroke="#2d4a2d" strokeWidth="0.5" fill="none" />
      <path d="M60 72 Q56 74 54 76" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <path d="M60 72 Q64 74 66 76" stroke="#2d4a2d" strokeWidth="0.4" fill="none" />
      <ellipse cx="60" cy="96" rx="5" ry="4" stroke="#8b6914" strokeWidth="0.8" fill="none" />
      <path d="M55 95 Q60 90 65 95" stroke="#8b6914" strokeWidth="0.8" fill="none" />
      <line x1="60" y1="84" x2="60" y2="92" stroke="#2d4a2d" strokeWidth="0.9" />
    </svg>
  )
}

export default function VictorianBotanicalShowcase() {
  const [activeTab, setActiveTab] = useState<"Specimens" | "Panels" | "Labels">("Specimens")
  const { ref: heroRef, inView: heroInView } = useInView()

  const herbarium = [
    {
      year: "circa 1842",
      common: "English Lavender",
      latin: "Lavandula angustifolia",
      habitat: "Rocky hillsides of the Mediterranean basin; cultivated in English walled gardens.",
    },
    {
      year: "circa 1857",
      common: "Common Foxglove",
      latin: "Digitalis purpurea",
      habitat: "Woodland clearings and hedgerows; native to western and central Europe.",
    },
    {
      year: "circa 1863",
      common: "Sweet Violet",
      latin: "Viola odorata",
      habitat: "Shaded banks and woodland margins; widely naturalised across Britain.",
    },
    {
      year: "circa 1871",
      common: "Maiden Hair Fern",
      latin: "Adiantum capillus-veneris",
      habitat: "Damp limestone rocks and cave mouths; rare in Britain, common Mediterranean.",
    },
    {
      year: "circa 1876",
      common: "Wood Anemone",
      latin: "Anemone nemorosa",
      habitat: "Ancient woodland floors; indicator of long-established deciduous forest.",
    },
    {
      year: "circa 1884",
      common: "Wild Garlic",
      latin: "Allium ursinum",
      habitat: "Damp deciduous woodland and shaded riverbanks; widespread across Europe.",
    },
  ]

  const palette = [
    { name: "Forest Green", hex: "#2d4a2d", latin: "Viridis Silvae", desc: "The ground tone of ancient deciduous woodland" },
    { name: "Parchment", hex: "#faf5ef", latin: "Charta Pergamena", desc: "Acid-free herbarium sheet, aged to warm ivory" },
    { name: "Gold", hex: "#8b6914", latin: "Aurum Antiquum", desc: "Oxidised copper-plate ink, characteristic of Victorian print" },
    { name: "Dry Rose", hex: "#6b3a3a", latin: "Rosa Exsiccata", desc: "Pressed damask petal, dried under weighted glass" },
    { name: "Fern", hex: "#3d5c3d", latin: "Pteridium Viride", desc: "Secondary foliage tone of the understory canopy" },
  ]

  const illustrations = [
    { latin: "Rosa Damascena", english: "Damask Rose", date: "1872", svg: <RosaDamascena /> },
    { latin: "Ficus Lyrata", english: "Fiddle-Leaf Fig", date: "1868", svg: <FicusLyrata /> },
    { latin: "Pteridium Aquilinum", english: "Bracken Fern", date: "1875", svg: <Pteridium /> },
    { latin: "Quercus Robur", english: "English Oak", date: "1864", svg: <QuercusRobur /> },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf5ef", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* NAV */}
      <nav
        className="sticky top-0 z-50 border-b border-[#2d4a2d]/15"
        style={{ backgroundColor: "#faf5ef" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif tracking-wide text-lg text-[#2d4a2d]">
            Victorian Botanical
          </span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#components" className="font-serif text-sm text-[#2d4a2d]/70 hover:text-[#8b6914] transition-colors duration-300">
              Components
            </a>
            <a href="#palette" className="font-serif text-sm text-[#2d4a2d]/70 hover:text-[#8b6914] transition-colors duration-300">
              Palette
            </a>
            <a href="#gallery" className="font-serif text-sm text-[#2d4a2d]/70 hover:text-[#8b6914] transition-colors duration-300">
              Gallery
            </a>
            <a href="#typography" className="font-serif text-sm text-[#2d4a2d]/70 hover:text-[#8b6914] transition-colors duration-300">
              Typography
            </a>
            <a href="#herbarium" className="font-serif text-sm text-[#2d4a2d]/70 hover:text-[#8b6914] transition-colors duration-300">
              Herbarium
            </a>
            <a
              href="https://stylekit.dev"
              className="font-serif text-sm text-[#8b6914] hover:text-[#2d4a2d] transition-colors duration-300"
            >
              StyleKit &rarr;
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-32 px-6" style={{ backgroundColor: "#faf5ef" }}>
        <div
          ref={heroRef}
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
          }}
        >
          <GoldLine className="w-48 mb-8" />
          <p className="font-serif italic text-[#8b6914] text-sm tracking-[0.3em] uppercase mb-6">
            Natural History Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-[#2d4a2d] leading-tight mb-4">
            Victorian Botanical
          </h1>
          <p className="font-serif italic text-[#8b6914]/70 text-xl mb-6">
            Flora Victoriensis Illustrata
          </p>
          <p className="font-serif text-[#2d4a2d]/60 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            A design system rooted in the great tradition of 19th century natural history illustration —
            copper-plate precision, herbarium typography, and the quiet authority of the specimen label.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
            <button className="px-8 py-3 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/60 rounded-lg font-serif tracking-wide hover:bg-[#3d5c3d] hover:border-[#8b6914] hover:shadow-[0_4px_12px_rgba(139,105,20,0.2)] transition-all duration-300">
              View Collection
            </button>
            <button className="px-8 py-3 bg-transparent text-[#2d4a2d] border border-[#2d4a2d]/30 rounded-lg font-serif tracking-wide hover:border-[#8b6914]/60 hover:text-[#8b6914] transition-all duration-300">
              Read Prospectus
            </button>
          </div>
          {/* SVG Hero Botanical Decoration */}
          <div className="flex items-center justify-center gap-12 opacity-30">
            <svg viewBox="0 0 60 80" className="w-16 h-20" fill="none">
              <line x1="30" y1="10" x2="30" y2="70" stroke="#2d4a2d" strokeWidth="1" />
              <path d="M30 25 Q20 22 14 16" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 25 Q40 22 46 16" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 38 Q18 34 10 26" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 38 Q42 34 50 26" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 50 Q20 48 14 42" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 50 Q40 48 46 42" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <ellipse cx="30" cy="12" rx="4" ry="6" stroke="#8b6914" strokeWidth="0.7" fill="none" />
            </svg>
            <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
              <circle cx="40" cy="40" r="28" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
              <circle cx="40" cy="40" r="20" stroke="#8b6914" strokeWidth="0.6" fill="none" strokeDasharray="2 3" />
              <circle cx="40" cy="40" r="12" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
              <line x1="12" y1="40" x2="68" y2="40" stroke="#2d4a2d" strokeWidth="0.5" />
              <line x1="40" y1="12" x2="40" y2="68" stroke="#2d4a2d" strokeWidth="0.5" />
              <line x1="20" y1="20" x2="60" y2="60" stroke="#2d4a2d" strokeWidth="0.4" />
              <line x1="60" y1="20" x2="20" y2="60" stroke="#2d4a2d" strokeWidth="0.4" />
            </svg>
            <svg viewBox="0 0 60 80" className="w-16 h-20" fill="none">
              <line x1="30" y1="10" x2="30" y2="70" stroke="#2d4a2d" strokeWidth="1" />
              <path d="M30 25 Q20 22 14 16" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 25 Q40 22 46 16" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 38 Q18 34 10 26" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 38 Q42 34 50 26" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 50 Q20 48 14 42" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <path d="M30 50 Q40 48 46 42" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
              <ellipse cx="30" cy="12" rx="4" ry="6" stroke="#8b6914" strokeWidth="0.7" fill="none" />
            </svg>
          </div>
        </div>
      </section>

      {/* COMPONENTS DEMO */}
      <section id="components" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <GoldLine className="w-32 mb-6" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.25em] uppercase mb-3">
              Materia Designii
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Component Specimens</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-8">
              Catalogued interface elements in the Victorian naturalist tradition.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="flex gap-0 mb-8 border border-[#2d4a2d]/20 rounded-lg overflow-hidden w-fit">
              {(["Specimens", "Panels", "Labels"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 font-serif text-sm tracking-wide transition-colors duration-300 ${
                    activeTab === tab
                      ? "bg-[#2d4a2d] text-[#faf5ef]"
                      : "bg-transparent text-[#2d4a2d]/70 hover:text-[#8b6914] hover:bg-[#2d4a2d]/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="border border-[#2d4a2d]/15 rounded-lg p-8" style={{ backgroundColor: "#faf5ef" }}>
              {activeTab === "Specimens" && (
                <div>
                  <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                    Buttons &amp; Controls
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <button className="px-6 py-2.5 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/60 rounded-lg font-serif tracking-wide hover:bg-[#3d5c3d] hover:border-[#8b6914] hover:shadow-[0_4px_12px_rgba(139,105,20,0.2)] transition-all duration-300">
                      Primary Specimen
                    </button>
                    <button className="px-6 py-2.5 bg-transparent text-[#2d4a2d] border border-[#2d4a2d]/30 rounded-lg font-serif tracking-wide hover:border-[#8b6914]/60 hover:text-[#8b6914] transition-all duration-300">
                      Secondary Outline
                    </button>
                    <button className="px-6 py-2.5 bg-[#3d5c3d] text-[#faf5ef] border border-[#3d5c3d] rounded-lg font-serif tracking-wide hover:bg-[#2d4a2d] transition-all duration-300">
                      Fern Accent
                    </button>
                    <button className="px-6 py-2.5 bg-transparent text-[#8b6914] border border-[#8b6914]/40 rounded-lg font-serif tracking-wide hover:bg-[#8b6914]/10 hover:border-[#8b6914]/70 transition-all duration-300">
                      Gold Variant
                    </button>
                    <button
                      disabled
                      className="px-6 py-2.5 bg-[#2d4a2d]/20 text-[#2d4a2d]/40 border border-[#2d4a2d]/10 rounded-lg font-serif tracking-wide cursor-not-allowed"
                    >
                      Unavailable
                    </button>
                  </div>
                  <OrnamentalDivider />
                  <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-4">
                    Size Variations
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button className="px-3 py-1.5 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/60 rounded font-serif text-xs tracking-wide hover:bg-[#3d5c3d] transition-all duration-300">
                      Small
                    </button>
                    <button className="px-5 py-2 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/60 rounded-lg font-serif text-sm tracking-wide hover:bg-[#3d5c3d] transition-all duration-300">
                      Medium
                    </button>
                    <button className="px-8 py-3 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/60 rounded-lg font-serif text-base tracking-wide hover:bg-[#3d5c3d] transition-all duration-300">
                      Large
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "Panels" && (
                <div>
                  <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                    Cards &amp; Panels
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-[#2d4a2d]/20 rounded-lg p-6" style={{ backgroundColor: "#faf5ef" }}>
                      <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.15em] uppercase mb-1">
                        Specimen No. 142
                      </p>
                      <h3 className="font-serif text-xl text-[#2d4a2d] mb-1">Standard Panel</h3>
                      <p className="font-serif italic text-[#8b6914]/80 text-sm mb-3">
                        Panellus stipticus
                      </p>
                      <div className="h-px bg-gradient-to-r from-transparent via-[#8b6914]/40 to-transparent mb-3" />
                      <p className="font-serif text-sm text-[#2d4a2d]/60 leading-relaxed">
                        A standard content panel with herbarium styling. Note the gold divider line
                        and specimen label formatting above the heading.
                      </p>
                    </div>
                    <div
                      className="border border-[#8b6914]/30 rounded-lg p-6 shadow-[0_4px_12px_rgba(139,105,20,0.1)]"
                      style={{ backgroundColor: "#faf5ef" }}
                    >
                      <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.15em] uppercase mb-1">
                        Featured Collection
                      </p>
                      <h3 className="font-serif text-xl text-[#2d4a2d] mb-1">Elevated Panel</h3>
                      <p className="font-serif italic text-[#8b6914]/80 text-sm mb-3">
                        Collectio Selecta
                      </p>
                      <div className="h-px bg-gradient-to-r from-transparent via-[#8b6914]/40 to-transparent mb-3" />
                      <p className="font-serif text-sm text-[#2d4a2d]/60 leading-relaxed">
                        An elevated panel with gold border accent and warm shadow. Used for featured
                        or highlighted content requiring greater visual prominence.
                      </p>
                    </div>
                    <div className="border border-[#6b3a3a]/20 rounded-lg p-6 md:col-span-2" style={{ backgroundColor: "#faf5ef" }}>
                      <p className="font-serif italic text-[#6b3a3a] text-xs tracking-[0.15em] uppercase mb-1">
                        Conservation Notice
                      </p>
                      <h3 className="font-serif text-xl text-[#6b3a3a] mb-1">Rose Alert Panel</h3>
                      <p className="font-serif italic text-[#6b3a3a]/70 text-sm mb-3">
                        Notitia Conservationis
                      </p>
                      <div className="h-px bg-gradient-to-r from-transparent via-[#6b3a3a]/30 to-transparent mb-3" />
                      <p className="font-serif text-sm text-[#2d4a2d]/60 leading-relaxed">
                        Alert or warning state panel using the dry rose accent colour. Maintains
                        the herbarium aesthetic while conveying cautionary status information.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Labels" && (
                <div>
                  <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                    Form Fields &amp; Labels
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-serif italic text-[#8b6914] text-sm mb-1.5">
                        Specimen Identifier
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rosa canina L."
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded-lg font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-300"
                        style={{ backgroundColor: "#faf5ef" }}
                      />
                      <p className="font-serif text-xs text-[#2d4a2d]/40 mt-1.5 italic">
                        Use binomial nomenclature with authority citation
                      </p>
                    </div>
                    <div>
                      <label className="block font-serif italic text-[#8b6914] text-sm mb-1.5">
                        Collection Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. June, 1872"
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded-lg font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-300"
                        style={{ backgroundColor: "#faf5ef" }}
                      />
                      <p className="font-serif text-xs text-[#2d4a2d]/40 mt-1.5 italic">
                        Month and year of field collection
                      </p>
                    </div>
                    <div>
                      <label className="block font-serif italic text-[#8b6914] text-sm mb-1.5">
                        Habitat &amp; Locality
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Chalk downland, Surrey"
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded-lg font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-300"
                        style={{ backgroundColor: "#faf5ef" }}
                      />
                    </div>
                    <div>
                      <label className="block font-serif italic text-[#8b6914] text-sm mb-1.5">
                        Collector
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. J. E. Smith, F.R.S."
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded-lg font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-300"
                        style={{ backgroundColor: "#faf5ef" }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-serif italic text-[#8b6914] text-sm mb-1.5">
                        Field Notes
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detailed botanical description and habitat observations..."
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded-lg font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-300 resize-none"
                        style={{ backgroundColor: "#faf5ef" }}
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-4">
                      <button className="px-6 py-2.5 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/60 rounded-lg font-serif tracking-wide hover:bg-[#3d5c3d] hover:border-[#8b6914] hover:shadow-[0_4px_12px_rgba(139,105,20,0.2)] transition-all duration-300">
                        Register Specimen
                      </button>
                      <button className="px-6 py-2.5 bg-transparent text-[#2d4a2d]/70 border border-[#2d4a2d]/20 rounded-lg font-serif tracking-wide hover:border-[#8b6914]/40 hover:text-[#8b6914] transition-all duration-300">
                        Clear Fields
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* COLOR PALETTE */}
      <section id="palette" className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <GoldLine className="w-32 mb-6" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.25em] uppercase mb-3">
              Chroma Victoriensis
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Colour Palette</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Five botanical tones extracted from the natural history specimen record.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-5 gap-4">
            {palette.map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.08}>
                <div className="flex flex-col border border-[#2d4a2d]/15 rounded-lg overflow-hidden hover:border-[#8b6914]/30 hover:shadow-[0_4px_12px_rgba(139,105,20,0.1)] transition-all duration-300">
                  <div
                    className="h-32"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div className="p-4" style={{ backgroundColor: "#faf5ef" }}>
                    <p className="font-serif text-[#2d4a2d] text-sm font-medium mb-0.5">
                      {swatch.name}
                    </p>
                    <p className="font-serif italic text-[#8b6914] text-xs mb-2">
                      {swatch.latin}
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#8b6914]/30 to-transparent mb-2" />
                    <p className="font-serif text-[#2d4a2d]/50 text-xs leading-relaxed mb-2">
                      {swatch.desc}
                    </p>
                    <code className="font-mono text-[#8b6914]/80 text-xs">{swatch.hex}</code>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* BOTANICAL ILLUSTRATION GALLERY */}
      <section id="gallery" className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <GoldLine className="w-32 mb-6" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.25em] uppercase mb-3">
              Tabulae Botanicae
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Illustration Gallery</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Copper-plate line drawings in the tradition of Curtis&apos;s Botanical Magazine.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {illustrations.map((item, i) => (
              <RevealBlock key={item.latin} delay={i * 0.1}>
                <div className="border border-[#2d4a2d]/15 rounded-lg overflow-hidden bg-[#faf5ef] hover:border-[#8b6914]/30 hover:shadow-[0_4px_16px_rgba(139,105,20,0.12)] transition-all duration-300">
                  <div
                    className="p-6 flex items-center justify-center"
                    style={{ height: "180px", backgroundColor: "#faf5ef" }}
                  >
                    <div className="w-32 h-32">
                      {item.svg}
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#8b6914]/40 to-transparent mb-3" />
                    <p className="font-serif italic text-[#2d4a2d] text-base mb-0.5">
                      {item.latin}
                    </p>
                    <p className="font-serif text-[#2d4a2d]/60 text-sm mb-1">
                      {item.english}
                    </p>
                    <p className="font-serif italic text-[#8b6914]/70 text-xs tracking-wide">
                      Plate {i + 1} &mdash; {item.date}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* TYPOGRAPHY SPECIMEN */}
      <section id="typography" className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <GoldLine className="w-32 mb-6" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.25em] uppercase mb-3">
              Typographia
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Typography Specimen</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              The typographic system of Victorian natural history — from chapter heading to caption footnote.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="border border-[#2d4a2d]/15 rounded-lg p-10" style={{ backgroundColor: "#faf5ef" }}>
              <div className="mb-6">
                <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.2em] uppercase mb-3">
                  &mdash; Chapter Heading
                </p>
                <p className="font-serif text-3xl text-[#2d4a2d] tracking-wide">
                  A Natural History of the British Isles
                </p>
              </div>
              <OrnamentalDivider />

              <div className="mb-6">
                <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.2em] uppercase mb-3">
                  &mdash; Latin Nomenclature
                </p>
                <p className="font-serif italic text-[#8b6914] text-2xl">
                  Quercus robur Linnaei, 1753
                </p>
              </div>
              <OrnamentalDivider />

              <div className="mb-6">
                <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.2em] uppercase mb-3">
                  &mdash; Section Subheading
                </p>
                <p className="font-serif text-xl text-[#2d4a2d] tracking-wide">
                  Distribution and Habitat Notes
                </p>
              </div>
              <OrnamentalDivider />

              <div className="mb-6">
                <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.2em] uppercase mb-3">
                  &mdash; Body Text
                </p>
                <p className="font-serif text-[#2d4a2d]/70 leading-relaxed">
                  The English Oak is widely distributed throughout the temperate woodlands of Europe and
                  western Asia. It is a deciduous tree of great longevity, specimens of over a thousand
                  years being not uncommon in ancient parkland and former common woodland. The bark becomes
                  deeply furrowed with age, and the galls produced by parasitic wasps were long employed
                  in the preparation of iron gall ink for manuscript production.
                </p>
              </div>
              <OrnamentalDivider />

              <div className="mb-6">
                <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.2em] uppercase mb-3">
                  &mdash; Attributed Quotation
                </p>
                <blockquote className="font-serif italic text-[#2d4a2d]/80 text-lg border-l-2 border-[#8b6914]/40 pl-6 leading-relaxed">
                  &ldquo;The oak is perhaps the most complete of all trees, combining in itself
                  a greater variety of beauty than any other.&rdquo;
                </blockquote>
                <p className="font-serif text-[#8b6914]/60 text-sm mt-2 pl-6">
                  &mdash; John Evelyn, <em>Sylva</em>, 1664
                </p>
              </div>
              <OrnamentalDivider />

              <div>
                <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.2em] uppercase mb-3">
                  &mdash; Plate Caption
                </p>
                <p className="font-serif text-xs text-[#8b6914]/70 tracking-[0.2em] uppercase">
                  Fig. IV &mdash; Quercus robur: leaf, acorn and cupule. Drawn from life, Kew Gardens, June 1872.
                  Engraved by W. H. Fitch for the Botanical Magazine, Plate 4216.
                </p>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="mt-8 border border-[#2d4a2d]/15 rounded-lg p-8" style={{ backgroundColor: "#faf5ef" }}>
              <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                Type Scale &amp; Weights
              </p>
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-xs text-[#8b6914]/50 w-16 shrink-0">7xl</span>
                  <span className="font-serif text-5xl text-[#2d4a2d]">Aa</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-xs text-[#8b6914]/50 w-16 shrink-0">4xl</span>
                  <span className="font-serif text-4xl text-[#2d4a2d]">Botanical</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-xs text-[#8b6914]/50 w-16 shrink-0">2xl</span>
                  <span className="font-serif text-2xl text-[#2d4a2d]">Natural History</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-xs text-[#8b6914]/50 w-16 shrink-0">xl</span>
                  <span className="font-serif text-xl italic text-[#8b6914]">Quercus robur Linnaei</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-xs text-[#8b6914]/50 w-16 shrink-0">base</span>
                  <span className="font-serif text-base text-[#2d4a2d]/70">Body copy in the Garalde tradition</span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-xs text-[#8b6914]/50 w-16 shrink-0">xs</span>
                  <span className="font-serif text-xs text-[#8b6914]/70 tracking-[0.2em] uppercase">Plate caption and footnote reference</span>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* HERBARIUM CARDS */}
      <section id="herbarium" className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <GoldLine className="w-32 mb-6" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.25em] uppercase mb-3">
              Herbarium Collectio
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Specimen Collection</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Six specimens from the collection, catalogued with full provenance and habitat records.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {herbarium.map((specimen, i) => (
              <RevealBlock key={specimen.latin} delay={i * 0.07}>
                <div className="border border-[#2d4a2d]/15 rounded-lg p-6 hover:border-[#8b6914]/40 hover:shadow-[0_4px_12px_rgba(139,105,20,0.12)] transition-all duration-300 h-full" style={{ backgroundColor: "#faf5ef" }}>
                  <p className="font-serif italic text-[#8b6914] text-xs mb-3">
                    {specimen.year}
                  </p>
                  <h3 className="font-serif text-xl text-[#2d4a2d] mb-1">
                    {specimen.common}
                  </h3>
                  <p className="font-serif italic text-[#8b6914]/80 text-sm mb-3">
                    {specimen.latin}
                  </p>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#8b6914]/30 to-transparent mb-3" />
                  <p className="font-serif text-sm text-[#2d4a2d]/60 leading-relaxed">
                    {specimen.habitat}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div
                      className="w-2 h-2 border border-[#8b6914]/40"
                      style={{ backgroundColor: "#8b6914", opacity: 0.3 }}
                    />
                    <span className="font-serif text-xs text-[#8b6914]/50 tracking-[0.15em] uppercase italic">
                      Verified Specimen
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* DO / DON'T */}
      <section className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <GoldLine className="w-32 mb-6" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.25em] uppercase mb-3">
              Notae Curatoris
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Curator&apos;s Notes</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Conservation standards and proper provenance requirements for this design system.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            <RevealBlock delay={0.1}>
              <div className="border border-[#2d4a2d]/20 rounded-lg overflow-hidden">
                <div className="bg-[#2d4a2d] px-6 py-3">
                  <p className="font-serif text-[#faf5ef] tracking-wide text-sm">
                    Proper Provenance
                  </p>
                  <p className="font-serif italic text-[#faf5ef]/60 text-xs">
                    Recommended Practice
                  </p>
                </div>
                <div className="p-6" style={{ backgroundColor: "#faf5ef" }}>
                  <ul className="space-y-4">
                    {[
                      { title: "Use serif throughout", body: "All typography must employ a genuine serif typeface — the Garalde or Transitional classification. Sans-serif faces violate the historical character of the system." },
                      { title: "Italicise all Latin names", body: "Binomial nomenclature must always appear in italic. This is the internationally agreed standard from Carl Linnaeus forward." },
                      { title: "Apply gold accents sparingly", body: "The gold (#8b6914) should function as a true accent — dividers, hover states, borders — not as a primary fill colour for large surfaces." },
                      { title: "Warm all shadows with gold", body: "Use rgba(139,105,20,*) for box-shadows to maintain palette coherence. Cold grey shadows are anachronistic." },
                      { title: "Respect parchment backgrounds", body: "The parchment tone (#faf5ef) is the canonical page colour. Pure white backgrounds read as modern and break the period authenticity." },
                      { title: "Keep transitions slow and stately", body: "Duration 300ms is appropriate for hover states. Victorian design implies calm authority, not reactive speed." },
                    ].map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <span className="text-[#2d4a2d] font-serif mt-0.5 shrink-0">+</span>
                        <div>
                          <p className="font-serif text-[#2d4a2d] text-sm font-medium mb-0.5">{item.title}</p>
                          <p className="font-serif text-[#2d4a2d]/60 text-sm leading-relaxed">{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="border border-[#6b3a3a]/20 rounded-lg overflow-hidden">
                <div className="bg-[#6b3a3a] px-6 py-3">
                  <p className="font-serif text-[#faf5ef] tracking-wide text-sm">
                    Conservation Violations
                  </p>
                  <p className="font-serif italic text-[#faf5ef]/60 text-xs">
                    To Be Strictly Avoided
                  </p>
                </div>
                <div className="p-6" style={{ backgroundColor: "#faf5ef" }}>
                  <ul className="space-y-4">
                    {[
                      { title: "Never use dark backgrounds", body: "Dark-mode inversions destroy the parchment herbarium aesthetic. The Victorian naturalist worked in daylight on white paper." },
                      { title: "Never use rounded-full corners", body: "Pill-shaped corners are a product of digital UI conventions. Victorian printing employed right angles or minimal corner rounding at most." },
                      { title: "Never use neon or saturated colour", body: "The palette derives from natural and oxidised pigments. Synthetic bright colours are historically implausible and visually jarring." },
                      { title: "Never omit Latin names", body: "Every specimen card should carry a Latin binomial. To omit it is to reduce natural history to mere common parlance." },
                      { title: "Never use sans-serif headings", body: "Sans-serif typefaces did not gain cultural acceptance until the early 20th century. Their use here is a typographic anachronism." },
                      { title: "Never animate with bouncing or elastics", body: "Motion should be composed and dignified. Elastic spring animations are incompatible with the measured pace of Victorian scholarship." },
                    ].map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <span className="text-[#6b3a3a] font-serif mt-0.5 shrink-0">&times;</span>
                        <div>
                          <p className="font-serif text-[#2d4a2d] text-sm font-medium mb-0.5">{item.title}</p>
                          <p className="font-serif text-[#2d4a2d]/60 text-sm leading-relaxed">{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* DESIGN PRINCIPLES */}
      <section className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <GoldLine className="w-32 mb-6" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.25em] uppercase mb-3">
              Principia Designii
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Design Principles</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Four guiding tenets drawn from the natural history tradition.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                number: "I",
                latin: "Fidelitas Naturae",
                title: "Fidelity to Nature",
                body: "Every design decision must be traceable to the natural world. Colour comes from botanical pigment; form derives from organic structure; spacing reflects the proportions of the printed plate.",
              },
              {
                number: "II",
                latin: "Gravitas Typographica",
                title: "Typographic Gravity",
                body: "The typeface carries the authority of the naturalist's label. Hierarchy is established through scale and italic variation, not through weight extremes or decorative distortion.",
              },
              {
                number: "III",
                latin: "Parsimonia Ornamenti",
                title: "Economy of Ornament",
                body: "The gold line and the copper-plate engraving achieve beauty through restraint. Ornament that does not serve the communication of content is ornament that should be removed.",
              },
              {
                number: "IV",
                latin: "Permanentia Documenti",
                title: "Documentary Permanence",
                body: "A herbarium sheet survives for three centuries. Design for this system should aspire to the same archival quality — classical, durable, and free of temporal fashion.",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.number} delay={i * 0.08}>
                <div className="border border-[#2d4a2d]/15 rounded-lg p-6 hover:border-[#8b6914]/30 hover:shadow-[0_4px_12px_rgba(139,105,20,0.1)] transition-all duration-300" style={{ backgroundColor: "#faf5ef" }}>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <span className="font-serif text-3xl text-[#8b6914]/30 leading-none">
                        {principle.number}
                      </span>
                    </div>
                    <div>
                      <p className="font-serif italic text-[#8b6914] text-sm mb-0.5">
                        {principle.latin}
                      </p>
                      <h3 className="font-serif text-lg text-[#2d4a2d] mb-2">{principle.title}</h3>
                      <div className="h-px bg-gradient-to-r from-[#8b6914]/30 to-transparent mb-3" />
                      <p className="font-serif text-sm text-[#2d4a2d]/60 leading-relaxed">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* LABELS, TAGS & BADGES */}
      <section className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <GoldLine className="w-32 mb-6" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.25em] uppercase mb-3">
              Signacula et Insignia
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Labels, Tags &amp; Badges</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Classification and status indicators in the herbarium style.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="border border-[#2d4a2d]/15 rounded-lg p-8" style={{ backgroundColor: "#faf5ef" }}>
              <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                Classification Tags
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-3 py-1 border border-[#2d4a2d]/25 rounded font-serif text-xs text-[#2d4a2d] tracking-wide">
                  Pteridophyta
                </span>
                <span className="px-3 py-1 border border-[#8b6914]/40 rounded font-serif text-xs text-[#8b6914] tracking-wide">
                  Angiosperms
                </span>
                <span className="px-3 py-1 border border-[#2d4a2d]/20 rounded font-serif text-xs text-[#2d4a2d] tracking-wide" style={{ backgroundColor: "rgba(45,74,45,0.05)" }}>
                  Gymnosperms
                </span>
                <span className="px-3 py-1 border border-[#6b3a3a]/25 rounded font-serif italic text-xs text-[#6b3a3a] tracking-wide">
                  Rare Specimen
                </span>
                <span className="px-3 py-1 border border-[#3d5c3d]/30 rounded font-serif text-xs text-[#3d5c3d] tracking-wide" style={{ backgroundColor: "rgba(61,92,61,0.07)" }}>
                  Common Species
                </span>
              </div>

              <OrnamentalDivider />

              <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                Status Badges
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#2d4a2d]/20 rounded font-serif text-xs text-[#2d4a2d]">
                  <span className="w-1.5 h-1.5 bg-[#3d5c3d] inline-block" />
                  Verified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#8b6914]/30 rounded font-serif text-xs text-[#8b6914]">
                  <span className="w-1.5 h-1.5 bg-[#8b6914] inline-block" />
                  Pending Review
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#6b3a3a]/25 rounded font-serif text-xs text-[#6b3a3a]">
                  <span className="w-1.5 h-1.5 bg-[#6b3a3a] inline-block" />
                  Conservation Risk
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#2d4a2d]/15 rounded font-serif text-xs text-[#2d4a2d]/40">
                  <span className="w-1.5 h-1.5 bg-[#2d4a2d]/30 inline-block" />
                  Unclassified
                </span>
              </div>

              <OrnamentalDivider />

              <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                Specimen Number Labels
              </p>
              <div className="flex flex-wrap gap-4">
                {["No. 001", "No. 142", "No. 287", "No. 514"].map((num) => (
                  <div key={num} className="border border-[#2d4a2d]/20 rounded px-4 py-2 text-center" style={{ minWidth: "80px" }}>
                    <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.15em] uppercase mb-0.5">
                      Specimen
                    </p>
                    <p className="font-serif italic text-[#2d4a2d] text-sm">{num}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2d4a2d]/15 py-16 px-6" style={{ backgroundColor: "#faf5ef" }}>
        <div className="max-w-4xl mx-auto text-center">
          <GoldLine className="w-40 mb-8" />
          <p className="font-serif text-sm text-[#8b6914]/70 tracking-wide mb-2">
            Natural History of Digital Design | Est. MMXXVI
          </p>
          <p className="font-serif italic text-[#2d4a2d]/40 text-xs mb-6">
            Printed by authority of the Victorian Botanical Society, London
          </p>
          <OrnamentalDivider />
          <p className="font-serif text-xs text-[#2d4a2d]/30 tracking-[0.15em]">
            StyleKit &mdash; Victorian Botanical Theme &mdash; All specimens catalogued and verified
          </p>
        </div>
      </footer>
    </div>
  )
}
