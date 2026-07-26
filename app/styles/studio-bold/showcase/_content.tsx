"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Discipline = "BRANDING" | "DIGITAL" | "MOTION" | "STRATEGY";
type WorkFilter = "ALL" | Discipline;

interface Project {
  title: string;
  tag: string;
  sector: string;
  discipline: Discipline;
  year: string;
  w: 1 | 2;
  tone: "dark" | "coral" | "graphite";
  mark: string;
}

const projects: Project[] = [
  { title: "BRØD", tag: "Brand Identity", sector: "Food & Beverage", discipline: "BRANDING", year: "2025", w: 2, tone: "dark", mark: "B" },
  { title: "Atlas", tag: "Web Platform", sector: "SaaS / Tech", discipline: "DIGITAL", year: "2024", w: 1, tone: "graphite", mark: "A" },
  { title: "Maison Noire", tag: "Art Direction", sector: "Luxury", discipline: "BRANDING", year: "2024", w: 1, tone: "dark", mark: "M" },
  { title: "Drift", tag: "Product Design", sector: "Consumer", discipline: "DIGITAL", year: "2025", w: 2, tone: "graphite", mark: "D" },
  { title: "Signal", tag: "Motion System", sector: "Fintech", discipline: "MOTION", year: "2023", w: 1, tone: "coral", mark: "S" },
  { title: "Terra", tag: "Positioning", sector: "Sustainability", discipline: "STRATEGY", year: "2024", w: 2, tone: "dark", mark: "T" },
  { title: "Form", tag: "Editorial Motion", sector: "Publishing", discipline: "MOTION", year: "2023", w: 1, tone: "graphite", mark: "F" },
  { title: "Pulse", tag: "Growth Strategy", sector: "Health", discipline: "STRATEGY", year: "2025", w: 1, tone: "dark", mark: "P" },
];

const workFilters: WorkFilter[] = ["ALL", "BRANDING", "DIGITAL", "MOTION", "STRATEGY"];

const clients = ["ACME CORP", "BRANDCO", "LAYER", "FRAME", "STUDIO X", "DESIGN LAB", "VOID", "MOTIF"];

interface Service {
  id: string;
  label: string;
  num: string;
  headline: string;
  body: string;
  deliverables: string[];
  statN: string;
  statL: string;
}

const services: Service[] = [
  {
    id: "brand",
    label: "BRAND IDENTITY",
    num: "01",
    headline: "Identities with a spine.",
    body: "We build brands that pick a side. Naming, mark, voice, and system — engineered so that every touchpoint argues the same point, from the favicon to the flagship store.",
    deliverables: ["Naming and verbal identity", "Logo and mark systems", "Typography and color systems", "Guidelines and rollout kits"],
    statN: "40+",
    statL: "IDENTITIES SHIPPED",
  },
  {
    id: "digital",
    label: "DIGITAL PRODUCT",
    num: "02",
    headline: "Products that look like they behave.",
    body: "Interface systems where the brand is load-bearing, not decoration. We design the flows, the components, and the design system that keeps them honest at scale.",
    deliverables: ["Web platforms and marketing sites", "Product and app design", "Design systems and tokens", "Prototyping and handoff"],
    statN: "60+",
    statL: "PRODUCTS LAUNCHED",
  },
  {
    id: "motion",
    label: "MOTION & FILM",
    num: "03",
    headline: "Brands that move on purpose.",
    body: "Motion languages, launch films, and interface animation — choreographed to the same beat as the identity. If it moves, it should mean something.",
    deliverables: ["Motion identity toolkits", "Launch and campaign film", "Interface animation specs", "Social and broadcast cutdowns"],
    statN: "25+",
    statL: "FILMS DELIVERED",
  },
  {
    id: "strategy",
    label: "STRATEGY",
    num: "04",
    headline: "Positioning before polish.",
    body: "Research, audience mapping, and positioning that give the creative work somewhere to stand. Strategy is the part of the poster you cannot see.",
    deliverables: ["Brand and market research", "Positioning and messaging", "Audience and journey maps", "Launch and growth planning"],
    statN: "30+",
    statL: "STRATEGIES WRITTEN",
  },
];

const paletteSwatches = [
  { hex: "#FF6B6B", name: "CORAL", role: "THE ONLY ACCENT", usage: "CTAs, highlights, hover states", share: 10, bg: "bg-[#FF6B6B]", text: "text-white", sub: "text-white/60" },
  { hex: "#1A1A1A", name: "INK", role: "PRIMARY SURFACE", usage: "Hero, nav, dark sections", share: 40, bg: "bg-[#1A1A1A]", text: "text-white", sub: "text-white/50" },
  { hex: "#F5F5F0", name: "SAND", role: "BREATHING SURFACE", usage: "Light content sections", share: 30, bg: "bg-[#F5F5F0]", text: "text-[#1A1A1A]", sub: "text-[#1A1A1A]/50" },
  { hex: "#0D0D0D", name: "DEEP", role: "CLOSING SURFACE", usage: "Footer, contact, palette", share: 12, bg: "bg-[#0D0D0D]", text: "text-white", sub: "text-white/40" },
  { hex: "#333333", name: "GRAPHITE", role: "SUPPORT SURFACE", usage: "Inputs, tiles, dividers", share: 6, bg: "bg-[#333333]", text: "text-white", sub: "text-white/50" },
  { hex: "#FFFFFF", name: "WHITE", role: "TEXT ONLY", usage: "Never a background", share: 2, bg: "bg-white", text: "text-[#1A1A1A]", sub: "text-[#1A1A1A]/50" },
];

const typeScale = [
  { label: "HERO / 900", spec: "clamp(3rem, 10vw, 9rem)", cls: "font-black leading-[0.92] tracking-[-0.04em] text-5xl md:text-8xl", sample: "BOLD" },
  { label: "DISPLAY / 700", spec: "text-6xl", cls: "font-bold tracking-tight leading-none text-4xl md:text-6xl", sample: "Statement" },
  { label: "HEADLINE / 700", spec: "text-4xl", cls: "font-bold tracking-tight leading-tight text-2xl md:text-4xl", sample: "Section headline" },
  { label: "TITLE / 700", spec: "text-2xl", cls: "font-bold tracking-tight text-xl md:text-2xl", sample: "Card and panel titles" },
  { label: "BODY / 400", spec: "text-lg", cls: "font-light leading-relaxed text-base md:text-lg", sample: "Body copy stays light and generous, set against the weight above it." },
  { label: "LABEL / 500", spec: "text-xs tracking-[0.25em]", cls: "font-medium uppercase tracking-[0.25em] text-xs", sample: "EYEBROW LABEL — EST. 2018" },
];

