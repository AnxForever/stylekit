import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const featuredArticles = [
  {
    category: "DESIGN",
    title: "2025 年值得关注的十大设计趋势",
    excerpt: "从 AI 驱动的设计工具到可变字体的全面普及，今年的设计世界正在经历前所未有的变革。",
    author: "林知秋",
    date: "2025 年 2 月 12 日",
    readTime: "12 分钟阅读",
    accent: "bg-[#e63946]",
  },
  {
    category: "TECHNOLOGY",
    title: "Web Components 的复兴：为什么现在是最佳时机",
    excerpt: "随着各大浏览器的全面支持，Web Components 终于迎来了它的黄金时代。",
    author: "陈一鸣",
    date: "2025 年 2 月 8 日",
    readTime: "8 分钟阅读",
    accent: "bg-[#2a9d8f]",
  },
];

const gridArticles = [
  {
    category: "CULTURE",
    title: "从包豪斯到数字界面：功能主义的百年进化",
    author: "张艺然",
    date: "2 月 5 日",
    accent: "bg-[#264653]",
  },
  {
    category: "TYPOGRAPHY",
    title: "中文排版的数字化困境与突破",
    author: "周小棠",
    date: "2 月 2 日",
    accent: "bg-[#e9c46a]",
  },
  {
    category: "UX",
    title: "无障碍设计不是可选项——它是义务",
    author: "李思远",
    date: "1 月 28 日",
    accent: "bg-[#e63946]",
  },
  {
    category: "CODE",
    title: "CSS 容器查询实战：告别 Media Query 的时代",
    author: "王立群",
    date: "1 月 25 日",
    accent: "bg-[#2a9d8f]",
  },
  {
    category: "OPINION",
    title: "设计师需要学会编程吗？一个过时的问题",
    author: "赵小鹿",
    date: "1 月 20 日",
    accent: "bg-[#264653]",
  },
  {
    category: "INTERVIEW",
    title: "对话顶级 Type Foundry：字体设计的未来",
    author: "孙明辉",
    date: "1 月 15 日",
    accent: "bg-[#e9c46a]",
  },
];

const categories = ["ALL", "DESIGN", "TECHNOLOGY", "CULTURE", "TYPOGRAPHY", "UX", "CODE"];

export default function MagazineLandingTemplate() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Top bar */}
          <div className="flex items-center justify-between py-3 border-b border-zinc-100 text-xs text-zinc-500">
            <span>EST. 2025</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-zinc-900 transition-colors">关于</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">投稿</a>
              <a href="#subscribe" className="hover:text-zinc-900 transition-colors">订阅</a>
            </div>
          </div>

          {/* Masthead */}
          <div className="py-8 text-center">
            <Link href="/templates/magazine-landing" className="inline-block">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                THE GRID
              </h1>
              <p className="text-xs tracking-[0.3em] text-zinc-500 mt-2 uppercase">Design / Technology / Culture</p>
            </Link>
          </div>

          {/* Category Nav */}
          <nav className="flex items-center gap-1 overflow-x-auto pb-3 -mb-px">
            {categories.map((cat, i) => (
              <a
                key={cat}
                href="#"
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap rounded transition-colors ${
                  i === 0
                    ? "bg-[#e63946] text-white"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                {cat}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Featured */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {featuredArticles.map((article, i) => (
              <a key={i} href="#" className="group block rounded-lg overflow-hidden border border-zinc-200 hover:shadow-md transition-all duration-300">
                {/* Cover placeholder */}
                <div className={`aspect-[16/9] ${article.accent} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/40 text-6xl md:text-8xl font-bold tracking-tighter">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-white text-xs font-semibold uppercase tracking-wider rounded">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-[#e63946] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="font-medium text-zinc-700">{article.author}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="border-t border-zinc-200" />
      </div>

      {/* Article Grid */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Latest Articles</h3>
            <a href="#" className="text-xs font-semibold uppercase tracking-wider text-[#e63946] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {gridArticles.map((article, i) => (
              <a
                key={i}
                href="#"
                className="group block rounded-lg overflow-hidden border border-zinc-200 hover:shadow-md transition-all duration-300"
              >
                <div className={`aspect-[16/10] ${article.accent} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-5xl font-bold tracking-tighter">
                      {String(i + 3).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                    {article.category}
                  </span>
                  <h4 className="text-base font-bold tracking-tight mt-2 mb-3 group-hover:text-[#e63946] transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>{article.author}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="subscribe" className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Newsletter</p>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            订阅每周精选
          </h3>
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            设计、技术、文化——每周三封精选内容直达你的收件箱。已有 5,000+ 读者。
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="邮箱地址"
              className="flex-1 px-4 py-3 bg-zinc-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e63946]/30 transition-all"
            />
            <button className="px-6 py-3 bg-[#e63946] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#d62839] transition-colors">
              订阅
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 lg:px-8 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <span className="font-bold text-zinc-900">THE GRID</span>
            <span>
              Copyright 2025 · Part of{" "}
              <Link href="/templates" className="text-zinc-700 hover:underline">StyleKit Templates</Link>
            </span>
          </div>
          <div className="flex gap-6 text-xs text-zinc-500">
            <a href="#" className="hover:text-zinc-900 transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Instagram</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">RSS</a>
          </div>
        </div>
      </footer>
      <TemplateBackButton variant="editorial" />
    </div>
  );
}
