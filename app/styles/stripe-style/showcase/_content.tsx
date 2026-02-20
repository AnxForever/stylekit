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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const products = [
  {
    icon: "payments",
    title: "Payments",
    desc: "Accept payments online, in person, or around the world with a payments solution built for any business.",
  },
  {
    icon: "billing",
    title: "Billing",
    desc: "Build and scale your recurring business model. Automate revenue collection and financial operations.",
  },
  {
    icon: "connect",
    title: "Connect",
    desc: "Set up multi-party payments and payouts with a few API calls. Build a platform or marketplace.",
  },
  {
    icon: "terminal",
    title: "Terminal",
    desc: "Build delightful in-person payment experiences with pre-certified card readers and cloud-based APIs.",
  },
  {
    icon: "radar",
    title: "Radar",
    desc: "Fight fraud with machine learning. Block fraudulent payments with adaptive, real-time decisioning.",
  },
  {
    icon: "atlas",
    title: "Atlas",
    desc: "Start a company. Stripe Atlas helps you incorporate, issue stock, and handle compliance automatically.",
  },
];

const colorPalette = [
  { name: "Stripe Purple", hex: "#635bff", textColor: "#ffffff" },
  { name: "Dark Navy", hex: "#0a2540", textColor: "#ffffff" },
  { name: "Cyan", hex: "#00d4ff", textColor: "#0a2540" },
  { name: "Light Purple", hex: "#7a73ff", textColor: "#ffffff" },
  { name: "Bright Cyan", hex: "#80e9ff", textColor: "#0a2540" },
  { name: "Surface", hex: "#f6f9fc", textColor: "#0a2540" },
];

const shadowLevels = [
  {
    label: "Rest",
    css: "0 2px 5px rgba(99,91,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
    desc: "Liquid Gradient Focus — convex glass catching light",
  },
  {
    label: "Hover",
    css: "0 4px 10px rgba(99,91,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
    desc: "Amplified outer glow, inset maintained",
  },
  {
    label: "Active",
    css: "inset 0 2px 4px rgba(0,0,0,0.2)",
    desc: "Hairline Crispness — outer glow removed, concave inset only",
  },
  {
    label: "Card",
    css: "0 2px 10px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04)",
    desc: "Floating Matrix — layered depth at rest",
  },
  {
    label: "Card Lift",
    css: "0 12px 30px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
    desc: "Floating Matrix — hover lifts card off surface",
  },
];

const doRules = [
  "Use Stripe Purple #635bff as the primary color throughout",
  "Apply grid background (40px) for technical, infrastructure feel",
  "Use multi-layer refined shadows — never a single flat shadow",
  "Keep moderate corners: rounded-lg (8px) or rounded-xl (12px)",
  "Fluid SaaS Motion: hover:-translate-y-0.5 duration-[300ms] ease-out",
  "Floating Matrix: card hover:-translate-y-1 duration-[400ms] ease-out",
  "Liquid Gradient Focus: inset 0 1px 0 rgba(255,255,255,0.2) on buttons",
  "Hairline Crispness: active:scale-[0.98] with inset shadow only",
];

const dontRules = [
  "Use overly bright, garish, or non-brand colors",
  "Use extra-large corners (rounded-3xl, rounded-2xl on cards)",
  "Use a single rough shadow — always layer at least two",
  "Skip the grid background — it is the signature technical element",
  "Use hover:scale-* on buttons — Stripe floats, never enlarges",
  "Omit inset highlight — it is the core of Stripe button quality",
  "Use ease-in-out or ease — always use ease-out (decelerate only)",
  "Keep outer shadow on active state — use inset shadow exclusively",
];

const tabs = ["Buttons", "Cards", "Inputs", "Code Block"] as const;
type Tab = typeof tabs[number];

/* ------------------------------------------------------------------ */
/*  Icon Component                                                     */
/* ------------------------------------------------------------------ */

function ProductIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    payments: (
      <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2H4zm0 4h12v2H4V8z" />
    ),
    billing: (
      <>
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path d="M2 10h16v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
      </>
    ),
    connect: (
      <path d="M13 7H7v6l4-2 2 4 1.5-3H18V7h-5zm-9 0H2v6h2V7zm0 8H2v2h2v-2z" />
    ),
    terminal: (
      <>
        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
        <path d="M6 8l3 2-3 2V8zm4 6h4" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" />
      </>
    ),
    radar: (
      <>
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="1.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    atlas: (
      <path d="M10 2L3 6v8l7 4 7-4V6l-7-4zm0 2.4L15 7v6l-5 2.8L5 13V7l5-2.6z" />
    ),
  };
  return (
    <svg
      className="w-5 h-5 text-[#635bff]"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      {icons[type] ?? icons.payments}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Card                                                       */
/* ------------------------------------------------------------------ */

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="group p-6 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.04)] transition-all duration-[400ms] ease-out cursor-pointer">
      <div className="w-10 h-10 bg-[#635bff]/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-[400ms] ease-out">
        <ProductIcon type={product.icon} />
      </div>
      <h3 className="text-base font-semibold text-[#0a2540] mb-2">
        {product.title}
      </h3>
      <p className="text-sm text-[#425466] leading-relaxed">{product.desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab demos                                                          */
/* ------------------------------------------------------------------ */

function ButtonsDemo() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold text-[#425466] uppercase tracking-widest mb-4">
          Primary Actions
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="px-6 py-2.5 bg-[#635bff] rounded-lg text-white font-medium text-sm shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out"
          >
            Get Started
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-white rounded-lg text-[#0a2540] font-medium text-sm border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-[300ms] ease-out"
          >
            Contact Sales
          </button>
          <button
            type="button"
            className="px-6 py-2.5 bg-[#0a2540] rounded-lg text-white font-medium text-sm shadow-[0_2px_5px_rgba(10,37,64,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-[#0d2f4f] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-[300ms] ease-out"
          >
            Documentation
          </button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#425466] uppercase tracking-widest mb-4">
          Pill / Tag Buttons
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-5 py-2 bg-[#635bff]/10 text-[#635bff] rounded-full text-sm font-medium hover:bg-[#635bff]/20 transition-colors duration-[300ms] ease-out"
          >
            Payments
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-[#00d4ff]/10 text-[#00879e] rounded-full text-sm font-medium hover:bg-[#00d4ff]/20 transition-colors duration-[300ms] ease-out"
          >
            Billing
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-gray-100 text-[#425466] rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-[300ms] ease-out"
          >
            Connect
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-[#0a2540]/8 text-[#0a2540] rounded-full text-sm font-medium hover:bg-[#0a2540]/15 transition-colors duration-[300ms] ease-out"
          >
            Terminal
          </button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-[#425466] uppercase tracking-widest mb-4">
          Large CTA (Hero Style)
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            className="px-8 py-4 bg-[#635bff] text-white rounded-full font-semibold shadow-[0_4px_14px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_8px_20px_rgba(99,91,255,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out"
          >
            Start now
          </button>
          <button
            type="button"
            className="px-8 py-4 bg-white text-[#0a2540] rounded-full font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-[300ms] ease-out"
          >
            Contact sales
          </button>
        </div>
      </div>
    </div>
  );
}

function CardsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.slice(0, 3).map((p) => (
        <ProductCard key={p.icon} product={p} />
      ))}
    </div>
  );
}

function InputsDemo() {
  return (
    <div className="max-w-md bg-white rounded-xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.04)]">
      <h3 className="text-base font-semibold text-[#0a2540] mb-6">
        Payment Details
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#425466] mb-1.5">
            Card number
          </label>
          <input
            type="text"
            placeholder="1234 1234 1234 1234"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all duration-[300ms] ease-out"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#425466] mb-1.5">
              Expiry date
            </label>
            <input
              type="text"
              placeholder="MM / YY"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all duration-[300ms] ease-out"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#425466] mb-1.5">
              CVC
            </label>
            <input
              type="text"
              placeholder="CVC"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all duration-[300ms] ease-out"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#425466] mb-1.5">
            Name on card
          </label>
          <input
            type="text"
            placeholder="Jane Doe"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all duration-[300ms] ease-out"
          />
        </div>
        <button
          type="button"
          className="w-full mt-2 px-6 py-3 bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out"
        >
          Pay $49.00
        </button>
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#425466]">
          <svg className="w-3.5 h-3.5 text-[#635bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secured by Stripe</span>
        </div>
      </div>
    </div>
  );
}

function CodeBlockDemo() {
  return (
    <div className="bg-[#0a2540] rounded-xl p-8 overflow-x-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-gray-500 font-mono">checkout.js</span>
      </div>
      <div className="font-mono text-sm leading-7 space-y-0">
        <p>
          <span className="text-gray-500">{"// Initialize Stripe"}</span>
        </p>
        <p>
          <span className="text-[#7a73ff]">const </span>
          <span className="text-[#80e9ff]">stripe </span>
          <span className="text-white">= </span>
          <span className="text-[#7a73ff]">require</span>
          <span className="text-white">(</span>
          <span className="text-[#00d4ff]">&apos;stripe&apos;</span>
          <span className="text-white">)(</span>
          <span className="text-[#00d4ff]">&apos;sk_live_...&apos;</span>
          <span className="text-white">);</span>
        </p>
        <p className="h-5" />
        <p>
          <span className="text-[#7a73ff]">const </span>
          <span className="text-[#80e9ff]">paymentIntent </span>
          <span className="text-white">= </span>
          <span className="text-[#7a73ff]">await </span>
          <span className="text-[#80e9ff]">stripe</span>
          <span className="text-white">.</span>
          <span className="text-[#80e9ff]">paymentIntents</span>
          <span className="text-white">.</span>
          <span className="text-[#635bff]">create</span>
          <span className="text-white">{"({"}</span>
        </p>
        <p>
          <span className="text-white pl-6">{"  "}</span>
          <span className="text-[#80e9ff]">amount</span>
          <span className="text-white">: </span>
          <span className="text-[#00d4ff]">4900</span>
          <span className="text-white">,</span>
          <span className="text-gray-500 ml-4">{"// $49.00"}</span>
        </p>
        <p>
          <span className="pl-6 text-[#80e9ff]">currency</span>
          <span className="text-white">: </span>
          <span className="text-[#00d4ff]">&apos;usd&apos;</span>
          <span className="text-white">,</span>
        </p>
        <p>
          <span className="pl-6 text-[#80e9ff]">automatic_payment_methods</span>
          <span className="text-white">{": { "}</span>
          <span className="text-[#80e9ff]">enabled</span>
          <span className="text-white">{": "}</span>
          <span className="text-[#7a73ff]">true</span>
          <span className="text-white">{" },"}</span>
        </p>
        <p>
          <span className="text-white">{"});"}</span>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Buttons");

  const { ref: heroRef, inView: heroInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f9fc] text-[#0a2540] font-sans">
      <style>{`
        .stripe-grid {
          background-image:
            linear-gradient(to right, rgba(99,91,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99,91,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .stripe-gradient-text {
          background: linear-gradient(135deg, #635bff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. Fixed Navigation                                              */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/styles/stripe-style/showcase"
              className="text-[#635bff] font-bold text-xl tracking-tight select-none"
            >
              stripe
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-8">
              {(["Products", "Developers", "Pricing"] as const).map((item) => (
                <span
                  key={item}
                  className="text-[#425466] hover:text-[#0a2540] font-medium text-sm transition-colors duration-[200ms] ease-out cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </nav>

            {/* CTA */}
            <button
              type="button"
              className="px-4 py-2 bg-[#635bff] text-white rounded-lg text-sm font-medium shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. Hero                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-28 md:pt-36 pb-20 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 stripe-grid pointer-events-none" />
        {/* Radial fade at center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,91,255,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: copy */}
            <div className="flex-1 max-w-2xl">
              <div
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(8px)",
                  transition:
                    "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <span className="inline-block px-3 py-1 bg-[#635bff]/10 text-[#635bff] rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
                  Financial Infrastructure
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06] mb-6">
                <span
                  className="block text-[#0a2540]"
                  style={{
                    opacity: heroRevealed ? 1 : 0,
                    transform: heroRevealed
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transition:
                      "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s",
                  }}
                >
                  Financial infrastructure
                </span>
                <span
                  className="block text-[#635bff]"
                  style={{
                    opacity: heroRevealed ? 1 : 0,
                    transform: heroRevealed
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transition:
                      "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
                  }}
                >
                  for the internet
                </span>
              </h1>

              <p
                className="text-lg md:text-xl text-[#425466] mb-10 leading-relaxed"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
                }}
              >
                Millions of companies of all sizes use Stripe to accept
                payments, send payouts, and manage their businesses online.
              </p>

              <div
                className="flex flex-wrap gap-4"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
                }}
              >
                <button
                  type="button"
                  className="px-8 py-4 bg-[#635bff] text-white rounded-full font-semibold shadow-[0_4px_14px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_8px_20px_rgba(99,91,255,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out"
                >
                  Start now
                </button>
                <button
                  type="button"
                  className="px-8 py-4 bg-white text-[#0a2540] rounded-full font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-[300ms] ease-out"
                >
                  Contact sales
                </button>
              </div>
            </div>

            {/* Right: Floating dashboard card */}
            <div
              className="flex-shrink-0 w-full max-w-sm"
              ref={heroRef}
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(32px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s",
              }}
            >
              <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(99,91,255,0.08)] p-6 border border-gray-100">
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-semibold text-[#425466] uppercase tracking-wider">
                      Revenue
                    </p>
                    <p className="text-3xl font-bold text-[#0a2540] mt-0.5">
                      $48,230
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-semibold">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    12.5%
                  </div>
                </div>

                {/* Sparkline bars */}
                <div className="flex items-end gap-1 h-16 mb-5">
                  {[35, 52, 44, 60, 48, 70, 55, 80, 65, 88, 72, 95].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm transition-all duration-[400ms] ease-out"
                        style={{
                          height: `${h}%`,
                          background:
                            i === 11
                              ? "#635bff"
                              : `rgba(99,91,255,${0.15 + i * 0.06})`,
                        }}
                      />
                    ),
                  )}
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                  {[
                    { label: "Transactions", value: "2,841" },
                    { label: "Avg. Order", value: "$16.98" },
                    { label: "Disputes", value: "0.02%" },
                  ].map((m) => (
                    <div key={m.label}>
                      <p className="text-[10px] font-medium text-[#425466] uppercase tracking-wider">
                        {m.label}
                      </p>
                      <p className="text-sm font-bold text-[#0a2540] mt-0.5">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recent charge */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#635bff]/10 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-[#635bff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0a2540]">
                        Payment succeeded
                      </p>
                      <p className="text-[10px] text-[#425466]">2 minutes ago</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#635bff]">
                    +$249
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. Products Grid                                                 */}
      {/* ================================================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-14">
            <p className="text-xs font-semibold text-[#635bff] uppercase tracking-widest mb-3">
              Products
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] leading-tight">
              A fully integrated suite
              <br />
              of financial products
            </h2>
            <p className="text-[#425466] mt-4 max-w-lg text-base leading-relaxed">
              Everything you need to build any product or business model. Mix
              and match to solve your exact use case.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <RevealBlock key={product.icon} delay={i * 0.07}>
                <ProductCard product={product} />
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. Live Component Demo                                           */}
      {/* ================================================================ */}
      <section className="py-24 px-6 bg-[#f6f9fc]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-14">
            <p className="text-xs font-semibold text-[#635bff] uppercase tracking-widest mb-3">
              Component Library
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540]">
              Interaction patterns
            </h2>
            <p className="text-[#425466] mt-4 max-w-lg text-base leading-relaxed">
              Four core interaction physics that define every Stripe UI element.
              Hover, click, and observe the precise feedback loops.
            </p>
          </RevealBlock>

          {/* Tab bar */}
          <div className="flex items-center gap-1 bg-white rounded-xl p-1.5 mb-10 w-fit shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-[300ms] ease-out whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#635bff] text-white shadow-[0_2px_5px_rgba(99,91,255,0.3)]"
                    : "text-[#425466] hover:text-[#0a2540]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <RevealBlock>
            <div className="bg-white rounded-xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.04)]">
              {activeTab === "Buttons" && <ButtonsDemo />}
              {activeTab === "Cards" && <CardsDemo />}
              {activeTab === "Inputs" && <InputsDemo />}
              {activeTab === "Code Block" && <CodeBlockDemo />}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. Code Block Section                                            */}
      {/* ================================================================ */}
      <section className="py-24 px-6 bg-[#0a2540] relative overflow-hidden">
        {/* Background grid on dark */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(99,91,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,91,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,91,255,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="text-xs font-semibold text-[#635bff] uppercase tracking-widest mb-3">
              Developer First
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              3 lines of code
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed">
              Add Stripe to your app and start accepting payments in minutes.
              Our APIs are clean, predictable, and well-documented.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="bg-[#0d1f35] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.2)] border border-white/[0.06]">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#0a1a2e]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-4 text-xs text-gray-500 font-mono">
                  server.js
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#635bff]/20 text-[#7a73ff] rounded text-[10px] font-mono">
                    Node.js
                  </span>
                </div>
              </div>

              {/* Line numbers + code */}
              <div className="flex overflow-x-auto">
                {/* Line numbers */}
                <div className="select-none px-5 py-6 text-right text-gray-600 font-mono text-sm leading-7 border-r border-white/[0.04] min-w-[3rem]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
                    <div key={n}>{n}</div>
                  ))}
                </div>

                {/* Code */}
                <div className="px-6 py-6 font-mono text-sm leading-7">
                  <p>
                    <span className="text-gray-500">
                      {"// 1. Initialize Stripe — one import"}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#7a73ff]">const </span>
                    <span className="text-[#80e9ff]">stripe </span>
                    <span className="text-white">= </span>
                    <span className="text-[#7a73ff]">require</span>
                    <span className="text-white">(</span>
                    <span className="text-[#00d4ff]">&apos;stripe&apos;</span>
                    <span className="text-white">)(process.env.</span>
                    <span className="text-[#80e9ff]">STRIPE_SECRET_KEY</span>
                    <span className="text-white">);</span>
                  </p>
                  <p className="h-7" />
                  <p>
                    <span className="text-gray-500">
                      {"// 2. Create a PaymentIntent — one API call"}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#7a73ff]">const </span>
                    <span className="text-[#80e9ff]">intent </span>
                    <span className="text-white">= </span>
                    <span className="text-[#7a73ff]">await </span>
                    <span className="text-[#80e9ff]">stripe</span>
                    <span className="text-white">.</span>
                    <span className="text-[#80e9ff]">paymentIntents</span>
                    <span className="text-white">.</span>
                    <span className="text-[#635bff]">create</span>
                    <span className="text-white">{"({ "}</span>
                    <span className="text-[#80e9ff]">amount</span>
                    <span className="text-white">: </span>
                    <span className="text-[#00d4ff]">4900</span>
                    <span className="text-white">{", "}</span>
                    <span className="text-[#80e9ff]">currency</span>
                    <span className="text-white">: </span>
                    <span className="text-[#00d4ff]">&apos;usd&apos;</span>
                    <span className="text-white">{" });"}</span>
                  </p>
                  <p className="h-7" />
                  <p>
                    <span className="text-gray-500">
                      {"// 3. Return the client secret — one response"}
                    </span>
                  </p>
                  <p>
                    <span className="text-[#80e9ff]">res</span>
                    <span className="text-white">.</span>
                    <span className="text-[#635bff]">json</span>
                    <span className="text-white">{"({ "}</span>
                    <span className="text-[#80e9ff]">clientSecret</span>
                    <span className="text-white">{": intent."}</span>
                    <span className="text-[#80e9ff]">client_secret</span>
                    <span className="text-white">{" });"}</span>
                  </p>
                </div>
              </div>

              {/* Footer bar */}
              <div className="px-5 py-3 bg-[#0a1a2e] border-t border-white/[0.06] flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Payment ready in</span>
                  <span className="text-[#80e9ff] font-semibold">~50ms</span>
                </div>
                <div className="ml-auto text-xs text-gray-600 font-mono">
                  UTF-8
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Language pills */}
          <RevealBlock delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {["Node.js", "Python", "Ruby", "PHP", "Go", "Java", ".NET"].map(
                (lang) => (
                  <span
                    key={lang}
                    className="px-4 py-2 bg-white/8 border border-white/10 text-gray-400 rounded-full text-sm font-mono hover:bg-white/12 hover:text-gray-300 transition-all duration-[300ms] ease-out cursor-pointer"
                  >
                    {lang}
                  </span>
                ),
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. Color & Shadow System                                         */}
      {/* ================================================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-14">
            <p className="text-xs font-semibold text-[#635bff] uppercase tracking-widest mb-3">
              Design System
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540]">
              Color &amp; Shadow System
            </h2>
            <p className="text-[#425466] mt-4 max-w-lg text-base leading-relaxed">
              A restrained palette anchored by Stripe Purple, paired with
              layered shadows that create depth without decoration.
            </p>
          </RevealBlock>

          {/* Color palette */}
          <RevealBlock className="mb-16">
            <h3 className="text-sm font-semibold text-[#0a2540] uppercase tracking-wider mb-6">
              Color Palette
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {colorPalette.map((color, i) => (
                <div
                  key={color.name}
                  className="group rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-[400ms] ease-out cursor-default"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <div
                    className="h-24 flex items-end p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-[10px] font-mono opacity-80"
                      style={{ color: color.textColor }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-xs font-semibold text-[#0a2540]">
                      {color.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Shadow system */}
          <RevealBlock>
            <h3 className="text-sm font-semibold text-[#0a2540] uppercase tracking-wider mb-6">
              Shadow Levels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {shadowLevels.map((s) => (
                <div
                  key={s.label}
                  className="bg-[#f6f9fc] rounded-xl p-6 border border-gray-100"
                >
                  {/* Shadow preview */}
                  <div className="flex items-center justify-center h-16 mb-5">
                    <div
                      className="w-20 h-10 bg-white rounded-lg"
                      style={{ boxShadow: s.css }}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#0a2540]">
                      {s.label}
                    </p>
                    <p className="text-xs text-[#425466] leading-relaxed">
                      {s.desc}
                    </p>
                    <p className="text-[10px] font-mono text-[#635bff] bg-[#635bff]/6 rounded px-2 py-1 mt-2 break-all">
                      {s.css}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. Design Rules (Do / Don't)                                     */}
      {/* ================================================================ */}
      <section className="py-24 px-6 bg-[#f6f9fc]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-14">
            <p className="text-xs font-semibold text-[#635bff] uppercase tracking-widest mb-3">
              Guidelines
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540]">
              Design Rules
            </h2>
            <p className="text-[#425466] mt-4 max-w-lg text-base leading-relaxed">
              Stripe&apos;s visual language relies on discipline. These rules
              define the boundary between a Stripe product and an imitation.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do */}
            <RevealBlock>
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.06)] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full bg-[#635bff] flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[#0a2540]">Do</h3>
                </div>
                <ul className="space-y-3.5">
                  {doRules.map((rule) => (
                    <li
                      key={rule}
                      className="text-sm text-[#425466] flex items-start gap-2.5"
                    >
                      <span className="text-[#635bff] font-bold mt-0.5 shrink-0 leading-none">
                        +
                      </span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.12}>
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.06)] h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[#0a2540]">
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {dontRules.map((rule) => (
                    <li
                      key={rule}
                      className="text-sm text-[#425466] flex items-start gap-2.5"
                    >
                      <span className="text-red-500 font-bold mt-0.5 shrink-0 leading-none">
                        -
                      </span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Interaction physics reference */}
          <RevealBlock delay={0.1} className="mt-6">
            <div className="bg-white rounded-xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-l-4 border-[#635bff]">
              <h3 className="text-base font-bold text-[#0a2540] mb-5">
                Interaction Physics — The 4 Laws
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    name: "Fluid SaaS Motion",
                    rule: "hover:-translate-y-0.5 duration-[300ms] ease-out",
                    desc: "Buttons float upward on hover. Never jarring, always controlled.",
                  },
                  {
                    name: "Floating Matrix",
                    rule: "hover:-translate-y-1 duration-[400ms] ease-out",
                    desc: "Cards lift with deepened shadow. Icon sub-element scales to 110%.",
                  },
                  {
                    name: "Liquid Gradient Focus",
                    rule: "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
                    desc: "Inset highlight on all buttons simulates convex glass catching light.",
                  },
                  {
                    name: "Hairline Crispness",
                    rule: "active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
                    desc: "Button physically depresses on click. Outer glow removed — inset only.",
                  },
                ].map((law) => (
                  <div key={law.name}>
                    <p className="text-sm font-semibold text-[#635bff] mb-1">
                      {law.name}
                    </p>
                    <p className="text-[11px] font-mono text-[#425466] bg-gray-50 rounded px-2 py-1 mb-2">
                      {law.rule}
                    </p>
                    <p className="text-xs text-[#425466] leading-relaxed">
                      {law.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. Footer                                                        */}
      {/* ================================================================ */}
      <footer className="bg-[#0a2540] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Top */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-[#635bff] font-bold text-xl mb-3">stripe</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Financial infrastructure for the internet. Powering millions of
                businesses worldwide.
              </p>
            </div>

            {/* Products */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">Products</p>
              <ul className="space-y-2.5">
                {["Payments", "Billing", "Connect", "Terminal", "Radar", "Atlas"].map(
                  (item) => (
                    <li key={item}>
                      <span className="text-gray-400 hover:text-white text-sm transition-colors duration-[200ms] ease-out cursor-pointer">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Developers */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">
                Developers
              </p>
              <ul className="space-y-2.5">
                {["Documentation", "API Reference", "SDKs", "Webhooks", "Status", "Changelog"].map(
                  (item) => (
                    <li key={item}>
                      <span className="text-gray-400 hover:text-white text-sm transition-colors duration-[200ms] ease-out cursor-pointer">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="text-white font-semibold text-sm mb-4">Company</p>
              <ul className="space-y-2.5">
                {["About", "Blog", "Careers", "Press", "Partners", "Legal"].map(
                  (item) => (
                    <li key={item}>
                      <span className="text-gray-400 hover:text-white text-sm transition-colors duration-[200ms] ease-out cursor-pointer">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              StyleKit &middot; Stripe Style Showcase
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/styles/stripe-style"
                className="text-sm text-[#635bff] font-medium hover:text-[#7a73ff] transition-colors duration-[200ms] ease-out"
              >
                View Documentation
              </Link>
              <Link
                href="/styles"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-[200ms] ease-out"
              >
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
