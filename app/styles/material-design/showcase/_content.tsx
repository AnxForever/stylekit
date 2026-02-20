"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

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
  children: React.ReactNode; className?: string; delay?: number;
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

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const elevationShadows: Record<number, string> = {
  0: "none",
  2: "0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24)",
  4: "0 3px 6px rgba(0,0,0,0.16),0 3px 6px rgba(0,0,0,0.23)",
  8: "0 10px 20px rgba(0,0,0,0.19),0 6px 6px rgba(0,0,0,0.23)",
  16: "0 14px 28px rgba(0,0,0,0.25),0 10px_10px rgba(0,0,0,0.22)",
  24: "0 19px 38px rgba(0,0,0,0.30),0 15px 12px rgba(0,0,0,0.22)",
};

// Elevation spec shadows (corrected, no underscore)
const dpShadow: Record<number, string> = {
  0: "none",
  2: "0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24)",
  4: "0 2px 4px -1px rgba(0,0,0,0.2),0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12)",
  8: "0 5px 5px -3px rgba(0,0,0,0.2),0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12)",
  16: "0 8px 10px -5px rgba(0,0,0,0.2),0 16px 24px 2px rgba(0,0,0,0.14),0 6px 30px 5px rgba(0,0,0,0.12)",
  24: "0 11px 15px -7px rgba(0,0,0,0.2),0 24px 38px 3px rgba(0,0,0,0.14),0 9px 46px 8px rgba(0,0,0,0.12)",
};

const dpHoverShadow = "0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)";

const COMPONENT_TABS = ["Buttons", "Cards", "Inputs", "FABs"] as const;
type ComponentTab = (typeof COMPONENT_TABS)[number];

