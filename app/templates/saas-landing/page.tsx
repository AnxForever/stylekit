"use client";

export const dynamic = "force-static";

import { useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  Check,
  ChevronDown,
  GitBranch,
  Globe2,
  Menu,
  Radar,
  ShieldCheck,
  Terminal,
  Waypoints,
  X,
} from "lucide-react";
import { IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"] });
const sans = Instrument_Sans({ subsets: ["latin"] });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"] });

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = ["Platform", "Pricing", "Customers", "Docs"];

const LOGOS = ["Northwind", "Ferrostack", "Opaline", "Kessler & Co", "Bidwell", "Tectonic", "Mireille"];

const LOG_LINES = [
  { time: "14:02:11", level: "ok", text: "deploy prod-eu-1 · 214ms · healthy" },
  { time: "14:02:14", level: "ok", text: "edge cache warmed · 41 regions" },
  { time: "14:02:19", level: "warn", text: "p99 latency +12ms · api/checkout" },
  { time: "14:02:23", level: "ok", text: "auto-rollback armed · threshold 0.5%" },
  { time: "14:02:31", level: "ok", text: "traffic shift 10% -> 100% complete" },
];

const SPARK = [42, 38, 51, 44, 62, 58, 71, 66, 54, 47, 52, 45, 41, 39, 44, 40];

const FEATURES = [
  {
    icon: Radar,
    title: "Latency cartography",
    body: "Every request traced across regions and plotted before your coffee cools. p50 to p99.9, no sampling excuses.",
    tag: "TRACE",
  },
  {
    icon: GitBranch,
    title: "Deploys that watch themselves",
    body: "Ship behind an automatic canary. Meridian compares error budgets in real time and rolls back before users notice.",
    tag: "DEPLOY",
  },
  {
    icon: BellRing,
    title: "Alerts with taste",
    body: "One page per incident, grouped by cause — not forty duplicate pings at 3 a.m. Your on-call will send flowers.",
    tag: "ALERT",
  },
  {
    icon: Globe2,
    title: "41 regions, one clock",
    body: "Synthetic probes from every continent, reconciled to a single timeline so 'slow in Sydney' is a fact, not a vibe.",
    tag: "PROBE",
  },
  {
    icon: Terminal,
    title: "Query like you mean it",
    body: "A real query language over logs, traces, and metrics together. Pipe, filter, aggregate — answers in milliseconds.",
    tag: "QUERY",
  },
  {
    icon: ShieldCheck,
    title: "Audit-grade history",
    body: "Every deploy, alert, and config change is immutable and exportable. SOC 2 auditors leave early.",
    tag: "AUDIT",
  },
];

const METRICS = [
  { value: "99.995%", label: "uptime measured across customer fleet, trailing 12 months" },
  { value: "38ms", label: "median query response over 1.2 trillion indexed events" },
  { value: "4min", label: "average time from regression to automatic rollback" },
  { value: "12,400+", label: "production services reporting into Meridian today" },
];

const TESTIMONIALS = [
  {
    quote:
      "We replaced three dashboards and an entire pager rotation spreadsheet. Incidents feel boring now, which is the highest compliment I can give.",
    name: "Ana Reyes",
    role: "VP Infrastructure, Ferrostack",
  },
  {
    quote:
      "The canary rollbacks paid for the contract in the first month. One bad deploy caught at 0.4% traffic — that would have been our worst outage of the year.",
    name: "Tobias Lindqvist",
    role: "Staff SRE, Northwind",
  },
  {
    quote:
      "Finally a vendor whose query language doesn't fight back. Our juniors were productive on day one.",
    name: "Priya Natarajan",
    role: "Head of Platform, Opaline",
  },
];

const PLANS = [
  {
    name: "Instrument",
    monthly: 0,
    yearly: 0,
    blurb: "For side projects and small services finding their pulse.",
    features: ["3 services", "7-day retention", "Community support", "2 synthetic probes"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Observatory",
    monthly: 89,
    yearly: 74,
    blurb: "For teams running production and sleeping at night.",
    features: [
      "Unlimited services",
      "13-month retention",
      "Canary deploys + auto-rollback",
      "41-region probes",
      "Incident timeline & postmortems",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Meridian Line",
    monthly: null,
    yearly: null,
    blurb: "For fleets with compliance teeth and single-tenant needs.",
    features: ["Single-tenant deployment", "Custom retention", "SSO / SCIM / audit export", "Dedicated engineer"],
    cta: "Talk to us",
    featured: false,
  },
];

const FAQS = [
  {
    q: "How long does instrumentation take?",
    a: "Most teams see first traces in under ten minutes. We ship OpenTelemetry-native SDKs and an agent that auto-discovers common runtimes — no code changes for the standard path.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "Full export in open formats (OTLP, Parquet) at any time, on any plan, including free. Retention is your contract, not our leverage.",
  },
  {
    q: "Do you charge per seat?",
    a: "No. Observability read access should be universal — engineers, support, product. Pricing scales with ingested volume only.",
  },
  {
    q: "Can Meridian run in our VPC?",
    a: "The Meridian Line plan deploys single-tenant into your cloud account with the same feature set and our team operating it under your controls.",
  },
];

const FOOTER_COLS = [
  { title: "Platform", links: ["Tracing", "Deploys", "Alerting", "Probes", "Query"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Press kit"] },
  { title: "Resources", links: ["Docs", "API reference", "Status", "Changelog"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA", "Subprocessors"] },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function SaasLandingTemplate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [yearly, setYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div
      className={`${sans.className} min-h-screen bg-[#0B0B0E] text-[#EDEAE0] antialiased selection:bg-[#FF4D00] selection:text-[#0B0B0E]`}
    >
      <TemplateBackButton variant="dark" />
      <style>{`
        @keyframes mdn-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @keyframes mdn-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes mdn-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        .mdn-rise { opacity: 0; animation: mdn-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .mdn-marquee { animation: mdn-marquee 28s linear infinite; }
        .mdn-pulse { animation: mdn-pulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mdn-rise { animation: none; opacity: 1; }
          .mdn-marquee { animation: none; }
          .mdn-pulse { animation: none; }
        }
      `}</style>

      {/* Grain + grid atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(237,234,224,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,224,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#EDEAE0]/10 bg-[#0B0B0E]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center bg-[#FF4D00]">
              <Waypoints className="h-4 w-4 text-[#0B0B0E]" strokeWidth={2.5} />
            </span>
            <span className={`${mono.className} text-sm font-medium tracking-[0.18em]`}>MERIDIAN</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-[#EDEAE0]/60 transition-colors hover:text-[#EDEAE0]"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="#" className="text-sm text-[#EDEAE0]/60 transition-colors hover:text-[#EDEAE0]">
              Sign in
            </a>
            <a
              href="#pricing"
              className="group inline-flex items-center gap-1.5 bg-[#EDEAE0] px-4 py-2 text-sm font-medium text-[#0B0B0E] transition-colors hover:bg-[#FF4D00]"
            >
              Get started
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#EDEAE0]/10 px-5 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="block py-2.5 text-sm text-[#EDEAE0]/70">
                {link}
              </a>
            ))}
            <a href="#pricing" className="mt-3 block bg-[#EDEAE0] px-4 py-2.5 text-center text-sm font-medium text-[#0B0B0E]">
              Get started
            </a>
          </nav>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative z-10 border-b border-[#EDEAE0]/10">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8 md:pb-28 md:pt-24">
          <div>
            <p className={`${mono.className} mdn-rise mb-6 flex items-center gap-2.5 text-xs tracking-[0.22em] text-[#FF4D00]`}>
              <span className="mdn-pulse inline-block h-1.5 w-1.5 rounded-full bg-[#FF4D00]" />
              OBSERVABILITY, INSTRUMENT-GRADE
            </p>
            <h1
              className={`${serif.className} mdn-rise text-[2.9rem] leading-[1.02] md:text-[4.4rem]`}
              style={{ animationDelay: "80ms" }}
            >
              Your production,
              <br />
              <em className="text-[#FF4D00]">measured</em> like it
              <br />
              matters.
            </h1>
            <p
              className="mdn-rise mt-7 max-w-md text-base leading-relaxed text-[#EDEAE0]/60 md:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Meridian traces every request, audits every deploy, and rolls back the bad ones
              before your customers ever feel them.
            </p>
            <div className="mdn-rise mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "240ms" }}>
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 bg-[#FF4D00] px-6 py-3.5 text-sm font-semibold text-[#0B0B0E] transition-transform hover:-translate-y-0.5"
              >
                Start measuring
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#platform"
                className={`${mono.className} inline-flex items-center gap-2 border-b border-[#EDEAE0]/30 pb-1 text-sm text-[#EDEAE0]/70 transition-colors hover:border-[#FF4D00] hover:text-[#EDEAE0]`}
              >
                Read the tour
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <p className={`${mono.className} mdn-rise mt-8 text-[11px] tracking-wide text-[#EDEAE0]/35`} style={{ animationDelay: "320ms" }}>
              FREE FOR 3 SERVICES · NO CARD · OTLP-NATIVE
            </p>
          </div>

          {/* Status panel — pure CSS product art */}
          <div className="mdn-rise relative" style={{ animationDelay: "200ms" }}>
            <div aria-hidden className="absolute -inset-6 bg-[#FF4D00]/10 blur-3xl" />
            <div className="relative border border-[#EDEAE0]/15 bg-[#101014] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-[#EDEAE0]/10 px-4 py-3">
                <span className={`${mono.className} text-[11px] tracking-[0.18em] text-[#EDEAE0]/50`}>
                  PROD-EU-1 · LIVE
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="mdn-pulse h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                  <span className={`${mono.className} text-[11px] text-[#4ADE80]`}>HEALTHY</span>
                </span>
              </div>
              {/* Sparkline */}
              <div className="border-b border-[#EDEAE0]/10 px-4 py-4">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className={`${mono.className} text-[11px] text-[#EDEAE0]/40`}>p99 latency</span>
                  <span className={`${mono.className} text-lg text-[#EDEAE0]`}>
                    138<span className="text-[#EDEAE0]/40">ms</span>
                  </span>
                </div>
                <div className="flex h-14 items-end gap-1">
                  {SPARK.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i === 6 ? "#FF4D00" : "rgba(237,234,224,0.22)",
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Log stream */}
              <div className="px-4 py-3">
                {LOG_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={`${mono.className} mdn-rise flex gap-3 py-1.5 text-[11.5px] leading-snug`}
                    style={{ animationDelay: `${400 + i * 120}ms` }}
                  >
                    <span className="shrink-0 text-[#EDEAE0]/30">{line.time}</span>
                    <span
                      className={`shrink-0 ${line.level === "warn" ? "text-[#FF4D00]" : "text-[#4ADE80]"}`}
                    >
                      {line.level === "warn" ? "WARN" : "  OK"}
                    </span>
                    <span className="text-[#EDEAE0]/70">{line.text}</span>
                  </div>
                ))}
              </div>
              {/* Panel footer */}
              <div className="flex items-center justify-between border-t border-[#EDEAE0]/10 px-4 py-2.5">
                <span className={`${mono.className} text-[10px] tracking-[0.16em] text-[#EDEAE0]/30`}>
                  41 REGIONS REPORTING
                </span>
                <Activity className="h-3.5 w-3.5 text-[#EDEAE0]/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Logo marquee ────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden border-b border-[#EDEAE0]/10 py-7">
        <div className="mdn-marquee flex w-max items-center gap-16 pr-16">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <span
              key={i}
              className={`${serif.className} whitespace-nowrap text-xl italic text-[#EDEAE0]/30`}
            >
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* ── Features bento ──────────────────────────────────────── */}
      <section id="platform" className="relative z-10 border-b border-[#EDEAE0]/10">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${mono.className} mb-4 text-xs tracking-[0.22em] text-[#FF4D00]`}>THE INSTRUMENTS</p>
              <h2 className={`${serif.className} max-w-xl text-4xl leading-[1.05] md:text-5xl`}>
                Six instruments. <em>One</em> timeline.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#EDEAE0]/50">
              Traces, deploys, alerts, probes, queries, and audit — reconciled to a single clock so
              cause and effect stop playing hide and seek.
            </p>
          </div>

          <div className="grid gap-px bg-[#EDEAE0]/10 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.tag}
                className="group relative bg-[#0B0B0E] p-7 transition-colors hover:bg-[#101014]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <feature.icon className="h-5 w-5 text-[#EDEAE0]/70 transition-colors group-hover:text-[#FF4D00]" strokeWidth={1.5} />
                  <span className={`${mono.className} text-[10px] tracking-[0.2em] text-[#EDEAE0]/25`}>
                    {feature.tag}
                  </span>
                </div>
                <h3 className="mb-2.5 text-lg font-medium">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[#EDEAE0]/50">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics band ────────────────────────────────────────── */}
      <section className="relative z-10 border-b border-[#EDEAE0]/10 bg-[#EDEAE0] text-[#0B0B0E]">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden px-5 py-16 sm:grid-cols-2 md:px-8 md:py-20 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <div key={metric.value} className="border-l border-[#0B0B0E]/15 py-2 pl-5 pr-4">
              <p className={`${mono.className} text-3xl font-medium tracking-tight md:text-4xl`}>{metric.value}</p>
              <p className="mt-2.5 text-[13px] leading-snug text-[#0B0B0E]/60">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section className="relative z-10 border-b border-[#EDEAE0]/10">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className={`${mono.className} mb-14 text-xs tracking-[0.22em] text-[#FF4D00]`}>FIELD REPORTS</p>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <figure key={testimonial.name} className="flex flex-col justify-between">
                <blockquote className={`${serif.className} text-xl leading-[1.35] text-[#EDEAE0]/90 md:text-[1.35rem]`}>
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 border-t border-[#EDEAE0]/15 pt-4">
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className={`${mono.className} mt-1 text-[11px] tracking-wide text-[#EDEAE0]/40`}>
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────── */}
      <section id="pricing" className="relative z-10 border-b border-[#EDEAE0]/10">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${mono.className} mb-4 text-xs tracking-[0.22em] text-[#FF4D00]`}>PRICING</p>
              <h2 className={`${serif.className} text-4xl leading-[1.05] md:text-5xl`}>
                Pay for volume. <em>Never</em> for eyes.
              </h2>
            </div>
            <div className={`${mono.className} flex items-center gap-3 text-xs`}>
              <span className={yearly ? "text-[#EDEAE0]/40" : "text-[#EDEAE0]"}>MONTHLY</span>
              <button
                type="button"
                role="switch"
                aria-checked={yearly}
                onClick={() => setYearly(!yearly)}
                className="relative h-6 w-11 border border-[#EDEAE0]/30 transition-colors"
              >
                <span
                  className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 bg-[#FF4D00] transition-all ${
                    yearly ? "left-[calc(100%-1.2rem)]" : "left-1"
                  }`}
                />
              </button>
              <span className={yearly ? "text-[#EDEAE0]" : "text-[#EDEAE0]/40"}>
                YEARLY <span className="text-[#FF4D00]">-17%</span>
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col border p-8 ${
                  plan.featured
                    ? "border-[#FF4D00] bg-[#101014] shadow-[0_30px_60px_-30px_rgba(255,77,0,0.35)]"
                    : "border-[#EDEAE0]/15"
                }`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className={`${mono.className} text-sm tracking-[0.18em]`}>{plan.name.toUpperCase()}</h3>
                  {plan.featured && (
                    <span className={`${mono.className} bg-[#FF4D00] px-2 py-0.5 text-[10px] font-medium text-[#0B0B0E]`}>
                      MOST TEAMS
                    </span>
                  )}
                </div>
                <p className="mb-6 min-h-10 text-sm leading-relaxed text-[#EDEAE0]/50">{plan.blurb}</p>
                <p className="mb-8">
                  {plan.monthly === null ? (
                    <span className={`${serif.className} text-4xl italic`}>Custom</span>
                  ) : (
                    <>
                      <span className={`${mono.className} text-5xl font-medium tracking-tight`}>
                        ${yearly ? plan.yearly : plan.monthly}
                      </span>
                      <span className={`${mono.className} text-sm text-[#EDEAE0]/40`}> /mo</span>
                    </>
                  )}
                </p>
                <ul className="mb-10 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#EDEAE0]/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D00]" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
                    plan.featured
                      ? "bg-[#FF4D00] text-[#0B0B0E] hover:bg-[#EDEAE0]"
                      : "border border-[#EDEAE0]/25 text-[#EDEAE0] hover:border-[#FF4D00] hover:text-[#FF4D00]"
                  }`}
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="relative z-10 border-b border-[#EDEAE0]/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-28">
          <div>
            <p className={`${mono.className} mb-4 text-xs tracking-[0.22em] text-[#FF4D00]`}>QUESTIONS</p>
            <h2 className={`${serif.className} text-4xl leading-[1.05] md:text-5xl`}>
              Asked, <em>answered.</em>
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#EDEAE0]/50">
              Anything else — engineers answer the shared inbox within a business day.
            </p>
          </div>
          <div className="divide-y divide-[#EDEAE0]/10 border-y border-[#EDEAE0]/10">
            {FAQS.map((faq, index) => (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#EDEAE0]/40 transition-transform ${
                      openFaq === index ? "rotate-180 text-[#FF4D00]" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <p className="pb-6 pr-8 text-sm leading-relaxed text-[#EDEAE0]/55">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden border-b border-[#EDEAE0]/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(255,77,0,0.22), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24 text-center md:px-8 md:py-32">
          <p className={`${mono.className} mb-6 text-xs tracking-[0.22em] text-[#FF4D00]`}>BEGIN CALIBRATION</p>
          <h2 className={`${serif.className} mx-auto max-w-2xl text-4xl leading-[1.05] md:text-6xl`}>
            Stop guessing. <em className="text-[#FF4D00]">Start measuring.</em>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2 bg-[#EDEAE0] px-7 py-4 text-sm font-semibold text-[#0B0B0E] transition-colors hover:bg-[#FF4D00]"
            >
              Create free account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className={`${mono.className} text-[11px] tracking-wide text-[#EDEAE0]/35`}>
              10 MIN TO FIRST TRACE
            </span>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,0.7fr)]">
            <div>
              <a href="#" className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center bg-[#FF4D00]">
                  <Waypoints className="h-4 w-4 text-[#0B0B0E]" strokeWidth={2.5} />
                </span>
                <span className={`${mono.className} text-sm font-medium tracking-[0.18em]`}>MERIDIAN</span>
              </a>
              <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-[#EDEAE0]/40">
                Instrument-grade observability for teams who treat production like a promise.
              </p>
            </div>
            {FOOTER_COLS.map((col) => (
              <nav key={col.title}>
                <p className={`${mono.className} mb-4 text-[11px] tracking-[0.2em] text-[#EDEAE0]/35`}>
                  {col.title.toUpperCase()}
                </p>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block py-1.5 text-sm text-[#EDEAE0]/55 transition-colors hover:text-[#EDEAE0]"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#EDEAE0]/10 pt-6">
            <p className={`${mono.className} text-[11px] text-[#EDEAE0]/30`}>
              © 2026 MERIDIAN SYSTEMS, INC.
            </p>
            <p className={`${mono.className} text-[11px] tracking-[0.16em] text-[#EDEAE0]/30`}>
              ALL SYSTEMS NOMINAL
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
