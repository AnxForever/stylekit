# 生产就绪检查清单（Production Readiness Checklist）

> 来自 L6 收官：**真正上线一个 agent 前要过哪些关**。
> 这是"Darling 的 agent 6 关课程"之外的附录——保存以便你未来上线时一条条勾。
> 按"你项目当前状态"标注：✅ 已就绪 / 🟡 建议加 / 🔴 上线前必补。

---

## 📋 1. 功能正确性（Functional Correctness）

- ✅ Eval 套件：`npm run eval` 通过率 ≥ 0.8
- ✅ Baseline 锁定：`docs/agent-learning/eval-baseline.json` 入库
- ✅ Regression 警戒：`npm run eval:compare` 显示 diff
- 🟡 Eval 覆盖率：当前 6 scenario，建议扩到 20+（涵盖 edge case）
- 🔴 LLM-as-Judge：当前仅接口 placeholder，上线前真接一版（评主观质量）

## 📋 2. 可观测性（Observability）

- ✅ Traces：toolTrace + decisionTrace + promptSnapshot 三件套齐全
- ✅ Metrics：per-turn cost + latency + LLM calls
- 🟡 Metrics 持久化：当前在 TurnMetrics 返回值里，建议接 PostHog / Datadog
- 🔴 Alert：成本 / 延迟异常没报警，上线前接 OpenTelemetry 或 Sentry

## 📋 3. 成本控制（Cost Control）

- ✅ Cost 可见：scoreboard 显示每 scenario 花费
- 🟡 Prompt Caching：未开（接入能省 75% input 成本）
- 🟡 Model Routing：planner/reflector/responder 都用同一 model；建议按阶段分层（reflector 用 mini，planner 用 full）
- 🔴 Daily cost cap：没设上限，线上可能被恶意用户刷爆
- 🔴 Per-user rate limit：没设，建议按 userId 限 20 turns/day

## 📋 4. 安全（Security）

- ✅ Origin 校验：`verifyTrustedOrigin`
- ✅ 输入长度限制：Zod 的 `max(2000)`
- ✅ 结构化输出校验：Zod schema
- ✅ Tool 全 read-only：没有 DB 写 / FS / shell
- 🟡 Prompt Injection 检测：当前无，如果加 write tool 必须补
- 🔴 Content Moderation：未接 OpenAI Moderation API（免费），生产前加
- 🔴 Error message 回显：可能泄露上游 payload，需过滤 Authorization

## 📋 5. 性能（Performance）

- ✅ 流式响应（done 阶段）：`runAgentTurnStreaming`
- ✅ Tool 模式短路：tool-calling 模式跳过 `buildPhaseKnowledgeContext`
- 🟡 TTFT 没测量：当前 latency 是 end-to-end，流式场景要补 TTFT
- 🔴 并发压测：没做，上线前 load test（k6 / wrk）

## 📋 6. 容灾（Resilience）

- ✅ LLM 错误 fallback：tool loop 失败 → 老 planner → 规则兜底
- ✅ Reflection 非阻断：reflector 挂了不影响主流程
- ✅ Feature flags：`AGENT_USE_TOOL_CALLING` / `AGENT_USE_REFLECTION` 秒级切换
- 🟡 超时：fetch 没加 AbortController，建议加 30s timeout
- 🔴 Circuit Breaker：LLM 连续失败没触发熔断

## 📋 7. 数据合规（Data & Privacy）

- ✅ 不写数据库的 tool：读-only 保证
- 🟡 PII 脱敏：用户输入可能含邮箱、手机号，未脱敏
- 🔴 GDPR 删除权：Memory 要支持按 userId 删除（InMemoryMemoryStore 支持，Supabase 要补）
- 🔴 Retention policy：agent_sessions 无过期策略，数据无限增长

## 📋 8. 运维（Ops）

- ✅ PM2 管理：已接
- ✅ Nginx 反代：已配
- ✅ Git-based 回滚：feature flag 秒级切换 + git revert 长周期
- 🟡 日志集中：当前 console，建议接 Logtail / BetterStack
- 🔴 Health check endpoint：没暴露 `/api/agent/health`

## 📋 9. 部署（Deployment）

- ✅ 本地构建 → rsync → PM2 restart：你已建立 SOP
- 🟡 CI 跑 eval：`npm run eval` 未接入 GitHub Actions
- 🔴 Blue-green 或 Canary：当前一刀切，生产建议 10% canary

## 📋 10. 文档（Documentation）

- ✅ 代码内注释：关键设计决策解释
- ✅ 课程档案：`docs/agent-learning/` 6 个 L*.md
- ✅ Glossary：术语速查
- ✅ Memory：跨会话知识
- 🟡 用户面 FAQ：没写"agent 为什么这么答"的解释页
- 🟡 Runbook：没写"出事怎么办"的 ops 手册

---

## 🚀 优先级建议（按 ROI 排序）

### 上线**前必补**（红色）
1. **Daily cost cap** → 防止被刷爆（1 小时工作量）
2. **Content Moderation** → 免费 + 防违规（2 小时）
3. **Per-user rate limit** → 用 Redis/Supabase 计数（半天）
4. **Error message 过滤** → 正则过滤 Auth header（30 分钟）
5. **Health check endpoint** → `/api/agent/health` 返回 200（15 分钟）

### 上线**后第 1 周**（黄色）
1. **Prompt Caching** → 省 75% 成本（半天）
2. **Model Routing** → reflector 用 mini（1 小时）
3. **接 LLM-as-Judge** → 真 eval（1 天）
4. **CI 集成 eval** → GitHub Actions 跑（半天）
5. **日志集中** → Logtail（半天）

### 上线**后第 1 月**（绿色）
1. **Memory 持久化** → Supabase（1 天）
2. **Canary 部署** → Nginx upstream（半天）
3. **PII 脱敏** → 正则 + 白名单（半天）
4. **GDPR 删除权** → API endpoint（半天）
5. **OpenTelemetry** → 接 APM（1-2 天）

---

## 🎓 教学总结

这张清单是**agent 工程师 vs 原型玩家**的分水岭：
- **原型玩家**：demo 能跑就收工
- **工程师**：每一条都问"如果炸了会怎样"

不是所有项都要做——**看业务规模 + 用户量**。但**每一条都要问自己一遍**，这就是专业。