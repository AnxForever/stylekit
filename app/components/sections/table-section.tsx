"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function TableSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      title="Table"
      description={t("components.table.description")}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("components.table.name")}</TableHead>
            <TableHead>{t("components.table.type")}</TableHead>
            <TableHead>{t("components.table.status")}</TableHead>
            <TableHead className="text-right">{t("components.table.action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Neo-Brutalist</TableCell>
            <TableCell>{t("components.table.designStyle")}</TableCell>
            <TableCell>{t("components.table.published")}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">{t("components.table.edit")}</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Glassmorphism</TableCell>
            <TableCell>{t("components.table.designStyle")}</TableCell>
            <TableCell>{t("components.table.published")}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">{t("components.table.edit")}</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bento Grid</TableCell>
            <TableCell>{t("components.table.layoutStyle")}</TableCell>
            <TableCell>{t("components.table.published")}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">{t("components.table.edit")}</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <PropsToggle component="Table" expanded={!!expandedProps.Table} onToggle={toggleProps} />
      <PropsPanel component="Table" expanded={!!expandedProps.Table} />
    </ComponentSection>
  );
}
