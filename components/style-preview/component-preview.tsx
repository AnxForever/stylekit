"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";
import type { ComponentTemplate } from "@/lib/styles";

interface ComponentPreviewProps {
  components: Record<string, ComponentTemplate>;
}

const tabLabels: Record<string, string> = {
  button: "按钮",
  card: "卡片",
  input: "输入框",
  nav: "导航栏",
  hero: "Hero",
  footer: "页脚",
};

export function ComponentPreview({ components }: ComponentPreviewProps) {
  const componentKeys = Object.keys(components);
  const [activeTab, setActiveTab] = useState(componentKeys[0]);
  const activeComponent = components[activeTab];

  if (!activeComponent) return null;

  return (
    <div className="border border-border">
      {/* Tab Bar */}
      <div className="flex overflow-x-auto border-b border-border scrollbar-hide">
        {componentKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-3 text-sm tracking-wide whitespace-nowrap transition-colors ${
              activeTab === key
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground hover:bg-zinc-50"
            }`}
          >
            {tabLabels[key] || components[key].name}
          </button>
        ))}
      </div>

      {/* Component Info */}
      <div className="px-4 md:px-6 py-4 border-b border-border">
        <h4 className="font-serif text-lg">{activeComponent.name}</h4>
        <p className="text-sm text-muted mt-1">
          {activeComponent.description}
        </p>
      </div>

      {/* Preview Area */}
      <div className="p-6 md:p-10 bg-white flex items-center justify-center min-h-[200px]">
        <div
          dangerouslySetInnerHTML={{
            __html: activeComponent.preview || generatePreviewHTML(activeComponent.code),
          }}
        />
      </div>

      {/* Code */}
      <CodeBlock code={activeComponent.code} />
    </div>
  );
}

// 简单地从 JSX 代码生成可预览的 HTML
function generatePreviewHTML(code: string): string {
  return code
    .replace(/className=/g, "class=")
    .replace(/\{`([^`]*)`\}/g, "$1")
    .replace(/\{\/\*.*?\*\/\}/g, "")
    .trim();
}
