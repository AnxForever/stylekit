import { ArrowUpRight } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";

export function CommunityParticipation({ locale }: { locale: "en" | "zh" }) {
  const isZh = locale === "zh";
  const actions = [
    { href: "/styles", title: isZh ? "聊一个风格" : "Discuss a style", body: isZh ? "从精选库选择风格，提问题、给反馈，或分享实现经验。" : "Pick a style, ask a question, or share implementation feedback." },
    { href: "/submit", title: isZh ? "分享原创风格" : "Contribute a style", body: isZh ? "准备视觉描述、配色和示例。投稿通过审核后会公开展示。" : "Add a visual description, palette, and examples. Approved submissions become public." },
    { href: "/profile", title: isZh ? "查看我的投稿" : "View my contributions", body: isZh ? "登录后查看投稿进度、审核反馈和自己的评论。" : "Sign in to check review status, feedback, and your comments." },
  ];

  return (
    <aside id="participate" aria-labelledby="participation-title" className="self-start border-t border-border pt-6 lg:border-t-0 lg:pt-1">
      <h2 id="participation-title" className="font-serif text-xl">{isZh ? "让你的经验被看见" : "Put your experience to work"}</h2>
      <ul className="mt-4 divide-y divide-border">
        {actions.map((action) => (
          <li key={action.href} className="py-4">
            <LocalizedLink href={action.href} className="inline-flex min-h-9 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">
              {action.title}<ArrowUpRight className="size-4" aria-hidden="true" />
            </LocalizedLink>
            <p className="mt-1 text-xs leading-6 text-muted">{action.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-border pt-5">
        <h3 className="text-sm font-medium">{isZh ? "好的交流，从具体开始" : "Keep the conversation useful"}</h3>
        <p className="mt-2 text-xs leading-6 text-muted">
          {isZh ? "说明使用场景、遇到的问题和试过的做法。尊重原创与署名，不发布广告、密钥或个人敏感信息。" : "Describe the context, the problem, and what you tried. Credit original work. Do not post spam, credentials, or sensitive personal information."}
        </p>
      </div>
    </aside>
  );
}
