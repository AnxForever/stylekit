# 流量与索引基线（2026-11-03）

改造前的对照快照。任何一轮发布之后，用同样的口径重跑，对比本文件的数字。

机器可读版本：[`ops/analytics/baseline/route-traffic-2026-11-03.json`](../ops/analytics/baseline/route-traffic-2026-11-03.json)。
## 数据来源

| 口径 | 来源 | 窗口 |
|---|---|---|
| 索引面 | `https://www.stylekit.top/sitemap.xml` | 2026-11-03 抓取 |
| 使用面 | 自托管 Umami `website_event` 表（`event_type = 1`） | 近 90 天，1,019,487 次 pageview，32,267 个路径 |
| Google 侧 | `gsc-latest.json`（`gsc-pull-117.sh` 每日 07:40 刷新） | 28 天，2077 点击 / 23,442 曝光 / CTR 8.86% / 平均排名 6.9 |

服务器位置与复取命令见 [`ops/SERVERS.md`](../ops/SERVERS.md)。该文件被 `.gitignore` 的 `ops/*` 规则排除，属于本地运维文档：克隆仓库看不到它，换机器前单独备份。

## 索引面：1163 条 URL

```
   496  /colors/[hex]
   298  /styles/[slug]
   122  /animations/[slug]
    70  /templates/*
    36  /recipes/[id]
    24  /collections/[slug]
    16  /prompts/[topic]
     7  /blog/[slug]
     6  /guides/[slug]
  约 70  条静态页，各 2 个语言（部分仅英文）
```

颜色页占 sitemap 的 42%，是单一族最大的一块。

## 使用面：90 天分布

```
  301,357  29.6%  /styles/[slug]/showcase
  232,160  22.8%  /styles
  228,904  22.5%  /styles/[slug]
   56,832   5.6%  /templates
   46,177   4.5%  /templates/*
   37,247   3.7%  /colors/[hex]
   32,890   3.2%  /
   14,166   1.4%  /ui-prompts
   12,436   1.2%  /collections/[slug]
    9,832   1.0%  /animations
    7,919   0.8%  /collections
    7,046   0.7%  /prompts/[topic]
    5,847   0.6%  /animations/[slug]
    2,970   0.3%  /resources
    2,193   0.2%  /dashboard-prompts
```

三个 styles 族合计 762,421 次，占 **74.8%**。

单页头部（详情页与 showcase 合并）：

```
  16,165  corporate-clean/showcase
  15,654  neumorphism/showcase
  12,865  glassmorphism/showcase
  12,618  corporate-clean
  12,577  neumorphism
  10,996  editorial/showcase
  10,738  soft-ui/showcase
  10,249  macos-vibrancy/showcase
```

## 三条判读

**URL 数量与流量不成比例。** 颜色页 URL 最多、流量 3.7%；showcase 只占 sitemap 的一小部分，却拿走 29.6%。只看 sitemap 会砍错东西，只看流量会漏掉索引风险，两份数据必须一起看。

**长尾只有全量统计才看得见。** 颜色页在 top 2000 路径里只占 0.7%，用全部 32,267 条路径算才显出 3.7%。任何用抽样数据做的路由决策都会低估长尾。

**GSC 与站内数据不冲突。** hex 关键词 28 天 3404 次曝光、0 点击，同时站内颜色页有 37,247 次浏览：说明这类页面靠站内导航与长尾进入，在 SERP 上只露脸不带点击。它们不是垃圾页，但也不该优先投入。

## 复取

```bash
# 索引面，发布前后各一次，removed 非零即失败
node tools/scripts/seo-sitemap-baseline.mjs --json .tmp/seo-before.json
node tools/scripts/seo-sitemap-baseline.mjs --compare .tmp/seo-before.json

# 使用面
scp ops/analytics/query-umami-paths.mjs stylekit-jd:/tmp/
ssh stylekit-jd 'node /tmp/query-umami-paths.mjs --days 90 --limit 40000 --json /tmp/paths.json'
scp stylekit-jd:/tmp/paths.json .tmp/umami-full.json

# Google 侧
ssh stylekit-jd 'cat /www/umami/insights/gsc-latest.json'
```

## 已知噪音

`website_event` 的 `url_path` 里混有把整段中文查询或外链粘进地址栏的记录（例如 `/zh和https:/styles.refero.design/...`），以及爬虫拼接的错误路径。合计不足 0.05%，按路由族聚合即可自动吞掉。单条路径不足以支撑决策。
