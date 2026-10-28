"use client";

export const dynamic = "force-static";

import { ArrowRight, Copy } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useI18n } from "@/lib/i18n/context";
import { GettingStartedSteps } from "@/components/home/getting-started-section";
import { EXAMPLE_STYLE_HREF } from "@/lib/home/getting-started";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { trackEvent } from "@/lib/analytics/events";

export default function GuidePage() {
  const { t, locale } = useI18n();
  const zh = locale === "zh";
  const { copy, result, isCopied } = useClipboard();
  const brief = zh
    ? "使用 Next.js 和 Tailwind CSS 构建响应式个人作品集。包含个人介绍、精选项目和联系方式，只使用我提供的个人与项目信息。\n\n严格遵守下方粘贴的 StyleKit 新野兽派风格规则，保持配色、排版、边框与间距一致。保留清晰的键盘焦点，并支持减少动态效果的系统偏好。\n\n[在这里粘贴从风格详情复制的硬性提示词或 AI 规则]"
    : "Build a responsive personal portfolio with Next.js and Tailwind CSS. Include an introduction, selected projects and contact details, using only the personal and project information I provide.\n\nFollow the StyleKit Neo-Brutalist rules pasted below. Keep the palette, typography, borders and spacing consistent. Preserve visible keyboard focus and respect reduced-motion preferences.\n\n[Paste the hard prompt or AI rules copied from the style page here]";
  const checks = zh
    ? ["用窄屏和桌面宽度检查布局、文字换行与内容溢出。", "用键盘操作链接、按钮与表单，检查焦点是否清晰。", "核对配色、字体、边框和间距是否符合所选风格。", "用自己的真实内容替换占位文案，并实现和测试业务逻辑。"]
    : ["Check the layout, text wrapping and overflow at mobile and desktop widths.", "Use links, buttons and forms with a keyboard and check visible focus.", "Compare colors, typography, borders and spacing with your chosen style.", "Replace placeholders with your real content, then implement and test business behavior."];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">{t("guide.badge")}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">{t("guide.heading")}</h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">{t("guide.subheading")}</p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <h2 className="sr-only">{zh ? "使用流程" : "The workflow"}</h2>
            <GettingStartedSteps locale={locale} />
          </div>
        </section>

        <section id="apply-rules" className="scroll-mt-24 border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1fr_1.3fr] md:gap-14 md:px-12 md:py-20">
            <div>
              <h2 className="mb-5 text-2xl md:text-3xl">{zh ? "跟做一次：新野兽派作品集" : "Try it: a Neo-Brutalist portfolio"}</h2>
              <ol className="list-decimal space-y-4 pl-5 text-sm leading-7 text-muted">
                <li>{zh ? "打开下方风格示例，预览配色和组件。" : "Open the style example below and review its palette and components."}</li>
                <li>{zh ? "点击详情页顶部的「复制硬性提示词」，或在「导出」区域选择工具格式。" : "Use “Copy Hard Prompt” at the top of the style page, or choose your tool format in the export section."}</li>
                <li>{zh ? "复制需求示例，将刚才的规则粘贴到占位位置，再交给你的 AI 编码工具。" : "Copy the sample brief, replace the placeholder with those rules, then use it in your AI coding tool."}</li>
              </ol>
              <LocalizedLink href={EXAMPLE_STYLE_HREF} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                {zh ? "打开新野兽派风格" : "Open the Neo-Brutalist style"}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </LocalizedLink>
              <p className="mt-5 text-xs leading-6 text-muted">{t("home.freeAccess")}</p>
            </div>
            <div className="min-w-0 border border-border">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2">
                <h3 className="text-sm">{zh ? "页面需求示例" : "Sample page brief"}</h3>
                <button
                  type="button"
                  onClick={async () => {
                    if (await copy(brief, "getting-started-brief")) {
                      trackEvent("code_copy", { slug: "neo-brutalist", language: "prompt" });
                    }
                  }}
                  className="inline-flex min-h-11 items-center gap-2 px-2 text-sm hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Copy aria-hidden="true" className="h-3.5 w-3.5" />
                  <span aria-live="polite">{isCopied("getting-started-brief", brief) ? zh ? "已复制需求示例" : "Brief copied" : zh ? "复制需求示例" : "Copy sample brief"}</span>
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words p-5 font-mono text-sm leading-7">{brief}</pre>
              <p className="border-t border-border px-5 py-4 text-xs leading-6 text-muted">{zh ? "这里是需求示例；请先填入真实风格规则。StyleKit 提供参考和素材，页面在你的工具中实现。" : "This is a sample brief. Add the actual style rules before using it. StyleKit supplies references and resources; implementation happens in your own tool."}</p>
              <ClipboardFeedback result={result?.state === "failed" ? result : null} locale={locale} currentText={brief} className="mx-5 mb-5" />
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 md:px-12 md:py-16">
            <div>
              <h2 className="mb-5 text-2xl">{zh ? "生成后，检查这四件事" : "Review these four things after building"}</h2>
              <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-muted">
                {checks.map((check) => <li key={check}>{check}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="mb-5 text-2xl">{zh ? "需要页面结构或工具接入？" : "Need a page structure or editor setup?"}</h2>
              <p className="mb-5 text-sm leading-7 text-muted">{zh ? "模板可以作为页面结构起点；其中的产品名称、价格与试用文案都是示例。已有项目可以直接复制规则，也可以查看开发者接入方式。" : "Templates offer starting structures; their product names, prices and trials are sample content. For an existing project, copy the rules directly or explore the developer setup options."}</p>
              <div className="flex flex-wrap gap-4">
                <LocalizedLink href="/templates" className="inline-flex min-h-11 items-center border border-border px-4 text-sm hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{zh ? "浏览页面模板" : "Browse page templates"}</LocalizedLink>
                <LocalizedLink href="/developers" className="inline-flex min-h-11 items-center border border-border px-4 text-sm hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{zh ? "查看开发者接入" : "View developer setup"}</LocalizedLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
