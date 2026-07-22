"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Stage constants                                                    */
/* ------------------------------------------------------------------ */

const INK = "#0B0B0C";
const INK_RAISED = "#141416";
const BONE = "#F4F1EB";
const SIGNAL = "#FF4D00";
const EASE = "cubic-bezier(0.22,1,0.36,1)";
const FONT_DISPLAY = '"Anybody", "Archivo", ui-sans-serif, system-ui, sans-serif';

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                       */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.2) {
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  MaskRise — the signature entrance: words rise out of overflow      */
/*  masks with a stagger. Screen readers get the intact string.        */
/* ------------------------------------------------------------------ */

function MaskRise({
  text,
  per = "word",
  delay = 0,
  stagger = 0.05,
  duration = 0.9,
  replayKey = 0,
  accent = [],
  className = "",
  active = true,
}: {
  text: string;
  per?: "word" | "char";
  delay?: number;
  stagger?: number;
  duration?: number;
  replayKey?: number;
  accent?: string[];
  className?: string;
  active?: boolean;
}) {
  const units = per === "char" ? Array.from(text) : text.split(" ");
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {units.map((u, i) => (
          <span key={`${replayKey}-${i}`} className="inline-block overflow-hidden align-bottom">
            <span
              className="kt-rise-unit inline-block"
              style={{
                transform: "translateY(110%)",
                animation: active ? `kt-rise ${duration}s ${EASE} both` : "none",
                animationDelay: `${delay + i * stagger}s`,
                color: accent.includes(u.replace(/[^A-Za-z]/g, "")) ? SIGNAL : undefined,
              }}
            >
              {u === " " ? " " : u}
            </span>
            {per === "word" && i < units.length - 1 ? <span className="inline-block">{" "}</span> : null}
          </span>
        ))}
      </span>
    </span>
  );
}

