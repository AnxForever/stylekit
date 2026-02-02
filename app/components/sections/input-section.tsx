"use client";

import { Input } from "@/components/ui/input";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function InputSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      id="input"
      title="Input"
      description="输入框组件，支持多种变体"
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
