import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, ShieldCheck } from "lucide-react";
import { AdminPage } from "@/components/admin/admin-page";
import { AdminBadge, AdminPanel } from "@/components/admin/admin-ui";
import validationBaseline from "@/docs/examples/product-validation-empty.json";
import { CorporateCleanSaas } from "@/experience-packs/corporate-clean-saas/files/components/corporate-clean/corporate-clean-saas";
import { corporateCleanSaasPack } from "@/lib/experience-packs";
import {
  evaluateProductValidation,
  productValidationBundleSchema,
} from "@/lib/product-validation";

export const metadata: Metadata = {
  title: "Corporate Clean SaaS Pack - StyleKit 视觉实验室",
  description: "审核 Corporate Clean SaaS Pack 的真实交付、价格证据与可安装源码。",
  robots: {
    index: false,
    follow: false,
  },
};

const deliverables = [
  "完整响应式 SaaS 数据工作区",
  "经营指标、趋势图、转化漏斗和账户表格",
  "浅色、深色、Loading、Empty、Error、Success 与 Focus 状态",
  "移动侧边栏和触屏等价交互",
  "Scoped CSS Module，不覆盖项目全局视觉",
  "StyleKit 自有 SVG 产品主视觉与 provenance",
  "README、商业许可草案与第三方声明",
];

