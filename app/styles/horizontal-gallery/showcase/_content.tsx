"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ─── Hooks ────────────────────────────────────────────────────────────────────

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

// ─── RevealBlock ──────────────────────────────────────────────────────────────

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
        transform: inView ? "translateX(0)" : "translateX(24px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
      <path d="M19 12H5" /><path d="m11 18-6-6 6-6" />
    </svg>
  );
}

function IconArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Work = {
  no: string;
  title: string;
  medium: string;
  year: string;
  dims: string;
  collection: "Painting" | "Photography" | "Works on Paper";
  aspect: string;
  width: string;
  art: string;
};

const works: Work[] = [
  {
    no: "01", title: "Still Field", medium: "Oil on linen", year: "2025", dims: "120 x 96 cm",
    collection: "Painting", aspect: "aspect-[4/5]", width: "w-64 md:w-80",
    art: "radial-gradient(120% 90% at 24% 12%, rgba(252,252,250,0.28), rgba(252,252,250,0) 55%), linear-gradient(158deg, #C9C4BA 0%, #8F8A7E 100%)",
  },
  {
    no: "02", title: "Northern Wall", medium: "Gelatin silver print", year: "2026", dims: "60 x 90 cm",
    collection: "Photography", aspect: "aspect-[3/2]", width: "w-[22rem] md:w-[30rem]",
    art: "radial-gradient(110% 80% at 70% 20%, rgba(252,252,250,0.2), rgba(252,252,250,0) 50%), linear-gradient(160deg, #8E969E 0%, #5A6068 100%)",
  },
  {
    no: "03", title: "Terra Firma II", medium: "Pigment and clay on panel", year: "2024", dims: "100 x 80 cm",
    collection: "Painting", aspect: "aspect-[4/5]", width: "w-64 md:w-80",
    art: "radial-gradient(130% 100% at 30% 0%, rgba(252,252,250,0.18), rgba(252,252,250,0) 60%), linear-gradient(150deg, #B86E4E 0%, #7E4630 100%)",
  },
  {
    no: "04", title: "Quiet Hours", medium: "Archival pigment print", year: "2026", dims: "45 x 67 cm",
    collection: "Photography", aspect: "aspect-[3/2]", width: "w-[22rem] md:w-[30rem]",
    art: "radial-gradient(100% 90% at 20% 30%, rgba(252,252,250,0.3), rgba(252,252,250,0) 55%), linear-gradient(170deg, #D9CFBE 0%, #B0A48E 100%)",
  },
  {
    no: "05", title: "Sediment Study", medium: "Graphite on cotton paper", year: "2025", dims: "56 x 76 cm",
    collection: "Works on Paper", aspect: "aspect-[4/5]", width: "w-64 md:w-80",
    art: "radial-gradient(120% 90% at 60% 10%, rgba(252,252,250,0.26), rgba(252,252,250,0) 50%), linear-gradient(165deg, #E3DED2 0%, #C2BBA9 100%)",
  },
  {
    no: "06", title: "Verdigris", medium: "Oil and wax on linen", year: "2026", dims: "140 x 112 cm",
    collection: "Painting", aspect: "aspect-[4/5]", width: "w-64 md:w-80",
    art: "radial-gradient(110% 90% at 40% 15%, rgba(252,252,250,0.2), rgba(252,252,250,0) 55%), linear-gradient(165deg, #A6AC9C 0%, #6F7566 100%)",
  },
  {
    no: "07", title: "Interval", medium: "Charcoal on paper", year: "2024", dims: "76 x 56 cm",
    collection: "Works on Paper", aspect: "aspect-[3/2]", width: "w-[22rem] md:w-[30rem]",
    art: "radial-gradient(100% 80% at 75% 25%, rgba(252,252,250,0.14), rgba(252,252,250,0) 50%), linear-gradient(160deg, #4C4A46 0%, #262523 100%)",
  },
  {
    no: "08", title: "Warm Ground", medium: "Chromogenic print", year: "2025", dims: "50 x 62 cm",
    collection: "Photography", aspect: "aspect-[4/5]", width: "w-64 md:w-80",
    art: "radial-gradient(120% 100% at 25% 20%, rgba(252,252,250,0.24), rgba(252,252,250,0) 55%), linear-gradient(150deg, #C7A79A 0%, #96705F 100%)",
  },
];

