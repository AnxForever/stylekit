"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./validation.module.css";

type Offer = typeof import("@/docs/examples/corporate-clean-saas-offer-v2.json");

type ExperimentContext = {
  experimentId: string;
  offerVersion: string;
  packId: string;
  packVersion: string;
  variantId: string;
  currency: "CNY" | "USD";
  amountMinor: number;
  minimumVisibilityMs: number;
  minimumVisibleRatioBps: number;
  termsVersion: string;
};

type SessionState = {
  lifecycle: "planned" | "collecting" | "ended";
  authenticated: boolean;
  context: ExperimentContext;
};

const qualificationFields = [
  ["productionProjectWithin90Days", "未来 90 天内有真实生产项目"],
  ["buildsB2bSaasOrProductionWeb", "正在构建 B2B SaaS 或生产型 Web 产品"],
  ["usesReactOrNext", "使用或确定将使用 React / Next.js"],
  ["usesTailwind", "使用或确定将使用 Tailwind CSS"],
  ["usesShadcn", "使用或确定将使用 shadcn/ui"],
  ["usedAiCodingForRealFrontend", "近 90 天用 AI 编码工具做过真实前端"],
  ["influencesPurchaseDecision", "对开发资源购买有决策权或直接影响力"],
] as const;

function eventId(type: string) {
  const storageKey = `stylekit_validation_event_${type}`;
  const existing = sessionStorage.getItem(storageKey);
  if (existing) return existing;
  const id = `evt_${crypto.randomUUID()}`;
  sessionStorage.setItem(storageKey, id);
  return id;
}

function currency(amountMinor: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(amountMinor / 100);
}

