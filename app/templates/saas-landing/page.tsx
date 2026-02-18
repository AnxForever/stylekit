"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Cloud,
  Lock,
  Menu,
  Zap,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "亚毫秒级响应时间，全球 CDN 加速分发",
    color: "bg-blue-500",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    desc: "SOC 2 合规，端到端加密，细粒度权限控制",
    color: "bg-emerald-500",
  },
  {
    icon: Cloud,
    title: "Cloud Native",
    desc: "自动弹性伸缩，零运维负担，99.99% SLA",
    color: "bg-violet-500",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "实时数据面板，自定义报表，AI 驱动洞察",
    color: "bg-amber-500",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$29",
    desc: "适合小团队起步",
    features: ["5 位成员", "10GB 存储", "基础分析", "邮件支持"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$79",
    desc: "适合成长中的团队",
    features: [
      "25 位成员",
      "100GB 存储",
      "高级分析",
      "优先支持",
      "API 访问",
      "自定义域名",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "适合大型组织",
    features: [
      "无限成员",
      "无限存储",
      "完整分析套件",
      "专属客户经理",
      "SLA 保障",
      "私有部署",
    ],
    popular: false,
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechCorp",
    text: "迁移到这个平台后，我们的开发效率提升了 3 倍。API 设计优雅，文档完善。",
  },
  {
    name: "Alex Kim",
    role: "VP Engineering, DataFlow",
    text: "稳定性和性能都远超预期。客户支持团队响应迅速，问题解决率接近 100%。",
  },
  {
    name: "Maria Lopez",
    role: "Lead Developer, Startup.io",
    text: "作为创业团队，我们需要快速迭代。这个工具让我们专注于产品而非基础设施。",
  },
];

export default function SaasLandingTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm text-gray-600">
              Features
            </a>
            <a href="#pricing" className="block text-sm text-gray-600">
              Pricing
            </a>
            <a href="#testimonials" className="block text-sm text-gray-600">
              Testimonials
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm text-blue-700">
              v3.0 -- New Release
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Build faster,
            <br />
            <span className="text-blue-600">ship smarter</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            The all-in-one platform for modern teams.
            Streamline your workflow, automate deployments,
            and scale with confidence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
              Start Free Trial
              <ArrowRight className="inline w-4 h-4 ml-2" />
            </button>
            <button className="px-8 py-4 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
              Book a Demo
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            No credit card required. 14-day free trial.
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
              Powerful features designed for modern development teams
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-5`}
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
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl ${
                  plan.popular
                    ? "bg-blue-600 text-white ring-4 ring-blue-600/20 scale-105"
                    : "bg-white border border-gray-200"
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
                <div className="text-4xl font-bold mb-6">
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="text-lg font-normal">/mo</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by teams everywhere
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 border border-gray-100 rounded-2xl"
              >
                <p className="text-gray-600 leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of teams already using SaasKit to ship faster.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
            Start Your Free Trial
            <ArrowRight className="inline w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Copyright 2025 SaasKit. Part of{" "}
            <Link
              href="/templates"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-gray-600 transition-colors">
              Discord
            </a>
          </div>
        </div>
      </footer>
      <TemplateBackButton variant="modern" />
    </div>
  );
}
