import type { Task } from "../types/task.types";

const TASKS_STORAGE_KEY = "task-dashboard-tasks";

export function getStoredTasks(): Task[] | null {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

  if (!storedTasks) return null;

  return JSON.parse(storedTasks) as Task[];
}

export function saveStoredTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
