"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  CRT signal palette + motion                                        */
/* ------------------------------------------------------------------ */

const CRT = "#0B0B0E";
const PANEL = "#101014";
const PHOSPHOR = "#EDEDED";
const RED = "#FF2E4C";
const CYAN = "#00E5D8";
const YELLOW = "#F5E000";
const FONT = '"Azeret Mono", ui-monospace, monospace';
const SCANLINES = "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.7) 3px)";
const BARS = ["#EDEDED", "#F5E000", "#00E5D8", "#3DFF6E", "#FF2E9A", "#FF2E4C", "#2E6BFF"];

/* ------------------------------------------------------------------ */
/*  In-view hook                                                       */
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
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transition: "opacity 0.4s steps(4)" }}>
      {children}
    </div>
  );
}

function Split({ children, className = "", size = 3 }: { children: React.ReactNode; className?: string; size?: number }) {
  return (
    <span className={className} style={{ textShadow: `${size}px 0 ${CYAN}, -${size}px 0 ${RED}` }}>
      {children}
    </span>
  );
}

function SectionHead({ ch, title }: { ch: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <div className="text-xs uppercase tracking-[0.3em] text-[#00E5D8] mb-4">{ch}</div>
      <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#EDEDED] leading-tight">
        <Split size={2}>{title}</Split>
      </h2>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Showcase                                                           */
/* ------------------------------------------------------------------ */

export default function BroadcastGlitchShowcase() {
  const [activeTab, setActiveTab] = useState<"scan" | "split" | "jitter">("scan");
  const [burst, setBurst] = useState(0);

  return (
    <div className="relative min-h-screen bg-[#0B0B0E] text-[#EDEDED] antialiased overflow-hidden" style={{ fontFamily: FONT }}>
      <style>{`
        @keyframes bg-scan { to { transform: translateY(6px); } }
        @keyframes bg-jitter { 0%,92%,100% { transform: translate(0,0); } 93% { transform: translate(-3px,1px); } 95% { transform: translate(2px,-1px); } 97% { transform: translate(-1px,0); } }
        @keyframes bg-split { 0%,100% { text-shadow: 2px 0 ${CYAN}, -2px 0 ${RED}; } 50% { text-shadow: 4px 0 ${CYAN}, -4px 0 ${RED}; } }
        @keyframes bg-flicker { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
        @keyframes bg-tear { 0%,90%,100% { transform: translateX(0); clip-path: inset(0 0 0 0); } 92% { transform: translateX(12px); clip-path: inset(40% 0 40% 0); } 96% { transform: translateX(-8px); clip-path: inset(60% 0 20% 0); } }
        @media (prefers-reduced-motion: reduce) {
          .bg-scan,.bg-jitter,.bg-split,.bg-flicker,.bg-tear { animation: none !important; transform: none; opacity: 1; }
        }
      `}</style>

      {/* Global scanline overlay */}
      <span className="bg-scan pointer-events-none fixed inset-0 z-[60] opacity-20" style={{ background: SCANLINES, animation: "bg-scan 0.4s steps(3) infinite" }} aria-hidden />

      {/* 01 — Nav */}
      <nav className="sticky top-0 z-50 bg-[#0B0B0E]/95 border-b-2 border-[#EDEDED]/20">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/styles/broadcast-glitch" className="font-bold uppercase tracking-[0.2em] hover:[text-shadow:2px_0_#00E5D8,-2px_0_#FF2E4C] transition-all duration-100">
            CH&#9633;NNEL
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm text-[#EDEDED]/70">
            {["Signal", "Palette", "Card", "Rules"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="uppercase tracking-wider hover:text-[#00E5D8] transition-colors">{l}</a>
            ))}
          </div>
          <span className="flex items-center gap-2 text-xs text-[#FF2E4C] uppercase tracking-wider">
            <span className="bg-flicker w-2.5 h-2.5 rounded-full bg-[#FF2E4C]" style={{ animation: "bg-flicker 1s steps(2) infinite" }} aria-hidden /> Rec
          </span>
        </div>
      </nav>

      {/* 02 — Hero */}
      <header className="relative min-h-[86vh] flex items-center px-6 overflow-hidden">
        <div className="absolute top-0 right-0 flex h-44 w-64 z-10" aria-hidden>
          {BARS.map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}
        </div>
        <div className="bg-jitter relative z-30" style={{ animation: "bg-jitter 4s steps(1) infinite" }}>
          <p className="text-xs uppercase tracking-[0.35em] text-[#00E5D8] mb-5">// no signal</p>
          <h1 className="font-bold uppercase text-[clamp(3rem,13vw,9.5rem)] leading-[0.82]">
            <span style={{ textShadow: `3px 0 ${CYAN}, -3px 0 ${RED}` }}>Please</span><br />
            <span style={{ textShadow: `3px 0 ${CYAN}, -3px 0 ${RED}` }}>Stand By</span>
          </h1>
          <p className="mt-6 max-w-md text-sm md:text-base text-[#EDEDED]/65 leading-relaxed">
            A broken CRT signal, glowing. Scanlines crawl, channels split, the picture jumps. Not a synthwave sunset — the bad signal itself.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#signal" className="px-7 py-3 bg-[#FF2E4C] text-[#0B0B0E] font-bold uppercase tracking-[0.15em] text-sm border-2 border-[#EDEDED] hover:[text-shadow:2px_0_#00E5D8,-2px_0_#F5E000] transition-all duration-100">&#9654; Tune In</a>
            <Link href="/styles/broadcast-glitch" className="px-7 py-3 bg-transparent text-[#EDEDED] font-bold uppercase tracking-[0.15em] text-sm border-2 border-[#EDEDED]/40 hover:border-[#00E5D8] transition-colors duration-100">Rules</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* 03 — Signal Lab (signature) */}
        <section id="signal" className="py-20 md:py-28">
          <SectionHead ch="// The Machine" title="Five Signal Faults" />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { k: "Scanlines", d: "A crawling line overlay, always on — the CRT's fingerprint." },
              { k: "Channel Split", d: "Red and cyan pull apart from white — the signal misaligned." },
              { k: "Frame Jump", d: "Mostly still, then a stepped jitter — bad tracking." },
              { k: "VHS Tear", d: "A horizontal band clips and shifts — tape damage." },
              { k: "Flicker", d: "Phosphor instability pulsing the brightness." },
              { k: "Test Card", d: "Under reduced-motion everything rests here — a clean SMPTE card." },
            ].map((c, i) => (
              <div key={c.k} className="relative border-2 border-[#EDEDED]/25 bg-[#101014] overflow-hidden">
                <div className="relative h-40 flex items-center justify-center overflow-hidden border-b-2 border-[#EDEDED]/25">
                  <span className="pointer-events-none absolute inset-0 opacity-30" style={{ background: SCANLINES }} aria-hidden />
                  {i === 0 && <span className="bg-scan absolute inset-0" style={{ background: SCANLINES, animation: "bg-scan 0.3s steps(3) infinite", opacity: 0.6 }} aria-hidden />}
                  {i === 1 && <span className="bg-split text-3xl font-bold uppercase" style={{ animation: "bg-split 1.6s steps(2) infinite" }}>SPLIT</span>}
                  {i === 2 && <span className="bg-jitter text-3xl font-bold uppercase text-[#EDEDED]" style={{ animation: "bg-jitter 2.4s steps(1) infinite" }}>JUMP</span>}
                  {i === 3 && <span className="bg-tear text-3xl font-bold uppercase text-[#00E5D8]" style={{ animation: "bg-tear 3s steps(1) infinite" }}>TEAR</span>}
                  {i === 4 && <span className="bg-flicker w-14 h-14 bg-[#F5E000]" style={{ animation: "bg-flicker 0.8s steps(2) infinite" }} aria-hidden />}
                  {i === 5 && <div className="flex h-16 w-40" aria-hidden>{BARS.map((b) => <span key={b} className="flex-1" style={{ background: b }} />)}</div>}
                </div>
                <div className="p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#00E5D8] mb-1">{c.k}</div>
                  <p className="text-sm text-[#EDEDED]/65 leading-snug">{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04 — Palette */}
        <section id="palette" className="py-20 md:py-28">
          <SectionHead ch="// Signal Colors" title="Three Primaries" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { n: "CRT Black", hex: CRT, on: PHOSPHOR },
              { n: "Panel", hex: PANEL, on: PHOSPHOR },
              { n: "Glitch Red", hex: RED, on: CRT },
              { n: "CRT Cyan", hex: CYAN, on: CRT },
              { n: "Test Yellow", hex: YELLOW, on: CRT },
            ].map((s) => (
              <Reveal key={s.hex}>
                <div className="border-2 border-[#EDEDED]/25">
                  <div className="h-24 flex items-end p-3" style={{ backgroundColor: s.hex, color: s.on }}>
                    <span className="text-[11px]">{s.hex}</span>
                  </div>
                  <div className="bg-[#101014] p-3 text-xs uppercase tracking-wide">{s.n}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 05 — Typography */}
        <section className="py-20 md:py-28">
          <SectionHead ch="// Voice" title="Monospace Signal" />
          <div className="border-2 border-[#EDEDED]/25 bg-[#101014] p-8 md:p-12 space-y-6">
            <div className="text-6xl md:text-8xl font-bold uppercase leading-none"><Split>Aa 01</Split></div>
            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t-2 border-[#EDEDED]/15">
              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#00E5D8] mb-2">Display / split</div>
                <div className="text-3xl font-bold uppercase"><Split size={2}>Signal Lost</Split></div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.25em] text-[#F5E000] mb-2">Mono / body 0123456789</div>
                <p className="text-[#EDEDED]/75 leading-relaxed">Please stand by. Normal service will not resume. This is a test of the emergency broadcast grammar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — Buttons */}
        <section className="py-20 md:py-28">
          <SectionHead ch="// Controls" title="Signal Buttons" />
          <div className="flex flex-wrap items-center gap-4">
            {[["Red", RED], ["Cyan", CYAN], ["Yellow", YELLOW]].map(([l, c]) => (
              <button key={l} className="px-7 py-3 font-bold uppercase tracking-[0.15em] text-sm border-2 border-[#EDEDED] hover:[text-shadow:2px_0_#00E5D8,-2px_0_#F5E000] transition-all duration-100" style={{ background: c, color: CRT }}>{l}</button>
            ))}
            <button className="px-7 py-3 bg-transparent text-[#EDEDED] font-bold uppercase tracking-[0.15em] text-sm border-2 border-[#EDEDED]/40 hover:border-[#00E5D8] transition-colors duration-100">Signal</button>
            <button className="px-7 py-3 bg-transparent text-[#EDEDED]/25 font-bold uppercase tracking-[0.15em] text-sm border-2 border-[#EDEDED]/15 cursor-not-allowed" disabled>Off Air</button>
          </div>
        </section>

        {/* 07 — Cards */}
        <section id="card" className="py-20 md:py-28">
          <SectionHead ch="// Assemblies" title="CRT Panels" />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { c: RED, ch: "CH-01", t: "Signal Lost", b: "Please stand by. Normal service will not resume." },
              { c: CYAN, ch: "CH-02", t: "Now Tuning", b: "Locking onto the carrier. Hold the vertical." },
              { c: YELLOW, ch: "CH-03", t: "Test Pattern", b: "Bars and tone. Adjust your set until it hurts." },
            ].map((c) => (
              <Reveal key={c.ch}>
                <article className="relative bg-[#101014] border-2 border-[#EDEDED]/25 overflow-hidden h-full">
                  <span className="block h-1.5" style={{ background: c.c }} />
                  <span className="pointer-events-none absolute inset-0 opacity-25" style={{ background: SCANLINES }} aria-hidden />
                  <div className="relative p-6">
                    <span className="block text-xs text-[#00E5D8] mb-3">{c.ch} / LIVE</span>
                    <h3 className="font-bold uppercase text-xl tracking-tight mb-2">{c.t}</h3>
                    <p className="text-sm text-[#EDEDED]/60 leading-relaxed">{c.b}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 08 — Form */}
        <section className="py-20 md:py-28">
          <SectionHead ch="// Input" title="Transmit" />
          <div className="grid md:grid-cols-2 gap-6 border-2 border-[#EDEDED]/25 bg-[#101014] p-8 md:p-10">
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.2em] text-[#EDEDED]/60 mb-2">&gt; Input Signal</span>
              <input type="text" placeholder="type to transmit_" className="w-full bg-[#0B0B0E] px-3 py-3 text-[#00E5D8] placeholder-[#EDEDED]/25 border-2 border-[#EDEDED]/30 focus:outline-none focus:border-[#00E5D8]" />
            </label>
            <label className="block">
              <span className="block text-xs uppercase tracking-[0.2em] text-[#EDEDED]/60 mb-2">&gt; Channel</span>
              <select className="w-full bg-[#0B0B0E] px-3 py-3 text-[#00E5D8] border-2 border-[#EDEDED]/30 focus:outline-none focus:border-[#00E5D8]">
                <option>CH-01</option><option>CH-02</option><option>CH-03</option>
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="block text-xs uppercase tracking-[0.2em] text-[#EDEDED]/60 mb-2">&gt; Message</span>
              <textarea rows={3} placeholder="please stand by_" className="w-full bg-[#0B0B0E] px-3 py-3 text-[#00E5D8] placeholder-[#EDEDED]/25 border-2 border-[#EDEDED]/30 focus:outline-none focus:border-[#00E5D8] resize-none" />
            </label>
          </div>
        </section>

        {/* 09 — Tabs */}
        <section className="py-20 md:py-28">
          <SectionHead ch="// Switchboard" title="Fault Vocabulary" />
          <div className="border-2 border-[#EDEDED]/25">
            <div className="flex border-b-2 border-[#EDEDED]/25">
              {(["scan", "split", "jitter"] as const).map((t) => (
                <button key={t} onClick={() => { setActiveTab(t); setBurst((b) => b + 1); }} className={`flex-1 py-4 font-bold uppercase tracking-[0.15em] text-sm transition-colors duration-100 ${activeTab === t ? "bg-[#00E5D8] text-[#0B0B0E]" : "text-[#EDEDED]/70 hover:text-[#EDEDED]"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="p-8 md:p-12 flex items-center gap-8 min-h-[160px]" key={`${activeTab}-${burst}`}>
              <div className="shrink-0 w-32 h-24 border-2 border-[#EDEDED]/30 flex items-center justify-center overflow-hidden relative">
                <span className="pointer-events-none absolute inset-0 opacity-30" style={{ background: SCANLINES }} aria-hidden />
                {activeTab === "scan" && <span className="bg-scan absolute inset-0" style={{ background: SCANLINES, animation: "bg-scan 0.3s steps(3) infinite", opacity: 0.7 }} aria-hidden />}
                {activeTab === "split" && <span className="relative text-2xl font-bold" style={{ textShadow: `4px 0 ${CYAN}, -4px 0 ${RED}` }}>TV</span>}
                {activeTab === "jitter" && <span className="bg-jitter relative text-2xl font-bold" style={{ animation: "bg-jitter 2s steps(1) infinite" }}>TV</span>}
              </div>
              <p className="text-sm md:text-base text-[#EDEDED]/80 leading-relaxed">
                {activeTab === "scan" && <><strong className="text-[#EDEDED]">Scanlines.</strong> A repeating-linear-gradient overlay translateY with steps(3) — the ever-present CRT texture.</>}
                {activeTab === "split" && <><strong className="text-[#EDEDED]">Channel split.</strong> text-shadow pushes a cyan and red ghost apart from the white — chromatic aberration on demand.</>}
                {activeTab === "jitter" && <><strong className="text-[#EDEDED]">Frame jump.</strong> Still most of the time, then a stepped translate — bad tracking, never a smooth shake.</>}
              </p>
            </div>
          </div>
        </section>

        {/* 10 — Signal strength (badges + progress) */}
        <section className="py-20 md:py-28">
          <SectionHead ch="// Levels" title="Signal Strength" />
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="px-3 py-1.5 bg-[#FF2E4C] text-[#0B0B0E] text-xs font-bold uppercase tracking-wider">Live</span>
            <span className="px-3 py-1.5 bg-[#00E5D8] text-[#0B0B0E] text-xs font-bold uppercase tracking-wider">Tuned</span>
            <span className="px-3 py-1.5 bg-[#F5E000] text-[#0B0B0E] text-xs font-bold uppercase tracking-wider">Test</span>
            <span className="px-3 py-1.5 border-2 border-[#EDEDED]/40 text-xs font-bold uppercase tracking-wider">Off Air</span>
          </div>
          <div className="space-y-5">
            {[{ l: "Carrier", pct: 78, c: CYAN }, { l: "Sync", pct: 62, c: RED }, { l: "Tracking", pct: 41, c: YELLOW }].map((p) => (
              <div key={p.l}>
                <div className="flex justify-between text-xs uppercase tracking-[0.2em] mb-2"><span>{p.l}</span><span>{p.pct}%</span></div>
                <div className="h-4 border-2 border-[#EDEDED]/30 bg-[#101014] overflow-hidden">
                  <div className="h-full flex" style={{ width: `${p.pct}%` }}>
                    <div className="w-full" style={{ background: `repeating-linear-gradient(90deg, ${p.c} 0 8px, transparent 8px 11px)` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11 — Alerts */}
        <section className="py-20 md:py-28">
          <SectionHead ch="// Notices" title="Broadcast Alerts" />
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { c: CYAN, t: "Info", m: "Carrier locked. Vertical hold nominal." },
              { c: "#3DFF6E", t: "Success", m: "Color bars aligned to SMPTE spec." },
              { c: YELLOW, t: "Warning", m: "Tracking drift detected on CH-03." },
              { c: RED, t: "Error", m: "Sunset gradient found. This is not synthwave." },
            ].map((a) => (
              <div key={a.t} className="flex items-stretch border-2 border-[#EDEDED]/25 bg-[#101014]">
                <span className="w-2 shrink-0" style={{ background: a.c }} aria-hidden />
                <div className="p-4">
                  <div className="font-bold uppercase tracking-wider text-sm mb-1">{a.t}</div>
                  <p className="text-sm text-[#EDEDED]/65">{a.m}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12 — Test Card */}
        <section className="py-20 md:py-28">
          <SectionHead ch="// Standby" title="The Test Card" />
          <Reveal>
            <div className="relative border-2 border-[#EDEDED]/30 overflow-hidden aspect-[16/7]">
              <div className="absolute inset-0 flex" aria-hidden>{BARS.map((b) => <span key={b} className="flex-1" style={{ background: b }} />)}</div>
              <span className="pointer-events-none absolute inset-0 opacity-25" style={{ background: SCANLINES }} aria-hidden />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#0B0B0E] border-2 border-[#EDEDED] px-8 py-4">
                  <span className="font-bold uppercase tracking-[0.3em] text-xl md:text-2xl" style={{ textShadow: `2px 0 ${CYAN}, -2px 0 ${RED}` }}>SMPTE / 1080</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* 13 — Blockquote */}
        <section className="py-20 md:py-28">
          <Reveal>
            <blockquote className="border-l-4 border-[#FF2E4C] pl-6 md:pl-10">
              <p className="text-2xl md:text-4xl font-bold uppercase leading-snug max-w-3xl"><Split size={2}>The defect is the design. A clean signal has nothing to say.</Split></p>
              <footer className="mt-6 text-xs uppercase tracking-[0.25em] text-[#EDEDED]/50">— Transmission log, ch 01</footer>
            </blockquote>
          </Reveal>
        </section>

        {/* 14 — Rules */}
        <section id="rules" className="py-20 md:py-28">
          <SectionHead ch="// Discipline" title="Do & Don't" />
          <div className="grid md:grid-cols-2 gap-5">
            <div className="border-2 border-[#EDEDED]/25 bg-[#101014] p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[#3DFF6E] mb-4">Do</div>
              <ul className="space-y-3 text-sm text-[#EDEDED]/80">
                {["CRT black + always-on scanlines", "Only glitch red / CRT cyan / test yellow", "Split titles, keep body single-color", "Glitch as occasional stepped jumps", "SMPTE bars as signature decor"].map((r) => (
                  <li key={r} className="flex gap-3"><span className="text-[#3DFF6E]">+</span>{r}</li>
                ))}
              </ul>
            </div>
            <div className="border-2 border-[#EDEDED]/25 bg-[#101014] p-6">
              <div className="text-xs uppercase tracking-[0.25em] text-[#FF2E4C] mb-4">Don't</div>
              <ul className="space-y-3 text-sm text-[#EDEDED]/80">
                {["No synthwave sunset gradient", "No rounded corners or soft glow", "No fourth hue or pastels", "No screen-wide seizure jitter", "No splitting the body text"].map((r) => (
                  <li key={r} className="flex gap-3"><span className="text-[#FF2E4C]">&#215;</span>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* 15 — Footer */}
      <footer className="relative border-t-2 border-[#EDEDED]/20">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="font-bold uppercase tracking-[0.2em] text-2xl mb-3"><Split size={2}>CH&#9633;NNEL</Split></div>
            <p className="text-sm text-[#EDEDED]/55 max-w-sm">Broadcast Glitch — a broken signal, glowing.</p>
          </div>
          <div className="flex gap-6 text-xs uppercase tracking-[0.2em] text-[#EDEDED]/60">
            <Link href="/styles/broadcast-glitch" className="hover:text-[#00E5D8] transition-colors">Docs</Link>
            <Link href="/styles" className="hover:text-[#00E5D8] transition-colors">All Styles</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
