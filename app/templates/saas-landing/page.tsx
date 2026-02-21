"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Loader2,
  Lock,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Sub-millisecond response times with global CDN acceleration and edge caching.",
    color: "bg-blue-500",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    desc: "SOC 2 compliant, end-to-end encryption, and fine-grained permission controls.",
    color: "bg-emerald-500",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    desc: "Auto-scaling infrastructure, zero ops overhead, and 99.99% SLA guaranteed.",
    color: "bg-violet-500",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Live dashboards, custom reports, and AI-driven insights for smarter decisions.",
    color: "bg-amber-500",
  },
];

type Plan = {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  desc: string;
  features: string[];
  popular: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 23,
    desc: "Perfect for small teams getting started",
    features: ["5 team members", "10GB storage", "Basic analytics", "Email support"],
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 79,
    yearlyPrice: 63,
    desc: "Built for growing teams that need more",
    features: [
      "25 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom domains",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    yearlyPrice: 159,
    desc: "For large organizations at scale",
    features: [
      "Unlimited members",
      "Unlimited storage",
      "Full analytics suite",
      "Dedicated account manager",
      "SLA guarantee",
      "Private deployment",
    ],
    popular: false,
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechCorp",
    text: "After migrating to this platform our development velocity tripled. The API design is elegant and the documentation is comprehensive.",
    avatar: "SC",
  },
  {
    name: "Alex Kim",
    role: "VP Engineering, DataFlow",
    text: "Stability and performance far exceeded our expectations. The support team responds fast and has a near 100% resolution rate.",
    avatar: "AK",
  },
  {
    name: "Maria Lopez",
    role: "Lead Developer, Startup.io",
    text: "As an early-stage team, we need rapid iteration. This tool lets us focus on the product rather than infrastructure.",
    avatar: "ML",
  },
];

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "How does the free trial work?",
    answer:
      "You get 14 days of full access to all Pro features — no credit card required. At the end of the trial you can choose a plan or your account moves to a read-only state until you decide.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes, absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately and we prorate the billing so you only pay for what you use.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover) as well as PayPal. Enterprise customers can also pay via bank transfer or invoice.",
  },
  {
    question: "Is there a discount for larger teams?",
    answer:
      "Yes. Teams with 5 or more seats automatically receive a 15% discount on top of any existing plan pricing. Contact our sales team to set up a custom arrangement for very large organizations.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely — no lock-in, no cancellation fees. Cancel from your account dashboard at any time. You retain access until the end of your current billing period and we never charge you again.",
  },
];

type WaitlistState = "idle" | "loading" | "success";
type BillingCycle = "monthly" | "yearly";

