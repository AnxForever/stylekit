import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/translations";

export type LegalDocument = "privacy" | "terms";

type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalPageCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  contactTitle: string;
  contactText: string;
  contactLink: string;
};

const legalCopy: Record<Locale, Record<LegalDocument, LegalPageCopy>> = {
  en: {
    privacy: {
      eyebrow: "Privacy",
      title: "Privacy Policy",
      intro:
        "This page explains the information StyleKit handles when you browse the site or choose to use its features. The information involved depends on the feature and the services enabled for the site.",
      sections: [
        {
          title: "Information the site handles",
          paragraphs: [
            "Site analytics may include page paths, referring domains, campaign tags, event details, browser or device categories, and a session identifier. Search analytics record whether a search occurred, the query length, and the result count rather than the raw search text. Some community requests also store the request IP address alongside a submission, rating, or comment.",
            "When you sign in, account data can include your email address, the identifier supplied by the sign-in provider, and profile details such as your display name or avatar. If you use Kit or workspace features, saved data can include selected items, project names and descriptions, project details you enter, selected styles, notes, revisions, and export-related records. Some preferences and saved items may remain only in your browser.",
            "Community comments, ratings, and submissions may include the content and profile details you provide. A submission may be shown in public galleries after review; submitted material may also be available to moderators. Newsletter sign-up stores the email address you submit. Feedback messages and any optional reply address are sent through the email service configured for that feature.",
            "When you use the AI style advisor, the project needs you enter are sent to the model service configured for that request so it can generate a response. Do not include confidential or sensitive personal information in an AI request.",
          ],
        },
        {
          title: "Browser storage",
          paragraphs: [
            "The site uses browser storage for choices such as language, local favorites or Kit items, and analytics session or campaign context. Sign-in and specific features may also use cookies. Clearing browser storage can remove local preferences, but it does not by itself remove information already stored by a server or service provider.",
          ],
        },
        {
          title: "How information is used",
          paragraphs: [
            "Information is used to provide the feature you choose, keep accounts and workspaces available, understand site use, maintain service security, review community material, and respond to feedback.",
          ],
        },
        {
          title: "Service providers",
          paragraphs: [
            "For sign-in and cloud features, StyleKit uses Supabase. The site loads VibeLoft telemetry, which may process visit or event information. Umami analytics and Sentry error reporting may also run when enabled. Email delivery and AI responses use the services configured for those features; the selected providers may vary. Each provider handles information under its own terms and privacy practices.",
          ],
        },
        {
          title: "Research information",
          paragraphs: [
            "A research flow, when offered, asks for explicit consent and may record qualification answers, a server-assigned offer group, whether the offer was shown, and the participant's response. The research evidence store is not designed to collect a company name, project code, customer information, or raw email address. A random first-party browser identifier is converted on the server into a keyed identifier. Although this reduces direct identification, it remains linkable research information and is handled as personal data. The current research flow does not use email or payment services to collect research evidence. If either is introduced later, its role, the information involved, and its retention approach should be explained before contact or payment information is collected.",
          ],
        },
        {
          title: "Research review and withdrawal",
          paragraphs: [
            "If a contact mapping is introduced after separate approval, the stated policy is to remove it within 90 days after the experiment ends. De-identified research evidence is scheduled for review for deletion no later than 12 months after the experiment; this is a policy review timetable, not a statement that an automatic deletion job runs. Payment or tax records, if any, follow their separate retention requirements.",
            "Where research participation is active, the research page can be used to withdraw that browser's participation. The online research events associated with it are deleted, while a minimal participant record remains marked as withdrawn to prevent silent re-entry into the sample; linked interview evidence is excluded. Clearing the browser cookie alone does not delete server-side research records.",
          ],
        },
      ],
      contactTitle: "Questions or requests",
      contactText:
        "Use the contact page to ask a privacy question or request access, correction, or deletion of information. Handling depends on the type of information and the service involved.",
      contactLink: "Contact & Support",
    },
    terms: {
      eyebrow: "Terms",
      title: "Terms of Use",
      intro:
        "StyleKit is an open-source product and reference library. These terms describe the basic rules for using the site, its resources, and community features.",
      sections: [
        {
          title: "Acceptable use",
          paragraphs: [
            "Do not abuse the site, attempt to bypass rate limits, access restricted areas without authorization, upload unlawful material, or submit harmful content to a public feature.",
          ],
        },
        {
          title: "Content and downloads",
          paragraphs: [
            "StyleKit provides prompts, templates, design tokens, and examples for reference and implementation support. The license or attribution terms shown with a specific resource govern that resource and take priority over this general description. Check the applicable resource license before reuse. You remain responsible for how you use generated or exported output in your own product.",
          ],
        },
        {
          title: "Community submissions",
          paragraphs: [
            "If you submit content, you confirm that you have the right to share it. StyleKit may review, reject, remove, or display submissions in public galleries or moderation tools. Material approved for a public gallery can be seen by other visitors.",
          ],
        },
        {
          title: "Availability",
          paragraphs: [
            "The site and its resources are provided as-is. We aim for accuracy and availability, but do not guarantee uninterrupted access, complete coverage, or suitability for a particular use case.",
          ],
        },
      ],
      contactTitle: "Questions",
      contactText: "For questions about these terms or a specific resource, use the",
      contactLink: "Contact & Support page",
    },
  },
  zh: {
    privacy: {
      eyebrow: "隐私",
      title: "隐私政策",
      intro:
        "本页说明你浏览 StyleKit 或主动使用相关功能时，网站会处理哪些信息。具体信息取决于你使用的功能，以及网站当前启用的服务。",
      sections: [
        {
          title: "网站处理的信息",
          paragraphs: [
            "站内统计可能记录页面路径、来源域名、推广来源标记、操作事件、浏览器或设备类别，以及本次访问的会话标识。搜索统计记录是否发生搜索、查询长度和结果数量，不记录原始搜索词。部分社区操作还会将请求 IP 地址与投稿、评分或评论一并保存。",
            "登录时，账户信息可能包括邮箱、登录服务提供的账户标识，以及你填写的昵称或头像。使用 Kit 或 workspace 时，保存的信息可能包括已选素材、项目名称与说明、你填写的项目需求、所选风格、备注、版本记录和导出相关记录。部分偏好和收藏只保存在你的浏览器中。",
            "社区评论、评分和投稿可能包含你提交的内容和个人资料信息。投稿经审核后可能展示在公开作品区，也可能供审核人员查看。订阅通讯会保存你提交的邮箱；反馈内容及你自愿填写的回复邮箱会通过该功能配置的邮件服务发送。",
            "使用 AI 风格顾问时，你填写的项目需求会发送给该次请求所配置的模型服务以生成回答。请勿在 AI 输入中填写保密信息或敏感个人信息。",
          ],
        },
        {
          title: "浏览器存储",
          paragraphs: [
            "网站会在浏览器中保存语言选择、本地收藏或 Kit 内容，以及统计所需的会话或推广来源信息。登录和具体功能也可能使用 Cookie。清除浏览器数据可以移除本地偏好，但不会自动删除已经保存在服务器或服务商处的信息。",
          ],
        },
        {
          title: "信息用途",
          paragraphs: [
            "这些信息用于提供你选择的功能、维护账户和 workspace、了解网站使用情况、保障服务安全、审核社区内容以及回复反馈。",
          ],
        },
        {
          title: "服务商",
          paragraphs: [
            "StyleKit 使用 Supabase 提供登录和云端功能；网站会加载 VibeLoft 访问统计，该服务可能处理访问或事件信息。Umami 统计和 Sentry 错误报告也可能按配置启用。邮件发送和 AI 回答使用这些功能当前配置的服务，具体供应商可能变化。各服务商依其自身条款和隐私规则处理信息。",
          ],
        },
        {
          title: "研究数据",
          paragraphs: [
            "如网站开展研究，会先征求明确同意，并可能记录资格答复、服务器分配的方案组、方案是否展示以及参与者的回应。研究证据库不以收集公司名称、项目编号、客户信息或原始邮箱为目的。随机的第一方浏览器标识会在服务器端转换为带密钥的关联标识。它减少了直接识别信息，但仍可用于关联研究记录，因此按个人数据处理。当前研究流程不使用邮件或支付服务收集研究证据。如未来启用其中任一服务，会在收集联系或付款信息前说明其用途、涉及的信息和保留安排。",
          ],
        },
        {
          title: "研究复核与退出",
          paragraphs: [
            "如经单独批准建立联系信息对应表，现有政策安排是在实验结束后 90 天内移除。去标识化研究证据会安排在实验结束后不晚于 12 个月进行删除复核；这是政策复核期限，并不表示系统会自动运行删除任务。如产生付款或税务记录，将按其单独的保留要求处理。",
            "研究参与仍开放时，可通过研究页面退出当前浏览器的参与。与其关联的在线研究事件会被删除，同时保留最少的退出标记，避免再次将其纳入样本；关联访谈证据会被排除。仅清除浏览器 Cookie 不会删除服务器上的研究记录。",
          ],
        },
      ],
      contactTitle: "咨询或资料请求",
      contactText:
        "如有隐私问题，或希望查询、更正、删除相关信息，请通过联系支持页提出。能否处理及处理方式取决于信息类别和相关服务。",
      contactLink: "联系与支持",
    },
    terms: {
      eyebrow: "条款",
      title: "使用条款",
      intro:
        "StyleKit 是开源产品与参考资料库。本条款说明使用网站、资源和社区功能时的基本规则。",
      sections: [
        {
          title: "合理使用",
          paragraphs: [
            "请勿滥用网站、试图绕过访问频率限制、未经授权访问受限区域、上传违法内容，或向公开功能提交有害内容。",
          ],
        },
        {
          title: "内容与下载资源",
          paragraphs: [
            "StyleKit 提供提示词、模板、设计令牌和示例，供参考与实现时使用。具体资源附带的许可或署名要求适用于该资源，并优先于本页的一般说明。再次使用前，请查看对应资源的许可。你仍需自行判断生成或导出内容在你的产品中的使用方式。",
          ],
        },
        {
          title: "社区投稿",
          paragraphs: [
            "提交内容即表示你确认自己有权分享这些内容。StyleKit 可以审核、拒绝、移除投稿，也可以在公开作品区或审核工具中展示。获准公开的内容可能被其他访客看到。",
          ],
        },
        {
          title: "服务可用性",
          paragraphs: [
            "网站和资源按现状提供。我们会尽力维护准确性和可用性，但不保证服务始终不中断、内容完全无遗漏，或适用于某个特定用途。",
          ],
        },
      ],
      contactTitle: "问题反馈",
      contactText: "如对条款或某项资源有疑问，请使用",
      contactLink: "联系与支持页面",
    },
  },
};

export function getLegalPageCopy(
  document: LegalDocument,
  locale: Locale
): LegalPageCopy {
  return legalCopy[locale][document];
}

export function getLegalMetadata(
  document: LegalDocument,
  locale: Locale
): Metadata {
  const copy = getLegalPageCopy(document, locale);
  return {
    title: copy.title,
    description: copy.intro,
    openGraph: {
      title: copy.title,
      description: copy.intro,
    },
  };
}
