"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: "Palette", href: "#palette" },
  { label: "Materials", href: "#materials" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Journal", href: "#journal" },
];

interface PaletteToken {
  name: string;
  hex: string;
  role: string;
  usage: string;
  darkText: boolean;
}

const paletteTokens: PaletteToken[] = [
  {
    name: "Paper",
    hex: "#F5F0EB",
    role: "Page background",
    usage: "The unbleached base of every page — not emptiness, but the clay's own ground tone.",
    darkText: true,
  },
  {
    name: "Sand",
    hex: "#E8DED1",
    role: "Card surface",
    usage: "Panels and cards rest on sand, like sheets of handmade paper stacked on the desk.",
    darkText: true,
  },
  {
    name: "Clay",
    hex: "#D4BFA5",
    role: "Hairlines and borders",
    usage: "Dividers, input borders, and quiet ornament — the natural shadow between layers.",
    darkText: true,
  },
  {
    name: "Ink",
    hex: "#2D2A24",
    role: "Text and shadow base",
    usage: "The darkest tone permitted. Warm brown ink, never pure black, in text and shadow alike.",
    darkText: false,
  },
  {
    name: "Terracotta",
    hex: "#C86A4A",
    role: "Primary accent",
    usage: "Fired clay for buttons, links, and calls to action — the mark of the kiln.",
    darkText: false,
  },
  {
    name: "Olive",
    hex: "#7A8B5E",
    role: "Secondary accent",
    usage: "The tree outside the window. Tags, success states, and everything that grows.",
    darkText: false,
  },
];

const typeScale = [
  {
    label: "Display",
    className: "font-serif text-5xl md:text-6xl font-medium text-[#2D2A24] leading-tight",
    sample: "Objects with Soul",
    note: "font-serif · medium · tight leading",
  },
  {
    label: "Section title",
    className: "font-serif text-3xl md:text-4xl font-medium text-[#2D2A24]",
    sample: "The Grain of the Land",
    note: "font-serif · medium",
  },
  {
    label: "Card title",
    className: "font-serif text-xl font-medium text-[#2D2A24]",
    sample: "A House in the Kochi Hills",
    note: "font-serif · medium",
  },
  {
    label: "Lead",
    className: "font-sans text-lg font-light tracking-wide text-[#2D2A24]/80",
    sample: "Design that feels like it has always been there.",
    note: "font-sans · light · wide tracking",
  },
  {
    label: "Body",
    className: "font-sans text-base text-[#2D2A24]/80 leading-relaxed",
    sample: "We work with rammed earth, reclaimed timber, and local clay — materials that age gracefully and carry the memory of the hands that shaped them.",
    note: "font-sans · relaxed leading",
  },
  {
    label: "Label",
    className: "font-sans text-[11px] uppercase tracking-[0.25em] text-[#7A8B5E] font-medium",
    sample: "Portfolio · Est. 2014",
    note: "uppercase · 0.25em tracking · olive",
  },
];

const materialTabs = ["Clay", "Timber", "Fiber", "Stone"] as const;
type MaterialTab = (typeof materialTabs)[number];

const materials: Record<
  MaterialTab,
  {
    origin: string;
    desc: string;
    notes: string[];
    swatches: { color: string; label: string }[];
  }
> = {
  Clay: {
    origin: "Seto hills, Aichi",
    desc: "Iron-rich stoneware clay dug from the old kiln city. Wedged by hand, thrown slowly, and fired in reduction until the surface blushes from sand to terracotta.",
    notes: ["Fires warm at cone 9", "Keeps the throwing rings visible", "Glazed only where the hand rests"],
    swatches: [
      { color: "#C86A4A", label: "Fired" },
      { color: "#D4BFA5", label: "Leather-hard" },
      { color: "#E8DED1", label: "Slip" },
    ],
  },
  Timber: {
    origin: "Shimanto river valley",
    desc: "Cedar and reclaimed keyaki, sawn at a family mill and finished with nothing but plane strokes and oil. The grain decides where the joinery goes.",
    notes: ["Air-dried for three summers", "Joined without metal fasteners", "Oiled, never lacquered"],
    swatches: [
      { color: "#8B7D6B", label: "Keyaki" },
      { color: "#D4BFA5", label: "Cedar" },
      { color: "#6B5D4E", label: "Smoked" },
    ],
  },
  Fiber: {
    origin: "Linen from Oita, wool from Aragon",
    desc: "Curtains that filter light the way leaves do, and rugs that hold the room's warmth. Woven on low looms, dyed with bark and olive leaf.",
    notes: ["Vegetable-dyed in small lots", "Woven at eight threads per centimeter", "Softens with every wash"],
    swatches: [
      { color: "#E8DED1", label: "Raw linen" },
      { color: "#7A8B5E", label: "Leaf-dyed" },
      { color: "#F5F0EB", label: "Undyed wool" },
    ],
  },
  Stone: {
    origin: "Travertine from a closed quarry",
    desc: "Offcuts and remnants, honed but never polished. Each fountain basin and threshold keeps its pores open so water and time can mark it.",
    notes: ["Honed matte, never mirror", "Pores left unfilled", "Sourced from remnant stock only"],
    swatches: [
      { color: "#F5F0EB", label: "Honed" },
      { color: "#D4BFA5", label: "Weathered" },
      { color: "#8B7D6B", label: "Wet" },
    ],
  },
};

const projectFilters = ["All", "Architecture", "Product", "Interior", "Identity"] as const;
type ProjectFilter = (typeof projectFilters)[number];

interface Project {
  title: string;
  category: Exclude<ProjectFilter, "All">;
  year: string;
  desc: string;
  from: string;
  to: string;
}

const projects: Project[] = [
  {
    title: "Kochi House",
    category: "Architecture",
    year: "2026",
    desc: "A weekend retreat nestled in mountain forest, built with locally sourced cedar and clay plaster walls that breathe with the seasons.",
    from: "#E8DED1",
    to: "#D4BFA5",
  },
  {
    title: "Terracotta Vessels",
    category: "Product",
    year: "2025",
    desc: "Hand-thrown ceramic collection exploring the interaction of glaze and temperature across three clay bodies.",
    from: "#E8DED1",
    to: "#C86A4A",
  },
  {
    title: "Clay Studio Interior",
    category: "Interior",
    year: "2025",
    desc: "Complete interior for a working pottery studio in Seto, the ancient kiln city — rammed earth, cedar shelving, north light.",
    from: "#F5F0EB",
    to: "#D4BFA5",
  },
  {
    title: "Earth Table",
    category: "Product",
    year: "2024",
    desc: "A dining table crafted from a single slab of reclaimed keyaki wood, finished with natural oils and left to darken with use.",
    from: "#E8DED1",
    to: "#8B7D6B",
  },
  {
    title: "Garden Pavilion",
    category: "Architecture",
    year: "2024",
    desc: "A tea pavilion designed around a hundred-year-old pine, using traditional joinery and a roof of hand-split shingles.",
    from: "#E8DED1",
    to: "#7A8B5E",
  },
  {
    title: "Olive Press",
    category: "Identity",
    year: "2026",
    desc: "Visual identity and packaging for a small-batch olive oil producer — labels printed on recycled paper with leaf-dyed inks.",
    from: "#F5F0EB",
    to: "#7A8B5E",
  },
];

interface ProcessStep {
  title: string;
  subtitle: string;
  desc: string;
  phases: { name: string; value: number }[];
}

const processSteps: ProcessStep[] = [
  {
    title: "Listen",
    subtitle: "Weeks 1-2",
    desc: "Every project begins with deep listening — to the site, the material, and the client's unspoken needs. We walk the land before we draw.",
    phases: [
      { name: "Site walks", value: 90 },
      { name: "Material sourcing", value: 25 },
      { name: "Drawings", value: 5 },
      { name: "Craft on site", value: 0 },
    ],
  },
  {
    title: "Shape",
    subtitle: "Weeks 3-8",
    desc: "Ideas are refined through sketching, clay models, and full-scale mockups. Form emerges from constraint, never from style.",
    phases: [
      { name: "Site walks", value: 100 },
      { name: "Material sourcing", value: 70 },
      { name: "Drawings", value: 60 },
      { name: "Craft on site", value: 10 },
    ],
  },
  {
    title: "Realize",
    subtitle: "Months 3-9",
    desc: "Built with care by craftspeople we have worked beside for years — honest materials, time-honored techniques, no shortcuts.",
    phases: [
      { name: "Site walks", value: 100 },
      { name: "Material sourcing", value: 100 },
      { name: "Drawings", value: 95 },
      { name: "Craft on site", value: 65 },
    ],
  },
  {
    title: "Tend",
    subtitle: "Year 1 onward",
    desc: "We return after the first winter and the first summer. Buildings and objects are living things; we teach them to age well.",
    phases: [
      { name: "Site walks", value: 100 },
      { name: "Material sourcing", value: 100 },
      { name: "Drawings", value: 100 },
      { name: "Craft on site", value: 100 },
    ],
  },
];

