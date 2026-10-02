import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET as list } from "@/app/api/assets/route";
import { GET as detail } from "@/app/api/assets/[kind]/[id]/route";
import { ASSET_KINDS, listPublicAssets, getPublicAsset } from "@/lib/assets";

const { getTemplateProject } = vi.hoisted(() => ({ getTemplateProject: vi.fn() }));
vi.mock("@/lib/templates/project", () => ({ getTemplateProject }));

const request = (query = "") => new Request(`http://localhost/api/assets${query}`);
const get = (kind: string, id: string) => detail(request(), { params: Promise.resolve({ kind, id }) });

describe("public assets API", () => {
  beforeEach(() => vi.resetAllMocks());

  it("uses the authoritative public registry with bounded, complete pagination", async () => {
    for (const kind of ASSET_KINDS) {
      const expected = listPublicAssets({ kind, limit: 100 });
      const response = await list(request(`?kind=${kind}&limit=100`));
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(JSON.parse(JSON.stringify(expected)));
      const empty = await list(request(`?kind=${kind}&offset=999999`));
      expect(await empty.json()).toMatchObject({ assets: [], total: expected.total, hasMore: false });
    }
  });

  it.each(["?kind=private-kit", "?limit=0", "?limit=101", "?offset=-1", "?offset=1.5", "?offset=NaN", "?offset=9007199254740992", `?q=${"a".repeat(501)}`])("rejects invalid query %s", async (query) => {
    expect((await list(request(query))).status).toBe(400);
  });

  it("returns actual reusable data and preserves attribution from the registry", async () => {
    for (const kind of ASSET_KINDS.filter((kind) => kind !== "template")) {
      const first = listPublicAssets({ kind, limit: 1 }).assets[0];
      if (!first) continue;
      const response = await get(kind, first.id);
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(JSON.parse(JSON.stringify(getPublicAsset(kind, first.id))));
    }
  });

  it("delivers the same runnable template files as the ZIP exporter", async () => {
    const files = { "app/page.tsx": "export default function Page() { return <main>Hello</main>; }", "package.json": "{}" };
    getTemplateProject.mockResolvedValue({ files, dependencies: { react: "^19" }, devDependencies: { typescript: "^5" } });
    const response = await get("template", "brutal-landing");
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ metadata: { id: "brutal-landing" }, data: { files, dependencies: { react: "^19" } } });
    expect(getTemplateProject).toHaveBeenCalledWith("brutal-landing");
  });

  it("keeps external templates as references without fetching arbitrary source", async () => {
    const response = await get("template", "nextdevtpl");
    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.metadata.availability).toBe("external");
    expect(payload.data.files).toBeUndefined();
    expect(getTemplateProject).not.toHaveBeenCalled();
  });

  it("reports unavailable template source as retryable and never caches it", async () => {
    getTemplateProject.mockResolvedValue(null);
    const response = await get("template", "brutal-landing");
    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("rejects private kinds, traversal and unknown assets", async () => {
    expect((await get("private-kit", "secret")).status).toBe(400);
    expect((await get("template", "../layout")).status).toBe(400);
    expect((await get("template", "layout")).status).toBe(404);
    expect(getTemplateProject).not.toHaveBeenCalled();
  });
});