export function CorporateCleanValidation({ offer }: { offer: Offer }) {
  const [session, setSession] = useState<SessionState | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [qualified, setQualified] = useState<boolean | null>(null);
  const [intentRecorded, setIntentRecorded] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const offerRef = useRef<HTMLElement>(null);
  const priceRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    void fetch("/api/product-validation/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceChannel: readSourceChannel(params.get("utm_medium")),
        landingPath: window.location.pathname,
        utmSource: params.get("utm_source"),
        utmMedium: params.get("utm_medium"),
        utmCampaign: params.get("utm_campaign"),
      }),
    })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error ?? "实验会话不可用");
        setSession(payload as SessionState);
      })
      .catch((error: unknown) => {
        setSessionError(error instanceof Error ? error.message : "实验会话不可用");
      });
  }, []);

  useExposure(offerRef, "pack_offer_view", qualified ? session : null);
  useExposure(priceRef, "pack_price_view", qualified ? session : null);

  async function submitQualification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const answers = Object.fromEntries(
      qualificationFields.map(([name]) => [name, form.get(name) === "on"]),
    );
    const response = await fetch("/api/product-validation/qualify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...answers, researchConsent: form.get("researchConsent") === "on" }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error ?? "资格记录失败");
      return;
    }
    setQualified(Boolean(payload.qualified));
    setMessage(payload.qualified ? "资格条件已确认。请继续核对唯一价格与条款。" : "本轮样本只面向冻结 ICP；你的回答不会进入 200 人分母。");
  }

  async function submitIntent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/product-validation/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: eventId("pack_purchase_intent"),
        acceptsDisplayedPrice: form.get("acceptsDisplayedPrice") === "on",
        acceptsLicenseAndUpdateScope: form.get("acceptsLicenseAndUpdateScope") === "on",
        acceptsRefundAndDeliveryTerms: form.get("acceptsRefundAndDeliveryTerms") === "on",
        termsVersion: session.context.termsVersion,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error ?? "价格接受记录失败");
      return;
    }
    setIntentRecorded(true);
    setMessage(payload.message);
  }

  async function withdrawResearch() {
    if (!window.confirm("确认退出本次研究，并删除本设备已记录的在线研究事件？此操作不会影响账号或网站其他数据。")) return;
    setMessage(null);
    const response = await fetch("/api/product-validation/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-StyleKit-Validation-Request": "withdraw-v1" },
      body: JSON.stringify({ confirmDeletion: true }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error ?? "退出研究失败");
      return;
    }
    setSession(null);
    setQualified(null);
    setIntentRecorded(false);
    setMessage(payload.message);
  }

  const experimentReady = session?.lifecycle === "collecting";
  const termsReady = offer.pack.publicSaleAuthorized && offer.commercialTerms.licenseReviewStatus !== "draft_requires_final_review";
  const amount = session?.context.amountMinor ?? null;

  return (
    <main className={styles.canvas}>
      <header className={styles.topbar}>
        <div className={styles.wordmark}><span>SK</span><div><strong>StyleKit Research</strong><small>价格证据实验 · 不进入公开导航</small></div></div>
        <span className={styles.status} data-tone={experimentReady ? "live" : "planned"}>
          {session?.lifecycle === "ended" ? "窗口已结束" : experimentReady ? "正在采集" : "计划阶段"}
        </span>
      </header>

      <div className={styles.shell}>
        <section className={styles.intro}>
          <p className={styles.eyebrow}>Corporate Clean SaaS · Offer v1</p>
          <h1>这不是促销页，是一次可审计的价格判断。</h1>
          <p>{offer.pack.outcome}</p>
          <div className={styles.truthNotice}>
            <strong>当前不会扣款，也不会生成订单。</strong>
            <span>页面只记录资格、完整曝光和经过验证的准确价格接受；真实结账与付款必须来自后续独立证据。</span>
          </div>
        </section>

        <ol className={styles.evidenceRail} aria-label="价格验证证据等级">
          <EvidenceStep code="E0" label="完整浏览" active={Boolean(session)} />
          <EvidenceStep code="E1" label="ICP 合格" active={qualified === true} />
          <EvidenceStep code="E2" label="验证价格接受" active={intentRecorded} />
          <EvidenceStep code="E3" label="真实结账" active={false} />
        </ol>

        <section className={styles.proofGrid} ref={offerRef} aria-labelledby="offer-title">
          <div className={styles.productVisual}>
            <Image
              src="/experience-packs/corporate-clean-saas/assets/product-shell.svg"
              alt="Corporate Clean SaaS 数据工作区产品界面"
              fill
              priority
              sizes="(min-width: 900px) 56vw, 100vw"
            />
          </div>
          <div className={styles.offerCopy}>
            <p className={styles.sectionLabel}>冻结交付证据</p>
            <h2 id="offer-title">交付的是能运行的产品切片，不是提示词合集。</h2>
            <ul>{offer.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className={styles.qualification} aria-labelledby="qualification-title">
          <div>
            <p className={styles.sectionLabel}>进入样本之前</p>
            <h2 id="qualification-title">确认你属于本轮冻结 ICP</h2>
            <p>只保存这些必要的布尔答案，不要求公司名称、项目代码或客户资料。</p>
          </div>
          <form onSubmit={submitQualification} className={styles.formStack}>
            {qualificationFields.map(([name, label]) => (
              <label className={styles.checkRow} key={name}>
                <input type="checkbox" name={name} />
                <span>{label}</span>
              </label>
            ))}
            <label className={styles.checkRow}>
              <input type="checkbox" name="researchConsent" required />
              <span>我同意这些答案仅用于本次价格研究，并理解可以申请退出或删除。</span>
            </label>
            <button type="submit" className={styles.secondaryAction} disabled={!session}>确认资格</button>
          </form>
        </section>

        <section className={styles.pricePanel} ref={priceRef} aria-labelledby="price-title">
          <div className={styles.priceIdentity}>
            <p className={styles.sectionLabel}>你的固定价格组</p>
            <h2 id="price-title">{amount === null ? "正在取得服务器分配…" : currency(amount)}</h2>
            <p>一次性价格。你只会看到一个分组；刷新、重新访问或改 URL 都不会更换价格。</p>
          </div>
          <dl className={styles.termsGrid}>
            <div><dt>更新范围</dt><dd>{offer.commercialTerms.updateMonths} 个月</dd></div>
            <div><dt>安装支持</dt><dd>{offer.commercialTerms.installationSupportDays} 天</dd></div>
            <div><dt>贡献者</dt><dd>最多 {offer.commercialTerms.maximumContributors} 人</dd></div>
            <div><dt>冲突策略</dt><dd>发现同名文件即停止</dd></div>
          </dl>
          <div className={styles.termsText}>
            <p><strong>退款边界：</strong>{offer.commercialTerms.refundPolicy}</p>
            <p><strong>交付边界：</strong>{offer.commercialTerms.deliveryTiming}</p>
          </div>
          <form className={styles.formStack} onSubmit={submitIntent}>
            <label className={styles.checkRow}><input type="checkbox" name="acceptsDisplayedPrice" required /><span>我接受当前显示的准确价格。</span></label>
            <label className={styles.checkRow}><input type="checkbox" name="acceptsLicenseAndUpdateScope" required /><span>我已阅读商业许可草案、贡献者和更新范围。</span></label>
            <label className={styles.checkRow}><input type="checkbox" name="acceptsRefundAndDeliveryTerms" required /><span>我已阅读退款、支持和交付边界。</span></label>
            {!session?.authenticated ? (
              <Link className={styles.primaryAction} href="/login?next=/validation/corporate-clean-saas">登录后登记价格接受</Link>
            ) : (
              <button className={styles.primaryAction} type="submit" disabled={!qualified || !experimentReady || !termsReady}>
                登记对 {amount === null ? "当前价格" : currency(amount)} 的接受
              </button>
            )}
            <small>此动作不创建订单、不收取订金，也不计作真实结账或购买。</small>
          </form>
          {!termsReady ? <p className={styles.gateNotice}>商业许可仍需最终审核，因此 E2 暂时锁定；这能防止把草案条款下的点击误算为购买意向。</p> : null}
        </section>

        {message ? <p className={styles.feedback} role="status">{message}</p> : null}
        {sessionError ? <p className={styles.error} role="alert">{sessionError}</p> : null}

        <footer className={styles.footer}>
          <span>Offer hash 与实验规则已冻结；任何交付物或条款变化都必须创建新 Offer 版本。</span>
          <span>不采集裸邮箱、IP、完整 User-Agent、公司名称或项目机密。</span>
          <button type="button" className={styles.withdrawAction} onClick={withdrawResearch} disabled={!session}>
            退出研究并删除本设备证据
          </button>
        </footer>
      </div>
    </main>
  );
}

