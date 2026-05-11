import type { Assignee } from "../../assignees/types/assignees.types";
import { getAssigneeName } from "../../assignees/utils/assignee.utils";
import { TASK_STATUS_LABELS } from "../constants/task.constants";
import type { Task } from "../types/task.types";
import type { TaskSortOption } from "../types/taskControls.types";

export function sortTasks(
  tasks: Task[],
  assignees: Assignee[],
  sortOption: TaskSortOption,
): Task[] {
  const sortedTasks = [...tasks];

  if (sortOption === "default") return sortedTasks;

  sortedTasks.sort((firstTask, secondTask) => {
    if (sortOption === "title-asc")
      return firstTask.title.localeCompare(secondTask.title);

    if (sortOption === "title-desc")
      return secondTask.title.localeCompare(firstTask.title);

    if (sortOption === "assignee-asc")
      return getAssigneeName(assignees, firstTask.assigneeId).localeCompare(
        getAssigneeName(assignees, secondTask.assigneeId),
      );

    if (sortOption === "assignee-desc")
      return getAssigneeName(assignees, secondTask.assigneeId).localeCompare(
        getAssigneeName(assignees, firstTask.assigneeId),
      );

    if (sortOption === "status-asc")
      return TASK_STATUS_LABELS[firstTask.status].localeCompare(
        TASK_STATUS_LABELS[secondTask.status],
      );

    if (sortOption === "status-desc")
      return TASK_STATUS_LABELS[secondTask.status].localeCompare(
        TASK_STATUS_LABELS[firstTask.status],
      );

    return 0;
  });
  return sortedTasks;
}
