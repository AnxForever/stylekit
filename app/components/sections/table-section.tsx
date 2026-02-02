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

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function TableSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      title="Table"
      description="数据表格组件"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Neo-Brutalist</TableCell>
            <TableCell>设计风格</TableCell>
            <TableCell>已发布</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">编辑</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Glassmorphism</TableCell>
            <TableCell>设计风格</TableCell>
            <TableCell>已发布</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">编辑</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bento Grid</TableCell>
            <TableCell>布局风格</TableCell>
            <TableCell>已发布</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">编辑</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <PropsToggle component="Table" expanded={!!expandedProps.Table} onToggle={toggleProps} />
      <PropsPanel component="Table" expanded={!!expandedProps.Table} />
    </ComponentSection>
  );
}
