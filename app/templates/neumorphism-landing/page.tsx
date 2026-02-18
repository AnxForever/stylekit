"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Cloud, Lock, Zap } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const features = [
  {
    icon: Zap,
    title: "闪电般的速度",
    description: "毫秒级响应，CDN 全球加速。让你的用户体验丝滑流畅。",
  },
  {
    icon: Lock,
    title: "企业级安全",
    description: "端到端加密，SOC 2 合规。你的数据安全是我们的第一优先级。",
  },
  {
    icon: Cloud,
    title: "云端同步",
    description: "多设备实时同步，随时随地访问。数据永不丢失。",
  },
];

const pricingPlans = [
  {
    name: "入门版",
    price: "¥0",
    period: "/月",
    description: "适合个人用户体验核心功能",
    features: ["5 个项目", "1 GB 存储", "社区支持", "基础分析"],
    highlighted: false,
  },
  {
    name: "专业版",
    price: "¥79",
    period: "/月",
    description: "适合团队和专业开发者",
    features: ["无限项目", "50 GB 存储", "优先支持", "高级分析", "API 访问", "团队协作"],
    highlighted: true,
  },
  {
    name: "企业版",
    price: "定制",
    period: "",
    description: "适合大型团队和企业客户",
    features: ["一切专业版功能", "无限存储", "专属支持", "SLA 保障", "私有化部署"],
    highlighted: false,
  },
];

const testimonials = [
  {
    text: "切换到这个平台后，我们的开发效率提升了 40%。界面直觉且美观。",
    author: "张明远",
    role: "CTO, TechStart",
  },
  {
    text: "终于找到一个既好用又好看的工具了。Neumorphism 的设计让人眼前一亮。",
    author: "李思然",
    role: "Product Designer, DesignCo",
  },
];

// Neumorphic shadow helpers
const neuOut = "shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]";
const neuOutLg = "shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]";
const neuIn = "shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]";
const neuHover = "hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]";
const neuActive = "active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]";

export default function NeumorphismLandingTemplate() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#e0e5ec] text-gray-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#e0e5ec]">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-4">
          <div className={`flex items-center justify-between px-6 py-3 rounded-2xl ${neuOut}`}>
            <Link href="/templates/neumorphism-landing" className="text-lg font-semibold text-gray-800">
              NeuUI
            </Link>
            <div className="hidden md:flex items-center gap-2">
              {["功能", "定价", "评价"].map((item) => (
                <a
                  key={item}
                  href={`#${item === "功能" ? "features" : item === "定价" ? "pricing" : "testimonials"}`}
                  className={`px-4 py-2 rounded-xl text-sm font-medium text-gray-600 ${neuOut} ${neuHover} ${neuActive} transition-all duration-200`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-block px-6 py-2 rounded-full ${neuIn} mb-8`}>
            <span className="text-sm font-medium text-[#6d5dfc]">全新发布 v2.0</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold text-gray-800 mb-6 leading-tight">
            柔和的力量，<br />
            <span className="text-[#6d5dfc]">极致的体验</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            拥抱新拟物设计语言。让你的产品拥有触感般的真实体验，
            在柔和的光影中展现专业与优雅。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className={`px-8 py-4 rounded-xl bg-[#6d5dfc] text-[#e0e5ec] font-semibold shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_rgba(80,60,200,0.3),inset_-4px_-4px_8px_rgba(130,110,255,0.3)] transition-all duration-200`}
            >
              免费开始
            </button>
            <button
              className={`px-8 py-4 rounded-xl bg-[#e0e5ec] text-gray-700 font-semibold ${neuOut} ${neuHover} transition-all duration-200`}
            >
              观看演示
            </button>
          </div>

          {/* Hero Visual */}
          <div className={`mt-16 p-8 rounded-2xl ${neuOutLg}`}>
            <div className={`aspect-video rounded-xl ${neuIn} flex items-center justify-center`}>
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto rounded-2xl ${neuOut} flex items-center justify-center mb-4`}>
                  <Zap className="w-8 h-8 text-[#6d5dfc]" />
                </div>
                <p className="text-sm text-gray-400">产品预览区域</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#6d5dfc] mb-3">FEATURES</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              为什么选择我们
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`p-8 rounded-2xl bg-[#e0e5ec] ${neuOut} ${neuHover} transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-xl ${neuIn} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-[#6d5dfc]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#6d5dfc] mb-3">PRICING</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              简单透明的定价
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl ${
                  plan.highlighted
                    ? "bg-[#6d5dfc] text-[#e0e5ec] shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]"
                    : `bg-[#e0e5ec] ${neuOut}`
                } transition-all duration-300`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${plan.highlighted ? "text-[#e0e5ec]" : "text-gray-800"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? "text-[#e0e5ec]/70" : "text-gray-500"}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-semibold ${plan.highlighted ? "text-[#e0e5ec]" : "text-gray-800"}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlighted ? "text-[#e0e5ec]/70" : "text-gray-500"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 ${plan.highlighted ? "text-[#e0e5ec]" : "text-[#6d5dfc]"}`} />
                      <span className={plan.highlighted ? "text-[#e0e5ec]/90" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-[#e0e5ec] text-[#6d5dfc] shadow-[4px_4px_8px_rgba(80,60,200,0.3),-4px_-4px_8px_rgba(130,110,255,0.3)]"
                      : `bg-[#e0e5ec] text-gray-700 ${neuOut} ${neuHover}`
                  }`}
                >
                  {plan.price === "定制" ? "联系我们" : "开始使用"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[#6d5dfc] mb-3">TESTIMONIALS</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              用户怎么说
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`p-8 rounded-2xl bg-[#e0e5ec] ${neuOut}`}>
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 px-6 md:px-8">
        <div className={`max-w-3xl mx-auto p-10 rounded-2xl ${neuOutLg} text-center`}>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            准备好开始了吗？
          </h2>
          <p className="text-gray-600 mb-8">
            免费试用 14 天，无需信用卡。体验新拟物设计的魅力。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="输入邮箱地址"
              aria-label="邮箱地址"
              className={`flex-1 px-5 py-3 rounded-xl bg-[#e0e5ec] ${neuIn} text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none transition-shadow duration-200`}
            />
            <button
              className="px-6 py-3 rounded-xl bg-[#6d5dfc] text-[#e0e5ec] font-semibold text-sm shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff] hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff] transition-all duration-200"
            >
              立即注册
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Copyright 2025 NeuUI · Part of{" "}
            <Link href="/templates" className="text-gray-700 hover:text-[#6d5dfc] transition-colors">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700 transition-colors">隐私</a>
            <a href="#" className="hover:text-gray-700 transition-colors">条款</a>
            <a href="#" className="hover:text-gray-700 transition-colors">联系</a>
          </div>
        </div>
      </footer>

      <TemplateBackButton variant="neumorphic" />
    </div>
  );
}
