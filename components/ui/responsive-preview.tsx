"use client";

import { useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";

type DeviceType = "desktop" | "tablet" | "mobile";

interface ResponsivePreviewProps {
  children: React.ReactNode;
  defaultDevice?: DeviceType;
  className?: string;
}

const deviceConfig: Record<DeviceType, { width: string; label: string; icon: React.ReactNode }> = {
  desktop: {
    width: "100%",
    label: "Desktop",
    icon: <Monitor className="w-4 h-4" />,
  },
  tablet: {
    width: "768px",
    label: "Tablet",
    icon: <Tablet className="w-4 h-4" />,
  },
  mobile: {
    width: "375px",
    label: "Mobile",
    icon: <Smartphone className="w-4 h-4" />,
  },
};

export function ResponsivePreview({
  children,
  defaultDevice = "desktop",
  className = "",
}: ResponsivePreviewProps) {
  const [activeDevice, setActiveDevice] = useState<DeviceType>(defaultDevice);

  return (
    <div className={className}>
      {/* Device Selector */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {(Object.keys(deviceConfig) as DeviceType[]).map((device) => {
          const config = deviceConfig[device];
          const isActive = activeDevice === device;
          return (
            <button
              key={device}
              onClick={() => setActiveDevice(device)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm transition-colors rounded-md ${
                isActive
                  ? "bg-foreground text-background"
                  : "border border-border hover:border-foreground text-muted hover:text-foreground"
              }`}
              title={config.label}
            >
              {config.icon}
              <span className="hidden sm:inline">{config.label}</span>
            </button>
          );
        })}
      </div>

      {/* Preview Frame */}
      <div className="flex justify-center">
        <div
          className="relative bg-white dark:bg-zinc-900 border border-border rounded-lg overflow-hidden transition-all duration-300 shadow-lg"
          style={{
            width: deviceConfig[activeDevice].width,
            maxWidth: "100%",
          }}
        >
          {/* Device Frame Header */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-border">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="ml-2 flex-1 h-5 bg-white dark:bg-zinc-700 rounded text-[10px] text-muted flex items-center justify-center">
              {deviceConfig[activeDevice].label} Preview
            </div>
          </div>

          {/* Content */}
          <div className="overflow-auto" style={{ maxHeight: "600px" }}>
            {children}
          </div>
        </div>
      </div>

      {/* Size Indicator */}
      <div className="text-center mt-3 text-xs text-muted">
        {deviceConfig[activeDevice].width === "100%" ? "全宽" : deviceConfig[activeDevice].width}
      </div>
    </div>
  );
}
