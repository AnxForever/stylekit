"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const menuItems = [
  { label: "Battle", icon: "\u2694" },
  { label: "Item", icon: "⊕" },
  { label: "Magic", icon: "\u2726" },
  { label: "Status", icon: "\u2605" },
  { label: "Equip", icon: "◈" },
];

const characters = [
  {
    name: "Aria",
    level: 24,
    class: "White Mage",
    hp: 312,
    maxHp: 420,
    mp: 198,
    maxMp: 240,
    exp: 4850,
    nextExp: 6000,
    atk: 48,
    def: 72,
    mag: 110,
    spd: 64,
    portrait: "#1e40af",
    accent: "#60a5fa",
  },
  {
    name: "Zephyr",
    level: 26,
    class: "Dark Knight",
    hp: 478,
    maxHp: 520,
    mp: 88,
    maxMp: 160,
    exp: 5420,
    nextExp: 6500,
    atk: 132,
    def: 108,
    mag: 44,
    spd: 72,
    portrait: "#1e3a5f",
    accent: "#93c5fd",
  },
  {
    name: "Lumi",
    level: 22,
    class: "Summoner",
    hp: 224,
    maxHp: 380,
    mp: 310,
    maxMp: 360,
    exp: 3900,
    nextExp: 5500,
    atk: 36,
    def: 52,
    mag: 148,
    spd: 88,
    portrait: "#312e81",
    accent: "#a5b4fc",
  },
];

const colorPalette = [
  { name: "Deep Navy", hex: "#0f172a", role: "Background" },
  { name: "Royal Blue", hex: "#1e40af", role: "Primary Panel" },
  { name: "Gold", hex: "#fbbf24", role: "Accent / Cursor" },
  { name: "Crystal White", hex: "#f0f9ff", role: "Text / Highlight" },
  { name: "HP Green", hex: "#22c55e", role: "HP Bar" },
  { name: "MP Blue", hex: "#3b82f6", role: "MP Bar" },
  { name: "Danger Red", hex: "#ef4444", role: "Critical / Low HP" },
];

const rarityItems = [
  { name: "Iron Sword", rarity: "Common", color: "#94a3b8", bg: "#1e293b" },
  { name: "Mithril Shield", rarity: "Rare", color: "#60a5fa", bg: "#1e3a5f" },
  { name: "Flame Crystal", rarity: "Epic", color: "#a78bfa", bg: "#2d1b69" },
  { name: "Excalibur", rarity: "Legendary", color: "#fbbf24", bg: "#1c1500" },
];

const doRules = [
  "Use bevel button shadows: inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 0 rgba(0,0,0,0.8)",
  "Deep navy bg-[#0f172a] on all panels and the page background",
  "Gold #fbbf24 for cursor arrow, highlights, and active state indicators",
  "Double border: border-2 border-[#1e40af] with ring-1 ring-blue-400/20",
  "Corner ornaments: absolute divs with gold border-t-2 border-l-2 at all four corners",
  "font-mono for stat numbers, tracking-widest uppercase for section labels",
];

const dontRules = [
  "Never use bright or pastel backgrounds — JRPG panels live in deep navy darkness",
  "Never omit corner decorations — they define the ornate fantasy frame",
  "Never use rounded-full for panels — use sharp corners (rounded-none or rounded-sm)",
  "Never use sans-serif body weight for stat values — always font-mono",
  "Never use thin borders (border) — use border-2 for panel definition",
  "Never animate with slow transitions — button press should be duration-75 for snap feel",
];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
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
      { threshold: 0.15, ...options }
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
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/**
 * Four gold corner brackets, absolutely positioned inside parent.
 * Parent must have position:relative.
 */
function CornerOrnaments({ size = "w-4 h-4" }: { size?: string }) {
  return (
    <>
      <div
        className={`absolute top-0 left-0 ${size} border-t-2 border-l-2 border-[#fbbf24] pointer-events-none`}
      />
      <div
        className={`absolute top-0 right-0 ${size} border-t-2 border-r-2 border-[#fbbf24] pointer-events-none`}
      />
      <div
        className={`absolute bottom-0 left-0 ${size} border-b-2 border-l-2 border-[#fbbf24] pointer-events-none`}
      />
      <div
        className={`absolute bottom-0 right-0 ${size} border-b-2 border-r-2 border-[#fbbf24] pointer-events-none`}
      />
    </>
  );
}

