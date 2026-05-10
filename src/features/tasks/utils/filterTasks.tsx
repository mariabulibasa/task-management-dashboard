import type { Task } from "../types/task.types";

export function filterTaskBySearch(tasks: Task[], searchTerm: string): Task[] {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  if (!normalizedSearchTerm) return tasks;

  return tasks.filter((task) =>
    task.title.toLowerCase().includes(normalizedSearchTerm),
  );
}
