import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { TemplatesFilter, typeLabels } from "@/components/templates/templates-filter";

interface Template {
  id: string;
  name: string;
  description: string;
  styleSlug: string;
  type: "landing" | "dashboard" | "blog";
  href: string;
}

const templates: Template[] = [
  {
    id: "brutal-landing",
    name: "Brutal Landing Page",
    description: "大胆冲击力的 Neo-Brutalist 风格着陆页，适合产品发布和品牌展示",
    styleSlug: "neo-brutalist",
    type: "landing",
    href: "/templates/brutal-landing",
  },
  {
    id: "glass-landing",
    name: "Glass Landing Page",
    description: "毛玻璃效果的现代着陆页，适合 SaaS 产品和科技类网站",
    styleSlug: "glassmorphism",
    type: "landing",
    href: "/templates/glass-landing",
  },
  {
    id: "editorial-blog",
    name: "Editorial Blog",
    description: "杂志排版风格的博客页面，适合内容驱动型网站",
    styleSlug: "editorial",
    type: "blog",
    href: "/templates/editorial-blog",
  },
];

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function TemplatesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeType = params.type || "all";
  const styles = getAllStylesMeta();

  const filteredTemplates = activeType === "all"
    ? templates
    : templates.filter((t) => t.type === activeType);

  const getStyle = (slug: string) => styles.find((s) => s.slug === slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Page Templates
            </p>
            <h1 className="text-4xl md:text-5xl mb-4">页面模板</h1>
            <p className="text-lg text-muted max-w-2xl">
              每个风格的完整页面模板，可直接复制使用或作为设计参考。
            </p>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Type Filter (Client Component) */}
            <TemplatesFilter />

            {/* Templates Grid (Server Rendered) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => {
                const style = getStyle(template.styleSlug);
                return (
                  <Link
                    key={template.id}
                    href={template.href}
                    className="group block border border-border hover:border-foreground transition-colors"
                  >
                    {/* Preview Area */}
                    <div className="aspect-[16/10] relative overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                      {style && (
                        <div className="absolute inset-0 flex">
                          <div className="flex-1" style={{ backgroundColor: style.colors.primary }} />
                          <div className="flex-1" style={{ backgroundColor: style.colors.secondary }} />
                          {style.colors.accent.slice(0, 2).map((color, i) => (
                            <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="text-white font-serif text-xl italic">
                          {template.name}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg group-hover:text-accent transition-colors">
                          {template.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                          {typeLabels[template.type]}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted">
                          {style?.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredTemplates.length === 0 && (
              <div className="text-center py-16 text-muted">
                此分类下暂无模板
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
