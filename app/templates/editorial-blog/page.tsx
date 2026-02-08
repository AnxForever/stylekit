import Link from "next/link";

export default function EditorialBlogTemplate() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/templates/editorial-blog" className="text-lg tracking-widest uppercase font-serif">
            The Editorial
          </Link>
          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors">首页</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors">文章</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors">关于</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors">订阅</a>
          </div>
        </div>
      </nav>

      {/* Hero Article */}
      <section className="py-16 px-6 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-4">Featured Article</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight">
            设计的本质：在混乱中寻找秩序
          </h1>
          <p className="text-lg text-zinc-600 mb-8 max-w-2xl">
            好的设计不是装饰，而是解决问题的过程。当我们剥离所有表面的华丽，
            设计的核心始终是功能与形式的完美统一。
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 text-sm font-medium">
              张
            </div>
            <div>
              <p className="text-sm font-medium">张明远</p>
              <p className="text-xs text-zinc-400">2025年1月15日 · 8 分钟阅读</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="drop-cap text-lg leading-relaxed text-zinc-700 space-y-6">
            <p>
              当我第一次接触设计时，我以为设计就是让东西变得好看。多年后我才明白，
              设计的真正价值在于解决问题——视觉只是解决方案的呈现方式。
            </p>
            <p>
              在这个信息过载的时代，好的设计能够帮助用户快速理解信息、
              做出决策、完成任务。它不需要华丽的装饰，不需要复杂的动画，
              只需要在恰当的时机提供恰当的信息。
            </p>

            <blockquote className="pull-quote">
              &ldquo;设计不是关于你能添加什么，而是关于你能移除什么。&rdquo;
            </blockquote>

            <h2 className="text-2xl font-serif mt-12 mb-4">简约的力量</h2>
            <p>
              极简主义不是风格，而是一种思维方式。当我们移除所有不必要的元素，
              剩下的就是本质。这个过程需要勇气——放弃那些看起来很酷但并不必要的东西。
            </p>

            <h2 className="text-2xl font-serif mt-12 mb-4">功能决定形式</h2>
            <p>
              每一个设计决策都应该有明确的目的。按钮为什么是这个颜色？
              间距为什么是这个数值？字体为什么是这个大小？
              如果你无法回答这些问题，那么这个设计决策可能需要重新考虑。
            </p>
          </div>

          {/* Author Bio */}
          <div className="mt-16 pt-8 border-t border-zinc-200">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 text-xl font-medium shrink-0">
                张
              </div>
              <div>
                <p className="font-medium mb-1">张明远</p>
                <p className="text-sm text-zinc-500 mb-4">
                  设计师、作家，专注于用户体验和界面设计。曾在多家科技公司担任设计主管，
                  现从事设计教育和写作。
                </p>
                <div className="flex gap-4 text-sm">
                  <a href="#" className="text-zinc-400 hover:text-zinc-900">Twitter</a>
                  <a href="#" className="text-zinc-400 hover:text-zinc-900">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* More Articles */}
      <section className="py-16 px-6 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-zinc-400 mb-8">More Articles</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "色彩心理学：如何用颜色传达情感",
                excerpt: "颜色不仅是视觉元素，更是情感的载体...",
                date: "2025年1月10日",
              },
              {
                title: "排版的艺术：文字如何讲述故事",
                excerpt: "好的排版应该是隐形的，它不应该...",
                date: "2025年1月5日",
              },
            ].map((article, i) => (
              <a key={i} href="#" className="group block">
                <h3 className="text-xl font-serif italic mb-2 group-hover:text-[#e63946] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-zinc-500 mb-2">{article.excerpt}</p>
                <p className="text-xs text-zinc-400">{article.date}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-zinc-100">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-2xl font-serif italic mb-4">订阅更新</h3>
          <p className="text-sm text-zinc-500 mb-6">
            每周精选设计灵感和行业洞察，直达你的邮箱。
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="你的邮箱"
              className="flex-1 px-4 py-3 border-b border-zinc-300 bg-transparent text-sm focus:outline-none focus:border-zinc-900 transition-colors"
            />
            <button className="px-6 py-3 bg-zinc-900 text-white text-sm tracking-wide hover:bg-zinc-800 transition-colors">
              订阅
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-xs text-zinc-400">
            Copyright 2025 The Editorial · Part of{" "}
            <Link href="/templates" className="text-zinc-600 hover:underline">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-4 text-xs text-zinc-400">
            <a href="#" className="hover:text-zinc-600">隐私政策</a>
            <a href="#" className="hover:text-zinc-600">使用条款</a>
          </div>
        </div>
      </footer>

      {/* Back Link */}
      <div className="fixed bottom-4 right-4">
        <Link
          href="/templates"
          className="px-4 py-2 bg-zinc-900 text-white text-sm tracking-wide hover:bg-zinc-800 transition-colors"
        >
          ← 返回模板
        </Link>
      </div>
    </div>
  );
}
