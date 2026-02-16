import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { TemplatesFilter, typeLabels } from "@/components/templates/templates-filter";
import { TemplateCoverPreview } from "@/components/templates/template-cover-preview";

interface Template {
  id: string;
  name: string;
  description: string;
  styleSlug: string;
  type: "landing" | "dashboard" | "blog" | "portfolio";
  href: string;
}

const templates: Template[] = [
  {
    id: "brutal-landing",
    name: "Brutal Landing Page",
    description:
      "High-impact Neo-Brutalist landing page for launches and brand-first campaigns.",
    styleSlug: "neo-brutalist",
    type: "landing",
    href: "/templates/brutal-landing",
  },
  {
    id: "glass-landing",
    name: "Glass Landing Page",
    description:
      "Modern glassmorphism landing page ideal for SaaS products and technology showcases.",
    styleSlug: "glassmorphism",
    type: "landing",
    href: "/templates/glass-landing",
  },
  {
    id: "editorial-blog",
    name: "Editorial Blog",
    description:
      "Magazine-inspired reading layout focused on typography, rhythm, and long-form content.",
    styleSlug: "editorial",
    type: "blog",
    href: "/templates/editorial-blog",
  },
  {
    id: "anx-blog",
    name: "Anx Avant Blog",
    description:
      "Experimental portfolio-blog mix with loud typography, brutal borders, and kinetic sections.",
    styleSlug: "neo-brutalist",
    type: "blog",
    href: "/templates/anx-blog",
  },
  {
    id: "warm-dashboard",
    name: "Warm Dashboard",
    description:
      "Warm-toned analytics dashboard with sidebar navigation, stat cards, charts, and data tables.",
    styleSlug: "warm-dashboard",
    type: "dashboard",
    href: "/templates/warm-dashboard",
  },
  {
    id: "minimalist-portfolio",
    name: "Minimalist Portfolio",
    description:
      "Clean, flat portfolio with bold typography, project list, skills section, and contact form.",
    styleSlug: "minimalist-flat",
    type: "portfolio",
    href: "/templates/minimalist-portfolio",
  },
  {
    id: "magazine-landing",
    name: "Magazine Landing",
    description:
      "Editorial magazine layout with featured articles, category navigation, and newsletter signup.",
    styleSlug: "magazine-grid",
    type: "landing",
    href: "/templates/magazine-landing",
  },
  {
    id: "neumorphism-landing",
    name: "Neumorphism Landing",
    description:
      "Soft neumorphic SaaS landing page with raised elements, pricing cards, and testimonials.",
    styleSlug: "neumorphism",
    type: "landing",
    href: "/templates/neumorphism-landing",
  },
  {
    id: "brutalist-playful-blog",
    name: "Brutalist Playful Blog",
    description:
      "Colorful neo-brutalist blog with thick borders, hard shadows, category filters, and playful layouts.",
    styleSlug: "neo-brutalist-playful",
    type: "blog",
    href: "/templates/brutalist-playful-blog",
  },
];

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function TemplatesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeType = params.type || "all";
  const styles = getAllStylesMeta();

  const filteredTemplates =
    activeType === "all" ? templates : templates.filter((t) => t.type === activeType);

  const getStyle = (slug: string) => styles.find((s) => s.slug === slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">Page Templates</p>
            <h1 className="text-4xl md:text-5xl mb-4">Template Gallery</h1>
            <p className="text-lg text-muted max-w-2xl">
              Production-ready pages designed for adaptation. Pick a visual direction, then fork and tailor.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <TemplatesFilter />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => {
                const style = getStyle(template.styleSlug);
                return (
                  <Link
                    key={template.id}
                    href={template.href}
                    className="group block border border-border hover:border-foreground transition-colors"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      {style && (
                        <TemplateCoverPreview
                          templateId={template.id}
                          colors={{
                            primary: style.colors.primary,
                            secondary: style.colors.secondary,
                            accent: style.colors.accent,
                          }}
                        />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-3">
                        <span className="text-white text-sm font-medium">{template.name}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg group-hover:text-accent transition-colors">{template.name}</h3>
                      <p className="text-sm text-muted mt-2 mb-3">{template.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                          {typeLabels[template.type]}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                          {style?.nameEn || style?.name || "Style"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16 text-muted">No templates in this category yet.</div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}