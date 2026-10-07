"use client";

import { useState } from "react";
import { useKit } from "@/lib/kit/context";
import { useI18n } from "@/lib/i18n/context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function KitSwitcher() {
  const { locale } = useI18n();
  const { kits, activeKitId, switchKit, syncing } = useKit();
  const zh = locale === "zh";
  if (kits.length === 0) return null;
  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <label className="sr-only" htmlFor="kit-switcher">
          {zh ? "选择工具箱" : "Select kit"}
        </label>
        <Select value={activeKitId} onValueChange={switchKit}>
          <SelectTrigger id="kit-switcher" className="h-auto w-auto min-w-[10rem] max-w-full gap-2 px-3 py-2 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {kits.map((kit) => (
              <SelectItem key={kit.id} value={kit.id}>
                {kit.name} ({kit.items.length})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {syncing && <span className="text-xs text-muted">{zh ? "云端同步中…" : "Syncing…"}</span>}
      </div>
      {/* A pending rename or destructive confirmation belongs to one kit. */}
      <KitManagement key={activeKitId} />
    </div>
  );
}

function KitManagement() {
  const { locale } = useI18n();
  const { kits, activeKitId, activeKitName, items, maxKits, createKit, renameKit, clearKit, deleteKit } = useKit();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(activeKitName);
  const [confirmation, setConfirmation] = useState<"clear" | "delete" | null>(null);
  const zh = locale === "zh";
  const buttonClass = "min-h-10 border border-border px-3 py-2 text-xs hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-40";

  return (
    <details className="border-b border-border pb-3" onToggle={(event) => {
      if (!event.currentTarget.open) {
        setEditing(false);
        setConfirmation(null);
      }
    }}>
      <summary className="min-h-11 w-fit cursor-pointer py-3 text-sm text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2">
        {zh ? "管理工具箱" : "Manage kits"}
      </summary>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {editing ? (
          <form className="flex w-full flex-wrap gap-2" onSubmit={(event) => {
            event.preventDefault();
            if (!draft.trim()) return;
            renameKit(activeKitId, draft);
            setEditing(false);
          }}>
            <input autoFocus value={draft} onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Escape") setEditing(false); }}
              maxLength={60} aria-label={zh ? "工具箱名称" : "Kit name"}
              className="min-w-0 flex-1 border border-border bg-transparent px-3 py-2 text-sm" />
            <button type="submit" disabled={!draft.trim()} className={buttonClass}>{zh ? "保存" : "Save"}</button>
            <button type="button" onClick={() => setEditing(false)} className={buttonClass}>{zh ? "取消" : "Cancel"}</button>
          </form>
        ) : (
          <>
            <button type="button" className={buttonClass} onClick={() => { setDraft(activeKitName); setEditing(true); setConfirmation(null); }}>
              {zh ? "重命名" : "Rename"}
            </button>
            <button type="button" className={buttonClass} onClick={() => createKit()} disabled={kits.length >= maxKits}
              title={kits.length >= maxKits ? (zh ? `最多 ${maxKits} 个` : `Max ${maxKits}`) : undefined}>
              {zh ? "新建工具箱" : "New kit"}
            </button>
            <button type="button" className={buttonClass} disabled={items.length === 0} onClick={() => setConfirmation("clear")}>
              {zh ? "清空素材" : "Clear items"}
            </button>
            {kits.length > 1 && (
              <button type="button" className={buttonClass} onClick={() => setConfirmation("delete")}>
                {zh ? "删除工具箱" : "Delete kit"}
              </button>
            )}
          </>
        )}
      </div>
      {confirmation && (
        <div role="alert" className="mt-3 space-y-3 border border-border p-3 text-sm">
          <p className="break-words">{confirmation === "clear"
            ? zh ? `清空「${activeKitName}」中的 ${items.length} 项素材？` : `Clear ${items.length} items from “${activeKitName}”?`
            : zh ? `删除「${activeKitName}」及其中的素材？` : `Delete “${activeKitName}” and its items?`}</p>
          <div className="flex gap-2">
            <button type="button" className={buttonClass} onClick={() => {
              if (confirmation === "clear") clearKit();
              else deleteKit(activeKitId);
              setConfirmation(null);
            }}>{zh ? "确认" : "Confirm"}</button>
            <button type="button" className={buttonClass} onClick={() => setConfirmation(null)}>{zh ? "取消" : "Cancel"}</button>
          </div>
        </div>
      )}
    </details>
  );
}
