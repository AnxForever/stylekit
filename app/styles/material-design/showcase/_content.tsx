"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ── data ─────────────────────────────────────────────── */
const features = [
  { icon: "layers", title: "Elevation System", desc: "Shadows communicate depth and spatial relationships between surfaces." },
  { icon: "palette", title: "Bold Color", desc: "Intentional use of color creates hierarchy and draws attention to key elements." },
  { icon: "touch_app", title: "Responsive Motion", desc: "Meaningful animations provide feedback and guide users through interactions." },
  { icon: "grid_on", title: "8dp Grid", desc: "All spacing follows an 8dp baseline grid for visual harmony and consistency." },
];

const elevationLevels = [
  { dp: 0, label: "dp0 - Flat", shadow: "shadow-none", bg: "bg-white" },
  { dp: 1, label: "dp1 - Resting", shadow: "shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]", bg: "bg-white" },
  { dp: 2, label: "dp2 - Raised", shadow: "shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]", bg: "bg-white" },
  { dp: 4, label: "dp4 - Hover", shadow: "shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]", bg: "bg-white" },
  { dp: 8, label: "dp8 - Picked Up", shadow: "shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]", bg: "bg-white" },
];

const taskList = [
  { id: 1, title: "Review design system tokens", done: true },
  { id: 2, title: "Update elevation guidelines", done: true },
  { id: 3, title: "Create component library", done: false },
  { id: 4, title: "Write accessibility audit", done: false },
  { id: 5, title: "Prepare release notes", done: false },
];

const colorTokens = [
  { name: "Primary", hex: "#6200ee", tw: "bg-[#6200ee]", text: "text-white" },
  { name: "Primary Variant", hex: "#3700b3", tw: "bg-[#3700b3]", text: "text-white" },
  { name: "Secondary", hex: "#03dac6", tw: "bg-[#03dac6]", text: "text-black" },
  { name: "Background", hex: "#fafafa", tw: "bg-[#fafafa]", text: "text-black" },
  { name: "Surface", hex: "#ffffff", tw: "bg-white", text: "text-black" },
  { name: "Error", hex: "#b00020", tw: "bg-[#b00020]", text: "text-white" },
  { name: "On Primary", hex: "#ffffff", tw: "bg-white", text: "text-black" },
  { name: "On Secondary", hex: "#000000", tw: "bg-black", text: "text-white" },
];

const doRules = [
  "Use elevation shadows to express hierarchy",
  "Apply ripple effect for click feedback",
  "Use bold, vivid primary and accent colors",
  "Follow 8dp spacing grid for all layouts",
  "Use Roboto font family throughout",
  "Add meaningful micro-animations for transitions",
];

const dontRules = [
  "Use inconsistent shadow depths across surfaces",
  "Use overly muted or pastel color palettes",
  "Omit interactive feedback on tappable elements",
  "Break the 8dp grid spacing system",
  "Skip active:scale on buttons (Material Pseudo-Ripple)",
  "Use non-standard easing curves (must use cubic-bezier(0.4,0,0.2,1))",
];

/* ── hooks ────────────────────────────────────────────── */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── sub-components ───────────────────────────────────── */
function MaterialIcon({ name, className = "" }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    layers: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" />
      </svg>
    ),
    palette: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
    touch_app: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z" />
      </svg>
    ),
    grid_on: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z" />
      </svg>
    ),
  };
  return <>{icons[name] ?? null}</>;
}

function RippleButton({ children, variant = "filled", className = "" }: {
  children: React.ReactNode;
  variant?: "filled" | "outlined" | "text" | "tonal";
  className?: string;
}) {
  const base =
    "relative px-6 py-2.5 font-medium uppercase tracking-[0.08em] text-sm rounded overflow-hidden transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] active:scale-[0.98]";
  const variants: Record<string, string> = {
    filled:
      "bg-[#6200ee] text-white shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_1px_5px_0_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)] hover:bg-[#7528e5]",
    outlined:
      "bg-transparent text-[#6200ee] border border-[#6200ee]/50 hover:bg-[#6200ee]/5 hover:border-[#6200ee]",
    text: "bg-transparent text-[#6200ee] hover:bg-[#6200ee]/5",
    tonal:
      "bg-[#6200ee]/10 text-[#6200ee] hover:bg-[#6200ee]/15",
  };
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function MaterialCard({ title, subtitle, image }: { title: string; subtitle: string; image: string }) {
  return (
    <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] hover:-translate-y-1 transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden cursor-pointer group">
      <div className="h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium text-black/87 mb-1">{title}</h3>
        <p className="text-sm text-black/60">{subtitle}</p>
      </div>
      <div className="px-4 pb-4 flex gap-2">
        <RippleButton variant="text">Read</RippleButton>
        <RippleButton variant="text">Share</RippleButton>
      </div>
    </div>
  );
}

