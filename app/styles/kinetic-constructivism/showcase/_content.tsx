"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Constructivist palette + motion constants                          */
/* ------------------------------------------------------------------ */

const PAPER = "#EFE9DC";
const INK = "#17130E";
const RED = "#E0231B";
const BLUE = "#1C4A87";
const YELLOW = "#F4B301";
const EASE = "cubic-bezier(0.16,1,0.3,1)"; // expo-out: fast start, slow settle
const FONT_DISPLAY = '"Archivo", "Anton", "Helvetica Neue", ui-sans-serif, sans-serif';

/* ------------------------------------------------------------------ */
/*  Inline in-view hook — reveal on scroll, once                       */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
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
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ${EASE} ${delay}s, transform 0.7s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section head — mono index, thick rule, uppercase slab              */
/* ------------------------------------------------------------------ */

function SectionHead({ no, kicker, title }: { no: string; kicker: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-baseline gap-4 border-t-[3px] border-[#17130E] pt-4 mb-6">
        <span className="font-mono text-sm text-[#E0231B] tabular-nums">{no}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#17130E]/50">{kicker}</span>
      </div>
      <h2
        className="text-4xl md:text-6xl uppercase font-extrabold tracking-tight leading-[0.9] text-[#17130E]"
        style={{ fontFamily: FONT_DISPLAY }}
      >
        {title}
      </h2>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Primitive motion demo cell                                         */
/* ------------------------------------------------------------------ */

function MotionCell({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-2 border-[#17130E] bg-[#EFE9DC]">
      <div className="relative h-44 flex items-center justify-center overflow-hidden border-b-2 border-[#17130E]">
        {children}
      </div>
      <div className="p-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E0231B] mb-1">{label}</div>
        <p className="text-sm text-[#17130E]/70 leading-snug">{desc}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Showcase                                                           */
/* ------------------------------------------------------------------ */

export default function KineticConstructivismShowcase() {
  const [motionPlaying, setMotionPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<"orbit" | "pendulum" | "march">("orbit");
  const [activeSwatch, setActiveSwatch] = useState<number | null>(null);

  const anim = (value: string): CSSProperties => ({
    animation: motionPlaying ? value : "none",
  });

  const swatches = [
    { name: "Constructivist Red", hex: RED, on: PAPER },
    { name: "Ultramarine Blue", hex: BLUE, on: PAPER },
    { name: "Chrome Yellow", hex: YELLOW, on: INK },
    { name: "Warm Ink", hex: INK, on: PAPER },
    { name: "Bone Paper", hex: PAPER, on: INK },
  ];

  return (
    <div className="min-h-screen bg-[#EFE9DC] text-[#17130E] antialiased" style={{ fontFamily: FONT_DISPLAY }}>
      {/* Keyframes + reduced-motion fallback */}
      <style>{`
        @keyframes kc-orbit { to { transform: rotate(360deg); } }
        @keyframes kc-spin { to { transform: rotate(360deg); } }
        @keyframes kc-pendulum { 0%,100% { transform: rotate(-24deg); } 50% { transform: rotate(24deg); } }
        @keyframes kc-march { to { transform: translateX(22px); } }
        @keyframes kc-sweep { from { transform: translateX(-110%) skewX(-12deg); } to { transform: translateX(0) skewX(-12deg); } }
        @media (prefers-reduced-motion: reduce) {
          .kc-motion { animation: none !important; }
        }
      `}</style>

      {/* 01 — Navigation */}
      <nav className="sticky top-0 z-50 bg-[#EFE9DC] border-b-2 border-[#17130E]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/styles/kinetic-constructivism" className="flex items-center gap-2.5 font-extrabold uppercase tracking-tight text-lg">
            <span className="kc-motion w-4 h-4 rounded-full bg-[#E0231B] border-2 border-[#17130E]" style={anim("kc-spin 4s linear infinite")} aria-hidden />
            Konstrukt
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {["Motion", "Palette", "Parts", "Rules"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="group relative text-sm font-bold uppercase tracking-[0.12em] text-[#17130E]/70 hover:text-[#17130E] transition-colors duration-300">
                {l}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#E0231B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ transitionTimingFunction: EASE }} />
              </a>
            ))}
          </div>
          <button onClick={() => setMotionPlaying((p) => !p)} className="font-mono text-[11px] uppercase tracking-[0.2em] border-2 border-[#17130E] px-3 py-1.5 hover:bg-[#17130E] hover:text-[#EFE9DC] transition-colors duration-300">
            {motionPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </nav>

      {/* 02 — Hero: diagonal poster with real mechanical motion */}
      <header className="relative min-h-[88vh] overflow-hidden flex items-center px-6">
        {/* Orbiting disc */}
        <div className="kc-motion absolute right-[13%] top-[40%] w-40 h-40" style={anim("kc-orbit 12s linear infinite")} aria-hidden>
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E0231B] border-2 border-[#17130E]" />
        </div>
        {/* Concentric flywheel */}
        <div className="kc-motion absolute right-[6%] bottom-[10%] w-48 h-48 opacity-80" style={anim("kc-spin 18s linear infinite")} aria-hidden>
          <span className="absolute inset-0 rounded-full border-2 border-[#17130E]/40" />
          <span className="absolute inset-6 rounded-full border-[6px] border-[#1C4A87]/70" />
          <span className="absolute left-1/2 top-0 -translate-x-1/2 w-1.5 h-1/2 bg-[#17130E]/40" />
        </div>
        {/* Pendulum triangle */}
        <div className="kc-motion absolute right-[20%] top-[12%]" style={{ transformOrigin: "top center", ...anim("kc-pendulum 3.4s ease-in-out infinite") }} aria-hidden>
          <span className="block" style={{ width: 0, height: 0, borderLeft: "26px solid transparent", borderRight: "26px solid transparent", borderBottom: `46px solid ${BLUE}` }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="font-mono text-xs uppercase tracking-[0.35em] text-[#17130E]/50 mb-6">
            Constructivism / Set In Motion
          </div>
          <h1 className="uppercase font-extrabold leading-[0.84] tracking-tight text-[clamp(3rem,12vw,10rem)]">
            <span className="block">Build</span>
            <span className="block text-[#E0231B]">In</span>
            <span className="inline-block -rotate-3 bg-[#F4B301] border-[3px] border-[#17130E] px-4 mt-2">Motion</span>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-[#17130E]/75 leading-relaxed">
            Discs orbit. Triangles swing. Squares march. The geometry is not placed on the page — it is engineered to move, the way El Lissitzky's posters always wanted to.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#motion" className="group relative overflow-hidden px-7 py-3.5 bg-[#17130E] text-[#EFE9DC] uppercase tracking-[0.12em] text-sm font-extrabold border-2 border-[#17130E]">
              <span className="absolute inset-0 bg-[#E0231B] -translate-x-full -skew-x-12 group-hover:translate-x-0 transition-transform duration-400" style={{ transitionTimingFunction: EASE }} aria-hidden />
              <span className="relative z-10">See The Machine</span>
            </a>
            <Link href="/styles/kinetic-constructivism" className="px-7 py-3.5 border-2 border-[#17130E] uppercase tracking-[0.12em] text-sm font-extrabold hover:bg-[#17130E] hover:text-[#EFE9DC] transition-colors duration-300">
              The Rules
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* 03 — Motion Lab (signature) */}
        <section id="motion" className="py-20 md:py-28">
          <SectionHead no="01" kicker="The Machine" title="Five Mechanical Motions" />
          <div className="grid md:grid-cols-3 gap-5">
            <MotionCell label="Orbit" desc="A disc rides the rim while the axis turns at constant speed.">
              <div className="kc-motion w-28 h-28" style={anim("kc-orbit 6s linear infinite")} aria-hidden>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#E0231B] border-2 border-[#17130E]" />
              </div>
              <span className="absolute w-3 h-3 rounded-full bg-[#17130E]" aria-hidden />
            </MotionCell>
            <MotionCell label="Spin" desc="A gear at constant angular velocity — never eased, never bouncing.">
              <div className="kc-motion w-24 h-24" style={anim("kc-spin 3s linear infinite")} aria-hidden>
                <span className="absolute inset-0 rounded-full border-2 border-[#17130E]" />
                <span className="absolute left-1/2 top-0 -translate-x-1/2 w-1.5 h-1/2 bg-[#1C4A87]" />
                <span className="absolute top-1/2 left-0 -translate-y-1/2 h-1.5 w-1/2 bg-[#E0231B]" />
              </div>
            </MotionCell>
            <MotionCell label="Pendulum" desc="A triangle swings about its anchor with ease-in-out weight.">
              <div className="kc-motion" style={{ transformOrigin: "top center", ...anim("kc-pendulum 2.6s ease-in-out infinite") }} aria-hidden>
                <span className="block" style={{ width: 0, height: 0, borderLeft: "22px solid transparent", borderRight: "22px solid transparent", borderBottom: `40px solid ${BLUE}` }} />
              </div>
            </MotionCell>
            <MotionCell label="March" desc="Squares step across on a beat with stepped, not smooth, timing.">
              <div className="flex gap-2" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="kc-motion w-6 h-6 bg-[#17130E]" style={anim(`kc-march 0.9s steps(3) ${i * 0.1}s infinite alternate`)} />
                ))}
              </div>
            </MotionCell>
            <MotionCell label="Sweep" desc="A color panel drives in along the diagonal to reveal content.">
              <div className="relative w-32 h-16 border-2 border-[#17130E] overflow-hidden" aria-hidden>
                <span className="kc-motion absolute inset-0 bg-[#F4B301]" style={anim("kc-sweep 2.2s ease-in-out infinite alternate")} />
              </div>
            </MotionCell>
            <MotionCell label="Rest" desc="Under reduced-motion every loop settles here — still a complete poster.">
              <div className="flex items-center gap-3" aria-hidden>
                <span className="w-8 h-8 rounded-full bg-[#E0231B] border-2 border-[#17130E]" />
                <span className="block" style={{ width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent", borderBottom: `28px solid ${BLUE}` }} />
                <span className="w-8 h-8 bg-[#F4B301] border-2 border-[#17130E]" />
              </div>
            </MotionCell>
          </div>
        </section>

        {/* 04 — Palette */}
        <section id="palette" className="py-20 md:py-28">
          <SectionHead no="02" kicker="Three Colors, One Ink, One Paper" title="The Only Five Values" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {swatches.map((s, i) => (
              <button
                key={s.hex}
                onMouseEnter={() => setActiveSwatch(i)}
                onMouseLeave={() => setActiveSwatch(null)}
                className="text-left border-2 border-[#17130E] overflow-hidden"
              >
                <div className="h-28 flex items-end p-3 transition-transform duration-300" style={{ backgroundColor: s.hex, color: s.on, transform: activeSwatch === i ? "scale(1.04)" : "scale(1)" }}>
                  <span className="font-mono text-[11px] tabular-nums">{s.hex}</span>
                </div>
                <div className="p-3 text-xs font-bold uppercase tracking-wide">{s.name}</div>
              </button>
            ))}
          </div>
        </section>

        {/* 05 — Typography */}
        <section className="py-20 md:py-28">
          <SectionHead no="03" kicker="Type Is A Part Too" title="Ultra-Bold & Tabular" />
          <div className="space-y-6 border-2 border-[#17130E] p-6 md:p-10">
            <div className="text-6xl md:text-8xl font-extrabold uppercase tracking-tight leading-none">Aa Bb</div>
            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t-2 border-[#17130E]/20">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E0231B] mb-2">Display / Archivo 900</div>
                <div className="text-3xl font-extrabold uppercase tracking-tight">Forward Motion</div>
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#1C4A87] mb-2">Mono / Labels 0123456789</div>
                <div className="font-mono text-lg tabular-nums">RPM 1440 · 24FPS · -45&#176;</div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — Buttons */}
        <section className="py-20 md:py-28">
          <SectionHead no="04" kicker="Controls" title="Buttons" />
          <div className="flex flex-wrap items-center gap-4">
            <button className="group relative overflow-hidden px-7 py-3.5 bg-[#E0231B] text-[#EFE9DC] uppercase tracking-[0.12em] text-sm font-extrabold border-2 border-[#17130E]">
              <span className="absolute inset-0 bg-[#17130E] -translate-x-full -skew-x-12 group-hover:translate-x-0 transition-transform duration-400" style={{ transitionTimingFunction: EASE }} aria-hidden />
              <span className="relative z-10">Red</span>
            </button>
            <button className="px-7 py-3.5 bg-[#17130E] text-[#EFE9DC] uppercase tracking-[0.12em] text-sm font-extrabold border-2 border-[#17130E] hover:bg-transparent hover:text-[#17130E] transition-colors duration-300">Ink</button>
            <button className="px-7 py-3.5 bg-transparent uppercase tracking-[0.12em] text-sm font-extrabold border-2 border-[#17130E] hover:bg-[#F4B301] transition-colors duration-300">Outline</button>
            <button className="px-7 py-3.5 uppercase tracking-[0.12em] text-sm font-extrabold border-2 border-[#17130E] text-[#17130E]/30 cursor-not-allowed" disabled>Disabled</button>
          </div>
        </section>

        {/* 07 — Cards */}
        <section id="parts" className="py-20 md:py-28">
          <SectionHead no="05" kicker="Assemblies" title="Cards As Parts" />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { rule: BLUE, no: "01", title: "Motion Is Structure", body: "The disc does not decorate — it turns. Every part carries a force." },
              { rule: RED, no: "02", title: "Diagonal Is Force", body: "Compositions ride the -45deg axis. Tension is a direction, not an accident." },
              { rule: YELLOW, no: "03", title: "Flat Is Honest", body: "No shadow, no gradient, no glow. Ink on paper, cut clean at every edge." },
            ].map((c) => (
              <Reveal key={c.no}>
                <article className="group relative bg-[#EFE9DC] border-2 border-[#17130E] p-6 overflow-hidden h-full">
                  <span className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: c.rule }} />
                  <span className="kc-motion absolute -right-6 -top-6 w-16 h-16 rounded-full bg-[#F4B301] border-2 border-[#17130E]" style={{ animation: "none" }} aria-hidden />
                  <span className="block font-mono text-xs text-[#E0231B] tabular-nums mb-4 mt-2">{c.no}</span>
                  <h3 className="text-2xl font-extrabold uppercase tracking-tight leading-none mb-3">{c.title}</h3>
                  <p className="text-sm text-[#17130E]/70 leading-relaxed">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 08 — Form */}
        <section className="py-20 md:py-28">
          <SectionHead no="06" kicker="Inputs" title="Forms" />
          <div className="grid md:grid-cols-2 gap-8 border-2 border-[#17130E] p-6 md:p-10">
            <label className="group block">
              <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[#17130E]/60 mb-2 group-focus-within:text-[#E0231B] transition-colors duration-300">Your Name</span>
              <div className="relative">
                <input type="text" placeholder="Type here" className="w-full bg-transparent py-3 px-3 text-lg border-2 border-[#17130E] placeholder-[#17130E]/30 focus:outline-none" />
                <span className="absolute bottom-0 left-0 h-1 w-full bg-[#E0231B] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-400" style={{ transitionTimingFunction: EASE }} aria-hidden />
              </div>
            </label>
            <label className="block">
              <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[#17130E]/60 mb-2">Discipline</span>
              <select className="w-full bg-transparent py-3 px-3 text-lg border-2 border-[#17130E] focus:outline-none focus:border-[#E0231B]">
                <option>Poster</option>
                <option>Motion</option>
                <option>Editorial</option>
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[#17130E]/60 mb-2">Manifesto</span>
              <textarea rows={3} placeholder="Geometry is a machine..." className="w-full bg-transparent py-3 px-3 text-base border-2 border-[#17130E] placeholder-[#17130E]/30 focus:outline-none focus:border-[#E0231B] resize-none" />
            </label>
          </div>
        </section>

        {/* 09 — Tabs (interactive) */}
        <section className="py-20 md:py-28">
          <SectionHead no="07" kicker="Switchboard" title="Tabs" />
          <div className="border-2 border-[#17130E]">
            <div className="flex border-b-2 border-[#17130E]">
              {(["orbit", "pendulum", "march"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-1 py-4 font-extrabold uppercase tracking-[0.12em] text-sm transition-colors duration-200 ${activeTab === t ? "bg-[#17130E] text-[#EFE9DC]" : "bg-[#EFE9DC] text-[#17130E] hover:bg-[#F4B301]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-10 text-base text-[#17130E]/80 leading-relaxed">
              {activeTab === "orbit" && <p><strong className="text-[#17130E]">Orbit.</strong> Parent turns at constant speed; a child disc rides the rim. Two divs, one keyframe, zero JavaScript.</p>}
              {activeTab === "pendulum" && <p><strong className="text-[#17130E]">Pendulum.</strong> transform-origin at the top, rotate between -24 and 24 degrees, ease-in-out. The weight reads as gravity.</p>}
              {activeTab === "march" && <p><strong className="text-[#17130E]">March.</strong> A row of squares translateX with steps(3) timing — mechanical stepping, never a smooth glide.</p>}
            </div>
          </div>
        </section>

        {/* 10 — Badges + Progress */}
        <section className="py-20 md:py-28">
          <SectionHead no="08" kicker="Signals" title="Badges & Progress" />
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="px-3 py-1.5 bg-[#E0231B] text-[#EFE9DC] font-mono text-[11px] uppercase tracking-[0.2em]">New</span>
            <span className="px-3 py-1.5 bg-[#1C4A87] text-[#EFE9DC] font-mono text-[11px] uppercase tracking-[0.2em]">Stable</span>
            <span className="px-3 py-1.5 bg-[#F4B301] text-[#17130E] border-2 border-[#17130E] font-mono text-[11px] uppercase tracking-[0.2em]">Beta</span>
            <span className="px-3 py-1.5 border-2 border-[#17130E] font-mono text-[11px] uppercase tracking-[0.2em]">Draft</span>
          </div>
          <div className="space-y-5">
            {[
              { label: "Assembly", pct: 82, color: RED },
              { label: "Calibration", pct: 64, color: BLUE },
              { label: "Torque", pct: 45, color: YELLOW },
            ].map((p) => (
              <div key={p.label}>
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] mb-2">
                  <span>{p.label}</span>
                  <span className="tabular-nums">{p.pct}%</span>
                </div>
                <div className="h-4 border-2 border-[#17130E] bg-[#EFE9DC] overflow-hidden">
                  <div className="h-full" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11 — Alerts */}
        <section className="py-20 md:py-28">
          <SectionHead no="09" kicker="Notices" title="Alerts" />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { c: BLUE, t: "Info", m: "The flywheel spins at 18 second intervals." },
              { c: "#2E7D32", t: "Success", m: "All parts aligned to the diagonal axis." },
              { c: YELLOW, t: "Warning", m: "Motion exceeds 1.2s — tighten the loop.", dark: true },
              { c: RED, t: "Error", m: "A fourth hue was detected. Remove it." },
            ].map((a) => (
              <div key={a.t} className="flex items-stretch border-2 border-[#17130E] bg-[#EFE9DC]">
                <span className="w-2 shrink-0" style={{ backgroundColor: a.c }} />
                <div className="p-4">
                  <div className="font-extrabold uppercase tracking-[0.1em] text-sm mb-1">{a.t}</div>
                  <p className="text-sm text-[#17130E]/70">{a.m}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12 — Table */}
        <section className="py-20 md:py-28">
          <SectionHead no="10" kicker="Specification" title="Motion Table" />
          <div className="border-2 border-[#17130E] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#17130E] text-[#EFE9DC] font-mono text-[11px] uppercase tracking-[0.2em]">
                  <th className="p-4">Motion</th>
                  <th className="p-4">Easing</th>
                  <th className="p-4 tabular-nums">Duration</th>
                  <th className="p-4">Loop</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ["Orbit", "linear", "12s", "infinite"],
                  ["Spin", "linear", "4s", "infinite"],
                  ["Pendulum", "ease-in-out", "3.4s", "alternate"],
                  ["March", "steps(3)", "0.9s", "alternate"],
                  ["Sweep", "expo-out", "0.6s", "once"],
                ].map((row, i) => (
                  <tr key={row[0]} className={i % 2 ? "bg-[#17130E]/[0.04]" : ""}>
                    {row.map((cell, j) => (
                      <td key={j} className={`p-4 border-t border-[#17130E]/15 ${j === 0 ? "font-extrabold uppercase tracking-tight" : "font-mono tabular-nums text-[#17130E]/75"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 13 — Blockquote */}
        <section className="py-20 md:py-28">
          <Reveal>
            <blockquote className="relative border-l-[6px] border-[#E0231B] pl-6 md:pl-10">
              <p className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-[0.95] max-w-3xl">
                Art into life. The poster is a machine for seeing.
              </p>
              <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[#17130E]/50">
                — After the Constructivist manifesto, 1921
              </footer>
            </blockquote>
          </Reveal>
        </section>

        {/* 14 — Rules */}
        <section id="rules" className="py-20 md:py-28">
          <SectionHead no="11" kicker="Discipline" title="Do & Don't" />
          <div className="grid md:grid-cols-2 gap-5">
            <div className="border-2 border-[#17130E] p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#2E7D32] mb-4">Do</div>
              <ul className="space-y-3 text-sm text-[#17130E]/80">
                {["Only red, blue, yellow on ink and paper", "Hard edges, flat fills, zero radius", "Compose on the -30/-45 diagonal", "Move via transform / opacity only", "One dominant motion per viewport"].map((r) => (
                  <li key={r} className="flex gap-3"><span className="text-[#2E7D32] font-bold">+</span>{r}</li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-[#17130E] p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E0231B] mb-4">Don't</div>
              <ul className="space-y-3 text-sm text-[#17130E]/80">
                {["No gradients, shadows, glow or blur", "No fourth hue or muddy pastels", "No illustration stealing the stage", "No bouncy cartoon easing", "No animating top/left/width/height"].map((r) => (
                  <li key={r} className="flex gap-3"><span className="text-[#E0231B] font-bold">&#215;</span>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* 15 — Footer */}
      <footer className="border-t-2 border-[#17130E] bg-[#17130E] text-[#EFE9DC]">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5 font-extrabold uppercase tracking-tight text-2xl mb-3">
              <span className="kc-motion w-5 h-5 rounded-full bg-[#E0231B]" style={anim("kc-spin 4s linear infinite")} aria-hidden />
              Konstrukt
            </div>
            <p className="text-sm text-[#EFE9DC]/60 max-w-sm">Kinetic Constructivism — geometry engineered to move.</p>
          </div>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[#EFE9DC]/70">
            <Link href="/styles/kinetic-constructivism" className="hover:text-[#F4B301] transition-colors">Docs</Link>
            <Link href="/styles" className="hover:text-[#F4B301] transition-colors">All Styles</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
