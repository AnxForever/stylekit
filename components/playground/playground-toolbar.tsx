"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Share2,
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutTemplate,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

type DeviceSize = "desktop" | "tablet" | "mobile";

interface PlaygroundToolbarProps {
  code: string;
  styleSlug: string;
  templateId: string;
  onReset: () => void;
  deviceSize: DeviceSize;
  onDeviceSizeChange: (size: DeviceSize) => void;
  editorVisible: boolean;
  onToggleEditor: () => void;
  onToggleTemplates: () => void;
  templatesVisible: boolean;
}

export function PlaygroundToolbar({
  code,
  styleSlug,
  templateId,
  onReset,
  deviceSize,
  onDeviceSizeChange,
  editorVisible,
  onToggleEditor,
  onToggleTemplates,
  templatesVisible,
}: PlaygroundToolbarProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: noop
    }
  };

  const handleShare = () => {
    try {
      const state = JSON.stringify({ style: styleSlug, template: templateId, code });
      const encoded = btoa(unescape(encodeURIComponent(state)));
      const url = `${window.location.origin}/playground?state=${encoded}`;
      navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // Fallback: noop
    }
  };

  const devices: { key: DeviceSize; icon: React.ReactNode; label: string }[] = [
    { key: "desktop", icon: <Monitor className="w-4 h-4" />, label: "Desktop" },
    { key: "tablet", icon: <Tablet className="w-4 h-4" />, label: "Tablet" },
    { key: "mobile", icon: <Smartphone className="w-4 h-4" />, label: "Mobile" },
  ];

  const btnClass =
    "p-1.5 text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors";

  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-background">
      {/* Left section */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleEditor}
          className={btnClass}
          title={editorVisible ? t("playground.hideEditor") : t("playground.showEditor")}
        >
          {editorVisible ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeftOpen className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={onToggleTemplates}
          className={`${btnClass} ${templatesVisible ? "bg-zinc-100 dark:bg-zinc-800 text-foreground" : ""}`}
          title={t("playground.templates")}
        >
          <LayoutTemplate className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-border mx-1" />

        {/* Device size toggle */}
        <div className="flex items-center gap-0.5">
          {devices.map((d) => (
            <button
              key={d.key}
              onClick={() => onDeviceSizeChange(d.key)}
              className={`p-1.5 rounded-md transition-colors ${
                deviceSize === d.key
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
              title={d.label}
            >
              {d.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1">
        <button onClick={handleCopy} className={btnClass} title={t("playground.copyCode")}>
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>

        <button onClick={handleShare} className={btnClass} title={t("playground.share")}>
          {shared ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
        </button>

        <div className="h-4 w-px bg-border mx-1" />

        <button onClick={onReset} className={btnClass} title={t("playground.reset")}>
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
