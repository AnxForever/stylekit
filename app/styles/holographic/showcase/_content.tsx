"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ── data ─────────────────────────────────────────────── */
const features = [
  { title: "Spectrum Shift", desc: "Gradient slides laterally on hover, simulating angle-dependent holographic foil.", icon: "prism" },
  { title: "Prismatic Glow", desc: "Multi-color box shadows create depth with cyan and magenta light spills.", icon: "glow" },
  { title: "Liquid Glass", desc: "Semi-transparent surfaces with backdrop blur over deep cosmic backgrounds.", icon: "glass" },
  { title: "Jelly Press", desc: "Active state scale-down with snap-back creates satisfying tactile feedback.", icon: "press" },
];

const pricingTiers = [
  { name: "Starter", price: "$9", features: ["5 Projects", "Basic Analytics", "Community Support"], highlighted: false },
  { name: "Pro", price: "$29", features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Custom Domains"], highlighted: true },
  { name: "Enterprise", price: "$99", features: ["Everything in Pro", "SSO & SAML", "Dedicated Account Manager", "SLA Guarantee", "Custom Integrations"], highlighted: false },
];

const colorTokens = [
  { name: "Holo Pink", hex: "#ff0080", tw: "bg-[#ff0080]" },
  { name: "Holo Gold", hex: "#ffd700", tw: "bg-[#ffd700]" },
  { name: "Holo Cyan", hex: "#00d4ff", tw: "bg-[#00d4ff]" },
  { name: "Holo Green", hex: "#00ff88", tw: "bg-[#00ff88]" },
  { name: "Holo Indigo", hex: "#6366f1", tw: "bg-[#6366f1]" },
  { name: "Holo Purple", hex: "#a855f7", tw: "bg-[#a855f7]" },
  { name: "Cosmic Dark", hex: "#0a0a1f", tw: "bg-[#0a0a1f]" },
  { name: "Deep Space", hex: "#1a0b2e", tw: "bg-[#1a0b2e]" },
];

const doRules = [
  "Use multi-color gradients with 3+ color stops",
  "Apply bg-[length:200%_auto] + hover:bg-right for spectrum shift",
  "Use dark cosmic backgrounds (#0a0a1f, #1a0b2e)",
  "Add prismatic multi-color box-shadows on hover",
  "Include holographic sticker badges with full spectrum",
  "Use semi-transparent cards (bg-white/5) with backdrop-blur",
];

const dontRules = [
  "Use flat solid colors without gradient treatment",
  "Use light or white backgrounds (kills holographic effect)",
  "Use muted or desaturated color palettes",
  "Omit active:scale-95 from interactive elements",
  "Use focus:ring without focus:ring-offset-[#0a0a1f]",
  "Use hover:scale alone without gradient shift",
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
function HoloButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={`px-8 py-3.5 rounded-xl font-bold tracking-wide text-white bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:bg-right hover:shadow-[0_0_40px_rgba(0,212,255,0.6),0_0_20px_rgba(255,0,128,0.4)] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#0a0a1f] active:scale-95 active:translate-y-0 active:shadow-[0_0_10px_rgba(147,51,234,0.5)] transition-all duration-500 ease-out ${className}`}
    >
      {children}
    </button>
  );
}

