import { LocalizedLink } from "@/components/i18n/localized-link";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="border border-border p-6 bg-background hover:border-foreground/50 transition-colors">
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] tracking-widest uppercase text-muted border border-border px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
      <LocalizedLink href={`/blog/${post.slug}`} className="block group">
        <h2 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">
          {post.title}
        </h2>
      </LocalizedLink>
      <p className="text-sm text-muted leading-relaxed mb-4">
        {post.description}
      </p>
      <div className="flex items-center justify-between text-xs text-muted">
        <time dateTime={post.date}>{post.date}</time>
        <span>{post.author}</span>
      </div>
    </article>
  );
}
