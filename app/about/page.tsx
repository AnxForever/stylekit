import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              关于项目
            </p>
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">
              让 AI 生成的网站<br />
              <span className="italic">更具设计感</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              StyleKit 是一个设计风格集合，为 AI 编码助手提供清晰的设计规范和可复用的组件模板，
              帮助开发者快速构建视觉一致、专业美观的网站。
            </p>
          </div>
        </section>

        {/* 核心理念 */}
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-8">
              核心理念
            </p>
            <div className="grid gap-12">
              <div>
                <h2 className="text-2xl md:text-3xl mb-4">设计即约束</h2>
                <p className="text-muted leading-relaxed">
                  好的设计不是无限可能，而是在约束中寻找最优解。每个风格都有明确的「必须做」和「禁止做」，
                  让 AI 在清晰的边界内生成一致的代码。
                </p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl mb-4">为 AI 而生</h2>
                <p className="text-muted leading-relaxed">
                  传统设计系统为人类设计师编写，而 StyleKit 专为 AI 编码助手优化。
                  每个规范都是 Prompt 友好的，可以直接导出为 Trae、Cursor、Claude Code 等工具的 Rules。
                </p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl mb-4">组件化思维</h2>
                <p className="text-muted leading-relaxed">
                  从按钮到完整页面，每个元素都有对应的组件模板。复制即用，无需从零开始。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 使用场景 */}
        <section className="border-b border-border">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-xs tracking-widest uppercase text-muted mb-8">
              使用场景
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-border p-6">
                <h3 className="text-xl mb-3">快速原型</h3>
                <p className="text-sm text-muted">
                  选择一个风格，让 AI 在几分钟内生成完整的落地页或应用界面。
                </p>
              </div>
              <div className="border border-border p-6">
                <h3 className="text-xl mb-3">设计规范</h3>
                <p className="text-sm text-muted">
                  将风格规范导出为 AI Rules，确保团队协作中的视觉一致性。
                </p>
              </div>
              <div className="border border-border p-6">
                <h3 className="text-xl mb-3">学习参考</h3>
                <p className="text-sm text-muted">
                  研究每个风格的设计哲学和实现细节，提升设计审美。
                </p>
              </div>
              <div className="border border-border p-6">
                <h3 className="text-xl mb-3">组件库</h3>
                <p className="text-sm text-muted">
                  直接复用预构建的 React + Tailwind 组件，加速开发流程。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl mb-6">开始探索</h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              浏览我们精选的设计风格，找到适合你项目的视觉语言。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/styles"
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
              >
                浏览风格
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm tracking-wide hover:border-foreground transition-colors"
              >
                查看组件库
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
