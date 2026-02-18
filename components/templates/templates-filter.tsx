"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, Suspense } from "react";
import { useI18n } from "@/lib/i18n/context";

type TemplateTypeFilter = "all" | "landing" | "dashboard" | "blog" | "portfolio" | "saas" | "ecommerce" | "admin" | "auth" | "docs" | "social" | "messaging" | "media" | "lifestyle" | "education";

const filterTypeOrder: TemplateTypeFilter[] = ["all", "landing", "dashboard", "blog", "portfolio", "saas", "ecommerce", "admin", "auth", "docs", "social", "messaging", "media", "lifestyle", "education"];

function typeTranslationKey(type: TemplateTypeFilter) {
  switch (type) {
    case "all":
      return "templates.typeAll";
    case "landing":
      return "templates.typeLanding";
    case "dashboard":
      return "templates.typeDashboard";
    case "blog":
      return "templates.typeBlog";
    case "portfolio":
      return "templates.typePortfolio";
    case "saas":
      return "templates.typeSaas";
    case "ecommerce":
      return "templates.typeEcommerce";
    case "admin":
      return "templates.typeAdmin";
    case "auth":
      return "templates.typeAuth";
    case "docs":
      return "templates.typeDocs";
    case "social":
      return "templates.typeSocial";
    case "messaging":
      return "templates.typeMessaging";
    case "media":
      return "templates.typeMedia";
    case "lifestyle":
      return "templates.typeLifestyle";
    case "education":
      return "templates.typeEducation";
    default:
      return "templates.typeAll";
  }
}

function FilterButtons() {
  const { t } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeType = (searchParams.get("type") as TemplateTypeFilter | null) || "all";

  const setActiveType = useCallback(
    (type: TemplateTypeFilter) => {
      const params = new URLSearchParams(searchParams.toString());
      const nextType = type === activeType ? "all" : type;
      if (nextType === "all") {
        params.delete("type");
      } else {
        params.set("type", nextType);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [activeType, pathname, searchParams, router]
  );

  return (
    <div className="mb-8 space-y-3">
      <p className="text-sm text-muted">{t("templates.type")}:</p>
      <div
        role="group"
        aria-label={t("templates.typeFilterAriaLabel")}
        className="flex flex-wrap gap-2"
      >
        {filterTypeOrder.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            aria-pressed={activeType === type}
            className={`px-3 py-1.5 text-sm transition-colors ${
              activeType === type
                ? "bg-foreground text-background"
                : "border border-border hover:border-foreground"
            }`}
          >
            {t(typeTranslationKey(type))}
          </button>
        ))}
      </div>
      {activeType !== "all" && (
        <p className="text-xs text-muted">{t("templates.filterHint")}</p>
      )}
    </div>
  );
}

export function TemplatesFilter() {
  const { t } = useI18n();

  return (
    <Suspense
      fallback={
        <div className="mb-8 space-y-3">
          <p className="text-sm text-muted">{t("templates.type")}:</p>
          <div className="flex flex-wrap gap-2">
            {filterTypeOrder.map((type) => (
              <span key={type} className="px-3 py-1.5 text-sm border border-border">
                {t(typeTranslationKey(type))}
              </span>
            ))}
          </div>
        </div>
      }
    >
      <FilterButtons />
    </Suspense>
  );
}
