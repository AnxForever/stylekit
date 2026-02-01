"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function AlertSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      title="Alert"
      description="警告提示组件"
    >
      <div className="grid gap-4 max-w-xl">
        <Alert>
          <AlertTitle>默认提示</AlertTitle>
          <AlertDescription>这是一条默认的提示信息。</AlertDescription>
        </Alert>
        <Alert variant="info">
          <AlertTitle>信息</AlertTitle>
          <AlertDescription>这是一条信息提示。</AlertDescription>
        </Alert>
        <Alert variant="success">
          <AlertTitle>成功</AlertTitle>
          <AlertDescription>操作已成功完成。</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <AlertTitle>警告</AlertTitle>
          <AlertDescription>请注意潜在的问题。</AlertDescription>
        </Alert>
        <Alert variant="error">
          <AlertTitle>错误</AlertTitle>
          <AlertDescription>操作失败，请重试。</AlertDescription>
        </Alert>
      </div>
      <PropsToggle component="Alert" expanded={!!expandedProps.Alert} onToggle={toggleProps} />
      <PropsPanel component="Alert" expanded={!!expandedProps.Alert} />
    </ComponentSection>
  );
}
