"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Zap,
  Lock,
  Cloud,
  BarChart2,
  Users,
  Menu,
  X,
  ChevronRight,
  Star,
  ArrowRight,
  Layers,
  Globe,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

// ─── Shadow constants ──────────────────────────────────────────────────────────
const neuOut = "shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]";
const neuOutLg = "shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]";
const neuIn = "shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]";
const neuSubtle = "shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]";

// ─── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "50,000+", label: "Active Teams" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9 / 5", label: "User Rating" },
  { value: "120+", label: "Countries" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Real-Time Collaboration",
    shortDesc: "Work together, seamlessly.",
    detail:
      "SoftFlow's live collaboration engine lets every team member see changes the moment they happen. Cursors, edits, and comments sync in under 50 ms — so your team stays perfectly aligned, whether they're in the same office or across twelve time zones.",
  },
  {
    icon: BarChart2,
    title: "Intelligent Analytics",
    shortDesc: "Decisions backed by data.",
    detail:
      "Get actionable insight into sprint velocity, blockers, and team workload with our built-in analytics dashboard. Custom reports, exportable charts, and AI-powered forecasting help you ship on time, every time.",
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Security",
    shortDesc: "Your data, always safe.",
    detail:
      "End-to-end encryption, SOC 2 Type II compliance, SSO/SAML support, and fine-grained permission controls keep your most sensitive projects protected. Regular third-party audits and a dedicated security team have you covered.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync & Offline Mode",
    shortDesc: "Access anywhere, anytime.",
    detail:
      "A global CDN ensures lightning-fast load times regardless of location. Our offline-first architecture means your team keeps working even without internet — every change is queued and synced automatically once reconnected.",
  },
];

