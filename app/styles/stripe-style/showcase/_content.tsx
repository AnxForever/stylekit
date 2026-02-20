"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
/* ------------------------------------------------------------------ */

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
  children: React.ReactNode; className?: string; delay?: number;
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

const features = [
  { icon: "payments", title: "Payments", desc: "Accept payments online, in person, or around the world with a payments solution built for any business." },
  { icon: "billing", title: "Billing", desc: "Build and scale your recurring business model. Automate revenue collection and operations." },
  { icon: "connect", title: "Connect", desc: "Set up multi-party payments and payouts with a few API calls. Build a platform or marketplace." },
  { icon: "radar", title: "Radar", desc: "Fight fraud with machine learning. Block fraudulent payments with adaptive, real-time decisioning." },
  { icon: "atlas", title: "Atlas", desc: "Start a company. Stripe Atlas helps you incorporate a company, with stock issuance and compliance." },
  { icon: "terminal", title: "Terminal", desc: "Build delightful in-person payment experiences with pre-certified card readers and cloud-based APIs." },
];

const pricingTiers = [
  { name: "Integrated", price: "2.9% + 30c", desc: "Per successful card charge", features: ["135+ currencies", "3D Secure", "Real-time webhooks", "Custom UI toolkit"], highlighted: false },
  { name: "Customized", price: "Custom", desc: "For large volumes", features: ["Volume discounts", "Interchange pricing", "Country-specific rates", "Dedicated support"], highlighted: true },
];

const colorPalette = [
  { name: "Stripe Purple", value: "#635bff", textColor: "#ffffff" },
  { name: "Dark Navy", value: "#0a2540", textColor: "#ffffff" },
  { name: "Cyan", value: "#00d4ff", textColor: "#0a2540" },
  { name: "Light Purple", value: "#7a73ff", textColor: "#ffffff" },
  { name: "Bright Cyan", value: "#80e9ff", textColor: "#0a2540" },
  { name: "Background", value: "#f6f9fc", textColor: "#0a2540" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function FeatureIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    payments: <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2H4z" />,
    billing: <><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path d="M2 10h16v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></>,
    connect: <path d="M7 11a4 4 0 01-4-4V5h6v2a4 4 0 01-4 4zm6 0a4 4 0 01-4-4V5h6v2a4 4 0 01-4 4zM4 15a2 2 0 012-2h8a2 2 0 012 2v1H4v-1z" />,
    radar: <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 3a5 5 0 015 5h-5V5z" />,
    atlas: <path d="M10 2L3 7v6l7 5 7-5V7l-7-5z" />,
    terminal: <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm4 3l3 2-3 2V8z" />,
  };
  return (
    <svg className="w-5 h-5 text-[#635bff]" viewBox="0 0 20 20" fill="currentColor">
      {paths[type] ?? paths.payments}
    </svg>
  );
}

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <div className="group p-6 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.04)] transition-all duration-[400ms] ease-out cursor-pointer">
      <div className="w-10 h-10 bg-[#635bff]/10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-[400ms] ease-out group-hover:scale-110">
        <FeatureIcon type={feature.icon} />
      </div>
      <h3 className="text-lg font-semibold text-[#0a2540] mb-2">{feature.title}</h3>
      <p className="text-[#425466] text-sm leading-relaxed">{feature.desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component demos                                                    */
/* ------------------------------------------------------------------ */

function ButtonsDemo() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4">
        <button type="button" className="px-6 py-2.5 bg-[#635bff] rounded-lg text-white font-medium text-sm shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:shadow-[0_4px_10px_rgba(99,91,255,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out">
          Get Started
        </button>
        <button type="button" className="px-6 py-2.5 bg-white rounded-lg text-[#0a2540] font-medium text-sm border border-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-[300ms] ease-out">
          Contact Sales
        </button>
        <button type="button" className="px-6 py-2.5 bg-[#0a2540] rounded-lg text-white font-medium text-sm shadow-[0_2px_5px_rgba(10,37,64,0.3)] hover:bg-[#0d2f4f] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-[300ms] ease-out">
          Documentation
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="px-5 py-2 bg-[#635bff]/10 text-[#635bff] rounded-full text-sm font-medium hover:bg-[#635bff]/20 transition-colors duration-[300ms] ease-out">Payments</button>
        <button type="button" className="px-5 py-2 bg-[#00d4ff]/10 text-[#00879e] rounded-full text-sm font-medium hover:bg-[#00d4ff]/20 transition-colors duration-[300ms] ease-out">Billing</button>
        <button type="button" className="px-5 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-[300ms] ease-out">Connect</button>
      </div>
    </div>
  );
}

function CardsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.slice(0, 3).map((f) => (
        <FeatureCard key={f.icon} feature={f} />
      ))}
    </div>
  );
}

function FormsDemo() {
  return (
    <div className="max-w-md bg-white rounded-xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.04)]">
      <h3 className="text-lg font-semibold text-[#0a2540] mb-6">Payment Details</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#425466] mb-1.5">Card number</label>
          <input type="text" placeholder="1234 1234 1234 1234" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#425466] mb-1.5">Expiry</label>
            <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#425466] mb-1.5">CVC</label>
            <input type="text" placeholder="CVC" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#0a2540] placeholder-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent transition-all" />
          </div>
        </div>
        <button type="button" className="w-full mt-2 px-6 py-3 bg-[#635bff] rounded-lg text-white font-medium shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out">
          Pay $49.00
        </button>
      </div>
    </div>
  );
}

function PricingDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
      {pricingTiers.map((tier) => (
        <div
          key={tier.name}
          className={`group p-8 rounded-xl transition-all duration-[400ms] ease-out cursor-pointer ${
            tier.highlighted
              ? "bg-[#0a2540] text-white shadow-[0_12px_30px_rgba(10,37,64,0.3)] hover:-translate-y-1"
              : "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06),0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
          }`}
        >
          <p className={`text-sm font-medium mb-4 ${tier.highlighted ? "text-[#80e9ff]" : "text-[#635bff]"}`}>{tier.name}</p>
          <p className={`text-3xl font-bold mb-1 ${tier.highlighted ? "text-white" : "text-[#0a2540]"}`}>{tier.price}</p>
          <p className={`text-sm mb-6 ${tier.highlighted ? "text-gray-400" : "text-[#425466]"}`}>{tier.desc}</p>
          <ul className="space-y-2">
            {tier.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <svg className={`w-4 h-4 shrink-0 ${tier.highlighted ? "text-[#00d4ff]" : "text-[#635bff]"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className={tier.highlighted ? "text-gray-300" : "text-[#425466]"}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Export                                                             */
/* ------------------------------------------------------------------ */

const tabs = ["Buttons", "Cards", "Forms", "Pricing"] as const;

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Buttons");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f9fc] text-[#0a2540]">
      <style>{`
        .stripe-grid-bg {
          background-image:
            linear-gradient(to right, rgba(99,91,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99,91,255,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      {/* ========= Navigation ========= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/styles/stripe-style/showcase" className="text-[#635bff] font-bold text-xl">
              stripe
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/styles/stripe-style" className="text-[#425466] hover:text-[#635bff] font-medium text-sm transition-colors">
                Docs
              </Link>
              <Link href="/styles" className="text-[#425466] hover:text-[#635bff] font-medium text-sm transition-colors">
                Styles
              </Link>
              <button type="button" className="px-4 py-2 bg-[#635bff] text-white rounded-lg text-sm font-medium shadow-[0_2px_5px_rgba(99,91,255,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#5851ea] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out">
                Sign in
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* ========= Hero ========= */}
      <section className="pt-32 md:pt-44 pb-20 px-6 max-w-6xl mx-auto relative">
        <div className="absolute inset-0 stripe-grid-bg pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6">
            <span
              className="block text-[#0a2540]"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              Financial infrastructure
            </span>
            <span
              className="block text-[#635bff]"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              for the internet
            </span>
          </h1>
          <p
            className="text-xl text-[#425466] mb-10 max-w-2xl leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            Millions of companies of all sizes use Stripe to accept payments, send payouts, and manage their businesses online.
          </p>
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <button type="button" className="px-8 py-4 bg-[#635bff] text-white rounded-full font-semibold shadow-[0_4px_14px_rgba(99,91,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(99,91,255,0.45)] active:scale-[0.98] active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-[300ms] ease-out">
              Start now
            </button>
            <button type="button" className="px-8 py-4 bg-white text-[#0a2540] rounded-full font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] active:scale-[0.98] active:translate-y-0 transition-all duration-[300ms] ease-out">
              Contact sales
            </button>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <RevealBlock className="mb-12">
          <p className="text-sm font-medium text-[#635bff] mb-2">Products</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540]">
            A fully integrated suite of financial products
          </h2>
        </RevealBlock>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <RevealBlock key={f.icon} delay={i * 0.08}>
              <FeatureCard feature={f} />
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ========= Component Demos ========= */}
      <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">
            Component Library
          </h2>
          <p className="text-[#425466] max-w-lg">
            Explore the core UI elements of Stripe Style: buttons with liquid gradient focus, floating matrix cards, crisp forms, and professional pricing tables.
          </p>
        </RevealBlock>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1.5 mb-12 w-fit shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-[300ms] ease-out ${
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
          {activeTab === "Buttons" && <ButtonsDemo />}
          {activeTab === "Cards" && <CardsDemo />}
          {activeTab === "Forms" && <FormsDemo />}
          {activeTab === "Pricing" && <PricingDemo />}
        </RevealBlock>
      </section>

      {/* Code block preview */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <RevealBlock>
          <div className="bg-[#0a2540] rounded-xl p-8 md:p-12 overflow-hidden">
            <p className="text-sm font-medium text-[#80e9ff] mb-6 font-mono">// Accept a payment in minutes</p>
            <div className="font-mono text-sm leading-relaxed space-y-1">
              <p><span className="text-[#7a73ff]">const</span> <span className="text-[#80e9ff]">stripe</span> = <span className="text-[#7a73ff]">require</span>(<span className="text-[#00d4ff]">&apos;stripe&apos;</span>)(<span className="text-[#00d4ff]">&apos;sk_test_...&apos;</span>);</p>
              <p className="text-gray-500">&#8203;</p>
              <p><span className="text-[#7a73ff]">const</span> <span className="text-[#80e9ff]">session</span> = <span className="text-[#7a73ff]">await</span> stripe.checkout.sessions.<span className="text-[#635bff]">create</span>({"{"}</p>
              <p className="pl-4"><span className="text-[#80e9ff]">line_items</span>: [{"{"} <span className="text-[#80e9ff]">price</span>: <span className="text-[#00d4ff]">&apos;price_H5ggYwtDq4fbrJ&apos;</span>, <span className="text-[#80e9ff]">quantity</span>: <span className="text-[#00d4ff]">1</span> {"}"}],</p>
              <p className="pl-4"><span className="text-[#80e9ff]">mode</span>: <span className="text-[#00d4ff]">&apos;payment&apos;</span>,</p>
              <p className="pl-4"><span className="text-[#80e9ff]">success_url</span>: <span className="text-[#00d4ff]">&apos;https://example.com/success&apos;</span>,</p>
              <p>{"}"});</p>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ========= Color Palette ========= */}
      <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto">
        <RevealBlock className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">Color Palette</h2>
          <p className="text-[#425466] max-w-lg">
            A sophisticated palette anchored by Stripe Purple. Professional, trustworthy, and unmistakably Stripe.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colorPalette.map((color, i) => (
            <RevealBlock key={color.name} delay={i * 0.05}>
              <div className="group rounded-xl overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-[400ms] ease-out cursor-pointer">
                <div className="h-24 md:h-28 flex items-end p-3" style={{ backgroundColor: color.value }}>
                  <span className="text-xs font-mono opacity-80" style={{ color: color.textColor }}>{color.value}</span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-[#0a2540]">{color.name}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ========= Design Rules ========= */}
      <section className="py-20 md:py-32 px-6 max-w-6xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a2540] mb-4">Design Rules</h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealBlock>
            <div className="bg-white rounded-xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <h3 className="font-semibold text-lg text-[#0a2540] mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#635bff] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </span>
                Do
              </h3>
              <ul className="space-y-3">
                {[
                  "Use Stripe Purple #635bff as primary",
                  "Add grid background for tech feel",
                  "Use multi-layer refined shadows",
                  "Keep moderate corners: rounded-lg or rounded-xl",
                  "Fluid SaaS Motion: hover:-translate-y-0.5 duration-[300ms]",
                  "Floating Matrix: cards hover:-translate-y-1 duration-[400ms]",
                  "Liquid Gradient Focus: inset highlight on buttons",
                  "Hairline Crispness: active:scale-[0.98] with inset shadow",
                ].map((rule) => (
                  <li key={rule} className="text-sm text-[#425466] flex items-start gap-2">
                    <span className="text-[#635bff] mt-0.5 shrink-0">+</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="bg-white rounded-xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <h3 className="font-semibold text-lg text-[#0a2540] mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </span>
                Don&apos;t
              </h3>
              <ul className="space-y-3">
                {[
                  "Use overly bright or garish colors",
                  "Use extra-large rounded corners",
                  "Use rough single-layer shadows",
                  "Skip the grid background element",
                  "Use hover:scale-* (Stripe buttons float, never scale)",
                  "Skip inset highlight (core of Stripe button quality)",
                  "Use ease-in-out or ease (always ease-out)",
                  "Keep outer shadow on active state (use inset only)",
                ].map((rule) => (
                  <li key={rule} className="text-sm text-[#425466] flex items-start gap-2">
                    <span className="text-red-500 mt-0.5 shrink-0">-</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ========= Footer ========= */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#425466]">
              StyleKit &middot; Stripe Style Showcase
            </p>
            <Link href="/styles/stripe-style" className="text-sm text-[#635bff] font-medium hover:underline">
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
