"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function CardSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      id="card"
      title="Card"
      description="卡片组件，用于内容分组"
    >
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>带边框的默认卡片样式</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">卡片内容区域</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Elevated Card</CardTitle>
            <CardDescription>带阴影的悬浮卡片</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">卡片内容区域</p>
          </CardContent>
        </Card>
        <Card variant="ghost">
          <CardHeader>
            <CardTitle>Ghost Card</CardTitle>
            <CardDescription>无边框的透明卡片</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">卡片内容区域</p>
          </CardContent>
        </Card>
      </div>
      <PropsToggle component="Card" expanded={!!expandedProps.Card} onToggle={toggleProps} />
      <PropsPanel component="Card" expanded={!!expandedProps.Card} />
    </ComponentSection>
  );
}
