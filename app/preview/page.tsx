"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  ArrowLeft,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

type DeviceType = "desktop" | "laptop" | "tablet" | "mobile" | "mobile-sm";

interface DeviceConfig {
  key: DeviceType;
  label: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

const devices: DeviceConfig[] = [
  { key: "desktop", label: "Desktop", width: 1920, height: 1080, icon: <Monitor className="w-4 h-4" /> },
  { key: "laptop", label: "Laptop", width: 1440, height: 900, icon: <Monitor className="w-4 h-4" /> },
  { key: "tablet", label: "iPad", width: 768, height: 1024, icon: <Tablet className="w-4 h-4" /> },
  { key: "mobile", label: "iPhone 14", width: 390, height: 844, icon: <Smartphone className="w-4 h-4" /> },
  { key: "mobile-sm", label: "iPhone SE", width: 375, height: 667, icon: <Smartphone className="w-4 h-4" /> },
];

const zoomLevels = [50, 75, 100, 125, 150];

// Validate URL is a safe internal path
function sanitizePreviewUrl(url: string | null): string {
  const defaultUrl = "/styles/neo-brutalist/showcase";
  if (!url) return defaultUrl;

  // Only allow relative paths starting with /
  if (!url.startsWith("/")) return defaultUrl;

  // Block protocol handlers and data URIs
  if (url.includes(":") || url.includes("//")) return defaultUrl;

  return url;
}

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const url = sanitizePreviewUrl(searchParams.get("url"));
  const [activeDevice, setActiveDevice] = useState<DeviceType>("desktop");
  const [isRotated, setIsRotated] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [iframeKey, setIframeKey] = useState(0);

  const currentDevice = devices.find((d) => d.key === activeDevice) ?? devices[0];

  // Calculate actual dimensions based on rotation
  const dimensions = useMemo(() => {
    const w = isRotated ? currentDevice.height : currentDevice.width;
    const h = isRotated ? currentDevice.width : currentDevice.height;
    return { width: w, height: h };
  }, [currentDevice, isRotated]);

  // Scale dimensions by zoom
  const scaledDimensions = useMemo(() => ({
    width: (dimensions.width * zoom) / 100,
    height: (dimensions.height * zoom) / 100,
  }), [dimensions, zoom]);

  const handleRefresh = () => {
    setIframeKey((k) => k + 1);
  };

  const handleZoomIn = () => {
    const idx = zoomLevels.indexOf(zoom);
    if (idx !== -1 && idx < zoomLevels.length - 1) {
      setZoom(zoomLevels[idx + 1]);
    }
  };

  const handleZoomOut = () => {
    const idx = zoomLevels.indexOf(zoom);
    if (idx > 0) {
      setZoom(zoomLevels[idx - 1]);
    }
  };

  const handleFitToScreen = () => {
    setZoom(100);
    setActiveDevice("desktop");
    setIsRotated(false);
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-100 dark:bg-zinc-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
        {/* Left: Back button */}
        <div className="flex items-center gap-4">
          <Link
            href={url.replace("/showcase", "")}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">返回</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm font-medium">响应式预览</span>
        </div>

        {/* Center: Device Buttons */}
        <div className="flex items-center gap-1">
          {devices.map((device) => {
            const isActive = activeDevice === device.key;
            return (
              <button
                key={device.key}
                onClick={() => setActiveDevice(device.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                title={`${device.label} (${device.width}x${device.height})`}
              >
                {device.icon}
                <span className="hidden md:inline">{device.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Rotate button (only for non-desktop) */}
          {activeDevice !== "desktop" && activeDevice !== "laptop" && (
            <button
              onClick={() => setIsRotated(!isRotated)}
              className={`p-1.5 rounded-md transition-colors ${
                isRotated
                  ? "bg-foreground text-background"
                  : "text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
              title={isRotated ? "竖屏" : "横屏"}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Zoom controls */}
          <div className="flex items-center gap-1 border border-border rounded-md">
            <button
              onClick={handleZoomOut}
              disabled={zoom === zoomLevels[0]}
              className="p-1.5 text-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              title="缩小"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-muted tabular-nums w-10 text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom === zoomLevels[zoomLevels.length - 1]}
              className="p-1.5 text-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              title="放大"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Fit to screen */}
          <button
            onClick={handleFitToScreen}
            className="p-1.5 text-muted hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            title="重置"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-border" />

          {/* Size indicator */}
          <span className="text-xs text-muted tabular-nums">
            {dimensions.width} x {dimensions.height}
          </span>

          {/* Open in new tab */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 p-1.5 text-muted hover:text-foreground transition-colors"
            title="新窗口打开"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        <div
          className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            width: activeDevice === "desktop" ? "100%" : scaledDimensions.width,
            height: activeDevice === "desktop" ? "100%" : scaledDimensions.height,
            maxWidth: "100%",
            maxHeight: "100%",
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
            <button
              onClick={handleRefresh}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              title="刷新"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Iframe */}
          <iframe
            key={iframeKey}
            src={url}
            className="w-full border-0 bg-white"
            style={{
              height: "calc(100% - 34px)",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
              width: zoom !== 100 ? `${10000 / zoom}%` : "100%",
            }}
            title="Responsive Preview"
          />
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-center gap-4 px-4 py-2 bg-background border-t border-border text-xs text-muted">
        <span>{currentDevice.label}</span>
        <span>|</span>
        <span>{dimensions.width} x {dimensions.height}</span>
        {isRotated && <span className="text-blue-500">(横屏)</span>}
        {zoom !== 100 && <span className="text-orange-500">({zoom}% 缩放)</span>}
      </div>
    </div>
  );
}
