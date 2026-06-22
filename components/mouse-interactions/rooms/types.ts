export interface RoomProps {
  className?: string;
  /**
   * 是否显示房间序号标题 (如 "Room 01 — Neo-Brutalist")。
   * Cursor Lab 默认 true;风格详情页嵌入时设 false,避免与详情页 hero 的风格名重复。
   */
  showHeader?: boolean;
}
