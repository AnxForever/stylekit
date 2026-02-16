"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useI18n } from "@/lib/i18n/context";
import dynamic from "next/dynamic";
const StylePreviewSwitcher = dynamic(
  () => import("@/components/style-preview-switcher").then(m => ({ default: m.StylePreviewSwitcher })),
  { loading: () => <div className="border border-border bg-zinc-50 dark:bg-zinc-900/50 p-6 text-center text-sm text-muted">Loading preview...</div> }
);

// Import all sections
import {
  ButtonSection,
  InputSection,
  CardSection,
  AlertSection,
  LoadingProgressSection,
  FormControlsSection,
  ModalTooltipSection,
  TableSection,
  DrawerPopoverSection,
  ToastSection,
  ListSection,
  PaginationSection,
  TreeSection,
  InputOTPSection,
  ResizableSection,
} from "./sections";

export default function ComponentsPage() {
  const { t } = useI18n();
  const [progress, setProgress] = useState(60);
  const [showToast, setShowToast] = useState(false);
  const [expandedProps, setExpandedProps] = useState<Record<string, boolean>>({});

  const toggleProps = (component: string) => {
    setExpandedProps((prev) => ({ ...prev, [component]: !prev[component] }));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                {t("components.hero.badge")}
              </p>
              <h1 className="text-4xl md:text-5xl leading-tight mb-6">
                UI Components
              </h1>
              <p className="text-lg text-muted max-w-2xl">
                {t("components.hero.description")}
              </p>
            </div>
          </section>

          {/* Style Preview Switcher */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <StylePreviewSwitcher />
            </div>
          </section>

          {/* Component Sections */}
          <ButtonSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <InputSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <CardSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <AlertSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <LoadingProgressSection
            expandedProps={expandedProps}
            toggleProps={toggleProps}
            progress={progress}
            setProgress={setProgress}
          />
          <FormControlsSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <ModalTooltipSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <TableSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <DrawerPopoverSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <ToastSection
            expandedProps={expandedProps}
            toggleProps={toggleProps}
            showToast={showToast}
            setShowToast={setShowToast}
          />
          <ListSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <PaginationSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <TreeSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <InputOTPSection expandedProps={expandedProps} toggleProps={toggleProps} />
          <ResizableSection expandedProps={expandedProps} toggleProps={toggleProps} />
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
}
