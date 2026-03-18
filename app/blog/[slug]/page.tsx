import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { serializeJsonLd } from "@/lib/security/json-ld";
import { generateBlogPostJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | StyleKit`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.stylekit.top";
  const articleJsonLd = generateBlogPostJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: post.title, url: `${BASE_URL}/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <article className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20">
            <LocalizedLink
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </LocalizedLink>

            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-widest uppercase text-muted border border-border px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted">
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.author}</span>
              </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote source={post.content} />
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
