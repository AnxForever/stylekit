"use client";

import { Input } from "@/components/ui/input";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function InputSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      id="input"
      title="Input"
      description={t("components.input.description")}
    >
      <div className="grid md:grid-cols-3 gap-4 max-w-2xl">
        <Input placeholder="Default" />
        <Input variant="filled" placeholder="Filled" />
        <Input variant="flushed" placeholder="Flushed" />
        <Input error placeholder="Error state" />
        <Input disabled placeholder="Disabled" />
      </div>
      <PropsToggle component="Input" expanded={!!expandedProps.Input} onToggle={toggleProps} />
      <PropsPanel component="Input" expanded={!!expandedProps.Input} />
    </ComponentSection>
  );
}