function FloatingInputField({ id, label }: { id: string; label: string }) {
  return (
    <div className="relative pt-5">
      <input
        type="text"
        id={id}
        placeholder=" "
        className="peer w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-400 rounded-t-md text-black/85 focus:outline-none focus:border-[#6200ee] focus:bg-gray-100 transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-8 text-black/60 text-base transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────── */
export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"buttons" | "cards" | "inputs" | "elevation">("buttons");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-black/87" style={{ fontFamily: "Roboto, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @keyframes md-ripple {
          0% { transform: scale(0); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .md-tab-indicator {
          position: relative;
        }
        .md-tab-indicator::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: #6200ee;
          transform: scaleX(0);
          transition: transform 250ms cubic-bezier(0.4,0,0.2,1);
        }
        .md-tab-indicator.active::after {
          transform: scaleX(1);
        }
        .md-fab-pulse {
          animation: fab-pulse 2s ease-in-out infinite;
        }
        @keyframes fab-pulse {
          0%, 100% { box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.2); }
          50% { box-shadow: 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.2), 0 0 0 8px rgba(98,0,238,0.15); }
        }
      `}</style>

      {/* ── Navigation (App Bar) ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#6200ee] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)] flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <Link href="/styles/material-design/showcase" className="text-white font-medium text-xl tracking-tight">
            Material Design
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/styles/material-design" className="text-white/70 hover:text-white text-sm font-medium uppercase tracking-wider transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
              Docs
            </Link>
            <Link href="/styles" className="text-white/70 hover:text-white text-sm font-medium uppercase tracking-wider transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
              Styles
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-[#6200ee] via-[#7c4dff] to-[#b388ff] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#03dac6]" style={{ filter: "blur(120px)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-[#ff0266]" style={{ filter: "blur(100px)" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            <p
              className="text-white/60 font-medium uppercase tracking-[0.2em] text-sm mb-6"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              Design System
            </p>
            <h1
              className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s",
              }}
            >
              Build beautiful,
              <br />
              usable products
              <br />
              <span className="text-[#03dac6]">faster.</span>
            </h1>
            <p
              className="text-white/70 text-lg md:text-xl mb-12 max-w-md leading-relaxed"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.25s",
              }}
            >
              Material Design is a system of guidelines, components, and tools that support the best practices of user interface design.
            </p>
            <div
              className="flex gap-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.4s",
              }}
            >
              <button type="button" className="px-8 py-3 bg-white text-[#6200ee] font-medium uppercase tracking-[0.08em] text-sm rounded shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_1px_5px_0_rgba(0,0,0,0.12)] hover:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)] active:scale-[0.98] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                Get Started
              </button>
              <button type="button" className="px-8 py-3 bg-transparent text-white border border-white/30 font-medium uppercase tracking-[0.08em] text-sm rounded hover:bg-white/10 hover:border-white/50 active:scale-[0.98] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                Learn More
              </button>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
            <div
              className="w-64 bg-white rounded-xl shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] p-6 mb-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0) rotate(-2deg)" : "translateY(60px) rotate(-2deg)",
                transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.3s",
              }}
            >
              <div className="w-10 h-10 bg-[#6200ee] rounded-full flex items-center justify-center mb-4">
                <MaterialIcon name="layers" className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium text-black/87 mb-1">Elevation</h3>
              <p className="text-sm text-black/54">Surfaces at different elevations</p>
            </div>
            <div
              className="w-64 bg-white rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)] p-6 ml-12"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0) rotate(1deg)" : "translateY(60px) rotate(1deg)",
                transition: "all 0.8s cubic-bezier(0.4,0,0.2,1) 0.5s",
              }}
            >
              <div className="w-10 h-10 bg-[#03dac6] rounded-full flex items-center justify-center mb-4">
                <MaterialIcon name="palette" className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-medium text-black/87 mb-1">Color System</h3>
              <p className="text-sm text-black/54">Bold, intentional color use</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <RevealBlock className="mb-16">
          <p className="text-[#6200ee] font-medium uppercase tracking-[0.2em] text-sm mb-4">Foundation</p>
          <h2 className="text-3xl md:text-5xl font-bold text-black/87 tracking-tight mb-4">
            Core Principles
          </h2>
          <p className="text-black/60 text-lg max-w-xl">
            Material Design is built on a foundation of four key principles that guide every design decision.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <RevealBlock key={f.icon} delay={i * 0.1}>
              <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] hover:-translate-y-1 transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] p-8 group cursor-pointer">
                <div className="w-12 h-12 bg-[#6200ee]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#6200ee] transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                  <MaterialIcon name={f.icon} className="w-6 h-6 text-[#6200ee] group-hover:text-white transition-colors duration-[250ms]" />
                </div>
                <h3 className="text-xl font-medium text-black/87 mb-2">{f.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── Component Demos (Tab-switched) ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="text-[#6200ee] font-medium uppercase tracking-[0.2em] text-sm mb-4">Components</p>
            <h2 className="text-3xl md:text-5xl font-bold text-black/87 tracking-tight">
              Material Components
            </h2>
          </RevealBlock>

          {/* Tab Bar */}
          <div className="flex border-b border-black/12 mb-12">
            {(["buttons", "cards", "inputs", "elevation"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`md-tab-indicator px-6 py-4 font-medium uppercase tracking-[0.08em] text-sm transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${activeTab === tab ? "active text-[#6200ee]" : "text-black/60 hover:text-black/87 hover:bg-black/5"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "buttons" && (
              <RevealBlock>
                <div className="bg-[#fafafa] rounded-xl p-8 md:p-12">
                  <h3 className="text-xl font-medium text-black/87 mb-2">Button Variants</h3>
                  <p className="text-black/60 text-sm mb-8">Material buttons come in four variants, each with specific use cases and elevation levels.</p>
                  <div className="space-y-8">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-black/40 font-medium mb-4">Filled (High Emphasis)</p>
                      <div className="flex flex-wrap gap-4">
                        <RippleButton variant="filled">Submit</RippleButton>
                        <RippleButton variant="filled" className="bg-[#03dac6] text-black hover:bg-[#00c4b4]">Secondary</RippleButton>
                        <RippleButton variant="filled" className="bg-[#b00020] hover:bg-[#9b001a]">Error</RippleButton>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-black/40 font-medium mb-4">Outlined (Medium Emphasis)</p>
                      <div className="flex flex-wrap gap-4">
                        <RippleButton variant="outlined">Cancel</RippleButton>
                        <RippleButton variant="outlined" className="text-[#03dac6] border-[#03dac6]/50 hover:border-[#03dac6] hover:bg-[#03dac6]/5">Secondary</RippleButton>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-black/40 font-medium mb-4">Text (Low Emphasis)</p>
                      <div className="flex flex-wrap gap-4">
                        <RippleButton variant="text">Learn More</RippleButton>
                        <RippleButton variant="text">Dismiss</RippleButton>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-black/40 font-medium mb-4">Tonal (Medium Emphasis)</p>
                      <div className="flex flex-wrap gap-4">
                        <RippleButton variant="tonal">Option</RippleButton>
                        <RippleButton variant="tonal" className="bg-[#03dac6]/10 text-[#018786] hover:bg-[#03dac6]/20">Tonal Alt</RippleButton>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-black/40 font-medium mb-4">Floating Action Button</p>
                      <button type="button" className="md-fab-pulse w-14 h-14 bg-[#03dac6] rounded-2xl flex items-center justify-center shadow-[0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12),0_3px_5px_-1px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_10px_1px_rgba(0,0,0,0.14),0_3px_14px_2px_rgba(0,0,0,0.12),0_5px_5px_-3px_rgba(0,0,0,0.2)] active:scale-[0.98] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                        <svg viewBox="0 0 24 24" fill="black" className="w-6 h-6"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "cards" && (
              <RevealBlock>
                <div className="bg-[#fafafa] rounded-xl p-8 md:p-12">
                  <h3 className="text-xl font-medium text-black/87 mb-2">Card Surfaces</h3>
                  <p className="text-black/60 text-sm mb-8">Cards contain content and actions about a single subject. Hover to see elevation change.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MaterialCard title="Material Surface" subtitle="Elevation responds to interaction" image="https://picsum.photos/seed/md1/600/400" />
                    <MaterialCard title="Color System" subtitle="Bold, intentional color palette" image="https://picsum.photos/seed/md2/600/400" />
                    <MaterialCard title="Motion Design" subtitle="Meaningful responsive animations" image="https://picsum.photos/seed/md3/600/400" />
                  </div>
                  <div className="mt-8 bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] p-6">
                    <h4 className="font-medium text-black/87 mb-4">Task List</h4>
                    <div className="divide-y divide-black/8">
                      {taskList.map((task) => (
                        <div key={task.id} className="flex items-center gap-4 py-3 group cursor-pointer hover:bg-black/[0.02] -mx-6 px-6 transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                          <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-colors duration-[250ms] ${task.done ? "bg-[#6200ee] border-[#6200ee]" : "border-black/30 group-hover:border-[#6200ee]"}`}>
                            {task.done && <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>}
                          </div>
                          <span className={`text-sm ${task.done ? "text-black/40 line-through" : "text-black/87"}`}>{task.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "inputs" && (
              <RevealBlock>
                <div className="bg-[#fafafa] rounded-xl p-8 md:p-12">
                  <h3 className="text-xl font-medium text-black/87 mb-2">Text Fields</h3>
                  <p className="text-black/60 text-sm mb-8">Material text fields feature floating labels that animate on focus. Click the fields to see the interaction.</p>
                  <div className="max-w-md space-y-6">
                    <FloatingInputField id="md-name" label="Full Name" />
                    <FloatingInputField id="md-email" label="Email Address" />
                    <FloatingInputField id="md-subject" label="Subject" />
                    <div className="relative pt-5">
                      <textarea
                        id="md-message"
                        rows={4}
                        placeholder=" "
                        className="peer w-full px-4 py-3 bg-gray-50 border-b-2 border-gray-400 rounded-t-md text-black/85 focus:outline-none focus:border-[#6200ee] focus:bg-gray-100 transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] resize-none"
                      />
                      <label
                        htmlFor="md-message"
                        className="absolute left-4 top-8 text-black/60 text-base transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6200ee] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
                      >
                        Message
                      </label>
                    </div>
                    <RippleButton variant="filled">Send Message</RippleButton>
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "elevation" && (
              <RevealBlock>
                <div className="bg-[#fafafa] rounded-xl p-8 md:p-12">
                  <h3 className="text-xl font-medium text-black/87 mb-2">Elevation System</h3>
                  <p className="text-black/60 text-sm mb-8">Material uses shadows to express elevation. Higher surfaces cast larger shadows. Hover each card to see the effect.</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    {elevationLevels.map((level) => (
                      <div key={level.dp} className={`${level.bg} ${level.shadow} rounded-xl p-6 text-center hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer`}>
                        <p className="text-2xl font-bold text-[#6200ee] mb-2">{level.dp}</p>
                        <p className="text-xs text-black/60">{level.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>
            )}
          </div>
        </div>
      </section>

      {/* ── Color Palette ── */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <p className="text-[#6200ee] font-medium uppercase tracking-[0.2em] text-sm mb-4">Tokens</p>
            <h2 className="text-3xl md:text-5xl font-bold text-black/87 tracking-tight">
              Color System
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorTokens.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.05}>
                <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] overflow-hidden group hover:shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)] transition-shadow duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                  <div className={`h-24 ${c.tw} ${c.text} flex items-end p-4`}>
                    <span className="text-xs font-medium uppercase tracking-wider opacity-80">{c.name}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-mono text-black/87">{c.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Rules ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-16">
            <p className="text-[#6200ee] font-medium uppercase tracking-[0.2em] text-sm mb-4">Guidelines</p>
            <h2 className="text-3xl md:text-5xl font-bold text-black/87 tracking-tight">
              Design Rules
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealBlock>
              <div className="bg-[#00c853]/5 rounded-xl p-8 border border-[#00c853]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#00c853] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  </div>
                  <h3 className="text-xl font-medium text-[#00c853]">Do</h3>
                </div>
                <ul className="space-y-4">
                  {doRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-black/70">
                      <span className="w-1.5 h-1.5 bg-[#00c853] rounded-full mt-2 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
            <RevealBlock delay={0.15}>
              <div className="bg-[#b00020]/5 rounded-xl p-8 border border-[#b00020]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#b00020] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                  </div>
                  <h3 className="text-xl font-medium text-[#b00020]">Don&apos;t</h3>
                </div>
                <ul className="space-y-4">
                  {dontRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-black/70">
                      <span className="w-1.5 h-1.5 bg-[#b00020] rounded-full mt-2 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#6200ee] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm font-medium">
              StyleKit &middot; Material Design Showcase
            </p>
            <Link href="/styles/material-design" className="text-white/60 hover:text-white text-sm font-medium uppercase tracking-wider transition-colors duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
