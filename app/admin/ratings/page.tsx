import type { Metadata } from "next";
import { AdminRatingsContent } from "./_content";

export const metadata: Metadata = {
  title: "Rating Management - StyleKit Admin",
  description: "Monitor and manage style ratings.",
};

export default function AdminRatingsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">Rating Management</h1>
      <p className="text-muted mb-8">
        Monitor and manage style ratings. Detect anomalous patterns.
      </p>
      <AdminRatingsContent />
    </>
  );
}
