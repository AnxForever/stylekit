import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/templates/[slug]/source/route";

const { getTemplateProject } = vi.hoisted(() => ({ getTemplateProject: vi.fn() }));
vi.mock("@/lib/templates/project", () => ({ getTemplateProject }));

const source = "export default function Page() { return null; }";
const project = {
  slug: "technical-profile",
  filename: "technical-profile.tsx",
  source,
  files: {
    "app/templates/technical-profile/page.tsx": source,
    "app/templates/technical-profile/_data.ts": "export const PROJECTS = [];",
    "components/templates/relief-mark.tsx": "export function ReliefMark() {}",
    "public/profile.png": "base64-avatar-data",
  },
  binaryFiles: ["public/profile.png"],
  dependencies: {},
  devDependencies: {},
  license: { name: "MIT License", terms: "MIT", attribution: "StyleKit" },
};

function request(query = "") {
  return new Request(`https://stylekit.test/api/templates/technical-profile/source${query}`);
}

function route(url: Request) {
  return GET(url, { params: Promise.resolve({ slug: "technical-profile" }) });
}

describe("template source route", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    getTemplateProject.mockResolvedValue(project);
  });

  it("keeps the default source response backward compatible", async () => {
    const response = await route(request());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      slug: "technical-profile",
      filename: "technical-profile.tsx",
      source,
    });
  });

  it("returns text project files and binary paths without exposing binary payloads", async () => {
    const response = await route(request("?view=project"));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      slug: "technical-profile",
      filename: "technical-profile.tsx",
      source,
      entryPath: "app/templates/technical-profile/page.tsx",
      files: {
        "app/templates/technical-profile/page.tsx": source,
        "app/templates/technical-profile/_data.ts": "export const PROJECTS = [];",
        "components/templates/relief-mark.tsx": "export function ReliefMark() {}",
      },
      binaryFiles: ["public/profile.png"],
    });
  });

  it("rejects invalid and unknown slugs before returning source", async () => {
    const invalid = await GET(
      new Request("https://stylekit.test/api/templates/../source?view=project"),
      { params: Promise.resolve({ slug: "../source" }) }
    );
    expect(invalid.status).toBe(400);
    expect(getTemplateProject).not.toHaveBeenCalled();

    getTemplateProject.mockResolvedValue(null);
    const missing = await GET(
      new Request("https://stylekit.test/api/templates/not-a-template/source?view=project"),
      { params: Promise.resolve({ slug: "not-a-template" }) }
    );
    expect(missing.status).toBe(404);
  });
});
