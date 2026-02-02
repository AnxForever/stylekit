"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function ResizableSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      id="resizable"
      title="Resizable"
      description="可调整大小的面板组件，支持水平和垂直布局"
    >
      <div className="space-y-8">
        {/* 水平布局 */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">水平布局</p>
          <div className="h-48 border border-border rounded-lg overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel id="left" defaultSize={30} minSize={20}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    左侧面板 (30%)
                  </span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="left" withHandle />
              <ResizablePanel id="center" defaultSize={40} minSize={30}>
                <div className="h-full bg-muted/50 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    中间面板 (40%)
                  </span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="center" withHandle />
              <ResizablePanel id="right" defaultSize={30} minSize={20}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    右侧面板 (30%)
                  </span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        {/* 垂直布局 */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">垂直布局</p>
          <div className="h-64 border border-border rounded-lg overflow-hidden">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel id="top" defaultSize={40} minSize={20}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    顶部面板
                  </span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="top" withHandle />
              <ResizablePanel id="bottom" defaultSize={60} minSize={30}>
                <div className="h-full bg-muted/50 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    底部面板
                  </span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        {/* 嵌套布局 */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">嵌套布局</p>
          <div className="h-72 border border-border rounded-lg overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel id="sidebar" defaultSize={25} minSize={15}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">侧边栏</span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="sidebar" withHandle />
              <ResizablePanel id="main" defaultSize={75}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel id="content" defaultSize={70} minSize={30}>
                    <div className="h-full bg-muted/50 p-4 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        主内容区
                      </span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle id="content" />
                  <ResizablePanel id="terminal" defaultSize={30} minSize={20}>
                    <div className="h-full bg-muted/70 p-4 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        终端/面板
                      </span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        {/* 无手柄样式 */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">简洁分隔线</p>
          <div className="h-32 border border-border rounded-lg overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel id="simple-left" defaultSize={50}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">面板 A</span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="simple-left" />
              <ResizablePanel id="simple-right" defaultSize={50}>
                <div className="h-full bg-muted/50 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">面板 B</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
      <PropsToggle
        component="Resizable"
        expanded={!!expandedProps.Resizable}
        onToggle={toggleProps}
      />
      <PropsPanel
        component="Resizable"
        expanded={!!expandedProps.Resizable}
      />
    </ComponentSection>
  );
}
