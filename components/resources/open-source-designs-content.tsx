import Image from "next/image";
import { ArrowUpRight, BookOpen, CodeXml, FileKey2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { openSourceDesignSites } from "@/lib/resources/open-source-designs";

export function OpenSourceDesignsContent() {
  const { locale } = useI18n();
  const zh = locale === "zh";

  return (
    <section aria-labelledby="open-source-designs-title">
      <header className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs tracking-[0.18em] text-muted">
          {zh ? "公开源码 · 可直接浏览" : "PUBLIC SOURCE · LIVE EXAMPLES"}
        </p>
        <h2 id="open-source-designs-title" className="mb-3 text-2xl font-semibold">
          {zh ? "开源网站与设计系统" : "Open-source sites and design systems"}
        </h2>
        <p className="leading-7 text-muted">
          {zh
            ? "从完整网站中观察设计如何服务于真实内容与流程。每项都标明源码、许可、技术栈和复用边界。"
            : "Study how real sites organize content and flows. Each entry links to its source and license and explains its stack and reuse boundaries."}
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2" aria-label={zh ? "开源设计项目" : "Open-source design projects"}>
        {openSourceDesignSites.map((site) => (
          <li key={site.slug} className="min-w-0">
            <article className="flex h-full flex-col border border-border bg-background">
              {site.previewImage ? (
                <a
                  href={site.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name}: ${site.demoLabel[locale]}`}
                  className="relative block aspect-[16/9] overflow-hidden border-b border-border bg-muted/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Image
                    src={site.previewImage}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width: 1280px) 50vw, 100vw"
                    className="object-cover"
                  />
                </a>
              ) : null}

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="border border-border px-2 py-1 text-xs text-muted">
                    {site.type[locale]}
                  </span>
                  <a
                    href={site.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 border border-border px-2 py-1 text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    aria-label={site.name + ": " + site.license + ", " + (zh ? "许可证来源" : "license source")}
                  >
                    <FileKey2 className="h-3 w-3" aria-hidden="true" />
                    {site.license}
                  </a>
                </div>

                <h3 className="mb-2 text-lg font-medium">{site.name}</h3>
                <p className="mb-5 text-sm leading-6 text-muted">
                  {site.description[locale]}
                </p>

                <dl className="mb-5 grid gap-3 border-t border-border pt-4 text-sm">
                  <div>
                    <dt className="mb-1 text-xs text-muted">
                      {zh ? "适合查看" : "Useful for"}
                    </dt>
                    <dd className="leading-6">{site.bestFor[locale]}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 inline-flex items-center gap-1 text-xs text-muted">
                      <CodeXml className="h-3 w-3" aria-hidden="true" />
                      {zh ? "技术栈" : "Stack"}
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {site.stack.map((item) => (
                        <span key={item} className="border border-border/70 px-2 py-0.5 text-xs text-muted">
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-xs text-muted">
                      {zh ? "复用说明" : "Reuse notes"}
                    </dt>
                    <dd className="text-sm leading-6 text-muted">
                      {site.reuseBoundary[locale]}
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
                  <a
                    href={site.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center gap-1.5 text-sm underline underline-offset-4 transition-colors hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    {site.demoLabel[locale]}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <a
                    href={site.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center gap-1.5 text-sm text-muted underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {zh ? "查看源码" : "Source"}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <span className="ml-auto text-[11px] text-muted/70">
                    {zh ? "核验于" : "Checked"} {site.checkedAt}
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
