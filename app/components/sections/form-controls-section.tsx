"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function FormControlsSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      title="Form Controls"
      description="表单控件：Select、Checkbox、Radio"
    >
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-sm font-medium mb-2">Select</p>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="选择一个选项" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">选项一</SelectItem>
              <SelectItem value="option2">选项二</SelectItem>
              <SelectItem value="option3">选项三</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Checkbox</p>
          <div className="space-y-2">
            <Checkbox label="选项 A" />
            <Checkbox label="选项 B" defaultChecked />
            <Checkbox label="禁用" disabled />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Radio</p>
          <RadioGroup defaultValue="option1">
            <RadioGroupItem value="option1" label="选项一" />
            <RadioGroupItem value="option2" label="选项二" />
            <RadioGroupItem value="option3" label="选项三" />
          </RadioGroup>
        </div>
      </div>
      <div className="flex gap-4">
        <PropsToggle component="Select" expanded={!!expandedProps.Select} onToggle={toggleProps} />
        <PropsToggle component="Checkbox" expanded={!!expandedProps.Checkbox} onToggle={toggleProps} />
        <PropsToggle component="Radio" expanded={!!expandedProps.Radio} onToggle={toggleProps} />
      </div>
      <PropsPanel component="Select" expanded={!!expandedProps.Select} label="Select Props" />
      <PropsPanel component="Checkbox" expanded={!!expandedProps.Checkbox} label="Checkbox Props" />
      <PropsPanel component="Radio" expanded={!!expandedProps.Radio} label="Radio Props" />
    </ComponentSection>
  );
}
