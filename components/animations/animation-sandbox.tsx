"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { AnimationPreview } from "@/components/animations/animation-preview";
import type { Animation } from "@/lib/animations/types";

const AnimationCodeTabs = dynamic(
  () =>
    import("@/components/animations/animation-code-tabs").then((m) => ({
      default: m.AnimationCodeTabs,
    })),
  {
    ssr: false,
    loading: () => <TabSkeleton />,
  }
);
const AnimationPlayground = dynamic(
  () =>
    import("@/components/animations/animation-playground").then((m) => ({
      default: m.AnimationPlayground,
    })),
  {
    ssr: false,
    loading: () => <TabSkeleton />,
  }
);

type SandboxTab = "code" | "playground";

interface AnimationSandboxProps {
  animation: Animation;
}

export function AnimationSandbox({ animation }: AnimationSandboxProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<SandboxTab>("code");
  const [previewKey, setPreviewKey] = useState(0);

  return (
    <div className="border border-border overflow-hidden">
      {/* Split layout: left preview, right tabs */}
      <div className="flex flex-col lg:flex-row">
        {/* Left: Preview (60%) */}
        <div className="relative lg:w-[60%] border-b lg:border-b-0 lg:border-r border-border">
          <div className="min-h-[300px] lg:min-h-[420px]">
            <AnimationPreview
              key={previewKey}
              slug={animation.slug}
              bg={animation.previewBg}
            />
          </div>
          {/* Replay overlay button */}
          <button
            type="button"
            onClick={() => setPreviewKey((k) => k + 1)}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-background/80 border border-border text-muted backdrop-blur-sm hover:text-foreground hover:border-foreground transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            {t("animations.replay")}
          </button>
        </div>

        {/* Right: Tabs (40%) */}
        <div className="lg:w-[40%] flex flex-col min-h-[300px] lg:min-h-[420px]">
          {/* Tab bar */}
          <div className="flex border-b border-border bg-muted/30 shrink-0">
            <button
              type="button"
              data-sandbox-tab="code"
              onClick={() => setActiveTab("code")}
              className={`px-4 py-2.5 text-xs font-medium transition-colors ${
                activeTab === "code"
                  ? "text-foreground border-b-2 border-foreground bg-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t("animations.codeTab")}
            </button>
            <button
              type="button"
              data-sandbox-tab="playground"
              onClick={() => setActiveTab("playground")}
              className={`px-4 py-2.5 text-xs font-medium transition-colors ${
                activeTab === "playground"
                  ? "text-foreground border-b-2 border-foreground bg-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t("animations.playground")}
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-auto">
            {activeTab === "code" ? (
              <AnimationCodeTabs snippets={animation.codeSnippets} />
            ) : (
              <AnimationPlayground animation={animation} embedded />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-24 rounded bg-muted/20" />
      <div className="h-3 w-3/4 rounded bg-muted/20" />
      <div className="h-3 w-1/2 rounded bg-muted/20" />
    </div>
  );
}
