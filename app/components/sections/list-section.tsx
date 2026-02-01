"use client";

import { List, ListItem, ListItemContent } from "@/components/ui/list";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function ListSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      title="List"
      description="列表组件"
    >
      <div className="max-w-md">
        <List>
          <ListItem>
            <ListItemContent
              leading={<span className="text-xl">📄</span>}
              title="文档标题"
              description="这是文档的描述信息"
              trailing={<span className="text-xs text-muted">2024</span>}
            />
          </ListItem>
          <ListItem>
            <ListItemContent
              leading={<span className="text-xl">📁</span>}
              title="文件夹"
              description="包含 12 个项目"
            />
          </ListItem>
          <ListItem>
            <ListItemContent
              leading={<span className="text-xl">🖼️</span>}
              title="图片文件"
              description="PNG 格式，2.4 MB"
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
