import { notFound } from "next/navigation";
import Link from "next/link";
import { ScrollBackButton } from "@/components/scroll-back-button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ComponentPreview } from "@/components/style-preview/component-preview";
import { ColorPalette } from "@/components/style-preview/color-palette";
import { RulesExporter } from "@/components/style-preview/rules-exporter";
import { CodeBlock } from "@/components/style-preview/code-block";
import { TokensExportButton } from "@/components/tokens-export-button";
import { ExamplePrompts } from "@/components/style-preview/example-prompts";
import { QuickStartGuide } from "@/components/style-preview/quick-start-guide";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { StylePackExport } from "@/components/style-preview/style-pack-export";
import { DisableAutoScroll } from "@/components/style-preview/disable-auto-scroll";
import { getStyleBySlug, styles } from "@/lib/styles";
import { getStyleTokens, hasStyleTokens } from "@/lib/styles/tokens-registry";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";

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

      <DisableAutoScroll>
        <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <div className="flex items-center gap-4 mb-4">
              <ScrollBackButton label="返回目录" href="/styles" />
              <div className="flex items-center gap-2 text-sm text-muted">
                <Link href="/styles" className="hover:text-foreground transition-colors">
                  风格目录
                </Link>
                <span>/</span>
                <span>{style.name}</span>
              </div>
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

                <div className="flex flex-wrap gap-4 mt-6">
                  <Link
                    href={`/styles/${style.slug}/showcase`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                  >
                    查看完整 Showcase →
                  </Link>
                  <TokensExportButton style={style} />
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-4">
                  配色方案
                </p>
                <ColorPalette colors={style.colors} />
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="mt-12">
              <QuickStartGuide
                aiRules={style.aiRules}
                styleName={style.name}
              />
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
                      <span className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center text-white text-xs mt-0.5">+</span>
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
                      <span className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-white text-xs mt-0.5">-</span>
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

        {/* Example Prompts */}
        {style.examplePrompts && style.examplePrompts.length > 0 && (
          <section className="border-b border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                快速开始
              </p>
              <h2 className="text-2xl md:text-3xl mb-4">示例 Prompts</h2>
              <p className="text-muted mb-8 max-w-2xl">
                复制这些经过验证的 Prompt，快速开始用 AI 生成 {style.name} 风格的界面。
              </p>
              <ExamplePrompts
                prompts={style.examplePrompts}
                styleName={style.name}
                aiRules={style.aiRules}
              />
            </div>
          </section>
        )}

        {/* Compatible Styles (for layout patterns only) */}
        {style.styleType === "layout" && style.compatibleWith && style.compatibleWith.length > 0 && (
          <section className="border-b border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                兼容的视觉风格
              </p>
              <h2 className="text-2xl md:text-3xl mb-4">试试搭配</h2>
              <p className="text-muted mb-8 max-w-2xl">
                {style.name} 是一种布局模式，可以与以下视觉风格搭配使用。
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {style.compatibleWith.map((compatSlug) => {
                  const compatStyle = getStyleBySlug(compatSlug);
                  if (!compatStyle) return null;
                  return (
                    <Link
                      key={compatSlug}
                      href={`/styles/${compatSlug}`}
                      className="group block border border-border hover:border-foreground transition-colors"
                    >
                      <div className="aspect-square overflow-hidden">
                        <StyleCoverPreview styleSlug={compatSlug} />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium group-hover:text-accent transition-colors">
                          {compatStyle.name}
                        </p>
                        <p className="text-xs text-muted">{compatStyle.nameEn}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Style Pack Export */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Style Pack
            </p>
            <h2 className="text-2xl md:text-3xl mb-4">导出风格包</h2>
            <p className="text-muted mb-8 max-w-2xl">
              获取完整的可机器读取风格资源，包括 Design Tokens、Tailwind 预设、CSS 变量和 shadcn/ui 主题。
            </p>
            <StylePackExport style={style} />
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
              enhancedRules={
                hasStyleTokens(slug)
                  ? generateEnhancedAIRules({
                      style,
                      tokens: getStyleTokens(slug)!,
                      format: "full",
                    })
                  : null
              }
            />
          </div>
        </section>
      </main>
      </DisableAutoScroll>

      <Footer />
    </div>
  );
}
