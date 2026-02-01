"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useState } from "react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loading } from "@/components/ui/loading";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalTrigger,
  ModalClose,
} from "@/components/ui/modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast";
import { List, ListItem, ListItemContent } from "@/components/ui/list";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Tree } from "@/components/ui/tree";
import type { TreeNode } from "@/components/ui/tree";

export default function ComponentsPage() {
  const [progress, setProgress] = useState(60);
  const [showToast, setShowToast] = useState(false);

  const treeData: TreeNode[] = [
    {
      id: "src",
      label: "src",
      children: [
        {
          id: "components",
          label: "components",
          children: [
            { id: "button", label: "Button.tsx" },
            { id: "card", label: "Card.tsx" },
          ],
        },
        { id: "app", label: "App.tsx" },
        { id: "index", label: "index.tsx" },
      ],
    },
    {
      id: "public",
      label: "public",
      children: [{ id: "favicon", label: "favicon.ico" }],
    },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
              <p className="text-xs tracking-widest uppercase text-muted mb-4">
                组件库
              </p>
              <h1 className="text-4xl md:text-5xl leading-tight mb-6">
                UI Components
              </h1>
              <p className="text-lg text-muted max-w-2xl">
                基于 Radix UI + Tailwind CSS 构建的 18 个通用组件，支持主题定制和无障碍访问。
              </p>
            </div>
          </section>

          {/* Button */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Button</h2>
              <p className="text-sm text-muted mb-6">按钮组件，支持多种变体和尺寸</p>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center mt-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </section>

          {/* Input */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Input</h2>
              <p className="text-sm text-muted mb-6">输入框组件，支持多种变体</p>
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl">
                <Input placeholder="Default" />
                <Input variant="filled" placeholder="Filled" />
                <Input variant="flushed" placeholder="Flushed" />
                <Input error placeholder="Error state" />
                <Input disabled placeholder="Disabled" />
              </div>
            </div>
          </section>

          {/* Card */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Card</h2>
              <p className="text-sm text-muted mb-6">卡片组件，用于内容分组</p>
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
            </div>
          </section>

          {/* Alert */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Alert</h2>
              <p className="text-sm text-muted mb-6">警告提示组件</p>
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
            </div>
          </section>

          {/* Loading & Progress */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Loading & Progress</h2>
              <p className="text-sm text-muted mb-6">加载和进度指示器</p>
              <div className="flex flex-wrap gap-8 items-center mb-8">
                <Loading size="sm" />
                <Loading size="md" />
                <Loading size="lg" />
                <Loading size="xl" color="accent" />
                <Loading label="加载中..." />
              </div>
              <div className="max-w-md space-y-4">
                <Progress value={progress} />
                <Progress value={progress} variant="accent" showValue />
                <Progress value={80} variant="success" size="lg" />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
                  <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Form Controls */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Form Controls</h2>
              <p className="text-sm text-muted mb-6">表单控件：Select、Checkbox、Radio</p>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm font-medium mb-2">Select</p>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择一个选项" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">选项一</SelectItem>
                      <SelectItem value="option2">选项二</SelectItem>
                      <SelectItem value="option3">选项三</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Checkbox</p>
                  <div className="space-y-2">
                    <Checkbox label="选项 A" />
                    <Checkbox label="选项 B" defaultChecked />
                    <Checkbox label="禁用" disabled />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Radio</p>
                  <RadioGroup defaultValue="option1">
                    <RadioGroupItem value="option1" label="选项一" />
                    <RadioGroupItem value="option2" label="选项二" />
                    <RadioGroupItem value="option3" label="选项三" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </section>

          {/* Modal & Tooltip */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Modal & Tooltip</h2>
              <p className="text-sm text-muted mb-6">弹窗和提示组件</p>
              <div className="flex flex-wrap gap-4">
                <Modal>
                  <ModalTrigger asChild>
                    <Button>打开 Modal</Button>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalHeader>
                      <ModalTitle>Modal 标题</ModalTitle>
                      <ModalDescription>
                        这是一个基于 Radix Dialog 构建的 Modal 组件，支持焦点管理和无障碍访问。
                      </ModalDescription>
                    </ModalHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted">Modal 内容区域，可以放置任何内容。</p>
                    </div>
                    <ModalFooter>
                      <ModalClose asChild>
                        <Button variant="outline">取消</Button>
                      </ModalClose>
                      <Button>确认</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">悬停查看 Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>这是一个 Tooltip 提示</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </section>

          {/* Table */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Table</h2>
              <p className="text-sm text-muted mb-6">数据表格组件</p>
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
                    <TableCell>开发中</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">编辑</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bento Grid</TableCell>
                    <TableCell>布局风格</TableCell>
                    <TableCell>计划中</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">编辑</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Drawer & Popover */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Drawer & Popover</h2>
              <p className="text-sm text-muted mb-6">抽屉和弹出层组件</p>
              <div className="flex flex-wrap gap-4">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button>打开 Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Drawer 标题</DrawerTitle>
                      <DrawerDescription>
                        这是一个从右侧滑出的抽屉组件
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <p className="text-muted">抽屉内容区域</p>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">关闭</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">打开 Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">Popover 标题</h4>
                      <p className="text-sm text-muted">
                        这是一个弹出层组件，可以展示额外信息。
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </section>

          {/* Toast */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Toast</h2>
              <p className="text-sm text-muted mb-6">消息提示组件</p>
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
            </div>
          </section>

          {/* List */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">List</h2>
              <p className="text-sm text-muted mb-6">列表组件</p>
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
            </div>
          </section>

          {/* Pagination */}
          <section className="border-b border-border">
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Pagination</h2>
              <p className="text-sm text-muted mb-6">分页组件</p>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">10</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </section>

          {/* Tree */}
          <section>
            <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
              <h2 className="text-2xl mb-2">Tree</h2>
              <p className="text-sm text-muted mb-6">树形结构组件</p>
              <div className="max-w-xs border border-border rounded-lg p-4">
                <Tree data={treeData} defaultExpanded={["src", "components"]} />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
}
