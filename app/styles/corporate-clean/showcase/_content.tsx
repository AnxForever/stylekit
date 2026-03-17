"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ─── Hooks ────────────────────────────────────────────────────────────────────

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

// ─── RevealBlock ──────────────────────────────────────────────────────────────

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
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── SVG Icons (inline, no external deps) ────────────────────────────────────

function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconX({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function IconShield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconZap({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconBarChart({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconLayers({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconUsers({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconGlobe({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconTrendingUp({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: IconShield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with end-to-end encryption, SSO support, and granular access controls built for regulated industries.",
  },
  {
    icon: IconZap,
    title: "Sub-100ms Latency",
    description: "Edge-deployed infrastructure with global CDN ensures your teams experience consistent, near-instant response times worldwide.",
  },
  {
    icon: IconBarChart,
    title: "Advanced Analytics",
    description: "Real-time dashboards and exportable reports give stakeholders the clarity to make data-driven decisions with confidence.",
  },
  {
    icon: IconLayers,
    title: "Modular by Design",
    description: "Pick only the modules you need. Our component system scales from a single team to a 50,000-seat enterprise without reconfiguration.",
  },
  {
    icon: IconUsers,
    title: "Role-Based Access",
    description: "Granular RBAC policies ensure every user sees exactly what they need — no more, no less. Audit logs included.",
  },
  {
    icon: IconGlobe,
    title: "Global Compliance",
    description: "GDPR, HIPAA, and CCPA-ready out of the box. Data residency controls let you meet regional requirements without custom builds.",
  },
];

const metrics = [
  { value: "99.99%", label: "Uptime SLA", trend: "+0.01%" },
  { value: "2.4M", label: "API calls / day", trend: "+18%" },
  { value: "< 80ms", label: "Avg. response", trend: "-12ms" },
  { value: "14,200", label: "Active teams", trend: "+340" },
];

const blueSwatches = [
  { token: "blue-50", hex: "#eff6ff", label: "Surface" },
  { token: "blue-100", hex: "#dbeafe", label: "Subtle" },
  { token: "blue-200", hex: "#bfdbfe", label: "Muted" },
  { token: "blue-400", hex: "#60a5fa", label: "Soft" },
  { token: "blue-600", hex: "#2563eb", label: "Primary" },
  { token: "blue-700", hex: "#1d4ed8", label: "Hover" },
  { token: "blue-800", hex: "#1e40af", label: "Active" },
  { token: "blue-900", hex: "#1e3a8a", label: "Deep" },
];

const slateSwatches = [
  { token: "slate-50", hex: "#f8fafc", label: "Page BG" },
  { token: "slate-200", hex: "#e2e8f0", label: "Border" },
  { token: "slate-400", hex: "#94a3b8", label: "Placeholder" },
  { token: "slate-600", hex: "#475569", label: "Secondary text" },
  { token: "slate-700", hex: "#334155", label: "Body text" },
  { token: "slate-900", hex: "#0f172a", label: "Heading" },
];

const accentSwatches = [
  { token: "green-500", hex: "#10b981", label: "Success" },
  { token: "red-500", hex: "#ef4444", label: "Danger" },
  { token: "amber-400", hex: "#fbbf24", label: "Warning" },
];

const spacingSteps = [
  { px: 4, label: "0.5", token: "space-0.5" },
  { px: 8, label: "1", token: "space-1" },
  { px: 16, label: "2", token: "space-2" },
  { px: 24, label: "3", token: "space-3" },
  { px: 32, label: "4", token: "space-4" },
  { px: 48, label: "6", token: "space-6" },
  { px: 64, label: "8", token: "space-8" },
  { px: 96, label: "12", token: "space-12" },
];

const doRules = [
  "Use rounded-lg / rounded-xl for cards and containers",
  "Apply shadow-sm by default, shadow-md on hover",
  "Keep transition durations at 150ms or 200ms",
  "Use focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 on all interactive elements",
  "Maintain an 8px spacing grid throughout the layout",
  "Use blue-600 exclusively for primary CTAs",
];

const dontRules = [
  "No decorative ornaments or non-functional visual elements",
  "No shadow-2xl or custom box-shadow values",
  "No font-mono for body or UI text",
  "No accent colors (green, red) on primary CTA buttons",
  "No transition durations above 200ms",
  "No multiple accent colors competing in the same view",
];

const tabViews = ["Components", "Tokens", "Patterns"] as const;
type TabView = (typeof tabViews)[number];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabView>("Components");
  const [inputFocused, setInputFocused] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setInputError(false);
    setInputSuccess(false);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
    if (inputValue.length > 0 && !inputValue.includes("@")) {
      setInputError(true);
    } else if (inputValue.includes("@")) {
      setInputSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* ── Fixed Nav ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
          {/* Back to Docs */}
          <Link
            href="/styles/corporate-clean"
            className="group flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#1e40af] transition-colors duration-150"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Docs</span>
          </Link>
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ backgroundColor: "#1e40af" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <span className="font-semibold text-base tracking-tight" style={{ color: "#1e40af" }}>
              CorporateKit
            </span>
          </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {["Product", "Pricing", "Docs", "Blog"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden md:inline text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-150"
            >
              Sign in
            </a>
            <button
              type="button"
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98]"
              style={{ backgroundColor: "#2563eb" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1d4ed8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2563eb"; }}
            >
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-0 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center py-20">
            {/* Text */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
                style={{
                  backgroundColor: "#eff6ff",
                  borderColor: "#bfdbfe",
                  color: "#1e40af",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.5s ease-out 0s, transform 0.5s ease-out 0s",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#10b981" }}
                />
                Now GA — Corporate Clean v2.0
              </div>

              <h1
                className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
                style={{
                  color: "#1e293b",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s",
                }}
              >
                The design system{" "}
                <span style={{ color: "#1e40af" }}>enterprises</span>{" "}
                actually trust.
              </h1>

              <p
                className="text-lg leading-relaxed mb-10 max-w-lg"
                style={{
                  color: "#64748b",
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
                }}
              >
                Professional trust through restraint. Clean grids, generous whitespace, and blue anchors built on a consistent 8px spacing system. Inspired by Stripe, Notion, and Linear.
              </p>

              <div
                className="flex flex-wrap gap-3"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s",
                }}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  style={{ backgroundColor: "#2563eb" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1d4ed8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2563eb"; }}
                >
                  Start building
                  <IconArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  style={{ boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)" }}
                >
                  View documentation
                </button>
              </div>

              {/* Social proof */}
              <div
                className="mt-12 flex items-center gap-6"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.5s ease-out 0.45s",
                }}
              >
                <div className="flex -space-x-2">
                  {["#94a3b8", "#60a5fa", "#34d399", "#a78bfa", "#fb923c"].map((color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">14,200+</span> teams ship with Corporate Clean
                </p>
              </div>
            </div>

            {/* UI Mockup */}
            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
              }}
            >
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="flex-1 mx-4">
                    <div className="bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-400 font-medium text-center">
                      app.corporatekit.io/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard body */}
                <div className="p-6 space-y-4">
                  {/* Metric row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Revenue", value: "$2.4M", change: "+18%", color: "#10b981" },
                      { label: "Users", value: "14.2K", change: "+340", color: "#10b981" },
                      { label: "Uptime", value: "99.99%", change: "0.01%", color: "#10b981" },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="bg-slate-50 rounded-lg p-3 border border-slate-100"
                      >
                        <p className="text-xs text-slate-500 mb-1">{m.label}</p>
                        <p className="text-base font-bold text-slate-900">{m.value}</p>
                        <p className="text-xs font-medium mt-0.5" style={{ color: m.color }}>
                          {m.change}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder */}
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-slate-700">Monthly Revenue</span>
                      <span className="text-xs text-slate-400">Last 6 months</span>
                    </div>
                    <div className="flex items-end gap-2 h-20">
                      {[45, 60, 42, 70, 85, 100].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end">
                          <div
                            className="rounded-sm"
                            style={{
                              height: `${h}%`,
                              backgroundColor: i === 5 ? "#1e40af" : "#bfdbfe",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((m) => (
                        <span key={m} className="text-xs text-slate-400">{m}</span>
                      ))}
                    </div>
                  </div>

                  {/* Table row */}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-b border-slate-200">
                      <span className="text-xs font-semibold text-slate-600">Recent Activity</span>
                      <span className="text-xs text-blue-600 font-medium">View all</span>
                    </div>
                    {[
                      { user: "Acme Corp", action: "Upgraded plan", status: "Success" },
                      { user: "GlobalTech", action: "API key created", status: "Info" },
                      { user: "Meridian", action: "Invited 4 members", status: "Success" },
                    ].map((row) => (
                      <div
                        key={row.user}
                        className="px-4 py-2.5 flex justify-between items-center border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors duration-150"
                      >
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{row.user}</p>
                          <p className="text-xs text-slate-400">{row.action}</p>
                        </div>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={
                            row.status === "Success"
                              ? { backgroundColor: "#dcfce7", color: "#15803d" }
                              : { backgroundColor: "#dbeafe", color: "#1e40af" }
                          }
                        >
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Grid ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#1e40af" }}>
              Why Corporate Clean
            </p>
            <h2 className="text-4xl font-bold tracking-tight mb-4" style={{ color: "#1e293b" }}>
              Built for teams that need to move fast
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#64748b" }}>
              Every component is designed with reliability and accessibility as baseline requirements — not afterthoughts.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <RevealBlock key={f.title} delay={i * 0.05}>
                  <div className="group bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out cursor-default h-full">
                    <div className="mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: "#1e293b" }}>
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                      {f.description}
                    </p>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Metric Cards ───────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
                    {m.value}
                  </p>
                  <span
                    className="flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
                  >
                    <IconTrendingUp className="w-3 h-3" />
                    {m.trend}
                  </span>
                </div>
                <p className="text-sm font-medium" style={{ color: "#64748b" }}>
                  {m.label}
                </p>
              </div>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ── Component Demo ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: "#1e293b" }}>
              Component System
            </h2>
            <p className="text-base mb-8" style={{ color: "#64748b" }}>
              Every element is consistent, accessible, and snappy — designed for real product teams.
            </p>

            {/* Tab switcher */}
            <div className="inline-flex bg-slate-100 rounded-lg p-1 gap-1">
              {tabViews.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 text-sm font-semibold rounded-md transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 active:scale-[0.98]"
                  style={
                    activeTab === tab
                      ? { backgroundColor: "#fff", color: "#1e293b", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }
                      : { color: "#64748b" }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Components tab */}
          {activeTab === "Components" && (
            <div className="space-y-10">
              {/* Button variants */}
              <RevealBlock>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-700">Button Variants</p>
                  </div>
                  <div className="p-6 flex flex-wrap gap-3 bg-white">
                    <button
                      type="button"
                      className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      style={{ backgroundColor: "#2563eb" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1d4ed8"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2563eb"; }}
                    >
                      Primary
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Secondary
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 text-sm font-semibold rounded-lg text-blue-600 hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-150 ease-out active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Ghost
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      style={{ backgroundColor: "#10b981" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#059669"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#10b981"; }}
                    >
                      Success
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      style={{ backgroundColor: "#dc2626" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#b91c1c"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#dc2626"; }}
                    >
                      Danger
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 text-sm font-semibold rounded-lg text-slate-400 border border-slate-200 bg-white cursor-not-allowed opacity-50"
                      disabled
                    >
                      Disabled
                    </button>
                  </div>
                </div>
              </RevealBlock>

              {/* Input states */}
              <RevealBlock delay={0.05}>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-700">Input States</p>
                  </div>
                  <div className="p-6 bg-white grid md:grid-cols-2 gap-6">
                    {/* Default */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Default</label>
                      <input
                        type="text"
                        placeholder="Enter a value"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150"
                      />
                    </div>

                    {/* Focus (simulated) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Focus state</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => setInputFocused(true)}
                        onBlur={handleInputBlur}
                        className={[
                          "w-full px-4 py-2.5 rounded-lg border text-sm bg-white text-slate-700 placeholder-slate-400 focus:outline-none transition-all duration-150",
                          inputError
                            ? "border-red-400 ring-2 ring-red-400 ring-offset-2"
                            : inputSuccess
                            ? "border-green-400 ring-2 ring-green-500 ring-offset-2"
                            : inputFocused
                            ? "border-blue-400 ring-2 ring-blue-500 ring-offset-2"
                            : "border-slate-200",
                        ].join(" ")}
                      />
                      <p className="text-xs mt-1.5 font-medium" style={{
                        color: inputError ? "#dc2626" : inputSuccess ? "#10b981" : "#94a3b8",
                      }}>
                        {inputError
                          ? "Please enter a valid email address."
                          : inputSuccess
                          ? "Looks good."
                          : "Type your email to see validation states."}
                      </p>
                    </div>

                    {/* Error (static demo) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Error state</label>
                      <input
                        type="text"
                        defaultValue="invalid-value"
                        className="w-full px-4 py-2.5 rounded-lg border border-red-400 ring-2 ring-red-400 ring-offset-2 bg-white text-slate-700 text-sm focus:outline-none"
                        readOnly
                      />
                      <p className="text-xs mt-1.5 font-medium text-red-600">This field is required.</p>
                    </div>

                    {/* Success (static demo) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Success state</label>
                      <input
                        type="text"
                        defaultValue="jane@acme.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-green-400 ring-2 ring-green-500 ring-offset-2 bg-white text-slate-700 text-sm focus:outline-none"
                        readOnly
                      />
                      <p className="text-xs mt-1.5 font-medium text-green-600">Verified and ready.</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>

              {/* Badge + Status variants */}
              <RevealBlock delay={0.1}>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-700">Badges &amp; Status</p>
                  </div>
                  <div className="p-6 bg-white flex flex-wrap gap-3">
                    {[
                      { label: "Active", bg: "#dcfce7", color: "#15803d" },
                      { label: "Pending", bg: "#fef9c3", color: "#a16207" },
                      { label: "Failed", bg: "#fee2e2", color: "#b91c1c" },
                      { label: "Draft", bg: "#f1f5f9", color: "#475569" },
                      { label: "Enterprise", bg: "#eff6ff", color: "#1e40af" },
                      { label: "Beta", bg: "#fdf4ff", color: "#7e22ce" },
                    ].map((b) => (
                      <span
                        key={b.label}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: b.bg, color: b.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: b.color }} />
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              {/* Alert variants */}
              <RevealBlock delay={0.1}>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-700">Alerts</p>
                  </div>
                  <div className="p-6 bg-white space-y-3">
                    {[
                      { icon: "\u2139", label: "Info", title: "Your trial expires in 7 days.", bg: "#eff6ff", border: "#bfdbfe", color: "#1e40af" },
                      { icon: "\u2713", label: "Success", title: "Deployment completed successfully.", bg: "#f0fdf4", border: "#bbf7d0", color: "#15803d" },
                      { icon: "\u26A0", label: "Warning", title: "API usage is above 80% of your quota.", bg: "#fffbeb", border: "#fde68a", color: "#b45309" },
                      { icon: "\u2715", label: "Error", title: "Failed to connect to database.", bg: "#fef2f2", border: "#fecaca", color: "#b91c1c" },
                    ].map((a) => (
                      <div
                        key={a.label}
                        className="flex items-start gap-3 px-4 py-3 rounded-lg border text-sm"
                        style={{ backgroundColor: a.bg, borderColor: a.border, color: a.color }}
                      >
                        <span className="text-base leading-none mt-px">{a.icon}</span>
                        <p className="font-medium">{a.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>
            </div>
          )}

          {/* Tokens tab */}
          {activeTab === "Tokens" && (
            <div className="space-y-10">
              <RevealBlock>
                <h3 className="text-base font-semibold text-slate-700 mb-4">Typography Scale</h3>
                <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                  {[
                    { label: "Display / H1", size: "text-5xl", weight: "font-bold", sample: "The quick brown fox" },
                    { label: "H2", size: "text-3xl", weight: "font-bold", sample: "Jumps over the lazy dog" },
                    { label: "H3", size: "text-xl", weight: "font-semibold", sample: "Pack my box with five" },
                    { label: "Body", size: "text-base", weight: "font-normal", sample: "Sphinx of black quartz, judge my vow." },
                    { label: "Small / Caption", size: "text-sm", weight: "font-medium", sample: "How vexingly quick daft zebras jump!" },
                    { label: "Label / Overline", size: "text-xs", weight: "font-semibold", sample: "UPPERCASE TRACKING WIDEST" },
                  ].map((t, i) => (
                    <div
                      key={t.label}
                      className={`flex items-baseline gap-6 px-6 py-4 ${i < 5 ? "border-b border-slate-100" : ""}`}
                    >
                      <span className="text-xs font-mono text-slate-400 w-36 shrink-0">{t.label}</span>
                      <p
                        className={`${t.size} ${t.weight} text-slate-900 ${t.label === "Label / Overline" ? "uppercase tracking-widest" : ""}`}
                      >
                        {t.sample}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealBlock>

              <RevealBlock delay={0.05}>
                <h3 className="text-base font-semibold text-slate-700 mb-4">Spacing System (8px grid)</h3>
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
                  {spacingSteps.map((s) => (
                    <div key={s.token} className="flex items-center gap-4">
                      <span className="text-xs font-mono text-slate-400 w-20 shrink-0">{s.token}</span>
                      <span className="text-xs text-slate-400 w-10 shrink-0">{s.px}px</span>
                      <div
                        className="rounded-sm"
                        style={{
                          width: `${s.px * 2}px`,
                          height: "16px",
                          backgroundColor: "#1e40af",
                          opacity: 0.15 + (s.px / 96) * 0.85,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </RevealBlock>
            </div>
          )}

          {/* Patterns tab */}
          {activeTab === "Patterns" && (
            <div className="space-y-8">
              <RevealBlock>
                <h3 className="text-base font-semibold text-slate-700 mb-4">Card Patterns</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Standard card */}
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Standard</p>
                    <p className="text-2xl font-bold text-slate-900 mb-1">$8,240</p>
                    <p className="text-sm text-slate-500">Total invoiced this month</p>
                  </div>

                  {/* Highlighted card */}
                  <div
                    className="rounded-xl border p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out"
                    style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#1e40af" }}>Featured</p>
                    <p className="text-2xl font-bold mb-1" style={{ color: "#1e293b" }}>Pro Plan</p>
                    <p className="text-sm" style={{ color: "#475569" }}>Unlimited seats, priority support</p>
                  </div>

                  {/* Action card */}
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Action</p>
                      <p className="text-sm font-semibold text-slate-800 mb-1">Invite your team</p>
                      <p className="text-xs text-slate-500">Add colleagues to your workspace in seconds.</p>
                    </div>
                    <button
                      type="button"
                      className="mt-4 w-full text-xs font-semibold text-white py-2 rounded-md transition-all duration-150 ease-out active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      style={{ backgroundColor: "#2563eb" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1d4ed8"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2563eb"; }}
                    >
                      Send invites
                    </button>
                  </div>
                </div>
              </RevealBlock>

              <RevealBlock delay={0.05}>
                <h3 className="text-base font-semibold text-slate-700 mb-4">Empty State Pattern</h3>
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <IconBarChart className="w-7 h-7 text-blue-400" />
                  </div>
                  <p className="text-base font-semibold text-slate-800 mb-2">No data yet</p>
                  <p className="text-sm text-slate-400 mb-6 max-w-xs mx-auto">Connect your first data source to start seeing insights here.</p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all duration-150 ease-out active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    style={{ backgroundColor: "#2563eb" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1d4ed8"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2563eb"; }}
                  >
                    Connect source
                    <IconArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </RevealBlock>
            </div>
          )}
        </div>
      </section>

      {/* ── Color System ────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3" style={{ color: "#1e293b" }}>
              Color System
            </h2>
            <p className="text-base" style={{ color: "#64748b" }}>
              A precise, purposeful palette anchored in corporate blue — every value earns its place.
            </p>
          </RevealBlock>

          {/* Blue ramp */}
          <RevealBlock className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Blue — Primary</p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {blueSwatches.map((s) => (
                <div key={s.token} className="group">
                  <div
                    className="h-14 rounded-lg mb-2 border border-black/5 transition-all duration-150 group-hover:scale-105 group-hover:shadow-md"
                    style={{ backgroundColor: s.hex }}
                  />
                  <p className="text-xs font-semibold text-slate-700">{s.token}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                  <p className="text-xs font-mono text-slate-400">{s.hex}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Slate ramp */}
          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Slate — Neutral</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {slateSwatches.map((s) => (
                <div key={s.token} className="group">
                  <div
                    className="h-14 rounded-lg mb-2 border border-black/5 transition-all duration-150 group-hover:scale-105 group-hover:shadow-md"
                    style={{ backgroundColor: s.hex }}
                  />
                  <p className="text-xs font-semibold text-slate-700">{s.token}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                  <p className="text-xs font-mono text-slate-400">{s.hex}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Accent */}
          <RevealBlock delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Accent — Semantic</p>
            <div className="grid grid-cols-3 gap-2 max-w-sm">
              {accentSwatches.map((s) => (
                <div key={s.token} className="group">
                  <div
                    className="h-14 rounded-lg mb-2 border border-black/5 transition-all duration-150 group-hover:scale-105 group-hover:shadow-md"
                    style={{ backgroundColor: s.hex }}
                  />
                  <p className="text-xs font-semibold text-slate-700">{s.token}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                  <p className="text-xs font-mono text-slate-400">{s.hex}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Do / Don't ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <RevealBlock className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3" style={{ color: "#1e293b" }}>
              Design Rules
            </h2>
            <p className="text-base" style={{ color: "#64748b" }}>
              Every element communicates reliability and clarity. These rules are non-negotiable.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Do */}
            <RevealBlock>
              <div className="rounded-xl border border-green-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-green-200 flex items-center gap-3" style={{ backgroundColor: "#f0fdf4" }}>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <IconCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-green-800">Do</p>
                </div>
                <div className="p-6 bg-white space-y-3">
                  {doRules.map((rule) => (
                    <div key={rule} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <IconCheck className="w-3 h-3 text-green-600" />
                      </div>
                      <p className="text-sm text-slate-700">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.05}>
              <div className="rounded-xl border border-red-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-red-200 flex items-center gap-3" style={{ backgroundColor: "#fef2f2" }}>
                  <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <IconX className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-red-800">{"Don't"}</p>
                </div>
                <div className="p-6 bg-white space-y-3">
                  {dontRules.map((rule) => (
                    <div key={rule} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <IconX className="w-3 h-3 text-red-500" />
                      </div>
                      <p className="text-sm text-slate-700">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#1e40af" }}>
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <RevealBlock>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to build with confidence?
            </h2>
            <p className="text-lg mb-10" style={{ color: "#bfdbfe" }}>
              Join 14,200 teams that rely on Corporate Clean for their most important products.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 ease-out active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
                style={{ color: "#1e40af" }}
              >
                Get started free
                <IconArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg border border-white/30 text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-150 ease-out active:scale-[0.98] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
              >
                Book a demo
                <IconArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ backgroundColor: "#1e40af" }}
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700">StyleKit</span>
              <span className="text-slate-300 select-none">|</span>
              <span className="text-sm text-slate-400">Corporate Clean Showcase</span>
            </div>
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} StyleKit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
