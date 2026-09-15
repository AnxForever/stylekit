import {
  DASHBOARD_PROMPT_CHECKLIST,
  DASHBOARD_PROMPT_COMPARISON,
  DASHBOARD_REFERENCE_REVIEWED_AT,
  DASHBOARD_SOURCES,
} from "@/lib/seo/dashboard-reference";
import type { Locale } from "@/lib/i18n/translations";

export function DashboardPromptGuide({
  locale,
  promptCount,
}: {
  locale: Locale;
  promptCount: number;
}) {
  const isZh = locale === "zh";

  return (
    <section className="border-b border-border" aria-labelledby="dashboard-prompt-guide-title">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          {isZh ? "直接答案" : "Quick answer"}
        </p>
        <div className="max-w-3xl">
          <h2 id="dashboard-prompt-guide-title" className="text-2xl md:text-3xl">
            {isZh
              ? `${promptCount} 条可复制的仪表盘 UI 提示词`
              : `${promptCount} copy-paste dashboard UI prompts`}
          </h2>
          <p className="mt-4 leading-7 text-muted">
            {isZh
              ? `本页提供 ${promptCount} 条适用于 ChatGPT、Claude、Cursor 和 v0 的仪表盘提示词，覆盖数据分析、后台管理、财务、移动端、运维和人事场景。每条都可以直接复制，再替换成你的用户、数据和技术栈。`
              : `This page contains ${promptCount} dashboard prompts for ChatGPT, Claude, Cursor, and v0, covering analytics, admin, finance, mobile, operations, and HR interfaces. Copy one, then replace its audience, data, and stack with your project details.`}
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-16">
          <div>
            <h3 className="text-lg font-medium">
              {isZh ? "写提示词时要交代的 6 件事" : "Six details a useful prompt should include"}
            </h3>
            <ol className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {DASHBOARD_PROMPT_CHECKLIST.map((item, index) => (
                <li key={item.en} className="flex gap-3 border-t border-border pt-4 text-sm leading-6">
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{isZh ? item.zh : item.en}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="border border-border p-5" aria-labelledby="dashboard-method-title">
            <h3 id="dashboard-method-title" className="text-sm font-medium">
              {isZh ? "编写方法与使用限制" : "Method and limits"}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {isZh
                ? "这些模板由 StyleKit 按“任务、数据、布局、交互、无障碍、输出”六项人工编辑，用作起点，并不是对模型输出质量的基准测试。生成后仍需核对真实数据、图表刻度、权限、键盘操作和不同屏幕尺寸。"
                : "StyleKit edits these templates around six fields: task, data, layout, interaction, accessibility, and output. They are starting points, not model-quality benchmarks. Verify real data, chart scales, permissions, keyboard behavior, and screen sizes after generation."}
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              {isZh ? "来源复核" : "Sources reviewed"} {DASHBOARD_REFERENCE_REVIEWED_AT}
            </p>
          </aside>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-medium">
            {isZh ? "模糊要求与可执行提示词对比" : "Vague request versus implementation-ready prompt"}
          </h3>
          <div className="mt-5 grid border border-border md:grid-cols-2">
            <div className="border-b border-border p-5 md:border-b-0 md:border-r">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {isZh ? "信息不足" : "Too vague"}
              </p>
              <p className="mt-3 text-sm leading-7">{isZh ? DASHBOARD_PROMPT_COMPARISON.vague.zh : DASHBOARD_PROMPT_COMPARISON.vague.en}</p>
            </div>
            <div className="p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {isZh ? "可执行版本" : "Implementation-ready"}
              </p>
              <p className="mt-3 text-sm leading-7">{isZh ? DASHBOARD_PROMPT_COMPARISON.specific.zh : DASHBOARD_PROMPT_COMPARISON.specific.en}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <h3 className="text-sm font-medium">{isZh ? "参考来源" : "Primary references"}</h3>
          <ul className="mt-4 grid gap-4 md:grid-cols-3">
            {DASHBOARD_SOURCES.map((source) => (
              <li key={source.href} className="text-sm leading-6">
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4 hover:text-muted"
                >
                  {source.name}
                </a>
                <p className="mt-1 text-xs leading-5 text-muted">{isZh ? source.zh : source.en}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
