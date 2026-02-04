"use client";

import { useI18n } from "@/lib/i18n/context";
import { Trash2, Palette } from "lucide-react";
import type { StoredCustomStyle } from "@/lib/style-creator/types";

interface MyStylesListProps {
  styles: StoredCustomStyle[];
  onDelete: (id: string) => void;
  onSelect: (style: StoredCustomStyle) => void;
}

export function MyStylesList({ styles, onDelete, onSelect }: MyStylesListProps) {
  const { t } = useI18n();

  if (styles.length === 0) {
    return (
      <div>
        <p className="text-xs tracking-widest uppercase text-muted mb-4">
          {t("styleCreator.myStyles")}
        </p>
        <div className="border border-border p-6 text-center">
          <Palette className="w-8 h-8 mx-auto mb-2 text-muted" />
          <p className="text-sm text-muted">{t("styleCreator.noStyles")}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted mb-4">
        {t("styleCreator.myStyles")} ({styles.length})
      </p>

      <div className="border border-border divide-y divide-border">
        {styles.map((style) => (
          <div
            key={style.id}
            className="flex items-center justify-between p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            <button
              onClick={() => onSelect(style)}
              className="flex items-center gap-3 flex-1 text-left"
            >
              {/* Color preview */}
              <div className="flex shrink-0">
                <div
                  className="w-4 h-4"
                  style={{ backgroundColor: style.definition.colors.primary }}
                />
                <div
                  className="w-4 h-4"
                  style={{ backgroundColor: style.definition.colors.secondary }}
                />
                <div
                  className="w-4 h-4"
                  style={{ backgroundColor: style.definition.colors.accent[0] }}
                />
              </div>

              {/* Name */}
              <div>
                <p className="text-sm font-medium">{style.name}</p>
                <p className="text-xs text-muted">{style.nameEn}</p>
              </div>
            </button>

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(style.id);
              }}
              className="p-2 text-muted hover:text-red-500 transition-colors"
              title={t("styleCreator.delete")}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