function HoloCard({ title, desc, children, className = "" }: {
  title: string;
  desc: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl hover:bg-white/10 hover:border-purple-400/40 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-300 ease-out cursor-pointer ${className}`}>
      <h3 className="text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] group-hover:bg-right transition-[background-position] duration-500">
        {title}
      </h3>
      <p className="text-white/60 text-sm group-hover:text-white/75 transition-colors duration-300">
        {desc}
      </p>
      {children}
    </div>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    prism: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <polygon points="12,2 22,20 2,20" />
        <line x1="12" y1="8" x2="12" y2="20" />
        <line x1="7" y1="14" x2="17" y2="14" />
      </svg>
    ),
    glow: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    glass: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    press: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2v10M8 8l4 4 4-4M5 18h14" />
      </svg>
    ),
  };
  return <>{icons[name] ?? null}</>;
}

/* ── main ─────────────────────────────────────────────── */
export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"cards" | "pricing" | "badges">("cards");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white">
      <style>{`
        @keyframes holo-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes holo-shimmer {
          0% { transform: translateX(-100%) rotate(15deg); }
          100% { transform: translateX(200%) rotate(15deg); }
        }
        @keyframes holo-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-0.5deg); }
        }
        @keyframes holo-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .holo-text-gradient {
          background: linear-gradient(135deg, #ff0080, #ff6b00, #ffd700, #00ff88, #00d4ff, #6366f1, #a855f7);
          background-size: 200% 200%;
          animation: holo-gradient-shift 6s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .holo-border-gradient {
          position: relative;
        }
        .holo-border-gradient::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, #ff0080, #ffd700, #00d4ff, #00ff88, #6366f1, #a855f7);
          background-size: 200% 200%;
          animation: holo-gradient-shift 4s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .holo-sticker {
          position: relative;
          overflow: hidden;
        }
        .holo-sticker::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.05) 55%, transparent 60%);
          animation: holo-shimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* ── Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1f]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/styles/holographic/showcase" className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff]">
              Holographic
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/styles/holographic" className="text-white/60 hover:text-white text-sm transition-colors">Docs</Link>
              <Link href="/styles" className="text-white/60 hover:text-white text-sm transition-colors">Styles</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#ff0080]/20" style={{ filter: "blur(120px)", animation: "holo-pulse 4s ease-in-out infinite" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#00d4ff]/20" style={{ filter: "blur(100px)", animation: "holo-pulse 4s ease-in-out infinite 1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#ffd700]/10" style={{ filter: "blur(80px)", animation: "holo-pulse 4s ease-in-out infinite 2s" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            className="inline-block mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span className="holo-sticker inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-[#ff0080] via-[#ffd700] via-[#00ff88] to-[#00d4ff] text-white">
              Prismatic Design System
            </span>
          </div>
          <h1
            className="holo-text-gradient text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.95] mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Holographic
          </h1>
          <p
            className="text-white/60 text-lg md:text-xl max-w-lg mx-auto mb-12"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Prismatic rainbow gradients that shift and shimmer like holographic foil across cosmic dark surfaces.
          </p>
          <div
            className="flex justify-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <HoloButton>Activate Portal</HoloButton>
            <button type="button" className="px-8 py-3.5 rounded-xl font-bold tracking-wide text-white/70 border border-white/20 hover:text-white hover:border-white/40 hover:bg-white/5 active:scale-95 transition-all duration-300">
              Explore
            </button>
          </div>

          {/* Floating holographic card */}
          <div
            className="mt-20 mx-auto max-w-md"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
              animation: heroRevealed ? "holo-float 6s ease-in-out infinite" : "none",
            }}
          >
            <div className="holo-border-gradient rounded-2xl">
              <div className="bg-[#0a0a1f]/80 backdrop-blur-xl rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="holo-sticker w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff0080] via-[#ffd700] to-[#00d4ff] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><polygon points="12,2 22,20 2,20" /></svg>
                  </div>
                  <span className="holo-text-gradient font-bold">Holographic Card</span>
                </div>
                <p className="text-white/50 text-sm">A glass panel floating in cosmic dark space with prismatic rainbow reflections.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] to-[#00d4ff] font-bold uppercase tracking-[0.2em] text-sm mb-4">Interaction Physics</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="holo-text-gradient">Core Principles</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <RevealBlock key={f.title} delay={i * 0.1}>
                <div className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-purple-400/40 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-300 ease-out cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff0080]/20 to-[#00d4ff]/20 flex items-center justify-center mb-6 text-white/80 group-hover:text-white group-hover:from-[#ff0080]/40 group-hover:to-[#00d4ff]/40 transition-colors duration-300">
                    <FeatureIcon name={f.icon} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] group-hover:bg-right transition-[background-position] duration-500">
                    {f.title}
                  </h3>
                  <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-300">{f.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Component Demos (Tab-switched) ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="holo-text-gradient">Components</span>
            </h2>
          </RevealBlock>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/5 backdrop-blur-xl rounded-xl p-1 border border-white/10">
              {(["cards", "pricing", "badges"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all duration-300 ${activeTab === tab
                    ? "bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                    : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[500px]">
            {activeTab === "cards" && (
              <RevealBlock>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <HoloCard title="Prismatic Glass" desc="Semi-transparent surface with rainbow border glow and backdrop blur.">
                    <div className="mt-4 h-32 rounded-xl bg-gradient-to-br from-[#ff0080]/10 via-[#ffd700]/10 to-[#00d4ff]/10 border border-white/5 flex items-center justify-center">
                      <span className="text-white/30 text-sm">Content Area</span>
                    </div>
                  </HoloCard>
                  <HoloCard title="Spectrum Badge" desc="Full rainbow gradient with shimmer overlay animation.">
                    <div className="mt-4 flex gap-2">
                      <span className="holo-sticker inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-[#ff0080] to-[#ffd700] text-white">New</span>
                      <span className="holo-sticker inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-white">Featured</span>
                      <span className="holo-sticker inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white">Pro</span>
                    </div>
                  </HoloCard>
                  <HoloCard title="Cosmic Input" desc="Glass input field with prismatic focus glow.">
                    <div className="mt-4 space-y-3">
                      <input
                        type="text"
                        placeholder="Enter text..."
                        className="w-full px-4 py-2.5 bg-white/5 backdrop-blur-md border border-white/15 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-purple-400/50 focus:shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all"
                      />
                      <HoloButton className="w-full text-sm py-2.5">Submit</HoloButton>
                    </div>
                  </HoloCard>
                </div>
              </RevealBlock>
            )}

            {activeTab === "pricing" && (
              <RevealBlock>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pricingTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`group relative rounded-2xl p-8 border transition-all duration-300 ease-out cursor-pointer ${tier.highlighted
                        ? "holo-border-gradient bg-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:-translate-y-2"
                        : "bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-purple-400/40 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]"
                      }`}
                    >
                      {tier.highlighted && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="holo-sticker inline-block px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] text-white">
                            Popular
                          </span>
                        </div>
                      )}
                      <h3 className="text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] via-[#ffd700] to-[#00d4ff] bg-[length:200%_auto] group-hover:bg-right transition-[background-position] duration-500">
                        {tier.name}
                      </h3>
                      <p className="text-4xl font-bold text-white mb-1">{tier.price}<span className="text-sm text-white/40 font-normal">/mo</span></p>
                      <div className="w-full h-px bg-white/10 my-6" />
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" className="w-4 h-4 shrink-0"><path d="M5 12l5 5L20 7" /></svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                      {tier.highlighted ? (
                        <HoloButton className="w-full">Get Started</HoloButton>
                      ) : (
                        <button type="button" className="w-full px-6 py-3 rounded-xl font-bold text-sm text-white/70 border border-white/20 hover:text-white hover:border-white/40 hover:bg-white/5 active:scale-95 transition-all duration-300">
                          Choose Plan
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </RevealBlock>
            )}

            {activeTab === "badges" && (
              <RevealBlock>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10">
                  <h3 className="text-xl font-bold mb-2 holo-text-gradient">Holographic Badges</h3>
                  <p className="text-white/50 text-sm mb-8">Sticker-style badges with full rainbow gradient and animated shimmer overlay.</p>

                  <div className="space-y-8">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/30 font-bold mb-4">Pill Badges</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="holo-sticker inline-block px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#ff0080] via-[#ff6b00] to-[#ffd700] text-white">Hot</span>
                        <span className="holo-sticker inline-block px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#ffd700] via-[#00ff88] to-[#00d4ff] text-white">Fresh</span>
                        <span className="holo-sticker inline-block px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#00d4ff] via-[#6366f1] to-[#a855f7] text-white">Elite</span>
                        <span className="holo-sticker inline-block px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#a855f7] via-[#ff0080] to-[#ff6b00] text-white">Rare</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/30 font-bold mb-4">Status Indicators</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-sm font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#00ff88]" style={{ animation: "holo-pulse 2s ease-in-out infinite" }} />
                          Online
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffd700]/10 border border-[#ffd700]/30 text-[#ffd700] text-sm font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#ffd700]" style={{ animation: "holo-pulse 2s ease-in-out infinite 0.5s" }} />
                          Processing
                        </span>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff0080]/10 border border-[#ff0080]/30 text-[#ff0080] text-sm font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#ff0080]" />
                          Offline
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/30 font-bold mb-4">Full Spectrum Badge</p>
                      <div className="holo-border-gradient inline-block rounded-2xl">
                        <div className="holo-sticker bg-gradient-to-r from-[#ff0080] via-[#ff6b00] via-[#ffd700] via-[#00ff88] via-[#00d4ff] via-[#6366f1] to-[#a855f7] bg-[length:200%_auto] rounded-2xl px-8 py-4" style={{ animation: "holo-gradient-shift 4s ease infinite" }}>
                          <p className="text-white font-bold text-lg tracking-wide">HOLOGRAPHIC</p>
                          <p className="text-white/70 text-xs tracking-[0.3em] uppercase">Premium Collection</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}
          </div>
        </div>
      </section>

      {/* ── Color Palette ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="holo-text-gradient">Color Spectrum</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorTokens.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.05}>
                <div className="bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 group hover:border-purple-400/40 transition-all duration-300">
                  <div className={`h-20 ${c.tw} flex items-end p-3`}>
                    <span className="text-[10px] font-bold text-white/80 mix-blend-difference">{c.name}</span>
                  </div>
                  <div className="p-3 bg-[#0a0a1f]">
                    <p className="text-xs font-mono text-white/50">{c.hex}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Rules ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="holo-text-gradient">Design Rules</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealBlock>
              <div className="bg-[#00ff88]/5 backdrop-blur-xl rounded-2xl p-8 border border-[#00ff88]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#00ff88] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="black" className="w-5 h-5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#00ff88]">Do</h3>
                </div>
                <ul className="space-y-4">
                  {doRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full mt-2 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
            <RevealBlock delay={0.15}>
              <div className="bg-[#ff0080]/5 backdrop-blur-xl rounded-2xl p-8 border border-[#ff0080]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#ff0080] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#ff0080]">Don&apos;t</h3>
                </div>
                <ul className="space-y-4">
                  {dontRules.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 bg-[#ff0080] rounded-full mt-2 shrink-0" />
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
      <footer className="border-t border-white/10 bg-[#0a0a1f]">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              StyleKit &middot; Holographic Showcase
            </p>
            <Link href="/styles/holographic" className="text-white/40 hover:text-white text-sm transition-colors">
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
