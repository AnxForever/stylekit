"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, HelpCircle, X, Zap } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

// ─── Data ────────────────────────────────────────────────────────────────────

type BillingCycle = "monthly" | "yearly";

interface PlanFeatures {
  projects: string;
  storage: string;
  members: string;
  api: boolean;
  support: string;
  analytics: boolean;
  customDomain: boolean;
  sla: boolean;
}

interface Plan {
  id: string;
  name: string;
  desc: string;
  cta: string;
  badge?: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  yearlyBilled?: number;
  features: PlanFeatures;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    desc: "Perfect for side projects and experiments.",
    cta: "Get Started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: {
      projects: "3",
      storage: "1 GB",
      members: "1",
      api: false,
      support: "Community",
      analytics: false,
      customDomain: false,
      sla: false,
    },
  },
  {
    id: "pro",
    name: "Pro",
    desc: "For growing teams that need more power.",
    cta: "Start Free Trial",
    badge: "Most Popular",
    monthlyPrice: 99,
    yearlyPrice: 79,
    yearlyBilled: 948,
    features: {
      projects: "Unlimited",
      storage: "100 GB",
      members: "10",
      api: true,
      support: "Priority Email",
      analytics: true,
      customDomain: true,
      sla: false,
    },
  },
  {
    id: "business",
    name: "Business",
    desc: "For scaling organizations with advanced needs.",
    cta: "Contact Sales",
    monthlyPrice: 299,
    yearlyPrice: 239,
    yearlyBilled: 2868,
    features: {
      projects: "Unlimited",
      storage: "1 TB",
      members: "50",
      api: true,
      support: "24/7 Dedicated",
      analytics: true,
      customDomain: true,
      sla: true,
    },
  },
];

const featureLabels: { key: keyof PlanFeatures; label: string; tooltip?: string }[] = [
  { key: "projects", label: "Projects" },
  { key: "storage", label: "Storage" },
  { key: "members", label: "Team Members" },
  { key: "api", label: "API Access", tooltip: "Full RESTful API with CRUD operations and webhooks" },
  { key: "support", label: "Support Level" },
  { key: "analytics", label: "Analytics", tooltip: "Detailed usage analytics and exportable reports" },
  { key: "customDomain", label: "Custom Domain" },
  { key: "sla", label: "SLA Guarantee", tooltip: "99.99% uptime with contractual SLA and credits" },
];

const faqs = [
  {
    q: "Can I change plans at any time?",
    a: "Yes, you can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately and are prorated. Downgrades apply at the start of your next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, UnionPay), Alipay, WeChat Pay, and bank transfers for Business and Enterprise plans. All payments are processed securely via Stripe.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, all paid plans come with a 14-day free trial. No credit card is required to start. You will only be billed after the trial ends if you decide to continue.",
  },
  {
    q: "What happens when I exceed my storage limit?",
    a: "We will send you an email notification when you reach 80% of your storage quota. You can either upgrade your plan or remove unused files. We will never automatically delete your data.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 30-day money-back guarantee on all paid plans. If you are not satisfied for any reason within the first 30 days, contact our support team and we will issue a full refund, no questions asked.",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(plan: Plan, cycle: BillingCycle): string {
  if (plan.monthlyPrice === 0) return "¥0";
  const price = cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  return `¥${price}`;
}

function renderFeatureValue(value: string | boolean, highlighted: boolean) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className={`w-4 h-4 ${highlighted ? "text-emerald-400" : "text-emerald-500"}`} />
    ) : (
      <X className={`w-4 h-4 ${highlighted ? "text-gray-600" : "text-gray-300"}`} />
    );
  }
  return (
    <span className={`text-sm font-medium ${highlighted ? "text-white" : "text-gray-900"}`}>
      {value}
    </span>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <span
        className={`text-sm font-medium cursor-pointer select-none transition-colors ${
          cycle === "monthly" ? "text-gray-900" : "text-gray-400"
        }`}
        onClick={() => onChange("monthly")}
      >
        Monthly
      </span>

      <button
        role="switch"
        aria-checked={cycle === "yearly"}
        onClick={() => onChange(cycle === "monthly" ? "yearly" : "monthly")}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
          cycle === "yearly" ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
            cycle === "yearly" ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>

      <span
        className={`text-sm font-medium cursor-pointer select-none transition-colors ${
          cycle === "yearly" ? "text-gray-900" : "text-gray-400"
        }`}
        onClick={() => onChange("yearly")}
      >
        Yearly
      </span>

      {cycle === "yearly" && (
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
          <Zap className="w-3 h-3" />
          Save 20%
        </span>
      )}
    </div>
  );
}

