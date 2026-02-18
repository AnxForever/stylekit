"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface AdminSidebarContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextValue>({
  open: false,
  toggle: () => {},
  close: () => {},
});

export function useAdminSidebar() {
  return useContext(AdminSidebarContext);
}

export function AdminSidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <AdminSidebarContext.Provider value={{ open, toggle, close }}>
      {children}
    </AdminSidebarContext.Provider>
  );
}
