export type WorkspaceMode = "overview" | "loading" | "empty" | "error" | "success";

export type AccountHealth = "健康" | "观察" | "风险";

type FunnelSnapshot = {
  visitors: number;
  trials: number;
  activated: number;
  paid: number;
};

type AccountFixture = {
  company: string;
  plan: "团队版" | "专业版";
  health: AccountHealth;
  owner: string;
  representativeMrr: number;
  population: number;
  previousPopulation: number;
  monthlyRevenue: number;
  previousMonthlyRevenue: number;
  revenueHistory: readonly number[];
  funnel: FunnelSnapshot;
  previousFunnel: FunnelSnapshot;
};

export const workspaceModes: Array<{ value: WorkspaceMode; label: string }> = [
  { value: "overview", label: "概览" },
  { value: "loading", label: "加载" },
  { value: "empty", label: "空状态" },
  { value: "error", label: "错误" },
  { value: "success", label: "成功" },
];

// The approved chart silhouette is a model input; concrete revenue values live
// on each account cohort so the rendered series can only come from the fixture.
const revenueShape = [32, 38, 35, 46, 44, 52, 49, 63, 58, 71, 68, 79] as const;
const shapePeak = Math.max(...revenueShape);

function defineAccountFixture(
  fixture: Omit<AccountFixture, "revenueHistory">,
): AccountFixture {
  return {
    ...fixture,
    revenueHistory: revenueShape.map(
      (point) => (fixture.monthlyRevenue * point) / shapePeak,
    ),
  };
}

/**
 * The pack's only business-data fixture. Each row represents an account cohort;
 * the named company is the representative record shown in the compact table.
 * Every KPI, chart and funnel below is derived from these cohorts.
 */
export const accountFixtures: readonly AccountFixture[] = [
  defineAccountFixture({
    company: "Northstar Labs",
    plan: "团队版",
    health: "健康",
    owner: "林澈",
    representativeMrr: 18_900,
    population: 3_100,
    previousPopulation: 2_850,
    monthlyRevenue: 82_000,
    previousMonthlyRevenue: 72_500,
    funnel: { visitors: 620, trials: 282, activated: 172, paid: 116 },
    previousFunnel: { visitors: 510, trials: 213, activated: 129, paid: 84 },
  }),
  defineAccountFixture({
    company: "Paperless Studio",
    plan: "专业版",
    health: "观察",
    owner: "陈瑜",
    representativeMrr: 8_600,
    population: 2_400,
    previousPopulation: 2_235,
    monthlyRevenue: 51_600,
    previousMonthlyRevenue: 46_000,
    funnel: { visitors: 480, trials: 214, activated: 130, paid: 88 },
    previousFunnel: { visitors: 400, trials: 166, activated: 100, paid: 66 },
  }),
  defineAccountFixture({
    company: "Orbit Commerce",
    plan: "团队版",
    health: "健康",
    owner: "周遥",
    representativeMrr: 16_200,
    population: 3_000,
    previousPopulation: 2_770,
    monthlyRevenue: 75_800,
    previousMonthlyRevenue: 67_100,
    funnel: { visitors: 560, trials: 252, activated: 154, paid: 104 },
    previousFunnel: { visitors: 450, trials: 186, activated: 113, paid: 74 },
  }),
  defineAccountFixture({
    company: "Harbor Systems",
    plan: "专业版",
    health: "风险",
    owner: "孟初",
    representativeMrr: 6_800,
    population: 399,
    previousPopulation: 461,
    monthlyRevenue: 30_200,
    previousMonthlyRevenue: 27_000,
    funnel: { visitors: 390, trials: 171, activated: 104, paid: 70 },
    previousFunnel: { visitors: 310, trials: 126, activated: 76, paid: 51 },
  }),
  defineAccountFixture({
    company: "Fieldnote AI",
    plan: "团队版",
    health: "健康",
    owner: "梁宁",
    representativeMrr: 21_400,
    population: 3_583,
    previousPopulation: 3_199,
    monthlyRevenue: 46_800,
    previousMonthlyRevenue: 41_526,
    funnel: { visitors: 430, trials: 207, activated: 124, paid: 84 },
    previousFunnel: { visitors: 330, trials: 134, activated: 82, paid: 55 },
  }),
] as const;

