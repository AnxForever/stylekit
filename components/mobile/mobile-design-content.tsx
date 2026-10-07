"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Search, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { localizeHref } from "@/lib/i18n/routing";
import { mobileLibraries } from "@/lib/mobile/catalog";
import { buildMobileBrief, filterMobileLibraries, mobilePlatforms } from "@/lib/mobile/helpers";
import { mobileGuidelines, mobilePatterns } from "@/lib/mobile/patterns";
import type { LocalizedText, MobileLibrary, MobilePlatform, MobileScenario } from "@/lib/mobile/types";
import { PhonePreview } from "./phone-preview";

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const availablePlatforms = mobilePlatforms.filter((entry) =>
  filterMobileLibraries(mobileLibraries, entry.id, "").length > 0,
);
const checkedAt = mobileLibraries.map((library) => library.checkedAt).sort()[0];

function LibraryEntry({ library, locale }: { library: MobileLibrary; locale: "zh" | "en" }) {
  const text = (value: LocalizedText) => value[locale];
  const zh = locale === "zh";
  return (
    <article
      id={`library-${library.id}`}
      data-mobile-library={library.id}
      className="grid gap-5 border-t border-border py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10"
    >
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-2xl tracking-tight">{library.name}</h3>
          <span className="rounded border border-border px-2 py-1 text-xs text-muted">{library.license}</span>
        </div>
        <p className="mb-3 text-sm font-medium">
          {library.platforms.map((platform) => mobilePlatforms.find((entry) => entry.id === platform)?.label).join(" / ")}
        </p>
        <p className="max-w-xl text-sm leading-7 text-muted">{text(library.summary)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {library.components.map((component) => (
            <span key={component.en} className="rounded-full bg-foreground/[0.05] px-3 py-1 text-xs">
              {text(component)}
            </span>
          ))}
        </div>
      </div>
      <div className="min-w-0">
        <dl className="space-y-3 text-sm leading-7">
          <div>
            <dt className="font-medium">{zh ? "什么时候选" : "Choose it for"}</dt>
            <dd className="text-muted">{text(library.bestFor)}</dd>
          </div>
          <div>
            <dt className="font-medium">{zh ? "接入前确认" : "Before you integrate"}</dt>
            <dd className="text-muted">{text(library.caution)}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
          <a
            href={library.docs}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-current ${focusRing}`}
            aria-label={`${library.name} ${zh ? "官方文档（新窗口）" : "documentation (new tab)"}`}
          >
            {zh ? "官方文档" : "Documentation"}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={library.repository}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-foreground ${focusRing}`}
            aria-label={`${library.name} GitHub ${zh ? "仓库（新窗口）" : "repository (new tab)"}`}
          >
            GitHub<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function MobileDesignContent() {
  const { locale } = useI18n();
  const zh = locale === "zh";
  const text = (value: LocalizedText) => value[locale];
  const [scenario, setScenario] = useState<MobileScenario>("reading");
  const [platform, setPlatform] = useState<MobilePlatform | "all">("all");
  const [query, setQuery] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const pattern = mobilePatterns.find((entry) => entry.id === scenario) ?? mobilePatterns[0];
  const libraries = filterMobileLibraries(mobileLibraries, platform, query);
  const brief = buildMobileBrief(pattern, locale, platform, mobileLibraries);

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div data-cursor-aura="off" data-mobile-design>
      <section className="border-b border-border" aria-labelledby="mobile-title">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-12 md:py-16">
          <nav aria-label={zh ? "面包屑" : "Breadcrumb"} className="mb-6 flex items-center gap-3 text-sm text-muted">
            <Link href={localizeHref("/resources", locale)} className={`inline-flex min-h-11 items-center hover:text-foreground ${focusRing}`}>
              {zh ? "设计资源" : "Design resources"}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{zh ? "移动端设计" : "Mobile design"}</span>
          </nav>
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 id="mobile-title" className="mb-4 text-4xl tracking-tight sm:text-5xl md:text-6xl">
                {zh ? "移动端设计" : "Designed for mobile"}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
                {zh
                  ? "从一块小屏幕开始：试试常见交互，找到合适的开源组件，再把设计要求带进你的项目。"
                  : "Start with a small screen. Try the interactions, choose your open-source components, and take a clear design brief into your project."}
              </p>
            </div>
            <a href="#mobile-libraries" className={`inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-foreground px-5 text-sm font-medium hover:bg-foreground hover:text-background ${focusRing}`}>
              {zh ? "选择开源组件" : "Find components"}
            </a>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
            <div className="min-w-0">
              <div role="group" aria-label={zh ? "设计场景" : "Design scenario"} className="mb-8 flex flex-wrap gap-2">
                {mobilePatterns.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    aria-pressed={scenario === entry.id}
                    aria-controls="mobile-scenario"
                    onClick={() => { setScenario(entry.id); setCopyState("idle"); }}
                    className={`min-h-11 rounded-full border px-4 text-sm transition-colors motion-reduce:transition-none ${focusRing} ${scenario === entry.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                  >
                    {text(entry.name)}
                  </button>
                ))}
              </div>
              <div id="mobile-scenario">
                <h2 className="mb-4 text-3xl leading-tight sm:text-4xl">{text(pattern.title)}</h2>
                <p className="max-w-lg text-base leading-8 text-muted">{text(pattern.description)}</p>
                <ul className="my-7 space-y-3">
                  {pattern.structure.map((item) => (
                    <li key={item.en} className="flex items-start gap-3 text-sm leading-6">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{text(item)}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={localizeHref(`/styles/${pattern.styleSlug}`, locale)}
                  className={`inline-flex min-h-11 items-center text-sm underline decoration-border underline-offset-4 hover:decoration-current ${focusRing}`}
                >
                  {zh ? "搭配风格：" : "Pair with: "}{text(pattern.styleName)}
                </Link>
                <p className="mt-5 max-w-md text-xs leading-6 text-muted">
                  {zh
                    ? "手机预览为 StyleKit 自编的 Web 交互示例，所有操作使用本地数据。它不是下方组件库的官方演示。"
                    : "This is a StyleKit-authored web prototype with local data, not an official demo of the libraries below."}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 justify-center rounded-[2rem] bg-foreground/[0.035] px-3 py-7 sm:px-7 sm:py-9">
              <PhonePreview key={scenario} scenario={scenario} locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section id="mobile-libraries" aria-labelledby="libraries-title" className="scroll-mt-8">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-12 md:py-16">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="libraries-title" className="mb-3 text-3xl sm:text-4xl">{zh ? "选对组件，再开始写。" : "Choose the right building blocks."}</h2>
              <p className="max-w-2xl text-sm leading-7 text-muted">
                {zh
                  ? "Web、React Native 和 SwiftUI 分开选型。这里列出可借鉴的组件、适用场景和接入限制，不用热度代替判断。"
                  : "Choose web, React Native, and SwiftUI tools separately. Compare useful components, project fit, and integration constraints."}
              </p>
            </div>
            <p className="shrink-0 text-xs text-muted">{zh ? "资料核验" : "Sources checked"} <time dateTime={checkedAt}>{checkedAt}</time></p>
          </div>
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label={zh ? "组件技术栈" : "Component platform"}>
            {availablePlatforms.map((entry) => (
              <button
                type="button"
                key={entry.id}
                aria-pressed={platform === entry.id}
                onClick={() => { setPlatform(entry.id); setCopyState("idle"); }}
                className={`min-h-11 rounded-md border px-3 text-sm transition-colors motion-reduce:transition-none ${focusRing} ${platform === entry.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
              >
                {entry.id === "all" ? (zh ? "全部平台" : "All platforms") : entry.label}
              </button>
            ))}
          </div>
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
              <label htmlFor="mobile-library-search" className="sr-only">{zh ? "搜索组件库" : "Search libraries"}</label>
              <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-muted" />
              <input
                id="mobile-library-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={zh ? "搜索名称、组件或使用场景" : "Search names, components, or use cases"}
                className={`h-11 w-full rounded-md border border-border bg-background pl-10 pr-12 text-base placeholder:text-muted [&::-webkit-search-cancel-button]:appearance-none ${focusRing}`}
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label={zh ? "清空搜索" : "Clear search"} className={`absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded text-muted hover:text-foreground ${focusRing}`}>
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <p role="status" aria-live="polite" className="text-sm text-muted">
              {zh ? `${libraries.length} 个推荐项目` : `${libraries.length} recommended projects`}
            </p>
          </div>
          <div>
            {libraries.map((library) => <LibraryEntry key={library.id} library={library} locale={locale} />)}
            {libraries.length === 0 && (
              <div className="border-y border-border py-12 text-center">
                <h3 className="mb-2 text-xl">{zh ? "没有找到匹配的组件库" : "No matching libraries"}</h3>
                <p className="mb-5 text-sm text-muted">{zh ? "换一个关键词，或查看其他技术栈。" : "Try another keyword or explore a different platform."}</p>
                <button type="button" onClick={() => { setQuery(""); setPlatform("all"); setCopyState("idle"); }} className={`min-h-11 rounded-full border border-border px-5 text-sm ${focusRing}`}>
                  {zh ? "重置筛选" : "Reset filters"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="mobile-checks-title" className="border-y border-border bg-foreground/[0.025]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-12">
          <h2 id="mobile-checks-title" className="mb-8 text-3xl">{zh ? "好看之后，还要好用。" : "Go beyond how it looks."}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {mobileGuidelines.map((guide) => (
              <div key={guide.source}>
                <h3 className="mb-3 text-xl">{text(guide.title)}</h3>
                <p className="text-sm leading-7 text-foreground/75">{text(guide.body)}</p>
                <a href={guide.url} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-flex min-h-11 items-center gap-2 text-sm underline decoration-border underline-offset-4 ${focusRing}`}>
                  {guide.source}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">{zh ? "（新窗口）" : " (new tab)"}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="mobile-brief-title">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 id="mobile-brief-title" className="mb-3 text-3xl">{zh ? "把这套要求带走。" : "Take the brief with you."}</h2>
              <p className="max-w-2xl text-sm leading-7 text-muted">
                {zh ? "内容跟随上方场景和技术栈选择，包含结构、验收要求与候选库。可以交给开发者或 AI 编程助手。" : "Your selected scenario and platform shape the structure, acceptance checks, and library candidates. Share it with a developer or coding assistant."}
              </p>
              <p className="mt-2 text-sm font-medium">{text(pattern.name)} / {platform === "all" ? (zh ? "平台待定" : "Platform to confirm") : mobilePlatforms.find((entry) => entry.id === platform)?.label}</p>
            </div>
            <button type="button" onClick={copyBrief} className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm text-background ${focusRing}`}>
              {copyState === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copyState === "copied" ? (zh ? "已复制" : "Copied") : (zh ? "复制开发要求" : "Copy brief")}
            </button>
          </div>
          <p role="status" aria-live="polite" className={`mb-3 text-sm ${copyState === "error" ? "text-accent" : "text-muted"}`}>
            {copyState === "error" ? (zh ? "剪贴板不可用，请选中下方文本手动复制。" : "Clipboard unavailable. Select and copy the text below.") : copyState === "copied" ? (zh ? "当前场景和技术栈的开发要求已复制。" : "The brief for your selected scenario and platform has been copied.") : ""}
          </p>
          <details open={copyState === "error" || undefined} className="rounded-lg border border-border">
            <summary className={`min-h-11 cursor-pointer px-5 py-3 text-sm ${focusRing}`}>{zh ? "查看完整开发要求" : "Read the full brief"}</summary>
            <pre className="max-h-[32rem] overflow-y-auto whitespace-pre-wrap break-words border-t border-border p-5 font-sans text-sm leading-7">{brief}</pre>
          </details>
        </div>
      </section>
    </div>
  );
}