const weightTrio = [
  { weight: "400", name: "REGULAR", cls: "font-normal", note: "Body copy and long-form reading" },
  { weight: "700", name: "BOLD", cls: "font-bold", note: "Headlines, titles, and CTAs" },
  { weight: "900", name: "BLACK", cls: "font-black", note: "Hero type and poster moments" },
];

interface ProcessStep {
  num: string;
  title: string;
  duration: string;
  desc: string;
  outputs: string[];
}

const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Discover",
    duration: "WEEKS 1-2",
    desc: "Research, stakeholder interviews, and a brutal audit of where the brand actually stands. We leave this phase knowing more about your audience than they know about themselves.",
    outputs: ["Audit report", "Audience map", "Opportunity brief"],
  },
  {
    num: "02",
    title: "Define",
    duration: "WEEKS 3-4",
    desc: "Strategy, positioning, and a creative direction with a point of view. Every decision after this phase can be traced back to one page of this deck.",
    outputs: ["Strategy deck", "Positioning statement", "Creative direction"],
  },
  {
    num: "03",
    title: "Design",
    duration: "WEEKS 5-10",
    desc: "Iterative exploration in weekly rounds. You see work early and often — posters before pixels, systems before screens, and nothing precious until it earns it.",
    outputs: ["Identity system", "Product design", "Motion toolkit"],
  },
  {
    num: "04",
    title: "Deliver",
    duration: "WEEKS 11-12",
    desc: "Production-ready assets, documentation your team will actually read, and launch support until the work is standing on its own.",
    outputs: ["Asset library", "Guidelines site", "Launch support"],
  },
];

const engagements = [
  { client: "BRØD", phase: "DELIVER", pct: 82 },
  { client: "Atlas", phase: "DESIGN", pct: 48 },
  { client: "Terra", phase: "DEFINE", pct: 24 },
];

const phases = ["DISCOVER", "DEFINE", "DESIGN", "DELIVER"];

interface LedgerRow {
  client: string;
  project: string;
  discipline: Discipline;
  year: string;
  status: "LIVE" | "RETAINED" | "IN BUILD" | "ARCHIVED";
  fee: string;
}

const ledger: LedgerRow[] = [
  { client: "BRØD", project: "Full rebrand", discipline: "BRANDING", year: "2025", status: "LIVE", fee: "$120K" },
  { client: "Atlas", project: "Platform design system", discipline: "DIGITAL", year: "2024", status: "RETAINED", fee: "$95K" },
  { client: "Maison Noire", project: "Campaign art direction", discipline: "BRANDING", year: "2024", status: "LIVE", fee: "$70K" },
  { client: "Drift", project: "App redesign", discipline: "DIGITAL", year: "2025", status: "IN BUILD", fee: "$88K" },
  { client: "Signal", project: "Motion identity", discipline: "MOTION", year: "2023", status: "ARCHIVED", fee: "$45K" },
  { client: "Terra", project: "Positioning and launch", discipline: "STRATEGY", year: "2024", status: "LIVE", fee: "$60K" },
  { client: "Form", project: "Editorial motion toolkit", discipline: "MOTION", year: "2023", status: "ARCHIVED", fee: "$38K" },
  { client: "Pulse", project: "Growth strategy sprint", discipline: "STRATEGY", year: "2025", status: "IN BUILD", fee: "$52K" },
];

const LEDGER_PAGE_SIZE = 4;

interface AlertItem {
  id: string;
  kind: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  title: string;
  msg: string;
  meta: string;
}

const alertItems: AlertItem[] = [
  { id: "info", kind: "INFO", title: "NEW CASE STUDY", msg: "The BRØD identity case study is now live in Selected Work. Twelve weeks, one bakery, zero beige.", meta: "2 MIN READ" },
  { id: "success", kind: "SUCCESS", title: "SLOT CONFIRMED", msg: "Your project slot for Q4 2026 is confirmed. The kickoff deck lands in your inbox on Monday.", meta: "JUST NOW" },
  { id: "warning", kind: "WARNING", title: "ONE SLOT LEFT", msg: "Only one engagement slot remains this quarter. After that, the waitlist opens for spring.", meta: "CAPACITY" },
  { id: "error", kind: "ERROR", title: "UPLOAD FAILED", msg: "Your brief exceeded 25MB. Compress the deck or send us a link — we read everything either way.", meta: "RETRY" },
];

const testimonials = [
  {
    quote: "They took our half-formed idea and returned a brand with a point of view. Every deliverable felt inevitable, like it could not have been anything else.",
    name: "Mara Jensen",
    role: "Founder, BRØD",
  },
  {
    quote: "The rare studio that argues with you — and is usually right. Our platform finally looks the way it behaves.",
    name: "Devon Okafor",
    role: "VP Product, Atlas",
  },
  {
    quote: "Rebranding mid-crisis was terrifying. Studio Bold made it feel like the obvious move all along, then shipped it two weeks early.",
    name: "Lena Ortiz",
    role: "CMO, Terra",
  },
];

const team = [
  { initials: "MK", name: "Mikkel Krogh", role: "Creative Director", tone: "coral" },
  { initials: "AS", name: "Ana Silva", role: "Head of Strategy", tone: "sand" },
  { initials: "JW", name: "Jonas Weber", role: "Design Lead", tone: "graphite" },
  { initials: "RP", name: "Rhea Patel", role: "Motion Lead", tone: "coral" },
  { initials: "TO", name: "Tomas Olsen", role: "Engineering Lead", tone: "sand" },
  { initials: "CN", name: "Chidi Nwosu", role: "Producer", tone: "graphite" },
] as const;

const projectTypes = ["BRANDING", "DIGITAL", "MOTION", "STRATEGY"] as const;

const doRules = [
  "Pair bg-[#1A1A1A] with white text in dark sections; bg-[#F5F5F0] with ink in light ones",
  "Hero headings start at text-6xl and climb — highlight one word in coral",
  "Cards are square posters: rounded-none, hover fires scale-[1.02] and shadow-2xl together",
  "CTAs run coral with bold labels; hover lifts -translate-y-0.5 and adds shadow-xl",
  "Client logos sit grayscale at 60% opacity until hover restores them",
  "Separate sections by switching background color blocks, never by drawing borders",
  "Fix the nav to the top at 95% ink with backdrop blur; hovers turn coral",
  "Set testimonials centered and italic at text-2xl minimum with generous padding",
];

