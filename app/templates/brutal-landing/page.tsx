"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Palette, Shield, Tag, X, Zap } from "lucide-react";
import {
  BrutalButton,
  BrutalCard,
  BrutalInput,
  BrutalTag,
  BrutalSection,
} from "@/components/ui/brutal";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FEATURES = [
  {
    icon: <Zap className="w-10 h-10" />,
    title: "超级快速",
    desc: "毫秒级响应，让用户体验流畅无比。经过优化的底层引擎确保每一次交互都如丝般顺滑。",
    color: "bg-[#ff006e]",
    textColor: "text-white",
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "高度可定制",
    desc: "完全自定义的设计系统，满足各种需求。从颜色到字体，每一个细节都可以精确控制。",
    color: "bg-[#ccff00]",
    textColor: "text-black",
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "安全可靠",
    desc: "企业级安全标准，数据加密存储。通过 ISO 27001 认证，让你的数据始终安全。",
    color: "bg-[#00d9ff]",
    textColor: "text-black",
  },
];

const FAQ_ITEMS = [
  {
    question: "免费版有哪些功能限制？",
    answer:
      "免费版包含基础功能、社区支持以及 1 个项目额度。你可以体验核心的 Neo-Brutalist 组件库，但无法访问高级主题和 API。升级到专业版即可解锁全部功能。",
  },
  {
    question: "可以随时取消订阅吗？",
    answer:
      "当然可以。我们不锁定任何合同。你可以在账户设置中随时取消，取消后当前计费周期结束前仍可正常使用所有功能，不会立即失效。",
  },
  {
    question: "是否支持团队协作？",
    answer:
      "专业版支持最多 5 名团队成员共享访问权限。企业版则提供无限成员席位、角色权限管理以及团队专属仪表盘，非常适合大型组织使用。",
  },
  {
    question: "技术支持响应时间是多少？",
    answer:
      "免费版用户可通过社区论坛获取支持，响应时间视社区活跃度而定。专业版用户享有优先邮件支持，我们承诺在 24 小时内响应。企业版用户则拥有专属客户经理和 4 小时 SLA 保障。",
  },
];

