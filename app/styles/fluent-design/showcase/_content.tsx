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
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const fluentColors = [
  { name: "Microsoft Blue", hex: "#0078d4", role: "Primary actions, links, focus", lightText: false },
  { name: "Deep Blue", hex: "#106ebe", role: "Hover states, secondary actions", lightText: false },
  { name: "Gold Accent", hex: "#ffb900", role: "Highlights, notifications", lightText: true },
  { name: "Alert Red", hex: "#e81123", role: "Errors, destructive actions", lightText: false },
  { name: "Success Green", hex: "#00cc6a", role: "Confirmations, positive states", lightText: true },
];

const fluentPrinciples = [
  {
    id: "light",
    title: "Light",
    description:
      "Light illuminates surfaces and creates a sense of hierarchy. Acrylic materials use light to reveal depth and dimension across layers.",
    detail:
      "Reveal highlight borders glow when the cursor approaches — simulating a light source moving across the interface.",
    accent: "#ffb900",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
    ),
  },
  {
    id: "depth",
    title: "Depth",
    description:
      "Surfaces exist in three-dimensional space. Cards, panels, and overlays sit at distinct z-levels, communicating information hierarchy through elevation.",
    detail: "Shadow scale — sm for inline cards, md for raised panels, xl for dialogs and flyouts.",
    accent: "#0078d4",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
        />
      </svg>
    ),
  },
  {
    id: "motion",
    title: "Motion",
    description:
      "Fluid, purposeful animations guide attention and reinforce spatial understanding. Motion is always functional — it reveals state, not just decorates.",
    detail: "Fluent motion curve: cubic-bezier(0.16, 1, 0.3, 1) — fast start, graceful deceleration.",
    accent: "#00cc6a",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    id: "material",
    title: "Material",
    description:
      "Acrylic and Mica materials add translucency and blur, connecting surfaces to their surroundings. Material reflects the physical environment.",
    detail:
      "Acrylic: bg-white/70 + backdrop-blur-xl. Mica: subtle tinted blur tied to wallpaper hue.",
    accent: "#106ebe",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
        />
      </svg>
    ),
  },
  {
    id: "scale",
    title: "Scale",
    description:
      "Consistent sizing across devices, input methods, and accessibility needs. Touch targets, font sizes, and spacing adapt without losing identity.",
    detail:
      "Minimum touch target: 44px. Focus ring: 2px offset, Microsoft blue. Keyboard fully navigable.",
    accent: "#e81123",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
        />
      </svg>
    ),
  },
];

const typographyScale = [
  { label: "Display", size: "text-5xl", weight: "font-light", sample: "Fluent Design", desc: "Hero titles, large display text" },
  { label: "Title Large", size: "text-3xl", weight: "font-semibold", sample: "Title Large", desc: "Section headings, page titles" },
  { label: "Title", size: "text-xl", weight: "font-semibold", sample: "Title Text Here", desc: "Card headers, dialog titles" },
  { label: "Body Large", size: "text-base", weight: "font-normal", sample: "Body Large: reads clearly at all sizes.", desc: "Primary body content" },
  { label: "Body", size: "text-sm", weight: "font-normal", sample: "Body: the default text size for most UI elements.", desc: "Default UI text" },
  { label: "Caption", size: "text-xs", weight: "font-normal", sample: "Caption text — labels, metadata, helper descriptions.", desc: "Labels and metadata" },
];

