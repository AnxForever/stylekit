export type SupportLocaleCopy = {
  en: string;
  zh: string;
};

export type SupportMethod = {
  id: string;
  kind: "link" | "qr";
  title: SupportLocaleCopy;
  description: SupportLocaleCopy;
  badge: SupportLocaleCopy;
  actionLabel?: SupportLocaleCopy;
  href?: string;
  imageSrc?: string;
  imageAlt?: SupportLocaleCopy;
  note?: SupportLocaleCopy;
};

export type ThankYouEntry = {
  id: string;
  date: string;
  donorLabel: SupportLocaleCopy;
  amount?: SupportLocaleCopy;
  receiptImage?: string;
  celebrationImage?: string;
  receiptAlt?: SupportLocaleCopy;
  celebrationAlt?: SupportLocaleCopy;
};

export type ThankYouModalConfig = {
  enabled: boolean;
  showOnHomepageOnly: boolean;
  dismissible: boolean;
  title: SupportLocaleCopy;
  description: SupportLocaleCopy;
  contactPrompt: SupportLocaleCopy;
  contactAction: SupportLocaleCopy;
};

export type SupporterContactCopy = {
  eyebrow: string;
  title: string;
  description: string;
  messageLabel: string;
  messagePlaceholder: string;
  contactLabel: string;
  contactPlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  errorEmpty: string;
  errorContact: string;
  errorGeneric: string;
  note: string;
};

export const supportPageCopy = {
  en: {
    eyebrow: "Support Maintenance",
    title: "Help cover servers, domains, and ongoing upkeep.",
    description:
      "StyleKit is maintained as an open project. If it saves you time or helps your workflow, voluntary support helps offset hosting, infrastructure, and maintenance costs.",
    highlights: [
      "Voluntary support only",
      "Used for servers, domains, and upkeep",
      "Core public access stays open",
    ],
    methodsTitle: "Support channels",
    methodsDescription:
      "Scan with Alipay or WeChat Pay, or use GitHub if you prefer to support from the repository side.",
    transparencyTitle: "Transparency",
    transparencyItems: [
      "Support is optional and does not unlock the core public site.",
      "Funds are meant to offset infrastructure, hosting, and routine maintenance.",
      "For larger sponsorships or company support, use public GitHub channels first.",
    ],
  },
  zh: {
    eyebrow: "支持维护",
    title: "帮助补贴服务器、域名和日常维护成本。",
    description:
      "StyleKit 目前主要还是我一个人在持续维护和更新。如果它恰好帮到了你，那我真挺开心的。欢迎扫码支持我把它继续做下去，金额随意，你的每一份心意，都是对我很大的鼓励。",
    highlights: [
      "完全自愿支持",
      "主要用于服务器、域名与维护成本",
      "核心公开内容保持开放",
    ],
    methodsTitle: "支持方式",
    methodsDescription:
      "微信、支付宝都可以，金额随意，按你的心意来就好。收到的支持会优先用在服务器、域名和后续维护上；如果你更习惯从仓库侧进入，也保留了 GitHub 入口。",
    transparencyTitle: "补充说明",
    transparencyItems: [
      "支持完全是自愿的，不会影响站点现有公开内容的使用。",
      "收到的支持会优先拿来支付服务器、域名、基础设施和日常维护开销。",
      "如果你是想做更大金额的赞助，或者是企业支持，也可以先在 GitHub 公共渠道和我沟通。",
    ],
  },
} as const;

// Direct inbox for commercial enquiries. Public GitHub channels stay the
// default for product questions; this is the private path for anything that
// does not belong in a public thread.
export const businessContactEmail = "anxforever@qq.com";

export const businessContactCopy = {
  en: {
    eyebrow: "Business",
    title: "Commercial and partnership enquiries",
    description:
      "For licensing, sponsored styles, content collaborations, or anything else that does not belong in a public thread, email me directly. Include your team, what you have in mind, and your timeline so I can reply with something useful.",
    actionLabel: "Email",
    subject: "StyleKit partnership enquiry",
    note: "Product questions and bug reports are faster through the public channels below.",
  },
  zh: {
    eyebrow: "商业合作",
    title: "商业合作与授权咨询",
    description:
      "企业授权、定制风格、内容合作，或者其他不适合公开讨论的事情，直接发邮件给我。麻烦在邮件里写清楚团队情况、合作设想和时间预期，我好一次性回复到点上。",
    actionLabel: "发邮件",
    subject: "StyleKit 商业合作咨询",
    note: "产品咨询和 Bug 反馈走下面的公开渠道会更快。",
  },
} as const;

