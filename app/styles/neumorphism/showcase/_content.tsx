"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                        */
/* ------------------------------------------------------------------ */

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
      { threshold: 0.15, ...options },
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
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = ["Design", "Components", "Colors", "Cards", "Rules"] as const;
type NavItem = (typeof NAV_ITEMS)[number];

const ACCENT_COLORS = [
  {
    name: "Violet",
    hex: "#6d5dfc",
    textClass: "text-[#6d5dfc]",
    borderClass: "border-[#6d5dfc]",
    desc: "Primary interaction color. Buttons, active states, focus rings.",
  },
  {
    name: "Coral",
    hex: "#ff6b6b",
    textClass: "text-[#ff6b6b]",
    borderClass: "border-[#ff6b6b]",
    desc: "Alerts, danger states, destructive actions.",
  },
  {
    name: "Teal",
    hex: "#4ecdc4",
    textClass: "text-[#4ecdc4]",
    borderClass: "border-[#4ecdc4]",
    desc: "Success, confirmations, positive feedback.",
  },
  {
    name: "Amber",
    hex: "#ffe66d",
    textClass: "text-[#ffe66d]",
    borderClass: "border-[#ffe66d]",
    desc: "Warnings, pending states, highlights.",
  },
];

const DO_RULES = [
  "Use bg-[#e0e5ec] on ALL elements — same hue as background",
  "Double shadow: dark bottom-right + bright top-left on every convex element",
  "Inset shadows for concave (pressed/active) elements",
  "rounded-xl minimum — neumorphism never has sharp corners",
  "Reduce shadow on hover — hand casts shadow, element dims",
  "Use accent only for text or border-l-4 stripe, not background fill",
  "duration-300 ease-in-out on all shadow transitions",
  "Convex for clickable, concave for activated / content areas",
];

const DONT_RULES = [
  "Never translate/lift elements on active — they grow from background",
  "Never use pure white or black backgrounds — only #e0e5ec gray",
  "Never use gradient backgrounds — kills the monochromatic illusion",
  "Never use drop-shadow filter — use box-shadow only",
  "Never use border (except accent border-l-4) — shadows do the work",
  "Never use a single shadow — always the dual light+dark pair",
  "Never place elements on a contrasting background color",
  "Never use saturated filled backgrounds on buttons or cards",
];

/* ------------------------------------------------------------------ */
/*  Small reusable atoms                                                */
/* ------------------------------------------------------------------ */

/** Convex extruded element base styles */
const NEU_CONVEX =
  "bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]";

/** Concave pressed-in element base styles */
const NEU_CONCAVE =
  "bg-[#e0e5ec] shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]";

function SectionTitle({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-3">
      {children}
      {accent && <span className="text-[#6d5dfc]"> {accent}</span>}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Component Showcase sub-widgets                         */
/* ------------------------------------------------------------------ */

function NeuButtonDemo() {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`px-8 py-3 rounded-xl text-[#6d5dfc] font-semibold text-sm duration-300 ease-in-out select-none ${
        pressed
          ? "shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] bg-[#e0e5ec]"
          : "shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] bg-[#e0e5ec] hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]"
      }`}
    >
      {pressed ? "Pressed" : "Click Me"}
    </button>
  );
}

