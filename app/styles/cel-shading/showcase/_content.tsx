"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
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
/*  Speed line SVG — diagonal lines radiating from a focal point      */
/* ------------------------------------------------------------------ */

function SpeedLines({
  className = "",
  focalX = 50,
  focalY = 50,
  lineCount = 24,
  color = "#1a1a2e",
  opacity = 0.08,
}: {
  className?: string;
  focalX?: number;
  focalY?: number;
  lineCount?: number;
  color?: string;
  opacity?: number;
}) {
  const lines = Array.from({ length: lineCount }, (_, i) => {
    const angle = (i / lineCount) * 360;
    const rad = (angle * Math.PI) / 180;
    const farX = focalX + Math.cos(rad) * 160;
    const farY = focalY + Math.sin(rad) * 160;
    return { x1: focalX, y1: focalY, x2: farX, y2: farY, angle };
  });

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g opacity={opacity} stroke={color} strokeWidth="0.3" fill="none">
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            strokeWidth={i % 3 === 0 ? "0.5" : "0.25"}
          />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Ink outline panel — thick border + hard offset shadow box         */
/* ------------------------------------------------------------------ */

function InkPanel({
  children,
  className = "",
  shadowColor = "#1a1a2e",
  shadowSize = "4px",
}: {
  children: React.ReactNode;
  className?: string;
  shadowColor?: string;
  shadowSize?: string;
}) {
  return (
    <div
      className={`border-[3px] border-[#1a1a2e] rounded-xl ${className}`}
      style={{ boxShadow: `${shadowSize} ${shadowSize} 0 ${shadowColor}` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comic panel label — small rotated badge                           */
/* ------------------------------------------------------------------ */

function ComicBadge({
  children,
  bg = "#f1c40f",
  rotate = "-2deg",
}: {
  children: React.ReactNode;
  bg?: string;
  rotate?: string;
}) {
  return (
    <span
      className="inline-block px-3 py-1 border-[3px] border-[#1a1a2e] text-[#1a1a2e] text-xs font-black uppercase tracking-wider"
      style={{
        backgroundColor: bg,
        boxShadow: "2px 2px 0 #1a1a2e",
        transform: `rotate(${rotate})`,
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Cel-shading button — flat fill + thick outline + press effect     */
/* ------------------------------------------------------------------ */

function CelButton({
  children,
  bg = "#e63946",
  textColor = "text-white",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  bg?: string;
  textColor?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative px-6 py-3 border-[3px] border-[#1a1a2e] rounded-xl font-black uppercase text-sm
        shadow-[3px_3px_0_#1a1a2e]
        hover:shadow-[5px_5px_0_#1a1a2e] hover:-translate-x-[1px] hover:-translate-y-[1px]
        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
        transition-all duration-100
        ${textColor} ${className}`}
      style={{ backgroundColor: bg }}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Section header — comic-panel style with thick border label        */
/* ------------------------------------------------------------------ */

function SectionHeader({
  badge,
  badgeBg = "#4ea8de",
  title,
  titleAccent,
  subtitle,
}: {
  badge: string;
  badgeBg?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      <ComicBadge bg={badgeBg}>{badge}</ComicBadge>
      <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] uppercase mt-4 mb-3 leading-none">
        {title}
        {titleAccent && (
          <span className="text-[#e63946]"> {titleAccent}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-base font-bold text-[#1a1a2e]/60 max-w-md">{subtitle}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color palette data                                                 */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Ink Black", hex: "#1a1a2e", label: "Primary", light: false },
  { name: "Paper White", hex: "#fafaf5", label: "Background", light: true },
  { name: "Anime Red", hex: "#e63946", label: "Accent", light: false },
  { name: "Sky Blue", hex: "#4ea8de", label: "Cool", light: false },
  { name: "Vivid Green", hex: "#2ecc71", label: "Success", light: false },
  { name: "Sun Yellow", hex: "#f1c40f", label: "Highlight", light: true },
];

/* ------------------------------------------------------------------ */
/*  Component demo tabs                                                */
/* ------------------------------------------------------------------ */

type ComponentTab = "Button" | "Card" | "Input" | "Badge";

const ACCENT_COLORS: Record<ComponentTab, string> = {
  Button: "#e63946",
  Card: "#4ea8de",
  Input: "#2ecc71",
  Badge: "#f1c40f",
};

/* ------------------------------------------------------------------ */
/*  Character card                                                     */
/* ------------------------------------------------------------------ */

function CharacterCard({
  name,
  role,
  level,
  hp,
  color,
  symbol,
}: {
  name: string;
  role: string;
  level: number;
  hp: number;
  color: string;
  symbol: string;
}) {
  return (
    <div
      className="group relative border-[3px] border-[#1a1a2e] rounded-xl bg-[#fafaf5] overflow-hidden
        shadow-[4px_4px_0_#1a1a2e]
        hover:shadow-[6px_6px_0_#1a1a2e] hover:-translate-x-[1px] hover:-translate-y-[1px]
        transition-all duration-100 cursor-pointer"
    >
      {/* Color header */}
      <div
        className="relative h-28 flex items-center justify-center border-b-[3px] border-[#1a1a2e]"
        style={{ backgroundColor: color }}
      >
        <SpeedLines focalX={50} focalY={50} lineCount={20} color="#1a1a2e" opacity={0.12} />
        <span className="relative z-10 text-5xl font-black text-[#1a1a2e] select-none" style={{ textShadow: "2px 2px 0 rgba(255,255,255,0.4)" }}>
          {symbol}
        </span>
        {/* Level badge */}
        <span
          className="absolute top-3 right-3 w-9 h-9 border-[3px] border-[#1a1a2e] bg-[#fafaf5] flex items-center justify-center font-black text-xs text-[#1a1a2e]"
          style={{ boxShadow: "2px 2px 0 #1a1a2e" }}
        >
          Lv{level}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-black text-[#1a1a2e]/50 uppercase tracking-widest mb-1">{role}</p>
        <h3 className="text-xl font-black text-[#1a1a2e] uppercase mb-4">{name}</h3>

        {/* HP bar */}
        <div>
          <div className="flex justify-between text-xs font-black text-[#1a1a2e] mb-1">
            <span>HP</span>
            <span>{hp}/100</span>
          </div>
          <div className="h-4 bg-[#ddd] border-[3px] border-[#1a1a2e] rounded-sm overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${hp}%`,
                backgroundColor: hp > 60 ? "#2ecc71" : hp > 30 ? "#f1c40f" : "#e63946",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [componentTab, setComponentTab] = useState<ComponentTab>("Button");
  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const activeAccent = ACCENT_COLORS[componentTab];

  return (
    <div className="min-h-screen bg-[#fafaf5] text-[#1a1a2e] overflow-x-hidden">

      {/* ============================================================== */}
      {/* 1. Fixed Nav                                                    */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafaf5] border-b-[3px] border-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 bg-[#e63946] border-[3px] border-[#1a1a2e] rounded-md flex items-center justify-center"
                style={{ boxShadow: "2px 2px 0 #1a1a2e" }}
              >
                <span className="text-white font-black text-sm leading-none">C</span>
              </div>
              <span className="font-black text-[#1a1a2e] uppercase tracking-wide text-sm hidden sm:block">
                Cel Shading
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-black text-[#1a1a2e] uppercase tracking-wide hover:text-[#e63946] transition-colors duration-100"
              >
                StyleKit &rarr;
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. Hero                                                         */}
      {/* ============================================================== */}
      <section className="relative pt-24 pb-24 md:pt-32 md:pb-32 px-6 md:px-12 overflow-hidden bg-[#fafaf5]">
        {/* Speed lines radiating from center */}
        <SpeedLines focalX={50} focalY={50} lineCount={32} color="#1a1a2e" opacity={0.055} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <div
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                  transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <ComicBadge bg="#f1c40f" rotate="-1.5deg">赛璐璐动画风</ComicBadge>
              </div>

              <h1
                className="text-6xl md:text-8xl font-black uppercase leading-none mt-6 mb-6"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s",
                }}
              >
                <span className="block text-[#1a1a2e]" style={{ textShadow: "4px 4px 0 #e63946" }}>
                  Cel
                </span>
                <span className="block text-[#4ea8de]" style={{ textShadow: "4px 4px 0 #1a1a2e" }}>
                  Shading
                </span>
              </h1>

              <p
                className="text-base font-bold text-[#1a1a2e]/65 max-w-sm leading-relaxed mb-10"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                Thick ink outlines. Flat saturated fills. Hard offset shadows. Zero gradients. The aesthetic of classic anime cels made into UI.
              </p>

              <div
                className="flex flex-wrap gap-4"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                <CelButton bg="#e63946">Explore Style!</CelButton>
                <CelButton bg="#fafaf5" textColor="text-[#1a1a2e]">Learn More</CelButton>
              </div>
            </div>

            {/* Right: decorative comic panel hero display */}
            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0) rotate(0deg)" : "translateY(40px) rotate(-2deg)",
                transition: "opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            >
              <div
                className="relative border-[3px] border-[#1a1a2e] rounded-xl overflow-hidden bg-[#fafaf5]"
                style={{ boxShadow: "8px 8px 0 #1a1a2e" }}
              >
                {/* Top red accent strip */}
                <div className="h-3 bg-[#e63946] border-b-[3px] border-[#1a1a2e]" />

                {/* Main panel area */}
                <div className="relative h-64 md:h-72 flex items-center justify-center overflow-hidden bg-[#fafaf5]">
                  <SpeedLines focalX={50} focalY={50} lineCount={28} color="#1a1a2e" opacity={0.07} />

                  {/* Central character silhouette */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    {/* Head */}
                    <div
                      className="w-20 h-20 bg-[#f1c40f] border-[3px] border-[#1a1a2e] rounded-xl flex items-center justify-center"
                      style={{ boxShadow: "4px 4px 0 #1a1a2e" }}
                    >
                      {/* Eyes */}
                      <div className="flex gap-3 items-center">
                        <div className="w-4 h-5 bg-[#1a1a2e] rounded-full relative">
                          <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 right-0.5" />
                        </div>
                        <div className="w-4 h-5 bg-[#1a1a2e] rounded-full relative">
                          <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 right-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div
                      className="w-28 h-16 bg-[#e63946] border-[3px] border-[#1a1a2e] rounded-xl relative overflow-hidden"
                      style={{ boxShadow: "4px 4px 0 #1a1a2e" }}
                    >
                      {/* Hard shadow block */}
                      <div className="absolute inset-y-0 right-0 w-8 bg-[#1a1a2e]/15" />
                      {/* Star */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-white font-black text-xl">&#9733;</span>
                      </div>
                    </div>

                    {/* Legs */}
                    <div className="flex gap-3">
                      <div
                        className="w-10 h-10 bg-[#4ea8de] border-[3px] border-[#1a1a2e] rounded-lg"
                        style={{ boxShadow: "3px 3px 0 #1a1a2e" }}
                      />
                      <div
                        className="w-10 h-10 bg-[#4ea8de] border-[3px] border-[#1a1a2e] rounded-lg"
                        style={{ boxShadow: "3px 3px 0 #1a1a2e" }}
                      />
                    </div>
                  </div>

                  {/* POW speech bubble */}
                  <div
                    className="absolute top-4 right-4 px-3 py-2 bg-[#f1c40f] border-[3px] border-[#1a1a2e] rounded-xl"
                    style={{ boxShadow: "3px 3px 0 #1a1a2e", transform: "rotate(5deg)" }}
                  >
                    <span className="font-black text-[#1a1a2e] text-sm uppercase">POW!</span>
                  </div>

                  {/* ZAP bottom left */}
                  <div
                    className="absolute bottom-4 left-4 px-3 py-2 bg-[#e63946] border-[3px] border-[#1a1a2e] rounded-xl"
                    style={{ boxShadow: "3px 3px 0 #1a1a2e", transform: "rotate(-4deg)" }}
                  >
                    <span className="font-black text-white text-sm uppercase">ZAP!</span>
                  </div>
                </div>

                {/* Bottom blue strip */}
                <div className="h-3 bg-[#4ea8de] border-t-[3px] border-[#1a1a2e]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. Component Demos — 4-color tab switcher                       */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#f0f0ea]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionHeader
              badge="Components"
              badgeBg="#4ea8de"
              title="UI"
              titleAccent="Elements"
              subtitle="Thick outlines, flat fills, hard shadows — every component drawn with anime ink."
            />
          </RevealBlock>

          {/* Tab switcher — 4 accent colors */}
          <RevealBlock delay={0.05}>
            <div
              className="inline-flex border-[3px] border-[#1a1a2e] rounded-xl overflow-hidden mb-10"
              style={{ boxShadow: "4px 4px 0 #1a1a2e" }}
            >
              {(["Button", "Card", "Input", "Badge"] as ComponentTab[]).map((tab, i) => {
                const colors: Record<ComponentTab, string> = {
                  Button: "#e63946",
                  Card: "#4ea8de",
                  Input: "#2ecc71",
                  Badge: "#f1c40f",
                };
                const textColors: Record<ComponentTab, string> = {
                  Button: "text-white",
                  Card: "text-white",
                  Input: "text-white",
                  Badge: "text-[#1a1a2e]",
                };
                const isActive = componentTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setComponentTab(tab)}
                    className={`px-5 py-3 font-black uppercase text-sm transition-all duration-100
                      ${i > 0 ? "border-l-[3px] border-[#1a1a2e]" : ""}
                      ${isActive ? textColors[tab] : "text-[#1a1a2e]/50 hover:text-[#1a1a2e] bg-[#fafaf5] hover:bg-[#f0f0ea]"}
                    `}
                    style={{
                      backgroundColor: isActive ? colors[tab] : undefined,
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </RevealBlock>

          {/* Demo area */}
          <RevealBlock delay={0.1}>
            <InkPanel className="bg-[#fafaf5] p-8 md:p-12" shadowSize="6px">
              {/* BUTTON TAB */}
              {componentTab === "Button" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]/40 mb-5">Primary Buttons</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "Attack!", bg: "#e63946", text: "text-white" },
                        { label: "Defend", bg: "#4ea8de", text: "text-white" },
                        { label: "Heal", bg: "#2ecc71", text: "text-white" },
                        { label: "Special!", bg: "#f1c40f", text: "text-[#1a1a2e]" },
                      ].map((btn) => (
                        <CelButton key={btn.label} bg={btn.bg} textColor={btn.text}>
                          {btn.label}
                        </CelButton>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]/40 mb-5">Ghost &amp; Disabled</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button
                        type="button"
                        className="group px-6 py-3 bg-transparent border-[3px] border-[#1a1a2e] rounded-xl font-black uppercase text-sm text-[#1a1a2e]
                          shadow-[3px_3px_0_#1a1a2e]
                          hover:shadow-[5px_5px_0_#1a1a2e] hover:-translate-x-[1px] hover:-translate-y-[1px]
                          active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                          transition-all duration-100"
                      >
                        Ghost Button
                      </button>
                      <button
                        type="button"
                        disabled
                        className="px-6 py-3 bg-[#ddd] border-[3px] border-[#999] rounded-xl font-black uppercase text-sm text-[#999] cursor-not-allowed"
                      >
                        Locked
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]/40 mb-5">Size Scale</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "XS", px: "px-3 py-1.5", text: "text-xs" },
                        { label: "SM", px: "px-4 py-2", text: "text-sm" },
                        { label: "MD", px: "px-6 py-3", text: "text-sm" },
                        { label: "LG", px: "px-8 py-4", text: "text-base" },
                      ].map((sz) => (
                        <button
                          key={sz.label}
                          type="button"
                          className={`bg-[#e63946] text-white border-[3px] border-[#1a1a2e] rounded-xl font-black uppercase
                            shadow-[3px_3px_0_#1a1a2e]
                            hover:shadow-[5px_5px_0_#1a1a2e] hover:-translate-x-[1px] hover:-translate-y-[1px]
                            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                            transition-all duration-100
                            ${sz.px} ${sz.text}`}
                        >
                          {sz.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    className="p-4 border-[3px] border-[#1a1a2e]/20 rounded-xl bg-[#f0f0ea]"
                  >
                    <p className="text-xs font-black text-[#1a1a2e]/50 uppercase tracking-wider mb-1">Interaction tokens</p>
                    <code className="text-xs font-mono text-[#e63946]">
                      shadow-[3px_3px_0_#1a1a2e] hover:shadow-[5px_5px_0_#1a1a2e] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                    </code>
                  </div>
                </div>
              )}

              {/* CARD TAB */}
              {componentTab === "Card" && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { name: "Warrior", role: "Fighter", level: 42, hp: 78, color: "#e63946", symbol: "\u2694" },
                      { name: "Mage", role: "Sorcerer", level: 35, hp: 45, color: "#9b59b6", symbol: "\u2726" },
                      { name: "Guardian", role: "Tank", level: 50, hp: 92, color: "#4ea8de", symbol: "\u26C9" },
                    ].map((c) => (
                      <CharacterCard key={c.name} {...c} />
                    ))}
                  </div>

                  <div
                    className="p-4 border-[3px] border-[#1a1a2e]/20 rounded-xl bg-[#f0f0ea]"
                  >
                    <p className="text-xs font-black text-[#1a1a2e]/50 uppercase tracking-wider mb-1">Card token</p>
                    <code className="text-xs font-mono text-[#4ea8de]">
                      border-[3px] border-[#1a1a2e] shadow-[4px_4px_0_#1a1a2e] hover:shadow-[6px_6px_0_#1a1a2e]
                    </code>
                  </div>
                </div>
              )}

              {/* INPUT TAB */}
              {componentTab === "Input" && (
                <div className="space-y-8 max-w-lg">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#1a1a2e] mb-2">
                      Hero Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your battle name..."
                      className="w-full px-4 py-3 bg-[#fafaf5] border-[3px] border-[#1a1a2e] rounded-xl font-bold text-[#1a1a2e]
                        placeholder-[#1a1a2e]/30
                        shadow-[3px_3px_0_#1a1a2e]
                        focus:outline-none focus:shadow-[5px_5px_0_#2ecc71] focus:border-[#2ecc71]
                        transition-all duration-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#1a1a2e] mb-2">
                      Battle Class
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-[#fafaf5] border-[3px] border-[#1a1a2e] rounded-xl font-bold text-[#1a1a2e]
                        shadow-[3px_3px_0_#1a1a2e]
                        focus:outline-none focus:shadow-[5px_5px_0_#2ecc71] focus:border-[#2ecc71]
                        transition-all duration-100"
                    >
                      <option>Warrior</option>
                      <option>Mage</option>
                      <option>Rogue</option>
                      <option>Tank</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#1a1a2e] mb-2">
                      Battle Cry
                    </label>
                    <textarea
                      placeholder="Your battle cry..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[#fafaf5] border-[3px] border-[#1a1a2e] rounded-xl font-bold text-[#1a1a2e]
                        placeholder-[#1a1a2e]/30 resize-none
                        shadow-[3px_3px_0_#1a1a2e]
                        focus:outline-none focus:shadow-[5px_5px_0_#2ecc71] focus:border-[#2ecc71]
                        transition-all duration-100"
                    />
                  </div>

                  <CelButton bg="#2ecc71" className="w-full justify-center">
                    Begin Adventure!
                  </CelButton>

                  <div className="p-4 border-[3px] border-[#1a1a2e]/20 rounded-xl bg-[#f0f0ea]">
                    <p className="text-xs font-black text-[#1a1a2e]/50 uppercase tracking-wider mb-1">Input token</p>
                    <code className="text-xs font-mono text-[#2ecc71]">
                      border-[3px] border-[#1a1a2e] focus:border-[#2ecc71] focus:shadow-[5px_5px_0_#2ecc71]
                    </code>
                  </div>
                </div>
              )}

              {/* BADGE TAB */}
              {componentTab === "Badge" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]/40 mb-5">Status Badges</p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "Quest Complete!", bg: "#2ecc71", text: "text-white" },
                        { label: "Watch Out!", bg: "#f1c40f", text: "text-[#1a1a2e]" },
                        { label: "Enemy!", bg: "#e63946", text: "text-white" },
                        { label: "Pro Tip", bg: "#4ea8de", text: "text-white" },
                        { label: "New Item!", bg: "#9b59b6", text: "text-white" },
                      ].map((badge) => (
                        <span
                          key={badge.label}
                          className={`inline-flex items-center px-3 py-1.5 border-[3px] border-[#1a1a2e] rounded-xl font-black uppercase text-xs ${badge.text}`}
                          style={{
                            backgroundColor: badge.bg,
                            boxShadow: "2px 2px 0 #1a1a2e",
                          }}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]/40 mb-5">Rotated Comic Labels</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <ComicBadge bg="#f1c40f" rotate="-2deg">NEW!</ComicBadge>
                      <ComicBadge bg="#e63946" rotate="1.5deg">HOT!</ComicBadge>
                      <ComicBadge bg="#4ea8de" rotate="-1deg">COOL</ComicBadge>
                      <ComicBadge bg="#2ecc71" rotate="2.5deg">WIN!</ComicBadge>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#1a1a2e]/40 mb-5">Star Rating</p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className="text-3xl font-black"
                          style={{ color: i < 4 ? "#f1c40f" : "#ddd", textShadow: i < 4 ? "1px 1px 0 #1a1a2e" : "none" }}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-[3px] border-[#1a1a2e]/20 rounded-xl bg-[#f0f0ea]">
                    <p className="text-xs font-black text-[#1a1a2e]/50 uppercase tracking-wider mb-1">Badge token</p>
                    <code className="text-xs font-mono text-[#f1c40f]">
                      border-[3px] border-[#1a1a2e] shadow-[2px_2px_0_#1a1a2e] font-black uppercase
                    </code>
                  </div>
                </div>
              )}
            </InkPanel>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. Color Palette                                                */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionHeader
              badge="Palette"
              badgeBg="#2ecc71"
              title="Color"
              titleAccent="System"
              subtitle="Six flat colors drawn straight from the anime cel paint box. No gradients, no blends."
            />
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {palette.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.05}>
                <div
                  className="group border-[3px] border-[#1a1a2e] rounded-xl overflow-hidden bg-[#fafaf5]
                    shadow-[4px_4px_0_#1a1a2e]
                    hover:shadow-[6px_6px_0_#1a1a2e] hover:-translate-x-[1px] hover:-translate-y-[1px]
                    transition-all duration-100 cursor-pointer"
                >
                  {/* Color swatch */}
                  <div
                    className="h-24 flex items-end p-3 border-b-[3px] border-[#1a1a2e]"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-[10px] font-mono font-black"
                      style={{ color: color.light ? "#1a1a2e" : "#fafaf5" }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  {/* Label */}
                  <div className="p-3">
                    <p className="text-xs font-black text-[#1a1a2e] uppercase">{color.name}</p>
                    <p className="text-[10px] font-bold text-[#1a1a2e]/40 uppercase mt-0.5">{color.label}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Usage note */}
          <RevealBlock delay={0.15}>
            <div
              className="mt-10 p-6 border-[3px] border-[#1a1a2e] rounded-xl bg-[#f1c40f]"
              style={{ boxShadow: "4px 4px 0 #1a1a2e" }}
            >
              <p className="font-black text-[#1a1a2e] uppercase text-sm mb-1">Rule: Always Flat!</p>
              <p className="font-bold text-[#1a1a2e]/70 text-sm">
                These six colors are always used as pure flat fills — never as gradient stops or with opacity blending. The ink outline does all the separation work.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. Typography                                                   */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#f0f0ea]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionHeader
              badge="Typography"
              badgeBg="#e63946"
              title="Ink"
              titleAccent="Type"
              subtitle="Bold headings rooted in manga lettering. Clean body text for readability."
            />
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Heading scale */}
            <RevealBlock>
              <InkPanel className="bg-[#fafaf5] p-8" shadowSize="4px">
                <p className="text-xs font-black text-[#1a1a2e]/40 uppercase tracking-widest mb-8">Heading Scale</p>
                <div className="space-y-4">
                  <div>
                    <p
                      className="text-5xl font-black text-[#1a1a2e] uppercase leading-none"
                      style={{ textShadow: "3px 3px 0 #e63946" }}
                    >
                      H1 Heading
                    </p>
                    <span className="text-xs font-bold text-[#1a1a2e]/40 uppercase mt-1 block">text-5xl font-black + ink shadow</span>
                  </div>
                  <div className="pt-4 border-t-[3px] border-[#1a1a2e]/10">
                    <p className="text-3xl font-black text-[#4ea8de] uppercase leading-none">H2 Heading</p>
                    <span className="text-xs font-bold text-[#1a1a2e]/40 uppercase mt-1 block">text-3xl font-black accent color</span>
                  </div>
                  <div className="pt-4 border-t-[3px] border-[#1a1a2e]/10">
                    <p className="text-2xl font-black text-[#1a1a2e] uppercase leading-none">H3 Heading</p>
                    <span className="text-xs font-bold text-[#1a1a2e]/40 uppercase mt-1 block">text-2xl font-black ink black</span>
                  </div>
                  <div className="pt-4 border-t-[3px] border-[#1a1a2e]/10">
                    <p className="text-xl font-black text-[#1a1a2e] uppercase leading-none">H4 Heading</p>
                    <span className="text-xs font-bold text-[#1a1a2e]/40 uppercase mt-1 block">text-xl font-black</span>
                  </div>
                </div>
              </InkPanel>
            </RevealBlock>

            {/* Body + misc */}
            <RevealBlock delay={0.08}>
              <InkPanel className="bg-[#fafaf5] p-8 h-full" shadowSize="4px">
                <p className="text-xs font-black text-[#1a1a2e]/40 uppercase tracking-widest mb-8">Body &amp; UI Text</p>
                <div className="space-y-6">
                  <div>
                    <p className="text-base font-bold text-[#1a1a2e] leading-relaxed">
                      Body text uses font-bold for consistent ink weight. Cel shading is a style that thrives on confident, readable lettering — no thin strokes allowed.
                    </p>
                    <span className="text-xs font-bold text-[#1a1a2e]/40 uppercase mt-1 block">text-base font-bold</span>
                  </div>

                  <div className="pt-4 border-t-[3px] border-[#1a1a2e]/10">
                    <p className="text-sm font-bold text-[#1a1a2e]/60 leading-relaxed">
                      Supporting text is muted but still bold. Opacity 60% on ink black, never thin font-weight.
                    </p>
                    <span className="text-xs font-bold text-[#1a1a2e]/40 uppercase mt-1 block">text-sm font-bold opacity-60</span>
                  </div>

                  <div className="pt-4 border-t-[3px] border-[#1a1a2e]/10">
                    <p className="text-xs font-black text-[#1a1a2e] uppercase tracking-widest">
                      Caption Label — Scene 1 Take 3
                    </p>
                    <span className="text-xs font-bold text-[#1a1a2e]/40 uppercase mt-1 block">text-xs font-black uppercase tracking-widest</span>
                  </div>

                  {/* Manga-style quote box */}
                  <div
                    className="mt-4 p-4 bg-[#e63946] border-[3px] border-[#1a1a2e] rounded-xl"
                    style={{ boxShadow: "3px 3px 0 #1a1a2e" }}
                  >
                    <p className="text-base font-black text-white uppercase leading-snug">
                      &ldquo;I will surpass my limits!&rdquo;
                    </p>
                    <p className="text-xs font-bold text-white/70 mt-1">— Dramatic Protagonist</p>
                  </div>
                </div>
              </InkPanel>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. Design Principles — comic-panel do/don't boxes              */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionHeader
              badge="Principles"
              badgeBg="#f1c40f"
              title="Design"
              titleAccent="Rules"
              subtitle="The laws of the cel-shading dojo. Follow them and your UI will look like a Ghibli cut sheet."
            />
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* DO */}
            <RevealBlock>
              <div
                className="relative border-[3px] border-[#1a1a2e] rounded-xl overflow-hidden bg-[#fafaf5]"
                style={{ boxShadow: "5px 5px 0 #2ecc71" }}
              >
                {/* Header strip */}
                <div className="bg-[#2ecc71] border-b-[3px] border-[#1a1a2e] px-6 py-4 flex items-center gap-3">
                  <span className="w-8 h-8 border-[3px] border-[#1a1a2e] bg-[#fafaf5] rounded-full flex items-center justify-center font-black text-[#2ecc71] text-sm">
                    &#10003;
                  </span>
                  <span className="font-black text-white uppercase text-lg">Do This</span>
                </div>

                {/* Rules list */}
                <ul className="p-6 space-y-3">
                  {[
                    "3px thick black outline on ALL bordered elements",
                    "Hard offset shadow — shadow-[3px_3px_0_#1a1a2e]",
                    "Flat solid color fills — no gradients whatsoever",
                    "rounded-xl for character-design friendly shapes",
                    "Speed lines as SVG decoration in hero sections",
                    "Comic-style panel layout for section groupings",
                    "hover:shadow-[5px_5px_0_#1a1a2e] deeper shadow on hover",
                    "active:translate-x-[2px] active:translate-y-[2px] press effect",
                    "font-black for headings — ultra bold, never thin",
                    "Use accent color blocks to separate comic panels",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="shrink-0 w-5 h-5 border-[2px] border-[#1a1a2e] bg-[#2ecc71] rounded-sm flex items-center justify-center mt-0.5"
                      >
                        <span className="text-white font-black text-[10px]">+</span>
                      </span>
                      <span className="text-sm font-bold text-[#1a1a2e]/75">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.08}>
              <div
                className="relative border-[3px] border-[#1a1a2e] rounded-xl overflow-hidden bg-[#fafaf5]"
                style={{ boxShadow: "5px 5px 0 #e63946" }}
              >
                {/* Header strip */}
                <div className="bg-[#e63946] border-b-[3px] border-[#1a1a2e] px-6 py-4 flex items-center gap-3">
                  <span className="w-8 h-8 border-[3px] border-[#1a1a2e] bg-[#fafaf5] rounded-full flex items-center justify-center font-black text-[#e63946] text-sm">
                    &#10005;
                  </span>
                  <span className="font-black text-white uppercase text-lg">Never Do This</span>
                </div>

                {/* Rules list */}
                <ul className="p-6 space-y-3">
                  {[
                    "No gradients or smooth color transitions",
                    "No soft box-shadow blur (only hard 0-blur offset)",
                    "No thin borders (always at least 2px, prefer 3px)",
                    "No soft pastel overall tone",
                    "No realistic textures or surface details",
                    "No light font-weight (font-light, font-normal)",
                    "No rounded-full on cards or large containers",
                    "No transparency or opacity blending on fills",
                    "No smooth hover transitions over 150ms",
                    "No drop shadows with blur radius",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="shrink-0 w-5 h-5 border-[2px] border-[#1a1a2e] bg-[#e63946] rounded-sm flex items-center justify-center mt-0.5"
                      >
                        <span className="text-white font-black text-[10px]">-</span>
                      </span>
                      <span className="text-sm font-bold text-[#1a1a2e]/75">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Visual principle comparisons */}
          <RevealBlock delay={0.1}>
            <div
              className="border-[3px] border-[#1a1a2e] rounded-xl overflow-hidden bg-[#fafaf5]"
              style={{ boxShadow: "5px 5px 0 #1a1a2e" }}
            >
              {/* Header */}
              <div className="bg-[#4ea8de] border-b-[3px] border-[#1a1a2e] px-6 py-4">
                <span className="font-black text-white uppercase text-base">Visual Comparison: Shadow Style</span>
              </div>

              <div className="p-8 grid md:grid-cols-2 gap-10">
                {/* Correct: hard shadow */}
                <div>
                  <p className="text-xs font-black text-[#2ecc71] uppercase tracking-widest mb-4">Correct: Hard Offset Shadow</p>
                  <div className="flex items-center justify-center py-8 bg-[#f0f0ea] border-[3px] border-[#1a1a2e] rounded-xl">
                    <div
                      className="px-6 py-3 bg-[#e63946] text-white font-black uppercase text-sm border-[3px] border-[#1a1a2e] rounded-xl"
                      style={{ boxShadow: "4px 4px 0 #1a1a2e" }}
                    >
                      Anime Button
                    </div>
                  </div>
                  <code className="text-xs font-mono text-[#1a1a2e]/50 mt-3 block">
                    box-shadow: 4px 4px 0 #1a1a2e
                  </code>
                </div>

                {/* Wrong: soft shadow */}
                <div>
                  <p className="text-xs font-black text-[#e63946] uppercase tracking-widest mb-4">Wrong: Soft Blur Shadow</p>
                  <div className="flex items-center justify-center py-8 bg-[#f0f0ea] border-[3px] border-[#1a1a2e] rounded-xl">
                    <div
                      className="px-6 py-3 bg-[#e63946] text-white font-black uppercase text-sm rounded-xl"
                      style={{ boxShadow: "0 8px 24px rgba(230,57,70,0.5)" }}
                    >
                      Anime Button
                    </div>
                  </div>
                  <code className="text-xs font-mono text-[#1a1a2e]/50 mt-3 block">
                    box-shadow: 0 8px 24px rgba(..., 0.5) — WRONG
                  </code>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. Cel-Shading Anatomy — deep-dive panel                       */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <div className="mb-12">
              <ComicBadge bg="#f1c40f" rotate="-1deg">Anatomy</ComicBadge>
              <h2 className="text-4xl md:text-5xl font-black text-[#fafaf5] uppercase mt-4 mb-3 leading-none">
                The Four <span className="text-[#e63946]">Laws</span>
              </h2>
              <p className="text-base font-bold text-[#fafaf5]/50 max-w-md">
                Every cel-shading element follows four fundamental laws — master these and you master the style.
              </p>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                number: "01",
                title: "The Outline",
                desc: "Every element gets a 3px solid #1a1a2e border. No exceptions. This is the ink that defines the world.",
                color: "#e63946",
                demo: (
                  <div className="h-16 flex items-center justify-center">
                    <div className="w-24 h-10 bg-[#e63946] border-[3px] border-[#fafaf5] rounded-xl" />
                  </div>
                ),
              },
              {
                number: "02",
                title: "The Shadow",
                desc: "Hard offset drop shadow — 3-5px shift, zero blur. Creates dimension without softness.",
                color: "#4ea8de",
                demo: (
                  <div className="h-16 flex items-center justify-center">
                    <div
                      className="w-24 h-10 bg-[#4ea8de] border-[3px] border-[#fafaf5] rounded-xl"
                      style={{ boxShadow: "4px 4px 0 rgba(255,255,255,0.3)" }}
                    />
                  </div>
                ),
              },
              {
                number: "03",
                title: "The Fill",
                desc: "Pure flat color. No gradient, no blur, no texture. One color per region, drawn like paint from a tube.",
                color: "#2ecc71",
                demo: (
                  <div className="h-16 flex items-center justify-center gap-2">
                    {["#e63946", "#4ea8de", "#2ecc71", "#f1c40f"].map((c) => (
                      <div key={c} className="w-8 h-8 border-[2px] border-[#fafaf5] rounded-md" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                ),
              },
              {
                number: "04",
                title: "The Press",
                desc: "Buttons compress on click — translate +2px to match shadow offset, shadow disappears. Pure physical feel.",
                color: "#f1c40f",
                demo: (
                  <div className="h-16 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-20 h-8 bg-[#f1c40f] border-[2px] border-[#fafaf5] rounded-lg flex items-center justify-center"
                        style={{ boxShadow: "3px 3px 0 rgba(255,255,255,0.25)" }}
                      >
                        <span className="text-xs font-black text-[#1a1a2e]">Hover</span>
                      </div>
                      <div className="w-20 h-8 bg-[#f1c40f] border-[2px] border-[#fafaf5] rounded-lg flex items-center justify-center translate-x-[2px] translate-y-[2px]">
                        <span className="text-xs font-black text-[#1a1a2e]">Active</span>
                      </div>
                    </div>
                  </div>
                ),
              },
            ].map((law, i) => (
              <RevealBlock key={law.number} delay={i * 0.06}>
                <div
                  className="border-[3px] border-[#fafaf5]/30 rounded-xl overflow-hidden"
                  style={{ boxShadow: `4px 4px 0 ${law.color}` }}
                >
                  {/* Header */}
                  <div
                    className="border-b-[3px] border-[#fafaf5]/30 px-5 py-3 flex items-center gap-3"
                    style={{ backgroundColor: law.color }}
                  >
                    <span className="font-black text-[#1a1a2e] text-2xl leading-none">{law.number}</span>
                    <span className="font-black text-[#1a1a2e] uppercase text-sm">{law.title}</span>
                  </div>

                  {/* Demo */}
                  <div className="bg-[#1a1a2e] px-5 py-2">
                    {law.demo}
                  </div>

                  {/* Description */}
                  <div className="bg-[#222238] px-5 py-4">
                    <p className="text-sm font-bold text-[#fafaf5]/70 leading-relaxed">{law.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. Speed Line Gallery                                           */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionHeader
              badge="Decoration"
              badgeBg="#e63946"
              title="Speed"
              titleAccent="Lines"
              subtitle="Diagonal lines radiating from a focal point — the signature manga action element."
            />
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { focal: [50, 50], color: "#1a1a2e", opacity: 0.12, bg: "#fafaf5", label: "Centered", lineCount: 24 },
              { focal: [0, 100], color: "#e63946", opacity: 0.15, bg: "#fff0f0", label: "Corner", lineCount: 16 },
              { focal: [100, 0], color: "#4ea8de", opacity: 0.18, bg: "#f0f8ff", label: "Top-Right", lineCount: 20 },
            ].map((cfg, i) => (
              <RevealBlock key={i} delay={i * 0.06}>
                <div
                  className="relative border-[3px] border-[#1a1a2e] rounded-xl overflow-hidden h-40"
                  style={{ backgroundColor: cfg.bg, boxShadow: "4px 4px 0 #1a1a2e" }}
                >
                  <SpeedLines
                    focalX={cfg.focal[0]}
                    focalY={cfg.focal[1]}
                    lineCount={cfg.lineCount}
                    color={cfg.color}
                    opacity={cfg.opacity}
                  />
                  {/* Center label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="px-3 py-1.5 border-[3px] border-[#1a1a2e] font-black uppercase text-xs text-[#1a1a2e] bg-[#fafaf5]"
                      style={{ boxShadow: "2px 2px 0 #1a1a2e" }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                </div>
                <p className="text-xs font-black text-[#1a1a2e]/50 uppercase tracking-wider mt-2 text-center">
                  Focal: ({cfg.focal[0]}, {cfg.focal[1]}) — {cfg.lineCount} lines
                </p>
              </RevealBlock>
            ))}
          </div>

          {/* Code example */}
          <RevealBlock delay={0.15}>
            <div
              className="mt-10 border-[3px] border-[#1a1a2e] rounded-xl overflow-hidden"
              style={{ boxShadow: "4px 4px 0 #1a1a2e" }}
            >
              <div className="bg-[#1a1a2e] px-6 py-3 border-b-[3px] border-[#fafaf5]/20">
                <span className="font-black text-[#fafaf5] uppercase text-xs tracking-widest">SpeedLines SVG Component</span>
              </div>
              <div className="bg-[#222238] px-6 py-5">
                <pre className="text-xs font-mono text-[#4ea8de] leading-relaxed overflow-x-auto">
{`<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
  <g opacity={0.08} stroke="#1a1a2e" fill="none">
    {lines.map((l, i) => (
      <line
        key={i}
        x1={focalX} y1={focalY}
        x2={l.farX}  y2={l.farY}
        strokeWidth={i % 3 === 0 ? "0.5" : "0.25"}
      />
    ))}
  </g>
</svg>`}
                </pre>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. Action Panel — full comic layout                            */}
      {/* ============================================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#f0f0ea]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock>
            <SectionHeader
              badge="Layout"
              badgeBg="#9b59b6"
              title="Comic"
              titleAccent="Panels"
              subtitle="Section layouts modeled after manga panel grids. Thick borders divide content zones."
            />
          </RevealBlock>

          {/* Comic-style panel grid */}
          <RevealBlock delay={0.05}>
            <div
              className="border-[3px] border-[#1a1a2e] rounded-xl overflow-hidden bg-[#fafaf5]"
              style={{ boxShadow: "6px 6px 0 #1a1a2e" }}
            >
              {/* Top row — 2 panels */}
              <div className="flex border-b-[3px] border-[#1a1a2e]" style={{ minHeight: "200px" }}>
                {/* Panel 1 — large hero panel */}
                <div className="flex-[2] border-r-[3px] border-[#1a1a2e] relative overflow-hidden bg-[#fafaf5] flex flex-col">
                  <SpeedLines focalX={30} focalY={80} lineCount={16} color="#1a1a2e" opacity={0.055} />
                  <div className="relative z-10 p-6 flex-1 flex flex-col justify-between">
                    <ComicBadge bg="#e63946" rotate="-1deg">Scene 01</ComicBadge>
                    <div>
                      <p
                        className="text-3xl md:text-4xl font-black text-[#1a1a2e] uppercase leading-none"
                        style={{ textShadow: "3px 3px 0 #e63946" }}
                      >
                        The<br />Hero Arrives!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Panel 2 — stat panel */}
                <div className="flex-1 relative overflow-hidden bg-[#4ea8de] flex flex-col">
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <p className="font-black text-white uppercase text-xs tracking-widest">Status</p>
                    <div className="space-y-2">
                      {[
                        { label: "STR", val: 85, color: "#e63946" },
                        { label: "DEF", val: 62, color: "#2ecc71" },
                        { label: "SPD", val: 91, color: "#f1c40f" },
                      ].map((stat) => (
                        <div key={stat.label}>
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px] font-black text-white uppercase">{stat.label}</span>
                            <span className="text-[10px] font-black text-white">{stat.val}</span>
                          </div>
                          <div className="h-2 bg-[#1a1a2e]/20 border border-[#1a1a2e]/30 rounded-sm overflow-hidden">
                            <div
                              className="h-full rounded-sm"
                              style={{ width: `${stat.val}%`, backgroundColor: stat.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row — 3 panels */}
              <div className="flex" style={{ minHeight: "140px" }}>
                {/* Panel 3 */}
                <div className="flex-1 border-r-[3px] border-[#1a1a2e] bg-[#f1c40f] flex items-center justify-center p-5">
                  <div className="text-center">
                    <p className="font-black text-[#1a1a2e] text-4xl" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.15)" }}>!</p>
                    <p className="font-black text-[#1a1a2e] uppercase text-xs mt-1">Alert!</p>
                  </div>
                </div>

                {/* Panel 4 — dialogue */}
                <div className="flex-[2] border-r-[3px] border-[#1a1a2e] bg-[#fafaf5] relative overflow-hidden p-5 flex items-center">
                  <SpeedLines focalX={80} focalY={20} lineCount={12} color="#1a1a2e" opacity={0.04} />
                  <div className="relative z-10">
                    {/* Speech bubble */}
                    <div
                      className="inline-block px-4 py-3 bg-[#fafaf5] border-[3px] border-[#1a1a2e] rounded-xl relative"
                      style={{ boxShadow: "3px 3px 0 #1a1a2e" }}
                    >
                      <p className="font-black text-[#1a1a2e] text-sm uppercase">
                        This is the way!
                      </p>
                      {/* Tail */}
                      <div
                        className="absolute -bottom-[14px] left-5 w-4 h-4 bg-[#fafaf5] border-b-[3px] border-r-[3px] border-[#1a1a2e]"
                        style={{ transform: "rotate(45deg)" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Panel 5 */}
                <div className="flex-1 bg-[#2ecc71] flex items-center justify-center p-5">
                  <div className="text-center">
                    <p className="font-black text-white text-4xl" style={{ textShadow: "2px 2px 0 #1a1a2e" }}>&#9733;</p>
                    <p className="font-black text-white uppercase text-xs mt-1">Victory!</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. Footer                                                      */}
      {/* ============================================================== */}
      <footer className="border-t-[3px] border-[#1a1a2e] bg-[#fafaf5]">
        {/* Colored top strip */}
        <div className="flex h-3 border-b-[3px] border-[#1a1a2e]">
          {["#e63946", "#4ea8de", "#2ecc71", "#f1c40f", "#9b59b6", "#e67e22"].map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 bg-[#e63946] border-[3px] border-[#1a1a2e] rounded-md flex items-center justify-center"
                  style={{ boxShadow: "2px 2px 0 #1a1a2e" }}
                >
                  <span className="text-white font-black text-sm">C</span>
                </div>
                <span className="font-black text-[#1a1a2e] uppercase tracking-wide">Cel Shading</span>
              </div>
              <p className="text-xs font-bold text-[#1a1a2e]/50 uppercase tracking-wider">
                StyleKit &middot; Traditional anime aesthetic for UI
              </p>
            </div>

            {/* Color dots */}
            <div className="flex items-center gap-2">
              {[
                { c: "#e63946", label: "Anime Red" },
                { c: "#4ea8de", label: "Sky Blue" },
                { c: "#2ecc71", label: "Vivid Green" },
                { c: "#f1c40f", label: "Yellow" },
              ].map(({ c, label }) => (
                <div
                  key={c}
                  title={label}
                  className="w-6 h-6 border-[3px] border-[#1a1a2e] rounded-md"
                  style={{ backgroundColor: c, boxShadow: "2px 2px 0 #1a1a2e" }}
                />
              ))}
            </div>

            {/* Links */}
            <nav className="flex items-center gap-5">
              <Link
                href="/styles/cel-shading"
                className="text-sm font-black text-[#1a1a2e] uppercase hover:text-[#e63946] transition-colors duration-100"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-sm font-black text-[#1a1a2e] uppercase hover:text-[#e63946] transition-colors duration-100"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="px-4 py-2 bg-[#e63946] text-white text-sm font-black uppercase border-[3px] border-[#1a1a2e] rounded-xl
                  shadow-[3px_3px_0_#1a1a2e]
                  hover:shadow-[5px_5px_0_#1a1a2e] hover:-translate-x-[1px] hover:-translate-y-[1px]
                  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                  transition-all duration-100"
              >
                StyleKit &rarr;
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
