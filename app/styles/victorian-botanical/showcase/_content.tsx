"use client"
import { useState, useRef, useEffect } from "react"

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function RosaDamascenaSvg() {
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
  );
}

function FernVictorianaSvg() {
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
  );
}

function CamelliaJaponicaSvg() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <ellipse cx="60" cy="40" rx="14" ry="22" stroke="#2d4a2d" strokeWidth="0.9" fill="none" />
      <ellipse cx="60" cy="40" rx="14" ry="22" stroke="#2d4a2d" strokeWidth="0.9" fill="none" transform="rotate(72 60 60)" />
      <ellipse cx="60" cy="40" rx="14" ry="22" stroke="#2d4a2d" strokeWidth="0.9" fill="none" transform="rotate(144 60 60)" />
      <ellipse cx="60" cy="40" rx="14" ry="22" stroke="#2d4a2d" strokeWidth="0.9" fill="none" transform="rotate(216 60 60)" />
      <ellipse cx="60" cy="40" rx="14" ry="22" stroke="#2d4a2d" strokeWidth="0.9" fill="none" transform="rotate(288 60 60)" />
      <circle cx="60" cy="60" r="8" stroke="#8b6914" strokeWidth="0.8" fill="none" />
      <circle cx="60" cy="60" r="4" stroke="#8b6914" strokeWidth="0.7" fill="none" />
      <line x1="56" y1="60" x2="64" y2="60" stroke="#8b6914" strokeWidth="0.5" />
      <line x1="60" y1="56" x2="60" y2="64" stroke="#8b6914" strokeWidth="0.5" />
      <line x1="60" y1="88" x2="60" y2="108" stroke="#2d4a2d" strokeWidth="1" />
      <path d="M60 98 Q50 94 46 88" stroke="#3d5c3d" strokeWidth="0.8" fill="none" />
      <path d="M60 94 Q70 90 74 84" stroke="#3d5c3d" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function IrisGermanicaSvg() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <path d="M60 20 C55 28 48 34 42 38 C36 42 34 50 38 56 C42 62 50 62 60 60" stroke="#2d4a2d" strokeWidth="0.9" fill="none" />
      <path d="M60 20 C65 28 72 34 78 38 C84 42 86 50 82 56 C78 62 70 62 60 60" stroke="#2d4a2d" strokeWidth="0.9" fill="none" />
      <path d="M60 60 C55 54 44 52 40 46 C36 40 38 32 44 28 C50 24 56 26 60 32" stroke="#8b6914" strokeWidth="0.7" fill="none" />
      <path d="M60 60 C65 54 76 52 80 46 C84 40 82 32 76 28 C70 24 64 26 60 32" stroke="#8b6914" strokeWidth="0.7" fill="none" />
      <path d="M60 32 Q60 46 60 60" stroke="#2d4a2d" strokeWidth="0.6" fill="none" />
      <line x1="60" y1="60" x2="60" y2="108" stroke="#2d4a2d" strokeWidth="1" />
      <path d="M60 78 Q50 75 46 70" stroke="#3d5c3d" strokeWidth="0.7" fill="none" />
      <path d="M60 82 Q70 79 74 74" stroke="#3d5c3d" strokeWidth="0.7" fill="none" />
    </svg>
  );
}

function HelleborusNigerSvg() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <path d="M60 48 C56 38 46 30 42 22" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <path d="M60 48 C64 38 74 30 78 22" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <path d="M60 48 C52 42 40 42 32 40" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <path d="M60 48 C68 42 80 42 88 40" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <path d="M60 48 C60 36 60 24 60 16" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <ellipse cx="42" cy="20" rx="5" ry="8" stroke="#2d4a2d" strokeWidth="0.7" fill="none" transform="rotate(-20 42 20)" />
      <ellipse cx="78" cy="20" rx="5" ry="8" stroke="#2d4a2d" strokeWidth="0.7" fill="none" transform="rotate(20 78 20)" />
      <ellipse cx="30" cy="40" rx="5" ry="8" stroke="#2d4a2d" strokeWidth="0.7" fill="none" transform="rotate(-80 30 40)" />
      <ellipse cx="90" cy="40" rx="5" ry="8" stroke="#2d4a2d" strokeWidth="0.7" fill="none" transform="rotate(80 90 40)" />
      <ellipse cx="60" cy="14" rx="5" ry="8" stroke="#2d4a2d" strokeWidth="0.7" fill="none" />
      <circle cx="60" cy="48" r="7" stroke="#8b6914" strokeWidth="0.8" fill="none" />
      <circle cx="60" cy="48" r="3" stroke="#8b6914" strokeWidth="0.6" fill="none" />
      <line x1="60" y1="55" x2="60" y2="108" stroke="#2d4a2d" strokeWidth="1" />
      <path d="M60 80 Q48 76 44 68" stroke="#3d5c3d" strokeWidth="0.7" fill="none" />
      <path d="M60 86 Q72 82 76 74" stroke="#3d5c3d" strokeWidth="0.7" fill="none" />
    </svg>
  );
}