// Supporters who want to talk after tipping have no address to write to.
// Rather than publish a personal inbox on a page anyone can scrape, the support
// page and the thank-you notice send them to a form that relays through
// /api/feedback: they leave an email or WeChat handle, the note arrives in the
// same inbox, and a reply goes straight back to them.
export const supporterContactHref = "/contact#supporter-contact";

export const supporterContactCopy = {
  en: {
    eyebrow: "Contact",
    title: "Want to reach me directly?",
    description:
      "If you have supported StyleKit, or just want to talk, leave a note here with an email address or WeChat handle. I read these myself and reply the same way.",
    messageLabel: "Your note",
    messagePlaceholder:
      "What you would like to talk about: collaboration, licensing, a question, or just hello.",
    contactLabel: "Email or WeChat",
    contactPlaceholder: "Where I can reply",
    submit: "Send note",
    sending: "Sending…",
    success: "Got it. I will reply the way you asked.",
    errorEmpty: "Please write a short note first.",
    errorContact: "Leave an email address or WeChat handle so I can reply.",
    errorGeneric: "Something went wrong. Please try again later.",
    note: "The note goes straight to my inbox. No personal contact details are published on this site.",
  },
  zh: {
    eyebrow: "联系方式",
    title: "想直接找我？",
    description:
      "赞赏过的朋友，或者只是想聊两句的，都可以在这儿给我留个言。留个邮箱或者微信号，我本人看到就会回你。",
    messageLabel: "想说的话",
    messagePlaceholder: "合作、授权、提问，或者只是打个招呼，都可以写在这儿。",
    contactLabel: "邮箱或微信号",
    contactPlaceholder: "方便我回你的联系方式",
    submit: "发送留言",
    sending: "发送中…",
    success: "收到了，我会按你留的方式回你。",
    errorEmpty: "先写一句吧。",
    errorContact: "留个邮箱或微信号，不然我没法回你。",
    errorGeneric: "出了点问题，请稍后再试。",
    note: "留言会直接发到我的邮箱，站内不会公开任何私人联系方式。",
  },
} as const satisfies Record<"en" | "zh", SupporterContactCopy>;

// Add future QR methods by placing images under public/support/ and appending
// new items here with kind: "qr" and imageSrc set to the new asset path.
export const supportMethods: SupportMethod[] = [
  {
    id: "alipay-qr",
    kind: "qr",
    title: {
      en: "Alipay",
      zh: "支付宝",
    },
    description: {
      en: "Open Alipay and scan this code to support StyleKit maintenance.",
      zh: "打开支付宝扫码即可支持 StyleKit 的持续维护，金额随意就好。",
    },
    badge: {
      en: "QR",
      zh: "扫码",
    },
    imageSrc: "/support/alipay-qr.png",
    imageAlt: {
      en: "Alipay QR code for supporting StyleKit",
      zh: "用于支持 StyleKit 的支付宝扫码",
    },
    note: {
      en: "Recommended for domestic users who already use Alipay.",
      zh: "适合已经使用支付宝的用户，感谢支持。",
    },
  },
  {
    id: "wechat-qr",
    kind: "qr",
    title: {
      en: "WeChat Tipping",
      zh: "微信赞赏码",
    },
    description: {
      en: "Scan with WeChat to tip whatever feels right. Leave a note — I read every single one.",
      zh: "觉得有用就赞赏一下，金额随意～备注里写句话，每条我都会认真看。",
    },
    badge: {
      en: "QR",
      zh: "扫码",
    },
    imageSrc: "/support/wechat-qr.png",
    imageAlt: {
      en: "WeChat appreciation QR code for supporting StyleKit",
      zh: "用于支持 StyleKit 的微信赞赏码",
    },
    note: {
      en: "Supports WeChat in-app tipping with a message — every note gets read.",
      zh: "支持微信内赞赏留言，每条备注都会认真看。",
    },
  },
];

