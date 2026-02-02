"use client";

import { Button } from "@/components/ui/button";
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
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function DrawerPopoverSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      id="drawer"
      title="Drawer & Popover"
      description="抽屉和弹出层组件"
    >
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
      <div className="flex gap-4">
        <PropsToggle component="Drawer" expanded={!!expandedProps.Drawer} onToggle={toggleProps} />
        <PropsToggle component="Popover" expanded={!!expandedProps.Popover} onToggle={toggleProps} />
      </div>
      <PropsPanel component="Drawer" expanded={!!expandedProps.Drawer} label="Drawer Props" />
      <PropsPanel component="Popover" expanded={!!expandedProps.Popover} label="Popover Props" />
    </ComponentSection>
  );
}
