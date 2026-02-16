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
import { useI18n } from "@/lib/i18n/context";

interface Props {
  expandedProps: Record<string, boolean>;
  toggleProps: (component: string) => void;
}

export function DrawerPopoverSection({ expandedProps, toggleProps }: Props) {
  const { t } = useI18n();

  return (
    <ComponentSection
      id="drawer"
      title="Drawer & Popover"
      description={t("components.drawer.description")}
    >
      <div className="flex flex-wrap gap-4">
        <Drawer>
          <DrawerTrigger asChild>
            <Button>{t("components.drawer.openDrawer")}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t("components.drawer.title")}</DrawerTitle>
              <DrawerDescription>
                {t("components.drawer.bodyDesc")}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <p className="text-muted">{t("components.drawer.content")}</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">{t("components.drawer.close")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">{t("components.drawer.openPopover")}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium">{t("components.drawer.popoverTitle")}</h4>
              <p className="text-sm text-muted">
                {t("components.drawer.popoverDesc")}
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
