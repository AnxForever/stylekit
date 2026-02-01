"use client";

import Link from "next/link";

export default function GlassLandingTemplate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3">
          <Link href="/templates/glass-landing" className="text-white font-bold text-xl">
            GlassUI
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/80 hover:text-white text-sm transition-colors">功能</a>
            <a href="#pricing" className="text-white/80 hover:text-white text-sm transition-colors">定价</a>
            <a href="#about" className="text-white/80 hover:text-white text-sm transition-colors">关于</a>
            <button className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-full text-sm hover:bg-white/90 transition-colors">
              开始使用
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <span className="text-white/80 text-sm">✨ 全新设计系统</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            打造现代化的<br />透明界面体验
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            使用毛玻璃效果创建令人惊艳的用户界面，提升产品的视觉层次感和现代感。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-white/90 transition-colors shadow-lg">
              免费开始
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full hover:bg-white/30 transition-colors">
              观看演示
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">核心功能</h2>
            <p className="text-white/60">为什么开发者喜欢使用 GlassUI</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🎨", title: "美观设计", desc: "精心设计的毛玻璃组件，开箱即用" },
              { icon: "⚡", title: "高性能", desc: "优化的 CSS 实现，流畅的动画效果" },
              { icon: "🔧", title: "易于定制", desc: "灵活的配置选项，适应各种场景" },
            ].map((f, i) => (
              <div key={i} className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hover:-translate-y-1 transition-transform">
                <span className="text-4xl mb-4 block">{f.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "50K+", label: "下载量" },
                { value: "99.9%", label: "满意度" },
                { value: "100+", label: "组件" },
                { value: "24/7", label: "支持" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">立即开始</h3>
            <p className="text-white/60 mb-6">免费注册，体验毛玻璃设计的魅力</p>
            <input
              type="email"
              placeholder="你的邮箱"
              className="w-full px-4 py-3 mb-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            <button className="w-full py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-white/90 transition-colors">
              开始使用 →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/50 text-sm">
            © 2025 GlassUI. All rights reserved. · Part of{" "}
            <Link href="/templates" className="text-white hover:underline">
              StyleKit Templates
            </Link>
          </p>
        </div>
      </footer>

      {/* Back Link */}
      <div className="fixed bottom-4 right-4">
        <Link
          href="/templates"
          className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white text-sm hover:bg-white/30 transition-all"
        >
          ← 返回模板
        </Link>
      </div>
    </div>
  );
}
