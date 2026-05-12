import { API_BASE_URL } from "../../../config";
import type {
  CreateTaskInput,
  Task,
  UpdateTaskInput,
} from "../types/task.types";
import type { DummyJsonTodosResponse } from "./dummyJsonTask.types";
import { mapDummyJsonTodoToTask } from "./taskMappers";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/todos?limit=0`);

  if (!response.ok) throw new Error("Failed to fetch tasks");

  const data: DummyJsonTodosResponse = await response.json();

  return data.todos.map(mapDummyJsonTodoToTask);
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/todos/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: input.title,
      completed: input.status === "done",
      userId: Number(input.assigneeId) || 1,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  await response.json();

  // DummyJSON does not persist new tasks, so we use a local ID
  return {
    id: `local-${crypto.randomUUID()}`,
    title: input.title,
    description: input.description,
    status: input.status,
    assigneeId: input.assigneeId,
  };
}

export async function updateTask(input: UpdateTaskInput): Promise<Task> {
  const updatedTask: Task = {
    id: input.id,
    title: input.title,
    description: input.description,
    status: input.status,
    assigneeId: input.assigneeId,
  };

  // Local tasks only exist in frontend state
  if (input.id.startsWith("local-")) {
    return updatedTask;
  }

  const response = await fetch(`${API_BASE_URL}/todos/${input.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      todo: input.title,
      completed: input.status === "done",
      userId: Number(input.assigneeId) || 1,
    }),
  });

  if (!response.ok) {
    // DummyJSON may not recognize non-persisted tasks
    if (response.status === 404) {
      return updatedTask;
    }

    throw new Error("Failed to update task");
  }

  await response.json();

  return updatedTask;
}

export async function deleteTask(taskId: string): Promise<string> {
  if (taskId.startsWith("local-")) {
    return taskId;
  }

  const response = await fetch(`${API_BASE_URL}/todos/${taskId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    if (response.status === 404) {
      return taskId;
    }

    throw new Error("Failed to delete task");
  }

  await response.json();
  return taskId;
}
