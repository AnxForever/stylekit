"use client";

import { Button } from "@/components/ui/button";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function ButtonSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      id="button"
      title="Button"
      description="按钮组件，支持多种变体和尺寸"
    >
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center mt-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
      <PropsToggle component="Button" expanded={!!expandedProps.Button} onToggle={toggleProps} />
      <PropsPanel component="Button" expanded={!!expandedProps.Button} />
    </ComponentSection>
  );
}
