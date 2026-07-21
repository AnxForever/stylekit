import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Frontend Design Foundations",
  description: "Read the frontend design foundations series on AnxForever's blog.",
};

const articles = [
  ["色彩理论", "HSL、配色关系、对比度与语义色", "frontend-foundations-color-theory"],
  ["字体与排版", "字体分类、配对方法与可读性", "frontend-foundations-typography"],
  ["字号阶梯", "用模块化比例建立稳定的文字层级", "frontend-foundations-type-scale"],
  ["间距与网格", "用 4/8 点系统统一页面节奏", "frontend-foundations-spacing"],
  ["设计四原则", "对比、重复、对齐与亲密性", "frontend-foundations-design-principles"],
  ["视觉层次", "通过大小、字重、颜色和留白引导视线", "frontend-foundations-visual-hierarchy"],
] as const;

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">AnxForever Blog</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            前端设计基础已迁移到我的博客
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            StyleKit 专注于可直接使用的风格、模板和设计工具。色彩、排版、间距等理论内容，
            现在统一在 AnxForever 博客持续整理和更新。
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {articles.map(([title, description, slug]) => (
              <Link
                key={slug}
                href={`https://anxforever.cn/blog/${slug}`}
                className="group flex items-start justify-between gap-5 rounded-xl border border-border p-6 transition-colors hover:border-foreground"
              >
                <span>
                  <span className="block text-lg font-semibold">{title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{description}</span>
                </span>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            ))}
          </div>

          <Link
            href="https://anxforever.cn"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background"
          >
            进入 AnxForever 博客
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
