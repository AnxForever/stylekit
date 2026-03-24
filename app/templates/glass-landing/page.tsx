"use client";

export const dynamic = "force-static";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Layers,
  Users,
  Clock,
  Download,
  Moon,
  Package,
  Check,
  Menu,
  X,
  Zap,
  Star,
  ArrowRight,
  Mail,
  User,
  ChevronDown,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BillingCycle = "monthly" | "yearly";
type SubmitState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const FEATURES = [
  {
    icon: Layers,
    title: "Smart Templates",
    description:
      "Kickstart any project with intelligent, context-aware templates that adapt to your design language and brand guidelines automatically.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Invite your team, leave comments, and co-edit designs simultaneously. See every cursor, every change, in real time — no refresh required.",
  },
  {
    icon: Clock,
    title: "Version History",
    description:
      "Every save is a checkpoint. Revert to any previous state with a single click, compare versions side by side, and ship with confidence.",
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description:
      "Output production-ready assets in SVG, PNG, WebP, or PDF. Generate CSS variables, design tokens, and Figma-compatible specs in one pass.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Built-in dark mode support for every component. Toggle at design time, preview both palettes instantly, and ship accessible interfaces.",
  },
  {
    icon: Package,
    title: "Component Library",
    description:
      "400+ polished, accessible components — from atoms to full-page layouts. Customise once, propagate everywhere through linked styles.",
  },
];

const PRICING_TIERS = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Everything you need to get started.",
    badge: null,
    features: [
      "3 active projects",
      "10 smart templates",
      "Community components",
      "PNG & SVG export",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    monthlyPrice: 19,
    yearlyPrice: 15,
    description: "For designers who ship every day.",
    badge: "Most Popular",
    features: [
      "Unlimited projects",
      "All smart templates",
      "Real-time collaboration (5 seats)",
      "Version history (90 days)",
      "All export formats + design tokens",
    ],
    cta: "Start Pro trial",
    highlight: true,
  },
  {
    name: "Team",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Scale design ops across your org.",
    badge: null,
    features: [
      "Unlimited projects & seats",
      "Custom component libraries",
      "Version history (unlimited)",
      "SSO & admin controls",
      "Priority support & SLA",
    ],
    cta: "Talk to sales",
    highlight: false,
  },
];

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}

