"use client";

import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface SavedStyle {
  id: string;
  title: string;
  author: string;
  savedAt: string;
}

const STORAGE_KEY = "stylekit-saved-styles";

export function useStyleSaves() {
  const [savedStyles, setSavedStyles] = useState<SavedStyle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      setSavedStyles(data ? JSON.parse(data) : []);
    } catch {
      setSavedStyles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleSave = (styleId: string, title: string, author: string) => {
    setSavedStyles((prev) => {
      const existing = prev.find((s) => s.id === styleId);
      const updated = existing
        ? prev.filter((s) => s.id !== styleId)
        : [
            ...prev,
            {
              id: styleId,
              title,
              author,
              savedAt: new Date().toISOString(),
            },
          ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (styleId: string) => savedStyles.some((s) => s.id === styleId);

  return { savedStyles, isLoading, toggleSave, isSaved };
}

interface StyleSaveButtonProps {
  styleId: string;
  title: string;
  author: string;
  size?: "sm" | "md";
}

export function StyleSaveButton({
  styleId,
  title,
  author,
  size = "md",
}: StyleSaveButtonProps) {
  const { t } = useI18n();
  const { toggleSave, isSaved } = useStyleSaves();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      toggleSave(styleId, title, author);
    } finally {
      setIsLoading(false);
    }
  };

  const saved = isSaved(styleId);
  const sizeClass =
    size === "sm" ? "w-3.5 h-3.5 p-1.5" : "w-4 h-4 p-2";

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`${sizeClass} rounded-md transition-all ${
        saved
          ? "bg-red-500/20 text-red-500"
          : "bg-border text-muted hover:bg-border/80"
      } disabled:opacity-50`}
      title={t("community.save") || "Save style"}
    >
      {isLoading ? (
        <Loader2 className="w-full h-full animate-spin" />
      ) : (
        <Heart className={`w-full h-full ${saved ? "fill-current" : ""}`} />
      )}
    </button>
  );
}

interface SavedStylesListProps {
  maxItems?: number;
}

export function SavedStylesList({ maxItems = 10 }: SavedStylesListProps) {
  const { t } = useI18n();
  const { savedStyles, isLoading } = useStyleSaves();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        <span className="text-sm text-muted">{t("common.loading")}</span>
      </div>
    );
  }

  if (savedStyles.length === 0) {
    return (
      <div className="text-center p-8">
        <Heart className="w-8 h-8 mx-auto mb-2 opacity-30" />
        <p className="text-sm text-muted">{t("community.noSavedStyles") || "No saved styles yet"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {savedStyles.slice(0, maxItems).map((style) => (
        <div
          key={style.id}
          className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-foreground transition-colors"
        >
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm truncate">{style.title}</div>
            <div className="text-xs text-muted">by {style.author}</div>
          </div>
          <time className="text-xs text-muted ml-2 shrink-0">
            {new Date(style.savedAt).toLocaleDateString()}
          </time>
        </div>
      ))}
      {savedStyles.length > maxItems && (
        <div className="text-xs text-muted text-center py-2">
          +{savedStyles.length - maxItems} more
        </div>
      )}
    </div>
  );
}