function RevealRise({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ${EASE} ${delay}s, transform 0.7s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  VelocityStretch — scroll speed maps to the wdth axis               */
/* ------------------------------------------------------------------ */

function VelocityStretch({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.fontVariationSettings = '"wght" 800, "wdth" 100';
      return;
    }
    let last = window.scrollY;
    let vel = 0;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      vel = vel * 0.88 + Math.abs(y - last) * 0.12;
      last = y;
      const wdth = Math.min(150, 100 + vel * 1.6);
      el.style.fontVariationSettings = `"wght" 800, "wdth" ${wdth.toFixed(1)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span ref={ref} className={className} style={{ fontFamily: FONT_DISPLAY, fontVariationSettings: '"wght" 800, "wdth" 100' }}>
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons — signal fill wipe primary, bare outline secondary         */
/* ------------------------------------------------------------------ */

function SignalButton({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden
    bg-transparent border border-[#F4F1EB]/25
    text-[#F4F1EB] uppercase tracking-[0.15em] text-sm font-semibold
    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    hover:border-[#FF4D00] hover:text-[#0B0B0C]
    active:scale-[0.98] ${className}`;
  const inner = (
    <>
      <span className="absolute inset-0 bg-[#FF4D00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return <button className={classes}>{inner}</button>;
}

function GhostLink({ children, href = "#" }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="group relative text-sm text-[#F4F1EB]/60 hover:text-[#F4F1EB] uppercase tracking-[0.15em] transition-colors duration-300"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-full bg-[#FF4D00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Editorial section head — sharp rule, mono index                    */
/* ------------------------------------------------------------------ */

function SectionHead({
  no,
  kicker,
  title,
  sub,
}: {
  no: string;
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <RevealRise className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4 border-t-2 border-[#F4F1EB] pt-4 mb-8">
        <span className="font-mono text-sm text-[#FF4D00] tabular-nums">{no}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#F4F1EB]/45">{kicker}</span>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-12">
        <h2
          className="text-4xl md:text-6xl text-[#F4F1EB] tracking-tight leading-[0.95] max-w-2xl font-bold"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          {title}
        </h2>
        {sub && <p className="mt-4 md:mt-0 text-[#F4F1EB]/55 text-base leading-relaxed max-w-sm md:text-right">{sub}</p>}
      </div>
    </RevealRise>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee strip                                                      */
/* ------------------------------------------------------------------ */

function Marquee({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const strip = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className="inline-flex items-center">
      {items.map((item, i) => (
        <span key={`${hidden ? "b" : "a"}-${i}`} className="inline-flex items-center">
          <span className="px-6">{item}</span>
          <span className="text-[#FF4D00]">·</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className={`kt-marquee ${className}`}>
      <div className={`kt-marquee-track ${reverse ? "kt-marquee-reverse" : ""}`}>
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Ink", value: INK, label: "The stage", text: BONE },
  { name: "Ink Raised", value: INK_RAISED, label: "Elevated surface", text: BONE },
  { name: "Bone", value: BONE, label: "The voice", text: INK },
  { name: "Bone Muted", value: "rgba(244,241,235,0.55)", label: "Annotations", text: INK },
  { name: "Signal", value: SIGNAL, label: "The one accent", text: INK },
];

const weightSteps = [100, 300, 500, 700, 900];

const typeScale = [
  { label: "Label", sample: "MOTION SYSTEM", cls: "text-[11px] uppercase tracking-[0.3em] font-mono text-[#F4F1EB]/45" },
  { label: "Body", sample: "Type carries the whole interface.", cls: "text-base text-[#F4F1EB]/70" },
  { label: "H3", sample: "Weight is volume", cls: "text-2xl md:text-3xl font-semibold tracking-tight" },
  { label: "H2", sample: "Width is breath", cls: "text-3xl md:text-5xl font-bold tracking-tight" },
  { label: "Display", sample: "ARRIVE", cls: "text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9]" },
];

type MotionTab = "entrance" | "breathe" | "stretch" | "marquee";
type ComponentTab = "buttons" | "cards" | "inputs" | "nav";

const motionTabs: { id: MotionTab; label: string }[] = [
  { id: "entrance", label: "Entrance" },
  { id: "breathe", label: "Breathe" },
  { id: "stretch", label: "Stretch" },
  { id: "marquee", label: "Marquee" },
];

const cardRows = [
  { no: "01", title: "Weight Is Volume", desc: "The headline speaks louder as you approach. No color change, no shadow — just mass." },
  { no: "02", title: "Width Is Breath", desc: "The wdth axis inhales with scroll velocity and exhales back to rest." },
  { no: "03", title: "Stagger Is Punctuation", desc: "A 40ms wave across the letters turns a sentence into a rhythm." },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroKey, setHeroKey] = useState(0);
  const [heroActive, setHeroActive] = useState(false);
  const [motionTab, setMotionTab] = useState<MotionTab>("entrance");
  const [entranceKey, setEntranceKey] = useState(0);
  const [componentTab, setComponentTab] = useState<ComponentTab>("buttons");
  const [pgStagger, setPgStagger] = useState(40);
  const [pgDuration, setPgDuration] = useState(0.9);
  const [pgWeight, setPgWeight] = useState(800);
  const [pgReplay, setPgReplay] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroActive(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden" style={{ backgroundColor: INK }}>
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.loli.net/css2?family=Anybody:wdth,wght@50..150,100..900&display=swap"
      />
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes kt-rise {
          to { transform: translateY(0); }
        }
        @keyframes kt-breathe {
          from { font-variation-settings: "wght" 300; }
          to { font-variation-settings: "wght" 800; }
        }
        .kt-breathe { animation: kt-breathe 2.4s ease-in-out infinite alternate; }
        .kt-marquee { overflow: hidden; white-space: nowrap; }
        .kt-marquee-track { display: inline-flex; animation: kt-marquee 26s linear infinite; will-change: transform; }
        .kt-marquee-reverse { animation-direction: reverse; }
        .kt-marquee:hover .kt-marquee-track { animation-play-state: paused; }
        @keyframes kt-marquee {
          to { transform: translateX(-50%); }
        }
        .kt-underline-sweep { position: relative; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .kt-rise-unit { animation: none !important; transform: none !important; }
          .kt-breathe { animation: none !important; font-variation-settings: "wght" 700; }
          .kt-marquee-track { animation: none !important; }
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. FIXED NAV                                                 */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0C]/90 backdrop-blur-sm border-b border-[#F4F1EB]/10">
        <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/styles/kinetic-typography"
              className="group flex items-center gap-1.5 text-[#F4F1EB]/55 hover:text-[#F4F1EB] text-sm transition-colors duration-300"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
              <span>Back to Docs</span>
            </Link>
            <span className="hidden sm:block text-[#F4F1EB]/15">/</span>
            <span className="hidden sm:block text-[#F4F1EB] font-extrabold tracking-tight" style={{ fontFamily: FONT_DISPLAY }}>
              KINETIC<span className="text-[#FF4D00]">*</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "Principles", href: "#principles" },
              { label: "Specimen", href: "#specimen" },
              { label: "Motion", href: "#motion" },
              { label: "Components", href: "#components" },
              { label: "Playground", href: "#playground" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-[13px] text-[#F4F1EB]/55 hover:text-[#F4F1EB] uppercase tracking-[0.15em] transition-colors duration-300"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-full bg-[#FF4D00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </a>
            ))}
          </nav>
          <Link
            href="/"
            className="text-sm text-[#F4F1EB]/70 hover:text-[#FF4D00] uppercase tracking-[0.15em] font-semibold transition-colors duration-300"
          >
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative pt-32 md:pt-40 pb-0 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#F4F1EB]/40 mb-10"
            style={{ opacity: heroActive ? 1 : 0, transition: `opacity 0.6s ${EASE} 0.9s` }}
          >
            Style / Kinetic Typography
          </p>

          <h1
            className="text-[#F4F1EB] font-extrabold tracking-tight leading-[0.92] text-[clamp(3.2rem,11vw,9.5rem)] mb-10"
            style={{ fontFamily: FONT_DISPLAY }}
          >
            <span className="block">
              <MaskRise text="WORDS" per="char" stagger={0.045} replayKey={heroKey} active={heroActive} />
            </span>
            <span className="block">
              <MaskRise text="DON'T SIT." per="char" delay={0.25} stagger={0.045} replayKey={heroKey} active={heroActive} />
            </span>
            <span className="block">
              <MaskRise
                text="THEY ARRIVE."
                per="char"
                delay={0.55}
                stagger={0.045}
                replayKey={heroKey}
                active={heroActive}
                className="[&_.kt-rise-unit]:text-[#FF4D00]"
              />
            </span>
          </h1>

          <div
            className="md:flex md:items-end md:justify-between gap-10 pb-16"
            style={{ opacity: heroActive ? 1 : 0, transform: heroActive ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.7s ${EASE} 1.1s, transform 0.7s ${EASE} 1.1s` }}
          >
            <div className="max-w-md">
              <p className="text-[#F4F1EB]/60 text-lg leading-relaxed mb-8">
                Type is the interface. The variable font is the animation engine —
                weight is volume, width is breath, stagger is punctuation.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <SignalButton href="#motion" className="px-7 py-3.5">
                  See the Moves
                </SignalButton>
                <GhostLink href="#principles">Read the rules</GhostLink>
                <button
                  onClick={() => setHeroKey((k) => k + 1)}
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EB]/40 hover:text-[#FF4D00] transition-colors duration-300"
                >
                  Replay &#8635;
                </button>
              </div>
            </div>
            <div className="hidden md:block font-mono text-xs text-[#F4F1EB]/40 text-right space-y-1 border-r-2 border-[#FF4D00]/70 pr-4 mt-10 md:mt-0">
              <p>Anybody Variable</p>
              <p>wght 100&ndash;900 &middot; wdth 50&ndash;150</p>
              <p>ease cubic-bezier(0.22,1,0.36,1)</p>
              <p className="text-[#FF4D00]">#FF4D00</p>
            </div>
          </div>
        </div>

        {/* Marquee — the section divider is itself a demo */}
        <div
          className="border-y border-[#F4F1EB]/12 py-4 text-[#F4F1EB]/70 font-semibold uppercase tracking-[0.2em] text-sm"
          style={{ fontFamily: FONT_DISPLAY, opacity: heroActive ? 1 : 0, transition: `opacity 0.8s ${EASE} 1.3s` }}
        >
          <Marquee items={["Stagger", "Breathe", "Stretch", "Marquee", "Mask Rise", "Expo Out"]} />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PRINCIPLES / CHOREOGRAPHY                                 */}
      {/* ============================================================ */}
      <section id="principles" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="01"
            kicker="Choreography"
            title="One motion per stage"
            sub="Motion is tone of voice, not decoration. While one element performs, everything else holds still — and nothing ever just fades."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {[
              { no: "R1", title: "One protagonist", desc: "A viewport gets one dominant motion. Letters stagger in, or the marquee rolls — never both at once." },
              { no: "R2", title: "Mask, never fade", desc: "Text rises from an overflow mask like an actor stepping from behind a curtain. A flat opacity fade is a forbidden move." },
              { no: "R3", title: "The font is the engine", desc: "Animate wght and wdth axes instead of color and position. The letterforms themselves do the acting." },
            ].map((rule, i) => (
              <RevealRise key={rule.no} delay={i * 0.08}>
                <div className="group border-t border-[#F4F1EB]/15 pt-5 hover:border-[#FF4D00] transition-colors duration-500">
                  <span className="block font-mono text-xs text-[#FF4D00] mb-4">{rule.no}</span>
                  <h3
                    className="text-2xl text-[#F4F1EB] tracking-tight mb-3 font-semibold group-hover:font-extrabold transition-all duration-500"
                    style={{ fontFamily: FONT_DISPLAY }}
                  >
                    {rule.title}
                  </h3>
                  <p className="text-[#F4F1EB]/55 text-sm leading-relaxed">{rule.desc}</p>
                </div>
              </RevealRise>
            ))}
          </div>

          {/* Good vs bad entrance, replayable */}
          <RevealRise delay={0.1} className="mt-16">
            <GoodVsBad />
          </RevealRise>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. VARIABLE SPECIMEN                                         */}
      {/* ============================================================ */}
      <section id="specimen" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="02"
            kicker="Specimen"
            title="One family, every voice"
            sub="Anybody carries the whole page. Hierarchy comes from extreme contrast of size, weight and width — not from extra fonts."
          />

          {/* Weight axis row */}
          <RevealRise delay={0.05} className="mb-14">
            <div className="grid grid-cols-5 border-y border-[#F4F1EB]/12 divide-x divide-[#F4F1EB]/12">
              {weightSteps.map((w) => (
                <div key={w} className="py-8 text-center group cursor-default">
                  <span
                    className="block text-3xl md:text-5xl text-[#F4F1EB] group-hover:text-[#FF4D00] transition-colors duration-300"
                    style={{ fontFamily: FONT_DISPLAY, fontVariationSettings: `"wght" ${w}` }}
                  >
                    Aa
                  </span>
                  <span className="block mt-3 font-mono text-[10px] text-[#F4F1EB]/40 tabular-nums">{w}</span>
                </div>
              ))}
            </div>
          </RevealRise>

          {/* Type scale ladder */}
          <div className="space-y-0">
            {typeScale.map((row, i) => (
              <RevealRise key={row.label} delay={i * 0.05}>
                <div className="group flex items-baseline gap-6 border-t border-[#F4F1EB]/10 py-5 hover:border-[#FF4D00]/60 transition-colors duration-500">
                  <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F4F1EB]/35">
                    {row.label}
                  </span>
                  <span className={`text-[#F4F1EB] ${row.cls}`} style={{ fontFamily: FONT_DISPLAY }}>
                    {row.sample}
                  </span>
                </div>
              </RevealRise>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. MOTION VOCABULARY                                         */}
      {/* ============================================================ */}
      <section id="motion" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="03"
            kicker="Motion Vocabulary"
            title="Four moves, one easing"
            sub="Every move runs on cubic-bezier(0.22,1,0.36,1) — fast start, slow settle. Pick one per viewport and let it own the stage."
          />

          <RevealRise delay={0.05} className="mb-10">
            <div className="flex flex-wrap gap-0 border border-[#F4F1EB]/15">
              {motionTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMotionTab(tab.id)}
                  className={`px-6 py-3 text-sm uppercase tracking-[0.15em] font-semibold transition-colors duration-300 ${
                    motionTab === tab.id
                      ? "bg-[#F4F1EB] text-[#0B0B0C]"
                      : "bg-transparent text-[#F4F1EB]/55 hover:text-[#F4F1EB]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealRise>

          <RevealRise delay={0.1}>
            <div className="border border-[#F4F1EB]/15 bg-[#141416] min-h-[340px] p-8 md:p-14 flex flex-col justify-between gap-10">
              {motionTab === "entrance" && (
                <>
                  <div className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#F4F1EB] leading-[0.95]" style={{ fontFamily: FONT_DISPLAY }}>
                    <MaskRise text="ENTER STAGE LEFT" per="char" stagger={0.04} replayKey={entranceKey} accent={["LEFT"]} />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <code className="font-mono text-[11px] text-[#F4F1EB]/45">
                      translateY(110%) &rarr; 0 &middot; stagger 40ms &middot; 0.9s expo-out
                    </code>
                    <button
                      onClick={() => setEntranceKey((k) => k + 1)}
                      className="px-5 py-2 border border-[#F4F1EB]/25 text-[#F4F1EB] text-xs uppercase tracking-[0.2em] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors duration-300"
                    >
                      Replay &#8635;
                    </button>
                  </div>
                </>
              )}

              {motionTab === "breathe" && (
                <>
                  <div className="text-5xl md:text-7xl tracking-tight text-[#F4F1EB] leading-[0.95]" style={{ fontFamily: FONT_DISPLAY }}>
                    THE WORD <span className="kt-breathe text-[#FF4D00]" style={{ fontFamily: FONT_DISPLAY }}>BREATHES</span>
                  </div>
                  <code className="font-mono text-[11px] text-[#F4F1EB]/45">
                    font-variation-settings: &quot;wght&quot; 300 &harr; 800 &middot; 2.4s ease-in-out infinite alternate
                  </code>
                </>
              )}

              {motionTab === "stretch" && (
                <>
                  <div className="text-5xl md:text-7xl tracking-tight text-[#F4F1EB] leading-[0.95]">
                    <VelocityStretch text="SCROLL FAST" />
                  </div>
                  <code className="font-mono text-[11px] text-[#F4F1EB]/45">
                    wdth 100 &rarr; 150 mapped to scroll velocity, springs back at rest &middot; try scrolling hard
                  </code>
                </>
              )}

              {motionTab === "marquee" && (
                <>
                  <div className="space-y-4 text-2xl md:text-4xl font-bold uppercase tracking-[0.1em] text-[#F4F1EB]" style={{ fontFamily: FONT_DISPLAY }}>
                    <Marquee items={["Motion", "Rhythm", "Tempo", "Cadence"]} />
                    <Marquee items={["Weight", "Width", "Scale", "Contrast"]} reverse className="text-[#F4F1EB]/35" />
                  </div>
                  <code className="font-mono text-[11px] text-[#F4F1EB]/45">
                    duplicated track &middot; translateX(-50%) linear infinite &middot; hover to pause
                  </code>
                </>
              )}
            </div>
          </RevealRise>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PALETTE                                                   */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="04"
            kicker="Palette"
            title="Ink, bone, one signal"
            sub="Three voices only. The ink stage, the bone type, and a single signal orange that never becomes a surface."
          />

          <RevealRise delay={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {paletteSwatches.map((swatch) => (
                <div key={swatch.name} className="group cursor-default">
                  <div
                    className="h-28 border border-[#F4F1EB]/12 flex items-end p-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
                    style={{ backgroundColor: swatch.value }}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: swatch.text, opacity: 0.7 }}>
                      {swatch.value}
                    </span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-[#F4F1EB]">{swatch.name}</div>
                  <div className="text-xs text-[#F4F1EB]/45">{swatch.label}</div>
                </div>
              ))}
            </div>
          </RevealRise>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. COMPONENTS                                                */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="05"
            kicker="Components"
            title="Sharp edges, moving mass"
            sub="No rounded corners, no drop shadows. Feedback is weight gain, fill wipes and baseline sweeps — all type, all transform."
          />

          <RevealRise delay={0.05} className="mb-10">
            <div className="flex flex-wrap gap-0 border border-[#F4F1EB]/15">
              {(["buttons", "cards", "inputs", "nav"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setComponentTab(tab)}
                  className={`px-6 py-3 text-sm uppercase tracking-[0.15em] font-semibold capitalize transition-colors duration-300 ${
                    componentTab === tab
                      ? "bg-[#F4F1EB] text-[#0B0B0C]"
                      : "bg-transparent text-[#F4F1EB]/55 hover:text-[#F4F1EB]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealRise>

          <RevealRise delay={0.1}>
            <div className="border border-[#F4F1EB]/15 bg-[#141416] p-8 md:p-12">
              {componentTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EB]/40 mb-6">
                      Fill wipe primary / outline secondary / ghost
                    </p>
                    <div className="flex flex-wrap items-center gap-5">
                      <SignalButton className="px-7 py-3.5">Primary</SignalButton>
                      <button className="px-7 py-3.5 bg-[#FF4D00] text-[#0B0B0C] uppercase tracking-[0.15em] text-sm font-semibold hover:bg-[#F4F1EB] transition-colors duration-500 active:scale-[0.98]">
                        Solid Signal
                      </button>
                      <button className="px-7 py-3.5 bg-transparent text-[#F4F1EB]/60 uppercase tracking-[0.15em] text-sm font-semibold hover:text-[#F4F1EB] transition-colors duration-300 active:scale-[0.98]">
                        Ghost
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EB]/40 mb-6">Sizes</p>
                    <div className="flex flex-wrap items-center gap-5">
                      <SignalButton className="px-5 py-2.5 text-xs">Small</SignalButton>
                      <SignalButton className="px-7 py-3.5">Medium</SignalButton>
                      <SignalButton className="px-9 py-4 text-base">Large</SignalButton>
                    </div>
                  </div>
                </div>
              )}

              {componentTab === "cards" && (
                <div>
                  {cardRows.map((card) => (
                    <article
                      key={card.no}
                      className="group border-t border-[#F4F1EB]/15 py-8 px-1 transition-colors duration-500 hover:border-[#FF4D00] cursor-default"
                    >
                      <div className="md:flex md:items-baseline md:gap-10">
                        <span className="block font-mono text-xs text-[#F4F1EB]/40 mb-3 md:mb-0 md:w-10">{card.no}</span>
                        <h3
                          className="text-3xl md:text-4xl text-[#F4F1EB] tracking-tight leading-none mb-3 md:mb-0 md:w-96 font-medium group-hover:font-black transition-all duration-500"
                          style={{ fontFamily: FONT_DISPLAY }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-[#F4F1EB]/55 text-sm max-w-sm leading-relaxed">{card.desc}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {componentTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
                  <div className="space-y-8">
                    <label className="group block">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EB]/45 mb-2 group-focus-within:text-[#FF4D00] transition-colors duration-300">
                        Your Name
                      </span>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Type here"
                          className="w-full bg-transparent py-3 text-xl text-[#F4F1EB] placeholder-[#F4F1EB]/25 border-b border-[#F4F1EB]/20 focus:outline-none"
                        />
                        <span className="absolute bottom-0 left-0 h-px w-full bg-[#FF4D00] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                      </div>
                    </label>
                    <label className="group block">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EB]/45 mb-2 group-focus-within:text-[#FF4D00] transition-colors duration-300">
                        Message
                      </span>
                      <div className="relative">
                        <textarea
                          rows={3}
                          placeholder="Say something loud"
                          className="w-full bg-transparent py-3 text-xl text-[#F4F1EB] placeholder-[#F4F1EB]/25 border-b border-[#F4F1EB]/20 focus:outline-none resize-none"
                        />
                        <span className="absolute bottom-1.5 left-0 h-px w-full bg-[#FF4D00] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                      </div>
                    </label>
                  </div>
                  <div className="space-y-8">
                    <label className="block">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EB]/45 mb-2">
                        Boxed variant
                      </span>
                      <input
                        type="email"
                        placeholder="you@studio.com"
                        className="w-full bg-transparent px-4 py-3 text-base text-[#F4F1EB] placeholder-[#F4F1EB]/25 border border-[#F4F1EB]/20 focus:outline-none focus:border-[#FF4D00] transition-colors duration-300"
                      />
                    </label>
                    <SignalButton className="px-7 py-3.5 w-full">Submit</SignalButton>
                  </div>
                </div>
              )}

              {componentTab === "nav" && (
                <div className="space-y-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EB]/40">
                    Wordmark + underline sweeps (demo)
                  </p>
                  <div className="border border-[#F4F1EB]/12 bg-[#0B0B0C]">
                    <div className="px-6 h-14 flex items-center justify-between border-b border-[#F4F1EB]/10">
                      <span className="text-[#F4F1EB] font-extrabold tracking-tight" style={{ fontFamily: FONT_DISPLAY }}>
                        STUDIO<span className="text-[#FF4D00]">*</span>
                      </span>
                      <div className="flex items-center gap-6">
                        {["Work", "About", "Contact"].map((item) => (
                          <span
                            key={item}
                            className="group relative text-[13px] text-[#F4F1EB]/55 hover:text-[#F4F1EB] uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer"
                          >
                            {item}
                            <span className="absolute -bottom-1 left-0 h-px w-full bg-[#FF4D00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 py-10">
                      <p className="text-[#F4F1EB]/35 text-sm">Page content below the nav</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealRise>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. PLAYGROUND                                                */}
      {/* ============================================================ */}
      <section id="playground" className="scroll-mt-16 py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="06"
            kicker="Playground"
            title="Tune the entrance"
            sub="Stagger under 50ms reads as one wave; past 100ms it becomes a typewriter. Duration past 1.2s drags — the style forbids it."
          />

          <RevealRise delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-7">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#F4F1EB]/65">Stagger</label>
                    <span className="font-mono text-xs text-[#F4F1EB]/45 tabular-nums">{pgStagger}ms / char</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={120}
                    value={pgStagger}
                    onChange={(e) => {
                      setPgStagger(Number(e.target.value));
                      setPgReplay((k) => k + 1);
                    }}
                    className="w-full accent-[#FF4D00]"
                  />
                  <div className="flex justify-between text-[10px] text-[#F4F1EB]/45 mt-1">
                    <span>0 (block)</span>
                    <span>120 (typewriter)</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#F4F1EB]/65">Duration</label>
                    <span className={`font-mono text-xs tabular-nums ${pgDuration > 1.2 ? "text-[#FF4D00]" : "text-[#F4F1EB]/45"}`}>
                      {pgDuration.toFixed(1)}s{pgDuration > 1.2 ? " — too slow" : ""}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.3}
                    max={1.8}
                    step={0.1}
                    value={pgDuration}
                    onChange={(e) => {
                      setPgDuration(Number(e.target.value));
                      setPgReplay((k) => k + 1);
                    }}
                    className="w-full accent-[#FF4D00]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm text-[#F4F1EB]/65">Target Weight</label>
                    <span className="font-mono text-xs text-[#F4F1EB]/45 tabular-nums">wght {pgWeight}</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={900}
                    step={100}
                    value={pgWeight}
                    onChange={(e) => setPgWeight(Number(e.target.value))}
                    className="w-full accent-[#FF4D00]"
                  />
                </div>
                <div className="border border-[#F4F1EB]/12 bg-[#141416] p-4">
                  <p className="font-mono text-[11px] text-[#F4F1EB]/50 leading-relaxed">
                    animation: kt-rise {pgDuration.toFixed(1)}s cubic-bezier(0.22,1,0.36,1) both;<br />
                    animation-delay: calc(var(--i) * {pgStagger}ms);<br />
                    font-variation-settings: &quot;wght&quot; {pgWeight};
                  </p>
                </div>
              </div>

              <div className="border border-[#F4F1EB]/15 bg-[#141416] min-h-[300px] flex flex-col items-start justify-between p-8 md:p-10 gap-8">
                <div
                  className="text-6xl md:text-8xl tracking-tight text-[#F4F1EB] leading-[0.9]"
                  style={{ fontFamily: FONT_DISPLAY, fontVariationSettings: `"wght" ${pgWeight}` }}
                >
                  <MaskRise
                    text="MOTION"
                    per="char"
                    stagger={pgStagger / 1000}
                    duration={pgDuration}
                    replayKey={pgReplay}
                  />
                </div>
                <button
                  onClick={() => setPgReplay((k) => k + 1)}
                  className="px-5 py-2 border border-[#F4F1EB]/25 text-[#F4F1EB] text-xs uppercase tracking-[0.2em] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors duration-300"
                >
                  Replay &#8635;
                </button>
              </div>
            </div>
          </RevealRise>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. DO / DON'T                                                */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead no="07" kicker="Guidelines" title="Do / Don't" />

          <RevealRise delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-t-2 border-[#F4F1EB] pt-6">
                <h3 className="text-[#F4F1EB] font-bold uppercase tracking-[0.15em] text-sm mb-6">Do</h3>
                <ul className="space-y-3">
                  {[
                    "Stage everything on ink #0B0B0C with bone #F4F1EB type",
                    "Mask-rise entrances with 30-50ms stagger, expo-out easing",
                    "Animate wght and wdth axes — the font is the engine",
                    "Extreme scale contrast: 11px labels against clamp() displays",
                    "One signal orange for CTAs, key words and hover feedback",
                    "Static end states under prefers-reduced-motion",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#F4F1EB]/65 leading-relaxed">
                      <span className="text-[#FF4D00] font-mono shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-[#F4F1EB]/30 pt-6">
                <h3 className="text-[#F4F1EB]/60 font-bold uppercase tracking-[0.15em] text-sm mb-6">Don&apos;t</h3>
                <ul className="space-y-3">
                  {[
                    "Animate top/left/width — layout thrash kills the snap",
                    "Run two dominant motions in the same viewport",
                    "Let images or icon salads steal the stage from type",
                    "Flood the signal orange into backgrounds or panels",
                    "Replace mask rises with flat opacity fades",
                    "Drag entrances past 1.2s or fall back to linear easing",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#F4F1EB]/50 leading-relaxed">
                      <span className="text-[#F4F1EB]/35 font-mono shrink-0">&times;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealRise>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer className="pt-20 pb-14 px-5 md:px-10 border-t border-[#F4F1EB]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <p
            className="kt-breathe text-[clamp(4rem,16vw,14rem)] leading-[0.85] tracking-tight text-[#F4F1EB] mb-12 select-none"
            style={{ fontFamily: FONT_DISPLAY }}
            aria-hidden="true"
          >
            MOVE<span className="text-[#FF4D00]">.</span>
          </p>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="text-[#F4F1EB]/45 text-sm">Kinetic Typography — words don&apos;t sit, they arrive.</p>
            <Link
              href="/styles"
              className="group relative text-sm text-[#F4F1EB]/60 hover:text-[#F4F1EB] uppercase tracking-[0.15em] transition-colors duration-300"
            >
              &larr; Back to all styles
              <span className="absolute -bottom-1 left-0 h-px w-full bg-[#FF4D00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Good vs bad entrance demo                                          */
/* ------------------------------------------------------------------ */

function GoodVsBad() {
  const [replay, setReplay] = useState(0);
  return (
    <div className="border border-[#F4F1EB]/15 bg-[#141416]">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#F4F1EB]/12">
        <div className="p-8 md:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#FF4D00] mb-6">+ Mask rise</p>
          <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F4F1EB]" style={{ fontFamily: FONT_DISPLAY }}>
            <MaskRise text="ON STAGE" per="char" stagger={0.05} replayKey={replay} />
          </div>
        </div>
        <div className="p-8 md:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F4F1EB]/35 mb-6">&times; Flat fade (forbidden)</p>
          <div
            key={`fade-${replay}`}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#F4F1EB]/40"
            style={{ fontFamily: FONT_DISPLAY, animation: "kt-fade-demo 1.4s ease both" }}
          >
            OFF STAGE
          </div>
          <style>{`
            @keyframes kt-fade-demo { from { opacity: 0; } to { opacity: 1; } }
            @media (prefers-reduced-motion: reduce) { [style*="kt-fade-demo"] { animation: none !important; } }
          `}</style>
        </div>
      </div>
      <div className="border-t border-[#F4F1EB]/12 px-8 py-4 flex items-center justify-between">
        <p className="text-[#F4F1EB]/45 text-xs">Same words, same duration. The mask gives the letters somewhere to arrive from.</p>
        <button
          onClick={() => setReplay((k) => k + 1)}
          className="px-5 py-2 border border-[#F4F1EB]/25 text-[#F4F1EB] text-xs uppercase tracking-[0.2em] hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors duration-300 shrink-0 ml-6"
        >
          Replay &#8635;
        </button>
      </div>
    </div>
  );
}