function MagnoliaGrandifloraSvg() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <path d="M60 22 C56 30 54 40 56 50" stroke="#2d4a2d" strokeWidth="0.9" fill="none" />
      <path d="M60 22 C64 30 66 40 64 50" stroke="#2d4a2d" strokeWidth="0.9" fill="none" />
      <path d="M60 22 C48 26 38 34 36 44 C34 54 40 62 52 64" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <path d="M60 22 C72 26 82 34 84 44 C86 54 80 62 68 64" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <path d="M60 22 C44 18 30 24 26 36 C22 48 30 60 46 66" stroke="#8b6914" strokeWidth="0.6" fill="none" />
      <path d="M60 22 C76 18 90 24 94 36 C98 48 90 60 74 66" stroke="#8b6914" strokeWidth="0.6" fill="none" />
      <circle cx="60" cy="58" r="10" stroke="#2d4a2d" strokeWidth="0.8" fill="none" />
      <circle cx="60" cy="58" r="5" stroke="#8b6914" strokeWidth="0.7" fill="none" />
      <line x1="60" y1="68" x2="60" y2="108" stroke="#2d4a2d" strokeWidth="1.1" />
      <path d="M60 84 Q50 80 46 72" stroke="#3d5c3d" strokeWidth="0.8" fill="none" />
      <path d="M60 90 Q70 86 74 78" stroke="#3d5c3d" strokeWidth="0.8" fill="none" />
      <path
        d="M44 60 C40 68 38 76 40 82 C48 78 56 72 60 68"
        stroke="#2d4a2d" strokeWidth="0.5" fill="none"
      />
      <path
        d="M76 60 C80 68 82 76 80 82 C72 78 64 72 60 68"
        stroke="#2d4a2d" strokeWidth="0.5" fill="none"
      />
    </svg>
  );
}

const SPECIMEN_PLATES = [
  {
    latin: "Rosa Damascena",
    family: "Rosaceae Family",
    plate: "I",
    plateNum: "Plate I.",
    desc: "A heritage rose cultivar prized for its deep fragrance. Documented in the royal botanical surveys of 1842.",
    svg: <RosaDamascenaSvg />,
  },
  {
    latin: "Fern Victoriana",
    family: "Polypodiaceae Family",
    plate: "II",
    plateNum: "Plate II.",
    desc: "A graceful Victorian fern specimen collected from the damp limestone ravines of Derbyshire, circa 1855.",
    svg: <FernVictorianaSvg />,
  },
  {
    latin: "Camellia Japonica",
    family: "Theaceae Family",
    plate: "III",
    plateNum: "Plate III.",
    desc: "Introduced to European gardens by the East India Company. Prized for its perfect, waxy blossoms.",
    svg: <CamelliaJaponicaSvg />,
  },
  {
    latin: "Iris Germanica",
    family: "Iridaceae Family",
    plate: "IV",
    plateNum: "Plate IV.",
    desc: "The bearded iris of formal Victorian gardens. Cultivated extensively since the medieval period.",
    svg: <IrisGermanicaSvg />,
  },
  {
    latin: "Helleborus Niger",
    family: "Ranunculaceae Family",
    plate: "V",
    plateNum: "Plate V.",
    desc: "The Christmas rose. A winter-blooming perennial of woodland margins, noted for its medicinal history.",
    svg: <HelleborusNigerSvg />,
  },
  {
    latin: "Magnolia Grandiflora",
    family: "Magnoliaceae Family",
    plate: "VI",
    plateNum: "Plate VI.",
    desc: "The great laurel magnolia. One of the most magnificent flowering trees of the Southern hemisphere.",
    svg: <MagnoliaGrandifloraSvg />,
  },
];

