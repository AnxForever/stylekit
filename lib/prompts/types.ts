export type PromptTool = "v0" | "cursor" | "claude" | "general";

export interface TopicPrompt {
  titleEn: string;
  titleZh: string;
  tool: PromptTool;
  prompt: string;
  /** Optional Chinese body; legacy prompts keep their existing copy. */
  promptZh?: string;
  reference?: {
    href: string;
    downloadFileName?: string;
  };
}

export interface TopicFAQ {
  questionEn: string;
  questionZh: string;
  answerEn: string;
  answerZh: string;
}

export interface TopicUseCase {
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
}

export interface PromptTopic {
  slug: string;
  /** Authored source when a topic lives outside the shared topic registry. */
  sourceRef?: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  keywords: string[];
  relatedStyleSlugs: string[];
  introEn: string;
  introZh: string;
  prompts: TopicPrompt[];
  useCases: TopicUseCase[];
  faq: TopicFAQ[];
}

