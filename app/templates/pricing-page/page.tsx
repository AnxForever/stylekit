import Link from "next/link";
import { Check, HelpCircle, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "¥0",
    period: "forever",
    desc: "Perfect for side projects",
    cta: "Get Started",
    highlight: false,
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
    name: "Pro",
    price: "¥99",
    period: "/mo",
    desc: "For growing teams",
    cta: "Start Free Trial",
    highlight: true,
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
    name: "Business",
    price: "¥299",
    period: "/mo",
    desc: "For scaling organizations",
    cta: "Contact Sales",
    highlight: false,
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

const featureLabels: { key: string; label: string; tooltip?: string }[] = [
  { key: "projects", label: "Projects" },
  { key: "storage", label: "Storage" },
  { key: "members", label: "Team Members" },
  { key: "api", label: "API Access", tooltip: "RESTful API with full CRUD" },
  { key: "support", label: "Support" },
  { key: "analytics", label: "Analytics", tooltip: "Detailed usage analytics and reporting" },
  { key: "customDomain", label: "Custom Domain" },
  { key: "sla", label: "SLA Guarantee", tooltip: "99.99% uptime with contractual guarantee" },
];

const faqs = [
  {
    q: "Can I change plans at any time?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, Alipay, WeChat Pay, and bank transfers for enterprise plans.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, all paid plans come with a 14-day free trial. No credit card required.",
  },
  {
    q: "What happens when I exceed my storage limit?",
    a: "We will notify you when you reach 80% of your storage. You can upgrade or clean up your data.",
  },
];

function renderFeatureValue(value: string | boolean) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-4 h-4 text-emerald-500" />
    ) : (
      <X className="w-4 h-4 text-gray-300" />
    );
  }
  return <span className="text-sm font-medium">{value}</span>;
}

export default function PricingPageTemplate() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/templates/pricing-page" className="text-xl font-bold">
            Pricing
          </Link>
          <Link
            href="/templates"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 md:py-24 px-4 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-4">
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-gray-500">
            No hidden fees. No surprise charges. Pick the plan that works for you.
          </p>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlight
                  ? "bg-gray-900 text-white ring-4 ring-gray-900/10 scale-[1.02]"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block text-xs font-semibold bg-emerald-500 text-white px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                {plan.desc}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.period}
                </span>
              </div>
              <button
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors mb-8 ${
                  plan.highlight
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {plan.cta}
              </button>
              <ul className="space-y-3">
                {featureLabels.map((feat) => {
                  const value = plan.features[feat.key as keyof typeof plan.features];
                  return (
                    <li key={feat.key} className="flex items-center justify-between text-sm">
                      <span className={plan.highlight ? "text-gray-300" : "text-gray-600"}>
                        {feat.label}
                      </span>
                      {renderFeatureValue(value)}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Full Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 w-1/4">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="text-center py-3 px-4 text-sm font-bold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureLabels.map((feat) => (
                  <tr key={feat.key} className="border-b border-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600 flex items-center gap-1.5">
                      {feat.label}
                      {feat.tooltip && (
                        <HelpCircle className="w-3.5 h-3.5 text-gray-300" aria-label={feat.tooltip} />
                      )}
                    </td>
                    {plans.map((plan) => {
                      const value = plan.features[feat.key as keyof typeof plan.features];
                      return (
                        <td key={plan.name} className="text-center py-3 px-4">
                          <span className="inline-flex justify-center">{renderFeatureValue(value)}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 md:px-8 pb-20 bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white p-6 rounded-xl border border-gray-100">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            Copyright 2025. Part of{" "}
            <Link href="/templates" className="text-gray-500 hover:text-emerald-600 transition-colors">
              StyleKit Templates
            </Link>
          </p>
        </div>
      </footer>

      {/* Back to Templates */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/templates"
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
        >
          ← 返回模板
        </Link>
      </div>
    </div>
  );
}
