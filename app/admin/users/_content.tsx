"use client";

import { Fragment, useCallback, useState, useDeferredValue } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAdminUsers } from "@/lib/swr";

const PAGE_SIZE = 20;

export function AdminUsersContent() {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const deferredSearch = useDeferredValue(search);

  const { data, error, isLoading, mutate } = useAdminUsers({
    limit: PAGE_SIZE,
    offset,
    search: deferredSearch,
  });

  const users = data?.users ?? [];
  const total = data?.total ?? 0;

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setOffset(0);
    },
    []
  );

  const handleToggleExpand = useCallback((userId: string) => {
    setExpandedUserId((prev) => (prev === userId ? null : userId));
  }, []);

  const handleDeleteContent = useCallback(
    async (userId: string, type: "comments" | "ratings") => {
      const confirmed = window.confirm(
        `Delete all ${type} for this user? This action cannot be undone.`
      );
      if (!confirmed) return;

      setDeletingUserId(userId);
      try {
        const res = await fetch(`/api/admin/users/${userId}/content`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ types: [type] }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "Failed to delete content.");
        }

        await mutate();
      } catch {
        // Error is non-fatal for UI; SWR will reflect latest state on mutate
      } finally {
        setDeletingUserId(null);
      }
    },
    [mutate]
  );

  const hasPrev = offset > 0;
  const hasNext = offset + PAGE_SIZE < total;

  return (
    <div>
      {/* Search */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by name or user ID..."
          className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-sm"
        />
        <button
          onClick={() => mutate()}
          className="p-2 border border-border rounded-md hover:bg-muted/10 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          Failed to load users.
        </p>
      )}

      {/* Loading */}
      {isLoading && <p className="text-muted">Loading users...</p>}

      {/* Empty */}
      {!isLoading && !error && users.length === 0 && (
        <p className="text-muted">No users found.</p>
      )}

      {/* Table */}
      {!isLoading && users.length > 0 && (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/5">
                <th className="text-left px-4 py-3 font-medium">User</th>
                <th className="text-left px-4 py-3 font-medium">User ID</th>
                <th className="text-right px-4 py-3 font-medium">Comments</th>
                <th className="text-right px-4 py-3 font-medium">Ratings</th>
                <th className="text-right px-4 py-3 font-medium">Favorites</th>
                <th className="text-right px-4 py-3 font-medium">Submissions</th>
                <th className="text-left px-4 py-3 font-medium">Last Active</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isExpanded = expandedUserId === user.userId;
                const isDeleting = deletingUserId === user.userId;

                return (
                  <Fragment key={user.userId}>
                    <tr className="border-b border-border">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {user.avatarUrl ? (
                            <Image
                              src={user.avatarUrl}
                              alt=""
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full"
                              unoptimized
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center text-xs text-muted">
                              {user.authorName?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                          )}
                          <span className="font-medium">
                            {user.authorName || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs text-muted" title={user.userId}>
                          {user.userId.length > 12
                            ? `${user.userId.slice(0, 12)}...`
                            : user.userId}
                        </code>
                      </td>
                      <td className="text-right px-4 py-3">{user.commentCount}</td>
                      <td className="text-right px-4 py-3">{user.ratingCount}</td>
                      <td className="text-right px-4 py-3">{user.favoriteCount}</td>
                      <td className="text-right px-4 py-3">{user.submissionCount}</td>
                      <td className="px-4 py-3 text-muted">
                        {user.lastActive
                          ? new Date(user.lastActive).toLocaleDateString()
                          : "--"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleExpand(user.userId)}
                          className="p-1 rounded hover:bg-muted/10 transition-colors"
                          title={isExpanded ? "Collapse" : "Expand"}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="border-b border-border">
                        <td colSpan={8} className="px-4 py-3 bg-muted/5">
                          <div className="flex items-center gap-3">
                            <button
                              disabled={isDeleting}
                              onClick={() =>
                                handleDeleteContent(user.userId, "comments")
                              }
                              className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete Comments
                            </button>
                            <button
                              disabled={isDeleting}
                              onClick={() =>
                                handleDeleteContent(user.userId, "ratings")
                              }
                              className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-red-300 text-red-700 rounded-md hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete Ratings
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {total > PAGE_SIZE && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted">
            Showing {offset + 1}-{Math.min(offset + PAGE_SIZE, total)} of{" "}
            {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={!hasPrev}
              onClick={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
              className="p-2 border border-border rounded-md hover:bg-muted/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={!hasNext}
              onClick={() => setOffset((prev) => prev + PAGE_SIZE)}
              className="p-2 border border-border rounded-md hover:bg-muted/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
