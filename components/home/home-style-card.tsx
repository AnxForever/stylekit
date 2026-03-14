import Image from "next/image";
import Link from "next/link";
import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";
import { shouldUseLiveCoverPreview } from "./live-cover-preview-slugs";
import type { StyleMeta } from "@/lib/styles/meta";

interface HomeStyleCardProps {
  style: StyleMeta;
}

export function HomeStyleCard({ style }: HomeStyleCardProps) {
  const useLivePreview = shouldUseLiveCoverPreview(style.slug);

  return (
    <Link
      href={`/styles/${style.slug}`}
      className="group block border border-border bg-background motion-safe:transition-[border-color,transform,box-shadow] motion-safe:duration-200 hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/80 bg-zinc-100 dark:bg-zinc-900">
        {useLivePreview ? (
          <StyleCoverPreview styleSlug={style.slug} className="motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.02]" />
        ) : (
          <Image
            src={style.cover}
            alt={`${style.nameEn} cover`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.02]"
            unoptimized
          />
        )}
      </div>

      {style.colors && (
        <div className="h-1.5 flex">
          <div className="flex-1" style={{ backgroundColor: style.colors.primary }} />
          <div className="flex-1" style={{ backgroundColor: style.colors.secondary }} />
          {style.colors.accent?.slice(0, 2).map((color, index) => (
            <div key={color || index} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      )}

      <div className="p-3 sm:p-4 md:p-5">
        <div className="flex min-w-0 items-center gap-2 mb-2">
          <h3 className="truncate text-base leading-snug group-hover:text-accent group-focus-visible:text-accent transition-colors">
            {style.name}
          </h3>
          <span className="hidden shrink-0 text-sm text-muted sm:inline">
            {style.nameEn}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted leading-relaxed">
          {style.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {style.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-muted uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
