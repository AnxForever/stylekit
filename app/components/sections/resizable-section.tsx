"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function ResizableSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      id="resizable"
      title="Resizable"
      description={t("components.resizable.description")}
    >
      <div className="space-y-8">
        <div>
          <p className="text-sm text-muted-foreground mb-3">{t("components.resizable.horizontal")}</p>
          <div className="h-48 border border-border rounded-lg overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel id="left" defaultSize={30} minSize={20}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    {t("components.resizable.leftPanel")}
                  </span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="left" withHandle />
              <ResizablePanel id="center" defaultSize={40} minSize={30}>
                <div className="h-full bg-muted/50 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    {t("components.resizable.centerPanel")}
                  </span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="center" withHandle />
              <ResizablePanel id="right" defaultSize={30} minSize={20}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    {t("components.resizable.rightPanel")}
                  </span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-3">{t("components.resizable.vertical")}</p>
          <div className="h-64 border border-border rounded-lg overflow-hidden">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel id="top" defaultSize={40} minSize={20}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    {t("components.resizable.topPanel")}
                  </span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="top" withHandle />
              <ResizablePanel id="bottom" defaultSize={60} minSize={30}>
                <div className="h-full bg-muted/50 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    {t("components.resizable.bottomPanel")}
                  </span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-3">{t("components.resizable.nested")}</p>
          <div className="h-72 border border-border rounded-lg overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel id="sidebar" defaultSize={25} minSize={15}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">{t("components.resizable.sidebar")}</span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="sidebar" withHandle />
              <ResizablePanel id="main" defaultSize={75}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel id="content" defaultSize={70} minSize={30}>
                    <div className="h-full bg-muted/50 p-4 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        {t("components.resizable.mainContent")}
                      </span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle id="content" />
                  <ResizablePanel id="terminal" defaultSize={30} minSize={20}>
                    <div className="h-full bg-muted/70 p-4 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        {t("components.resizable.terminal")}
                      </span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-3">{t("components.resizable.simpleDivider")}</p>
          <div className="h-32 border border-border rounded-lg overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel id="simple-left" defaultSize={50}>
                <div className="h-full bg-muted/30 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">{t("components.resizable.panelA")}</span>
                </div>
              </ResizablePanel>
              <ResizableHandle id="simple-left" />
              <ResizablePanel id="simple-right" defaultSize={50}>
                <div className="h-full bg-muted/50 p-4 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">{t("components.resizable.panelB")}</span>
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