interface LedgerRow {
  project: string;
  material: string;
  lead: string;
  status: "Complete" | "In studio" | "Archived";
  year: string;
}

const ledgerRows: LedgerRow[] = [
  { project: "Kochi House", material: "Cedar, clay plaster", lead: "A. Ishida", status: "Complete", year: "2026" },
  { project: "Terracotta Vessels", material: "Stoneware", lead: "M. Serra", status: "In studio", year: "2026" },
  { project: "Olive Press Identity", material: "Recycled paper", lead: "M. Serra", status: "Complete", year: "2026" },
  { project: "Linen Curtain System", material: "Oita linen", lead: "R. Aalto", status: "In studio", year: "2026" },
  { project: "Clay Studio Interior", material: "Rammed earth", lead: "A. Ishida", status: "Complete", year: "2025" },
  { project: "Earth Table", material: "Reclaimed keyaki", lead: "T. Mori", status: "Complete", year: "2024" },
  { project: "Garden Pavilion", material: "Hinoki timber", lead: "A. Ishida", status: "Archived", year: "2024" },
  { project: "Courtyard Fountain", material: "Travertine", lead: "T. Mori", status: "Archived", year: "2023" },
];

const LEDGER_PAGE_SIZE = 4;

const statusStyles: Record<LedgerRow["status"], string> = {
  Complete: "bg-[#7A8B5E]/15 text-[#7A8B5E]",
  "In studio": "bg-[#C86A4A]/12 text-[#C86A4A]",
  Archived: "bg-[#D4BFA5]/35 text-[#8B7D6B]",
};

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The studio listened to the site before drawing a single line. Our home feels like it grew out of the hillside rather than being placed on it.",
    author: "Naomi Takeda",
    role: "Kochi House",
  },
  {
    quote: "Every vessel carries the mark of the hand that shaped it. They understood that our brand needed the same honesty as our oil.",
    author: "Pau Ferrer",
    role: "Olive Press",
  },
  {
    quote: "They treat materials like collaborators. The rammed-earth walls regulate my studio climate better than any machine ever did.",
    author: "Hana Sato",
    role: "Clay Studio",
  },
];

interface Faq {
  q: string;
  a: string;
}

const faqs: Faq[] = [
  {
    q: "What does a first conversation look like?",
    a: "A slow one. We meet on the site if there is a site, or over tea if there is not. We ask about how you live and what you want to keep, long before we ask about square meters or budgets.",
  },
  {
    q: "Do you work outside Japan and Spain?",
    a: "Yes, when the project allows us to source materials within a day of the site. The palette of a place — its clay, its timber, its light — is the real client.",
  },
  {
    q: "Which materials do you refuse to use?",
    a: "Anything that pretends to be something else: vinyl printed as wood, polished stone imitating mirrors, coatings that stop a surface from aging. Honesty first, always.",
  },
  {
    q: "How long does a commission take?",
    a: "A vessel takes a season. A room takes half a year. A house takes as long as its slowest material — usually the timber, which we let rest before it is joined.",
  },
];

const doRules = [
  "Warm off-white bg-[#F5F0EB] pages with sand bg-[#E8DED1] cards and panels.",
  "Unified rounded-lg radii — curves like river-smoothed pebbles, never bubbles.",
  "Warm shadows only: rgba(45,42,36,0.12) — the shadow falls on earth, not concrete.",
  "Serif headings at medium weight; humanist sans body with relaxed leading.",
  "Terracotta #C86A4A for CTAs and links; olive #7A8B5E for tags and growth.",
  "Hairline dividers in clay #D4BFA5 at reduced opacity, like stacked paper edges.",
  "Inputs on warm gray with clay borders, blushing terracotta on focus.",
];

const dontRules = [
  "Never use cool grays like #999 or #6B7280 — every neutral must lean warm.",
  "Never use sharp rounded-none corners or tiny rounded-sm radii.",
  "Never cast cold shadows with #000 or cool gray tints.",
  "Never introduce neon accents or cool blues — terracotta and olive only.",
  "Never use glassmorphism — warmth comes from layered color, not frosted glass.",
  "Never set text in pure black #000000 — deep brown #2D2A24 is the ceiling.",
];

/* ------------------------------------------------------------------ */
/*  SVG Decorations                                                    */
/* ------------------------------------------------------------------ */

function VesselSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <path
        d="M46,8 L74,8 L71,26 C91,35 100,55 100,78 C100,108 83,128 60,128 C37,128 20,108 20,78 C20,55 29,35 49,26 Z"
        fill="#C86A4A"
        opacity="0.85"
      />
      <ellipse cx="60" cy="8" rx="14" ry="4" fill="#A04A2A" opacity="0.55" />
      <path d="M25,58 C40,64 80,64 95,58" stroke="#A04A2A" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M22,76 C40,83 80,83 98,76" stroke="#A04A2A" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M25,96 C42,102 78,102 95,96" stroke="#A04A2A" strokeWidth="1.5" fill="none" opacity="0.3" />
      <ellipse cx="46" cy="42" rx="7" ry="14" fill="#F5F0EB" opacity="0.18" transform="rotate(-12,46,42)" />
    </svg>
  );
}

function PebbleStackSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <ellipse cx="60" cy="116" rx="44" ry="17" fill="#D4BFA5" opacity="0.9" />
      <ellipse cx="57" cy="88" rx="34" ry="14" fill="#C86A4A" opacity="0.7" />
      <ellipse cx="62" cy="64" rx="26" ry="11" fill="#8B7D6B" opacity="0.65" />
      <ellipse cx="59" cy="45" rx="17" ry="8" fill="#7A8B5E" opacity="0.75" />
      <circle cx="60" cy="29" r="6" fill="#2D2A24" opacity="0.55" />
      <ellipse cx="46" cy="112" rx="12" ry="4" fill="#F5F0EB" opacity="0.25" />
      <ellipse cx="48" cy="85" rx="9" ry="3" fill="#F5F0EB" opacity="0.25" />
    </svg>
  );
}

function OliveSprigSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true">
      <path
        d="M60,152 C58,120 62,88 58,56 C56,36 60,20 62,8"
        stroke="#7A8B5E"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M59,120 C46,110 36,106 26,102" stroke="#7A8B5E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="100" rx="10" ry="4.5" fill="#7A8B5E" opacity="0.8" transform="rotate(-24,22,100)" />
      <path d="M60,94 C74,84 84,80 94,76" stroke="#7A8B5E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="98" cy="74" rx="10" ry="4.5" fill="#7A8B5E" opacity="0.8" transform="rotate(24,98,74)" />
      <path d="M58,66 C46,56 38,52 28,48" stroke="#7A8B5E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="24" cy="46" rx="10" ry="4.5" fill="#7A8B5E" opacity="0.8" transform="rotate(-26,24,46)" />
      <path d="M61,40 C72,32 82,28 90,25" stroke="#7A8B5E" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <ellipse cx="94" cy="23" rx="10" ry="4.5" fill="#7A8B5E" opacity="0.8" transform="rotate(22,94,23)" />
      <circle cx="34" cy="118" r="4" fill="#C86A4A" opacity="0.7" />
      <circle cx="88" cy="92" r="4" fill="#C86A4A" opacity="0.7" />
      <circle cx="36" cy="62" r="3.5" fill="#C86A4A" opacity="0.6" />
    </svg>
  );
}