function PlanCard({
  plan,
  cycle,
  isSelected,
  onSelect,
}: {
  plan: Plan;
  cycle: BillingCycle;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const highlighted = isSelected;
  const price = formatPrice(plan, cycle);
  const isFree = plan.monthlyPrice === 0;

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
        highlighted
          ? "bg-gray-900 text-white shadow-2xl scale-[1.03] ring-4 ring-gray-900/20"
          : "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-md"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 text-xs font-semibold bg-emerald-500 text-white px-3 py-1 rounded-full shadow-sm">
          {plan.badge}
        </span>
      )}

      {/* Plan name + desc */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
        <p className={`text-sm leading-relaxed ${highlighted ? "text-gray-400" : "text-gray-500"}`}>
          {plan.desc}
        </p>
      </div>

      {/* Price */}
      <div className="mb-2">
        <div className="flex items-end gap-1">
          <span className="text-5xl font-extrabold tracking-tight">{price}</span>
          {!isFree && (
            <span className={`text-sm pb-1.5 ${highlighted ? "text-gray-400" : "text-gray-500"}`}>
              /mo
            </span>
          )}
          {isFree && (
            <span className={`text-sm pb-1.5 ${highlighted ? "text-gray-400" : "text-gray-500"}`}>
              forever
            </span>
          )}
        </div>
        {/* Yearly billing note */}
        {cycle === "yearly" && plan.yearlyBilled && (
          <p className={`text-xs mt-1 ${highlighted ? "text-gray-500" : "text-gray-400"}`}>
            Billed ¥{plan.yearlyBilled.toLocaleString()}/year
          </p>
        )}
        {cycle === "monthly" && !isFree && (
          <p className={`text-xs mt-1 ${highlighted ? "text-gray-700" : "text-gray-300"}`}>
            &nbsp;
          </p>
        )}
      </div>

      {/* CTA Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`w-full mt-6 mb-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
          highlighted
            ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/30"
            : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md"
        }`}
      >
        {plan.cta}
      </button>

      {/* Feature list */}
      <ul className="space-y-3">
        {featureLabels.map((feat) => {
          const value = plan.features[feat.key];
          return (
            <li key={feat.key} className="flex items-center justify-between gap-4 text-sm">
              <span className={highlighted ? "text-gray-400" : "text-gray-600"}>{feat.label}</span>
              <span className="flex-shrink-0 inline-flex justify-center">
                {renderFeatureValue(value, highlighted)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ComparisonTable({
  plans: planList,
  selectedPlan,
}: {
  plans: Plan[];
  selectedPlan: string;
}) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-500 w-1/3">
              Feature
            </th>
            {planList.map((plan) => (
              <th
                key={plan.id}
                className={`text-center py-4 px-6 text-sm font-bold transition-colors ${
                  plan.id === selectedPlan ? "text-emerald-600" : "text-gray-900"
                }`}
              >
                {plan.name}
                {plan.id === selectedPlan && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 align-middle" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureLabels.map((feat) => (
            <tr
              key={feat.key}
              onMouseEnter={() => setHoveredRow(feat.key)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`border-b border-gray-100 last:border-0 transition-colors duration-150 ${
                hoveredRow === feat.key ? "bg-emerald-50/60" : "bg-white"
              }`}
            >
              <td className="py-3.5 px-6">
                <span className="flex items-center gap-1.5 text-sm text-gray-700">
                  {feat.label}
                  {feat.tooltip && (
                    <span className="group relative inline-flex">
                      <HelpCircle className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 cursor-help transition-colors" />
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg bg-gray-900 text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 text-center leading-relaxed shadow-lg">
                        {feat.tooltip}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                      </span>
                    </span>
                  )}
                </span>
              </td>
              {planList.map((plan) => {
                const value = plan.features[feat.key];
                return (
                  <td
                    key={plan.id}
                    className={`text-center py-3.5 px-6 transition-colors ${
                      plan.id === selectedPlan ? "font-medium" : ""
                    }`}
                  >
                    <span className="inline-flex justify-center">
                      {renderFeatureValue(value, false)}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqAccordion({ items }: { items: typeof faqs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
              isOpen ? "border-emerald-200 bg-white shadow-sm" : "border-gray-200 bg-white"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className={`font-semibold text-sm leading-snug ${isOpen ? "text-emerald-700" : "text-gray-900"}`}>
                {item.q}
              </span>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-emerald-500" : ""
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PricingPageTemplate() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">

      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/templates/pricing-page" className="text-xl font-bold tracking-tight">
            StyleKit
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <a href="#plans" className="hover:text-gray-900 transition-colors">Plans</a>
            <a href="#compare" className="hover:text-gray-900 transition-colors">Compare</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </nav>
          <Link
            href="/templates"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Back to Templates
          </Link>
        </div>
      </nav>

      {/* Hero / Header */}
      <section className="py-20 md:py-28 px-4 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            Pricing
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-5">
            Simple, transparent{" "}
            <span className="text-emerald-500">pricing.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            No hidden fees. No surprise charges. Choose the plan that grows with you and cancel
            anytime.
          </p>

          {/* Billing toggle */}
          <BillingToggle cycle={billingCycle} onChange={setBillingCycle} />
        </div>
      </section>

      {/* Plan Cards */}
      <section id="plans" className="px-4 md:px-8 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              cycle={billingCycle}
              isSelected={selectedPlan === plan.id}
              onSelect={() => setSelectedPlan(plan.id)}
            />
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          Click a plan card to select it. All paid plans include a 14-day free trial.
        </p>
      </section>

      {/* Trust strip */}
      <section className="bg-gray-50 border-y border-gray-100 py-10 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          {[
            { stat: "10,000+", label: "Teams using StyleKit" },
            { stat: "99.99%", label: "Uptime SLA (Business)" },
            { stat: "14-day", label: "Free trial, no card needed" },
            { stat: "30-day", label: "Money-back guarantee" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 min-w-[120px]">
              <span className="text-2xl font-extrabold text-gray-900">{item.stat}</span>
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section id="compare" className="px-4 md:px-8 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Full Feature Comparison</h2>
            <p className="text-gray-500 text-sm">
              Hover a row for details. Selected plan is highlighted.
            </p>
          </div>
          <ComparisonTable plans={plans} selectedPlan={selectedPlan} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-gray-50 border-t border-gray-100 py-24 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-500">
              Still have questions?{" "}
              <a href="mailto:support@stylekit.dev" className="text-emerald-600 hover:underline">
                Contact our team
              </a>
              .
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 md:px-8 py-24">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl px-8 py-16 text-center text-white relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">
            Ready to get started?
          </h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed max-w-lg mx-auto relative z-10">
            Join over 10,000 teams already building with StyleKit. Start free, upgrade when you are
            ready.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-emerald-500/30">
              Start Free Trial
            </button>
            <button className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-7 py-3 rounded-xl text-sm transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>
            Copyright {new Date().getFullYear()} StyleKit. All rights reserved.
          </p>
          <p>
            Part of{" "}
            <Link href="/templates" className="text-gray-500 hover:text-emerald-600 transition-colors">
              StyleKit Templates
            </Link>
          </p>
        </div>
      </footer>

      <TemplateBackButton variant="modern" />
    </div>
  );
}
