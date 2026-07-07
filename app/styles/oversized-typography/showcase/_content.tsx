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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Shared building blocks ───────────────────────────────────────────────────

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-end justify-between border-t border-[#0A0A0A]/15 pt-4 mb-10 md:mb-14">
      <h2 className="text-[clamp(1.75rem,4.5vw,3.5rem)] font-black uppercase tracking-tighter leading-[0.9] text-[#0A0A0A]">
        {title}
      </h2>
      <span className="font-mono text-xs uppercase tracking-widest text-[#71717A] shrink-0 pl-6">
        ({index})
      </span>
    </div>
  );
}

function MonoLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-xs uppercase tracking-widest ${className}`}>{children}</p>
  );
}

function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div
      className={`overflow-hidden py-5 md:py-6 ${
        dark ? "bg-[#0A0A0A]" : "border-y border-[#0A0A0A]/15 bg-[#FAFAF8]"
      }`}
    >
      <div className="ot-marquee flex w-max items-center">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className={`text-[clamp(1.5rem,4vw,3rem)] font-black uppercase tracking-tighter leading-none whitespace-nowrap ${
                dark ? "text-[#FAFAF8]" : "text-[#0A0A0A]"
              }`}
            >
              {item}
            </span>
            <span className="mx-8 md:mx-12 w-3 h-3 bg-[#FF4D00] shrink-0" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const disciplines = ["All", "Identity", "Web", "Motion"];

const works = [
  { index: "01", title: "Loud Studio", discipline: "Identity", year: "2026" },
  { index: "02", title: "Kern Festival", discipline: "Web", year: "2026" },
  { index: "03", title: "Mono Records", discipline: "Identity", year: "2025" },
  { index: "04", title: "Offgrid App", discipline: "Web", year: "2025" },
  { index: "05", title: "Blur Reel", discipline: "Motion", year: "2024" },
];

const palette = [
  { name: "Near Black", hex: "#0A0A0A", bg: "bg-[#0A0A0A]", border: false },
  { name: "Warm White", hex: "#FAFAF8", bg: "bg-[#FAFAF8]", border: true },
  { name: "Intl Orange", hex: "#FF4D00", bg: "bg-[#FF4D00]", border: false },
  { name: "Gray 500", hex: "#71717A", bg: "bg-[#71717A]", border: false },
  { name: "Gray 200", hex: "#E4E4E7", bg: "bg-[#E4E4E7]", border: true },
];

const typeScale = [
  { label: "Display", spec: "clamp(3rem, 12vw, 10rem) / 900 / -0.05em", sample: "Loud", classes: "text-[clamp(3rem,12vw,10rem)]" },
  { label: "Headline", spec: "clamp(2.5rem, 8vw, 6rem) / 900 / -0.05em", sample: "Shout", classes: "text-[clamp(2.5rem,8vw,6rem)]" },
  { label: "Title", spec: "clamp(2rem, 5vw, 4rem) / 900 / -0.05em", sample: "Speak", classes: "text-[clamp(2rem,5vw,4rem)]" },
];

const aboutTabs = ["Profile", "Services", "Awards"] as const;
type AboutTab = (typeof aboutTabs)[number];

const tabContent: Record<AboutTab, { heading: string; body: string; meta: string }> = {
  Profile: {
    heading: "Type first, always",
    body: "Ava Carter is an independent designer working between Rotterdam and the internet. Ten years of brand systems, editorial sites, and typefaces that refuse to whisper. The portfolio is the proof: no mood boards, no stock photos, just letters doing the heavy lifting.",
    meta: "Est. 2016 — Rotterdam, NL",
  },
  Services: {
    heading: "What gets made",
    body: "Brand identity systems built on custom type. Editorial and portfolio websites where the headline is the hero. Variable font engineering, kinetic type for launch films, and art direction for teams who want their words seen before their pictures.",
    meta: "Identity / Web / Type / Motion",
  },
  Awards: {
    heading: "Noted elsewhere",
    body: "Site of the Day x3, Typographic Excellence 2025, and a Dezeen shortlist for the Kern Festival identity. Judged the 2026 student type jam. The trophies live in a drawer; the case studies live below.",
    meta: "SOTD x3 — TDC 2025 — Dezeen",
  },
};

const skills = [
  { label: "Type Design", value: 95 },
  { label: "Art Direction", value: 90 },
  { label: "Creative Code", value: 75 },
  { label: "Motion", value: 60 },
];

const indexTable = [
  { year: "2026", project: "Loud Studio", client: "Self-initiated", discipline: "Identity", status: "Live" },
  { year: "2026", project: "Kern Festival", client: "Kern Org", discipline: "Web", status: "Live" },
  { year: "2025", project: "Mono Records", client: "Mono", discipline: "Identity", status: "Live" },
  { year: "2025", project: "Offgrid App", client: "Offgrid BV", discipline: "Web", status: "Archived" },
  { year: "2024", project: "Blur Reel", client: "Blur Films", discipline: "Motion", status: "Archived" },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function OversizedTypographyShowcaseContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<AboutTab>("Profile");
  const [subscribed, setSubscribed] = useState(false);

  const filteredWorks =
    activeFilter === "All" ? works : works.filter((w) => w.discipline === activeFilter);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A0A0A]">
      <style>{`
        @keyframes ot-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ot-marquee { animation: ot-marquee 28s linear infinite; }
        .ot-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .ot-marquee { animation: none; }
        }
      `}</style>

      {/* ── Section 1: Navigation ────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#FAFAF8] border-b border-[#0A0A0A]/15">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                href="/styles/oversized-typography"
                className="font-mono text-xs uppercase tracking-widest text-[#71717A] hover:text-[#FF4D00] transition-colors flex items-center gap-1.5"
              >
                <span aria-hidden="true">&larr;</span>
                Docs
              </Link>
              <div className="w-px h-4 bg-[#0A0A0A]/15" />
              <span className="font-black text-xl tracking-tighter uppercase">
                AC<span className="text-[#FF4D00]">&reg;</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
              {["Work", "About", "Journal", "Contact"].map((item) => (
                <span
                  key={item}
                  className="cursor-pointer hover:text-[#FF4D00] hover:underline underline-offset-8 decoration-2 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
              <span className="w-2 h-2 bg-[#FF4D00]" aria-hidden="true" />
              <span className="hidden sm:inline">Available</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Section 2: Hero — the name IS the layout ─────────────────────── */}
      <header className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-14 md:pt-20 pb-10 md:pb-16">
        <RevealBlock>
          <MonoLabel className="text-[#FF4D00] mb-6 md:mb-10">
            Independent Designer &mdash; Portfolio 2026
          </MonoLabel>
        </RevealBlock>
        <RevealBlock delay={0.1}>
          <h1 className="font-black uppercase tracking-tighter leading-[0.85]">
            <span className="block text-[clamp(4rem,16vw,13rem)]">Ava</span>
            <span
              className="block text-[clamp(4rem,16vw,13rem)]"
              style={{ WebkitTextStroke: "3px #0A0A0A", color: "transparent" }}
            >
              Carter
            </span>
          </h1>
        </RevealBlock>
        <RevealBlock delay={0.2}>
          <div className="flex flex-wrap items-end justify-between gap-4 mt-10 md:mt-14 border-t border-[#0A0A0A]/15 pt-4">
            <MonoLabel className="text-[#71717A]">Based in Rotterdam</MonoLabel>
            <MonoLabel className="text-[#71717A]">Graphic &amp; Type Design</MonoLabel>
            <MonoLabel className="text-[#71717A]">
              Scroll <span aria-hidden="true">&darr;</span>
            </MonoLabel>
          </div>
        </RevealBlock>
      </header>

      {/* ── Section 3: Marquee strip ─────────────────────────────────────── */}
      <RevealBlock>
        <Marquee items={["Available for Work", "Brand Identity", "Web Design", "Art Direction"]} />
      </RevealBlock>

      {/* ── Section 4: Works index + filter (interaction 1) ──────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="01" title="Selected Work" />
        </RevealBlock>
        <RevealBlock>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {disciplines.map((d) => (
              <button
                key={d}
                onClick={() => setActiveFilter(d)}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-widest rounded-none border transition-colors duration-200 ${
                  activeFilter === d
                    ? "bg-[#0A0A0A] text-[#FAFAF8] border-[#0A0A0A]"
                    : "bg-transparent text-[#71717A] border-[#0A0A0A]/20 hover:text-[#0A0A0A] hover:border-[#0A0A0A]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </RevealBlock>
        <div>
          {filteredWorks.map((work, i) => (
            <RevealBlock key={work.index} delay={i * 0.06}>
              <div className="group border-t border-[#0A0A0A]/15 py-6 md:py-8 cursor-pointer">
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-mono text-sm text-[#71717A] shrink-0 w-8">{work.index}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[clamp(1.75rem,5vw,4rem)] font-black uppercase tracking-tighter leading-[0.9] group-hover:text-[#FF4D00] transition-colors duration-200">
                      {work.title}
                    </h3>
                    <MonoLabel className="text-[#71717A] mt-2 md:mt-3">
                      {work.discipline} &mdash; {work.year}
                    </MonoLabel>
                  </div>
                  <div className="hidden sm:block w-16 h-12 bg-[#E4E4E7] shrink-0" aria-hidden="true" />
                  <span
                    className="text-2xl md:text-3xl shrink-0 group-hover:translate-x-2 group-hover:text-[#FF4D00] transition-all duration-200"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              </div>
            </RevealBlock>
          ))}
          <div className="border-t border-[#0A0A0A]/15" />
        </div>
      </section>

      {/* ── Section 5: Color palette ─────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="02" title="One Accent Only" />
        </RevealBlock>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[#0A0A0A]/15 border border-[#0A0A0A]/15">
          {palette.map((c, i) => (
            <RevealBlock key={c.hex} delay={i * 0.05} className="bg-[#FAFAF8]">
              <div className="p-4">
                <div className={`h-28 md:h-36 ${c.bg} ${c.border ? "border border-[#0A0A0A]/15" : ""}`} />
                <p className="font-black uppercase tracking-tighter text-lg mt-3 leading-none">{c.name}</p>
                <MonoLabel className="text-[#71717A] mt-1.5">{c.hex}</MonoLabel>
              </div>
            </RevealBlock>
          ))}
        </div>
        <RevealBlock>
          <MonoLabel className="text-[#71717A] mt-4">
            95% black on warm white &mdash; #FF4D00 appears only where it matters
          </MonoLabel>
        </RevealBlock>
      </section>

      {/* ── Section 6: Type scale ────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="03" title="Fluid Type Scale" />
        </RevealBlock>
        <div>
          {typeScale.map((row, i) => (
            <RevealBlock key={row.label} delay={i * 0.08}>
              <div className="border-t border-[#0A0A0A]/15 py-6 md:py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10">
                <div className="md:w-64 shrink-0">
                  <MonoLabel>{row.label}</MonoLabel>
                  <MonoLabel className="text-[#71717A] mt-1">{row.spec}</MonoLabel>
                </div>
                <p className={`${row.classes} font-black uppercase tracking-tighter leading-[0.85] min-w-0 break-words`}>
                  {row.sample}
                </p>
              </div>
            </RevealBlock>
          ))}
          <RevealBlock>
            <div className="border-t border-[#0A0A0A]/15 py-6 md:py-8 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-10">
              <div className="md:w-64 shrink-0">
                <MonoLabel>Micro</MonoLabel>
                <MonoLabel className="text-[#71717A] mt-1">0.75rem / mono / +0.2em</MonoLabel>
              </div>
              <MonoLabel>The second voice: navigation, captions, metadata</MonoLabel>
            </div>
          </RevealBlock>
          <div className="border-t border-[#0A0A0A]/15" />
        </div>
      </section>

      {/* ── Section 7: Buttons (4 variants) ──────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="04" title="Buttons" />
        </RevealBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#0A0A0A]/15 border border-[#0A0A0A]/15">
          <RevealBlock className="bg-[#FAFAF8]">
            <div className="p-6 md:p-8 flex flex-col gap-6 h-full">
              <MonoLabel className="text-[#71717A]">Primary</MonoLabel>
              <button className="self-start px-8 py-4 bg-[#0A0A0A] text-[#FAFAF8] font-mono text-xs uppercase tracking-widest rounded-none border border-[#0A0A0A] hover:bg-[#FF4D00] hover:border-[#FF4D00] transition-colors duration-200">
                Start a Project
              </button>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.05} className="bg-[#FAFAF8]">
            <div className="p-6 md:p-8 flex flex-col gap-6 h-full">
              <MonoLabel className="text-[#71717A]">Outline</MonoLabel>
              <button className="self-start px-8 py-4 bg-transparent text-[#0A0A0A] font-mono text-xs uppercase tracking-widest rounded-none border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FAFAF8] transition-colors duration-200">
                View Archive
              </button>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.1} className="bg-[#FAFAF8]">
            <div className="p-6 md:p-8 flex flex-col gap-6 h-full">
              <MonoLabel className="text-[#71717A]">Accent</MonoLabel>
              <button className="self-start px-8 py-4 bg-[#FF4D00] text-[#FAFAF8] font-mono text-xs uppercase tracking-widest rounded-none border border-[#FF4D00] hover:bg-[#0A0A0A] hover:border-[#0A0A0A] transition-colors duration-200">
                Book a Call
              </button>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.15} className="bg-[#FAFAF8]">
            <div className="p-6 md:p-8 flex flex-col gap-6 h-full">
              <MonoLabel className="text-[#71717A]">Ghost</MonoLabel>
              <button className="self-start px-2 py-4 bg-transparent text-[#0A0A0A] font-mono text-xs uppercase tracking-widest rounded-none underline underline-offset-8 decoration-2 hover:text-[#FF4D00] transition-colors duration-200">
                Read the Journal <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Section 8: Cards (3 variants) ────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="05" title="Cards" />
        </RevealBlock>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RevealBlock>
            <MonoLabel className="text-[#71717A] mb-4">Index Row</MonoLabel>
            <div className="group border-t border-b border-[#0A0A0A]/15 py-8 cursor-pointer">
              <span className="font-mono text-sm text-[#71717A]">06</span>
              <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-black uppercase tracking-tighter leading-[0.9] mt-2 group-hover:text-[#FF4D00] transition-colors duration-200">
                Paper Type Specimen
              </h3>
              <MonoLabel className="text-[#71717A] mt-3">Print &mdash; 2026</MonoLabel>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.08}>
            <MonoLabel className="text-[#71717A] mb-4">Boxed</MonoLabel>
            <div className="border border-[#0A0A0A] rounded-none p-6 md:p-8">
              <MonoLabel className="text-[#FF4D00]">Case Study</MonoLabel>
              <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-black uppercase tracking-tighter leading-[0.9] mt-3">
                Kern Festival
              </h3>
              <p className="text-sm text-[#71717A] leading-relaxed mt-4">
                A festival identity where the schedule itself becomes the poster: 96 names, one grid, zero photographs.
              </p>
              <button className="mt-6 font-mono text-xs uppercase tracking-widest underline underline-offset-8 decoration-2 hover:text-[#FF4D00] transition-colors">
                Open Case <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.16}>
            <MonoLabel className="text-[#71717A] mb-4">Inverted</MonoLabel>
            <div className="bg-[#0A0A0A] text-[#FAFAF8] rounded-none p-6 md:p-8">
              <MonoLabel className="text-[#FF4D00]">Now Playing</MonoLabel>
              <h3
                className="text-[clamp(1.75rem,3vw,2.5rem)] font-black uppercase tracking-tighter leading-[0.9] mt-3"
                style={{ WebkitTextStroke: "1.5px #FAFAF8", color: "transparent" }}
              >
                Mono Records
              </h3>
              <p className="text-sm text-[#FAFAF8]/60 leading-relaxed mt-4">
                Record label identity set in a single weight. The sleeve is the wordmark, scaled until it bleeds.
              </p>
              <MonoLabel className="text-[#FAFAF8]/60 mt-6">Identity &mdash; 2025</MonoLabel>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Section 9: About tabs (interaction 2) ────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="06" title="About" />
        </RevealBlock>
        <RevealBlock>
          <div className="flex flex-wrap border border-[#0A0A0A]/20">
            {aboutTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[8rem] px-5 py-4 font-mono text-xs uppercase tracking-widest rounded-none border-r border-[#0A0A0A]/20 last:border-r-0 transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-[#0A0A0A] text-[#FAFAF8]"
                    : "bg-transparent text-[#71717A] hover:text-[#0A0A0A]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-t-0 border-[#0A0A0A]/20 p-6 md:p-10">
            <div className="lg:col-span-8">
              <h3 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase tracking-tighter leading-[0.9]">
                {tabContent[activeTab].heading}
              </h3>
              <p className="text-sm md:text-base text-[#71717A] leading-relaxed mt-6 max-w-2xl">
                {tabContent[activeTab].body}
              </p>
              <MonoLabel className="text-[#FF4D00] mt-8">{tabContent[activeTab].meta}</MonoLabel>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end items-start">
              <div className="w-32 h-40 bg-[#E4E4E7] relative shrink-0" aria-hidden="true">
                <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-[#71717A]">
                  Fig. 01
                </span>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ── Section 10: Form + newsletter (interaction 3) ────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="07" title="Start Something" />
        </RevealBlock>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <RevealBlock>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="ot-name" className="font-mono text-xs uppercase tracking-widest text-[#71717A] block mb-1">
                  01 &mdash; Name
                </label>
                <input
                  id="ot-name"
                  type="text"
                  placeholder="JANE DOE"
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/30 rounded-none font-mono text-sm uppercase tracking-widest placeholder:text-[#71717A]/60 focus:outline-none focus:border-b-2 focus:border-[#FF4D00] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="ot-email" className="font-mono text-xs uppercase tracking-widest text-[#71717A] block mb-1">
                  02 &mdash; Email
                </label>
                <input
                  id="ot-email"
                  type="email"
                  placeholder="YOU@STUDIO.COM"
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/30 rounded-none font-mono text-sm uppercase tracking-widest placeholder:text-[#71717A]/60 focus:outline-none focus:border-b-2 focus:border-[#FF4D00] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="ot-brief" className="font-mono text-xs uppercase tracking-widest text-[#71717A] block mb-1">
                  03 &mdash; Brief
                </label>
                <textarea
                  id="ot-brief"
                  rows={3}
                  placeholder="TELL ME EVERYTHING"
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/30 rounded-none font-mono text-sm uppercase tracking-widest placeholder:text-[#71717A]/60 focus:outline-none focus:border-b-2 focus:border-[#FF4D00] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-10 py-5 bg-[#0A0A0A] text-[#FAFAF8] font-mono text-xs uppercase tracking-widest rounded-none hover:bg-[#FF4D00] transition-colors duration-200"
              >
                Send Inquiry <span aria-hidden="true">&rarr;</span>
              </button>
            </form>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="border border-[#0A0A0A] p-6 md:p-10 h-full flex flex-col justify-between gap-10">
              <div>
                <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-tighter leading-[0.9]">
                  Type<br />Letter
                </h3>
                <p className="text-sm text-[#71717A] leading-relaxed mt-4 max-w-sm">
                  A monthly letter on oversized type, variable fonts, and portfolios that shout. No images attached, obviously.
                </p>
              </div>
              <div>
                {subscribed ? (
                  <div className="border-l-4 border-[#FF4D00] pl-4 py-2">
                    <MonoLabel className="text-[#FF4D00]">Subscribed</MonoLabel>
                    <MonoLabel className="text-[#71717A] mt-1">Issue 27 lands next Monday</MonoLabel>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="YOUR EMAIL"
                      aria-label="Newsletter email"
                      className="flex-1 min-w-0 px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/30 rounded-none font-mono text-xs uppercase tracking-widest placeholder:text-[#71717A]/60 focus:outline-none focus:border-b-2 focus:border-[#FF4D00] transition-colors"
                    />
                    <button
                      onClick={() => setSubscribed(true)}
                      className="px-6 py-4 bg-transparent text-[#0A0A0A] font-mono text-xs uppercase tracking-widest rounded-none border border-[#0A0A0A] hover:bg-[#FF4D00] hover:border-[#FF4D00] hover:text-[#FAFAF8] transition-colors duration-200 shrink-0"
                    >
                      Join
                    </button>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Section 11: Badges ───────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="08" title="Badges" />
        </RevealBlock>
        <RevealBlock>
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-4 py-2 bg-[#0A0A0A] text-[#FAFAF8] font-mono text-[10px] uppercase tracking-widest rounded-none">
              New
            </span>
            <span className="px-4 py-2 bg-[#FF4D00] text-[#FAFAF8] font-mono text-[10px] uppercase tracking-widest rounded-none">
              Available
            </span>
            <span className="px-4 py-2 border border-[#0A0A0A] text-[#0A0A0A] font-mono text-[10px] uppercase tracking-widest rounded-none">
              2026
            </span>
            <span className="px-4 py-2 border border-[#0A0A0A]/25 text-[#71717A] font-mono text-[10px] uppercase tracking-widest rounded-none">
              Archived
            </span>
            <span className="px-4 py-2 border border-[#FF4D00] text-[#FF4D00] font-mono text-[10px] uppercase tracking-widest rounded-none">
              Sold Out
            </span>
          </div>
        </RevealBlock>
      </section>

      {/* ── Section 12: Progress / capabilities ──────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="09" title="Capabilities" />
        </RevealBlock>
        <div className="space-y-8">
          {skills.map((skill, i) => (
            <RevealBlock key={skill.label} delay={i * 0.08}>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[clamp(1.25rem,2.5vw,2rem)] font-black uppercase tracking-tighter leading-none">
                  {skill.label}
                </span>
                <span className="font-mono text-xs tracking-widest text-[#71717A]">{skill.value}%</span>
              </div>
              <div className="h-[3px] bg-[#0A0A0A]/10 w-full">
                <div
                  className={`h-full ${skill.value >= 90 ? "bg-[#FF4D00]" : "bg-[#0A0A0A]"}`}
                  style={{ width: `${skill.value}%` }}
                />
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── Section 13: Alerts ───────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="10" title="Alerts" />
        </RevealBlock>
        <div className="space-y-4">
          <RevealBlock>
            <div className="border border-[#0A0A0A]/20 rounded-none px-5 py-4 flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <MonoLabel className="shrink-0">Note</MonoLabel>
              <p className="text-sm text-[#71717A]">The studio is closed for Kern Festival, May 14&ndash;16.</p>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.06}>
            <div className="border-l-4 border-[#0A0A0A] bg-[#E4E4E7]/40 rounded-none px-5 py-4 flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <MonoLabel className="shrink-0">Confirmed</MonoLabel>
              <p className="text-sm text-[#71717A]">Your inquiry landed. Expect a reply set entirely in caps.</p>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.12}>
            <div className="border-l-4 border-[#FF4D00] rounded-none px-5 py-4 flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <MonoLabel className="shrink-0 text-[#FF4D00]">Urgent</MonoLabel>
              <p className="text-sm text-[#71717A]">Only one project slot remains for Q3 2026.</p>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.18}>
            <div className="bg-[#0A0A0A] text-[#FAFAF8] rounded-none px-5 py-4 flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <MonoLabel className="shrink-0 text-[#FF4D00]">System</MonoLabel>
              <p className="text-sm text-[#FAFAF8]/70">Dark sections invert the palette; the orange survives.</p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Section 14: Index table ──────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="11" title="Full Index" />
        </RevealBlock>
        <RevealBlock>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-[#0A0A0A]">
                  {["Year", "Project", "Client", "Discipline", "Status"].map((h) => (
                    <th key={h} className="py-3 pr-6 font-mono text-xs uppercase tracking-widest font-normal text-[#71717A]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {indexTable.map((row) => (
                  <tr
                    key={row.project}
                    className="border-b border-[#0A0A0A]/15 group hover:bg-[#E4E4E7]/30 transition-colors cursor-pointer"
                  >
                    <td className="py-4 pr-6 font-mono text-xs tracking-widest text-[#71717A]">{row.year}</td>
                    <td className="py-4 pr-6 font-black uppercase tracking-tighter text-lg md:text-xl leading-none group-hover:text-[#FF4D00] transition-colors">
                      {row.project}
                    </td>
                    <td className="py-4 pr-6 text-sm text-[#71717A]">{row.client}</td>
                    <td className="py-4 pr-6 font-mono text-xs uppercase tracking-widest text-[#71717A]">
                      {row.discipline}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest rounded-none ${
                          row.status === "Live"
                            ? "bg-[#0A0A0A] text-[#FAFAF8]"
                            : "border border-[#0A0A0A]/25 text-[#71717A]"
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
        </RevealBlock>
      </section>

      {/* ── Section 15: Manifesto quote (inverted) ───────────────────────── */}
      <section className="bg-[#0A0A0A] text-[#FAFAF8] py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <RevealBlock>
            <MonoLabel className="text-[#FF4D00] mb-8">Manifesto &mdash; 04.01</MonoLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <blockquote className="font-black uppercase tracking-tighter leading-[0.9]">
              <span className="block text-[clamp(2.5rem,8vw,7rem)]">Type is</span>
              <span
                className="block text-[clamp(2.5rem,8vw,7rem)]"
                style={{ WebkitTextStroke: "2px #FAFAF8", color: "transparent" }}
              >
                the layout
              </span>
              <span className="block text-[clamp(2.5rem,8vw,7rem)] text-[#FF4D00]">Full stop.</span>
            </blockquote>
          </RevealBlock>
          <RevealBlock delay={0.2}>
            <div className="flex flex-wrap justify-between gap-4 mt-12 pt-5 border-t border-[#FAFAF8]/20">
              <MonoLabel className="text-[#FAFAF8]/60">Ava Carter, Rotterdam Talks 2026</MonoLabel>
              <MonoLabel className="text-[#FAFAF8]/60">00:14:32</MonoLabel>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Section 16: Dividers ─────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="12" title="Dividers" />
        </RevealBlock>
        <div className="space-y-10">
          <RevealBlock>
            <MonoLabel className="text-[#71717A] mb-3">Hairline / border-[#0A0A0A]/15</MonoLabel>
            <div className="border-t border-[#0A0A0A]/15" />
          </RevealBlock>
          <RevealBlock delay={0.05}>
            <MonoLabel className="text-[#71717A] mb-3">Rule / border-t-2</MonoLabel>
            <div className="border-t-2 border-[#0A0A0A]" />
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <MonoLabel className="text-[#71717A] mb-3">Bar / h-2 bg-[#0A0A0A]</MonoLabel>
            <div className="h-2 bg-[#0A0A0A]" />
          </RevealBlock>
          <RevealBlock delay={0.15}>
            <MonoLabel className="text-[#71717A] mb-3">Accent tick / w-24 h-1 bg-[#FF4D00]</MonoLabel>
            <div className="w-24 h-1 bg-[#FF4D00]" />
          </RevealBlock>
        </div>
      </section>

      {/* ── Section 17: Design rules ─────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <RevealBlock>
          <SectionHeader index="13" title="The Rules" />
        </RevealBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0A0A0A]/15 border border-[#0A0A0A]/15">
          <RevealBlock className="bg-[#FAFAF8]">
            <div className="p-6 md:p-10 h-full">
              <MonoLabel className="text-[#0A0A0A] mb-6">Do</MonoLabel>
              <ul className="space-y-4">
                {[
                  "Fluid clamp() sizes that fill the viewport",
                  "font-black, tracking-tighter, leading-[0.85]",
                  "Uppercase display, mono uppercase micro-labels",
                  "Giant section numbers 01 / 02 / 03",
                  "Black and white plus one orange",
                  "Underline or color-flip on hover",
                ].map((rule) => (
                  <li key={rule} className="flex items-baseline gap-3 text-sm text-[#71717A]">
                    <span className="font-mono text-xs text-[#0A0A0A] shrink-0" aria-hidden="true">+</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.1} className="bg-[#FAFAF8]">
            <div className="p-6 md:p-10 h-full">
              <MonoLabel className="text-[#FF4D00] mb-6">Don&apos;t</MonoLabel>
              <ul className="space-y-4">
                {[
                  "Gradients of any kind",
                  "Rounded card stacks (rounded-sm is the ceiling)",
                  "Shadows, glows, or drop filters",
                  "A second accent color",
                  "Decorative icons doing the talking",
                  "Centered, timid, medium-sized headings",
                ].map((rule) => (
                  <li key={rule} className="flex items-baseline gap-3 text-sm text-[#71717A]">
                    <span className="font-mono text-xs text-[#FF4D00] shrink-0" aria-hidden="true">x</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Section 18: Outro marquee (dark) ─────────────────────────────── */}
      <RevealBlock>
        <Marquee dark items={["Let's Work Together", "Rotterdam", "Worldwide", "Since 2016"]} />
      </RevealBlock>

      {/* ── Section 19: Footer ───────────────────────────────────────────── */}
      <footer className="bg-[#0A0A0A] text-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-16 md:pt-24 pb-10">
          <RevealBlock>
            <MonoLabel className="text-[#FF4D00] mb-6">Have an idea?</MonoLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="block text-[clamp(3rem,12vw,10rem)] font-black uppercase tracking-tighter leading-[0.85] hover:text-[#FF4D00] transition-colors duration-200"
            >
              Let&apos;s Talk <span aria-hidden="true">&rarr;</span>
            </a>
          </RevealBlock>
          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 md:mt-24 pt-6 border-t border-[#FAFAF8]/20">
              <div>
                <MonoLabel className="text-[#FAFAF8]/40 mb-3">Studio</MonoLabel>
                <div className="space-y-2 font-mono text-xs uppercase tracking-widest text-[#FAFAF8]/70">
                  <p className="hover:text-[#FF4D00] cursor-pointer transition-colors">Work</p>
                  <p className="hover:text-[#FF4D00] cursor-pointer transition-colors">About</p>
                  <p className="hover:text-[#FF4D00] cursor-pointer transition-colors">Journal</p>
                </div>
              </div>
              <div>
                <MonoLabel className="text-[#FAFAF8]/40 mb-3">Social</MonoLabel>
                <div className="space-y-2 font-mono text-xs uppercase tracking-widest text-[#FAFAF8]/70">
                  <p className="hover:text-[#FF4D00] cursor-pointer transition-colors">Instagram</p>
                  <p className="hover:text-[#FF4D00] cursor-pointer transition-colors">Behance</p>
                  <p className="hover:text-[#FF4D00] cursor-pointer transition-colors">Are.na</p>
                </div>
              </div>
              <div>
                <MonoLabel className="text-[#FAFAF8]/40 mb-3">Office</MonoLabel>
                <div className="space-y-2 font-mono text-xs uppercase tracking-widest text-[#FAFAF8]/70">
                  <p>Witte de Withstraat 4</p>
                  <p>3012 BP Rotterdam</p>
                  <p>The Netherlands</p>
                </div>
              </div>
              <div>
                <MonoLabel className="text-[#FAFAF8]/40 mb-3">Local Time</MonoLabel>
                <p className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tighter leading-none">14:32</p>
                <MonoLabel className="text-[#FAFAF8]/70 mt-2">CET / UTC+1</MonoLabel>
              </div>
            </div>
          </RevealBlock>
          <div className="flex flex-wrap justify-between gap-4 mt-12 pt-6 border-t border-[#FAFAF8]/20">
            <MonoLabel className="text-[#FAFAF8]/40">&copy; 2026 Ava Carter</MonoLabel>
            <MonoLabel className="text-[#FAFAF8]/40">Set in one typeface, obviously</MonoLabel>
          </div>
        </div>
      </footer>
    </div>
  );
}
