"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NEU_SHADOWS } from "./styles";

// ============================================
// NeuTabs - 标签页
// ============================================
export interface NeuTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
  defaultTab?: string;
}

export const NeuTabs: React.FC<NeuTabsProps> = ({ tabs, defaultTab, className, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);
  const tablistId = React.useId();

  return (
    <div className={cn("", className)} {...props}>
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="选项卡"
        className={cn(
          "inline-flex p-1.5 bg-[#e0e5ec] rounded-xl mb-4",
          NEU_SHADOWS.pressed
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tablistId}-panel-${tab.id}`}
            id={`${tablistId}-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? cn("bg-[#e0e5ec] text-gray-800", NEU_SHADOWS.raised)
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${tablistId}-panel-${tab.id}`}
          aria-labelledby={`${tablistId}-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className={cn(
            "bg-[#e0e5ec] rounded-xl p-6",
            NEU_SHADOWS.raised
          )}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
