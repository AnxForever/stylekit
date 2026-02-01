"use client";

import Link from "next/link";
import { Monitor } from "lucide-react";

export default function GlassmorphismShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/10 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/styles/glassmorphism" className="text-white font-bold text-xl">
            Glassmorphism
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm">Live Showcase</span>
            <Link
              href="/preview?url=/styles/glassmorphism/showcase"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white/70 hover:text-white border border-white/20 rounded-lg hover:border-white/40 transition-colors"
              title="响应式预览"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">预览</span>
            </Link>
            <Link
              href="/styles/glassmorphism"
              className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white text-sm hover:bg-white/30 transition-all"
            >
              查看文档 →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <span className="text-white/80 text-sm">✨ 玻璃拟态设计风格</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Glassmorphism
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            半透明毛玻璃效果，通过 backdrop-blur 创造现代感十足的层叠界面
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all shadow-lg">
              开始使用
            </button>
            <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-white/90 transition-all shadow-lg">
              了解更多
            </button>
          </div>
        </div>
      </section>

      {/* Glass Cards Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            组件展示
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                设计系统
              </h3>
              <p className="text-white/70">
                完整的设计规范和组件库，支持快速搭建现代界面
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                高性能
              </h3>
              <p className="text-white/70">
                优化的 CSS 实现，确保流畅的动画和过渡效果
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                响应式
              </h3>
              <p className="text-white/70">
                完美适配各种设备，从手机到桌面显示器
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              联系我们
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="您的姓名"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
              />
              <input
                type="email"
                placeholder="邮箱地址"
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all"
              />
              <textarea
                placeholder="您的留言"
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-all resize-none"
              />
              <button className="w-full py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white font-semibold hover:bg-white/30 transition-all">
                发送消息
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/60">用户</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white/60">组件</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">99%</div>
                <div className="text-white/60">满意度</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/60">支持</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            Glassmorphism Showcase · Part of{" "}
            <Link href="/" className="text-white hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