const dontRules = [
  "No hero headings below text-5xl — the opening viewport must hit hard",
  "No rounded-lg or larger radii; only avatars are allowed to be circles",
  "No serif fonts anywhere — weights 400 / 700 / 900 do the expressive work",
  "No thin borders between sections — the color switch is the separator",
  "No single-axis hovers — scale, shadow, and color must move together",
  "No pure white backgrounds — white belongs to text and text alone",
];

const marqueeItems = ["BRAND IDENTITY", "DIGITAL PRODUCT", "MOTION & FILM", "STRATEGY", "ART DIRECTION"];

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
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

function Reveal({
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
        transform: inView ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared pieces                                                      */
/* ------------------------------------------------------------------ */

function SectionIntro({
  index,
  eyebrow,
  title,
  tone,
  meta,
}: {
  index: string;
  eyebrow: string;
  title: string;
  tone: "dark" | "light";
  meta?: string;
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-[#1A1A1A]";
  const metaColor = tone === "dark" ? "text-white/30" : "text-[#1A1A1A]/30";
  return (
    <Reveal>
      <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <p className="text-xs font-medium text-[#FF6B6B] uppercase tracking-[0.25em] mb-4">
            {index} — {eyebrow}
          </p>
          <h2 className={`text-4xl md:text-6xl font-bold tracking-tight leading-[0.95] ${titleColor}`}>{title}</h2>
        </div>
        {meta ? (
          <p className={`hidden md:block text-xs font-medium uppercase tracking-[0.2em] ${metaColor} text-right shrink-0 pb-2`}>{meta}</p>
        ) : null}
      </div>
    </Reveal>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const toneBg =
    project.tone === "coral"
      ? "bg-gradient-to-br from-[#FF6B6B] to-[#C24F4F]"
      : project.tone === "graphite"
        ? "bg-gradient-to-br from-[#3A3A3A] to-[#262626]"
        : "bg-gradient-to-br from-[#242424] to-[#141414]";
  return (
    <div className="group h-full bg-[#1A1A1A] rounded-none overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className={`absolute inset-0 ${toneBg} transition-transform duration-300 group-hover:scale-105`} />
        <span
          className={`absolute -bottom-8 -right-2 font-black leading-none select-none transition-transform duration-300 group-hover:-translate-y-2 ${
            project.tone === "coral" ? "text-white/15" : "text-white/5"
          }`}
          style={{ fontSize: "11rem" }}
          aria-hidden="true"
        >
          {project.mark}
        </span>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="text-[10px] uppercase tracking-[0.12em] bg-white/90 text-[#1A1A1A] px-3 py-1 font-medium">{project.tag}</span>
          <span className="text-[10px] uppercase tracking-[0.12em] bg-white/90 text-[#1A1A1A] px-3 py-1 font-medium">{project.year}</span>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-white group-hover:text-[#FF6B6B] transition-colors duration-300 mb-2 tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 font-light">{project.sector}</p>
        <div className="flex items-center gap-2 mt-5">
          <span className="text-sm font-medium text-[#FF6B6B]">View Case Study</span>
          <span className="text-[#FF6B6B] group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
        </div>
      </div>
    </div>
  );
}

function LedgerStatus({ status }: { status: LedgerRow["status"] }) {
  if (status === "LIVE") {
    return <span className="inline-block bg-[#FF6B6B] text-white text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1">Live</span>;
  }
  if (status === "RETAINED") {
    return (
      <span className="inline-block border-2 border-[#FF6B6B] text-[#FF6B6B] text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1">
        Retained
      </span>
    );
  }
  if (status === "IN BUILD") {
    return <span className="inline-block bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1">In Build</span>;
  }
  return (
    <span className="inline-block border-2 border-white/20 text-white/40 text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1">
      Archived
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Showcase                                                           */
/* ------------------------------------------------------------------ */

export default function StudioBoldShowcase() {
  const [heroIn, setHeroIn] = useState(false);
  const [workFilter, setWorkFilter] = useState<WorkFilter>("ALL");
  const [activeService, setActiveService] = useState<string>(services[0].id);
  const [openStep, setOpenStep] = useState<string | null>("01");
  const [ledgerPage, setLedgerPage] = useState(0);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [projectType, setProjectType] = useState<string>("BRANDING");

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  const visibleProjects = workFilter === "ALL" ? projects : projects.filter((p) => p.discipline === workFilter);
  const service = services.find((s) => s.id === activeService) ?? services[0];
  const ledgerPages = Math.ceil(ledger.length / LEDGER_PAGE_SIZE);
  const ledgerRows = ledger.slice(ledgerPage * LEDGER_PAGE_SIZE, ledgerPage * LEDGER_PAGE_SIZE + LEDGER_PAGE_SIZE);
  const visibleAlerts = alertItems.filter((a) => !dismissed.includes(a.id));
  const testimonial = testimonials[testimonialIndex];

  const heroStagger = (delay: string): React.CSSProperties => ({
    opacity: heroIn ? 1 : 0,
    transform: heroIn ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}`,
  });

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      <style>{`
        @keyframes sbMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .sb-marquee { animation: sbMarquee 30s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sb-marquee { animation: none; }
        }
      `}</style>

      {/* ============================================================
          01 NAV — fixed, ink at 95%, coral hovers
      ============================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <a href="#top" className="flex items-center gap-3 group">
            <span className="w-3 h-3 bg-[#FF6B6B] group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">
              STUDIO<span className="text-[#FF6B6B]">BOLD</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#work" className="hover:text-[#FF6B6B] transition-colors duration-200 font-medium">Work</a>
            <a href="#services" className="hover:text-[#FF6B6B] transition-colors duration-200 font-medium">Services</a>
            <a href="#process" className="hover:text-[#FF6B6B] transition-colors duration-200 font-medium">Process</a>
            <Link href="/styles/studio-bold" className="hover:text-[#FF6B6B] transition-colors duration-200 font-medium">
              StyleKit
            </Link>
            <a
              href="#contact"
              className="bg-[#FF6B6B] text-white px-5 py-2.5 font-bold hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Contact
            </a>
          </nav>
          <a href="#contact" className="md:hidden bg-[#FF6B6B] text-white px-4 py-2 text-sm font-bold hover:bg-[#E55A5A] transition-colors duration-300">
            Contact
          </a>
        </div>
      </header>

      {/* ============================================================
          02 HERO — oversized type, coral edge bar, stats
      ============================================================= */}
      <section id="top" className="relative min-h-screen flex items-center px-6 md:px-16 bg-[#1A1A1A]">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF6B6B]" aria-hidden="true" />
        <div className="max-w-6xl mx-auto w-full pt-28 pb-16">
          <p className="text-[#FF6B6B] text-xs tracking-[0.25em] mb-6 font-medium" style={heroStagger("0s")}>
            EST. 2018 — DESIGN STUDIO
          </p>
          <h1
            className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.92] tracking-[-0.04em] text-white"
            style={heroStagger("0.08s")}
          >
            STUDIO
          </h1>
          <h1
            className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.92] tracking-[-0.04em] mt-[-0.08em] text-[#FF6B6B]"
            style={heroStagger("0.16s")}
          >
            BOLD
          </h1>
          <p className="text-lg md:text-xl text-white/60 mt-8 max-w-xl leading-relaxed font-light" style={heroStagger("0.26s")}>
            We design brands, products, and experiences that leave a mark. A creative studio built for ambitious teams who would
            rather be argued with than agreed with.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10" style={heroStagger("0.36s")}>
            <a
              href="#work"
              className="bg-[#FF6B6B] text-white font-bold px-8 py-4 text-lg hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              className="border-2 border-white/30 text-white font-bold px-8 py-4 text-lg hover:border-white hover:bg-white/10 transition-all duration-300 rounded-none"
            >
              Get in Touch
            </a>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-md" style={heroStagger("0.5s")}>
            {[
              { n: "150+", l: "PROJECTS" },
              { n: "12", l: "TEAM" },
              { n: "8", l: "AWARDS" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl md:text-4xl font-bold text-[#FF6B6B]">{s.n}</p>
                <p className="text-[11px] text-white/40 tracking-[0.16em] mt-1 font-medium">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          03 MARQUEE — coral divider band, decorator
      ============================================================= */}
      <section className="bg-[#FF6B6B] py-5 overflow-hidden" aria-label="Disciplines marquee">
        <div className="sb-marquee flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {marqueeItems.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center text-white font-black uppercase tracking-tight text-xl md:text-2xl">
                  <span className="px-6">{item}</span>
                  <span className="w-2.5 h-2.5 bg-[#1A1A1A]" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          04 SELECTED WORK — sand block, filterable poster grid
      ============================================================= */}
      <section id="work" className="bg-[#F5F5F0] text-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="01" eyebrow="Selected Work" title="Projects that picked a fight" tone="light" meta={`${visibleProjects.length} PROJECTS`} />

          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-3 mb-12">
              {workFilters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setWorkFilter(f)}
                  aria-pressed={workFilter === f}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] rounded-none transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B6B] ${
                    workFilter === f
                      ? "bg-[#1A1A1A] text-white shadow-xl -translate-y-0.5"
                      : "border-2 border-[#1A1A1A]/15 text-[#1A1A1A]/50 hover:border-[#1A1A1A] hover:text-[#1A1A1A] hover:-translate-y-0.5"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {visibleProjects.map((p, i) => (
              <Reveal key={p.title} delay={0.04 * i} className={p.w === 2 ? "md:col-span-2" : "md:col-span-1"}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="flex justify-center mt-14">
              <button
                type="button"
                className="border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold px-8 py-4 hover:bg-[#1A1A1A] hover:text-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
              >
                View Full Archive &rarr;
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          05 SERVICES — ink block, real tab switcher
      ============================================================= */}
      <section id="services" className="bg-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="02" eyebrow="Services" title="What we do all day" tone="dark" meta="FOUR DISCIPLINES" />

          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12" role="tablist" aria-label="Studio services">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={activeService === s.id}
                  onClick={() => setActiveService(s.id)}
                  className={`px-4 py-4 text-xs font-bold uppercase tracking-[0.14em] rounded-none transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B6B] ${
                    activeService === s.id
                      ? "bg-[#FF6B6B] text-white shadow-xl -translate-y-0.5"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
              <div className="md:col-span-7">
                <p className="text-[#FF6B6B] text-5xl md:text-6xl font-black mb-6">{service.num}</p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-6">{service.headline}</h3>
                <p className="text-white/60 text-lg leading-relaxed font-light max-w-xl">{service.body}</p>
              </div>
              <div className="md:col-span-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium mb-5">DELIVERABLES</p>
                <ul>
                  {service.deliverables.map((d, i) => (
                    <li key={d} className="group flex items-baseline gap-4 py-3.5 border-b border-white/10">
                      <span className="text-xs font-bold text-[#FF6B6B] shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-white/70 group-hover:text-white transition-colors duration-300 font-light">{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 bg-white/5 p-6">
                  <p className="text-4xl font-bold text-[#FF6B6B]">{service.statN}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-medium mt-1">{service.statL}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          06 PALETTE — deep block, six swatches with usage shares
      ============================================================= */}
      <section className="bg-[#0D0D0D] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="03" eyebrow="Palette" title="Five surfaces, one accent" tone="dark" meta="CORAL CARRIES EVERYTHING" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {paletteSwatches.map((c, i) => (
              <Reveal key={c.hex} delay={0.05 * i}>
                <div className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <div className={`${c.bg} h-36 md:h-44 flex items-end p-5`}>
                    <span className={`text-2xl md:text-3xl font-black tracking-tight ${c.text}`}>{c.name}</span>
                  </div>
                  <div className="bg-white/5 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold tracking-[0.14em] text-white">{c.hex}</span>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-white/40 font-medium">{c.role}</span>
                    </div>
                    <p className="text-xs text-white/50 font-light mb-4">{c.usage}</p>
                    <div className="h-1 bg-white/10">
                      <div className="h-full bg-[#FF6B6B] transition-all duration-500" style={{ width: `${c.share}%` }} />
                    </div>
                    <p className="text-[10px] text-white/30 mt-2 font-medium tracking-[0.12em]">{c.share}% OF ANY GIVEN PAGE</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          07 TYPOGRAPHY — sand block, scale plus weight trio
      ============================================================= */}
      <section className="bg-[#F5F5F0] text-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="04" eyebrow="Typography" title="Mass is hierarchy" tone="light" meta="SANS-SERIF ONLY" />

          <div className="mb-16">
            {typeScale.map((t, i) => (
              <Reveal key={t.label} delay={0.04 * i}>
                <div className="group grid md:grid-cols-12 gap-3 md:gap-8 items-baseline py-6 border-b border-[#1A1A1A]/10">
                  <div className="md:col-span-3 flex items-baseline gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF6B6B]">{t.label}</span>
                  </div>
                  <div className="md:col-span-7 overflow-hidden">
                    <span className={`block text-[#1A1A1A] group-hover:text-[#FF6B6B] transition-colors duration-300 ${t.cls}`}>{t.sample}</span>
                  </div>
                  <div className="md:col-span-2 md:text-right">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[#1A1A1A]/30 font-medium">{t.spec}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {weightTrio.map((w, i) => (
              <Reveal key={w.weight} delay={0.06 * i}>
                <div className="group bg-[#1A1A1A] p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-default">
                  <p className={`text-7xl text-white group-hover:text-[#FF6B6B] transition-colors duration-300 leading-none ${w.cls}`}>Aa</p>
                  <p className="text-white font-bold mt-6 tracking-tight">
                    {w.weight} — {w.name}
                  </p>
                  <p className="text-white/50 text-sm font-light mt-1">{w.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="text-sm text-[#1A1A1A]/50 font-light mt-10 max-w-2xl">
              One sans-serif family, three weights, no exceptions. The scale jumps are deliberately violent — when everything is
              bold, nothing is, so the body copy stays light and lets the headlines do the shouting.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          08 BUTTONS — ink block with embedded sand context panel
      ============================================================= */}
      <section className="bg-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="05" eyebrow="Buttons" title="Every CTA earns its lift" tone="dark" meta="SCALE + SHADOW + COLOR" />

          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium mb-6">ON INK</p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                type="button"
                className="bg-[#FF6B6B] text-white font-bold px-8 py-4 text-lg hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
              >
                Start a Project
              </button>
              <button
                type="button"
                className="border-2 border-white/30 text-white font-bold px-8 py-4 text-lg hover:border-white hover:bg-white/10 transition-all duration-300 rounded-none"
              >
                See the Work
              </button>
              <button
                type="button"
                className="group text-[#FF6B6B] font-bold px-2 py-4 text-lg hover:text-[#E55A5A] transition-colors duration-300"
              >
                Read the Manifesto
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </button>
              <button
                type="button"
                disabled
                className="bg-white/10 text-white/30 font-bold px-8 py-4 text-lg cursor-not-allowed rounded-none"
              >
                Fully Booked
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="bg-[#F5F5F0] p-8 md:p-12 mb-12">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-medium mb-6">ON SAND</p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  className="bg-[#1A1A1A] text-white font-bold px-8 py-4 text-lg hover:bg-[#0D0D0D] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
                >
                  Book a Call
                </button>
                <button
                  type="button"
                  className="border-2 border-[#FF6B6B] text-[#FF6B6B] font-bold px-8 py-4 text-lg hover:bg-[#FF6B6B] hover:text-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
                >
                  Download Deck
                </button>
                <button
                  type="button"
                  className="group text-[#1A1A1A] font-bold px-2 py-4 text-lg hover:text-[#FF6B6B] transition-colors duration-300"
                >
                  Meet the Team
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium mb-6">THREE SIZES</p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="bg-[#FF6B6B] text-white font-bold px-5 py-2.5 text-sm hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
              >
                Small
              </button>
              <button
                type="button"
                className="bg-[#FF6B6B] text-white font-bold px-8 py-4 text-lg hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
              >
                Default
              </button>
              <button
                type="button"
                className="bg-[#FF6B6B] text-white font-bold px-10 py-5 text-xl hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
              >
                Poster Size
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          09 BADGES & TAGS — sand block
      ============================================================= */}
      <section className="bg-[#F5F5F0] text-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="06" eyebrow="Badges" title="Tags wear the uniform" tone="light" meta="SQUARE, LOUD, LEGIBLE" />

          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-medium mb-5">DISCIPLINE TAGS</p>
            <div className="flex flex-wrap gap-3 mb-12">
              {["BRAND IDENTITY", "ART DIRECTION", "WEB PLATFORM", "MOTION SYSTEM", "POSITIONING", "CASE STUDY"].map((t) => (
                <span
                  key={t}
                  className="bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.14em] px-4 py-2 hover:bg-[#FF6B6B] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-medium mb-5">FOUR WEIGHTS OF EMPHASIS</p>
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <span className="bg-[#FF6B6B] text-white text-[11px] font-bold uppercase tracking-[0.14em] px-4 py-2">Featured</span>
              <span className="bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.14em] px-4 py-2">Standard</span>
              <span className="border-2 border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-bold uppercase tracking-[0.14em] px-4 py-2">Outline</span>
              <span className="bg-[#1A1A1A]/5 text-[#1A1A1A]/50 text-[11px] font-bold uppercase tracking-[0.14em] px-4 py-2">Muted</span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-medium mb-5">STATUS MARKERS — SQUARE, NEVER ROUND</p>
            <div className="flex flex-wrap items-center gap-8">
              {[
                { label: "ACCEPTING BRIEFS", tone: "bg-[#FF6B6B]" },
                { label: "IN PRODUCTION", tone: "bg-[#1A1A1A]" },
                { label: "ON HOLD", tone: "bg-[#1A1A1A]/30" },
              ].map((s) => (
                <span key={s.label} className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#1A1A1A]/70">
                  <span className={`w-2.5 h-2.5 ${s.tone}`} aria-hidden="true" />
                  {s.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          10 PROCESS — ink block, real accordion
      ============================================================= */}
      <section id="process" className="bg-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="07" eyebrow="Process" title="Twelve weeks, four moves" tone="dark" meta="CLICK A PHASE" />

          <div>
            {processSteps.map((step, i) => {
              const open = openStep === step.num;
              return (
                <Reveal key={step.num} delay={0.04 * i}>
                  <div className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setOpenStep(open ? null : step.num)}
                      aria-expanded={open}
                      className="group w-full flex items-center justify-between gap-6 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B6B]"
                    >
                      <span className="flex items-baseline gap-6">
                        <span className={`text-sm font-bold transition-colors duration-300 ${open ? "text-[#FF6B6B]" : "text-white/30 group-hover:text-[#FF6B6B]"}`}>
                          {step.num}
                        </span>
                        <span
                          className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-300 ${
                            open ? "text-[#FF6B6B]" : "text-white group-hover:text-[#FF6B6B]"
                          }`}
                        >
                          {step.title}
                        </span>
                      </span>
                      <span className="flex items-center gap-6 shrink-0">
                        <span className="hidden md:inline text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium">{step.duration}</span>
                        <span
                          className={`text-2xl font-light text-[#FF6B6B] transition-transform duration-300 ${open ? "rotate-45" : "group-hover:rotate-45"}`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </span>
                    </button>
                    <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <div className="pb-8 md:pl-16 grid md:grid-cols-12 gap-6">
                          <p className="md:col-span-7 text-white/60 leading-relaxed font-light">{step.desc}</p>
                          <div className="md:col-span-5">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-3">OUTPUTS</p>
                            <div className="flex flex-wrap gap-2">
                              {step.outputs.map((o) => (
                                <span key={o} className="bg-white/5 text-white/70 text-[11px] font-medium uppercase tracking-[0.1em] px-3 py-1.5">
                                  {o}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          11 IN THE STUDIO — sand block, progress indicators
      ============================================================= */}
      <section className="bg-[#F5F5F0] text-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="08" eyebrow="In the Studio" title="Live engagement board" tone="light" meta="UPDATED WEEKLY" />

          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="md:col-span-7">
              {engagements.map((e, i) => (
                <Reveal key={e.client} delay={0.05 * i}>
                  <div className="group py-6 border-b border-[#1A1A1A]/10">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#FF6B6B] transition-colors duration-300">
                        {e.client}
                      </span>
                      <span className="flex items-baseline gap-4">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#1A1A1A]/40 font-medium">{e.phase}</span>
                        <span className="text-lg font-bold text-[#FF6B6B]">{e.pct}%</span>
                      </span>
                    </div>
                    <div className="h-2 bg-[#1A1A1A]/10" role="progressbar" aria-valuenow={e.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${e.client} progress`}>
                      <div className="h-full bg-[#FF6B6B] transition-all duration-500 group-hover:bg-[#E55A5A]" style={{ width: `${e.pct}%` }} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="md:col-span-5">
              <div className="bg-[#1A1A1A] p-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium mb-6">PHASE TRACKER — BRØD</p>
                <div className="flex gap-2 mb-6">
                  {phases.map((ph, i) => {
                    const done = (i + 1) * 25 <= 82;
                    const current = !done && i * 25 < 82;
                    return (
                      <div key={ph} className="flex-1">
                        <div className={`h-2 ${done ? "bg-[#FF6B6B]" : current ? "bg-[#FF6B6B]/40" : "bg-white/10"}`} />
                        <p className={`text-[9px] uppercase tracking-[0.12em] mt-2 font-medium ${done || current ? "text-white/70" : "text-white/25"}`}>
                          {ph}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  Three phases down, delivery in flight. Guidelines site ships Friday; launch film is in final grade.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-white/30 font-medium">NEXT MILESTONE</span>
                  <span className="text-sm font-bold text-[#FF6B6B]">Asset handoff</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          12 LEDGER — ink block, data table with pagination
      ============================================================= */}
      <section className="bg-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="09" eyebrow="Ledger" title="Every engagement on record" tone="dark" meta={`${ledger.length} ENGAGEMENTS`} />

          <Reveal>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b-2 border-white/20">
                    {["CLIENT", "PROJECT", "DISCIPLINE", "YEAR", "STATUS", "FEE"].map((h) => (
                      <th key={h} className="py-4 pr-6 text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ledgerRows.map((row) => (
                    <tr key={row.client} className="group border-b border-white/10 hover:bg-white/5 transition-colors duration-300">
                      <td className="py-5 pr-6 font-bold text-white group-hover:text-[#FF6B6B] transition-colors duration-300 tracking-tight">
                        {row.client}
                      </td>
                      <td className="py-5 pr-6 text-white/60 font-light">{row.project}</td>
                      <td className="py-5 pr-6">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-white/50 font-medium">{row.discipline}</span>
                      </td>
                      <td className="py-5 pr-6 text-white/40 font-light">{row.year}</td>
                      <td className="py-5 pr-6">
                        <LedgerStatus status={row.status} />
                      </td>
                      <td className="py-5 text-white/60 font-medium">{row.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex items-center justify-between mt-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/30 font-medium">
                PAGE {ledgerPage + 1} / {ledgerPages}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setLedgerPage((p) => Math.max(0, p - 1))}
                  disabled={ledgerPage === 0}
                  className="border-2 border-white/30 text-white font-bold px-5 py-2.5 text-sm hover:border-white hover:bg-white/10 transition-all duration-300 disabled:border-white/10 disabled:text-white/20 disabled:cursor-not-allowed disabled:hover:bg-transparent rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B6B]"
                >
                  &larr; Prev
                </button>
                <button
                  type="button"
                  onClick={() => setLedgerPage((p) => Math.min(ledgerPages - 1, p + 1))}
                  disabled={ledgerPage === ledgerPages - 1}
                  className="bg-[#FF6B6B] text-white font-bold px-5 py-2.5 text-sm hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:bg-white/10 disabled:text-white/20 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          13 ALERTS — sand block, dismissible, monochrome + coral
      ============================================================= */}
      <section className="bg-[#F5F5F0] text-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="10" eyebrow="Studio Notices" title="Status without a rainbow" tone="light" meta="ONE ACCENT, FOUR VOICES" />

          <div className="space-y-4 max-w-3xl">
            {visibleAlerts.map((a, i) => {
              const shell =
                a.kind === "INFO"
                  ? "bg-[#1A1A1A]/5 text-[#1A1A1A]"
                  : a.kind === "SUCCESS"
                    ? "bg-[#1A1A1A] text-white"
                    : a.kind === "WARNING"
                      ? "border-2 border-[#FF6B6B] text-[#1A1A1A]"
                      : "bg-[#FF6B6B] text-white";
              const edge = a.kind === "INFO" ? "bg-[#333333]" : a.kind === "SUCCESS" ? "bg-[#FF6B6B]" : a.kind === "WARNING" ? "bg-[#FF6B6B]" : "bg-[#1A1A1A]";
              const metaColor = a.kind === "INFO" || a.kind === "WARNING" ? "text-[#1A1A1A]/40" : "text-white/50";
              const bodyColor = a.kind === "INFO" || a.kind === "WARNING" ? "text-[#1A1A1A]/70" : "text-white/80";
              return (
                <Reveal key={a.id} delay={0.04 * i}>
                  <div className={`flex items-stretch ${shell} transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`}>
                    <div className={`w-1.5 shrink-0 ${edge}`} aria-hidden="true" />
                    <div className="flex-1 p-5 md:p-6">
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <p className="text-xs font-bold uppercase tracking-[0.18em]">{a.kind} — {a.title}</p>
                        <span className={`text-[10px] uppercase tracking-[0.14em] font-medium shrink-0 ${metaColor}`}>{a.meta}</span>
                      </div>
                      <p className={`text-sm font-light leading-relaxed ${bodyColor}`}>{a.msg}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDismissed((d) => [...d, a.id])}
                      aria-label={`Dismiss ${a.title}`}
                      className="px-5 text-xl font-light opacity-40 hover:opacity-100 transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B6B]"
                    >
                      &times;
                    </button>
                  </div>
                </Reveal>
              );
            })}
            {visibleAlerts.length === 0 ? (
              <Reveal>
                <div className="border-2 border-[#1A1A1A]/15 p-8 text-center">
                  <p className="text-[#1A1A1A]/50 font-light mb-5">Inbox zero. The studio is suspiciously quiet.</p>
                  <button
                    type="button"
                    onClick={() => setDismissed([])}
                    className="bg-[#1A1A1A] text-white font-bold px-6 py-3 text-sm hover:bg-[#0D0D0D] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
                  >
                    Restore Notices
                  </button>
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.1}>
            <p className="text-sm text-[#1A1A1A]/40 font-light mt-8 max-w-2xl">
              No green, no amber, no blue. Status is carried by weight and placement — solid ink for good news, coral for anything
              that needs your eyes right now.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          14 DIVIDER STRIP — coral decorator between sand blocks
      ============================================================= */}
      <section className="bg-[#FF6B6B] py-4 px-6 md:px-16" aria-label="Section divider">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
          <span className="text-white text-[11px] font-bold uppercase tracking-[0.3em]">PROOF</span>
          <span className="flex-1 h-0.5 bg-white/40" aria-hidden="true" />
          <span className="w-2.5 h-2.5 bg-[#1A1A1A]" aria-hidden="true" />
          <span className="flex-1 h-0.5 bg-white/40" aria-hidden="true" />
          <span className="text-white text-[11px] font-bold uppercase tracking-[0.3em]">TRUST</span>
        </div>
      </section>

      {/* ============================================================
          15 TESTIMONIALS + CLIENT WALL — sand block, real pager
      ============================================================= */}
      <section className="bg-[#F5F5F0] text-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="11" eyebrow="Word of Mouth" title="Clients, quoted verbatim" tone="light" meta={`${testimonialIndex + 1} OF ${testimonials.length}`} />

          <Reveal>
            <figure className="max-w-4xl mx-auto text-center px-4 md:px-12 py-8 md:py-12">
              <div className="w-10 h-1 bg-[#FF6B6B] mx-auto mb-10" aria-hidden="true" />
              <blockquote className="italic text-2xl md:text-3xl leading-relaxed text-[#1A1A1A] font-light">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-bold tracking-tight">{testimonial.name}</p>
                <p className="text-sm text-[#1A1A1A]/50 font-light mt-1">{testimonial.role}</p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex items-center justify-center gap-4 mb-16">
              <button
                type="button"
                onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonial"
                className="border-2 border-[#1A1A1A]/20 text-[#1A1A1A] font-bold w-12 h-12 hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B6B]"
              >
                &larr;
              </button>
              <div className="flex gap-2" aria-hidden="true">
                {testimonials.map((t, i) => (
                  <span key={t.name} className={`w-2.5 h-2.5 transition-colors duration-300 ${i === testimonialIndex ? "bg-[#FF6B6B]" : "bg-[#1A1A1A]/15"}`} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                aria-label="Next testimonial"
                className="bg-[#FF6B6B] text-white font-bold w-12 h-12 hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1A1A1A]"
              >
                &rarr;
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/30 font-medium text-center mb-8">TRUSTED BY</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              {clients.map((c) => (
                <span key={c} className="text-sm text-[#1A1A1A]/60 font-bold tracking-[0.15em] hover:text-[#FF6B6B] transition-colors duration-300 cursor-default">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          16 TEAM — ink block, overlapping avatars + grid cards
      ============================================================= */}
      <section className="bg-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="12" eyebrow="Team" title="Twelve people, no departments" tone="dark" meta="ZURICH + LISBON + LAGOS" />

          <Reveal>
            <div className="flex items-center gap-6 mb-14">
              <div className="flex -space-x-3">
                {team.slice(0, 5).map((m) => (
                  <span
                    key={m.initials}
                    className={`w-12 h-12 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xs font-bold ${
                      m.tone === "coral" ? "bg-[#FF6B6B] text-white" : m.tone === "sand" ? "bg-[#F5F5F0] text-[#1A1A1A]" : "bg-[#333333] text-white"
                    }`}
                  >
                    {m.initials}
                  </span>
                ))}
                <span className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-[#0D0D0D] text-white/70 flex items-center justify-center text-xs font-bold">
                  +7
                </span>
              </div>
              <p className="text-white/50 text-sm font-light max-w-xs">
                The whole studio touches every project. No account layer, no telephone game.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={0.04 * i}>
                <div className="group bg-white/5 p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-white/10 cursor-default">
                  <span
                    className={`w-14 h-14 rounded-full border-2 border-white shadow-md flex items-center justify-center text-sm font-bold mb-5 ${
                      m.tone === "coral" ? "bg-[#FF6B6B] text-white" : m.tone === "sand" ? "bg-[#F5F5F0] text-[#1A1A1A]" : "bg-[#333333] text-white"
                    }`}
                  >
                    {m.initials}
                  </span>
                  <p className="font-bold text-white group-hover:text-[#FF6B6B] transition-colors duration-300 tracking-tight">{m.name}</p>
                  <p className="text-sm text-white/40 font-light mt-1">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          17 CONTACT — deep block, form with graphite inputs
      ============================================================= */}
      <section id="contact" className="bg-[#0D0D0D] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="13" eyebrow="Contact" title="Tell us the ambitious version" tone="dark" meta="REPLIES IN 48H" />

          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <div>
                <p className="text-white/60 text-lg leading-relaxed font-light mb-10 max-w-sm">
                  Skip the safe version of the brief. Tell us what you would build if nobody in your company could say no.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-2">EMAIL</p>
                    <p className="text-white/80 font-medium">hello@studiobold.example</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-2">STUDIO</p>
                    <p className="text-white/80 font-medium">Langstrasse 112, Zurich</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-2">CAPACITY</p>
                    <p className="text-[#FF6B6B] font-bold">One slot left this quarter</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06} className="md:col-span-7">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-7">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-3">PROJECT TYPE</p>
                  <div className="flex flex-wrap gap-2.5">
                    {projectTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setProjectType(t)}
                        aria-pressed={projectType === t}
                        className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] rounded-none transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF6B6B] ${
                          projectType === t
                            ? "bg-[#FF6B6B] text-white shadow-xl -translate-y-0.5"
                            : "bg-[#333333] text-white/50 hover:text-white hover:bg-[#3D3D3D] hover:-translate-y-0.5"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="sb-name" className="block text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-2">
                      NAME
                    </label>
                    <input
                      id="sb-name"
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-[#333333] border-0 border-b-2 border-white/20 px-4 py-4 text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#FF6B6B] transition-colors duration-300 rounded-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="sb-email" className="block text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-2">
                      EMAIL
                    </label>
                    <input
                      id="sb-email"
                      type="email"
                      placeholder="you@company.com"
                      className="w-full bg-[#333333] border-0 border-b-2 border-white/20 px-4 py-4 text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#FF6B6B] transition-colors duration-300 rounded-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="sb-budget" className="block text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-2">
                    BUDGET
                  </label>
                  <div className="relative">
                    <select
                      id="sb-budget"
                      defaultValue=""
                      className="w-full appearance-none bg-[#333333] border-0 border-b-2 border-white/20 px-4 py-4 text-white text-base focus:outline-none focus:border-[#FF6B6B] transition-colors duration-300 rounded-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      <option value="s">$25K — $50K</option>
                      <option value="m">$50K — $100K</option>
                      <option value="l">$100K — $250K</option>
                      <option value="xl">$250K and up</option>
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF6B6B]"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M1 1L6 7L11 1" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="sb-message" className="block text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-2">
                    THE AMBITIOUS VERSION
                  </label>
                  <textarea
                    id="sb-message"
                    rows={4}
                    placeholder="What are we building, and why does it matter?"
                    className="w-full bg-[#333333] border-0 border-b-2 border-white/20 px-4 py-4 text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#FF6B6B] transition-colors duration-300 rounded-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FF6B6B] text-white font-bold px-8 py-4 text-lg hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
                >
                  Send the Brief &rarr;
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          18 RULES — sand block, do / don't summary
      ============================================================= */}
      <section className="bg-[#F5F5F0] text-[#1A1A1A] px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-6xl mx-auto">
          <SectionIntro index="14" eyebrow="House Rules" title="How this style stays bold" tone="light" meta="NON-NEGOTIABLE" />

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Reveal>
              <div className="bg-[#1A1A1A] p-8 md:p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-3 h-3 bg-[#FF6B6B]" aria-hidden="true" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white">ALWAYS</h3>
                </div>
                <ul className="space-y-0">
                  {doRules.map((rule, i) => (
                    <li key={rule} className="group flex items-start gap-4 py-3.5 border-b border-white/10 last:border-b-0">
                      <span className="text-[10px] font-bold text-[#FF6B6B] mt-1 shrink-0 w-5">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-sm text-white/60 group-hover:text-white transition-colors duration-300 font-light leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border-2 border-[#1A1A1A] p-8 md:p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-3 h-3 bg-[#1A1A1A]" aria-hidden="true" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#1A1A1A]">NEVER</h3>
                </div>
                <ul className="space-y-0">
                  {dontRules.map((rule, i) => (
                    <li key={rule} className="group flex items-start gap-4 py-3.5 border-b border-[#1A1A1A]/10 last:border-b-0">
                      <span className="text-[10px] font-bold text-[#1A1A1A]/30 group-hover:text-[#FF6B6B] transition-colors duration-300 mt-1 shrink-0 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[#1A1A1A]/60 group-hover:text-[#1A1A1A] transition-colors duration-300 font-light leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#1A1A1A]/40 font-light mt-8 leading-relaxed">
                  Professional but never corporate. If a screen could belong to a bank, take it back to the studio.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          19 CTA BAND — coral block anchoring the close
      ============================================================= */}
      <section className="bg-[#FF6B6B] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto text-center">
          <Reveal>
            <p className="text-white/70 text-xs tracking-[0.25em] mb-6 font-medium uppercase">Get in Touch</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white mb-6">
              Have a project
              <br />
              in mind?
            </h2>
            <p className="text-white/80 max-w-md mx-auto text-base md:text-lg mb-10 leading-relaxed font-light">
              We take on eight projects a year and argue about all of them. Yours could be next.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="bg-[#1A1A1A] text-white font-bold px-8 py-4 text-lg hover:bg-[#0D0D0D] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none"
              >
                Start a Conversation &rarr;
              </a>
              <a
                href="#work"
                className="border-2 border-white/60 text-white font-bold px-8 py-4 text-lg hover:border-white hover:bg-white/10 transition-all duration-300 rounded-none"
              >
                See the Work First
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          20 FOOTER — deep block, three columns + legal line
      ============================================================= */}
      <footer className="bg-[#0D0D0D] px-6 md:px-16 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <span className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-[#FF6B6B]" aria-hidden="true" />
                <span className="text-xl font-bold text-white tracking-tight">
                  STUDIO<span className="text-[#FF6B6B]">BOLD</span>
                </span>
              </span>
              <p className="text-white/40 text-sm leading-relaxed font-light max-w-xs">
                A design studio crafting bold identities and digital experiences for ambitious brands since 2018.
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/30 font-medium mb-4">CONTACT</p>
              <p className="text-white/70 text-sm mb-2 font-light">hello@studiobold.example</p>
              <p className="text-white/70 text-sm font-light">+41 (0) 44 555 0112</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/30 font-medium mb-4">ELSEWHERE</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map((s) => (
                  <span key={s} className="text-white/50 hover:text-[#FF6B6B] transition-colors duration-200 text-sm cursor-pointer font-medium">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                <Link href="/styles/studio-bold" className="text-white/50 hover:text-[#FF6B6B] transition-colors duration-200 text-sm font-medium">
                  Style Docs
                </Link>
                <Link href="/styles" className="text-white/50 hover:text-[#FF6B6B] transition-colors duration-200 text-sm font-medium">
                  All Styles
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs font-light">&copy; 2026 Studio Bold. Professional but never corporate.</p>
            <div className="flex gap-6 text-xs text-white/30">
              <span className="hover:text-white/60 cursor-pointer transition-colors duration-200">Privacy</span>
              <span className="hover:text-white/60 cursor-pointer transition-colors duration-200">Terms</span>
              <span className="text-white/20 tracking-[0.2em] uppercase">Creative Studio — StyleKit</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