export type SupportLink = {
  title: SupportLocaleCopy;
  description: SupportLocaleCopy;
  href: string;
  external: boolean;
  actionLabel: SupportLocaleCopy;
};

// Canonical GitHub feedback channels, reused by the changelog feedback CTA.
export const githubLinks = {
  discussions: "https://github.com/AnxForever/stylekit/discussions",
} as const;

export const supportLinks: SupportLink[] = [
  {
    title: { en: "GitHub Discussions", zh: "GitHub Discussions" },
    description: {
      en: "Use for product questions, launch feedback, feature requests, and general support.",
      zh: "适合产品咨询、发布反馈、功能建议和一般支持。",
    },
    href: "https://github.com/AnxForever/stylekit/discussions",
    external: true,
    actionLabel: { en: "Open", zh: "打开" },
  },
  {
    title: { en: "GitHub Issues", zh: "GitHub Issues" },
    description: {
      en: "Use for reproducible bugs, broken links, data issues, or validation failures.",
      zh: "适合可复现的 Bug、失效链接、数据问题或校验失败。",
    },
    href: "https://github.com/AnxForever/stylekit/issues",
    external: true,
    actionLabel: { en: "Open", zh: "打开" },
  },
  {
    title: { en: "Repository", zh: "代码仓库" },
    description: {
      en: "Browse source, roadmap context, and recent changes before opening a thread.",
      zh: "在发起讨论前，先浏览源码、路线图和最近的变更。",
    },
    href: "https://github.com/AnxForever/stylekit",
    external: true,
    actionLabel: { en: "Open", zh: "打开" },
  },
  {
    title: { en: "Newsletter", zh: "订阅更新" },
    description: {
      en: "Follow public updates and launch notes from any footer signup form on the site.",
      zh: "通过页脚的订阅表单关注公开更新和发布说明。",
    },
    href: "/",
    external: false,
    actionLabel: { en: "Open", zh: "打开" },
  },
];

