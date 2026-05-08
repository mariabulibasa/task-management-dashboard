import { API_BASE_URL } from "../../../config";
import type { Task } from "../types/task.types";
import type { DummyJsonTodosResponse } from "./dummyJsonTask.types";
import { mapDummyJsonTodoToTask } from "./taskMappers";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/todos?limit=0`);

  if (!response.ok) throw new Error("Failed to fetch tasks");

  const data: DummyJsonTodosResponse = await response.json();

  return data.todos.map(mapDummyJsonTodoToTask);
}
