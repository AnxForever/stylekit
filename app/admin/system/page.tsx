import type { Metadata } from "next";
import { AdminSystemContent } from "./_content";

export const metadata: Metadata = {
  title: "System Overview - StyleKit Admin",
  description: "Service health, database status, and runtime information.",
};

export default function AdminSystemPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">System Overview</h1>
      <p className="text-muted mb-8">
        Service health, database status, and runtime information.
      </p>
      <AdminSystemContent />
    </>
  );
}
