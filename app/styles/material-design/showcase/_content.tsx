"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, Search, MoreVertical, Plus, Check, Star, Zap, Shield, Layers, Grid, Palette } from "lucide-react";

// Inline useInView hook
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// Inline RevealBlock component
function RevealBlock({
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
        transform: inView ? "translateY(0px)" : "translateY(24px)",
        transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Elevation dp values mapped to box-shadow CSS strings
const elevationShadows: Record<number, string> = {
  1: "0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24)",
  2: "0 3px 6px rgba(0,0,0,0.16),0 3px 6px rgba(0,0,0,0.23)",
  4: "0 10px 20px rgba(0,0,0,0.19),0 6px 6px rgba(0,0,0,0.23)",
  8: "0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)",
  16: "0 19px 38px rgba(0,0,0,0.30),0 15px 12px rgba(0,0,0,0.22)",
  24: "0 24px 48px rgba(0,0,0,0.35),0 18px 14px rgba(0,0,0,0.22)",
};

const COMPONENT_TABS = ["Buttons", "Cards", "Inputs", "FABs"] as const;
type ComponentTab = (typeof COMPONENT_TABS)[number];

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeComponentTab, setActiveComponentTab] =
    useState<ComponentTab>("Buttons");
  const [selectedElevation, setSelectedElevation] = useState<number>(4);

  useEffect(() => {
    const timer = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900">
      {/* App Bar */}
      <header
        className="fixed top-0 left-0 right-0 h-16 bg-[#6200ee] z-50 flex items-center px-4"
        style={{
          boxShadow:
            "0 2px 4px -1px rgba(0,0,0,0.2),0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12)",
        }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-white font-medium text-xl tracking-wide">
              Material Design
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
              aria-label="More"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 bg-gradient-to-br from-[#6200ee] via-[#7c4dff] to-[#b388ff] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition:
                "opacity 700ms cubic-bezier(0.16,1,0.3,1) 0ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 0ms",
            }}
          >
            <p className="text-[#03dac6] font-medium text-sm uppercase tracking-[0.12em] mb-4">
              Google Design System
            </p>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition:
                "opacity 700ms cubic-bezier(0.16,1,0.3,1) 120ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 120ms",
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Paper and
              <br />
              <span className="text-[#03dac6]">Ink</span>
            </h1>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition:
                "opacity 700ms cubic-bezier(0.16,1,0.3,1) 240ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 240ms",
            }}
          >
            <p className="text-white/80 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              Elements have physical elevation via shadows. Bold color, meaningful
              motion. Build beautiful, usable products faster.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition:
                "opacity 700ms cubic-bezier(0.16,1,0.3,1) 360ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 360ms",
            }}
          >
            <button
              className="px-8 py-3 bg-[#03dac6] text-black font-medium uppercase tracking-[0.08em] text-sm rounded-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
              style={{ boxShadow: elevationShadows[4] }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  elevationShadows[8];
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  elevationShadows[4];
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
              }}
            >
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-white/50 text-white font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-white/10 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
              Learn More
            </button>
          </div>

          {/* Hero floating card */}
          <div
            className="mt-16 md:mt-20"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
              transition:
                "opacity 800ms cubic-bezier(0.16,1,0.3,1) 480ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 480ms",
            }}
          >
            <div
              className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl"
              style={{ boxShadow: elevationShadows[8] }}
            >
              <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-2">
                Design Principle
              </p>
              <p className="text-gray-900 text-xl md:text-2xl font-medium leading-snug">
                {"Material is the metaphor. A material metaphor is the unifying theory of a rationalized space and a system of motion."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Elevation System Demo */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-2 text-center">
              Core Concept
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Elevation System
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
              Every surface has a z-axis position. Shadow depth communicates
              elevation above the base surface. Click a card to select it.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {([1, 2, 4, 8, 16, 24] as const).map((dp, i) => (
              <RevealBlock key={dp} delay={i * 60}>
                <button
                  onClick={() => setSelectedElevation(dp)}
                  className="w-full bg-white rounded-xl p-6 flex flex-col items-center gap-3 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                  style={{
                    boxShadow:
                      selectedElevation === dp
                        ? elevationShadows[8]
                        : elevationShadows[dp],
                    border:
                      selectedElevation === dp
                        ? "2px solid #6200ee"
                        : "2px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedElevation !== dp) {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        elevationShadows[8];
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedElevation !== dp) {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        elevationShadows[dp];
                    }
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg bg-[#6200ee]/10"
                    style={{ boxShadow: elevationShadows[dp] }}
                  />
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    dp{dp}
                  </span>
                </button>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={200}>
            <div
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4"
              style={{ boxShadow: elevationShadows[selectedElevation] }}
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-1">
                  dp{selectedElevation} —{" "}
                  {selectedElevation === 1
                    ? "Resting state (switch, card)"
                    : selectedElevation === 2
                      ? "Card (hover state)"
                      : selectedElevation === 4
                        ? "App Bar top"
                        : selectedElevation === 8
                          ? "Card (picked up), button (pressed)"
                          : selectedElevation === 16
                            ? "Nav drawer, Modal side sheet"
                            : "Dialog, Picker"}
                </p>
                <p className="text-sm text-gray-500 font-mono">
                  {elevationShadows[selectedElevation]}
                </p>
              </div>
              <div className="text-[#6200ee] font-medium text-sm uppercase tracking-[0.08em]">
                Selected
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Component Demo */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-2 text-center">
              Component Library
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Material Components
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Production-ready components built on the Material Design specification.
            </p>
          </RevealBlock>

          <RevealBlock delay={100}>
            <div className="flex border-b border-gray-200 mb-10 overflow-x-auto">
              {COMPONENT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveComponentTab(tab)}
                  className={`px-6 py-4 font-medium text-sm uppercase tracking-[0.08em] whitespace-nowrap transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] relative flex-shrink-0 ${
                    activeComponentTab === tab
                      ? "text-[#6200ee]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab}
                  {activeComponentTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6200ee]" />
                  )}
                </button>
              ))}
            </div>
          </RevealBlock>

          {activeComponentTab === "Buttons" && (
            <RevealBlock>
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.08em] mb-4">
                    Contained
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { label: "Contained", bg: "#6200ee", text: "text-white" },
                      { label: "Secondary", bg: "#03dac6", text: "text-black" },
                      { label: "Destructive", bg: "#b00020", text: "text-white" },
                    ].map(({ label, bg, text }) => (
                      <button
                        key={label}
                        className={`px-6 py-2 font-medium uppercase tracking-[0.08em] text-sm rounded-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1 ${text}`}
                        style={{ background: bg, boxShadow: elevationShadows[2] }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            elevationShadows[8];
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            elevationShadows[2];
                        }}
                      >
                        {label}
                      </button>
                    ))}
                    <button className="px-6 py-2 bg-gray-300 text-gray-500 font-medium uppercase tracking-[0.08em] text-sm rounded-full cursor-not-allowed">
                      Disabled
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.08em] mb-4">
                    Outlined
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-2 border-2 border-[#6200ee] text-[#6200ee] font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-[#6200ee]/8 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Primary
                    </button>
                    <button className="px-6 py-2 border-2 border-[#03dac6] text-[#018786] font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-[#03dac6]/10 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Secondary
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.08em] mb-4">
                    Text
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-2 text-[#6200ee] font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-[#6200ee]/8 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Text Button
                    </button>
                    <button className="px-6 py-2 text-[#018786] font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-[#03dac6]/10 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                      Secondary Text
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {activeComponentTab === "Cards" && (
            <RevealBlock>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Zap className="w-12 h-12 text-white" />,
                    gradient: "from-[#6200ee] to-[#b388ff]",
                    title: "Performance",
                    body: "Lightning-fast rendering with hardware-accelerated animations and optimized layout algorithms.",
                    action: "Explore",
                  },
                  {
                    icon: <Star className="w-12 h-12 text-white" />,
                    gradient: "from-[#03dac6] to-[#018786]",
                    title: "Beautiful",
                    body: "Stunning interfaces that delight users with meaningful motion and bold color choices.",
                    action: "Discover",
                  },
                  {
                    icon: <Shield className="w-12 h-12 text-white" />,
                    gradient: "from-[#7c4dff] to-[#651fff]",
                    title: "Reliable",
                    body: "Tested across platforms and screen sizes. Consistent behavior you can depend on.",
                    action: "Learn",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] hover:-translate-y-1 cursor-pointer"
                    style={{ boxShadow: elevationShadows[1] }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        elevationShadows[8];
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        elevationShadows[1];
                    }}
                  >
                    <div
                      className={`h-44 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
                    >
                      {card.icon}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {card.body}
                      </p>
                      <button className="text-[#6200ee] font-medium uppercase tracking-[0.08em] text-sm px-4 py-2 -ml-4 rounded-full hover:bg-[#6200ee]/8 transition-colors ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]">
                        {card.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {activeComponentTab === "Inputs" && (
            <RevealBlock>
              <div className="max-w-lg mx-auto space-y-6">
                <p className="text-sm text-gray-500 mb-4">
                  Floating labels animate upward on focus using the CSS{" "}
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#6200ee] text-xs">
                    peer
                  </code>{" "}
                  pattern. Click each field to see the animation.
                </p>
                {[
                  { type: "text", label: "Full Name" },
                  { type: "email", label: "Email Address" },
                  { type: "password", label: "Password" },
                ].map(({ type, label }) => (
                  <div key={label} className="relative">
                    <input
                      type={type}
                      placeholder=" "
                      className="peer w-full px-4 pt-6 pb-2 bg-gray-100 border-0 border-b-2 border-gray-400 rounded-t-lg text-gray-900 focus:outline-none focus:border-[#6200ee] focus:bg-gray-50 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms]"
                    />
                    <label className="absolute left-4 top-4 text-gray-500 text-base transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                      {label}
                    </label>
                  </div>
                ))}
                <button
                  className="w-full py-3 bg-[#6200ee] text-white font-medium uppercase tracking-[0.08em] text-sm rounded-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                  style={{ boxShadow: elevationShadows[2] }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      elevationShadows[8];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      elevationShadows[2];
                  }}
                >
                  Sign In
                </button>
              </div>
            </RevealBlock>
          )}

          {activeComponentTab === "FABs" && (
            <RevealBlock>
              <div className="space-y-8">
                <p className="text-sm text-gray-500">
                  Floating Action Buttons represent the primary action on a screen.
                  They float at dp6 and use the secondary color by convention.
                </p>
                <div className="flex flex-wrap items-end gap-8">
                  {[
                    {
                      size: "w-10 h-10",
                      icon: <Plus className="w-4 h-4" />,
                      label: "Mini",
                    },
                    {
                      size: "w-14 h-14",
                      icon: <Plus className="w-6 h-6" />,
                      label: "Standard",
                    },
                    {
                      size: "w-14 h-14",
                      icon: <Star className="w-6 h-6" />,
                      label: "Primary",
                      bg: "#6200ee",
                      text: "text-white",
                    },
                  ].map(({ size, icon, label, bg, text }) => (
                    <div key={label} className="flex flex-col items-center gap-3">
                      <button
                        className={`${size} rounded-full flex items-center justify-center transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1 ${text ?? "text-black"}`}
                        style={{
                          background: bg ?? "#03dac6",
                          boxShadow: elevationShadows[4],
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            elevationShadows[8];
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow =
                            elevationShadows[4];
                        }}
                      >
                        {icon}
                      </button>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {label}
                      </span>
                    </div>
                  ))}
                  <div className="flex flex-col items-center gap-3">
                    <button
                      className="h-14 px-6 bg-[#03dac6] rounded-full flex items-center gap-3 text-black font-medium uppercase tracking-[0.08em] text-sm transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
                      style={{ boxShadow: elevationShadows[4] }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          elevationShadows[8];
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          elevationShadows[4];
                      }}
                    >
                      <Plus className="w-5 h-5" />
                      Compose
                    </button>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Extended
                    </span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* Color System */}
      <section className="py-20 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-2 text-center">
              Visual Language
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Color System
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
              Color is used intentionally to convey meaning, establish hierarchy,
              and create consistent brand identity.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Primary",
                main: "#6200ee",
                variants: ["#7c4dff", "#b388ff", "#ede7f6"],
                textMain: "text-white",
              },
              {
                label: "Secondary",
                main: "#03dac6",
                variants: ["#018786", "#80cbc4", "#e0f2f1"],
                textMain: "text-black",
              },
              {
                label: "Error",
                main: "#b00020",
                variants: ["#cf6679", "#fcd3d9", "#fff8f8"],
                textMain: "text-white",
              },
              {
                label: "Neutral",
                main: "#212121",
                variants: ["#616161", "#9e9e9e", "#f5f5f5"],
                textMain: "text-white",
              },
            ].map((swatch, i) => (
              <RevealBlock key={swatch.label} delay={i * 80}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ boxShadow: elevationShadows[1] }}
                >
                  <div
                    className={`h-24 flex items-end p-4 ${swatch.textMain}`}
                    style={{ background: swatch.main }}
                  >
                    <div>
                      <p className="font-medium text-sm">{swatch.label}</p>
                      <p className="text-xs opacity-80 font-mono">{swatch.main}</p>
                    </div>
                  </div>
                  {swatch.variants.map((v, vi) => (
                    <div
                      key={v}
                      className="h-10 flex items-center px-4"
                      style={{ background: v }}
                    >
                      <span
                        className="text-xs font-mono"
                        style={{
                          color:
                            vi >= 1
                              ? "#212121"
                              : "rgba(255,255,255,0.9)",
                        }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={200}>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { label: "Pink Accent", hex: "#ff0266" },
                { label: "Yellow Accent", hex: "#ffde03" },
                { label: "Green Accent", hex: "#00c853" },
                { label: "Surface", hex: "#ffffff" },
                { label: "Background", hex: "#fafafa" },
                { label: "On Primary", hex: "#ffffff" },
              ].map((c) => (
                <div key={c.label} className="text-center">
                  <div
                    className="h-12 rounded-xl mb-2 border border-gray-200"
                    style={{ background: c.hex }}
                  />
                  <p className="text-xs font-medium text-gray-700">{c.label}</p>
                  <p className="text-xs text-gray-400 font-mono">{c.hex}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-2 text-center">
              Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Design Principles
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
              Material Design is guided by three core principles that inform every
              decision.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Layers className="w-8 h-8 text-[#6200ee]" />,
                title: "Material is the Metaphor",
                desc: "A material metaphor is the unifying theory of a rationalized space and a system of motion. The material is grounded in tactile reality.",
              },
              {
                icon: <Palette className="w-8 h-8 text-[#6200ee]" />,
                title: "Bold, Graphic, Intentional",
                desc: "Typography, grids, space, scale, color, and imagery guide visual treatments. These elements do far more than please the eye.",
              },
              {
                icon: <Zap className="w-8 h-8 text-[#6200ee]" />,
                title: "Motion Provides Meaning",
                desc: "Motion respects and reinforces the user as the prime mover. Primary user actions are inflection points that initiate motion.",
              },
            ].map((p, i) => (
              <RevealBlock key={i} delay={i * 100}>
                <div
                  className="bg-[#fafafa] rounded-2xl p-8 h-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] hover:-translate-y-1"
                  style={{ boxShadow: elevationShadows[1] }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      elevationShadows[8];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      elevationShadows[1];
                  }}
                >
                  <div className="w-14 h-14 bg-[#6200ee]/10 rounded-2xl flex items-center justify-center mb-6">
                    {p.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't */}
          <RevealBlock delay={200}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-8 border-2 border-[#00c853]/30 bg-[#00c853]/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#00c853] flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 text-lg">Do</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    "Use elevation to show hierarchy — higher surfaces are more important",
                    "Apply the Material deceleration curve (0.4, 0, 0.2, 1) to all transitions",
                    "Use UPPERCASE tracking for button labels",
                    "Follow the 8dp grid — all spacing should be multiples of 8",
                    "Use the secondary color sparingly for the most important action",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="text-[#00c853] font-bold mt-0.5">+</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-8 border-2 border-[#b00020]/30 bg-[#b00020]/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#b00020] flex items-center justify-center">
                    <span className="text-white font-bold text-sm leading-none">
                      x
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-lg">{"Don't"}</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    "Assign arbitrary shadows — every shadow value should map to a dp level",
                    "Use linear easing for motion — it feels mechanical and unnatural",
                    "Overuse color — primary and secondary should appear purposefully",
                    "Place two FABs on a single screen — one primary action per view",
                    "Use odd spacing values — the 8dp grid must be respected",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="text-[#b00020] font-bold mt-0.5">-</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Typography */}
      <section className="py-20 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-[#6200ee] font-medium text-xs uppercase tracking-[0.12em] mb-2 text-center">
              Type Scale
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4 text-center">
              Typography
            </h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
              Material Design uses the Roboto typeface. The type scale provides 13
              styles with defined size, weight, and letter spacing.
            </p>
          </RevealBlock>

          <div className="space-y-2">
            {[
              {
                role: "H1",
                cls: "text-6xl font-light",
                tracking: "-0.015em",
                sample: "Display Large",
              },
              {
                role: "H2",
                cls: "text-5xl font-light",
                tracking: "-0.005em",
                sample: "Display Medium",
              },
              {
                role: "H3",
                cls: "text-4xl font-normal",
                tracking: "0em",
                sample: "Display Small",
              },
              {
                role: "H4",
                cls: "text-3xl font-normal",
                tracking: "0.0025em",
                sample: "Headline",
              },
              {
                role: "H5",
                cls: "text-2xl font-medium",
                tracking: "0em",
                sample: "Title Large",
              },
              {
                role: "Label",
                cls: "text-sm font-medium",
                tracking: "0.1em",
                sample: "LABEL UPPERCASE",
              },
            ].map((t, i) => (
              <RevealBlock key={t.role} delay={i * 60}>
                <div
                  className="bg-white rounded-xl px-6 py-5 flex items-baseline gap-6 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] hover:-translate-y-0.5"
                  style={{ boxShadow: elevationShadows[1] }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      elevationShadows[4];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      elevationShadows[1];
                  }}
                >
                  <span className="text-xs font-mono text-gray-400 w-10 flex-shrink-0">
                    {t.role}
                  </span>
                  <span
                    className={`${t.cls} text-gray-900 flex-1`}
                    style={{ letterSpacing: t.tracking }}
                  >
                    {t.sample}
                  </span>
                  <span className="text-xs text-gray-400 font-mono hidden md:block">
                    {t.cls}
                  </span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#6200ee] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Grid className="w-6 h-6 text-[#03dac6]" />
                <span className="text-white font-medium text-xl">
                  Material Design
                </span>
              </div>
              <p className="text-white/60 text-sm max-w-sm">
                {"A design system built and supported by Google. Material helps teams build high-quality digital experiences."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/styles/material-design"
                className="px-6 py-2 border-2 border-white/30 text-white font-medium uppercase tracking-[0.08em] text-sm rounded-full hover:bg-white/10 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98]"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="px-6 py-2 bg-[#03dac6] text-black font-medium uppercase tracking-[0.08em] text-sm rounded-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-0.5"
                style={{ boxShadow: elevationShadows[2] }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    elevationShadows[8];
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    elevationShadows[2];
                }}
              >
                All Styles
              </Link>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-white/40 text-xs text-center">
              StyleKit · Material Design Showcase
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed FAB */}
      <button
        className="fixed right-6 bottom-6 w-14 h-14 bg-[#03dac6] rounded-full flex items-center justify-center text-black z-50 transition-all ease-[cubic-bezier(0.4,0,0.2,1)] duration-[250ms] active:scale-[0.98] hover:-translate-y-1"
        style={{ boxShadow: elevationShadows[4] }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            elevationShadows[8];
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            elevationShadows[4];
        }}
        aria-label="Create"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
