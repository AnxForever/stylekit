"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
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
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

function XMarkIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}

function ZapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
    </svg>
  );
}

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.563 2 12.162 2 7c0-.538.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.749z" clipRule="evenodd" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1.503.204A6.5 6.5 0 1110 3.5a6.5 6.5 0 016.497 6.704zM10 9a1 1 0 100-2 1 1 0 000 2zm-2 3.5a2 2 0 104 0 2 2 0 00-4 0z" clipRule="evenodd" />
    </svg>
  );
}

function CodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M6.28 7.22a.75.75 0 010 1.06l-2.5 2.5 2.5 2.5a.75.75 0 11-1.06 1.06l-3.06-3.06a.75.75 0 010-1.06l3.06-3.06a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l3.06 3.06a.75.75 0 010 1.06l-3.06 3.06a.75.75 0 11-1.06-1.06l2.5-2.5-2.5-2.5a.75.75 0 010-1.06zm-1.174 8.548a.75.75 0 01-.96-.426L8.712 5.208a.75.75 0 011.386-.576l2.874 6.934a.75.75 0 01-.426.96z" clipRule="evenodd" />
    </svg>
  );
}

function CreditCardIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5v1h18v-1A1.5 1.5 0 0017.5 4h-15zM19 8.5H1V14a1.5 1.5 0 001.5 1.5h15A1.5 1.5 0 0019 14V8.5zm-8.625 3.375a.625.625 0 100 1.25.625.625 0 000-1.25zm-2.125.625a2.125 2.125 0 114.25 0 2.125 2.125 0 01-4.25 0z" clipRule="evenodd" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Grid background style object (reused across sections)              */
/* ------------------------------------------------------------------ */