const COLOR_PALETTE = [
  {
    name: "Forest Green",
    hex: "#2d4a2d",
    latin: "Viridis Silvae",
    desc: "The ground tone of ancient deciduous woodland",
  },
  {
    name: "Parchment",
    hex: "#faf5ef",
    latin: "Charta Pergamena",
    desc: "Acid-free herbarium sheet, aged to warm ivory",
    dark: true,
  },
  {
    name: "Antique Gold",
    hex: "#8b6914",
    latin: "Aurum Antiquum",
    desc: "Oxidised copper-plate ink, characteristic of Victorian print",
  },
  {
    name: "Dry Rose",
    hex: "#6b3a3a",
    latin: "Rosa Exsiccata",
    desc: "Pressed damask petal, dried under weighted glass",
  },
  {
    name: "Fern Green",
    hex: "#3d5c3d",
    latin: "Pteridium Viride",
    desc: "Secondary foliage tone of the understory canopy",
  },
];

const DO_ITEMS = [
  {
    title: "Use serif throughout",
    body: "All typography must employ a genuine serif typeface. Sans-serif faces violate the historical character of the system.",
  },
  {
    title: "Italicise all Latin names",
    body: "Binomial nomenclature must always appear in italic. This is the internationally agreed standard from Carl Linnaeus forward.",
  },
  {
    title: "Apply gold accents sparingly",
    body: "Gold (#8b6914) should function as a true accent — dividers, hover states, borders — not as a primary fill colour.",
  },
  {
    title: "Warm all shadows with gold",
    body: "Use rgba(139,105,20,*) for box-shadows to maintain palette coherence. Cold grey shadows are anachronistic.",
  },
  {
    title: "Respect parchment backgrounds",
    body: "The parchment tone (#faf5ef) is the canonical page colour. Pure white backgrounds read as modern.",
  },
  {
    title: "Keep transitions slow and stately",
    body: "Duration 700ms is appropriate for hover states. Victorian design implies calm authority, not reactive speed.",
  },
];

