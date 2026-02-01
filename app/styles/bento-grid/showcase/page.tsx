"use client";

import Link from "next/link";
import { Monitor } from "lucide-react";

export default function BentoGridShowcase() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/styles/bento-grid" className="text-xl font-bold text-zinc-900">
            Bento Grid
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-zinc-500 text-sm">Live Showcase</span>
            <Link
              href="/preview?url=/styles/bento-grid/showcase"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-600 hover:text-zinc-900 border border-zinc-200 rounded-lg hover:border-zinc-400 transition-colors"
              title="响应式预览"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">预览</span>
            </Link>
            <Link
              href="/styles/bento-grid"
              className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm hover:bg-zinc-800 transition-colors"
            >
              查看文档 →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              便当盒布局
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-6">
              Bento Grid
            </h1>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              灵感源于日式便当盒的不规则网格布局，创造视觉层次感
            </p>
          </div>

          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Large Card - 2x2 */}
            <div className="md:col-span-2 md:row-span-2 p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl text-white">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-5xl mb-4 block">🚀</span>
                  <h3 className="text-2xl font-bold mb-3">主要功能</h3>
                  <p className="text-white/80">
                    这是最重要的功能展示区域，用于突出核心价值主张
                  </p>
                </div>
                <button className="mt-6 px-6 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors w-fit">
                  了解更多 →
                </button>
              </div>
            </div>

            {/* Wide Card */}
            <div className="md:col-span-2 p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                    快速部署
                  </h3>
                  <p className="text-zinc-600 text-sm">
                    一键部署到任何现代托管平台，支持 Vercel、Netlify 等
                  </p>
                </div>
              </div>
            </div>

            {/* Small Card 1 */}
            <div className="p-6 bg-green-100 rounded-2xl">
              <span className="text-3xl mb-3 block">✅</span>
              <h3 className="font-semibold text-zinc-900">99.9%</h3>
              <p className="text-zinc-600 text-sm">可用性保证</p>
            </div>

            {/* Small Card 2 */}
            <div className="p-6 bg-pink-100 rounded-2xl">
              <span className="text-3xl mb-3 block">💜</span>
              <h3 className="font-semibold text-zinc-900">10K+</h3>
              <p className="text-zinc-600 text-sm">活跃用户</p>
            </div>

            {/* Tall Card */}
            <div className="md:row-span-2 p-6 bg-zinc-900 rounded-2xl text-white">
              <span className="text-3xl mb-4 block">🎨</span>
              <h3 className="text-xl font-bold mb-3">设计系统</h3>
              <p className="text-zinc-400 text-sm mb-4">
                完整的设计规范和组件库，确保一致的用户体验
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 50+ 组件
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 暗色模式
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 响应式
                </li>
              </ul>
            </div>

            {/* Wide Card 2 */}
            <div className="md:col-span-2 p-6 bg-amber-100 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-1">
                    新功能即将推出
                  </h3>
                  <p className="text-zinc-600 text-sm">
                    更多激动人心的功能正在开发中
                  </p>
                </div>
                <span className="text-4xl">🎉</span>
              </div>
            </div>

            {/* Small Card 3 */}
            <div className="p-6 bg-cyan-100 rounded-2xl text-center">
              <span className="text-3xl">📱</span>
              <p className="text-zinc-600 text-sm mt-2">移动优先</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-zinc-900 text-center mb-12">
            更多特性
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🔒", title: "安全可靠", color: "bg-red-50" },
              { icon: "🌍", title: "全球 CDN", color: "bg-blue-50" },
              { icon: "📊", title: "数据分析", color: "bg-green-50" },
              { icon: "🔌", title: "API 集成", color: "bg-purple-50" },
              { icon: "💬", title: "实时协作", color: "bg-yellow-50" },
              { icon: "🎯", title: "精准定位", color: "bg-pink-50" },
              { icon: "⚙️", title: "自定义配置", color: "bg-indigo-50" },
              { icon: "🚀", title: "持续更新", color: "bg-orange-50" },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 ${item.color} rounded-2xl text-center hover:scale-105 transition-transform`}
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <h3 className="font-medium text-zinc-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            Bento Grid Showcase · Part of{" "}
            <Link href="/" className="text-zinc-900 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