export default function CorporateCleanSaasReviewPage() {
  const validation = evaluateProductValidation(
    productValidationBundleSchema.parse(validationBaseline),
  );
  const installFiles = [...corporateCleanSaasPack.blocks, ...corporateCleanSaasPack.templates]
    .flatMap((item) => item.files)
    .sort((left, right) => left.localeCompare(right));

  return (
    <AdminPage
      eyebrow="Premium Pack 内部审核"
      title="Corporate Clean SaaS"
      description="这里渲染的就是将要安装进客户项目的 Pack 自有源码，不复用旧 Showcase，也不依赖 StyleKit 后台组件。当前状态为内部 Preview，需求样本未达到前不会公开销售。"
      actions={
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/visual-lab"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[var(--admin-panel)] px-3 text-sm text-muted shadow-[var(--admin-shadow-border)] hover:bg-[var(--admin-input)] hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            返回视觉实验室
          </Link>
          <a
            href="/admin/visual-lab/corporate-clean-saas/registry.json"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-3 text-sm text-background shadow-[var(--admin-shadow-border)] hover:opacity-90"
          >
            <Download className="h-4 w-4" strokeWidth={1.5} />
            下载内部 Registry
          </a>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <AdminPanel className="overflow-hidden">
            <div className="relative aspect-[16/9] bg-[#f4f7fb]">
              <Image
                src="/experience-packs/corporate-clean-saas/assets/product-shell.svg"
                alt="Corporate Clean SaaS 数据工作区产品概览"
                fill
                priority
                sizes="(min-width: 1280px) 760px, 100vw"
                className="object-contain p-5 sm:p-8"
              />
            </div>
            <div className="grid gap-4 px-5 py-5 shadow-[0_-1px_0_0_var(--admin-border-soft)] sm:grid-cols-3">
              <Fact label="Pack 状态" value="内部 Preview" />
              <Fact label="第三方媒体" value="0 项" />
              <Fact label="安装文件" value={`${installFiles.length + 2} 项`} />
            </div>
          </AdminPanel>

          <AdminPanel className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <AdminBadge tone="warning">尚未公开销售</AdminBadge>
              <AdminBadge tone="success">自有视觉资产</AdminBadge>
              <AdminBadge tone="info">Registry 主交付</AdminBadge>
            </div>
            <h2 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-foreground">
              收费价值来自完整交付，不来自办公室图库。
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Pack 使用代码生成的真实产品界面和 StyleKit 自有 SVG，所有状态、移动布局、许可与安装文件来自同一 manifest。
            </p>
            <ul className="mt-5 space-y-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs leading-5 text-[var(--admin-text-secondary)]">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--admin-status-green)]" strokeWidth={1.5} />
                  {item}
                </li>
              ))}
            </ul>
          </AdminPanel>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminPanel className="min-w-0 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">价格与需求闸门</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  当前只展示冻结的验证设计，不把预测当作真实需求。
                </p>
              </div>
              <AdminBadge tone="warning">{validation.decision}</AdminBadge>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {validationBaseline.experiment.variants.map((variant) => {
                const economics = validation.economics.variants[variant.id];
                return (
                  <div key={variant.id} className="rounded-lg bg-[var(--admin-input)] p-4 shadow-[var(--admin-shadow-border)]">
                    <p className="text-xs text-muted">{variant.id}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-foreground">
                      ¥{(variant.amountMinor / 100).toLocaleString("zh-CN")}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      预测盈亏平衡 {economics.breakEvenUnits ?? "—"} 单 · {economics.status === "pass" ? "经济门槛通过" : "经济门槛未通过"}
                    </p>
                  </div>
                );
              })}
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
              <Evidence label="合格访客" value={`${validation.online.qualifiedVisitors}/200`} />
              <Evidence label="软意向" value={`${validation.online.softIntentPeople}`} />
              <Evidence label="访谈" value={`${validation.interviews.qualifiedInterviews}/20`} />
              <Evidence label="付费" value={`${validation.online.purchasers}`} />
            </dl>
          </AdminPanel>

          <AdminPanel className="min-w-0 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">确定性交付文件</p>
                <p className="mt-1 text-xs leading-5 text-muted">
                  Registry 编译器读取这些真实文件；不会把 tokens ZIP 冒充成可运行 Pack。
                </p>
              </div>
              <AdminBadge tone="success">manifest 0.1.0</AdminBadge>
            </div>
            <ol className="mt-5 max-h-72 space-y-2 overflow-y-auto pr-2">
              {installFiles.map((file, index) => (
                <li key={file} className="flex items-center gap-3 rounded-md px-2 py-2 text-xs hover:bg-[var(--admin-input)]">
                  <span className="font-mono text-[10px] text-[var(--admin-text-muted)]">{String(index + 1).padStart(2, "0")}</span>
                  <code className="min-w-0 truncate font-mono text-[11px] text-[var(--admin-text-secondary)]">{file}</code>
                </li>
              ))}
              <li className="flex items-center gap-3 rounded-md px-2 py-2 text-xs">
                <span className="font-mono text-[10px] text-[var(--admin-text-muted)]">{String(installFiles.length + 1).padStart(2, "0")}</span>
                <code className="min-w-0 truncate font-mono text-[11px] text-[var(--admin-text-secondary)]">public/experience-packs/corporate-clean-saas/assets/product-shell.svg</code>
              </li>
              <li className="flex items-center gap-3 rounded-md px-2 py-2 text-xs">
                <span className="font-mono text-[10px] text-[var(--admin-text-muted)]">{String(installFiles.length + 2).padStart(2, "0")}</span>
                <code className="min-w-0 truncate font-mono text-[11px] text-[var(--admin-text-secondary)]">public/experience-packs/corporate-clean-saas/provenance/product-shell.json</code>
              </li>
            </ol>
          </AdminPanel>
        </div>

        <section aria-labelledby="pack-live-preview-title">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground" id="pack-live-preview-title">可安装源码实时渲染</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                下方不是重新画的营销 Mockup，而是 Registry 将交付的同一套组件。可切换浅色、深色、加载、空、错误和成功状态。
              </p>
            </div>
            <AdminBadge tone="success">无 StyleKit 私有 import</AdminBadge>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-[var(--admin-shadow-medium)]">
            <CorporateCleanSaas />
          </div>
        </section>
      </div>
    </AdminPage>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function Evidence({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="mt-1 font-mono text-sm text-foreground">{value}</dd>
    </div>
  );
}
