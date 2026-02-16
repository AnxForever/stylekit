"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function CardSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      id="card"
      title="Card"
      description={t("components.card.description")}
    >
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>{t("components.card.defaultDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{t("components.card.content")}</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Elevated Card</CardTitle>
            <CardDescription>{t("components.card.elevatedDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{t("components.card.content")}</p>
          </CardContent>
        </Card>
        <Card variant="ghost">
          <CardHeader>
            <CardTitle>Ghost Card</CardTitle>
            <CardDescription>{t("components.card.ghostDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{t("components.card.content")}</p>
          </CardContent>
        </Card>
      </div>
      <PropsToggle component="Card" expanded={!!expandedProps.Card} onToggle={toggleProps} />
      <PropsPanel component="Card" expanded={!!expandedProps.Card} />
    </ComponentSection>
  );
}
