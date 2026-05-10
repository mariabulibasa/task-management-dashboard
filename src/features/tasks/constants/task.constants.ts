import type { TaskStatus } from "../types/task.types";
import type {
  TaskSortOption,
  TaskStatusFilter,
} from "../types/taskControls.types";

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  done: "Done",
  "in progress": "In progress",
  pending: "Not started",
};

export const TASK_SORT_OPTIONS: TaskSortOption[] = [
  "default",
  "title-asc",
  "title-desc",
  "assignee-asc",
  "assignee-desc",
  "status-asc",
  "status-desc",
];

export const TASK_SORT_LABELS: Record<TaskSortOption, string> = {
  default: "Default",
  "title-asc": "Task name A-Z",
  "title-desc": "Task name Z-A",
  "assignee-asc": "Assignee A-Z",
  "assignee-desc": "Assignee Z-A",
  "status-asc": "Status A-Z",
  "status-desc": "Status Z-A",
};

export const TASK_STATUS_FILTER_OPTIONS: TaskStatusFilter[] = [
  "all",
  "pending",
  "in progress",
  "done",
];

export const TASK_STATUS_FILTER_LABELS: Record<TaskStatusFilter, string> = {
  all: "All",
  done: "Done",
  "in progress": "In progress",
  pending: "Not started",
};
