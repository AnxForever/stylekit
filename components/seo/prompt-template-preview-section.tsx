import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TemplateCoverPreview } from "@/components/templates/template-cover-preview";
import type { PromptTemplatePreview } from "@/lib/seo/prompt-template-previews";
import { getStyleMetaBySlug } from "@/lib/styles/meta";

interface PromptTemplatePreviewSectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  templates: PromptTemplatePreview[];
}

export function PromptTemplatePreviewSection({
  eyebrow = "Previews",
  title,
  description,
  templates,
}: PromptTemplatePreviewSectionProps) {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <p className="text-xs tracking-widest uppercase text-muted mb-4">
          {eyebrow}
        </p>
        <h2 className="text-2xl md:text-3xl mb-4">{title}</h2>
        <p className="text-muted mb-8 max-w-3xl">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {templates.map((template) => {
            const style = getStyleMetaBySlug(template.styleSlug);
            const colors = style?.colors ?? {
              primary: "#111827",
              secondary: "#6b7280",
              accent: ["#3b82f6", "#10b981", "#f59e0b"],
            };

            return (
              <article
                key={template.href}
                className="border border-border overflow-hidden bg-background"
              >
                <div className="border-b border-border bg-zinc-50 dark:bg-zinc-950/50 aspect-[4/3] p-4">
                  <TemplateCoverPreview templateId={template.templateId} colors={colors} />
                </div>
                <div className="p-5">
                  <h3 className="text-xl mb-2">{template.name}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {template.description}
                  </p>
                  <Link
                    href={template.href}
                    className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
                  >
                    Open template
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
