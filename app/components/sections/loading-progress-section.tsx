"use client";

import { Loading } from "@/components/ui/loading";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
  progress: number;
  setProgress: (value: number) => void;
}

export function LoadingProgressSection({ expandedProps, toggleProps, progress, setProgress }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      title="Loading & Progress"
      description={t("components.loading.description")}
    >
      <div className="flex flex-wrap gap-8 items-center mb-8">
        <Loading size="sm" />
        <Loading size="md" />
        <Loading size="lg" />
        <Loading size="xl" color="accent" />
        <Loading label={t("components.loading.label")} />
      </div>
      <div className="max-w-md space-y-4">
        <Progress value={progress} />
        <Progress value={progress} variant="accent" showValue />
        <Progress value={80} variant="success" size="lg" />
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
          <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
        </div>
      </div>
      <div className="flex gap-4">
        <PropsToggle component="Loading" expanded={!!expandedProps.Loading} onToggle={toggleProps} />
        <PropsToggle component="Progress" expanded={!!expandedProps.Progress} onToggle={toggleProps} />
      </div>
      <PropsPanel component="Loading" expanded={!!expandedProps.Loading} label="Loading Props" />
      <PropsPanel component="Progress" expanded={!!expandedProps.Progress} label="Progress Props" />
    </ComponentSection>
  );
}
