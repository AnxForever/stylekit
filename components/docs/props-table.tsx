import { cn } from "@/lib/utils";

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: PropDefinition[];
  className?: string;
}

export function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-muted">属性</th>
            <th className="text-left py-3 px-4 font-medium text-muted">类型</th>
            <th className="text-left py-3 px-4 font-medium text-muted">默认值</th>
            <th className="text-left py-3 px-4 font-medium text-muted">描述</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-border/50 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <td className="py-3 px-4">
                <code className="text-sm font-mono text-accent">{prop.name}</code>
                {prop.required && (
                  <span className="ml-1 text-red-500 text-xs">*</span>
                )}
              </td>
              <td className="py-3 px-4">
                <code className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                  {prop.type}
                </code>
              </td>
              <td className="py-3 px-4 text-muted">
                {prop.default ? (
                  <code className="text-xs font-mono">{prop.default}</code>
                ) : (
                  <span className="text-zinc-400">-</span>
                )}
              </td>
              <td className="py-3 px-4 text-muted">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Pre-defined props for common components
export const componentProps: Record<string, PropDefinition[]> = {
  Button: [
    { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "link" | "danger"', default: '"primary"', description: "按钮样式变体" },
    { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "按钮尺寸" },
    { name: "loading", type: "boolean", default: "false", description: "加载状态" },
    { name: "disabled", type: "boolean", default: "false", description: "禁用状态" },
    { name: "children", type: "ReactNode", required: true, description: "按钮内容" },
  ],
  Input: [
    { name: "type", type: "string", default: '"text"', description: "输入框类型" },
    { name: "placeholder", type: "string", description: "占位符文本" },
    { name: "disabled", type: "boolean", default: "false", description: "禁用状态" },
    { name: "error", type: "boolean", default: "false", description: "错误状态" },
  ],
  Card: [
    { name: "variant", type: '"default" | "bordered" | "elevated"', default: '"default"', description: "卡片样式" },
    { name: "padding", type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: "内边距大小" },
    { name: "children", type: "ReactNode", required: true, description: "卡片内容" },
  ],
  Dialog: [
    { name: "open", type: "boolean", required: true, description: "对话框是否打开" },
    { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "开关状态变化回调" },
    { name: "title", type: "string", description: "对话框标题" },
    { name: "description", type: "string", description: "对话框描述" },
  ],
  Tooltip: [
    { name: "content", type: "ReactNode", required: true, description: "提示内容" },
    { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "显示位置" },
    { name: "delayDuration", type: "number", default: "200", description: "延迟显示时间 (ms)" },
  ],
  Tabs: [
    { name: "defaultValue", type: "string", description: "默认激活的标签页" },
    { name: "value", type: "string", description: "受控模式下的激活标签页" },
    { name: "onValueChange", type: "(value: string) => void", description: "标签页切换回调" },
  ],
  Accordion: [
    { name: "type", type: '"single" | "multiple"', default: '"single"', description: "单选或多选模式" },
    { name: "collapsible", type: "boolean", default: "false", description: "是否可全部折叠" },
    { name: "defaultValue", type: "string | string[]", description: "默认展开项" },
  ],
  Toast: [
    { name: "title", type: "string", description: "Toast 标题" },
    { name: "description", type: "string", description: "Toast 描述" },
    { name: "variant", type: '"default" | "success" | "error"', default: '"default"', description: "Toast 类型" },
    { name: "duration", type: "number", default: "5000", description: "显示时长 (ms)" },
  ],
  Drawer: [
    { name: "open", type: "boolean", required: true, description: "抽屉是否打开" },
    { name: "onOpenChange", type: "(open: boolean) => void", required: true, description: "开关状态变化回调" },
    { name: "side", type: '"left" | "right"', default: '"right"', description: "抽屉位置" },
  ],
  Popover: [
    { name: "open", type: "boolean", description: "受控模式下的开关状态" },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "开关状态变化回调" },
    { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "弹出位置" },
    { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "对齐方式" },
  ],
  BrutalButton: [
    { name: "variant", type: '"primary" | "secondary" | "pink" | "green" | "blue" | "yellow" | "outline"', default: '"primary"', description: "按钮颜色变体" },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "按钮尺寸" },
    { name: "loading", type: "boolean", default: "false", description: "加载状态" },
  ],
  Alert: [
    { name: "variant", type: '"default" | "info" | "success" | "warning" | "error"', default: '"default"', description: "提示类型，决定颜色和图标" },
    { name: "icon", type: "boolean", default: "true", description: "是否显示变体对应的图标" },
    { name: "children", type: "ReactNode", required: true, description: "提示内容" },
  ],
  Loading: [
    { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "加载器尺寸" },
    { name: "color", type: '"default" | "accent" | "muted" | "white"', default: '"default"', description: "加载器颜色" },
    { name: "label", type: "string", description: "加载提示文本" },
  ],
  Progress: [
    { name: "value", type: "number", required: true, description: "进度值 (0-100)" },
    { name: "variant", type: '"default" | "accent" | "success" | "warning" | "error"', default: '"default"', description: "进度条颜色" },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "进度条高度" },
    { name: "showValue", type: "boolean", default: "false", description: "是否显示百分比数值" },
  ],
  Select: [
    { name: "value", type: "string", description: "受控模式下的当前选中值" },
    { name: "defaultValue", type: "string", description: "非受控模式下的默认选中值" },
    { name: "onValueChange", type: "(value: string) => void", description: "选中值变化回调" },
    { name: "disabled", type: "boolean", default: "false", description: "禁用状态" },
    { name: "placeholder", type: "string", description: "占位提示文本 (SelectValue 属性)" },
  ],
  Checkbox: [
    { name: "checked", type: "boolean", description: "受控模式下的选中状态" },
    { name: "defaultChecked", type: "boolean", description: "非受控模式下的默认选中状态" },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "选中状态变化回调" },
    { name: "disabled", type: "boolean", default: "false", description: "禁用状态" },
    { name: "label", type: "string", description: "复选框旁显示的标签文本" },
  ],
  Radio: [
    { name: "value", type: "string", required: true, description: "单选按钮的值 (RadioGroupItem)" },
    { name: "defaultValue", type: "string", description: "默认选中值 (RadioGroup)" },
    { name: "onValueChange", type: "(value: string) => void", description: "选中值变化回调 (RadioGroup)" },
    { name: "disabled", type: "boolean", default: "false", description: "禁用状态" },
    { name: "label", type: "string", description: "单选按钮旁显示的标签文本 (RadioGroupItem)" },
  ],
  Table: [
    { name: "className", type: "string", description: "自定义类名" },
    { name: "children", type: "ReactNode", required: true, description: "表格内容 (TableHeader, TableBody 等)" },
  ],
  List: [
    { name: "children", type: "ReactNode", required: true, description: "列表项 (ListItem)" },
  ],
  ListItemContent: [
    { name: "title", type: "ReactNode", description: "列表项主要文本" },
    { name: "description", type: "ReactNode", description: "列表项次要文本" },
    { name: "leading", type: "ReactNode", description: "左侧内容 (图标等)" },
    { name: "trailing", type: "ReactNode", description: "右侧内容 (时间、标签等)" },
  ],
  Pagination: [
    { name: "children", type: "ReactNode", required: true, description: "分页内容 (PaginationContent)" },
  ],
  PaginationLink: [
    { name: "isActive", type: "boolean", default: "false", description: "是否为当前页" },
    { name: "href", type: "string", description: "链接地址" },
  ],
  Tree: [
    { name: "data", type: "TreeNode[]", required: true, description: "树形结构数据" },
    { name: "defaultExpanded", type: "string[]", default: "[]", description: "默认展开的节点 ID 数组" },
  ],
  TreeNode: [
    { name: "id", type: "string", required: true, description: "节点唯一标识" },
    { name: "label", type: "ReactNode", required: true, description: "节点显示内容" },
    { name: "children", type: "TreeNode[]", description: "子节点数组" },
    { name: "icon", type: "ReactNode", description: "节点图标" },
  ],
};
