import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

/**
 * 通用骨架屏组件
 * 用于页面加载时显示占位内容，提升感知性能
 */
export function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  const variants = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded",
  };

  return (
    <div
      className={cn(
        "bg-zinc-200 dark:bg-zinc-700 animate-pulse",
        variants[variant],
        className
      )}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      {...props}
    />
  );
}

/**
 * 页面标题骨架屏
 */
export function PageHeaderSkeleton() {
  return (
    <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-12 w-64 md:w-96 mb-4" />
        <Skeleton className="h-6 w-full max-w-lg" />
      </div>
    </div>
  );
}

/**
 * 卡片网格骨架屏
 */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border border-border">
          <Skeleton className="aspect-[4/3]" />
          <div className="p-4 md:p-5">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-3" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 组件展示区骨架屏
 */
export function ComponentSectionSkeleton() {
  return (
    <div className="border border-border rounded-lg p-6">
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-4 w-48 mb-6" />
      <Skeleton className="h-32 w-full mb-4" />
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

/**
 * 导航栏骨架屏
 */
export function NavSkeleton() {
  return (
    <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <div className="hidden md:flex items-center gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
