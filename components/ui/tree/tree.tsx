"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TreeNode {
  id: string;
  label: React.ReactNode;
  children?: TreeNode[];
  icon?: React.ReactNode;
  /** Optional click handler for leaf nodes. */
  onSelect?: () => void;
  /** Whether the leaf node is currently selected. */
  selected?: boolean;
}

interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TreeNode[];
  defaultExpanded?: string[];
}

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ data, defaultExpanded = [], className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tree"
        aria-label="Tree"
        className={cn("text-sm", className)}
        {...props}
      >
        <TreeLevel nodes={data} defaultExpanded={defaultExpanded} level={0} />
      </div>
    );
  }
);
Tree.displayName = "Tree";

interface TreeLevelProps {
  nodes: TreeNode[];
  defaultExpanded: string[];
  level: number;
}

function TreeLevel({ nodes, defaultExpanded, level }: TreeLevelProps) {
  const branchNodes = nodes.filter((n) => n.children && n.children.length > 0);
  const leafNodes = nodes.filter((n) => !n.children || n.children.length === 0);

  return (
    <>
      {branchNodes.length > 0 && (
        <AccordionPrimitive.Root
          type="multiple"
          defaultValue={defaultExpanded}
          role="group"
        >
          {branchNodes.map((node) => (
            <AccordionPrimitive.Item key={node.id} value={node.id}>
              <AccordionPrimitive.Trigger
                role="treeitem"
                aria-level={level + 1}
                aria-expanded={undefined}
                className={cn(
                  "flex w-full items-center gap-1.5 py-1.5 text-sm hover:text-accent transition-colors [&[data-state=open]>svg]:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded-sm",
                  level > 0 && "pl-4"
                )}
                style={{ paddingLeft: level > 0 ? `${level * 16}px` : undefined }}
              >
                <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-200" />
                {node.icon && <span className="shrink-0">{node.icon}</span>}
                <span className="truncate">{node.label}</span>
              </AccordionPrimitive.Trigger>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <TreeLevel
                  nodes={node.children!}
                  defaultExpanded={defaultExpanded}
                  level={level + 1}
                />
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      )}
      {leafNodes.map((node) => {
        const isInteractive = typeof node.onSelect === "function";
        const baseClass = cn(
          "flex items-center gap-1.5 py-1.5 text-sm transition-colors w-full text-left rounded-sm",
          node.selected
            ? "text-foreground font-medium"
            : "text-muted hover:text-foreground",
          isInteractive && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
        );
        const style = { paddingLeft: `${(level + 1) * 16 + 6}px` };
        const inner = (
          <>
            {node.icon && <span className="shrink-0">{node.icon}</span>}
            <span className="truncate">{node.label}</span>
          </>
        );

        if (!isInteractive) {
          return (
            <div
              key={node.id}
              role="treeitem"
              aria-level={level + 1}
              aria-selected={node.selected}
              className={baseClass}
              style={style}
            >
              {inner}
            </div>
          );
        }

        return (
          <button
            key={node.id}
            type="button"
            role="treeitem"
            aria-level={level + 1}
            aria-selected={!!node.selected}
            onClick={node.onSelect}
            className={baseClass}
            style={style}
          >
            {inner}
          </button>
        );
      })}
    </>
  );
}

export { Tree };
