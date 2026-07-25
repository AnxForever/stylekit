"use client";

export const dynamic = "force-static";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Boxes,
  Check,
  Gauge,
  GitPullRequest,
  KeyRound,
  LineChart,
  Menu,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"] });

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#faq" },
];

const LOGOS = ["Halcyon", "Northgate", "Corvus", "Basalt", "Fathom", "Ironclad"];

interface Stage {
  name: string;
  note: string | null;
  time: string;
}

const STAGES: Stage[] = [
  { name: "Resolve cache", note: "HIT", time: "0.4s" },
  { name: "Install dependencies", note: null, time: "2.1s" },
  { name: "Typecheck", note: null, time: "3.8s" },
  { name: "Unit tests · 1,284", note: null, time: "6.2s" },
  { name: "Build bundle", note: null, time: "4.7s" },
  { name: "Deploy preview", note: "URL", time: "1.3s" },
];

const STEPS = [
  {
    n: "01",
    title: "Connect your repository",
    body: "Point Foundry at any GitHub, GitLab, or Bitbucket repo. It reads your existing config and proposes a working pipeline in under a minute — no starting from a blank YAML file.",
  },
  {
    n: "02",
    title: "Foundry warms the cache",
    body: "Dependencies, compiled artifacts, and test results are fingerprinted and shared across every branch. From the second build onward, up to 94% of the work is simply reused.",
  },
  {
    n: "03",
    title: "Ship on every push",
    body: "Each commit fans out across the runner fleet in parallel. Green checks and a live preview URL land back in the pull request before you have finished reading the diff.",
  },
];

const FEATURES = [
  {
    icon: Gauge,
    tag: "PARALLEL",
    title: "Parallel by default",
    body: "Every job fans out across up to 80 runners at once. A suite that ran twelve minutes end to end comes back in ninety seconds, with no config to write.",
  },
  {
    icon: Boxes,
    tag: "CACHE",
    title: "Remote caching",
    body: "A content-addressed cache shared across your whole team. Change one file and Foundry rebuilds one file, never the other nine hundred it already knows.",
  },
  {
    icon: GitPullRequest,
    tag: "PREVIEW",
    title: "Preview environments",
    body: "Every pull request gets its own fully deployed URL that tears itself down on merge. Reviewers stop queueing for the single shared staging box.",
  },
  {
    icon: RotateCcw,
    tag: "ROLLBACK",
    title: "One-command rollback",
    body: "Each build is immutable and addressable. Promote or roll back to any previous green build in one command — no rebuild, no guessing which commit was good.",
  },
  {
    icon: LineChart,
    tag: "INSIGHTS",
    title: "Build insights",
    body: "See which step is slow, which test flakes, and which dependency bloated the bundle — trended across every run, not just the one that happened to break.",
  },
  {
    icon: KeyRound,
    tag: "SECRETS",
    title: "Scoped secrets",
    body: "Encrypted secrets are injected at runtime, scoped per environment, and never written to disk or printed to a log. Every access lands in one audit timeline.",
  },
];

const METRICS = [
  {
    value: "18",
    suffix: "s",
    label: "median pipeline from cold cache to green check, measured across every customer build",
  },
  {
    value: "94",
    suffix: "%",
    label: "average cache reuse once a repository is warm, so most work never runs a second time",
  },
  {
    value: "80",
    suffix: "×",
    label: "runners a single build can fan out to on demand, with no reserved capacity to plan",
  },
  {
    value: "99.98",
    suffix: "%",
    label: "control-plane uptime over the trailing twelve months, public status page included",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Our CI went from a fourteen-minute wait to under a minute. People stopped drifting into Slack while builds ran, and our merge throughput nearly doubled in a quarter.",
    name: "Dana Whitfield",
    role: "Staff Engineer, Halcyon",
    initials: "DW",
  },
  {
    quote:
      "The remote cache paid for the plan by itself. We were rebuilding the whole monorepo on every pull request; now the second build is basically free.",
    name: "Marcus Bello",
    role: "Platform Lead, Northgate",
    initials: "MB",
  },
  {
    quote:
      "Preview environments ended our staging queue for good. Every PR ships to its own URL, reviewers click through in seconds, and nothing collides anymore.",
    name: "Sofia Krause",
    role: "Head of Engineering, Corvus",
    initials: "SK",
  },
];