const currency = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

const sum = (values: readonly number[]) => values.reduce((total, value) => total + value, 0);

const totals = accountFixtures.reduce(
  (result, account) => ({
    activeAccounts: result.activeAccounts + account.population,
    previousActiveAccounts: result.previousActiveAccounts + account.previousPopulation,
    monthlyRevenue: result.monthlyRevenue + account.monthlyRevenue,
    previousMonthlyRevenue: result.previousMonthlyRevenue + account.previousMonthlyRevenue,
    riskAccounts: result.riskAccounts + (account.health === "风险" ? account.population : 0),
    previousRiskAccounts:
      result.previousRiskAccounts + (account.health === "风险" ? account.previousPopulation : 0),
    funnel: addFunnel(result.funnel, account.funnel),
    previousFunnel: addFunnel(result.previousFunnel, account.previousFunnel),
  }),
  {
    activeAccounts: 0,
    previousActiveAccounts: 0,
    monthlyRevenue: 0,
    previousMonthlyRevenue: 0,
    riskAccounts: 0,
    previousRiskAccounts: 0,
    funnel: emptyFunnel(),
    previousFunnel: emptyFunnel(),
  },
);

function emptyFunnel(): FunnelSnapshot {
  return { visitors: 0, trials: 0, activated: 0, paid: 0 };
}

function addFunnel(left: FunnelSnapshot, right: FunnelSnapshot): FunnelSnapshot {
  return {
    visitors: left.visitors + right.visitors,
    trials: left.trials + right.trials,
    activated: left.activated + right.activated,
    paid: left.paid + right.paid,
  };
}

function percent(value: number, total: number) {
  return total === 0 ? 0 : (value / total) * 100;
}

function relativeChange(current: number, previous: number) {
  return previous === 0 ? 0 : ((current - previous) / previous) * 100;
}

function signedPercent(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

const conversionRate = percent(totals.funnel.paid, totals.funnel.visitors);
const previousConversionRate = percent(totals.previousFunnel.paid, totals.previousFunnel.visitors);
const riskRate = percent(totals.riskAccounts, totals.activeAccounts);
const previousRiskRate = percent(totals.previousRiskAccounts, totals.previousActiveAccounts);

export const metrics = [
  {
    label: "活跃账户",
    value: totals.activeAccounts.toLocaleString("zh-CN"),
    change: signedPercent(relativeChange(totals.activeAccounts, totals.previousActiveAccounts)),
    detail: "较上个周期",
  },
  {
    label: "试用转付费",
    value: `${conversionRate.toFixed(1)}%`,
    change: signedPercent(conversionRate - previousConversionRate),
    detail: "近 30 天",
  },
  {
    label: "月度经常收入",
    value: currency.format(totals.monthlyRevenue),
    change: signedPercent(relativeChange(totals.monthlyRevenue, totals.previousMonthlyRevenue)),
    detail: "已扣除退款",
  },
  {
    label: "流失风险",
    value: `${riskRate.toFixed(1)}%`,
    change: signedPercent(riskRate - previousRiskRate),
    detail: `需要关注 ${totals.riskAccounts} 个账户`,
  },
] as const;

export const revenueSeries = revenueShape.map((_, index) =>
  sum(accountFixtures.map((account) => account.revenueHistory[index] ?? 0)),
);

export const funnel = [
  { label: "价格页访客", value: totals.funnel.visitors },
  { label: "开始试用", value: totals.funnel.trials },
  { label: "完成激活", value: totals.funnel.activated },
  { label: "升级付费", value: totals.funnel.paid },
].map((item) => ({
  ...item,
  ratio: Math.round(percent(item.value, totals.funnel.visitors)),
}));

export const accounts = accountFixtures.map((account) => ({
  company: account.company,
  plan: account.plan,
  health: account.health,
  owner: account.owner,
  mrr: currency.format(account.representativeMrr),
}));

export const dashboardSummary = {
  monthlyRevenue: totals.monthlyRevenue,
  conversionRate,
  riskAccounts: totals.riskAccounts,
  activeAccounts: totals.activeAccounts,
  funnel: totals.funnel,
  previousFunnel: totals.previousFunnel,
  revenueSeriesTotal: sum(revenueSeries),
} as const;
