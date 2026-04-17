import { NavSkeleton, Skeleton } from "@/components/ui/skeleton";

export type PageSkeletonVariant =
  | "showcase"
  | "template"
  | "article"
  | "dashboard"
  | "form";

export interface PageSkeletonProps {
  variant: PageSkeletonVariant;
}

export function PageSkeleton({ variant }: PageSkeletonProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      data-testid={`page-skeleton-${variant}`}
    >
      <NavSkeleton />
      <main className="flex-1">
        {variant === "showcase" && <ShowcaseVariant />}
        {variant === "template" && <TemplateVariant />}
        {variant === "article" && <ArticleVariant />}
        {variant === "dashboard" && <DashboardVariant />}
        {variant === "form" && <FormVariant />}
      </main>
    </div>
  );
}

function ShowcaseVariant() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div className="mb-8">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-10 w-96 max-w-full mb-3" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <Skeleton className="aspect-[16/9] w-full mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-border">
            <Skeleton className="aspect-[4/3]" />
            <div className="p-4">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TemplateVariant() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="aspect-[4/3] w-full mb-4" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24" />
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-11 w-full mt-4" />
        </aside>
      </div>
    </div>
  );
}

function ArticleVariant() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <Skeleton className="h-4 w-32 mb-4" />
      <Skeleton className="h-10 w-full mb-3" />
      <Skeleton className="h-10 w-3/4 mb-6" />
      <div className="flex items-center gap-3 mb-10">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className={`h-4 ${i % 3 === 0 ? "w-5/6" : "w-full"}`}
          />
        ))}
      </div>
    </div>
  );
}

function DashboardVariant() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <Skeleton className="h-10 w-64 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-border p-6">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="border border-border p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FormVariant() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
      <Skeleton className="h-10 w-80 mb-4" />
      <Skeleton className="h-5 w-full max-w-xl mb-8" />
      <div className="flex gap-2 mb-6 border-b border-border pb-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-28" />
        ))}
      </div>
      <Skeleton className="h-48 w-full mb-4" />
      <div className="flex justify-end gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
