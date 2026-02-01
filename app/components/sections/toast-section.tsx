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

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
  showToast: boolean;
  setShowToast: (value: boolean) => void;
}

export function ToastSection({ expandedProps, toggleProps, showToast, setShowToast }: Props) {
  return (
    <ComponentSection
      id="toast"
      title="Toast"
      description="消息提示组件"
    >
      <ToastProvider>
        <Button onClick={() => setShowToast(true)}>
          显示 Toast
        </Button>
        <Toast open={showToast} onOpenChange={setShowToast} variant="success">
          <div className="flex-1">
            <ToastTitle>操作成功</ToastTitle>
            <ToastDescription>
              您的更改已保存
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
