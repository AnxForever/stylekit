"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// Neo-Brutalist Tabs
// ============================================
export interface BrutalTabsProps {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  defaultTab?: string;
  /** Accessible label for the tablist, surfaced to screen readers. */
  ariaLabel?: string;
}

export const BrutalTabs: React.FC<BrutalTabsProps> = ({
  tabs,
  defaultTab,
  ariaLabel = "Tabs",
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);
  const tablistRef = React.useRef<HTMLDivElement>(null);

  // Arrow / Home / End keyboard nav between tab buttons.
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let newIndex: number | null = null;

    if (e.key === "ArrowRight") {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    } else if (e.key === "ArrowLeft") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = tabs.length - 1;
    }

    if (newIndex !== null) {
      e.preventDefault();
      setActiveTab(tabs[newIndex].id);
      const buttons = tablistRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons?.[newIndex]?.focus();
    }
  };

  return (
    <div>
      {/* Tab Headers */}
      <div
        ref={tablistRef}
        role="tablist"
        aria-label={ariaLabel}
        className="flex border-2 md:border-4 border-black"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "flex-1 px-4 py-3 md:px-6 md:py-4 font-black text-sm md:text-base transition-colors",
              "border-r-2 md:border-r-4 border-black last:border-r-0",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brutal-pink focus-visible:ring-offset-2",
              activeTab === tab.id
                ? "bg-black text-white"
                : "bg-white hover:bg-brutal-green"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
          className={cn(
            "p-4 md:p-6 border-2 md:border-4 border-t-0 border-black bg-white",
            activeTab !== tab.id && "hidden"
          )}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
