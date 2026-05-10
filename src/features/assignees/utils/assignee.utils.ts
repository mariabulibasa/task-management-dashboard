import type { Assignee } from "../types/assignees.types";

export function findAssigneeById(
  assignees: Assignee[],
  assigneeId: string,
): Assignee | undefined {
  return assignees.find((assignee) => assigneeId === assignee.id);
}

export function getAssigneeName(
  assignees: Assignee[],
  assigneeId: string,
): string {
  return findAssigneeById(assignees, assigneeId)?.name ?? "";
}
