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
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function ModalTooltipSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      id="dialog"
      title="Modal & Tooltip"
      description={t("components.modal.description")}
    >
      <div className="flex flex-wrap gap-4">
        <Modal>
          <ModalTrigger asChild>
            <Button>{t("components.modal.openModal")}</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{t("components.modal.title")}</ModalTitle>
              <ModalDescription>
                {t("components.modal.bodyDesc")}
              </ModalDescription>
            </ModalHeader>
            <div className="py-4">
              <p className="text-sm text-muted">{t("components.modal.content")}</p>
            </div>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="outline">{t("components.modal.cancel")}</Button>
              </ModalClose>
              <Button>{t("components.modal.confirm")}</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">{t("components.modal.hoverTooltip")}</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("components.modal.tooltipText")}</p>
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
