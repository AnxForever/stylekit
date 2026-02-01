"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BrutalButton,
  BrutalCard,
  BrutalInput,
  BrutalTag,
  BrutalSection,
} from "@/components/ui/brutal";

export default function BrutalLandingTemplate() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#ccff00] border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/templates/brutal-landing" className="font-black text-2xl">
            BRUTAL<span className="text-[#ff006e]">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="font-bold hover:text-[#ff006e] transition-colors">
              功能
            </a>
            <a href="#pricing" className="font-bold hover:text-[#ff006e] transition-colors">
              定价
            </a>
            <a href="#about" className="font-bold hover:text-[#ff006e] transition-colors">
              关于
            </a>
            <BrutalButton variant="primary" size="sm">
              开始使用
            </BrutalButton>
          </div>
          <button className="md:hidden font-black text-2xl">☰</button>
        </div>
      </nav>

      {/* Hero Section */}
      <BrutalSection className="pt-32 pb-20 bg-[#ccff00]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <BrutalTag className="mb-6">🚀 新产品发布</BrutalTag>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6">
                让你的<br />
                想法<br />
                <span className="text-[#ff006e]">炸裂</span>出来
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-md">
                不再拘泥于无聊的设计。用 Neo-Brutalist 风格让你的产品脱颖而出。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <BrutalButton variant="primary" size="lg">
                  免费试用 →
                </BrutalButton>
                <BrutalButton variant="secondary" size="lg">
                  查看演示
                </BrutalButton>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 rotate-3">
                <div className="w-full h-full bg-[#ff006e] border-4 border-black flex items-center justify-center">
                  <span className="text-white text-8xl font-black">?!</span>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#00d9ff] border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-6">
                <span className="font-black text-xl">BOLD DESIGN</span>
              </div>
            </div>
          </div>
        </div>
      </BrutalSection>

      {/* Stats Section */}
      <BrutalSection className="py-12 bg-black text-white border-y-4 border-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "活跃用户" },
              { value: "99.9%", label: "可用性" },
              { value: "50+", label: "组件" },
              { value: "24/7", label: "支持" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black text-[#ccff00]">{stat.value}</div>
                <div className="text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </BrutalSection>

      {/* Features Section */}
      <BrutalSection id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <BrutalTag className="mb-4">✨ 核心功能</BrutalTag>
            <h2 className="text-4xl md:text-5xl font-black">
              为什么选择我们？
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "⚡",
                title: "超级快速",
                desc: "毫秒级响应，让用户体验流畅无比",
                color: "bg-[#ff006e]",
              },
              {
                emoji: "🎨",
                title: "高度可定制",
                desc: "完全自定义的设计系统，满足各种需求",
                color: "bg-[#ccff00]",
              },
              {
                emoji: "🔒",
                title: "安全可靠",
                desc: "企业级安全标准，数据加密存储",
                color: "bg-[#00d9ff]",
              },
            ].map((feature, i) => (
              <BrutalCard key={i} className={`${feature.color} p-8`}>
                <span className="text-5xl block mb-4">{feature.emoji}</span>
                <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
                <p className="text-sm">{feature.desc}</p>
              </BrutalCard>
            ))}
          </div>
        </div>
      </BrutalSection>

      {/* Pricing Section */}
      <BrutalSection id="pricing" className="py-20 bg-[#f0f0f0]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <BrutalTag className="mb-4">💰 透明定价</BrutalTag>
            <h2 className="text-4xl md:text-5xl font-black">
              简单明了的价格
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "免费版",
                price: "¥0",
                features: ["基础功能", "社区支持", "1 个项目"],
                popular: false,
              },
              {
                name: "专业版",
                price: "¥99",
                features: ["全部功能", "优先支持", "无限项目", "API 访问"],
                popular: true,
              },
              {
                name: "企业版",
                price: "定制",
                features: ["全部功能", "专属支持", "自定义部署", "SLA 保障"],
                popular: false,
              },
            ].map((plan, i) => (
              <BrutalCard
                key={i}
                className={`p-8 ${
                  plan.popular ? "bg-[#ff006e] text-white -translate-y-4" : "bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="bg-black text-white text-xs font-black px-3 py-1 inline-block mb-4">
                    最受欢迎
                  </div>
                )}
                <h3 className="text-xl font-black mb-2">{plan.name}</h3>
                <div className="text-4xl font-black mb-6">
                  {plan.price}
                  {plan.price !== "定制" && <span className="text-lg">/月</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <BrutalButton
                  variant={plan.popular ? "secondary" : "primary"}
                  className="w-full"
                >
                  选择方案
                </BrutalButton>
              </BrutalCard>
            ))}
          </div>
        </div>
      </BrutalSection>

      {/* CTA Section */}
      <BrutalSection className="py-20 bg-[#ccff00]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-lg mb-8">
            立即注册，免费试用 14 天所有功能。无需信用卡。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <BrutalInput
              placeholder="输入你的邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <BrutalButton variant="primary">
              立即开始 →
            </BrutalButton>
          </div>
        </div>
      </BrutalSection>

      {/* Footer */}
      <footer className="py-12 bg-black text-white border-t-4 border-[#ff006e]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="font-black text-2xl mb-4">
                BRUTAL<span className="text-[#ff006e]">.</span>
              </div>
              <p className="text-sm text-zinc-400">
                让设计不再无聊
              </p>
            </div>
            {[
              { title: "产品", links: ["功能", "定价", "更新日志"] },
              { title: "资源", links: ["文档", "教程", "API"] },
              { title: "公司", links: ["关于", "博客", "联系我们"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-black mb-4">{col.title}</h4>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-400">
              © 2025 BRUTAL. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-white">Twitter</a>
              <a href="#" className="text-zinc-400 hover:text-white">GitHub</a>
              <a href="#" className="text-zinc-400 hover:text-white">Discord</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Templates */}
      <div className="fixed bottom-4 right-4">
        <Link
          href="/templates"
          className="bg-black text-white px-4 py-2 font-black text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          ← 返回模板
        </Link>
      </div>
    </div>
  );
}