interface Plan {
  name: string;
  monthly: number | null;
  yearly: number | null;
  blurb: string;
  features: string[];
  cta: string;
  featured: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Hobby",
    monthly: 0,
    yearly: 0,
    blurb: "For solo projects and open source. Free forever, no card.",
    features: [
      "1 concurrent build",
      "3,000 build minutes / mo",
      "7-day build history",
      "Community support",
      "Unlimited public repos",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Team",
    monthly: 40,
    yearly: 32,
    blurb: "For teams shipping to production every day of the week.",
    features: [
      "Up to 80 concurrent runners",
      "50,000 build minutes / mo",
      "Remote caching across branches",
      "Preview environments",
      "90-day build history",
      "Slack and email support",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    blurb: "For fleets with scale, compliance, and SLA requirements.",
    features: [
      "Unlimited concurrency",
      "Self-hosted runners",
      "SSO, SCIM, and audit log",
      "Single-tenant option",
      "Dedicated support engineer",
      "99.99% uptime SLA",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

const FAQS = [
  {
    q: "How is Foundry faster than the CI I run today?",
    a: "Two levers. Every job fans out across up to 80 runners in parallel, and build artifacts and test results are cached content-addressably across branches. Most teams see cold builds drop three to four times and warm builds drop ten times or more.",
  },
  {
    q: "Do I have to rewrite my pipeline to switch?",
    a: "No. Foundry reads your existing GitHub Actions, CircleCI, or GitLab config and runs it as-is on day one. You opt into native caching and parallelism incrementally, one job at a time, whenever you are ready.",
  },
  {
    q: "What exactly is a build minute?",
    a: "One minute of one runner. A pipeline that fans out to twenty runners for thirty seconds spends ten build minutes. Steps that hit the cache and get skipped cost nothing at all.",
  },
  {
    q: "Can I run builds on my own hardware?",
    a: "Yes. Team and Enterprise plans support self-hosted runners registered to your account, so jobs execute inside your network while the control plane, caching, and dashboards stay fully managed.",
  },
  {
    q: "How are secrets and credentials handled?",
    a: "Secrets are encrypted at rest, scoped per environment, and injected into a job only when it declares them. They are never written to disk or printed to a log, and every access is recorded in an audit timeline.",
  },
  {
    q: "Is there really a free tier for open source?",
    a: "Yes. Public repositories get unlimited build minutes on the Hobby plan, permanently. Fast CI should be table stakes for the commons, not a line item on an invoice.",
  },
];

const FOOTER_COLS = [
  { title: "Platform", links: ["Pipelines", "Remote cache", "Preview envs", "Runners", "Insights"] },
  { title: "Developers", links: ["Docs", "API reference", "CLI", "Status", "Changelog"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Blog"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function StartupLandingTemplate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [yearly, setYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div
      className={`${display.className} min-h-screen bg-[#FAFAF7] text-[#111110] antialiased selection:bg-[#1D4ED8] selection:text-white`}
    >
      <TemplateBackButton variant="minimalist" />

      <style>{`
        @keyframes fd-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes fd-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .fd-rise { opacity: 0; animation: fd-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .fd-blink { animation: fd-blink 1.1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fd-rise { animation: none; opacity: 1; transform: none; }
          .fd-blink { animation: none; opacity: 1; }
        }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#111110]/10 bg-[#FAFAF7]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between border-x border-[#111110]/10 px-5 md:h-[70px] md:px-10">
          <a href="#" className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center bg-[#1D4ED8]">
              <Box className="h-4 w-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-[17px] font-extrabold tracking-[-0.02em]">Foundry</span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${mono.className} text-[13px] text-[#111110]/60 transition-colors hover:text-[#111110]`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="#"
              className={`${mono.className} text-[13px] text-[#111110]/60 transition-colors hover:text-[#111110]`}
            >
              Sign in
            </a>
            <a
              href="#pricing"
              className="group inline-flex items-center gap-1.5 bg-[#111110] px-4 py-2 text-sm font-semibold text-[#FAFAF7] transition-colors hover:bg-[#1D4ED8]"
            >
              Start free
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="text-[#111110] md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#111110]/10 bg-[#FAFAF7] px-5 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${mono.className} block py-2.5 text-sm text-[#111110]/70`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="mt-3 block bg-[#111110] px-4 py-2.5 text-center text-sm font-semibold text-[#FAFAF7]"
            >
              Start free
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-[#111110]/10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(#111110 1px, transparent 1px), linear-gradient(90deg, #111110 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              opacity: 0.03,
              maskImage: "radial-gradient(ellipse 80% 70% at 72% 34%, black, transparent 78%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 72% 34%, black, transparent 78%)",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl border-x border-[#111110]/10 md:grid-cols-[1.08fr_0.92fr]">
            {/* Copy */}
            <div className="border-b border-[#111110]/10 px-5 py-14 md:border-b-0 md:border-r md:px-10 md:py-24">
              <div className="fd-rise flex items-center gap-2.5">
                <span className="h-2 w-2 bg-[#1D4ED8]" />
                <span className={`${mono.className} text-[11px] tracking-[0.22em] text-[#111110]/55`}>
                  CI / CD PLATFORM
                </span>
              </div>

              <h1
                className="fd-rise mt-6 text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[3rem] md:text-[3.5rem] lg:text-[3.9rem]"
                style={{ animationDelay: "80ms" }}
              >
                Ship on every push.
                <br />
                Wait on <span className="text-[#1D4ED8]">nothing.</span>
              </h1>

              <p
                className="fd-rise mt-6 max-w-xl text-[15px] leading-relaxed text-[#111110]/60 md:text-[17px]"
                style={{ animationDelay: "160ms" }}
              >
                Foundry fans every pipeline across up to 80 runners and reuses a warm cache across all
                your branches — so a full build lands green in seconds, not the twelve-minute wait your
                old CI trained you to expect.
              </p>

              <div
                className="fd-rise mt-8 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "240ms" }}
              >
                <a
                  href="#pricing"
                  className="group inline-flex items-center gap-2 bg-[#111110] px-6 py-3.5 text-sm font-semibold text-[#FAFAF7] transition-colors hover:bg-[#1D4ED8]"
                >
                  Start building free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#how"
                  className={`${mono.className} group inline-flex items-center gap-1.5 border-b border-[#111110]/25 pb-1 text-[13px] text-[#111110]/70 transition-colors hover:border-[#1D4ED8] hover:text-[#111110]`}
                >
                  Read the docs
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <p
                className={`${mono.className} fd-rise mt-9 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-[0.1em] text-[#111110]/40`}
                style={{ animationDelay: "320ms" }}
              >
                <span>NO CARD REQUIRED</span>
                <span className="text-[#111110]/20">/</span>
                <span>3,000 FREE BUILD MINUTES</span>
                <span className="text-[#111110]/20">/</span>
                <span>SOC 2 TYPE II</span>
              </p>
            </div>

            {/* Terminal — pure-CSS build pipeline */}
            <div className="relative flex items-center px-5 py-14 md:px-10 md:py-24">
              <div className="fd-rise relative w-full" style={{ animationDelay: "200ms" }}>
                <div className="border border-[#111110]/15 bg-[#0C0C0A] text-[#EDECE4] shadow-[0_30px_60px_-32px_rgba(17,17,16,0.55)]">
                  {/* title bar */}
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-[#1D4ED8]" />
                      <span className={`${mono.className} text-[11px] tracking-wide text-white/60`}>
                        foundry-ci · build #4021
                      </span>
                    </div>
                    <span className={`${mono.className} text-[11px] text-white/40`}>main</span>
                  </div>

                  {/* body */}
                  <div className={`${mono.className} px-4 py-4 text-[12.5px] leading-relaxed`}>
                    <div className="flex gap-2 text-white/80">
                      <span className="text-[#1D4ED8]">$</span> foundry run --pipeline ci
                    </div>
                    <div className="mt-1 text-white/35">→ 6 stages · 12 runners · cache warm</div>

                    <div className="mt-3 space-y-2">
                      {STAGES.map((stage, i) => (
                        <div
                          key={stage.name}
                          className="fd-rise flex items-center gap-2.5"
                          style={{ animationDelay: `${380 + i * 90}ms` }}
                        >
                          <Check className="h-3.5 w-3.5 shrink-0 text-[#22C55E]" strokeWidth={3} />
                          <span className="shrink-0 text-white/80">{stage.name}</span>
                          {stage.note && (
                            <span className="shrink-0 bg-[#1D4ED8]/20 px-1.5 text-[10px] text-[#8AB0FF]">
                              {stage.note}
                            </span>
                          )}
                          <span className="h-px flex-1 border-b border-dotted border-white/15" />
                          <span className="shrink-0 text-white/45">{stage.time}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-white/80">
                      <Check className="h-3.5 w-3.5 text-[#22C55E]" strokeWidth={3} />
                      <span>pipeline passed</span>
                      <span className="fd-blink ml-0.5 inline-block h-3.5 w-[7px] bg-white/70" />
                    </div>
                  </div>

                  {/* footer */}
                  <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5">
                    <span className={`${mono.className} text-[11px] text-[#22C55E]`}>PASSED · 18.5s</span>
                    <span className={`${mono.className} text-[11px] text-white/40`}>94% CACHE HIT</span>
                  </div>
                </div>

                {/* annotation chip */}
                <div className="absolute -bottom-6 -left-3 hidden border border-[#111110]/15 bg-[#FAFAF7] px-4 py-3 shadow-[0_16px_30px_-18px_rgba(17,17,16,0.4)] sm:block">
                  <p className={`${mono.className} text-[10px] tracking-[0.18em] text-[#111110]/45`}>
                    MEDIAN BUILD
                  </p>
                  <p className="text-2xl font-bold leading-none">
                    18<span className="text-[#1D4ED8]">s</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo strip ────────────────────────────────────────── */}
        <section className="border-b border-[#111110]/10">
          <div className="mx-auto max-w-6xl border-x border-[#111110]/10 px-5 py-8 md:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <p className={`${mono.className} shrink-0 text-[11px] tracking-[0.2em] text-[#111110]/45`}>
                SHIPPING FASTER AT
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:flex md:flex-1 md:items-center md:justify-between">
                {LOGOS.map((logo) => (
                  <span
                    key={logo}
                    className="text-[15px] font-semibold tracking-tight text-[#111110]/40 transition-colors hover:text-[#111110]"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────── */}
        <section id="how" className="border-b border-[#111110]/10">
          <div className="mx-auto max-w-6xl border-x border-[#111110]/10 px-5 py-16 md:px-10 md:py-24">
            <div className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#1D4ED8]`}>01</span>
                  <span className="h-px w-8 bg-[#1D4ED8]" />
                  <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#111110]/45`}>
                    HOW IT WORKS
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-[-0.02em] md:text-[2.7rem] md:leading-[1.05]">
                  From repo to green check in three moves.
                </h2>
              </div>
              <p className="text-[15px] leading-relaxed text-[#111110]/55 md:self-end md:pb-2 md:pl-10">
                No YAML rewrite, no migration weekend. Foundry adopts the pipeline you already run and
                makes it fast, one job at a time — you keep shipping the entire way.
              </p>
            </div>

            <div className="border-t border-[#111110]/10">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="group grid gap-4 border-b border-[#111110]/10 py-8 md:grid-cols-[auto_1fr_1.4fr] md:items-baseline md:gap-10 md:py-10"
                >
                  <span
                    className={`${mono.className} text-5xl font-medium text-[#111110]/15 transition-colors group-hover:text-[#1D4ED8] md:text-6xl`}
                  >
                    {step.n}
                  </span>
                  <h3 className="text-xl font-semibold tracking-[-0.01em] md:text-2xl">{step.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#111110]/55">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────── */}
        <section id="platform" className="border-b border-[#111110]/10">
          <div className="mx-auto max-w-6xl border-x border-[#111110]/10 px-5 py-16 md:px-10 md:py-24">
            <div className="mb-12 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#1D4ED8]`}>02</span>
                  <span className="h-px w-8 bg-[#1D4ED8]" />
                  <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#111110]/45`}>
                    THE PLATFORM
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-[-0.02em] md:text-[2.7rem] md:leading-[1.05]">
                  Six primitives. One fast build.
                </h2>
              </div>
              <p className="text-[15px] leading-relaxed text-[#111110]/55 md:self-end md:pb-2 md:pl-10">
                Caching, parallelism, previews, rollback, insights, and secrets — built into the runner,
                not bolted on with plugins and glue scripts you have to maintain.
              </p>
            </div>

            <div className="grid border-l border-t border-[#111110]/10 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <article
                  key={feature.tag}
                  className="group border-b border-r border-[#111110]/10 p-7 transition-colors hover:bg-white md:p-8"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center border border-[#111110]/15 transition-colors group-hover:border-[#1D4ED8] group-hover:bg-[#1D4ED8]">
                      <feature.icon
                        className="h-[18px] w-[18px] text-[#111110] transition-colors group-hover:text-white"
                        strokeWidth={1.75}
                      />
                    </span>
                    <span className={`${mono.className} text-[10px] tracking-[0.2em] text-[#111110]/30`}>
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="mb-2.5 text-lg font-semibold tracking-[-0.01em]">{feature.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#111110]/55">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Metrics band ──────────────────────────────────────── */}
        <section className="border-b border-[#111110]/10 bg-[#0C0C0A] text-[#FAFAF7]">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#1D4ED8]" />
                  <span className={`${mono.className} text-[11px] tracking-[0.22em] text-white/50`}>
                    MEASURED IN PRODUCTION
                  </span>
                </div>
                <h2 className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.01em] md:text-[1.9rem] md:leading-[1.15]">
                  Numbers our customers actually see, not the ones on a slide.
                </h2>
              </div>
              <p className={`${mono.className} text-[11px] tracking-wide text-white/35`}>TRAILING 12 MONTHS</p>
            </div>

            <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {METRICS.map((metric) => (
                <div key={metric.label} className="bg-[#0C0C0A] p-7 md:p-8">
                  <p className={`${mono.className} text-4xl font-medium tracking-tight md:text-5xl`}>
                    {metric.value}
                    <span className="text-[#1D4ED8]">{metric.suffix}</span>
                  </p>
                  <p className="mt-3 text-[13px] leading-snug text-white/50">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────── */}
        <section id="customers" className="border-b border-[#111110]/10">
          <div className="mx-auto max-w-6xl border-x border-[#111110]/10 px-5 py-16 md:px-10 md:py-24">
            <div className="mb-12 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#1D4ED8]`}>03</span>
                  <span className="h-px w-8 bg-[#1D4ED8]" />
                  <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#111110]/45`}>
                    FIELD NOTES
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-[-0.02em] md:text-[2.7rem] md:leading-[1.05]">
                  Teams that stopped waiting on CI.
                </h2>
              </div>
              <p className="text-[15px] leading-relaxed text-[#111110]/55 md:self-end md:pb-2 md:pl-10">
                A minute saved on every build compounds across a hundred engineers and a thousand merges
                a week. Here is what that felt like on the ground.
              </p>
            </div>

            <div className="grid gap-px border border-[#111110]/10 bg-[#111110]/10 md:grid-cols-3">
              {TESTIMONIALS.map((testimonial) => (
                <figure key={testimonial.name} className="flex flex-col justify-between bg-[#FAFAF7] p-7 md:p-8">
                  <blockquote className="text-[17px] leading-[1.5] text-[#111110]/85 md:text-lg">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-[#111110]/10 pt-5">
                    <span
                      className={`${mono.className} grid h-9 w-9 place-items-center bg-[#111110] text-xs font-semibold text-[#FAFAF7]`}
                    >
                      {testimonial.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className={`${mono.className} text-[11px] text-[#111110]/45`}>{testimonial.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ───────────────────────────────────────────── */}
        <section id="pricing" className="border-b border-[#111110]/10">
          <div className="mx-auto max-w-6xl border-x border-[#111110]/10 px-5 py-16 md:px-10 md:py-24">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#1D4ED8]`}>04</span>
                  <span className="h-px w-8 bg-[#1D4ED8]" />
                  <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#111110]/45`}>
                    PRICING
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-[-0.02em] md:text-[2.7rem] md:leading-[1.05]">
                  Priced by the build, not the seat.
                </h2>
              </div>

              <div className={`${mono.className} flex items-center gap-3 text-[11px] tracking-[0.12em]`}>
                <span className={yearly ? "text-[#111110]/40" : "text-[#111110]"}>MONTHLY</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={yearly}
                  aria-label="Toggle billing period"
                  onClick={() => setYearly((v) => !v)}
                  className="relative h-6 w-11 border border-[#111110]/25 transition-colors hover:border-[#111110]/45"
                >
                  <span
                    className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 bg-[#1D4ED8] transition-all ${
                      yearly ? "left-[calc(100%-1.2rem)]" : "left-1"
                    }`}
                  />
                </button>
                <span className={yearly ? "text-[#111110]" : "text-[#111110]/40"}>
                  YEARLY <span className="text-[#1D4ED8]">-20%</span>
                </span>
              </div>
            </div>

            <div className="grid border-l border-t border-[#111110]/10 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <article
                  key={plan.name}
                  className={`flex flex-col border-b border-r border-[#111110]/10 p-8 ${
                    plan.featured ? "bg-[#111110] text-[#FAFAF7]" : ""
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className={`${mono.className} text-xs tracking-[0.18em]`}>{plan.name.toUpperCase()}</h3>
                    {plan.featured && (
                      <span
                        className={`${mono.className} bg-[#1D4ED8] px-2 py-0.5 text-[10px] font-medium text-white`}
                      >
                        MOST TEAMS
                      </span>
                    )}
                  </div>

                  <p
                    className={`mb-6 min-h-10 text-[14px] leading-relaxed ${
                      plan.featured ? "text-white/55" : "text-[#111110]/55"
                    }`}
                  >
                    {plan.blurb}
                  </p>

                  <div className="mb-7">
                    {plan.monthly === null ? (
                      <span className="text-4xl font-bold tracking-tight">Custom</span>
                    ) : (
                      <span className="flex items-baseline gap-1.5">
                        <span className={`${mono.className} text-5xl font-semibold tracking-tight`}>
                          ${yearly ? plan.yearly : plan.monthly}
                        </span>
                        <span
                          className={`${mono.className} text-sm ${
                            plan.featured ? "text-white/50" : "text-[#111110]/45"
                          }`}
                        >
                          /mo
                        </span>
                      </span>
                    )}
                  </div>

                  <ul
                    className={`mb-9 space-y-3 border-t pt-6 ${
                      plan.featured ? "border-white/15" : "border-[#111110]/10"
                    }`}
                  >
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2.5 text-[14px] ${
                          plan.featured ? "text-white/80" : "text-[#111110]/75"
                        }`}
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1D4ED8]" strokeWidth={2.5} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#"
                    className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-colors ${
                      plan.featured
                        ? "bg-[#1D4ED8] text-white hover:bg-[#2563EB]"
                        : "border border-[#111110]/20 text-[#111110] hover:border-[#1D4ED8] hover:text-[#1D4ED8]"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </article>
              ))}
            </div>

            <p className={`${mono.className} mt-6 text-[11px] tracking-wide text-[#111110]/40`}>
              ALL PLANS INCLUDE UNLIMITED SEATS · OPEN-FORMAT EXPORT · NO EGRESS FEES
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section id="faq" className="border-b border-[#111110]/10">
          <div className="mx-auto grid max-w-6xl gap-10 border-x border-[#111110]/10 px-5 py-16 md:grid-cols-[0.85fr_1.15fr] md:px-10 md:py-24">
            <div>
              <div className="flex items-center gap-3">
                <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#1D4ED8]`}>05</span>
                <span className="h-px w-8 bg-[#1D4ED8]" />
                <span className={`${mono.className} text-[11px] tracking-[0.2em] text-[#111110]/45`}>
                  QUESTIONS
                </span>
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.02em] md:text-[2.7rem] md:leading-[1.05]">
                Answers, before you ask.
              </h2>
              <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#111110]/55">
                Still curious? The docs go deep on every pipeline primitive, and engineers answer the
                shared inbox within a business day.
              </p>
              <a
                href="#"
                className={`${mono.className} group mt-6 inline-flex items-center gap-1.5 border-b border-[#111110]/25 pb-1 text-[13px] text-[#111110]/70 transition-colors hover:border-[#1D4ED8] hover:text-[#111110]`}
              >
                Read the full docs
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="border-t border-[#111110]/10">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="border-b border-[#111110]/10">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-[15px] font-semibold md:text-base">{faq.q}</span>
                      <Plus
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-45 text-[#1D4ED8]" : "text-[#111110]/40"
                        }`}
                        strokeWidth={2}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-6 pr-6 text-[14px] leading-relaxed text-[#111110]/55">{faq.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="border-b border-[#111110]/10 bg-[#0C0C0A] text-[#FAFAF7]">
          <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
            <div className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] md:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#1D4ED8]" />
                  <span className={`${mono.className} text-[11px] tracking-[0.22em] text-white/50`}>
                    START BUILDING
                  </span>
                </div>
                <h2 className="mt-5 text-4xl font-bold tracking-[-0.02em] md:text-6xl md:leading-[1.02]">
                  Your next build is
                  <br />
                  already <span className="text-[#1D4ED8]">warm.</span>
                </h2>
              </div>

              <div className="flex flex-col items-start gap-4 md:items-end">
                <a
                  href="#pricing"
                  className="group inline-flex items-center gap-2 bg-[#FAFAF7] px-7 py-4 text-sm font-semibold text-[#0C0C0A] transition-colors hover:bg-[#1D4ED8] hover:text-white"
                >
                  Start building free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <span className={`${mono.className} text-[11px] tracking-wide text-white/40`}>
                  10 MINUTES TO YOUR FIRST GREEN CHECK
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-[#FAFAF7]">
        <div className="mx-auto max-w-6xl border-x border-[#111110]/10 px-5 py-14 md:px-10 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,0.75fr)]">
            <div>
              <a href="#" className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center bg-[#1D4ED8]">
                  <Box className="h-4 w-4 text-white" strokeWidth={2.5} />
                </span>
                <span className="text-[17px] font-extrabold tracking-[-0.02em]">Foundry</span>
              </a>
              <p className="mt-5 max-w-[17rem] text-[14px] leading-relaxed text-[#111110]/50">
                The build platform for teams that ship on every push. Parallel runners, a warm cache,
                and previews on every pull request.
              </p>
              <p className={`${mono.className} mt-6 flex items-center gap-2 text-[11px] tracking-wide text-[#111110]/45`}>
                <span className="h-1.5 w-1.5 bg-[#22C55E]" />
                ALL RUNNERS OPERATIONAL
              </p>
            </div>

            {FOOTER_COLS.map((col) => (
              <nav key={col.title}>
                <p className={`${mono.className} mb-4 text-[11px] tracking-[0.2em] text-[#111110]/35`}>
                  {col.title.toUpperCase()}
                </p>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block py-1.5 text-[14px] text-[#111110]/55 transition-colors hover:text-[#111110]"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#111110]/10 pt-6">
            <p className={`${mono.className} text-[11px] tracking-wide text-[#111110]/40`}>
              &copy; 2026 FOUNDRY, INC.
            </p>
            <p className={`${mono.className} text-[11px] tracking-[0.14em] text-[#111110]/40`}>
              BUILT FOR TEAMS THAT SHIP
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
