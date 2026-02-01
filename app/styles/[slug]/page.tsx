import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ComponentPreview } from "@/components/style-preview/component-preview";
import { ColorPalette } from "@/components/style-preview/color-palette";
import { RulesExporter } from "@/components/style-preview/rules-exporter";
import { CodeBlock } from "@/components/style-preview/code-block";
import { getStyleBySlug, styles } from "@/lib/styles";

// 生成静态参数
export function generateStaticParams() {
  return styles.map((style) => ({
    slug: style.slug,
  }));
}

// 动态 metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);
  if (!style) {
    return { title: "风格未找到 — StyleKit" };
  }
  return {
    title: `${style.name} (${style.nameEn}) — StyleKit`,
    description: style.description,
  };
}

export default async function StyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);

  if (!style) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="flex items-center gap-2 text-sm text-muted mb-4">
              <Link href="/styles" className="hover:text-foreground transition-colors">
                风格目录
              </Link>
              <span>/</span>
              <span>{style.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl mb-2">
                  {style.name}
                </h1>
                <p className="text-xl text-muted mb-6">{style.nameEn}</p>
                <p className="text-lg text-muted leading-relaxed mb-6">
                  {style.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {style.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-3 py-1 bg-zinc-100 text-muted"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/styles/${style.slug}/showcase`}
                  className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  查看完整 Showcase →
                </Link>
              </div>

              {/* Color Palette */}
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  配色方案
                </p>
                <ColorPalette colors={style.colors} />
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              设计哲学
            </p>
            <div className="max-w-3xl">
              <div className="prose prose-lg">
                {style.philosophy.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {/* Do's */}
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  必须做 / Do&apos;s
                </p>
                <ul className="space-y-3">
                  {style.doList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  禁止做 / Don&apos;ts
                </p>
                <ul className="space-y-3">
                  {style.dontList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-red-600 mt-1">✗</span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Component Preview */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              组件模板
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">组件预览</h2>
            <ComponentPreview components={style.components} />
          </div>
        </section>

        {/* Global CSS */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              全局样式
            </p>
            <h2 className="text-2xl md:text-3xl mb-8">Global CSS</h2>
            <CodeBlock code={style.globalCss} language="css" />
          </div>
        </section>

        {/* AI Rules Export */}
        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              导出
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">AI Rules</h2>
            <p className="text-muted mb-8 max-w-2xl">
              将以下规则导出并添加到你的 AI 编码助手中，让它按照 {style.name} 风格生成代码。
            </p>
            <RulesExporter
              aiRules={style.aiRules}
              globalCss={style.globalCss}
              styleName={style.name}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
