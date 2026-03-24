"use client";

export const dynamic = "force-static";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  X,
  ChevronDown,
  Zap,
  Globe,
  BarChart3,
  GitBranch,
  DollarSign,
  Server,
  Loader2,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// --- Data ---

const comparisonFeatures = [
  {
    name: "Deployment Time",
    icon: Zap,
    nexus: "Under 30 seconds",
    traditional: "30-60 minutes",
    nexusOk: true,
    traditionalOk: false,
  },
  {
    name: "Auto-Scaling",
    icon: Server,
    nexus: "Instant, zero config",
    traditional: "Manual provisioning",
    nexusOk: true,
    traditionalOk: false,
  },
  {
    name: "Monitoring & Alerts",
    icon: BarChart3,
    nexus: "Built-in AI anomaly detection",
    traditional: "Third-party setup required",
    nexusOk: true,
    traditionalOk: false,
  },
  {
    name: "CI/CD Integration",
    icon: GitBranch,
    nexus: "Native, push-to-deploy",
    traditional: "Complex pipeline config",
    nexusOk: true,
    traditionalOk: false,
  },
  {
    name: "Cost Management",
    icon: DollarSign,
    nexus: "Predictive budgets + alerts",
    traditional: "Surprise bills monthly",
    nexusOk: true,
    traditionalOk: false,
  },
  {
    name: "Global CDN",
    icon: Globe,
    nexus: "300+ edge nodes worldwide",
    traditional: "Manual CDN setup",
    nexusOk: true,
    traditionalOk: false,
  },
];

