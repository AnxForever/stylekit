import { ArrowUpRight, MessageSquare } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { CommunityRetryButton } from "@/components/community/community-retry-button";
import type { CommunityDiscussionsResult } from "@/lib/community/discussions";
import { getStyleMetaBySlug } from "@/lib/styles/meta";

const STARTERS = [
  { slug: "neo-brutalist", en: "How do you balance bold borders with readable content?", zh: "强边框和内容可读性，怎么平衡？" },
  { slug: "glassmorphism", en: "How do you keep text legible over a glass surface?", zh: "玻璃表面上的文字，怎么保持清晰？" },
  { slug: "dark-mode", en: "Which surface and text colors worked in your project?", zh: "你的项目里，哪些背景和文字配色更好用？" },
] as const;

export function CommunityDiscussions({
  result,
  locale,
}: {
  result: CommunityDiscussionsResult;
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";

  return (
    <section id="discussions" aria-labelledby="discussions-title" className="min-w-0 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
        <div>
          <h2 id="discussions-title" className="font-serif text-2xl sm:text-3xl">
            {isZh ? "风格讨论" : "Style discussions"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {isZh ? "最近的公开留言按风格汇总，直接进入具体评论继续交流。" : "Recent public comments grouped by style, with a direct path back to the latest message."}
          </p>
        </div>
        <LocalizedLink href="/styles" className="inline-flex min-h-10 items-center gap-1 text-sm underline-offset-4 hover:underline">
          {isZh ? "选择一个风格" : "Choose a style"}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </LocalizedLink>
      </div>

      {result.status === "unavailable" ? (
        <div className="py-7" role="status">
          <p className="font-medium">{isZh ? "讨论暂时无法加载" : "Discussions are temporarily unavailable"}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            {isZh ? "这不代表没有讨论。可以重试，或先打开感兴趣的风格页。" : "This does not mean there are no discussions. Retry, or open a style to explore its feedback."}
          </p>
          <CommunityRetryButton locale={locale} />
        </div>
      ) : result.items.length > 0 ? (
        <ol className="divide-y divide-border">
          {result.items.map((item) => (
            <li key={item.id} className="py-6">
              <article>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <h3 className="text-base font-medium">
                    <LocalizedLink href={item.href} className="underline-offset-4 hover:underline">
                      {isZh ? item.style.name : item.style.nameEn || item.style.name}
                    </LocalizedLink>
                  </h3>
                  <time dateTime={item.createdAt} className="text-xs tabular-nums text-muted">
                    {new Intl.DateTimeFormat(isZh ? "zh-CN" : "en-US", {
                      year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
                    }).format(new Date(item.createdAt))}
                  </time>
                </div>
                <p className="mt-3 line-clamp-3 whitespace-pre-wrap break-words text-sm leading-7 text-foreground/90">{item.content}</p>
                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted">
                      {isZh ? "最近留言" : "Latest by"} {item.authorName || (isZh ? "社区成员" : "Community member")}
                    </p>
                    <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
                      <div className="flex gap-1.5">
                        <dt>{isZh ? "近期留言" : "Recent messages"}</dt>
                        <dd className="font-medium tabular-nums text-foreground">{item.messageCount}</dd>
                      </div>
                      <div className="flex gap-1.5">
                        <dt>{isZh ? "署名参与者" : "Named contributors"}</dt>
                        <dd className="font-medium tabular-nums text-foreground">{item.authorCount}</dd>
                      </div>
                    </dl>
                  </div>
                  <LocalizedLink href={item.href} className="inline-flex min-h-9 items-center gap-1.5 text-foreground underline-offset-4 hover:underline">
                    <MessageSquare className="size-3.5" aria-hidden="true" />
                    {isZh ? "打开最近留言" : "Open latest comment"}
                  </LocalizedLink>
                </div>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <div className="py-7">
          <h3 className="text-base font-medium">{isZh ? "还没有公开讨论，来聊第一个问题。" : "No public discussions yet. Start with a real question."}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            {isZh ? "不必先投稿。在任意风格页登录后，就能分享使用体验或提出建议。" : "You do not need to submit a style first. Sign in on any style page to share an experience or suggestion."}
          </p>
        </div>
      )}

      <div className="border-t border-border pt-5">
        <h3 className="text-sm font-medium">{isZh ? "也可以从这些问题开始" : "A few places to start"}</h3>
        <p className="mt-1 text-xs leading-5 text-muted">{isZh ? "以下是讨论建议，不是已发布的帖子。" : "Suggested questions, not published posts."}</p>
        <ul className="mt-3 divide-y divide-border">
          {STARTERS.map((starter) => {
            const style = getStyleMetaBySlug(starter.slug);
            if (!style) return null;
            return (
              <li key={starter.slug}>
                <LocalizedLink href={`/styles/${starter.slug}#style-feedback`} className="group flex items-start gap-3 py-4">
                  <span className="mt-1 size-5 shrink-0 rounded border border-border" style={{ backgroundColor: style.colors.primary }} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium group-hover:underline underline-offset-4">{isZh ? style.name : style.nameEn}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted">{starter[locale]}</span>
                  </span>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted" aria-hidden="true" />
                </LocalizedLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
