import { describe, expect, it } from "vitest";
import {
  buildDisplaySeqIdMap,
  resolveDisplaySeqId,
} from "@/lib/auth/user-seq-display";

describe("user seq display map", () => {
  it("builds dense display ids from sparse seq ids", () => {
    const map = buildDisplaySeqIdMap([
      {
        user_id: "11111111-1111-4111-8111-111111111111",
        seq_id: 1,
      },
      {
        user_id: "22222222-2222-4222-8222-222222222222",
        seq_id: 2,
      },
      {
        user_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
        seq_id: 51,
      },
      {
        user_id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
        seq_id: 63,
      },
    ]);

    expect(map.get("11111111-1111-4111-8111-111111111111")).toBe(1);
    expect(map.get("22222222-2222-4222-8222-222222222222")).toBe(2);
    expect(map.get("aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa")).toBe(3);
    expect(map.get("bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb")).toBe(4);
  });

  it("falls back to raw seq id when map is missing", () => {
    const map = new Map<string, number>();

    expect(
      resolveDisplaySeqId(
        "11111111-1111-4111-8111-111111111111",
        51,
        map
      )
    ).toBe(51);
  });
});
