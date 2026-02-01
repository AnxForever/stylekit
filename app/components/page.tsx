"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

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
} from "./sections";

export default function ComponentsPage() {
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
                组件库
              </p>
              <h1 className="text-4xl md:text-5xl leading-tight mb-6">
                UI Components
              </h1>
              <p className="text-lg text-muted max-w-2xl">
                基于 Radix UI + Tailwind CSS 构建的 18 个通用组件，支持主题定制和无障碍访问。
              </p>
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
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
}
