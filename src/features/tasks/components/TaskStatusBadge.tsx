import type { TaskStatus } from "../types/task.types";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const statusLabel: Record<TaskStatus, string> = {
  done: "Done",
  "in progress": "In progress",
  pending: "Not started",
};

const badgeClasses: Record<TaskStatus, string> = {
  done: "bg-green-100 text-green-700",
  "in progress": "bg-yellow-100 text-yellow-800",
  pending: "bg-neutral-100 text-neutral-700",
};

const dotClasses: Record<TaskStatus, string> = {
  done: "bg-green-500",
  "in progress": "bg-yellow-500",
  pending: "bg-neutral-400",
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ${badgeClasses[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[status]}`} />
      {statusLabel[status]}
    </span>
  );
}