function EvidenceStep({ code, label, active }: { code: string; label: string; active: boolean }) {
  return <li data-active={active}><span>{code}</span><strong>{label}</strong></li>;
}

function readSourceChannel(medium: string | null) {
  if (medium === "email") return "email";
  if (medium === "social") return "social";
  if (medium === "community") return "community";
  if (medium === "referral") return "referral";
  if (medium === "paid" || medium === "cpc" || medium === "ppc") return "paid";
  return "direct";
}

function useExposure(
  ref: React.RefObject<HTMLElement | null>,
  type: "pack_offer_view" | "pack_price_view",
  session: SessionState | null,
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || session?.lifecycle !== "collecting") return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let sent = false;
    const clear = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        clear();
        if (sent || document.visibilityState !== "visible" || entry.intersectionRatio < 0.5) return;
        timer = setTimeout(() => {
          sent = true;
          void fetch("/api/product-validation/exposure", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventId: eventId(type),
              type,
              visibilityMs: session.context.minimumVisibilityMs,
              visibleRatioBps: Math.max(session.context.minimumVisibleRatioBps, Math.round(entry.intersectionRatio * 10_000)),
            }),
          });
        }, session.context.minimumVisibilityMs);
      },
      { threshold: [0, 0.5, 0.75, 1] },
    );
    observer.observe(element);
    const onVisibility = () => {
      if (document.visibilityState !== "visible") clear();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clear();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref, session, type]);
}
