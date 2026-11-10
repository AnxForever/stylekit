import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { openSourceDesignSites } from "@/lib/resources/open-source-designs";

export function OpenSourceDesignsContent() {
  const { locale } = useI18n();
  const zh = locale === "zh";

  return (
    <section aria-labelledby="open-source-designs-title">
      <header className="mb-8 max-w-3xl">
        <h2 id="open-source-designs-title" className="mb-3 text-2xl font-semibold">
          {zh ? "开源设计精选" : "Open-source design picks"}
        </h2>
        <p className="leading-7 text-muted">
          {zh
            ? "值得收藏的开源网站、组件与交互。"
            : "Open-source sites, components, and interactions worth saving."}
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2" aria-label={zh ? "开源设计项目" : "Open-source design projects"}>
        {openSourceDesignSites.map((site) => (
          <li key={site.slug} className="min-w-0">
            <article className="flex h-full flex-col border border-border bg-background">
              <a
                href={site.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name}: ${zh ? "查看演示" : "View demo"}`}
                className="relative block aspect-[16/9] overflow-hidden border-b border-border bg-muted/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Image
                  src={site.previewImage}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(min-width: 1408px) 532px, (min-width: 1280px) calc((100vw - 344px) / 2), (min-width: 1024px) calc(100vw - 328px), (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
                  className="object-cover object-top"
                />
              </a>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="mb-2 text-lg font-medium">{site.name}</h3>
                <p className="mb-3 text-sm leading-6 text-muted">
                  {site.description[locale]}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-5">
                  <a
                    href={site.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name}: ${zh ? "查看演示" : "View demo"}`}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm underline underline-offset-4 transition-colors hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {zh ? "查看演示" : "View demo"}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <a
                    href={site.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name}: GitHub`}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    GitHub
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
