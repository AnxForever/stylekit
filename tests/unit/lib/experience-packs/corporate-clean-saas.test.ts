import { describe, expect, it } from "vitest";
import {
  corporateCleanSaasPack,
  getExperiencePack,
} from "@/lib/experience-packs";
import {
  toExperiencePackRegistryItem,
  toExperiencePackRegistryItemJSON,
  verifyExperiencePack,
} from "@/lib/experience-packs/server";
import {
  accountFixtures,
  accounts,
  dashboardSummary,
  funnel,
  metrics,
  revenueSeries,
} from "@/experience-packs/corporate-clean-saas/files/lib/corporate-clean/data";

describe("corporate-clean-saas experience pack", () => {
  it("links a distinct commercial pack to the approved Corporate Clean style", () => {
    expect(corporateCleanSaasPack.slug).toBe("corporate-clean-saas");
    expect(corporateCleanSaasPack.styleSlug).toBe("corporate-clean");
    expect(corporateCleanSaasPack.status).toBe("preview");
    expect(getExperiencePack("Corporate-Clean-SaaS.json")).toBe(corporateCleanSaasPack);
  });

  it("declares the dark-theme control and the single reduced-motion-safe visual reveal", () => {
    expect(corporateCleanSaasPack.interactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "theme-preview-control",
          states: expect.arrayContaining(["light", "dark"]),
        }),
      ]),
    );
    expect(corporateCleanSaasPack.motion).toEqual([
      expect.objectContaining({
        id: "revenue-line-reveal",
        durationMs: 620,
        repeat: 0,
        reducedMotion: expect.objectContaining({ strategy: "static" }),
        performance: expect.objectContaining({
          preferredProperties: ["transform", "opacity"],
          continuous: false,
          pausesWhenOffscreen: true,
          pausesWhenPageHidden: true,
        }),
        controls: { userCanPause: false, userCanReplay: false },
      }),
    ]);
  });

  it("connects commercial claims to concrete visual and installable evidence", () => {
    expect(corporateCleanSaasPack.evidence).toHaveLength(3);
    expect(corporateCleanSaasPack.claims).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: "responsive-theme-state-coverage",
        evidenceRefs: ["mobile-dark-success"],
        interactionRefs: expect.arrayContaining([
          "responsive-sidebar",
          "theme-preview-control",
        ]),
      }),
    ]));
  });

  it("verifies every install file, asset hash, provenance snapshot, and import boundary", async () => {
    const report = await verifyExperiencePack(process.cwd(), corporateCleanSaasPack);

    expect(report.issues).toEqual([]);
    expect(report.checkedFiles).toEqual(
      expect.arrayContaining([
        "app/corporate-clean/page.tsx",
        "components/corporate-clean/corporate-clean-saas.tsx",
        "components/corporate-clean/corporate-clean.module.css",
        "LICENSE.md",
      ]),
    );
    expect(report.checkedAssets).toEqual([
      "/experience-packs/corporate-clean-saas/assets/product-shell.svg",
      "/experience-packs/corporate-clean-saas/evidence/workspace-desktop-light-overview.webp",
      "/experience-packs/corporate-clean-saas/evidence/workspace-mobile-dark-success.webp",
    ]);
    expect(report.checkedEvidence).toEqual([
      "desktop-light-overview",
      "mobile-dark-success",
      "owned-installable-illustration",
    ]);
    expect(report.checkedClaims).toEqual([
      "owned-installable-asset",
      "real-runnable-workspace",
      "responsive-theme-state-coverage",
    ]);
  });

  it("rejects provenance evidence copied from a different asset", async () => {
    const [first, second] = corporateCleanSaasPack.assets;
    const tamperedPack = {
      ...corporateCleanSaasPack,
      assets: [
        {
          ...first,
          provenance: {
            ...first.provenance,
            sourceSnapshot: second.provenance.sourceSnapshot,
          },
        },
        ...corporateCleanSaasPack.assets.slice(1),
      ],
    };

    const report = await verifyExperiencePack(process.cwd(), tamperedPack);

    expect(report.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "provenance-mismatch" }),
      ]),
    );
  });

  it("rejects a Pro app evidence set that omits mobile coverage", async () => {
    const incompletePack = {
      ...corporateCleanSaasPack,
      evidence: corporateCleanSaasPack.evidence.filter(
        (scene) => scene.device !== "mobile",
      ),
      claims: corporateCleanSaasPack.claims.map((claim) => ({
        ...claim,
        evidenceRefs: claim.evidenceRefs.filter((ref) => ref !== "mobile-dark-success"),
      })),
    };

    const report = await verifyExperiencePack(process.cwd(), incompletePack);

    expect(report.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({
        code: "missing-evidence-coverage",
        message: expect.stringContaining("mobile evidence"),
      }),
    ]));
  });

  it("compiles a deterministic multi-file shadcn registry item", async () => {
    const item = await toExperiencePackRegistryItem(process.cwd(), corporateCleanSaasPack);
    const first = await toExperiencePackRegistryItemJSON(process.cwd(), corporateCleanSaasPack);
    const second = await toExperiencePackRegistryItemJSON(process.cwd(), corporateCleanSaasPack);

    expect(first).toBe(second);
    expect(item.name).toBe("corporate-clean-saas");
    expect(item.type).toBe("registry:block");
    expect(item.dependencies).toEqual([]);
    expect(item.registryDependencies).toEqual([]);
    expect(item.title).toBe(corporateCleanSaasPack.presentation.title);
    expect(item.description).toBe(corporateCleanSaasPack.presentation.summary);
    expect(item.meta.evidence).toHaveLength(3);
    expect(item.meta.claims).toHaveLength(3);
    expect(item.meta.claims).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: "responsive-theme-state-coverage",
        evidenceRefs: ["mobile-dark-success"],
        interactionRefs: [
          "responsive-sidebar",
          "theme-preview-control",
          "workspace-state-control",
        ],
      }),
    ]));
    expect(item.files.length).toBeGreaterThanOrEqual(11);
    expect(item.files.map((file) => file.target)).toEqual(
      [...item.files.map((file) => file.target)].sort((left, right) =>
        left.localeCompare(right),
      ),
    );
    expect(item.files).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ target: "STYLEKIT_PACK.json" }),
        expect.objectContaining({ target: "app/corporate-clean/page.tsx" }),
        expect.objectContaining({ target: "public/experience-packs/corporate-clean-saas/assets/product-shell.svg" }),
      ]),
    );
    const machineContextFile = item.files.find(
      (file) => file.target === "STYLEKIT_PACK.json",
    );
    const machineContext = JSON.parse(machineContextFile?.content ?? "{}") as {
      pack?: { slug?: string };
      evidence?: Array<{ id?: string }>;
      claims?: Array<{ id?: string; evidenceRefs?: string[] }>;
    };
    expect(machineContext.pack?.slug).toBe("corporate-clean-saas");
    expect(machineContext.evidence).toHaveLength(3);
    expect(machineContext.claims).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: "responsive-theme-state-coverage",
        evidenceRefs: ["mobile-dark-success"],
      }),
    ]));
  });

  it("derives every dashboard aggregate from the account cohort fixture", () => {
    expect(accountFixtures).toHaveLength(5);
    expect(accounts).toHaveLength(accountFixtures.length);
    expect(dashboardSummary).toMatchObject({
      activeAccounts: 12_482,
      monthlyRevenue: 286_400,
      riskAccounts: 399,
      funnel: { visitors: 2_480, trials: 1_126, activated: 684, paid: 462 },
    });
    expect(metrics).toEqual([
      { label: "活跃账户", value: "12,482", change: "+8.4%", detail: "较上个周期" },
      { label: "试用转付费", value: "18.6%", change: "+2.1%", detail: "近 30 天" },
      { label: "月度经常收入", value: "¥286,400", change: "+12.7%", detail: "已扣除退款" },
      { label: "流失风险", value: "3.2%", change: "-0.8%", detail: "需要关注 399 个账户" },
    ]);
    expect(funnel).toEqual([
      { label: "价格页访客", value: 2_480, ratio: 100 },
      { label: "开始试用", value: 1_126, ratio: 45 },
      { label: "完成激活", value: 684, ratio: 28 },
      { label: "升级付费", value: 462, ratio: 19 },
    ]);
    expect(revenueSeries).toHaveLength(12);
    expect(revenueSeries.at(-1)).toBe(dashboardSummary.monthlyRevenue);
  });
});