const PRICING = [
  {
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 37,
    description: "Perfect for individuals and small teams getting started.",
    features: [
      "Up to 5 projects",
      "2 GB storage",
      "Basic analytics",
      "Community support",
      "Mobile app access",
    ],
    highlighted: false,
    cta: "Get started free",
  },
  {
    name: "Pro",
    monthlyPrice: 149,
    yearlyPrice: 112,
    description: "For growing teams that need advanced tools and integrations.",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Team collaboration",
      "Custom workflows",
    ],
    highlighted: true,
    cta: "Start Pro trial",
  },
  {
    name: "Enterprise",
    monthlyPrice: 499,
    yearlyPrice: 374,
    description: "Full power for large organizations with custom requirements.",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated account manager",
      "SLA guarantee",
      "Private deployment",
      "SSO / SAML",
      "Audit logs",
    ],
    highlighted: false,
    cta: "Contact sales",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "SoftFlow completely changed how our engineering team handles sprint planning. The real-time collaboration alone saved us at least three hours of sync meetings every week. I can't imagine going back to our old tools.",
    author: "Zhang Mingyuan",
    role: "CTO",
    company: "TechStart",
    rating: 5,
  },
  {
    quote:
      "We evaluated six project management platforms before choosing SoftFlow. The neumorphic UI looks stunning in demos, but what sold us was the depth of the analytics. Our product leads now have the data they need to make confident decisions.",
    author: "Li Siran",
    role: "Head of Product",
    company: "DesignCo",
    rating: 5,
  },
  {
    quote:
      "Migrating a 200-person organization to a new tool is never easy, but the SoftFlow team made it painless. Onboarding, SSO setup, and custom workflow configuration were handled in under a week. Exceptional support.",
    author: "Maria Reyes",
    role: "VP Engineering",
    company: "Globex Systems",
    rating: 5,
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function NeumorphismLandingTemplate() {
  // Navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pricing
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  // Feature tabs
  const [activeFeature, setActiveFeature] = useState(0);

  // Testimonial tabs
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Contact form
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "" });
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success"
  >("idle");

  // ── Handlers ─────────────────────────────────────────────────────────────────
  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = { name: "", email: "" };
    let valid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
      valid = false;
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }

    setFormErrors(errors);
    if (!valid) return;

    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState("success");
    }, 1400);
  }

  // ── Derived values ────────────────────────────────────────────────────────────
  const currentPlan = FEATURES[activeFeature];
  const currentTestimonial = TESTIMONIALS[activeTestimonial];

  return (
    <div className="min-h-screen bg-[#e0e5ec] text-gray-700">
      {/* ── Navigation ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#e0e5ec] pt-4 pb-2 px-4 md:px-8">
        <div
          className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl ${neuOut}`}
        >
          {/* Logo */}
          <Link
            href="/templates/neumorphism-landing"
            className="flex items-center gap-2 text-xl font-bold text-gray-800 select-none"
          >
            <div
              className={`w-8 h-8 rounded-lg ${neuIn} flex items-center justify-center`}
            >
              <Layers className="w-4 h-4 text-indigo-600" />
            </div>
            SoftFlow
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium text-gray-600 ${neuSubtle} hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] active:${neuIn} transition-all duration-200`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className={`px-4 py-2 rounded-xl text-sm font-medium text-gray-600 ${neuSubtle} transition-all duration-200`}
            >
              Sign in
            </button>
            <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] transition-all duration-200">
              Start free
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center ${neuSubtle} transition-all duration-200`}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden max-w-6xl mx-auto mt-2 p-4 rounded-2xl ${neuOut} flex flex-col gap-2`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium text-gray-600 ${neuSubtle} transition-all duration-200`}
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-gray-300/50 my-1" />
            <button className="px-4 py-3 rounded-xl text-sm font-semibold bg-indigo-600 text-white shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] transition-all duration-200">
              Start free
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${neuIn} mb-8`}
          >
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-600 tracking-wide uppercase">
              Now with AI-powered forecasting
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight tracking-tight">
            Project management
            <br />
            <span className="text-indigo-600">built to feel good.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            SoftFlow combines the calm clarity of neumorphic design with
            powerful productivity tools. Your team works better when the tools
            get out of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-semibold shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_6px_rgba(79,70,229,0.4)] transition-all duration-200">
              Start for free
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-gray-700 font-semibold ${neuOut} hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] transition-all duration-200`}
            >
              Watch demo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hero card */}
          <div className={`p-6 rounded-3xl ${neuOutLg}`}>
            <div className={`rounded-2xl ${neuIn} p-8`}>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: Layers, label: "Projects" },
                  { icon: Users, label: "Teams" },
                  { icon: BarChart2, label: "Reports" },
                  { icon: Globe, label: "Global" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className={`flex flex-col items-center gap-2 w-28 py-6 rounded-2xl ${neuOut} cursor-default`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${neuIn} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────────────── */}
      <section className="py-10 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center py-8 px-4 rounded-2xl ${neuOut} text-center`}
              >
                <span className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features (Tabbed) ──────────────────────────────────────────────────── */}
      <section id="features" className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Features
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              Everything your team needs
            </h2>
          </div>

          {/* Tab buttons */}
          <div
            className={`flex flex-wrap gap-3 justify-center p-3 rounded-2xl ${neuIn} mb-8`}
          >
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;
              return (
                <button
                  key={feature.title}
                  onClick={() => setActiveFeature(index)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `${neuOut} text-indigo-600 bg-[#e0e5ec]`
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{feature.title}</span>
                  <span className="sm:hidden">{feature.shortDesc}</span>
                </button>
              );
            })}
          </div>

          {/* Active feature card */}
          <div className={`p-8 md:p-10 rounded-3xl ${neuOutLg} transition-all duration-300`}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div
                className={`w-16 h-16 shrink-0 rounded-2xl ${neuIn} flex items-center justify-center`}
              >
                {(() => {
                  const Icon = currentPlan.icon;
                  return <Icon className="w-7 h-7 text-indigo-600" />;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {currentPlan.title}
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-2xl">
                  {currentPlan.detail}
                </p>
                <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:gap-3 transition-all duration-200">
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Feature grid teasers */}
          <div className="grid md:grid-cols-4 gap-5 mt-6">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;
              return (
                <button
                  key={feature.title}
                  onClick={() => setActiveFeature(index)}
                  className={`text-left p-5 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? `${neuIn} cursor-default`
                      : `${neuSubtle} hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff]`
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${
                      isActive ? neuOut : neuIn
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-gray-400"}`}
                    />
                  </div>
                  <p
                    className={`text-xs font-semibold ${isActive ? "text-indigo-600" : "text-gray-500"}`}
                  >
                    {feature.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Pricing
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-500">
              No hidden fees. Cancel anytime.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span
                className={`text-sm font-medium ${
                  billingCycle === "monthly" ? "text-gray-800" : "text-gray-400"
                }`}
              >
                Monthly
              </span>

              {/* Neumorphic toggle pill */}
              <button
                role="switch"
                aria-checked={billingCycle === "yearly"}
                onClick={() =>
                  setBillingCycle((c) =>
                    c === "monthly" ? "yearly" : "monthly"
                  )
                }
                className={`relative w-16 h-8 rounded-full transition-all duration-300 ${neuIn} focus:outline-none`}
              >
                <span
                  className={`absolute top-1 w-6 h-6 rounded-full bg-indigo-600 transition-all duration-300 ${neuOut} ${
                    billingCycle === "yearly" ? "left-9" : "left-1"
                  }`}
                />
              </button>

              <span
                className={`text-sm font-medium ${
                  billingCycle === "yearly" ? "text-gray-800" : "text-gray-400"
                }`}
              >
                Yearly
              </span>

              {billingCycle === "yearly" && (
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                  Save 25%
                </span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((plan) => {
              const price =
                billingCycle === "monthly"
                  ? plan.monthlyPrice
                  : plan.yearlyPrice;

              return (
                <div
                  key={plan.name}
                  className={`relative p-8 rounded-3xl transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-indigo-600 shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]"
                      : `bg-[#e0e5ec] ${neuOut}`
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-white text-indigo-600 text-xs font-bold shadow-md">
                        Most popular
                      </span>
                    </div>
                  )}

                  <h3
                    className={`text-lg font-bold mb-1 ${
                      plan.highlighted ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-6 ${
                      plan.highlighted ? "text-indigo-200" : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-5xl font-bold leading-none ${
                          plan.highlighted ? "text-white" : "text-gray-800"
                        }`}
                      >
                        ¥{price}
                      </span>
                      <span
                        className={`text-sm mb-1 ${
                          plan.highlighted ? "text-indigo-200" : "text-gray-400"
                        }`}
                      >
                        /mo
                      </span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p
                        className={`text-xs mt-1 ${
                          plan.highlighted ? "text-indigo-200" : "text-gray-400"
                        }`}
                      >
                        Billed annually · was ¥{plan.monthlyPrice}/mo
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            plan.highlighted
                              ? "text-indigo-200"
                              : "text-indigo-600"
                          }`}
                        />
                        <span
                          className={
                            plan.highlighted ? "text-indigo-100" : "text-gray-600"
                          }
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      plan.highlighted
                        ? "bg-white text-indigo-600 shadow-[4px_4px_8px_rgba(55,48,163,0.25),-4px_-4px_8px_rgba(129,120,255,0.15)] hover:shadow-[2px_2px_4px_rgba(55,48,163,0.25),-2px_-2px_4px_rgba(129,120,255,0.15)]"
                        : `text-gray-700 ${neuOut} hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] active:${neuIn}`
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials (Tabbed) ──────────────────────────────────────────────── */}
      <section id="testimonials" className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Testimonials
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              Loved by teams worldwide
            </h2>
          </div>

          {/* Testimonial display */}
          <div className={`p-8 md:p-12 rounded-3xl ${neuOutLg} mb-6`}>
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-indigo-500 fill-indigo-500"
                />
              ))}
            </div>

            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic mb-8">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              {/* Avatar placeholder */}
              <div
                className={`w-12 h-12 rounded-full ${neuIn} flex items-center justify-center shrink-0`}
              >
                <span className="text-sm font-bold text-indigo-600">
                  {currentTestimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {currentTestimonial.author}
                </p>
                <p className="text-xs text-gray-500">
                  {currentTestimonial.role} · {currentTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Tab selector pill */}
          <div
            className={`flex justify-center gap-3 p-3 rounded-2xl ${neuIn}`}
          >
            {TESTIMONIALS.map((t, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTestimonial === index
                    ? `${neuOut} text-indigo-600 bg-[#e0e5ec]`
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t.author.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Newsletter ───────────────────────────────────────────────── */}
      <section id="contact" className="py-16 md:py-24 px-6 md:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">
              Get started
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              14 days free. No card required.
            </h2>
            <p className="text-gray-500">
              Join 50,000+ teams already using SoftFlow to ship faster.
            </p>
          </div>

          {submitState === "success" ? (
            /* Success card */
            <div
              className={`p-10 rounded-3xl ${neuOutLg} text-center`}
            >
              <div
                className={`w-16 h-16 mx-auto rounded-2xl ${neuIn} flex items-center justify-center mb-6`}
              >
                <Check className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                You&apos;re on the list!
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                We&apos;ve sent a confirmation to{" "}
                <span className="font-semibold text-gray-700">
                  {formData.email}
                </span>
                . Check your inbox to activate your free trial.
              </p>
              <button
                onClick={() => {
                  setSubmitState("idle");
                  setFormData({ name: "", email: "" });
                }}
                className={`mt-6 px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 ${neuSubtle} hover:shadow-[2px_2px_4px_#b8bcc2,-2px_-2px_4px_#ffffff] transition-all duration-200`}
              >
                Start over
              </button>
            </div>
          ) : (
            /* Form card */
            <form
              onSubmit={handleFormSubmit}
              noValidate
              className={`p-8 md:p-10 rounded-3xl ${neuOutLg}`}
            >
              <div className="space-y-5">
                {/* Name field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Jane Smith"
                    className={`w-full px-5 py-3.5 rounded-xl bg-[#e0e5ec] text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none transition-shadow duration-200 ${
                      formErrors.name
                        ? "shadow-[inset_4px_4px_8px_#f0b8b8,inset_-4px_-4px_8px_#ffd4d4]"
                        : neuIn
                    }`}
                    aria-describedby={
                      formErrors.name ? "name-error" : undefined
                    }
                  />
                  {formErrors.name && (
                    <p
                      id="name-error"
                      className="mt-1.5 text-xs text-red-500 font-medium"
                    >
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="jane@company.com"
                    className={`w-full px-5 py-3.5 rounded-xl bg-[#e0e5ec] text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none transition-shadow duration-200 ${
                      formErrors.email
                        ? "shadow-[inset_4px_4px_8px_#f0b8b8,inset_-4px_-4px_8px_#ffd4d4]"
                        : neuIn
                    }`}
                    aria-describedby={
                      formErrors.email ? "email-error" : undefined
                    }
                  />
                  {formErrors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 text-xs text-red-500 font-medium"
                    >
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    submitState === "loading"
                      ? `${neuIn} text-gray-400 cursor-not-allowed`
                      : "bg-indigo-600 text-white shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] active:shadow-[inset_2px_2px_6px_rgba(79,70,229,0.4)]"
                  }`}
                >
                  {submitState === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      Creating your account...
                    </span>
                  ) : (
                    "Start your free trial"
                  )}
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-gray-400">
                By signing up you agree to our{" "}
                <a href="#" className="underline hover:text-gray-600">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-gray-600">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 md:px-8 border-t border-gray-300/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg ${neuIn} flex items-center justify-center`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <span className="font-bold text-gray-700">SoftFlow</span>
            <span className="text-gray-400 text-sm ml-2">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          <p className="text-sm text-gray-400">
            Part of{" "}
            <Link
              href="/templates"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              StyleKit Templates
            </Link>
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            {["Privacy", "Terms", "Security", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-gray-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <TemplateBackButton variant="neumorphic" />
    </div>
  );
}
