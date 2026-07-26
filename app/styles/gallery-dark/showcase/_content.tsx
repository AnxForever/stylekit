"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UnsplashAttribution } from "@/components/styles/unsplash-attribution";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Collection data                                                    */
/* ------------------------------------------------------------------ */

type Category = "all" | "architecture" | "street" | "portrait" | "landscape";

interface Work {
  id: number;
  title: string;
  medium: string;
  year: string;
  category: Exclude<Category, "all">;
  w: number;
  h: number;
}

const works: Work[] = [
  { id: 0, title: "Edge of the City", medium: "35mm · Ilford HP5", year: "2026", category: "street", w: 3, h: 2 },
  { id: 1, title: "Silent Morning", medium: "Digital · Fuji GFX", year: "2025", category: "portrait", w: 2, h: 3 },
  { id: 2, title: "Concrete Shadows", medium: "35mm · Kodak Portra", year: "2025", category: "architecture", w: 4, h: 3 },
  { id: 3, title: "Glass House", medium: "Medium Format · Velvia", year: "2024", category: "architecture", w: 3, h: 2 },
  { id: 4, title: "Fog Sequence", medium: "Digital · Leica M11", year: "2024", category: "landscape", w: 2, h: 2 },
  { id: 5, title: "Neon Reflections", medium: "35mm · Cinestill", year: "2026", category: "street", w: 3, h: 4 },
  { id: 6, title: "The Passage", medium: "Large Format", year: "2025", category: "architecture", w: 4, h: 3 },
  { id: 7, title: "Coastal Light", medium: "Digital · Hasselblad", year: "2024", category: "landscape", w: 3, h: 2 },
  { id: 8, title: "Urban Grid", medium: "Medium Format · Portra", year: "2026", category: "architecture", w: 2, h: 2 },
  { id: 9, title: "Quiet Morning", medium: "35mm · Tri-X", year: "2025", category: "portrait", w: 3, h: 2 },
];

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "architecture", label: "Architecture" },
  { key: "street", label: "Street" },
  { key: "portrait", label: "Portrait" },
  { key: "landscape", label: "Landscape" },
];

const aspectClass = (w: number, h: number) => {
  const r = w / h;
  if (r >= 1.5) return "md:col-span-2 md:row-span-1";
  if (r <= 0.67) return "md:col-span-1 md:row-span-2";
  if (r >= 1.2) return "md:col-span-2 md:row-span-1";
  return "md:col-span-1 md:row-span-1";
};

/* Generated images may exist on the server; runtime onError falls back
   to a darkroom-gradient placeholder so the grid never breaks. */
function styleImageUrl(index: number): string {
  return `/images/styles/gallery-dark/${String(index + 1).padStart(2, "0")}.webp`;
}

/* ------------------------------------------------------------------ */
/*  Editions ledger (data table + pagination)                          */
/* ------------------------------------------------------------------ */

type EditionStatus = "Available" | "Low stock" | "Sold";

interface EditionRow {
  work: string;
  year: string;
  edition: string;
  size: string;
  price: string;
  status: EditionStatus;
}

const editions: EditionRow[] = [
  { work: "Fog Sequence", year: "2024", edition: "3 / 10", size: "80 x 120 cm", price: "$2,400", status: "Available" },
  { work: "Edge of the City", year: "2026", edition: "8 / 10", size: "60 x 90 cm", price: "$1,800", status: "Low stock" },
  { work: "Concrete Shadows", year: "2025", edition: "10 / 10", size: "100 x 150 cm", price: "$3,200", status: "Sold" },
  { work: "Glass House", year: "2024", edition: "2 / 8", size: "80 x 120 cm", price: "$2,600", status: "Available" },
  { work: "Neon Reflections", year: "2026", edition: "5 / 12", size: "60 x 90 cm", price: "$1,600", status: "Available" },
  { work: "The Passage", year: "2025", edition: "8 / 8", size: "120 x 180 cm", price: "$4,800", status: "Sold" },
  { work: "Coastal Light", year: "2024", edition: "9 / 10", size: "80 x 120 cm", price: "$2,200", status: "Low stock" },
  { work: "Urban Grid", year: "2026", edition: "1 / 10", size: "60 x 60 cm", price: "$1,400", status: "Available" },
  { work: "Silent Morning", year: "2025", edition: "9 / 10", size: "90 x 120 cm", price: "$2,800", status: "Low stock" },
  { work: "Quiet Morning", year: "2025", edition: "4 / 10", size: "60 x 90 cm", price: "$1,700", status: "Available" },
];

const EDITIONS_PER_PAGE = 5;

const statusBadge: Record<EditionStatus, string> = {
  Available: "border-[#2A2A2A] text-[#999999]",
  "Low stock": "border-[#C4956A]/50 text-[#C4956A]",
  Sold: "border-[#2A2A2A] text-[#4A4A4A] line-through decoration-[#4A4A4A]",
};

/* ------------------------------------------------------------------ */
/*  Programme (tabs)                                                   */
/* ------------------------------------------------------------------ */

type ProgrammeKey = "onview" | "upcoming" | "past";