const commandBarActions = [
  { label: "New", iconPath: "M12 4.5v15m7.5-7.5h-15" },
  { label: "Open", iconPath: "M3.75 9.75h16.5m-16.5 4.5h16.5" },
  { label: "Save", iconPath: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" },
  { label: "Share", iconPath: "M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" },
];

const notificationItems = [
  { title: "Build succeeded", body: "fluent-design@1.0.0 compiled in 2.3s", time: "Just now", type: "success" as const },
  { title: "New comment", body: "Sarah left a review on your component", time: "5m ago", type: "info" as const },
  { title: "Update available", body: "Windows 11 23H2 is ready to install", time: "1h ago", type: "warning" as const },
];

const motionTokens = [
  { name: "Fast In/Out", curve: "cubic-bezier(0.16,1,0.3,1)", duration: "200ms", use: "Micro-interactions, reveals", color: "#0078d4" },
  { name: "Gentle", curve: "cubic-bezier(0.33,0,0.67,1)", duration: "300ms", use: "Content transitions", color: "#106ebe" },
  { name: "Snappy", curve: "cubic-bezier(0,0,0,1)", duration: "150ms", use: "Toggles, checkboxes", color: "#00cc6a" },
  { name: "Slow Out", curve: "cubic-bezier(0.1,0.9,0.2,1)", duration: "500ms", use: "Page entrances, reveals", color: "#ffb900" },
];

const doRules = [
  "Use bg-white/70 backdrop-blur-xl for all acrylic surfaces",
  "Apply hover:border-white/60 Reveal highlight on interactive cards",
  "Use bg-[#0078d4] for all primary action buttons",
  "Maintain rounded-lg (8px) on cards, panels, and buttons consistently",
  "Add shadow-lg with low opacity to communicate depth hierarchy",
  "Apply focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 on all focusable elements",
  "Use transition-all duration-200 ease-out for all Fluent motion",
  "Show Reveal highlight border on hover via group + group-hover classes",
  "Maintain WCAG AA contrast — 4.5:1 for text, 3:1 for UI elements",
];

const dontRules = [
  "No harsh flat design — every surface needs depth or material cues",
  "No dark-only showcase — Fluent supports both, default to light",
  "No playful animations — Fluent motion is purposeful and functional",
  "No rounded-full on rectangular panels — only for icon buttons and avatars",
  "No heavy drop shadows with colored tints — keep shadows neutral gray",
  "No removing focus rings — keyboard users rely on visible focus indicators",
  "No duration-500+ for micro-interactions — keep transitions under 300ms",
  "No neon or highly saturated custom colors outside the Fluent palette",
  "No layout-shifting animations — motion should not displace static content",
];

/* ------------------------------------------------------------------ */
/*  Inline icon component                                              */
/* ------------------------------------------------------------------ */

function Icon({ d, className = "w-5 h-5" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

const ICONS = {
  home: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  settings:
    "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z",
  bell: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0",
  search: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
  chevronRight: "m8.25 4.5 7.5 7.5-7.5 7.5",
  chevronLeft: "M15.75 19.5 8.25 12l7.5-7.5",
  check: "m4.5 12.75 6 6 9-13.5",
  x: "M6 18 18 6M6 6l12 12",
  plus: "M12 4.5v15m7.5-7.5h-15",
  share:
    "M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z",
  sun: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
  layers:
    "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  sparkles:
    "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
  scale:
    "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15",
};

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<"Buttons" | "Cards" | "Inputs">("Buttons");
  const [activePrinciple, setActivePrinciple] = useState("light");
  const [activeNavItem, setActiveNavItem] = useState("home");
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const currentPrinciple = fluentPrinciples.find((p) => p.id === activePrinciple) ?? fluentPrinciples[0];

  function toggleItem(index: number) {
    setToggleStates((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  return (
    <div
      className="min-h-screen bg-[#f3f2f1] text-[#201f1e]"
      style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif" }}
    >

      {/* ============================================================ */}
      {/* 1. Fixed Navigation — Acrylic command bar                    */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#d2d0ce] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-12">

            {/* Brand mark */}
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 grid grid-cols-2 gap-0.5 shrink-0">
                <div className="bg-[#0078d4] rounded-[1px]" />
                <div className="bg-[#0078d4] rounded-[1px] opacity-75" />
                <div className="bg-[#0078d4] rounded-[1px] opacity-75" />
                <div className="bg-[#0078d4] rounded-[1px] opacity-50" />
              </div>
              <span className="font-semibold text-sm text-[#201f1e] tracking-tight">Fluent Design</span>
            </div>

            {/* Center nav items */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: "home", label: "Home", icon: "home" },
                { id: "settings", label: "Settings", icon: "settings" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNavItem(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 ${
                    activeNavItem === item.id
                      ? "bg-[#0078d4]/10 text-[#0078d4] font-medium"
                      : "text-[#605e5c] hover:bg-[#f3f2f1] hover:text-[#201f1e]"
                  }`}
                >
                  <Icon d={ICONS[item.icon as keyof typeof ICONS]} className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search box */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#f3f2f1] border border-[#d2d0ce] rounded-lg">
                <Icon d={ICONS.search} className="w-3.5 h-3.5 text-[#605e5c]" />
                <span className="text-xs text-[#a19f9d]">Search...</span>
              </div>
              {/* Notification bell */}
              <button
                type="button"
                className="relative p-1.5 text-[#605e5c] hover:bg-[#f3f2f1] rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2"
              >
                <Icon d={ICONS.bell} className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#0078d4] rounded-full border-2 border-white" />
              </button>
              {/* StyleKit link */}
              <Link
                href="/styles"
                className="flex items-center gap-1 text-sm text-[#0078d4] hover:text-[#106ebe] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 rounded"
              >
                StyleKit
                <Icon d={ICONS.chevronRight} className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
        {/* Reveal accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#0078d4]/30 to-transparent" />
      </header>

      {/* ============================================================ */}
      {/* 2. Hero Section                                              */}
      {/* ============================================================ */}
      <section className="relative pt-28 md:pt-40 pb-24 px-6 md:px-10 overflow-hidden">
        {/* Subtle light gradient bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 70% 15%, rgba(0,120,212,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 85%, rgba(16,110,190,0.04) 0%, transparent 55%)",
          }}
        />

        {/* Floating acrylic card — depth layer 1 */}
        <div
          className="absolute top-24 right-4 md:right-20 w-64 h-52 rounded-lg bg-white/60 backdrop-blur-xl border border-white/60 shadow-lg pointer-events-none hidden md:block"
          style={{ transform: "rotate(3deg) translateY(8px)" }}
        >
          <div className="p-5">
            <div className="w-8 h-1.5 bg-[#0078d4]/30 rounded mb-3" />
            <div className="space-y-2 mb-5">
              <div className="w-full h-1 bg-[#d2d0ce]/60 rounded" />
              <div className="w-4/5 h-1 bg-[#d2d0ce]/40 rounded" />
              <div className="w-3/5 h-1 bg-[#d2d0ce]/30 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="w-20 h-7 bg-[#0078d4]/20 rounded-lg" />
              <div className="w-16 h-7 bg-[#d2d0ce]/40 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Floating acrylic card — depth layer 2 (further back) */}
        <div
          className="absolute top-44 right-8 md:right-40 w-48 h-36 rounded-lg bg-white/40 backdrop-blur-md border border-white/40 shadow-md pointer-events-none hidden lg:block"
          style={{ transform: "rotate(-2deg) translateY(-4px)" }}
        >
          <div className="p-4">
            <div className="w-6 h-6 bg-[#0078d4]/15 rounded-lg mb-3" />
            <div className="space-y-2">
              <div className="w-full h-1 bg-[#d2d0ce]/50 rounded" />
              <div className="w-2/3 h-1 bg-[#d2d0ce]/35 rounded" />
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div
              className="flex items-center gap-2 mb-7"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="w-3 h-3 grid grid-cols-2 gap-px shrink-0">
                <div className="bg-[#0078d4] rounded-[1px]" />
                <div className="bg-[#0078d4] rounded-[1px] opacity-70" />
                <div className="bg-[#0078d4] rounded-[1px] opacity-70" />
                <div className="bg-[#0078d4] rounded-[1px] opacity-40" />
              </div>
              <span className="text-xs font-medium text-[#0078d4] tracking-widest uppercase">
                Microsoft Fluent Design System
              </span>
            </div>

            {/* Main title */}
            <h1
              className="text-5xl md:text-7xl font-light text-[#201f1e] leading-tight mb-2"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.08s",
              }}
            >
              流利设计
            </h1>
            <h2
              className="text-5xl md:text-7xl font-semibold text-[#0078d4] leading-tight mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.16s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.16s",
              }}
            >
              Fluent Design.
            </h2>

            {/* Subtitle */}
            <p
              className="text-base text-[#605e5c] leading-relaxed max-w-lg mb-10"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.26s",
              }}
            >
              Cross-device consistency through Light, Depth, Motion, Material, and Scale. Acrylic surfaces, Reveal highlight borders, and purposeful Fluent motion curves — at your fingertips.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap gap-3"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.38s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.38s",
              }}
            >
              <div className="group relative">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#0078d4] text-white text-sm font-medium rounded-lg hover:bg-[#106ebe] active:bg-[#005a9e] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 border border-transparent group-hover:border-white/20 shadow-lg shadow-[#0078d4]/25"
                >
                  Explore Components
                </button>
              </div>
              <button
                type="button"
                className="group px-6 py-2.5 bg-white text-[#0078d4] text-sm font-medium rounded-lg border border-[#d2d0ce] hover:border-[#0078d4]/40 hover:bg-[#f0f6fc] active:bg-[#deecf9] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2"
              >
                View Guidelines
              </button>
            </div>
          </div>

          {/* Hero acrylic panel */}
          <div
            className="mt-16 grid md:grid-cols-5 gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            {/* Primary acrylic panel */}
            <div className="md:col-span-3 group bg-white/70 backdrop-blur-xl rounded-lg border border-white/60 shadow-lg p-6 hover:border-white/80 hover:shadow-xl transition-all duration-200 ease-out">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-[#201f1e]">Acrylic Material</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e81123]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffb900]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00cc6a]" />
                </div>
              </div>
              {/* Mini command bar */}
              <div className="flex items-center gap-1 bg-[#f3f2f1]/80 rounded p-1 mb-5">
                {commandBarActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-[#605e5c] hover:bg-white hover:text-[#0078d4] hover:shadow-sm transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4]"
                  >
                    <Icon d={action.iconPath} className="w-3.5 h-3.5" />
                    {action.label}
                  </button>
                ))}
              </div>
              {/* Placeholder content lines */}
              <div className="space-y-2.5">
                <div className="h-2 bg-[#d2d0ce]/50 rounded w-full" />
                <div className="h-2 bg-[#d2d0ce]/35 rounded w-5/6" />
                <div className="h-2 bg-[#d2d0ce]/35 rounded w-4/5" />
                <div className="h-2 bg-[#d2d0ce]/25 rounded w-2/3" />
              </div>
              <div className="mt-4 text-xs text-[#a19f9d] font-mono">
                bg-white/70 backdrop-blur-xl — Acrylic material
              </div>
            </div>

            {/* Depth layer secondary panels */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="group bg-white/60 backdrop-blur-xl rounded-lg border border-white/50 shadow-md p-5 hover:border-white/70 hover:shadow-lg transition-all duration-200 ease-out flex-1">
                <div className="w-8 h-8 rounded-lg bg-[#0078d4]/10 flex items-center justify-center mb-3">
                  <Icon d={ICONS.bell} className="w-4 h-4 text-[#0078d4]" />
                </div>
                <p className="text-xs font-semibold text-[#201f1e] mb-1">Notifications</p>
                <p className="text-xs text-[#a19f9d]">3 unread alerts</p>
                <div className="mt-3 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#0078d4]" />
                  <div className="w-2 h-2 rounded-full bg-[#0078d4]/40" />
                  <div className="w-2 h-2 rounded-full bg-[#0078d4]/20" />
                </div>
              </div>
              <div className="group bg-white/50 backdrop-blur-xl rounded-lg border border-white/40 shadow-sm p-5 hover:border-white/60 hover:shadow-md transition-all duration-200 ease-out flex-1">
                <div className="w-8 h-8 rounded-lg bg-[#00cc6a]/10 flex items-center justify-center mb-3">
                  <Icon d={ICONS.check} className="w-4 h-4 text-[#00cc6a]" />
                </div>
                <p className="text-xs font-semibold text-[#201f1e] mb-1">Build Status</p>
                <p className="text-xs text-[#00cc6a] font-medium">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. Component Demos                                           */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#201f1e] mb-3">
              Component <span className="text-[#0078d4]">Library</span>
            </h2>
            <p className="text-[#605e5c] text-sm max-w-md leading-relaxed">
              Core building blocks of the Fluent Design System. Every component uses Reveal highlight borders, Fluent motion, and proper focus indicators.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <div className="flex items-center gap-1 bg-[#f3f2f1] rounded-lg p-1 mb-10 w-fit border border-[#d2d0ce]">
            {(["Buttons", "Cards", "Inputs"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setComponentTab(tab)}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 ${
                  componentTab === tab
                    ? "bg-white text-[#201f1e] shadow-sm border border-[#d2d0ce]"
                    : "text-[#605e5c] hover:text-[#201f1e] hover:bg-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <RevealBlock>
            {/* ---- Buttons ---- */}
            {componentTab === "Buttons" && (
              <div className="space-y-6">
                {/* Primary */}
                <div className="bg-[#faf9f8] rounded-lg border border-[#d2d0ce] p-8">
                  <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-5">
                    Primary — Accent fill
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <button
                      type="button"
                      className="px-5 py-2.5 bg-[#0078d4] text-white text-sm font-medium rounded-lg hover:bg-[#106ebe] active:bg-[#005a9e] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 shadow-sm"
                    >
                      Primary
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#0078d4] text-white text-sm font-medium rounded-lg hover:bg-[#106ebe] active:bg-[#005a9e] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 shadow-sm"
                    >
                      <Icon d={ICONS.plus} className="w-4 h-4" />
                      New Item
                    </button>
                    <button
                      type="button"
                      disabled
                      className="px-5 py-2.5 bg-[#0078d4] text-white text-sm font-medium rounded-lg opacity-40 cursor-not-allowed focus:outline-none"
                    >
                      Disabled
                    </button>
                  </div>
                </div>

                {/* Secondary — Reveal border */}
                <div className="bg-[#faf9f8] rounded-lg border border-[#d2d0ce] p-8">
                  <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-5">
                    Secondary — Outline with Reveal
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="group relative">
                      <button
                        type="button"
                        className="px-5 py-2.5 bg-white text-[#201f1e] text-sm font-medium rounded-lg border border-[#d2d0ce] group-hover:border-[#0078d4]/40 hover:bg-[#f0f6fc] active:bg-[#deecf9] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2"
                      >
                        Secondary
                      </button>
                    </div>
                    <div className="group relative">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#201f1e] text-sm font-medium rounded-lg border border-[#d2d0ce] group-hover:border-[#0078d4]/40 hover:bg-[#f0f6fc] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2"
                      >
                        <Icon d={ICONS.share} className="w-4 h-4 text-[#605e5c] group-hover:text-[#0078d4] transition-colors duration-200" />
                        Share
                      </button>
                    </div>
                    <button
                      type="button"
                      className="px-5 py-2.5 bg-transparent text-[#0078d4] text-sm font-medium rounded-lg border border-[#0078d4]/30 hover:bg-[#f0f6fc] hover:border-[#0078d4]/60 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2"
                    >
                      Accent Outline
                    </button>
                  </div>
                </div>

                {/* Ghost / Subtle / Danger */}
                <div className="bg-[#faf9f8] rounded-lg border border-[#d2d0ce] p-8">
                  <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-5">
                    Subtle — Ghost &amp; Danger
                  </p>
                  <div className="flex flex-wrap gap-3 items-center">
                    <button
                      type="button"
                      className="px-5 py-2.5 bg-transparent text-[#605e5c] text-sm font-medium rounded-lg hover:bg-[#f3f2f1] hover:text-[#201f1e] active:bg-[#edebe9] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2"
                    >
                      Subtle
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-[#605e5c] text-sm font-medium rounded-lg hover:bg-[#f3f2f1] hover:text-[#201f1e] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2"
                    >
                      <Icon d={ICONS.settings} className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#e81123] text-white text-sm font-medium rounded-lg hover:bg-[#c50f1f] active:bg-[#a4262c] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#e81123] focus:ring-offset-2"
                    >
                      <Icon d={ICONS.x} className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---- Cards ---- */}
            {componentTab === "Cards" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Acrylic card */}
                  <div className="group bg-white/70 backdrop-blur-xl rounded-lg border border-white/60 shadow-lg p-6 hover:border-white/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-out cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-[#0078d4]/10 flex items-center justify-center mb-4 group-hover:bg-[#0078d4]/20 transition-colors duration-200">
                      <Icon d={ICONS.sparkles} className="w-5 h-5 text-[#0078d4]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#201f1e] mb-2">Acrylic Card</h3>
                    <p className="text-xs text-[#605e5c] leading-relaxed">
                      bg-white/70 backdrop-blur-xl. Frosted glass material connects the surface to its surrounding environment.
                    </p>
                    <div className="mt-4 text-xs text-[#a19f9d] font-mono">bg-white/70 blur-xl</div>
                  </div>

                  {/* Elevated card */}
                  <div className="group bg-white rounded-lg border border-[#d2d0ce] shadow-md p-6 hover:shadow-xl hover:-translate-y-1 hover:border-[#0078d4]/30 transition-all duration-200 ease-out cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-[#ffb900]/10 flex items-center justify-center mb-4 group-hover:bg-[#ffb900]/20 transition-colors duration-200">
                      <Icon d={ICONS.sun} className="w-5 h-5 text-[#ffb900]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#201f1e] mb-2">Elevated Card</h3>
                    <p className="text-xs text-[#605e5c] leading-relaxed">
                      shadow-md base, shadow-xl on hover. Lift reinforces depth hierarchy within the surface layer.
                    </p>
                    <div className="mt-4 text-xs text-[#a19f9d] font-mono">shadow-md to shadow-xl</div>
                  </div>

                  {/* Subtle card */}
                  <div className="group bg-[#faf9f8] rounded-lg border border-[#edebe9] p-6 hover:bg-white hover:border-[#0078d4]/20 hover:shadow-md transition-all duration-200 ease-out cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-[#00cc6a]/10 flex items-center justify-center mb-4 group-hover:bg-[#00cc6a]/20 transition-colors duration-200">
                      <Icon d={ICONS.check} className="w-5 h-5 text-[#00cc6a]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#201f1e] mb-2">Subtle Card</h3>
                    <p className="text-xs text-[#605e5c] leading-relaxed">
                      Off-white base with minimal border. Lifts to white with accent border on hover — a soft Reveal.
                    </p>
                    <div className="mt-4 text-xs text-[#a19f9d] font-mono">bg-[#faf9f8] to bg-white</div>
                  </div>
                </div>

                {/* Notification list card */}
                <div className="bg-white rounded-lg border border-[#d2d0ce] divide-y divide-[#edebe9] shadow-sm overflow-hidden">
                  <div className="px-5 py-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#201f1e]">Notification Cards</span>
                    <button
                      type="button"
                      className="text-xs text-[#0078d4] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0078d4] rounded"
                    >
                      Mark all read
                    </button>
                  </div>
                  {notificationItems.map((item) => (
                    <div
                      key={item.title}
                      className="group flex items-start gap-4 px-5 py-4 hover:bg-[#f0f6fc] transition-all duration-200 ease-out cursor-pointer"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                          item.type === "success"
                            ? "bg-[#00cc6a]"
                            : item.type === "warning"
                            ? "bg-[#ffb900]"
                            : "bg-[#0078d4]"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#201f1e] group-hover:text-[#0078d4] transition-colors duration-200">
                          {item.title}
                        </p>
                        <p className="text-xs text-[#605e5c] mt-0.5">{item.body}</p>
                      </div>
                      <span className="text-xs text-[#a19f9d] shrink-0">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---- Inputs ---- */}
            {componentTab === "Inputs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Text inputs */}
                <div className="bg-[#faf9f8] rounded-lg border border-[#d2d0ce] p-8 space-y-5">
                  <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-1">
                    Text Fields
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-[#605e5c] mb-1.5">Display name</label>
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-lg text-sm text-[#201f1e] placeholder-[#a19f9d] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 focus:border-[#0078d4] hover:border-[#a19f9d] transition-all duration-200 ease-out"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#605e5c] mb-1.5">Email address</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-lg text-sm text-[#201f1e] placeholder-[#a19f9d] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 focus:border-[#0078d4] hover:border-[#a19f9d] transition-all duration-200 ease-out"
                    />
                    <p className="mt-1.5 text-xs text-[#a19f9d]">We will never share your email</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#605e5c] mb-1.5">
                      Password <span className="text-[#e81123] font-bold">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 bg-white border border-[#e81123] rounded-lg text-sm text-[#201f1e] placeholder-[#a19f9d] focus:outline-none focus:ring-2 focus:ring-[#e81123] focus:ring-offset-2 transition-all duration-200 ease-out"
                    />
                    <p className="mt-1.5 text-xs text-[#e81123]">Password must be at least 8 characters</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#a19f9d] mb-1.5">Disabled field</label>
                    <input
                      type="text"
                      placeholder="Not available"
                      disabled
                      className="w-full px-3 py-2 bg-[#f3f2f1] border border-[#d2d0ce] rounded-lg text-sm text-[#a19f9d] cursor-not-allowed opacity-60"
                    />
                  </div>
                </div>

                {/* Search, select, toggles */}
                <div className="bg-[#faf9f8] rounded-lg border border-[#d2d0ce] p-8 space-y-5">
                  <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-1">
                    Search &amp; Controls
                  </p>
                  {/* Search */}
                  <div>
                    <label className="block text-xs font-semibold text-[#605e5c] mb-1.5">Search</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a19f9d]">
                        <Icon d={ICONS.search} className="w-4 h-4" />
                      </div>
                      <input
                        type="search"
                        placeholder="Search components..."
                        className="w-full pl-9 pr-4 py-2 bg-white border border-[#d2d0ce] rounded-lg text-sm text-[#201f1e] placeholder-[#a19f9d] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 focus:border-[#0078d4] hover:border-[#a19f9d] transition-all duration-200 ease-out"
                      />
                    </div>
                  </div>
                  {/* Select */}
                  <div>
                    <label className="block text-xs font-semibold text-[#605e5c] mb-1.5">Theme</label>
                    <select
                      className="w-full px-3 py-2 bg-white border border-[#d2d0ce] rounded-lg text-sm text-[#201f1e] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 focus:border-[#0078d4] hover:border-[#a19f9d] transition-all duration-200 ease-out"
                      defaultValue="system"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System (Default)</option>
                      <option value="high-contrast">High Contrast</option>
                    </select>
                  </div>
                  {/* Toggles */}
                  <div>
                    <p className="text-xs font-semibold text-[#605e5c] mb-3">Preferences</p>
                    <div className="space-y-3">
                      {["Dark mode", "Notifications", "Auto-save"].map((label, i) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-sm text-[#605e5c]">{label}</span>
                          <button
                            type="button"
                            onClick={() => toggleItem(i)}
                            className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 ${
                              toggleStates[i] ? "bg-[#0078d4]" : "bg-[#d2d0ce]"
                            }`}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                                toggleStates[i] ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. Color Palette                                             */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-[#f3f2f1]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#201f1e] mb-3">
              Color <span className="text-[#0078d4]">Palette</span>
            </h2>
            <p className="text-[#605e5c] text-sm max-w-md leading-relaxed">
              A five-token semantic system built around Microsoft blue. Each color carries specific meaning — from trust and primary action to success and danger.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fluentColors.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.06}>
                <div className="group rounded-lg overflow-hidden border border-[#d2d0ce] bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer">
                  <div
                    className="h-28 flex items-end p-4"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-xs font-mono font-medium tracking-wide"
                      style={{ color: color.lightText ? "#201f1e" : "#ffffff", opacity: 0.9 }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-[#201f1e] mb-1">{color.name}</p>
                    <p className="text-xs text-[#a19f9d] leading-snug">{color.role}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Neutral ramp */}
          <RevealBlock delay={0.32} className="mt-8">
            <div className="bg-white rounded-lg border border-[#d2d0ce] p-6">
              <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-4">
                Neutral Ramp — Fluent Gray Scale
              </p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { hex: "#201f1e", label: "Gray 190" },
                  { hex: "#292827", label: "Gray 180" },
                  { hex: "#3b3a39", label: "Gray 160" },
                  { hex: "#484644", label: "Gray 150" },
                  { hex: "#605e5c", label: "Gray 130" },
                  { hex: "#797775", label: "Gray 120" },
                  { hex: "#a19f9d", label: "Gray 90" },
                  { hex: "#c8c6c4", label: "Gray 60" },
                  { hex: "#d2d0ce", label: "Gray 50" },
                  { hex: "#e1dfdd", label: "Gray 30" },
                  { hex: "#edebe9", label: "Gray 20" },
                  { hex: "#f3f2f1", label: "Gray 10" },
                  { hex: "#faf9f8", label: "Gray 5" },
                  { hex: "#ffffff", label: "White" },
                ].map((n) => (
                  <div key={n.hex} className="flex flex-col items-center gap-1.5 group">
                    <div
                      className="w-10 h-10 rounded border border-[#d2d0ce] group-hover:scale-105 transition-transform duration-200 ease-out"
                      style={{ backgroundColor: n.hex }}
                    />
                    <span className="text-[9px] text-[#a19f9d] text-center whitespace-nowrap">{n.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Typography Scale                                          */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#201f1e] mb-3">
              Typography <span className="text-[#0078d4]">Scale</span>
            </h2>
            <p className="text-[#605e5c] text-sm max-w-md leading-relaxed">
              Segoe UI and its system font fallbacks form the foundation of all Fluent text. Carefully tuned weights and sizes for clarity at every context.
            </p>
          </RevealBlock>

          {/* Font stack */}
          <RevealBlock className="mb-8">
            <div className="bg-[#f0f6fc] border border-[#0078d4]/20 rounded-lg p-5">
              <p className="text-xs font-semibold text-[#605e5c] uppercase tracking-wider mb-2">Font Stack</p>
              <code className="text-sm text-[#0078d4] font-mono break-all">
                &apos;Segoe UI&apos;, system-ui, -apple-system, BlinkMacSystemFont, &apos;Helvetica Neue&apos;, Arial, sans-serif
              </code>
            </div>
          </RevealBlock>

          <div className="space-y-1">
            {typographyScale.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.04}>
                <div className="group flex items-baseline gap-6 px-6 py-5 rounded-lg hover:bg-[#f0f6fc] transition-all duration-200 ease-out border border-transparent hover:border-[#0078d4]/10">
                  <div className="w-24 shrink-0">
                    <span className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`${item.size} ${item.weight} text-[#201f1e] leading-tight`}>
                      {item.sample}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-3 shrink-0">
                    <code className="text-xs font-mono text-[#605e5c] bg-[#f3f2f1] px-2 py-0.5 rounded group-hover:bg-white transition-colors duration-200">
                      {item.size}
                    </code>
                    <code className="text-xs font-mono text-[#605e5c] bg-[#f3f2f1] px-2 py-0.5 rounded group-hover:bg-white transition-colors duration-200">
                      {item.weight}
                    </code>
                    <span className="text-xs text-[#a19f9d]">{item.desc}</span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. Fluent Principles                                         */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-[#f3f2f1]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#201f1e] mb-3">
              Fluent <span className="text-[#0078d4]">Principles</span>
            </h2>
            <p className="text-[#605e5c] text-sm max-w-md leading-relaxed">
              Five pillars underpin every design decision in the Fluent Design System. Select a principle to explore its role in depth.
            </p>
          </RevealBlock>

          {/* Principle selector */}
          <RevealBlock className="mb-8">
            <div className="flex flex-wrap gap-2">
              {fluentPrinciples.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePrinciple(p.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 ${
                    activePrinciple === p.id
                      ? "bg-white text-[#201f1e] shadow-md border border-[#d2d0ce]"
                      : "bg-white/60 text-[#605e5c] border border-[#d2d0ce]/60 hover:bg-white hover:text-[#201f1e] hover:shadow-sm"
                  }`}
                >
                  <span style={{ color: activePrinciple === p.id ? p.accent : undefined }}>
                    {p.icon}
                  </span>
                  {p.title}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock>
            <div className="grid md:grid-cols-5 gap-6">
              {/* Active principle detail */}
              <div className="md:col-span-3 bg-white/70 backdrop-blur-xl rounded-lg border border-white/60 shadow-lg p-8 hover:shadow-xl transition-all duration-200 ease-out">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-200"
                  style={{
                    backgroundColor: `${currentPrinciple.accent}18`,
                    color: currentPrinciple.accent,
                  }}
                >
                  {currentPrinciple.icon}
                </div>
                <h3 className="text-2xl font-semibold text-[#201f1e] mb-3">{currentPrinciple.title}</h3>
                <p className="text-[#605e5c] leading-relaxed mb-6">{currentPrinciple.description}</p>
                <div
                  className="flex items-start gap-3 p-4 rounded-lg"
                  style={{
                    backgroundColor: `${currentPrinciple.accent}0f`,
                    borderLeft: `3px solid ${currentPrinciple.accent}`,
                  }}
                >
                  <p className="text-sm text-[#605e5c] leading-relaxed">{currentPrinciple.detail}</p>
                </div>
              </div>

              {/* Side list */}
              <div className="md:col-span-2 space-y-2.5">
                {fluentPrinciples.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePrinciple(p.id)}
                    className={`w-full group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ease-out text-left focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2 ${
                      activePrinciple === p.id
                        ? "bg-white border-[#d2d0ce] shadow-md"
                        : "bg-white/60 border-[#d2d0ce]/50 hover:bg-white hover:border-[#d2d0ce] hover:shadow-sm"
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                      style={{
                        backgroundColor: activePrinciple === p.id ? `${p.accent}18` : "#f3f2f1",
                        color: activePrinciple === p.id ? p.accent : "#a19f9d",
                      }}
                    >
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-semibold transition-colors duration-200 ${
                          activePrinciple === p.id ? "text-[#201f1e]" : "text-[#605e5c]"
                        }`}
                      >
                        {p.title}
                      </p>
                      <p className="text-xs text-[#a19f9d] mt-0.5 truncate">
                        {p.description.slice(0, 50)}...
                      </p>
                    </div>
                    <Icon
                      d={ICONS.chevronRight}
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        activePrinciple === p.id
                          ? "text-[#0078d4]"
                          : "text-[#d2d0ce] group-hover:text-[#a19f9d]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Principles summary grid */}
          <RevealBlock delay={0.1} className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {fluentPrinciples.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePrinciple(p.id)}
                  className="group bg-white rounded-lg border border-[#d2d0ce] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out text-center focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: `${p.accent}12`, color: p.accent }}
                  >
                    {p.icon}
                  </div>
                  <p className="text-sm font-semibold text-[#201f1e]">{p.title}</p>
                </button>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. Acrylic Material & Motion Tokens                          */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#201f1e] mb-3">
              Material &amp; <span className="text-[#0078d4]">Motion</span>
            </h2>
            <p className="text-[#605e5c] text-sm max-w-md leading-relaxed">
              Acrylic connects surfaces to their environment through translucency and blur. Motion uses precise easing curves to guide attention without distraction.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Acrylic depth demo */}
            <RevealBlock>
              <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-4">
                Depth Layer Comparison
              </p>
              <div className="relative">
                {/* Background */}
                <div className="rounded-lg bg-gradient-to-br from-[#0078d4] to-[#106ebe] p-8 h-56 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/50 text-sm mb-3">Background content</p>
                    <div className="flex gap-2 justify-center">
                      {["#0078d4", "#ffb900", "#00cc6a"].map((c) => (
                        <div key={c} className="w-8 h-8 rounded-lg" style={{ backgroundColor: c, opacity: 0.7 }} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Acrylic 70% */}
                <div className="absolute top-4 left-4 right-20 bg-white/70 backdrop-blur-xl rounded-lg border border-white/60 shadow-lg p-4">
                  <p className="text-xs font-semibold text-[#201f1e] mb-1">Acrylic 70%</p>
                  <p className="text-xs text-[#605e5c]">bg-white/70 backdrop-blur-xl</p>
                </div>
                {/* Acrylic 40% */}
                <div className="absolute bottom-4 left-16 right-4 bg-white/40 backdrop-blur-md rounded-lg border border-white/40 shadow-md p-4">
                  <p className="text-xs font-semibold text-[#201f1e] mb-1">Acrylic 40%</p>
                  <p className="text-xs text-[#605e5c]">bg-white/40 backdrop-blur-md</p>
                </div>
              </div>
            </RevealBlock>

            {/* Reveal highlight demo */}
            <RevealBlock delay={0.1}>
              <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-4">
                Reveal Highlight — Hover these cards
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: "Primary Reveal",
                    desc: "Border glows on hover — simulates a light source",
                    hoverBorder: "group-hover:border-[#0078d4]/60",
                  },
                  {
                    label: "Subtle Reveal",
                    desc: "Softer reveal for secondary surfaces",
                    hoverBorder: "group-hover:border-[#d2d0ce]",
                  },
                  {
                    label: "Accent Reveal",
                    desc: "Gold accent — highlights and notifications",
                    hoverBorder: "group-hover:border-[#ffb900]/50",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`group flex items-center gap-4 p-4 bg-[#faf9f8] rounded-lg border border-[#edebe9] ${item.hoverBorder} hover:bg-white hover:shadow-md transition-all duration-200 ease-out cursor-pointer`}
                  >
                    <div className="w-2 h-10 rounded-full bg-[#0078d4]/20 group-hover:bg-[#0078d4]/60 transition-colors duration-200" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#201f1e]">{item.label}</p>
                      <p className="text-xs text-[#a19f9d] mt-0.5">{item.desc}</p>
                    </div>
                    <Icon
                      d={ICONS.chevronRight}
                      className="w-4 h-4 text-[#d2d0ce] group-hover:text-[#0078d4] group-hover:translate-x-0.5 transition-all duration-200"
                    />
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>

          {/* Motion tokens */}
          <RevealBlock delay={0.15} className="mt-10">
            <div className="bg-[#faf9f8] rounded-lg border border-[#d2d0ce] p-6">
              <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-5">
                Fluent Motion Tokens
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {motionTokens.map((token) => (
                  <div
                    key={token.name}
                    className="group p-4 bg-white rounded-lg border border-[#d2d0ce] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-out"
                  >
                    <div
                      className="w-6 h-1 rounded-full mb-3 transition-all duration-300 group-hover:w-full"
                      style={{ backgroundColor: token.color }}
                    />
                    <p className="text-sm font-semibold text-[#201f1e] mb-1">{token.name}</p>
                    <code className="text-[10px] font-mono text-[#605e5c] block mb-2 break-all leading-snug">
                      {token.curve}
                    </code>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-medium" style={{ color: token.color }}>
                        {token.duration}
                      </span>
                      <span className="text-xs text-[#a19f9d]">{token.use}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Design Guidelines — Do / Don&apos;t                              */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-[#f3f2f1]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#201f1e] mb-3">
              Design <span className="text-[#0078d4]">Guidelines</span>
            </h2>
            <p className="text-[#605e5c] text-sm max-w-md leading-relaxed">
              Rules distilled from Microsoft&apos;s Fluent Design specification. Applied consistently, they create professional, trustworthy experiences across every platform.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Do */}
            <RevealBlock>
              <div className="bg-white rounded-lg border border-[#d2d0ce] p-8 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full bg-[#00cc6a]/15 flex items-center justify-center shrink-0">
                    <Icon d={ICONS.check} className="w-4 h-4 text-[#00cc6a]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#201f1e]">Do</h3>
                </div>
                <ul className="space-y-3">
                  {doRules.map((rule) => (
                    <li key={rule} className="text-sm text-[#605e5c] flex items-start gap-2.5">
                      <span className="text-[#00cc6a] mt-0.5 font-bold shrink-0">+</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.1}>
              <div className="bg-white rounded-lg border border-[#d2d0ce] p-8 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full bg-[#e81123]/10 flex items-center justify-center shrink-0">
                    <Icon d={ICONS.x} className="w-4 h-4 text-[#e81123]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#201f1e]">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {dontRules.map((rule) => (
                    <li key={rule} className="text-sm text-[#605e5c] flex items-start gap-2.5">
                      <span className="text-[#e81123] mt-0.5 font-bold shrink-0">-</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Token reference card */}
          <RevealBlock delay={0.15} className="mt-6">
            <div className="bg-white rounded-lg border border-[#d2d0ce] p-6 shadow-sm">
              <p className="text-xs font-semibold text-[#a19f9d] uppercase tracking-wider mb-5">
                Core Token Reference
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    category: "Border Radius",
                    tokens: [
                      { label: "sm — controls", value: "rounded (4px)" },
                      { label: "md — cards", value: "rounded-lg (8px)" },
                      { label: "lg — dialogs", value: "rounded-xl (12px)" },
                      { label: "full — avatar", value: "rounded-full" },
                    ],
                  },
                  {
                    category: "Shadow Scale",
                    tokens: [
                      { label: "Resting", value: "shadow-sm" },
                      { label: "Raised", value: "shadow-md" },
                      { label: "Floating", value: "shadow-lg" },
                      { label: "Dialog", value: "shadow-xl" },
                    ],
                  },
                  {
                    category: "Spacing",
                    tokens: [
                      { label: "Component gap", value: "gap-4 (16px)" },
                      { label: "Section gap", value: "gap-8 (32px)" },
                      { label: "Card padding", value: "p-6 (24px)" },
                      { label: "Input padding", value: "px-3 py-2" },
                    ],
                  },
                ].map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-semibold text-[#605e5c] mb-3">{group.category}</p>
                    <div className="space-y-2">
                      {group.tokens.map((token) => (
                        <div key={token.label} className="flex items-center justify-between">
                          <span className="text-xs text-[#a19f9d]">{token.label}</span>
                          <code className="text-xs font-mono bg-[#f3f2f1] text-[#0078d4] px-2 py-0.5 rounded">
                            {token.value}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. Footer                                                    */}
      {/* ============================================================ */}
      <footer className="bg-white border-t border-[#d2d0ce]">
        <div className="h-px bg-gradient-to-r from-transparent via-[#0078d4]/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-6 h-6 grid grid-cols-2 gap-0.5 shrink-0">
                  <div className="bg-[#0078d4] rounded-[1px]" />
                  <div className="bg-[#0078d4] rounded-[1px] opacity-75" />
                  <div className="bg-[#0078d4] rounded-[1px] opacity-75" />
                  <div className="bg-[#0078d4] rounded-[1px] opacity-50" />
                </div>
                <span className="text-sm font-semibold text-[#201f1e]">Fluent Design</span>
              </div>
              <p className="text-xs text-[#a19f9d] leading-relaxed max-w-xs">
                Part of StyleKit — a curated collection of design system showcases. Inspired by Microsoft&apos;s Fluent Design System.
              </p>
            </div>

            {/* Color chips */}
            <div className="flex items-center gap-2">
              {fluentColors.map((c) => (
                <div
                  key={c.hex}
                  className="w-5 h-5 rounded border border-[#d2d0ce] hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Links */}
            <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/styles/fluent-design"
                className="text-sm text-[#0078d4] font-medium hover:text-[#106ebe] hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0078d4] rounded"
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="text-sm text-[#605e5c] hover:text-[#201f1e] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0078d4] rounded"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="text-sm text-[#605e5c] hover:text-[#201f1e] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0078d4] rounded"
              >
                Home
              </Link>
            </nav>
          </div>

          <div className="mt-10 pt-6 border-t border-[#edebe9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-[#a19f9d]">
              Fluent Design System — Light · Depth · Motion · Material · Scale
            </p>
            <div className="flex items-center gap-2">
              {["Light", "Depth", "Motion", "Material", "Scale"].map((p, i) => (
                <span key={p} className="text-xs text-[#c8c6c4]">
                  {i > 0 && <span className="mr-2 text-[#edebe9]">·</span>}
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