function GradientOrb({
  className = "",
  color = "from-indigo-500 to-purple-600",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`absolute rounded-full bg-gradient-to-br ${color} blur-3xl opacity-30 pointer-events-none ${className}`}
    />
  );
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6 py-4">
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 ${
          scrolled
            ? "bg-white/15 backdrop-blur-2xl border border-white/25 shadow-2xl shadow-black/10"
            : "bg-white/10 backdrop-blur-xl border border-white/20"
        } rounded-2xl px-5 py-3 flex items-center justify-between`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/40 to-white/10 border border-white/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Aura
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Sign in
          </a>
          <a
            href="#contact"
            className="px-4 py-2 bg-white text-purple-700 font-semibold rounded-full text-sm hover:bg-white/90 transition-colors duration-200 shadow-lg shadow-white/10"
          >
            Get started
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <hr className="border-white/10" />
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="w-full text-center py-2.5 bg-white text-purple-700 font-semibold rounded-full text-sm hover:bg-white/90 transition-colors"
          >
            Get started free
          </a>
        </div>
      )}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section className="relative pt-44 pb-28 px-6 overflow-hidden">
      {/* Animated gradient orbs */}
      <GradientOrb
        className="w-[600px] h-[600px] -top-40 -left-40"
        color="from-indigo-500 to-purple-700"
      />
      <GradientOrb
        className="w-[500px] h-[500px] top-20 -right-32"
        color="from-pink-500 to-rose-600"
      />
      <GradientOrb
        className="w-[350px] h-[350px] bottom-0 left-1/2 -translate-x-1/2"
        color="from-violet-500 to-indigo-500"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
          <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          <span className="text-white/80 text-sm font-medium">
            Now in public beta — join 12,000+ designers
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.08] tracking-tight">
          Design faster.
          <br />
          <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
            Ship with clarity.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-10 leading-relaxed">
          Aura is the collaborative design tool that bridges the gap between
          imagination and production. Sketch, prototype, and hand off — all in
          one glassmorphic workspace.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-full hover:bg-white/90 transition-all duration-200 shadow-xl shadow-white/10 hover:shadow-white/20 hover:scale-[1.02]"
          >
            Start for free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold rounded-full hover:bg-white/25 transition-all duration-200"
          >
            See how it works
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* Social proof strip */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {[
            { value: "12K+", label: "Designers" },
            { value: "98%", label: "Satisfaction" },
            { value: "400+", label: "Components" },
            { value: "4.9", label: "App Store rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

function Features() {
  return (
    <section id="features" className="py-24 px-6 relative">
      <GradientOrb
        className="w-[400px] h-[400px] top-0 right-0 opacity-20"
        color="from-purple-500 to-pink-600"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-pink-300 uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Everything your team needs
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Aura packs a professional-grade toolset into an interface so clean
            it gets out of your way.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <GlassCard
                key={feature.title}
                className="p-8 hover:-translate-y-1.5 hover:bg-white/15 transition-all duration-300 cursor-default group"
              >
                <div className="w-12 h-12 mb-5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <section id="pricing" className="py-24 px-6 relative">
      <GradientOrb
        className="w-[500px] h-[500px] bottom-0 left-0"
        color="from-indigo-600 to-violet-700"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-indigo-300 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Simple, honest pricing
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            No hidden fees. Cancel or downgrade any time.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={`text-sm font-medium transition-colors ${
              billingCycle === "monthly" ? "text-white" : "text-white/50"
            }`}
          >
            Monthly
          </span>

          <button
            type="button"
            onClick={() =>
              setBillingCycle((c) => (c === "monthly" ? "yearly" : "monthly"))
            }
            className={`relative w-12 h-6 rounded-full border transition-all duration-300 ${
              billingCycle === "yearly"
                ? "bg-white/30 border-white/40"
                : "bg-white/10 border-white/20"
            }`}
            aria-pressed={billingCycle === "yearly"}
            aria-label="Toggle billing cycle"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

          <span
            className={`text-sm font-medium transition-colors ${
              billingCycle === "yearly" ? "text-white" : "text-white/50"
            }`}
          >
            Yearly
          </span>

          {billingCycle === "yearly" && (
            <span className="px-2.5 py-0.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full animate-pulse">
              20% off
            </span>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const price =
              billingCycle === "monthly"
                ? tier.monthlyPrice
                : tier.yearlyPrice;

            return (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  tier.highlight
                    ? "bg-white/20 backdrop-blur-2xl border-2 border-white/40 shadow-2xl shadow-purple-900/30"
                    : "bg-white/10 backdrop-blur-xl border border-white/20"
                }`}
              >
                {/* Most Popular badge */}
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}

                {/* Tier header */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-white/55 text-sm">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8 flex items-end gap-1">
                  <span className="text-white/60 text-lg font-medium self-start mt-2">
                    $
                  </span>
                  <span className="text-5xl font-extrabold text-white leading-none">
                    {price}
                  </span>
                  {price > 0 && (
                    <span className="text-white/50 text-sm mb-1">
                      / mo
                    </span>
                  )}
                </div>

                {/* Feature list */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-white/75"
                    >
                      <div className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.02] ${
                    tier.highlight
                      ? "bg-white text-purple-700 hover:bg-white/90 shadow-lg"
                      : "bg-white/15 border border-white/25 text-white hover:bg-white/25"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Contact / CTA Form
// ---------------------------------------------------------------------------

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function validate(): FormErrors {
    const errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    return errors;
  }

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear the error for the field being edited
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitState("error");
      return;
    }
    setFormErrors({});
    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState("success");
    }, 1500);
  }

  const buttonLabel =
    submitState === "loading"
      ? "Sending..."
      : submitState === "success"
      ? "Message sent!"
      : "Send message";

  return (
    <section id="contact" className="py-24 px-6 relative">
      <GradientOrb
        className="w-[450px] h-[450px] top-0 right-0"
        color="from-pink-500 to-rose-600"
      />

      <div className="max-w-2xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-rose-300 uppercase tracking-widest mb-3">
            Get in touch
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Start your Aura journey
          </h2>
          <p className="text-white/60 text-lg">
            Drop us a line and our team will reach out within one business day.
          </p>
        </div>

        <GlassCard className="p-8 md:p-10">
          {submitState === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Message sent!
              </h3>
              <p className="text-white/60">
                Thanks, {formData.name.split(" ")[0]}. We will be in touch at{" "}
                <span className="text-white/80 font-medium">{formData.email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name field */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Jane Smith"
                    className={`w-full pl-11 pr-4 py-3.5 bg-white/10 border rounded-2xl text-white placeholder-white/35 focus:outline-none transition-colors duration-200 ${
                      formErrors.name
                        ? "border-red-400/60 focus:border-red-400"
                        : "border-white/20 focus:border-white/40"
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="mt-1.5 text-red-300 text-xs">
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Work email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="jane@company.com"
                    className={`w-full pl-11 pr-4 py-3.5 bg-white/10 border rounded-2xl text-white placeholder-white/35 focus:outline-none transition-colors duration-200 ${
                      formErrors.email
                        ? "border-red-400/60 focus:border-red-400"
                        : "border-white/20 focus:border-white/40"
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1.5 text-red-300 text-xs">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitState === "loading"}
                className="w-full py-4 bg-white text-purple-700 font-bold rounded-2xl hover:bg-white/90 transition-all duration-200 hover:scale-[1.01] disabled:opacity-70 disabled:scale-100 shadow-lg shadow-white/10"
              >
                {buttonLabel}
              </button>

              {submitState === "error" && Object.keys(formErrors).length === 0 && (
                <p className="text-red-300 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </GlassCard>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Cookies", "Security"],
  };

  return (
    <footer id="about" className="py-16 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/40 to-white/10 border border-white/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Aura
              </span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed">
              The design tool built for teams who ship. Fast, collaborative, and
              beautiful by default.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-semibold mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/45 hover:text-white/80 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>
            &copy; {year} Aura Design, Inc. All rights reserved. &middot; Part
            of{" "}
            <Link
              href="/templates"
              className="text-white/60 hover:text-white/80 transition-colors underline underline-offset-2"
            >
              StyleKit Templates
            </Link>
          </p>
          <div className="flex items-center gap-1 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page root
// ---------------------------------------------------------------------------

export default function GlassLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 relative overflow-x-hidden">
      {/* Global ambient orbs */}
      <GradientOrb
        className="w-[800px] h-[800px] -top-60 -left-60 opacity-20"
        color="from-indigo-400 to-blue-600"
      />
      <GradientOrb
        className="w-[600px] h-[600px] top-1/3 -right-48 opacity-15"
        color="from-pink-400 to-fuchsia-600"
      />

      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <ContactForm />
      <Footer />

      <TemplateBackButton variant="glass" />
    </div>
  );
}
