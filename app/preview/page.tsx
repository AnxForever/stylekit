"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Monitor, Tablet, Smartphone, ExternalLink, ArrowLeft } from "lucide-react";

type DeviceType = "desktop" | "tablet" | "mobile";

const devices: { key: DeviceType; label: string; width: number; icon: React.ReactNode }[] = [
  { key: "desktop", label: "Desktop", width: 1440, icon: <Monitor className="w-4 h-4" /> },
  { key: "tablet", label: "Tablet", width: 768, icon: <Tablet className="w-4 h-4" /> },
  { key: "mobile", label: "Mobile", width: 375, icon: <Smartphone className="w-4 h-4" /> },
];

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "/styles/neo-brutalist/showcase";
  const [activeDevice, setActiveDevice] = useState<DeviceType>("desktop");

  const currentDevice = devices.find((d) => d.key === activeDevice)!;

  return (
    <div className="h-screen flex flex-col bg-zinc-100 dark:bg-zinc-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
        <div className="flex items-center gap-4">
          <Link
            href={url.replace("/showcase", "")}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm font-medium">
            响应式预览
          </span>
        </div>

        {/* Device Buttons */}
        <div className="flex items-center gap-1.5">
          {devices.map((device) => {
            const isActive = activeDevice === device.key;
            return (
              <button
                key={device.key}
                onClick={() => setActiveDevice(device.key)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                title={`${device.label} (${device.width}px)`}
              >
                {device.icon}
                <span className="hidden sm:inline">{device.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">
            {currentDevice.width}px
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">新窗口打开</span>
          </a>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 flex items-start justify-center p-6 overflow-auto">
        <div
          className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            width: activeDevice === "desktop" ? "100%" : `${currentDevice.width}px`,
            maxWidth: "100%",
            height: "100%",
          }}
        >
          {/* Browser Chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 border-b border-zinc-300 dark:border-zinc-700">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-3 flex-1 h-6 bg-white dark:bg-zinc-700 rounded-md text-[11px] text-zinc-400 flex items-center px-3">
              stylekit.dev{url}
            </div>
          </div>

          {/* Iframe */}
          <iframe
            src={url}
            className="w-full border-0"
            style={{ height: "calc(100% - 34px)" }}
            title="Responsive Preview"
          />
        </div>
      </div>
    </div>
  );
}
