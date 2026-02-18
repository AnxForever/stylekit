import type { Metadata } from "next";
import { AdminStylesContent } from "./_content";

export const metadata: Metadata = {
  title: "Style Overview - StyleKit Admin",
  description: "Aggregated engagement metrics for all styles.",
};

export default function AdminStylesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Style Overview</h1>
      <p className="text-muted mb-8">
        Aggregated engagement metrics for all styles.
      </p>
      <AdminStylesContent />
    </>
  );
}
