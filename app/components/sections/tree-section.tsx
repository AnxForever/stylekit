"use client";

import { Tree } from "@/components/ui/tree";
import type { TreeNode } from "@/components/ui/tree";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

const treeData: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button", label: "Button.tsx" },
          { id: "card", label: "Card.tsx" },
        ],
      },
      { id: "app", label: "App.tsx" },
      { id: "index", label: "index.tsx" },
    ],
  },
  {
    id: "public",
    label: "public",
    children: [{ id: "favicon", label: "favicon.ico" }],
  },
];

export function TreeSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      title="Tree"
      description="树形结构组件"
      noBorder
    >
      <div className="max-w-xs border border-border rounded-lg p-4">
        <Tree data={treeData} defaultExpanded={["src", "components"]} />
      </div>
      <div className="flex gap-4">
        <PropsToggle component="Tree" expanded={!!expandedProps.Tree} onToggle={toggleProps} />
        <PropsToggle component="TreeNode" expanded={!!expandedProps.TreeNode} onToggle={toggleProps} />
      </div>
      <PropsPanel component="Tree" expanded={!!expandedProps.Tree} label="Tree Props" />
      <PropsPanel component="TreeNode" expanded={!!expandedProps.TreeNode} label="TreeNode Data Structure" />
    </ComponentSection>
  );
}
