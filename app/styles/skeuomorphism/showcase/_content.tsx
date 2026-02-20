"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Skeuomorphic Sub-components ──────────────────────────────────────────────

function SkeuButton({
  children,
  variant = "metal",
  size = "md",
  onClick,
  pressed = false,
}: {
  children: React.ReactNode;
  variant?: "metal" | "leather" | "wood" | "green" | "blue";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  pressed?: boolean;
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const variantClasses = {
    metal:
      "bg-gradient-to-b from-[#e8e8e8] via-[#d0d0d0] to-[#b8b8b8] border border-[#888] text-[#444] shadow-[0_4px_8px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.14)] hover:from-[#f0f0f0] hover:via-[#d8d8d8] hover:to-[#c0c0c0]",
    leather:
      "bg-gradient-to-b from-[#a0855e] via-[#8b7355] to-[#6b5535] border border-[#5c4033] text-[#f5f0e8] shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.25)] hover:from-[#b0956e] hover:via-[#9b8365] hover:to-[#7b6545]",
    wood: "bg-gradient-to-b from-[#e8d5a8] via-[#d4c4a8] to-[#b8a878] border border-[#8b7355] text-[#5c4033] shadow-[0_4px_8px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.15)] hover:from-[#f0e0b8] hover:via-[#e0d0b8] hover:to-[#c8b488]",
    green:
      "bg-gradient-to-b from-[#4a8c5c] via-[#2e5a3c] to-[#1e3a2c] border border-[#1a3028] text-[#c8f0d8] shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.25)] hover:from-[#5a9c6c] hover:via-[#3e6a4c] hover:to-[#2e4a3c]",
    blue: "bg-gradient-to-b from-[#5b9bd5] via-[#3a7fc1] to-[#2860a0] border border-[#1a508a] text-white shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.2)] hover:from-[#6baae0] hover:via-[#4a8fd1] hover:to-[#3870b0]",
  };

  const pressedStyle = pressed
    ? "translate-y-[2px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2)] brightness-95"
    : "";

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${pressedStyle} font-bold rounded-lg transition-all duration-75 active:translate-y-[2px] active:brightness-95 active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2)] select-none`}
    >
      {children}
    </button>
  );
}

function ToggleSwitch({
  enabled,
  onToggle,
  label,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="font-medium text-[#5c4033]" style={{ textShadow: "0 1px 0 rgba(255,255,255,0.7)" }}>
        {label}
      </span>
      <button
        onClick={onToggle}
        className={`relative w-14 h-8 rounded-full transition-all duration-200 shadow-[inset_0_2px_5px_rgba(0,0,0,0.3),inset_0_-1px_0_rgba(255,255,255,0.15)] ${
          enabled
            ? "bg-gradient-to-b from-[#4a8c5c] to-[#2e5a3c]"
            : "bg-gradient-to-b from-[#b0a090] to-[#8a7a6a]"
        }`}
        aria-pressed={enabled}
      >
        <div
          className={`absolute top-1 w-6 h-6 rounded-full bg-gradient-to-b from-[#f5f5f0] to-[#d8d0c8] shadow-[0_2px_5px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-200 ${
            enabled ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function MaterialCard({
  title,
  subtitle,
  material,
  children,
}: {
  title: string;
  subtitle: string;
  material: "leather" | "wood" | "metal" | "paper";
  children?: React.ReactNode;
}) {
  const materialStyles = {
    leather: {
      outer:
        "bg-gradient-to-b from-[#a0855e] via-[#8b7355] to-[#7a6248] border border-[#5c4033] shadow-[0_8px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.2)]",
      inner:
        "bg-gradient-to-b from-[#c8a87a] to-[#b89060] border border-[#a07848] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.15)]",
      title: "text-[#f5f0e8]",
      subtitle: "text-[#d4c4a8]",
      texture:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.03) 8px, rgba(0,0,0,0.03) 9px)",
    },
    wood: {
      outer:
        "bg-gradient-to-b from-[#e8d5a8] via-[#d4c085] to-[#c0a860] border border-[#8b7040] shadow-[0_8px_20px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.15)]",
      inner:
        "bg-gradient-to-b from-[#f0e0b0] to-[#e0c890] border border-[#b09050] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.3)]",
      title: "text-[#5c4033]",
      subtitle: "text-[#7a5a3a]",
      texture:
        "repeating-linear-gradient(5deg, transparent, transparent 12px, rgba(101,67,33,0.06) 12px, rgba(101,67,33,0.06) 13px), repeating-linear-gradient(-3deg, transparent, transparent 20px, rgba(101,67,33,0.04) 20px, rgba(101,67,33,0.04) 21px)",
    },
    metal: {
      outer:
        "bg-gradient-to-b from-[#e0e0e0] via-[#c8c8c8] to-[#b0b0b0] border border-[#888] shadow-[0_8px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.15)]",
      inner:
        "bg-gradient-to-b from-[#f0f0f0] to-[#d8d8d8] border border-[#aaa] shadow-[inset_0_2px_4px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.7)]",
      title: "text-[#333]",
      subtitle: "text-[#666]",
      texture:
        "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 3px)",
    },
    paper: {
      outer:
        "bg-gradient-to-b from-[#faf8f0] via-[#f5f0e0] to-[#ede8d0] border border-[#d0c8a8] shadow-[0_8px_20px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.08)]",
      inner:
        "bg-gradient-to-b from-[#ffffff] to-[#f8f5e8] border border-[#e0d8c0] shadow-[inset_0_1px_3px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.9)]",
      title: "text-[#5c4033]",
      subtitle: "text-[#8b7355]",
      texture:
        "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(180,160,100,0.08) 27px, rgba(180,160,100,0.08) 28px)",
    },
  };

  const s = materialStyles[material];

  return (
    <div className={`group p-1.5 rounded-2xl ${s.outer} relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_14px_28px_rgba(0,0,0,0.4)]`}>
      <div
        className="absolute inset-0 pointer-events-none opacity-100 rounded-2xl"
        style={{ backgroundImage: s.texture }}
      />
      <div className={`relative rounded-xl p-5 ${s.inner}`}>
        <p className={`text-xs font-bold uppercase tracking-widest mb-2 opacity-70 ${s.subtitle}`}>
          {subtitle}
        </p>
        <h3 className={`text-xl font-bold mb-3 ${s.title}`} style={{ textShadow: "0 1px 0 rgba(255,255,255,0.15)" }}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

// ─── Main Showcase ─────────────────────────────────────────────────────────────

export default function SkeuomorphismShowcase() {
  // Toggle switch states
  const [toggleStates, setToggleStates] = useState({
    wifi: true,
    bluetooth: false,
    notifications: true,
    darkMode: false,
  });

  // Pressed button demo state
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  // Volume knob (0–100)
  const [volume, setVolume] = useState(65);

  // Accordion open state
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // Active tab state
  const [activeTab, setActiveTab] = useState(0);

  // Hero reveal
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleToggle = (key: keyof typeof toggleStates) => {
    setToggleStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleButtonPress = (id: string) => {
    setPressedButton(id);
    setTimeout(() => setPressedButton(null), 220);
  };

  const accordionItems = [
    {
      title: "What is Skeuomorphism?",
      content:
        "Skeuomorphism is a design paradigm where digital UI elements mimic their real-world counterparts through realistic textures, lighting, shadows, and materials. The goal is familiarity: users instantly know how to interact with a leather notebook or a metal toggle because they already know those objects.",
    },
    {
      title: "Light Source Discipline",
      content:
        "Every surface assumes a single light source emanating from the upper-left. Top edges receive highlights (inset 0 1px 0 rgba(255,255,255,0.8)) and bottom edges receive darkening (inset 0 -1px 0 rgba(0,0,0,0.15)). Breaking this rule shatters the illusion of physicality.",
    },
    {
      title: "Tactile Press Feedback",
      content:
        "Buttons and switches must depress visually on activation: translateY(2px), reduced outer shadow, and deepened inner shadow simulate real mechanical resistance. The transition should be short (75ms) to feel snappy, not sluggish.",
    },
    {
      title: "Texture Over Flatness",
      content:
        "CSS repeating-linear-gradient patterns approximate leather grain, wood rings, brushed metal, and paper fibers without external images. Overlaid at low opacity (3–8%), they add depth without overwhelming the content.",
    },
  ];

  const materialTabs = [
    { label: "Leather", key: "leather" as const },
    { label: "Wood", key: "wood" as const },
    { label: "Metal", key: "metal" as const },
    { label: "Paper", key: "paper" as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d4c4a8] via-[#c8b898] to-[#b8a888] text-[#3d2f1f]">

      {/* Global texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 4px)",
          opacity: 1,
        }}
      />

      {/* ── 1. NAVIGATION BAR ──────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 px-6 py-0 bg-gradient-to-b from-[#e8dfc8] to-[#d4c8a8] border-b-2 border-[#b0a080] shadow-[0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.7)]">
        {/* Stitching line */}
        <div
          className="absolute top-1.5 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 6px, rgba(101,67,33,0.25) 6px, rgba(101,67,33,0.25) 10px)",
          }}
        />
        <div className="absolute bottom-1.5 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 6px, rgba(101,67,33,0.2) 6px, rgba(101,67,33,0.2) 10px)",
          }}
        />

        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          <Link
            href="/styles/skeuomorphism"
            className="group flex items-center gap-2 text-[#5c4033] hover:text-[#3d2010] transition-colors"
          >
            <span
              className="w-8 h-8 flex items-center justify-center bg-gradient-to-b from-[#e0d0b0] to-[#c8b890] rounded-lg border border-[#a09060] shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.6)] group-hover:shadow-[0_3px_6px_rgba(0,0,0,0.25)] transition-all group-active:translate-y-px"
              style={{ fontSize: "1rem" }}
            >
              ←
            </span>
            <span className="text-sm font-semibold hidden md:block" style={{ textShadow: "0 1px 0 rgba(255,255,255,0.6)" }}>
              Back to Docs
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-b from-[#c9a227] to-[#a07818] rounded-full border border-[#806010] shadow-[0_3px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]" />
            <span
              className="font-black text-xl tracking-wider text-[#3d2010] uppercase"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.2)" }}
            >
              Skeuomorphism
            </span>
          </div>

          <Link
            href="/styles"
            className="px-5 py-2 bg-gradient-to-b from-[#e0d0b0] to-[#c8b890] text-[#5c4033] text-sm font-bold rounded-lg border border-[#a09060] shadow-[0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.65)] hover:from-[#e8d8b8] hover:to-[#d0c098] active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.18)] transition-all"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* ── 2. HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-20 pb-24 px-6 text-center overflow-hidden">
        {/* Wood-plank background strip */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(4deg, transparent 0px, transparent 40px, rgba(101,67,33,0.07) 40px, rgba(101,67,33,0.07) 41px), repeating-linear-gradient(-2deg, transparent 0px, transparent 70px, rgba(180,140,80,0.05) 70px, rgba(180,140,80,0.05) 71px)",
          }}
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Badge */}
          <div
            className="inline-block px-5 py-2 mb-8 bg-gradient-to-b from-[#c9a227] to-[#a07818] rounded-full border border-[#806010] text-[#fff8e0] text-sm font-bold uppercase tracking-widest"
            style={{
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(-16px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            Design Philosophy
          </div>

          {/* Main heading */}
          <h1
            className="text-5xl md:text-8xl font-black text-[#3d2010] mb-6 leading-none tracking-tight"
            style={{
              textShadow: "0 2px 0 rgba(255,255,255,0.45), 0 4px 12px rgba(0,0,0,0.2)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            Skeuo&shy;morphism
          </h1>

          {/* Sub-heading */}
          <p
            className="text-lg md:text-xl text-[#6b4f35] max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{
              textShadow: "0 1px 0 rgba(255,255,255,0.5)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            }}
          >
            Digital meets physical — realistic textures, tactile feedback, and familiar metaphors borrowed from the material world.
          </p>

          {/* Hero CTA panel — leather-framed */}
          <div
            className="inline-flex flex-wrap gap-4 justify-center p-6 bg-gradient-to-b from-[#a0855e] to-[#7a6045] rounded-2xl border-2 border-[#5c4033] relative overflow-hidden"
            style={{
              boxShadow:
                "0 12px 28px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.2)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
            }}
          >
            {/* Leather grain */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px), repeating-linear-gradient(90deg, transparent 0, transparent 8px, rgba(0,0,0,0.025) 8px, rgba(0,0,0,0.025) 9px)",
              }}
            />
            {/* Stitching */}
            <div
              className="absolute top-2 left-0 right-0 h-px pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(90deg, transparent 0, transparent 5px, rgba(255,255,255,0.2) 5px, rgba(255,255,255,0.2) 9px)",
              }}
            />
            <div
              className="absolute bottom-2 left-0 right-0 h-px pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(90deg, transparent 0, transparent 5px, rgba(255,255,255,0.2) 5px, rgba(255,255,255,0.2) 9px)",
              }}
            />

            <SkeuButton variant="blue" size="lg" onClick={() => handleButtonPress("hero-cta")} pressed={pressedButton === "hero-cta"}>
              Get Started
            </SkeuButton>
            <SkeuButton variant="metal" size="lg" onClick={() => handleButtonPress("hero-learn")} pressed={pressedButton === "hero-learn"}>
              Learn More
            </SkeuButton>
          </div>
        </div>
      </section>

      {/* ── 3. COMPONENT DEMOS: BUTTONS ────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3">
              Component Library
            </p>
            <h2
              className="text-4xl font-black text-[#3d2010]"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
            >
              Buttons &amp; Controls
            </h2>
            <p className="mt-3 text-[#6b4f35] max-w-lg mx-auto">
              Every button depresses on press. Every highlight stays fixed at the top. Every shadow deepens on activation.
            </p>
          </RevealBlock>

          {/* Button variants */}
          <RevealBlock delay={0.1}>
            <div
              className="p-8 rounded-2xl bg-gradient-to-b from-[#e8dfc8] to-[#d4c8a8] border border-[#b0a080] mb-6 relative overflow-hidden"
              style={{
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(5deg, transparent 0, transparent 15px, rgba(101,67,33,0.04) 15px, rgba(101,67,33,0.04) 16px)",
                }}
              />
              <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-6 relative">
                Material Variants
              </p>
              <div className="flex flex-wrap gap-4 relative">
                <SkeuButton variant="metal" onClick={() => handleButtonPress("v-metal")} pressed={pressedButton === "v-metal"}>
                  Metal
                </SkeuButton>
                <SkeuButton variant="leather" onClick={() => handleButtonPress("v-leather")} pressed={pressedButton === "v-leather"}>
                  Leather
                </SkeuButton>
                <SkeuButton variant="wood" onClick={() => handleButtonPress("v-wood")} pressed={pressedButton === "v-wood"}>
                  Wood
                </SkeuButton>
                <SkeuButton variant="green" onClick={() => handleButtonPress("v-green")} pressed={pressedButton === "v-green"}>
                  Baize
                </SkeuButton>
                <SkeuButton variant="blue" onClick={() => handleButtonPress("v-blue")} pressed={pressedButton === "v-blue"}>
                  Cobalt
                </SkeuButton>
              </div>
            </div>
          </RevealBlock>

          {/* Size variants */}
          <RevealBlock delay={0.2}>
            <div
              className="p-8 rounded-2xl bg-gradient-to-b from-[#f5f0e0] to-[#e8e0c8] border border-[#c8b890] relative overflow-hidden"
              style={{
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.08)",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(180,160,100,0.08) 27px, rgba(180,160,100,0.08) 28px)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-6">
                Size Scale
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <SkeuButton variant="leather" size="sm" onClick={() => handleButtonPress("s-sm")} pressed={pressedButton === "s-sm"}>
                  Small
                </SkeuButton>
                <SkeuButton variant="leather" size="md" onClick={() => handleButtonPress("s-md")} pressed={pressedButton === "s-md"}>
                  Medium
                </SkeuButton>
                <SkeuButton variant="leather" size="lg" onClick={() => handleButtonPress("s-lg")} pressed={pressedButton === "s-lg"}>
                  Large
                </SkeuButton>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 4. MATERIAL PALETTE SECTION ────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3">
              Material World
            </p>
            <h2
              className="text-4xl font-black text-[#3d2010]"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
            >
              Textures &amp; Surfaces
            </h2>
            <p className="mt-3 text-[#6b4f35] max-w-lg mx-auto">
              Four foundational materials, each with its own grain, light response, and emotional register.
            </p>
          </RevealBlock>

          {/* Material tab selector */}
          <RevealBlock delay={0.1} className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {materialTabs.map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-2.5 font-bold text-sm rounded-lg border transition-all duration-100 ${
                    activeTab === i
                      ? "bg-gradient-to-b from-[#a0855e] to-[#7a6045] text-[#f5f0e8] border-[#5c4033] shadow-[0_3px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] translate-y-px"
                      : "bg-gradient-to-b from-[#e8dfc8] to-[#d4c8a8] text-[#5c4033] border-[#b0a080] shadow-[0_3px_6px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.6)] hover:from-[#f0e7d0] hover:to-[#dcd0b8]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Active material card */}
          <RevealBlock delay={0.2}>
            <MaterialCard
              title={materialTabs[activeTab].label + " Surface"}
              subtitle={`Material · ${materialTabs[activeTab].label}`}
              material={materialTabs[activeTab].key}
            >
              <div className="space-y-3 mt-2">
                <p className="text-sm opacity-80 leading-relaxed">
                  {materialTabs[activeTab].key === "leather" &&
                    "Rich, warm hide with cross-hatched grain. Gains character with age. Stitched edges at 6px dashes reinforce the craft aesthetic."}
                  {materialTabs[activeTab].key === "wood" &&
                    "Warm golden-brown rings flowing at a slight diagonal. Each layer adds warmth. Works best when paired with brass hardware accents."}
                  {materialTabs[activeTab].key === "metal" &&
                    "Brushed aluminium with fine horizontal striations. Reflects light evenly. Cold to the eye, precise to the touch."}
                  {materialTabs[activeTab].key === "paper" &&
                    "Cream-tinted linen paper with ruled baseline grid. Tactile without overwhelming. The foundation of note-taking and document UIs."}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {materialTabs[activeTab].key === "leather" && (
                    <>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.15)] text-[#f5f0e8]">#8b7355</span>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.15)] text-[#f5f0e8]">#5c4033</span>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.15)] text-[#f5f0e8]">#c9a227</span>
                    </>
                  )}
                  {materialTabs[activeTab].key === "wood" && (
                    <>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.12)] text-[#5c4033]">#d4c4a8</span>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.12)] text-[#5c4033]">#8b7040</span>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.12)] text-[#5c4033]">#c0a860</span>
                    </>
                  )}
                  {materialTabs[activeTab].key === "metal" && (
                    <>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.1)] text-[#444]">#c8c8c8</span>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.1)] text-[#444]">#e8e8e8</span>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.1)] text-[#444]">#888888</span>
                    </>
                  )}
                  {materialTabs[activeTab].key === "paper" && (
                    <>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.08)] text-[#5c4033]">#f5f5dc</span>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.08)] text-[#5c4033]">#e8e0c0</span>
                      <span className="px-3 py-1 text-xs font-bold rounded bg-[rgba(0,0,0,0.08)] text-[#5c4033]">#d0c8a0</span>
                    </>
                  )}
                </div>
              </div>
            </MaterialCard>
          </RevealBlock>

          {/* Color swatches grid */}
          <RevealBlock delay={0.3} className="mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Leather Brown", hex: "#8b7355", from: "from-[#a0855e]", to: "to-[#7a6045]", text: "text-[#f5f0e8]" },
                { name: "Aged Wood", hex: "#d4c4a8", from: "from-[#e8d5a8]", to: "to-[#c0a860]", text: "text-[#5c4033]" },
                { name: "Old Gold", hex: "#c9a227", from: "from-[#e0b830]", to: "to-[#a07818]", text: "text-[#fff8e0]" },
                { name: "Dark Brown", hex: "#5c4033", from: "from-[#7a5040]", to: "to-[#3d2010]", text: "text-[#d4c4a8]" },
                { name: "Forest Green", hex: "#2e5a3c", from: "from-[#4a8c5c]", to: "to-[#1a3a28]", text: "text-[#c8f0d8]" },
                { name: "Brushed Steel", hex: "#c0c0c0", from: "from-[#e0e0e0]", to: "to-[#a8a8a8]", text: "text-[#444]" },
                { name: "Antique Brass", hex: "#b87333", from: "from-[#d09048]", to: "to-[#906020]", text: "text-[#fff0d0]" },
                { name: "Cream Paper", hex: "#f5f5dc", from: "from-[#fafae8]", to: "to-[#e8e0c0]", text: "text-[#5c4033]" },
              ].map((swatch) => (
                <div
                  key={swatch.hex}
                  className={`group p-4 rounded-xl bg-gradient-to-b ${swatch.from} ${swatch.to} border border-[rgba(0,0,0,0.2)] cursor-pointer transition-all duration-200 hover:scale-[1.03]`}
                  style={{
                    boxShadow:
                      "0 4px 10px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)",
                  }}
                >
                  <p className={`text-xs font-bold ${swatch.text} opacity-90`}>{swatch.name}</p>
                  <p className={`font-mono text-xs mt-1 ${swatch.text} opacity-60`}>{swatch.hex}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 5. INTERACTIVE CONTROL PANEL ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3">
              Physical Controls
            </p>
            <h2
              className="text-4xl font-black text-[#3d2010]"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
            >
              Control Panel
            </h2>
            <p className="mt-3 text-[#6b4f35] max-w-lg mx-auto">
              Toggle switches, sliders, and steppers that behave like their physical counterparts.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Toggle switches panel */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 rounded-2xl bg-gradient-to-b from-[#484038] to-[#302820] border border-[#201810] relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 12px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4)",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
                }}
              >
                {/* Panel screws */}
                {[
                  "top-3 left-3",
                  "top-3 right-3",
                  "bottom-3 left-3",
                  "bottom-3 right-3",
                ].map((pos) => (
                  <div
                    key={pos}
                    className={`absolute ${pos} w-4 h-4 rounded-full bg-gradient-to-b from-[#888] to-[#555] shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-px bg-[rgba(0,0,0,0.4)] rotate-45" />
                    </div>
                  </div>
                ))}

                <p
                  className="text-xs font-bold uppercase tracking-widest text-[#c9a227] mb-6"
                  style={{ textShadow: "0 0 8px rgba(201,162,39,0.5)" }}
                >
                  System Settings
                </p>

                <div className="space-y-1 divide-y divide-[rgba(255,255,255,0.06)]">
                  {(
                    [
                      { key: "wifi", label: "Wi-Fi" },
                      { key: "bluetooth", label: "Bluetooth" },
                      { key: "notifications", label: "Notifications" },
                      { key: "darkMode", label: "Dark Mode" },
                    ] as { key: keyof typeof toggleStates; label: string }[]
                  ).map(({ key, label }) => (
                    <div key={key} className="py-1">
                      <ToggleSwitch
                        enabled={toggleStates[key]}
                        onToggle={() => handleToggle(key)}
                        label={label}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Volume slider panel */}
            <RevealBlock delay={0.2}>
              <div
                className="p-8 rounded-2xl bg-gradient-to-b from-[#e0e0e0] to-[#c8c8c8] border border-[#a0a0a0] relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 12px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.15)",
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 3px)",
                }}
              >
                {/* Panel screws */}
                {[
                  "top-3 left-3",
                  "top-3 right-3",
                  "bottom-3 left-3",
                  "bottom-3 right-3",
                ].map((pos) => (
                  <div
                    key={pos}
                    className={`absolute ${pos} w-4 h-4 rounded-full bg-gradient-to-b from-[#d0d0d0] to-[#a0a0a0] shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.7)]`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-px bg-[rgba(0,0,0,0.3)]" />
                    </div>
                  </div>
                ))}

                <p className="text-xs font-bold uppercase tracking-widest text-[#666] mb-6">
                  Audio Controls
                </p>

                {/* Volume label + value */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-[#444]" style={{ textShadow: "0 1px 0 rgba(255,255,255,0.8)" }}>
                    Volume
                  </span>
                  <span
                    className="font-mono font-bold text-2xl text-[#333]"
                    style={{ textShadow: "0 1px 0 rgba(255,255,255,0.7)" }}
                  >
                    {volume}
                  </span>
                </div>

                {/* Track */}
                <div
                  className="h-8 rounded-full relative mb-6 overflow-hidden"
                  style={{
                    background: "linear-gradient(to bottom, #a0a0a0, #b8b8b8)",
                    boxShadow: "inset 0 3px 6px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  {/* Fill */}
                  <div
                    className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-150"
                    style={{
                      width: `${volume}%`,
                      background: "linear-gradient(to bottom, #5b9bd5, #2860a0)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)",
                    }}
                  />
                  {/* Thumb knob */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full transition-all duration-150"
                    style={{
                      left: `calc(${volume}% - 14px)`,
                      background: "linear-gradient(160deg, #f8f8f8 0%, #d0d0d0 60%, #b8b8b8 100%)",
                      boxShadow:
                        "0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.15)",
                    }}
                  />
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full opacity-0 absolute"
                  style={{ height: "2rem", marginTop: "-4.5rem", cursor: "pointer" }}
                />

                {/* Tick marks */}
                <div className="flex justify-between px-1 mt-1">
                  {[0, 25, 50, 75, 100].map((v) => (
                    <span key={v} className="text-xs text-[#888] font-mono">
                      {v}
                    </span>
                  ))}
                </div>

                {/* Preset buttons */}
                <div className="flex gap-2 mt-6">
                  {[0, 25, 50, 75, 100].map((v) => (
                    <button
                      key={v}
                      onClick={() => setVolume(v)}
                      className="flex-1 py-2 text-xs font-bold rounded-lg bg-gradient-to-b from-[#d8d8d8] to-[#b8b8b8] border border-[#999] text-[#555] shadow-[0_2px_4px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.8)] active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] transition-all"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── 6. DESIGN RULES: DO / DON'T ───────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3">
              Design System
            </p>
            <h2
              className="text-4xl font-black text-[#3d2010]"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
            >
              Rules of the Craft
            </h2>
            <p className="mt-3 text-[#6b4f35] max-w-lg mx-auto">
              Skeuomorphism is governed by physical laws. Break them, and the illusion collapses.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DO list */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 rounded-2xl bg-gradient-to-b from-[#e8f5ec] to-[#d0e8d8] border-2 border-[#2e5a3c] relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 10px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.08)",
                }}
              >
                {/* Stitched border */}
                <div
                  className="absolute inset-2 rounded-xl pointer-events-none"
                  style={{
                    border: "1px dashed rgba(46,90,60,0.35)",
                  }}
                />
                <div className="flex items-center gap-3 mb-6 relative">
                  <div
                    className="w-9 h-9 rounded-full bg-gradient-to-b from-[#4a8c5c] to-[#1e3a28] flex items-center justify-center font-black text-white text-lg"
                    style={{
                      boxShadow:
                        "0 3px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25)",
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    className="text-xl font-black text-[#2e5a3c]"
                    style={{ textShadow: "0 1px 0 rgba(255,255,255,0.6)" }}
                  >
                    Do
                  </h3>
                </div>
                <ul className="space-y-4 relative">
                  {[
                    "Use real material textures — leather, wood, metal",
                    "Add realistic light and shadow effects",
                    "Simulate physical button press feedback",
                    "Use gradients to create convincing depth",
                    "Add fine edge highlights on raised surfaces",
                    "Mirror real-world object proportions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-b from-[#4a8c5c] to-[#2e5a3c] flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{
                          boxShadow: "0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                        }}
                      >
                        ✓
                      </span>
                      <span className="text-[#2e5a3c] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T list */}
            <RevealBlock delay={0.2}>
              <div
                className="p-8 rounded-2xl bg-gradient-to-b from-[#fae8e8] to-[#f0d0d0] border-2 border-[#8b3020] relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 10px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.08)",
                }}
              >
                {/* Stitched border */}
                <div
                  className="absolute inset-2 rounded-xl pointer-events-none"
                  style={{
                    border: "1px dashed rgba(139,48,32,0.35)",
                  }}
                />
                <div className="flex items-center gap-3 mb-6 relative">
                  <div
                    className="w-9 h-9 rounded-full bg-gradient-to-b from-[#c04838] to-[#8b1010] flex items-center justify-center font-black text-white text-lg"
                    style={{
                      boxShadow:
                        "0 3px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25)",
                    }}
                  >
                    ✕
                  </div>
                  <h3
                    className="text-xl font-black text-[#8b2010]"
                    style={{ textShadow: "0 1px 0 rgba(255,255,255,0.6)" }}
                  >
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-4 relative">
                  {[
                    "Use pure flat solid color blocks",
                    "Omit shadows and highlights",
                    "Use overly simplified, flat icons",
                    "Ignore material detail and grain",
                    "Mix inconsistent light source directions",
                    "Skip the pressed/active state feedback",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-b from-[#c04838] to-[#8b1010] flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{
                          boxShadow: "0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                        }}
                      >
                        ✕
                      </span>
                      <span className="text-[#8b2010] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── 7. TYPOGRAPHY SECTION ──────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3">
              Typography
            </p>
            <h2
              className="text-4xl font-black text-[#3d2010]"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
            >
              Letterforms &amp; Hierarchy
            </h2>
            <p className="mt-3 text-[#6b4f35] max-w-lg mx-auto">
              Text in skeuomorphic interfaces carries shadow and embossing, anchoring it in the material world.
            </p>
          </RevealBlock>

          {/* Type specimens on paper texture */}
          <RevealBlock delay={0.1}>
            <div
              className="p-10 rounded-2xl relative overflow-hidden"
              style={{
                background: "linear-gradient(to bottom, #fafae8, #f0ead8)",
                boxShadow:
                  "0 10px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)",
                border: "1px solid #d0c8a0",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(180,160,100,0.12) 27px, rgba(180,160,100,0.12) 28px)",
              }}
            >
              {/* Left margin rule */}
              <div
                className="absolute left-16 top-0 bottom-0 w-px"
                style={{ background: "rgba(200,100,100,0.25)" }}
              />

              <div className="pl-10 space-y-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3 opacity-70">
                    Display — 72px / Black
                  </p>
                  <p
                    className="text-6xl font-black text-[#3d2010] leading-none"
                    style={{
                      textShadow: "0 2px 0 rgba(255,255,255,0.55), 0 3px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    Aa
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-2 opacity-70">
                    Heading 1 — 36px / Bold
                  </p>
                  <p
                    className="text-4xl font-bold text-[#3d2010]"
                    style={{ textShadow: "0 1px 0 rgba(255,255,255,0.5)" }}
                  >
                    Crafted with depth
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-2 opacity-70">
                    Heading 2 — 24px / Semibold
                  </p>
                  <p
                    className="text-2xl font-semibold text-[#5c4033]"
                    style={{ textShadow: "0 1px 0 rgba(255,255,255,0.45)" }}
                  >
                    Material language for the web
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-2 opacity-70">
                    Body — 16px / Regular
                  </p>
                  <p className="text-base text-[#6b4f35] max-w-xl leading-relaxed">
                    Skeuomorphic typography respects its surface. Text on dark leather receives a subtle bottom highlight. Text on bright metal receives a faint drop shadow. The letter never floats — it rests on the material beneath it.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-2 opacity-70">
                    Caption — 12px / Medium
                  </p>
                  <p className="text-xs font-medium text-[#8b7355] uppercase tracking-widest">
                    Engraved · Embossed · Debossed · Stamped
                  </p>
                </div>

                {/* Embossed vs debossed demo */}
                <div className="flex flex-wrap gap-8 pt-4 border-t border-[rgba(180,160,100,0.3)]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3 opacity-70">
                      Embossed
                    </p>
                    <p
                      className="text-3xl font-black text-[#d4c4a8]"
                      style={{
                        textShadow:
                          "0 1px 0 rgba(255,255,255,0.8), 0 -1px 0 rgba(0,0,0,0.25), 1px 0 0 rgba(255,255,255,0.4), -1px 0 0 rgba(0,0,0,0.15)",
                      }}
                    >
                      RAISED
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3 opacity-70">
                      Debossed
                    </p>
                    <p
                      className="text-3xl font-black text-[#7a6045]"
                      style={{
                        textShadow:
                          "0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.35), inset 0 1px 2px rgba(0,0,0,0.2)",
                      }}
                    >
                      PRESSED
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3 opacity-70">
                      Engraved
                    </p>
                    <p
                      className="text-3xl font-black text-[#5c4033]"
                      style={{
                        textShadow:
                          "0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.5)",
                      }}
                    >
                      CARVED
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── BONUS: ACCORDION FAQ ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3">
              Knowledge Base
            </p>
            <h2
              className="text-4xl font-black text-[#3d2010]"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
            >
              Principles Explained
            </h2>
          </RevealBlock>

          <div className="space-y-3">
            {accordionItems.map((item, i) => {
              const isOpen = openAccordion === i;
              return (
                <RevealBlock key={i} delay={i * 0.08}>
                  <div
                    className="rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      background: isOpen
                        ? "linear-gradient(to bottom, #f5f0e0, #ece0c8)"
                        : "linear-gradient(to bottom, #e8dfc8, #d4c8a8)",
                      boxShadow: isOpen
                        ? "0 6px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.7)"
                        : "0 3px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
                      border: isOpen ? "1px solid #c9a227" : "1px solid #b0a080",
                    }}
                  >
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                    >
                      <span
                        className="font-bold text-[#3d2010]"
                        style={{ textShadow: "0 1px 0 rgba(255,255,255,0.5)" }}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 transition-all duration-200 ${
                          isOpen
                            ? "bg-gradient-to-b from-[#c9a227] to-[#a07818] text-[#fff8e0] rotate-180 shadow-[0_2px_5px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.25)]"
                            : "bg-gradient-to-b from-[#e0d0b0] to-[#c8b890] text-[#5c4033] shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.65)]"
                        }`}
                      >
                        ∨
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{ maxHeight: isOpen ? "300px" : "0px" }}
                    >
                      <p className="px-6 pb-5 text-[#6b4f35] text-sm leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BONUS: INPUT FORM PANEL ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b7355] mb-3">
              Form Elements
            </p>
            <h2
              className="text-4xl font-black text-[#3d2010]"
              style={{ textShadow: "0 1px 0 rgba(255,255,255,0.4)" }}
            >
              Inputs &amp; Cards
            </h2>
            <p className="mt-3 text-[#6b4f35] max-w-lg mx-auto">
              Inset shadows make fields feel recessed into the surface. Focus deepens the inset, not a flat ring.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <RevealBlock delay={0.1}>
              <div
                className="p-8 rounded-2xl bg-gradient-to-b from-[#f5f0e0] to-[#ece0c8] border border-[#c8b890] relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 10px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.06)",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(180,160,100,0.1) 27px, rgba(180,160,100,0.1) 28px)",
                }}
              >
                <h3
                  className="text-lg font-black text-[#3d2010] mb-6 text-center"
                  style={{ textShadow: "0 1px 0 rgba(255,255,255,0.5)" }}
                >
                  Contact Form
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-[#8b7355] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name..."
                      className="w-full px-4 py-3 rounded-lg text-[#3d2010] placeholder-[#b0a080] outline-none transition-all duration-150"
                      style={{
                        background: "linear-gradient(to bottom, #faf8f0, #f0ead8)",
                        border: "1px solid #c8b890",
                        boxShadow:
                          "inset 0 2px 5px rgba(0,0,0,0.12), inset 0 -1px 0 rgba(255,255,255,0.5), 0 1px 0 rgba(255,255,255,0.6)",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-[#8b7355] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg text-[#3d2010] placeholder-[#b0a080] outline-none transition-all duration-150"
                      style={{
                        background: "linear-gradient(to bottom, #faf8f0, #f0ead8)",
                        border: "1px solid #c8b890",
                        boxShadow:
                          "inset 0 2px 5px rgba(0,0,0,0.12), inset 0 -1px 0 rgba(255,255,255,0.5), 0 1px 0 rgba(255,255,255,0.6)",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-[#8b7355] mb-2">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Your message..."
                      className="w-full px-4 py-3 rounded-lg text-[#3d2010] placeholder-[#b0a080] outline-none resize-none transition-all duration-150"
                      style={{
                        background: "linear-gradient(to bottom, #faf8f0, #f0ead8)",
                        border: "1px solid #c8b890",
                        boxShadow:
                          "inset 0 2px 5px rgba(0,0,0,0.12), inset 0 -1px 0 rgba(255,255,255,0.5), 0 1px 0 rgba(255,255,255,0.6)",
                      }}
                    />
                  </div>
                  <SkeuButton variant="leather" size="md">
                    <span className="w-full text-center block">Send Message</span>
                  </SkeuButton>
                </div>
              </div>
            </RevealBlock>

            {/* Material cards stack */}
            <RevealBlock delay={0.2} className="space-y-4">
              <MaterialCard title="Leather Notebook" subtitle="Primary Surface" material="leather">
                <p className="text-sm text-[#d4c4a8] opacity-80 leading-relaxed">
                  Warm hide with cross-hatched grain. Gains character with age and use.
                </p>
              </MaterialCard>
              <MaterialCard title="Oak Shelf" subtitle="Secondary Surface" material="wood">
                <p className="text-sm text-[#7a5a3a] opacity-80 leading-relaxed">
                  Golden-brown rings flow diagonally. Pairs with brass hardware accents.
                </p>
              </MaterialCard>
              <MaterialCard title="Steel Panel" subtitle="Accent Surface" material="metal">
                <p className="text-sm text-[#555] opacity-80 leading-relaxed">
                  Brushed aluminium with fine horizontal striations. Cold and precise.
                </p>
              </MaterialCard>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-14 px-6 bg-gradient-to-b from-[#3d2f1f] to-[#201510] border-t-2 border-[#5c4033]">
        {/* Stitching */}
        <div
          className="absolute top-3 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(201,162,39,0.3) 6px, rgba(201,162,39,0.3) 10px)",
          }}
        />

        {/* Wood-grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(3deg, transparent 0, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px)",
          }}
        />

        <div className="max-w-6xl mx-auto relative">
          {/* Logo row */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-b from-[#c9a227] to-[#8b6810] border border-[#6b4808]"
              style={{
                boxShadow:
                  "0 4px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            />
            <span
              className="font-black text-2xl tracking-wider text-[#d4c4a8] uppercase"
              style={{
                textShadow:
                  "0 1px 0 rgba(255,255,255,0.1), 0 -1px 0 rgba(0,0,0,0.5)",
              }}
            >
              Skeuomorphism
            </span>
          </div>

          <p
            className="text-center text-[#8b7355] text-sm mb-2"
            style={{ textShadow: "0 1px 0 rgba(0,0,0,0.4)" }}
          >
            Part of the{" "}
            <Link
              href="/"
              className="text-[#c9a227] hover:text-[#e0b830] transition-colors font-bold"
            >
              StyleKit
            </Link>{" "}
            Design System Collection
          </p>

          <p
            className="text-center text-[#6b5040] text-xs uppercase tracking-widest"
            style={{ textShadow: "0 1px 0 rgba(0,0,0,0.4)" }}
          >
            Digital Meets Physical · Real Textures · Tactile Depth
          </p>

          {/* Bottom divider with brass nail studs */}
          <div className="flex items-center justify-center gap-4 mt-10">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-b from-[#d4a848] to-[#906010]"
                style={{
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
