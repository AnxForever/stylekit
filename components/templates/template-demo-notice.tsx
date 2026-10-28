import type { Locale } from "@/lib/i18n/translations";
import { TEMPLATE_DEMO_BOUNDARY } from "@/lib/templates/demo-boundary";

export function TemplateDemoNotice({ locale }: { locale: Locale }) {
  const copy = TEMPLATE_DEMO_BOUNDARY[locale];

  return (
    <aside
      aria-label={copy.label}
      className="border-b border-border bg-muted/30 text-muted"
    >
      <div className="mx-auto max-w-7xl px-4 py-2.5 text-xs leading-5 sm:px-6 sm:text-sm">
        <span className="mr-2 font-semibold text-foreground">{copy.label}.</span>
        {copy.notice}
      </div>
    </aside>
  );
}