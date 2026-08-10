export type OperationsQueueKind =
  | "submission"
  | "knowledge"
  | "support"
  | "comment"
  | "rating";

export type OperationsQueueTone = "warning" | "info" | "success";

export interface OperationsQueueItem {
  id: string;
  kind: OperationsQueueKind;
  title: string;
  summary: string;
  createdAt: string;
  href: string;
  actionLabel: string;
  tone: OperationsQueueTone;
}