export default function SaasLandingTemplate() {
  // Nav
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero waitlist form
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistError, setWaitlistError] = useState("");
  const [waitlistState, setWaitlistState] = useState<WaitlistState>("idle");

  // Pricing billing toggle
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  // Testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Waitlist handlers
  function handleWaitlistSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!waitlistEmail.includes("@")) {
      setWaitlistError("Please enter a valid email address.");
      return;
    }
    setWaitlistError("");
    setWaitlistState("loading");
    setTimeout(() => {
      setWaitlistState("success");
    }, 1400);
  }

  // Testimonial carousel handlers
  function prevTestimonial() {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }

  function nextTestimonial() {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }

  // FAQ toggle
  function toggleFaq(index: number) {
    setOpenFaq((prev) => (prev === index ? null : index));
  }

  // Price display helper
  function getDisplayPrice(plan: Plan): string {
    const price =
      billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    return `$${price}`;
  }

  function getOriginalPrice(plan: Plan): string {
    return `$${plan.monthlyPrice}`;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/templates/saas-landing"
            className="text-xl font-bold text-gray-900"
          >
            <span className="text-blue-600">Saas</span>Kit
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              FAQ
            </a>
            <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shadow-sm">
              Get Started
            </button>
          </div>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
            <a
              href="#features"
              className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="pt-2">
              <button className="w-full px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm text-blue-700 font-medium">
              v3.0 -- New Release
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Build faster,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              ship smarter
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            The all-in-one platform for modern teams. Streamline your workflow,
            automate deployments, and scale with confidence.
          </p>

          {/* Waitlist form */}
          <div className="max-w-md mx-auto mb-6">
            {waitlistState === "success" ? (
              <div className="flex items-center justify-center gap-3 py-4 px-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-sm font-medium text-emerald-700">
                  You are on the list. We will be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleWaitlistSubmit}
                noValidate
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={waitlistEmail}
                    onChange={(e) => {
                      setWaitlistEmail(e.target.value);
                      if (waitlistError) setWaitlistError("");
                    }}
                    placeholder="Enter your work email"
                    disabled={waitlistState === "loading"}
                    className={`w-full px-4 py-3 text-sm border rounded-xl outline-none transition-all ${
                      waitlistError
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    } disabled:opacity-60`}
                  />
                  {waitlistError && (
                    <p className="mt-1.5 text-xs text-red-500 text-left">
                      {waitlistError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={waitlistState === "loading"}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-blue-600/25 disabled:opacity-70 flex items-center justify-center gap-2 shrink-0"
                >
                  {waitlistState === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
              Start Free Trial
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
            <button className="px-8 py-4 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors">
              Book a Demo
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            No credit card required. 14-day free trial included.
          </p>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <p className="text-center text-sm text-gray-400 mb-8">
            Trusted by 1,000+ companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {["TechCorp", "DataFlow", "CloudBase", "ScaleUp", "DevOps.io"].map(
              (name) => (
                <span
                  key={name}
                  className="text-lg font-bold text-gray-300 tracking-tight"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to scale
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Powerful features designed for modern development teams who move fast.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg transition-all group"
              >
                <div
                  className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-500 mb-8">
              No hidden fees. Cancel anytime.
            </p>

            {/* Billing cycle toggle */}
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  billingCycle === "monthly"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                  billingCycle === "yearly"
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Yearly
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    billingCycle === "yearly"
                      ? "bg-emerald-500 text-white"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  20% off
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl relative ${
                  plan.popular
                    ? "bg-gradient-to-b from-blue-600 to-violet-600 text-white ring-4 ring-blue-600/20 scale-105 shadow-xl"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block text-xs font-semibold bg-white/20 px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.popular ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {plan.desc}
                </p>

                {/* Price display */}
                <div className="mb-6">
                  {billingCycle === "yearly" ? (
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold">
                        {getDisplayPrice(plan)}
                      </span>
                      <div className="pb-1">
                        <span
                          className={`text-lg font-normal ${
                            plan.popular ? "text-blue-100" : "text-gray-400"
                          }`}
                        >
                          /mo
                        </span>
                        <div
                          className={`text-sm line-through ${
                            plan.popular ? "text-blue-200" : "text-gray-400"
                          }`}
                        >
                          {getOriginalPrice(plan)}/mo
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-4xl font-bold">
                      {getDisplayPrice(plan)}
                      <span
                        className={`text-lg font-normal ${
                          plan.popular ? "text-blue-100" : "text-gray-400"
                        }`}
                      >
                        /mo
                      </span>
                    </div>
                  )}
                  {billingCycle === "yearly" && (
                    <p
                      className={`text-xs mt-1 ${
                        plan.popular ? "text-blue-100" : "text-emerald-600"
                      }`}
                    >
                      Billed yearly — save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/yr
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 shrink-0 ${
                          plan.popular ? "text-blue-200" : "text-blue-600"
                        }`}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-blue-50 shadow-sm"
                      : "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 shadow-sm"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by teams everywhere
            </h2>
            <p className="text-gray-500">
              See what engineering leaders say about SaasKit.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${activeTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((t, index) => (
                  <div
                    key={t.name}
                    className="min-w-full px-2"
                    aria-hidden={index !== activeTestimonial}
                  >
                    <div className="p-10 bg-gray-50 border border-gray-100 rounded-2xl text-center">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-6">
                        {t.avatar}
                      </div>
                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-amber-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {t.name}
                        </div>
                        <div className="text-sm text-gray-400">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prev / Next arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`transition-all rounded-full ${
                  index === activeTestimonial
                    ? "w-6 h-2.5 bg-blue-600"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently asked questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    openFaq === index ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of teams already using SaasKit to ship faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
              Start Your Free Trial
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
            <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              Talk to Sales
            </button>
          </div>
          <p className="mt-4 text-sm text-blue-200">
            14-day free trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-gray-900 mb-2">
                <span className="text-blue-600">Saas</span>Kit
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                The all-in-one platform for modern teams. Ship faster with confidence.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold text-gray-700 mb-3">Product</p>
                <div className="space-y-2">
                  <a href="#features" className="block text-gray-400 hover:text-gray-600 transition-colors">Features</a>
                  <a href="#pricing" className="block text-gray-400 hover:text-gray-600 transition-colors">Pricing</a>
                  <a href="#faq" className="block text-gray-400 hover:text-gray-600 transition-colors">FAQ</a>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-3">Company</p>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-400 hover:text-gray-600 transition-colors">About</a>
                  <a href="#" className="block text-gray-400 hover:text-gray-600 transition-colors">Blog</a>
                  <a href="#" className="block text-gray-400 hover:text-gray-600 transition-colors">Careers</a>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-3">Connect</p>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-400 hover:text-gray-600 transition-colors">Twitter</a>
                  <a href="#" className="block text-gray-400 hover:text-gray-600 transition-colors">GitHub</a>
                  <a href="#" className="block text-gray-400 hover:text-gray-600 transition-colors">Discord</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              Copyright 2025 SaasKit. Part of{" "}
              <Link
                href="/templates"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                StyleKit Templates
              </Link>
            </p>
            <p className="text-sm text-gray-400">
              Privacy Policy &middot; Terms of Service
            </p>
          </div>
        </div>
      </footer>

      <TemplateBackButton variant="modern" />
    </div>
  );
}
