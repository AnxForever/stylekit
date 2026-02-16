"use client";

import { Button } from "@/components/ui/button";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
  showToast: boolean;
  setShowToast: (value: boolean) => void;
}

export function ToastSection({ expandedProps, toggleProps, showToast, setShowToast }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      id="toast"
      title="Toast"
      description={t("components.toast.description")}
    >
      <ToastProvider>
        <Button onClick={() => setShowToast(true)}>
          {t("components.toast.show")}
        </Button>
        <Toast open={showToast} onOpenChange={setShowToast} variant="success">
          <div className="flex-1">
            <ToastTitle>{t("components.toast.successTitle")}</ToastTitle>
            <ToastDescription>
              {t("components.toast.successMsg")}
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
      <PropsToggle component="Toast" expanded={!!expandedProps.Toast} onToggle={toggleProps} />
      <PropsPanel component="Toast" expanded={!!expandedProps.Toast} />
    </ComponentSection>
  );
}
