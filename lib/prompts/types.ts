export type PromptTool = "v0" | "cursor" | "claude" | "general";

export interface TopicPrompt {
  titleEn: string;
  titleZh: string;
  tool: PromptTool;
  prompt: string;
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