export default function BrutalLandingTemplate() {
  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Email form
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Feature tabs
  const [activeFeature, setActiveFeature] = useState(0);

  // Backdrop ref for mobile menu
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (backdropRef.current && e.target === backdropRef.current) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");

    if (!email.trim()) {
      setEmailError("邮箱地址不能为空");
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("请输入有效的邮箱地址");
      return;
    }

    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState("success");
    }, 1500);
  }

  function toggleFaq(index: number) {
    setOpenFaq((prev) => (prev === index ? null : index));
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-40 bg-black/60"
          aria-hidden="true"
        />
      )}

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#ccff00] border-b-4 border-black shadow-[0_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between border-b-2 border-black">
            <Link
              href="/templates/brutal-landing"
              className="font-black text-2xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              BRUTAL<span className="text-[#ff006e]">.</span>
            </Link>
            <button
              className="p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="px-4 py-6 flex flex-col gap-4">
            {["功能", "定价", "关于"].map((label, i) => {
              const hrefs = ["#features", "#pricing", "#about"];
              return (
                <a
                  key={i}
                  href={hrefs[i]}
                  className="font-black text-2xl border-b-2 border-black pb-4 hover:text-[#ff006e] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              );
            })}
            <div className="pt-2">
              <BrutalButton
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                开始使用
              </BrutalButton>
            </div>
          </nav>
        </div>
      )}

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
          <button
            className="md:hidden p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <BrutalSection className="pt-32 pb-20 bg-[#ccff00]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <BrutalTag className="mb-6">NEW 新产品发布</BrutalTag>
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

      {/* Features Section with active tab highlight */}
      <BrutalSection id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <BrutalTag className="mb-4">CORE 核心功能</BrutalTag>
            <h2 className="text-4xl md:text-5xl font-black">
              为什么选择我们？
            </h2>
            <p className="mt-4 text-zinc-600 font-medium">点击功能卡片了解更多详情</p>
          </div>

          {/* Feature detail panel */}
          <div className="mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-6 md:p-8">
            <div className="flex items-start gap-6">
              <div
                className={`shrink-0 w-16 h-16 border-4 border-black flex items-center justify-center ${FEATURES[activeFeature].color}`}
              >
                <span className={FEATURES[activeFeature].textColor}>
                  {FEATURES[activeFeature].icon}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">{FEATURES[activeFeature].title}</h3>
                <p className="text-base leading-relaxed text-zinc-700">
                  {FEATURES[activeFeature].desc}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => {
              const isActive = activeFeature === i;
              return (
                <BrutalCard
                  key={i}
                  className={`p-8 cursor-pointer transition-all ${feature.color} ${
                    isActive
                      ? "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -translate-y-2 scale-[1.02]"
                      : "opacity-70 hover:opacity-90 hover:-translate-y-1"
                  }`}
                  onClick={() => setActiveFeature(i)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveFeature(i);
                    }
                  }}
                >
                  <span className="block mb-4">{feature.icon}</span>
                  <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
                  <p className="text-sm">{feature.desc.split("。")[0]}。</p>
                  {isActive && (
                    <div className="mt-4 inline-block bg-black text-white text-xs font-black px-3 py-1">
                      当前选中
                    </div>
                  )}
                </BrutalCard>
              );
            })}
          </div>
        </div>
      </BrutalSection>

      {/* Pricing Section */}
      <BrutalSection id="pricing" className="py-20 bg-[#f0f0f0]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <BrutalTag className="mb-4"><Tag className="w-4 h-4 inline mr-1" /> 透明定价</BrutalTag>
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

      {/* CTA Section with email validation */}
      <BrutalSection className="py-20 bg-[#ccff00]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            准备好开始了吗？
          </h2>
          <p className="text-lg mb-8">
            立即注册，免费试用 14 天所有功能。无需信用卡。
          </p>

          {submitState === "success" ? (
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
              <div className="text-5xl mb-4 select-none" aria-hidden="true">
                &#127881; &#10024; &#127881;
              </div>
              <p className="text-2xl font-black">WE GOT YOUR EMAIL!</p>
              <p className="mt-2 text-zinc-600 font-medium">
                我们会尽快与你联系，敬请期待。
              </p>
              <BrutalButton
                variant="primary"
                size="sm"
                className="mt-6"
                onClick={() => {
                  setSubmitState("idle");
                  setEmail("");
                  setEmailError("");
                }}
              >
                重新订阅
              </BrutalButton>
            </div>
          ) : (
            <form
              onSubmit={handleEmailSubmit}
              noValidate
              className="flex flex-col gap-3 max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <BrutalInput
                  type="email"
                  placeholder="输入你的邮箱"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  error={!!emailError}
                  disabled={submitState === "loading"}
                  className="flex-1"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                <BrutalButton
                  type="submit"
                  variant="primary"
                  disabled={submitState === "loading"}
                >
                  {submitState === "loading" ? "SENDING..." : "立即开始 →"}
                </BrutalButton>
              </div>
              {emailError && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-left text-sm font-bold text-[#ff006e] border-l-4 border-[#ff006e] pl-3"
                >
                  {emailError}
                </p>
              )}
            </form>
          )}
        </div>
      </BrutalSection>

      {/* FAQ Section */}
      <BrutalSection className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <BrutalTag className="mb-4">FAQ 常见问题</BrutalTag>
            <h2 className="text-4xl md:text-5xl font-black">
              你可能想知道的
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`border-4 border-black transition-all ${
                    isOpen
                      ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#ccff00]"
                      : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(i)}
                  >
                    <span className="font-black text-lg leading-snug">{item.question}</span>
                    <ChevronDown
                      className={`shrink-0 w-6 h-6 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 border-t-4 border-black">
                      <p className="pt-4 text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
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
              Copyright 2025 BRUTAL. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-white">Twitter</a>
              <a href="#" className="text-zinc-400 hover:text-white">GitHub</a>
              <a href="#" className="text-zinc-400 hover:text-white">Discord</a>
            </div>
          </div>
        </div>
      </footer>
      <TemplateBackButton variant="brutal" />
    </div>
  );
}