const pricingTiers = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for side projects and early experiments.",
    badge: null,
    features: [
      "Up to 3 projects",
      "5 GB storage",
      "100K API requests/month",
      "Community support",
      "Basic analytics",
      "1 team member",
    ],
    cta: "Start for free",
    highlight: false,
  },
  {
    name: "Growth",
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: "For growing teams shipping production-grade products.",
    badge: "Most Popular",
    features: [
      "Unlimited projects",
      "100 GB storage",
      "10M API requests/month",
      "Priority email support",
      "Advanced analytics",
      "Up to 10 team members",
      "Custom domains",
      "CI/CD integrations",
    ],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "For organisations that need power, security, and compliance.",
    badge: null,
    features: [
      "Everything in Growth",
      "Unlimited storage",
      "Unlimited API requests",
      "Dedicated Slack support",
      "SOC 2 & HIPAA ready",
      "Unlimited team members",
      "SSO / SAML",
      "Custom SLAs",
      "On-prem option available",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

const faqs = [
  {
    q: "How do I get access to the beta?",
    a: "Join the waitlist using your name and email below. We are rolling out access in batches every two weeks. Most waitlist members receive an invite within 30 days.",
  },
  {
    q: "Will pricing change when Nexus leaves beta?",
    a: "Beta users lock in their tier price for the first 12 months post-launch — guaranteed. We will give at least 60 days notice before any pricing change.",
  },
  {
    q: "What tech stack does Nexus run on?",
    a: "Nexus is built on a Rust-based runtime with a globally distributed edge network powered by Anycast routing. The control plane is TypeScript / Next.js, and the inference layer uses our proprietary model fine-tuned on infrastructure ops.",
  },
  {
    q: "How does Nexus handle data security?",
    a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II certified and support bring-your-own-key (BYOK) encryption for Enterprise plans.",
  },
  {
    q: "Can I migrate from my existing platform?",
    a: "Yes. We provide a CLI migration tool that supports importing from Vercel, Railway, Render, Heroku, and bare Kubernetes clusters. Most migrations complete in under 15 minutes.",
  },
  {
    q: "What kind of support is included?",
    a: "Starter has access to community forums and docs. Growth gets priority email with a 24-hour SLA. Enterprise gets a dedicated Slack channel and a named customer success engineer.",
  },
];

// --- Types ---

type BillingCycle = "monthly" | "yearly";
type WaitlistState = "idle" | "loading" | "success" | "error";

interface WaitlistForm {
  name: string;
  email: string;
}

interface WaitlistErrors {
  name?: string;
  email?: string;
}

// --- Main Component ---

export default function StartupLandingTemplate() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [waitlistForm, setWaitlistForm] = useState<WaitlistForm>({ name: "", email: "" });
  const [waitlistErrors, setWaitlistErrors] = useState<WaitlistErrors>({});
  const [waitlistState, setWaitlistState] = useState<WaitlistState>("idle");
  const [successEmail, setSuccessEmail] = useState("");

  function toggleFaq(index: number) {
    setOpenFaq((prev) => (prev === index ? null : index));
  }

  function validateWaitlist(): boolean {
    const errors: WaitlistErrors = {};
    if (!waitlistForm.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!waitlistForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(waitlistForm.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    setWaitlistErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateWaitlist()) return;
    setWaitlistState("loading");
    const submittedEmail = waitlistForm.email.trim();
    setTimeout(() => {
      setSuccessEmail(submittedEmail);
      setWaitlistState("success");
      setWaitlistForm({ name: "", email: "" });
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ─── Fixed Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/templates/startup-landing" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-black">
              N
            </span>
            <span className="text-lg font-bold tracking-tight">Nexus</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-white/50 hover:text-white transition-colors">FAQ</a>
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Docs</a>
          </div>
          <a
            href="#waitlist"
            className="px-5 py-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-violet-600/20"
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-36 pb-28 px-4 md:px-8 relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-[65%] w-[600px] h-[600px] bg-violet-600/18 rounded-full blur-[140px]" />
        <div className="pointer-events-none absolute top-1/2 right-0 w-[440px] h-[440px] bg-cyan-500/10 rounded-full blur-[120px]" />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/10 border border-violet-500/25 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-violet-300 uppercase tracking-widest">Public Beta</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
            The AI platform
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              developers trust
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nexus brings intelligent infrastructure, instant deployments, and AI-powered observability into a single platform — so you can ship with confidence.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-xl shadow-violet-600/30"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              See how it works
            </a>
          </div>

          {/* Metrics */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "10K+", label: "Active devs" },
              { value: "50ms", label: "P99 latency" },
              { value: "99.99%", label: "Uptime SLA" },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {m.value}
                </div>
                <div className="text-xs text-white/30 mt-1 uppercase tracking-wider">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Comparison Table ─── */}
      <section id="features" className="py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Why Nexus</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built different, by design
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-base">
              See exactly how Nexus stacks up against stitching together traditional infrastructure.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="text-left px-6 py-4 text-white/40 font-medium w-1/3">Feature</th>
                  <th className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-violet-300 font-semibold">
                      <span className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-[10px] font-black">N</span>
                      Nexus
                    </span>
                  </th>
                  <th className="px-6 py-4 text-center text-white/30 font-medium">Traditional</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr
                    key={row.name}
                    className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.025] ${
                      i === comparisonFeatures.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                          <row.icon className="w-4 h-4 text-violet-400" />
                        </div>
                        <span className="font-medium text-white/80">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-400" />
                        </span>
                        <span className="text-xs text-emerald-400/80">{row.nexus}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-400" />
                        </span>
                        <span className="text-xs text-white/30">{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-24 px-4 md:px-8 relative">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-white/40 max-w-xl mx-auto text-base mb-8">
              No hidden fees. No surprise bills. Cancel any time.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-1 p-1 bg-white/[0.05] border border-white/[0.08] rounded-full">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                  billingCycle === "monthly"
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-2 ${
                  billingCycle === "yearly"
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                Yearly
                <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-bold">
                  -20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => {
              const price = billingCycle === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl p-7 flex flex-col ${
                    tier.highlight
                      ? "bg-gradient-to-b from-violet-600/20 to-violet-600/5 border border-violet-500/40 shadow-xl shadow-violet-600/10"
                      : "bg-white/[0.03] border border-white/[0.07]"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-bold rounded-full shadow-lg shadow-violet-600/30">
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-5">
                    <p className="text-white font-bold text-lg mb-1">{tier.name}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{tier.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-white">
                        {price === 0 ? "Free" : `$${price}`}
                      </span>
                      {price > 0 && (
                        <span className="text-white/30 text-sm mb-1">/mo</span>
                      )}
                    </div>
                    {billingCycle === "yearly" && price > 0 && (
                      <p className="text-xs text-emerald-400 mt-1">Billed annually</p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-white/60">
                        <Check className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#waitlist"
                    className={`w-full py-3 text-sm font-semibold rounded-xl text-center transition-all ${
                      tier.highlight
                        ? "bg-gradient-to-r from-violet-600 to-violet-500 text-white hover:opacity-90 shadow-lg shadow-violet-600/25"
                        : "bg-white/[0.07] border border-white/[0.1] text-white hover:bg-white/[0.12]"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-colors ${
                    isOpen
                      ? "bg-white/[0.04] border-white/[0.12]"
                      : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-medium text-white/90 text-sm pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-white/40 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Waitlist CTA ─── */}
      <section id="waitlist" className="py-24 px-4 md:px-8 relative">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[400px] bg-violet-600/12 rounded-full blur-[130px]" />
        </div>

        <div className="max-w-xl mx-auto relative">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Get Early Access</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                10,000+ developers
              </span>
              <br />
              on the waitlist
            </h2>
            <p className="text-white/40 text-base leading-relaxed">
              Be first to know when we open the doors. Beta users get 3 months free on any paid plan.
            </p>
          </div>

          {waitlistState === "success" ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.07] px-8 py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-white font-semibold text-lg mb-2">You&apos;re on the list!</p>
              <p className="text-white/50 text-sm">
                We&apos;ll notify you at{" "}
                <span className="text-emerald-400 font-medium">{successEmail}</span> when your
                spot is ready.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleWaitlistSubmit}
              noValidate
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 md:px-8 py-8 space-y-4"
            >
              {/* Name field */}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  value={waitlistForm.name}
                  onChange={(e) => {
                    setWaitlistForm((f) => ({ ...f, name: e.target.value }));
                    if (waitlistErrors.name) setWaitlistErrors((err) => ({ ...err, name: undefined }));
                  }}
                  placeholder="Ada Lovelace"
                  className={`w-full px-4 py-3 bg-white/[0.05] border rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors ${
                    waitlistErrors.name
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-white/[0.1] focus:border-violet-500/60"
                  }`}
                />
                {waitlistErrors.name && (
                  <p className="text-xs text-red-400 mt-1.5">{waitlistErrors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={waitlistForm.email}
                  onChange={(e) => {
                    setWaitlistForm((f) => ({ ...f, email: e.target.value }));
                    if (waitlistErrors.email) setWaitlistErrors((err) => ({ ...err, email: undefined }));
                  }}
                  placeholder="ada@lovelace.dev"
                  className={`w-full px-4 py-3 bg-white/[0.05] border rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors ${
                    waitlistErrors.email
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-white/[0.1] focus:border-violet-500/60"
                  }`}
                />
                {waitlistErrors.email && (
                  <p className="text-xs text-red-400 mt-1.5">{waitlistErrors.email}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={waitlistState === "loading"}
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25"
              >
                {waitlistState === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    Request Access
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-white/20 pt-1">
                No spam, ever. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/[0.05] py-10 px-4 md:px-8 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-[10px] font-black">
                N
              </span>
              <span className="text-sm font-bold">Nexus</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/30">
              <a href="#features" className="hover:text-white/60 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white/60 transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-white/60 transition-colors">FAQ</a>
              <a href="#" className="hover:text-white/60 transition-colors">Docs</a>
              <a href="#" className="hover:text-white/60 transition-colors">Blog</a>
              <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            </div>
            <div className="flex gap-5 text-sm text-white/20">
              <a href="#" className="hover:text-white/50 transition-colors">Twitter / X</a>
              <a href="#" className="hover:text-white/50 transition-colors">GitHub</a>
              <a href="#" className="hover:text-white/50 transition-colors">Discord</a>
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-6 text-center">
            <p className="text-xs text-white/20">
              &copy; 2026 Nexus. Part of{" "}
              <Link href="/templates" className="text-white/30 hover:text-violet-400 transition-colors">
                StyleKit Templates
              </Link>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <TemplateBackButton variant="modern" />
    </div>
  );
}
