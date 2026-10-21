import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { getRequestLocaleContext } from "@/lib/i18n/request";
import { localizeHref } from "@/lib/i18n/routing";
import {
  COMMUNITY_GROUP,
  resolveCommunityGroupDestination,
  type CommunityGroupPlatform,
} from "@/lib/community/join";

// The locale comes from request headers, so this page cannot be prerendered.
export const dynamic = "force-dynamic";

const COPY = {
  en: {
    home: "Home",
    community: "Community",
    chat: "Chat group",
    eyebrow: "Community / Chat",
    title: "Community chat",
    intro:
      "A slower place to talk about interface work. Bring the page you are building, say where it is stuck, and get specific feedback. The group is for craft, not promotion.",
    open: "Open",
    preparing: "Preparing",
    whatTitle: "What the group is for",
    what: [
      "Interface details: spacing, hierarchy, colour, and motion trade-offs",
      "Implementation questions: Tailwind, component boundaries, browser differences",
      "Early feedback on a style before you submit it to the catalog",
    ],
    rulesTitle: "Before you join",
    rules: [
      "Bring a screenshot, a code snippet, or a reproducible link",
      "Credit original work, and ask before reposting someone else's",
      "No ads, credentials, or other people's personal information",
      "The feedback form works too if you would rather not join",
    ],
    preparingTitle: "The group is being set up",
    preparingBody:
      "The rules and moderation rota are still being written. Leave your email and you will hear when it opens.",
    unavailableTitle: "Joining is temporarily unavailable",
    unavailableBody:
      "The invite is being updated. Use the feedback form and we will help you from there.",
    feedback: "Send feedback",
    browse: "Browse community styles",
    submit: "Submit a style",
    inviteCta: "Open the invite",
    inviteNote: "The invite opens in a new tab.",
    qrAlt: "QR code for the StyleKit community chat",
    qrHint:
      "Scan with the platform's app to join. The code is replaced regularly, so come back here if it has expired.",
    qrExpires: (date: string) => `This code is valid until ${date}.`,
  },
  zh: {
    home: "首页",
    community: "社区",
    chat: "交流群",
    eyebrow: "社区 / 交流群",
    title: "交流群",
    intro:
      "一个慢一点的讨论区。贴出你正在做的页面，说明卡在哪里，得到具体的反馈。这里聊的是手艺，不做推广。",
    open: "开放中",
    preparing: "筹备中",
    whatTitle: "在群里聊什么",
    what: [
      "界面细节：间距、层级、配色和动效的具体取舍",
      "实现问题：Tailwind、组件拆分、浏览器差异",
      "投稿前的早期反馈：在正式提交前先听一轮意见",
    ],
    rulesTitle: "加入前请知道",
    rules: [
      "提问请带上截图、代码片段或可复现的链接",
      "尊重原创与署名，转载他人的内容先征得同意",
      "不发布广告、密钥或他人的个人信息",
      "不想进群也没关系，反馈渠道同样有效",
    ],
    preparingTitle: "交流群正在准备中",
    preparingBody:
      "群规则和值班安排还在确定。留下邮箱，开放时你会收到通知。",
    unavailableTitle: "暂时无法加入",
    unavailableBody:
      "邀请方式正在更新。你可以先通过反馈渠道联系我们，我们会继续帮你。",
    feedback: "发送反馈",
    browse: "浏览社区风格",
    submit: "投稿一个风格",
    inviteCta: "打开邀请链接",
    inviteNote: "邀请链接会在新标签页打开。",
    qrAlt: "StyleKit 交流群二维码",
    qrHint:
      "请用对应 App 扫码加入。二维码会定期更换，过期后请回到本页查看。",
    qrExpires: (date: string) => `此二维码有效期至 ${date}。`,
  },
} as const;

const PLATFORM_NAMES: Record<CommunityGroupPlatform, { en: string; zh: string }> = {
  wechat: { en: "WeChat group", zh: "微信群" },
  qq: { en: "QQ group", zh: "QQ 群" },
  discord: { en: "Discord", zh: "Discord" },
  telegram: { en: "Telegram", zh: "Telegram" },
};

