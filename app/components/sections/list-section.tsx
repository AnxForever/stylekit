"use client";

import { List, ListItem, ListItemContent } from "@/components/ui/list";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";
import { FileText, Folder, Image as ImageIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function ListSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      title="List"
      description={t("components.list.description")}
    >
      <div className="max-w-md">
        <List>
          <ListItem>
            <ListItemContent
              leading={<FileText className="w-5 h-5 text-muted" />}
              title={t("components.list.docTitle")}
              description={t("components.list.docDesc")}
              trailing={<span className="text-xs text-muted">2024</span>}
            />
          </ListItem>
          <ListItem>
            <ListItemContent
              leading={<Folder className="w-5 h-5 text-muted" />}
              title={t("components.list.folder")}
              description={t("components.list.folderDesc")}
            />
          </ListItem>
          <ListItem>
            <ListItemContent
              leading={<ImageIcon className="w-5 h-5 text-muted" />}
              title={t("components.list.image")}
              description={t("components.list.imageDesc")}
            />
          </ListItem>
        </List>
      </div>
      <div className="flex gap-4">
        <PropsToggle component="List" expanded={!!expandedProps.List} onToggle={toggleProps} />
        <PropsToggle component="ListItemContent" expanded={!!expandedProps.ListItemContent} onToggle={toggleProps} />
      </div>
      <PropsPanel component="List" expanded={!!expandedProps.List} label="List Props" />
      <PropsPanel component="ListItemContent" expanded={!!expandedProps.ListItemContent} label="ListItemContent Props" />
    </ComponentSection>
  );
}
