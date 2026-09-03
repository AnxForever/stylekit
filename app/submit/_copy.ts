/**
 * Copy for the submit console.
 *
 * `lib/i18n/submit-copy.ts` still describes the retired multi-step wizard
 * (draft conflicts, step navigation, per-field labels for manual entry). The
 * AI-first flow needs a much smaller vocabulary, so it lives here rather than
 * grafting new keys onto a dictionary shaped for a different UI.
 */

export type SubmitLocale = "en" | "zh";

export const COPY = {
  en: {
    eyebrow: "Contribute",
    title: "Submit a design style",
    intro:
      "StyleKit styles are machine-readable: tokens, component code, and rules an AI assistant can follow. Generate that manifest with your assistant, check it against the same gates a reviewer uses, then submit.",

    step1Title: "Generate the manifest",
    step1Description:
      "Copy the prompt into Claude, Cursor or ChatGPT along with the decisions below. It encodes every automatic check, so a compliant answer clears the gates on the first try.",
    copyPrompt: "Copy prompt",
    promptCopied: "Copied",
    promptHint: "Paste it with your style brief.",

    step2Title: "Paste the result",
    step2Description:
      "Drop the manifest.json file here or paste its contents. Nothing is stored until you submit.",
    manifestPlaceholder: '{\n  "schemaVersion": "1.0.0",\n  ...\n}',
    runCheck: "Run checks",
    checking: "Checking...",
    clear: "Clear",
    invalidJson: "That is not valid JSON. Paste the whole manifest object.",
    checkFailed: "Could not run the checks. Try again in a moment.",

    step3Title: "Review the checks",
    step3Description:
      "Required checks must all pass. Advisory signals are shown to the reviewer but never block a submission.",
    noReport: "Run the checks to see the report.",
    requiredChecks: "Required",
    advisorySignals: "Advisory",
    advisoryNote:
      "These describe your style, they do not judge it. Many curated StyleKit styles score low here by design.",
    passed: "Passed",
    failed: "Failed",

    step4Title: "Submit for review",
    step4Description:
      "Approved styles appear in the community catalog the same day. A small number are promoted into the curated library.",
    termsPrefix: "This work is mine to share, and I accept the",
    termsLink: "contribution terms",
    termsSuffix: ".",
    signInPrefix: "You need to",
    signInLink: "sign in",
    signInSuffix: " before submitting, so the style can be credited to you.",
    submit: "Submit style",
    submitting: "Submitting...",
    submitFailed: "Could not save the submission. Try again in a moment.",
    blockedHint: "Fix the failed checks above, then run them again.",

    doneTitle: "Submission received",
    doneBody:
      "It is queued for review. You will find its status in your profile, and approved styles go live in the community catalog.",
    viewSubmissions: "View my submissions",
    browseCommunity: "Browse community styles",
    submitAnother: "Submit another",
  },
  zh: {
    eyebrow: "参与贡献",
    title: "投稿设计风格",
    intro:
      "StyleKit 的风格是机器可读的：设计 token、组件代码，以及 AI 能直接遵循的规则。用你的 AI 助手生成这份 manifest，用与审核完全相同的关卡自查，然后提交。",

    step1Title: "生成 manifest",
    step1Description:
      "把提示词连同下面这些决策一起交给 Claude、Cursor 或 ChatGPT。提示词里写清了每一条自动检查，所以合规的产出通常一次过关。",
    copyPrompt: "复制提示词",
    promptCopied: "已复制",
    promptHint: "连同你的风格构想一起粘贴。",

    step2Title: "粘贴产出",
    step2Description: "把 manifest.json 拖进来，或直接粘贴内容。在你提交之前不会存任何东西。",
    manifestPlaceholder: '{\n  "schemaVersion": "1.0.0",\n  ...\n}',
    runCheck: "开始自查",
    checking: "检查中...",
    clear: "清空",
    invalidJson: "这不是合法 JSON，请粘贴完整的 manifest 对象。",
    checkFailed: "检查没跑起来，稍后重试。",

    step3Title: "查看检查结果",
    step3Description:
      "必过项必须全绿。参考信号只是给审核者看的描述，永远不会挡住投稿。",
    noReport: "先跑一次自查，这里会出报告。",
    requiredChecks: "必过项",
    advisorySignals: "参考信号",
    advisoryNote:
      "这些只描述你的风格，不评判它。StyleKit 精选库里很多风格在这几项上分数也不高，那是设计取向使然。",
    passed: "通过",
    failed: "未通过",

    step4Title: "提交审核",
    step4Description:
      "通过审核的风格当天就会出现在社区风格库；其中少数会被晋升进精选库。",
    termsPrefix: "这份作品由我原创或我有权分享，并且我接受",
    termsLink: "贡献条款",
    termsSuffix: "。",
    signInPrefix: "提交前需要先",
    signInLink: "登录",
    signInSuffix: "，这样这个风格才能署上你的名字。",
    submit: "提交风格",
    submitting: "提交中...",
    submitFailed: "没能保存投稿，稍后重试。",
    blockedHint: "把上面未通过的项修好，再跑一次自查。",

    doneTitle: "投稿已收到",
    doneBody:
      "它已进入审核队列。你可以在个人主页查看状态；通过审核后会上线到社区风格库。",
    viewSubmissions: "查看我的投稿",
    browseCommunity: "浏览社区风格库",
    submitAnother: "再投一个",
  },
} as const;