const PROGRAMME: Record<ProgrammeKey, { title: string; venue: string; dates: string; note: string }[]> = {
  onview: [
    { title: "Urban Solitude", venue: "Main Hall", dates: "Mar 14 — Jun 02, 2026", note: "Twelve photographs of empty city spaces" },
    { title: "Night Structures", venue: "Annex", dates: "Apr 05 — May 18, 2026", note: "Architecture after the lights go out" },
  ],
  upcoming: [
    { title: "Chromatic Silence", venue: "Main Hall", dates: "Jun 20 — Sep 07, 2026", note: "Color work from the coastal series" },
    { title: "Contact Sheets", venue: "Print Room", dates: "Jul 11 — Aug 30, 2026", note: "Working proofs, annotated by hand" },
  ],
  past: [
    { title: "First Light", venue: "Main Hall", dates: "Oct 03 — Dec 21, 2025", note: "Dawn studies, 2019 — 2024" },
    { title: "The Passage", venue: "Annex", dates: "May 09 — Aug 17, 2025", note: "Large-format interiors" },
    { title: "Tri-X Years", venue: "Print Room", dates: "Jan 18 — Mar 29, 2025", note: "A decade on one film stock" },
  ],
};

const PROGRAMME_TABS: { key: ProgrammeKey; label: string }[] = [
  { key: "onview", label: "On View" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

/* ------------------------------------------------------------------ */
/*  Palette / typography specimens                                     */
/* ------------------------------------------------------------------ */

const swatches = [
  { hex: "#0A0A0A", name: "Field", role: "Page background — the darkened room", border: true },
  { hex: "#1A1A1A", name: "Surface", role: "Cards, panels, elevated layers", border: true },
  { hex: "#2A2A2A", name: "Hairline", role: "Every border and divider, 1px only", border: false },
  { hex: "#C4956A", name: "Amber", role: "Metadata only — dates, labels, wayfinding", border: false },
  { hex: "#FFFFFF", name: "Light", role: "Headlines and body, always font-light", border: false },
  { hex: "#666666", name: "Caption", role: "Secondary text and long captions", border: false },
];

const editionProgress = [
  { work: "Edge of the City", sold: 8, total: 10 },
  { work: "Silent Morning", sold: 9, total: 10 },
  { work: "Fog Sequence", sold: 3, total: 10 },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function SectionHead({ no, kicker, title, sub }: { no: string; kicker: string; title: string; sub?: string }) {
  return (
    <div className="gd-reveal mb-10 md:mb-14">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-[#C4956A] tabular-nums">{no}</span>
        <span className="w-6 h-px bg-[#2A2A2A]" />
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#C4956A] font-light">{kicker}</p>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-12">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight leading-[1.05] text-white max-w-2xl">{title}</h2>
        {sub && <p className="mt-4 md:mt-0 text-sm text-[#666666] font-light leading-relaxed max-w-sm md:text-right">{sub}</p>}
      </div>
    </div>
  );
}

/* A simulated photograph: pure CSS darkroom tones, no binary asset. */
function FauxPhoto({ variant, className = "" }: { variant: "spot" | "horizon" | "window" | "figure"; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#141414] ${className}`}>
      {variant === "spot" && (
        <>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 30%, #333330 0%, #1A1A19 55%, #0E0E0E 100%)" }} />
          <div className="absolute bottom-0 inset-x-0 h-1/3" style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }} />
        </>
      )}
      {variant === "horizon" && (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #23231F 0%, #171715 58%, #0E0E0E 62%, #121212 100%)" }} />
          <div className="absolute left-0 right-0 h-px bg-[#3A3A34] opacity-70" style={{ top: "60%" }} />
        </>
      )}
      {variant === "window" && (
        <>
          <div className="absolute inset-0 bg-[#121211]" />
          <div className="absolute top-0 bottom-0 w-1/4 left-[38%]" style={{ background: "linear-gradient(to bottom, #38352E 0%, #1C1B18 70%, #111110 100%)" }} />
          <div className="absolute top-0 bottom-0 w-px left-[38%] bg-[#3A3A3A] opacity-40" />
          <div className="absolute top-0 bottom-0 w-px left-[63%] bg-[#3A3A3A] opacity-40" />
        </>
      )}
      {variant === "figure" && (
        <>
          <div className="absolute inset-0 bg-[#101010]" />
          <div className="absolute rounded-full" style={{ width: "58%", height: "58%", left: "21%", top: "24%", background: "radial-gradient(circle, #302C26 0%, #191816 60%, transparent 75%)" }} />
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Showcase                                                           */
/* ------------------------------------------------------------------ */

export default function GalleryDarkShowcase() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<Category>("all");
  const [programme, setProgramme] = useState<ProgrammeKey>("onview");
  const [editionsPage, setEditionsPage] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(".hero-bg", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(".hero-title", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-meta", {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.fromTo(
        ".gallery-item",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8, stagger: 0.08, ease: "power3.out", clearProps: "all",
          scrollTrigger: { trigger: ".gallery-grid", start: "top 82%", once: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".gd-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power2.out", clearProps: "all",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const goNext = useCallback(() => {
    if (lightbox !== null) setLightbox((lightbox + 1) % works.length);
  }, [lightbox]);
  const goPrev = useCallback(() => {
    if (lightbox !== null) setLightbox((lightbox - 1 + works.length) % works.length);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, goNext, goPrev]);

  const visibleWorks = filter === "all" ? works : works.filter((w) => w.category === filter);
  const pageCount = Math.ceil(editions.length / EDITIONS_PER_PAGE);
  const pageRows = editions.slice(editionsPage * EDITIONS_PER_PAGE, (editionsPage + 1) * EDITIONS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans font-light">
      {/* ============================================================ */}
      {/* NAV — gallery masthead                                       */}
      {/* ============================================================ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-sm border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/styles/gallery-dark" className="group flex items-center gap-1.5 text-[#666666] hover:text-white text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 shrink-0">
              <span className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
              <span className="hidden sm:inline">Back to Docs</span>
            </Link>
            <span className="w-px h-3 bg-[#2A2A2A]" />
            <span className="text-white text-xs tracking-[0.25em] uppercase truncate">M. Hale</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-[11px] text-[#666666] uppercase tracking-[0.15em]">
            {[
              { label: "Works", href: "#works" },
              { label: "Palette", href: "#palette" },
              { label: "Programme", href: "#programme" },
              { label: "Editions", href: "#editions" },
              { label: "Visit", href: "#visit" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="hover:text-white transition-colors duration-300">
                {item.label}
              </a>
            ))}
          </nav>
          <Link href="/" className="text-[11px] uppercase tracking-[0.15em] text-[#C4956A] hover:text-white transition-colors duration-300">
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO — parallax dark field with viewfinder frame             */}
      {/* ============================================================ */}
      <section ref={heroRef} className="hero-section relative h-screen w-full overflow-hidden">
        <div className="hero-bg absolute inset-0 will-change-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-[#222] via-[#141414] to-[#0A0A0A]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="relative w-[600px] h-[400px] border border-[#2A2A2A]">
              <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-[#C4956A]" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-[#C4956A]" />
              <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-[#C4956A]" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-[#C4956A]" />
            </div>
          </div>
        </div>
        <div className="hero-title absolute inset-0 flex items-center justify-center will-change-transform">
          <div className="text-center px-6">
            <p className="text-[#C4956A] text-[11px] md:text-xs tracking-[0.3em] uppercase mb-4">Featured Series</p>
            <h1 className="text-5xl md:text-8xl font-light leading-[0.95] tracking-tight">Urban<br />Solitude</h1>
          </div>
        </div>
        <div className="hero-meta absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-12 md:pb-16 will-change-transform">
          <div className="max-w-2xl">
            <p className="text-sm md:text-base text-[#888888] leading-relaxed max-w-xl">A photographic exploration of empty spaces in the modern city.</p>
            <div className="flex items-center gap-4 mt-4 text-xs text-[#555555]">
              <span>12 photographs</span>
              <span className="w-px h-3 bg-[#333]" />
              <span>2024&ndash;2026</span>
              <span className="w-px h-3 bg-[#333]" />
              <a href="#works" className="text-[#C4956A] hover:text-white transition-colors">View series &rarr;</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] text-[#444444] tracking-[0.2em] animate-pulse">
          <span>SCROLL</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M3 7l3 3 3-3" stroke="#666" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/* STATEMENT                                                    */}
      {/* ============================================================ */}
      <section className="px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 md:gap-20">
          <div className="md:col-span-2">
            <p className="gd-reveal text-[10px] tracking-[0.25em] uppercase text-[#C4956A]">Statement</p>
          </div>
          <div className="gd-reveal md:col-span-3 space-y-6">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-[#CCCCCC]">
              &ldquo;I am drawn to the spaces between things &mdash; the pause between footsteps,
              the light that catches a window at dusk, the geometry of a shadow across concrete.&rdquo;
            </p>
            <p className="text-sm text-[#666666] leading-relaxed">
              This series collects images made over three years across Tokyo, Berlin, and New York.
              The gallery keeps out of the way: a near-black field, hairline rules, and one warm amber
              reserved for the wall labels.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WORKS — filterable grid + lightbox                           */}
      {/* ============================================================ */}
      <section id="works" className="scroll-mt-14 px-6 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-12">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4956A]" />
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-[#C4956A]">Works</h2>
              <span className="font-mono text-[10px] text-[#4A4A4A] tabular-nums">{visibleWorks.length} / {works.length}</span>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-5 text-xs">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`tracking-[0.05em] transition-colors duration-300 ${filter === f.key ? "text-white" : "text-[#555555] hover:text-white"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="gallery-grid grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[260px]">
            {visibleWorks.map((work) => (
              <button
                key={work.id}
                onClick={() => setLightbox(work.id)}
                className={`gallery-item group relative overflow-hidden bg-[#1A1A1A] rounded-sm cursor-pointer text-left ${aspectClass(work.w, work.h)} will-change-transform`}
              >
                <img
                  src={styleImageUrl(work.id)}
                  alt={work.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgErrors.has(work.id) ? "hidden" : ""}`}
                  onError={() => setImgErrors((prev) => new Set(prev).add(work.id))}
                />
                {imgErrors.has(work.id) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#222] to-[#141414] group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-sm md:text-base">{work.title}</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mt-1">{work.medium}</p>
                </div>
                <div className="absolute top-2 right-2 md:top-3 md:right-3 text-[10px] text-[#C4956A] font-mono">{work.year}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PALETTE — the dark field                                     */}
      {/* ============================================================ */}
      <section id="palette" className="scroll-mt-14 border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="01"
            kicker="Palette"
            title="Hierarchy by grayscale, warmth by exception"
            sub="Three grays build every layer of depth. One amber, sampled from a darkroom safelight, is spent only on metadata."
          />
          <div className="gd-reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {swatches.map((s) => (
              <div key={s.hex} className="group">
                <div
                  className={`h-28 rounded-sm flex items-end p-3 transition-colors duration-300 ${s.border ? "border border-[#2A2A2A] group-hover:border-[#4A4A4A]" : ""}`}
                  style={{ backgroundColor: s.hex }}
                >
                  <span className="font-mono text-[9px] tracking-[0.1em]" style={{ color: s.hex === "#FFFFFF" || s.hex === "#C4956A" ? "#0A0A0A" : "#666666" }}>
                    {s.hex}
                  </span>
                </div>
                <p className="mt-3 text-xs text-white tracking-[0.05em]">{s.name}</p>
                <p className="mt-1 text-[11px] text-[#666666] leading-relaxed">{s.role}</p>
              </div>
            ))}
          </div>
          <p className="gd-reveal mt-8 text-[11px] text-[#4A4A4A] leading-relaxed max-w-2xl">
            No gradients for decoration, no colored shadows, no hue-based sections &mdash; when everything is
            gray, the photographs supply all the color the room needs.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TYPOGRAPHY — two speeds of text                              */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="02"
            kicker="Typography"
            title="Oversized and ultra-light, whispered and tracked"
            sub="Headlines arrive huge but weightless. Metadata shrinks to ten pixels and spreads its letters like a wall label."
          />
          <div className="space-y-0">
            {[
              { label: "Display", spec: "text-7xl / font-light / tracking-tight", node: <p className="text-5xl md:text-7xl font-light tracking-tight leading-[0.95]">The Space Between</p> },
              { label: "Headline", spec: "text-3xl / font-light", node: <p className="text-2xl md:text-3xl font-light tracking-tight text-[#CCCCCC]">Selected works, 2024 &mdash; 2026</p> },
              { label: "Body", spec: "text-sm / text-[#999999] / leading-relaxed", node: <p className="text-sm text-[#999999] leading-relaxed max-w-xl">Each print is developed by hand and editioned in small runs. The catalogue text stays quiet, set small and light, so the plates keep the room.</p> },
              { label: "Caption", spec: "text-xs / text-[#666666]", node: <p className="text-xs text-[#666666] tracking-[0.05em]">Archival pigment print, 80 x 120 cm, edition of 10</p> },
              { label: "Wall label", spec: "text-[10px] / uppercase / tracking-[0.15em] / #C4956A", node: <p className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A]">Tokyo, 2026 &mdash; Hall B</p> },
            ].map((row) => (
              <div key={row.label} className="gd-reveal grid md:grid-cols-4 gap-4 md:gap-8 items-baseline border-t border-[#2A2A2A] py-8 first:border-t-0">
                <div className="md:col-span-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4956A]">{row.label}</p>
                  <p className="font-mono text-[10px] text-[#4A4A4A] mt-2 leading-relaxed">{row.spec}</p>
                </div>
                <div className="md:col-span-3">{row.node}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BUTTONS — hairline controls                                  */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="03"
            kicker="Buttons"
            title="Controls that never raise their voice"
            sub="No fills that shout, no shadows that float. A hairline border warms to amber on hover and that is the whole event."
          />
          <div className="gd-reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {[
              {
                name: "Surface", note: "Default action",
                node: <button className="px-5 py-2.5 bg-[#1A1A1A] text-white text-sm tracking-wider border border-[#2A2A2A] rounded-sm hover:border-[#C4956A] hover:bg-[#2A2A2A] transition-all duration-300">Exhibition Info</button>,
              },
              {
                name: "Outline", note: "Secondary action",
                node: <button className="px-5 py-2.5 bg-transparent text-[#999999] text-sm tracking-wider border border-[#2A2A2A] rounded-sm hover:text-white hover:border-[#4A4A4A] transition-all duration-300">View Catalogue</button>,
              },
              {
                name: "Amber hairline", note: "Acquisition emphasis",
                node: <button className="px-5 py-2.5 bg-transparent text-[#C4956A] text-sm tracking-wider border border-[#C4956A]/60 rounded-sm hover:border-[#C4956A] hover:bg-[#C4956A]/10 transition-all duration-300">Inquire</button>,
              },
              {
                name: "Text link", note: "Inline wayfinding",
                node: <button className="text-[11px] uppercase tracking-[0.2em] text-[#C4956A] hover:text-white transition-colors duration-300">View series &rarr;</button>,
              },
              {
                name: "Icon", note: "Lightbox navigation",
                node: (
                  <button aria-label="Next work" className="w-10 h-10 flex items-center justify-center border border-[#2A2A2A] rounded-sm text-[#666666] hover:text-white hover:border-[#C4956A] transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1" /></svg>
                  </button>
                ),
              },
              {
                name: "Disabled", note: "Edition sold out",
                node: <button disabled className="px-5 py-2.5 bg-[#111111] text-[#4A4A4A] text-sm tracking-wider border border-[#1A1A1A] rounded-sm cursor-not-allowed">Sold Out</button>,
              },
            ].map((b) => (
              <div key={b.name}>
                <div className="min-h-[52px] flex items-center">{b.node}</div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-[#C4956A]">{b.name}</p>
                <p className="mt-1 text-[11px] text-[#666666]">{b.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CARDS — three anatomies                                      */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="04"
            kicker="Cards"
            title="The image is the headline"
            sub="No card ever titles its picture from above. Full-bleed frame first, then a wall label of amber metadata below."
          />
          <div className="gd-reveal grid md:grid-cols-3 gap-6">
            {/* Exhibition card */}
            <article className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm overflow-hidden hover:border-[#4A4A4A] transition-colors duration-300">
              <FauxPhoto variant="spot" className="aspect-[4/3]" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A]">Mar 14 &mdash; Jun 02</span>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#C4956A] border border-[#C4956A]/50 rounded-sm px-1.5 py-0.5">On view</span>
                </div>
                <h3 className="text-white text-sm tracking-wide mt-2">Urban Solitude</h3>
                <p className="text-[#4A4A4A] text-xs mt-1">Main Hall &middot; Twelve photographs</p>
              </div>
            </article>
            {/* Artist card */}
            <article className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-sm overflow-hidden hover:border-[#4A4A4A] transition-colors duration-300 flex">
              <FauxPhoto variant="figure" className="w-2/5 shrink-0" />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A]">Photographer</span>
                  <h3 className="text-white text-sm tracking-wide mt-2">Mara Hale</h3>
                  <p className="text-[#4A4A4A] text-xs mt-1 leading-relaxed">b. 1987, Kyoto. Works between Tokyo and Berlin.</p>
                </div>
                <p className="text-[10px] text-[#666666] tracking-[0.1em] mt-4">34 works in collection</p>
              </div>
            </article>
            {/* Edition card */}
            <article className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm overflow-hidden hover:border-[#4A4A4A] transition-colors duration-300">
              <FauxPhoto variant="window" className="aspect-[4/3]" />
              <div className="p-4">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A]">Edition of 10</span>
                <div className="flex items-baseline justify-between gap-3 mt-2">
                  <h3 className="text-white text-sm tracking-wide">Glass House</h3>
                  <span className="font-mono text-xs text-[#999999]">$2,600</span>
                </div>
                <div className="mt-3 h-px bg-[#2A2A2A]">
                  <div className="h-px bg-[#C4956A]" style={{ width: "20%" }} />
                </div>
                <p className="text-[10px] text-[#4A4A4A] mt-2 tracking-[0.1em]">2 of 10 placed</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROGRAMME — tabs                                             */}
      {/* ============================================================ */}
      <section id="programme" className="scroll-mt-14 border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="05"
            kicker="Programme"
            title="What the rooms are holding"
            sub="Tabs are typographic: the active label turns white over an amber hairline. Nothing slides, nothing glows."
          />
          <div className="gd-reveal">
            <div className="flex gap-8 border-b border-[#2A2A2A]" role="tablist" aria-label="Exhibition programme">
              {PROGRAMME_TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={programme === t.key}
                  onClick={() => setProgramme(t.key)}
                  className={`relative pb-3 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${programme === t.key ? "text-white" : "text-[#555555] hover:text-[#999999]"}`}
                >
                  {t.label}
                  <span className={`absolute bottom-0 left-0 right-0 h-px transition-colors duration-300 ${programme === t.key ? "bg-[#C4956A]" : "bg-transparent"}`} />
                </button>
              ))}
            </div>
            <ul className="divide-y divide-[#2A2A2A]">
              {PROGRAMME[programme].map((show) => (
                <li key={show.title} className="py-6 grid md:grid-cols-12 gap-2 md:gap-6 items-baseline group">
                  <span className="md:col-span-3 text-[10px] uppercase tracking-[0.15em] text-[#C4956A]">{show.dates}</span>
                  <h3 className="md:col-span-4 text-lg md:text-xl font-light tracking-tight text-white group-hover:text-[#CCCCCC] transition-colors duration-300">{show.title}</h3>
                  <span className="md:col-span-2 text-xs text-[#666666]">{show.venue}</span>
                  <span className="md:col-span-3 text-xs text-[#4A4A4A] md:text-right">{show.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BADGES — wall label chips                                    */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="06"
            kicker="Badges"
            title="Chips as quiet as wall labels"
            sub="Status is a hairline outline and ten-pixel caps. Amber marks the living states; gray retires the rest."
          />
          <div className="gd-reveal space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] mb-4">Status</p>
              <div className="flex flex-wrap gap-3">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A] border border-[#C4956A]/50 rounded-sm px-2 py-1">On view</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A] bg-[#C4956A]/10 border border-[#C4956A]/30 rounded-sm px-2 py-1">New acquisition</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#999999] border border-[#2A2A2A] rounded-sm px-2 py-1">Available</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#4A4A4A] border border-[#2A2A2A] rounded-sm px-2 py-1 line-through decoration-[#4A4A4A]">Sold</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#4A4A4A] bg-[#1A1A1A] border border-[#1A1A1A] rounded-sm px-2 py-1">Archive</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] mb-4">Medium tags</p>
              <div className="flex flex-wrap gap-3">
                {["35mm", "Medium format", "Large format", "Digital", "Silver gelatin", "Pigment print"].map((tag) => (
                  <span key={tag} className="text-[10px] uppercase tracking-[0.15em] text-[#666666] border border-[#2A2A2A] rounded-sm px-2 py-1 hover:text-white hover:border-[#4A4A4A] transition-colors duration-300 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROGRESS — edition placement                                 */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="07"
            kicker="Progress"
            title="A single amber hairline, filling"
            sub="Progress is one pixel tall. The track is the border gray; the fill is the only amber in the room."
          />
          <div className="gd-reveal max-w-3xl space-y-8">
            {editionProgress.map((e) => (
              <div key={e.work}>
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-sm text-white tracking-wide">{e.work}</p>
                  <p className="font-mono text-[10px] text-[#C4956A] tabular-nums">{e.sold} / {e.total} placed</p>
                </div>
                <div className="h-px bg-[#2A2A2A]" role="progressbar" aria-valuenow={e.sold} aria-valuemin={0} aria-valuemax={e.total} aria-label={`${e.work} edition placement`}>
                  <div className="h-px bg-[#C4956A] transition-all duration-700" style={{ width: `${(e.sold / e.total) * 100}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-[#2A2A2A]">
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4956A]">Exhibition run</p>
                <p className="font-mono text-[10px] text-[#666666]">Mar 14 &mdash; Jun 02</p>
              </div>
              <div className="relative h-px bg-[#2A2A2A]">
                <div className="absolute left-0 top-0 h-px bg-[#666666]" style={{ width: "62%" }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C4956A]" style={{ left: "62%" }} />
              </div>
              <p className="text-[10px] text-[#4A4A4A] mt-3 tracking-[0.1em]">Week 7 of 12</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* EDITIONS — data table with pagination                        */}
      {/* ============================================================ */}
      <section id="editions" className="scroll-mt-14 border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="08"
            kicker="Editions"
            title="The ledger keeps hairline rules"
            sub="A price list set like a catalogue appendix: mono numerals, hairline rows, and statuses in outlined caps."
          />
          <div className="gd-reveal border border-[#2A2A2A] rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#2A2A2A] bg-[#1A1A1A]">
                    {["Work", "Year", "Edition", "Print size", "Price", "Status"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[#C4956A] font-light whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row) => (
                    <tr key={row.work} className="border-b border-[#2A2A2A] last:border-b-0 hover:bg-[#1A1A1A]/60 transition-colors duration-300">
                      <td className="px-4 py-3.5 text-sm text-white whitespace-nowrap">{row.work}</td>
                      <td className="px-4 py-3.5 font-mono text-xs text-[#666666]">{row.year}</td>
                      <td className="px-4 py-3.5 font-mono text-xs text-[#666666] whitespace-nowrap">{row.edition}</td>
                      <td className="px-4 py-3.5 text-xs text-[#666666] whitespace-nowrap">{row.size}</td>
                      <td className="px-4 py-3.5 font-mono text-xs text-[#999999]">{row.price}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`text-[9px] uppercase tracking-[0.15em] border rounded-sm px-1.5 py-0.5 ${statusBadge[row.status]}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#2A2A2A] bg-[#1A1A1A]">
              <p className="font-mono text-[10px] text-[#4A4A4A] tabular-nums">
                Page {String(editionsPage + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditionsPage((p) => Math.max(0, p - 1))}
                  disabled={editionsPage === 0}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border border-[#2A2A2A] rounded-sm text-[#999999] hover:text-white hover:border-[#C4956A] disabled:text-[#3A3A3A] disabled:border-[#1A1A1A] disabled:cursor-not-allowed transition-all duration-300"
                >
                  Prev
                </button>
                <button
                  onClick={() => setEditionsPage((p) => Math.min(pageCount - 1, p + 1))}
                  disabled={editionsPage === pageCount - 1}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] border border-[#2A2A2A] rounded-sm text-[#999999] hover:text-white hover:border-[#C4956A] disabled:text-[#3A3A3A] disabled:border-[#1A1A1A] disabled:cursor-not-allowed transition-all duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ALERTS — desaturated notices                                 */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="09"
            kicker="Alerts"
            title="Notices that respect the dark"
            sub="Semantic color survives at gallery volume: one desaturated hairline on the left edge, never a filled banner."
          />
          <div className="gd-reveal max-w-3xl space-y-4">
            {[
              { label: "Notice", edge: "#6E7B8A", text: "Viewing is by appointment on Mondays. The print room closes thirty minutes before the gallery." },
              { label: "Confirmed", edge: "#708A6E", text: "Your acquisition request has been received. A specialist will reply within two working days." },
              { label: "Limited", edge: "#C4956A", text: "Only two prints remain in this edition of Edge of the City. Framing adds three weeks." },
              { label: "Unavailable", edge: "#A66E6E", text: "The Passage has left the collection. Join the register to hear when a print resurfaces." },
            ].map((a) => (
              <div key={a.label} className="bg-[#1A1A1A] border border-[#2A2A2A] border-l-2 rounded-sm px-4 py-3.5" style={{ borderLeftColor: a.edge }} role="status">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: a.edge }}>{a.label}</p>
                <p className="text-xs text-[#999999] leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FORM — acquisition inquiry                                   */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="10"
            kicker="Inquiry"
            title="Forms lit like the front desk"
            sub="Fields sit flush with the dark field; focus draws a thin amber ring, the same safelight as every label."
          />
          <form
            className="gd-reveal max-w-2xl grid sm:grid-cols-2 gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              setInquirySent(true);
            }}
          >
            <div>
              <label htmlFor="gd-name" className="block text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mb-2">Name</label>
              <input
                id="gd-name"
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm text-white text-sm placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/30 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="gd-email" className="block text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mb-2">Email</label>
              <input
                id="gd-email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm text-white text-sm placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/30 transition-all duration-300"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="gd-work" className="block text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mb-2">Work of interest</label>
              <select
                id="gd-work"
                defaultValue=""
                className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm text-sm text-[#999999] focus:outline-none focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/30 transition-all duration-300 appearance-none"
              >
                <option value="" disabled>Select a work</option>
                {works.map((w) => (
                  <option key={w.id} value={w.title}>{w.title} ({w.year})</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="gd-message" className="block text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mb-2">Message</label>
              <textarea
                id="gd-message"
                rows={4}
                placeholder="Edition, framing, and shipping questions welcome"
                className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm text-white text-sm placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/30 transition-all duration-300 resize-none"
              />
            </div>
            <div className="sm:col-span-2 flex flex-wrap items-center gap-5">
              <button type="submit" className="px-6 py-2.5 bg-[#1A1A1A] text-white text-sm tracking-wider border border-[#2A2A2A] rounded-sm hover:border-[#C4956A] hover:bg-[#2A2A2A] transition-all duration-300">
                Send inquiry
              </button>
              {inquirySent && (
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#708A6E]" role="status">Received &mdash; we reply within two days</p>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PRESS — blockquotes                                          */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="11"
            kicker="Press"
            title="What the reviews kept"
          />
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {[
              { quote: "A rare discipline: photographs that let the darkness do the composing, and a room that agrees to disappear.", source: "Aperture Review", year: "2025" },
              { quote: "Urban Solitude turns the gallery itself into a lens — near-black walls, one warm safelight, and nothing between you and the frame.", source: "The Print Quarterly", year: "2026" },
            ].map((p) => (
              <figure key={p.source} className="gd-reveal border-l border-[#2A2A2A] pl-6 md:pl-8">
                <blockquote className="text-lg md:text-xl font-light leading-relaxed text-[#CCCCCC]">
                  &ldquo;{p.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="w-6 h-px bg-[#C4956A]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C4956A]">{p.source}</span>
                  <span className="font-mono text-[10px] text-[#4A4A4A]">{p.year}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROCESS                                                      */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead no="12" kicker="Process" title="Frame, develop, print" />
          <div className="gd-reveal grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: "01", title: "Frame", desc: "Every photograph begins with patient observation — waiting for light, shadow, and subject to align." },
              { step: "02", title: "Develop", desc: "Film is developed by hand in the darkroom. Digital files are graded to match film's natural tonality." },
              { step: "03", title: "Print", desc: "Final images are printed on archival Hahnemuehle paper, signed, numbered, and editioned." },
            ].map((p) => (
              <div key={p.step} className="border-t border-[#2A2A2A] pt-5">
                <p className="font-mono text-xs text-[#C4956A] mb-3 tabular-nums">{p.step}</p>
                <h3 className="text-xl md:text-2xl font-light tracking-tight mb-2">{p.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DIVIDERS — hairlines and viewfinder marks                    */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="13"
            kicker="Dividers"
            title="One pixel is enough"
            sub="Every separation in the room is a 1px hairline in border gray. Decoration is a six-pixel amber tick, at most."
          />
          <div className="gd-reveal max-w-3xl space-y-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] mb-4">Hairline</p>
              <hr className="border-0 border-t border-[#2A2A2A]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] mb-4">Center tick</p>
              <div className="flex items-center">
                <span className="flex-1 h-px bg-[#2A2A2A]" />
                <span className="w-6 h-px bg-[#C4956A] mx-2" />
                <span className="flex-1 h-px bg-[#2A2A2A]" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] mb-4">Numbered rule</p>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#C4956A] tabular-nums">04</span>
                <span className="flex-1 h-px bg-[#2A2A2A]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A]">Section</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#4A4A4A] mb-4">Viewfinder corners</p>
              <div className="relative h-24 border border-[#2A2A2A]">
                <span className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-[#C4956A]" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-[#C4956A]" />
                <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-[#C4956A]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-[#C4956A]" />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.25em] text-[#4A4A4A]">Focus area</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DO / DON'T                                                   */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionHead no="14" kicker="Guidelines" title="House rules" />
          <div className="gd-reveal grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="border-t border-[#C4956A] pt-6">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#C4956A] mb-6">Do</h3>
              <ul className="space-y-3.5">
                {[
                  "Full-bleed images: object-cover, no padding, no border",
                  "Layer with grays only — #0A0A0A, #1A1A1A, #2A2A2A",
                  "Spend amber #C4956A on metadata and wayfinding alone",
                  "Set headlines oversized in font-light tracking-tight",
                  "Keep every divider a 1px hairline in #2A2A2A",
                  "Ease all transitions at 300ms ease-out, like a film fade",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#999999] leading-relaxed">
                    <span className="text-[#C4956A] font-mono shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#2A2A2A] pt-6">
              <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#4A4A4A] mb-6">Don&rsquo;t</h3>
              <ul className="space-y-3.5">
                {[
                  "Use decorative gradients or colored shadows",
                  "Round corners past rounded-sm; images stay square",
                  "Break the dark field with white or light-gray panels",
                  "Reach for serif fonts or bold and semibold weights",
                  "Let amber leak into body paragraphs or headlines",
                  "Frame a photograph with padding or a visible border",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#555555] leading-relaxed">
                    <span className="text-[#4A4A4A] font-mono shrink-0">&times;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTACT STRIP                                                */}
      {/* ============================================================ */}
      <section className="border-t border-[#2A2A2A] px-6 md:px-16 py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="gd-reveal space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C4956A]">Contact</p>
            <p className="text-sm text-[#666666] leading-relaxed">Available for commissioned work, exhibitions, and collaborations.</p>
            <div className="space-y-1">
              <p className="text-base"><span className="text-[#C4956A]">hello</span>@example.com</p>
              <p className="text-sm text-[#555555]">@gallery_photo</p>
            </div>
            <div className="h-px w-12 mx-auto bg-[#C4956A]" />
            <p className="text-[10px] text-[#444444] tracking-[0.2em]">DARK GALLERY &middot; PORTFOLIO STYLE</p>
            <UnsplashAttribution />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer id="visit" className="scroll-mt-14 border-t border-[#2A2A2A] px-6 md:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between gap-8 text-xs">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mb-2">Location</p>
              <p className="text-[#666666] leading-relaxed">47 Berwick Street<br />London, W1F 8SQ</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mb-2">Hours</p>
              <p className="text-[#666666] leading-relaxed">Tue&ndash;Sat 11:00 &ndash; 19:00<br />Sun 12:00 &ndash; 17:00</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mb-2">Contact</p>
              <p className="text-[#666666] leading-relaxed">hello@example.com<br />+44 20 7946 0958</p>
            </div>
            <div className="md:text-right">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mb-2">Index</p>
              <Link href="/styles" className="group inline-flex items-center gap-2 text-[#666666] hover:text-white transition-colors duration-300">
                <span aria-hidden className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
                Back to all styles
              </Link>
            </div>
          </div>
          <div className="mt-10 pt-4 border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] text-[#4A4A4A] tracking-[0.1em]">&copy; 2026 M. Hale. All rights reserved.</p>
            <p className="text-[10px] text-[#4A4A4A] tracking-[0.1em]">Dark Gallery &mdash; the photograph leads; the room retreats.</p>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* LIGHTBOX                                                     */}
      {/* ============================================================ */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-3">
            <span className="text-xs text-[#555555] font-mono tabular-nums">{lightbox + 1} / {works.length}</span>
            <button onClick={() => setLightbox(null)} className="text-xs text-[#555555] hover:text-white transition-colors tracking-[0.15em]">CLOSE <span className="hidden md:inline">(ESC)</span></button>
          </div>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#444444] hover:text-white text-3xl transition-colors z-10" aria-label="Previous">&lsaquo;</button>
          <div className="max-w-5xl w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[3/2] bg-[#1A1A1A] rounded-sm flex items-center justify-center overflow-hidden">
              {!imgErrors.has(lightbox) ? (
                <img src={styleImageUrl(lightbox)} alt={works[lightbox].title} className="w-full h-full object-cover" onError={() => setImgErrors((prev) => new Set(prev).add(lightbox))} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#222] to-[#141414]" />
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-lg md:text-xl">{works[lightbox].title}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#C4956A] mt-1">{works[lightbox].medium} &middot; {works[lightbox].year}</p>
              </div>
              <p className="text-[10px] text-[#444444] font-mono tracking-[0.05em]">f/2.8 &middot; 1/125s &middot; ISO 400</p>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#444444] hover:text-white text-3xl transition-colors z-10" aria-label="Next">&rsaquo;</button>
        </div>
      )}
    </div>
  );
}