const BOTTOM_NAV_ITEMS = [
  { label: "Home", icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" },
  { label: "Search", icon: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" },
  { label: "Inbox", icon: "M19 3H4.99c-1.1 0-1.98.9-1.98 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z" },
  { label: "Profile", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
] as const;

const typescaleRows = [
  { role: "H1", size: "text-[6rem]", weight: "font-light", tracking: "-0.015em", line: "1.167", sample: "Display" },
  { role: "H2", size: "text-[3.75rem]", weight: "font-light", tracking: "-0.005em", line: "1.2", sample: "Headline" },
  { role: "H3", size: "text-[3rem]", weight: "font-normal", tracking: "0em", line: "1.167", sample: "Title Large" },
  { role: "H4", size: "text-[2.125rem]", weight: "font-normal", tracking: "0.0025em", line: "1.235", sample: "Title" },
  { role: "H5", size: "text-[1.5rem]", weight: "font-normal", tracking: "0em", line: "1.334", sample: "Title Small" },
  { role: "H6", size: "text-[1.25rem]", weight: "font-medium", tracking: "0.0075em", line: "1.6", sample: "Subtitle" },
  { role: "Body1", size: "text-base", weight: "font-normal", tracking: "0.03125em", line: "1.5", sample: "Body regular — used for primary content areas and long-form reading." },
  { role: "Body2", size: "text-sm", weight: "font-normal", tracking: "0.01786em", line: "1.43", sample: "Body small — secondary text, captions, helper messages." },
  { role: "Caption", size: "text-xs", weight: "font-normal", tracking: "0.033em", line: "1.66", sample: "Caption — annotations, image captions, supporting detail." },
  { role: "OVERLINE", size: "text-[0.625rem]", weight: "font-medium", tracking: "0.1666em", line: "2.66", sample: "OVERLINE TEXT — SECTION LABELS" },
];

const colorSwatches = [
  { label: "Primary", token: "primary", hex: "#6200ee", variants: [{ hex: "#7c4dff", name: "Variant 1" }, { hex: "#b388ff", name: "Tint" }, { hex: "#ede7f6", name: "Container" }], lightText: true },
  { label: "Secondary", token: "secondary", hex: "#03dac6", variants: [{ hex: "#018786", name: "Variant" }, { hex: "#80cbc4", name: "Tint" }, { hex: "#e0f2f1", name: "Container" }], lightText: false },
  { label: "Error", token: "error", hex: "#b00020", variants: [{ hex: "#cf6679", name: "Tint" }, { hex: "#fcd3d9", name: "Container" }, { hex: "#fff8f8", name: "Surface" }], lightText: true },
  { label: "Neutral", token: "neutral", hex: "#212121", variants: [{ hex: "#616161", name: "Mid" }, { hex: "#9e9e9e", name: "Light" }, { hex: "#f5f5f5", name: "Background" }], lightText: true },
];

const accentPalette = [
  { label: "Pink A400", hex: "#ff0266" },
  { label: "Yellow A700", hex: "#ffde03" },
  { label: "Green A700", hex: "#00c853" },
  { label: "Surface", hex: "#ffffff" },
  { label: "Background", hex: "#fafafa" },
  { label: "On Primary", hex: "#ffffff" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function MaterialDesignShowcase() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("Buttons");
  const [selectedDp, setSelectedDp] = useState<number>(4);
  const [fabExpanded, setFabExpanded] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [inputValues, setInputValues] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const heroT = (delay: number) => ({
    opacity: heroVisible ? 1 : 0,
    transform: heroVisible ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
  });

  const dpLabels: Record<number, string> = {
    0: "Flat surface — no elevation",
    2: "Card resting state, switch",
    4: "App Bar, raised button rest",
    8: "Card (picked up), FAB resting",
    16: "Nav drawer, modal bottom sheet",
    24: "Dialog, picker, snackbar",
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900">

      {/* ============================================================ */}
      {/* 1. App Bar (fixed nav) — NO RevealBlock per spec              */}
      {/* ============================================================ */}
      <header
        className="fixed top-0 left-0 right-0 h-16 bg-[#6200ee] z-50 flex items-center px-4"
        style={{ boxShadow: dpShadow[4] }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Hamburger icon */}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>
            <span className="text-white font-medium text-xl tracking-wide select-none">
              Material Design
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
              aria-label="More options"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. Hero section                                               */}
      {/* ============================================================ */}
      <section className="pt-16 bg-gradient-to-br from-[#6200ee] via-[#7c4dff] to-[#b388ff] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 relative">

          {/* Decorative background circles */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: "#03dac6", filter: "blur(80px)", transform: "translate(30%, -30%)" }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-10"
            style={{ background: "#ff0266", filter: "blur(60px)", transform: "translateY(50%)" }}
          />

          <div style={heroT(0)}>
            <p className="text-[#03dac6] font-medium text-xs uppercase tracking-[0.16em] mb-5">
              Google Design Language
            </p>
          </div>

          <div style={heroT(120)}>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
              Paper and{" "}
              <span className="text-[#03dac6]">Ink</span>
              <br />
              Reimagined
            </h1>
          </div>

          <div style={heroT(240)}>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
              Material Design is a design language developed by Google. Grounded in
              the physical world, it translates the texture of paper and ink into
              digital surfaces — using depth, shadow, and motion as the vocabulary
              of a living interface.
            </p>
          </div>

          <div className="flex flex-wrap gap-4" style={heroT(360)}>
            <button
              className="px-8 py-3 bg-[#03dac6] text-black font-medium uppercase tracking-[0.08em] text-sm rounded-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
              style={{ boxShadow: dpShadow[4] }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[4]; }}
            >
              Explore System
            </button>
            <button className="px-8 py-3 border-2 border-white/40 text-white font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-white/10 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
              View Components
            </button>
          </div>

          {/* Hero floating card */}
          <div
            className="mt-16 md:mt-24"
            style={heroT(500)}
          >
            <div
              className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl"
              style={{ boxShadow: dpShadow[8] }}
            >
              <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-3">
                Core Principle
              </p>
              <p className="text-gray-900 text-xl md:text-2xl font-medium leading-snug">
                Material is the metaphor. A unifying theory of a rationalized
                space and a system of motion grounded in tactile reality.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-[#6200ee] rounded-full" />
                <p className="text-gray-500 text-sm">Google Material Design Guidelines</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Elevation System Demo                                      */}
      {/* ============================================================ */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">

          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-3 text-center">
              Core Concept
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Elevation System
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-14">
              Every surface occupies a position on the z-axis. Shadow depth
              communicates elevation above the base material layer. Click a card
              to inspect its shadow spec.
            </p>
          </RevealBlock>

          {/* dp cards grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10">
            {([0, 2, 4, 8, 16, 24] as const).map((dp, i) => (
              <RevealBlock key={dp} delay={i * 0.06}>
                <button
                  onClick={() => setSelectedDp(dp)}
                  className="group w-full bg-white rounded-xl p-6 flex flex-col items-center gap-3 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1 cursor-pointer border-2"
                  style={{
                    boxShadow: selectedDp === dp ? dpHoverShadow : dpShadow[dp],
                    borderColor: selectedDp === dp ? "#6200ee" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedDp !== dp)
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow;
                  }}
                  onMouseLeave={(e) => {
                    if (selectedDp !== dp)
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[dp];
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg bg-[#6200ee]/10 group-hover:bg-[#6200ee]/20 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]"
                    style={{ boxShadow: dpShadow[dp] }}
                  />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide group-hover:text-[#6200ee] transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]">
                    dp{dp}
                  </span>
                </button>
              </RevealBlock>
            ))}
          </div>

          {/* Selected dp details */}
          <RevealBlock delay={0.2}>
            <div
              className="bg-white rounded-2xl p-6 md:p-8"
              style={{ boxShadow: dpShadow[selectedDp] }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#6200ee]/10 text-[#6200ee] text-xs font-medium uppercase tracking-wider">
                      dp{selectedDp}
                    </span>
                    <h3 className="font-medium text-gray-900">
                      {dpLabels[selectedDp]}
                    </h3>
                  </div>
                  <p className="text-xs font-mono text-gray-400 break-all leading-relaxed">
                    box-shadow: {dpShadow[selectedDp]}
                  </p>
                </div>
                <div
                  className="w-16 h-16 rounded-xl bg-[#6200ee]/5 flex-shrink-0"
                  style={{ boxShadow: dpShadow[selectedDp] }}
                />
              </div>
            </div>
          </RevealBlock>

          {/* Elevation physics note */}
          <RevealBlock delay={0.3}>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                { title: "Dual Shadow Layers", desc: "Each dp level uses two shadow layers: a key shadow (directional) and an ambient shadow (soft, surrounding)." },
                { title: "Deceleration Curve", desc: "All Material transitions use cubic-bezier(0.4, 0, 0.2, 1) — elements decelerate into their resting state." },
                { title: "Z-axis Lift", desc: "On hover, surfaces lift -translate-y-1 and upgrade their shadow level, simulating physical lift off the plane." },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-xl p-6 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] hover:-translate-y-1" style={{ boxShadow: dpShadow[2] }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpHoverShadow; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpShadow[2]; }}
                >
                  <h4 className="font-medium text-gray-900 mb-2 group-hover:text-[#6200ee] transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. Component Demos                                            */}
      {/* ============================================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-3 text-center">
              Component Library
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Material Components
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
              Production-ready UI elements following the full Material Design
              specification — buttons, cards, inputs, and FABs.
            </p>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.1}>
            <div className="flex border-b border-gray-200 mb-10 overflow-x-auto">
              {COMPONENT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm uppercase tracking-[0.08em] whitespace-nowrap transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] relative flex-shrink-0 active:scale-[0.98] ${
                    activeTab === tab ? "text-[#6200ee]" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6200ee] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Buttons tab */}
          {activeTab === "Buttons" && (
            <RevealBlock>
              <div className="space-y-10">
                {/* Contained */}
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.1em] mb-4">
                    Contained (dp2 → dp8 on hover)
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { label: "Primary", bg: "#6200ee", color: "white" },
                      { label: "Secondary", bg: "#03dac6", color: "black" },
                      { label: "Error", bg: "#b00020", color: "white" },
                      { label: "Accent", bg: "#ff0266", color: "white" },
                    ].map(({ label, bg, color }) => (
                      <button
                        key={label}
                        className="px-6 py-2 font-medium uppercase tracking-[0.08em] text-sm rounded-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                        style={{ background: bg, color, boxShadow: dpShadow[2] }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[2]; }}
                      >
                        {label}
                      </button>
                    ))}
                    <button className="px-6 py-2 bg-gray-300 text-gray-500 font-medium uppercase tracking-[0.08em] text-sm rounded-full cursor-not-allowed opacity-60">
                      Disabled
                    </button>
                  </div>
                </div>

                {/* Outlined */}
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.1em] mb-4">
                    Outlined (no elevation)
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-2 border-2 border-[#6200ee] text-[#6200ee] font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-[#6200ee]/8 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Primary
                    </button>
                    <button className="px-6 py-2 border-2 border-[#03dac6] text-[#018786] font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-[#03dac6]/10 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Secondary
                    </button>
                    <button className="px-6 py-2 border-2 border-[#b00020] text-[#b00020] font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-[#b00020]/8 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Error
                    </button>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.1em] mb-4">
                    Text (ghost — no border, no shadow)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-6 py-2 text-[#6200ee] font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-[#6200ee]/8 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Primary Text
                    </button>
                    <button className="px-6 py-2 text-[#018786] font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-[#03dac6]/10 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Secondary Text
                    </button>
                    <button className="px-6 py-2 text-gray-600 font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-gray-100 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Neutral Text
                    </button>
                  </div>
                </div>

                {/* Icon buttons */}
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.1em] mb-4">
                    Icon buttons
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z", color: "#ff0266" },
                      { path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z", color: "#ffde03" },
                      { path: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z", color: "#b00020" },
                    ].map((btn, i) => (
                      <button
                        key={i}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
                      >
                        <svg className="w-5 h-5" fill={btn.color} viewBox="0 0 24 24">
                          <path d={btn.path} />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards tab */}
          {activeTab === "Cards" && (
            <RevealBlock>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    accentColor: "#6200ee",
                    accentBg: "from-[#6200ee] to-[#7c4dff]",
                    iconPath: "M7 2v11h3v9l7-12h-4l4-8z",
                    title: "Performance",
                    body: "Hardware-accelerated animations and optimized layout algorithms deliver 60fps experiences on every device.",
                    action: "Explore",
                    tag: "dp1 → dp8",
                  },
                  {
                    accentColor: "#018786",
                    accentBg: "from-[#03dac6] to-[#018786]",
                    iconPath: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
                    title: "Beautiful",
                    body: "Stunning interfaces built on bold color and meaningful motion — designed to communicate and delight in equal measure.",
                    action: "Discover",
                    tag: "dp1 → dp8",
                  },
                  {
                    accentColor: "#7c4dff",
                    accentBg: "from-[#7c4dff] to-[#651fff]",
                    iconPath: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
                    title: "Reliable",
                    body: "Material components are tested across platforms, screen sizes, and accessibility requirements you can depend on.",
                    action: "Learn",
                    tag: "dp1 → dp8",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-2xl overflow-hidden transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] hover:-translate-y-1 cursor-pointer"
                    style={{ boxShadow: dpShadow[2] }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpHoverShadow; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpShadow[2]; }}
                  >
                    <div className={`h-48 bg-gradient-to-br ${card.accentBg} flex items-center justify-center relative overflow-hidden`}>
                      <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d={card.iconPath} />
                      </svg>
                      <span className="absolute top-3 right-3 text-[10px] text-white/70 font-mono uppercase tracking-wider">
                        {card.tag}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-[#6200ee] transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-5">{card.body}</p>
                      <button
                        className="text-[#6200ee] font-medium uppercase tracking-[0.08em] text-sm px-4 py-2 -ml-4 rounded-full hover:bg-[#6200ee]/8 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
                        style={{ color: card.accentColor }}
                      >
                        {card.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* Inputs tab */}
          {activeTab === "Inputs" && (
            <RevealBlock>
              <div className="max-w-lg mx-auto space-y-8">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Material text fields use a filled variant with a bottom border indicator.
                  Labels animate upward on focus using the CSS{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#6200ee] text-xs font-mono">peer</code>{" "}
                  selector pattern.
                </p>

                {/* Filled text fields */}
                <div className="space-y-4">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.1em]">Filled variant</p>
                  {[
                    { type: "text", label: "Full Name", key: "name" as const },
                    { type: "email", label: "Email Address", key: "email" as const },
                    { type: "password", label: "Password", key: "password" as const },
                  ].map(({ type, label, key }) => (
                    <div key={key} className="relative">
                      <input
                        type={type}
                        placeholder=" "
                        value={inputValues[key]}
                        onChange={(e) => setInputValues((prev) => ({ ...prev, [key]: e.target.value }))}
                        className="peer w-full px-4 pt-6 pb-2 bg-gray-100 border-0 border-b-2 border-gray-400 rounded-t-lg text-gray-900 focus:outline-none focus:border-[#6200ee] focus:bg-gray-50 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]"
                      />
                      <label className="absolute left-4 top-4 text-gray-500 text-base transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Outlined text field */}
                <div className="space-y-4">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.1em]">Outlined variant</p>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder=" "
                      className="peer w-full px-4 pt-4 pb-4 bg-white border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#6200ee] transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]"
                    />
                    <label className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-gray-500 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#6200ee] peer-focus:bg-white pointer-events-none">
                      Company Name
                    </label>
                  </div>
                </div>

                <button
                  className="w-full py-3 bg-[#6200ee] text-white font-medium uppercase tracking-[0.08em] text-sm rounded-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                  style={{ boxShadow: dpShadow[2] }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[2]; }}
                >
                  Sign In
                </button>
              </div>
            </RevealBlock>
          )}

          {/* FABs tab */}
          {activeTab === "FABs" && (
            <RevealBlock>
              <div className="space-y-10">
                <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
                  Floating Action Buttons represent the primary action of a screen.
                  They rest at dp6 elevation, use the secondary color, and animate
                  to dp12 on hover. Only one FAB per screen view.
                </p>

                <div className="flex flex-wrap items-end gap-10">
                  {/* Mini FAB */}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      className="w-10 h-10 rounded-full bg-[#03dac6] flex items-center justify-center text-black transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                      style={{ boxShadow: dpShadow[4] }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[4]; }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </button>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Mini</span>
                  </div>

                  {/* Standard FAB */}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      className="w-14 h-14 rounded-full bg-[#03dac6] flex items-center justify-center text-black transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                      style={{ boxShadow: dpShadow[4] }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[4]; }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </button>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Standard</span>
                  </div>

                  {/* Primary color FAB */}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      className="w-14 h-14 rounded-full bg-[#6200ee] flex items-center justify-center text-white transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                      style={{ boxShadow: dpShadow[4] }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[4]; }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    </button>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Primary</span>
                  </div>

                  {/* Pink accent FAB */}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      className="w-14 h-14 rounded-full bg-[#ff0266] flex items-center justify-center text-white transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                      style={{ boxShadow: dpShadow[4] }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[4]; }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Accent</span>
                  </div>

                  {/* Extended FAB */}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      className="h-14 px-6 bg-[#03dac6] rounded-full flex items-center gap-3 text-black font-medium uppercase tracking-[0.08em] text-sm transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                      style={{ boxShadow: dpShadow[4] }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[4]; }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                      Compose
                    </button>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Extended</span>
                  </div>
                </div>

                {/* FAB interaction note */}
                <div className="bg-[#fafafa] rounded-xl p-5 border border-gray-100 max-w-lg">
                  <p className="text-xs font-medium text-[#6200ee] uppercase tracking-[0.1em] mb-2">Interaction rule</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    FABs rest at <strong>dp6</strong> and elevate to <strong>dp12</strong> on press.
                    The pseudo-ripple is simulated with <code className="bg-gray-100 px-1 rounded text-xs font-mono">active:scale-[0.98]</code>.
                  </p>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Color System                                               */}
      {/* ============================================================ */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">

          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-3 text-center">
              Visual Language
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Color System
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-14">
              Color is applied with purpose: to convey meaning, establish
              hierarchy, and create consistent brand identity across surfaces.
            </p>
          </RevealBlock>

          {/* Primary palette swatches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.token} delay={i * 0.07}>
                <div className="rounded-2xl overflow-hidden" style={{ boxShadow: dpShadow[2] }}>
                  <div
                    className="h-28 flex items-end p-4"
                    style={{ background: swatch.hex }}
                  >
                    <div>
                      <p className={`font-medium text-sm ${swatch.lightText ? "text-white" : "text-black"}`}>
                        {swatch.label}
                      </p>
                      <p className={`text-xs font-mono opacity-80 ${swatch.lightText ? "text-white" : "text-black"}`}>
                        {swatch.hex}
                      </p>
                    </div>
                  </div>
                  {swatch.variants.map((v, vi) => (
                    <div
                      key={v.hex}
                      className="h-10 flex items-center justify-between px-4"
                      style={{ background: v.hex }}
                    >
                      <span
                        className="text-xs font-mono"
                        style={{ color: vi >= 1 ? "#212121" : "rgba(255,255,255,0.9)" }}
                      >
                        {v.hex}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: vi >= 1 ? "#757575" : "rgba(255,255,255,0.6)" }}
                      >
                        {v.name}
                      </span>
                    </div>
                  ))}
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Accent + semantic swatches */}
          <RevealBlock delay={0.2}>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {accentPalette.map((c) => (
                <div key={c.label} className="text-center">
                  <div
                    className="h-14 rounded-xl mb-2 border border-gray-200"
                    style={{ background: c.hex }}
                  />
                  <p className="text-xs font-medium text-gray-700">{c.label}</p>
                  <p className="text-xs text-gray-400 font-mono">{c.hex}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Color usage rules */}
          <RevealBlock delay={0.3}>
            <div className="mt-10 grid md:grid-cols-3 gap-4">
              {[
                { color: "#6200ee", label: "Primary", usage: "App bars, primary buttons, active states, selected indicators — the dominant brand color." },
                { color: "#03dac6", label: "Secondary", usage: "FABs, selection controls, highlighted inputs — used sparingly for the most important accent." },
                { color: "#ff0266", label: "Pink Accent", usage: "A400 accent — notifications, badges, emphasis overlays. Never use as a background." },
              ].map((item) => (
                <div key={item.color} className="group bg-white rounded-xl p-5 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] hover:-translate-y-0.5" style={{ boxShadow: dpShadow[2] }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpHoverShadow; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpShadow[2]; }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="font-medium text-gray-900 group-hover:text-[#6200ee] transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.usage}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. Bottom Navigation Bar Demo                                 */}
      {/* ============================================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-3 text-center">
              Navigation Pattern
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Bottom Navigation Bar
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-14">
              Material bottom navigation bars allow switching between top-level
              destinations in an app. They appear at dp8 and contain 3–5 items.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="max-w-md mx-auto">
              {/* Mock phone frame */}
              <div
                className="bg-white rounded-3xl overflow-hidden border-4 border-gray-200"
                style={{ boxShadow: dpShadow[8] }}
              >
                {/* Mock screen content */}
                <div className="bg-[#fafafa] h-64 flex flex-col items-center justify-center gap-3 px-6 text-center">
                  <div
                    className="w-12 h-12 rounded-full bg-[#6200ee]/10 flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-[#6200ee]" fill="currentColor" viewBox="0 0 24 24">
                      <path d={BOTTOM_NAV_ITEMS[activeNavItem].icon} />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {BOTTOM_NAV_ITEMS[activeNavItem].label}
                  </p>
                  <p className="text-sm text-gray-400">Active destination</p>
                </div>

                {/* Bottom nav */}
                <nav
                  className="bg-white flex"
                  style={{ boxShadow: "0 -2px 4px rgba(0,0,0,0.08)" }}
                >
                  {BOTTOM_NAV_ITEMS.map((item, i) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveNavItem(i)}
                      className={`flex-1 flex flex-col items-center py-3 gap-1 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] ${
                        activeNavItem === i
                          ? "text-[#6200ee]"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        style={{ transform: activeNavItem === i ? "scale(1.1)" : "scale(1)", transition: "transform 250ms cubic-bezier(0.4,0,0.2,1)" }}
                      >
                        <path d={item.icon} />
                      </svg>
                      <span className={`text-[10px] font-medium uppercase tracking-wider transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] ${
                        activeNavItem === i ? "opacity-100" : "opacity-60"
                      }`}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              <p className="text-center text-xs text-gray-400 mt-4">
                Click tabs to switch active destination
              </p>
            </div>
          </RevealBlock>

          {/* Bottom nav spec */}
          <RevealBlock delay={0.2}>
            <div className="mt-10 max-w-2xl mx-auto grid md:grid-cols-3 gap-4 text-center">
              {[
                { spec: "dp8", label: "Elevation", desc: "Bottom nav floats at dp8 above content" },
                { spec: "3–5", label: "Destinations", desc: "Minimum 3, maximum 5 navigation items" },
                { spec: "56dp", label: "Height", desc: "Standard height is 56dp (56px at 1x)" },
              ].map((s) => (
                <div key={s.spec} className="bg-[#fafafa] rounded-xl p-5" style={{ boxShadow: dpShadow[2] }}>
                  <p className="text-2xl font-bold text-[#6200ee] mb-1">{s.spec}</p>
                  <p className="text-sm font-medium text-gray-700 mb-1">{s.label}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Typography Scale                                           */}
      {/* ============================================================ */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">

          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-3 text-center">
              Type Scale
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Typography
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-14">
              Material Design uses the Roboto typeface. The type scale provides
              13 named styles spanning Display through Caption.
            </p>
          </RevealBlock>

          <div className="space-y-2">
            {typescaleRows.map((t, i) => (
              <RevealBlock key={t.role} delay={i * 0.04}>
                <div
                  className="group bg-white rounded-xl px-6 py-4 flex items-baseline gap-4 md:gap-6 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] hover:-translate-y-0.5 overflow-hidden"
                  style={{ boxShadow: dpShadow[2] }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpShadow[4]; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpShadow[2]; }}
                >
                  <span className="text-xs font-mono text-gray-400 w-14 flex-shrink-0 group-hover:text-[#6200ee] transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]">
                    {t.role}
                  </span>
                  <span
                    className={`${t.size} ${t.weight} text-gray-900 flex-1 leading-none truncate`}
                    style={{ letterSpacing: t.tracking }}
                  >
                    {t.sample}
                  </span>
                  <span className="text-xs text-gray-400 font-mono flex-shrink-0 hidden md:block">
                    {t.size}
                  </span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. Design Rules (Do / Don't)                                  */}
      {/* ============================================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-3 text-center">
              Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Design Principles
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-14">
              Three core principles guide every Material decision — from shadow
              depth to motion curves.
            </p>
          </RevealBlock>

          {/* Three core principles */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z",
                title: "Material is the Metaphor",
                desc: "A material metaphor is the unifying theory of a rationalized space and a system of motion. The material is grounded in tactile reality, inspired by the study of paper and ink.",
              },
              {
                iconPath: "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-11.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 5.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z",
                title: "Bold, Graphic, Intentional",
                desc: "Typography, grids, space, scale, color, and imagery guide visual treatments and signal hierarchy. These elements do far more than please the eye.",
              },
              {
                iconPath: "M13 2.05V4.05C17.39 4.59 20.5 8.58 19.96 12.97C19.5 16.61 16.64 19.5 13 19.93V21.93C18.5 21.38 22.5 16.5 21.95 11C21.5 6.25 17.73 2.5 13 2.05M11 2.06C9.05 2.25 7.19 3 5.67 4.26L7.1 5.74C8.22 4.84 9.57 4.26 11 4.06V2.06M4.26 5.67C3 7.19 2.25 9.04 2.05 11H4.05C4.24 9.58 4.8 8.23 5.69 7.1L4.26 5.67M2.06 13C2.26 14.96 3.03 16.81 4.27 18.33L5.69 16.9C4.81 15.77 4.24 14.42 4.06 13H2.06M7.1 18.37L5.67 19.74C7.18 21 9.04 21.79 11 22V20C9.58 19.82 8.23 19.25 7.1 18.37Z",
                title: "Motion Provides Meaning",
                desc: "Motion respects and reinforces the user as the prime mover. Primary user actions are inflection points that initiate motion — clarifying relationships.",
              },
            ].map((p, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div
                  className="group bg-[#fafafa] rounded-2xl p-8 h-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] hover:-translate-y-1"
                  style={{ boxShadow: dpShadow[2] }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpHoverShadow; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = dpShadow[2]; }}
                >
                  <div className="w-14 h-14 bg-[#6200ee]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#6200ee]/20 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]">
                    <svg className="w-7 h-7 text-[#6200ee]" fill="currentColor" viewBox="0 0 24 24">
                      <path d={p.iconPath} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-[#6200ee] transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't */}
          <RevealBlock delay={0.2}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Do */}
              <div className="rounded-2xl p-8 border-2 border-[#00c853]/30 bg-[#00c853]/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#00c853] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 text-lg">Do</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    "Use the elevation shadow system — every surface must sit at a defined dp level",
                    "Apply cubic-bezier(0.4, 0, 0.2, 1) for all Material transitions",
                    "Use UPPERCASE + letter-spacing-wide for button labels",
                    "Follow the 8dp spacing grid — all margins/padding multiples of 8",
                    "Reserve secondary color for the single most important action per view",
                    "Combine hover:-translate-y-1 with shadow upgrade for Z-axis lift",
                    "Include active:scale-[0.98] on every interactive button and FAB",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="text-[#00c853] font-bold mt-0.5 flex-shrink-0">+</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don't */}
              <div className="rounded-2xl p-8 border-2 border-[#b00020]/30 bg-[#b00020]/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#b00020] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 text-lg">{"Don't"}</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    "Assign arbitrary shadow values — every shadow must map to a defined dp level",
                    "Use linear or ease-in easing — it feels mechanical and inorganic",
                    "Use muted or desaturated colors — Material demands bold, vivid hues",
                    "Place two FABs on a single screen — one primary action per view",
                    "Ignore interaction feedback — every button must respond visually to input",
                    "Use non-Material shadow depths — inconsistent elevations destroy hierarchy",
                    "Skip active:scale-[0.98] — pseudo-ripple feedback is non-negotiable",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="text-[#b00020] font-bold mt-0.5 flex-shrink-0">-</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. Footer                                                     */}
      {/* ============================================================ */}
      <footer className="bg-[#6200ee] py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#03dac6] flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM3 10h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM3 17h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4z"/>
                  </svg>
                </div>
                <span className="text-white font-medium text-xl tracking-wide">
                  Material Design
                </span>
              </div>
              <p className="text-white/60 text-sm max-w-sm leading-relaxed">
                A design system built and supported by Google. Material helps teams
                build high-quality digital experiences faster.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/styles/material-design"
                className="px-6 py-2.5 border-2 border-white/30 text-white font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-white/10 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
              >
                Style Docs
              </Link>
              <Link
                href="/styles"
                className="px-6 py-2.5 bg-[#03dac6] text-black font-medium uppercase tracking-[0.08em] text-sm rounded-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-0.5"
                style={{ boxShadow: dpShadow[4] }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = dpHoverShadow; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = dpShadow[4]; }}
              >
                All Styles
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">
              StyleKit · Material Design Showcase
            </p>
            <div className="flex items-center gap-6">
              {["Elevation", "Color", "Typography", "Motion"].map((link) => (
                <span
                  key={link}
                  className="text-white/40 text-xs hover:text-white/70 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] cursor-pointer"
                >
                  {link}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* Fixed FAB (expandable)                                        */}
      {/* ============================================================ */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
        {/* Speed dial actions */}
        {fabExpanded && (
          <div className="flex flex-col items-end gap-3">
            {[
              { label: "Share", path: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" },
              { label: "Star", path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" },
            ].map(({ label, path }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-700 bg-white px-2.5 py-1 rounded-full" style={{ boxShadow: dpShadow[4] }}>
                  {label}
                </span>
                <button
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#6200ee] transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-0.5"
                  style={{ boxShadow: dpShadow[4] }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[4]; }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setFabExpanded((prev) => !prev)}
          className="w-14 h-14 bg-[#ff0266] rounded-full flex items-center justify-center text-white transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
          style={{ boxShadow: dpShadow[4] }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpHoverShadow; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = dpShadow[4]; }}
          aria-label={fabExpanded ? "Close actions" : "Open actions"}
          aria-expanded={fabExpanded}
        >
          <svg
            className="w-6 h-6 transition-transform ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]"
            style={{ transform: fabExpanded ? "rotate(45deg)" : "rotate(0deg)" }}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
