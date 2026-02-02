"use client";

import { useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllStylesMeta } from "@/lib/styles/meta";
import { getStyleBySlug } from "@/lib/styles";
import type { DesignStyle } from "@/lib/styles";
import {
  componentLabels,
  renderStyleComponent,
  type ComponentType,
} from "@/lib/style-components";

type TabType = "components" | "colors" | "rules" | "philosophy";

const tabConfig: Array<{ id: TabType; label: string }> = [
  { id: "components", label: "组件" },
  { id: "colors", label: "配色" },
  { id: "rules", label: "规范" },
  { id: "philosophy", label: "理念" },
];

// ============================
// Color Compare Panel
// ============================
function ColorComparePanel({ style }: { style: DesignStyle }) {
  const colorItems = [
    { label: "Primary", value: style.colors.primary },
    { label: "Secondary", value: style.colors.secondary },
    ...style.colors.accent.map((c, i) => ({ label: `Accent ${i + 1}`, value: c })),
  ];

  return (
    <div className="space-y-4">
      {colorItems.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg border border-border shrink-0"
            style={{ background: item.value }}
          />
          <div>
            <p className="text-sm font-medium">{item.label}</p>
            <code className="text-xs text-muted">{item.value}</code>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================
// Rules Compare Panel
// ============================
function RulesComparePanel({ style }: { style: DesignStyle }) {
  return (
    <div className="grid gap-6">
      <div>
        <h4 className="text-sm font-medium text-green-600 mb-2">Do</h4>
        <ul className="space-y-1.5">
          {style.doList.map((item, i) => (
            <li key={i} className="text-sm text-muted flex gap-2">
              <span className="text-green-500 shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-medium text-red-600 mb-2">Don&apos;t</h4>
        <ul className="space-y-1.5">
          {style.dontList.map((item, i) => (
            <li key={i} className="text-sm text-muted flex gap-2">
              <span className="text-red-500 shrink-0">✕</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ============================
// Philosophy Compare Panel
// ============================
function PhilosophyComparePanel({ style }: { style: DesignStyle }) {
  return (
    <div className="prose prose-sm max-w-none">
      <p className="text-muted leading-relaxed whitespace-pre-line text-sm">
        {style.philosophy}
      </p>
    </div>
  );
}

// ============================
// Main Compare Content (uses useSearchParams)
// ============================
function CompareContent() {
  const styles = getAllStylesMeta();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read from URL, fallback to defaults
  const leftSlug = searchParams.get("left") || styles[0]?.slug || "";
  const rightSlug = searchParams.get("right") || styles[1]?.slug || "";
  const activeTab = (searchParams.get("tab") as TabType) || "components";
  const activeComponent = (searchParams.get("comp") as ComponentType) || "button";

  // Local state synced to URL
  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        params.set(key, value);
      }
      router.replace(`/compare?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const setLeftStyle = (slug: string) => updateParams({ left: slug });
  const setRightStyle = (slug: string) => updateParams({ right: slug });
  const setActiveTab = (tab: TabType) => updateParams({ tab });
  const setActiveComponent = (comp: ComponentType) => updateParams({ comp });

  const swapStyles = () => {
    updateParams({ left: rightSlug, right: leftSlug });
  };

  // Get full style data for color/rules/philosophy panels
  const leftFullStyle = getStyleBySlug(leftSlug);
  const rightFullStyle = getStyleBySlug(rightSlug);

  const getStyleName = (slug: string) => {
    return styles.find((s) => s.slug === slug)?.name || slug;
  };

  // Render the active tab content for one side
  const renderPanel = (slug: string, fullStyle: DesignStyle | undefined) => {
    if (!fullStyle) {
      return <div className="text-muted text-sm">未找到风格数据</div>;
    }

    switch (activeTab) {
      case "components":
        return (
          <div className="min-h-[200px] p-8 bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
            {renderStyleComponent(slug, activeComponent)}
          </div>
        );
      case "colors":
        return (
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
            <ColorComparePanel style={fullStyle} />
          </div>
        );
      case "rules":
        return (
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg max-h-[500px] overflow-y-auto">
            <RulesComparePanel style={fullStyle} />
          </div>
        );
      case "philosophy":
        return (
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg max-h-[500px] overflow-y-auto">
            <PhilosophyComparePanel style={fullStyle} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">
              Side-by-Side Comparison
            </p>
            <h1 className="text-4xl md:text-5xl mb-4">风格对比</h1>
            <p className="text-lg text-muted max-w-2xl">
              选择两个风格，从组件、配色、规范、理念多个维度对比差异。
            </p>
          </div>
        </section>

        {/* Controls */}
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
            <div className="flex flex-wrap items-center gap-6">
              {/* Tab Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">维度：</span>
                <div className="flex gap-2">
                  {tabConfig.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 text-sm transition-colors ${
                        activeTab === tab.id
                          ? "bg-foreground text-background"
                          : "border border-border hover:border-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Component Selector (only visible in components tab) */}
              {activeTab === "components" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted">组件：</span>
                  <div className="flex gap-2">
                    {(Object.keys(componentLabels) as ComponentType[]).map((comp) => (
                      <button
                        key={comp}
                        onClick={() => setActiveComponent(comp)}
                        className={`px-3 py-1.5 text-sm transition-colors ${
                          activeComponent === comp
                            ? "bg-foreground text-background"
                            : "border border-border hover:border-foreground"
                        }`}
                      >
                        {componentLabels[comp]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Swap Button */}
              <button
                onClick={swapStyles}
                className="px-3 py-1.5 text-sm border border-border hover:border-foreground transition-colors"
              >
                ⇄ 交换
              </button>
            </div>
          </div>
        </section>

        {/* Comparison Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Panel */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <select
                    value={leftSlug}
                    onChange={(e) => setLeftStyle(e.target.value)}
                    className="px-4 py-2 bg-background border border-border text-sm focus:outline-none focus:border-foreground"
                  >
                    {styles.map((style) => (
                      <option key={style.slug} value={style.slug}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                  <Link
                    href={`/styles/${leftSlug}`}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    查看详情 →
                  </Link>
                </div>
                {renderPanel(leftSlug, leftFullStyle)}
                <p className="text-center text-sm text-muted">{getStyleName(leftSlug)}</p>
              </div>

              {/* Right Panel */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <select
                    value={rightSlug}
                    onChange={(e) => setRightStyle(e.target.value)}
                    className="px-4 py-2 bg-background border border-border text-sm focus:outline-none focus:border-foreground"
                  >
                    {styles.map((style) => (
                      <option key={style.slug} value={style.slug}>
                        {style.name}
                      </option>
                    ))}
                  </select>
                  <Link
                    href={`/styles/${rightSlug}`}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    查看详情 →
                  </Link>
                </div>
                {renderPanel(rightSlug, rightFullStyle)}
                <p className="text-center text-sm text-muted">{getStyleName(rightSlug)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* All Components Preview (only in components tab) */}
        {activeTab === "components" && (
          <section className="border-t border-border py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <h2 className="text-2xl mb-8">全部组件对比</h2>
              <div className="space-y-12">
                {(Object.keys(componentLabels) as ComponentType[]).map((comp) => (
                  <div key={comp}>
                    <h3 className="text-lg font-medium mb-4">{componentLabels[comp]}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
                        {renderStyleComponent(leftSlug, comp)}
                      </div>
                      <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
                        {renderStyleComponent(rightSlug, comp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

// ============================
// Page with Suspense boundary for useSearchParams
// ============================
export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted">加载中...</p>
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