const DONT_ITEMS = [
  {
    title: "Never use dark backgrounds",
    body: "Dark-mode inversions destroy the parchment herbarium aesthetic. The Victorian naturalist worked in daylight.",
  },
  {
    title: "Never use floating hover transforms",
    body: "Specimens do not float. All hover interaction stays 2D — only color, shadow, and scale changes are permitted.",
  },
  {
    title: "Never use neon or saturated colour",
    body: "The palette derives from natural and oxidised pigments. Synthetic bright colours are historically implausible.",
  },
  {
    title: "Never omit Latin names",
    body: "Every specimen card should carry a Latin binomial. To omit it is to reduce natural history to common parlance.",
  },
  {
    title: "Never use sans-serif headings",
    body: "Sans-serif typefaces did not gain cultural acceptance until the early 20th century. Avoid typographic anachronism.",
  },
  {
    title: "Never animate with bouncing or elastics",
    body: "Motion should be composed and dignified. Elastic spring animations are incompatible with Victorian scholarship.",
  },
];

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState<"Button" | "Card" | "Input">("Button");
  const [activeSpecimen, setActiveSpecimen] = useState<number | null>(null);
  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf5ef", fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <style>{`
        .vb-ornament-line {
          background: linear-gradient(90deg, transparent 0%, #8b6914 20%, #8b6914 80%, transparent 100%);
          opacity: 0.4;
          height: 1px;
        }
        .ornament-line {
          background: linear-gradient(90deg, transparent 0%, #8b6914 20%, #8b6914 80%, transparent 100%);
          opacity: 0.4;
          height: 1px;
        }
      `}</style>

      {/* FIXED NAV */}
      <nav
        className="sticky top-0 z-50 border-b border-[#2d4a2d]/20"
        style={{ backgroundColor: "#faf5ef" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif tracking-wider text-lg text-[#2d4a2d]">
            Victorian Botanical
          </span>
          <div className="hidden md:flex items-center gap-8">
            {["Specimens", "Components", "Palette", "Principles", "Rules"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-serif text-sm text-[#2d4a2d]/70 hover:text-[#8b6914] transition-colors duration-500"
                style={{ fontVariant: "small-caps" }}
              >
                {link}
              </a>
            ))}
            <a
              href="https://stylekit.dev"
              className="font-serif text-sm text-[#8b6914] hover:text-[#2d4a2d] transition-colors duration-500"
            >
              StyleKit &rarr;
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-36 px-6" style={{ backgroundColor: "#faf5ef" }}>
        <div
          ref={heroRef}
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0s",
          }}
        >
          <div className="w-48 mx-auto mb-8 vb-ornament-line" />

          <p className="font-serif italic text-[#8b6914] text-sm tracking-[0.3em] uppercase mb-6">
            Natural History Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-serif text-[#2d4a2d] leading-tight mb-4">
            Victorian Botanical
          </h1>

          <p className="font-serif italic text-[#8b6914]/70 text-xl md:text-2xl mb-8">
            Flora Victoriensis Illustrata
          </p>

          <p className="font-serif text-[#2d4a2d]/60 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            A design system rooted in the great tradition of 19th century natural history
            illustration — copper-plate precision, herbarium typography, and the quiet
            authority of the specimen label.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
            <button className="px-8 py-3 bg-[#faf5ef] text-[#2d4a2d] border border-[#2d4a2d]/30 rounded font-serif italic tracking-widest text-lg shadow-[0_2px_10px_rgba(45,74,45,0.05)] hover:bg-[#2d4a2d] hover:text-[#faf5ef] hover:border-[#8b6914] hover:shadow-[0_4px_15px_rgba(139,105,20,0.15)] active:bg-[#1a2d1a] transition-all duration-700 ease-in-out">
              Examine Specimen
            </button>
            <button className="px-8 py-3 bg-transparent text-[#2d4a2d]/70 border border-[#2d4a2d]/20 rounded font-serif tracking-wide text-base hover:border-[#8b6914]/50 hover:text-[#8b6914] transition-all duration-700">
              Read Prospectus
            </button>
          </div>

          {/* Decorative botanical motifs */}
          <div className="flex items-center justify-center gap-12 opacity-25">
            <svg viewBox="0 0 60 80" className="w-14 h-18" fill="none">
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
            <svg viewBox="0 0 60 80" className="w-14 h-18" fill="none">
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

      {/* SPECIMEN COLLECTION */}
      <section id="specimens" className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="w-32 mb-6 vb-ornament-line" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.3em] uppercase mb-3">
              Herbarium Collectio
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Specimen Collection</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Six specimens catalogued in the Victorian naturalist tradition, each with full
              provenance and taxonomic classification.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIMEN_PLATES.map((specimen, i) => (
              <RevealBlock key={specimen.latin} delay={i * 0.08}>
                <div
                  className="group p-8 bg-[#faf5ef] border border-[#2d4a2d]/20 rounded-lg shadow-[0_4px_20px_rgba(45,74,45,0.05)] hover:border-[#8b6914]/50 transition-colors duration-700 ease-in-out cursor-text"
                  onClick={() => setActiveSpecimen(activeSpecimen === i ? null : i)}
                >
                  {/* Illustration */}
                  <div className="w-24 h-24 mx-auto mb-6 group-hover:scale-105 transition-transform duration-700">
                    {specimen.svg}
                  </div>

                  {/* Header */}
                  <div className="border-b border-[#2d4a2d]/15 pb-4 mb-5 flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-serif text-[#2d4a2d] tracking-wider group-hover:text-[#8b6914] transition-colors duration-700">
                        {specimen.latin}
                      </h3>
                      <p className="text-sm font-serif text-[#8b6914]/80 italic mt-2">
                        {specimen.family}, {specimen.plateNum}
                      </p>
                    </div>
                    <span className="text-3xl font-serif text-[#2d4a2d]/10 group-hover:scale-110 group-hover:text-[#8b6914]/20 transition-all duration-700">
                      {specimen.plate}
                    </span>
                  </div>

                  <p className="text-[#2d4a2d]/70 font-serif leading-relaxed text-sm">
                    {specimen.desc}
                  </p>

                  {activeSpecimen === i && (
                    <div className="mt-4 pt-4 border-t border-[#8b6914]/20">
                      <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-2">
                        Expanded Record
                      </p>
                      <p className="font-serif text-xs text-[#2d4a2d]/50 leading-relaxed">
                        Specimen verified and accessioned to the Victorian Botanical Society
                        herbarium collection. Voucher held at the Royal Botanic Gardens, Kew.
                        Collector: J. D. Hooker, F.R.S.
                      </p>
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENT DEMO */}
      <section id="components" className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="w-32 mb-6 vb-ornament-line" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.3em] uppercase mb-3">
              Materia Designii
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Component Specimens</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-8">
              Catalogued interface elements in the Victorian naturalist tradition.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="flex gap-0 mb-8 border border-[#2d4a2d]/20 rounded-lg overflow-hidden w-fit">
              {(["Button", "Card", "Input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-7 py-2.5 font-serif text-sm tracking-wide transition-all duration-500 ${
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
            <div className="border border-[#2d4a2d]/15 rounded-lg p-10" style={{ backgroundColor: "#faf5ef" }}>

              {activeTab === "Button" && (
                <div className="space-y-10">
                  <div>
                    <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                      Primary Action — Examine Specimen
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-8 py-3 bg-[#faf5ef] text-[#2d4a2d] border border-[#2d4a2d]/30 rounded font-serif italic tracking-widest text-lg shadow-[0_2px_10px_rgba(45,74,45,0.05)] hover:bg-[#2d4a2d] hover:text-[#faf5ef] hover:border-[#8b6914] hover:shadow-[0_4px_15px_rgba(139,105,20,0.15)] active:bg-[#1a2d1a] transition-all duration-700 ease-in-out">
                        Examine Specimen
                      </button>
                      <button className="px-8 py-3 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/40 rounded font-serif tracking-wide hover:bg-[#3d5c3d] hover:border-[#8b6914] hover:shadow-[0_4px_12px_rgba(139,105,20,0.2)] active:bg-[#1a2d1a] transition-all duration-700">
                        Add to Collection
                      </button>
                    </div>
                  </div>

                  <div className="h-px vb-ornament-line" />

                  <div>
                    <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                      Accent Variants
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-6 py-2.5 bg-transparent text-[#8b6914] border border-[#8b6914]/40 rounded font-serif tracking-wide hover:bg-[#8b6914]/10 hover:border-[#8b6914] transition-all duration-700">
                        Gold Accent
                      </button>
                      <button className="px-6 py-2.5 bg-transparent text-[#6b3a3a] border border-[#6b3a3a]/30 rounded font-serif tracking-wide hover:bg-[#6b3a3a]/10 hover:border-[#6b3a3a] transition-all duration-700">
                        Rose Alert
                      </button>
                      <button className="px-6 py-2.5 bg-transparent text-[#3d5c3d] border border-[#3d5c3d]/30 rounded font-serif tracking-wide hover:bg-[#3d5c3d]/10 hover:border-[#3d5c3d] transition-all duration-700">
                        Fern Shade
                      </button>
                      <button
                        disabled
                        className="px-6 py-2.5 bg-[#2d4a2d]/10 text-[#2d4a2d]/30 border border-[#2d4a2d]/10 rounded font-serif tracking-wide cursor-not-allowed"
                      >
                        Unavailable
                      </button>
                    </div>
                  </div>

                  <div className="h-px vb-ornament-line" />

                  <div>
                    <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                      Size Gradation
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <button className="px-3 py-1.5 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/40 rounded font-serif text-xs tracking-wide hover:bg-[#3d5c3d] transition-all duration-700">
                        Small
                      </button>
                      <button className="px-5 py-2 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/40 rounded font-serif text-sm tracking-wide hover:bg-[#3d5c3d] transition-all duration-700">
                        Medium
                      </button>
                      <button className="px-8 py-3 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/40 rounded font-serif text-base tracking-wide hover:bg-[#3d5c3d] transition-all duration-700">
                        Large
                      </button>
                      <button className="px-10 py-3.5 bg-[#2d4a2d] text-[#faf5ef] border border-[#8b6914]/50 rounded font-serif text-lg tracking-wide hover:bg-[#3d5c3d] transition-all duration-700">
                        Grand
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Card" && (
                <div className="space-y-6">
                  <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                    Specimen Cards &amp; Panels
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Gold standard card */}
                    <div className="group p-8 bg-[#faf5ef] border border-[#2d4a2d]/20 rounded-lg shadow-[0_4px_20px_rgba(45,74,45,0.05)] hover:border-[#8b6914]/50 transition-colors duration-700 ease-in-out cursor-text">
                      <div className="border-b border-[#2d4a2d]/15 pb-4 mb-5 flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl font-serif text-[#2d4a2d] tracking-wider group-hover:text-[#8b6914] transition-colors duration-700">Rosa Damascena</h3>
                          <p className="text-sm font-serif text-[#8b6914]/80 italic mt-2">Rosaceae Family, Plate IV.</p>
                        </div>
                        <span className="text-3xl font-serif text-[#2d4a2d]/10 group-hover:scale-110 group-hover:text-[#8b6914]/20 transition-all duration-700">IV</span>
                      </div>
                      <p className="text-[#2d4a2d]/70 font-serif leading-relaxed text-sm">A heritage rose cultivar prized for its deep fragrance. Documented in the royal botanical surveys of 1842.</p>
                    </div>

                    {/* Alert card */}
                    <div className="group p-8 bg-[#faf5ef] border border-[#6b3a3a]/20 rounded-lg shadow-[0_4px_20px_rgba(107,58,58,0.05)] hover:border-[#6b3a3a]/50 transition-colors duration-700 ease-in-out cursor-text">
                      <div className="border-b border-[#6b3a3a]/15 pb-4 mb-5 flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl font-serif text-[#6b3a3a] tracking-wider">Conservation Notice</h3>
                          <p className="text-sm font-serif text-[#6b3a3a]/70 italic mt-2">Notitia Conservationis</p>
                        </div>
                        <span className="text-3xl font-serif text-[#6b3a3a]/10">!</span>
                      </div>
                      <p className="text-[#2d4a2d]/70 font-serif leading-relaxed text-sm">Alert or warning state panel using the dry rose accent colour. Maintains herbarium aesthetic while conveying cautionary status.</p>
                    </div>

                    {/* Featured/elevated card */}
                    <div className="group p-8 bg-[#faf5ef] border border-[#8b6914]/30 rounded-lg shadow-[0_4px_20px_rgba(139,105,20,0.1)] hover:border-[#8b6914]/70 transition-all duration-700 ease-in-out cursor-text md:col-span-2">
                      <div className="border-b border-[#8b6914]/20 pb-4 mb-5 flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl font-serif text-[#2d4a2d] tracking-wider group-hover:text-[#8b6914] transition-colors duration-700">Featured Collection — Collectio Selecta</h3>
                          <p className="text-sm font-serif text-[#8b6914]/80 italic mt-2">An elevated panel with gold border accent and warm shadow. Used for featured content requiring greater visual prominence.</p>
                        </div>
                        <span className="text-3xl font-serif text-[#8b6914]/15 group-hover:scale-110 group-hover:text-[#8b6914]/30 transition-all duration-700">*</span>
                      </div>
                      <p className="text-[#2d4a2d]/70 font-serif leading-relaxed text-sm">The warm gold border sets this apart from standard specimen cards. Reserved for highlighted items in the collection hierarchy, such as type specimens or featured acquisitions.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Input" && (
                <div>
                  <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                    Form Fields &amp; Herbarium Labels
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-serif italic text-[#8b6914] text-sm mb-1.5">
                        Specimen Identifier
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rosa canina L."
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-500"
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
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-500"
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
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-500"
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
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-500"
                        style={{ backgroundColor: "#faf5ef" }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-serif italic text-[#8b6914] text-sm mb-1.5">
                        Field Notes
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Detailed botanical description and habitat observations..."
                        className="w-full px-4 py-2.5 border border-[#2d4a2d]/20 rounded font-serif text-[#2d4a2d] placeholder-[#2d4a2d]/30 focus:outline-none focus:border-[#8b6914]/60 transition-colors duration-500 resize-none"
                        style={{ backgroundColor: "#faf5ef" }}
                      />
                    </div>
                    <div className="md:col-span-2 flex gap-4 flex-wrap">
                      <button className="px-8 py-3 bg-[#faf5ef] text-[#2d4a2d] border border-[#2d4a2d]/30 rounded font-serif italic tracking-widest text-base shadow-[0_2px_10px_rgba(45,74,45,0.05)] hover:bg-[#2d4a2d] hover:text-[#faf5ef] hover:border-[#8b6914] hover:shadow-[0_4px_15px_rgba(139,105,20,0.15)] active:bg-[#1a2d1a] transition-all duration-700 ease-in-out">
                        Register Specimen
                      </button>
                      <button className="px-6 py-2.5 bg-transparent text-[#2d4a2d]/60 border border-[#2d4a2d]/15 rounded font-serif tracking-wide hover:border-[#8b6914]/40 hover:text-[#8b6914] transition-all duration-700">
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
            <div className="w-32 mb-6 vb-ornament-line" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.3em] uppercase mb-3">
              Chroma Victoriensis
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Colour Palette</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Five botanical tones extracted from the natural history specimen record —
              each with its own Latin designation and period provenance.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-5 gap-4">
            {COLOR_PALETTE.map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.08}>
                <div className="group flex flex-col border border-[#2d4a2d]/15 rounded-lg overflow-hidden hover:border-[#8b6914]/40 hover:shadow-[0_4px_16px_rgba(139,105,20,0.12)] transition-all duration-700">
                  {/* Swatch block — botanical specimen tag style */}
                  <div
                    className="h-36 relative"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    {swatch.dark && (
                      <div className="absolute inset-0 border border-[#2d4a2d]/20" />
                    )}
                    <div className="absolute bottom-2 right-2">
                      <span className="font-mono text-xs opacity-40"
                        style={{ color: swatch.dark ? "#2d4a2d" : "#faf5ef" }}>
                        {swatch.hex}
                      </span>
                    </div>
                  </div>
                  <div className="p-4" style={{ backgroundColor: "#faf5ef" }}>
                    <p className="font-serif text-[#2d4a2d] text-sm font-medium mb-0.5">
                      {swatch.name}
                    </p>
                    <p className="font-serif italic text-[#8b6914] text-xs mb-2">
                      {swatch.latin}
                    </p>
                    <div className="h-px vb-ornament-line mb-2" />
                    <p className="font-serif text-[#2d4a2d]/50 text-xs leading-relaxed">
                      {swatch.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN PRINCIPLES */}
      <section id="principles" className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="w-32 mb-6 vb-ornament-line" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.3em] uppercase mb-3">
              Principia Designii
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Design Principles</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Four guiding tenets drawn from the natural history tradition, each a law
              as immutable as the Linnaean system of classification.
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
                <div className="group border border-[#2d4a2d]/15 rounded-lg p-8 hover:border-[#8b6914]/40 hover:shadow-[0_4px_16px_rgba(139,105,20,0.1)] transition-all duration-700" style={{ backgroundColor: "#faf5ef" }}>
                  <div className="flex items-start gap-5">
                    <div className="shrink-0">
                      <span className="font-serif text-4xl text-[#8b6914]/20 group-hover:text-[#8b6914]/40 transition-colors duration-700 leading-none block">
                        {principle.number}
                      </span>
                    </div>
                    <div>
                      <p className="font-serif italic text-[#8b6914] text-sm mb-0.5">
                        {principle.latin}
                      </p>
                      <h3 className="font-serif text-xl text-[#2d4a2d] group-hover:text-[#8b6914] transition-colors duration-700 mb-3">
                        {principle.title}
                      </h3>
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

      {/* TYPOGRAPHY */}
      <section className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div className="w-32 mb-6 vb-ornament-line" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.3em] uppercase mb-3">
              Typographia
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Typography Specimen</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              The typographic system of Victorian natural history — from chapter heading to
              caption footnote.
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
              <div className="h-px vb-ornament-line mb-6" />

              <div className="mb-6">
                <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.2em] uppercase mb-3">
                  &mdash; Latin Nomenclature
                </p>
                <p className="font-serif italic text-[#8b6914] text-2xl">
                  Quercus robur Linnaei, 1753
                </p>
              </div>
              <div className="h-px vb-ornament-line mb-6" />

              <div className="mb-6">
                <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.2em] uppercase mb-3">
                  &mdash; Body Text
                </p>
                <p className="font-serif text-[#2d4a2d]/70 leading-relaxed">
                  The English Oak is widely distributed throughout the temperate woodlands of
                  Europe and western Asia. It is a deciduous tree of great longevity, specimens
                  of over a thousand years being not uncommon in ancient parkland and former
                  common woodland. The bark becomes deeply furrowed with age, and the galls
                  produced by parasitic wasps were long employed in the preparation of iron gall
                  ink for manuscript production.
                </p>
              </div>
              <div className="h-px vb-ornament-line mb-6" />

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
              <div className="h-px vb-ornament-line mb-6" />

              <div>
                <p className="font-serif text-xs text-[#8b6914]/60 tracking-[0.2em] uppercase mb-3">
                  &mdash; Plate Caption
                </p>
                <p className="font-serif text-xs text-[#8b6914]/70 tracking-[0.2em] uppercase">
                  Fig. IV &mdash; Quercus robur: leaf, acorn and cupule. Drawn from life, Kew
                  Gardens, June 1872. Engraved by W. H. Fitch for the Botanical Magazine.
                </p>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="mt-8 border border-[#2d4a2d]/15 rounded-lg p-8" style={{ backgroundColor: "#faf5ef" }}>
              <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                Type Scale
              </p>
              <div className="space-y-4">
                {[
                  { label: "7xl", cls: "text-5xl", sample: "Aa" },
                  { label: "4xl", cls: "text-4xl", sample: "Botanical" },
                  { label: "2xl", cls: "text-2xl", sample: "Natural History" },
                  { label: "xl", cls: "text-xl italic text-[#8b6914]", sample: "Quercus robur Linnaei" },
                  { label: "base", cls: "text-base text-[#2d4a2d]/70", sample: "Body copy in the Garalde tradition" },
                  { label: "xs", cls: "text-xs text-[#8b6914]/70 tracking-[0.2em] uppercase", sample: "Plate caption and footnote reference" },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline gap-4">
                    <span className="font-serif text-xs text-[#8b6914]/50 w-12 shrink-0">{row.label}</span>
                    <span className={`font-serif text-[#2d4a2d] ${row.cls}`}>{row.sample}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* DESIGN RULES — DO / DON'T */}
      <section id="rules" className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="w-32 mb-6 vb-ornament-line" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.3em] uppercase mb-3">
              Notae Curatoris
            </p>
            <h2 className="font-serif text-3xl text-[#2d4a2d] mb-2">Curator&apos;s Annotations</h2>
            <p className="font-serif text-[#2d4a2d]/60 mb-10">
              Conservation standards and proper provenance requirements, recorded as
              manuscript annotations in the naturalist tradition.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* DO */}
            <RevealBlock delay={0.1}>
              <div className="border border-[#2d4a2d]/20 rounded-lg overflow-hidden">
                <div className="bg-[#2d4a2d] px-6 py-4">
                  <p className="font-serif text-[#faf5ef] tracking-wider text-base">
                    Proper Provenance
                  </p>
                  <p className="font-serif italic text-[#faf5ef]/50 text-xs mt-0.5">
                    Recommended Practice
                  </p>
                </div>
                <div className="p-6" style={{ backgroundColor: "#faf5ef" }}>
                  <ul className="space-y-5">
                    {DO_ITEMS.map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <span className="text-[#2d4a2d] font-serif mt-0.5 shrink-0 text-lg leading-snug">+</span>
                        <div>
                          <p className="font-serif text-[#2d4a2d] text-sm font-medium mb-0.5">{item.title}</p>
                          <p className="font-serif text-[#2d4a2d]/55 text-sm leading-relaxed">{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.15}>
              <div className="border border-[#6b3a3a]/20 rounded-lg overflow-hidden">
                <div className="bg-[#6b3a3a] px-6 py-4">
                  <p className="font-serif text-[#faf5ef] tracking-wider text-base">
                    Conservation Violations
                  </p>
                  <p className="font-serif italic text-[#faf5ef]/50 text-xs mt-0.5">
                    To Be Strictly Avoided
                  </p>
                </div>
                <div className="p-6" style={{ backgroundColor: "#faf5ef" }}>
                  <ul className="space-y-5">
                    {DONT_ITEMS.map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <span className="text-[#6b3a3a] font-serif mt-0.5 shrink-0 text-lg leading-snug">&times;</span>
                        <div>
                          <p className="font-serif text-[#6b3a3a] text-sm font-medium mb-0.5">{item.title}</p>
                          <p className="font-serif text-[#2d4a2d]/55 text-sm leading-relaxed">{item.body}</p>
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

      {/* LABELS, TAGS & BADGES */}
      <section className="py-24 px-6 border-t border-[#2d4a2d]/10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="w-32 mb-6 vb-ornament-line" />
            <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.3em] uppercase mb-3">
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

              <div className="h-px vb-ornament-line mb-6" />

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

              <div className="h-px vb-ornament-line mb-6" />

              <p className="font-serif italic text-[#8b6914] text-xs tracking-[0.2em] uppercase mb-6">
                Specimen Number Labels
              </p>
              <div className="flex flex-wrap gap-4">
                {["No. 001", "No. 142", "No. 287", "No. 514", "No. 892"].map((num) => (
                  <div key={num} className="border border-[#2d4a2d]/20 rounded px-4 py-2.5 text-center hover:border-[#8b6914]/50 transition-colors duration-500" style={{ minWidth: "88px" }}>
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
      <footer className="border-t border-[#2d4a2d]/15 py-20 px-6" style={{ backgroundColor: "#faf5ef" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-48 mx-auto mb-10 vb-ornament-line" />

          <p className="font-serif text-lg text-[#2d4a2d]/60 tracking-[0.2em] mb-4">
            Victorian Botanical // Natural History Collection // StyleKit
          </p>

          <p className="font-serif italic text-[#8b6914]/60 text-sm mb-8">
            Printed by authority of the Victorian Botanical Society, London &mdash; Est. MDCCCXLII
          </p>

          <div className="h-px vb-ornament-line mb-8" />

          <p className="font-serif text-xs text-[#2d4a2d]/30 tracking-[0.15em]">
            StyleKit &mdash; Victorian Botanical Theme &mdash; All specimens catalogued and verified
          </p>
        </div>
      </footer>
    </div>
  );
}
