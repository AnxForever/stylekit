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
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function FormControlsSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      title="Form Controls"
      description={t("components.formControls.description")}
    >
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-sm font-medium mb-2">Select</p>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("components.formControls.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">{t("components.formControls.option1")}</SelectItem>
              <SelectItem value="option2">{t("components.formControls.option2")}</SelectItem>
              <SelectItem value="option3">{t("components.formControls.option3")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Checkbox</p>
          <div className="space-y-2">
            <Checkbox label={t("components.formControls.checkA")} />
            <Checkbox label={t("components.formControls.checkB")} defaultChecked />
            <Checkbox label={t("components.formControls.checkDisabled")} disabled />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Radio</p>
          <RadioGroup defaultValue="option1">
            <RadioGroupItem value="option1" label={t("components.formControls.radio1")} />
            <RadioGroupItem value="option2" label={t("components.formControls.radio2")} />
            <RadioGroupItem value="option3" label={t("components.formControls.radio3")} />
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