function NeuToggleDemo({
  label,
  defaultOn = false,
}: {
  label: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className="relative w-14 h-7 rounded-full duration-300 ease-in-out flex-shrink-0 shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] bg-[#e0e5ec]"
      >
        <span
          className={`absolute top-1 w-5 h-5 rounded-full bg-[#e0e5ec] duration-300 ease-in-out ${
            on
              ? "left-8 shadow-[3px_3px_6px_#b8bcc2,-3px_-3px_6px_#ffffff]"
              : "left-1 shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff]"
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${on ? "text-[#6d5dfc]" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  );
}

function NeuProgressDemo({
  value,
  color = "#6d5dfc",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="w-full h-4 rounded-full shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] bg-[#e0e5ec] overflow-hidden">
      <div
        className="h-full rounded-full shadow-[4px_0_8px_rgba(0,0,0,0.08)] duration-500 ease-in-out"
        style={{ width: `${value}%`, backgroundColor: color, opacity: 0.85 }}
      />
    </div>
  );
}

function NeuKnob({ label }: { label: string }) {
  const [rotation, setRotation] = useState(135);
  const knobRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = lastY.current - e.clientY;
      lastY.current = e.clientY;
      setRotation((r) => Math.max(-135, Math.min(135, r + delta * 2)));
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={knobRef}
        onMouseDown={(e) => { dragging.current = true; lastY.current = e.clientY; }}
        className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] cursor-ns-resize flex items-center justify-center duration-150 ease-in-out hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] select-none"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="w-2 h-2 rounded-full bg-[#6d5dfc] opacity-80 mb-4" />
      </div>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
}

function NeuInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] text-gray-600 placeholder-gray-400 text-sm outline-none focus:shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff] duration-300 ease-in-out"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Light Source Demo                                       */
/* ------------------------------------------------------------------ */

function LightSourceDemo({ activeTab }: { activeTab: number }) {
  const states = [
    {
      label: "Convex",
      desc: "Raised / Clickable",
      shadow: "shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]",
      formula: "8px 8px 16px #b8bcc2,\n-8px -8px 16px #ffffff",
    },
    {
      label: "Flat",
      desc: "No depth / Neutral",
      shadow: "shadow-none",
      formula: "none",
    },
    {
      label: "Concave",
      desc: "Pressed / Activated",
      shadow: "shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]",
      formula: "inset 8px 8px 16px #b8bcc2,\ninset -8px -8px 16px #ffffff",
    },
  ];

  const current = states[activeTab];

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-4">
        {states.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <div
              className={`w-20 h-20 rounded-xl bg-[#e0e5ec] ${s.shadow} duration-500 ease-in-out ${
                i === activeTab ? "ring-2 ring-[#6d5dfc] ring-offset-2 ring-offset-[#e0e5ec]" : ""
              }`}
            />
            <span className={`text-xs font-semibold ${i === activeTab ? "text-[#6d5dfc]" : "text-gray-400"}`}>
              {s.label}
            </span>
            <span className="text-[10px] text-gray-400">{s.desc}</span>
          </div>
        ))}
      </div>

      {/* Light direction diagram */}
      <div className={`relative w-40 h-40 rounded-2xl bg-[#e0e5ec] ${current.shadow} duration-500 ease-in-out flex items-center justify-center`}>
        {/* Light source indicator */}
        <div className="absolute -top-6 -left-6 w-8 h-8 rounded-full bg-[#ffe66d] opacity-80 shadow-[0_0_16px_#ffe66d]" />
        <svg className="absolute -top-3 -left-3 w-6 h-6 text-[#ffe66d]" fill="none" viewBox="0 0 24 24">
          <path d="M12 4 L18 18 L12 15 L6 18 Z" fill="currentColor" opacity="0.7" />
        </svg>
        <span className="text-xs text-gray-400 font-mono text-center px-3 leading-relaxed">
          {current.desc}
        </span>
      </div>

      {/* Shadow formula display */}
      <div className={`w-full max-w-sm rounded-xl bg-[#e0e5ec] ${NEU_CONCAVE} p-4`}>
        <p className="text-[10px] text-gray-400 mb-1 font-semibold uppercase tracking-wider">box-shadow</p>
        <pre className="text-xs text-[#6d5dfc] font-mono leading-relaxed whitespace-pre-wrap">
          {current.formula}
        </pre>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Color System                                            */
/* ------------------------------------------------------------------ */

function ColorSwatchCard({
  name,
  hex,
  textClass,
  borderClass,
  desc,
}: {
  name: string;
  hex: string;
  textClass: string;
  borderClass: string;
  desc: string;
}) {
  return (
    <div
      className={`rounded-xl bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] border-l-4 ${borderClass} p-5 hover:shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] duration-300 ease-in-out`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-8 h-8 rounded-full shadow-[3px_3px_6px_#b8bcc2,-3px_-3px_6px_#ffffff]"
          style={{ backgroundColor: hex }}
        />
        <div>
          <p className={`font-bold text-sm ${textClass}`}>{name}</p>
          <p className="text-[10px] text-gray-400 font-mono">{hex}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Card Examples                                           */
/* ------------------------------------------------------------------ */

function ProfileCard() {
  return (
    <div className={`rounded-2xl ${NEU_CONVEX} p-6 flex flex-col items-center gap-4`}>
      {/* Convex avatar circle */}
      <div className="w-20 h-20 rounded-full bg-[#e0e5ec] shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] flex items-center justify-center">
        <span className="text-2xl font-bold text-[#6d5dfc]">A</span>
      </div>
      <div className="text-center">
        <p className="font-bold text-gray-600 text-base">Alex Chen</p>
        <p className="text-xs text-gray-400 mt-0.5">UI Designer</p>
      </div>
      {/* Stats row — concave inset containers */}
      <div className="w-full grid grid-cols-3 gap-2 mt-2">
        {[
          { label: "Projects", val: "24" },
          { label: "Following", val: "182" },
          { label: "Followers", val: "3.2k" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#b8bcc2,inset_-3px_-3px_6px_#ffffff] p-2 text-center"
          >
            <p className="font-bold text-sm text-gray-600">{s.val}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      {/* Follow button */}
      <button
        type="button"
        className="w-full py-2.5 rounded-xl text-[#6d5dfc] font-semibold text-sm bg-[#e0e5ec] shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] hover:shadow-[3px_3px_6px_#b8bcc2,-3px_-3px_6px_#ffffff] active:shadow-[inset_3px_3px_6px_#b8bcc2,inset_-3px_-3px_6px_#ffffff] duration-300 ease-in-out"
      >
        Follow
      </button>
    </div>
  );
}

function MusicPlayerCard() {
  const [playing, setPlaying] = useState<"play" | "pause" | null>(null);
  const [songProgress, setSongProgress] = useState(38);

  return (
    <div className={`rounded-2xl ${NEU_CONVEX} p-6 flex flex-col gap-5`}>
      {/* Album art */}
      <div className="w-full aspect-square rounded-xl bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center">
        <svg className="w-12 h-12 text-[#6d5dfc] opacity-40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 14a4 4 0 110-8 4 4 0 010 8zm0-6a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      </div>

      <div>
        <p className="font-bold text-gray-600 text-sm">Soft Light</p>
        <p className="text-xs text-gray-400 mt-0.5">The Neumorphic Sessions</p>
      </div>

      {/* Progress bar — inset track, convex fill indicator */}
      <div>
        <div
          className="w-full h-2 rounded-full bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] cursor-pointer overflow-hidden"
          onClick={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            setSongProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
          }}
        >
          <div
            className="h-full rounded-full duration-150 ease-in-out"
            style={{ width: `${songProgress}%`, backgroundColor: "#6d5dfc", opacity: 0.7 }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[9px] text-gray-400">1:{String(Math.floor(songProgress * 0.22)).padStart(2, "0")}</span>
          <span className="text-[9px] text-gray-400">3:47</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] duration-300 ease-in-out flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>
        {/* Main play/pause — convex becomes concave when active */}
        <button
          type="button"
          onMouseDown={() => setPlaying("play")}
          onMouseUp={() => setPlaying(null)}
          onMouseLeave={() => setPlaying(null)}
          className={`w-14 h-14 rounded-full bg-[#e0e5ec] duration-300 ease-in-out flex items-center justify-center ${
            playing === "play"
              ? "shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]"
              : "shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] hover:shadow-[3px_3px_6px_#b8bcc2,-3px_-3px_6px_#ffffff]"
          }`}
        >
          <svg className="w-5 h-5 text-[#6d5dfc]" fill="currentColor" viewBox="0 0 24 24">
            {playing === "play" ? (
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] duration-300 ease-in-out flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zm6.5 8.14h2V6h-2v12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DashboardCard() {
  const [metric] = useState(8_241);

  return (
    <div className={`rounded-2xl ${NEU_CONVEX} p-6 flex flex-col gap-5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Monthly Revenue</p>
          {/* Concave inset value display */}
          <div className="mt-3 rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] px-4 py-3 inline-block">
            <p className="text-2xl font-bold text-[#4ecdc4]">${metric.toLocaleString()}</p>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#4ecdc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>

      {/* Mini bar chart — convex bars */}
      <div className="flex items-end gap-1.5 h-16">
        {[55, 70, 45, 80, 60, 90, 75, 85, 65, 95, 72, 88].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-[#e0e5ec] shadow-[2px_0_4px_#b8bcc2,-1px_-2px_4px_#ffffff] duration-300 ease-in-out hover:opacity-80"
            style={{ height: `${h}%`, backgroundColor: `rgba(78,205,196,${0.3 + h * 0.004})` }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">vs last month</span>
        <span className="text-xs font-bold text-[#4ecdc4] bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] px-2.5 py-1 rounded-lg">
          +12.4%
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeNav, setActiveNav] = useState<NavItem>("Design");
  const [toggleState, setToggleState] = useState(false);
  const [progressValue, setProgressValue] = useState(62);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#e0e5ec] text-gray-600 overflow-x-hidden">

      {/* ============================================================ */}
      {/* 1. FIXED NAV                                                  */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#e0e5ec] shadow-[0_4px_16px_#b8bcc2]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Extruded logo circle */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                <span className="text-xs font-black text-[#6d5dfc]">N</span>
              </div>
              <span className="font-bold text-sm text-gray-500 tracking-tight hidden sm:block">
                Neumorphism
              </span>
            </div>

            {/* Nav items — active shows concave */}
            <nav className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveNav(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium duration-300 ease-in-out ${
                    activeNav === item
                      ? "bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#b8bcc2,inset_-3px_-3px_6px_#ffffff] text-[#6d5dfc]"
                      : "text-gray-400 hover:text-gray-600 hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] bg-[#e0e5ec]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* StyleKit link */}
            <Link
              href="/styles"
              className="text-sm text-[#6d5dfc] font-semibold hover:opacity-75 transition-opacity duration-200 flex items-center gap-1"
            >
              StyleKit
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO                                                        */}
      {/* ============================================================ */}
      <section className="pt-32 md:pt-44 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          新拟物派 / Design System
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: title */}
          <div>
            <h1
              className="text-5xl md:text-7xl font-black text-gray-500 leading-[0.9] tracking-tight mb-6"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.06s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.06s",
              }}
            >
              NEUMORPHISM
            </h1>
            <p
              className="text-base text-gray-400 leading-relaxed max-w-sm mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.18s",
              }}
            >
              Elements extruded from or pressed into the background. A dual shadow system that mimics a single top-left light source — no borders, no fills, only light.
            </p>

            <div
              className="flex items-center gap-3"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.28s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.28s",
              }}
            >
              {/* Accent dots */}
              {["#6d5dfc", "#ff6b6b", "#4ecdc4", "#ffe66d"].map((c) => (
                <div
                  key={c}
                  className="w-4 h-4 rounded-full shadow-[3px_3px_6px_#b8bcc2,-3px_-3px_6px_#ffffff] bg-[#e0e5ec] flex items-center justify-center"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: extruded hero card */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            <div className="rounded-2xl bg-[#e0e5ec] shadow-[20px_20px_40px_#b8bcc2,-20px_-20px_40px_#ffffff] p-8 max-w-sm mx-auto">
              {/* Concave inner panel */}
              <div className="rounded-xl bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff] p-5 mb-6">
                <p className="text-xs text-gray-400 mb-1 font-mono">box-shadow</p>
                <p className="text-xs text-[#6d5dfc] font-mono leading-relaxed">
                  8px 8px 16px #b8bcc2,<br />
                  -8px -8px 16px #ffffff
                </p>
              </div>
              {/* Convex button sample */}
              <div className="flex gap-3">
                <div className="flex-1 h-10 rounded-xl bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                  <span className="text-xs text-[#6d5dfc] font-semibold">Convex</span>
                </div>
                <div className="flex-1 h-10 rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] flex items-center justify-center">
                  <span className="text-xs text-gray-400 font-semibold">Concave</span>
                </div>
              </div>
              {/* Subtitle */}
              <p className="mt-4 text-center text-[10px] text-gray-400 tracking-widest uppercase">
                Light source: top-left
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. LIGHT SOURCE DEMO                                           */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-10">
          <SectionTitle accent="Physics">Light Source</SectionTitle>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Every neumorphic element shares a single light source at the top-left. Dark shadow anchors bottom-right. Bright shadow lifts top-left. Invert both to press an element into the surface.
          </p>
        </RevealBlock>

        {/* State tab switcher */}
        <RevealBlock delay={0.05}>
          <div className="flex items-center gap-2 mb-10 w-fit rounded-xl bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] p-1.5">
            {["Convex", "Flat", "Concave"].map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold duration-300 ease-in-out ${
                  activeTab === i
                    ? "bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] text-[#6d5dfc]"
                    : "text-gray-400 hover:text-gray-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <div className="rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-8 md:p-12">
            <LightSourceDemo activeTab={activeTab} />
          </div>
        </RevealBlock>

        {/* Light source caption */}
        <RevealBlock delay={0.15}>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { dir: "Top-Left", color: "#ffe66d", label: "Bright shadow", val: "-8px -8px 16px #ffffff" },
              { dir: "Light Source", color: "#ffe66d", label: "Single point", val: "Always top-left" },
              { dir: "Bottom-Right", color: "#b8bcc2", label: "Dark shadow", val: "+8px +8px 16px #b8bcc2" },
            ].map((item) => (
              <div
                key={item.dir}
                className="rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#b8bcc2,inset_-3px_-3px_6px_#ffffff] p-4"
              >
                <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }} />
                <p className="text-xs font-bold text-gray-500">{item.dir}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.label}</p>
                <p className="text-[9px] font-mono text-[#6d5dfc] mt-1">{item.val}</p>
              </div>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 4. COMPONENT SHOWCASE                                          */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <SectionTitle accent="Showcase">Components</SectionTitle>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Interactive components — all shadows, no borders. Try clicking the button, dragging the knob, and toggling the switches.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Button */}
          <RevealBlock delay={0}>
            <div className="rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-6 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Button</p>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Convex at rest. Concave on press. No translate — elements grow from surface.
              </p>
              <div className="flex gap-3 flex-wrap">
                <NeuButtonDemo />
                <button
                  type="button"
                  className="px-6 py-3 rounded-xl text-gray-400 font-medium text-sm bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff] duration-300 ease-in-out cursor-default"
                >
                  Active
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* Toggle */}
          <RevealBlock delay={0.05}>
            <div className="rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-6 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Toggle Switch</p>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Outer track always concave. Thumb convex when off, remains convex but shifts position when on.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <NeuToggleDemo label="Notifications" defaultOn />
                <NeuToggleDemo label="Dark Mode" />
                <NeuToggleDemo label="Auto-save" defaultOn />
              </div>
            </div>
          </RevealBlock>

          {/* Input */}
          <RevealBlock delay={0.1}>
            <div className="rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-6 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Input Field</p>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Concave inset — the container is pressed into the surface, ready to receive content.
              </p>
              <div className="flex flex-col gap-3">
                <NeuInput placeholder="Search..." />
                <NeuInput placeholder="Email address" />
              </div>
            </div>
          </RevealBlock>

          {/* Progress */}
          <RevealBlock delay={0.05}>
            <div className="rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-6 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Progress Bar</p>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Track is concave. Filled region uses accent color at 70-85% opacity. Click buttons to adjust.
              </p>
              <div className="flex flex-col gap-4 mt-2">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] text-gray-400">Completion</span>
                    <span className="text-[10px] font-bold text-[#6d5dfc]">{progressValue}%</span>
                  </div>
                  <NeuProgressDemo value={progressValue} color="#6d5dfc" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block mb-2">Storage</span>
                  <NeuProgressDemo value={74} color="#4ecdc4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block mb-2">Warnings</span>
                  <NeuProgressDemo value={31} color="#ff6b6b" />
                </div>
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setProgressValue((v) => Math.max(0, v - 10))}
                    className="flex-1 py-2 rounded-lg text-xs font-bold text-gray-500 bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] duration-300 ease-in-out"
                  >
                    -10
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgressValue((v) => Math.min(100, v + 10))}
                    className="flex-1 py-2 rounded-lg text-xs font-bold text-[#6d5dfc] bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] active:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] duration-300 ease-in-out"
                  >
                    +10
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Knob */}
          <RevealBlock delay={0.1}>
            <div className="rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-6 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Circular Knob</p>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Fully convex dial. Drag up/down to rotate. The indicator pip is an accent dot.
              </p>
              <div className="flex items-center justify-center gap-8 mt-4">
                <NeuKnob label="Volume" />
                <NeuKnob label="Bass" />
                <NeuKnob label="Treble" />
              </div>
            </div>
          </RevealBlock>

          {/* Master toggle demo */}
          <RevealBlock delay={0.15}>
            <div className="rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-6 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Global Toggle</p>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                A larger demo toggle. State changes shadow type. The track never lifts.
              </p>
              <div className="flex flex-col items-center gap-5 mt-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={toggleState}
                  onClick={() => setToggleState((v) => !v)}
                  className="relative w-24 h-12 rounded-full bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff] duration-300 ease-in-out"
                >
                  <span
                    className={`absolute top-2 w-8 h-8 rounded-full bg-[#e0e5ec] duration-300 ease-in-out ${
                      toggleState
                        ? "left-14 shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]"
                        : "left-2 shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff]"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-[9px] font-black duration-300 ease-in-out ${toggleState ? "text-[#6d5dfc]" : "text-gray-400"}`}
                    >
                      {toggleState ? "ON" : "OFF"}
                    </span>
                  </span>
                </button>
                <p className={`text-sm font-semibold duration-300 ${toggleState ? "text-[#6d5dfc]" : "text-gray-400"}`}>
                  {toggleState ? "System Active" : "System Inactive"}
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. COLOR SYSTEM                                                */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <SectionTitle accent="System">Color</SectionTitle>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            The base is always{" "}
            <code className="text-[10px] bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] px-1.5 py-0.5 rounded text-[#6d5dfc]">
              #e0e5ec
            </code>{" "}
            — elements and background share the same hue. Accents appear only in text or as a{" "}
            <code className="text-[10px] bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] px-1.5 py-0.5 rounded text-[#6d5dfc]">
              border-l-4
            </code>{" "}
            stripe.
          </p>
        </RevealBlock>

        {/* Base surface swatches */}
        <RevealBlock delay={0.05}>
          <div className="rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-6 mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Surface Foundation</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Base", hex: "#e0e5ec", note: "All elements + background" },
                { label: "Dark Shadow", hex: "#b8bcc2", note: "Bottom-right: +X/+Y" },
                { label: "Bright Shadow", hex: "#ffffff", note: "Top-left: -X/-Y" },
                { label: "Secondary", hex: "#d1d9e6", note: "Slightly deeper surface" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#b8bcc2,inset_-3px_-3px_6px_#ffffff] p-4">
                  <div
                    className="w-full h-10 rounded-lg mb-3 shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff]"
                    style={{ backgroundColor: s.hex }}
                  />
                  <p className="text-xs font-bold text-gray-500">{s.label}</p>
                  <p className="text-[9px] font-mono text-gray-400 mt-0.5">{s.hex}</p>
                  <p className="text-[9px] text-gray-400 mt-1 leading-relaxed">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* Accent swatches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACCENT_COLORS.map((ac, i) => (
            <RevealBlock key={ac.name} delay={i * 0.06}>
              <ColorSwatchCard {...ac} />
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. CARD EXAMPLES                                               */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <SectionTitle accent="Examples">Card</SectionTitle>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Three real-world neumorphic cards. Each uses extruded outer shell with concave inner elements for metrics, controls, and data.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RevealBlock delay={0}>
            <ProfileCard />
          </RevealBlock>
          <RevealBlock delay={0.08}>
            <MusicPlayerCard />
          </RevealBlock>
          <RevealBlock delay={0.16}>
            <DashboardCard />
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. DO / DON'T RULES                                            */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto">
        <RevealBlock className="mb-12">
          <SectionTitle accent="Rules">Design</SectionTitle>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Neumorphism is unforgiving — break one rule and the illusion collapses. The DO panel is convex (clickable). The DON&apos;T panel is concave (content area).
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DO — convex panel */}
          <RevealBlock delay={0}>
            <div className="rounded-2xl bg-[#e0e5ec] shadow-[12px_12px_24px_#b8bcc2,-12px_-12px_24px_#ffffff] p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#4ecdc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-base text-gray-500">
                  Do <span className="text-[#4ecdc4]">— Convex Panel</span>
                </h3>
              </div>
              <ul className="space-y-3">
                {DO_RULES.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-gray-500">
                    <span className="text-[#4ecdc4] font-black mt-0.5 shrink-0">+</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* DON'T — concave inset panel */}
          <RevealBlock delay={0.1}>
            <div className="rounded-2xl bg-[#e0e5ec] shadow-[inset_12px_12px_24px_#b8bcc2,inset_-12px_-12px_24px_#ffffff] p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#ff6b6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-bold text-base text-gray-500">
                  Don&apos;t <span className="text-[#ff6b6b]">— Concave Panel</span>
                </h3>
              </div>
              <ul className="space-y-3">
                {DONT_RULES.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="text-[#ff6b6b] font-black mt-0.5 shrink-0">-</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>

        {/* Shadow formula cheat-sheet */}
        <RevealBlock delay={0.15}>
          <div className="mt-6 rounded-2xl bg-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff] p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Shadow Quick Reference</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { state: "Convex", formula: "8px 8px 16px #b8bcc2,\n-8px -8px 16px #ffffff", color: "text-[#6d5dfc]" },
                { state: "Convex Hover", formula: "4px 4px 8px #b8bcc2,\n-4px -4px 8px #ffffff", color: "text-[#4ecdc4]" },
                { state: "Concave Active", formula: "inset 4px 4px 8px #b8bcc2,\ninset -4px -4px 8px #ffffff", color: "text-[#ff6b6b]" },
                { state: "Deep Concave", formula: "inset 8px 8px 16px #b8bcc2,\ninset -8px -8px 16px #ffffff", color: "text-[#ffe66d]" },
              ].map((item) => (
                <div
                  key={item.state}
                  className="rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#b8bcc2,inset_-3px_-3px_6px_#ffffff] p-3"
                >
                  <p className={`text-[10px] font-bold mb-1 ${item.color}`}>{item.state}</p>
                  <pre className={`text-[9px] font-mono leading-relaxed ${item.color} whitespace-pre-wrap opacity-80`}>
                    {item.formula}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 8. FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="bg-[#e0e5ec] shadow-[0_-4px_16px_#b8bcc2]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] flex items-center justify-center">
                <span className="text-xs font-black text-[#6d5dfc]">N</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500">Neumorphism</p>
                <p className="text-[10px] text-gray-400">StyleKit &middot; 新拟物派 Design System</p>
              </div>
            </div>

            {/* Accent dots row */}
            <div className="flex items-center gap-2">
              {["#6d5dfc", "#ff6b6b", "#4ecdc4", "#ffe66d"].map((c) => (
                <div
                  key={c}
                  className="w-5 h-5 rounded-full bg-[#e0e5ec] shadow-[3px_3px_6px_#b8bcc2,-3px_-3px_6px_#ffffff] flex items-center justify-center"
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4">
              <Link
                href="/styles/neumorphism"
                className="text-sm text-[#6d5dfc] font-semibold hover:opacity-75 transition-opacity duration-200"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-sm text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                Home
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#b8bcc2]/30 flex items-center justify-between">
            <p className="text-[10px] text-gray-400">
              &copy; 2025 StyleKit. Elements extruded from the surface — never floating above it.
            </p>
            <div className="rounded-lg bg-[#e0e5ec] shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff] px-3 py-1.5">
              <p className="text-[9px] font-mono text-gray-400">bg-[#e0e5ec] &bull; dual shadow</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
