import { describe, expect, it } from "vitest";
import { queryAdminAuditEvents } from "@/lib/admin/audit-log";

const now = new Date("2026-02-18T00:00:00.000Z").getTime();

const events = [
  {
    id: "e1",
    action: "submission.approve",
    targetType: "submission",
    targetId: "s1",
    actor: { type: "user" as const, id: "u1" },
    ipAddress: "203.0.113.1",
    userAgent: "UA",
    metadata: { slug: "neo-brutalist", noteProvided: true },
    createdAt: "2026-02-17T12:00:00.000Z",
  },
  {
    id: "e2",
    action: "submission.reject",
    targetType: "submission",
    targetId: "s2",
    actor: { type: "user" as const, id: "u2" },
    ipAddress: "203.0.113.2",
    userAgent: "UA",
    metadata: { slug: "glassmorphism", noteProvided: false },
    createdAt: "2026-02-10T12:00:00.000Z",
  },
  {
    id: "e3",
    action: "submission.approve",
    targetType: "submission",
    targetId: "s3",
    actor: { type: "token" as const, id: "token:abc" },
    ipAddress: "203.0.113.3",
    userAgent: "UA",
    metadata: { slug: "editorial" },
    createdAt: "2026-01-01T12:00:00.000Z",
  },
];

describe("admin audit log query", () => {
  it("filters by action", () => {
    const result = queryAdminAuditEvents(events, {
      action: "submission.approve",
      nowMs: now,
      limit: 50,
    });

    expect(result.total).toBe(2);
    expect(result.events.map((event) => event.id)).toEqual(["e1", "e3"]);
  });

  it("filters by time window in days", () => {
    const result = queryAdminAuditEvents(events, {
      days: 7,
      nowMs: now,
      limit: 50,
    });

    expect(result.total).toBe(1);
    expect(result.events[0]?.id).toBe("e1");
  });

  it("supports pagination metadata", () => {
    const firstPage = queryAdminAuditEvents(events, {
      limit: 1,
      offset: 0,
      nowMs: now,
    });

    expect(firstPage.events[0]?.id).toBe("e1");
    expect(firstPage.hasMore).toBe(true);
    expect(firstPage.nextOffset).toBe(1);

    const secondPage = queryAdminAuditEvents(events, {
      limit: 1,
      offset: firstPage.nextOffset ?? 0,
      nowMs: now,
    });

    expect(secondPage.events[0]?.id).toBe("e2");
    expect(secondPage.offset).toBe(1);
  });

  it("supports text search across metadata and actor fields", () => {
    const bySlug = queryAdminAuditEvents(events, {
      search: "glass",
      nowMs: now,
      limit: 50,
    });
    expect(bySlug.events.map((event) => event.id)).toEqual(["e2"]);

    const byActor = queryAdminAuditEvents(events, {
      search: "token:abc",
      nowMs: now,
      limit: 50,
    });
    expect(byActor.events.map((event) => event.id)).toEqual(["e3"]);
  });
});
