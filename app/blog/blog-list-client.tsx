"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/blog/blog-card";
import { useI18n } from "@/lib/i18n/context";
import type { BlogPost } from "@/lib/blog";

interface BlogListClientProps {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              {t("blog.badge")}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              {t("blog.heading")}
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-3xl">
              {t("blog.subheading")}
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
            {posts.length === 0 ? (
              <p className="text-muted">{t("blog.noPosts")}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