/** RPG bevel panel wrapper */
function RPGPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative border-2 border-[#1e40af] ring-1 ring-blue-400/20 bg-gradient-to-b from-slate-800 to-slate-900 ${className}`}
    >
      <CornerOrnaments />
      {children}
    </div>
  );
}

/** HP / MP / EXP bar */
function StatBar({
  value,
  max,
  color,
  label,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-0.5">
        <span className="text-[10px] font-mono tracking-widest uppercase text-blue-300/60">
          {label}
        </span>
        <span className="text-[10px] font-mono text-blue-200/80">
          {value}/{max}
        </span>
      </div>
      <div className="h-2 bg-slate-900 border border-slate-700 relative overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

/** JRPG bevel button */
function RPGButton({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "gold" | "cancel";
  onClick?: () => void;
}) {
  const base =
    "relative px-6 py-2.5 font-mono text-sm tracking-widest uppercase border-2 transition-all duration-75 ease-linear select-none active:translate-y-[4px] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.6),0_0_0_rgba(0,0,0,0.8)] cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-b from-[#1e40af] to-[#1e3a8a] border-[#3b82f6] text-[#f0f9ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_0_rgba(0,0,0,0.8)] hover:from-[#2563eb] hover:to-[#1d4ed8]",
    gold: "bg-gradient-to-b from-[#d97706] to-[#b45309] border-[#fbbf24] text-[#0f172a] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_0_rgba(0,0,0,0.8)] hover:from-[#f59e0b] hover:to-[#d97706]",
    cancel:
      "bg-gradient-to-b from-[#374151] to-[#1f2937] border-[#6b7280] text-[#9ca3af] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_0_rgba(0,0,0,0.8)] hover:from-[#4b5563] hover:to-[#374151]",
  };

  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick}>
      <CornerOrnaments size="w-2 h-2" />
      {children}
    </button>
  );
}

