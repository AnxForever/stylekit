"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function AlertSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      title="Alert"
      description={t("components.alert.description")}
    >
      <div className="grid gap-4 max-w-xl">
        <Alert>
          <AlertTitle>{t("components.alert.default")}</AlertTitle>
          <AlertDescription>{t("components.alert.defaultMsg")}</AlertDescription>
        </Alert>
        <Alert variant="info">
          <AlertTitle>{t("components.alert.info")}</AlertTitle>
          <AlertDescription>{t("components.alert.infoMsg")}</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>{t("components.alert.success")}</AlertTitle>
          <AlertDescription>{t("components.alert.successMsg")}</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTitle>{t("components.alert.warning")}</AlertTitle>
          <AlertDescription>{t("components.alert.warningMsg")}</AlertDescription>
        </Alert>
        <Alert variant="error">
          <AlertTitle>{t("components.alert.error")}</AlertTitle>
          <AlertDescription>{t("components.alert.errorMsg")}</AlertDescription>
        </Alert>
      </div>
      <PropsToggle component="Alert" expanded={!!expandedProps.Alert} onToggle={toggleProps} />
      <PropsPanel component="Alert" expanded={!!expandedProps.Alert} />
    </ComponentSection>
  );
}