export const thankYouEntries: ThankYouEntry[] = [
  {
    id: "donation-2026-10-28-050-00",
    date: "2026-10-28",
    donorLabel: {
      en: "鸢不言",
      zh: "鸢不言",
    },
    amount: {
      en: "¥50.00",
      zh: "¥50.00",
    },
    receiptImage:
      "https://ktconteogvofbwetnmlz.supabase.co/storage/v1/object/public/support-acknowledgments/acknowledgments/4b1122ef-f24c-4b11-970f-701c3029e970.png",
    receiptAlt: {
      en: "鸢不言 50.00 元的赞赏记录",
      zh: "鸢不言 50.00 元的赞赏记录",
    },
  },
  {
    id: "donation-2026-10-24-005-00",
    date: "2026-10-24",
    donorLabel: {
      en: "Recycle",
      zh: "Recycle",
    },
    amount: {
      en: "¥5.00",
      zh: "¥5.00",
    },
    receiptImage:
      "https://ktconteogvofbwetnmlz.supabase.co/storage/v1/object/public/support-acknowledgments/acknowledgments/7e62ac8c-2b54-4055-9b3d-de749490240b.png",
    receiptAlt: {
      en: "Recycle 5.00 元的赞赏记录",
      zh: "Recycle 5.00 元的赞赏记录",
    },
  },
  {
    id: "donation-2026-07-18-008-88",
    date: "2026-07-18",
    donorLabel: {
      en: "Quickbeam",
      zh: "Quickbeam",
    },
    amount: {
      en: "¥8.88",
      zh: "¥8.88",
    },
    receiptImage: "/support/acknowledgments/receipt-2026-07-18-008-88.jpg",
    receiptAlt: {
      en: "Payment receipt for ¥8.88 from Quickbeam",
      zh: "Quickbeam 8.88 元的赞赏记录",
    },
  },
  {
    id: "donation-2026-07-16-088-00",
    date: "2026-07-16",
    donorLabel: {
      en: "Huihui",
      zh: "辉辉",
    },
    amount: {
      en: "¥88.00",
      zh: "¥88.00",
    },
    receiptImage: "/support/acknowledgments/receipt-2026-07-16-088-00.jpg",
    receiptAlt: {
      en: "Payment receipt for ¥88.00 from Huihui",
      zh: "辉辉 88.00 元的赞赏记录",
    },
  },
  {
    id: "donation-2026-07-04-003-50",
    date: "2026-07-04",
    donorLabel: {
      en: "Anonymous Supporter",
      zh: "匿名支持者",
    },
    amount: {
      en: "¥3.50",
      zh: "¥3.50",
    },
    receiptImage: "/support/acknowledgments/receipt-2026-07-04-003-50.png",
    receiptAlt: {
      en: "Payment receipt for ¥3.50 from supporter",
      zh: "支持者 3.50 元的收款记录",
    },
  },
  {
    id: "donation-2026-07-04-050-00",
    date: "2026-07-04",
    donorLabel: {
      en: "Anonymous Supporter",
      zh: "匿名支持者",
    },
    amount: {
      en: "¥50.00",
      zh: "¥50.00",
    },
    receiptImage: "/support/acknowledgments/receipt-2026-07-04-050-00.png",
    receiptAlt: {
      en: "Payment receipt for ¥50.00 from supporter",
      zh: "支持者 50.00 元的收款记录",
    },
  },
  {
    id: "donation-2026-07-04-009-90",
    date: "2026-07-04",
    donorLabel: {
      en: "Anonymous Supporter",
      zh: "匿名支持者",
    },
    amount: {
      en: "¥9.90",
      zh: "¥9.90",
    },
    receiptImage: "/support/acknowledgments/receipt-2026-07-04-009-90.png",
    receiptAlt: {
      en: "Payment receipt for ¥9.90 from supporter",
      zh: "支持者 9.90 元的收款记录",
    },
  },
  {
    id: "donation-2026-06-16",
    date: "2026-06-16",
    donorLabel: {
      en: "Anonymous Supporter",
      zh: "匿名支持者",
    },
    amount: {
      en: "¥66.66",
      zh: "¥66.66",
    },
    receiptImage: "/support/receipts/receipt-2026-06-16.png",
    celebrationImage: "/support/thank-you/thank-meme-2026-06.jpg",
    receiptAlt: {
      en: "Payment receipt from supporter",
      zh: "支持者的收款记录",
    },
    celebrationAlt: {
      en: "Thank you celebration",
      zh: "感谢庆祝",
    },
  },
  {
    id: "donation-2026-06-20",
    date: "2026-06-20",
    donorLabel: {
      en: "Anonymous Supporter",
      zh: "匿名支持者",
    },
    receiptImage: "/support/receipts/receipt-2026-06-20.png",
    celebrationImage: "/support/thank-you/thank-meme-2026-06.jpg",
    receiptAlt: {
      en: "Payment receipt from supporter",
      zh: "支持者的收款记录",
    },
    celebrationAlt: {
      en: "Thank you celebration",
      zh: "感谢庆祝",
    },
  },
  {
    id: "donation-2026-06-24",
    date: "2026-06-24",
    donorLabel: {
      en: "Anonymous Supporter",
      zh: "匿名支持者",
    },
    receiptImage: "/support/receipts/receipt-2026-06-24.jpg",
    celebrationImage: "/support/thank-you/thank-meme-2026-06.jpg",
    receiptAlt: {
      en: "Payment receipt from supporter",
      zh: "支持者的收款记录",
    },
    celebrationAlt: {
      en: "Thank you celebration",
      zh: "感谢庆祝",
    },
  },
];

export const thankYouModalConfig: ThankYouModalConfig = {
  enabled: true,
  showOnHomepageOnly: true,
  dismissible: true,
  title: {
    en: "Thank You for Your Support!",
    zh: "感谢大哥/姐姐的支持！",
  },
  description: {
    en: "We recently received a generous donation. Your support helps keep StyleKit running and accessible to everyone.",
    zh: "我去我去，赛博乞讨真的有人给我打赏了，哭辽(╥﹏╥)。感谢大哥/姐姐！！！！",
  },
  contactPrompt: {
    en: "Supported StyleKit and want to reach me?",
    zh: "赞赏过，想找我说句话？",
  },
  contactAction: {
    en: "Leave a note",
    zh: "给我留一句",
  },
};
