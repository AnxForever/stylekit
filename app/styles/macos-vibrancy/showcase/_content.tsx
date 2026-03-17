"use client";

import { useState, useRef, useEffect } from "react";
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
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>{children}</div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Deep", hex: "#1c1c1e", label: "Sidebar / deepest layer" },
  { name: "Mid", hex: "#2c2c2e", label: "Panels / content area" },
  { name: "Surface", hex: "#3a3a3c", label: "Cards / elevated elements" },
  { name: "Accent Blue", hex: "#0a84ff", label: "Interactive highlights" },
  { name: "Success", hex: "#30d158", label: "Positive states" },
  { name: "Warning", hex: "#ff9f0a", label: "Caution states" },
];

type Tab = "buttons" | "cards" | "inputs" | "nav";


/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState<Tab>("buttons");
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const sidebarItems = ["Dashboard", "Analytics", "Settings", "Profile", "Notifications"];

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white/90" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ============================================================ */}
      {/* 1. NAV                                                       */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2c2c2e] border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-12">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-sm font-medium text-white/60 ml-2" style={{ fontFamily: "Georgia, serif" }}>macOS Vibrancy</span>
          </div>
          <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200">
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO                                                      */}
      {/* ============================================================ */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-8">
            {/* Sidebar demo */}
            <div
              className="hidden md:block w-56 shrink-0 bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/8 rounded-xl p-3"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-1.5 bg-white/6 border border-white/8 rounded-lg text-xs text-white/80 placeholder-white/30 focus:outline-none focus:border-white/15 transition-colors duration-200"
                />
              </div>
              <nav className="space-y-0.5">
                {sidebarItems.map((item, i) => (
                  <button
                    key={item}
                    onClick={() => setActiveSidebar(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      activeSidebar === i
                        ? "bg-white/10 text-white/95"
                        : "text-white/50 hover:text-white/75 hover:bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease 0s, transform 0.6s ease 0s",
                }}
              >
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-4">Visual Style</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/95 mb-4 leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  macOS Vibrancy
                </h1>
                <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-lg mb-8">
                  Native dark panels, system-level blur, 1px borders, and extreme restraint.
                  Depth through shade, not shadow.
                </p>
              </div>

              {/* Property cards */}
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                }}
              >
                {[
                  { value: "#1c → #3a", label: "Three Depths" },
                  { value: "blur-xl", label: "Vibrancy" },
                  { value: "1px", label: "Border Max" },
                  { value: "serif", label: "Headings" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#2c2c2e] border border-white/8 rounded-xl p-4 text-center">
                    <div className="text-sm font-bold font-mono text-white/80 mb-1">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PALETTE                                                   */}
      {/* ============================================================ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">Palette</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white/95" style={{ fontFamily: "Georgia, serif" }}>
              Color system
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="mb-10">
            <p className="text-white/45 text-sm max-w-md leading-relaxed">
              Three shades of dark gray plus system accent colors. No gradients.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {palette.map((c) => (
                <div key={c.name}>
                  <div className="h-20 rounded-xl mb-2 border border-white/6" style={{ backgroundColor: c.hex }} />
                  <div className="text-sm font-medium text-white/80">{c.name}</div>
                  <div className="text-xs font-mono text-white/35">{c.hex}</div>
                  <div className="text-xs text-white/30 mt-0.5">{c.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. TYPOGRAPHY                                                */}
      {/* ============================================================ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">Typography</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white/95" style={{ fontFamily: "Georgia, serif" }}>
              Three typefaces
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#2c2c2e] border border-white/8 rounded-xl p-6">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-4">Headings</p>
                <p className="text-2xl font-bold text-white/95 mb-2" style={{ fontFamily: "Georgia, serif" }}>Georgia, serif</p>
                <p className="text-white/40 text-sm">Used for all headings and display text. Adds warmth and authority.</p>
              </div>
              <div className="bg-[#2c2c2e] border border-white/8 rounded-xl p-6">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-4">Body</p>
                <p className="text-2xl font-bold text-white/95 mb-2">System sans-serif</p>
                <p className="text-white/40 text-sm">-apple-system, BlinkMacSystemFont for body text. Clean and native.</p>
              </div>
              <div className="bg-[#2c2c2e] border border-white/8 rounded-xl p-6">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-4">Code</p>
                <p className="text-2xl font-bold text-white/95 mb-2 font-mono">SF Mono</p>
                <p className="text-white/40 text-sm">Monospace for code blocks, values, and technical content.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. COMPONENTS                                                */}
      {/* ============================================================ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">Components</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white/95" style={{ fontFamily: "Georgia, serif" }}>
              Building blocks
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="mb-6">
            <p className="text-white/45 text-sm max-w-md leading-relaxed">
              Every component follows the same rules: dark backgrounds, 1px borders, subtle hover states.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mb-6">
            <div className="flex gap-2">
              {(["buttons", "cards", "inputs", "nav"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? "bg-white/10 text-white/95"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="bg-[#2c2c2e] border border-white/8 rounded-xl p-8">

              {activeTab === "buttons" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-4">Variants</p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-[#3a3a3c] text-white/90 rounded-lg text-sm font-medium hover:bg-[#48484a] transition-colors duration-200">Primary</button>
                      <button className="px-4 py-2 bg-[#0a84ff] text-white rounded-lg text-sm font-medium hover:bg-[#0a84ff]/85 transition-colors duration-200">Accent</button>
                      <button className="px-4 py-2 bg-transparent text-white/70 border border-white/12 rounded-lg text-sm font-medium hover:bg-white/5 hover:text-white/90 transition-colors duration-200">Outline</button>
                      <button className="px-4 py-2 bg-[#30d158]/15 text-[#30d158] rounded-lg text-sm font-medium hover:bg-[#30d158]/25 transition-colors duration-200">Success</button>
                      <button className="px-4 py-2 bg-[#ff453a]/15 text-[#ff453a] rounded-lg text-sm font-medium hover:bg-[#ff453a]/25 transition-colors duration-200">Danger</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-4">Sizes</p>
                    <div className="flex flex-wrap gap-3 items-center">
                      <button className="px-3 py-1.5 bg-[#3a3a3c] text-white/90 rounded-lg text-xs font-medium">Small</button>
                      <button className="px-4 py-2 bg-[#3a3a3c] text-white/90 rounded-lg text-sm font-medium">Medium</button>
                      <button className="px-6 py-2.5 bg-[#3a3a3c] text-white/90 rounded-lg text-sm font-medium">Large</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-4">States</p>
                    <div className="flex flex-wrap gap-3 items-center">
                      <button className="px-4 py-2 bg-[#3a3a3c] text-white/90 rounded-lg text-sm font-medium">Default</button>
                      <button className="px-4 py-2 bg-[#48484a] text-white/95 rounded-lg text-sm font-medium">Hovered</button>
                      <button className="px-4 py-2 bg-[#3a3a3c] text-white/30 rounded-lg text-sm font-medium cursor-not-allowed">Disabled</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Settings Panel", desc: "System preferences with toggle controls and grouped options." },
                    { title: "File Browser", desc: "Directory tree with file metadata and quick actions." },
                    { title: "Activity Monitor", desc: "Process list with CPU, memory, and network usage." },
                    { title: "Notification Center", desc: "Grouped notifications with timestamps and actions." },
                  ].map((card) => (
                    <div key={card.title} className="bg-[#3a3a3c] border border-white/8 rounded-xl p-5 hover:border-white/12 transition-colors duration-200">
                      <h4 className="text-white/90 font-semibold mb-1.5" style={{ fontFamily: "Georgia, serif" }}>{card.title}</h4>
                      <p className="text-white/45 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">Username</label>
                      <input type="text" placeholder="Enter username..." className="w-full px-3 py-2 bg-[#1c1c1e] border border-white/10 rounded-lg text-sm text-white/90 placeholder-white/30 focus:outline-none focus:border-white/25 transition-colors duration-200" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">Password</label>
                      <input type="password" placeholder="Enter password..." className="w-full px-3 py-2 bg-[#1c1c1e] border border-white/10 rounded-lg text-sm text-white/90 placeholder-white/30 focus:outline-none focus:border-white/25 transition-colors duration-200" />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">Notes</label>
                      <textarea rows={3} placeholder="Write something..." className="w-full px-3 py-2 bg-[#1c1c1e] border border-white/10 rounded-lg text-sm text-white/90 placeholder-white/30 focus:outline-none focus:border-white/25 transition-colors duration-200 resize-none" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-1.5">Theme</label>
                      <select className="w-full px-3 py-2 bg-[#1c1c1e] border border-white/10 rounded-lg text-sm text-white/90 focus:outline-none focus:border-white/25 transition-colors duration-200">
                        <option>Dark</option>
                        <option>Light</option>
                        <option>Auto</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#0a84ff] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-sm text-white/60">Remember me</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-[#0a84ff] text-white rounded-lg text-sm font-medium hover:bg-[#0a84ff]/85 transition-colors duration-200">
                      Sign In
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "nav" && (
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-4">Sidebar with vibrancy</p>
                    <div className="flex rounded-xl overflow-hidden border border-white/8" style={{ minHeight: 240, background: "linear-gradient(135deg, #c4856a, #a0766a)" }}>
                      <div className="w-48 bg-[#1c1c1e]/80 backdrop-blur-xl border-r border-white/8 p-3 flex flex-col gap-0.5">
                        {["Home", "Projects", "Settings", "Help"].map((item, i) => (
                          <div key={item} className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${i === 0 ? "bg-white/10 text-white/95" : "text-white/50"}`}>
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 bg-[#2c2c2e] p-6 flex items-center justify-center">
                        <p className="text-white/30 text-sm">Desktop wallpaper bleeds through the sidebar</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-4">Tab bar</p>
                    <div className="bg-[#2c2c2e] border border-white/8 rounded-xl overflow-hidden">
                      <div className="flex border-b border-white/8">
                        {["main.tsx", "styles.css", "config.ts"].map((tab, i) => (
                          <div key={tab} className={`px-4 py-2.5 text-xs border-r border-white/6 transition-colors duration-200 ${i === 0 ? "bg-[#3a3a3c] text-white/80" : "text-white/35 hover:text-white/55"}`}>
                            {tab}
                          </div>
                        ))}
                      </div>
                      <div className="p-6">
                        <p className="text-white/30 text-sm font-mono">// Editor content area</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. DO / DON'T                                                */}
      {/* ============================================================ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">Guidelines</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white/95" style={{ fontFamily: "Georgia, serif" }}>
              Do / Don&apos;t
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2c2c2e] border border-white/8 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded bg-[#30d158]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#30d158]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm font-semibold text-white/80">Do</span>
                </div>
                <ul className="space-y-2">
                  {[
                    "Three-depth gray system: #1c1c1e -> #2c2c2e -> #3a3a3c",
                    "Sidebar vibrancy: bg-[#1c1c1e]/80 backdrop-blur-xl",
                    "1px borders only: border-white/8 to border-white/12",
                    "Serif headings, sans-serif body, mono code",
                    "Subtle transitions: duration-200, colors only",
                    "System accent #0a84ff for interactive elements",
                  ].map((item) => (
                    <li key={item} className="text-sm text-white/55 leading-relaxed flex items-start gap-2">
                      <span className="text-[#30d158] mt-1 shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#2c2c2e] border border-white/8 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded bg-[#ff453a]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#ff453a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <span className="text-sm font-semibold text-white/80">Don&apos;t</span>
                </div>
                <ul className="space-y-2">
                  {[
                    "No gradients on any element",
                    "No glow effects or large shadows",
                    "No decorative animations (pulse, bounce)",
                    "No rounded-3xl or rounded-full",
                    "No bright accent backgrounds",
                    "No borders thicker than 1px",
                  ].map((item) => (
                    <li key={item} className="text-sm text-white/55 leading-relaxed flex items-start gap-2">
                      <span className="text-[#ff453a] mt-1 shrink-0">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. PHILOSOPHY                                                */}
      {/* ============================================================ */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-3">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/30 mb-3">Philosophy</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white/95" style={{ fontFamily: "Georgia, serif" }}>
              Design principles
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Hierarchy Through Shade", desc: "No gradients or glow. Depth comes purely from three shades of dark gray, each slightly lighter than the last." },
                { title: "System-Level Blur", desc: "The sidebar uses backdrop-blur to let underlying content subtly show through, simulating macOS NSVisualEffectView." },
                { title: "Typography-Driven", desc: "Serif headings add warmth, sans-serif body stays clean, monospace handles code. Three typefaces, each with a clear role." },
                { title: "1px Philosophy", desc: "Every separator is a 1px semi-transparent border. No shadows for depth. The border is the only visual divider." },
                { title: "No Decoration", desc: "No gradients, no glow, no animations. The content itself is the decoration. The UI stays invisible." },
                { title: "Native Feel", desc: "Traffic light buttons, system fonts, restrained interactions. Everything should feel like it belongs on macOS." },
              ].map((p) => (
                <div key={p.title} className="bg-[#2c2c2e] border border-white/8 rounded-xl p-5 hover:border-white/12 transition-colors duration-200">
                  <h4 className="text-white/85 font-semibold mb-2" style={{ fontFamily: "Georgia, serif" }}>{p.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FOOTER                                                    */}
      {/* ============================================================ */}
      <footer className="py-12 px-6 border-t border-white/6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/25 text-sm mb-3">
            macOS Vibrancy — native dark design for the web
          </p>
          <Link href="/styles" className="text-white/40 hover:text-white/70 text-sm transition-colors duration-200">
            Back to all styles
          </Link>
        </div>
      </footer>
    </div>
  );
}