const collections = ["All", "Painting", "Photography", "Works on Paper"] as const;

const pigments = [
  { hex: "#FCFCFA", name: "Gallery White", usage: "The wall. Background of every room." },
  { hex: "#1A1A1A", name: "Ink", usage: "Titles, primary text, filled buttons." },
  { hex: "#2E2E2C", name: "Soft Ink", usage: "Hover states and secondary text." },
  { hex: "#8A8A85", name: "Warm Grey", usage: "Captions, wall labels, metadata." },
  { hex: "#E8E6E1", name: "Hairline", usage: "Every rule and divider, 1px only." },
  { hex: "#A85A3A", name: "Terracotta", usage: "Indices and rare accents." },
];

const rooms = [
  { name: "Room I — Threshold", pct: 100 },
  { name: "Room II — Sediment", pct: 72 },
  { name: "Room III — Interval", pct: 38 },
  { name: "Room IV — Warm Ground", pct: 12 },
];

const catalogue = [
  { no: "01", title: "Still Field", medium: "Oil on linen", year: "2025", dims: "120 x 96 cm", status: "On View" },
  { no: "02", title: "Northern Wall", medium: "Gelatin silver print", year: "2026", dims: "60 x 90 cm", status: "On View" },
  { no: "03", title: "Terra Firma II", medium: "Pigment and clay on panel", year: "2024", dims: "100 x 80 cm", status: "Sold" },
  { no: "04", title: "Quiet Hours", medium: "Archival pigment print", year: "2026", dims: "45 x 67 cm", status: "On Loan" },
  { no: "05", title: "Sediment Study", medium: "Graphite on cotton paper", year: "2025", dims: "56 x 76 cm", status: "On View" },
  { no: "06", title: "Verdigris", medium: "Oil and wax on linen", year: "2026", dims: "140 x 112 cm", status: "Reserved" },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HorizontalGalleryShowcaseContent() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeWork, setActiveWork] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeCollection, setActiveCollection] = useState<(typeof collections)[number]>("All");
  const [attendance, setAttendance] = useState("preview");

  const handleStripScroll = () => {
    const el = stripRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setProgress(ratio);
    setActiveWork(Math.min(works.length - 1, Math.round(ratio * (works.length - 1))));
  };

  const scrollStrip = (dir: -1 | 1) => {
    stripRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  const filteredWorks =
    activeCollection === "All" ? works : works.filter((w) => w.collection === activeCollection);

  return (
    <div className="min-h-screen bg-[#FCFCFA] text-[#1A1A1A] font-sans">
      <style>{`
        .hg-strip { scrollbar-width: none; -ms-overflow-style: none; }
        .hg-strip::-webkit-scrollbar { display: none; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── Section 1: Navigation ────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#FCFCFA]/95 backdrop-blur-sm border-b border-[#E8E6E1]">
        <div className="px-6 md:px-20 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/styles/horizontal-gallery"
              className="text-[11px] uppercase tracking-[0.2em] text-[#8A8A85] hover:text-[#1A1A1A] transition-colors duration-300 flex items-center gap-2"
            >
              <IconArrowLeft className="w-3.5 h-3.5" />
              Back to Docs
            </Link>
            <span className="w-px h-4 bg-[#E8E6E1]" />
            <span className="font-serif font-light text-lg tracking-wide">White Room</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] text-[#8A8A85]">
            <a href="#works" className="text-[#1A1A1A]">Works</a>
            <a href="#exhibitions" className="hover:text-[#1A1A1A] transition-colors duration-300">Exhibitions</a>
            <a href="#artists" className="hover:text-[#1A1A1A] transition-colors duration-300">Artists</a>
            <a href="#visit" className="hover:text-[#1A1A1A] transition-colors duration-300">Visit</a>
          </div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A]">Est. 1998</p>
        </div>
      </nav>

      {/* ── Section 2: Hero ──────────────────────────────────────────────── */}
      <RevealBlock>
        <header id="exhibitions" className="scroll-mt-16 px-6 md:px-20 pt-20 md:pt-28 pb-16 md:pb-20">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-6">Current Exhibition</p>
          <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-wide max-w-4xl">
            The Weight of Quiet Things
          </h1>
          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-sm text-[#8A8A85] leading-relaxed max-w-md">
              Eight works hung along a single line. Walk right. The wall is part of the
              work; the silence between frames is part of the sentence.
            </p>
            <div className="flex items-center gap-6 shrink-0">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85]">March 14 &mdash; June 02</p>
              <span className="w-10 h-px bg-[#E8E6E1]" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A]">Copenhagen K</p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <button className="px-8 py-3 bg-[#1A1A1A] text-[#FCFCFA] rounded-none text-xs font-light uppercase tracking-[0.2em] hover:bg-[#2E2E2C] transition-colors duration-300">
              Begin the Walk
            </button>
            <button className="px-8 py-3 bg-transparent text-[#1A1A1A] border border-[#1A1A1A] rounded-none text-xs font-light uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-[#FCFCFA] transition-colors duration-300">
              Exhibition Notes
            </button>
          </div>
        </header>
      </RevealBlock>

      {/* ── Section 3: The Horizontal Gallery Strip (core) ───────────────── */}
      <section id="works" className="scroll-mt-16 border-t border-[#E8E6E1] py-16 md:py-24">
        <RevealBlock>
          <div
            ref={stripRef}
            onScroll={handleStripScroll}
            className="hg-strip flex gap-16 md:gap-24 overflow-x-auto snap-x snap-mandatory items-start"
          >
            {/* Sticky title cell walks along with the strip */}
            <div className="sticky left-0 z-10 shrink-0 w-60 md:w-72 self-stretch bg-[#FCFCFA] pl-6 md:pl-20 pr-8 flex flex-col justify-between min-h-[24rem]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-5">Selected Works</p>
                <h2 className="font-serif font-light text-3xl md:text-4xl leading-snug tracking-wide">
                  One line,<br />eight rooms
                </h2>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] mt-6 leading-loose">
                  Scroll sideways.<br />Each work snaps to rest.
                </p>
              </div>
              <p className="font-serif font-light text-2xl tabular-nums mt-10">
                {String(activeWork + 1).padStart(2, "0")}
                <span className="text-[#E8E6E1] mx-2">/</span>
                <span className="text-[#8A8A85] text-base">{String(works.length).padStart(2, "0")}</span>
              </p>
            </div>

            {works.map((w) => (
              <figure key={w.no} className={`${w.width} shrink-0 snap-start group`}>
                <div className={`${w.aspect} overflow-hidden bg-[#E8E6E1]`}>
                  <div
                    className="w-full h-full group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    style={{ backgroundImage: w.art }}
                    role="img"
                    aria-label={`${w.title}, ${w.medium}, ${w.year}`}
                  />
                </div>
                <figcaption className="mt-5 pt-4 border-t border-[#E8E6E1]">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-2">No. {w.no}</p>
                  <p className="font-serif font-light text-base">{w.title}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] mt-1.5">
                    {w.medium}, {w.year}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A8A85]/70 mt-1">{w.dims}</p>
                </figcaption>
              </figure>
            ))}

            {/* Trailing wall margin */}
            <div className="shrink-0 w-2 md:w-12" aria-hidden="true" />
          </div>
        </RevealBlock>

        {/* Hairline progress + walk controls */}
        <RevealBlock delay={0.1}>
          <div className="px-6 md:px-20 mt-10 flex items-center gap-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] shrink-0 hidden sm:block">
              Walkthrough
            </p>
            <div className="relative h-px flex-1 bg-[#E8E6E1]">
              <div
                className="absolute left-0 top-0 h-px bg-[#1A1A1A] transition-[width] duration-200 ease-out"
                style={{ width: `${Math.max(4, Math.round(progress * 100))}%` }}
              />
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollStrip(-1)}
                aria-label="Previous work"
                className="w-10 h-10 border border-[#E8E6E1] rounded-none flex items-center justify-center text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors duration-300"
              >
                <IconArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollStrip(1)}
                aria-label="Next work"
                className="w-10 h-10 border border-[#E8E6E1] rounded-none flex items-center justify-center text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors duration-300"
              >
                <IconArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ── Section 4: Curatorial Statement ─────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Fig. 01</p>
              <h2 className="font-serif font-light text-3xl md:text-4xl leading-snug tracking-wide">
                Whitespace is<br />the exhibition wall
              </h2>
            </div>
            <div className="md:col-span-8 md:pt-1">
              <p className="font-serif font-light text-xl md:text-2xl leading-relaxed text-[#2E2E2C] max-w-2xl">
                A gallery does not decorate its walls. It clears them, so that each work
                may be met alone, at walking pace, in its own pool of quiet.
              </p>
              <div className="mt-8 pt-8 border-t border-[#E8E6E1] grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-[#8A8A85] leading-relaxed max-w-2xl">
                <p>
                  The horizontal scroll is not a carousel. It is a route. Scroll-snap turns
                  momentum into footsteps, and every stop places one work at the centre of
                  attention, unframed and unshadowed.
                </p>
                <p>
                  Captions stay off the image, set small and wide beneath a single hairline,
                  the way a museum label never touches the canvas. The number comes first;
                  the work keeps its distance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 5: Palette ───────────────────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">Pigments of the Room</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Six, no more</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12">
            {pigments.map((p, i) => (
              <RevealBlock key={p.hex} delay={i * 0.05}>
                <div>
                  <div
                    className="aspect-[4/5] rounded-none"
                    style={{
                      backgroundColor: p.hex,
                      boxShadow: p.hex === "#FCFCFA" ? "inset 0 0 0 1px #E8E6E1" : "none",
                    }}
                  />
                  <div className="mt-4 pt-3 border-t border-[#E8E6E1]">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-1.5">{p.hex}</p>
                    <p className="font-serif font-light text-sm">{p.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A85] mt-1 leading-relaxed">{p.usage}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 6: Typography ────────────────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">Lettering</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Serif speaks, sans labels</p>
          </div>
          <div className="space-y-10">
            <div className="pb-8 border-b border-[#E8E6E1]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Display / font-serif font-light</p>
              <p className="font-serif font-light text-5xl md:text-7xl tracking-wide leading-tight">Quiet Things</p>
            </div>
            <div className="pb-8 border-b border-[#E8E6E1]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Heading / font-serif font-light tracking-wide</p>
              <p className="font-serif font-light text-3xl tracking-wide">The gallery clears its walls</p>
            </div>
            <div className="pb-8 border-b border-[#E8E6E1]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Body / font-sans text-sm</p>
              <p className="text-sm text-[#2E2E2C] leading-relaxed max-w-xl">
                Body copy stays modest and sans-serif, set in soft ink with generous
                leading, never louder than the work it accompanies.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Caption / text-xs uppercase tracking-[0.2em]</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85]">Archival pigment print, 2026 &mdash; Edition of 12</p>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 7: Buttons ───────────────────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">Instructions to Visitors</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Buttons</p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <button className="px-8 py-3 bg-[#1A1A1A] text-[#FCFCFA] rounded-none text-xs font-light uppercase tracking-[0.2em] hover:bg-[#2E2E2C] transition-colors duration-300">
              Primary
            </button>
            <button className="px-8 py-3 bg-transparent text-[#1A1A1A] border border-[#1A1A1A] rounded-none text-xs font-light uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-[#FCFCFA] transition-colors duration-300">
              Outline
            </button>
            <button className="px-8 py-3 bg-[#A85A3A] text-[#FCFCFA] rounded-none text-xs font-light uppercase tracking-[0.2em] hover:bg-[#8F4A2E] transition-colors duration-300">
              Terracotta
            </button>
            <button className="px-2 py-3 bg-transparent text-[#1A1A1A] rounded-none text-xs font-light uppercase tracking-[0.2em] underline underline-offset-8 decoration-[#A85A3A] decoration-1 hover:text-[#A85A3A] transition-colors duration-300">
              Text Link
            </button>
            <button
              disabled
              className="px-8 py-3 bg-transparent text-[#8A8A85] border border-[#E8E6E1] rounded-none text-xs font-light uppercase tracking-[0.2em] opacity-60 cursor-not-allowed"
            >
              Closed Today
            </button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#8A8A85]">
            Always rounded-none. Never a shadow. Letterspacing does the talking.
          </p>
        </section>
      </RevealBlock>

      {/* ── Section 8: Cards ─────────────────────────────────────────────── */}
      <RevealBlock>
        <section id="artists" className="scroll-mt-16 border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">Three Ways to Hang</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Cards</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {/* Artwork figure card */}
            <RevealBlock delay={0}>
              <figure className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-[#E8E6E1]">
                  <div
                    className="w-full h-full group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    style={{ backgroundImage: works[0].art }}
                  />
                </div>
                <figcaption className="mt-5 pt-4 border-t border-[#E8E6E1]">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-2">No. 01 &mdash; Artwork</p>
                  <p className="font-serif font-light text-base">Still Field</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] mt-1.5">Oil on linen, 2025</p>
                </figcaption>
              </figure>
            </RevealBlock>
            {/* Wall label / plaque card */}
            <RevealBlock delay={0.08}>
              <div className="border border-[#E8E6E1] rounded-none p-8 h-full flex flex-col justify-between min-h-[20rem]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Wall Label</p>
                  <p className="font-serif font-light text-xl leading-snug">
                    About the artist
                  </p>
                  <p className="text-sm text-[#8A8A85] leading-relaxed mt-4">
                    Works between Copenhagen and Kyoto. Concerned with sediment, interval,
                    and the weight a room places on a single object.
                  </p>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A] mt-8 underline underline-offset-8 decoration-[#A85A3A] decoration-1 cursor-pointer">
                  Full biography
                </p>
              </div>
            </RevealBlock>
            {/* Announcement card */}
            <RevealBlock delay={0.16}>
              <div className="border-t border-[#1A1A1A] rounded-none pt-6 h-full flex flex-col justify-between min-h-[20rem]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Next Exhibition</p>
                  <p className="font-serif font-light text-2xl leading-snug">
                    Interval:<br />Works on Paper
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] mt-5 leading-loose">
                    June 20 &mdash; September 07<br />Opening June 19, 17:00
                  </p>
                </div>
                <button className="self-start px-8 py-3 bg-[#1A1A1A] text-[#FCFCFA] rounded-none text-xs font-light uppercase tracking-[0.2em] hover:bg-[#2E2E2C] transition-colors duration-300 mt-8">
                  Save the Date
                </button>
              </div>
            </RevealBlock>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 9: Collection Tabs + Filtered Strip ──────────────────── */}
      <section className="border-t border-[#E8E6E1] py-16 md:py-24">
        <RevealBlock>
          <div className="px-6 md:px-20 flex items-baseline justify-between mb-10">
            <h2 className="font-serif font-light text-3xl tracking-wide">The Collection</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Tabs</p>
          </div>
          <div className="px-6 md:px-20 flex items-center gap-8 border-b border-[#E8E6E1] overflow-x-auto hg-strip">
            {collections.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCollection(c)}
                className={`pb-4 -mb-px text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 border-b rounded-none ${
                  activeCollection === c
                    ? "text-[#1A1A1A] border-[#1A1A1A]"
                    : "text-[#8A8A85] border-transparent hover:text-[#1A1A1A]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </RevealBlock>
        <RevealBlock delay={0.1}>
          <div className="hg-strip flex gap-16 md:gap-24 overflow-x-auto snap-x snap-mandatory mt-12 pl-6 md:pl-20">
            {filteredWorks.map((w) => (
              <figure key={w.no} className="w-52 md:w-60 shrink-0 snap-start group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-[#E8E6E1]">
                  <div
                    className="w-full h-full group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    style={{ backgroundImage: w.art }}
                  />
                </div>
                <figcaption className="mt-4 pt-3 border-t border-[#E8E6E1]">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-1.5">No. {w.no}</p>
                  <p className="font-serif font-light text-sm">{w.title}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A8A85] mt-1">{w.collection}</p>
                </figcaption>
              </figure>
            ))}
            <div className="shrink-0 w-2 md:w-12" aria-hidden="true" />
          </div>
        </RevealBlock>
      </section>

      {/* ── Section 10: RSVP Form ────────────────────────────────────────── */}
      <RevealBlock>
        <section id="visit" className="scroll-mt-16 border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Private View</p>
              <h2 className="font-serif font-light text-3xl md:text-4xl leading-snug tracking-wide">
                Visitor<br />Register
              </h2>
              <p className="text-sm text-[#8A8A85] leading-relaxed mt-6 max-w-xs">
                Fields sit on hairlines, not in boxes. The line inks itself when you arrive.
              </p>
            </div>
            <form className="md:col-span-8 max-w-xl space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <label htmlFor="hg-name" className="block text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-2">
                    Name
                  </label>
                  <input
                    id="hg-name"
                    type="text"
                    placeholder="YOUR NAME"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#E8E6E1] rounded-none text-sm text-[#1A1A1A] placeholder:text-xs placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-[#8A8A85]/70 focus:outline-none focus:border-[#1A1A1A] transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="hg-email" className="block text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-2">
                    Email
                  </label>
                  <input
                    id="hg-email"
                    type="email"
                    placeholder="YOU@EXAMPLE.COM"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#E8E6E1] rounded-none text-sm text-[#1A1A1A] placeholder:text-xs placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-[#8A8A85]/70 focus:outline-none focus:border-[#1A1A1A] transition-colors duration-300"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hg-attendance" className="block text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-2">
                  Attendance
                </label>
                <select
                  id="hg-attendance"
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#E8E6E1] rounded-none text-xs uppercase tracking-[0.2em] text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-300 appearance-none cursor-pointer"
                >
                  <option value="preview">Private view, June 19</option>
                  <option value="walkthrough">Curator walkthrough, June 21</option>
                  <option value="regular">Regular hours</option>
                </select>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#A85A3A]">
                  {attendance === "preview" ? "Limited to forty guests" : attendance === "walkthrough" ? "Meets at Room I, 16:00" : "Tue - Sat, 11:00 - 18:00"}
                </p>
              </div>
              <div>
                <label htmlFor="hg-note" className="block text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-2">
                  Note to the Gallery
                </label>
                <textarea
                  id="hg-note"
                  rows={3}
                  placeholder="OPTIONAL"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#E8E6E1] rounded-none text-sm text-[#1A1A1A] placeholder:text-xs placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-[#8A8A85]/70 focus:outline-none focus:border-[#1A1A1A] transition-colors duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-10 py-4 bg-[#1A1A1A] text-[#FCFCFA] rounded-none text-xs font-light uppercase tracking-[0.2em] hover:bg-[#2E2E2C] transition-colors duration-300"
              >
                Request Invitation
              </button>
            </form>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 11: Badges ───────────────────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">Small Signs</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Badges</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-4 py-1.5 border border-[#1A1A1A] rounded-none text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]">
              On View
            </span>
            <span className="px-4 py-1.5 bg-[#1A1A1A] rounded-none text-[10px] uppercase tracking-[0.25em] text-[#FCFCFA]">
              New Acquisition
            </span>
            <span className="px-4 py-1.5 border border-[#E8E6E1] rounded-none text-[10px] uppercase tracking-[0.25em] text-[#8A8A85]">
              Edition of 12
            </span>
            <span className="px-4 py-1.5 border border-[#A85A3A] rounded-none text-[10px] uppercase tracking-[0.25em] text-[#A85A3A]">
              Sold
            </span>
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-none text-[10px] uppercase tracking-[0.25em] text-[#8A8A85]">
              <span className="w-1 h-1 bg-[#A85A3A]" />
              On Loan
            </span>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 12: Walkthrough Progress ─────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">Route Through the Rooms</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Progress</p>
          </div>
          <div className="space-y-10 max-w-3xl">
            {rooms.map((room, i) => (
              <RevealBlock key={room.name} delay={i * 0.06}>
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A]">{room.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] tabular-nums">{room.pct}%</p>
                  </div>
                  <div className="relative h-px bg-[#E8E6E1]">
                    <div
                      className={`absolute left-0 top-0 h-px ${room.pct === 100 ? "bg-[#A85A3A]" : "bg-[#1A1A1A]"}`}
                      style={{ width: `${room.pct}%` }}
                    />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 13: Gallery Notices (Alerts) ─────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">Notices at the Door</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Alerts</p>
          </div>
          <div className="space-y-6 max-w-3xl">
            <div className="border-l border-[#8A8A85] pl-6 py-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-1.5">Notice</p>
              <p className="text-sm text-[#2E2E2C]">The gallery closes at 15:00 this Saturday for a private event.</p>
            </div>
            <div className="border-l border-[#1A1A1A] pl-6 py-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] mb-1.5 flex items-center gap-2">
                <IconCheck className="w-3 h-3" /> Confirmed
              </p>
              <p className="text-sm text-[#2E2E2C]">Your invitation to the private view has been registered.</p>
            </div>
            <div className="border-l border-[#A85A3A] pl-6 py-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-1.5">Final Week</p>
              <p className="text-sm text-[#2E2E2C]">The Weight of Quiet Things closes June 02. Last entry 17:30.</p>
            </div>
            <div className="border-l border-[#7E4630] pl-6 py-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#7E4630] mb-1.5">Unavailable</p>
              <p className="text-sm text-[#2E2E2C]">Curator walkthrough on June 21 is fully booked. A waitlist is open at the desk.</p>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 14: Hairlines & Markers ──────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">Wall Markings</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Dividers</p>
          </div>
          <div className="space-y-12 max-w-3xl">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-4">Plain hairline</p>
              <div className="h-px bg-[#E8E6E1]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-4">Hairline with figure marker</p>
              <div className="flex items-center gap-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] shrink-0">Fig. 02</span>
                <div className="h-px bg-[#E8E6E1] flex-1" />
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] mb-4">Section rule, ink</p>
              <div className="flex items-center gap-6">
                <div className="h-px bg-[#1A1A1A] w-16" />
                <div className="h-px bg-[#E8E6E1] flex-1" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] shrink-0">Room II</span>
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 15: Catalogue Table ──────────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">Catalogue</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Table</p>
          </div>
          <div className="overflow-x-auto hg-strip">
            <table className="w-full text-left min-w-[640px]">
              <thead>
                <tr className="border-b border-[#1A1A1A]">
                  <th className="py-4 pr-6 text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] font-normal">No.</th>
                  <th className="py-4 pr-6 text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] font-normal">Title</th>
                  <th className="py-4 pr-6 text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] font-normal">Medium</th>
                  <th className="py-4 pr-6 text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] font-normal">Year</th>
                  <th className="py-4 pr-6 text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] font-normal hidden md:table-cell">Dimensions</th>
                  <th className="py-4 text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {catalogue.map((row) => (
                  <tr key={row.no} className="border-b border-[#E8E6E1] hover:bg-[#E8E6E1]/20 transition-colors duration-300">
                    <td className="py-5 pr-6 text-xs uppercase tracking-[0.2em] text-[#A85A3A] tabular-nums">{row.no}</td>
                    <td className="py-5 pr-6 font-serif font-light text-base">{row.title}</td>
                    <td className="py-5 pr-6 text-xs uppercase tracking-[0.15em] text-[#8A8A85]">{row.medium}</td>
                    <td className="py-5 pr-6 text-xs uppercase tracking-[0.2em] text-[#2E2E2C] tabular-nums">{row.year}</td>
                    <td className="py-5 pr-6 text-xs uppercase tracking-[0.15em] text-[#8A8A85] tabular-nums hidden md:table-cell">{row.dims}</td>
                    <td className="py-5">
                      <span
                        className={`text-[10px] uppercase tracking-[0.25em] ${
                          row.status === "Sold"
                            ? "text-[#A85A3A]"
                            : row.status === "On View"
                              ? "text-[#1A1A1A]"
                              : "text-[#8A8A85]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 16: Critic Quote ─────────────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-8">From the Press</p>
            <blockquote className="font-serif font-light text-2xl md:text-4xl leading-relaxed tracking-wide text-[#1A1A1A]">
              &ldquo;You do not scroll this exhibition.<br className="hidden md:block" />
              You pace it, the way one paces<br className="hidden md:block" />
              a long white room.&rdquo;
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-6">
              <span className="w-10 h-px bg-[#E8E6E1]" />
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85]">Margit Holm, Kunstkritikk</p>
              <span className="w-10 h-px bg-[#E8E6E1]" />
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 17: Rules Summary ────────────────────────────────────── */}
      <RevealBlock>
        <section className="border-t border-[#E8E6E1] px-6 md:px-20 py-16 md:py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif font-light text-3xl tracking-wide">House Rules</h2>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85] hidden sm:block">Do &amp; Don&apos;t</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="border-t border-[#1A1A1A] pt-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] mb-6">Do</p>
              <ul className="space-y-4">
                {[
                  "overflow-x-auto snap-x snap-mandatory for the strip",
                  "rounded-none artwork with object-cover, aspect-[4/5] or aspect-[3/2]",
                  "No. 01 indices and hairline captions below each image",
                  "1px dividers in #E8E6E1, nothing heavier",
                  "gap-16 md:gap-24 whitespace between works",
                  "font-serif font-light titles, sans captions",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-[#2E2E2C]">
                    <IconCheck className="w-3.5 h-3.5 text-[#A85A3A] mt-1 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#A85A3A] pt-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-6">Don&apos;t</p>
              <ul className="space-y-4">
                {[
                  "Shadows, rounded corners, or frames on artwork",
                  "Text placed on top of images",
                  "Vertical masonry mixed into the strip",
                  "Borders of 2px or more anywhere",
                  "Gradient or textured walls behind content",
                  "Saturated multicolor accents beyond terracotta",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-[#2E2E2C]">
                    <span className="w-3.5 h-3.5 mt-1 shrink-0 flex items-center justify-center text-[#A85A3A] text-[10px]">&times;</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 18: Footer ───────────────────────────────────────────── */}
      <RevealBlock>
        <footer className="border-t border-[#E8E6E1] px-6 md:px-20 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <p className="font-serif font-light text-2xl tracking-wide mb-5">White Room</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] leading-loose">
                14 Quiet Street<br />
                1204 Copenhagen K
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-5">Hours</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] leading-loose">
                Tue &mdash; Sat, 11:00 &mdash; 18:00<br />
                Sunday by appointment
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-5">Contact</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] leading-loose">
                mail@whiteroom.gallery<br />
                +45 33 12 00 00
              </p>
            </div>
          </div>
          <div className="mt-16 pt-6 border-t border-[#E8E6E1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A85]">
              Horizontal Gallery &mdash; a StyleKit layout style
            </p>
            <Link
              href="/styles/horizontal-gallery"
              className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A] underline underline-offset-8 decoration-[#A85A3A] decoration-1 hover:text-[#A85A3A] transition-colors duration-300"
            >
              Back to Documentation
            </Link>
          </div>
        </footer>
      </RevealBlock>
    </div>
  );
}
