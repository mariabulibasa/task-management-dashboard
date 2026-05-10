import type { Task } from "../types/task.types";
import type { TaskFilters } from "../types/taskControls.types";

interface FilterTaskProps extends TaskFilters {
  tasks: Task[];
}

export function filterTasks({
  tasks,
  searchTerm,
  statusFilter,
  assigneeFilter,
}: FilterTaskProps): Task[] {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch =
      !normalizedSearchTerm ||
      task.title.toLowerCase().includes(normalizedSearchTerm);

    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;

    const matchAssignee =
      assigneeFilter === "all" || task.assigneeId === assigneeFilter;

    return matchesSearch && matchesStatus && matchAssignee;
  });
}