function BlobShape({ fill, className = "" }: { fill: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        d="M168,44 C190,76 194,120 172,148 C150,176 108,190 74,178 C40,166 16,132 20,96 C24,60 52,26 92,18 C124,12 148,20 168,44 Z"
        fill={fill}
      />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      <path d="M2,6.5 L5,9 L10,3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared building blocks                                             */
/* ------------------------------------------------------------------ */

function SectionHeading({
  label,
  title,
  desc,
}: {
  label: string;
  title: string;
  desc?: string;
}) {
  return (
    <RevealBlock>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-[#D4BFA5]/70" />
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#7A8B5E] font-medium">{label}</span>
        <div className="h-px flex-1 bg-[#D4BFA5]/70" />
      </div>
      <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#2D2A24] text-center mb-3">{title}</h2>
      {desc ? (
        <p className="text-sm text-[#6B5D4E] leading-relaxed max-w-xl mx-auto text-center mb-12">{desc}</p>
      ) : (
        <div className="mb-10" />
      )}
    </RevealBlock>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function WarmOrganicShowcase() {
  const [selectedSwatch, setSelectedSwatch] = useState(4);
  const [activeMaterial, setActiveMaterial] = useState<MaterialTab>("Clay");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("All");
  const [processStep, setProcessStep] = useState(1);
  const [ledgerPage, setLedgerPage] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formType, setFormType] = useState("A house or renovation");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [interests, setInterests] = useState<string[]>(["Clay"]);
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSubscribed, setNewsSubscribed] = useState(false);

  const token = paletteTokens[selectedSwatch];
  const material = materials[activeMaterial];
  const step = processSteps[processStep];
  const visibleProjects =
    projectFilter === "All" ? projects : projects.filter((p) => p.category === projectFilter);
  const ledgerPageCount = Math.ceil(ledgerRows.length / LEDGER_PAGE_SIZE);
  const visibleRows = ledgerRows.slice(
    ledgerPage * LEDGER_PAGE_SIZE,
    (ledgerPage + 1) * LEDGER_PAGE_SIZE
  );
  const quote = testimonials[quoteIndex];

  const toggleInterest = (name: string) => {
    setInterests((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    borderColor: focusedField === name ? "#C86A4A" : "rgba(212,191,165,0.9)",
    boxShadow: focusedField === name ? "0 0 0 3px rgba(200,106,74,0.15)" : "none",
  });

  return (
    <div className="min-h-screen bg-[#F5F0EB] text-[#2D2A24] font-sans">

      {/* ============================================================ */}
      {/* 1. NAVIGATION                                                 */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 bg-[#F5F0EB] border-b border-[#D4BFA5]/40 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/styles/warm-organic"
              className="text-sm text-[#7A8B5E] hover:text-[#C86A4A] transition-colors duration-200 font-medium flex items-center gap-1.5"
            >
              <span aria-hidden="true">&larr;</span>
              Back to Docs
            </Link>
            <div className="w-px h-4 bg-[#D4BFA5]/60" />
            <div className="w-8 h-8 rounded-lg bg-[#C86A4A] flex items-center justify-center shadow-[0_2px_12px_-3px_rgba(200,106,74,0.4)]">
              <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                <path
                  d="M9,3 L15,3 L14.4,6.5 C17.5,8 19,11 19,14.5 C19,18.5 16,21 12,21 C8,21 5,18.5 5,14.5 C5,11 6.5,8 9.6,6.5 Z"
                  fill="#F5F0EB"
                />
              </svg>
            </div>
            <span className="font-serif text-lg font-medium tracking-tight text-[#2D2A24]">Clay &amp; Olive</span>
          </div>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#2D2A24]/65 hover:text-[#C86A4A] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-[#7A8B5E] hover:text-[#2D2A24] transition-colors duration-200 flex items-center gap-1"
          >
            StyleKit
            <span className="text-[#C86A4A]" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 2. HERO                                                       */}
      {/* ============================================================ */}
      <section className="relative px-6 pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4BFA5]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C86A4A]/10 rounded-full blur-2xl pointer-events-none" />
        <BlobShape fill="#7A8B5E" className="absolute -bottom-16 right-10 w-64 h-64 opacity-[0.06] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <RevealBlock>
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-block w-3 h-3 rounded-full bg-[#C86A4A]/60" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A8B5E] font-medium">
                  Portfolio · 2026
                </span>
              </div>
            </RevealBlock>
            <RevealBlock delay={0.1}>
              <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.08] tracking-tight">
                Made by
                <br />
                <span className="text-[#C86A4A] italic">human hands</span>
              </h1>
            </RevealBlock>
            <RevealBlock delay={0.2}>
              <p className="text-base md:text-lg text-[#6B5D4E] mt-6 max-w-xl leading-relaxed">
                We create spaces, objects, and identities rooted in material honesty —
                where craft meets function, and every surface carries the memory of the hand that shaped it.
              </p>
            </RevealBlock>
            <RevealBlock delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="px-6 py-2.5 bg-[#C86A4A] text-white text-sm font-medium rounded-lg hover:bg-[#B55A3A] active:bg-[#A04A2A] shadow-[0_2px_12px_-3px_rgba(200,106,74,0.3)] transition-all duration-200"
                >
                  View Projects
                </a>
                <a
                  href="#process"
                  className="px-6 py-2.5 bg-transparent text-[#2D2A24] text-sm font-medium rounded-lg border border-[#D4BFA5] hover:bg-[#E8DED1]/60 transition-all duration-200"
                >
                  About the Studio
                </a>
              </div>
            </RevealBlock>
            <RevealBlock delay={0.4}>
              <div className="flex items-center gap-8 mt-10 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C86A4A]" />
                  <span className="text-[#6B5D4E]">Architecture</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7A8B5E]" />
                  <span className="text-[#6B5D4E]">Product</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4BFA5]" />
                  <span className="text-[#6B5D4E]">Interior</span>
                </span>
              </div>
            </RevealBlock>
          </div>

          <RevealBlock delay={0.35} className="hidden md:flex flex-col items-center gap-6">
            <div className="relative w-56 h-56 rounded-lg bg-[#E8DED1] shadow-[0_4px_20px_-4px_rgba(45,42,36,0.12)] flex items-end justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#F5F0EB] to-[#E8DED1]" />
              <VesselSVG className="relative w-32 h-36 mb-4" />
              <OliveSprigSVG className="absolute top-3 right-2 w-16 h-24 opacity-70" />
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C86A4A]/50" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B]">Studio still life</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#7A8B5E]/50" />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. COLOR PALETTE                                              */}
      {/* ============================================================ */}
      <section id="palette" className="px-6 py-16 md:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Earth Pigments"
            title="A Palette Dug from the Ground"
            desc="Six tones, all warm. Select a pigment to read where it belongs — nothing synthetic, nothing cold ever enters this page."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {paletteTokens.map((tokenItem, i) => (
              <RevealBlock key={tokenItem.name} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => setSelectedSwatch(i)}
                  aria-pressed={selectedSwatch === i}
                  className="w-full text-left rounded-lg overflow-hidden border transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: selectedSwatch === i ? "#C86A4A" : "rgba(212,191,165,0.5)",
                    boxShadow:
                      selectedSwatch === i
                        ? "0 8px 30px -6px rgba(45,42,36,0.18)"
                        : "0 4px 20px -4px rgba(45,42,36,0.10)",
                  }}
                >
                  <div className="h-20" style={{ background: tokenItem.hex }} />
                  <div className="p-3 bg-white/60">
                    <div className="text-sm font-medium text-[#2D2A24]">{tokenItem.name}</div>
                    <div className="text-[10px] font-mono text-[#8B7D6B] tracking-wider">{tokenItem.hex}</div>
                  </div>
                </button>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.2}>
            <div className="mt-8 rounded-lg bg-[#E8DED1] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)] flex flex-col md:flex-row md:items-center gap-6">
              <div
                className="w-20 h-20 rounded-lg flex-shrink-0 border border-[#D4BFA5]/60"
                style={{ background: token.hex }}
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h3 className="font-serif text-xl font-medium text-[#2D2A24]">{token.name}</h3>
                  <span className="text-xs font-mono text-[#8B7D6B] tracking-wider">{token.hex}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E]">{token.role}</span>
                </div>
                <p className="text-sm text-[#6B5D4E] leading-relaxed max-w-2xl">{token.usage}</p>
              </div>
              <div
                className="px-4 py-3 rounded-lg text-sm font-medium flex-shrink-0"
                style={{
                  background: token.hex,
                  color: token.darkText ? "#2D2A24" : "#F5F0EB",
                }}
              >
                Sample text
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. TYPOGRAPHY                                                 */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24 bg-[#E8DED1]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Letterforms"
            title="Type with a Human Hand"
            desc="A warm serif carries the display voice; a humanist sans does the daily work. Generous leading everywhere — text needs room to breathe like clay needs air."
          />

          <RevealBlock delay={0.1}>
            <div className="rounded-lg bg-[#F5F0EB] border border-[#D4BFA5]/50 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)] overflow-hidden">
              {typeScale.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-8 px-6 py-5 ${
                    i < typeScale.length - 1 ? "border-b border-[#D4BFA5]/40" : ""
                  }`}
                >
                  <div className="w-32 flex-shrink-0">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] font-medium">
                      {row.label}
                    </span>
                  </div>
                  <div className={`flex-1 ${row.className}`}>{row.sample}</div>
                  <div className="w-56 flex-shrink-0 md:text-right">
                    <span className="text-[10px] text-[#8B7D6B] tracking-wide">{row.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-[#D4BFA5]/60" />
              <p className="text-xs text-[#8B7D6B] tracking-wide text-center">
                Serif for the voice, sans for the work — never pure black, always #2D2A24 ink.
              </p>
              <span className="h-px w-16 bg-[#D4BFA5]/60" />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BUTTONS                                                    */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Actions"
            title="Buttons Pressed in Clay"
            desc="Terracotta leads, olive supports, clay outlines stay quiet. Every state shift is a change of firing temperature — darker when pressed, never colder."
          />

          <RevealBlock delay={0.1}>
            <div className="rounded-lg bg-white/60 border border-[#D4BFA5]/50 p-8 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)]">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#C86A4A] text-white text-sm font-medium rounded-lg hover:bg-[#B55A3A] active:bg-[#A04A2A] shadow-[0_2px_12px_-3px_rgba(200,106,74,0.3)] transition-all duration-200"
                >
                  Primary Terracotta
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#7A8B5E] text-[#F5F0EB] text-sm font-medium rounded-lg hover:bg-[#6A7B4E] active:bg-[#5A6B3E] shadow-[0_2px_12px_-3px_rgba(122,139,94,0.35)] transition-all duration-200"
                >
                  Olive Secondary
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 bg-transparent text-[#2D2A24] text-sm font-medium rounded-lg border border-[#D4BFA5] hover:bg-[#E8DED1]/60 active:bg-[#E8DED1] transition-all duration-200"
                >
                  Clay Outline
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#E8DED1] text-[#6B5D4E] text-sm font-medium rounded-lg hover:bg-[#D4BFA5]/60 hover:text-[#2D2A24] active:bg-[#D4BFA5] transition-all duration-200"
                >
                  Sand Tonal
                </button>
                <button
                  type="button"
                  className="text-sm font-medium text-[#C86A4A] hover:text-[#A04A2A] inline-flex items-center gap-1.5 transition-colors duration-200"
                >
                  Text link
                  <span aria-hidden="true">&rarr;</span>
                </button>
                <button
                  type="button"
                  aria-label="Mark as favorite"
                  className="w-10 h-10 rounded-lg bg-[#F5F0EB] border border-[#D4BFA5] text-[#6B5D4E] hover:bg-[#C86A4A] hover:border-[#C86A4A] hover:text-white flex items-center justify-center transition-all duration-200 shadow-[0_2px_12px_-3px_rgba(45,42,36,0.12)]"
                >
                  <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
                    <path
                      d="M8,13.5 C5,11 2.5,8.8 2.5,6.3 C2.5,4.4 4,3 5.7,3 C6.7,3 7.5,3.5 8,4.2 C8.5,3.5 9.3,3 10.3,3 C12,3 13.5,4.4 13.5,6.3 C13.5,8.8 11,11 8,13.5 Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  disabled
                  className="px-6 py-2.5 bg-[#D4BFA5]/40 text-[#8B7D6B] text-sm font-medium rounded-lg cursor-not-allowed"
                >
                  Resting (disabled)
                </button>
              </div>
              <div className="mt-6 pt-5 border-t border-[#D4BFA5]/40">
                <p className="text-xs text-[#8B7D6B] tracking-wide">
                  hover:bg-[#B55A3A] · active:bg-[#A04A2A] — deeper firing on press · warm terracotta glow shadows · rounded-lg only
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. CARDS                                                      */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24 bg-[#E8DED1]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Surfaces"
            title="Cards Like Stacked Paper"
            desc="Three surface treatments, all resting on warm shadows: sand for depth, translucent white for lightness, terracotta when the card itself must speak."
          />

          <div className="grid md:grid-cols-3 gap-6">
            <RevealBlock delay={0.05}>
              <div className="bg-[#E8DED1] rounded-lg p-6 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)] hover:shadow-[0_8px_30px_-6px_rgba(45,42,36,0.15)] hover:-translate-y-0.5 transition-all duration-200 h-full">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] mb-2">Project</p>
                <h3 className="font-serif text-lg font-medium text-[#2D2A24] mb-2">Clay House</h3>
                <p className="text-sm leading-relaxed text-[#2D2A24]/80">
                  A residence in the Catalonian countryside, built with rammed earth and local terracotta tiles.
                </p>
                <div className="mt-4 pt-4 border-t border-[#D4BFA5]/60 flex items-center gap-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#7A8B5E]/50" />
                  <span className="text-xs text-[#7A8B5E]">Architecture · 2025</span>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="bg-white/60 rounded-lg p-6 border border-[#D4BFA5]/50 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)] hover:-translate-y-0.5 transition-all duration-200 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#7A8B5E]/15 flex items-center justify-center">
                    <OliveSprigSVG className="w-5 h-7" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-medium text-[#2D2A24]">Material Sourcing</h3>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8B7D6B]">Studio service</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#6B5D4E]">
                  We locate clay, timber, and stone within a day of your site, then document each origin in the project ledger.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[#C86A4A] text-xs font-medium">
                  <span>Learn more</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.25}>
              <div className="bg-[#C86A4A] rounded-lg p-6 shadow-[0_4px_20px_-4px_rgba(200,106,74,0.35)] hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#F5F0EB]/70 mb-2">Open studio</p>
                <h3 className="font-serif text-lg font-medium text-[#F5F0EB] mb-2">Visit the Workshop</h3>
                <p className="text-sm leading-relaxed text-[#F5F0EB]/85 flex-1">
                  Every first Saturday we open the kiln room. Watch a firing, throw a bowl, stay for tea under the olive tree.
                </p>
                <button
                  type="button"
                  className="mt-5 self-start px-4 py-2 bg-[#F5F0EB] text-[#C86A4A] text-xs font-medium rounded-lg hover:bg-[#E8DED1] transition-colors duration-200"
                >
                  Reserve a seat
                </button>
              </div>
            </RevealBlock>
          </div>

          <RevealBlock delay={0.3}>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "48", label: "Commissions" },
                { value: "11", label: "Years of practice" },
                { value: "3", label: "Kilns tended" },
                { value: "0", label: "Synthetic surfaces" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg bg-[#F5F0EB] border border-[#D4BFA5]/50 p-4 text-center shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)]"
                >
                  <div className="font-serif text-3xl font-medium text-[#C86A4A]">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#8B7D6B] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FORM ELEMENTS                                              */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Commissions"
            title="Start a Conversation"
            desc="Inputs rest on warm gray like pencil on handmade paper. Focus brings a terracotta blush — never a cold blue ring."
          />

          <RevealBlock delay={0.1}>
            <div className="rounded-lg bg-white/60 border border-[#D4BFA5]/50 p-8 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)]">
              {formSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-full bg-[#7A8B5E]/15 text-[#7A8B5E] flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#2D2A24] mb-2">Letter received</h3>
                  <p className="text-sm text-[#6B5D4E] leading-relaxed max-w-md mx-auto">
                    Thank you, {formName.trim() === "" ? "friend" : formName}. We read every inquiry over morning tea
                    and reply within three working days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormName("");
                      setFormEmail("");
                      setFormMessage("");
                    }}
                    className="mt-6 text-sm font-medium text-[#C86A4A] hover:text-[#A04A2A] transition-colors duration-200"
                  >
                    Write another letter
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div>
                    <label htmlFor="wo-name" className="block text-[11px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium mb-2">
                      Your name
                    </label>
                    <input
                      id="wo-name"
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="e.g. Naomi Takeda"
                      className="w-full px-4 py-3 bg-[#E8DED1]/40 border rounded-lg text-sm text-[#2D2A24] placeholder:text-[#2D2A24]/40 focus:outline-none transition-all duration-200"
                      style={fieldStyle("name")}
                    />
                  </div>

                  <div>
                    <label htmlFor="wo-email" className="block text-[11px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium mb-2">
                      Email address
                    </label>
                    <input
                      id="wo-email"
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-[#E8DED1]/40 border rounded-lg text-sm text-[#2D2A24] placeholder:text-[#2D2A24]/40 focus:outline-none transition-all duration-200"
                      style={fieldStyle("email")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="wo-type" className="block text-[11px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium mb-2">
                      What shall we make together
                    </label>
                    <div className="relative">
                      <select
                        id="wo-type"
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        onFocus={() => setFocusedField("type")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-[#E8DED1]/40 border rounded-lg text-sm text-[#2D2A24] focus:outline-none appearance-none transition-all duration-200"
                        style={fieldStyle("type")}
                      >
                        <option>A house or renovation</option>
                        <option>An interior</option>
                        <option>A piece of furniture</option>
                        <option>A ceramic commission</option>
                        <option>A brand identity</option>
                      </select>
                      <svg
                        viewBox="0 0 12 12"
                        className="w-3 h-3 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      >
                        <path d="M2,4 L6,8 L10,4" stroke="#8B7D6B" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <span className="block text-[11px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium mb-3">
                      Materials you are drawn to
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {materialTabs.map((name) => {
                        const active = interests.includes(name);
                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() => toggleInterest(name)}
                            aria-pressed={active}
                            className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 inline-flex items-center gap-1.5 ${
                              active
                                ? "bg-[#7A8B5E] border-[#7A8B5E] text-[#F5F0EB]"
                                : "bg-transparent border-[#D4BFA5] text-[#6B5D4E] hover:bg-[#E8DED1]/60"
                            }`}
                          >
                            {active ? <CheckIcon className="w-3 h-3" /> : null}
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="wo-message" className="block text-[11px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium mb-2">
                      Tell us about the place
                    </label>
                    <textarea
                      id="wo-message"
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="The site, the light, the way you hope to live there..."
                      className="w-full px-4 py-3 bg-[#E8DED1]/40 border rounded-lg text-sm text-[#2D2A24] placeholder:text-[#2D2A24]/40 focus:outline-none resize-none transition-all duration-200"
                      style={fieldStyle("message")}
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between pt-2">
                    <p className="text-xs text-[#8B7D6B]">
                      Focus ring: terracotta blush · border-[#C86A4A] with soft rgba glow
                    </p>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#C86A4A] text-white text-sm font-medium rounded-lg hover:bg-[#B55A3A] active:bg-[#A04A2A] shadow-[0_2px_12px_-3px_rgba(200,106,74,0.3)] transition-all duration-200"
                    >
                      Send the letter
                    </button>
                  </div>
                </form>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. MATERIAL LIBRARY (TABS)                                    */}
      {/* ============================================================ */}
      <section id="materials" className="px-6 py-16 md:py-24 bg-[#E8DED1]/50 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Material Library"
            title="Honest Materials"
            desc="Four families of matter we return to again and again. Switch between them — each keeps its origin, its rules, and its own warm swatches."
          />

          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-[#D4BFA5]/25 border border-[#D4BFA5]/40 w-fit mx-auto mb-8">
              {materialTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveMaterial(tab)}
                  aria-pressed={activeMaterial === tab}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeMaterial === tab
                      ? "bg-[#C86A4A] text-[#F5F0EB] shadow-[0_2px_12px_-3px_rgba(200,106,74,0.35)]"
                      : "text-[#6B5D4E] hover:text-[#C86A4A]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="rounded-lg bg-[#F5F0EB] border border-[#D4BFA5]/50 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)] p-8 grid md:grid-cols-[auto_1fr] gap-8 items-start">
              <div className="w-32 h-36 rounded-lg bg-[#E8DED1] flex items-center justify-center mx-auto md:mx-0">
                {activeMaterial === "Clay" && <VesselSVG className="w-20 h-24" />}
                {activeMaterial === "Timber" && (
                  <svg viewBox="0 0 120 140" className="w-20 h-24" aria-hidden="true">
                    <ellipse cx="60" cy="70" rx="44" ry="52" fill="#D4BFA5" opacity="0.9" />
                    <ellipse cx="60" cy="70" rx="34" ry="41" fill="none" stroke="#8B7D6B" strokeWidth="2" opacity="0.5" />
                    <ellipse cx="60" cy="70" rx="24" ry="29" fill="none" stroke="#8B7D6B" strokeWidth="1.8" opacity="0.45" />
                    <ellipse cx="60" cy="70" rx="14" ry="17" fill="none" stroke="#C86A4A" strokeWidth="1.6" opacity="0.5" />
                    <circle cx="60" cy="70" r="5" fill="#A04A2A" opacity="0.6" />
                  </svg>
                )}
                {activeMaterial === "Fiber" && (
                  <svg viewBox="0 0 120 140" className="w-20 h-24" aria-hidden="true">
                    {[20, 36, 52, 68, 84, 100].map((y, i) => (
                      <path
                        key={y}
                        d={`M14,${y} C40,${y - 10} 80,${y + 10} 106,${y}`}
                        stroke={i % 2 === 0 ? "#7A8B5E" : "#D4BFA5"}
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.75"
                      />
                    ))}
                    <path d="M60,10 L60,130" stroke="#8B7D6B" strokeWidth="2" opacity="0.35" />
                  </svg>
                )}
                {activeMaterial === "Stone" && <PebbleStackSVG className="w-20 h-24" />}
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-3 mb-3">
                  <h3 className="font-serif text-2xl font-medium text-[#2D2A24]">{activeMaterial}</h3>
                  <span className="text-xs text-[#7A8B5E] tracking-wide">{material.origin}</span>
                </div>
                <p className="text-sm text-[#6B5D4E] leading-relaxed mb-5 max-w-2xl">{material.desc}</p>
                <ul className="space-y-2 mb-6">
                  {material.notes.map((note) => (
                    <li key={note} className="flex items-start gap-2.5 text-sm text-[#2D2A24]/75">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C86A4A]/60 flex-shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  {material.swatches.map((swatch) => (
                    <div key={swatch.label} className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-full border border-[#D4BFA5]/60"
                        style={{ background: swatch.color }}
                      />
                      <span className="text-xs text-[#8B7D6B]">{swatch.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. SELECTED PROJECTS (FILTERABLE CARDS)                       */}
      {/* ============================================================ */}
      <section id="projects" className="px-6 py-16 md:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Selected Projects"
            title="Work Rooted in Place"
            desc="Filter the archive by discipline. Every project began with a walk on the land and ended with materials that will outlive us."
          />

          <RevealBlock delay={0.05}>
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setProjectFilter(filter)}
                  aria-pressed={projectFilter === filter}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                    projectFilter === filter
                      ? "bg-[#2D2A24] border-[#2D2A24] text-[#F5F0EB]"
                      : "bg-transparent border-[#D4BFA5] text-[#6B5D4E] hover:bg-[#E8DED1]/60"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {visibleProjects.map((project, i) => (
              <RevealBlock
                key={project.title}
                delay={i * 0.06}
                className={visibleProjects.length > 1 && i === 0 && projectFilter === "All" ? "md:col-span-2" : ""}
              >
                <div className="group bg-white/60 rounded-lg overflow-hidden border border-[#D4BFA5]/40 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)] hover:shadow-[0_8px_30px_-6px_rgba(45,42,36,0.15)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer h-full">
                  <div
                    className={`${i === 0 && projectFilter === "All" ? "aspect-[3/1]" : "aspect-[4/3] md:aspect-[16/7]"} relative overflow-hidden`}
                    style={{ background: `linear-gradient(135deg, ${project.from}, ${project.to})` }}
                  >
                    <BlobShape
                      fill="#F5F0EB"
                      className="absolute -bottom-10 -right-8 w-40 h-40 opacity-25 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block px-3 py-1 bg-[#F5F0EB] text-xs text-[#2D2A24] rounded-lg font-medium shadow-[0_2px_12px_-3px_rgba(45,42,36,0.2)]">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif text-lg font-medium text-[#2D2A24] group-hover:text-[#C86A4A] transition-colors duration-200">
                        {project.title}
                      </h3>
                      <span className="text-xs text-[#8B7D6B]">{project.year}</span>
                    </div>
                    <p className="text-sm text-[#6B5D4E] leading-relaxed">{project.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.2}>
            <p className="text-center text-xs text-[#8B7D6B] mt-8 tracking-wide">
              Showing {visibleProjects.length} of {projects.length} projects
              {projectFilter === "All" ? "" : ` in ${projectFilter}`}
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. BADGES AND TAGS                                           */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24 bg-[#E8DED1]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Marks & Labels"
            title="Small Signs of Craft"
            desc="Tags behave like the potter's stamp on the base of a vessel — quiet, warm, and only in earth tones."
          />

          <RevealBlock delay={0.1}>
            <div className="rounded-lg bg-[#F5F0EB] border border-[#D4BFA5]/50 p-8 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)] space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-3">Discipline tags</p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-3 py-1 rounded-lg bg-[#C86A4A]/12 text-[#C86A4A] text-xs font-medium">Architecture</span>
                  <span className="px-3 py-1 rounded-lg bg-[#7A8B5E]/15 text-[#7A8B5E] text-xs font-medium">Ceramics</span>
                  <span className="px-3 py-1 rounded-lg bg-[#D4BFA5]/35 text-[#8B7D6B] text-xs font-medium">Interior</span>
                  <span className="px-3 py-1 rounded-lg border border-[#D4BFA5] text-[#6B5D4E] text-xs font-medium">Landscape</span>
                  <span className="px-3 py-1 rounded-lg border border-[#C86A4A]/40 text-[#C86A4A] text-xs font-medium">Furniture</span>
                  <span className="px-3 py-1 rounded-lg bg-[#2D2A24] text-[#F5F0EB] text-xs font-medium">Identity</span>
                </div>
              </div>

              <div className="warm-hairline border-t border-[#D4BFA5]/50" />

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-3">Status badges</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#7A8B5E]/15 text-[#7A8B5E] text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B5E]" />
                    Complete
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C86A4A]/12 text-[#C86A4A] text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4A]" />
                    In studio
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#D4BFA5]/35 text-[#8B7D6B] text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B7D6B]" />
                    Archived
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[#D4BFA5] text-[#6B5D4E] text-xs font-medium">
                    Kiln queue
                    <span className="px-1.5 py-0.5 rounded-md bg-[#C86A4A] text-[#F5F0EB] text-[10px] leading-none">3</span>
                  </span>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. PROCESS AND PROGRESS                                      */}
      {/* ============================================================ */}
      <section id="process" className="px-6 py-16 md:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="My Approach"
            title="From Listening to Tending"
            desc="Choose a phase of the studio process. The bars below show how far each strand of work has traveled at that moment."
          />

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {processSteps.map((s, i) => (
              <RevealBlock key={s.title} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => setProcessStep(i)}
                  aria-pressed={processStep === i}
                  className={`w-full text-left rounded-lg border p-5 transition-all duration-200 h-full ${
                    processStep === i
                      ? "bg-[#E8DED1] border-[#C86A4A]/50 shadow-[0_8px_30px_-6px_rgba(45,42,36,0.15)]"
                      : "bg-white/60 border-[#D4BFA5]/40 hover:bg-[#E8DED1]/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-serif text-lg font-medium ${processStep === i ? "text-[#C86A4A]" : "text-[#2D2A24]"}`}>
                      {i + 1}. {s.title}
                    </span>
                    {processStep === i ? <span className="w-2 h-2 rounded-full bg-[#C86A4A]" /> : null}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] mb-2">{s.subtitle}</p>
                  <p className="text-xs text-[#6B5D4E] leading-relaxed">{s.desc}</p>
                </button>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.15}>
            <div className="rounded-lg bg-white/60 border border-[#D4BFA5]/50 p-8 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-lg font-medium text-[#2D2A24]">
                  Phase {processStep + 1} of {processSteps.length}: {step.title}
                </h3>
                <span className="text-xs text-[#8B7D6B]">{step.subtitle}</span>
              </div>

              <div className="h-1.5 rounded-full bg-[#E8DED1] overflow-hidden mb-8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C86A4A] to-[#7A8B5E] transition-all duration-500 ease-out"
                  style={{ width: `${((processStep + 1) / processSteps.length) * 100}%` }}
                />
              </div>

              <div className="space-y-5">
                {step.phases.map((phase) => (
                  <div key={phase.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-[#2D2A24]/80">{phase.name}</span>
                      <span className="text-xs font-mono text-[#8B7D6B]">{phase.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#E8DED1] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ease-out ${
                          phase.value === 100 ? "bg-[#7A8B5E]" : "bg-[#C86A4A]"
                        }`}
                        style={{ width: `${phase.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 pt-5 border-t border-[#D4BFA5]/40 text-xs text-[#8B7D6B] tracking-wide">
                Progress turns olive at 100% — growth completing itself. Bars stay rounded-full, tracks stay sand.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. ALERTS                                                    */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24 bg-[#E8DED1]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Studio Signals"
            title="Messages in Warm Tones"
            desc="Even warnings stay on the earth palette: clay for notes, olive for good news, raw terracotta for caution, deep fired clay when something breaks."
          />

          <div className="space-y-4 max-w-3xl mx-auto">
            <RevealBlock delay={0.05}>
              <div className="flex items-start gap-4 rounded-lg bg-[#F5F0EB] border border-[#D4BFA5] p-5 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)]">
                <div className="w-8 h-8 rounded-full bg-[#D4BFA5]/40 text-[#8B7D6B] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                    <path d="M8,7 L8,11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="8" cy="4.8" r="0.9" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#2D2A24] mb-1">Studio note</h4>
                  <p className="text-sm text-[#6B5D4E] leading-relaxed">
                    The workshop closes for the rice harvest during the second week of October.
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.1}>
              <div className="flex items-start gap-4 rounded-lg bg-[#7A8B5E]/10 border border-[#7A8B5E]/40 p-5 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)]">
                <div className="w-8 h-8 rounded-full bg-[#7A8B5E]/20 text-[#7A8B5E] flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#2D2A24] mb-1">Glaze fired true</h4>
                  <p className="text-sm text-[#6B5D4E] leading-relaxed">
                    Kiln 2 reached temperature and cooled evenly. The celadon batch is ready for collection.
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="flex items-start gap-4 rounded-lg bg-[#C86A4A]/10 border border-[#C86A4A]/40 p-5 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)]">
                <div className="w-8 h-8 rounded-full bg-[#C86A4A]/15 text-[#C86A4A] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
                    <path d="M8,2 L14.5,13.5 L1.5,13.5 Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
                    <path d="M8,6.5 L8,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="12" r="0.8" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#2D2A24] mb-1">Kiln running warm</h4>
                  <p className="text-sm text-[#6B5D4E] leading-relaxed">
                    Afternoon firing is 40 degrees above the curve. Reduce the damper before the glaze begins to run.
                  </p>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div className="flex items-start gap-4 rounded-lg bg-[#A04A2A]/10 border border-[#A04A2A]/50 p-5 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)]">
                <div className="w-8 h-8 rounded-full bg-[#A04A2A]/15 text-[#A04A2A] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 16 16" className="w-4 h-4" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                    <path d="M5.8,5.8 L10.2,10.2 M10.2,5.8 L5.8,10.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#2D2A24] mb-1">Firing failed</h4>
                  <p className="text-sm text-[#6B5D4E] leading-relaxed">
                    A cold draft cracked three vessels overnight. Even failure keeps its warmth here — deep fired clay, never a cold red.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 13. DATA TABLE (STUDIO LEDGER)                                */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Studio Ledger"
            title="The Commission Book"
            desc="Every project is logged by hand in the studio ledger — material, maker, and state of the work. Page through the entries."
          />

          <RevealBlock delay={0.1}>
            <div className="rounded-lg bg-white/60 border border-[#D4BFA5]/50 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#E8DED1]/70 text-left">
                      <th className="px-5 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium">Project</th>
                      <th className="px-5 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium">Material</th>
                      <th className="px-5 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium">Lead</th>
                      <th className="px-5 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium">Status</th>
                      <th className="px-5 py-3.5 text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] font-medium text-right">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row, i) => (
                      <tr
                        key={row.project}
                        className={`hover:bg-[#E8DED1]/40 transition-colors duration-200 ${
                          i < visibleRows.length - 1 ? "border-b border-[#D4BFA5]/30" : ""
                        }`}
                      >
                        <td className="px-5 py-4 font-medium text-[#2D2A24]">{row.project}</td>
                        <td className="px-5 py-4 text-[#6B5D4E]">{row.material}</td>
                        <td className="px-5 py-4 text-[#6B5D4E]">{row.lead}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium ${statusStyles[row.status]}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-xs text-[#8B7D6B]">{row.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-5 py-4 bg-[#E8DED1]/40 border-t border-[#D4BFA5]/40">
                <span className="text-xs text-[#8B7D6B]">
                  Page {ledgerPage + 1} of {ledgerPageCount} · {ledgerRows.length} entries
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLedgerPage((p) => Math.max(0, p - 1))}
                    disabled={ledgerPage === 0}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[#D4BFA5] text-[#6B5D4E] hover:bg-[#E8DED1] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    &larr; Earlier
                  </button>
                  {Array.from({ length: ledgerPageCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLedgerPage(i)}
                      aria-pressed={ledgerPage === i}
                      className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                        ledgerPage === i
                          ? "bg-[#C86A4A] text-[#F5F0EB]"
                          : "text-[#6B5D4E] hover:bg-[#E8DED1]"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setLedgerPage((p) => Math.min(ledgerPageCount - 1, p + 1))}
                    disabled={ledgerPage === ledgerPageCount - 1}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-[#D4BFA5] text-[#6B5D4E] hover:bg-[#E8DED1] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Later &rarr;
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 14. TESTIMONIAL / BLOCKQUOTE                                  */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24 bg-[#E8DED1]/50 relative overflow-hidden">
        <BlobShape fill="#C86A4A" className="absolute -top-20 -left-16 w-72 h-72 opacity-[0.05] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <SectionHeading label="Voices" title="What Clients Carry Home" />

          <RevealBlock delay={0.1}>
            <figure className="rounded-lg bg-[#F5F0EB] border border-[#D4BFA5]/50 p-8 md:p-12 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)] text-center">
              <span className="font-serif text-6xl leading-none text-[#C86A4A]/40 select-none" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="font-serif text-xl md:text-2xl font-medium text-[#2D2A24] leading-relaxed -mt-4">
                {quote.quote}
              </blockquote>
              <figcaption className="mt-6">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <span className="h-px w-8 bg-[#D4BFA5]" />
                  <span className="text-sm font-medium text-[#2D2A24]">{quote.author}</span>
                  <span className="h-px w-8 bg-[#D4BFA5]" />
                </div>
                <span className="text-xs text-[#7A8B5E] uppercase tracking-[0.15em]">{quote.role}</span>
              </figcaption>
            </figure>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                type="button"
                onClick={() => setQuoteIndex((quoteIndex - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-lg border border-[#D4BFA5] text-[#6B5D4E] hover:bg-[#C86A4A] hover:border-[#C86A4A] hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <span aria-hidden="true">&larr;</span>
              </button>
              <div className="flex items-center gap-2.5">
                {testimonials.map((t, i) => (
                  <button
                    key={t.author}
                    type="button"
                    onClick={() => setQuoteIndex(i)}
                    aria-label={`Show testimonial from ${t.author}`}
                    aria-pressed={quoteIndex === i}
                    className={`rounded-full transition-all duration-300 ${
                      quoteIndex === i ? "w-6 h-2 bg-[#C86A4A]" : "w-2 h-2 bg-[#D4BFA5] hover:bg-[#C86A4A]/50"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setQuoteIndex((quoteIndex + 1) % testimonials.length)}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-lg border border-[#D4BFA5] text-[#6B5D4E] hover:bg-[#C86A4A] hover:border-[#C86A4A] hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 15. DIVIDERS AND DECORATORS                                   */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Ornament"
            title="Dividers & Decorators"
            desc="Ornament stays close to nature: hairlines like paper edges, dots like seeds, blobs like stones found in the river."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <RevealBlock delay={0.05}>
              <div className="rounded-lg bg-white/60 border border-[#D4BFA5]/50 p-8 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)] space-y-8 h-full">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-4">Warm hairline</p>
                  <div className="border-t border-[#D4BFA5] opacity-60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-4">Seed divider</p>
                  <div className="flex items-center gap-2">
                    <span className="flex-1 h-px bg-[#D4BFA5]/50" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86A4A]/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B5E]/40" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4BFA5]" />
                    <span className="flex-1 h-px bg-[#D4BFA5]/50" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-4">Labeled rule</p>
                  <div className="flex items-center gap-4">
                    <span className="flex-1 h-px bg-[#D4BFA5]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A8B5E]">Chapter Two</span>
                    <span className="flex-1 h-px bg-[#D4BFA5]" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-4">Grown gradient</p>
                  <div className="h-1 rounded-full bg-gradient-to-r from-[#C86A4A] via-[#D4BFA5] to-[#7A8B5E]" />
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="rounded-lg bg-white/60 border border-[#D4BFA5]/50 p-8 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)] h-full">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-6">River stones</p>
                <div className="flex items-end justify-center gap-6 mb-8">
                  <BlobShape fill="#D4BFA5" className="w-20 h-20 opacity-70" />
                  <BlobShape fill="#C86A4A" className="w-14 h-14 opacity-50" />
                  <BlobShape fill="#7A8B5E" className="w-10 h-10 opacity-55" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-4">Organic corner accents</p>
                <div className="relative h-24 rounded-lg bg-[#E8DED1]/60 overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#C86A4A]/15 rounded-full blur-xl" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#7A8B5E]/15 rounded-full blur-lg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-[#8B7D6B] tracking-wide">Blurred earth tones behind content</span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 16. FORM LANGUAGE: RADII AND SHADOWS                          */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24 bg-[#E8DED1]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="Form Language"
            title="Pebble Radii & Warm Shadows"
            desc="rounded-lg is the water line: below it edges cut, above it forms turn into bubbles. Shadows always carry brown, never gray."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <RevealBlock delay={0.05}>
              <div className="rounded-lg bg-[#F5F0EB] border border-[#D4BFA5]/50 p-8 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)] h-full">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-6">Radius scale</p>
                <div className="flex flex-wrap items-end gap-5">
                  {[
                    { label: "rounded-none", radius: "0", allowed: false },
                    { label: "rounded-sm", radius: "0.125rem", allowed: false },
                    { label: "rounded-md", radius: "0.375rem", allowed: true },
                    { label: "rounded-lg", radius: "0.5rem", allowed: true },
                  ].map((r) => (
                    <div key={r.label} className="flex flex-col items-center gap-2.5">
                      <div
                        className={`w-16 h-16 flex items-center justify-center border-2 ${
                          r.allowed
                            ? "bg-[#C86A4A]/12 border-[#C86A4A]/50"
                            : "bg-[#D4BFA5]/20 border-[#D4BFA5]/60 border-dashed"
                        }`}
                        style={{ borderRadius: r.radius }}
                      >
                        {r.allowed ? (
                          <CheckIcon className="w-4 h-4 text-[#7A8B5E]" />
                        ) : (
                          <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 text-[#8B7D6B]" aria-hidden="true">
                            <path d="M2.5,2.5 L9.5,9.5 M9.5,2.5 L2.5,9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-[10px] tracking-wide ${r.allowed ? "text-[#2D2A24]/70" : "text-[#8B7D6B] line-through"}`}>
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-[#8B7D6B] leading-relaxed">
                  The standard is rounded-lg everywhere; rounded-md only for the smallest chips. Full circles are reserved for decorative dots and stones.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="rounded-lg bg-[#F5F0EB] border border-[#D4BFA5]/50 p-8 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.08)] h-full">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B] mb-6">Shadow scale</p>
                <div className="space-y-5">
                  {[
                    { label: "Resting", shadow: "0 2px 10px -3px rgba(45,42,36,0.08)", desc: "Inputs, chips, quiet elements" },
                    { label: "Card", shadow: "0 4px 20px -4px rgba(45,42,36,0.12)", desc: "Default panels and cards" },
                    { label: "Lifted", shadow: "0 8px 30px -6px rgba(45,42,36,0.18)", desc: "Hover states and dialogs" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg bg-[#F5F0EB] border border-[#D4BFA5]/40 px-5 py-4 flex items-center justify-between gap-4"
                      style={{ boxShadow: s.shadow }}
                    >
                      <div>
                        <div className="text-sm font-medium text-[#2D2A24]">{s.label}</div>
                        <div className="text-xs text-[#8B7D6B]">{s.desc}</div>
                      </div>
                      <code className="text-[9px] font-mono text-[#8B7D6B] text-right leading-tight">
                        rgba(45,42,36,*)
                      </code>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs text-[#8B7D6B] leading-relaxed">
                  Every shadow is mixed from #2D2A24 warm brown ink — the shadow of a vessel on a wooden table, not on concrete.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 17. DO / DON'T RULES                                          */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label="The Grain"
            title="Work With It, Never Against It"
            desc="The style's constitution, condensed. Follow the grain of the material and the palette stays honest."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <div className="rounded-lg bg-white/60 border border-[#D4BFA5]/50 border-t-2 border-t-[#7A8B5E] p-7 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)] h-full">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-6 h-6 rounded-full bg-[#7A8B5E] text-[#F5F0EB] flex items-center justify-center">
                    <CheckIcon className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-[0.15em] text-[#7A8B5E]">Do</span>
                </div>
                <ul className="space-y-3.5">
                  {doRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7A8B5E] flex-shrink-0" />
                      <span className="text-sm text-[#2D2A24]/75 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div className="rounded-lg bg-white/60 border border-[#D4BFA5]/50 border-t-2 border-t-[#C86A4A]/60 p-7 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)] h-full">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-6 h-6 rounded-full bg-[#C86A4A]/15 text-[#C86A4A] flex items-center justify-center">
                    <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true">
                      <path d="M3,3 L9,9 M9,3 L3,9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium uppercase tracking-[0.15em] text-[#C86A4A]">Don&apos;t</span>
                </div>
                <ul className="space-y-3.5">
                  {dontRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4BFA5] flex-shrink-0" />
                      <span className="text-sm text-[#6B5D4E] leading-relaxed line-through decoration-[#D4BFA5]">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 18. STUDIO NOTES (FAQ ACCORDION)                              */}
      {/* ============================================================ */}
      <section className="px-6 py-16 md:py-24 bg-[#E8DED1]/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            label="Studio Notes"
            title="Questions from the Workshop"
            desc="The questions visitors ask most often, answered the way we would over tea."
          />

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <RevealBlock key={faq.q} delay={i * 0.05}>
                  <div
                    className={`rounded-lg border transition-all duration-200 ${
                      open
                        ? "bg-[#F5F0EB] border-[#C86A4A]/40 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.12)]"
                        : "bg-white/60 border-[#D4BFA5]/50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                    >
                      <span className="font-serif text-base font-medium text-[#2D2A24]">{faq.q}</span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          open ? "bg-[#C86A4A] text-[#F5F0EB] rotate-45" : "bg-[#E8DED1] text-[#6B5D4E]"
                        }`}
                      >
                        <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true">
                          <path d="M6,2 L6,10 M2,6 L10,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    {open ? (
                      <div className="px-6 pb-5 -mt-1">
                        <div className="border-t border-[#D4BFA5]/40 pt-4">
                          <p className="text-sm text-[#6B5D4E] leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 19. JOURNAL / NEWSLETTER                                      */}
      {/* ============================================================ */}
      <section id="journal" className="px-6 py-16 md:py-24 relative overflow-hidden scroll-mt-20">
        <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-[#7A8B5E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <SectionHeading
            label="Field Notes"
            title="A Letter Four Times a Year"
            desc="Seasonal notes from the studio: firings, harvests, and what the materials taught us. Paper mail energy, sent by email."
          />

          <RevealBlock delay={0.1}>
            <div className="rounded-lg bg-[#E8DED1] p-8 md:p-10 shadow-[0_4px_20px_-4px_rgba(45,42,36,0.12)]">
              {newsSubscribed ? (
                <div className="text-center py-4">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#C86A4A]/60" />
                    <span className="w-2 h-2 rounded-full bg-[#7A8B5E]/60" />
                    <span className="w-2 h-2 rounded-full bg-[#D4BFA5]" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#2D2A24] mb-2">Welcome to the field notes</h3>
                  <p className="text-sm text-[#6B5D4E] leading-relaxed">
                    The autumn letter arrives after the first kiln cools. Until then, may your corners stay round.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setNewsSubscribed(false);
                      setNewsEmail("");
                    }}
                    className="mt-5 text-xs font-medium text-[#C86A4A] hover:text-[#A04A2A] transition-colors duration-200"
                  >
                    Use a different address
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsEmail.trim() !== "") setNewsSubscribed(true);
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    onFocus={() => setFocusedField("newsletter")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 bg-[#F5F0EB] border rounded-lg text-sm text-[#2D2A24] placeholder:text-[#2D2A24]/40 focus:outline-none transition-all duration-200"
                    style={fieldStyle("newsletter")}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#C86A4A] text-white text-sm font-medium rounded-lg hover:bg-[#B55A3A] active:bg-[#A04A2A] shadow-[0_2px_12px_-3px_rgba(200,106,74,0.3)] transition-all duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 20. FOOTER                                                    */}
      {/* ============================================================ */}
      <footer className="bg-[#E8DED1] border-t border-[#D4BFA5]/40 px-6 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#C86A4A] flex items-center justify-center shadow-[0_2px_12px_-3px_rgba(200,106,74,0.4)]">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
                  <path
                    d="M9,3 L15,3 L14.4,6.5 C17.5,8 19,11 19,14.5 C19,18.5 16,21 12,21 C8,21 5,18.5 5,14.5 C5,11 6.5,8 9.6,6.5 Z"
                    fill="#F5F0EB"
                  />
                </svg>
              </div>
              <span className="font-serif text-lg font-medium text-[#2D2A24]">Clay &amp; Olive</span>
            </div>
            <p className="text-sm text-[#2D2A24]/65 leading-relaxed">
              Design studio for warm, grounded spaces and objects made by human hands.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C86A4A]/50" />
              <span className="inline-block w-2 h-2 rounded-full bg-[#7A8B5E]/50" />
              <span className="inline-block w-2 h-2 rounded-full bg-[#D4BFA5]" />
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] mb-3">Studio</p>
            <p className="text-sm text-[#2D2A24]/65 leading-loose">
              Carrer del Sol 14
              <br />
              Barcelona 08002
              <br />
              Seto annex, Aichi
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#7A8B5E] mb-3">Elsewhere</p>
            <ul className="text-sm text-[#2D2A24]/65 leading-loose">
              <li>
                <a href="#palette" className="hover:text-[#C86A4A] transition-colors duration-200">Palette</a>
              </li>
              <li>
                <a href="#materials" className="hover:text-[#C86A4A] transition-colors duration-200">Materials</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#C86A4A] transition-colors duration-200">Projects</a>
              </li>
              <li>
                <Link href="/styles/warm-organic" className="hover:text-[#C86A4A] transition-colors duration-200">
                  Warm Organic docs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-[#D4BFA5]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#2D2A24]/50">&copy; 2026 StyleKit · Warm Organic · Crafted with intention</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7D6B]">
            Warm shadows · Round pebbles · Never pure black
          </p>
        </div>
      </footer>
    </div>
  );
}
