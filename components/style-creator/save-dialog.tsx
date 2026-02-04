"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { X } from "lucide-react";
import type { StoredCustomStyle } from "@/lib/style-creator/types";

interface SaveDialogProps {
  onSave: (name: string, nameEn: string) => StoredCustomStyle;
  onClose: () => void;
  onSaveAndNavigate?: (name: string, nameEn: string) => void;
}

export function SaveDialog({ onSave, onClose, onSaveAndNavigate }: SaveDialogProps) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;

    setIsSaving(true);
    try {
      onSave(name.trim(), nameEn.trim() || name.trim());
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndNavigate = async () => {
    if (!name.trim() || !onSaveAndNavigate) return;

    setIsSaving(true);
    try {
      onSaveAndNavigate(name.trim(), nameEn.trim() || name.trim());
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">{t("styleCreator.save")}</h3>
          <button
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted mb-1 block">
              {t("styleCreator.styleName")} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Custom Style"
              className="w-full px-3 py-2 border border-border bg-transparent focus:outline-none focus:border-foreground transition-colors"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs text-muted mb-1 block">
              {t("styleCreator.styleNameEn")}
            </label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="My Custom Style"
              className="w-full px-3 py-2 border border-border bg-transparent focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={!name.trim() || isSaving}
            className="w-full px-4 py-3 bg-foreground text-background text-sm hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? t("styleCreator.saving") : t("styleCreator.save")}
          </button>

          {onSaveAndNavigate && (
            <button
              onClick={handleSaveAndNavigate}
              disabled={!name.trim() || isSaving}
              className="w-full px-4 py-3 border border-border hover:border-foreground text-sm transition-colors disabled:opacity-50"
            >
              {t("styleCreator.useInGenerator")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
