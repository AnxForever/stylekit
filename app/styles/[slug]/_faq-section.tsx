import type { StyleFaqItem } from "@/lib/seo/style-faq";
import type { Locale } from "@/lib/i18n/translations";

interface StyleFaqSectionProps {
  faqs: StyleFaqItem[];
  styleName: string;
  locale: Locale;
}

/**
 * Server-rendered FAQ block. Kept as plain, fully visible text (no accordion)
 * so search engines index the answers that back the FAQPage schema.
 */
export function StyleFaqSection({ faqs, styleName, locale }: StyleFaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section id="style-faq" className="border-b border-border scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <p className="text-xs tracking-widest uppercase text-muted mb-4">
          {locale === "zh" ? "常见问题" : "FAQ"}
        </p>
        <h2 className="text-2xl md:text-3xl mb-8">
          {locale === "zh"
            ? `关于${styleName}的常见问题`
            : `${styleName} — Frequently Asked Questions`}
        </h2>
        <dl className="max-w-3xl border-t border-border">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-border py-6"
            >
              <dt className="contents">
                <span aria-hidden="true" className="font-mono text-xs text-muted pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base md:text-lg font-medium">
                  {faq.question}
                </span>
              </dt>
              <dd className="col-start-2 mt-3 text-sm md:text-[15px] leading-[1.8] text-muted">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
