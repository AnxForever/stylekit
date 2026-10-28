import { LocalizedLink } from "@/components/i18n/localized-link";
import { resolveGuideRelatedStyleSlug } from "@/lib/seo/style-guide-relations";
import type { StyleMeta } from "@/lib/styles/meta-types";

interface RelatedStyleLinksProps {
  names: string[];
  styles: readonly Pick<StyleMeta, "slug" | "name" | "nameEn">[];
}

const linkClassName =
  "flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:border-foreground hover:bg-muted/5";

export function RelatedStyleLinks({ names, styles }: RelatedStyleLinksProps) {
  if (names.length === 0) return null;

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <h2 className="mb-6 text-3xl font-bold">Related Design Styles</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {names.map((name) => {
            const slug = resolveGuideRelatedStyleSlug(name, styles);

            if (!slug) {
              return (
                <span
                  key={name}
                  className="flex min-h-14 items-center border border-border p-4 text-muted"
                >
                  {name}
                </span>
              );
            }

            return (
              <LocalizedLink key={name} href={`/styles/${slug}`} className={linkClassName}>
                <span className="font-medium">{name}</span>
                <span className="text-muted" aria-hidden="true">→</span>
              </LocalizedLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