const gridBg = {
  backgroundImage:
    "linear-gradient(to right, rgba(99,91,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,91,255,0.1) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type PricingPlan = {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "For individuals and small projects getting started.",
    features: ["10,000 API calls/month", "Basic analytics", "Community support", "Core payment methods"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Growth",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "For growing businesses that need more power and flexibility.",
    features: ["500,000 API calls/month", "Advanced analytics", "Priority support", "All payment methods", "Webhooks", "Team members (5)"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 149,
    annualPrice: 119,
    description: "For large-scale operations with custom needs.",
    features: ["Unlimited API calls", "Custom analytics", "Dedicated support", "All payment methods", "Custom webhooks", "Unlimited team members", "SLA guarantee", "Custom contracts"],
    cta: "Contact sales",
    highlighted: false,
  },
];

const colorTokens = [
  { name: "Stripe Purple", var: "--stripe-purple", hex: "#635bff", role: "Primary" },
  { name: "Dark Navy", var: "--stripe-dark", hex: "#0a2540", role: "Text / Background" },
  { name: "Light Gray", var: "--stripe-bg", hex: "#f6f9fc", role: "Page Background" },
  { name: "Cyan", var: "--stripe-cyan", hex: "#00d4ff", role: "Accent" },
  { name: "Light Purple", var: "--stripe-purple-light", hex: "#7a73ff", role: "Secondary" },
  { name: "Bright Cyan", var: "--stripe-bright-cyan", hex: "#80e9ff", role: "Highlight" },
];

const shadowLevels = [
  {
    name: "Card Rest",
    css: "shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]",
    desc: "Default card shadow — subtle two-layer depth",
  },
  {
    name: "Card Hover",
    css: "shadow-[0_12px_30px_rgba(0,0,0,0.08)]",
    desc: "Floating Matrix hover state — card lifts into view",
  },
  {
    name: "Button Rest",
    css: "shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]",
    desc: "Liquid Gradient Focus — convex glass surface with inset highlight",
  },
  {
    name: "Button Active",
    css: "shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
    desc: "Hairline Crispness — button depresses; outer glow disappears",
  },
];

type ComponentTab = "buttons" | "cards" | "forms" | "badges";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [cardFlipped, setCardFlipped] = useState(false);
  const [fluidHovered, setFluidHovered] = useState(false);
  const [floatHovered, setFloatHovered] = useState(false);
  const [activePressed, setActivePressed] = useState(false);
  const [easeDemo, setEaseDemo] = useState<"ease-out" | "ease-in-out" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f9fc] font-sans text-[#0a2540] overflow-x-hidden">
      <style>{`
        @keyframes stripe-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes stripe-glow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes stripe-slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes stripe-card-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .stripe-card-float {
          animation: stripe-float 5s ease-in-out infinite;
        }
        .stripe-glow-pulse {
          animation: stripe-glow-pulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* ============================================================== */}
      {/* 1. FIXED STICKY NAV                                            */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #635bff 0%, #7a73ff 100%)" }}
            >
              <ZapIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#0a2540] font-bold text-lg tracking-tight">
              stripe<span className="text-[#635bff]">style</span>
            </span>
          </div>

          {/* Center nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {["Hero", "Pricing", "Anatomy", "Components", "Interactions"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg text-sm text-[#425466] hover:text-[#0a2540] hover:bg-[#f6f9fc] cursor-pointer transition-all duration-[200ms] ease-out"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* CTA + back link */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-[#425466] hover:text-[#635bff] transition-colors duration-[200ms] ease-out hidden md:block"
            >
              ← Back
            </Link>
            <button
              className="
                px-5 py-2
                bg-[#635bff]
                rounded-lg
                text-white font-medium text-sm
                shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                hover:bg-[#5851ea]
                hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]
                hover:-translate-y-0.5
                active:scale-[0.98] active:translate-y-0
                active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
                transition-all duration-[300ms] ease-out
              "
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. HERO                                                        */}
      {/* ============================================================== */}
      <section className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden min-h-screen flex items-center">
        {/* Grid background */}
        <div className="absolute inset-0" style={gridBg} />

        {/* Purple gradient mesh */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 30%, rgba(99,91,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(0,212,255,0.08) 0%, transparent 50%)",
          }}
        />

        {/* Glowing orbs */}
        <div
          className="absolute top-24 right-16 w-80 h-80 rounded-full pointer-events-none stripe-glow-pulse"
          style={{
            background: "radial-gradient(circle, rgba(99,91,255,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-32 left-8 w-64 h-64 rounded-full pointer-events-none stripe-glow-pulse"
          style={{
            background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
            animationDelay: "1.5s",
          }}
        />

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — text */}
            <div>
              {/* Eyebrow */}
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
                }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#635bff]/10 text-[#635bff] text-xs font-semibold tracking-[0.12em] uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#635bff] inline-block" />
                  Stripe Design System
                </span>
              </div>

              {/* Heading */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(28px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                <span className="text-[#0a2540]">Financial</span>
                <br />
                <span className="text-[#0a2540]">infrastructure</span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #635bff 0%, #00d4ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  for the internet
                </span>
              </h1>

              {/* Sub */}
              <p
                className="text-[#425466] text-lg leading-relaxed max-w-lg mb-10"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                Millions of companies use Stripe to accept payments, send payouts, and manage their
                businesses online. Built with precision and trust at every layer.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-wrap gap-4"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                {/* Primary CTA — Liquid Gradient Focus + Fluid SaaS Motion + Hairline Crispness */}
                <button
                  className="
                    inline-flex items-center gap-2
                    px-8 py-4
                    bg-[#635bff]
                    rounded-lg
                    text-white font-semibold
                    shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                    hover:bg-[#5851ea]
                    hover:shadow-[0_4px_12px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]
                    hover:-translate-y-0.5
                    active:scale-[0.98] active:translate-y-0
                    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
                    transition-all duration-[300ms] ease-out
                  "
                >
                  Start now
                  <ArrowRightIcon className="w-4 h-4" />
                </button>

                {/* Secondary CTA */}
                <button
                  className="
                    inline-flex items-center gap-2
                    px-8 py-4
                    bg-white
                    rounded-lg
                    text-[#0a2540] font-semibold
                    shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.1)]
                    hover:-translate-y-0.5
                    active:scale-[0.98] active:translate-y-0
                    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]
                    transition-all duration-[300ms] ease-out
                  "
                >
                  Contact sales
                </button>
              </div>

              {/* Trust badges */}
              <div
                className="flex items-center gap-6 mt-10 text-xs text-[#425466]"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s",
                }}
              >
                {[
                  { icon: <LockIcon className="w-3.5 h-3.5 text-[#635bff]" />, label: "PCI DSS Level 1" },
                  { icon: <ShieldIcon className="w-3.5 h-3.5 text-[#635bff]" />, label: "SOC 2 Type II" },
                  { icon: <GlobeIcon className="w-3.5 h-3.5 text-[#635bff]" />, label: "135+ currencies" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5">
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating payment card illustration */}
            <div
              className="relative flex items-center justify-center"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
              }}
            >
              {/* Glow behind card */}
              <div
                className="absolute w-80 h-80 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(99,91,255,0.25) 0%, transparent 70%)",
                }}
              />

              {/* Main payment card */}
              <div
                className="relative stripe-card-float cursor-pointer select-none"
                onClick={() => setCardFlipped(!cardFlipped)}
              >
                <div
                  className="w-80 h-48 rounded-2xl p-6 flex flex-col justify-between shadow-[0_24px_48px_rgba(99,91,255,0.25),0_8px_24px_rgba(0,0,0,0.12)]"
                  style={{
                    background: cardFlipped
                      ? "linear-gradient(135deg, #0a2540 0%, #1a3a5c 100%)"
                      : "linear-gradient(135deg, #635bff 0%, #7a73ff 50%, #00d4ff 100%)",
                    transition: "background 0.6s ease-out",
                  }}
                >
                  {!cardFlipped ? (
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-white/60 text-xs mb-1">STRIPE CARD</div>
                          <div className="flex gap-1">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i} className="flex gap-0.5">
                                {[0, 1, 2, 3].map((j) => (
                                  <div key={j} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Chip */}
                        <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-90" />
                      </div>
                      <div>
                        <div className="text-white/50 text-[10px] mb-1">CARD NUMBER</div>
                        <div className="text-white font-mono text-lg tracking-widest">
                          4242 4242 4242 4242
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-white/50 text-[10px] mb-0.5">CARDHOLDER</div>
                          <div className="text-white text-sm font-medium">Alex Johnson</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-[10px] mb-0.5">EXPIRES</div>
                          <div className="text-white text-sm font-medium">12/28</div>
                        </div>
                        {/* Visa-style logo */}
                        <div className="text-white font-bold text-xl italic">VISA</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full h-10 bg-black/30 -mx-6 mt-2 mb-4" style={{ marginLeft: "-24px", marginRight: "-24px", width: "calc(100% + 48px)" }} />
                      <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                        <div className="text-white/50 text-xs">CVV</div>
                        <div className="text-white font-mono text-sm tracking-widest">***</div>
                      </div>
                      <div className="text-white/40 text-xs text-center mt-auto">
                        Click to flip back
                      </div>
                    </>
                  )}
                </div>

                {/* Tap hint */}
                <p className="text-center text-[#425466] text-xs mt-3">
                  {cardFlipped ? "Showing CVV back" : "Click card to flip"}
                </p>
              </div>

              {/* Secondary floating mini-card (background) */}
              <div
                className="absolute -bottom-4 -right-4 w-52 h-32 rounded-xl p-4 flex flex-col justify-between shadow-[0_12px_24px_rgba(0,0,0,0.15)] opacity-80"
                style={{
                  background: "linear-gradient(135deg, #0a2540 0%, #1a3a5c 100%)",
                  animation: "stripe-float 7s ease-in-out infinite 1.2s",
                  zIndex: -1,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-white/30" />
                    ))}
                  </div>
                  <div className="text-white/40 text-[10px]">DEBIT</div>
                </div>
                <div className="text-white/60 font-mono text-xs tracking-widest">
                  5353 **** **** 9821
                </div>
              </div>

              {/* Transaction pill floating top-right */}
              <div
                className="absolute -top-4 -right-2 bg-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.12)] text-xs"
                style={{ animation: "stripe-float 6s ease-in-out infinite 0.8s" }}
              >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckIcon className="w-3.5 h-3.5 text-green-500" />
                </div>
                <div>
                  <div className="text-[#0a2540] font-semibold">$2,847.00</div>
                  <div className="text-[#425466]">Payment confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. LIVE DEMO — Stripe-style pricing page                       */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-50" style={gridBg} />

        <div className="relative max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635bff]/10 text-[#635bff] text-xs font-semibold tracking-[0.12em] uppercase mb-4">
              <CreditCardIcon className="w-3.5 h-3.5" />
              Live Demo
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a2540] leading-tight">
              Simple, transparent pricing
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="text-center mb-10">
            <p className="text-[#425466] text-lg max-w-xl mx-auto leading-relaxed">
              No hidden fees. No setup costs. Scale from zero to enterprise with a single platform.
            </p>
          </RevealBlock>

          {/* Billing toggle */}
          <RevealBlock delay={0.1} className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 bg-[#f6f9fc] rounded-xl p-1 border border-gray-200">
              {(["monthly", "annual"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setBilling(period)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-[300ms] ease-out capitalize ${
                    billing === period
                      ? "bg-white text-[#0a2540] shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)]"
                      : "text-[#425466] hover:text-[#0a2540]"
                  }`}
                >
                  {period}
                  {period === "annual" && (
                    <span className="ml-2 px-1.5 py-0.5 rounded-md bg-[#635bff]/10 text-[#635bff] text-[10px] font-semibold">
                      Save 20%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <RevealBlock key={plan.name} delay={i * 0.08}>
                <div
                  className={`group relative rounded-xl p-8 h-full transition-all duration-[400ms] ease-out hover:-translate-y-1 ${
                    plan.highlighted
                      ? "bg-[#635bff] text-white shadow-[0_8px_24px_rgba(99,91,255,0.3),0_4px_8px_rgba(99,91,255,0.2)]"
                      : "bg-white border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#00d4ff] text-[#0a2540] text-xs font-bold">
                      Most Popular
                    </div>
                  )}

                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      plan.highlighted ? "text-white" : "text-[#0a2540]"
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <div className="mb-4">
                    <span
                      className={`text-5xl font-bold ${
                        plan.highlighted ? "text-white" : "text-[#0a2540]"
                      }`}
                    >
                      ${billing === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    {(billing === "monthly" ? plan.monthlyPrice : plan.annualPrice) > 0 && (
                      <span
                        className={`text-sm ml-1 ${
                          plan.highlighted ? "text-white/70" : "text-[#425466]"
                        }`}
                      >
                        /month
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      plan.highlighted ? "text-white/80" : "text-[#425466]"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            plan.highlighted ? "bg-white/20" : "bg-[#635bff]/10"
                          }`}
                        >
                          <CheckIcon
                            className={`w-3 h-3 ${
                              plan.highlighted ? "text-white" : "text-[#635bff]"
                            }`}
                          />
                        </div>
                        <span
                          className={plan.highlighted ? "text-white/90" : "text-[#425466]"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-[300ms] ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 ${
                      plan.highlighted
                        ? "bg-white text-[#635bff] shadow-[0_2px_5px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
                        : "bg-[#635bff] text-white shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. STYLE ANATOMY — Color tokens, shadow levels, grid code      */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[#f6f9fc]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635bff]/10 text-[#635bff] text-xs font-semibold tracking-[0.12em] uppercase mb-4">
              <CodeIcon className="w-3.5 h-3.5" />
              Style Anatomy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a2540] leading-tight">
              Color system &amp; tokens
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-[#425466] text-lg max-w-lg leading-relaxed">
              Six precisely chosen values. Every Stripe interface descends from this palette —
              no improvisation, no approximation.
            </p>
          </RevealBlock>

          {/* Color tokens grid */}
          <RevealBlock delay={0.1} className="mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {colorTokens.map((token) => (
                <div
                  key={token.name}
                  className="group bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] transition-all duration-[400ms] ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] cursor-default"
                >
                  <div
                    className="w-full h-14 rounded-lg mb-4 transition-transform duration-[400ms] group-hover:scale-110"
                    style={{
                      backgroundColor: token.hex,
                      border: token.hex === "#f6f9fc" ? "1.5px solid #e3e8ee" : "none",
                    }}
                  />
                  <div className="text-[#0a2540] font-semibold text-sm mb-0.5">{token.name}</div>
                  <div className="font-mono text-xs text-[#635bff] mb-1">{token.hex}</div>
                  <div className="text-[#425466] text-xs">{token.role}</div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Shadow levels */}
          <RevealBlock delay={0.15} className="mb-12">
            <h3 className="text-xl font-bold text-[#0a2540] mb-6">Shadow system</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {shadowLevels.map((level, i) => (
                <div
                  key={level.name}
                  className="bg-white rounded-xl p-6 border border-gray-100"
                  style={{
                    boxShadow:
                      i === 0
                        ? "0 2px 4px rgba(0,0,0,0.04),0 8px 16px rgba(0,0,0,0.08)"
                        : i === 1
                        ? "0 12px 30px rgba(0,0,0,0.08)"
                        : i === 2
                        ? "0 2px 5px rgba(99,91,255,0.4),inset 0 1px 0 rgba(255,255,255,0.2)"
                        : "inset 0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[#0a2540] font-semibold text-sm">{level.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#f6f9fc] text-[#425466] text-[10px] font-mono">
                      Level {i + 1}
                    </span>
                  </div>
                  <p className="text-[#425466] text-xs leading-relaxed mb-3">{level.desc}</p>
                  <code className="block text-[10px] text-[#635bff] font-mono bg-[#f6f9fc] rounded-lg px-3 py-2 break-all">
                    {level.css}
                  </code>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Grid background code */}
          <RevealBlock delay={0.2}>
            <div className="bg-[#0a2540] rounded-xl p-6 relative overflow-hidden">
              {/* Grid overlay on the dark block itself */}
              <div className="absolute inset-0 opacity-20" style={gridBg} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60 text-xs font-semibold tracking-[0.12em] uppercase">
                    Grid Background
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                </div>
                <pre className="text-sm font-mono text-[#80e9ff] leading-relaxed overflow-x-auto">
{`/* CSS property */
backgroundImage: \`
  linear-gradient(
    to right,
    rgba(99,91,255,0.1) 1px,
    transparent 1px
  ),
  linear-gradient(
    to bottom,
    rgba(99,91,255,0.1) 1px,
    transparent 1px
  )
\`,
backgroundSize: "40px 40px"`}
                </pre>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. COMPONENT GALLERY — 4 tabs                                  */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635bff]/10 text-[#635bff] text-xs font-semibold tracking-[0.12em] uppercase mb-4">
              Components
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a2540] leading-tight">
              Precision-built UI blocks
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-[#425466] text-lg max-w-lg leading-relaxed">
              Every component is engineered with multi-layer shadows, exact easing, and the four
              aiRules baked in — no shortcuts.
            </p>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "forms", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-[300ms] ease-out hover:-translate-y-0.5 active:scale-[0.98] ${
                    activeTab === tab
                      ? "bg-[#635bff] text-white shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
                      : "bg-[#f6f9fc] text-[#425466] border border-gray-200 hover:text-[#0a2540]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Panel */}
          <RevealBlock delay={0.15}>
            <div className="bg-[#f6f9fc] rounded-2xl p-8 md:p-12 border border-gray-200">

              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  {/* Primary */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#425466] mb-5">
                      Primary — Liquid Gradient Focus + Fluid SaaS Motion + Hairline Crispness
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="px-6 py-2.5 bg-[#635bff] rounded-lg text-white font-medium text-sm shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out">
                        Get Started
                      </button>
                      <button className="px-6 py-2.5 bg-[#635bff] rounded-lg text-white font-medium text-sm shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out flex items-center gap-2">
                        <ZapIcon className="w-3.5 h-3.5" />
                        Start now
                      </button>
                      <button className="px-6 py-2.5 bg-[#0a2540] rounded-lg text-white font-medium text-sm shadow-[0_2px_5px_rgba(10,37,64,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-[#0d2e50] hover:shadow-[0_4px_10px_rgba(10,37,64,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out">
                        Dark
                      </button>
                    </div>
                  </div>

                  {/* Secondary / Ghost */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#425466] mb-5">
                      Secondary &amp; Ghost
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="px-6 py-2.5 bg-white rounded-lg text-[#0a2540] font-medium text-sm border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] transition-all duration-[300ms] ease-out">
                        Secondary
                      </button>
                      <button className="px-6 py-2.5 rounded-lg text-[#635bff] font-medium text-sm border border-[#635bff]/30 hover:bg-[#635bff]/5 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-[300ms] ease-out">
                        Outlined
                      </button>
                      <button className="px-6 py-2.5 rounded-lg text-[#425466] font-medium text-sm hover:text-[#635bff] hover:bg-[#635bff]/5 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-[300ms] ease-out">
                        Ghost
                      </button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#425466] mb-5">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      {[
                        { label: "SM", cls: "px-4 py-2 text-xs" },
                        { label: "MD", cls: "px-6 py-2.5 text-sm" },
                        { label: "LG", cls: "px-8 py-3.5 text-base" },
                      ].map(({ label, cls }) => (
                        <button
                          key={label}
                          className={`bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out ${cls}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* State comparison */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#425466] mb-5">
                      States: rest / hover / active (hold click)
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex flex-col items-center gap-2">
                        <button className="px-5 py-2.5 bg-[#635bff] rounded-lg text-white text-sm font-medium shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]">
                          Rest
                        </button>
                        <span className="text-[10px] text-[#425466]">outer glow</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <button className="px-5 py-2.5 bg-[#5851ea] rounded-lg text-white text-sm font-medium -translate-y-0.5 shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]">
                          Hover
                        </button>
                        <span className="text-[10px] text-[#425466]">lifted + deeper glow</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <button className="px-5 py-2.5 bg-[#5851ea] rounded-lg text-white text-sm font-medium scale-[0.98] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                          Active
                        </button>
                        <span className="text-[10px] text-[#425466]">depressed + inset only</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS TAB ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    {
                      title: "Payments",
                      desc: "Accept payments online with a complete platform supporting 135+ currencies and all major payment methods.",
                      iconBg: "bg-[#635bff]/10",
                      iconColor: "text-[#635bff]",
                      icon: <CreditCardIcon className="w-5 h-5" />,
                    },
                    {
                      title: "Security",
                      desc: "PCI DSS Level 1 compliance, 3D Secure 2, and advanced fraud detection built into every transaction.",
                      iconBg: "bg-emerald-100",
                      iconColor: "text-emerald-600",
                      icon: <ShieldIcon className="w-5 h-5" />,
                    },
                    {
                      title: "Global Reach",
                      desc: "Operate in 47 countries, accept 135+ currencies, and access local payment methods worldwide.",
                      iconBg: "bg-cyan-100",
                      iconColor: "text-cyan-600",
                      icon: <GlobeIcon className="w-5 h-5" />,
                    },
                    {
                      title: "Developer API",
                      desc: "RESTful APIs, SDKs in 10+ languages, and extensive documentation to go live in minutes.",
                      iconBg: "bg-orange-100",
                      iconColor: "text-orange-600",
                      icon: <CodeIcon className="w-5 h-5" />,
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group p-6 bg-white rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.04)] transition-all duration-[400ms] ease-out cursor-pointer border border-gray-100"
                    >
                      <div
                        className={`w-10 h-10 ${card.iconBg} ${card.iconColor} rounded-lg flex items-center justify-center mb-4 transition-transform duration-[400ms] ease-out group-hover:scale-110`}
                      >
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-[#0a2540] mb-2">{card.title}</h3>
                      <p className="text-[#425466] text-sm leading-relaxed">{card.desc}</p>
                      <div className="mt-4 flex items-center gap-1 text-[#635bff] text-xs font-medium transition-all duration-[300ms] ease-out group-hover:gap-2">
                        Learn more
                        <ChevronRightIcon className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- FORMS TAB ---- */}
              {activeTab === "forms" && (
                <div className="max-w-lg mx-auto space-y-5">
                  <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]">
                    <h3 className="text-[#0a2540] font-bold text-lg mb-1">Payment details</h3>
                    <p className="text-[#425466] text-sm mb-6">Secured by Stripe — TLS 1.3 encrypted</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0a2540] mb-1.5 tracking-wide">
                          Card number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all duration-[200ms] ease-out"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <CreditCardIcon className="w-5 h-5 text-gray-300" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#0a2540] mb-1.5 tracking-wide">
                            Expiry date
                          </label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all duration-[200ms] ease-out"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#0a2540] mb-1.5 tracking-wide">
                            CVC
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all duration-[200ms] ease-out"
                            />
                            <LockIcon className="w-4 h-4 text-gray-300 absolute right-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0a2540] mb-1.5 tracking-wide">
                          Name on card
                        </label>
                        <input
                          type="text"
                          placeholder="Alex Johnson"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all duration-[200ms] ease-out"
                        />
                      </div>

                      <button className="w-full py-3.5 bg-[#635bff] rounded-lg text-white font-semibold shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out flex items-center justify-center gap-2 mt-2">
                        <LockIcon className="w-4 h-4" />
                        Pay $49.00
                      </button>

                      <div className="flex items-center justify-center gap-2 text-[#425466] text-xs mt-1">
                        <ShieldIcon className="w-3.5 h-3.5 text-[#635bff]" />
                        Secured by Stripe — your data is encrypted
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  {/* Status pills */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#425466] mb-5">
                      Status badges
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "Active", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
                        { label: "Pending", bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
                        { label: "Failed", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
                        { label: "Cancelled", bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
                        { label: "Refunded", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${b.bg} ${b.text} transition-all duration-[300ms] ease-out hover:-translate-y-0.5 cursor-default`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${b.dot}`} />
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Feature tags */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#425466] mb-5">
                      Feature tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Stripe.js", "Payment Intents", "Webhooks", "Radar", "Connect",
                        "Billing", "Terminal", "Issuing", "Treasury", "Identity",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg bg-[#f6f9fc] border border-gray-200 text-[#425466] text-xs font-medium transition-all duration-[300ms] ease-out hover:border-[#635bff]/30 hover:text-[#635bff] hover:bg-[#635bff]/5 hover:-translate-y-0.5 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Payment method badges */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#425466] mb-5">
                      Payment methods
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "SEPA", "ACH", "iDEAL"].map((method) => (
                        <div
                          key={method}
                          className="px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-[#0a2540] text-xs font-semibold transition-all duration-[300ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,0,0,0.08)] cursor-default"
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. ANIMATION & INTERACTION RULES — 4 interactive demo cards    */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-[#f6f9fc] relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={gridBg} />

        <div className="relative max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635bff]/10 text-[#635bff] text-xs font-semibold tracking-[0.12em] uppercase mb-4">
              <ZapIcon className="w-3.5 h-3.5" />
              Interactions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a2540] leading-tight">
              Animation &amp; interaction rules
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-[#425466] text-lg max-w-lg leading-relaxed">
              Four named rules — each with a precise implementation. Hover and click to feel each
              one in action.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1: Fluid SaaS Motion */}
            <RevealBlock delay={0.08}>
              <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#635bff]/10 text-[#635bff] text-xs font-bold">
                    Fluid SaaS Motion
                  </span>
                </div>
                <p className="text-xs text-[#425466] font-mono mb-1 leading-relaxed">
                  hover:-translate-y-0.5
                </p>
                <p className="text-xs text-[#425466] font-mono mb-6 leading-relaxed">
                  transition-all duration-[300ms] ease-out
                </p>
                <p className="text-sm text-[#425466] leading-relaxed mb-6">
                  Buttons rise 2px on hover. The motion is{" "}
                  <strong className="text-[#0a2540]">ease-out</strong> — fast start, smooth
                  landing. Never ease-in-out. Never instantaneous.
                </p>
                <div className="flex items-center justify-center py-4">
                  <button
                    className="px-8 py-3 bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out"
                    onMouseEnter={() => setFluidHovered(true)}
                    onMouseLeave={() => setFluidHovered(false)}
                  >
                    Hover me
                  </button>
                </div>
                <p className="text-xs text-[#425466] text-center mt-1">
                  {fluidHovered
                    ? "Lifted 2px — responsive but never jarring"
                    : "Hover to feel the controlled lift"}
                </p>
              </div>
            </RevealBlock>

            {/* Card 2: Floating Matrix */}
            <RevealBlock delay={0.12}>
              <div
                className="bg-white rounded-xl p-8 border border-gray-100 h-full cursor-pointer group"
                style={{
                  boxShadow: floatHovered
                    ? "0 12px 30px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)"
                    : "0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08)",
                  transform: floatHovered ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 400ms ease-out",
                }}
                onMouseEnter={() => setFloatHovered(true)}
                onMouseLeave={() => setFloatHovered(false)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#00d4ff]/10 text-[#0a2540] text-xs font-bold">
                    Floating Matrix
                  </span>
                </div>
                <p className="text-xs text-[#425466] font-mono mb-1 leading-relaxed">
                  hover:-translate-y-1 duration-[400ms] ease-out
                </p>
                <p className="text-xs text-[#425466] font-mono mb-6 leading-relaxed">
                  group-hover:scale-110 (icon) duration-[400ms]
                </p>
                <p className="text-sm text-[#425466] leading-relaxed mb-6">
                  Cards float upward on hover. The icon area{" "}
                  <strong className="text-[#0a2540]">scales to 110%</strong> — it celebrates
                  becoming interactive.
                </p>
                <div className="flex items-center justify-center py-2">
                  <div className="flex items-center gap-4 p-5 bg-[#f6f9fc] rounded-xl w-full">
                    <div
                      className="w-12 h-12 bg-[#635bff]/10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-[400ms] ease-out"
                      style={{ transform: floatHovered ? "scale(1.1)" : "scale(1)" }}
                    >
                      <CreditCardIcon className="w-6 h-6 text-[#635bff]" />
                    </div>
                    <div>
                      <div className="text-[#0a2540] font-semibold text-sm">Payments</div>
                      <div className="text-[#425466] text-xs">Hover the card</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#425466] text-center mt-3">
                  {floatHovered ? "Card floating — icon celebrated" : "Hover this card to float it"}
                </p>
              </div>
            </RevealBlock>

            {/* Card 3: Liquid Gradient Focus */}
            <RevealBlock delay={0.16}>
              <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#7a73ff]/15 text-[#635bff] text-xs font-bold">
                    Liquid Gradient Focus
                  </span>
                </div>
                <p className="text-xs text-[#425466] font-mono mb-1 leading-relaxed">
                  shadow-[0_2px_5px_rgba(99,91,255,0.4),
                </p>
                <p className="text-xs text-[#425466] font-mono mb-6 leading-relaxed">
                  {"  "}inset_0_1px_0_rgba(255,255,255,0.2)]
                </p>
                <p className="text-sm text-[#425466] leading-relaxed mb-6">
                  The inset highlight simulates a{" "}
                  <strong className="text-[#0a2540]">convex glass surface</strong> catching light.
                  Present at rest AND on hover. Never a flat button without shadow.
                </p>
                <div className="flex flex-col items-center gap-4 py-2">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <button className="px-5 py-2.5 bg-[#635bff] rounded-lg text-white text-sm font-medium shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]">
                        With inset
                      </button>
                      <span className="text-[10px] text-emerald-600 font-semibold">Correct</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <button className="px-5 py-2.5 bg-[#635bff] rounded-lg text-white text-sm font-medium">
                        No shadow
                      </button>
                      <span className="text-[10px] text-red-500 font-semibold">Wrong</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Card 4: Hairline Crispness */}
            <RevealBlock delay={0.2}>
              <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold">
                    Hairline Crispness
                  </span>
                </div>
                <p className="text-xs text-[#425466] font-mono mb-1 leading-relaxed">
                  active:scale-[0.98] active:translate-y-0
                </p>
                <p className="text-xs text-[#425466] font-mono mb-6 leading-relaxed">
                  active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
                </p>
                <p className="text-sm text-[#425466] leading-relaxed mb-6">
                  On click, the button{" "}
                  <strong className="text-[#0a2540]">physically depresses</strong>. The outer glow
                  disappears entirely. Only the inset concave shadow remains.
                </p>
                <div className="flex items-center justify-center py-2">
                  <button
                    className="px-8 py-3 bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out"
                    onMouseDown={() => setActivePressed(true)}
                    onMouseUp={() => setActivePressed(false)}
                    onMouseLeave={() => setActivePressed(false)}
                  >
                    Click &amp; hold
                  </button>
                </div>
                <p className="text-xs text-[#425466] text-center mt-3">
                  {activePressed
                    ? "Depressed — inset shadow only, outer glow gone"
                    : "Click and hold to feel the physical press"}
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. DESIGN RULES — DO / DON'T                                   */}
      {/* ============================================================== */}
      <section className="py-20 md:py-28 px-5 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#635bff]/10 text-[#635bff] text-xs font-semibold tracking-[0.12em] uppercase mb-4">
              Design Rules
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a2540] leading-tight">
              Do &amp; Don&apos;t
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-[#425466] text-lg max-w-lg leading-relaxed">
              Stripe Style has strict invariants. Break these and the design loses its precision
              and trust signal.
            </p>
          </RevealBlock>

          {/* Ease-out vs ease-in-out demo */}
          <RevealBlock delay={0.08} className="mb-10">
            <div className="bg-[#f6f9fc] rounded-xl p-6 border border-gray-200">
              <h3 className="text-[#0a2540] font-semibold mb-1">Easing rule: ease-out ONLY</h3>
              <p className="text-[#425466] text-sm mb-6 leading-relaxed">
                Stripe animations always use <code className="text-[#635bff] font-mono text-xs">ease-out</code> — fast departure,
                smooth landing. <code className="text-red-500 font-mono text-xs">ease-in-out</code> feels sluggish and wrong for SaaS.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-emerald-600">ease-out (correct)</span>
                    <button
                      className="text-xs px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                      onClick={() => setEaseDemo(easeDemo === "ease-out" ? null : "ease-out")}
                    >
                      Animate
                    </button>
                  </div>
                  <div className="relative h-10 bg-emerald-50 rounded-lg overflow-hidden border border-emerald-100">
                    <div
                      className="absolute top-1/2 left-2 -translate-y-1/2 w-7 h-7 rounded-md bg-[#635bff]"
                      style={{
                        transform: `translateY(-50%) translateX(${easeDemo === "ease-out" ? "160px" : "0"})`,
                        transition: easeDemo === "ease-out" ? "transform 0.6s ease-out" : "none",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-red-500">ease-in-out (forbidden)</span>
                    <button
                      className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      onClick={() => setEaseDemo(easeDemo === "ease-in-out" ? null : "ease-in-out")}
                    >
                      Animate
                    </button>
                  </div>
                  <div className="relative h-10 bg-red-50 rounded-lg overflow-hidden border border-red-100">
                    <div
                      className="absolute top-1/2 left-2 -translate-y-1/2 w-7 h-7 rounded-md bg-red-400"
                      style={{
                        transform: `translateY(-50%) translateX(${easeDemo === "ease-in-out" ? "160px" : "0"})`,
                        transition: easeDemo === "ease-in-out" ? "transform 0.6s ease-in-out" : "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do */}
            <RevealBlock delay={0.1}>
              <div className="bg-white rounded-xl p-8 border border-emerald-100 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-700">Do</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Use Stripe purple #635bff as the only primary action color",
                    "Add grid background (40px grid, rgba(99,91,255,0.1)) on hero and demo sections",
                    "Use multi-layer shadows: 0_2px_4px + 0_8px_16px at rest",
                    "Inset highlight shadow on all purple buttons — convex glass",
                    "Button hover uses ease-out with duration-[300ms]",
                    "Card hover uses ease-out with duration-[400ms]",
                    "Icon area scales to 110% on card hover (group-hover:scale-110)",
                    "Active state: inset shadow only — no outer glow on pressed",
                    "Use rounded-lg or rounded-xl for cards and buttons",
                    "Dark text #0a2540, secondary text #425466",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-[#425466] leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.15}>
              <div className="bg-white rounded-xl p-8 border border-red-100 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <XMarkIcon className="w-4 h-4 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-red-500">Don&apos;t</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "No hover:scale-* on buttons — Stripe only lifts, never enlarges",
                    "No flat button without shadow — Liquid Gradient Focus is mandatory",
                    "No ease-in-out or ease — always ease-out only",
                    "No outer shadow on active state — only inset shadow remains",
                    "No oversized rounded-3xl or rounded-full on cards",
                    "No single-layer flat shadows — always multi-layer",
                    "No bright neon or saturated colors outside the defined palette",
                    "No rough transitions below duration-[300ms] for buttons",
                    "No grid background omission on hero/demo sections",
                    "No generic gray shadows — use rgba(99,91,255,...) for purple buttons",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-[#425466] leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. FOOTER — dark #0a2540 + grid lines + color swatches         */}
      {/* ============================================================== */}
      <footer className="relative bg-[#0a2540] overflow-hidden">
        {/* Grid overlay on dark bg */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(99,91,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,91,255,0.25) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Purple glow top-left */}
        <div
          className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top left, rgba(99,91,255,0.2) 0%, transparent 60%)",
          }}
        />

        {/* Cyan glow bottom-right */}
        <div
          className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
          style={{
            background: "radial-gradient(circle at bottom right, rgba(0,212,255,0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-14">
            {/* Brand + description */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #635bff 0%, #7a73ff 100%)" }}
                >
                  <ZapIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-xl tracking-tight">
                  stripe<span className="text-[#635bff]">style</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Precision SaaS design built on Stripe&apos;s visual language. Every shadow,
                motion, and color is exact — no approximation.
              </p>

              {/* Color swatches */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white/30 text-xs font-semibold tracking-[0.12em] uppercase">
                  Palette
                </span>
              </div>
              <div className="flex gap-2">
                {colorTokens.map((token) => (
                  <div
                    key={token.name}
                    className="group relative"
                  >
                    <div
                      className="w-7 h-7 rounded-full border-2 border-white/10 transition-all duration-[300ms] ease-out hover:scale-110 hover:border-white/30 cursor-default"
                      style={{ backgroundColor: token.hex }}
                      title={`${token.name} — ${token.hex}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div className="flex flex-col gap-3">
                <span className="text-white/30 text-xs font-semibold tracking-[0.15em] uppercase mb-1">
                  Style
                </span>
                <Link
                  href="/styles/stripe-style"
                  className="text-white/60 hover:text-white transition-colors duration-[200ms] ease-out"
                >
                  Documentation
                </Link>
                <Link
                  href="/styles/stripe-style/showcase"
                  className="text-white/60 hover:text-white transition-colors duration-[200ms] ease-out"
                >
                  Showcase
                </Link>
                <Link
                  href="/styles/stripe-style/cover"
                  className="text-white/60 hover:text-white transition-colors duration-[200ms] ease-out"
                >
                  Cover
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-white/30 text-xs font-semibold tracking-[0.15em] uppercase mb-1">
                  StyleKit
                </span>
                <Link
                  href="/"
                  className="text-white/60 hover:text-white transition-colors duration-[200ms] ease-out"
                >
                  Home
                </Link>
                <Link
                  href="/styles"
                  className="text-white/60 hover:text-white transition-colors duration-[200ms] ease-out"
                >
                  All Styles
                </Link>
                <Link
                  href="/generate"
                  className="text-white/60 hover:text-white transition-colors duration-[200ms] ease-out"
                >
                  Generate
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-white/30 text-xs font-semibold tracking-[0.15em] uppercase mb-1">
                  Rules
                </span>
                {[
                  "Fluid SaaS Motion",
                  "Floating Matrix",
                  "Liquid Gradient",
                  "Hairline Crispness",
                ].map((rule) => (
                  <span key={rule} className="text-white/40 text-xs flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#635bff] inline-block" />
                    {rule}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white/40 text-xs">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#635bff]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#7a73ff]" />
              </div>
              <span>Built for StyleKit — Stripe Style design system</span>
            </div>

            <Link
              href="/"
              className="
                inline-flex items-center gap-2
                px-5 py-2.5
                bg-[#635bff]
                rounded-lg
                text-white text-sm font-medium
                shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                hover:bg-[#5851ea]
                hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]
                hover:-translate-y-0.5
                active:scale-[0.98] active:translate-y-0
                active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
                transition-all duration-[300ms] ease-out
              "
            >
              <ArrowRightIcon className="w-3.5 h-3.5 rotate-180" />
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