/** Section header with ornate gold divider */
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <RevealBlock>
      <div className="mb-12">
        <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#fbbf24]/60 mb-2">
          {label}
        </p>
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-[#f0f9ff] tracking-wide mb-4">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-[#fbbf24]/60 to-transparent" />
          <div className="w-1.5 h-1.5 bg-[#fbbf24] rotate-45" />
          <div className="h-px w-8 bg-[#fbbf24]/40" />
          <div className="w-1 h-1 border border-[#fbbf24]/60 rotate-45" />
          <div className="h-px flex-1 bg-gradient-to-l from-[#fbbf24]/60 to-transparent" />
        </div>
      </div>
    </RevealBlock>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(0);
  const [activeChar, setActiveChar] = useState(0);
  const [activeRarity, setActiveRarity] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const currentChar = characters[activeChar];

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f0f9ff] font-mono overflow-x-hidden">

      {/* ================================================================
          1. FIXED NAV
          ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur-sm border-b-2 border-[#fbbf24]/40">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fbbf24]/60 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/styles"
              className="text-xs font-mono tracking-widest uppercase text-[#fbbf24] hover:text-[#fef3c7] transition-colors duration-150"
            >
              StyleKit →
            </Link>

            <div className="flex flex-col items-center">
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#fbbf24]/50 leading-none">
                Style
              </span>
              <span className="text-base font-bold tracking-[0.2em] uppercase text-[#f0f9ff]">
                日式RPG
              </span>
            </div>

            <Link
              href="/styles/jrpg"
              className="text-xs font-mono tracking-widest uppercase text-blue-400/50 hover:text-blue-300 transition-colors duration-150"
            >
              Docs
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fbbf24]/50 to-transparent pointer-events-none" />
      </header>

      {/* ================================================================
          2. HERO
          ================================================================ */}
      <section className="relative pt-32 pb-24 px-4 md:px-8 overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(30,64,175,0.25) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Hero title + lore */}
            <div>
              <p
                className="text-[10px] tracking-[0.5em] uppercase text-[#fbbf24]/60 mb-4"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.6s ease 0s",
                }}
              >
                StyleKit Design System
              </p>

              {/* Main title with gold glow */}
              <h1
                className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-2"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s",
                  textShadow:
                    "0 0 20px rgba(251,191,36,0.8), 0 0 60px rgba(251,191,36,0.3)",
                  color: "#fbbf24",
                }}
              >
                JRPG
              </h1>

              {/* Japanese subtitle */}
              <p
                className="text-xl md:text-2xl font-mono text-[#93c5fd] tracking-[0.15em] mb-6"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.12s",
                }}
              >
                日本語ロールプレイング
              </p>

              <p
                className="text-sm text-[#93c5fd]/70 leading-relaxed max-w-md mb-8"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s",
                }}
              >
                Classic JRPG menu and dialog UI — bevel borders with deep shadow,
                deep navy backgrounds, gold highlights, HP/MP status bars,
                ornate corner decorations, and the timeless fantasy aesthetic.
              </p>

              <div
                className="flex flex-wrap gap-4"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.34s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.34s",
                }}
              >
                <RPGButton variant="gold">New Game</RPGButton>
                <RPGButton variant="primary">Continue</RPGButton>
                <RPGButton variant="cancel">Options</RPGButton>
              </div>
            </div>

            {/* Right: Party status panel */}
            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
                transition:
                  "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s",
              }}
            >
              <RPGPanel className="p-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#1e40af]/60">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24]">
                    Party Status
                  </span>
                  <span className="text-[10px] text-blue-400/50 font-mono">
                    LV MAX: 99
                  </span>
                </div>

                <div className="space-y-4">
                  {characters.map((char) => (
                    <div
                      key={char.name}
                      className="p-3 bg-[#0f172a]/60 border border-[#1e40af]/40"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-bold text-[#f0f9ff] tracking-wide">
                            {char.name}
                          </span>
                          <span className="ml-2 text-[10px] text-[#93c5fd]/60">
                            {char.class}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#fbbf24]">
                          LV {char.level}
                        </span>
                      </div>
                      <StatBar
                        value={char.hp}
                        max={char.maxHp}
                        color="#22c55e"
                        label="HP"
                      />
                      <StatBar
                        value={char.mp}
                        max={char.maxMp}
                        color="#3b82f6"
                        label="MP"
                      />
                    </div>
                  ))}
                </div>
              </RPGPanel>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. MENU SYSTEM DEMO
          ================================================================ */}
      <section
        id="menu"
        className="py-24 md:py-32 px-4 md:px-8 border-t border-[#1e40af]/30"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="System — UI" title="Menu System" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Interactive menu */}
            <RevealBlock delay={0.05}>
              <div>
                <p className="text-xs text-[#93c5fd]/50 tracking-wider mb-6">
                  Hover or click to move the cursor
                </p>

                <RPGPanel className="p-2">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1e40af]/60 mb-1">
                    <div className="w-2 h-2 bg-[#fbbf24] rotate-45" />
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24]">
                      Command
                    </span>
                  </div>

                  <ul>
                    {menuItems.map((item, i) => (
                      <li key={item.label}>
                        <button
                          className={`w-full flex items-center gap-4 px-5 py-3 text-left transition-all duration-75 ease-linear ${
                            activeMenu === i
                              ? "bg-[#1e40af]/40 text-[#f0f9ff]"
                              : "text-[#93c5fd]/70 hover:bg-[#1e40af]/20 hover:text-[#f0f9ff]"
                          }`}
                          onMouseEnter={() => setActiveMenu(i)}
                          onClick={() => setActiveMenu(i)}
                        >
                          {/* Gold cursor — shown only when active, pure JS state */}
                          <span
                            className="text-[#fbbf24] font-bold text-base w-4 inline-block"
                            style={{
                              opacity: activeMenu === i ? 1 : 0,
                              textShadow:
                                activeMenu === i
                                  ? "0 0 8px rgba(251,191,36,0.8)"
                                  : "none",
                              transition: "opacity 0.08s ease",
                            }}
                          >
                            &#9654;
                          </span>

                          <span className="text-base w-6 text-center select-none">
                            {item.icon}
                          </span>

                          <span className="font-mono text-sm tracking-widest uppercase flex-1">
                            {item.label}
                          </span>

                          {activeMenu === i && (
                            <span className="text-[10px] text-[#fbbf24]/60 tracking-widest">
                              SELECT
                            </span>
                          )}
                        </button>

                        {i < menuItems.length - 1 && (
                          <div className="mx-4 h-px bg-[#1e40af]/30" />
                        )}
                      </li>
                    ))}
                  </ul>
                </RPGPanel>
              </div>
            </RevealBlock>

            {/* Menu description + spec panel */}
            <RevealBlock delay={0.1}>
              <div className="space-y-6">
                <RPGPanel className="p-5">
                  <div className="mb-3 pb-2 border-b border-[#1e40af]/50">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24]">
                      Selected
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">{menuItems[activeMenu].icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#f0f9ff] tracking-widest uppercase">
                        {menuItems[activeMenu].label}
                      </h3>
                      <p className="text-xs text-[#93c5fd]/50 mt-0.5">
                        Option {activeMenu + 1} of {menuItems.length}
                      </p>
                    </div>
                  </div>

                  {activeMenu === 0 && (
                    <p className="text-sm text-[#93c5fd]/70 leading-relaxed">
                      Initiate combat. Choose your party action: Attack, Defend,
                      Magic, or Item. Turn-based combat resolves by speed stat.
                    </p>
                  )}
                  {activeMenu === 1 && (
                    <p className="text-sm text-[#93c5fd]/70 leading-relaxed">
                      View and use items from the party inventory. Consumables
                      restore HP/MP. Key items advance the storyline.
                    </p>
                  )}
                  {activeMenu === 2 && (
                    <p className="text-sm text-[#93c5fd]/70 leading-relaxed">
                      Cast spells using MP. Magic is governed by the MAG stat.
                      Higher tiers require higher character levels to unlock.
                    </p>
                  )}
                  {activeMenu === 3 && (
                    <p className="text-sm text-[#93c5fd]/70 leading-relaxed">
                      View detailed character statistics, elemental affinities,
                      status effects, and current experience progress.
                    </p>
                  )}
                  {activeMenu === 4 && (
                    <p className="text-sm text-[#93c5fd]/70 leading-relaxed">
                      Manage equipment. Weapons raise ATK; armor raises DEF.
                      Accessories may grant elemental resistances or stat bonuses.
                    </p>
                  )}
                </RPGPanel>

                <RPGPanel className="p-4">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-[#fbbf24]/50 mb-3">
                    Implementation Notes
                  </p>
                  <ul className="space-y-2 text-xs text-[#93c5fd]/60">
                    <li className="flex gap-2">
                      <span className="text-[#fbbf24]">◆</span>
                      Gold cursor &#9654; uses pure JS activeMenu state — no CSS animation
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#fbbf24]">◆</span>
                      Active bg: bg-[#1e40af]/40 — royal blue tint
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#fbbf24]">◆</span>
                      Dividers: 1px border-[#1e40af]/30 between rows
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#fbbf24]">◆</span>
                      Transition duration-75 ease-linear for JRPG snap feel
                    </li>
                  </ul>
                </RPGPanel>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. CHARACTER STATUS
          ================================================================ */}
      <section
        id="status"
        className="py-24 md:py-32 px-4 md:px-8 border-t border-[#1e40af]/30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(30,64,175,0.12) 0%, transparent 60%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Party — Stats" title="Character Status" />

          {/* Character selector tabs */}
          <RevealBlock delay={0.04} className="mb-8">
            <div className="flex gap-2 flex-wrap">
              {characters.map((char, i) => (
                <button
                  key={char.name}
                  onClick={() => setActiveChar(i)}
                  className={`relative px-5 py-2 text-xs font-mono tracking-widest uppercase border-2 transition-all duration-75 ease-linear ${
                    activeChar === i
                      ? "border-[#fbbf24] bg-[#1e40af]/30 text-[#fbbf24] shadow-[0_0_12px_rgba(251,191,36,0.25)]"
                      : "border-[#1e40af]/60 text-[#93c5fd]/60 hover:border-[#3b82f6] hover:text-[#93c5fd]"
                  }`}
                >
                  {activeChar === i && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#fbbf24] text-xs">
                      ▼
                    </span>
                  )}
                  {char.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Active character detail */}
          <RevealBlock delay={0.08}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Portrait + identity */}
              <RPGPanel className="p-5 flex flex-col gap-4">
                <div
                  className="relative h-48 border-2 border-[#1e40af]/60 overflow-hidden flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to bottom, ${currentChar.portrait}, #0f172a)`,
                  }}
                >
                  <CornerOrnaments size="w-5 h-5" />
                  <div className="text-center">
                    <div
                      className="text-5xl font-bold mb-1"
                      style={{
                        color: currentChar.accent,
                        textShadow: `0 0 20px ${currentChar.accent}`,
                      }}
                    >
                      {currentChar.name[0]}
                    </div>
                    <div className="text-xs text-blue-300/50 tracking-widest">
                      Portrait
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-[#f0f9ff] tracking-wide">
                      {currentChar.name}
                    </h3>
                    <span
                      className="text-xs font-mono px-2 py-0.5 border"
                      style={{
                        borderColor: currentChar.accent,
                        color: currentChar.accent,
                        textShadow: `0 0 8px ${currentChar.accent}60`,
                      }}
                    >
                      LV {currentChar.level}
                    </span>
                  </div>
                  <p className="text-xs text-[#93c5fd]/50 tracking-widest uppercase">
                    {currentChar.class}
                  </p>
                </div>
              </RPGPanel>

              {/* Vital stats: HP/MP/EXP */}
              <RPGPanel className="p-5">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24] mb-5">
                  Vital Statistics
                </p>

                <StatBar
                  value={currentChar.hp}
                  max={currentChar.maxHp}
                  color="#22c55e"
                  label="HP"
                />
                <StatBar
                  value={currentChar.mp}
                  max={currentChar.maxMp}
                  color="#3b82f6"
                  label="MP"
                />

                {/* EXP bar — gold */}
                <div className="mb-2 mt-3">
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#fbbf24]/60">
                      EXP
                    </span>
                    <span className="text-[10px] font-mono text-[#fbbf24]/80">
                      {currentChar.exp}/{currentChar.nextExp}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-900 border border-slate-700 relative overflow-hidden">
                    <div
                      className="h-full bg-[#fbbf24] transition-all duration-500"
                      style={{
                        width: `${Math.round(
                          (currentChar.exp / currentChar.nextExp) * 100
                        )}%`,
                      }}
                    />
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                  </div>
                  <p className="text-[9px] text-[#fbbf24]/40 mt-0.5 text-right">
                    {currentChar.nextExp - currentChar.exp} to next level
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#1e40af]/40 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#22c55e]/60 mb-0.5">
                      HP Status
                    </p>
                    <p
                      className="text-xs font-mono"
                      style={{
                        color:
                          currentChar.hp / currentChar.maxHp < 0.25
                            ? "#ef4444"
                            : currentChar.hp / currentChar.maxHp < 0.5
                            ? "#f59e0b"
                            : "#22c55e",
                      }}
                    >
                      {currentChar.hp / currentChar.maxHp < 0.25
                        ? "CRITICAL"
                        : currentChar.hp / currentChar.maxHp < 0.5
                        ? "CAUTION"
                        : "NORMAL"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#3b82f6]/60 mb-0.5">
                      MP Status
                    </p>
                    <p
                      className="text-xs font-mono"
                      style={{
                        color:
                          currentChar.mp / currentChar.maxMp < 0.2
                            ? "#ef4444"
                            : "#3b82f6",
                      }}
                    >
                      {currentChar.mp / currentChar.maxMp < 0.2
                        ? "DEPLETED"
                        : "STABLE"}
                    </p>
                  </div>
                </div>
              </RPGPanel>

              {/* Battle parameters stat grid */}
              <RPGPanel className="p-5">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24] mb-5">
                  Battle Parameters
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "ATK", value: currentChar.atk, color: "#ef4444" },
                    { label: "DEF", value: currentChar.def, color: "#3b82f6" },
                    { label: "MAG", value: currentChar.mag, color: "#a78bfa" },
                    { label: "SPD", value: currentChar.spd, color: "#22c55e" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 bg-[#0f172a]/60 border border-[#1e40af]/40 flex flex-col"
                    >
                      <span
                        className="text-[10px] tracking-[0.3em] uppercase mb-1"
                        style={{ color: `${stat.color}99` }}
                      >
                        {stat.label}
                      </span>
                      <span
                        className="text-2xl font-bold font-mono"
                        style={{
                          color: stat.color,
                          textShadow: `0 0 10px ${stat.color}60`,
                        }}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-[#1e40af]/40">
                  <p className="text-[9px] uppercase tracking-widest text-blue-400/40 mb-3">
                    Element Resist
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {["Fire", "Ice", "Lit", "Wind"].map((el) => (
                      <span
                        key={el}
                        className="text-[9px] px-2 py-0.5 border border-[#1e40af]/60 text-blue-400/60 font-mono tracking-widest"
                      >
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
              </RPGPanel>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          5. COLOR SYSTEM
          ================================================================ */}
      <section
        id="colors"
        className="py-24 md:py-32 px-4 md:px-8 border-t border-[#1e40af]/30"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Design — Tokens" title="Color System" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {colorPalette.map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.05}>
                <div className="group flex flex-col">
                  <div
                    className="relative h-24 border-2 border-[#1e40af]/60 group-hover:border-[#fbbf24]/60 transition-colors duration-150 mb-3"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <CornerOrnaments size="w-2.5 h-2.5" />
                    {/* Scanline overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)",
                      }}
                    />
                  </div>
                  <p className="text-[10px] font-mono tracking-widest text-[#fbbf24] mb-0.5">
                    {swatch.hex}
                  </p>
                  <p className="text-[9px] tracking-wider uppercase text-[#93c5fd]/50 mb-0.5">
                    {swatch.name}
                  </p>
                  <p className="text-[9px] italic text-blue-400/30">
                    {swatch.role}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.3} className="mt-10">
            <RPGPanel className="p-5">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24] mb-4">
                Usage Principles
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#93c5fd]/60">
                <div className="flex gap-3">
                  <span className="text-[#fbbf24] mt-0.5">◆</span>
                  <span>
                    Gold #fbbf24 is reserved exclusively for cursor, active states,
                    and highlight text. Never use for body copy.
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#22c55e] mt-0.5">◆</span>
                  <span>
                    HP green #22c55e indicates health and positive status only.
                    When HP falls below 25%, switch to danger red #ef4444.
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#3b82f6] mt-0.5">◆</span>
                  <span>
                    MP blue #3b82f6 represents magical resource. Panel borders use
                    royal blue #1e40af at full opacity, not the brighter shade.
                  </span>
                </div>
              </div>
            </RPGPanel>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          6. COMPONENT SHOWCASE
          ================================================================ */}
      <section
        id="components"
        className="py-24 md:py-32 px-4 md:px-8 border-t border-[#1e40af]/30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(30,64,175,0.10) 0%, transparent 55%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Elements — UI" title="Component Showcase" />

          <div className="space-y-12">

            {/* Buttons */}
            <RevealBlock delay={0.04}>
              <RPGPanel className="p-6">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24] mb-5">
                  Button Variants
                </p>
                <div className="flex flex-wrap gap-5 items-end mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <RPGButton variant="gold">Attack!</RPGButton>
                    <span className="text-[9px] text-[#fbbf24]/40 tracking-wider">
                      Gold / Action
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <RPGButton variant="primary">Confirm</RPGButton>
                    <span className="text-[9px] text-blue-400/40 tracking-wider">
                      Primary / Select
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <RPGButton variant="cancel">Cancel</RPGButton>
                    <span className="text-[9px] text-slate-500/60 tracking-wider">
                      Cancel / Back
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#1e40af]/40">
                  <p className="text-[10px] text-[#93c5fd]/40 leading-relaxed">
                    All buttons:{" "}
                    <code className="text-[#fbbf24]/60">
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_0_rgba(0,0,0,0.8)]
                    </code>
                    {" "}+{" "}
                    <code className="text-[#fbbf24]/60">active:translate-y-[4px]</code>
                    {" "}at{" "}
                    <code className="text-[#fbbf24]/60">duration-75 ease-linear</code>
                  </p>
                </div>
              </RPGPanel>
            </RevealBlock>

            {/* Input field */}
            <RevealBlock delay={0.08}>
              <RPGPanel className="p-6">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24] mb-5">
                  Input Field — RPG Frame
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-[#93c5fd]/50 mb-2">
                      Character Name
                    </label>
                    <div className="relative border-2 border-[#1e40af] focus-within:border-[#fbbf24] transition-colors duration-150">
                      <CornerOrnaments size="w-2 h-2" />
                      <input
                        type="text"
                        placeholder="Enter name..."
                        className="w-full bg-[#0f172a] px-4 py-3 text-sm font-mono text-[#f0f9ff] placeholder-blue-400/30 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-[#93c5fd]/50 mb-2">
                      Class
                    </label>
                    <div className="relative border-2 border-[#1e40af] focus-within:border-[#fbbf24] transition-colors duration-150">
                      <CornerOrnaments size="w-2 h-2" />
                      <input
                        type="text"
                        placeholder="Select class..."
                        className="w-full bg-[#0f172a] px-4 py-3 text-sm font-mono text-[#f0f9ff] placeholder-blue-400/30 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[10px] text-[#93c5fd]/40 leading-relaxed">
                  Focus ring: border-[#fbbf24] transition-colors duration-150. Corner
                  ornaments remain gold on both states. bg-[#0f172a] inner background.
                </p>
              </RPGPanel>
            </RevealBlock>

            {/* Item rarity badges */}
            <RevealBlock delay={0.12}>
              <RPGPanel className="p-6">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24] mb-2">
                  Item Rarity Tags
                </p>
                <p className="text-[10px] text-[#93c5fd]/40 mb-5">
                  Click a rarity to highlight — tracks activeRarity state
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  {rarityItems.map((item) => (
                    <button
                      key={item.rarity}
                      onClick={() =>
                        setActiveRarity(
                          activeRarity === item.rarity ? null : item.rarity
                        )
                      }
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className="relative px-4 py-1.5 border-2 font-mono text-xs tracking-widest uppercase transition-all duration-75"
                        style={{
                          borderColor:
                            activeRarity === item.rarity
                              ? item.color
                              : `${item.color}50`,
                          color:
                            activeRarity === item.rarity
                              ? item.color
                              : `${item.color}80`,
                          backgroundColor:
                            activeRarity === item.rarity ? item.bg : "transparent",
                          boxShadow:
                            activeRarity === item.rarity
                              ? `0 0 12px ${item.color}40, inset 0 0 12px ${item.color}10`
                              : "none",
                          textShadow:
                            activeRarity === item.rarity
                              ? `0 0 8px ${item.color}80`
                              : "none",
                        }}
                      >
                        <CornerOrnaments size="w-1.5 h-1.5" />
                        {item.rarity}
                      </div>
                      <span
                        className="text-[10px] font-mono tracking-wide transition-colors duration-75"
                        style={{
                          color:
                            activeRarity === item.rarity ? item.color : "#4b5563",
                        }}
                      >
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#1e40af]/40 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {rarityItems.map((item) => (
                    <div key={item.rarity} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 border flex-shrink-0"
                        style={{
                          borderColor: item.color,
                          backgroundColor: `${item.color}20`,
                        }}
                      />
                      <span
                        className="text-[9px] font-mono tracking-wider"
                        style={{ color: `${item.color}80` }}
                      >
                        {item.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </RPGPanel>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================
          7. DO / DON'T RULES — Tutorial Dialog Style
          ================================================================ */}
      <section
        id="rules"
        className="py-24 md:py-32 px-4 md:px-8 border-t border-[#1e40af]/30"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Tutorial — Guide" title="Design Rules" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* DO column */}
            <RevealBlock delay={0.04}>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-[#22c55e] rotate-45" />
                  <span className="text-xs font-mono tracking-[0.35em] uppercase text-[#22c55e]">
                    Tutorial: Do
                  </span>
                </div>

                <RPGPanel className="p-0 overflow-hidden">
                  <div className="px-5 py-2.5 bg-[#22c55e]/10 border-b border-[#22c55e]/30 flex items-center gap-2">
                    <span className="text-[#22c55e] text-sm">&#9654;</span>
                    <span className="text-xs font-mono tracking-widest uppercase text-[#22c55e]">
                      Recommended Practices
                    </span>
                  </div>

                  <ul>
                    {doRules.map((rule, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 px-5 py-4 border-b border-[#1e40af]/30 last:border-b-0 hover:bg-[#22c55e]/5 transition-colors duration-75"
                      >
                        <span className="text-[#22c55e] font-bold text-xs mt-0.5 flex-shrink-0">
                          ◆
                        </span>
                        <span className="text-xs text-[#93c5fd]/70 leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="px-5 py-2.5 bg-[#0f172a]/50 border-t border-[#22c55e]/20 flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.3em] text-[#22c55e]/40">
                      PRESS &#9654; TO CONTINUE
                    </span>
                    <span className="text-[9px] text-[#22c55e]/30">
                      {doRules.length} entries
                    </span>
                  </div>
                </RPGPanel>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.08}>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-[#ef4444] rotate-45" />
                  <span className="text-xs font-mono tracking-[0.35em] uppercase text-[#ef4444]">
                    Warning: Avoid
                  </span>
                </div>

                <RPGPanel className="p-0 overflow-hidden">
                  <div className="px-5 py-2.5 bg-[#ef4444]/10 border-b border-[#ef4444]/30 flex items-center gap-2">
                    <span className="text-[#ef4444] text-sm">!</span>
                    <span className="text-xs font-mono tracking-widest uppercase text-[#ef4444]">
                      Common Mistakes
                    </span>
                  </div>

                  <ul>
                    {dontRules.map((rule, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 px-5 py-4 border-b border-[#1e40af]/30 last:border-b-0 hover:bg-[#ef4444]/5 transition-colors duration-75"
                      >
                        <span className="text-[#ef4444] font-bold text-xs mt-0.5 flex-shrink-0">
                          &#10005;
                        </span>
                        <span className="text-xs text-[#93c5fd]/60 leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="px-5 py-2.5 bg-[#0f172a]/50 border-t border-[#ef4444]/20 flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.3em] text-[#ef4444]/40">
                      HEED THESE WARNINGS
                    </span>
                    <span className="text-[9px] text-[#ef4444]/30">
                      {dontRules.length} entries
                    </span>
                  </div>
                </RPGPanel>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy callout */}
          <RevealBlock delay={0.15} className="mt-10">
            <RPGPanel className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-1">
                  <div className="w-px h-8 bg-[#fbbf24]/30" />
                  <div className="w-2 h-2 bg-[#fbbf24]/60 rotate-45" />
                  <div className="w-px h-8 bg-[#fbbf24]/30" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-[#fbbf24]/60 mb-2">
                    Design Philosophy
                  </p>
                  <p className="text-sm text-[#93c5fd]/70 leading-relaxed">
                    JRPG UI is defined by the tension between ornate decoration and
                    extreme clarity. Every element must feel as if it belongs inside
                    a 16-bit or 32-bit game engine — bevel shadows that suggest depth
                    on a flat screen, gold accents that whisper of treasure and legend,
                    and monospace fonts that communicate data with military precision.
                    The darkness of the navy background makes every gold highlight
                    shine like starlight on a crystal cave wall.
                  </p>
                </div>
              </div>
            </RPGPanel>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          8. FOOTER — GAME OVER / PRESS START STYLE
          ================================================================ */}
      <footer className="relative py-16 px-4 md:px-8 border-t-2 border-[#fbbf24]/30 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(30,64,175,0.18) 0%, transparent 60%)",
          }}
        />

        {/* Top ornament divider */}
        <div className="relative z-10 flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#fbbf24]/40" />
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#fbbf24]/40 rotate-45" />
            <div className="w-2 h-2 border border-[#fbbf24]/60 rotate-45" />
            <div className="w-1 h-1 bg-[#fbbf24]/40 rotate-45" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#fbbf24]/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* GAME OVER headline */}
          <div className="text-center mb-10">
            <p
              className="text-4xl md:text-5xl font-mono font-bold tracking-[0.3em] uppercase mb-2"
              style={{
                color: "#fbbf24",
                textShadow:
                  "0 0 20px rgba(251,191,36,0.6), 0 0 60px rgba(251,191,36,0.2)",
              }}
            >
              GAME OVER
            </p>
            <p className="text-sm font-mono tracking-[0.5em] uppercase text-[#93c5fd]/50">
              — Press Start to Continue —
            </p>
          </div>

          {/* Footer links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#fbbf24]/50 mb-3">
                Navigation
              </p>
              <ul className="space-y-2">
                {[
                  { label: "All Styles", href: "/styles" },
                  { label: "StyleKit", href: "/" },
                  { label: "JRPG Docs", href: "/styles/jrpg" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-mono text-[#93c5fd]/50 hover:text-[#fbbf24] transition-colors duration-150 tracking-wider flex items-center gap-1.5"
                    >
                      <span className="text-[#1e40af]">&#9654;</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#fbbf24]/50 mb-3">
                Sections
              </p>
              <ul className="space-y-2">
                {["Menu", "Status", "Colors", "Components", "Rules"].map((s) => (
                  <li key={s}>
                    <a
                      href={`#${s.toLowerCase()}`}
                      className="text-xs font-mono text-[#93c5fd]/50 hover:text-[#fbbf24] transition-colors duration-150 tracking-wider flex items-center gap-1.5"
                    >
                      <span className="text-[#1e40af]">&#9654;</span>
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#fbbf24]/50 mb-3">
                Party Stats
              </p>
              <ul className="space-y-2">
                {characters.map((c) => (
                  <li
                    key={c.name}
                    className="text-xs font-mono text-[#93c5fd]/40 flex items-center gap-1.5"
                  >
                    <span className="text-[8px]" style={{ color: c.accent }}>
                      &#9733;
                    </span>
                    {c.name} — LV {c.level}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#fbbf24]/50 mb-3">
                Design Tokens
              </p>
              <ul className="space-y-2">
                {colorPalette.slice(0, 4).map((c) => (
                  <li key={c.hex} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 border border-[#1e40af]/60 flex-shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[9px] font-mono text-[#93c5fd]/40">
                      {c.hex}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom ornament divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#fbbf24]/30" />
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-[#fbbf24]/30 rotate-45" />
              <div className="w-2 h-2 border border-[#fbbf24]/40 rotate-45" />
              <div className="w-1 h-1 bg-[#fbbf24]/30 rotate-45" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#fbbf24]/30" />
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-mono text-[#93c5fd]/30 tracking-widest">
            <span>&copy; 2025 StyleKit Guild — All Rights Reserved</span>
            <span
              className="text-[#fbbf24]/30"
              style={{ textShadow: "0 0 8px rgba(251,191,36,0.2)" }}
            >
              日式RPG Design System
            </span>
            <span>Version 1.0.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
