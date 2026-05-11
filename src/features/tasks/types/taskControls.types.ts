import type { TaskStatus } from "./task.types";

export type TaskStatusFilter = TaskStatus | "all";

export type TaskSortOption =
  | "default"
  | "title-asc"
  | "title-desc"
  | "assignee-asc"
  | "assignee-desc"
  | "status-asc"
  | "status-desc";

export interface TaskFilters {
  searchTerm: string;
  statusFilter: TaskStatusFilter;
  assigneeFilter: string;
}
