"use client";

import { useState } from "react";
import { useKit } from "@/lib/kit/context";
import { useI18n } from "@/lib/i18n/context";

/**
 * Multi-kit switcher for the workbench header: pick the active kit,
 * rename it inline, create a new one, or delete the current one.
 */
export function KitSwitcher() {
  const { locale } = useI18n();
  const {
    kits,
    activeKitId,
    activeKitName,
    maxKits,
    createKit,
    renameKit,
    deleteKit,
    switchKit,
    syncing,
  } = useKit();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const zh = locale === "zh";

  if (kits.length === 0) return null;

  const commitRename = () => {
    if (draft.trim()) renameKit(activeKitId, draft);
    setEditing(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitRename();
            if (e.key === "Escape") setEditing(false);
          }}
          maxLength={60}
          className="bg-transparent border border-foreground px-2.5 py-1.5 text-sm text-foreground focus:outline-none"
          aria-label={zh ? "重命名工具箱" : "Rename kit"}
        />
      ) : (
        <label className="sr-only" htmlFor="kit-switcher">
          {zh ? "选择工具箱" : "Select kit"}
        </label>
      )}

      {!editing && (
        <select
          id="kit-switcher"
          value={activeKitId}
          onChange={(e) => switchKit(e.target.value)}
          className="bg-background border border-border px-2.5 py-1.5 text-sm text-foreground focus:border-foreground focus:outline-none"
        >
          {kits.map((kit) => (
            <option key={kit.id} value={kit.id}>
              {kit.name} ({kit.items.length})
            </option>
          ))}
        </select>
      )}

      {!editing && (
        <button
          type="button"
          onClick={() => {
            setDraft(activeKitName);
            setEditing(true);
          }}
          className="border border-border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-muted hover:border-foreground hover:text-foreground transition-colors"
        >
          {zh ? "重命名" : "Rename"}
        </button>
      )}

      <button
        type="button"
        onClick={() => createKit()}
        disabled={kits.length >= maxKits}
        title={kits.length >= maxKits ? (zh ? `最多 ${maxKits} 个` : `Max ${maxKits}`) : undefined}
        className="border border-border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-muted hover:border-foreground hover:text-foreground transition-colors disabled:opacity-40"
      >
        {zh ? "+ 新建" : "+ New kit"}
      </button>

      <button
        type="button"
        onClick={() => {
          if (!confirmDelete) {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 3000);
            return;
          }
          deleteKit(activeKitId);
          setConfirmDelete(false);
        }}
        className="ml-auto border border-border px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-muted hover:border-red-500 hover:text-red-500 transition-colors"
      >
        {confirmDelete
          ? zh
            ? "再点一次删除"
            : "Click to confirm"
          : kits.length <= 1
            ? zh
              ? "清空此工具箱"
              : "Empty this kit"
            : zh
              ? "删除此工具箱"
              : "Delete this kit"}
      </button>

      {syncing && (
        <span className="w-full sm:w-auto sm:ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {zh ? "云端同步中…" : "Syncing…"}
        </span>
      )}
    </div>
  );
}
