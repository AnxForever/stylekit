"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

// ============ Resizable Panel Group ============

interface ResizablePanelGroupProps {
  children: React.ReactNode;
  /** Direction of panels */
  direction?: "horizontal" | "vertical";
  /** Auto save layout ID */
  autoSaveId?: string;
  /** Class name */
  className?: string;
  /** On layout change */
  onLayout?: (sizes: number[]) => void;
}

interface ResizableContextValue {
  direction: "horizontal" | "vertical";
  registerPanel: (id: string, defaultSize: number, minSize: number, maxSize: number) => void;
  getPanelSize: (id: string) => number;
  resize: (handleId: string, delta: number) => void;
}

const ResizableContext = React.createContext<ResizableContextValue | null>(null);

export function ResizablePanelGroup({
  children,
  direction = "horizontal",
  autoSaveId,
  className,
  onLayout,
}: ResizablePanelGroupProps) {
  const [panels, setPanels] = React.useState<
    Map<string, { size: number; minSize: number; maxSize: number; order: number }>
  >(new Map());
  const orderRef = React.useRef(0);

  // Load saved layout
  React.useEffect(() => {
    if (autoSaveId && typeof window !== "undefined") {
      const saved = localStorage.getItem(`resizable-${autoSaveId}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPanels(new Map(Object.entries(parsed)));
        } catch {
          // Ignore invalid saved data
        }
      }
    }
  }, [autoSaveId]);

  // Save layout
  React.useEffect(() => {
    if (autoSaveId && panels.size > 0 && typeof window !== "undefined") {
      const toSave = Object.fromEntries(panels);
      localStorage.setItem(`resizable-${autoSaveId}`, JSON.stringify(toSave));
    }
  }, [autoSaveId, panels]);

  const registerPanel = React.useCallback(
    (id: string, defaultSize: number, minSize: number, maxSize: number) => {
      setPanels((prev) => {
        if (prev.has(id)) return prev;
        const next = new Map(prev);
        next.set(id, { size: defaultSize, minSize, maxSize, order: orderRef.current++ });
        return next;
      });
    },
    []
  );

  const getPanelSize = React.useCallback(
    (id: string) => panels.get(id)?.size ?? 50,
    [panels]
  );

  const resize = React.useCallback(
    (handleId: string, delta: number) => {
      setPanels((prev) => {
        const panelIds = Array.from(prev.entries())
          .sort((a, b) => a[1].order - b[1].order)
          .map(([id]) => id);

        const handleIndex = panelIds.findIndex((id) => id === handleId.replace("-handle", ""));
        if (handleIndex === -1 || handleIndex >= panelIds.length - 1) return prev;

        const leftId = panelIds[handleIndex];
        const rightId = panelIds[handleIndex + 1];
        const left = prev.get(leftId);
        const right = prev.get(rightId);

        if (!left || !right) return prev;

        let newLeftSize = left.size + delta;
        let newRightSize = right.size - delta;

        // Clamp to min/max
        if (newLeftSize < left.minSize) {
          newLeftSize = left.minSize;
          newRightSize = left.size + right.size - newLeftSize;
        }
        if (newLeftSize > left.maxSize) {
          newLeftSize = left.maxSize;
          newRightSize = left.size + right.size - newLeftSize;
        }
        if (newRightSize < right.minSize) {
          newRightSize = right.minSize;
          newLeftSize = left.size + right.size - newRightSize;
        }
        if (newRightSize > right.maxSize) {
          newRightSize = right.maxSize;
          newLeftSize = left.size + right.size - newRightSize;
        }

        const next = new Map(prev);
        next.set(leftId, { ...left, size: newLeftSize });
        next.set(rightId, { ...right, size: newRightSize });

        // Notify layout change
        const sizes = panelIds.map((id) => next.get(id)?.size ?? 50);
        onLayout?.(sizes);

        return next;
      });
    },
    [onLayout]
  );

  return (
    <ResizableContext.Provider value={{ direction, registerPanel, getPanelSize, resize }}>
      <div
        className={cn(
          "flex h-full w-full",
          direction === "vertical" && "flex-col",
          className
        )}
        data-panel-group
        data-direction={direction}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  );
}

// ============ Resizable Panel ============

interface ResizablePanelProps {
  children: React.ReactNode;
  /** Unique panel ID */
  id: string;
  /** Default size (percentage) */
  defaultSize?: number;
  /** Minimum size (percentage) */
  minSize?: number;
  /** Maximum size (percentage) */
  maxSize?: number;
  /** Collapsible */
  collapsible?: boolean;
  /** Collapsed size when collapsible */
  collapsedSize?: number;
  /** Class name */
  className?: string;
}

export function ResizablePanel({
  children,
  id,
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  collapsible = false,
  collapsedSize = 0,
  className,
}: ResizablePanelProps) {
  const context = React.useContext(ResizableContext);

  React.useEffect(() => {
    if (context) {
      context.registerPanel(id, defaultSize, minSize, maxSize);
    }
  }, [context, id, defaultSize, minSize, maxSize]);

  if (!context) {
    return <div className={className}>{children}</div>;
  }

  const baseSize = context.getPanelSize(id);
  const isCollapsed = collapsible && baseSize <= collapsedSize;
  const size = isCollapsed ? collapsedSize : baseSize;
  const { direction } = context;

  const style: React.CSSProperties =
    direction === "horizontal"
      ? { width: `${size}%`, minWidth: 0 }
      : { height: `${size}%`, minHeight: 0 };

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={style}
      data-panel
      data-panel-id={id}
      data-collapsed={isCollapsed}
    >
      {children}
    </div>
  );
}

// ============ Resizable Handle ============

interface ResizableHandleProps {
  /** Panel ID this handle belongs to */
  id?: string;
  /** Show grip icon */
  withHandle?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Class name */
  className?: string;
}

export function ResizableHandle({
  id,
  withHandle = false,
  disabled = false,
  className,
}: ResizableHandleProps) {
  const context = React.useContext(ResizableContext);
  const [isDragging, setIsDragging] = React.useState(false);
  const handleRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !context || !id) return;

      e.preventDefault();
      setIsDragging(true);

      const startX = e.clientX;
      const startY = e.clientY;
      const container = handleRef.current?.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerSize =
        context.direction === "horizontal"
          ? containerRect.width
          : containerRect.height;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaPixels =
          context.direction === "horizontal"
            ? moveEvent.clientX - startX
            : moveEvent.clientY - startY;
        const deltaPercent = (deltaPixels / containerSize) * 100;
        context.resize(`${id}-handle`, deltaPercent);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [context, id, disabled]
  );

  if (!context) return null;

  const { direction } = context;
  const isHorizontal = direction === "horizontal";

  return (
    <div
      ref={handleRef}
      className={cn(
        "relative flex items-center justify-center",
        "bg-border hover:bg-primary/20 transition-colors",
        isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize",
        isDragging && "bg-primary/30",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onMouseDown={handleMouseDown}
      data-resize-handle
      data-direction={direction}
      role="separator"
      aria-orientation={isHorizontal ? "vertical" : "horizontal"}
      tabIndex={disabled ? -1 : 0}
    >
      {withHandle && (
        <div
          className={cn(
            "z-10 flex items-center justify-center",
            "w-4 h-8 rounded-sm bg-border border border-border",
            isHorizontal ? "rotate-0" : "rotate-90"
          )}
        >
          <GripVertical className="w-3 h-3 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