function formatDate(value: string | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, canonicalUrl, languageAlternates, openGraphLocale } =
    await getRequestLocaleContext();
  const isZh = locale === "zh";
  const title = isZh
    ? "StyleKit 交流群：和设计师、开发者聊界面"
    : "StyleKit community chat: interface work with designers and developers";

  return {
    // The shared community segment has no title template of its own.
    title: { absolute: `${isZh ? "交流群" : "Community chat"} | StyleKit` },
    description: COPY[isZh ? "zh" : "en"].intro,
    robots: { index: true, follow: true },
    alternates: { canonical: canonicalUrl, languages: languageAlternates },
    openGraph: {
      title: `${title} | StyleKit`,
      description: COPY[isZh ? "zh" : "en"].intro,
      url: canonicalUrl,
      siteName: "StyleKit",
      type: "website",
      locale: openGraphLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | StyleKit`,
      description: COPY[isZh ? "zh" : "en"].intro,
    },
  };
}

export default async function CommunityJoinPage() {
  const { locale } = await getRequestLocaleContext();
  const isZh = locale === "zh";
  const t = COPY[isZh ? "zh" : "en"];
  const destination = resolveCommunityGroupDestination(COMMUNITY_GROUP);
  const platformName = PLATFORM_NAMES[COMMUNITY_GROUP.platform][isZh ? "zh" : "en"];
  const expiresAt = formatDate(COMMUNITY_GROUP.qrExpiresAt);
  const isPreparing = COMMUNITY_GROUP.status !== "live";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:px-12 md:py-12">
          <Breadcrumb
            items={[
              { label: t.home, href: localizeHref("/", locale) },
              { label: t.community, href: localizeHref("/community", locale) },
              { label: t.chat },
            ]}
          />

          <header className="mb-12 mt-7 border-b border-border pb-8 md:mb-14 md:pb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
              {t.eyebrow}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
              <h1 className="font-serif text-3xl leading-tight sm:text-4xl">
                {t.title}
              </h1>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                <span
                  className={`size-1.5 rounded-full ${
                    destination.kind === "pending" ? "bg-muted" : "bg-foreground"
                  }`}
                  aria-hidden="true"
                />
                {destination.kind === "pending" ? t.preparing : t.open}
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              {t.intro}
            </p>
          </header>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_20rem] md:gap-14">
            <div className="space-y-10">
              <section aria-labelledby="group-purpose">
                <h2 id="group-purpose" className="font-serif text-xl">
                  {t.whatTitle}
                </h2>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {t.what.map((item, index) => (
                    <li key={item} className="flex gap-4 py-4 text-sm leading-7">
                      <span className="font-mono text-[11px] tabular-nums text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="group-rules">
                <h2 id="group-rules" className="font-serif text-xl">
                  {t.rulesTitle}
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                  {t.rules.map((rule) => (
                    <li key={rule} className="flex gap-3">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-border" aria-hidden="true" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside aria-label={t.chat} className="self-start border border-border p-6">
              {destination.kind === "pending" ? (
                <>
                  <h2 className="font-serif text-xl">
                    {isPreparing ? t.preparingTitle : t.unavailableTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {isPreparing ? t.preparingBody : t.unavailableBody}
                  </p>
                  <div className="mt-6 space-y-3">
                    <LocalizedLink
                      href="/contact#feedback"
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                    >
                      {t.feedback}
                    </LocalizedLink>
                    {isPreparing ? (
                      <div className="pt-2">
                        <NewsletterSignup variant="inline" />
                      </div>
                    ) : null}
                  </div>
                </>
              ) : destination.kind === "invite" ? (
                <>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {platformName}
                  </p>
                  <h2 className="mt-3 font-serif text-xl">{t.title}</h2>
                  <a
                    href={destination.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                  >
                    {t.inviteCta}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                  <p className="mt-3 text-xs leading-6 text-muted">{t.inviteNote}</p>
                </>
              ) : (
                <>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {platformName}
                  </p>
                  <div className="mt-4 border border-border bg-white p-3">
                    <Image
                      src={destination.src}
                      alt={t.qrAlt}
                      width={280}
                      height={280}
                      className="h-auto w-full"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted">{t.qrHint}</p>
                  {expiresAt ? (
                    <p className="mt-2 text-xs leading-6 text-muted">
                      {t.qrExpires(expiresAt)}
                    </p>
                  ) : null}
                </>
              )}

              <nav className="mt-6 flex flex-col gap-3 border-t border-border pt-5 text-sm">
                <LocalizedLink
                  href="/community"
                  className="inline-flex min-h-9 items-center gap-2 underline-offset-4 hover:underline"
                >
                  {t.browse}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </LocalizedLink>
                <LocalizedLink
                  href="/submit"
                  className="inline-flex min-h-9 items-center gap-2 underline-offset-4 hover:underline"
                >
                  {t.submit}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </LocalizedLink>
              </nav>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
