export type AdminAuditAction =
  | "all"
  | "submission.approve"
  | "submission.reject"
  | "submission.register"
  | "submission.promote"
  | "community.hide"
  | "community.report.resolve"
  | "submission.update"
  | "submission.delete"
  | "support_acknowledgment.create"
  | "support_acknowledgment.update"
  | "support_acknowledgment.delete"
  | "site_announcement.update"
  | "comment.delete"
  | "rating.delete"
  | "user.title.update"
  | "user.title.clear"
  | "user.content.delete";

export const ADMIN_AUDIT_ACTION_OPTIONS: ReadonlyArray<{
  value: AdminAuditAction;
  label: string;
}> = [
  { value: "all", label: "全部操作" },
  { value: "submission.approve", label: "投稿已通过" },
  { value: "submission.reject", label: "投稿已驳回" },
  { value: "submission.register", label: "投稿已登记" },
  { value: "submission.promote", label: "投稿已晋升" },
  { value: "community.hide", label: "社区风格已下架" },
  { value: "community.report.resolve", label: "举报已处理" },
  { value: "submission.update", label: "编辑投稿" },
  { value: "submission.delete", label: "删除投稿" },
  { value: "support_acknowledgment.create", label: "新增赞助鸣谢" },
  { value: "support_acknowledgment.update", label: "更新赞助鸣谢" },
  { value: "support_acknowledgment.delete", label: "删除赞助鸣谢" },
  { value: "site_announcement.update", label: "更新站点公告" },
  { value: "comment.delete", label: "删除评论" },
  { value: "rating.delete", label: "删除评分" },
  { value: "user.title.update", label: "更新用户称号" },
  { value: "user.title.clear", label: "清除用户称号" },
  { value: "user.content.delete", label: "删除用户内容" },
];

export function getAdminAuditActionLabel(action: string): string {
  return ADMIN_AUDIT_ACTION_OPTIONS.find((item) => item.value === action)?.label ?? action;
}

export function getAdminAuditActionTone(action: string): "danger" | "info" | "success" | "neutral" {
  if (action.includes("delete") || action.includes("reject") || action.includes("clear")) {
    return "danger";
  }
  if (action.includes("update")) return "info";
  if (
    action.includes("create") ||
    action.includes("approve") ||
    action.includes("register") ||
    action.includes("promote")
  ) {
    return "success";
  }
  return "neutral";
}
