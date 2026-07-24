import type { ReactNode } from "react";
import { styleComponents } from "@/lib/style-preview/registry";
import type { StylePreviewKind } from "@/lib/style-preview/types";

export type ComponentType = StylePreviewKind;

export const componentLabels: Record<ComponentType, string> = {
  button: "按钮",
  card: "卡片",
  input: "输入框",
  coverPreview: "封面预览",
};

export { styleComponents };

export function renderStyleComponent(
  styleSlug: string,
  component: ComponentType,
): ReactNode {
  const styleRenderer = styleComponents[styleSlug];
  if (!styleRenderer) {
    return <div className="text-muted text-sm">此风格暂无组件预览</div>;
  }

  return (
    styleRenderer[component]?.() ?? (
      <div className="text-muted text-sm">暂无此组件</div>
    )
  );
}
