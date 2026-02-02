"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, Suspense } from "react";

const typeLabels: Record<string, string> = {
  all: "全部",
  landing: "着陆页",
  dashboard: "仪表盘",
  blog: "博客",
};

function FilterButtons() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeType = searchParams.get("type") || "all";

  const setActiveType = useCallback(
    (type: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (type === "all") {
        params.delete("type");
      } else {
        params.set("type", type);
      }
      const query = params.toString();
      router.replace(query ? `/templates?${query}` : "/templates", { scroll: false });
    },
    [searchParams, router]
  );

  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-sm text-muted">类型：</span>
      {Object.entries(typeLabels).map(([key, label]) => (
        <button
          key={key}
          onClick={() => setActiveType(key)}
          className={`px-3 py-1.5 text-sm transition-colors ${
            activeType === key
              ? "bg-foreground text-background"
              : "border border-border hover:border-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function TemplatesFilter() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm text-muted">类型：</span>
          {Object.entries(typeLabels).map(([key, label]) => (
            <span
              key={key}
              className="px-3 py-1.5 text-sm border border-border"
            >
              {label}
            </span>
          ))}
        </div>
      }
    >
      <FilterButtons />
    </Suspense>
  );
}

export { typeLabels };
