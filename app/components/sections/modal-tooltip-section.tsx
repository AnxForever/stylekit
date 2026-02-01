"use client";

import { Button } from "@/components/ui/button";
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
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ComponentSection, PropsToggle, PropsPanel } from "../_shared";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function ModalTooltipSection({ expandedProps, toggleProps }: Props) {
  return (
    <ComponentSection
      id="dialog"
      title="Modal & Tooltip"
      description="弹窗和提示组件"
    >
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
      <div className="flex gap-4">
        <PropsToggle component="Dialog" expanded={!!expandedProps.Dialog} onToggle={toggleProps} />
        <PropsToggle component="Tooltip" expanded={!!expandedProps.Tooltip} onToggle={toggleProps} />
      </div>
      <PropsPanel component="Dialog" expanded={!!expandedProps.Dialog} label="Dialog Props" />
      <PropsPanel component="Tooltip" expanded={!!expandedProps.Tooltip} label="Tooltip Props" />
    </ComponentSection>
  );
}
