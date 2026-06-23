"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/**
 * Shared Radix Dialog overlay base used by both `ModalOverlay` and
 * `DrawerOverlay`. The dimming + blur + open/close animation classes
 * are identical across the two — extracting them here ensures the two
 * surfaces stay visually consistent and that any future change (e.g.
 * switching backdrop-blur, tweaking z-index) only needs to happen once.
 */
const OVERLAY_CLASSES =
  "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

export const OverlayBase = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(OVERLAY_CLASSES, className)}
    {...props}
  />
));
OverlayBase.displayName = "OverlayBase";