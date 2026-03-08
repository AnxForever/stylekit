export type { PromptTopic, TopicPrompt, TopicFAQ, TopicUseCase, PromptTool } from "./types";
export { promptTopics } from "./topics";

import { promptTopics } from "./topics";
import type { PromptTopic } from "./types";

export function getTopicBySlug(slug: string): PromptTopic | undefined {
  return promptTopics.find((t) => t.slug === slug);
}

export function getAllTopicSlugs(): string[] {
  return promptTopics.map((t) => t.slug);
}
